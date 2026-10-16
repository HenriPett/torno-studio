# Blog tarde r3 — QA independente pós-produção

**Gate funcional HTTP: PASS** para `https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/`, deploy `6ad15581ccdee6d89b2ad52f`, publicado conforme `production.json` em `2026-10-15T22:42:52.096Z`. Nenhuma edição de código ou promoção executada neste QA.

A execução independente registrou **9/9 checks PASS**. O artigo novo, os três artigos anteriores, seis cases PT/EN, índices PT/EN e home responderam HTTP 200: 13 HTML com bytes iguais ao `dist` congelado, canonical self e sem header/meta `noindex`. Os nove HTML protegidos, inclusive os seis cases, bateram com o manifesto do artefato. Title/description/H1 exatos; BlogPosting sem `author`, `datePublished`, `dateModified`, byline/time ou alternativo EN fictício. Links de Google SRE, AWS, Martin Fowler, Microsoft, recuperação de projeto e CTA conferidos no HTML, sem buscar novamente as fontes externas.

As duas figuras têm alt e legenda. Assets HTTP de produção: `/_astro/evidencias-decisao.Cw0T1GlU_15GaVk.svg` 200 `image/svg+xml`, 2487 bytes, SHA256 `07c35b5fa17ec1c9e19705050c19553469529a08b6039efe5d4d9e24d357c67b`; `/_astro/exemplo-aprovacao.BLXjBXeo_BT9L.svg` 200 `image/svg+xml`, 2450 bytes, SHA256 `6b2e9d913c417974600f2550a3bedb623aa827d5e3668424844a02e6a228607b`. Ambos coincidem byte a byte com o snapshot e seus hashes no manifesto.

Sitemap de produção: 22 URLs únicas, preserva exatamente as 21 do snapshot ERP anterior e acrescenta apenas `/blog/antes-de-refazer-sistema-evidencias/`; XML igual ao manifesto r3. O recibo `production.json` liga o deploy ao source `c0ae1de647d7a5af50c50e8f990ee53168a536b8c02ef0a887dd4ff67752e435`, artifact `8e47c35ad2e4a1a187389d02e5b1e0c637555cb10ea6895e6a0d6aad9cadc3e0`, approval `35697ef9263475ea12450260384578c4f4aa1d56e5efac2e7c89d0d8bacf36af`, Edge `true` e bundle hash `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`.

**Limite:** tentativa própria de GET `https://api.netlify.com/api/v1/deploys/6ad15581ccdee6d89b2ad52f` retornou HTTP 401 sem credencial. Portanto, o estado Edge/API e `publishedAt` são sustentados pelo recibo hash-bound; HTTP, conteúdo, SVGs e sitemap foram medidos diretamente. A revisão mobile foi aprovada no preview do mesmo artefato e não foi repetida sem alteração.

Evidência bruta: [log](tarde-production-r3-20261015.log) e [JSON](tarde-production-r3-20261015.json).
