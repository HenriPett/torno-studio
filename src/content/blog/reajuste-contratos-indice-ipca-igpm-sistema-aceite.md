---
content_id: torno-artigo-pt-20261120-reajuste-contratos
intent_id: buyer-recurring-contract-index-adjustment-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Reajuste anual de contratos por IPCA ou IGP-M no sistema: o que definir e testar antes de automatizar'
h1: 'Reajuste anual de contratos por IPCA ou IGP-M no sistema: o que definir e testar antes de automatizar'
seo_title: 'Reajuste de contrato por IPCA e IGP-M: regras e aceite | Torno'
seo_description: 'Reajuste de contrato pelo IPCA ou IGP-M no sistema: data-base, qual mês entra, conta do acumulado, índice negativo, aviso ao cliente e testes de aceite.'
summary: 'Roteiro para a empresa de serviços ou de receita recorrente que vai automatizar no sistema o reajuste anual dos contratos por índice (sistema de contratos e faturamento, ERP ou sistema sob medida): o índice escrito no contrato e a fonte oficial do número; a periodicidade mínima anual da Lei 10.192/2001; data-base e aniversário de cada contrato; qual janela de 12 meses entra e a defasagem de divulgação; a conta do acumulado e o arredondamento; contratos com aniversários diferentes e troca de plano no meio do ciclo; índice negativo; índice que deixa de ser publicado; aviso ao cliente; teto, renegociação e aditivo como decisão humana; fatura já emitida e reprocessamento quando o número estava errado; histórico de cada reajuste; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que uma empresa com contratos recorrentes precisa definir e testar antes de automatizar no sistema o reajuste anual por índice, para que cada contrato seja reajustado na data certa, pelo índice e pela janela que o contrato diz, com a conta e o arredondamento conferidos, aviso ao cliente e registro de cada reajuste?
proposed_path: /blog/reajuste-contratos-indice-ipca-igpm-sistema-aceite/
canonical_url: https://tornostudio.com/blog/reajuste-contratos-indice-ipca-igpm-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores financeiros, gestores de contratos, de faturamento e de contas a receber de pequenas e médias empresas de serviços e de receita recorrente (manutenção, locação de equipamentos, SaaS B2B, outsourcing, assinaturas) que vão contratar, especificar, ajustar ou aceitar o reajuste automático no sistema de contratos e faturamento, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de reajustes conferida à mão por uma rotina automática no sistema.
scope: Índice escrito no contrato e fonte oficial do número (IBGE para IPCA e INPC, FGV IBRE para IGP-M); periodicidade mínima anual e nulidade de periodicidade menor na Lei 10.192/2001, citadas do texto da lei; locação de imóvel só como fronteira (Lei 8.245/1991, arts. 17 a 19); data-base e aniversário de cada contrato; janela de 12 meses, defasagem de divulgação e o que fazer quando o número ainda não saiu; acumulado por multiplicação dos fatores, casas decimais e arredondamento; contratos com aniversários diferentes; troca de plano no meio do ciclo, pro rata e data-base; índice negativo como regra do contrato; índice que deixa de ser publicado; aviso prévio e conteúdo do aviso; teto, renegociação e aditivo como decisão humana; fatura já emitida, correção e reprocessamento; histórico de cada reajuste; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Parecer jurídico, contábil ou fiscal; escolha ou recomendação de índice; redação de cláusula de reajuste ou de aditivo; revisão judicial de contrato, onerosidade excessiva e reequilíbrio econômico-financeiro; contratos com a administração pública (Lei 10.192/2001, art. 3º, e lei de licitações); locação residencial e regras próprias da Lei do Inquilinato além da fronteira citada; planos de saúde, mensalidade escolar e outros reajustes regulados; correção monetária de dívida em atraso (coberta no artigo de régua de cobrança); recomendação ou comparação de banco, fonte de dados, API, plataforma de cobrança ou fornecedor de software; tabela de preços de produtos (coberta em outro artigo); tutorial de API do IBGE, da FGV ou do Banco Central.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-20T21:15:00Z'
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
  - path: https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/
    reason: Trata versões de tabela de preços, vigência e preço gravado no pedido, com reajuste como nova versão da tabela; aqui o reajuste de cada contrato recorrente por índice, no aniversário de cada um.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata precisão, etapa e regra de arredondamento em geral; aqui o arredondamento do percentual acumulado e da mensalidade reajustada.
  - path: https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/
    reason: Trata multa, juros e correção de título em atraso; aqui o reajuste anual da mensalidade de contrato em dia, que é outra conta.
  - path: https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/
    reason: Trata autorização e cobrança recorrente via Pix Automático, inclusive valor máximo autorizado; aqui o valor reajustado que precisa caber nessa autorização.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas civis, instantes e cortes de período; aqui o aniversário do contrato, o dia da rotina e o dia útil.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata validação de dados importados por planilha; aqui a carga do índice e dos contratos sem erro de digitação.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Trata alertas de rotina que não rodou; aqui a rotina de reajuste que não encontrou o índice.
  - path: https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/
    reason: Trata estados de envio e falha de e-mail; aqui a prova de que o aviso de reajuste saiu e chegou.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata documentos emitidos e dados congelados; aqui o aviso de reajuste como documento do momento do envio.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata alçadas e aprovações em geral; aqui a aprovação de reajuste acima do teto, de desconto e de aditivo.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso; aqui quem pode lançar índice, suspender reajuste e reprocessar.
  - path: https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/
    reason: Trata ações em lote e falhas parciais; aqui a rotina que reajusta muitos contratos de uma vez e falha em alguns.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que o histórico de cada reajuste precisa guardar.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Trata validação de dados migrados; aqui a data-base e o último reajuste de cada contrato trazidos da planilha.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste, com contratos fictícios e destinos de e-mail controlados.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de reajustes.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as cláusulas de reajuste em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A Lei 10.192/2001, no texto atualizado publicado pela Câmara dos Deputados, diz: no art. 1º, que as obrigações pecuniárias exequíveis no território nacional são estipuladas em Real, pelo seu valor nominal, e veda, sob pena de nulidade, a estipulação de reajuste ou correção por índices gerais, setoriais ou de custos, ressalvado o art. 2º; no art. 2º, caput, que é admitida a estipulação de correção monetária ou de reajuste por índices de preços gerais, setoriais ou que reflitam a variação dos custos de produção ou dos insumos, nos contratos de prazo de duração igual ou superior a um ano; no §1º, que "É nula de pleno direito qualquer estipulação de reajuste ou correção monetária de periodicidade inferior a um ano"; no §2º, que, em caso de revisão contratual, o termo inicial do período de correção ou reajuste, ou de nova revisão, é a data em que a revisão anterior ocorreu; no §3º, que são nulos os expedientes que, na apuração do índice, produzam efeito financeiro equivalente ao de reajuste de periodicidade inferior à anual; e, no art. 3º, que os contratos com a administração pública seguem regras próprias, com a anualidade contada da data limite para apresentação da proposta ou do orçamento.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2001/lei-10192-14-fevereiro-2001-365669-normaatualizada-pl.html
    entity: 'Câmara dos Deputados, Legislação Informatizada, Lei nº 10.192, de 14 de fevereiro de 2001, norma atualizada'
    source_date: '2022-01-07'
    checked_at: '2026-11-20T20:58:00Z'
    limit: 'O texto no portal do Planalto (https://planalto.gov.br/ccivil_03/leis/LEIS_2001/L10192.htm) não abriu na consulta de 20/11/2026 (acesso negado; nova tentativa na revisão independente de 20/11/2026 também com acesso negado); usada a norma atualizada da Câmara, cuja página registra alteração em 07/01/2022 (Lei 14.286/2021, só no art. 1º, I). A ferramenta de leitura devolveu trechos curtos literais e paráfrase do restante. A data de 2022 é a da última alteração da página, não da lei. O que conta como revisão contratual e como a anualidade se aplica a cada contrato é pergunta para o advogado. Não é parecer jurídico.'
  - classification: FATO
    claim: 'A Lei 8.245/1991 (Lei do Inquilinato), no texto atualizado publicado pela Câmara dos Deputados, diz que é livre a convenção do aluguel, vedada a estipulação em moeda estrangeira e a vinculação à variação cambial ou ao salário mínimo (art. 17); que nas locações residenciais serão observados os critérios de reajuste previstos na legislação específica (art. 17, parágrafo único); que é lícito às partes fixar, de comum acordo, novo valor para o aluguel, bem como inserir ou modificar cláusula de reajuste (art. 18); e que, não havendo acordo, locador ou locatário, após três anos de vigência do contrato ou do acordo anterior, podem pedir revisão judicial do aluguel para ajustá-lo ao preço de mercado (art. 19).'
    reference: https://www2.camara.leg.br/legin/fed/lei/1991/lei-8245-18-outubro-1991-322506-normaatualizada-pl.html
    entity: 'Câmara dos Deputados, Legislação Informatizada, Lei nº 8.245, de 18 de outubro de 1991, norma atualizada'
    source_date: null
    checked_at: '2026-11-20T21:03:00Z'
    limit: 'Citada só como fronteira: locação de imóvel tem lei própria e fica fora do escopo. O texto do Planalto não foi aberto (acesso negado ao domínio na consulta de 20/11/2026). Não é parecer jurídico.'
  - classification: FATO
    claim: 'Segundo o relatório metodológico do IBGE sobre o Sistema Nacional de Índices de Preços ao Consumidor (6ª edição, 2012), o INPC tem como população-objetivo as famílias com rendimento de 1 a 5 salários mínimos cujo chefe é assalariado, e o IPCA, as famílias residentes nas áreas urbanas abrangidas pelo sistema com rendimento de 1 a 40 salários mínimos, qualquer que seja a fonte; e os preços são coletados ao longo de todo o mês de referência, dividido em quatro períodos de coleta.'
    reference: https://biblioteca.ibge.gov.br/visualizacao/livros/liv62375.pdf
    entity: 'IBGE, Sistema Nacional de Índices de Preços ao Consumidor: métodos de cálculo, 6ª edição, Série Relatórios Metodológicos, volume 14'
    source_date: '2012'
    checked_at: '2026-11-20T21:05:00Z'
    limit: 'Documento de 2012; pode haver edição ou atualização metodológica posterior que não foi aberta. As páginas do IPCA e do INPC no site do IBGE, o SIDRA e o calendário de divulgação não abriram na consulta de 20/11/2026 (erro do site). Usado só para dizer que IPCA e INPC medem populações diferentes e que o índice de um mês reflete preços coletados durante aquele mês.'
  - classification: FATO
    claim: 'Segundo a Agência Gov, em notícia de 12/11/2026 com informações do IBGE, o IPCA de outubro de 2026 foi de 0,14%, depois de 0,82% em setembro, com 4,10% no ano e 4,63% em 12 meses, e foi divulgado pelo IBGE naquela data; e que o próximo resultado do IPCA, referente a novembro, será divulgado em 11 de dezembro.'
    reference: https://agenciagov.ebc.com.br/noticias/202611/inflacao-desacelera-e-fica-em-0-14-em-outubro
    entity: 'Agência Gov (governo federal), "Inflação desacelera e fica em 0,14% em outubro", 12/11/2026'
    source_date: '2026-11-12'
    checked_at: '2026-11-20T21:06:00Z'
    limit: 'Notícia oficial do governo federal com informações do IBGE, não a publicação do próprio IBGE, cujas páginas não abriram na consulta de 20/11/2026. Usada para mostrar a defasagem entre o fim do mês de referência e a divulgação (outubro divulgado em 12/11; novembro previsto para 11/12/2026, data anunciada, não observada), e para deixar claro que as taxas do exemplo são inventadas. Que o IPCA de cada mês sai no mês seguinte é inferido desses dois casos, não do calendário oficial do IBGE, que não abriu (erro do site) na consulta de 20/11/2026.'
  - classification: FATO
    claim: 'O release do IGP-M de novembro de 2025 da FGV IBRE, divulgado em 27/11/2025, informa variação de 0,27% no mês, depois de queda de 0,36% em outubro, e acumulado de −0,11% em 12 meses; período de coleta de 21/10/2025 a 20/11/2025, comparado ao período base de 21/09/2025 a 20/10/2025; componentes IPA, IPC e INCC; e próxima divulgação, com coleta de 21/11 a 20/12/2025, em 29/12/2025.'
    reference: https://portalibre.fgv.br/system/files/divulgacao/noticias/mat-complementar/2025-11/IGP-M_FGV_press%20release_Nov25.pdf
    entity: 'FGV IBRE, release do IGP-M de novembro de 2025, 27/11/2025'
    source_date: '2025-11-27'
    checked_at: '2026-11-20T21:04:00Z'
    limit: 'Release de um mês; o período de coleta e a data de divulgação de outros meses devem ser conferidos no calendário da FGV IBRE, que não foi aberto. Usado como exemplo real de acumulado negativo e de período de coleta diferente do mês civil; não é recomendação do índice.'
  - classification: FATO
    claim: 'A página de serviço do gov.br sobre a Calculadora do Cidadão, atualizada em 15/12/2025, diz que o aplicativo é do Banco Central do Brasil, que faz, entre outros, cálculos de correção de valores, e que o resultado serve apenas como referência e não substitui os cálculos feitos por bancos e outras instituições financeiras.'
    reference: https://www.gov.br/pt-br/servicos/obter-auxilio-para-executar-calculos-financeiros
    entity: 'Governo Federal, gov.br, serviço "Obter auxílio para executar cálculos financeiros" (Calculadora do Cidadão, Banco Central do Brasil), atualizado em 15/12/2025'
    source_date: '2025-12-15'
    checked_at: '2026-11-20T21:01:00Z'
    limit: 'A página da própria calculadora no site do Banco Central não abriu na consulta de 20/11/2026; quais índices a calculadora oferece e como ela calcula não foram conferidos aqui. Citada só como ferramenta de conferência, sem substituir a regra do contrato.'
  - classification: HIPÓTESE
    claim: 'A Manutenção Exemplo Ltda., os contratos A, B e C, as mensalidades, as datas, as taxas mensais e acumuladas dos índices, a janela de 12 meses terminada dois meses antes do aniversário, o arredondamento do percentual a duas casas, a regra para índice negativo, o prazo de aviso, a rotina no dia 15, o teto de revisão, a troca de plano, o pro rata em mês de 30 dias e as decisões do exemplo são modelo editorial fictício, escolhas da empresa do exemplo e não recomendação, nem requisito legal, nem índice recomendado, nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; datas e contas refeitas em Python (datetime e Decimal) em 20/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, contrato, reajuste real ou sistema entregue; as taxas não são os índices publicados pelo IBGE ou pela FGV.
