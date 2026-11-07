---
content_id: torno-artigo-pt-20261107-conciliacao-bancaria
intent_id: buyer-bank-reconciliation-automation-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Conciliação bancária automática: o que definir e testar antes do aceite'
h1: 'Conciliação bancária automática: o que definir e testar antes do aceite'
seo_title: 'Conciliação bancária automática: o que testar | Torno'
seo_description: 'Origem dos dados, chaves de casamento, divergências e fila de exceções: o que testar antes de aceitar a conciliação bancária automática do sistema.'
summary: 'O que o comprador precisa definir e demonstrar antes de aceitar a conciliação bancária automática de um sistema sob medida: fontes do extrato e do retorno, chaves de casamento, divergências, fila de exceções e evidências, com exemplo fictício.'
primary_question: O que o comprador precisa definir e testar antes de aceitar a conciliação bancária automática de um sistema sob medida?
proposed_path: /blog/conciliacao-bancaria-sistema-extrato-aceite/
canonical_url: https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores financeiros e de operação que contratam ou mantêm um sistema próprio (portal, ferramenta interna, app web) que recebe por Pix, boleto ou transferência e precisa dar baixa em pedidos ou títulos.
buyer_stage: Especificação e aceite de um sistema novo, ou automação da conciliação num sistema em uso.
scope: Fontes de dados (extrato em arquivo ou API, retorno de cobrança CNAB, Pix, Open Finance), chaves e regras de casamento, tolerância, divergências (parcial, duplicado, tarifa, devolução Pix, data de ocorrência e de crédito), fila de exceções com decisão humana, rejeição de arquivo e registro, e critérios de aceite com dados fictícios.
not_scope: Parecer contábil ou fiscal, plano de contas, escolha de banco ou de provedor, tutorial de layout CNAB ou da API Pix, prevenção de fraude e garantia de que todo banco oferece cada formato.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-07T13:46:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-07T13:56:28Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-07T13:57:30Z'
release_approval_evidence: Revisão independente GO de texto, fontes (BCB, FEBRABAN, layouts de bancos, Resolução Conjunta nº 1/2020) e figuras após correções; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não é parecer contábil ou fiscal.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata a confirmação do pagamento no momento do pedido; este artigo cuida da conferência posterior contra o extrato e o retorno do banco.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Aprofunda o que exigir quando o mesmo aviso ou arquivo chega duas vezes, caso que aqui aparece só como critério de aceite.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Define centavos, arredondamento e composição de totais, base para qualquer tolerância de valor na conciliação.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Ajuda a decidir qual data (ocorrência ou crédito) entra em cada relatório e como tratar cortes de período.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Detalha recibo de erros, correção e reenvio de arquivo, que valem também para extrato e retorno rejeitados.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Aprofunda o registro de quem decidiu cada exceção, quando e com qual justificativa.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a conciliação em escopo, regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'O Manual de Padrões para Iniciação do Pix descreve o txid como identificador da transação que, quando em efeito, deve ser utilizado para conciliar pagamentos; na cobrança com QR dinâmico o campo é obrigatório (no payload da cobrança, não no QR em si) e permite ao PSP do recebedor apresentar ao usuário recebedor a funcionalidade de conciliação; normalmente é criado pelo usuário recebedor, que pode delegar a criação ao PSP em pagamentos imediatos.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf
    entity: Banco Central do Brasil (Manual de Padrões para Iniciação do Pix, versão 2.10.0)
    source_date: SEM DADO
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'Versão 2.10.0 lida (§2.6.2 para o uso na conciliação; §2.7.1.1 e nota 38 para a criação do txid pelo recebedor; §2.7.4 para o QR dinâmico na API Pix); a capa aponta a 2.11.0-rc1 e não traz data. Na cobrança com QR dinâmico o txid tem de 26 a 35 caracteres; os identificadores do artigo são encurtados para leitura. No QR estático o campo pode não ser usado.'
  - classification: FATO
    claim: 'No Manual de Fluxos do Processo de Efetivação do Pix, nos fluxos de devolução, o PSP recupera com base no EndToEndId a data do pagamento e o valor da transação original.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/III_ManualdeFluxosdoProcessodeEfetivacaodoPix.pdf
    entity: Banco Central do Brasil (Manual de Fluxos do Processo de Efetivação do Pix, versão 2.1)
    source_date: SEM DADO
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'O manual menciona o EndToEndId em trechos operacionais (seções 4.1 e 4.2) sem defini-lo; o artigo o descreve só funcionalmente e não afirma formato. A especificação da API Pix em bacen.github.io não pôde ser lida por inteiro. A capa anuncia a versão 2.2, com vigência a partir de 01/02/2027.'
  - classification: FATO
    claim: 'Segundo o guia do BCB sobre devoluções no Pix, o usuário recebedor pode devolver, a seu critério, qualquer Pix creditado em sua conta; a devolução pode ser total ou parcial, com múltiplas devoluções parciais da mesma transação; o Mecanismo Especial de Devolução permite devolução pelos PSPs em casos de fraude e de falha operacional; o PSP do recebedor pode fazer bloqueio cautelar por até 72 horas quando houver suspeita de fraude.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Guia_MED.pdf
    entity: Banco Central do Brasil (Guia de implementação dos procedimentos de devolução no Pix, com ênfase no MED)
    source_date: SEM DADO
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'O endereço principal serve a versão 4.3, cuja capa indica a 4.4 com vigências a partir de 01/09/2026 e 26/10/2026, portanto já vigente. Os trechos foram conferidos na 4.3 e na 4.4 (https://bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/versoes_futuras/Guia_MED-versao4-4.pdf), que mantém a mesma redação nas seções 2, 3.1, 4.3.3 e no glossário (bloqueio cautelar realizado pelo PSP do recebedor). Guia de implementação para participantes, não norma; o Regulamento Pix em português consolidado não foi localizado (a versão em inglês do BCB não foi usada como fonte do texto).'
  - classification: FATO
    claim: 'O layout padrão FEBRABAN de 240 posições cobre, entre outros serviços, pagamentos, títulos em cobrança e Extrato de Conta Corrente para Conciliação Bancária; no retorno de títulos em cobrança, os segmentos T e U são obrigatórios.'
    reference: https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/Layout%20padrao%20CNAB240%20V10_13%2013_07_26.pdf
    entity: Federação Brasileira de Bancos (FEBRABAN), Padrão FEBRABAN 240 posições
    source_date: SEM DADO
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'O cabeçalho das páginas indica V10.13, mas a capa traz Versão 10.12 e a data 13/07/2027, inconsistente com o nome do arquivo; o artigo não cita versão nem data. Cada banco publica a própria adaptação.'
  - classification: FATO
    claim: 'No layout de cobrança CNAB 240 do Santander (versão 8.3, abril de 2025), o segmento U do retorno traz campos separados para juros/multa/encargos, valor pago pelo pagador, valor líquido a ser creditado, data da ocorrência e data da efetivação do crédito; o segmento T traz o valor da tarifa/custas; a Nota 40-C lista, entre os códigos de liquidação, 09 Pagamento Parcial e 61 Liquidação por Pagamento PIX.'
    reference: https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf
    entity: Banco Santander (Brasil), Manual do Cliente de Cobrança, Layout CNAB 240
    source_date: '2025-04-01'
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'Exemplo de um banco, data só por mês; outros bancos usam campos e códigos próprios. No mesmo manual, o código 09 tem outro sentido na seção de baixa.'
  - classification: FATO
    claim: 'O guia do Sicoob para arquivos CNAB 240 de pagamentos e transferências separa a rejeição do arquivo inteiro, por erros de composição que comprometem a estrutura (header, trailer, campos de controle), da rejeição apenas do registro, por erros como campo obrigatório ausente, letra em campo numérico ou valor fora do domínio.'
    reference: https://www.sicoob.com.br/documents/20128/1635942/Guia+de+importacao+de+arquivos+CNAB+240+Piloto.pdf
    entity: Sicoob, Guia de Importação de Arquivos CNAB 240 – Pagamentos e Transferências (versão 4.0)
    source_date: '2026-07-01'
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'Descreve como o banco valida arquivos de pagamento que recebe; o artigo usa a distinção como analogia para a importação no sistema, não como regra de extrato ou de retorno de cobrança.'
  - classification: FATO
    claim: 'A Resolução Conjunta nº 1/2020 define cliente como pessoa natural ou jurídica; inclui no escopo do Open Finance dados de transações de contas de depósito à vista; exige consentimento com finalidades determinadas e prazo de validade compatível com elas (o limite de doze meses foi retirado pela Resolução Conjunta nº 7/2023) e garante a revogação a qualquer tempo.'
    reference: https://normativos.bcb.gov.br/Lists/Normativos/Attachments/51028/Res_Conj_0001_v10_P.pdf
    entity: Banco Central do Brasil e Conselho Monetário Nacional (Resolução Conjunta nº 1, de 4 de maio de 2020, texto compilado)
    source_date: '2026-10-22'
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'Texto compilado com alteração mais recente citada de 22/10/2026 (Resolução Conjunta nº 21). A FAQ do Open Finance Brasil (2022) ainda menciona limite de 12 meses e não foi usada. Não afirma que o próprio sistema do comprador possa receber dados; isso exige instituição autorizada e produto concreto.'
  - classification: FATO
    claim: 'A especificação OFX 2.2 prevê um identificador de transação da instituição financeira (FITID).'
    reference: https://financialdataexchange.org/wp-content/uploads/2025/12/OFX-2.2.pdf
    entity: Financial Data Exchange (FDX), Open Financial Exchange 2.2
    source_date: SEM DADO
    checked_at: '2026-11-07T13:44:00Z'
    limit: 'Só o sumário (seção 3.2.3) pôde ser lido; a definição e eventuais regras de unicidade não foram lidas, e o artigo não afirma unicidade nem uso para deduplicação.'
  - classification: HIPÓTESE
    claim: 'Os Clientes C-01 a C-03, pedidos, títulos, lançamentos, valores, arquivos, tolerâncias, bandejas e critérios de aceite deste artigo, bem como as ilustrações, são modelos editoriais fictícios.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, banco, sistema entregue nem teste executado; não são parecer contábil ou fiscal.
