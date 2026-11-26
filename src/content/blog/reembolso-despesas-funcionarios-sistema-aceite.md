---
content_id: torno-artigo-pt-20261126-reembolso-despesas-sistema
intent_id: buyer-employee-expense-reimbursement-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Sistema de reembolso de despesas de funcionários: o que definir e testar na política escrita, no comprovante fiscal e na leitura da NF-e e da NFC-e, na nota enviada duas vezes, na quilometragem com veículo próprio, no adiantamento e na prestação de contas com saldo, nas diárias e na ajuda de custo, na aprovação por alçada, no pagamento, na conciliação, na guarda dos comprovantes e nos dados pessoais antes de aceitar um sistema próprio, sob medida ou integrado ao financeiro'
h1: 'Sistema de reembolso de despesas: política, comprovantes, adiantamentos e o que testar antes de aceitar'
seo_title: 'Sistema de reembolso de despesas: o que testar | Torno'
seo_description: 'Sistema de reembolso de despesas: política, NF-e e NFC-e, nota duplicada, quilometragem, adiantamento e prestação de contas, alçada e critérios de aceite.'
summary: 'Roteiro para a empresa que contrata, constrói ou vai aceitar um sistema de reembolso de despesas de funcionários: política escrita com categorias, limites, prazos e quem aprova; comprovante fiscal e o que ler numa NF-e ou NFC-e (chave de acesso de 44 dígitos, DANFE que não é a nota, consulta pela chave, QR Code da NFC-e, emitente, consumidor identificado ou não, nota em nome de quem); a mesma nota enviada duas vezes, pela mesma pessoa ou por colegas, e o recibo sem chave; quilometragem com veículo próprio, com valor por km da política, rota de referência, odômetro e tolerância; adiantamento e prestação de contas com saldo a devolver ou a receber, prazo, alerta e desconto em folha só por decisão registrada (CLT, art. 462); diárias para viagem, ajuda de custo e reembolso como tipos separados, com a redação do art. 457, § 2º, da CLT dada pela Lei nº 13.467/2017 e a regra antiga dos 50% que sistemas legados ainda aplicam; aprovação por alçada e glosa com motivo; pagamento na conta do próprio funcionário e conciliação; guarda dos comprovantes e dados pessoais (LGPD); quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) com um exemplo fictício de dezembro de 2026, contas refeitas em Python.'
primary_question: 'O que uma empresa precisa definir e testar num sistema de reembolso de despesas de funcionários, próprio, sob medida ou integrado ao financeiro, para que cada despesa tenha comprovante válido e lido da nota, nenhuma nota seja paga duas vezes, a quilometragem tenha base conferível, cada adiantamento termine com saldo zerado, diárias e ajuda de custo fiquem separadas do reembolso, cada aprovação respeite a alçada, o pagamento caia na conta certa e concilie, e os comprovantes fiquem guardados com acesso restrito, antes de aceitar o sistema?'
proposed_path: /blog/reembolso-despesas-funcionarios-sistema-aceite/
canonical_url: https://tornostudio.com/blog/reembolso-despesas-funcionarios-sistema-aceite/
url_owner: 'Torno; destino editorial proposto, ainda não publicado.'
audience: 'Donos, diretores financeiros, gerentes de financeiro, de RH e de departamento pessoal, contadores, jurídico, gestores de equipes que viajam ou trabalham na rua e TI de empresas pequenas e médias que contratam, constroem, integram ou vão aceitar um sistema de reembolso de despesas, e quem vai implementá-lo.'
buyer_stage: 'Especificação, contratação e aceite, ao trocar a planilha de despesas, o envelope de cupons e o e-mail com fotos por um sistema, ao encomendar um módulo de reembolso sob medida, ou ao ligar o reembolso ao financeiro, à folha ou à contabilidade.'
scope: 'Política escrita (categorias, limites, prazos, exceções, quem aprova); comprovante fiscal e leitura de NF-e e NFC-e (chave de acesso, DANFE, consulta pela chave, QR Code, emitente, consumidor, nota em nome da empresa ou do funcionário); recibo sem chave; detecção da mesma nota enviada duas vezes e da conta dividida; quilometragem com veículo próprio (valor por km, rota de referência, odômetro, tolerância, o que o valor por km já cobre); adiantamento, prazo de prestação de contas, saldo a devolver ou a receber, alertas e desconto em folha como decisão registrada; diárias para viagem, ajuda de custo e reembolso como tipos separados e configuráveis; aprovação, alçada, glosa e substituto; pagamento na conta do próprio funcionário, lote e conciliação; guarda dos comprovantes e dados pessoais; relatórios, permissões, trilha e migração; quem decide; critérios de aceite com dados fictícios.'
not_scope: 'Orientação jurídica, trabalhista, previdenciária, tributária ou contábil individual, inclusive se uma verba é diária, ajuda de custo, reembolso ou salário num caso concreto, se incide imposto ou contribuição, se a empresa pode descontar um saldo do salário, se uma despesa é dedutível ou dá crédito, qual valor por km usar e por quanto tempo guardar cada documento; viagens internacionais, câmbio e comprovantes estrangeiros; cartão corporativo e sua fatura como fluxo próprio; compras da empresa com nota contra pedido; gestão de frota da empresa; escolha, recomendação ou comparação de fornecedor de sistema de despesas, de cartão ou de agência de viagens; preço de sistema.'
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-26T21:15:00Z'
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
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata fluxos de aprovação em geral (estados, retornos, ordem); aqui a alçada por valor da prestação de contas e a glosa parcial.
  - path: https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/
    reason: Trata a delegação de aprovações durante uma ausência; aqui o gestor que viaja junto ou está de férias quando a prestação chega.
  - path: https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/
    reason: Trata leitura de documento por OCR e revisão em geral; aqui o cupom fotografado e por que a chave de acesso vale mais que o texto lido.
  - path: https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/
    reason: Trata a NF-e de compra da empresa contra pedido e recebimento; aqui a nota da despesa de um funcionário, sem pedido.
  - path: https://tornostudio.com/blog/gestao-frota-abastecimento-multas-sistema-aceite/
    reason: Trata veículos da empresa, abastecimento e multas; aqui o carro é do funcionário e a empresa paga por km.
  - path: https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/
    reason: Trata a conciliação bancária em geral; aqui o lote de reembolsos e a devolução do saldo de adiantamento.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o mesmo evento chegando duas vezes numa integração; aqui a mesma nota enviada duas vezes como regra de negócio.
  - path: https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/
    reason: Trata envio, consulta e substituição de anexos; aqui o comprovante como anexo de uma despesa.
  - path: https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/
    reason: Trata o pedido do titular na LGPD; aqui os dados pessoais que os comprovantes carregam e quem pode vê-los.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Trata o conteúdo de um registro de auditoria em geral; aqui envio, glosa, aprovação, pagamento e devolução.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso; aqui quem envia, quem aprova, quem paga e quem vê comprovantes de outros.
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Trata a adaptação de campos de CNPJ; aqui o CNPJ do emitente e da empresa nas notas de despesa.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata valores monetários e arredondamento; aqui limites, glosa, quilometragem e saldo do adiantamento.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Trata migração de dados em geral; aqui adiantamentos em aberto e despesas pendentes da planilha antiga.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a política de reembolso em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A Lei nº 13.467/2017 deu ao § 2º do art. 457 da CLT a redação: "As importâncias, ainda que habituais, pagas a título de ajuda de custo, auxílio-alimentação, vedado seu pagamento em dinheiro, diárias para viagem, prêmios e abonos não integram a remuneração do empregado, não se incorporam ao contrato de trabalho e não constituem base de incidência de qualquer encargo trabalhista e previdenciário."; e ao § 1º: "Integram o salário a importância fixa estipulada, as gratificações legais e as comissões pagas pelo empregador."'
    reference: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm
    entity: 'Presidência da República (Planalto), Lei nº 13.467, de 13/07/2017'
    source_date: '2017-07-13'
    checked_at: '2026-11-26T21:01:00Z'
    limit: 'Texto da lei alteradora, não o compilado da CLT (o caput do art. 457 aparece com reticências). Se uma verba concreta é de fato diária, ajuda de custo ou reembolso, e se incide imposto de renda ou contribuição, é decisão do contador e do jurídico; a posição da Receita Federal sobre ressarcimentos não foi pesquisada.'
  - classification: FATO
    claim: 'A Lei nº 1.999/1953 deu ao § 2º do art. 457 da CLT a redação "Não se incluem nos salários as ajudas de custo, assim como as diárias para viagem que não excedam de 50% do salário percebido pelo empregado", e ao § 1º a regra de que integram o salário as diárias para viagem, entre outras parcelas.'
    reference: https://www2.camara.leg.br/legin/fed/lei/1950-1959/lei-1999-1-outubro-1953-324836-publicacaooriginal-1-pl.html
    entity: 'Câmara dos Deputados, Legislação Informatizada, Lei nº 1.999, de 01/10/1953, publicação original'
    source_date: '1953-10-01'
    checked_at: '2026-11-26T21:05:00Z'
    limit: 'Redação anterior, substituída pela Lei nº 13.467/2017; citada só para mostrar a regra que sistemas e planilhas antigos podem ainda aplicar. A página adverte que não substitui o texto publicado no Diário Oficial.'
  - classification: FATO
    claim: 'O art. 462 da CLT diz: "Ao empregador é vedado efetuar qualquer desconto nos salários do empregado, salvo quando este resultar de adiantamentos, de dispositivos de lei ou de contrato coletivo."; e o § 1º trata do desconto por dano causado pelo empregado, lícito se acordado ou em caso de dolo.'
    reference: https://legis.senado.leg.br/sdleg-getter/documento?dm=4156453
    entity: 'Senado Federal, documento com o texto do Decreto-Lei nº 5.452/1943 (CLT), arquivo do Prodasen'
    source_date: '1943-05-01'
    checked_at: '2026-11-26T21:02:00Z'
    limit: 'Arquivo sem data de edição ou atualização informada; o texto do caput e do § 1º foi lido, os demais parágrafos não. Se o saldo de um adiantamento de viagem pode ser descontado do salário, com que autorização e em que limite, inclusive na rescisão, é decisão do jurídico e do RH.'
  - classification: FATO
    claim: 'A página de perguntas frequentes da NF-e da Secretaria da Fazenda do Rio Grande do Sul diz que a chave de acesso é um código numérico de 44 posições; que o DANFE é uma representação simplificada da NF-e, que não se confunde com ela, e traz a chave numérica e o código de barras; que a chave permite verificar se a operação está "regularmente acobertada por documento fiscal hábil"; e que o consumidor pessoa física pode consultar a existência e a validade da NF-e pela internet.'
    reference: https://www.sefaz.rs.gov.br/ASP/SEF_ROOT/inf/SEF-NFE_Duvidas4.htm
    entity: 'Secretaria da Fazenda do Estado do Rio Grande do Sul, perguntas frequentes da Nota Fiscal Eletrônica'
    source_date: 'SEM DADO'
    checked_at: '2026-11-26T21:04:00Z'
    limit: 'Página sem data. Não descreve a composição interna da chave. O Manual de Orientação do Contribuinte e o Portal Nacional da NF-e não puderam ser abertos nesta pesquisa (o portal não respondeu à ferramenta de leitura).'
  - classification: FATO
    claim: 'As páginas de serviço da Secretaria da Fazenda do Paraná informam que qualquer pessoa pode consultar uma NF-e digitando a chave de acesso e escolhendo o ambiente de produção ou de homologação, que notas de homologação não têm validade jurídica, e que o cidadão pode consultar da mesma forma uma NFC-e.'
    reference: https://www.fazenda.pr.gov.br/servicos/Empresa/Documentos-fiscais-eletronicos/Consultar-NF-e-nota-fiscal-eletronica-nQ3xbqo2
    entity: 'Secretaria da Fazenda do Paraná, serviços "Consultar NF-e" e "Consultar NFC-e" (https://www.fazenda.pr.gov.br/servicos/Empresa/Documentos-fiscais-eletronicos/Consultar-NFC-e-nota-fiscal-do-consumidor-eletronica-gzNEE1NO)'
    source_date: 'SEM DADO'
    checked_at: '2026-11-26T21:06:00Z'
    limit: 'Páginas de serviço sem data de atualização visível; cada estado tem seu portal. Integração automática com a consulta (serviço web, certificado, limites de uso) não foi verificada e depende do contrato técnico.'
  - classification: FATO
    claim: 'O Manual de Padrões do DANFE NFC-e e QR Code, versão 4.1 (dezembro de 2016), publicado pela Secretaria da Fazenda de São Paulo, diz que o QR Code impresso serve para facilitar a consulta dos dados da NFC-e pelos consumidores e contém uma URL com a chave de acesso, entre outros parâmetros; que a chave é impressa no DANFE NFC-e em 11 blocos de quatro dígitos; e que CPF ou CNPJ do consumidor só são impressos se constarem do arquivo da NFC-e, caso contrário aparece "CONSUMIDOR NÃO IDENTIFICADO".'
    reference: https://portal.fazenda.sp.gov.br/_layouts/15/download.aspx?SourceUrl=%2Fservicos%2Fnfce%2FDownloads%2FManual+de+Especificacoes+Tecnicas+do+DANFE+NFC-e+QR+Code++-+Versao+4.1.pdf
    entity: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo, Manual de Padrões do DANFE NFC-e e QR Code, versão 4.1'
    source_date: '2016-12-01'
    checked_at: '2026-11-26T21:07:00Z'
    limit: 'Versão antiga do manual; versões posteriores mudaram os parâmetros do QR Code e não foram lidas. Usado só para o que o consumidor vê no cupom (QR Code de consulta, chave em blocos, consumidor identificado ou não).'
  - classification: FATO
    claim: 'O Guia de Procedimentos da NF-e da Secretaria da Fazenda de Pernambuco (05/08/2015) diz que, para consultar uma NF-e, é preciso a chave de acesso, código numérico de 44 dígitos, e que baixar o XML pelo Portal Nacional exige o certificado digital da empresa.'
    reference: https://www.sefaz.pe.gov.br/Servicos/nota-fiscal-eletronica/Guias%20e%20Procedimentos/NF-e%20%20Guia%20De%20Procedimentos%20(05-08-2015).pdf
    entity: 'Secretaria da Fazenda de Pernambuco, NF-e Guia de Procedimentos (05/08/2015)'
    source_date: '2015-08-05'
    checked_at: '2026-11-26T21:08:00Z'
    limit: 'Guia de 2015 de um estado; o procedimento atual de download pode ter mudado. Usado só para mostrar por que o funcionário costuma ter o DANFE ou a foto, e não o XML.'
  - classification: FATO
    claim: 'A Lei Complementar nº 116/2003 trata do Imposto Sobre Serviços de Qualquer Natureza, de competência dos Municípios e do Distrito Federal (art. 1º), e a lista de serviços anexa inclui "Hospedagem de qualquer natureza em hotéis, apart-service condominiais, flat, apart-hotéis, hotéis residência" (item 9.01) e "Guarda e estacionamento de veículos terrestres automotores, de aeronaves e de embarcações" (item 11.01).'
    reference: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
    entity: 'Presidência da República (Planalto), Lei Complementar nº 116, de 31/07/2003'
    source_date: '2003-07-31'
    checked_at: '2026-11-26T21:28:00Z'
    limit: 'Aberta pelo revisor factual independente. Usada só para dizer que a nota do hotel e do estacionamento é de serviço, não NF-e nem NFC-e. Padrão, campos e consulta da nota fiscal de serviço (municipal ou nacional) não foram lidos; que documento exigir e o que conferir nele é decisão do contador.'
  - classification: FATO
    claim: 'A LGPD define dado pessoal como "informação relacionada a pessoa natural identificada ou identificável" (art. 5º, I) e inclui entre os dados sensíveis o "dado referente à saúde" (art. 5º, II); manda observar, entre outros, os princípios da finalidade e da necessidade, "limitação do tratamento ao mínimo necessário para a realização de suas finalidades" (art. 6º, I e III); admite o tratamento para cumprimento de obrigação legal ou regulatória, execução de contrato e interesse legítimo (art. 7º, II, V e IX); determina a eliminação dos dados após o término do tratamento, autorizada a conservação para cumprimento de obrigação legal ou regulatória (art. 16, I); e exige medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais (art. 46).'
    reference: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
    entity: 'Presidência da República (Planalto), Lei nº 13.709, de 14/08/2018 (LGPD), texto compilado'
    source_date: '2018-08-14'
    checked_at: '2026-11-26T21:09:00Z'
    limit: 'Base legal de cada tratamento, prazo de conservação e se um comprovante revela dado sensível num caso concreto são decisões do encarregado e do jurídico.'
  - classification: HIPÓTESE
    claim: 'A Exemplo Climatização Ltda., as cidades Vila Esperança e Porto Claro, o Restaurante Maré Alta Ltda., os funcionários Renata M. e Diego A., o gestor Paulo, a analista financeira Cláudia, a diretora financeira Marta, a política (categorias, limites, valor por km de R$ 1,20, tolerância, prazos, alçada de R$ 1.000,00, lote às terças), as notas, a chave de acesso, os valores, as datas e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, orientação jurídica, trabalhista, tributária ou contábil nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; dias da semana, prazos, somas, glosa, quilometragem e saldos refeitos em Python (datetime e decimal) em 26/11/2026.
    entity: Torno
    limit: Não representam empresa, funcionário, estabelecimento, nota fiscal, política de reembolso ou sistema real, nem valores recomendados; a chave de acesso do exemplo foi inventada.
