# BLOG-TORNO-20261014 — registro histórico de arquitetura e baseline

> **Registro de 14/10/2026; não descreve o estado atual do blog.** Naquela data os índices estavam vazios e artigos estavam fora daquele release. Desde então cinco artigos foram publicados e sua fonte está em `src/content/blog/`. Consulte [`README.md`](README.md), [`PUBLICACOES-2026-10-16.md`](PUBLICACOES-2026-10-16.md) e o espelho editorial em `editorial/` para o estado atual. As decisões datadas abaixo permanecem como histórico, não como instruções que removam ou revertam as publicações posteriores.

Responsável pelo registro original: Compasso. A seção abaixo conserva a arquitetura e o baseline observados em 14/10/2026.

## Baseline verificado em 2026-10-14

- API autenticada Netlify, leitura direta: site `297530a9-272e-492f-9398-36e96f6dc992`, URL `https://tornostudio.com`, published deploy `6acf74b406c100fbad5c86ef`, estado `ready`, publicado em `2026-10-14T12:25:55.577Z`, `edge_functions_present: true`.
- GET de `/`, `/en/`, `/sitemap-0.xml` e das seis páginas `/cases/loopt/`, `/cases/ascende/`, `/cases/bom-capital/`, `/en/cases/loopt/`, `/en/cases/ascende/`, `/en/cases/bom-capital/`: HTTP 200. `/cases/` não é índice contratado; não inferir sua existência.
- Branch `main`, HEAD `0ce2f5ce42b026dc5e7bfa2d49ef9b82d2b92ab9`. Sem remote configurado; não foi possível conferir main remoto.
- Working tree contém trabalho alheio de cases, SEO, retrato, ofertas e QA, incluindo alterações em Base, routes e Footer. HEAD sozinho não reproduz produção. Não resetar, sobrescrever nem fazer checkout desses arquivos. Baseline de release deve preservar esse estado e comparar hashes com `docs/qa/cases-20261014/{source,artifact}-sha256.json` e release isolado de cases; divergências exigem análise antes de copiar.
- `.agents/skills` não encontrado nos roots informados; skill global Maestri lida. Nenhum token ou valor de credencial registrado.

## Stack e rotas

Manter Astro 5.18.2 estático, TypeScript, Markdown em Content Collections; sem CMS, API, banco, MDX ou JS cliente para listar/ler. Sitemap 3.7.4 existente. Confirmo arquitetura `/blog/` e `/en/blog/`, artigos `/blog/[slug]/` e `/en/blog/[slug]/`, barra final obrigatória. Slugs locais podem diferir. Nenhuma rota `/artigos/` nova.

O release possui dois índices HTML honestamente vazios e zero artigos públicos. Decisão final do coordenador: canonical próprio, title/description reais e inclusão dos dois índices no sitemap, sem Article fictício. Decisão final de Batuta: índices vazios indexáveis, canonical/hreflang reais e sitemap; supera noindex da spec visual. CollectionPage verdadeiro, sem Article ou item fictício. QA confirmou baseline público de 16 URLs: resultado esperado 18, preservando exatamente as 16 anteriores, não a contagem antiga dos testes. Nenhum redirect de /artigos/ será criado. Artigos futuros publicados serão HTML indexável conforme PUBLIC_ALLOW_INDEXING existente.

## Registro de intenção e URL

| Intenção reservada | PT | EN |
| --- | --- | --- |
| Contratar recuperação/resgate de projeto | `/recuperacao-de-projeto/` | `/en/software-project-rescue/` |
| Levar Lovable à produção | `/lovable-em-producao/` | `/en/lovable-to-production/` |
| Implementar RLS multiempresa (guia) | `/guias/rls-multiempresa/` | `/en/guides/multi-tenant-rls/` |

Trilha é dona do contrato SEO/editorial, taxonomia e `marketing/blog/HISTORICO-INTENCAO-URL.md`; Mote de `marketing/blog/MICROCOPY-ESTRUTURA.md`; Verso revisa PT/EN read-only. Farol entrega esses arquivos. O registro técnico espelha o contrato aprovado, não cria outra autoridade editorial. Toda pauta declara intenção, URL reservada, fontes e relações; intenção já atendida atualiza destino existente ou exige recorte distinto aprovado. Tradução compartilha intenção e vínculo translation_of por content_id, sem criar concorrência. Não duplicar landings/guia no blog, inclusive em EN.

