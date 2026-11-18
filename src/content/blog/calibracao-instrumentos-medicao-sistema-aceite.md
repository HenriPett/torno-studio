---
content_id: torno-artigo-pt-20261118-calibracao-instrumentos
intent_id: buyer-measuring-instrument-calibration-control-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Controle de calibração de instrumentos no sistema: o que definir e testar antes de automatizar'
h1: 'Controle de calibração de instrumentos no sistema: o que definir e testar antes de automatizar'
seo_title: 'Controle de calibração de instrumentos: sistema e aceite | Torno'
seo_description: 'Cadastro, vencimento, certificado e rastreabilidade, erro + incerteza contra a EMA, bloqueio de uso e impacto nas peças já medidas: o que testar.'
summary: 'Roteiro para a indústria que vai tirar o controle de calibração de instrumentos de medição da planilha e levá-lo para um sistema: cadastro e identificação do instrumento (código, tipo, faixa, resolução, local e responsável); diferença entre calibração, verificação e ajuste pelo VIM; intervalo de calibração e vencimento como decisão da empresa, com os métodos de revisão do guia ILAC-G24/OIML D10; o que conferir no certificado (laboratório acreditado e escopo na RBC, pontos, erro, incerteza expandida e fator de abrangência, dados antes do ajuste); critério de aceitação do resultado com erro, incerteza e erro máximo admissível definido pela empresa; bloqueio de uso de instrumento vencido, reprovado, em calibração ou não localizado; avaliação do impacto sobre as peças já medidas quando o instrumento é reprovado; empréstimo, localização e histórico; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas e as datas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema o controle de calibração dos instrumentos de medição, para que o vencimento, a aceitação do certificado, o bloqueio de uso e a avaliação das peças medidas por um instrumento reprovado sejam confiáveis?
proposed_path: /blog/calibracao-instrumentos-medicao-sistema-aceite/
canonical_url: https://tornostudio.com/blog/calibracao-instrumentos-medicao-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Gerentes e coordenadores de qualidade e de produção, metrologistas e técnicos de laboratório interno, inspetores, PCP e TI de indústrias pequenas e médias que vão contratar, especificar ou aceitar um sistema (módulo de ERP, software de gestão da qualidade ou sistema sob medida) para controlar a calibração dos instrumentos de medição, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de calibração por cadastro, vencimento, bloqueio e avaliação de impacto no sistema.
scope: O que a ISO 9001:2015 pede em 7.1.5.2 pelo que é verificável em fonte pública, e a existência da edição de 2026; calibração, verificação, ajuste, rastreabilidade metrológica, incerteza expandida e erro máximo admissível pelo VIM; cadastro e identificação do instrumento; status de uso; intervalo de calibração e vencimento, com os métodos de revisão de ILAC-G24/OIML D10; verificação intermediária; certificado de calibração e o que conferir; acreditação na RBC, escopo e CMC; política de incerteza da ILAC-P14; regra de decisão e zona de dúvida pela ILAC-G8; critério de aceitação definido pela empresa; bloqueio de uso; avaliação de impacto sobre medições anteriores e ligação com a RNC; empréstimo, localização e inventário de instrumentos; histórico e evidência; migração da planilha; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Prescrição de intervalos de calibração, de erro máximo admissível ou de regra de decisão; cálculo de incerteza de medição; análise de sistemas de medição (MSA, R&R); metrologia legal e instrumentos regulamentados pelo Inmetro; requisitos para laboratórios acreditados; interpretação do texto integral da ISO 9001 (edições 2015 e 2026), da ISO 10012 ou da ISO/IEC 17025, que não foram lidos; parecer de certificação ou regulatório; tratamento da não conformidade, plano de manutenção, rastreio de lote, trilha de auditoria e fluxo de aprovação em geral (cobertos em outros artigos); recomendação ou comparação de ERP, software de calibração, laboratório ou fornecedor (a documentação de um fornecedor aparece só como exemplo de modelagem).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-18T11:26:00Z'
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
  - path: https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/
    reason: Trata o plano de manutenção, as ordens e os indicadores de falha das máquinas, e cita a calibração só como exemplo de plano por calendário; aqui o controle metrológico do instrumento, o certificado e o efeito sobre as medições.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata a abertura, a contenção, a disposição e a ação corretiva da não conformidade; aqui a avaliação de impacto que decide quando abrir a RNC sobre os lotes medidos por um instrumento reprovado.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade, quarentena e rastreio do produto no estoque; aqui o vencimento é do instrumento, e o rastreio de lote serve para achar o que ele mediu.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas, fusos e cortes em geral; aqui o dia em que o instrumento vence e passa a ser bloqueado.
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Trata leitura de códigos no sistema; aqui a etiqueta do instrumento lida na hora da medição e do inventário.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata contagem de estoque e divergência; aqui o inventário periódico de instrumentos e o status de não localizado.
  - path: https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/
    reason: Trata envio, guarda e consulta de arquivos; aqui o certificado de calibração anexado como evidência.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode alterar intervalo, critério de aceitação e status do instrumento.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a aceitação do certificado e a mudança de status precisam registrar.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a decisão da qualidade sobre cada lote da avaliação de impacto.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a importação de planilhas e o tratamento de linhas com erro; aqui a migração da planilha de calibração.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com instrumentos, certificados e lotes fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de calibração.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a planilha de calibração em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'Segundo a reprodução publicada pela Auditor Training Online, a cláusula 7.1.5.2 da ISO 9001:2015 pede que, quando a rastreabilidade da medição for requisito ou considerada essencial, o equipamento de medição seja calibrado ou verificado, ou ambos, em intervalos especificados ou antes do uso, contra padrões rastreáveis a padrões internacionais ou nacionais, e que, quando não existirem tais padrões, a base usada seja retida como informação documentada; que seja identificado para determinar sua situação; que seja protegido de ajustes, danos ou deterioração que invalidem a situação de calibração e os resultados subsequentes; e que a organização determine se a validade de resultados anteriores foi afetada quando o equipamento for considerado inadequado ao uso pretendido, tomando a ação apropriada.'
    reference: https://blog.auditortrainingonline.com/blog/iso-9001-7-1-5-2-measurement-traceability
    entity: 'Auditor Training Online, "ISO 9001 7.1.5.2 Measurement Traceability" (Jackie Stapleton, 14/07/2023)'
    source_date: '2023-07-14'
    checked_at: '2026-11-18T11:12:00Z'
    limit: 'Reprodução de terceiro, em inglês, de trechos da norma paga; o texto da ABNT NBR ISO 9001:2015 não foi lido. A condição inicial ("quando a rastreabilidade for requisito") foi lida na página de forma resumida. Não é interpretação de auditoria ou de certificação.'
  - classification: FATO
    claim: 'A página da ISO sobre a ISO 9001 informa que a edição de 2026 é a sexta e a vigente, publicada em 16/09/2026, e que organizações certificadas devem migrar no prazo definido pelo seu ciclo de certificação, consultando o organismo certificador.'
    reference: https://www.iso.org/standard/9001
    entity: 'ISO, página da norma ISO 9001'
    source_date: '2026-09-16'
    checked_at: '2026-11-18T11:15:00Z'
    limit: 'A página não mostra o texto da cláusula de recursos de monitoramento e medição; não foi verificado se a numeração 7.1.5 ou o conteúdo mudaram na edição de 2026. A notícia de lançamento da ISO não abriu.'
  - classification: FATO
    claim: 'O VIM (JCGM 200:2012, verbete 2.39) define calibração como a operação que, em condições especificadas, estabelece numa primeira etapa a relação entre os valores fornecidos por padrões, com suas incertezas, e as indicações correspondentes, com suas incertezas, e numa segunda etapa usa essa informação para obter um resultado de medição a partir de uma indicação; e diz que calibração não deve ser confundida com ajuste de um sistema de medição nem com verificação da calibração.'
    reference: https://jcgm.bipm.org/vim/en/2.39.html
    entity: 'JCGM/BIPM, VIM3 online com anotações informativas, verbete 2.39 "calibration"'
    source_date: '2012'
    checked_at: '2026-11-18T11:08:00Z'
    limit: 'Versão em inglês com anotações do JCGM; a edição luso-brasileira do Inmetro (VIM 2012) não foi aberta (endereço do Inmetro recusado pela rede da sessão). Tradução livre da Torno.'
  - classification: FATO
    claim: 'O VIM (verbete 2.41) define rastreabilidade metrológica como a propriedade de um resultado de medição pela qual ele pode ser relacionado a uma referência por uma cadeia ininterrupta e documentada de calibrações, cada uma contribuindo para a incerteza de medição; e a nota 7 registra que a ILAC considera elementos para confirmar a rastreabilidade uma cadeia ininterrupta até um padrão internacional ou nacional, incerteza documentada, procedimento de medição documentado, competência técnica acreditada, rastreabilidade ao SI e intervalos de calibração.'
    reference: https://jcgm.bipm.org/vim/en/2.41.html
    entity: 'JCGM/BIPM, VIM3 online, verbete 2.41 "metrological traceability"'
    source_date: '2012'
    checked_at: '2026-11-18T11:09:00Z'
    limit: 'Versão em inglês; tradução livre da Torno.'
  - classification: FATO
    claim: 'O VIM (verbete 2.44) define verificação como o fornecimento de evidência objetiva de que um item atende a requisitos especificados, com a nota de que, quando aplicável, a incerteza de medição deve ser levada em consideração, e de que verificação não deve ser confundida com calibração.'
    reference: https://jcgm.bipm.org/vim/en/2.44.html
    entity: 'JCGM/BIPM, VIM3 online, verbete 2.44 "verification"'
    source_date: '2012'
    checked_at: '2026-11-18T11:10:00Z'
    limit: 'Versão em inglês; tradução livre da Torno.'
  - classification: FATO
    claim: 'O VIM (verbete 2.35) define incerteza de medição expandida como o produto de uma incerteza-padrão combinada por um fator maior que um, o fator de abrangência.'
    reference: https://jcgm.bipm.org/vim/en/2.35.html
    entity: 'JCGM/BIPM, VIM3 online, verbete 2.35 "expanded measurement uncertainty"'
    source_date: '2012'
    checked_at: '2026-11-18T11:10:00Z'
    limit: 'Versão em inglês; tradução livre da Torno. O verbete 4.26 (erro máximo admissível) no site do JCGM não abriu na ferramenta.'
  - classification: FATO
    claim: 'A Aula 3 do curso Metrologia Básica do Inmetro cita o VIM 2012, primeira edição luso-brasileira adotada pela Portaria Inmetro 232/2012, e reproduz as definições de incerteza de medição (parâmetro não negativo que caracteriza a dispersão dos valores atribuídos a um mensurando, com base nas informações utilizadas) e de erro máximo admissível (valor extremo do erro de medição, com respeito a um valor de referência conhecido, aceito por especificações ou regulamentos).'
    reference: https://bibliotecadigital.enap.gov.br/bitstream/1/6687/5/M%c3%b3dulo%203%20Conceitos%20T%c3%a9cnicos%20em%20Metrologia.pdf
    entity: 'Inmetro, curso Metrologia Básica, Aula 3 "Conceitos Técnicos da Metrologia" (Paulo Roque Martins Silva, outubro de 2020), no repositório da Enap'
    source_date: '2020-10'
    checked_at: '2026-11-18T11:11:00Z'
    limit: 'Material didático, não o VIM 2012 em si; definições lidas por resumo da ferramenta com trechos literais, algumas truncadas.'
  - classification: FATO
    claim: 'O guia ILAC-G24/OIML D10:2007 diz que não parece haver uma única melhor prática universal para estabelecer e ajustar intervalos de calibração e que nenhum método serve para todos os instrumentos; lista fatores como incerteza requerida, risco de o instrumento exceder o erro máximo admissível em uso, tendência a desgaste e deriva, recomendação do fabricante e condições ambientais; descreve cinco métodos de revisão (ajuste automático ou em escada, carta de controle, tempo em uso, verificação em serviço ou caixa-preta, e outras abordagens estatísticas); e deixa a escolha do método a cada laboratório, advertindo contra intervalos fixos nunca revistos.'
    reference: https://www.oiml.org/en/files/pdf_d/d010-e07.pdf
    entity: 'ILAC e OIML, "Guidelines for the determination of calibration intervals of measuring instruments", ILAC-G24:2007 / OIML D 10:2007 (E)'
    source_date: '2007'
    checked_at: '2026-11-18T11:36:00Z'
    limit: 'Edição de 2007 lida no site da OIML, substituída pela ILAC-G24:2022 / OIML D 10:2022 ("recalibration intervals"), listada na página de guias da ILAC. Na revisão, a edição de 2022 foi conferida só na tradução tcheca do CAI (https://www.cai.cz/wp-content/uploads/2023/09/01_08-P030-ILAC-G24_2022_20230915.pdf, 15/09/2023), por resumo da ferramenta: mantém a ausência de melhor prática universal, os cinco métodos, a escolha pelo laboratório e a recomendação contra intervalos fixos sem revisão. Os fatores do intervalo inicial vêm da introdução e da seção 2 da edição de 2007.'
  - classification: FATO
    claim: 'A política ILAC-P14:09/2020 exige que o resultado de calibração inclua o valor medido y e a incerteza expandida U associada, com fator de abrangência e probabilidade de abrangência declarados (a incerteza da CMC tem probabilidade de abrangência de aproximadamente 95%); que U tenha no máximo dois algarismos significativos; que a incerteza declarada inclua contribuições de curto prazo durante a calibração atribuíveis ao instrumento do cliente; e que o laboratório não declare incerteza menor que a da CMC.'
    reference: https://cdn-v2.iasonline.org/wp-content/uploads/2021/02/ILAC_P14_09_2020.pdf
    entity: 'ILAC, "ILAC Policy for Measurement Uncertainty in Calibration", ILAC-P14:09/2020, cópia hospedada pela IAS'
    source_date: '2020-09'
    checked_at: '2026-11-18T11:21:00Z'
    limit: 'Cópia hospedada por um organismo de acreditação, não pelo site da ILAC. Regras para laboratórios acreditados, citadas aqui como o que se espera encontrar no certificado.'
  - classification: FATO
    claim: 'A ILAC publicou em setembro de 2019 a revisão ILAC-G8:09/2019, orientação sobre regras de decisão e declarações de conformidade para laboratórios sob a ISO/IEC 17025:2017. O texto descreve a aceitação simples, com banda de guarda de largura zero e declaração binária, a banda de guarda para reduzir a probabilidade de decisão errada, declarações condicionais quando o resultado fica dentro da banda de guarda, e a regra de decisão acordada com o cliente antes das medições.'
    reference: https://www.nite.go.jp/data/000118179.pdf
    entity: 'ILAC, "Guidelines on Decision Rules and Statements of Conformity", ILAC-G8:09/2019, texto original em inglês com tradução japonesa, cópia hospedada pelo NITE (Japão); notícia da ILAC em https://ilac.org/?p=122723 (04/09/2019)'
    source_date: '2019-09'
    checked_at: '2026-11-18T11:33:00Z'
    limit: 'Cópia bilíngue (inglês e japonês) hospedada pelo NITE, não pelo site da ILAC; o link de download da página de guias da ILAC (https://ilac.org/publications-and-resources/ilac-guidance-series/) não abriu na ferramenta. Lido por resumo da ferramenta com trechos literais (seções 4.1, 4.2, 4.2.1 e 4.2.3). Orientação para laboratórios; citada para nomear as escolhas, não como regra para a empresa usuária.'
  - classification: FATO
    claim: 'O documento LAB 48 da UKAS diz que cabe ao cliente decidir se um resultado atende aos seus requisitos; que, se o cliente não pedir explicitamente uma decisão de conformidade, nenhuma declaração de conformidade deve ser feita; e que aceitação simples, sozinha, não constitui uma regra de decisão.'
    reference: https://ukas.com/wp-content/uploads/2023/05/LAB-48-Decision-rules-and-statements-of-conformity.pdf
    entity: 'UKAS, LAB 48 "Decision rules and statements of conformity", edição 5, julho de 2024'
    source_date: '2024-07'
    checked_at: '2026-11-18T11:08:00Z'
    limit: 'Documento do organismo de acreditação do Reino Unido, não brasileiro; citado só para mostrar de quem é a decisão de conformidade. Lido por resumo da ferramenta com trechos literais.'
  - classification: FATO
    claim: 'A página do Inmetro sobre a RBC (Rede Brasileira de Calibração) a descreve como base de dados de laboratórios de calibração acreditados segundo a ABNT NBR ISO/IEC 17025, com consulta a toda a base de laboratórios cadastrados.'
    reference: https://www.gov.br/inmetro/pt-br/centrais-de-conteudo/sistemas/rbc
    entity: 'Inmetro, página "RBC" em Centrais de Conteúdo, Sistemas (publicada em 11/08/2020, atualizada em 01/02/2021)'
    source_date: '2021-02-01'
    checked_at: '2026-11-18T11:17:00Z'
    limit: 'O sistema de consulta apontado pela página (domínio inmetro.gov.br) não foi aberto nesta sessão.'
  - classification: FATO
    claim: 'O certificado de acreditação CAL 0003 do Laboratório de Metrologia Mecânica do IPT, emitido pela Cgcre (formulário MOD-CGCRE-024), concede acreditação segundo a ABNT NBR ISO/IEC 17025:2017 para as atividades do escopo de acreditação, e diz que a situação atual e o escopo devem ser verificados no endereço eletrônico do Inmetro.'
    reference: https://ipt.br/wp-content/uploads/2024/04/CAL_0003_certificado.pdf
    entity: 'Cgcre/Inmetro, certificado de acreditação CAL 0003 (IPT), publicado no site do IPT'
    source_date: null
    checked_at: '2026-11-18T11:20:00Z'
    limit: 'Exemplo de certificado de acreditação de um laboratório real, citado só para mostrar o formato e a orientação de conferir o escopo; não é recomendação do laboratório. Data de emissão não confirmada.'
  - classification: FATO
    claim: 'A impressão da página de escopo da acreditação nº 162 no sistema RBC do Inmetro, datada de 18/05/2026, mostra situação da acreditação, norma (ABNT NBR ISO/IEC 17025, calibração), data da última revisão do escopo e uma tabela com descrição do serviço, parâmetro, faixa e método, e capacidade de medição e calibração (CMC).'
    reference: https://ipt.br/wp-content/uploads/2026/05/CAL_162_escopo_Dimensional.pdf
    entity: 'Inmetro, sistema RBC, escopo da acreditação nº 162 (IPT), impressão publicada pelo IPT'
    source_date: '2026-05-18'
    checked_at: '2026-11-18T11:19:00Z'
    limit: 'Fotografia de uma data; o escopo vigente deve ser consultado no sistema do Inmetro. Citado só para mostrar as colunas do escopo, não como recomendação do laboratório.'
  - classification: FATO
    claim: 'A ajuda do SAP para calibração de instrumentos de medição (PM/QM) descreve o instrumento como registro mestre de equipamento, um plano de manutenção com lista de tarefas que gera ordem de manutenção e lote de inspeção para a calibração, o registro dos resultados como valores de características e a decisão de utilização, em que o sistema propõe a situação do instrumento; e a ajuda de gestão de equipamentos de teste diz que, na decisão de utilização, se decide se o objeto técnico volta a ser usado, é reparado ou é rejeitado.'
    reference: https://help.sap.com/saphelp_46c/helpdata/fr/ec/de3154e56f11d4b3820050da4ceab0/content.htm
    entity: 'SAP Help Portal, "Calibration of Measurement Instruments (PM/QM)" e "Test Equipment Management" (árvore de ajuda da versão 4.6C)'
    source_date: null
    checked_at: '2026-11-18T11:16:00Z'
    limit: 'Versão muito antiga do produto, sem data visível; versão inferida pela URL. As páginas não descrevem a busca das medições feitas com um instrumento reprovado. Exemplo de modelagem, não recomendação.'
  - classification: HIPÓTESE
    claim: 'A Usinagem Exemplo Ltda., o eixo ER-40 e sua tolerância, os instrumentos MIC-014, MIC-022, MIC-009 e PAQ-031, os certificados CC-2025-0877 e CC-2026-1093, os erros, as incertezas, o erro máximo admissível de 0,004 mm, a regra |erro| + U ≤ EMA, o intervalo de 12 meses, o aviso de 30 dias, a verificação intermediária com bloco-padrão e seu critério, a janela de impacto, os lotes, quantidades, leituras e datas, e as decisões da qualidade no exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição ou calibração real, laboratório real, intervalo, EMA ou regra de decisão recomendados, nem orientação de certificação.
