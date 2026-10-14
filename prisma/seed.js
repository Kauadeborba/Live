import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { categories, products } from './seed-data.js'

const prisma = new PrismaClient()

export async function seed(client = prisma) {
  await client.orderItem.deleteMany()
  await client.order.deleteMany()
  await client.cartItem.deleteMany()
  await client.variant.deleteMany()
  await client.product.deleteMany()
  await client.category.deleteMany()
  await client.user.deleteMany()

  const categoryIds = {}
  for (const category of categories) {
    categoryIds[category.slug] = (await client.category.create({ data: category })).id
  }

  for (const [index, { category, sizes, ...product }] of products.entries()) {
    await client.product.create({
      data: {
        ...product,
        createdAt: new Date(Date.now() - index * 86_400_000),
        categoryId: categoryIds[category],
        variants: { create: sizes.map((size, i) => ({ size, stock: (index + i) % 7 === 0 ? 0 : 3 + ((index * 5 + i * 3) % 15) })) },
      },
    })
  }

  await client.user.create({
    data: { name: 'Cliente Live', email: 'cliente@live.dev', passwordHash: await bcrypt.hash('live123', 10) },
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await seed()
  console.log(`Seed ok: ${categories.length} categorias, ${products.length} produtos, usuário cliente@live.dev / live123`)
  await prisma.$disconnect()
}
