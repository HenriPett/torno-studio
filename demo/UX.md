# UX da demo v2: spec de redesenho

Escrito em 2026-11-13 para os engenheiros que vão implementar a v2 em `demo/web` (vanilla JS, `h()` e
componentes de `ui.js`, mesmos JSON de `demo/data`). Complementa `demo/PLANO-V2.md` (servidor, API, IA).
Quando este documento e o código antigo discordarem, vale este documento. Quando este documento e a
API do PLANO-V2 discordarem, vale a API.

Prints da v1 usados no diagnóstico (1440 px e 390 px, setor têxtil, roteiro local), no rascunho da sessão:
`/tmp/claude-0/-home-user-torno-studio/5feb512c-653d-5654-8956-d06d55a0f0bd/scratchpad/ux/shots/`.

---

## 1. Diagnóstico da v1

O produto tem conteúdo bom. O problema é a ordem: a v1 mostra **tudo o que a Torno faz** antes de
mostrar **a única coisa que impressiona**, que é perguntar e receber uma resposta certa com a fonte.

O que sobrecarrega:

1. **Menu com 11 itens em 3 grupos com jargão de proposta** ("Cérebro da operação", "Agentes por área",
   "Software sob medida"). Quem chega não sabe por onde começar. "Visão geral" fica no meio do grupo
   "Agentes por área", abaixo de "Integrações" e "Segurança". Print `d-visao-geral.png`.
2. **A primeira tela é um mural de 7 KPIs com sparkline** + "Indicador explicado" + "Precisa de atenção
   hoje" com 11 linhas (4 OPs, 2 NCs, 2 máquinas, 3 pedidos). A página tem 2.700 px de altura no
   desktop e 5.200 px no celular, onde a 1ª dobra são só 3 gráficos (`m-visao-geral.png`). O chat, que
   é o produto, aparece como uma coluna lateral na metade da página.
3. **O Cérebro esconde a conversa.** Na tela do Cérebro, o chat começa abaixo da dobra: antes vêm um
   bloco azul de explicação, o seletor "Ver como" com 7 chips de área, abas "Perguntar / Buscar /
   Fontes" (`d-cerebro.png`). No celular a conversa começa em ~900 px.
4. **Páginas de área são painéis de ERP.** Produção: 4 números, tabela de 18 OPs com 5 colunas (a
   última cortada, "SETOR PRODUTIVO" some atrás da borda), uma gaveta fixa com roteiro, ficha técnica,
   histórico e ligações, mais um card "Alerta de atraso" que repete as 4 OPs atrasadas, mais um
   segundo assistente (`d-producao-full.png`, 3.000 px). Comercial tem **6 abas**. Manutenção tem a
   grade de máquinas com cards sobrepostos e texto cortado ("Jet HT de tingimento 3 (400 k",
   `d-manutencao-full.png`) e um celular simulado ao lado.
5. **Controles que não são do prospect:** seletor de setor no topo (o prospect troca a própria
   empresa fictícia e se perde), selo "Roteiro local" repetido no topo e em cada chat, "Modo local",
   link "Admin" na barra lateral, faixa permanente "Dados fictícios…".
6. **Muito vermelho e rosa.** Linhas inteiras de tabela em rosa, números de KPI em vermelho, cards
   rosa de alerta, bordas vermelhas. A tela parece um alarme, e o cobalto da Torno perde força.

Onde o valor se perde:

7. **A resposta é um bloco cinza de texto corrido** sem hierarquia: "OP-24518 — Moletom careca
   flanelado (SI-5120): atrasada, 48% concluída, 3.600 peças na setor produtivo Tinturaria, prazo 12/11
   (vencido há 1 dia). Motivo do atraso: … (OS-7731).. Último registro…" (`d-chat-full.png`). Erros
   de concordância ("na setor produtivo"), ponto duplo, e nenhum negrito. Na IA real, o Markdown sai
   cru com `**asterisco**`: `ui/chat.js › corpoTexto()` só entende parágrafo e "- ", não interpreta
   negrito, itálico, tabela nem título.
8. **A fonte é um chip solto** ("Fontes: OP-24518 · Moletom…") que parece tag, não prova. Não diz de
   que sistema veio, nem que dá para abrir.
9. **Saudação inútil** ("Olá! Sou o assistente da…") ocupa o lugar onde deveria estar a primeira
   resposta, e as 4 perguntas sugeridas ficam **embaixo** da resposta, empurrando o campo de texto.
   Há um pequeno retângulo rosa vazio sob cada mensagem (selo de aviso sem texto).
10. **Não existe o momento "isso é meu".** O prospect só lê. Não há como colocar algo dele e ver o
    sistema mudar, que é justamente o que faz um diretor imaginar a ferramenta na fábrica dele.
11. Bugs visíveis: "null" impresso no topo do admin (`d-admin.png`); grade de máquinas sobreposta;
    coluna de tabela cortada sem rolagem aparente; balão do usuário em cobalto sólido disputa atenção
    com o botão de enviar.

---

## 2. Princípios e a história de 3 minutos

### Princípios

1. **A pergunta é a tela inicial.** Tudo o mais (áreas, indicadores, portal) é para onde a resposta
   leva, não o que vem antes dela.
2. **Toda frase tem dono.** Cada fato da resposta aponta para um registro que abre com um clique. A
   fonte é um cartão com sistema de origem, não um chip.
3. **O que você ensina aparece em todo lugar.** Um registro do usuário vira fonte citada, aparece na
   máquina, na área e no Cérebro, sempre com "Registrado por {autor}". É a prova de que a ferramenta
   é da empresa dele, não um chatbot genérico.
4. **Uma coisa por vez.** Cada página tem 1 resumo de até 3 números, 1 lista e 1 ação principal.
   Detalhe sempre em gaveta. Nada de abas além de 3.
5. **Calma por padrão, cor só para sinal.** Fundo branco, texto quase preto, cobalto só para ação,
   citação e "aprendido". Vermelho/laranja só em selo de status, nunca em linha inteira ou número.

### A história (3 minutos de reunião, ou 3 minutos sozinho no celular)

O caminho é o mesmo nos 8 setores. Os exemplos abaixo são da têxtil; o âncora genérico é "a máquina
em alerta" (todo pacote tem uma, com saber de operador ligado: TIN-03, PRE-400, ENV-03…).

| Tempo | O que acontece | O que o diretor pensa |
|---|---|---|
| 0:00 | Abre o link, digita a senha. Tela de boas-vindas: "Bem-vindo à Malharia Serra do Itajuí". Um botão: **Começar**. | "Fizeram isso para mim." |
| 0:15 | Início: campo grande "Pergunte à operação da Malharia Serra do Itajuí". Clica na sugestão **O que eu preciso ver hoje?** | |
| 0:20 | Linha viva: "Consultando ordens de produção…", "Consultando máquinas e OS…", "Consultando não conformidades…". | "Está indo nos sistemas." |
| 0:35 | Resposta em blocos: uma frase de resumo, lista com **OP-24518** em negrito e números com marcadores de fonte ¹ ², e cartões de fonte embaixo ("Ordem de produção · ERP", "OS-7731 · Manutenção"). | "Parece meu ERP falando português." |
| 0:50 | Clica no cartão "OS-7731": abre a gaveta com a ordem de serviço, técnico, peças. | "Dá para conferir." |
| 1:10 | Clica **Ensinar algo sobre isso** embaixo da resposta. Gaveta já vem com área "Manutenção" e máquina "TIN-03". Digita: "Até trocar a válvula, não programar marinho na TIN-03; usar a TIN-01." **Ensinar ao cérebro.** | "Eu sei coisas que o sistema não sabe." |
| 1:25 | Confirmação: "O cérebro aprendeu." + botão **Perguntar sobre isso** (pergunta pronta: "O que preciso saber antes de programar a TIN-03?"). | |
| 1:35 | Nova resposta cita, como primeira fonte, um cartão azul claro: **Registrado por Henrique · agora**, ao lado do saber do Osmar (tintureiro, 22 anos de casa) e da OS-7731. O texto diz "Por orientação registrada hoje, programe o marinho na TIN-01". | **"Uau. Ele usou o que eu disse."** |
| 2:10 | Abre **Manutenção**: a TIN-03 tem o selo "1 registro da equipe"; na gaveta, o registro aparece em "Registros da equipe". No **Cérebro**, "Aprendido nesta demo (1)". | "Fica na base da empresa, não na conversa." |
| 2:40 | Henrique fecha: "Isso com os seus sistemas, seus procedimentos e o saber da sua equipe. Começa com um diagnóstico." Link **Conversar com a Torno** em Como funciona. | |

Requisito de engenharia que a história impõe: **o laço "ensinar → perguntar → ver citado" tem de
funcionar também sem chave de API** (motor local). Ver §4.5.4.

---

## 3. Arquitetura de informação

### 3.1 Navegação principal (5 itens)

| # | Item | Rota | Módulo que controla | Some quando |
|---|---|---|---|---|
| 1 | **Início** | `#inicio` (alias de `#visao-geral`) | `visao-geral` (sempre ligado) | nunca |
| 2 | **Cérebro** | `#cerebro` | `cerebro` | `cerebro` desligado |
| 3 | **Áreas** | `#areas` (índice) e `#producao`, `#qualidade`, `#manutencao`, `#comercial`, `#marketing` | cada um o seu | todos os 5 desligados |
| 4 | **Portal do cliente** | `#portal` | `portal` (depende de `comercial`) | `portal` desligado |
| 5 | **Como funciona** | `#como-funciona` | `integracoes` e/ou `seguranca` (e canais de `manutencao`/`comercial`) | sempre visível (tem a seção "Isto é uma demonstração") |

A conversa não é item de menu: é o centro do Início e abre de qualquer lugar (botão **Perguntar** no
topo, assistente de área, "Perguntar sobre isto" nas gavetas). Rota própria `#conversa` para o
voltar do navegador funcionar.

**Desktop (≥ 1024 px): barra superior, sem barra lateral.** Com 5 itens, o menu cabe em linha e a
página ganha 248 px de largura. "Áreas" é um botão com menu suspenso (lista das áreas ligadas, cada
uma com um selo do que precisa de atenção: "4 atrasadas"). Dentro de uma página de área, o cabeçalho
tem um seletor de área em pílulas (Produção · Qualidade · Manutenção · Comercial · Marketing) para
trocar sem voltar ao menu.

**Celular (< 1024 px): barra inferior de 5 abas** (ícone + rótulo de 11 px): Início, Cérebro, Áreas,
Portal, Mais. "Mais" abre `#como-funciona`. Se um item some, a barra fica com 4 (ou 3); nunca há
espaço vazio. A barra some dentro de `#conversa` (que vira tela cheia com "‹ Voltar").

