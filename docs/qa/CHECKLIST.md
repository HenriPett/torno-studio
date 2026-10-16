# CHECKLIST de QA: gate da fase 4

> Autor: Afinador (QA). Data: 2026-10-08.
> Fontes: `BRIEFING.md` §3 e §5; `PLANO-DEV.md` §2.3, §4 (fase 4), §5.3–§5.6 (deploy na **Netlify**, marca **Torno Studio**, sem analytics no cliente); `docs/design/DESIGN.md` §2, §6, §9 e §10; `docs/copy/pt-BR.md` e `docs/copy/en.md`.
> Regra do gate: **nenhum item passa sem a saída real colada no relatório** (`docs/qa/RELATORIO-*.md`). Um único ❌ bloqueia a fase 4.

---

## 0. Como rodar

| O quê | Comando | Observação |
|---|---|---|
| Rodada completa | `bash tests/qa/run-qa.sh` | Etapas na ordem: `check` → `base` → `brands` → `lhci` → `links`. Saída em `.lighthouseci/qa-<data>/summary.txt` e `full.log` |
| Só uma etapa | `bash tests/qa/run-qa.sh brands` | Etapas: `check`, `base`, `brands`, `lhci`, `links` |
| Deploy preview/produção no ar (Netlify) | `QA_BASE_URL=… QA_BRAND='Torno Studio' PUBLIC_*=… npx playwright test -c tests/qa/playwright.preview.config.ts` (`QA_CANONICAL_ORIGIN=https://main--<site>.netlify.app` só em deploy via CLI) | `PUBLIC_*` iguais às envs do deploy; se houver senha no preview, `QA_HTTP_USER`/`QA_HTTP_PASS` só por env |
| QA local isolado (sem tocar o `dist/` compartilhado) | `npx astro build --outDir $QA_OUTDIR && QA_OUTDIR=$QA_OUTDIR npx playwright test -c tests/qa/playwright.local.config.ts` | porta 4331, nunca reaproveita servidor alheio |
| Só os specs do QA, no `dist/` atual | `npx playwright test tests/qa` | Sem build. Confirme antes com que env o `dist/` foi gerado |
| Galeria de screenshots | `QA_SCREENSHOTS=1 npx playwright test tests/qa/responsive.spec.ts -g R4` | Anexos em `test-results/` |

Pré-condições:
- **Porta 4321 livre.** O Playwright reaproveita um servidor aberto (`reuseExistingServer`); se for o `astro dev` de alguém, testaríamos o dev e não o `dist/`. O runner aborta se a porta estiver ocupada.
- **Nada de `netlify deploy --build` durante a rodada:** o build da CLI da Netlify reescreve o `dist/` com as envs do site e contamina os testes locais.
- **`dist/` é compartilhado.** O runner rebuilda várias vezes (marcas, indexação). Avisar o Ritmo no maestri antes e não rodar enquanto ele testa. No fim, o runner rebuilda o `dist/` padrão.
- Builds do runner usam `npx astro build` direto; o `npm run check` (gate de tipos) roda uma vez no início (combinado com o Compasso).
- Env de cada build:

| Build | Env | Specs |
|---|---|---|
| base (preview) | `PUBLIC_ALLOW_INDEXING=false`, marca placeholder | todos (`tests/` + `tests/qa/`), brand.spec pulado |
| marcas | `PUBLIC_SITE_BRAND` = `Torno Studio` / `Ox` / `[Marca]` / `Northbridge Product Engineering` | `brand.spec` + `responsive.spec` com `QA_BRAND` |
| lhci | `PUBLIC_ALLOW_INDEXING=true` | `seo.spec` com `QA_INDEXING=true`, Lighthouse mobile e desktop |
| links | padrão | linkinator |

Legenda: **auto** = coberto por spec (arquivo e ID); **manual** = passo a passo abaixo, evidência = screenshot ou saída colada.

---

## L. Lighthouse ≥ 95 nas 4 categorias

Performance, Acessibilidade, Best Practices e SEO, **cada uma ≥ 0,95**, mediana de 3 execuções.

| ID | Caso | Como | Tipo |
|---|---|---|---|
| L1 | Mobile: `/`, `/en/`, `/privacidade/`, `/en/privacy/` | `npx lhci autorun` (raiz, preset padrão = mobile, 3 runs) | auto |
| L2 | Desktop: as mesmas 4 URLs | `npx lhci autorun --config=tests/qa/lighthouserc.desktop.json` | auto |
| L3 | PT e EN ambos cobertos | as 4 URLs acima incluem os dois idiomas | auto |
| L4 | Orçamento DESIGN §10: 1 woff2 ≤ 60 KB com preload; CSS total ≤ 25 KB; JS só o script de tema inline ≤ 1 KB; nenhum request a terceiros | `du -b dist/_astro/*.woff2 dist/_astro/*.css`; DevTools → Network com cache desligado | manual |
| L5 | CLS = 0 na troca de fonte e no toggle de tema | relatório do L1 (`cumulative-layout-shift`) | auto (no L1) |
| L6 | **Deploy preview Netlify** (fase 5) e depois **produção**: repetir L1/L2 na URL real | `npx lhci collect --url=<deploy>/ --url=<deploy>/en/ ...` + `lhci assert`. Se o Netlify Drawer (toolbar de deploy preview) for injetado e bloqueado pela CSP, medir também com `--collect.settings.blockedUrlPatterns` para separar o artefato | manual |

