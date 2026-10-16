# Relatório de QA: marca "Torno Studio" (local, antes do redeploy)

> Afinador, 2026-10-08. HEAD `d81504f`. Build local com as envs de produção:
> `PUBLIC_SITE_BRAND='Torno Studio'`, `PUBLIC_LOOPT_AUTHORIZED=true`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_LEGAL_*`, `PUBLIC_BOOKING_URL` (Calendly).

## Veredito

**Ok para redeploy.**

## Suíte completa (Playwright, `tests/` + `tests/qa/`, `QA_BRAND='Torno Studio'`)

```
npm run check -> 0 errors
2 skipped
288 passed
```

Inclui 31 testes de marca (M1–M3 nas 5 páginas, wordmark em 360/768/1280/1920) e a auditoria de conteúdo C1–C28 (44 casos). Skips: galeria R4 e a varredura do `dist/` do C1, que não se aplica com a Loopt autorizada.

## `<title>` e OG

| Página | `<title>` | Tamanho | og:title | og:site_name |
|---|---|---|---|---|
| `/` | Founding Engineer sob demanda \| Torno Studio | **44** | Seu produto em produção em 6–10 semanas, com um único responsável sênior. | Torno Studio |
| `/en/` | Fractional Founding Engineer \| Torno Studio | **43** | Ship your product without hiring a team. | Torno Studio |
| `/privacidade/` | Privacidade \| Torno Studio | 26 | Privacidade \| Torno Studio | Torno Studio |
| `/en/privacy/` | Privacy \| Torno Studio | 22 | Privacy \| Torno Studio | Torno Studio |
| 404 | Página não encontrada \| Torno Studio | 36 | Página não encontrada \| Torno Studio | Torno Studio |

Todos ≤ 60 (limite do copy §13).

## Wordmark (linhas de texto reais)

| Página | 360 px | 768 px | 1280 px |
|---|---|---|---|
| `/` header / footer | 1 / 1 | 1 / 1 | 1 / 1 |
| `/en/` header / footer | 1 / 1 | 1 / 1 | 1 / 1 |

Sem quebra, sem truncar, sem sobrepor controles (M3). Evidência: `docs/qa/evidencias/torno-studio-header-{360,768,1280}.png` e `…-footer-…`.

## OG image

`dist/og/pt-BR.png` e `dist/og/en.png`: 1200×630, primeira linha "Torno Studio · Founding Engineer sob demanda" / "Torno Studio · Fractional Founding Engineer", em 1 linha, sem corte. Evidência: `docs/qa/evidencias/torno-studio-og-{pt-BR,en}.png`.

## Após o redeploy

Repetir no ar: `QA_BRAND='Torno Studio' QA_BASE_URL=https://tornostudio.netlify.app PUBLIC_*=… npx playwright test -c tests/qa/playwright.preview.config.ts`.

## Produção após o redeploy (`https://tornostudio.netlify.app`, HEAD 80664f8+)

**Veredito: aprovado.**

```
QA_BRAND='Torno Studio' PUBLIC_CONTACT_EMAIL=henriquepett@gmail.com PUBLIC_LOOPT_AUTHORIZED=true \
PUBLIC_LEGAL_NAME="Henrique Nass Pett" PUBLIC_LEGAL_ID="43.609.432/0001-07" \
QA_BOOKING_URL=https://calendly.com/henriquepett/45min QA_BASE_URL=https://tornostudio.netlify.app \
npx playwright test -c tests/qa/playwright.preview.config.ts

4 skipped
255 passed      (marca: 31 ✓; content-audit: 42 ✓, C1–C28)
```

- OG no ar: `/og/pt-BR.png` e `/og/en.png` em 1200×630, com "Torno Studio · Founding Engineer sob demanda" / "Torno Studio · Fractional Founding Engineer" em 1 linha.
- 0 `/.netlify/scripts/hud` (B5 continua resolvido).
- Lighthouse (3 runs, mediana), mobile e desktop: `/` e `/en/` 100 · 100 · 100 · 69; `/privacidade/` e `/en/privacy/` 100 · 100 · 100 · 66. Única falha: `is-crawlable` (noindex intencional até o domínio).

## Ajuste f3bcad8: garantia de 60 dias qualificada como MVP (local, `PUBLIC_SITE_BRAND='Torno Studio'` + envs de produção)

**Veredito: ok para redeploy.**

```
npm run check -> 0 errors
2 skipped
296 passed
```

- Novo **C29** (PT e EN): microprova contém "Garantia de 60 dias no MVP" / "60-day bug warranty on MVPs"; nem o `#inicio` nem o og:description trazem a garantia sem "no MVP"/"on MVPs". ✓
- Novo **R5** (6 casos: PT/EN × 360/768/1280): cada item da microprova em 1 linha, dentro do container, sem scroll horizontal. ✓ Evidência: `docs/qa/evidencias/hero-garantia-mvp-360-{pt,en}.png`.
- `tests/copy-pricing.spec.ts` (copy × pricing.ts): 2/2 ✓. C1–C28 ✓. Nenhum teste dependia do texto antigo.
