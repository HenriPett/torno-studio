---
content_id: torno-artigo-pt-20261116-estrutura-produto-bom
intent_id: buyer-bill-of-materials-product-structure-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Estrutura de produto no sistema: o que definir e testar antes de automatizar a lista de materiais (BOM)'
h1: 'Estrutura de produto no sistema: o que definir e testar antes de automatizar a lista de materiais (BOM)'
seo_title: 'Estrutura de produto (BOM) no sistema: definições e aceite | Torno'
seo_description: 'Níveis, fantasmas, unidade de medida, perda, revisão e vigência, alternativos, OP, baixa e custo padrão: o que definir e testar na estrutura de produto.'
summary: 'Roteiro para a indústria que vai levar a estrutura de produto (lista de materiais, BOM, ficha técnica de produção) da planilha ou do cadastro improvisado para um sistema: níveis, semiacabados com ordem própria e conjuntos fantasma; quantidade por unidade, unidade de medida e conversão de compra; perda prevista por componente, variável e constante; revisão, vigência e mudança de engenharia (ECO/ECN) com destino do estoque antigo; alternativos e substitutos; qual revisão a ordem de produção congela e quando ela pode ser relida; baixa de consumo por apontamento ou backflush e o que acontece com o refugo; custo padrão calculado pela estrutura vigente; onde-se-usa e rastreio de mudanças; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar a estrutura de produto (lista de materiais, BOM) no sistema, para que ordens de produção, consumo e custo saiam certos?
proposed_path: /blog/estrutura-produto-bom-sistema-aceite/
canonical_url: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes de PCP, engenharia de produto e de processo, custos, suprimentos e TI de indústrias de médio e grande porte que vão contratar, especificar ou aceitar um sistema (módulo de ERP, sistema de manufatura ou sistema sob medida) para cadastrar estruturas de produto e gerar ordens de produção, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de migrar as estruturas da planilha para o sistema ou de usar a estrutura para gerar ordens, baixar estoque e calcular custo padrão.
scope: Níveis da estrutura, semiacabados e conjuntos fantasma; quantidade por unidade, unidade de medida e conversão para compra; perda prevista variável e constante; revisão, vigência e mudança de engenharia com destino do estoque antigo; alternativos e substitutos; data de referência e congelamento da revisão na ordem de produção, releitura; baixa de consumo por apontamento ou backflush e tratamento do refugo; custo padrão por revisão e lote de cálculo; onde-se-usa, estrutura circular e histórico de mudanças; finalidades diferentes da estrutura (engenharia e produção); quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ERP, PLM ou fornecedor (a documentação de quatro fornecedores aparece só como exemplo de modelagem); roteiro de fabricação, tempos e capacidade; cálculo de MRP e planejamento de compras; configurador de produto e estruturas variantes; formulação de processo (receitas químicas e alimentícias com potência ou rendimento de lote); custeio por absorção, rateio de custos indiretos e contabilidade de custos; interpretação da ISO 10007 ou de outras normas, cujo texto não foi lido; contagem de inventário, rastreio de lote, tratamento de não conformidade, OEE e importação de planilhas em geral (cobertos em outros artigos).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-16T15:14:00Z'
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
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata a contagem e o ajuste de estoque; aqui a baixa por estrutura errada, que só aparece como diferença no inventário.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata o lote no estoque e o rastreio para trás e para frente; aqui a estrutura diz quais componentes entram, e o lote diz quais unidades entraram.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata refugo como perda de qualidade no OEE; aqui a perda prevista na estrutura, que planeja material a mais.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata a RNC e a ação corretiva; aqui a mudança de engenharia que nasce de uma ação corretiva e muda a estrutura.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas em geral; aqui o que conferir quando as estruturas saem da planilha.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Trata a validação de dados na troca de sistema; aqui a estrutura migrada que precisa explodir igual à antiga.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a aprovação da mudança de engenharia.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria em geral; aqui o que a mudança de estrutura precisa registrar.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Detalha arredondamento de valores; aqui o custo padrão somado a partir de quantidades fracionadas.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode criar, aprovar e liberar uma revisão.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas e cortes; aqui a data de vigência e a data de referência da ordem.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com itens, estruturas e ordens fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a estrutura de produto em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A ISO 10007:2017 (Quality management — Guidelines for configuration management, 3ª edição, 2017-03) fornece orientação sobre o uso da gestão de configuração numa organização; a página da ISO diz que a norma foi revisada e confirmada em 2023 e traz a indicação de que será revisada.'
    reference: https://www.iso.org/standard/70400.html
    entity: ISO, página da ISO 10007:2017
    source_date: '2017-03'
    checked_at: '2026-11-16T15:05:00Z'
    limit: 'Texto pago não lido; nada além do resumo da página é atribuído à norma. Diretriz, não requisito certificável.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve o refugo de componente (component scrap) como porcentagem que aumenta a quantidade do componente na lista de materiais para cobrir perdas previstas; no exemplo, 1.000 peças de base com 5% de refugo exigem 1.050 peças.'
    reference: https://help.sap.com/saphelp_470/helpdata/EN/ea/e9b3424c7211d189520000e829fbbd/content.htm
    entity: 'SAP, SAP Help Portal, "Component Scrap: Example" (SAP R/3 4.70)'
    source_date: null
    checked_at: '2026-11-16T14:52:00Z'
    limit: 'Página de versão antiga do ERP, sem data visível; exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve o conjunto fantasma (phantom assembly) como agrupamento lógico de materiais, normalmente não montado em separado na produção; na explosão, as necessidades do conjunto superior passam direto para os componentes do fantasma, e o próprio fantasma não é considerado.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/f4/7d2b5f44af11d182b40000e829fbfe/content.htm
    entity: 'SAP, SAP Help Portal, "BOM Explosion with Phantom Assemblies" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T15:00:00Z'
    limit: 'Versão antiga do ERP, sem data visível; a versão 1610 da mesma página não abriu (bloqueio de robots). Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve a finalidade (BOM usage) da lista de materiais: cada área, por exemplo produção ou engenharia, mantém uma lista separada com finalidade própria.'
    reference: https://help.sap.com/saphelp_470/helpdata/EN/ea/e9b1014c7211d189520000e829fbbd/content.htm
    entity: 'SAP, SAP Help Portal, BOM usage (SAP R/3 4.70)'
    source_date: null
    checked_at: '2026-11-16T15:01:00Z'
    limit: 'Versão antiga do ERP; exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP diz que mudanças na lista de materiais podem ser feitas com ou sem histórico; com histórico, é preciso informar antes um número de modificação, e a mudança vale a partir da data definida para esse número.'
    reference: https://help.sap.com/saphelp_46C/helpdata/EN/c7/7b26d3a90d11d19db50000e8323350/content.htm
    entity: 'SAP, SAP Help Portal, "Changes to the Bill of Material" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T15:02:00Z'
    limit: 'Versão antiga do ERP; exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP diz que mudanças de lista de materiais, roteiro ou centro de trabalho feitas depois da criação da ordem de produção não são consideradas automaticamente pela ordem; os dados mestres podem ser relidos em ordens criadas ou liberadas, e a releitura de uma ordem liberada a devolve ao estado criada.'
    reference: https://help.sap.com/saphelp_46C/helpdata/EN/b1/c04204439a11d189410000e829fbbd/content.htm
    entity: 'SAP, SAP Help Portal, "Reading Master Data" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T15:01:30Z'
    limit: 'Versão antiga do ERP; exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve itens alternativos na lista de materiais, agrupados por um grupo de alternativos, com prioridade, estratégia e probabilidade de uso que o planejamento pode considerar na explosão.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/f4/7d2b9344af11d182b40000e829fbfe/content.htm
    entity: 'SAP, SAP Help Portal, "Alternative Items" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T15:06:00Z'
    limit: 'Versão antiga do ERP; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 Supply Chain Management diz que a validade de versões de lista de materiais pode ser restringida por período, quantidade, local e outros critérios; que a versão precisa ser aprovada antes do uso; que a ativação verifica conflito com outra versão ativa; e que, ao criar ordens, o planejador pode usar qualquer versão aprovada válida na data de produção solicitada.'
    reference: https://learn.microsoft.com/en-au/training/modules/create-bill-materials-dyn365-supply-chain-mgmt/2-formula-version
    entity: 'Microsoft Learn, módulo de treinamento "BOM and formula versions"'
    source_date: null
    checked_at: '2026-11-16T14:56:00Z'
    limit: 'Material de treinamento, sem data visível; exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 descreve os tipos de linha de lista de materiais item, fantasma, suprimento vinculado e fornecedor; a linha fantasma explode os itens do nível inferior, e, ao criar a ordem, os níveis representados por fantasmas são reduzidos a um só; a página recomenda evitar hierarquias profundas de fantasmas.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/bill-of-material-bom
    entity: 'Microsoft Learn, "Bills of materials and formulas"'
    source_date: '2025-07-10'
    checked_at: '2026-11-16T14:58:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 define refugo constante (quantidade fixa por execução de produção, independente da quantidade produzida) e refugo variável (porcentagem proporcional à quantidade), com a fórmula material = necessidade × (1 + refugo variável) + refugo constante; no exemplo, 100 litros com 20% e 10 litros dão 130 litros.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/scrap-calculations
    entity: 'Microsoft Learn, "Set up scrap to calculate raw material requirements"'
    source_date: '2026-05-28'
    checked_at: '2026-11-16T15:07:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 descreve os princípios de baixa de material: manual (consumo registrado em diário), início (baixa automática na partida da ordem, proporcional à quantidade iniciada), fim (baixa automática no apontamento de término, proporcional à quantidade apontada como terminada) e disponível no local (baixa ao registrar a separação para produção, só com gestão de armazém).'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/flushing-principles
    entity: 'Microsoft Learn, "Control raw material consumption by using flushing principles"'
    source_date: '2025-07-11'
    checked_at: '2026-11-16T14:55:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 diz que a troca de item da lista de materiais em ordens de produção existentes só é possível em ordens estimadas ou programadas; a linha antiga fica com quantidade zero e uma nova linha é criada com o item novo.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/react-to-last-minute-changes
    entity: 'Microsoft Learn, "React to last-minute changes"'
    source_date: null
    checked_at: '2026-11-16T14:59:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo 18 descreve a ordem de mudança de engenharia (ECO): a revisão cria uma cópia da lista de materiais com o próximo número de versão, sem afetar a lista usada na produção; a vigência pode ser imediata ou numa data; aplicar a mudança arquiva a lista original e torna a revisada a nova lista de produção.'
    reference: https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/plm/manage_changes/engineering_change_orders.html
    entity: 'Odoo, documentação "Engineering change orders" (18.0)'
    source_date: null
    checked_at: '2026-11-16T15:00:30Z'
    limit: 'A página não diz o que acontece com ordens de fabricação já existentes; exemplo de modelagem. A página "Version control" (19.0) não abriu (bloqueio de robots).'
  - classification: FATO
    claim: 'A documentação do Odoo descreve consumo flexível na lista de materiais (bloqueado, permitido ou permitido com aviso) para desvios da quantidade definida, e o Odoo 18 descreve listas multinível com semiacabados que precisam estar prontos antes do produto de nível superior, e o uso de kit quando a lista só agrupa componentes.'
    reference: https://www.odoo.com/documentation/latest/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html
    entity: 'Odoo, documentação "Bill of materials" (versão latest) e "Multilevel BoMs" (18.0, https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html)'
    source_date: null
    checked_at: '2026-11-16T14:57:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual do Senior Gestão Empresarial ERP 5.10.3 (engenharia de produto padrão) descreve o modelo com componentes, quantidades e percentual de perda por componente, datas de início e fim de uso do componente (ordem gerada depois da data final não usa o componente), versões manuais ou automáticas a cada alteração do modelo ou roteiro e opções de considerar ou não a perda na explosão.'
    reference: https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/manufatura/gestao-de-engenharia-de-produtos/engenharia-produto-padrao.htm
    entity: 'Senior Sistemas, manual de processos, "Engenharia de Produto Padrão" (5.10.3)'
    source_date: null
    checked_at: '2026-11-16T15:09:00Z'
    limit: 'O próprio manual informa a descontinuação da versão 5.10.3 em 30/09/2025 e que não recebe atualizações desde essa data; exemplo de vocabulário e modelagem em português, não recomendação.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo Ltda., o carrinho CP-300, seus componentes e códigos, as revisões B, C e D, as ECO-2026-031 e ECO-2026-036, as OPs 5098, 5118, 5119, 5120 e 5131, as quantidades, perdas, custos e datas, e as regras escolhidas no exemplo (data de referência, congelamento, baixa, alternativo sem mistura, lote de cálculo do custo) são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 13 minutos.*

