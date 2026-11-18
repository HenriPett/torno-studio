---
content_id: torno-artigo-pt-20261118-inspecao-recebimento
intent_id: buyer-receiving-inspection-sampling-plan-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Inspeção de recebimento no sistema: o que definir e testar antes de automatizar'
h1: 'Inspeção de recebimento no sistema: o que definir e testar antes de automatizar'
seo_title: 'Inspeção de recebimento e amostragem (NQA): sistema e aceite | Torno'
seo_description: 'Material em inspeção fora do MRP, plano por item e fornecedor, NQA, Ac/Re e troca de regime, laudo, devolução, concessão e certificado: o que testar.'
summary: 'Roteiro para a indústria que vai tirar a inspeção de recebimento da planilha e do papel e levá-la para um sistema: quando o material recebido entra em inspeção e fica indisponível para uso e para o MRP; plano de inspeção por item e fornecedor (características, método, instrumento, classe de defeito); plano de amostragem por atributos com NQA, nível de inspeção, letra-código, números de aceitação e rejeição, regimes normal, severo e atenuado e regras de troca, como regra escolhida pela empresa a partir da norma que ela adota; registro do resultado e das medições, com o instrumento calibrado; decisões de aprovar, rejeitar, devolver, selecionar 100% ou usar sob concessão, e o vínculo com a RNC; certificado do fornecedor versus inspeção própria; histórico do fornecedor e skip-lote; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema a inspeção de recebimento, para que o bloqueio do material em inspeção, o plano de amostragem com NQA e troca de regime, o registro do resultado e as decisões sobre cada lote do fornecedor sejam confiáveis?
proposed_path: /blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/
canonical_url: https://tornostudio.com/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, gerentes e coordenadores de qualidade, compras, almoxarifado e operações, inspetores de recebimento, PCP e TI de indústrias pequenas e médias que vão contratar, especificar, ajustar ou aceitar um sistema (módulo de ERP, software de gestão da qualidade ou sistema sob medida) para controlar a inspeção de recebimento de materiais comprados, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha ou a ficha em papel da inspeção de recebimento por bloqueio de estoque, plano de amostragem, registro de resultados e decisão de lote no sistema.
scope: O que a ISO 9001:2015 pede em 8.4.1 e 8.4.2 pelo que é verificável em fonte pública, e a existência da edição de 2026; propósito da amostragem de aceitação (NIST/SEMATECH e-Handbook); MIL-STD-105E (domínio público) como fonte das definições e regras de troca citadas; existência e escopo de ABNT NBR 5426, ISO 2859-1:2026 e ANSI/ASQ Z1.4 sem reproduzir tabelas; NQA, nível de inspeção, letra-código, Ac/Re, regimes normal, severo e atenuado, interrupção e regras de troca; probabilidade de aceitação de um plano simples (fórmula binomial); skip-lote; estados do material recebido e bloqueio de uso e do MRP; plano de inspeção por item e fornecedor; classes de defeito; sorteio da amostra; registro do resultado e do instrumento; decisões sobre o lote e ligação com a RNC; certificado do fornecedor; histórico do fornecedor; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Prescrição de NQA, nível de inspeção, classe de defeito, plano de amostragem ou regra de troca; reprodução de tabelas de normas pagas; amostragem por variáveis (Z1.9, ISO 3951) e amostragem para inspeção de processo ou final; interpretação do texto integral da ISO 9001 (edições 2015 e 2026), da ABNT NBR 5426, da ISO 2859-1 ou da ANSI/ASQ Z1.4, que não foram lidos; parecer de certificação, regulatório ou contratual; homologação e avaliação inicial de fornecedores, auditoria de fornecedor e PPAP; tratamento da não conformidade, calibração, MRP, lote e validade no estoque, trilha de auditoria e fluxo de aprovação em geral (cobertos em outros artigos); recomendação ou comparação de ERP, software de qualidade ou fornecedor (a documentação de um fornecedor aparece só como exemplo de modelagem).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-18T15:16:00Z'
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
  - path: https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/
    reason: Trata o controle de calibração do instrumento e o bloqueio de instrumento vencido ou reprovado; aqui o registro de qual instrumento mediu cada característica da amostra.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata abertura, contenção, disposição, concessão e ação corretiva da não conformidade; aqui a decisão sobre o lote rejeitado na inspeção de recebimento, que abre a RNC contra o fornecedor.
  - path: https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/
    reason: Trata o cálculo de necessidade de materiais e cita o material em inspeção como recebimento a liberar; aqui a regra que define quando o material entra e sai desse estado.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade, quarentena e rastreio no estoque; aqui a inspeção que decide se o lote sai do bloqueio.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Trata leitura de códigos no sistema; aqui a leitura da etiqueta da caixa sorteada para a amostra.
  - path: https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/
    reason: Trata envio, guarda e consulta de arquivos; aqui o certificado do fornecedor anexado ao lote.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode alterar plano de inspeção, NQA e regime do fornecedor.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a decisão sobre o lote e a troca de regime precisam registrar.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a alçada para concessão e uso condicional de lote rejeitado.
  - path: https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
    reason: Trata o controle físico e fiscal do material enviado a terceiro; aqui o retorno do terceiro que também pode passar por inspeção de recebimento.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas e o tratamento de linhas com erro; aqui a migração dos planos de inspeção da planilha.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com fornecedores, itens e lotes fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de inspeção de recebimento.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a rotina de inspeção de recebimento em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'Segundo a reprodução publicada pela Auditor Training Online, a ISO 9001:2015, em 8.4.1, pede que a organização assegure que processos, produtos e serviços providos externamente estejam conformes com os requisitos, e que determine e aplique critérios para avaliação, seleção, monitoramento de desempenho e reavaliação de provedores externos com base na capacidade de fornecer conforme os requisitos; e, em 8.4.2, que assegure que eles não afetem adversamente a capacidade de entregar produtos conformes e que determine a verificação, ou outras atividades, necessárias para assegurar que atendem aos requisitos.'
    reference: https://blog.auditortrainingonline.com/blog/iso-9001-8-4
    entity: 'Auditor Training Online, "ISO 9001 Clause 8.4 Control of externally provided processes, products and services" (Jackie Stapleton, 11/12/2023)'
    source_date: '2023-12-11'
    checked_at: '2026-11-18T15:06:00Z'
    limit: 'Reprodução de terceiro, em inglês, de trechos da norma paga; o texto da ABNT NBR ISO 9001:2015 não foi lido. Tradução livre da Torno. Não é interpretação de auditoria ou de certificação.'
  - classification: FATO
    claim: 'A página da ISO sobre a ISO 9001 informa que a edição de 2026 é a sexta e a vigente, publicada em 16/09/2026, e que organizações certificadas devem migrar no prazo definido pelo seu ciclo de certificação, consultando o organismo certificador.'
    reference: https://www.iso.org/standard/9001
    entity: 'ISO, página da norma ISO 9001'
    source_date: '2026-09-16'
    checked_at: '2026-11-18T15:05:00Z'
    limit: 'A página não mostra texto de cláusula; não foi verificado se a numeração 8.4 ou o conteúdo mudaram na edição de 2026. A página "ISO 9001:2026: What businesses need to know" não abriu.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook of Statistical Methods diz que o propósito da amostragem de aceitação é decidir se o lote provavelmente é aceitável, não estimar a qualidade do lote; que ela fica entre não inspecionar e inspecionar 100%; e que é usada quando o ensaio é destrutivo, quando o custo da inspeção 100% é muito alto ou quando a inspeção 100% demora demais.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.2.1 "What is Acceptance Sampling?"'
    source_date: null
    checked_at: '2026-11-18T15:04:00Z'
    limit: 'Página sem data visível. Tradução livre da Torno.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook (6.2.3.1) diz que a MIL-STD-105D foi emitida em 1963, adotada como ANSI Z1.4 em 1971 e, com pequenas mudanças, como ISO 2859 em 1974; que a revisão mais recente é a 105E; que a norma oferece três níveis gerais e quatro especiais de inspeção, que determinam a relação entre tamanho do lote e tamanho da amostra; que ela não dá o tamanho da amostra diretamente, mas uma letra-código; e que um esquema combina planos normal, severo e atenuado com regras de troca, começando pela inspeção normal.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section2/pmc231.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.2.3.1 "Choosing a Sampling Plan: MIL Standard 105D"'
    source_date: null
    checked_at: '2026-11-18T14:58:00Z'
    limit: 'Página sem data visível; descreve a família MIL-STD-105, não a ABNT NBR 5426 nem a ISO 2859-1:2026. Tradução livre da Torno.'
  - classification: FATO
    claim: 'A MIL-STD-105E (10/05/1989, aprovada para divulgação pública, distribuição ilimitada) define NQA (AQL) como o nível de qualidade que, para fins de inspeção por amostragem, é o limite de uma média de processo satisfatória (3.1); diz que a escolha ou o uso de um NQA não implica direito de fornecer qualquer unidade defeituosa (4.4.2); permite NQA diferentes por grupo de defeitos ou por defeito (4.4.3), com classes crítico, maior e menor (3.4, 3.5, 3.14, 3.16); diz que normalmente se usa o nível II (4.9.1); que a inspeção começa no regime normal (4.6); que o lote é aceito se o número de defeituosos for igual ou menor que o número de aceitação e rejeitado se for igual ou maior que o número de rejeição (4.10.1.1); que as unidades da amostra são escolhidas ao acaso, sem considerar sua qualidade (3.20); e traz as regras de troca: normal para severo quando 2 de 2, 3, 4 ou 5 lotes consecutivos forem rejeitados na inspeção original (4.7.1); severo para normal após 5 lotes consecutivos aceitos (4.7.2); normal para atenuado quando os 10 lotes anteriores foram aceitos em inspeção normal, o total de defeituosos está dentro do limite da Tabela VIII, a produção está em ritmo estável e o atenuado é considerado desejável (4.7.3); atenuado para normal quando um lote é rejeitado, um lote é considerado aceitável sem ter atingido nem o critério de aceitação nem o de rejeição do atenuado (4.10.1.4), a produção fica irregular ou atrasada, ou outras condições justificam (4.7.4); e interrupção dos procedimentos de aceitação quando o número acumulado de lotes não aceitos no regime severo chega a cinco, voltando ao severo só após ação corretiva (4.8).'
    reference: https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf
    entity: 'Departamento de Defesa dos EUA, MIL-STD-105E "Sampling Procedures and Tables for Inspection by Attributes" (10/05/1989), cópia no DTIC; cancelada e substituída, segundo a EverySpec, pela MIL-STD-1916 e pela ANSI/ASQ Z1.4'
    source_date: '1989-05-10'
    checked_at: '2026-11-18T15:10:00Z'
    limit: 'Lida pela ferramenta de leitura com trechos literais; as tabelas (I, II-A, II-B, II-C, VIII) ficaram ilegíveis na extração e não foram usadas. Norma cancelada, citada como texto público da família de normas, não como norma vigente para a empresa. O download direto do PDF pela linha de comando foi recusado pelo proxy da sessão. Tradução livre da Torno.'
  - classification: FATO
    claim: 'A ASQ informa que a ANSI/ASQ Z1.4 é o padrão mais usado para planos de amostragem por atributos, com a edição Z1.4-2008 no histórico; que, quando o Departamento de Defesa dos EUA deixou de manter a MIL-STD-105E em 1995, recomendou a Z1.4; e que planos por atributos aceitam ou rejeitam um lote contando unidades com ou sem uma característica, enquanto planos por variáveis usam as medições.'
    reference: https://asq.org/quality-resources/sampling/attributes-variables-sampling
    entity: 'ASQ, "Attribute & Variable Sampling Plans and Inspection Procedures"'
    source_date: null
    checked_at: '2026-11-18T15:12:00Z'
    limit: 'Página sem data visível; a norma Z1.4 (paga) não foi lida.'
  - classification: FATO
    claim: 'A ISO publicou em janeiro de 2026 a terceira edição da ISO 2859-1 (ISO 2859-1:2026, "Sampling schemes indexed by acceptance quality limit (AQL) for lot-by-lot inspection"), do ISO/TC 69/SC 5, que substitui a edição de 1999 e suas emendas; a prévia pública do documento diz, no prefácio, que a revisão acrescentou um procedimento de passagem da inspeção normal (ou atenuada) para inspeção skip-lote, orientação sobre a qualificação de produtor e produto para skip-lote, e retirou as curvas características de operação de cada plano em favor de métodos para calculá-las.'
    reference: https://www.iso.org/standard/85464.html
    entity: 'ISO, página da ISO 2859-1:2026; prévia do documento na loja da ANSI (https://webstore.ansi.org/preview-pages/ISO/preview_ISO+2859-1-2026.pdf)'
    source_date: '2026-01'
    checked_at: '2026-11-18T15:13:00Z'
    limit: 'Só a página da norma e a prévia (capa, prefácio, sumário e introdução) foram lidas; as tabelas e as regras de troca da edição de 2026 não foram lidas.'
  - classification: FATO
    claim: 'Artigo da Quality Magazine sobre a terceira revisão da ISO 2859-1 diz que as tabelas de planos de amostragem foram modificadas para melhorar a usabilidade e que o skip-lote acrescenta mais um passo às regras de troca.'
    reference: https://www.qualitymag.com/articles/99511-third-revision-of-iso-2859-1
    entity: 'Quality Magazine, "Third Revision of ISO 2859-1" (John Vandenbemden, 10/04/2026)'
    source_date: '2026-04-10'
    checked_at: '2026-11-18T15:14:00Z'
    limit: 'Artigo anterior à publicação final informada pela ISO; não diz quais valores ou leiautes das tabelas mudaram.'
  - classification: FATO
    claim: 'A vinheta do pacote R AQLSchemes (versão 1.7-2, publicada em 13/09/2023, autor John Lawson, escrito para a disciplina Stat 462 da Brigham Young University), que recupera planos das tabelas da MIL-STD-105E (ANSI/ASQ Z1.4), mostra que o plano simples de inspeção normal, nível II, para lotes de 3.201 a 10.000 unidades e NQA de 1,5% é n = 200 com número de aceitação 7 e de rejeição 8, e que o plano severo correspondente é n = 200 com número de aceitação 5.'
    reference: https://mirror.csclub.uwaterloo.ca/CRAN/web/packages/AQLSchemes/vignettes/AQLSchemes.pdf
    entity: 'John Lawson, vinheta do pacote AQLSchemes, espelho do CRAN; página do pacote em https://cloud.r-project.org/web/packages/AQLSchemes/index.html'
    source_date: '2023-09-13'
    checked_at: '2026-11-18T15:02:00Z'
    limit: 'Material de terceiro que reproduz valores de tabela; não foi conferido contra a ABNT NBR 5426, a ISO 2859-1:2026 ou a ANSI/ASQ Z1.4, que não foram lidas. A vinheta não dá o plano atenuado, a letra-código nem o número de rejeição do plano severo (Re 6 no texto decorre de Re = Ac + 1 no plano simples); a vinheta não nomeia o autor, que consta da página do pacote no CRAN. Uma tabela pública consultada na revisão (QC Advisor) confirma só n = 200 para lotes de 3.201 a 10.000 no nível II; os números de aceitação não foram confirmados em segunda fonte legível. A data é a da versão do pacote; a vinheta não tem data própria.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook (6.2.3.2) diz que, num plano simples, a probabilidade de aceitação é a probabilidade de o número de defeituosos na amostra ser menor ou igual ao número de aceitação c, calculada pela distribuição binomial quando o lote é muito maior que a amostra.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section2/pmc232.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.2.3.2 "Choosing a Sampling Plan with a given OC Curve"'
    source_date: null
    checked_at: '2026-11-18T15:03:00Z'
    limit: 'Página sem data visível; as probabilidades do exemplo foram calculadas pela Torno com essa fórmula.'
  - classification: FATO
    claim: 'O NIST/SEMATECH e-Handbook (6.2.7) diz que a amostragem skip-lote inspeciona só uma fração dos lotes submetidos, que só deve ser usada quando se demonstrou que a qualidade do produto é muito boa, que começa com inspeção normal lote a lote, passa a inspecionar uma fração f de lotes sorteados depois de i lotes consecutivos aceitos, e volta à inspeção normal quando um lote é rejeitado.'
    reference: https://itl.nist.gov/div898/handbook/pmc/section2/pmc27.htm
    entity: 'NIST/SEMATECH e-Handbook of Statistical Methods, seção 6.2.7 "What is Skip Lot Sampling?"'
    source_date: null
    checked_at: '2026-11-18T15:15:00Z'
    limit: 'Página sem data visível; descreve o método em termos gerais, não a regra de skip-lote da ISO 2859-1:2026 nem da ISO 2859-3.'
  - classification: FATO
    claim: 'A dissertação de mestrado "A Informatização do Controle da Qualidade na Área de Recebimento e Inspeção de Materiais" (Daniel Madureira Rodrigues Siqueira, EESC-USP, 1998) descreve a ABNT NBR 5426 como norma que estabelece planos de amostragem e procedimentos para inspeção por atributos, com NQA, código literal do tamanho da amostra, três níveis gerais (I, II e III) e quatro especiais (S1 a S4), nível II salvo indicação em contrário, e inspeção normal, severa e atenuada.'
    reference: https://teses.usp.br/teses/disponiveis/18/18140/tde-11062024-175644/publico/Siqueira_DanielMadureiraRodrigues_dissert.pdf
    entity: 'Universidade de São Paulo, Escola de Engenharia de São Carlos, dissertação de Daniel Madureira Rodrigues Siqueira (1998)'
    source_date: '1998'
    checked_at: '2026-11-18T15:01:00Z'
    limit: 'Material acadêmico de 1998, não a norma; a ABNT NBR 5426 (paga) não foi lida e sua data e situação atual não foram conferidas (o catálogo consultado recusou a conexão). Os critérios detalhados das regras de troca não aparecem no texto lido.'
  - classification: FATO
    claim: 'Material de treinamento da SAP para o S/4HANA Quality Management descreve que, no recebimento, o sistema cria automaticamente um lote de inspeção e lança a quantidade recebida no estoque em inspeção, que outros processos não podem usar; que a decisão de utilização resume a inspeção em aprovado ou reprovado; que a decisão positiva transfere o estoque para uso livre e a negativa, por exemplo, para estoque bloqueado; e que, para certas combinações de material e fornecedor, é possível dispensar a inspeção de recebimento ou, com modificação dinâmica, pular um número definido de inspeções ou reduzir o número de itens inspecionados.'
    reference: https://learning.sap.com/learning-journeys/applying-sap-s-4hana-quality-management/processing-inspections-at-good-receipt_bf84141a-43bd-4744-a9f8-988655750611
    entity: 'SAP Learning, "Applying SAP S/4HANA Quality Management", lição "Processing Inspections at Good Receipt"'
    source_date: null
    checked_at: '2026-11-18T15:08:00Z'
    limit: 'Documentação de fornecedor, sem data visível; citada como exemplo de modelagem, não como recomendação nem como regra.'
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., o fornecedor Usinados Exemplo Ltda., o pino-guia PG-12 e suas características e tolerâncias, a dureza especificada, os instrumentos CB-012 e PAQ-044, os lotes RC-01 a RC-11, as datas, as quantidades, os defeitos, a escolha de NQA 1,5, nível II, regras de troca e não uso do regime atenuado, o sorteio de 4 peças por caixa, as decisões sobre cada lote, as regras de certificado, de skip-lote e de liberação, e os horários do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, fornecedor, sistema entregue, inspeção real, NQA ou plano recomendados, nem orientação de certificação.
---