---

*Leitura estimada: 21 minutos.*

**Antes de automatizar o reajuste de contrato por IPCA, IGP-M ou outro índice, escreva e aprove, para cada contrato, nove regras: qual índice e de qual fonte oficial; qual é a data-base e quando cai o aniversário; quais 12 meses entram na conta, sabendo que o índice de um mês só sai no mês seguinte; como se calcula o acumulado e com quantas casas se arredonda; o que acontece se o índice vier negativo; o que fazer se o índice deixar de ser publicado; com que antecedência e com que texto o cliente é avisado; o que passa por uma pessoa (teto, renegociação, aditivo); e como se corrige um reajuste que saiu errado.** Depois, teste com contratos fictícios cujas contas você já fechou à mão: três aniversários em meses diferentes, um índice negativo, uma troca de plano no meio do ano e um número digitado errado. Sem isso, o sistema soma as taxas em vez de multiplicar, reajusta antes de o índice sair, aplica deflação que o contrato não prevê e corrige a fatura já emitida sem deixar rastro.

**Este artigo não é parecer jurídico e não recomenda índice, banco, fonte de dados nem fornecedor de software.** As leis aparecem pelo que o texto diz; o que elas significam no seu contrato é pergunta para o advogado. Empresa, contratos e taxas do exemplo são inventados.

