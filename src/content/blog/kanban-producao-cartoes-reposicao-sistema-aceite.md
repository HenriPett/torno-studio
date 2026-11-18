---
content_id: torno-artigo-pt-20261118-kanban-producao
intent_id: buyer-kanban-pull-replenishment-cards-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Kanban de produção no sistema (e-kanban): o que definir e testar antes de automatizar a reposição'
h1: 'Kanban de produção no sistema (e-kanban): o que definir e testar antes de automatizar a reposição'
seo_title: 'Kanban de produção e e-kanban: cartões, cálculo e aceite | Torno'
seo_description: 'Circuito de cartões, kanban de produção e de retirada, cálculo do número de cartões, sinal, cartão perdido, redimensionamento e MRP: o que testar.'
summary: 'Roteiro para a indústria que vai tirar o kanban de produção do quadro de cartões e da planilha e levá-lo para um sistema (e-kanban): o circuito de cartões por item e por ponto de consumo; kanban de produção, de retirada e de fornecedor; o cálculo do número de cartões e do tamanho do contêiner como regra escrita da empresa, com a fórmula descrita na literatura e em documentação de fornecedores; o sinal que dispara a reposição e o que ele cria; cartão perdido, lido em dobro ou cancelado; o redimensionamento quando a demanda muda; a convivência com o MRP e com a programação da produção; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema o kanban de produção e a reposição puxada, para que o número de cartões, o sinal de reposição, o tratamento de cartões perdidos ou duplicados e o redimensionamento quando a demanda muda sejam confiáveis e convivam com o MRP e a programação?
proposed_path: /blog/kanban-producao-cartoes-reposicao-sistema-aceite/
canonical_url: https://tornostudio.com/blog/kanban-producao-cartoes-reposicao-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes e analistas de PCP, supervisores de produção, logística interna e almoxarifado, e TI de indústrias pequenas e médias que vão contratar, especificar, ajustar ou aceitar um sistema (módulo de ERP, sistema de manufatura ou sistema sob medida) para controlar o kanban de produção e a reposição puxada, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar o quadro de cartões físicos e a planilha de dimensionamento por cartões eletrônicos, leitura de código e sinal de reposição gerado pelo sistema.
scope: Kanban como sinal de autorização de produção ou de retirada num sistema puxado (Lean Enterprise Institute, Toyota); kanban de produção, de retirada (interno e de fornecedor) e de sinal; circuito de cartões por item, origem e ponto de consumo, com número fixo de cartões; fórmula do número de cartões como descrita na literatura acadêmica (fórmula da Toyota em Akturk e Erhun, 1999; Co e Moosa, 1997) e em documentação de fornecedores (Oracle, SAP), sem prescrever fator de segurança nem tamanho de contêiner; fonte da demanda e do tempo de reposição; arredondamento e mínimo de cartões; sinal de disparo e estados do cartão; cartão perdido, leitura repetida, cartão cancelado e reimpresso; auditoria do circuito; redimensionamento quando a demanda muda, inclusão e retirada de cartões; convivência com MRP, estrutura de produto e programação; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Prescrição de fator de segurança, tamanho de contêiner, lote, tempo de reposição ou número de cartões; dimensionamento estatístico de estoque de segurança, DDMRP, CONWIP e modelos de otimização; kanban de gestão de tarefas e de desenvolvimento de software (método Kanban em times); heijunka e nivelamento da produção em detalhe; cálculo do MRP, programação fina de capacidade e sequenciamento, inventário, lote e validade, OEE (cobertos em outros artigos); contratos de fornecimento e logística externa; recomendação ou comparação de ERP, sistema de manufatura ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-18T21:12:00Z'
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
  - path: https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/
    reason: Trata o cálculo de necessidade de materiais (planejamento empurrado pelo plano); aqui o item que sai do MRP para ser reposto por cartão e a demanda que o MRP continua explodindo para os componentes.
  - path: https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
    reason: Trata a sequência e a capacidade finita dos recursos; aqui a fila de cartões que chega ao recurso e como ela entra na programação.
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura de produto; aqui o consumo do componente reposto por kanban, que vem da estrutura do produto montado.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata contagem e ajuste de saldo; aqui a auditoria do circuito, que conta cartões e contêineres, não só peças.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade e quarentena no estoque; aqui o supermercado que pode precisar respeitar lote e ordem de consumo.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Trata a leitura de códigos no sistema; aqui a leitura do cartão que gera o sinal de reposição.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento recebido em dobro e o efeito único; aqui o cartão lido duas vezes.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o indicador de eficiência do equipamento; aqui fica fora, mas o tempo de reposição medido depende das paradas do recurso.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode cancelar, reimprimir, incluir ou retirar cartões.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que cada leitura, cancelamento e redimensionamento precisam registrar.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a aprovação do novo número de cartões.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas e o tratamento de linhas com erro; aqui a carga dos circuitos da planilha de dimensionamento.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com itens, circuitos e cartões fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de dimensionamento de cartões.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar o quadro de kanban e a planilha de dimensionamento em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'O glossário do Lean Enterprise Institute define kanban como um dispositivo de sinalização que dá autorização e instruções para a produção ou a retirada (transporte) de itens num sistema puxado; diz que o kanban de produção informa a um processo anterior o tipo e a quantidade a produzir para o processo seguinte, que o kanban de sinal, uma forma usada em produção em lotes, dispara a produção quando se atinge uma quantidade mínima de contêineres, e que o kanban de retirada autoriza o transporte de peças para o processo seguinte, com duas formas: interno (entre processos) e de fornecedor.'
    reference: https://www.lean.org/lexicon-terms/kanban/
    entity: 'Lean Enterprise Institute, Lean Lexicon, verbete "Kanban"'
    source_date: '2022-05-16'
    checked_at: '2026-11-18T20:58:00Z'
    limit: 'Data é a de última modificação indicada nos metadados da página. As "seis regras do kanban" aparecem só em imagem e não foram lidas nem usadas. Tradução livre da Torno.'
  - classification: FATO
    claim: 'A página da Toyota sobre o Sistema Toyota de Produção descreve o just-in-time como fazer só o que o cliente precisa, quando precisa e na quantidade necessária, com o processo anterior mantendo um estoque de onde o processo seguinte retira o que precisa, e repondo imediatamente o que foi retirado.'
    reference: https://global.toyota/en/company/vision-and-philosophy/production-system/
    entity: 'Toyota Motor Corporation, página "Toyota Production System"'
    source_date: null
    checked_at: '2026-11-18T21:03:00Z'
    limit: 'Página sem data visível e sem a palavra kanban; usada só para o princípio de retirada e reposição. Tradução livre da Torno.'
  - classification: FATO
    claim: 'Akturk e Erhun (International Journal of Production Research, v. 37, n. 17, 1999) descrevem o kanban de produção como o que define a quantidade da peça a produzir e o kanban de transporte (também chamado de retirada) como o que define a quantidade que o estágio seguinte retira do anterior, o sistema de dois cartões, e usam a "fórmula da Toyota" para o estoque máximo, n·a = D·L·(1+s), em que n é o número de kanbans, a o tamanho do kanban, D a demanda média, L o lead time esperado e s o fator de segurança; citam Monden (1984), segundo quem o sistema kanban deve se adaptar a variações diárias de demanda de até 10% em relação ao plano mestre mensal, e Rees et al. (1987), que desenvolveram o ajuste dinâmico do número de kanbans em ambiente instável.'
    reference: https://repository.bilkent.edu.tr/bitstream/11693/25185/1/Overview%20of%20design%20and%20operational%20issues%20of%20kanban%20systems.pdf
    entity: 'M. S. Akturk e F. Erhun, "An overview of design and operational issues of kanban systems", International Journal of Production Research 37(17), 1999, pp. 3859-3881; cópia no repositório institucional da Universidade Bilkent'
    source_date: '1999'
    checked_at: '2026-11-18T20:56:00Z'
    limit: 'Artigo acadêmico de revisão; lido pela ferramenta de leitura no repositório da universidade, sem conferir se é a versão final do periódico. O valor s = 0,05 usado nos experimentos do artigo não é adotado nem recomendado aqui. A obra de Monden não foi lida; a citação é a que o artigo faz.'
  - classification: FATO
    claim: 'Co e Moosa (IIE Transactions, v. 29, n. 5, 1997) resumem que, para determinar o número de kanbans, a Toyota usa uma fórmula baseada na demanda média durante um ciclo, inflada por um fator constante de sobreplanejamento.'
    reference: https://ink.library.smu.edu.sg/lkcsb_research/892
    entity: 'H. C. Co e S. Moosa, "Overplanning factor in Toyota''s formula for computing the number of kanban", IIE Transactions 29(5), 1997, pp. 409-415; página do repositório da Singapore Management University'
    source_date: '1997-05'
    checked_at: '2026-11-18T21:01:00Z'
    limit: 'Só o resumo foi lido; o texto completo não foi aberto.'
  - classification: FATO
    claim: 'O guia do usuário do Oracle MRP (capítulo "Kanban Planning", documentação da release 12.2 pelo caminho da página) traz como fórmula padrão (C − 1) × S = D × A × (L + SSD), com C número de cartões, S tamanho do kanban, D demanda média diária, A percentual de alocação, L lead time em dias para repor um kanban e SSD dias de estoque de segurança; diz que o programa calcula o tamanho do kanban ou o número de cartões, que a fórmula pode ser personalizada, que a demanda pode vir de previsão, MDS, MPS ou produção real, que o planejamento pode ter itens kanban e itens liberados pelo planejador, que modificadores de pedido (quantidade mínima, múltiplo) se aplicam só quando se calcula o tamanho, e que o usuário escolhe, item a item, quais resultados da simulação levam ao plano de produção.'
    reference: https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm
    entity: 'Oracle, "Oracle MRP User''s Guide", capítulo "Kanban Planning" (E48795-07; Oracle E-Business Suite 12.2)'
    source_date: null
    checked_at: '2026-11-18T21:04:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a página não explica o termo (C − 1). Exemplo de modelagem, não recomendação nem norma.'
  - classification: FATO
    claim: 'A ajuda do SAP sobre o cálculo de kanban diz que o sistema calcula o número de contêineres (cartões) que circulam num circuito de controle ou a quantidade por contêiner, para o tempo de reposição, usando uma fórmula; que as necessidades vêm da rodada do MRP ou do planejamento de longo prazo; e que, como a necessidade costuma flutuar muito, é preciso conferir e ajustar esses valores.'
    reference: https://help.sap.com/saphelp_me60/helpdata/en/d2/5fbd534f22b44ce10000000a174cb4/content.htm
    entity: 'SAP, SAP Help Portal, documentação do SAP ERP (caminho saphelp_me60), "Kanban Calculation"'
    source_date: null
    checked_at: '2026-11-18T21:00:00Z'
    limit: 'Documentação de fornecedor, sem data nem versão visíveis; a fórmula do sistema padrão não aparece no texto extraído da página. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP R/3 4.6C diz que as propostas de número de kanbans ou de quantidade por kanban são calculadas a partir da rodada de planejamento ou do planejamento de longo prazo, e conferidas e aceitas numa função própria; que o fator de segurança, usado para amortecer flutuações de necessidade, multiplica o resultado da fórmula; e que o tempo de reposição pode ser informado em dias ou em horas e minutos.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8bde43b711d189410000e829fbbd/content.htm
    entity: 'SAP, SAP Help Portal, SAP R/3 4.6C, "Automatic Kanban Calculation" e "Defining the Automatic Kanban Calculation in the Control Cycle" (https://help.sap.com/saphelp_46c/helpdata/en/c4/53d0bcb7ec11d188b50000e8214d78/content.htm)'
    source_date: null
    checked_at: '2026-11-18T20:57:00Z'
    limit: 'Documentação de versão antiga do ERP, sem data visível; a lista de parâmetros da primeira página não aparece no texto extraído. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP R/3 4.6C diz que, ao passar o kanban para VAZIO, o sistema cria a reposição, e, ao passar para CHEIO, lança a entrada de mercadoria, com campo para a quantidade real quando ela é menor que a do kanban; que a leitura do código de barras do kanban muda o status; que a sequência de status é definida em configuração, com status proibidos ou obrigatórios, e, sem sequência definida, vale a padrão com os dois status obrigatórios CHEIO e VAZIO; e que o status ESPERA é usado, por exemplo, quando um kanban novo entra no circuito.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8c6543b711d189410000e829fbbd/content.htm
    entity: 'SAP, SAP Help Portal, SAP R/3 4.6C, "Triggering the Kanban Signal" e "Status Sequence" (https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8c7243b711d189410000e829fbbd/content.htm)'
    source_date: null
    checked_at: '2026-11-18T21:02:00Z'
    limit: 'Documentação de versão antiga do ERP, sem data visível; as páginas não dizem o que acontece com leitura repetida ou status pulado. Exemplo de modelagem; nomes de status traduzidos pela Torno.'
  - classification: FATO
    claim: 'Christoph Roser, no blog AllAboutLean, descreve o cálculo do número de kanbans como uma estimativa grosseira, diz que não é obrigatório arredondar para cima e que uma margem de segurança adicional em geral não é necessária.'
    reference: https://www.allaboutlean.com/kanban-formula-part2/
    entity: 'Christoph Roser, AllAboutLean.com, "How Many Kanbans? – The Kanban Formula, Part 2" (11/05/2014; modificado em 13/12/2025)'
    source_date: '2014-05-11'
    checked_at: '2026-11-18T20:59:00Z'
    limit: 'Blog de autor da área, não norma nem artigo revisado por pares; citado só para mostrar que arredondamento e margem são escolhas.'
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., o suporte estampado SE-40, a prensa PR-03, o supermercado S-02, as linhas LM-01 e LM-02, a chapa CH-20, as demandas, o tempo de reposição, o parâmetro de segurança de 10%, o contêiner de 60 peças, a regra de arredondamento para cima, o mínimo de 2 cartões por circuito, o prazo de alerta de cartão parado, os cartões, datas, horários, leituras, cancelamentos e redimensionamentos do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, circuito real, nem fator de segurança, tamanho de contêiner, tempo de reposição ou número de cartões recomendados.
---

