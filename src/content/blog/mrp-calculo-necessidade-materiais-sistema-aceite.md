---
content_id: torno-artigo-pt-20261116-mrp-necessidade-materiais
intent_id: buyer-mrp-material-requirements-planning-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'MRP no sistema: o que definir e testar antes de automatizar o cálculo de necessidade de materiais'
h1: 'MRP no sistema: o que definir e testar antes de automatizar o cálculo de necessidade de materiais'
seo_title: 'MRP no sistema: cálculo de necessidades e aceite | Torno'
seo_description: 'Necessidade bruta e líquida, estoque que conta, lead time, lote, estoque de segurança, pedido firme e mensagens: o que definir e testar no MRP.'
summary: 'Roteiro para a indústria que vai tirar o cálculo de necessidade de materiais (MRP) da planilha e deixar o sistema sugerir compras e ordens: necessidade bruta e líquida; qual estoque conta (disponível, reservado, em inspeção, bloqueado); pedidos de compra e ordens em aberto; lead time em dias úteis e calendário com feriados; lote mínimo, múltiplo e política de lote; estoque de segurança; horizonte, frequência da rodada e zona firme; pedido planejado, pedido firme e quem libera a compra; mensagens de antecipar, adiar, reduzir e cancelar; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar o MRP (cálculo de necessidade de materiais) no sistema, para que as sugestões de compra e de produção saiam certas e alguém confie nelas?
proposed_path: /blog/mrp-calculo-necessidade-materiais-sistema-aceite/
canonical_url: https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes de PCP, compras e suprimentos, almoxarifado, qualidade e TI de indústrias de médio e grande porte que vão contratar, especificar ou aceitar um sistema (módulo de ERP, sistema de manufatura ou sistema sob medida) para calcular necessidades de materiais e sugerir compras e ordens de produção, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de necessidades pelo cálculo do sistema ou de deixar o sistema gerar sugestões de compra e de ordens de produção.
scope: Necessidade bruta e líquida, demanda dependente e independente; estoque disponível, reservado, em inspeção e bloqueado; pedidos de compra e ordens em aberto como recebimentos programados; lead time, dias úteis, calendário da fábrica e do fornecedor, feriados; lote mínimo, múltiplo, lote por lote e lote fixo, ordem de aplicação; estoque de segurança; horizonte, frequência da rodada, zona firme; pedido planejado, pedido firme, conversão em pedido de compra e alçada; mensagens de antecipar, adiar, reduzir e cancelar, com margem de tolerância; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ERP, sistema de planejamento ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem); previsão de demanda e plano mestre de produção (MPS) em si; programação fina de capacidade, sequenciamento e APS; MRP II e planejamento de recursos; DDMRP e outros métodos alternativos; cálculo estatístico do estoque de segurança e do lote econômico; montagem da estrutura de produto, contagem de inventário, rastreio de lote, tratamento de não conformidade, OEE e importação de planilhas em geral (cobertos em outros artigos).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-16T21:12:24Z'
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
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura de produto, que declarou o MRP fora de escopo; aqui o cálculo que usa a estrutura para transformar o plano de produtos em necessidade de componentes.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata a contagem e o ajuste de estoque; aqui o saldo que o MRP usa como ponto de partida, que só presta se o inventário presta.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade e bloqueio de lote no estoque; aqui quais desses saldos o MRP conta como disponível.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata a RNC e a segregação de material; aqui o estoque bloqueado por RNC que não pode entrar no cálculo.
  - path: https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/
    reason: Trata as camadas de estoque (físico, reservado, disponível) na venda; aqui a mesma separação vista pelo planejamento.
  - path: https://tornostudio.com/blog/sla-horas-uteis-sistema-chamados-aceite/
    reason: Detalha calendário de dias úteis e feriados em prazos; aqui o lead time contado em dias úteis.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas, cortes e semanas; aqui a data de necessidade e a de liberação do pedido.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui quem converte a sugestão em pedido de compra.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a rodada e a conversão de pedidos precisam registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode alterar parâmetros de planejamento.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o indicador de eficiência do equipamento; aqui fica fora, porque o MRP padrão não considera capacidade.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas em geral; aqui a carga inicial dos parâmetros de planejamento por item.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso específico da planilha de necessidades.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com itens, saldos, pedidos e ordens fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as regras de planejamento de materiais em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A ajuda do SAP descreve o cálculo de necessidade líquida: o estoque da planta (depósitos não excluídos do planejamento) e os recebimentos programados são comparados às necessidades em cada data; se não cobrem, o sistema calcula a falta e cria uma proposta de suprimento, cuja quantidade sai do procedimento de lote, do refugo e do arredondamento; se estoque em trânsito, bloqueado e de uso restrito contam no estoque da planta é definido em configuração.'
    reference: https://help.sap.com/SAPHelp_46c/helpdata/EN/f4/7d27aa44af11d182b40000e829fbfe/content.htm
    entity: 'SAP, SAP Help Portal, "Net Requirements Calculation" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T20:58:00Z'
    limit: 'Página de versão antiga do ERP, sem data visível; não trata de estoque de segurança nem de estoque em inspeção. Exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve o procedimento de MRP em etapas: necessidade líquida (estoque disponível, incluindo recebimentos firmes, contra necessidades), cálculo do lote, programação das datas das propostas e explosão da estrutura, com a data da necessidade dependente deslocada pelo tempo de produção do item de cima.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/f4/7d252f44af11d182b40000e829fbfe/content.htm
    entity: 'SAP, SAP Help Portal, "Material Requirements Planning Procedure" (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T20:59:00Z'
    limit: 'Versão antiga do ERP; exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP diz que o sistema compara a falta com os parâmetros do procedimento de lote e, se houver valor ou perfil de arredondamento, arredonda o lote para cima; os procedimentos estáticos incluem lote por lote, lote fixo e lote fixo com divisão e sobreposição; no lote fixo, vários lotes são planejados na mesma data até eliminar a falta.'
    reference: https://help.sap.com/saphelp_46C/helpdata/EN/db/6f143ba7ec11d3a8330000e82a3c24/content.htm
    entity: 'SAP, SAP Help Portal, "Lot-Size Calculation", "Static Lot-Sizing Procedures" (https://help.sap.com/saphelp_46c/helpdata/en/b5/178c3061d011d3b4e30004ac160649/content.htm) e "Fixed Lot Size" (https://help.sap.com/saphelp_46c/helpdata/en/f4/7d280544af11d182b40000e829fbfe/content.htm) (SAP R/3 4.6C)'
    source_date: null
    checked_at: '2026-11-16T21:01:00Z'
    limit: 'Versão antiga do ERP; as páginas não detalham lote mínimo nem máximo. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Business Central diz que a quantidade sugerida é ajustada pelos modificadores de pedido nesta ordem: reduzida se passar da quantidade máxima, aumentada se ficar abaixo da mínima e arredondada para cima até o múltiplo; descreve também estoque de segurança como nível mínimo a recompor, período de acumulação de lote, período de reprogramação e período de amortecimento (dampener), dentro do qual mudanças de data não geram mensagem.'
    reference: https://learn.microsoft.com/dynamics365/business-central/design-details-planning-parameters
    entity: 'Microsoft Learn, "Design details: Planning parameters" (Dynamics 365 Business Central)'
    source_date: '2025-09-11'
    checked_at: '2026-11-16T21:02:00Z'
    limit: 'Documentação de produto; exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 Supply Chain Management define mensagem de ação como sugestão do sistema para mudar um pedido planejado, aprovado ou firme existente, com os tipos antecipar, adiar, aumentar, reduzir e ações derivadas, margens de antecipação e de adiamento, e diz que pedidos que suprem estoque de segurança não são reduzidos abaixo dele nem adiados; no exemplo, com múltiplo 20, um aumento de demanda de 30 gera sugestão de aumento de 40; e orienta, em itens com estrutura, aplicar antes as mensagens de antecipar e adiar dos componentes e depois as do item de cima, rodando o planejamento de novo.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/action-messages
    entity: 'Microsoft Learn, "Action messages" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-03-26'
    checked_at: '2026-11-16T20:59:30Z'
    limit: 'Documentação de produto; a página não lista mensagem de cancelamento. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 diz que pedidos planejados precisam ser firmados (liberados) para virarem pedidos de compra, de transferência ou ordens de produção reais, manualmente, por consulta ou automaticamente dentro de uma cerca de tempo de firmeza; com todas as cercas em zero, a firmeza automática fica desligada.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/planned-order-firming
    entity: 'Microsoft Learn, "Firm planned orders" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-03-25'
    checked_at: '2026-11-16T21:03:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 diz que, por padrão, a demanda real tem prioridade sobre o estoque de segurança e que a opção de vínculo estrito de estoque de segurança pode gerar pedidos planejados indesejados.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/safety-stock-pegging
    entity: 'Microsoft Learn, "Safety stock pegging options" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-05-06'
    checked_at: '2026-11-16T21:03:30Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 define a cerca de cobertura como o número de dias após a data da rodada em que oferta e demanda são consideradas, recomenda que seja maior que o lead time total e informa padrão de 100 dias.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/coverage-time-fence
    entity: 'Microsoft Learn, "Coverage time fences" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-07-27'
    checked_at: '2026-11-16T21:04:00Z'
    limit: 'Documentação de produto; página en-us atualizada em 27/07/2026. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 diz que o lead time de compra pode ser contado em dias úteis do calendário do grupo de cobertura, que a data do pedido planejado precisa estar aberta no calendário do fornecedor e no do grupo, e que, sem calendário no depósito, o sistema supõe que ele abre todos os dias.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/supply-chain-calendars-master-planning
    entity: 'Microsoft Learn, "Supply chain calendars in master planning" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-07-27'
    checked_at: '2026-11-16T21:04:30Z'
    limit: 'Documentação de produto; a mesma página recomenda, na maioria dos casos, não marcar dias úteis no lead time de compra. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 descreve as margens de segurança de emissão do pedido, de recebimento e de expedição, em dias, somadas entre si; a margem de recebimento dá tempo para o manuseio da entrada sem aumentar o lead time do fornecedor.'
    reference: https://learn.microsoft.com/en-gb/dynamics365/supply-chain/master-planning/planning-optimization/safety-margins
    entity: 'Microsoft Learn, "Safety margins" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-07-27'
    checked_at: '2026-11-16T21:05:00Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 diz que as configurações padrão de pedido definem quantidades mínima, máxima, múltipla e padrão e lead times, e que a validação estrita exige que a quantidade padrão seja múltipla do valor de múltiplo.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/default-order-settings
    entity: 'Microsoft Learn, "Default order settings" (Dynamics 365 Supply Chain Management)'
    source_date: '2025-07-10'
    checked_at: '2026-11-16T21:05:30Z'
    limit: 'Documentação de produto; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo 18 descreve regras de reposição com mínimo, máximo e quantidade múltipla, dias de visibilidade, lead times de compra e de fabricação somados e acionamento automático ou manual.'
    reference: https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/warehouses_storage/replenishment/reordering_rules.html
    entity: 'Odoo, documentação "Reordering rules" (18.0)'
    source_date: null
    checked_at: '2026-11-16T21:06:00Z'
    limit: 'Reposição por ponto de pedido, não MRP por estrutura; exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo descreve o plano mestre de produção (MPS) com períodos, meta de estoque de segurança e reposição sugerida, e diz que incluir um produto no MPS não cria automaticamente pedido de compra nem ordem de fabricação.'
    reference: https://www.odoo.com/documentation/master/applications/inventory_and_mrp/manufacturing/workflows/use_mps.html
    entity: 'Odoo, documentação "Master production schedule" (ramo master)'
    source_date: null
    checked_at: '2026-11-16T21:06:30Z'
    limit: 'Página do ramo de desenvolvimento, sem rótulo de versão; a página 18.0 equivalente não foi aberta. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação da Senior descreve o MRP como sistema usado na indústria para planejar e controlar a produção com base nas necessidades de materiais, calculadas a partir de ordens de produção, lead time, estoque e previsões de demanda.'
    reference: https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/Subsystems/index/gestao-industrial/gestao-mrp/planejamento-materiais.htm
    entity: 'Senior Sistemas, manual do usuário Senior X, "MRP - Planejamento das necessidades de materiais"'
    source_date: null
    checked_at: '2026-11-16T21:07:00Z'
    limit: 'Página introdutória, sem data; não detalha necessidade líquida, lote nem estoque de segurança. Vocabulário em português, não recomendação.'
  - classification: FATO
    claim: 'A Lei 14.759, sancionada em 21/12/2023 e publicada em 22/12/2023, instituiu o feriado nacional do Dia Nacional de Zumbi e da Consciência Negra, em 20 de novembro, a partir de 2024.'
    reference: https://www12.senado.leg.br/noticias/materias/2023/12/22/dia-da-consciencia-negra-se-torna-feriado-nacional
    entity: 'Agência Senado, "Dia da Consciência Negra se torna feriado nacional"'
    source_date: '2023-12-22'
    checked_at: '2026-11-16T21:08:00Z'
    limit: 'Notícia oficial do Senado; o texto da lei no portal da Câmara não abriu nesta sessão. Usada só para o calendário do exemplo.'
  - classification: FATO
    claim: 'O livro Orlicky''s material requirements planning, 3ª edição, de Carol A. Ptak e Chad Smith, com Joseph Orlicky, foi publicado pela McGraw-Hill em 2011.'
    reference: https://libcat.library.tamu.edu/Record/in00002703909
    entity: 'Texas A&M University Libraries, registro de catálogo'
    source_date: '2011'
    checked_at: '2026-11-16T21:08:30Z'
    limit: 'Só o registro bibliográfico; o livro não foi lido e nada do seu conteúdo é atribuído a ele.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo Ltda., o carrinho CP-300 e a roda fixa RF-125, os saldos, pedidos de compra (PC 7702, 7715, 7731), ordens (OP 5131, 5140), quantidades, lead time, lote, estoque de segurança, preços, alçadas, datas e as regras escolhidas no exemplo (estoque que conta, zona firme, margem de mensagem, conversão por compras) são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 14 minutos.*

