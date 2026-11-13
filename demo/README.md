# Torno Demo

Demonstração navegável da oferta da Torno para indústrias: cérebro da operação, agentes por área e
software sob medida, com **dados 100% fictícios** de oito setores. Serve para reuniões com
prospects: escolhe-se o setor do cliente, ligam-se só os módulos que interessam e mostra-se a
demo funcionando, com ou sem IA real.

- Sem etapa de build: HTML, módulos ES e JSON. Roda em qualquer servidor estático.
- Publicada como Artifact privado do claude.ai (o "link aleatório").
- Fica fora do site: o Astro não lê `demo/` (o `tsconfig.json` exclui a pasta).

## Rodar localmente

```bash
node demo/scripts/serve.mjs 4400     # http://localhost:4400
node demo/scripts/validate.mjs       # valida os 8 pacotes de dados
```

Fora do claude.ai não existe `window.claude`: a demo entra em **modo local** (config no
localStorage, admin liberado, assistente no roteiro determinístico).

## Como usar numa reunião

| Quero… | Faça |
|---|---|
| Mostrar outro setor | Seletor **Setor** no topo (vale só para a sua sessão) ou abra o link com `#textil`, `#alimentos`, `#plasticos`, `#maquinas`, `#metalmecanica`, `#moveis`, `#eletroeletronicos`, `#autopecas` |
| Deixar a demo pronta para um cliente | `#admin` → setor, nome exibido da empresa e módulos → **Salvar**. Vale para todo mundo que abrir o link |
| Trocar de cenário rápido | `#admin` → **Perfis de demo**: salve a configuração atual com um nome (ex.: "Têxtil — só comercial e PCP") e aplique antes da reunião |
| Esconder um módulo | `#admin` → desligue. Some do menu, a rota volta para a visão geral e o assistente deixa de usar e citar os dados dele |

O admin só aparece para quem pode editar o Artifact (`user.canEdit()`); quem só tem o link vê a demo.

## Arquitetura

```
demo/
  index.html, styles.css, css/      casca e estilos (tokens da Torno, claro/escuro, celular)
  data/sectors.json                 índice dos setores
  data/<setor>.json                 pacote fictício do setor (esquema em PLANO.md §3 e data/schema.md)
  src/app.js, state.js              boot, roteador (#rota), casca, gaveta de detalhes
  src/features.js                   registro de módulos (id, nome, ícone, rota, dependências)
  src/config.js                     config padrão, perfis de demo, dependências
  src/admin.js                      tela #admin
  src/ui.js, format.js              componentes e formatação pt-BR
  src/modules/<id>.js               uma tela por módulo: export function render(el, ctx)
  src/ai/                           ferramentas sobre os dados, motor local e orquestração do assistente
  src/ui/chat.js                    painel de conversa com fontes (padrão, WhatsApp, celular)
  src/adapters/
    data-source.js                  DataSource: de onde vêm os dados   (hoje: JSON fictício)
    config-store.js                 ConfigStore: onde fica a config      (hoje: db do Artifact ou localStorage)
    ai-provider.js                  AIProvider: quem responde            (hoje: capacidade sample ou roteiro local)
  scripts/serve.mjs, validate.mjs
```

Três camadas separadas, para que a mesma tela sirva a demo e um cliente real:

1. **Dados** (`DataSource`). As telas e o assistente só leem o objeto do setor no formato do
   esquema. Trocar o JSON por conectores reais (ERP, MES, pasta de documentos, e-mail) é escrever
   outra implementação de `loadSector()` que devolve o mesmo formato.
2. **Config** (`features.js` + `ConfigStore`). Quais módulos existem, quais estão ligados, setor e
   nome exibido. Num cliente real vira a config do tenant.
3. **IA** (`AIProvider`). Na demo, a capacidade `sample` do claude.ai responde usando ferramentas
   (tools) que consultam o pacote do setor; sem ela, o motor local responde com perguntas
   sugeridas pré-calculadas, consultas por ID e busca por palavra-chave. Num cliente real, troca-se
   por uma API própria (Claude via API, na nuvem aprovada pela TI do cliente) com as mesmas tools.

