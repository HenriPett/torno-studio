# Respostas editoriais por página — 29/10/2026

## Implementação

- `src/content/seo/page-answers.ts`: pergunta e parágrafo próprios para as dez rotas solicitadas, em PT-BR e EN. Tipagem exige os dois idiomas e restringe as chaves às rotas atendidas.
- `src/components/seo/PageAnswer.astro`: HTML estático, `section` identificada por `aria-labelledby`, H2 e parágrafo. Sem JavaScript ou dados estruturados novos.
- Tipografia e espaçamento usam os tokens existentes: `h3`, `body`, `--text-lg`, `--weight-semibold`, `--leading-snug`, `--measure`, `--space-3`, `--space-5` e `--color-text-muted`. Sem cartão, ilustração, cor nova ou espaçamento de seção inteira. A home usa o container existente; as outras páginas aproveitam o container do conteúdo.
- Os textos não mencionam GEO, IA ou agentes, nem acrescentam resultados quantitativos, preços, credenciais ou localização. A identidade da organização vem de `site.organizationName`.
- Alterações nos seis componentes existentes se limitam a imports, chamadas do componente e mapeamento tipado dos três slugs de cases. Nenhuma alteração desta tarefa em Base, Footer, blog, rotas, scripts ou testes. Outros agentes trabalham na mesma cópia; arquivos deles foram preservados.

## Escolhas de conteúdo e posição

| Rota | Conteúdo resumido em PT e EN | Posição | Fonte local lida |
| --- | --- | --- | --- |
| `home` | Software sob medida, público, escopo e execução direta com Henrique. EN mantém foco em founders sem CTO. | Após o Hero completo, preservando CTA e painel de preços. | `src/content/pt-BR.ts`, `src/content/en.ts`, `src/components/sections/Hero.astro` |
| `about` | Quem conduz o estúdio, contato direto e natureza das experiências apresentadas. | Após o H1. | `src/components/TrustPage.astro`, `src/config/site.ts` |
| `contact` | Canal inicial e informações úteis sobre fluxo, usuários, sistemas e falha observada. | Após o H1. | `src/components/TrustPage.astro` |
| `privacy` | Controle de Medição/Publicidade, preferências no rodapé, agenda externa sem Medição e canal para pedidos sobre dados. | Após título e data, antes das seções da política. | Blocos `privacy` de `src/content/pt-BR.ts` e `src/content/en.ts`, `src/components/PrivacyPage.astro` |
| `recovery` | Fluxo bloqueado, acesso autorizado, preservação do que funciona e escopo antes da execução. | Fim do conteúdo do hero, depois dos CTAs, limite do diagnóstico e apresentação de Henrique. | `src/content/seo/commercial.ts`, `src/components/seo/CommercialPage.astro` |
| `lovableProduction` | Protótipo aproveitável, aceite, correções e verificação de acesso, fluxo, integrações e operação. | Mesmo slot comercial, após os CTAs. | `src/content/seo/commercial.ts`, `src/components/seo/CommercialPage.astro` |
| `rlsGuide` | Associações e permissões por perfil, testes permitidos/negados e limite do exemplo SQL. | Após a introdução, antes do sumário. | `src/components/seo-guide/content.ts`, `src/components/seo-guide/RlsGuide.astro` |
| `caseLoopt` | Conectar modelo, produto e decisões do pátio; experiência anterior ao estúdio. | Após a introdução, antes dos fatos e navegação do case. | `src/content/cases.ts`, currículo e portfólio do fundador |
| `caseAscende` | Entrada em linguagem natural, registros revisáveis e construção até publicação; produto próprio e limite da evidência. | Mesmo slot dos cases. | `src/content/cases.ts`, portfólio e página pública do produto |
| `caseBomCapital` | Conectar sistema de carteira, análise e processo operacional; relato profissional sem publicação externa. | Mesmo slot dos cases. | `src/content/cases.ts`, currículo e portfólio do fundador |

As fontes do projeto foram consultadas antes da redação. O material de `projeto-50k/base/` fornece contexto do fundador; os textos atuais de cada página determinam o recorte editorial. Os resumos preservam a diferença entre experiência anterior ao estúdio e produto próprio. Não repetem os números dos gráficos nem os atribuem ao trabalho individual.

## Verificações realizadas

