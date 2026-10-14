import request from 'supertest'
import { beforeEach, afterAll } from 'vitest'
import { createApp } from '../src/app.js'
import { prisma } from '../src/lib/prisma.js'
import { seed } from '../prisma/seed.js'

const server = createApp().listen(0)
export const api = request(server)

export function useSeededDatabase() {
  beforeEach(() => seed(prisma))
  afterAll(async () => {
    server.close()
    await prisma.$disconnect()
  })
}

export async function loginAsCustomer() {
  const { body } = await api.post('/api/auth/login').send({ email: 'cliente@live.dev', password: 'live123' })
  return { Authorization: `Bearer ${body.token}` }
}

export async function variantWithStock(minStock = 2) {
  return prisma.variant.findFirst({ where: { stock: { gte: minStock } }, include: { product: true }, orderBy: { id: 'asc' } })
}

export { prisma }