*Leitura estimada: 19 minutos.*

**Antes de levar a inspeção de recebimento para o sistema, escreva e aprove sete regras: em que momento o material recebido fica bloqueado e fora do MRP, o que se inspeciona em cada item de cada fornecedor (característica, método, instrumento e classe de defeito), qual plano de amostragem vale para cada classe (NQA, nível, tamanho da amostra, números de aceitação e rejeição), como se troca entre os regimes normal, severo e atenuado, o que acontece com um lote rejeitado, o que o certificado do fornecedor substitui e o que não substitui, e quem pode mudar cada uma dessas regras.** Depois, teste com fornecedores, lotes e contagens de defeitos fictícios cujo resultado você já calculou à mão, inclusive uma sequência de lotes que obrigue o sistema a trocar de regime. Sem isso, o sistema registra laudos, mas o lote que deveria ter sido rejeitado no regime severo é aceito porque ninguém lembrou de trocar o plano.

**Este artigo não é parecer de certificação, não prescreve NQA, nível de inspeção nem plano de amostragem, não reproduz tabelas de normas pagas e não recomenda software nem fornecedor.** As normas aparecem pelo que fontes públicas mostram, e isso está dito em cada citação. A documentação de um fornecedor de ERP aparece só para mostrar como sistemas costumam modelar o recebimento com inspeção. Empresa, fornecedor, item, lotes e números do exemplo são inventados.

