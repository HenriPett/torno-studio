---
content_id: torno-artigo-pt-20261123-separacao-pedidos-expedicao
intent_id: buyer-order-picking-packing-shipping-check-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Separação de pedidos e conferência de expedição no sistema: o que definir e testar antes de aceitar'
h1: 'Separação de pedidos e conferência de expedição no sistema: o que definir e testar antes de aceitar'
seo_title: 'Separação de pedidos e conferência de expedição: aceite | Torno'
seo_description: 'Separação de pedidos no sistema: onda e rota, leitura do item, falta e corte, conferência de volumes, peso, etiqueta, romaneio, NF-e e critérios de aceite.'
summary: 'Roteiro para a empresa que vai contratar, especificar ou aceitar a separação de pedidos (picking) e a conferência de expedição (packing) num sistema ou módulo sob medida, num ERP ou num WMS: como os pedidos viram lista, onda ou lote de separação e em que ordem de endereços; o que se lê na separação (endereço, item, quantidade) e o que se deixa para a conferência; falta na separação, com corte, substituição, pedido parcial e quem decide; conferência de itens e volumes, embalagem, peso esperado e tolerância; etiqueta de volume e SSCC quando o cliente exige; romaneio por transportadora ou rota e conferência no carregamento; a relação entre separação, emissão da NF-e e saída; cancelamento e alteração de pedido depois de separado; indicadores como acuracidade de separação e taxa de corte, só com definição; quem decide cada regra; trilha; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que uma empresa precisa definir e testar antes de aceitar a separação de pedidos e a conferência de expedição num sistema, para que saia o item certo, na quantidade certa, no volume certo, para o caminhão certo, com a falta decidida por alguém e registrada?
proposed_path: /blog/separacao-pedidos-conferencia-expedicao-sistema-aceite/
canonical_url: https://tornostudio.com/blog/separacao-pedidos-conferencia-expedicao-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores de operações e logística, gerentes e supervisores de armazém e expedição, comercial e atendimento, faturamento e TI de distribuidoras, atacados, indústrias e comércios com estoque próprio, pequenos e médios, que vão contratar, especificar, ajustar ou aceitar a separação e a conferência de expedição num sistema sob medida, num ERP ou num WMS, e quem vai implementá-las.
buyer_stage: Especificação e aceite, antes de trocar a lista de separação impressa, a conferência de memória e o romaneio em planilha por separação orientada pelo sistema, leitura de código de barras, conferência de volumes e romaneio gerado a partir do que foi conferido.
scope: Liberação de pedidos para separação, corte de horário e prioridade; separação por pedido, por lote de pedidos (batch) e por onda, e a triagem depois do lote; ordem de endereços e rota de separação; o que se lê na separação (endereço, item, quantidade) e quando a quantidade pode ser digitada; falta na separação (endereço vazio ou com menos), pular, corte, realocação para outro endereço, substituição, pedido parcial e saldo pendente, contagem do endereço, quem decide; conferência de itens na expedição, leitura duplicada e item errado; volumes e embalagem; peso esperado, tara e tolerância; etiqueta de volume, numeração x de y e SSCC quando o cliente exige; romaneio por transportadora ou rota e leitura dos volumes no carregamento; relação entre separação, conferência, emissão da NF-e e saída da mercadoria; cancelamento e alteração de pedido depois de separado, conferido, faturado ou carregado; indicadores (acuracidade de separação por linha e por unidade, taxa de corte) com definição, sem metas; quem decide cada regra; trilha; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de WMS, ERP, coletor, impressora, balança ou fornecedor (a documentação de fornecedores de software aparece só como exemplo de modelagem); orientação fiscal individual (CFOP, tributos, campos da NF-e, cancelamento, carta de correção, nota complementar, devolução ou contingência), que fica com o contador; regras de lote, validade e FEFO na separação, leitura de etiquetas GS1 de lote e escolha de leitor de código de barras (cobertas em outros artigos); inventário e ajuste de estoque; reserva de saldo e pedidos de marketplace; devolução de cliente depois da entrega; conferência da nota de entrada; roteirização de entregas, frete, CT-e, MDF-e e gestão de transporte; desenho físico do armazém, ergonomia e metas de produtividade; benchmarks de acuracidade.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-23T15:12:00Z'
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
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade, FEFO e validade mínima do cliente na escolha do que separar; aqui a separação e a conferência em si, para qualquer item.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Trata a escolha e o ensaio do leitor com etiquetas reais; aqui o que o sistema faz com cada leitura na separação, na conferência e no carregamento.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata a contagem e o ajuste de estoque; aqui a contagem pontual aberta pelo endereço que não tinha o saldo.
  - path: https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/
    reason: Trata saldo, reserva e pedidos de canal; aqui o pedido já liberado para separar.
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata o estado do pagamento; aqui a regra de só liberar para separação o pedido pago ou aprovado.
  - path: https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/
    reason: Trata a devolução depois da entrega; aqui a volta ao estoque do que foi separado e não saiu.
  - path: https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/
    reason: Trata a conferência do lado de quem recebe a mercadoria; aqui o lado de quem expede.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Trata o sistema que emite a NF-e; aqui só o momento da emissão em relação à separação e à saída.
  - path: https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/
    reason: Trata ações em lote com falha parcial; aqui a onda liberada em que parte dos pedidos não tem saldo.
  - path: https://tornostudio.com/blog/cancelamento-solicitacao-sistema/
    reason: Trata a diferença entre pedir o cancelamento e o que já aconteceu; aqui o pedido cancelado com a mercadoria já separada ou carregada.
  - path: https://tornostudio.com/blog/integracao-eventos-fora-ordem/
    reason: Trata eventos que chegam fora de ordem; aqui o cancelamento ou a alteração que chegam depois da conferência.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Trata o trabalho sem conexão; aqui o coletor que perde o sinal no fundo do armazém.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata documentos gerados por modelo; aqui o romaneio e a etiqueta impressos a partir do que foi conferido.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Trata a origem e a regra dos indicadores de um painel; aqui a definição de acuracidade de separação e taxa de corte.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode cortar, substituir, reabrir volume e liberar carregamento.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a separação, o corte e a conferência precisam guardar.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com pedidos, endereços e saldos fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/integracao-erp-briefing-orcamento/
    reason: Ajuda a reunir o que é preciso antes de pedir orçamento de integração com o ERP; aqui quando a separação é um módulo ligado ao ERP atual.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a lista impressa e a planilha de romaneio deixam de bastar.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a separação e a conferência de expedição em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A documentação do Microsoft Dynamics 365 Supply Chain Management sobre processamento de ondas descreve como criar, processar e liberar uma onda para gerar trabalho de separação para uma carga, um embarque, uma ordem de produção ou uma ordem kanban; diz que a onda precisa ser processada antes de ser liberada e que, ao ser liberada, o trabalho de separação fica disponível no armazém; que linhas podem ser acrescentadas a uma onda processada enquanto ela não for liberada; e que uma onda processada pode ser cancelada, o que também remove o trabalho de separação criado.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/wave-processing
    entity: 'Microsoft Learn, Dynamics 365 Supply Chain Management, "Wave processing" (atualizada em 27/04/2026)'
    source_date: '2026-04-27'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor; a página não trata de falta na separação. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 Supply Chain Management sobre falta na separação (short pick) diz que a realocação permite ao separador encontrar outro endereço para continuar a separação; que a política pode ser nenhuma (o separador resolve a falta de outro modo), automática, manual (o separador escolhe numa lista de endereços com saldo não reservado) ou automática e manual; e que a exceção de falta pode ajustar para zero o saldo do endereço, liberar reservas, reduzir a quantidade do embarque ou da carga e criar contagem cíclica do endereço.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/tasks/set-up-short-picking-item-reallocation
    entity: 'Microsoft Learn, Dynamics 365 Supply Chain Management, "Set up short picking item reallocation" (atualizada em 04/11/2026)'
    source_date: '2026-11-04'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor; a página não diz o que acontece com o saldo do pedido quando não há realocação possível. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 Supply Chain Management sobre embalagem em estações de packing diz que esse processo acrescenta uma operação entre a separação e o embarque; que cada embalagem (container) se baseia num tipo que define volume e peso máximos, com tara; que a unidade de peso usada no fechamento costuma ser a da balança da estação; que é possível imprimir etiqueta da embalagem na criação e relação de conteúdo no fechamento; que o manifesto registra o peso e o código de rastreio da transportadora; e que, com manifesto manual, a embalagem não pode ser fechada ou liberada antes de concluí-lo.'
    reference: https://learn.microsoft.com/en-in/dynamics365/supply-chain/warehousing/packing-containers
    entity: 'Microsoft Learn, Dynamics 365 Supply Chain Management, "Pack containers for shipment" (atualizada em 22/04/2026)'
    source_date: '2026-04-22'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor, lida na versão en-in do Microsoft Learn; a página não define tolerância de peso. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual da separação por onda no coletor do Senior WMS 8.12 diz que a separação da onda é sempre por nota fiscal; que a tela mostra o código de barras da embalagem, a descrição, o fator de conversão e a quantidade a retirar do endereço; que o botão Pular leva a separação ao próximo endereço; e que o botão Corte pergunta qual a quantidade real que o endereço tem, com o corte físico concluído numa tela de monitoramento e dependente de parâmetro do armazém.'
    reference: https://documentacao.senior.com.br/gestaodearmazenagemwms/8.12/manuais-wms/mobile/gestao-armazenagem-mobile/separacao-onda.html
    entity: 'Senior Sistemas, Portal de Documentação, Gestão de Armazenagem WMS 8.12, "Separação Onda"'
    source_date: null
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor, sem data visível e marcada como em manutenção. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual do Packing Consolidado do Senior WMS 8.12 descreve a separação de todos os pedidos de uma onda por um único usuário, com agrupamento dos produtos que constam em vários pedidos, seguida de triagem e de conferência de packing, que lista a onda e seus pedidos para a montagem dos volumes e só começa depois da triagem.'
    reference: https://documentacao.senior.com.br/gestaodearmazenagemwms/8.12/manuais-wms/manuais-operacionais/expedicao/packing-consolidado.html
    entity: 'Senior Sistemas, Portal de Documentação, Gestão de Armazenagem WMS 8.12, "Packing Consolidado"'
    source_date: null
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a página não trata de peso nem de etiqueta. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O material de treinamento da SAP sobre separação de entregas de saída com o EWM diz que, para a separação, uma tarefa de depósito é criada a partir da ordem de entrega de saída do EWM, procurando o melhor estoque disponível por sequência de tipos de depósito e regra de retirada; e que a quantidade separada é enviada à entrega por uma mensagem própria de confirmação.'
    reference: https://learning.sap.com/courses/configuring-delivery-processing-in-sap-s-4hana-sales/picking-outbound-deliveries-with-ewm
    entity: 'SAP Learning, curso "Configuring Delivery Processing in SAP S/4HANA Sales", lição "Picking Outbound Deliveries with EWM"'
    source_date: null
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a lição não trata de falta na separação nem de embalagem. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo sobre entrega em três etapas descreve a separação (do estoque para uma zona de embalagem), a embalagem (da zona de embalagem para a saída) e o embarque (da saída para o cliente), e diz que, validada a ordem de embalagem, a ordem de entrega fica pronta para ser processada.'
    reference: https://www.odoo.com/documentation/18.0/fr/applications/inventory_and_mrp/inventory/shipping_receiving/daily_operations/delivery_three_steps.html
    entity: 'Odoo, documentação 18.0 (versão em francês), "Three-step delivery"'
    source_date: null
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Documentação de fornecedor, sem data visível. A página da versão 19.0 foi localizada, mas não abriu nesta sessão (erro do servidor e acesso recusado pelo proxy); usada a 18.0. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A página da GS1 sobre o GS1 Logistic Label Guideline (Release 1.3, ratificada em julho de 2019) diz que o único requisito obrigatório é que cada unidade logística seja identificada por um número de série único e que o SSCC é o único elemento obrigatório de todas as etiquetas logísticas GS1.'
    reference: https://www.gs1.org/standards/gs1-logistic-label-guideline
    entity: 'GS1, "GS1 Logistic Label Guideline", Release 1.3'
    source_date: '2019-07-01'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Página de apresentação do guia; o PDF da Release 1.3 não foi aberto. Data de origem registrada como o mês de ratificação informado (julho de 2019).'
  - classification: FATO
    claim: 'A Release 1.2 do GS1 Logistic Label Guideline (setembro de 2017), publicada no ref.gs1.org, descreve a unidade logística como um item de qualquer composição montado para transporte e/ou armazenagem; diz que o SSCC é codificado com o Identificador de Aplicação (00) seguido de 18 dígitos; recomenda que o aviso de embarque liste, para cada unidade logística, seu SSCC e os itens que ela contém; e prevê que transportadores leiam as etiquetas para registrar unidades carregadas e descarregadas.'
    reference: https://ref.gs1.org/guidelines/logistic-label/1.2.0/
    entity: 'GS1, "GS1 Logistics Label Guideline", Release 1.2, ratificada em setembro de 2017 (ref.gs1.org)'
    source_date: '2017-09-01'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Versão anterior à Release 1.3 citada acima; usada só para o formato do SSCC e para as regras de aviso de embarque e leitura no transporte. Confirmar na versão vigente antes de especificar a etiqueta.'
  - classification: FATO
    claim: 'O Anexo 11 do RICMS/SC (NF-e), na página de legislação da Secretaria da Fazenda de Santa Catarina, diz que o arquivo digital da NF-e só poderá ser utilizado como documento fiscal após, entre outras condições, ter seu uso autorizado (art. 4º) e que o DANFE somente poderá ser utilizado para transitar com as mercadorias após a concessão da Autorização de Uso da NF-e, ou na hipótese do art. 11, § 1º, I (contingência) (art. 9º, § 1º).'
    reference: https://legislacao.sef.sc.gov.br/html/regulamentos/icms/ricms_01_11.htm
    entity: 'Secretaria de Estado da Fazenda de Santa Catarina, RICMS/SC-01, Anexo 11 (NF-e), versão com redação passada, página de 20/10/2026'
    source_date: '2026-10-20'
    checked_at: '2026-11-23T15:25:00Z'
    limit: 'Regulamento de um estado, usado só para a regra geral de que a mercadoria não circula com o DANFE antes da autorização; o Ajuste SINIEF 07/05 no CONFAZ não foi aberto nesta sessão. A exceção do art. 11 (contingência) não foi lida em detalhe. Como cada operação deve ser documentada é decisão do contador.'
  - classification: HIPÓTESE
    claim: 'A Distribuidora Exemplo de Materiais Elétricos Ltda., os clientes Alfa, Beta e Gama, a Transportes Exemplo, os pedidos PV 5101, 5102 e 5103, a onda O-1202-1, os itens, endereços, saldos, preços, pesos, taras, tolerâncias, volumes, romaneios, NF-e, horários, indicadores e decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, orientação fiscal nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; contas refeitas em Python (Decimal) em 23/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, transportadora, pedido, nota ou sistema real, nem tolerâncias, metas ou resultados recomendados.
