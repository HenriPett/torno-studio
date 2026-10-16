# Relatório de QA: consentimento + Google Ads, deploy 1 (SPEC §8)

> Afinador, 2026-10-08. HEAD `979bfa1`. Preview: `https://6ac8196873f1287f68d37b21--tornostudio.netlify.app` (noindex; canonical `main--…`, artefato do deploy via CLI já registrado).

## Veredito

**Ok para produção.**

## Bugs desta rodada (todos resolvidos)

| ID | Gravidade | Achado | Correção | Revalidação |
|---|---|---|---|---|
| B6 | média | A revogação apagava o cookie `_gcl_au`, mas deixava `_gcl_ls` no localStorage | `d9f4b35` (Compasso): limpa `_gcl_*`/`_ga*` do local e do sessionStorage | CS-e ✓ (PT/EN): cookies `[]`, localStorage só `ts-consent` |
| B7 | **parada (Alicerce)** | Com só Publicidade aceita, a tag `AW-934581192` enviava `page_view` com client id ao **GA4 `G-G6941HG7H1`** (`google-analytics.com/g/collect`, gcs=G110): analytics fora da categoria e da política | `979bfa1` (Compasso): opt-out oficial `ga-disable-G-G6941HG7H1` antes do gtag.js; CSP sem google-analytics | CS-i ✓ (PT/EN): **0 requisições** a google-analytics; console sem erro de CSP depois do aceite |

## Suíte no ar (preview, rede real)

```
QA_BASE_URL=<preview> QA_CANONICAL_ORIGIN=https://main--tornostudio.netlify.app QA_BRAND='Torno Studio' \
PUBLIC_CONTACT_EMAIL=… PUBLIC_LOOPT_AUTHORIZED=true PUBLIC_LEGAL_*=… QA_BOOKING_URL=<Calendly> QA_COOKIE_REPORT=1 \
npx playwright test -c tests/qa/playwright.preview.config.ts

8 skipped   (deploy 2: CS-c2/CS-d; varreduras do dist local; galeria)
308 passed
```

| Caso | Resultado |
|---|---|
| CS-a 1ª visita: banner aberto, 0 Google/doubleclick/Calendly, 0 cookies, 0 `_gcl_*`, `consent default` no dataLayer, sem gtag.js | 2/2 ✓ |
| CS-b Recusar (+ reload): idem; CTA = link de saída sem UTM | 2/2 ✓ |
| CS-c Aceitar: `gtag/js?id=AW-934581192`; default (denied) < update < config; `ad_personalization` denied; `allow_ad_personalization_signals:false`; sem gclid/conversão | 2/2 ✓ |
| CS-c3 Aceitar: CTA segue link de saída, sem popup | 2/2 ✓ |
| CS-d1 Personalizar: só Publicidade, desmarcada; Salvar = recusado | 2/2 ✓ |
| CS-e Revogar pelo footer: `_gcl_*` apagados (cookie **e** localStorage) | 2/2 ✓ |
| CS-f axe (claro/escuro, banner e diálogo), teclado (skip → política → Aceitar; Esc; foco no main), 3 botões iguais ≥ 44 px, hero livre em 360×640 | 10/10 ✓ |
| CS-g banner no idioma, link `#cookies` da política do idioma | 2/2 ✓ |
| CS-h preferências no footer das 5 páginas; sem JS nada aparece | 6/6 ✓ |
| CS-i nenhuma requisição ao Google Analytics depois do aceite | 2/2 ✓ |
| C1–C35 (incluindo C20 só para logs e C35 sem "não uso cookies") | ✓ |

## Cookies e armazenamento reais (sessão limpa)

- **Recusando:** 0 cookies, 0 requisições ao Google.
- **Aceitando:**

| Nome | Tipo | Domínio | Duração medida | Fonte oficial |
|---|---|---|---|---|
| `_gcl_au` | cookie 1ª parte | domínio do site (`.…tornostudio.netlify.app` no preview) | 90 dias | https://business.safety.google/adscookies/ ("90 days"; "Analytics, Advertising, Security") |
| `_gcl_ls` | localStorage | site | sem prazo | a página do Google não lista |
| `ts-consent` | localStorage (nosso) | site | 6 meses (SPEC §3.2) | — |

A tabela publicada na privacidade (PT/EN, `ef73658`) traz exatamente essas linhas, mais `theme` (necessário). Nenhum cookie antes do aceite nem fora de Publicidade: a regra de parada do Alicerce não disparou depois do B7.

## Lighthouse no preview, banner aberto (1ª visita), 3 runs, mediana

| Formato | `/`, `/en/` | `/privacidade/`, `/en/privacy/` | Falhas |
|---|---|---|---|
| mobile | 100 · 100 · 100 · 69 | 100 · 100 · 100 · 66 | is-crawlable |
| desktop | 100 · 100 · 100 · 69 | 100 · 100 · 100 · 66 | is-crawlable |

O SEO só perde o `is-crawlable` (noindex do preview). Em produção indexável, o esperado é 100, como na rodada do domínio.

## Infra do QA

Builds locais isolados: `npx astro build --outDir $QA_OUTDIR` + `tests/qa/playwright.local.config.ts` (porta 4331), sem tocar o `dist/` compartilhado. Specs antigos gravam o consentimento "recusado" pela `tests/qa/fixtures.ts`; o banner é coberto só pelo `consent.spec.ts`.
