---
name: Live
description: Activewear feminino apresentado como etiqueta de ateliê, sobre papel branco-gelo e sarja greige.
colors:
  paper: "#fafaf8"
  twill: "#e6e1da"
  twill-deep: "#d8d0c5"
  ink: "#221e1b"
  ink-pressed: "#3a332e"
  ink-soft: "#5e5650"
  thread: "#7e6656"
  line: "rgba(34, 30, 27, 0.14)"
  linen-white: "#ffffff"
  sold-out: "#b3aaa1"
  danger: "#9b3b2e"
typography:
  display:
    fontFamily: "'Montserrat', system-ui, sans-serif"
    fontSize: "clamp(48px, 5.6vw, 88px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "opsz auto"
  headline:
    fontFamily: "'Montserrat', system-ui, sans-serif"
    fontSize: "clamp(38px, 5vw, 72px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Montserrat', system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.16em"
    fontFeature: "'tnum' 1"
  button:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  badge: "9px"
  eyelet: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  wrap: "1360px"
  section: "clamp(72px, 10vw, 140px)"
  grid-row: "44px"
  grid-col: "20px"
  tag-top: "64px"
  tag-side: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 34px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.ink-pressed}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 34px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tag:
    backgroundColor: "{colors.twill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "64px 40px 36px"
  tag-hero:
    backgroundColor: "{colors.paper}"
    padding: "64px 44px 44px"
    width: "460px"
  size-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  size-label-selected:
    backgroundColor: "{colors.linen-white}"
    textColor: "{colors.thread}"
  size-label-sold-out:
    backgroundColor: "transparent"
    textColor: "{colors.sold-out}"
  quick-size:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "36px"
  quick-size-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "48px"
  status:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "5px 10px"
  drawer-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "440px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  toast-error:
    backgroundColor: "{colors.danger}"
  bag-count:
    backgroundColor: "{colors.thread}"
    textColor: "{colors.paper}"
    rounded: "{rounded.badge}"
    height: "18px"
---

# Design System: Live

## Overview

**Creative North Star: "A Etiqueta de Ateliê"**

Cada peça da Live é apresentada como se estivesse num provador de ateliê: uma tag de sarja com cantos cortados, ilhós e pesponto tracejado, pendurada por um fio caramelo. Composição, toque e uso são escritos em linhas de etiqueta; o tamanho é escolhido numa etiqueta tecida; levar à sacola carimba a tag. O mundo é feito de papel, sarja, tinta e linha, e nada além disso.

A densidade é baixa e editorial. Fotos grandes sangram até a borda ou ocupam colunas inteiras; a interface fica em tinta café sobre branco-gelo, com regras finas de 1px no lugar de caixas. O display é Montserrat leve em escala grande; a UI é Inter pequena, com rótulos em caixa alta espaçada e números tabulares. Profundidade vem de camadas tonais (papel sobre sarja) e de sombras longas e difusas apenas em objetos que flutuam.

O sistema rejeita a vitrine de e-commerce genérica: grade de cards com sombra, selos, banners promocionais, pegada de corrida ou performance esportiva.

**Key Characteristics:**
- A tag com ilhós e pesponto é a única moldura de destaque do sistema; o resto é aberto, separado por linhas de 1px.
- Cantos retos em tudo; o único arredondamento é o que é circular no objeto real (ilhós, carimbo, contador).
- Caramelo é linha física (fio, pesponto) e marca de estado escolhido; nunca decoração.
- Movimento de tecido: balanço amortecido a partir do ilhós e ease exponencial longo em tudo.
- Promessas comerciais só existem na tela quando a loja as preenche.

## Colors

Paleta de ateliê quase monocromática: papel, sarja e tinta em tons quentes, com uma única linha caramelo.

### Primary
- **Linha Caramelo** (`thread`): o fio que pendura as tags, o pesponto tracejado (a 45% de opacidade), o pesponto e o texto do tamanho escolhido, o sublinhado do filtro e da aba ativa, o contorno da entrega escolhida, a barra de frete, o anel de foco, o cursor de texto, a seleção de texto, o `accent-color` de rádios e checkboxes, e o carimbo "Na sacola".