## Contrato editorial e adaptação técnica

Fontes lidas integralmente: `../projeto-50k/marketing/blog/CONTRATO-EDITORIAL.md`, `HISTORICO-INTENCAO-URL.md` e `MICROCOPY-ESTRUTURA.md`. Não duplicar autoridade editorial. Collection `blog`, Markdown em `src/content/blog/`, sem entradas neste release. Frontmatter snake_case é preservado integralmente em meta.data; meta.id/path/slug/locale são projeções de roteamento, não outra fonte editável. Nomes camelCase na tabela são conceitos de domínio; renderização consulta a chave snake_case original em data.

| Editorial | Código / validação |
| --- | --- |
| content_id, intent_id, locale, type | contentId, intentId, locale, type; IDs estáveis; apenas artigo nesta collection |
| working_title, h1, summary, primary_question | workingTitle, title (H1), description, primaryQuestion; title SEO pode usar título editorial aprovado, nunca inferir promessa |
| proposed_path, canonical_url, url_owner | path, canonical, urlOwner; slug extraído do path validado; canonical deve coincidir com origem e path canônicos |
| audience, buyer_stage, scope, not_scope | audience, buyerStage, scope, notScope; evidência da distinção de intenção |
| author_name, author_basis, reviewer, reviewed_at | authorName, authorBasis, reviewer, reviewedAt; byline somente com autoria comprovada |
| created_at, first_published_at, last_substantive_update_at, verified_at | createdAt, publishedAt, updatedAt, verifiedAt; opcionais somente onde o estado editorial permite ausência |
| claims_and_sources | claimsAndSources; classificação, referência rastreável, entidade, data/conferência/limite |
| internal_links | internalLinks; path e motivo; destino público válido e coerente com idioma |
| translation_of, translation_status | translationOf aponta content_id real, translationStatus; validar ID, idioma distinto e equivalência revisada, sem inferir por slug |
| evidence_of_publication, indexation_observation | publicationEvidence, indexationObservation; evidências separadas, HTTP não prova indexação |
| status | editorialStatus: draft/review/approved/published/hold_cannibalization/retired/no_go |

Frontmatter conserva **todas as chaves snake_case** da tabela, incluindo campos apenas editoriais; adaptador expõe nomes camelCase ao código. Nada é perdido nem inferido da versão EN. `content_id`, `intent_id`, `locale`, `type`, `status` são obrigatórios desde draft; demais chaves podem estar ausentes ou null conforme o contrato final. Listas vazias são distintas de dado desconhecido null. Corpo pode estar vazio em draft. Não preencher publicação, autoria ou URL desconhecidas por conveniência.

Validação por transição: draft/review aceitam campos ainda nulos e permanecem invisíveis; approved exige título/H1/resumo/pergunta, intenção/URL dona reservadas, audiência/escopo/exclusões, corpo, fontes/links conferidos, autoria comprovada, revisor/reviewed_at reais e release_approved_by/at/evidence explícitos. verified_at, publicação prévia/evidência/indexação/tradução e atualização podem estar ausentes/null quando inexistentes. Published exige evidence_of_publication e verified_at reais; first_published_at pode permanecer null/ausente SEM DADO e é omitida no HTML/schema; indexation_observation pode continuar null. hold_cannibalization/no_go/retired jamais são elegíveis. Estado inválido ou dado contratual não nulo malformado falha fechado; campos editoriais adicionais são preservados sem conceder elegibilidade; null permitido não é erro. Datas de fonte podem conservar precisão original em claims_and_sources; todos timestamps de eventos/conteúdo exigem timezone.

Bloquear os slugs históricos `quanto-custa-sistema-sob-medida` e `prototipo-para-producao` em qualquer locale; só reaprovação futura explícita no histórico (ID da decisão, responsável, evidência) pode remover bloqueio. Não criar redirects.

