# QA independente — draft ERP r4 (2026-10-15)

**Gate: HOLD (24/25 checks).** Deploy `6ad1037cbc0d231dd73df930`; snapshot `/private/tmp/torno-blog-release-erp-20261015-r4`. O único check reprovado é a largura mínima das duas figuras no viewport de 360 px. Não houve edição de `src` nem promoção.

## Defeito visual que bloqueia o gate

- **Reprodução:** abrir `https://6ad1037cbc0d231dd73df930--tornostudio.netlify.app/blog/integracao-erp-briefing-orcamento/`, ajustar o portal para **360 × 844 px**, rolar até cada uma das duas figuras e ler as dimensões no snapshot de acessibilidade.
- **Esperado:** largura útil de cada figura **≥ 328 px** em 360 px, máximo de 480 px e conteúdo/legenda sem clipping.
- **Obtido:** ambas as imagens estão em `x=16`, **311 × 555 px**. O texto e as legendas não apresentam clipping aparente, mas a largura fica **17 px abaixo** do mínimo de aceite. Em 390 px, ambas medem `x=17`, **339 × 604 px**; no desktop a primeira mede **480 × 856 px**.
- **Severidade:** média, bloqueio do critério visual de aceite mobile. A regra ERP do snapshot limita a figura a `inline-size:100%` da coluna; esta é uma causa provável, ainda não corrigida por QA.
- **Capturas:** [figura 1 a 360 px](erp-r4-figure1-360.png), [figura 2 a 360 px](erp-r4-figure2-360.png), [figura 1 a 390 px](erp-r4-figure1-390.png), [figura 2 a 390 px](erp-r4-figure2-390.png).

## Checks aprovados

- Manifestos do snapshot conferem: fonte `5ac34b60bf8fa504e98e0e4a849c658654912d057bf032a2337a2cb995489d70`, artefato `16c04627c9c48721897cc776dd0cdf22019c8a6f95c055aab3c674091dbf22d7`, aprovação `632d64f2503b430ae27e9d7581234c9533e03a21020b9d70af0e3b81f6a91535`. Recibo do preview: `ready`, Edge `true`, bundle hash `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`, deploy anterior `6ad0ca2a4a4dafb0c6955f29`.
- HTML ERP no draft: HTTP 200, **29.522 bytes**, idêntico ao artefato. Title, description, H1 único, canonical de produção e ausência de tradução EN conferem. O cabeçalho do preview contém `noindex`.
- `BlogPosting` tem URL canônica e não contém `author`, `datePublished` ou `dateModified`; o artigo não mostra byline ou `<time>`. Há duas figuras com alt e legendas, e os dois SVGs respondem HTTP 200 `image/svg+xml` com SHA igual ao manifesto.
- Os cinco links editoriais do corpo coincidem com Omie, limites e webhooks do Bling, artigo de critérios de aceite e CTA de diagnóstico. As fontes externas não foram reconsultadas.
- Sitemap do draft: **21 URLs únicas**, as 20 de produção preservadas e `/blog/integracao-erp-briefing-orcamento/` adicionada uma vez. Sitemap de produção: **20 URLs únicas**, idênticas ao baseline; o novo artigo está ausente.
- Home, índices PT/EN, seis cases PT/EN e os dois artigos anteriores responderam HTTP 200 no draft, com bytes iguais ao artefato e canonical self.

Saída da execução: [erp-preview-r4-20261015.log](erp-preview-r4-20261015.log). Evidência estruturada: [erp-preview-r4-20261015.json](erp-preview-r4-20261015.json). O status Edge/hash foi confirmado pelos recibos da API no snapshot; a inspeção visual usou o portal Maestri. É necessário um novo candidato vinculado a novos hashes e reteste das duas figuras em 360 px antes de liberar o gate.
