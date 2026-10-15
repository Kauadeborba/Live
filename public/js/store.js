export const STORE = {
  whatsapp: '5548996133848',
  whatsappMessage: 'Olá! Vim pelo site da Live e gostaria de ajuda.',
  address: '',
  city: '',
  hours: [],
  pickupWindow: '',
  freeShippingCents: null,
  installments: null,
  exchangeDays: null,
  social: { instagram: 'https://www.instagram.com/_camilasaturno/', facebook: '', youtube: '' },
  promos: [
    'Frete grátis na 1ª compra com o cupom BEMVINDOOFF',
    'Nova coleção Verão 27',
  ],
  sizeGuide: {
    columns: ['Tamanho', 'Busto', 'Cintura', 'Quadril'],
    rows: [],
  },
}

export const whatsappLink = (text = STORE.whatsappMessage) =>
  STORE.whatsapp ? `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}` : null
