---
content_id: torno-artigo-pt-20261120-apontamento-producao
intent_id: buyer-shop-floor-production-reporting-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Apontamento de produção no sistema: o que definir e testar antes de automatizar o registro do chão de fábrica'
h1: 'Apontamento de produção no sistema: o que definir e testar antes de automatizar o registro do chão de fábrica'
seo_title: 'Apontamento de produção no sistema: regras e aceite | Torno'
seo_description: 'Apontamento de produção no sistema: horas, peças boas, refugo e retrabalho com motivo, parcial, paradas, backflush, estorno, off-line e critérios de aceite.'
summary: 'Roteiro para a indústria que vai tirar o apontamento de produção do papel ou da planilha e levá-lo para um sistema (ERP, MES ou sistema sob medida): o que um apontamento precisa registrar; início e fim de operação e as horas de máquina e de mão de obra na ordem; vários operadores numa operação e um operador em várias ordens ao mesmo tempo; quantidade boa, refugo e retrabalho com motivo; apontamento parcial e encerramento da operação e da ordem com tolerância; operação fora de sequência; paradas; baixa de material por consumo real ou por baixa automática pela estrutura (backflush); estorno e correção depois do fechamento; apontamento sem conexão; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema o apontamento de produção, para que horas, quantidades, refugo, retrabalho, paradas, consumo de material e estornos registrados no chão de fábrica fechem com a ordem de produção e cada regra tenha dono?
proposed_path: /blog/apontamento-producao-chao-fabrica-sistema-aceite/
canonical_url: https://tornostudio.com/blog/apontamento-producao-chao-fabrica-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores e gerentes industriais, PCP, supervisores de produção, qualidade, almoxarifado, custos e TI de indústrias pequenas e médias que vão contratar, especificar, ajustar ou aceitar um sistema de apontamento de produção (módulo de ERP, MES, aplicativo de chão de fábrica ou sistema sob medida), e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a ficha de produção em papel, a planilha do turno ou a digitação posterior no ERP por apontamento direto no posto de trabalho.
scope: Conteúdo mínimo de um apontamento; início e fim de operação; horas de máquina e de mão de obra na ordem, setup e execução; vários operadores numa operação e um operador atendendo várias ordens; conferência com a presença do operador; quantidade boa, refugo e retrabalho com motivo; apontamento parcial; encerramento da operação e da ordem com tolerância de quantidade; operação fora de sequência e quantidade acima da operação anterior; paradas durante a ordem e parada sem motivo; baixa de material por apontamento do consumo real ou por baixa automática pela estrutura (backflush), base de cálculo da baixa e refugo; estorno e correção de apontamento depois do encerramento da ordem e depois do fechamento do mês; apontamento sem conexão e repetição na sincronização; quem decide cada regra; critérios de aceite com dados fictícios; posição do apontamento entre ERP e MES pelo que a página pública da ISA-95 mostra.
not_scope: Recomendação ou comparação de ERP, MES, coletor, tablet, sensor ou fornecedor (a documentação de fornecedores de software aparece só como exemplo de modelagem); cálculo do OEE e seus indicadores; coleta automática por sinal de máquina e protocolos industriais; apuração do custo, rateio e variações; programação e sequenciamento (o plano, não o realizado); definição da estrutura de produto e da perda prevista; rastreio de lote e validade; obrigações fiscais da escrituração da produção e do estoque (Bloco K da EFD ICMS/IPI), mencionadas só como fronteira; controle de ponto, jornada e remuneração por produção; desenho genérico de operação sem internet, de edição simultânea e de trilha de auditoria (cobertos em outros artigos); interpretação do texto integral da ISA-95/IEC 62264, que não foi lido.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-20T11:28:50Z'
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
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o cálculo do OEE, o tempo planejado, a classificação das paradas e a origem do dado; aqui o apontamento como registro de origem, sem calcular o indicador.
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata a coleta de dados por sinal de máquina e a integração com o ERP; aqui o apontamento feito por pessoas e as regras que valem qualquer que seja a origem.
  - path: https://tornostudio.com/blog/custo-producao-padrao-real-rateio-sistema-aceite/
    reason: Trata a apuração do custo, o rateio, as variações e o fechamento do mês; aqui as horas e o consumo apontados que alimentam o custo e o estorno depois do fechamento.
  - path: https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
    reason: Trata o plano, a sequência e a capacidade; aqui o registro do que de fato aconteceu, que realimenta o plano.
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura, a perda prevista e a escolha entre baixa por apontamento ou backflush por item; aqui o momento e a base de quantidade da baixa disparada pelo apontamento.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata o lote e a validade no estoque; aqui só o lote do material consumido informado no apontamento.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Trata o desenho geral de operação sem internet e sincronização; aqui o apontamento feito sem conexão no posto e o horário que vale.
  - path: https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/
    reason: Trata conflitos de edição em geral; aqui duas pessoas corrigindo o mesmo apontamento.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que o estorno e a correção de apontamento precisam guardar.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento recebido em dobro; aqui o apontamento reenviado na sincronização.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Trata leitura de etiquetas e códigos; aqui a identificação da ordem e do operador no posto.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode estornar, corrigir e encerrar.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas e fusos; aqui a ordem que atravessa a virada do turno e do dia.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata o registro e a disposição da não conformidade; aqui só o refugo apontado com motivo que pode abrir uma RNC.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata a contagem do estoque; aqui o saldo errado que a baixa automática mal configurada produz.
  - path: https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/
    reason: Trata o plano e as ordens de manutenção; aqui a parada apontada na ordem de produção que pode virar chamado.
  - path: https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
    reason: Trata a operação feita por terceiro; aqui o apontamento que não acontece no chão de fábrica próprio.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Trata números que diferem entre painel e sistema de origem; aqui o painel de produção que não bate com os apontamentos.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com ordens, operadores e apontamentos fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da ficha de produção.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar o apontamento de produção em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A página da ISA sobre a ISA-95 ("Enterprise-Control System Integration") diz que a ISA-95, também conhecida como ANSI/ISA-95 ou IEC 62264, é um conjunto internacional de normas; que o nível 3 é a gestão de operações de manufatura (como MES e SCADA) e o nível 4 é o planejamento e a logística do negócio (inclusive ERP); e que a norma trata principalmente da interface entre os níveis 3 e 4. A página lista oito partes, com edições de 2013 a 2025.'
    reference: https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
    entity: 'ISA (International Society of Automation), página "ISA-95 Standard: Enterprise-Control System Integration"'
    source_date: null
    checked_at: '2026-11-20T11:41:12Z'
    limit: 'Página institucional, sem data visível; o texto das partes da norma, pago, não foi lido, e a página não detalha quais dados de produção realizada são trocados. Não é interpretação da norma. A página proíbe inserir propriedade intelectual da ISA em ferramentas de IA e criar derivados dela com IA sem permissão escrita; por isso o artigo usa só fatos institucionais mínimos (nome, designações, níveis 3 e 4 e foco na interface), parafraseados, sem citar nem resumir o conteúdo da norma.'
  - classification: FATO
    claim: 'O material de treinamento da SAP sobre controle de chão de fábrica no S/4HANA diz que, numa ordem de produção, a confirmação é feita ou no cabeçalho da ordem ou por operação, não as duas; que a ordem fica parcialmente confirmada quando ao menos uma, mas não todas as operações foram confirmadas; que a quantidade boa (yield) pode seguir para o próximo centro de trabalho, o refugo foi descartado e o retrabalho não pode seguir até ser reparado; que o setup em geral é executado uma vez por operação e não depende da quantidade, enquanto tempo de máquina e de mão de obra normalmente dependem; que os tempos são propostos a partir do roteiro e podem ser alterados; que datas reais de início e fim apoiam a reprogramação; que confirmações feitas por engano podem ser canceladas; e que, quando há MES, os dados de confirmação registrados nele são transferidos automaticamente por interface ao ERP.'
    reference: https://learning.sap.com/courses/exploring-business-processes-in-sap-s4-hana-discrete-shopfloor-control/confirming-production-orders_d5811bf4-fb07-411d-8bdb-0f9cec11e4db
    entity: 'SAP Learning, curso "Exploring Business Processes in SAP S/4HANA Discrete Shopfloor Control", lição "Confirming Production Orders"'
    source_date: null
    checked_at: '2026-11-20T11:39:48Z'
    limit: 'Documentação de fornecedor, sem data visível; a lição não descreve o que o cancelamento reverte. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'O material de treinamento da SAP para o S/4HANA Cloud Public Edition diz que, se componentes estão marcados para baixa automática (backflush), a confirmação dispara a saída desses componentes; que a confirmação também dispara a entrada automática do produto, na quantidade boa; que a confirmação é parcial quando boa + retrabalho + refugo é menor que a quantidade a confirmar; e que, com operações marco (milestone), é preciso confirmar a operação 30 antes de confirmar a 60.'
    reference: https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition-manufacturing/posting-confirmations-for-production-orders-1
    entity: 'SAP Learning, curso "Implementing SAP S/4HANA Cloud Public Edition Manufacturing", lição "Posting Confirmations for Production Orders"'
    source_date: null
    checked_at: '2026-11-20T11:39:36Z'
    limit: 'Documentação de fornecedor, sem data visível, de uma edição específica do produto. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O material de configuração da SAP para confirmações de ordens de produção descreve uma chave que define se o sistema emite mensagem quando a sequência de operações não é respeitada, chaves que definem a reação quando a quantidade boa mais o retrabalho fica abaixo da tolerância de falta ou quando a tolerância de excesso é ultrapassada, e um indicador que define se a confirmação é interrompida quando há movimento de material com erro.'
    reference: https://learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-confirmations-for-production-orders
    entity: 'SAP Learning, curso "Configuring SAP S/4HANA Cloud Public Edition Manufacturing Execution", lição "Configuring Confirmations for Production Orders"'
    source_date: null
    checked_at: '2026-11-20T11:39:37Z'
    limit: 'Documentação de fornecedor, sem data visível; descreve parâmetros, não valores recomendados.'
  - classification: FATO
    claim: 'A ajuda da SAP (ERP 6.0) diz que o retrabalho pode ser confirmado por operação ou no cabeçalho da ordem; que a quantidade de retrabalho é a que precisa de processamento adicional antes de ser contada como boa; e que, na variação de quantidade boa esperada, o retrabalho confirmado é contado como boa.'
    reference: https://help.sap.com/saphelp_erp60_sp/helpdata/en/09/05b753128eb44ce10000000a174cb4/content.htm
    entity: 'SAP Help Portal, SAP ERP 6.0, confirmação de quantidades e operações de retrabalho'
    source_date: null
    checked_at: '2026-11-20T11:39:46Z'
    limit: 'Documentação antiga de fornecedor (versão indicada pelo endereço), sem data visível. Citada só para mostrar que retrabalho é uma quantidade própria, com regra de contagem.'
  - classification: FATO
    claim: 'A ajuda do Microsoft Dynamics 365 Business Central diz que o diário de produção registra num só lugar componentes usados, quantidades produzidas, refugo e tempo de operação de uma ordem liberada, e ao lançar atualiza estoque, capacidade, custos e progresso; que só a quantidade de saída da última linha do tipo saída ajusta o estoque, por isso não se deve lançar a quantidade esperada pré-preenchida antes de produzir tudo; que o campo Concluído marca a operação como terminada; e que só uma pessoa pode usar a página do diário de produção por vez.'
    reference: https://learn.microsoft.com/en-au/dynamics365/business-central/production-how-to-register-consumption-and-output
    entity: 'Microsoft Learn, Dynamics 365 Business Central, "Register consumption and output for a released production order" (atualizada em 17/07/2026)'
    source_date: '2026-07-17'
    checked_at: '2026-11-20T11:39:54Z'
    limit: 'Documentação de fornecedor. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'A ajuda do Business Central descreve os métodos de baixa de componentes: Manual; Forward, que lança o consumo pelas linhas de componente ao liberar a ordem (ou por operação, quando ela começa, com códigos de vínculo ao roteiro, com base na quantidade esperada); Backward, que calcula e lança o consumo ao terminar a ordem (ou quando cada operação termina, proporcional à saída real da operação); e variantes Pick + Forward, Pick + Backward e Pick + Manual. A página dá o exemplo de uma ordem de 800 metros que exige 8 kg de componente, em que lançar 200 metros de saída baixa 2 kg, e diz que a desvantagem da baixa automática é poder não registrar com exatidão, ou nem perceber, o refugo.'
    reference: https://learn.microsoft.com/en-gb/dynamics365/business-central/production-how-to-flush-components-according-to-operation-output
    entity: 'Microsoft Learn, Dynamics 365 Business Central, "Flush components according to operation output" (atualizada em 06/11/2025)'
    source_date: '2025-11-06'
    checked_at: '2026-11-20T11:39:59Z'
    limit: 'Documentação de fornecedor. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'A ajuda do Business Central diz que a ação de reverter transação da ordem de produção cria lançamentos com o sinal oposto em quantidade, quantidade de refugo, tempo de setup e tempo de execução, aplicados ao lançamento original, usa a data de lançamento original e remove o status Concluído da operação; que o consumo é revertido com a quantidade de sinal oposto, aplicada ao lançamento original; e que a ação não é suportada, entre outros casos, quando a saída já foi aplicada a uma saída de estoque.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-reverse-output-posting
    entity: 'Microsoft Learn, Dynamics 365 Business Central, "Reverse Output Posting" (atualizada em 17/07/2026)'
    source_date: '2026-07-17'
    checked_at: '2026-11-20T11:39:59Z'
    limit: 'Documentação de fornecedor. Citada como exemplo de modelagem; não define a regra de período contábil de nenhuma empresa.'
  - classification: FATO
    claim: 'A documentação da Senior para o apontamento por estágio (Gestão Empresarial ERP 7.0.0, Senior X) diz que a rotina registra produção, consumo e eventos; que o motivo de defeito é obrigatório quando a quantidade de refugo é maior que zero; que a sequência define a ordem de apontamento dos estágios e que, com a opção Controla início do estágio no roteiro, só se aponta à medida que os estágios anteriores são finalizados; que é possível apontar com múltiplos operadores simultaneamente no mesmo estágio, com registros independentes; que o estágio fica na situação Parado enquanto há apontamento de parada ativo e, com vários operadores, só quando todos apontaram parada; que, ao apontar a quantidade produzida, o sistema faz automaticamente as baixas de consumo configuradas como automáticas na engenharia; e que apenas o último apontamento de tempo, quantidade ou parada pode ser editado ou excluído.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm
    entity: 'Senior Sistemas, Portal de Documentação, Gestão Empresarial ERP 7.0.0, "Apontamento por estágio"'
    source_date: null
    checked_at: '2026-11-20T11:41:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'A documentação da Senior para a tela de acerto de apontamentos de ordens de produção (Gestão Empresarial ERP 5.10.4) diz que ela permite acertos nas ordens movimentadas por estágio, operação e operador, com alteração de quantidades (inclusive a de refugo), operador, datas e horas; que componentes não utilizados podem ser estornados automaticamente, nas proporções da composição da engenharia de produto, quando o cadastro de origem está configurado para isso, e que subprodutos também podem ser estornados; que, em ordem finalizada, o último estágio volta para andamento quando se escolhe estornar o estoque, e que a reserva dos componentes não é restaurada quando a quantidade realizada é reduzida; e que a alteração é conferida contra as quantidades das operações anterior e posterior.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/5.10.4/menu_manufatura/f909aop.htm
    entity: 'Senior Sistemas, Portal de Documentação, Gestão Empresarial ERP 5.10.4, tela F909AOP'
    source_date: null
    checked_at: '2026-11-20T11:40:35Z'
    limit: 'Documentação de fornecedor, de versão anterior à 7.0.0, sem data visível; a página não trata de período contábil fechado. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo 18.0 (Shop Floor) diz que a duração da ordem de trabalho soma o tempo de todos os operadores que trabalharam nela, mostrada como duração real, e que o temporizador individual reflete só a sessão atual; a aba de controle de tempo lista os operadores que trabalharam na ordem.'
    reference: https://www.odoo.com/documentation/18.0/de/applications/inventory_and_mrp/manufacturing/shop_floor/shop_floor_tracking.html
    entity: 'Odoo, documentação 18.0 (versão indicada pelo endereço; página em alemão), "Shop Floor time tracking"'
    source_date: null
    checked_at: '2026-11-20T11:41:09Z'
    limit: 'Documentação de fornecedor, lida na versão em alemão (a versão em inglês não abriu); sem data visível. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo sobre lista de materiais descreve o campo Flexible Consumption: Blocked quando os operadores precisam seguir estritamente a quantidade da estrutura; caso contrário, Allowed ou Allowed with Warning.'
    reference: https://www.odoo.com/documentation/latest/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html
    entity: 'Odoo, documentação (versão latest), "Bill of materials"'
    source_date: null
    checked_at: '2026-11-20T11:41:10Z'
    limit: 'Documentação de fornecedor; a página não distingue Allowed de Allowed with Warning. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual de leiaute do SPED Fiscal da Senior descreve o registro K230 (itens produzidos), com o documento de produção de todo produto acabado ou em processo no período, e o K235 (insumos consumidos) vinculados ao produto resultante, e indica, para cada campo, a tabela do sistema de onde vem o dado (a quantidade produzida do K230 e a data e a quantidade do consumo do K235 vêm de tabelas do próprio sistema); nas observações do K230 cita a data do apontamento do produto produzido.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/menu_controladoria/sped/fiscal-icms-ipi/bloco-k.htm
    entity: 'Senior Sistemas, Portal de Documentação, Gestão Empresarial ERP 5.10.3, "Leiaute - SPED Fiscal (EFD ICMS/IPI)", Bloco K'
    source_date: null
    checked_at: '2026-11-20T11:40:41Z'
    limit: 'Manual de fornecedor de versão descontinuada em 30/09/2025, segundo a própria página, e não o Guia Prático oficial da EFD ICMS/IPI, que não foi lido. Citado só para mostrar que o apontamento alimenta uma obrigação fiscal; quem está obrigado e como escriturar é decisão do contador e fica fora do escopo.'
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., a OP 8301 de 200 eixos EX-40, a OP 8305, o roteiro, os postos TC-02, TC-03 e FR-01, os operadores 104, 117 e 121, os horários, os tempos, as quantidades, os motivos, a tolerância de 5%, a regra de divisão das horas de mão de obra, o consumo de 1,250 kg de barra por eixo, o consumo real de 258,00 kg, o lote da corrida, a janela sem conexão, o estorno de 06/11 e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; contas refeitas em Python (Decimal) em 20/11/2026.
    entity: Torno
    limit: Não representam cliente, fábrica, ordem, sistema entregue ou apontamento real, nem regras, tolerâncias ou divisões de horas recomendadas.
