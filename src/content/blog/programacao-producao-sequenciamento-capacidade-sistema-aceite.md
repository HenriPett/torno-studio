---
content_id: torno-artigo-pt-20261117-programacao-producao
intent_id: buyer-production-scheduling-finite-capacity-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Programação da produção no sistema: o que definir e testar antes de automatizar o sequenciamento'
h1: 'Programação da produção no sistema: o que definir e testar antes de automatizar o sequenciamento'
seo_title: 'Programação da produção no sistema: sequência e aceite | Torno'
seo_description: 'Capacidade finita, turnos, tempos padrão, setup por sequência, regra de prioridade, quebra de máquina e congelamento: o que definir e testar na programação.'
summary: 'Roteiro para a indústria que vai tirar a programação da produção do quadro ou da planilha e deixar o sistema montar a sequência das ordens: capacidade infinita e finita; calendário e turnos por recurso; roteiro e tempos padrão; setup dependente da sequência; regras de prioridade (ordem de chegada, menor tempo, data de entrega, agrupamento); gargalo; material disponível; reprogramação quando a máquina para ou falta material; congelamento do horizonte; quem libera a sequência para o chão de fábrica; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar a programação e o sequenciamento da produção no sistema, para que a sequência que chega ao chão de fábrica seja viável e alguém confie nela?
proposed_path: /blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
canonical_url: https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes de PCP e de produção, programadores de produção, supervisores de turno, manutenção, qualidade e TI de indústrias de médio e grande porte que vão contratar, especificar ou aceitar um sistema (módulo de ERP, sistema de manufatura, APS ou sistema sob medida) para programar e sequenciar ordens de produção, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar o quadro de programação ou a planilha do programador pela sequência calculada pelo sistema.
scope: Diferença entre planejar, programar e sequenciar; capacidade infinita e finita; calendário, turnos, pausas e paradas planejadas por recurso; roteiro, tempos padrão, eficiência e quantidade; setup dependente da sequência e matriz de setup; regras de prioridade (ordem de chegada, menor tempo de processamento, data de entrega, agrupamento por família) e regra combinada; gargalo; disponibilidade de material como restrição; reprogramação por quebra de máquina, falta de material e pedido urgente; congelamento do horizonte; publicação e liberação da sequência para o chão de fábrica, mudança fora da sequência e registro; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ERP, MES, APS ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem); algoritmos de otimização, pesquisa operacional e prova de otimalidade; plano mestre, previsão de demanda e cálculo de necessidade de materiais (MRP, coberto em outro artigo); balanceamento de linha e dimensionamento de equipe; cálculo do OEE, plano de manutenção preventiva, coleta de dados de máquina e estrutura de produto (cobertos em outros artigos); promessa de ganho de produtividade ou de redução de setup.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-17T11:21:56Z'
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
    reason: Trata o cálculo de necessidade de materiais, que declarou capacidade, sequenciamento e APS fora de escopo; aqui a camada seguinte, que transforma ordens em sequência por máquina.
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura de produto, que deixou roteiro, tempos e capacidade fora de escopo; aqui o roteiro e os tempos padrão que a programação usa.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o indicador de eficiência do equipamento, inclusive como classificar setup e paradas; aqui o setup como tempo que a sequência gasta ou economiza.
  - path: https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/
    reason: Trata o plano de manutenção e a reprogramação da preventiva; aqui a janela de preventiva como capacidade bloqueada e a quebra como gatilho de reprogramação.
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata a coleta de dados da máquina para o ERP; aqui o início, o fim e a parada que a programação precisa receber para reprogramar.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas, horários e cortes em geral; aqui o horário de necessidade de cada ordem e o fim do calendário do recurso.
  - path: https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/
    reason: Trata conflitos de edição em geral; aqui dois programadores mexendo na mesma sequência.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui quem publica e quem libera a sequência.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a publicação e a mudança da sequência precisam registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode alterar a sequência, a matriz de setup e o calendário.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Trata a operação sem conexão; aqui o terminal do chão de fábrica que precisa mostrar a sequência liberada mesmo com a rede instável.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso específico do quadro e da planilha de programação.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com recursos, calendários e ordens fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as regras de programação em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A documentação do Dynamics 365 Supply Chain Management descreve a capacidade finita como abordagem que considera as limitações dos recursos; com capacidade insuficiente, a data de entrega é empurrada e o trabalho é programado quando houver capacidade; a capacidade finita só vale se ligada nos parâmetros gerais, no plano mestre e no recurso; a cerca de capacidade finita limita até onde ela é considerada (a página diz que um dia é provavelmente pouco para a maioria das indústrias); os recursos gargalo usam a mesma cerca; e a página orienta não usar capacidade finita quando a capacidade muda conforme a demanda, por exemplo com turnos.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/finite-capacity
    entity: 'Microsoft Learn, "Finite capacity planning and scheduling" (Dynamics 365 Supply Chain Management, Planning Optimization)'
    source_date: '2025-08-05'
    checked_at: '2026-11-17T11:02:00Z'
    limit: 'Documentação de produto; data do rodapé (os metadados trazem outras datas). Exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 descreve a programação de trabalhos (job scheduling) como forma mais detalhada que a programação de operações: divide cada operação em trabalhos, atribui recursos específicos, não deixa a capacidade programada passar da disponível quando a capacidade é finita, usa o calendário do recurso e calcula o tempo programado como tempo (execução mais setup) × 100 ÷ eficiência; os trabalhos seguem a ordem do roteiro.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/job-scheduling
    entity: 'Microsoft Learn, "Job scheduling" (Dynamics 365 Supply Chain Management)'
    source_date: '2025-09-19'
    checked_at: '2026-11-17T11:03:00Z'
    limit: 'Documentação de produto; a página não trata de regra de prioridade nem de setup dependente da sequência. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 descreve a programação de operações como estimativa geral, que não explode as operações em trabalhos nem escolhe o recurso específico dentro do grupo; com capacidade finita, a ordem pode ser atrasada ou parada por falta de recurso; com materiais finitos, a ordem só começa quando capacidade e materiais estão disponíveis ao mesmo tempo.'
    reference: https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/operations-scheduling
    entity: 'Microsoft Learn, "Operations scheduling" (Dynamics 365 Supply Chain Management)'
    source_date: '2025-07-11'
    checked_at: '2026-11-17T11:04:00Z'
    limit: 'Documentação de produto; data do rodapé. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Dynamics 365 define, no plano mestre, a cerca de congelamento (período em que pedidos planejados existentes não mudam e nenhum novo é sugerido), a cerca de firmeza (horizonte em que pedidos planejados viram ordens automaticamente) e a cerca de capacidade (até onde a capacidade máxima dos recursos é considerada).'
    reference: https://learn.microsoft.com/en-my/dynamics365/supply-chain/master-planning/master-plans
    entity: 'Microsoft Learn, "Master plans overview" (Dynamics 365 Supply Chain Management)'
    source_date: '2026-03-25'
    checked_at: '2026-11-17T11:15:00Z'
    limit: 'Documentação de produto, aberta na variante regional en-my (a en-us não foi aberta nesta sessão); cercas do planejamento mestre, não do sequenciamento no chão de fábrica. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Business Central diz que, por padrão, a programação usa capacidade infinita; que recursos gargalo podem passar a capacidade finita como recursos com capacidade restrita, sem carregá-los acima da carga crítica (por exemplo, 90%); que a duração é tempo de execução ÷ eficiência ÷ capacidade; que a disponibilidade vem do calendário da fábrica; e que o produto não faz controle detalhado do chão de fábrica nem mantém programação por prioridade ou regra de otimização.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-set-up-work-and-machine-centers
    entity: 'Microsoft Learn, "Set up work centers and machine centers" (Dynamics 365 Business Central)'
    source_date: '2026-07-15'
    checked_at: '2026-11-17T11:06:00Z'
    limit: 'Documentação de produto; exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A documentação do Odoo 18 descreve, no centro de trabalho, horário de funcionamento, eficiência de tempo, capacidade, tempo de preparação antes da ordem, tempo de limpeza depois dela, centros alternativos e meta de OEE, e uma visão de planejamento por centro de trabalho em Gantt em que horários e centros podem ser alterados.'
    reference: https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/using_work_centers.html
    entity: 'Odoo, documentação "Work centers" (18.0)'
    source_date: null
    checked_at: '2026-11-17T11:07:00Z'
    limit: 'Página sem data; não descreve setup que varie conforme a ordem anterior (isso não prova que o produto não tenha a função). Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve o cálculo do setup dependente da sequência: a base é a sequência das operações no recurso; com essa sequência e a matriz de setup, o sistema calcula as atividades e os tempos de setup; as operações recebem um grupo ou chave de setup; sem o indicador de atividade de setup, usa o tempo fixo do modo; no exemplo, a transição de V1 para V2 leva 10 minutos.'
    reference: https://help.sap.com/saphelp_snc70/helpdata/en/4e/fe2a36e048537ce10000000a421937/content.htm
    entity: 'SAP Help Portal, "Determining Setup Time for Sequence-Dependent Setup Activities" (SAP APO PP/DS, árvore de ajuda SNC 7.0)'
    source_date: null
    checked_at: '2026-11-17T11:09:00Z'
    limit: 'Versão antiga do produto, sem data visível; a página equivalente da versão 1610 está bloqueada para leitura automática. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A ajuda do SAP diz que, para o planejamento de lotes dependente da sequência, transições, custos e tempos de setup são definidos numa matriz de setup ligada ao recurso.'
    reference: https://help.sap.com/saphelp_SCM700_ehp01/helpdata/en/47/fca2fd9fc4384be10000000a42189b/content.htm
    entity: 'SAP Help Portal, "Sequence-Dependent Lot-Size Planning" (SAP SCM 7.0 EhP1)'
    source_date: null
    checked_at: '2026-11-17T11:10:00Z'
    limit: 'Versão antiga do produto, sem data visível; trata do otimizador de planejamento de rede (SNP), não da programação fina. Exemplo de modelagem.'
  - classification: FATO
    claim: 'O manual do Senior X descreve, na programação de produção, o sequenciamento de estágios, com campo de sequencial (ordem do estágio na programação) e recurso alterável.'
    reference: https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/Subsystems/index/gestao-industrial/gestao-pcp/programacao-producao.htm
    entity: 'Senior Sistemas, manual do usuário Senior X, "Programação de produção"'
    source_date: null
    checked_at: '2026-11-17T11:12:00Z'
    limit: 'Página sem data, que não trata de capacidade, prioridade nem Gantt. Vocabulário em português, não recomendação.'
  - classification: FATO
    claim: 'Notas de aula de teoria de escalonamento apresentam que, numa máquina, a regra do menor tempo de processamento (SPT) é ótima para a soma dos tempos de conclusão e a regra da data de entrega mais cedo (EDD) é ótima para o atraso máximo.'
    reference: https://www.or.uni-bonn.de/lectures/ss10/scheduling_data/sched10_2.pdf
    entity: 'Tim Nieberg, notas de aula de scheduling (o PDF só nomeia o autor; instituição inferida pelo domínio or.uni-bonn.de e semestre de verão de 2010 inferido pela pasta do arquivo)'
    source_date: null
    checked_at: '2026-11-17T11:13:00Z'
    limit: 'Material de aula, sem data nem instituição no documento (ambas inferidas da URL); os resultados valem para o modelo simples de uma máquina, sem setup dependente da sequência nem restrição de material.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo Ltda., a cabine de pintura CB-01, as ordens (OP 6101 a 6107), cores, quantidades, tempos padrão, matriz de setup, horários de necessidade, calendário, a quebra de 10/11, a liberação da tinta e as regras escolhidas no exemplo (regra combinada, congelamento, quem publica e quem libera) são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 18 minutos.*

