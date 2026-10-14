import { api, session, params, escape } from './api.js'

const form = document.getElementById('form')
const error = document.getElementById('error')
const submit = document.getElementById('submit')
const heading = document.getElementById('heading')
let mode = 'login'

if (['localhost', '127.0.0.1'].includes(location.hostname)) document.getElementById('dev-hint').hidden = false

form.querySelector('.tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.mode) return
  mode = e.target.dataset.mode
  form.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-selected', b === e.target))
  document.getElementById('name-field').hidden = mode === 'login'
  form.password.autocomplete = mode === 'login' ? 'current-password' : 'new-password'
  heading.textContent = mode === 'login' ? 'Que bom te ver.' : 'Crie sua conta.'
  submit.textContent = mode === 'login' ? 'Entrar' : 'Criar conta'
  error.hidden = true
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { name, email, password } = Object.fromEntries(new FormData(form))
  const body = mode === 'login' ? { email, password } : { name, email, password }
  submit.disabled = true
  error.hidden = true
  try {
    const { token } = await api(`/auth/${mode}`, { method: 'POST', body })
    session.token = token
    const back = params().get('voltar')
    location.href = back && /^\/(?![\/\\])/.test(back) ? back : '/'
  } catch (err) {
    error.innerHTML = [escape(err.message), ...(err.details ?? []).map((d) => `${escape(d.field)}: ${escape(d.message)}`)].join('<br>')
    error.hidden = false
  } finally {
    submit.disabled = false
  }
})