---

*Leitura estimada: 23 minutos.*

**Antes de aceitar um sistema de reembolso de despesas, escreva e aprove sete regras: quais categorias de despesa a empresa reembolsa, com que limite e com que comprovante; o que o sistema lê da nota fiscal e o que a pessoa digita; como uma nota já usada é reconhecida, para não ser paga duas vezes; quanto a empresa paga por km com o carro do funcionário e como a distância é conferida; quando um adiantamento precisa ser prestado e o que acontece com o saldo; quem aprova cada faixa de valor e quem não pode aprovar; e em que conta, em que dia e com que identificador o reembolso é pago.** Depois, teste com uma viagem fictícia cujas contas você já fez à mão. Sem isso, a planilha vira sistema com os mesmos defeitos: o mesmo cupom de jantar é pago duas vezes porque chegou por foto e por PDF, a quilometragem é aprovada sem ninguém saber de onde veio o número, o adiantamento de setembro ainda está "em aberto" em dezembro e o gestor aprova a própria despesa porque o sistema não sabia que ele estava na viagem.

**Este artigo não é orientação jurídica, trabalhista, tributária nem contábil.** Se uma verba é diária, ajuda de custo ou reembolso num caso concreto, se incide imposto ou contribuição, se um saldo pode ser descontado do salário, qual valor por km usar e por quanto tempo guardar cada documento são decisões do contador, do jurídico, do RH e da direção. O texto também não recomenda fornecedor de sistema de despesas, cartão corporativo ou agência de viagens. A CLT, a LGPD e a documentação das Secretarias da Fazenda aparecem para mostrar o que o sistema precisa registrar; a empresa, as pessoas, as notas e os números do exemplo são inventados.

