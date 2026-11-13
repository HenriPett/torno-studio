# Plano — Demo da Torno para indústrias

Demonstração navegável da oferta da Torno (docs/estrategia-2026-11-torno-industria.md §4) com dados
100% fictícios, um seletor com os 8 setores do site e um painel admin que liga/desliga módulos.
Sem etapa de build: HTML + módulos ES + JSON, publicável como Artifact multi-arquivo e servível por
qualquer servidor estático. Data de referência dos dados: **2026-11-13** ("hoje" na demo).

## 1. Arquitetura (camadas)

```
demo/
  index.html            casca: <title>, <link styles.css>, marcação base, <script type="module" src="src/app.js">
                        (SEM <!doctype>/<html>/<head>/<body>: o Artifact embrulha a página)
  styles.css            tokens da Torno (claro/escuro) + componentes
  data/
    sectors.json        índice dos setores [{id, nome, arquivo, empresa}]
    <setor>.json        pacote de dados fictício do setor (esquema §3)
    schema.md           esquema comentado (fonte da verdade = este plano)
  src/
    app.js              boot, roteador (#rota), casca (barra lateral, topo, faixa "Dados fictícios"), gaveta de detalhes
    state.js            estado único + subscribe: {config, sectorId, sectorOverride, data, route, canEdit, mode}
    features.js         registro de módulos (§4)
    config.js           config padrão, perfis de demo, normalização e dependências
    format.js           fmt.num/money/date/pct/rel, normalize() de texto
    ui.js               componentes de tela (§5.3)
    admin.js            tela #admin
    adapters/
      data-source.js    interface DataSource + FictitiousDataSource (fetch data/*.json) + resolveRef
      config-store.js   interface ConfigStore + DbConfigStore (capacidade db) + LocalConfigStore (localStorage)
      ai-provider.js    interface AIProvider + SampleProvider (capacidade sample) + LocalProvider
    ai/
      tools.js          ferramentas (tools) sobre o pacote do setor, filtradas pelos módulos ativos e pelo perfil
      local-engine.js   motor determinístico: perguntas sugeridas, IDs, busca por palavra-chave
      assistant.js      createAssistant(getCtx): tenta IA (sample) e cai no motor local
    ui/
      chat.js           chatPanel(): conversa com fontes clicáveis (variantes default | whatsapp | phone)
    modules/
      <feature-id>.js   uma tela por módulo: export function render(el, ctx) → opcional cleanup()
  scripts/
    validate.mjs        node demo/scripts/validate.mjs → valida os 8 JSON (esquema + referências cruzadas)
    serve.mjs           servidor estático local que injeta o doctype (node demo/scripts/serve.mjs 4400)
  README.md
```

Separação para replicar num cliente real: **dados** (DataSource) · **config** (features + tenant) ·
**IA** (AIProvider). Trocar `FictitiousDataSource` por conectores reais (ERP/MES/documentos) e
`SampleProvider` por uma API própria não toca nas telas.

## 2. Rotas (só `#nome` simples: o Artifact não passa `#a/b` nem `#k=v`)

- Módulos: `#visao-geral` (padrão), `#cerebro`, `#producao`, `#qualidade`, `#manutencao`, `#comercial`,
  `#marketing`, `#operadores`, `#portal`, `#integracoes`, `#seguranca`.
- `#admin`: só para quem pode editar (`user.canEdit()`); fora do claude.ai (servidor local, sem
  `window.claude`) vira "modo local" com a config no localStorage.
- Setor direto: `#textil`, `#alimentos`, `#plasticos`, `#maquinas`, `#metalmecanica`, `#moveis`,
  `#eletroeletronicos`, `#autopecas` → troca o setor **só nesta sessão** (sessionStorage), sem mexer na
  config salva, e mostra a Visão geral.
- Rota de módulo desligado → volta para `#visao-geral` com aviso discreto.

## 3. Esquema do pacote de setor (`data/<setor>.json`)

Tudo fictício: empresa inventada e plausível (nunca uma empresa real), pessoas com nome e sobrenome
comuns inventados, telefones mascarados (`(47) 9••••-1234`), fornecedores/fabricantes de máquina
genéricos ("Fabricante A", "fornecedor de resinas") — nada de marcas reais. Datas ISO `AAAA-MM-DD`
em torno de 2026-11-13. Números coerentes entre si (pedido atrasado ↔ OP atrasada ↔ estoque baixo).
Termos e dores do setor tirados de `src/content/setores/<setor>.ts`.

