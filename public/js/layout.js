import { api, session, money, escape } from './api.js'
import { icon } from './icons.js'
import { openDrawer, closeDrawer } from './drawer.js'
import { refreshBagCount, openBag } from './bag.js'
import { STORE, whatsappLink } from './store.js'

export { refreshBagCount }

const COLLECTION = [
  ['Conjuntos', 'conjuntos'],
  ['Leggings', 'leggings'],
  ['Tops', 'tops'],
  ['Macacões e bodies', 'bodies'],
  ['Camadas', 'camadas'],
  ['Acessórios', 'acessorios'],
]

const isHome = location.pathname === '/'

function notices() {
  return [
    `Retire suas compras na loja${STORE.pickupWindow ? ` ${escape(STORE.pickupWindow)}` : ''}`,
    ...(STORE.promos || []).map(escape),
    STORE.freeShippingCents && `Frete cortesia acima de ${money(STORE.freeShippingCents)}`,
    STORE.exchangeDays && `Trocas em até ${STORE.exchangeDays} dias`,
  ].filter(Boolean)
}

function services() {
  return [
    ['store', 'Retire na loja', STORE.pickupWindow || 'sem custo de frete'],
    whatsappLink() && ['chat', 'Consultora', 'atendimento pelo WhatsApp'],
    STORE.freeShippingCents && ['truck', 'Frete cortesia', `acima de ${money(STORE.freeShippingCents)}`],
    STORE.exchangeDays && ['swap', 'Trocas', `em até ${STORE.exchangeDays} dias`],
    STORE.installments && ['card', `${STORE.installments}x sem juros`, 'em todo o site'],
  ].filter(Boolean)
}

function header() {
  const here = location.pathname + location.search
  const link = (label, href) => `<a href="${href}" ${here === href ? 'aria-current="page"' : ''}>${label}</a>`
  return `
    <div class="notice" role="region" aria-roledescription="carrossel" aria-label="Avisos da loja">${notices().map((n, i) => `<span class="notice-item${i ? '' : ' on'}" ${i ? 'aria-hidden="true"' : ''}>${n}</span>`).join('')}</div>
    <header class="header ${isHome ? 'over-hero' : ''}">
      <div class="wrap">
        <button class="menu-toggle icon-btn" aria-label="Abrir menu" aria-expanded="false">${icon('menu')}</button>
        <nav class="nav" aria-label="Principal">
          <div class="has-mega">
            <button class="mega-trigger" aria-expanded="false" aria-controls="mega">Coleção ${icon('chevron')}</button>
            <div class="mega" id="mega">
              <div class="wrap mega-grid">
                <div><span class="label muted">Por peça</span><ul>${COLLECTION.map(([label, slug]) => `<li>${link(label, `/produtos?categoria=${slug}`)}</li>`).join('')}</ul></div>
                <div><span class="label muted">Seleções</span><ul><li>${link('Novidades', '/produtos?ordem=recentes')}</li><li>${link('Peças-assinatura', '/produtos?destaque=true')}</li><li>${link('Ver tudo', '/produtos')}</li></ul></div>
                <a class="mega-feature" href="/produtos?categoria=conjuntos"><img class="photo" src="/img/51.webp" alt="" loading="lazy"><span class="display">Conjuntos para o reformer</span></a>
                <a class="mega-feature" href="/produtos?categoria=bodies"><img class="photo" src="/img/52.webp" alt="" loading="lazy"><span class="display">Bodies, do barre à noite</span></a>
              </div>
            </div>
          </div>
          ${link('Novidades', '/produtos?ordem=recentes')}
          ${link('Conjuntos', '/produtos?categoria=conjuntos')}
          ${link('Leggings', '/produtos?categoria=leggings')}
          <div class="nav-mobile-only">${COLLECTION.slice(2).map(([label, slug]) => link(label, `/produtos?categoria=${slug}`)).join('')}</div>
        </nav>
        <a href="/" class="wordmark" aria-label="Live, início">live</a>
        <div class="tools">
          <button class="search-toggle" aria-label="Buscar">${icon('search')}<span class="label-text">Buscar</span></button>
          <a href="${session.loggedIn ? '/pedidos' : '/entrar'}" aria-label="Minha conta">${icon('user')}<span class="label-text">${session.loggedIn ? 'Conta' : 'Entrar'}</span></a>
          <button class="bag-toggle" aria-label="Abrir sacola">${icon('bag')}<span class="label-text">Sacola</span><span class="bag-count" hidden>0</span></button>
        </div>
      </div>
    </header>`
}

