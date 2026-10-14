import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { badRequest, conflict, notFound } from '../lib/errors.js'
import { validate } from '../middlewares/validate.js'
import { intId } from '../lib/schemas.js'
import { authenticate } from '../middlewares/authenticate.js'

const idParam = z.object({ id: intId() })
const checkoutSchema = z.object({ fulfillment: z.enum(['DELIVERY', 'PICKUP']).default('DELIVERY') })
const includeItems = { items: { orderBy: { id: 'asc' } } }

export const orderRoutes = Router()
orderRoutes.use(authenticate)

orderRoutes.post('/', validate(checkoutSchema), async (req, res) => {
  const order = await prisma.$transaction(async (tx) => {
    const cart = await tx.cartItem.findMany({
      where: { userId: req.userId },
      include: { variant: { include: { product: true } } },
    })
    if (!cart.length) throw badRequest('Carrinho vazio')

    const removed = await tx.cartItem.deleteMany({ where: { id: { in: cart.map((item) => item.id) } } })
    if (removed.count !== cart.length) throw conflict('O carrinho mudou durante o checkout, tente novamente')

    for (const { variantId, quantity, variant } of cart) {
      const { count } = await tx.variant.updateMany({
        where: { id: variantId, stock: { gte: quantity } },
        data: { stock: { decrement: quantity } },
      })
      if (!count) throw conflict(`Estoque insuficiente para ${variant.product.name} (${variant.size})`)
    }

    const created = await tx.order.create({
      data: {
        userId: req.userId,
        fulfillment: req.valid.body.fulfillment,
        totalCents: cart.reduce((sum, { quantity, variant }) => sum + variant.product.priceCents * quantity, 0),
        items: {
          create: cart.map(({ variantId, quantity, variant }) => ({
            variantId,
            quantity,
            size: variant.size,
            productName: variant.product.name,
            unitPriceCents: variant.product.priceCents,
          })),
        },
      },
      include: includeItems,
    })
    return created
  })
  res.status(201).json(order)
})

orderRoutes.get('/', async (req, res) => {
  res.json(await prisma.order.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
    include: includeItems,
  }))
})

orderRoutes.get('/:id', validate(idParam, 'params'), async (req, res) => {
  const order = await prisma.order.findFirst({
    where: { id: req.valid.params.id, userId: req.userId },
    include: includeItems,
  })
  if (!order) throw notFound('Pedido não encontrado')
  res.json(order)
})
