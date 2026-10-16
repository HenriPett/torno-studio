# Relatório de QA: deploy 2A (Medição, popup do Calendly, UTM, conversão), local isolado

> Afinador, 2026-10-08. HEAD `54ce588` buildado num worktree isolado com `PUBLIC_GADS_ID`, `PUBLIC_GADS_CONV_LABEL=EOw5CK7RiZYdEMin0r0D` e `PUBLIC_BOOKING_URL` (Calendly). Rede real (gtag, Calendly). Ainda não é o preview.

## Resultado

```
QA_OUTDIR=… QA_ONLINE=1 QA_COOKIE_REPORT=1 npx playwright test -c tests/qa/playwright.local.config.ts
307 passed, 3 failed, 50 skipped
```

- **K5 × 2:** erro da execução, não do site. O build tinha `PUBLIC_BOOKING_URL`, mas rodei sem `QA_BOOKING_URL`, e o teste procurou o fallback `#agendar`.
- **CS-f teclado `/en/` × 1:** intermitente sob carga paralela. Repetido isolado: `--repeat-each=5` → 10/10 passed.
- **Deploy 2A: verde (11/11).**
  - **CS-c2:** popup com as 5 UTMs da chegada e sem `gclid`.
  - **CS-d:** só Medição, popup sim, nenhum Google na nossa página.
  - **CS-j:** a mensagem `event_scheduled` sai de dentro do iframe real do Calendly. Gera **1** conversão `{send_to:'AW-934581192/EOw5CK7RiZYdEMin0r0D', value:1, currency:'BRL'}`. A mesma URI não repete, e nada do convidado vai ao dataLayer.
  - **CS-k:** só Medição, sem conversão e sem Google.
  - **CS-l:** origens falsas ignoradas.
  - **CS-n:** sem escolha, link de saída.
- **CS-d1** atualizado para as 3 categorias. `QA_DEPLOY2` passa a ser o padrão; `QA_DEPLOY2=0` volta ao deploy 1.

## Cookies reais do popup do Calendly (sessão limpa, só Medição)

| Nome | Domínio | Duração medida | Fonte |
|---|---|---|---|
| `__cf_bm` | `.calendly.com` | 30 min | Cloudflare: "expires after 30 minutes of continuous inactivity" (https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/) |
| `_cfuvid` | `.calendly.com` | sessão | Cloudflare (mesma página): sem prazo publicado |
| `OptanonConsent` | `.calendly.com` | 1 ano | CMP OneTrust do próprio Calendly. O Calendly não publica tabela de cookies (`calendly.com/privacy` só dá durações genéricas) |
| `m` | `m.stripe.com` | ~1,1 ano (≈ 400 dias, teto do Chrome) | Stripe, antifraude, carregado pelo iframe do Calendly |

Armazenamento nosso com Medição: `sessionStorage['ts-utm']` (sessão).

Com Aceitar tudo + popup, somam-se o `_gcl_au` (1ª parte, 90 dias) e o `_gcl_ls` (localStorage) do deploy 1.

## Achado para a política (Alicerce/Verso)

O iframe do Calendly, aberto só com Medição, faz requisições a **20 hosts próprios**: `accounts.google.com`, `api.sprig.com`, `assets.calendly.com`, `calendly.com`, `cdn.cookielaw.org`, `cdn.segment.io`, `cdn.sprig.com`, `connect.facebook.net`, `dfp.calendly.com`, `fonts.gstatic.com`, `geolocation.onetrust.com`, `js.appboycdn.com`, `js.stripe.com`, `m.stripe.com`, `m.stripe.network`, `notifier-configs.airbrake.io`, `www.google-analytics.com`, `www.googletagmanager.com`, `www.gstatic.com`, `www.recaptcha.net`. Isso inclui analytics e marketing do próprio Calendly (GA, Facebook, Segment, Braze, Sprig), sob o CMP dele (OneTrust). Na nossa página, nenhuma requisição ao Google com só Medição. A política precisa dizer que o popup é do Calendly e segue a política e os cookies dele.