### 3.2 O que muda de lugar

| v1 | v2 | Por quê |
|---|---|---|
| Visão geral (7 KPIs + alertas + chat) | **Início**: pergunta no centro + "Hoje na operação" (3 cartões) + "Indicadores" (4 compactos, "ver todos") | A pergunta é o produto; KPIs viram contexto. |
| Cérebro (explicação + Ver como + 3 abas + chat) | **Cérebro**: o que o cérebro sabe. "Aprendido nesta demo", "Saber da fábrica", "Documentos" (busca). Sem chat na página. | A página prova a base; a conversa já está no Início. |
| Conhecimento de operadores (item de menu) | Seção **Saber da fábrica** dentro do Cérebro. O id `operadores` continua controlando a seção e as fontes `saber:`. `#operadores` redireciona para `#cerebro` com rolagem até a seção. | Saber do operador e o que o usuário ensina são a mesma coisa: conhecimento da equipe. Ficam lado a lado. |
| Integrações, Segurança (itens de menu) | Seções de **Como funciona**. `#integracoes` e `#seguranca` redirecionam para `#como-funciona` (âncora na seção). | Importam para a TI e para a pergunta "e a segurança?", não para o primeiro contato. |
| Celular do técnico (Manutenção) e WhatsApp do representante (Comercial) | **Como funciona › Onde a equipe pergunta** (dois canais lado a lado) | Mostram canal, não dado. Tiram peso das páginas de área. |
| "Ver como" perfil (Cérebro) | **Como funciona › Quem vê o quê**, com botão "Perguntar como {perfil}" que abre a conversa naquele perfil | Argumento forte, mas para quem já entendeu o básico. |
| Comercial: 6 abas | 3 abas: Pedidos · Estoque e preço · Representantes. "Preparar visita" e "Montar proposta" viram ações na gaveta do cliente/representante. | Abas eram ações disfarçadas. |
| Produção: "Alerta de atraso" e "Resumo de turno" | Alerta vira o bloco "Sugestão" na gaveta da OP atrasada; turno vira link "Último turno ›" sob os números | Duplicavam a lista. |
| Qualidade: conferência de especificação | **Corte** (volta como P2, ação na gaveta do produto) | Formulário com tabela de medições é o oposto de "leve". |
| Marketing: catálogo | Catálogo só no Portal; Marketing lista conteúdos e status | Catálogo duplicado. |
| Seletor de setor, selo "Roteiro local/IA ativa", link Admin, "Modo local" | **Saem da demo do prospect.** Setor e módulos vêm do link (admin). O modo da IA aparece só no `/admin`. | Não são decisões do prospect. |
| Faixa permanente "Dados fictícios…" | Pílula "Dados fictícios" ao lado do nome da empresa no topo (tooltip com a frase inteira) + frase na boas-vindas + rodapé de Como funciona | Honestidade sem ocupar uma faixa da tela inteira. |

### 3.3 Regras de módulo (continuam valendo)

- Módulo desligado: some do menu, da barra inferior, do menu "Áreas", do índice `#areas`, dos cartões
  de "Hoje na operação", das perguntas sugeridas, das fontes (`resolveRef` devolve `null`) e das
  ferramentas da IA (servidor). Rota de módulo desligado → `#inicio` com toast "Essa área não faz
  parte desta demonstração." (sem citar "módulo desligado").
- `cerebro` desligado: a conversa continua (é o Início), mas a página Cérebro some; "Aprendido nesta
  demo" passa a ser acessível só pelo toast de confirmação ("Ver registros" abre a lista numa gaveta).
- `operadores` desligado: some a seção "Saber da fábrica" e as fontes `saber:`.
- Se só uma área estiver ligada, "Áreas" vira link direto para ela, com o nome dela no menu.

### 3.4 Rotas finais

`#inicio` · `#conversa` · `#cerebro` · `#areas` · `#producao` · `#qualidade` · `#manutencao` ·
`#comercial` · `#marketing` · `#portal` · `#como-funciona`. Aliases: `#visao-geral`→`#inicio`,
`#operadores`→`#cerebro` (seção saber), `#integracoes`/`#seguranca`→`#como-funciona` (seção).
Rotas de setor (`#textil`…) **saem** da demo do prospect.
Fora do hash: `/demo/<id>` (senha + app) e `/admin` (painel), decididos por `location.pathname` em `app.js`.

---

## 4. Tela a tela

Convenções dos wireframes: `[Botão]` botão, `( )` campo, `‹ ›` navegação, `▾` menu, `·` separador.
Copy entre aspas é **exata**. `{empresa}` = `demo.empresa_nome || setor.empresa.nome`.

### 4.1 Senha (`/demo/<id>`, antes do cookie)

```
┌──────────────────────────────────────────────┐
│                                              │
│                 Torno                        │  wordmark 19 px
│                                              │
│        Esta demonstração é privada.          │  24 px / 650
│   Digite a senha que veio junto com o link.  │  15 px muted
│                                              │
│   Senha                                      │
│   (••••••••••••                  [👁])        │  input 48 px, autofocus
│                                              │
│   [            Entrar            ]           │  primário, largura total
│                                              │
│   Não tem a senha? Peça a quem te enviou     │  13 px muted
│   o link.                                    │
└──────────────────────────────────────────────┘
        IA e software sob medida para a indústria · tornostudio.com
```
- Cartão de 400 px centrado no fundo `--bg-muted` (celular: sem cartão, conteúdo a 16 px das bordas,
  topo a 25 % da altura).
- `autocomplete="current-password"`, Enter envia, botão "mostrar senha" com `aria-label="Mostrar senha"`
  / "Ocultar senha".
- Carregando: botão desabilitado com "Entrando…" e spinner de 16 px. Não limpar o campo.
- Erro (401/404): texto em `--danger-text` abaixo do campo, `role="alert"`: "Link ou senha inválidos.
  Confira a mensagem que você recebeu." Campo ganha borda danger e o foco volta para ele com o texto
  selecionado. Sem tremer.
- Erro de rede/5xx: "Não conseguimos abrir a demonstração agora. Tente de novo em instantes."
- Já autenticado (cookie válido): pular direto para o app (o `GET /estado` decide; mostrar o boot
  enquanto isso, nunca piscar a tela de senha).
- Antes da senha não existe nome de empresa (o conteúdo só sai depois): não tentar personalizar.

### 4.2 Primeira visita (boas-vindas)

Uma tela só, mostrada uma vez por demo (`localStorage["td_bv_<id>"]=1`, com try/catch; sem
storage, mostrar de novo é aceitável).

```
┌──────────────────────────────────────────────┐
│  Demonstração preparada para {demo.nome}     │  13 px muted
│                                              │
│  Bem-vindo à {empresa}.                      │  32 px / 650 / -0.025em
│                                              │
│  Uma {indústria do setor} fictícia com       │  17 px muted, máx. 46ch
│  {funcionarios} pessoas. ERP, MES, fichas    │
│  e procedimentos já estão no cérebro.        │
│                                              │
│  ◎ Pergunte    como falaria com um colega.   │  3 linhas, ícone 20 px
│  ◎ Confira     de onde veio cada resposta.   │
│  ◎ Ensine      algo que só a sua equipe sabe.│
│                                              │
│  Como devemos chamar você? (opcional)        │
│  (Seu nome                         )         │  vira o autor dos registros
│                                              │
│  [          Começar          ]               │
│  Empresa, pessoas e números são fictícios.   │  12 px muted
└──────────────────────────────────────────────┘
```
- `{indústria do setor}`: usar `setor.setor` em minúsculas com artigo ("uma indústria de têxtil e
  confecção"). Mais simples e seguro: "Uma indústria fictícia de {setor.setor minúsculo} com
  {fmt.num(funcionarios)} pessoas."
- O nome digitado vai para `localStorage["td_autor_<id>"]` e é o `autor` padrão do "Ensinar". Vazio =
  "Você" (e o selo diz "Registrado por você").
- Esc ou "Começar" fecham. Foco inicial no campo de nome? **Não**: foco no botão "Começar" (o nome é
  opcional e o teclado do celular cobriria a tela).
- Sem tour, sem tooltips encadeados. Depois disso, só uma dica contextual: na primeira resposta,
  o botão "Ensinar algo sobre isso" ganha um ponto pulsante cobalto (1×, some no primeiro clique ou
  depois da 2ª resposta).

### 4.3 Casca (todas as telas da demo)

Desktop:
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Torno │ Malharia Serra do Itajuí [Dados fictícios]   Início  Cérebro ²  Áreas ▾  Portal  Como funciona │ [⌕ Perguntar] [💡 Ensinar] [◐] │
└─────────────────────────────────────────────────────────────────────────────────────┘
```
- Barra de 56 px, fundo `--bg` com hairline inferior, fixa no topo.
- Esquerda: "Torno" (wordmark 16 px, 650) + divisor vertical + nome da empresa (14 px, 600,
  truncado em 28ch) + pílula "Dados fictícios" (12 px, neutra; `title` = "Empresa, pessoas e números
  inventados para esta demonstração").
- Centro: os 5 itens (14 px, 500; ativo = texto `--text` + sublinhado de 2 px cobalto a 0 px do
  fundo da barra; inativo = `--text-muted`). "Cérebro" leva contador cobalto quando há registros do
  usuário ("2"), com `aria-label="Cérebro, 2 registros seus"`.
- Direita: **Perguntar** (botão secundário com ícone search, abre `#conversa` com foco no campo;
  atalho `/` quando o foco não está num campo), **Ensinar** (botão secundário com ícone lightbulb,
  abre a gaveta Ensinar com a área da página atual), alternador de tema (ícone sun/moon,
  `aria-label="Tema escuro"`/"Tema claro").
- Entre 1024 e 1279 px: os botões da direita ficam só com ícone (com `aria-label` e tooltip).

Celular:
```
┌────────────────────────────────┐
│ Malharia Serra do Itajuí  [💡] │  52 px; nome truncado; pílula "Fictícia" 11 px abaixo do nome
├────────────────────────────────┤
│                                │
│            conteúdo            │
│                                │
├────────────────────────────────┤
│ ⌂      ◉      ▦      ▣      ⋯  │  56 px + safe-area
│Início Cérebro Áreas Portal Mais│
└────────────────────────────────┘
```
- O botão "Ensinar" fica no topo (ícone 44×44). "Perguntar" não precisa de botão: Início é a pergunta,
  e cada área tem a barra "Pergunte sobre…".
- O tema segue o sistema no celular; o alternador fica em "Mais" (Como funciona), no rodapé.

