---
content_id: torno-artigo-pt-20261123-boleto-registro-remessa-retorno
intent_id: buyer-boleto-issuance-cnab-remittance-return-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Boleto pelo sistema: o que definir e testar na remessa e no arquivo de retorno CNAB antes de aceitar'
h1: 'Boleto pelo sistema: o que definir e testar na remessa e no arquivo de retorno CNAB antes de aceitar'
seo_title: 'Arquivo de retorno CNAB e boleto no sistema: aceite | Torno'
seo_description: 'Emissão de boleto pelo sistema: registro e nosso número, remessa e retorno CNAB ou API, rejeições, instruções, Pix no boleto, baixa e critérios de aceite.'
summary: 'Roteiro para a empresa que vai contratar, especificar ou aceitar a emissão de boletos num sistema sob medida, num ERP ou num módulo financeiro integrado ao banco, por arquivo CNAB de remessa e retorno ou por API de cobrança: o que o boleto precisa conter pela regra do Banco Central; quando o título está de fato registrado e o boleto pode ir para o cliente; quem gera o nosso número e como o dígito é conferido; o que fazer com a entrada rejeitada; instruções de juros, multa, desconto, protesto e baixa por decurso; alteração de vencimento e de valor e abatimento; segunda via sem criar título novo; boleto com QR Code Pix; pagamento a menor, a maior e em duplicidade, inclusive liquidação depois da baixa; pedido de baixa e cancelamento; como tratar cada ocorrência do arquivo de retorno e o arquivo importado duas vezes; conta, carteira e convênio; quem decide cada regra; trilha; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que uma empresa precisa definir e testar antes de aceitar a emissão de boletos pelo sistema e a integração com o banco (remessa e retorno CNAB ou API de cobrança), para que o título só vá ao cliente depois de registrado, cada ocorrência do retorno mude o título do jeito certo e nenhum pagamento seja baixado duas vezes ou perdido?
proposed_path: /blog/boleto-sistema-remessa-retorno-cnab-aceite/
canonical_url: https://tornostudio.com/blog/boleto-sistema-remessa-retorno-cnab-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores e gerentes financeiros, responsáveis por contas a receber e cobrança, controladoria, comercial e TI de indústrias, distribuidoras e empresas de serviços, pequenas e médias, que vão contratar, especificar, ajustar ou aceitar a emissão de boletos num sistema sob medida, num ERP ou num módulo financeiro, com remessa e retorno por arquivo CNAB ou por API de cobrança do banco, e quem vai implementá-la.
buyer_stage: Especificação e aceite, antes de trocar a emissão de boletos no internet banking, a planilha de títulos e a baixa manual pelo extrato por emissão no sistema, com registro, instruções e baixa automáticos a partir do retorno do banco.
scope: Conteúdo mínimo do boleto pela Resolução BCB nº 443/2024; registro do título na base centralizada e momento em que o boleto pode ser entregue ao pagador; arquivo CNAB 240 e 400 e API de cobrança como formas de integração; nosso número, seu número, faixa, dígito verificador e não reutilização; entrada confirmada e entrada rejeitada com motivo; número sequencial de remessa e controle de reenvio; instruções de juros, multa, desconto, protesto e baixa/devolução por decurso; alteração de vencimento, alteração de valor e abatimento; segunda via sem novo título; boleto com QR Code Pix (txid); pagamento divergente (aceita qualquer valor, entre mínimo e máximo, não aceita) e parcial; pagamento a menor, a maior e em duplicidade, liquidação após baixa; pedido de baixa e cancelamento; tabela de ocorrências do retorno e ação do sistema em cada uma; arquivo de retorno importado duas vezes, fora de ordem ou que não chegou; tarifas no retorno; conta, carteira e convênio; quem decide cada regra; trilha; critérios de aceite com dados fictícios.
not_scope: Recomendação, comparação ou contratação de banco, cooperativa, emissor, plataforma de cobrança, registradora ou fornecedor de software (manuais de bancos aparecem só como exemplo de modelagem); orientação jurídica, contábil ou fiscal individual, inclusive limites legais de multa e juros, protesto e negativação; tutorial completo de leiaute CNAB 240 ou 400 ou de API de banco; conciliação do extrato e do retorno com os títulos (coberta em outro artigo); régua de cobrança, lembretes e cálculo de encargos para o cliente (coberta em outro artigo); Pix Automático, Pix Cobrança sem boleto e gateway de pagamento (cobertos em outros artigos); boleto dinâmico ligado a ativo financeiro, boleto de proposta e boleto de depósito; DDA do lado do pagador; antecipação, desconto de duplicatas e cessão de recebíveis; prevenção de fraude e boleto falso.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-23T21:15:00Z'
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
  - path: https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/
    reason: Trata o casamento do extrato e do retorno com os títulos já emitidos, tolerâncias e fila de exceções; aqui a emissão, o registro e o que cada ocorrência do retorno faz com o título.
  - path: https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/
    reason: Trata os lembretes, os encargos mostrados ao cliente, protesto e negativação como decisão humana; aqui as instruções que vão ao banco junto com o título.
  - path: https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/
    reason: Trata a cobrança recorrente por Pix Automático, que exclui boleto; aqui o QR Code Pix impresso no próprio boleto.
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata o estado do pedido com pagamento por gateway; aqui o título de contas a receber cobrado por boleto registrado no banco.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata arredondamento e truncamento de valores; aqui juros por dia, multa e desconto que o sistema e o banco precisam calcular igual.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o mesmo evento recebido duas vezes; aqui o arquivo de retorno importado de novo e a liquidação repetida.
  - path: https://tornostudio.com/blog/integracao-eventos-fora-ordem/
    reason: Trata eventos que chegam fora de ordem; aqui a liquidação que chega depois da baixa.
  - path: https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/
    reason: Trata ações em lote com falha parcial; aqui a remessa em que parte dos títulos é rejeitada.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Trata alertas do fluxo crítico; aqui o retorno que não chegou e a remessa sem resposta.
  - path: https://tornostudio.com/blog/limites-api-integracao-cota/
    reason: Trata cota e espera de API; aqui o registro por API de cobrança quando o banco limita chamadas.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas, dias úteis e prazos; aqui vencimento, data limite e contagem de dias de juros e de baixa.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata documentos gerados por modelo com dados congelados; aqui o PDF do boleto e a segunda via.
  - path: https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
    reason: Trata cadastro duplicado de clientes; aqui nome, CPF ou CNPJ e endereço do pagador que o banco rejeita.
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Trata o CNPJ com letras; aqui o campo do pagador e do beneficiário no arquivo e na API.
  - path: https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/
    reason: Trata a devolução de mercadoria; aqui o abatimento do título que já está no banco.
  - path: https://tornostudio.com/blog/cancelamento-solicitacao-sistema/
    reason: Trata a diferença entre pedir o cancelamento e o que já aconteceu; aqui o pedido de baixa que o banco ainda não confirmou.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode prorrogar, abater, pedir baixa e pedir protesto.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a remessa, o retorno e cada instrução precisam guardar.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste; aqui a homologação com o banco e os arquivos de teste.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/integracao-erp-briefing-orcamento/
    reason: Ajuda a reunir o que é preciso antes de pedir orçamento de integração; aqui quando a emissão de boletos é um módulo ligado ao ERP atual.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a emissão de boletos e o retorno do banco em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A Resolução BCB nº 443, de 12/12/2024, disciplina o arranjo de pagamento do boleto; diz que o boleto deve conter, no mínimo, nome e CPF ou CNPJ do pagador, identificação da instituição emissora e do terceiro habilitador quando houver, nome, endereço e CPF ou CNPJ do beneficiário, valor e data de vencimento, e as condições de desconto previstas na obrigação em caso de pagamento antecipado (art. 7º); que a apresentação eletrônica depende da concordância do pagador e que o boleto pode ser apresentado de forma a possibilitar o pagamento por outro arranjo autorizado ou operado pelo Banco Central, nos termos da convenção (art. 6º); define a base centralizada como repositório de informações dos boletos para registro e consulta (art. 3º); revoga as Circulares nº 3.598/2012, 3.656/2013 e 3.956/2019 (art. 25); e entra em vigor em 3 de fevereiro de 2025 (art. 26).'
    reference: https://www.normasbrasil.com.br/norma/resolucao-443-2024_470421.html
    entity: 'Banco Central do Brasil, Resolução BCB nº 443, de 12/12/2024, texto reproduzido pelos portais Normas Brasil e LegisWeb (https://www.legisweb.com.br/legislacao/?id=470421), com as alterações das Resoluções BCB nº 467/2025 e 515/2025'
    source_date: '2024-12-12'
    checked_at: '2026-11-23T21:12:00Z'
    limit: 'Lida em dois portais que reproduzem a norma; o portal do Banco Central foi recusado pelo proxy nesta sessão e o texto oficial não foi aberto. A resolução não traz regra sobre pagamento divergente, pagamento depois do vencimento em qualquer instituição nem QR Code; esses pontos vêm da convenção do mercado e dos manuais citados abaixo.'
  - classification: FATO
    claim: 'A cartilha "Nova Plataforma da Cobrança" da FEBRABAN (março de 2017) diz que boletos registrados podem ser pagos depois do vencimento em qualquer banco e por qualquer canal; que juros, multa e encargos passam a ser calculados automaticamente pelo banco recebedor, a partir das condições informadas pelo beneficiário; que o pagamento de valor diferente do boleto depende de o beneficiário combinar com o seu banco as condições (por exemplo, valor mínimo e máximo); e que "o sistema não irá aceitar pagamento em duplicidade".'
    reference: https://br.ccb.com/media/files/fc9c4e51fc8e1b11ee917e005056ae3d97/f01b09202cc5b11efb54c005056ae083a/nova-plataforma-da-cobranca.pdf
    entity: 'FEBRABAN, cartilha "Nova Plataforma da Cobrança", março de 2017, arquivo publicado no site do China Construction Bank (Brasil)'
    source_date: '2017-03-01'
    checked_at: '2026-11-23T21:10:40Z'
    limit: 'Material de divulgação de 2017, da fase de implantação da plataforma, lido numa cópia publicada por um banco; as citações da Circular nº 3.461/2009 no material são anteriores às normas atuais. Usado só para a regra geral; detalhes operacionais vigentes ficam com o banco.'
  - classification: FATO
    claim: 'O Manual de Operações da Base Centralizada de Cobrança da Núclea (MAPX-OP084-2019, versão 12.0, com validade indicada de 29/11/2023 a 29/11/2025) diz que o registro na base pela instituição destinatária deve ocorrer antes da disponibilização do boleto ao pagador; que o recebimento pela instituição recebedora se dará apenas mediante a localização do boleto na base centralizada; que há modalidades de pagamento divergente (qualquer valor, entre mínimo e máximo, somente mínimo), com até 99 pagamentos parciais; que, após a data limite de pagamento, o boleto fica disponível por 7 dias e é baixado por decurso após esse prazo; e que valores calculados devem ser truncados na segunda casa decimal.'
    reference: https://tdn.totvs.com/download/attachments/804035701/MAPX-OP084-2019%20-%20Manual%20de%20Opera%C3%A7%C3%B5es%20Base%20Centralizada%20de%20Cobran%C3%A7a%20V12%20%281%29.pdf?api=v2
    entity: 'Núclea, Manual de Operações da Base Centralizada de Cobrança, MAPX-OP084-2019, versão 12.0, arquivo publicado no portal de documentação da TOTVS (TDN)'
    source_date: '2023-11-29'
    checked_at: '2026-11-23T21:11:00Z'
    limit: 'Documento da operadora da base, lido numa cópia publicada por um fornecedor de software; a validade indicada terminou em 29/11/2025 e pode haver versão mais nova. As seções de contingência e as fórmulas de cálculo não foram lidas. Manual dirigido às instituições, não às empresas beneficiárias: o que chega à empresa é o que o banco oferece.'
  - classification: FATO
    claim: 'O manual de cobrança CNAB 240 do Santander (Layout Cobrança H7815, versão 8.3, abril de 2025) lista na remessa os segmentos P (dados do boleto, juros, desconto, protesto e baixa), Q (pagador), R (descontos 2 e 3 e multa), S (mensagens), Y03 (QR Code Pix, com chave e txid único por boleto) e Y53 (tipo de pagamento: 01 aceita qualquer valor, 02 entre mínimo e máximo, 03 não aceita valor divergente); os códigos de movimento de remessa 01 entrada, 02 pedido de baixa, 04 concessão de abatimento, 06 alteração de vencimento, 09 pedido de protesto, 10 concessão de desconto, 18 sustação de protesto, 31 alteração de outros dados e 47 alteração de valor nominal; os códigos de retorno 02 entrada confirmada, 03 entrada rejeitada, 06 liquidação, 09 baixa, 17 liquidação após baixa ou de boleto não registrado, 26 instrução rejeitada e 28 débito de tarifas/custas, com motivos de rejeição como nosso número inválido ou duplicado, data de vencimento inválida, valor inválido e txid em duplicidade; juros por valor diário, taxa mensal ou isento; multa por valor ou percentual com data; protesto e baixa/devolução com número de dias; o cálculo do dígito do nosso número por módulo 11 com pesos 2 a 9 (exemplo 3147578 → 31475787); motivos de baixa que separam a baixa comandada (09) do decurso de prazo (12 e 13); e que a liquidação de Pix vinculado ao boleto volta, por padrão, como movimento 09 (baixa) com ocorrência 09 (baixa comandada), ou, se parametrizado no convênio, como 09 com ocorrência 92 (baixa por pagamento Pix) ou 06 com ocorrência 61 (liquidado por pagamento via Pix).'
    reference: https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf
    entity: 'Banco Santander (Brasil), Layout Cobrança H7815, CNAB 240, versão 8.3, abril de 2025'
    source_date: '2025-04-01'
    checked_at: '2026-11-23T21:09:00Z'
    limit: 'Documentação de um banco; códigos, posições e regras mudam entre bancos e versões. Citado como exemplo de modelagem, não como recomendação. O manual também usa o código 09 em mais de uma tabela, o que pede atenção na leitura; o pagamento por Pix sem parametrização chega como baixa, não como liquidação.'
  - classification: FATO
    claim: 'O leiaute de cobrança do Banrisul no padrão FEBRABAN CNAB 240, versão 10.3 (atualizado em 10/03/2021), descreve o arquivo com header de arquivo, lotes (header de lote, detalhes e trailer de lote) e trailer de arquivo; na cobrança, os segmentos P e Q são obrigatórios na remessa, R, S e Y são opcionais, e o retorno usa os segmentos T e U.'
    reference: https://www.banrisul.com.br/bob/data/LeiauteBanrisulFebraban_pdr240_v103_10032021.pdf?cache=0
    entity: 'Banco do Estado do Rio Grande do Sul (Banrisul), "Cobrança Banrisul — Leiaute Padrão Febraban CNAB 240 Posições Versão 10.3", 10/03/2021'
    source_date: '2021-03-10'
    checked_at: '2026-11-23T21:11:30Z'
    limit: 'Documentação de um banco sobre o padrão FEBRABAN; o documento da FEBRABAN em si não foi aberto nesta sessão. Citado como exemplo de modelagem.'
  - classification: FATO
    claim: 'O leiaute de cobrança CNAB 400 do Itaú (janeiro de 2017) traz tabelas de erros para entrada rejeitada, alteração rejeitada, instrução rejeitada e baixa rejeitada, com até quatro códigos por registro; nas carteiras escriturais o nosso número é enviado zerado e o banco devolve o número atribuído; nas carteiras diretas a empresa escolhe o número, que não pode ser reutilizado enquanto registrado nem antes de 45 dias da baixa ou liquidação.'
    reference: https://download.itau.com.br/bankline/layout_cobranca_400bytes_cnab_itau.pdf
    entity: 'Itaú Unibanco, "Cobrança — CNAB 400 bytes", janeiro de 2017'
    source_date: '2017-01-01'
    checked_at: '2026-11-23T21:09:30Z'
    limit: 'Documentação de um banco, de 2017; pode haver versão mais nova. Citado como exemplo de modelagem.'
  - classification: FATO
    claim: 'As orientações técnicas da Cobrança Integrada do Banco do Brasil para o arquivo de remessa CNAB 400 (março de 2018) dizem que, nas carteiras com numeração pela empresa, o nosso número é formado pelo convênio e por um sequencial que não pode ser repetido; que o indicador de recebimento parcial permite que o boleto seja recebido mais de uma vez, em diversos valores, e não vale para boleto vencido; que arquivos com data de gravação futura são rejeitados; e que o sistema do banco não controla o número sequencial da remessa, aceitando saltos e repetição de números já processados.'
    reference: https://www.bb.com.br/docs/portal/pub/Doc2627CBR641Pos7.pdf
    entity: 'Banco do Brasil, "Cobrança Integrada BB — Orientações Técnicas", leiaute CNAB 400 para convênios acima de 1.000.000, março de 2018'
    source_date: '2018-03-01'
    checked_at: '2026-11-23T21:10:00Z'
    limit: 'Documentação de um banco, de 2018, só da remessa; pode haver versão mais nova. Citado como exemplo de modelagem.'
  - classification: FATO
    claim: 'A página de cobrança para empresas do Itaú diz que a empresa pode enviar as cobranças a partir do sistema próprio via arquivo para registro, optar pelo "registro em até 15 minutos ou via registro online (API)", com a aprovação da API sujeita a análise, e oferece boleto com código de barras e QR Code Pix no mesmo documento.'
    reference: https://www.itau.com.br/empresas/pagamentos-recebimentos/cobranca
    entity: 'Itaú Unibanco, página "Cobrança" para empresas'
    source_date: null
    checked_at: '2026-11-23T21:10:20Z'
    limit: 'Página comercial de um banco, sem data; citada só para mostrar que arquivo e API convivem. Não é recomendação.'
  - classification: HIPÓTESE
    claim: 'A Indústria Exemplo de Embalagens Ltda., o Banco Exemplo, o convênio, a carteira, os clientes Alfa, Beta, Gama, Delta, Épsilon e Zeta, os títulos T-8801 a T-8806, os nossos números, as remessas e retornos, os códigos de ocorrência (escolhidos parecidos com os de manuais públicos), as instruções, os valores, as tarifas, as datas e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, orientação jurídica ou contábil nem comportamento padrão de banco ou ferramenta.'
    reference: Modelo editorial deste artigo; contas e dias da semana refeitos em Python (Decimal e datetime) em 23/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, banco, convênio, título ou sistema real, nem taxas de juros, multas, tarifas ou prazos recomendados.