---

*Leitura estimada: 22 minutos.*

**Antes de automatizar o apontamento de produção, escreva e aprove nove regras: o que cada apontamento registra e quem o faz; como as horas de máquina e de mão de obra entram na ordem quando há dois operadores numa operação ou um operador em duas ordens; como se apontam peça boa, refugo e retrabalho, e com qual motivo; quando um apontamento parcial vale e quando a operação e a ordem podem ser encerradas; o que fazer com uma operação apontada fora de sequência; como as paradas entram; quando e por qual quantidade o material é baixado; quem estorna e corrige um apontamento, até quando; e o que acontece com o apontamento feito sem conexão.** Depois, teste com uma ordem fictícia cujo balanço você já fechou à mão: peças que entraram, boas, refugadas e retrabalhadas em cada operação, horas por pessoa e por máquina, e quilos de material. Sem isso, o sistema mostra uma ordem "encerrada", mas o estoque de barra não bate, o operador tem mais horas apontadas do que esteve na fábrica e ninguém sabe dizer onde foram parar as onze peças que faltam.

**Este artigo não recomenda ERP, MES, coletor nem fornecedor, e não calcula OEE nem custo.** A documentação de fornecedores de software (SAP, Microsoft Dynamics 365 Business Central, Senior e Odoo) aparece só como exemplo de como sistemas costumam modelar o apontamento. A ISA-95 aparece pelo que a página pública da ISA mostra. Empresa, ordens, pessoas e números do exemplo são inventados.