*Leitura estimada: 18 minutos.*

**Antes de levar o kanban de produção para o sistema, escreva e aprove seis regras: quais circuitos existem (item, de onde sai, para onde vai, tipo de cartão), como se calcula o número de cartões e o tamanho do contêiner de cada circuito (com qual demanda, qual tempo de reposição, qual parâmetro de segurança e qual arredondamento), em que momento a leitura do cartão vira pedido de reposição, o que acontece com um cartão perdido, lido duas vezes ou cancelado, quando e como o número de cartões muda com a demanda, e como o item kanban convive com o MRP e com a programação.** Depois, teste com itens, cartões e leituras fictícios cujo resultado você já calculou à mão, inclusive um cartão que some e uma mudança de plano que obrigue a incluir e a retirar cartões. Sem isso, o e-kanban troca o quadro de madeira por uma tela, mas continua com cartões sumidos que ninguém percebe e com um número de cartões que foi calculado uma vez e nunca mais.

**Este artigo não prescreve fator de segurança, tamanho de contêiner, lote, tempo de reposição nem número de cartões, e não recomenda software nem fornecedor.** A fórmula aparece como a literatura e a documentação de fornecedores a descrevem, e isso está dito em cada citação. Empresa, item, demandas, cartões e números do exemplo são inventados.

