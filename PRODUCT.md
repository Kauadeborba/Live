# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Clientes atuais da loja física: mulheres de alto padrão, consumidoras de marcas femininas premium, que treinam em studios boutique (pilates, yoga, barre, academia premium) e usam a roupa de treino também fora dele, no café, no trânsito, no dia a dia. Compram pelo celular e no desktop, buscando peças que funcionem para o treino e para o look.

## Product Purpose
Loja online da Live, marca real de activewear feminino que já tem loja física e clientela fiel; o site é o primeiro canal digital. O backend (Express, Prisma, Postgres) também serve de estudo para o dono. Sucesso: a cliente que já compra na loja encontra online o mesmo padrão de sofisticação das marcas femininas premium que ela consome, escolhe o tamanho, monta a sacola e fecha o pedido (entrega ou retirada na loja) sem atrito.

## Positioning
Activewear "acessível-chique": estética de moda editorial com preço de R$ 150–400. Não é marca de corrida nem de performance esportiva: é roupa de treino como peça de guarda-roupa.

## Operating Context
Catálogo servido pela API própria (/api): categorias, produtos com variações de tamanho e estoque, carrinho por usuário, pedidos (entrega ou retirada na loja) e login com JWT. Pagamento ainda simulado. Atendimento humano por WhatsApp com consultora; retirada na loja física.

## Capabilities and Constraints
- Front em HTML/CSS/JS puro em public/, servido pelo Express; os endpoints da API não mudam.
- O catálogo é só feminino: tops, leggings, conjuntos, macacões e bodies, casacos e camadas, acessórios.
- Preços em centavos, faixa de R$ 150 a R$ 400. Parcelamento, frete cortesia, prazo de retirada e política de trocas ainda não foram confirmados pela dona: ficam vazios em public/js/store.js e não aparecem no site até serem preenchidos.
- Dados da loja física (WhatsApp, endereço, horário, tabela de medidas) ficam em public/js/store.js e ainda não foram informados; não inventar.

## Brand Commitments
- Nome: Live (real). Sem logo ainda; wordmark tipográfico provisório. Usuário pediu "clean girl", tom Zara/editorial, sofisticado, "cara de mulher rica"; sem pegada de corrida ou atletismo.
- Nenhum material, nome ou imagem de marcas reais.

## Evidence on Hand
- Fotos do Unsplash em public/img (Unsplash License) são provisórias; a dona tem fotos próprias de produto e modelo e vai substituí-las mantendo os nomes de arquivo (ver public/img/LEIA-ME.md).
- Não existem depoimentos, imprensa, clientes reais ou números da marca; não inventar como se fossem reais.

## Product Principles
- A peça é a protagonista: muito respiro, pouca interface.
- Sofisticação vem de contenção, não de enfeite.
- Comprar precisa ser simples: tamanho, sacola, pedido.
