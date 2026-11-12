---
content_id: torno-artigo-pt-20261112-inventario-contagem
intent_id: buyer-inventory-count-adjustment-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Inventário de estoque no sistema: contagem cega, ajuste e o que testar no aceite'
h1: 'Inventário de estoque no sistema: contagem cega, ajuste e o que testar no aceite'
seo_title: 'Inventário de estoque no sistema: contagem e ajuste | Torno'
seo_description: 'Inventário geral ou contagem cíclica, foto do saldo, contagem cega, recontagem, tolerância e aprovação do ajuste: o que definir e testar no sistema.'
summary: 'Roteiro para quem contrata ou mantém um sistema de estoque sob medida definir e testar o inventário antes do aceite: inventário geral e contagem cíclica (rotativa), com critério de quais itens contar com que frequência; a foto do saldo no início e as movimentações que acontecem durante a contagem; contagem cega, sem mostrar o saldo esperado; recontagem e tolerância; motivo e aprovação do ajuste e quem pode ajustar; efeito no custo e no valor do estoque como decisão do contador; trilha do ajuste; relatório de divergências; o inventário anual exigido pela legislação fiscal como responsabilidade do contador; quem decide cada regra; e critérios de aceite sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar o inventário e a contagem de estoque no seu sistema, para que a diferença encontrada seja real, o ajuste seja aprovado por quem pode e o saldo, o custo e os relatórios fiquem certos?
proposed_path: /blog/inventario-contagem-estoque-sistema-aceite/
canonical_url: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores de operação, estoque, logística e financeiro de distribuidoras, atacados, varejo, pequenas indústrias e lojas virtuais que contratam ou mantêm sistema de estoque, ERP próprio ou módulo de inventário sob medida, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de colocar a contagem e o ajuste de inventário em uso no sistema ou antes de trocar o inventário anual por contagens cíclicas.
scope: Inventário geral e contagem cíclica ou rotativa; critério de seleção e frequência de contagem (curva ABC como uma opção); corte de movimentos pendentes; foto do saldo no início da contagem e tratamento das movimentações durante a contagem (bloqueio da posição ou esperado na hora da contagem); contagem cega; recontagem por outra pessoa e tolerância; motivo obrigatório e aprovação do ajuste por alçada; segregação entre quem conta e quem aprova; ajuste de quantidade separado de reclassificação de local; custo usado para valorizar o ajuste e tratamento contábil da perda como decisão do contador; trilha do ajuste; relatório de divergências; inventário anual, Livro Registro de Inventário e Bloco H da EFD ICMS/IPI como responsabilidade do contador; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Parecer fiscal, contábil ou jurídico; preenchimento do Livro Registro de Inventário ou do Bloco H; método de custeio recomendado; controle por lote e validade (coberto em outro artigo); escolha e ensaio de leitor de código de barras (coberto em outro artigo); saldo publicado em marketplace (coberto em outro artigo); devolução de mercadoria (coberta em outro artigo); conteúdo genérico de trilha de auditoria, permissões e fluxos de aprovação (cobertos em outros artigos); recomendação ou comparação de ERP, WMS, sistema ou fornecedor.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-12T21:10:42Z'
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
    reason: Detalha a contagem e o ajuste por lote; aqui a contagem vale para qualquer item e o lote é só uma chave a mais.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Cobre a escolha e o ensaio do leitor; aqui o que o sistema faz com a quantidade contada.
  - path: https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/
    reason: Trata o saldo publicado nos canais de venda; aqui o ajuste que muda esse saldo.
  - path: https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/
    reason: Trata o item devolvido em conferência; aqui a diferença entre saldo e prateleira, qualquer que seja a origem.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui só o que o ajuste precisa registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir perfis; aqui a regra específica de que quem conta não aprova.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Detalha fluxos de aprovação em geral; aqui só a alçada do ajuste.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Ajuda a especificar a contagem em coletor ou celular sem sinal no depósito.
  - path: https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/
    reason: Ajuda a especificar duas pessoas registrando a mesma posição ao mesmo tempo.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Ajuda a conferir relatórios de estoque que mostram números diferentes para a mesma pergunta.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Detalha centavos e arredondamento na valorização do ajuste.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com saldos e movimentos fictícios.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a rotina de inventário em regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'A documentação do Microsoft Dynamics 365 Business Central diz que a contagem física serve para verificar se a quantidade registrada é a mesma do estoque físico; que as contagens costumam ocorrer no fim do exercício, mas podem ser mais frequentes; que se podem contar itens com a frequência desejada, por exemplo porque são mais valiosos ou mais vendidos, atribuindo períodos de contagem a cada item; que é preciso manter as linhas calculadas originalmente e não recalcular o estoque esperado, porque ele pode mudar e levar a saldos incorretos; que erro de local deve ser tratado por reclassificação ou transferência, e não como diferença; e que, depois de ajustar o estoque, é preciso atualizar seu valor.'
    reference: https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify
    entity: Microsoft Learn, Count, adjust, and reclassify inventory (Business Central), atualizada em 17/06/2026
    source_date: '2026-06-17'
    checked_at: '2026-11-12T20:20:00Z'
    limit: Documentação de um produto, citada como exemplo de como sistemas modelam a contagem; não é recomendação. A página não trata contagem cega como recurso nem define tolerância.
  - classification: FATO
    claim: 'A documentação do Business Central sobre contagem por documentos descreve ordens de inventário físico e registros de contagem (recordings) entregues aos funcionários, com campos de quantidade vazios para preencher; permite vários registros para uma ordem, por exemplo para dividir grupos de itens entre pessoas, e diz que o sistema impede registrar duas vezes a contagem do mesmo item.'
    reference: https://learn.microsoft.com/en-za/dynamics365/business-central/inventory-how-count-inventory-with-documents
    entity: Microsoft Learn, Count inventory using documents (Business Central), atualizada em 07/04/2026
    source_date: '2026-04-07'
    checked_at: '2026-11-12T20:25:00Z'
    limit: Documentação de um produto, citada como exemplo; não é recomendação. A página não trata as movimentações durante a contagem.
  - classification: FATO
    claim: 'A documentação do Odoo 18 para ajuste de inventário com código de barras diz que a quantidade esperada é exibida por padrão e pode ser ocultada desmarcando a configuração Show Quantity to Count; que gestores podem atribuir contagens a funcionários; e que o ajuste é concluído com Apply.'
    reference: https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/barcode/operations/adjustments.html
    entity: Odoo S.A., documentação Odoo 18.0, Adjust inventory with barcodes
    source_date: null
    checked_at: '2026-11-12T20:35:00Z'
    limit: Documentação de um produto, citada como exemplo de contagem sem quantidade esperada; data da página não informada; não é recomendação. A página não descreve etapa de aprovação.
  - classification: FATO
    claim: 'O art. 221 do RICMS/SP (Decreto 45.490/2000), publicado no site de legislação da Secretaria da Fazenda e Planejamento de São Paulo, diz que o Livro Registro de Inventário arrola, pelos seus valores, as mercadorias, matérias-primas e demais itens existentes no estabelecimento na época do balanço, inclusive os de terceiros em poder do estabelecimento e os próprios em poder de terceiros, separadamente; prevê colunas de quantidade, unidade e valor; e diz que, se a empresa não mantiver escrita contábil, o inventário é levantado no último dia do ano civil.'
    reference: https://legislacao.fazenda.sp.gov.br/Paginas/art221.aspx
    entity: Secretaria da Fazenda e Planejamento do Estado de São Paulo, RICMS/SP art. 221
    source_date: null
    checked_at: '2026-11-12T20:45:00Z'
    limit: Regra estadual de São Paulo, citada como exemplo de exigência; outros estados e a legislação federal (inclusive o Regulamento do Imposto de Renda) não foram lidos na fonte oficial nesta sessão, porque Planalto e Câmara recusaram o acesso automatizado. Não é parecer fiscal.
  - classification: FATO
    claim: 'O Guia Prático da EFD ICMS/IPI, versão 3.2.3 (atualização de 06/05/2026), lista o Bloco H como Inventário Físico, com os registros H005 (Totais do Inventário), H010 (Inventário), H020 (Informação complementar do Inventário) e H030 (informações complementares do inventário das mercadorias sujeitas ao regime de substituição tributária).'
    reference: https://guiatributario.net/wp-content/uploads/2026/06/guia-efd-versao323.pdf
    entity: Guia Prático da EFD ICMS/IPI, versão 3.2.3, cópia publicada por terceiro (Guia Tributário)
    source_date: '2026-05-06'
    checked_at: '2026-11-12T20:55:00Z'
    limit: 'Cópia de terceiro; o arquivo no portal oficial gov.br/sped foi identificado, mas o acesso automatizado foi recusado nesta sessão. Só a tabela de registros do Bloco H foi lida; regras de preenchimento, prazos e motivos do inventário não foram conferidos. Existe versão posterior, 3.2.4, publicada nos termos do Ato COTEPE/ICMS nº 86, de 9 de setembro de 2026, segundo notícia do Jornal Contábil (https://jornalcontabil.com.br/noticia/publicada-nova-versao-3-2-4-do-guia-pratico-efd-icms-ipi/, consultada em 12/11/2026); a versão 3.2.4 não foi lida. Não é parecer fiscal.'
  - classification: FATO
    claim: 'A Resolução CVM nº 99, de 20 de maio de 2022, aprova o Pronunciamento Técnico CPC 16 (R1), Estoques, vigora desde 1º de julho de 2022 e revoga a Deliberação CVM nº 575/2009; no anexo, o CPC 16 (R1) diz que os estoques devem ser mensurados pelo valor de custo ou pelo valor realizável líquido, dos dois o menor (item 9), e que a quantia de qualquer redução dos estoques para o valor realizável líquido e todas as perdas de estoques devem ser reconhecidas como despesa do período em que a redução ou a perda ocorrerem (item 34).'
    reference: https://www.legisweb.com.br/legislacao/?id=431750
    entity: Resolução CVM nº 99, de 20 de maio de 2022 (CPC 16 (R1) — Estoques), texto reproduzido pela LegisWeb
    source_date: '2022-05-20'
    checked_at: '2026-11-12T21:25:00Z'
    limit: 'Texto lido na LegisWeb, reprodução de terceiro; o PDF no site da CVM não abriu nesta sessão (a ferramenta recusou o endereço). Também foi lida a Deliberação CVM 575/2009 (https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/deliberacoes/anexos/0500/deli575.pdf), revogada, com redação equivalente nos itens 9 e 34. Resolução da CVM obriga companhias abertas; a norma aplicável a cada empresa (porte, regime, norma para pequenas e médias empresas) é decisão do contador. Não é parecer contábil.'
  - classification: HIPÓTESE
    claim: 'A Distribuidora Exemplo Ferragens Ltda., a contagem C-0311, as posições, itens, saldos, custos, horários, contadores C1 e C2, a supervisora, o gerente, a tolerância de 2% ou R$ 50,00, as alçadas de R$ 100,00 e os critérios de aceite são modelo editorial fictício; as regras são proposta de modelagem, não exigência legal, prática recomendada nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de política de estoque, ferramenta ou fornecedor.