**Antes de deixar o sistema calcular o MRP, escreva e aprove oito regras: o que entra como necessidade, qual estoque conta como disponível, quais pedidos em aberto o cálculo considera, como o lead time é contado no calendário, como o lote é arredondado, quanto estoque de segurança cada item tem, com que horizonte e frequência o cálculo roda e quem transforma a sugestão em pedido.** Depois, teste com um item fictício cujo registro de necessidades você já sabe preencher à mão, semana a semana. Sem isso, o sistema sugere compra do que já está no almoxarifado (ou deixa de sugerir o que falta), e o comprador volta para a planilha na segunda semana.

**Este artigo não recomenda ERP, sistema de planejamento nem fornecedor.** A documentação de alguns fornecedores aparece só para mostrar como os sistemas costumam modelar o cálculo. Empresa, produto, códigos e números do exemplo são inventados.

## Por que o MRP da planilha não vira MRP no sistema

Em muitas indústrias, o cálculo de necessidade de materiais já existe: é a planilha do PCP ou de compras que cruza o plano de produção com a estrutura dos produtos, desconta o estoque e diz o que comprar. Ela funciona porque quem a mantém sabe o que não está escrito: que aquelas 40 rodas no canto estão bloqueadas pela qualidade, que o parafuso só vem em caixa fechada e que "o pedido da semana que vem" já foi feito por telefone.