IDs de intenções reservadas: `recovery-commercial`, `lovable-production-commercial`, `rls-multitenant-howto`. Um proprietário ativo por intentId + locale. Bloquear duplicidade de contentId, canonical, path e intenção; tradução real tem IDs de conteúdo distintos e mesma intenção. `translationOf` pode apontar original sem formar ciclo; resolvedor exige intenção e escopo equivalentes revisados, liberação recíproca das duas versões e ambas elegíveis; cada versão mantém datas, aprovação e evidências independentes. Slug/idioma parecido não prova equivalência.

Toda data/hora fornecida exige ISO 8601 com `Z` ou offset explícito; validar calendário, não apenas regex. Nada de data sem timezone, conversão implícita, mtime ou relógio do build como data editorial. updatedAt deve representar revisão substantiva posterior à publicação; reviewedAt/verifiedAt não podem afirmar observações futuras. Sem autoria comprovada, omitir byline/schema de autoria; conteúdo candidato à publicação falha na validação editorial até resolver autoria. Não preencher Henrique automaticamente.

### Elegibilidade de build versus confirmação histórica

`editorialStatus` nunca é autorização de deploy. `draft`, `review`, `hold_cannibalization`, `retired`, `no_go` e `approved` isolado são invisíveis. `published` exige evidência pública anterior válida, sem exigir instante exato de primeira publicação desconhecido. Futuro é invisível. Toda entrada passa validação; erro estrutural/estado desconhecido/conflito em candidato interrompe o build (fail-closed), sem publicar parcialmente ou substituir dados silenciosamente.

Para primeira publicação futura, um manifesto de release aprovado explicitamente por Batuta vincula contentId, locale, contentRevision/hash, path e aprovação editorial (sem inventar data de publicação). Só esse manifesto permite que um `approved` revisado se torne candidato técnico de publicação; não muda seu estado histórico. getStaticPaths recebe exclusivamente o manifesto público validado (publicados confirmados + candidatos com autorização explícita de publicação), nunca a collection bruta. O manifesto desta release é vazio; nenhum approved entra por padrão.

Na primeira publicação, `first_published_at` e evidência permanecem null até confirmação real. Não usar aprovação, janela ou relógio do build como datePublished. O primeiro artefato omite data/byline não comprovada e propriedades de schema indisponíveis; BlogPosting só quando os fatos exigidos existirem, caso contrário WebPage verdadeiro. Após evidência pública, o histórico registra a data real e um próximo build pode expô-la. Assim não se exige conhecer antecipadamente o instante exato do deploy. Manifesto referencia hash de conteúdo, aprovação e contentId, não altera estado editorial. Neste release não há candidatos nem manifesto de artigo ativo.

Após deploy autorizado e validação pública da URL final, Farol/Batuta/Trilha registram evento append-only `approved -> published` com HTTP, canonical, corpo/hash, ausência de noindex, deploy e horário. Evita circularidade: evidência pública confirma o histórico, não é fabricada para montar o primeiro artefato. Preview não confirma publicação. Consumidor futuro ingere apenas publicados confirmados, com idempotência `source + content_id + locale + content_revision + state_after`; recebimento de novo material apenas prepara draft, jamais distribui automaticamente.

Fixture exclusivamente em `/private/tmp/torno-blog-fixtures-20261014/`; fora de src/public/dist e build normal. Testes privados usam saída isolada não publicável. Não permitir variável que exponha drafts no deploy. Assets exclusivos de conteúdo invisível também não entram no release.

### Interface privada de fixture e relógio (contrato para QA, não implementada)

QA é dona de `/private/tmp/torno-blog-fixtures-20261014/`. Formato: `content/*.md` com frontmatter snake_case acima; `release-manifest.json` contém `{ "entries": [] }`, entradas candidatas no formato `{ "contentId", "locale", "contentRevision", "path", "approvedBy", "approvedAt" }`; hashes SHA-256 do Markdown exato. Registros published carregam sua evidência no frontmatter, não exigem nova autorização de primeira publicação.

Interface prevista: `python3 /private/tmp/torno-blog-build.py --fixture-dir /private/tmp/torno-blog-fixtures-20261014 --build-at 2026-10-14T20:00:00Z --output /private/tmp/torno-blog-qa-20261014`. Wrapper cria cópia isolada, injeta fixtures apenas nessa cópia e nunca toca src da árvore compartilhada. Não há env público para habilitar drafts. O mesmo filtro aplica-se às fixtures, sem bypass de validação.