### Neutral
- **Tinta Café** (`ink`): texto principal, botão primário, régua superior de listas (1px), barra de aviso, bloco editorial escuro, toast.
- **Tinta Pressionada** (`ink-pressed`): hover do botão primário.
- **Tinta Suave** (`ink-soft`): texto secundário, metadados, rótulos de linhas de etiqueta, filtros não selecionados.
- **Branco-Gelo** (`paper`): fundo de página, drawers, mega-menu, tag do hero, etiqueta de tamanho em repouso.
- **Branco Linho** (`linen-white`): fundo da etiqueta de tamanho em hover e selecionada; o único branco puro.
- **Sarja Greige** (`twill`): corpo das tags, lateral do hero, bloco de cadastro, rodapé, placeholder de foto, trilho da barra de frete.
- **Sarja Funda** (`twill-deep`): aro do ilhós, barra de rolagem, pontos da galeria mobile.
- **Linha** (`line`): divisórias de 1px entre linhas, cabeçalho, drawers.
- **Esgotado** (`sold-out`): texto riscado de tamanhos sem estoque.

### Tertiary
- **Perigo** (`danger`): apenas mensagens de erro (texto de alerta com régua superior, toast de erro). Nunca decorativo.

### Named Rules
**The Linha Caramelo Rule.** O caramelo só aparece em seleção, foco, entrega escolhida e barra de frete, além de ser a própria linha da tag (fio e pesponto) e o carimbo que confirma a escolha. Se não é linha nem estado escolhido, não é caramelo.

**The Sem Branco Rule.** O fundo é sempre branco-gelo; branco puro só existe dentro da etiqueta de tamanho ativa.

## Typography

**Display Font:** Montserrat (com system-ui, sans-serif), pesos 400 a 700; também nos menus
**Body Font:** Inter (com system-ui, sans-serif), pesos 400, 500 e 600

**Character:** Didone de alto contraste em escala de moda contra uma grotesca discreta e técnica; a revista e a etiqueta de composição.

### Hierarchy
- **Display** (400, clamp(48px, 5.6vw, 88px), 1.02, -0.02em): título da tag do hero e títulos de página (até clamp(48px, 7vw, 104px)). `text-wrap: balance`.
- **Headline** (400, clamp(38px, 5vw, 72px), 1.02): títulos de seção, nome da peça no painel de compra (clamp(40px, 4.6vw, 68px)), bloco editorial, cadastro.
- **Title** (400, 24–34px, 1.15): cabeçalho de drawer (28px), resumo da sacola (34px), pedido (30px), nome do item na sacola (24px), links do mega-menu (22px) e índice de categorias em Montserrat grande.
- **Body** (400, 15px, 1.6): texto corrido; descrições limitadas a 42–46ch. Metadados em 12.5–13px.
- **Label** (600, 11px, 0.16em, caixa alta): rótulos de linhas de etiqueta, cabeçalhos de rodapé, legendas de campo, status de pedido. Botões e links de ação usam a mesma voz em 12px.

Os "versaletes espaçados" do contrato estão implementados como caixa alta pequena com tracking de 0.14–0.16em, não como `font-variant: small-caps`.

### Named Rules
**The Números Tabulares Rule.** O corpo inteiro roda com `font-variant-numeric: tabular-nums`; preços, quantidades e totais alinham em coluna.

**The Wordmark Rule.** Enquanto não há logo, o wordmark é "live" em minúsculas em Montserrat 400 (34px no cabeçalho, 28px na tag e no mobile, gigante e cortado no rodapé). Nunca outra fonte.

## Layout

Container de 1360px com gutter fluido (clamp(16px, 4vw, 48px)); seções com respiro vertical de clamp(72px, 10vw, 140px). Cabeçalho em grade de três colunas (navegação, wordmark central, ferramentas), 72px de altura, fixo e translúcido; na home começa transparente sobre o hero e fica sólido após 40px de rolagem.

- **Hero:** 7fr de foto sangrando e 5fr de sarja com a tag gigante pendurada por um fio de 64px.
- **Vitrine:** grade de 4 colunas (44px × 20px). Densidade alternável 2/4: em 2 colunas a foto vira 4:5 e o vão cresce para 56px × 24px. Destaques da home usam a primeira peça em 2×2.
- **Trilho:** rolagem horizontal com snap, 5 peças visíveis no desktop, 62% no mobile.
- **Produto:** galeria 1.25fr e painel de compra 1fr, sticky a 104px.
- **Sacola:** lista + resumo de 400px, sticky.
- **Barra de filtros:** sticky abaixo do cabeçalho, régua de tinta em cima e linha embaixo.

