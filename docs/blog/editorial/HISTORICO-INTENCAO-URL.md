# Histórico de intenção → URL — Torno Studio

**Responsável:** Trilha. **Atualizado:** 15/10/2026. **Estado:** estrutura dos índices publicada; artigo de planilhas publicado e observado; artigo de critérios de aceite `approved` para inclusão em release, ainda sem deploy observado. A URL aprovada não é publicada até validação pós-deploy. Nenhuma mudança no site por Trilha. [FATO — atualização de Henrique transmitida em 14/10/2026] A estrutura do blog está autorizada; artigos seguem dependentes de pesquisa, texto real, revisão e aprovação. Este é o livro de decisões para evitar páginas duplicadas e permitir ingestão futura idempotente. Contrato de campos e revisão: [`CONTRATO-EDITORIAL.md`](CONTRATO-EDITORIAL.md).

## Convenção de estado e evidência

- `draft`: ideia/ficha sem página pública; `review`: texto em revisão; `approved`: liberado editorialmente, ainda sem comprovação de publicação; `published`: URL pública confirmada; `hold_cannibalization`: conflito de intenção a resolver; `retired`: URL antes publicada e depois retirada, com destino/decisão documentados. Para pauta nunca publicada, usar `no_go`, sem simular URL retirada. Estado é por **URL e idioma**, não por cluster.
- [FATO — `seo/especializado-2026-10-13/verificacao-producao-root.json`, coleta em 13/10/2026 às 22:37:56 UTC] As seis rotas abaixo responderam HTTP 200, canonical próprio, H1 único, sem `noindex` observado e presentes no sitemap. Assim, `published` significa disponível naquela observação. **Indexação, impressão, posição, cliques e conversão: SEM DADO**; obter por Search Console autenticado e CRM com origem, sem interpretar sitemap como indexação.
- Data exata do primeiro deploy das **seis rotas especializadas da seção 1**: **SEM DADO** neste registro. Obter log de deploy verificável com URL/commit e não inferir de `datePublished` estático nem da data da coleta. Isso não se aplica ao deploy da estrutura do blog, documentado separadamente na seção 0. Versões locais do site foram inspecionadas em 14/10/2026, somente leitura.

## 0. Evento de estrutura: índices do blog (não são artigos)

**[FATO — Netlify, arquivo [`production.json`](/private/tmp/torno-blog-release-20261014-v5-final/production.json), lido em 14/10/2026]** O deploy de produção `6acfe455ce78d78ac97cc565` substituiu `6acf74b406c100fbad5c86ef`. O campo `publishedAt` do deploy é **`2026-10-14T20:23:08.900Z`**; hash do manifesto do artefato: **`e9f3348370ce58805cd9853949ef17eb6787f021883b534deb85e4b0ab2718df`**. Essa hora é a publicação do *deploy*, não uma data de publicação de artigo.

