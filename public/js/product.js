import { api, money, installments, params, escape, session } from './api.js'
import { icon } from './icons.js'
import { pieceCard } from './product-card.js'
import './layout.js'
import { addToBag } from './bag.js'
import { STORE, whatsappLink } from './store.js'

const root = document.getElementById('product')
const slug = params().get('slug')
let selected = null
let quantity = 1

const careIcons = ['wash', 'bleach', 'iron', 'shade'].map((name, i) =>
  icon(name, ['Lavar à mão em água fria', 'Não usar alvejante', 'Passar em temperatura baixa', 'Secar à sombra'][i])).join('')

function render(p) {
  document.title = `${p.name} · Live`
  const gallery = p.images.slice(0, 3)
  const wa = whatsappLink(`Olá! Tenho uma dúvida sobre a peça ${p.name}.`)
  root.innerHTML = `
    <div class="gallery-wrap">
      <div class="gallery" id="gallery">${gallery.map((src, i) => `<button class="zoom" data-src="${escape(src)}" aria-label="Ampliar foto ${i + 1}"><img class="photo" src="${escape(src)}" alt="${i ? '' : escape(p.name)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></button>`).join('')}</div>
      <div class="dots" aria-hidden="true">${gallery.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
    </div>
    <div class="buy">
      <div class="crumbs"><a href="/">Início</a> / <a href="/produtos?categoria=${encodeURIComponent(p.category.slug)}">${escape(p.category.name)}</a></div>
      <h1 class="display">${escape(p.name)}</h1>
      <div class="price">${money(p.priceCents)}</div>
      <div class="muted" style="font-size:13px">${installments(p.priceCents)}</div>
      <p class="desc">${escape(p.description)}</p>
      <div class="size-head"><span class="label">Tamanho</span><button class="text-btn" data-size-guide>Guia de medidas</button></div>
      <div class="sizes" role="group" aria-label="Tamanhos">${p.variants.map((v) => `<button class="size" data-id="${v.id}" aria-pressed="false" ${v.stock ? '' : 'disabled aria-label="' + escape(v.size) + ', esgotado"'}>${escape(v.size)}</button>`).join('')}</div>
      <div class="stock-note" id="note" aria-live="polite">Escolha um tamanho para continuar.</div>
      <div class="buy-row">
        <div class="qty" aria-label="Quantidade"><button data-q="-1" aria-label="Diminuir">${icon('minus')}</button><span id="qty">1</span><button data-q="1" aria-label="Aumentar">${icon('plus')}</button></div>
        <button class="btn" id="add" disabled>Adicionar à sacola</button>
      </div>
      <ul class="perks">
        <li>${icon('store')}<span><strong>Retire na loja</strong> ${STORE.pickupWindow ? escape(STORE.pickupWindow) : 'sem custo de frete'}</span></li>
        ${STORE.freeShippingCents ? `<li>${icon('truck')}<span><strong>Frete cortesia</strong> acima de ${money(STORE.freeShippingCents)}</span></li>` : ''}
        ${wa ? `<li>${icon('chat')}<span><a href="${wa}" target="_blank" rel="noopener"><strong>Fale com uma consultora</strong></a> para tirar dúvidas sobre caimento</span></li>` : ''}
      </ul>
      <ul class="care">
        <li><span>Composição</span><span>78% poliamida reciclada, 22% elastano, forro em microfibra respirável</span></li>
        <li><span>Acabamento</span><span>Costuras planas e etiqueta impressa, nada marca a pele</span></li>
        <li><span>Cuidados</span><span>Lavar à mão, do avesso, sem amaciante<span class="care-icons">${careIcons}</span></span></li>
      </ul>
      <div class="care-label">
        <details><summary><span class="label">Entrega e trocas</span>${icon('plus')}</summary><div class="body">${[STORE.freeShippingCents && `Frete cortesia acima de ${money(STORE.freeShippingCents)}.`, STORE.exchangeDays && `Trocas em até ${STORE.exchangeDays} dias.`, 'Você também pode retirar na loja, sem custo de frete.'].filter(Boolean).join(' ')}</div></details>
      </div>
    </div>`

  const note = document.getElementById('note')
  const add = document.getElementById('add')
  const qty = document.getElementById('qty')

  root.querySelector('.sizes').addEventListener('click', (e) => {
    const button = e.target.closest('.size')
    if (!button || button.disabled) return
    selected = p.variants.find((v) => v.id === Number(button.dataset.id))
    quantity = 1
    qty.textContent = quantity
    root.querySelectorAll('.size').forEach((b) => b.setAttribute('aria-pressed', b === button))
    note.textContent = selected.stock <= 3 ? `Restam ${selected.stock} no tamanho ${selected.size}.` : `Tamanho ${selected.size} disponível.`
    add.disabled = false
  })

  const galleryEl = document.getElementById('gallery')
  galleryEl.addEventListener('scroll', () => {
    const i = Math.round(galleryEl.scrollLeft / galleryEl.clientWidth)
    root.querySelectorAll('.dots i').forEach((d, j) => d.classList.toggle('on', i === j))
  }, { passive: true })
  galleryEl.addEventListener('click', (e) => {
    const z = e.target.closest('.zoom')
    if (!z || matchMedia('(max-width: 860px)').matches) return
    const layer = document.createElement('div')
    layer.className = 'lightbox'
    layer.innerHTML = `<img src="${z.dataset.src}" alt=""><button class="icon-btn" aria-label="Fechar">${icon('close')}</button>`
    document.body.append(layer)
    requestAnimationFrame(() => layer.classList.add('open'))
    const close = () => { layer.classList.remove('open'); setTimeout(() => layer.remove(), 400); z.focus() }
    layer.addEventListener('click', close)
    layer.querySelector('button').focus()
    document.addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc) } })
  })

  root.querySelector('.qty').addEventListener('click', (e) => {
    const step = Number(e.target.closest('button')?.dataset.q)
    if (!step) return
    quantity = Math.min(Math.max(1, quantity + step), selected?.stock ?? 10, 10)
    qty.textContent = quantity
  })

  add.addEventListener('click', async () => {
    if (!session.loggedIn) {
      location.href = `/entrar?voltar=${encodeURIComponent(location.pathname + location.search)}`
      return
    }
    add.disabled = true
    try {
      await addToBag(selected.id, quantity)
    } catch (err) {
      window.toast(err.message, 'error')
    } finally {
      add.disabled = false
    }
  })
}

let product
try {
  product = await api(`/products/${encodeURIComponent(slug ?? '')}`)
  render(product)
} catch (err) {
  root.innerHTML = `<div class="empty" style="grid-column:1/-1"><h2 class="display">Essa peça não está mais aqui.</h2><p>${escape(err.message)}. Ela pode ter saído da coleção.</p><a class="btn btn-line" href="/produtos">Ver a coleção</a></div>`
}

if (product) {
  const related = await api(`/products?categoria=${encodeURIComponent(product.category.slug)}&porPagina=5`).catch(() => ({ items: [] }))
  let items = related.items.filter((r) => r.id !== product.id)
  if (items.length < 4) {
    const more = await api('/products?destaque=true&porPagina=8').catch(() => ({ items: [] }))
    items = [...items, ...more.items.filter((m) => m.id !== product.id && !items.some((i) => i.id === m.id))]
  }
  document.getElementById('related').innerHTML = items.slice(0, 4).map(pieceCard).join('')
  document.getElementById('related-section').hidden = items.length === 0
}