Nota L6: o deploy preview tem `noindex` por regra (a Netlify também manda `X-Robots-Tag: noindex` em deploy previews). O audit `is-crawlable` de SEO falha de propósito e derruba a categoria SEO. Critério no preview: SEO ≥ 0,95 **descontando apenas** `is-crawlable`; os demais audits de SEO precisam passar. Os builds locais do L1/L2 rodam com `PUBLIC_ALLOW_INDEXING=true` e não têm essa exceção.

---

## A. Acessibilidade (axe + estrutura)

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| A1 | **0 violação axe séria ou crítica** (WCAG 2.0/2.1/2.2 A/AA + best-practice) em `/`, `/en/`, `/privacidade/`, `/en/privacy/`, 404 × claro/escuro × 360/1280 px, com todos os `<details>` abertos | `a11y.spec.ts` A1 | auto |
| A2 | Um `<h1>` por página; sem salto de nível de heading | A2 | auto |
| A3 | Landmarks: `header`, `nav[aria-label]`, `main#conteudo`, `footer` | A3 | auto |
| A4 | Sem `tabindex` positivo | A4 | auto |
| A5 | Tabela Evolution com `<caption>`, 3 `th[scope=col]`, 3 `th[scope=row]` | `pricing.spec.ts` P2 | auto |
| A6 | Preço legível na ordem "a partir de R$ 4.000" / "from US$ 15,000" (prefixo antes do valor no DOM) | P5 | auto |
| A7 | Ícones decorativos com `aria-hidden="true"`; monograma com `role="img"` + `aria-label="Henrique Pett"` | inspecionar no DevTools (Accessibility tree) | manual |
| A8 | Degrau alternativo: leitor de tela anuncia "ou Production-Ready" / "or MVP Plus" | `edge.spec.ts` A8 (nome acessível do H3); VoiceOver opcional | auto |
| A9 | Zoom 200% e 400% (Chrome, janela 1280): sem perda de conteúdo nem scroll horizontal; header com `min-block-size` cresce sem cobrir texto | ⌘+ até 400%; R1 em 320 px cobre o reflow | auto (R1 320) + manual |
| A10 | Cor nunca é o único sinal: marcadores "—" de "fica fora"/"não é para" vêm com título explicativo | revisão visual nas duas seções | manual |
| A11 | Contraste dos pares DESIGN §3 nos dois temas | coberto por axe `color-contrast` em A1 (claro e escuro) | auto |
| A12 | Links externos (MundoLogística, LinkedIn, GitHub, Calendly) abrem na mesma aba, sem `target="_blank"` | `grep -c 'target="_blank"' dist/**/*.html` = 0 | manual |

---

## K. Teclado e foco

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| K1 | Tab percorre todos os focáveis visíveis; **todo** foco tem anel visível (outline ou box-shadow), em 360 e 1280 px | `a11y.spec.ts` K1 | auto |
| K2 | 1º Tab = skip link ("Pular para o conteúdo" / "Skip to content"), visível ao focar; Enter leva a `#conteudo` | K2 | auto |
| K3 | `<details>` (FAQ e "O que inclui") abre com Enter e fecha com Espaço | K3 | auto |
| K4 | Alvos ≥ 44×44 px: header, CTAs, `summary`, toggle de tema, seletor de idioma (em 360 px) | K4 | auto |
| K5 | CTA de agenda presente no header, hero, pós-escada e CTA final; com `QA_BOOKING_URL`, **todos** os CTAs de agenda apontam para ele (nenhum `#agendar`) | K5 | auto |
| K6 | Ordem de tab = ordem visual (header → hero → seções em ordem → footer) | `edge.spec.ts` K6 | auto |
| K7 | Foco não fica escondido sob o header fixo (WCAG 2.4.11) | `edge.spec.ts` K7 | auto |
| K8 | Âncora não esconde o título sob o header fixo | `responsive.spec.ts` R3 | auto |
| K9 | Duplo clique e clique rápido no toggle de tema: estado final coerente com `localStorage` | `edge.spec.ts` K9 | auto |
| K10 | Back do navegador depois de clicar âncoras e trocar idioma: volta à página/âncora anterior sem tema trocado | `edge.spec.ts` K10 | auto |

---