---

*Leitura estimada: 12 minutos.*

**Para aceitar o inventário de estoque no sistema, exija por escrito quando o saldo esperado é congelado, o que acontece com as vendas e entradas durante a contagem, se quem conta vê ou não o saldo, quando a diferença obriga a recontar, quem aprova o ajuste e com que motivo, e por qual custo o ajuste é valorizado.** No aceite, peça para ver isso com dados fictícios: uma posição que teve venda durante a contagem e não aparece como divergência; uma diferença acima da tolerância que vai para recontagem cega por outra pessoa; um ajuste que fica parado até a aprovação de quem tem alçada; e um relatório de divergências que bate com os ajustes lançados.

**Este artigo não recomenda sistema nem fornecedor e não é parecer fiscal nem contábil.** Regras, valores e tolerâncias do exemplo são inventados; o inventário que a legislação exige no fim do ano e o tratamento contábil das perdas são assunto do contador. As normas citadas servem de referência para essa conversa.

## Inventário é uma comparação, não uma digitação

O inventário compara duas coisas: o que o sistema diz que existe e o que está na prateleira. A documentação do Business Central, um ERP de mercado, resume bem: contar serve para [verificar se a quantidade registrada é a mesma do estoque físico](https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify) e, havendo diferença, lançar as quantidades reais antes de avaliar o estoque. Não é recomendação de produto; é vocabulário útil.

