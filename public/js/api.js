const TOKEN_KEY = 'live.token'

export const session = {
  get token() {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set token(value) {
    try { value ? localStorage.setItem(TOKEN_KEY, value) : localStorage.removeItem(TOKEN_KEY) } catch {}
  },
  get loggedIn() { return Boolean(this.token) },
}

export async function api(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (session.token) headers.Authorization = `Bearer ${session.token}`
  const res = await fetch(`/api${path}`, { method, headers, body: body && JSON.stringify(body) })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401 && session.token) session.token = null
  if (!res.ok) throw Object.assign(new Error(data.error ?? 'Algo deu errado'), { status: res.status, details: data.details })
  return data
}

export const money = (cents) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
import { STORE } from './store.js'

export const installments = (cents) => (STORE.installments ? `${STORE.installments}x de ${money(Math.ceil(cents / STORE.installments))} sem juros` : '')
export const params = () => new URLSearchParams(location.search)
export const escape = (text) => String(text).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