## O que o quadro de cartões faz e o sistema precisa fazer igual

Em muitas fábricas o kanban começa com cartões plastificados, um quadro ao lado da máquina e uma planilha onde alguém, um dia, calculou quantos cartões cada peça teria. O operador da linha esvazia uma caixa, devolve o cartão ao quadro, o cartão vira ordem para a máquina de trás, e a caixa cheia volta com o cartão.

O quadro funciona porque é simples. O que ele não faz é **contar** e **recalcular**. Ele não sabe quantos cartões deveriam existir de cada peça, então não percebe quando um cai atrás de um palete. Ele não percebe que a demanda subiu 15% e que o número de cartões calculado em março já não cobre o tempo de reposição. E ele não conversa com o MRP, que continua sugerindo ordens de uma peça que agora é reposta por cartão, ou deixa de comprar a chapa que essa peça consome. São essas coisas que justificam levar o kanban para um sistema, o chamado e-kanban, e são elas que mais ficam fora da especificação.

### Literatura, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Literatura.** O que é um kanban, os tipos de cartão e a fórmula clássica do número de cartões vêm do Sistema Toyota de Produção e da literatura acadêmica sobre ele. Não existe norma que diga quantos cartões a sua peça deve ter.
- **Documentação de fornecedores.** Circuito de controle, status cheio e vazio, cálculo automático com fator de segurança, simulação antes de atualizar: é assim que a ajuda do SAP e o guia do Oracle MRP descrevem seus módulos de kanban, citados como exemplos. Cada fornecedor usa uma fórmula um pouco diferente. Não é regra.
- **Decisão da empresa.** Quais itens vão para kanban, qual fórmula, quais parâmetros, como se arredonda, quando se recalcula e quem aprova. É essa camada que precisa estar escrita antes de configurar ou programar.

## Kanban de produção, de retirada e de fornecedor

