# Manutenção r1 — QA funcional independente do draft

**Gate: PASS** para draft `6ad2188019acbbe7b53eec26`, snapshot `/private/tmp/torno-blog-release-manutencao-20261016-r1`. Sem edição do candidato ou promoção.

## HTTP, SEO e regressão

Auditoria HTTP independente: **11/11 checks PASS**. O artigo novo e outros 13 HTML (quatro artigos anteriores, seis cases PT/EN, índices PT/EN e home) retornaram HTTP 200, `X-Robots-Tag: noindex` no preview, canonical de produção e bytes iguais ao `dist` congelado. Os dez HTML protegidos foram byte-idênticos à produção atual. Metadados title/description/H1 conferem com o frontmatter; BlogPosting sem `author`, `datePublished`, `dateModified` ou byline/time, sem alternativa EN fictícia.

A figura única aparece depois das propostas hipotéticas e antes da seção de garantia. `aria-describedby` aponta para `maintenance-figure-equivalent`, cujo texto explica as três parcelas, a falta de cobertura implícita, valores a cotar e o caráter hipotético. Alt e figcaption estão presentes. SVG extraído do HTML: `/_astro/orcamento-apos-lancamento.Diq0z4bO_22sYfi.svg` HTTP 200 `image/svg+xml`, 3934 bytes, SHA256 `36d16c69c5c75d61cdfc167adfb634c2b16b90ea037d3f76eece7144993d9c5d`, idêntico ao artefato. Links no HTML para AWS, Supabase, preços/garantia e CTA Calendly conferidos, sem refetch de fontes externas.

Sitemap do preview: 23 URLs únicas, preserva as 22 do snapshot publicado anterior e acrescenta só `/blog/custo-manutencao-software-apos-lancamento/`. Produção continua com 22 URLs e o novo slug retorna 404. Recibos hash-bound registram preview pronto e Edge `true`, bundle `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`, source `5172af52bf3c6d975d838dcfe2392dd33f58058ecc23ec63f8f8cd306f4fca76`, artifact `0ab359df4a66eab85a693c82dfbfdb58cfdd9be4c27efe16a4529e4344995389`, approval `65df305947a2909f783081cae0da2472b7ffd9f9ab75e65bb208b4cd9ed6f54e` e `preview-verified.json` SHA256 `015ee0d21ef1a0cdcccb59b48908da4724db1e2d5be9bf6e11300161fd6a0327`.

## Layout mobile

Chrome, tema claro. Com scrollbar: viewport 320 → área útil 305, figura/legenda **288 px**; 360 → 345, **328 px**; 390 → 375, aproximadamente **341 px**. Sem scrollbar: 320 → **288 px**; 360 → **328 px**; 390 → aproximadamente **356 px**. Desktop 1280 → **480 px**. Legenda renderizada a **14 px**. Em todas as medidas, `scrollWidth` da legenda igualou `clientWidth`, e `document.scrollWidth == document.clientWidth`: sem clipping ou overflow horizontal. Capturas do portal mostram arte, crédito e legenda em [320](manutencao-r1-figure-320.png), [360](manutencao-r1-figure-360.png) e [legenda 360](manutencao-r1-caption-360.png).

**Limites:** Edge foi conferido pelo recibo hash-bound, sem segunda consulta à API Netlify. Não foi executado Lighthouse neste gate focado. Produção do novo artigo requer promoção posterior e QA pós-produção.

Evidência bruta: [log](manutencao-preview-r1-20261016.log) e [JSON](manutencao-preview-r1-20261016.json).
