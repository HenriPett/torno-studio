---
content_id: torno-artigo-pt-20261117-industrializacao-terceiros
intent_id: buyer-subcontracting-third-party-processing-stock-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Remessa para industrialização no sistema: o que definir e testar antes de automatizar o controle de terceiros'
h1: 'Remessa para industrialização no sistema: o que definir e testar antes de automatizar o controle de terceiros'
seo_title: 'Remessa para industrialização no sistema: saldo e aceite | Torno'
seo_description: 'Remessa e retorno, saldo em poder de terceiros por lote, perda e refugo, cobrança, prazo, ordem de produção, MRP e Bloco K: o que definir e testar no sistema.'
summary: 'Roteiro para a indústria que manda material para industrialização por encomenda ou beneficiamento em terceiros e vai tirar esse controle da planilha: como o sistema modela a operação; o que a remessa precisa carregar; saldo em poder de terceiros por item, lote e remessa; retorno do produto, do material não aplicado e do refugo, com balanço de quantidades e tolerância de perda; conferência da cobrança do serviço e dos insumos do industrializador; prazo operacional e prazo fiscal, com alertas; vínculo com a ordem de produção e com o MRP; conferência com a nota fiscal e com o Bloco K da EFD ICMS/IPI, sem prescrever tratamento fiscal; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que a indústria precisa definir e testar antes de automatizar no sistema a remessa para industrialização e o retorno de material enviado a terceiros, para que o saldo em poder de terceiros, a cobrança, a ordem de produção e a escrituração fiscal batam?
proposed_path: /blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
canonical_url: https://tornostudio.com/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos e diretores industriais, gerentes de PCP e de suprimentos, compradores, almoxarifado, qualidade, fiscal e TI de indústrias de médio e grande porte que enviam material para industrialização por encomenda ou beneficiamento em terceiros (zincagem, pintura, tratamento térmico, usinagem, costura e similares) e vão contratar, especificar ou aceitar um sistema (módulo de ERP ou sistema sob medida) para controlar essa operação, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de trocar a planilha de controle de terceiros pelo saldo, pelos alertas e pelos vínculos calculados pelo sistema.
scope: Lado do encomendante (quem envia o material) e, de forma breve, do industrializador; formas de modelar a operação no sistema (operação externa na ordem de produção, pedido de serviço com componentes, controle por nota); conteúdo da remessa; saldo em poder de terceiros por item, lote, remessa e terceiro; retorno do produto, do material não aplicado e do refugo, balanço de quantidades, perda prevista e tolerância; retorno parcial e reprovação na inspeção; cobrança do serviço e dos insumos do industrializador e conferência com o pedido; prazo operacional e prazo fiscal parametrizado pelo fiscal, com alertas; vínculo com a ordem de produção e com o MRP; conferência com a nota fiscal e com o Bloco K da EFD ICMS/IPI (estoque escriturado e industrialização efetuada por terceiros), sem definir tratamento fiscal; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Parecer fiscal, contábil ou jurídico; escolha de CFOP, CST, suspensão, diferimento ou prazo para um caso concreto; regras de cada UF; preenchimento da EFD ICMS/IPI e do Bloco K; tratamento de IBS e CBS na nota (coberto em outro artigo); industrialização por conta e ordem com três ou mais estabelecimentos em detalhe; drawback, Zona Franca e regimes aduaneiros; recomendação ou comparação de ERP ou fornecedor (a documentação de fornecedores aparece só como exemplo de modelagem); cálculo de MRP, estrutura de produto, programação interna, inventário, rastreio de lote e não conformidade em geral (cobertos em outros artigos); custeio e contabilização da perda.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-17T15:14:16Z'
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
    reason: Trata o cálculo de necessidade de materiais e deixou o estoque em terceiros como decisão depósito por depósito; aqui o saldo em terceiros e o retorno previsto como entrada do MRP.
  - path: https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/
    reason: Trata a estrutura de produto, perda prevista e código de semiacabado; aqui o código do item antes e depois do beneficiamento e a perda do processo do terceiro.
  - path: https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/
    reason: Trata a sequência das ordens nas máquinas da própria fábrica; aqui a operação feita fora, que entra na programação como prazo do terceiro, não como capacidade interna.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata contagem, ajuste e inventário, inclusive a separação do estoque próprio em poder de terceiros; aqui o movimento que forma esse saldo e a conferência com o terceiro.
  - path: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
    reason: Trata lote, validade e rastreio em geral; aqui o lote que sai para o terceiro e o lote que volta.
  - path: https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/
    reason: Trata o registro e a disposição de não conformidade; aqui a peça reprovada na inspeção do retorno e o retrabalho no terceiro.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Trata IBS e CBS na NF-e e o que pedir ao sistema emissor; aqui as notas de remessa e retorno como documentos que o controle de terceiros precisa conferir.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas, cortes e contagem de prazos em geral; aqui o prazo de retorno de cada remessa.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Trata alertas e quem os recebe em geral; aqui o alerta de remessa vencida e de saldo sem explicação.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata estados e alçadas de aprovação em geral; aqui a liberação de uma cobrança divergente e a baixa de saldo sem retorno.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a baixa manual de saldo em terceiros precisa registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode baixar saldo, alterar tolerância e liberar cobrança.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata valores e arredondamento em geral; aqui o preço por peça do serviço e a soma da cobrança.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com terceiros, itens, lotes e notas fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de controle de terceiros.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar o controle de terceiros em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'Resposta à Consulta da SEFAZ-SP sobre um caso de industrialização em cadeia (contribuinte do Simples Nacional que industrializa por encomenda e repassa parte do processo a outro industrializador) aplica o tratamento dos artigos 402 e seguintes do RICMS/SP; diz que a remessa dos insumos deve ser emitida com suspensão do imposto e sob o CFOP 5.901; e cita os códigos 5.902 (retorno dos insumos incorporados ao produto), 5.903 (retorno dos insumos não utilizados) e 5.124 (industrialização efetuada para outra empresa, para os serviços e as mercadorias do próprio industrializador).'
    reference: https://legislacao.fazenda.sp.gov.br/Paginas/RC24786_2021.aspx
    entity: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo, Resposta à Consulta 24786/2021'
    source_date: '2021'
    checked_at: '2026-11-17T14:58:00Z'
    limit: 'Consulta de um contribuinte específico, em São Paulo, num caso de industrialização em cadeia (não é o caso simples de encomendante e um industrializador), lida por resumo da ferramenta com trechos literais; vale para o caso consultado. Citada como exemplo de como uma UF trata a operação, não como regra para o leitor.'
  - classification: FATO
    claim: 'O art. 402 do RICMS/SP diz que o lançamento do imposto na saída de mercadoria para industrialização em outro estabelecimento fica suspenso, observado o disposto nos artigos 409 e 410, devendo ser efetivado quando, após o retorno, o autor da encomenda promover a saída subsequente; a suspensão alcança a saída do industrializador em retorno; salvo disposição em contrário, o industrializador recolhe o imposto sobre o valor acrescido, que é o total cobrado por ele, incluídos os serviços e as mercadorias empregadas no processo.'
    reference: https://legislacao.fazenda.sp.gov.br/Paginas/art402.aspx
    entity: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo, RICMS/SP (Decreto 45.490/2000), art. 402'
    source_date: null
    checked_at: '2026-11-17T15:00:00Z'
    limit: 'Regra de uma UF, lida no site oficial da SEFAZ-SP; outras UFs têm regras próprias. Não é parecer fiscal.'
  - classification: FATO
    claim: 'O art. 409 do RICMS/SP condiciona a suspensão e o diferimento ao retorno dos produtos industrializados ao estabelecimento de origem em até 180 dias contados da data da saída, prorrogáveis a critério do fisco por igual período e, excepcionalmente, por mais 180 dias; o art. 410 exige o imposto se o retorno não ocorrer no prazo.'
    reference: https://legislacao.fazenda.sp.gov.br/Paginas/art409.aspx
    entity: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo, RICMS/SP (Decreto 45.490/2000), arts. 409 e 410'
    source_date: null
    checked_at: '2026-11-17T15:02:00Z'
    limit: 'Regra de uma UF; o art. 410 foi lido só pela menção na própria página do art. 409 e na consulta 34218/2026. O prazo de 180 dias do exemplo é parâmetro cadastrado pela empresa fictícia de São Paulo, não regra geral.'
  - classification: FATO
    claim: 'Resposta à Consulta da SEFAZ-SP de 2026 sobre retorno de industrialização enviado por engano a estabelecimento de outra UF cita os arts. 402 e seguintes, 408, 409 (180 dias, prorrogáveis a critério do fisco) e 410 do RICMS/SP e os códigos 5.901, 6.901 e 6.124.'
    reference: https://legislacao.fazenda.sp.gov.br/Paginas/RC34218_2026.aspx
    entity: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo, Resposta à Consulta 34218/2026'
    source_date: '2026-07-29'
    checked_at: '2026-11-17T15:01:00Z'
    limit: 'Consulta de um contribuinte específico; mostra que erro de destinatário no retorno gera correção fiscal. Lida por resumo da ferramenta com trechos literais.'
  - classification: FATO
    claim: 'A tabela de CFOP publicada pela Secretaria da Fazenda de Santa Catarina descreve 1.124 como industrialização efetuada por outra empresa (entradas de mercadorias industrializadas por terceiros, compreendendo os valores referentes aos serviços prestados e os das mercadorias de propriedade do industrializador empregadas no processo), 1.902 como retorno de mercadoria remetida para industrialização por encomenda (insumos incorporados ao produto final pelo industrializador) e 1.903 como entrada de mercadoria remetida para industrialização e não aplicada no processo.'
    reference: https://sef.sc.gov.br/api-portal/Documento/Ver/6579
    entity: 'Secretaria de Estado da Fazenda de Santa Catarina, tabelas de CFOP (versão 2.0, com o Ajuste SINIEF 03/24)'
    source_date: null
    checked_at: '2026-11-17T15:11:00Z'
    limit: 'Reprodução estadual da tabela do Convênio SINIEF s/nº de 1970; só a parte das entradas foi lida. A tabela oficial do CONFAZ não foi aberta nesta sessão.'
  - classification: FATO
    claim: 'Solução de Consulta da Receita Federal sobre industrialização por encomenda trata a saída do estabelecimento executor com suspensão do IPI como possível, sob condições, e cita o Decreto 7.212/2010 (RIPI), art. 43, incisos VI e VII.'
    reference: https://netcpa.com.br/colunas/solucao-de-consulta-srrf10-no-100152020-ipi-industrializacao-por-encomenda-saida-de-produtos-do-estabelecimento-industrial-executor-suspensao-possibilidade-condicoes/20484
    entity: 'Receita Federal, Solução de Consulta SRRF10 nº 10.015/2020, reproduzida pela NetCPA'
    source_date: '2020'
    checked_at: '2026-11-17T15:04:00Z'
    limit: 'Reprodução de terceiro; o autor não abriu o RIPI (Planalto e Câmara recusados nesta sessão); o revisor independente leu o art. 43, VI e VII, na publicação original no site da Câmara (redação original, sem alterações posteriores). Só sustenta que existe hipótese de suspensão do IPI com condições; não é regra para o leitor.'
  - classification: FATO
    claim: 'A tabela de registros do Guia Prático da EFD ICMS/IPI, versão 3.2.3, lista no Bloco K, entre outros, K200 (estoque escriturado), K250 (industrialização efetuada por terceiros, itens produzidos), K255 (industrialização em terceiros, insumos consumidos), K270 e K275 (correção de apontamento, inclusive de K250 e K255), K280 (correção do estoque escriturado) e K300 a K302 (produção conjunta, industrialização efetuada por terceiros).'
    reference: https://guiatributario.net/wp-content/uploads/2026/06/guia-efd-versao323.pdf
    entity: Guia Prático da EFD ICMS/IPI, versão 3.2.3 (atualizada em 06/05/2026), cópia publicada por terceiro (Guia Tributário)
    source_date: '2026-05-06'
    checked_at: '2026-11-17T15:05:00Z'
    limit: 'Cópia de terceiro; o portal oficial do SPED não abriu nesta sessão (DNS e proxy). Só a tabela de registros foi lida; a extração do arquivo terminou antes do leiaute campo a campo. Existe a versão 3.2.4 (Ato COTEPE/ICMS 86, de 09/09/2026), não lida. Confira os números dos registros no Guia Prático vigente.'
  - classification: FATO
    claim: 'Notícia do Jornal Contábil de 11/09/2026 informa a publicação da versão 3.2.4 do Guia Prático da EFD ICMS/IPI, nos termos do Ato COTEPE/ICMS nº 86, de 9 de setembro de 2026, com ajustes técnicos de preenchimento, sem detalhar as mudanças.'
    reference: https://jornalcontabil.com.br/noticia/publicada-nova-versao-3-2-4-do-guia-pratico-efd-icms-ipi/
    entity: Jornal Contábil
    source_date: '2026-09-11'
    checked_at: '2026-11-17T15:06:00Z'
    limit: 'Notícia de terceiro; a versão 3.2.4 não foi lida.'
  - classification: FATO
    claim: 'A documentação do Senior X sobre o Bloco K descreve no registro K200 o indicador do tipo de estoque com os valores 0 (propriedade do informante em seu poder), 1 (propriedade do informante em posse de terceiros) e 2 (propriedade de terceiros em posse do informante) e o código do participante: vazio no estoque próprio em seu poder, o possuidor no estoque próprio em poder de terceiros e o proprietário no estoque de terceiros em poder da empresa.'
    reference: https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/contabilidade-externa/bloco-k.htm
    entity: 'Senior Sistemas, manual do Senior X, "Bloco K - Controle da Produção e do Estoque"'
    source_date: null
    checked_at: '2026-11-17T15:07:00Z'
    limit: 'Documentação de fornecedor, sem data, que reproduz o leiaute; usada porque o leiaute campo a campo do Guia Prático não foi lido. Confirmar no Guia Prático vigente.'
  - classification: FATO
    claim: 'Estudo de caso da Receita Estadual do Paraná sobre o Bloco K mostra a empresa que contratou produção terceirizada informando no K250 o produto pronto recebido do terceiro e no K255 o insumo consumido por ele, e diz que as notas de remessa e retorno são escrituradas no Bloco C.'
    reference: https://sped.fazenda.pr.gov.br/sites/sped/arquivos_restritos/files/migrados/File/EFD/Estudos_de_caso_Bloco_K_FIEP_21_09_2015.pdf
    entity: 'Receita Estadual do Paraná, "Bloco K – Estudos de caso" (apresentação, setembro de 2015)'
    source_date: '2015-09'
    checked_at: '2026-11-17T15:08:00Z'
    limit: 'Material de apresentação antigo, anterior às versões atuais do leiaute; ilustra a lógica, não substitui o Guia Prático vigente.'
  - classification: FATO
    claim: 'A documentação do Business Central diz que um centro de trabalho pode ser associado a um fornecedor (subcontratado) e usado em operações do roteiro, com custo definido no roteiro ou no centro de trabalho, por tempo ou por unidade; o aplicativo de subcontratação cria pedidos de compra a partir das ordens de produção liberadas, controla componentes (comprados pelo subcontratado, já no local dele ou transferidos do armazém), transferências para e retornos do subcontratado e linhas ainda não recebidas.'
    reference: https://learn.microsoft.com/en-ca/dynamics365/business-central/production-how-to-subcontract-manufacturing
    entity: 'Microsoft Learn, "Subcontract manufacturing" (Dynamics 365 Business Central)'
    source_date: '2026-07-08'
    checked_at: '2026-11-17T15:09:00Z'
    limit: 'Documentação de produto, aberta na variante regional en-ca. Exemplo de modelagem, não recomendação.'
  - classification: FATO
    claim: 'A ajuda do SAP descreve o pedido de subcontratação com os componentes que o fornecedor precisa; os componentes são lançados no estoque de material fornecido ao fornecedor; no recebimento do produto final, o consumo dos componentes é lançado; se o consumo real for diferente do planejado, é preciso ajustar; o fornecedor cobra pelo serviço.'
    reference: https://help.sap.com/saphelp_46c/helpdata/en/4d/2b8fed43ad11d189410000e829fbbd/content.htm
    entity: 'SAP Help Portal, subcontratação (árvore de ajuda da versão 4.6C)'
    source_date: null
    checked_at: '2026-11-17T15:09:30Z'
    limit: 'Versão muito antiga do produto, sem data visível; versão inferida pela URL. Exemplo de modelagem.'
  - classification: FATO
    claim: 'A documentação do Odoo 17 descreve a subcontratação com reabastecimento: lista de materiais do tipo subcontratação, fornecedor cujo preço é a taxa de fabricação, rota de reabastecimento aplicada aos componentes, que envia os componentes ao subcontratado quando o pedido de compra do produto é confirmado, e recebimento do produto pronto no estoque.'
    reference: https://www.odoo.com/documentation/17.0/applications/inventory_and_mrp/manufacturing/subcontracting/subcontracting_resupply.html
    entity: 'Odoo, documentação "Resupply subcontractor" (17.0)'
    source_date: null
    checked_at: '2026-11-17T15:09:45Z'
    limit: 'Página sem data; não descreve saldo separado no subcontratado nem a baixa dos componentes no recebimento (isso não prova que o produto não tenha a função). Exemplo de modelagem.'
  - classification: FATO
    claim: 'Material de treinamento da TOTVS sobre controle de poder de terceiros no Protheus descreve os dois sentidos (próprio em poder de terceiros e de terceiros em poder da empresa), o controle por notas fiscais com tipo de operação marcado como remessa ou devolução, uma tabela em que cada remessa ou devolução gera um registro, um relatório que mostra quanto falta devolver e a orientação de não alterar a configuração da operação para corrigir saldo.'
    reference: https://tdn.totvs.com.br/download/attachments/550307175/Apresenta%C3%A7%C3%A3o%20Poder%20de%20Terceiros.pdf?api=v2
    entity: 'TOTVS, apresentação "Controle de Poder de Terceiros" (outubro de 2023)'
    source_date: '2023-10'
    checked_at: '2026-11-17T15:10:00Z'
    limit: 'Material de treinamento de fornecedor; vocabulário em português, não recomendação.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo Ltda., a Zincagem Modelo Ltda., o suporte de roda SR-125 e SR-125-Z, as OPs 6201 e 6202, o pedido de serviço PS 330, as notas 4501, 4502, 812 e 845, os lotes, quantidades, preços, datas, tolerância e as regras escolhidas no exemplo (prazos, alertas, perda prevista, cobrança só de peça aceita, débito do refugo acima da tolerância pelo custo padrão, perda prevista de 1% na OP, saldo vencido fora do MRP) são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, tratamento fiscal nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark, orientação fiscal nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 17 minutos.*