```jsonc
{
  "id": "textil",                       // = nome do arquivo
  "setor": "Têxtil e confecção",
  "data_referencia": "2026-11-13",
  "empresa": { "nome": "Malharia Vale do Itajuí S.A.", "cidade": "Brusque", "uf": "SC",
               "funcionarios": 1450, "descricao": "1 frase do que fabrica" },
  "vocabulario": {                       // chaves FIXAS, valores no jargão do setor
    "ordem": "OP", "ordens": "OPs", "produto": "artigo", "produtos": "artigos",
    "cliente": "lojista", "clientes": "lojistas", "representante": "representante",
    "representantes": "representantes", "maquina": "máquina", "maquinas": "máquinas",
    "linha": "célula", "linhas": "células", "unidade": "peças", "lote": "lote"
  },
  "areas": [                             // ids FIXOS; nome na língua do setor
    { "id": "producao",   "nome": "PCP de coleção" },
    { "id": "qualidade",  "nome": "Qualidade" },
    { "id": "manutencao", "nome": "Manutenção" },
    { "id": "comercial",  "nome": "Comercial e representantes" },
    { "id": "marketing",  "nome": "Marketing e catálogo" },
    { "id": "operadores", "nome": "Tinturaria e chão de fábrica" },
    { "id": "gestao",     "nome": "Diretoria" }
  ],
  "plantas":  [ { "id": "P1", "nome": "Planta Brusque", "cidade": "Brusque" } ],               // 2-3
  "linhas":   [ { "id": "L-TIN", "nome": "Tinturaria", "planta": "P1", "tipo": "beneficiamento" } ], // 4-6
  "maquinas": [ { "id": "TIN-03", "nome": "Barca de tingimento 3", "linha": "L-TIN",
                  "tipo": "barca", "fabricante": "Fabricante A", "ano": 2014,
                  "status": "operando|alerta|parada|manutencao", "horimetro": 41250,
                  "mtbf_h": 310, "proxima_preventiva": "2026-11-20", "manual": "DOC-MAN-TIN" } ],   // 10-14
  "produtos": [ { "sku": "MV-2381", "nome": "Camiseta básica malha 30.1", "familia": "Básicos",
                  "unidade": "peças", "preco": 18.9, "prazo_dias": 21, "estoque": 4200,
                  "estoque_minimo": 3000, "descricao_comercial": "2-3 frases aprovadas pelo marketing",
                  "ficha": {
                    "atributos": { "Composição": "100% algodão", "Gramatura": "160 g/m²" },
                    "roteiro": ["Tecelagem", "Tinturaria", "Corte", "Costura (facção)", "Expedição"],
                    "especificacoes": [ { "caracteristica": "Encolhimento", "nominal": "≤ 3", "tolerancia": "±0,5", "unidade": "%" } ]
                  } } ],                                                                        // 10-14
  "ordens": [ { "id": "OP-24518", "sku": "MV-2381", "quantidade": 12000, "linha": "L-COR",
                "inicio": "2026-11-04", "prazo": "2026-11-18",
                "status": "planejada|em_producao|atrasada|concluida", "progresso": 62,
                "pedido": "PV-88213", "motivo_atraso": null,
                "historico": [ { "data": "2026-11-10", "evento": "Retorno da facção com 4% de defeito" } ] } ], // 15-20 (3-5 atrasadas)
  "turnos": [ { "data": "2026-11-12", "turno": "2º", "linha": "L-TIN", "produzido": 8400,
                "refugo": 210, "paradas_min": 45, "resumo": "2-3 frases",
                "ocorrencias": ["Barca 3 parou 25 min: válvula de vapor"] } ],                 // 6-8
  "nao_conformidades": [ { "id": "NC-2026-118", "data": "2026-10-28", "sku": "MV-2381",
                "linha": "L-TIN", "origem": "interna|cliente|fornecedor",
                "severidade": "baixa|media|alta", "descricao": "...", "causa": "...",
                "acao": "...", "status": "aberta|em_analise|encerrada", "responsavel": "Nome Sobrenome",
                "oito_d": null } ],                                                             // 8-10; 1-2 com "oito_d": {"D1":"..",…,"D8":".."}
  "manutencao": [ { "id": "OS-7731", "maquina": "TIN-03", "tipo": "corretiva|preventiva|preditiva",
                "data": "2026-11-12", "status": "aberta|em_execucao|concluida",
                "tecnico": "Nome Sobrenome", "duracao_h": 1.5, "descricao": "...",
                "pecas": ["Válvula de vapor 1\""], "procedimento": "DOC-PRO-012" } ],           // 8-12
  "representantes": [ { "id": "REP-04", "nome": "Nome Sobrenome", "regiao": "PR e SC litoral",
                "telefone": "(47) 9••••-2210", "meta_mes": 850000, "realizado_mes": 612000 } ], // 5-6
  "clientes": [ { "id": "CLI-1042", "nome": "Loja fictícia plausível", "cidade": "Curitiba", "uf": "PR",
                "segmento": "multimarcas", "representante": "REP-04",
                "condicao_pagamento": "30/60/90", "limite_credito": 120000,
                "tabela_preco": "Tabela B", "ultimo_pedido": "2026-10-30" } ],                  // 10-12
  "pedidos": [ { "id": "PV-88213", "cliente": "CLI-1042", "representante": "REP-04",
                "data": "2026-11-01", "status": "em_analise|aprovado|em_producao|faturado|entregue|atrasado",
                "previsao_entrega": "2026-11-21", "ordem": "OP-24518",
                "itens": [ { "sku": "MV-2381", "quantidade": 600, "preco_unit": 18.9 } ],
                "observacao": "" } ],                                                           // 12-15
  "regras_comerciais": [ { "id": "RC-01", "titulo": "Desconto máximo do representante",
                "texto": "Até 5% sem aprovação; 5-8% com gerente regional; acima disso, diretoria." } ], // 5-6
  "kpis": [ { "id": "oee", "nome": "OEE da tinturaria", "valor": 71.4, "unidade": "%", "meta": 78,
              "direcao": "maior_melhor|menor_melhor", "area": "producao",
              "tendencia": [68.2, 69.0, "... 12 valores mensais, o último = valor"],
              "explicacao": "2-3 frases em português claro do que mudou e por quê",
              "caminho": ["MES › apontamentos de parada (L-TIN)", "Planilha de paradas › aba Nov", "Cálculo: disponibilidade × desempenho × qualidade"],
              "fontes": ["maq:TIN-03", "turno:2026-11-12|2º|L-TIN"] } ],                      // 6-8 no jargão do setor
  "documentos": [ { "id": "DOC-PRO-012", "titulo": "Procedimento de troca de válvula de vapor",
              "tipo": "procedimento|norma|manual|ficha_tecnica|contrato|catalogo|email|chamado|planilha|instrucao",
              "area": "manutencao", "origem": "SharePoint|ERP|MES|E-mail|Pasta da qualidade|PLM|Planilha",
              "atualizado": "2026-08-14", "acesso": ["manutencao", "producao", "gestao"],
              "trechos": [ { "id": "t1", "secao": "4.2 Bloqueio", "texto": "trecho citável de 1-3 frases" } ] } ], // 12-16, 2-4 trechos cada
  "saberes": [ { "id": "SB-031", "autor": "Nome Sobrenome", "funcao": "Tintureiro", "tempo_casa_anos": 22,
              "area": "operadores", "maquina": "TIN-03", "titulo": "...", "dica": "2-4 frases",
              "validado_por": "Nome Sobrenome (supervisor)", "data": "2026-09-02", "tags": ["fio misto"] } ], // 8-10
  "integracoes": [ { "id": "erp", "nome": "ERP (ex.: TOTVS Protheus)", "tipo": "ERP",
              "status": "conectado|sincronizando|erro|planejado", "ultima_sync": "2026-11-13T07:40",
              "registros": 184220, "observacao": "Pedidos, estoque, OPs" } ],                  // 6-8 (ERP, MES, PLM/ficha, planilhas, e-mail, SharePoint/pasta, chamados, WhatsApp Business)
  "perfis_acesso": [ { "id": "pcp", "nome": "Analista de PCP", "areas": ["producao", "qualidade"], "usuarios": 14 } ], // 5-7, incluir um "Diretoria" com todas
  "registro_uso": [ { "data": "2026-11-13T08:12", "perfil": "pcp", "area": "producao",
              "pergunta": "...", "fontes": ["op:OP-24518"] } ],                                // 8-12
  "perguntas_sugeridas": [ { "modulo": "producao", "pergunta": "...", "resposta": "2-5 frases, com números iguais aos dos dados",
              "fontes": ["op:OP-24518", "doc:DOC-PRO-012#t1"] } ],                              // 2 por módulo: visao-geral, cerebro, producao, qualidade, manutencao, comercial, marketing, operadores, portal (≥18)
  "conversa_whatsapp": [ { "de": "representante|assistente", "hora": "09:12", "texto": "...",
              "fontes": [] } ],                                                                 // 6-8 mensagens; representante pergunta prazo/estoque/preço; assistente cita fonte
  "marketing": [ { "id": "MK-01", "tipo": "ficha_produto|conteudo_tecnico|resposta_cliente|post",
              "titulo": "...", "texto": "...", "status": "rascunho|em_revisao|aprovado", "sku": "MV-2381",
              "fontes": ["sku:MV-2381"] } ],                                                    // 4-6
  "portal": { "titulo": "Portal do lojista", "boas_vindas": "1 frase",
              "destaques": ["MV-2381"], "avisos": [ { "titulo": "...", "texto": "..." } ] }
}
```