**Antes de levar a estrutura de produto para o sistema, escreva e aprove sete regras: o que vira nível com ordem própria e o que é fantasma, em que unidade cada componente é consumido e comprado, quanto de perda se prevê e de que tipo, como nasce e quando vale uma nova revisão, quando um alternativo pode entrar, qual revisão a ordem de produção congela e como o consumo é baixado.** Depois, teste com um produto fictício cuja explosão e cujo custo você já sabe calcular à mão. Sem isso, o sistema gera ordens com a estrutura errada, baixa material que não foi usado (ou deixa de baixar o que foi) e calcula um custo padrão que ninguém consegue reconstruir.

**Este artigo não recomenda ERP, PLM nem fornecedor.** A documentação de quatro fornecedores aparece só para mostrar como os sistemas costumam modelar a estrutura. Empresa, produto, códigos e números do exemplo são inventados. A norma citada aparece só pelo que a página pública mostra.

## Por que a estrutura que funciona na planilha trava no sistema

Na planilha, a estrutura de produto (também chamada de lista de materiais, BOM, do inglês *bill of materials*, ou ficha técnica de produção) é uma lista que alguém lê e interpreta. O líder sabe que "a roda nova só entra depois do lote do cliente X", que o parafuso vem em caixa de 100 e que a tinta sempre sobra um pouco no começo da pintura. O sistema não interpreta: ele multiplica. Cada quantidade vira reserva, compra, baixa de estoque e custo, para cada ordem, todos os dias.