function storeBlock() {
  const wa = whatsappLink()
  const hours = STORE.hours.length ? STORE.hours.map((h) => `<li>${escape(h)}</li>`).join('') : '<li class="muted">Horário a definir</li>'
  return `
    <div>
      <h4 class="label">Nossa loja</h4>
      <ul>
        <li>${STORE.address ? escape(STORE.address) : '<span class="muted">Endereço a definir</span>'}</li>
        ${STORE.city ? `<li>${escape(STORE.city)}</li>` : ''}
        ${hours}
        ${wa ? `<li><a href="${wa}" target="_blank" rel="noopener">Fale com uma consultora</a></li>` : ''}
      </ul>
    </div>`
}

function socials() {
  return [
    ['instagram', 'Instagram', STORE.social?.instagram],
    ['facebook', 'Facebook', STORE.social?.facebook],
    ['youtube', 'YouTube', STORE.social?.youtube],
    ['chat', 'WhatsApp', whatsappLink()],
  ]
}

function motto() {
  return `
      <div class="motto">
        <p class="display">Todo movimento é <em>Live</em></p>
        <div class="follow"><span>Siga nossas redes sociais:</span>${socials().map(([name, label, href]) => (href ? `<a href="${escape(href)}" target="_blank" rel="noopener" aria-label="${label}">${icon(name)}</a>` : `<i role="img" aria-label="${label}">${icon(name)}</i>`)).join('')}</div>
      </div>`
}

function footer() {
  return `
    <section class="signup">
      <div class="wrap">
        <h2 class="display">Novas peças chegam primeiro para quem está na lista.</h2>
        <form data-signup>
          <input type="email" required placeholder="Seu e-mail" aria-label="Seu e-mail">
          <button aria-label="Entrar na lista">${icon('arrow')}</button>
        </form>
      </div>
    </section>
    <footer class="footer">
      <div class="services wrap">${services().map(([name, title, text]) => `<div>${icon(name)}<strong>${title}</strong><span class="muted">${text}</span></div>`).join('')}</div>${motto()}
      <div class="wrap cols">
        <div><h4 class="label">Coleção</h4><ul>${COLLECTION.map(([label, slug]) => `<li><a href="/produtos?categoria=${slug}">${label}</a></li>`).join('')}</ul></div>
        <div><h4 class="label">Atendimento</h4><ul><li><a href="/pedidos">Meus pedidos</a></li><li><button class="text-link" data-size-guide>Guia de medidas</button></li></ul></div>
        ${storeBlock()}
        <div><h4 class="label">Sobre</h4><ul><li><a href="/produtos?destaque=true">Peças-assinatura</a></li><li><a href="/produtos?ordem=recentes">Novidades</a></li></ul></div>
      </div>
      <div class="mark" aria-hidden="true">live</div>
      <div class="fine"><span>© ${new Date().getFullYear()} Live</span><span>Pagamentos simulados nesta versão</span></div>
    </footer>
    <div class="toast" role="status" aria-live="polite"></div>`
}

window.toast = (message, type = '') => {
  const el = document.querySelector('.toast')
  el.textContent = message
  el.className = `toast show ${type}`
  clearTimeout(window.toast.timer)
  window.toast.timer = setTimeout(() => el.classList.remove('show'), 2800)
}