O glossário do Lean Enterprise Institute define o kanban como [um dispositivo de sinalização que dá autorização e instruções para a produção ou a retirada (transporte) de itens num sistema puxado](https://www.lean.org/lexicon-terms/kanban/). A página da Toyota descreve o princípio sem usar a palavra: o processo anterior mantém um estoque de onde o processo seguinte [retira o que precisa, e repõe imediatamente o que foi retirado](https://global.toyota/en/company/vision-and-philosophy/production-system/).

O mesmo glossário distingue:

- **Kanban de produção.** Diz ao processo anterior o tipo e a quantidade a produzir para o processo seguinte. É o cartão que vai da prateleira para a máquina.
- **Kanban de retirada (ou de movimentação).** Autoriza levar peças do estoque do processo anterior para o processo seguinte. Na forma **interna**, entre processos da fábrica; na forma de **fornecedor**, entre a fábrica e quem fornece a peça.
- **Kanban de sinal.** Usado onde se produz em lotes (uma prensa com troca de ferramenta demorada, por exemplo): dispara a produção quando o estoque chega a um número mínimo de contêineres, em vez de um cartão por contêiner.

Akturk e Erhun, numa revisão publicada no *International Journal of Production Research* em 1999, descrevem o [sistema de dois cartões](https://repository.bilkent.edu.tr/bitstream/11693/25185/1/Overview%20of%20design%20and%20operational%20issues%20of%20kanban%20systems.pdf): o de produção define quanto produzir; o de transporte, também chamado de retirada, define quanto o estágio seguinte retira do anterior.

Para o sistema, a pergunta é: **que tipos de cartão a empresa usa, e em quais circuitos.** Um sistema que só conhece "cartão de produção" não consegue representar o abastecedor que leva caixas do supermercado para a linha, nem o cartão que vai para o fornecedor. E o kanban de fornecedor tem uma diferença prática: o sinal sai da fábrica e precisa chegar a outra empresa, por portal, e-mail, integração ou pedido de compra, cada um com seu atraso e seus erros.

## O circuito: um item, uma origem, um destino, um número fixo de cartões

A unidade que o sistema controla não é a peça, é o **circuito** (a SAP chama de circuito de controle): um item, um ponto de onde ele sai, um ponto onde ele é consumido e um número fixo de cartões circulando entre os dois. A mesma peça consumida em duas linhas pode ter dois circuitos de retirada e um de produção.

Para cada circuito, defina e cadastre:

- **Item e tipo de cartão.** Produção, retirada interna, fornecedor ou sinal.
- **Origem e destino.** Máquina ou célula que produz, supermercado, ponto de consumo na linha, fornecedor.
- **Contêiner e quantidade por cartão.** Que caixa, quantas peças. Se a caixa mudar, a quantidade muda, e o número de cartões precisa ser recalculado.
- **Número de cartões e identificação de cada um.** Cartão 07 de 18 do circuito do suporte na prensa. Cada cartão tem um código único; dois cartões com o mesmo código impedem saber qual foi lido.
- **Parâmetros do cálculo.** Demanda usada, tempo de reposição, parâmetro de segurança, regra de arredondamento, data do cálculo e quem aprovou (mais abaixo).
- **Estados do cartão.** Por exemplo: cheio no supermercado, vazio aguardando produção, em produção, em transporte, cancelado.

A regra que dá sentido a tudo isso é uma conta: **a soma dos cartões em cada estado é sempre igual ao número de cartões do circuito.** Se o circuito tem 18 cartões e o sistema mostra 10 cheios, 5 vazios e 3 em produção, os 18 estão em algum lugar. O dia em que a contagem física achar 17, há um cartão perdido, e o sistema precisa ter como registrar isso.

## O número de cartões é uma regra da empresa

### O que a literatura e os fornecedores escrevem

A fórmula mais citada vem da Toyota. Akturk e Erhun a escrevem como [n · a = D · L · (1 + s)](https://repository.bilkent.edu.tr/bitstream/11693/25185/1/Overview%20of%20design%20and%20operational%20issues%20of%20kanban%20systems.pdf): o número de kanbans (n) vezes o tamanho do kanban (a) é o estoque máximo do circuito, igual à demanda média (D) vezes o tempo de reposição esperado (L), aumentado por um fator de segurança (s). Isolando n, fica n = D × L × (1 + s) ÷ a. Co e Moosa, num artigo de 1997 da *IIE Transactions*, resumem a mesma ideia: a Toyota usa a [demanda média durante um ciclo, inflada por um fator constante](https://ink.library.smu.edu.sg/lkcsb_research/892).

Fornecedores de ERP escrevem variações:

- O guia do Oracle MRP usa como padrão [(C − 1) × S = D × A × (L + SSD)](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm): número de cartões (C), tamanho (S), demanda média diária (D), percentual de alocação (A), tempo de reposição em dias (L) e dias de estoque de segurança (SSD). A segurança é medida em dias, não em percentual, e o termo C − 1 deixa um cartão a mais do que a cobertura calculada; o guia não explica o motivo. Ele também diz que a fórmula pode ser personalizada e que o programa calcula o tamanho do kanban ou o número de cartões.
- A ajuda do SAP diz que o sistema calcula o [número de contêineres que circulam ou a quantidade por contêiner, para o tempo de reposição, usando uma fórmula](https://help.sap.com/saphelp_me60/helpdata/en/d2/5fbd534f22b44ce10000000a174cb4/content.htm), a partir das necessidades da rodada do MRP ou do planejamento de longo prazo. Na versão antiga do ERP, o [fator de segurança multiplica o resultado da fórmula](https://help.sap.com/saphelp_46c/helpdata/en/c4/53d0bcb7ec11d188b50000e8214d78/content.htm) e existe ainda uma constante configurável.

Christoph Roser, que escreve sobre lean no blog AllAboutLean, chama o cálculo de [estimativa grosseira](https://www.allaboutlean.com/kanban-formula-part2/), diz que não é obrigatório arredondar para cima e que uma margem extra em geral não é necessária. Ou seja: até a forma de arredondar é escolha.

### O que a empresa precisa escrever

A fórmula é simples. O que não é simples é o que entra nela. Para cada circuito, ou para cada família de circuitos:

- **Qual demanda.** Média do plano de produção do mês, previsão, consumo real das últimas semanas? Em dias corridos ou úteis? O Oracle permite escolher entre [previsão, plano mestre ou produção real](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm). Se a demanda é de várias linhas, o circuito de produção usa a soma; cada circuito de retirada usa só a do seu ponto de consumo.
- **Qual tempo de reposição.** Do momento em que o cartão vira sinal até a caixa cheia voltar ao supermercado: espera na fila, troca de ferramenta, produção do contêiner, transporte. Como foi medido, quando, e por quem. O tempo de reposição depende das paradas do recurso; o artigo sobre [OEE no sistema](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/) trata de como medi-las, e não é assunto daqui.
- **Qual parâmetro de segurança e em que unidade.** Percentual (como na fórmula da Toyota), dias (como no Oracle), multiplicador (como no SAP) ou nenhum. Este artigo não diz qual valor usar.
- **Como arredondar.** Sempre para cima, para o inteiro mais próximo, ou com tolerância (só sobe se passar de 0,2 cartão, por exemplo). Com os dados do exemplo abaixo, a mesma conta dá 17 ou 18 cartões conforme a regra de arredondamento, e 19 se a fórmula tiver a forma do Oracle, com um cartão a mais.
- **Mínimo e máximo.** Um circuito com um cartão só para a linha toda vez que a caixa esvazia, até a próxima chegar. Defina se há mínimo de cartões por circuito e se há teto (por espaço no supermercado, por exemplo).
- **O que se calcula.** Número de cartões com contêiner fixo, ou tamanho do contêiner com número de cartões fixo. No Oracle, [quantidade mínima e múltiplo só se aplicam quando se calcula o tamanho](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm). Na prática, a caixa costuma ser fixa e o número de cartões é que muda.

**Recomendação da Torno.** Cadastre a fórmula como regra explícita, com a versão e a data em que foi aprovada, e faça o sistema mostrar a conta inteira ao lado do resultado: demanda, tempo, parâmetro, divisão, valor antes do arredondamento e regra de arredondamento. Um número de cartões sem a conta não pode ser conferido, e a próxima pessoa vai recalcular na planilha.

## O sinal de disparo: quando o cartão vira pedido

O sinal é o momento em que o sistema passa a considerar que aquele cartão autoriza produzir ou repor. Na ajuda do SAP, passar o kanban para vazio [cria a reposição, e passar para cheio lança a entrada de mercadoria](https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8c6543b711d189410000e829fbbd/content.htm), com a quantidade real se ela for menor que a do cartão; a leitura do código de barras do cartão muda o status. Esse é um modelo. Defina o seu:

- **Quando o cartão é lido.** Quando a primeira peça da caixa é retirada, quando a caixa fica vazia ou quando o abastecedor recolhe os cartões na rota? Cada escolha muda o tempo de reposição usado no cálculo.
- **Onde e como.** Leitor no posto de cartões, coletor do abastecedor, botão na tela da linha, sensor de prateleira. A leitura segue os cuidados de [leitor de código de barras no sistema](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/): código ilegível, cartão de outro circuito, leitor sem rede.
- **O que o sinal cria.** Uma ordem de produção por cartão, uma linha numa fila de cartões do recurso, uma ordem por lote de cartões (no kanban de sinal), um pedido de compra ou uma mensagem ao fornecedor? Para o kanban de fornecedor, decida também como o fornecedor confirma.
- **Sequência de estados.** A SAP permite configurar [quais status são obrigatórios ou proibidos, e, sem configuração, usa os dois status obrigatórios cheio e vazio](https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8c7243b711d189410000e829fbbd/content.htm). Escreva a sua sequência e o que o sistema faz com um salto (cartão cheio lido como "produzido" sem ter sido vazio).
- **Quantidade parcial.** Se a máquina entrega 55 peças num cartão de 60, o cartão volta como cheio com 55? Fica aberto? Gera outro sinal?

## Cartão perdido, lido duas vezes ou cancelado

É aqui que o e-kanban ganha ou perde a confiança do chão de fábrica.

- **Cartão parado.** Defina quanto tempo cada estado pode durar antes de alerta. Um cartão cheio no supermercado pode ficar dias parado se a demanda caiu; um cartão vazio ou em produção parado por muito mais que o tempo de reposição é sinal de cartão perdido, de máquina parada ou de fila esquecida. O alerta vai para quem?
- **Auditoria do circuito.** Periodicamente, alguém conta cartões e contêineres no quadro, na máquina e no supermercado, e compara com os estados do sistema. Não é o mesmo que o [inventário de estoque](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/), que conta peças; aqui se contam cartões. A diferença precisa virar registro, não ajuste silencioso.
- **Cartão perdido.** O sistema cancela o cartão perdido e emite um substituto com outro código (ou outra versão do mesmo código), sem mudar o total do circuito. O cartão cancelado, se aparecer depois e for lido, é recusado, com alerta, e não gera reposição nem entrada.
- **Leitura repetida.** O operador lê o cartão, o leitor não apita, ele lê de novo. Um cartão que já está vazio não pode ficar "mais vazio": a segunda leitura é registrada como repetida e não gera segunda reposição. É o mesmo problema do [evento recebido em dobro numa integração](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/), com a mesma resposta: efeito único.
- **Cartão a mais.** Alguém imprime um cartão "para garantir". Num quadro físico isso passa despercebido; no sistema, só quem tem permissão emite cartão, e o total do circuito só muda por redimensionamento aprovado, com os cuidados de [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

Cada leitura, cancelamento, reimpressão e alerta vai para a [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), com quem, quando e de onde.

## Quando a demanda muda: redimensionar sem bagunçar o circuito

O número de cartões calculado vale para a demanda que entrou na conta. A ajuda do SAP diz que, como a necessidade costuma flutuar muito, [é preciso conferir e ajustar esses valores](https://help.sap.com/saphelp_me60/helpdata/en/d2/5fbd534f22b44ce10000000a174cb4/content.htm), e que as propostas de cálculo [são conferidas e aceitas](https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8bde43b711d189410000e829fbbd/content.htm) antes de valer. O Oracle gera um plano de simulação e o usuário [escolhe, item a item, o que leva ao plano de produção](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm). [Akturk e Erhun citam Monden](https://repository.bilkent.edu.tr/bitstream/11693/25185/1/Overview%20of%20design%20and%20operational%20issues%20of%20kanban%20systems.pdf), segundo quem o sistema kanban deve se adaptar a variações diárias de demanda de até 10% em relação ao plano mestre mensal, e registram trabalhos que ajustam dinamicamente o número de kanbans em ambiente instável. Onde fica o limite entre absorver a variação com os mesmos cartões e mudar o número deles é decisão da empresa.

Para o sistema:

- **Quando recalcular.** A cada novo plano mensal, quando a média real se afasta do plano por mais que um limite, quando muda o contêiner ou o tempo de reposição. Escreva qual gatilho vale.
- **Proposta ou automático.** Recomendação da Torno: o sistema calcula e propõe; o PCP aprova a mudança do número de cartões, com o [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) da empresa. Mudar cartões mexe em estoque, espaço e capacidade.
- **Como incluir cartões.** Defina em que estado o cartão novo nasce. A SAP, por exemplo, [põe em espera o kanban novo que entra no circuito](https://help.sap.com/saphelp_46c/helpdata/en/cb/7f8c7243b711d189410000e829fbbd/content.htm). Se nascer vazio, vira sinal de produção na hora. Decida também se entram todos de uma vez ou aos poucos, porque três cartões novos de uma vez são três contêineres a mais na fila da máquina.
- **Como retirar cartões.** Não se arranca cartão do quadro. O cartão marcado "a retirar" sai do circuito quando volta vazio ao posto, sem gerar reposição. Até lá, o total do circuito mostra os dois números: atual e meta.
- **Mínimo de cartões.** Se o cálculo der um cartão e a regra da empresa exigir dois, o sistema aplica a regra e registra por quê.

## Kanban, MRP e programação: quem manda em quê

Um item reposto por kanban não deixa de existir para o planejamento. O guia do Oracle diz que, em vez de esperar o MRP liberar o material, [cada operação puxa o que precisa da sua fonte](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T479304.htm), e que o planejamento pode ter itens kanban e itens liberados pelo planejador ao mesmo tempo. O que precisa ficar escrito:

- **O MRP não sugere ordens do item kanban.** Se o suporte é reposto por cartão, o MRP não pode também criar ordens planejadas dele, ou a máquina recebe dois pedidos pela mesma peça. O artigo sobre [MRP no sistema](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/) trata do cálculo; aqui se define que esse item sai do cálculo de ordens.
- **O MRP continua explodindo os componentes.** O suporte consome chapa. A chapa é comprada pelo MRP a partir do plano de produção dos produtos montados, passando pela [estrutura de produto](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/) e pelo suporte. O cartão do suporte não compra chapa; quem compra é o plano.
- **A demanda do cálculo vem do plano.** A SAP calcula o número de cartões a partir da rodada do MRP ou do planejamento de longo prazo; o Oracle, a partir de previsão, plano mestre ou produção real. Defina de qual fonte, de qual plano e de qual versão.
- **A fila de cartões entra na programação.** A prensa que produz o suporte também produz peças sob ordem. Os cartões vazios formam uma fila no recurso, e a [programação da produção](https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/) precisa saber se essa fila tem prioridade, se agrupa cartões do mesmo item para economizar troca de ferramenta, e quanto da capacidade fica reservada para ela. Isso é decisão do PCP, não do sistema.
- **O supermercado é estoque.** O saldo do supermercado aparece no estoque do sistema. Se a peça tiver lote ou validade, o supermercado segue as regras de [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/), e a caixa mais antiga sai primeiro.

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Quais itens vão para kanban e quais circuitos existem | PCP, com produção e logística interna |
| Tipo de cartão de cada circuito (produção, retirada, fornecedor, sinal) | PCP |
| Contêiner e quantidade por cartão | Logística interna e engenharia de processo |
| Fórmula, fonte da demanda, tempo de reposição e parâmetro de segurança | PCP, com a direção industrial |
| Regra de arredondamento, mínimo e máximo de cartões | PCP |
| Momento da leitura e o que o sinal cria | PCP e produção, com TI |
| Prazo de alerta de cartão parado e quem recebe | PCP |
| Frequência e responsável pela auditoria do circuito | PCP e logística interna |
| Cancelamento e reimpressão de cartão | Supervisão de PCP |
| Gatilho de recálculo e aprovação do novo número de cartões | PCP, com aprovação da gerência industrial |
| Prioridade da fila de cartões na programação | PCP |
| Sinal ao fornecedor e confirmação (kanban de fornecedor) | Compras, com o fornecedor |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. estampa o suporte SE-40 na prensa PR-03. O suporte fica num supermercado, o S-02, ao lado da prensa, e é consumido por duas linhas de montagem: a LM-01, que usa 480 suportes por dia útil, e a LM-02, que usa 240. A fábrica trabalha 16 horas por dia útil. O contêiner é uma caixa de 60 suportes.

Regras da empresa (escolhas do exemplo, não recomendação):

- **Circuitos.** Um circuito de produção (PR-03 ↔ S-02), com a demanda das duas linhas somada; e um circuito de retirada por linha (S-02 ↔ LM-01 e S-02 ↔ LM-02), percorrido pelo abastecedor.
- **Fórmula.** Número de cartões = demanda média diária do plano do mês × tempo de reposição em dias úteis × (1 + 10%) ÷ 60, arredondado sempre para cima, com mínimo de 2 cartões por circuito. Os 10% são o parâmetro escolhido pela empresa do exemplo.
- **Tempos de reposição.** 1,3 dia útil no circuito de produção (fila, troca de ferramenta, estampagem e transporte, medidos pelo PCP em outubro); 0,25 dia útil (4 horas) nos circuitos de retirada.
- **Sinal.** O cartão é lido no posto de cartões quando a caixa fica vazia. A leitura cria uma linha na fila de cartões da PR-03; não cria ordem de produção individual.
- **Alerta.** Cartão de produção que completa 2 dias úteis vazio ou em produção gera alerta para a supervisão de PCP.
- **Redimensionamento.** Recalculado a cada plano mensal aprovado; o PCP aprova; cartões novos entram como vazios; cartões a retirar saem quando voltam vazios.
- **MRP.** O SE-40 é item kanban: o MRP não gera ordens dele, mas explode o consumo de chapa CH-20 a partir do plano dos produtos montados.

**As contas de novembro.** Circuito de produção: 720 × 1,3 × 1,10 ÷ 60 = 17,16, arredondado para cima: **18 cartões**, com estoque máximo de 18 × 60 = 1.080 suportes, 1,5 dia de demanda. Circuito de retirada da LM-01: 480 × 0,25 × 1,10 ÷ 60 = 2,2, ou seja, **3 cartões**. Da LM-02: 240 × 0,25 × 1,10 ÷ 60 = 1,1, ou seja, **2 cartões**. Com os mesmos dados, arredondar para o inteiro mais próximo daria 17 cartões de produção; somar um cartão à cobertura, como no formato (C − 1) da fórmula da Oracle, daria 18,16 e, arredondado para cima, 19. É por isso que a fórmula e a regra de arredondamento precisam estar escritas.

![Ilustração de uma planta baixa vista de cima, sem escala, da empresa fictícia Metalúrgica Exemplo Ltda., com o plano de novembro do suporte SE-40: a prensa PR-03 à esquerda, com o posto de cartões abaixo dela, o supermercado S-02 no centro e as linhas de montagem LM-01 e LM-02 à direita. Setas com linha contínua mostram a caixa cheia e setas tracejadas mostram o cartão vazio, que é o sinal. Entre a prensa e o supermercado, o circuito de produção, em azul, com 18 cartões; do supermercado para a LM-01, um circuito de retirada, em verde, com 3 cartões; para a LM-02, outro, com 2. Abaixo, as contas: produção, 720 por dia vezes 1,3 dia vezes 1,10 dividido por 60 igual a 17,16, arredondado para 18 cartões; retirada da LM-01, 480 por dia vezes 0,25 dia vezes 1,10 dividido por 60 igual a 2,2, arredondado para 3; retirada da LM-02, 240 por dia vezes 0,25 dia vezes 1,10 dividido por 60 igual a 1,1, arredondado para 2. No rodapé, a regra da empresa, sempre para cima e mínimo de 2, e o estoque máximo do circuito de produção, 18 vezes 60 igual a 1.080 suportes, 1,5 dia. Exemplo fictício.](./torno-kanban-planta-circuitos.svg)

*Exemplo fictício: fábrica, item, demandas, tempos e parâmetro de segurança inventados; cada laço é um circuito com número fixo de cartões, calculado pela regra que a empresa escreveu. Ilustração original Torno, 2026.*

**O cartão perdido.** Na sexta-feira, 06/11/2026, às 8h12, o cartão SE40-P-07 é lido como vazio no posto. Na terça, 10/11, às 8h12, completa 2 dias úteis sem sair desse estado e o sistema alerta a supervisão de PCP. Na auditoria das 10h, o sistema mostra os 18 cartões do circuito assim: 10 cheios no supermercado, 5 vazios na fila e 3 em produção. No chão, há 10 caixas cheias no S-02, 3 caixas na prensa e 4 cartões no quadro: o P-07 não está lá. Às 10h40, a supervisora cancela o P-07, versão 1, e emite o P-07, versão 2, que entra direto na fila como vazio; o circuito continua com 18. Na sexta, 13/11, às 14h05, o cartão antigo aparece embaixo de um palete e alguém o lê no supermercado: o sistema recusa, alerta o PCP e não lança entrada.

**A leitura repetida.** Na quinta, 12/11, o cartão P-03 é lido como vazio às 9h14min05s e de novo às 9h14min09s. A segunda leitura fica registrada como repetida; a fila da PR-03 recebe um cartão, não dois.

![Ilustração de dois cartões kanban lado a lado do circuito de produção do suporte fictício SE-40, com os campos: item, descrição suporte estampado, origem prensa PR-03, destino supermercado S-02, quantidade por caixa 60, tipo produção, número do cartão 07 de 18 e um código do cartão desenhado como grade de quadrados, sem ser um código válido. O cartão da esquerda, versão 1, está atravessado por um carimbo vermelho: cancelado em 10/11/2026 às 10h40, cartão perdido. Embaixo dele, a leitura de 13/11 às 14h05 no supermercado: recusada, cartão cancelado, alerta ao PCP, sem entrada. O cartão da direita, versão 2, emitido em 10/11 às 10h40, entra na fila como vazio. Abaixo, o histórico do cartão: lido vazio em 06/11 às 8h12, alerta em 10/11 às 8h12 depois de 2 dias úteis, auditoria às 10h00 com 17 cartões encontrados de 18, cancelamento e emissão às 10h40. No rodapé, a conta da auditoria: sistema com 10 cheios, 5 vazios e 3 em produção, total 18; chão com 10 caixas cheias, 4 cartões no quadro e 3 caixas na prensa, total 17. Exemplo fictício.](./torno-kanban-cartao-substituido.svg)

*Exemplo fictício: cartões, datas, horários e contagens inventados; o cartão perdido é substituído sem mudar o total do circuito, e o antigo deixa de valer. Ilustração original Torno, 2026.*

**O redimensionamento.** Em 30/11, o plano de dezembro é aprovado com a LM-01 subindo para 600 suportes por dia: o circuito de produção passa a 840 × 1,3 × 1,10 ÷ 60 = 20,02, arredondado para cima, **21 cartões**. Pela regra da empresa, os 0,02 bastam para subir; uma regra com tolerância teria mantido 20. O PCP aprova, e os cartões P-19, P-20 e P-21 entram como vazios no mesmo dia. O circuito de retirada da LM-01 dá 600 × 0,25 × 1,10 ÷ 60 = 2,75: continua com 3. Em janeiro, o plano cai para 360 na LM-01 e 180 na LM-02: produção 540 × 1,3 × 1,10 ÷ 60 = 12,87, ou seja, **13 cartões**; os cartões P-14 a P-21, 8 no total, são marcados "a retirar" e saem quando voltam vazios ao posto. A LM-01 fica com 360 × 0,25 × 1,10 ÷ 60 = 1,65, ou seja, 2 cartões; a LM-02 dá 0,825, que arredondaria para 1, mas o mínimo da empresa mantém 2.

![Ilustração de um quadro de cartões em grade, como um quadro de parede com casas de madeira, do circuito de produção do suporte fictício SE-40 em três momentos. Em cima, 10/11/2026, às 10h: 18 casas numeradas de P-01 a P-18, em três colunas de estado: 10 cheios no supermercado, 5 vazios na fila da prensa, com a casa do P-07 vazia e marcada como não encontrada, e 3 em produção. No meio, dezembro: 21 casas, com P-19, P-20 e P-21 destacadas como novas, entrando como vazias, pela conta 840 vezes 1,3 vezes 1,10 dividido por 60 igual a 20,02, arredondado para 21. Embaixo, janeiro: 13 casas ativas e 8 casas, de P-14 a P-21, marcadas como a retirar quando voltarem vazias, pela conta 540 vezes 1,3 vezes 1,10 dividido por 60 igual a 12,87, arredondado para 13. Abaixo, uma tabela dos circuitos de retirada em novembro, dezembro e janeiro: LM-01 com 3, 3 e 2 cartões e LM-02 com 2, 2 e 2, com a nota de que 0,825 daria 1 cartão, mas o mínimo da empresa é 2. Exemplo fictício.](./torno-kanban-quadro-redimensionamento.svg)

*Exemplo fictício: planos, demandas e cartões inventados; o número de cartões muda com o plano aprovado, cartão novo entra vazio e cartão retirado só sai quando volta vazio. Ilustração original Torno, 2026.*

**O SE-40 no MRP.** Na rodada de novembro, o MRP não mostra ordens planejadas do SE-40. A chapa CH-20, com 0,35 kg por suporte no exemplo, aparece com necessidade de 252 kg por dia útil em novembro (720 × 0,35) e 294 kg em dezembro (840 × 0,35), vinda do plano dos produtos montados.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com itens, circuitos e cartões fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cálculo do circuito de produção com o plano de novembro (720 por dia, 1,3 dia, 10%, caixa de 60) | Mostra 17,16 antes do arredondamento e propõe 18 cartões | Tela do cálculo com a conta inteira |
| Cálculo do circuito de retirada da LM-02 com o plano de novembro | 1,1, arredondado para 2 | Tela do cálculo |
| Cálculo da LM-02 com o plano de janeiro (180 por dia) | 0,825 daria 1; o mínimo da empresa aplica 2 e registra o motivo | Tela do cálculo |
| Cadastro de circuito sem tempo de reposição ou sem regra de arredondamento | Recusado | Tentativa recusada com o motivo |
| Leitura do P-05 vazio no posto | P-05 passa a vazio; a fila da PR-03 ganha um cartão; nenhuma ordem planejada do SE-40 no MRP | Histórico do cartão e fila do recurso |
| Leitura do P-03 duas vezes em 4 segundos | Uma entrada na fila; segunda leitura registrada como repetida | Fila e histórico de leituras |
| Cartão cheio lido como produzido sem ter passado por vazio | Recusado: sequência de estados inválida | Tentativa recusada |
| Entrega de 55 suportes num cartão de 60 | Comportamento da regra escrita da empresa (por exemplo, cartão cheio com 55 e diferença registrada) | Histórico do cartão e estoque |
| P-07 vazio desde 06/11 às 8h12 | Alerta para a supervisão de PCP em 10/11 às 8h12, não antes | Registro do alerta |
| Auditoria de 10/11: 17 cartões encontrados de 18 | Diferença registrada com o cartão faltante identificado; nenhum ajuste silencioso | Registro da auditoria |
| Cancelamento do P-07 v1 e emissão do v2 pela supervisão | Total do circuito continua 18; v2 entra como vazio | Histórico do circuito |
| Operador tenta emitir um cartão extra do SE-40 | Negado: só a supervisão emite, e só por substituição ou redimensionamento aprovado | Tentativa negada |
| Leitura do P-07 v1 em 13/11 | Recusada; alerta ao PCP; sem entrada no estoque | Tentativa recusada e alerta |
| Plano de dezembro aprovado em 30/11 | Proposta de 21 cartões (20,02 arredondado para cima) aguardando aprovação do PCP | Proposta com a conta |
| Aprovação da proposta de dezembro | P-19 a P-21 criados como vazios; circuito com 21 | Histórico do circuito |
| Plano de janeiro com 13 cartões | P-14 a P-21 marcados "a retirar"; circuito mostra 21 atuais e meta 13 | Tela do circuito |
| P-16 "a retirar" volta vazio ao posto | Sai do circuito sem gerar reposição; atual passa a 20 | Histórico do cartão e fila |
| Rodada do MRP de novembro | Nenhuma ordem planejada do SE-40; chapa CH-20 com 252 kg por dia útil | Relatório do MRP |
| Usuário sem permissão tenta mudar o parâmetro de segurança de 10% | Negado; só o PCP altera, com motivo, e a mudança gera nova proposta de cartões | Tentativa negada |

*Fim do exemplo fictício. Empresa, item, recursos, linhas, demandas, tempos, parâmetro de segurança, contêiner, cartões, datas, leituras e decisões são modelo editorial, sem circuito real, cliente ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não fator de segurança, contêiner ou número de cartões recomendados, nem comportamento padrão de ferramenta.*

Antes do go-live, importe a planilha de dimensionamento num ambiente de teste e confira circuito por circuito: quantos não têm tempo de reposição medido, quantos têm número de cartões diferente do que a fórmula daria, quantos cartões físicos existem de fato. A importação segue os cuidados de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/). Se a dúvida ainda é se vale sair do quadro e da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Qual fator de segurança devo usar no cálculo dos cartões?

Este artigo não responde. A literatura usa um percentual, o Oracle usa dias, a SAP usa um multiplicador, e um autor da área diz que muitas vezes nenhuma margem extra é necessária. O valor depende da variação da demanda, da confiabilidade do recurso e do custo de parar a linha. O que o sistema precisa é guardar o parâmetro escolhido, em que unidade, por quem e quando, e mostrar a conta.

### Se uso kanban, ainda preciso de MRP?

Em geral, sim, para o que não é reposto por cartão: componentes comprados pelo plano, itens de baixo giro, produtos sob encomenda. E é do plano que sai a demanda usada para calcular os cartões. O que não pode acontecer é o mesmo item ser reposto por cartão e por ordem do MRP ao mesmo tempo.

### Com e-kanban ainda preciso de cartão físico?

Depende de como o sinal é dado. Muitas fábricas mantêm o cartão físico com código, porque ele fica junto da caixa e qualquer um entende; o sistema conta e registra. Outras usam botão na tela ou sensor. Em qualquer caso, cada sinal precisa estar ligado a um cartão (ou contêiner) único do circuito, senão o sistema não sabe quantos existem.

Para transformar o quadro de kanban e a planilha de dimensionamento em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a lista de itens em kanban, a planilha de cálculo dos cartões e o caso mais recente de cartão perdido ou de falta na linha, sem dados confidenciais de clientes.

*Fontes consultadas em 18 de novembro de 2026: Lean Enterprise Institute, verbete "Kanban" do Lean Lexicon (modificado em 16/05/2022); Toyota, página "Toyota Production System"; M. S. Akturk e F. Erhun, International Journal of Production Research 37(17), 1999; H. C. Co e S. Moosa, IIE Transactions 29(5), 1997 (resumo); Oracle MRP User's Guide, capítulo "Kanban Planning" (E-Business Suite 12.2); SAP Help Portal, páginas sobre cálculo de kanban (SAP ERP) e sobre cálculo automático, sinal e sequência de status (SAP R/3 4.6C); C. Roser, AllAboutLean, "How Many Kanbans? – The Kanban Formula, Part 2" (11/05/2014). Este artigo não prescreve fator de segurança nem número de cartões e não recomenda sistema nem fornecedor; empresas, itens, números e ilustrações são fictícios.*
