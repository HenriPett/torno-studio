---
content_id: torno-artigo-pt-20261015-criterios-aceite-mvp
intent_id: software-vendor-choice-pt
locale: pt-BR
type: artigo
status: review
working_title: "Critérios de aceite para MVP: como definir antes de contratar"
h1: "Critérios de aceite para MVP: como definir antes de contratar"
seo_title: "Critérios de aceite para MVP: guia para contratar | Torno"
seo_description: Defina critérios de aceite antes de contratar um MVP. Veja exemplos, uma ficha de escopo e como validar integrações sem depender de promessas vagas.
summary: Antes de pedir um orçamento de MVP, escolha um fluxo e escreva como você vai verificar que ele funciona.
primary_question: Como definir comportamentos e evidências de aceite antes de contratar um MVP, uma integração ou uma ferramenta interna?
proposed_path: /blog/criterios-aceite-mvp/
canonical_url: https://tornostudio.com/blog/criterios-aceite-mvp/
url_owner: Torno Studio
audience: Quem considera contratar um MVP, uma integração ou uma ferramenta interna e precisa definir e verificar comportamentos e evidências de aceite antes da contratação.
buyer_stage: Consideração e preparação para contratar, antes de fechar escopo e implementação.
scope: Definir critérios de aceite observáveis por fluxo; explicitar regras, exceções, dependências, evidências e validação; usar cenários e checklist como ponto de partida.
not_scope: Comparação geral de fornecedores ou custos, migração de planilhas, especificação técnica completa, aconselhamento jurídico, garantia de resultado ou recomendação universal de tecnologia.
author_name: null
author_basis: null
created_at: null
reviewer: Verso
reviewed_at: 2026-10-15T12:34:07Z
verified_at: null
release_approved_by: Farol (delegado operacional)
release_approved_at: 2026-10-15T12:35:03Z
release_approval_evidence: "{\"authorization_provenance\":{\"standing_authorization\":{\"authorized_by\":\"Henrique\",\"authorized_date\":\"2026-10-14\",\"evidence_path\":\"marketing/blog/HISTORICO-INTENCAO-URL.md, evento de decisão de negócio do fundador\",\"scope\":\"Autorização permanente de publicação, condicionada aos gates editoriais e de QA.\"},\"specific_operational_delegation\":{\"authorized_by\":\"Henrique\",\"authorized_at_utc\":\"2026-10-15T11:24:34Z\",\"evidence\":\"Registro Maestri recall blue indicado por Henrique; retomada 'Pode prosseguir' comunicada pela coordenação após o congelamento.\"},\"prior_delegated_release_approval\":{\"approved_by\":\"Farol (delegado operacional)\",\"approved_at_utc\":\"2026-10-15T11:36:05Z\",\"scope\":\"Aprovação anterior vinculada ao body SHA-256 b63aa2587d0ff3cccf3d8d8af37b647c2358f4fea2a5169c91bd2b278bd393f6; preservada como histórico, sem valer para os bytes finais.\"},\"current_delegated_release_approval\":{\"approved_by\":\"Farol (delegado operacional)\",\"approved_at_utc\":\"2026-10-15T12:35:03Z\",\"scope\":\"Incluir no artefato/release somente o Markdown final SHA-256 bfee8c6b195d2ee2b3946327aa0e010348921bde6edc64c29169ab00e5d151e2, SVG SHA-256 77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582 e metadados SEO exatos deste adendo, após PASS Verso e GO Trilha.\"},\"editorial_review_by_henrique\":false,\"personal_hash_approval_by_henrique\":false},\"related_evidence\":{\"trail_decision\":\"Trilha GO qualitativo at 2026-10-15T11:28:11Z for software-vendor-choice-pt; demand SEM DADO.\",\"verso_review\":\"PASS factual/editorial claim-by-claim on saved bytes at 2026-10-15T12:34:07Z for body SHA-256 bfee8c6b195d2ee2b3946327aa0e010348921bde6edc64c29169ab00e5d151e2\"},\"release_addendum_v3\":{\"event_id\":\"release-addendum-v3:torno-artigo-pt-20261015-criterios-aceite-mvp:2026-10-15T12:35:03Z\",\"path\":\"marketing/blog/ARTIGO-CRITERIOS-ACEITE-MVP-20261015-ADENDO-RELEASE-V3.json\",\"sha256\":\"ec2c57444bc88cf22fc251c98c1c48da3333686ea4b13005526e90df6c8df939\",\"recorded_at_utc\":\"2026-10-15T12:35:03Z\"}}"
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
internal_links:
  - path: https://tornostudio.com/#precos
    reason: CTA para conferir as etapas descritas na página da Torno.
