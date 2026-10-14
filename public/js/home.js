import { api, escape } from './api.js'
import { pieceCard, skeletonPieces } from './product-card.js'

const featured = document.getElementById('featured')
const latest = document.getElementById('latest')
featured.innerHTML = skeletonPieces(5)
latest.innerHTML = skeletonPieces(4)

const [categories, highlights, recent] = await Promise.all([
  api('/categories'),
  api('/products?destaque=true&porPagina=5'),
  api('/products?ordem=recentes&porPagina=5'),
])

const list = document.getElementById('categories')
const frame = document.getElementById('category-frame')
list.innerHTML = categories.map((c, i) => `
  <li><a href="/produtos?categoria=${encodeURIComponent(c.slug)}" data-i="${i}">
    <strong>${escape(c.name)}</strong><small>${String(c.productCount).padStart(2, '0')} peças</small>
  </a></li>`).join('')
frame.innerHTML = categories.map((c) => `<img class="photo" src="${escape(c.image)}" alt="" loading="lazy">`).join('')

const show = (i) => {
  list.querySelectorAll('a').forEach((a) => a.classList.toggle('active', Number(a.dataset.i) === i))
  frame.querySelectorAll('img').forEach((img, j) => img.classList.toggle('show', j === i))
}
list.addEventListener('pointerover', (e) => { const a = e.target.closest('a'); if (a) show(Number(a.dataset.i)) })
list.addEventListener('focusin', (e) => { const a = e.target.closest('a'); if (a) show(Number(a.dataset.i)) })
show(0)

const lead = ['macacao-arco', 'conjunto-areia']
const rank = (p) => (lead.includes(p.slug) ? lead.indexOf(p.slug) : lead.length)
featured.innerHTML = [...highlights.items].sort((a, b) => rank(a) - rank(b)).map(pieceCard).join('')
latest.innerHTML = recent.items.map(pieceCard).join('')
