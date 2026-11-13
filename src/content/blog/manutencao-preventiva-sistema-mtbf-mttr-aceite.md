---
content_id: torno-artigo-pt-20261113-manutencao-preventiva-sistema
intent_id: buyer-preventive-maintenance-plan-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Sistema de manutenção preventiva: o que definir e testar antes de automatizar o plano, o MTBF e o MTTR'
h1: 'Sistema de manutenção preventiva: o que definir e testar antes de automatizar o plano, o MTBF e o MTTR'
seo_title: 'Sistema de manutenção preventiva: definições e aceite | Torno'
seo_description: 'Calendário ou horímetro, janela, reprogramação, tipos de ordem, backlog, apontamento e MTBF e MTTR: o que definir e testar antes de automatizar a preventiva.'
summary: 'Roteiro para a indústria que vai levar o plano de manutenção preventiva da planilha para um sistema: gatilho por calendário, por horímetro ou contador, ou o que vier primeiro, e o que fazer quando o dado de uso falha; janela de tolerância e reprogramação (a próxima conta da data planejada ou da execução); tipos de ordem de serviço de manutenção (preventiva, inspeção e preditiva, corretiva e corretiva programada); backlog, atraso e cumprimento do plano; apontamento do técnico (início e fim, espera, peças, sintoma, causa e ação, registros da NR-12); definições de MTBF e MTTR conforme a terminologia da IEC, o que conta como falha e o que entra no tempo de reparo; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício calculado sob duas regras.'
primary_question: O que a indústria precisa definir e testar antes de automatizar o plano de manutenção preventiva e o cálculo de MTBF e MTTR num sistema?
proposed_path: /blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/
canonical_url: https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Diretores industriais e de operações, gerentes e coordenadores de manutenção, PCP, engenharia de confiabilidade, segurança do trabalho e TI de indústrias de médio e grande porte que vão contratar, especificar ou aceitar um sistema de manutenção (CMMS, módulo de ERP ou sistema sob medida), e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de migrar o plano de manutenção da planilha para o sistema ou de usar MTBF e MTTR em metas e decisões.
scope: Gatilho da preventiva por calendário, por horímetro ou contador e combinado; leitura de uso parada, zerada ou errada; janela de tolerância; reprogramação a partir da data planejada ou da execução; feriados e máquina parada; tipos de ordem (preventiva, inspeção, preditiva, corretiva, corretiva programada a partir de inspeção); backlog, atraso e cumprimento do plano; apontamento do técnico (início, fim, pausas, espera de peça, peças, sintoma, causa e ação, máquina parada e liberada); periodicidade do fabricante e registros de manutenção exigidos pela NR-12 citados pelo texto oficial; definições de falha, MTBF, MTTR, tempo até restabelecimento e tempo de reparo pela terminologia pública da IEC 60050-192; duas regras de cálculo sobre o mesmo mês fictício; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de CMMS, ERP, sensor ou fornecedor (a documentação de dois fornecedores aparece só como exemplo de como os sistemas modelam reprogramação); montagem do plano técnico de cada máquina (intervalos, tarefas, peças), análise de confiabilidade (RCM, Weibull, FMEA) ou cálculo estatístico de intervalo ótimo; parecer jurídico ou garantia de conformidade com NR-12, NR-13 ou outras normas; projeto de coleta de dados de máquina (coberto em outro artigo); cálculo do OEE (coberto em outro artigo); SLA de atendimento de chamados (coberto em outro artigo); conteúdo genérico de datas, trilha de auditoria, permissões, estoque e operação sem internet (cobertos em outros artigos); metas de MTBF ou MTTR por setor; interpretação de normas pagas cujo texto não foi lido.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-13T21:10:00Z'
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
    reason: Trata o cálculo do OEE, onde a preventiva entra só como parada planejada ou perda; aqui o plano de preventiva, as ordens e o MTBF e MTTR.
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata como obter e interpretar o dado da máquina; aqui o horímetro e o contador já chegam e o assunto é o gatilho do plano e o que fazer quando a leitura falha.
  - path: https://tornostudio.com/blog/sla-horas-uteis-sistema-chamados-aceite/
    reason: Trata o prazo de atendimento de chamados em horas úteis; aqui o tempo até a máquina voltar a funcionar, que não pausa fora do expediente.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas, instantes e cortes de período; aqui a conta da próxima data e a falha que atravessa a meia-noite.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Detalha o tratamento da mesma leitura recebida duas vezes; aqui o caso do horímetro.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Detalha gravação local e sincronização; aqui o apontamento do técnico feito sem rede na área de máquinas.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata contagem e ajuste de estoque; aqui a peça só aparece como baixa vinculada à ordem.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria em geral; aqui o que a mudança de data de uma preventiva precisa registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode adiar uma preventiva e reclassificar uma ordem.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas e o tratamento de linhas com erro; aqui a carga do plano de preventiva que hoje vive em planilha.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com máquinas, leituras e ordens fictícias.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar o plano de preventiva e os indicadores de manutenção em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'No vocabulário eletrotécnico internacional da IEC (IEC 60050-192, Electropedia), falha (192-03-01) é a perda da capacidade de funcionar como requerido; MTBF, ou MOTBF (192-05-13), é a expectativa da duração do tempo de operação entre falhas e só deve ser aplicado a itens reparáveis; tempo de operação entre falhas (192-05-04) é o tempo de operação acumulado entre falhas consecutivas; tempo entre falhas (192-05-03) é a duração entre falhas consecutivas e inclui o tempo em funcionamento e o tempo fora de funcionamento.'
    reference: https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/740959858e232590c1257d9700618055
    entity: 'IEC, Electropedia (IEC 60050-192): verbetes 192-05-13 (URL de referência), 192-03-01 em https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-03-01, 192-05-04 em https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/ac7bb539dce39801c1257d9700617f3a e 192-05-03 em https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/199959db277866bcc1257d9700617f29'
    source_date: '2015-02'
    checked_at: '2026-11-13T20:40:00Z'
    limit: 'Lidos os verbetes em inglês no Electropedia; o texto integral da IEC 60050-192 e suas figuras não foram lidos. A página do verbete 192-03-01 não mostra o número no corpo; o número vem do endereço da página. Termos em português são tradução nossa.'
  - classification: FATO
    claim: 'Na IEC 60050-192, MTTR (192-07-23) é o tempo médio até o restabelecimento (mean time to restoration), e "mean time to repair" e "mean time to recovery" aparecem como sinônimos desaconselhados; tempo até o restabelecimento (192-07-06) vai do instante da falha até o restabelecimento e, se o instante da falha for indeterminado, começa na detecção; tempo de reparo (192-07-19) é a parte do tempo de manutenção corretiva ativa usada para concluir o reparo, compreende localização, diagnóstico, correção e verificação de funcionamento e exclui atrasos técnicos, administrativos e logísticos; atraso logístico (192-07-13) é o atraso, excluído o administrativo, para prover recursos necessários à manutenção.'
    reference: https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/a49e5fb265093635c1257d97006183bf
    entity: 'IEC, Electropedia (IEC 60050-192): verbetes 192-07-23 (URL de referência), 192-07-06 em https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-06, 192-07-19 em https://www.electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-19 e 192-07-13 em https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-13'
    source_date: '2015-02'
    checked_at: '2026-11-13T20:45:00Z'
    limit: 'Lidos os verbetes em inglês; as figuras de tempos da norma não foram lidas. Termos em português são tradução nossa.'
  - classification: FATO
    claim: 'Na IEC 60050-192, manutenção preventiva (192-06-05) é a manutenção feita para mitigar a degradação e reduzir a probabilidade de falha, com remissão à manutenção baseada na condição e à manutenção programada; manutenção baseada na condição (192-06-07) é a manutenção preventiva baseada na avaliação da condição física, que pode ser feita por observação do operador, conforme uma programação, ou por monitoramento de condição de parâmetros do sistema.'
    reference: https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-06-05
    entity: 'IEC, Electropedia (IEC 60050-192): verbetes 192-06-05 e 192-06-07 em https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-06-07'
    source_date: '2015-02'
    checked_at: '2026-11-13T20:50:00Z'
    limit: Lidos os verbetes em inglês; tradução nossa.
  - classification: FATO
    claim: 'A ISO 14224:2016 (Petroleum, petrochemical and natural gas industries — Collection and exchange of reliability and maintenance data for equipment), 3ª edição, publicada em setembro de 2016 e confirmada em 2022, dá base para coletar dados de confiabilidade e manutenção num formato padronizado durante a vida do equipamento, define vocabulário comum para relatar a experiência de operação e trata os modos de falha normativos como um tesauro de confiabilidade.'
    reference: https://www.iso.org/standard/64076.html
    entity: ISO, página da norma ISO 14224:2016
    source_date: '2016-09'
    checked_at: '2026-11-13T20:30:00Z'
    limit: 'Norma setorial de petróleo, petroquímica e gás natural; texto pago, não lido. Citada só como referência de estrutura de registro, não como obrigação para outros setores.'
  - classification: FATO
    claim: 'A EN 13306:2017 (Maintenance — Maintenance terminology) especifica termos e definições genéricos para as áreas técnica, administrativa e gerencial da manutenção e não se destina a termos usados apenas na manutenção de software.'
    reference: https://www.evs.ee/en/evs-en-13306-2017
    entity: Organismo de normalização da Estônia (EVS), página da EVS-EN 13306:2017
    source_date: '2017-12-18'
    checked_at: '2026-11-13T21:00:00Z'
    limit: Texto pago, não lido; só o escopo publicado na página.
  - classification: FATO
    claim: 'A ABNT NBR 5462 (Confiabilidade e mantenabilidade, 11/1994, 37 páginas) define os termos relacionados com confiabilidade e mantenabilidade; a página de catálogo consultada mostra ao mesmo tempo a situação "Vigente", confirmações em 2012, 2016, 2020 e 2025 e um aviso de que a edição de 11/1994 foi cancelada.'
    reference: https://www.target.com.br/produtos/normas-tecnicas/29220/nbr5462-confiabilidade-e-mantenabilidade
    entity: Target, catálogo de normas (página da ABNT NBR 5462); mesma informação em https://normas.com.br/visualizar/abnt-nbr-nm/8044/abnt-nbr5462-confiabilidade-e-mantenabilidade
    source_date: '1994-11'
    checked_at: '2026-11-13T20:58:00Z'
    limit: 'Situação ambígua no catálogo; texto pago, não lido. Nenhum termo é atribuído à NBR 5462.'
  - classification: FATO
    claim: 'A NR-12 (texto atualizado publicado pelo Ministério do Trabalho e Emprego, com alteração pela Portaria MTP n.º 4.219/2022) determina, no item 12.11.1, que máquinas e equipamentos sejam submetidos a manutenções na forma e periodicidade determinadas pelo fabricante; no item 12.11.2, que as manutenções sejam registradas em livro próprio, ficha ou sistema informatizado interno da empresa, com intervenções realizadas, data de cada intervenção, serviço realizado, peças reparadas ou substituídas, condições de segurança do equipamento, indicação conclusiva quanto às condições de segurança da máquina e nome do responsável pela execução; no item 12.11.2.1, que o registro fique disponível aos trabalhadores envolvidos na operação, manutenção e reparos, à CIPA, ao SESMT e à Auditoria Fiscal do Trabalho; e, no item 12.11.2.2, que as manutenções de itens que influenciem na segurança tenham cronograma de execução, quando preventivas, e descrição das técnicas de análise e meios de supervisão, quando preditiva.'
    reference: https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR12atualizada2023.pdf
    entity: Ministério do Trabalho e Emprego, NR-12 — Segurança no trabalho em máquinas e equipamentos (texto atualizado)
    source_date: '2022-12-22'
    checked_at: '2026-11-13T20:55:00Z'
    limit: 'Lidos os itens 12.11.1 a 12.11.5; não é parecer jurídico nem avaliação de conformidade. Os demais itens e anexos da NR-12 e a NR-13 não foram lidos para este artigo.'
  - classification: FATO
    claim: 'A documentação do IBM Maximo 7.6.2 descreve preventivas baseadas em tempo decorrido desde o trabalho anterior, em uso medido do ativo ou na combinação dos dois, e dois modos de programação: fixo, em que o próximo trabalho se planeja a partir da data de início prevista do trabalho anterior, e flutuante, em que se planeja a partir do encerramento do trabalho anterior.'
    reference: https://www.ibm.com/docs/SSLL8M_7.6.2/com.ibm.nuc.doc/pluspm/c_pm_frequency_schedules.html
    entity: IBM, documentação "PM frequency schedules" (Maximo 7.6.2)
    source_date: null
    checked_at: '2026-11-13T20:35:00Z'
    limit: 'Documentação de produto, sem data na página; citada como exemplo de modelagem, não como recomendação nem como comportamento padrão de outros sistemas.'
  - classification: FATO
    claim: 'A ajuda do SAP ERP descreve fatores de deslocamento para conclusão antecipada e atrasada, definidos em percentual no plano de manutenção, aplicados quando a diferença entre data planejada e data real sai da faixa de tolerância; no exemplo da página, uma ordem planejada para 01.08.2005 e confirmada 15 dias depois tem a próxima data em 01.09.2005 com fator 0%, 08.09.2005 com 50% e 16.09.2005 com 100%.'
    reference: https://help.sap.com/saphelp_erp60_sp/helpdata/en/18/a8ce5314894208e10000000a174cb4/content.htm
    entity: SAP, SAP Help Portal (Maintenance Planning, fatores de deslocamento)
    source_date: null
    checked_at: '2026-11-13T20:38:00Z'
    limit: 'Página de ajuda de versão antiga do ERP, sem data visível; citada como exemplo de modelagem, não como recomendação.'
  - classification: FATO
    claim: 'A Lei nº 14.759, de 21 de dezembro de 2023, declara feriado nacional o dia 20 de novembro, para a celebração do Dia Nacional de Zumbi e da Consciência Negra (art. 1º).'
    reference: https://www2.camara.leg.br/legin/fed/lei/2023/lei-14759-21-dezembro-2023-795091-publicacaooriginal-170522-pl.html
    entity: Câmara dos Deputados, Legislação Informatizada, Lei nº 14.759/2023, publicação original
    source_date: '2023-12-21'
    checked_at: '2026-11-13T21:32:00Z'
    limit: 'Lido o art. 1º. Usado só para contar os dias úteis de novembro de 2026 no exemplo; feriados estaduais e municipais não são tratados.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo Ltda., a injetora IJ-04, o plano de 500 horas ou 90 dias, a janela de 50 horas, as datas e leituras do horímetro, as três falhas, a ordem da lâmpada, os tempos de espera, reparo e encerramento, o backlog e o cumprimento do plano são modelo editorial fictício; as regras escolhidas no exemplo (falha como perda de função com máquina parada, MTBF sobre horas de operação, MTTR como tempo até restabelecer, reparo ativo mostrado à parte, janela de 50 horas, reprogramação por tipo de plano) são proposta de modelagem e recomendação da Torno, não definição normativa nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 13 minutos.*

