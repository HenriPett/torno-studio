---
content_id: torno-artigo-pt-20261119-cep-cartas-controle
intent_id: buyer-spc-control-charts-capability-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Controle estatístico de processo (CEP) no sistema: o que definir e testar antes de automatizar as cartas de controle'
h1: 'Controle estatístico de processo (CEP) no sistema: o que definir e testar antes de automatizar as cartas de controle'
seo_title: 'CEP no sistema: cartas de controle, Cpk e aceite | Torno'
seo_description: 'Controle estatístico de processo no sistema: subgrupo, tipo de carta, limites, regras de sinal, Cp e Cpk, reação e RNC. O que definir e testar.'
summary: 'Roteiro para a indústria que vai tirar o controle estatístico de processo (CEP) da planilha e do papel e levá-lo para um sistema, seja um software de CEP, um módulo de ERP ou um sistema sob medida: a característica e o plano de amostragem; o subgrupo racional; o tipo de carta (X̄-R, X̄-S, I-MR, p, np, c, u); o cálculo dos limites como regra escrita, com fase de estudo, monitoramento, recálculo e aprovação; as regras de sinal como escolha da empresa; a diferença entre limite de controle e tolerância; Cp, Cpk, Pp e Ppk e as condições para usá-los; a reação ao sinal e o seu registro; a ligação com a não conformidade e a calibração; dados de máquina e digitação; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema o controle estatístico de processo, para que as cartas de controle, os limites, os sinais, os índices de capacidade e a reação ao ponto fora de controle sejam confiáveis e não se confundam com tolerância nem com o tratamento da não conformidade?
proposed_path: /blog/cep-controle-estatistico-processo-cartas-sistema-aceite/
canonical_url: https://tornostudio.com/blog/cep-controle-estatistico-processo-cartas-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes e engenheiros da qualidade e de processo, supervisores de produção, metrologia e TI de indústrias pequenas e médias que vão contratar, especificar, ajustar ou aceitar um sistema (software de CEP, módulo de ERP, sistema de manufatura ou sistema sob medida) para registrar medições, gerar cartas de controle e calcular índices de capacidade, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de cartas de controle e as folhas de verificação por coleta no sistema, cálculo automático de limites, alerta de sinal e relatório de capacidade.
scope: Controle estatístico de processo com cartas de Shewhart, pelo que descrevem o NIST/SEMATECH e-Handbook e o resumo público da ISO 7870-2; característica, tolerância e plano de amostragem; subgrupo racional; escolha do tipo de carta (X̄-R, X̄-S, I-MR, p, np, c, u) como decisão da empresa; cálculo dos limites com constantes tabeladas; fase de estudo e de monitoramento, recálculo, versão e aprovação dos limites; regras de sinal (Western Electric e os oito testes numerados conforme Nelson) como opções, com o efeito sobre alarmes falsos descrito pelo NIST; diferença entre limite de controle e tolerância; Cp, Cpk, Pp e Ppk, estabilidade e normalidade, e o resumo público da ISO 22514-2; reação ao sinal, peças sob suspeita e registro; ligação com RNC e calibração sem duplicá-las; dados de máquina, de medidor e digitação; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Prescrição de regras de sinal, tamanho de subgrupo, frequência de amostragem, número de subgrupos do estudo ou metas de Cp, Cpk, Pp e Ppk; cartas CUSUM, EWMA, multivariadas e de pequenos lotes; análise do sistema de medição (MSA, R&R) e incerteza de medição; interpretação do texto das normas ISO 7870 e ISO 22514, de manuais da AIAG ou de requisitos de clientes automotivos, que não foram lidos; ensino de estatística além do necessário para especificar o sistema; tratamento da não conformidade, controle de calibração, inspeção de recebimento e OEE (cobertos em outros artigos); recomendação ou comparação de software de CEP, ERP ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-19T11:30:00Z'
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
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata o registro, a contenção, a disposição e a ação corretiva da não conformidade; aqui só a regra que abre a RNC a partir da medição e o vínculo entre o sinal da carta e a RNC.
  - path: https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/
    reason: Trata o controle do instrumento e a avaliação de impacto quando ele reprova; aqui o registro de qual instrumento mediu cada subgrupo e o bloqueio da medição com instrumento vencido.
  - path: https://tornostudio.com/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/
    reason: Trata a aceitação de lotes de fornecedor por amostragem; aqui o monitoramento do processo da própria fábrica, que não decide aceitar ou rejeitar lote.
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata o que definir antes de integrar dados da máquina; aqui a medição que chega do medidor ou da máquina e entra no subgrupo.
  - path: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
    reason: Trata o indicador de eficiência do equipamento; aqui fica fora, mas a parada para reagir a um sinal entra no OEE como parada.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento recebido em dobro e o efeito único; aqui a medição enviada duas vezes pelo medidor.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode aprovar limites, mudar regras de sinal e liberar peças retidas.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que cada medição corrigida, versão de limites e reação precisam registrar.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a aprovação dos limites calculados e da liberação de peças retidas.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas e o tratamento de linhas com erro; aqui a carga do histórico de medições da planilha de CEP.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Trata números que diferem entre painel e sistema de origem; aqui o Cpk do sistema que não bate com o da planilha antiga.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com características, subgrupos e medições fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de cartas de controle.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a planilha de CEP e as folhas de verificação em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook, na seção sobre cartas X̄-R e X̄-S, dá os limites da carta de médias como X̄̄ ± A2·R̄ e os da carta de amplitudes como D3·R̄ e D4·R̄, com A2 = 3/(d2·√n); estima sigma por R̄/d2; tabela, para n = 5, A2 = 0,577, D3 = 0 e D4 = 2,115; diz que, para subgrupos relativamente pequenos (até 10, por exemplo), pode-se usar a amplitude, que para subgrupos maiores o desvio-padrão do subgrupo é preferível e que um tamanho típico é 4 ou 5.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section3/pmc321.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.3.2.1 "Shewhart X-bar and R and S Control Charts"'
    source_date: null
    checked_at: '2026-11-19T11:08:00Z'
    limit: 'Página sem data visível; lida pela ferramenta de leitura (o acesso direto ao domínio foi recusado pelo proxy). A página não tabela d2; o valor de d2 vem da documentação do Minitab. O tamanho típico de 4 ou 5 é descrição, não recomendação adotada aqui.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook lista as regras da Western Electric (um ponto além de 3 sigma; 2 dos últimos 3 além de 2 sigma do mesmo lado; 4 dos últimos 5 além de 1 sigma do mesmo lado; 8 seguidos do mesmo lado da linha central) e duas regras de tendência (6 seguidos subindo ou descendo; 14 seguidos alternando para cima e para baixo); diz que, só com a regra de 3 sigma, ocorre em média um alarme falso a cada 371 pontos e que, somando as regras da Western Electric, a frequência passa a cerca de um a cada 91,75 pontos (Champ e Woodall, 1987), cabendo ao usuário decidir se vale a troca; recomenda só mudar os limites com razão válida e convincente, dando como exemplos ao menos 30 novos pontos sem mudança conhecida no processo, uma mudança importante no processo ou um evento conhecido e evitável; e cita Shewhart sobre uma sequência de não menos de 25 amostras de tamanho 4 sob controle.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.3.2 "What are Variables Control Charts?"'
    source_date: null
    checked_at: '2026-11-19T11:10:00Z'
    limit: 'Página sem data visível; lida pela ferramenta de leitura; o texto literal das regras de tendência ("6 in a row trending up or down. 14 in a row alternating up and down") foi conferido na revisão factual. Champ e Woodall (1987) não foi lido; os números são os citados pelo NIST. Tradução livre da Torno.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook define Cp = (LSE − LIE)/(6σ) e Cpk = mín[(LSE − μ)/(3σ), (μ − LIE)/(3σ)]; diz que a capacidade compara a saída de um processo sob controle com os limites de especificação; que Cp, Cpk e Cpm supõem população com distribuição normal; que as estimativas valem com amostra grande o bastante, cerca de 50 valores independentes; e que, para distribuição não normal, sugere transformar os dados (Box-Cox) ou usar índices não paramétricos baseados em percentis.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.1.6 "What is Process Capability?"'
    source_date: null
    checked_at: '2026-11-19T11:09:00Z'
    limit: 'Página sem data visível; não menciona Pp nem Ppk. Tradução livre da Torno.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook descreve a carta c para número de defeitos ou não conformidades, a carta p para proporção de produto defeituoso e a carta u para defeitos por unidade; na carta c, modela os defeitos por uma distribuição de Poisson, com limites c ± k√c, e diz que, se o limite inferior der negativo, não há limite inferior.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section3/pmc33.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seções 6.3.3 "What are Attributes Control Charts?" e 6.3.3.1 "Counts Control Charts" (https://itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm)'
    source_date: null
    checked_at: '2026-11-19T11:14:00Z'
    limit: 'Páginas sem data visível; a página 6.3.3 não trata a carta np.'
  - classification: FATO
    claim: 'O resumo público da ISO 7870-2:2023 diz que o documento é um guia para o uso e o entendimento da abordagem de cartas de controle de Shewhart para o controle estatístico de um processo, limitado às cartas de Shewhart, e que introduz brevemente material suplementar como limites de alerta, análise de padrões de tendência e capacidade de processo; a página indica segunda edição, publicada em março de 2023, do ISO/TC 69/SC 4, substituindo a edição de 2013.'
    reference: https://committee.iso.org/standard/78859.html
    entity: 'ISO, página de catálogo da ISO 7870-2:2023 "Control charts — Part 2: Shewhart control charts"'
    source_date: '2023-03'
    checked_at: '2026-11-19T11:12:00Z'
    limit: 'Só o resumo público foi lido; o texto da norma não foi aberto. A página em www.iso.org não carregou; foi lida a mesma ficha no domínio committee.iso.org.'
  - classification: FATO
    claim: 'O resumo público da ISO 22514-2:2026 diz que o documento descreve um procedimento para estimar a capacidade ou o desempenho de processos, em particular quando o processo não está sob controle estatístico, com oito tipos possíveis de distribuição dos resultados, aplicável só a características contínuas; a página indica terceira edição, publicada em fevereiro de 2026, do ISO/TC 69/SC 4, substituindo a edição de 2017.'
    reference: https://committee.iso.org/standard/88883.html?browse=ics
    entity: 'ISO, página de catálogo da ISO 22514-2:2026 "Statistical methods in process management — Capability and performance — Part 2: Process capability and performance of time-dependent process models"'
    source_date: '2026-02'
    checked_at: '2026-11-19T11:13:00Z'
    limit: 'Só o resumo público foi lido; o texto da norma, as fórmulas e os oito modelos não foram abertos. Resumo traduzido pela Torno.'
  - classification: FATO
    claim: 'A ajuda do Minitab define subgrupo como um grupo de unidades criadas sob o mesmo conjunto de condições, uma "fotografia" do processo; diz que as medições de um subgrupo devem ser feitas próximas no tempo, mas independentes; que as diferenças dentro do subgrupo devem ser pequenas, permitindo detectar diferenças entre subgrupos; e que agrupar por um período longo demais pode esconder mudanças.'
    reference: https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/data/working-with-subgroups-in-variables-control-charts/
    entity: 'Minitab, Minitab Support, "What is a subgroup?"'
    source_date: null
    checked_at: '2026-11-19T11:16:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Tradução livre da Torno.'
  - classification: FATO
    claim: 'A ajuda do Minitab lista oito testes para causas especiais (1 ponto a mais de 3 sigma; 9 pontos seguidos do mesmo lado; 6 pontos seguidos todos subindo ou todos descendo; 14 pontos seguidos alternando; 2 de 3 a mais de 2 sigma do mesmo lado; 4 de 5 a mais de 1 sigma do mesmo lado; 15 seguidos dentro de 1 sigma; 8 seguidos a mais de 1 sigma de qualquer lado); diz que o usuário escolhe os testes e seus parâmetros, que mais testes tornam a carta mais sensível mas podem aumentar a chance de sinal falso, que, na dúvida, para cartas de variáveis, comece pelos testes 1, 2 e 7 ao estabelecer os limites; e que nas cartas R, S e de amplitude móvel só os testes 1 a 4 estão disponíveis.'
    reference: https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/basics/using-tests-for-special-causes
    entity: 'Minitab, Minitab Support, "Which tests for special causes are included in Minitab?"'
    source_date: null
    checked_at: '2026-11-19T11:15:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a página não cita Nelson nem Western Electric. A sugestão de testes iniciais é do fornecedor, não adotada nem recomendada aqui.'
  - classification: FATO
    claim: 'A documentação do SAS/QC diz que oferece oito testes padrão para causas especiais, indexados conforme a numeração usada por Nelson (1984, 1985), também chamados de regras da Western Electric.'
    reference: https://support.sas.com/documentation/cdl/en/qcug/66857/HTML/default/qcug_shewhart_sect540.htm
    entity: 'SAS Institute, SAS/QC User''s Guide, procedimento SHEWHART, "Standard Tests for Special Causes"'
    source_date: null
    checked_at: '2026-11-19T11:17:00Z'
    limit: 'Documentação de fornecedor; a página dá só os anos das obras de Nelson. O artigo de Nelson (Journal of Quality Technology, 1984) não foi aberto.'
  - classification: FATO
    claim: 'A tabela de constantes de não viés do Minitab dá d2 = 1,128 para n = 2 e d2 = 2,326 para n = 5; a ajuda da carta I-MR do Minitab estima sigma pela média das amplitudes móveis dividida por d2, com amplitude móvel de comprimento 2 por padrão.'
    reference: https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/how-to/time-weighted-charts/ewma-chart/methods-and-formulas/unbiasing-constants-d2-d3-and-d4
    entity: 'Minitab, Minitab Support, "Unbiasing constants d2(), d3(), and d4()" e "Methods and formulas for individuals chart" (https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/how-to/variables-charts-for-individuals/i-mr-chart/methods-and-formulas/methods-and-formulas-for-individuals-chart)'
    source_date: null
    checked_at: '2026-11-19T11:18:00Z'
    limit: 'Documentação de fornecedor, sem data visível; as fórmulas da carta I-MR aparecem como imagem e foram lidas pelo texto em volta. O valor A2 = 0,577 do NIST é coerente com 3/(2,326 × √5) = 0,5768.'
  - classification: FATO
    claim: 'A ajuda do Minitab diz que a capacidade potencial (Cp, Cpk) considera só a variação dentro dos subgrupos e a capacidade global (Pp, Ppk) a variação de todos os dados, incluindo diferenças entre subgrupos; que uma diferença grande entre elas indica muita variação entre subgrupos e que a estabilidade do processo pode precisar melhorar; e que a capacidade potencial só é calculada para dados normais.'
    reference: https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/potential-and-overall-capability/
    entity: 'Minitab, Minitab Support, "A comparison of potential capability and overall capability"'
    source_date: null
    checked_at: '2026-11-19T11:19:00Z'
    limit: 'Documentação de fornecedor, sem data visível; a página não dá as fórmulas dos desvios-padrão.'
  - classification: FATO
    claim: 'A ajuda do Minitab diz que os limites de controle se baseiam na variação aleatória do processo, que não se devem confundir limites de controle com limites de especificação, que estes se baseiam nos requisitos do cliente e que um processo pode estar sob controle e não ser capaz de atender às especificações.'
    reference: https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/basics/what-are-control-limits/
    entity: 'Minitab, Minitab Support, "What are control limits?"'
    source_date: null
    checked_at: '2026-11-19T11:20:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Tradução livre da Torno.'
  - classification: FATO
    claim: 'A ajuda do Minitab diz que cartas P e NP mostram unidades defeituosas (proporção e número inteiro) e cartas U e C mostram defeitos (por unidade e por amostra); que o conselho tradicional é usar a carta P quando os tamanhos de subgrupo variam, mas que se pode usar qualquer uma; e que o Minitab não cria carta C para subgrupos com números diferentes de unidades.'
    reference: https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/understanding-attributes-control-charts/attributes-control-charts-in-minitab/
    entity: 'Minitab, Minitab Support, "What is an attributes control chart?"'
    source_date: null
    checked_at: '2026-11-19T11:21:00Z'
    limit: 'Documentação de fornecedor, sem data visível.'
  - classification: FATO
    claim: 'A ajuda do Minitab Real-Time SPC diz que o produto calcula linha central e limites a partir de parâmetros históricos conhecidos ou estimados; que, numa carta nova, os limites se atualizam a cada ponto até a quantidade de dados definida (padrão de 100 observações para dados contínuos e 25 subgrupos para atributos) e então a fase de estimativa termina e os limites são travados; que encerrar a estimativa antes é possível mas não recomendado; que, travados, não se volta à estimativa com dados novos; e que os limites são recalculados quando uma observação é modificada ou quando uma causa atribuída é incluída ou removida. A ajuda do Minitab sobre estágios diz que, por padrão, a linha central e os limites são recalculados para cada estágio.'
    reference: https://support.minitab.com/en-us/real-time-spc/quality-analyses/control-charts/control-limit-calculation-details/
    entity: 'Minitab, Minitab Support, Real-Time SPC, "Control limit calculation details"; e "Add stages to show how a process changed" (https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/options/add-stages-to-show-how-a-process-changed)'
    source_date: null
    checked_at: '2026-11-19T11:22:00Z'
    limit: 'Documentação de fornecedor, sem data visível. Comportamento de um produto, citado como exemplo de modelagem, não como regra nem recomendação; as quantidades padrão do produto não são adotadas aqui.'
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., o eixo EX-12, o torno TC-04, a tolerância de 20,000 ± 0,050 mm, o subgrupo de 5 peças por hora, as 165 medições, os 25 subgrupos do estudo, as regras de sinal ligadas, as regras de recálculo, de peças retidas, de faixa plausível de digitação, de exclusão de subgrupos com causa atribuída, o teste de normalidade escolhido, a RNC-2026-0147, as datas, horários e decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; contas refeitas em Python em 19/11/2026.
    entity: Torno
    limit: Não representam cliente, sistema entregue nem processo real, nem regras de sinal, tamanho de subgrupo, frequência de amostragem ou metas de capacidade recomendadas.