**Antes de deixar o sistema controlar a remessa para industrialização, escreva e aprove sete regras: como a operação é modelada (operação externa da ordem de produção, pedido de serviço ou só nota), o que cada remessa precisa carregar, como o saldo em poder de terceiros é aberto por item, lote e remessa, o que conta como retorno (produto, material não aplicado, refugo) e quanto de perda é tolerado, como a cobrança do industrializador é conferida, que prazos geram alerta e quem decide a regra fiscal.** Depois, teste com um mês fictício em que você já sabe, peça por peça, quanto saiu, quanto voltou, quanto se perdeu e quanto ninguém explicou. Sem isso, a nota sai certa, o saldo fica numa planilha paralela, o terceiro cobra o que não entregou e a diferença aparece no inventário ou na fiscalização.

**Este artigo não é parecer fiscal nem recomenda ERP ou fornecedor.** CFOP, suspensão ou diferimento de ICMS e IPI, prazo de retorno e documentos variam conforme a norma, a UF e o caso; quem decide é o fiscal ou o contador da empresa. Aqui está o que o sistema precisa modelar e testar para cumprir a regra que ele definir. A documentação de alguns fornecedores aparece só para mostrar como os sistemas costumam modelar a operação. Empresas, peças e números do exemplo são inventados.

## Por que a remessa para industrialização escapa do sistema

