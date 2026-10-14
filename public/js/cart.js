import { api, money, session, escape } from './api.js'
import { icon } from './icons.js'
import { refreshBagCount } from './layout.js'
import { STORE } from './store.js'

const root = document.getElementById('bag')
const FREE_SHIPPING = STORE.freeShippingCents
let fulfillment = 'DELIVERY'

const empty = (title, text, href, cta) =>
  `<div class="empty"><h2 class="display">${title}</h2><p>${text}</p><a class="btn" href="${href}">${cta}</a></div>`

function render(bag) {
  lastBag = bag
  if (!bag.items.length) {
    root.innerHTML = empty('Sua sacola está vazia.', 'As peças que você escolher ficam guardadas aqui, na sua conta.', '/produtos', 'Ver a coleção')
    return
  }
  const missing = FREE_SHIPPING ? FREE_SHIPPING - bag.totalCents : null
  root.innerHTML = `
    <div class="bag">
      <section class="bag-list">${bag.items.map((item) => `
        <article class="bag-item" data-id="${item.variantId}" data-stock="${item.stock}">
          <a href="/produto?slug=${encodeURIComponent(item.product.slug)}"><img class="photo" src="${escape(item.product.image)}" alt="${escape(item.product.name)}"></a>
          <div>
            <h3>${escape(item.product.name)}</h3>
            <div class="meta">Tamanho ${escape(item.size)} · ${money(item.product.priceCents)} cada</div>
            <div class="controls">
              <div class="qty" aria-label="Quantidade"><button data-q="-1" aria-label="Diminuir">${icon('minus')}</button><span>${item.quantity}</span><button data-q="1" aria-label="Aumentar">${icon('plus')}</button></div>
              <button class="text-btn" data-remove>Remover</button>
            </div>
          </div>
          <div class="price">${money(item.subtotalCents)}</div>
        </article>`).join('')}
      </section>
      <aside class="receipt">
        <h2 class="display">Resumo</h2>
        <div class="row"><span>${bag.itemCount} ${bag.itemCount === 1 ? 'peça' : 'peças'}</span><span>${money(bag.totalCents)}</span></div>
        <fieldset class="fulfillment">
          <legend class="label">Como prefere receber</legend>
          <label><input type="radio" name="fulfillment" value="DELIVERY" ${fulfillment === 'DELIVERY' ? 'checked' : ''}><span><strong>Entrega</strong><small>${missing !== null && missing <= 0 ? 'Frete cortesia' : 'Frete calculado no envio'}</small></span></label>
          <label><input type="radio" name="fulfillment" value="PICKUP" ${fulfillment === 'PICKUP' ? 'checked' : ''}><span><strong>Retirar na loja</strong><small>Sem custo${STORE.pickupWindow ? ` · ${escape(STORE.pickupWindow)}` : ''}</small></span></label>
        </fieldset>
        ${missing > 0 && fulfillment === 'DELIVERY' ? `<p class="ship-meter"><span>Faltam ${money(missing)} para o frete cortesia</span><i style="--p:${Math.min(100, (bag.totalCents / FREE_SHIPPING) * 100)}%"></i></p>` : ''}
        <div class="row total"><span>Total</span><span>${money(bag.totalCents)}</span></div>
        <button class="btn btn-block" id="checkout">Finalizar pedido</button>
        <p class="fine">Pagamento simulado. Nenhuma cobrança é feita.</p>
      </aside>
    </div>`
}

async function act(request) {
  try {
    render(await request())
    refreshBagCount()
  } catch (err) {
    window.toast(err.message, 'error')
  }
}

let lastBag = null
root.addEventListener('change', (e) => {
  if (e.target.name !== 'fulfillment') return
  fulfillment = e.target.value
  if (lastBag) render(lastBag)
})

root.addEventListener('click', async (e) => {
  const item = e.target.closest('.bag-item')
  const step = e.target.closest('[data-q]')
  if (item && step) {
    const quantity = Number(item.querySelector('.qty span').textContent) + Number(step.dataset.q)
    const stock = Number(item.dataset.stock)
    if (quantity < 1) return
    if (quantity > Math.min(stock, 10)) return window.toast(stock < 10 ? `Temos só ${stock} nesse tamanho.` : 'O limite é de 10 por peça.', 'error')
    act(() => api(`/cart/items/${item.dataset.id}`, { method: 'PATCH', body: { quantity } }))
  }
  if (item && e.target.closest('[data-remove]')) act(() => api(`/cart/items/${item.dataset.id}`, { method: 'DELETE' }))
  if (e.target.id === 'checkout') {
    e.target.disabled = true
    e.target.textContent = 'Finalizando…'
    try {
      const order = await api('/orders', { method: 'POST', body: { fulfillment } })
      location.href = `/pedidos?novo=${order.id}`
    } catch (err) {
      window.toast(err.message, 'error')
      e.target.disabled = false
      e.target.textContent = 'Finalizar pedido'
    }
  }
})

if (!session.loggedIn) {
  root.innerHTML = empty('Entre para ver sua sacola.', 'A sacola fica salva na sua conta, em qualquer aparelho.', '/entrar?voltar=/carrinho', 'Entrar')
} else {
  act(() => api('/cart'))
}
