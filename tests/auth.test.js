import { describe, it, expect } from 'vitest'
import { api, useSeededDatabase, loginAsCustomer } from './helpers.js'

useSeededDatabase()

describe('auth', () => {
  it('cadastra usuário e devolve token sem expor a senha', async () => {
    const res = await api.post('/api/auth/register').send({ name: 'Ana', email: 'ANA@exemplo.com', password: 'segredo1' })
    expect(res.status).toBe(201)
    expect(res.body.token).toBeTruthy()
    expect(res.body.user).toMatchObject({ name: 'Ana', email: 'ana@exemplo.com' })
    expect(res.body.user.passwordHash).toBeUndefined()
  })

  it('recusa e-mail duplicado com 409', async () => {
    const res = await api.post('/api/auth/register').send({ name: 'Outro', email: 'cliente@live.dev', password: 'segredo1' })
    expect(res.status).toBe(409)
  })

  it('valida campos com 400 e detalhes', async () => {
    const res = await api.post('/api/auth/register').send({ name: 'A', email: 'invalido', password: '1' })
    expect(res.status).toBe(400)
    expect(res.body.details.map((d) => d.field)).toEqual(expect.arrayContaining(['name', 'email', 'password']))
  })

  it('recusa senha errada com 401', async () => {
    const res = await api.post('/api/auth/login').send({ email: 'cliente@live.dev', password: 'errada' })
    expect(res.status).toBe(401)
  })

  it('devolve o usuário logado em /me e exige token', async () => {
    expect((await api.get('/api/auth/me')).status).toBe(401)
    const res = await api.get('/api/auth/me').set(await loginAsCustomer())
    expect(res.status).toBe(200)
    expect(res.body.email).toBe('cliente@live.dev')
  })
})
