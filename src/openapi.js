const bearer = [{ bearerAuth: [] }]
const json = (schema) => ({ content: { 'application/json': { schema } } })
const ok = (description) => ({ description })
const query = (name, schema, description) => ({ in: 'query', name, schema, description })
const path = (name) => ({ in: 'path', name, required: true, schema: { type: name === 'slug' ? 'string' : 'integer' } })

export const openapi = {
  openapi: '3.0.3',
  info: { title: 'Live Store API', version: '1.0.0', description: 'API de estudo de um e-commerce esportivo. Preços em centavos.' },
  components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'], summary: 'Cria conta e devolve token',
        requestBody: json({ type: 'object', required: ['name', 'email', 'password'], properties: { name: { type: 'string', example: 'Ana Teste' }, email: { type: 'string', example: 'ana@exemplo.com' }, password: { type: 'string', example: 'segredo123' } } }),
        responses: { 201: ok('Criado'), 400: ok('Dados inválidos'), 409: ok('E-mail já cadastrado') },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'], summary: 'Login com e-mail e senha',
        requestBody: json({ type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', example: 'cliente@live.dev' }, password: { type: 'string', example: 'live123' } } }),
        responses: { 200: ok('Token JWT'), 401: ok('Credenciais inválidas') },
      },
    },
    '/api/auth/me': { get: { tags: ['Auth'], summary: 'Usuário logado', security: bearer, responses: { 200: ok('Usuário'), 401: ok('Sem token') } } },
    '/api/categories': { get: { tags: ['Catálogo'], summary: 'Lista categorias', responses: { 200: ok('Categorias') } } },
    '/api/products': {
      get: {
        tags: ['Catálogo'], summary: 'Lista produtos com filtros e paginação',
        parameters: [
          query('categoria', { type: 'string' }, 'slug da categoria'),
          query('genero', { type: 'string', enum: ['MASCULINO', 'FEMININO', 'UNISSEX'] }),
          query('busca', { type: 'string' }),
          query('precoMin', { type: 'integer' }, 'centavos'),
          query('precoMax', { type: 'integer' }, 'centavos'),
          query('destaque', { type: 'boolean' }),
          query('ordem', { type: 'string', enum: ['recentes', 'menor-preco', 'maior-preco', 'nome'] }),
          query('pagina', { type: 'integer', default: 1 }),
          query('porPagina', { type: 'integer', default: 12 }),
        ],
        responses: { 200: ok('Página de produtos'), 400: ok('Filtro inválido') },
      },
    },
    '/api/products/{slug}': { get: { tags: ['Catálogo'], summary: 'Detalhe do produto com tamanhos e estoque', parameters: [path('slug')], responses: { 200: ok('Produto'), 404: ok('Não encontrado') } } },
    '/api/cart': { get: { tags: ['Carrinho'], summary: 'Carrinho do usuário', security: bearer, responses: { 200: ok('Carrinho') } } },
    '/api/cart/items': {
      post: {
        tags: ['Carrinho'], summary: 'Adiciona item (soma se já existir)', security: bearer,
        requestBody: json({ type: 'object', required: ['variantId'], properties: { variantId: { type: 'integer' }, quantity: { type: 'integer', default: 1 } } }),
        responses: { 201: ok('Carrinho atualizado'), 404: ok('Variação inexistente'), 409: ok('Sem estoque') },
      },
    },
    '/api/cart/items/{variantId}': {
      patch: {
        tags: ['Carrinho'], summary: 'Altera quantidade', security: bearer, parameters: [path('variantId')],
        requestBody: json({ type: 'object', required: ['quantity'], properties: { quantity: { type: 'integer' } } }),
        responses: { 200: ok('Carrinho atualizado'), 404: ok('Item fora do carrinho'), 409: ok('Sem estoque') },
      },
      delete: { tags: ['Carrinho'], summary: 'Remove item', security: bearer, parameters: [path('variantId')], responses: { 200: ok('Carrinho atualizado'), 404: ok('Item fora do carrinho') } },
    },
    '/api/orders': {
      post: { tags: ['Pedidos'], summary: 'Fecha o pedido com o carrinho (transação)', security: bearer, requestBody: json({ type: 'object', properties: { fulfillment: { type: 'string', enum: ['DELIVERY', 'PICKUP'], default: 'DELIVERY' } } }), responses: { 201: ok('Pedido criado'), 400: ok('Carrinho vazio'), 409: ok('Sem estoque') } },
      get: { tags: ['Pedidos'], summary: 'Pedidos do usuário', security: bearer, responses: { 200: ok('Pedidos') } },
    },
    '/api/orders/{id}': { get: { tags: ['Pedidos'], summary: 'Detalhe de um pedido do usuário', security: bearer, parameters: [path('id')], responses: { 200: ok('Pedido'), 404: ok('Não encontrado') } } },
  },
}