---

*Leitura estimada: 20 minutos.*

**Antes de levar o controle de calibração de instrumentos para o sistema, escreva e aprove sete regras: o que identifica um instrumento, quem define o intervalo de calibração e a partir de que data ele conta, o que conferir num certificado antes de aceitá-lo, qual critério separa um resultado aprovado de um reprovado (erro, incerteza e erro máximo admissível), em que situações o instrumento fica bloqueado para medir, como se avalia o que já foi medido com um instrumento reprovado e onde cada instrumento está.** Depois, teste com instrumentos e certificados fictícios cujo resultado você já calculou à mão, inclusive um reprovado com lotes já expedidos. Sem isso, o sistema vira uma agenda de vencimentos bonita, e a pergunta que o auditor e o cliente fazem quando um micrômetro reprova (o que ele mediu desde a última vez que estava bom?) continua sendo respondida no braço.

**Este artigo não é parecer de certificação, não prescreve intervalo, erro máximo admissível nem regra de decisão, e não recomenda software, laboratório ou fornecedor.** As normas pagas aparecem só pelo que fontes públicas mostram, e isso está dito em cada citação. A documentação de um fornecedor aparece só para mostrar como sistemas costumam modelar a calibração. Empresa, instrumentos, certificados e números do exemplo são inventados.

