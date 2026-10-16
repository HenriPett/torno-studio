> **Estado atualizado após promoção do artigo (2026-10-14):** o gate zero-artigos abaixo é histórico v5-final e foi substituído pela verificação pós-promoção r3. O deploy atual é `6acff8bd6dccb98caf26f5cd` (`ready`, Edge preservada); o sitemap publicado tem exatamente 19 URLs e inclui apenas o artigo PT aprovado além das 18 URLs baseline. Evidência e saída 5/5: [production-article-r3.md](production-article-r3.md), [production-http-article-r3.log](production-http-article-r3.log), [production.json](production.json).

# Gate QA BLOG-TORNO-20261014

**Pós-promoção produção: PASS.** Executei `node scripts/test-blog-production.mjs https://tornostudio.com` após a promoção do deploy `6acfe455ce78d78ac97cc565`. [Saída integral](production-http-v5-final.log): **4/4**. `/blog/` e `/en/blog/` respondem HTTP 200, têm canonical self em produção, não têm `noindex` em header/meta e mantêm CollectionPage vazia sem Article fictício. O sitemap publicado tem exatamente as 16 URLs anteriores e os dois índices, sem post. Os seis cases PT/EN respondem HTTP 200 com canonical self. As três rotas sintéticas da fixture respondem HTTP 404. Evidências seguras do snapshot: [production.json](production.json), [qa-gate.json](qa-gate.json), [preview.json](preview.json), [preview-verified.json](preview-verified.json). Escopo desta rodada limitado a HTTP pós-promoção; as limitações de Lighthouse/axe/teclado do gate anterior permanecem.

**Gate HTTP draft v5-final: PASS para promoção root.** Draft `https://6acfe455ce78d78ac97cc565--tornostudio.netlify.app` (ID `6acfe455ce78d78ac97cc565`) aponta, conforme `preview.json`, ao source hash `db7a732010d50b90770dc1979c2b93b1e0aeb64e41629386055a7c5ac7b2f785` e artifact hash `e9f3348370ce58805cd9853949ef17eb6787f021883b534deb85e4b0ab2718df`; `preview-verified.json` registra `/blog/`, `/en/blog/`, `/` com HTTP 200, `noindex` e corpo igual ao `dist`. QA executou `node scripts/test-blog-preview.mjs https://6acfe455ce78d78ac97cc565--tornostudio.netlify.app`; [saída integral](preview-http-v5-final.log): **5/5**. O script exige header `X-Robots-Tag: noindex` e canonical de produção nos dois índices; lê o sitemap via HTTP e compara as 18 URLs exatas; verifica HTTP 200, header noindex e canonical nos seis cases PT/EN; confirma 404 nas três rotas da fixture privada. O release segue com zero artigo público. QA não promoveu nem publicou.

**Estado v5-final: functionalQA PASS para avançar ao draft; visualReview PASS informado por Timbre.** Artefato congelado `/private/tmp/torno-blog-release-20261014-v5-final`, source hash `db7a732010d50b90770dc1979c2b93b1e0aeb64e41629386055a7c5ac7b2f785`, artifact hash `e9f3348370ce58805cd9853949ef17eb6787f021883b534deb85e4b0ab2718df`. Nenhum deploy ou publicação por QA.

Saída real desta rodada:

```text
PASS sitemap mantém as 16 URLs existentes e acrescenta apenas os dois índices
PASS índice /blog/: vazio real, metadata, i18n e CTA
PASS índice /en/blog/: vazio real, metadata, i18n e CTA
PASS navegação interna do blog resolve no artefato
PASS sem artefatos de artigo ou pauta histórica no release zero-artigos
PASS regressão case /cases/loopt/: conteúdo, SEO, imagem e oferta
PASS regressão case /en/cases/loopt/: conteúdo, SEO, imagem e oferta
PASS regressão case /cases/bom-capital/: conteúdo, SEO, imagem e oferta
PASS regressão case /en/cases/bom-capital/: conteúdo, SEO, imagem e oferta
PASS regressão case /cases/ascende/: conteúdo, SEO, imagem e oferta
PASS regressão case /en/cases/ascende/: conteúdo, SEO, imagem e oferta
PASS home PT/EN: retrato, consentimento e descoberta do blog
RESULT 12/12 checks passed
PASS preservado netlify/edge-functions/count-diagnostico.ts
PASS preservado src/components/ConsentBanner.astro
PASS preservado src/config/pricing.ts
PASS preservado netlify.toml
RESULT 4/4 checks passed
PASS fixture: apenas publicados elegíveis entram no sitemap
PASS fixture: índices mostram apenas artigos do próprio idioma
PASS fixture publicada /blog/qa-registro-de-handover/: HTML/SEO/schema
PASS fixture publicada /blog/qa-par-equivalente/: HTML/SEO/schema
PASS fixture publicada /en/blog/qa-equivalent-pair/: HTML/SEO/schema
PASS fixture: draft/review/approved/hold/retired/no_go/futuro não vazam
PASS fixture: blocos largos acessíveis por teclado
RESULT 7/7 checks passed
```