## O que a ficha de produção faz e o sistema precisa fazer melhor

Em muitas indústrias pequenas e médias, o apontamento é uma ficha de papel presa à ordem de produção: o operador escreve a hora de início e de fim, quantas peças fez e quantas perdeu, e a ficha vai para o PCP no fim do turno ou no dia seguinte. Alguém digita no ERP, ou numa planilha, o que conseguiu ler. Às vezes o apontamento é só a entrada do produto acabado no estoque, quando a ordem termina.

Funciona enquanto o objetivo é saber, no fim do mês, quanto foi produzido. Deixa de funcionar quando a empresa quer saber, durante o turno, onde a ordem está; quando o custo precisa das horas reais; quando o estoque de matéria-prima tem de bater sem inventário semanal; e quando a qualidade precisa saber quantas peças foram refugadas, em qual operação e por quê. O papel não impede que se apontem 130 peças fresadas quando só 120 foram torneadas, nem que o mesmo operador apareça trabalhando oito horas em duas máquinas ao mesmo tempo. O sistema pode impedir, mas só se a regra estiver escrita.

### Documentação de fornecedor, decisão da empresa e recomendação

Ajuda separar três camadas:

- **Documentação de fornecedores de software.** "Confirmação" no SAP, "diário de produção" no Business Central, "apontamento por estágio" na Senior, "ordem de trabalho" no Odoo: cada sistema dá um nome e um formato ao apontamento. As ajudas desses produtos são citadas como exemplos do que costuma ser configurável. Não são regra.
- **Decisão da empresa.** O que se aponta, em que nível, quem aponta, o que bloqueia, como se dividem as horas, quando o material é baixado, quem estorna. É essa camada que precisa estar escrita antes de configurar ou programar.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é uma sugestão de modelagem, não requisito de norma nem comportamento padrão de ferramenta.

Não encontrei norma que prescreva como uma empresa deve apontar a produção, e este artigo não se apoia em uma. Há obrigações que usam o resultado (a escrituração da produção e do consumo no Bloco K da EFD ICMS/IPI, por exemplo), e elas ficam com o contador; volto a isso na seção de fronteiras.

## Onde o apontamento mora: ERP, MES e as fronteiras deste artigo