## R. Responsivo (360 / 768 / 1280 / 1920, + 320 para zoom 400%)

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| R1 | **Sem scroll horizontal** (`scrollWidth ≤ clientWidth`) em 320/360/768/1280/1920 × claro/escuro × 4 páginas + 404, com `<details>` abertos. Em falha, lista os elementos que vazam e anexa screenshot | `responsive.spec.ts` R1 | auto |
| R2 | Em 360×640: H1 e CTA de agenda acima da dobra | R2 | auto |
| R3 | Header fixo não cobre o H2 ao navegar por âncora | R3 | auto |
| R4 | Galeria de evidência 360/768/1280/1920 claro/escuro (anexar no relatório) | R4 (`QA_SCREENSHOTS=1`) | auto |
| R5 | Tabela Evolution: 3 colunas cabem em 360 px, nenhuma coluna oculta; **microprova do hero: cada item em 1 linha, dentro do container, sem scroll** em 360/768/1280 | R1 + `content-audit.spec.ts` R5 + screenshot | auto + manual |
| R6 | Botões lg 100% de largura e empilhados < 640 px; lado a lado ≥ 640 | screenshots R4 | manual |
| R7 | Textos longos: palavra gigante sem espaço não vaza (`overflow-wrap`) | DevTools: trocar o texto de um card por `Aaaa…` (80 chars) em 360 px | manual |

---

## T. Tema claro/escuro

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| T1 | Sem JS: segue `prefers-color-scheme` (claro e escuro) e o toggle fica oculto | `a11y.spec.ts` T1 | auto |
| T2 | Toggle alterna, grava `localStorage.theme`, persiste no reload e entre `/` e `/en/`, sem flash | T2 | auto |
| T3 | `prefers-reduced-motion: reduce`: sem scroll suave, sem animação/transição | T3 | auto |
| T4 | Legibilidade nos dois temas: contraste coberto por A1; revisão visual dos screenshots R4 (badge, tabela, código de foco, placeholder) | manual |
| T5 | `localStorage` bloqueado: página carrega, tema do sistema vale, sem erro no console | `edge.spec.ts` T5 | auto |

---

## S. SEO técnico: hreflang, canonical, sitemap, robots, lang, noindex

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| S1 | `canonical` absoluto e auto-referente; `<html lang>` = `pt-BR` / `en` | `seo.spec.ts` S1 (+ `smoke.spec.ts` do Compasso) | auto |
| S2 | hreflang `pt-BR`, `en`, `x-default`(→ EN), **recíprocos** entre as páginas | S2 | auto |
| S3 | **Preview: `noindex` em todas as páginas.** Build com `PUBLIC_ALLOW_INDEXING=true`: nenhuma meta robots | S3 (default espera noindex; `QA_INDEXING=true` espera indexável) | auto |
| S4 | `title`, `description` (50–155), `og:title/description/site_name/url`, `og:locale` por idioma | S4 | auto |
| S5 | `og:image` por idioma existe, PNG 1200×630, com `og:image:alt` | S5 | auto |
| S6 | 404: status 404, `noindex`, sem canonical/hreflang, links para `/` e `/en/` | S6 | auto |
| S7 | Sitemap contém **exatamente** as 4 URLs canônicas, cada uma com alternates `pt-BR`/`en`/`x-default` | S7 | auto |
| S8 | `robots.txt`: `Allow`, sem `Disallow: /`, `Sitemap:` absoluto | S8 | auto |
| S9 | Seletor de idioma de cada página leva à equivalente (200) | S9 | auto |
| S10 | **Deploy preview Netlify:** `curl -sI <deploy>/` traz os headers do `netlify.toml` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP) e `X-Robots-Tag: noindex`; HTML traz meta `noindex`; console sem erro de CSP | `curl -sI`; DevTools Console | manual (fase 5) |
| S11 | URLs no sitemap/canonical/og usam o host do deploy (`DEPLOY_PRIME_URL` no preview, `URL`/`PUBLIC_SITE_URL` em produção), nunca `localhost` | `seo.spec.ts` S1/S2/S5 com `QA_BASE_URL` + `curl -s <deploy>/sitemap-0.xml` | auto + manual |
| S13 | **Produção com domínio (`https://tornostudio.com`)**: canonical, hreflang, sitemap e robots no domínio; sem meta robots nas 4 páginas (404 segue noindex); 301 de `tornostudio.netlify.app/*` e de `www.tornostudio.com` para o apex; HSTS do toml; Lighthouse ≥ 95 nas 4 categorias **com SEO** | `curl -sI`, `QA_BASE_URL=https://tornostudio.com QA_INDEXING=true` + lhci | auto + manual |
| S12 | OG renderiza no compartilhamento (texto do idioma, marca certa) | colar a URL do preview no LinkedIn Post Inspector / opengraph.xyz | manual (fase 5) |

---

## N. Links (linkinator)