### 3.1 Referências (`fontes`)

Strings `tipo:id`, resolvidas por `resolveRef(data, ref)` → `{tipo, id, rotulo, detalhe, modulo}`:
`doc:DOC-ID#trechoId` (ou `doc:DOC-ID`), `op:OP-ID`, `pedido:PV-ID`, `sku:SKU`, `nc:NC-ID`, `os:OS-ID`,
`maq:MAQ-ID`, `kpi:kpi-id`, `saber:SB-ID`, `cliente:CLI-ID`, `rep:REP-ID`, `regra:RC-ID`,
`turno:data|turno|linha`, `integ:id`. Toda referência usada nos dados precisa existir
(o `validate.mjs` confere).

Módulo dono de cada tipo (usado para esconder fontes de módulos desligados): doc→cerebro (ou o
módulo da área do doc), op/turno→producao, nc→qualidade, os/maq→manutencao,
pedido/cliente/rep/regra/sku→comercial, saber→operadores, kpi→visao-geral, integ→integracoes.

## 4. Módulos (features)

| id | nome | ícone | depende de | conteúdo |
|---|---|---|---|---|
| visao-geral | Visão geral | gauge | — (sempre ligado) | KPIs com tendência, explicação e caminho até o dado; alertas do dia (OPs atrasadas, NCs abertas, máquinas em alerta) |
| cerebro | Cérebro da operação | brain | — | chat com fontes + busca nos documentos; "ver como" perfil de acesso (filtra por área/permissão); lista de fontes conectadas |
| producao | Produção e PCP | factory | — | OPs (filtro, atrasos destacados), roteiro e ficha técnica, resumo de turno, alerta de atraso, assistente da área |
| qualidade | Qualidade | shield-check | — | NCs e ações, rascunho de 8D (gerado), conferência de especificação (valor medido × ficha) |
| manutencao | Manutenção | wrench | — | máquinas e status, OS, histórico do equipamento; visão celular do técnico (moldura de telefone com manual/procedimento e chat) |
| comercial | Comercial e representantes | handshake | — | pedidos, estoque, carteira por representante, preparação de visita, proposta com regras comerciais, simulação WhatsApp |
| marketing | Marketing e catálogo | megaphone | — | catálogo de produtos com ficha, conteúdos gerados (status de aprovação), resposta a cliente a partir de dados aprovados |
| operadores | Conhecimento de operadores | users | — | saberes registrados (autor, anos de casa, validação), consulta, trilha de treino para quem chega |
| portal | Portal do cliente | store | comercial | visão do lojista/cliente: catálogo com preço e prazo, status dos pedidos dele, recompra, assistente do cliente |
| integracoes | Integrações | plug | — | status simulado de ERP, MES, PLM, planilhas, e-mail, pastas, chamados; nomes genéricos ("ERP (ex.: TOTVS)") |
| seguranca | Segurança e governança | lock | — | perfis de acesso por área, matriz perfil × área, registro de uso, onde ficam os dados, LGPD |