`BLOG_BUILD_AT` é timestamp UTC congelado e passado pelo wrapper a todos os consumidores (collection, rotas, sitemap); obrigatório em release/QA, nunca recalculado por módulo. Wrapper de produção captura um único instante real; testes fornecem `--build-at`. Campo não é data editorial. QA output recebe marcador `PRIVATE_FIXTURE_DO_NOT_DEPLOY`, robots noindex e manifesto marcado privado; deploy/publish rejeitam esse marcador e qualquer origem de fixture, mesmo com PUBLIC_ALLOW_INDEXING=true acidental. `--fixture-dir` só aceita realpath sob diretório privado acordado, output fora da árvore e fora de release; proteção contra symlink/escape. Fonte normal jamais pesquisa fixture-dir automaticamente. Build normal gera zero artigos.

### Microcopy final

Mote lida; revisão Verso comunicada pelo coordenador. Índices e link comum: Blog. Vazio PT: “Ainda não há artigos publicados em português.” EN: “No articles are available in English yet.” Filtrar por idioma antes de decidir vazio; nunca afirmar vazio global. CTA usa bookingHref existente por idioma, sem enviar EN à campanha PT. Byline condicional comprovada; atualizado somente após revisão substantiva. Nenhum LinkedIn pessoal ou placeholder literal público.

## Integração SEO e idioma

`routes.mjs/d.mts` ganha índices estáticos. `src/config/blog.mjs` e `.d.mts` centralizam regras puras de URL/visibilidade/registro; loader e renderização usam o mesmo contrato. Collection carrega e valida Markdown. `prepareBlogManifest` na configuração produz o arquivo público único; `src/lib/blog.ts` apenas o lê e cruza hashes com Content Collection para getStaticPaths/componentes. Sitemap usa esse mesmo conjunto, conforme mecanismo concreto abaixo.

Base hoje deriva canonical/alternates/schema de routeId e presume OG locale alternativo. Acrescentar metadata editorial tipada para artigos dinâmicos, mutuamente exclusiva com routeId, preservando comportamento das páginas existentes. Canonical sempre em `https://tornostudio.com` no frontmatter e HTML, inclusive preview; preview nunca reescreve canonical para seu host e deve ser noindex. Produção aplica PUBLIC_ALLOW_INDEXING vigente. title/description reais; OG article apenas para artigo, schema BlogPosting apenas com autoria/datas/fontes reais. Índice usa CollectionPage, sem itens quando vazio. Sem ratings/resultados/ofertas inventados. Serialização JSON-LD escapa `<`.

Traduções publicadas geram hreflang recíproco; x-default aponta EN apenas quando existe equivalente EN. Sem tradução, nenhum alternate de artigo fictício nem og:locale:alternate enganoso. Seletor oculta tradução ausente ou oferece link explicitamente rotulado ao índice, sem confundir equivalência. Não mudar política das rotas antigas.

Sitemap atual usa allowlist routes: ampliar explicitamente com manifesto dos artigos públicos; não liberar todo dist. Preservar exclusões de campanhas. lastmod apenas com updatedAt/publicação real; não inventar datas para índices. Validar todos os links do corpo Markdown renderizado, além de internal_links/relacionados: links relativos, absolutos do próprio host, fragmentos e imagens normalizados. Destino deve existir no artefato público elegível e fragmento deve existir; links a draft/futuro/não elegível falham o build. Links contextuais declarados precisam ter motivo; links externos de fontes são conferidos na revisão e QA, sem tratar fetch como prova automática da alegação.

## Mapa exato proposto, antes de implementação

Compasso, único autor Astro; Ritmo revisão técnica apenas:

