import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { conflict, notFound } from '../lib/errors.js'
import { validate } from '../middlewares/validate.js'
import { authenticate } from '../middlewares/authenticate.js'
import { intId } from '../lib/schemas.js'

const addSchema = z.object({
  variantId: intId(),
  quantity: z.number().int().min(1).max(10).default(1),
})

const updateSchema = z.object({ quantity: z.number().int().min(1).max(10) })
const idParam = z.object({ variantId: intId() })

export async function getCart(userId) {
  const rows = await prisma.cartItem.findMany({
    where: { userId },
    orderBy: { id: 'asc' },
    include: { variant: { include: { product: true } } },
  })
  const items = rows.map(({ quantity, variant: { id, size, stock, product } }) => ({
    variantId: id,
    size,
    stock,
    quantity,
    product: { id: product.id, slug: product.slug, name: product.name, image: product.images[0], priceCents: product.priceCents },
    subtotalCents: product.priceCents * quantity,
  }))
  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    totalCents: items.reduce((sum, item) => sum + item.subtotalCents, 0),
  }
}

async function findVariantWithStock(variantId, quantity) {
  const variant = await prisma.variant.findUnique({ where: { id: variantId } })
  if (!variant) throw notFound('Variação não encontrada')
  if (variant.stock < quantity) throw conflict(`Estoque insuficiente: restam ${variant.stock} unidade(s)`)
  return variant
}

export const cartRoutes = Router()
cartRoutes.use(authenticate)

cartRoutes.get('/', async (req, res) => {
  res.json(await getCart(req.userId))
})

cartRoutes.post('/items', validate(addSchema), async (req, res) => {
  const { variantId, quantity } = req.valid.body
  const where = { userId_variantId: { userId: req.userId, variantId } }
  const existing = await prisma.cartItem.findUnique({ where })
  const newQuantity = (existing?.quantity ?? 0) + quantity
  await findVariantWithStock(variantId, newQuantity)
  await prisma.cartItem.upsert({
    where,
    create: { userId: req.userId, variantId, quantity },
    update: { quantity: newQuantity },
  })
  res.status(201).json(await getCart(req.userId))
})

cartRoutes.patch('/items/:variantId', validate(idParam, 'params'), validate(updateSchema), async (req, res) => {
  const { variantId } = req.valid.params
  const { quantity } = req.valid.body
  const where = { userId_variantId: { userId: req.userId, variantId } }
  if (!(await prisma.cartItem.findUnique({ where }))) throw notFound('Item não está no carrinho')
  await findVariantWithStock(variantId, quantity)
  await prisma.cartItem.update({ where, data: { quantity } })
  res.json(await getCart(req.userId))
})

cartRoutes.delete('/items/:variantId', validate(idParam, 'params'), async (req, res) => {
  const { count } = await prisma.cartItem.deleteMany({
    where: { userId: req.userId, variantId: req.valid.params.variantId },
  })
  if (!count) throw notFound('Item não está no carrinho')
  res.json(await getCart(req.userId))
})