claims_and_sources:
  - classification: FATO
    claim: Gherkin organiza exemplos com Given, When e Then; o artigo adapta essa organização em linguagem comum.
    reference: https://cucumber.io/docs/gherkin/reference/
    entity: Cucumber
    checked_at: 2026-10-15T11:29:47.290Z
    limit: Referência a estrutura de cenários, não exigência de usar Gherkin nem ferramenta.
  - classification: FATO
    claim: A Stripe documenta idempotency keys para repetir com segurança certas requisições após erro de conexão sem criar um segundo objeto ou repetir a atualização.
    reference: https://docs.stripe.com/api/idempotent_requests
    entity: Stripe
    checked_at: 2026-10-15T11:29:49.252Z
    limit: Exemplo específico da API Stripe; não garante suporte equivalente em outro ERP ou integração.
  - classification: FATO
    claim: O Scrum Guide atribui aos Developers a responsabilidade por instilar qualidade aderindo a uma Definition of Done.
    reference: https://scrumguides.org/scrum-guide.html#increment
    entity: Scrum Guide
    checked_at: 2026-10-15T11:29:49.670Z
    limit: Descreve responsabilidade no Scrum; não é regra legal nem requisito para projetos fora do framework.
  - classification: FATO
    claim: A página pública da Torno descreve Product Sprint com escopo, critérios de aceite, exclusões e protótipo navegável, e separa a construção como etapa posterior.
    reference: https://tornostudio.com/
    entity: Torno Studio
    checked_at: 2026-10-15T11:29:49.974Z
    limit: Descrição da oferta observada no HTML público naquela coleta; não promete implementação no Sprint.
  - classification: FATO
    claim: A página da Torno liga ao agendamento de diagnóstico de 45 minutos apresentado como grátis.
    reference: https://tornostudio.com/
    entity: Torno Studio
    checked_at: 2026-10-15T11:29:49.974Z
    limit: Texto e destino do link foram observados na home; o HTML de destino Calendly não confirmou duração nem gratuidade.
  - classification: HIPÓTESE
    claim: Os cenários e exemplos de portal de pedidos, papéis de usuário, falhas e evidências descritos no artigo são hipotéticos.
    reference: Exemplos originais do artigo.
    entity: Exemplo hipotético
    limit: Não representa cliente, case, sistema implantado ou evidência de resultado.
  - classification: HIPÓTESE
    claim: O roteiro e o checklist são uma heurística editorial para organizar uma conversa e a validação de um MVP.
    reference: Síntese editorial original do artigo.
    entity: Roteiro proposto
    limit: Não é método validado nem garantia; deve ser adaptado ao risco e ao contexto real.
---
Antes de pedir um orçamento de MVP, escolha um fluxo e escreva como você vai verificar que ele funciona. Quem usa? Em qual situação? O que deve acontecer? O que acontece quando algo dá errado? Essas respostas formam os critérios de aceite e ajudam a transformar uma ideia em uma entrega verificável.

Uma proposta que promete “portal de pedidos com integração ao ERP” ainda deixa decisões importantes abertas. O pedido entra automaticamente? Pode ser enviado duas vezes? Quem recebe o aviso quando o ERP está indisponível? Sem essas definições, fornecedores podem orçar trabalhos diferentes usando a mesma descrição.

Este roteiro serve para quem vai contratar um MVP, uma integração ou uma ferramenta interna e precisa conversar sobre escopo sem escrever uma especificação técnica completa.

## O que é um critério de aceite?

É uma condição observável que uma entrega precisa cumprir para ser considerada aceita. “A tela deve ser intuitiva” expressa uma intenção, mas deixa a avaliação subjetiva. “Ao enviar um pedido sem endereço, o sistema informa o campo pendente e preserva os itens preenchidos” descreve um comportamento que pode ser testado.