## O que a planilha de reembolso faz e o sistema precisa fazer melhor

Em muitas empresas, o reembolso de despesas de funcionários é uma planilha por viagem, um envelope de cupons entregue no financeiro e um e-mail com fotos para o gestor "dar ok". O adiantamento é uma transferência que alguém anota numa aba separada. A quilometragem é uma linha "km rodados: 480" sem origem.

Funciona até a primeira pergunta difícil. O técnico mandou a foto do cupom do jantar na segunda e o PDF da mesma nota na terça; foram dois reembolsos. A nota do hotel veio no CPF da funcionária, não no CNPJ da empresa; vale? O almoço de quarta passou do limite diário em R$ 15,50; quem decide se paga a diferença? O adiantamento de setembro nunca foi prestado, e ninguém sabe se pode descontar do salário. O gestor viajou junto e aprovou a prestação de contas da equipe, incluindo a própria.

Um sistema de reembolso resolve isso só se a regra estiver escrita. Trocar a planilha por um aplicativo não basta: o sistema precisa saber quais categorias existem e quanto cada uma admite, o que ler de cada comprovante, como reconhecer uma nota repetida, como calcular a quilometragem, quanto de cada adiantamento ainda está com a pessoa e quem pode aprovar o quê.

### Lei, orientação oficial, decisão da empresa e recomendação

Ajuda separar quatro camadas:

- **Lei.** A CLT diz que ajuda de custo e diárias para viagem, entre outras verbas, não integram a remuneração (art. 457, § 2º, na redação da [Lei nº 13.467/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm)) e limita os descontos no salário (art. 462). A [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) se aplica aos dados pessoais que os comprovantes carregam. Nenhuma lei diz qual sistema usar nem como desenhar a política de reembolso.
- **Orientação oficial.** As Secretarias da Fazenda explicam o que é a chave de acesso, o DANFE e a consulta pública de NF-e e NFC-e. Fornecedores de sistemas de despesas dão nomes próprios ao mesmo processo ("relatório de despesas", "prestação", "nota de débito"); são exemplos, não regra.
- **Decisão da empresa.** Categorias, limites, prazos, valor por km, quem aprova cada faixa, se o hotel precisa vir no CNPJ da empresa, o que fazer com um adiantamento não prestado e por quanto tempo guardar os comprovantes. Essa camada precisa estar escrita antes de configurar ou programar, e boa parte dela depende do contador e do jurídico.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", e também onde descrevo o que "o sistema precisa" fazer, é sugestão de modelagem, não requisito de norma nem comportamento padrão de ferramenta.

## Onde este artigo termina e começam os outros

Este artigo trata do reembolso do ponto de vista do sistema: o que a política diz, o que o comprovante prova, como a despesa vira saldo e como o saldo vira pagamento ou devolução. Os assuntos vizinhos têm texto próprio aqui no blog:

