---
content_id: torno-artigo-pt-20261102-isolamento-multiempresa
intent_id: buyer-multitenant-isolation-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Sistema multiempresa: como conferir se os dados estão separados?'
h1: 'Sistema multiempresa: como conferir se os dados estão separados?'
seo_title: 'Sistema multiempresa: como testar o isolamento | Torno'
seo_description: 'Saiba que evidências pedir para conferir se uma empresa não acessa dados de outra em listas, links, arquivos, exportações e APIs.'
summary: 'Um roteiro de aceite para compradores de portais e sistemas usados por várias organizações, com ensaios positivos e negativos.'
primary_question: Como comprovar, antes do aceite, que os dados de empresas diferentes estão separados em um sistema?
proposed_path: /blog/sistema-multiempresa-isolamento-dados-aceite/
canonical_url: https://tornostudio.com/blog/sistema-multiempresa-isolamento-dados-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Gestores que contratam portais B2B ou sistemas usados por clientes, unidades ou empresas diferentes.
buyer_stage: Definição de escopo e aceite antes da liberação a vários clientes.
scope: Fronteira entre organizações, cenários de leitura e alteração, arquivos, exportações, API, evidências e regressão.
not_scope: Pentest, certificação, garantia de segurança, tutorial de RLS, implementação específica de banco ou alegação de caso real da Torno.
author_name: null
author_basis: null
created_at: '2026-11-02T11:16:20Z'
reviewer: null
reviewed_at: null
verified_at: null
release_approved_by: null
release_approved_at: null
release_approval_evidence: null
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
- path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
  reason: Define as regras gerais de perfil, ação e escopo antes dos testes entre organizações.
- path: https://tornostudio.com/guias/rls-multiempresa/
  reason: Aprofunda uma possível técnica de isolamento no banco, quando aplicável à arquitetura.
- path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
  reason: Apoia a preparação de um ensaio autorizado com dados sintéticos.
- path: https://tornostudio.com/diagnostico/
  reason: Conversa para delimitar empresas, dados e comportamento esperado.
claims_and_sources:
- classification: FATO
  claim: A OWASP trata isolamento multiempresa também em contexto da organização, cache e armazenamento de arquivos; particionar visualmente a interface não é suficiente.
  reference: https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html
  entity: OWASP Cheat Sheet Series
  source_date: null
  checked_at: '2026-11-02T11:16:20Z'
  limit: Orientação de projeto, não prova de vulnerabilidade ou segurança de um sistema específico.
- classification: FATO
  claim: O OWASP API Security Top 10 orienta verificar a autorização sobre o objeto nas operações de API que recebem seu identificador.
  reference: https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/
  entity: OWASP API Security Top 10 — API1:2023
  source_date: '2023'
  checked_at: '2026-11-02T11:16:20Z'
  limit: Categoria de risco; não afirma que toda API com identificadores tem a falha.
- classification: FATO
  claim: A OWASP descreve testes de regressão com duas organizações para detectar leitura indevida entre elas após mudanças no software.
  reference: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Regression_Testing_Cheat_Sheet.html
  entity: OWASP Cheat Sheet Series
  source_date: null
  checked_at: '2026-11-02T11:16:20Z'
  limit: Exemplo de método de teste, não garantia de cobertura completa.
- classification: HIPÓTESE
  claim: Os cenários de duas empresas e as figuras são exemplos editoriais originais.
  reference: Modelo editorial deste artigo.
  entity: Torno Studio
  limit: Não representam cliente, sistema ou teste executado pela Torno.
---

**Para aceitar um sistema multiempresa, peça uma demonstração com duas empresas fictícias e usuários separados.** Cada pessoa deve encontrar os próprios registros e deixar de encontrar os da outra organização — na tela, em links diretos, exportações, arquivos e chamadas de API previstas no projeto. Esconder uma opção na interface não comprova que o servidor impede o acesso.

Esse ensaio exige uma definição anterior: quais dados pertencem a cada empresa, quais podem ser compartilhados legitimamente e quem pode atravessar essa fronteira. Sem isso, “isolamento” vira uma promessa difícil de conferir.

## Defina a fronteira antes do teste

Num portal para clientes, uma empresa pode ter pedidos, documentos e usuários próprios. Em outro produto, uma holding pode precisar consultar várias unidades. Os dois casos têm regras diferentes. Registre quem pode consultar, alterar, baixar e exportar cada tipo de informação, incluindo as exceções autorizadas.