- Criar `src/config/blog.mjs`, `src/config/blog.d.mts`, `src/content.config.ts`, `src/lib/blog.ts`.
- Criar `src/components/blog/BlogIndex.astro`, `src/components/blog/BlogArticle.astro`.
- Criar `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/en/blog/index.astro`, `src/pages/en/blog/[slug].astro`.
- Alterar pontualmente `src/config/routes.mjs`, `src/config/routes.d.mts`, `src/lib/i18n.ts`, `src/layouts/Base.astro`, `astro.config.mjs`.
- Integração de navegação: `src/components/Footer.astro` (link aditivo Blog comum, preservar lean/campanhas); `src/components/Header.astro`, `src/components/ui/LangSwitch.astro` somente se necessário para artigos sem tradução (sem novo item no header), `src/content/types.ts`, `src/content/pt-BR.ts`, `src/content/en.ts` para microcopy aprovada.
- Documento desta etapa: somente `docs/blog/architecture-20261014.md`.
- Scripts privados implementados: `/private/tmp/torno-blog-baseline.mjs`, `/private/tmp/torno-blog-build.py`, `/private/tmp/torno-blog-deploy.mjs`, `/private/tmp/torno-blog-publish.mjs`; snapshot `/private/tmp/torno-blog-release-20261014/`; evidências `/private/tmp/torno-blog-evidence-20261014/`; fixture privada conforme acima.
- QA/Afinador define arquivos de testes após fechamento; revisar `tests/qa/seo.spec.ts` e `tests/qa/helpers.ts` por expectativas fixas de URLs. Não sobrescrever testes alheios. Mapa final reconciliado com specs antes de qualquer alteração em src.

## Fluxo release proposto (não executado)

Adaptar cases build/deploy/publish, sem copiar seus efeitos colaterais. Baseline consulta API e registra apenas metadados seguros e hashes; captura working tree para comparação, sem alterar fontes. Snapshot isolado inclui alterações alheias reconciliadas com produção; nunca apenas git archive HEAD. Build injeta somente PUBLIC env existente validado e CONTEXT production, sem imprimir valores; confirmar configuração vigente, não confiar cegamente no cache antigo de SEO.

Preservar netlify.toml, fonte Edge e bundle Edge do baseline com hashes; se divergirem, parar e revisar/reconstruir bundle, não reutilizar às cegas. Deploy de validação apenas draft; hashes de fonte/artefato e Edge obrigatórios, artefato imutável entre QA e promoção. Não reutilizar helper antigo que grava arquivos fora do escopo.

Publicação da estrutura já autorizada pelo usuário após QA; Batuta/root integra e promove sem pedir confirmação adicional. O script exige preview ID exato, QA aprovada vinculada aos hashes, estado ready, Edge presente e produção ainda igual ao previousDeploy esperado. Reconsultar produção imediatamente antes da promoção; qualquer mudança aborta. API não garante compare-and-swap: coordenar janela exclusiva com Batuta para evitar corrida. Promover exatamente o artefato validado, verificar ID/HTTP depois; rollback ao anterior apenas com autorização. Compasso não promove; entrega artefato e evidências ao coordenador.

## Aceite e pendências

- Zero artigos públicos e zero fixture em dist; draft/futuro indisponíveis por URL direta, sitemap, links e alternates.
- Índices e artigo privado acessíveis sem JS; sem conteúdo/data/autor inventados. PT/EN reais, canonical único e metadata coerente.
- Casos de teste: idioma único, tradução real, draft, data futura, slug/canonical duplicado, intenção reservada, relação inválida, datas inválidas e autoria ausente.
- Regressão das seis páginas de cases, ofertas, guia, retrato, consentimento, campanhas, sitemap e Edge; comparar artefato/HTTP com baseline preservado.
- QA visual conforme Timbre em 360/390/768/1280, claro/escuro, foco/teclado, sem overflow; Ritmo review antes de pronto.
- Contratos Trilha/Mote lidos; rotas confirmadas com Timbre pelo coordenador; indexação vazia resolvida. Pendente gates de revisão, fixture, visual e draft antes de promoção; não pedir novo consentimento para promoção após QA já autorizada. Sitemap esperado 18 = 16 preservadas + 2 índices; zero artigos. Design `docs/blog/design-20261014.md` lido; suas atribuições antigas a Ritmo/Verso são superadas pelo mapa congelado do coordenador.

## Preview e artefato de produção

Canonical sempre origem final `https://tornostudio.com`; PUBLIC_SITE_URL final é obrigatório no wrapper de release. Mesmo HTML validado em preview e promovido: noindex no preview via X-Robots-Tag da plataforma para permalink de deploy, nunca meta persistente no artefato de produção. Verificar header do draft real antes de entregá-lo; se faltar, interromper deploy/promoção e resolver controle de host. Após promoção root verifica ausência de noindex no domínio final e presença no permalink. Não alterar Edge/headers globais para este recurso. Fixture local usa noindex e nunca é artefato promovível.