**Antes de deixar o sistema montar a sequência da fábrica, escreva e aprove oito regras: quais recursos têm capacidade finita (começando pelo gargalo), o calendário e os turnos de cada um, de onde vêm os tempos de cada operação, quanto custa trocar de um produto para outro em cada máquina, que regra decide a ordem da fila, o que acontece quando a máquina para ou o material não chega, quanto do plano fica congelado e quem libera a sequência para o chão de fábrica.** Depois, teste com um dia fictício cuja sequência você já sabe montar à mão, minuto a minuto. Sem isso, o sistema publica um plano que não cabe no turno, o supervisor refaz a ordem no quadro e a programação do sistema vira relatório que ninguém segue.

**Este artigo não recomenda ERP, MES, APS nem fornecedor.** A documentação de alguns fornecedores aparece só para mostrar como os sistemas costumam modelar a programação. Empresa, máquina, ordens e números do exemplo são inventados.

## Por que a programação do quadro não vira programação no sistema

Em muitas fábricas, a programação da produção mora num quadro magnético, numa planilha ou na cabeça de uma pessoa. O programador sabe que a cabine de pintura perde uma hora de limpeza quando volta do preto para o branco, que a prensa nova rende mais que a antiga, que o segundo turno da solda só existe de segunda a quinta e que a ordem do cliente grande "fura a fila" mesmo que ninguém tenha escrito isso. O quadro funciona porque essa pessoa corrige cada impossibilidade antes de ela chegar à máquina.

