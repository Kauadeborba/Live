const paths = {
  bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M4 12h16m-5-5 5 5-5 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  filter: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  wash: '<path d="M3 8h18l-2 11H5L3 8Z"/><path d="M3 8c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/><path d="M9 14c1 .8 2 .8 3 0s2-.8 3 0"/>',
  bleach: '<path d="M12 4 21 20H3L12 4Z"/><path d="m7 9 10 10M17 9 7 19"/>',
  iron: '<path d="M4 17h17c0-5-3-9-8-9H8"/><path d="M4 17c0-3 1-5 4-6"/><circle cx="12.5" cy="13.5" r=".6"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
  store: '<path d="M4 9h16l-1-4H5L4 9Z"/><path d="M5 9v11h14V9"/><path d="M10 20v-6h4v6"/>',
  swap: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="1"/><path d="M3 10h18M7 15h4"/>',
  chat: '<path d="M4 18.5 5.3 15A7.5 7.5 0 1 1 8 17.6L4 18.5Z"/>',
  heart: '<path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.6 12 19 12 19Z"/>',
  grid2: '<rect x="4" y="4" width="7" height="16"/><rect x="13" y="4" width="7" height="16"/>',
  grid4: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  shade: '<rect x="4" y="4" width="16" height="16"/><path d="M4 4l6 6M10 4l6 6M16 4l4 4"/>',
}

export const icon = (name, label) =>
  `<svg class="icon" viewBox="0 0 24 24" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${paths[name]}</svg>`