Por isso, um erro pequeno na estrutura não fica pequeno. Uma unidade de medida trocada multiplica a necessidade por seis; uma perda esquecida faz faltar material no fim da ordem; uma revisão que entra em vigor sem data deixa duas ordens iguais com componentes diferentes. E quase sempre o erro só aparece depois, como diferença no [inventário](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/) ou como custo que não fecha.

### Norma, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Norma.** Nenhuma norma consultada diz que regras a empresa deve adotar ao montar a lista de materiais no sistema; normas de troca de dados descrevem como representar a estrutura, não que decisões tomar. O tema mais próximo é a gestão de configuração: a [ISO 10007:2017](https://www.iso.org/standard/70400.html) traz diretrizes para usá-la na organização; a página da ISO diz que a norma foi confirmada em 2023 e indica que será revisada. Não lemos o texto, que é pago; nada além disso é atribuído a ela.
- **Documentação de fornecedores e convenção de mercado.** Termos como fantasma, refugo de componente, versão com vigência, ECO/ECN e backflush vêm da prática de planejamento de produção e aparecem na documentação de SAP, Microsoft Dynamics 365, Odoo e Senior, citada a seguir como exemplo de modelagem. Cada sistema implementa de um jeito; nenhum é regra.
- **Decisão da empresa.** O que é semiacabado com estoque, quanto de perda se prevê, quem aprova uma revisão, qual data a ordem usa, quando a baixa é automática. É essa camada que decide o que o sistema faz, e ela precisa estar escrita antes de alguém configurar ou programar.

