const CLOTHING = ['PP', 'P', 'M', 'G', 'GG']
const ONE_SIZE = ['Único']

export const categories = [
  { slug: 'conjuntos', name: 'Conjuntos', image: '/img/1.webp' },
  { slug: 'leggings', name: 'Leggings', image: '/img/2.webp' },
  { slug: 'tops', name: 'Tops', image: '/img/3.webp' },
  { slug: 'bodies', name: 'Macacões e bodies', image: '/img/4.webp' },
  { slug: 'camadas', name: 'Camadas', image: '/img/5.webp' },
  { slug: 'acessorios', name: 'Acessórios', image: '/img/6.webp' },
]

const p = (slug, name, category, price, images, description, featured = false, sizes = CLOTHING) => ({
  slug, name, category, gender: 'FEMININO', priceCents: price, images: images.map((img) => `/img/${img}.webp`), description, featured, sizes,
})

export const products = [
  p('conjunto-salvia', 'Conjunto Sálvia', 'conjuntos', 38900, ['7', '8'], 'Top de alças cruzadas e short de cintura alta em verde-sálvia. Toque de pele, costuras planas, nenhuma marca no corpo.', true),
  p('conjunto-areia', 'Conjunto Areia', 'conjuntos', 36900, ['9', '10'], 'Top de decote reto e legging sete-oitavos em tom areia, pensados para o reformer e para o café depois dele.', true),
  p('conjunto-onix', 'Conjunto Ônix', 'conjuntos', 34900, ['11', '12'], 'Preto profundo de compressão firme, para barre e funcional. Fica impecável depois de muitas lavagens.'),
  p('conjunto-pista-lunar', 'Conjunto Lunar', 'conjuntos', 32900, ['13', '14'], 'Top lilás acinzentado com legging grafite. Tecido leve, que respira, para aulas de alta intensidade.'),
  p('legging-escultura', 'Legging Escultura', 'leggings', 27900, ['15', '16'], 'Cintura alta e recortes em tule na panturrilha. Modela sem apertar e não fica transparente.', true),
  p('legging-segunda-pele', 'Legging Segunda Pele', 'leggings', 24900, ['17', '18'], 'Elasticidade em quatro direções, cós largo sem costura e toque de cetim fosco.'),
  p('legging-linha', 'Legging Linha', 'leggings', 22900, ['19', '20'], 'Corte sete-oitavos com bolso lateral discreto. Feita para o tapete e para a rua.'),
  p('legging-flare-studio', 'Legging Flare Studio', 'leggings', 25900, ['21', '22'], 'Boca levemente ampla e cós dobrável. O caimento que leva o look do yoga ao almoço.'),
  p('top-meia-lua', 'Top Meia-Lua', 'tops', 18900, ['23', '24'], 'Decote arredondado e alças largas em azul-marinho. Sustentação média, bojo removível.', true),
  p('top-nadador-noir', 'Top Nadador Noir', 'tops', 17900, ['25', '26'], 'Costas nadador e faixa inferior larga. Alta sustentação com toque macio.'),
  p('top-alcas-finas', 'Top Alças Finas', 'tops', 15900, ['27', '28'], 'Alças finas reguláveis e decote em V suave. Para pilates de solo e yoga.'),
  p('top-faixa', 'Top Faixa', 'tops', 16900, ['29', '30'], 'Modelagem faixa sem alças aparentes, com silicone interno que segura no lugar.'),
  p('body-noir', 'Body Noir', 'bodies', 32900, ['31', '32'], 'Body de manga longa e decote canoa. Linha contínua do ombro ao quadril, para o barre e para a noite.', true),
  p('macacao-arco', 'Macacão Arco', 'bodies', 39900, ['33', '34'], 'Macacão inteiriço de alças finas com costas abertas em arco. A peça-assinatura da coleção.', true),
  p('body-laranja-ambar', 'Body Âmbar', 'bodies', 29900, ['35', '36'], 'Body de alças largas em âmbar queimado, com cavas altas e forro duplo.'),
  p('casaco-tricot-studio', 'Casaco Tricô Studio', 'camadas', 37900, ['37', '38'], 'Cardigã de tricô canelado para chegar e sair do studio. Botões de madrepérola.'),
  p('moletom-atelie', 'Moletom Ateliê', 'camadas', 34900, ['39', '40'], 'Moletom com capuz estruturado, interior flanelado e caimento amplo.'),
  p('colete-acolchoado', 'Colete Acolchoado', 'camadas', 35900, ['41', '42'], 'Colete leve de matelassê fosco, com bolsos de zíper invisível.'),
  p('meia-antiderrapante', 'Meia Antiderrapante', 'acessorios', 15900, ['43', '44'], 'Kit com três pares de meias com sola de silicone para pilates e barre.', false, ONE_SIZE),
  p('bolsa-studio', 'Bolsa Studio', 'acessorios', 29900, ['46', '47'], 'Bolsa de lona encerada com alça para o tapete e bolso impermeável para a roupa usada.', false, ONE_SIZE),
]
