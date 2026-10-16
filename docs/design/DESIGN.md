# DESIGN: landing "Founding Engineer sob demanda"

> Autor: Timbre (Product Designer). Fase 2 do `PLANO-DEV.md`. Data: 2026-10-08.
> Tokens: `src/styles/tokens.css` (a fonte da verdade dos valores; este documento diz **onde** e **como** usar).
> Copy: Verso escreve dentro dos limites do §8. Implementação: Ritmo. Revisão de design contra este documento: Timbre.

**Métrica que manda em toda decisão:** o visitante entende a oferta em 10 s e agenda o diagnóstico de 45 min.

---

## 1. Princípios

1. **Oferta antes de estética.** Acima da dobra, em 360 × 640, cabem manchete, subtítulo e o CTA de agenda. Nada decorativo empurra o CTA para baixo.
2. **Sênior e sóbrio.** Uma família tipográfica, uma cor de acento (verde-petróleo), fundo papel. Sem gradientes, glassmorphism, ilustração 3D, emoji, "sparkles" de IA, contadores animados ou selos.
3. **Preço é conteúdo, não letra miúda.** Os preços públicos são o diferencial (BRIEFING §4.3): numerais tabulares, alinhados à direita, legíveis num relance.
4. **Uma pessoa, não uma agência.** Nenhum elemento visual sugere time (sem grade de avatares nem "nossa equipe"). A única pessoa é o fundador, na seção "Quem constrói".
5. **A marca é uma variável.** O layout funciona com `SITE_BRAND` de 2 a ~32 caracteres. A marca é sempre texto, nunca imagem.
6. **Honestidade visual.** Métrica com fonte pública ganha destaque numérico e link para a fonte; relato autodeclarado fica em texto corrido, **sem** destaque numérico nem selo (BRIEFING §3.3).
7. **Leve por padrão.** HTML estático, 1 arquivo de fonte, SVG inline, zero JS além do toggle de tema. Lighthouse ≥ 95.

---

## 2. Grid e layout

| Faixa | Breakpoint | Colunas | Gutter | Margem lateral | Container |
|---|---|---|---|---|---|
| Mobile | < 640 px | 4 | 16 px | 16 px | 100% |
| Tablet | 640–1023 px | 8 | 20 px | 24 px | 100% |
| Desktop | ≥ 1024 px | 12 | 24 px | 32 px | máx. 1120 px (`--container-max`), centralizado |
| Header largo | ≥ 1200 px | — | — | — | Mostra a nav de âncoras inline |

- Breakpoints em `em` nas media queries (`40em`, `64em`, `75em`), mobile-first (`min-width`). Custom properties não funcionam em media query; use estes números literais.
- Margem: `--container-pad`. Gutter: `--space-gutter`.
- Medidas de leitura: corpo `--measure` (65ch), subtítulos `--measure-narrow` (44ch), manchete `--measure-headline` (22ch).
- Padding vertical de seção: `--space-section` (64 → 96 px). Entre título de seção e conteúdo: `--space-6` (32 px) mobile, `--space-7` (48 px) desktop.
- Padrão desktop recorrente "**rótulo à esquerda, conteúdo à direita**": título + intro em colunas 1–4 (`position: sticky; top: calc(var(--header-height) + var(--space-6))`), conteúdo em 5–12. Usado em Problema, Garantias, Para quem não é. Evita grades com 5 itens órfãos.
- Âncoras: `scroll-margin-top: calc(var(--header-height) + var(--space-4))` em toda `section[id]`. `html { scroll-behavior: smooth }` só dentro de `@media (prefers-reduced-motion: no-preference)`.
- Nenhum scroll horizontal de 320 a 1920 px. `overflow-wrap: break-word` no `body`.

---

## 3. Cor

Valores em `tokens.css`. Uso:

| Token | Uso | Contraste (light / dark) |
|---|---|---|
| `--color-bg` | Fundo da página | — |
| `--color-surface` | Cards, painel de fatos do hero, tabela | — |
| `--color-surface-sunken` | Seções alternadas (Escada, Método), cabeçalho de tabela | — |
| `--color-text` | Texto principal, títulos | 16,5 / 15,5 : 1 |
| `--color-text-muted` | Subtítulo, meta, notas, rótulo de fonte | 6,7 / 7,9 : 1 (≥ 6,1 em qualquer superfície) |
| `--color-border` | Divisórias **decorativas** | — (não é affordance) |
| `--color-border-strong` | Borda de botão secundário, `<details>`, toggle, trilho da escada | 3,6 / 4,3 : 1 (≥ 3:1, WCAG 1.4.11) |
| `--color-accent` / `--color-on-accent` | Botão primário | 8,0 / 9,2 : 1 |
| `--color-accent-text` | Links, número do degrau, métrica com fonte | 7,4 / 11 : 1 |
| `--color-accent-subtle` | Badge "abatido do MVP", faixa do CTA final | texto sobre ela ≥ 5,9 : 1 |
| `--color-warn-text` | Marcador "—" de "fica fora" e "não é para" | 6,3 / 9,8 : 1 |
| `--color-focus` | Anel de foco | 7,4 / 11 : 1 |
| `--color-placeholder-bg` | Só em dev: destaca `[Marca]` e CTA sem URL | — |

**Tema.** Padrão = `prefers-color-scheme`. O toggle grava `localStorage.theme = "light" | "dark"` e põe `data-theme` no `<html>`. Um script inline mínimo no `<head>` (antes do CSS de página) lê `localStorage` e aplica `data-theme` antes da primeira pintura, para não piscar. Sem JS, vale o tema do sistema. `color-scheme` já está nos tokens (scrollbar e controles nativos acompanham).

---

## 4. Tipografia

**Família única: IBM Plex Sans Variable** (`@fontsource-variable/ibm-plex-sans`, eixo `wght` 100–700, sem itálico).
- Por quê: herança de engenharia, sóbria, menos "startup genérica" que Inter; numerais tabulares bons para preço; diacríticos PT completos.
- Carregar **só** o CSS `wght` (não `wght-italic`). Preload do woff2 do subset latin no `<head>` (`<link rel="preload" as="font" type="font/woff2" crossorigin>`). `font-display: swap`. Ênfase = peso, nunca itálico.
- Fallback em `--font-sans`; ajustar com `size-adjust` só se o Lighthouse acusar CLS na troca.

| Papel | Token tamanho | Peso | Line-height | Tracking | Outros |
|---|---|---|---|---|---|
| Wordmark (`SITE_BRAND`) | `--text-brand` (15 → 17) | `--weight-bold` (680) | `--leading-tight` | `--tracking-brand` | ver §6.1 |
| H1 (manchete do hero) | `--text-3xl` (28 → 40) | 680 | 1.15 | `--tracking-tight` | `max-inline-size: 22ch`; `text-wrap: balance` |
| H2 (título de seção) | `--text-2xl` (24 → 32) | 650 | 1.3 | `--tracking-tight` | `text-wrap: balance`; máx. 24ch |
| H3 (card, degrau, pergunta) | `--text-xl` (20 → 24) no degrau; `--text-lg` nos cards e FAQ | 600 | 1.3 | 0 | — |
| Lead (subtítulo, intro) | `--text-lg` (18 → 20) | 400 | 1.5 | 0 | `--color-text-muted`; `max-inline-size: 44ch` |
| Corpo | `--text-base` (16 → 17) | 400 | `--leading-normal` (1.6) | 0 | `max-inline-size: 65ch`; `text-wrap: pretty` |
| Eyebrow / overline | `--text-sm` (14) | 600 | 1.3 | `--tracking-caps` | MAIÚSCULAS via CSS (`text-transform`), texto do copy em caixa normal |
| Meta (prazo, rótulo de fonte) | `--text-sm` | 500 | 1.4 | 0 | `--color-text-muted` |
| Preço | `--text-price` (22 → 26) | 600 | 1.2 | 0 | `font-feature-settings: var(--font-features-numeric)` |
| Nota legal, rodapé | `--text-xs` (13) | 400 | 1.5 | 0 | `--color-text-muted` |

Regras: `html { font-size: 100% }` (respeita o zoom do usuário). Nada abaixo de 13 px. Números de preço, horas e métricas sempre com `tnum`.

---

## 5. Espaçamento, forma e movimento

