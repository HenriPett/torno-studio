---
content_id: torno-artigo-pt-20261112-devolucao-troca
intent_id: buyer-sales-returns-exchanges-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Devolução de mercadoria no sistema: troca, vale-troca e o que testar no aceite'
h1: 'Devolução de mercadoria no sistema: troca, vale-troca e o que testar no aceite'
seo_title: 'Devolução de mercadoria no sistema: troca e vale-troca | Torno'
seo_description: 'Motivo da devolução, conferência antes do estoque, devolução parcial, valor com desconto rateado, estorno, vale-troca e comissão: o que definir e testar.'
summary: 'Roteiro para quem contrata ou mantém um sistema de vendas sob medida definir e testar devolução e troca de mercadoria antes do aceite: motivo da devolução (arrependimento na compra fora do estabelecimento, vício do produto, troca por política própria) e os prazos do CDC; conferência física antes de o item voltar ao estoque (apto, avariado, descarte); devolução parcial; valor devolvido com o desconto do pedido rateado; reembolso, vale-troca ou troca por outro item com diferença de preço; estorno no meio de pagamento original; efeito na comissão e nos relatórios; documento fiscal como definição do contador; trilha de auditoria; quem decide cada regra; e critérios de aceite sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar a devolução e a troca de mercadoria no seu sistema de vendas, para que estoque, dinheiro, comissão e relatórios fiquem certos em cada caso?
proposed_path: /blog/devolucao-troca-mercadoria-sistema-aceite/
canonical_url: https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores comerciais, financeiros e de operação de varejo, atacado, distribuidoras e lojas virtuais que contratam ou mantêm sistema de vendas, ERP próprio ou módulo de pós-venda sob medida, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de colocar a devolução e a troca em uso no sistema ou antes de mudar a política de trocas de um sistema em uso.
scope: Motivo da devolução como campo que decide prazo e consequência (arrependimento do art. 49 do CDC, vício do produto dos arts. 18 e 26, troca por política própria); a regra de troca escrita pela empresa; separação entre movimento de estoque e movimento de dinheiro; conferência física e estados apto, avariado e descarte; devolução parcial e saldo devolvível por linha; valor devolvido com desconto do pedido rateado; reembolso, vale-troca e troca por outro item com diferença de preço; estorno no meio de pagamento original (Decreto 7.962/2013, art. 5º, §3º, no comércio eletrônico); efeito em comissão e relatórios; documento fiscal de devolução como definição do contador; trilha de auditoria; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Parecer jurídico, tributário ou contábil; escolha de CFOP, natureza da operação ou tratamento de impostos na devolução; política de trocas recomendada; cancelamento de operação em andamento (coberto em outro artigo); integração de devoluções de marketplace (coberta em outro artigo); devolução por lote e validade (coberta em outro artigo); regras de comissão em geral (cobertas em outro artigo); logística reversa e coleta; recomendação ou comparação de ERP, sistema ou fornecedor.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-12T15:10:59Z'
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
  - path: https://tornostudio.com/blog/cancelamento-solicitacao-sistema/
    reason: Trata o pedido de cancelamento de uma operação em andamento e a conferência do que foi interrompido; aqui a venda já foi concluída e a mercadoria volta.
  - path: https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/
    reason: Trata a devolução como efeito no saldo publicado no marketplace; aqui o fluxo completo da devolução na empresa.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Detalha a devolução ao lote original e a quarentena por lote; aqui a conferência vale para qualquer item.
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata a confirmação de pagamento pelo provedor; aqui o estorno precisa do mesmo cuidado com estados.
  - path: https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/
    reason: Mostra como o preço do pedido é formado e gravado; aqui esse preço gravado define quanto devolver.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Detalha centavos e arredondamento, necessários no rateio do desconto entre linhas.
  - path: https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/
    reason: Detalha estorno de comissão; aqui só o gatilho que a devolução dispara.
  - path: https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/
    reason: Ajuda a especificar o vale-troca usado ao mesmo tempo em dois caixas.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir quem pode aprovar reembolso, emitir vale e autorizar descarte.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o registro de quem recebeu, conferiu e aprovou cada devolução.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com vendas, pagamentos e estoque fictícios.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a política de trocas em regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'No CDC (Lei nº 8.078/1990), art. 49, o consumidor pode desistir do contrato no prazo de 7 dias a contar da assinatura ou do recebimento do produto ou serviço, sempre que a contratação ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio; pelo parágrafo único, os valores eventualmente pagos durante o prazo de reflexão são devolvidos de imediato, monetariamente atualizados.'
    reference: https://legis.senado.leg.br/norma/549954/publicacao/15763242
    entity: Senado Federal (Legislação), Lei nº 8.078, de 11 de setembro de 1990, texto da publicação
    source_date: '1990-09-11'
    checked_at: '2026-11-12T14:20:00Z'
    limit: 'Texto lido na página do Senado, que avisa não substituir o publicado no Diário Oficial e aparenta ser a redação original; a página da Câmara (norma atualizada) e a do Planalto recusaram acesso automatizado nesta sessão. Conferência secundária, não citada no corpo: compilação não oficial publicada por escritório de advocacia em setembro de 2026 (https://www.rosenbaum.adv.br/wp-content/uploads/2026/09/codigo-de-defesa-do-consumidor-2026-lei-8078-1990.pdf, consultada em 12/11/2026), que indica a Lei 14.181/2021 como última alteração e não traz nota de redação dada, inclusão ou alteração nos arts. 18, 26 e 49. Não é parecer jurídico.'
  - classification: FATO
    claim: 'No CDC, art. 18, os fornecedores respondem pelos vícios de qualidade ou quantidade que tornem o produto impróprio ou inadequado ao consumo; não sanado o vício no prazo máximo de 30 dias, o consumidor pode exigir a substituição por outro da mesma espécie, a restituição imediata da quantia paga, monetariamente atualizada, ou o abatimento proporcional do preço (§1º); o prazo pode ser convencionado entre 7 e 180 dias (§2º); as alternativas valem de imediato quando a substituição das partes comprometer a qualidade, diminuir o valor ou se tratar de produto essencial (§3º). Pelo art. 26, o direito de reclamar por vício aparente ou de fácil constatação caduca em 30 dias para produto não durável e 90 dias para durável, contados da entrega efetiva; reclamação ao fornecedor obsta a decadência até a resposta negativa; no vício oculto, o prazo começa quando o defeito ficar evidenciado.'
    reference: https://legis.senado.leg.br/norma/549954/publicacao/15763242
    entity: Senado Federal (Legislação), Lei nº 8.078, de 11 de setembro de 1990, texto da publicação
    source_date: '1990-09-11'
    checked_at: '2026-11-12T14:20:00Z'
    limit: Mesmo limite da fonte anterior; aplica-se a relações de consumo. Não é parecer jurídico.
  - classification: FATO
    claim: 'O Decreto nº 7.962/2013 regulamenta o CDC na contratação no comércio eletrônico; pelo art. 5º, o fornecedor informa os meios para o direito de arrependimento, que pode ser exercido pela mesma ferramenta usada na contratação (§1º), implica rescisão dos contratos acessórios sem ônus (§2º), deve ser comunicado imediatamente pelo fornecedor à instituição financeira ou à administradora do cartão para que a transação não seja lançada na fatura ou seja estornada se já lançada (§3º), e o fornecedor envia confirmação imediata do recebimento da manifestação (§4º).'
    reference: https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html
    entity: Câmara dos Deputados (Legislação Informatizada), Decreto nº 7.962, de 15 de março de 2013, publicação original
    source_date: '2013-03-15'
    checked_at: '2026-11-12T14:25:00Z'
    limit: Publicação original lida no espelho da Câmara; alterações posteriores não conferidas. Aplica-se ao comércio eletrônico. Não é parecer jurídico.
  - classification: FATO
    claim: 'O guia de presentes da Fundação Procon-SP (dezembro de 2019) orienta que, na compra em loja física, o fornecedor não tem obrigação de desfazer o negócio por arrependimento, que o cancelamento por arrependimento só é possível na compra fora do estabelecimento, em 7 dias; que a loja é obrigada a trocar se houver defeito de fabricação, com prazos de reclamação de 30 dias (não duráveis) e 90 dias (duráveis) a partir da entrega efetiva; e que, se a loja permite a troca sob determinadas condições, é obrigada a cumpri-las, devendo o consumidor verificar prazo e condições na etiqueta ou na nota fiscal.'
    reference: https://www.procon.sp.gov.br/wp-content/uploads/2020/02/Presentes.pdf
    entity: Fundação Procon-SP, guia de presentes, dezembro de 2019
    source_date: '2019-12-01'
    checked_at: '2026-11-12T14:30:00Z'
    limit: 'Material de orientação ao consumidor, não norma; a data de dezembro de 2019 vem do próprio documento (dia não informado; usado o dia 1). Leis estaduais ou municipais sobre informação de política de troca não foram pesquisadas. Não é parecer jurídico.'
  - classification: FATO
    claim: 'A documentação do Microsoft Dynamics 365 Business Central descreve que uma devolução ou reembolso pode se referir só a parte dos itens da fatura, exigindo editar as linhas do crédito ou da ordem de devolução; recomenda devolver itens ao estoque pelo custo em que foram vendidos (exact cost reversing); e diz que a ordem de devolução gera o crédito e outros documentos relacionados, como uma ordem de reposição.'
    reference: https://learn.microsoft.com/dynamics365/business-central/sales-how-process-sales-returns-cancellations
    entity: Microsoft Learn, Process sales returns or cancellations (Business Central), atualizada em 09/04/2026
    source_date: '2026-04-09'
    checked_at: '2026-11-12T14:35:00Z'
    limit: Documentação de um produto, citada como exemplo de como sistemas modelam devolução; não é recomendação.
  - classification: FATO
    claim: 'A documentação do Business Central sobre ordens de devolução prevê um campo de código do motivo da devolução em cada linha, uma opção para mostrar só as linhas com quantidade ainda não devolvida, a criação de linha só para a quantidade restante quando parte já foi revertida, a troca pelo mesmo item ou por outro em uma nova ordem de venda e a cobrança de taxa de reposição como encargo do item.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-process-sales-returns-orders
    entity: Microsoft Learn, Process sales return orders (Business Central), atualizada em 05/03/2024
    source_date: '2024-03-05'
    checked_at: '2026-11-12T14:40:00Z'
    limit: Documentação de um produto, citada como exemplo de vocabulário; não é recomendação. A página não diz que o motivo altera estoque ou custo.
  - classification: HIPÓTESE
    claim: 'A Comercial Exemplo Utilidades Ltda., a venda V-2050, a vendedora V-03, os produtos, preços, desconto, datas, a política de trocas por cortesia, o vale-troca, a regra de comissão de 2%, os estados da conferência e os critérios de aceite são modelo editorial fictício; as regras são proposta de modelagem, não exigência legal, política recomendada nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de política comercial, ferramenta ou fornecedor.