---

*Leitura estimada: 23 minutos.*

**Antes de aceitar a separação de pedidos e a conferência de expedição num sistema, escreva e aprove nove regras: quando um pedido pode ser separado e como os pedidos se agrupam (por pedido, em lote ou em onda); em que ordem de endereços se anda; o que se lê na separação e quando a quantidade pode ser digitada; o que acontece quando o endereço não tem o item, e quem decide entre corte, substituição e pedido parcial; o que se confere na expedição, item a item e volume a volume; qual peso se espera de cada volume e com qual tolerância; o que a etiqueta de volume traz; como os volumes entram no romaneio e no caminhão; e em que momento a NF-e é emitida em relação à separação e à saída.** Depois, teste com uma onda fictícia cujas contas você já fechou à mão: quantidades pedidas, separadas e cortadas, peso de cada volume, volumes de cada romaneio. Sem isso, o sistema mostra o pedido como "separado" com um disjuntor esquecido na bancada, fatura a quantidade pedida e não a separada, e o volume do cliente do centro vai embora no caminhão da transportadora.

**Este artigo não recomenda WMS, ERP, coletor nem fornecedor, e não é orientação fiscal.** A documentação de fornecedores de software (Microsoft Dynamics 365, SAP, Odoo e Senior) aparece só como exemplo de como sistemas costumam modelar a separação e a conferência. Como emitir, corrigir ou cancelar uma nota, e o que fazer com nota emitida para mercadoria que não saiu, é assunto do contador. Empresas, pedidos e números do exemplo são inventados.

