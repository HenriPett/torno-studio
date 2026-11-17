---
content_id: torno-artigo-pt-20261117-orcamento-usinagem
intent_id: buyer-job-shop-quote-costing-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Orçamento de usinagem no sistema: o que definir e testar antes de automatizar o cálculo da cotação'
h1: 'Orçamento de usinagem no sistema: o que definir e testar antes de automatizar o cálculo da cotação'
seo_title: 'Orçamento de usinagem no sistema: cálculo e aceite | Torno'
seo_description: 'Barra e sobra de corte, setup e ciclo, custo hora-máquina, terceiro, faixa de quantidade, impostos, margem, validade e orçado × realizado: o que testar.'
summary: 'Roteiro para a indústria ou usinagem sob encomenda que vai tirar o orçamento de peças da planilha do orçamentista e deixar o sistema calcular a cotação: de onde vem cada número (desenho e revisão, material e aproveitamento de barra ou chapa, roteiro com setup e tempo de ciclo, custo da hora-máquina, operações terceirizadas, ferramentas); como o setup e os mínimos do terceiro se diluem por quantidade e viram faixas de preço; lote mínimo; tributos sobre a venda como parâmetro do fiscal e margem sobre o preço; arredondamento; validade da proposta amarrada à cotação do material; fotografia dos parâmetros na proposta emitida; revisão de desenho; comparação de orçado × realizado na ordem de produção; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria ou usinagem sob encomenda precisa definir e testar antes de deixar o sistema calcular o orçamento de uma peça usinada, para que o preço por quantidade, a validade da proposta e a comparação com o custo realizado na ordem de produção sejam confiáveis?
proposed_path: /blog/orcamento-usinagem-cotacao-pecas-sistema-aceite/
canonical_url: https://tornostudio.com/blog/orcamento-usinagem-cotacao-pecas-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores de indústrias e de usinagens que fabricam peças sob encomenda (desenho do cliente), orçamentistas, comercial técnico, PCP, engenharia de processos, controladoria e fiscal, e TI, que vão contratar, especificar ou aceitar um sistema (módulo de ERP ajustado ou sistema sob medida) para calcular cotações, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de orçamento pelo cálculo automático da cotação no sistema.
scope: Diferença entre orçamento (custo estimado de uma peça que ainda não existe) e tabela de preços; dados de entrada (desenho, revisão, material, quantidade, prazo); material e aproveitamento de barra ou chapa, sobremetal, largura do corte, ponta descartada, sobra e retalho, preço do material e sua validade; roteiro com setup e tempo de ciclo por operação; composição e divisor do custo da hora-máquina; operações terceirizadas com preço por peça, mínimo e frete; ferramentas e insumos; diluição do setup e dos mínimos e quebra de preço por faixa de quantidade; lote mínimo; entregas parceladas; tributos sobre a venda como parâmetro do fiscal; margem sobre o preço ou sobre o custo; arredondamento; validade da proposta e o Código Civil sobre proposta e aceitação (sem parecer jurídico); fotografia dos parâmetros na proposta emitida; revisão de desenho; conversão da proposta em pedido e ordem de produção; orçado × realizado; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Parecer fiscal, contábil ou jurídico; alíquotas, regime tributário, IPI, ICMS, PIS, COFINS, IBS ou CBS de um caso concreto; definição de margem, preço ou política comercial; custeio contábil de estoques, rateio de custos indiretos e fechamento de custos (só citados como fronteira); tabela de preços de catálogo, descontos por cliente e comissão (cobertos em outros artigos); estimativa de tempo de ciclo por CAM ou por fórmula de corte; cotação instantânea a partir de modelo 3D; estrutura de produto, MRP, programação, OEE e remessa para industrialização (cobertos em outros artigos); recomendação ou comparação de ERP ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-17T21:12:08Z'
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
  - path: https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/
    reason: Trata preço de catálogo, faixa por quantidade, descontos por cliente e orçamento com validade num sistema de vendas; aqui o cálculo do custo de uma peça sob encomenda que ainda não tem preço de tabela.
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura de produto, a perda prevista e o custo padrão de um item que já existe; aqui a estimativa de material e aproveitamento de barra antes de existir estrutura aprovada.
  - path: https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
    reason: Trata roteiro, tempos padrão e setup como restrição da sequência nas máquinas; aqui os mesmos tempos como base de custo e preço.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o indicador de eficiência, ciclo ideal e classificação do setup; aqui o tempo de ciclo e de setup orçados e a diferença para o realizado.
  - path: https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/
    reason: Trata a necessidade de materiais de ordens já firmes; aqui a barra que só será comprada se a proposta for aceita.
  - path: https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
    reason: Trata remessa, retorno, saldo e cobrança de material enviado a terceiros; aqui o preço do serviço do terceiro como parcela do orçamento.
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata como obter o dado da máquina e levá-lo ao ERP; aqui o tempo realizado como entrada da comparação com o orçado.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Trata IBS e CBS na NF-e e o que pedir ao sistema emissor; aqui os tributos sobre a venda como parâmetro do orçamento.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata valores e arredondamento em geral; aqui o arredondamento do material por peça e do preço unitário.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata a emissão de documentos em PDF e o que eles guardam da emissão; aqui a proposta como fotografia dos parâmetros do cálculo.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a liberação de proposta abaixo do lote mínimo ou com margem menor.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode alterar hora-máquina, margem e preço calculado.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a alteração manual de preço precisa registrar.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com peças, materiais, máquinas e propostas fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de orçamento.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a planilha de orçamento em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A documentação do Business Central sobre cálculo de custo padrão diz que custos de capacidade são os associados a mão de obra interna e máquinas e custos de subcontratação são os de serviços de fornecedores externos; que o tempo total de uma operação costuma ter setup, execução e espera e movimentação; que o tempo de execução se aplica a cada unidade e o de setup a cada lote, por isso deve ser rateado pelo tamanho do lote; e que é possível manter o setup no roteiro para planejamento e excluí-lo do custo padrão. No exemplo da página, um centro com 10 minutos de setup, 1 minuto de execução e 2 por minuto contribui 22 com lote 1 e 4 por item com lote 10.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/finance-about-calculating-standard-cost
    entity: 'Microsoft Learn, "About calculating standard cost" (Dynamics 365 Business Central)'
    source_date: '2026-10-02'
    checked_at: '2026-11-17T20:56:00Z'
    limit: 'Documentação de produto sobre custo padrão de item produzido, não sobre orçamento de venda. Exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A documentação do Odoo sobre custos da ordem de produção diz que o custo é calculado a partir da lista de materiais, com o custo dos componentes e de cada operação; que o custo de operar o centro de trabalho por uma hora é cadastrado no centro de trabalho; que o custo por hora e a duração da operação calculam o custo da operação; e distingue o custo estimado do custo real da ordem.'
    reference: https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/basic_setup/mo_costs.html
    entity: 'Odoo, documentação "Manufacturing order costs" (18.0)'
    source_date: null
    checked_at: '2026-11-17T20:55:00Z'
    limit: 'Página sem data; trata custo de ordem de produção, não orçamento de venda. Lida por resumo da ferramenta com trechos literais. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP diz que o lote de custeio especifica a quantidade usada como base do custeio e que, se um lote for informado na criação da estimativa de custo, o lote do cadastro do material é ignorado.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/b8/9c7694c89c11d189990000e8214595/content.htm
    entity: 'SAP Help Portal, "Entries for the Quantity Structure" (árvore de ajuda da versão 4.6C)'
    source_date: null
    checked_at: '2026-11-17T21:01:00Z'
    limit: 'Versão muito antiga do produto, sem data visível; versão inferida pela URL. A página não diz como o setup varia com o lote. Exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual da Senior para formação de preço na indústria (Gestão Empresarial ERP 5.10.3) diz que o custo parte da ficha técnica e dos processos do roteiro; que a taxa de custo de cada processo é o orçamento dos centros de custo dividido pela capacidade produtiva; que componentes como ICMS, PIS, COFINS, comissão e frete podem ser marcados como despesa variável de venda e entram na fórmula do preço; e que a fórmula do preço pode usar lucro líquido ou margem de contribuição, em percentual ou valor.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/custos/gestao-de-preco-para-industria/formacao-de-preco.htm
    entity: 'Senior Sistemas, manual de processos "Formação de Preço para Indústria" (versão 5.10.3)'
    source_date: null
    checked_at: '2026-11-17T21:04:00Z'
    limit: 'Documentação de fornecedor de uma versão que a própria página diz descontinuada em 30/09/2025, sem atualização posterior. Lida por resumo da ferramenta. Exemplo de modelagem.'
  - classification: FATO
    claim: 'O Pronunciamento Técnico CPC 16 (Estoques), aprovado pela Deliberação CVM 575/2009, diz que os custos de transformação incluem mão de obra direta e a alocação sistemática de custos indiretos de produção fixos e variáveis; que a alocação dos custos fixos indiretos às unidades produzidas é baseada na capacidade normal de produção, a produção média que se espera atingir ao longo de vários períodos em circunstâncias normais; e que os custos fixos não alocados são reconhecidos como despesa do período.'
    reference: https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/deliberacoes/anexos/0500/deli575.pdf
    entity: 'Comissão de Valores Mobiliários, Deliberação CVM 575/2009 (CPC 16)'
    source_date: '2009-06-05'
    checked_at: '2026-11-17T20:59:00Z'
    limit: 'Texto original de 2009, sem a revisão R1; norma de mensuração contábil de estoques, não de formação de preço. Citada só para mostrar que a escolha do divisor de horas também existe na contabilidade. Lida por resumo da ferramenta com trechos literais.'
  - classification: FATO
    claim: 'Artigo da comunidade do Sebrae/PR apresenta o índice de markup como 100 dividido por (100 menos a soma, em percentual do preço, de custos variáveis de produção, custos variáveis de vendas, custos fixos e lucro desejado), e o preço como custo vezes esse índice.'
    reference: https://sebraepr.com.br/comunidade/artigo/preco-de-venda-como-calcular
    entity: 'Sebrae/PR, comunidade, "Preço de venda como calcular" (Adriana Queiroz Palmieiri Ferreira, 25/01/2021)'
    source_date: '2021-01-25'
    checked_at: '2026-11-17T21:06:00Z'
    limit: 'Artigo de comunidade, voltado a pequenos negócios; o sinal de subtração está ausente na fórmula escrita da página e é deduzido do exemplo numérico. Citado como convenção de mercado, não como regra.'
  - classification: FATO
    claim: 'O Código Civil (Lei 10.406/2002), arts. 427 a 431, diz que a proposta de contrato obriga o proponente, se o contrário não resultar dos termos dela, da natureza do negócio ou das circunstâncias do caso; que deixa de ser obrigatória, entre outros casos, se, feita a pessoa ausente, a resposta não tiver sido expedida dentro do prazo dado; e que a aceitação fora do prazo, com adições, restrições ou modificações importa nova proposta.'
    reference: https://www.normaslegais.com.br/guia/clientes/formacao-contratos.htm
    entity: 'Código Civil, arts. 427, 428 e 431, reproduzidos pelo portal Normas Legais'
    source_date: null
    checked_at: '2026-11-17T20:58:00Z'
    limit: 'Reprodução de terceiro, sem números de artigo nem data na página (a numeração segue a referência "artigos 427 a 435" da própria página). O Planalto foi recusado pela ferramenta de navegação (PROVENANCE_REQUIRED); as páginas da Câmara e do Senado com o texto da lei foram cortadas antes desses artigos. Não é parecer jurídico.'
  - classification: HIPÓTESE
    claim: 'A Usinagem Exemplo Ltda., a Bombas Exemplo Ltda., a Térmica Modelo Ltda., o eixo EB-45 e suas revisões B e C, a proposta PC-2026-118, a OP 7310, a barra, o peso linear usado, os preços, tempos, taxas, percentuais, faixas, datas e as regras escolhidas no exemplo (rateio da barra inteira, divisor de horas vendáveis, tributos de 12% e margem de 18% sobre o preço, piso de margem de 15%, arredondamento para cima, validade limitada pela cotação do aço, faixa pelo limite inferior, entrega parcelada como lotes separados, realizado pela taxa orçada) são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, tratamento fiscal, política comercial nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, alíquota real, margem recomendada, meta, benchmark, orientação fiscal nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 19 minutos.*