---

*Leitura estimada: 7 minutos.*

**Antes de aceitar a conciliação bancária automática, defina de onde vem cada dado, qual chave liga o dinheiro ao pedido ou título, o que o sistema faz quando o valor ou a data não batem e quem decide o que sobrou.** No aceite, peça para ver três resultados com dados fictícios: o que casou sozinho, o que foi para uma fila de exceções com motivo, e o arquivo ou registro que foi recusado sem baixar nada.

**Não é parecer contábil nem fiscal.** Lançamentos e fechamento são decisões da empresa com a contabilidade. Aqui eu trato do que o sistema precisa fazer, e de como testar.

## O que “conciliar” significa no sistema

Conciliar é ligar cada entrada de dinheiro a um registro de negócio (pedido, título, parcela) e guardar o resultado: casou com quem, por qual regra, com que diferença e quem confirmou. Isso é diferente de [mudar o status do pedido quando o pagamento é confirmado](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/): a conciliação confere depois, contra o que o banco informou, e acha o que a confirmação deixou passar.

## De onde vêm os dados

Liste cada fonte, com formato, frequência e responsável:

- **Extrato da conta**, em arquivo ou API. O padrão FEBRABAN de 240 posições prevê um serviço de [Extrato de Conta Corrente para Conciliação Bancária](https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/Layout%20padrao%20CNAB240%20V10_13%2013_07_26.pdf). A [especificação OFX 2.2](https://financialdataexchange.org/wp-content/uploads/2025/12/OFX-2.2.pdf) prevê um identificador de transação da instituição (FITID); antes de usá-lo como chave, veja como o seu banco o preenche.
- **Arquivo de retorno CNAB de cobrança**, com a situação de cada boleto. No mesmo padrão FEBRABAN, o retorno de títulos em cobrança usa os segmentos T e U.
- **Pix**, pelo extrato ou pela API do banco.
- **Open Finance**, que alcança também empresas: a [Resolução Conjunta nº 1/2020](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/51028/Res_Conj_0001_v10_P.pdf) define cliente como pessoa natural ou jurídica e inclui transações de conta de depósito à vista. O compartilhamento exige consentimento com finalidade e prazo compatível, revogável a qualquer tempo, e uma instituição autorizada que receba os dados.

Nem todo banco oferece cada formato, e cada um adapta o layout. Confirme o que o seu contrato inclui antes de fechar o escopo.

## Regras de casamento: chave forte primeiro

A melhor ligação é uma chave que nasce no sistema e volta do banco:

- **Pix com cobrança**: o [Manual de Padrões para Iniciação do Pix](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf) descreve o txid como identificador usado para conciliar pagamentos; na cobrança com QR dinâmico ele é obrigatório e costuma ser criado pelo recebedor. Se o sistema gera um txid por pedido, o casamento é direto.
- **Boleto**: o nosso número do título, devolvido no retorno.

Sem chave, sobra o casamento por valor, data e pagador. Trate-o como sugestão: dois clientes podem pagar o mesmo valor no mesmo dia. Defina se ele pode baixar sozinho ou só propor, e qual tolerância vale (centavos, dias), o que depende de como o sistema [guarda e arredonda centavos](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).

![Peças de encaixe ligam lançamentos fictícios do banco (extrato e retorno), à esquerda, a pedidos e títulos do sistema, à direita: Pix de R$ 1.250,00 com txid T-0042 no Pedido P-0042 (Cliente C-01); crédito de R$ 978,50 do nosso número NN-0007, informado no retorno CNAB, no título de R$ 1.000,00 (Cliente C-02), com tarifa de R$ 21,50; Pix de R$ 430,00 sem txid no Pedido P-0051 (Cliente C-03) só por valor, data e pagador, com a ressalva “sugestão, confirmar”; crédito de R$ 215,90 sem identificação, sem par.](./torno-conciliacao-encaixe.svg)

*Exemplo fictício: clientes, pedidos, chaves e valores não vêm de banco ou sistema real; identificadores encurtados para leitura; no teste, use o formato exigido pelo banco. A chave forte encaixa sozinha; valor e data só sugerem. Ilustração original Torno Studio, 2026.*

## Divergências que o sistema precisa reconhecer

- **Pagamento parcial.** No [layout de cobrança CNAB 240 do Santander](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf) (v8.3, abril de 2025), há código de liquidação para pagamento parcial. Decida se o título fica em aberto pelo saldo.
- **Tarifa, juros e multa.** No mesmo layout, o retorno separa valor pago, juros/multa, tarifa e valor líquido creditado. O sistema precisa explicar por que o extrato mostra menos que o título.
- **Data da ocorrência e data do crédito.** O segmento U do Santander traz as duas. Escolha qual vale para baixa, para caixa e para relatório; o artigo sobre [datas e cortes de período](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/) ajuda nessa escolha.
- **Duplicidade.** O mesmo retorno importado duas vezes não pode baixar duas vezes; veja [o que exigir quando um evento chega repetido](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Devolução Pix.** Pelo [guia de devoluções do BCB](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Guia_MED.pdf), o recebedor pode devolver um Pix total ou parcialmente, em várias devoluções; o Mecanismo Especial de Devolução cobre fraude e falha operacional, e em suspeita de fraude a instituição do recebedor (PSP) pode bloquear o valor por até 72 horas. Nas devoluções, o [Manual de Fluxos do Pix](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/III_ManualdeFluxosdoProcessodeEfetivacaodoPix.pdf) usa o EndToEndId para localizar a transação original. Peça que o sistema guarde esse identificador e ligue a devolução ao pedido.

## Fila de exceções e quem decide

O que não casou com segurança vai para uma fila, não para um ajuste silencioso, com motivo, sugestões de par e diferença de valor ou data. Defina quem pode aceitar uma sugestão, quem pode baixar com diferença e até quanto, e o que exige segunda aprovação. Cada decisão fica na [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/) com pessoa, data e justificativa.

Arquivo inválido é outra bandeja. O guia CNAB 240 de pagamentos do [Sicoob](https://www.sicoob.com.br/documents/20128/1635942/Guia+de+importacao+de+arquivos+CNAB+240+Piloto.pdf) (v4.0, julho de 2026) faz uma distinção que vale copiar: erro de estrutura, como header ou trailer, rejeita o arquivo inteiro; erro de campo, como valor fora do domínio, rejeita só o registro. Decida o mesmo para a importação do sistema, com recibo de erros, como na [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).

![Mesa de triagem com três bandejas fictícias. Conciliado: Pedido P-0042 com Pix de R$ 1.250,00; título NN-0007 pago R$ 1.000,00, tarifa R$ 21,50, crédito R$ 978,50. Exceção para decisão humana: crédito de R$ 215,90 sem identificação; P-0051 sugerido por valor e data; devolução Pix de R$ 100,00 do P-0042. Rejeitado: arquivo com trailer que não confere, recusado inteiro; registro 14 com data inválida, recusado sozinho.](./torno-conciliacao-bandejas.svg)

*Exemplo fictício: itens e arquivos não vêm de banco ou sistema real. A decisão sobre cada exceção é da empresa. Ilustração original Torno Studio, 2026.*

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Em homologação, prepare extrato e retorno de teste com os lançamentos das figuras:

1. O Pix de R$ 1.250,00 com txid T-0042 casa sozinho com o Pedido P-0042 do Cliente C-01 (identificadores encurtados para leitura; no teste, use o formato exigido pelo banco).
2. O título NN-0007 do Cliente C-02 é baixado por R$ 1.000,00, com R$ 21,50 de tarifa e R$ 978,50 de crédito líquido, cada valor no seu campo.
3. O Pix de R$ 430,00 sem txid aparece como sugestão para o Pedido P-0051 do Cliente C-03 e só baixa após confirmação de um perfil autorizado.
4. O crédito de R$ 215,90 sem identificação fica na fila, com motivo.
5. Um pagamento parcial deixa o título aberto pelo saldo combinado.
6. A devolução Pix de R$ 100,00 é ligada ao P-0042 pelo identificador da transação original, o pedido mostra o novo saldo e a devolução fica na fila para a decisão sobre o pedido.
7. Importar o mesmo retorno duas vezes não gera segunda baixa.
8. O arquivo com trailer inconsistente é recusado inteiro; em outro arquivo, com estrutura válida, o registro 14 com data inválida é recusado sozinho, e os demais entram.
9. Relatório e baixa usam a data definida (ocorrência ou crédito) num lançamento que cruza o fim do mês.
10. Toda baixa manual registra pessoa, data, regra e justificativa.

*Fim do exemplo fictício. Clientes, valores e critérios são um modelo editorial, não um teste executado em sistema real.*

## Sistema novo ou sistema em uso

**Num sistema novo**, gere a chave (txid por pedido, nosso número por título) desde o primeiro dia. Sem chave, conciliar depois custa e erra mais.

**Num sistema em uso**, rode a conciliação em paralelo à conferência manual por um período, compare e só então deixe a regra baixar sozinha.

## Perguntas frequentes

### Conciliação bancária automática dispensa conferência humana?

Não. Ela resolve o que casa por chave forte; o resto vai para uma fila com motivo, e alguém autorizado decide.

### Dá para conciliar Pix sem txid?

Dá para sugerir por valor, data e pagador, mas com risco de par errado. Para baixar sozinho, prefira cobranças com txid gerado pelo sistema.

### Todo banco oferece o mesmo arquivo de retorno CNAB?

Não. O padrão FEBRABAN é a base, mas cada banco publica o próprio layout. Teste com arquivos do banco contratado.

Para transformar a sua conciliação em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) um extrato e um retorno de exemplo, sem dados reais de clientes, e a lista do que hoje é conferido à mão.

*Fontes consultadas em 7 de novembro de 2026. Este artigo não é parecer contábil nem fiscal; clientes, valores, bandejas e ilustrações são modelos editoriais fictícios.*