---

*Leitura estimada: 19 minutos.*

**Antes de levar o controle estatístico de processo (CEP) para o sistema, escreva e aprove sete regras: qual característica se mede, com que instrumento e em que subgrupo; que tipo de carta cada característica usa; como os limites são calculados, em que fase, quem os aprova e quando se recalculam; quais regras de sinal estão ligadas; o que o operador e a qualidade fazem quando a carta sinaliza; como o sinal se liga à não conformidade sem virar outra RNC; e como Cp, Cpk, Pp e Ppk são calculados e em que condições podem ser mostrados.** Depois, teste com medições fictícias cujo resultado você já calculou à mão, inclusive um ponto que sai do limite com todas as peças dentro da tolerância e uma peça fora da tolerância que não tira a média do limite. Sem isso, o software de CEP desenha gráficos bonitos, recalcula os limites sozinho a cada ponto e mostra um Cpk que ninguém sabe de onde veio.

**Este artigo não prescreve regras de sinal, tamanho de subgrupo, frequência de amostragem nem metas de Cpk, e não recomenda software nem fornecedor.** Fórmulas e constantes aparecem como o NIST/SEMATECH e-Handbook e a documentação de fornecedores as descrevem, e isso está dito em cada citação. Empresa, peça, medições e números do exemplo são inventados.