## Por que a planilha de calibração parece suficiente

Na maioria das indústrias pequenas e médias, o controle de calibração é uma planilha com uma linha por instrumento: código, descrição, data da última calibração, data da próxima e uma coluna de observações. Ela funciona enquanto alguém olha para ela todo mês, manda os instrumentos ao laboratório a tempo e lembra de onde cada um está.

O que a planilha não faz é **impedir**. Ela não impede que o inspetor use um paquímetro vencido no sábado, não impede que um certificado com resultado fora do critério seja arquivado sem que ninguém leia os números, e não responde, quando um instrumento reprova, quais peças ele mediu e onde elas estão. Essas três coisas são o motivo de levar o controle para um sistema, e são as três que mais costumam ficar de fora da especificação.

### Norma, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Norma e vocabulário.** A ISO 9001:2015, pelo que uma reprodução pública da cláusula mostra, pede, para os recursos de medição, calibração ou verificação em intervalos especificados, identificação da situação, proteção contra ajustes e avaliação das medições anteriores quando o instrumento se mostra inadequado. O VIM (Vocabulário Internacional de Metrologia) dá o nome exato de cada coisa. Guias da ILAC e da OIML descrevem como laboratórios e usuários costumam tratar intervalo, incerteza e decisão de conformidade. Nenhum deles diz qual intervalo, qual erro máximo ou qual regra a sua empresa deve usar.
- **Documentação de fornecedores.** Instrumento como equipamento cadastrado, plano periódico que gera uma ordem de calibração, resultado registrado por característica e uma decisão que muda a situação do instrumento: é assim que a ajuda do SAP descreve o processo, citada como exemplo. Não é regra.
- **Decisão da empresa.** Intervalo de cada instrumento, erro máximo admissível, regra de decisão, o que bloqueia o uso, como se delimita a janela de impacto e quem decide o destino de cada lote. É essa camada que precisa estar escrita antes de configurar ou programar.