| ID | Caso | Como | Tipo |
|---|---|---|---|
| N1 | **0 link interno quebrado** (recursivo, todas as páginas, âncoras incluídas) | `npm run links` | auto |
| N2 | Âncoras do nav e do CTA (`#precos`, `#garantias`, `#quem`, `#faq`, `#agendar`/`#contato`) existem nas duas homes | coberto por N1 + K5 | auto |
| N3 | Nenhum `href="#"`, `href=""` ou `<a>` sem href | `content-audit.spec.ts` C12 | auto |
| N4 | Externos respondem: MundoLogística, GitHub, LinkedIn, Calendly | `npx linkinator dist --recurse --skip "localhost"`. LinkedIn devolve 999 para robôs: conferir no navegador | manual |
| N5 | Link do 404 e "Voltar" da privacidade levam à home do idioma | S6 + clique manual na privacidade | auto + manual |

---

## M. Marca: `Torno Studio` + 3 valores de estresse de `SITE_BRAND` (PLANO-DEV §5.4 e §5.6, DESIGN §6.1)

Builds com `PUBLIC_SITE_BRAND` = **`Torno Studio`** (marca escolhida), **`Ox`**, **`[Marca]`**, **`Northbridge Product Engineering`** (`run-qa.sh brands`). Nota: "torno" é palavra comum em PT ("retorno", "em torno de"); o M2 compara com limite de palavra e caixa exata (`Torno Studio`).

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| M1 | Marca vem de `SITE_BRAND` em `<title>` (sufixo), `og:site_name`, header e footer, nas 4 páginas + 404 | `brand.spec.ts` M1 | auto |
| M2 | Nenhuma marca escrita à mão ou residual (`[Marca]`, "Henrique Pett — Founding Engineer"…) e marca **ausente do `<main>`** (só header, footer, title, OG) | M2 | auto |
| M3 | Wordmark em 360/768/1280/1920: sem truncar (line-clamp não dispara), ≤ 2 linhas < 1200 px e 1 linha ≥ 1200, sem sobrepor controles, controles dentro da tela, sem scroll horizontal | M3 | auto |
| M4 | `<title>` ≤ 60 caracteres (aviso; com a marca longa dá 63 no PT e 62 no EN) | M4 (annotation `warning`) | auto (não bloqueia) |
| M5 | R1 (sem scroll horizontal) repetido para cada marca | `responsive.spec.ts` com `QA_BRAND` | auto |
| M6 | OG image de cada marca (incluindo `Torno Studio`): marca em até 2 linhas, sem cortar | abrir `dist/og/pt-BR.png` e `dist/og/en.png` após cada build de marca | manual |
| M7 | Placeholder `[Marca]` destacado (`data-placeholder`) só em dev, não no build de produção | inspecionar `header [data-brand]` em `astro dev` e no `dist/` | manual |
| M8 | Marca nunca soa como "nós/time" (regra 1) | revisão do texto em volta do wordmark no footer | manual |

---

## P. Preços = PLANO-DEV §5.3 (oráculo independente, valores escritos no spec)

| Degrau | PT (`/`) | EN (`/en/`) |
|---|---|---|
| Diagnóstico / Scoping call | Grátis · 45 min | Free · 45 min |
| Product Sprint | **R$ 6.000** · 2 semanas · 100% antecipado · abatido em 30 dias | **US$ 3,000** · 2 weeks · 100% upfront · 30 days |
| Production-Ready | **R$ 18.000** · 2–3 semanas · 50/50 | **US$ 7,000** · 2–3 weeks · 50/50 |
| MVP Core | **R$ 42.000** · 6–7 semanas · 40/30/30 · 60 dias | **from US$ 15,000** · 6–7 weeks · 40/30/30 · 60-day (nunca 12,000/18,000) |
| MVP Plus | **R$ 65.000** · 8–10 semanas · 40/30/30 · 60 dias | **Custom quote** · 8–10 weeks (nenhum valor; nunca 30,000/20,000) |
| Product Evolution | **a partir de R$ 4.000/mês** | **from US$ 1,500/mo** |
| Essencial / Essential | ~10 h · R$ 4.000 | ~10 h · US$ 1,500 |
| Evolução / Evolution | ~25 h · R$ 9.000 | ~25 h · US$ 4,000 |
| Parceiro técnico / Technical partner | ~45 h · R$ 16.000 | ~45 h · US$ 7,000 |
| Regras | mínimo 3 meses · excedente R$ 400/h | 3-month minimum · US$ 160/h |

| ID | Caso | Spec | Tipo |
|---|---|---|---|
| P1 | Cada degrau contém exatamente o preço, prazo e pagamento da tabela | `pricing.spec.ts` P1 | auto |
| P2 | Tabela Evolution: 3 linhas com horas e preço; regras (mínimo, excedente) | P2 | auto |
| P3 | Ordem dos degraus: Diagnóstico → Sprint → Production-Ready → Core → Plus → Evolution | P3 | auto |
| P4 | **Nenhum valor monetário fora da tabela** em qualquer página (inclui painel de fatos do hero e FAQ); PT só R$, EN só US$ (exceção: "$25" do FAQ EN sobre o Lovable) | P4 | auto |
| P5 | Prefixo "a partir de"/"from" antes do valor | P5 | auto |
| P6 | Copy × `pricing.ts` (prazos e percentuais) | `tests/copy-pricing.spec.ts` (Compasso) | auto |
| P7 | Formato: `R$ 42.000` (ponto) e `US$ 15,000` (vírgula), numerais tabulares | P1 + inspeção `font-variant-numeric` | auto + manual |

