# Fotos da Live

As fotos atuais são provisórias (Unsplash). Para usar as suas, **substitua o arquivo mantendo o mesmo nome**: o site atualiza sozinho.

Formato recomendado: JPG, vertical 3:4 (ex.: 1200×1600) para produtos; horizontal ou vertical alta para as fotos de campanha.

| Arquivo | Onde aparece |
|---|---|
| studio-arcos.jpg | Foto principal da home, categoria Camadas, Macacão Arco |
| studio-reformer.jpg | Seção "Feito para o reformer", menu Coleção, categoria Conjuntos |
| body-noir.jpg | Página Entrar, menu Coleção, Body Noir, categoria Macacões e bodies |
| yoga-sala.jpg | Categoria Acessórios, Legging Flare, Top Alças Finas, Bolsa Studio |
| conjunto-sage.jpg, legging-*.jpg, top-*.jpg, ... | Fotos das peças (veja `prisma/seed-data.js`) |

## Fotos por peça

Cada produto tem uma lista de fotos em `prisma/seed-data.js` (a primeira é a capa, a segunda aparece ao passar o mouse). Para dar fotos exclusivas a cada peça:

1. Salve como `public/img/<slug-da-peca>-1.jpg`, `-2.jpg`, `-3.jpg` (ex.: `macacao-arco-1.jpg`).
2. No `seed-data.js`, troque a lista da peça por `['macacao-arco-1', 'macacao-arco-2', 'macacao-arco-3']`.
3. Rode `npm run db:seed`.