## O que a ISO 9001 pede, pelo que é público

O texto da ABNT NBR ISO 9001:2015 é pago e não foi lido para este artigo. Uma reprodução pública da cláusula 7.1.5.2, rastreabilidade de medição, mostra que, quando a rastreabilidade é requisito ou considerada essencial, o equipamento de medição deve ser [calibrado ou verificado, ou ambos, em intervalos especificados ou antes do uso, contra padrões rastreáveis a padrões internacionais ou nacionais](https://blog.auditortrainingonline.com/blog/iso-9001-7-1-5-2-measurement-traceability); quando não existirem tais padrões, a base usada deve ser mantida como informação documentada. O equipamento deve ser identificado para que se saiba sua situação e protegido de ajustes, danos ou deterioração que invalidem a calibração e as medições seguintes. E a organização deve determinar se a validade de resultados anteriores foi afetada quando o equipamento se mostra inadequado ao uso pretendido, tomando a ação apropriada.

Lida como especificação de sistema, essa cláusula vira quatro funções: **vencimento** (intervalos especificados), **situação visível** (identificado para determinar sua situação), **proteção** (quem pode mexer no instrumento e no registro) e **avaliação de impacto** (resultados anteriores). A última é a que mais falta nas planilhas.

Há também uma mudança de edição em curso: a ISO informa que a [ISO 9001:2026, sexta edição, foi publicada em 16/09/2026](https://www.iso.org/standard/9001) e que empresas certificadas migram no prazo do seu ciclo de certificação. Não verifiquei se a numeração ou o texto da cláusula de recursos de monitoramento e medição mudaram na edição nova; quem decide como a migração afeta o seu sistema de gestão é a sua qualidade, com o organismo certificador.

## Calibração, verificação e ajuste não são a mesma coisa

O sistema vai ter campos e estados com esses nomes, então vale usá-los no sentido do VIM:

- **Calibração** é a operação que estabelece a relação entre os valores de um padrão, com suas incertezas, e as indicações do instrumento, também com suas incertezas, e usa essa relação para obter um resultado a partir de uma indicação. O VIM avisa que [calibração não deve ser confundida com ajuste nem com verificação](https://jcgm.bipm.org/vim/en/2.39.html). Calibrar é medir o erro do instrumento; não é consertá-lo.
- **Verificação** é o [fornecimento de evidência objetiva de que um item atende a requisitos especificados](https://jcgm.bipm.org/vim/en/2.44.html), com a nota de que, quando aplicável, a incerteza deve ser considerada. Dizer "o micrômetro está aprovado" é uma verificação feita sobre o resultado da calibração, contra um critério.
- **Ajuste** é a intervenção no instrumento para que ele passe a indicar valores corretos. Se o laboratório ajusta, o certificado pode trazer resultados antes e depois do ajuste; para avaliar o que o instrumento mediu nos meses anteriores, interessa o resultado de **antes**.
- **Rastreabilidade metrológica** é a propriedade de um resultado que pode ser relacionado a uma referência por [uma cadeia ininterrupta e documentada de calibrações, cada uma contribuindo para a incerteza](https://jcgm.bipm.org/vim/en/2.41.html). A nota do VIM lista os elementos que a ILAC considera para confirmá-la, entre eles incerteza documentada, procedimento documentado, competência técnica acreditada e intervalos de calibração.
- **Incerteza expandida (U)** é a incerteza-padrão combinada [multiplicada por um fator de abrangência maior que um](https://jcgm.bipm.org/vim/en/2.35.html), o *k* que aparece no certificado.
- **Erro máximo admissível (EMA)** é, na redação do VIM 2012 reproduzida em curso do Inmetro, o [valor extremo do erro de medição, com respeito a um valor de referência conhecido, aceito por especificações ou regulamentos](https://bibliotecadigital.enap.gov.br/bitstream/1/6687/5/M%c3%b3dulo%203%20Conceitos%20T%c3%a9cnicos%20em%20Metrologia.pdf). Para instrumentos usados no controle interno da produção, quem define o valor aceito é, em geral, a própria empresa.

A edição luso-brasileira do VIM, adotada pelo Inmetro, é a referência em português; as definições acima foram lidas na versão em inglês do JCGM e num material didático do Inmetro, e a tradução de calibração, verificação e rastreabilidade é minha.

## Cadastro: o instrumento precisa ser único e achável

Tudo o que vem depois depende de saber exatamente de qual instrumento se fala. Defina os campos mínimos e quais são obrigatórios:

- **Código único** gravado ou etiquetado no instrumento, e número de série do fabricante. O código é o que o inspetor lê ou digita na hora de medir; com etiqueta de código de barras ou QR, a leitura no posto segue os cuidados de [leitor de código de barras no sistema](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/).
- **Tipo e faixa de medição.** Micrômetro externo de 25 a 50 mm não é o mesmo que de 0 a 25 mm. A faixa é o que permite ao sistema recusar o uso de um instrumento para uma cota fora dela.
- **Resolução.** O menor incremento da indicação. Ajuda a decidir se o instrumento serve para a tolerância da cota.
- **Local e responsável.** Onde ele fica (laboratório, almoxarifado de instrumentos, célula, bancada) e quem responde por ele. Um instrumento sem responsável é o primeiro a sumir.
- **Critério de aceitação e intervalo.** O EMA e a regra de decisão que se aplicam a ele, e o intervalo de calibração, cada um com quem definiu e quando.
- **Situação.** Um campo calculado ou controlado, nunca digitado livremente (mais abaixo).
- **Instrumento de terceiro.** Recomendação da Torno: instrumento do cliente ou emprestado que for usado para aprovar produto também entra no cadastro, com certificado.

Duas regras simples evitam muita confusão: o sistema recusa código duplicado, e não permite apagar um instrumento que tenha medições registradas; ele é desativado, com motivo, e o histórico continua consultável.

## Intervalo de calibração e vencimento

O intervalo é a decisão que mais se copia sem pensar ("todo mundo calibra uma vez por ano") e a que a literatura técnica menos prescreve. O guia ILAC-G24/OIML D10, sobre determinação de intervalos de calibração, na edição de 2007 (substituída em 2022 por uma [revisão](https://www.cai.cz/wp-content/uploads/2023/09/01_08-P030-ILAC-G24_2022_20230915.pdf) que, pela tradução tcheca consultada, mantém os cinco métodos descritos abaixo), diz que [não parece haver uma única melhor prática universal para estabelecer e ajustar intervalos](https://www.oiml.org/en/files/pdf_d/d010-e07.pdf) e que nenhum método serve para todos os instrumentos. Para o intervalo inicial, lista fatores como a incerteza requerida, o risco de o instrumento exceder o erro máximo admissível em uso, a tendência a desgaste e deriva, a recomendação do fabricante, a intensidade de uso e as condições ambientais. Para revisar o intervalo, descreve cinco métodos: ajuste automático ou "em escada" (encurta ou alonga conforme o resultado de cada calibração), carta de controle, tempo em uso, verificação em serviço ("caixa-preta", com calibração completa só quando a verificação acusa problema) e outras abordagens estatísticas. E adverte contra intervalos fixos que nunca são revistos.

Para o sistema, isso significa que o intervalo é **um parâmetro por instrumento (ou por família), com dono e histórico**, e não uma constante do código. Defina:

- **Quem decide e quem pode alterar.** Em geral, a qualidade ou a metrologia. Técnico que só registra certificados não deveria conseguir alongar intervalo; a regra de acesso segue o que está em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Em que unidade.** Meses, dias, horas de uso ou número de medições. O método "tempo em uso" do guia só funciona se o sistema souber quantas horas ou medições o instrumento teve.
- **A partir de que data conta.** Da data da calibração que está no certificado, da data de recebimento do certificado ou da data em que o instrumento voltou ao uso. São datas diferentes, às vezes com semanas de distância; escolha uma e escreva.
- **O que "vence em 12/11" quer dizer.** Usável até o fim de 12/11, ou só até 11/11? Em que fuso? O raciocínio sobre dia de corte está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Aviso antes do vencimento.** Quantos dias antes e para quem, levando em conta o prazo do laboratório.
- **Verificação intermediária.** Se a empresa faz checagens entre calibrações (um bloco-padrão no micrômetro, uma massa-padrão na balança), o sistema registra cada uma com resultado e critério. Elas não substituem a calibração, mas podem servir como a "última evidência de bom estado" na avaliação de impacto, se a qualidade decidir assim.
- **Revisão do intervalo.** Qual método a empresa usa para alongar ou encurtar, e com que evidência.

O plano de calibração é parecido com um plano de [manutenção preventiva](https://tornostudio.com/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/) por calendário, e alguns sistemas usam a mesma estrutura para os dois. A diferença é o que acontece depois: a ordem de manutenção termina quando a máquina volta a funcionar; a calibração termina com um número que precisa ser julgado contra um critério e que pode invalidar medições passadas.

## Certificado de calibração: o que conferir

O certificado é a evidência central, e o sistema não deveria aceitá-lo só porque o PDF foi anexado. Defina o que alguém precisa conferir, e registrar que conferiu, antes de o instrumento voltar a "liberado":

- **Identificação.** Código e número de série do certificado batem com o cadastro.
- **Laboratório e acreditação.** No Brasil, a acreditação de laboratórios é feita pela Cgcre, do Inmetro, e a RBC (Rede Brasileira de Calibração) é a [base de dados de laboratórios de calibração acreditados segundo a ABNT NBR ISO/IEC 17025](https://www.gov.br/inmetro/pt-br/centrais-de-conteudo/sistemas/rbc). Acreditação não é um selo genérico: ela vale para o escopo. Um certificado de acreditação da Cgcre, por exemplo, diz que a [situação atual e o escopo devem ser verificados no endereço eletrônico do Inmetro](https://ipt.br/wp-content/uploads/2024/04/CAL_0003_certificado.pdf). A página de escopo de um laboratório no sistema RBC mostra a situação, a [descrição do serviço, o parâmetro, a faixa, o método e a capacidade de medição e calibração (CMC)](https://ipt.br/wp-content/uploads/2026/05/CAL_162_escopo_Dimensional.pdf). Confira se o serviço e a faixa do seu instrumento estão no escopo; a resposta e a data da consulta vão para o registro.
- **Pontos calibrados.** Os pontos cobrem a faixa em que o instrumento é usado? Um micrômetro de 25 a 50 mm usado quase só em 40 mm precisa de um ponto perto de 40 mm.
- **Erro e incerteza.** A política ILAC-P14 pede que o resultado inclua o [valor medido e a incerteza expandida U, com fator de abrangência e probabilidade de abrangência declarados](https://cdn-v2.iasonline.org/wp-content/uploads/2021/02/ILAC_P14_09_2020.pdf), que U tenha no máximo dois algarismos significativos e que o laboratório não declare incerteza menor que a da sua CMC. Sem U e sem *k*, o critério de aceitação da empresa não pode ser aplicado.
- **Antes e depois do ajuste.** Se houve ajuste, os dois conjuntos de resultados. O "antes" alimenta a avaliação de impacto; o "depois" decide se o instrumento volta ao uso.
- **Declaração de conformidade.** Alguns certificados trazem "aprovado" ou "conforme". Pergunte contra qual especificação e com qual regra. A UKAS, organismo de acreditação britânico, diz que [cabe ao cliente decidir se um resultado atende aos seus requisitos](https://ukas.com/wp-content/uploads/2023/05/LAB-48-Decision-rules-and-statements-of-conformity.pdf) e que, sem pedido explícito, o laboratório não deve fazer declaração de conformidade. O sistema deve aplicar o critério da empresa aos números, e não copiar a palavra "aprovado".
- **Datas.** Data da calibração e data de emissão, que alimentam o vencimento.

O PDF fica anexado e imutável, com os cuidados de [anexos no sistema](https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/), e quem aceitou o certificado, quando e com qual resultado vai para a [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Critério de aceitação: erro, incerteza e EMA

Aqui está a decisão que a planilha costuma esconder. O certificado diz, para cada ponto, o erro do instrumento e a incerteza expandida da calibração. A empresa precisa dizer o que faz com esses dois números.

- **O EMA de cada instrumento.** De onde vem: especificação do fabricante, norma do tipo de instrumento, ou uma relação com a tolerância das peças que ele mede. Quem define é a qualidade, e o valor fica no cadastro com origem e data.
- **A regra de decisão.** O guia ILAC-G8, sobre regras de decisão e declarações de conformidade, descreve a [aceitação simples](https://www.nite.go.jp/data/000118179.pdf), em que a incerteza não entra (banda de guarda de largura zero: o erro está dentro do limite ou não está), e as regras com **banda de guarda**, em que o limite de aceitação fica para dentro da tolerância para reduzir a probabilidade de aprovar algo que está fora. O mesmo guia prevê declarações condicionais quando o resultado cai na banda de guarda. Uma forma simples de aplicar banda de guarda ao resultado de um instrumento, e a usada no exemplo deste artigo, é exigir que o erro em módulo somado à incerteza expandida fique dentro do EMA (|erro| + U ≤ EMA). Não é a única nem é obrigatória.
- **A zona de dúvida.** Com uma regra de banda de guarda, aparece o caso em que o erro está dentro do EMA mas o erro mais a incerteza não está. O sistema precisa saber o que fazer: reprovar, aprovar com restrição de uso, ou mandar para decisão da qualidade. Escreva qual.
- **Um ponto reprovado reprova o instrumento?** Ou só restringe a faixa de uso? A segunda opção exige que o sistema saiba a faixa de cada cota medida.

Recomendação da Torno: o sistema calcula o resultado de cada ponto com a regra cadastrada e mostra a conta, em vez de pedir ao técnico que marque "aprovado". A palavra vem depois dos números.

## Bloqueio de uso: vencido, reprovado, em calibração, não localizado

O valor do sistema aparece aqui. Defina os estados do instrumento e quais deles permitem medir:

| Situação | Pode ser usado para aprovar produto? |
|---|---|
| Liberado (dentro do prazo, último resultado aceito) | Sim |
| Vencido | Não |
| Em calibração (enviado ao laboratório) | Não |
| Aguardando avaliação do certificado | Não |
| Reprovado | Não |
| Não localizado | Não |
| Desativado | Não |

E defina **onde o bloqueio acontece**. Se a medição é registrada no sistema (inspeção de recebimento, de processo, final), o registro com um instrumento bloqueado é recusado na hora, com a mensagem do motivo. Se a medição continua no papel, o bloqueio é só um aviso, e isso precisa estar escrito: um sistema que só lista vencidos num relatório não impede nada.

Duas perguntas costumam aparecer no teste: o que acontece com uma inspeção iniciada às 23h50 do dia do vencimento e concluída depois da meia-noite, e se o substituto do instrumento enviado ao laboratório fica registrado automaticamente na ordem ou no posto. Responda antes.

## Instrumento reprovado: o que já foi medido com ele

Quando um instrumento reprova, a cláusula 7.1.5.2 lida acima pede que se determine se a validade de resultados anteriores foi afetada. No sistema, isso só é possível se cada medição registrar **qual instrumento foi usado**. Sem esse vínculo, a avaliação de impacto vira uma reunião para lembrar quem mediu o quê.

Defina:

- **A janela de impacto.** De quando até quando as medições ficam sob suspeita. Começa na última evidência de que o instrumento estava bom: a última calibração aceita ou, se a qualidade aceitar, a última verificação intermediária aprovada. Termina quando o instrumento saiu de uso. Escreva a regra antes do primeiro caso.
- **O que o sistema lista.** Todas as medições feitas com o instrumento na janela, com item, lote, ordem, cota, leitura registrada e onde o lote está hoje (em processo, em estoque, expedido, com nota e cliente). O rastreio do lote no estoque é o do artigo sobre [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/).
- **Leitura corrigida.** Com o erro "antes do ajuste" do certificado, o sistema pode mostrar, para cada leitura, o valor corrigido e se ele, com a incerteza, ainda fica dentro da tolerância da cota. Isso ajuda a separar os lotes claramente afetados dos que não são. Se só uma amostra de cada lote teve a leitura registrada, a conclusão vale para a amostra; o que fazer com o resto do lote é decisão da qualidade.
- **Decisão por lote.** Para cada lote da janela: abrir não conformidade, reinspecionar com outro instrumento, ou liberar com justificativa registrada. A avaliação de impacto não encerra enquanto houver lote sem decisão; a alçada para cada decisão segue um [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).
- **Ligação com a RNC.** O tratamento do produto suspeito (bloqueio do saldo, contato com o cliente, disposição, ação corretiva) é o da [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/). O controle de calibração decide quando abrir a RNC e entrega a lista de lotes; não repete o fluxo dela.

A documentação de fornecedores costuma cobrir bem o ciclo da calibração e menos esta parte. Na ajuda do SAP, por exemplo, o instrumento é um equipamento cadastrado, um plano de manutenção gera [uma ordem e um lote de inspeção para a calibração](https://help.sap.com/saphelp_46c/helpdata/fr/ec/de3154e56f11d4b3820050da4ceab0/content.htm), os resultados são registrados por característica e, na decisão de utilização, o sistema propõe a situação do instrumento; a ajuda de [gestão de equipamentos de teste](https://help.sap.com/saphelp_46c/helpdata/en/8a/1a217c4e4211d182be0000e829fbfe/content.htm) diz que essa decisão define se o objeto volta ao uso, é reparado ou é rejeitado. As duas páginas, de uma versão antiga do produto, não descrevem a busca das medições feitas com o instrumento reprovado. Em qualquer ferramenta, confira como essa consulta é feita antes de comprar ou de programar.

## Empréstimo, localização e histórico

Instrumento que circula some. O sistema precisa saber onde cada um está e com quem:

- **Movimentação.** Retirada e devolução do almoxarifado de instrumentos, transferência entre células, envio e retorno do laboratório, cada uma com data, de onde, para onde e quem.
- **Inventário de instrumentos.** Uma contagem periódica, como a de [inventário de estoque](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/), em que cada instrumento é lido no local. O que não é encontrado passa a "não localizado" e fica bloqueado; se reaparecer, a empresa decide se volta direto a "liberado" ou se precisa de verificação antes, porque não se sabe o que aconteceu com ele.
- **Histórico.** Todos os certificados, verificações, ajustes, reparos, mudanças de intervalo e de critério, movimentações e avaliações de impacto, em ordem, sem possibilidade de apagar. É esse histórico que mostra, na auditoria, que o instrumento estava liberado no dia em que mediu a peça.
- **Migração da planilha.** Instrumentos importados sem data de calibração, sem certificado ou com código repetido não entram como "liberados". Eles entram bloqueados, com pendência, e a importação segue os cuidados de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Campos obrigatórios do cadastro, codificação e etiqueta | Qualidade, com TI |
| Intervalo de calibração de cada instrumento ou família, unidade e data de início da contagem | Qualidade ou metrologia |
| Método de revisão do intervalo | Qualidade ou metrologia |
| Verificação intermediária: quais instrumentos, frequência e critério | Qualidade ou metrologia, com produção |
| Laboratórios aceitos e o que conferir no certificado | Qualidade, com suprimentos |
| EMA de cada instrumento e regra de decisão, inclusive a zona de dúvida | Qualidade |
| Situações que bloqueiam o uso e onde o bloqueio acontece | Qualidade, com produção e TI |
| Janela de impacto e decisão de cada lote afetado | Qualidade |
| Comunicação ao cliente sobre lote expedido | Qualidade e comercial, conforme contrato |
| Local, responsável, empréstimo e inventário de instrumentos | Qualidade e líderes de produção |
| Quem pode alterar intervalo, critério e situação | Direção da qualidade, com TI |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Usinagem Exemplo Ltda. torneia o eixo ER-40, com diâmetro de 40,00 ± 0,02 mm (de 39,980 a 40,020 mm). A cota é medida na célula do torno TC-02 com o micrômetro externo MIC-014, faixa de 25 a 50 mm, resolução de 0,001 mm, responsável o líder da célula. O plano de inspeção registra a leitura de 5 peças por lote, com o código do instrumento.

Regras da empresa (escolhas do exemplo, não recomendação):

- **Intervalo.** 12 meses para micrômetros, contados da data da calibração no certificado. O instrumento pode ser usado até o fim do dia do vencimento, horário de Brasília. Aviso 30 dias antes.
- **Critério.** EMA de 0,004 mm para o MIC-014, definido pela qualidade. Regra de decisão: |erro| + U ≤ EMA em todos os pontos; um ponto fora reprova o instrumento.
- **Verificação intermediária.** Mensal, com bloco-padrão de 40 mm; critério: desvio de até 0,003 mm.
- **Janela de impacto.** Da última evidência de bom estado (calibração aceita ou verificação intermediária aprovada, a mais recente) até a retirada de uso.
- **Suspeita.** Leitura que, corrigida pelo erro do certificado e considerando a incerteza, pode estar fora da tolerância.

**Histórico do MIC-014.** Calibrado em 12/11/2025, certificado CC-2025-0877, de laboratório com o serviço e a faixa conferidos no escopo da RBC: no ponto de 40 mm, erro de +0,001 mm e U de 0,0015 mm (*k* = 2), soma de 0,0025 mm, dentro do EMA. Vencimento: 12/11/2026; aviso em 13/10/2026. Verificação intermediária de 05/10/2026: leitura de 40,002 mm no bloco de 40 mm, desvio de +0,002 mm, aprovada. Em 10/11/2026, o MIC-014 é retirado de uso e enviado ao laboratório, dois dias antes do vencimento; o MIC-022, liberado e com vencimento em 20/05/2027, vai para a célula no lugar dele. O laboratório calibra em 11/11 e emite o certificado CC-2026-1093 em 13/11; a qualidade registra o certificado em 16/11/2026.

**Resultado do certificado CC-2026-1093** (sem ajuste; U = 0,0015 mm, *k* = 2):

| Ponto | Erro | \|erro\| + U | Resultado pela regra |
|---|---|---|---|
| 25 mm | +0,001 mm | 0,0025 mm | Conforme |
| 30 mm | +0,002 mm | 0,0035 mm | Conforme |
| 35 mm | +0,003 mm | 0,0045 mm | Não conforme |
| 40 mm | +0,006 mm | 0,0075 mm | Não conforme |
| 50 mm | +0,004 mm | 0,0055 mm | Não conforme |

No ponto de 35 mm, o erro de 0,003 mm está dentro do EMA de 0,004 mm, mas o erro mais a incerteza (0,0045 mm) não está: é a zona de dúvida, e a regra da empresa manda reprovar. O ponto de 50 mm também cai nela: o erro de 0,004 mm é igual ao EMA, mas a soma (0,0055 mm) passa. Com três pontos fora, o MIC-014 é **reprovado em 16/11/2026** e bloqueado.

![Ilustração com cinco linhas de escala, uma para cada ponto de calibração do micrômetro fictício MIC-014, faixa de 25 a 50 mm, certificado CC-2026-1093, calibrado em 11/11/2026. No alto, a regra escolhida pela empresa: módulo do erro mais U menor ou igual ao EMA de 0,004 mm, com U para k igual a 2. Em cada linha, uma faixa verde de menos 0,004 a mais 0,004 milímetro, o erro máximo admissível, com fundo vermelho claro fora dela, e um ponto com uma barra de mais ou menos U, 0,0015 milímetro. 25 mm: erro mais 0,001, soma 0,0025, conforme, em azul. 30 mm: mais 0,002, soma 0,0035, conforme. 35 mm: mais 0,003, soma 0,0045, não conforme, em vermelho. 40 mm: mais 0,006, soma 0,0075, não conforme. 50 mm: mais 0,004, soma 0,0055, não conforme. Um quadro amarelo explica que, em 35 mm, o erro está dentro do EMA, mas 0,003 mais 0,0015 igual a 0,0045 passa de 0,004, e pela regra da empresa é não conforme. Uma faixa vermelha diz: reprovado, 3 de 5 pontos fora, registrado em 16/11/2026, bloqueado para medição e com impacto a avaliar. Exemplo fictício.](./torno-calibracao-faixa-ema.svg)

*Exemplo fictício: instrumento, certificado, erros, incerteza e EMA inventados; o mesmo certificado aprova ou reprova conforme a regra que a empresa escreveu antes. Ilustração original Torno, 2026.*

**Avaliação de impacto.** A última evidência de bom estado é a verificação de 05/10/2026, mais recente que a calibração de 12/11/2025; o MIC-014 saiu de uso em 10/11/2026. Janela: de 05/10 a 10/11/2026, 36 dias. O sistema lista as medições do MIC-014 nesse intervalo e o lote medido em 28/09 fica de fora:

| Lote | Medido em | Peças | Onde está | Menor leitura | Corrigida (− 0,006) |
|---|---|---|---|---|---|
| L2609-21 | 28/09 | 400 | Expedido | (fora da janela) | — |
| L2610-04 | 07/10 | 300 | Expedido | 39,993 mm | 39,987 mm |
| L2610-15 | 21/10 | 450 | Expedido em 23/10 | 39,985 mm | 39,979 mm |
| L2611-02 | 04/11 | 200 | Estoque | 39,996 mm | 39,990 mm |
| L2611-06 | 09/11 | 250 | Estoque | 39,983 mm | 39,977 mm |

Na janela: 4 lotes, 1.200 peças, 750 expedidas e 450 em estoque. Como o erro em 40 mm é de +0,006 mm, o micrômetro indicava a mais, e peças abaixo do mínimo podem ter sido aceitas. Pela regra de suspeita da empresa, uma leitura só fica fora de suspeita, mesmo no pior caso da incerteza do certificado, se for de pelo menos 39,980 + 0,006 + 0,0015 = 39,9875 mm; na resolução de 0,001 mm, são suspeitas as leituras de 39,987 mm para baixo. Do lado de cima, pela mesma conta, não há suspeita: a maior leitura aceitável, 40,020 mm, corrigida e somada à incerteza, dá 40,0155 mm.

- **L2610-15** (menor leitura 39,985 mm, corrigida 39,979 mm, abaixo de 39,980): suspeito, já expedido. A qualidade abre a RNC, com nota e cliente, e registra a decisão sobre comunicar o cliente.
- **L2611-06** (39,983 mm, corrigida 39,977 mm): suspeito, em estoque. Saldo de 250 peças bloqueado, RNC aberta e reinspeção com o MIC-022.
- **L2610-04** (corrigida 39,987 mm; menos a incerteza, 39,9855 mm) e **L2611-02** (corrigida 39,990 mm; 39,9885 mm): nenhuma leitura da amostra abaixo do limite. No exemplo, a qualidade libera os dois lotes com justificativa registrada; essa é uma decisão sobre uma amostra de 5 peças, da empresa fictícia, e não uma recomendação. As outras peças de cada lote não têm leitura registrada, e a justificativa precisa dizer por que a qualidade aceita esse risco em vez de reinspecionar.

Suspeitos: 2 lotes, 700 peças (450 expedidas e 250 em estoque).

![Ilustração de uma linha do tempo vertical do micrômetro fictício MIC-014, da Usinagem Exemplo Ltda., para o eixo ER-40 de diâmetro 40,00 mais ou menos 0,02 milímetro. No alto, depois de um sinal de interrupção da escala, a calibração aprovada de 12/11/2025, certificado CC-2025-0877. Em seguida: 28/09, lote L2609-21, 400 peças, fora da janela; 05/10, verificação com bloco de 40 mm aprovada, início da janela; 07/10, L2610-04, 300 peças, expedido; 21/10, L2610-15, 450 peças, expedido, em vermelho; 04/11, L2611-02, 200 peças, em estoque; 09/11, L2611-06, 250 peças, em estoque, em vermelho; 10/11, retirado de uso e enviado ao laboratório, fim da janela; 16/11, certificado registrado, reprovado. Uma faixa vermelha ao longo da linha marca a janela de impacto de 05/10 a 10/11, 36 dias, 4 lotes e 1.200 peças. Abaixo, uma tabela com a menor leitura de 5 peças por lote e a leitura corrigida: L2610-04, 39,993 e 39,987, liberado com justificativa; L2610-15, 39,985 e 39,979, RNC com o cliente; L2611-02, 39,996 e 39,990, liberado com justificativa; L2611-06, 39,983 e 39,977, RNC e bloqueado. No rodapé: suspeita se a leitura estiver abaixo de 39,9875 milímetros, igual a 39,980 mais erro de 0,006 mais U de 0,0015; 4 lotes e 1.200 peças na janela; 2 suspeitos, 700 peças, 450 expedidas e 250 no estoque. Exemplo fictício.](./torno-calibracao-janela-impacto.svg)

*Exemplo fictício: empresa, peça, lotes, leituras e datas inventados; a janela começa na última evidência de que o instrumento estava bom, e cada lote dentro dela precisa de uma decisão registrada. Ilustração original Torno, 2026.*

**Outros instrumentos do exemplo.** O paquímetro PAQ-031 (0 a 150 mm, resolução 0,01 mm) foi calibrado em 15/11/2025 e venceu em 15/11/2026; desde 16/11 está bloqueado. O micrômetro MIC-009 não foi encontrado no inventário de instrumentos de 03/11/2026 e está "não localizado"; pela regra da empresa, se reaparecer, só volta a "liberado" depois de uma verificação com bloco-padrão.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com instrumentos, certificados, peças e lotes fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cadastro de micrômetro sem faixa ou sem resolução | Cadastro recusado com o campo faltante indicado | Tentativa recusada |
| Cadastro de um segundo instrumento com o código MIC-014 | Recusado por código duplicado | Tentativa recusada |
| MIC-014 calibrado em 12/11/2025 com intervalo de 12 meses | Vencimento em 12/11/2026; aviso em 13/10/2026 ao responsável e à qualidade | Cadastro e aviso enviado |
| Técnico tenta mudar o intervalo do MIC-014 de 12 para 24 meses | Negado; só o perfil da qualidade altera intervalo, com motivo | Tentativa negada |
| Qualidade muda o intervalo de um micrômetro de 12 para 6 meses, com motivo | Vencimento recalculado a partir da última calibração; alteração com autor, data e motivo | Histórico do instrumento e trilha |
| Registro de medição com o PAQ-031 em 17/11/2026 | Bloqueado: venceu em 15/11/2026, bloqueado desde 16/11 | Tentativa recusada com o motivo |
| MIC-014 enviado ao laboratório em 10/11 | Situação "em calibração"; medição com ele recusada; MIC-022 registrado como substituto na célula TC-02 | Histórico e movimentação |
| Certificado anexado sem incerteza expandida ou sem fator de abrangência | Não aceito como evidência; instrumento continua "aguardando avaliação" | Tentativa recusada |
| Certificado de laboratório sem a conferência de escopo registrada | Pendente; instrumento não volta a "liberado" | Pendência no certificado |
| Certificado CC-2026-1093, ponto de 25 mm: +0,001 e U 0,0015 | 0,0025 ≤ 0,004: conforme; conta exibida | Memória de cálculo |
| Mesmo certificado, ponto de 35 mm: +0,003 e U 0,0015 | 0,0045 > 0,004: não conforme, embora o erro esteja dentro do EMA | Memória de cálculo |
| Mesmo certificado, ponto de 40 mm: +0,006 e U 0,0015 | 0,0075 > 0,004: não conforme; MIC-014 reprovado em 16/11/2026, 3 de 5 pontos fora | Memória de cálculo e situação |
| Técnico marca o MIC-014 como "aprovado" com o certificado reprovado | Não é possível; a situação vem da regra aplicada aos números | Tentativa negada |
| Registro de medição com o MIC-014 em 16/11, depois da reprovação | Bloqueado: reprovado | Tentativa recusada |
| Avaliação de impacto do MIC-014 | Janela de 05/10 a 10/11/2026 (verificação de 05/10 mais recente que a calibração de 12/11/2025); 4 lotes, 1.200 peças; L2609-21, de 28/09, fora | Relatório de impacto |
| Leituras da janela contra o limite de 39,9875 mm | Suspeitos L2610-15 (39,985) e L2611-06 (39,983), 700 peças; corrigidas 39,979 e 39,977 | Relatório de impacto |
| Abertura da RNC do L2611-06 a partir da avaliação | Saldo de 250 peças bloqueado; RNC vinculada ao instrumento e ao certificado | RNC e consulta de estoque |
| Abertura da RNC do L2610-15, expedido | RNC com nota, cliente e 450 peças; pede registro da decisão de comunicar o cliente | Ficha da RNC |
| Tentativa de encerrar a avaliação com o L2611-02 sem decisão | Bloqueada até cada um dos 4 lotes ter decisão e justificativa | Tentativa recusada |
| MIC-009 não encontrado no inventário de 03/11 e reencontrado depois | Bloqueado como "não localizado"; ao reaparecer, só volta a "liberado" após verificação registrada | Histórico do instrumento |

*Fim do exemplo fictício. Empresa, peça, instrumentos, certificados, laboratório, erros, incertezas, EMA, regra de decisão, intervalos, verificação, lotes, leituras, datas e decisões são modelo editorial, sem medição real, cliente ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não norma, intervalo ou critério recomendado, nem comportamento padrão de ferramenta.*

Antes do go-live, importe a planilha atual num ambiente de teste e confira instrumento por instrumento: quantos entram bloqueados por falta de certificado ou de data, quantos têm intervalo sem dono e quantos certificados não trazem incerteza. Essa lista costuma ser o primeiro trabalho real da qualidade. Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### O sistema pode definir o intervalo de calibração sozinho?

Pode aplicar um método escolhido pela empresa, como encurtar o intervalo quando um resultado sai perto do limite e alongar depois de várias calibrações estáveis, que é o método "em escada" descrito no guia ILAC-G24/OIML D10. A escolha do método, dos limites e de quando aceitar a mudança continua sendo da qualidade, e cada mudança precisa ficar registrada.

### Se o certificado diz "aprovado", preciso aplicar o meu critério?

Sim. A declaração do laboratório depende da especificação e da regra que ele usou, e nem sempre são as da sua empresa. O sistema deve aplicar o seu EMA e a sua regra aos números do certificado; se os dois resultados divergirem, é uma pergunta para a qualidade, não um detalhe de cadastro.

### Toda reprovação obriga a recolher peças?

Não necessariamente. A reprovação obriga a avaliar o que foi medido, e o resultado dessa avaliação pode ser liberar com justificativa, reinspecionar ou abrir não conformidade, lote a lote. O que não pode é a avaliação não existir, ou terminar sem uma decisão registrada para cada lote dentro da janela.

Para transformar a planilha de calibração em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a lista atual de instrumentos, um certificado recente e o caso mais recente de instrumento reprovado, sem dados confidenciais de clientes.

*Fontes consultadas em 18 de novembro de 2026: Auditor Training Online, reprodução da cláusula 7.1.5.2 da ISO 9001:2015 (14/07/2023); ISO, página da ISO 9001 (edição 2026, publicada em 16/09/2026); JCGM/BIPM, VIM3 online, verbetes 2.35, 2.39, 2.41 e 2.44; Inmetro, curso Metrologia Básica, Aula 3 (outubro de 2020, VIM 2012); ILAC-G24/OIML D10:2007, e a edição de 2022 em tradução do CAI tcheco (15/09/2023); ILAC-P14:09/2020; ILAC-G8:09/2019, cópia bilíngue publicada pelo NITE; UKAS, LAB 48, edição 5 (julho de 2024); Inmetro, página da RBC (atualizada em 01/02/2021); Cgcre, certificado de acreditação CAL 0003 e escopo da acreditação nº 162 do sistema RBC (18/05/2026), publicados pelo IPT; SAP Help Portal, calibração de instrumentos e gestão de equipamentos de teste (4.6C). Este artigo não é parecer de certificação e não recomenda sistema, laboratório nem fornecedor; empresas, instrumentos, números e ilustrações são fictícios.*
