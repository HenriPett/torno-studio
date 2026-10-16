# ERP r5 final — QA independente do draft

**Gate: PASS** para o draft `6ad1050ef939dfae3e05a7f7`, snapshot `/private/tmp/torno-blog-release-erp-20261015-r5-final`. Sem promoção ou edição de código.

- Fonte SHA256 `fad21f4e25183eea28301bb221ebd6ef20755e6e43f6fd4b513231c6d4dd0922`; artefato `d0d5e75004bef6713ffd5199f935cc09fec073a125867c87e770d6b44db71fca`; aprovação `632d64f2503b430ae27e9d7581234c9533e03a21020b9d70af0e3b81f6a91535` (build-meta/preview receipts).
- Auditoria HTTP independente: **11/11 PASS**. Artigo, dois anteriores, seis cases PT/EN, índices PT/EN e home retornaram 200, canonical self de produção, `X-Robots-Tag: noindex` no draft e bytes iguais ao `dist`. Os oito HTML protegidos também foram iguais byte a byte à produção atual. Título, descrição, H1 único, schema BlogPosting sem author/date/byline, duas figuras, alt/legendas, links internos/fontes/CTA conferidos. Nenhum fetch das fontes externas foi feito.
- SVGs extraídos do HTML: `/_astro/integracao-erp-fluxo.CJXjnJ5K_Z1O1Dlw.svg` 200 `image/svg+xml`, 2062 bytes, SHA256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c`; `/_astro/integracao-erp-pendencias.CUPyqtvX_Z1O1Dlw.svg` 200 `image/svg+xml`, 2079 bytes, SHA256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`. Ambos correspondem ao manifesto do artefato.
- Sitemap do draft: 21 URLs únicas, as 20 de produção mais a URL ERP; sitemap de produção permanece com 20, sem ERP. Recibos de deploy/preview mostram Edge `true` e bundle hash `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`.

## Medição visual real

Chrome em tema **claro**, viewport com scrollbar vertical: `320→305` px de área útil, ambas imagens/legendas `288` px; `360→345`, ambas `328` px; `390→375`, ambas aproximadamente `341` px. Em 360 sem scrollbar (`height:10000`), ambas imagens/legendas continuaram `328` px. Em 1280, ambas imagens ficaram limitadas a `480` px. As legendas renderizaram a `14px`, `scrollWidth == clientWidth` em 320/360/390 e o documento teve `scrollWidth == clientWidth` em todos os tamanhos medidos; nenhum clipping/overflow horizontal foi observado. O portal Maestri confirmou independentemente 320=`288`, 360=`328`, 390=`339` para as duas figuras, com capturas visuais das duas em 320 e da primeira em 360. Timbre informou visual PASS do r5.

A segunda imagem estava fora da viewport no primeiro instante de medição do Chrome e `naturalWidth` ainda era zero por lazy loading; seu HTTP 200 e SHA foram verificados à parte e ela apareceu na revisão visual do portal. Não houve medição de Lighthouse nesta rodada focada. A produção ainda não contém o artigo ERP; promoção e QA pós-produção são etapas posteriores.

Evidências brutas: [log HTTP](erp-preview-r5-http-20261015.log) e [JSON HTTP](erp-preview-r5-http-20261015.json). O HOLD r4 foi causado por 311 px em 360; o r5 mediu 328 px no mesmo breakpoint.