---

*Leitura estimada: 13 minutos.*

**Para aceitar a devolução de mercadoria no sistema, exija por escrito o motivo de cada devolução e o que ele decide, o estado do item até alguém conferir, quanto dinheiro volta e por onde, e o que muda em comissão e relatórios.** No aceite, peça para ver isso com dados fictícios: uma devolução parcial de um pedido com desconto que devolve o valor pago, não o preço de tabela; um item devolvido que não aparece como disponível até ser conferido; um estorno ligado à venda original; e um vale-troca que não pode ser usado duas vezes.

**Este artigo não define política de trocas, não recomenda sistema nem fornecedor e não é parecer jurídico nem contábil.** Prazos, valores e regras do exemplo são inventados; o que a lei exige no seu caso é pergunta para o jurídico, e o documento fiscal da devolução, para o contador. As leis citadas são referência para essa conversa.

## Devolução não é cancelamento ao contrário

Quando a mercadoria já foi entregue e volta, três coisas acontecem em tempos diferentes: o cliente pede, o item chega (e alguém olha para ele) e o dinheiro, ou o crédito, sai. Um botão "devolver venda" que desfaz tudo de uma vez, como se a venda nunca tivesse existido, costuma esconder o que importa: o item pode estar quebrado, o cliente pode devolver só uma parte, o desconto do pedido precisa ser dividido e o pagamento original pode já ter sido repassado.