---

*Leitura estimada: 25 minutos.*

**Antes de aceitar a emissão de boletos pelo sistema, escreva e aprove dez regras: o que o boleto carrega e de onde vem cada dado; quando o título está registrado e o boleto pode ir para o cliente; quem gera o nosso número e como ele nunca se repete; o que acontece com a entrada rejeitada; quais instruções de juros, multa, desconto, protesto e baixa vão para o banco; como se altera vencimento e valor de um título já registrado; o que é uma segunda via; se o boleto leva QR Code Pix; o que o banco aceita como pagamento diferente do valor; e o que o sistema faz com cada ocorrência do arquivo de retorno CNAB (ou de cada aviso da API).** Depois, teste com uma carteira fictícia cujas contas você já fechou à mão: valores de cada título, encargos de quem pagou atrasado, abatimentos, tarifas e o que fica em aberto. Sem isso, o sistema manda ao cliente um boleto que o banco rejeitou, baixa como pago o título que o banco só baixou por prazo e não percebe que o mesmo cliente pagou duas vezes.

**Este artigo não recomenda banco, cooperativa, plataforma de cobrança nem fornecedor, e não é orientação jurídica, contábil ou fiscal.** Manuais de bancos (Santander, Itaú, Banco do Brasil e Banrisul) aparecem só como exemplo de como os leiautes costumam modelar o boleto; códigos e posições mudam de banco para banco e de versão para versão. Quanto de multa e juros cobrar, quando protestar e como contabilizar são decisões com o advogado e o contador. Empresas, títulos e números do exemplo são inventados.