**Antes de levar o plano de manutenção preventiva para o sistema, escreva e aprove seis regras: o que dispara cada preventiva (calendário, horímetro, contador ou o que vier primeiro), qual é a janela de tolerância, de onde se conta a próxima data depois de uma execução atrasada, que tipos de ordem existem, o que o técnico aponta e como MTBF e MTTR são calculados, inclusive o que conta como falha e o que entra no tempo de reparo.** Depois, teste o plano e os indicadores com máquinas, leituras e ordens fictícias de resultado conhecido. Sem isso, o sistema gera ordens no dia errado e calcula um MTBF que cada área lê de um jeito.

**Este artigo não recomenda CMMS, ERP, sensor nem fornecedor.** A documentação de dois fornecedores aparece só para mostrar como os sistemas costumam modelar a reprogramação. Empresa, máquina, leituras e ordens do exemplo são inventadas. As normas pagas aparecem só pelo que as páginas públicas mostram.

## Por que o plano que funciona na planilha quebra no sistema

Na planilha, o planejador de manutenção corrige o plano com bom senso: sabe que a injetora ficou parada duas semanas, que o horímetro foi trocado em agosto, que a preventiva de setembro atrasou porque faltou o kit de filtros. O sistema não sabe nada disso. Ele gera a ordem de serviço de manutenção quando a regra manda, conta a próxima a partir do campo que alguém escolheu e calcula o MTBF com as ordens que encontrar.

