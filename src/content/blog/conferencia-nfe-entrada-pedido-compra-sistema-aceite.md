---
content_id: torno-artigo-pt-20261123-conferencia-nfe-pedido
intent_id: buyer-purchase-invoice-three-way-match-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Conferência de nota fiscal de entrada no sistema: o que definir e testar antes de automatizar o confronto da NF-e com o pedido de compra e o recebimento'
h1: 'Conferência de nota fiscal de entrada no sistema: o que definir e testar antes de automatizar o confronto da NF-e com o pedido e o recebimento'
seo_title: 'Conferência de NF-e de entrada x pedido: regras e aceite | Torno'
seo_description: 'Conferência de nota fiscal de entrada no sistema: XML, manifestação do destinatário, de-para de itens, fator de conversão, tolerâncias, bloqueio para pagamento e aceite.'
summary: 'Roteiro para a empresa que vai automatizar no sistema a conferência da NF-e de entrada contra o pedido de compra e o recebimento (three-way match), num ERP, num sistema de compras ou num sistema sob medida: como o XML chega e a manifestação do destinatário (ciência, confirmação, desconhecimento, operação não realizada) com o prazo de 90 dias; o vínculo da nota com o pedido; o vínculo item a item, com código do fornecedor, código interno, unidade e fator de conversão; o que comparar e com qual tolerância de quantidade e de preço; recebimento parcial e várias notas para um pedido; nota sem pedido e nota desconhecida; frete, descontos e tributos; divergência com bloqueio para pagamento, quem libera e o que fica registrado; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que uma empresa precisa definir e testar antes de automatizar no sistema a conferência da NF-e de entrada contra o pedido de compra e o recebimento, para que só seja paga a nota que bate com o que foi pedido e recebido, as divergências fiquem bloqueadas com dono e motivo, e a manifestação do destinatário saia dentro do prazo?
proposed_path: /blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/
canonical_url: https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores financeiros e administrativos, gerentes de compras, compradores, almoxarifado e recebimento, fiscal, contas a pagar e TI de empresas pequenas e médias (indústria, distribuição, comércio) que vão contratar, especificar, ajustar ou aceitar a conferência automática de notas de entrada num ERP, num sistema de compras ou num sistema sob medida, e quem vai implementá-la.
buyer_stage: Especificação e aceite, antes de trocar a conferência feita à mão (DANFE impresso, planilha, e-mail do fornecedor) pela importação do XML e o confronto automático com o pedido e o recebimento.
scope: Como a NF-e de entrada chega ao sistema (distribuição de documentos fiscais, e-mail, portal) e a chave de acesso como identificador; manifestação do destinatário (ciência da emissão, confirmação da operação, desconhecimento da operação, operação não realizada), o prazo de 90 dias e quem registra cada evento; vínculo da nota com o pedido (campos de pedido e item no XML, sugestão, uma nota para vários pedidos); vínculo item a item (código do fornecedor e código interno, unidade e fator de conversão); comparação de quantidade faturada com a recebida e de preço líquido com o do pedido, com tolerâncias; recebimento parcial, saldo e várias notas para um pedido; nota sem pedido e nota que ninguém reconhece; frete, descontos e tributos como comparação, não como cálculo; divergência com bloqueio para pagamento, quem libera, alçada e o que fica registrado; nota cancelada depois de importada; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ERP, sistema de compras, ferramenta de captura de XML ou fornecedor (a documentação de fornecedores de software aparece só como exemplo de modelagem); orientação tributária individual (crédito de ICMS, IPI, PIS e Cofins, escrituração, CFOP, CST, situações em que a manifestação é obrigatória, documento fiscal de acerto de preço, devolução ou recusa), que fica com o contador; emissão de NF-e e campos novos da reforma tributária; NFS-e e notas de serviço; inspeção de qualidade do material recebido; avaliação de fornecedores; cálculo da necessidade e geração do pedido; extração de dados de PDF por OCR; industrialização por encomenda; conciliação do pagamento no extrato; alçadas de aprovação em geral (cobertas em outros artigos).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-23T11:24:00Z'
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
  - path: https://tornostudio.com/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/
    reason: Trata a inspeção de qualidade do material recebido e o saldo bloqueado em inspeção; aqui só a quantidade recebida que entra na conferência com a nota.
  - path: https://tornostudio.com/blog/avaliacao-fornecedores-iqf-homologacao-sistema-aceite/
    reason: Trata a situação e o desempenho do fornecedor; aqui a divergência de nota como possível dado de entrada da avaliação.
  - path: https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/
    reason: Trata o cálculo de necessidade que gera o pedido; aqui o pedido já emitido como base da conferência.
  - path: https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/
    reason: Trata a extração de dados de documentos em PDF; aqui o XML estruturado da NF-e, que não precisa de OCR.
  - path: https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
    reason: Trata remessa e retorno de industrialização; aqui a nota de compra comum contra o pedido.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Trata o sistema que emite a NF-e e os campos de IBS e CBS; aqui o lado de quem recebe a nota.
  - path: https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/
    reason: Trata a nota de serviço no padrão nacional; aqui só a NF-e de mercadoria.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata fluxos de aprovação em geral; aqui a liberação da nota bloqueada e a alçada por valor da divergência.
  - path: https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/
    reason: Trata o substituto do aprovador ausente; aqui a nota bloqueada que não pode esperar as férias do gerente.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a liberação e a mudança de vínculo precisam guardar.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento recebido em dobro; aqui o mesmo XML importado duas vezes.
  - path: https://tornostudio.com/blog/integracao-eventos-fora-ordem/
    reason: Trata eventos que chegam fora de ordem; aqui o cancelamento da nota que chega depois da importação.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata arredondamento de valores; aqui o preço unitário convertido e a tolerância em centavos.
  - path: https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
    reason: Trata cadastros duplicados; aqui o fornecedor duplicado que impede o vínculo da nota.
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Trata o CNPJ alfanumérico; aqui o CNPJ do emitente como chave do vínculo com o fornecedor.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode liberar, mudar vínculo e registrar a manifestação.
  - path: https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/
    reason: Trata a baixa do pagamento pelo extrato; aqui a liberação que vem antes do pagamento.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas e prazos em geral; aqui a contagem do prazo de manifestação.
  - path: https://tornostudio.com/blog/integracao-erp-briefing-orcamento/
    reason: Ajuda a reunir o que é preciso antes de pedir orçamento de integração com o ERP; aqui o caso da importação de notas.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com pedidos, recebimentos e XMLs fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha de conferência deixa de bastar.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a conferência de notas de entrada em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'O Ajuste SINIEF 14/2026, de 06/04/2026, publicado no DOU em 09/04/2026, altera o Ajuste SINIEF 07/05: o caput da cláusula décima quinta-C passa a dizer que os eventos Confirmação da Operação, Desconhecimento da Operação ou Operação não Realizada poderão ser registrados em até 90 dias, contados a partir da data de autorização da NF-e; o § 6º passa a dizer que, após 90 dias sem registro desses eventos, considerar-se-á ocorrida a operação descrita na NF-e, com os mesmos efeitos da Confirmação da Operação. A cláusula de vigência diz que essa parte produz efeitos a partir do primeiro dia do segundo mês subsequente ao da publicação.'
    reference: https://www.legisweb.com.br/legislacao/?id=493948
    entity: 'CONFAZ, Ajuste SINIEF nº 14, de 6 de abril de 2026, texto reproduzido pelo LegisWeb'
    source_date: '2026-04-06'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Texto lido na reprodução do LegisWeb; a página do CONFAZ e a do Portal da NF-e não abriram nesta sessão (bloqueio de acesso), e o DOU não foi consultado. A data de 01/06/2026 é cálculo a partir da publicação em abril e confere com a notícia da Senior sobre a NT 2020.001 v1.60. O artigo não trata de quem está obrigado a manifestar nem dos prazos de casos específicos, que dependem de operação e UF e ficam com o contador.'
  - classification: FATO
    claim: 'Segundo o portal de exigências legais da Senior, o Portal da NF-e publicou em 24/04/2026 a versão 1.60 da Nota Técnica 2020.001 (eventos de manifestação do destinatário), que reflete o Ajuste SINIEF 14/26: prazo de 90 dias, contados da autorização da NF-e, para Confirmação da Operação, Desconhecimento da Operação e Operação não Realizada (antes 180 dias) e 10 dias para Ciência da Emissão; teste a partir de 15/05/2026 e produção a partir de 01/06/2026.'
    reference: https://documentacao.senior.com.br/exigenciaslegais/noticias/federal/2026/2026-04-27-nf-e-nota-tecnica-no-2020-001-v-1-60-evento-de-manifestacao-do-destinatario
    entity: 'Senior Sistemas, Portal de Exigências Legais, notícia de 27/04/2026 sobre a NT 2020.001 v1.60'
    source_date: '2026-04-27'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Notícia de fornecedor de software sobre a nota técnica; o texto da NT 2020.001 v1.60 no Portal da NF-e não abriu nesta sessão. O prazo de 10 dias da ciência vem só desta notícia e de material de fornecedores; o artigo o menciona com essa atribuição.'
  - classification: FATO
    claim: 'A página da Receita Estadual do Rio Grande do Sul sobre a manifestação do destinatário descreve os eventos: Confirmação da Operação (a operação ocorreu e a mercadoria foi recebida), Operação não Realizada (a operação foi solicitada mas não concluída, por exemplo mercadoria não enviada ou recusada), Desconhecimento da Operação (a empresa não solicitou e não reconhece a operação) e Ciência da Operação (evento opcional, em que o destinatário sabe da emissão mas ainda não dá manifestação conclusiva).'
    reference: https://atendimento.receita.rs.gov.br/o-que-e-a-manifestacao-do-destinatario
    entity: 'Receita Estadual do Rio Grande do Sul, Portal de Serviços, "O que é a manifestação do destinatário"'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Página de administração tributária estadual, publicada em 25/01/2022 com metadado de modificação em 03/11/2026; não traz prazos. Usada só para o significado dos eventos.'
  - classification: FATO
    claim: 'A página da Secretaria da Economia de Goiás sobre a manifestação do destinatário lista casos de manifestação obrigatória por tipo de operação e de destinatário (combustíveis, álcool a granel e, para distribuidores e atacadistas, cigarros, bebidas alcoólicas, refrigerantes e água mineral) e diz que nas demais situações a manifestação é voluntária.'
    reference: https://goias.gov.br/economia/manifestacao-do-destinatario/
    entity: 'Secretaria de Estado da Economia de Goiás, "Manifestação do Destinatário"'
    source_date: '2012-11-29'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Página de 29/11/2012, com prazos anteriores ao Ajuste SINIEF 14/2026 (180 dias para os demais casos; 20, 35 e 70 dias para obrigados, que não foram reconferidos na regra vigente) e sem garantia de que a lista de obrigados esteja atual. Usada só para mostrar que há casos de obrigatoriedade por tipo de operação; quem está obrigado hoje é decisão do contador.'
  - classification: FATO
    claim: 'A Nota Técnica 2014.002 v1.40 do Projeto NF-e (serviço de distribuição de documentos fiscais eletrônicos, NFeDistribuicaoDFe; implantação em 08/07/2026) diz que, antes da manifestação, fica disponível ao destinatário só o resumo da NF-e; que a NF-e completa é retornada ao destinatário quando há manifestação (ciência, operação não realizada ou confirmação da operação); que o evento de cancelamento é disponibilizado mesmo sem manifestação; que a consulta é feita a partir do último NSU que a aplicação possui, com até 50 documentos por lote; e que os documentos ficam disponíveis para distribuição por até 90 dias após a recepção pelo Ambiente Nacional.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/07/NT2014.002_v1.40-WsNFeDistribuicaoDFe-CNPJ-alfa.pdf
    entity: 'Projeto Nota Fiscal Eletrônica, Nota Técnica 2014.002 v1.40 (cópia em PDF hospedada pelo site reformatributaria.com)'
    source_date: '2026-07-01'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Cópia do documento técnico hospedada por terceiro; o Portal da NF-e, onde a nota é publicada, não abriu nesta sessão. A data de origem registrada é o mês da capa (julho de 2026). Usada só para o comportamento do serviço de distribuição.'
  - classification: FATO
    claim: 'A documentação do Microsoft Dynamics 365 Finance sobre políticas de conferência diz que na conferência de duas vias a nota é conferida com a linha do pedido e na de três vias também com a linha do recebimento; que na de três vias a quantidade da linha da nota é conferida com a quantidade recebida; que a conferência de preço compara o preço unitário líquido da nota com o do pedido dentro de uma tolerância percentual, e o total com uma tolerância em percentual, valor ou ambos; e que, quando a empresa exige aprovação para lançar notas com divergência, é preciso marcar a aprovação antes de lançar. Dá exemplos com tolerância de 8% no preço unitário e 15% no total, e de 2% no preço unitário, em que um mouse a 41,00 contra 40,00 no pedido (2,5%) falha; o primeiro exemplo tem despesa de frete e manuseio (shipping and handling) de 3.000,00 no pedido e 4.000,00 na nota. Os exemplos mostram a política definida no nível da empresa, do item e da combinação de item e fornecedor, e elevada para três vias num pedido específico.'
    reference: https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies
    entity: 'Microsoft Learn, Dynamics 365 Finance, "Three-way matching policies" (atualizada em 04/06/2026)'
    source_date: '2026-06-04'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor; a página não descreve regra própria de conferência de despesas como frete nem o bloqueio de pagamento em si. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'O material de treinamento da SAP sobre verificação de faturas no S/4HANA diz que há variação de quantidade quando a quantidade da fatura difere da quantidade em aberto (entregue menos já faturada) e variação de preço quando o preço da fatura difere do preço líquido do pedido; que as tolerâncias são definidas por empresa, com limites inferior e superior, absolutos ou percentuais; que dentro da tolerância a fatura é aceita sem outras consultas; que acima do limite superior a fatura pode ser lançada, mas é bloqueada automaticamente para pagamento; e que a fatura inteira é bloqueada mesmo que só um item tenha variação, e precisa ser liberada num passo separado antes do pagamento.'
    reference: https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/entering-invoices-with-variances-1
    entity: 'SAP Learning, curso "Invoice Verification in SAP S/4HANA", lição "Entering Invoices with Variances"'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'O mesmo curso da SAP descreve outros motivos de bloqueio: bloqueio manual de pagamento no cabeçalho ou no item, bloqueio aleatório (estocástico), que vale para a fatura inteira e é ativado com valor-limite e percentual, e bloqueio por valor do item acima de um limite, com ou sem referência a pedido.'
    reference: https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/use-further-blocking-reasons
    entity: 'SAP Learning, curso "Invoice Verification in SAP S/4HANA", lição "Use Further Blocking Reasons"'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a lição não diz quem libera. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo 19.0 diz que a política de controle de faturas de compra pode ser por quantidades pedidas ou por quantidades recebidas, e que a conferência de três vias (3-way matching), ativada nas configurações de compras, garante que as faturas do fornecedor só sejam pagas depois de recebidos alguns ou todos os produtos do pedido.'
    reference: https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase/manage_deals/control_bills.html
    entity: 'Odoo, documentação 19.0, "Control policies"'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual de processo de recebimento eletrônico da Senior (GO UP 5.10.3) diz que, quando o XML traz as tags xPed e nItemPed, o sistema sugere a ordem de compra por elas; que, sem essas tags, a sugestão depende de parâmetro e usa critérios como mesma filial, mesmo fornecedor, ordem fechada, emissão da ordem não posterior à entrada da nota e quantidade aberta maior ou igual à recebida, priorizando a ordem mais antiga; que a ligação entre o código do produto no fornecedor e o produto interno é cadastrada em telas próprias; que podem ser cadastradas variações entre a unidade do XML e a unidade do ERP, válidas só para o recebimento eletrônico; e que a nota só é fechada automaticamente se não tiver nenhuma inconsistência.'
    reference: https://documentacao.senior.com.br/goup/5.10.3/manuais_processos/recebimento-eletronico/recebimento-eletronico.htm
    entity: 'Senior Sistemas, Portal de Documentação, GO UP 5.10.3, "Recebimento Eletrônico"'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor, de versão que a própria página diz ter sido descontinuada em 30/09/2025; sem data de publicação visível. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A tela F442DNE da Senior (Gestão Empresarial ERP 5.10.4) consulta divergências entre nota fiscal de entrada e ordem de compra, campo a campo, em quantidade, unidade de medida, preço unitário, data de entrega, desconto e percentuais de IPI e ICMS, entre outros, marcando se o valor da ordem é maior ou menor que o da nota.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/5.10.4/menu_suprimentos/f442dne.htm
    entity: 'Senior Sistemas, Portal de Documentação, Gestão Empresarial ERP 5.10.4, tela F442DNE'
    source_date: null
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a página não trata de tolerância, bloqueio ou liberação. Citada como exemplo de modelagem.'
  - classification: FATO
    claim: 'A central de ajuda da Omie diz que as tags xPed (número do pedido de compra) e nItemPed (número do item do pedido) da NF-e não são obrigatórias, e que sem elas o vínculo automático do XML com o pedido de compra não ocorre e os itens precisam ser conciliados manualmente no sistema dela.'
    reference: https://ajuda.omie.com.br/pt-BR/articles/498834-preenchendo-o-xped-e-o-nitemped
    entity: 'Omie, central de ajuda, "Preenchendo o xPed e o nItemPed" (atualizada em 23/03/2026)'
    source_date: '2026-03-23'
    checked_at: '2026-11-23T11:35:00Z'
    limit: 'Documentação de fornecedor sobre o próprio produto; o Manual de Orientação do Contribuinte da NF-e, onde os campos são definidos, não abriu nesta sessão. Citada como exemplo.'
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., a Distribuidora Exemplo de Aços Ltda., a Abrasivos Exemplo, a Comercial Exemplo Sul, o pedido PC 7712, as NF-e 45.210, 45.388, 9.901 e 3.077, os códigos, unidades e fatores de conversão, as quantidades, os preços, o desconto, o frete, as tolerâncias, as alçadas, as datas e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, orientação tributária nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; contas refeitas em Python (Decimal) em 23/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, fornecedor, nota, pedido ou sistema real, nem tolerâncias ou alçadas recomendadas.
---