## Por que o reajuste anual dá errado quando sai da planilha

Num cenário típico, o reajuste anual dos contratos vive numa planilha: uma linha por contrato, a data de início, o índice, a mensalidade. Todo mês alguém filtra os contratos que fazem aniversário, busca o acumulado de 12 meses num site, multiplica, confere e manda o aviso. A pessoa sabe que o contrato da escola tem teto, que o cliente grande negociou ficar sem reajuste este ano e que o contrato antigo ainda usa um índice que quase ninguém usa.

Automatizar o reajuste é passar para o sistema a parte repetitiva: achar os aniversários, buscar o índice, fazer a conta, gerar o aviso, aplicar na fatura. O risco é passar junto, sem perceber, decisões que a pessoa tomava de cabeça ou que nunca foram escritas: qual mês entra quando o índice ainda não saiu, o que fazer com índice negativo, se a troca de plano muda a data-base.

O reajuste automático no sistema só é confiável se cada uma dessas decisões virar regra escrita, ligada ao contrato, e se cada reajuste deixar registro de como foi calculado.

### Norma, documentação, interpretação e recomendação

O texto separa quatro camadas:

- **Norma.** A Lei 10.192/2001 trata de periodicidade do reajuste; a Lei do Inquilinato aparece só como fronteira. O texto cita o que a lei diz e o artigo de onde vem.
- **Documentação.** IBGE e FGV IBRE explicam como IPCA, INPC e IGP-M são coletados e quando são divulgados. Isso diz quando o número existe, não qual índice usar.
- **Interpretação.** Se a cláusula do seu contrato é válida, se uma troca de plano conta como revisão, se o índice negativo deve reduzir a mensalidade: isso é interpretação, e fica com o advogado.
- **Recomendação da Torno.** Onde aparece "recomendação da Torno", é sugestão de modelagem do sistema, não requisito legal nem comportamento padrão de ferramenta.

## O que este artigo não repete

- **Tabela de preços.** O reajuste da tabela de produtos, como nova versão com vigência, e o preço gravado no pedido estão em [tabela de preços por cliente](https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/). Aqui é o contrato recorrente, reajustado no aniversário de cada um.
- **Correção de dívida em atraso.** Multa, juros e correção de título vencido estão em [régua de cobrança](https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/). Reajuste anual de mensalidade em dia é outra conta.
- **Arredondamento em geral.** Precisão, etapa e regra de arredondamento estão em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/). Aqui, só o arredondamento do acumulado e da mensalidade.
- **Cobrança recorrente.** Autorização e valor máximo do Pix Automático estão em [Pix Automático no sistema](https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/). Aqui, só o lembrete: o valor reajustado precisa caber no que o pagador autorizou.

## O que a lei diz sobre a periodicidade

A Lei 10.192/2001 é a referência mais citada quando se fala em reajuste anual de contrato. Pelo texto atualizado publicado pela Câmara dos Deputados:

- **Valor nominal e índices.** As obrigações em dinheiro são estipuladas em Real, pelo valor nominal, e o reajuste por índices de preços é vedado, sob pena de nulidade, ressalvado o que o art. 2º permite ([art. 1º](https://www2.camara.leg.br/legin/fed/lei/2001/lei-10192-14-fevereiro-2001-365669-normaatualizada-pl.html)).
- **Contratos de um ano ou mais.** O art. 2º admite reajuste ou correção por índices de preços gerais, setoriais ou de custos nos contratos de prazo de duração igual ou superior a um ano.
- **Periodicidade.** "[É nula de pleno direito qualquer estipulação de reajuste ou correção monetária de periodicidade inferior a um ano](https://www2.camara.leg.br/legin/fed/lei/2001/lei-10192-14-fevereiro-2001-365669-normaatualizada-pl.html)" (art. 2º, §1º). E também são nulos os expedientes que, na apuração do índice, produzam efeito equivalente ao de um reajuste em prazo menor, com uma ressalva para a Lei 9.069/1995 (§3º).
- **Revisão.** Em caso de revisão contratual, o período do próximo reajuste começa na data da revisão anterior (§2º).
- **Administração pública.** Contratos com órgãos públicos têm regra própria (art. 3º) e ficam fora deste artigo.

O texto citado é o da norma atualizada publicada pela Câmara dos Deputados; o portal do Planalto não pôde ser consultado (acesso negado) em 20/11/2026. O que isso significa para o sistema:

- **O sistema não deixa cadastrar periodicidade menor que 12 meses** para reajuste por índice, nem rodar um segundo reajuste no mesmo contrato antes de 12 meses do anterior. Se a empresa tem um caso que acha que é exceção, ele vai para o advogado, não para um campo livre.
- **"Revisão" precisa de definição.** Se a empresa renegocia um contrato no meio do ano, isso reinicia a contagem? E uma troca de plano? A lei fala em revisão contratual; o que conta como revisão no seu contrato é pergunta para o advogado. O sistema precisa de um campo explícito de data-base, que só muda por ação registrada, e não deve mudá-la sozinho por efeito colateral de outra operação.

**Locação de imóvel é outra lei.** A Lei do Inquilinato diz que [é lícito às partes fixar, de comum acordo, novo valor para o aluguel e inserir ou modificar cláusula de reajuste](https://www2.camara.leg.br/legin/fed/lei/1991/lei-8245-18-outubro-1991-322506-normaatualizada-pl.html) (art. 18), e prevê revisão judicial depois de três anos sem acordo (art. 19). Se a sua empresa aluga imóveis, as regras dela vêm primeiro; este artigo trata de contratos de serviço e de locação de bens em geral, com o advogado decidindo onde cada um se encaixa.

## O índice do contrato e a fonte do número

O sistema não escolhe índice. **O índice é o que está escrito no contrato**, e cada contrato pode ter o seu: um cliente antigo com IGP-M, um novo com IPCA, um setorial com outro. Este artigo não recomenda nenhum. O que o sistema precisa saber de cada índice:

- **Quem publica.** IPCA e INPC são do IBGE; IGP-M é da FGV IBRE. Eles medem coisas diferentes: segundo o relatório metodológico do IBGE, [o IPCA cobre famílias com rendimento de 1 a 40 salários mínimos e o INPC, famílias de 1 a 5 salários mínimos cujo chefe é assalariado](https://biblioteca.ibge.gov.br/visualizacao/livros/liv62375.pdf); o IGP-M, segundo o [release da FGV IBRE](https://portalibre.fgv.br/system/files/divulgacao/noticias/mat-complementar/2025-11/IGP-M_FGV_press%20release_Nov25.pdf), é composto por índices de preços ao produtor, ao consumidor e da construção (IPA, IPC e INCC). Por isso eles podem andar em direções diferentes no mesmo ano.
- **De onde o sistema busca o número.** Da publicação do órgão que calcula o índice, de uma série pública que reproduza esse número ou de digitação manual com conferência. Qualquer que seja o caminho, **registre a fonte de cada número**: qual série, de onde, quando foi carregado e por quem. Se a carga é por planilha, ela passa pelas validações de [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).
- **Taxa mensal ou número-índice.** Algumas publicações trazem a variação do mês; outras, um número-índice. Com número-índice, o acumulado é o índice do último mês dividido pelo do mês anterior ao início da janela, menos um. Com taxas mensais, é a multiplicação dos fatores. Os dois caminhos devem chegar ao mesmo resultado, salvo diferenças de arredondamento da própria publicação; escolha um e escreva qual.
- **Conferência externa.** A Calculadora do Cidadão, do Banco Central, faz [correção de valores e serve como referência, sem substituir os cálculos das instituições financeiras](https://www.gov.br/pt-br/servicos/obter-auxilio-para-executar-calculos-financeiros), segundo a página do serviço no gov.br. Ela é útil para conferir uma conta do teste; a regra que vale é a do contrato.

Recomendação da Torno: o cadastro do contrato guarda o índice como uma referência a um cadastro de índices (com nome, órgão, série e regra de busca), não como texto livre. "IGPM", "IGP-M" e "igp m" digitados em contratos diferentes viram três índices.

## Data-base, aniversário e qual mês entra

Três datas precisam estar separadas no cadastro de cada contrato:

- **Data-base.** A data a partir da qual o período de 12 meses é contado. Em geral é o início do contrato ou a data do último reajuste ou revisão. Na migração da planilha, é o campo que mais chega errado; confira um por um, como em [validação de dados migrados](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/).
- **Aniversário.** A data em que o reajuste passa a valer. Em contrato com início em 15/03, o reajuste vale a partir de 15/03 do ano seguinte, ou da primeira fatura emitida depois disso? Escreva.
- **Janela do índice.** Quais 12 meses do índice entram na conta. É aqui que mora o problema da defasagem.

**A defasagem.** O índice de um mês só existe depois que o mês acaba. O IBGE coleta os preços do IPCA [ao longo de todo o mês de referência](https://biblioteca.ibge.gov.br/visualizacao/livros/liv62375.pdf) e divulga o resultado depois que o mês acaba: segundo a Agência Gov, o IPCA de outubro de 2026 [foi divulgado em 12/11/2026, e o de novembro tem divulgação prevista para 11/12/2026](https://agenciagov.ebc.com.br/noticias/202611/inflacao-desacelera-e-fica-em-0-14-em-outubro). O IGP-M tem outro ritmo: o de novembro de 2025 teve [coleta de 21/10 a 20/11/2025 e foi divulgado em 27/11/2025](https://portalibre.fgv.br/system/files/divulgacao/noticias/mat-complementar/2025-11/IGP-M_FGV_press%20release_Nov25.pdf), segundo a FGV IBRE.

Consequência: um contrato com aniversário em 01/12 não tem como usar o IPCA de novembro de 2026 na fatura de 01/12, porque a divulgação desse número está prevista só para 11/12. Por isso há contratos que falam em "acumulado dos últimos 12 meses disponíveis" ou fixam uma janela que termina um ou dois meses antes do aniversário. O que o sistema precisa:

- **Regra explícita da janela**, por contrato: "12 meses terminados no mês M−2", "últimos 12 meses divulgados até o dia 10 do mês anterior ao aniversário", ou o que o contrato disser. "Últimos 12 meses" sem referência vira, no sistema, o que estiver na base no dia em que a rotina rodar, e isso muda de um ano para outro.
- **Aviso prévio compatível com a janela.** Se o contrato exige aviso com 30 dias, a conta precisa estar pronta 30 dias antes do aniversário. Nos dois casos citados acima, o IPCA de um mês saiu ou sai no meio do mês seguinte (o de outubro de 2026 em 12/11, o de novembro previsto para 11/12); com aviso de 30 dias, isso empurra a janela mais para trás. Confira os calendários de divulgação de cada fonte antes de fixar a regra.
- **O que fazer quando o número não chegou.** Recomendação da Torno: a rotina não calcula, não usa "o último número disponível" no lugar do que o contrato pede e abre um alerta para o financeiro, como em [monitoramento de fluxo crítico](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/). Usar o número errado e corrigir depois é pior do que atrasar o aviso um dia.
- **Dia da rotina.** Em que dia do mês a rotina roda, e o que acontece se esse dia cai num domingo ou feriado. A regra geral de datas está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).

![Ilustração de uma ampulheta com o caminho do índice até a fatura do contrato A da Manutenção Exemplo Ltda., com aniversário em 01/12/2026. No bulbo de cima, outubro de 2026, o mês de referência, com preços coletados ao longo do mês. No gargalo, em azul, um dado real: o IBGE divulgou o IPCA de outubro em 12/11. No bulbo de baixo, do exemplo: em 16/11 a rotina calcula e envia o aviso, e em 01/12 sai a fatura reajustada. À direita, duas perguntas em vermelho: se o contrato pedisse o índice até novembro, o de novembro só sai em 11/12, segundo a Agência Gov, e a fatura de 01/12 não teria o número; com aviso de 30 dias, em 01/11 ainda não existiria o IPCA de outubro, e a janela teria de acabar antes de outubro. Abaixo, a regra do exemplo: sem índice na base, a rotina não calcula, alerta o financeiro e não usa o último número. Na parte de baixo, outro dado real: o IGP-M de novembro de 2025, segundo a FGV IBRE, teve coleta de 21/10 a 20/11/2025 e foi divulgado em 27/11. Uma nota diz que cada índice tem período de coleta e data de divulgação próprios, e que as datas de divulgação vêm da Agência Gov, de 12/11/2026, e da FGV IBRE, de 27/11/2025; rotina, aviso e fatura são do exemplo. Exemplo fictício com datas de divulgação reais.](./torno-reajuste-ampulheta-defasagem.svg)

*Exemplo fictício com datas reais de divulgação (IPCA de outubro de 2026 e data prevista do IPCA de novembro, segundo a Agência Gov; IGP-M de novembro de 2025, segundo a FGV IBRE); contrato, rotina e aviso inventados. Ilustração original Torno, 2026.*

## O acumulado de 12 meses: a conta e o arredondamento

O cálculo do reajuste parece trivial e é onde aparecem as diferenças de centavos que geram discussão com o cliente.

- **Multiplicar, não somar.** O acumulado de 12 meses é a multiplicação dos fatores mensais, (1 + taxa de cada mês), menos um. Somar as taxas dá um número parecido e errado, e o erro cresce quando as taxas são maiores. No cálculo do reajuste pelo IGP-M ou pelo IPCA, a regra é a mesma.
- **Mês negativo no meio da janela.** Um mês com taxa negativa entra na multiplicação como fator menor que 1. Não é o mesmo que "índice negativo", que é o acumulado dos 12 meses abaixo de zero, tratado mais abaixo.
- **Casas decimais.** O contrato manda arredondar o percentual acumulado (a duas casas, por exemplo) antes de aplicar, ou aplicar o fator cheio? Arredondar a taxa de cada mês antes de multiplicar? As três escolhas dão centavos diferentes. Escreva a regra, com exemplo numérico, e use a mesma no sistema e na planilha de conferência. Os cuidados de etapa e regra estão em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).
- **Sobre qual valor.** O reajuste incide sobre a mensalidade vigente no aniversário, sobre a mensalidade-base do contrato sem descontos ou sobre cada item do contrato? Um desconto temporário concedido ao cliente é reajustado junto, ou o reajuste incide sobre o preço cheio e o desconto é reaplicado depois?
- **Itens com índices diferentes.** Um contrato pode ter um item de serviço reajustado por um índice e um de locação de equipamento por outro. Cada item precisa da sua regra.

![Ilustração que compara, lado a lado, quatro contas para o reajuste do contrato A da Manutenção Exemplo Ltda., mensalidade R$ 2.480,00. No alto, as 12 taxas mensais inventadas, de novembro de 2025 a outubro de 2026, em porcentagem: 0,31; 0,42; 0,27; 0,55; 0,38; 0,29; 0,21; 0,18; −0,06, em vermelho; 0,15; 0,47 e 0,33. À esquerda, em verde, a conta pela regra do contrato: multiplicar os 12 fatores, 1,0031 × 1,0042 × … × 1,0033 = 1,035552…; acumulado de 3,555…%, arredondado a duas casas, 3,56%; 2.480,00 × 1,0356 = 2.568,288, ou R$ 2.568,29. À direita, em vermelho, três contas diferentes: somar as taxas dá 3,50% e R$ 2.566,80, R$ 1,49 a menos por mês; usar o fator cheio, sem arredondar o percentual, dá R$ 2.568,17, R$ 0,12 a menos; outubro digitado como 0,38 dá 3,61% e R$ 2.569,53, R$ 1,24 a mais. Abaixo: o fator cheio não é errado em si, é diferente da regra deste contrato, que manda arredondar o percentual a duas casas; escreva a regra, e o sistema e a planilha de conferência precisam chegar ao mesmo centavo. Taxas inventadas, não são o IPCA publicado pelo IBGE. Exemplo fictício.](./torno-reajuste-conta-certo-errado.svg)

*Exemplo fictício: taxas inventadas, que não são o IPCA publicado; o arredondamento do percentual a duas casas é regra do contrato do exemplo, não recomendação. Ilustração original Torno, 2026.*

## Muitos contratos, aniversários diferentes e troca de plano

Na planilha, cada contrato é uma linha conferida por alguém. No sistema, a rotina reajusta dezenas ou centenas de contratos de uma vez, cada um com seu aniversário, índice e janela.

- **Cada contrato com o seu aniversário.** A rotina mensal pega os contratos cujo aniversário cai no período e aplica a regra de cada um. Não existe "o reajuste de janeiro" para todos, a menos que os contratos digam isso.
- **Rotina em lote que falha no meio.** Se a rotina reajusta 140 contratos e falha no 87º, o que aconteceu com os outros 53? Ela pode rodar de novo sem reajustar duas vezes os 86 primeiros? Os cuidados estão em [ações em lote e falhas parciais](https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/).
- **Troca de plano no meio do ciclo.** O cliente sobe de plano em junho. A diferença do mês é cobrada proporcionalmente aos dias (pro rata), em mês de 30 dias ou de dias reais? A data-base continua a original ou passa a ser junho? Se passar a junho, o próximo reajuste anda seis meses. Se continuar, o reajuste do aniversário incide sobre o valor do plano novo. A lei fala que a revisão contratual reinicia o período (Lei 10.192/2001, art. 2º, §2º); se uma troca de plano é revisão, no seu contrato, é pergunta para o advogado. O sistema precisa aplicar uma regra escrita, sempre a mesma.
- **Plano novo com preço de tabela atual.** O plano para o qual o cliente migrou já está no preço deste ano. Reajustá-lo de novo no aniversário original pode cobrar duas vezes a inflação do mesmo período. Escreva o que acontece nesse caso.
- **Contrato novo assinado com preço de tabela.** O primeiro reajuste dele é daqui a 12 meses, mesmo que a tabela seja reajustada antes, como em [tabela de preços](https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/).

![Ilustração de um calendário vertical de 16 meses, de novembro de 2025 a fevereiro de 2027, com três colunas, uma para cada contrato da Manutenção Exemplo Ltda. Contrato A, IPCA, mensalidade R$ 2.480,00, aniversário em 01/12: uma barra azul marca a janela de 12 meses do índice, de novembro de 2025 a outubro de 2026, o último mês sendo M−2; em novembro de 2026, uma caixa amarela, 16/11, aviso; em dezembro, uma caixa preta, 01/12, fatura. Contrato B, IGP-M, R$ 1.150,00, aniversário em 01/01: janela de dezembro de 2025 a novembro de 2026; aviso em 15/12; fatura em 01/01/2027. Contrato C, IPCA, R$ 3.900,00, aniversário em 01/02: janela de janeiro a dezembro de 2026; uma caixa vermelha em junho de 2026 marca 16/06, troca de plano; aviso em 15/01/2027; fatura em 01/02/2027. Uma legenda diz que amarelo é a rotina que calcula e envia o aviso e preto é a fatura. Abaixo, os resultados: A, 3,56%, R$ 2.568,29; B, −0,85%, mantém R$ 1.150,00 pela regra do contrato; C, 4,20% sobre R$ 4.600,00, R$ 4.793,20; e a nota de que a troca de plano em junho não muda a data-base de C. Taxas inventadas, não são os índices publicados. Exemplo fictício.](./torno-reajuste-calendario-aniversarios.svg)

*Exemplo fictício: empresa, contratos, valores e taxas inventados; a regra de usar os 12 meses terminados dois meses antes do aniversário é escolha do contrato do exemplo, não recomendação. Ilustração original Torno, 2026.*

## Índice negativo: regra do contrato, não do sistema

O acumulado de 12 meses pode vir negativo. Não é hipótese teórica: segundo a FGV IBRE, o [IGP-M acumulou −0,11% nos 12 meses até novembro de 2025](https://portalibre.fgv.br/system/files/divulgacao/noticias/mat-complementar/2025-11/IGP-M_FGV_press%20release_Nov25.pdf). Quando isso acontece, há pelo menos três redações possíveis no contrato:

- **Aplica a redução.** A mensalidade cai na proporção do índice.
- **Mantém o valor.** O reajuste do ano é zero; a mensalidade não cai.
- **Mantém e compensa.** O reajuste do ano é zero, e o índice negativo é descontado do próximo reajuste positivo.

Qual vale é o contrato que diz. Se o contrato é omisso, a resposta não é do sistema nem do fornecedor de software; é do advogado, e o sistema precisa parar o reajuste daquele contrato e pedir a decisão, em vez de escolher um padrão. Vale conferir os contratos atuais: se algum não diz o que fazer com índice negativo, é melhor descobrir agora do que no mês em que o acumulado vier abaixo de zero.

Para o sistema:

- **Regra por contrato**, com as três opções e uma quarta: "contrato omisso, decisão pendente".
- **Registro do zero.** "Mantém o valor" não é "não houve reajuste": o sistema registra que houve um reajuste de 0%, com o acumulado de −0,85% (no exemplo) que o justificou. Senão, no ano seguinte, ninguém sabe se o contrato foi esquecido.
- **Compensação guardada.** Na terceira opção, o fator negativo fica guardado no contrato e entra no próximo cálculo, com registro de que foi usado.

![Ilustração de uma bifurcação de trilhos para o contrato B da Manutenção Exemplo Ltda., IGP-M, mensalidade R$ 1.150,00, aniversário em 01/01. No topo, o acumulado de 12 meses, −0,85%, inventado. O trilho se divide em três. Trilho 1, aplica a redução: 1.150,00 × 0,9915 = 1.140,225, ou R$ 1.140,23. Trilho 2, em verde e marcado como regra do contrato B, mantém o valor: reajuste registrado de 0%, acumulado de −0,85%, R$ 1.150,00. Trilho 3, mantém e compensa: agora R$ 1.150,00, e o próximo ano leva o −0,85% junto. Abaixo, o trilho 3 no ano seguinte, com +5,00% inventado: 1.150,00 × 1,05 × 0,9915 = R$ 1.197,24, não R$ 1.207,50. Um quadro azul traz um dado real: o IGP-M acumulado em 12 meses até novembro de 2025 foi de −0,11%, segundo a FGV IBRE, em divulgação de 27/11/2025. No rodapé, em vermelho: qual trilho vale é o contrato que diz; o sistema não escolhe, e a dúvida vai para o advogado. Exemplo fictício.](./torno-reajuste-indice-negativo-trilhos.svg)

*Exemplo fictício: contrato, acumulado e valores inventados, com um dado real do IGP-M (FGV IBRE); os três trilhos são possibilidades de redação, e qual vale é decisão do contrato com o advogado, não recomendação. Ilustração original Torno, 2026.*

## Índice que deixa de existir ou muda

Contratos longos sobrevivem a índices. Um índice pode deixar de ser publicado, mudar de nome ou de metodologia. Escreva:

- **Substituto previsto.** Há contratos que dizem "na falta deste índice, aplica-se o que o substituir oficialmente, ou, na falta, o índice X". O sistema precisa guardar esse substituto por contrato, não por empresa.
- **Sem substituto escrito.** O sistema não troca o índice sozinho. O contrato vai para uma fila de decisão, e a troca, quando decidida, é registrada como alteração do contrato, com data e documento (aditivo ou acordo).
- **Mudança de metodologia.** Se o órgão muda a forma de cálculo, a série continua a mesma para o contrato? Essa é pergunta para o advogado e, se for o caso, para o próprio órgão; para o sistema, basta registrar qual série foi usada em cada reajuste.

## Aviso ao cliente

O aviso de reajuste é o momento em que o cliente descobre o número. Escreva:

- **Antecedência.** O prazo vem do contrato (e, em relação de consumo, das regras que o advogado indicar). O sistema calcula a data do aviso a partir do aniversário e do prazo, e confere que o índice estará disponível até lá; se não estiver, a regra da janela está incompatível com o prazo de aviso, e isso é um problema do contrato, não do sistema.
- **Conteúdo.** Índice, fonte, janela de meses, acumulado, valor atual, valor novo, a partir de quando vale e como o cliente pode tirar dúvidas. Recomendação da Torno: mostrar a conta, não só o resultado. "Reajuste de 3,56% pelo IPCA acumulado de novembro de 2025 a outubro de 2026" evita metade das perguntas.
- **Prova de envio.** O aviso que não chegou não avisou ninguém. Os estados de envio, entrega e falha estão em [e-mails do sistema](https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/); o aviso em PDF é documento do momento da emissão, como em [gerar documentos em PDF](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/).
- **Cobrança recorrente autorizada.** Se o cliente paga por débito ou Pix Automático com valor máximo, o valor novo precisa caber na autorização; senão, a cobrança falha no primeiro mês reajustado. Veja [Pix Automático no sistema](https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/).

## Teto, renegociação e aditivo: decisão humana

Nem todo reajuste deveria sair sozinho.

- **Teto do contrato.** Se o contrato limita o reajuste (por exemplo, "o menor entre o índice e 8%"), isso é regra e o sistema aplica.
- **Teto de política.** A empresa pode decidir que reajustes acima de certo percentual passam por alguém do comercial antes do aviso, para avaliar o risco de perder o cliente. Isso não muda o contrato; muda o fluxo. O reajuste fica pendente, com prazo, numa fila de aprovação, como em [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).
- **Renegociação.** O cliente pede para não ter reajuste este ano, ou para ter metade. Se a empresa aceitar, isso é desconto com prazo ou alteração do contrato? Recomendação da Torno: registre como uma decisão com nome, data, motivo e vigência, e mantenha visível o valor que o contrato permitiria. Se for alteração do contrato, ela vem com documento (aditivo) e, possivelmente, muda a data-base; a pergunta "isso é revisão?" volta para o advogado.
- **Quem pode.** Lançar índice, suspender o reajuste de um contrato, conceder desconto sobre o reajuste e reprocessar são ações com perfil próprio, nas [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## Fatura emitida, correção e reprocessamento

O reajuste foi calculado com um número errado: uma taxa digitada com erro, a série errada, a janela errada. Ou a fonte publicou uma correção. O que acontece com o que já foi faturado?

- **Separar passado e futuro.** A fatura emitida é um documento; o sistema não deve mudar o valor dela silenciosamente. A correção gera um lançamento novo (complemento ou crédito na próxima fatura, ou cancelamento e reemissão, conforme a regra fiscal e o processo da empresa, que o contador define) e o valor das faturas futuras é recalculado.
- **Reprocessar só o que foi afetado.** O sistema identifica quais contratos usaram o número errado, recalcula, mostra a diferença por contrato antes de aplicar e pede confirmação. Reprocessar "tudo do mês" pode reajustar de novo contratos que estavam certos.
- **Novo aviso.** Se o valor avisado mudou, o cliente recebe um aviso de correção, com a conta.
- **Nem todo erro vem da fonte.** Um número carregado errado na base produz o mesmo efeito, e é o caso que o sistema consegue prevenir: a carga do índice merece conferência, por duas pessoas ou por comparação automática com uma segunda fonte, antes de liberar a rotina.

## Histórico: a trilha de cada reajuste

Quando o cliente pergunta "de onde saiu esse valor?" três anos depois, a resposta está no registro. Recomendação da Torno: cada reajuste grava, no mínimo:

- contrato, item, data-base usada e aniversário;
- índice, fonte e série, janela de meses, as taxas ou números-índice usados e quando foram carregados;
- acumulado calculado, regra de arredondamento e acumulado aplicado;
- valor anterior, valor novo e a partir de quando vale;
- regra aplicada para índice negativo, teto ou compensação, quando for o caso;
- aviso enviado, data, destinatário e resultado do envio;
- quem aprovou, suspendeu, concedeu desconto ou reprocessou, quando e por quê;
- em reprocessamento, o vínculo com o reajuste original e a diferença lançada.

O que um registro precisa ter para servir de prova está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Índice, substituto e janela de meses de cada contrato | Contrato, com o advogado |
| Periodicidade, data-base e o que conta como revisão | Contrato, com o advogado |
| Regra para índice negativo e compensação | Contrato, com o advogado |
| Casas decimais e arredondamento do acumulado e da mensalidade | Contrato; financeiro escreve o exemplo numérico |
| Sobre qual valor incide o reajuste (com ou sem desconto, por item) | Contrato, com o financeiro e o comercial |
| Fonte do número e conferência da carga do índice | Financeiro, com TI |
| Dia da rotina, regra de dia não útil e alerta de índice ausente | Financeiro e TI |
| Data-base e pro rata na troca de plano | Contrato, com o advogado e o financeiro |
| Prazo e texto do aviso ao cliente | Comercial e financeiro, revisado pelo advogado |
| Teto de política e fila de revisão | Diretoria, com [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) |
| Renegociação, desconto sobre o reajuste e aditivo | Diretoria e comercial, com o advogado |
| Correção de fatura já emitida | Financeiro, com o contador |
| Quem lança índice, suspende, aprova e reprocessa | Gestor financeiro, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Manutenção Exemplo Ltda. presta manutenção predial com contratos mensais para empresas. Regras dos contratos e da empresa (escolhas do exemplo, não recomendação nem limite legal):

- **Fatura.** Emitida no dia 1 de cada mês, referente ao próprio mês.
- **Aniversário.** O reajuste vale a partir da fatura do mês do aniversário.
- **Janela.** Acumulado dos 12 meses do índice terminados no segundo mês antes do aniversário (M−2).
- **Conta.** Acumulado pela multiplicação dos fatores mensais; percentual arredondado a duas casas, metade para cima; mensalidade arredondada a centavos, metade para cima.
- **Rotina.** Roda no dia 15 do mês anterior ao aniversário (se não for dia útil, no próximo dia útil). Confere se os 12 meses estão na base; se faltar algum, não calcula e alerta o financeiro.
- **Aviso.** Por e-mail no dia da rotina, com a conta; pelo menos 10 dias antes da fatura reajustada.
- **Índice negativo.** Mantém o valor; reajuste registrado como 0%; sem compensação.
- **Teto de política.** Acumulado acima de 6,00%: o reajuste fica pendente para o comercial antes do aviso.
- **Troca de plano.** Diferença do mês cobrada pro rata em mês de 30 dias na fatura seguinte; a data-base não muda; o reajuste do aniversário incide sobre o valor vigente.
- **Correção.** Fatura emitida não é alterada; diferença lançada na fatura seguinte, com aviso de correção.
- **Taxas.** As taxas dos índices do exemplo são **inventadas** e não são os números publicados pelo IBGE ou pela FGV (o IPCA real de outubro de 2026, por exemplo, foi de 0,14%, segundo a [Agência Gov](https://agenciagov.ebc.com.br/noticias/202611/inflacao-desacelera-e-fica-em-0-14-em-outubro); no exemplo, a taxa de outubro é 0,33%).

**Os contratos:**

| Contrato | Índice (taxas fictícias) | Mensalidade | Data-base e aniversário | Janela (M−2) |
|---|---|---|---|---|
| A | IPCA | R$ 2.480,00 | 01/12/2025; aniversário 01/12 | nov/2025 a out/2026 |
| B | IGP-M | R$ 1.150,00 | 01/01/2026; aniversário 01/01 | dez/2025 a nov/2026 |
| C | IPCA | R$ 3.900,00 (plano novo de R$ 4.600,00 desde 16/06/2026) | 01/02/2026; aniversário 01/02 | jan/2026 a dez/2026 |

**Contrato A.** Taxas mensais inventadas, de novembro de 2025 a outubro de 2026: 0,31; 0,42; 0,27; 0,55; 0,38; 0,29; 0,21; 0,18; −0,06; 0,15; 0,47; 0,33 (%). O produto dos fatores é 1,035552…, acumulado de 3,555…%, arredondado para 3,56%. A rotina roda na segunda-feira, 16/11/2026 (o dia 15 foi domingo), encontra os 12 meses na base, calcula 2.480,00 × 1,0356 = 2.568,288 → **R$ 2.568,29** e envia o aviso, 15 dias antes da fatura de terça-feira, 01/12/2026.

**Contrato B.** Acumulado inventado do IGP-M de dezembro de 2025 a novembro de 2026: −0,85%. A rotina roda na terça-feira, 15/12/2026. Pela regra do contrato, mantém **R$ 1.150,00**, registra reajuste de 0% com acumulado de −0,85% e envia o aviso informando que não há reajuste e por quê. Se o contrato mandasse aplicar a redução, seria 1.150,00 × 0,9915 = 1.140,225 → R$ 1.140,23.

**Contrato C.** Na terça-feira, 16/06/2026, o cliente sobe do plano de R$ 3.900,00 para o de R$ 4.600,00. A fatura de junho já tinha saído em 01/06 por R$ 3.900,00; a diferença de 16 a 30/06, 15 dias, é (4.600,00 − 3.900,00) × 15/30 = **R$ 350,00**, lançada na fatura de 01/07. A data-base continua 01/02. Acumulado inventado do IPCA de janeiro a dezembro de 2026: 4,20%. A rotina roda na sexta-feira, 15/01/2027, e calcula 4.600,00 × 1,0420 = **R$ 4.793,20**, para a fatura de segunda-feira, 01/02/2027.

| Contrato | Acumulado fictício | Regra aplicada | Valor anterior | Valor novo | Vale a partir de |
|---|---|---|---|---|---|
| A | 3,56% | Reajuste normal | 2.480,00 | 2.568,29 | 01/12/2026 |
| B | −0,85% | Índice negativo: mantém | 1.150,00 | 1.150,00 | 01/01/2027 |
| C | 4,20% | Reajuste sobre o plano vigente | 4.600,00 | 4.793,20 | 01/02/2027 |

**As armadilhas.** No contrato A, somar as taxas daria 3,50% e R$ 2.566,80 (R$ 1,49 a menos por mês); aplicar o fator cheio sem arredondar o percentual daria R$ 2.568,17 (R$ 0,12 a menos), diferente da regra deste contrato. No contrato C, reajustar o valor do plano antigo daria 3.900,00 × 1,0420 = R$ 4.063,80, e mudar a data-base para 16/06 empurraria o reajuste para junho de 2027.

**Simulação de reprocessamento.** Suponha que a taxa de outubro do contrato A tivesse sido carregada como 0,38 em vez de 0,33. O acumulado seria 3,606…%, arredondado para 3,61%, e a mensalidade, 2.480,00 × 1,0361 = 2.569,528 → R$ 2.569,53. A fatura de 01/12 sairia com R$ 1,24 a mais. Descoberto o erro na quinta-feira, 03/12, a carga é corrigida; o sistema mostra que só o contrato A usou aquele número; o gestor confirma; a fatura de 01/12 não é alterada; a fatura de 01/01/2027 sai por 2.568,29 com crédito de R$ 1,24; o cliente recebe aviso de correção; o histórico liga o reajuste corrigido ao original.

Monte os cenários em um ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com contratos fictícios e **destinos de e-mail controlados**, para nenhum aviso de teste chegar a um cliente real. Escreva cada cenário como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Rotina de 16/11/2026 (15/11 é domingo) | Seleciona só o contrato A (aniversário 01/12) | Log da rotina |
| Janela do contrato A | nov/2025 a out/2026, 12 meses | Registro do reajuste |
| Acumulado do contrato A | Produto dos fatores 1,035552…; 3,56% após arredondar | Registro com as 12 taxas |
| Valor novo do contrato A | R$ 2.568,29 | Registro e fatura de 01/12 |
| Simulação: conta por soma das taxas | Não é usada; o sistema dá 3,56%, não 3,50% | Teste com planilha de conferência |
| Simulação: fator cheio sem arredondar o % | Não é usado no contrato A; R$ 2.568,29, não R$ 2.568,17 | Registro |
| Aviso do contrato A | Sai em 16/11 com índice, janela, acumulado, valor atual, valor novo e data | E-mail no destino de teste e registro de envio |
| Simulação: IPCA de outubro ausente na base em 16/11 | Nada é calculado; alerta ao financeiro; nenhum aviso | Alerta e log |
| Simulação: rotina usaria setembro como último mês por falta de outubro | Recusado; a janela é a do contrato | Log |
| Simulação: segundo reajuste do contrato A em 01/06/2027 | Bloqueado: menos de 12 meses do anterior | Mensagem de bloqueio |
| Simulação: cadastro de reajuste semestral por índice | Recusado no cadastro | Mensagem de validação |
| Contrato B em 15/12/2026, acumulado −0,85% | Mantém R$ 1.150,00; reajuste registrado 0% com acumulado −0,85% | Registro do reajuste |
| Aviso do contrato B | Informa que não há reajuste e o acumulado negativo | Registro de envio |
| Simulação: contrato B com regra "aplica a redução" | R$ 1.140,23 | Registro |
| Simulação: contrato B com regra "mantém e compensa"; próximo ano +5,00% | R$ 1.197,24 no ano seguinte; compensação marcada como usada | Registro dos dois reajustes |
| Simulação: contrato com regra de índice negativo vazia | Reajuste não roda; fila de decisão | Fila |
| Troca de plano do contrato C em 16/06/2026 | Pro rata de R$ 350,00 na fatura de 01/07; data-base continua 01/02 | Fatura de 01/07 e cadastro |
| Reajuste do contrato C em 15/01/2027 | 4,20% sobre R$ 4.600,00 = R$ 4.793,20 | Registro e fatura de 01/02/2027 |
| Simulação: reajuste do contrato C sobre o plano antigo | Não ocorre; não sai R$ 4.063,80 | Registro |
| Três contratos com aniversários em dezembro, janeiro e fevereiro | Cada um reajustado só na sua rotina, com a sua janela | Logs de 16/11, 15/12 e 15/01 |
| Simulação: rotina em lote falha no meio | Contratos já reajustados não são reajustados de novo ao rodar outra vez; os que faltaram são processados | Log e registros |
| Simulação: acumulado de 6,40% num contrato | Reajuste pendente para o comercial; nenhum aviso até a aprovação | Fila de aprovação |
| Simulação: desconto concedido sobre o reajuste | Exige aprovação; registro guarda o valor que o contrato permitiria | Pedido de aprovação e registro |
| Simulação: índice do contrato deixa de ser publicado, sem substituto escrito | Não troca sozinho; fila de decisão | Fila |
| Simulação: índice substituto previsto no contrato | Usa o substituto e registra a troca | Registro |
| Simulação: taxa de outubro carregada como 0,38 | Contrato A com 3,61% e R$ 2.569,53 | Registro |
| Correção da taxa em 03/12/2026 | Sistema lista só o contrato A como afetado; pede confirmação | Tela de reprocessamento |
| Reprocessamento confirmado | Fatura de 01/12 inalterada; crédito de R$ 1,24 na fatura de 01/01/2027; valor 2.568,29 daí em diante; aviso de correção | Faturas, registro e envio |
| Simulação: valor reajustado acima do máximo autorizado na cobrança recorrente | Alerta ao financeiro antes da primeira cobrança reajustada | Alerta |
| Simulação: usuário sem perfil tenta lançar índice ou reprocessar | Recusado | Tentativa recusada |
| Histórico de qualquer reajuste | Data-base, índice, fonte, janela, taxas, acumulado, arredondamento, valores, regra aplicada, aviso e responsáveis | Relatório do contrato |
| Simulação: e-mail do aviso volta | Reajuste mantém a data; tarefa para o financeiro atualizar o contato e reenviar | Registro de envio e tarefa |

*Fim do exemplo fictício. Empresa, contratos, valores, datas, taxas, janelas, prazos, teto e decisões são modelo editorial, sem cliente, empresa, contrato, reajuste real ou sistema entregue; as taxas não são índices publicados, e as escolhas do exemplo são da empresa fictícia, não regras recomendadas, nem limites legais, nem comportamento padrão de ferramenta.*

Antes do go-live, pegue os reajustes feitos na planilha nos últimos 12 meses e rode a regra nova num ambiente de teste, sem enviar nada: quantos contratos dariam valor diferente, por quantos centavos, quantos não têm data-base confiável e quantos não têm regra para índice negativo. Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### Qual índice usar no reajuste anual do contrato?

Este artigo não recomenda índice. O índice é uma decisão comercial e jurídica de cada contrato; IPCA, INPC e IGP-M medem coisas diferentes e podem dar resultados bem diferentes no mesmo ano. O que o sistema precisa é aplicar exatamente o índice, a janela e a regra que cada contrato diz, e guardar de onde veio cada número.

### Posso reajustar a cada seis meses?

Segundo o texto da Lei 10.192/2001, é nula a estipulação de reajuste ou correção monetária com periodicidade inferior a um ano (art. 2º, §1º). Se o seu caso tem alguma particularidade, a pergunta é para o advogado. Recomendação da Torno para o sistema: não permitir reajuste por índice em intervalo menor que 12 meses.

### O índice veio negativo. A mensalidade cai?

Depende do contrato. Há contratos que aplicam a redução, contratos que mantêm o valor e contratos que compensam no reajuste seguinte. Se o contrato for omisso, a decisão é com o advogado; o sistema deve parar e pedir a decisão, não escolher um padrão.

### E se o índice do mês ainda não saiu no dia do reajuste?

A janela do contrato deveria evitar isso, terminando num mês que já esteja divulgado na data do cálculo. Se mesmo assim o número não estiver na base, a rotina não calcula, não usa outro mês no lugar e avisa o financeiro.

Para transformar as cláusulas de reajuste em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) dois ou três contratos com redações diferentes (sem dados de clientes), a planilha de reajustes do último ano e o caso mais recente de reajuste contestado por um cliente.

*Fontes consultadas em 20 de novembro de 2026: Lei 10.192/2001 e Lei 8.245/1991, na norma atualizada da Câmara dos Deputados (o portal do Planalto não abriu); IBGE, Sistema Nacional de Índices de Preços ao Consumidor: métodos de cálculo, 6ª edição (2012); Agência Gov, notícia de 12/11/2026 sobre o IPCA de outubro de 2026; FGV IBRE, release do IGP-M de novembro de 2025 (27/11/2025); gov.br, página da Calculadora do Cidadão do Banco Central (atualizada em 15/12/2025). As páginas do IPCA e do INPC e o calendário de divulgação no site do IBGE não abriram na data da consulta; o SIDRA, o calendário da FGV IBRE e as séries do Banco Central não foram consultados. Este artigo não é parecer jurídico e não recomenda índice, banco, fonte de dados nem fornecedor; empresa, contratos, taxas e ilustrações são fictícios, exceto as datas e números de índices atribuídos às fontes acima.*