## Mecanismo concreto do manifesto

Na avaliação async de astro.config.mjs, antes das integrações, `prepareBlogManifest(root, buildAt)` lê Markdown/frontmatter, valida e aplica elegibilidade uma única vez; grava atomicamente `.astro/blog-manifest.json` (buildAt, hash dos arquivos e lista pública). Leitura YAML usa dependência direta yaml 2.9.1; incluir package.json/package-lock.json no mapa. Não há getCollection na configuração. Sitemap recebe URLs/alternates dessa lista, com filter/serialize executados no hook astro:build:done do plugin. Content Collection usa loader glob de Markdown; src/lib/blog.ts lê o mesmo JSON do disco, cruza IDs/hashes e retorna apenas entradas da lista, sem recalcular elegibilidade. getStaticPaths/componentes usam esse accessor. Mudança de conteúdo após manifesto aborta; não usar singleton em memória entre processos. Build release congela BLOG_BUILD_AT; dev captura uma vez por avaliação de config. Release atual manifesto público vazio. A exceção técnica para approved autorizado no preview de primeira publicação futura não afirma published histórico nem autoriza distribuição editorial.

## Precisão final do contrato Trilha incorporada

`release_approved_by/at/evidence` são a aprovação editorial explícita e obrigatória no frontmatter. Além dela, o gate externo de release descrito abaixo é obrigatório para approved. Approved isolado é invisível; candidato aprovado não exige verified_at/first_published_at/evidência pública. Published exige verified_at/evidence_of_publication, mas permite primeira data desconhecida; nesse caso usa WebPage e omite datas não comprovadas. Nunca usa relógio de build como data editorial.

Formato técnico estruturado: claims_and_sources contém classification (FATO/ESTIMATIVA/HIPÓTESE), claim, reference, entity, checked_at ISO, limit; internal_links contém path/reason; evidence_of_publication contém url, canonical, http_status=200, noindex=false, artifact; translation_status de um vínculo translation_of contém status=approved, scope_equivalent=true, evidence, reviewed_by, reviewed_at ISO. Ambas versões exigem sua própria aprovação de release; revisão do par explicita equivalência de escopo. Sem par elegível não há alternate.

## Gate técnico final após revisão Ritmo/Afinador

Decisão do coordenador prevalece sobre a simplificação anterior: `approved` exige **também** autorização externa da release vinculada ao SHA-256 do Markdown. `.astro/blog-release-approval.json` é entrada privada, default `{entries:[]}`; build normal não cria autorização. Wrapper de fixture copia `release-manifest.json` privado para essa entrada; cada entry usa contentId/locale/contentRevision/path/approvedBy/approvedAt. Sem entry, approved completo permanece invisível; hash/path divergentes abortam. Published confirmado usa evidência histórica válida. Este release real tem zero entries e zero autorização de artigo.

Par exige translation_of recíproco nos dois IDs, intenção comum e translation_status estruturado aprovado com prova de escopo em **cada** registro. Se ambas versões são elegíveis e a ligação é unilateral, build falha fechado. Quando uma versão não é elegível, não há alternates. Cada registro tem datas independentes. Sem primeira data comprovada, schema WebPage verdadeiro, sem datePublished nem BlogPosting. Footer apenas, sem novo menu Header. Somente URLs do blog usam BLOG_ORIGIN final; resolveSiteUrl mantém política das páginas antigas. Sitemap normaliza URLs do blog no filter/serialize sem alterar antigas; noindex de preview por X-Robots-Tag real, mesmo HTML promovido.

## Entrega de build

Snapshot v4 anterior, invalidado para release pelo gate visual (preservado para auditoria): `/private/tmp/torno-blog-release-20261014-v4`, buildAt `2026-10-14T20:08:18Z`. `npm run build` (check+build) passou; QA release 12/12, integrity 4/4. Manifesto público entries vazio, sitemap 18. Hash de source-sha256.json: `93b37fd97f869d5d1b7088072f162612ffa487e8205a82eacd0a8086aa0949f4`; hash de artifact-sha256.json: `9502ed010e8f8a65d0ea99034aaad6f66553f486ecd786f614d4cd9ff4c0480b`. Fixture permanece gate independente antes do draft. PUBLIC env comparadas com API produção em 20:07:02Z e iguais às existentes; nenhum valor/token em evidências.

