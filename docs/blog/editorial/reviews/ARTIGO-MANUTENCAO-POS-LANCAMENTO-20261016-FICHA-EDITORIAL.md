# Ficha editorial — custo de manutenção de software após o lançamento

**Responsável pela decisão SEO/editorial:** Trilha. **Decisão nesta ficha:** `2026-10-16T12:08:24Z` — GO editorial de corpo, metadados e intenção para os bytes identificados abaixo, conforme parecer de `2026-10-16T12:05:25Z`. **Estado:** `review`. Esta ficha separada não é recibo de inclusão, reserva de slug, publicação nem alteração do Markdown da Pena.

## 1. Identidade e estado vinculados ao corpo

| Campo | Valor |
|---|---|
| `content_id` | `torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento` — identificador estável confirmado para este conteúdo PT. |
| `intent_id` | `postlaunch-software-operating-cost-pt` — mesma intenção qualitativa distinta decidida em `2026-10-16T11:24:31Z`; não deriva do rascunho de custo de construção do MVP. |
| `locale` / `type` / `status` | `pt-BR` / `artigo` / `review`. Somente um recibo posterior, próprio e explícito, poderá mudar o estado para `approved`; `published` exige observação após deploy. |
| `body_path` / `body_sha256` | [`custo-manutencao-software-apos-lancamento-final.md`](/private/tmp/torno-blog-article-review/custo-manutencao-software-apos-lancamento-final.md) / `560cb0f8a33dbba8d7db6018507c9d2c122cf420da4d82a2382d88505f3757e8` — 8.142 bytes, 60 linhas, conferidos localmente. Esta ficha vale somente para estes bytes. |
| `created_at` | `null` — instante de criação do conteúdo sem evidência verificável; não inferir de data do nome, horário de arquivo ou `reviewed_at`. |
| `reviewer` / `reviewed_at` | `Verso` / `2026-10-16T12:06:26Z` — PASS factual/editorial do corpo SHA acima comunicado por Farol. É revisão, não autoria nem aprovação de release. |
| `author_name` / `author_basis` | `null` / `null`; nenhuma pessoa ou organização atribuída como autora, nenhuma byline ou fallback. |
| `translation_of` / `translation_status` | `null` / `sem tradução EN real`; não criar alternate/hreflang ou versão EN por tradução presumida. |
| `release_approved_by` / `release_approved_at` / `release_approval_evidence` | `null` / `null` / `null`; nenhum recibo ou inclusão em artefato aprovado por esta ficha. |
| `first_published_at` / `verified_at` / `evidence_of_publication` | `null` / `null` / `null`; nenhum build, deploy ou HTTP público verificado para este artigo. `indexation_observation`: **SEM DADO**. |

## 2. Intenção, URL e metadados

| Campo | Valor exato / fronteira |
|---|---|
| `working_title` / `h1` | `Custo de manutenção de software: o que prever após o lançamento` — H1 único a ser emitido pelo wrapper; o corpo congelado não contém H1 corporal. O `title` do frontmatter corresponde a este valor. |
| `seo_title` | Valor literal no bloco abaixo. |
| `seo_description` | `Planeje o custo recorrente de um software web após o lançamento: serviços de operação, suporte, correções e evolução, com premissas e responsáveis.` |
| `summary` / `excerpt` | `Um roteiro para estimar o orçamento recorrente de um software web após o go-live, separando faturas de provedores, trabalho de manutenção e evolução funcional.` |
| `primary_question` | `Como estimar o orçamento recorrente de operação e manutenção de um software web depois do lançamento, separando faturas de provedores, suporte e correções, e evolução funcional?` |
| `url_owner` | `postlaunch-software-operating-cost-pt` — dono editorial da intenção para o destino PT proposto; não significa posse ou reserva de rota em código. |
| `proposed_path` | `/blog/custo-manutencao-software-apos-lancamento/` — única proposta atual, **não reservada**. O path analítico anterior `/blog/orcamento-operacao-software-pos-lancamento/` nunca foi reservado nem publicado e não cria segunda página ou redirecionamento. |
| `canonical_url` / `canonical_status` | `https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/` / `planned`. Valor planejado para eventual artefato, **não canonical observado**. |
| `audience` / `buyer_stage` | Dono ou gestor de software web já em operação, ou que precisa orçar obrigações posteriores ao lançamento; planejamento de continuidade e orçamento recorrente pós-go-live. |
| `scope` | Ficha por componente e dois cenários didáticos de 30 dias para separar faturas de provedores, trabalho de manutenção/suporte e evolução, com premissas, responsáveis, cobertura e revisão de tarifas. |
| `not_scope` | Preço de construção de MVP; cotação específica de provedor ou Torno; média/percentual universal de manutenção; tabela dos planos Product Evolution; promessa de suporte 24/7, teto global de gastos ou garantia de restauração. |

```text
seo_title = Custo de manutenção de software após o lançamento | Torno
```

