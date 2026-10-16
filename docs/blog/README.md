# Torno blog

O blog é uma coleção Astro de artigos em `src/content/blog/`. As cinco páginas abaixo foram observadas publicadas em produção em 16/10/2026 e estão incluídas com seus SVGs de runtime e aprovações vinculadas a hash. O último deploy reportado é `6ad2188019acbbe7b53eec26`, publicado em `2026-10-16T12:33:45.462Z`; o sitemap contém 23 URLs únicas (18 existentes antes do blog e cinco artigos).

| Artigo | URL | Idioma | Intenção editorial |
| --- | --- | --- | --- |
| Quando automatizar processos com planilhas? | `/blog/quando-automatizar-processos-planilhas/` | PT-BR | `spreadsheet-to-system-pt` |
| Critérios de aceite para MVP | `/blog/criterios-aceite-mvp/` | PT-BR | `software-vendor-choice-pt` |
| Integração com ERP: briefing para orçamento | `/blog/integracao-erp-briefing-orcamento/` | PT-BR | `erp-integration-prequote-brief-pt` |
| Antes de refazer um sistema: 7 evidências para decidir | `/blog/antes-de-refazer-sistema-evidencias/` | PT-BR | `existing-system-rebuild-evidence-pt` |
| Custo de manutenção de software após o lançamento | `/blog/custo-manutencao-software-apos-lancamento/` | PT-BR | `postlaunch-software-operating-cost-pt` |

Todos os artigos estão em português. Não existe versão em inglês aprovada; `/en/blog/` permanece vazio e não deve receber tradução inferida.

## Build e aprovação

`src/config/blog-release-approval.json` contém as decisões de inclusão vinculadas aos hashes dos artigos, caminhos e responsáveis registrados. `src/config/blog.mjs` aplica ainda uma allowlist exata de identidade, caminho, hash e assets. Uma edição do Markdown ou SVG precisa passar pelo fluxo editorial e receber novos hashes e aprovação; não altere as aprovações para acomodar uma edição sem a revisão correspondente.

O artigo de manutenção tem frontmatter originalmente incompleto e é deliberadamente preservado byte a byte. `src/config/blog-maintenance-sidecar.json` aplica os metadados e a posição da figura por um transformador restrito a esse artigo; `src/config/blog-maintenance.mjs` verifica o recibo, as fontes, o SVG e o sidecar pelos hashes antes do build. As evidências foram espelhadas em `docs/blog/editorial/` para que o repositório seja autossuficiente quando clonado.

Para validar a cópia local, use `npm run build` e `node scripts/test-blog-release.mjs`. O build gera as rotas e o sitemap a partir dos artigos aprovados. Confirme que o manifesto continua listando cinco artigos PT, que o índice EN continua vazio e que as URLs pré-existentes permanecem no sitemap.

## Conhecimento editorial

- `architecture-20261014.md` explica a arquitetura Astro e o fluxo de conteúdo.
- `design-20261014.md` contém as regras visuais do blog.
- `editorial/README.md` identifica as cópias de contrato, histórico, recibos e revisões e explica qual repositório mantém a fonte editorial canônica.
- `editorial/HISTORICO-INTENCAO-URL.md` preserva decisões de intenção, estado e URLs, inclusive pautas em HOLD.

Não publique rascunhos ou slugs apenas por frequência. Em particular, a pauta de custo de construção de MVP continua em HOLD; o artigo de manutenção pós-lançamento trata de outra intenção.