## O que a emissão no internet banking faz e o sistema precisa fazer melhor

Em muitas empresas, o boleto nasce assim: alguém abre o internet banking, digita cliente, valor e vencimento, baixa o PDF e manda por e-mail. Quando o cliente paga, o financeiro olha o extrato e marca o título como pago na planilha ou no ERP.

Isso deixa de funcionar quando são centenas de boletos por mês e alguém digita R$ 4.580,00 em vez de R$ 4.850,00; quando o cliente pede prorrogação e o financeiro emite um boleto novo sem cancelar o antigo, e ele paga os dois; quando o cliente paga dois dias atrasado e ninguém confere se os R$ 100,22 de encargos batem com o contrato; ou quando o banco baixa um título por prazo e a planilha o mostra como recebido.

Levar a emissão para o sistema resolve a digitação e cria uma conversa com o banco, por arquivo ou API, com idas, voltas, recusas e atrasos. O que o sistema faz com cada resposta precisa estar escrito.

### Norma, convenção do mercado, documentação do banco, decisão da empresa e recomendação

Ajuda separar cinco camadas:

- **Norma.** A [Resolução BCB nº 443/2024](https://www.normasbrasil.com.br/norma/resolucao-443-2024_470421.html), em vigor desde 3 de fevereiro de 2025, disciplina o arranjo do boleto e revogou a antiga Circular nº 3.598/2012 (e as Circulares nº 3.656/2013 e 3.956/2019). Ela diz o que o boleto deve conter e remete o resto a uma convenção entre as instituições.
- **Convenção e infraestrutura do mercado.** A base centralizada de boletos, o pagamento depois do vencimento em qualquer banco, o cálculo de encargos pelo banco que recebe e as regras de pagamento divergente vêm da convenção dos bancos e da operadora da base, a Núclea. A empresa não fala com a base; fala com o seu banco.
- **Documentação do banco.** O leiaute CNAB 240 ou 400 e a API de cobrança: segmentos, códigos, motivos de rejeição, faixas de nosso número. Cada banco tem o seu, mesmo seguindo o padrão FEBRABAN.
- **Decisão da empresa.** Que instruções mandar, quem pode prorrogar ou abater, o que fazer com pagamento a menor ou duplicado. É essa camada que precisa estar escrita antes de programar.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é sugestão de modelagem, não requisito de norma nem comportamento padrão de banco ou ferramenta.

## Onde este artigo termina e começam os outros

A emissão de boleto encosta em quatro assuntos que já têm texto próprio aqui no blog:

- **Conciliação.** Casar extrato e retorno com os títulos está em [conciliação bancária automática](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/). Aqui o foco é anterior: o título nasce, é registrado, muda e é baixado no banco.
- **Régua de cobrança.** Lembretes, encargos mostrados ao cliente, protesto e negativação estão na [régua de cobrança](https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/). Aqui entra só o que vai ao banco como instrução do título.
- **Pix Automático.** Cobrança recorrente por Pix, sem boleto, está em [Pix Automático](https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/). Aqui o Pix aparece como QR Code impresso no boleto.
- **Gateway e pedido.** O pagamento por gateway que confirma um pedido está em [integração de pagamentos](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/). Aqui o título é de contas a receber, cobrado no banco da própria empresa.

## Arquivo CNAB ou API de cobrança: a mesma conversa, dois meios

A integração bancária de boleto tem duas formas comuns, e muitos bancos oferecem as duas. A página de cobrança do Itaú, por exemplo, fala em enviar as cobranças a partir do sistema próprio [via arquivo para registro, ou optar pelo "registro em até 15 minutos ou via registro online (API)"](https://www.itau.com.br/empresas/pagamentos-recebimentos/cobranca); a aprovação da API, diz a página, está sujeita a análise.

- **Arquivo de remessa e retorno (CNAB).** O sistema gera um arquivo texto com os títulos e as instruções (a remessa) e o envia ao banco, por transferência de arquivos ou pelo internet banking. O banco processa e devolve outro arquivo (o retorno) com o que aconteceu: entradas confirmadas ou rejeitadas, liquidações, baixas, tarifas. Há dois tamanhos de registro, 240 e 400 posições. No padrão de 240, o leiaute de cobrança do Banrisul descreve um [arquivo com header, lotes e trailer; na remessa, os segmentos P e Q são obrigatórios e R, S e Y opcionais; no retorno, os segmentos T e U](https://www.banrisul.com.br/bob/data/LeiauteBanrisulFebraban_pdr240_v103_10032021.pdf?cache=0).
- **API de cobrança.** O sistema registra cada título numa chamada, recebe a resposta na hora (ou logo depois) e consulta ou recebe avisos de liquidação e baixa. Some o atraso do arquivo e aparecem cota, indisponibilidade e resposta perdida. Os cuidados com cota estão em [limites de API](https://tornostudio.com/blog/limites-api-integracao-cota/).

Para o comprador, a pergunta não é "arquivo ou API", e sim: **o que o sistema faz com cada resposta do banco, venha ela por arquivo ou por API.** As regras são as mesmas; muda a evidência do teste: arquivos de remessa e retorno, ou requisições e respostas guardadas.

Os códigos citados neste artigo vêm de manuais de bancos e só mostram que existem; confirme sempre no manual da versão que o seu banco vai homologar.

## O que vai no boleto e de onde vem cada dado

A Resolução BCB nº 443/2024 diz que o boleto deve conter, no mínimo: [nome e CPF ou CNPJ do pagador; identificação da instituição emissora e do terceiro habilitador, quando houver; nome, endereço e CPF ou CNPJ do beneficiário; valor e data de vencimento; e as condições de desconto previstas na obrigação, em caso de pagamento antecipado](https://www.normasbrasil.com.br/norma/resolucao-443-2024_470421.html) (art. 7º). A apresentação por meio eletrônico, como o PDF por e-mail, depende da concordância do pagador (art. 6º, § 1º).

Para o sistema, isso vira uma lista de campos com origem definida:

- **Pagador.** Nome, CPF ou CNPJ e endereço vêm do cadastro do cliente, não são digitados na emissão. Cadastro duplicado ou incompleto aparece aqui como rejeição do banco; os cuidados estão em [cadastro duplicado de clientes](https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/). O campo de CNPJ precisa aceitar o formato com letras, como em [CNPJ alfanumérico](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/), e o leiaute do banco precisa estar na versão que o aceita.
- **Valor e vencimento.** Vêm do título de contas a receber, que vem da nota, do contrato ou da parcela. O boleto não é o título, é o instrumento de cobrança dele; um título pode ter um boleto, nenhum ou, por erro, dois.
- **Desconto, juros e multa.** Vêm da condição comercial do cliente ou do contrato, não de um padrão fixo no código.
- **Seu número.** O identificador do título no sistema da empresa (no exemplo, T-8801). Vai na remessa e volta no retorno; é ele que liga a resposta do banco ao título certo, junto com o nosso número.

O PDF do boleto é um documento gerado por modelo, com os dados do momento da emissão, como em [documentos gerados por modelo](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/). A linha digitável e o código de barras são montados conforme o manual do banco; o teste de aceite precisa comparar o boleto gerado com um boleto de teste homologado pelo banco, não só "ver se abre".

![Ilustração de um boleto fictício anatomizado, com nove campos numerados. No topo, um aviso: só vai ao cliente depois do retorno 02, entrada confirmada. No boleto, do Banco Exemplo, marcado como não é um boleto válido: 1, beneficiário Indústria Exemplo de Embalagens Ltda., com CNPJ fictício; 2, convênio 7654321 e carteira 17; 3, pagador Cliente Alfa Comércio Ltda., com CNPJ e endereço do cadastro; 4, seu número T-8801; 5, nosso número 0000001041-3, com a nota de que o dígito 3 é calculado por módulo 11, pesos 2 a 9; 6, vencimento 15/12/2026 e valor R$ 4.850,00; 7, instruções que vão ao banco: desconto de R$ 48,50 até 04/12/2026, multa de 2% após o vencimento, juros de R$ 1,61 por dia de atraso, não protestar, baixar 30 dias após o vencimento, não aceita valor divergente; 8, QR Code Pix ilustrativo, não escaneável, com txid; 9, linha digitável e código de barras ilustrativos e inválidos. Abaixo, a legenda de onde vem cada campo: 1 e 2, da empresa e do contrato com o banco; 3 e 7, do cadastro do cliente e da condição comercial; 6, do título de contas a receber; 4, 5, 8 e 9, gerados pelo sistema e nunca reaproveitados. Um quadro tracejado em vermelho diz: gerar o PDF não é registrar; entre a remessa e o retorno, o título está enviado ao banco. Exemplo fictício.](./torno-boleto-anatomia.svg)

*Exemplo fictício: empresa, banco, convênio, cliente, números e instruções inventados; linha digitável, código de barras e QR Code ilustrativos e inválidos. Cada campo tem origem definida, e o boleto só sai depois do registro confirmado. Ilustração original Torno, 2026.*

## Registro: quando o boleto pode ir para o cliente

Todo boleto de cobrança hoje é registrado: o banco da empresa (a instituição destinatária) inclui os dados do título numa base centralizada, e o banco onde o cliente paga (a instituição recebedora) consulta essa base antes de aceitar o pagamento. A Resolução BCB nº 443/2024 define a base centralizada como o [repositório de informações dos boletos usado para registro e consulta](https://www.normasbrasil.com.br/norma/resolucao-443-2024_470421.html) (art. 3º). O manual de operações da Núclea, que opera a base, diz que o registro deve acontecer [antes da disponibilização do boleto ao pagador, e que o recebimento se dará apenas mediante a localização do boleto na base](https://tdn.totvs.com/download/attachments/804035701/MAPX-OP084-2019%20-%20Manual%20de%20Opera%C3%A7%C3%B5es%20Base%20Centralizada%20de%20Cobran%C3%A7a%20V12%20%281%29.pdf?api=v2) (versão 12.0, lida numa cópia publicada pela TOTVS; a validade indicada terminou em 29/11/2025 e pode haver versão mais nova).

A consequência para o sistema é direta: **gerar o PDF não é registrar.** Entre o envio da remessa (ou da chamada à API) e a confirmação do banco, o título está "enviado ao banco", não "registrado". As decisões:

- **Estados do boleto.** Por exemplo: a enviar, enviado, registrado, rejeitado, liquidado, baixado. Recomendação da Torno: PDF e e-mail ao cliente só a partir de "registrado".
- **Prazo da confirmação.** Por arquivo, a confirmação vem no próximo retorno; por API, na resposta ou numa consulta posterior. Quanto tempo sem confirmação vira alerta, e para quem, como em [monitoramento de software](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/).
- **Remessa com rejeição parcial.** Uma remessa com 50 títulos pode voltar com 48 confirmados e 2 rejeitados. O resultado de cada título precisa aparecer, como em [ações em lote com falha parcial](https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/), e os 48 seguem sem esperar os 2.
- **Emissão urgente.** Se o banco só registra no próximo processamento, o cliente no balcão recebe o boleto depois, ou paga por outro meio. Escreva qual.

### Nosso número, seu número e o número da remessa

O **nosso número** identifica o título no banco e, conforme o banco e a carteira, é gerado pela empresa ou pelo banco. O leiaute CNAB 400 do Itaú mostra os dois casos: [nas carteiras escriturais o nosso número vai zerado e o banco devolve o número atribuído; nas diretas a empresa escolhe, e o número não pode ser reutilizado enquanto registrado nem antes de 45 dias da baixa ou liquidação](https://download.itau.com.br/bankline/layout_cobranca_400bytes_cnab_itau.pdf). Nas orientações do Banco do Brasil para CNAB 400, o nosso número das carteiras com numeração pela empresa é [formado pelo convênio e por um sequencial que não pode ser repetido](https://www.bb.com.br/docs/portal/pub/Doc2627CBR641Pos7.pdf).

As decisões:

- **Quem gera.** Se a empresa gera, o sistema guarda o último número usado por convênio e carteira, numa sequência que não se repete nem quando duas emissões acontecem ao mesmo tempo. Se o banco gera, o título fica sem nosso número até a resposta, e o sistema precisa casar a resposta pelo seu número.
- **Dígito verificador.** Cada banco tem a sua regra. O manual CNAB 240 do Santander, por exemplo, calcula o dígito por [módulo 11, com pesos de 2 a 9 da direita para a esquerda; resto 0 ou 1 dá dígito 0, resto 10 dá dígito 1, e o exemplo do manual é 3147578 → 31475787](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). Recomendação da Torno: um teste automático que reproduz o exemplo do manual do seu banco e os casos de borda (resto 0, 1 e 10).
- **Nunca reaproveitar.** Título cancelado, rejeitado ou baixado não devolve o nosso número para a fila. Número rejeitado por "nosso número duplicado" é sinal de que a sequência quebrou, e precisa de alerta, não de nova tentativa com o mesmo número.
- **Número da remessa.** O arquivo de remessa tem um número sequencial. Nem todo banco o controla: o Banco do Brasil diz que, no CNAB 400, o seu sistema [não controla o número sequencial da remessa e aceita saltos e repetição de números já processados](https://www.bb.com.br/docs/portal/pub/Doc2627CBR641Pos7.pdf). Ou seja, quem impede que o mesmo arquivo seja enviado duas vezes é o sistema da empresa, não o banco.

### Entrada rejeitada

O retorno traz a entrada confirmada ou a entrada rejeitada, com o motivo. No manual CNAB 240 do Santander, são as ocorrências [02 "Entrada confirmada" e 03 "Entrada rejeitada", com motivos como nosso número inválido, nosso número duplicado, data de vencimento inválida, valor do boleto inválido e nome do pagador não informado](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). O CNAB 400 do Itaú separa [tabelas de erros para entrada rejeitada, alteração rejeitada, instrução rejeitada e baixa rejeitada, com até quatro códigos por registro](https://download.itau.com.br/bankline/layout_cobranca_400bytes_cnab_itau.pdf).

O que precisa estar escrito:

- **Tradução do motivo.** O código do banco vira uma mensagem que o financeiro entende e uma ação: corrigir o cadastro, corrigir o título, falar com o banco.
- **Reenvio.** Depois de corrigido, o título vai na próxima remessa como entrada nova, com o mesmo nosso número (se o banco aceitar) ou com um novo, conforme o manual. Escreva qual.
- **Prazo.** Título rejeitado com vencimento próximo precisa de correção no mesmo dia.

## Instruções: juros, multa, desconto, protesto e baixa

As instruções vão ao banco junto com o título e dizem o que fazer depois do vencimento, ou antes dele. Desde a Nova Plataforma da Cobrança, o boleto registrado pode ser pago depois do vencimento em qualquer banco, e a cartilha da FEBRABAN de 2017 explicava que [juros, multa e encargos passam a ser calculados automaticamente pelo banco recebedor, a partir das condições informadas pelo beneficiário](https://br.ccb.com/media/files/fc9c4e51fc8e1b11ee917e005056ae3d97/f01b09202cc5b11efb54c005056ae083a/nova-plataforma-da-cobranca.pdf). Instrução errada na remessa vira cobrança errada no caixa, sem ninguém da empresa no meio.

No manual CNAB 240 do Santander, por exemplo, os juros podem ser [valor por dia, taxa mensal ou isento](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf), com data de início; a multa, valor fixo ou percentual, com data (se a data faltar, o banco assume o vencimento); o desconto, valor ou percentual até uma data, ou por dia de antecipação, com até três descontos; o protesto e a baixa/devolução, com o número de dias.

As decisões da empresa:

- **De onde vêm os percentuais.** Do contrato ou da condição comercial do cliente. Limites legais são assunto do advogado, e a [régua de cobrança](https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/) cita as regras. O sistema garante que a instrução mandada ao banco é a mesma condição que ele usa para calcular o valor esperado.
- **Juros como valor por dia ou como taxa.** Se a empresa manda "valor por dia", o sistema calcula o valor e o arredonda ou trunca; se manda "taxa mensal", quem calcula é o banco. O manual da Núclea diz que os valores calculados devem ser [truncados na segunda casa decimal](https://tdn.totvs.com/download/attachments/804035701/MAPX-OP084-2019%20-%20Manual%20de%20Opera%C3%A7%C3%B5es%20Base%20Centralizada%20de%20Cobran%C3%A7a%20V12%20%281%29.pdf?api=v2). No exemplo, 1% ao mês sobre R$ 4.850,00, em mês de 30 dias, dá R$ 1,6166… por dia, que vira R$ 1,61. Os cuidados com casas decimais estão em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).
- **Desconto em dia não útil.** O mesmo manual diz que [descontos deverão ser postergados para o próximo dia útil, assim como a data limite para pagamento](https://tdn.totvs.com/download/attachments/804035701/MAPX-OP084-2019%20-%20Manual%20de%20Opera%C3%A7%C3%B5es%20Base%20Centralizada%20de%20Cobran%C3%A7a%20V12%20%281%29.pdf?api=v2). Se o sistema calcula o valor esperado, precisa usar o mesmo calendário, como em [datas, fusos e prazos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Protesto automático ou decisão humana.** Instrução de protesto na remessa faz o banco encaminhar o título ao cartório sozinho, depois do prazo. Recomendação da Torno: "não protestar" como padrão da remessa, e o protesto como instrução posterior, pedida por um perfil autorizado, título a título. A decisão de protestar é da empresa, com o advogado.
- **Baixa por decurso.** Quanto tempo depois do vencimento o boleto deixa de poder ser pago. A versão 12.0 do manual da Núclea (com validade indicada até 29/11/2025) diz que, [após a data limite de pagamento, o boleto fica disponível por 7 dias e é baixado por decurso após esse prazo](https://tdn.totvs.com/download/attachments/804035701/MAPX-OP084-2019%20-%20Manual%20de%20Opera%C3%A7%C3%B5es%20Base%20Centralizada%20de%20Cobran%C3%A7a%20V12%20%281%29.pdf?api=v2). A data limite costuma resultar da instrução de baixa/devolução que a empresa manda; confirme com o banco como ele conta esse prazo e se a regra vigente ainda é essa.

**Baixa não é pagamento.** É o ponto em que mais sistemas erram. A ocorrência de baixa no retorno diz que o boleto deixou de existir no banco, não que o cliente pagou. Título baixado por decurso continua devido; só perdeu o boleto. O sistema não pode dar o título como recebido por causa de uma baixa.

## Alteração de vencimento, alteração de valor e abatimento

O título já está registrado e algo muda. Emitir um boleto novo sem baixar o antigo deixa dois boletos vivos, e o cliente pode pagar os dois.

O CNAB 240 do Santander, por exemplo, tem movimentos de remessa para [06 alteração de vencimento, 04 concessão de abatimento, 05 cancelamento de abatimento, 10 concessão de desconto, 31 alteração de outros dados e 47 alteração de valor nominal](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). A resposta volta no retorno como confirmação ou como [26 "instrução rejeitada"](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf).

As decisões:

- **Prorrogação.** Quem pode prorrogar, até quantos dias, e se a prorrogação mantém, perdoa ou recalcula encargos já correndo. O sistema manda a instrução de alteração de vencimento, não emite título novo. Enquanto o banco não confirma, o vencimento oficial é o antigo; o cliente precisa saber disso.
- **Abatimento ou alteração de valor.** Uma devolução parcial de mercadoria reduz o que o cliente deve. Abatimento mantém o valor original no registro e mostra o desconto concedido; alteração do valor nominal troca o valor. Recomendação da Torno: abatimento, ligado ao documento que o justifica (a nota de devolução, como em [devolução e troca](https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/)), para que o histórico explique a diferença.
- **Instrução rejeitada.** Prorrogação pedida para um título já liquidado, abatimento maior que o valor, alteração enviada depois do vencimento: o banco rejeita, e o sistema precisa desfazer o que mostrou ao usuário. Pedir a alteração não é estar alterado, como em [cancelamento de solicitação](https://tornostudio.com/blog/cancelamento-solicitacao-sistema/).

## Segunda via

O cliente perdeu o boleto, ou quer pagar atrasado. Segunda via, na maioria dos casos, **não é um boleto novo**: é o mesmo título, com o mesmo nosso número, a mesma linha digitável e o mesmo vencimento, gerado de novo em PDF. Como o boleto registrado pode ser pago depois do vencimento em qualquer banco, e o banco recebedor calcula juros e multa a partir das instruções, o cliente pode pagar o boleto original vencido.

As decisões:

- **Valor atualizado.** O PDF pode mostrar o valor calculado para uma data, mas o banco cobra o que as instruções mandam; os dois cálculos precisam dar o mesmo número. O valor mostrado ao cliente na cobrança está na régua.
- **Segunda via depois da baixa.** Se o título foi baixado por decurso, não há boleto válido. A "segunda via" passa a ser um título novo, com nova entrada, novo nosso número e, conforme o acordo, novo valor. Alguém autoriza, e o título antigo fica ligado ao novo.
- **Novo vencimento.** Se o cliente quer outra data, é alteração de vencimento (seção anterior), não segunda via.
- **Canal.** Portal, e-mail ou WhatsApp: o documento é o mesmo, e a apresentação eletrônica depende da concordância do pagador (art. 6º, § 1º, da Resolução BCB nº 443/2024).

## Boleto com QR Code Pix

O boleto pode trazer, além do código de barras, um QR Code Pix. A Resolução BCB nº 443/2024 prevê que a [apresentação do boleto pode possibilitar o seu pagamento por intermédio de outro arranjo de pagamento autorizado ou operado pelo Banco Central, nos termos da convenção](https://www.normasbrasil.com.br/norma/resolucao-443-2024_470421.html) (art. 6º, § 2º). Os bancos dão nomes comerciais a isso; o Itaú, por exemplo, oferece [boleto com o código de barras e o QR Code Pix no mesmo documento](https://www.itau.com.br/empresas/pagamentos-recebimentos/cobranca).

No CNAB 240 do Santander, o QR Code vai num segmento opcional, o [Y03, com tipo e valor da chave Pix e um txid de 26 a 35 caracteres, único por boleto](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf), e há motivo de rejeição para txid em duplicidade. Atenção ao retorno: no mesmo manual, o pagamento pelo Pix do boleto volta, por padrão, como [movimento 09 "Baixa" com ocorrência 09 "Baixa comandada"; só se o convênio for parametrizado ele volta como 09 com ocorrência 92 "Baixa por pagamento Pix" ou como 06 "Liquidação" com ocorrência 61 "Liquidado por pagamento via Pix"](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). No padrão, nem o motivo diz que houve pagamento: um sistema que segue só os códigos trataria esse pagamento como baixa sem recebimento.

As decisões:

- **Um título, dois meios, uma baixa.** O cliente pode pagar pelo código de barras ou pelo QR Code. O sistema precisa receber as duas formas como liquidação do mesmo título, pelo retorno ou pelo aviso da API, e não registrar o Pix também como um recebimento avulso. Se o Pix aparece no extrato e a liquidação no retorno, o casamento dos dois fica com a [conciliação](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/).
- **Txid.** Gerado pelo sistema ou pelo banco, único, guardado no título. Nunca reaproveitado.
- **Como o Pix volta no retorno.** Pergunte ao banco qual código e qual motivo identificam o pagamento pelo QR Code e, se houver opção, peça que ele volte como liquidação. Recomendação da Torno: um cenário de aceite com pagamento real pelo QR Code no convênio de teste, conferindo o código, o motivo e o valor pago que chegam no retorno.
- **Depois do vencimento.** O QR Code continua valendo? Com que valor? Isso depende do banco e do tipo de cobrança Pix por trás. Pergunte e teste; não presuma.

## Pagamento diferente do valor: a menor, a maior, parcial e em duplicidade

Na Nova Plataforma, o valor que o banco recebedor aceita depende do que o título permite. A cartilha da FEBRABAN explica que pagamento de valor diferente depende de o beneficiário [combinar com o seu banco as condições, por exemplo valor mínimo e máximo](https://br.ccb.com/media/files/fc9c4e51fc8e1b11ee917e005056ae3d97/f01b09202cc5b11efb54c005056ae083a/nova-plataforma-da-cobranca.pdf). No CNAB 240 do Santander, o segmento Y53 traz o tipo: [01 aceita qualquer valor, 02 entre mínimo e máximo, 03 não aceita valor divergente](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). No CNAB 400 do Banco do Brasil, o indicador de recebimento parcial [permite que o boleto seja recebido mais de uma vez, em diversos valores, e não vale para boleto vencido](https://www.bb.com.br/docs/portal/pub/Doc2627CBR641Pos7.pdf).

As decisões:

- **Qual modalidade, para qual título.** Recomendação da Torno: "não aceita valor divergente" como padrão, e as outras só para casos escritos (acordo com parcelas, cliente com contrato que prevê pagamento parcial).
- **Pagamento a menor.** Com "não aceita divergente", o banco recebedor não deveria aceitar menos. Mesmo assim, o sistema compara o valor pago no retorno com o esperado na data (principal, menos desconto e abatimento, mais encargos) e manda a diferença para uma fila, em vez de dar o título como quitado. Diferença costuma vir de encargos calculados de outro jeito, de desconto em dia não útil ou de instrução errada.
- **Pagamento a maior.** Encargos acima do esperado, ou pagamento em modalidade "qualquer valor". O excedente vira crédito do cliente, devolução ou receita, conforme decisão do financeiro e orientação do contador; o sistema não o engole na baixa.
- **Pagamento parcial.** Cada parcial chega como uma liquidação; o título fica com saldo e só é baixado quando o saldo zera. O teste precisa ter pelo menos duas parciais.
- **Duplicidade.** A cartilha diz que [o sistema não irá aceitar pagamento em duplicidade](https://br.ccb.com/media/files/fc9c4e51fc8e1b11ee917e005056ae3d97/f01b09202cc5b11efb54c005056ae083a/nova-plataforma-da-cobranca.pdf) do mesmo boleto. A duplicidade que sobra na prática é outra: o cliente paga o boleto e também paga por transferência; ou paga um boleto antigo e uma "segunda via" emitida como título novo; ou paga um boleto que o banco já estava baixando. O CNAB 240 do Santander tem uma ocorrência para isso: [17 "liquidação após baixa ou liquidação boleto não registrado"](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf). O sistema recebe o dinheiro, mas o título já não está aberto: é crédito a decidir (devolver ou compensar em outro título), nunca uma segunda baixa do mesmo título. A liquidação que chega depois da baixa é um caso de [eventos fora de ordem](https://tornostudio.com/blog/integracao-eventos-fora-ordem/).

## Pedido de baixa e cancelamento

O cliente pagou por transferência, o pedido foi cancelado, a nota foi cancelada: o boleto precisa sair do banco. O movimento de remessa é o [02 "Pedido de baixa"](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf), e o retorno confirma com a ocorrência de baixa.

- **Pedir a baixa não é estar baixado.** Até a confirmação, o boleto pode ser pago. O título fica num estado próprio ("baixa solicitada"), e o retorno decide.
- **Motivo.** Pago por outro meio, cancelado, renegociado, enviado por engano. O motivo muda o que acontece com o título no contas a receber: pago, cancelado ou substituído por outro.
- **Cancelar o título no sistema sem pedir a baixa** deixa um boleto vivo no banco, que o cliente pode pagar. Recomendação da Torno: o sistema não deixa cancelar título com boleto registrado sem gerar o pedido de baixa.

## O arquivo de retorno CNAB, ocorrência por ocorrência

No CNAB 240, os segmentos T e U do retorno trazem, para cada título, a ocorrência, os motivos, os números e os valores; os campos de valor e data estão na [conciliação bancária](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/). Aqui importa a regra: **para cada ocorrência que o seu banco pode mandar, o que o sistema faz com o título.**

As ocorrências que todo sistema precisa tratar, com os códigos do manual do Santander como exemplo:

- **02 Entrada confirmada.** O título passa a registrado; o boleto é liberado para o cliente.
- **03 Entrada rejeitada.** O título volta para correção, com o motivo traduzido; o boleto não sai.
- **06 Liquidação.** O título é baixado como pago pelo valor pago, se o valor bater com o esperado na data; se não bater, vai para a fila de diferença.
- **09 Baixa.** O boleto deixou de existir no banco. O motivo diz por quê: no Santander, por exemplo, 09 "comandada banco", 12 e 13 decurso de prazo. Se foi pedida pela empresa, confirma a baixa pedida; se foi por decurso, o título continua devido e vai para a cobrança. Uma baixa sozinha nunca vira "pago"; a exceção é o motivo que o manual do banco define como pagamento (como a baixa por pagamento Pix vista acima), e essa combinação de código e motivo precisa estar escrita na tabela.
- **17 Liquidação após baixa.** Dinheiro recebido para título que já não estava aberto: crédito a decidir, com tarefa para o financeiro.
- **26 Instrução rejeitada.** A alteração (vencimento, abatimento, protesto, baixa) não foi feita; o sistema desfaz o estado provisório e avisa quem pediu.
- **28 Débito de tarifas/custas.** Tarifa lançada como despesa bancária ligada ao título, não descontada do valor do título.

O banco pode mandar outras, de protesto, cartório ou alegações do pagador. Recomendação da Torno: uma tabela, no sistema, com todas as ocorrências do manual do banco (código e motivo) e a ação de cada uma, inclusive "registrar e não fazer nada"; e **ocorrência desconhecida vai para a fila, nunca é ignorada em silêncio.**

![Ilustração de uma matriz de ocorrências do arquivo de retorno por ação do sistema, para a Indústria Exemplo de Embalagens Ltda. As linhas são as ocorrências: 02 entrada confirmada; 03 entrada rejeitada; 06 liquidação com valor igual ao esperado; 06 liquidação com valor diferente; 09 baixa pedida pela empresa; 09 baixa por decurso; 17 liquidação após baixa; 26 instrução rejeitada; 28 tarifa; ocorrência desconhecida; e arquivo já importado. Abaixo de cada ocorrência aparece o estado do título, e as colunas são: boleto ao cliente; baixa no contas a receber; fila do financeiro; aviso; cada célula marca faz, proibido fazer ou não se aplica. Exemplos: 02 deixa o título registrado e libera o boleto; 03 deixa o título rejeitado, para correção, e vai para a fila; 06 igual baixa como pago; 06 diferente fica pago com diferença e vai para a fila; 09 pedida confirma a baixa pedida; 09 por decurso deixa o título vencido sem boleto, sem baixa no contas a receber, com aviso à cobrança; 17 gera crédito a decidir na fila, sem segunda baixa; 26 desfaz a alteração e avisa quem pediu; 28 lança tarifa sem mexer no título; desconhecida vai para a fila; arquivo já importado não altera nada e é registrado. Uma faixa vermelha destaca: baixa não é pagamento. Exemplo fictício; códigos como os de manuais públicos de bancos.](./torno-boleto-matriz-retorno.svg)

*Exemplo fictício: códigos parecidos com os de manuais públicos, ações escolhidas pela empresa do exemplo. Cada ocorrência tem uma ação escrita, inclusive a desconhecida e o arquivo repetido. Ilustração original Torno, 2026.*

### Arquivo repetido, fora de ordem ou que não chegou

O arquivo de retorno é um evento de integração como outro qualquer, e tem os mesmos problemas:

- **Importado duas vezes.** Alguém importa o retorno de novo, ou a rotina roda duas vezes. O sistema reconhece o arquivo (número, data, conteúdo) e cada ocorrência já processada, e não liquida nada de novo. Os cuidados estão em [evento duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Fora de ordem.** A liquidação chega antes da confirmação de entrada: o título aceita a liquidação, e a confirmação que chega depois não desfaz o pagamento.
- **Não chegou.** Dia útil sem retorno, ou retorno sem nenhuma ocorrência de um banco que sempre manda algo: alerta. Um dia sem retorno é um dia sem baixa, e a régua cobra quem já pagou.
- **Arquivo inválido.** Header de outro convênio, trailer que não fecha a contagem, arquivo de outro banco: rejeitar o arquivo inteiro antes de processar qualquer linha, com mensagem clara.
- **Por API.** Avisos (webhooks) também chegam repetidos, fora de ordem ou não chegam; a consulta periódica é a rede de segurança.

## Conta, carteira e convênio

Cada boleto sai de um convênio, numa carteira, para crédito numa conta. Empresa com mais de um banco ou mais de uma carteira (simples, com desconto, vinculada) precisa de regra:

- **Qual convênio para qual título.** Por cliente, por empresa do grupo, por tipo de venda. Quem muda, e o que acontece com títulos já registrados quando muda (nada: continuam no banco onde nasceram).
- **Faixa e sequência por convênio.** O nosso número de um convênio não se mistura com o de outro.
- **Credenciais e certificados.** Arquivo ou API, o acesso ao banco tem dono, validade e renovação. Certificado vencido é emissão parada; entra no monitoramento.
- **Homologação.** Bancos costumam exigir arquivos ou chamadas de teste antes da produção. Defina quem conduz e com quais títulos.
- **Tarifas.** Vêm no retorno (no Santander, [ocorrência 28](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-download-cob240ptbr/25-06-13_130421_cnab-240-abril-2025-ptbr.pdf), além de campos de tarifa nos segmentos) ou no extrato. Sistema que desconta tarifa do valor do título baixa o título por menos do que o cliente pagou.

Se a emissão for um módulo ligado ao ERP atual, veja o que reunir em [integração com ERP](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/).

## Trilha

Cada passo guarda quem, quando e o quê: origem do título; nosso número e txid; remessa e envio; cada retorno importado e cada ocorrência aplicada, com o código original do banco; cada instrução pedida, com autor, motivo e resposta do banco; cada envio do PDF; cada diferença e a decisão tomada. O que um registro desses precisa ter está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Guarde os arquivos de remessa e retorno (ou as requisições e respostas da API) como chegaram: são a prova quando o cliente diz que pagou e o banco diz que não.

Quem pode prorrogar, abater, pedir baixa, pedir protesto, reenviar remessa e decidir diferenças segue as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Banco, convênio e carteira de cada tipo de título | Financeiro e direção |
| Arquivo CNAB ou API, e quem conduz a homologação com o banco | Financeiro, com TI |
| Dados do pagador e correção de cadastro rejeitado | Cadastro ou comercial |
| Quem gera o nosso número, faixa e regra de dígito | TI, conforme o manual do banco |
| Quando o boleto pode ir ao cliente e por qual canal | Financeiro |
| Percentuais de multa, juros e desconto | Financeiro e comercial, com o contrato e o advogado |
| Protesto: automático na remessa ou pedido título a título | Financeiro, com o advogado |
| Prazo de baixa por decurso | Financeiro |
| Prorrogação de vencimento: quem pode, até quanto, e encargos | Financeiro, com comercial |
| Abatimento e alteração de valor | Financeiro, ligado ao documento (devolução, acordo) |
| Modalidade de pagamento divergente e parcial | Financeiro |
| Diferença a menor ou a maior, liquidação após baixa, crédito do cliente | Financeiro, com o contador |
| Pedido de baixa e cancelamento de título com boleto | Financeiro |
| Tabela de ocorrências do retorno e ação de cada uma | Financeiro, com TI |
| Alertas: retorno que não chegou, remessa sem resposta, certificado vencendo | TI, com financeiro |
| Perfis: prorrogar, abater, baixar, protestar, reenviar, decidir diferença | Direção e financeiro, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Indústria Exemplo de Embalagens Ltda. vende para empresas com boleto do Banco Exemplo (fictício), convênio 7654321, carteira 17, por arquivo CNAB 240. O banco do exemplo usa códigos de ocorrência parecidos com os do manual do Santander citado acima.

Regras da empresa (escolhas do exemplo, não recomendação de taxas):

- **Nosso número.** Gerado pelo sistema, sequencial no convênio, com dígito por módulo 11 com pesos de 2 a 9 (resto 0 ou 1 → 0; resto 10 → 1). Último usado: 1040.
- **Instruções padrão.** Multa de 2% depois do vencimento; juros de 1% ao mês em mês de 30 dias, mandados como valor por dia, truncado em centavos; desconto de 1% para pagamento até uma data combinada com o cliente, informada título a título; não protestar; baixar 30 dias corridos depois do vencimento; não aceita valor divergente.
- **Envio.** O PDF só vai ao cliente depois da entrada confirmada. QR Code Pix em todos os boletos; o convênio foi parametrizado para devolver o pagamento por Pix como liquidação (06) com motivo próprio.
- **Prorrogação.** Até 15 dias, pelo financeiro, sem encargos, só antes do vencimento. Abatimento só com nota de devolução.
- **Tarifa.** R$ 2,90 por liquidação, lançada como despesa bancária.
- **Diferenças.** Qualquer diferença entre valor pago e esperado vai para a fila do financeiro.

**Terça-feira, 01/12/2026.** A remessa REM-0124 leva seis títulos:

| Título | Cliente | Nosso número | Vencimento | Valor |
|---|---|---|---|---|
| T-8801 | Alfa | 1041-3 | ter 15/12 | R$ 4.850,00 |
| T-8802 | Beta | 1042-1 | sex 18/12 | R$ 3.120,00 |
| T-8803 | Gama | 1043-0 | qui 10/12 | R$ 2.300,00 |
| T-8804 | Delta | 1044-8 | sex 11/12 | R$ 1.275,40 |
| T-8805 | Épsilon | 1045-6 | sex 04/12 | R$ 980,00 |
| T-8806 | Zeta | 1046-4 | seg 07/12 | R$ 640,00 |
| **Total** | | | | **R$ 13.165,40** |

Os dígitos cobrem os três casos da regra: 1041 tem soma ponderada 19 e resto 8 (dígito 3); 1042 tem resto 10 (dígito 1); 1043 tem resto 1 (dígito 0). Para o T-8801, os juros por dia são R$ 4.850,00 × 1% ÷ 30 = R$ 1,6166…, truncados em R$ 1,61; a multa, R$ 97,00; o desconto, R$ 48,50 (1%) para pagamento até sexta, 04/12. Os outros cinco títulos vão sem desconto.

**Quarta, 02/12.** O retorno traz cinco entradas confirmadas (02) e uma rejeitada: T-8804, ocorrência 03, motivo "CEP do pagador inválido". Os cinco confirmados vão por e-mail; o T-8804 fica retido. O cadastro corrige o CEP do Cliente Delta, e o título vai na REM-0125 com o mesmo nosso número.

**Quinta, 03/12.** O retorno confirma a entrada do T-8804, e o boleto vai ao cliente. No mesmo dia, o Cliente Épsilon paga o T-8805 por transferência, R$ 980,00. O financeiro registra o recebimento, e o sistema gera o pedido de baixa (02) na REM-0126; o título fica em "baixa solicitada".

**Sexta, 04/12.** O retorno confirma a baixa do T-8805 (09). Sem que ninguém soubesse, o Cliente Épsilon tinha agendado o pagamento do boleto para o vencimento.

**Segunda, 07/12.** O retorno traz o T-8805 com ocorrência 17, liquidação após baixa, R$ 980,00. O título já está pago; o sistema não o baixa de novo, registra R$ 980,00 como crédito do Cliente Épsilon e abre tarefa para o financeiro decidir entre devolver e compensar.

**Terça, 08/12.** O Cliente Beta devolve 10% da mercadoria. Com a nota de devolução, o financeiro concede abatimento de R$ 312,00 no T-8802 (movimento 04, REM-0127). Na quarta, 09/12, o retorno confirma: o T-8802 passa a valer R$ 2.808,00.

**Quarta, 09/12.** O Cliente Gama pede prorrogação do T-8803, que vence no dia seguinte, para terça, 22/12 (12 dias). O financeiro aprova, e a alteração de vencimento (06) vai na REM-0128. Na quinta, 10/12, o retorno confirma.

**Sexta, 11/12.** O Cliente Delta paga o T-8804 em dia; a liquidação (06) de R$ 1.275,40 vem no retorno de segunda, 14/12.

**Quinta, 17/12.** O Cliente Alfa paga o T-8801 com dois dias de atraso (quarta 16 e quinta 17), pelo código de barras, em outro banco. O banco recebedor calcula: R$ 4.850,00 + multa R$ 97,00 + juros 2 × R$ 1,61 = R$ 3,22, total R$ 4.950,22. O retorno de sexta, 18/12, traz a liquidação com valor pago de R$ 4.950,22, encargos de R$ 100,22 e tarifa de R$ 2,90 (crédito líquido R$ 4.947,32). O valor esperado pelo sistema é o mesmo, e o título é baixado com principal e encargos separados. Às 15h, alguém importa de novo o retorno de 18/12; o sistema reconhece o arquivo e não altera nada.

**Sexta, 18/12.** O Cliente Beta paga o T-8802 pelo QR Code Pix, R$ 2.808,00. A liquidação (06) vem no retorno de segunda, 21/12, com o motivo de pagamento por Pix; o sistema baixa o título uma vez só.

**Terça, 22/12.** O Cliente Gama paga o T-8803 no novo vencimento, R$ 2.300,00, sem encargos.

**T-8806.** O Cliente Zeta não paga. Em 22/12, o título está vencido há 15 dias, a régua de cobrança segue, e o boleto ainda vale até a data limite de quarta, 06/01/2027 (30 dias depois do vencimento). Se o banco mandar a baixa por decurso depois disso, o título continua em aberto, sem boleto.

![Ilustração em dois trilhos verticais paralelos, à esquerda o sistema da Indústria Exemplo de Embalagens Ltda. e à direita o Banco Exemplo, com setas horizontais de ida (remessa) e de volta (retorno) entre eles, como uma caixa de correio. Acima, a vida do título T-8805 do Cliente Épsilon, R$ 980,00, vencimento 04/12/2026: em 01/12, remessa REM-0124, entrada; em 02/12, retorno 02, entrada confirmada, e o boleto vai ao cliente; em 03/12, o cliente paga R$ 980,00 por transferência, fora do boleto, e o sistema manda na REM-0126 o pedido de baixa 02, título em baixa solicitada; em 04/12, retorno 09, baixa confirmada, título pago por transferência; em 07/12, retorno 17, liquidação após baixa, R$ 980,00, porque o cliente tinha agendado o boleto; o sistema não baixa de novo e registra crédito do cliente de R$ 980,00, com tarefa para o financeiro decidir entre devolver e compensar. Abaixo, uma faixa menor com o T-8804 do Cliente Delta, R$ 1.275,40: retorno 03 em 02/12, entrada rejeitada por CEP do pagador inválido, boleto retido; CEP corrigido e reenvio na REM-0125; retorno 02 em 03/12, boleto liberado. Exemplo fictício.](./torno-boleto-trilhos-titulo.svg)

*Exemplo fictício: títulos, remessas, retornos, datas e valores inventados; a baixa pedida e a liquidação que chega depois dela aparecem como mensagens separadas entre os dois trilhos. Ilustração original Torno, 2026.*

Situação em 23/12/2026: emitidos R$ 13.165,40; abatimento de R$ 312,00; recebidos pelos títulos R$ 12.213,40 de principal (R$ 4.850,00 + R$ 2.808,00 + R$ 2.300,00 + R$ 1.275,40 + R$ 980,00) mais R$ 100,22 de encargos do T-8801; em aberto, o T-8806, R$ 640,00 (13.165,40 − 312,00 − 12.213,40 = 640,00). Pelo boleto entraram R$ 12.313,62 em cinco liquidações (incluindo os R$ 980,00 duplicados do T-8805), com R$ 14,50 de tarifas, crédito líquido de R$ 12.299,12; os outros R$ 980,00 do T-8805 entraram por transferência.

Monte os cenários num ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com o convênio de teste do banco quando ele existir e com arquivos de retorno de teste preparados à mão para as ocorrências que o banco não gera sob demanda. Escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Geração da REM-0124 com T-8801 a T-8806 | Arquivo com 6 títulos, nossos números 1041 a 1046 com dígitos 3, 1, 0, 8, 6, 4; total R$ 13.165,40; número de remessa 0124 | Arquivo de remessa e registro |
| Cálculo do dígito pelo exemplo do manual do banco (no Santander, 3147578) | Resultado 31475787; casos de resto 0, 1 e 10 conferidos | Teste automático |
| Duas emissões simultâneas no mesmo convênio | Nossos números diferentes, sem salto não registrado | Registro das emissões |
| Simulação: reenvio da REM-0124 já enviada | Bloqueado; sistema mostra que a remessa já foi enviada | Tentativa recusada |
| Boleto do T-8801 antes do retorno | PDF e envio indisponíveis; título "enviado ao banco" | Tela e registro |
| Retorno de 02/12: 5 confirmados e T-8804 rejeitado | 5 títulos registrados e liberados; T-8804 rejeitado com motivo "CEP do pagador inválido" e boleto retido | Retorno importado e situação dos títulos |
| Correção do CEP e reenvio do T-8804 | Entrada nova na REM-0125; confirmada em 03/12; boleto liberado | Histórico do título |
| Simulação: retorno com motivo "nosso número duplicado" | Título rejeitado; alerta de sequência; sem nova tentativa automática com o mesmo número | Alerta e registro |
| Boleto do T-8801 gerado | Instruções: desconto R$ 48,50 até 04/12, multa 2%, juros R$ 1,61 por dia, não protestar, baixa 30 dias, não aceita divergente; QR Code com txid único | PDF e segmentos da remessa |
| Boleto comparado ao boleto de teste do banco | Linha digitável e código de barras iguais aos do banco para os mesmos dados | Boletos lado a lado |
| T-8805 pago por transferência em 03/12 | Pedido de baixa (02) na REM-0126 com motivo; título em "baixa solicitada", não "baixado" | Remessa e estado do título |
| Simulação: cancelar no sistema o T-8806 sem pedir baixa | Negado; o cancelamento gera o pedido de baixa | Tentativa e pedido gerado |
| Retorno de 04/12: baixa do T-8805 (09) | Título pago por transferência; boleto baixado | Histórico do título |
| Retorno de 07/12: T-8805 com 17, R$ 980,00 | Nenhuma segunda baixa; crédito de R$ 980,00 do Cliente Épsilon; tarefa para o financeiro | Crédito e tarefa |
| Abatimento de R$ 312,00 no T-8802 com nota de devolução | Movimento 04 na REM-0127; confirmado em 09/12; título vale R$ 2.808,00; valor original no histórico | Remessa, retorno e histórico |
| Prorrogação do T-8803 de 10/12 para 22/12 | Movimento 06 na REM-0128; vencimento só muda no sistema após a confirmação de 10/12 | Remessa, retorno e histórico |
| Simulação: retorno com 26 para a prorrogação | Vencimento volta a 10/12 no sistema; aviso a quem pediu | Histórico e aviso |
| Simulação: segunda via do T-8801 em 16/12 | Mesmo nosso número, mesma linha digitável; nenhum título novo | PDF e lista de títulos |
| Liquidação do T-8801 em 17/12 (retorno de 18/12) | Valor esperado R$ 4.950,22 = 4.850,00 + 97,00 + 3,22; pago igual; baixado com principal e encargos separados; tarifa R$ 2,90 como despesa; crédito líquido R$ 4.947,32 | Retorno, cálculo e lançamentos |
| Simulação: T-8801 pago em 04/12 | Valor esperado R$ 4.801,50 (desconto de R$ 48,50) | Cálculo |
| Simulação: T-8801 com valor pago de R$ 4.940,00 em 17/12 | Diferença de R$ 10,22 na fila; título "pago com diferença" | Fila e título |
| Simulação: título "entre mínimo e máximo" com duas parciais | Saldo reduzido a cada parcial; baixa só quando zera | Histórico do título |
| Retorno de 18/12 importado de novo | Nenhuma alteração; importação repetida registrada | Registro da importação |
| Liquidação do T-8802 por Pix (retorno de 21/12) | Baixado uma vez, R$ 2.808,00; nenhum recebimento Pix avulso criado | Retorno e título |
| Simulação: pagamento por Pix devolvido como baixa (09) com motivo de pagamento Pix (convênio parametrizado assim, e não como liquidação) | Título baixado como pago pelo valor conferido, não tratado como baixa sem recebimento | Retorno e título |
| Simulação: baixa por decurso do T-8806 | Título continua em aberto, R$ 640,00, sem boleto; régua e cobrança seguem | Situação do título |
| Simulação: ocorrência que não está na tabela | Vai para a fila com o código original | Fila |
| Simulação: dia útil sem retorno | Alerta ao financeiro e à TI | Alerta |
| Posição em 23/12 | Emitido R$ 13.165,40; abatimento R$ 312,00; principal recebido R$ 12.213,40; encargos R$ 100,22; em aberto R$ 640,00; crédito de cliente R$ 980,00; tarifas R$ 14,50 | Relatório com a regra de cálculo |
| Histórico do T-8805 | Emissão, remessa, confirmação, envio do PDF, pagamento por transferência, pedido de baixa, baixa, liquidação após baixa e crédito, com autor e horário | Trilha do título |

*Fim do exemplo fictício. Indústria, banco, convênio, carteira, clientes, títulos, nossos números, remessas, retornos, códigos, instruções, taxas, tarifas, datas e decisões são modelo editorial, sem cliente real, banco real nem sistema entregue; as escolhas do exemplo são da empresa fictícia, não taxas recomendadas, orientação jurídica ou contábil nem comportamento padrão de banco ou ferramenta.*

Antes do go-live, pegue os boletos de um mês e confira: quantos clientes não têm CPF, CNPJ ou endereço completos; quantos títulos tiveram prorrogação, abatimento ou segunda via; quantos pagamentos vieram com valor diferente do esperado ou em duplicidade; e quantas ocorrências diferentes o banco mandou, comparadas com a tabela que o sistema vai tratar.

## Perguntas frequentes

### É melhor integrar por arquivo CNAB ou por API?

Depende do banco, do volume e da urgência, e este artigo não recomenda um. A API costuma registrar mais rápido e avisar a liquidação sem esperar o arquivo do dia seguinte; o arquivo é mais antigo, mais conhecido e processa muitos títulos de uma vez. As regras desta página valem para os dois, e o aceite é o mesmo: a carteira fictícia com as contas fechadas e uma resposta escrita para cada ocorrência.

### O sistema pode calcular juros e multa, ou isso é com o banco?

Os dois calculam. O banco onde o cliente paga calcula a partir das instruções que a sua empresa mandou; o sistema precisa calcular o mesmo valor para saber se o pagamento bate. Se as duas contas usam regras diferentes (taxa mensal num, valor por dia no outro; arredondamento num, truncamento no outro), o título vai para a fila por centavos todo mês. Quanto cobrar é decisão com o contrato e o advogado.

### Segunda via precisa de um boleto novo?

Quase nunca. O boleto registrado pode ser pago depois do vencimento, em qualquer banco, com os encargos das instruções. A segunda via é o mesmo título, gerado de novo. Boleto novo só depois da baixa, e aí é um título novo, ligado ao antigo.

### O arquivo de retorno CNAB basta para a conciliação?

Não sozinho. O retorno diz o que aconteceu com cada título no banco; o extrato diz o que entrou na conta. Os dois precisam ser casados, com tarifas, datas de crédito e diferenças, e esse casamento está em [conciliação bancária automática](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/).

Para transformar a emissão de boletos e o retorno do banco em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) um arquivo de retorno real com os dados do cliente apagados, a lista de ocorrências que o seu banco manda e o caso mais recente de cliente que pagou duas vezes ou foi cobrado depois de pagar.

*Fontes consultadas em 23 de novembro de 2026: Resolução BCB nº 443/2024 (texto reproduzido por Normas Brasil e LegisWeb, com as alterações das Resoluções BCB nº 467/2025 e 515/2025; o portal do Banco Central não abriu nesta pesquisa); FEBRABAN, cartilha "Nova Plataforma da Cobrança" (março de 2017, cópia publicada pelo China Construction Bank Brasil); Núclea, Manual de Operações da Base Centralizada de Cobrança, versão 12.0 (cópia publicada pela TOTVS; validade indicada até 29/11/2025); Santander, Layout Cobrança CNAB 240, versão 8.3 (abril de 2025); Banrisul, Leiaute Padrão Febraban CNAB 240 versão 10.3 (10/03/2021); Itaú, Cobrança CNAB 400 (janeiro de 2017) e página de cobrança para empresas; Banco do Brasil, Cobrança Integrada, orientações técnicas CNAB 400 (março de 2018). O documento de leiaute da própria FEBRABAN, os leiautes do Bradesco e os portais de desenvolvedores de APIs de cobrança não abriram nesta pesquisa. Este artigo não recomenda banco nem fornecedor e não é orientação jurídica, contábil ou fiscal; empresas, títulos, números e ilustrações são fictícios.*