Muita indústria manda parte do trabalho para fora: zincagem, pintura, tratamento térmico, usinagem de uma operação, costura, montagem de um subconjunto. No vocabulário do chão de fábrica, é **beneficiamento em terceiros** ou **industrialização por encomenda**: a empresa (o encomendante) envia o material, que continua sendo dela; o terceiro (o industrializador) processa e devolve, e cobra o serviço e, às vezes, os insumos que ele mesmo colocou.

O documento fiscal costuma sair do sistema: a nota de remessa, a de retorno e a de cobrança são emitidas ou recebidas por ele. O controle, não. A pergunta "quanto material nosso está no terceiro, de qual lote, desde quando, e quanto ele nos deve devolver" fica numa planilha do comprador ou na cabeça do almoxarife. Ela funciona enquanto essa pessoa confere cada retorno com a remessa certa, desconta a perda combinada e cobra o que faltou.

O sistema sozinho não sabe fazer isso. Se a remessa não tem vínculo com o retorno, ele não sabe qual nota de saída o retorno está fechando. Se o saldo não é aberto por lote, o rastreio para no portão. Se a perda não tem tolerância, ou o sistema aceita qualquer refugo, ou bloqueia todo retorno com uma peça a menos. Se a cobrança não é conferida com o que voltou aceito, a empresa paga peça queimada. E se o prazo não gera alerta, a remessa esquecida só aparece quando o prazo fiscal já passou.