- **Escala (base 4 px):** `--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96. Não usar valores fora da escala.
- Ritmo vertical dentro de bloco de texto: parágrafo → parágrafo `--space-4`; título → texto `--space-3`; item de lista → item `--space-3`; card → card `--space-4` (mobile) / `--space-5` (desktop).
- **Raio:** `--radius-md` (8 px) em botão, card, `<details>`; `--radius-sm` (4 px) em badge; `--radius-full` no monograma.
- **Elevação:** nenhuma sombra. Separação por borda 1 px (`--color-border`) e alternância de superfície. Header: `--shadow-header` (linha, sem blur).
- **Movimento:** só `color`, `background-color`, `border-color` (`--duration-fast`) e rotação do ícone do `<details>` (`--duration-base`, `--ease-out`). Sem animação de entrada, parallax, scroll-jacking nem contador. `prefers-reduced-motion` zera as durações (já nos tokens).
- **Alvos de toque:** mínimo `--tap-min` (44 × 44 px) para todo controle; 48 px de altura nos botões do hero e do CTA final.

---

## 6. Componentes e estados

Estados obrigatórios em **todo** elemento interativo: default, hover (só com `@media (hover: hover)`), active, focus-visible. Foco: `outline: var(--focus-ring); outline-offset: var(--focus-offset)`, nunca `outline: none` sem substituto. Disabled não existe neste site (não há formulário).

### 6.1 Wordmark (`SITE_BRAND`)

- Marcação: `<a class="wordmark" href="/">{SITE_BRAND}</a>` (EN: `href="/en/"`). Alvo do link: `min-block-size` e `min-inline-size` de 44 px (marca de 2 letras não pode virar alvo de 20 px); o texto interno leva o line-clamp. Texto puro, sem SVG, sem ícone. Nome acessível = a própria marca.
- Estilo: `--text-brand`, peso 680, `--tracking-brand`, `--color-text`, sem sublinhado. Hover: `--color-accent-text`.
- **Independência de comprimento:**
  - Container flex com `min-inline-size: 0` e `flex: 1 1 auto` (é o item que encolhe; os controles à direita têm `flex: none`).
  - < 1200 px: até **2 linhas**: `line-height: var(--leading-tight)`, `overflow-wrap: anywhere`, `text-wrap: balance`, `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden` (rede de segurança, não deve disparar até ~40 caracteres).
  - ≥ 1200 px: 1 linha, `white-space: nowrap`.
  - Nunca `width`/`max-width` em px fixo, nunca `font-size` calculado pelo comprimento.
- Teste obrigatório (QA): `"Ox"`, `"[Marca]"`, `"Northbridge Product Engineering"` em 360, 768, 1280 px, header e footer.
- Placeholder em dev: se `SITE_BRAND` contém `[`, adicionar `data-placeholder` → `background: var(--color-placeholder-bg); outline: 1px dashed var(--color-border-strong)`.

### 6.2 Header (fixo)

`<header>` `position: sticky; top: 0; z-index: 10`, fundo `--color-bg`, `box-shadow: var(--shadow-header)`, `min-block-size: var(--header-height)` (min, não fixo, para zoom 200%). Conteúdo no container, `display: flex; align-items: center; gap: var(--space-4)`.

| Faixa | Esquerda → direita |
|---|---|
| < 640 | Wordmark · LangSwitch · Botão primário **compacto** (rótulo curto ≤ 10, ex.: "Agendar") |
| 640–1199 | Wordmark · LangSwitch · ThemeToggle · Botão primário (rótulo ≤ 22) |
| ≥ 1200 | Wordmark · Nav (4 âncoras) · LangSwitch · ThemeToggle · Botão primário (≤ 22) |

- **Sem menu hambúrguer** (os rótulos "Abrir/Fechar menu" do copy não são usados): um `<details>` de menu ficaria aberto sobre o conteúdo depois de clicar numa âncora (fechar exige JS). No mobile, a navegação é o scroll + o CTA secundário "Ver preços" do hero.
- No mobile o ThemeToggle fica no footer (economiza 44 px para a marca). O footer sempre tem o toggle.
- Nav: `<nav aria-label="Seções">` (EN: "Sections") com `<a>` em `--text-sm`, peso 500, `--color-text`; hover sublinhado; `gap: var(--space-5)`. Itens (copy): Preços `#precos` · Garantias `#garantias` · Quem sou `#quem` · FAQ `#faq`.
- Orçamento a 1200 px (container 1120): marca 32 caracteres ≈ 290 px + nav ≈ 370 + controles 88 + CTA ≈ 230 + gaps ≈ 96 = ~1074 px. Cabe.

### 6.3 Botão

`<a>` estilizado como botão (todos os CTAs são links).

| Variante | Default | Hover | Active | Focus-visible |
|---|---|---|---|---|
| **Primário** | bg `--color-accent`, texto `--color-on-accent`, peso 600, borda 1 px da mesma cor | bg `--color-accent-hover` | bg `--color-accent-active` | anel de foco + offset |
| **Secundário** | bg transparente, texto `--color-text`, borda 1 px `--color-border-strong` | bg `--color-surface-sunken` | borda `--color-text` | anel de foco + offset |
| **Link** | `--color-accent-text`, sublinhado 1 px, `text-underline-offset: 0.2em` | sublinhado 2 px | — | anel de foco |

- Tamanhos: **md** (header): `min-block-size: 44px`, padding `--space-2` `--space-4`, `--text-sm`/`--text-base`. **lg** (hero, pós-escada, final): `min-block-size: 48px`, padding `--space-3` `--space-5`, `--text-base`. Raio `--radius-md`. Sem ícone, exceto seta "→" opcional (SVG 16 px, `aria-hidden`) no primário lg.
- Mobile (< 640): botões lg ocupam 100% da largura e empilham com `gap: var(--space-3)`; **sem a seta** e com `padding-inline: var(--space-4)`, para "Agendar diagnóstico (45 min, grátis)" caber em 1 linha a 360 px (se ainda quebrar, `text-wrap: balance`, texto centralizado); ≥ 640 ficam lado a lado, largura do conteúdo.
- **CTA de agenda** (header, hero, pós-escada, final): `href={PUBLIC_BOOKING_URL}`. Link externo de agenda: mesma aba, sem `target="_blank"`. Sem URL em dev: `href="#contato"` e `data-placeholder`.
- Estado de loading: não se aplica (sem formulário nem fetch).

### 6.4 ThemeToggle (o único JS)

- `<button type="button" data-theme-toggle hidden>` com SVG sol/lua 20 px (`aria-hidden`), 44 × 44, borda 1 px `--color-border-strong`, raio `--radius-md`.
- `hidden` é removido pelo script (sem JS o botão não aparece, vale o tema do sistema).
- `aria-label` fixo do copy ("Alternar tema claro/escuro" / EN equivalente). Sem `aria-pressed` e sem trocar rótulo via JS (menos script).
- Hover: bg `--color-surface-sunken`. Foco: anel. Um script para todos os `[data-theme-toggle]` (header e footer).

### 6.5 LangSwitch

- `<a href="/en/" hreflang="en" lang="en">EN</a>` na página PT; `<a href="/" hreflang="pt-BR" lang="pt-BR">PT</a>` na EN. `aria-label` do copy (ex.: "Mudar idioma para inglês").
- 44 × 44, `--text-sm` peso 600, sem borda; hover sublinhado. Mostra só o **outro** idioma.

### 6.6 Badge

`--text-sm` peso 600, padding `--space-1` `--space-2`, bg `--color-accent-subtle`, texto `--color-accent-text`, raio `--radius-sm`. Uso único: "100% abatido do MVP" no Product Sprint. Nunca "mais popular", "recomendado" nem selo de resultado.

### 6.7 Degrau da escada (`Rung`)

Ver §7.3 para a seção. Anatomia de cada `<li>`:

```
[n] Nome do degrau                       a partir de
 │  Prazo                                 R$ 42.000
 │  Linha-resumo (o que você recebe)
 │  [badge opcional]
 │  ▸ O que inclui                       (<details>)
```

- **Degraus principais e alternativos.** O copy tem 4 degraus principais (Diagnóstico, Product Sprint, MVP Core, Product Evolution) e 2 alternativos ao anterior (Production-Ready = caminho de quem já tem protótipo; MVP Plus = Core com mais escopo). Visual:
  - Principal: marcador círculo 32 px, borda 1,5 px `--color-accent`, numeral 1–4 em `--text-sm` 600 `--color-accent-text`.
  - Alternativo: marcador círculo 32 px com borda 1,5 px **tracejada** `--color-border-strong`, texto "ou" (EN "or") em `--text-xs` 600 `--color-text-muted`. Mesmo trilho, sem recuo, `padding-block-start` menor (`--space-4` em vez de `--space-6`), para ler como variação do degrau acima.
  - Marcadores com `aria-hidden="true"`; o "ou" também vai como texto visualmente oculto antes do nome (`<span class="visually-hidden">ou</span>`), para o leitor de tela entender a alternativa.
- Trilho: linha vertical 2 px `--color-border-strong` ligando os círculos (pseudo-elemento, decorativo). Termina no último degrau.
- Nome: H3 `--text-xl` 600. Prazo: meta. Linha-resumo: corpo `--color-text-muted`.
- Preço: bloco à direita, alinhado à direita, `tnum`. Prefixo "a partir de"/"from" em `--text-sm` muted **acima** do valor. Valores textuais ("Grátis", "Custom quote") usam o mesmo slot e estilo. Sufixo de recorrência ("/mês", "/mo") em `--text-sm` muted, na mesma linha.
- `<details>`: summary com o rótulo "O que inclui" do copy (EN: o equivalente), `--text-sm` 600 `--color-accent-text`, ícone "+" que gira 45° ao abrir; alvo ≥ 44 px de altura. Conteúdo: `<ul>` de 3–5 itens com marcador "✓" SVG `--color-accent-text`, depois linha "Pagamento: …" (rótulo em 600), depois nota opcional em `--text-sm` muted.
- **Diagnóstico** (1º degrau) tem, fora do `<details>` e sempre visível, um link (variante Link) "Agendar diagnóstico →" do copy. Não é botão primário: o primário vem logo depois da escada.
- Estados: degrau não é clicável como um todo; só o summary. Hover no summary: sublinhado. Foco: anel no summary. Aberto: ícone girado, conteúdo com `padding-block-start: var(--space-3)`.

### 6.8 Tabela de planos (Product Evolution)

`<table>` real (não grid de divs), legível no mobile sem scroll horizontal:

| Coluna | Conteúdo | Alinhamento |
|---|---|---|
| Plano (`<th scope="row">`) | Nome (600) + linha descritiva (≤ 70, `--text-sm` muted) embaixo | esquerda |
| Horas/mês | "~10 h" (`tnum`) | direita |
| Preço/mês | "R$ 4.000" (`tnum`, 600) | direita |

- `<caption>` visível: "Product Evolution: planos mensais" (texto do copy), `--text-lg` 600, alinhado à esquerda.
- Cabeçalho (`<thead>`): `--text-sm` 600 muted, bg `--color-surface-sunken`. Linhas separadas por `--color-border`. Padding de célula `--space-3`.
- Em 360 px: as 3 colunas cabem (~140 + 56 + 96 px). Não ocultar coluna. Abaixo de 640 px, padding lateral da célula `--space-2` (cabe em 320 px sem scroll).
- Abaixo: nota de regras (≤ 160) em `--text-sm` muted: mínimo 3 meses, horas não acumulam, excedente.

### 6.9 Item de lista com ícone (Problema, Garantias, Método)

Ícone SVG próprio 24 px, `stroke-width: 1.5`, `stroke: currentColor` em `--color-accent-text`, `aria-hidden`. Título H3 `--text-lg` 600; texto corpo muted. Layout: ícone em coluna de 24 px + `gap: var(--space-3)`. Ícones: traço simples, sem preenchimento, sem "brilhos" de IA. Problema PT (ordem do copy): planilha (grade 3×3), processo de uma pessoa (prancheta), IA (grafo de 3 nós), produto para vender (janela de navegador), protótipo (chave inglesa). Problema EN (ordem do copy): v1 antes da rodada (janela de navegador), sem CTO (silhueta de pessoa, cabeça + ombros, com traço **tracejado** = papel vago), protótipo que não aguenta (chave inglesa), agência com camadas (3 losangos empilhados, "layers"), IA que move métrica (grafo de 3 nós). Garantias (ordem do copy): 60 dias (escudo), escopo fechado (documento com lista), conta do cliente (nuvem com chave), pagamento por marco (3 pontos numa linha), 1 MVP por vez ("1" num círculo), demo semanal (monitor com triângulo de play). Método: terminal, teste (check em quadrado), engrenagem, pessoas-rede (2 nós ligados ao centro).

### 6.10 Prova (Case)

- Case com **métrica de fonte pública** (só o da operação de terminais de contêiner): no texto do copy, "−27%" e "+21%" vão em `<strong>` com `--color-accent-text`, peso 650, `tnum` (sem número gigante, sem legenda extra). O rótulo de fonte do copy ("Dado público · MundoLogística, 13/01/2026") é link com "↗", `--text-sm`. O texto visível nunca leva o nome da empresa.
- Case **autodeclarado** (Bom.Capital, provisionamento): título H3 + texto em 1ª pessoa. Números em texto corrido normal: **sem** `<strong>`, **sem** cor de acento, **sem** badge. Rótulo "Relato meu" em `--text-sm` muted, texto simples.
- Projetos próprios (Ascende, FinPlan): rótulo "Projeto próprio" em `--text-sm` muted.
- "↗" de link externo: SVG 12 px `aria-hidden`; mesma aba.

### 6.11 FAQ (`<details>`)

- Cada pergunta: `<details>` com `border-block-end: 1px solid var(--color-border)`. `<summary>` com `list-style: none`, flex, pergunta H3 `--text-lg` 600 à esquerda, ícone "+" 20 px à direita (gira 45° aberto). `min-block-size: 56px`, padding `--space-4` 0.
- Hover: pergunta em `--color-accent-text`. Foco: anel no summary. Resposta: corpo, `max-inline-size: 65ch`, `padding-block-end: var(--space-5)`.
- Todas fechadas por padrão. Funciona sem JS.

### 6.12 Monograma (até ter a foto)

SVG inline, círculo `--radius-full`, fundo `--color-accent-subtle`, iniciais "HP" em `--color-accent-text`, peso 600, centralizadas, `role="img"` + `aria-label="Henrique Pett"`. Tamanho: 96 px mobile, 160 px desktop. A foto real substitui no mesmo slot: `astro:assets`, quadrada, `width`/`height` explícitos, `border-radius: var(--radius-full)`, `alt="Henrique Pett"`, sem filtro.
- **Requisito da foto (para o fundador):** quadrada, **≥ 480 × 480 px** (cobre 160 px em telas 3x), rosto centralizado ocupando ~60% da altura, fundo neutro ou desfocado, luz frontal, sem óculos escuros nem logotipo. A foto atual (200 px, fundo de feira, rosto à direita) serve como provisória.

### 6.13 Estados vazios e ocultos

| Situação | Comportamento |
|---|---|
| `PUBLIC_CONTACT_EMAIL` vazio | O item de e-mail some do CTA final e do footer; nada de "em breve" |
| `PUBLIC_SHOW_TESTIMONIALS=false` | O componente não renderiza **nada** (nem `<section>` vazia, nem espaço) |
| `PUBLIC_BOOKING_URL` vazio (dev/preview) | CTAs apontam para `#contato` e mostram `data-placeholder` em dev |
| Foto ausente | Monograma (§6.12) |
| LinkedIn/GitHub vazios | O link some; não renderizar `href="#"` |

### 6.14 Skip link

Primeiro elemento focável: `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>` (EN: "Skip to content"), visualmente oculto até receber foco; ao focar, aparece no topo-esquerdo com bg `--color-surface`, borda `--color-border-strong`, padding `--space-2` `--space-4`.

### 6.15 OG image (1200 × 630, por idioma)

Fundo `--color-bg` light. Margem 72 px. Topo-esquerdo: `SITE_BRAND` em 40 px peso 680, até 2 linhas, `max-width` 1056 px. Centro: manchete do idioma, 56 px peso 680, até 4 linhas, `max-width` 900 px. Rodapé: "Diagnóstico de 45 min, grátis" (EN: "Free 45-min diagnostic") em 28 px `--color-accent-text`. Sem foto, sem ícone. Gerada no build com o mesmo texto da página (sem marca escrita à mão).

---

## 7. Seções (PLANO-DEV §2.2)

Convenção dos wireframes: `▓` = botão primário, `▢` = botão secundário, `…` = texto, `◯` = ícone/numeral.
Fundos: Hero `bg` · Problema `bg` · Escada `surface-sunken` · Garantias `bg` · Quem `bg` (borda superior) · Método `surface-sunken` · Não é para `bg` · FAQ `bg` · CTA final `accent-subtle`.
Cada `<section>` tem `id` (âncora igual nos dois idiomas) e `aria-labelledby` apontando para o seu H2.

### 7.0 Header

Ver §6.2.

```
Mobile 360                               Desktop 1280
┌──────────────────────────────────┐    ┌──────────────────────────────────────────────────────────────┐
│ Northbridge Product   EN  ▓Agendar│    │ Northbridge Product Engineering  Preços Garantias Quem FAQ  EN ◐ ▓Agendar diagnóstico│
│ Engineering                      │    └──────────────────────────────────────────────────────────────┘
└──────────────────────────────────┘
```

### 7.1 Hero (`#inicio`)

Objetivo: 10 segundos. Ordem de leitura: eyebrow → manchete → subtítulo → CTA → microprova → fatos.

```
Mobile 360                              Desktop 1280 (12 col)
┌──────────────────────────────┐       ┌───────────────────────────────────────┬────────────────────┐
│ EYEBROW (CAPS, muted)        │       │ EYEBROW                               │ ┌────────────────┐ │
│ Seu produto em produção em   │       │ Seu produto em produção em            │ │Diagnóstico     │ │
│ 6–10 semanas, construído e   │       │ 6–10 semanas, construído e mantido    │ │45 min    Grátis│ │
│ mantido por um único         │       │ por um único responsável sênior.      │ │────────────────│ │
│ responsável sênior.          │       │                                       │ │Product Sprint  │ │
│                              │       │ Subtítulo lead (muted, 44ch)…         │ │      R$ 6.000  │ │
│ Subtítulo lead (muted)…      │       │                                       │ │────────────────│ │
│                              │       │ ▓ Agendar diagnóstico (45 min, grátis)│ │MVP  a partir de│ │
│ ▓ Agendar diagnóstico (45…)  │       │ ▢ Ver preços                          │ │      R$ 42.000 │ │
│ ▢ Ver preços                 │       │                                       │ └────────────────┘ │
│ Microprova (sm, muted)       │       │ Microprova (sm, muted)                │   cols 9–12        │
│ ┌ Fatos (3 linhas) ────────┐ │       │   cols 1–8                            │                    │
└──────────────────────────────┘       └───────────────────────────────────────┴────────────────────┘
```

- **Mobile:** `padding-block: var(--space-7) var(--space-8)`. Eyebrow → H1 `--space-3`; H1 → subtítulo `--space-4`; subtítulo → CTAs `--space-5`; CTAs → microprova `--space-4`; microprova → fatos `--space-6`. Verificação: em 360 × 640, o CTA primário termina antes de ~560 px (header 64 + 48 + eyebrow 20 + H1 5 linhas × 32 = 160 + subtítulo 4 linhas × 28 = 112 + gaps ≈ 70 + botão 48 ≈ 520 px). **Se o copy final empurrar o CTA para baixo da dobra, o copy encolhe, não o tipo.**
- **Desktop:** texto em colunas 1–8, alinhado ao topo; painel de fatos em 9–12, alinhado ao topo do H1. `padding-block: var(--space-9)`. CTAs lado a lado.
- **Painel de fatos** (`<dl>`): fundo `--color-surface`, borda 1 px `--color-border`, raio `--radius-md`, padding `--space-5`. 3 linhas `<dt>` rótulo (≤ 28) / `<dd>` valor de `pricing.ts` (`tnum`, 600, à direita), separadas por `--color-border`. Linhas: Diagnóstico · Product Sprint · MVP Core, **reaproveitando os nomes dos degraus do copy** e os preços de `pricing.ts` (nenhum texto novo). Sem link próprio (o CTA secundário já leva à escada).
- **Microprova:** `<ul>` inline com os 3 itens do copy; cada `<li>` com `white-space: nowrap`, separador "·" via `::after` em todo item **exceto o último** (assim o separador fica no fim da linha, nunca no começo; em `--color-border-strong`), `flex-wrap: wrap; column-gap: var(--space-2)`. Assim a quebra acontece entre itens, nunca no meio de "dia 1".
- Sem imagem, sem ilustração, sem foto no hero.

### 7.2 O problema (`#problema`)

```
Mobile                                   Desktop
┌──────────────────────────────┐        ┌──────────────┬──────────────────────────────────────┐
│ H2 título                    │        │ H2 título    │ ◯ Título do card 1                   │
│ Intro (lead)                 │        │ (sticky)     │   Texto…                             │
│ ◯ Título card 1              │        │ Intro        │ ─────────────────────────────────────│
│   Texto…                     │        │              │ ◯ Título do card 2                   │
│ ─────────────────────────────│        │ cols 1–4     │   …  (5 itens)          cols 5–12    │
│ ◯ … (5 itens)                │        │              │                                      │
└──────────────────────────────┘        └──────────────┴──────────────────────────────────────┘
```

- 5 itens em `<ul>` (componente §6.9), separados por `--color-border`, `padding-block: var(--space-5)`.
- Desktop: lista em 1 coluna (não grade 3+2).
- PT fala com PME tradicional; EN com founder sem CTO. Mesmo layout, copy diferente.

### 7.3 Como funciona: a escada (`#precos`)

A seção mais importante depois do hero. Fundo `--color-surface-sunken`.

```
Mobile 360                                       Desktop 1280
┌────────────────────────────────────┐          ┌────────────────────────────────────────────────────────────────────┐
│ H2 título                          │          │ H2 título                         Intro (lead) cols 7–12           │
│ Intro (lead)                       │          ├──┬─────────────────────────────┬────────────────┬────────────────┤
│                                    │          │①│ Diagnóstico                 │ 45 min         │         Grátis │
│ ① Diagnóstico               Grátis │          │ │ Linha-resumo                 │                │                │
│ │ 45 min                           │          │ │ ▸ O que inclui               │                │                │
│ │ Linha-resumo…                    │          ├─┼─────────────────────────────┼────────────────┼────────────────┤
│ │ ▸ O que inclui                   │          │②│ Product Sprint  [abatido]   │ 2 semanas      │       R$ 6.000 │
│ ② Product Sprint          R$ 6.000 │          │ │ …                            │                │                │
│ │ 2 semanas                        │          │③│ Production-Ready             │ …              │      R$ 18.000 │
│ │ [100% abatido do MVP]            │          │④│ MVP Core                     │ 6–7 semanas    │ a partir de    │
│ │ Linha-resumo…                    │          │ │                              │                │      R$ 42.000 │
│ │ ▸ O que inclui                   │          │⑤│ MVP Plus                     │ …              │      R$ 65.000 │
│ ③ Production-Ready       R$ 18.000 │          │⑥│ Product Evolution            │ mensal         │ a partir de    │
│ ④ MVP Core           a partir de   │          │ │                              │                │  R$ 4.000/mês  │
│ │                        R$ 42.000 │          ├─┴─────────────────────────────┴────────────────┴────────────────┤
│ ⑤ MVP Plus               R$ 65.000 │          │ Tabela Product Evolution (3 planos), cols 1–8 │ nota de regras 9–12│
│ ⑥ Product Evolution  a partir de   │          ├──────────────────────────────────────────────────────────────────┤
│ │                    R$ 4.000/mês  │          │ ▓ Agendar diagnóstico (45 min, grátis)   texto de apoio (muted)  │
│ ┌ Tabela Evolution (3 linhas) ───┐ │          └──────────────────────────────────────────────────────────────────┘
│ └────────────────────────────────┘ │
│ Nota de regras (sm)                │
│ ▓ Agendar diagnóstico (100%)       │
│ Texto de apoio (sm)                │
└────────────────────────────────────┘
```

- Marcação: `<ol class="ladder">` com 6 `<li>` (componente §6.7), na ordem do copy: Diagnóstico ①, Product Sprint ②, *ou* Production-Ready, MVP Core ③, *ou* MVP Plus, Product Evolution ④. No wireframe acima os 6 aparecem numerados só para leitura; no layout final os alternativos usam o marcador "ou". Não reordenar por preço.
- **Mobile (escaneável):** cada degrau mostra, sem abrir nada, **nome + preço na mesma linha** (grid `1fr auto`, preço alinhado ao topo), depois prazo e linha-resumo. Detalhes no `<details>`. Distância entre degraus `--space-6`. Se o nome não couber ao lado do preço, ele quebra; o preço nunca quebra (`white-space: nowrap`).
- **Desktop (≥ 1024):** cada `<li>` vira linha de grid `48px 1fr 160px 200px` (trilho · nome+resumo+details · prazo · preço), `padding-block: var(--space-5)`, separada por `--color-border`. Os cabeçalhos de coluna não aparecem (o rótulo "prazo" está implícito no texto do prazo).
- **Tablet (640–1023):** igual ao mobile, com prazo na mesma linha do nome (`nome · prazo`).
- Valores: **sempre** de `pricing.ts` via `Intl.NumberFormat` (BRL em `/`, USD em `/en/`). EN MVP Plus = "Custom quote" no slot de preço. Nenhum preço escrito à mão no componente.
- Badge §6.6 só no Product Sprint, com o texto "100% abatido do MVP" (o resto da nota fica no `<details>`).
- Product Evolution: o degrau ⑥ mostra "a partir de R$ 4.000/mês"; logo abaixo do `<ol>`, a tabela §6.8 com os 3 planos e a nota de regras.
- **CTA pós-escada** (obrigatório): botão primário lg + nota de apoio do copy ("Não sabe qual degrau é o seu?…", ≤ 90). `margin-block-start: var(--space-7)`.

### 7.4 Garantias e regras (`#garantias`)

```
Mobile                                   Desktop
┌──────────────────────────────┐        ┌──────────────┬───────────────────────────────────────┐
│ H2 título                    │        │ H2 (sticky)  │ ◯ Garantia 1      │ ◯ Garantia 2      │
│ Intro (lead)                 │        │ Intro        │ ◯ Garantia 3      │ ◯ Garantia 4      │
│ ◯ Garantia 1 título          │        │              │ ◯ Garantia 5      │ ◯ Garantia 6      │
│   texto…  (6 itens)          │        │              ├───────────────────┴───────────────────┤
│ ┌ O que fica fora ─────────┐ │        │              │ O que fica fora: 2 colunas, 7 itens   │
│ │ — item (warn marker)     │ │        │              │                                       │
│ │ — … (7 itens)            │ │        │              │                                       │
│ └──────────────────────────┘ │        │  cols 1–4    │                         cols 5–12     │
└──────────────────────────────┘        └──────────────┴───────────────────────────────────────┘
```

- H2 + intro (lead) em colunas 1–4 no desktop.
- **6 garantias** (§6.9), na ordem do copy. Mobile: 1 coluna. Desktop: grade 2 × 3, `gap: var(--space-6)`.
- **O que fica fora:** caixa com borda 1 px `--color-border`, raio `--radius-md`, padding `--space-5`; título H3 `--text-lg` (pode quebrar em 2 linhas); `<ul>` de 6 a 8 itens com marcador "—" em `--color-warn-text` (o texto continua `--color-text`; a cor não é o único sinal, o título diz "fica fora"). Desktop: 2 colunas (`columns: 2`).
- **Não** publicar garantia de prazo (PLANO-DEV §2.2 #4).

### 7.5 Quem constrói (`#quem`)

```
Mobile                                   Desktop
┌──────────────────────────────┐        ┌──────────────┬───────────────────────────────────────┐
│ ( HP ) H2 Quem constrói:     │        │  ( HP )      │ H2 Quem constrói: Henrique Pett       │
│  96px  Henrique Pett         │        │  160 px      │ Bio parágrafo 1                       │
│ Bio parágrafo 1              │        │              │ Bio parágrafo 2                       │
│ Bio parágrafo 2              │        │ LinkedIn ↗   │ H3 O que já construí                  │
│ H3 O que já construí         │        │ GitHub ↗     │ ┌──────────────────┬────────────────┐ │
│ ┌ Case 1 (fonte pública) ──┐ │        │              │ │ Case 1           │ Case 2         │ │
│ │ texto **−27%** **+21%**  │ │        │              │ │ …**−27%**…       │ Relato meu     │ │
│ │ Dado público · … ↗       │ │        │              │ │ Dado público ↗   │                │ │
│ └──────────────────────────┘ │        │              │ ├──────────────────┼────────────────┤ │
│ Case 2…4                     │        │              │ │ Case 3           │ Case 4         │ │
│ Linha neptune.ai · nota      │        │  cols 1–4    │ └──────────────────┴────────────────┘ │
│ LinkedIn ↗   GitHub ↗        │        │  (sticky)    │ Linha neptune.ai · nota  cols 5–12    │
└──────────────────────────────┘        └──────────────┴───────────────────────────────────────┘
```

- Monograma §6.12 (troca pela foto sem mudar layout). O nome já está no H2 do copy; não repetir nome nem cargo ao lado da foto. Mobile: monograma 96 px à esquerda do H2 (flex, `gap: var(--space-4)`, alinhado ao centro). Desktop: monograma 160 px no topo da coluna 1–4, links LinkedIn/GitHub abaixo.
- Cases: §6.10. Título do case é **H4** (o H3 é "O que já construí"; sem salto de nível). Cards com fundo `--color-surface`, borda `--color-border`, raio `--radius-md`, padding `--space-5`. Mobile: 1 coluna; desktop: 2 × 2. O case com fonte pública vem primeiro.
- Abaixo dos cases: linha da neptune.ai (corpo; "Ler o artigo ↗" só se `PUBLIC_NEPTUNE_ARTICLE_URL` existir) e a nota sobre relatos em `--text-xs` muted, `max-inline-size: 65ch`.
- Links LinkedIn/GitHub: no DOM logo depois do bloco monograma + H2 (ordem de foco = ordem visual, WCAG 2.4.3). No mobile ficam entre o H2 e a bio (substitui a posição "fim da seção" do wireframe acima); no desktop, sob o monograma. Não duplicar o bloco por breakpoint. Componente Link com "↗", `gap: var(--space-5)`, `display: inline-flex; align-items: center; min-block-size: 44px` (links soltos, fora de frase, precisam de alvo de 44 px).
- Texto em 1ª pessoa; nenhum "nós".
- O slot de depoimentos (oculto) fica entre esta seção e Método; quando `false`, não existe.

### 7.6 Como eu trabalho (`#metodo`)

- Fundo `--color-surface-sunken`. H2 + intro (lead) no topo, largura 8 colunas.
- 4 itens (§6.9): mobile 1 coluna; ≥ 640 grade 2 × 2, `gap: var(--space-6)`.
- Fechamento (≤ 120) depois da grade, em `--text-lg` 500 `--color-text`, `margin-block-start: var(--space-6)`.
- Aqui, e só aqui, aparece o vocabulário de IA (prova de método). Sem ícone de "sparkle"/varinha mágica.

### 7.7 Para quem não é (`#nao-e-para`)

- Layout "rótulo à esquerda" no desktop (H2 em 1–4, lista em 5–12); mobile empilhado.
- Intro curta (lead) abaixo do H2.
- `<ul>` de 5 itens, marcador "—" em `--color-warn-text`, `--text-base`, `padding-block: var(--space-3)`, separados por `--color-border`.
- Tom: filtro honesto, não hostil. Sem ícone de "proibido" ou X vermelho.

### 7.8 FAQ (`#faq`)

- H2 no topo; lista de 8 `<details>` (§6.11) em colunas 1–8 no desktop (coluna de leitura), 100% no mobile.
- Ordem: a do copy.

### 7.9 CTA final + contato (`#contato`)

```
┌──────────────────────────────────────────────┐   fundo --color-accent-subtle, largura total
│ H2 título (≤ 70)                             │   conteúdo em cols 1–8, alinhado à esquerda
│ Texto (lead, ≤ 200)                          │
│ ▓ Agendar diagnóstico (45 min, grátis)       │
│ e-mail@… (se definido) · LinkedIn ↗          │
└──────────────────────────────────────────────┘
```

- `padding-block: var(--space-section)`. Botão lg (100% no mobile). Linha de contato em `--text-sm`, links §6.3.
- `id="contato"` também é o destino de fallback dos CTAs sem URL em dev.

### 7.10 Footer

- Fundo `--color-bg`, borda superior `--color-border`, `padding-block: var(--space-7)`.
- Mobile (empilhado): wordmark (pode quebrar em 2 linhas, mesmas regras §6.1) · linha do footer (≤ 120, `--text-sm` muted) · links (Privacidade, LinkedIn, GitHub) · LangSwitch + ThemeToggle · "© 2026 {SITE_BRAND}" (`--text-xs`).
- Desktop: 2 linhas; linha 1 = wordmark à esquerda, links à direita; linha 2 = linha do footer + © à esquerda, LangSwitch + ThemeToggle à direita.

### 7.11 Páginas secundárias

- `/privacidade`, `/en/privacy`: header e footer iguais; corpo em coluna de 65ch, H1 `--text-2xl`, H2 `--text-xl`. Sem CTA no meio do texto (o do header basta).
- `/404`: bloco PT e bloco EN empilhados (cada um com `lang`); H1 do PT em `--text-2xl`, título EN em H2 `--text-xl`, cada um com seu link. Sem ilustração.

---

## 8. Limites de caracteres (combinados com o Verso)

Contagem com espaços. Base: proposta do Verso com ajustes do Timbre, já aplicada no copy aprovado (`docs/copy/pt-BR.md`, `docs/copy/en.md`). Os limites valem para PT e EN (EN tende a ficar 10–15% mais curto). Ao estourar, o copy encolhe; o layout não se adapta a texto maior.

| Seção | Bloco | Limite |
|---|---|---|
| Header | Itens de nav (4) | ≤ 12 cada |
| | CTA desktop / mobile | ≤ 22 / ≤ 10 |
| Hero | Eyebrow | ≤ 40 |
| | Manchete | fixa (PT ~100, EN ~90), não muda |
| | Subtítulo | ≤ 160 |
| | CTA primário / secundário | ≤ 40 / ≤ 20 |
| | Microprova | ≤ 90 |
| | Fatos: 3 rótulos | ≤ 28 cada (valores vêm de `pricing.ts`) |
| Problema | Título / intro | ≤ 70 / ≤ 200 |
| | 5 itens: título / texto | ≤ 45 / ≤ 120 |
| Escada | Título / intro | ≤ 60 / ≤ 220 |
| | Por degrau: nome / linha-resumo / prazo | ≤ 24 / ≤ 80 / ≤ 20 |
| | "Inclui": 3–5 itens | ≤ 60 cada |
| | Pagamento / nota | ≤ 90 / ≤ 120 |
| | Badge do Sprint | ≤ 28 |
| | Marcador de degrau alternativo ("ou" / "or") | ≤ 3 |
| | Evolution: legenda da tabela / cabeçalhos de coluna (3) / nome do plano / linha / nota de regras | ≤ 50 / ≤ 12 / ≤ 20 / ≤ 70 / ≤ 160 |
| | Nota de apoio do CTA pós-escada | ≤ 90 |
| Garantias | Título / intro | ≤ 40 / ≤ 200 |
| | 6 itens: título / texto | ≤ 50 / ≤ 160 |
| | "Fica fora": título / 6–8 itens | ≤ 60 / ≤ 80 cada |
| Quem constrói | Título / papel | ≤ 50 / ≤ 50 |
| | Bio | 2 parágrafos ≤ 320 cada |
| | Subtítulo dos cases | ≤ 30 |
| | 4 cases: título / texto / rótulo de fonte | ≤ 50 / ≤ 200 / ≤ 50 |
| | Linha neptune.ai / nota sobre relatos | ≤ 120 / ≤ 140 |
| Método | Título / intro | ≤ 50 / ≤ 200 |
| | 4 itens: título / texto | ≤ 40 / ≤ 160 |
| | Fechamento | ≤ 120 |
| Para quem não é | Título / intro / 5 itens | ≤ 50 / ≤ 100 / ≤ 100 |
| FAQ | 8 perguntas / respostas | ≤ 80 / ≤ 400 |
| CTA final | Título / texto / CTA | ≤ 70 / ≤ 200 / ≤ 40 |
| Footer | Linha | ≤ 120 |
| Tema/idioma | Rótulos acessíveis (aria-label) | ≤ 30 |
| Meta | `<title>` / description | ≤ 60 / ≤ 155 |
| Consentimento | ver §13.5 | — |

Sugestão ao Compasso: validar estes limites no tipo `SiteCopy` (teste unitário que mede `.length`), para o build acusar estouro.

---

## 9. Acessibilidade (checklist de aceite)

- [ ] Contraste: todos os pares do §3 (texto ≥ 4,5:1; texto grande e bordas de UI ≥ 3:1), nos dois temas.
- [ ] Um `<h1>` por página; H2 por seção; H3 nos itens. Sem saltos de nível.
- [ ] Landmarks: `header`, `nav[aria-label]`, `main#conteudo`, `footer`. Skip link funcional (§6.14).
- [ ] Teclado: ordem de tab = ordem visual; todo controle alcançável; `<details>` abre com Enter/Espaço; foco sempre visível (§6).
- [ ] `<html lang="pt-BR">` / `lang="en"`; nomes de produto em inglês na página PT (Product Sprint, MVP Core…) não precisam de `lang` (são nomes próprios).
- [ ] Ícones decorativos com `aria-hidden="true"`; monograma com `role="img"` e `aria-label`.
- [ ] Preços legíveis por leitor de tela na ordem "a partir de R$ 42.000" (prefixo antes do valor no DOM).
- [ ] Tabela Evolution com `<caption>`, `<th scope="col">` e `<th scope="row">`.
- [ ] Alvos ≥ 44 × 44 px; zoom 200% e 400% (reflow em 320 px) sem perda de conteúdo nem scroll horizontal.
- [ ] `prefers-reduced-motion` respeitado; nenhuma animação automática.
- [ ] Cor nunca é o único sinal (marcadores "—" vêm com títulos que explicam).

## 10. Performance (orçamento para Lighthouse ≥ 95)

- 1 woff2 (IBM Plex Sans Variable, latin, `wght`) com preload; ~≤ 60 KB.
- CSS total ≤ 30 KB (minificado, sem gzip; revisado de 25 KB em 2026-10-08 após a implementação, ~29 KB / ~6 KB gzip); só tokens + componentes scoped. Preferir 1 arquivo ou inline (`build.inlineStylesheets: 'auto'`) a 2 requests.
- JS: script inline de tema (≤ 1 KB). Nada mais.
- SVGs inline, sem sprite externo; monograma inline. Foto (quando houver): AVIF/WebP, ≤ 40 KB, `width`/`height` fixos, `loading="lazy"` (está abaixo da dobra).
- Sem `backdrop-filter`, sem sombras com blur, sem animações de scroll.

## 11. Verificação do protótipo (2026-10-08)

Protótipo HTML de header + hero com os tokens reais e a fonte IBM Plex Sans Variable (woff2 latin `wght`: **45,7 KB**), renderizado no Chromium (Playwright) com as 3 marcas de teste em 360, 768 e 1280 px, temas light e dark:

| Marca | 360 px | 768 px | 1280 px |
|---|---|---|---|
| `Ox` | 1 linha, sem scroll horizontal | 1 linha | 1 linha |
| `[Marca]` | 1 linha | 1 linha | 1 linha |
| `Northbridge Product Engineering` | **2 linhas**, sem corte, header 64 px | 1 linha | 1 linha, nav inline cabe |

CTA primário do hero termina em 505 px (360 × 640), 477 px (768) e 514 px (1280): acima da dobra em todos. Único problema visto: a microprova quebrava no meio de um item; regra corrigida em §7.1.

## 13. Consentimento de cookies (`docs/consent/SPEC.md` §4)

Princípio: escolher **recusar** tem de ser tão fácil, visível e rápido quanto **aceitar**. Nenhum elemento puxa para o aceite (cor, tamanho, ordem, pré-seleção ou atrito). Funciona como "nada carrega até você escolher"; sem JS, o banner não aparece (atributo `hidden` no HTML, removido pelo script).

### 13.1 1º nível: faixa no rodapé da viewport

```
Mobile 360 (116 px de altura)                 Desktop 1280 (69 px)
┌──────────────────────────────────┐          ┌──────────────────────────────────────────────────────────────────────┐
│ Uso cookies de medição e         │          │ Texto (sm) + Política de privacidade        ▢ Aceitar ▢ Recusar ▢ Personalizar│
│ publicidade só se você permitir. │          └──────────────────────────────────────────────────────────────────────┘
│ Política de privacidade          │
│ ▢ Aceitar ▢ Recusar ▢ Personalizar│  ← 3 colunas iguais
└──────────────────────────────────┘
```

- **Marcação:** `<div role="region" aria-label="{regionLabel}" hidden>` com `<p>` (texto + link para `/privacidade` ou `/en/privacy`) e 3 `<button type="button">`. No DOM, **logo depois do skip link**, para ser o 1º grupo na ordem de tab. Não roubar o foco com JS ao carregar a página.
- **Posição:** `position: fixed; inset-inline: 0; inset-block-end: 0; z-index: 20` (acima do header, que é 10). Fixed = sem CLS. Sem `backdrop-filter`, sem sombra com blur.
- **Superfície:** fundo `--color-surface`; borda superior 1 px **`--color-border-strong`** (no tema claro, surface × bg quase não se distinguem; a borda forte separa a faixa do conteúdo).
- **Container:** o mesmo da página (`--container-max`, `--container-pad`), `padding-block: var(--space-3)`.
  - < 640 px: grid de 1 coluna, `gap: var(--space-2)`; texto em cima, botões embaixo.
  - ≥ 640 px: `grid-template-columns: 1fr auto; align-items: center; gap: var(--space-5)`; texto à esquerda, botões à direita.
- **Texto:** `--text-sm`, `line-height: 1.4`, `--color-text` (não usar muted: é informação de decisão). Link no fim do texto, variante Link (§6.3), `--color-accent-text`.
- **Botões (os 3 idênticos):** variante **Secundário** (§6.3) para os 3: mesmo fundo (`--color-surface`), borda `--color-border-strong`, texto `--color-text`, peso 600, `--text-sm`, `min-block-size: 44px`, `padding-inline: var(--space-1)`, `line-height: 1.2`, `text-wrap: balance`.
  - Largura igual por construção: `display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2)` no mobile; `repeat(3, minmax(8.5rem, 1fr))` a partir de 640 px.
  - Ordem: **Aceitar · Recusar · Personalizar** (SPEC). Nenhum é primário, nenhum tem ícone, nenhum é link "fantasma".
  - Estados: hover `--color-surface-sunken`; active borda `--color-text`; focus-visible com anel (§6). Não há disabled.
- **Sem "X":** fechar sem escolher não existe no 1º nível. Esc não faz nada no 1º nível (não é modal).
- **Não cobrir conteúdo de forma permanente:** com a faixa aberta, o script grava a altura dela em `--consent-h` no `<html>` e aplica `padding-block-end: var(--consent-h)` no `body` e `scroll-padding-block-end: var(--consent-h)` no `html` (o footer continua alcançável, e o elemento focado nunca fica escondido atrás da faixa: WCAG 2.4.11).
- **Medido no protótipo (Chromium, IBM Plex, 2026-10-08):** com texto + link de até ~85 caracteres, a faixa tem **116 px** em 360 px e começa em **524 px**; o CTA do hero termina em 499 px, então fica **visível em 360 × 640** ✓. Com 180 caracteres, a faixa sobe para 175 px e **cobre** o CTA ✗; por isso o limite do texto é curto (§13.5). Em 320 px o CTA do hero tem 2 linhas e a faixa o encosta; fora do critério (360 × 640), aceito.
- **Depois da escolha:** a faixa some (`hidden`), `--consent-h` volta a 0 e o foco vai para `<main id="conteudo" tabindex="-1">` com `preventScroll: true` (o foco não pode ficar num elemento que sumiu). Uma região `aria-live="polite"` visualmente oculta anuncia "{saved}".

### 13.2 2º nível: `<dialog>` modal

```
Mobile (largura - 32 px)                     Desktop (máx. 32rem, centralizado)
┌──────────────────────────────┐            ┌────────────────────────────────────────┐
│ H2 Título                 [×]│            │ H2 Título                           [×]│
│ Intro (sm, muted)            │            │ Intro                                  │
│ ─────────────────────────────│            │ ───────────────────────────────────────│
│ Necessários     Sempre ativo │            │ Necessários               Sempre ativo │
│ Descrição…                   │            │ Descrição… · Fornecedor ↗              │
│ ─────────────────────────────│            │ ───────────────────────────────────────│
│ [☐] Medição                  │            │ [☐] Medição                            │
│     Descrição… Calendly ↗    │            │     Descrição… · Calendly ↗            │
│ ─────────────────────────────│            │ ───────────────────────────────────────│
│ [☐] Publicidade              │            │ [☐] Publicidade                        │
│     Descrição… Google ↗      │            │     Descrição… · Google ↗              │
│ ─────────────────────────────│            │ ───────────────────────────────────────│
│ ▢ Recusar tudo               │            │ ▢ Recusar tudo ▢ Aceitar tudo ▢ Salvar │
│ ▢ Aceitar tudo               │            └────────────────────────────────────────┘
│ ▢ Salvar escolhas            │
└──────────────────────────────┘
```

- **Abrir:** `dialog.showModal()` a partir de "Personalizar" (1º nível) ou de "Preferências de cookies" (footer). O 1º nível continua atrás enquanto o diálogo está aberto.
- **Caixa:** fundo `--color-surface`, borda 1 px `--color-border-strong`, raio `--radius-md`, `padding: var(--space-5)`, `inline-size: min(32rem, calc(100% - 2 * var(--space-4)))`, `max-block-size: calc(100dvh - 2 * var(--space-4))`, `overflow-y: auto`. `::backdrop`: `--color-backdrop` (token novo), sem blur.
- **Sem animação:** aparece e some sem transição (só `prefers-reduced-motion` irrelevante aqui).
- **Cabeçalho:** H2 `--text-xl` 600 com `id` usado em `aria-labelledby` do `<dialog>`; botão fechar à direita, 44 × 44, ícone "×" SVG 20 px `aria-hidden`, `aria-label="{close}"`, estilo do ThemeToggle (§6.4). Intro em `--text-sm` muted, `aria-describedby` do dialog.
- **Foco:** ao abrir, foco no H2 (`tabindex="-1"`, `autofocus`), para o leitor de tela ler título e intro antes dos controles. Tab fica preso no modal (nativo do `showModal`). **Esc** e "×" fecham **sem salvar nada** e devolvem o foco a quem abriu (Personalizar ou link do footer). Se a pessoa ainda não tinha escolhido, o 1º nível continua aberto.
- **Categorias** (`<fieldset>` sem borda, uma por categoria, separadas por `--color-border`, `padding-block: var(--space-4)`):
  - **Necessários:** sem checkbox (controle desabilitado tem contraste e affordance ruins). Nome H3 `--text-base` 600 + selo de texto "{alwaysOn}" à direita, `--text-sm` 600 `--color-text-muted`.
  - **Medição / Publicidade:** `<input type="checkbox">` nativo, 20 × 20 px, `accent-color: var(--color-accent)`, **desmarcado por padrão** (ou com o valor salvo, se já houver registro). O `<label>` envolve checkbox + nome e ocupa a linha inteira com `min-block-size: 44px` (alvo). Nome em `--text-base` 600.
  - Descrição: `--text-sm` muted. Fornecedores: lista inline de links (variante Link + "↗"), `--text-sm`, separados por " · ". Cada link de fornecedor fica **fora** do `<label>` (clicar no link não pode marcar a caixa).
  - Estados da checkbox: foco = anel na própria checkbox (focus-visible); hover no label = nome em `--color-accent-text`.
- **Botões do rodapé (os 3 idênticos):** variante Secundário, mesmas regras do §13.1. Ordem: **Recusar tudo · Aceitar tudo · Salvar escolhas**. < 640 px: empilhados, 100% de largura, `gap: var(--space-2)`; ≥ 640 px: `grid-template-columns: repeat(3, 1fr)`. Todos fecham o diálogo, gravam o registro e escondem o 1º nível.

### 13.3 Link "Preferências de cookies" no footer

- É um `<button type="button">` com aparência de Link (§6.3): abre um diálogo, não navega. `hidden` no HTML e exibido pelo script (sem JS não há o que configurar).
- Posição: na lista de links do footer, **logo depois de "Privacidade"**, em todas as páginas (landing, privacidade, 404), PT e EN. Alvo 44 px (`.link--target`).

### 13.4 Contraste e temas

Nenhum par novo de cor: texto `--color-text` e links `--color-accent-text` sobre `--color-surface` (≥ 8:1 nos dois temas), bordas de botão e da faixa `--color-border-strong` sobre surface (3,9:1 light, 4,0:1 dark). O `::backdrop` não carrega texto.

### 13.5 Limites de caracteres (Verso)

| Bloco | Limite | Por quê |
|---|---|---|
| `regionLabel` (aria) | ≤ 30 | — |
| `text` (1º nível, 1ª pessoa, sem link) | **≤ 60** | texto + link precisam caber em 2 linhas em 360 px (faixa ≤ ~120 px) |
| `policyLink` | ≤ 30 | idem; **`text` + espaço + `policyLink` ≤ 90** |
| `accept` / `reject` / `customize` | **≤ 12** cada | 3 colunas de 104 px em 360 px ("Personalizar" = 12 cabe; acima disso quebra em 2 linhas) |
| `dialog.title` | ≤ 40 | — |
| `dialog.intro` | ≤ 200 | — |
| `dialog.alwaysOn` | ≤ 16 | — |
| `categories.*.name` | ≤ 24 | — |
| `categories.*.description` | **≤ 320** | o diálogo rola; a divulgação de terceiros (Alicerce, deploy 2A) fica **visível, sem texto expansível**, para ser lida antes do aceite |
| `categories.*.vendors[].label` | ≤ 24 | — |
| `save` / `acceptAll` / `rejectAll` | ≤ 20 cada | — |
| `close` (aria) | ≤ 20 | — |
| `saved` (anúncio aria-live) | ≤ 40 | — |
| `footerLink` | ≤ 24 | — |

### 13.6 Checklist de aceite (design)

- [ ] Os 3 botões de cada nível têm a mesma largura, altura, cor, borda e peso (medir no DOM).
- [ ] Medição e Publicidade desmarcadas no 1º acesso; Necessários sem controle.
- [ ] 360 × 640, PT e EN, light e dark: a faixa começa abaixo do fim do CTA do hero.
- [ ] Tab: skip link → botões da faixa → header. Esc fecha o diálogo sem salvar e devolve o foco.
- [ ] Com a faixa aberta, o último link do footer é alcançável e visível ao receber foco.
- [ ] Sem JS: nem faixa nem link "Preferências de cookies".

## 14. Landing `/diagnostico/` (`docs/landing/DIAGNOSTICO-SPEC.md`, deploy 2B)

Página de destino da campanha 01 do Google Ads. Só PT, `noindex, follow`. Objetivo único: **agendar o diagnóstico**. Tudo o que não ajuda nisso sai: sem nav, sem seletor de idioma, sem LinkedIn/GitHub, sem links de saída além de `ascende.site` e da política. Tokens, tipografia e componentes são os mesmos da home; esta seção define só o que muda.

### 14.1 Ordem e fundos

| # | Seção (`id`) | Fundo | Componente |
|---|---|---|---|
| 0 | Header enxuto | `bg` | §14.2 |
| 1 | Hero (`#inicio`) | `bg` | §14.3 |
| 2 | Escada (`#precos`) | `surface-sunken` | reuso §6.7/§7.3, §14.4 |
| 3 | O que sai do Product Sprint (`#sprint`) | `bg` | §14.5 |
| 4 | Provas (`#provas`) | `bg`, borda superior `--color-border` | §14.6 |
| 5 | Quem constrói (`#quem`) | `surface-sunken` | §14.7 |
| 6 | FAQ (`#faq`) | `bg` | reuso §6.11 |
| 7 | CTA final (`#contato`) | `accent-subtle` | §14.8 |
| 8 | Footer enxuto | `bg` | §14.9 |

**CTA único:** o mesmo botão de agenda (mesmo rótulo e mesmo comportamento de consentimento do deploy 2A) aparece **só** no header, no hero e no CTA final. A escada é reusada **sem** o link "Agendar diagnóstico" do degrau 1 e **sem** o CTA pós-escada (prop do componente, ex.: `ctas={false}`). Como o header é fixo, o CTA continua sempre visível. Se a Batuta/Farol quiserem o CTA pós-escada de volta, basta ligar a prop: o layout já existe.

### 14.2 Header enxuto

```
360: │ [Marca]                     ▓Agendar │        1280: │ [Marca]                               ▓Agendar diagnóstico │
```

- Mesmo `site-header` (§6.2), sticky, 64 px. Esquerda: wordmark (§6.1, mesmas regras de comprimento) **como texto, não link** (`<span class="wordmark">`): um link para a home seria uma saída da landing. Direita: botão primário md (rótulo curto < 640 px, longo ≥ 640 px, os mesmos da home).
- **Sem** nav de âncoras, **sem** seletor de idioma (a página é só PT e o tráfego é da campanha PT; o EN fica acessível pela home), **sem** ThemeToggle no header (fica no footer, em todas as larguras).

### 14.3 Hero

```
Mobile 360 × 640, banner aberto                     Desktop 1280
┌──────────────────────────────┐ 0                  ┌──────────────────────────────────────┬──────────────────┐
│ header 64                    │                    │ EYEBROW                              │ Painel de fatos  │
├──────────────────────────────┤ 64                 │ H1 (≤ 85)                            │ (§7.1, igual à   │
│ EYEBROW (≤ 32, 1 linha)      │                    │ Subtítulo (≤ 130)                    │  home)           │
│ H1 (≤ 85, até 5 linhas)      │                    │ ▓ CTA                                │                  │
│ Subtítulo (≤ 130)            │                    │ Microprova                           │                  │
│ ▓ CTA (≤ 36, 1 linha)        │ ≤ 475 ✓            │  cols 1–8                            │  cols 9–12       │
│ Microprova (pode ficar sob   │                    └──────────────────────────────────────┴──────────────────┘
├──────── banner 116 px ───────┤ 524
└──────────────────────────────┘ 640
```

- **Diferenças para o hero da home:** `padding-block-start: var(--space-5)` (24 px, em vez de 48) < 640 px; **sem CTA secundário** ("Ver preços"); painel de fatos **só ≥ 1024 px** (no mobile ele empurraria a escada sem ajudar o CTA). Espaçamentos internos iguais aos do §7.1.
- **Medido (2026-10-08, build real com o banner aberto, textos no limite):** H1 de 87 caracteres (5 linhas) + subtítulo de 122 + eyebrow → CTA termina em **475 px** em 360 × 640 e em 495 px em 320 × 640; a faixa começa em 524 px. ✓ Com H1 de 67 caracteres, o CTA termina em 411 px.
- Rótulo do CTA ≤ 36: em 360 px cabe em 1 linha (o da home, "Agendar diagnóstico (45 min, grátis)", tem 36). Acima disso, o botão vai para 2 linhas e consome a folga.
- A microprova (opcional) pode ficar sob a faixa do banner; não é crítica.

### 14.4 Escada

Componente e dados idênticos aos da home (§6.7, §6.8, §7.3), inclusive a tabela do Evolution, com as exceções de CTA do §14.1. Título e intro: os da home, salvo se o Mote mandar outros (mesmos limites: ≤ 60 / ≤ 220).

### 14.5 O que sai do Product Sprint (`#sprint`)

```
Mobile                                   Desktop
┌──────────────────────────────┐        ┌──────────────┬──────────────────────────────────────┐
│ H2                           │        │ H2 (sticky)  │ ✓ Entregável 1   │ ✓ Entregável 2    │
│ Intro (lead)                 │        │ Intro        │ ✓ Entregável 3   │ ✓ Entregável 4    │
│ ✓ Entregável: título + texto │        │              │ ✓ Entregável 5   │ (5 ou 6 itens)    │
│ … (4 a 6)                    │        │              ├──────────────────┴───────────────────┤
│ ┌ nota: abatido do MVP ────┐ │        │              │ Nota (badge §6.6 + texto)            │
└──────────────────────────────┘        └──────────────┴──────────────────────────────────────┘
```

- Padrão "rótulo à esquerda" (§2) no desktop; grade 2 colunas em 5–12. Itens com o componente §6.9 e o ícone "✓" (check em círculo, 24 px). Use **4 ou 6** itens (5 deixa a grade 2 colunas com buraco; com 5, a lista fica em 1 coluna).
- Nota final: badge "100% abatido do MVP" (§6.6) + texto curto em `--text-sm` muted, `margin-block-start: var(--space-6)`.

### 14.6 Provas (`#provas`)

- H2 + 2 cards (componente de case §6.10), 1 coluna < 640 px, 2 colunas ≥ 640 px, mesmo estilo dos cases da home (surface, borda, raio md, padding `--space-5`).
- **Bom.Capital:** relato, números em texto corrido normal (sem `<strong>`, sem cor de acento, sem selo), rótulo "Relato meu" em `--text-sm` muted. **Sem link, sem logo.**
- **Ascende:** "Projeto próprio" em `--text-sm` muted + link "ascende.site ↗" (variante Link, alvo 44 px, mesma aba).
- Nenhum outro case. Sem número grande nem destaque numérico (não há métrica de fonte pública nesta página).

### 14.7 Quem constrói (`#quem`)

- Coluna única, `max-inline-size: 65ch` (cols 1–8 no desktop). Monograma "HP" 64 px (§6.12, **não clicável**) à esquerda do H2, flex com `gap: var(--space-4)`, alinhado ao centro; bio embaixo.
- **Sem foto** por padrão (SPEC). Se o Farol liberar a foto, ela entra no mesmo slot de 64 px, também sem link. **Nenhum** link ou botão para LinkedIn, GitHub ou site pessoal.

### 14.8 CTA final (`#contato`)

Igual ao §7.9, **sem** a linha de e-mail/LinkedIn: H2, texto (lead) e o botão primário lg com o mesmo rótulo do hero.

### 14.9 Footer enxuto

Wordmark (texto, não link) · linha do footer (a da home) · **Privacidade** · **Preferências de cookies** (§13.3) · ThemeToggle · ©. Sem LinkedIn, GitHub nem seletor de idioma.

### 14.10 Placeholders (até o texto do Mote chegar)

Em dev/preview, cada chave vazia mostra `[Mote: <chave>]` com `data-placeholder` (§6.1: fundo `--color-placeholder-bg`, contorno tracejado). Os placeholders devem ter o **comprimento máximo** do §14.11 (preencher com o rótulo + "…" até o limite), para o layout ser testado no pior caso antes do texto real.

### 14.11 Limites de caracteres (Mote)

| Bloco | Limite | Observação |
|---|---|---|
| Hero: eyebrow | ≤ 32 | 1 linha em 360 px; opcional |
| Hero: H1 | **≤ 85** | até 5 linhas em 360 px; medido com o banner aberto |
| Hero: subtítulo | **≤ 130** | idem |
| CTA (header longo / header curto / hero e final) | ≤ 22 / ≤ 10 / **≤ 36** | o mesmo rótulo no hero e no final |
| Hero: microprova (opcional) | ≤ 90 | itens separados por "·" (§7.1) |
| Escada: título / intro | ≤ 60 / ≤ 220 | por padrão, os da home |
| Sprint: H2 / intro | ≤ 60 / ≤ 180 | — |
| Sprint: 4 ou 6 itens (título / texto) | ≤ 40 / ≤ 120 | — |
| Sprint: nota (abatido do MVP) | ≤ 120 | o badge é o da home ("100% abatido do MVP") |
| Provas: H2 | ≤ 50 | — |
| Provas: 2 cases (título / texto / rótulo) | ≤ 50 / ≤ 200 / ≤ 30 | Bom.Capital sem link; Ascende com link |
| Quem constrói: H2 / bio | ≤ 50 / ≤ 400 (1 parágrafo, 1ª pessoa) | — |
| FAQ: 4 ou 5 perguntas / respostas | ≤ 80 / ≤ 320 | — |
| CTA final: H2 / texto | ≤ 70 / ≤ 160 | — |
| Meta: `<title>` / description | ≤ 60 / ≤ 155 | — |

### 14.12 Checklist de aceite (design)

- [ ] 360 × 640, banner aberto, light e dark: o CTA do hero termina acima do topo da faixa, com o texto final do Mote.
- [ ] O CTA aparece só 3 vezes (header, hero, final); a escada sem CTA próprio.
- [ ] Nenhum link para a home (wordmark é texto), nem nav, nem seletor de idioma, nem LinkedIn/GitHub.
- [ ] Bom.Capital sem link e sem destaque numérico; Ascende com link de 44 px.
- [ ] Sem placeholder `[Mote: …]` no build de produção.

## 12. Handoff e revisão

- **Ritmo:** implementar a partir dos tokens; nenhum valor de cor, tamanho ou espaçamento literal nos componentes (exceto os breakpoints em `em` do §2).
- **Afinador:** os testes de §6.1 (3 comprimentos de marca), §9 e §10 fazem parte do gate da fase 4.
- **Timbre:** revisa cada componente implementado contra este documento e registra divergências para o Ritmo.