## O que a planilha de recebimento não faz

Em muitas indústrias pequenas e médias, a inspeção de recebimento é uma ficha em papel por lote e uma planilha com o resultado: data, fornecedor, nota, item, quantidade, "aprovado" ou "reprovado". O material fica numa área marcada no chão até alguém assinar a ficha.

Funciona enquanto a mesma pessoa recebe, inspeciona e libera. O que a planilha não faz é **impedir** e **lembrar**. Ela não impede que o almoxarifado entregue à produção uma caixa que ainda não foi inspecionada, porque o estoque do sistema já mostra o saldo desde a entrada da nota. Ela não lembra que o fornecedor teve dois lotes rejeitados em setembro e que o plano agora é mais rigoroso. E ela não sabe qual instrumento mediu as peças, nem se ele estava calibrado. São essas três coisas que justificam levar a inspeção para um sistema, e são elas que mais ficam fora da especificação.

### Norma, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Norma.** A ISO 9001 pede, pelo que uma reprodução pública mostra, que a empresa controle o que compra e determine a verificação necessária. As normas de amostragem por atributos (ABNT NBR 5426, ISO 2859-1, ANSI/ASQ Z1.4, todas herdeiras da família MIL-STD-105) oferecem um sistema de planos e regras de troca. Nenhuma delas escolhe o NQA, a classe de defeito nem o nível de inspeção da sua empresa.
- **Documentação de fornecedores.** Lote de inspeção criado no recebimento, estoque "em inspeção" que ninguém consegue usar, decisão que move o saldo para livre ou bloqueado, dispensa de inspeção para alguns fornecedores: é assim que um material de treinamento da SAP descreve o processo, citado como exemplo. Não é regra.
- **Decisão da empresa.** Quais itens se inspecionam, quais características, com qual plano, em que regime cada fornecedor está, o que fazer com o lote rejeitado e quem decide. É essa camada que precisa estar escrita antes de configurar ou programar.