## Gate Edge e operação pelo coordenador

Bundle anterior cases: 3 arquivos, agregado SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`; manifesto em `/private/tmp/torno-blog-baseline-20261014/edge-manifest.json`. Scripts com hash fixado comparam baseline/cópia byte a byte antes/depois do draft, vinculam edgeBundleHash ao preview e revalidam na promoção. Presença Edge é verificada também depois do restore; não substitui verificação de identidade.

Draft autorizado após fixture/checks: `node /private/tmp/torno-blog-deploy.mjs /private/tmp/torno-blog-release-20261014-v5-final`. Produção somente Batuta após QA/review/design: `node /private/tmp/torno-blog-publish.mjs /private/tmp/torno-blog-release-20261014-v5-final`. Coordenador cria `qa-gate.json` no snapshot com approved=true, approvedBy=Batuta, deployId exato, artifactManifestHash, edgeBundleHash e technicalReview/functionalQA/visualReview aprovados. Preview verificado inclui corpo idêntico ao artefato e X-Robots-Tag noindex; domínio final deve ficar sem esse header. Nenhum token em argumentos ou evidências.

Arquivos efetivamente alterados além dos novos módulos/rotas blog: routes.mjs/d.mts, Base, Header/Footer/LangSwitch, astro.config.mjs e package.json/lock (apenas yaml direto, sem atualização das dependências existentes). i18n.ts e arquivos de copy existentes não precisaram mudar; microcopy Mote está nos dois componentes de blog. Testes são autoria QA, preservados; docs design autoria Timbre.

## Candidato atual v5-final

`/private/tmp/torno-blog-release-20261014-v5-final`, buildAt `2026-10-14T20:14:18Z`. Source manifest SHA-256 `db7a732010d50b90770dc1979c2b93b1e0aeb64e41629386055a7c5ac7b2f785`; artifact manifest SHA-256 `e9f3348370ce58805cd9853949ef17eb6787f021883b534deb85e4b0ab2718df`. Check/build, release12/12 e integrity4/4 passam. Quatro ajustes desde v4: CTA índice conforme tokens; CTA artigo e breadcrumb; tabela semântica em contêiner rolável/focável com indicação por idioma; grid do Footer evita compressão da marca ao acrescentar Blog. Requer novos gates visual/fixture/review antes do draft. Microcopy dos índices/CTAs preservada.

### Reproduzir a fixture com proveniência do candidato

`python3 /private/tmp/torno-blog-build.py --source-dir /private/tmp/torno-blog-release-20261014-v5-final --fixture-dir /private/tmp/torno-blog-fixtures-20261014 --build-at 2026-10-14T20:00:00Z --output /private/tmp/torno-blog-qa-20261014-final` (output deve estar ausente). Wrapper verifica manifest completo da origem e hashes de produto na cópia após injeção; `fixture-provenance.json` identifica sourceRoot, sourceManifestHash e productFiles. Fixture da working tree não substitui esse gate do candidato congelado.

## Draft entregue após gates

TechnicalReview Ritmo PASS; visualReview Timbre PASS; functionalQA Afinador PASS (release12/12, integrity4/4, fixture7/7, proveniência produto90/90). Limitações Lighthouse/axe/teclado Portal registradas pelos revisores, aceitas pelo coordenador para draft.

Draft `6acfe455ce78d78ac97cc565`: https://6acfe455ce78d78ac97cc565--tornostudio.netlify.app . Ready, Edge presente, bundle SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79` idêntico ao baseline antes/depois do upload. Artifact/source hashes iguais v5-final. `preview.json`, `preview-verified.json` e `edge-baseline.json` estão no snapshot v5-final. Script comprovou `/`, `/blog/`, `/en/blog/`: HTTP200, bytes idênticos ao dist, X-Robots-Tag:noindex real. Produção permaneceu `6acf74b406c100fbad5c86ef`; Compasso não promoveu. QA HTTP independente entregue ao Afinador; promoção somente Batuta/root após esse gate.