O modelo ISA-95, também conhecido como IEC 62264, separa a [gestão de operações de manufatura, nível 3, onde ficam sistemas como o MES, do planejamento e da logística do negócio, nível 4, onde fica o ERP](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard), e trata principalmente da interface entre os dois. Não li o texto das partes da norma, que é pago. Para a especificação, a consequência prática é uma pergunta: **qual sistema recebe o apontamento e qual é a fonte oficial de cada número?** Pode ser um MES no chão de fábrica que manda totais ao ERP, um aplicativo que grava direto no ERP, ou um sistema sob medida. O material da SAP, por exemplo, diz que, quando há MES, os dados de confirmação registrados nele são [transferidos por interface ao ERP](https://learning.sap.com/courses/exploring-business-processes-in-sap-s4-hana-discrete-shopfloor-control/confirming-production-orders_d5811bf4-fb07-411d-8bdb-0f9cec11e4db). As regras deste artigo valem em qualquer arranjo; o que muda é onde cada uma é testada.

O apontamento é a origem de vários assuntos que têm artigo próprio aqui no blog, e este texto não os repete:

- **OEE.** O apontamento fornece paradas, tempos e peças; o [cálculo do OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/), o tempo planejado e a classificação das paradas estão lá.
- **Sinal de máquina.** Contador de ciclos e estado da máquina lidos automaticamente estão em [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/). Aqui o foco é o que as pessoas apontam e as regras que valem para qualquer origem.
- **Custo.** As horas e o consumo apontados alimentam a [apuração do custo de produção](https://tornostudio.com/blog/custo-producao-padrao-real-rateio-sistema-aceite/), com rateio, variações e fechamento do mês.
- **Programação.** O plano, a sequência e a capacidade estão em [programação da produção](https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/). O apontamento registra o realizado, que realimenta o plano.
- **Estrutura de produto.** A estrutura, a perda prevista e a escolha de baixa por item estão em [estrutura de produto no sistema](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/). Aqui interessa o momento e a quantidade da baixa que o apontamento dispara.
- **Bloco K.** Um manual de leiaute da Senior mostra os registros de [itens produzidos (K230) e insumos consumidos (K235), com os campos preenchidos a partir de tabelas do próprio sistema](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/menu_controladoria/sped/fiscal-icms-ipi/bloco-k.htm). Quem está obrigado e como escriturar é decisão do contador; não li o Guia Prático oficial e não trato disso aqui. Basta saber que um apontamento errado pode virar informação fiscal errada.

## O que cada apontamento precisa registrar

Antes de discutir regras, vale escrever o registro mínimo. Recomendação da Torno: todo apontamento guarda, no mínimo:

- **Ordem e operação.** Qual ordem de produção e qual operação do roteiro. Apontar "na ordem" sem dizer a operação impede saber onde a peça está.
- **Posto e recurso.** Máquina, centro de trabalho ou bancada.
- **Quem.** Operador identificado, por crachá, matrícula ou leitura de código; a identificação no posto segue os cuidados de [leitor de código de barras](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/).
- **Tipo.** Início, fim, quantidade, parada, consumo, retrabalho.
- **Quando aconteceu e quando foi registrado.** São dois horários diferentes. O primeiro é o do fato; o segundo, o da gravação no servidor. Sem os dois, o apontamento feito sem conexão e o lançamento retroativo ficam indistinguíveis.
- **Quantidades.** Boa, refugo e retrabalho, na unidade da operação.
- **Motivo.** Obrigatório para refugo, retrabalho e parada.
- **Origem.** Terminal, coletor, digitação posterior, integração com máquina.
- **Identificador único.** Gerado na origem, para que o mesmo apontamento reenviado não conte duas vezes.

Cada sistema organiza isso de um jeito, mas a comparação é útil: se a tela de apontamento que você está avaliando não tem lugar para algum desses dados, pergunte onde ele fica.

## Início, fim e horas na ordem de produção

O apontamento de horas na ordem de produção parece simples: hora de início, hora de fim, diferença. Fica difícil em quatro situações.

### Setup e execução são horas diferentes

O material da SAP explica que o [setup em geral é executado uma vez por operação e não depende da quantidade](https://learning.sap.com/courses/exploring-business-processes-in-sap-s4-hana-discrete-shopfloor-control/confirming-production-orders_d5811bf4-fb07-411d-8bdb-0f9cec11e4db), enquanto os tempos de máquina e de mão de obra normalmente dependem; os tempos são propostos a partir do roteiro e podem ser alterados. Para o apontamento, a consequência é separar o início do setup do início da produção. Misturar os dois esconde quanto tempo a troca de ferramenta leva e distorce o tempo por peça.

### Horas de máquina e horas de mão de obra não são a mesma coisa

Uma máquina pode rodar sem operador ao lado; um operador pode cuidar de duas máquinas. O apontamento precisa dizer qual hora está registrando. A regra de quantas horas de cada tipo entram no custo da ordem é do [artigo sobre custo](https://tornostudio.com/blog/custo-producao-padrao-real-rateio-sistema-aceite/); aqui interessa que o registro permita separar as duas.

### Vários operadores na mesma operação

Dois operadores fazem o setup juntos, ou um ajudante entra na metade do turno. A documentação da Senior diz que é possível [apontar com múltiplos operadores simultaneamente no mesmo estágio](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm), com registros independentes. A do Odoo diz que a duração da ordem de trabalho [soma o tempo de todos os operadores](https://www.odoo.com/documentation/18.0/de/applications/inventory_and_mrp/manufacturing/shop_floor/shop_floor_tracking.html). Decida: as horas de mão de obra são a soma das pessoas (dois operadores por 40 minutos são 80 minutos de mão de obra) enquanto a máquina continua com 40 minutos? Quem aponta a quantidade, se os dois estão na mesma operação? A quantidade é da operação, não de cada operador; se cada um apontar as peças "que fez", a soma precisa fechar com o que saiu da máquina.

### Um operador em várias ordens ao mesmo tempo

O caso mais comum de hora inflada: o operador cuida de dois tornos, cada um com uma ordem. Se ele apontar início e fim nas duas, o sistema registra o mesmo intervalo duas vezes, e o operador termina o turno com mais horas apontadas do que esteve presente. As alternativas são dividir o tempo simultâneo entre as ordens (em partes iguais, ou proporcional a algum critério), apontar a mão de obra só numa delas, ou apontar a mão de obra separada da ordem e distribuir depois. Qualquer uma pode ser defensável; a que não é defensável é deixar sem regra. Recomendação da Torno: o sistema confere, por operador e turno, se a soma das horas apontadas cabe na presença, e mostra a diferença quando não cabe. Isso não é controle de ponto, que tem regras próprias e fica fora deste artigo; é só uma conferência de coerência.

### A ordem que atravessa o turno e o dia

A ordem começa às 20h e termina às 3h. As horas do turno da noite são do dia em que começaram ou do dia do fato? E se a virada do mês acontece no meio? Os cuidados gerais estão em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/); escreva a regra de corte por turno e por mês, porque ela muda o que entra no custo de cada período.

## Peça boa, refugo e retrabalho, com motivo

O material da SAP define bem as três quantidades: a [boa pode seguir para o próximo centro de trabalho, o refugo foi descartado, e o retrabalho não pode seguir até ser reparado](https://learning.sap.com/courses/exploring-business-processes-in-sap-s4-hana-discrete-shopfloor-control/confirming-production-orders_d5811bf4-fb07-411d-8bdb-0f9cec11e4db). A ajuda antiga do SAP acrescenta que o retrabalho é a quantidade que [precisa de processamento adicional antes de ser contada como boa](https://help.sap.com/saphelp_erp60_sp/helpdata/en/09/05b753128eb44ce10000000a174cb4/content.htm). O que a empresa precisa decidir:

- **Motivo obrigatório.** A Senior documenta que o [motivo de defeito é obrigatório quando a quantidade de refugo é maior que zero](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm). A lista de motivos é da qualidade, curta o bastante para o operador escolher sem pensar e específica o bastante para servir de análise. "Outros" com texto livre, se existir, precisa ser revisto.
- **Onde o retrabalho volta.** A peça retrabalhada volta como boa na mesma operação, numa operação própria de retrabalho, ou numa ordem separada? Cada escolha muda o balanço da operação e o que o indicador mostra. O cálculo do indicador que usa essas quantidades fica no [artigo de OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/).
- **Retrabalho pendente.** Enquanto a peça espera o reparo, ela não é boa nem refugo. O sistema precisa mostrar esse saldo, ou ele some.
- **Quem declara o refugo.** O operador aponta na hora; a inspeção pode reprovar depois. Se a reprovação chega depois que a operação foi encerrada, ela entra como apontamento novo na operação de origem ou na de inspeção? Decida, porque o refugo na operação errada esconde onde o problema está.
- **Refugo que vira não conformidade.** O refugo acima de um limite, ou de certos motivos, pode abrir uma [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/). O tratamento é de lá; aqui basta o gatilho.

A regra que amarra tudo: **em cada operação, o que entrou é igual ao que saiu como boa, mais o refugo, mais o retrabalho pendente.** Se o sistema não fecha essa conta por operação, ele não está controlando as peças, só somando números.

## Apontamento parcial e encerramento da operação e da ordem

Ordens grandes são apontadas em partes: a cada lote, a cada caixa, no fim de cada turno. O material da SAP chama de parcial a confirmação em que [boa + retrabalho + refugo é menor que a quantidade a confirmar](https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition-manufacturing/posting-confirmations-for-production-orders-1). As perguntas:

- **Com que frequência.** Apontar só no fim do turno é mais simples; apontar a cada lote mostra a ordem andando e libera peças para a operação seguinte mais cedo.
- **Quem encerra a operação.** O último apontamento encerra automaticamente quando a quantidade é atingida, ou alguém marca "operação concluída"? O Business Central, por exemplo, tem um [campo Concluído na linha de saída](https://learn.microsoft.com/en-au/dynamics365/business-central/production-how-to-register-consumption-and-output) que indica que a operação terminou. A mesma página adverte que só a quantidade da última linha de saída ajusta o estoque, e que não se deve lançar a quantidade esperada pré-preenchida antes de produzir tudo: é o tipo de detalhe que vira cenário de teste.
- **Tolerância de quantidade.** A ordem é de 200 e saíram 191 boas. Pode encerrar? O material de configuração da SAP descreve [reações configuráveis quando a quantidade boa mais o retrabalho fica abaixo da tolerância de falta ou passa da tolerância de excesso](https://learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-confirmations-for-production-orders). Escreva a tolerância, quem aprova o encerramento fora dela, e o que acontece com o saldo que faltou: nova ordem, sugestão de reposição pelo planejamento, ou nada.
- **Excesso.** Saíram 206 boas de uma ordem de 200. O sistema aceita, avisa ou recusa? Excesso costuma significar que o material da ordem foi consumido além do previsto.

## Operação fora de sequência

O roteiro diz corte, torneamento, fresamento, inspeção. O operador do fresamento aponta antes do torneamento, porque o torneiro esqueceu de apontar, ou porque as peças realmente pularam uma etapa.

O material da SAP descreve uma chave que define [se o sistema emite mensagem quando a sequência de operações não é respeitada](https://learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-confirmations-for-production-orders), e operações marco que [precisam ser confirmadas na ordem](https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition-manufacturing/posting-confirmations-for-production-orders-1). A Senior documenta uma opção no roteiro com a qual os estágios [só podem ser apontados à medida que os anteriores forem finalizados](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm). São formas diferentes de tratar o mesmo risco. As escolhas:

- **Bloquear** o apontamento de uma operação enquanto a anterior não estiver encerrada. É seguro, mas impede a sobreposição normal, em que o fresamento começa com as primeiras peças torneadas.
- **Limitar a quantidade:** a operação seguinte só pode apontar até o total de peças boas já apontadas na anterior. Permite a sobreposição e pega o esquecimento.
- **Permitir com motivo e aviso** ao supervisor, para casos reais de operação pulada.

Recomendação da Torno: limitar a quantidade e, quando o operador precisar passar do limite, exigir motivo e aviso, em vez de liberar em silêncio. O caso da operação feita por terceiro, que volta sem apontamento interno, segue o [artigo sobre industrialização por encomenda](https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/).

## Paradas durante a ordem

A parada interrompe a contagem de horas de execução e precisa de motivo. O que a classificação da parada significa para o indicador está no [artigo de OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/); aqui ficam as regras do registro:

- **Início, fim e motivo.** A parada sem motivo fica pendente para o supervisor classificar até um prazo escrito.
- **Vários operadores.** A Senior documenta que, com mais de um operador no mesmo estágio, a situação [Parado só é assumida quando todos os operadores apontaram parada](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm). É uma escolha razoável e mostra que a regra precisa existir.
- **Parada que é da máquina, não da ordem.** Quebra de ferramenta, falta de material, quebra do equipamento. A parada por quebra pode abrir uma ordem de [manutenção corretiva](https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/); decida se o apontamento abre o chamado ou só registra.
- **Refeição e troca de turno.** São paradas planejadas; o sistema pode lançá-las pelo calendário, sem depender do operador.

## Baixa de material: consumo real ou baixa automática pela estrutura

Aqui está a regra que mais aparece depois, no inventário. O material consumido pela ordem sai do estoque de duas formas:

- **Apontamento do consumo real.** Alguém registra o que saiu para a ordem: pesado, contado ou requisitado. Mais trabalho, mais aderência.
- **Baixa automática pela estrutura (backflush).** O sistema calcula o consumo multiplicando a quantidade por peça da estrutura por alguma quantidade da ordem, e baixa sozinho num momento definido.

A escolha de qual item usa qual forma é da [estrutura de produto](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/). O que interessa aqui é que, quando a baixa é automática, **o apontamento dispara o movimento de estoque**, e duas perguntas precisam de resposta:

**Quando a baixa acontece.** O Business Central descreve [métodos de baixa](https://learn.microsoft.com/en-gb/dynamics365/business-central/production-how-to-flush-components-according-to-operation-output): manual; "forward", que baixa ao liberar a ordem ou quando a operação começa, pela quantidade esperada; "backward", que baixa ao terminar a ordem ou quando cada operação termina, proporcional à saída real da operação; e variantes ligadas à separação no armazém. A página dá o exemplo de uma ordem de 800 metros que exige 8 kg de componente: lançar 200 metros de saída baixa 2 kg. No SAP, se o componente está marcado para baixa automática, [a confirmação dispara a saída do componente](https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition-manufacturing/posting-confirmations-for-production-orders-1). Na Senior, ao apontar a quantidade produzida, o sistema faz [automaticamente as baixas de consumo configuradas na engenharia](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm). Nesses arranjos, o apontamento parcial gera baixa parcial; no Business Central, isso vale para o "backward" ligado à operação, como no exemplo dos 800 metros, enquanto a baixa pela ordem inteira sai de uma vez, na liberação ("forward") ou no término da ordem ("backward").

**Por qual quantidade.** É a pergunta que costuma ficar sem resposta. A baixa multiplica a estrutura pelas peças boas, pelas boas mais o refugo, ou pelas peças iniciadas? A própria ajuda do Business Central diz que a desvantagem da baixa automática é [poder não registrar com exatidão, ou nem perceber, o refugo](https://learn.microsoft.com/en-gb/dynamics365/business-central/production-how-to-flush-components-according-to-operation-output). Se a baixa considera só as boas, o material das peças refugadas continua no estoque do sistema, e a diferença aparece no [inventário](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/) como "sumiço". No exemplo abaixo, essa diferença dá 13,75 kg de barra numa única ordem.

Outros pontos:

- **Desvio do consumo real.** O Odoo, por exemplo, tem na estrutura um campo que diz se o consumo pode desviar da quantidade prevista: ["Blocked" quando os operadores devem seguir estritamente a estrutura, ou as opções "Allowed" e "Allowed with Warning"](https://www.odoo.com/documentation/latest/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html). Decida o que acontece quando o consumo real passa do previsto: aceita, avisa ou exige aprovação.
- **Lote do material.** Se o material é rastreado por lote, o apontamento do consumo informa qual lote; a baixa automática precisa de uma regra para escolher. O rastreio está em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/).
- **Movimento com erro.** Se a baixa falha (saldo insuficiente, lote bloqueado), o apontamento é recusado ou gravado com o movimento pendente? O material de configuração da SAP descreve um indicador que define se [a confirmação é interrompida quando há movimento de material com erro](https://learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-confirmations-for-production-orders). Se o apontamento passa e o movimento fica pendente, alguém precisa ter a fila de pendências como tarefa.

## Estorno e correção depois do fechamento

Apontamento errado acontece: quantidade digitada trocada, operação errada, ordem errada, laudo revisto no dia seguinte. A pergunta não é se haverá correção, mas como ela fica registrada.

- **Estornar, não apagar.** Recomendação da Torno: a correção cria um movimento de estorno do apontamento original e um apontamento novo, com motivo e autor; o original continua consultável. O Business Central descreve uma ação que [cria lançamentos com sinal oposto em quantidade, refugo, setup e execução, aplicados ao lançamento original](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-reverse-output-posting), na data original, e remove o status Concluído da operação. A Senior documenta que, no apontamento por estágio, [apenas o último apontamento pode ser editado ou excluído](https://documentacao.senior.com.br/gestaoempresarialerp/7.0.0/gestao-industrial/gestao-chao-fabrica/apontamento-estagio.htm), e tem uma tela de acerto de apontamentos que [compara a alteração com as operações anterior e posterior](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.4/menu_manufatura/f909aop.htm). O que o registro precisa guardar está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).
- **O estorno desfaz o quê.** Quantidade, horas, estoque do produto, baixa automática de material, encerramento da operação. Escreva a lista. Na documentação da Senior, por exemplo, o estorno de componentes depende de configuração, e, em ordem finalizada, [a reserva dos componentes não é restaurada](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.4/menu_manufatura/f909aop.htm) quando a quantidade realizada é reduzida. Se a baixa de material foi automática e o estorno não a desfaz, o estoque fica errado de novo.
- **Peças que já saíram.** O Business Central não permite reverter a saída quando ela [já foi aplicada a uma saída de estoque](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-reverse-output-posting). Na prática: se as peças já foram expedidas, o estorno do apontamento não pode tirar do estoque o que não está mais lá. Decida o caminho (ajuste de estoque com motivo, devolução, nada).
- **Ordem encerrada.** Corrigir uma ordem encerrada reabre a ordem? A tolerância de encerramento continua valendo depois da correção?
- **Mês fechado.** Se o custo de novembro já foi fechado, o estorno entra em novembro, reabrindo o mês, ou em dezembro, com referência ao apontamento original? É decisão da controladoria, com as regras de fechamento do [artigo sobre custo](https://tornostudio.com/blog/custo-producao-padrao-real-rateio-sistema-aceite/).
- **Quem pode.** O operador corrige o próprio apontamento até o fim do turno; depois, o supervisor; depois do encerramento da ordem, o PCP; depois do fechamento do mês, a controladoria. É um exemplo; os perfis seguem as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/). Duas pessoas corrigindo o mesmo apontamento ao mesmo tempo é o caso de [edição simultânea](https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/).

## Apontamento sem conexão

O tablet do posto perde o Wi-Fi, ou a rede da fábrica cai. O desenho geral de quem grava o quê e como sincroniza está em [sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/). Para o apontamento, quatro regras:

- **O horário que vale é o do fato.** O apontamento feito às 15h50 sem conexão e sincronizado às 15h56 é das 15h50. Os dois horários ficam gravados.
- **Sem repetição.** A sincronização reenviada não pode contar o apontamento duas vezes; o identificador gerado no posto resolve, como em [evento duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Validação na chegada.** As regras que o posto não conseguiu conferir sem conexão (quantidade acima da operação anterior, ordem encerrada, saldo de material) são conferidas quando o apontamento chega. Se ele não passa, vai para uma fila de pendências do supervisor, não some e não entra calado.
- **O que o posto pode fazer sem conexão.** Iniciar, parar e apontar quantidade, provavelmente; encerrar ordem e estornar, provavelmente não. Escreva a lista.

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Nível do apontamento (ordem, operação), conteúdo mínimo e quem aponta | PCP e produção, com TI |
| Separação entre setup e execução, horas de máquina e de mão de obra | Produção e custos |
| Divisão das horas de um operador em várias ordens e conferência com a presença | Produção e custos, com RH quando houver efeito em jornada |
| Lista de motivos de refugo, retrabalho e parada | Qualidade (refugo e retrabalho) e produção, com manutenção (paradas) |
| Onde o retrabalho volta e como o retrabalho pendente aparece | Qualidade e PCP |
| Frequência do apontamento parcial e encerramento da operação | Produção e PCP |
| Tolerância de quantidade para encerrar a ordem e destino do saldo | PCP, com comercial quando a ordem é de cliente |
| Regra de sequência e limite de quantidade entre operações | PCP e engenharia de processo |
| Baixa por consumo real ou automática, momento e base de quantidade | PCP, almoxarifado e custos, sobre a escolha feita na estrutura |
| Consumo acima do previsto e movimento com erro | Almoxarifado e PCP |
| Quem estorna e corrige, até quando, e o efeito no estoque e no material | PCP, com controladoria e as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |
| Estorno depois do fechamento do mês | Controladoria |
| O que o posto pode fazer sem conexão e a fila de pendências | Produção e TI |
| Sistema que é fonte oficial de cada número (ERP, MES, aplicativo) | Direção industrial, com TI |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. usina eixos. A OP 8301 é de 200 eixos EX-40, com roteiro: 10 corte de barra, 20 torneamento no torno CNC TC-02, 25 retrabalho em bancada (só quando houver), 30 fresamento do rasgo na FR-01 e 40 inspeção final. Regras da empresa (escolhas do exemplo, não recomendação):

- **Apontamento por operação**, no tablet do posto, com crachá. Setup e execução separados. Quantidade apontada ao menos no fim de cada turno.
- **Refugo e retrabalho exigem motivo.** Motivos de refugo: R01 dimensional fora, R02 comprimento de corte, R04 dano de manuseio. Retrabalho: T01 rebarba. Peça retrabalhada volta pela operação 25 como boa ou refugo.
- **Horas de mão de obra.** Dois operadores na mesma operação somam as horas. Um operador atendendo duas máquinas ao mesmo tempo tem o tempo simultâneo dividido em partes iguais entre as ordens. A soma do operador no turno não pode passar da presença; se passar, o sistema mostra a diferença e o supervisor corrige.
- **Sequência.** Uma operação pode começar antes da anterior terminar, mas só aponta até o total de peças boas da anterior; acima disso, exige motivo e aviso ao supervisor.
- **Encerramento.** Tolerância de 5% para menos sem aprovação (200 × 0,95 = 190); abaixo disso, o PCP aprova. Excesso exige aprovação.
- **Material.** A barra de aço tem 1,250 kg por eixo na estrutura, mas é baixada pelo consumo real pesado e apontado no corte, com o lote da corrida, porque é rastreada por lote. Consumo acima de 3% do previsto pelas peças iniciadas exige aprovação do PCP. Se a baixa de material falha, o apontamento inteiro é recusado.
- **Estorno.** Movimento de estorno mais apontamento novo, com motivo e autor. Operador até o fim do turno; supervisor até o encerramento da ordem; PCP depois disso; controladoria depois do fechamento do mês, com lançamento no mês aberto.
- **Sem conexão.** O posto inicia, para e aponta quantidade; não encerra nem estorna. Validação completa na chegada; o que falhar vai para a fila do supervisor.

**Terça-feira, 03/11/2026, turno A (6h às 14h), torno TC-02.** Os operadores 104 e 117 fazem juntos o setup da operação 20, das 6h00 às 6h40. O 117 sai para preparar o torno TC-03 (OP 8305) e o 104 fica: produção das 6h40 às 8h10; parada por quebra de ferramenta das 8h10 às 8h35; produção das 8h35 às 10h00; refeição das 10h00 às 10h30; produção das 10h30 às 13h40; limpeza e passagem de turno das 13h40 às 14h00. Às 8h35 o TC-03 começa a OP 8305, também atendido pelo 104 até 13h40. No fim do turno, o 104 aponta na operação 20: 120 boas, 3 refugadas (R01) e 2 para retrabalho (T01).

As contas de horas do turno A, operação 20 da OP 8301:

- **Máquina TC-02:** setup 40 min; execução 90 + 85 + 190 = 365 min; parada 25 min; refeição 30 min; limpeza 20 min; total 480 min, o turno inteiro.
- **Tempo simultâneo do operador 104** (TC-02 e TC-03): 85 + 190 = 275 min, divididos em partes iguais: 137,5 min para cada ordem.
- **Operador 104 na OP 8301:** 40 (setup) + 90 (sozinho) + 25 (parada) + 137,5 = 292,5 min. **Na OP 8305:** 137,5 min. **Limpeza:** 20 min, sem ordem. Total: 450 min, igual à presença (480 min menos 30 de refeição).
- **Operador 117 na OP 8301:** 40 min de setup.
- **Mão de obra da OP 8301 no turno A:** 292,5 + 40 = 332,5 min, ou 5,54 h.

**A armadilha das horas.** Se o 104 apontasse início e fim inteiros nas duas ordens, teria 40 + 90 + 25 + 275 + 275 + 20 = 725 min num turno de 450 min de presença. Nenhuma das duas ordens teria a hora certa, e o custo de mão de obra das duas sairia inflado.

![Ilustração de uma régua horária do turno A, das 6h às 14h, da terça-feira 03/11/2026, na Metalúrgica Exemplo Ltda., com quatro faixas horizontais. Primeira faixa, máquina TC-02, OP 8301 operação 20: setup das 6h00 às 6h40; produção das 6h40 às 8h10; parada por quebra de ferramenta das 8h10 às 8h35; produção das 8h35 às 10h00; refeição das 10h00 às 10h30; produção das 10h30 às 13h40; limpeza das 13h40 às 14h00. Segunda faixa, operador 104: setup no TC-02, produção sozinho no TC-02, parada, e depois blocos hachurados de atendimento simultâneo das 8h35 às 10h00 e das 10h30 às 13h40, marcados como divididos meio a meio entre as OPs 8301 e 8305, e limpeza no fim. Terceira faixa, operador 117: setup no TC-02 das 6h00 às 6h40, junto com o 104, e setup do TC-03 das 6h40 às 8h35. Quarta faixa, máquina TC-03, OP 8305: setup das 6h40 às 8h35, produção das 8h35 às 10h00, refeição, produção das 10h30 às 13h40 e limpeza. Uma chave sob os blocos hachurados indica 275 minutos simultâneos, 137,5 para cada ordem. No rodapé, a soma do operador 104: 292,5 minutos na OP 8301, mais 137,5 na OP 8305, mais 20 de limpeza, igual a 450 minutos, a presença. Em destaque, a armadilha: contando o tempo simultâneo inteiro nas duas ordens, seriam 725 minutos em 450 de presença. Abaixo, a mão de obra da OP 8301 no turno: 332,5 minutos, 292,5 do 104 e 40 do 117. Exemplo fictício.](./torno-apontamento-regua-turno.svg)

*Exemplo fictício: turno, máquinas, operadores e horários inventados; a regra de dividir o tempo simultâneo em partes iguais é escolha da empresa do exemplo, não recomendação. Ilustração original Torno, 2026.*

**Turno B (14h às 22h), operador 121, só no TC-02.** O torneamento continua das 14h00 às 17h52, com uma parada por falta de ar comprimido das 15h20 às 15h32: 80 + 140 = 220 min de execução. O tablet do TC-02 fica sem conexão das 15h10 às 15h55. Às 15h50, ainda sem conexão, o 121 aponta 30 boas; o tablet sincroniza às 15h56, e a sincronização envia o mesmo apontamento duas vezes. Às 17h52 ele aponta mais 40 boas, 2 refugadas (R01) e 3 para retrabalho (T01). Às 15h00, o operador da fresadora FR-01 tenta apontar 130 peças fresadas na operação 30, sem motivo: só havia 120 boas na operação 20.

**Quarta-feira, 04/11.** O 104 retrabalha as 5 peças na bancada (operação 25), em 25 min: 4 voltam boas, 1 é refugada (R01). O fresamento aponta 192 boas e 2 refugadas por dano de manuseio (R04). A inspeção final aponta 191 aprovadas e 1 refugada (R01). O PCP encerra a OP com 191 eixos, dentro da tolerância (191 ≥ 190).

**O balanço de peças da OP 8301:**

| Operação | Entraram | Boas | Refugo | Retrabalho |
|---|---|---|---|---|
| 10 corte | 202 | 200 | 2 (R02) | — |
| 20 torneamento, turno A (03/11) | 125 | 120 | 3 (R01) | 2 (T01) |
| 20 torneamento, turno B (03/11) | 75 | 70 | 2 (R01) | 3 (T01) |
| 25 retrabalho (04/11) | 5 | 4 | 1 (R01) | — |
| 30 fresamento (04/11) | 194 | 192 | 2 (R04) | — |
| 40 inspeção final (04/11) | 192 | 191 | 1 (R01) | — |

Na operação 20, entraram 200 (125 + 75); saíram 190 boas, 5 refugadas e 5 para retrabalho; com as 4 que voltaram do retrabalho, 194 boas seguiram para o fresamento. Fechamento da ordem: 202 blanks cortados = 191 eixos bons + 11 refugados (2 + 3 + 2 + 1 + 2 + 1).

![Ilustração de um livro-razão de peças da OP 8301, de 200 eixos EX-40, da Metalúrgica Exemplo Ltda., com linhas por operação e colunas entraram, boas, refugo com motivo e retrabalho. Corte: 202 entraram, 200 boas, 2 refugadas por comprimento de corte. Torneamento turno A em 03/11: 125, 120 boas, 3 refugadas dimensional, 2 para retrabalho por rebarba. Torneamento turno B: 75, 70 boas, 2 refugadas, 3 para retrabalho; uma nota marca o apontamento de 30 peças feito às 15h50 sem conexão, sincronizado às 15h56, contado uma vez embora enviado duas. Retrabalho em bancada em 04/11: 5, 4 boas, 1 refugada. Fresamento: 194, 192 boas, 2 refugadas por dano de manuseio; uma nota indica a tentativa de apontar 130 no fresamento às 15h00 de 03/11, sem motivo, quando só havia 120 torneadas, recusada. Inspeção final: 192, 191 aprovadas, 1 refugada. Linha de fechamento em 04/11: 202 cortadas igual a 191 boas mais 11 refugadas, dentro da tolerância de 190. Abaixo, em vermelho, o estorno de 06/11: a linha da inspeção, 191 e 1, é estornada com sinal negativo, sem ser apagada, e um apontamento novo registra 190 aprovadas e 2 refugadas, motivo laudo revisto, lançado pelo PCP; o fechamento passa a 202 igual a 190 mais 12, ainda dentro da tolerância. Exemplo fictício.](./torno-apontamento-razao-pecas.svg)

*Exemplo fictício: ordem, operações, quantidades e motivos inventados; em cada operação, o que entrou fecha com boas, refugo e retrabalho, e o estorno aparece como lançamento novo, sem apagar o original. Ilustração original Torno, 2026.*

**A barra.** O corte apontou o consumo real de 258,00 kg de barra, do lote da corrida C-5521. A comparação com as três formas de baixa que a empresa poderia ter escolhido:

| Base da baixa | Conta | Quilos baixados | Diferença para o real |
|---|---|---|---|
| Consumo real apontado no corte | pesado | 258,00 | — |
| Automática pelas peças iniciadas | 202 × 1,250 | 252,50 | 5,50 a menos |
| Automática pelas peças boas no fim | 191 × 1,250 | 238,75 | 19,25 a menos |

Os 13,75 kg entre a baixa pelas iniciadas e a baixa pelas boas são exatamente o material das 11 peças refugadas (11 × 1,250). Os 5,50 kg entre o real e as iniciadas são pontas de barra que a estrutura não previu, 2,2% acima do previsto pelas iniciadas, dentro do limite de 3% (252,50 × 1,03 = 260,075 kg) e por isso aceitos sem aprovação; é assunto para a engenharia rever a perda prevista na estrutura, não para o apontamento esconder.

![Ilustração de três pilhas verticais de quilos de barra de aço da OP 8301 da Metalúrgica Exemplo Ltda., lado a lado, sobre uma mesma base. Primeira pilha, consumo real pesado no corte, lote C-5521: 258,00 kg. Segunda, baixa automática pelas 202 peças iniciadas, 202 vezes 1,250 kg: 252,50 kg. Terceira, baixa automática pelas 191 peças boas no fim da ordem, 191 vezes 1,250: 238,75 kg. Linhas tracejadas horizontais ligam o topo de cada pilha à seguinte. Entre a primeira e a segunda, 5,50 kg de pontas de barra que a estrutura não previu, 2,2% acima do previsto e dentro do limite de 3%, para a engenharia rever a perda. Entre a segunda e a terceira, 13,75 kg, igual a 11 peças refugadas vezes 1,250 kg, o material que a baixa pelas peças boas deixa no estoque do sistema e que o inventário vai encontrar faltando. Entre a primeira e a terceira, 19,25 kg no total. Uma nota diz que o estorno da inspeção em 06/11 mudaria a terceira pilha para 237,50 kg, mas não a primeira. O eixo vertical começa em 230 kg. Exemplo fictício.](./torno-apontamento-pilhas-consumo.svg)

*Exemplo fictício: estrutura, pesos e lote inventados; a mesma ordem baixa quantidades diferentes de material conforme a base da baixa, e a diferença vira saldo fantasma no estoque. Ilustração original Torno, 2026.*

**Sexta-feira, 06/11: estorno.** A qualidade revisa o laudo da inspeção final e reprova mais um eixo. Quarenta eixos já foram expedidos; restam 151 no estoque. O PCP estorna o apontamento da operação 40 (191 aprovadas, 1 refugada) e registra um novo (190 aprovadas, 2 refugadas), com motivo "laudo revisto" e autor. O estoque do eixo passa de 151 para 150. O fechamento passa a 202 = 190 + 12, ainda dentro da tolerância (190 ≥ 190). Como a barra foi baixada pelo consumo real, o estoque de barra não muda; se tivesse sido baixada pelas peças boas, o estorno teria devolvido 1,250 kg, e a baixa passaria a 237,50 kg.

Monte os cenários em um ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com ordens, operadores e estoques fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Operador 104 lê o crachá e a etiqueta da OP 8301, operação 20, e inicia o setup às 6h00 | Apontamento de início de setup com ordem, operação, posto, operador, horário do fato e horário de registro | Registro do apontamento |
| Operador 117 inicia o mesmo setup às 6h00 | Aceito; dois registros independentes na mesma operação | Lista de apontamentos da operação |
| Fim do setup às 6h40 | Máquina: 40 min de setup; mão de obra: 80 min (40 + 40) | Horas da operação por tipo |
| Operador 104 inicia a OP 8305 no TC-03 às 8h35 com a OP 8301 em produção | Aceito; o intervalo simultâneo é marcado | Linha do tempo do operador |
| Fechamento das horas do operador 104 no turno A | 292,5 min na OP 8301, 137,5 na OP 8305, 20 de limpeza; total 450 = presença | Relatório de horas por operador e turno |
| Simulação: tempo simultâneo apontado inteiro nas duas ordens | Total de 725 min mostrado contra 450 de presença, com diferença de 275 para o supervisor corrigir | Alerta e relatório |
| Parada às 8h10 sem motivo | Fica pendente; o supervisor classifica até o fim do turno | Pendência e classificação |
| Parada classificada como quebra de ferramenta, 8h10 às 8h35 | 25 min de parada; execução interrompida no intervalo | Linha do tempo da máquina |
| Apontamento de 3 refugadas sem motivo | Recusado | Tentativa recusada com a mensagem |
| Apontamento do turno A: 120 boas, 3 refugadas (R01), 2 retrabalho (T01) | Aceito como parcial; operação 20 continua aberta; retrabalho pendente de 2 | Situação da operação e saldo de retrabalho |
| Às 15h00, apontamento de 130 fresadas na operação 30, sem motivo | Recusado: passa das 120 boas da operação 20; até 120, aceito | Tentativa recusada com a mensagem |
| Simulação: o mesmo apontamento de 130, com motivo | Aceito, com aviso ao supervisor | Apontamento, motivo e aviso |
| Apontamento de 30 boas às 15h50 sem conexão, sincronizado às 15h56 | Registrado com horário do fato 15h50 e de registro 15h56 | Registro com os dois horários |
| Mesmo apontamento enviado duas vezes na sincronização | Contado uma vez; a repetição fica no log | Saldo da operação e log |
| Tentativa de encerrar a OP no tablet sem conexão | Opção indisponível sem conexão | Tela do posto |
| Apontamento feito sem conexão que chega depois de a operação ser encerrada | Vai para a fila do supervisor, sem alterar a operação | Fila de pendências |
| Apontamento do turno B às 17h52: 40 boas, 2 refugadas, 3 retrabalho | Operação 20 com 200 entradas = 190 boas + 5 refugo + 5 retrabalho pendente | Balanço da operação |
| Retrabalho na operação 25: 4 boas, 1 refugada | Retrabalho pendente zerado; 194 boas disponíveis para a operação 30 | Balanço das operações 20 e 25 |
| Apontamento de 4 boas no retrabalho sem motivo do refugo | Recusado | Tentativa recusada |
| Fresamento: 192 boas, 2 refugadas (R04) | Aceito; 194 = 192 + 2 | Balanço da operação 30 |
| Inspeção final: 191 aprovadas, 1 refugada | Aceito; 191 eixos entram no estoque | Movimento de entrada do produto |
| Encerramento da OP com 191 de 200 | Aceito sem aprovação: 191 ≥ 190 | Situação da ordem |
| Simulação: encerramento com 189 de 200 | Exige aprovação do PCP | Pedido de aprovação |
| Simulação: 206 boas numa ordem de 200 | Exige aprovação | Pedido de aprovação |
| Balanço da ordem no encerramento | 202 cortadas = 191 boas + 11 refugadas | Relatório da ordem |
| Consumo de barra apontado no corte: 258,00 kg, lote C-5521 | Baixa de 258,00 kg do lote C-5521; 2,2% acima do previsto pelas iniciadas, dentro de 3%, sem aprovação | Movimento de estoque com lote |
| Simulação: consumo apontado de 262,00 kg | Exige aprovação do PCP: passa de 260,075 kg (3% sobre 252,50) | Pedido de aprovação |
| Simulação: barra configurada para baixa automática pelas peças boas no fim | Baixa de 238,75 kg; relatório mostra 13,75 kg de refugo não baixados | Movimento e relatório de divergência |
| Simulação: barra configurada para baixa automática pelas peças iniciadas | Baixa de 252,50 kg | Movimento de estoque |
| Simulação: apontamento com baixa de barra sem saldo no lote | Apontamento recusado com o motivo, sem movimento pela metade | Tentativa recusada |
| Total de horas da operação 20 | Máquina, execução e setup: 40 + 365 + 220 = 625 min (10,42 h); mão de obra: 332,5 (turno A) + 232 (turno B: 220 de execução e 12 de parada) = 564,5 min (9,41 h); mais 25 min de mão de obra na operação 25 | Horas da ordem por operação e tipo |
| Operador 121 tenta estornar o apontamento do turno A no dia 04/11 | Negado: o estorno de turno anterior é do supervisor ou do PCP | Tentativa negada |
| Estorno da inspeção em 06/11 pelo PCP | Lançamento de estorno de 191/1 e novo de 190/2, com motivo e autor; o original continua consultável | Histórico do apontamento |
| Estoque do eixo após o estorno, com 40 já expedidos | 151 → 150 | Movimento de estoque |
| Balanço da ordem após o estorno | 202 = 190 + 12; ordem continua encerrada, dentro da tolerância | Relatório da ordem |
| Estoque de barra após o estorno | Inalterado: a barra foi baixada pelo consumo real | Saldo do lote C-5521 |
| Simulação: estorno pedido em 03/12, com novembro fechado | Lançado em dezembro, com referência ao apontamento de novembro; novembro não muda | Movimento e relatório do mês |
| Supervisor e PCP corrigem o mesmo apontamento ao mesmo tempo | A segunda gravação é recusada ou avisa do conflito; nenhuma correção se perde em silêncio | Tentativa e mensagem |

*Fim do exemplo fictício. Empresa, ordens, roteiro, postos, operadores, horários, quantidades, motivos, tolerância, divisão de horas, estrutura, pesos, lote, janela sem conexão, estorno e datas são modelo editorial, sem cliente, fábrica, apontamento real ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não regras recomendadas, nem comportamento padrão de ferramenta.*

Antes do go-live, pegue um mês de fichas de produção ou da planilha atual e confira, num ambiente de teste: quantas ordens fecham o balanço de peças por operação, quantos operadores têm mais horas apontadas do que presença em algum turno, quantos refugos não têm motivo e quanto do saldo de matéria-prima diverge depois do inventário. Se o painel de produção que vocês usam mostra números diferentes dos apontamentos, valem os cuidados de [números divergentes entre painel e sistema](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/). Se a dúvida ainda é se vale sair do papel, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Preciso de um MES para ter apontamento de produção no sistema?

Não necessariamente, e este artigo não recomenda um nem outro. ERPs costumam ter apontamento próprio, como mostram as documentações citadas; MES e aplicativos de chão de fábrica fazem o registro mais perto do posto e mandam o resultado ao ERP. O que decide é onde cada regra deste artigo vai ser cumprida e qual sistema é a fonte oficial de cada número. Defina isso antes de escolher a ferramenta.

### Apontamento automático pela máquina dispensa o apontamento manual?

Em geral, não por inteiro. A máquina sabe quando parou e quantos ciclos fez; ela não sabe por que parou, qual peça foi refugada e por quê, nem quem estava operando, a menos que haja dispositivos para isso. O desenho comum combina os dois, e a regra de qual origem prevalece quando discordam está no artigo sobre [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/).

### Backflush é errado?

Não. A baixa automática pela estrutura economiza trabalho em itens baratos, de consumo estável e sem rastreio de lote. O problema é a base de quantidade escolhida sem pensar: baixa pelas peças boas deixa o material do refugo no estoque do sistema. Escreva por qual quantidade cada item é baixado, e teste com uma ordem que tenha refugo.

### Posso simplesmente apagar um apontamento errado?

Pode, se o sistema deixar, mas você perde o rastro do que aconteceu e, se o apontamento já moveu estoque ou material, corre o risco de desfazer só uma parte. O estorno como lançamento novo, com motivo e autor, deixa o histórico consultável e permite conferir o que foi desfeito.

Para transformar o apontamento de produção em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) uma ficha de produção ou o modelo de apontamento que vocês usam hoje, o roteiro de uma ordem típica e o caso mais recente de estoque de matéria-prima que não bateu, sem dados confidenciais de clientes ou de pessoas.

*Fontes consultadas em 20 de novembro de 2026: ISA, página da ISA-95 (texto da norma não lido); SAP Learning, "Confirming Production Orders", "Posting Confirmations for Production Orders" e "Configuring Confirmations for Production Orders"; SAP Help Portal, ERP 6.0, confirmação de retrabalho; Microsoft Learn, Business Central, diário de produção (17/07/2026), métodos de baixa de componentes (06/11/2025) e reversão de saída (17/07/2026); Senior Sistemas, Gestão Empresarial ERP 7.0.0 (apontamento por estágio), 5.10.4 (acerto de apontamentos) e 5.10.3 (leiaute do Bloco K); Odoo, documentação 18.0 (controle de tempo no Shop Floor) e lista de materiais. Este artigo não recomenda sistema nem fornecedor; empresas, ordens, pessoas, números e ilustrações são fictícios.*
