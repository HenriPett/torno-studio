# BLOG-TORNO-20261014 — plano de QA independente

Responsável: Afinador. Estado: contratos Trilha/Mote e arquitetura lidos; GO de implementação recebido. Suítes independentes preparadas, aguardando artefato de build e interface privada implementada. Não é aprovação de publicação.

## Contrato consolidado

- Índices `/blog/` e `/en/blog/`; artigos estáticos `/blog/[slug]/` e `/en/blog/[slug]/`.
- Campos `title`, `description`, `canonical`, `slug`, `intent`, `locale`, `sources`, `autoria`, `publishedAt`, `updatedAt`, `status`; `translationKey` opcional e relações explícitas.
- Um filtro único: `approved` com liberação explícita para o artefato, ou `published` com evidência, respeitando `notBefore` e instante congelado do build. Draft, review, approved isolado, hold, retired, no_go e futuro ausentes de HTML, listagem, sitemap, schema e alternates, inclusive em preview público.
- Fixture exclusivamente em `/private/tmp/torno-blog-fixtures-20261014/`, fora de `src/`, `public/` e `dist/`; nenhuma fixture pública.
- Este release tem zero artigos públicos. Índices exibem estado vazio verdadeiro, `CollectionPage` sem item e nenhum `BlogPosting` fictício. Canonical self; alternates só para traduções reais; sitemap só para URLs geradas elegíveis.
- Primeiro artefato de um artigo `approved` não inventa `datePublished`: sem prova da primeira publicação, schema `WebPage`, sem data editorial fictícia. `published` pode igualmente não ter data exata comprovada; nunca preencher pelo relógio do build.
- Preservar seis cases, SEO, retrato, ofertas, Edge e consentimento. Verificar zero intenção duplicada das três páginas especializadas PT/EN.

## Limites de trabalho

- Arquivos sob minha edição: `scripts/test-blog*` e `docs/qa/blog-20261014/**`.
- Não editar `src/`, testes antigos, configuração compartilhada ou conteúdo público. Não publicar.
- A árvore está compartilhada e contém mudanças alheias em andamento; preservar tudo.
- Não inferir que Playwright de navegador funciona porque o pacote e o binário estão instalados. A tentativa real falhou; ver `BASELINE.md`.

## Matriz de aceite a executar quando o contrato chegar

| Área | Verificação e critério |
| --- | --- |
| Seis cases | Regressão das seis rotas PT/EN de Loopt, Bom.Capital e Ascende: HTTP 200, conteúdo principal, metadados, pares de idioma, retrato/imagens com texto alternativo e ofertas/CTAs corretos. Comparar com baseline antes de atribuir regressão ao blog. |
| Listagem vazia | Rotas PT/EN, estado vazio legível e navegável, sem `<article>` ou `Article`/`BlogPosting` JSON-LD fictício; `Blog`/`CollectionPage` somente conforme contrato final. |
| Fixture não pública | Um artigo de teste exclusivamente local/preview, sem publicação no domínio, sitemap ou links públicos; exercitar rendering PT/EN, metadados, links e navegação. Confirmar isolamento pelo desenho da Trilha antes de criar fixture. |
| Publicação/draft | Matrizes draft/review/approved isolado/approved liberado/published/hold/retired/no_go, data futura/atual, PT sem EN ou vice-versa, slug e dados ausentes. Verificar mesmo filtro em HTML, listagem, sitemap, schema e alternates no instante congelado do build, também em preview público. |
| SEO | Canonical absoluto limpo, title/description, OG/Twitter, JSON-LD por tipo de página, `lang`, `hreflang` recíproco e `x-default`, status e robots; preview `noindex`, produção indexável somente onde autorizado. |
| Integração de rotas | Cruzar `src/config/routes.mjs`, `src/layouts/Base.astro`, i18n e `astro.config.mjs`: toda rota de blog existente aparece no sitemap uma vez, cada alternância resolve 200, e nenhuma rota draft/fixture aparece. O filtro atual do sitemap usa exclusivamente o mapa `routes`; validar a inclusão real das novas rotas. |
| Links/i18n | Descoberta pelo menu/rodapé conforme contrato, retorno, back do navegador, destino dos CTAs, PT/EN sem mistura de idioma, URLs relativas corretas, links sem 404. |
| Mobile e a11y | 320/360/390/768/1440 px; sem overflow ou corte, retrato legível, headings e landmarks, foco/teclado, texto alternativo, contraste e axe quando houver navegador executável. Usar portal para inspeção real onde Playwright estiver bloqueado. |
| Lighthouse | Alvo >=95 nas categorias acordadas para páginas de blog em mobile e desktop. Registrar versão, URL e relatório real; sem execução não afirmar escore. |
| Bordas | Texto vazio/longo, acentos/Unicode, caracteres especiais em título/slug, imagem ausente, links quebrados, reload/back, duplo clique, rede lenta e navegação com JS indisponível, conforme superfícies que o contrato expuser. |
| Intenção editorial | Nenhum artigo ou card de blog compete com a intenção das três páginas especializadas PT/EN; conferir títulos, descrições, links e taxonomy contra a spec do Timbre. |
| Validação fechada | Data ISO com timezone e calendário válidos, intenção reservada ou duplicada, slug/canonical/contentId duplicado, relação de tradução com intenção/escopo diferente, autor ou aprovação ausente, Markdown para draft/futuro e fragmento inexistente devem falhar build privado, sem artefato parcial. |

## Estratégia de execução

1. Congelar contrato e URLs esperadas; pedir ao Compasso apenas esclarecimentos de ambiguidade, sem delegar trabalho.
2. Suíte independente em `scripts/test-blog*`, com checks de release, preview HTTP e build de fixture. Não mudar `tests/qa/seo.spec.ts` nem a expectativa antiga de 10 URLs cegamente: ela já está desatualizada frente às 16 URLs da produção atual.
3. Rodar build/check em artefato isolado quando a integração estiver pronta, e executar os testes com saída preservada neste diretório. Testes com navegador só contam se o launch funcionar; caso contrário, revisar via Maestri Portal e marcar a lacuna.
4. Para cada bug: passos exatos, esperado, obtido, severidade, evidência e dono. UI para Ritmo; configuração/rotas/SEO para Compasso; contrato editorial para Trilha/Farol por intermédio do Batuta.
5. Reportar resultado ao Batuta com `maestri ask "Batuta" "<resultado>"`.

## Comandos de QA

```sh
node scripts/test-blog-release.mjs /CAMINHO/DO/ARTEFATO/dist
node scripts/test-blog-integrity.mjs /CAMINHO/DO/SNAPSHOT
node scripts/test-blog-preview.mjs https://PREVIEW
python3 /private/tmp/torno-blog-build.py --fixture-dir /private/tmp/torno-blog-fixtures-20261014 --build-at 2026-10-14T20:00:00Z --output /private/tmp/torno-blog-qa-20261014
node scripts/test-blog-fixture.mjs /private/tmp/torno-blog-qa-20261014/dist /private/tmp/torno-blog-fixtures-20261014/expected.json
node scripts/test-blog-negative.mjs
```

O comando de fixture é previsto pela arquitetura; só deve rodar após o wrapper existir. Esse artefato privado traz `PRIVATE_FIXTURE_DO_NOT_DEPLOY`. O script de fixture lê, não copia para `src/public/dist` nem publica.

## Gatilhos pendentes

- Artefato de build do Compasso, wrapper privado e preview para revisão.
- Resultado de testes negativos da fixture (schema e links Markdown), hashes de artefato e Edge preservados.