## Níveis, semiacabados e fantasmas

A estrutura tem níveis: o produto final, os conjuntos que o compõem e os componentes de cada conjunto. A pergunta que o sistema precisa responder para cada conjunto é simples: **ele vira uma ordem de produção e um saldo de estoque, ou não?**

- **Semiacabado com ordem própria.** É fabricado, guardado e depois consumido, como uma plataforma soldada que espera a pintura. Tem estoque, custo e ordem. A documentação do Odoo descreve as [listas multinível](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html) dessa forma: o semiacabado precisa estar pronto antes de começar o produto de cima.
- **Fantasma.** É um conjunto que existe no desenho, mas é montado na própria linha do produto final, sem passar pelo estoque. A ajuda do SAP descreve o [conjunto fantasma](https://help.sap.com/saphelp_46c/helpdata/en/f4/7d2b5f44af11d182b40000e829fbfe/content.htm) como agrupamento lógico de materiais: na explosão, as necessidades passam direto para os componentes, e o fantasma em si não é considerado. O Dynamics 365 tem um [tipo de linha fantasma](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/bill-of-material-bom) com o mesmo efeito e recomenda evitar hierarquias profundas de fantasmas. O fantasma poupa cadastro duplicado: o mesmo conjunto entra em vários produtos sem gerar ordens que ninguém aponta.
- **Kit.** Alguns sistemas usam a palavra para uma lista que só agrupa componentes para venda ou separação; a documentação do Odoo indica [usar kit](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html) nesses casos, e não uma lista de fabricação.

Defina também: o que acontece se houver saldo de um conjunto fantasma (por exemplo, unidades que voltaram de conserto); se a estrutura de engenharia e a de produção são a mesma ou separadas (a ajuda do SAP prevê [finalidades diferentes](https://help.sap.com/saphelp_470/helpdata/EN/ea/e9b1014c7211d189520000e829fbbd/content.htm), como produção e engenharia, cada uma com sua lista); e que o sistema recuse estrutura circular, em que um item acaba sendo componente de si mesmo.

## Quantidade por unidade e unidade de medida

Cada linha da estrutura diz quanto do componente vai em **uma unidade** (ou num lote base) do item de cima. Parece óbvio, até que a planilha mistura "por peça" e "por caixa de 10".

- **Base da quantidade.** Por unidade ou por lote base (100 peças, 1.000 kg). Se houver lote base, o sistema precisa dividir antes de multiplicar, e o teste precisa conferir isso.
- **Unidade de consumo e unidade de compra.** O tubo é consumido em metros e comprado em barras de 6 m; o parafuso é consumido em unidades e comprado em caixas de 100; a tinta em quilos e baldes de 25 kg. A estrutura usa a unidade de consumo, e a conversão fica no cadastro do item, com uma única fonte. O sistema deve recusar uma linha em unidade que o item não reconhece.
- **Casas decimais.** 0,46 kg de tinta por carrinho, vezes 50, precisa dar 23 kg, não 25 kg, se o 0,46 for arredondado antes para 0,5. O cuidado com valores fracionados está em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/); para quantidades, a regra é a mesma: arredondar no fim, e só para a unidade de compra.

## Perda prevista: refugo de componente

Toda indústria perde material previsto: a ponta do tubo cortado, a tinta que fica na cabine, a chapa que vira retalho. Se a estrutura não prevê, falta material no fim da ordem; se prevê demais, sobra estoque que ninguém explica. A perda prevista na estrutura é diferente do refugo real apontado na produção, que entra como perda de qualidade no [OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/) e, quando é defeito, numa [RNC](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/).

- **Perda variável (porcentagem).** Cresce com a quantidade. A ajuda do SAP dá o exemplo de [1.000 peças com 5% de refugo de componente, que viram 1.050](https://help.sap.com/saphelp_470/helpdata/EN/ea/e9b3424c7211d189520000e829fbbd/content.htm).
- **Perda constante.** Uma quantidade fixa por ordem, como a limpeza da pistola de tinta. O Dynamics 365 trata as duas na mesma conta: [material = necessidade × (1 + perda variável) + perda constante](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/scrap-calculations); no exemplo da documentação, 100 litros com 20% e 10 litros dão 130 litros.
- **Onde fica a perda.** No componente (o tubo perde 5% no corte) ou no conjunto (5% dos carrinhos são refugados na inspeção, o que puxa todos os componentes). São regras diferentes, com efeitos diferentes; escolha e escreva.
- **Se a perda entra no planejamento e no custo.** O manual do Senior (versão 5.10.3, que o próprio manual informa ter sido descontinuada em 30/09/2025), por exemplo, oferece [opções de considerar ou não a perda](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/manufatura/gestao-de-engenharia-de-produtos/engenharia-produto-padrao.htm) na explosão. Decida para necessidades, reserva, baixa e custo, separadamente.

## Revisão, vigência e mudança de engenharia

A estrutura muda: um componente é trocado, uma quantidade é corrigida, uma ação corretiva pede outra peça. O sistema precisa guardar **as duas versões**, com a data em que cada uma vale, e o motivo da mudança.

- **Revisão com vigência.** A nova revisão tem data de início, e a anterior, data de fim. O Dynamics 365 permite restringir a [versão por período, quantidade e local](https://learn.microsoft.com/en-au/training/modules/create-bill-materials-dyn365-supply-chain-mgmt/2-formula-version), exige aprovação antes do uso e recusa ativar uma versão que conflite com outra ativa. O manual do Senior prevê [datas de início e fim de uso](https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/manufatura/gestao-de-engenharia-de-produtos/engenharia-produto-padrao.htm) por componente: ordem gerada depois da data final não usa o componente.
- **Mudança de engenharia registrada.** ECO (ordem de mudança de engenharia) e ECN (notificação de mudança de engenharia) são nomes de mercado para o documento que pede, aprova e comunica a mudança. No Odoo, a revisão de uma ECO cria uma [cópia com o próximo número de versão](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/plm/manage_changes/engineering_change_orders.html), sem afetar a lista em produção, com vigência imediata ou numa data; aplicar a mudança arquiva a original. Na ajuda do SAP, a mudança com histórico exige [um número de modificação](https://help.sap.com/saphelp_46C/helpdata/EN/c7/7b26d3a90d11d19db50000e8323350/content.htm) e vale a partir da data definida para ele.
- **O que a ECO precisa dizer.** Motivo, itens e estruturas afetados, revisão nova, vigência, quem aprovou, ordens abertas atingidas e **o destino do estoque antigo**: usar até acabar, devolver, sucatear ou separar para reposição. A aprovação segue o que está em [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/), e as datas, o cuidado de [datas e fusos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Revisão vigente não se edita.** Corrigir uma estrutura em uso é abrir uma nova revisão. Editar a vigente apaga a resposta para "com que estrutura foi feita a ordem de setembro?".

## Alternativos e substitutos

Quando falta o componente principal, a produção quer usar outro. O sistema precisa saber se pode.

- **Alternativo aprovado pela engenharia,** com prioridade: primeiro o principal, depois o alternativo. A ajuda do SAP descreve [grupos de itens alternativos](https://help.sap.com/saphelp_46c/helpdata/en/f4/7d2b9344af11d182b40000e829fbfe/content.htm) com prioridade, estratégia e probabilidade de uso.
- **Mistura na mesma ordem.** Pode usar parte de um e parte de outro? Em tinta, cola ou resina, muitas vezes não. Escreva.
- **Troca pontual não aprovada** não é alternativo: é desvio, e segue o fluxo de concessão da qualidade.
- **Custo.** O alternativo costuma ter outro preço. A diferença aparece como variação da ordem contra o custo padrão, não como mudança silenciosa do custo.

## Qual revisão a ordem de produção congela

Este é o ponto que mais separa uma estrutura útil de uma estrutura perigosa. A ordem de produção carrega uma cópia dos componentes. Defina:

- **Data de referência.** A revisão é escolhida pela data de criação, de liberação ou de início planejado da ordem? No Dynamics 365, ao criar ordens, pode-se usar [qualquer versão aprovada válida na data de produção solicitada](https://learn.microsoft.com/en-au/training/modules/create-bill-materials-dyn365-supply-chain-mgmt/2-formula-version). A recomendação da Torno é usar o início planejado e mostrar a revisão escolhida na ordem.
- **Congelamento.** A partir de quando a ordem não muda mais com a estrutura. Na ajuda do SAP, mudanças feitas depois de criada a ordem [não são consideradas automaticamente](https://help.sap.com/saphelp_46C/helpdata/EN/b1/c04204439a11d189410000e829fbbd/content.htm); os dados podem ser relidos em ordens criadas ou liberadas, e a releitura devolve a liberada ao estado criada. No Dynamics 365, a [troca de item em ordens existentes](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/react-to-last-minute-changes) só vale para ordens estimadas ou programadas.
- **Releitura com registro.** Quem pode aplicar a revisão nova a uma ordem aberta, em quais estados, e o que fica registrado (revisão anterior, nova, quem, quando e por quê).
- **Lista de ordens atingidas.** Ao aprovar uma ECO, o sistema mostra as ordens abertas e planejadas que usam a revisão antiga, para que alguém decida uma a uma.

## Baixa de consumo: backflush ou apontamento

A estrutura também decide como o estoque dos componentes é baixado:

- **Apontamento (requisição ou separação).** Alguém registra o que saiu do estoque para a ordem. Mais trabalho, mais aderência ao real. Bom para itens caros, rastreados por lote ou com consumo variável.
- **Backflush (baixa automática pela estrutura).** O sistema baixa a quantidade da estrutura quando a ordem começa ou termina. O Dynamics 365 descreve [princípios de baixa](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/flushing-principles) manual, no início (proporcional à quantidade iniciada), no fim (proporcional à quantidade apontada como terminada) e na separação. Bom para itens baratos e de consumo estável, como parafusos.
- **O refugo da ordem.** Se a baixa automática no fim considera só as peças boas, o material das peças refugadas fica "sobrando" no estoque do sistema. Defina se o refugo apontado também baixa componentes, e teste.
- **Desvio de consumo.** O Odoo, por exemplo, deixa configurar o [consumo flexível](https://www.odoo.com/documentation/latest/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html) como bloqueado, permitido ou permitido com aviso. Decida o limite e quem aprova o desvio.
- **Lote do componente.** Se o componente é rastreado por lote, o backflush precisa saber de qual lote baixar; o rastreio está em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/).

## Custo padrão a partir da estrutura

O custo padrão de material soma, nível a nível, a quantidade de cada componente (com perda) vezes o custo do componente. Três decisões costumam ficar implícitas:

- **Qual revisão** entra no cálculo: a vigente na data do cálculo, com a data registrada. Uma revisão nova que muda componente pede custo novo.
- **Lote de cálculo.** Perda constante por ordem depende do tamanho da ordem: 1 kg dividido por 50 carrinhos é 0,02 kg por carrinho; por 25, é 0,04 kg. Escreva o lote padrão usado no custo.
- **Semiacabado com custo próprio.** O custo do conjunto de cima usa o custo do semiacabado já calculado, não a soma refeita a cada vez. Teste se uma mudança no semiacabado propaga.

## Rastreio de mudanças e onde-se-usa

- **Onde-se-usa.** Antes de mudar um componente, a engenharia precisa ver em quais estruturas ele entra, inclusive dentro de fantasmas.
- **Histórico.** Cada mudança registra estrutura, revisão, valor anterior, valor novo, quem, quando e por qual ECO; o conteúdo de um bom registro está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), e os perfis de quem cria, aprova e libera, em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Carga inicial.** Estruturas que vêm da planilha passam pelos cuidados de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/) e, na troca de sistema, pela [validação da migração](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/): o teste mínimo é explodir produtos conhecidos nos dois lados e comparar.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Níveis, semiacabados com estoque e fantasmas | Engenharia de produto, com PCP |
| Unidade de consumo, unidade de compra e conversão | Engenharia, com suprimentos |
| Perda prevista por componente e por conjunto | Engenharia de processo, com produção e custos |
| Revisão, vigência e aprovação da mudança de engenharia | Engenharia de produto; qualidade quando nasce de ação corretiva |
| Destino do estoque antigo numa mudança | Engenharia, com suprimentos e custos |
| Alternativos, prioridade e mistura | Engenharia, com qualidade |
| Data de referência, congelamento e releitura da ordem | PCP, com engenharia |
| Baixa por apontamento ou backflush, por item | PCP, com almoxarifado e custos |
| Lote de cálculo e momento do custo padrão | Custos (controladoria), com engenharia |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo Ltda. fabrica o carrinho plataforma CP-300. Na revisão C, cada carrinho leva: 1 plataforma soldada PL-300 (semiacabado com ordem própria); 2 rodízios giratórios KR-125, que são fantasma (cada um com 1 roda giratória RG-125 e 4 parafusos PF-M8, montados na linha); 2 rodas fixas RF-125; 1 alça AL-30 (semiacabado com ordem própria, feita com 1,80 m de tubo TB-25, perda de 5% no corte, comprado em barra de 6 m); 8 parafusos PF-M8 (comprados em caixa de 100); e 0,40 kg de tinta em pó TP-01, com perda de 10% mais 1 kg por ordem para a limpeza da cabine.

![Ilustração de uma vista explodida do carrinho plataforma CP-300, revisão C, da empresa fictícia Indústria Exemplo Ltda., com balões numerados ligados a uma tabela. Balão 1: PL-300, plataforma soldada, 1 unidade, semiacabado com ordem própria. Balão 2, tracejado: KR-125, rodízio giratório, 2 unidades, fantasma, que não vira ordem nem estoque; seus componentes vão direto para a ordem do carrinho: 2a, RG-125, roda giratória, 1 por rodízio; 2b, PF-M8, parafuso, 4 por rodízio. Balão 3: RF-125, roda fixa, 2 unidades, comprada, entrou na revisão C. Balão 4: AL-30, alça tubular, 1 unidade, semiacabado com ordem própria; 4a: TB-25, tubo de 25 milímetros, 1,80 metro, perda de 5%, comprado em barra de 6 metros. Balão 5: PF-M8, parafuso, 8 unidades, comprado em caixa de 100. Balão 6: TP-01, tinta em pó, 0,40 quilo, perda de 10% mais 1 quilo por ordem. Embaixo, a explosão para uma ordem de 50 carrinhos: parafusos, 50 vezes 8 mais 2 vezes 4, igual a 800, 8 caixas; tubo, 50 vezes 1,80 vezes 1,05, igual a 94,5 metros, 15,75 barras, compra de 16 barras; tinta, 50 vezes 0,40 vezes 1,10, mais 1, igual a 23 quilos. Exemplo fictício.](./torno-bom-vista-explodida-baloes.svg)

*Exemplo fictício: empresa, produto, códigos, quantidades e perdas inventados; cada balão do desenho é uma linha da estrutura, e o fantasma some da ordem, mas seus componentes não. Ilustração original Torno, 2026.*

A OP 5120, de 50 carrinhos, explode assim: 50 plataformas (que vêm da OP 5118), 50 alças (da OP 5119), 100 rodas giratórias, 100 rodas fixas, 50 × (8 + 2 × 4) = 800 parafusos, ou 8 caixas, e 50 × 0,40 × 1,10 + 1 = 23 kg de tinta. Na OP 5119, as 50 alças pedem 50 × 1,80 × 1,05 = 94,5 m de tubo, ou 15,75 barras; a compra arredonda para 16 barras (96 m), e só a compra arredonda.

A revisão B, vigente desde 02/03/2026, usava a roda fixa RF-100. A ECO-2026-031, aberta em 05/10 e aprovada em 14/10, trocou para a RF-125, com vigência em 27/10, e definiu o destino das 30 RF-100 que sobrarem: peças de reposição. A data de referência é o início planejado da ordem. A OP 5098, de 40 carrinhos, com início em 21/10, usa a revisão B e consome 80 RF-100. A OP 5120 foi criada em 19/10 com início em 29/10: usa a revisão C e a congela na liberação, em 23/10. Em 05/11 entrou a revisão D (ECO-2026-036, tinta de 0,40 para 0,38 kg); a OP 5120, já em processo, continua em C, e a OP 5131, criada em 06/11 com início em 09/11, usa a D.

O custo padrão de material por carrinho, com lote de cálculo de 50, é: plataforma R$ 210,00 + rodas giratórias 2 × R$ 38,00 = R$ 76,00 + rodas fixas 2 × R$ 29,00 = R$ 58,00 + alça R$ 41,00 + parafusos 16 × R$ 0,45 = R$ 7,20 + tinta (0,40 × 1,10 + 1 ÷ 50) = 0,46 kg × R$ 32,00 = R$ 14,72, total de **R$ 406,92**. Na revisão B, as rodas fixas eram 2 × R$ 24,00 = R$ 48,00, e o total, R$ 396,92: R$ 10,00 a menos por carrinho.

![Ilustração de uma fita métrica vertical que marca as revisões da estrutura do carrinho CP-300, da empresa fictícia Indústria Exemplo Ltda., com a data de referência no início da ordem de produção. Revisão B desde 02/03/2026, com roda fixa RF-100. Cartão da mudança de engenharia ECO-2026-031: aberta em 05/10, aprovada em 14/10, vigência a partir de 27/10, troca a RF-100 pela RF-125, 2 unidades, e manda as 30 RF-100 que sobrarem para reposição. Etiqueta da OP 5098, 40 carrinhos, início em 21/10: congela a revisão B e consome 80 RF-100. Revisão C desde 27/10, com roda fixa RF-125. Etiqueta da OP 5120, 50 carrinhos: criada em 19/10, início em 29/10, revisão vigente no início é a C, liberada em 23/10, quando congela a C, e continua em C depois de 05/11. Revisão D desde 05/11, tinta de 0,38 quilo. Etiqueta da OP 5131, criada em 06/11: usa a revisão D. Embaixo, o custo padrão de material por carrinho nas revisões B e C: plataforma 210,00 e 210,00; 2 rodas giratórias 76,00 e 76,00; 2 rodas fixas 48,00 e 58,00; alça 41,00 e 41,00; 16 parafusos 7,20 e 7,20; tinta, 0,46 quilo, 14,72 e 14,72; total 396,92 e 406,92 reais. Diferença de R$ 10,00 por carrinho. Exemplo fictício.](./torno-bom-regua-revisoes-op.svg)

*Exemplo fictício: revisões, mudanças, ordens, datas e custos inventados; a ordem usa a revisão vigente no início planejado e não muda quando outra revisão entra em vigor. Ilustração original Torno, 2026.*

Na OP 5120, os parafusos e a tinta são baixados por backflush no fim; plataformas, alças e rodas, por apontamento. Foram montados os 50 carrinhos; 48 passaram e 2 foram refugados na inspeção final. Se a baixa considerar só as 48 peças boas, o sistema baixa 48 × 16 = 768 parafusos e 48 × 0,44 + 1 = 22,12 kg de tinta: 32 parafusos e 0,88 kg a menos do que o consumo previsto para 50, que vão aparecer como sobra no inventário. A regra escolhida é baixar também pelas peças refugadas apontadas. No mesmo dia, havia só 15 kg de TP-01; a regra é não misturar tintas na ordem, então a OP usou 23 kg do alternativo TP-02, a R$ 34,00/kg: 23 × R$ 2,00 = R$ 46,00 de variação contra o padrão.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com itens, estruturas e ordens fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Explosão da OP 5120, 50 carrinhos, revisão C | 50 PL-300, 50 AL-30, 100 RG-125, 100 RF-125, 800 PF-M8, 23 kg de TP-01 | Lista de componentes da ordem |
| Fantasma KR-125 na explosão | Nenhuma ordem nem reserva de KR-125; 100 RG-125 e 400 PF-M8 aparecem direto na OP 5120 | Ordem e lista de ordens planejadas |
| Semiacabados PL-300 e AL-30 | Ordens próprias (OP 5118 e 5119) com 50 unidades cada, ligadas à OP 5120 | Ordens e vínculo |
| OP 5119, 50 alças | 94,5 m de TB-25 na ordem; necessidade de compra de 16 barras, sem arredondar a ordem | Ordem e sugestão de compra |
| Linha do TB-25 cadastrada como 1,80 "barra" | Recusada, porque a unidade de consumo do item é metro; se aceita, a ordem pediria 94,5 barras (567 m) | Tentativa recusada com a mensagem |
| KR-125 cadastrado com CP-300 como componente | Recusado como estrutura circular | Tentativa recusada |
| Revisão C aprovada com vigência em 27/10 e B ainda vigente | B termina em 26/10; não há duas revisões ativas no mesmo dia | Histórico de revisões |
| OP 5098, início em 21/10 | Usa a revisão B, com 80 RF-100 | Ordem com a revisão mostrada |
| OP 5120, criada em 19/10 com início em 29/10 | Usa a revisão C | Ordem com a revisão mostrada |
| Revisão D vigente em 05/11, com a OP 5120 em processo | OP 5120 continua em C; a ECO-2026-036 lista a OP 5120 como ordem aberta atingida | Ordem e ficha da ECO |
| Releitura da OP 5120 para a revisão D por usuário do PCP | Bloqueada em ordem em processo; em ordem liberada, só com motivo e registro | Tentativa recusada e histórico |
| OP 5131, criada em 06/11 com início em 09/11 | Usa a revisão D, com 0,38 kg de tinta por carrinho | Ordem com a revisão mostrada |
| Edição direta da quantidade na revisão C vigente | Bloqueada; mudança só por nova revisão com ECO | Tentativa recusada |
| ECO-2026-031 sem destino do estoque de RF-100 | Não pode ser aprovada | Tentativa recusada |
| Separação de RF-100 para a OP 5120 | Bloqueada; RF-100 não está na revisão C | Tentativa recusada |
| Onde-se-usa do PF-M8 | Mostra CP-300 (8 por carrinho) e KR-125 (4 por rodízio), total de 16 por carrinho | Relatório de onde-se-usa |
| Backflush da OP 5120 com 48 boas e 2 refugadas apontadas | Baixa 800 parafusos e 23 kg de tinta, não 768 e 22,12 kg | Movimentos de estoque da ordem |
| TP-01 com 15 kg e TP-02 com 40 kg para a OP 5120 | Sistema propõe 23 kg de TP-02, sem misturar, e registra a troca | Ordem e movimento do alternativo |
| Variação da OP 5120 pela tinta alternativa | R$ 46,00 (23 kg × R$ 2,00) contra o padrão | Relatório de variação com a memória de cálculo |
| Custo padrão do CP-300, revisão C, lote de cálculo 50 | R$ 406,92 por carrinho, com memória por linha | Relatório de custo |
| Custo padrão do CP-300, revisão B | R$ 396,92; diferença de R$ 10,00 nas rodas fixas | Relatório comparativo |
| Lote de cálculo alterado para 25 | Tinta passa a 0,48 kg por carrinho (R$ 15,36) e o total a R$ 407,56 | Relatório de custo |
| Estruturas importadas da planilha | Explosão de 3 produtos conhecidos igual à da planilha, linha a linha | Relatório de comparação |

*Fim do exemplo fictício. Empresa, produto, códigos, revisões, ordens, quantidades, perdas, custos, datas e regras são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma nem comportamento padrão de ferramenta.*

## Perguntas frequentes

### Qual é a diferença entre estrutura de produto, lista de materiais, BOM e ficha técnica?

Na prática, são nomes para a mesma coisa: a lista de componentes e quantidades de um produto. "Ficha técnica" às vezes inclui também o roteiro, os tempos e as especificações. O importante é a empresa usar um nome só e saber qual finalidade cada lista tem, de engenharia ou de produção.

### Quando usar fantasma em vez de semiacabado?

Quando o conjunto é montado na própria linha do produto final e não precisa de estoque, ordem nem custo próprio. Se o conjunto é feito antes, guardado ou vendido como peça de reposição, ele é semiacabado.

### Backflush é mais preciso que apontamento?

Não. O backflush é mais barato de operar, mas baixa o que a estrutura diz, não o que foi usado. Funciona para itens baratos e de consumo estável, com perda prevista correta e refugo apontado. Para itens caros, rastreados por lote ou de consumo variável, o apontamento costuma ser mais seguro.

Para transformar a estrutura de produto em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a estrutura de um produto real com dois ou três níveis, a última mudança de engenharia e a regra de baixa de consumo usada hoje, sem dados confidenciais de clientes.

*Fontes consultadas em 16 de novembro de 2026: ISO, página da ISO 10007:2017; SAP Help Portal, refugo de componente, conjunto fantasma, finalidade da lista de materiais, mudanças na lista de materiais, releitura de dados mestres e itens alternativos; Microsoft Learn, versões de lista de materiais, listas de materiais e fórmulas, cálculo de refugo, princípios de baixa e mudanças de última hora (Dynamics 365 Supply Chain Management); Odoo, lista de materiais, listas multinível (18.0) e ordens de mudança de engenharia (18.0); Senior Sistemas, manual de engenharia de produto padrão (5.10.3). Empresa, produto, números e ilustrações são fictícios.*
