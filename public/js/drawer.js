import { icon } from './icons.js'

let current = null

function close() {
  if (!current) return
  const { el, opener } = current
  el.classList.remove('open')
  document.body.classList.remove('locked')
  setTimeout(() => el.remove(), 450)
  current = null
  opener?.focus?.()
}

export function openDrawer({ title, body, footer = '', side = 'right', label = title }) {
  close()
  const el = document.createElement('div')
  el.className = `drawer-layer ${side}`
  el.innerHTML = `
    <div class="drawer-scrim" data-close></div>
    <aside class="drawer-panel" role="dialog" aria-modal="true" aria-label="${label}">
      <header class="drawer-head"><h2 class="display">${title}</h2><button class="icon-btn" data-close aria-label="Fechar">${icon('close')}</button></header>
      <div class="drawer-body">${body}</div>
      ${footer ? `<footer class="drawer-foot">${footer}</footer>` : ''}
    </aside>`
  document.body.append(el)
  document.body.classList.add('locked')
  current = { el, opener: document.activeElement }
  requestAnimationFrame(() => {
    el.classList.add('open')
    el.querySelector('.drawer-panel button, .drawer-panel a, .drawer-panel input')?.focus()
  })
  el.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close() })
  return el
}

export const closeDrawer = close

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') close()
  if (e.key !== 'Tab' || !current) return
  const focusable = [...current.el.querySelectorAll('button, a[href], input, select')].filter((n) => !n.disabled)
  const first = focusable[0]
  const last = focusable.at(-1)
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
})