**Antes de deixar o sistema calcular o orçamento de usinagem, escreva e aprove oito regras: como o material é cobrado (barra inteira rateada ou só o comprimento consumido), de onde vêm setup e tempo de ciclo, como a hora-máquina é composta e por quantas horas ela é dividida, como entram terceiro e frete com seus mínimos, em que faixas de quantidade o preço quebra, como tributos e margem viram preço, quanto tempo a proposta vale e o que acontece quando o desenho muda.** Depois, teste com uma peça fictícia em que você já fez a conta à mão, faixa por faixa, e com uma ordem de produção fictícia em que o realizado saiu diferente do orçado. Sem isso, a planilha do orçamentista vira um formulário bonito que calcula outro número, e ninguém sabe qual dos dois está certo.

**Este artigo não é parecer fiscal, contábil ou jurídico, não define margem nem recomenda ERP ou fornecedor.** Quais tributos incidem, com que alíquota e se entram "por dentro" ou "por fora" do preço é decisão do contador; o que o artigo mostra é como o sistema deve receber esse parâmetro. A documentação de alguns fornecedores aparece só para mostrar como os sistemas costumam modelar custo. Empresas, peças e números do exemplo são inventados.

## Orçamento de peça sob encomenda não é tabela de preços

Quem fabrica peças pelo desenho do cliente não tem preço de catálogo. Cada pedido de cotação traz um desenho, uma revisão, um material, uma quantidade e um prazo, e o preço é o resultado de uma estimativa: quanto material vai ser consumido, quanto tempo cada máquina vai ficar parada para preparar e quanto vai ficar cortando, quanto o terceiro cobra pelo tratamento, e o que se soma por cima disso.

