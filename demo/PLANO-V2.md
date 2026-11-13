# Plano v2 — Demo da Torno dentro do site (tornostudio.com)

Pedido do Henrique (2026-11-13, tarde): sair do Artifact. A demo vira uma URL real do site, privada,
não indexada, gerada sob demanda por ele num `/admin`, com senha por link; IA de verdade que parte
da base do setor e **aprende com o que o usuário registra** (o registro aparece no cérebro e nas
respostas); respostas formatadas (Markdown renderizado); visual e UX refeitos, menos carregados.

Decisão em aberto resolvida por padrão: **senha por link** (cada link gerado tem a sua; o admin pode
repetir a mesma senha em vários links se quiser).

## 1. Como fica no site

| URL | O que é |
|---|---|
| `/demo/<id>` | a demo de um prospect. `<id>` = 12 caracteres aleatórios base32 minúsculos (ex.: `k7q2m9xv4hta`). Abre uma tela de senha; depois, a demo. |
| `/admin` | painel do Henrique: entra com a senha de admin (variável `DEMO_ADMIN_PASSWORD` na Netlify). Lista, cria, edita, desativa e apaga demos; mostra acessos e o que cada prospect registrou. |
| `/api/demo/...`, `/api/admin/...` | uma Netlify Function (Node) |

- Arquivos estáticos do app: `demo/web/**` copiados no build para `dist/demo-app/` (integração Astro
  `demo-app`, que roda **antes** do `sectorIsolation`). Redirects 200: `/demo/*` e `/admin` → `/demo-app/index.html`.
- Fonte Inter auto-hospedada: `node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2`
  copiada para `dist/demo-app/inter.woff2` (a CSP do site só permite `font-src 'self'`; nada de Google Fonts).
- Não indexação: header `X-Robots-Tag: noindex, nofollow, noarchive` em `/demo/*`, `/demo-app/*`,
  `/admin*`, `/api/*`; `<meta name="robots" content="noindex, nofollow">` no HTML; `Referrer-Policy: no-referrer`
  na demo; fora do sitemap; nenhum link do site aponta para elas; sem `Disallow` no robots.txt (revelaria o caminho).
  O conteúdo só sai da API depois da senha.
- CSP do site continua valendo (`default-src 'self'`): o app só fala com a própria origem; a Anthropic é
  chamada pelo servidor.

## 2. Pastas

```
demo/
  web/            app do navegador (HTML completo com doctype, CSS, módulos ES; sem build)
  data/           pacotes fictícios dos 8 setores (base de conhecimento pré-setada) + sectors.json
  server/         lógica do servidor, Node ESM, sem framework
    router.mjs    handle(request, env) → Response   (usado pela Netlify Function e pelo serve.mjs)
    auth.mjs      scrypt de senha, token HMAC, cookies
    store.mjs     interface Store {get,set,delete,list(prefix)}; BlobsStore (Netlify Blobs) e FileStore (dev)
    demos.mjs     CRUD de demos
    learning.mjs  registros do usuário (o "aprendizado")
    ai.mjs        conversa com a Anthropic (uma rodada por requisição) + ferramentas
    tools.mjs     ferramentas sobre o pacote do setor + aprendizado (filtradas por módulo ligado)
    local.mjs     motor determinístico (fallback sem chave de API) — reaproveita o de web/src/ai/local-engine.js
  scripts/serve.mjs   dev local: serve web/ em /demo-app/, reescreve /demo/* e /admin, e manda /api/* ao router com FileStore
  scripts/validate.mjs
netlify/functions/demo-api.mjs   export default (req, context) => handle(req, ...); config.path ["/api/demo/*", "/api/admin/*"]
```

## 3. Variáveis de ambiente (Netlify → Site configuration → Environment variables)

| Nome | Para quê | Obrigatória |
|---|---|---|
| `DEMO_ADMIN_PASSWORD` | senha do /admin | sim (sem ela o /admin fica fechado) |
| `DEMO_SESSION_SECRET` | assina os cookies (32+ caracteres aleatórios) | sim |
| `ANTHROPIC_API_KEY` | IA real | não: sem ela a demo usa o roteiro local e o admin avisa |
| `DEMO_MODEL` | modelo (padrão `claude-sonnet-5-5`) | não |
| `DEMO_DAILY_MESSAGES` | teto de mensagens por demo por dia (padrão 200) | não |

## 4. Dados no Netlify Blobs (store `torno-demos`)

- `demo/<id>` → `{ id, nome, setor, empresa_nome, modulos:{id:bool}, senha:{salt,hash}, ativo, criado_em, expira_em|null, nota, acessos, ultimo_acesso }`
- `aprendizado/<id>/<ts>-<rand>` → `{ id, demo, tipo: "saber"|"ocorrencia"|"documento"|"nota", titulo, texto, area, maquina|null, autor, origem: "formulario"|"conversa", criado_em }`
- `uso/<id>/<AAAA-MM-DD>` → `{ mensagens }` (teto diário)

Aprendizado nunca sai da demo dele. Apagar a demo apaga o aprendizado.

## 5. API (JSON; erros `{erro: "mensagem em português"}` com status 4xx/5xx)

