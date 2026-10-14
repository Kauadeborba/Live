import { describe, it, expect } from 'vitest'
import { api, useSeededDatabase } from './helpers.js'

useSeededDatabase()

describe('catálogo', () => {
  it('lista categorias com contagem de produtos', async () => {
    const res = await api.get('/api/categories')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(6)
    expect(res.body[0].productCount).toBeGreaterThan(0)
  })

  it('pagina produtos', async () => {
    const res = await api.get('/api/products?porPagina=5&pagina=2')
    expect(res.body.items).toHaveLength(5)
    expect(res.body).toMatchObject({ total: 20, pagina: 2, totalPaginas: 4 })
  })

  it('filtra por categoria e ordena por menor preço', async () => {
    const res = await api.get('/api/products?categoria=leggings&ordem=menor-preco')
    const prices = res.body.items.map((p) => p.priceCents)
    expect(res.body.items.every((p) => p.category.slug === 'leggings')).toBe(true)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it('filtra por gênero incluindo unissex', async () => {
    const res = await api.get('/api/products?genero=MASCULINO&porPagina=48')
    expect(res.body.total).toBe(0)
  })

  it('busca por nome sem diferenciar maiúsculas', async () => {
    const res = await api.get('/api/products?busca=LEGGING')
    expect(res.body.total).toBe(4)
  })

  it('rejeita filtro inválido com 400', async () => {
    expect((await api.get('/api/products?ordem=aleatoria')).status).toBe(400)
  })

  it('mostra detalhe com tamanhos e 404 para slug inexistente', async () => {
    const res = await api.get('/api/products/legging-escultura')
    expect(res.status).toBe(200)
    expect(res.body.variants.map((v) => v.size)).toEqual(['PP', 'P', 'M', 'G', 'GG'])
    expect((await api.get('/api/products/nao-existe')).status).toBe(404)
  })
})
