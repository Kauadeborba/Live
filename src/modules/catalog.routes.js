import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { notFound } from '../lib/errors.js'
import { validate } from '../middlewares/validate.js'
import { cents } from '../lib/schemas.js'

const sortOptions = {
  recentes: { createdAt: 'desc' },
  'menor-preco': { priceCents: 'asc' },
  'maior-preco': { priceCents: 'desc' },
  nome: { name: 'asc' },
}

const listSchema = z.object({
  categoria: z.string().optional(),
  genero: z.enum(['MASCULINO', 'FEMININO', 'UNISSEX']).optional(),
  busca: z.string().trim().optional(),
  precoMin: cents().optional(),
  precoMax: cents().optional(),
  destaque: z.stringbool().optional(),
  ordem: z.enum(Object.keys(sortOptions)).default('recentes'),
  pagina: z.coerce.number().int().min(1).default(1),
  porPagina: z.coerce.number().int().min(1).max(48).default(12),
})

export const catalogRoutes = Router()

catalogRoutes.get('/categories', async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
    include: { _count: { select: { products: true } } },
  })
  res.json(categories.map(({ _count, ...category }) => ({ ...category, productCount: _count.products })))
})

catalogRoutes.get('/products', validate(listSchema, 'query'), async (req, res) => {
  const { categoria, genero, busca, precoMin, precoMax, destaque, ordem, pagina, porPagina } = req.valid.query
  const where = {
    ...(categoria && { category: { slug: categoria } }),
    ...(genero && { gender: { in: [genero, 'UNISSEX'] } }),
    ...(busca && { name: { contains: busca, mode: 'insensitive' } }),
    ...(destaque !== undefined && { featured: destaque }),
    ...((precoMin !== undefined || precoMax !== undefined) && {
      priceCents: { gte: precoMin, lte: precoMax },
    }),
  }
  const [total, items] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: sortOptions[ordem],
      skip: (pagina - 1) * porPagina,
      take: porPagina,
      include: {
        category: { select: { slug: true, name: true } },
        variants: { orderBy: { id: 'asc' }, select: { id: true, size: true, stock: true } },
      },
    }),
  ])
  res.json({ items, total, pagina, porPagina, totalPaginas: Math.ceil(total / porPagina) })
})

catalogRoutes.get('/products/:slug', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: {
      category: { select: { slug: true, name: true } },
      variants: { orderBy: { id: 'asc' }, select: { id: true, size: true, stock: true } },
    },
  })
  if (!product) throw notFound('Produto não encontrado')
  res.json(product)
})
