# SPEC: contador de visitas sem cookie na /diagnostico/ (B3, aprovada pelo fundador em 2026-10-09)

- **O quê:** uma Netlify Edge Function `count-diagnostico` com `path: "/diagnostico/"`.
  - Ela responde com `await context.next()` normalmente e, em segundo plano (`context.waitUntil`), soma +1 ao total do dia (UTC−3, chave `AAAA-MM-DD`) no Netlify Blobs: store `visitas-diagnostico`, valor JSON `{ "n": <total> }`.
  - Escrita condicional (ETag `onlyIfMatch`, com retentativa) para não perder incremento concorrente.
- **Conta só:**
  - `GET` (não `HEAD`), em contexto **production**;
  - `Accept` com `text/html`;
  - sem `Sec-Purpose`/`Purpose: prefetch`;
  - User-Agent que não seja robô (lista de padrões: bot, crawler, spider, preview, Lighthouse, HeadlessChrome, AdsBot, etc.).
- **Não grava:** IP, UA, referer, query string nem qualquer outra coisa. IP e UA ficam só em memória durante a requisição. Sem cookie, sem header novo na resposta.
- **Falha não derruba:** try/catch em volta da gravação; erro só no log da função.
- **TTFB:** a gravação não bloqueia a resposta. Meta: mediana do TTFB na /diagnostico/ ≤ +15 ms em relação à home (mesma rede, 20 amostras).
- **Leitura:** script `npm run visitas` (`scripts/visitas.mjs`) via Netlify CLI logada (`netlify blobs:list` / `blobs:get` do store), imprimindo a tabela por dia e o total. Sem endpoint público.
- **Política (PT/EN, texto do Alicerce, research/09 §7):** "Conto as visitas à página de diagnóstico de forma agregada (um número por dia), sem cookies e sem guardar IP ou navegador (legítimo interesse, art. 7º, IX)."
