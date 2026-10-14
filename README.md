# Live · loja de estudo

E-commerce fictício de moda esportiva para praticar **backend**: API REST com
Express 5, Prisma, PostgreSQL, JWT e testes de integração. O front (HTML/CSS/JS
puro em `public/`) só consome a API.

## Rodando

Precisa de Node 22+ e Docker.

```bash
docker compose up -d      # Postgres na porta 5433 (+ banco live_test)
npm install
npm run db:reset          # cria as tabelas e popula com produtos de exemplo
npm run dev               # http://localhost:3000
```

- Loja: http://localhost:3000
- Documentação da API (Swagger): http://localhost:3000/docs
- Usuário de teste: `cliente@live.dev` / `live123`
- Testes: `npm test` (usam o banco `live_test`, separado do de desenvolvimento)

## Estrutura

```
prisma/
  schema.prisma        modelos: Category, Product, Variant, User, CartItem, Order, OrderItem
  seed.js, seed-data.js  dados de exemplo
src/
  app.js               monta o Express (rotas, docs, estáticos, erros)
  server.js            sobe o servidor
  openapi.js           especificação do Swagger
  lib/                 prisma client, JWT, erros HTTP
  middlewares/         authenticate (Bearer JWT), validate (Zod), errorHandler
  modules/             auth, catalog, cart, orders
tests/                 integração com Vitest + Supertest
public/                front da loja
```

## Endpoints

| Método | Rota | Auth | O que faz |
|---|---|---|---|
| POST | /api/auth/register | | cria conta, devolve token |
| POST | /api/auth/login | | login, devolve token |
| GET | /api/auth/me | ✓ | usuário logado |
| GET | /api/categories | | categorias com contagem |
| GET | /api/products | | filtros: categoria, genero, busca, precoMin, precoMax (centavos), destaque, ordem, pagina, porPagina |
| GET | /api/products/:slug | | detalhe com tamanhos e estoque |
| GET | /api/cart | ✓ | carrinho |
| POST | /api/cart/items | ✓ | adiciona `{ variantId, quantity }` |
| PATCH | /api/cart/items/:variantId | ✓ | altera quantidade |
| DELETE | /api/cart/items/:variantId | ✓ | remove item |
| POST | /api/orders | ✓ | fecha pedido com o carrinho |
| GET | /api/orders, /api/orders/:id | ✓ | pedidos do usuário |

## Conceitos para revisar no código

- **Dinheiro em centavos** (`priceCents`): evita erro de arredondamento de float.
- **Transação** no checkout (`orders.routes.js`): baixa estoque, cria pedido e
  limpa carrinho juntos; se um item falha, nada é gravado.
- **Update condicional** (`updateMany where stock >= quantity`): evita vender
  além do estoque quando duas compras acontecem ao mesmo tempo.
- **Snapshot no pedido** (`OrderItem.productName`, `unitPriceCents`): o pedido não
  muda se o preço do produto mudar depois.
- **Erros padronizados**: `HttpError` + `errorHandler` → 400/401/404/409 com `{ error, details }`.
- **Autorização por dono**: `findFirst({ id, userId })` faz pedido de outra pessoa dar 404.
- **Senha com hash** (bcrypt) e o hash nunca sai na resposta.

## Exercícios

Do mais fácil ao mais difícil. Escreva o teste primeiro e depois o código.

1. **Paginação no `/api/orders`**, igual à de produtos.
2. **Cancelar pedido**: `POST /api/orders/:id/cancel`, só se `PENDING`, devolvendo o estoque (em transação).
3. **Pagar pedido (simulado)**: `POST /api/orders/:id/pay` muda para `PAID`; pedido pago não pode ser cancelado.
4. **Cupom de desconto**: modelo `Coupon` (código, % ou valor fixo, validade, uso máximo) e aplicação no checkout.
5. **Papel de admin**: campo `role` no `User`, middleware `requireAdmin` e CRUD de produtos/variações.
6. **Favoritos**: `POST/DELETE /api/favorites/:productId` e `GET /api/favorites`.
7. **Avaliações**: só quem comprou o produto pode avaliar (1–5); a média aparece no detalhe do produto.
8. **Frete no backend**: hoje o front calcula; mova a regra (grátis ≥ R$ 299, senão R$ 19,90) para a API e grave no `Order`.
9. **Rate limit no login** (ex.: 5 tentativas/min por IP) sem biblioteca.
10. **Refresh token**: access token curto (15 min) + refresh token guardado no banco, com logout invalidando-o.
11. **Teste de concorrência**: dispare dois checkouts em paralelo para a última unidade e prove que só um passa.
12. **Migrations de verdade**: troque `db push` por `prisma migrate dev` e crie uma migration para o exercício 4.

## Imagens

Fotos do [Unsplash](https://unsplash.com) sob a Unsplash License (uso livre).
A marca Live, os textos e o layout são fictícios e foram criados para estudo.

## Dados da loja física

WhatsApp, endereço, horário, aviso de retirada, valor do frete cortesia e a tabela do guia de medidas ficam em
`public/js/store.js`. Preencha, por exemplo:

```js
whatsapp: '5511999999999',          // só números, com DDI e DDD
address: 'Rua Exemplo, 123',
city: 'São Paulo, SP',
hours: ['Seg a sex · 10h às 20h', 'Sáb · 10h às 18h'],
sizeGuide: { columns: ['Tamanho', 'Busto', 'Cintura', 'Quadril'], rows: [['P', '84–88', '64–68', '92–96']] },
```

Enquanto `whatsapp` estiver vazio, os botões "Fale com uma consultora" não aparecem.

## Fotos

Veja `public/img/LEIA-ME.md`: basta substituir os arquivos mantendo os nomes.
