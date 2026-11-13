# Servidor da demo (API)

Node ESM puro, sem framework e sem dependências além de `@netlify/blobs`. Contrato completo em
`demo/PLANO-V2.md` §3–§6.

| Arquivo | O que faz |
|---|---|
| `router.mjs` | `handle(request, {env, store, fetch?}) → Response`. Rotas `/api/demo/*` e `/api/admin/*`, limite de corpo (64 KB; conversa 200 KB), CSRF, erros `{erro}` |
| `auth.mjs` | scrypt (salt 16 bytes, `timingSafeEqual`), tokens HMAC-SHA256 `base64url(payload).base64url(sig)` com `exp`, cookies, checagem de origem |
| `store.mjs` | `FileStore` (pasta de JSON, dev/testes) e `BlobsStore` (Netlify Blobs, store `torno-demos`, consistência forte) |
| `demos.mjs` | CRUD das demos, id de 12 caracteres base32, senha legível (`torno-4821-mare`), acessos (ver abaixo) |
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

## Entrar na demo

`POST /api/demo/<id>/entrar` com `{senha}`:

| Resposta | Quando |
|---|---|
| `200 {ok:true}` + cookie `td_<id>` | senha certa e demo disponível (o token leva `sid`, o id da sessão) |
| `401 {erro:"Link ou senha inválidos"}` | senha errada, id inexistente ou malformado, ou 20+ senhas erradas na última hora (até a certa) |
| `410 {erro:"Este link foi desativado ou expirou."}` | senha certa, fora do limite de tentativas, mas a demo está desativada (`ativo:false`) ou passou de `expira_em` |

Só quem sabe a senha vê o 410; quem errou a senha continua vendo o 401.

## Estado da demo (`GET /api/demo/<id>/estado`)

| Resposta | Quando |
|---|---|
| `200 {demo, setor, aprendizado, ia, ia_modelo, admin}` | cookie `td_<id>` válido e demo disponível (ou admin logado, que abre qualquer demo) |
| `401 {erro:"Link ou senha inválidos"}` | sem cookie, cookie forjado, de outra demo ou de uma senha já trocada, ou demo apagada |
| `410 {erro:"Este link foi desativado ou expirou."}` | cookie válido e assinado para ESTA demo (a pessoa já tinha a senha), mas a demo foi desativada ou passou de `expira_em` |

- `ia`: `'real'` quando há `ANTHROPIC_API_KEY` no ambiente do servidor, senão `'local'` (a conversa responde
  pelo motor local). O front usa isso para não prometer "IA real" sem chave. `ia_modelo`: o modelo, ou `null`.
- O 410 vale só para o `/estado` (o front mostra a tela final). As outras rotas da demo continuam 401.

## Acessos (chaves `acessos/` e `acessos_resumo/`)

- `acessos/<demo>/<janela>-<sid>` → `{em}`: um acesso de visitante (GET `/estado`). `janela` é o início do
  bloco de 10 min (13 dígitos, ms) e `sid` vem do cookie. Mesma sessão na mesma janela = mesma chave
  (GETs paralelos gravam uma vez); se a janela anterior da sessão tem acesso há menos de 10 min, não grava.
  Resultado: no máximo um acesso por sessão a cada 10 min. Admin logado não conta. O registro `demo/<id>`
  nunca é regravado por acesso. Chaves antigas `acessos/<demo>/<ts>-<rand>` continuam contando.
- `acessos_resumo/<demo>` → `{total, ultimo_acesso, ate}`: a listagem do admin (`GET /api/admin/demos`)
  soma ali as chaves com mais de 20 min e as apaga. `ate` é a última chave somada: chave `<= ate` nunca
  conta de novo (se o apagar falhar no meio, a próxima listagem só limpa). Duas listagens ao mesmo tempo:
  antes de gravar, a listagem relê o resumo; se o `ate` lido já é >= ao seu, não sobrescreve (usa o lido);
  se mudou para um `ate` menor, soma de novo a partir do lido. Só apaga as chaves <= `ate` do resumo que
  ficou gravado. A mesma listagem apaga chaves órfãs de `acessos/` e `aprendizado/` (demo apagada).
- Contagem mostrada = `acessos` legado do registro + `total` do resumo + chaves ainda não somadas.
- `DELETE /api/admin/demos/<id>` apaga `demo/<id>` primeiro (se algo falhar depois, o link já está
  morto) e depois `aprendizado/`, `uso/`, `tentativas/`, `acessos/` e `acessos_resumo/` em lotes de 50.

## Conversa (SSE)

`POST /api/demo/<id>/conversa` com `{mensagens:[{role,content,cliente?}], modulo?, perfil?, autor?, cliente?, motor?: "local"}`
ou `{estado}` para continuar. Eventos (`event: <nome>\ndata: <json>\n\n`):

