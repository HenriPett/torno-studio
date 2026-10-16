# ERP r5 — QA independente pós-produção

**Gate: PASS** para produção `https://tornostudio.com/blog/integracao-erp-briefing-orcamento/`, deploy `6ad1050ef939dfae3e05a7f7`, publicado em `2026-10-15T17:02:29.286Z`. Sem edição ou nova promoção.

A auditoria HTTP independente executou **9/9 checks PASS**. Foram baixados da produção o artigo ERP, os dois artigos anteriores, os seis cases PT/EN, os dois índices de blog e a home: 12 HTML com HTTP 200, bytes idênticos ao `dist` congelado, canonical self de produção e nenhum header/meta `noindex`. Os oito HTML protegidos (dois artigos e seis cases) mantiveram seus bytes do artefato. O artigo ERP tem title/description exatos, H1 único, BlogPosting sem `author`, `datePublished` ou `dateModified`, sem byline/time, e nenhuma alternativa EN fictícia. Links do corpo para Omie, Bling, critérios de aceite e CTA foram conferidos no HTML; fontes externas não foram buscadas.

As duas figuras têm alt e legenda. Os SVGs extraídos do HTML foram baixados de produção: `/_astro/integracao-erp-fluxo.CJXjnJ5K_Z1O1Dlw.svg` HTTP 200 `image/svg+xml`, 2062 bytes, SHA256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c`; `/_astro/integracao-erp-pendencias.CUPyqtvX_Z1O1Dlw.svg` HTTP 200 `image/svg+xml`, 2079 bytes, SHA256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`. Ambos batem com os arquivos e hashes do manifesto do snapshot r5.

Sitemap de produção: 21 URLs únicas, preserva exatamente as 20 do snapshot de produção anterior e adiciona somente a URL ERP. O XML também bate com o manifesto do artefato r5. Recibo `production.json` vincula deploy, source `fad21f4e25183eea28301bb221ebd6ef20755e6e43f6fd4b513231c6d4dd0922`, artifact `d0d5e75004bef6713ffd5199f935cc09fec073a125867c87e770d6b44db71fca`, approval `632d64f2503b430ae27e9d7581234c9533e03a21020b9d70af0e3b81f6a91535`, Edge `true` e bundle hash `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`.

**Limite:** nesta rodada, Edge foi validado pelo recibo de produção hash-bound; os HTTP, bytes, hashes dos SVGs e sitemap foram medidos diretamente. A revisão mobile/visual pertence ao gate do draft r5, já PASS, e não foi repetida sem mudança de artefato.

Evidência bruta: [log](erp-production-r5-20261015.log) e [JSON](erp-production-r5-20261015.json).