*Leitura estimada: 22 minutos.*

**Antes de automatizar a conferência de nota fiscal de entrada, escreva e aprove oito regras: como o XML chega e quem registra cada manifestação do destinatário, dentro de qual prazo; como a nota se liga ao pedido; como cada item do fornecedor se liga ao item interno, com unidade e fator de conversão; o que se compara (quantidade faturada contra recebida, preço líquido contra o do pedido) e com qual tolerância; como ficam o recebimento parcial e as várias notas de um pedido; o que acontece com a nota sem pedido e com a nota que ninguém reconhece; como frete, descontos e tributos entram na comparação; e quem libera uma nota bloqueada, com qual registro.** Depois, teste com um pedido fictício cujas contas você já fechou à mão: quilos e unidades pedidos, recebidos e faturados, preço convertido, frete, desconto e valor que pode ser pago. Sem isso, o sistema importa o XML, mostra "conferida" e paga uma caixa de pastilhas pelo preço de uma unidade multiplicado por dez, ou bloqueia toda nota por uma diferença de centavos e o contas a pagar volta à planilha.

**Este artigo não recomenda ERP, sistema de compras nem fornecedor, e não é orientação tributária.** A documentação de fornecedores de software (Microsoft Dynamics 365, SAP, Odoo, Senior e Omie) aparece só como exemplo de como sistemas costumam modelar a conferência. Crédito de impostos, escrituração, CFOP, quem está obrigado a manifestar e como corrigir uma nota errada são assuntos do contador. Empresas, notas e números do exemplo são inventados.