---

## C. AUDITORIA DE CONTEÚDO (regras invioláveis, BRIEFING §3 e PLANO-DEV §2.3)

Escopo do texto auditado: `textContent` do `<body>` (inclui conteúdo dobrado e visualmente oculto), `<title>`, todas as `<meta content>`, `alt`, `title`, `aria-label`. **Excluídos de propósito:** `href`/`src` (a URL da MundoLogística contém o nome da empresa e é permitida pelo copy).

**Qualquer falha em C é bloqueador de conteúdo → Batuta** (não vai para o Ritmo).

| ID | Regra | Padrão automatizado | Spec | Tipo |
|---|---|---|---|---|
| C1 | Sem `PUBLIC_LOOPT_AUTHORIZED=true`: nenhum "Loopt" visível (texto, meta, alt, aria, JSON-LD, comentário). Com F4 autorizado (PLANO-DEV §5.5): regra substituída por C22 | `/loopt/i` no DOM e no HTML bruto de `dist/` sem `href` | `content-audit.spec.ts` C1 + teste de HTML bruto | auto |
| C2 | Nenhum −41% / −31% / −21% (espera, métrica do terminal) | `[−-–]\s?(41\|31)\s?%` e `&minus;` | C2 | auto |
| C3 | Nenhum nós/nosso/time nosso; EN nenhum we/our/us | PT: `nós`, `nosso(a)(s)`, verbos `somos/fazemos/entregamos/construímos/atendemos/oferecemos/trabalhamos/garantimos/cobramos`, `time/equipe nosso/de engenheiros/dedicado`. EN: `we`, `our(s)`, `we're/we'll/we've`, `us` minúsculo, `our team`, `team of engineers` | C3 | auto |
| C4 | Nenhum "mais barato", 5x/10x, "substitui N engenheiros", "fazemos tudo", "sempre mais…" | PT: `mais barat`, `mais em conta`, `menor custo`, `economize`; EN: `cheap(er/est)`, `save money`, `fraction of the cost`; ambos: `\d+x`/`\d+×` | C4 | auto |
| C5 | Nenhum depoimento, logo ou review renderizado | 0 `#depoimentos`, `blockquote`, `q`, Review schema; só `<img alt="Henrique Pett">`; sem "depoimento/testimonial/trusted by/★/4.9/5" | C5 | auto |
| C6 | Nada de "clientes internacionais" / "international clients" | padrão literal | C6 | auto |
| C7 | Nenhum placeholder vazado: `TODO`, `{brand}`, `{price…}`, `undefined`, `NaN`, `null` | padrões literais | C7 | auto |
| C8 | Manchete **idêntica** ao plano §3 nos dois idiomas; "AI-native" fora do hero | igualdade exata do `h1`; `#inicio` sem `AI-native`/`IA nativa` | C8 | auto |
| C9 | Métrica pública: "−27%" e "+21%" no mesmo case, com link para mundologistica.com.br e rótulo "Dado público · MundoLogística, jan/2026" / "Public data · MundoLogística, Jan 2026" (decisão da Batuta, PLANO-DEV §2.3); texto do case sem "Loopt" | C9 | auto |
| C10 | **Bom.Capital só como relato:** case com rótulo "Relato meu" / "My own account"; números sem `<strong>`/badge/cor. Idem "2 semanas → 30 min" | C10 | auto |
| C33 | Ausentes: "30 min(utos)", "plataforma interna"/"internal platform" e "2 semanas"/"2 weeks" no contexto de provisionamento | regra no conjunto C1–C7 | auto |
| C11 | **Ascende como projeto próprio, com link `https://ascende.site`:** rótulo "Projeto próprio" / "Own project"; nunca ligada a "cliente(s)/client(s)" (FinPlan removida: C30) | C11 | auto |
| C22 | F4 autorizado: "Loopt" no case da métrica pública e **só** nos cases de `#quem` (nunca em title, meta, hero, OG); cliente-terminal continua sem nome | `PUBLIC_LOOPT_AUTHORIZED=true` + C9/C22 | auto |
| C23 | neptune.ai **citada sem link** (artigo de 7/jun/2023 fora do ar; PLANO-DEV §5.7). Substitui a remoção do F8 | `content-audit.spec.ts` C23 | auto |
| C30 | FinPlan removida de todo material (base/03 D1) | regra no conjunto C1–C7 | auto |
| C31 | Production-Ready não cita ferramenta (Lovable, Bolt, Cursor) | C31 | auto |
| C32 | Nenhum link para domínio da Bom.Capital (empresa extinta) | C32 | auto |
| C9b | Com F4 autorizado: "segundo a Loopt" / "according to Loopt" no corpo do case, junto dos números (sem autorização: C1) | C9b | auto |
| C9c | Bom.Capital como relato, com "em média 48 horas" / "on average" | C9c | auto |
| C24 | Privacidade identifica o controlador (nome e CNPJ) quando `PUBLIC_LEGAL_*` definidos (F9) | `content-audit.spec.ts` C24 | auto |
| C25 | Foto do fundador (F6): `alt="Henrique Pett"`, `width`/`height`, carregada | C25 | auto |
| C26 | **Exclusões do fundador nunca nomeadas** (base/03 item 8, Q8): `Ecoporto` (e `Eco Porto`/`Eco-Porto`), `Transbrasa`, `Marimex`, `Maersk`, `Bandeirantes`, `Aliança`/`Alianca`, mais as pessoas da matéria (`Bissani`, `Gutierres`), sem diferenciar maiúsculas. Ecoporto permitido **só** dentro do `href` da MundoLogística | regra no conjunto C1–C7 (texto, meta, alt, aria) + varredura de `href/src/srcset` + HTML bruto do `dist/` sem o href da MundoLogística | auto |
| C27 | Nenhuma menção a "Vercel" no site (hospedagem e privacidade agora citam a Netlify, PLANO-DEV §5.6) | regra no conjunto C1–C7 | auto |
| C28 | **Sem analytics no cliente e sem injeção da plataforma** (B5: selo/HUD da Netlify, toolbar da Vercel, nenhum `iframe`): nenhuma requisição a outro host (após rolar a página), nenhum cookie, nenhum script de analytics/insights/gtag; privacidade sem "medição de visitas" até decisão do fundador | `content-audit.spec.ts` C28 (`QA_IGNORE_HOSTS` para ferramentas do preview, ex. Netlify Drawer) + leitura da privacidade | auto + manual |
| C29 | Garantia de 60 dias **qualificada como MVP** (f3bcad8): microprova "Garantia de 60 dias no MVP" / "60-day bug warranty on MVPs"; nunca sem qualificação no hero nem no og:description | `content-audit.spec.ts` C29 | auto |
| C12 | Nenhum link vazio (`#`, `""`, sem href); e-mail/LinkedIn vazios somem em vez de virar `href="#"` | C12 | auto |
| C13 | Bom.Capital e o relato de provisionamento **não** aparecem em hero, microprova, OG nem meta como resultado | `grep -i "bom.capital\|48 h\|30 min" dist/**/index.html` só dentro de `#quem` e FAQ | manual |
| C14 | Experiência internacional só como "trabalhei remotamente, em inglês, numa consultoria que atendia empresas europeias" | ler `#quem` PT e EN | manual |
| C15 | Sem promessa de "qualquer produto em 2 semanas" (só aparece negada em "Para quem não é") | ler `#nao-e-para` | manual |
| C16 | "Garantia de prazo" **não** publicada (só garantia de 60 dias para bugs) | `grep -i "garantia de prazo\|deadline guarantee\|on-time guarantee" dist -r` = vazio | manual |
| C17 | Texto renderizado = `docs/copy/*.md` aprovado (sem frase inventada na implementação) | leitura lado a lado, seção por seção, PT e EN | manual |
| C18 | Seção de depoimentos com `PUBLIC_SHOW_TESTIMONIALS=true` também não traz conteúdo de exemplo | build com a flag e grep em `#depoimentos` | manual |
| C19 | Envs do site na Netlify coerentes com o PLANO-DEV (§5.5–5.6): `PUBLIC_SITE_BRAND=Torno Studio`, `PUBLIC_LOOPT_AUTHORIZED=true`, booking, e-mail, `PUBLIC_LEGAL_*` nos contextos production e deploy-preview | `npx netlify env:list --context production` e `--context deploy-preview` | manual |