## O que a planilha de CEP faz e o sistema precisa fazer melhor

Em muitas fábricas, o CEP vive numa planilha: o operador anota cinco medidas numa folha a cada hora, alguém digita no fim do turno, a planilha calcula a média, a amplitude e os limites, e o gráfico vai para o quadro da célula. Às vezes a planilha também calcula o Cpk que o cliente pede no relatório de aprovação de peça.

A planilha funciona enquanto uma pessoa cuida dela. O que ela não faz bem é **separar** e **lembrar**. Ela não separa os limites aprovados dos limites que mudam a cada linha nova, se a fórmula foi arrastada até o fim da coluna. Ela não lembra quem mudou uma medida, nem por quê. Ela não avisa ninguém quando um ponto sai do limite às 3h da manhã. E ela mistura duas perguntas que o sistema precisa manter separadas: "o processo mudou?" (a carta de controle) e "esta peça está boa?" (a tolerância). São essas coisas que justificam levar o CEP para um sistema, e são elas que mais ficam fora da especificação.

### Literatura, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Literatura e norma.** O que é uma carta de Shewhart, como se calculam os limites, o que são Cp e Cpk. Aqui o artigo usa o NIST/SEMATECH e-Handbook, manual de estatística mantido pelo instituto de padrões dos EUA, e o resumo público das normas ISO 7870-2 e ISO 22514-2. O texto das normas não foi lido.
- **Documentação de fornecedores.** Testes para causas especiais, fase de estimativa e limites travados, capacidade potencial e global: é assim que a ajuda do Minitab e a do SAS descrevem seus produtos, citados como exemplos. Não é regra.
- **Decisão da empresa.** Quais características, quais cartas, quais regras de sinal, quando recalcular, o que fazer no sinal, quem aprova. É essa camada que precisa estar escrita antes de configurar ou programar.

## Característica, instrumento e plano de amostragem

A unidade que o sistema controla não é a peça nem a máquina, é a **característica**: o diâmetro de um eixo num torno, a espessura de uma camada de pintura numa estufa, o número de bolhas por peça injetada. Cada característica tem seu plano.

Para cada uma, defina e cadastre:

