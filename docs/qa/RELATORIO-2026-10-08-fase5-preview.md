# Relatório de QA: fase 5 (preview Vercel) + rodada final local

> Afinador, 2026-10-08.
> Preview validado: `https://founding-engineer-site-c46lwtmop-henripetts-projects.vercel.app` (HEAD `b1e7e45`, privacidade reescrita 449895b/208f17a, `PUBLIC_CONTACT_EMAIL` definido). O preview anterior (`…nq5os8sso…`) ficou obsoleto.
> Acesso: Vercel Authentication contornado com `npx vercel curl` e com o header `x-vercel-protection-bypass`. O secret ficou só em memória/scratchpad, **nunca no repo**, e os relatórios do Lighthouse, que registram os headers, ficaram fora do repo.

## Veredito

**Aprovado para produção, pendente só de F2/F9.** Nenhum bug aberto. O Lighthouse no preview cai em BP e SEO apenas por artefatos de preview da Vercel (detalhes abaixo). Reconfirmar o Lighthouse na URL de produção logo após o deploy.

## 1. Rodada final local (HEAD `016f7a6`, `bash tests/qa/run-qa.sh`)

| Etapa | Resultado |
|---|---|
| check + 6 builds | 15 × `exit=0` |
| Playwright completo | **236 passed**, 0 failed, 33 skipped |
| Marcas `Ox` / `[Marca]` / `Northbridge Product Engineering` | 85 / 85 / 85 passed |
| `seo.spec` indexável | 24 passed |
| Lighthouse mobile e desktop, local | 100 nas 4 categorias, 4 URLs |
| linkinator | 0 quebrado |
| **B3** | ✅ com `PUBLIC_CONTACT_EMAIL=x@y.z`: `data-contact="email"` + `mailto:` nas 4 páginas, 93 testes passam; sem e-mail: `data-contact="linkedin"`; `VERCEL_ENV=production` sem e-mail → `[env-guard] Variáveis obrigatórias vazias em VERCEL_ENV=production: PUBLIC_CONTACT_EMAIL.` |
| **B4** | ✅ K6 passa em / e /en/ |

## 2. Preview: Playwright (`tests/qa/playwright.preview.config.ts`)

Comando: `PUBLIC_CONTACT_EMAIL=henriquepett@gmail.com QA_BASE_URL=<preview> QA_BYPASS=<secret> npx playwright test -c tests/qa/playwright.preview.config.ts`

```
34 skipped
208 passed (25.7s)
```

Cobre `tests/qa/*` e `tests/smoke.spec.ts` contra a URL publicada: axe claro/escuro, teclado/foco (B4 incluído), responsivo 320–1920, preços §5.3, auditoria de conteúdo C1–C12, privacidade nova C20 (nenhum "6 meses/6 months") e C21 (e-mail visível na privacidade e em `#contato`), B3 (`data-contact="email"`), hreflang/canonical/og:image **com origem = host do preview**, sitemap, robots, 404, borda (sem JS, back, storage bloqueado). Skips: matriz de marca (só local), galeria R4 e a varredura do `dist/` local.

## 3. Preview: HTTP

| Caso | Resultado |
|---|---|
| Status | `/`, `/en/`, `/privacidade/`, `/en/privacy/` = 200; `/qa-nao-existe/` = 404; `/privacidade` → **308** `location: /privacidade/` (E3) |
| Headers de segurança (S10) | presentes nas 4 páginas: `strict-transport-security: max-age=63072000; includeSubDomains; preload`, `content-security-policy` (default-src 'self' …), `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy`, `cross-origin-opener-policy: same-origin` |
| noindex | `x-robots-tag: noindex` em todas as respostas (HTML, robots, sitemap, PNG) **e** `<meta name="robots" content="noindex, nofollow">` |
| robots.txt | `User-agent: *` / `Allow: /` / `Sitemap: https://…c46lwtmop….vercel.app/sitemap-index.xml` |
| sitemap (S11) | 4 `<loc>` absolutos no host do preview: `/`, `/en/`, `/en/privacy/`, `/privacidade/` |
| og:image | `/og/pt-BR.png` e `/og/en.png` = 200 `image/png`, 1200×630 (S5) |
| Links (N4) | 14 URLs referenciadas: todos 200, incluindo LinkedIn, GitHub e MundoLogística. O único 404 é a própria página 404 (o skip link `#conteudo` aponta para ela mesma; o `id="conteudo"` existe) |

## 4. Preview: Lighthouse (3 runs, mediana; mobile e desktop; 4 URLs)

| Formato | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| mobile, 4 URLs | 100 | 100 | 93 | 58 |
| desktop, 4 URLs | 100 | 100 | 93 | 58 |

Causas (audits com falha):
- **BP 93: `errors-in-console` e `inspector-issues`.** A Vercel injeta o toolbar de preview (`<script src="https://vercel.live/_next-live/feedback/feedback.js" data-explicit-opt-in>`), que **não está no nosso build** e é bloqueado pela nossa CSP (`script-src 'self'`). Prova: com `blockedUrlPatterns: ["*vercel.live*"]`, BP = **100** nas 8 medições (4 URLs × mobile/desktop). Esse toolbar não é injetado em produção.
- **SEO 58: `is-crawlable`** (noindex intencional do preview, exceção prevista no L6) **e `robots-txt`.** O Lighthouse busca `/robots.txt` sem o header de bypass e recebe a página de login da Vercel; o robots real, via bypass, está correto (§3). Descontados esses dois audits, que dependem de proteção e de indexação, **todos os demais audits de SEO passam**.
- Perf e A11y: 100 em tudo.

Ação recomendada (não bloqueia): logo após `vercel --prod`, rodar `npx lhci autorun` com as URLs de produção, sem bypass, para confirmar BP e SEO ≥ 95 no ar. Opcional: desligar o Vercel Toolbar em previews nas configurações do projeto.

## 5. Privacidade nova (auditoria de conteúdo)

- Sem promessa de guardar logs por 6 meses. PT: "Os registros técnicos de acesso ficam por tempo limitado, conforme a retenção da Vercel." EN: "Technical access logs are kept for a limited time, under Vercel's retention."
- `henriquepett@gmail.com` visível em `/privacidade/` e `/en/privacy/` (e no `#contato` das duas homes; C21).
- Regras invioláveis: C1–C12 verdes também nas páginas de privacidade.

## Pendências fora do QA

- F2 `PUBLIC_BOOKING_URL` e F9 `PUBLIC_LEGAL_NAME`/`PUBLIC_LEGAL_ID`: o env-guard barra produção sem eles (verificado).
- C19 (`PUBLIC_LOOPT_AUTHORIZED` false em produção) e S12 (OG no LinkedIn Post Inspector): conferir no deploy de produção, já que o preview protegido não é acessível a crawlers externos.