- [FATO] Primeiro `PUBLIC_SITE_BRAND=Torno npm run build`: passou, com `astro check` sem erros, warnings ou hints, e geração estática concluída. Log temporário: `/private/tmp/torno-pages-build.log`. Variáveis locais de agenda, contato e identificação legal estavam ausentes; houve os avisos de configuração previstos para desenvolvimento.
- [FATO] Inspeção do HTML desse build: vinte páginas com exatamente um bloco, pergunta em H2, parágrafo e vínculo `aria-labelledby`; um único H1 por página; CTAs de home e comerciais anteriores ao resumo. Diagnóstico e 404 mantiveram `noindex` e não receberam o bloco.
- [FATO] Verificação no portal Maestri: vinte URLs × larguras de 360 e 1280 px, total de quarenta combinações. Nenhum overflow horizontal; exatamente um bloco em cada página; CTAs de home e comerciais anteriores ao resumo. Altura máxima observada do bloco: 306 px no mobile e 193 px no desktop, com o texto final servido pelo dev server. Registro temporário: `/private/tmp/torno-pages-qa.json`.
- [FATO] Capturas revisadas de home, privacidade e guia confirmam a coluna de leitura, contraste e hierarquia existentes, sem criar uma seção visual dominante. Também foram capturados os blocos comercial e de Ascende nos dois tamanhos.
- [FATO] `git diff --check` dos seis componentes existentes: passou. Nenhum teste foi criado ou alterado.
- [FATO] Chromium do Playwright não iniciou por restrição do ambiente (`MachPortRendezvousServer`, `Permission denied`). A verificação de navegador foi feita no portal Maestri, conforme a skill de portal.
- [FATO] Um segundo build, iniciado antes do pedido de exclusividade do integrador, terminou com código 1 no hook `blog-link-guard`: `[blog-maintenance] figure placement changed`. Log temporário: `/private/tmp/torno-pages-build-final.log`. Não é registrado como validação final aprovada. Não houve tentativa de corrigir arquivos fora da posse.
- [FATO] Após o pedido de liberação, a sessão do segundo build já estava encerrada. O servidor de desenvolvimento desta tarefa, porta 4337, foi encerrado. Nenhum novo build/preview será iniciado nesta cópia; a validação integrada de `dist/` fica com Claude Code. Sem commit ou publicação.

## Fontes

1. Conteúdo e fontes locais: arquivos indicados na tabela, lidos em 29/10/2026; contexto em `/Users/henriquepett/Downloads/pessoal/projeto-50k/base/`.
2. [Loopt — site público](https://loopt.com.br/), acesso em 29/10/2026. A extração Web não retornou linhas legíveis; o recorte do resumo usa o histórico profissional já publicado no case.
3. [MundoLogística — Loopt aplica IA em terminais de contêineres](https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres), publicação em 13/01/2026, acesso em 29/10/2026. Contextualiza o produto; os números da matéria não foram incluídos nos novos blocos.
4. [Ascende — página pública](https://ascende.site/), acesso em 29/10/2026 por HTTP; extração Web indisponível. Conferidos registro por frase e revisão antes de confirmar; não foram acessadas contas pessoais.
5. [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), acesso em 29/10/2026; referência primária do guia existente.
6. [PostgreSQL — Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html), acesso em 29/10/2026; referência primária do guia existente.
7. [Lovable — Security overview](https://docs.lovable.dev/features/security), acesso em 29/10/2026; contexto da página comercial e do guia. Nenhuma nova promessa de cobertura de segurança foi acrescentada.
8. [Skill Maestri local](/Users/henriquepett/.agents/skills/maestri/SKILL.md) e [skill de portal local](/Users/henriquepett/.agents/skills/maestri-portal/SKILL.md), lidas em 29/10/2026. Comunicação final autorizada pelo usuário: `maestri ask "Claude Code" "<resultado>"`.

## Lacunas e riscos

- A validação do artefato integrado de produção depende do integrador; os builds locais de preview desta tarefa não substituem esse gate.
- O guia continua limitado a uma demonstração SQL. O novo resumo explicita a necessidade de testar a API e as demais partes da aplicação.
- Bom.Capital permanece relato profissional, sem fonte pública de resultados; Ascende permanece produto próprio, sem auditoria dos fluxos autenticados neste case.
- As capturas e logs auxiliares estão em diretórios temporários. O portal de QA permanece no canvas, apontando para o servidor local já encerrado.