Demo (cookie `td_<id>`, HttpOnly, Secure, SameSite=Lax, Path=/, 12 h):
- `POST /api/demo/<id>/entrar` `{senha}` → 200 `{ok:true}` + cookie | 401 | 404 (id inexistente ou inativo: mesma resposta genérica "Link ou senha inválidos"). Atraso fixo de ~400 ms em falha.
- `GET /api/demo/<id>/estado` → `{ demo:{id,nome,setor,empresa_nome,modulos}, setor:<pacote JSON do setor>, aprendizado:[...], ia:{disponivel:bool, modelo} }` | 401
- `POST /api/demo/<id>/aprendizado` `{tipo,titulo,texto,area,maquina?,autor?}` → `{item}` (valida tamanho: título ≤120, texto ≤2000; até 200 itens por demo)
- `DELETE /api/demo/<id>/aprendizado/<itemId>` → `{ok}`
- `POST /api/demo/<id>/conversa` `{mensagens:[{role,content}], modulo, perfil?}` → **stream SSE** (`text/event-stream`):
  `event: texto` `{delta}` · `event: ferramenta` `{nome, rotulo}` (ex.: "Consultando ordens de produção") ·
  `event: aprendizado` `{item}` (quando a IA registrou algo pedido pelo usuário) · `event: fim` `{texto, fontes:[ref], continuar:bool, estado?}` · `event: erro` `{erro}`.
  O servidor faz **no máximo uma chamada ao modelo por requisição**. Se o modelo pedir ferramentas, o servidor
  executa as ferramentas, devolve `fim` com `continuar:true` e um `estado` opaco (as mensagens no formato da API
  com tool_use/tool_result); o cliente chama de novo com `{estado}` até `continuar:false`. Isso mantém cada
  requisição curta (limite de tempo das Functions). Máx. 5 rodadas.
  Sem `ANTHROPIC_API_KEY`: responde com o motor local no mesmo formato (um `texto` + `fim`).
Admin (cookie `ta`, 8 h):
- `POST /api/admin/entrar` `{senha}` · `POST /api/admin/sair` · `GET /api/admin/sessao` → `{ok, ia:{disponivel,modelo}}`
- `GET /api/admin/demos` → `[{...demo sem senha, aprendizado_qtd, url}]`
- `POST /api/admin/demos` `{nome, setor, empresa_nome?, modulos?, senha?, expira_em?, nota?}` → `{demo, senha}` (gera senha legível se não vier, ex.: `torno-4821-maré`; a senha só é mostrada nesta resposta)
- `PATCH /api/admin/demos/<id>` `{nome?, setor?, empresa_nome?, modulos?, ativo?, expira_em?, nota?, nova_senha?: string|true}` → `{demo, senha?}`
- `DELETE /api/admin/demos/<id>` → `{ok}` (apaga aprendizado e uso)
- `GET /api/admin/demos/<id>/aprendizado` → `[...]` · `DELETE` do mesmo caminho → zera o aprendizado (para reaproveitar o link)

## 6. IA

- Mensagem de sistema: assistente da empresa fictícia X do setor Y; português; curto; Markdown simples
  (negrito, listas, tabelas pequenas); cita cada fato com `[[tipo:id]]`; usa só as ferramentas; não inventa;
  módulos ativos; perfil; hoje 2026-11-13; o que o usuário registrou nesta demo vale como conhecimento da
  empresa e deve ser citado como `[[aprendizado:<id>]]`.
- Ferramentas: as de `web/src/ai/tools.js` portadas ao servidor + `buscar_aprendizado(termo)` +
  `registrar_aprendizado({tipo,titulo,texto,area,maquina?})` — só quando o usuário pede explicitamente para
  registrar/anotar/lembrar; o item salvo volta no evento `aprendizado`.
- O que foi registrado entra também num resumo curto no sistema (até 20 itens mais recentes), para a IA
  "lembrar" sem precisar buscar.
- Cache de prompt no bloco fixo (sistema + definições de ferramentas).

## 7. UX (detalhado em `demo/UX.md`, escrito pelo designer)

Menos coisas de uma vez; o cérebro no centro; um caminho claro para o "uau": perguntar → resposta com
fonte → ensinar algo → perguntar de novo e ver a resposta usando o que foi ensinado.

## 8. Regras para o front (demo/web)

- `index.html` agora é um documento completo (`<!doctype html>`, `<meta name="robots" content="noindex, nofollow">`)
  e é servido nas URLs `/demo/<id>` e `/admin`: **todo caminho de asset é absoluto** (`/demo-app/styles.css`,
  `/demo-app/src/app.js`, `/demo-app/inter.woff2`); imports ES internos continuam relativos entre módulos.
- O modo vem de `location.pathname`: `/admin` → painel; `/demo/<id>` → senha e depois a demo. Rotas internas
  da demo no hash (`#producao`), como na v1.
- Sem Google Fonts nem CDN (CSP `default-src 'self'`): fonte `@font-face` de `/demo-app/inter.woff2`.
- Nada de `window.claude`: config e dados vêm de `GET /api/demo/<id>/estado`; o admin do Artifact sai.
