# Relatório de QA: deploy 2A, preview final

> Afinador, 2026-10-08. Preview: `https://6ac8203cda35a6b07c4d09de--tornostudio.netlify.app` (com c5fafa7: o comportamento do quadro do Calendly está informado no modal e na política).

## Veredito

**Ok para produção.**

## Suíte no ar (`QA_DEPLOY2=1`)

```
QA_DEPLOY2=1 QA_BASE_URL=<preview> QA_CANONICAL_ORIGIN=https://main--tornostudio.netlify.app QA_BRAND='Torno Studio' \
PUBLIC_CONTACT_EMAIL=… PUBLIC_LOOPT_AUTHORIZED=true PUBLIC_LEGAL_*=… QA_BOOKING_URL=<Calendly> \
npx playwright test -c tests/qa/playwright.preview.config.ts

8 skipped
317 passed
```

CS-a 2/2 · CS-b 2/2 · CS-c 2/2 · CS-c2 2/2 · CS-d 2/2 · CS-d1 2/2 · CS-e 2/2 · CS-f 10/10 · CS-g 2/2 · CS-h 6/6 · CS-i 2/2 · CS-j 2/2 · CS-k 2/2 · CS-l 2/2 · CS-n 1/1 · CS-o 1/1 · C1–C35 ✓.

## Comportamento conhecido (CS-o, documental)

Aceito pelo Alicerce (research/09 §6, opção A), informado no modal e na política (c5fafa7). Só ocorre depois do aceite de **Medição** no nosso banner.

```
geo={"country":"BR","state":"SC","continent":"SA"}  activeGroups=,C0001,C0003,C0002,C0004,
+4.0s www.google-analytics.com/analytics.js
+4.0s connect.facebook.net/en_US/fbevents.js
+4.0s www.googletagmanager.com/gtag/js
```

**Pendente:** teste com IP real da UE antes de qualquer anúncio na UE. Na UE simulada (geolocalização do OneTrust trocada para DE), o modelo foi opt-in e não houve requisição (relatório `…-calendly-cmp.md`).

## Lighthouse, banner aberto (1ª visita), 3 runs, mediana

| Formato | `/`, `/en/` | `/privacidade/`, `/en/privacy/` | Falhas |
|---|---|---|---|
| mobile | 100 · 100 · 100 · 69 | 100 · 100 · 100 · 66 | is-crawlable |
| desktop | 100 · 100 · 100 · 69 | 100 · 100 · 100 · 66 | is-crawlable |

O SEO só perde o `is-crawlable` (noindex do preview). Em produção indexável, o esperado é 100.