## O que a separação no papel faz e o sistema precisa fazer melhor

Em muitas empresas, a separação de pedidos funciona assim: o comercial fecha o pedido, alguém imprime a lista, o separador anda pelo armazém com a lista e uma caneta, risca o que pegou e escreve "falta 3" ao lado do que não achou. Na bancada, o conferente olha a mercadoria contra a lista, fecha a caixa, escreve o nome do cliente com pincel e põe a caixa no canto da transportadora. O faturamento emite a nota a partir do pedido, e o romaneio é uma planilha que o encarregado preenche no fim da tarde.

Funciona enquanto o separador conhece o armazém e o volume é pequeno. Deixa de funcionar quando o "falta 3" não chega ao faturamento e a nota sai com 12 disjuntores para uma caixa com 9; quando duas tomadas de amperagem diferente ficam lado a lado na prateleira; quando a caixa do cliente do centro, que vai no carro próprio, fica no canto da transportadora; ou quando o cliente cancela o pedido às três da tarde e ninguém lembra que ele já estava embalado.

O sistema pode impedir cada um desses erros, mas só se a regra estiver escrita. Ler o código de barras não resolve sozinho: a leitura precisa estar ligada a uma regra (o que se compara, contra o quê, e o que acontece quando não bate).

### Norma, documentação de fornecedor, decisão da empresa e recomendação

Ajuda separar quatro camadas:

- **Norma.** Quase nada deste assunto é norma. A exceção que importa ao desenho: a mercadoria não deve circular com o DANFE antes de a NF-e estar autorizada. Fora isso, a ordem de separar, conferir e faturar é decisão da empresa.
- **Documentação de fornecedores de software.** "Wave" e "short pick" no Dynamics 365, "tarefa de depósito" no SAP EWM, "entrega em três etapas" no Odoo, "corte" e "packing consolidado" no Senior: cada sistema dá um nome e um formato ao fluxo. São exemplos do que costuma ser configurável, não regra.
- **Decisão da empresa.** Como agrupar, o que ler, quem decide a falta, que tolerância de peso aceitar, quando faturar. É essa camada que precisa estar escrita antes de configurar ou programar.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é sugestão de modelagem, não requisito de norma nem comportamento padrão de ferramenta.

## Picking e packing: as etapas e o que este artigo não repete

Picking e packing são as duas metades do mesmo fluxo de saída. **Picking** (separação) é tirar do endereço o item e a quantidade de cada pedido. **Packing** (conferência e embalagem) é conferir o que foi separado, montar os volumes, pesar, etiquetar e deixar pronto para embarque. O Odoo descreve a versão completa como [entrega em três etapas: separação do estoque para uma zona de embalagem, embalagem para a saída e embarque para o cliente](https://www.odoo.com/documentation/18.0/fr/applications/inventory_and_mrp/inventory/shipping_receiving/daily_operations/delivery_three_steps.html), em que a ordem de entrega só fica pronta depois de validada a embalagem. O Dynamics 365 diz que a estação de embalagem [acrescenta uma operação entre a separação e o embarque](https://learn.microsoft.com/en-in/dynamics365/supply-chain/warehousing/packing-containers).

Nem toda empresa precisa das três etapas. Quem separa pouco e embala na própria prateleira pode juntar separação e conferência. O que precisa estar escrito é onde fica cada barreira: em que ponto o sistema compara o que foi pego com o que foi pedido, e em que ponto ele compara o volume com o que deveria estar dentro.

Este artigo não repete assuntos que têm texto próprio aqui no blog:

- **Lote e validade.** Qual lote separar, FEFO e validade mínima do cliente estão em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/). Aqui a regra vale para qualquer item; se o item tem lote, a separação lê também o lote indicado.
- **Equipamento.** Que leitor comprar e como ensaiá-lo com as etiquetas reais está em [leitor de código de barras](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/). Aqui interessa o que o sistema faz com cada leitura.
- **Contagem.** Quando a separação encontra um endereço com menos do que o sistema dizia, a contagem e o ajuste seguem o [inventário](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/).
- **Saldo e canais.** Reserva de saldo e pedidos vindos de marketplace estão em [integração com marketplace](https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/). Aqui o pedido já está liberado para separar.
- **Depois da entrega.** A devolução do cliente segue [devolução e troca](https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/), e o lado de quem recebe a mercadoria é a [conferência da NF-e de entrada](https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/).

## Da carteira ao armazém: quais pedidos entram e como se agrupam

### Quando um pedido pode ser separado

Antes de andar pelo armazém, o sistema precisa saber quais pedidos estão liberados. As perguntas:

- **Condição comercial.** Pedido com pagamento pendente ou crédito em análise não vai para separação. Se a condição vem de um meio de pagamento integrado, a regra de estado está em [integração de pagamentos](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/).
- **Corte de horário.** A transportadora coleta às 16h; o caminhão próprio sai às 13h30. Até que horas um pedido entra na separação do dia, por destino? Pedido que entra depois do corte espera o próximo ciclo, ou alguém pode furar a fila?
- **Prioridade.** Por data de entrada, por data prometida, por cliente, por rota? Quando o estoque não dá para todos, é a prioridade que define quem fica com a falta (mais abaixo).
- **Saldo.** O sistema libera para separação só o pedido com saldo completo, ou também o parcial, sabendo que vai faltar?

### Por pedido, em lote ou em onda

Há três formas comuns de agrupar:

- **Por pedido.** Uma lista por pedido; o separador anda o armazém inteiro para cada um. Simples, sem triagem, mas com mais caminhada.
- **Em lote (batch).** Vários pedidos numa lista só, somada por item; o separador pega 18 disjuntores de uma vez e a divisão por pedido acontece depois, na triagem. Menos caminhada, mais um passo em que se pode errar.
- **Em onda.** Um conjunto de pedidos liberado de uma vez, em geral por corte de horário, rota ou transportadora. A onda pode ser separada por pedido ou em lote. O Dynamics 365 descreve o ciclo de [criar, processar e liberar uma onda; só depois de liberada o trabalho de separação fica disponível no armazém](https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/wave-processing), e uma onda processada pode ser cancelada, o que remove o trabalho criado. O Senior documenta um [packing consolidado em que um único usuário separa a onda inteira, com os produtos repetidos agrupados, seguido de triagem e conferência](https://documentacao.senior.com.br/gestaodearmazenagemwms/8.12/manuais-wms/manuais-operacionais/expedicao/packing-consolidado.html).

O que precisa estar escrito: qual forma vale para qual tipo de pedido; quem monta e libera a onda; o que acontece com o pedido que entra ou muda depois de a onda ser liberada; e o que acontece com a onda em que parte dos pedidos não tem saldo. Liberar a onda é uma ação sobre vários pedidos ao mesmo tempo, e o resultado de cada um precisa aparecer, como em [ações em lote com falha parcial](https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/).

### Ordem de endereços e rota

A lista de separação não segue a ordem do pedido; segue a ordem do armazém. Para isso, cada endereço precisa ter uma posição na rota (rua, prédio, nível), e o sistema ordena as linhas por ela. As decisões:

- **Cadastro de endereços com sequência.** Quem cadastra, e o que acontece quando o layout muda.
- **Um item, vários endereços.** De qual endereço tirar primeiro: o de picking, o mais cheio, o que esvazia antes? Se o item tem lote, a regra de FEFO manda.
- **Itens pesados e frágeis.** Algumas empresas querem os pesados primeiro, para não amassar os leves. É regra de sequência, não de rota.
- **Separação por zona.** Em armazém maior, cada separador fica numa zona e o pedido é montado depois. Isso acrescenta uma consolidação.

O SAP EWM, por exemplo, cria a tarefa de separação a partir da entrega de saída e [procura o melhor estoque disponível por uma sequência de tipos de depósito e uma regra de retirada](https://learning.sap.com/courses/configuring-delivery-processing-in-sap-s-4hana-sales/picking-outbound-deliveries-with-ewm). Num sistema sob medida, a regra de qual endereço e em que ordem precisa estar escrita do mesmo jeito.

## O que se lê na separação: endereço, item e quantidade

A separação com leitor costuma ter três leituras possíveis por linha: o endereço (para provar que o separador está no lugar certo), o item (para provar que pegou o item certo) e a quantidade. A empresa decide quantas faz. O Senior, por exemplo, mostra no coletor [o código de barras da embalagem, a descrição, o fator de conversão e a quantidade a retirar do endereço](https://documentacao.senior.com.br/gestaodearmazenagemwms/8.12/manuais-wms/mobile/gestao-armazenagem-mobile/separacao-onda.html).

- **Ler endereço e item em toda linha.** É o mínimo para que o sistema diga "separado" com algum fundamento.
- **Ler cada unidade ou digitar a quantidade.** Ler cada unidade é mais seguro e mais lento. Digitar a quantidade depois de ler uma unidade é rápido, mas a segunda unidade pode ser de outro item, da prateleira ao lado. Recomendação da Torno: quantidade digitada só quando a separação é por embalagem fechada (caixa de 10 lida pelo código da caixa), ou quando a conferência seguinte lê unidade a unidade.
- **Embalagem e fator.** O item tem código da unidade e código da caixa. O sistema precisa saber que ler a caixa vale 10, e não deixar que ler a unidade dez vezes e ler a caixa uma vez somem 20.
- **Leitura errada.** Item lido que não é o da linha: o sistema recusa com som e mensagem e não conta. Endereço lido que não é o da linha: o sistema não deixa separar dali, a menos que a realocação esteja prevista (próxima seção).
- **Sem sinal.** No fundo do armazém o coletor perde a rede. O que fica guardado no aparelho, e como é enviado depois, segue [sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/). Leitura guardada no coletor não é separação registrada no servidor.

## Falta na separação: corte, substituição, pedido parcial e quem decide

O separador chega ao endereço e o item não está lá, ou está em quantidade menor. É o momento em que o papel mais falha: o "falta 3" escrito à mão não chega a ninguém. O Dynamics 365 chama isso de *short pick* e oferece [realocação para outro endereço, automática ou escolhida pelo separador numa lista de endereços com saldo não reservado](https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/tasks/set-up-short-picking-item-reallocation); a mesma página mostra que a exceção pode zerar o saldo do endereço, liberar reservas, reduzir a quantidade da carga e abrir contagem do endereço. O Senior tem os botões [Pular, que leva ao próximo endereço, e Corte, que pergunta quantas unidades o endereço tem de fato](https://documentacao.senior.com.br/gestaodearmazenagemwms/8.12/manuais-wms/mobile/gestao-armazenagem-mobile/separacao-onda.html).

Há duas decisões diferentes, e convém não misturar:

**1. O que o separador faz no endereço (operação).**

- Informa a quantidade que encontrou. O sistema não pede "quanto falta": pede "quanto tem".
- Tenta outro endereço do mesmo item, se houver saldo e a regra permitir.
- O endereço vai para contagem. Se o sistema dizia 18 e havia 15, o saldo do endereço está errado, e o ajuste segue o [inventário](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/), com motivo e aprovação, não pelo próprio separador.

**2. O que acontece com o pedido (comercial).**

- **Qual pedido fica com a falta.** Numa onda em lote, 15 disjuntores encontrados para 18 unidades pedidas por dois pedidos: quem recebe 9 e quem recebe 6? A regra de prioridade decide, e precisa estar escrita: data de entrada, cliente que não aceita parcial primeiro, ou decisão caso a caso.
- **Pedido parcial e saldo.** O cliente aceita entrega parcial? O saldo vira pendência no mesmo pedido, um pedido novo ou é cancelado? Isso fica no cadastro do cliente ou no pedido, não na cabeça do comercial.
- **Substituição.** Um item equivalente (outra marca, outra embalagem) só entra com regra: lista de equivalentes cadastrada, aceite do cliente e preço definido. Recomendação da Torno: a substituição nunca é decisão do separador; é do comercial, e o pedido é alterado antes da conferência.
- **Limite para decisão humana.** Corte pequeno em cliente que aceita parcial segue com aviso; corte grande, ou em cliente que não aceita parcial, para e espera o comercial. Defina "pequeno" (percentual do valor, número de linhas) e o prazo para o comercial responder antes do corte de horário.
- **Aviso ao cliente.** Quem avisa, por qual canal, e se o aviso sai antes ou depois da nota.

O resultado precisa chegar ao faturamento antes da nota. É a relação mais importante deste artigo, e está mais abaixo.

## Conferência de expedição: itens, volumes, embalagem e peso

A conferência de expedição é a segunda barreira. O conferente lê de novo o que foi separado, agora pedido a pedido, e monta os volumes. Se a separação foi em lote, a conferência começa com a triagem: dividir os 18 disjuntores entre os pedidos.

### Itens

- **Leitura unidade a unidade ou por embalagem fechada**, com a mesma regra da separação.
- **Item errado.** A conferência acusa e não fecha o volume. Alguém troca o item, e a troca fica registrada como erro de separação (é dela que sai o indicador de acuracidade).
- **Leitura duplicada.** O leitor bipa duas vezes a mesma unidade. O sistema conta duas. Não há como o software saber que foi a mesma unidade; por isso o peso existe.
- **Sobra.** Sobrou um item na bancada depois de fechados os volumes do pedido. A sobra é sinal de que algum volume está com menos do que o sistema registrou.

### Volumes e embalagem

- **Tipo de embalagem.** Caixa P, caixa M, palete. Cada tipo tem tara e limites. O Dynamics 365 define o tipo de embalagem com [volume e peso máximos e tara](https://learn.microsoft.com/en-in/dynamics365/supply-chain/warehousing/packing-containers).
- **Quantos volumes.** O sistema sugere ou o conferente decide? O número total precisa estar fechado antes da etiqueta "1 de 2".
- **Conteúdo de cada volume.** O sistema guarda o que foi para cada caixa. É isso que permite responder "o disjuntor está em qual das duas caixas?" quando o cliente reclama.
- **Reabrir volume.** Volume fechado pode ser reaberto, por quem, com motivo, e o peso e a etiqueta são refeitos.

### Peso

O peso é a conferência que não depende de leitura. O sistema calcula o peso esperado do volume (soma do peso cadastrado de cada item mais a tara da embalagem) e compara com o que a balança marcou. O Dynamics 365 lembra que a unidade de peso no fechamento [costuma ser a da balança da estação](https://learn.microsoft.com/en-in/dynamics365/supply-chain/warehousing/packing-containers).

As decisões:

- **Peso cadastrado de todos os itens.** Sem isso, não há peso esperado. Item sem peso no cadastro é pendência antes do go-live, não depois.
- **Tolerância.** Percentual, valor absoluto ou o maior dos dois? Percentual sozinho é apertado demais em caixas leves; valor sozinho é largo demais em caixas leves e apertado em paletes. Recomendação da Torno: o maior entre um percentual e um mínimo em quilos, e uma tolerância menor que o peso do item mais leve que costuma faltar, para que a falta de uma unidade apareça.
- **Fora da tolerância.** O volume não fecha. O conferente reabre, confere de novo e fecha com o peso novo; ou alguém com permissão aceita o peso com motivo (balança com defeito, peso de cadastro errado). Aceitar sem motivo não pode.
- **Balança integrada ou digitada.** Peso digitado pode ser o esperado copiado. Se for digitado, ao menos registre que foi.

## Etiqueta de volume, SSCC e romaneio

### Etiqueta de volume

A etiqueta liga a caixa física ao registro no sistema. O mínimo: identificador único do volume, pedido, cliente, destino, transportadora ou rota, "volume x de y" e, depois do faturamento, o número da nota. Que campos, em que tamanho e com que código de barras é decisão da empresa e, muitas vezes, do cliente.

Alguns clientes, em geral redes e grandes distribuidores, exigem a etiqueta logística GS1. Nela, segundo a GS1, [o único requisito obrigatório é que cada unidade logística seja identificada por um número de série único, e o SSCC é o único elemento obrigatório de todas as etiquetas logísticas GS1](https://www.gs1.org/standards/gs1-logistic-label-guideline). O SSCC é codificado com o [Identificador de Aplicação (00) seguido de 18 dígitos](https://ref.gs1.org/guidelines/logistic-label/1.2.0/), e a mesma versão do guia recomenda que o aviso de embarque liste o SSCC de cada unidade e os itens que ela contém. Para o sistema, isso significa: gerar o número a partir do prefixo de empresa GS1 da própria empresa, nunca repetir, guardar o conteúdo de cada volume e, se o cliente pedir, mandar a relação eletronicamente. Este artigo não detalha o leiaute da etiqueta; confirme na versão vigente do guia e com o cliente.

O que precisa estar escrito sobre a etiqueta:

- **Quando imprime.** Na abertura do volume, no fechamento ou depois da nota? Etiqueta impressa antes do fechamento pode ir para a caixa errada.
- **Reimpressão.** Quem pode reimprimir, e a reimpressão traz o mesmo identificador (não um novo). Etiqueta reimpressa fica registrada.
- **Volume reaberto.** Se o conteúdo muda, a etiqueta antiga é inutilizada e o sistema sabe qual vale.

### Romaneio por transportadora ou rota

O romaneio de carga é a lista dos volumes que vão num veículo: pedido, nota, cliente, quantidade de volumes e peso, com o total do veículo. É ele que o motorista ou a transportadora assina. No papel, é montado de memória; no sistema, deve sair do que foi conferido.

- **Agrupamento.** Um romaneio por transportadora, por rota ou por veículo, por ciclo de coleta.
- **Peso no romaneio.** O pesado ou o calculado? Recomendação da Torno: o pesado, com o calculado ao lado para conferência.
- **Carregamento com leitura.** Cada volume lido na doca antes de entrar no veículo. Volume de outro romaneio é recusado; volume faltando impede fechar o romaneio. O guia da GS1 prevê que [transportadores leiam as etiquetas para registrar unidades carregadas e descarregadas](https://ref.gs1.org/guidelines/logistic-label/1.2.0/); a mesma lógica serve para a doca da própria empresa.
- **Código de rastreio.** Quando a transportadora fornece etiqueta e rastreio próprios, o Dynamics 365 mostra que [o manifesto registra o peso e o código de rastreio, e a embalagem não pode ser liberada antes do manifesto](https://learn.microsoft.com/en-in/dynamics365/supply-chain/warehousing/packing-containers). Escreva se o seu fluxo exige o rastreio antes de fechar.
- **Documento.** O romaneio impresso sai de um modelo, com os dados congelados no momento da emissão, como em [documentos gerados por modelo](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/).

Roteirização de entregas, frete, CT-e e MDF-e ficam fora deste artigo.

## Separação, NF-e e saída: em que ordem

A pergunta que mais gera retrabalho: a nota é emitida antes ou depois da separação?

A regra fiscal que afeta o desenho é simples. No Anexo 11 do regulamento do ICMS de Santa Catarina, por exemplo, [o DANFE somente poderá ser utilizado para transitar com as mercadorias após a concessão da Autorização de Uso da NF-e](https://legislacao.sef.sc.gov.br/html/regulamentos/icms/ricms_01_11.htm) (art. 9º, § 1º, com uma ressalva para contingência). A NF-e segue regras nacionais do Ajuste SINIEF 07/05, mas li a regra no regulamento catarinense; o texto do ajuste no CONFAZ não foi aberto nesta pesquisa. Ou seja: a nota autorizada precisa existir antes de o caminhão sair. Quando ela é emitida dentro desse intervalo é decisão da empresa.

Dois modelos comuns:

- **Faturar antes de separar.** A nota sai com o pedido; a separação segue a nota. É comum em empresas pequenas e no papel. O problema: quando a separação encontra falta, a nota já diz 12 e a caixa tem 9. Corrigir uma nota autorizada, ou cancelá-la e emitir outra, é procedimento fiscal com regras próprias, e não é algo que a separação deveria provocar todos os dias.
- **Separar, conferir e faturar o conferido.** A nota é emitida depois da conferência, com a quantidade que de fato está nos volumes, a quantidade de volumes e o peso. O corte já aconteceu, e a nota nasce certa. O custo é esperar a autorização antes de liberar o carregamento.

Recomendação da Torno: o segundo modelo, com bloqueio de carregamento para volume cuja nota não está autorizada. Se a empresa precisa do primeiro modelo (por exemplo, porque o cliente paga antes por boleto da nota), escreva o que acontece quando a separação diverge da nota, e combine o procedimento com o fiscal e o contador. Quais campos a nota leva (volumes, pesos, transportadora) e como preenchê-los é do fiscal; quem emite segue o próprio leiaute, como em [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/).

## Cancelamento e alteração depois de separado

O pedido muda quando a mercadoria já não está mais na prateleira. Escreva o que acontece em cada estado, porque a resposta muda:

| Estado do pedido | Cancelamento | Alteração (incluir ou tirar item) |
|---|---|---|
| Liberado, separação não começou | Sai da onda; nada a devolver | Altera o pedido; a lista é refeita |
| Separado, não conferido | Tarefa de devolução ao endereço, com leitura | Separação complementar ou devolução da sobra |
| Conferido e embalado, sem nota | Volume desfeito; itens voltam ao endereço com leitura; etiqueta inutilizada | Volume reaberto, conferido de novo, peso e etiqueta refeitos |
| Nota autorizada, não carregado | Volume retido; o que fazer com a nota é do fiscal | Em geral, não altera: nova nota ou novo pedido, conforme o fiscal |
| Carregado | Volume retirado do veículo com leitura; romaneio refeito; nota com o fiscal | Não altera; segue como devolução ou novo pedido |

Três cuidados:

- **Pedir o cancelamento não é estar cancelado.** O comercial registra o pedido de cancelamento; a operação confirma o que já aconteceu com a mercadoria, como em [cancelamento de solicitação](https://tornostudio.com/blog/cancelamento-solicitacao-sistema/).
- **O aviso pode chegar tarde.** Quando o cancelamento vem de uma integração (marketplace, portal do cliente), ele pode chegar depois da conferência ou fora de ordem, como em [eventos fora de ordem](https://tornostudio.com/blog/integracao-eventos-fora-ordem/). O sistema precisa travar o volume na conferência ou na doca, não só mudar o estado do pedido.
- **Voltar ao estoque é movimento.** O item separado e não expedido volta a um endereço, lido, e só então conta como disponível. Mercadoria "em algum lugar da bancada" não é saldo.

## Indicadores: definir antes de medir

Indicador de expedição sem definição escrita vira número que cada área calcula de um jeito, como em [números divergentes no painel](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/). Este artigo não traz metas nem números de mercado; traz definições para a empresa escolher:

- **Acuracidade de separação por linha.** Linhas de pedido separadas sem erro ÷ linhas de pedido separadas, no período. "Erro" é o que a conferência encontrou: item errado, quantidade a mais ou a menos do que o separador registrou.
- **Acuracidade de separação por unidade.** Unidades separadas sem erro ÷ unidades separadas. Uma caixa de 10 do item errado pesa 1 linha no primeiro indicador e 10 unidades no segundo; os dois dão números bem diferentes, e é preciso dizer qual é o oficial.
- **Onde se mede.** Acuracidade medida na conferência não vê o erro que a conferência deixou passar. O que o cliente reclama depois da entrega é outro indicador, com outra fonte.
- **Taxa de corte.** Unidades (ou linhas, ou valor) cortadas ÷ unidades pedidas. Corte por falta no endereço e corte por falta de saldo na liberação são causas diferentes e merecem contagem separada.
- **Divergência de peso.** Volumes que não fecharam na primeira pesagem ÷ volumes fechados.

Para todos: o que entra no denominador (pedidos cancelados? substituições?), o período, e quem pode ver o registro de cada erro.

## Trilha

Cada passo guarda quem, quando e o quê: liberação da onda, leitura de endereço e item na separação, quantidade encontrada, corte e decisão do comercial, substituição, triagem, conteúdo de cada volume, peso lido e tolerância, reabertura e motivo, etiqueta e reimpressão, emissão da nota, leitura na doca, fechamento do romaneio, cancelamento e devolução ao endereço. O que um registro desses precisa ter está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Quem pode cortar, substituir, reabrir volume, aceitar peso fora da tolerância e liberar carregamento segue as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Condição para liberar pedido para separação (pagamento, crédito, saldo) | Comercial e financeiro |
| Corte de horário por transportadora e rota | Logística, com comercial |
| Prioridade entre pedidos quando falta estoque | Comercial |
| Separação por pedido, em lote ou em onda, e quem libera a onda | Logística (armazém) |
| Cadastro e sequência de endereços; de qual endereço tirar primeiro | Logística (armazém) |
| O que se lê na separação e quando a quantidade pode ser digitada | Logística, com TI |
| Falta no endereço: realocação, contagem e ajuste | Logística; ajuste conforme o inventário |
| Corte, pedido parcial, saldo pendente e limite para decisão humana | Comercial |
| Substituição de item e lista de equivalentes | Comercial, com compras |
| O que se confere na expedição e regra de reabertura de volume | Logística (expedição) |
| Peso cadastrado, taras e tolerância de peso | Logística, com cadastro de itens |
| Conteúdo da etiqueta e SSCC | Logística, com comercial (exigência do cliente) |
| Romaneio, leitura no carregamento e rastreio da transportadora | Logística (expedição) |
| Momento da emissão da NF-e em relação à separação e à saída | Fiscal e logística, com o contador |
| Cancelamento e alteração em cada estado | Comercial (pedido), logística (mercadoria), fiscal (nota) |
| Definição dos indicadores e quem vê | Direção, com logística |
| Perfis: cortar, substituir, reabrir, aceitar peso, liberar carregamento | Direção e logística, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Exemplo de Materiais Elétricos Ltda. vende para lojas e instaladores. Na quarta-feira, 02/12/2026, três pedidos entram na onda O-1202-1, com corte às 10h30. A Transportes Exemplo coleta às 16h00; o carro próprio, rota Centro, sai às 13h30.

| Item | Código | Endereço | Saldo no sistema | Peso unitário | Preço |
|---|---|---|---|---|---|
| Cabo flexível 2,5 mm, rolo 100 m | CB-25 | A-03-1 | 30 rolos | 3,10 kg | R$ 289,90 |
| Disjuntor bipolar 32 A | DJ-32 | B-07-2 | 18 UN | 0,24 kg | R$ 38,50 |
| Fita isolante 20 m | FT-20 | C-01-1 | 200 UN | 0,05 kg | R$ 6,90 |
| Tomada 10 A (caixa de 10) | TM-10 | C-04-3 | 120 UN | 0,09 kg | R$ 12,40 |

Os endereços seguem rua, prédio e nível: C-04-3 é a rua C, prédio 04, nível 3. Logo acima da TM-10, no nível 4 do mesmo prédio (C-04-4), fica a tomada 20 A (TM-20), com caixa de cor e tamanho iguais.

| Pedido | Cliente | Destino | Itens | Valor | Aceita parcial? |
|---|---|---|---|---|---|
| PV 5101 | Cliente Alfa | Transportes Exemplo | 4 CB-25, 12 DJ-32, 20 FT-20 | R$ 1.759,60 | Sim, saldo fica pendente |
| PV 5102 | Cliente Beta | Transportes Exemplo | 2 CB-25, 50 TM-10 | R$ 1.199,80 | Sim |
| PV 5103 | Cliente Gama | Rota Centro | 6 DJ-32, 40 FT-20 | R$ 507,00 | Não |

Regras da empresa (escolhas do exemplo, não recomendação):

- **Agrupamento.** A onda é separada em lote, somada por item, em ordem de endereço; a triagem por pedido acontece na bancada de conferência. São 7 linhas de pedido e 4 paradas: 6 CB-25, 18 DJ-32, 60 FT-20 e 50 TM-10, 134 unidades.
- **Leitura na separação.** Endereço e item em toda parada. Quantidade digitada permitida depois de ler uma unidade ou uma caixa. Na conferência, toda unidade ou caixa fechada é lida.
- **Falta.** O separador informa quanto encontrou; o endereço vai para contagem. A falta vai primeiro para quem aceita parcial, e dentro deles para o pedido mais recente. Corte de até 10% do valor do pedido, em cliente que aceita parcial, segue com aviso ao comercial; acima, para e espera o comercial. Substituição só com aceite do cliente registrado pelo comercial.
- **Peso.** Tara: caixa P 0,40 kg, caixa M 0,65 kg. Tolerância por volume: o maior entre 2% do peso esperado e 0,05 kg. Fora da tolerância, o volume não fecha.
- **Nota.** Emitida depois da conferência, com a quantidade conferida. Volume sem nota autorizada não é lido na doca.
- **Romaneio.** Um por destino e ciclo, com o peso lido na balança. Cada volume é lido na doca.

**10h40.** O supervisor libera a onda O-1202-1. **10h45 a 11h15**, a separação em lote:

- A-03-1: 6 rolos de CB-25 lidos um a um. Sem divergência.
- B-07-2: o sistema pede 18 DJ-32; o separador encontra 15 e informa 15. O endereço vai para contagem. Falta de 3 unidades. O PV 5103 não aceita parcial e recebe os 6; entre os que aceitam, só o PV 5101 tem DJ-32 e recebe 9 de 12. Corte de 3 × R$ 38,50 = R$ 115,50, que é 6,56% de R$ 1.759,60, abaixo de 10%: segue, com aviso ao comercial. O PV 5101 passa a valer R$ 1.644,10, com 3 DJ-32 pendentes.
- C-01-1: 60 FT-20, em 6 pacotes de 10, cada pacote lido pelo código do pacote. Sem divergência.
- C-04-3: o separador lê a primeira caixa de TM-10 e digita 5. Sem perceber, pegou a quinta caixa do nível de cima, o C-04-4: é TM-20.

Separadas: 6 + 15 + 60 + 50 = 131 unidades.

![Ilustração de uma planta baixa vista de cima do armazém da Distribuidora Exemplo de Materiais Elétricos Ltda., com três ruas de prateleiras, A, B e C, divididas em prédios de 01 a 08, a bancada de conferência e as docas 1 e 2. Uma linha tracejada azul mostra a rota da separação em lote da onda O-1202-1, liberada às 10h40 de 02/12/2026: sai da bancada, percorre a rua A da esquerda para a direita, a rua B da direita para a esquerda e a rua C da esquerda para a direita, e volta à bancada. Quatro paradas numeradas, em ordem de endereço: 1, A-03-1, verde; 2, B-07-2, vermelha; 3, C-01-1, verde; 4, C-04-3, amarela, com a nota de que no nível 3 do prédio C-04 fica a TM-10 e no nível 4, logo acima, a TM-20, de caixa igual. Na legenda abaixo da planta: 1, cabo CB-25, 6 rolos lidos um a um, sem divergência; 2, disjuntor DJ-32, sistema 18, encontrado 15, falta de 3, endereço vai para contagem, o PV 5103, que não aceita parcial, recebe 6, e o PV 5101 recebe 9 de 12, corte de R$ 115,50, 6,56%, abaixo do limite de 10%, segue com aviso ao comercial; 3, fita FT-20, 6 pacotes de 10, cada pacote lido pelo código, sem divergência; 4, tomada TM-10, primeira caixa lida e quantidade 5 digitada, e a quinta caixa pode vir do nível de cima, C-04-4, a TM-20. Um quadro compara: por pedido, 7 paradas, uma por linha de pedido; em lote, 4 paradas mais a divisão por pedido na bancada. No rodapé: 134 unidades pedidas, 131 separadas. Exemplo fictício.](./torno-separacao-planta-rota.svg)

*Exemplo fictício: armazém, endereços, itens, saldos e quantidades inventados; a rota segue a sequência de endereços, e a falta e o risco de item vizinho aparecem onde acontecem. Ilustração original Torno, 2026.*

**11h20 a 12h05**, triagem e conferência na bancada:

- A conferência lê as caixas de TM-10 do PV 5102 uma a uma e recusa a quinta: TM-20 não pertence ao pedido. O conferente troca pela TM-10 correta, e o sistema registra um erro de separação na linha de TM-10 do PV 5102.
- PV 5101, volume 1 de 2: 4 rolos de CB-25 em caixa M. Esperado: 4 × 3,10 + 0,65 = 13,05 kg; tolerância 0,26 kg; a balança marca 13,12 kg. Fecha.
- PV 5101, volume 2 de 2: 9 DJ-32 e 20 FT-20 em caixa P. Esperado: 9 × 0,24 + 20 × 0,05 + 0,40 = 3,56 kg; tolerância de 0,07 kg (2% de 3,56 = 0,0712 kg). A balança marca 3,32 kg: 0,24 kg a menos, 6,74%. O volume não fecha. O conferente reabre: o leitor bipou duas vezes o oitavo disjuntor, e o nono ficou na bancada. Ele põe o nono disjuntor na caixa e pesa de novo: 3,55 kg, 0,01 kg abaixo do esperado. Fecha, com a reabertura registrada. Note o limite da regra que a empresa fictícia escolheu: a tolerância de 0,07 kg é maior que o peso de uma fita FT-20 (0,05 kg), então a falta de uma fita avulsa passaria pela balança; só a contagem da leitura a pegaria. É o caso que a recomendação acima, de tolerância menor que o item mais leve, procura evitar.
- PV 5102, volume 1 de 1: 2 CB-25 e 50 TM-10 em caixa M. Esperado 2 × 3,10 + 50 × 0,09 + 0,65 = 11,35 kg; tolerância 0,23 kg; a balança marca 11,30 kg. Fecha.
- PV 5103, volume 1 de 1: 6 DJ-32 e 40 FT-20 em caixa P. Esperado 6 × 0,24 + 40 × 0,05 + 0,40 = 3,84 kg; tolerância 0,08 kg; a balança marca 3,86 kg. Fecha.

![Ilustração em estilo raio-x do volume 2 de 2 do PV 5101, Cliente Alfa, da Distribuidora Exemplo de Materiais Elétricos Ltda., uma caixa P vista através das paredes sobre uma balança que marca 3,32 kg. Dentro da caixa aparecem 8 disjuntores DJ-32 e 20 fitas FT-20; o nono disjuntor ficou na bancada, com um círculo vermelho. Ao lado, a tela da conferência mostra nove leituras de DJ-32 e o total contado de 9, com a nona leitura em vermelho: mesma unidade da oitava, leitura dupla; e FT-20 em 2 pacotes de 10. Abaixo, a conta do peso esperado: 9 vezes 0,24 kg, mais 20 vezes 0,05 kg, mais a tara de 0,40 kg, igual a 3,56 kg; tolerância de 0,07 kg, o maior entre 2% (0,0712 kg) e 0,05 kg; faixa aceita de 3,49 a 3,63 kg, desenhada numa régua de 3,20 a 3,70 kg. Primeira pesagem às 11h40: 3,32 kg, 0,24 kg a menos, 6,74%, fora da tolerância, volume não fecha. Depois da reabertura com motivo: 3,55 kg, 0,01 kg a menos, dentro da tolerância, volume fechado. Embaixo, a etiqueta de volume: VOL-5101-2, volume 2 de 2, PV 5101, Cliente Alfa, Transportes Exemplo, 3,55 kg, NF-e 8.801 preenchida depois da emissão, com barras ilustrativas. Exemplo fictício.](./torno-separacao-raio-x-volume.svg)

*Exemplo fictício: itens, pesos, taras, tolerância e etiqueta inventados; a leitura dupla passa pela contagem do leitor, e o peso esperado a acusa. Ilustração original Torno, 2026.*

**12h20.** O faturamento emite as notas com a quantidade conferida, e todas são autorizadas: NF-e 8.801 (PV 5101, R$ 1.644,10, 2 volumes), 8.802 (PV 5102, R$ 1.199,80, 1 volume) e 8.803 (PV 5103, R$ 507,00, 1 volume). No exemplo, impostos e frete ficam fora da conta. Total faturado: R$ 3.350,90.

**13h15.** Romaneio R-0413, rota Centro: PV 5103, 1 volume, 3,86 kg. O volume é lido na doca 2 e o carro sai às 13h30.

**15h30.** Romaneio R-0412, Transportes Exemplo: PV 5101 com 2 volumes (13,12 + 3,55 kg) e PV 5102 com 1 volume (11,30 kg); 3 volumes, 27,97 kg pesados (27,96 kg calculados). Os três são lidos na doca 1; o romaneio fecha e o motorista assina às 15h50.

Indicadores da onda, pelas definições da empresa:

- Acuracidade de separação por linha: 6 de 7 linhas sem erro, 85,71%.
- Acuracidade de separação por unidade: 121 de 131 unidades sem erro (a caixa errada tem 10 unidades), 92,37%.
- Taxa de corte: 3 de 134 unidades pedidas, 2,24%; por linha, 1 de 7, 14,29%.
- Divergência de peso: 1 de 4 volumes não fechou na primeira pesagem. A leitura dupla foi erro de conferência, não de separação, e não entra na acuracidade de separação.

![Ilustração vista de cima de duas docas da Distribuidora Exemplo de Materiais Elétricos Ltda. em 02/12/2026. Doca 1, caminhão da Transportes Exemplo, romaneio R-0412, coleta às 16h00: três caixas lidas, VOL-5101-1, PV 5101, NF-e 8.801, 13,12 kg; VOL-5101-2, PV 5101, NF-e 8.801, 3,55 kg; VOL-5102-1, PV 5102, NF-e 8.802, 11,30 kg; total 3 volumes, 27,97 kg pesados contra 27,96 kg calculados; romaneio fechado às 15h50. Doca 2, carro próprio, rota Centro, romaneio R-0413: VOL-5103-1, PV 5103, NF-e 8.803, 3,86 kg, saída às 13h30. Abaixo, dois quadros tracejados em vermelho mostram simulações: o volume VOL-5103-1 lido na doca 1, no romaneio R-0412, é recusado como volume de outro romaneio, porque pertence ao R-0413, rota Centro; e um volume sem NF-e autorizada é recusado na leitura da doca. Exemplo fictício.](./torno-separacao-docas-romaneio.svg)

*Exemplo fictício: docas, veículos, volumes, notas, pesos e horários inventados; cada volume entra no veículo por leitura, contra o romaneio gerado do que foi conferido. Ilustração original Torno, 2026.*

Monte os cenários em um ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com pedidos, endereços e saldos fictícios e, se houver emissão de nota, no ambiente de homologação da SEFAZ, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Liberação da onda O-1202-1 às 10h40 com PV 5101, 5102 e 5103 | Uma lista em lote com 4 paradas em ordem de endereço (A-03-1, B-07-2, C-01-1, C-04-3) e 134 unidades; resultado da liberação por pedido | Lista de separação e registro da liberação |
| Simulação: pedido com pagamento pendente incluído na onda | Não entra na onda; aparece no resultado com o motivo | Resultado da liberação |
| Simulação: pedido da Transportes Exemplo criado às 10h35 | Fica para o próximo ciclo, salvo inclusão por perfil autorizado com motivo | Situação do pedido e registro |
| Leitura do endereço B-07-2 quando a linha pede A-03-1 | Recusada com som e mensagem; nada é separado | Registro da tentativa |
| Leitura de FT-20 na linha de DJ-32 | Recusada; quantidade não muda | Registro da tentativa |
| Leitura do código do pacote de 10 de FT-20 | Conta 10 unidades; ler a unidade e o pacote do mesmo item soma corretamente | Linha da separação |
| B-07-2 com 15 encontrados para 18 pedidos | Falta de 3 registrada; endereço enviado para contagem; saldo não é ajustado pelo separador | Linha da separação e tarefa de contagem |
| Distribuição da falta do DJ-32 | PV 5103 (não aceita parcial) recebe 6; PV 5101 recebe 9 de 12; 3 pendentes no PV 5101 | Resultado da triagem e saldo do pedido |
| Corte de R$ 115,50 no PV 5101 (6,56%) | Segue com aviso ao comercial; PV 5101 passa a R$ 1.644,10 | Aviso e valor do pedido |
| Simulação: corte de 5 DJ-32 no PV 5101 (R$ 192,50, 10,94%) | Para e espera decisão do comercial antes da conferência | Pendência com o comercial |
| Simulação: falta no DJ-32 do PV 5103, que não aceita parcial | Pedido não segue para conferência sem decisão do comercial | Pendência com o comercial |
| Simulação: separador tenta trocar DJ-32 por outro disjuntor | Negado; substituição só pelo comercial, com aceite do cliente registrado | Tentativa negada |
| Simulação: comercial registra substituição com aceite do cliente | Pedido alterado antes da conferência, com item, preço e autor | Histórico do pedido |
| Simulação: coletor sem sinal no corredor C | Leituras guardadas e enviadas ao voltar a conexão, sem duplicar; o servidor só mostra separado depois de receber | Registro de sincronização |
| Quinta caixa de TM-10 é TM-20, lida na conferência | Recusada; volume não fecha; erro de separação registrado na linha de TM-10 do PV 5102 | Registro de conferência |
| Volume 1 de 2 do PV 5101: 13,12 kg para 13,05 esperados | Dentro de 0,26 kg; volume fechado | Peso esperado, lido e tolerância |
| Volume 2 de 2 do PV 5101: 3,32 kg para 3,56 esperados | 0,24 kg a menos, 6,74%, fora de 0,07 kg; volume não fecha | Registro da pesagem |
| Reabertura do volume 2 com motivo "leitura dupla" e nova pesagem de 3,55 kg | Volume fechado; primeira pesagem e reabertura no histórico | Histórico do volume |
| Simulação: reabertura sem motivo | Recusada | Tentativa recusada |
| Simulação: conferente aceita peso fora da tolerância | Negado; só perfil autorizado, com motivo | Tentativa negada |
| Simulação: item sem peso cadastrado na conferência | Volume não fecha; pendência de cadastro | Mensagem e pendência |
| Volumes do PV 5102 (11,30 kg) e PV 5103 (3,86 kg) | Dentro de 0,23 kg e 0,08 kg; fechados | Registros das pesagens |
| Etiqueta do volume 2 do PV 5101 | VOL-5101-2, PV 5101, Cliente Alfa, Transportes Exemplo, 2 de 2, peso; número da nota depois da emissão | Etiqueta impressa ou arquivo |
| Simulação: reimpressão da etiqueta | Mesmo identificador; reimpressão registrada com autor | Registro de impressão |
| Simulação: cliente que exige SSCC | SSCC gerado com o prefixo da empresa, sem repetir; conteúdo do volume ligado ao número | Registro do volume |
| NF-e emitidas às 12h20 | 8.801 com 9 DJ-32 e R$ 1.644,10; 8.802 com R$ 1.199,80; 8.803 com R$ 507,00; total R$ 3.350,90 | Notas em homologação e pedido |
| Simulação: leitura na doca de volume sem nota autorizada | Recusada | Tentativa recusada |
| Romaneio R-0413, rota Centro, às 13h15 | 1 volume, PV 5103, NF-e 8.803, 3,86 kg | Romaneio |
| Simulação: VOL-5103-1 lido na doca 1, romaneio R-0412 | Recusado: volume de outro romaneio | Tentativa recusada |
| Romaneio R-0412, Transportes Exemplo | 3 volumes, 27,97 kg pesados (27,96 calculados); fecha só com os 3 lidos | Romaneio e leituras |
| Simulação: tentativa de fechar R-0412 com 2 volumes lidos | Negada; mostra o volume faltante | Tentativa negada |
| Simulação: PV 5102 cancelado às 11h50, já conferido, sem nota | Volume desfeito; itens voltam aos endereços com leitura; etiqueta inutilizada | Movimentos de devolução e histórico |
| Simulação: PV 5102 cancelado às 15h40, já carregado | Volume retirado com leitura; R-0412 refeito com 2 volumes e 16,67 kg; nota encaminhada ao fiscal | Romaneio refeito e aviso ao fiscal |
| Simulação: inclusão de 10 TM-10 no PV 5102 depois de conferido, sem nota | Volume reaberto, conferido e pesado de novo; nova etiqueta | Histórico do volume |
| Indicadores da onda | Acuracidade por linha 85,71% (6 de 7); por unidade 92,37% (121 de 131); corte 2,24% das unidades e 14,29% das linhas; 1 de 4 volumes com divergência de peso | Relatório com a regra de cálculo |
| Histórico do PV 5101 | Liberação, separação, falta e corte, aviso, triagem, volumes, pesagens, reabertura, nota, leitura na doca e romaneio, com autor e horário | Trilha do pedido |

*Fim do exemplo fictício. Distribuidora, clientes, transportadora, pedidos, itens, endereços, saldos, preços, pesos, taras, tolerâncias, notas, romaneios, horários, indicadores e decisões são modelo editorial, sem cliente real nem sistema entregue; as escolhas do exemplo são da empresa fictícia, não regras recomendadas, metas, orientação fiscal nem comportamento padrão de ferramenta.*

Antes do go-live, pegue os pedidos de uma semana e confira, num ambiente de teste: quantos itens não têm endereço, sequência ou peso cadastrado; quantas linhas teriam falta com o saldo atual; quantos clientes não têm a regra de pedido parcial definida; e quantas notas do período foram emitidas com quantidade diferente da expedida. Se a separação vai ser um módulo ligado ao ERP atual, reúna o que for preciso como em [integração com ERP: o que reunir antes de pedir orçamento](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/). Se a dúvida ainda é se vale sair da lista impressa e da planilha de romaneio, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Preciso de um WMS para ter separação e conferência no sistema?

Não necessariamente, e este artigo não recomenda um modelo. Um WMS costuma trazer onda, realocação, embalagem e manifesto prontos; um ERP pode ter uma parte disso; um módulo sob medida pode fazer só o que a operação precisa. Em qualquer dos três, as regras desta página precisam estar escritas, e o aceite é o mesmo: a onda fictícia com as contas fechadas.

### Conferir tudo de novo na expedição não é retrabalho?

É uma segunda leitura, e o custo dela precisa ser comparado com o custo do erro que ela pega. Algumas empresas leem cada unidade na separação e conferem por peso na expedição; outras separam com quantidade digitada e leem tudo na conferência. O que não funciona é nenhuma das duas barreiras comparar item e quantidade.

### A nota pode ser emitida antes da separação?

Pode, e muitas empresas fazem assim. A regra fiscal que afeta o desenho é que a mercadoria não circula com o DANFE antes de a nota estar autorizada. O problema de faturar antes é a falta descoberta depois, com a nota já autorizada; como corrigir é com o fiscal e o contador. Se a empresa escolher faturar antes, escreva o que a separação faz quando diverge da nota.

### Qual acuracidade de separação é boa?

Este artigo não traz número de referência. Antes de comparar com qualquer meta, escreva a definição (por linha ou por unidade, medida onde, com quais exclusões) e meça algumas semanas. No exemplo, a mesma onda deu 85,71% por linha e 92,37% por unidade; sem a definição, os dois números parecem contradizer um ao outro.

Para transformar a separação e a conferência de expedição em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) uma lista de separação típica, um romaneio e o caso mais recente de pedido entregue errado, sem dados confidenciais de clientes ou de pessoas.

*Fontes consultadas em 23 de novembro de 2026: Microsoft Learn, Dynamics 365 Supply Chain Management, "Wave processing" (27/04/2026), "Set up short picking item reallocation" (04/11/2026) e "Pack containers for shipment" (22/04/2026); SAP Learning, "Picking Outbound Deliveries with EWM"; Odoo, documentação 18.0, "Three-step delivery" (a página da versão 19.0 não abriu); Senior Sistemas, Gestão de Armazenagem WMS 8.12, "Separação Onda" e "Packing Consolidado"; GS1, "GS1 Logistic Label Guideline" (Release 1.3, julho de 2019, página de apresentação) e Release 1.2 (setembro de 2017, ref.gs1.org); Secretaria da Fazenda de Santa Catarina, RICMS/SC-01, Anexo 11 (página de 20/10/2026; o Ajuste SINIEF 07/05 no CONFAZ não foi aberto). Este artigo não recomenda sistema nem fornecedor e não é orientação fiscal; empresas, pedidos, pessoas, números e ilustrações são fictícios.*
