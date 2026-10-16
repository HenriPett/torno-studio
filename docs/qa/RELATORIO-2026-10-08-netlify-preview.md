# Relatório de QA: deploy preview Netlify (marca Torno)

> Afinador, 2026-10-08. URL: `https://6ac7ca19f6e6f2062ab22a83--tornostudio.netlify.app` (HEAD `c7f5907`, envs da Netlify: Torno, Calendly, controlador, e-mail, Loopt autorizada). Sem proteção por login.

## Veredito

**Aprovado para produção.** Nenhum bug bloqueante. Duas notas para conferir na URL de produção (`https://tornostudio.netlify.app`): o host das URLs absolutas (artefato do deploy via CLI) e o `max-age` do HSTS.

## Playwright no ar

```
QA_BRAND=Torno QA_CANONICAL_ORIGIN=https://main--tornostudio.netlify.app \
PUBLIC_CONTACT_EMAIL=henriquepett@gmail.com PUBLIC_LOOPT_AUTHORIZED=true \
PUBLIC_LEGAL_NAME="Henrique Nass Pett" PUBLIC_LEGAL_ID="43.609.432/0001-07" \
QA_BOOKING_URL=https://calendly.com/henriquepett/45min QA_BASE_URL=<draft> \
npx playwright test -c tests/qa/playwright.preview.config.ts

4 skipped
255 passed
```

Inclui: matriz de conteúdo **C1–C28** (Loopt só nos cases; Ecoporto/Eco Porto/Bissani/Gutierres ausentes fora do href da MundoLogística; nada de Vercel nem neptune; **sem analytics: 0 requisição a terceiros, 0 cookie**), marca **Torno** (M1–M3: title, og:site_name, header, footer; wordmark em 360/768/1280/1920), CTAs → Calendly (K5), axe claro/escuro, teclado/foco, responsivo 320–1920, preços §5.3, B3/B4, SEO. Skips: galeria R4 e as varreduras do `dist/` local.

## HTTP

| Caso | Resultado |
|---|---|
| Status | 4 páginas = 200; `/qa-nao-existe/` = **404**; `/privacidade` e `/en` → **301** para a versão com barra (E3) |
| noindex | `x-robots-tag: noindex` em todas as respostas **e** `<meta name="robots" content="noindex, nofollow">` |
| Headers (S10) | CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP: iguais ao `netlify.toml`. **HSTS servido: `max-age=31536000; includeSubDomains; preload`** (o toml pede 63072000; a Netlify impõe o próprio HSTS em `*.netlify.app`). Ver N2 |
| Scripts | só os 2 inline do tema; nenhum toolbar/drawer injetado; nenhum `set-cookie` |
| OG | `/og/pt-BR.png` e `/og/en.png` = 200 `image/png`; `og:site_name` = Torno; title "Founding Engineer sob demanda \| Torno" |
| robots.txt | `Allow: /` + `Sitemap: https://main--tornostudio.netlify.app/sitemap-index.xml` |
| Links | 18 URLs, **0 quebrado** (Calendly, LinkedIn, GitHub, MundoLogística = 200). Calendly: 5 por home, 1 por privacidade |

## Lighthouse no ar (3 runs, mediana)

| Formato | URL | Perf | A11y | BP | SEO | Falhas |
|---|---|---|---|---|---|---|
| mobile | `/`, `/en/` | 100 | 100 | 100 | 69 | is-crawlable |
| mobile | `/privacidade/`, `/en/privacy/` | 100 | 100 | 100 | 66 | is-crawlable |
| desktop | `/`, `/en/` | 100 | 100 | 100 | 69 | is-crawlable |
| desktop | `/privacidade/`, `/en/privacy/` | 100 | 100 | 100 | 66 | is-crawlable |

Única falha: `is-crawlable`, o noindex intencional do preview (exceção L6). Diferente da Vercel, aqui não há toolbar (BP 100) e o robots.txt é acessível. Em produção indexável, o esperado é SEO 100, como no lhci local.

## Notas (não bloqueiam)

- **N1. Artefato de preview (registrado, conforme a Batuta):** num deploy via CLI, `DEPLOY_PRIME_URL` = `https://main--tornostudio.netlify.app`, então canonical, hreflang, og:url, og:image, robots e sitemap apontam para esse host, que hoje responde **404** (não há deploy de branch `main`). Em produção, a URL será `https://tornostudio.netlify.app`: conferir S1/S2/S5/S11 lá com `QA_BASE_URL` sem `QA_CANONICAL_ORIGIN`.
- **N2. HSTS em `*.netlify.app`:** valor da Netlify (1 ano) em vez do toml (2 anos). Ainda cumpre o critério de preload (≥ 1 ano). Com domínio próprio, conferir se o valor do toml é servido.
- **Rodada local:** a etapa `base` da minha primeira rodada pós-migração foi contaminada por um `netlify deploy --build` concorrente, que reescreve o `dist/` com as envs do site (9 falhas de env: K5, C1/C9, smoke). Refeita limpa: **251 passed, 0 failed**. Marcas Torno/Ox/[Marca]/Northbridge: 85/85 cada; lhci local 100 em tudo; links ok.

## Rodada local (HEAD `c7f5907`)

| Etapa | Resultado |
|---|---|
| `npm run check` | 0 erros |
| Playwright (refeito, sem concorrência) | 251 passed, 39 skipped |
| Marcas Torno / Ox / [Marca] / Northbridge | 85 / 85 / 85 / 85 |
| `seo.spec` indexável | 24 passed |
| Lighthouse mobile e desktop local | 100 · 100 · 100 · 100 nas 4 URLs |
| E6 `CONTEXT=production` sem envs | falha: `[env-guard] Variáveis obrigatórias vazias em CONTEXT=production (Netlify): PUBLIC_BOOKING_URL, PUBLIC_LEGAL_NAME, PUBLIC_LEGAL_ID, PUBLIC_CONTACT_EMAIL.` |
| `DEPLOY_PRIME_URL` | canonical/hreflang/og/sitemap usam o host informado |
