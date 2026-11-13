# Torno Demo

Demo privada da oferta da Torno para indústrias, dentro do site: **tornostudio.com/demo/&lt;id&gt;**, com
senha por link, gerada sob demanda no **tornostudio.com/admin**. Oito setores com dados 100% fictícios
(base de conhecimento pré-setada), IA de verdade que consulta esses dados e **aprende com o que o
visitante registra**, e as áreas da empresa (Produção, Qualidade, Manutenção, Comercial, Marketing,
Portal do cliente) no mesmo formato leve.

- Não indexada: `X-Robots-Tag: noindex` nas rotas da demo, `meta robots`, fora do sitemap, nenhum link
  no site, conteúdo só depois da senha.
- Sem etapa de build própria: `demo/web` é HTML + módulos ES; o build do Astro copia para `dist/demo-app/`
  (`scripts/demo-app.mjs`) e a Netlify Function `netlify/functions/demo-api.mjs` serve a API.
- Documentos de projeto: `PLANO-V2.md` (arquitetura e API), `UX.md` (spec de UX), `server/README.md`
  (servidor), `PLANO.md` (v1, histórico).

## Colocar no ar (uma vez)

Na Netlify → Site configuration → Environment variables, crie:

| Variável | Valor |
|---|---|
| `DEMO_ADMIN_PASSWORD` | a sua senha do /admin |
| `DEMO_SESSION_SECRET` | 32+ caracteres aleatórios (`openssl rand -base64 48`) |
| `ANTHROPIC_API_KEY` | chave da API da Anthropic (sem ela a demo responde pelo roteiro local) |

Opcionais: `DEMO_MODEL` (padrão `claude-sonnet-5-5`), `DEMO_DAILY_MESSAGES` (padrão 200 por demo por dia).
O armazenamento (Netlify Blobs, store `torno-demos`) se cria sozinho. Depois do deploy, abra `/admin`.

## Usar

1. `/admin` → **Novo link**: nome do prospect, setor, preset de módulos (Completa, Comercial e PCP,
   Qualidade e manutenção ou Personalizar), senha gerada ou digitada.
2. Copie o link e a senha (ou a **mensagem pronta**) e mande ao prospect. A senha só aparece na criação;
   se perder, gere uma nova (derruba quem estava dentro).
3. Acompanhe acessos, último acesso e o que o prospect registrou. Desative, renove a senha, zere o
   aprendizado para reaproveitar o link, ou apague.

Na reunião, o caminho que mais impressiona: **pergunte** (resposta com fontes) → **Ensinar** algo que só a
equipe sabe → **Perguntar sobre isso** → a resposta passa a citar o registro ("Registrado por … · agora"),
que também aparece no Cérebro e na página da área.

## Rodar localmente

```bash
DEMO_ADMIN_PASSWORD=admin-dev node demo/scripts/serve.mjs 4400   # http://localhost:4400/admin
node demo/server/test.mjs                                          # API e motor local (48 testes)
node demo/web/src/ui/markdown.test.mjs                             # Markdown das respostas
node demo/scripts/validate.mjs                                     # 8 pacotes de dados
```

Com `ANTHROPIC_API_KEY` no ambiente, a conversa usa a IA real também em dev.

## Arquitetura

```
demo/
  web/              navegador: casca, tela de senha, admin, Início, conversa, Cérebro, áreas, Portal
    src/api.js      cliente da API (SSE da conversa com rodadas)
    src/ui/         markdown, conversa, fontes, ensinar, páginas de área
    src/ai/local-engine.js   motor determinístico (roda no servidor quando não há chave)
  data/             pacotes fictícios dos 8 setores + validador
  server/           API: auth, store (Blobs/arquivo), demos, aprendizado, IA com ferramentas
  scripts/          serve.mjs (dev), validate.mjs
netlify/functions/demo-api.mjs   /api/demo/*, /api/admin/*
scripts/demo-app.mjs             copia demo/web para dist/demo-app no build
```

Separação para replicar num cliente real:

1. **Dados**: hoje `server/catalogo.mjs` importa `data/<setor>.json`. Num cliente, troque por conectores
   (ERP, MES, documentos) que devolvem o mesmo formato (`data/schema.md`).
2. **Config e acesso**: hoje uma demo por link com senha (Blobs). Num cliente, login da empresa (SSO) e
   permissões por perfil aplicadas no servidor.
3. **IA**: `server/ai.mjs` chama a API da Anthropic com as ferramentas de `server/tools.mjs`; o aprendizado
   vira a base de conhecimento viva da empresa (com revisão de quem é dono da área).

### Adicionar um setor ou um módulo

- Setor: crie `data/<novo>.json` (esquema em `data/schema.md`), registre em `data/sectors.json` e em
  `server/catalogo.mjs`, rode `node demo/scripts/validate.mjs <novo>`.
- Módulo: registre em `web/src/features.js` e `server/catalogo.mjs`, crie a tela em `web/src/modules/` com
  `areaPage()` de `web/src/ui/area-page.js`, e as ferramentas da IA em `server/tools.mjs`.

## Mover para um repositório próprio

`demo/` + `netlify/functions/demo-api.mjs` + `scripts/demo-app.mjs` formam a demo inteira. Para separar:
copie as três coisas para um repositório novo, troque a integração do Astro por uma cópia simples de
`demo/web` para a pasta publicada (ou publique `demo/web` direto, com `/demo-app/` apontando para ela), e
mantenha os redirects e headers do fim do `netlify.toml`. Depois apague `demo/`, a função, a integração e
esses blocos daqui.

## Honestidade

Empresas, pessoas, números e documentos são inventados e rotulados como fictícios. Nenhuma empresa real
aparece como cliente; sistemas aparecem como "ERP (ex.: TOTVS)" sem afirmar parceria. O que o visitante
registra fica só na demo dele e some quando a demo é apagada.