O problema é que essa comparação só vale se as duas pontas forem do mesmo momento e se a contagem não tiver sido influenciada pelo número que o sistema mostrava. Um sistema que deixa o conferente digitar "o que tem lá" por cima do saldo, sem registrar o esperado, a diferença, o motivo e quem aprovou, apaga exatamente a informação que a empresa queria ter: onde o estoque está sumindo, ou onde o lançamento está errado.

Este artigo trata a contagem e o ajuste para qualquer item. Se o item é controlado por lote e validade, a contagem e o ajuste acontecem por lote, como em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/). O leitor de código de barras que lê a etiqueta durante a contagem é assunto de [leitor de código de barras](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/); aqui interessa o que o sistema faz com a quantidade lida.

## Inventário geral ou contagem cíclica

Há dois formatos, e muitas empresas usam os dois:

- **Inventário geral**: conta tudo, de uma vez, em geral com o depósito parado. É o formato mais comum para o fechamento do ano. Custa um ou mais dias de operação e muita gente ao mesmo tempo.
- **Contagem cíclica (ou inventário rotativo)**: conta uma parte do estoque por vez, em dias diferentes, com o depósito funcionando. Cada item é contado com uma frequência definida.

A documentação do Business Central descreve a segunda forma: é possível contar itens com a frequência que se quiser, [por exemplo porque são mais valiosos ou mais vendidos](https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify), atribuindo um período de contagem a cada item e pedindo ao sistema a lista dos itens com contagem vencida.

