import { money, installments, escape } from './api.js'
import { addToBag } from './bag.js'

const sizesOf = (p) => (p.variants ?? []).map((v) =>
  `<button type="button" class="quick-size" data-variant="${v.id}" ${v.stock ? '' : 'disabled'} aria-label="Adicionar ${escape(p.name)}, tamanho ${escape(v.size)}${v.stock ? '' : ', esgotado'}">${escape(v.size)}</button>`).join('')

export const pieceCard = (p) => `
  <article class="piece">
    <a class="piece-media" href="/produto?slug=${encodeURIComponent(p.slug)}">
      ${p.images.slice(0, 2).map((src, i) => `<img class="photo" src="${escape(src)}" alt="${i ? '' : escape(p.name)}" loading="lazy">`).join('')}
    </a>
    ${p.variants?.length ? `<div class="quick" role="group" aria-label="Compra rápida"><span class="label">Adicionar</span><div>${sizesOf(p)}</div></div>` : ''}
    <a href="/produto?slug=${encodeURIComponent(p.slug)}" class="piece-info">
      <div class="piece-line"><h3>${escape(p.name)}</h3><span class="price">${money(p.priceCents)}</span></div>
      <div class="terms">${installments(p.priceCents)}</div>
    </a>
  </article>`

export const skeletonPieces = (n) => Array.from({ length: n }, () => `
  <div><div class="skeleton" style="aspect-ratio:3/4;margin-bottom:18px"></div><div class="skeleton" style="height:14px;width:60%"></div></div>`).join('')

document.addEventListener('click', async (e) => {
  const button = e.target.closest('.quick-size')
  if (!button || button.disabled) return
  button.disabled = true
  try {
    await addToBag(Number(button.dataset.variant))
  } catch (err) {
    window.toast(err.message, 'error')
  } finally {
    button.disabled = false
  }
})
