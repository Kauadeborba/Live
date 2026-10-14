export const STORE = {
  whatsapp: '',
  whatsappMessage: 'Olá! Vim pelo site da Live e gostaria de ajuda.',
  address: '',
  city: '',
  hours: [],
  pickupWindow: '',
  freeShippingCents: null,
  installments: null,
  exchangeDays: null,
  sizeGuide: {
    columns: ['Tamanho', 'Busto', 'Cintura', 'Quadril'],
    rows: [],
  },
}

export const whatsappLink = (text = STORE.whatsappMessage) =>
  STORE.whatsapp ? `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}` : null
