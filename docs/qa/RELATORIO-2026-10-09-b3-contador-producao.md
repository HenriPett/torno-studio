# Relatório de QA: B3, contador da `/diagnostico/` em PRODUÇÃO

> Afinador, 2026-10-09. `https://tornostudio.com/diagnostico/`, HEAD e94d3dc. Blob `visitas-diagnostico`, chave `2026-10-09`.

## Veredito

**Reprovado num critério: B9 (HEAD conta).** O resto está ok. O blob terminou em **`{"n":45}`, e as 45 visitas são do QA** (0 visitas reais confirmadas): descontar 45 ou zerar a chave do dia.

## B9. Requisição HEAD incrementa o contador. Média, → Compasso (Edge Function)

- **Passos:** ler o blob; `curl -I -A "<UA de Chrome>" -H "accept: text/html" https://tornostudio.com/diagnostico/`; esperar 6 s; ler o blob.
- **Esperado (SPEC):** HEAD não conta.
- **Obtido:** +1 a cada HEAD, **5/5** (4→5, 5→6, 6→7, 7→8; e com `curl -X HEAD`, 8→9). Controle de 20 s sem requisição: 5→5 (sem tráfego externo).
- **Causa provável:** a Netlify entrega a requisição HEAD à Edge Function como `GET` (ou o `request.method` não reflete o HEAD original), e o `request.method !== 'GET'` não barra.
- **Impacto:** monitores de uptime, verificadores de link e prévias que usam HEAD inflam o número.

## Resultados

| Caso | Resultado |
|---|---|
| B3-a | ✓ sem `Set-Cookie`, sem header novo (fora `transfer-encoding`, transporte), 0 cookies |
| B3-b | ✓ blob = exatamente `{"n": …}` (sem IP, UA, URL); +3 nas 3 visitas de browser real (0 → 3) |
| B3-c | ✗ **B9**. Não contaram (cada um isolado, blob lido antes e depois): `Sec-Purpose: prefetch`, `Purpose: prefetch`, Googlebot, AdsBot, HeadlessChrome, Chrome-Lighthouse, facebookexternalhit, Slackbot, `Accept: application/json`, outras páginas. **HEAD contou** |
| B3-d | ✓ fria descartada: home 378,8 ms / `/diagnostico/` 255,4 ms. 20 amostras quentes intercaladas: mediana home **155,6 ms**, `/diagnostico/` **167,0 ms**, **Δ 11,3 ms** (≤ 15) |
| B3-f | ✓ linha da política PT/EN |
| Smoke (suíte no ar, sem B3) | 348 passed, 1 flaky (CS-d na landing: popup do Calendly lento, passou no retry), 9 skipped |

## Contagem do dia: tudo do QA

| Origem | Visitas |
|---|---|
| B3-b (3 browsers com UA de Chrome) | 3 |
| B3-c (o HEAD do B9) | 1 |
| Isolamento do B9 (curl HEAD × 5) | 5 |
| **Smoke**: o UA do `Desktop Chrome` do Playwright é de Chrome normal, então cada `page.goto('/diagnostico/')` com `Accept: text/html` contou | 36 |
| **Total** | **45** = `{"n":45}` |

**Correção no QA (erro meu):** eu tinha afirmado que a suíte do Playwright não contaria, por "usar HeadlessChrome". O perfil `Desktop Chrome` usa UA normal. Agora `tests/qa/playwright.preview.config.ts` acrescenta `QA-Afinador-bot` ao UA. Revalidado: a suíte da `/diagnostico/` (13 testes) deixou o blob em 45 → 45. Os testes que precisam contar (B3-b) definem o próprio UA de browser real.

## B9: resolvido em produção (7df083b, publicado no 368b4d6)

Agora só conta com `Sec-Fetch-Dest: document` e `Sec-Fetch-Mode: navigate`, além das regras anteriores. Revalidação em `https://tornostudio.com/diagnostico/`, com o blob lido antes e depois de cada passo:

| Passo | Blob |
|---|---|
| início | 45 |
| `curl -I` (UA Chrome, Accept html) × 3 | 45 → 45 → 45 → 45 ✓ |
| `curl` GET sem Sec-Fetch | 45 → 45 ✓ |
| B3-c completo (HEAD, GET sem Sec-Fetch, `Sec-Fetch-Dest: iframe`, `Sec-Fetch-Mode: no-cors`, prefetch × 2, 6 robôs, Accept json, 4 outras páginas) | não contou ✓ |
| B3-b (3 navegações reais do Chromium, que manda os Sec-Fetch) | +3 ✓; blob = só `{n}` |
| **fim** | **`{"n":48}`** |

**Contagem do dia 2026-10-09: 48, todas do QA** (45 da rodada anterior + 3 do B3-b agora). Visitas reais confirmadas: 0.

Limites registrados (aceitos):
- Um HEAD **forjado** com `Sec-Fetch-Dest: document` e `Sec-Fetch-Mode: navigate` ainda contaria, porque a borda o converte em GET. Navegador real não faz isso.
- Navegadores sem Sec-Fetch (Safari < 16.4, Firefox < 90) não contam (subcontagem aceita pelo Compasso).
