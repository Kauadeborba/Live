import { api, money, session, escape } from './api.js'
import { openDrawer } from './drawer.js'
import { STORE } from './store.js'

export async function refreshBagCount() {
  const badge = document.querySelector('.bag-count')
  if (!badge || !session.loggedIn) return
  try {
    const { itemCount } = await api('/cart')
    badge.textContent = itemCount
    badge.hidden = itemCount === 0
  } catch {}
}

function lines(bag, highlight) {
  return bag.items.map((item) => `
    <div class="mini-item ${item.variantId === highlight ? 'just-added' : ''}">
      <img class="photo" src="${escape(item.product.image)}" alt="">
      <div>
        <strong>${escape(item.product.name)}</strong>
        <span class="muted">Tamanho ${escape(item.size)} · ${item.quantity} ${item.quantity === 1 ? 'unidade' : 'unidades'}</span>
      </div>
      <span>${money(item.subtotalCents)}</span>
    </div>`).join('')
}

export async function openBag(highlight) {
  if (!session.loggedIn) {
    location.href = `/entrar?voltar=${encodeURIComponent(location.pathname + location.search)}`
    return
  }
  let bag
  try { bag = await api('/cart') } catch (err) { return window.toast(err.message, 'error') }
  const missing = STORE.freeShippingCents ? STORE.freeShippingCents - bag.totalCents : null
  if (!bag.items.length) {
    openDrawer({ title: 'Sacola', body: '<p class="muted">Sua sacola está vazia.</p>', footer: '<a class="btn btn-block" href="/produtos">Ver a coleção</a>' })
    return
  }
  openDrawer({
    title: highlight ? 'Adicionado à sacola' : 'Sacola',
    body: `${missing === null ? '' : missing > 0 ? `<p class="ship-meter"><span>Faltam ${money(missing)} para o frete cortesia</span><i style="--p:${Math.min(100, (bag.totalCents / STORE.freeShippingCents) * 100)}%"></i></p>` : '<p class="ship-meter done"><span>Frete cortesia garantido</span><i style="--p:100%"></i></p>'}${lines(bag, highlight)}`,
    footer: `<div class="row total"><span>Subtotal</span><span>${money(bag.totalCents)}</span></div><a class="btn btn-block" href="/carrinho">Ver sacola e finalizar</a><button class="text-btn" data-close style="justify-self:center">Continuar comprando</button>`,
  })
}

export async function addToBag(variantId, quantity = 1) {
  if (!session.loggedIn) {
    location.href = `/entrar?voltar=${encodeURIComponent(location.pathname + location.search)}`
    return false
  }
  await api('/cart/items', { method: 'POST', body: { variantId, quantity } })
  refreshBagCount()
  openBag(variantId)
  return true
}