### Legislação, documentação de fornecedor e decisão da empresa

Ajuda separar três camadas:

- **Legislação.** Define se a remessa tem suspensão ou diferimento, com que código fiscal, em que prazo o material precisa voltar e o que acontece se não voltar. Varia por tributo, por UF e pelo tipo de operação. É do fiscal ou do contador. Neste artigo, a legislação de São Paulo aparece só como exemplo de que esses parâmetros existem e mudam a configuração.
- **Documentação de fornecedores e convenção de mercado.** Operação externa no roteiro, pedido de subcontratação com componentes, estoque no fornecedor, saldo de poder de terceiros por nota: são formas de modelar que aparecem na documentação de Microsoft Business Central, SAP, Odoo e TOTVS, citada como exemplo. Nenhuma é regra.
- **Decisão da empresa.** Quanto de perda é aceitável em cada processo, quem paga o refugo, quando o comprador cobra o terceiro, se saldo vencido entra no planejamento, quem pode dar baixa sem retorno. É essa camada que precisa estar escrita antes de configurar ou programar.

## Dois lados da mesma operação

A mesma remessa tem dois controles, um em cada empresa:

- **Encomendante.** Tem estoque próprio em poder de terceiros. Precisa saber quanto está fora, onde, de que lote, de que ordem, e conferir o que volta e o que é cobrado. É o lado tratado neste artigo.
- **Industrializador.** Tem estoque de terceiros em seu poder. Precisa separar esse material do estoque próprio, não vendê-lo nem consumi-lo em outra ordem, devolver com o vínculo certo e cobrar o serviço e os próprios insumos. Se a sua empresa também presta esse serviço, as mesmas perguntas valem ao contrário.