Registro em `src/features.js`:
`{ id, nome, icone, rota, depende: [], descricao, sempreLigado?: true, oferta: 'cerebro'|'agentes'|'software' }`.
Módulo desligado: some do menu, a rota redireciona, o assistente não recebe as ferramentas dele e
as fontes dele não aparecem nas respostas. Desligar um módulo desliga quem depende dele (o admin avisa).

## 5. Contratos entre as partes

### 5.1 Config (documento `config/demo` no `db`; leitura para todos, escrita só admin)
```js
{ setor: "textil", empresa_nome: "",          // vazio = nome do pacote
  modulos: { "cerebro": true, ... },          // ausente = ligado
  perfis: [ { id: "p-1", nome: "Têxtil — só comercial e PCP", setor: "textil", empresa_nome: "", modulos: {...} } ],
  atualizado_em: "2026-11-13T10:00:00Z" }
```
Capacidades do Artifact: `{ db: { rules: [ { path: "config", read: "view", write: "admin" } ] }, user: {}, sample: {} }`.

### 5.2 `ctx` passado a cada `render(el, ctx)`
```js
ctx = {
  data,                     // pacote do setor ativo (JSON)
  sector: { id, nome },
  empresa,                  // nome exibido (config.empresa_nome || data.empresa.nome)
  today: "2026-11-13",
  features,                 // lista de features ligadas
  isEnabled(id),            // boolean
  term(key),                // data.vocabulario[key] ?? key
  areaName(areaId),         // nome da área no setor
  resolveRef(ref),          // {tipo, id, rotulo, detalhe, modulo} | null (null se o módulo dono estiver desligado)
  openRef(ref),             // abre a gaveta de detalhe do registro
  navigate(route),          // muda o hash
  assistant,                // ver 5.4
  fmt,                      // import de format.js também serve
}
```

