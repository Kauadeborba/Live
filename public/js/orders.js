import { api, money, session, params, escape } from './api.js'

const STATUS = { PENDING: 'Aguardando pagamento', PAID: 'Pago', CANCELED: 'Cancelado' }
const root = document.getElementById('orders')

document.getElementById('logout').addEventListener('click', () => {
  session.token = null
  location.href = '/'
})

if (!session.loggedIn) location.replace('/entrar?voltar=/pedidos')

const created = params().get('novo')
if (created) document.getElementById('notice').innerHTML = `<p class="confirm">Pedido nº ${escape(created)} recebido. Obrigada por escolher a Live.</p>`

try {
  const [me, orders] = await Promise.all([api('/auth/me'), api('/orders')])
  document.getElementById('account').textContent = me.name.split(' ')[0]
  root.innerHTML = orders.length
    ? orders.map((o) => `
      <article class="order">
        <header>
          <div><h2 class="display">Pedido nº ${o.id}</h2><div class="muted" style="font-size:13px">${new Date(o.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div></div>
          <div class="order-meta"><span class="status">${STATUS[o.status]}</span><span class="muted">${o.fulfillment === 'PICKUP' ? 'Retirada na loja' : 'Entrega'}</span></div>
        </header>
        <ul>${o.items.map((i) => `<li><span>${i.quantity} × ${escape(i.productName)} · ${escape(i.size)}</span><span>${money(i.unitPriceCents * i.quantity)}</span></li>`).join('')}</ul>
        <div class="total"><span>Total</span><span>${money(o.totalCents)}</span></div>
      </article>`).join('')
    : '<div class="empty"><h2 class="display">Você ainda não fez pedidos.</h2><p>Quando fizer, eles aparecem aqui com o status de cada um.</p><a class="btn" href="/produtos">Ver a coleção</a></div>'
} catch (err) {
  root.innerHTML = `<p class="alert">${escape(err.message)}</p>`
}