O sistema não sabe nada disso. Se o cadastro diz que a máquina trabalha 24 horas, ele programa 24 horas. Se o setup é um número fixo por operação, ele não vê diferença entre pintar cinza depois de cinza e branco depois de preto. Se a regra de prioridade é a data de entrega pura, ele alterna cores sem dó e perde o turno em limpeza. O resultado é conhecido: sequência que não cabe no dia, ordens "no prazo" no sistema e atrasadas na expedição, operador que pula a ordem da tela porque a tinta não chegou, e o supervisor de volta ao quadro na segunda semana. A empresa passa a ter duas programações, nenhuma oficial.

### Literatura, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Literatura.** Regras de sequenciamento são estudadas há décadas em teoria de escalonamento. Notas de aula de Tim Nieberg, hospedadas no domínio or.uni-bonn.de (Universidade de Bonn), por exemplo, apresentam que, [numa máquina, a regra do menor tempo de processamento é ótima para a soma dos tempos de conclusão e a regra da data de entrega mais cedo, para o atraso máximo](https://www.or.uni-bonn.de/lectures/ss10/scheduling_data/sched10_2.pdf). Esses resultados valem para um modelo simples, sem setup que depende da sequência e sem falta de material, que é justamente o que a fábrica tem.
- **Documentação de fornecedores e convenção de mercado.** Capacidade finita e infinita, calendário de recurso, eficiência, matriz de setup, cercas de tempo e programação por operação ou por trabalho são convenção de mercado e aparecem na documentação de Microsoft Dynamics 365, SAP, Odoo e Senior, citada como exemplo de modelagem. Cada sistema implementa de um jeito; nenhum é regra.
- **Decisão da empresa.** Qual recurso é finito, quanto vale uma hora de limpeza contra uma hora de atraso, quem pode furar a fila, quanto do plano fica congelado. É essa camada que decide se a sequência presta, e ela precisa estar escrita antes de configurar ou programar.

## Planejar, programar e sequenciar: onde este artigo começa

Três palavras costumam se misturar:

- **Planejar** é decidir o que produzir e quando, em semanas ou dias: o plano mestre e o [MRP](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/), que transforma o plano em ordens de compra e de produção. No modelo clássico, o MRP supõe que a fábrica tem capacidade para tudo.
- **Programar** é dar a cada ordem, operação por operação, um recurso e um horário de início e de fim, respeitando a capacidade.
- **Sequenciar** é decidir a ordem das operações na fila de cada recurso. Em máquina com setup que depende do que veio antes, a sequência muda o tempo total.

Os sistemas que fazem programação e sequenciamento com capacidade finita, otimização e simulação de cenários costumam ser chamados de **APS** (do inglês *advanced planning and scheduling*). Pode ser um módulo do ERP, um produto separado integrado ao ERP ou uma parte de um sistema sob medida. Este artigo vale para os três: as definições e os testes são os mesmos.

Ele começa onde o MRP para: com as ordens de produção já criadas, liberadas pelo PCP, e a pergunta "em que máquina, em que ordem e a que horas?". O Dynamics 365, por exemplo, separa a [programação de operações](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/operations-scheduling), uma estimativa geral que reserva capacidade num grupo de recursos sem escolher a máquina, da [programação de trabalhos](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/job-scheduling), mais detalhada, que divide cada operação em trabalhos e atribui recursos específicos. Decida em que nível o seu sistema precisa chegar: semana por centro de trabalho ou minuto por máquina.

## Capacidade infinita ou finita

Na **capacidade infinita**, o sistema calcula as datas a partir do roteiro e dos tempos, como se cada recurso pudesse fazer tudo ao mesmo tempo. Duas ordens podem ocupar a mesma máquina no mesmo horário; o sistema mostra a carga acima de 100% e alguém resolve. Na **capacidade finita**, o sistema não carrega o recurso além do que ele tem: se não cabe, a ordem vai para o próximo horário livre, e a data de término muda.

A documentação do Dynamics 365 resume a diferença: com capacidade finita, se não há capacidade suficiente, [a data de entrega é empurrada e o trabalho é programado quando houver capacidade](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/finite-capacity). A mesma página mostra três detalhes que valem para qualquer sistema:

- **Onde a capacidade finita está ligada.** No Dynamics 365, ela precisa estar ligada nos parâmetros gerais, no plano mestre e em cada recurso; na nossa leitura da página, se faltar um dos três, a capacidade finita não se aplica àquele recurso. O teste precisa mostrar, recurso a recurso, qual é finito.
- **Até onde.** Uma cerca de tempo limita quantos dias à frente a capacidade finita é considerada; a página alerta que um dia é provavelmente pouco para a maioria das indústrias.
- **Quando a capacidade muda com a demanda.** A página orienta não usar a função de capacidade finita quando a capacidade pode mudar conforme a necessidade (o exemplo dado é o trabalho com turnos), porque os tempos de processamento calculados não ficariam corretos. Na leitura da Torno, se a fábrica abre um terceiro turno quando a carteira enche, essa decisão é do PCP, tomada antes da programação e lançada no calendário, não algo que o sistema descobre sozinho.

O Business Central vai pelo outro lado: [por padrão, programa com capacidade infinita](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-set-up-work-and-machine-centers) e permite marcar os recursos gargalo como de capacidade restrita, com uma carga crítica (por exemplo, 90%) que deixa folga. A mesma página avisa que o produto não faz controle detalhado do chão de fábrica nem mantém programação por prioridade ou otimização. Saber disso antes de contratar evita esperar de um módulo o que ele não promete.

A recomendação da Torno é começar com capacidade finita só nos recursos que limitam a fábrica e infinita nos demais, com um relatório de carga que mostre onde o infinito está passando de 100%.

## Calendário e turnos por recurso

A capacidade de um recurso é o calendário dele: dias, turnos, pausas, paradas planejadas. Defina por recurso, não por fábrica:

- **Turnos e dias.** A cabine trabalha dois turnos de segunda a sexta; a solda, dois de segunda a quinta e um na sexta; a expedição, um turno e sábado de manhã.
- **Pausas.** A refeição para a máquina ou é feita em revezamento? Se para, a operação que atravessa a refeição termina mais tarde.
- **Paradas planejadas.** A janela da [manutenção preventiva](https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/), a limpeza semanal e o inventário são capacidade bloqueada. Se o plano de manutenção mora em outro sistema, a janela precisa chegar ao calendário da programação.
- **Feriados e férias coletivas.** Os mesmos do calendário da fábrica, com os municipais.
- **Capacidade e eficiência.** Quantas peças ou ordens o recurso processa ao mesmo tempo e quanto ele rende em relação ao padrão. No Business Central, a [duração é o tempo de execução dividido pela eficiência e pela capacidade](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-set-up-work-and-machine-centers), e a disponibilidade vem do calendário da fábrica. No Odoo, o centro de trabalho tem [horário de funcionamento, eficiência de tempo e capacidade](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/using_work_centers.html).

O cuidado com o fim do expediente, o corte do dia e o horário de cada evento é o mesmo de qualquer prazo; está em [datas e fusos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/). Uma ordem que "termina às 22:10" num recurso que fecha às 22:00 termina, na verdade, no dia seguinte.

## Roteiro e tempos padrão

A programação é tão boa quanto o roteiro: a lista de operações de cada item, em que recurso, em que ordem, com que tempos. A [estrutura de produto](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/) diz o que entra; o roteiro diz por onde passa. Defina:

- **Tempos por operação.** Setup, tempo por peça, espera (secagem, cura, resfriamento) e movimentação até o próximo recurso. O Dynamics 365 calcula o [tempo programado como (execução + setup) × 100 ÷ eficiência](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/job-scheduling); escreva qual fórmula o seu sistema usa e teste com um caso em que a eficiência não é 100%.
- **De onde vem o tempo padrão.** Cronometragem, histórico de apontamentos ou ficha do fabricante. Tempo padrão desatualizado gera programação que estoura todo dia, e a culpa cai no sistema.
- **Recursos alternativos.** Se a máquina principal está ocupada ou parada, a operação pode ir para outra? Com que tempo? O Odoo tem [centros de trabalho alternativos](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/using_work_centers.html).
- **Sobreposição.** A próxima operação pode começar antes de a anterior terminar o lote inteiro? Com quantas peças?

Compare o tempo padrão com o tempo apontado. Se a diferença for grande e constante, corrija o cadastro antes do go-live; se for variável, a programação precisa de folga, e a folga precisa ser escrita, não escondida no tempo padrão.

## Setup dependente da sequência

Em muitas máquinas, o tempo de setup não é um número fixo: depende do que estava na máquina antes. Cabine de pintura (cor clara depois de escura exige limpeza completa), extrusora (troca de material), injetora (troca de molde e de cor), envasadora (alergênico antes de não alergênico), tecelagem (troca de fio). Nesses recursos, a sequência decide quanto do turno vira produção e quanto vira troca.