**Responsivo:**
- **1080px:** vitrine e destaques caem para 3 colunas; a peça 2×2 vira 1 linha.
- **860px:** cabeçalho de 60px com botão de menu; navegação vira gaveta à esquerda em Montserrat 22px; mega-menu some. Hero, editorial, produto, sacola e entrar empilham em 1 coluna; a foto de entrar e o quadro do índice somem. Vitrine em 2 colunas (32px × 12px); quick-add e alternador de densidade somem; galeria do produto vira carrossel de 100% com pontos; painel de compra e resumo deixam de ser sticky; padding das tags reduz para 56px 22px.

**The Linha Não Caixa Rule.** Listas, índices, linhas de etiqueta e campos são separados por réguas de 1px (tinta no topo, `line` entre itens); não se envolvem em caixas.

## Elevation & Depth

Sistema tonal: papel sobre sarja e sarja sobre papel fazem a profundidade. Sombras existem só em objetos que flutuam sobre o conteúdo e são sempre longas, difusas e com spread negativo, em tinta café; nunca há sombra em cards de produto.

### Shadow Vocabulary
- **Tag pendurada** (`box-shadow: 0 30px 60px -40px rgba(34, 30, 27, 0.45)`): só a tag do hero, que pende do fio.
- **Botão em hover** (`box-shadow: 0 10px 24px -14px rgba(34, 30, 27, 0.6)`): resposta ao hover do botão primário.
- **Mega-menu** (`box-shadow: 0 30px 40px -30px rgba(34, 30, 27, 0.35)`).
- **Drawer** (`box-shadow: -20px 0 50px -30px rgba(34, 30, 27, 0.5)`; no drawer de busca, `0 20px 50px -30px`).
- **Toast** (`box-shadow: 0 16px 32px -18px rgba(34, 30, 27, 0.7)`).
- **Ilhós** (`inset 0 0 0 3px` sarja funda + `inset 0 1px 2px rgba(0,0,0,.25)`): o furo da tag.

### Named Rules
**The Flutua ou É Plano Rule.** Só ganha sombra o que está fisicamente acima da página (tag pendurada, drawer, menu, toast) ou o botão sob o cursor. Nada em repouso na grade tem sombra.

## Shapes

Cantos retos em todo o sistema (0px). A silhueta assinatura é a tag: retângulo com os dois cantos superiores cortados a 45° por `clip-path` (28px na tag grande, 14px na tag pequena da peça, 20px no pesponto interno). O ilhós é um círculo de 14px (9px na tag da peça) centrado a 18px do topo. O pesponto é um contorno tracejado de 1px recuado 10px. Os únicos círculos são objetos que são redondos no mundo real: ilhós, carimbo (84px), contador da sacola (pílula de 18px) e pontos da galeria (6px).

## Components

### Buttons
Tinta sólida, retos, falando em caixa alta espaçada.
- **Shape:** reto (0px), 52px de altura.
- **Primary:** fundo tinta café, texto branco-gelo, 600 12px com 0.16em, padding horizontal de 34px.
- **Hover / Focus:** tinta pressionada com a sombra de hover; foco com contorno caramelo de 1.5px a 3px de distância. Desabilitado a 45% de opacidade.
- **Line:** contorno de 1px em tinta, transparente; no hover inverte para tinta sólida.
- **Link de ação:** a mesma voz de rótulo com sublinhado de 1px e seta que avança 4px no hover.

### Tag (assinatura)
Etiqueta de provador em sarja, cantos cortados, ilhós e pesponto tracejado interno (`.tag-stitch`). Moldura de quatro superfícies: a tag do hero (em branco-gelo, pendurada pelo fio, com wordmark, título, linhas de etiqueta e botão), o painel de compra do produto, o resumo da sacola e cada pedido. Padding com 64px no topo para o ilhós. A versão pequena (104px de largura) pende do topo da foto de cada peça por um fio caramelo de 52px e mostra a grade de tamanhos.

### Linhas de etiqueta (care list)
Grade de duas colunas (rótulo de 92–110px + valor) com réguas de 1px; rótulo em label tinta suave. Usada para composição, toque, uso e cuidados, com ícones de lavagem em traço de 1px.

### Etiqueta de tamanho (size selector)
Etiqueta tecida: retângulo branco-gelo de 44px de altura com pesponto tracejado interno recuado 4px (tinta a 22%). No hover vira branco linho. Selecionada: branco linho, contorno interno de 1px e pesponto em caramelo, texto caramelo. Esgotada: transparente, contorno `line`, texto riscado em `sold-out`.