Como conferir o que um pedido de cancelamento de fato interrompeu, quando a operação ainda está em andamento, está em [cancelamento no sistema](https://tornostudio.com/blog/cancelamento-solicitacao-sistema/). Aqui a venda foi concluída e a mercadoria foi entregue. Se a venda veio de um marketplace, o efeito no saldo publicado está em [integração com marketplace](https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/); este artigo trata o fluxo dentro da empresa.

A documentação de um ERP de mercado ilustra essa separação: o Business Central trata a devolução como um [documento próprio](https://learn.microsoft.com/dynamics365/business-central/sales-how-process-sales-returns-cancellations), que gera o crédito ao cliente e, se for o caso, uma ordem de reposição, e lembra que a devolução pode se referir só a parte dos itens da fatura. Não é recomendação de produto; é vocabulário útil para a conversa. O que importa é que a devolução seja um registro com vida própria, ligado à venda original, e não uma edição da venda.

## O motivo decide o prazo e a consequência

O campo mais importante da devolução é o motivo, porque ele muda o prazo, o que o cliente pode escolher e quem paga a conta. Em relações de consumo, há pelo menos três motivos com regras diferentes:

- **Arrependimento na compra fora do estabelecimento.** Pelo [art. 49 do Código de Defesa do Consumidor](https://legis.senado.leg.br/norma/549954/publicacao/15763242), o consumidor pode desistir em 7 dias, contados da assinatura ou do recebimento do produto, quando a contratação ocorre fora do estabelecimento comercial, "especialmente por telefone ou a domicílio"; os valores pagos nesse prazo são devolvidos de imediato, atualizados. Não depende de defeito.
- **Vício do produto.** Pelo art. 18 do CDC, o fornecedor responde pelo vício que torna o produto impróprio ou inadequado; se não for sanado em até 30 dias, o consumidor escolhe entre outro produto da mesma espécie, a restituição da quantia paga ou o abatimento proporcional do preço (§1º), e em alguns casos pode escolher de imediato (§3º). Pelo art. 26, o prazo para reclamar de vício aparente é de 30 dias para produto não durável e de 90 dias para durável, contados da entrega; no vício oculto, conta de quando o defeito aparece.
- **Troca por política própria.** Na compra em loja física de produto sem defeito, o [guia do Procon-SP](https://www.procon.sp.gov.br/wp-content/uploads/2020/02/Presentes.pdf) orienta que o comerciante não tem obrigação de desfazer o negócio por arrependimento. Mas, se a loja oferece troca sob determinadas condições, é obrigada a cumpri-las. Ou seja: pelo CDC, a troca por cortesia é opcional, e a regra que a empresa anuncia vira compromisso.

Na venda pela internet, o [Decreto nº 7.962/2013](https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html) acrescenta detalhes operacionais ao arrependimento: o consumidor pode exercê-lo pela mesma ferramenta usada para comprar, o fornecedor envia confirmação imediata do recebimento da manifestação de arrependimento (art. 5º, §§1º e 4º) e comunica imediatamente a instituição financeira ou a administradora do cartão para que a transação não seja lançada ou seja estornada (§3º).

Para o sistema, isso vira requisito:

1. **Motivo obrigatório, de uma lista fechada**, escolhido na abertura da devolução, com a possibilidade de reclassificar (com registro) depois da conferência: o cliente diz "defeito" e a conferência mostra que é mau uso.
2. **Datas que alimentam o prazo**: data da venda, da entrega efetiva, do pedido de devolução e, no vício oculto, de quando o defeito apareceu. Sem a data de entrega gravada, o sistema não consegue dizer se o arrependimento está no prazo.
3. **Regra de contagem escrita.** O dia do recebimento conta? Prazo que termina em domingo se estende? No exemplo abaixo, a contagem começa no dia seguinte ao recebimento; essa é uma escolha a confirmar com o jurídico, não uma interpretação da lei.
4. **Canal da venda no pedido**: loja física, site, telefone, vendedor externo. É ele que diz se o arrependimento do art. 49 se aplica; o enquadramento de cada canal é decisão do jurídico, e o sistema só aplica o que foi decidido.
5. **Venda entre empresas tem outra regra.** Se o comprador é uma empresa e a relação não é de consumo, a devolução segue o contrato e a política comercial. Separe os dois fluxos pelo tipo de cliente e confirme com o jurídico.

## Escreva a sua política de troca, e ponha no sistema

A troca por cortesia é onde mais nasce discussão, porque mora na cabeça do balconista. Escreva-a como regra, com números, e faça o sistema aplicá-la:

- **Prazo**: quantos dias, contados da compra ou da entrega.
- **Condição do item**: sem uso, com etiqueta, na embalagem original; o que conta como "uso".
- **Itens excluídos**: roupa íntima, produto sob encomenda, item em liquidação, se for o caso.
- **O que o cliente recebe**: só troca, vale-troca ou também dinheiro de volta.
- **Comprovante**: nota fiscal, cupom de troca (sem preço, para presente) ou busca pelo CPF.
- **Onde a regra aparece**: etiqueta, nota, site. O guia do Procon-SP orienta o consumidor a procurar prazo e condições na etiqueta ou na nota; o sistema que imprime esses documentos precisa imprimir a regra vigente na data da venda.

E guarde a versão da política na venda: um cliente que comprou quando a regra era de 30 dias não perde o direito porque a loja mudou para 15 depois.

## Estoque e dinheiro: duas chaves diferentes

Toda devolução mexe em duas coisas, e elas não andam juntas:

- **Estoque**: o item volta, mas em que estado? Até alguém olhar, ele não está à venda.
- **Dinheiro**: reembolso, crédito ou troca, que podem acontecer antes da chegada do item (no arrependimento, o CDC fala em devolver os valores de imediato), depois da conferência (na troca por cortesia, que depende do estado do item) ou nunca (troca por outro igual).

Peça que o sistema registre as duas como movimentos separados, cada um com estado, data e responsável, ambos ligados à mesma devolução e à venda original. Quando o reembolso sai antes de o item chegar, decida o que acontece se o item não chegar, ou chegar trocado. Isso é regra do financeiro com o jurídico; o sistema só precisa mostrar a pendência e não deixar a devolução "concluída" com uma das chaves aberta.

## Conferência antes do estoque: apto, avariado ou descarte

Item devolvido não volta direto para o disponível. Entra num estado próprio, "em conferência", fora do saldo vendável, e só sai dali quando alguém registra o resultado:

- **Apto**: volta ao disponível, para venda normal.
- **Avariado**: fica bloqueado, com destino definido: devolução ao fornecedor, conserto, venda como "segunda linha" ou descarte depois.
- **Descarte**: baixa do estoque, com motivo, foto se for o caso e aprovação de quem pode autorizar perda.

![Ilustração de uma bancada de conferência vista de cima, com os itens que voltaram da venda fictícia V-2050 em novembro. Numa bandeja de entrada, com a etiqueta em conferência, fora do disponível, não vende, estão três itens: jogo de facas, 1 unidade, lacrado; garrafa térmica 1 L, 1 unidade, lacrada; panela de pressão 4,5 L, 1 unidade, com a válvula vazando. Abaixo, três caixas: apto, volta ao disponível, com o jogo de facas e a garrafa térmica; avariado, bloqueado, com a panela, destino fornecedor; descarte, baixa com motivo, sem nenhum item neste exemplo. Na prancheta: quem confere registra estado, foto e data; no exemplo, avariado só sai para fornecedor ou conserto; descarte só com aprovação do gerente; motivo do cliente e resultado da conferência ficam separados. Exemplo fictício.](./torno-devolucao-bancada-conferencia.svg)

*Exemplo fictício: empresa, venda, produtos e estados inventados; o item devolvido só volta a ser vendido depois que alguém o confere. Ilustração original Torno Studio, 2026.*

Para cada estado, decida quem pode registrar, se a foto é obrigatória e qual o prazo máximo em conferência antes de um alerta. Separe também o motivo declarado pelo cliente do resultado da conferência: os dois alimentam relatórios diferentes (por que os clientes devolvem × quanto da devolução volta à venda). Se o item é controlado por lote e validade, a devolução volta ao lote original e entra em quarentena, como em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/).

## Devolução parcial e saldo devolvível

A **devolução parcial de venda** é o caso comum: de três itens, volta um; de três unidades, volta uma. O sistema precisa saber, para cada linha da venda, quanto ainda pode ser devolvido. A documentação do Business Central faz isso com uma opção que [mostra só as linhas com quantidade ainda não devolvida](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-process-sales-returns-orders) e cria a linha da devolução só para o que resta. Teste três coisas:

- **Saldo por linha**: depois de devolvida 1 de 3 unidades, a próxima devolução aceita no máximo 2.
- **Devolução de item que não está na venda**: recusada, ou tratada como exceção com responsável.
- **Várias devoluções da mesma venda**: cada uma com número próprio, todas visíveis a partir da venda.

## Quanto devolver: o preço pago, não o de tabela

Se o pedido teve desconto no total, cada item devolvido carrega a sua parte do desconto. Devolver o preço de tabela é dar dinheiro a mais; devolver sem critério é discussão no balcão. Escreva:

- **Como o desconto do pedido é rateado entre as linhas**: proporcional ao valor de cada linha é o mais comum, mas é uma escolha; o rateio deveria ser gravado na venda, não recalculado na devolução.
- **Para onde vão os centavos do rateio**, como em [valores monetários no sistema](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).
- **Brinde e "leve 3, pague 2"**: se o cliente devolve um dos três, quanto volta? Escreva a regra antes de alguém perguntar.
- **Frete**: se volta, quando e quanto.

O valor de cada linha nasce na formação do preço, coberta em [tabela de preços e descontos](https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/). Aqui a regra é: a devolução lê o preço gravado na venda, com todos os descontos, e nunca o preço de tabela de hoje.

![Ilustração de um recibo da venda fictícia V-2050, de 02/11/2026, com três canhotos de devolução destacados. No recibo: panela de pressão 4,5 L, 2 unidades, tabela R$ 300,00, pago R$ 270,00; jogo de facas, 1 unidade, tabela R$ 120,00, pago R$ 108,00; garrafa térmica 1 L, 3 unidades, tabela R$ 180,00, pago R$ 162,00; subtotal R$ 600,00; desconto do pedido de 10%, menos R$ 60,00, rateado pelo valor de cada linha; total R$ 540,00 no cartão de crédito em 3 vezes de R$ 180,00; pago por unidade: panela R$ 135,00, facas R$ 108,00, garrafa R$ 54,00. Canhoto D1, 08/11, arrependimento, art. 49 do CDC: 1 jogo de facas, R$ 108,00 e não R$ 120,00; dinheiro: estorno de R$ 108,00 no cartão; estoque: em conferência, depois apto. Canhoto D2, 15/11, troca por cortesia, política da loja: 1 garrafa térmica, R$ 54,00; dinheiro: vale-troca de R$ 54,00; estoque: em conferência, depois apto. Canhoto D3, 20/11, vício, art. 18 do CDC: 1 panela com válvula vazando, valor pago R$ 135,00; dinheiro: nenhum, troca por outra igual; estoque: entra 1 avariada, sai 1 nova. No rodapé: venda líquida de R$ 540,00 para R$ 378,00; comissão de 2% de R$ 10,80 para R$ 7,56. Exemplo fictício.](./torno-devolucao-recibo-canhotos.svg)

*Exemplo fictício: empresa, venda, produtos, valores, datas e percentuais inventados; cada devolução é um canhoto ligado à venda, com motivo, valor pago e destino do dinheiro e do item. Ilustração original Torno Studio, 2026.*

## Reembolso, vale-troca ou troca por outro item

Depois do valor, o destino. São três saídas, e cada uma tem regras próprias:

- **Reembolso**: dinheiro de volta. No vício, a restituição da quantia paga é uma das escolhas do consumidor previstas no art. 18; no arrependimento, a devolução dos valores pagos.
- **Vale-troca (crédito)**: o cliente sai com um crédito para usar depois. O **vale-troca no sistema** precisa de: número único, valor, cliente (nominal ou ao portador), validade, se pode ser usado em parte (e o saldo que fica), se pode virar dinheiro, em quais lojas e canais vale e o que acontece se a venda de origem for desfeita. E precisa resistir ao uso simultâneo: o mesmo vale apresentado em dois caixas ao mesmo tempo só pode ser aceito uma vez, como em [edição simultânea no sistema](https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/).
- **Troca por outro item**: igual (sem movimento de dinheiro) ou diferente, com diferença de preço. Se o novo é mais caro, o cliente paga a diferença; se é mais barato, decida se a diferença vira vale, volta em dinheiro ou se perde, e escreva. O Business Central, por exemplo, permite trocar pelo mesmo item ou por outro, gerando uma nova ordem de venda a partir da devolução.

Decida também se a empresa cobra taxa de reposição em algum caso (a documentação citada prevê essa cobrança como encargo) e, se cobrar, em quais motivos ela é proibida. No vício e no arrependimento de consumo, essa conversa começa com o jurídico.

## Estorno no meio de pagamento original

Reembolso em espécie para uma venda feita no cartão abre espaço para fraude e para diferença no caixa. Por isso, escreva como regra que o dinheiro volta pelo mesmo meio, com as exceções definidas pelo financeiro:

- **Cartão**: estorno pela credenciadora ou pelo provedor de pagamento, ligado à transação original. No comércio eletrônico, o art. 5º, §3º, do Decreto 7.962/2013 manda o fornecedor comunicar o arrependimento imediatamente à instituição financeira ou à administradora do cartão, para que a transação não seja lançada ou seja estornada. Como o estorno aparece na fatura de uma compra parcelada depende do emissor; o sistema registra o pedido de estorno, a confirmação e o valor.
- **Pix, boleto, transferência**: para qual conta, com que comprovante, quem confere os dados bancários.
- **Pagamento misto**: venda paga parte no cartão e parte no vale-troca. A devolução volta para qual meio primeiro? Escreva a ordem.
- **Estados do estorno**: solicitado, confirmado, recusado. O retorno do provedor precisa do mesmo cuidado da confirmação de pagamento, descrito em [integração de pagamentos e status do pedido](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/).

## Comissão, relatórios e documento fiscal

A devolução não termina no balcão:

- **Comissão**: se a venda gerou comissão, a devolução pode estorná-la, conforme a política. O estorno fica ligado à venda original e usa a regra daquela venda; os detalhes, inclusive o que a lei diz para vendedor empregado, estão em [comissão de vendedores no sistema](https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/). Aqui, o requisito é que a devolução dispare o ajuste, sem lançamento manual.
- **Relatórios**: venda bruta, devoluções e venda líquida, separadas. Decida em qual período a devolução entra: na data da devolução ou na data da venda original. Uma venda de outubro devolvida em novembro pode mudar o número de outubro já fechado, e isso precisa ser escolha, não acidente. Relatórios por motivo, por produto e por resultado da conferência mostram onde está o problema.
- **Custo e margem**: o item volta ao estoque por qual custo? A documentação do Business Central indica que normalmente se quer devolver o item pelo custo em que ele foi vendido, e não pelo custo atual. Confirme a regra com o contador.
- **Documento fiscal**: a devolução de mercadoria costuma exigir registro fiscal próprio, e qual documento, quem emite, com que dados e em que prazo é definição do contador para a sua operação. O sistema não deve escolher sozinho; deve deixar a devolução com pendência fiscal visível até o documento definido existir.

## Trilha de auditoria e quem decide cada regra

Devolução mexe com dinheiro e com estoque, e pode virar caminho para desvio: devolução fictícia com reembolso em espécie, vale-troca emitido sem item, item "avariado" que some. Peça registro de quem abriu a devolução, quem recebeu o item, quem conferiu e com que resultado, quem aprovou o reembolso ou emitiu o vale, e quem autorizou o descarte, com data e hora. O que cada registro deve conter está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/); quem pode fazer cada ação, em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

Antes do aceite, escreva quem é dono de cada regra:

| Regra | Quem decide |
|---|---|
| Enquadramento de canal e motivo, prazos legais e contagem | Jurídico |
| Política de troca por cortesia (prazo, condições, exclusões, vale ou dinheiro) | Dono ou direção comercial, com o jurídico |
| Documento fiscal da devolução e custo de retorno ao estoque | Contador |
| Estados da conferência, prazos e destino do avariado | Operação ou estoque |
| Reembolso, estorno, vale-troca e limites de aprovação | Financeiro |
| Estorno de comissão | Comercial, com o RH e o jurídico quando houver vendedor empregado |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Comercial Exemplo Utilidades Ltda. vende pela loja física e pelo site. Em 02/11/2026, a venda V-2050, feita pelo site com atendimento da vendedora V-03 no chat, teve: panela de pressão 4,5 L, 2 × R$ 150,00 = R$ 300,00; jogo de facas, 1 × R$ 120,00; garrafa térmica 1 L, 3 × R$ 60,00 = R$ 180,00. Subtotal R$ 600,00; desconto do pedido de 10% (R$ 60,00), rateado pelo valor de cada linha (R$ 30,00, R$ 12,00 e R$ 18,00); total R$ 540,00, no cartão de crédito em 3 × R$ 180,00. Valor pago por unidade: panela R$ 135,00, facas R$ 108,00, garrafa R$ 54,00. Entrega em 03/11/2026. Regras do exemplo: arrependimento conta 7 dias a partir do dia seguinte ao recebimento (até 10/11); troca por cortesia em até 30 dias da compra (até 02/12), item sem uso e na embalagem original, só com vale-troca nominal, válido por 90 dias, usável em parte; item avariado só sai para devolução ao fornecedor ou conserto; descarte só com aprovação do gerente; comissão de 2% sobre a venda líquida, estornada na devolução. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Em 08/11, cliente pede pelo site para desistir do jogo de facas (D1) | Devolução aberta com motivo arrependimento, dentro do prazo; confirmação de recebimento enviada ao cliente | Devolução, data do pedido e mensagem enviada |
| Valor da D1 | R$ 108,00, não R$ 120,00 | Linha da devolução com o rateio da venda |
| Estorno da D1 | Pedido de estorno de R$ 108,00 ligado à transação original do cartão; estado acompanhado até confirmado | Registro do estorno e retorno do provedor |
| Jogo de facas chega em 10/11, lacrado | Entra "em conferência", fora do disponível; conferência registra apto e só então volta ao saldo vendável | Movimentos de estoque com usuário e hora |
| Mesmo pedido de arrependimento feito em 11/11 | Sistema não oferece o motivo arrependimento (fora do prazo da regra); oferece a política de cortesia, se couber | Tela de abertura da devolução |
| Em 15/11, cliente devolve 1 garrafa térmica lacrada, sem defeito (D2) | Motivo cortesia; vale-troca nominal de R$ 54,00, válido até 13/02/2027; reembolso em dinheiro não oferecido | Vale emitido e devolução |
| Atendente tenta devolver mais 3 garrafas da V-2050 | Sistema aceita no máximo 2 (saldo devolvível da linha) | Mensagem e saldo por linha |
| Garrafa com embalagem aberta e marcas de uso, por cortesia | Devolução recusada com motivo registrado; estoque e dinheiro não mudam | Registro da recusa |
| Em 20/11, panela com a válvula vazando (D3) | Motivo vício, dentro de 90 dias da entrega (produto durável); conferência registra avariado; troca por outra unidade igual: entra 1 avariada, sai 1 nova, nenhum dinheiro | Devolução, movimentos de estoque e destino do avariado |
| D3 sem panela no estoque | Prazo de 30 dias para sanar o vício, contado da reclamação na regra do exemplo (até 20/12), registrado com alerta; alternativas do cliente registradas quando ele escolher | Devolução com prazo e alerta |
| Em 25/11, cliente usa o vale de R$ 54,00 num escorredor de R$ 80,00 | Vale zerado; cliente paga R$ 26,00 de diferença no Pix | Venda nova com os dois meios de pagamento |
| Alternativa: vale usado num item de R$ 40,00 | Saldo de R$ 14,00 no mesmo vale, mesma validade | Extrato do vale |
| Mesmo vale apresentado ao mesmo tempo em dois caixas | Só um uso aceito; o outro recebe recusa clara | Registro dos dois pedidos |
| Comissão da V-03 depois de D1 e D2 | De R$ 10,80 para R$ 7,56 (estorno de R$ 3,24 ligado à V-2050); a venda nova do escorredor gera comissão própria, conforme a regra | Extrato de comissão |
| Relatório de novembro | Venda da V-2050 R$ 540,00 (já com desconto); devoluções R$ 162,00; líquido R$ 378,00; motivos separados | Relatório exportado |
| Descarte de um item avariado | Bloqueado até aprovação do gerente; baixa com motivo | Registro da aprovação |
| Documento fiscal de cada devolução | Pendência fiscal visível até o documento definido pelo contador ser registrado | Lista de pendências |
| Consultar a trilha da V-2050 | Quem abriu, recebeu, conferiu, aprovou, estornou e emitiu o vale em cada devolução | Registro exportado |

*Fim do exemplo fictício. Empresa, venda, vendedora, produtos, valores, datas, política de cortesia, vale-troca, comissão e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. A contagem de prazo, o rateio, o vale só por cortesia e o estorno de comissão são escolhas do exemplo, não interpretação jurídica, política recomendada nem padrão de ferramenta.*

## Perguntas frequentes

### A loja é obrigada a trocar produto sem defeito?

Na compra em loja física, a orientação do Procon-SP é que o comerciante não tem obrigação de desfazer o negócio por arrependimento; o arrependimento do art. 49 do CDC vale para compras fora do estabelecimento. Mas, se a loja anuncia uma política de troca, ela precisa cumprir o que anunciou. Por isso a política deve estar escrita, versionada e aplicada pelo sistema. Confirme o seu caso com o jurídico.

### O reembolso deve esperar o item chegar?

Depende do motivo e da sua política. No arrependimento, o CDC fala em devolução imediata dos valores pagos; na troca por cortesia, faz sentido esperar a conferência. O que o sistema precisa é registrar dinheiro e estoque separadamente e não deixar a devolução concluída com uma das duas pendente.

### Vale-troca pode ter validade?

Validade, uso parcial e conversão em dinheiro são regras da política da empresa, a confirmar com o jurídico, especialmente quando o vale substitui um direito do consumidor e não uma cortesia. No sistema, o importante é que a regra esteja gravada no vale no momento da emissão.

Para transformar a sua política de trocas em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a política atual (mesmo que informal), duas ou três devoluções anonimizadas que deram trabalho e a lista de quem hoje decide cada uma, sem dados reais de clientes.

*Fontes consultadas em 12 de novembro de 2026: Lei nº 8.078/1990 (CDC), arts. 18, 26 e 49, no texto publicado pelo Senado Federal; Decreto nº 7.962/2013 (publicação original, Legislação Informatizada da Câmara dos Deputados); guia de presentes da Fundação Procon-SP (dezembro de 2019); documentação do Microsoft Dynamics 365 Business Central (Process sales returns or cancellations e Process sales return orders). Este artigo não recomenda sistema nem fornecedor, não define política de trocas e não é parecer jurídico nem contábil; empresa, venda, pedidos e ilustrações são modelos editoriais fictícios.*
