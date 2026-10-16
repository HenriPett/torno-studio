# Gate preparado para o primeiro artigo real

**Estado:** aguardando hash do artefato, snapshot imutável, URL do preview, caminho e `content_id` do artigo autorizado. Nenhum artigo foi validado ou liberado por este documento.

## Pré-condição editorial e de release

1. Conferir `content_id`, intenção, idioma e path no registro editorial atualizado. O histórico atual mantém `torno-artigo-pt-20261014-planilhas` em `hold_cannibalization`; esse registro não é elegível sem nova decisão explícita e evidência de aprovação. Não inferir aprovação a partir de preview HTTP 200.
2. No snapshot exato do hash entregue, conferir `source-sha256.json`, `artifact-sha256.json`, `.astro/blog-manifest.json` e a aprovação de release: `contentId`, `locale`, `path`, `contentRevision` SHA-256 do Markdown exato, `approvedBy` e `approvedAt`. Sem autorização ou divergência, **HOLD** mesmo se houver HTML no preview.
3. O candidato precisa ter `status: approved` ou `published`, `release_approved_by/at/evidence` reais e o instante congelado do build. `draft`, `review`, `hold_cannibalization`, `retired`, `no_go`, futuro e versões sem aprovação continuam fora do HTML, índice, sitemap, schema e alternates. Não usar fixture privada como autorização.

## Verificação do preview autorizado

- HTTP 200 do artigo e do índice do idioma; `X-Robots-Tag: noindex` no preview, canonical absoluto para a rota final de produção, `title`, description, H1 único, `lang`, breadcrumb, link do índice para o artigo e retorno ao índice.
- Sitemap com as 18 URLs do release de estrutura mais apenas as rotas aprovadas do novo artefato. Nenhuma URL de `draft`/`hold`/`no_go`; alternates apenas para traduções realmente aprovadas e equivalentes. Se o primeiro artigo for somente PT, sem EN ou `x-default` inventado.
- JSON-LD de página/artigo verdadeiro, sem `author` se a autoria foi deliberadamente omitida; sem `datePublished`/`dateModified` nem `<time>` de publicação/atualização quando as datas reais forem nulas/desconhecidas. Sem `Person`, `Organization`, publisher ou data do build como fallback. Se uma data existir, confrontar valor exato e evidência editorial.
- Conferir `claims_and_sources` item a item: classe FATO/ESTIMATIVA/HIPÓTESE, afirmação, referência, entidade, data de conferência e limite. Abrir as fontes citadas, verificar HTTP e se sustentam a frase/qualificação; registrar bloqueios 403/429 como **sem prova**, não como PASS. Conferir links internos renderizados e seus destinos/fragments, inclusive links Markdown para conteúdo não autorizado.
- Portal em 360/390 px, claro/escuro: leitura, imagens, tabela/código se existirem, CTA, ausência de overflow da página, foco visível e ordem de teclado. Chromium Playwright/Lighthouse só se o ambiente passar a executá-los; não declarar escore >=95 sem medição.

## Saída esperada

Gate **PASS/HOLD** vinculado a `deployId`, source/artifact hash e URL do preview, com saída real dos comandos e capturas. Preview aprovado não equivale a publicação; canonical/noindex e HTTP da URL final exigem nova verificação após promoção.