Estados globais:
- **Carregando o estado** (`GET /estado`): tela neutra com o wordmark e uma barra de progresso
  indeterminada de 2 px no topo. Sem texto até 600 ms; depois "Preparando a demonstração…".
- **Sessão expirada** (401 em qualquer chamada): voltar para a tela de senha com o aviso "Sua sessão
  expirou. Digite a senha de novo." (não perder a conversa em memória: depois de entrar, restaurar).
- **Erro ao carregar**: "Não conseguimos carregar a demonstração." + [Tentar de novo].
- Gaveta de detalhe: lateral direita de 480 px no desktop (sobrepõe, com fundo escurecido a 32 %),
  folha inferior até 90 % da altura no celular, com puxador. Esc fecha, foco volta para quem abriu,
  `aria-modal="true"`. Toda gaveta de registro termina com duas ações: [Perguntar sobre isto]
  [Ensinar algo sobre isto].

### 4.4 Início (`#inicio`)

Desktop (coluna central de 760 px para a pergunta; seções abaixo em 1080 px):
```
                         Sexta, 13 de novembro · Bom dia{, Nome}
                                                                         14 px muted
              Pergunte à operação da Malharia Serra do Itajuí
                                                                         40 px / 650
  ┌──────────────────────────────────────────────────────────────────┐
  │ Ex.: por que a OP-24518 atrasou?                                 │  campo 64 px,
  │                                                            [ → ] │  raio 16, sombra md
  └──────────────────────────────────────────────────────────────────┘
   [O que eu preciso ver hoje?] [Qual a tolerância de cor para liberar…]
   [Por que o OEE da tinturaria está abaixo da meta?] [Quais pedidos…]
                         ou  ensine algo ao cérebro ›                    14 px link

  Hoje na operação                                                      20 px / 600
  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
  │ ● Produção        │ │ ● Manutenção      │ │ ● Qualidade       │
  │ 4 OPs atrasadas   │ │ TEA-12 parado     │ │ 2 NCs graves      │  18 px / 600
  │ A mais crítica:   │ │ Aguardando        │ │ Gola do polo 4471,│
  │ OP-24518, reproc. │ │ platinas (OS-7728)│ │ reclamação de     │  14 px muted, 2 linhas
  │ de tingimento.    │ │                   │ │ cliente.          │
  │ Ver ›   Perguntar │ │ Ver ›   Perguntar │ │ Ver ›   Perguntar │
  └───────────────────┘ └───────────────────┘ └───────────────────┘

  Indicadores                                               Ver todos (7) ›
  [OPs na data 82,4% ↓ meta 92%] [Reprocesso 6,8% ↑ meta 4%] [OEE 71,4%] [Retorno facções 9,8 d]
```

Hierarquia: (1) título-pergunta, (2) campo, (3) sugestões, (4) "Hoje na operação", (5) indicadores.
Na 1ª dobra de 1440×900 cabem 1–4 inteiros e o topo de "Hoje". No celular, 1–3 na 1ª dobra.

Regras de conteúdo:
- **Saudação:** "Bom dia" (5h–12h), "Boa tarde" (12h–18h), "Boa noite"; com o nome se houver. A data é
  a da demo (`data_referencia`), em "Sexta, 13 de novembro".
- **Título:** "Pergunte à operação da {empresa sem 'S.A.'/'Ltda.'}". No celular, 28 px.
- **Placeholder do campo:** "Ex.: por que a {ordens[atrasada mais antiga].id} atrasou?" — usa o
  vocabulário (OP, ordem, lote).
- **Perguntas sugeridas (exatamente 4, numa ordem fixa):**
  1. de `perguntas_sugeridas` com `modulo:"visao-geral"`, a que contém "hoje"; senão a primeira.
  2. a primeira de `cerebro`.
  3. a primeira da primeira área ligada entre `producao`, `manutencao`, `qualidade`, `comercial`.
  4. a primeira da próxima área ligada da mesma lista.
  Depois que o usuário ensina algo, a sugestão nº 4 é trocada pela pergunta derivada do registro
  (ver §4.6.4), com um ponto cobalto e `title="Usa o que você registrou"`.
  Pílulas de 36 px, texto 14 px, `--surface-muted`, quebram em até 2 linhas e cortam com reticências.
- **Hoje na operação (máximo 3 cartões)**, nesta ordem de prioridade, só de módulos ligados e só se
  houver o que mostrar:
  1. Produção: OPs `atrasada` > 0 → título "{n} {ordens} atrasadas", texto "A mais crítica:
     {id}, {motivo_atraso encurtado a 70 caracteres}". Pergunta: "Por que as {ordens} estão atrasando?"
  2. Manutenção: máquina `parada` (senão `alerta`) → título "{id} parad{o/a}" ou "{id} em alerta",
     texto = descrição da OS aberta mais recente da máquina encurtada. Pergunta: "O que está
     acontecendo com a {id}?"
  3. Qualidade: NCs abertas/em análise de severidade alta → "{n} NCs graves", texto da mais recente.
     Pergunta: "Quais NCs graves estão abertas e o que já foi feito?"
  4. Comercial (entra se faltar um dos anteriores): pedidos `atrasado` → "{n} pedidos atrasados".
  Cartão inteiro clicável ("Ver ›" abre a gaveta do registro principal, não a página da área);
  "Perguntar" abre a conversa com a pergunta enviada. O ponto colorido antes da área é o único
  sinal (danger para parada/atrasada, warn para alerta); o título fica em `--text`.
- **Indicadores:** 4 primeiros `kpis` cujo `area` está ligada (ou `gestao`). Tile compacto 1 linha:
  nome (13 px muted), valor (24 px, tnum, `--text`), seta + "meta X" (13 px; a seta usa ok/warn
  conforme `direcao`). Sparkline só no hover/gaveta. Clique abre gaveta "Indicador": valor, meta,
  sparkline grande (12 meses), "O que mudou" (`explicacao`), "Caminho até o dado" (passos numerados
  de `caminho`), fontes em cartões, [Perguntar por quê]. "Ver todos (7)" expande a fileira em grade.
- **Estados:** sem módulos de área ligados → não renderiza "Hoje" nem "Indicadores", só a pergunta
  (a tela continua bonita: centralizar verticalmente). Dados com erro → "Hoje na operação" mostra
  uma linha muted "Não foi possível carregar os destaques." sem quebrar a pergunta.

Enviar uma pergunta no Início navega para `#conversa` com a pergunta já enviada; a transição é o
campo "descer" para o rodapé (ver §5.7).

### 4.5 Conversa (`#conversa` e o painel de área)

#### 4.5.1 Layout

Desktop: coluna de 760 px centrada, rolagem da página; compositor fixo no rodapé da janela (fundo
`--bg` com degradê de 24 px acima para o texto sumir por baixo).

```
  ‹ Início                                   [+ Nova conversa]       barra 48 px, sticky

                                   ┌──────────────────────────────┐
                                   │ O que eu preciso ver hoje?   │  pergunta: bolha à direita,
                                   └──────────────────────────────┘  --surface-muted, 16 px

  ◉ Cérebro da Malharia                                               13 px / 600 muted
  ✓ Consultou ordens de produção, máquinas e OS, não conformidades ▾  13 px muted (recolhido)

  Hoje há **4 OPs atrasadas** e **2 máquinas** fora de operação. ¹    16 px / 1.65, sem bolha
  
  **Produção**
  • **OP-24518** · moletom marinho: reprocesso de tingimento (ΔE 1,8). Nova previsão 19/11. ¹
  • **OP-24535** · malha 30.1: TEA-12 parado esperando platinas. ²
  
  | Máquina | Situação | Próxima ação |                                tabela pequena
  |---|---|---|
  | TEA-12 | Parada | Platinas chegam 18/11 |

  Fontes                                                              13 px / 600 muted
  ┌───────────────────────────┐ ┌───────────────────────────┐
  │ ¹ ▣ Ordem de produção · ERP│ │ ² ⚙ Ordem de serviço · MES│
  │ OP-24518 · Moletom careca  │ │ OS-7728 · Tear circular 12│
  │ Atrasada · previsão 19/11  │ │ Em execução · Lauro Moser │
  └───────────────────────────┘ └───────────────────────────┘
  + 3 fontes

  [⧉ Copiar]  [💡 Ensinar algo sobre isso]                             botões ghost 32 px

  ┌──────────────────────────────────────────────────────────────────┐
  │ Pergunte outra coisa ou diga "anota que…"                  [ → ] │
  └──────────────────────────────────────────────────────────────────┘
   Respostas citam a fonte. Confira antes de decidir.                  12 px muted, só desktop
```

Celular: tela cheia, sem barra inferior; topo de 52 px com "‹" e "Nova conversa" (ícone);
compositor fixo no rodapé com `padding-bottom: env(safe-area-inset-bottom)`; cartões de fonte em 1
coluna; tabela rola dentro do próprio container com sombra na borda que tem mais conteúdo.

Painel de área (Produção, Manutenção…): o mesmo componente, em folha lateral de 440 px (desktop) ou
tela cheia (celular), título "Pergunte sobre {nome da área}", `modulo` = id da área. As mensagens da
conversa de área e a do Início são **a mesma conversa** (um histórico só por sessão), para o
usuário nunca perder o que perguntou. O `modulo` só muda as sugestões e o contexto enviado.

#### 4.5.2 Mensagens

- **Pergunta do usuário:** bolha à direita, máx. 80 % da largura, `--surface-muted`, texto `--text`,
  raio 18 (4 no canto inferior direito). Não usar cobalto: o cobalto fica para a ação.
- **Resposta:** sem bolha, largura total da coluna, rótulo "◉ Cérebro da {empresa curta}" acima.
- **Sem saudação inicial.** Conversa vazia = o estado do Início (título, campo, sugestões).
- **Nova conversa:** limpa o histórico local (não apaga aprendizado). Sem confirmação; toast
  "Nova conversa." com [Desfazer] por 6 s.

#### 4.5.3 Streaming e ferramentas

Ordem visual de uma resposta enquanto acontece:
1. Imediatamente após enviar: rótulo "◉ Cérebro…" + linha viva "Pensando…" com 3 pontos (opacidade
   alternada, 1,2 s).