## O que a conferência manual faz e o sistema precisa fazer melhor

Em muitas empresas, a conferência da nota de entrada acontece em três lugares que não conversam. O comprador tem o pedido no ERP ou numa planilha. O almoxarifado recebe a mercadoria, confere com o DANFE impresso que veio no caminhão e escreve à mão o que faltou. O fiscal recebe o XML por e-mail, lança a nota e o contas a pagar programa o boleto pela data de vencimento. Se ninguém comparar os três, a nota é paga como veio.

Funciona enquanto o volume é pequeno e o comprador lembra de cada pedido. Deixa de funcionar quando o fornecedor fatura 615 kg e a balança registrou 610, quando o preço da nota sobe um real por unidade sem aviso, quando o frete que era por conta do fornecedor aparece destacado na nota, ou quando uma nota chega de uma empresa com a qual ninguém fez negócio. O papel não impede que a nota seja paga antes de a mercadoria chegar. O sistema pode impedir, mas só se a regra estiver escrita.

### Norma, documentação de fornecedor, decisão da empresa e recomendação

Ajuda separar quatro camadas:

- **Norma.** A manifestação do destinatário, seus eventos e prazos estão no Ajuste SINIEF 07/05 e nas notas técnicas do Projeto NF-e. É a única camada obrigatória deste assunto, e o artigo a cita só no que afeta o desenho do sistema.
- **Documentação de fornecedores de software.** "Three-way matching" no Dynamics 365, "verificação de faturas" no SAP, "3-way matching" no Odoo, "recebimento eletrônico" na Senior: cada sistema dá um nome e um formato à conferência. São exemplos do que costuma ser configurável, não regra.
- **Decisão da empresa.** O que se compara, com qual tolerância, o que bloqueia, quem libera, quando se manifesta. É essa camada que precisa estar escrita antes de configurar ou programar.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é uma sugestão de modelagem, não requisito de norma nem comportamento padrão de ferramenta.

Não encontrei norma que obrigue uma empresa a conferir a nota contra o pedido e o recebimento, nem que fixe tolerâncias. É controle interno. A obrigação fiscal é outra: a manifestação do destinatário, que tem prazo e efeito próprios, e que o sistema pode ajudar a cumprir.

## Three-way match: o que se compara e o que este artigo não repete

Three-way match, ou conferência de três vias, é comparar a nota fiscal com o pedido de compra e com o recebimento antes de liberar o pagamento. A documentação do Dynamics 365 resume bem a diferença: na conferência de duas vias, [a nota é conferida com a linha do pedido; na de três vias, também com a linha do recebimento](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies), e a quantidade faturada passa a ser comparada com a quantidade recebida. O Odoo descreve a conferência de três vias como a garantia de que [as faturas do fornecedor só sejam pagas depois de recebidos alguns ou todos os produtos do pedido](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase/manage_deals/control_bills.html).

Na prática, cada via responde uma pergunta:

- **Pedido:** o que combinamos comprar, a que preço e em que condições (frete, prazo, desconto).
- **Recebimento:** o que de fato chegou, contado ou pesado por alguém da empresa.
- **Nota:** o que o fornecedor está cobrando.

A conferência fecha quando a nota não cobra mais do que chegou, nem a um preço maior do que o combinado, dentro das tolerâncias escritas. Este artigo não repete assuntos que têm texto próprio aqui no blog:

- **Inspeção de qualidade.** Se o material recebido está bom é a [inspeção de recebimento](https://tornostudio.com/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/). Aqui interessa só a quantidade recebida; o material em inspeção pode já contar como recebido para a conferência, se a empresa decidir assim.
- **Fornecedor.** A situação e o desempenho do fornecedor estão em [avaliação de fornecedores](https://tornostudio.com/blog/avaliacao-fornecedores-iqf-homologacao-sistema-aceite/). As divergências de nota podem alimentar essa avaliação; a regra é de lá.
- **Origem do pedido.** O cálculo que gera a necessidade de compra está em [MRP](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/). Aqui o pedido já existe.
- **PDF.** Notas de serviço e documentos sem XML estruturado podem precisar de [extração por OCR](https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/). A NF-e de mercadoria tem XML, e a conferência deve partir dele, não do DANFE.
- **Outros documentos.** A remessa e o retorno de [industrialização por terceiros](https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/) têm lógica própria; a nota de serviço segue a [NFS-e no padrão nacional](https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/); e os campos novos de IBS e CBS do lado de quem emite estão em [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/).

## A nota chega: importação do XML e manifestação do destinatário

### Como o XML chega ao sistema

Há três caminhos comuns: o fornecedor manda o XML por e-mail, alguém baixa de um portal, ou o sistema consulta o serviço nacional de distribuição de documentos fiscais eletrônicos, que lista as notas emitidas contra o CNPJ da empresa. O terceiro caminho tem regras que mudam o desenho. A Nota Técnica 2014.002 v1.40, que descreve esse serviço, diz que [antes da manifestação o destinatário recebe só o resumo da NF-e, e a nota completa é retornada quando há manifestação](https://www.reformatributaria.com/wp-content/uploads/2026/07/NT2014.002_v1.40-WsNFeDistribuicaoDFe-CNPJ-alfa.pdf) (ciência, operação não realizada ou confirmação da operação); que o cancelamento da nota é distribuído mesmo sem manifestação; que a consulta parte do último número sequencial (NSU) que a aplicação já tem, em lotes de até 50 documentos; e que os documentos ficam disponíveis por até 90 dias após a recepção pelo ambiente nacional. Li essa nota técnica numa cópia em PDF hospedada por terceiro, porque o Portal da NF-e não abriu nesta pesquisa.

O que a empresa precisa decidir:

- **Fonte oficial do XML.** Recomendação da Torno: a consulta ao serviço de distribuição como fonte principal, e o e-mail do fornecedor como complemento. A nota que chega só por e-mail pode ser de outro destinatário, estar cancelada ou nem existir; o sistema confere a autorização antes de aceitar.
- **A chave de acesso é única.** O mesmo XML importado duas vezes, por e-mail e pela consulta, conta uma vez, como em [evento duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Último NSU guardado.** Se o sistema perde o último NSU e fica sem consultar por mais de 90 dias, as notas do intervalo deixam de estar disponíveis por esse caminho. Alguém precisa ser avisado quando a consulta para.
- **Cancelamento depois da importação.** A nota pode ser cancelada pelo emitente depois de importada, e o cancelamento chega como um evento separado, às vezes [fora de ordem](https://tornostudio.com/blog/integracao-eventos-fora-ordem/). A nota cancelada não pode ser paga; se já tiver recebimento vinculado, alguém precisa decidir o que fazer com ele.
- **Fornecedor.** O CNPJ do emitente liga a nota ao cadastro do fornecedor. Fornecedor sem cadastro, [duplicado](https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/) ou com [CNPJ alfanumérico](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/) que o sistema não aceita é a primeira fila de pendências, antes de qualquer comparação.

### Os quatro eventos e o prazo de 90 dias

A Receita Estadual do Rio Grande do Sul descreve os eventos de forma direta: [Confirmação da Operação, quando a operação ocorreu; Operação não Realizada, quando foi solicitada mas não concluída; Desconhecimento da Operação, quando a empresa não a solicitou; e Ciência da Operação, evento opcional sem manifestação conclusiva](https://atendimento.receita.rs.gov.br/o-que-e-a-manifestacao-do-destinatario).

O prazo mudou em 2026. O Ajuste SINIEF 14/2026, publicado em 09/04/2026, deu nova redação à cláusula décima quinta-C do Ajuste SINIEF 07/05: [Confirmação da Operação, Desconhecimento da Operação ou Operação não Realizada podem ser registrados em até 90 dias, contados da autorização da NF-e](https://www.legisweb.com.br/legislacao/?id=493948), e, passados os 90 dias sem nenhum desses registros, considera-se ocorrida a operação descrita na nota, com os mesmos efeitos da confirmação. Segundo a notícia da Senior sobre a versão 1.60 da Nota Técnica 2020.001, o prazo anterior era de 180 dias e [a mudança entrou em produção em 01/06/2026](https://documentacao.senior.com.br/exigenciaslegais/noticias/federal/2026/2026-04-27-nf-e-nota-tecnica-no-2020-001-v-1-60-evento-de-manifestacao-do-destinatario); a mesma notícia indica 10 dias para a ciência da emissão. Li o texto do ajuste numa reprodução do LegisWeb; a página do CONFAZ não abriu nesta pesquisa.

O efeito prático para o sistema: **se ninguém disser nada em 90 dias, a nota que ninguém reconhece passa a valer como confirmada.** A conferência de três vias e a manifestação são processos diferentes, mas um depende do outro: é a conferência que descobre a nota desconhecida e a mercadoria que nunca veio. As decisões:

- **Quem registra cada evento.** Recomendação da Torno: o sistema pode registrar a ciência automaticamente, para baixar o XML completo; os eventos conclusivos ficam com o fiscal, a partir do que compras e almoxarifado informaram. O perfil que registra cada evento segue as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Quando confirmar.** A confirmação diz que a operação ocorreu; ela não aprova preço. Uma nota com preço divergente pode ter tido a operação confirmada, enquanto o pagamento continua bloqueado. Se a empresa confirma no recebimento físico ou depois da conferência completa, é decisão do fiscal com o contador.
- **Prazo interno.** O sistema conta o prazo de cada nota a partir da autorização e avisa antes do fim. Recomendação da Torno: um prazo interno bem menor que 90 dias, com fila das notas sem evento conclusivo, ordenada pela data-limite. Os cuidados com contagem de dias estão em [datas e prazos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Obrigatoriedade.** Em certas operações a manifestação é obrigatória, com regras próprias; uma página antiga da Secretaria da Economia de Goiás, por exemplo, lista [destinatários de combustíveis, cigarros e bebidas, entre outros](https://goias.gov.br/economia/manifestacao-do-destinatario/), com prazos anteriores ao Ajuste SINIEF 14/2026, que não devem ser usados sem conferir a regra vigente. Quem está obrigado e em que casos fica com o contador; o sistema só precisa permitir que a regra seja configurada.

## Qual pedido: o vínculo da nota com o pedido de compra

Antes de comparar itens, o sistema precisa saber contra qual pedido comparar. O XML da NF-e tem campos para o número do pedido de compra e o número do item no pedido, as tags xPed e nItemPed. A ajuda da Omie lembra que elas [não são obrigatórias, e sem elas o vínculo automático não ocorre](https://ajuda.omie.com.br/pt-BR/articles/498834-preenchendo-o-xped-e-o-nitemped). O manual de recebimento eletrônico da Senior mostra o caminho alternativo: com as tags, o sistema [sugere a ordem de compra por elas; sem elas, sugere por critérios como mesmo fornecedor, mesma filial e quantidade em aberto, priorizando a ordem mais antiga](https://documentacao.senior.com.br/goup/5.10.3/manuais_processos/recebimento-eletronico/recebimento-eletronico.htm).

O que a empresa precisa decidir:

- **Pedir ao fornecedor que informe o pedido na nota.** É barato e resolve a maior parte do vínculo. Escreva no pedido que o número dele e o número do item devem vir na nota.
- **Sugestão automática.** Quando o pedido não vem na nota, o sistema sugere por fornecedor, item e saldo em aberto. A sugestão é só sugestão: quem confirma, e o que acontece quando há dois pedidos possíveis?
- **Uma nota para vários pedidos e um pedido em várias notas.** Os dois acontecem. O vínculo é por item da nota e item do pedido, não por nota e pedido.
- **Mudança de vínculo.** Se alguém liga a nota ao pedido errado e depois corrige, o histórico precisa mostrar quem mudou, quando e por quê, como em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Item a item: código do fornecedor, código interno, unidade e fator de conversão

O fornecedor descreve o item com o código, a descrição e a unidade dele. O pedido usa o código, a descrição e a unidade da empresa. A conferência só funciona se houver uma tabela que ligue os dois, o "de-para". A Senior, por exemplo, tem [telas próprias para a ligação entre o código do produto no fornecedor e o produto interno, e para variações entre a unidade do XML e a unidade do ERP](https://documentacao.senior.com.br/goup/5.10.3/manuais_processos/recebimento-eletronico/recebimento-eletronico.htm).

O que precisa estar escrito:

- **A chave do de-para.** Fornecedor mais código do fornecedor aponta para um item interno. O mesmo código em dois fornecedores pode ser coisas diferentes.
- **Unidade e fator.** O fornecedor vende pastilhas por caixa de 10 e a empresa controla por unidade; vende óleo por balde de 20 litros e a empresa controla por litro. O fator converte a quantidade e o preço: 6 caixas a R$ 430,00 viram 60 unidades a R$ 43,00. Sem o fator, o sistema compara 6 com 60 e R$ 430,00 com R$ 42,00, e a divergência aparente passa de 900%.
- **Fator variável.** Barra de aço vendida por barra e controlada por quilo tem peso que varia de barra para barra. Nesse caso, o fator fixo é aproximação; o recebimento pesa, e a nota deve vir em quilos.
- **Item novo.** Na primeira nota de um item, não há de-para. O sistema não adivinha pela descrição: a nota vai para uma fila, e quem cadastra a ligação é alguém com responsabilidade sobre o cadastro de itens.
- **Mudança de embalagem.** O fornecedor passa a vender a caixa com 12. Se o fator antigo continua valendo, a conferência dá certo na quantidade de caixas e errado em tudo o mais. O de-para precisa de vigência, ou ao menos de histórico.
- **Arredondamento.** O preço unitário convertido pode ter mais casas do que o pedido. Quantas casas se comparam e quando se arredonda segue [valores monetários no sistema](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).

## O que comparar e com qual tolerância

Com a nota ligada ao pedido e cada item ligado ao item interno, a comparação tem duas perguntas principais por linha.

**Quantidade: a nota cobra mais do que chegou?** O material da SAP define a variação de quantidade como a diferença entre a quantidade da fatura e [a quantidade em aberto, que é a entregue menos a já faturada](https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/entering-invoices-with-variances-1). É uma formulação útil porque já resolve as entregas parciais: a comparação é com o recebido ainda não faturado, não com o pedido inteiro.

**Preço: o preço líquido da nota é maior que o do pedido?** O Dynamics 365 compara [o preço unitário líquido da nota com o do pedido, dentro de uma tolerância percentual, e o total da linha dentro de uma tolerância em percentual, valor ou ambos](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies). Um dos exemplos da página usa 2% de tolerância no preço unitário: um item pedido a 40,00 e faturado a 41,00 (2,5% acima) falha.

As decisões:

- **Tolerância em percentual, em valor, ou nos dois.** Percentual sozinho deixa passar valores grandes em itens caros; valor sozinho bloqueia itens baratos por centavos. O SAP permite [limites absolutos e percentuais, inferior e superior](https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/entering-invoices-with-variances-1).
- **Para cima e para baixo.** Preço menor que o do pedido é bom para o caixa, mas pode ser erro (item errado, unidade errada). Aceitar com aviso é diferente de aceitar em silêncio.
- **Por tipo de item.** Itens pesados (aço, granel) têm variação natural de quantidade; itens contados não têm. Uma tolerância só para tudo acaba larga demais para um e estreita demais para o outro.
- **Tolerância na linha ou no acumulado.** Uma entrega de 610 kg pode ser faturada duas vezes, em duas notas de 610 kg. Comparada nota a nota com o recebimento, cada uma bate; no acumulado do item do pedido, 1.220 kg faturados contra 610 recebidos aparecem como divergência. O acumulado também resolve notas e entregas que não se correspondem uma a uma.
- **O que a tolerância faz.** Dentro dela, a nota segue. Fora, a nota fica bloqueada para pagamento, com o motivo, até alguém resolver. Escreva o que significa "resolver".

Recomendação da Torno: comece com tolerâncias estreitas e meça. Se a maior parte das notas cai no bloqueio por diferenças de centavos, o problema é a tolerância ou o arredondamento, não o fornecedor.

## Recebimento parcial e várias notas para um pedido

Um pedido de 1.200 kg de barra chega em duas entregas, cada uma com sua nota. Ou chega numa entrega só, com duas notas. Ou a nota chega antes da mercadoria. O que o sistema precisa fazer:

- **Saldo por item do pedido.** Pedido, recebido, faturado e pago, por item. A nota nova compara com o recebido ainda não faturado.
- **Nota antes do recebimento.** O XML costuma chegar antes do caminhão. A nota fica importada, vinculada ao pedido, e espera o recebimento; não vai para pagamento. O Odoo, por exemplo, permite [controlar a fatura pelas quantidades pedidas ou pelas recebidas](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase/manage_deals/control_bills.html); a escolha muda quando a nota pode ser paga.
- **Recebimento sem nota.** O contrário também acontece, e o recebido sem nota é um saldo que alguém precisa cobrar do fornecedor ou explicar.
- **Encerramento do item do pedido.** Pedido de 1.200 kg, recebidos 1.202. O item encerra? Com que tolerância sobre o pedido? E se chegaram 1.150 e o fornecedor diz que não manda mais, quem cancela o saldo?
- **Correção do recebimento.** O almoxarifado pesou errado e repesa. A conferência precisa ser refeita com o valor novo, e o recebimento corrigido guarda o original, o novo, o motivo e o autor.

## Nota sem pedido e nota que ninguém reconhece

**Nota sem pedido.** Compra no balcão, conserto urgente, item que alguém comprou por fora. A conferência de três vias não tem com o que comparar. As opções: exigir que o comprador regularize um pedido antes de lançar a nota; aceitar sem pedido até um valor e para certas categorias, com aprovação do gestor da área; ou recusar. Recomendação da Torno: a nota sem pedido nunca segue direto para pagamento; vai para uma fila com dono, e a aprovação segue as regras de [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).

**Nota que ninguém reconhece.** A consulta ao serviço de distribuição traz uma nota de uma empresa com a qual ninguém negociou. Pode ser erro do emitente, nota destinada a outra filial ou uso indevido do CNPJ. A regra: compras e almoxarifado dizem, dentro de um prazo, se há pedido ou recebimento; se não há, o fiscal decide o evento (em geral o desconhecimento da operação) antes do fim dos 90 dias. A nota que só foi importada e esquecida vira confirmada pelo prazo.

**Operação não realizada.** A operação foi combinada, mas a mercadoria não veio ou foi recusada. O evento existe para isso, mas recusa, devolução e o documento fiscal correspondente são decisão do fiscal com o contador, e este artigo não entra nisso. Para o sistema, basta que a nota dessa situação não vá para pagamento e que o evento seja registrado no prazo.

## Frete, descontos e tributos

A nota tem mais do que preço vezes quantidade. A conferência precisa decidir o que comparar em cada valor adicional:

- **Frete.** O pedido diz quem paga o frete (por conta do fornecedor, incluso no preço, ou por conta do comprador, destacado). Frete destacado na nota de um pedido em que o frete é do fornecedor é divergência. A documentação do Dynamics 365 mostra um exemplo com [despesa de frete e manuseio (shipping and handling) de 3.000,00 no pedido e 4.000,00 na nota](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies), mas não descreve uma regra própria para comparar despesas. Escreva a sua: compara-se com o pedido, com uma tabela de frete, ou com o conhecimento de transporte quando o frete é de terceiro?
- **Desconto.** Se o pedido tem preço líquido e a nota traz preço cheio com desconto no item, a comparação é com o preço líquido da nota. Comparar o preço cheio gera falso bloqueio; ignorar o desconto gera falso acerto.
- **Seguro e outras despesas acessórias.** Mesmo raciocínio: escreva se o pedido as prevê e com qual valor.
- **Tributos.** A Senior, por exemplo, mostra divergências entre nota e ordem de compra [campo a campo, inclusive percentuais de IPI e ICMS](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.4/menu_suprimentos/f442dne.htm). A conferência pode comparar a alíquota e o valor destacado com o que o pedido previa, para avisar o fiscal. Se a alíquota está certa, se a empresa tem direito a crédito e como escriturar é decisão do fiscal e do contador; o sistema só aponta a diferença e a manda para quem decide. Os campos novos da reforma tributária mudam o XML, e quem emite precisa se adaptar, como em [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/); quem recebe precisa que a importação não quebre com eles.

## Divergência: bloqueio para pagamento, quem libera e o que fica registrado

O SAP documenta um comportamento que serve de referência: acima do limite superior de tolerância, [a fatura pode ser lançada, mas é bloqueada automaticamente para pagamento, e a fatura inteira fica bloqueada mesmo que só um item tenha variação](https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/entering-invoices-with-variances-1); ela precisa ser liberada num passo separado antes do pagamento. O mesmo curso descreve [bloqueio manual, bloqueio aleatório e bloqueio por valor do item](https://learning.sap.com/courses/invoice-verification-in-sap-s-4hana/use-further-blocking-reasons). O Dynamics 365 tem a opção de [exigir aprovação para lançar notas com divergência](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies). A Senior documenta que a nota de recebimento eletrônico [só é fechada automaticamente se não tiver nenhuma inconsistência](https://documentacao.senior.com.br/goup/5.10.3/manuais_processos/recebimento-eletronico/recebimento-eletronico.htm).

O que a empresa precisa decidir:

- **Lançar e bloquear, ou não lançar.** A nota com divergência entra no fiscal e no contas a pagar com bloqueio, ou fica parada antes disso? Lançar e bloquear preserva o registro fiscal e o prazo de vencimento à vista; não lançar esconde a dívida.
- **Bloquear a nota inteira ou só as linhas.** Bloquear a nota inteira é mais simples e mais seguro; liberar só a parte que bate exige que a forma de pagamento parcial esteja combinada com o fornecedor e com o fiscal.
- **Quem libera cada tipo.** Quantidade: o almoxarifado confirma ou corrige o recebimento. Preço e condição: o comprador ou o gerente de compras. Tributo: o fiscal. Nota sem pedido: o gestor da área. A liberação de quem criou o pedido pode ser vedada acima de certo valor, para separar funções.
- **Alçada por valor da divergência.** Divergência pequena com o comprador, grande com o gerente ou o diretor. Quando o aprovador está fora, vale o [substituto](https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/), não a liberação em lote por quem estiver disponível.
- **Liberar não é apagar a divergência.** Recomendação da Torno: a liberação registra quem, quando, qual divergência, qual valor, qual motivo e qual acerto foi combinado com o fornecedor (abatimento na próxima nota, devolução, aceite do preço novo). A forma fiscal do acerto é decisão do fiscal; o sistema guarda a referência.
- **Vencimento.** A nota bloqueada continua vencendo. O sistema mostra as notas bloqueadas por data de vencimento, para que o bloqueio não vire multa por atraso nem pagamento sem conferência na véspera.

### Trilha

Todo evento da nota fica registrado: importação (origem, horário), manifestação (evento, autor, protocolo), vínculo com o pedido e mudanças de vínculo, de-para usado, resultado da comparação por linha, bloqueio e motivo, liberação e autor, e pagamento. O que um registro desses precisa ter está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). A baixa do pagamento no extrato, depois da liberação, segue a [conciliação bancária](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/).

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Fonte oficial do XML, consulta ao serviço de distribuição e alerta de consulta parada | Fiscal e TI |
| Quem registra cada evento de manifestação, quando confirmar e prazo interno | Fiscal, com o contador |
| Situações em que a manifestação é obrigatória | Contador |
| Exigir o número do pedido e do item na nota e regra de sugestão de vínculo | Compras, com TI |
| De-para de itens, unidade, fator de conversão e vigência | Compras e cadastro de itens |
| Tolerância de quantidade por tipo de item e na linha ou no acumulado | Compras e almoxarifado, com financeiro |
| Tolerância de preço, para cima e para baixo | Compras e financeiro |
| Encerramento do item do pedido com tolerância e cancelamento de saldo | Compras |
| Correção de recebimento e repesagem | Almoxarifado |
| Nota sem pedido: limite, categorias e aprovação | Financeiro, com as áreas |
| Nota que ninguém reconhece: prazo de resposta e evento | Fiscal, com compras e almoxarifado |
| Frete, desconto e despesas acessórias na comparação | Compras e financeiro |
| Comparação de tributos e destino do aviso | Fiscal, com o contador |
| Lançar e bloquear, nota inteira ou linhas, quem libera e alçada | Financeiro e direção, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |
| Registro do acerto com o fornecedor e sua forma fiscal | Compras (acerto comercial) e fiscal (documento) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. compra da Distribuidora Exemplo de Aços Ltda. O pedido PC 7712, de segunda-feira, 02/11/2026, tem três itens, com frete por conta do fornecedor (incluso no preço):

| Item do pedido | Código interno | Código do fornecedor | Unidade do pedido | Unidade da nota e fator | Quantidade | Preço líquido | Total |
|---|---|---|---|---|---|---|---|
| 1 Barra redonda SAE 1045, 1 polegada | MP-1045-25 | SAE1045-1POL | kg | kg (1) | 1.200 | R$ 9,80/kg | R$ 11.760,00 |
| 2 Óleo de corte solúvel | OL-020 | OCS-BD20 | L | BD, balde de 20 L (20) | 200 | R$ 18,50/L | R$ 3.700,00 |
| 3 Pastilha de torneamento | FE-CNMG | CNMG-CX10 | UN | CX, caixa de 10 (10) | 100 | R$ 42,00/UN | R$ 4.200,00 |

Total do pedido: R$ 19.660,00. Regras da empresa (escolhas do exemplo, não recomendação):

- **XML.** Consulta ao serviço de distribuição a cada hora; se ficar 24 horas sem sucesso, aviso ao fiscal e à TI. A ciência é registrada automaticamente na importação do resumo, para baixar o XML completo. Os eventos conclusivos são do fiscal; prazo interno de 60 dias contados da autorização, com aviso a partir do dia 45.
- **Vínculo.** Pelo xPed e nItemPed quando vierem; sem eles, sugestão por fornecedor, item e saldo, confirmada pelo comprador.
- **Quantidade.** Itens em kg: a quantidade faturada pode passar a recebida não faturada em até 0,5%. Itens em unidade e litro: nenhuma tolerância. Comparação no acumulado do item do pedido.
- **Preço.** Preço líquido unitário convertido até 1% acima do pedido. Abaixo do pedido, aceito com aviso ao comprador. Diferença de tributo em relação ao previsto no pedido vira aviso ao fiscal, não bloqueio de compras.
- **Frete.** Pedido com frete por conta do fornecedor não aceita frete destacado na nota.
- **Bloqueio.** A nota é lançada e fica inteira bloqueada para pagamento enquanto houver divergência. Quantidade: o almoxarifado confirma ou corrige o recebimento, sempre com motivo. Preço e frete: o gerente de compras libera, com motivo, ou registra o acerto; na ausência dele, o substituto cadastrado. Nota sem pedido: até R$ 300,00, para material de consumo, com aprovação do gestor do centro de custo; acima, o comprador regulariza um pedido.
- **Encerramento.** O item do pedido em kg encerra com até 1% acima ou abaixo da quantidade pedida; fora disso, o comprador decide.

**Sexta-feira, 06/11/2026.** A NF-e 45.210 da Distribuidora é autorizada às 16h40. Às 17h00 a consulta traz o resumo; o sistema registra a ciência e baixa o XML completo. A nota tem xPed 7712 e os itens 1, 2 e 3:

- Barra: 615 kg a R$ 10,00, com desconto de 2% no item: R$ 6.150,00 − R$ 123,00 = R$ 6.027,00, ou R$ 9,80/kg líquido.
- Óleo: 10 BD a R$ 370,00 = R$ 3.700,00, ou 200 L a R$ 18,50.
- Pastilha: 6 CX a R$ 430,00 = R$ 2.580,00, ou 60 UN a R$ 43,00.
- Frete destacado: R$ 180,00.
- Total da nota: R$ 12.430,00 de produtos, menos R$ 123,00 de desconto, mais R$ 180,00 de frete: R$ 12.487,00. No exemplo, os tributos ficam fora da conta; a conferência deles é do fiscal.

**Segunda-feira, 09/11.** O caminhão chega. O almoxarifado pesa 610 kg de barra, conta 10 baldes e 6 caixas, e registra o recebimento. A conferência roda:

- Barra: 615 faturados contra 610 recebidos, 5 kg a mais, 0,82%, acima do limite de 0,5% (3,05 kg). Divergência de quantidade: 5 × R$ 9,80 = R$ 49,00.
- Óleo: 200 L contra 200 L, R$ 18,50 contra R$ 18,50. Sem divergência.
- Pastilha: 60 contra 60 unidades; R$ 43,00 contra R$ 42,00, 2,38% acima, fora do limite de 1% (R$ 42,42). Divergência de preço: 60 × R$ 1,00 = R$ 60,00.
- Frete: R$ 180,00 destacado num pedido com frete do fornecedor. Divergência de R$ 180,00.

Valor que bateria com pedido e recebimento: 610 × R$ 9,80 + R$ 3.700,00 + 60 × R$ 42,00 = R$ 5.978,00 + R$ 3.700,00 + R$ 2.520,00 = R$ 12.198,00. Diferença para a nota: R$ 289,00 = R$ 49,00 + R$ 60,00 + R$ 180,00. A nota inteira fica bloqueada para pagamento, com três motivos.

![Ilustração de três documentos sobrepostos em transparência, levemente deslocados, da Metalúrgica Exemplo Ltda.: atrás, o pedido de compra PC 7712, de 02/11/2026, com frete por conta do fornecedor; no meio, o recebimento de 09/11/2026; na frente, a NF-e 45.210, autorizada em 06/11/2026. Cinco faixas horizontais atravessam os três documentos e alinham os campos que precisam bater; abaixo delas, um quadro de totais. Faixa 1, barra SAE 1045, código do fornecedor SAE1045-1POL ligado ao código interno MP-1045-25: pedido 1.200 kg a R$ 9,80; recebido 610 kg; nota 615 kg a R$ 10,00 com 2% de desconto, R$ 9,80 líquido. Marcação vermelha: 5 kg a mais, 0,82%, acima de 0,5%, R$ 49,00. Faixa 2, óleo de corte, OCS-BD20 ligado a OL-020, fator 20: pedido 200 L a R$ 18,50; recebido 10 baldes, 200 L; nota 10 BD a R$ 370,00, R$ 18,50 por litro. Marcação verde. Faixa 3, pastilha, CNMG-CX10 ligado a FE-CNMG, fator 10: pedido 100 UN a R$ 42,00; recebidas 6 caixas, 60 UN; nota 6 CX a R$ 430,00, R$ 43,00 por unidade. Marcação vermelha: 2,38% acima de 1%, R$ 60,00. Faixa 4, frete: pedido por conta do fornecedor; nota R$ 180,00 destacado. Marcação vermelha, R$ 180,00. Faixa 5, pedido na nota: xPed 7712, itens 1 a 3, verde. Quadro de totais: nota R$ 12.487,00; valor que bate R$ 12.198,00; diferença R$ 289,00, igual a 49 mais 60 mais 180. Um carimbo indica nota inteira bloqueada para pagamento, com três motivos. Exemplo fictício.](./torno-conferencia-tres-vias-sobrepostas.svg)

*Exemplo fictício: empresas, pedido, nota, códigos, fatores, quantidades e preços inventados; os campos que precisam bater estão alinhados nas três vias, e cada divergência tem valor e motivo próprios. Ilustração original Torno, 2026.*

**Terça-feira, 10/11.** O almoxarifado repesa a barra e registra 612 kg, com motivo "tara do palete descontada em dobro"; o recebimento de 610 kg continua consultável. A conferência roda de novo: 615 contra 612, 3 kg a mais, 0,49%, dentro do limite de 0,5% (3,06 kg). A divergência de quantidade some sozinha, sem liberação manual. O fiscal registra a confirmação da operação: a mercadoria chegou, mesmo que o preço ainda esteja em discussão. O comprador fala com a Distribuidora, que reconhece o preço de R$ 42,00 e o frete por conta dela, e combina um acerto de R$ 240,00 (R$ 60,00 + R$ 180,00). A nota continua bloqueada até o acerto ser registrado.

![Ilustração de duas balanças de pratos lado a lado, para a barra SAE 1045 da NF-e 45.210 da Metalúrgica Exemplo Ltda. Em cada balança, o prato da esquerda leva o recebido e o da direita, o faturado; abaixo do braço, um mostrador em arco com uma faixa verde de tolerância de 0,5% para mais. Balança da esquerda, 09/11/2026: recebido 610 kg, faturado 615 kg, diferença de 5 kg, 0,82%; o ponteiro passa da faixa verde, que vai até 3,05 kg, e cai na zona vermelha: bloqueado. Balança da direita, 10/11/2026, depois da repesagem com motivo tara do palete descontada em dobro: recebido 612 kg, faturado 615 kg, diferença de 3 kg, 0,49%; o ponteiro fica dentro da faixa verde, que vai até 3,06 kg: dentro da tolerância, liberado sem ação manual. Abaixo, uma terceira balança menor mostra o acumulado do item no fim do pedido: recebido 1.202 kg em duas entregas, faturado 1.205 kg em duas notas, diferença de 3 kg, 0,25%, dentro do limite de 6,01 kg. Nota: o recebimento de 610 kg continua no histórico. Exemplo fictício.](./torno-conferencia-balanca-quantidade.svg)

*Exemplo fictício: pesos, datas e motivo inventados; a mesma nota passa ou não pela tolerância conforme o recebimento registrado, e a correção do recebimento fica no histórico. Ilustração original Torno, 2026.*

**Quinta-feira, 12/11.** O comprador registra o acerto de R$ 240,00, com a referência do documento que o fiscal das duas empresas definiu, e o gerente de compras libera a nota, com motivo. Valor a pagar depois do acerto: R$ 12.487,00 − R$ 240,00 = R$ 12.247,00, que é a nota com a barra a 615 kg (R$ 6.027,00), o óleo (R$ 3.700,00) e a pastilha a R$ 42,00 (R$ 2.520,00), sem frete. No mesmo dia, chega a NF-e 9.901 da Abrasivos Exemplo, de R$ 190,00, com 10 discos de corte comprados no balcão pelo encarregado, sem pedido; vai para a fila do gestor do centro de custo, que aprova.

**Sexta-feira, 13/11.** A consulta traz o resumo da NF-e 3.077 da Comercial Exemplo Sul, de R$ 4.850,00. Ninguém tem pedido nem recebimento dessa empresa. Compras e almoxarifado respondem em 16/11; o fiscal registra o desconhecimento da operação no mesmo dia, bem antes dos 90 dias.

**Terça-feira, 17/11, e quarta-feira, 18/11.** A NF-e 45.388 da Distribuidora é autorizada em 17/11: barra 590 kg a R$ 10,00 com 2% de desconto, R$ 5.900,00 − R$ 118,00 = R$ 5.782,00 (R$ 9,80/kg); pastilha 4 CX a R$ 420,00 = R$ 1.680,00 (R$ 42,00/UN); total R$ 7.462,00, sem frete. Em 18/11 chegam 590 kg e 4 caixas. A conferência passa sem divergência. No acumulado do item 1: recebidos 612 + 590 = 1.202 kg, faturados 615 + 590 = 1.205 kg, 3 kg a mais, 0,25%, dentro de 0,5% (6,01 kg). O item encerra: 1.202 kg contra 1.200 pedidos, 0,17% acima, dentro de 1%. A pastilha fecha em 100 unidades; o óleo já fechou em 200 L.

![Ilustração de uma matriz de conferência em forma de mapa de calor, da Metalúrgica Exemplo Ltda., com seis linhas e seis colunas. Linhas: NF-e 45.210 barra; NF-e 45.210 óleo; NF-e 45.210 pastilha; NF-e 45.210 frete; NF-e 45.388 barra; NF-e 45.388 pastilha. Colunas: vínculo com o pedido; de-para e fator; quantidade contra recebido; preço líquido contra pedido; frete e condição; resultado. Células verdes para conferido, amarelas para dentro da tolerância depois de correção, vermelhas para bloqueado, cinza para não se aplica. NF-e 45.210 barra: vínculo verde, de-para verde, quantidade amarela com 615 contra 612, 0,49%, e um quadro abaixo explica que em 09/11, com 615 contra 610, 0,82%, ela estava vermelha; preço verde a R$ 9,80 líquido, frete cinza, resultado amarelo. Óleo: tudo verde, fator 20, R$ 18,50 por litro. Pastilha: de-para verde com fator 10, quantidade verde 60 contra 60, preço vermelho R$ 43,00 contra R$ 42,00, 2,38%, resultado vermelho, R$ 60,00. Frete: preço cinza, frete vermelho R$ 180,00 em pedido com frete do fornecedor. NF-e 45.388 barra: verde, 590 contra 590 e acumulado 1.205 contra 1.202, 0,25%. NF-e 45.388 pastilha: verde, R$ 42,00. Um quadro abaixo lembra que sem o fator 10 a célula da pastilha mostraria R$ 430,00 contra R$ 42,00, 923,81% acima. No rodapé: NF-e 45.210 bloqueada em 09/11 por R$ 289,00; liberada em 12/11 com acerto de R$ 240,00; valor a pagar R$ 12.247,00. NF-e 45.388 liberada sem ação manual, R$ 7.462,00. Exemplo fictício.](./torno-conferencia-matriz-tolerancias.svg)

*Exemplo fictício: notas, itens, tolerâncias e resultados inventados; cada célula é uma comparação com regra escrita, e a cor muda quando o recebimento é corrigido ou o acerto é registrado. Ilustração original Torno, 2026.*

Monte os cenários em um ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com pedidos, recebimentos e XMLs fictícios (nunca notas reais de terceiros), e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Consulta ao serviço de distribuição às 17h00 de 06/11 traz o resumo da NF-e 45.210 | Nota importada com chave de acesso, emitente e valor; ciência registrada; XML completo baixado | Registro de importação e protocolo do evento |
| O mesmo XML chega também por e-mail do fornecedor | Reconhecido pela chave de acesso; nenhuma nota duplicada | Lista de notas e log de importação |
| Consulta parada por mais de 24 horas | Aviso ao fiscal e à TI, com o último NSU guardado | Alerta |
| NF-e de emitente sem cadastro de fornecedor | Importada e retida na fila de cadastro, sem comparação | Fila de pendências |
| NF-e 45.210 com xPed 7712 e itens 1 a 3 | Vínculo automático com os três itens do PC 7712 | Vínculo nota × pedido por item |
| Simulação: a mesma nota sem xPed | Sugestão do PC 7712 por fornecedor, item e saldo, aguardando confirmação do comprador | Sugestão e confirmação |
| Simulação: dois pedidos em aberto possíveis para o mesmo item | O sistema não escolhe sozinho; pede a escolha ao comprador | Tela de vínculo |
| Comprador troca o vínculo de um item para outro pedido | Histórico com o vínculo anterior, o novo, autor, data e motivo | Trilha do vínculo |
| Pastilha CNMG-CX10, 6 CX a R$ 430,00, com fator 10 | Convertida para 60 UN a R$ 43,00 | Linha convertida |
| Simulação: pastilha sem fator cadastrado | Nota retida na fila de cadastro; não compara 6 com 60 nem R$ 430,00 com R$ 42,00 (923,81%) | Fila de pendências |
| Simulação: código do fornecedor sem de-para | Nota retida na fila de cadastro; sem vínculo por descrição | Fila de pendências |
| Simulação: fator da pastilha muda para 12 a partir de uma data | Notas anteriores conferidas com 10, novas com 12 | Histórico do de-para |
| Óleo: 10 BD a R$ 370,00 com fator 20 | 200 L a R$ 18,50; sem divergência | Linha conferida |
| Barra: preço R$ 10,00 com 2% de desconto no item | Comparado pelo líquido, R$ 9,80; sem divergência de preço | Linha conferida |
| Nota importada antes do recebimento (06/11) | Vinculada ao pedido, aguardando recebimento; não vai para pagamento | Situação da nota |
| Recebimento de 09/11: 610 kg, 10 BD, 6 CX | Barra com 615 contra 610, 0,82%, acima de 0,5%: divergência de R$ 49,00 | Resultado da conferência |
| Pastilha a R$ 43,00 contra R$ 42,00 | 2,38%, acima de 1% (R$ 42,42): divergência de R$ 60,00 | Resultado da conferência |
| Frete de R$ 180,00 em pedido com frete do fornecedor | Divergência de R$ 180,00 | Resultado da conferência |
| Nota com três divergências | Nota lançada e inteira bloqueada para pagamento; valor que bate R$ 12.198,00; diferença R$ 289,00 | Situação, motivos e valores |
| Simulação: pastilha a R$ 42,40 | 0,95%, dentro de 1%; sem divergência | Linha conferida |
| Simulação: pastilha a R$ 41,00 | Aceita com aviso ao comprador | Linha e aviso |
| Repesagem de 10/11: 612 kg com motivo | Recebimento corrigido, original de 610 kg consultável; barra 615 contra 612, 0,49%, dentro de 3,06 kg; divergência de quantidade encerrada sem liberação manual | Histórico do recebimento e nova conferência |
| Simulação: repesagem sem motivo | Recusada | Tentativa recusada |
| Comprador que emitiu o PC 7712 tenta liberar a divergência de preço | Negado: a liberação de preço e frete é do gerente de compras | Tentativa negada |
| Gerente de compras libera em 12/11 com acerto de R$ 240,00 | Liberação com autor, motivo, valor e referência do acerto; valor a pagar R$ 12.247,00 | Registro da liberação |
| Simulação: liberação sem motivo | Recusada | Tentativa recusada |
| Simulação: gerente de compras ausente | Liberação pelo substituto cadastrado, com registro de que agiu como substituto | Registro da liberação |
| Simulação: NF-e 45.210 cancelada pelo emitente depois da importação | Evento de cancelamento importado; nota bloqueada e fora do pagamento; recebimento vinculado sinalizado ao almoxarifado | Situação e alerta |
| Confirmação da operação registrada pelo fiscal em 10/11 | Evento conclusivo com protocolo; nota sai da fila de manifestação; o bloqueio de pagamento continua | Protocolo e situação |
| NF-e 9.901 de R$ 190,00 sem pedido, discos de corte | Fila do gestor do centro de custo; aprovada, segue para pagamento | Fila e aprovação |
| Simulação: nota sem pedido de R$ 850,00 | Não aceita sem pedido; comprador precisa regularizar | Situação e mensagem |
| NF-e 3.077 de R$ 4.850,00 sem pedido nem recebimento | Fila de notas não reconhecidas; desconhecimento registrado pelo fiscal em 16/11 | Fila e protocolo |
| Simulação: nota sem evento conclusivo autorizada em 06/11 | Aviso a partir de 21/12 (dia 45); prazo interno em 05/01/2027 (dia 60); prazo legal por volta de 04/02/2027 (dia 90) | Fila de manifestação ordenada por data-limite |
| NF-e 45.388 em 17/11, recebimento em 18/11 de 590 kg e 4 CX | Sem divergência; R$ 7.462,00 liberados sem ação manual | Resultado da conferência |
| Acumulado da barra no PC 7712 | Recebidos 1.202, faturados 1.205, 0,25%, dentro de 6,01 kg; item encerrado com 1.202 contra 1.200 (0,17%) | Saldo do item do pedido |
| Simulação: segunda nota da barra com 596 kg para 590 recebidos | Acumulado 1.211 contra 1.202, 9 kg, acima de 6,01 kg: divergência | Resultado da conferência |
| Simulação: alíquota de IPI na nota diferente da prevista no pedido | Aviso ao fiscal; a decisão não é do comprador | Aviso e fila do fiscal |
| Histórico da NF-e 45.210 | Importação, ciência, vínculo, conferências de 09/11 e 10/11, bloqueio, confirmação, acerto, liberação e pagamento, com autor e horário | Trilha da nota |

*Fim do exemplo fictício. Empresas, pedido, notas, códigos, fatores, quantidades, preços, desconto, frete, tolerâncias, alçadas, datas e decisões são modelo editorial, sem cliente, fornecedor, nota real ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não regras recomendadas, orientação tributária nem comportamento padrão de ferramenta.*

Antes do go-live, pegue as notas de entrada de um mês e confira, num ambiente de teste: quantas chegaram com o número do pedido, quantos itens não têm de-para ou fator, quantas notas cairiam no bloqueio com as tolerâncias propostas e por quais motivos, quantas não têm pedido e quantas notas do período ficaram sem evento conclusivo de manifestação. Se a conferência vai depender de integração com o ERP atual, reúna o que for preciso como em [integração com ERP: o que reunir antes de pedir orçamento](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/). Se a dúvida ainda é se vale sair da planilha de conferência, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Preciso fazer three-way match em todas as notas?

Não necessariamente, e este artigo não recomenda um modelo único. Serviços sem recebimento físico, contas de consumo e contratos recorrentes podem seguir a conferência de duas vias, com o pedido ou o contrato. O Dynamics 365, por exemplo, mostra a política de conferência [definida para a empresa, para o item e para a combinação de item e fornecedor, e elevada no pedido específico](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/three-way-matching-policies). O que importa é que a regra de cada tipo de nota esteja escrita.

### A confirmação da operação aprova a nota para pagamento?

Não. A confirmação diz ao fisco que a operação ocorreu. Preço, frete e condições são conferência interna, que pode continuar bloqueando o pagamento depois de a operação ser confirmada. Os dois processos precisam conversar, mas não são o mesmo.

### Posso deixar a manifestação para depois?

Pode, dentro do prazo, mas o Ajuste SINIEF 14/2026 diz que, [passados 90 dias da autorização sem confirmação, desconhecimento ou operação não realizada, considera-se ocorrida a operação](https://www.legisweb.com.br/legislacao/?id=493948). A nota que ninguém olhou passa a valer como confirmada. O sistema que importa as notas e mostra a fila por data-limite evita que isso aconteça por esquecimento.

### Uma tolerância de preço não é dinheiro jogado fora?

Pode ser, se for larga e sem medida. Uma tolerância estreita evita bloquear notas por centavos de arredondamento; ela não deve servir para absorver reajuste de preço sem negociação. Meça quanto passou pela tolerância em cada mês e por fornecedor, e revise.

Para transformar a conferência de notas de entrada em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) um pedido de compra típico, o recebimento e a nota correspondentes, e o caso mais recente de nota paga com divergência, sem dados confidenciais de fornecedores ou de pessoas.

*Fontes consultadas em 23 de novembro de 2026: CONFAZ, Ajuste SINIEF 14/2026 (texto reproduzido pelo LegisWeb; página do CONFAZ não aberta); Senior Sistemas, Portal de Exigências Legais, notícia sobre a NT 2020.001 v1.60 (27/04/2026); Receita Estadual do RS e Secretaria da Economia de Goiás (página de 2012), manifestação do destinatário; Projeto NF-e, NT 2014.002 v1.40 (cópia hospedada por terceiro; Portal da NF-e não aberto); Microsoft Learn, Dynamics 365 Finance, "Three-way matching policies" (04/06/2026); SAP Learning, "Invoice Verification in SAP S/4HANA" ("Entering Invoices with Variances" e "Use Further Blocking Reasons"); Odoo, documentação 19.0, "Control policies"; Senior Sistemas, GO UP 5.10.3 (recebimento eletrônico) e Gestão Empresarial ERP 5.10.4 (F442DNE); Omie, central de ajuda (xPed e nItemPed, 23/03/2026). Este artigo não recomenda sistema nem fornecedor e não é orientação tributária; empresas, notas, pessoas, números e ilustrações são fictícios.*
