# Manutenção r1 — QA HTTP independente pós-produção

**Gate funcional HTTP: PASS** para `https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/`, deploy `6ad2188019acbbe7b53eec26`, `publishedAt` do recibo `2026-10-16T12:33:45.462Z`. Sem edição de src, asset, candidato, recibos ou promoção.

Execução independente: **9/9 checks PASS**. Artigo novo, quatro artigos anteriores, seis cases PT/EN, home e índices PT/EN responderam HTTP 200: 14 HTML com bytes iguais ao `dist` congelado, canonical self e sem header/meta `noindex`. Os dez HTML protegidos, incluindo seis cases, coincidiram com o artefato. Title/description/H1 exatos; BlogPosting sem `author`, `datePublished` ou `dateModified`, sem byline/time e sem alternativa EN fictícia.

A figura única está após as propostas hipotéticas e antes da seção de garantia, com alt, figcaption e `aria-describedby` apontando ao equivalente textual. SVG **extraído do HTML servido em produção**: `/_astro/orcamento-apos-lancamento.Diq0z4bO_22sYfi.svg`, HTTP 200 `image/svg+xml`, 3934 bytes, SHA256 `36d16c69c5c75d61cdfc167adfb634c2b16b90ea037d3f76eece7144993d9c5d`, idêntico ao snapshot e manifesto. Links para AWS, Supabase, `/#precos` e CTA Calendly conferidos no HTML; fontes externas não foram buscadas.

Sitemap de produção: **23 URLs únicas**, preserva exatamente as 22 do snapshot publicado anterior e adiciona apenas o novo artigo; XML idêntico ao manifesto r1. Recibo `production.json` SHA256 `8316e8f9c93706253b2a862d48a8811e8865f315f781b3162921c395d30d0c86` vincula deploy, source `5172af52bf3c6d975d838dcfe2392dd33f58058ecc23ec63f8f8cd306f4fca76`, artifact `0ab359df4a66eab85a693c82dfbfdb58cfdd9be4c27efe16a4529e4344995389`, approval `65df305947a2909f783081cae0da2472b7ffd9f9ab75e65bb208b4cd9ed6f54e`, Edge `true` e bundle `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`. O gate anterior tem SHA256 `013a36863e1c69b09fcc18368476a9da1239ab5452ec16d4485b07e5adfeda33`.

**Limite:** GET próprio à API Netlify para o deploy retornou HTTP 401 sem credencial; estado `ready`, Edge e `publishedAt` dependem do recibo hash-bound. HTTP, bytes, SVG e sitemap foram medidos diretamente. Mobile já passou no preview do mesmo artefato e não foi repetido.

Evidência bruta: [log](manutencao-production-r1-20261016.log) e [JSON](manutencao-production-r1-20261016.json).