---

## CS. Consentimento e Google Ads (docs/consent/SPEC.md §7–§8; `tests/qa/consent.spec.ts`)

Deploy 1 = Necessários + Publicidade, gtag `AW-934581192` só após o aceite, sem conversão, sem Calendly/UTM. Casos do deploy 2 ficam em skip até `QA_DEPLOY2=1`. Casos com rede externa rodam no ar (`QA_BASE_URL`) ou com `QA_ONLINE=1` num build com `PUBLIC_GADS_ID`. Os specs antigos usam `tests/qa/fixtures.ts`, que grava um consentimento recusado antes de carregar.

| ID | Caso | Deploy |
|---|---|---|
| CS-a | 1ª visita sem escolha: banner `role=region` aberto, 0 requisições a google*/doubleclick/calendly, 0 cookies de terceiros, 0 `_gcl_*`, sem registro `ts-consent`, `consent default` no dataLayer e nenhum `gtag.js` (PT/EN) | 1 |
| CS-b | Recusar: idem após reload; CTA = link de saída sem UTM | 1 |
| CS-c | Aceitar: `gtag/js?id=AW-934581192`; `consent default` (denied) **antes** de `update` e de `config`; `ad_personalization` continua `denied`; `config` com `allow_ad_personalization_signals: false` (Alicerce); sem `gclid`, e-mail ou evento de conversão | 1 |
| CS-c3 | Aceitar (deploy 1): CTA continua link de saída, sem popup e sem UTM | 1 |
| CS-c2 | Aceitar: popup do Calendly com as 5 UTMs da chegada | 2 |
| CS-d1 | Personalizar: só Publicidade (desmarcada; sem Medição); Salvar sem marcar = recusado, 0 terceiros | 1 |
| CS-d | Só Medição: popup sim, Google não | 2 |
| CS-e | Revogar pelo footer: Recusar tudo recarrega, apaga `_gcl_*`, sem gtag.js, CTA sem UTM | 1 |
| CS-f | axe no banner e no diálogo (claro/escuro); teclado (skip link → Aceitar; Esc fecha sem salvar; foco em `main` após escolher); 3 botões com mesmo tamanho, peso, fonte e cores, ≥ 44 px (360 e 1280); banner não cobre o CTA do hero em 360×640 | 1 |
| CS-g | Banner no idioma da página, com link para a política do idioma | 1 |
| CS-h | `[data-consent-open]` no footer das 5 páginas (inclusive a 404); sem JS, nem banner nem botão | 1 |
| CS-j | Medição + Publicidade: `calendly.event_scheduled` enviado **de dentro do iframe do Calendly** (origem real `https://calendly.com`) gera **uma** conversão `{send_to:'AW-934581192/EOw5CK7RiZYdEMin0r0D', value:1, currency:'BRL'}`; a mesma URI de convidado não repete; nenhum dado do convidado (URI, nome, e-mail) no dataLayer | 2 |
| CS-k | Só Medição: popup abre; `event_scheduled` não gera conversão nem requisição ao Google | 2 |
| CS-l | Mensagens de outra origem (o próprio site, `calendly.com.evil.example`, `http://calendly.com`) são ignoradas | 2 |
| CS-o | **Documental (não falha):** trackers do quadro do Calendly antes da resposta ao aviso dele. Brasil = OneTrust opt-out, GA/GTM/Facebook carregados; **aceito pelo Alicerce** (research/09 §6, opção A) e informado no modal e na política. Pendente: IP real da UE antes de anúncios na UE | 2 |
| CS-n | Sem escolha (banner aberto): clique no CTA = link de saída, sem popup e sem Google | 1 e 2 |
| CS-report-calendly | Lista real de cookies em sessão limpa, só com Medição + popup do Calendly (`QA_COOKIE_REPORT=1 QA_DEPLOY2=1`) | 2 |
| CS-report | Lista **real** de cookies em sessão limpa após Aceitar (nome, domínio, duração) para a tabela da política (`QA_COOKIE_REPORT=1`) | 1 |
| C35 | Política sem "não uso cookies" / "não faço publicidade" (PT/EN) | 1 |