Isso é diferente de uma [tabela de preços por cliente com descontos](https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/), em que o produto já existe e o problema é a ordem em que as regras de preço se aplicam. Também é diferente do [custo padrão de um item com estrutura aprovada](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/): no orçamento, a peça ainda não existe, a estrutura e o roteiro são hipóteses do orçamentista, e o cliente pode nunca aprovar.

Na maioria das usinagens e indústrias sob encomenda, esse cálculo mora numa planilha que só uma ou duas pessoas entendem. Ela funciona porque essas pessoas sabem, de cabeça, que a barra de 6 metros tem uma ponta perdida, que o torno 2 demora mais para preparar que o torno 1, que o tratamento térmico tem valor mínimo por remessa e que acima de 500 peças vale fazer o dispositivo. Levar isso para um sistema exige escrever o que a planilha faz e o que a cabeça do orçamentista completa.

### Norma, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Norma.** Não existe norma que diga como orçar uma peça usinada. O que existe são regras ao redor: a lei tributária (do contador), o Código Civil sobre proposta e aceitação (do jurídico) e normas contábeis sobre custo de estoque, que não são regras de preço mas ajudam a nomear as escolhas.
- **Documentação de fornecedores e convenção de mercado.** Custo de material mais custo de capacidade (hora de máquina e de pessoas) mais subcontratação, setup rateado pelo lote, taxa por hora do centro de trabalho, markup sobre o custo: são formas de modelar que aparecem na documentação de Microsoft Business Central, Odoo, SAP e Senior e em material de apoio do Sebrae, citados como exemplo. Nenhuma é regra.
- **Decisão da empresa.** Quanto de sobra de barra o cliente paga, por quantas horas a hora-máquina é dividida, em que quantidades o preço quebra, qual margem, quanto tempo a proposta vale. É essa camada que precisa estar escrita antes de configurar ou programar.

## De onde vem cada número

Um orçamento de usinagem, no sistema ou na planilha, é a soma de poucas parcelas. A conta só é confiável se cada parcela tiver origem conhecida:

| Parcela | Origem | Muda com |
|---|---|---|
| Material | Desenho (dimensão bruta), tabela de peso, preço do fornecedor com data | Revisão do desenho, preço do aço, regra de aproveitamento |
| Setup | Roteiro orçado, por operação e máquina | Máquina escolhida, dispositivo, número de entregas |
| Ciclo | Roteiro orçado, por peça | Máquina, programa, material |
| Hora-máquina | Custos do centro de trabalho divididos por horas | Período, divisor de horas, revisão anual |
| Terceiro | Cotação ou tabela do fornecedor, com mínimo e frete | Quantidade por remessa |
| Ferramentas e insumos | Estimativa por peça ou por lote | Material, tolerância |
| Tributos sobre a venda | Parâmetro cadastrado pelo fiscal | Regime, produto, cliente, UF, legislação |
| Margem | Política comercial | Cliente, quantidade, estratégia |

A Microsoft descreve o custo padrão no Business Central em parcelas parecidas: [material, capacidade (mão de obra interna e máquinas) e subcontratação (serviços de fornecedores externos)](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-about-calculating-standard-cost), mais custos indiretos. O Odoo calcula o custo da ordem a partir da lista de materiais e do [custo por hora do centro de trabalho multiplicado pela duração de cada operação](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/basic_setup/mo_costs.html). As duas páginas tratam de custo de produção de um item cadastrado, não de cotação. Mas mostram que, se o orçamento for montado nas mesmas parcelas que a ordem de produção vai usar depois, a comparação entre orçado e realizado fica possível.

## Material: barra, chapa e o que sobra

Material é a parcela que a planilha costuma acertar e o sistema costuma errar, porque a conta "peso da peça × preço do quilo" ignora o que não vira peça. Defina:

- **Dimensão bruta.** A partir do desenho: comprimento ou área acabada mais sobremetal de faceamento, de acabamento ou de fixação. Quem define o sobremetal é a engenharia de processos, por material e operação.
- **Perda do corte.** A largura da serra, do bedame ou do disco consome material a cada peça. Em chapa, o espaçamento entre peças e a borda.
- **Ponta e borda descartadas.** A ponta de fixação da barra no torno ou no alimentador, a borda da chapa que não serve.
- **Peças por barra ou chapa.** Comprimento útil dividido pelo passo (peça bruta mais corte), sempre para baixo. Em chapa, o encaixe vem de um software de corte ou de uma estimativa; escreva qual.
- **Regra de cobrança.** Duas escolhas comuns:
  - **Barra inteira rateada:** o custo da barra dividido pelas peças que cabem nela. A sobra entra no preço.
  - **Comprimento consumido:** só o passo de cada peça. A sobra fica com a empresa, como retalho de estoque com valor ou como sucata.
  A diferença parece pequena por peça e não é pequena no lote. Escreva qual vale, se depende do tamanho da sobra e o que acontece com o retalho no estoque.
- **Preço e validade do material.** O preço do quilo vem de uma cotação do fornecedor, com data e validade. O orçamento precisa guardar qual cotação usou, porque a validade da proposta depende dela (mais abaixo).
- **Peso.** Por tabela do fornecedor ou por cálculo (área da seção × densidade). Escolha uma origem e use a mesma no orçamento e no recebimento.