O jeito usual de modelar é uma **matriz de setup**: para cada par "do que estava" → "o que vem", o tempo (e às vezes o custo) da troca. A ajuda do SAP descreve que a [base do cálculo é a sequência das operações no recurso](https://help.sap.com/saphelp_snc70/helpdata/en/4e/fe2a36e048537ce10000000a421937/content.htm) e que, com essa sequência e a matriz de setup, o sistema calcula as atividades e os tempos de troca; sem o indicador de atividade de setup, usa um tempo fixo. Em outro módulo, a mesma ajuda define [transições, custos e tempos de setup numa matriz](https://help.sap.com/saphelp_SCM700_ehp01/helpdata/en/47/fca2fd9fc4384be10000000a42189b/content.htm) ligada ao recurso. Nem toda documentação mostra isso: no Odoo, o centro de trabalho tem [tempo de preparação e tempo de limpeza](https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/using_work_centers.html), e a página não descreve variação conforme a ordem que veio antes. Confirme na demonstração, com duas sequências, se o tempo de troca muda.

Defina:

- **Grupos de setup.** Em geral, não se monta a matriz produto a produto; agrupa-se por família, cor, molde ou material.
- **A matriz e o dono dela.** Quem mede, quem aprova, quando revisa. Uma matriz errada faz o sistema "economizar" setup que não existe.
- **Estado inicial.** O que estava no recurso no fim do turno anterior. Sem isso, a primeira troca do dia sai errada.
- **Como o setup aparece no apontamento.** Separado da produção e com o motivo, para alimentar o [OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/) e para conferir a matriz com o que de fato aconteceu.

## Regras de prioridade

A regra de prioridade decide quem vai primeiro quando há mais de uma ordem na fila. As mais comuns:

- **Ordem de chegada** (primeiro a entrar, primeiro a sair). Simples, justa e cega a prazo e a setup.
- **Menor tempo de processamento.** Termina mais ordens cedo e reduz a fila; deixa as ordens longas para o fim, mesmo as urgentes. Escreva também o desempate quando duas ordens têm o mesmo tempo, porque ele muda a sequência.
- **Data de entrega mais cedo.** Protege o prazo; ignora o setup e, em máquina com troca cara, pode gastar o turno em limpeza.
- **Agrupamento por família ou cor.** Economiza setup; ignora o prazo.
- **Regra combinada.** Uma regra principal e um desempate, ou uma regra principal com uma exceção escrita, por exemplo: "data de entrega, mas antes de trocar de cor, antecipe as ordens da mesma cor que não atrasam ninguém".

Com setup dependente da sequência, nenhuma regra simples garante o melhor resultado em todos os dias; o exemplo deste artigo mostra isso com números. Um APS com otimizador pode procurar sequências melhores que as de uma regra simples, mas a escolha precisa ser explicável: o programador tem de entender por que a ordem B foi antes da A, ou vai desfazer a sequência no primeiro dia.

Escreva a regra em português, com um exemplo, antes de escolher o parâmetro do sistema. E escreva também **o que não pode acontecer**: nenhuma ordem passa da data de necessidade se houver sequência que evite isso; nenhuma ordem de cliente classificado como crítico fica para o dia seguinte sem aviso.

## Gargalo: onde a capacidade finita precisa estar certa

Na convenção de mercado, o gargalo é o recurso que limita a produção da fábrica inteira: uma hora perdida nele é uma hora perdida no total. Por isso é nele que a capacidade finita, o calendário, a matriz de setup e a regra de prioridade precisam estar certos primeiro. O Business Central prevê exatamente isso: capacidade finita [para os recursos gargalo](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-set-up-work-and-machine-centers). No Dynamics 365 com Planning Optimization, os [recursos gargalo usam a mesma cerca de tempo](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/finite-capacity) que os demais.

Decida qual é o gargalo com dados (fila, carga, horas paradas por falta de peça a jusante) e escreva-o. O gargalo pode mudar com o mix de produtos; reveja a decisão quando o mix mudar.

## Material: a ordem só começa quando a peça e a tinta estão lá

A sequência perfeita não serve se o material não chegou. Defina se o sistema considera disponibilidade de material ao programar e com que dado: estoque disponível, recebimento previsto, liberação da qualidade. O Dynamics 365 descreve a opção de [materiais finitos](https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/operations-scheduling): quando capacidade e materiais são otimizados, a ordem só começa quando os dois estão disponíveis ao mesmo tempo. O MRP diz o que falta comprar; a programação precisa saber a hora em que o que foi comprado fica utilizável.

Escreva também o que pode ser feito antes de o material chegar (por exemplo, a limpeza da máquina) e como o tempo de espera aparece: espera por material não é ociosidade do recurso nem perda de eficiência do operador.

## Reprogramação: máquina parada, falta de material, pedido urgente

O plano de hoje vai quebrar. A pergunta é o que o sistema faz quando isso acontece:

- **Gatilho.** A parada chega por apontamento do operador, por sinal da máquina ([dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/)) ou pela ordem de manutenção corretiva? Com que atraso?
- **Escopo.** O sistema reprograma tudo ou só o que está fora do horizonte congelado? Reprograma sozinho ou propõe e espera alguém aceitar?
- **O que mostra.** Quais ordens passam a atrasar, quanto, e qual a alternativa. Reprogramação que só muda horários, sem dizer quem atrasou, deixa a montagem e o comercial sabendo pela expedição.
- **Pedido urgente.** Furar a fila custa: em máquina com setup dependente da sequência, a ordem urgente pode trazer duas trocas que não existiam. O sistema mostra esse custo antes de alguém aceitar.

## Congelamento do horizonte

Sem congelamento, cada rodada muda o plano, e o chão de fábrica deixa de segui-lo. Defina um horizonte curto à frente, em horas ou turnos, em que a sequência não muda sozinha: tipicamente a ordem em execução e a próxima, cujas peças já estão separadas, o molde já está pré-aquecido ou as peças já estão penduradas. Fora dele, o sistema pode resequenciar a cada evento.

No planejamento mestre do Dynamics 365, a ideia aparece como [cerca de congelamento](https://learn.microsoft.com/en-my/dynamics365/supply-chain/master-planning/master-plans): o período em que pedidos planejados existentes não mudam e nenhum novo é sugerido; a mesma página define a cerca de firmeza e a cerca de capacidade. No sequenciamento do chão de fábrica, o horizonte é mais curto, mas a regra é a mesma: escreva quanto tempo fica congelado, quem pode descongelar e com que registro.

## Quem libera a sequência para o chão de fábrica

O sistema calcula; alguém publica; o chão de fábrica executa. Defina:

- **Quem publica e quando.** O programador do PCP publica a sequência do dia seguinte até um horário fixo, ou a do turno antes de ele começar.
- **Quem libera.** O supervisor do turno confere (material, pessoas, ferramentas) e libera para o terminal da máquina. Publicar e liberar são estados diferentes, como num [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).
- **O que o operador vê.** Só a sequência liberada, na ordem. Se precisar pular uma ordem (ferramenta quebrada, peça faltando), o terminal pede o motivo e avisa o supervisor; a troca fica registrada na [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Se a rede do chão de fábrica cai, o terminal precisa continuar mostrando a última sequência liberada ([sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/)).
- **Quem pode mudar o quê.** Alterar a sequência, a matriz de setup, o calendário e os tempos padrão são [permissões](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) diferentes. Dois programadores mexendo no mesmo recurso ao mesmo tempo é um caso de [edição simultânea](https://tornostudio.com/blog/edicao-simultanea-sistema-conflitos/) que precisa de regra.

O manual do Senior X, por exemplo, tem na programação de produção a ação de [sequenciar estágios](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/Subsystems/index/gestao-industrial/gestao-pcp/programacao-producao.htm), com um campo de sequencial e o recurso alterável. Em qualquer sistema, a pergunta de aceite é a mesma: a sequência que o operador vê é a que alguém liberou?

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Quais recursos têm capacidade finita e qual é o gargalo | PCP, com a diretoria industrial |
| Calendário, turnos, pausas e paradas por recurso | Produção, com RH e manutenção |
| Roteiro, tempos padrão, eficiência e recursos alternativos | Engenharia de processos, com produção |
| Grupos e matriz de setup | Engenharia de processos, com produção e qualidade |
| Regra de prioridade e o que não pode acontecer | PCP, com comercial e diretoria |
| Restrição de material e o que pode ser feito antes de ele chegar | PCP, com almoxarifado e qualidade |
| Gatilho e escopo da reprogramação | PCP, com produção e manutenção |
| Horizonte congelado e quem pode descongelar | PCP e produção |
| Quem publica, quem libera e quem pode mudar a sequência | PCP e produção, com TI |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo Ltda., a mesma dos artigos sobre estrutura de produto e MRP, pinta a pó as plataformas PL-300 e as alças AL-30 do carrinho CP-300 numa cabine, a CB-01, que é o gargalo da linha. O exemplo acompanha a terça-feira, 10/11/2026.

Regras da empresa:

- **Calendário da CB-01.** Dois turnos, das 06:00 às 14:00 e das 14:00 às 22:00, de segunda a sexta, com refeição em revezamento: a cabine não para. São 960 minutos por dia. Sábado e domingo, sem turno.
- **Tempos padrão.** PL-300: 3 minutos por peça; AL-30: 1,5 minuto por peça, já com carga e descarga; eficiência de 100%.
- **Matriz de setup.** Cores da mais clara para a mais escura: branco, cinza, azul, preto. Mesma cor: 0 minuto. Para uma cor mais escura: 20 minutos. Para uma cor mais clara: 60 minutos de limpeza completa. A cabine terminou a segunda-feira em cinza.
- **Necessidade.** Cada ordem tem o horário em que a montagem precisa das peças pintadas.
- **Regra combinada.** Ordenar por horário de necessidade; antes de trocar de cor, antecipar as ordens da mesma cor que estão na fila, desde que nenhuma ordem passe do horário.
- **Congelamento.** A ordem em execução e a próxima (peças já penduradas no transportador) não mudam de lugar sem o supervisor do turno.
- **Publicação.** O programador publica a sequência até as 05:30; o supervisor do turno A libera para o terminal da cabine.

As ordens do dia:

| Ordem | Item | Cor | Peças | Tempo | Necessidade |
|---|---|---|---|---|---|
| OP 6101 | PL-300 | Cinza | 40 | 120 min | 10:00 |
| OP 6102 | AL-30 | Preto | 60 | 90 min | 16:00 |
| OP 6103 | PL-300 | Branco | 50 | 150 min | 15:00 |
| OP 6104 | AL-30 | Cinza | 40 | 60 min | 13:00 |
| OP 6105 | PL-300 | Azul | 40 | 120 min | 22:00 |
| OP 6106 | AL-30 | Branco | 60 | 90 min | 19:00 |
| OP 6107 | PL-300 | Preto | 40 | 120 min | 21:00 |

São 750 minutos de pintura em 960 de calendário: carga de 78,1%. **Com capacidade infinita, o dia parece folgado.** Programando cada ordem para trás a partir da necessidade, o sistema põe a OP 6104 das 12:00 às 13:00 e a OP 6103 das 12:30 às 15:00, que se sobrepõem; a OP 6103 e a OP 6102 (14:30 às 16:00) também; e a OP 6107 (19:00 às 21:00) e a OP 6105 (20:00 às 22:00), idem. Três sobreposições, nenhum setup e nenhum alerta, porque 78,1% está abaixo de 100%.

![Ilustração de um quadro magnético de programação visto de cima, da cabine de pintura CB-01 da empresa fictícia Indústria Exemplo Ltda., terça-feira 10/11/2026, com uma régua de horas das 06:00 às 22:00. Coluna da esquerda, capacidade infinita: os ímãs das sete ordens estão posicionados para terminar no horário de necessidade e se sobrepõem em três pontos, OP 6104 com OP 6103, OP 6103 com OP 6102 e OP 6107 com OP 6105; um bilhete diz carga de 78,1%, 750 de 960 minutos, sem setup. Coluna da direita, capacidade finita com a regra combinada: os ímãs ficam em fila, com calços cinza de setup entre eles: OP 6101 cinza das 06:00 às 08:00, OP 6104 cinza das 08:00 às 09:00, limpeza de 60 minutos, OP 6103 branco das 10:00 às 12:30, OP 6106 branco das 12:30 às 14:00, troca de 20 minutos, OP 6102 preto das 14:20 às 15:50, OP 6107 preto das 15:50 às 17:50, limpeza de 60 minutos, OP 6105 azul das 18:50 às 20:50, e 70 minutos livres até as 22:00. Um bilhete diz 890 de 960 minutos, 140 de setup, nenhuma ordem depois da necessidade. Exemplo fictício.](./torno-programacao-quadro-magnetico.svg)

*Exemplo fictício: empresa, cabine, ordens, cores e horários inventados; o mesmo dia no quadro, primeiro como a capacidade infinita enxerga, depois em fila, com as trocas de cor ocupando o tempo que elas ocupam. Ilustração original Torno, 2026.*

**Com capacidade finita e a matriz de setup, a regra muda o dia.** Cinco regras sobre as mesmas sete ordens. No menor tempo de processamento, as OPs 6102 e 6106 empatam em 90 minutos e as OPs 6101, 6105 e 6107, em 120; os empates são decididos pelo horário de necessidade (6102 antes de 6106; 6101, 6107, 6105). Com outro desempate, a sequência e os atrasos dessa linha mudam.

| Regra | Sequência (cores) | Setup | Ocupação | Término | Ordens depois da necessidade |
|---|---|---|---|---|---|
| Ordem de chegada (número da OP) | 6101, 6102, 6103, 6104, 6105, 6106, 6107 (C, P, B, C, A, B, P) | 200 min | 950 min | 21:50 | OP 6104 (+100 min), OP 6106 (+30), OP 6107 (+50) |
| Menor tempo de processamento (empate pela necessidade) | 6104, 6102, 6106, 6101, 6107, 6105, 6103 (C, P, B, C, P, A, B) | 240 min | 990 min | Passa das 22:00 | OP 6101 (+220 min); OP 6103 não cabe no dia |
| Data de necessidade | 6101, 6104, 6103, 6102, 6106, 6107, 6105 (C, C, B, P, B, P, A) | 220 min | 970 min | Passa das 22:00 | OP 6105 não cabe no dia (faltam 10 min) |
| Só por cor, da clara para a escura | 6103, 6106, 6101, 6104, 6105, 6102, 6107 (B, B, C, C, A, P, P) | 120 min | 870 min | 20:30 | OP 6101 (+200 min), OP 6104 (+80), OP 6102 (+150) |
| Combinada | 6101, 6104, 6103, 6106, 6102, 6107, 6105 (C, C, B, B, P, P, A) | 140 min | 890 min | 20:50 | Nenhuma |

A data de necessidade pura, a regra que protege o prazo, é a que não cabe: alterna branco e preto duas vezes e gasta 220 minutos em troca, quando a folga do dia é de 210 (960 − 750): a ocupação fica em 970 minutos, 10 além do dia. A regra só por cor economiza setup e atrasa três ordens. A combinada parte da data de necessidade e, quando a OP 6103 (branco) vai dar lugar à OP 6102 (preto), puxa a OP 6106 (branco) para antes, porque isso não atrasa ninguém: a OP 6102 termina às 15:50, dez minutos antes das 16:00.

Conferência da combinada: 06:00 + 120 = 08:00 (6101); + 60 = 09:00 (6104); + 60 de limpeza + 150 = 12:30 (6103); + 90 = 14:00 (6106); + 20 + 90 = 15:50 (6102); + 120 = 17:50 (6107); + 60 de limpeza + 120 = 20:50 (6105). Pintura 750 + setup 140 = 890 minutos; sobram 70.

Ela não é a melhor possível. Testando todas as 5.040 sequências, o menor setup sem nenhuma ordem depois da necessidade é de 120 minutos, por exemplo em 6101, 6104, 6102, 6103, 6106, 6105, 6107 (cinza, cinza, preto, branco, branco, azul, preto), terminando às 20:30. Um otimizador pode achar uma sequência assim; a regra combinada, não. A diferença, 20 minutos, é o preço de uma regra que o programador explica em uma frase. A empresa decide qual quer, e o teste de aceite confere a que foi escolhida.

![Ilustração de três trens vistos de lado, um por regra de sequência, na cabine de pintura CB-01 da empresa fictícia Indústria Exemplo Ltda., terça-feira 10/11/2026. Cada vagão é uma ordem, identificada pelos dois últimos dígitos do número, pintado na cor da tinta e com o comprimento proporcional ao tempo de pintura; entre os vagões, os engates têm o comprimento do setup: curto para 20 minutos, longo e listrado para 60 minutos de limpeza, sem engate quando a cor se repete. Uma linha vertical tracejada marca o fim do dia, às 22:00. Trem 1, data de necessidade: cinza, cinza, branco, preto, branco, preto, azul; 220 minutos de setup; o último vagão, OP 6105, passa 10 minutos da linha das 22:00. Trem 2, só por cor: branco, branco, cinza, cinza, azul, preto, preto; 120 minutos de setup; termina às 20:30, mas três vagões, OP 6101, OP 6104 e OP 6102, levam bandeira vermelha de atraso. Trem 3, regra combinada: cinza, cinza, branco, branco, preto, preto, azul; 140 minutos de setup; termina às 20:50, sem bandeira, com 70 minutos antes da linha. Exemplo fictício.](./torno-programacao-trem-setups.svg)

*Exemplo fictício: ordens, cores, tempos e matriz de setup inventados; os engates mostram que a sequência decide quanto do dia vira pintura e quanto vira troca de cor. Ilustração original Torno, 2026.*

**Às 10:30, a cabine para.** O exaustor falha com a OP 6103 em execução desde as 10:00 (30 minutos feitos, 120 restantes) e volta às 11:30. Pela regra de congelamento, a OP 6103 e a próxima, a OP 6106, cujas peças já estão penduradas, não mudam de lugar. A OP 6103 termina às 13:30 (dentro das 15:00) e a OP 6106 vai das 13:30 às 15:00. O sistema resequencia o restante (6102, 6107, 6105) e propõe: OP 6102 das 15:20 às 16:50, **50 minutos depois da necessidade**; OP 6107 das 16:50 às 18:50; limpeza; OP 6105 das 19:50 às 21:50. Das seis ordens possíveis para as três que restam, nenhuma deixa todas no horário.

O supervisor pergunta: e se a OP 6102 for antes da OP 6106? O sistema mostra o custo: OP 6102 das 13:50 às 15:20, no horário; OP 6107 das 15:20 às 17:20; limpeza de 60 minutos; OP 6106 das 18:20 às 19:50, **50 minutos depois** das 19:00; e a OP 6105 passa das 22:00. Furar o congelamento só troca quem atrasa e empurra uma ordem para o dia seguinte. O supervisor mantém a sequência congelada, e a montagem das alças é avisada de que as pretas chegam às 16:50.

**Outro dia, falta de material.** No plano original, a qualidade só libera o lote de tinta azul às 19:30. A limpeza depois da OP 6107 vai das 17:50 às 18:50 (pode ser feita sem a tinta), a cabine espera 40 minutos, e a OP 6105 vai das 19:30 às 21:30, dentro das 22:00.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com recursos, calendários e ordens fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Carga da CB-01 em 10/11 com capacidade infinita | 750 de 960 minutos (78,1%), com as sobreposições 6104 × 6103, 6103 × 6102 e 6107 × 6105 visíveis no relatório de carga | Relatório de carga por recurso |
| CB-01 marcada como capacidade finita | Nenhuma sobreposição de ordens no mesmo horário | Gantt do recurso |
| Tempo da OP 6103 (50 PL-300 a 3 min) | 150 minutos; se a quantidade mudar para 60, 180 minutos e o término é recalculado | Ordem e Gantt |
| Troca de preto para branco | 60 minutos de setup; branco depois de branco, 0; cinza depois de branco, 20 | Gantt com o setup separado da pintura |
| Primeira ordem do dia | Setup calculado a partir do cinza que ficou na cabine na segunda | Gantt e estado inicial do recurso |
| Sequência pela regra combinada | 6101, 6104, 6103, 6106, 6102, 6107, 6105; 140 min de setup; término 20:50; nenhuma ordem depois da necessidade | Sequência publicada |
| Mesmas ordens pela data de necessidade pura (teste de controle) | 220 min de setup; a OP 6105 não cabe até as 22:00 e o sistema avisa, em vez de programá-la depois do fim do turno | Gantt e lista de alertas |
| Mesmas ordens só por cor (teste de controle) | 120 min de setup e três ordens depois da necessidade (6101, 6104, 6102), sinalizadas | Gantt e lista de alertas |
| Ordem que não cabe no calendário | Vai para o próximo dia útil com turno; nada é programado no sábado 14/11 | Gantt da semana |
| Preventiva de 60 min às 06:00 de quarta 11/11 | A primeira ordem começa às 07:00; capacidade do dia de 900 minutos | Gantt e ordem de manutenção |
| Parada das 10:30 às 11:30 com a OP 6103 em execução | A OP 6103 termina às 13:30; a OP 6106 continua a próxima (congelada); o restante é resequenciado e a OP 6102 aparece 50 minutos atrasada | Proposta de reprogramação e lista de atrasos |
| Supervisor simula a OP 6102 antes da OP 6106 | O sistema mostra a OP 6106 50 minutos atrasada e a OP 6105 fora do dia, antes de aceitar | Simulação comparada |
| Programador tenta mover a OP 6106 congelada | Bloqueado; só o supervisor do turno descongela, com motivo registrado | Tentativa recusada e trilha |
| Tinta azul liberada às 19:30 | A OP 6105 começa às 19:30, não antes; os 40 minutos aparecem como espera por material | Gantt e motivo da espera |
| Sequência publicada às 05:20 e não liberada | O terminal da cabine continua mostrando a sequência liberada anterior, não a nova | Terminal e estado da sequência |
| Operador tenta iniciar a OP 6105 antes da OP 6102 | O terminal pede motivo e avisa o supervisor; a troca fica registrada | Apontamento e trilha |
| Dois programadores alteram a sequência da CB-01 ao mesmo tempo | O segundo a salvar é avisado do conflito; nenhuma alteração some sem aviso | Mensagem de conflito e histórico |
| Usuário sem permissão altera a matriz de setup | Bloqueado; com a permissão, registrado com valor anterior e novo | Tentativa recusada e histórico |

*Fim do exemplo fictício. Empresa, cabine, ordens, cores, quantidades, tempos, matriz de setup, calendário, horários, quebra e regras são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma nem comportamento padrão de ferramenta.*

Antes do go-live, programe a mesma semana real duas vezes, no quadro e no sistema, e explique cada diferença. Se a dúvida ainda é se vale sair do quadro ou da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Preciso de um APS ou o ERP resolve?

Depende do que o ERP faz com capacidade e setup. Se a fábrica tem um gargalo claro, setup que depende da sequência e muitas ordens por dia, confira se o módulo programa com capacidade finita naquele recurso, se tem matriz de setup e se mostra os atrasos ao reprogramar. O Business Central, por exemplo, documenta que [não mantém programação detalhada por prioridade ou otimização](https://learn.microsoft.com/en-us/dynamics365/business-central/production-how-to-set-up-work-and-machine-centers). Os critérios de aceite deste artigo servem para testar qualquer opção, inclusive uma planilha bem feita.

### Por que não usar sempre a data de entrega como prioridade?

Porque, em máquina com setup que depende da sequência, ela pode gastar o dia em trocas. No exemplo, a data de necessidade pura precisou de 220 minutos de setup e não coube no dia; a regra combinada precisou de 140 e cumpriu todas as necessidades. A data de entrega continua sendo a referência; a regra só precisa saber o que a troca custa.

### O operador pode mudar a sequência?

Pode, se a regra permitir e o sistema registrar. O operador vê coisas que o sistema não vê (ferramenta quebrada, peça faltando, máquina com problema). O que não pode é a sequência executada divergir da liberada sem motivo e sem aviso: sem esse registro, ninguém descobre se o problema está na regra, nos tempos ou na fábrica.

Para transformar a programação da produção em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a foto do quadro de programação (ou a planilha) de um dia comum, o calendário do gargalo e a última vez que a sequência precisou ser refeita no meio do turno, sem dados confidenciais de clientes.

*Fontes consultadas em 17 de novembro de 2026: Microsoft Learn, capacidade finita (Planning Optimization), programação de trabalhos, programação de operações e visão geral dos planos mestres (Dynamics 365 Supply Chain Management) e configuração de centros de trabalho e de máquina (Dynamics 365 Business Central); Odoo, centros de trabalho (18.0); SAP Help Portal, tempo de setup dependente da sequência (APO PP/DS) e planejamento de lotes dependente da sequência (SCM 7.0); Senior Sistemas, manual do Senior X, programação de produção; notas de aula de scheduling de Tim Nieberg (domínio da Universidade de Bonn). Empresa, ordens, números e ilustrações são fictícios.*