- **Fluxo de aprovação.** Estados, retornos e ordem de aprovação em geral estão em [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/). Aqui só a alçada por valor e a glosa parcial.
- **Aprovador ausente.** A delegação durante férias ou viagem do aprovador está em [substituto do aprovador ausente](https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/). Aqui o caso em que o gestor estava na mesma viagem.
- **Leitura de documentos.** OCR e revisão de campos lidos de PDF e imagem estão em [OCR de PDF](https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/). Aqui o que muda quando o documento tem chave de acesso.
- **Nota de compra.** A NF-e de compra da empresa conferida contra pedido e recebimento está em [conferência de NF-e de entrada](https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/). Aqui a nota da despesa de um funcionário, sem pedido.
- **Veículos da empresa.** Abastecimento, multas e documentos da frota estão em [gestão de frota](https://tornostudio.com/blog/gestao-frota-abastecimento-multas-sistema-aceite/). Aqui o carro é do funcionário, e a empresa paga por km.
- **Conciliação.** O casamento do extrato com os lançamentos em geral está em [conciliação bancária](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/). Aqui o lote de reembolsos e a devolução de saldo.
- **Fora do escopo.** Viagens internacionais e câmbio; cartão corporativo como fluxo próprio (a fatura chega antes do comprovante, e a despesa já foi paga pela empresa); folha de pagamento; dedutibilidade, créditos e escrituração; qualquer decisão trabalhista ou tributária de um caso concreto.

## A política escrita: categorias, limites e exceções

O sistema aplica uma política; não a inventa. Antes de configurar, escreva, para cada categoria de despesa:

- **O que entra.** "Alimentação em viagem: refeições do funcionário nos dias da viagem." "Hospedagem: diária de hotel, sem frigobar." "Transporte local: táxi, aplicativo, ônibus." "Estacionamento e pedágio." "Quilometragem com veículo próprio." "Material de uso imediato no cliente." E o que não entra: bebida alcoólica, multa de trânsito, despesa de acompanhante.
- **O limite.** Por item, por dia, por viagem ou por mês; em reais; com a data a partir da qual vale. Um limite muda com o tempo, e a despesa de 08/12 usa o limite vigente em 08/12, não o de hoje.
- **O comprovante exigido.** NF-e ou NFC-e; recibo simples até certo valor; nenhum (diária fixa, se a empresa adotar).
- **Em nome de quem.** Hospedagem no CNPJ da empresa; alimentação no CPF do funcionário ou sem identificação; o que o contador definir para cada categoria.
- **O prazo.** Quantos dias depois da despesa, ou do fim da viagem, ela pode ser enviada.
- **Quem aprova.** Por valor, por categoria, por centro de custo.

Em termos de sistema, recomendação da Torno:

1. **A política é um cadastro com vigência, não um texto no rodapé.** Cada regra tem início, fim, autor da mudança e o documento aprovado que a sustenta. Uma despesa guarda a versão da regra com que foi avaliada.
2. **Limite estourado não é recusa silenciosa.** O sistema mostra quanto passou, propõe a glosa (o corte do excedente) e deixa a decisão com quem tem a alçada, que registra se aprova a exceção ou mantém o corte, com motivo.
3. **Despesa fora da política vira pendência, não erro de digitação.** "Categoria não reembolsável" é uma mensagem com a regra citada; não uma lista suspensa onde a categoria simplesmente não aparece e o funcionário escolhe "outros".
4. **Categoria "outros" tem limite baixo e aprovação extra**, ou não existe. É por ela que a política vaza.

## Comprovante fiscal: o que ler numa NF-e ou NFC-e

As compras de mercadoria numa viagem (a refeição no restaurante, o remédio na farmácia, o combustível no posto) costumam vir com um documento fiscal eletrônico: NF-e ou, no varejo, NFC-e. O que o funcionário tem na mão, porém, raramente é a nota: é o **DANFE**, a representação impressa, ou uma foto dele.

Hospedagem e estacionamento são outra coisa: estão na lista de serviços do ISS, imposto municipal ([Lei Complementar nº 116/2003](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm), itens 9.01 e 11.01). A nota do hotel, portanto, não é NF-e nem NFC-e, e o que vale abaixo sobre a chave de 44 dígitos não se aplica a ela. Que documento de serviço exigir e o que conferir nele, conforme o município ou o padrão nacional da nota de serviço (não lido para este artigo), é decisão do contador.

O que as Secretarias da Fazenda dizem, e que importa para o sistema:

- **A chave de acesso tem 44 dígitos.** A [página de perguntas frequentes da Sefaz do Rio Grande do Sul](https://www.sefaz.rs.gov.br/ASP/SEF_ROOT/inf/SEF-NFE_Duvidas4.htm) descreve a chave como "um código numérico de 44 posições" e diz que o DANFE, representação simplificada da NF-e, não se confunde com ela e traz a chave e o código de barras.
- **A nota pode ser consultada pela chave.** A mesma página diz que a chave permite verificar na Sefaz se a operação está "regularmente acobertada por documento fiscal hábil"; as [páginas de serviço da Sefaz do Paraná](https://www.fazenda.pr.gov.br/servicos/Empresa/Documentos-fiscais-eletronicos/Consultar-NF-e-nota-fiscal-eletronica-nQ3xbqo2) dizem que qualquer pessoa pode consultar uma NF-e digitando a chave, e que o cidadão consulta a NFC-e da mesma forma.
- **O cupom da NFC-e tem QR Code.** O [Manual de Padrões do DANFE NFC-e e QR Code](https://portal.fazenda.sp.gov.br/_layouts/15/download.aspx?SourceUrl=%2Fservicos%2Fnfce%2FDownloads%2FManual+de+Especificacoes+Tecnicas+do+DANFE+NFC-e+QR+Code++-+Versao+4.1.pdf), na versão 4.1 publicada pela Sefaz de São Paulo em 2016, diz que o QR Code serve para facilitar a consulta pelo consumidor, contém uma URL com a chave de acesso e que a chave aparece impressa em 11 blocos de quatro dígitos. Versões posteriores mudaram os parâmetros do QR Code e não foram lidas; o manual aparece aqui só pelo que o consumidor vê no cupom.
- **O consumidor pode não estar identificado.** Pelo mesmo manual, o CPF ou CNPJ do consumidor só aparece no cupom se constar do arquivo da NFC-e; caso contrário, o cupom diz "CONSUMIDOR NÃO IDENTIFICADO".
- **O funcionário raramente tem o XML.** O [guia de procedimentos da Sefaz de Pernambuco](https://www.sefaz.pe.gov.br/Servicos/nota-fiscal-eletronica/Guias%20e%20Procedimentos/NF-e%20%20Guia%20De%20Procedimentos%20(05-08-2015).pdf) (2015) diz que baixar o XML pelo portal nacional exige o certificado digital da empresa. O funcionário, em geral, tem o DANFE ou a foto, não o arquivo.

Daí saem as regras de sistema. Recomendação da Torno:

- **A chave é o dado principal.** O sistema lê a chave do QR Code ou do código de barras, ou recebe a digitação dos 44 dígitos, que só vale depois de a consulta encontrar a nota. Valor, data e emitente são conferidos contra a nota sempre que a consulta estiver disponível; o que a pessoa digitou fica como declaração, e a diferença aparece.
- **O que se lê da nota não se redigita.** Emitente, CNPJ, data e hora, valor total: se a nota foi consultada, esses campos vêm dela. A foto continua anexada como evidência, mas o OCR do texto da foto é o caminho de reserva, não o principal; a diferença entre texto lido e campo validado está em [OCR de PDF](https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/).
- **A consulta é registrada.** Data e hora da consulta, resultado (autorizada, cancelada, não encontrada) e quem fez. Nota cancelada ou não encontrada vai para o financeiro, que decide; o sistema não reembolsa nem recusa sozinho.
- **Nota em nome de quem é regra por categoria.** Hospedagem com a empresa como tomadora do serviço, pelo CNPJ; alimentação com CPF do próprio funcionário ou consumidor não identificado; CPF de outra pessoa vira pendência. Quem define a regra é o contador, porque ela tem efeito fiscal que este artigo não discute. O campo de CNPJ precisa aceitar o formato que a Receita adotar, como em [CNPJ alfanumérico](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/).
- **Data da nota dentro da viagem.** Uma nota de antes da partida ou depois da volta não é recusada automaticamente (o táxi para o aeroporto pode ser da véspera), mas vai para o gestor com o aviso.
- **Recibo sem chave tem regra própria.** Estacionamento, flanelinha, ônibus intermunicipal, gorjeta: a política diz até que valor um recibo simples ou uma declaração é aceito, e com que justificativa.
- **O comprovante é anexo da despesa.** Envio, formatos, substituição e consulta seguem o que está em [anexos no sistema](https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/); a regra específica daqui é que substituir o comprovante de uma despesa já aprovada reabre a aprovação.

A conferência da NF-e de compra da empresa, com pedido, recebimento e manifestação do destinatário, é outro processo, em [conferência de NF-e de entrada](https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/).

## A mesma nota enviada duas vezes

É o erro que a regra de duplicidade existe para impedir: a mesma despesa paga duas vezes. Acontece por descuido (a foto e o PDF), por divisão de conta (os dois colegas mandam o mesmo cupom do jantar) e, mais raramente, de propósito.

Recomendação da Torno:

- **A chave de acesso é única em todo o sistema**, não só na prestação de contas do funcionário. O segundo envio da mesma chave é bloqueado, com a mensagem de onde ela já está: "chave já enviada por Renata M. em 14/12/2026, prestação 0142, item 3". É a mesma ideia de [evento duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/), aplicada a uma regra de negócio.
- **Recibo sem chave usa impressão digital, e ela avisa, não bloqueia.** Emitente, data e valor iguais aos de outra despesa geram um alerta para o aprovador, que decide. Dois estacionamentos de R$ 30,00 no mesmo dia podem ser legítimos.
- **Conta dividida tem dono.** Quem pagou envia a nota inteira e indica os participantes; o limite de alimentação é aplicado por participante, e os colegas não enviam a mesma nota. Se a empresa preferir que cada um envie sua parte, o sistema precisa permitir dividir uma chave em partes que somam o total, e nunca mais que o total.
- **Exclusão não apaga o histórico da chave.** Se uma despesa foi recusada ou excluída, a chave volta a ficar disponível, mas o histórico mostra o envio anterior e quem o excluiu.
- **Cartão corporativo e reembolso não se cruzam.** Se a empresa tem cartão corporativo, a mesma chave não pode aparecer como despesa do cartão e como reembolso.

## Quilometragem com veículo próprio

Quando o funcionário usa o próprio carro a serviço, a empresa costuma pagar por km rodado. Este artigo trata do carro do funcionário; a frota da empresa, com abastecimento, manutenção e multas, está em [gestão de frota](https://tornostudio.com/blog/gestao-frota-abastecimento-multas-sistema-aceite/).

O que a política precisa dizer:

- **O valor por km**, com vigência. Quanto pagar e como reajustar é decisão da empresa com o contador; este artigo não sugere valor. O que o sistema faz é aplicar o valor vigente na data do deslocamento.
- **O que o valor por km cobre.** Por exemplo, combustível e desgaste. Se cobre combustível, nota de combustível na mesma viagem não é reembolsada de novo. Se pedágio e estacionamento ficam à parte, a política diz.
- **De onde vem a distância.** Rota de referência (origem e destino com endereço, distância calculada pela ferramenta que a empresa escolher), odômetro de saída e de volta com foto, ou os dois. E a tolerância entre o declarado e a referência.
- **O que não conta.** O trajeto habitual de casa ao trabalho, por exemplo, se a empresa decidir assim.

Em termos de sistema, recomendação da Torno:

- **O trecho é um registro com origem, destino, data, finalidade e distância de referência**, não só um número de km. A distância de referência é calculada e guardada no momento do envio, com a ferramenta e a data, porque a rota calculada hoje pode ser diferente da de amanhã.
- **O odômetro é evidência, não substituto da rota.** Foto da saída e da volta, com data; a diferença é comparada com a soma dos trechos.
- **Acima da tolerância, vai para o gestor**, com os dois números lado a lado. Abaixo, segue.
- **O sistema cruza com as outras categorias**: nota de combustível na mesma viagem com quilometragem, se a política diz que o km cobre combustível, é recusada com o motivo.
- **A natureza da verba é do contador.** Se o pagamento por km é tratado como reembolso, ajuda de custo ou outra coisa, e com que efeito tributário, é decisão do contador e do jurídico. O sistema guarda o tipo configurado e a base do cálculo.

## Adiantamento e prestação de contas

Adiantamento é dinheiro entregue antes da despesa; prestação de contas é a lista de despesas com comprovantes que mostra o que foi feito com ele. A diferença entre os dois é o **saldo**: se as despesas aprovadas são menores que o adiantamento, o funcionário devolve; se são maiores, recebe.

O que costuma dar errado é o adiantamento sem fim: entregue, nunca prestado, esquecido numa aba.

Recomendação da Torno:

- **O adiantamento é um registro com saldo**, ligado à pessoa, à viagem ou ao motivo, ao centro de custo e ao pagamento que o originou. O saldo só muda por prestação de contas aprovada, devolução recebida ou pagamento do saldo a favor do funcionário.
- **Prazo de prestação com alerta.** A política diz quantos dias depois do fim da viagem a prestação precisa ser enviada; o sistema avisa o funcionário antes do prazo e o gestor depois dele.
- **Um adiantamento em aberto por vez**, ou um limite de valor em aberto por pessoa, se a empresa decidir. Um novo pedido com outro vencido em aberto é bloqueado ou vai para aprovação extra.
- **O saldo é calculado, não digitado.** Adiantamento menos despesas aprovadas (já com as glosas). Se o saldo é a favor do funcionário, entra no lote de pagamento; se é a favor da empresa, o sistema gera a instrução de devolução com identificador próprio, para a conciliação reconhecer o depósito.
- **Desconto em folha nunca é automático.** O art. 462 da CLT, no texto lido para este artigo, veda descontos no salário "salvo quando este resultar de adiantamentos, de dispositivos de lei ou de contrato coletivo". Se o saldo de um adiantamento de viagem se enquadra, com que autorização do funcionário, em que limite e o que muda na rescisão são decisões do jurídico e do RH. O sistema registra a decisão, o documento que a sustenta e o valor enviado à folha; não decide.

![Ilustração de duas balanças, com o selo exemplo fictício, da Exemplo Climatização Ltda. Na primeira, Renata M., viagem de 08 a 11/12/2026: no prato esquerdo, adiantamento de R$ 1.500,00 pago na segunda 07/12; no direito, despesas aprovadas de hospedagem 795,00, alimentação 367,30, estacionamento 30,00 e quilometragem 558,00, total 1.750,30, e a balança pende para as despesas. Glosa em 09/12: 135,50 menos o limite de 120,00, igual a 15,50. Saldo a receber: 1.750,30 menos 1.500,00, igual a R$ 250,30, pago no lote de terça 22/12/2026 e conciliado no extrato do mesmo dia. Na segunda, Diego A., viagem de 15 a 17/12/2026: adiantamento de R$ 800,00 pago na segunda 14/12, contra hospedagem 396,00 e alimentação 116,40, total 512,40, e a balança pende para o adiantamento. Saldo a devolver: 800,00 menos 512,40, igual a R$ 287,60; prazo de prestação no domingo 27/12/2026, alerta ao gestor em 28/12, prestação enviada em 04/01/2027 e Pix de devolução em 05/01, conciliado pelo identificador. Rodapé: desconto em folha nunca é automático; é decisão do RH com o jurídico, registrada no sistema. Exemplo fictício.](./torno-reembolso-balanca-adiantamento.svg)

*Exemplo fictício: empresa, funcionários, viagens, valores, prazos e datas inventados; não é orientação trabalhista nem contábil sobre nenhum caso real. Cada balança mostra o saldo que o sistema calcula e o caminho que ele toma: pagamento no lote ou devolução conciliada. Ilustração original Torno, 2026.*

## Diárias, ajuda de custo e reembolso: três coisas diferentes

Muitas empresas misturam três formas de cobrir gastos de quem trabalha fora:

- **Reembolso:** a empresa devolve o que o funcionário gastou, contra comprovante.
- **Diária para viagem:** um valor fixo por dia de viagem, em geral sem comprovante de cada gasto.
- **Ajuda de custo:** um valor para cobrir um custo do trabalho, como uma mudança de cidade ou o uso de um equipamento próprio.

A CLT trata das duas últimas no art. 457. Desde a Lei nº 13.467/2017, o § 2º diz: "As importâncias, ainda que habituais, pagas a título de ajuda de custo, auxílio-alimentação, vedado seu pagamento em dinheiro, diárias para viagem, prêmios e abonos não integram a remuneração do empregado, não se incorporam ao contrato de trabalho e não constituem base de incidência de qualquer encargo trabalhista e previdenciário."

**A regra que mudou.** Antes, pela redação da [Lei nº 1.999/1953](https://www2.camara.leg.br/legin/fed/lei/1950-1959/lei-1999-1-outubro-1953-324836-publicacaooriginal-1-pl.html), o § 2º dizia que não se incluíam nos salários "as ajudas de custo, assim como as diárias para viagem que não excedam de 50% do salário percebido pelo empregado". Planilhas e sistemas antigos às vezes ainda comparam o total de diárias com metade do salário e marcam o excedente como salário. Se essa regra ainda existe no seu sistema, a decisão de mantê-la, retirá-la ou substituí-la é do jurídico e do contador, registrada.

O que o texto da lei não resolve, e este artigo não resolve: se um pagamento concreto é de fato diária ou ajuda de custo, ou salário com outro nome; se incide imposto de renda; como tratar diretores e quem não é empregado. A posição da Receita Federal sobre ressarcimento de despesas, inclusive de uso de veículo próprio, não foi pesquisada para este artigo; é assunto do contador.

O que o sistema precisa permitir, recomendação da Torno:

- **Tipos separados, configuráveis pelo RH e pelo contador**: reembolso por comprovante, diária fixa por dia de viagem, ajuda de custo por evento, quilometragem. Cada tipo com sua regra de cálculo, seu comprovante exigido e sua conta contábil ou rubrica, definidas por quem decide.
- **Um tipo não vira outro em silêncio.** Uma despesa de alimentação não pode ser paga como reembolso e como diária no mesmo dia, salvo regra escrita.
- **A exportação para a folha e para a contabilidade carrega o tipo**, não só o valor, para que o contador aplique o tratamento dele.
- **Regras antigas não ficam escondidas no código.** Se existir um teste de "50% do salário", ele aparece como parâmetro com fonte e responsável, ou é removido por decisão registrada.

## Aprovação e alçada

Quem aprova o quê é a regra que mais pesa no controle. Recomendação da Torno:

- **Três olhares, não necessariamente três pessoas.** Pertinência (a despesa tem a ver com o trabalho? quem diz é o gestor); conferência documental (o comprovante vale? está em nome de quem deve? quem diz é o financeiro); alçada (o valor total cabe na autoridade de quem aprovou? acima do limite, a diretoria).
- **Alçada pelo total da prestação, não pelo item.** Senão uma prestação de R$ 3.000,00 em dez itens de R$ 300,00 passa abaixo do radar.
- **Ninguém aprova a própria despesa**, nem a de uma prestação em que é participante (o jantar da equipe de que ele também comeu). O sistema sabe quem participou e manda para o nível acima ou para o substituto; a delegação está em [substituto do aprovador ausente](https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/).
- **Glosa parcial com motivo.** O aprovador pode aprovar parte de um item (o limite) e recusar o resto, com motivo que o funcionário vê. Recusar a prestação inteira por um item é o que faz as pessoas pararem de enviar.
- **Alteração depois da aprovação reabre a aprovação.** Trocar o comprovante, o valor ou a categoria de um item aprovado volta o item para quem aprovou.
- **Estados e retornos** (devolvida para correção, reenviada, aprovada em parte) seguem o [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) da empresa.

## Pagamento e conciliação

Recomendação da Torno:

- **O reembolso cai na conta do próprio funcionário.** Banco, agência, conta ou chave Pix cadastrados pelo RH, em nome do CPF do funcionário. Mudança dos dados bancários exige confirmação por um segundo canal e fica na trilha, porque é por ali que um pagamento pode ser desviado.
- **Lote com data e identificador.** Os reembolsos aprovados entram no lote do dia de pagamento da política; cada pagamento leva um identificador que volta no extrato.
- **Conciliação com o extrato.** O débito de cada reembolso e o crédito de cada devolução de saldo são casados com o extrato pelo identificador e pelo valor; o que sobra vai para a fila de exceções, como em [conciliação bancária](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/).
- **A prestação só fecha quando o saldo zera.** Pagamento conciliado ou devolução conciliada; antes disso, o adiantamento continua aberto.
- **Contabilidade recebe o fato, não a interpretação.** Adiantamento pago, despesa aprovada por categoria e centro de custo, saldo pago ou devolvido. Contas, rateios e escrituração são do contador. Somas, arredondamento e centavos seguem [valores monetários](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).

## Guarda dos comprovantes e dados pessoais

**Guarda.** Por quanto tempo guardar cada comprovante, e se o papel pode ser descartado depois de digitalizado, é decisão do contador e do jurídico. Não consegui ler, nesta pesquisa, o texto do Código Tributário Nacional sobre os prazos que costumam ser citados para isso; por isso o artigo não afirma um prazo. Recomendação da Torno: o prazo de guarda é parâmetro por tipo de documento, com fonte e responsável; o sistema impede a exclusão antes do fim do prazo e mostra o que pode ser eliminado depois dele.

**Dados pessoais.** Um comprovante de despesa diz muito sobre uma pessoa: CPF, onde ela estava e a que horas, o que comeu, em que hotel dormiu. Um cupom de farmácia pode revelar um dado de saúde, que a LGPD trata como sensível (art. 5º, II). A lei pede que o tratamento se limite ao "mínimo necessário para a realização de suas finalidades" (art. 6º, III), admite a conservação dos dados para cumprimento de obrigação legal ou regulatória (art. 16, I) e exige medidas de segurança (art. 46). Qual a base legal de cada tratamento é decisão do encarregado e do jurídico.

Em termos de sistema, recomendação da Torno:

- **Quem vê o comprovante.** O funcionário vê os seus; o aprovador, os da prestação que aprova; o financeiro, os que confere; ninguém navega por comprovantes de toda a empresa sem perfil para isso. Os perfis estão em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **Relatório gerencial sem o detalhe.** O painel de despesas por centro de custo não precisa mostrar o cupom do jantar nem o CPF.
- **Categoria que a empresa não reembolsa não precisa ser enviada.** Se medicamento não é reembolsável, a política diz isso antes, para que ninguém anexe a receita.
- **Pedido do titular.** Um funcionário que pede acesso ou eliminação dos seus dados recebe a resposta pelo processo de [pedido do titular](https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/), respeitado o que precisa ser conservado.

## Relatórios, trilha e migração

**Relatórios.** O mínimo: adiantamentos em aberto por pessoa, com dias desde o fim da viagem; prestações aguardando cada aprovador; despesas por categoria, centro de custo e mês; glosas com motivo; quilometragem por pessoa e por mês; chaves bloqueadas por duplicidade; reembolsos pagos e não conciliados.

**Trilha.** Cada evento (envio, leitura e consulta da nota, glosa, aprovação, recusa, alteração, pagamento, devolução, mudança de dados bancários, mudança de política) fica com autor, data e hora, valor anterior e novo. O conteúdo de um registro de auditoria em geral está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

**Migração.** Recomendação da Torno: antes de ligar o sistema, carregue cada adiantamento em aberto com valor, data, pessoa e despesas já prestadas, conferido com o financeiro; e as chaves de acesso das notas já reembolsadas nos últimos meses que a empresa definir, para que a regra de duplicidade valha também contra o passado. Os cuidados estão em [migração de dados](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/).

## Quem decide cada regra

| Regra | Quem decide |
|---|---|
| Categorias reembolsáveis e o que não entra | Direção, com o financeiro |
| Limites por categoria, com vigência | Direção e financeiro |
| Comprovante exigido e em nome de quem, por categoria | Contador, com o financeiro |
| Valor de recibo simples aceito sem nota | Financeiro e contador |
| Valor por km, o que ele cobre e como reajustar | Direção, com o contador |
| Fonte da distância e tolerância | Financeiro |
| Tipos de verba (reembolso, diária, ajuda de custo) e seu tratamento | Contador e jurídico |
| Regra antiga dos 50% em sistema legado | Jurídico e contador |
| Prazo de prestação de contas e alertas | Financeiro e RH |
| Limite de adiantamentos em aberto por pessoa | Financeiro |
| Desconto em folha de saldo não prestado | Jurídico e RH |
| Alçadas por valor e quem não pode aprovar | Direção |
| Dia do lote de pagamento e conta de destino | Financeiro |
| Prazo de guarda dos comprovantes | Contador e jurídico |
| Base legal e acesso aos dados pessoais | Encarregado de dados e jurídico |
| Perfis de acesso | Direção e financeiro, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Exemplo Climatização Ltda. instala e mantém ar-condicionado, com matriz em Vila Esperança e técnicos que atendem clientes em Porto Claro, a 214 km. As cidades, o restaurante, as pessoas, as notas e a chave de acesso são inventados.

- **Renata M.**, técnica de campo, usa o próprio carro.
- **Diego A.**, técnico de campo.
- **Paulo**, gestor de campo, aprova pertinência.
- **Cláudia**, analista financeira, faz a conferência documental e paga.
- **Marta**, diretora financeira, aprova acima da alçada.

Política da empresa fictícia (escolhas do exemplo, escritas com o contador e o jurídico):

- **Alimentação em viagem:** até R$ 120,00 por dia, NFC-e com CPF da funcionária ou consumidor não identificado; excedente glosado salvo exceção aprovada.
- **Hospedagem:** até R$ 280,00 por noite, nota fiscal de serviço com o CNPJ da empresa como tomadora.
- **Estacionamento e pedágio:** recibo simples aceito até R$ 50,00 por item, com foto e justificativa.
- **Quilometragem:** R$ 1,20 por km, que cobre combustível e desgaste; distância pela rota de referência; tolerância de 10% acima dela; odômetro com foto na saída e na volta.
- **Prestação de contas:** até 10 dias corridos depois do fim da viagem; alerta ao funcionário 4 dias antes do prazo e ao gestor no dia seguinte ao prazo.
- **Alçada:** até R$ 1.000,00 por prestação, o gestor; acima, o gestor e a diretora financeira; conferência documental do financeiro em todas.
- **Pagamento:** lote às terças-feiras, na conta em nome do CPF do funcionário.

### Renata: saldo a receber

Na segunda 07/12/2026, Renata recebe adiantamento de R$ 1.500,00 para a viagem a Porto Claro, de terça 08/12 a sexta 11/12/2026. O prazo da prestação é segunda 21/12/2026 (11/12 mais 10 dias). Ela envia na segunda 14/12:

- **Hospedagem:** 3 noites a R$ 265,00, nota fiscal de serviço do hotel com o CNPJ da empresa: R$ 795,00.
- **Alimentação:** 08/12, R$ 48,90 + R$ 52,30 = R$ 101,20; 09/12, R$ 61,00 + R$ 74,50 = R$ 135,50; 10/12, R$ 39,90 + R$ 71,20 = R$ 111,10; 11/12, R$ 35,00. Total apresentado R$ 382,80.
- **Estacionamento:** 10/12, recibo simples de R$ 30,00, dentro do limite de recibo.
- **Quilometragem:** odômetro de 48.210 na saída a 48.675 na volta, 465 km; rota de referência 214 + 214 + 37 km de deslocamentos locais = 465 km; 465 × R$ 1,20 = R$ 558,00.

Às 09h20, por engano, Renata envia de novo o cupom do jantar de 08/12 (R$ 52,30), que já tinha enviado às 09h12 como item 3. O sistema reconhece a chave e bloqueia.

![Ilustração de um cupom de NFC-e fictício, com o selo exemplo fictício, do Restaurante Maré Alta Ltda., Porto Claro: prato executivo 44,90 e água 7,40, total R$ 52,30, cartão de crédito; consumidor com CPF mascarado; NFC-e nº 4812, série 1, emissão 08/12/2026 20:41:07; chave de acesso fictícia de 44 dígitos em 11 blocos; QR Code ilustrativo. Seis marcas numeradas, explicadas abaixo do cupom: 1, chave de acesso lida do QR Code, aceita como item 3 no primeiro envio em 14/12 às 09:12 e bloqueada no segundo envio às 09:20 por ser a mesma chave; 2, emitente com CNPJ e nome vindos da nota; 3, data e hora dentro da viagem de 08 a 11/12; 4, consumidor com CPF da funcionária ou não identificado aceito para alimentação, hotel exige CNPJ da empresa; 5, valor da nota e soma da alimentação do dia, 48,90 + 52,30 = 101,20, abaixo do limite de 120,00; 6, situação autorizada na consulta pela chave, nota cancelada vai para o financeiro. Rodapé: o sistema confere e mostra; a exceção é decidida por quem tem a alçada, com motivo registrado. Exemplo fictício.](./torno-reembolso-cupom-anotado.svg)

*Exemplo fictício: restaurante, CNPJ, CPF, nota, chave de acesso, horários e valores inventados. O cupom mostra o que o sistema confere em cada campo, não um leiaute oficial. Ilustração original Torno, 2026.*

A aprovação:

- **Terça 15/12, Paulo** aprova a pertinência. Em 09/12 a alimentação passou do limite: R$ 135,50 − R$ 120,00 = R$ 15,50. Paulo mantém a glosa, com o motivo "jantar acima do limite, sem justificativa". Alimentação aprovada: R$ 101,20 + R$ 120,00 + R$ 111,10 + R$ 35,00 = R$ 367,30.
- **Quarta 16/12, Cláudia** confere os documentos: nota de serviço do hotel conferida pela regra do contador e com o CNPJ da empresa; cupons consultados pela chave e autorizados; recibo do estacionamento dentro do limite.
- **Quinta 17/12, Marta** aprova, porque o total passa da alçada do gestor: R$ 795,00 + R$ 367,30 + R$ 30,00 + R$ 558,00 = R$ 1.750,30.

Saldo: R$ 1.750,30 − R$ 1.500,00 = R$ 250,30 a favor de Renata, pago no lote da terça 22/12/2026 e conciliado no extrato do mesmo dia. O adiantamento fecha.

![Ilustração de um mapa fictício, com o selo exemplo fictício, da viagem de Renata M. de 08 a 11/12/2026. A matriz em Vila Esperança e a cidade de Porto Claro, onde ficam o hotel e dois clientes, ligadas por uma rodovia tracejada de 214 km por trecho, referência de rota da política; em Porto Claro, um circuito entre o hotel e os clientes, com 37 km de deslocamentos locais. Abaixo, o odômetro do carro de Renata: 48210 na saída, terça 08/12, 07h10, e 48675 na volta, sexta 11/12, 19h30. Contas: 48.675 menos 48.210, igual a 465 km; rota 214 + 214 + 37 = 465 km, diferença 0 km; tolerância da política até 10% acima da rota; 465 km vezes R$ 1,20, igual a R$ 558,00. Num quadro vermelho, simulação: nota de combustível de 10/12, R$ 180,00, recusada na mesma prestação porque o valor por km já paga combustível e desgaste. Rodapé: R$ 1,20 por km é valor da política fictícia, não referência de mercado nem regra trabalhista ou fiscal. Exemplo fictício.](./torno-reembolso-mapa-quilometragem.svg)

*Exemplo fictício: cidades, distâncias, odômetro, horários e valor por km inventados; não é referência de valor nem orientação trabalhista ou fiscal sobre quilometragem. O mapa mostra as duas bases que o sistema compara antes de pagar. Ilustração original Torno, 2026.*

### Diego: saldo a devolver

Na segunda 14/12/2026, Diego recebe R$ 800,00 de adiantamento para a viagem de terça 15/12 a quinta 17/12/2026. O prazo da prestação é domingo 27/12/2026. O sistema avisa Diego na quarta 23/12 e, sem prestação, avisa Paulo na segunda 28/12. Diego envia na segunda 04/01/2027: hospedagem 2 noites a R$ 198,00 = R$ 396,00 e alimentação R$ 116,40; total R$ 512,40, aprovado por Paulo e conferido por Cláudia (abaixo da alçada).

Saldo: R$ 800,00 − R$ 512,40 = R$ 287,60 a favor da empresa. O sistema gera a instrução de devolução com identificador; o Pix de Diego chega na terça 05/01/2027, é conciliado pelo identificador e o adiantamento fecha. Nenhum desconto em folha foi proposto, porque a prestação chegou e o saldo foi devolvido; se não tivesse chegado, o caso iria para o RH e o jurídico, como pendência.

### Os cenários

Monte os cenários num ambiente de teste com relógio controlado, a política carregada com vigência e uma consulta de notas simulada (notas autorizadas, canceladas e não encontradas), e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/). Os cenários marcados como simulação não aconteceram no exemplo; servem para testar a regra.

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Política com limite de alimentação de R$ 120,00 desde 01/12/2026 | Regra com vigência, autor e documento de aprovação | Tela da política e trilha |
| Simulação: limite muda para R$ 130,00 a partir de 01/01/2027 | Despesas de 09/12/2026 continuam avaliadas com R$ 120,00 | Tela do item |
| Adiantamento de Renata de R$ 1.500,00 em 07/12/2026 | Registro com saldo, viagem, centro de custo e pagamento | Tela do adiantamento |
| Cupom do jantar de 08/12 lido pelo QR Code | Chave de 44 dígitos, emitente, data, hora e valor vindos da consulta; situação autorizada registrada | Item e registro da consulta |
| Simulação: chave digitada com um dígito trocado | Consulta não encontra a nota; item fica pendente, sem valor aceito | Mensagem e registro da consulta |
| Mesmo cupom enviado de novo às 09h20 | Bloqueado com a referência ao item 3 enviado às 09h12 | Mensagem e trilha |
| Simulação: Diego envia a chave do jantar de Renata | Bloqueado; mostra que a chave está na prestação de outra pessoa, sem expor o comprovante | Mensagem |
| Simulação: jantar de 3 pessoas enviado por quem pagou | Limite aplicado por participante; colegas não conseguem enviar a mesma chave | Tela do item |
| Simulação: nota cancelada na consulta | Item vai para o financeiro com a situação; sem reembolso nem recusa automática | Pendência |
| Simulação: nota de serviço do hotel com o CPF de Renata como tomadora | Pendência para o financeiro: categoria exige o CNPJ da empresa | Pendência e trilha |
| Simulação: cupom com CPF de outra pessoa | Pendência para o financeiro | Pendência |
| Simulação: táxi de 07/12, véspera da viagem | Aceito para envio, com aviso de data fora da viagem ao gestor | Tela de aprovação |
| Recibo simples de estacionamento de R$ 30,00 | Aceito pela regra de recibo até R$ 50,00, com foto e justificativa | Item |
| Simulação: recibo simples de R$ 70,00 | Pendência: acima do limite de recibo | Mensagem |
| Simulação: dois recibos de R$ 30,00 do mesmo estacionamento no mesmo dia | Alerta de possível duplicidade ao aprovador; não bloqueia | Alerta |
| Alimentação de 09/12 de R$ 135,50 | Glosa proposta de R$ 15,50; Paulo mantém com motivo visível a Renata | Item e trilha |
| Simulação: Paulo aprova a exceção dos R$ 15,50 | Registrada com motivo; total muda para R$ 1.765,80 e o saldo para R$ 265,80 | Item e trilha |
| Quilometragem de 465 km | Rota de referência, ferramenta e data guardadas; odômetro com fotos; R$ 558,00 | Item e anexos |
| Simulação: 530 km declarados para a mesma rota | Acima da tolerância de 10% (465 × 1,10 = 511,5 km); vai ao gestor com os dois números | Tela de aprovação |
| Simulação: nota de combustível de R$ 180,00 em 10/12 | Recusada: o valor por km já paga combustível | Mensagem |
| Simulação: valor por km muda em 01/01/2027 | Trechos de dezembro pagos com R$ 1,20 | Item |
| Total de Renata de R$ 1.750,30 | Exige gestor, financeiro e diretora financeira | Tela de aprovação |
| Simulação: Paulo é participante do jantar | A aprovação do item vai para o nível acima ou o substituto | Fila de aprovação |
| Simulação: Renata troca o comprovante do hotel depois da aprovação | Item volta para aprovação | Trilha |
| Saldo de Renata | R$ 250,30 a receber, calculado, não digitado | Tela do adiantamento |
| Lote de 22/12/2026 | Pagamento na conta do CPF de Renata, com identificador; conciliado no extrato | Lote e conciliação |
| Simulação: mudança da chave Pix de Renata na véspera do lote | Exige confirmação por segundo canal; pagamento retido até confirmar | Trilha e lote |
| Adiantamento de Diego sem prestação | Aviso a Diego em 23/12; aviso a Paulo em 28/12 | Alertas |
| Simulação: Diego pede novo adiantamento em 21/12 com o primeiro aberto | Bloqueado ou enviado para aprovação extra, conforme a política | Mensagem |
| Prestação de Diego em 04/01/2027 | Saldo de R$ 287,60 a devolver; instrução de devolução com identificador | Tela do adiantamento |
| Pix de devolução em 05/01/2027 | Conciliado pelo identificador; adiantamento fechado | Conciliação |
| Simulação: saldo não devolvido e proposta de desconto em folha | Pendência para RH e jurídico; nada enviado à folha sem decisão registrada e documento anexado | Pendência e trilha |
| Simulação: diária fixa configurada para outra categoria de viagem | Diária e reembolso de alimentação no mesmo dia bloqueados, salvo regra escrita | Mensagem |
| Simulação: regra antiga de 50% do salário encontrada no sistema legado | Listada como parâmetro com fonte e responsável, ou removida por decisão registrada | Relatório de parâmetros |
| Exportação para a contabilidade | Tipo de verba, categoria, centro de custo e valores de cada prestação | Arquivo de teste |
| Simulação: gestor tenta abrir os comprovantes de outra equipe | Bloqueado pelo perfil | Mensagem e trilha |
| Simulação: comprovante dentro do prazo de guarda | Exclusão bloqueada; elegível para eliminação só depois do prazo | Tela e trilha |
| Migração de adiantamentos em aberto | Valores e despesas prestadas batem com a planilha, pessoa por pessoa | Relatório de migração |
| Migração das chaves já reembolsadas | Uma chave antiga reenviada é bloqueada | Mensagem |
| Histórico de Renata | Envios, bloqueio de duplicidade, consultas, glosa, aprovações, pagamento e conciliação, com autor e horário | Trilha |

*Fim do exemplo fictício. Empresa, cidades, estabelecimentos, pessoas, notas, chave de acesso, valores, política, prazos e decisões são modelo editorial, sem cliente real nem sistema entregue; as escolhas do exemplo são da empresa fictícia, não recomendação de valor, regra trabalhista, tributária ou contábil nem comportamento padrão de ferramenta.*

Antes de aceitar, pegue as prestações de contas dos últimos três meses e tente responder com o sistema: quais adiantamentos estão em aberto e há quantos dias; quantas notas foram enviadas mais de uma vez; quanto foi pago de quilometragem e com base em quê; quais despesas passaram do limite e quem aprovou a exceção; e se cada reembolso pago aparece no extrato. As perguntas que ficarem sem resposta são os requisitos do sistema.

## Perguntas frequentes

### O que um sistema de reembolso de despesas precisa conferir na nota fiscal?

A chave de acesso, que identifica a NF-e ou a NFC-e e tem 44 dígitos; o emitente; a data e a hora; o valor; o destinatário ou consumidor (empresa, funcionário ou não identificado); e a situação da nota na consulta pela chave. O DANFE ou o cupom impresso não é a nota; a chave é o que permite consultá-la e impedir que a mesma nota seja reembolsada duas vezes. A nota de serviço, como a do hotel, não é NF-e nem NFC-e; o que conferir nela é regra do contador.

### Como funciona a prestação de contas de adiantamento?

A empresa adianta um valor antes da viagem; depois dela, o funcionário envia as despesas com comprovantes. O sistema subtrai as despesas aprovadas do adiantamento: se sobra, o funcionário devolve; se falta, recebe a diferença. O adiantamento só fecha quando esse saldo é pago ou devolvido e conciliado no extrato.

### Diária de viagem e ajuda de custo entram no salário?

Desde a Lei nº 13.467/2017, o art. 457, § 2º, da CLT diz que ajuda de custo e diárias para viagem, ainda que habituais, não integram a remuneração nem constituem base de encargo trabalhista e previdenciário. A regra antiga, que limitava as diárias a 50% do salário, foi substituída. Se um pagamento concreto é de fato diária ou ajuda de custo, e como tratá-lo no imposto de renda, é decisão do contador e do jurídico.

### Como calcular o reembolso de quilometragem?

Distância a serviço vezes o valor por km da política da empresa, na data do deslocamento. A distância vem de uma rota de referência, do odômetro, ou dos dois, com uma tolerância escrita. O valor por km e o que ele cobre (combustível, desgaste) são decisões da empresa com o contador; o sistema aplica e guarda a base do cálculo.

Para transformar o reembolso de despesas da sua empresa em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a política atual (ou o que existe dela), uma prestação de contas de exemplo com os comprovantes, a planilha de adiantamentos em aberto, a regra de quilometragem e a lista de quem aprova o quê.

*Fontes consultadas em 26 de novembro de 2026: Lei nº 13.467/2017, no Planalto (art. 457, §§ 1º e 2º, da CLT); Lei nº 1.999/1953, publicação original na Câmara dos Deputados (redação anterior do art. 457); texto da CLT em arquivo do Senado Federal (art. 462, caput e § 1º); Sefaz do Rio Grande do Sul, perguntas frequentes da NF-e; Sefaz do Paraná, serviços "Consultar NF-e" e "Consultar NFC-e"; Sefaz de São Paulo, Manual de Padrões do DANFE NFC-e e QR Code, versão 4.1 (2016); Sefaz de Pernambuco, Guia de Procedimentos da NF-e (2015); Lei Complementar nº 116/2003, no Planalto (art. 1º e itens 9.01 e 11.01 da lista de serviços); Lei nº 13.709/2018 (LGPD), texto compilado no Planalto (arts. 5º, 6º, 7º, 16 e 46). Não puderam ser lidos: o Portal Nacional da NF-e e o Manual de Orientação do Contribuinte, e o texto compilado do Código Tributário Nacional na parte sobre decadência e guarda de documentos. Não foram pesquisados: o padrão da nota fiscal de serviço e a posição da Receita Federal sobre ressarcimento de despesas. Este artigo não recomenda sistema de despesas, cartão ou agência nem fornecedor e não é orientação jurídica, trabalhista, tributária nem contábil; empresas, pessoas, notas, números e ilustrações são fictícios.*