Fixture final isolada: `/private/tmp/torno-blog-qa-20261014-final` (`privateFixture: true`, 3 artigos sintéticos), servida em `http://127.0.0.1:4340/blog/qa-registro-de-handover/` e `http://127.0.0.1:4340/en/blog/qa-equivalent-pair/`. O wrapper usou `--source-dir` apontando para a v5-final. [Proveniência completa](fixture-v5-provenance.json): `sourceManifestHash` igual ao hash acima; os 90 arquivos de produto/configuração/package do fixture têm hashes idênticos ao `source-sha256.json` do snapshot, sem divergência. O hash do artefato privado é `76772296cb5e163f720ed311ba22f1aaa333de8bbad681bced7d6b907864f58c`.

Portal: tabelas PT/EN legíveis a 360/390 px em tema escuro e claro; primeira coluna com 160 px, tabela 576 px, bloco 309 px em 360 e 337 px em 390. Na PT390, rolagem do bloco foi de `scrollLeft=0` a `200`, enquanto a página ficou com `scrollWidth=373 < innerWidth=390`. Footer/home a 1280: `scrollWidth=1263 < innerWidth=1280`. Capturas: [PT escuro 360](fixture-v5-pt-table-dark-360.png), [EN escuro 390](fixture-v5-en-table-dark-390.png), [PT claro 390](fixture-v5-pt-light-390.png), [EN claro 360](fixture-v5-en-light-360.png), [footer 1280](release-v5-home-footer-1280.png), [índice PT 390](release-v5-index-pt-390.png). O estado claro foi recarregado com preferência `light` para evitar captura durante transição de cor.

**Limites:** Chromium Playwright falha no sandbox macOS (`MachPortRendezvousServer Permission denied (1100)`); axe e Lighthouse não executados, alvo >=95 não comprovado. O Portal confirmou foco e nomes acessíveis, mas `ArrowRight` nele não moveu `scrollLeft`; a rolagem via teclado físico permanece sem prova. Preview HTTP (`X-Robots-Tag: noindex`, canonical de produção) depende do draft e será o próximo gate. A frase “blocos largos acessíveis por teclado” na suíte atesta `tabindex`/landmark no HTML, não a ação de seta no navegador.

## Histórico v4 — substituído pelo gate v5-final

**v4 ficou em HOLD.** Timbre pediu ajuste visual do CTA dos índices segundo `docs/blog/design-20261014.md`; fixture privada também revelou tabela longa ilegível em 390 px (B4). Nenhuma publicação foi feita por QA.

## Evidência executada em v4

Artefato de release: `/private/tmp/torno-blog-release-20261014-v4`, hash informado por Compasso `9502ed010e8f8a65d0ea99034aaad6f66553f486ecd786f614d4cd9ff4c0480b`.

```text
node scripts/test-blog-release.mjs /private/tmp/torno-blog-release-20261014-v4/dist
RESULT 12/12 checks passed
node scripts/test-blog-integrity.mjs /private/tmp/torno-blog-release-20261014-v4
RESULT 4/4 checks passed
node scripts/test-blog-fixture.mjs /private/tmp/torno-blog-qa-20261014-r4/dist /private/tmp/torno-blog-fixtures-20261014/expected.json
RESULT 7/7 checks passed
```

Saídas integrais: [release-v4.log](release-v4.log), [integrity-v4.log](integrity-v4.log), [fixture-r4.log](fixture-r4.log). O wrapper privado concluiu com `publicArticles: 3`, `privateFixture: true` e hash de manifesto de artefatos `4d873554c095d473f4400e99e1f80b6102d70caf0bec47c14d3a413486d2adba`; [log do build](fixture-build-r4.log). Esses três artigos são somente fixture sintética em `/private/tmp`; o release normal tem **zero artigos**.

Nove negativos foram rejeitados pelo motivo esperado, sem `build-meta.json` final: timezone ausente, calendário inválido, canonical/path duplicado, intenção reservada, tradução de intenção divergente, link Markdown para draft, slug histórico no_go, autor ausente e liberação de release ausente. A primeira execução válida marcou 8/9 porque o meu runner nomeou a saída do último caso com a palavra `release`, proibida pelo wrapper. Corrigido o runner, o último caso marcou 1/1. Saídas: [negative-r4.log](negative-r4.log) e [negative-missing-approval.log](negative-missing-approval.log). A execução anterior, que rejeitou todos os caminhos antes do validador, foi descartada e não conta como prova.

No Maestri Portal, os índices PT/EN a 390×844 mostram H1, estado vazio e CTA nos idiomas corretos, sem artigo fictício. Capturas: [PT](release-index-pt-mobile-390.png), [EN](release-index-en-mobile-390.png). A fixture privada a 390×844 expõe `<pre>` e `<table>` com `tabindex=0`; foco direto foi observado, mas a tecla Tab do portal não avançou o foco. Capturas: [artigo](fixture-mobile-390.png), [código/tabela](fixture-code-table-mobile-390.png).

## Limites registrados na rodada v4

- Chromium Playwright falha ao iniciar no sandbox macOS (`MachPortRendezvousServer Permission denied (1100)`); axe e Lighthouse não foram executados. O portal fornece inspeção visual e árvore acessível, não um escore Lighthouse. **Alvo >=95 não comprovado.**
- Preview Netlify ainda não foi entregue a QA nesta rodada; `X-Robots-Tag: noindex` e canonical final no preview serão testados com `scripts/test-blog-preview.mjs` no draft.
- A prova de links, sitemap e 18 URLs nessa rodada era do artefato estático v4; foi substituída pela evidência v5-final acima.
