# Blog tarde r3 — QA independente do draft

**Gate: PASS** para draft `6ad15581ccdee6d89b2ad52f`, snapshot `/private/tmp/torno-blog-release-tarde-20261015-r3`. Nenhuma edição de código ou promoção.

## HTTP e conteúdo

Auditoria HTTP independente: **11/11 PASS**. O artigo novo e outros 12 HTML (três artigos anteriores, seis cases PT/EN, índices PT/EN e home) responderam 200, tiveram `X-Robots-Tag: noindex` no preview, canonical de produção correto e bytes iguais ao `dist` congelado. Os nove HTML protegidos foram também byte-idênticos à produção atual. Title/description exatos, H1 único, BlogPosting sem `author`, `datePublished`, `dateModified` ou byline/time; nenhum alternate EN fictício nem PNG do artigo. Links do corpo para Google SRE, AWS, Martin Fowler, Microsoft, recuperação de projeto e CTA foram conferidos no HTML, sem refetch das fontes externas.

Ambas figuras têm alt/legenda. SVGs extraídos do HTML: `/_astro/evidencias-decisao.Cw0T1GlU_15GaVk.svg` HTTP 200 `image/svg+xml`, 2487 bytes, SHA256 `07c35b5fa17ec1c9e19705050c19553469529a08b6039efe5d4d9e24d357c67b`; `/_astro/exemplo-aprovacao.BLXjBXeo_BT9L.svg` HTTP 200 `image/svg+xml`, 2450 bytes, SHA256 `6b2e9d913c417974600f2550a3bedb623aa827d5e3668424844a02e6a228607b`. Bytes e SHA iguais ao manifesto do artefato.

Sitemap do preview: 22 URLs únicas, preserva as 21 do snapshot ERP publicado e adiciona somente `/blog/antes-de-refazer-sistema-evidencias/`. Produção permanece com 21 URLs e sem o artigo novo. Recibos do deploy associam source `c0ae1de647d7a5af50c50e8f990ee53168a536b8c02ef0a887dd4ff67752e435`, artifact `8e47c35ad2e4a1a187389d02e5b1e0c637555cb10ea6895e6a0d6aad9cadc3e0`, approval `35697ef9263475ea12450260384578c4f4aa1d56e5efac2e7c89d0d8bacf36af`, Edge `true` e bundle hash `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`.

## Mobile e figuras

Chrome em tema claro; ambas imagens e legendas medidas. Com scrollbar vertical: viewport 320 → área útil 305, ambas 288 px; 360 → área útil 345, ambas **328 px**; 390 → área útil 375, ambas aproximadamente 341 px. Sem scrollbar: 320 → 288 px, 360 → **328 px**, 390 → aproximadamente 356 px. Em desktop 1280, ambas ficaram em 480 px. Legendas a 14 px; seus `scrollWidth` igualaram `clientWidth` em todas as dimensões. O documento também teve `scrollWidth == clientWidth`: nenhum overflow horizontal. Capturas do portal em 320/360 mostram imagens, créditos e legendas legíveis, sem clipping: [figura 1/320](tarde-r3-figure1-320.png), [figura 2/320](tarde-r3-figure2-320.png), [figura 1/360](tarde-r3-figure1-360.png), [figura 2/360](tarde-r3-figure2-360.png).

**Limite:** Edge foi conferido por recibo hash-bound, não por uma segunda consulta API; o HTTP e os assets foram baixados diretamente. Lighthouse não foi repetido neste gate focado. Produção do artigo novo depende de promoção posterior e QA pós-produção.

Evidência bruta: [log](tarde-preview-r3-20261015.log) e [JSON](tarde-preview-r3-20261015.json).