### Quick-add
Sobre a foto da peça, ao passar o mouse ou focar (apenas em dispositivos com hover): rótulo "Adicionar" em branco-gelo e botões de tamanho de 36px em branco-gelo a 94%, que invertem para tinta no hover. Some no trilho, na busca e abaixo de 860px.

### Inputs / Fields
- **Style:** sem caixa; só uma régua inferior de 1px em tinta, fundo transparente, 48px de altura; legenda em label tinta suave acima.
- **Focus:** a régua muda para caramelo.
- **Error:** mensagem em perigo com régua superior de 1px na mesma cor.
- **Busca:** campo em Montserrat de clamp(28px, 4vw, 44px) sobre a régua.

### Chips e abas
Texto 13px sem caixa; inativo em tinta suave, ativo em tinta com sublinhado caramelo de 1px. Sugestões de busca são o único chip com contorno (`line`, tinta no hover).

### Navigation
Links de 13px com 0.04em; sublinhado de 1px em tinta que cresce da esquerda (0.5s). O mega-menu abre por `clip-path: inset(0 0 100% 0)` → `inset(0)` em 0.55s, com painel compacto de até 500px no canto esquerdo, com duas colunas de links em Montserrat 20px. No mobile a navegação vira gaveta à esquerda em Montserrat 22px.

### Drawers
Painel lateral direito de até 440px (sacola, guia de medidas) ou painel superior de até 86svh (busca), sobre scrim de tinta a 32%. Cabeçalho com título em Montserrat 28px e fechar; corpo rolável; rodapé com total e botão em bloco. Entra com translate em 0.5s no ease exponencial; trava a rolagem, prende o foco e fecha com Esc. A sacola mostra a barra de frete (trilho de 2px em sarja, preenchimento caramelo revelado por `clip-path`) e o item recém-adicionado assenta de -10px em 0.9s.

### Entrega (fulfillment)
Opções em rádio sobre branco-gelo dentro do resumo; a escolhida ganha contorno interno de 1px em caramelo e `accent-color` caramelo.

### Motion
Uma só curva: `cubic-bezier(0.16, 1, 0.3, 1)` (ease exponencial). Durações entre 0.3s e 1.4s.
- **Balanço do ilhós:** a tag da peça gira a partir do topo (7° → -4° → 1.5° → 0) em 1.6s no hover; a tag do hero entra balançando de 9° em 2.4s.
- **Carimbo "Na sacola":** círculo caramelo de 84px sobre o botão, entra de scale 1.6 / -14° para 1 / -10°, segura e some em 2.2s.
- **Foto da peça:** a segunda foto cruza em 0.7s e a imagem amplia 3% em 1.4s.
- **Reduced motion:** todas as animações e transições caem para 0.01ms.

## Do's and Don'ts

### Do:
- **Do** usar a tag (cantos cortados, ilhós, pesponto) como a moldura de qualquer bloco de decisão: compra, resumo, pedido.
- **Do** reservar o caramelo para seleção, foco, entrega escolhida e barra de frete, além do próprio fio e pesponto da tag.
- **Do** separar listas e campos com réguas de 1px, tinta no topo e `line` entre itens.
- **Do** escrever títulos em Montserrat 600 com -0.02em, menus em Montserrat 500, textos em Inter e rótulos em Inter 600 11px com 0.16em em caixa alta.
- **Do** renderizar parcelamento, frete cortesia, prazo de retirada e trocas somente quando preenchidos em `public/js/store.js`; com o campo vazio, a linha inteira some.
- **Do** tratar as fotos de `public/img` como provisórias: trocar o arquivo mantendo o mesmo nome (ver `public/img/LEIA-ME.md`), em 3:4 vertical para peças.
- **Do** usar o ease exponencial em todo movimento e respeitar `prefers-reduced-motion`.

### Don't:
- **Don't** colocar kicker, eyebrow ou sobretítulo acima de um título; o título abre o bloco (migalha de navegação no painel de compra não é kicker).
- **Don't** usar caramelo como cor de hover, decoração ou preenchimento de destaque.
- **Don't** arredondar cantos de botões, campos, fotos ou tags.
- **Don't** pôr sombra em cards de produto ou em qualquer coisa em repouso na grade.
- **Don't** usar selos, faixas de desconto ou banners promocionais.
- **Don't** inventar promessas comerciais, dados da loja, depoimentos ou números da marca.
- **Don't** usar fundo branco puro; a página é branco-gelo.