## O que a ISO 9001 pede, pelo que é público

O texto da ABNT NBR ISO 9001:2015 é pago e não foi lido para este artigo. Uma reprodução pública da cláusula 8.4 mostra que a organização deve [assegurar que processos, produtos e serviços providos externamente estejam conformes com os requisitos](https://blog.auditortrainingonline.com/blog/iso-9001-8-4) e determinar e aplicar critérios para avaliação, seleção, monitoramento de desempenho e reavaliação dos provedores externos (8.4.1). Em 8.4.2, ela deve assegurar que o que é comprado não afete adversamente sua capacidade de entregar produtos conformes e **determinar a verificação, ou outras atividades, necessárias** para assegurar que os requisitos são atendidos.

Lida como especificação de sistema, a cláusula não diz "inspecione por amostragem". Ela diz que a empresa decide o tipo e a extensão do controle, e precisa conseguir mostrar o que decidiu e o que fez. Inspeção de recebimento, certificado do fornecedor, auditoria no fornecedor e histórico de desempenho são formas de verificação; o sistema precisa registrar qual se aplica a cada item e fornecedor, e o resultado.

A ISO informa que a [ISO 9001:2026, sexta edição, foi publicada em 16/09/2026](https://www.iso.org/standard/9001) e que empresas certificadas migram no prazo do seu ciclo de certificação. Não verifiquei se a numeração ou o texto da cláusula sobre provedores externos mudaram na edição nova; como a migração afeta o seu sistema de gestão é decisão da sua qualidade, com o organismo certificador.

## Material em inspeção: quando entra, quando sai e o que fica bloqueado

Antes de falar de amostragem, defina o estado do material. É a regra mais simples e a que mais causa problema quando falta.

- **Quando entra em inspeção.** Na entrada da nota fiscal, na conferência física ou na leitura da etiqueta? Recomendação da Torno: o saldo nasce bloqueado no mesmo evento que o cria. Se a nota entra às 8h e o estado "em inspeção" só é marcado à tarde, há uma janela em que o material parece disponível.
- **O que "bloqueado" bloqueia.** Requisição para a produção, separação de pedido, transferência entre depósitos, reserva. No material de treinamento da SAP, por exemplo, o recebimento [lança a quantidade no estoque em inspeção, que outros processos não podem usar](https://learning.sap.com/learning-journeys/applying-sap-s-4hana-quality-management/processing-inspections-at-good-receipt_bf84141a-43bd-4744-a9f8-988655750611), e a decisão positiva transfere o saldo para uso livre; a negativa, por exemplo, para bloqueado. É um modelo; o seu pode ter outros nomes, mas precisa dos mesmos efeitos.
- **Como o MRP enxerga.** Material em inspeção não é estoque disponível, mas também não é necessidade nova. O artigo sobre [MRP no sistema](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/) sugere tratá-lo como recebimento na data provável de liberação; aqui se define qual é essa data (por exemplo, a entrada mais o prazo padrão de inspeção do item) e o que acontece quando o lote é rejeitado: a quantidade some do recebimento previsto e a necessidade reaparece.
- **Lote e rastreio.** O lote do fornecedor e o lote interno ficam ligados desde a entrada, com os cuidados do artigo sobre [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/). A inspeção é o que tira o lote da quarentena.
- **Urgência.** A produção vai pedir para usar antes do laudo. Decida se existe "liberação sob risco" (uso antes da inspeção, com rastreio de onde cada peça foi parar e recolhimento se o lote for rejeitado), quem autoriza e se o sistema permite. Se não existir, escreva que não existe.
- **Retorno de terceiro.** Material que volta de beneficiamento externo também pode passar por inspeção de recebimento. O controle físico e fiscal da remessa é o do artigo sobre [industrialização por terceiros](https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/); aqui vale a mesma regra de bloqueio até a decisão.

## Plano de inspeção por item e fornecedor

O plano de inspeção diz **o que** se verifica. O plano de amostragem, mais abaixo, diz **quantas** peças e com que critério. Para cada item comprado, e às vezes para cada par item e fornecedor, defina:

- **Se inspeciona.** Nem todo item precisa. Parafuso de catálogo com certificado e histórico limpo pode entrar só com conferência de quantidade e documento; uma peça usinada sob desenho, não. A decisão é da qualidade, com o risco do item em mente, e precisa estar registrada, inclusive o "não inspeciona".
- **Características.** Cada cota, propriedade ou atributo a verificar, com especificação e unidade: diâmetro 12 h6, comprimento 40 ± 0,2 mm, ausência de rebarba, dureza.
- **Método e instrumento.** Calibrador passa-não-passa, paquímetro, durômetro, inspeção visual com padrão fotográfico. O instrumento usado em cada medição é registrado pelo código, e o sistema recusa instrumento vencido ou reprovado, como no artigo sobre [controle de calibração](https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/).
- **Classe de defeito.** A MIL-STD-105E, norma militar americana de 1989 em domínio público, classifica defeitos por gravidade em [crítico, maior e menor](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf) e permite NQA diferentes para cada grupo de defeitos ou para defeitos individuais. A classificação de cada característica é decisão da engenharia e da qualidade, e muda o plano: um defeito crítico costuma ter tratamento à parte, que a empresa precisa escrever.
- **Atributo ou variável.** Este artigo trata de inspeção por atributos: cada peça é conforme ou não conforme. A ASQ lembra que planos por variáveis, que usam as medições em si, [podem dar a mesma proteção com amostras bem menores](https://asq.org/quality-resources/sampling/attributes-variables-sampling), mas pressupõem distribuição normal e exigem um plano por característica. Se a empresa medir e registrar o valor, o sistema ainda precisa transformá-lo em conforme ou não conforme pela especificação.
- **Documentos exigidos.** Certificado de qualidade, certificado de material, laudo de tratamento térmico. Mais abaixo, o que o certificado substitui.
- **Revisão do plano.** O plano muda quando muda o desenho, o fornecedor ou o histórico. Cada versão tem data, autor e motivo; o lote é inspecionado pela versão vigente no dia, e o laudo guarda qual era.

## Plano de amostragem por atributos: o que escolher e onde a norma entra

### O que a amostragem faz e o que não faz

O NIST/SEMATECH e-Handbook, manual de estatística mantido pelo instituto de padrões dos EUA, resume: o propósito da amostragem de aceitação é [decidir se o lote provavelmente é aceitável, não estimar a qualidade do lote](https://itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm). Ela fica entre não inspecionar e inspecionar 100%, e faz sentido quando o ensaio destrói a peça, quando inspecionar tudo custa demais ou demora demais.

Isso tem duas consequências para o sistema. Primeiro, um lote aceito por amostragem pode conter peças defeituosas, e o sistema não deve exibir "lote 100% conforme". Segundo, a MIL-STD-105E diz que [a escolha ou o uso de um NQA não dá ao fornecedor o direito de entregar qualquer unidade defeituosa](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf) (4.4.2). O NQA é um parâmetro do plano, não uma taxa de defeito combinada.

### As normas e o que este artigo usa de cada uma

- **ABNT NBR 5426.** É a norma brasileira de planos de amostragem por atributos. Uma dissertação de mestrado da USP de 1998 sobre a informatização da inspeção de recebimento a descreve como norma que [estabelece planos de amostragem e procedimentos para inspeção por atributos](https://teses.usp.br/teses/disponiveis/18/18140/tde-11062024-175644/publico/Siqueira_DanielMadureiraRodrigues_dissert.pdf), com NQA, código literal do tamanho da amostra, níveis gerais I, II e III e especiais S1 a S4, e inspeção normal, severa e atenuada. A norma é paga e não foi lida; também não conferi a data e a situação atual dela no catálogo da ABNT.
- **ISO 2859-1.** A ISO publicou em janeiro de 2026 a [terceira edição, ISO 2859-1:2026](https://www.iso.org/standard/85464.html), que substitui a de 1999. A [prévia pública](https://webstore.ansi.org/preview-pages/ISO/preview_ISO+2859-1-2026.pdf) diz, no prefácio, que a revisão acrescentou a passagem da inspeção normal ou atenuada para skip-lote e retirou as curvas características de cada plano. Segundo a [Quality Magazine](https://www.qualitymag.com/articles/99511-third-revision-of-iso-2859-1), as tabelas foram modificadas para melhorar a usabilidade. Se a sua empresa adota a ISO 2859-1, confira se o sistema e os planos cadastrados seguem a edição que ela adotou.
- **ANSI/ASQ Z1.4.** A ASQ informa que é o [padrão mais usado para amostragem por atributos](https://asq.org/quality-resources/sampling/attributes-variables-sampling) e que o Departamento de Defesa dos EUA a recomendou quando deixou de manter a MIL-STD-105E, em 1995.
- **MIL-STD-105E.** Cancelada, mas pública. O e-Handbook do NIST registra que a 105D, de 1963, foi [adotada como ANSI Z1.4 em 1971 e, com pequenas mudanças, como ISO 2859 em 1974](https://itl.nist.gov/div898/handbook/pmc/section2/pmc231.htm). Por ser de domínio público, é a fonte que este artigo usa para citar definições e regras de troca. Ela não é a norma que a sua empresa deve seguir; é o texto que dá para ler sem comprar.

### Os parâmetros que o sistema precisa guardar

- **NQA (nível de qualidade aceitável; AQL em inglês).** A MIL-STD-105E o define como o [limite de uma média de processo satisfatória para fins de inspeção por amostragem](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf) (3.1). É escolhido pela empresa, em geral por classe de defeito, e às vezes combinado com o fornecedor em contrato.
- **Nível de inspeção.** Determina a relação entre o tamanho do lote e o da amostra. O NIST descreve [três níveis gerais e quatro especiais](https://itl.nist.gov/div898/handbook/pmc/section2/pmc231.htm); a 105E diz que normalmente se usa o nível II (4.9.1).
- **Letra-código.** A tabela não dá o tamanho da amostra direto: o tamanho do lote e o nível dão uma letra, e a letra com o NQA e o regime dá o plano. O sistema precisa recalcular a letra quando o tamanho do lote muda; um lote de 3.000 e um de 5.000 podem cair em faixas diferentes.
- **Tamanho da amostra (n), número de aceitação (Ac) e número de rejeição (Re).** No plano simples, o lote é [aceito se o número de defeituosos for igual ou menor que Ac e rejeitado se for igual ou maior que Re](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf) (4.10.1.1); no plano simples, Re = Ac + 1. Planos duplos e múltiplos existem e complicam o registro: se a empresa for usá-los, o sistema precisa saber em que etapa a amostra está.
- **Regime.** Normal, severo ou atenuado, por fornecedor e item (mais abaixo).
- **Sorteio.** A 105E diz que as unidades da amostra são [escolhidas ao acaso, sem considerar sua qualidade](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf) (3.20). O sistema pode sortear caixas e posições e mostrar ao inspetor quais pegar, com a leitura da etiqueta da caixa seguindo os cuidados de [leitor de código de barras](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/). Pegar "as de cima" não é amostra aleatória.

**Recomendação da Torno sobre as tabelas.** As tabelas das normas pagas não podem ser copiadas de um PDF qualquer para dentro do sistema. A empresa compra a norma que adota, a qualidade cadastra os planos que vai usar (ou o fornecedor do sistema entrega as tabelas licenciadas), e cada plano cadastrado tem origem, edição e quem conferiu. Um plano errado num cadastro se repete em todos os lotes.

### Quanto um plano protege

Um plano de amostragem é uma regra de risco. O NIST mostra que, num plano simples, a [probabilidade de aceitar o lote é a probabilidade de a amostra ter c ou menos defeituosos](https://itl.nist.gov/div898/handbook/pmc/section2/pmc232.htm), calculada pela binomial quando o lote é muito maior que a amostra. Com os planos do exemplo abaixo (n = 200; Ac 7 no normal e Ac 5 no severo), as contas dão (para um lote de 5.000 peças, o cálculo exato pela hipergeométrica difere em menos de um ponto percentual):

| Fração defeituosa do fornecedor | Probabilidade de aceitar, normal (Ac 7) | Probabilidade de aceitar, severo (Ac 5) |
|---|---|---|
| 1,5% | 98,9% | 91,8% |
| 2% | 95,1% | 78,7% |
| 4% | 45,0% | 18,6% |
| 5% | 21,3% | 6,2% |

Um fornecedor com 4% de peças defeituosas passa em quase metade dos lotes no regime normal. É por isso que existem as regras de troca, e por isso o sistema precisa aplicá-las sem depender de alguém lembrar.

## Regimes normal, severo e atenuado: as regras de troca

O NIST descreve um esquema de amostragem como [a combinação de planos normal, severo e atenuado com regras para passar de um ao outro](https://itl.nist.gov/div898/handbook/pmc/section2/pmc231.htm), começando pela inspeção normal. As regras da MIL-STD-105E, lidas no [texto público do DTIC](https://apps.dtic.mil/sti/tr/pdf/ADA284013.pdf), são:

- **Normal para severo (4.7.1):** quando 2 de 2, 3, 4 ou 5 lotes consecutivos são rejeitados na inspeção original.
- **Severo para normal (4.7.2):** quando 5 lotes consecutivos são aceitos na inspeção original.
- **Normal para atenuado (4.7.3):** quando os 10 lotes anteriores foram inspecionados no normal e todos aceitos, o total de defeituosos está dentro do limite de uma tabela da norma, a produção está em ritmo estável e o regime atenuado é considerado desejável.
- **Atenuado para normal (4.7.4):** quando um lote é rejeitado, quando um lote é considerado aceitável sem ter atingido nem o critério de aceitação nem o de rejeição do plano atenuado (4.10.1.4), quando a produção fica irregular ou atrasada, ou quando outras condições justificam.
- **Interrupção (4.8):** quando o número acumulado de lotes não aceitos no regime severo chega a cinco, os procedimentos de aceitação são suspensos e só voltam, no severo, depois de ação corretiva do fornecedor.

A mesma norma diz que lotes reapresentados depois de uma rejeição não entram na contagem para ir ao severo. A ISO 2859-1:2026 acrescentou o skip-lote como mais um passo; não li as regras dessa edição e não as reproduzo.

Para o sistema, as perguntas são:

- **A empresa usa regras de troca?** Usar o plano normal para sempre é uma escolha possível, mas é uma escolha: ela abre mão da proteção que o severo dá contra um fornecedor que piorou. Escreva qual é.
- **Por qual unidade o regime é controlado.** Por fornecedor, por item, por par item e fornecedor, por fábrica do fornecedor? A contagem de lotes consecutivos depende disso.
- **Automático ou proposto.** O sistema troca o regime sozinho ou propõe a troca para a qualidade confirmar? Recomendação da Torno: ir para o severo e interromper deveriam ser automáticos, porque são proteções; voltar ao normal e ir para o atenuado podem pedir confirmação, porque reduzem proteção.
- **Qual regime vale para o lote.** O do dia do recebimento ou o do dia da inspeção? Se um lote chegou ontem e a troca para o severo aconteceu hoje, escreva qual plano ele usa.
- **O que conta como "inspeção original".** Lote reinspecionado, lote devolvido e reenviado e lote liberado por concessão: entram ou não na contagem?
- **Interrupção.** O que acontece com pedidos em aberto e lotes a caminho quando o fornecedor é interrompido, e quem decide a volta.

## Registro do resultado e das medições

O laudo do lote é o que vai ser consultado na auditoria, na reclamação do cliente e na avaliação do fornecedor. Defina o que ele guarda:

- Lote, fornecedor, nota, item, quantidade recebida, data e hora de entrada e de inspeção.
- **Versão do plano de inspeção e plano de amostragem aplicados**, com regime, NQA, n, Ac e Re do dia. Se o plano mudar depois, o laudo antigo continua mostrando o que valia.
- **Quais peças foram sorteadas** (caixa, posição) e o resultado de cada característica em cada peça, ou pelo menos as não conformes com o defeito. Contar só o total impede saber depois se o problema era sempre a mesma cota.
- **Instrumento usado** em cada característica medida, com o status dele no momento. Se o instrumento for reprovado na calibração seguinte, é esse vínculo que permite achar os lotes que ele aprovou.
- Inspetor, horário e observações.
- **Resultado calculado**: o sistema conta os defeituosos e aplica Ac e Re; o inspetor não marca "aprovado" à mão. Se a empresa quiser permitir a liberação manual, ela é outra ação, com permissão e motivo.

Fotos e certificados ficam anexados ao lote com os cuidados de [anexos no sistema](https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/), e quem registrou, alterou ou decidiu vai para a [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Decisões sobre o lote: aprovar, rejeitar, selecionar, devolver ou usar sob concessão

O resultado da amostragem é aceito ou rejeitado. A **decisão sobre o lote** é outra coisa, e o sistema precisa das duas.

- **Aceito.** O saldo sai do bloqueio e vai para disponível. Decida o que acontece com as peças defeituosas encontradas na amostra de um lote aceito: voltam ao lote, são separadas, são devolvidas? A regra precisa estar escrita, porque o saldo liberado muda.
- **Rejeitado: devolução.** O lote inteiro volta ao fornecedor. O saldo vai para "a devolver", sai do recebimento previsto do MRP e a nota de devolução é emitida.
- **Rejeitado: seleção 100%.** A empresa (ou o fornecedor, na planta da empresa) inspeciona todas as peças, libera as boas e separa as defeituosas. O sistema precisa registrar a quantidade de cada lado e, se for o caso, o custo a cobrar.
- **Rejeitado: concessão ou uso condicional.** A engenharia avalia que o defeito não prejudica um uso específico e autoriza usar o lote, às vezes só em um produto ou com restrição. A concessão exige alçada, registro de quem aprovou e restrição aplicada no sistema; a alçada segue o [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).
- **Ligação com a RNC.** Todo lote rejeitado abre (ou se vincula a) uma não conformidade contra o fornecedor, com contenção, disposição e ação corretiva como no artigo sobre [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/). A inspeção de recebimento decide quando abrir e entrega lote, defeitos e quantidades; não repete o fluxo da RNC.

## Certificado do fornecedor: o que substitui e o que não substitui

Muitos itens chegam com certificado de qualidade, certificado de material ou declaração de conformidade do fornecedor. Ele é uma das "outras atividades" de verificação que a 8.4.2 menciona, mas não é automaticamente uma inspeção. Defina, por item:

- **Quais características o certificado cobre.** Dureza, composição química e tratamento térmico costumam vir do fornecedor porque a empresa não tem como ensaiar; dimensões, não. O plano de inspeção diz, característica por característica, se a evidência é a inspeção própria ou o certificado.
- **O que conferir no certificado.** Que é do lote certo (número do lote do fornecedor bate com a etiqueta), que os valores estão dentro da especificação do desenho, e não só que vem escrito "aprovado".
- **Lote sem certificado.** Fica em inspeção, com pendência de documento, mesmo que a amostragem dimensional tenha aceitado. Ou a empresa aceita receber o certificado depois? Escreva.
- **Confiança no certificado.** Com que frequência a empresa confere por ensaio próprio ou laboratório externo um valor que o fornecedor certifica. Sem isso, o certificado é uma afirmação nunca testada.

## Histórico do fornecedor e skip-lote

O mesmo laudo que decide o lote alimenta a avaliação do fornecedor que a 8.4.1 pede. Defina os indicadores (lotes rejeitados sobre lotes recebidos, defeituosos sobre peças inspecionadas, dias de atraso, RNCs por período) e lembre que, como diz o NIST, a amostragem não foi feita para estimar a qualidade do lote; a fração de defeituosos nas amostras é um indicador do fornecedor, não uma medida exata dele.

O **skip-lote** é a outra ponta: inspecionar só uma parte dos lotes de um fornecedor muito bom. O NIST descreve o método assim: começa-se com inspeção normal de todos os lotes, e, depois de um número definido de lotes consecutivos aceitos, [passa-se a inspecionar só uma fração sorteada dos lotes, voltando à inspeção normal quando um lote é rejeitado](https://itl.nist.gov/div898/handbook/pmc/section2/pmc27.htm); ele só deve ser usado quando se demonstrou que a qualidade é muito boa. A SAP, no material citado, prevê [dispensar a inspeção para certas combinações de material e fornecedor, ou pular um número definido de inspeções](https://learning.sap.com/learning-journeys/applying-sap-s-4hana-quality-management/processing-inspections-at-good-receipt_bf84141a-43bd-4744-a9f8-988655750611).

Para o sistema: quantos lotes aceitos qualificam, qual fração se inspeciona, como se sorteia (o fornecedor não pode saber qual lote será inspecionado), o que derruba o skip-lote (um lote rejeitado, uma RNC de cliente, uma mudança de processo no fornecedor), e se os lotes pulados ainda exigem conferência de documento e quantidade. O lote pulado é liberado com o registro "não inspecionado por skip-lote", não como "aprovado".

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Momento em que o material entra em inspeção e o que o bloqueio impede | Qualidade, com almoxarifado, PCP e TI |
| Liberação sob risco antes do laudo: se existe e quem autoriza | Direção, com qualidade e produção |
| Itens inspecionados, características, métodos, instrumentos e classes de defeito | Qualidade e engenharia |
| Norma de amostragem adotada, edição e planos cadastrados | Qualidade |
| NQA por classe de defeito e nível de inspeção | Qualidade, às vezes acordado com o fornecedor ou exigido pelo cliente |
| Uso de regras de troca, unidade de controle do regime e o que é automático | Qualidade |
| Destino das peças defeituosas de uma amostra aceita | Qualidade |
| Devolução, seleção 100% e cobrança do fornecedor | Qualidade, com compras |
| Concessão e uso condicional | Engenharia e qualidade; com o cliente, quando o contrato exigir |
| Características cobertas por certificado e conferência periódica | Qualidade |
| Indicadores do fornecedor, skip-lote e interrupção | Qualidade de fornecedores, com compras |
| Quem pode alterar plano, NQA e regime | Direção da qualidade, com TI, conforme as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. compra o pino-guia PG-12 da Usinados Exemplo Ltda. Cada lote tem 5.000 peças, em 50 caixas de 100. O plano de inspeção verifica, em cada peça da amostra, o diâmetro Ø 12 h6 com o calibrador passa-não-passa CB-012 e o comprimento de 40 ± 0,2 mm com o paquímetro PAQ-044; as duas características são de classe "maior". A dureza, de 52 a 56 HRC no desenho fictício, vem do certificado do fornecedor, conferido lote a lote.

Regras da empresa (escolhas do exemplo, não recomendação):

- **Bloqueio.** O saldo nasce "em inspeção" na entrada da nota e não pode ser requisitado, separado nem transferido. O MRP enxerga o lote como recebimento previsto para a entrada mais um dia útil. Não existe liberação sob risco.
- **Plano.** Amostragem simples por atributos, nível II, NQA de 1,5 para defeitos maiores. Para lotes de 3.201 a 10.000 peças, os planos cadastrados pela qualidade são n = 200 com Ac 7 e Re 8 no normal, e n = 200 com Ac 5 e Re 6 no severo. O n e o Ac dos dois planos (e o Re do normal) são os valores que a vinheta do pacote estatístico [AQLSchemes](https://mirror.csclub.uwaterloo.ca/CRAN/web/packages/AQLSchemes/vignettes/AQLSchemes.pdf), escrito para uma disciplina de controle de qualidade da Brigham Young University, recupera das tabelas da MIL-STD-105E/ANSI/ASQ Z1.4 para esse caso; o Re 6 do severo decorre de Re = Ac + 1 no plano simples. Não os conferi contra a ABNT NBR 5426 nem contra a ISO 2859-1:2026, e uma empresa real cadastra os planos a partir da norma que comprou.
- **Sorteio.** 4 peças de cada uma das 50 caixas, em posições sorteadas pelo sistema.
- **Regime.** Regras de troca da MIL-STD-105E por par item e fornecedor; ir para o severo e interromper são automáticos; voltar ao normal exige confirmação da qualidade. A empresa não usa o regime atenuado.
- **Lote aceito.** As peças defeituosas da amostra são separadas e devolvidas; o resto do lote é liberado.
- **Certificado.** Lote sem certificado de dureza, ou com valor fora de 52 a 56 HRC, fica em inspeção com pendência de documento.
- **Skip-lote.** Só depois de 10 lotes consecutivos aceitos no regime normal e aprovação da qualidade.

**Histórico de setembro a novembro de 2026:**

| Lote | Recebido | Regime | Ac/Re | Defeituosas na amostra | Resultado | Decisão |
|---|---|---|---|---|---|---|
| RC-01 | 02/09 | Normal | 7/8 | 3 | Aceito | 4.997 liberadas |
| RC-02 | 09/09 | Normal | 7/8 | 9 | Rejeitado | Devolvido inteiro; RNC |
| RC-03 | 16/09 | Normal | 7/8 | 4 | Aceito | 4.996 liberadas |
| RC-04 | 23/09 | Normal | 7/8 | 8 | Rejeitado | Seleção 100%: 152 defeituosas, 4.848 liberadas; RNC |
| RC-05 | 30/09 | Severo | 5/6 | 6 | Rejeitado | Devolvido inteiro; RNC |
| RC-06 | 07/10 | Severo | 5/6 | 2 | Aceito | 4.998 liberadas |
| RC-07 | 14/10 | Severo | 5/6 | 4 | Aceito | Sem certificado; liberadas 4.996 em 16/10, com o certificado |
| RC-08 | 21/10 | Severo | 5/6 | 1 | Aceito | 4.999 liberadas |
| RC-09 | 28/10 | Severo | 5/6 | 5 | Aceito | 4.995 liberadas |
| RC-10 | 04/11 | Severo | 5/6 | 3 | Aceito | 4.997 liberadas |
| RC-11 | 11/11 | Normal | 7/8 | 4 | Aceito | 4.996 liberadas |

RC-02 e RC-04 são dois lotes rejeitados em quatro consecutivos: pela regra 4.7.1, o RC-05 já é inspecionado no severo. No RC-05, 6 defeituosas atingem Re 6 e o lote é rejeitado; no normal, as mesmas 6 ficariam abaixo de Ac 7 e o lote seria aceito. É a primeira rejeição acumulada no severo, de cinco que levariam à interrupção. Do RC-06 ao RC-10 são cinco lotes aceitos seguidos (o RC-09, com 5 defeituosas, é aceito exatamente no limite), e a qualidade confirma a volta ao normal em 04/11; o RC-11 usa Ac 7.

![Ilustração de uma grade de 200 quadrados, 20 colunas por 10 linhas, representando a amostra do lote fictício RC-05 do pino-guia PG-12, 5.000 peças em 50 caixas, recebido em 30/09/2026. No alto, o plano cadastrado pela empresa: NQA 1,5, nível II, regime severo, n igual a 200. Cada quadrado é uma peça sorteada, 4 por caixa. Seis quadrados estão em vermelho: quatro com a letra D, diâmetro reprovado no calibrador não passa, e dois com a letra C, comprimento fora de 40 mais ou menos 0,2 milímetro. Abaixo, uma escala de 0 a 9 peças defeituosas, verde até 5 e vermelha a partir de 6, com Ac 5 e Re 6 marcados e o 6 destacado; uma linha tracejada indica que no regime normal seriam Ac 7 e Re 8. Um quadro amarelo diz que no regime normal as mesmas 6 peças defeituosas aceitariam o lote e que o regime vigente no dia decide. Uma faixa vermelha diz: rejeitado, 6 maior ou igual a Re 6; 5.000 peças seguem bloqueadas para uso; decisão: devolver ao fornecedor, com RNC. Exemplo fictício.](./torno-inspecao-grade-amostra.svg)

*Exemplo fictício: lote, peças, defeitos e plano inventados; a mesma amostra aceita ou rejeita o lote conforme o regime em que o fornecedor está. Ilustração original Torno, 2026.*

![Ilustração de uma chave seletora de regime de inspeção do fornecedor fictício Usinados Exemplo Ltda. para o pino-guia PG-12, situação em 11/11/2026, com quatro posições: normal no alto, severo à direita, interrompido embaixo e atenuado à esquerda; o ponteiro aponta para normal. Abaixo, as regras de troca da MIL-STD-105E, itens 4.7 e 4.8: normal para severo com 2 rejeitados em até 5 lotes seguidos; severo para normal com 5 lotes seguidos aceitos; severo para interrompido com 5 rejeições acumuladas no severo; normal para atenuado com 10 aceitos, limite da tabela, produção estável e a empresa considerar desejável; atenuado para normal com 1 rejeitado, produção irregular ou outro motivo. Depois, o histórico com NQA 1,5, nível II e n igual a 200: RC-01, 02/09, normal, 3 defeituosas, aceito; RC-02, 09/09, normal, 9, rejeitado; RC-03, 16/09, normal, 4, aceito; RC-04, 23/09, normal, 8, rejeitado; nota: 2 rejeitados em 4 lotes, passa a severo; RC-05, 30/09, severo, Ac 5 e Re 6, 6, rejeitado; RC-06 a RC-10, de 07/10 a 04/11, severo, com 2, 4, 1, 5 e 3 defeituosas, aceitos; nota: 5 aceitos seguidos, volta a normal; RC-11, 11/11, normal, 4, aceito. No rodapé: rejeições acumuladas no severo, 1 de 5; atenuado não usado pela empresa do exemplo. Exemplo fictício.](./torno-inspecao-chave-regimes.svg)

*Exemplo fictício: fornecedor, item, lotes e contagens inventados; as regras de troca são as da MIL-STD-105E, aplicadas por uma empresa que escolheu usá-las. Ilustração original Torno, 2026.*

**Indicadores do fornecedor no período.** 11 lotes, 3 rejeitados (27%). 2.200 peças inspecionadas nas amostras, 49 defeituosas (2,2%). Pela regra da empresa, a Usinados Exemplo não pode entrar em skip-lote: a contagem de 10 lotes aceitos no normal recomeçou no RC-11.

**O lote RC-11 no MRP.** Nota lançada em 11/11/2026 às 8h40: 5.000 peças "em inspeção", nenhuma disponível, recebimento previsto para 12/11. Inspeção concluída às 16h30 com 4 defeituosas na amostra: lote aceito, 4.996 peças liberadas, 4 separadas para devolução, e o recebimento previsto é baixado.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com fornecedores, itens e lotes fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Entrada da nota do RC-11 em 11/11, 8h40 | 5.000 peças "em inspeção"; disponível 0; MRP com recebimento previsto em 12/11 | Consulta de estoque e do MRP |
| Requisição de 500 peças do RC-11 pela produção antes do laudo | Recusada: lote em inspeção | Tentativa recusada com o motivo |
| Cadastro de plano de amostragem sem origem, edição da norma ou responsável pela conferência | Recusado | Tentativa recusada |
| Lote de 5.000 peças no regime normal | Sistema aplica n = 200, Ac 7, Re 8 e sorteia 4 posições em cada uma das 50 caixas | Laudo com plano e lista de sorteio |
| Registro da medição de comprimento com um paquímetro vencido | Recusado; pede instrumento liberado | Tentativa recusada com o motivo |
| RC-01 com 3 defeituosas | Aceito; 4.997 disponíveis, 3 separadas | Laudo e estoque |
| Inspetor tenta marcar o RC-02 (9 defeituosas) como aprovado | Não é possível; o resultado vem da contagem contra Ac e Re | Tentativa negada |
| RC-02 rejeitado e devolvido | 5.000 em "a devolver"; recebimento previsto baixado; RNC aberta contra o fornecedor | Estoque, MRP e RNC |
| RC-04 rejeitado com 8 defeituosas, segunda rejeição em 4 lotes | Regime do par PG-12 e Usinados Exemplo muda para severo automaticamente, com data e motivo | Histórico do regime |
| Seleção 100% do RC-04: 152 defeituosas | 4.848 liberadas, 152 em "a devolver"; soma fecha com 5.000 | Laudo da seleção e estoque |
| RC-05 com 6 defeituosas no severo | Rejeitado (6 ≥ Re 6); laudo mostra Ac 5 e Re 6; 1 rejeição acumulada no severo | Laudo e contador do regime |
| RC-07 aceito na amostra, sem certificado de dureza | Continua em inspeção, com pendência de documento; liberado em 16/10 ao anexar o certificado com 53 a 55 HRC | Pendência e anexo |
| Certificado anexado ao lote com dureza de 50 HRC | Pendência continua; não libera | Tentativa recusada |
| RC-09 com 5 defeituosas no severo | Aceito (5 ≤ Ac 5) | Laudo |
| RC-10 aceito, quinto aceito seguido no severo | Sistema propõe a volta ao normal; qualidade confirma em 04/11 | Proposta e confirmação no histórico |
| Técnico tenta mudar o NQA do PG-12 de 1,5 para 2,5 | Negado; só o perfil da qualidade altera, com motivo | Tentativa negada |
| Concessão para usar o RC-05 sem aprovação da engenharia | Bloqueada | Tentativa recusada |
| Pedido de skip-lote para a Usinados Exemplo em 12/11 | Recusado: 1 lote aceito no normal desde a volta, 10 exigidos | Tentativa recusada com o motivo |
| Simulação: cinco lotes rejeitados acumulados no severo | Fornecedor interrompido; novos recebimentos ficam bloqueados até a qualidade registrar a ação corretiva | Histórico do regime |
| Relatório do fornecedor de setembro a novembro | 11 lotes, 3 rejeitados; 2.200 peças inspecionadas, 49 defeituosas | Relatório |

*Fim do exemplo fictício. Empresa, fornecedor, item, especificações, instrumentos, lotes, datas, quantidades, defeitos, NQA, nível, regras e decisões são modelo editorial, sem inspeção real, cliente ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não norma, NQA ou plano recomendados, nem comportamento padrão de ferramenta.*

Antes do go-live, importe a planilha de planos de inspeção num ambiente de teste e confira item por item: quantos itens não têm plano, quantos planos não têm origem da norma, quantos fornecedores não têm regime definido. A importação segue os cuidados de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/). Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Qual NQA devo usar?

Este artigo não responde, e nenhuma norma de amostragem responde por você. O NQA depende da classe do defeito, do custo de deixar passar uma peça ruim, do que o cliente exige e do que foi combinado com o fornecedor. O que o sistema precisa é guardar o NQA escolhido para cada classe e item, com quem escolheu e quando, e mostrar o risco do plano (a tabela de probabilidade de aceitação acima é um jeito simples).

### Se o fornecedor manda certificado, ainda preciso inspecionar?

Depende do que o certificado cobre e de quanto a empresa confia nele. Certificado de dureza não diz nada sobre o diâmetro. Defina característica por característica qual é a evidência, e confira de tempos em tempos, por ensaio próprio ou externo, o que o fornecedor certifica.

### Lote aceito na amostragem pode ter peça defeituosa?

Pode. A amostragem decide se o lote é aceitável, não garante que todas as peças são boas, e o NQA não autoriza o fornecedor a entregar defeituosas. Peça defeituosa encontrada depois, na produção, entra como não conformidade e conta no histórico do fornecedor.

Para transformar a rotina de inspeção de recebimento em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a ficha de inspeção atual, a lista de itens inspecionados e o caso mais recente de lote rejeitado, sem dados confidenciais de clientes ou fornecedores.

*Fontes consultadas em 18 de novembro de 2026: Auditor Training Online, reprodução da cláusula 8.4 da ISO 9001:2015 (11/12/2023); ISO, página da ISO 9001 (edição 2026, publicada em 16/09/2026); NIST/SEMATECH e-Handbook of Statistical Methods, seções 6.2.1, 6.2.3.1, 6.2.3.2 e 6.2.7; MIL-STD-105E (10/05/1989), cópia pública do DTIC; ASQ, página sobre planos de amostragem por atributos e variáveis; ISO, página da ISO 2859-1:2026 (janeiro de 2026) e prévia do documento; Quality Magazine, "Third Revision of ISO 2859-1" (10/04/2026); vinheta do pacote AQLSchemes, versão 1.7-2 (13/09/2023); dissertação de D. M. R. Siqueira, EESC-USP (1998); SAP Learning, "Processing Inspections at Good Receipt". Este artigo não é parecer de certificação e não recomenda sistema nem fornecedor; empresas, itens, números e ilustrações são fictícios.*