2. A cada `event: ferramenta`: a linha viva troca para o `rotulo` recebido ("Consultando ordens de
   produção…"), com um ícone da ferramenta; as anteriores ficam acima com ✓ (13 px muted). Máximo 4
   linhas visíveis; a 5ª+ substitui a 4ª.
3. No primeiro `event: texto`: as linhas de ferramenta **recolhem** em uma ("✓ Consultou ordens de
   produção, máquinas e OS ▾"), clicável para expandir; o texto começa a aparecer.
4. Texto renderizado em Markdown a cada quadro (`requestAnimationFrame`, re-parse do buffer inteiro;
   ver §4.5.5). Cursor: barra de 2×16 px cobalto piscando no fim do último bloco.
5. `event: fim`: some o cursor; entram os cartões de fonte (fade + 4 px, 40 ms de intervalo) e a
   barra de ações. `aria-live` anuncia só agora: "Resposta pronta, {n} fontes."
6. `continuar:true`: o cliente chama de novo com `estado` **sem** mostrar nada novo além da linha
   viva da próxima ferramenta. O usuário vê uma resposta só.

Rótulos padrão quando o servidor não mandar `rotulo` (o servidor deve mandar estes mesmos textos,
com o vocabulário do setor):

| Ferramenta | Rótulo |
|---|---|
| `buscar_documentos` | Procurando em procedimentos e documentos… |
| `consultar_ordens` | Consultando {ordens} de produção… |
| `resumo_turnos` | Lendo os resumos de turno… |
| `consultar_ncs` | Consultando não conformidades… |
| `consultar_manutencao` | Consultando {maquinas} e ordens de serviço… |
| `consultar_pedidos` | Consultando pedidos… |
| `consultar_estoque_preco` | Consultando estoque e tabela de preço… |
| `consultar_clientes_representantes` | Consultando {clientes} e {representantes}… |
| `regras_comerciais` | Conferindo as regras comerciais… |
| `consultar_kpis` | Lendo os indicadores… |
| `buscar_saberes` | Procurando no saber dos operadores… |
| `buscar_aprendizado` | Procurando no que a equipe registrou… |
| `registrar_aprendizado` | Registrando no cérebro… |
| `status_integracoes` | Verificando as integrações… |
| `perfis_e_registro_uso` | Conferindo permissões… |
| `fichas_marketing` | Consultando fichas e conteúdos aprovados… |

Botão **Parar**: enquanto há resposta em curso, o botão de enviar vira um quadrado (ícone `stop`,
`aria-label="Parar resposta"`). Ao parar: o texto parcial fica, com a nota 13 px muted "Resposta
interrompida." e sem cartões de fonte.

#### 4.5.4 Fontes

- Marcadores `[[tipo:id]]` no texto viram **números sobrescritos** (¹ ² ³), na ordem da primeira
  aparição; a mesma fonte repetida reusa o número. O número é um botão de 18×18 px, `--accent-subtle`
  com texto `--accent-text`, 11 px / 600; hover/foco destaca o cartão correspondente (contorno
  cobalto); clique abre a gaveta do registro.
- Abaixo do texto, "Fontes" e cartões em grade (2 colunas ≥ 640 px, 1 abaixo), mostrando 4 e
  "+ {n} fontes" para o resto. Cartão de 72 px:
  - linha 1 (12 px muted): número, ícone do tipo, "{tipo legível} · {sistema de origem}". Sistema:
    `doc` → `documento.origem` (SharePoint, Pasta da qualidade…); `op`/`turno` → "MES" (se existir
    integração MES) senão "ERP"; `pedido`/`sku`/`cliente`/`rep`/`regra` → "ERP"; `nc` → "Qualidade";
    `os`/`maq` → "Manutenção"; `saber` → "Saber de operador"; `kpi` → "Indicador";
    `aprendizado` → selo próprio (abaixo).
  - linha 2 (14 px / 600, 1 linha): `rotulo` de `resolveRef`.
  - linha 3 (13 px muted, 1 linha): `detalhe` (status, data, trecho).
  - Cartão inteiro é um botão; hover = `--surface-muted`; foco com anel.
- **Fonte aprendida** (`aprendizado:<id>`): sempre ordenada **primeiro**; fundo `--accent-subtle`,
  borda 1 px `--accent` a 40 %, linha 1 = ícone lightbulb + "Registrado por {autor} · {agora | há 5
  min | ontem}" em `--accent-text` 12 px / 600; linha 2 = título do registro; linha 3 = começo do
  texto. Na primeira vez que aparece numa resposta, faz um realce de 1,2 s (ver §5.7).
- Fonte de módulo desligado: não aparece e não ganha número (o marcador some do texto).
- Resposta sem fontes (conversa fiada, "obrigado"): sem seção Fontes, sem aviso.

Motor local (sem `ANTHROPIC_API_KEY`), requisito do laço do "uau": antes da resposta roteirizada,
procurar no aprendizado da demo itens cujo `maquina` apareça na pergunta, ou cuja `area` seja a do
módulo e que compartilhem ≥ 2 palavras de 4+ letras com a pergunta (normalizadas por `fmt.normalize`).
Se houver, a resposta começa com "**Registrado pela equipe:** {texto do item}" + `[[aprendizado:id]]`
e segue com a resposta roteirizada. A pergunta derivada do registro (§4.6.4) tem de casar sempre.

#### 4.5.5 Markdown renderizado (`ui/markdown.js`)

Subconjunto, construído com `h()` e nós de texto (**nunca** `innerHTML`):

| Entrada | Saída |
|---|---|
| parágrafo (linhas separadas por linha em branco) | `<p>` (margem 0 0 12 px) |
| quebra simples dentro do parágrafo | `<br>` |
| `**x**` / `__x__` | `<strong>` (600) |
| `*x*` / `_x_` (sem espaço colado) | `<em>` |
| `` `x` `` | `<code>` 14 px mono, `--surface-muted`, raio 4 |
| `- `, `* `, `• ` | `<ul>` com marcador 6 px `--text-muted`; um nível de aninhamento (2+ espaços) |
| `1. ` | `<ol>` com número tnum |
| `### x`, `## x`, `# x` | `<h4>` 15 px / 600 (todos viram o mesmo nível: a resposta não tem capítulos) |
| tabela GFM (`| a | b |` + `|---|`) | `<table>` 14 px, cabeçalho 12 px / 600 muted, linhas com hairline, números alinhados à direita (célula que casa `/^[\d.,%\sR$−-]+$/`), dentro de `div` com `overflow-x:auto` |
| `> x` | `<blockquote>` com barra de 3 px `--border` |
| `[[tipo:id]]` | sobrescrito de fonte (§4.5.4) |
| `[texto](url)` | só o texto (sem link externo) |
| HTML cru | texto literal |

Streaming: se o buffer termina com `**` ou `*` sem par, ou com `[[` sem `]]`, ou com uma linha de
tabela incompleta, renderizar até antes desse trecho e segurar o resto até fechar. Tabela só aparece
quando a linha separadora `|---|` chegou.

Copiar: copia o Markdown **sem** os marcadores `[[…]]`, com "Fontes:" e os rótulos no fim.

#### 4.5.6 Ações por resposta

`[⧉ Copiar]` → ícone vira ✓ e texto "Copiado" por 1,5 s.
`[💡 Ensinar algo sobre isso]` → abre a gaveta Ensinar (§4.6) pré-preenchida: `area` = módulo da
primeira fonte (ou o módulo da conversa), `maquina` = primeiro `maq:` ou `os:`→máquina citado,
título sugerido vazio.
Nada de 👍/👎, "regenerar" ou "compartilhar": não ajudam a história.

#### 4.5.7 Registro pela conversa ("anota que…")

Quando chega `event: aprendizado` `{item}`: dentro da resposta aparece um cartão de confirmação
(mesmo visual da fonte aprendida) com ✓ "Registrado no cérebro", título do item e dois links:
"Ver no Cérebro" e "Desfazer" (chama `DELETE`, troca o cartão por "Registro desfeito."). O contador
do item Cérebro na barra sobe com o pulso de §5.7.

#### 4.5.8 Erros e limites

- `event: erro` ou falha de rede: no lugar da resposta, linha 14 px "Não consegui responder agora." +
  [Tentar de novo] (reenvia a mesma pergunta). Não mostrar mensagem técnica.
- Teto diário (429 ou erro com esse sentido): "Esta demonstração chegou ao limite de perguntas de
  hoje. Amanhã ela volta; se quiser continuar agora, fale com quem te enviou o link." Compositor
  desabilitado com o mesmo texto no placeholder.
- 401: fluxo de sessão expirada (§4.3).
- Pergunta vazia: botão enviar desabilitado (opacidade 0,4), sem mensagem.

### 4.6 Ensinar o cérebro

#### 4.6.1 Onde fica o botão

1. Topo, sempre: **Ensinar** (desktop com rótulo; celular ícone).
2. Embaixo de cada resposta: **Ensinar algo sobre isso**.
3. Em toda gaveta de registro (OP, máquina, NC, pedido, documento): **Ensinar algo sobre isto**.
4. Cérebro: botão primário **Ensinar o cérebro** e o estado vazio de "Aprendido nesta demo".
5. Início: link "ou ensine algo ao cérebro ›" sob as sugestões.
6. Conversa: "anota que…", "registra que…", "lembra que…" (IA chama `registrar_aprendizado`).

#### 4.6.2 A gaveta

Desktop: gaveta lateral de 480 px. Celular: folha inferior que abre a 85 % da altura.

```
  Ensinar o cérebro                                          [✕]
  O que você registrar aqui vale para as próximas respostas.     14 px muted

  O que é?
  [ Saber de fábrica ][ Ocorrência ][ Regra ou procedimento ][ Nota ]   segmentado

  O que o cérebro precisa saber?
  ┌────────────────────────────────────────────────────────┐
  │ Ex.: Na TIN-03, depois de parada longa, rodar o        │  textarea 5 linhas,
  │ primeiro ciclo em vazio antes de liberar produção.     │  autofocus
  └────────────────────────────────────────────────────────┘
                                                   0 / 2000

  Área                         Máquina (opcional)
  ( Manutenção          ▾)     ( TIN-03 · Jet HT 3   ▾)

  Registrado por
  ( Henrique                           )

  [        Ensinar ao cérebro        ]   [Cancelar]
```

- **Tipos** (valor da API → rótulo): `saber` → "Saber de fábrica" (padrão), `ocorrencia` →
  "Ocorrência", `documento` → "Regra ou procedimento", `nota` → "Nota".
- **Placeholder por tipo** (gerado dos dados do setor; `M` = primeira máquina em `alerta`/`parada`,
  `C` = primeiro cliente):
  - Saber: "Ex.: Na {M.id}, depois de parada longa, rodar o primeiro ciclo em vazio antes de liberar produção."
  - Ocorrência: "Ex.: A {M.id} parou 40 min no 1º turno de hoje; trocamos o sensor e voltou ao normal."
  - Regra: "Ex.: Pedido acima de R$ 50 mil de {cliente} novo passa pela diretoria antes de confirmar prazo."
  - Nota: "Ex.: A {C.nome} prefere receber a nota fiscal antes da carga."
- **Título:** não há campo. O cliente gera `titulo` = primeira frase do texto, cortada em 80
  caracteres na última palavra inteira (a API exige ≤ 120).
- **Área:** select com as áreas do pacote cujos módulos estão ligados, nomes de `setor.areas`; padrão =
  área da página/resposta de origem, senão `producao`. "Máquina" só aparece para áreas `producao`,
  `manutencao`, `operadores` ou tipo `ocorrencia`; lista `maquinas` com "{id} · {nome}".
- **Registrado por:** padrão do `localStorage["td_autor_<id>"]`; ao enviar, grava o valor de volta.
  Vazio → "Você".
- Validação: texto obrigatório com ≥ 12 caracteres ("Escreva um pouco mais para o cérebro entender.");
  máx. 2000 (contador fica `--warn-text` acima de 1800). Botão desabilitado até válido.
- Enviando: botão "Ensinando…" com spinner; campos travados.
- Erro: linha danger acima do botão "Não conseguimos registrar agora. Tente de novo." (mantém o texto).
  Limite de 200 itens: "Esta demonstração já tem 200 registros. Apague algum no Cérebro para continuar."

#### 4.6.3 Confirmação "O cérebro aprendeu"

A gaveta troca de conteúdo (não fecha):
```
           ✓                        círculo 56 px cobalto, check desenhado (§5.7)
   O cérebro aprendeu.              24 px / 650
   A partir de agora, as respostas sobre a TIN-03 levam isso em conta.   15 px muted

   ┌──────────────────────────────────────────────┐
   │ 💡 Registrado por Henrique · agora           │  cartão "fonte aprendida"
   │ Na TIN-03, depois de parada longa…           │
   └──────────────────────────────────────────────┘

   [  Perguntar sobre isso  ]                        primário
   [ Ensinar outra coisa ]   [ Fechar ]              secundário / ghost
```
- Frase do meio: com máquina → "as respostas sobre a {maquina} levam isso em conta."; sem máquina →
  "as respostas sobre {nome da área em minúsculas} levam isso em conta."
- **Perguntar sobre isso** fecha a gaveta, vai para `#conversa` e envia a pergunta derivada (§4.6.4).
- Em paralelo: o contador do Cérebro sobe com pulso; toast **não** aparece (a gaveta já confirmou).

#### 4.6.4 Pergunta derivada de um registro

- Com `maquina`: "O que preciso saber antes de programar a {maquina}?"
- Tipo `ocorrencia` sem máquina: "O que aconteceu em {área} hoje?"
- Tipo `documento` (regra): "Qual é a regra para {3–6 primeiras palavras do título, minúsculas}?"
- Outros: "O que a equipe sabe sobre {3–6 primeiras palavras do título, minúsculas}?"

#### 4.6.5 Onde o registro aparece depois

1. **Respostas:** como fonte aprendida (§4.5.4), número ¹ quando usada.
2. **Cérebro › Aprendido nesta demo:** primeira seção da página, mais recente primeiro.
3. **Página da área:** faixa "Registrado pela equipe" no topo da lista (até 3 itens, "ver todos ›"
   leva ao Cérebro filtrado pela área).
4. **Gaveta do registro ligado:** na gaveta da máquina (ou OP/NC quando o texto citar o id), seção
   "Registros da equipe" acima de "Saber dos operadores".
5. **Lista da área:** linha da máquina ganha um selo 12 px cobalto "1 registro" ao lado do status.
6. **Início:** a 4ª pergunta sugerida vira a pergunta derivada do registro mais recente.
7. **Admin:** contagem e lista (§4.9).

### 4.7 Cérebro (`#cerebro`)

```
  Cérebro da Malharia Serra do Itajuí                         [💡 Ensinar o cérebro]
  Tudo o que a operação sabe, num lugar só. Cada resposta diz de onde veio.

  16 documentos · 10 saberes de operador · 2 registros seus · 7 sistemas conectados ›

  Aprendido nesta demo (2)
  ┌──────────────────────────────────────────────────────────────────────────┐
  │ 💡 Saber de fábrica · Manutenção · TIN-03          Henrique · há 3 min ⋯ │
  │ Até trocar a válvula, não programar marinho na TIN-03; usar a TIN-01.     │
  │ Usado em 1 resposta                                                       │
  └──────────────────────────────────────────────────────────────────────────┘

  Saber da fábrica                                              Ver todos (10) ›
  ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌──────────
  │ Marinho em fio misto quando │ │ Sinal de diafragma gasto na │ │ …
  │ o poliéster muda de lote    │ │ válvula de vapor            │ │
  │ Osmar Luiz Bittencourt      │ │ …                           │ │
  │ Tintureiro · 22 anos de casa│ │                             │ │
  │ ✓ Validado por Edson K.     │ │                             │ │
  └─────────────────────────────┘ └─────────────────────────────┘ └──────────

  Documentos
  ( ⌕ Buscar em procedimentos, normas, fichas…                 )
  [Todas] [Produção] [Qualidade] [Manutenção] [Comercial]          pílulas de área
  ▤ Procedimento de troca da válvula de vapor · SharePoint · atualizado 14/08
    4.2 Bloqueio — Fechar a válvula geral de vapor da linha, aplicar…
  …
```

- **Aprendido nesta demo:** cartões em lista. Menu "⋯" com "Perguntar sobre isso" e "Apagar"
  (confirmação inline no próprio cartão: "Apagar este registro? [Apagar] [Cancelar]"). "Usado em {n}
  respostas" conta citações nesta sessão (memória do cliente; omitir se 0).
  - Vazio: ícone lightbulb 32 px, "Nada registrado ainda." + "Ensine algo que só a sua equipe sabe:
    um macete de máquina, uma ocorrência de hoje, uma regra que não está escrita." + [Ensinar o cérebro].
- **Saber da fábrica** (se `operadores` ligado): carrossel horizontal com rolagem por arraste/scroll-
  snap, 3 visíveis no desktop, 1,2 no celular. Clique abre a gaveta do saber (texto, máquina, tags,
  validação, [Perguntar sobre isto]).
- **Documentos:** busca local (`assistant.buscar`) com destaque do termo; resultado abre a gaveta do
  documento com os trechos. Sem termo: lista os 6 documentos mais recentes. Sem resultado: "Nada
  encontrado para “{termo}”. Tente perguntar ao cérebro:" + botão com a pergunta "{termo}?".
- A linha de números leva a Como funciona › De onde vêm as respostas.

### 4.8 Páginas de área (formato comum)

Uma única função monta todas: `areaPage({ titulo, subtitulo, numeros, lista, gaveta, modulo })`.

```
  ‹ Produção  Qualidade  Manutenção  Comercial  Marketing ›          pílulas de área (só ligadas)

  PCP de coleção e facções                                        [💡 Registrar]
  OPs, turnos e facções · dados do ERP e do MES, atualizados às 07:40

  ┌────────────────┬────────────────┬────────────────┐
  │ 4              │ 69%            │ 6              │   3 números, 32 px / 650 tnum
  │ OPs atrasadas  │ no prazo       │ em produção    │   13 px muted; ponto de status no 1º
  └────────────────┴────────────────┴────────────────┘
  Último turno: 2º turno de 12/11 · 8.400 peças · 2,5% de refugo ›    14 px link (abre gaveta)

  Registrado pela equipe                                          (só se houver)
  💡 Até trocar a válvula, não programar marinho na TIN-03…  Henrique · agora ›

  [Atrasadas 4] [Em produção 6] [Todas 18]          ( ⌕ Buscar OP ou artigo )

  OP-24518  Moletom careca flanelado         Tinturaria    12/11   ● Atrasada   48% ▬▬▭
  OP-24522  Camisa polo piquet masculina     Costura       10/11   ● Atrasada   71% ▬▬▬▭
  …                                                                     linhas de 56 px

  ┌──────────────────────────────────────────────┐
  │ ◉ Pergunte sobre produção                  ▴ │   barra recolhida fixa no rodapé
  └──────────────────────────────────────────────┘   da área (desktop: canto inferior direito, 360 px)
```

Regras comuns:
- Título = nome da área no setor (`setor.areas`), subtítulo = "{o que é} · dados do {sistemas}".
- **3 números**, nunca mais. Só o primeiro pode ter ponto de status. Números em `--text`.
- **Lista principal** como linhas (não cards, não tabela com cabeçalho rígido): no desktop, colunas
  alinhadas por grid CSS com `minmax`; no celular, cada linha vira 2 linhas (id + status em cima,
  nome + prazo embaixo), sem rolagem horizontal. Filtro em pílulas segmentadas (máx. 3) + busca.
  Ordem padrão: o que precisa de atenção primeiro. Nenhum fundo rosa: o status é o selo.
- Clique na linha → gaveta (§4.3). Linha ativa com fundo `--surface-muted`.
- **Assistente da área:** barra recolhida "◉ Pergunte sobre {área minúscula}"; expandida = painel
  de conversa (§4.5.1) com 3 sugestões de `perguntas_sugeridas` do módulo. Estado recolhido é o padrão
  em toda visita.
- **Registrar** abre Ensinar com a área da página.
- Vazio da lista (filtro sem resultado): "Nenhuma {ordem} {filtro}." + "Limpar filtro".
- Carregando: 3 blocos de número e 6 linhas em esqueleto (`--surface-muted`, sem shimmer com
  movimento reduzido).

Por área:

| Área | 3 números | Lista (filtros) | Gaveta | Sai da página |
|---|---|---|---|---|
| **Produção** (`producao`) | {ordens} atrasadas · % no prazo · em produção | {ordens}: id, {produto}, {linha}, prazo, status, progresso (Atrasadas · Em produção · Todas) | Cabeçalho, progresso, **Motivo do atraso** (bloco warn-subtle), **Sugestão** (texto do alerta da v1: prioridade e quanto falta), roteiro como trilha horizontal compacta, "Ficha técnica" em `<details>` fechado, histórico (3 últimos + "ver tudo"), ligações em cartões de fonte, Registros da equipe | Card "Alerta de atraso", abas OPs/Turno, gaveta fixa |
| **Qualidade** (`qualidade`) | NCs abertas · graves · encerradas em 30 dias | NCs: id, {produto}, origem, severidade, status (Abertas · Graves · Todas) | Descrição, causa, ação, responsável; se `oito_d` → "8D registrado" com D1–D8 em `<details>`; senão [Gerar rascunho de 8D] que transmite no próprio corpo da gaveta (mesmo renderer de Markdown) com o rótulo "Rascunho do cérebro · revise antes de enviar" e [Copiar] | Conferência de especificação (P2) |
| **Manutenção** (`manutencao`) | paradas · em alerta · OS abertas | {maquinas}: id, nome, {linha}, status, próxima preventiva, selo "n registros" (Atenção · Todas) — ordenadas parada > alerta > manutenção > operando | Status, horímetro/MTBF/preventiva, OS abertas e últimas 3, procedimento (abre documento), **Registros da equipe**, Saber dos operadores, [Perguntar sobre isto] [Ensinar algo sobre isto] | Grade de cards sobrepostos, celular do técnico (vai a Como funciona) |
| **Comercial** (`comercial`) | pedidos atrasados · carteira do mês (R$ e % da meta) · {produtos} abaixo do mínimo | 3 abas: **Pedidos** (id, {cliente}, {representante}, previsão, status) · **Estoque e preço** ({produto}, estoque, mínimo, preço, prazo) · **{Representantes}** (nome, região, meta × realizado em barra) | Pedido: itens, OP ligada com status, previsão, observação, [Escrever resposta ao {cliente}] (abre a conversa com o pedido). {Cliente}/{representante}: dados, pedidos, [Preparar visita] e [Montar proposta] (abrem a conversa com a pergunta pronta) | Abas Preparar visita, Proposta, WhatsApp |
| **Marketing** (`marketing`) | em revisão · aprovados · fichas publicadas | conteúdos: tipo, título, {produto}, status | Texto renderizado, fontes, [Copiar], [Perguntar sobre isto] | Catálogo (fica no Portal) |

Índice `#areas` (celular, e desktop pelo menu "Áreas ▾ › Todas as áreas"): uma linha por área
ligada, 72 px: ícone, nome, uma frase de estado ("4 OPs atrasadas", "TEA-12 parado", "2 NCs
graves", "3 pedidos atrasados", "2 conteúdos em revisão"), chevron.

### 4.9 Portal do cliente (`#portal`)

Mantido como prova de "software sob medida", mais simples e emoldurado para não confundir com a
ferramenta interna.

```
  Portal do cliente                                     Ver como: ( Moda Ponto Certo ▾ )
  Software sob medida: o que cada {cliente} vê, ligado ao mesmo ERP.     14 px muted

  ┌─ ● ● ●  portal.malhariaserra.com.br ─────────────────────────────────────────┐
  │  Malharia Serra do Itajuí · Portal do lojista                                 │
  │  Olá, Moda Ponto Certo                                                        │
  │  Tabela B · 30/60/90 · Representante: Cláudio R. Silveira                     │
  │                                                                               │
  │  [ Repetir último pedido ]  Último: PV-88258, 10/11                           │
  │                                                                               │
  │  Seus pedidos                          │  Pergunte                            │
  │  PV-88213  ● Atrasado  previsão 21/11  │  ( Quando chega meu pedido?  → )     │
  │  PV-88258  ● Em análise                │  [Tem moletom marinho?] [Prazo…]     │
  │                                        │                                      │
  │  Catálogo (6)                          │                                      │
  │  [card] [card] [card]                  │                                      │
  └───────────────────────────────────────────────────────────────────────────────┘
```
- Moldura de janela (barra com 3 pontos e URL fictícia `portal.{slug da empresa}.com.br`, 12 px
  muted). Dentro, o portal usa os mesmos tokens.
- Mantém: troca de cliente, saudação, condições, pedidos dele, "Repetir último pedido" (confirmação
  inline: "Pedido de recompra criado como rascunho. O representante confirma o prazo." — sem carrinho),
  catálogo com preço da tabela dele e prazo, assistente do cliente (perfil `cliente`, só dados dele).
- Corta: os 3 avisos (fica 1, o primeiro, como faixa fina), o carrinho, o limite de crédito em
  destaque.
- Celular: sem moldura de janela (só um rótulo "Visão do {cliente}" no topo), assistente vira barra
  recolhida como nas áreas.

### 4.10 Como funciona (`#como-funciona`)

Página de leitura, coluna de 760 px, seções com âncora:
1. **De onde vêm as respostas** (`integracoes`): lista de integrações (nome genérico, status com
   selo, última sincronização relativa, registros com `fmt.num`). Frase de abertura: "Nada é
   copiado à mão: o cérebro lê os sistemas que a {empresa} já usa."
2. **Quem vê o quê** (`seguranca`): perfis × áreas como lista ("Analista de PCP — Produção,
   Qualidade · 14 pessoas"), [Perguntar como {perfil}] (select + botão) abre a conversa com `perfil`
   e um selo no topo da conversa "Perguntando como Analista de PCP ✕".
3. **Onde a equipe pergunta**: dois quadros lado a lado (empilhados no celular): "No celular do
   técnico" (moldura de telefone com a OS e o procedimento, `manutencao`) e "No WhatsApp do
   {representante}" (a `conversa_whatsapp` estática, `comercial`).
4. **Seus dados** (`seguranca`): 4 frases da estratégia §4.4 (infra do cliente ou nuvem aprovada
   pela TI; acesso por perfil; registro de uso; dados não treinam modelos de terceiros).
5. **Isto é uma demonstração** (sempre): "Empresa, pessoas e números foram inventados. Num projeto
   real, o cérebro é montado com os sistemas, documentos e permissões da sua empresa, começando por um
   diagnóstico." + link **Conversar com a Torno ›** para `/diagnostico/` (mesma origem, nova aba).
6. Rodapé: alternador de tema (no celular) e "Torno · tornostudio.com".

### 4.11 Painel `/admin`

Público: só o Henrique, quase sempre no notebook, às vezes no celular antes da reunião. Densidade
maior que a demo, mesmo sistema visual.

Entrada: mesma tela da §4.1 com título "Painel da demo" e campo "Senha de administrador".

```
  Torno · Demos                                               [Sair]
  ┌ IA real ligada · claude-sonnet-5-5 ─────────────────────────────┐   ok-subtle
  └─────────────────────────────────────────────────────────────────┘   (sem chave: warn-subtle
                                                                          "Sem chave de API: as demos
  [+ Novo link]                                ( ⌕ Buscar prospect )      usam o roteiro local.")

  Prospect                  Setor        Status      Acessos  Último acesso  Registros
  ─────────────────────────────────────────────────────────────────────────────────────
  João Melo · Têxtil Brusque  Têxtil      ● Ativo     7        há 2 h         3   ⋯
  Metalúrgica X (Ana)         Metalmec.   ○ Desativ.  1        há 9 dias      0   ⋯
```

- Tabela com linhas de 52 px; clique na linha expande o detalhe embaixo (não abre página).
  Celular: cada demo vira um cartão de 2 linhas (nome + status; setor · acessos · último acesso).
- Status: "Ativo" (ok), "Desativado" (neutro), "Expirado" (warn, quando `expira_em` < hoje).
- Ordenação: último acesso desc; demos nunca acessadas por criação desc. Busca filtra nome/empresa.
- Vazio: "Nenhuma demo ainda. Crie o primeiro link para mandar a um prospect." + [Novo link].

**Novo link** (painel que abre acima da tabela, 1 passo, sem assistente):
```
  Novo link
  Prospect *                   Setor *
  ( João Melo — Têxtil Brusque )  ( Têxtil e confecção · Malharia Serra do Itajuí ▾ )

  Nome da empresa na demo (opcional)
  ( Malharia Serra do Itajuí S.A.                      )   placeholder = nome do pacote

  O que mostrar
  [ Completa ][ Comercial e PCP ][ Qualidade e manutenção ][ Personalizar ]
     ↳ Personalizar abre as 11 caixas com a dependência portal→comercial explicada

  Senha                         Expira
  (●) Gerar   ( ) Digitar       ( Em 30 dias ▾ )   opções: 7 dias, 30 dias, 90 dias, Sem prazo
  Nota interna (opcional)
  ( Reunião 18/11, diretor industrial                    )

  [ Criar link ]   [Cancelar]
```
- Presets (o valor gravado é o objeto `modulos` completo):
  - **Completa:** tudo ligado.
  - **Comercial e PCP:** `visao-geral, cerebro, producao, comercial, portal, marketing, integracoes,
    seguranca` ligados; `qualidade, manutencao, operadores` desligados.
  - **Qualidade e manutenção:** `visao-geral, cerebro, qualidade, manutencao, operadores, producao,
    integracoes, seguranca` ligados; `comercial, portal, marketing` desligados.
  - **Personalizar:** caixas; desligar `comercial` desliga `portal` com a nota "Portal depende de
    Comercial".
- **Resultado** (substitui o formulário):
```
  Link criado para João Melo
  https://tornostudio.com/demo/k7q2m9xv4hta          [Copiar link]
  Senha: torno-4821-maré                             [Copiar senha]
  [ Copiar mensagem pronta ]   [Abrir a demo ›]   [Fechar]
  A senha só aparece agora. Se perder, gere outra.     13 px warn-text
```
  "Mensagem pronta": "Olá, {primeiro nome}! Segue a demonstração que preparei para vocês:\n{url}\nSenha:
  {senha}\nÉ uma fábrica fictícia de {setor}: dá para perguntar, conferir a fonte e ensinar algo ao
  sistema." Toast "Copiado." em cada cópia.
- **Detalhe da linha:** link + [Copiar link]; criado em, expira em, nota (editável inline); módulos
  como lista de pílulas com [Editar] (mesmos presets); **Registros do prospect** (lista com tipo,
  área, texto, autor, data — o que ele ensinou é ouro para a reunião seguinte), vazio = "Nenhum
  registro ainda."; ações: [Nova senha] (mostra a nova uma vez, com copiar), [Desativar]/[Ativar],
  [Zerar aprendizado], [Apagar].
- **Confirmação inline** para Zerar e Apagar: o botão vira "Zerar os {n} registros? [Zerar] [Cancelar]"
  / "Apagar a demo e tudo dela? [Apagar de vez] [Cancelar]" (danger). Sem modal.
- Erros: linha danger no topo do painel afetado, com o texto da API (`erro`).

---

## 5. Sistema visual

Mantém a identidade do site (Inter, branco/cinza, cobalto único, títulos firmes), ajustada para
**app** (densidade de leitura, não de landing).

### 5.1 Tokens (`demo/web/styles.css`, `:root`)

Cores — mesmos valores do site, nomes curtos já usados na v1, mais os que faltavam:

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0b` | página |
| `--bg-muted` | `#f5f5f7` | `#111113` | tela de senha, fundo do admin |
| `--surface` | `#ffffff` | `#1c1c1e` | gavetas, menus, cartões sobre bg-muted |
| `--surface-muted` | `#f5f5f7` | `#1c1c1e` | bolha do usuário, pílulas, linha ativa |
| `--surface-hover` | `#ececf0` | `#26262a` | hover de linha/cartão |
| `--text` | `#1d1d1f` | `#f5f5f7` | |
| `--text-muted` | `#636368` | `#a1a1a6` | (#636368 dá 5,6:1 no branco e 5,1:1 no muted) |
| `--border` | `#d2d2d7` | `#2c2c2e` | divisórias |
| `--border-subtle` | `#e8e8ed` | `#232326` | hairlines |
| `--border-strong` | `#86868b` | `#76767c` | limite de campo |
| `--accent` | `#1d4fd7` | `#2f62e8` | botão primário, enviar, sublinhado do menu |
| `--accent-hover` | `#1843b8` | `#3d6ff0` | |
| `--accent-text` | `#1d4fd7` | `#6b9bff` | link, número de citação, selo "registrado" |
| `--accent-subtle` | `#eaf0fd` | `#14213f` | fonte aprendida, citação |
| `--ok-text` / `--ok-subtle` | `#1b7a3e` / `#e9f6ee` | `#6fd59a` / `#12291b` | |
| `--warn-text` / `--warn-subtle` | `#b4470b` / `#fdf0e7` | `#ffb37a` / `#2e1d10` | |
| `--danger-text` / `--danger-subtle` | `#c01f2e` / `#fdecee` | `#ff8a8f` / `#331417` | |
| `--focus` | `#1d4fd7` | `#6b9bff` | anel 2 px + 2 px de afastamento |
| `--scrim` | `rgb(0 0 0 / .32)` | `rgb(0 0 0 / .56)` | |

Tema: `:root` claro; `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` e
`:root[data-theme="dark"]` escuro (mesmo esquema do site). O alternador grava
`localStorage["td_tema"]` e põe `data-theme` no `<html>` antes do primeiro render (script inline no
`index.html`, 3 linhas, para não piscar).

Forma e sombra: `--r-sm: 8px` (pílula pequena, código), `--r-md: 12px` (campos, botões, cartões de
fonte), `--r-lg: 16px` (cartões, campo do Início, gavetas no lado de dentro), `--r-full`. Cartões de
página **sem sombra**, borda 1 px `--border-subtle`. Sombra só no que flutua: campo do Início
(`--shadow-md`), gavetas, menus e o compositor (`--shadow-lg`).

### 5.2 Tipografia

Inter Variable auto-hospedada (`inter.woff2`, PLANO-V2 §1), `font-optical-sizing: auto`,
`font-feature-settings: "cv11", "ss01"` não; só `tnum` em números (`.num`).

| Token | Tamanho | Peso / tracking / entrelinha | Uso |
|---|---|---|---|
| `--fs-hero` | `clamp(28px, 1.2rem + 1.6vw, 40px)` | 650 / -0.03em / 1.1 | título-pergunta do Início, boas-vindas |
| `--fs-h1` | `clamp(24px, 1.1rem + .6vw, 28px)` | 650 / -0.022em / 1.2 | título de página |
| `--fs-h2` | 20px | 600 / -0.015em / 1.3 | seção ("Hoje na operação") |
| `--fs-h3` | 16px | 600 / -0.01em / 1.4 | título de cartão, `h4` da resposta (15px) |
| `--fs-stat` | 32px | 650 / -0.02em / 1 | números de área |
| `--fs-read` | 16px | 400 / -0.006em / 1.65 | texto da resposta, boas-vindas |
| `--fs-body` | 15px | 400 / 1.5 | listas, gavetas |
| `--fs-sm` | 13px | 400–600 / 1.45 | meta, rótulos, cartões de fonte |
| `--fs-xs` | 12px | 500 / 1.4 | selos, pílulas, legendas |

Sem caixa alta com tracking largo ("ROTEIRO", "FICHA TÉCNICA" da v1 viram 13 px / 600 em caixa
normal). Máximo 3 pesos numa tela (400, 600, 650).

### 5.3 Espaço e densidade

Base 4 px. Página: 32 px de lado no desktop (máx. 1200 de conteúdo; Início/conversa/Como funciona em
760), 16 px no celular. Entre seções: 48 px desktop / 32 px celular. Cartão: padding 20 / 16.
Linha de lista 56 px (mín. 44 de alvo). Campo e botão padrão 40 px; campo do Início 64 px; botão
primário de ação final 44 px. Gaveta: padding 24 / 16, seções separadas por 24 px com título 13 px / 600.

### 5.4 Uso do acento (regra dura)

Cobalto aparece **só** em: botão primário (1 por tela visível), botão enviar, sublinhado do item
ativo do menu, links, números de citação, fonte/registro aprendido, contador do Cérebro, check de
"O cérebro aprendeu", anel de foco. Nunca em fundo de bloco explicativo (o bloco azul do Cérebro v1
sai), nunca na bolha do usuário, nunca em ícone decorativo de cabeçalho.

### 5.5 Como o chat se destaca

Pelo **espaço e pela tipografia**, não pela cor: coluna estreita de leitura (760 px), corpo 16 px /
1,65, resposta sem bolha (parece um documento, não um chat de suporte), campo do Início com sombra e
raio 16 como único objeto "flutuante" da página, título de 40 px. Os cartões de fonte em grade abaixo
fazem a resposta parecer "embasada". O compositor fixo tem sombra lg; nada mais na página tem.

### 5.6 Ícones

SVG inline do `ui.icon()`, traço 1,75 px, `currentColor`, 16 px em texto pequeno, 18 px em botões,
20 px na barra inferior. Novos ícones necessários: `lightbulb` (ensinar), `copy`, `check-circle`,
`stop` (quadrado), `sun`, `moon`, `undo`, `more` (⋯ horizontal), `key`, `link`, `eye`, `eye-off`,
`log-out`, `home`, `grid` (áreas), `arrow-up` já existe (enviar no celular). Ícone + texto em todo
botão de ação, exceto enviar/parar/fechar/tema (com `aria-label`).

### 5.7 Microinterações

Tokens: `--dur-1: 120ms` (hover, pressionar), `--dur-2: 200ms` (abrir menu, trocar estado),
`--dur-3: 320ms` (gaveta, transição Início→conversa), `--ease: cubic-bezier(.2,0,0,1)`.

| Momento | Movimento |
|---|---|
| Pressionar botão | `scale(.98)` em 120 ms |
| Gaveta/folha | desliza 24 px + fade, 320 ms; scrim fade 200 ms |
| Início → conversa | título e sugestões fade-out 120 ms; a pergunta aparece como bolha à direita com fade + 8 px; o compositor assenta no rodapé |
| Ferramenta | linha nova entra com fade 120 ms; ✓ troca o ponto vivo |
| Texto em streaming | sem animação por palavra (o próprio streaming é o movimento); cursor pisca 1 s |
| Cartões de fonte | fade + 4 px, intervalo 40 ms |
| Fonte aprendida (1ª vez) | fundo vai de `--accent` a 24 % até `--accent-subtle` em 1,2 s |
| "O cérebro aprendeu" | círculo escala 0,8→1 (200 ms), check desenhado com `stroke-dashoffset` (320 ms) |
| Contador do Cérebro | pulso: anel cobalto 0→8 px com fade, 600 ms, 1× |
| Copiar | ícone troca para ✓ com crossfade 120 ms |

`@media (prefers-reduced-motion: reduce)`: tudo vira troca instantânea de opacidade (≤ 120 ms), sem
deslocamento nem escala; cursor fixo (não pisca); esqueleto sem shimmer; realce da fonte aprendida
vira só o estado final. O conteúdo é o mesmo nos dois modos.

### 5.8 Celular (390 px)

- Barra superior 52 px + inferior 56 px + safe-area; nada além disso fixo (exceto compositor na
  conversa e a barra recolhida "Pergunte sobre…" nas áreas, que fica 8 px acima da barra inferior).
- Início: título 28 px; campo 56 px; sugestões em **rolagem horizontal** de uma linha (scroll-snap),
  não empilhadas; "Hoje" em cartões empilhados de largura total; indicadores 2×2.
- Listas viram linhas de 2 níveis; nada de tabela larga fora da resposta do chat.
- Gavetas viram folhas inferiores com puxador e "✕" de 44 px.
- `font-size` dos campos ≥ 16 px (evita zoom no iOS).
- Nenhuma rolagem horizontal da página: testar 360 e 390 px.

---

## 6. Copy

### 6.1 Tom

De quem conhece fábrica: frase curta, verbo no imperativo nas ações, número com unidade, termo do
setor (`vocabulario`: OP, lote, artigo, lojista). Sem "IA" como sujeito de marketing ("nossa IA
poderosa"), sem exclamação, sem "Olá! Sou o assistente". O sistema se chama **o cérebro** (com artigo,
minúsculo no meio da frase). Respostas: primeira frase responde; depois o detalhe; números iguais aos
dados; nunca "talvez" sem dizer por quê.

Instruções de estilo para a IA (repassar ao `ai.mjs`): "Comece pela resposta em uma frase. Use
**negrito** só para ids e números decisivos. Listas para 3+ itens. Tabela só para comparar 3+ linhas
com 2+ colunas. No máximo 120 palavras, salvo pedido. Não use títulos `#`. Não cumprimente. Se usar algo
registrado pela equipe, diga 'pelo que foi registrado hoje' e cite." O motor local deve seguir o
mesmo formato (negrito no id, lista quando houver mais de um item) e corrigir "na setor produtivo" e
o ponto duplo.

### 6.2 Textos-chave (exatos)

| Lugar | Texto |
|---|---|
| Senha, título | Esta demonstração é privada. |
| Senha, apoio | Digite a senha que veio junto com o link. |
| Senha, botão | Entrar / Entrando… |
| Senha, erro | Link ou senha inválidos. Confira a mensagem que você recebeu. |
| Boas-vindas | Bem-vindo à {empresa}. · Pergunte / Confira / Ensine · Começar |
| Início, título | Pergunte à operação da {empresa} |
| Início, link | ou ensine algo ao cérebro › |
| Início, seção | Hoje na operação · Indicadores · Ver todos ({n}) |
| Conversa, compositor | Pergunte outra coisa ou diga “anota que…” |
| Conversa, rodapé | Respostas citam a fonte. Confira antes de decidir. |
| Conversa, ações | Copiar · Copiado · Ensinar algo sobre isso · Nova conversa |
| Conversa, fontes | Fontes · + {n} fontes · Registrado por {autor} · agora |
| Conversa, erro | Não consegui responder agora. · Tentar de novo |
| Ensinar, título | Ensinar o cérebro |
| Ensinar, apoio | O que você registrar aqui vale para as próximas respostas. |
| Ensinar, campo | O que o cérebro precisa saber? |
| Ensinar, botão | Ensinar ao cérebro / Ensinando… |
| Confirmação | O cérebro aprendeu. · Perguntar sobre isso · Ensinar outra coisa · Fechar |
| Pela conversa | Registrado no cérebro · Ver no Cérebro · Desfazer · Registro desfeito. |
| Cérebro, título | Cérebro da {empresa} |
| Cérebro, lead | Tudo o que a operação sabe, num lugar só. Cada resposta diz de onde veio. |
| Cérebro, seções | Aprendido nesta demo · Saber da fábrica · Documentos |
| Cérebro, vazio | Nada registrado ainda. |
| Área, botões | Registrar · Pergunte sobre {área} · Perguntar sobre isto · Ensinar algo sobre isto |
| Área, faixa | Registrado pela equipe |
| Gaveta, seções | Registros da equipe · Saber dos operadores · Motivo do atraso · Sugestão · Ficha técnica · Histórico · Ligações |
| Módulo fora | Essa área não faz parte desta demonstração. |
| Como funciona | De onde vêm as respostas · Quem vê o quê · Onde a equipe pergunta · Seus dados · Isto é uma demonstração · Conversar com a Torno › |
| Admin | Novo link · Criar link · Copiar link · Copiar senha · Copiar mensagem pronta · A senha só aparece agora. Se perder, gere outra. · Nova senha · Desativar · Ativar · Zerar aprendizado · Apagar |

### 6.3 Cortar

"Olá! Sou o assistente da…" · "Roteiro local" / "IA ativa" / "Modo local" / "Configuração
compartilhada" · rótulos "Cérebro da operação / Agentes por área / Software sob medida" no menu ·
"Indicador explicado" · "Precisa de atenção hoje" (vira "Hoje na operação") · bloco azul "Um só lugar
para perguntar sobre…" · "Pergunte como Diretoria" · "Visão do cliente: é isto que cada lojista vê…"
(vira subtítulo curto) · "Gerado a partir das OPs, prazos e histórico · revisar antes de enviar" (vira
"Rascunho do cérebro · revise antes de enviar") · rótulos em caixa alta · "Abrir módulo" (vira
"Ver ›") · a faixa permanente de dados fictícios (vira pílula).

---

## 7. Implementação priorizada

Três pacotes em paralelo, **sem arquivos em comum**. O contrato entre eles está em §7.4: quem
depende de algo que ainda não existe usa um stub com a mesma assinatura.

### 7.1 Pacote A — Casca, design system, entrada e admin

Arquivos: `demo/web/index.html` (doctype completo, `meta robots`, sem Google Fonts, `@font-face`
de `inter.woff2`, script de tema) · `demo/web/styles.css` (tokens §5, base, botões, campos,
pílulas, gaveta, barra superior/inferior, esqueleto) · `demo/web/src/app.js` (boot por
`location.pathname`, `GET /estado`, roteador §3.4, aliases, casca, `ctx`) · `demo/web/src/ui.js`
(novos: `sheet`, `segmented`, `iconButton`, `confirmInline`, `skeleton`, ícones §5.6; remover
`phoneFrame` daqui só depois que C migrar) · **novos** `demo/web/src/api.js`,
`demo/web/src/screens/entrar.js`, `demo/web/src/screens/boas-vindas.js`,
`demo/web/src/screens/como-funciona.js`, `demo/web/src/admin/admin.js`, `demo/web/css/admin.css` ·
apaga `demo/web/src/admin.js` (antigo), `demo/web/src/adapters/config-store.js`,
`demo/web/src/config.js` (config vem do servidor) · `demo/web/src/features.js` (ganha `nav`:
`'inicio'|'cerebro'|'areas'|'portal'|'como-funciona'` e os aliases).

- **P0:** tokens e base; `index.html`; `api.js`; tela de senha; casca desktop (barra superior) e
  celular (barra inferior) com regras de módulo; roteador e aliases; gaveta/folha genérica (`sheet`)
  e `ctx.openRef` usando ela; boas-vindas; admin completo (sem ele não há link para mandar).
- **P1:** Como funciona (as 5 seções; reaproveita trechos de `modules/integracoes.js`,
  `modules/seguranca.js`, e move o telefone de `manutencao.js` e o WhatsApp de `comercial.js` para cá —
  A copia o trecho, C apaga do módulo dele); alternador de tema; sessão expirada com restauração.
- **P2:** atalho `/`; "Perguntar como {perfil}" com selo na conversa (precisa de B: só passa `perfil`).

### 7.2 Pacote B — Conversa, Markdown, aprendizado, Início e Cérebro

Arquivos: **novos** `demo/web/src/ui/markdown.js`, `demo/web/src/ui/conversa.js` (substitui
`ui/chat.js`), `demo/web/src/ui/fontes.js` (cartões e sobrescritos), `demo/web/src/ui/ensinar.js`
(gaveta + confirmação), `demo/web/src/learning.js` (store do aprendizado no cliente),
`demo/web/css/conversa.css` (substitui `css/chat.css`), `demo/web/css/inicio.css` ·
reescreve `demo/web/src/modules/visao-geral.js` (Início) e `demo/web/src/modules/cerebro.js` ·
altera `demo/web/src/adapters/data-source.js` (tipo de ref `aprendizado`), `demo/web/src/ai/assistant.js`
(cliente SSE com rodadas `continuar`), `demo/web/src/ai/local-engine.js` (formato Markdown, correções
de texto, casamento com aprendizado §4.5.4 — avisar o agente do servidor, que importa este arquivo
em `server/local.mjs`) · apaga `demo/web/src/ui/chat.js`, `demo/web/src/adapters/ai-provider.js`,
`demo/web/src/modules/operadores.js` (o conteúdo vira a seção "Saber da fábrica" em `cerebro.js`).

- **P0:** `markdown.js` com testes de mesa (negrito, lista, tabela, streaming parcial); `conversa.js`
  com streaming, linhas de ferramenta, fontes, ações, Parar, erros; `ensinar.js` + `learning.js`;
  ref `aprendizado`; Início (pergunta, sugestões, "Hoje na operação"); Cérebro com "Aprendido nesta
  demo" e "Saber da fábrica"; motor local com o laço do "uau".
- **P1:** indicadores do Início com gaveta; busca de documentos no Cérebro; "anota que…" (evento
  `aprendizado` no chat); "Usado em {n} respostas"; dica pulsante única do "Ensinar".
- **P2:** sugestões de continuação depois da resposta; histórico da conversa sobrevivendo a recarga
  (sessionStorage).

### 7.3 Pacote C — Páginas de área e Portal

Arquivos: **novos** `demo/web/src/ui/area-page.js` (`areaPage()`, `statRow()`, `rowList()`,
`teamNotes()`, `areaAssistant()` — este último só embrulha `ctx.perguntar` em folha), `demo/web/css/areas.css`
(substitui `css/mod-a.css`, `mod-b.css`, `mod-c.css`), `demo/web/src/screens/areas.js` (índice
`#areas`) · reescreve `demo/web/src/modules/producao.js`, `manutencao.js`, `comercial.js`,
`qualidade.js`, `marketing.js`, `portal.js` · apaga `demo/web/src/modules/integracoes.js` e
`seguranca.js` **depois** que A copiar o conteúdo para Como funciona.

- **P0:** `area-page.js`; Produção, Manutenção (as duas da história, com "Registros da equipe" e o selo
  "n registros" na lista) e Comercial (3 abas, gavetas com ações que abrem a conversa); índice
  `#areas`; listas sem rolagem horizontal em 390 px.
- **P1:** Qualidade (com rascunho de 8D em streaming na gaveta, usando `ctx.renderMarkdown`); Portal
  simplificado; Marketing.
- **P2:** conferência de especificação como ação na gaveta do produto; "Montar proposta" com as
  regras comerciais.

### 7.4 Contrato entre pacotes (o `ctx`)

A monta e entrega; B e C só consomem. Tudo além do `ctx` da v1 (PLANO §5.2), que continua:

```js
ctx.demo            // { id, nome, setor, empresa_nome, modulos }
ctx.ia              // { disponivel, modelo }   (não mostrar ao prospect)
ctx.autor()         // nome salvo ou "Você"
ctx.api             // de api.js (A):
                    //   entrar(id, senha) · estado(id)
                    //   aprendizado.criar(id, item) → {item} · aprendizado.apagar(id, itemId)
                    //   conversa(id, {mensagens|estado, modulo, perfil}, {onTexto, onFerramenta,
                    //            onAprendizado, signal}) → Promise<{texto, fontes, continuar, estado}>
                    //   erros: ApiError {status, mensagem}
ctx.learning        // de learning.js (B), instanciado por A com a lista do /estado:
                    //   list({area?, maquina?}) · add(item) · remove(id) · subscribe(fn) → unsubscribe
ctx.perguntar(texto, { modulo, perfil, enviar = true })   // abre #conversa (ou o painel de área quando
                    //   chamado com {painel:true}) e envia; implementado em conversa.js (B), exposto por A
ctx.ensinar({ area, maquina, tipo, origem })              // abre a gaveta Ensinar (B), exposto por A
ctx.renderMarkdown(texto, { ctx }) → Node                 // de markdown.js (B)
ctx.sheet({ titulo, corpo, acoes, lado }) → { el, close } // de ui.js (A)
ctx.openRef(ref)    // A; gavetas por tipo vêm de C (registro em ui/area-page.js:
                    //   export const drawers = { op, os, maq, nc, pedido, cliente, rep, sku, doc, saber,
                    //   kpi, aprendizado } — B entrega doc/saber/kpi/aprendizado em cerebro.js e
                    //   exporta `drawersCerebro`; A junta os dois mapas)
```

Eventos de estado: `learning.subscribe` é o único caminho para o contador do Cérebro (A), a faixa
"Registrado pela equipe" e os selos (C) e a 4ª sugestão do Início (B) se atualizarem sem recarregar.

### 7.5 Ordem sugerida e verificação

1. Dia 1: A entrega tokens + `ui.js` novos + `api.js` com stub (resposta fixa em SSE falso) em
   poucas horas; B e C começam com o stub.
2. B fecha a conversa e o Ensinar; C fecha Produção e Manutenção; A fecha senha, casca e admin.
3. Integração: roteiro da §2 de ponta a ponta nos 8 setores (âncora: a máquina em alerta), com e sem
   `ANTHROPIC_API_KEY`, em 1440 e 390 px, claro e escuro, `prefers-reduced-motion`, e com os 3 presets
   de módulos (nenhuma rota, cartão, sugestão ou fonte de módulo desligado pode aparecer).
4. Critérios de aceite visuais: Início 1440×900 com pergunta, sugestões e o topo de "Hoje" na 1ª
   dobra; nenhum `*` literal em resposta; nenhuma rolagem horizontal em 360/390 px; nenhum fundo rosa
   em linha de lista; um botão primário por tela.
