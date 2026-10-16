# Relatório de QA: produção (`https://tornostudio.netlify.app`)

> Afinador, 2026-10-08. HEAD `b4ff0c1`. Envs de produção: Torno, Calendly, controlador, e-mail, Loopt autorizada, noindex (intencional até o domínio).

## Veredito final

**Aprovado.** Produção verde depois da correção do B5: suíte no ar 255/255, Lighthouse 100 · 100 · 100 com SEO perdendo só o `is-crawlable` (noindex intencional).

## B5. Selo "Powered by Netlify" injetado só em produção. Alta. **Resolvido** (Batuta, configuração da Netlify)

- **Achado (1ª passada):** o HTML de produção trazia `<script async src="/.netlify/scripts/hud?variant=public" data-nf-variant="public" …>`, ausente do `dist/` e do deploy preview. O script criava um `<iframe title="Powered by Netlify">` 202×64 px, `position: fixed`, no canto inferior direito.
  - Em 360×640 o selo ficava sobre a microprova do hero (iframe em x=158, y=576; embaixo dele: "Preços publicados · Código na sua conta desde o dia 1 · Garantia de 60 dias"), truncando o texto.
  - Entrava na ordem do Tab sem anel de foco (WCAG 2.4.7). Suíte no ar: **10 failed / 245 passed**, sendo K1 × 8 (`elementos sem anel de foco: ["iframe \"\""]`) e K6 × 2.
  - O Lighthouse não pegava (iframe same-origin com `title`): A11y 100.
- **Correção:** a Batuta desligou o selo pela API da Netlify (`built_with_badge_enabled=false`).
- **Revalidação:** `curl` sem cache nas 4 URLs → 0 ocorrência de `/.netlify/scripts/hud`; 0 `iframe` em 360 e 1280; K1 e K6 verdes (10/10); visual em 360×640 sem sobreposição (`docs/qa/evidencias/prod-sem-selo-360.png`, `…-1280.png`).
- **Regressão:** o C28 agora também exige 0 `script[src*="/.netlify/"]`, 0 `vercel.live` e 0 `iframe`.

## Suíte no ar (depois do B5)

```
QA_BRAND=Torno PUBLIC_CONTACT_EMAIL=henriquepett@gmail.com PUBLIC_LOOPT_AUTHORIZED=true \
PUBLIC_LEGAL_NAME="Henrique Nass Pett" PUBLIC_LEGAL_ID="43.609.432/0001-07" \
QA_BOOKING_URL=https://calendly.com/henriquepett/45min QA_BASE_URL=https://tornostudio.netlify.app \
npx playwright test -c tests/qa/playwright.preview.config.ts

4 skipped
255 passed (26.3s)
```

Inclui: C1–C28 (Loopt só nos cases, cliente-terminal ausente, nada de Vercel/neptune, 0 requisição a terceiros, 0 cookie), marca Torno M1–M3, K1–K10, K5 com o Calendly, axe A1, R1 de 320 a 1920 sem scroll horizontal, preços §5.3, **S1/S2/S5 com canonical, hreflang e og:image no host de produção**, sitemap e robots. Skips: galeria R4 e as varreduras do `dist/` local.

## HTTP

- `/`, `/en/`, `/privacidade/`, `/en/privacy/` = 200; `/qa-nao-existe/` = 404; `/privacidade` → 301 `/privacidade/`.
- robots: `Sitemap: https://tornostudio.netlify.app/sitemap-index.xml`.
- HSTS servido: `max-age=31536000; includeSubDomains; preload` (a Netlify impõe esse valor em `*.netlify.app`; reconferir quando houver domínio próprio).

## Lighthouse em produção (3 runs, mediana; medido antes da remoção do selo, que é same-origin e não afetou as notas)

| Formato | URL | Perf | A11y | BP | SEO | Falhas |
|---|---|---|---|---|---|---|
| mobile | `/`, `/en/` | 100 | 100 | 100 | 69 | is-crawlable |
| mobile | `/privacidade/`, `/en/privacy/` | 100 | 100 | 100 | 66 | is-crawlable |
| desktop | `/`, `/en/` | 100 | 100 | 100 | 69 | is-crawlable |
| desktop | `/privacidade/`, `/en/privacy/` | 100 | 100 | 100 | 66 | is-crawlable |

## Pendências fora do gate

- Domínio próprio (`tornostudio.com`/`.com.br`): liberar indexação (`PUBLIC_ALLOW_INDEXING=true`, `PUBLIC_SITE_URL`) e repetir S1–S11, L1/L2 (esperado SEO 100) e o HSTS.