export function openSizeGuide() {
  const { columns, rows } = STORE.sizeGuide
  const table = rows.length
    ? `<table class="size-table"><thead><tr>${columns.map((c) => `<th>${escape(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((v) => `<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
    : '<p class="muted">As medidas da nossa modelagem estarão aqui em breve. Enquanto isso, uma consultora ajuda você a escolher.</p>'
  const wa = whatsappLink('Olá! Gostaria de ajuda para escolher meu tamanho.')
  openDrawer({
    title: 'Guia de medidas',
    body: `${table}<div class="measure-tips"><p><strong>Busto</strong> na parte mais cheia, com a fita reta nas costas.</p><p><strong>Cintura</strong> na parte mais fina do tronco.</p><p><strong>Quadril</strong> na parte mais larga, com os pés juntos.</p><p class="muted">Nossas peças vestem justo. Entre dois tamanhos, prefira o maior.</p></div>`,
    footer: wa ? `<a class="btn btn-line btn-block" href="${wa}" target="_blank" rel="noopener">${icon('chat')} Ajuda de uma consultora</a>` : '',
  })
}

function openSearch() {
  const panel = openDrawer({
    title: 'Buscar',
    side: 'top',
    body: `<form action="/produtos" role="search" class="search-form"><input name="busca" autocomplete="off" placeholder="Legging, body, sálvia…" aria-label="Buscar peças"></form><div class="suggest" aria-live="polite"><span class="label muted">Mais procurados</span><div class="suggest-chips">${['Legging', 'Conjunto', 'Body', 'Top', 'Casaco'].map((t) => `<a href="/produtos?busca=${t}">${t}</a>`).join('')}</div></div>`,
  })
  const input = panel.querySelector('input')
  const out = panel.querySelector('.suggest')
  let timer
  let seq = 0
  input.addEventListener('input', () => {
    clearTimeout(timer)
    const term = input.value.trim()
    if (term.length < 2) return
    timer = setTimeout(async () => {
      const mine = ++seq
      const { items, total } = await api(`/products?busca=${encodeURIComponent(term)}&porPagina=4`).catch(() => ({ items: [], total: 0 }))
      if (mine !== seq) return
      out.innerHTML = items.length
        ? `<div class="suggest-grid">${items.map((p) => `<a href="/produto?slug=${encodeURIComponent(p.slug)}"><img class="photo" src="${escape(p.images[0])}" alt=""><span>${escape(p.name)}</span><span class="muted">${money(p.priceCents)}</span></a>`).join('')}</div><a class="link" href="/produtos?busca=${encodeURIComponent(term)}">Ver ${total} ${total === 1 ? 'resultado' : 'resultados'} ${icon('arrow')}</a>`
        : `<p class="muted">Nada encontrado para “${escape(term)}”.</p>`
    }, 220)
  })
}

document.body.insertAdjacentHTML('afterbegin', header())
document.body.insertAdjacentHTML('beforeend', footer())

const headerEl = document.querySelector('.header')
const bar = document.querySelector('.notice')
const syncBar = () => document.documentElement.style.setProperty('--bar-h', `${bar.offsetHeight}px`)
syncBar()
addEventListener('resize', syncBar)

const items = bar.querySelectorAll('.notice-item')
if (items.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let current = 0
  let paused = false
  bar.addEventListener('mouseenter', () => { paused = true })
  bar.addEventListener('mouseleave', () => { paused = false })
  setInterval(() => {
    if (paused || document.hidden) return
    const leaving = items[current]
    leaving.classList.replace('on', 'out')
    leaving.setAttribute('aria-hidden', 'true')
    current = (current + 1) % items.length
    const next = items[current]
    next.style.transition = 'none'
    next.classList.remove('out')
    next.offsetHeight
    next.style.transition = ''
    next.classList.add('on')
    next.removeAttribute('aria-hidden')
  }, 4000)
}
if (isHome) {
  const onScroll = () => headerEl.classList.toggle('solid', scrollY > 40)
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
}

const nav = document.querySelector('.nav')
const menu = document.querySelector('.menu-toggle')
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open')
  headerEl.classList.toggle('menu-open', open)
  menu.setAttribute('aria-expanded', open)
  menu.innerHTML = icon(open ? 'close' : 'menu')
})

const mega = document.querySelector('.has-mega')
const trigger = mega.querySelector('.mega-trigger')
let closeTimer
const setMega = (open) => {
  clearTimeout(closeTimer)
  mega.classList.toggle('open', open)
  trigger.setAttribute('aria-expanded', open)
}
trigger.addEventListener('click', (e) => {
  setMega(e.pointerType === 'mouse' || !mega.classList.contains('open'))
})
mega.addEventListener('pointerenter', (e) => {
  if (e.pointerType !== 'mouse') return
  setMega(true)
})
mega.addEventListener('pointerleave', (e) => {
  if (e.pointerType !== 'mouse') return
  closeTimer = setTimeout(() => setMega(false), 180)
})
mega.addEventListener('focusout', (e) => { if (!mega.contains(e.relatedTarget)) setMega(false) })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMega(false) })

document.querySelector('.search-toggle').addEventListener('click', openSearch)
document.querySelector('.bag-toggle').addEventListener('click', () => openBag())
document.addEventListener('click', (e) => { if (e.target.closest('[data-size-guide]')) openSizeGuide() })

document.querySelector('[data-signup]').addEventListener('submit', (e) => {
  e.preventDefault()
  e.target.reset()
  window.toast('Pronto, você está na lista.')
})

window.closeDrawer = closeDrawer
refreshBagCount()
