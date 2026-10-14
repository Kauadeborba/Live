const CLOTHING = ['PP', 'P', 'M', 'G', 'GG']
const ONE_SIZE = ['Único']

export const categories = [
  { slug: 'conjuntos', name: 'Conjuntos', image: '/img/studio-reformer.jpg' },
  { slug: 'leggings', name: 'Leggings', image: '/img/legging-sculpt.jpg' },
  { slug: 'tops', name: 'Tops', image: '/img/top-essential-marinho.jpg' },
  { slug: 'bodies', name: 'Macacões e bodies', image: '/img/body-noir.jpg' },
  { slug: 'camadas', name: 'Camadas', image: '/img/studio-arcos.jpg' },
  { slug: 'acessorios', name: 'Acessórios', image: '/img/yoga-sala.jpg' },
]

const p = (slug, name, category, price, images, description, featured = false, sizes = CLOTHING) => ({
  slug, name, category, gender: 'FEMININO', priceCents: price, images: images.map((img) => `/img/${img}.jpg`), description, featured, sizes,
})

export const products = [
  p('conjunto-salvia', 'Conjunto Sálvia', 'conjuntos', 38900, ['conjunto-sage', 'studio-reformer'], 'Top de alças cruzadas e short de cintura alta em verde-sálvia. Toque de pele, costuras planas, nenhuma marca no corpo.', true),
  p('conjunto-areia', 'Conjunto Areia', 'conjuntos', 36900, ['studio-reformer', 'studio-arcos'], 'Top de decote reto e legging sete-oitavos em tom areia, pensados para o reformer e para o café depois dele.', true),
  p('conjunto-onix', 'Conjunto Ônix', 'conjuntos', 34900, ['conjunto-fight', 'top-core-preto'], 'Preto profundo de compressão firme, para barre e funcional. Fica impecável depois de muitas lavagens.'),
  p('conjunto-pista-lunar', 'Conjunto Lunar', 'conjuntos', 32900, ['legging-motion', 'top-core-preto'], 'Top lilás acinzentado com legging grafite. Tecido leve, que respira, para aulas de alta intensidade.'),
  p('legging-escultura', 'Legging Escultura', 'leggings', 27900, ['legging-sculpt', 'legging-flex'], 'Cintura alta e recortes em tule na panturrilha. Modela sem apertar e não fica transparente.', true),
  p('legging-segunda-pele', 'Legging Segunda Pele', 'leggings', 24900, ['legging-flex', 'legging-sculpt'], 'Elasticidade em quatro direções, cós largo sem costura e toque de cetim fosco.'),
  p('legging-linha', 'Legging Linha', 'leggings', 22900, ['legging-motion', 'legging-flex'], 'Corte sete-oitavos com bolso lateral discreto. Feita para o tapete e para a rua.'),
  p('legging-flare-studio', 'Legging Flare Studio', 'leggings', 25900, ['yoga-sala', 'legging-flex'], 'Boca levemente ampla e cós dobrável. O caimento que leva o look do yoga ao almoço.'),
  p('top-meia-lua', 'Top Meia-Lua', 'tops', 18900, ['top-essential-marinho', 'cat-feminino'], 'Decote arredondado e alças largas em azul-marinho. Sustentação média, bojo removível.', true),
  p('top-nadador-noir', 'Top Nadador Noir', 'tops', 17900, ['top-core-preto', 'conjunto-fight'], 'Costas nadador e faixa inferior larga. Alta sustentação com toque macio.'),
  p('top-alcas-finas', 'Top Alças Finas', 'tops', 15900, ['yoga-sala', 'top-essential-marinho'], 'Alças finas reguláveis e decote em V suave. Para pilates de solo e yoga.'),
  p('top-faixa', 'Top Faixa', 'tops', 16900, ['cat-treino', 'top-core-preto'], 'Modelagem faixa sem alças aparentes, com silicone interno que segura no lugar.'),
  p('body-noir', 'Body Noir', 'bodies', 32900, ['body-noir', 'studio-arcos'], 'Body de manga longa e decote canoa. Linha contínua do ombro ao quadril, para o barre e para a noite.', true),
  p('macacao-arco', 'Macacão Arco', 'bodies', 39900, ['studio-arcos', 'studio-reformer'], 'Macacão inteiriço de alças finas com costas abertas em arco. A peça-assinatura da coleção.', true),
  p('body-laranja-ambar', 'Body Âmbar', 'bodies', 29900, ['cat-feminino', 'top-essential-marinho'], 'Body de alças largas em âmbar queimado, com cavas altas e forro duplo.'),
  p('casaco-tricot-studio', 'Casaco Tricô Studio', 'camadas', 37900, ['studio-arcos', 'yoga-sala'], 'Cardigã de tricô canelado para chegar e sair do studio. Botões de madrepérola.'),
  p('moletom-atelie', 'Moletom Ateliê', 'camadas', 34900, ['moletom-shadow', 'cat-casual'], 'Moletom com capuz estruturado, interior flanelado e caimento amplo.'),
  p('colete-acolchoado', 'Colete Acolchoado', 'camadas', 35900, ['cat-casual', 'moletom-shadow'], 'Colete leve de matelassê fosco, com bolsos de zíper invisível.'),
  p('meia-antiderrapante', 'Meia Antiderrapante', 'acessorios', 15900, ['studio-reformer', 'studio-arcos'], 'Kit com três pares de meias com sola de silicone para pilates e barre.', false, ONE_SIZE),
  p('bolsa-studio', 'Bolsa Studio', 'acessorios', 29900, ['yoga-sala', 'studio-arcos'], 'Bolsa de lona encerada com alça para o tapete e bolso impermeável para a roupa usada.', false, ONE_SIZE),
]