- `texto {delta}` — pedaço do texto (com os marcadores `[[tipo:id]]`)
- `ferramenta {nome, rotulo}` — ex.: "Consultando ordens de produção"
- `aprendizado {item}` — a IA (ou o motor local) registrou algo pedido pelo usuário
- `fim {texto, fontes, continuar, estado?, rodada, modo: "ia"|"local", aviso?}` — `texto` é o acumulado do turno
- `erro {erro, recuperavel, status?}` — o cliente pode repetir com `motor: "local"`

Com `continuar:true`, o cliente reenvia `{estado}` (opaco, assinado, vale 15 min) até `continuar:false`
(máx. 5 rodadas). O texto mantém `[[ref]]`; o front troca por ¹ ² ligados aos cartões de `fontes`.

### Portal do cliente (`cliente`)

- `cliente` = id `CLI-…` do pacote; outro valor → 400. `modulo:"portal"` sem `cliente` → 400 (nunca
  responde ao portal com os dados internos completos). O front grava o `cliente` em cada mensagem do
  portal (e na sessão), então "Tentar de novo" e a conversa recarregada mandam o mesmo cliente.
- Com `cliente`, motor local e ferramentas veem só `visaoDoCliente` (local-engine.js): os pedidos dele, as
  ordens desses pedidos (status, %, previsão do pedido e um motivo genérico de atraso, como "ajuste de
  qualidade em andamento" ou "atraso de fornecedor", sem código de máquina, OS ou NC), o representante só
  com id, nome, região e telefone (sem meta, realizado nem nada derivado), o catálogo com o preço da tabela
  dele, as regras comerciais marcadas `publica: true` no pacote (prazo de entrega padrão, pedido mínimo,
  frete, condição de pagamento, garantia, trocas; ver `data/schema.md`), manuais e catálogos que não citam
  outro cliente. Regras internas (alçadas, crédito, nomes de gerente ou diretor, prioridade em ruptura)
  não chegam ao portal: nem ao motor local, nem às ferramentas, nem à busca. O preço da tabela do cliente
  continua calculado pelas regras internas, guardadas fora de `ctx.data` (`ctx.regrasDePreco`).
- Pedido de desconto, crédito ou condição especial no portal: "Condições especiais são tratadas com o seu
  {representante}, {nome}." (motor local e prompt da IA). Resposta tirada das condições públicas abre com
  "Pelas condições comerciais da {empresa}" (manuais e catálogos: "Nos manuais e catálogos da {empresa}").
- Prompt da IA com `cliente`: "Quem lê é um cliente ({cliente}/comprador) da {empresa}", e a lista de
  módulos traz só os que o cliente vê no portal. Módulos visíveis: portal, comercial, visão geral, cérebro (só a
  busca nesses documentos) e produção, se ligados. Pergunta sobre a fábrica por dentro (máquinas,
  qualidade, indicadores…) recebe: "No portal você vê só os seus pedidos, o catálogo e as condições
  comerciais; isso fica com a equipe da {empresa}." Sem aprendizado da equipe e sem registrar nada.
- Histórico: só a pergunta atual e, antes dela, a sequência final de mensagens marcadas com o mesmo
  `cliente` (até 6). A primeira mensagem sem a marca, ou de outro cliente, corta dali para trás: as telas
  internas e o "Ver como" de outro cliente não entram. A marca não vai para a API da Anthropic.
- No front (`web/src/ui/conversa.js`), cada cliente do portal tem a sua conversa, separada da interna:
  chave `td_conv_<demo>:portal:<cliente>` no sessionStorage (a interna é `td_conv_<demo>`), painel que só
  mostra os turnos daquele cliente e troca de conversa quando o "Ver como" muda. Sugestões do painel do
  portal saem de `sugestoesDoPortal(ctx, cliente)` (visão do cliente).

### Avisos (`fim.aviso`)

| Texto | Quando |
|---|---|
| "A IA atingiu o limite de hoje desta demonstração; esta resposta veio do roteiro local." | o teto `DEMO_DAILY_MESSAGES` passou: o servidor responde pelo motor local (`AVISO_LIMITE` em `ai.mjs`) |
| "A IA ficou indisponível por um instante; esta resposta veio do roteiro local." | o front recebeu erro recuperável da IA e refez pelo motor local |

No front, os dois textos ficam só em `demo/web/src/api.js` (`AVISO_LIMITE`, `AVISO_FALHA`);
`ai/assistant.js` importa de lá. O servidor mantém a sua cópia de `AVISO_LIMITE`.

## Testar

```sh
node demo/server/test.mjs                 # testes (FileStore temporário; IA com fetch falso)
node demo/scripts/serve.mjs 4400          # dev: /admin, /demo/<id>, /api/* (dados em demo/.dev-store/)
```

Em dev, sem `DEMO_ADMIN_PASSWORD`/`DEMO_SESSION_SECRET`, o `serve.mjs` usa `admin-dev` e um segredo fixo.
Com `ANTHROPIC_API_KEY` e `TESTE_IA_REAL=1`, `test.mjs` faz também uma conversa real curta.