Uma estrutura útil é: dado um contexto, quando uma ação acontece, então um resultado deve ser observado. A [documentação do Cucumber](https://cucumber.io/docs/gherkin/reference/) usa essa organização para descrever cenários. Você pode aproveitar a lógica em português comum, sem instalar ferramentas ou escrever código.

Critérios de aceite também ajudam a separar uma falha do comportamento combinado de uma solicitação nova. Essa distinção precisa estar alinhada à proposta e ao processo de mudanças do projeto.

## Comece pela decisão que o MVP precisa permitir

Imagine um exemplo hipotético: uma distribuidora quer testar se clientes conseguem enviar pedidos pelo portal sem precisar confirmar cada item por mensagem. O primeiro fluxo vai da seleção de produtos ao recebimento de uma confirmação identificável.

A primeira versão poderia incluir um perfil de cliente, um perfil de operação, consulta de catálogo e envio do pedido ao ERP. Negociação de preços, aplicativo nativo e faturamento automático poderiam ficar fora. Essas são escolhas deste exemplo, não uma receita para toda distribuidora.

Registre também como avaliar o uso depois do lançamento: quantos pedidos exigiram intervenção, onde os clientes desistiram e por quê. Essas observações ajudam a decidir a próxima versão. Já os critérios de aceite verificam o comportamento acordado do software antes de aceitar a entrega. Um fluxo pode passar nos testes e ainda precisar de mudanças para ser adotado pelos clientes.

## Escreva três cenários para cada fluxo importante

Para começar, descreva o caminho esperado, uma entrada inválida e uma interrupção ou repetição. A quantidade final depende do risco e das regras do produto.

### 1. Pedido válido

Dado um cliente autorizado, produtos disponíveis e endereço preenchido, quando o pedido for enviado, o portal deverá exibir um identificador e um estado coerente com a resposta da integração. A operação deverá conseguir localizar esse mesmo pedido.

A evidência pode ser uma execução em homologação com dados de teste e a conferência do identificador nos dois sistemas. Se o ERP ainda não confirmou o recebimento, o portal deverá mostrar “aguardando confirmação”, conforme a regra acordada.

### 2. Informação incompleta

Dado um pedido sem endereço, quando o cliente tentar enviá-lo, o portal deverá indicar o campo obrigatório, manter os itens selecionados e impedir o envio ao ERP.

Esse cenário esclarece uma regra que poderia passar despercebida em uma demonstração com todos os campos preenchidos. O comprador consegue validá-lo sem conhecer a implementação.

### 3. Resposta perdida e nova tentativa

Dado um pedido recebido pelo ERP cuja confirmação não chegou ao portal, quando houver uma nova tentativa de envio, o resultado esperado deverá ser um único pedido no destino e um estado consultável na origem.

Esse comportamento precisa ser investigado com a documentação do ERP. A [Stripe documenta chaves de idempotência para repetir com segurança requisições de criação ou atualização em sua API após erro de conexão, sem criar um segundo objeto nem repetir a atualização](https://docs.stripe.com/api/idempotent_requests). Isso é um exemplo de mecanismo, não uma garantia de que seu ERP o oferece. Se ele não oferecer, o fornecedor deverá explicitar a solução e os limites antes de assumir esse compromisso.

![Diagrama de critérios de aceite para portal de pedidos hipotético: contexto, ação, resultado e evidência; três cenários: pedido válido, informação incompleta e nova tentativa após perda da resposta.](./torno.svg)

*Diagrama original preparado para este artigo. Os cenários são hipotéticos.*

## Use uma ficha curta para pedir orçamento

Copie esta ficha e preencha uma para cada fluxo prioritário:

- **Objetivo:** qual problema o fluxo precisa resolver?
- **Usuário e permissão:** quem pode iniciar, consultar e alterar?
- **Início e fim:** o que dispara o fluxo e qual resultado encerra a etapa?
- **Regras:** quais dados, estados e exceções precisam ser respeitados?
- **Cenários de aceite:** o que será testado e qual resultado será conferido?
- **Evidência e responsável:** quem valida, em qual ambiente e com quais dados?
- **Dependências:** quais acessos, serviços e decisões precisam estar disponíveis?
- **Fora do escopo:** o que fica para outra etapa?

No exemplo do portal, uma dependência seria o acesso autorizado ao ambiente de testes do ERP. Outra seria a definição de qual sistema mantém o catálogo. Se essas informações faltarem, registre a pendência e peça que o orçamento explicite a premissa usada.

Essa ficha é um ponto de partida para a conversa. Produtos com pagamentos, dados sensíveis ou exigências regulatórias precisam de avaliação específica.

## Combine como a entrega será validada

Antes de começar, definam quem representa o negócio na validação, quando os testes acontecem e como registrar divergências. Usem dados sintéticos sempre que possível. Guardem o cenário executado, o resultado esperado, o resultado observado e a versão testada.

Também explicitem requisitos que atravessam vários fluxos: controle de acesso, recuperação de dados, monitoramento e documentação de operação. O [Scrum Guide](https://scrumguides.org/scrum-guide.html#increment) atribui aos Developers a responsabilidade por instilar qualidade ao aderir a uma Definição de Pronto. Na contratação, vale registrar o padrão geral de qualidade e os critérios específicos de cada entrega, mesmo quando o projeto não usa Scrum.

Evite metas vagas como “carregar rápido”. Quando desempenho importar, combinem uma condição mensurável com volume de dados, quantidade de usuários, ambiente e limite esperado. Esses números devem vir da necessidade e da viabilidade do projeto.

## O que levar para a primeira conversa

Leve um fluxo prioritário, três cenários de aceite, as dependências conhecidas e uma lista do que pode esperar. Peça ao fornecedor que aponte ambiguidades e explique como demonstrará cada resultado. Isso ajuda a comparar propostas e a identificar decisões ainda abertas antes da construção.

Na Torno, o Product Sprint inclui escopo com critérios de aceite, exclusões e protótipo navegável; a construção é uma etapa separada. [Veja as etapas na página da Torno](https://tornostudio.com/#precos) ou [agende um diagnóstico de 45 minutos, grátis](https://calendly.com/henriquepett/45min), para conversar sobre o fluxo que você precisa colocar de pé.