Os dois lados aparecem na escrituração fiscal. Na documentação do Senior X sobre o Bloco K, por exemplo, o registro de estoque escriturado tem um [indicador do tipo de estoque](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/contabilidade-externa/bloco-k.htm) com três valores: próprio em seu poder, próprio em posse de terceiros e de terceiros em posse do informante, com o código do participante que tem a posse ou a propriedade. O material da TOTVS sobre o Protheus trata os mesmos [dois sentidos de "poder de terceiros"](https://tdn.totvs.com.br/download/attachments/550307175/Apresenta%C3%A7%C3%A3o%20Poder%20de%20Terceiros.pdf?api=v2). Se o sistema não guarda essa separação no movimento, ninguém a reconstrói no fechamento.

## Como os sistemas costumam modelar a operação

Há três desenhos comuns, e a escolha muda o que o teste precisa conferir:

- **Operação externa da ordem de produção.** O roteiro da peça tem uma operação feita fora, num centro de trabalho ligado ao fornecedor. No Business Central, um [centro de trabalho pode ser associado a um subcontratado](https://learn.microsoft.com/en-ca/dynamics365/business-central/production-how-to-subcontract-manufacturing) e usado nas operações do roteiro, com custo por tempo ou por unidade; o aplicativo de subcontratação cria pedidos de compra a partir das ordens liberadas e acompanha componentes, transferências para o subcontratado, retornos e linhas não recebidas. Vantagem: a ordem sabe que está parada no terceiro.
- **Pedido de serviço com componentes.** Compra-se o produto beneficiado, e o pedido diz quais componentes a empresa fornece. Na ajuda do SAP, os componentes vão para um [estoque de material fornecido ao fornecedor](https://help.sap.com/saphelp_46c/helpdata/en/4d/2b8fed43ad11d189410000e829fbbd/content.htm); no recebimento do produto final, o consumo dos componentes é lançado; se o fornecedor consumiu mais ou menos que o previsto, é preciso ajustar. No Odoo, uma lista de materiais do tipo subcontratação e uma [rota de reabastecimento](https://www.odoo.com/documentation/17.0/applications/inventory_and_mrp/manufacturing/subcontracting/subcontracting_resupply.html) enviam os componentes ao subcontratado quando o pedido é confirmado, e o preço do fornecedor é a taxa de fabricação.
- **Controle por nota fiscal.** O saldo nasce da nota de remessa e é baixado pelas notas de retorno. No material da TOTVS, [cada remessa ou devolução gera um registro](https://tdn.totvs.com.br/download/attachments/550307175/Apresenta%C3%A7%C3%A3o%20Poder%20de%20Terceiros.pdf?api=v2), um relatório mostra quanto falta devolver, e a orientação é não alterar a configuração da operação para "acertar" saldo. Vantagem: bate com o fiscal. Risco: sem ligação com a ordem, o PCP não vê o material.

Na prática, o sistema precisa das três visões: a da ordem (o PCP), a do pedido (o comprador) e a da nota (o fiscal), sobre o mesmo movimento. Escreva qual delas é a origem e como as outras duas são derivadas. Se forem três cadastros separados, eles vão discordar.

## Remessa: o que sai, de qual ordem, para quem

Cada remessa precisa carregar o suficiente para ser encontrada e fechada depois:

- **Terceiro e estabelecimento.** CNPJ e endereço de quem recebe. O retorno precisa voltar ao mesmo estabelecimento que remeteu; uma consulta da SEFAZ-SP de 2026 trata justamente de um [retorno enviado por engano a outro estabelecimento](https://legislacao.fazenda.sp.gov.br/Paginas/RC34218_2026.aspx), em outra UF, e da correção fiscal que isso exige.
- **Item, quantidade, unidade e lote.** O lote que sai precisa ser o lote que o sistema baixa do estoque próprio e passa a mostrar no terceiro (o rastreio em geral está em [estoque por lote e validade](https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/)). Se o terceiro fatura por quilo e a empresa controla por peça, a conversão é parte do cadastro.
- **Ordem de produção, operação e pedido de serviço.** De qual ordem o material saiu e qual operação o terceiro vai fazer. Sem isso, a ordem fica "em andamento" sem dizer que está do outro lado da cidade.
- **Data prevista de retorno.** A combinada com o terceiro, não a calculada pelo prazo fiscal. São duas datas diferentes, com alertas diferentes.
- **Valor.** O valor da remessa é decisão do fiscal; o sistema precisa saber de onde ele vem (custo, preço de compra, último custo) e mantê-lo igual ao que foi para a nota.
- **Classificação fiscal.** O código de operação e o tratamento do imposto que o fiscal definiu para aquele terceiro e aquele tipo de remessa. Em São Paulo, por exemplo, numa consulta sobre um caso de industrialização em cadeia (uma empresa do Simples Nacional que repassa parte do processo a outro industrializador), a SEFAZ diz que a remessa dos insumos para industrialização por encomenda [deve ser emitida com suspensão do imposto e sob o CFOP 5.901](https://legislacao.fazenda.sp.gov.br/Paginas/RC24786_2021.aspx). O sistema não escolhe o código: aplica a regra cadastrada e bloqueia a remessa sem regra.

## Saldo em poder de terceiros por item, lote e remessa

O saldo em poder de terceiros é uma conta-corrente: entra cada remessa, sai cada retorno, cada material não aplicado e cada refugo reconhecido, e o que sobra precisa estar explicado. Defina:

- **A chave do saldo.** No mínimo, terceiro, item e lote; de preferência também a remessa de origem. Um saldo só por item esconde que o lote antigo ficou parado enquanto o novo voltou.
- **De onde vem cada linha.** Nota de remessa, nota de retorno, declaração de refugo do terceiro, ajuste aprovado. Nenhuma linha sem documento ou sem aprovação.
- **Como o retorno escolhe a remessa.** Pela nota referenciada no retorno, pelo lote ou pela mais antiga? Quando o terceiro devolve 600 peças de duas remessas numa nota só, o sistema reparte como?
- **Quem pode dar baixa sem retorno.** Peça perdida no terceiro, extravio, acordo comercial: a baixa é um [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) com motivo e registro na [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), e a [permissão](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) é diferente da de lançar retorno.
- **Conferência com o terceiro.** Uma vez por mês, o terceiro informa o que tem da empresa, e o sistema compara por lote. A contagem física e o inventário anual, inclusive a separação do estoque próprio em poder de terceiros, estão em [inventário e contagem](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/); aqui interessa o movimento que forma o saldo.

## Retorno: produto, sobra, refugo e o que não voltou

O retorno raramente é "voltou tudo". Ele tem quatro partes, e o sistema precisa separá-las:

- **Produto beneficiado.** A peça processada, muitas vezes com outro código (o suporte bruto vira suporte zincado). A [estrutura de produto](https://tornostudio.com/blog/estrutura-produto-bom-sistema-aceite/) diz que o zincado consome o bruto; o retorno dá entrada no zincado e baixa o bruto do saldo em terceiros.
- **Material não aplicado.** Peças que voltam sem processar (sobra, peça com defeito de origem). Voltam ao estoque próprio do item original, no mesmo lote.
- **Refugo e perda no processo.** Peças que o terceiro estragou ou que o processo consome. Defina a **perda prevista** (que entra no planejamento), a **tolerância** (até onde o refugo é aceito sem discussão), quem paga o que passar da tolerância e o que acontece com a sucata (volta, fica com o terceiro, é vendida). O tratamento fiscal da perda é decisão do contador.
- **O que não voltou e não foi explicado.** A diferença entre o que saiu e a soma das três partes acima. Ela não pode virar zero sozinha.

Escreva isso como uma conta que o sistema confere a cada retorno: **remessa = produto beneficiado + não aplicado + refugo reconhecido + saldo em terceiros**. Quando o terceiro diz que acabou e o saldo não é zero, há uma diferença a tratar.

Duas situações comuns precisam de regra:

- **Retorno parcial.** O terceiro devolve em várias notas. O saldo da remessa fica aberto e a ordem continua parcialmente fora.
- **Reprovação na inspeção.** A qualidade reprova parte do que voltou. A peça reprovada ou volta ao terceiro para retrabalho (o saldo em terceiros sobe de novo, ligado à remessa original) ou é segregada e tratada como [não conformidade](https://tornostudio.com/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/). O documento fiscal de cada caminho é decisão do fiscal.

## Cobrança do serviço e dos insumos do industrializador

O industrializador cobra o serviço e, quando coloca material próprio (zinco, tinta, linha, embalagem), também esses insumos. Em São Paulo, por exemplo, o RICMS chama de valor acrescido [o total cobrado pelo industrializador, incluídos os serviços e as mercadorias empregadas no processo](https://legislacao.fazenda.sp.gov.br/Paginas/art402.aspx), e é sobre ele que, salvo disposição em contrário, o industrializador recolhe o imposto. Para o sistema do encomendante, isso significa que serviço e insumos do terceiro são duas linhas que precisam ser conferidas.

Defina:

- **A base da cobrança.** Por peça aceita, por peça devolvida, por quilo, por lote, por hora. "Por peça aceita" e "por peça devolvida" dão valores diferentes sempre que há refugo.
- **O preço e a vigência.** Tabela por terceiro e por item, com data de validade; preço por peça com quatro casas decimais somado em mil peças precisa de regra de [arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).
- **A conferência.** Quantidade cobrada contra quantidade recebida e aceita; preço cobrado contra tabela; e quem libera uma diferença.
- **Onde o custo vai.** O serviço e os insumos do terceiro entram no custo do produto beneficiado, na ordem de produção. Como contabilizar é decisão do contador.

## Prazo de retorno e alertas

Há pelo menos dois prazos, e eles não devem ser confundidos:

- **Prazo operacional.** O combinado com o terceiro, na remessa ou no pedido. Alerta o comprador quando vence com saldo aberto e o PCP quando a ordem atrasa por isso.
- **Prazo fiscal.** O prazo da norma para o retorno, que condiciona a suspensão ou o diferimento. Em São Paulo, o RICMS fixa [180 dias contados da data da saída](https://legislacao.fazenda.sp.gov.br/Paginas/art409.aspx), prorrogáveis a critério do fisco por igual período e, excepcionalmente, por mais 180; se o retorno não ocorre, o imposto passa a ser exigido. Outras UFs e o IPI têm regras próprias. O sistema recebe o prazo como parâmetro do fiscal, por UF e tipo de operação, e avisa com antecedência; não decide o prazo nem a prorrogação.

Para cada alerta, escreva quem recebe, com quanto de antecedência e o que acontece se ninguém agir. Como contar o prazo (dias corridos, data da saída ou da emissão, fuso) está em [datas e fusos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/); como garantir que o alerta chegue a alguém, em [monitoramento e alertas](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/).

## Vínculo com a ordem de produção e com o MRP

Para o PCP, o material no terceiro é uma ordem que não está na fábrica:

- **Ordem de produção.** A operação externa fica "no terceiro" desde a remessa até o retorno aceito; a ordem só fecha quando o saldo dela no terceiro está zerado ou explicado. A [programação da produção](https://tornostudio.com/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/) trata a sequência nas máquinas da própria fábrica; a operação externa entra nela como prazo do terceiro, não como capacidade de um recurso interno.
- **MRP.** O artigo sobre [MRP](https://tornostudio.com/blog/mrp-calculo-necessidade-materiais-sistema-aceite/) deixou o estoque em terceiros como decisão depósito por depósito. Aqui está a decisão: o material no terceiro não é estoque disponível do item bruto (já foi comprometido) nem do item beneficiado (ainda não existe). Recomendação da Torno: tratá-lo como **recebimento programado** do item beneficiado, na data prevista de retorno, descontada a perda prevista. Cada sistema modela isso de um jeito; o SAP, por exemplo, mantém um [estoque de material fornecido ao fornecedor](https://help.sap.com/saphelp_46c/helpdata/en/4d/2b8fed43ad11d189410000e829fbbd/content.htm), separado do estoque em casa; confira no seu como esse saldo entra no cálculo. E escreva o que acontece com o saldo vencido: se continua contando como recebimento ou se sai do cálculo até alguém confirmar a nova data.

## Conferência com a nota fiscal e com o Bloco K

O controle de terceiros e a escrituração fiscal olham o mesmo material. Se discordam, uma das duas está errada.

**Nota fiscal.** Cada movimento do saldo precisa apontar para o documento que o sustenta, e o código de operação de cada linha precisa ser o que o fiscal cadastrou. Como exemplo de uma UF, a resposta da SEFAZ-SP já citada, sobre o caso em cadeia, usa [5.901 na remessa, 5.902 no retorno dos insumos incorporados ao produto, 5.903 no retorno dos não utilizados e 5.124 na industrialização efetuada para outra empresa, para os serviços e as mercadorias do próprio industrializador](https://legislacao.fazenda.sp.gov.br/Paginas/RC24786_2021.aspx). Do lado de quem recebe o retorno, a tabela de CFOP publicada pela Secretaria da Fazenda de Santa Catarina descreve [1.124, 1.902 e 1.903](https://sef.sc.gov.br/api-portal/Documento/Ver/6579) para as entradas correspondentes. Os códigos de outra UF, de operação interestadual (6.xxx e 2.xxx) ou de industrialização por conta e ordem são outros. O teste de aceite não confere se o código está "certo" pela lei; confere se o sistema aplica a regra cadastrada pelo fiscal e se cada linha do retorno baixa a parte certa do saldo.

O IPI tem regra própria. Uma solução de consulta da Receita Federal sobre industrialização por encomenda trata como possível, [sob condições, a saída com suspensão do IPI](https://netcpa.com.br/colunas/solucao-de-consulta-srrf10-no-100152020-ipi-industrializacao-por-encomenda-saida-de-produtos-do-estabelecimento-industrial-executor-suspensao-possibilidade-condicoes/20484) e cita o art. 43, incisos VI e VII, do Regulamento do IPI (Decreto 7.212/2010). Se e quando isso se aplica é decisão do contador. A transição para IBS e CBS também mexe nas notas; o que pedir ao sistema emissor está em [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/), e o tratamento dessa operação no novo modelo é pergunta para o contador.

**Bloco K da EFD ICMS/IPI.** Para a empresa obrigada a ele, o Bloco K escritura produção e estoque. A tabela de registros do [Guia Prático da EFD ICMS/IPI, versão 3.2.3](https://guiatributario.net/wp-content/uploads/2026/06/guia-efd-versao323.pdf) (cópia publicada por terceiro; já existe a [versão 3.2.4](https://jornalcontabil.com.br/noticia/publicada-nova-versao-3-2-4-do-guia-pratico-efd-icms-ipi/), de setembro de 2026, não lida aqui) lista, entre outros:

- **K200, estoque escriturado**, com o indicador de estoque próprio em posse de terceiros e o código do terceiro, como no leiaute reproduzido na [documentação do Senior X](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/erp/contabilidade-externa/bloco-k.htm);
- **K250, industrialização efetuada por terceiros, itens produzidos**, e **K255, insumos consumidos**;
- **K270 e K275**, correção de apontamento, inclusive de K250 e K255, e **K280**, correção do estoque escriturado;
- **K300 a K302**, para produção conjunta industrializada por terceiros.

Num estudo de caso da Receita Estadual do Paraná, a empresa que contratou a produção terceirizada [informa no K250 o produto pronto recebido do terceiro e no K255 o insumo consumido por ele](https://sped.fazenda.pr.gov.br/sites/sped/arquivos_restritos/files/migrados/File/EFD/Estudos_de_caso_Bloco_K_FIEP_21_09_2015.pdf), e as notas de remessa e retorno ficam no Bloco C. Confira os números e o leiaute dos registros no Guia Prático vigente.

Se a empresa está obrigada ao Bloco K, em que nível, e o que entra em cada registro (por exemplo, se o refugo do terceiro entra como consumo) é do contador. O que o sistema precisa garantir é que **cada número que o contador vai pedir exista separado**: saldo no terceiro por item e terceiro no fim do período, produto recebido do terceiro no período, insumo consumido por ele, não aplicado, refugo, e o histórico que permita corrigir um período já fechado quando um refugo é declarado depois.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Como a operação é modelada (ordem, pedido de serviço, nota) e qual visão é a origem | PCP, suprimentos e fiscal, com TI |
| Código fiscal, suspensão ou diferimento, valor da remessa e documentos de cada movimento | Fiscal ou contador |
| Prazo fiscal de retorno por UF e tipo de operação, e pedido de prorrogação | Fiscal ou contador |
| Prazo operacional, alertas e quem os recebe | Suprimentos e PCP |
| Chave do saldo (terceiro, item, lote, remessa) e regra de repartição do retorno | Suprimentos, almoxarifado e fiscal |
| Perda prevista, tolerância de refugo, quem paga o excesso e destino da sucata | Engenharia de processos, qualidade e suprimentos, com o terceiro |
| Base e preço da cobrança, conferência e alçada para liberar diferença | Suprimentos e financeiro |
| Baixa de saldo sem retorno | Suprimentos, com aprovação do controle e ciência do fiscal |
| Como o saldo no terceiro entra no MRP e o que fazer com saldo vencido | PCP |
| O que entra em cada registro do Bloco K | Contador |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo Ltda., a mesma dos artigos sobre estrutura de produto, MRP e programação, também fabrica o suporte de roda SR-125, que sai da dobradeira bruto e vai para zincagem num terceiro, a Zincagem Modelo Ltda., na mesma cidade. As duas empresas estão em São Paulo. O suporte bruto tem o código SR-125; o zincado, SR-125-Z, com estrutura de 1 SR-125 para 1 SR-125-Z.

Regras da empresa:

- **Modelagem.** Operação 20 da ordem de produção, "zincagem externa", ligada ao pedido de serviço PS 330. A nota de remessa é emitida a partir da ordem e cria a linha do saldo.
- **Saldo.** Por terceiro, item, lote e remessa. O retorno baixa a remessa referenciada na nota do terceiro.
- **Perda prevista e tolerância.** Perda prevista de 1% no planejamento; refugo do terceiro aceito até 1% de cada remessa; pelo contrato, o que passar é debitado ao terceiro pelo custo padrão do SR-125 bruto, R$ 4,20 por peça. A OP 6201 envia 1.000 SR-125 e planeja receber 990 SR-125-Z.
- **Cobrança.** R$ 0,35 de serviço e R$ 0,15 de insumos do terceiro (zinco e químicos) por peça **aceita**: R$ 0,50 por peça. Peça refugada não é paga.
- **Prazos.** Prazo operacional: data prevista de retorno informada em cada remessa; alerta ao comprador no dia seguinte ao vencimento com saldo aberto. Prazo fiscal: cadastrado pelo fiscal para São Paulo como data da saída mais 180 dias corridos, com alerta ao fiscal 30 dias antes.
- **MRP.** Saldo em terceiros entra como recebimento programado do SR-125-Z na data prevista, descontada a perda prevista. Saldo vencido sai do cálculo até o comprador confirmar nova data.
- **Classificação fiscal.** Cadastrada pelo fiscal da empresa para esse terceiro; o exemplo não discute os códigos.

Os movimentos até terça-feira, 17/11/2026:

| Data | Documento | Movimento | Lote | Quantidade |
|---|---|---|---|---|
| 03/11 | NF 4501 (OP 6201), previsto 13/11 | Remessa de SR-125 | L2611-03 | 1.000 |
| 05/11 | NF 4502 (OP 6202), previsto 19/11 | Remessa de SR-125 | L2611-07 | 500 |
| 10/11 | NF 812 do terceiro | Retorno de SR-125-Z | L2611-03 | 600 |
| 17/11 | NF 845 do terceiro | Retorno de SR-125-Z | L2611-03 | 360 |
| 17/11 | NF 845 do terceiro | Retorno de SR-125 não aplicado (trinca de dobra, vista antes do banho) | L2611-03 | 15 |
| 17/11 | Declaração do terceiro | Refugo no processo (queima no banho) | L2611-03 | 12 |

Na NF 845, a Zincagem Modelo informa que a remessa NF 4501 está encerrada.

**O saldo não fecha.** No lote L2611-03, saíram 1.000 e estão explicados 600 + 360 + 15 + 12 = 987. Faltam **13 suportes** que o terceiro dá por encerrados e ninguém explicou. No lote L2611-07, os 500 estão no terceiro, dentro do prazo. O saldo total em poder de terceiros é 1.500 − 600 − 360 − 15 − 12 = **513**.

![Ilustração de um extrato de conta-corrente do saldo em poder de terceiros do suporte de roda SR-125 bruto, da empresa fictícia Indústria Exemplo Ltda., na Zincagem Modelo Ltda., até 17/11/2026, com colunas de movimento e saldo. 03/11, remessa NF 4501, lote L2611-03, OP 6201: mais 1.000, saldo 1.000. 05/11, remessa NF 4502, lote L2611-07, OP 6202: mais 500, saldo 1.500. 10/11, retorno NF 812, 600 zincados do lote L2611-03: menos 600, saldo 900. 17/11, retorno NF 845, 360 zincados: menos 360, saldo 540. 17/11, NF 845, 15 não aplicados, voltam brutos: menos 15, saldo 525. 17/11, refugo declarado pelo terceiro, 12 peças, tolerância de 10: menos 12, saldo 513. Embaixo, o saldo por lote: L2611-03, 13 peças, previsto para 13/11, vencido, com um carimbo vermelho que diz sem explicação, o terceiro deu por encerrado; L2611-07, 500 peças, previsto para 19/11, no prazo. Exemplo fictício.](./torno-industrializacao-extrato-terceiros.svg)

*Exemplo fictício: empresas, peças, notas, lotes e datas inventados; o saldo em poder de terceiros lido como extrato, linha por linha, até sobrar o que ninguém explicou. Ilustração original Torno, 2026.*

**O refugo passa da tolerância.** A tolerância da remessa NF 4501 é 1% de 1.000 = 10 peças. O terceiro declarou 12: **2 acima**. Pela regra do contrato, os 2 são debitados ao terceiro pelo custo padrão do SR-125 bruto: 2 × R$ 4,20 = **R$ 8,40**; os 10 são perda aceita.

**A cobrança diverge.** A NF 812 cobra 600 × R$ 0,50 = R$ 300,00, que bate com os 600 aceitos. A NF 845 cobra 372 peças (os 360 zincados mais os 12 refugados) × R$ 0,50 = R$ 186,00; pela regra, o devido é 360 × R$ 0,50 = **R$ 180,00**. A diferença, **R$ 6,00**, é o preço dos 12 refugados (12 × R$ 0,50). No total da remessa, o devido é 960 × R$ 0,50 = R$ 480,00, sendo R$ 336,00 de serviço (960 × R$ 0,35) e R$ 144,00 de insumos do terceiro (960 × R$ 0,15).

![Ilustração de um mapa com duas plantas ligadas por uma estrada de ida e volta, da empresa fictícia Indústria Exemplo Ltda. à Zincagem Modelo Ltda. Na ida, um caminhão leva 1.000 suportes SR-125 brutos, lote L2611-03, NF 4501, em 03/11/2026. Na volta, a estrada traz 600 zincados pela NF 812, em 10/11, e 360 zincados mais 15 brutos não aplicados pela NF 845, em 17/11. Na planta do terceiro, uma caçamba de sucata com 12 peças refugadas e a nota: tolerância de 10, 2 acima. Embaixo, uma balança de pratos nivelada: no prato da esquerda, saiu 1.000; no da direita, 960 zincados, 15 não aplicados, 12 de refugo e um peso marcado com interrogação, 13 sem explicação; a balança só fica nivelada com esse peso. Ao lado, um bilhete da cobrança: NF 845 cobra 372 vezes R$ 0,50, igual a R$ 186,00; devido 360 vezes R$ 0,50, igual a R$ 180,00; diferença de R$ 6,00. Exemplo fictício.](./torno-industrializacao-rota-balanca.svg)

*Exemplo fictício: empresas, notas, quantidades e preços inventados; a remessa só fecha quando o que voltou, o que não foi aplicado, o refugo e a diferença somam o que saiu. Ilustração original Torno, 2026.*

**A ordem não fecha.** A OP 6201 enviou 1.000 SR-125 e planejou receber 990 SR-125-Z, com a perda prevista de 1%; recebeu 960, 30 a menos que o planejado. Os 15 brutos com trinca voltam ao estoque próprio do SR-125, lote L2611-03, e vão para a qualidade decidir o destino. A ordem fica com status "aguardando terceiro" enquanto houver os 13 sem explicação; o comprador cobra o terceiro, e a baixa, se houver, passa pela aprovação do controle.

**O MRP da rodada de 17/11** enxerga, para o SR-125-Z, um recebimento programado de 500 × (1 − 1%) = **495** em 19/11, da NF 4502. Os 13 que restam do lote L2611-03, da NF 4501, vencida desde 13/11, não entram até o comprador confirmar nova data.

**Os prazos.** A NF 4501 venceu o prazo operacional em 13/11 com 400 peças ainda no terceiro (a NF 845 só chegou em 17/11); o alerta ao comprador saiu em 14/11. O prazo fiscal cadastrado vence em 02/05/2027 (03/11/2026 + 180 dias corridos), com alerta ao fiscal em 02/04/2027. A NF 4502 tem prazo operacional em 19/11 e prazo fiscal em 04/05/2027.

**No fim do mês.** Se nada mais se mover até 30/11, o sistema precisa mostrar ao contador, para o SR-125 na Zincagem Modelo, 513 peças como estoque próprio em poder de terceiros; no período, 960 SR-125-Z recebidos do terceiro e 960 SR-125 consumidos por ele, com os 12 de refugo e os 15 não aplicados separados. O que vai para cada registro é decisão dele.

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com terceiros, itens, lotes e notas fictícios, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Remessa NF 4501 emitida a partir da OP 6201 | Estoque próprio do SR-125, lote L2611-03, cai 1.000; saldo na Zincagem Modelo sobe 1.000, com remessa, lote, OP e data prevista 13/11 | Extrato do saldo em terceiros e posição de estoque |
| Remessa para um terceiro sem regra fiscal cadastrada | Bloqueada antes da emissão, com aviso ao fiscal | Tentativa recusada |
| Retorno NF 812 com 600 SR-125-Z | Entrada de 600 SR-125-Z; baixa de 600 SR-125 do saldo da NF 4501; saldo total 900 (400 na NF 4501) | Extrato e entrada do item |
| Retorno NF 845 com 360 zincados e 15 não aplicados | Saldo da NF 4501 cai 375, de 400 para 25; os 15 voltam ao estoque próprio do SR-125, lote L2611-03 | Extrato e posição de estoque |
| Refugo de 12 declarado pelo terceiro | Saldo da NF 4501 cai 12, de 25 para 13; o sistema mostra 2 acima da tolerância de 10 e abre débito ao terceiro de 2 × R$ 4,20 = R$ 8,40 | Extrato e pendência de cobrança |
| Terceiro dá a NF 4501 por encerrada | O sistema mostra 13 peças sem explicação no lote L2611-03 e não zera o saldo | Relatório de saldo por lote |
| Baixa manual dos 13 por usuário sem permissão | Bloqueada; com permissão, só com motivo e aprovação do controle, registrada | Tentativa recusada e trilha |
| Cobrança da NF 845 com 372 peças | Divergência de R$ 6,00 (12 refugados); pagamento retido até a liberação | Conferência da nota e alçada |
| Cobrança total da remessa NF 4501 | R$ 480,00: R$ 336,00 de serviço e R$ 144,00 de insumos do terceiro | Custo da OP 6201 |
| 14/11, dia seguinte ao previsto, com saldo de 400 na NF 4501 (o retorno NF 845 só chega em 17/11) | Alerta ao comprador sobre a NF 4501, com 400 peças em aberto | Registro do alerta |
| Prazo fiscal da NF 4501 | 02/05/2027 na regra cadastrada; alerta ao fiscal em 02/04/2027 | Painel de prazos |
| Rodada do MRP em 17/11 | Recebimento programado de 495 SR-125-Z em 19/11; os 13 vencidos fora do cálculo | Registro de MRP do SR-125-Z |
| Status da OP 6201 | "Aguardando terceiro", com 990 planejados, 960 recebidos, 15 não aplicados, 12 de refugo e 13 sem explicação | Tela da ordem |
| Retorno que referencia uma remessa de outro terceiro | Recusado; nenhum saldo é baixado | Tentativa recusada |
| 8 zincados reprovados na inspeção e devolvidos para retrabalho (cenário à parte) | Saldo de SR-125-Z em terceiros sobe 8, ligado à NF 4501, com a reprovação registrada | Extrato e registro da não conformidade |
| Saldo em terceiros em 30/11, sem outros movimentos | 513 SR-125 na Zincagem Modelo: 13 do lote L2611-03 e 500 do L2611-07 | Relatório para o contador |
| Refugo de novembro declarado só em dezembro | O sistema mantém o histórico de novembro e mostra a correção como movimento de dezembro ligado ao período anterior | Extrato e relatório de correções |

*Fim do exemplo fictício. Empresas, peças, ordens, notas, lotes, quantidades, preços, tolerância, prazos e regras são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma, orientação fiscal nem comportamento padrão de ferramenta.*

Antes do go-live, reconcilie com cada terceiro, lote a lote, o saldo da planilha atual e o saldo que o sistema calcula a partir das notas, e explique cada diferença. Se a dúvida ainda é se vale sair da planilha, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### O sistema pode escolher o CFOP da remessa e do retorno sozinho?

Pode aplicar uma regra, não decidir a regra. O fiscal cadastra, por tipo de operação, terceiro e UF, o código e o tratamento do imposto; o sistema aplica e bloqueia quando falta regra. O teste de aceite confere a aplicação, não a interpretação da lei.

### Por que controlar o saldo por lote se o terceiro devolve tudo junto?

Porque o lote é o que liga a peça zincada à chapa e à dobra de origem, e porque a diferença aparece por lote. No exemplo, o saldo total de 513 parece normal; aberto por lote, mostra 13 peças de uma remessa que o terceiro já deu por encerrada.

### A perda no terceiro é problema do sistema ou do contrato?

Dos dois. O contrato define a tolerância e quem paga o excesso; o sistema precisa ter a perda prevista no planejamento, conferir o refugo declarado contra a tolerância e não pagar peça que o contrato diz que não é paga. O tratamento fiscal e contábil da perda é do contador.

Para transformar o controle de terceiros em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a planilha de controle de um terceiro, a última nota de remessa e a de retorno correspondente, e a última vez que o saldo não bateu, sem dados confidenciais de clientes.

*Fontes consultadas em 17 de novembro de 2026: Secretaria da Fazenda e Planejamento de São Paulo, RICMS/SP, arts. 402 e 409, e Respostas às Consultas 24786/2021 e 34218/2026; Secretaria de Estado da Fazenda de Santa Catarina, tabelas de CFOP; Receita Federal, Solução de Consulta SRRF10 nº 10.015/2020, reproduzida pela NetCPA; Guia Prático da EFD ICMS/IPI, versão 3.2.3, em cópia publicada por terceiro, e notícia do Jornal Contábil sobre a versão 3.2.4; Receita Estadual do Paraná, estudos de caso do Bloco K (2015); Senior Sistemas, manual do Senior X, Bloco K; Microsoft Learn, subcontratação (Dynamics 365 Business Central); SAP Help Portal, subcontratação (4.6C); Odoo, subcontratação com reabastecimento (17.0); TOTVS, controle de poder de terceiros (2023). Este artigo não é parecer fiscal nem contábil e não recomenda sistema nem fornecedor; empresas, notas, números e ilustrações são fictícios.*
