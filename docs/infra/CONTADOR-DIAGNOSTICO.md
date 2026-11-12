# SPEC: contador de visitas sem cookie na /diagnostico/ (B3, aprovada pelo fundador em 2026-10-09)

- **O quê:** uma Netlify Edge Function `count-diagnostico` com `path: ["/diagnostico/", "/para/*"]`.
  - Ela responde com `await context.next()` normalmente e, se a página respondeu **200**, soma +1 em segundo plano (`context.waitUntil`) ao total do dia (UTC−3) no Netlify Blobs, valor JSON `{ "n": <total> }`:
    - `/diagnostico/` → store `visitas-diagnostico`, chave `AAAA-MM-DD`;
    - `/para/<slug>/` (landings de setor, estratégia 2026-11 §7.3) → store `visitas-setores`, chave `AAAA-MM-DD/<slug>`. Só conta se o caminho for exatamente `/para/<slug>/`, o slug casar `^[a-z-]+$` **e** estiver na lista fixa `SECTOR_SLUGS` da função (as 8 landings). Slug desconhecido, `/para/` (404), `/para/<slug>` sem barra (301) ou qualquer resposta diferente de 200 não grava nada.
  - Escrita condicional (ETag `onlyIfMatch`, com retentativa) para não perder incremento concorrente.
- **Conta só:**
  - `GET` (não `HEAD`), em contexto **production**;
  - `Accept` com `text/html`;
  - sem `Sec-Purpose`/`Purpose: prefetch`;
  - User-Agent que não seja robô (lista de padrões: bot, crawler, spider, preview, Lighthouse, HeadlessChrome, AdsBot, etc.).
- **Não grava:** IP, UA, referer, query string nem qualquer outra coisa. IP e UA ficam só em memória durante a requisição. Sem cookie, sem header novo na resposta.
- **Falha não derruba:** try/catch em volta da gravação; erro só no log da função.
- **TTFB:** a gravação não bloqueia a resposta. Meta: mediana do TTFB na /diagnostico/ ≤ +15 ms em relação à home (mesma rede, 20 amostras).
- **Leitura:** script `npm run visitas` (`scripts/visitas.mjs`) via Netlify CLI logada (`netlify blobs:list` / `blobs:get` dos dois stores), imprimindo a tabela por dia da `/diagnostico/` e a tabela dia × setor das landings, com totais. Sem endpoint público.
- **Isolamento:** a lista de slugs fica só nesta função (que não é pública nem renderizada) e no script de leitura; nada disso vai para o `dist/`. Ao criar ou remover uma landing, atualize `SECTOR_SLUGS`.
- **Política (PT/EN, texto do Alicerce, research/09 §7; atualizado em 2026-11 para incluir as landings de setor sem citar o caminho delas):** "Contamos as visitas à página de diagnóstico e às páginas de apresentação por setor de forma agregada (um número por página e por dia), sem cookies e sem guardar IP ou navegador (legítimo interesse, art. 7º, IX)." EN: "We count visits to the diagnostic page and to the sector presentation pages in aggregate (one number per page per day), without cookies and without storing IP address or browser (legitimate interests, LGPD Art. 7, IX; GDPR Art. 6(1)(f))." O texto mora em `src/content/pt-BR.ts`/`en.ts`, na seção "Que dados são tratados" / "What data is processed" da privacidade.