### 5.3 `ui.js` (núcleo) — funções que retornam elementos DOM
`h(tag, attrs, ...children)` (attrs: class, on*: handler, data-*, aria-*; children string|Node|array|null) ·
`icon(name)` (SVG inline; nomes da tabela §4 + search, send, file, alert, check, x, chevron-right,
phone, clock, sparkles, filter, external, user, box, truck, menu, settings-2) ·
`pageHeader({titulo, subtitulo, acoes})` · `card({titulo, acoes, corpo, class})` ·
`kpiTile({kpi, onClick})` (valor, meta, tendência em sparkline, seta) · `sparkline(values, {width, height})` ·
`table({columns: [{key, label, render?, align?}], rows, onRowClick?, empty?})` (rola dentro do próprio container) ·
`badge(text, tone)` tone: neutral|accent|ok|warn|danger ·
`statusBadge(status)` (mapeia status dos dados para tom e rótulo em português) ·
`refChip(ref, ctx)` (chip clicável da fonte) · `tabs([{id, label, render}], {initial})` ·
`emptyState(texto)` · `toolbar(...children)` · `select({id, label, options:[{value,label}], value, onChange})` ·
`searchInput({id, placeholder, onInput})` · `progress(value)` · `phoneFrame(children)` · `toast(texto)`.

### 5.4 Assistente (`ctx.assistant`, de `ai/assistant.js`)
```js
assistant.ask(pergunta, { modulo, perfil, historico, onText, signal })
  → Promise<{ texto, fontes: [ref], modo: "ia" | "local", aviso? }>
assistant.sugestoes(modulo) → [string]          // de data.perguntas_sugeridas (só módulos ligados)
assistant.buscar(termo, { perfil }) → [{ ref, titulo, trecho, area, score }]   // busca local em docs/saberes/NCs
assistant.modo()  → "ia" | "local"              // "ia" quando a capacidade sample existe e não foi negada
assistant.setPreferencia("ia" | "local")
```
`ui/chat.js`: `chatPanel({ ctx, modulo, titulo, placeholder, variante: "default"|"whatsapp"|"phone", perfil?, sugestoes? })` → elemento.

## 6. Verificação
- `node demo/scripts/validate.mjs` sem erros; `node demo/scripts/serve.mjs` + Playwright: desktop e
  celular, claro e escuro, 8 setores, módulos desligados somem, admin bloqueado sem permissão.
- `npm run build` do site igual (a pasta `demo/` fica fora do Astro: `tsconfig` exclui `demo`).