O sistema não sabe nada disso. O MRP (do inglês *material requirements planning*, planejamento de necessidades de materiais) é um cálculo mecânico: para cada item e cada período, soma o que vai ser consumido, desconta o que existe e o que já vai chegar, e sugere o que falta, com quantidade e data. Se o estoque bloqueado entra como disponível, ou um pedido antigo nunca foi encerrado, a sugestão sai menor. Se o lead time ignora o feriado, o pedido sai atrasado. O resultado é conhecido: compra em dobro de um item e falta de outro na mesma semana, pedido urgente com frete caro e um relatório de sugestões que ninguém lê inteiro. O comprador deixa de confiar, volta para a planilha, e a empresa passa a ter dois cálculos, nenhum oficial.

### Norma, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Norma e literatura.** Não encontramos norma técnica que diga como a empresa deve parametrizar o MRP. O método vem da literatura de planejamento de produção, como o livro de Joseph Orlicky, hoje na [3ª edição, de Carol Ptak e Chad Smith, com Joseph Orlicky (McGraw-Hill, 2011)](https://libcat.library.tamu.edu/Record/in00002703909). Não lemos o livro para este artigo, e nada do seu conteúdo é atribuído a ele.
- **Documentação de fornecedores e convenção de mercado.** Necessidade bruta e líquida, recebimento programado, lote, estoque de segurança, pedido planejado e firme e mensagem de reprogramação são convenção de mercado e aparecem na documentação de SAP, Microsoft Dynamics 365, Odoo e Senior, citada como exemplo de modelagem. A Senior, por exemplo, descreve o MRP como [cálculo a partir de ordens, lead time, estoque e previsões](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/Subsystems/index/gestao-industrial/gestao-mrp/planejamento-materiais.htm). Cada sistema implementa de um jeito; nenhum é regra.
- **Decisão da empresa.** Qual estoque conta, quanta segurança, quem libera a compra, quando o sistema pode mexer num pedido. É essa camada que decide se a sugestão presta, e ela precisa estar escrita antes de configurar ou programar.

