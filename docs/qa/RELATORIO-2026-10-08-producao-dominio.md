# Relatório de QA: produção com domínio e indexação (`https://tornostudio.com`)

> Afinador, 2026-10-08. HEAD `a3e778a`. Indexação ligada.

## Veredito

**Aprovado.** Lighthouse 100 nas 4 categorias, **SEO incluído**, mobile e desktop, nas 4 URLs; suíte no ar 273/273.

## Suíte no ar

```
QA_INDEXING=true QA_BRAND='Torno Studio' PUBLIC_CONTACT_EMAIL=… PUBLIC_LOOPT_AUTHORIZED=true PUBLIC_LEGAL_*=… \
QA_BOOKING_URL=<Calendly> QA_BASE_URL=https://tornostudio.com npx playwright test -c tests/qa/playwright.preview.config.ts

4 skipped
273 passed
```

Inclui S3 indexável (sem meta robots), S1/S2/S5 com canonical, hreflang e og no domínio, S7 sitemap, S8 robots, C1–C32 com o Q8, marca Torno Studio, K1–K10, axe, R1/R5.

## HTTP

| Caso | Resultado |
|---|---|
| 4 páginas | 200, **sem `x-robots-tag`** |
| 404 | 404 (meta noindex mantida, coberta pelo S6) |
| `/privacidade` | 301 → `/privacidade/` |
| `http://tornostudio.com/` | 301 → `https://tornostudio.com/` |
| `https://www.tornostudio.com/` | 301 → `https://tornostudio.com/` |
| `http://www.tornostudio.com/` | 301 → `https://www.tornostudio.com/` → 301 → apex (2 saltos; nota baixa) |
| `https://tornostudio.netlify.app/` e `/en/privacy/` | 301 → `https://tornostudio.com/…` com o caminho preservado |
| HSTS no domínio | `max-age=63072000; includeSubDomains; preload` (valor do toml; nota N2 fechada). O 301 da barra final sai com o HSTS padrão da Netlify (`max-age=31536000`), sem impacto |
| Headers de segurança | os 6 demais presentes |
| HUD da Netlify | 0 |
| robots.txt | `Sitemap: https://tornostudio.com/sitemap-index.xml` |

## Lighthouse (3 runs, mediana)

| Formato | `/` | `/en/` | `/privacidade/` | `/en/privacy/` |
|---|---|---|---|---|
| mobile | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| desktop | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |

Nenhum audit com falha.