**Fronteiras e risco.** A [home do Torno Studio](https://tornostudio.com/#precos) conserva a oferta, os preços e o escopo do Product Evolution; este artigo explica como montar o custo total sem incorporar automaticamente faturas de terceiros à mensalidade do serviço. A garantia publicada de 60 dias é para bugs do MVP, não para infraestrutura, suporte contínuo ou evolução funcional. Sobreposição com a home: **moderada**, resolvida pela pergunta e pelo link contextual. [Critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/) continua dono do aceite da entrega; [briefing de integração ERP](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/) continua dono de dependências para cotar integração. O artigo de planilhas, as landings de recuperação e Lovable, o guia RLS e o artigo sobre refazer sistema conservam suas perguntas. O rascunho de **custo de construção do MVP web** SHA-256 `c8765585249b107cc3529bd675e13d75c6a1ea9ba7d87a431e6c5a870b9e32cb` permanece em `hold_cannibalization`; este artigo não o reetiqueta nem reutiliza seu corpo. SERP externa concorrente; volume, dificuldade, demanda quantitativa e GSC: **SEM DADO**.

## 3. `claims_and_sources` — vínculo e limites

Fonte técnica de rastreio: [`custo-manutencao-fontes-20261016.json`](/private/tmp/torno-blog-article-review/custo-manutencao-fontes-20261016.json), SHA-256 `29be5a5da81982d85e95edc2f91d02d845bcd1bbb760ea4fd4de779ac5ac8216`, conferido localmente. O JSON registra GET HTTP 200, URLs finais, SHA-256 do corpo HTTP, marcadores e `checked_at_utc`; **não preserva snapshot integral do HTML**. O PASS de Verso aplica-se ao Markdown SHA acima, comunicado em `2026-10-16T12:06:26Z`.

| Alegação material | Classe, fonte, entidade e data disponível | `checked_at` UTC / limite |
|---|---|---|
| Consciência de gasto/uso e otimização contínua são práticas do pilar de custos. | **[FATO]** [AWS Well-Architected — Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html), entidade Amazon Web Services; página informa publicação em `2024-06-27`. JSON: `aws-cost-optimization`, corpo HTTP SHA-256 `59a3aa73b8d448d04492e13564f5044884934f3e8fd54a40c3fec960136aebfe`. | `2026-10-16T12:03:14Z`. Aplica-se a workloads AWS; não fixa preço, arquitetura ou contrato do Torno. |
| O Spend Cap da Supabase cobre somente certos itens de uso e exclui outros; não limita cobranças de fornecedores externos. | **[FATO]** [Supabase Docs — Control your costs](https://supabase.com/docs/guides/platform/cost-control), entidade Supabase; data de publicação/atualização da página: **SEM DADO** no pacote. JSON: `supabase-cost-control`, corpo HTTP SHA-256 `73fb7cc5ec697c47b9872c3aab143ec13d1354405c9e8606982f186ccf12ff81`. | `2026-10-16T12:03:15Z`. Regra de plano sujeita a mudança; não equivale a teto global da aplicação nem informa preço de projeto. |
| Product Evolution é oferta da home; o MVP tem garantia de 60 dias para bugs; funcionalidade nova não é bug. | **[FATO]** [Home Torno Studio](https://tornostudio.com/#precos), entidade Torno Studio; data original de publicação/atualização: **SEM DADO** no pacote. JSON: `torno-home`, corpo HTTP SHA-256 `786353108ccaffa3d878688aef1b1505a1756d7714a259d09aafc86dc8cb9614`. | `2026-10-16T12:03:15Z`. Oferta observada naquela consulta; preço/escopo atuais exigem rechecagem antes de contratação. Garantia restrita a bugs do MVP, sem cobertura geral de infraestrutura. |
| Janela de 30 dias, franquia hipotética de 10 GB-mês, usos de 8/25 GB-mês e 1.000/4.000 mensagens, fórmulas `F + 1.000×M` e `F + 15×G + 4.000×M + S`. | **[HIPÓTESE]** Exemplo didático original do [corpo vinculado](/private/tmp/torno-blog-article-review/custo-manutencao-software-apos-lancamento-final.md); entidade editorial Torno Studio. Data de fonte externa: não aplicável. | `checked_at` de fonte externa: não aplicável. `F`, `G`, `M` e `S` não são tarifas reais; valores monetários permanecem **a cotar**. Não apresentar como caso de cliente, proposta do Torno ou média de mercado. |

## 4. Links internos reais no corpo

| Destino presente no Markdown vinculado | Motivo e limite |
|---|---|
| [`https://tornostudio.com/#precos`](https://tornostudio.com/#precos) | Duas âncoras: sustentar a garantia publicada de 60 dias para bugs e levar à oferta Product Evolution. A tabela de preços permanece na home; o artigo não a duplica. |

Os links para critérios de aceite e ERP são apenas referências de fronteira nesta ficha: **não aparecem no corpo congelado** e não devem ser registrados como links internos desse Markdown. Nenhuma tradução EN ou outro link interno é inferido.

## 5. Gates posteriores

- **Asset:** pendente; o corpo SHA acima não referencia imagem. Qualquer asset ou mudança no Markdown gera novos bytes/hash e exige revisão correspondente.
- **Recibo de inclusão:** pendente; `review` não permite inclusão no artefato. A autorização de Henrique para publicar após gates não preenche `release_approved_by/at/evidence` deste artigo.
- **Produção:** build, QA técnico, deploy, URL/canonical observados e indexação não foram comprovados por esta ficha. Só observação pós-deploy pode sustentar `published`; GSC continua **SEM DADO**.

Esta ficha guarda a decisão e os metadados fora do frontmatter congelado da Pena. Nenhum dado aqui modifica o corpo, o histórico de intenção–URL ou o código do site.