| Evento de estrutura | URL e estado após o deploy | Evidência pública comunicada por Batuta | Separação editorial |
|---|---|---|---|
| `blog-index-pt:6acfe455ce78d78ac97cc565` | [`/blog/`](https://tornostudio.com/blog/) — `published` como **índice**, idioma `pt-BR` | [FATO — verificação de Batuta, 14/10/2026] HTTP 200, canonical próprio, sem `noindex` final. | Índice vazio; zero posts. Não atribuir `content_id`, autor, `Article`, `datePublished` de post ou intenção de artigo. |
| `blog-index-en:6acfe455ce78d78ac97cc565` | [`/en/blog/`](https://tornostudio.com/en/blog/) — `published` como **índice**, idioma `en` | [FATO — verificação de Batuta, 14/10/2026] HTTP 200, canonical próprio, sem `noindex` final. | Índice vazio; zero posts. Não presumir tradução/artigo EN. |

**[FATO comunicado por Batuta, 14/10/2026]** Sitemap de produção com **18 URLs**; contagem não reexecutada por Trilha e não usada como prova de indexação. **Indexação no Google Search Console: SEM DADO** para ambos os índices; obter inspeção autenticada de URL e registrar data/resultado. O `production.json` confirma ID, deploy anterior, `publishedAt` e hash; os HTTP/canonical/noindex, o total do sitemap e os zero posts vêm da verificação comunicada por Batuta, não desse JSON. Hora exata da checagem HTTP: **SEM DADO**. Chave de deduplicação deste evento de estrutura: `deploy_id + path + tipo=blog_index`; ela é separada da chave `content_id + locale` dos artigos. Uma nova checagem do mesmo deploy/path atualiza evidência, sem criar artigo nem reiniciar sua data.

## 1. Intenções já ocupadas

| `intent_id` / tipo | Pergunta principal e público | URL PT — estado | URL EN — estado | Fronteira e próximo link |
|---|---|---|---|---|
| `recovery-commercial` / landing | “Quem pode retomar meu software travado, após agência ou tentativa própria?” Comprador com operação/piloto, decisão, acesso e orçamento. | [`/recuperacao-de-projeto/`](https://tornostudio.com/recuperacao-de-projeto/) — `published` [FATO, verificação 13/10/2026] | [`/en/software-project-rescue/`](https://tornostudio.com/en/software-project-rescue/) — `published` [FATO, mesma coleta] | Dono da contratação/escopo de recuperação. Conteúdo informacional de handover aponta para ela; não copiar sua oferta/FAQ em artigo. |
| `lovable-production-commercial` / landing | “Meu app Lovable com uso real pode ser preparado para produção; qual escopo/aceite/preço?” | [`/lovable-em-producao/`](https://tornostudio.com/lovable-em-producao/) — `published` [FATO, verificação 13/10/2026] | [`/en/lovable-to-production/`](https://tornostudio.com/en/lovable-to-production/) — `published` [FATO, mesma coleta] | Dono da contratação ligada à ferramenta; suporte de plataforma e tutorial genérico ficam fora. Link técnico ao guia RLS quando a questão é isolamento de dados. |
| `rls-multitenant-howto` / guia | “Como modelar e testar permissões multiempresa em Supabase/RLS?” Pessoa técnica/decisor avaliando evidência. | [`/guias/rls-multiempresa/`](https://tornostudio.com/guias/rls-multiempresa/) — `published` [FATO, verificação 13/10/2026] | [`/en/guides/multi-tenant-rls/`](https://tornostudio.com/en/guides/multi-tenant-rls/) — `published` [FATO, mesma coleta] | Dono do método e SQL demonstrativo. Não transformar teste local em certificação de produto. Aponta às landings se houver demanda comercial delimitada. |

**Pares de idioma:** os seis paths constam em `projeto-50k-site/src/config/routes.mjs`, lido em 14/10/2026 [FATO local]. A verificação de produção citada acima confirma canonical e sitemap; a reciprocidade `hreflang` foi observada na inspeção local do layout, e deve ser reconfirmada no HTML público antes de qualquer alteração ou ingestão. `first_published_at` segue **SEM DADO** nos seis registros até evidência de deploy.

## 2. Intenções candidatas, sem artigo criado

| `intent_id` provisório | Estado | Decisão e condição | Risco de sobreposição |
|---|---|---|---|
| `decidir-quando-automatizar-processo-planilhas` (proposto no briefing externo de 14/10/2026; **não aprovado como intenção distinta**) | `hold_cannibalization` para o rascunho `torno-artigo-pt-20261014-planilhas`; **sem artigo/URL publicado ou aprovado para release** | [DECISÃO da Trilha, 14/10/2026, 21:17 UTC] **HOLD**. O novo título e `/blog/quando-automatizar-processos-planilhas/` não revertem o NO-GO `spreadsheet-to-system-pt`. Exemplo de capacidade residual tem valor editorial possível, mas não prova nova intenção SEO; concorrência direta em [Thainan Prado](https://thainanprado.com.br/blog/como-automatizar-processos-e-sair-das-planilhas), [Luna Next-Gen](https://lunanexgen.com/blog/sistema-proprio-ou-planilhas-quando-migrar.html) e [Vetor Studio](https://vetor.studio/blog/software-sob-medida-ou-software-pronto/). Volume da formulação exata **SEM DADO**. Análise, fontes, limites e condições: [`REVISAO-PAUTA-PLANILHAS-2026-10-14.md`](REVISAO-PAUTA-PLANILHAS-2026-10-14.md). | Mesma pergunta inicial/público do tema NO-GO; home e `/diagnostico/` já tratam começar por um processo. Rotas de recuperação, Lovable e RLS têm intenção diferente. Não reservar slug, não enviar à engenharia como conteúdo aprovado. |
| `app-web-mvp-cost-pt` | `draft` (pauta, **sem URL publicada ou reservada**) | [HIPÓTESE, `seo/decisao-artigos-pos-planejador.md`, 09/10/2026] Artigo sobre custo de app **web/PWA** e MVP, condicionado à SERP brasileira dos termos “quanto custa criar um app” e “quanto custa desenvolver um aplicativo”, fontes de preço reconferidas e separação explícita de app nativo. Slug histórico sugerido em `seo/pauta-3-artigos.md` não é decisão atual. | Pode competir com preço/escopo da home; artigo responde composição de custos e critérios, home responde oferta Torno. Link contextual à oferta/diagnóstico. |
| `software-vendor-choice-pt` | `draft` (pauta, **sem URL publicada ou reservada**) | [HIPÓTESE, decisão SEO 09/10/2026] Artigo sobre escolha de fornecedor/formato, condicionado à SERP de “software house”, “fábrica de software” e “empresa de desenvolvimento de sistemas”. Intenção de marca ERP/curso/diretório: **SEM DADO** de distribuição na SERP; coletar e classificar. | Não recriar landing genérica de serviço nem prometer substituição de equipe. |
| `spreadsheet-to-system-pt` | `no_go` como pauta SEO anterior; nenhum artigo/URL publicado | [FATO de decisão editorial, 09/10/2026] `seo/decisao-artigos-pos-planejador.md` marcou NO-GO SEO por baixo volume e concorrência brasileira atual. Conteúdo pode ser peça de vendas ou seção de outro artigo, após revisão. | Slug antigo `/blog/quanto-custa-sistema-sob-medida/` em `seo/pauta-3-artigos.md` é histórico, **não reservar nem publicar** por inércia. |
| `prototype-to-production-generic-pt` | `no_go` como pauta SEO anterior; nenhum artigo/URL publicado | [FATO de decisão editorial, 09/10/2026] NO-GO SEO para “protótipo para produção”; SERP mista com manufatura. Reavaliar só com novo dado. | Slug antigo `/blog/prototipo-para-producao/` não é rota aprovada; uma versão Lovable comercial já tem dona. |

### Decisão de intenção — critérios de aceite antes de contratar (rascunho)

Registro da decisão qualitativa da Trilha, recebida em `2026-10-15T11:28:11Z`. Este evento formaliza somente a decisão de intenção/colisão; não é aprovação factual, editorial final, autorização de release ou publicação. O estado do conteúdo segue `draft` até PASS factual/editorial de Verso e demais gates separados.

| Campo | Valor |
|---|---|
| `event_id` | `intent-go:software-vendor-choice-pt:2026-10-15T11:28:11Z` |
| `content_id` | `null` — não atribuído nesta decisão |
| `intent_id` | `software-vendor-choice-pt` — pauta existente, estado `draft`; reutilizada, sem novo identificador |
| `state` | `draft`; revisão factual/editorial pendente; sem `release_approved` |
| `proposed_path` | `/blog/criterios-aceite-mvp/` — proposta do STATUS; não reservada, não implementada |
| `canonical_url` / `first_published_at` / `evidence_of_publication` | `null` / `null` / `null` |
| decisão e intenção | **GO qualitativo** para avançar no cluster “Escolha de fornecedor e processo”: ajudar quem considera contratar MVP, integração ou ferramenta interna a definir e verificar comportamentos e evidências de aceite antes da contratação. Não ampliar para comparação genérica de fornecedores/custos nem decisão de migração de planilhas. |
| colisão | Trilha avaliou sobreposição moderada com home/diagnóstico e limitada com o artigo de planilhas publicado; recuperação, Lovable em produção e RLS permanecem intenções distintas. Comparação qualitativa, não verificação HTTP independente pela Trilha. |
| demanda / volume | **SEM DADO**; não pesquisado nem inferido nesta decisão. |
| rascunho recebido | `torno-artigo.md`, SHA-256 `011c28de38f0252f29923186ac2c771c49d876057355c1642284ff26cf63cb97` (7796 bytes). |
| evidência de fontes | Coleta única `checked_at` UTC entre `2026-10-15T11:29:47.290Z` e `2026-10-15T11:29:50.891Z`; JSON [FONTES-HTTP](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-FONTES-HTTP.json), SHA-256 `171c6b697391b85250ee9e44bcd9de1cded79f4b4c1d55e032b128e6eebe48dd`; relatório [REVISÃO-FONTES](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-REVISAO-FONTES.md), SHA-256 `bd8c600b75bb25cce7bac9bf0c876c6198a5122872288447ee4883c794350033`. Verso ainda deve emitir PASS/hold factual/editorial read-only com hash final e `reviewed_at` UTC. |
| autoria / aprovação | Sem autor/byline. Hash de aprovação editorial, `release_approved_by`, `release_approved_at`, manifesto de release e evidência de publicação: `null`. |

**Próximo gate:** aguardar PASS factual/editorial de Verso sobre os bytes finais do Markdown e hash/revisão real; somente então atualizar estado de aprovação conforme contrato. Esta formalização mantém o registro em `draft`; não autoriza candidate/build, não reserva URL e não altera qualquer decisão SEO ou volume existente.

### Evento editorial do rascunho sobre planilhas

Registro feito em **14/10/2026 às 21:18:44 UTC**; a decisão vinculada foi escrita pela Trilha em **14/10/2026 às 21:17 UTC**. São horários de registro/decisão, não de publicação. Este evento é do **rascunho**, separado dos eventos de estrutura dos índices da seção 0:

| Campo | Valor |
|---|---|
| `event_id` | `editorial-hold:torno-artigo-pt-20261014-planilhas:2026-10-14T21:17Z` |
| `content_id` / `locale` / `type` | `torno-artigo-pt-20261014-planilhas` / `pt-BR` / `artigo` |
| `briefing_sha256` | `5bed770bfd9d1dfdc88d634cd213a75686216c2bc6b348bfd0868d846b7ba172` — SHA-256 do briefing externo, reverificado por Farol em 14/10/2026 [FATO comunicado]. |
| `body_sha256` / `copy_reviewed_at` | `c87f518dfddce0ed33b8fff92be44e7eb78297d1b65772d41585d6dc1a9a0b98` — hash do corpo comunicado pela revisão real **somente leitura** de Verso em `2026-10-14T21:17:13Z`, para clareza e cálculo [FATO comunicado]. Não é autoria, aprovação editorial nem autorização de release. |
| `intent_id` | `decidir-quando-automatizar-processo-planilhas` **proposto, não validado como intenção distinta** |
| `state_before` → `state_after` | `draft` → **`hold_cannibalization`**; zero aprovação para inclusão em artefato/release |
| `proposed_path` | `/blog/quando-automatizar-processos-planilhas/` **apenas proposta**; não reservado, não implementado e não publicado |
| `canonical_url` / `first_published_at` / `evidence_of_publication` | `null` / `null` / `null`; não converter a URL proposta em canonical confirmado |
| `editorial_approval_hash` / `release_approval_hash` | `null` / `null`; os hashes do briefing e corpo acima **não** são hashes de aprovação. |
| `release_approved_by` / `release_approved_at` / `release_approval_evidence` | `null` / `null` / `null`; nenhum GO de publicação ou instrução à engenharia |
| `linked_decision` | NO-GO SEO **`spreadsheet-to-system-pt` de 09/10/2026 permanece**, sem substituição por ID/slug novo. Motivo: mesma pergunta inicial, público e etapa; concorrência brasileira atual; volume da formulação nova **SEM DADO**. |
| `evidence_uri` | [Revisão escrita e canibalização](REVISAO-PAUTA-PLANILHAS-2026-10-14.md); [decisão SEO original](../seo/decisao-artigos-pos-planejador.md#2-artigo-2-sistema-sob-medida--sair-da-planilha); [reconsulta de fontes do Farol](ARTIGO-PLANILHAS-20261014-REVISAO-FONTES.md) e [HTTP/`checked_at`/hashes](ARTIGO-PLANILHAS-20261014-FONTES-HTTP.json), coletados em 14/10/2026. |

**Efeito da reconsulta:** [FATO — Farol, `checked_at` entre 21:17:29 e 21:17:45 UTC em 14/10/2026] Google Sheets, Apps Script, Microsoft Learn e a home do Torno responderam HTTP 200 e sustentam, dentro dos limites anotados pelo Farol, afirmações pontuais do rascunho. Isso melhora a verificação factual; **não mede volume/competição, não demonstra intenção distinta e não altera o HOLD**. O exemplo de horas e capacidade continua [HIPÓTESE] fictícia. A autoria real do artigo permanece **SEM DADO**; Verso ter revisado o texto não cria autoria nem aprovação de release.

**Fechamento de Verso (somente leitura; horário exato da correspondência final não comunicado):** conferiu as quatro fontes do rascunho contra [a revisão do Farol](ARTIGO-PLANILHAS-20261014-REVISAO-FONTES.md) e [o JSON de evidência](ARTIGO-PLANILHAS-20261014-FONTES-HTTP.json), incluindo HTTP 200, URLs, `checked_at`, hashes e marcadores; os claims **limitados** descritos nesses arquivos são sustentados. Verso **não** fez reconsulta independente, e o JSON não guarda snapshot integral das páginas. O cálculo **40/14/26 horas e R$ 1.300** permanece [HIPÓTESE] de capacidade, sem economia de caixa comprovada. O corpo do rascunho não menciona “Power Platform” literalmente; a especificidade dessa fonte permanece na nota do Farol. Da correspondência não se inferem volume ou SERP, nem se gera hash de aprovação. **HOLD e autoria SEM DADO permanecem.**

**Condição de reavaliação:** apresentar pergunta e resposta centrais materialmente mais estreitas que o NO-GO antigo, a home e os concorrentes, com comparação documentada; medir a formulação proposta no Planejador e conferir SERP localizada com data/mercado/idioma e limites; registrar evidência de utilidade para comprador real sem dados sensíveis; confirmar autor pessoa real, fontes e revisão final. Se houver apenas utilidade editorial, usar como material comercial sujeito a revisão, sem abrir URL por novo `intent_id`. Qualquer GO futuro exige **nova decisão escrita e repasse de GO real do solicitante**; este evento não aprova publicação.

Para qualquer pauta futura, preencher `content_id`, pergunta principal, `intent_id`, slug proposto, idioma, resultado da comparação com as seis URLs, fontes, responsável e decisão datada **antes** de pedir implementação. **[FATO — observação comunicada pelo Farol, 14/10/2026 às 19:58 UTC, anterior ao deploy da seção 0]** HEAD de `https://tornostudio.com/blog/` e `https://tornostudio.com/en/blog/` respondeu **404**; `sitemap-0.xml` não continha URLs de blog na mesma checagem. [FATO — confirmação comunicada por Compasso via API Netlify] O deploy então em produção `6acf74b406c100fbad5c86ef` estava `ready` às **12:25:55 UTC** em 14/10/2026. **Limite:** HEAD 404 e sitemap sem blog descrevem apenas aquele estado anterior. O evento posterior da seção 0 registra os índices publicados; nenhuma das duas observações comprova indexação no Google ou existência de artigos.

## 3. Eventos e deduplicação para ingestão futura

Registro proposto [HIPÓTESE de processo, 14/10/2026]; não pressupõe acesso a rotina ou plataforma:

```text
event_id | observed_at_utc | source | content_id | intent_id | locale |
path | canonical_url | state_before | state_after | evidence_uri |
content_revision | published_at | substantive_updated_at | reviewer | note
```

1. Registrar decisão como evento **append-only**, com hora UTC de observação, quem observou e evidência estável (commit, log de deploy, resposta HTTP/HTML, URL do conteúdo). Correção de evento gera outro evento; não apagar a trilha. O estado corrente é a última transição válida por `content_id + locale`.
2. Normalizar URL para comparar: host canônico `tornostudio.com`, HTTPS, path com barra final, sem fragmento, parâmetros de campanha ou variação `www`. `canonical_url + locale` é chave de publicação; `intent_id + locale` deve ter **uma só URL dona ativa**. Slug EN pode diferir do PT. Se duas URLs reivindicarem a mesma intenção, bloquear ingestão/publicação e resolver editorialmente.
3. Chave idempotente recomendada: `source + content_id + locale + content_revision + state_after`; `event_id` é identificador imutável da observação. Reprocessar o mesmo lote não muda o estado nem cria item repetido. Revisão significa hash ou commit de conteúdo normalizado, não horário da rotina. Se um mesmo conteúdo reaparecer com URL diferente, tratar como migração explícita com decisão de 301/canonical e preservação do histórico, nunca como artigo novo automático.
4. Ingestão só promove a `published` com evidência pública da **URL final** (HTTP, canonical, ausência de `noindex`, corpo esperado), além do aceite editorial. Preview, arquivo local, estado `approved`, sitemap isolado e hora agendada não bastam. Atualizar `first_published_at` uma vez, com evidência do deploy; atualização posterior preserva essa data e só altera `substantive_updated_at` quando houver mudança real revisada.
5. Ingestão PT/EN separada: par incompleto continua válido sem tradução; `hreflang` só conecta pares publicados e equivalentes. Um evento EN não republica PT, não herda sua data e não cria tradução presumida. Falha de fonte, autoria ou equivalência leva a `review`/`hold_cannibalization`, sem distribuição.
6. Rotina útil de 08:15/12:00/18:00 relatada pelo usuário em 14/10/2026. `maestri routine list` neste workspace retornou vazio segundo a mesma instrução. Identificador, acesso, payload e proprietário operacional: **SEM DADO**; obter com Henrique/Farol se houver integração futura. **Não criar nem alterar rotina.** Um consumidor futuro pode ler este registro como entrada e aplicar as chaves acima, mas não deve inferir que esta equipe tenha acesso ao agendamento.

## 4. Critério de manutenção

Em cada proposta de artigo, comparar GSC (quando autenticado), SERP atual e pergunta de comprador com a URL dona; registrar decisão `update_existing`, `new_distinct_intent`, `hold_cannibalization` ou `retire_redirect`, data, responsável e fonte. Comparar PT com PT e EN com EN; pares traduzidos compartilham intenção, não URL canônica. Revisar links de ida/volta quando uma URL entrar ou mudar. Search Console continua **SEM DADO** neste registro: `baseline-publicacao.json` de 13/10/2026 registra bloqueio por login. Como obter: Farol/Batuta com acesso autorizado exportam desempenho por página/consulta e inspeção de URL, com período e data; Trilha anexa a evidência e só então revisa decisões.

**Fontes:** `seo/especializado-2026-10-13/verificacao-producao-root.json` e `baseline-publicacao.json` (13/10/2026); `seo/especializado-2026-10-13/segmento-recuperacao.md` (13/10/2026); `seo/decisao-artigos-pos-planejador.md` (09/10/2026); `seo/pauta-3-artigos.md` (08/10/2026, pauta histórica); inspeção somente leitura de `projeto-50k-site/src/config/routes.mjs`, `src/layouts/Base.astro`, `src/content/seo/commercial.ts` e `src/components/seo-guide/content.ts` (14/10/2026).

### Evento de decisão de negócio: GO do mesmo rascunho, SEO NO-GO preservado

**Registrado em `2026-10-14T21:28:02Z`** (UTC, relógio do sistema). Esta transição é posterior ao evento HOLD acima. [FATO — instrução explícita de Henrique recebida nesta conversa] A autorização de negócio é permanente para publicar este conteúdo apesar do risco SEO identificado. Ela não altera a classificação SEO nem cria intenção/URL nova.

| Campo | Valor |
|---|---|
| `event_id` | `business-go:torno-artigo-pt-20261014-planilhas:2026-10-14T21:28:02Z` |
| `content_id` / `locale` / `type` | `torno-artigo-pt-20261014-planilhas` / `pt-BR` / `artigo` |
| `intent_id` | `spreadsheet-to-system-pt` — ID do NO-GO SEO original, mantido sem reetiquetar |
| `state_before` → `state_after` | `hold_cannibalization` → `approved` para autorização editorial/de negócio; o HOLD anterior permanece no histórico como decisão então vigente, **superada apenas quanto à autorização de publicação** por este evento posterior |
| `business_decision` | **GO para publicar o mesmo rascunho apesar do risco reconhecido** e da avaliação SEO NO-GO. Esta é autorização de negócio para o conteúdo; não é instrução operacional à engenharia nem comprovação de inclusão em artefato/deploy. |
| `seo_decision` | **NO-GO SEO `spreadsheet-to-system-pt` permanece verdadeiro** como avaliação histórica de demanda/concorrência. Não foi revogado nem convertido em GO SEO. Demanda/volume da formulação nova: **SEM DADO**; não inferir demanda a partir do GO de negócio. |
| `proposed_path` | `/blog/quando-automatizar-processos-planilhas/` continua sendo apenas a proposta já associada ao rascunho; não é nova URL/intenção, nem está reservada ou publicada por este registro |
| `author_name` / `author_basis` / byline | `null` / `null` / omitida, conforme instrução explícita de Henrique: não atribuir o post a pessoa ou organização; sem Henrique, “Redação Torno Studio” ou fallback herdado |
| `Article` / `BlogPosting` | Permitido sem a propriedade `author`, omitida por completo. Google documenta author como recomendada, sem propriedades obrigatórias para Article; ver contrato e [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/article). Nenhum bloqueio técnico conhecido para schema sem author. |
| `release_approved_by` / `release_approved_at` / evidência | Henrique / `2026-10-14T21:28:02Z` / autorização explícita e permanente para publicar este conteúdo, registrada neste evento. Não foi criado hash de aprovação nem acionado release; ID de artefato/deploy futuro: ainda não aplicável. |
| `canonical_url` / `first_published_at` / `evidence_of_publication` / `indexation_observation` | permanecem sem observação; GO não significa publicado. Indexação GSC: **SEM DADO**. |
| `risk_and_evidence` | Sobreposição com concorrentes e com a mensagem da home/diagnóstico, conforme [revisão da pauta](REVISAO-PAUTA-PLANILHAS-2026-10-14.md); fontes rechecadas pelo Farol e limites da correspondência de Verso estão documentados no evento HOLD anterior e nos arquivos de evidência referidos ali. Valor editorial não equivale a demanda/volume. |

**Deduplicação:** não criar novo `intent_id`, slug, canonical ou evento de intenção para contornar o NO-GO. A proposta de intent `decidir-quando-automatizar-processo-planilhas` permanece apenas rótulo exploratório antigo e não validado; a publicação autorizada continua ligada ao mesmo conteúdo e à avaliação `spreadsheet-to-system-pt`. Manter um único registro de conteúdo e anexar esta decisão como evento append-only.



### Evento de publicação observada: mesmo rascunho, NO-GO SEO preservado

**Publicado pela Netlify em `2026-10-14T21:49:58.068Z`; produção verificada em `2026-10-14T21:52:14.808Z` UTC.** Este evento completa a transição após a autorização de negócio e o PASS editorial/hash; não modifica a avaliação SEO nem cria uma intenção nova.

| Campo | Valor |
|---|---|
| `event_id` | `published:torno-artigo-pt-20261014-planilhas:2026-10-14T21:49:58.068Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261014-planilhas` / `spreadsheet-to-system-pt` / `pt-BR` — mesmos identificadores do HOLD e do GO de negócio |
| `state_before` → `state_after` | `approved` → `published`; estado registrado somente após a produção pública ser observada |
| `path` / `canonical_url` | [`/blog/quando-automatizar-processos-planilhas/`](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/) — HTTP 200, canonical próprio e indexável, sem `noindex` |
| `first_published_at` / `verified_at` | `2026-10-14T21:49:58.068Z` (Netlify `publishedAt`) / `2026-10-14T21:52:14.808Z` (observação registrada em `production.json`) |
| `author_name` / `author_basis` / byline | `null` / `null` / omitida, conforme instrução de Henrique; nenhuma pessoa ou organização atribuída |
| `Article` / datas | JSON-LD `BlogPosting` sem propriedade `author`, `datePublished` ou `dateModified`; sem byline HTML e sem alternate EN. `first_published_at` vem da evidência real do deploy; data de atualização substantiva permanece `null`. |
| `body_sha256` / revisão | `a84d4826d4b1d68efc03767aea2c09dd2ba8386a7b1ddaee87f235cc15974d66` — Markdown aprovado byte a byte por Verso, 11.761 bytes, `reviewed_at=2026-10-14T21:33:40Z`; HTML de produção idêntico ao artefato e ao conteúdo aprovado |
| `deployment_id` / estado / Edge | `6acff8bd6dccb98caf26f5cd` / `ready` / ativo; anterior `6acfe455ce78d78ac97cc565` |
| hashes de release | source manifest `994c7b592ad7eb8a64fcfa6655f77f9dc89d0cad5ef1672cd5dccc3d91a6cfb1`; artifact manifest `15b1e3a7f9123b78411017b2350fe7fd87fba6ad10a42b1a73bdacdf53c7cf0e`; release approval manifest `f71d6e77b13653a98332b4f68237cfad0004a2d63024f912da70a9b08bea6131`; Edge bundle `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79` |
| sitemap / preservação | Sitemap publicado com 19 URLs: 18 preexistentes preservadas + este artigo PT; sem versão EN. As 19 URLs observadas responderam 200/canonical próprio; seis cases PT/EN preservados. Três rotas da fixture privada seguem 404 e não foram publicadas. |
| QA de produção | `5/5` checks PASS; artigo, canonical/indexabilidade/schema/links/hashes e seis cases conferidos. Indexação no Google Search Console: **SEM DADO**, não inferida de HTTP 200 ou sitemap. |
| decisão SEO | NO-GO SEO histórico `spreadsheet-to-system-pt` permanece verdadeiro; demanda/volume da formulação continua **SEM DADO**. O GO de negócio autorizou publicar apesar do risco, sem alterar a decisão SEO. |
| evidências | [`production-http-article-r3.log`](../../../projeto-50k-site/docs/qa/blog-20261014/production-http-article-r3.log) (SHA-256 `6cfdc5189104f799c182814b7885193e0e5cddd5eabcd974678e5dca6573b7d6`); [`production.json`](../../../projeto-50k-site/docs/qa/blog-20261014/production.json) (SHA-256 `655ec36d39b6a8292fa60f8716dc174e8c10a37dfeae0865e78d3a4b150e2364`); snapshot `/private/tmp/torno-blog-release-article-candidate-r3-20261014/` |

### Evento posterior: aprovação de inclusão no artefato (ainda não publicado)

Registro operacional em `2026-10-15T11:36:05Z` UTC, após o PASS final de Verso. Este evento posterior não reescreve a decisão Trilha de `2026-10-15T11:28:11Z` nem a formalização anterior; cobre somente os bytes identificados abaixo e não é evidência de deploy, HTTP público, sitemap ou indexação.

| Campo | Valor |
|---|---|
| `event_id` | `release-approved:torno-artigo-pt-20261015-criterios-aceite-mvp:2026-10-15T11:36:05Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-criterios-aceite-mvp` / `software-vendor-choice-pt` / `pt-BR` |
| `state_before` → `state_after` | `draft` → `approved`; Verso factual/editorial PASS em `2026-10-15T11:33:53Z`. Só passa a `published` após verificação pós-deploy. |
| `proposed_path` / canonical planejado | `/blog/criterios-aceite-mvp/` / `https://tornostudio.com/blog/criterios-aceite-mvp/`; aprovado para este conteúdo, ainda não observado em produção. |
| corpo aprovado | `/private/tmp/torno-blog-article-review/torno-criterios-aceite-mvp.md`; 7.795 bytes, 78 linhas; SHA-256 `b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6`. |
| `release_approved_by` / `release_approved_at` | Farol, delegado operacional autorizado por Henrique / `2026-10-15T11:36:05Z` UTC. Base: autorização permanente de 14/10 e autorização operacional explícita de 15/10 para este conteúdo, reafirmada neste turno após os gates. |
| proveniência de revisão e decisão | Verso PASS claim-by-claim, hash acima, `reviewed_at=2026-10-15T11:33:53Z`; Trilha GO qualitativo `2026-10-15T11:28:11Z` para o intent existente. Não atribui revisão/hash pessoal a Henrique. |
| assets | `torno.svg` SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582` (usado no Markdown); variantes de QA `torno.png` SHA-256 `aea3031445187a09fbb29158146fd009c850617c1a389c61cb9d05beb24fbd8e` e `torno-360.png` SHA-256 `87add3052f29afc09bee950f6e835437c9115eb4d257e96fdc4e976f067dc45f`. |
| fontes | JSON HTTP SHA-256 `171c6b697391b85250ee9e44bcd9de1cded79f4b4c1d55e032b128e6eebe48dd`; relatório SHA-256 `bd8c600b75bb25cce7bac9bf0c876c6198a5122872288447ee4883c794350033`. |
| recibo de aprovação | [`ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json`](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json), SHA-256 `fc4d6924b7494f80393eb2f5eedaf2449f089512f7c5813e1f90ecd899af83b9`. O recibo liga este GO ao hash Verso, à decisão Trilha e à delegação operacional; não reutiliza aprovação do primeiro post. |
| autoria / datas / indexação | Sem autor/byline e sem data de publicação; `first_published_at=null` até observação Netlify. GSC/indexação **SEM DADO**. |
| SEO | `software-vendor-choice-pt` reutilizado; demanda/volume **SEM DADO**; nenhuma avaliação SEO adicional ou inferência feita. |

**GO formal encaminhado a Batuta** para seguir o fluxo existente de candidato, QA e publicação autorizada após gates técnicos. A publicação ainda não foi observada; não marcar `published` antes da confirmação de produção.


### Adendo de aprovação: metadados e escopo do asset (pré-preview)

Registro em `2026-10-15T11:47:20Z` UTC, sem alteração do Markdown Verso. Title e description fornecidos por Henrique ficam vinculados ao mesmo corpo aprovado e à aprovação de inclusão já registrada; este adendo não é evidência de publicação.

| Campo | Valor |
|---|---|
| corpo exato | SHA-256 `b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6`; bytes aprovados permanecem imutáveis. |
| title | `Critérios de aceite para MVP: guia para contratar | Torno` |
| description | `Defina critérios de aceite antes de contratar um MVP. Veja exemplos, uma ficha de escopo e como validar integrações sem depender de promessas vagas.` |
| asset em runtime | `torno.svg`, SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582`; variantes PNG ficam em QA apenas. |
| aprovação | Farol, delegado operacional autorizado por Henrique, em `2026-10-15T11:47:20Z`, conforme valores exatos fornecidos por Henrique neste turno. |
| recibo aditivo | [`ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-METADADOS.json`](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-METADADOS.json), SHA-256 `d3e9f91a587683751cc92193a5c702bd6c7caf731c4339f3586c30d340016f36`. Recibo original permanece [`ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json`](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json). |
| estado técnico à observação | Baseline/Edge PASS em `2026-10-15T11:45:27.299Z`, deploy `6acff8bd6dccb98caf26f5cd` ready, Edge bundle `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`. Candidate v1 build concluído; preview ainda não pronto por figure/figcaption pendente e metadados divergentes. |
| publicação / indexação | Nenhuma observada; estado permanece `approved`, não `published`; GSC **SEM DADO**. |



### Adendo append-only: correção da proveniência de autorização

Registrado em `2026-10-15T11:47:53Z` UTC após o bloqueio de proveniência de candidate v1. Não reescreve os recibos anteriores; corrige a interpretação de timestamps e exige rebinding no candidate.

| Evento distinto | Responsável e horário UTC | Evidência/escopo |
|---|---|---|
| Autorização permanente de publicação | Henrique — `2026-10-14T21:28:02Z` | Autorização permanente do fundador, documentada na seção “Evento de decisão de negócio” deste histórico; Henrique reafirmou neste turno que é a autorização permanente aplicável. |
| Delegação operacional específica | Henrique — `2026-10-15T11:24:34Z` | Mensagem de Henrique identificada como “Maestri recall blue”, fornecida diretamente por ele; autoriza publicar após os gates. |
| Aprovação delegada para incluir o hash exato | Farol — `2026-10-15T11:36:05Z` | Ato separado de aprovação de inclusão, vinculado ao Markdown Verso `b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6` e ao recibo [APROVAÇÃO-RELEASE](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json), SHA-256 `fc4d6924b7494f80393eb2f5eedaf2449f089512f7c5813e1f90ecd899af83b9`. |
| Adendo de title/description e asset | Farol — `2026-10-15T11:47:20Z` | [ADENDO-METADADOS](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-METADADOS.json), SHA-256 `d3e9f91a587683751cc92193a5c702bd6c7caf731c4339f3586c30d340016f36`. |

O candidate v1 que atribuiu `authorizedBy=Henrique` com `authorizedAt=2026-10-15T11:36:05Z` fica **bloqueado e não promovido**: esse horário é exclusivamente da aprovação delegada de Farol. Compasso deve separar os eventos acima, atualizar os campos de frontmatter/recibos e rebinding dos hashes antes de retomar. A revisão factual de Verso permanece vinculada ao hash `b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6` em `2026-10-15T11:33:53Z`; nenhum review/hash pessoal é atribuído a Henrique. O corpo do artigo não muda; o estado permanece `approved`, ainda não `published`.

Adendo de correção: [ADENDO-PROVENIÊNCIA](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-PROVENIENCIA.json), SHA-256 `a31d1255c21ae78687690257d5b0ce817d2669ecf7f2b43f38e22548a8a18f7b`.


### Adendo v2: campos SEO e escopo Markdown + SVG; proveniência separada

Adendo recebido e registrado em `2026-10-15T11:48:27Z` UTC. Vincula-se ao mesmo conteúdo, intenção, path e corpo aprovado. `seo_title` e `seo_description` são os valores fornecidos por Henrique; nenhum byte do Markdown foi alterado.

- `seo_title`: `Critérios de aceite para MVP: guia para contratar | Torno`
- `seo_description`: `Defina critérios de aceite antes de contratar um MVP. Veja exemplos, uma ficha de escopo e como validar integrações sem depender de promessas vagas.`
- Escopo de runtime: somente Markdown SHA-256 `b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6` e `torno.svg` SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582`. PNGs excluídos, sem uso público/runtime.
- Proveniência em campos separados: autorização permanente Henrique em 14/10 com evidência própria no evento do fundador; delegação específica Henrique `2026-10-15T11:24:34Z` (Maestri recall blue); aprovação delegada Farol `2026-10-15T11:36:05Z`. Nenhum desses eventos atribui review ou hash pessoal a Henrique.
- Candidate v1 rejeitado como candidato devido à proveniência/metadata/figure incoerentes. Sem preview válido, promoção ou publicação. Não iniciar novo build até este adendo estar aplicado e os hashes rebindados.
- Recibo: [ADENDO-RELEASE-V2](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-RELEASE-V2.json), SHA-256 `8fdabafcadec3fd2b74f468db58592d9a86464e8d3aa985259de1b944080e82a`; recibo original permanece [APROVACAO-RELEASE](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-APROVACAO-RELEASE.json).


### Evento de publicação observada: critérios de aceite para MVP

**Deploy publicado em `2026-10-15T13:25:01.655Z` UTC; verificação HTTP independente em `2026-10-15T13:27:28.677688Z`.** Este evento acrescenta a observação de produção ao mesmo conteúdo e à intenção já avaliados. Os registros anteriores de GO qualitativo, aprovação e adendos permanecem históricos; a demanda não foi avaliada quantitativamente.

| Campo | Valor |
|---|---|
| `event_id` | `published:torno-artigo-pt-20261015-criterios-aceite-mvp:2026-10-15T13:25:01.655Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-criterios-aceite-mvp` / `software-vendor-choice-pt` / `pt-BR`; mesmos IDs da decisão Trilha e dos recibos de aprovação. |
| `state_before` → `state_after` | `approved` → `published`, somente após URL e conteúdo públicos verificados. |
| URL / canonical | [`https://tornostudio.com/blog/criterios-aceite-mvp/`](https://tornostudio.com/blog/criterios-aceite-mvp/) — HTTP 200, canonical próprio, sem `noindex` e permitida por `robots.txt`. |
| `first_published_at` / `verified_at` | `2026-10-15T13:25:01.655Z` (Netlify `publishedAt`) / `2026-10-15T13:27:28.677688Z` (QA HTTP em produção). Data de atualização substantiva: `null`; não inferida do build. |
| deploy / Edge | Netlify `6ad0ca2a4a4dafb0c6955f29` `ready`, anterior `6acff8bd6dccb98caf26f5cd`; Edge ativo, bundle SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`. |
| corpo final / revisão | Markdown Verso SHA-256 `bfee8c6b195d2ee2b3946327aa0e010348921bde6edc64c29169ab00e5d151e2`, 7.826 bytes; PASS factual/editorial dos bytes salvos em `2026-10-15T12:34:07Z`. O hash anterior `b63aa258…` pertence somente ao registro histórico pré-correção do alt. |
| aprovação e manifests do release | Adendo V3 [ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-RELEASE-V3.json](ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-RELEASE-V3.json), SHA-256 `ec2c57444bc88cf22fc251c98c1c48da3333686ea4b13005526e90df6c8df939`; source manifest `7490a61fc4e8a168bdf99631ba5c7ca53c55b6d9c78371b90a6deea5f7e28a90`; artifact manifest `568cfdb604f52e7e1a2800b5316d30504f9d324825717d26a3a076c2b84a92ab`; release approval manifest `6f237eadbdefdb9bfdaff99e267e720692a7e58719c8236d52a61116432a4a32`. |
| HTML / schema / autoria | HTML público SHA-256 `4d0da2ae68a0202501063472a8b98967ae286394adc1a7014e5397b3927c9fb8`, idêntico ao artefato; H1 único, `BlogPosting` sem `author`, `datePublished` ou `dateModified`; sem byline, autor atribuído, data fictícia ou alternate EN. A data real do deploy fica apenas neste histórico até decisão editorial sobre exibi-la. |
| SVG / falso 404 | Asset público `/_astro/torno.B0vlPKCG_Z7VeG1.svg` HTTP 200, `image/svg+xml`, SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582`, idêntico ao SVG aprovado. O 404 reportado antes usou URL trocada `Ve1G`; a URL real do HTML é `VeG1`. Variantes PNG não integram o runtime. |
| sitemap / preservação | Sitemap HTTP 200, 20 URLs únicas: 19 anteriores preservadas e este artigo PT incluído uma vez. O artigo anterior sobre planilhas e os seis cases PT/EN responderam HTTP 200 com bytes iguais aos artefatos. Nenhum artigo EN de critérios foi criado. |
| QA / evidência de produção | QA HTTP independente `22/22 PASS`: [production-criteria-v3-20261015.json](../../../projeto-50k-site/docs/qa/blog-20261014/production-criteria-v3-20261015.json) SHA-256 `d77d75e857de7c9a589863f9d0a980f9089d89e6f36db7642f061fe32b9e00b8`; [production-criteria-v3-20261015.log](../../../projeto-50k-site/docs/qa/blog-20261014/production-criteria-v3-20261015.log) SHA-256 `7fced2bc6b7cbd4d65747a83bee117f10ebe8831e983767a17423e0cc4d130c1`; reconciliação do asset em [asset-delivery-investigation-20261015.json](../../../projeto-50k-site/docs/qa/blog-20261014/asset-delivery-investigation-20261015.json) SHA-256 `4e05794512209bab83c32f8b01544b598a87bfd20c65107e49e97fe52b7b7887`. [Recibo Netlify production.json](/private/tmp/torno-blog-release-criteria-mvp-v3-approved-20261015-r1/production.json) registra deploy, `publishedAt`, manifests e Edge. |
| intenção / demanda / indexação | Trilha mantém **GO qualitativo** para `software-vendor-choice-pt`. Volume e demanda quantitativa: **SEM DADO**. Indexação, impressões e posição no Google Search Console: **SEM DADO**; HTTP 200, sitemap e ausência de `noindex` não provam indexação. |

**Deduplicação:** chave `content_id + locale` permanece única para este artigo; este evento não cria intenção, slug nem tradução nova. Uma futura atualização preserva `first_published_at` e exige revisão/evidência próprias para alterar `substantive_updated_at`.

**Gate final pós-produção do SVG:** reteste independente entre `2026-10-15T13:30:39Z` e `2026-10-15T13:30:41Z` extraiu do HTML público e do draft o `src` real `/_astro/torno.B0vlPKCG_Z7VeG1.svg`. Ambos retornaram HTTP 200, `image/svg+xml`, 2.622 bytes e SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582`; o 404 anterior pertencia à grafia trocada `Ve1G`. O gate HTTP `22/22 PASS` permanece, sem novo deploy. Evidências adicionais append-only: [SVG-RECONCILIACAO-20261015.md](../../../projeto-50k-site/docs/qa/blog-20261014/SVG-RECONCILIACAO-20261015.md) SHA-256 `65cbbd92290f1c41516f35a2551c7ebfd1501c1dcda14046f93989a3103a8c7b` e [asset-delivery-retest-20261015.json](../../../projeto-50k-site/docs/qa/blog-20261014/asset-delivery-retest-20261015.json) SHA-256 `88e2f918f590f6bb91bb5f68702e539f8367a48e139fe4413bf93edf4e44a845`.

### Decisão preliminar de intenção: briefing para orçamento de integração ERP

**Parecer read-only de Trilha em `2026-10-15T16:23:02Z`; registro por Farol em `2026-10-15T16:23:57Z` UTC.** Trata somente de intenção, colisão e URL proposta. A decisão final editorial e qualquer aprovação de inclusão aguardam revisão do Markdown por Verso, resolução do HOLD visual de Íris e hashes finais. Nenhum arquivo do site, candidato ou release decorre deste evento.

| Campo | Valor |
|---|---|
| `event_id` | `intent-provisional-go:integracao-erp-briefing-orcamento:2026-10-15T16:23:02Z` |
| `briefing` | [`integracao-erp-briefing.md`](</Users/henriquepett/Documents/Codex/2026-10-14/task/editorial-20261015-meiodia/integracao-erp-briefing.md>), SHA-256 `c831ffddd1c5b56afdca0e8be5fd9bfc9b1156abc04eefd2c2ae60a3b1b5040a`; texto do pacote, ainda sem PASS final Verso. |
| `intent_id` / estado | `null` — **não criado**; `draft`. Trilha classificou a pergunta como `new_distinct_intent` em GO **qualitativo preliminar**, não como autorização de release. |
| pergunta e cluster | O que reunir sobre ERP, API, campos, direção de dados, volumes, acessos, responsáveis e pendências **antes de pedir orçamento** de uma integração já considerada necessária; cluster orientativo de automação/integrações. |
| `proposed_path` / canonical / reserva | `/blog/integracao-erp-briefing-orcamento/` é somente proposta do pacote; `canonical_url=null`, **slug não reservado**. `first_published_at=null`, evidência de publicação `null`. |
| fronteira interna | [`/blog/criterios-aceite-mvp/`](https://tornostudio.com/blog/criterios-aceite-mvp/) permanece dona de comportamento e evidência de aceite da entrega (risco moderado por exemplo ERP); [`/blog/quando-automatizar-processos-planilhas/`](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/) permanece dona da decisão anterior de automatizar/sair de planilha (colisão baixa se o novo texto não virar decisão build-vs-buy). Home/diagnóstico são destinos comerciais; não copiar oferta, FAQ ou preços. Recuperação, Lovable e RLS respondem outras perguntas. |
| SERP amostral / limite | Busca web em português por Trilha entre `2026-10-15T16:22:04Z` e `16:23:02Z`: [Agência Campinas](https://agenciacampinas.digital/blog/integracao-com-erp) aberta diretamente, datada 12/08/2026, já traz perguntas ao fornecedor antes de orçar; [Quantum9](https://www.quantum9.com.br/blog/integracao-erp-crm-escopo-orcamento) apareceu com título concorrente de escopo/orçamento CRM–ERP, mas abertura direta falhou; [NSWEB](https://nsweb.com.br/blog/escopo-de-sistema-antes-do-orcamento) e [OCA](https://oca.dev.br/blog/briefing-de-software-como-escrever-sem-retrabalho-e-surpresa-no-preco) foram vistos só em snippets por cache miss. Amostra sem garantia de Google localizado no Brasil, ranking, cobertura ou SERP completa; concorrência externa relevante, nenhuma brecha ou vantagem de ranking alegada. |
| demanda / GSC | Volume e demanda quantitativa **SEM DADO**. Indexação, consultas, impressões e posição no Google Search Console **SEM DADO**; não inferidos da amostra. |
| gate editorial/visual | Verso revisa Markdown e fontes; Íris conferiu integridade, legibilidade e semântica dos SVGs `integracao-erp-fluxo.svg` SHA-256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c` e `integracao-erp-pendencias.svg` SHA-256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`, mas emitiu **HOLD visual**: Arial, paleta própria e raios 16/24px divergem de IBM Plex Sans e tokens de [`design-20261014.md`](../../../projeto-50k-site/docs/blog/design-20261014.md). Assets dependem de decisão de design, eventual revisão e novos hashes. |
| aprovação / publicação | `release_approved_by=null`, `release_approved_at=null`, `release_approval_evidence=null`; nenhum recibo, build, preview ou deploy. Estado permanece `draft`. |

**Próximo gate:** após parecer final de Verso e resolução/revisão por Íris, Farol e Trilha decidem GO/HOLD editorial por escrito. Só um GO final para os bytes exatos de Markdown e dos dois assets permite emitir recibo próprio deste artigo; aprovações dos artigos de planilhas e critérios não se transferem.

**Adjudicação visual posterior, registrada por Farol em `2026-10-15T16:25:32Z` UTC:** Timbre autorizou **somente uso editorial** dos SVGs originais `integracao-erp-fluxo.svg` SHA-256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c` e `integracao-erp-pendencias.svg` SHA-256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`, sem edição. A objeção anterior de Íris quanto à fonte, paleta e raios não foi confirmada como bloqueio para ilustração editorial. Condições de integração futura: `figure` centralizada com `max-inline-size: 480px`; imagem `width: 100%` e `height: auto`, sem padding que reduza a largura útil abaixo de 328px; alt e legenda hipotéticos adjacentes. Uso como UI ou largura útil inferior a 328px exige reavaliação. Horário da adjudicação por Timbre: **SEM DADO**; a hora acima é a do registro recebido. O Markdown permanece `draft` e em HOLD publicável pelo H1 corporal duplicado; Verso deve revisar os bytes finais sem H1. `intent_id`, canonical e aprovação de release continuam `null`; path segue apenas proposto.

### Decisão final de intenção e metadados: integração ERP pré-orçamento

**Trilha decidiu GO editorial de intenção/URL/metadados em `2026-10-15T16:28:10Z`; Farol registrou em `2026-10-15T16:29:50Z` UTC.** Esta decisão supera o caráter preliminar do evento acima quanto à intenção. Não aprova por si só a inclusão no artefato e não comprova publicação.

| Campo | Valor |
|---|---|
| `event_id` | `intent-go:erp-integration-prequote-brief-pt:2026-10-15T16:28:10Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-integracao-erp-briefing` / `erp-integration-prequote-brief-pt` / `pt-BR`; intenção nova por pergunta, público e etapa distintos, sem renomear a intenção dos artigos existentes. |
| decisão / estado | `new_distinct_intent` — **GO qualitativo final de intenção**; conteúdo permanece `draft` até recibo específico de inclusão. |
| pergunta e fronteira | Quais dados, capacidades do ERP, fluxos, acessos, responsáveis e pendências reunir antes de pedir orçamento de integração já considerada necessária. O artigo de [critérios de aceite](https://tornostudio.com/blog/criterios-aceite-mvp/) permanece dono de comportamento/evidência para aceitar a entrega; o de [planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/) permanece dono da decisão anterior de se/quando automatizar. Home/diagnóstico são destinos comerciais. |
| `proposed_path` / canonical planejado | `/blog/integracao-erp-briefing-orcamento/` / `https://tornostudio.com/blog/integracao-erp-briefing-orcamento/`; **slug não reservado nem implementado** nesta decisão. |
| `seo_title` | `Integração com ERP: briefing para orçamento | Torno` |
| `seo_description` | `Veja quais dados, documentos, acessos e responsáveis reunir antes de pedir orçamento de integração com ERP. Um roteiro para explicitar dependências.` |
| H1 previsto | `Integração com ERP: o que reunir antes de pedir orçamento` — somente no wrapper; Markdown final sem H1 corporal. |
| corpo final / Verso | [`integracao-erp-briefing-final.md`](/private/tmp/torno-blog-article-review/integracao-erp-briefing-final.md), SHA-256 `133f80ab8567ba74e30f4a178000ec0414b8a2771b182e052ef85d991deaf235`, 7.437 bytes/71 linhas; Verso PASS factual/editorial em `2026-10-15T16:26:47Z`. Diff local: só H1 inicial e linha vazia removidos do briefing original SHA-256 `c831ffddd1c5b56afdca0e8be5fd9bfc9b1156abc04eefd2c2ae60a3b1b5040a`. |
| figuras aprovadas editorialmente | `integracao-erp-fluxo.svg` SHA-256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c` e `integracao-erp-pendencias.svg` SHA-256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`; PASS de Timbre somente como ilustrações sob condições de tamanho, padding, alt e legenda registradas acima. |
| fontes / revisão | [ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md](ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md), SHA-256 `2692db14b2ce2bb29a541568cd048b08ed728c33f943b018fbdfa85ca1314134`. Registra URL, entidade, HTTP, `checked_at`, SHA reportado, claim e limite por fonte, além de consultas complementares sem horário/hash próprios. Não há snapshot HTTP salvo por Verso. |
| SERP / demanda | Amostra PT de Trilha entre `2026-10-15T16:22:04Z` e `16:23:02Z` já aponta concorrência externa relevante (Agência Campinas aberta, Quantum9/NSWEB/OCA em resultados/snippets); não garante localização Google BR, ranking nem cobertura completa. Volume/demanda quantitativa e GSC: **SEM DADO**. |
| autoria / idioma / publicação | Sem autor ou byline atribuídos, sem data inventada, sem tradução EN. `release_approved_by/at/evidence=null`; `first_published_at=null`; `evidence_of_publication=null`; indexação **SEM DADO**. |

**Próximo evento necessário:** Farol, como delegado operacional, só poderá aprovar inclusão vinculando este GO, o PASS Verso, o parecer visual de Timbre, os metadados exatos e os hashes dos três arquivos em recibo próprio deste artigo. O build/preview/deploy e a observação de produção são gates posteriores; aprovações de planilhas e critérios não se transferem.

### Evento posterior: inclusão aprovada para artefato ERP, ainda sem publicação

**Farol aprovou a inclusão dos bytes exatos em `2026-10-15T16:30:30Z`; evento anexado ao histórico em `2026-10-15T16:31:11Z` UTC.** Esta decisão operacional se apoia no GO final de intenção/metadados de Trilha, PASS factual/editorial de Verso e adjudicação visual de Timbre. Não reserva slug em código nem afirma build, preview, deploy ou indexação.

| Campo | Valor |
|---|---|
| `event_id` | `release-approved:torno-artigo-pt-20261015-integracao-erp-briefing:2026-10-15T16:30:30Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-integracao-erp-briefing` / `erp-integration-prequote-brief-pt` / `pt-BR`; sem substituir os artigos existentes. |
| estado | `draft` → `approved` para inclusão no artefato autorizado; `published` dependerá de observação HTTP/canonical/QA após deploy. |
| URL / metadata | `/blog/integracao-erp-briefing-orcamento/` e canonical HTTPS planejado, sem reserva/implementação nesta etapa; title, description e H1 são os valores exatos da decisão de Trilha imediatamente acima. |
| Markdown / SVGs | Markdown SHA-256 `133f80ab8567ba74e30f4a178000ec0414b8a2771b182e052ef85d991deaf235`; SVG fluxo `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c`; SVG pendências `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`. PNGs de conferência fora do runtime. |
| `release_approved_by` / `release_approved_at` / evidência | Farol (delegado operacional) / `2026-10-15T16:30:30Z` / [ARTIGO-INTEGRACAO-ERP-20261015-APROVACAO-RELEASE.json](ARTIGO-INTEGRACAO-ERP-20261015-APROVACAO-RELEASE.json), SHA-256 `3ee53dbabb278cd403ff0c13098bc2a51d1a218f9661e4cc294ca932256e086d`. Recibo separa autorização de Henrique, revisão de Verso, GO de Trilha e aprovação delegada; não atribui hash/revisão pessoal a Henrique. |
| fonte e limite | [ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md](ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md), SHA-256 `2692db14b2ce2bb29a541568cd048b08ed728c33f943b018fbdfa85ca1314134`; reporta hashes/horários do lote GET de Verso, consultas anteriores e complementares sem registros técnicos equivalentes, sem snapshot HTTP salvo. |
| publicação / medição | `first_published_at=null`, `evidence_of_publication=null`; sem autoria/byline, datas fictícias ou EN; volume/demanda quantitativa e GSC **SEM DADO**. |

**Gate seguinte:** a passagem operacional a Batuta/Compasso permanece pendente; esta rodada não aciona código, build, preview ou deploy. Quando autorizada, a integração deverá usar somente o conteúdo aprovado, aplicar as condições de Timbre e revalidar produção, hashes e QA. Farol só registrará `published` após deploy e observação pública; nenhum evento agendado ou recibo substitui essa verificação.

### Evento de publicação observada: briefing para orçamento de integração ERP

**Deploy Netlify publicado em `2026-10-15T17:02:29.286Z`; QA HTTP independente em `2026-10-15T17:03:26.968731Z` UTC.** A ordem operacional posterior de Henrique permitiu candidate isolado e promoção após os gates; este evento registra apenas a produção já observada. Preserva o GO de intenção, o recibo de inclusão e as decisões anteriores como eventos históricos.

| Campo | Valor |
|---|---|
| `event_id` | `published:torno-artigo-pt-20261015-integracao-erp-briefing:2026-10-15T17:02:29.286Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-integracao-erp-briefing` / `erp-integration-prequote-brief-pt` / `pt-BR`; mesmos IDs da decisão final e do recibo ERP. |
| `state_before` → `state_after` | `approved` → `published`, somente após URL pública, HTML, assets e sitemap verificados. |
| URL / canonical / indexabilidade técnica | [`https://tornostudio.com/blog/integracao-erp-briefing-orcamento/`](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/) — HTTP 200, canonical próprio, sem header/meta `noindex`; HTML de produção SHA-256 `0ae43432e54655c0dd5a05972600aaa9dca9c18062eb2dc64c8893db82c1a162` idêntico ao artefato r5. Isto não prova indexação no Google. |
| `first_published_at` / `verified_at` / atualização | `2026-10-15T17:02:29.286Z` (Netlify `publishedAt`) / `2026-10-15T17:03:26.968731Z` (QA HTTP em produção) / `substantive_updated_at=null`, sem data de atualização inventada. |
| deploy / Edge | Deploy exato `6ad1050ef939dfae3e05a7f7`, anterior `6ad0ca2a4a4dafb0c6955f29`, `ready`; Edge `true`, bundle SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`. |
| corpo / aprovação / manifests | Markdown final Verso SHA-256 `133f80ab8567ba74e30f4a178000ec0414b8a2771b182e052ef85d991deaf235`, PASS em `2026-10-15T16:26:47Z`; recibo próprio [ARTIGO-INTEGRACAO-ERP-20261015-APROVACAO-RELEASE.json](ARTIGO-INTEGRACAO-ERP-20261015-APROVACAO-RELEASE.json) SHA-256 `3ee53dbabb278cd403ff0c13098bc2a51d1a218f9661e4cc294ca932256e086d`; source manifest `fad21f4e25183eea28301bb221ebd6ef20755e6e43f6fd4b513231c6d4dd0922`; artifact manifest `d0d5e75004bef6713ffd5199f935cc09fec073a125867c87e770d6b44db71fca`; release approval manifest `632d64f2503b430ae27e9d7581234c9533e03a21020b9d70af0e3b81f6a91535`. |
| metadados / autoria / idioma | Title e description exatos da decisão Trilha, H1 único, `BlogPosting` sem `author`, `datePublished` ou `dateModified`; sem byline, `<time>` ou alternate EN fictício. A data real do deploy está neste registro, sem forçar data no HTML. |
| figuras | Fluxo público `/_astro/integracao-erp-fluxo.CJXjnJ5K_Z1O1Dlw.svg` HTTP 200 `image/svg+xml`, 2.062 bytes, SHA-256 `cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c`; pendências `/_astro/integracao-erp-pendencias.CUPyqtvX_Z1O1Dlw.svg` HTTP 200 `image/svg+xml`, 2.079 bytes, SHA-256 `47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785`. Alts e legendas hipotéticas presentes. Gate visual mobile do mesmo artefato r5 passou em draft, com largura útil de 328px em viewport de 360px; não foi repetido após deploy sem alteração de artefato. |
| sitemap / preservação | Sitemap de produção com 21 URLs únicas, mantém exatamente as 20 anteriores e acrescenta só este artigo PT. Oito HTML protegidos — artigos de planilhas e critérios, mais seis cases PT/EN — conservaram bytes idênticos. QA verificou 12 HTML com HTTP 200, canonical próprio, sem `noindex` e bytes idênticos ao `dist` congelado. |
| QA e evidências | Afinador QA pós-produção **9/9 PASS**: [ERP-PRODUCTION-R5-QA.md](../../../projeto-50k-site/docs/qa/blog-20261014/ERP-PRODUCTION-R5-QA.md) SHA-256 `a0d1e20700f60f87882bbef2590811d3cdd4e035e4e0f6e7b8faa35a10619cc1`; [erp-production-r5-20261015.log](../../../projeto-50k-site/docs/qa/blog-20261014/erp-production-r5-20261015.log) SHA-256 `0f4db88010faf489dddb91410b1164491aeb06f5786542f71844fb8cbdf8fccb`; [erp-production-r5-20261015.json](../../../projeto-50k-site/docs/qa/blog-20261014/erp-production-r5-20261015.json) SHA-256 `dbef8957a768e31a815c1eb0f1b453a48b9ca50cdf99b21b441513043d300af8`; [Netlify production.json](/private/tmp/torno-blog-release-erp-20261015-r5-final/production.json) SHA-256 `7f55375beb6329173e0dc40e3f11f731105e75f8726e7e81d271979f92c9089f`. |
| intenção / fontes / medição | GO qualitativo `new_distinct_intent` de Trilha para `erp-integration-prequote-brief-pt` preservado; fontes e limites em [ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md](ARTIGO-INTEGRACAO-ERP-20261015-REVISAO-FONTES.md) SHA-256 `2692db14b2ce2bb29a541568cd048b08ed728c33f943b018fbdfa85ca1314134`. Volume/demanda quantitativa e GSC/indexação/impressões/posição: **SEM DADO**. |

**Deduplicação:** este evento promove somente `content_id + locale` do ERP. Não republica os dois artigos anteriores, não cria versão EN e não altera `first_published_at` dos conteúdos já publicados. Uma atualização futura exige nova revisão de corpo, decisão e evidência próprias.

### Decisão de intenção: evidências antes de refazer sistema existente (rascunho)

**Trilha decidiu `new_distinct_intent` em `2026-10-15T22:23:16Z`; Farol registrou em `2026-10-15T22:23:38Z` UTC.** É GO qualitativo apenas para intenção, URL e metadados propostos do pacote da tarde. Verso e o gate visual ainda avaliam os arquivos finais; este evento não reserva slug, aprova release ou comprova publicação.

| Campo | Valor |
|---|---|
| `event_id` | `intent-go:existing-system-rebuild-evidence-pt:2026-10-15T22:23:16Z` |
| `content_id` / `intent_id` / locale / estado | `content_id=null` nesta decisão; `existing-system-rebuild-evidence-pt` proposto como ID estável de intenção distinta; `pt-BR`; `draft`. |
| pergunta / público / etapa | Quais evidências verificáveis pedir antes de aceitar proposta de corrigir ou refazer software que já opera parcialmente? Dono ou gestor responsável pelo investimento, diante de recomendações divergentes, na consideração pré-contratação de diagnóstico, correção ou reconstrução. A entrega é checklist de acessos, reprodutibilidade, fluxo, dependências, restauração, bloqueios e alternativas com incerteza; não é diagnóstico individual nem outra oferta comercial. |
| `proposed_path` / canonical planejado | `/blog/antes-de-refazer-sistema-evidencias/` / `https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/`; **slug não reservado**, canonical ainda não observado. |
| title SEO / meta description | `Refazer um sistema? 7 evidências para decidir | Torno` / `Antes de refazer um sistema, confira acessos, fluxo crítico, dependências e recuperação. Um checklist para comparar propostas com evidências.` — propostas aprovadas por Trilha para o pacote identificado abaixo, sujeitas ao corpo final revisado. |
| H1 previsto | `Antes de refazer um sistema: 7 evidências para decidir`; o template de artigo deve emitir um único H1. |
| fronteira principal | [`/recuperacao-de-projeto/`](https://tornostudio.com/recuperacao-de-projeto/) e [`/en/software-project-rescue/`](https://tornostudio.com/en/software-project-rescue/) continuam donos da contratação, qualificação, escopo e preço de retomada. Há sobreposição **moderada** porque a landing já enumera fluxo, acessos, reparar/replanejar e teste. O artigo deve exigir evidências de qualquer proposta e apontar à landing, sem copiar oferta, FAQ ou criar segunda página de serviço. Home e `/diagnostico/` seguem donos da conversão. |
| outras fronteiras | [`/lovable-em-producao/`](https://tornostudio.com/lovable-em-producao/) e EN tratam protótipo Lovable para produção; [`/guias/rls-multiempresa/`](https://tornostudio.com/guias/rls-multiempresa/) e EN tratam implementação RLS. [Planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/) decide se/quando automatizar processo manual; [critérios de aceite](https://tornostudio.com/blog/criterios-aceite-mvp/) trata contratar/aceitar MVP novo; [ERP](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/) trata dependências antes de orçar integração já escolhida. Os donos dessas URLs permanecem. |
| SERP amostral / limites | Busca em português de Trilha entre `2026-10-15T22:22:19Z` e `22:23:08Z`: [Doomity](https://doomity.com/pt/recursos/reescrever-vs-refatorar) aberta integralmente, já cobre inventário e decisão refatorar/reescrever por módulo; [Pervian](https://pervian.tech/blog/reescrever-ou-refatorar-sistema-legado) apareceu em resultado, mas abertura falhou por cache; [OCA](https://oca.dev.br/blog/projeto-de-software-abandonado-como-resgatar-sistema) veio do pacote e também falhou por cache. Há concorrência externa substantiva e resultados de resgate de sistemas abandonados. A ferramenta não garante Google Brasil localizado, ordem ou cobertura completa; não alegar brecha exclusiva ou vantagem de ranking. URLs Torno não abriram na ferramenta: a comparação interna usou este histórico, texto local `commercial.ts` e o pacote, sem novo QA HTTP. |
| pacote conferido | [`artigo.md`](</Users/henriquepett/Documents/Codex/2026-10-15/task/editorial-20261015-tarde/torno/artigo.md>) SHA-256 `10d9a67d761e5442d1c2558859f5014c8270879de6b2494d29d08192f664ea5a`; [`metadados.json`](</Users/henriquepett/Documents/Codex/2026-10-15/task/editorial-20261015-tarde/torno/metadados.json>) SHA-256 `e3b713b25ff8ad2fcd9535ae7972cd5c4194f491d712741820c641769165c4b3`; [`pesquisa-e-publicacao.md`](</Users/henriquepett/Documents/Codex/2026-10-15/task/editorial-20261015-tarde/torno/pesquisa-e-publicacao.md>) SHA-256 `2915bf9073c1bbcc54aa970673011880fd555bbcbe814246d0d7b4c2d78e8fb7`; `SHA256SUMS.txt` validado. A data `2026-10-15` nos metadados é do pacote, **não** `datePublished`. |
| demanda / GSC | Volume e demanda quantitativa **SEM DADO**. GSC, indexação, consultas, impressões e posição **SEM DADO**; não inferir da amostra. |
| gates restantes | Verso deve revisar fontes, claims, links, CTA, autoria/data e bytes finais sem H1 corporal duplicado; Íris marcou HOLD visual dos créditos SVG abaixo de 13px no tamanho útil, pendente de adjudicação de Timbre ou novos assets/hashes. `release_approved_by/at/evidence=null`, `first_published_at=null`, `evidence_of_publication=null`; nenhuma versão EN real foi entregue. |

**Próximo evento:** só após PASS factual/editorial de Verso sobre Markdown final, PASS visual dos assets finais e preservação desta fronteira de intenção pode haver recibo **próprio** de inclusão vinculado aos hashes de corpo, assets, metadados, GO e delegação. Não reutilizar recibos de planilhas, critérios ou ERP. Build, preview, deploy e `published` dependem de gates posteriores.

### Aprovação de inclusão: evidências antes de refazer sistema existente

**Farol aprovou a inclusão dos bytes exatos no artefato em `2026-10-15T22:28:58Z` UTC**, após GO final de Trilha em `2026-10-15T22:28:11Z`, PASS de Verso e reconciliação visual por Timbre/Íris. Este evento sucede a decisão de intenção em `draft`; não reescreve a decisão anterior. Ainda não há preview, deploy, publicação ou indexação observados.

| Campo | Valor |
|---|---|
| `event_id` | `release-approved:torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias:2026-10-15T22:28:58Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias` / `existing-system-rebuild-evidence-pt` / `pt-BR`; mesma intenção `new_distinct_intent` do evento anterior. |
| estado | `draft` → `approved` somente para inclusão no artefato após revisão; `published` depende de deploy e QA HTTP/canonical observados. |
| path / canonical planejado | `/blog/antes-de-refazer-sistema-evidencias/` / `https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/`; URL pública ainda não observada. |
| SEO title / description / H1 | `Refazer um sistema? 7 evidências para decidir \| Torno` / `Antes de refazer um sistema, confira acessos, fluxo crítico, dependências e recuperação. Um checklist para comparar propostas com evidências.` / `Antes de refazer um sistema: 7 evidências para decidir` (H1 único pelo wrapper). |
| corpo / fontes | [Markdown final](/private/tmp/torno-blog-article-review/antes-de-refazer-sistema-evidencias.md) SHA-256 `3b64339e8b72d2d8b3359b3275c568e5d6924261bd09de3cec630e705a93d79d`, 9.220 bytes/98 linhas; Verso PASS em `2026-10-15T22:25:20Z`. [JSON de fontes](/private/tmp/torno-blog-article-review/refazer-sistema-fonte-check-20261015.json) SHA-256 `57aa070426cc1c010dedf721e9b64e748dc32bc2e5051fd97181cca94b01bc71`; sete GET HTTP 200 com `checked_at` UTC, hashes e marcadores, sem snapshots integrais. Grátis/45 min é sustentado pela home; Calendly não comprova gratuidade ou disponibilidade. |
| artes runtime | [SVG evidências](/private/tmp/torno-blog-assets-tarde-20261015-r1/evidencias-decisao.svg) SHA-256 `07c35b5fa17ec1c9e19705050c19553469529a08b6039efe5d4d9e24d357c67b`; [SVG exemplo](/private/tmp/torno-blog-assets-tarde-20261015-r1/exemplo-aprovacao.svg) SHA-256 `6b2e9d913c417974600f2550a3bedb623aa827d5e3668424844a02e6a228607b`. [Manifesto](/private/tmp/torno-blog-assets-tarde-20261015-r1/asset-manifest.json) SHA-256 `4bd3335396355b191e3bc1bd9d43d926baf2374812db901c91b7e6e070cc05fb`; [diff](/private/tmp/torno-blog-assets-tarde-20261015-r1/asset-diff.patch) SHA-256 `f56ee7325c050866941ea0b1b93477ad88e81284f0442645f751c8e7113810df`. Apenas crédito 12→15; quatro PNGs 360/1080 são QA e ficam fora do runtime. |
| decisão visual | Íris PASS técnico read-only; Timbre, design owner, PASS GLOBAL `2026-10-15 19:27 BRT` para SVGs como figuras editoriais autocontidas. A divergência de identidade foi resolvida sem exceção formal ou outra mudança de estilo. Integração ainda deve verificar figura, alt/legenda e largura útil ≥328px no preview. |
| aprovação / proveniência | `release_approved_by=Farol (delegado operacional)`, `release_approved_at=2026-10-15T22:28:58Z`; [recibo próprio](ARTIGO-ANTES-DE-REFAZER-SISTEMA-20261015-APROVACAO-RELEASE.json) SHA-256 `64df680bc7dadb73fe15842c0820cb9fca0ca12a25c89a8ff423275d018eaaa5`. O recibo separa autorização permanente de Henrique em 14/10, pedido específico atual sem horário UTC exato atribuído, GO de Trilha, revisões de Verso/Íris/Timbre e aprovação delegada de Farol. Henrique não recebeu autoria, revisão pessoal ou aprovação pessoal de hash. |
| autoria / datas / idioma | Sem autor, byline, propriedade `author` no schema, data de publicação ou atualização inventada, nem tradução EN. `first_published_at=null`, `evidence_of_publication=null`; `published=false`. |
| intenção / medição | Mantido risco moderado de canibalização com `/recuperacao-de-projeto/`: landing conserva contratação, fit, escopo e preço; artigo exige evidências antes de decidir. SERP externa concorrente, sem vantagem alegada. Volume/demanda quantitativa e GSC/indexação/impressões/posição **SEM DADO**. |

**Gate seguinte:** Batuta/Compasso podem integrar somente os hashes aprovados em candidate isolado, com preservação do baseline e QA independente. Farol registrará `published` em evento novo apenas depois de produção pública observada.

### Publicação observada: evidências antes de refazer sistema existente

**Netlify publicou o deploy `6ad15581ccdee6d89b2ad52f` em `2026-10-15T22:42:52.096Z`; Afinador concluiu QA HTTP independente em `2026-10-15T22:43:30.845737Z`.** Este evento acrescenta a observação de produção ao GO de intenção e ao recibo de inclusão anteriores, sem reescrevê-los.

| Campo | Valor |
|---|---|
| `event_id` | `published:torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias:2026-10-15T22:42:52.096Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias` / `existing-system-rebuild-evidence-pt` / `pt-BR`; mesmos IDs do recibo, sem nova intenção, slug ou tradução. |
| estado | `approved` → `published`, somente após deploy, URL pública e QA independente observados. |
| URL / HTML | [`https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/`](https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/) HTTP 200, canonical próprio, sem header/meta `noindex`; HTML 32.520 bytes, SHA-256 `75fd3139a24df89bf27299ca417066697839e068f78c0c6868aa445ae3ff48de`, igual ao artefato r3. HTTP/canonical/sitemap provam indexabilidade técnica, não indexação no Google. |
| `first_published_at` / `verified_at` / atualização | `2026-10-15T22:42:52.096Z` (`production.json` Netlify) / `2026-10-15T22:43:30.845737Z` (QA HTTP de Afinador) / `substantive_updated_at=null`; sem data de atualização inventada. |
| deploy / baseline / Edge | Deploy `6ad15581ccdee6d89b2ad52f`, anterior ERP `6ad1050ef939dfae3e05a7f7`; Edge `true`, bundle SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79`. Compasso verificou API/Edge com helper autenticado; tentativa direta de Afinador à API sem credencial retornou 401, portanto sua validação independente cobre HTTP, conteúdo, SVGs e sitemap, não autenticação da API. |
| corpo / release | Markdown final Verso SHA-256 `3b64339e8b72d2d8b3359b3275c568e5d6924261bd09de3cec630e705a93d79d`; [recibo próprio](ARTIGO-ANTES-DE-REFAZER-SISTEMA-20261015-APROVACAO-RELEASE.json) SHA-256 `64df680bc7dadb73fe15842c0820cb9fca0ca12a25c89a8ff423275d018eaaa5`. Source manifest `c0ae1de647d7a5af50c50e8f990ee53168a536b8c02ef0a887dd4ff67752e435`, artifact manifest `8e47c35ad2e4a1a187389d02e5b1e0c637555cb10ea6895e6a0d6aad9cadc3e0`, approval manifest `35697ef9263475ea12450260384578c4f4aa1d56e5efac2e7c89d0d8bacf36af`, QA gate `575994b65370b24124e0a0a680e3739aebf76dd328d539af94e81329ccb6b85f`. |
| metadados / autoria | Title, description e H1 único conferem com a decisão Trilha; `BlogPosting` sem `author`, `datePublished` ou `dateModified`, sem byline, `<time>` ou alternate EN fictício. A data real do deploy fica neste registro, sem forçar data no HTML. |
| figuras | `/_astro/evidencias-decisao.Cw0T1GlU_15GaVk.svg` HTTP 200 `image/svg+xml`, 2.487 bytes, SHA-256 `07c35b5fa17ec1c9e19705050c19553469529a08b6039efe5d4d9e24d357c67b`; `/_astro/exemplo-aprovacao.BLXjBXeo_BT9L.svg` HTTP 200 `image/svg+xml`, 2.450 bytes, SHA-256 `6b2e9d913c417974600f2550a3bedb623aa827d5e3668424844a02e6a228607b`. Alt e legenda presentes; revisão mobile PASS no preview do mesmo artefato, não repetida após deploy. |
| sitemap / preservação | 22 URLs únicas, preserva as 21 anteriores e acrescenta apenas este artigo PT. QA registrou 13 HTML HTTP 200/canonical próprio/sem `noindex`/bytes do `dist`; nove HTML protegidos, inclusive os três artigos anteriores e seis cases PT/EN, iguais ao manifesto. |
| QA / evidências | Afinador QA pós-produção **9/9 PASS**: [relatório](../../../projeto-50k-site/docs/qa/blog-20261014/TARDE-PRODUCTION-R3-QA.md) SHA-256 `6909588230cc73187c728b4c990225a870a4ecdb12b571b6798e0f12b93a1c08`; [log](../../../projeto-50k-site/docs/qa/blog-20261014/tarde-production-r3-20261015.log) SHA-256 `96906a80307cb52097e2154b642b6f4c88a510f2b00a932dec51dd7fa82d597f`; [JSON](../../../projeto-50k-site/docs/qa/blog-20261014/tarde-production-r3-20261015.json) SHA-256 `f3cc3a6408695d339fed581a733dcccd56ca715a16920e35e57769850d8e7225`; [Netlify production.json](/private/tmp/torno-blog-release-tarde-20261015-r3/production.json) SHA-256 `0515bc390e3c1987b50b65757d19d68c9f326ae1b5677a7545ce22b6fbdd835e`. |
| intenção / medição | GO qualitativo `new_distinct_intent` de Trilha preservado, com risco moderado de sobreposição com `/recuperacao-de-projeto/`; landing conserva contratação, fit, escopo e preço. Volume/demanda quantitativa e GSC/indexação/consultas/impressões/posição **SEM DADO**. |

**Deduplicação:** este evento promove apenas `content_id + locale` do artigo da tarde. Não republica os artigos de planilhas, critérios ou ERP, não altera seus `first_published_at` e não cria versão EN.

### HOLD editorial: rascunho de custo de MVP web de 16/10

**Trilha decidiu `HOLD` em `2026-10-16T11:22:58Z`; Farol registrou em `2026-10-16T11:23:24Z` UTC.** A decisão vale para os bytes do pacote abaixo, não retira do histórico a intenção `app-web-mvp-cost-pt`, que já era `draft` sem URL reservada. Nenhum novo `intent_id`, recibo, release ou publicação resulta deste evento.

| Campo | Valor |
|---|---|
| `event_id` | `hold:app-web-mvp-cost-pt:2026-10-16T11:22:58Z` |
| intenção / estado | `app-web-mvp-cost-pt` permanece pauta histórica `draft`; esta execução editorial passa de `review` no frontmatter do pacote a `hold_cannibalization`. `content_id=null` nesta decisão, sem criar identificador para contornar colisão. |
| pacote exato | [Markdown](</Users/henriquepett/Documents/Codex/2026-10-16/task-2/torno/custo-mvp-web-escopo-orcamento.md>) SHA-256 `c8765585249b107cc3529bd675e13d75c6a1ea9ba7d87a431e6c5a870b9e32cb`; [pesquisa e handoff](</Users/henriquepett/Documents/Codex/2026-10-16/task-2/PESQUISA-E-HANDOFF.md>) SHA-256 `73ef61b242273578ce2eb2f3a22bec3f17b289f154025c3140555f364928f543`, conferidos localmente. Texto ainda não é Markdown final aprovado. |
| path / metadata | `/blog/custo-mvp-web-escopo-orcamento/` é apenas proposta do pacote, **não reservada**; canonical aprovado `null`. Working title `Quanto custa um MVP web? Como comparar propostas pelo escopo` não foi aprovado como SEO title. A sugestão analítica de Trilha — `Orçamento de MVP web: o que comparar no escopo \| Torno` e description `Compare propostas de MVP web pelo fluxo, integrações, aceite e responsabilidades de operação antes de contratar.` — também não autoriza URL ou release. |
| motivo do HOLD | O título, a pergunta e o path prometem resposta de custo, mas o corpo não apresenta valor, faixa própria ou método quantitativo para responder “quanto”; lista componentes, fluxo e perguntas. A home/ofertas já publica preços próprios de MVP Core/Plus e Product Sprint, escopo e etapas; `/diagnostico/` conduz a cotação. Sem resposta adicional verificável, há sobreposição comercial com essas páginas. |
| outras fronteiras | Sobreposição moderada/alta com [`/blog/criterios-aceite-mvp/`](https://tornostudio.com/blog/criterios-aceite-mvp/) em fluxo, aceite e contrato; moderada com [`/blog/integracao-erp-briefing-orcamento/`](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/) em acessos, API e escopo da integração. Planilhas, recuperação de sistema existente, Lovable, RLS e o artigo sobre evidências antes de refazer sistema respondem perguntas ou etapas distintas. A intenção custo de MVP web pode ser distinta em tese se um futuro texto responder ao preço e separar web/PWA de nativo; o pacote atual não o faz. |
| SERP amostral / limites | Trilha observou amostra em português entre `2026-10-16T11:22:29Z` e `11:22:49Z`: [Fábrica de MVP](https://www.fabricademvp.com.br/blog/quanto-custa-desenvolver-um-mvp), [Softdex](https://softdex.com.br/blog/quanto-custa-desenvolver-um-mvp-no-brasil-em-2026) e [OCA](https://oca.dev.br/blog/quanto-custa-um-mvp-2026-faixas-de-preco-e-o-que-cortar-do-escopo) respondem custo com faixas; [Clicksoft](https://clicksoft.com.br/blog/quanto-custa-fazer-mvp-componentes-orcamento) já cobre componentes, discovery, construção, operação e comparação. As faixas desses vendedores não são preço de mercado verificado nem recomendação à Torno. A ferramenta não garante Google Brasil localizado, ranking, cobertura ou estabilidade. |
| alternativa apenas para análise | “Custo de manutenção após lançamento” pergunta como orçar hospedagem, serviços, monitoramento, correções e evolução após go-live, etapa distinta da construção inicial. A home já apresenta Product Evolution; investigar essa sobreposição antes de qualquer GO. Sem `intent_id`, URL, slug, promessa de pauta ou autorização de publicação para a alternativa. |
| medição / autoria / release | Volume, dificuldade, tráfego e GSC/indexação/consultas/impressões/posição **SEM DADO**. Sem byline, autor ou data de publicação atribuídos. `release_approved_by/at/evidence=null`, `first_published_at=null`, `evidence_of_publication=null`; nenhuma arte criada ou aprovada. |

**Reavaliação:** somente se texto futuro responder de fato ao custo com preços próprios atuais corretamente atribuídos e/ou método verificável de orçamento, oferecer informação que home/critérios/ERP não cobrem, receber nova decisão escrita de intenção e URL, revisão factual/editorial final de Verso e gates de assets. Frequência de publicação não supera este HOLD.


### Aprovação de inclusão: custo de manutenção de software após o lançamento

**Farol registrou este evento em `2026-10-16T12:18:18Z` após aprovar a inclusão em `2026-10-16T12:17:54Z`.** A decisão se aplica somente ao artigo de custo recorrente **após o lançamento**, não ao rascunho de custo de construção do MVP acima, que permanece em `hold_cannibalization`. É aprovação para o artefato futuro, não prova de build, URL pública, deploy ou indexação.

| Campo | Valor |
|---|---|
| `event_id` / estado | `release-approved:torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento:2026-10-16T12:17:54Z`; `review` → `approved` para inclusão dos bytes exatos no artefato. `published=false`. |
| `content_id` / `intent_id` / idioma | `torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento` / `postlaunch-software-operating-cost-pt` / `pt-BR`; intenção pós-go-live distinta do HOLD `app-web-mvp-cost-pt`, sem reetiquetagem do rascunho recusado. |
| path / canonical | `/blog/custo-manutencao-software-apos-lancamento/` e `https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/` **planejados**, sem slug reservado, canonical ou HTTP observados. |
| metadados | SEO title `Custo de manutenção de software após o lançamento \| Torno`; description `Planeje o custo recorrente de um software web após o lançamento: serviços de operação, suporte, correções e evolução, com premissas e responsáveis.`; H1 de wrapper `Custo de manutenção de software: o que prever após o lançamento`. Summary e pergunta principal literais na [ficha editorial](ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-FICHA-EDITORIAL.md) SHA-256 `f3db6eb275824a45c3fec917772393cf84cec2be762a5523bd390e8acfaed5a4`. |
| corpo / fontes / revisão | [Markdown final](/private/tmp/torno-blog-article-review/custo-manutencao-software-apos-lancamento-final.md) SHA-256 `560cb0f8a33dbba8d7db6018507c9d2c122cf420da4d82a2382d88505f3757e8`, 8.142 bytes/60 linhas, byte-intacto; Verso PASS factual/editorial `2026-10-16T12:06:26Z`. [JSON de fontes](/private/tmp/torno-blog-article-review/custo-manutencao-fontes-20261016.json) SHA-256 `29be5a5da81982d85e95edc2f91d02d845bcd1bbb760ea4fd4de779ac5ac8216`, com HTTP 200, `checked_at` UTC, hashes e marcadores, sem snapshots integrais dos corpos HTTP. AWS aplica-se a AWS; Spend Cap Supabase é parcial; preços de provedores não foram inventados. Os cenários F/G/M/S de 30 dias são **[HIPÓTESE]**, sem case, ROI ou média universal. |
| arte / placement | [SVG runtime](/private/tmp/torno-blog-assets-manutencao-20261016-r1/orcamento-apos-lancamento.svg) SHA-256 `36d16c69c5c75d61cdfc167adfb634c2b16b90ea037d3f76eece7144993d9c5d`; [sidecar](/private/tmp/torno-blog-assets-manutencao-20261016-r1/sidecar.json) SHA-256 `4dd4c396929878576a452e08693e3d80377b9d2af3f42e02f581f196`; [manifesto](/private/tmp/torno-blog-assets-manutencao-20261016-r1/manifest.json) SHA-256 `21301bdfee6fc0b0fb88dffd968cfa6df337e23ce4f7c0668b4f11205a81e7cc`. Quatro PNGs 328/358/360/480 são QA-only, excluídos do runtime. Trilha aprovou o placement exato após o parágrafo final dos cenários e antes da seção de garantia em `2026-10-16T12:16:56Z`; integração deve preservar Markdown, alt, legenda e equivalente textual do sidecar. |
| decisões | Trilha GO qualitativo da intenção `2026-10-16T11:24:31Z`, GO final de corpo/metadata `2026-10-16T12:05:25Z` e ficha hash-bound `2026-10-16T12:08:24Z`; Íris PASS visual read-only; Timbre, design owner, PASS explícito `2026-10-16 09:16 BRT` para o SVG como ilustração editorial fixa, inclusive paleta/fonte/raio. A figura integrada ainda requer QA de página. |
| aprovação / proveniência | `release_approved_by=Farol (delegado operacional)`, `release_approved_at=2026-10-16T12:17:54Z`; [recibo próprio](ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-APROVACAO-RELEASE.json) SHA-256 `1ad6b673effde63ba2f9769e00b7377861c556331e260d0deb20a3d9277ed3cf`. Henrique autorizou permanentemente a publicação após gates em 14/10 e deu instrução específica “Pode postar” em 16/10, sem horário exato atribuído; essas delegações não são autoria, revisão pessoal nem aprovação pessoal do hash. |
| autoria / datas / idioma | `author_name=null`, `author_basis=null`; sem byline, `author` no schema, tradução EN ou data de publicação/atualização inventada. `first_published_at=null`, `verified_at=null`, `evidence_of_publication=null`. |
| intenção / medição | Risco moderado de sobreposição com a home Product Evolution; a home retém planos, preços, escopo e contratação, enquanto o artigo separa faturas de terceiros, manutenção/suporte e evolução. Demanda/volume quantitativo, dificuldade e GSC/indexação/consultas/impressões/posição: **SEM DADO**. |

**Gate seguinte:** Batuta/Compasso podem preparar candidato isolado somente com os hashes e metadados deste recibo, revalidar baseline Netlify/Edge e submeter a integração e o preview a QA independente. Um evento `published` só será acrescentado após deploy e produção pública verificados.


### Publicação observada: custo de manutenção de software após o lançamento

**Netlify publicou o deploy `6ad2188019acbbe7b53eec26` em `2026-10-16T12:33:45.462Z`; Afinador concluiu QA HTTP independente em `2026-10-16T12:34:51.127683Z`.** Este evento acrescenta a observação pública ao GO editorial e ao recibo de inclusão anteriores, sem reescrevê-los.

| Campo | Valor |
|---|---|
| `event_id` | `published:torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento:2026-10-16T12:33:45.462Z` |
| `content_id` / `intent_id` / locale | `torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento` / `postlaunch-software-operating-cost-pt` / `pt-BR`; mesmos IDs do recibo, sem reaproveitar o rascunho de custo de construção em HOLD. |
| estado | `approved` → `published` somente após deploy, URL pública e QA HTTP independente observados. |
| URL / HTML | [`https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/`](https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/) HTTP 200, canonical próprio, sem header/meta `noindex`; HTML 31.884 bytes, SHA-256 `8eddf030116919eab0f897ba17316ddf5ca955c3e1e3108d57a87033cf08d728`, igual ao artefato congelado. Indexabilidade técnica não comprova indexação em buscador. |
| `first_published_at` / `verified_at` / atualização | `2026-10-16T12:33:45.462Z` (Netlify `publishedAt` em production.json) / `2026-10-16T12:34:51.127683Z` (QA HTTP Afinador) / `last_substantive_update_at=null`; sem data de atualização inventada. |
| deploy / baseline / Edge | Deploy `6ad2188019acbbe7b53eec26`, anterior `6ad15581ccdee6d89b2ad52f`; guard imediato PASS em `2026-10-16T12:33:45.200Z`. Edge `true`, bundle SHA-256 `335d2d93c1edad52a3fdd6590cfcc965ed3659faa5c65a0b4252dfa406e08b79` conforme guard e recibo de produção autenticados de Compasso. A tentativa própria de Afinador à API Netlify retornou 401 por falta de credencial; a validação independente dele cobre HTTP/conteúdo/SVG/sitemap, não autenticação da API. |
| conteúdo / aprovação | Markdown final SHA-256 `560cb0f8a33dbba8d7db6018507c9d2c122cf420da4d82a2382d88505f3757e8`, revisão Verso `2026-10-16T12:06:26Z`; [ficha](ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-FICHA-EDITORIAL.md) SHA-256 `f3db6eb275824a45c3fec917772393cf84cec2be762a5523bd390e8acfaed5a4`; [recibo de inclusão](ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-APROVACAO-RELEASE.json) SHA-256 `1ad6b673effde63ba2f9769e00b7377861c556331e260d0deb20a3d9277ed3cf`. Source manifest `5172af52bf3c6d975d838dcfe2392dd33f58058ecc23ec63f8f8cd306f4fca76`, artifact manifest `0ab359df4a66eab85a693c82dfbfdb58cfdd9be4c27efe16a4529e4344995389`, release approval manifest `65df305947a2909f783081cae0da2472b7ffd9f9ab75e65bb208b4cd9ed6f54e`, QA gate `013a36863e1c69b09fcc18368476a9da1239ab5452ec16d4485b07e5adfeda33`. |
| metadados / autoria | SEO title, description e H1 único conferem com Trilha; `BlogPosting` sem `author`, `datePublished` ou `dateModified`, sem byline, `<time>` ou alternate EN fictício. A data real do deploy fica no histórico, sem forçar data no HTML. |
| figura | SVG público `/_astro/orcamento-apos-lancamento.Diq0z4bO_22sYfi.svg` HTTP 200 `image/svg+xml`, 3.934 bytes, SHA-256 `36d16c69c5c75d61cdfc167adfb634c2b16b90ea037d3f76eece7144993d9c5d`, igual ao asset aprovado; figure após os cenários hipotéticos, com alt, figcaption e equivalente textual adjacente. QA visual do mesmo artefato no draft mediu 328px úteis em viewport 360, sem overflow/clipping nos tamanhos testados; a medição visual não foi refeita após o deploy. |
| sitemap / preservação | Sitemap de produção com 23 URLs únicas, preserva as 22 anteriores e acrescenta somente este artigo PT. QA registrou 14 HTML HTTP 200/canonical próprio/sem `noindex`/bytes iguais ao `dist`; dez HTML protegidos — quatro artigos anteriores e seis cases PT/EN — permaneceram byte-idênticos. |
| QA / evidências | Afinador pós-produção **9/9 PASS**: [relatório](../../../projeto-50k-site/docs/qa/blog-20261014/MANUTENCAO-PRODUCTION-R1-QA.md) SHA-256 `9aa2b5c063ddfca8a2c306a4b19e895da0f46827f644b22e21a2d1301d0ec154`; [log](../../../projeto-50k-site/docs/qa/blog-20261014/manutencao-production-r1-20261016.log) SHA-256 `8811aff43ec800217362474b2d4d84f2ba20abad8280bb61b4ef527175dd403d`; [JSON](../../../projeto-50k-site/docs/qa/blog-20261014/manutencao-production-r1-20261016.json) SHA-256 `404af1c5ed559b7a203849ba11afea325bc5c43ee153ecceccc54607605580c8`; [Netlify production.json](/private/tmp/torno-blog-release-manutencao-20261016-r1/production.json) SHA-256 `8316e8f9c93706253b2a862d48a8811e8865f315f781b3162921c395d30d0c86`. |
| intenção / medição | GO qualitativo de Trilha para `postlaunch-software-operating-cost-pt` preservado. A home Product Evolution conserva planos/preços/contratação; este artigo trata faturas de provedores, manutenção/suporte e evolução pós-go-live. O HOLD `app-web-mvp-cost-pt` continua válido. Demanda/volume quantitativo, dificuldade e GSC/indexação/consultas/impressões/posição: **SEM DADO**. |

**Deduplicação:** este evento promove apenas `content_id + locale` da manutenção pós-lançamento. Não republica planilhas, critérios, ERP ou evidências antes de refazer sistema; não altera suas datas de primeira publicação, não reabre o custo de construção do MVP e não cria versão EN.


### Rodada 12h — reentrega de evento na integração (2026-10-20)

- Evento editorial `release-approved:torno-artigo-pt-20261020-evento-duplicado:2026-10-20T15:20:24Z`, rodada `2026-10-20-1200` em America/Sao_Paulo. `content_id=torno-artigo-pt-20261020-evento-duplicado`, `intent_id=buyer-integration-duplicate-event-acceptance-pt`, locale `pt-BR`; path planejado `/blog/integracao-evento-duplicado-regra-negocio/`.
- Decisão qualitativa: artigo de compra/aceite sobre o efeito de negócio de uma reentrega, distinto do briefing ERP antes do orçamento, dos critérios gerais de aceite e do relato de erro intermitente. Volume, dificuldade, GSC, ranking e indexação: **sem dado**. Fontes, concorrência, público, imagens e limites no registro [`ROTINA-2026-10-20-1200.md`](ROTINA-2026-10-20-1200.md).
- Markdown em `status: review`, incluível no artefato pelo SHA-256 exato `3c76f468d5d7133b8bec77e0b9503452da224f7b68adb9ca521b7435e61360e8`. Dois SVGs originais vinculados pelos SHA-256 `e9d287f0ac40375e6778bbdc9105a681bc663a03e81de495c45dfae1bfe2d876` e `69d74175d95e5c5a5e3b41e9d87a6c2798501ac5a15c4a9dd0ec77a730e9d0b8`. Revisão independente factual/editorial/visual inicial GO; aprovação operacional do integrador sob autorização editorial do usuário, sem autoria nem aprovação pessoal atribuída a Henrique. Revisão final do diff antes do push.
- `first_published_at=null`, `evidence_of_publication=null` até observação pública. Build, push ou sitemap local isolados não comprovam publicação.


### Rodada 18h — validação de migração de dados (2026-10-16)

- Evento `release-approved:torno-artigo-pt-20261016-migracao-dados-validacao:2026-10-16T21:06:44Z`; execução `blog-2026-10-16-18h-cloud`, registrado em 2026-10-16T21:06:44Z (18h em America/Sao_Paulo). Intenção `data-migration-business-validation-pt`, keyword qualitativa “migração de dados entre sistemas”, URL planejada `/blog/migracao-dados-validacao-troca-sistema/`.
- Decisão `new_distinct_intent`: esta ficha responde quais evidências o comprador exige antes de liberar dados na troca de sistema. O artigo de ERP trata briefing de integração, o de reconstrução trata decidir reparar ou refazer, e o de aceite de MVP trata entregáveis gerais. O HOLD `app-web-mvp-cost-pt` permanece. SERP qualitativa e fontes no registro de execução; volume, dificuldade, GSC, ranking e indexação: SEM DADO.
- Estado editorial `review` no Markdown, incluível no release por aprovação hash-bound `7558a4d1482fb7dfbf8cfccc495efa997de243f8d82d8f5ac182c6489710a86d`. Revisão factual e visual independente: GO registrado pela coordenação; aprovador operacional Codex sob autorização editorial de Henrique nesta rodada. Não atribuir autoria do texto a Henrique.
- Diagramas originais `migracao-validacao.svg` (bcdc6a98a684b4cf149ca19fa933508c94f9e3455ffc09dc1578b55e320fee97) e `migracao-corte.svg` (eb3c29b70e8bce51a62b79fad2bba12dfa9fdf97ea229e809d5b6db99c695513); alt e legendas no Markdown; arte própria, sem terceiros.
- `first_published_at=null`, `verified_at=null`, `evidence_of_publication=null` até observação pública. Push, build ou sitemap local não provam publicação.

### 2026-10-20 18h BRT — teste de carga, evidências para liberar sistema

- Rodada `2026-10-20-1800`, `content_id=torno-artigo-pt-20261020-teste-carga-evidencias`, `intent_id=buyer-load-test-evidence-pt`, locale `pt-BR`, path planejado `/blog/teste-carga-evidencias-liberar-sistema/`.
- Intenção do comprador: conferir cenário, ambiente, critérios, erros, duração e limitações de um teste de carga antes de decidir a liberação. Distinta de aceite funcional genérico, erro intermitente, recuperação por backup e evento duplicado. Pesquisa de keywords e concorrentes qualitativa; fontes Grafana k6 oficiais e datas/limites no registro da rodada.
- Markdown em `status: review` liberável somente pelo SHA-256 `2e3f8187960ac55bddd1fa2a918c68f2a419142c781963187d55bed8a33166d2`; SVGs `b408ead51a00b0cca37920ef5f408e6be223b84e17041fd39bae9a7daa36b4f8` e `f74cc41ffa7f3fbdbaec2934713624ba2f9ce6147c54a1cbd45241ce659f6c3a`. Revisão independente inicial PASS; diff staged final pendente. `first_published_at=null` até URL pública observada.

### 2026-10-21 08h15 BRT — regras de permissão antes de desenvolver

- Rodada `2026-10-21-0815`, `content_id=torno-artigo-pt-20261021-permissoes-acesso`, `intent_id=buyer-access-permissions-business-rules-pt`, locale `pt-BR`, path planejado `/blog/permissoes-acesso-software-regras-negocio/`.
- Intenção qualitativa do comprador: definir perfil, ação, recurso, escopo, condição e responsável, e observar cenários permitidos/negados no aceite. Distinta dos critérios gerais de MVP e do tutorial técnico RLS. Sem dado quantitativo de volume, ranking ou tráfego. Fontes, imagens e limites na [ficha desta rodada](ROTINA-2026-10-21-0815.md).
- Markdown `status: review`, liberável só pelo SHA-256 `c1b602c5509387bf4dd3ee76a0ec6fa476a24b337710fa3e577ba5fa97ae1711` e SVGs SHA-256 `04e92197932078473a72da7cc3a5463f9167e2cc6cdfb6a4f739ac1b7f522825` e `730ddedcba13d5b259cd13b92f4b413421746e8e7e8357323f9f7a7044a890ab`. Revisão independente factual/editorial/visual dos bytes de conteúdo PASS; diff staged final pendente. `first_published_at=null` até URL pública observada.

### 2026-10-21 12h BRT — trilha de auditoria como requisito de negócio

- Rodada `2026-10-21-1200`, `content_id=torno-artigo-pt-20261021-trilha-auditoria`, `intent_id=buyer-audit-trail-business-requirements-pt`, locale `pt-BR`, path planejado `/blog/trilha-auditoria-sistema-requisitos-negocio/`.
- Intenção qualitativa do comprador: reconstruir acontecimentos e resultados por evento, distinta da matriz de permissões de acesso e do relato de erro. Sem métricas de volume/ranking/tráfego. Fonte e limites na [ficha](ROTINA-2026-10-21-1200.md).
- Markdown `status: review`, liberável só pelo SHA-256 `4c2410d08fe0b0be5f023540d35cae00b338bef54065efde7a21a4b8c2ecd359` e SVGs SHA-256 `8274c5147b8ad9d085e6c7fcdc80febea5c3286105963d1010afcce11fa7b64e` e `2667097334d5c848846d03b88e22c49c9e1fd9d8073e7b23449963908a8d2b11`. Revisão independente do conteúdo PASS; diff staged final pendente. `first_published_at=null` até URL pública observada.

### 2026-10-22 18h BRT — alertas para fluxo crítico de software

- Execução `22-1800`, `content_id=torno-artigo-pt-20261022-monitoramento-alertas`, `intent_id=buyer-software-monitoring-actionable-alerts-pt`, locale `pt-BR`; URL planejada `/blog/monitoramento-software-alertas-fluxo-critico/`.
- Intenção informacional do comprador: definir sinal, condição, cobertura, destinatário, ação e teste para perceber um problema num fluxo crítico. Auditoria reconstrói eventos, erro intermitente documenta ocorrência, rollback trata reversão e custo de manutenção trata orçamento; nenhuma dessas páginas é substituída. Pesquisa quantitativa, GSC e indexação: sem dados.
- Markdown em `status: review`, aprovado para inclusão nesta rodada somente pelo SHA-256 `ce937c915771947017a402ec3b160244feb60ebc1fd51d66eb51d73c443558d5` e SVGs `66a5ae0ed1d908ded471ae3970733ba29285d3476340fec7c1cb00165dc29bb5`/`4e598773dd63b98f3fb041f8c91488c8be811e0d8536f43b8b013518e4e221a4`. Revisão factual/visual independente do autor GO; gate do diff completo antes do push. Aprovação operacional do integrador sob autorização editorial do usuário, sem autoria ou revisão pessoal de Henrique.
- `first_published_at=null`, `verified_at=null`, `evidence_of_publication=null` até observação pública. Build ou push não provam publicação.

### 2026-10-23 08h15 BRT — comportamento diante do limite de API

- Execução `23-0815`, `content_id=torno-artigo-pt-20261023-limites-api-cota`, `intent_id=buyer-integration-api-quota-behavior-pt`, locale `pt-BR`, URL planejada `/blog/limites-api-integracao-cota/`.
- Intenção do comprador: combinar pendência, espera, retomada, responsável e evidência de aceite quando uma API impõe uma cota. Distinta do briefing ERP amplo, evento duplicado, carga e monitoramento. Pesquisa de keyword e fontes na [ficha](ROTINA-2026-10-23-0815.md); sem dados quantitativos.
- Markdown `status: review`, incluível apenas pelo SHA-256 `16ce502784889115fc254eae1de18b58f77947dc52e55b1b78906796b333974a` e SVGs `5509b338eedac92a5ac3a015f188b6da8777574527cab6cc93c47dd8ec31e8ae` e `eea3cc3b7623173c9efa67a182ad5954a24acf64726b31f598286f2663289952`. Revisão factual/visual independente do autor GO; revisão final do diff pendente. Aprovação operacional do integrador sob autorização editorial do usuário, sem atribuir autoria ou revisão pessoal a Henrique.
- `first_published_at=null`, `verified_at=null`, `evidence_of_publication=null` até observação pública.

### 2026-10-23 12h BRT — erros na importação recorrente de planilhas

- Execução `23-1200`, `content_id=torno-artigo-pt-20261023-importacao-planilhas-erros`, `intent_id=buyer-recurring-spreadsheet-import-validation-pt`, locale `pt-BR`, URL planejada `/blog/importacao-planilhas-sistema-tratar-erros/`.
- Intenção do comprador: especificar modelo, prévia, política de gravação, rejeições, recibo e reenvio de uma funcionalidade de importação usada repetidamente pela operação. Distinta da decisão de automatizar planilhas e da migração histórica com corte de sistema. Pesquisa e fontes na [ficha](ROTINA-2026-10-23-1200.md), sem volume/ranking/tráfego conhecidos.
- Markdown `status: review`, incluível apenas pelo SHA-256 `c2deb1fc418d548a2b4f9c003654a86081910ac4e4a6bd222bb61f89e064b95f` e SVGs `6911a8c890de53b55dcc378560551b4ddd19efbe9befc70b462a3fc5894ea231` e `df18dc1db078299321ecd7a5a037941985ef5226deb634bfb94cc816bc519ec4`. Revisão factual e visual independente do autor GO; diff staged final ainda sujeito ao gate pré-push. Aprovação operacional do integrador sob autorização editorial do usuário, sem atribuir autoria ou revisão pessoal a Henrique.
- `first_published_at=null`, `verified_at=null`, `evidence_of_publication=null` até observação pública. Build, push ou sitemap local isoladamente não comprovam publicação.