O artigo sobre [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) ajuda a formular perfil, ação e alcance dos dados. Aqui, o recorte é mais específico: verificar se o produto respeita a fronteira **entre organizações**, inclusive nos caminhos que não aparecem na tela principal.

A [orientação da OWASP para aplicações multiempresa](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html) cobre identificação da organização e separação em dados, cache, arquivos e tarefas. Isso mostra por que o comprador deve pedir evidências além de uma lista filtrada. A arquitetura concreta continua sendo decisão do projeto.

![Ilustração editorial de dois arquivos de empresas, com registros próprios e um acesso cruzado barrado.](./torno-multiempresa-vitrines.svg)

*Cada empresa deve encontrar seus dados dentro do alcance contratado; a figura não representa um produto existente. Ilustração original Torno Studio, 2026.*

## Use o mesmo registro por caminhos diferentes

**Exemplo inteiramente fictício:** a Empresa A tem o pedido A-104 e um comprovante; a Empresa B tem o pedido B-205. Uma pessoa da Empresa A consulta A-104 normalmente. Depois, ela tenta abrir B-205 por pesquisa, por link direto e por uma exportação que inclua pedidos. O resultado esperado é o acesso negado ou a ausência do registro, conforme a regra acordada, sem revelar dados da Empresa B.

Repita a conferência para uma alteração. Uma pessoa da Empresa B não deve conseguir mudar A-104 apenas por conhecer seu identificador. O [OWASP API1:2023](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/) explica que operações de API com identificadores de objetos devem verificar se a pessoa tem autorização para agir naquele objeto. A rejeição precisa ocorrer no serviço que atende a requisição; ocultar o botão não basta.

Inclua o comprovante. Se houver um link de download, confira se a pessoa da outra empresa consegue usá-lo ou gerar outro. Para arquivos, a [OWASP recomenda verificar acesso ao objeto e à operação antes de servi-lo ou criar uma URL assinada](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html). O comportamento específico deve constar no escopo, inclusive o que acontece com links já emitidos.

**Fim do exemplo fictício.** Não é relato de um sistema da Torno nem evidência de uma implantação real.

## Peça uma folha de aceite que registre o resultado

Uma demonstração útil identifica versão, ambiente, usuários de teste, registros sintéticos, ação tentada, resultado esperado e resultado observado. Separe o caso **permitido** do caso **negado**: se tudo for negado, o sistema pode simplesmente estar quebrado. Se apenas o caminho normal for testado, uma falha entre empresas pode passar despercebida.

| Ensaio fictício | Resultado a conferir |
|---|---|
| A consulta seu pedido | O registro autorizado aparece |
| A tenta abrir pedido de B por link | Nenhum dado de B é entregue |
| B tenta alterar pedido de A pela API | A mudança é recusada no servidor |
| A exporta seus pedidos | O arquivo não inclui registros de B |
| B tenta baixar anexo de A | O objeto não é entregue |

![Folha ilustrada de ensaio com ações permitidas e recusadas entre duas empresas fictícias.](./torno-multiempresa-ensaio.svg)

*A folha organiza perguntas para o aceite; não é prova de teste executado. Ilustração original Torno Studio, 2026.*

Faça esses ensaios em [ambiente de homologação autorizado](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), usando dados sintéticos. Registre também contas com acesso legítimo a mais de uma empresa quando essa função existir; elas precisam obedecer à regra própria, sem virar uma exceção implícita para todos os usuários.

## Refaça a prova quando o produto mudar

Uma liberação correta hoje não garante que uma mudança em consulta, cache ou exportação preserve o mesmo limite amanhã. A [OWASP descreve testes de regressão entre duas organizações](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Regression_Testing_Cheat_Sheet.html): semeia dados de uma, consulta como usuário da outra e verifica que a resposta não contém registros da primeira. Combine quais cenários ficarão automatizados e quando serão executados novamente.

Se a equipe usar isolamento por políticas de banco, o [guia técnico de RLS multiempresa](https://tornostudio.com/guias/rls-multiempresa/) aprofunda uma técnica possível. A prova de aceite continua necessária: uma política de banco não demonstra sozinha o comportamento de arquivos, cache, exportações e demais caminhos do produto.

Antes de contratar ou liberar o sistema, leve ao fornecedor dois exemplos de organizações, seus tipos de registro e uma exceção legítima, se houver. Isso permite definir a fronteira e pedir uma demonstração observável. Para avaliar o escopo de um portal ou ferramenta interna, [converse com Henrique](https://tornostudio.com/diagnostico/).

*Fontes consultadas em 2 de novembro de 2026. Os exemplos e figuras são editoriais; nenhum resultado de cliente foi alegado.*