Para o **inventário rotativo no sistema**, escreva:

1. **Critério de seleção.** Quais itens entram em cada contagem. Uma opção comum é a curva ABC (itens que concentram mais valor ou giro são contados com mais frequência); outras são por corredor, por fornecedor ou por histórico de divergência. É escolha da operação, não regra.
2. **Frequência por grupo.** Por exemplo: A todo mês, B a cada trimestre, C uma vez por semestre. O sistema calcula a próxima data e mostra o que está atrasado.
3. **Unidade de contagem.** Conta-se o item em todas as posições onde ele está, ou a posição inteira, com todos os itens? A escolha muda o que o sistema congela e o que entra no relatório.
4. **Contagem disparada por evento.** Posição zerada que ainda tinha saldo no sistema, separação que não encontrou o item, divergência no recebimento: cada um pode abrir uma contagem pontual daquela posição.
5. **Relação com o inventário do fim do ano.** Se a contagem cíclica substitui ou não o inventário geral é pergunta para o contador, não para o sistema.

## A foto do saldo e o que acontece durante a contagem

Esta é a parte que mais gera diferença falsa. Se a contagem começa às 8h e o depósito continua vendendo, o saldo do sistema muda enquanto as pessoas contam. Contra qual número a contagem é comparada?

A documentação do Business Central dá a pista: depois de calcular as linhas de contagem, [mantenha as linhas calculadas originalmente e não recalcule o esperado](https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify), porque o estoque esperado pode mudar e levar a saldos incorretos. Ou seja: o sistema grava uma **foto do saldo** (snapshot) no início, e a comparação parte dela.

Há duas formas de lidar com o que acontece depois da foto:

- **Bloquear a posição.** Enquanto a posição está em contagem, nada entra nem sai dela. É simples de entender e de testar, mas para a operação. Costuma ser o caso do inventário geral.
- **Esperado na hora da contagem.** O depósito continua operando; o sistema registra a hora em que cada posição foi contada e calcula o esperado como foto mais os movimentos registrados até aquela hora. O que acontece depois da contagem não entra na diferença; entra no saldo final normalmente.

![Ilustração de uma estante com quatro posições e um relógio marcando 08:00, hora da foto do saldo na contagem cíclica fictícia C-0311 de 10/11/2026; o depósito continua vendendo. Posição B-02-1, parafuso M8 em caixa de 100: foto 120, saída de 10 às 09:15, esperado 110, contagem às 10:05 de 110, diferença 0. Posição B-02-2, bucha 8 mm em pacote de 50: foto 80, sem movimento, esperado 80, contagem às 10:20 de 78, diferença menos 2. Posição B-03-1, fita veda-rosca: foto 200, sem movimento, esperado 200, contagem às 10:35 de 230, diferença mais 30. Posição B-03-2, disjuntor 20 A: foto 40, entrada de 12 às 10:50, esperado 52, contagem às 11:10 de 48, diferença menos 4. Abaixo: esperado é a foto das 08:00 mais os movimentos registrados até a hora em que aquela posição foi contada; movimento depois da contagem não é divergência, e em B-02-1 a saída de 5 caixas às 10:30 deixa o saldo final em 105; diferença fora da tolerância vai para recontagem cega, por outra pessoa. Exemplo fictício.](./torno-inventario-estante-relogio.svg)

*Exemplo fictício: empresa, contagem, posições, itens, saldos e horários inventados; a diferença é medida contra o saldo esperado na hora em que cada posição foi contada. Ilustração original Torno Studio, 2026.*

Qualquer que seja a escolha, há três requisitos que valem para as duas:

