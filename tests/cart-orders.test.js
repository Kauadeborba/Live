import { describe, it, expect } from 'vitest'
import { api, useSeededDatabase, loginAsCustomer, variantWithStock, prisma } from './helpers.js'

useSeededDatabase()

describe('carrinho', () => {
  it('exige autenticação', async () => {
    expect((await api.get('/api/cart')).status).toBe(401)
  })

  it('adiciona, soma quantidade, altera e remove item', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(3)

    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id })
    let res = await api.post('/api/cart/items').set(auth).send({ variantId: variant.id, quantity: 2 })
    expect(res.status).toBe(201)
    expect(res.body.items[0].quantity).toBe(3)
    expect(res.body.totalCents).toBe(variant.product.priceCents * 3)

    res = await api.patch(`/api/cart/items/${variant.id}`).set(auth).send({ quantity: 1 })
    expect(res.body.itemCount).toBe(1)

    res = await api.delete(`/api/cart/items/${variant.id}`).set(auth)
    expect(res.body.items).toHaveLength(0)
  })

  it('bloqueia quantidade acima do estoque com 409', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(1)
    await prisma.variant.update({ where: { id: variant.id }, data: { stock: 1 } })
    const res = await api.post('/api/cart/items').set(auth).send({ variantId: variant.id, quantity: 2 })
    expect(res.status).toBe(409)
  })

  it('devolve 404 para variação inexistente', async () => {
    const res = await api.post('/api/cart/items').set(await loginAsCustomer()).send({ variantId: 999999 })
    expect(res.status).toBe(404)
  })
})

describe('pedidos', () => {
  it('não fecha pedido com carrinho vazio', async () => {
    expect((await api.post('/api/orders').set(await loginAsCustomer())).status).toBe(400)
  })

  it('fecha pedido, baixa estoque e esvazia o carrinho', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(2)
    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id, quantity: 2 })

    const res = await api.post('/api/orders').set(auth)
    expect(res.status).toBe(201)
    expect(res.body.totalCents).toBe(variant.product.priceCents * 2)
    expect(res.body.items[0]).toMatchObject({ productName: variant.product.name, quantity: 2 })
    expect(res.body.fulfillment).toBe('DELIVERY')

    const after = await prisma.variant.findUnique({ where: { id: variant.id } })
    expect(after.stock).toBe(variant.stock - 2)
    expect((await api.get('/api/cart').set(auth)).body.items).toHaveLength(0)
    expect((await api.get('/api/orders').set(auth)).body).toHaveLength(1)
  })

  it('desfaz tudo se o estoque acabou antes do checkout', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(2)
    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id, quantity: 2 })
    await prisma.variant.update({ where: { id: variant.id }, data: { stock: 1 } })

    const res = await api.post('/api/orders').set(auth)
    expect(res.status).toBe(409)
    expect((await prisma.variant.findUnique({ where: { id: variant.id } })).stock).toBe(1)
    expect(await prisma.order.count()).toBe(0)
    expect((await api.get('/api/cart').set(auth)).body.items).toHaveLength(1)
  })

  it('não mostra pedido de outro usuário', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(1)
    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id })
    const order = (await api.post('/api/orders').set(auth)).body

    const other = await api.post('/api/auth/register').send({ name: 'Bia', email: 'bia@exemplo.com', password: 'segredo1' })
    const res = await api.get(`/api/orders/${order.id}`).set({ Authorization: `Bearer ${other.body.token}` })
    expect(res.status).toBe(404)
  })
})

describe('retirada na loja', () => {
  it('grava a forma de entrega escolhida e valida o valor', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(1)
    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id })
    expect((await api.post('/api/orders').set(auth).send({ fulfillment: 'DRONE' })).status).toBe(400)
    const res = await api.post('/api/orders').set(auth).send({ fulfillment: 'PICKUP' })
    expect(res.status).toBe(201)
    expect(res.body.fulfillment).toBe('PICKUP')
  })
})

describe('robustez', () => {
  it('checkouts simultâneos geram um único pedido', async () => {
    const auth = await loginAsCustomer()
    const variant = await variantWithStock(6)
    await api.post('/api/cart/items').set(auth).send({ variantId: variant.id, quantity: 2 })

    const results = await Promise.all([1, 2, 3].map(() => api.post('/api/orders').set(auth)))
    expect(results.filter((r) => r.status === 201)).toHaveLength(1)
    expect(await prisma.order.count()).toBe(1)
    expect((await prisma.variant.findUnique({ where: { id: variant.id } })).stock).toBe(variant.stock - 2)
  })

  it('ids e preços fora do limite de inteiro dão 400, não 500', async () => {
    const auth = await loginAsCustomer()
    expect((await api.get('/api/orders/99999999999').set(auth)).status).toBe(400)
    expect((await api.get('/api/products?precoMin=99999999999')).status).toBe(400)
    expect((await api.post('/api/cart/items').set(auth).send({ variantId: 99999999999 })).status).toBe(400)
  })

  it('token de usuário removido dá 401', async () => {
    const auth = await loginAsCustomer()
    await prisma.user.deleteMany()
    expect((await api.get('/api/cart').set(auth)).status).toBe(401)
  })

  it('corpo grande demais dá 413', async () => {
    const res = await api.post('/api/auth/login').send({ email: 'a@a.com', password: 'x'.repeat(200_000) })
    expect(res.status).toBe(413)
  })
})
