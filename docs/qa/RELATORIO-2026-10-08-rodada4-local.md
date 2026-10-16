# Relatório de QA: rodada 4 (local, configuração de produção com indexação)

> Afinador, 2026-10-08. HEAD `5bc92d9`. Regras novas: base/03 item 8 (Q8, D1) e PLANO-DEV §5.7.

## Veredito

**Ok para produção.**

## 1. Runner padrão (`bash tests/qa/run-qa.sh`, HEAD `a1e89c6`)

17 × `exit=0`. Playwright 267 passed; marcas Torno Studio / Ox / [Marca] / Northbridge 85/85 cada; `seo.spec` indexável 24 passed; Lighthouse mobile e desktop 100 · 100 · 100 · 100 nas 4 URLs; linkinator 21 links, 0 quebrado.

## 2. Configuração de produção (HEAD `5bc92d9`)

```
PUBLIC_SITE_BRAND='Torno Studio' PUBLIC_SITE_URL='https://tornostudio.com' PUBLIC_ALLOW_INDEXING=true
PUBLIC_LOOPT_AUTHORIZED=true PUBLIC_CONTACT_EMAIL=… PUBLIC_LEGAL_*=… PUBLIC_BOOKING_URL=<Calendly>
QA_BRAND='Torno Studio' QA_INDEXING=true QA_CANONICAL_ORIGIN=https://tornostudio.com

npm run check                    -> 0 errors
CONTEXT=production astro build   -> Complete! (env-guard satisfeito)
npx playwright test              -> 306 passed, 2 skipped
```

Executados e verdes, entre outros: C1–C7 (5 páginas; inclui C30 sem FinPlan e −21% proibido), C9b "publicados pela Loopt" / "Results published by Loopt", C9c Bom.Capital como relato, C11 Ascende, C23 neptune.ai citada sem link, **C26 com o Q8** (texto + href/src + HTML bruto), C28, C29, C31 Production-Ready sem ferramenta, C32 sem link da Bom.Capital, S1/S2/S3/S7/S8, marca M1–M3.

## 3. Artefatos do build de produção

| Página | meta robots | canonical | hreflang |
|---|---|---|---|
| `/` | nenhuma (= index) | `https://tornostudio.com/` | só `https://tornostudio.com` |
| `/en/` | nenhuma (= index) | `https://tornostudio.com/en/` | idem |
| `/privacidade/` | nenhuma (= index) | `https://tornostudio.com/privacidade/` | idem |
| `/en/privacy/` | nenhuma (= index) | `https://tornostudio.com/en/privacy/` | idem |
| 404 | `noindex, nofollow` | (nenhum) | (nenhum) |

- `robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://tornostudio.com/sitemap-index.xml`.
- Sitemap: todas as `<loc>`/alternates em `https://tornostudio.com` (17 ocorrências; os outros hosts são só namespaces XML).
- Varredura bruta do HTML (sem o href da MundoLogística): 0 ocorrências de Ecoporto/Eco Porto, Transbrasa, Marimex, Maersk, Bandeirantes, Aliança, Bissani, Gutierres, FinPlan, −21%.
- neptune.ai: texto "neptune.ai o artigo técnico \"How to Build ML …\"" presente; 0 `href` com neptune.
- `netlify.toml`: `https://tornostudio.netlify.app/*` → `https://tornostudio.com/:splat`, 301, `force = true`. O `www` → apex não está no toml (a Netlify faz pelo domínio primário): validar no ar.

## 4. A validar em `https://tornostudio.com` após o deploy

canonical/hreflang/sitemap/robots no domínio, ausência de meta robots, 301 de `tornostudio.netlify.app` e de `www.tornostudio.com`, HSTS do domínio próprio, Lighthouse ≥ 95 nas 4 categorias **incluindo SEO**.