**Regra de parada (Alicerce):** se aparecer qualquer cookie antes do aceite, ou fora de Publicidade depois dele, o deploy 1 para e volta ao Alicerce.

## D. Landing `/diagnostico/` (docs/landing/DIAGNOSTICO-SPEC.md; `tests/qa/diagnostico.spec.ts`)

| ID | Caso | Tipo |
|---|---|---|
| D1 | 200, `lang=pt-BR`, meta robots `noindex, follow` (sem nofollow); canonical, se houver, aponta para a própria rota e não para a home | auto |
| D2 | Fora do sitemap; `robots.txt` sem `Disallow` que bloqueie a rota ou o AdsBot | auto |
| D3 | Sem par EN quebrado: hreflang (se houver) responde 200; seletor de idioma → `/en/` | auto |
| D4 | Sem Loopt, Lovable, FinPlan, exclusões Q8, −41/−31/−21%, 1ª plural, "mais barato"/5x, TODO | auto |
| D5 | Nenhum placeholder `[Mote:` (o build de produção também falha se sobrar) | auto + manual (`CONTEXT=production npx astro build`) |
| D6 | Nenhum `linkedin.com`, nenhum link da Bom.Capital; links de saída só Calendly e ascende.site | auto |
| D7 | Bom.Capital como relato ("em média 48 horas"), sem link nem logo; Ascende como projeto próprio, com link | auto |
| D8 | Escada idêntica à da home (`li[data-step]`, mesmos dados do `pricing.ts`) | auto |
| D9 | CTA único (mesmo href) no header, no hero e no final; header sem menu de âncoras | auto |
| D10 | Footer com Privacidade e Preferências de cookies | auto |
| D11 | axe sem violação séria/crítica (claro/escuro, 360/1280) | auto |
| D12 | Um H1; sem scroll horizontal de 320 a 1920 | auto |
| D13 | CTA visível sem rolar em 360×640 **com o banner aberto**, sem sobreposição | auto |
| D-CS | CS-a..n também em `/diagnostico/` (`BOOKING_PAGES` em `consent.spec.ts`) | auto |
| D-L | Lighthouse mobile e desktop: Perf, A11y e BP ≥ 95; SEO ≥ 95 exceto `is-crawlable` (noindex intencional) | auto (lhci com a URL) |