### O assistente

- Ferramentas por módulo (`src/ai/tools.js`): buscar documentos, ordens, turnos, NCs, manutenção,
  pedidos, estoque e preço, clientes e representantes, regras comerciais, KPIs, saberes,
  integrações, perfis e registro de uso. Só entram as dos módulos ligados e, no Cérebro, só os
  documentos que o perfil escolhido em "Ver como" pode ver.
- Toda resposta cita fontes (`tipo:id`, ex.: `op:OP-24518`, `doc:DOC-PRO-012#t1`), que viram chips
  clicáveis e abrem o registro na gaveta lateral.
- **Funciona 100% sem IA real.** Se `sample` não existir (visitante de fora da organização,
  servidor local) ou for negada, o roteiro local responde e a interface mostra "Roteiro local".

## Adicionar um setor

1. Copie um pacote parecido para `data/<novo>.json` e reescreva os dados seguindo `PLANO.md` §3
   (vocabulário, nomes de área, KPIs e documentos no jargão do setor; tudo fictício).
2. Acrescente `{ "id", "nome", "arquivo" }` em `data/sectors.json`.
3. `node demo/scripts/validate.mjs <novo>` até zerar os erros (inclui referências cruzadas e fontes).
4. O seletor, o admin e a rota `#<novo>` passam a oferecer o setor sozinhos.

## Adicionar um módulo

1. Registre em `src/features.js`: `{ id, nome, icone, rota, depende, descricao, oferta }`.
2. Crie `src/modules/<id>.js` com `export function render(el, ctx)` usando `ctx.data`,
   `ctx.term()`, `ctx.areaName()`, os componentes de `src/ui.js` e, se quiser conversa,
   `chatPanel({ ctx, modulo: '<id>' })`. Estilos em `css/` com prefixo próprio, só com os tokens.
3. Se tiver dados novos: amplie o esquema (PLANO.md §3), o validador e os pacotes; se o
   assistente deve consultá-los, crie a tool em `src/ai/tools.js` marcada com o módulo e,
   se fizer sentido, `perguntas_sugeridas` com `modulo: '<id>'`.
4. O admin lista o módulo automaticamente.

## Subir para um cliente real

1. Fork da pasta para um repositório do cliente (ver abaixo). Remova os setores que não usa.
2. Escreva um `DataSource` que lê dos sistemas do cliente (ERP, MES, documentos) e devolve o formato
   do esquema; comece por um export noturno em JSON e evolua para consultas sob demanda.
3. Troque `SampleProvider` por um provedor que chama uma API própria (servidor do cliente com
   Claude via API e as mesmas tools rodando no backend, com permissão por perfil aplicada no servidor).
4. Troque o `ConfigStore` pelo banco do cliente e a checagem de admin pelo login dele (SSO).
5. Deixe ligados só os módulos contratados no admin ou fixe a config no código.
6. Tire a faixa "Dados fictícios" só quando os dados forem reais.

## Mover para um repositório próprio

A pasta é autocontida (nenhum import aponta para fora dela):

```bash
git subtree split --prefix=demo -b demo-only          # histórico só da demo
git push git@github.com:<conta>/torno-demo.git demo-only:main
# ou, sem histórico: copie a pasta demo/ para a raiz do novo repositório
```

Depois, remova `demo/` deste repositório e a entrada `"demo"` do `exclude` em `tsconfig.json`.
Para hospedar fora do claude.ai (Netlify, GitHub Pages), publique a pasta como site estático; a
config cai no modo local até existir um `ConfigStore` com backend.

## Honestidade

Empresas, pessoas, clientes, números e documentos são inventados para demonstração. Nenhuma
empresa real aparece como cliente; sistemas aparecem com nomes genéricos ("ERP (ex.: TOTVS)") sem
afirmar parceria. Indicadores da demo não são resultados de projeto.