Na ordem de produção, essa mesma estimativa vira consumo; a necessidade de compra da barra só nasce quando o pedido é firmado, e o cálculo dela está no artigo sobre [MRP](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/).

## Roteiro orçado: setup e tempo de ciclo

O roteiro do orçamento é uma hipótese: em quais máquinas a peça passa, em que ordem, com quanto de preparação e quanto de corte. Para cada operação, o sistema precisa de:

- **Máquina ou centro de trabalho.** Porque a hora de um torno CNC não é a hora de uma serra, e a escolha da máquina muda setup e ciclo.
- **Tempo de setup.** Preparar a máquina, montar fixação e ferramentas, carregar o programa, fazer e aprovar a primeira peça. Escreva o que está incluído. Se a aprovação da primeira peça pela qualidade fica fora, ela some do orçamento e aparece no realizado.
- **Tempo de ciclo por peça.** De onde vem: tempo de peça parecida já feita, simulação do CAM, estimativa do orçamentista. O sistema precisa guardar a origem, porque um ciclo "copiado de peça parecida" merece outra confiança.
- **Ferramentas e insumos.** Por peça ou por lote, com a origem da estimativa.

Setup e ciclo se comportam de formas diferentes na conta. A documentação do Business Central diz que o tempo de execução [se aplica a cada unidade produzida e o tempo de setup a cada lote, por isso o setup precisa ser rateado pelo tamanho do lote](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-about-calculating-standard-cost); no exemplo da página, uma operação com 10 minutos de setup e 1 minuto de execução, a 2 por minuto, custa 22 por peça num lote de 1 e 4 por peça num lote de 10. O SAP chama de [lote de custeio a quantidade usada como base do custeio](https://help.sap.com/saphelp_46c/helpdata/en/b8/9c7694c89c11d189990000e8214595/content.htm). Num orçamento, o lote não é um número do cadastro: é a quantidade que o cliente pediu, e cada faixa de quantidade precisa da sua conta.

Os mesmos tempos aparecem em outros dois lugares do sistema: na [programação da produção](https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/), como restrição da sequência, e no [OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/), como referência de ciclo e como perda de setup. Se o orçamento usar um ciclo e a programação outro, escreva por quê.

## Custo da hora-máquina: composição e divisor

A hora-máquina é o número mais repetido do orçamento e o menos discutido. Ela é uma divisão, e as duas metades precisam estar escritas:

- **Numerador: o que entra.** Depreciação ou parcela do financiamento, manutenção, energia, área e utilidades, operador (salário e encargos) se ele não for orçado à parte, e uma parcela dos custos indiretos da fábrica. Escreva se o operador está dentro da hora-máquina ou é uma hora de mão de obra separada; somar os dois é um erro comum.
- **Denominador: por quantas horas se divide.** Horas do calendário, horas de turno disponíveis ou horas que a empresa espera vender. Dividir por todas as horas disponíveis barateia a hora e deixa custo fixo sem cobertura quando a máquina fica parada; dividir pelas horas que efetivamente se vendem num mês fraco encarece a hora e pode tirar a empresa da concorrência.

A contabilidade enfrenta a mesma escolha, com outra finalidade. O Pronunciamento CPC 16, sobre estoques, manda alocar os custos fixos indiretos às unidades produzidas [com base na capacidade normal de produção, a produção média que se espera atingir ao longo de vários períodos em circunstâncias normais](https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/deliberacoes/anexos/0500/deli575.pdf), e reconhecer como despesa do período o custo fixo não alocado. É regra de mensuração de estoque, não de preço, mas mostra que "por quantas horas dividir" é uma decisão com nome, e não um detalhe da planilha. A Senior descreve, no manual de formação de preço para indústria, a [taxa de cada processo como o orçamento dos centros de custo dividido pela capacidade produtiva](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/custos/gestao-de-preco-para-industria/formacao-de-preco.htm).

Defina também a vigência: a hora-máquina é revista quando (anual, a cada reajuste de salário, quando a energia muda) e o que acontece com as propostas emitidas antes da revisão. Recomendação da Torno: proposta emitida guarda a hora que usou e não muda; só o orçamento novo usa a hora nova.

## Operações terceirizadas

Tratamento térmico, galvanoplastia, retífica de precisão, pintura: o terceiro entra no orçamento com uma estrutura de preço própria, que costuma ter três partes:

- **Preço por peça, por quilo ou por lote.** Da cotação ou tabela do fornecedor, com data e validade.
- **Mínimo por remessa.** Abaixo de certa quantidade, o terceiro cobra um valor fixo. Para lote pequeno, o mínimo manda no custo.
- **Frete e prazo.** Ida e volta por remessa, e o prazo do terceiro somado ao prazo de entrega da proposta.

O sistema precisa aplicar o mínimo por remessa, não por pedido: se o cliente pede 1.000 peças em quatro entregas, são quatro remessas ao terceiro. O controle físico e fiscal do material enviado ao terceiro (remessa, retorno, saldo, cobrança) é outro assunto, tratado no artigo sobre [remessa para industrialização](https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/); aqui só interessa o preço do serviço como parcela do orçamento.

## Quantidade: setup diluído, faixas e lote mínimo

Como setup, mínimo do terceiro e frete são custos por lote, o custo unitário cai à medida que a quantidade sobe, primeiro rápido, depois devagar, até ficar perto do custo que é realmente por peça. É isso que justifica cotar em faixas. Defina:

- **As faixas.** Quais quantidades a proposta cota (por exemplo, 50, 200 e 1.000) e para qual intervalo cada preço vale.
- **A regra entre faixas.** Pedido de 300 com faixas de 200 e 1.000: vale o preço de 200 (o limite inferior da faixa), um preço interpolado ou um recálculo? O cálculo pelo limite inferior é conservador e fácil de explicar.
- **Lote mínimo.** Abaixo de que quantidade a empresa não cota, cota com preço fixo por lote ou cota só com aprovação.
- **Entregas parceladas.** Se o cliente pede 1.000 e quer receber 250 por mês, o sistema precisa saber se a produção será de uma vez (com estoque guardado) ou em quatro lotes. Em quatro lotes, há quatro setups e quatro remessas ao terceiro, e o preço de 1.000 deixa de ser o preço certo.

A quebra de preço por quantidade num catálogo, aplicada a produtos que já têm preço, está no artigo sobre [tabela de preços](https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/). Aqui a faixa é consequência do custo, calculada a cada orçamento.

## Tributos e margem: do custo ao preço

O custo calculado ainda não é preço. Entre um e outro entram os tributos sobre a venda, eventual comissão e frete de entrega, e a margem. Há duas escolhas que precisam estar escritas:

- **Percentual sobre o preço ou sobre o custo.** Uma margem de 18% sobre o preço não é o mesmo que 18% sobre o custo. A convenção mais divulgada para pequenas empresas é o markup divisor: o Sebrae/PR apresenta o índice como [100 dividido por (100 menos a soma dos percentuais sobre o preço de custos variáveis, custos fixos e lucro)](https://sebraepr.com.br/comunidade/artigo/preco-de-venda-como-calcular), e o preço como custo vezes o índice. No Senior, a fórmula do preço pode usar [lucro líquido ou margem de contribuição, em percentual ou valor](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/custos/gestao-de-preco-para-industria/formacao-de-preco.htm), e ICMS, PIS, COFINS, comissão e frete podem ser marcados como despesa variável de venda. Escreva a fórmula, com um exemplo calculado à mão.
- **Tributos como parâmetro do fiscal.** Quais tributos entram no preço, com qual alíquota, quais são destacados fora dele e como isso muda por regime, produto, cliente e UF é decisão do contador. O sistema recebe esses percentuais como parâmetros com vigência, por regra cadastrada, e não deixa o orçamentista digitar. A reforma tributária do consumo está em transição e muda tributos e documentos; o que pedir ao sistema emissor está no artigo sobre [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/), e o efeito no preço é pergunta para o contador.

Defina também o **arredondamento**: em que etapa (material por peça, custo unitário, preço unitário, total), para que lado e com quantas casas. Um preço unitário arredondado para cima ao centavo, multiplicado por mil peças, muda a margem do total; a regra geral está em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/). E a **alteração manual**: quem pode mudar o preço calculado, até quanto e com que registro na [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/); a [permissão](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) para alterar a hora-máquina ou a margem padrão é outra, e a margem abaixo do piso passa por um [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).

## Validade da proposta e revisão do desenho

Uma proposta enviada ao cliente é mais do que uma simulação. O Código Civil diz que [a proposta de contrato obriga o proponente, se o contrário não resultar dos termos dela, da natureza do negócio ou das circunstâncias do caso](https://www.normaslegais.com.br/guia/clientes/formacao-contratos.htm); que ela deixa de ser obrigatória, entre outros casos, se, feita a pessoa ausente, a resposta não for expedida dentro do prazo dado; e que a aceitação fora do prazo, com adições, restrições ou modificações, importa nova proposta (arts. 427, 428 e 431; texto lido numa reprodução de terceiro). Como isso se aplica a cada caso, inclusive às condições gerais da empresa, é pergunta para o jurídico. Para o sistema, o efeito prático é que **a validade e o conteúdo da proposta precisam ser exatos e imutáveis depois da emissão**. Defina:

- **Validade.** Quantos dias, contados de quando, e se pode passar da validade da cotação do material ou do terceiro. Se o aço foi cotado com validade de 10 dias e a proposta vale 15, nos últimos 5 dias a empresa garante um preço que o fornecedor não garante.
- **Fotografia dos parâmetros.** A proposta emitida guarda o preço do material, a cotação usada, a hora-máquina, o roteiro, os percentuais e a revisão do desenho daquele momento. Revisar a hora-máquina amanhã não pode mudar a proposta de hoje. O documento em PDF guarda o que foi enviado; ver [gerar documentos em PDF](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/).
- **Aceite com mudança.** Cliente que aceita outra quantidade, outro prazo ou outra revisão não aceitou a proposta: o sistema abre uma revisão da proposta, não converte direto em pedido.
- **Revisão do desenho.** O orçamento fica ligado ao desenho e à revisão. Revisão nova muda dimensão bruta, peças por barra, roteiro e às vezes o terceiro; o sistema bloqueia a conversão de uma proposta da revisão B num pedido da revisão C.
- **Conversão em pedido e ordem.** Proposta aceita dentro da validade vira pedido com o preço da proposta, e a ordem de produção nasce com o roteiro e os tempos orçados como referência.

## Orçado × realizado na ordem de produção

O orçamento só melhora se alguém compara com o que aconteceu. Para isso, a ordem de produção precisa registrar as mesmas parcelas do orçamento, na mesma unidade:

- **Material consumido**, pela mesma regra (barra rateada ou comprimento), incluindo as peças refugadas.
- **Setup e ciclo realizados por operação**, apontados pelo operador ou vindos da máquina; como trazer o dado da máquina para o ERP está no artigo sobre [dados de máquina](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/).
- **Refugo**, com a operação em que aconteceu.
- **Terceiro e frete**, pela nota recebida.

E escreva a regra da comparação. A recomendação da Torno é comparar pela **mesma taxa orçada**: a hora-máquina do orçamento vezes o tempo realizado. Assim a diferença mostra tempo e consumo, que o orçamentista pode corrigir; a diferença entre a taxa orçada e o custo real do período é análise da controladoria, com outra frequência. O Odoo, por exemplo, distingue o [custo estimado do custo real da ordem](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/basic_setup/mo_costs.html) e usa no real o custo por hora de cada operador; confira no seu sistema qual taxa entra no realizado.

Com a comparação feita, alguém decide: o ciclo orçado para essa família de peças estava otimista? O setup não incluía a aprovação da primeira peça? Escreva quem ajusta a base de tempos do orçamento e com que evidência.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Sobremetal, perda do corte, ponta descartada e encaixe de chapa | Engenharia de processos |
| Regra de cobrança do material (barra rateada ou consumido) e destino do retalho | Comercial e controladoria, com engenharia |
| Fonte e validade do preço do material e do terceiro | Suprimentos |
| Roteiro orçado, setup e ciclo, e o que o setup inclui | Engenharia de processos e orçamentista |
| Composição, divisor e vigência da hora-máquina | Controladoria, com produção |
| Faixas de quantidade, lote mínimo e regra para entregas parceladas | Comercial e PCP |
| Tributos sobre a venda, alíquotas e o que fica dentro ou fora do preço | Fiscal ou contador |
| Margem, fórmula do preço e piso de margem | Direção e comercial |
| Arredondamento e alteração manual de preço, com alçada | Comercial e controladoria |
| Validade da proposta e condições gerais | Comercial, com o jurídico |
| Revisão de desenho e revisão de proposta | Engenharia e comercial |
| Regra de comparação orçado × realizado e ajuste da base de tempos | Controladoria e engenharia de processos |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Usinagem Exemplo Ltda. recebe da Bombas Exemplo Ltda. o pedido de cotação do eixo EB-45, revisão B: peça torneada de aço SAE 1045, 120 mm de comprimento acabado, a partir de barra redonda de 45 mm, com têmpera e revenimento feitos num terceiro, a Térmica Modelo Ltda. O cliente pede preços para 50, 200 e 1.000 peças. A proposta PC-2026-118 é emitida em terça-feira, 17/11/2026.

Regras e parâmetros da empresa:

- **Material.** Barra de 6.000 mm. Peso linear usado: 12,48 kg/m (área da seção de 45 mm × 7,85 g/cm³, arredondado), ou 74,88 kg por barra. Preço do aço: R$ 9,50/kg, cotação do fornecedor de 16/11/2026, válida até 26/11/2026; barra: 74,88 × R$ 9,50 = R$ 711,36. Ponta descartada: 100 mm. Passo por peça: 120 mm acabados + 3 mm de sobremetal de faceamento + 3 mm de largura do corte da serra = 126 mm. **Regra de cobrança: barra inteira rateada**, com o material por peça arredondado ao centavo.
- **Roteiro orçado.** Operação 10, serra SR-01: setup 15 min, ciclo 1,0 min por peça, hora-máquina R$ 60,00 (R$ 1,00 por minuto). Operação 20, torno CNC TC-02: setup 90 min, incluindo a aprovação da primeira peça, ciclo 6,0 min por peça, hora-máquina R$ 180,00 (R$ 3,00 por minuto). Operação 30, têmpera e revenimento na Térmica Modelo: R$ 3,20 por peça, mínimo de R$ 300,00 por remessa, frete de ida e volta de R$ 120,00 por remessa. Ferramentas e insumos: R$ 1,10 por peça.
- **Hora do torno TC-02.** Custos mensais: depreciação R$ 6.000, manutenção R$ 2.000, energia R$ 2.400, área e utilidades R$ 1.400, operador com encargos R$ 9.000 e rateio de indiretos R$ 8.000, total R$ 28.800. A máquina tem 200 horas disponíveis no mês (um turno); a empresa divide por 160 horas vendáveis (80%): R$ 28.800 ÷ 160 = **R$ 180,00 por hora**. Dividindo pelas 200 horas, seria R$ 144,00; se só 120 horas fossem vendidas, R$ 240,00.
- **Do custo ao preço.** Tributos sobre a venda: 12% do preço, parâmetro fictício informado pelo fiscal só para o exemplo. Margem: 18% do preço; piso de margem de 15% do preço, abaixo do qual o preço só sai com aprovação da direção. Divisor: 1 − 0,12 − 0,18 = 0,70. Preço unitário = custo unitário ÷ 0,70, **arredondado para cima ao centavo**.
- **Quantidade.** Faixas: 50 a 199, 200 a 999 e 1.000 ou mais; pedido entre faixas usa o preço do limite inferior. Lote mínimo: 50 peças; abaixo disso, só com aprovação do comercial. Entregas parceladas com produção separada são orçadas como lotes separados.
- **Validade.** 15 dias corridos, limitada à validade da cotação do material; a proposta guarda todos os parâmetros do cálculo.
- **Realizado.** A OP compara pela hora-máquina orçada e pela mesma regra de material, incluindo o refugo.

**Material por peça.** Comprimento útil: 6.000 − 100 = 5.900 mm. Peças por barra: 5.900 ÷ 126 = 46,8, ou **46 peças** (46 × 126 = 5.796 mm). Sobram 104 mm úteis, além dos 100 mm da ponta. Material por peça: R$ 711,36 ÷ 46 = R$ 15,4643..., arredondado para **R$ 15,46**. Se a regra fosse o comprimento consumido, seriam 0,126 m × 12,48 kg/m = 1,57248 kg × R$ 9,50 = R$ 14,94, ou R$ 0,52 a menos por peça. Dos 6.000 mm da barra, 46 × 120 = 5.520 mm viram peça acabada: 92% do comprimento.

![Ilustração em estilo de desenho técnico de uma barra redonda de aço SAE 1045 de 45 mm e 6.000 mm, da proposta fictícia PC-2026-118, para o eixo EB-45 revisão B. No alto, a barra inteira com cotas: ponta descartada de 100 mm à esquerda, 46 segmentos de 126 mm, totalizando 5.796 mm, e sobra de 104 mm à direita; um dos segmentos está marcado com a letra A. No meio, o detalhe A, fora de escala: 120 mm de peça acabada, 3 mm de sobremetal e 3 mm consumidos pelo corte da serra, passo de 126 mm. Embaixo, duas fichas lado a lado. Barra inteira rateada: 74,88 kg vezes R$ 9,50 igual a R$ 711,36 por barra, dividido por 46 peças, R$ 15,46 por peça. Comprimento consumido: 0,126 m vezes 12,48 kg/m igual a 1,572 kg, vezes R$ 9,50, R$ 14,94 por peça. Entre as fichas e o rodapé, a pergunta: a sobra entra no preço ou fica no estoque? Uma faixa vermelha diz que na revisão C, com 135 mm, o passo vai a 141 mm, cabem 41 peças por barra e o material vai a R$ 17,35 por peça. No rodapé: peça acabada, 5.520 de 6.000 mm, 92%. Exemplo fictício.](./torno-orcamento-barra-cortes.svg)

*Exemplo fictício: empresa, peça, barra, preços e cotas inventados; a mesma barra dá dois preços de material por peça, conforme quem paga a sobra. Ilustração original Torno, 2026.*

**Custo por faixa.** Serra a R$ 1,00 por minuto e torno a R$ 3,00 por minuto:

| Parcela | 50 peças | 200 peças | 1.000 peças |
|---|---|---|---|
| Material (R$ 15,46 por peça) | R$ 773,00 | R$ 3.092,00 | R$ 15.460,00 |
| Serra: 15 min + 1,0 min por peça | R$ 65,00 | R$ 215,00 | R$ 1.015,00 |
| Torno: 90 min + 6,0 min por peça, × R$ 3,00 | R$ 1.170,00 | R$ 3.870,00 | R$ 18.270,00 |
| Térmica: maior entre R$ 3,20 por peça e R$ 300,00, + R$ 120,00 de frete | R$ 420,00 | R$ 760,00 | R$ 3.320,00 |
| Ferramentas e insumos (R$ 1,10 por peça) | R$ 55,00 | R$ 220,00 | R$ 1.100,00 |
| **Custo do lote** | **R$ 2.483,00** | **R$ 8.157,00** | **R$ 39.165,00** |
| Custo unitário | R$ 49,66 | R$ 40,785 | R$ 39,165 |
| Preço unitário (÷ 0,70, para cima ao centavo) | **R$ 70,95** | **R$ 58,27** | **R$ 55,95** |
| Total da faixa | R$ 3.547,50 | R$ 11.654,00 | R$ 55.950,00 |

**Por que o preço cai.** O custo que é realmente por peça é R$ 35,56 (material R$ 15,46, serra R$ 1,00, torno R$ 18,00 e ferramentas R$ 1,10), mais R$ 3,20 da térmica quando a quantidade passa do mínimo, ou R$ 38,76. O resto é custo do lote dividido pela quantidade: setups de R$ 285,00 (R$ 15,00 da serra e R$ 270,00 do torno) mais térmica e frete. Em 50 peças, a térmica fica no mínimo, e o custo do lote é R$ 285,00 + R$ 420,00 = R$ 705,00, ou R$ 14,10 por peça. Em 200, R$ 285,00 + R$ 120,00 de frete = R$ 405,00, ou R$ 2,025 por peça; em 1.000, R$ 0,405 por peça. Conferência: 35,56 + 14,10 = 49,66; 38,76 + 2,025 = 40,785; 38,76 + 0,405 = 39,165.

**Tributos e margem.** Em 200 peças, receita de R$ 11.654,00; tributos de 12%, R$ 1.398,48; custo de R$ 8.157,00; margem de R$ 2.098,52, ou 18,0% da receita (um pouco acima de 18% por causa do arredondamento para cima). Em 50 peças, R$ 3.547,50 − R$ 425,70 − R$ 2.483,00 = R$ 638,80. Em 1.000, R$ 55.950,00 − R$ 6.714,00 − R$ 39.165,00 = R$ 10.071,00, exatamente 18%.

![Gráfico de barras empilhadas com o preço unitário, em reais por peça, do eixo fictício EB-45 revisão B em três faixas de quantidade, com eixo vertical de 0 a 80. Cada barra tem três partes, de baixo para cima: custo por peça, em azul; custo do lote dividido pela quantidade, em laranja; tributos de 12% mais margem de 18%, em verde. 50 peças: 35,56, 14,10 e 21,29, preço R$ 70,95. 200 peças: 38,76, 2,03 e 17,48, preço R$ 58,27. 1.000 peças: 38,76, 0,41 e 16,78, preço R$ 55,95. Abaixo do gráfico, uma tabela repete os mesmos valores, e uma nota diz que em 50 peças a térmica fica no mínimo de R$ 300 mais frete e que de 200 para 1.000 peças o preço cai só R$ 2,32. Exemplo fictício.](./torno-orcamento-preco-quantidade.svg)

*Exemplo fictício: peça, tempos, taxas, tributos e margem inventados; o setup e o mínimo do terceiro pesam muito no lote pequeno e quase nada no grande, e é isso que desenha as faixas de preço. Ilustração original Torno, 2026.*

**Entregas parceladas.** O cliente pergunta pelo preço de 1.000 peças em quatro entregas mensais de 250, produzidas separadamente. Cada lote de 250 custa R$ 10.095,00 (material R$ 3.865,00, serra R$ 265,00, torno R$ 4.770,00, térmica R$ 920,00, ferramentas R$ 275,00); os quatro, R$ 40.380,00, R$ 1.215,00 a mais que o lote único (três setups e três remessas a mais: 3 × R$ 405,00). Ao preço de R$ 55,95, a margem cai para R$ 55.950,00 − R$ 6.714,00 − R$ 40.380,00 = R$ 8.856,00, ou 15,8%. Pela regra, o sistema orça como quatro lotes de 250, não como 1.000.

**Validade.** Emitida em 17/11/2026, 15 dias dariam 02/12/2026; a cotação do aço vale até 26/11/2026, então a proposta vale até **26/11/2026**.

**Revisão C.** Em 20/11, o cliente envia a revisão C, com o eixo de 135 mm, e pede para manter o preço. Passo: 135 + 3 + 3 = 141 mm; peças por barra: 5.900 ÷ 141 = 41,8, ou 41; material por peça: R$ 711,36 ÷ 41 = **R$ 17,35**. A proposta da revisão B não vale para a revisão C; o sistema abre a revisão da proposta.

**Orçado × realizado.** A Bombas Exemplo aceita a faixa de 200 peças em 24/11, dentro da validade, e a OP 7310 é aberta com o roteiro orçado. No apontamento, o setup do torno levou 130 minutos (40 a mais), o ciclo médio foi de 6,5 minutos, e 4 peças foram refugadas no torno, de modo que 204 peças passaram pela serra e pelo torno. Pela taxa orçada:

| Parcela | Orçado | Realizado | Diferença |
|---|---|---|---|
| Material | 200 × R$ 15,46 = R$ 3.092,00 | 204 × R$ 15,46 = R$ 3.153,84 | + R$ 61,84 |
| Serra | 15 + 200 = 215 min, R$ 215,00 | 15 + 204 = 219 min, R$ 219,00 | + R$ 4,00 |
| Torno | 90 + 1.200 = 1.290 min, R$ 3.870,00 | 130 + 1.326 = 1.456 min, R$ 4.368,00 | + R$ 498,00 |
| Térmica e frete | R$ 760,00 | R$ 760,00 | R$ 0,00 |
| Ferramentas e insumos | R$ 220,00 | 204 × R$ 1,10 = R$ 224,40 | + R$ 4,40 |
| **Custo** | **R$ 8.157,00** | **R$ 8.725,24** | **+ R$ 568,24** |
| Margem (receita R$ 11.654,00 − tributos R$ 1.398,48 − custo) | R$ 2.098,52 (18,0%) | R$ 1.530,28 (13,1%) | − R$ 568,24 |

Os R$ 498,00 do torno se explicam assim: R$ 120,00 de setup (40 min × R$ 3,00), R$ 300,00 de ciclo (0,5 min × 200 peças × R$ 3,00) e R$ 78,00 das 4 peças refugadas (4 × 6,5 min × R$ 3,00). As 204 peças cabem em 5 barras (5 × 46 = 230), e as 26 posições de peça que sobram na quinta barra voltam ao estoque como retalho.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com peças, materiais, máquinas e clientes fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Orçamento do EB-45 rev. B com barra de 6.000 mm, ponta de 100 mm e passo de 126 mm | 46 peças por barra; material de R$ 15,46 por peça pela regra de barra rateada | Memória de cálculo do orçamento |
| Mesmo orçamento com a regra de comprimento consumido (cenário à parte) | R$ 14,94 por peça | Memória de cálculo |
| Hora do torno TC-02 com R$ 28.800 e 160 horas vendáveis | R$ 180,00 por hora; o cadastro mostra numerador, divisor e vigência | Cadastro do centro de trabalho |
| Faixa de 50 peças | Térmica no mínimo (R$ 300,00 + R$ 120,00); custo R$ 2.483,00; preço R$ 70,95; total R$ 3.547,50 | Proposta e memória de cálculo |
| Faixa de 200 peças | Custo R$ 8.157,00; preço R$ 58,27; total R$ 11.654,00 | Proposta e memória de cálculo |
| Faixa de 1.000 peças | Custo R$ 39.165,00; preço R$ 55,95; total R$ 55.950,00 | Proposta e memória de cálculo |
| Preço unitário de 200 peças: R$ 58,2642... | Arredondado para cima: R$ 58,27; margem do total R$ 2.098,52 | Memória de cálculo |
| Pedido de 300 peças | Preço da faixa de 200: R$ 58,27; total R$ 17.481,00 | Simulação de pedido |
| Pedido de 30 peças | Bloqueado abaixo do lote mínimo; só segue com aprovação do comercial, registrada | Tentativa recusada e aprovação |
| 1.000 peças em 4 entregas de 250 produzidas separadamente | Custo de 4 lotes: R$ 40.380,00; margem de 15,8% ao preço de R$ 55,95 | Memória de cálculo |
| Orçamentista tenta digitar a alíquota de tributos | Campo fechado; usa o parâmetro vigente cadastrado pelo fiscal | Tentativa recusada |
| Alteração manual do preço de 200 peças para R$ 52,00 | Exige motivo; margem resultante de R$ 995,00 (9,6%), abaixo do piso de 15%, vai para aprovação da direção; alteração registrada | Fluxo de aprovação e trilha |
| Proposta emitida em 17/11 com validade de 15 dias e aço válido até 26/11 | Validade de 26/11/2026 | Proposta emitida |
| Hora do torno revista para R$ 195,00 em 25/11 | A PC-2026-118 continua com R$ 58,27; só orçamento novo usa a hora nova | Proposta e histórico do cadastro |
| Aceite da faixa de 200 em 27/11 | Não converte em pedido sem revisão da proposta ou aprovação | Tentativa recusada |
| Aceite com outra quantidade ou outra revisão do desenho | Abre revisão da proposta; não converte direto | Histórico da proposta |
| Revisão C com 135 mm | 41 peças por barra; material de R$ 17,35 por peça; conversão da proposta da rev. B em pedido da rev. C bloqueada | Memória de cálculo e tentativa recusada |
| Aceite da faixa de 200 em 24/11 | Pedido com R$ 58,27; OP 7310 nasce com roteiro e tempos orçados como referência | Pedido e OP |
| Fechamento da OP 7310 com setup de 130 min, ciclo de 6,5 min e 4 refugos | Custo realizado R$ 8.725,24 pela taxa orçada; diferença + R$ 568,24, aberta por parcela e operação | Relatório de orçado × realizado |
| Margem da OP 7310 | Orçada R$ 2.098,52 (18,0%); realizada R$ 1.530,28 (13,1%) | Relatório de orçado × realizado |

*Fim do exemplo fictício. Empresas, peça, desenho, proposta, ordem, barra, peso, preços, tempos, taxas, tributos, margem, faixas, datas e regras são modelo editorial, sem medição real, cliente ou sistema entregue; o percentual de tributos não é alíquota real, e as definições do exemplo são escolhas da empresa fictícia, não norma, orientação fiscal, política comercial recomendada nem comportamento padrão de ferramenta.*

Antes do go-live, recalcule no sistema dez ou vinte orçamentos já feitos na planilha, de peças diferentes (barra, chapa, com e sem terceiro, lote pequeno e grande), e explique cada centavo de diferença. Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### O sistema consegue calcular o tempo de ciclo sozinho a partir do desenho?

Algumas ferramentas estimam tempo a partir do modelo 3D ou do programa CAM, e isso pode ajudar. Mas o orçamento continua precisando registrar de onde veio o ciclo e quem o aprovou, porque é esse número que vai ser comparado com o realizado. Este artigo não trata de estimativa automática de ciclo.

### A hora-máquina deve incluir o operador?

Depende de como a empresa organiza a conta; as duas formas existem. O que não pode é o operador entrar duas vezes, dentro da hora-máquina e como hora de mão de obra separada. Escreva qual é a regra e confira no cadastro de cada centro de trabalho.

### Por que a margem realizada saiu menor se o preço foi o orçado?

Porque o preço fica fixo depois do aceite e o custo não. No exemplo, 40 minutos a mais de setup, meio minuto a mais de ciclo e 4 refugos tiraram R$ 568,24 da margem. A comparação por parcela mostra onde ajustar a base de tempos do próximo orçamento.

Para transformar a planilha de orçamento em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) um orçamento recente de peça sob encomenda com a memória de cálculo, a hora-máquina usada e o realizado da ordem correspondente, sem dados confidenciais de clientes.

*Fontes consultadas em 17 de novembro de 2026: Microsoft Learn, cálculo de custo padrão (Dynamics 365 Business Central, atualizado em 02/10/2026); Odoo, custos da ordem de produção (18.0); SAP Help Portal, estrutura de quantidades e lote de custeio (4.6C); Senior Sistemas, formação de preço para indústria (5.10.3); Comissão de Valores Mobiliários, Deliberação CVM 575/2009 (CPC 16, Estoques); Sebrae/PR, comunidade, preço de venda (2021); Código Civil, arts. 427, 428 e 431, em reprodução do portal Normas Legais. Este artigo não é parecer fiscal, contábil ou jurídico e não recomenda sistema nem fornecedor; empresas, peças, números e ilustrações são fictícios.*