## O que entra no cálculo: necessidade bruta e líquida

O MRP trabalha item a item, período a período (dia, semana ou mês). Para cada período:

- **Necessidade bruta** é tudo o que vai sair do estoque. Ela tem duas origens. A **demanda dependente** vem da explosão da [estrutura de produto](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/): 100 carrinhos planejados com 2 rodas cada são 200 rodas. A **demanda independente** vem direto de fora: um pedido de peça de reposição, uma previsão de venda do componente avulso.
- **Necessidade líquida** é o que falta depois de descontar o estoque disponível e o que já vai chegar. Na ajuda do SAP, o [cálculo de necessidade líquida](https://help.sap.com/SAPHelp_46c/helpdata/EN/f4/7d27aa44af11d182b40000e829fbfe/content.htm) compara, em cada data, as necessidades com o estoque e os recebimentos; se não cobrem, o sistema calcula a falta e cria uma proposta de suprimento.
- **Pedido planejado** é a falta transformada em sugestão: quantidade (depois do lote) e duas datas, a de necessidade e a de liberação (necessidade menos lead time).

O pedido planejado de um item fabricado vira necessidade bruta dos componentes no período em que a ordem começa; a ajuda do SAP descreve esse [deslocamento da data da necessidade dependente](https://help.sap.com/saphelp_46c/helpdata/en/f4/7d252f44af11d182b40000e829fbfe/content.htm) pelo tempo de produção do item de cima. Por isso o cálculo é feito do produto final para baixo, nível a nível, e um erro no nível de cima se propaga para todos os de baixo.

Escreva também de onde vem a demanda do produto final (carteira, previsão, plano mestre) e como se evita contar duas vezes o pedido de cliente que consome uma previsão. O plano mestre está fora deste artigo; o MRP precisa receber uma fonte só, com data.

## Qual estoque conta: disponível, reservado, em inspeção e bloqueado

O saldo físico do almoxarifado quase nunca é o saldo que o MRP pode usar. Separe, por item:

- **Disponível (livre).** Pode ser usado em qualquer ordem. É o ponto de partida do cálculo.
- **Reservado ou separado.** Já está comprometido com uma ordem específica. Ou a reserva sai do disponível, ou a necessidade daquela ordem sai da bruta: um ou outro, nunca os dois e nunca nenhum. A mesma separação entre físico, reservado e disponível aparece do lado da venda em [integração com marketplace](https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/).
- **Em inspeção de recebimento.** Chegou, mas a qualidade não liberou. A regra mais segura é tratá-lo como recebimento na data provável de liberação, não como disponível.
- **Bloqueado.** Material segregado por [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/), lote vencido ou em quarentena (o bloqueio por lote está em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/)). Não conta até a disposição sair.
- **Em trânsito, em terceiros e em outros depósitos.** Decida depósito por depósito.

Na ajuda do SAP, isso é configuração: contam os depósitos [não excluídos do planejamento](https://help.sap.com/SAPHelp_46c/helpdata/EN/f4/7d27aa44af11d182b40000e829fbfe/content.htm), e um parâmetro define se estoque em trânsito, bloqueado e de uso restrito entram. E o saldo precisa estar certo: um MRP sobre estoque que não bate com o físico só erra mais depressa (veja [inventário e contagem](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/)).

## Pedidos de compra e ordens em aberto

O que já foi pedido entra como **recebimento programado**, na data prevista de chegada:

- **Pedido esquecido em aberto.** Um saldo de 30 unidades que o fornecedor nunca vai entregar reduz a sugestão para sempre. Defina quem encerra saldo residual e em quanto tempo.
- **Data confirmada versus data pedida.** Se o fornecedor avisou que atrasa, a data no sistema precisa mudar, ou o cálculo conta com material que não vem.
- **Ordem de produção aberta.** A quantidade prevista da ordem entra como recebimento do item fabricado; o refugo apontado reduz o que vai chegar.
- **Pedido em outra unidade.** O pedido em caixas e o estoque em peças só se encontram se a conversão for uma só, no cadastro do item.

## Lead time e calendário

O lead time é o tempo entre liberar o pedido e ter o material disponível para uso. Ele define a data de liberação do pedido planejado.

- **O que o lead time inclui.** Tempo do fornecedor, transporte, recebimento e inspeção. O Dynamics 365 tem [margens de segurança](https://learn.microsoft.com/en-gb/dynamics365/supply-chain/master-planning/planning-optimization/safety-margins) de emissão do pedido, de recebimento e de expedição, somadas ao lead time; a de recebimento dá tempo para a entrada sem empurrar a data do fornecedor. Não conte a inspeção duas vezes.
- **Dias corridos ou dias úteis.** O Dynamics 365 permite contar o lead time de compra em [dias úteis do calendário](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/supply-chain-calendars-master-planning) e exige data de pedido aberta no calendário do fornecedor; a mesma página recomenda, na maioria dos casos, não usar dias úteis em compras. A Torno recomenda seguir a forma como o fornecedor promete o prazo.
- **Feriados e paradas.** O calendário da fábrica precisa ter feriados nacionais, estaduais e municipais e férias coletivas. Desde 2024, 20 de novembro é [feriado nacional](https://www12.senado.leg.br/noticias/materias/2023/12/22/dia-da-consciencia-negra-se-torna-feriado-nacional) (Lei 14.759/2023); num calendário sem ele, o lead time em dias úteis que atravessa a data termina um dia antes do real. O cuidado com dias úteis em prazos está em [SLA em horas úteis](https://tornostudio.com/blog/sla-horas-uteis-sistema-chamados-aceite/), e o com cortes de data, em [datas e fusos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Liberação no passado.** Se a data de liberação calculada já passou, o pedido planejado aparece como atrasado, com a data em que deveria ter saído.

## Lote mínimo, múltiplo e política de lote

Entre a necessidade líquida e a quantidade comprada estão as regras de lote:

- **Lote por lote.** Compra exatamente a necessidade do período. Na ajuda do SAP, é um dos [procedimentos estáticos](https://help.sap.com/saphelp_46c/helpdata/en/b5/178c3061d011d3b4e30004ac160649/content.htm), ao lado do lote fixo, em que [vários lotes são planejados na mesma data](https://help.sap.com/saphelp_46c/helpdata/en/f4/7d280544af11d182b40000e829fbfe/content.htm) até eliminar a falta.
- **Mínimo, máximo e múltiplo.** Mínimo de 100 peças, caixa de 50, caminhão de no máximo 2.000. A ordem de aplicação muda o resultado; o Business Central documenta a sequência: [reduz até o máximo, aumenta até o mínimo e arredonda para cima até o múltiplo](https://learn.microsoft.com/dynamics365/business-central/design-details-planning-parameters). A ajuda do SAP descreve o [arredondamento para cima](https://help.sap.com/saphelp_46C/helpdata/EN/db/6f143ba7ec11d3a8330000e82a3c24/content.htm) depois do cálculo do lote. Escreva a ordem e teste com uma necessidade que caia entre os valores.
- **Agrupamento de períodos.** Juntar semanas num pedido reduz pedidos e aumenta estoque. O Business Central chama isso de [período de acumulação de lote](https://learn.microsoft.com/dynamics365/business-central/design-details-planning-parameters); o Odoo, nas regras de reposição, de [dias de visibilidade](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/warehouses_storage/replenishment/reordering_rules.html).
- **Uma fonte por parâmetro.** O Dynamics 365 reúne mínimo, máximo, múltiplo e quantidade padrão nas [configurações padrão de pedido](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/default-order-settings). Se o mesmo parâmetro existir em dois lugares, o teste precisa mostrar qual vence.

## Estoque de segurança

O estoque de segurança protege contra atraso de fornecedor e variação de consumo. No cálculo, funciona como necessidade a mais: a líquida é o que falta para o projetado não ficar abaixo dele. No Business Central, se o projetado fica abaixo do [estoque de segurança](https://learn.microsoft.com/dynamics365/business-central/design-details-planning-parameters), o sistema sugere suprimento para recompô-lo. Decida:

- **Quanto, por item.** Número fixo, dias de cobertura ou cálculo estatístico (fora deste artigo), com dono e data de revisão.
- **Prioridade.** Quando a demanda real e o estoque de segurança disputam o mesmo material, quem ganha? No Dynamics 365, por padrão, a [demanda real tem prioridade](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/safety-stock-pegging), e a própria documentação alerta que dar prioridade estrita ao estoque de segurança pode gerar pedidos planejados indesejados.
- **Abaixo da segurança não é falta.** Projetado de 40 com segurança de 60 pede reposição; projetado negativo é falta para uma ordem. O sistema mostra os dois de forma diferente.

## Horizonte, frequência da rodada e zona firme

- **Horizonte.** Até onde o cálculo olha. Ele precisa ser maior que o maior lead time acumulado: o tempo de compra do componente mais demorado somado ao tempo de fabricação de todos os níveis acima dele. A documentação do Dynamics 365 recomenda que a [cerca de cobertura seja maior que o lead time total](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/coverage-time-fence) e informa padrão de 100 dias.
- **Frequência.** Com a frequência em que a empresa consegue tratar o resultado: rodar todo dia e tratar mensagens toda semana só gera ruído. Uma rodada completa e outra só dos itens alterados precisam dar o mesmo resultado; o teste é comparar as duas.
- **Zona firme.** Um período curto à frente (por exemplo, duas semanas) em que o sistema não cria, não altera e não apaga nada sozinho; só sugere. Fora dela, pedidos planejados são recalculados a cada rodada. Sem zona firme, o plano muda toda manhã e a fábrica deixa de segui-lo.

## Pedido planejado, pedido firme e quem libera a compra

O MRP sugere; alguém decide:

- **Planejado.** Sugestão; a cada rodada pode mudar ou sumir.
- **Firme.** Alguém aceitou a sugestão: ela não muda mais sozinha. A documentação do Dynamics 365 descreve que pedidos planejados precisam ser [firmados para virarem pedidos de compra ou ordens de produção reais](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/planned-order-firming), manualmente ou automaticamente dentro de uma cerca de tempo; com as cercas em zero, a firmeza automática fica desligada. O Odoo, no plano mestre, diz que incluir um produto [não cria automaticamente pedido nem ordem](https://www.odoo.com/documentation/master/applications/inventory_and_mrp/manufacturing/workflows/use_mps.html).
- **Pedido de compra ou ordem de produção.** Documento enviado ao fornecedor ou liberado para a fábrica.

Escreva quem converte, em que alçada e com que registro. O comprador converte até um valor; acima dele, aprova o gerente de suprimentos, conforme o [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/). A conversão registra quem, quando, o que foi sugerido e o que foi pedido ([trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/)). Alterar lead time, lote ou segurança é [permissão](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) separada, porque muda todas as sugestões futuras.

## Mensagens de reprogramação: antecipar, adiar, reduzir, cancelar

Depois que o pedido é firme, o MRP não o altera; ele avisa. A documentação do Dynamics 365 define a [mensagem de ação](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/action-messages) como sugestão para mudar um pedido planejado, aprovado ou firme existente, com os tipos antecipar, adiar, aumentar, reduzir e ações derivadas, e margens que evitam mensagem por diferença pequena. O Business Central chama de [período de amortecimento](https://learn.microsoft.com/dynamics365/business-central/design-details-planning-parameters) o intervalo em que mudanças de data não geram mensagem.

Defina:

- **Tipos.** Antecipar, adiar, aumentar, reduzir, cancelar; cancelar é decisão de compras, nunca automática.
- **Margem de tolerância.** Diferença de um ou dois dias úteis não vale uma ligação ao fornecedor.
- **Preferência por reprogramar.** Se antecipar um pedido firme resolve a falta, o sistema sugere isso, e não um pedido novo com liberação vencida.
- **Ordem de tratamento.** O Dynamics 365 orienta [tratar primeiro as mensagens dos componentes](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/action-messages), depois as do item de cima, e rodar o planejamento de novo.
- **Quem trata e em quanto tempo.** Mensagens de compra com o comprador; de produção com o PCP. Mensagem não tratada em dois dias aparece para o gestor.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Fonte da demanda do produto final (pedidos, previsão, plano mestre) | Comercial e PCP, com a diretoria |
| Quais saldos e depósitos contam como disponível | PCP, com almoxarifado e qualidade |
| Lead time por item e fornecedor, calendário e feriados | Compras, com PCP |
| Lote mínimo, múltiplo, máximo e agrupamento | Compras, com PCP e financeiro |
| Estoque de segurança por item | PCP, com compras e financeiro |
| Horizonte, frequência da rodada e zona firme | PCP |
| Quem converte sugestão em pedido e alçadas | Suprimentos, com financeiro |
| Tipos de mensagem, margens e prazo de tratamento | PCP e compras |
| Permissão para alterar parâmetros de planejamento | PCP, com TI |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo Ltda., a mesma do artigo sobre estrutura de produto, fabrica o carrinho CP-300, que na revisão D leva 2 rodas fixas RF-125, compradas a R$ 29,00. O exemplo acompanha só a RF-125.

Regras da empresa: período semanal, com a necessidade na segunda-feira em que começa a ordem do carrinho; horizonte de 6 semanas (o maior lead time acumulado do CP-300 é de 5); rodada toda segunda às 6h; zona firme de 2 semanas. Para a RF-125: lead time de 10 dias úteis (8 do fornecedor e 2 de inspeção) no calendário da fábrica, com o feriado de 20/11; lote mínimo de 100 e múltiplo de 50; estoque de segurança de 60. Só o estoque livre é disponível; o que está em inspeção entra como recebimento na data provável de liberação. O comprador converte pedidos até R$ 5.000,00; acima, aprova o gerente de suprimentos. Diferenças de até 2 dias úteis não geram mensagem.

**Rodada de 09/11/2026.** O saldo físico da RF-125 é de 460 rodas: 80 separadas para a OP 5131 (40 carrinhos; por isso a ordem fica fora da necessidade bruta), 80 em inspeção (PC 7702, recebido em 09/11, antes da rodada, liberação prevista na mesma semana), 40 bloqueadas por uma RNC e 260 livres. Disponível: 460 − 80 − 80 − 40 = **260**. O PC 7715, de 200 rodas, emitido em 06/11, chega em 23/11. O plano, além da OP 5131, é de 60, 80, 60, 100, 80 e 40 carrinhos nas semanas de 09/11 a 14/12, mais 20 rodas de reposição na semana de 23/11: necessidade bruta de 120, 160, 140, 200, 160 e 80 rodas, 860 no total.

![Ilustração de uma folha quadriculada de caderno com o registro de MRP da roda fixa RF-125, da empresa fictícia Indústria Exemplo Ltda., na rodada de 09/11/2026, com anotações feitas à mão. No alto, os parâmetros: lead time de 10 dias úteis, estoque de segurança de 60, lote mínimo de 100 e múltiplo de 50. Ao lado, o saldo de partida: 460 físicas, menos 80 reservadas para a OP 5131, 80 em inspeção e 40 bloqueadas por RNC, igual a 260 disponíveis. A grade tem seis semanas, de 09/11 a 14/12. Necessidade bruta: 120, 160, 140, 200, 160 e 80. Recebimentos programados: 80 do PC 7702 na semana de 09/11 e 200 do PC 7715 na de 23/11. Estoque projetado: 220, 60, 120, 70, 60 e 80. Necessidade líquida: 140 na semana de 30/11, 150 na de 07/12 e 80 na de 14/12. Pedidos planejados, com recebimento: 150, 150 e 100. Liberação: 13/11, 23/11 e 30/11. Anotações à mão: 140 arredondado para 150 pelo múltiplo; 80 sobe para 100 pelo mínimo; a liberação do primeiro pedido cai em 13/11, e não em 16/11, por causa do feriado de 20/11. Exemplo fictício.](./torno-mrp-registro-caderno.svg)

*Exemplo fictício: empresa, item, saldos, pedidos, plano e parâmetros inventados; cada coluna é uma semana e cada linha é uma parte da conta, do que vai sair ao que precisa ser pedido. Ilustração original Torno, 2026.*

Estoque projetado no fim de cada semana:

- **Semana de 09/11:** 260 + 80 (PC 7702 liberado da inspeção) − 120 = 220.
- **Semana de 16/11:** 220 − 160 = 60, exatamente o estoque de segurança; não há necessidade líquida.
- **Semana de 23/11:** 60 + 200 (PC 7715) − 140 = 120.
- **Semana de 30/11:** 120 − 200 = −80. Para voltar a 60, faltam 140 (necessidade líquida); o múltiplo de 50 arredonda para **150**, e o projetado fica em 70.
- **Semana de 07/12:** 70 − 160 = −90; faltam 150, que já é múltiplo e passa do mínimo: **150**, projetado 60.
- **Semana de 14/12:** 60 − 80 = −20; faltam 80, abaixo do mínimo, que sobe para **100**; projetado 80.

Conferência: 260 + 80 + 200 + 150 + 150 + 100 − 860 = 80. Liberação é a necessidade menos 10 dias úteis: 13/11 para a semana de 30/11 (sem o feriado, seria 16/11), 23/11 para a de 07/12 e 30/11 para a de 14/12. Em 13/11, o comprador converteu o primeiro pedido planejado no PC 7731: 150 rodas, R$ 4.350,00, chegada em 30/11.

**Rodada de 16/11/2026.** O PC 7702 foi liberado em 11/11, a OP 5140 consumiu 120 rodas, e as 40 bloqueadas seguem à espera da RNC. Disponível: 260 + 80 − 120 = **220**. Em 12/11, o comercial antecipou 70 carrinhos da semana de 30/11 para a de 23/11 (de 60 para 130, e de 100 para 30), e o horizonte passou a incluir 60 carrinhos na semana de 21/12. Necessidade bruta de 16/11 a 21/12: 160, 280, 60, 160, 80 e 120 rodas, 860 no total.

Sem mudar os pedidos firmes, a semana de 23/11 fecha em 60 + 200 − 280 = **−20**: falta material, e o PC 7731 só chega em 30/11. A sugestão certa não é um pedido novo, cuja liberação teria vencido em 06/11, mas a mensagem **antecipar o PC 7731 de 30/11 para 23/11**, avisando que o prazo padrão não comporta e a data precisa ser negociada. Com a antecipação, a semana de 23/11 fecha em 60 + 200 + 150 − 280 = 130, e a de 30/11, em 70. Os pedidos planejados seguintes são recalculados sem mensagem, porque não são firmes: 150 na semana de 07/12 (70 − 160 = −90), 100 na de 14/12 (60 − 80 = −20; faltam 80, mínimo 100) e 100 na de 21/12 (80 − 120 = −40), com liberação em 23/11, 30/11 e 07/12. Conferência: 220 + 200 + 150 + 150 + 100 + 100 − 860 = 60.

![Ilustração de um gráfico em serrote do estoque projetado da roda fixa RF-125, da empresa fictícia Indústria Exemplo Ltda., na rodada de 16/11/2026, semanas de 16/11 a 21/12. Cada semana começa com um salto para cima quando chega material e desce com o consumo. Uma linha tracejada marca o estoque de segurança de 60. Linha contínua, com o PC 7731 antecipado para 23/11: começa em 220 e termina a semana de 16/11 em 60; a de 23/11 sobe para 410 e termina em 130; a de 30/11 termina em 70; a de 07/12 sobe para 220 e termina em 60; a de 14/12 sobe para 160 e termina em 80; a de 21/12 sobe para 180 e termina em 60. Linha vermelha, sem antecipar: a semana de 23/11 sobe só para 260 e termina em menos 20, abaixo de zero, o que é falta de material; na semana de 30/11 o PC 7731 chega, a linha sobe para 130 e volta a terminar em 70. Ao lado, um bilhete com a mensagem: antecipar PC 7731, 150 rodas, de 30/11 para 23/11; emitido em 13/11, 10 dias úteis com o feriado de 20/11; o prazo padrão exigiria emissão em 06/11, então é preciso negociar; quem trata é o comprador. Exemplo fictício.](./torno-mrp-serrote-estoque-projetado.svg)

*Exemplo fictício: rodada, plano, pedidos e datas inventados; o serrote mostra que antecipar um pedido que já existe resolve a falta de uma semana sem criar compra nova. Ilustração original Torno, 2026.*

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com itens, saldos, pedidos e ordens fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Disponível da RF-125 na rodada de 09/11 | 260 (460 físicas − 80 reservadas − 80 em inspeção − 40 bloqueadas) | Registro de MRP com a composição do saldo |
| Erro de contar as 40 bloqueadas e as 80 reservadas como disponíveis | O sistema não faz isso; se fizesse, partiria de 380, e a necessidade líquida da semana de 30/11 cairia de 140 para 20, com pedido de 100 em vez de 150 | Registro de MRP e parâmetro dos depósitos |
| OP 5131 com 80 rodas já reservadas | Não entra na necessidade bruta nem no disponível; a reserva não é contada duas vezes | Registro de MRP e reserva da ordem |
| 80 rodas do PC 7702 em inspeção | Entram como recebimento na semana de 09/11, não como disponível | Registro de MRP |
| Necessidade bruta da semana de 23/11 | 140: 120 da explosão e 20 de reposição | Registro de MRP com a origem |
| Necessidade líquida de 140 na semana de 30/11 | Pedido planejado de 150, pelo múltiplo de 50 | Pedido planejado |
| Necessidade líquida de 80 na semana de 14/12 | Pedido planejado de 100, pelo mínimo | Pedido planejado |
| Liberação do pedido da semana de 30/11 | 13/11, contando 10 dias úteis com o feriado de 20/11; não 16/11 | Pedido planejado com a data de liberação |
| Calendário sem o feriado de 20/11 | Teste de controle: a liberação sai em 16/11 e o material chegaria em 01/12, um dia útil depois da necessidade | Comparação dos dois calendários |
| Conversão do pedido planejado em PC 7731 pelo comprador | Aceita: R$ 4.350,00, dentro da alçada de R$ 5.000,00; o registro guarda sugestão, pedido, quem e quando | Pedido de compra e trilha |
| Conversão de um pedido de 200 rodas (R$ 5.800,00) pelo comprador | Fica pendente de aprovação do gerente de suprimentos | Pedido em aprovação |
| PC 7731 firme na rodada de 16/11 | Não é alterado pela rodada; só recebe mensagem | Pedido de compra e lista de mensagens |
| Antecipação de 70 carrinhos para a semana de 23/11 | Mensagem: antecipar PC 7731 de 30/11 para 23/11, com aviso de prazo menor que o lead time; nenhum pedido planejado novo com liberação vencida | Lista de mensagens e registro de MRP |
| Pedidos planejados recalculados em 16/11 | 150, 100 e 100 nas semanas de 07/12, 14/12 e 21/12, sem mensagem | Registro de MRP |
| Data de chegada de um pedido firme muda 1 dia útil, dentro da mesma semana | Nenhuma mensagem, porque a diferença está dentro da margem de 2 dias úteis | Lista de mensagens |
| Pedido firme sem necessidade dentro do horizonte | Mensagem de cancelar para o comprador; o pedido não é cancelado automaticamente | Lista de mensagens e pedido |
| Estoque projetado de 40 com segurança de 60 | Aparece como abaixo da segurança, separado de falta (projetado negativo) | Tela ou relatório de exceções |
| Rodada completa e rodada só dos itens alterados | Mesmo resultado para a RF-125 | Comparação dos dois registros |
| Usuário de compras tenta mudar o lead time da RF-125 | Bloqueado sem a permissão de parâmetros; com ela, registrado com valor anterior e novo | Tentativa recusada e histórico |

*Fim do exemplo fictício. Empresa, item, saldos, pedidos, ordens, plano, parâmetros, preços, alçadas, datas e regras são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma nem comportamento padrão de ferramenta.*

Os parâmetros por item costumam vir de uma planilha na carga inicial ([importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/)). Rode o cálculo do sistema e o da planilha antiga para os mesmos dez itens e explique cada diferença; se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### MRP e sugestão de compra são a mesma coisa?

Não. A sugestão de compra é um dos resultados do MRP; ele também sugere ordens de produção e mensagens para pedidos existentes. A reposição por ponto de pedido, como as [regras de reposição do Odoo](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/warehouses_storage/replenishment/reordering_rules.html), também sugere compra, mas dispara quando o saldo previsto do item fica abaixo de um mínimo, sem explodir a estrutura a partir de um plano.

### O MRP considera a capacidade da fábrica?

No modelo clássico, não: ele supõe que a fábrica produz o que o plano pede. Capacidade e sequenciamento são outra camada, assim como a eficiência de máquina, tratada em [OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/). Se a capacidade é o gargalo, o plano que entra no MRP precisa já estar ajustado a ela.

### Posso deixar o sistema emitir pedidos de compra sozinho?

Pode, para itens escolhidos (baratos, de fornecedor estável e com contrato) e depois de um período em que as sugestões foram conferidas e quase não precisaram de ajuste. Comece com conversão manual por alçada, meça quantas sugestões o comprador muda e por quê, e só então automatize.

Para transformar o cálculo de necessidades em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a planilha de necessidades usada hoje, os parâmetros de três itens (lead time, lote e segurança) e a última compra urgente que precisou ser feita, sem dados confidenciais de clientes.

*Fontes consultadas em 16 de novembro de 2026: SAP Help Portal, cálculo de necessidade líquida, procedimento de MRP, cálculo de lote, procedimentos estáticos de lote e lote fixo; Microsoft Learn, mensagens de ação, pedidos planejados firmes, vínculo do estoque de segurança, cerca de cobertura, calendários, margens de segurança e configurações padrão de pedido (Dynamics 365 Supply Chain Management) e parâmetros de planejamento (Dynamics 365 Business Central); Odoo, regras de reposição (18.0) e plano mestre de produção (ramo master); Senior Sistemas, manual do Senior X, MRP; Agência Senado, feriado de 20 de novembro; Texas A&M University Libraries, registro de catálogo do livro de Orlicky. Empresa, item, números e ilustrações são fictícios.*