- **Item, operação, recurso e característica.** Diâmetro Ø 20 do eixo, operação 20, torno TC-04. A mesma cota medida em dois tornos são duas cartas, não uma.
- **Especificação.** Nominal, limite inferior e superior de especificação (LIE e LSE), unidade e casas decimais, vindos do desenho na revisão vigente. Se a característica é unilateral (só um máximo, por exemplo), diga.
- **Instrumento ou tipo de instrumento.** E se cada subgrupo registra qual instrumento mediu. Sem esse vínculo, quando um instrumento reprova na calibração, ninguém consegue saber quais pontos da carta estão sob suspeita; o artigo sobre [calibração de instrumentos no sistema](https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/) trata da avaliação de impacto, e não é assunto daqui.
- **Plano de amostragem.** Quantas peças por subgrupo, de onde (peças seguidas, uma por cavidade, uma por fuso), com que frequência (por hora, por lote, por troca de ferramenta) e quem mede.
- **Tipo de carta e regras de sinal.** Mais abaixo.

Este plano é do processo da fábrica. Não confunda com o plano de amostragem da [inspeção de recebimento](https://tornostudio.com/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/), que decide aceitar ou rejeitar o lote de um fornecedor. A carta de controle não aceita nem rejeita nada: ela diz se o processo continua se comportando como no período de referência.

## O subgrupo racional: o que entra junto

A ajuda do Minitab define subgrupo como [um grupo de unidades produzidas sob o mesmo conjunto de condições](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/data/working-with-subgroups-in-variables-control-charts/), uma "fotografia" do processo: medições próximas no tempo, mas independentes, de modo que a variação dentro do subgrupo seja pequena e as diferenças entre subgrupos possam aparecer. A mesma página alerta que juntar medições de um período longo demais pode esconder mudanças.

Isso é a coisa mais importante e menos visível do CEP. A carta de médias compara a variação **entre** subgrupos com a variação **dentro** deles. Se o subgrupo junta peças de duas cavidades de um molde, a variação dentro fica grande, os limites ficam largos e a carta nunca sinaliza. Se junta peças de antes e depois de uma troca de ferramenta, idem.

Para o sistema, isso vira campos e regras:

- **O que identifica o subgrupo.** Data e hora, operador, instrumento, ordem de produção, cavidade, fuso, lote de matéria-prima. Escolha os que a qualidade quer poder estratificar depois.
- **Subgrupo incompleto.** Se o plano é de 5 peças e o operador mediu 4, o sistema aceita, recusa ou marca? As constantes da carta mudam com o tamanho do subgrupo; misturar tamanhos sem tratar isso dá limite errado.
- **Ordem das medições.** A carta é uma sequência no tempo. Uma medição lançada depois, com data retroativa, precisa entrar no lugar certo e ficar marcada como lançada fora de hora.

Este artigo não diz qual tamanho de subgrupo usar. O NIST observa que [um tamanho típico é 4 ou 5](https://itl.nist.gov/div898/handbook/pmc/section3/pmc321.htm); a escolha depende do processo, do custo de medir e do que a qualidade quer detectar.

## Qual carta para qual dado

A escolha da carta depende do tipo de dado e de como ele chega. O resumo público da ISO 7870-2:2023 descreve a norma como [um guia para o uso e o entendimento das cartas de controle de Shewhart](https://committee.iso.org/standard/78859.html), que são as tratadas aqui. As mais comuns:

- **X̄-R (média e amplitude).** Medição contínua, subgrupos pequenos. O NIST diz que, para subgrupos [relativamente pequenos, até 10, por exemplo, pode-se usar a amplitude](https://itl.nist.gov/div898/handbook/pmc/section3/pmc321.htm).
- **X̄-S (média e desvio-padrão).** Medição contínua, subgrupos maiores, para os quais o NIST diz que o desvio-padrão do subgrupo é preferível.
- **I-MR (valores individuais e amplitude móvel).** Um valor por vez: uma medida por lote, uma análise de laboratório por corrida. A ajuda do Minitab estima sigma pela [média das amplitudes móveis dividida por d2, com amplitude móvel de 2 pontos por padrão](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/how-to/variables-charts-for-individuals/i-mr-chart/methods-and-formulas/methods-and-formulas-for-individuals-chart).
- **p e np (defeituosos).** Peça boa ou ruim. A ajuda do Minitab diz que a carta P mostra a [proporção de unidades defeituosas e a NP, o número inteiro](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/understanding-attributes-control-charts/attributes-control-charts-in-minitab/), e que o conselho tradicional é usar a P quando o tamanho da amostra varia.
- **c e u (defeitos).** Contagem de defeitos, que podem ser vários na mesma peça. O NIST descreve a [carta c, com defeitos modelados por Poisson e limites c ± k√c](https://itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm), e a u, para defeitos por unidade.

O que escrever: **para cada característica, qual carta, e o que o sistema faz quando o dado não cabe nela** (subgrupo de tamanho diferente, amostra de atributos com tamanho variável, valor ausente). Um sistema que só sabe desenhar X̄-R vai receber dados de atributos encaixados à força, ou vai deixar o CEP de atributos na planilha.

## Os limites são uma regra escrita, não uma fórmula arrastada

### Como se calculam

Para a carta X̄-R, com X̄̄ como a média das médias dos subgrupos e R̄ como a média das amplitudes, o NIST dá os limites da carta de médias como [X̄̄ ± A2 · R̄, e os da carta de amplitudes como D3 · R̄ e D4 · R̄](https://itl.nist.gov/div898/handbook/pmc/section3/pmc321.htm), com sigma estimado por R̄ ÷ d2. Para subgrupos de 5, a tabela do NIST traz A2 = 0,577, D3 = 0 e D4 = 2,115; a tabela de constantes do Minitab traz [d2 = 2,326](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/how-to/time-weighted-charts/ewma-chart/methods-and-formulas/unbiasing-constants-d2-d3-and-d4). As duas fontes são coerentes: 3 ÷ (2,326 × √5) = 0,5768.

A conta é simples. O que não é simples é **com quais dados** ela é feita e **quando** ela vale.

### Fase de estudo e fase de monitoramento

Os limites saem de um período de referência. O NIST fala em estimar os parâmetros a partir de amostras preliminares e [cita Shewhart sobre uma sequência de não menos de 25 amostras de tamanho 4 sob controle](https://itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm). A ajuda do Minitab Real-Time SPC descreve um modelo de produto: numa carta nova, os limites se atualizam a cada ponto até juntar a quantidade de dados definida, e então [a fase de estimativa termina e os limites são travados](https://support.minitab.com/en-us/real-time-spc/quality-analyses/control-charts/control-limit-calculation-details/). Esse é um modelo. Defina o seu:

- **Fase de estudo.** Quantos subgrupos, de qual período, em que condições (mesma ferramenta, mesmo lote de material, operadores habituais). O que fazer com subgrupos que já sinalizam no estudo: investigar, registrar a causa e excluir do cálculo, ou manter.
- **Aprovação.** O sistema calcula e propõe; a qualidade aprova, com o [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) da empresa. Até a aprovação, a carta mostra pontos, mas não está em monitoramento.
- **Monitoramento.** Os limites aprovados ficam fixos. Ponto novo não muda limite.
- **Versão.** Cada conjunto de limites tem número, período de dados, constantes usadas, quem aprovou e quando. A carta mostra qual versão estava valendo em cada ponto.

### Quando recalcular, e quem decide

O NIST recomenda [só mudar os limites com uma razão válida e convincente](https://itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm), e dá exemplos: ao menos 30 pontos novos sem mudança conhecida no processo (para estimar melhor a variação), uma mudança importante no processo, ou um evento conhecido e evitável que alterou o comportamento. Na ajuda do Minitab, a carta pode ter estágios, e [por padrão os limites são recalculados para cada estágio](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/options/add-stages-to-show-how-a-process-changed); no Real-Time SPC, os limites são [recalculados quando uma observação é modificada ou uma causa atribuída é incluída ou removida](https://support.minitab.com/en-us/real-time-spc/quality-analyses/control-charts/control-limit-calculation-details/). São comportamentos diferentes; nenhum é o certo para todo mundo.

Escreva:

- **Gatilhos de revisão.** Mudança de processo (máquina, ferramenta, fornecedor de material, programa), número de novos subgrupos sem causa atribuída, pedido da qualidade.
- **Proposta ou automático.** Recomendação da Torno: o sistema nunca troca limites sozinho; calcula uma proposta, mostra lado a lado com a versão vigente e espera aprovação.
- **O que entra no recálculo.** Subgrupos com causa atribuída e corrigida ficam de fora? Quem decide, caso a caso?
- **Edição de medição.** Se uma medição é corrigida depois (erro de digitação comprovado), isso muda a proposta de limites? Toda correção vai para a [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), com valor antigo, novo, quem, quando e por quê.

## Regras de sinal: opções, não verdade

O sinal mais conhecido é o ponto fora dos limites de 3 sigma. Mas há outros, criados para pegar mudanças pequenas e padrões. O NIST lista as [regras da Western Electric](https://itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm): um ponto além de 3 sigma; 2 dos últimos 3 além de 2 sigma do mesmo lado; 4 dos últimos 5 além de 1 sigma do mesmo lado; 8 seguidos do mesmo lado da linha central; e, como regras de tendência, 6 seguidos subindo ou descendo e 14 seguidos alternando para cima e para baixo. A ajuda do Minitab lista [oito testes para causas especiais](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/basics/using-tests-for-special-causes), com parâmetros que o usuário pode mudar (9 pontos do mesmo lado, por exemplo, e não 8). A documentação do SAS diz que seus oito testes padrão são [numerados como em Nelson (1984, 1985)](https://support.sas.com/documentation/cdl/en/qcug/66857/HTML/default/qcug_shewhart_sect540.htm). O artigo original de Nelson não foi lido para este texto.

O ponto que importa para a compra: **cada regra a mais pega mais mudanças reais e também mais alarmes falsos.** O NIST dá a ordem de grandeza: só com a regra de 3 sigma, um alarme falso a cada 371 pontos em média; com as regras da Western Electric somadas, cerca de um a cada 91,75 pontos, e cabe ao usuário decidir se a troca vale a pena. Num processo com um subgrupo por hora, isso é a diferença entre um alarme falso a cada duas semanas e outro a cada poucos dias, numa conta grosseira de 24 subgrupos por dia. Alarme demais faz o operador parar de olhar.

Para o sistema:

- **Quais regras, por característica.** Com os parâmetros de cada uma (8 ou 9 pontos do mesmo lado?). Guardadas como configuração versionada, com quem mudou e quando.
- **Em que carta.** Na de médias e na de amplitudes, ou só numa? A ajuda do Minitab diz que nas cartas R, S e de amplitude móvel só os testes 1 a 4 estão disponíveis.
- **Qual ponto recebe o sinal.** Na regra "2 de 3", o sinal é dado no terceiro ponto; o sistema precisa mostrar quais pontos formaram o padrão.
- **Mudança de regra não reescreve o passado.** Se a empresa liga uma regra nova hoje, os sinais de ontem continuam sendo os da regra de ontem.

Este artigo não diz quais regras ligar.

## Limite de controle não é tolerância

Esta é a confusão mais comum, e o sistema pode piorá-la se desenhar as duas coisas no mesmo gráfico sem explicar. A ajuda do Minitab é direta: os limites de controle se baseiam na variação do próprio processo, os de especificação nos requisitos do cliente, e [não se deve confundir um com o outro](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/basics/what-are-control-limits/); um processo pode estar sob controle e não ser capaz de atender à especificação.

Na prática:

- **A carta de médias compara médias, não peças.** A média de 5 peças varia bem menos que cada peça. Desenhar LIE e LSE numa carta de médias leva a conclusões erradas, nos dois sentidos.
- **Ponto fora do limite com todas as peças boas.** O processo mudou; ainda não fez peça ruim. É sinal para reagir no processo, não para abrir não conformidade de produto.
- **Peça fora da tolerância com ponto dentro do limite.** A peça é não conforme, mesmo que a carta não sinalize. Vai para o fluxo de [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/), independentemente da carta.

Para o sistema, a regra é: **cada medida individual é comparada com a tolerância no momento do lançamento; a estatística do subgrupo é comparada com os limites de controle.** São duas checagens, com dois resultados, que podem acontecer juntas ou separadas.

## Cp, Cpk, Pp e Ppk: o que mostrar e em que condições

### O que a literatura e os fornecedores escrevem

O NIST define [Cp = (LSE − LIE) ÷ 6σ e Cpk como o menor entre (LSE − μ) ÷ 3σ e (μ − LIE) ÷ 3σ](https://itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). Cp mede quantas vezes a variação cabe na tolerância; Cpk desconta o quanto a média está fora do centro. O mesmo texto diz três coisas que o sistema não pode ignorar: a capacidade compara a saída de um **processo sob controle** com a especificação; Cp e Cpk **supõem distribuição normal**; e as estimativas só valem com amostra grande o bastante, **cerca de 50 valores independentes**. Para dados não normais, sugere transformar os dados ou usar índices baseados em percentis.

A diferença entre Cp/Cpk e Pp/Ppk está no sigma. A ajuda do Minitab descreve a [capacidade potencial (Cp, Cpk) como a que considera só a variação dentro dos subgrupos, e a global (Pp, Ppk) como a que inclui as diferenças entre subgrupos](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/potential-and-overall-capability/); uma diferença grande entre as duas indica muita variação entre subgrupos. Os nomes e as convenções variam entre fontes e clientes; o que importa é o sistema dizer qual sigma usou.

E existe norma para quando o processo não é estável nem normal: o resumo público da ISO 22514-2:2026 diz que ela descreve um procedimento para estimar [capacidade ou desempenho em particular quando o processo não está sob controle estatístico](https://committee.iso.org/standard/88883.html?browse=ics), com oito tipos possíveis de distribuição. O texto da norma não foi lido; se o seu cliente exige essa norma, peça ao fornecedor do sistema que mostre como a atende.

### O que a empresa precisa escrever

- **Qual sigma em cada índice.** Dentro dos subgrupos (R̄ ÷ d2 ou outro estimador) e global (desvio-padrão de todas as medições). Escrito na tela, ao lado do número.
- **Qual período.** Os subgrupos do estudo, os últimos 30 dias, o lote do cliente? Com subgrupos que sinalizaram, ou sem?
- **Condições para mostrar.** O que o sistema faz se o período teve sinais, se o teste de normalidade escolhido pela empresa rejeita a normalidade, ou se há menos dados que o mínimo da empresa: calcula com aviso, calcula outro índice, ou não calcula.
- **Teste de normalidade.** Qual teste, qual nível de significância, quem escolheu. Este artigo não escolhe.
- **Arredondamento.** Quantas casas, e se o relatório ao cliente usa o mesmo número da tela.

**Recomendação da Torno.** Nunca mostre um Cpk sozinho. Mostre ao lado o período, o número de medições, o sigma usado, o resultado do teste de normalidade e se houve sinais no período. Um Cpk sem esse contexto não pode ser conferido, e a planilha antiga vai continuar sendo a "fonte da verdade". Se o número do sistema não bater com o da planilha, trate como no artigo sobre [números divergentes entre painel e ERP](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/): primeiro as definições, depois os dados.

Este artigo não diz qual valor de Cpk é bom. A meta vem do cliente, do contrato ou da engenharia da empresa.

## Reação ao sinal: o que acontece depois do alarme

Um sinal sem reação registrada é só um ponto vermelho. O NIST e os fornecedores tratam do sinal; o que se faz depois é decisão da empresa, e é a parte que mais falta nas especificações.

Defina:

- **Quem é avisado e como.** Operador na tela da máquina, líder por mensagem, qualidade por e-mail. Em quanto tempo alguém precisa reconhecer o sinal.
- **O que o operador faz primeiro.** Para a máquina? Mede de novo? Continua produzindo e chama o líder? Escreva por tipo de sinal, porque um ponto além de 3 sigma e um padrão de 8 pontos do mesmo lado não pedem a mesma urgência.
- **Quais peças ficam sob suspeita.** Desde o último subgrupo sem sinal? Desde o início do turno? O sistema calcula e mostra a quantidade e onde elas estão.
- **Registro da reação.** Causa (lista da empresa com campo livre), ação, quem, quando, subgrupo de confirmação. O sinal só fecha com causa e ação, ou com "causa não encontrada" registrada como tal.
- **Liberação das peças sob suspeita.** Quem libera, com que evidência (medição de todas, por exemplo). A permissão segue as regras de [perfis e permissões](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Parada.** Se a reação parou a máquina, a parada entra no apontamento e no [OEE](https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/) com o motivo; como medi-la é assunto daquele artigo.

**Recomendação da Torno.** Faça do registro de reação um objeto do sistema, ligado ao subgrupo que sinalizou, e não um campo de observação na planilha. É ele que vai ser pedido numa auditoria.

## RNC e calibração: ligar sem duplicar

O CEP encosta em dois processos que já têm dono:

- **Não conformidade.** Quando uma medida individual sai da tolerância, ou quando a investigação de um sinal acha peça ruim, o sistema abre (ou propõe abrir) uma RNC já preenchida com item, característica, medição, subgrupo e quantidade sob suspeita. Contenção, disposição e ação corretiva seguem o fluxo descrito no artigo sobre [RNC e ação corretiva](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/). O CEP não repete esse fluxo; guarda o vínculo nos dois sentidos.
- **Calibração.** O subgrupo registra o instrumento. O sistema recusa (ou alerta, conforme a regra da empresa) medição com instrumento vencido ou bloqueado. Quando o instrumento reprova, a lista de subgrupos medidos com ele sai da carta para a avaliação de impacto da [calibração](https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/).

O que precisa ficar escrito é o gatilho, não o fluxo: **o que no CEP abre RNC, e o que só abre registro de reação.** No exemplo abaixo, a diferença aparece em dois subgrupos seguidos.

## Dado de máquina, de medidor ou digitado

A medição pode chegar de três jeitos, e cada um tem seus erros:

- **Digitada.** Vírgula no lugar errado, 20,40 em vez de 20,004, campo trocado. Defina uma faixa plausível por característica, mais larga que a tolerância, fora da qual o sistema pede confirmação ou recusa. E o que acontece com a medida digitada fora de hora.
- **Do medidor.** Paquímetro, micrômetro ou calibrador com saída de dados, ligado ao posto. Defina o que identifica o instrumento e o que fazer se a mesma leitura chegar duas vezes; é o problema do [evento recebido em dobro](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/), com a mesma resposta: efeito único.
- **Da máquina.** Medição em processo, sonda na máquina, sistema de visão. O artigo sobre [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/) trata do que definir antes da integração. Aqui, a pergunta é como essas leituras viram subgrupos: quantas, de quais peças, com qual carimbo de tempo.

Qualquer que seja a origem, a medição guarda quem ou o que a gerou, quando e com qual instrumento, e não é apagada; é corrigida com registro.

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Quais características vão para CEP e qual plano de amostragem | Qualidade, com engenharia de processo |
| Especificação (nominal, LIE, LSE) e revisão do desenho | Engenharia do produto |
| Instrumento e faixa plausível de digitação | Qualidade e metrologia |
| Tamanho e composição do subgrupo | Qualidade, com engenharia de processo |
| Tipo de carta por característica | Qualidade |
| Período e dados da fase de estudo; aprovação dos limites | Qualidade |
| Gatilhos de recálculo e exclusão de subgrupos | Qualidade |
| Regras de sinal ligadas e seus parâmetros | Qualidade, com produção |
| O que o operador faz no sinal e quem é avisado | Produção e qualidade |
| Quais peças ficam sob suspeita e quem as libera | Qualidade |
| Sigma, período, teste de normalidade e arredondamento dos índices | Qualidade |
| Gatilho de abertura de RNC a partir do CEP | Qualidade |
| Origem dos dados e integração com medidor e máquina | Qualidade e TI, com o fornecedor do equipamento |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. torneia o eixo EX-12 no torno TC-04. A característica controlada é o diâmetro Ø 20,000 ± 0,050 mm (LIE 19,950; LSE 20,050), medido com micrômetro de resolução 0,001 mm.

Regras da empresa (escolhas do exemplo, não recomendação):

- **Subgrupo e carta.** 5 peças seguidas, uma vez por hora; carta X̄-R.
- **Estudo.** 25 subgrupos, de 09 a 11/11/2026, mesma ferramenta e mesmo lote de barra. Limites calculados com todos os dígitos e mostrados com 4 casas. Aprovação pela qualidade.
- **Regras de sinal ligadas.** Um ponto além de 3 sigma, nas duas cartas; 8 pontos seguidos do mesmo lado da linha central, só na carta de médias.
- **Reação.** No sinal, o operador para a máquina e chama o líder; as peças produzidas desde o último subgrupo sem sinal ficam retidas até a qualidade decidir; um subgrupo de confirmação é medido depois da ação.
- **Recálculo.** Nunca automático. Revisão proposta pela qualidade após mudança de processo; subgrupos com causa atribuída ficam fora do recálculo.
- **Dados.** Subgrupo com menos de 5 medições fica marcado como incompleto e fora do cálculo dos limites. Faixa plausível de digitação de 19,900 a 20,100 mm; fora dela, o sistema recusa e pede nova leitura. Medição com instrumento vencido ou bloqueado é recusada.
- **Capacidade.** Cp e Cpk com sigma dentro (R̄ ÷ d2); Pp e Ppk com o desvio-padrão de todas as medições; teste de normalidade de Shapiro-Wilk, escolhido pela qualidade da empresa do exemplo, com nível de 5%; se o período tiver sinais, os índices saem com aviso e a lista dos sinais.

**As contas do estudo.** Os 25 subgrupos (125 medições, de 19,980 a 20,034) dão X̄̄ = 20,00395 e R̄ = 0,02272. Carta de médias: 20,00395 ± 0,577 × 0,02272 = 20,00395 ± 0,01311, ou seja, **LSC 20,0171 e LIC 19,9908**, linha central 20,0040. Carta de amplitudes: **LSC 2,115 × 0,02272 = 0,0481**, LIC 0, linha central 0,0227. Nenhum subgrupo do estudo sinaliza pelas regras ligadas. A qualidade aprova os limites, versão 1, em 11/11/2026.

**A capacidade do estudo.** Sigma dentro = 0,02272 ÷ 2,326 = 0,00977. **Cp** = 0,100 ÷ (6 × 0,00977) = **1,71**. A média está acima do nominal, então o lado que manda é o superior: **Cpk** = (20,050 − 20,00395) ÷ (3 × 0,00977) = **1,57**. O desvio-padrão das 125 medições é 0,01008, um pouco maior que o sigma dentro, porque inclui a variação entre subgrupos: **Pp 1,65 e Ppk 1,52**. O teste de Shapiro-Wilk nas 125 medições dá p = 0,72, e a normalidade não é rejeitada pela regra da empresa.

![Ilustração de uma carta de controle X̄-R do diâmetro do eixo fictício EX-12, da Metalúrgica Exemplo Ltda., torno TC-04, com 5 peças seguidas por hora. Em cima, a carta de médias com 33 pontos: os subgrupos 1 a 25, da fase de estudo, em preto, e os 26 a 33, do monitoramento, em azul, sobre um fundo sombreado. Linhas horizontais marcam o limite superior de controle, 20,0171, a linha central, 20,0040, e o limite inferior, 19,9908, e uma linha tracejada laranja marca mais 2 sigma, 20,0127. Os subgrupos 29 e 30 aparecem como círculos laranja vazios, acima de mais 2 sigma; o 31, em vermelho, com média 20,0198, acima do limite superior. Embaixo, a carta de amplitudes, com limite superior 0,0481, linha central 0,0227 e limite inferior 0; o subgrupo 33, em vermelho, com amplitude 0,054, acima do limite. A legenda diz que vermelho é sinal pelas regras ligadas na empresa e que os círculos laranja só dariam sinal com a regra 2 de 3. No rodapé, as contas: limite superior igual a 20,00395 mais 0,577 vezes 0,02272, igual a 20,0171; limite inferior 19,9908; limite superior da amplitude 2,115 vezes 0,02272, igual a 0,0481; regras ligadas: ponto além de 3 sigma e 8 seguidos do mesmo lado; limites versão 1. Exemplo fictício.](./torno-cep-carta-xbar-r.svg)

*Exemplo fictício: peça, máquina e medições inventadas; os limites vêm da fase de estudo aprovada e não mudam com os pontos novos, e o que é sinal depende das regras que a empresa ligou. Ilustração original Torno, 2026.*

**O monitoramento de 12/11/2026.** Os subgrupos 26 a 30, das 7h às 11h, ficam dentro dos limites, com médias que tendem a subir: 20,0064, 20,0060, 20,0080, 20,0138 e 20,0156. Os subgrupos 29 e 30 estão acima de +2 sigma da média (20,0127); com a regra "2 de 3 além de 2 sigma", o 30 daria sinal, mas essa regra não está ligada na empresa do exemplo. Às 12h, o subgrupo 31 mede 20,024, 20,015, 20,021, 20,027 e 20,012: média **20,0198, acima do LSC 20,0171**. Todas as cinco peças estão dentro da tolerância.

**A reação ao subgrupo 31.** O operador para o TC-04 às 12h. As 40 peças feitas entre 11h e 12h ficam retidas. Às 12h20, o líder registra a causa: desgaste da aresta do inserto. Às 12h25, o inserto é trocado. Às 12h40, o subgrupo 32 de confirmação dá média 20,0008, dentro. As 40 peças retidas são medidas uma a uma, de 20,004 a 20,036, todas dentro da tolerância, e a qualidade as libera às 13h10. Nenhuma RNC é aberta. O subgrupo 31 fica marcado como "causa atribuída" e sai do próximo recálculo.

**O subgrupo 33.** Às 13h40, o subgrupo 33 mede 20,002, 19,998, **20,052**, 20,006 e 20,001. A média, 20,0118, está dentro dos limites; a amplitude, **0,054, está acima do LSC da carta R, 0,0481**. E a terceira peça está acima do LSE 20,050. São dois fatos: a peça é não conforme e vai para a RNC-2026-0147, aberta pelo sistema com o subgrupo, a medida e as peças sob suspeita; e a carta de amplitudes sinalizou, o que abre um registro de reação ligado à RNC.

![Ilustração de duas réguas horizontais na mesma escala, de 19,940 a 20,060 milímetros, para o diâmetro do eixo fictício EX-12, desenho 20,000 mais ou menos 0,050. Régua 1, cada peça contra o desenho: uma faixa verde de tolerância entre o limite inferior de especificação, 19,950, e o superior, 20,050; as cinco peças do subgrupo 31, de 20,012 a 20,027, como pontos azuis dentro da faixa; no subgrupo 33, quatro pontos azuis perto de 20,000 e um ponto vermelho em 20,052, fora da faixa. Régua 2, a média de 5 peças contra a carta: uma faixa azul bem mais estreita, entre o limite inferior de controle, 19,9908, e o superior, 20,0171, com a tolerância tracejada em verde para comparação; um triângulo vermelho marca a média do subgrupo 31, 20,0198, fora da faixa, e um triângulo azul a média do 33, 20,0118, dentro. Abaixo, as conclusões: no 31, peças dentro e média fora do limite, reação no processo, sem RNC; no 33, uma peça fora, média dentro e amplitude 0,054 maior que 0,0481, RNC da peça e reação no processo. No rodapé, a capacidade do estudo: sigma dentro igual a 0,02272 dividido por 2,326, igual a 0,00977; Cp 1,71 e Cpk 1,57 com sigma dentro; Pp 1,65 e Ppk 1,52 com sigma global de 0,01008. Exemplo fictício.](./torno-cep-duas-reguas.svg)

*Exemplo fictício: medições inventadas; a tolerância julga cada peça, o limite de controle julga a média do subgrupo, e as duas checagens podem dar resultados diferentes. Ilustração original Torno, 2026.*

![Ilustração de uma maquete de tela de registro de reação, marcada como maquete e não como tela de produto, para o sinal na carta do diâmetro do eixo fictício EX-12, torno TC-04. No cabeçalho azul: sinal, subgrupo 31, 12/11/2026, 12h00. Campos: regra, ponto acima do limite superior de controle; valor, média 20,0198 maior que 20,0171, em vermelho; limites, versão 1, aprovados em 11/11; retidas, 40 peças, das 11h00 às 12h00; causa, desgaste da aresta do inserto; ação, troca do inserto às 12h25; confirmação, subgrupo 32 às 12h40, média 20,0008, ok; medição 100%, 40 peças de 20,004 a 20,036; decisão, liberadas pela qualidade às 13h10; RNC, não, nenhuma peça fora; recálculo, subgrupo 31 fica de fora. Abaixo, o histórico: 12h00, sinal e operador para o TC-04; 12h20, causa registrada pelo líder; 12h25, inserto trocado; 12h40, confirmação dentro; 13h10, 40 peças liberadas. No pé, um cartão vermelho: subgrupo 33 às 13h40, amplitude 0,054 maior que o limite da carta R, 0,0481; peça 3 com 20,052, acima do limite superior de especificação, 20,050; RNC-2026-0147 aberta, tratada no fluxo de não conformidade. Exemplo fictício.](./torno-cep-registro-reacao.svg)

*Exemplo fictício: horários, peças, causa e número de RNC inventados; a reação é um registro ligado ao subgrupo que sinalizou, e só a peça fora da tolerância abre RNC. Ilustração original Torno, 2026.*

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com características, subgrupos e medições fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cadastro da característica sem LIE e LSE, sem tamanho de subgrupo ou sem tipo de carta | Recusado | Tentativa recusada com o motivo |
| Cálculo dos limites com os 25 subgrupos do estudo | X̄̄ 20,00395; R̄ 0,02272; LSC 20,0171; LIC 19,9908; LSC(R) 0,0481; LIC(R) 0; com n = 5 e as constantes usadas na tela | Tela do cálculo com a conta inteira |
| Limites calculados, ainda sem aprovação | Proposta aguardando a qualidade; a carta não sinaliza em monitoramento | Tela da proposta e da carta |
| Subgrupo do estudo com 4 medições em vez de 5 | Marcado como incompleto; fica fora do cálculo dos limites | Lista de subgrupos do estudo |
| Subgrupos 29 e 30 com as regras ligadas da empresa | Nenhum sinal | Carta e lista de sinais |
| Mesma sequência (subgrupos 26 a 30) em homologação com a regra "2 de 3 além de 2 sigma" ligada | Sinal no subgrupo 30, com 29 e 30 indicados como o padrão | Carta e lista de sinais |
| Subgrupo 31 (média 20,0198) | Sinal na carta de médias; registro de reação aberto; 40 peças retidas; aviso ao líder | Registro de reação e aviso |
| Tentativa de fechar a reação do 31 sem causa e ação | Recusada | Tentativa recusada |
| Subgrupo 32 de confirmação (média 20,0008) | Dentro; ligado ao registro de reação do 31 | Registro de reação |
| Operador tenta liberar as 40 peças retidas | Negado; só a qualidade libera, com evidência | Tentativa negada |
| Subgrupo 33 com a peça de 20,052 | Peça fora da tolerância no lançamento; RNC-2026-0147 aberta com subgrupo e medida; sinal na carta R (0,054 > 0,0481); reação ligada à RNC; média 20,0118 sem sinal | RNC, registro de reação e carta |
| Digitação de 20,40 em vez de 20,004 | Recusada fora da faixa plausível de 19,900 a 20,100; nova leitura pedida | Tentativa recusada |
| Medidor envia a mesma leitura duas vezes | Uma medição registrada; a repetida fica no log | Subgrupo e log de integração |
| Medição com micrômetro de calibração vencida | Recusada, com aviso à qualidade | Tentativa recusada |
| Correção de uma medida do subgrupo 27 por erro de digitação comprovado | Valor antigo e novo, quem, quando e motivo na trilha; limites v1 não mudam | Trilha de auditoria |
| Fim do subgrupo 33 sem pedido de revisão | Limites continuam v1; nenhum recálculo automático | Histórico de versões dos limites |
| Proposta de revisão dos limites com os subgrupos 1 a 33 | Subgrupo 31, com causa atribuída, fora do cálculo; proposta lado a lado com a v1, aguardando aprovação | Tela da proposta |
| Relatório de capacidade do estudo | Cp 1,71; Cpk 1,57; Pp 1,65; Ppk 1,52; com período, 125 medições, sigma de cada índice e Shapiro-Wilk p = 0,72 | Relatório |
| Relatório de capacidade de 12/11, incluindo os subgrupos 31 e 33 | Índices com aviso de que o período tem sinais e a lista deles | Relatório |
| Mudança do LSE no cadastro para 20,040 (nova revisão do desenho) | Limites de controle não mudam; Cp e Cpk recalculados com a nova especificação; registro da revisão | Tela da característica e relatório |
| Usuário sem permissão tenta desligar a regra de 8 pontos | Negado; só a qualidade altera, com motivo, em nova versão da configuração | Tentativa negada |

*Fim do exemplo fictício. Empresa, peça, máquina, instrumento, especificação, medições, datas, horários, causas, número de RNC e decisões são modelo editorial, sem processo real, cliente ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não regras de sinal, tamanho de subgrupo, frequência, teste de normalidade ou metas de capacidade recomendados, nem comportamento padrão de ferramenta.*

Antes do go-live, importe o histórico da planilha de CEP num ambiente de teste e recalcule, característica por característica: os limites da planilha batem com os do sistema? A planilha recalculava os limites a cada linha? O Cpk da planilha usava qual sigma? A importação segue os cuidados de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/). Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Quais regras de sinal devo ligar?

Este artigo não responde. O NIST mostra que cada regra a mais aumenta os alarmes falsos, e a ajuda do Minitab diz para escolher os testes conforme os padrões que se esperam no processo. O que o sistema precisa é deixar a escolha por característica, guardar a versão e mostrar qual regra deu cada sinal.

### O Cpk pode ser calculado com o processo fora de controle?

As fórmulas do NIST pressupõem processo sob controle e distribuição normal. Um sistema pode calcular o número de qualquer jeito; a questão é o que ele significa. Defina se o sistema calcula com aviso, usa outro índice ou não calcula, e confira com o cliente qual norma ou manual ele exige. A ISO 22514-2, pelo seu resumo, trata justamente de processos que não estão sob controle estatístico.

### Um software de CEP pronto resolve, ou preciso de sistema sob medida?

Depende de onde estão as regras que você escreveu. Um software de CEP de prateleira costuma cobrir bem as cartas, as regras de sinal e os índices. O que costuma faltar está nas pontas: o vínculo com a ordem de produção, o bloqueio por calibração, a abertura da RNC, as peças retidas no estoque, a integração com o medidor. Leve a lista de regras e os critérios de aceite para a demonstração, e veja cada um funcionando com os seus dados fictícios.

Para transformar a planilha de CEP e as folhas de verificação em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a lista de características controladas, um exemplo da planilha atual e o caso mais recente de ponto fora de controle ou de peça fora da tolerância, sem dados confidenciais de clientes.

*Fontes consultadas em 19 de novembro de 2026: NIST/SEMATECH e-Handbook of Statistical Methods, seções 6.1.6, 6.3.2, 6.3.2.1, 6.3.3 e 6.3.3.1; ISO, resumos públicos da ISO 7870-2:2023 e da ISO 22514-2:2026 (texto das normas não lido); Minitab Support, páginas sobre subgrupos, testes para causas especiais, constantes de não viés, carta I-MR, capacidade potencial e global, limites de controle, cartas de atributos, estágios e cálculo de limites no Real-Time SPC; SAS/QC User's Guide, "Standard Tests for Special Causes". O artigo de Nelson (1984) e o livro de Montgomery não foram lidos. Este artigo não prescreve regras de sinal, tamanho de subgrupo nem metas de Cpk e não recomenda sistema nem fornecedor; empresas, peças, números e ilustrações são fictícios.*
