# Servidor da demo (API)

Node ESM puro, sem framework e sem dependências além de `@netlify/blobs`. Contrato completo em
`demo/PLANO-V2.md` §3–§6.

| Arquivo | O que faz |
|---|---|
| `router.mjs` | `handle(request, {env, store, fetch?}) → Response`. Rotas `/api/demo/*` e `/api/admin/*`, limite de corpo (64 KB; conversa 200 KB), CSRF, erros `{erro}` |
| `auth.mjs` | scrypt (salt 16 bytes, `timingSafeEqual`), tokens HMAC-SHA256 `base64url(payload).base64url(sig)` com `exp`, cookies, checagem de origem |
| `store.mjs` | `FileStore` (pasta de JSON, dev/testes) e `BlobsStore` (Netlify Blobs, store `torno-demos`, consistência forte) |
| `demos.mjs` | CRUD das demos, id de 12 caracteres base32, senha legível (`torno-4821-mare`), acessos |
| `learning.mjs` | o aprendizado: validação (título ≤120, texto ≤2000), sanitização (texto puro), limite de 200 por demo |
| `catalogo.mjs` | setores (pacotes `demo/data/*.json` por import estático), módulos e dependências, `criaCtx` |
| `motor.mjs` | importa o motor local único (`demo/web/src/ai/local-engine.js`, mantido pelo front) e acrescenta a busca no aprendizado |
| `tools.mjs` | ferramentas da IA (porte do v1 + `buscar_aprendizado`/`registrar_aprendizado`) |
| `local.mjs` | motor local (sem chave): cita o aprendizado primeiro; "anota que…" registra |
| `ai.mjs` | conversa SSE; uma chamada à API da Anthropic por requisição (fetch direto, sem SDK) |
| `test.mjs` | testes: `node demo/server/test.mjs` |

A Netlify Function é `netlify/functions/demo-api.mjs` (usa `BlobsStore`).

## Variáveis (Netlify → Site configuration → Environment variables)

| Nome | Para quê |
|---|---|
| `DEMO_ADMIN_PASSWORD` | senha do `/admin` (sem ela `/api/admin/*` responde 503) |
| `DEMO_SESSION_SECRET` | assina cookies e o `estado` da conversa (32+ caracteres aleatórios: `openssl rand -base64 48`) |
| `ANTHROPIC_API_KEY` | IA real; sem ela a conversa usa o motor local |
| `DEMO_MODEL` | padrão `claude-sonnet-5-5` |
| `DEMO_DAILY_MESSAGES` | perguntas à IA por demo por dia (padrão 200; depois responde pelo motor local com aviso) |
| `DEMO_EFFORT` | opcional, padrão `low` |
| `DEMO_FALLBACKS` | `0` desliga o fallback de recusa do servidor da Anthropic (`fallbacks: "default"`) |

Trocar `DEMO_ADMIN_PASSWORD` derruba as sessões de admin; trocar `DEMO_SESSION_SECRET` derruba todas.

## Conversa (SSE)

`POST /api/demo/<id>/conversa` com `{mensagens:[{role,content}], modulo?, perfil?, autor?, motor?: "local"}`
ou `{estado}` para continuar. Eventos (`event: <nome>\ndata: <json>\n\n`):

- `texto {delta}` — pedaço do texto (com os marcadores `[[tipo:id]]`)
- `ferramenta {nome, rotulo}` — ex.: "Consultando ordens de produção"
- `aprendizado {item}` — a IA (ou o motor local) registrou algo pedido pelo usuário
- `fim {texto, fontes, continuar, estado?, rodada, modo: "ia"|"local", aviso?}` — `texto` é o acumulado do turno
- `erro {erro, recuperavel, status?}` — o cliente pode repetir com `motor: "local"`

Com `continuar:true`, o cliente reenvia `{estado}` (opaco, assinado, vale 15 min) até `continuar:false`
(máx. 5 rodadas). O texto mantém `[[ref]]`; o front troca por ¹ ² ligados aos cartões de `fontes`.

## Testar

```sh
node demo/server/test.mjs                 # testes (FileStore temporário; IA com fetch falso)
node demo/scripts/serve.mjs 4400          # dev: /admin, /demo/<id>, /api/* (dados em demo/.dev-store/)
```

Em dev, sem `DEMO_ADMIN_PASSWORD`/`DEMO_SESSION_SECRET`, o `serve.mjs` usa `admin-dev` e um segredo fixo.
Com `ANTHROPIC_API_KEY` e `TESTE_IA_REAL=1`, `test.mjs` faz também uma conversa real curta.