Por isso o trabalho começa antes da tela: cada decisão que hoje mora na cabeça do planejador precisa virar regra escrita, com dono, e cada regra precisa de um cenário de teste. A carga do plano que vive em planilha tem seus próprios cuidados, tratados em [importação de planilhas no sistema](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/); aqui o assunto é o que o plano faz depois de carregado.

### Norma, convenção e decisão da empresa

Ajuda separar três camadas:

- **Terminologia normativa.** O vocabulário da IEC, publicado de graça no Electropedia, define [manutenção preventiva](https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-06-05) como a feita para mitigar a degradação e reduzir a probabilidade de falha, e a [manutenção baseada na condição](https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-06-07) como uma preventiva que depende da avaliação da condição física. Também define falha, MTBF e MTTR, que veremos adiante. A [EN 13306](https://www.evs.ee/en/evs-en-13306-2017) traz a terminologia europeia de manutenção, e a [ABNT NBR 5462](https://www.target.com.br/produtos/normas-tecnicas/29220/nbr5462-confiabilidade-e-mantenabilidade), de 1994, a brasileira de confiabilidade e mantenabilidade; não lemos o texto das duas, que é pago, e o catálogo consultado mostra a NBR 5462 ao mesmo tempo como vigente e como cancelada, então confira a situação na ABNT antes de citá-la num contrato. A [ISO 14224](https://www.iso.org/standard/64076.html), do setor de petróleo e gás, descreve como coletar dados de confiabilidade e manutenção num formato padronizado; serve de referência de estrutura, não de obrigação para outros setores.
- **Regra legal.** Para máquinas, a NR-12 exige manutenção na forma e periodicidade determinadas pelo fabricante, registro das manutenções e cronograma para a preventiva de itens que influenciem na segurança; veremos os itens na seção de apontamento. Este artigo não é parecer jurídico.
- **Decisão da empresa.** Intervalos, gatilhos, janela, reprogramação, o que conta como falha. Essa camada decide o que o sistema faz, e é ela que precisa estar escrita antes de alguém programar.

## Gatilho: calendário, horímetro, contador ou o que vier primeiro

A documentação de um CMMS de mercado resume as três opções usuais: preventiva por [tempo decorrido desde o trabalho anterior, por uso medido do ativo ou pela combinação dos dois](https://www.ibm.com/docs/SSLL8M_7.6.2/com.ibm.nuc.doc/pluspm/c_pm_frequency_schedules.html). Escreva, para cada plano:

- **Calendário.** Bom para o que envelhece mesmo parado: vedações, inspeções legais, calibração, lubrificante que degrada. Defina se conta dias corridos ou úteis e o que acontece quando a data cai num feriado ou numa parada coletiva. O raciocínio sobre datas e cortes está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Horímetro ou contador.** Bom para o que se desgasta com o uso: horas de motor, ciclos de injeção, golpes de prensa, metros de tecido. Defina qual medidor vale (horas de energia, horas de motor ligado, horas produzindo), de onde vem a leitura (apontamento do operador ou sinal da máquina) e com que frequência chega. Como obter esse sinal está em [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/); aqui ele já chega e o assunto é o que o plano faz com ele.
- **O que vier primeiro.** Comum quando a máquina tem uso irregular: 500 horas ou 90 dias. Defina se, ao executar, os dois contadores recomeçam juntos.
- **Inspeção e preditiva.** A ordem de inspeção sai por calendário ou uso, e o que ela encontra pode gerar outra ordem. Separe a inspeção da corretiva que ela origina (veja a seção de tipos de ordem).

### Quando o dado de uso falha

Um plano por horímetro vale o que vale a leitura. Escreva o comportamento para quatro casos:

1. **Leitura parada.** A integração caiu ou o operador parou de apontar. O sistema avisa o planejador depois de um prazo combinado, mostra a data estimada pela média de uso recente marcada como *estimada* e mantém o gatilho de calendário como rede de segurança. Ele não pode simplesmente parar de gerar ordens.
2. **Leitura que volta.** O horímetro foi trocado ou o controlador zerou. A troca é registrada como evento do medidor, com leitura final do antigo e inicial do novo, e o acumulado continua certo. Uma leitura menor que a anterior, sem esse registro, fica pendente.
3. **Leitura que salta.** Alguém digitou 21.577 em vez de 12.577. Defina um limite de plausibilidade (por exemplo, mais horas do que o calendário permite desde a última leitura) que segura a leitura para conferência antes de disparar ordens.
4. **Leitura repetida.** A mesma leitura chega duas vezes depois de uma queda de rede. Ela não pode somar duas vezes; o tratamento geral está em [evento duplicado na integração](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).

## Janela de tolerância e reprogramação

**A janela** diz quando uma preventiva ainda conta como feita no prazo: por exemplo, 50 horas ou 7 dias antes ou depois do vencimento. Ela serve para o indicador de cumprimento e para a programação: a ordem aparece para o planejador quando a janela abre, não no dia exato.

**A reprogramação** responde à pergunta que mais gera discussão: depois de uma execução atrasada, a próxima conta da data planejada ou da execução?

- **Da data planejada (programação fixa).** A próxima mantém o ritmo original. A documentação do IBM Maximo chama isso de programação fixa, em que se planeja [a partir da data de início prevista do trabalho anterior](https://www.ibm.com/docs/SSLL8M_7.6.2/com.ibm.nuc.doc/pluspm/c_pm_frequency_schedules.html). Útil para inspeções com periodicidade obrigatória, que não podem escorregar mês a mês. O custo: o intervalo de uso até a próxima fica mais curto.
- **Da execução (programação flutuante).** A próxima conta do encerramento da anterior, preservando o intervalo de uso entre duas execuções. Útil para desgaste. O custo: atrasos se acumulam e o plano escorrega.
- **Meio-termo.** A ajuda do SAP descreve [fatores de deslocamento para conclusão antecipada e atrasada](https://help.sap.com/saphelp_erp60_sp/helpdata/en/18/a8ce5314894208e10000000a174cb4/content.htm), aplicados só fora da tolerância: com 15 dias de atraso, a próxima data anda 0, 7 ou 15 dias, conforme o fator de 0%, 50% ou 100%.

Não há resposta certa para todos os planos. A recomendação da Torno é escrever a regra por plano, e não por sistema, e deixar visível na ordem qual regra foi usada. Lembre que a NR-12 manda submeter máquinas e equipamentos a manutenções [na forma e periodicidade determinadas pelo fabricante](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR12atualizada2023.pdf) (item 12.11.1). Uma regra de reprogramação que deixe o intervalo passar disso não deve ser configurada para esses planos; qualquer exceção é decisão da empresa com a segurança do trabalho, fora do sistema, e este artigo não avalia sua conformidade.

Combine também:

- **Adiamento.** Quem pode adiar uma preventiva, até quando e com qual motivo. O sistema guarda a data anterior, a nova, quem mudou e por quê; o conteúdo de um bom registro está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), e os perfis, em [permissões de acesso no software](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Máquina parada por longo período.** Plano por uso para de andar sozinho; plano por calendário continua vencendo. Defina se a preventiva por calendário de uma máquina desativada é suspensa e quem decide.
- **Ordem que não foi feita.** Se a preventiva de setembro não foi executada e a de outubro venceu, o sistema gera duas ordens, junta as duas ou cancela a mais antiga com motivo? A regra precisa existir antes da primeira vez.

## Tipos de ordem de serviço de manutenção

O tipo da ordem decide em qual indicador ela entra. Uma lista mínima:

| Tipo | O que é | Entra no MTBF como falha? |
|---|---|---|
| Preventiva | Gerada pelo plano, por calendário ou uso | Não |
| Inspeção ou preditiva | Verifica a condição: ruído, vibração, temperatura, análise de óleo | Não |
| Corretiva programada | Corrige um defeito achado na inspeção antes de a máquina parar | Decisão da empresa; no exemplo, não |
| Corretiva | Repara depois da falha | Sim, se houve perda de função |
| Melhoria ou serviço | Modificação, instalação, apoio a setup | Não |

A **corretiva programada** é a decisão mais disputada. A inspeção achou um rolamento com ruído e a troca foi feita no fim de semana, sem parar a produção. Se isso contar como falha, a área de manutenção é punida no MTBF justamente por ter achado o problema antes. Se não contar, alguém precisa garantir que uma quebra de verdade não seja registrada como "programada" para melhorar o número. A recomendação da Torno: não contar como falha, registrar como defeito encontrado na inspeção, com o achado vinculado à ordem de inspeção, e deixar a reclassificação de tipo restrita a um perfil.

## Backlog, atraso e cumprimento do plano

Três números que costumam ser confundidos. Nenhuma das normas consultadas os define: são convenções de mercado, e as escolhas abaixo são recomendação da Torno.

- **Backlog**: o trabalho liberado e ainda não concluído, em horas estimadas, dividido pela capacidade da equipe. Defina o que entra (só ordens liberadas? as que aguardam peça?) e qual capacidade se usa (horas contratadas ou só as horas disponíveis para ordens planejáveis).
- **Atraso**: preventivas vencidas e fora da janela. Uma ordem pode estar no backlog sem estar atrasada.
- **Cumprimento do plano**: preventivas executadas dentro da janela sobre as que venceram no período. Defina se a executada fora da janela conta como meia, como zero ou à parte; a recomendação da Torno é mostrar à parte, para o número não esconder o atraso.

## O apontamento do técnico

Todo indicador de manutenção sai do apontamento. Peça, no mínimo:

- **Instantes da máquina**, não só da ordem: quando parou (ou quando a falha foi detectada), quando o técnico começou, quando a máquina foi liberada à produção. A ordem pode ser encerrada horas depois da liberação; se o MTTR usar o encerramento, mede a burocracia, não o reparo.
- **Pausas e esperas com motivo**: aguardando peça, aguardando técnico especializado, aguardando liberação da produção, aguardando bloqueio de energia. É isso que separa o tempo de reparo das esperas.
- **Mais de um técnico** na mesma ordem: horas-homem por pessoa, sem somar o tempo de máquina parada duas vezes.
- **Peças**, com código e quantidade, vinculadas à ordem. A baixa no estoque é outro assunto, tratado em [inventário de estoque no sistema](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/).
- **Sintoma, causa e ação** em listas fechadas, com campo livre. A ISO 14224 trata seus modos de falha como um [tesauro de confiabilidade](https://www.iso.org/standard/64076.html): uma lista comum é o que permite somar falhas parecidas.
- **Registro para a NR-12.** O item 12.11.2 manda registrar, em livro, ficha ou sistema informatizado, [intervenções, data, serviço, peças, condições de segurança, indicação conclusiva e nome do responsável](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR12atualizada2023.pdf); o 12.11.2.1 diz que o registro fica disponível a trabalhadores, CIPA, SESMT e fiscalização, e o 12.11.2.2 exige cronograma de execução para a preventiva de itens que influenciem na segurança. Se o sistema vai ser esse registro, os campos precisam existir e a consulta precisa funcionar para quem a norma lista.

O técnico costuma apontar na área de máquinas, onde a rede falha. Se o celular grava localmente e sincroniza depois, o horário do apontamento é o do serviço, não o da sincronização; o desenho geral está em [sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/).

## MTBF e MTTR: de onde vêm os tempos

O vocabulário da IEC ajuda a desfazer confusões.

- **Falha** é a [perda da capacidade de funcionar como requerido](https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-03-01). Uma lâmpada de painel queimada com a máquina produzindo normalmente é um defeito a corrigir; se é falha da máquina depende do que a empresa define como "funcionar como requerido".
- **MTBF** é a [expectativa da duração do tempo de operação entre falhas](https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/740959858e232590c1257d9700618055), e só se aplica a itens reparáveis. O verbete conta [tempo **de operação** entre falhas](https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/ac7bb539dce39801c1257d9700617f3a), o acumulado com a máquina funcionando. A IEC tem um termo diferente, [tempo entre falhas](https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/199959db277866bcc1257d9700617f29), que inclui o tempo em funcionamento e o fora de funcionamento. Muita planilha divide as horas do mês pelo número de falhas e chama o resultado de MTBF.
- **MTTR**, na IEC, é o [tempo médio até o restabelecimento](https://electropedia.org/iev/iev.nsf/17127c61f2426ed8c1257cb5003c9bec/a49e5fb265093635c1257d97006183bf); "tempo médio de reparo" aparece como sinônimo desaconselhado. O [tempo até o restabelecimento](https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-06) vai do instante da falha até a máquina voltar e, se o instante da falha não for conhecido, começa na detecção. Já o [tempo de reparo](https://www.electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-19) é só a parte ativa (localizar, diagnosticar, corrigir e verificar) e exclui atrasos técnicos, administrativos e logísticos, como a [espera por peça](https://electropedia.org/iev/iev.nsf/IEVref_xref/en:192-07-13).

Ou seja: dois números com a mesma sigla podem medir coisas diferentes. A recomendação da Torno é mostrar os dois: MTTR como tempo até restabelecer, que é o que a produção sente, e o reparo ativo médio à parte, que é o que a manutenção controla. A diferença entre eles é espera, e espera tem dono (almoxarifado, compras, escala).

Defina por escrito, para o cálculo:

- **O que conta como falha**: perda de função com máquina parada? Parada acima de um limite? Falha de equipamento auxiliar? Parada por falta de material ou por erro de operação, que não são falha do equipamento?
- **Qual tempo é a base do MTBF**: horas de operação do horímetro, horas programadas ou horas do calendário.
- **Onde começa e termina o MTTR**: instante da falha ou da detecção; liberação à produção ou encerramento da ordem.
- **Falha que atravessa o turno ou a meia-noite**: conta no período em que começou.
- **Nível**: máquina, conjunto ou componente. O MTBF da linha não é a média dos MTBFs das máquinas.

Se a empresa também calcula OEE, a mesma parada aparece lá como perda de disponibilidade; a preventiva entra como parada planejada ou como perda, conforme a regra descrita em [OEE no sistema](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/). Os dois números precisam usar os mesmos instantes de parada.

E uma fronteira: o MTTR não é o SLA do chamado. Um SLA em horas úteis pode pausar fora do expediente, como em [SLA em horas úteis](https://tornostudio.com/blog/sla-horas-uteis-sistema-chamados-aceite/); o tempo até restabelecer uma máquina que quebrou às 22:00 conta a madrugada inteira.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Intervalos, tarefas e gatilho de cada plano | Engenharia de manutenção, com o manual do fabricante |
| Planos de itens que influenciem na segurança e periodicidade do fabricante | Manutenção e segurança do trabalho |
| Janela de tolerância e regra de reprogramação por plano | Engenharia de manutenção, com PCP |
| Quem pode adiar e até quando | Gerência de manutenção, com produção |
| Medidor que vale e o que fazer com leitura parada, zerada ou errada | Manutenção, automação e TI |
| Tipos de ordem e quem reclassifica | Gerência de manutenção |
| O que conta como falha | Diretoria industrial, com manutenção e produção |
| Base do MTBF e início e fim do MTTR | Engenharia de manutenção ou confiabilidade, com controladoria industrial |
| Campos do apontamento e listas de sintoma, causa e ação | Manutenção, com segurança do trabalho |
| Uso de MTBF, MTTR e cumprimento do plano em metas | Diretoria; com RH, se afetar pessoas |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo Ltda. vai levar para o sistema o plano da injetora IJ-04: lubrificação e inspeção a cada 500 horas de horímetro ou 90 dias, o que vier primeiro, com janela de 50 horas. A última execução foi em 01/07/2026, com 12.000 h. Entre julho e setembro, a injetora rodou em média 7 horas por dia de calendário, então chegou a 12.500 h por volta de 10/09, antes do vencimento por calendário, 29/09. Em 25/08, com 12.385 h, a integração do horímetro parou. A preventiva foi executada em 21/09, com 12.577 h lidas no painel pelo técnico: 77 horas depois do vencimento, fora da janela.

A leitura que vale para a execução é a do painel, não a estimativa. Pela data planejada, a próxima vence com 13.000 h ou em 09/12, 90 dias depois de 10/09, quando o plano venceu pelo horímetro; pela execução, com 13.077 h ou em 20/12, 90 dias depois de 21/09. Como 20/12/2026 é um domingo, a regra de calendário do exemplo leva a ordem para o dia útil anterior, 18/12.

![Ilustração de um horímetro e de uma folha de calendário da injetora IJ-04, na empresa fictícia Indústria Exemplo Ltda. O plano é de 500 horas ou 90 dias, o que vier primeiro, com janela de 50 horas antes ou depois do vencimento. O horímetro mostra 12.577 horas, lidas na execução, e o calendário mostra segunda-feira, 21 de setembro de 2026. Abaixo, uma linha do tempo. 01/07, 12.000 horas: última execução; os dois contadores recomeçam. 25/08, 12.385 horas: a leitura parou; o sistema estima 7 horas por dia e marca a leitura como estimada. Por volta de 10/09, 12.500 horas: vence pelo horímetro; janela de 12.450 a 12.550 horas. 21/09, 12.577 horas: executada 77 horas depois do vencimento, fora da janela. 29/09, 90 dias: vencimento por calendário, rede de segurança. Depois da execução atrasada, a próxima preventiva: pela data planejada, programação fixa, 13.000 horas ou 09/12, 90 dias após 10/09, com só 423 horas de uso até lá; pela execução, programação flutuante, 13.077 horas ou 20/12, que é domingo, e a ordem vai para 18/12, com 500 horas de uso, e o plano escorrega 77 horas. Exemplo fictício.](./torno-preventiva-horimetro-calendario.svg)

*Exemplo fictício: empresa, máquina, leituras, datas e regras inventadas; o horímetro dispara antes do calendário, e a execução atrasada leva a duas próximas datas diferentes conforme a regra de reprogramação. Ilustração original Torno, 2026.*

Em novembro, a IJ-04 tinha 320 horas programadas: 20 dias de produção (os 19 dias úteis do mês, já descontados Finados, em 02/11, e o [Dia Nacional de Zumbi e da Consciência Negra](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14759-21-dezembro-2023-795091-publicacaooriginal-170522-pl.html), em 20/11, feriado nacional desde 2023, mais um sábado programado), com dois turnos de 8 horas. Houve uma preventiva de 4 horas, 6 horas sem material e três falhas que pararam a máquina: um vazamento hidráulico (6,0 h até restabelecer, das quais 2,5 h de reparo ativo e 3,5 h de espera, inclusive 3 h aguardando a mangueira), uma resistência queimada (3,0 h; 2,0 h ativas) e um sensor de porta (1,0 h; 0,5 h ativa). Houve ainda uma ordem corretiva para trocar a lâmpada do painel, com a máquina produzindo. Horas de operação: 320 − 4 − 6 − 10 = 300.

- **Regra A (a do exemplo).** Falha é perda de função com máquina parada; MTBF sobre horas de operação: 300 ÷ 3 = 100 h. MTTR como tempo até restabelecer: 10 ÷ 3 = 3,33 h, ou 3 h 20 min. Reparo ativo médio, à parte: 5,0 ÷ 3 = 1 h 40 min.
- **Regra B (comum em planilha).** Toda ordem corretiva conta como falha e o MTBF divide as 720 horas do mês (30 dias) pelas 4 ordens: 180 h. O MTTR vai da abertura ao encerramento da ordem no sistema: 7,0 + 15,0 + 1,5 + 2,5 = 26 horas, divididas por 4: 6,5 h. A ordem da resistência foi aberta às 19:00 e só encerrada às 10:00 do dia seguinte, embora a máquina tenha voltado às 22:00.

![Ilustração de uma linha do tempo de novembro de 2026 da injetora IJ-04, na empresa fictícia Indústria Exemplo Ltda., com 20 dias de produção de 16 horas, 320 horas programadas, em quatro faixas de 5 dias de produção. Dias 1 a 5: falha F1, 6,0 horas. Dias 6 a 10: preventiva de 4 horas e a ordem da lâmpada do painel, sem parada. Dias 11 a 15: falta de material de 6 horas e falha F2, 3,0 horas. Dias 16 a 20: falha F3, 1,0 hora. F1 em detalhe, 6,0 horas até restabelecer: espera de 0,5, diagnóstico de 0,5, espera da peça de 3,0, troca de 1,5 e teste de 0,5; reparo ativo de 2,5 horas e espera de 3,5 horas. Operação: 320 menos 4, menos 6, menos 10, igual a 300 horas. Regra A, 3 falhas, falha é perda de função com máquina parada: MTBF 300 horas dividido por 3, 100 horas; MTTR até restabelecer, 10 horas dividido por 3, 3 horas e 20 minutos; reparo ativo, 5 horas dividido por 3, 1 hora e 40 minutos. Regra B, 4 ordens, toda ordem corretiva conta, até a lâmpada: MTBF 720 horas do mês dividido por 4, 180 horas; MTTR 26 horas de ordem aberta dividido por 4, 6,5 horas, da abertura ao encerramento. Mesmo mês, mesmas ordens: muda só a regra. Exemplo fictício.](./torno-preventiva-linha-tempo-mtbf.svg)

*Exemplo fictício: empresa, máquina, horas e ordens inventadas; com as mesmas ocorrências, a regra B dá um MTBF 80% maior e um MTTR quase duas vezes maior que a regra A. Ilustração original Torno, 2026.*

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com máquinas, leituras e ordens fictícias carregadas para cada caso, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Plano da IJ-04 com leituras diárias de 7 h a partir de 12.000 h em 01/07 | Ordem gerada ao abrir a janela, com 12.450 h, com vencimento em 12.500 h, antes do calendário (29/09) | Ordem com o gatilho que a disparou |
| Execução em 21/09 com 12.577 h, plano com reprogramação pela data planejada | Próxima com 13.000 h ou em 09/12, e a ordem mostra a regra usada | Ficha do plano antes e depois |
| Mesma execução, plano com reprogramação pela execução | Próxima com 13.077 h ou em 20/12, domingo, com a ordem programada para 18/12, dia útil anterior | Ficha do plano |
| Execução com 12.577 h no relatório de cumprimento | Conta como fora da janela, à parte das executadas no prazo | Relatório de cumprimento |
| Integração do horímetro parada desde 25/08 (12.385 h) | Aviso ao planejador no prazo combinado; data estimada marcada como estimada; gatilho de 90 dias mantido | Aviso registrado e ficha do plano |
| Troca do horímetro com leitura final 12.577 h e inicial 0 | Acumulado continua em 12.577 h; nenhuma ordem disparada ou perdida | Registro de troca do medidor |
| Leitura digitada 21.577 h um dia depois de 12.577 h | Leitura retida para conferência; nenhuma ordem gerada | Lista de leituras pendentes |
| Mesma leitura recebida duas vezes | Conta uma vez | Leituras brutas e acumulado |
| Preventiva de setembro não executada e de outubro vencida | Comportamento combinado (juntar, gerar as duas ou cancelar com motivo), sem ordem duplicada silenciosa | Lista de ordens do plano |
| Adiamento da preventiva por um técnico sem permissão | Bloqueado; o mesmo adiamento pelo coordenador registra data anterior, nova, quem e motivo | Tentativa negada e registro da mudança |
| Tentativa de adiar uma preventiva da IJ-04 além da periodicidade do fabricante | O sistema impede ou destaca o adiamento além da periodicidade do fabricante e registra quem tentou e o motivo | Tentativa registrada |
| Inspeção acha rolamento com ruído e gera corretiva programada sem parada | Não entra como falha no MTBF; aparece como defeito encontrado, vinculado à inspeção | Relatório de falhas e da ordem |
| Mês de novembro da IJ-04 com a regra A | MTBF 100 h; MTTR 3 h 20 min; reparo ativo médio 1 h 40 min | Relatório com a memória de cálculo |
| Mesmo mês, regra B carregada só no ambiente de teste | MTBF 180 h; MTTR 6,5 h; o relatório informa qual regra e qual versão dela foi usada | Relatório com a versão da regra |
| Ordem de F2 aberta às 19:00, máquina liberada às 22:00 e ordem encerrada às 10:00 do dia seguinte | Regra A: 3,0 h até restabelecer; o encerramento tardio da ordem não muda o MTTR | Linha do tempo da ordem |
| Ordem de F1 com espera de peça apontada | Tempo até restabelecer 6,0 h; reparo ativo 2,5 h; espera de 3,5 h com motivo | Apontamento e relatório |
| Ordem encerrada com o técnico sem rede, sincronizada duas horas depois | Instantes de início, fim e liberação são os do serviço | Registro com horário do apontamento e da sincronização |
| Consulta do registro de manutenção da IJ-04 por um membro da CIPA | Mostra intervenções, datas, serviço, peças, condições de segurança, indicação conclusiva e responsável | Tela ou relatório consultado |
| Backlog com 12 ordens liberadas somando 96 horas estimadas e capacidade de 60 horas por semana | 1,6 semana | Relatório de backlog com a capacidade usada |
| 20 preventivas vencidas no mês: 15 na janela, 3 fora, 2 não feitas | Cumprimento 75%, com as 3 fora da janela e as 2 não feitas listadas | Relatório de cumprimento |

*Fim do exemplo fictício. Empresa, máquina, plano, leituras, horas, ordens, regras e critérios são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma.*

## Perguntas frequentes

### Qual é um bom MTBF?

Não existe um número de referência que sirva para qualquer máquina, e o exemplo mostra por quê: o mesmo mês dá 100 h ou 180 h conforme a regra. A comparação útil é a da própria máquina, com a regra fixa, ao longo do tempo, olhando também as causas das falhas.

### Preciso trocar a planilha por um sistema?

Não necessariamente. Se o plano é pequeno e uma pessoa o mantém bem, a planilha pode bastar. O sistema passa a valer quando há muitas máquinas, leituras de uso automáticas, vários técnicos apontando ou exigência de registro consultável. Em qualquer caso, as definições deste artigo precisam estar escritas.

Para transformar o plano de preventiva e os indicadores de manutenção em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a planilha do plano, a lista de tipos de ordem e um mês real de ordens de uma máquina, sem dados confidenciais de clientes.

*Fontes consultadas em 13 de novembro de 2026: IEC, Electropedia (IEC 60050-192), verbetes de falha, MTBF, tempo entre falhas, MTTR, tempo até restabelecimento, tempo de reparo, atraso logístico, manutenção preventiva e baseada na condição; ISO, página da ISO 14224:2016; EVS, página da EN 13306:2017; catálogo com a página da ABNT NBR 5462; Ministério do Trabalho e Emprego, NR-12, itens 12.11.1 a 12.11.2.2; IBM, documentação "PM frequency schedules" do Maximo 7.6.2; SAP Help Portal, fatores de deslocamento do plano de manutenção. Empresa, máquina, números e ilustrações são fictícios.*