- **Corte de pendências antes de começar.** Nota de entrada conferida e não lançada, separação feita no papel e não baixada, transferência em trânsito: tudo isso vira diferença falsa se não for lançado antes da foto. O sistema pode listar as pendências e não deixar a contagem começar com elas abertas, ou ao menos mostrá-las no relatório.
- **Hora confiável em cada registro.** Se o coletor ou o celular conta sem sinal no fundo do depósito e só envia depois, a hora que vale é a da contagem, não a do envio; como especificar o trabalho sem sinal e a confirmação no servidor está em [sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/).
- **Saldo publicado nos canais.** Se o estoque alimenta loja virtual ou marketplace, decida se a posição em contagem continua disponível para venda. Como qualquer movimento, inclusive o ajuste, chega ao saldo publicado está em [integração com marketplace](https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/).

## Contagem cega: quem conta não vê o saldo

Quando a pessoa sabe que o sistema espera 80 e conta 78, a tentação é "achar" mais dois. A **contagem cega** remove essa influência: a tela ou a ficha mostra a posição e o item, mas não o saldo esperado. Alguns sistemas tratam isso como configuração; a documentação do Odoo 18, por exemplo, diz que a quantidade esperada aparece por padrão no app de código de barras e [pode ser ocultada](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/barcode/operations/adjustments.html). No Business Central, a ficha de contagem impressa traz [campos de quantidade vazios para preencher](https://learn.microsoft.com/en-za/dynamics365/business-central/inventory-how-count-inventory-with-documents).

Escreva:

- **Quem vê o esperado.** Em geral, só quem apura (supervisão), depois de a contagem ser registrada.
- **O que a ficha mostra.** Posição, item, unidade de contagem (caixa, pacote, unidade) e, se for o caso, lote. Unidade errada é uma das fontes mais comuns de diferença: 1 caixa com 100 contada como 100 unidades.
- **Contagem zero.** Posição vazia é contada como zero, de forma explícita; "não contei" não pode virar zero.
- **Item encontrado que não estava previsto.** O conferente registra o item que achou na posição, mesmo que a lista não o mostre.
- **Duas pessoas na mesma posição.** A documentação do Business Central diz que o sistema impede registrar duas vezes a contagem do mesmo item quando a ordem é dividida em várias fichas. Peça o mesmo, e decida o que acontece se duas pessoas tentarem registrar a mesma posição ao mesmo tempo, como em [edição simultânea](https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/).

## Recontagem e tolerância

Nem toda diferença deve virar ajuste na hora. A regra mais comum é: dentro da tolerância, aceita; fora dela, reconta. Escreva:

- **Tolerância em quantidade, em valor ou nas duas.** Por exemplo: recontar se a diferença passar de 2% da quantidade esperada ou de R$ 50,00 a custo. Item de alto valor pode ter tolerância zero.
- **Recontagem por outra pessoa, também cega.** Quem reconta não vê o esperado nem a primeira contagem.
- **O que fazer quando as contagens discordam.** Se a segunda contagem bate com o esperado, a primeira fica registrada como erro e não há ajuste. Se a segunda confirma a primeira, a diferença segue para ajuste. Se as três (esperado, primeira e segunda) são diferentes, uma terceira contagem pela supervisão, ou a regra que a empresa definir.
- **Limite de recontagens e prazo.** A posição não pode ficar "em contagem" indefinidamente.

## Ajuste: motivo, alçada e quem não pode ajustar

O **ajuste de inventário** é o movimento que leva o saldo do sistema ao que foi contado. Ele precisa de três coisas que um campo de quantidade editável não tem:

1. **Motivo obrigatório, de uma lista fechada.** Por exemplo: erro de contagem anterior, erro de lançamento (entrada ou saída), avaria, vencimento, perda não identificada, extravio em apuração, sobra não identificada. O motivo alimenta o relatório e a conversa com o contador.
2. **Aprovação por alçada.** Ajustes até um valor são aprovados pela supervisão; acima, pela gerência ou pelo financeiro. O fluxo de aprovação em geral está em [fluxo de aprovação no sistema](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/); aqui basta escrever as faixas e quem aprova cada uma.
3. **Separação de funções.** Quem contou não aprova o ajuste da própria contagem; quem lança entradas e saídas no dia a dia não deveria aprovar o ajuste que corrige o próprio erro. Como modelar perfis está em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

Duas regras complementares:

- **Erro de local não é ajuste.** Se o item foi achado na posição vizinha, a correção é transferência entre posições, não uma perda em uma e uma sobra na outra. A documentação do Business Central faz essa distinção: erro de local se corrige com [reclassificação ou transferência](https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify), não como diferença.
- **Ajuste fora da contagem.** Decida se é permitido ajustar saldo sem uma contagem registrada (por exemplo, avaria vista no dia a dia) e, se for, com que motivo e aprovação. Um caminho de ajuste "avulso" sem aprovação anula todo o controle acima.

## Custo e valor do ajuste: decisão do contador

Todo ajuste muda a quantidade e também o valor do estoque. O sistema precisa saber **por qual custo** valorizar a diferença (custo médio da data, último custo, custo do lote) e **onde** ela vai parar na contabilidade. Isso não é escolha do sistema nem de quem implementa.

O Pronunciamento Técnico CPC 16 (R1), Estoques, aprovado para as companhias abertas pela [Resolução CVM nº 99/2022](https://www.legisweb.com.br/legislacao/?id=431750) (texto reproduzido pela LegisWeb), diz que os estoques são mensurados pelo custo ou pelo valor realizável líquido, dos dois o menor (item 9), e que todas as perdas de estoques são reconhecidas como despesa do período em que a perda ocorrer (item 34). Qual norma vale para a sua empresa, como ela se aplica, em que conta o ajuste entra e como tratar a sobra é decisão do contador. A documentação do Business Central lembra o lado operacional: depois de ajustar a quantidade, [atualize o valor](https://learn.microsoft.com/dynamics365/business-central/inventory-how-count-adjust-reclassify).

Para o sistema, o requisito é: o custo usado em cada ajuste fica gravado no próprio ajuste (não recalculado depois), a regra vem por escrito do contador, e o arredondamento segue o que está em [valores monetários no sistema](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).

## Trilha do ajuste e relatório de divergências

Ajuste de inventário é um caminho conhecido para esconder desvio: uma perda "explicada" por um ajuste sem motivo some do relatório. Peça registro de: quem gerou a contagem, a foto do saldo, quem contou cada posição e a que horas, cada recontagem, a diferença, o motivo, quem aprovou e quando, e o custo usado. O que um bom registro de auditoria deve conter, em geral, está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

O relatório de divergências é o produto da contagem. Ele deveria mostrar, por contagem e por período:

- posições contadas, com e sem diferença;
- diferenças antes e depois da recontagem (quantas foram erro de contagem);
- ajustes por motivo, por item, por posição e por responsável pela área;
- valor ajustado, a menos e a mais, separado (sobra não compensa perda sem que alguém veja);
- itens com divergência repetida em contagens seguidas.

Combine também como medir a acurácia (por posição, por item, por valor), porque números diferentes para a mesma pergunta são fonte de discussão, como em [números divergentes no dashboard](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/).

![Ilustração de uma prancheta com a ficha da contagem cíclica fictícia C-0311 de 10/11/2026. Ficha da 1ª contagem, contador C1, sem o saldo esperado na tela ou no papel: B-02-1 parafuso M8, 110; B-02-2 bucha 8 mm, 78; B-03-1 fita veda-rosca, 230; B-03-2 disjuntor 20 A, 48. Em outra folha, separada da prancheta, a ficha da recontagem cega pelo contador C2, sem o esperado e sem a 1ª contagem: B-02-2, 78; B-03-1, 200; B-03-2, 48. Num cartão à parte, a apuração no sistema, vista pela supervisão: B-02-1 esperado 110, 1ª 110, ajuste 0; B-02-2 esperado 80, 1ª 78, 2ª 78, ajuste menos 2, R$ 24,00, aprovado pela supervisora de estoque; B-03-1 esperado 200, 1ª 230, 2ª 200, ajuste 0, a 1ª contagem fica como erro; B-03-2 esperado 52, 1ª 48, 2ª 48, ajuste menos 4, R$ 140,00, aprovado pelo gerente, motivo em apuração. Regras do exemplo: recontar se a diferença passar de 2% ou de R$ 50,00 a custo; ajuste até R$ 100,00 aprovado pela supervisora, acima disso pelo gerente; quem contou não aprova o ajuste; total ajustado de R$ 164,00 a menos. Exemplo fictício.](./torno-inventario-ficha-cega.svg)

*Exemplo fictício: empresa, contagem, itens, quantidades, custos e regras inventados; quem conta não vê o esperado, e só a apuração compara as contagens com o saldo. Ilustração original Torno Studio, 2026.*

## O inventário do fim do ano é assunto do contador

Além do controle interno, a legislação exige que a empresa registre o estoque existente em certas datas. Como exemplo, o [art. 221 do Regulamento do ICMS de São Paulo](https://legislacao.fazenda.sp.gov.br/Paginas/art221.aspx) diz que o Livro Registro de Inventário arrola, pelos seus valores, as mercadorias, matérias-primas e demais itens existentes no estabelecimento na época do balanço, inclusive os de terceiros em poder da empresa e os da empresa em poder de terceiros, separadamente, com quantidade, unidade e valor; e, para quem não mantém escrita contábil, o inventário é levantado no último dia do ano. Na escrituração digital, a EFD ICMS/IPI tem um Bloco H, "Inventário Físico", com registros de totais e de itens do inventário, conforme a tabela do [Guia Prático da EFD ICMS/IPI, versão 3.2.3](https://guiatributario.net/wp-content/uploads/2026/06/guia-efd-versao323.pdf) (cópia publicada por terceiro; já existe a versão 3.2.4, de setembro de 2026, não lida aqui).

Qual data, quais estabelecimentos, quais regras de valoração, o que informar e quando é decisão do contador, para a sua empresa e o seu estado. O que cabe ao sistema:

- **Gerar a posição de estoque numa data passada**, por estabelecimento, com quantidade, unidade e valor pelo critério que o contador definir, sem depender de alguém rodar o relatório exatamente à meia-noite.
- **Separar estoque próprio em poder de terceiros e de terceiros em poder da empresa** (consignação, conserto, armazém), se a operação tiver esses casos.
- **Não deixar movimento retroativo mudar uma posição já entregue ao contador** sem registro e aviso.
- **Exportar os dados no formato que o contador pedir**, sem que o sistema decida códigos fiscais por conta própria.

A contagem cíclica ao longo do ano ajuda a chegar ao fim do ano com o saldo confiável, mas se ela dispensa ou não uma contagem geral na data do balanço é pergunta para o contador.

## Quem decide cada regra

Antes do aceite, escreva quem é dono de cada regra:

| Regra | Quem decide |
|---|---|
| Formato (geral, cíclica ou ambos), critério de seleção e frequência | Operação ou estoque, com o financeiro |
| Bloqueio da posição ou esperado na hora da contagem; corte de pendências | Operação ou estoque |
| Contagem cega, recontagem e tolerância | Operação ou estoque, com o financeiro |
| Lista de motivos, alçadas de aprovação e separação de funções | Financeiro e direção, com a operação |
| Custo usado no ajuste e tratamento contábil de perdas e sobras | Contador |
| Inventário do fim do ano, Livro Registro de Inventário e Bloco H | Contador |
| Disponibilidade para venda durante a contagem | Comercial, com a operação |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Exemplo Ferragens Ltda. faz contagens cíclicas no depósito, sem parar a operação, com esperado calculado na hora da contagem de cada posição. Em 10/11/2026, a contagem C-0311 cobre quatro posições do corredor B, com foto do saldo às 08:00: B-02-1, parafuso M8 em caixa de 100, 120 caixas, custo R$ 18,00 por caixa; B-02-2, bucha 8 mm em pacote de 50, 80 pacotes, R$ 12,00; B-03-1, fita veda-rosca, 200 unidades, R$ 3,50; B-03-2, disjuntor 20 A, 40 unidades, R$ 35,00. Regras do exemplo: contagem cega; recontagem por outra pessoa se a diferença passar de 2% da quantidade esperada ou de R$ 50,00 a custo; ajuste até R$ 100,00 aprovado pela supervisora de estoque, acima disso pelo gerente; quem contou não aprova; custo médio da data, definido pelo contador do exemplo. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Tentar abrir a C-0311 com uma separação de B-02-1 feita no papel e não baixada | Sistema lista a pendência e não inicia a contagem até ela ser lançada ou justificada | Tela de abertura e lista de pendências |
| Iniciar a C-0311 às 08:00 | Foto do saldo gravada por posição (120, 80, 200, 40), com data e hora | Registro da foto |
| Contador C1 abre a ficha no coletor | Vê posição, item e unidade; não vê saldo esperado | Tela da ficha |
| Saída de 10 caixas de B-02-1 às 09:15; C1 conta 110 às 10:05 | Esperado 110; diferença 0; posição encerrada sem ajuste | Apuração da posição |
| Saída de 5 caixas de B-02-1 às 10:30, depois da contagem | Não vira divergência; saldo final 105 | Movimentos e apuração |
| C1 conta 78 em B-02-2 às 10:20 | Diferença de −2 (2,5%) acima da tolerância; recontagem aberta para outra pessoa | Apuração e tarefa de recontagem |
| C2 abre a recontagem de B-02-2 | Não vê o esperado nem a contagem de C1; conta 78 | Tela da recontagem |
| Ajuste de −2 pacotes em B-02-2 | Valor R$ 24,00; motivo obrigatório; aguarda aprovação da supervisora | Ajuste pendente com motivo |
| C1 tenta aprovar o ajuste de B-02-2 | Bloqueado: quem contou não aprova | Mensagem e registro da tentativa |
| C1 conta 230 em B-03-1; C2 reconta 200 | 1ª contagem registrada como erro; sem ajuste; aparece no relatório como diferença antes da recontagem | Apuração e relatório |
| Entrada de 12 disjuntores em B-03-2 às 10:50; C1 conta 48 às 11:10 | Esperado 52; diferença −4 (R$ 140,00); recontagem; C2 confirma 48 | Movimentos e apuração |
| Ajuste de −4 em B-03-2 | Acima de R$ 100,00: só o gerente aprova; motivo "extravio em apuração" | Ajuste com aprovação do gerente |
| Supervisora tenta aprovar o ajuste de B-03-2 | Bloqueado pela alçada | Registro da tentativa |
| Em outra contagem, cenário à parte: parafusos achados na posição vizinha B-02-3 | Corrigido como transferência entre posições, não como perda e sobra | Movimento de transferência |
| Tentativa de ajuste de saldo sem contagem e sem motivo | Recusada | Registro da recusa |
| Valor dos ajustes | Gravado com o custo da data em cada ajuste; total de R$ 164,00 a menos | Ajustes e relatório |
| Relatório de divergências da C-0311 | 4 posições contadas; 3 com diferença na 1ª contagem; 2 ajustes (−2 e −4); R$ 164,00 a menos; motivos separados | Relatório exportado |
| Posição de estoque em 31/12/2026, gerada em janeiro | Quantidade, unidade e valor por estabelecimento na data pedida, pelo critério do contador; movimentos lançados depois não mudam a posição já entregue sem registro | Relatório exportado e registro |
| Consultar a trilha do ajuste de B-03-2 | Foto, contagens, horários, contadores, diferença, motivo, custo, aprovador e hora | Registro exportado |

*Fim do exemplo fictício. Empresa, contagem, posições, itens, saldos, custos, horários, pessoas, tolerância, alçadas e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. A tolerância, as alçadas, a lista de motivos e o custo médio são escolhas do exemplo, não prática recomendada, interpretação fiscal ou contábil nem padrão de ferramenta.*

## Perguntas frequentes

### Contagem cíclica substitui o inventário anual?

Depende do que a legislação e as normas contábeis pedem para a sua empresa, e isso é pergunta para o contador. Do lado do sistema, a contagem cíclica ajuda a manter o saldo confiável ao longo do ano; o sistema precisa, de qualquer forma, conseguir gerar a posição de estoque na data que o contador pedir.

### Preciso parar o depósito para contar?

No inventário geral, em geral sim. Na contagem cíclica, não, desde que o sistema grave a foto do saldo e calcule o esperado na hora em que cada posição foi contada, ou bloqueie só a posição em contagem. O que não pode é comparar a contagem com o saldo "de agora", que já mudou.

### Diferença pequena precisa de aprovação?

É escolha da empresa. Uma tolerância que aceita diferenças pequenas sem recontagem economiza tempo, mas o ajuste ainda precisa de motivo e de registro de quem aprovou, para que muitas diferenças pequenas não somem uma perda grande sem que ninguém veja.

Para transformar a sua rotina de inventário em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a forma como a contagem é feita hoje (mesmo que em planilha), um relatório de divergências anonimizado e a lista de quem hoje pode ajustar saldo, sem dados reais de clientes.

*Fontes consultadas em 12 de novembro de 2026: documentação do Microsoft Dynamics 365 Business Central (Count, adjust, and reclassify inventory; Count inventory using documents); documentação do Odoo 18.0 (Adjust inventory with barcodes); RICMS/SP, art. 221, no site de legislação da Secretaria da Fazenda e Planejamento de São Paulo; Guia Prático da EFD ICMS/IPI, versão 3.2.3, em cópia publicada por terceiro; Resolução CVM nº 99/2022 (CPC 16 (R1) — Estoques), no texto reproduzido pela LegisWeb, e Deliberação CVM nº 575/2009, revogada. Este artigo não recomenda sistema nem fornecedor e não é parecer fiscal nem contábil; empresa, contagem, posições e ilustrações são modelos editoriais fictícios.*
