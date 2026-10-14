import { api, params, escape } from './api.js'
import { pieceCard, skeletonPieces } from './product-card.js'

const state = Object.fromEntries(params())
const $ = (id) => document.getElementById(id)
let latestRequest = 0

function syncUrl() {
  const clean = Object.fromEntries(Object.entries(state).filter(([, v]) => v !== '' && v !== undefined))
  history.replaceState(null, '', `/produtos${Object.keys(clean).length ? `?${new URLSearchParams(clean)}` : ''}`)
  return new URLSearchParams(clean)
}

function title(categories) {
  if (state.busca) return `“${escape(state.busca)}”`
  const category = categories.find((c) => c.slug === state.categoria)
  if (category) return escape(category.name)
  return state.destaque ? 'Peças-assinatura' : 'A coleção'
}

function renderChips(categories) {
  $('chips').innerHTML = [{ slug: '', name: 'Tudo', productCount: categories.reduce((s, c) => s + c.productCount, 0) }, ...categories]
    .map((c) => `<button data-slug="${escape(c.slug)}" aria-pressed="${(state.categoria ?? '') === c.slug}">${escape(c.name)}<sup>${c.productCount}</sup></button>`).join('')
}

async function load(categories) {
  const requestId = ++latestRequest
  const query = syncUrl()
  $('title').innerHTML = title(categories)
  renderChips(categories)
  $('products').innerHTML = skeletonPieces(8)
  try {
    const page = await api(`/products?${query}`)
    if (requestId !== latestRequest) return
    $('count').textContent = `${page.total} ${page.total === 1 ? 'peça' : 'peças'}`
    $('products').innerHTML = page.items.length
      ? page.items.map(pieceCard).join('')
      : '<div class="empty" style="grid-column:1/-1"><h2 class="display">Nenhuma peça com esses filtros.</h2><p>Tente outra faixa de preço ou volte para a coleção inteira.</p><a class="btn btn-line" href="/produtos">Ver a coleção</a></div>'
    $('pagination').innerHTML = page.totalPaginas > 1
      ? Array.from({ length: page.totalPaginas }, (_, i) => `<button data-page="${i + 1}" ${i + 1 === page.pagina ? 'aria-current="page"' : ''}>${String(i + 1).padStart(2, '0')}</button>`).join('')
      : ''
  } catch (err) {
    if (requestId !== latestRequest) return
    $('products').innerHTML = `<p class="alert" style="grid-column:1/-1">${escape(err.message)}. Recarregue a página para tentar de novo.</p>`
  }
}

const DENSITY_KEY = 'live.density'
const setDensity = (cols) => {
  $('products').dataset.cols = cols
  document.querySelectorAll('.density button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cols === cols))
  try { localStorage.setItem(DENSITY_KEY, cols) } catch {}
}
let savedDensity = '4'
try { savedDensity = localStorage.getItem(DENSITY_KEY) ?? '4' } catch {}
setDensity(savedDensity)
document.querySelector('.density').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) setDensity(b.dataset.cols) })

const categories = await api('/categories')
const toCents = (v) => (v === '' ? '' : String(Math.round(Number(v) * 100)))
const fromCents = (v) => (v ? String(Number(v) / 100) : '')

$('ordem').value = state.ordem ?? 'recentes'
$('destaque').checked = state.destaque === 'true'
$('precoMin').value = fromCents(state.precoMin)
$('precoMax').value = fromCents(state.precoMax)
if (state.precoMin || state.precoMax || state.destaque) $('drawer').hidden = false

const update = (changes) => { Object.assign(state, changes, { pagina: changes.pagina ?? '' }); load(categories) }

$('chips').addEventListener('click', (e) => {
  const button = e.target.closest('button')
  if (button) update({ categoria: button.dataset.slug, busca: '' })
})
$('toggle-drawer').addEventListener('click', (e) => {
  $('drawer').hidden = !$('drawer').hidden
  e.currentTarget.setAttribute('aria-expanded', !$('drawer').hidden)
})
$('drawer').addEventListener('change', (e) => {
  const { id, value, checked } = e.target
  if (id === 'destaque') update({ destaque: checked ? 'true' : '' })
  if (id === 'precoMin' || id === 'precoMax') update({ [id]: toCents(value) })
})
$('ordem').addEventListener('change', (e) => update({ ordem: e.target.value }))
$('clear').addEventListener('click', () => { location.href = '/produtos' })
$('pagination').addEventListener('click', (e) => {
  if (!e.target.dataset.page) return
  update({ pagina: e.target.dataset.page })
  scrollTo({ top: 0, behavior: 'smooth' })
})

load(categories)