## B3. Contador sem cookie da `/diagnostico/` (docs/infra/CONTADOR-DIAGNOSTICO.md; `tests/qa/counter.spec.ts`)

Só no ar (`QA_BASE_URL`). O Blobs é lido pela Netlify CLI logada (`netlify blobs:get visitas-diagnostico <AAAA-MM-DD em UTC−3>`). O contador só conta em **production** (`QA_COUNTER=production`); no preview, `QA_COUNTER=preview` exige que **não** conte. Visitas contadas pelo QA ficam nas annotations para descontar do total do dia.

| ID | Caso |
|---|---|
| B3-a | GET na `/diagnostico/` sem `Set-Cookie`, sem header que a home não tenha (ignorando os voláteis), 0 cookies no navegador |
| B3-b | Blob do dia = exatamente `{"n": …}` (sem IP, UA, URL, referer); +1 por visita de browser real (UA normal); exige ≥ +3 em 3 visitas e registra o excedente de tráfego externo |
| B3-c | Não contam: `HEAD` (B9: a borda da Netlify entrega HEAD como GET; a correção exige `Sec-Fetch-Dest: document` + `Sec-Fetch-Mode: navigate`); GET de UA real **sem** esses headers (curl, monitores); `Sec-Fetch-Dest: iframe`; `Sec-Fetch-Mode` ≠ navigate; `Sec-Purpose`/`Purpose: prefetch`; Googlebot, AdsBot, HeadlessChrome, Lighthouse, facebookexternalhit, Slackbot; `Accept` sem `text/html`; visitas a `/`, `/en/`, `/privacidade/`, `/en/privacy/` |
| B3-p | No preview, visita de browser real não conta |
| B3-d | TTFB (`curl time_starttransfer`), 20 amostras intercaladas com cache-buster: mediana `/diagnostico/` ≤ home + 15 ms |
| B3-e | Lighthouse da `/diagnostico/` mantido (100/100/100, SEO só sem `is-crawlable`). O lhci usa HeadlessChrome e não conta |
| B3-f | Política PT/EN com a linha do contador agregado (texto do Alicerce, research/09 §7) |

## E. Bordas e regressão

| ID | Caso | Como | Tipo |
|---|---|---|---|
| E1 | Site funciona sem JS (exceto toggle): FAQ, "O que inclui", nav, idioma | `edge.spec.ts` E1 + T1 | auto |
| E2 | Rede lenta (Slow 3G): sem FOIT longo, sem CLS na troca de fonte | DevTools Network throttling | manual |
| E3 | Rotas sem barra final (`/privacidade`, `/en`) redirecionam para a com barra (Netlify Pretty URLs / regra do `netlify.toml`) | `curl -sI <deploy>/privacidade` → 301 ou 308 com `location: /privacidade/` | manual (fase 5) |
| E4 | `PUBLIC_CONTACT_EMAIL` vazio: bloco de e-mail some (CTA final e privacidade); preenchido: `mailto:` correto | 2 builds | manual |
| E5 | ~~neptune.ai~~: menção e env removidas (F8, d5ecd92). Conferir que nenhuma página cita neptune | `grep -ri neptune dist` vazio | manual |
| E6 | Build de produção da Netlify sem as envs obrigatórias (booking, e-mail, `PUBLIC_LEGAL_*`) **falha** | `CONTEXT=production npx astro build` → erro `[env-guard]`; com `CONTEXT=deploy-preview` só avisa | manual |
| E7 | Regressão: specs do Compasso (`smoke.spec.ts`, `copy-pricing.spec.ts`) continuam verdes | etapa `base` do runner | auto |
| E8 | Caracteres especiais/unicode: diacríticos PT, "–", "−", "·", "→" renderizam com a fonte (sem tofu) | screenshots R4 | manual |

---

## Relatório e encaminhamento

- Relatório da rodada: `docs/qa/RELATORIO-<data>.md`, com a saída real de cada etapa, a tabela de IDs (✅/❌/n.a.) e os screenshots.
- **Bug de UI/implementação** → Ritmo (`maestri ask "Ritmo"`), com: passos exatos, esperado, obtido, severidade (bloqueador / alta / média / baixa) e evidência (saída do teste, screenshot).
- **Bloqueador de conteúdo** (qualquer C, P ou manchete) → Batuta.
- Gate aprovado só com: L1–L3, A1, K1–K5, R1, T1–T2, S1–S9, N1, M1–M5, P1–P5 e C1–C12 verdes, e os manuais executados com evidência.
