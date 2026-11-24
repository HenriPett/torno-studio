---
content_id: torno-artigo-pt-20261124-certificado-digital-a1-sistema
intent_id: buyer-digital-certificate-a1-expiry-renewal-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Certificado digital A1 vencido no sistema: o que definir e testar para guardar, avisar, trocar e diagnosticar o certificado antes que a emissão pare'
h1: 'Certificado digital A1 vencido no sistema: o que definir e testar antes que a emissão de notas pare'
seo_title: 'Certificado digital A1 vencido no sistema: regras e aceite | Torno'
seo_description: 'Certificado digital A1 vencido e a nota parada: onde guardar, quem acessa, alerta de vencimento, troca sem parar, matriz e filial, A1 x A3 e aceite.'
summary: 'Roteiro para a empresa que contrata, mantém ou vai aceitar um sistema sob medida, um ERP ou um módulo fiscal que usa o certificado digital ICP-Brasil da empresa (e-CNPJ A1 ou A3) para emitir NF-e e NFS-e, assinar eventos e consultar a distribuição de documentos fiscais: as duas funções do certificado dentro do sistema (assinar o XML e abrir a conexão com o fisco); A1 e A3 num sistema que roda em servidor ou na nuvem, e o que a Resolução CG ICP-Brasil nº 211/2024 muda nos tipos; onde o arquivo e a senha ficam guardados e quem acessa; o cadastro de cada certificado; certificado da matriz, da filial e de outra empresa do grupo e a regra do CNPJ-base; alerta de vencimento antes de a emissão parar; troca do arquivo e da senha sem parar a operação, com teste e volta; como separar falha local de assinatura, falha da conexão TLS e rejeição da SEFAZ por certificado; registro de quem trocou; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício.'
primary_question: O que uma empresa precisa definir e testar no sistema que usa o certificado digital ICP-Brasil para emitir e consultar documentos fiscais, para que o certificado fique guardado com acesso controlado, o vencimento seja avisado e a troca aconteça antes de a emissão parar, e cada falha de certificado seja reconhecida como tal?
proposed_path: /blog/certificado-digital-a1-vencimento-sistema-aceite/
canonical_url: https://tornostudio.com/blog/certificado-digital-a1-vencimento-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores, responsáveis fiscais e financeiros, controladoria e TI de indústrias, distribuidoras e empresas de serviços, pequenas e médias, que contratam, mantêm ou vão aceitar um sistema sob medida, um ERP ou um módulo fiscal que emite NF-e ou NFS-e e consulta documentos fiscais com o certificado digital da empresa, e quem vai implementá-lo.
buyer_stage: Especificação, manutenção e aceite, antes de levar a emissão fiscal para um sistema próprio ou para a nuvem, ou depois de um certificado vencido ter parado a emissão.
scope: Funções do certificado digital no sistema (assinatura do XML e certificado de transmissão na conexão TLS com autenticação mútua); NF-e e eventos, distribuição de DF-e e NFS-e de padrão nacional como exemplos de uso; tipos A1 e A3 e mídia da chave privada segundo o DOC-ICP-04; validade máxima; mudança de tipos pela Resolução CG ICP-Brasil nº 211/2024 e regras de transição; arquivo PKCS#12 e senha; guarda, acesso, carga e retirada do certificado; cadastro de certificados; CNPJ-base, matriz, filial e outra empresa do grupo; alerta de vencimento e escalonamento; troca sem parar, teste em homologação, ativação, volta ao anterior e descarte; diagnóstico de falha local, falha de conexão e rejeição da SEFAZ por certificado ou assinatura; trilha; quem decide; critérios de aceite com dados fictícios.
not_scope: Recomendação, comparação ou contratação de autoridade certificadora, prestador de serviço de confiança, emissor fiscal, plataforma ou fornecedor de software; preço de certificado; orientação jurídica, contábil ou fiscal individual, inclusive quem pode ser responsável pelo uso do certificado da pessoa jurídica, procurações e obrigações de emissão; tutorial de instalação de certificado em navegador, sistema operacional ou ferramenta específica; validação de documentos fiscais por conteúdo (rejeições que não são de certificado nem de assinatura); contingência da NF-e; assinatura eletrônica de contratos por pessoas (coberta em outro artigo); login, senha e segundo fator dos usuários (cobertos em outros artigos); certificados de API bancária e de outros órgãos (citados só como item do cadastro); certificados SSL/TLS do site da empresa.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-24T11:30:00Z'
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
  - path: https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/
    reason: Trata o que pedir e testar na emissão da NFS-e de padrão nacional e cita o certificado como um item; aqui o ciclo de vida do certificado que a NFS-e, a NF-e e a distribuição de DF-e usam.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Trata os campos de IBS e CBS e as regras de validação da NF-e na reforma; aqui só as rejeições de certificado e de assinatura.
  - path: https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/
    reason: Trata a NF-e de entrada e a distribuição de documentos fiscais; aqui o certificado que essa consulta usa e a regra do CNPJ-base.
  - path: https://tornostudio.com/blog/assinatura-eletronica-sistema-status-documento-aceite/
    reason: Trata a assinatura de contratos e documentos por pessoas; aqui o certificado da empresa que o sistema usa sozinho para assinar documentos fiscais.
  - path: https://tornostudio.com/blog/autenticacao-dois-fatores-sistema-requisitos-aceite/
    reason: Trata o login com segundo fator; aqui quem pode carregar e trocar o certificado, que é uma ação mais sensível do que entrar no sistema.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem carrega, aprova, ativa e retira o certificado.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que a carga, a troca e o uso do certificado precisam registrar.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Trata alertas do fluxo crítico; aqui o alerta de vencimento e de falha de certificado.
  - path: https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/
    reason: Trata como voltar uma atualização; aqui a volta ao certificado anterior quando o novo falha.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste; aqui o teste do certificado novo no ambiente de homologação do fisco.
  - path: https://tornostudio.com/blog/sistema-multiempresa-isolamento-dados-aceite/
    reason: Trata o isolamento de dados entre empresas; aqui o certificado de cada empresa do grupo, que não pode ser usado pela outra.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas, fusos e prazos; aqui o instante exato em que o certificado vence e o relógio do servidor.
  - path: https://tornostudio.com/blog/erro-intermitente-software-evidencias/
    reason: Trata como reunir evidências de um erro que vai e volta; aqui a falha de conexão que não traz código.
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Trata o CNPJ com letras; aqui a leitura do CNPJ do certificado e a comparação do CNPJ-base.
  - path: https://tornostudio.com/blog/prova-restauracao-backup-software/
    reason: Trata a prova de que o backup restaura; aqui o certificado e a senha que precisam voltar junto com o sistema.
  - path: https://tornostudio.com/blog/troca-fornecedor-software-passagem-tecnica/
    reason: Trata a passagem técnica entre fornecedores; aqui o certificado que fica com o fornecedor antigo.
  - path: https://tornostudio.com/blog/boleto-sistema-remessa-retorno-cnab-aceite/
    reason: Trata a emissão de boletos e cita credenciais e certificados do banco; aqui o cadastro que inclui esses certificados.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/integracao-erp-briefing-orcamento/
    reason: Ajuda a reunir o que é preciso antes de pedir orçamento de integração; aqui quando a emissão fiscal é um módulo ligado ao ERP atual.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar o uso do certificado digital no sistema em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A Medida Provisória nº 2.200-2/2001 institui a ICP-Brasil para garantir a autenticidade, a integridade e a validade jurídica de documentos em forma eletrônica (art. 1º); diz que o par de chaves será gerado sempre pelo próprio titular e que a chave privada de assinatura será de seu exclusivo controle, uso e conhecimento (art. 6º, parágrafo único); e que as declarações em documentos eletrônicos produzidos com certificação da ICP-Brasil presumem-se verdadeiras em relação aos signatários (art. 10, § 1º).'
    reference: https://planalto.gov.br/ccivil_03/mpv/Antigas_2001/2200-2.htm
    entity: 'Presidência da República, Medida Provisória nº 2.200-2, de 24/08/2001'
    source_date: '2001-08-24'
    checked_at: '2026-11-24T11:23:00Z'
    limit: 'Texto da norma no Planalto. Citada para dizer o que a norma fixa; a consequência jurídica para cada empresa é assunto do advogado.'
  - classification: FATO
    claim: 'A Resolução CG ICP-Brasil nº 211, de 31/10/2024, cria os tipos de selo eletrônico em software e em hardware (SE-S e SE-H) e de aplicações específicas em software e em hardware (AE-S e AE-H) (art. 2º); extingue os certificados de assinatura dos tipos A1 e A2 e os de sigilo S1 a S4 (art. 3º); veda o uso de selo eletrônico com propósito de assinatura que expresse a vontade da pessoa jurídica (art. 4º); diz que certificados A1, A2, A3, A4, S1 a S4, T3 e T4 poderão ser emitidos e utilizados na cadeia V5 durante toda a sua vigência, até 02/03/2029 (art. 13); e que A1 e A3 poderão ser emitidos na cadeia V10 até 31/12/2026 para uso restrito em aplicações específicas (art. 14).'
    reference: https://www.normasbrasil.com.br/norma/resolucao-211-2024_468443.html
    entity: 'Comitê Gestor da ICP-Brasil, Resolução nº 211, de 31/10/2024 (publicada no DOU em 04/11/2024 e republicada em 07/11/2024), texto reproduzido pelo portal Normas Brasil; existência, número, ementa e datas de publicação conferidos na página de resoluções do ITI (https://www.gov.br/iti/pt-br/assuntos/legislacao/resolucoes)'
    source_date: '2024-10-31'
    checked_at: '2026-11-24T11:18:00Z'
    limit: 'O repositório do ITI com o texto integral foi recusado pelo proxy nesta sessão; o texto foi lido numa reprodução. A lista de resoluções do ITI, lida às 11:17Z, não mostra norma posterior que altere essas datas pela ementa (vai até a Resolução nº 220, de 28/04/2026), mas o texto das resoluções 212 a 220 não foi lido. A resolução não diz quais tipos a SEFAZ aceita na NF-e.'
  - classification: FATO
    claim: 'O DOC-ICP-04 versão 7.2 (17/04/2020) fixa a validade máxima de 1 ano para o A1 e de 5 anos para o A3, e exige, para a chave privada do A1, repositório protegido por senha e/ou identificação biométrica, cifrado por software, e, para o A3, hardware criptográfico homologado pela ICP-Brasil ou com certificação do Inmetro (Tabelas 4 e 6). A versão 8.3 (30/01/2025, que já incorpora as alterações das Resoluções nº 211 e nº 212) já não lista A1 nem A2; mantém o A3 com 5 anos em hardware criptográfico, dá 1 ano ao SE-S e ao AE-S, em repositório cifrado por software, e permite a guarda de chaves privadas por terceiros em hardware criptográfico só por entidade credenciada como prestador de serviço de confiança (PSC) ou, no caso de chaves privadas de funcionários, por soluções corporativas em HSM da própria instituição, com acesso só pela rede interna e concordância expressa do titular (item 6.1.1.8); para pessoa jurídica, o representante legal indica o responsável pela geração e pelo uso do par de chaves (item 6.1.1.1).'
    reference: https://www.gov.br/iti/pt-br/assuntos/legislacao/resolucoes/resolucoes-old/Resolucao179_DOCICP04_8.3_compilada.pdf
    entity: 'ITI / Comitê Gestor da ICP-Brasil, DOC-ICP-04, Requisitos mínimos para as políticas de certificado na ICP-Brasil, versão 8.3 (30/01/2025) e versão 7.2 (17/04/2020, https://mailman.iti.gov.br/images/repositorio/legislacao/documentos-principais/04/DOC-ICP-04_-_v.7.2_-_REQUISITOS_MINIMOS_PARA_PC.pdf)'
    source_date: '2025-01-30'
    checked_at: '2026-11-24T11:24:00Z'
    limit: 'A versão 8.3 está numa pasta do ITI chamada resoluções antigas, e a Resolução nº 215, de 21/03/2025, alterou o DOC-ICP-04 depois dela; a versão vigente não foi aberta. A validade de 1 ano do A1 vem da versão 7.2, que ainda listava o tipo.'
  - classification: FATO
    claim: 'O glossário do ITI diz que na ICP-Brasil estão definidos tipos de certificado para titulares, classificados como A1 a A4 e S1 a S4; descreve o token como dispositivo para armazenamento seguro do certificado, conectado por USB, e o cartão inteligente como cartão com microchip capaz de armazenar chaves e certificados; define certificado expirado como aquele cuja data de validade foi ultrapassada.'
    reference: https://www.gov.br/iti/pt-br/centrais-de-conteudo/glossario
    entity: 'Instituto Nacional de Tecnologia da Informação (ITI), glossário'
    source_date: null
    checked_at: '2026-11-24T11:12:00Z'
    limit: 'Página sem data, com a classificação anterior à Resolução nº 211; usada só para as definições de mídia e de certificado expirado.'
  - classification: FATO
    claim: 'O Manual de Orientação do Contribuinte da NF-e ABI (modelo 77), Visão Geral, versão 1.00a (agosto de 2026), diz que a comunicação usa TLS 1.2 ou superior com autenticação mútua; que o certificado digital deve ser emitido por AC credenciada pela ICP-Brasil, tipo A1 ou A3, e conter o CNPJ da pessoa jurídica titular; que o certificado de transmissão identifica o responsável pela transmissão, que não precisa ser o emitente, e precisa permitir autenticação de cliente; que o certificado de assinatura deve conter o CNPJ do emitente; e que a validação da assinatura inclui verificar a validade, montar a cadeia de confiança e checar a lista de certificados revogados de cada certificado da cadeia (seções 4.2.2 a 4.2.5).'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Visao-Geral-v1.00a.pdf
    entity: 'Portal Nacional da NF-e, Manual de Orientação do Contribuinte — MOC NF-e ABI, Visão Geral, versão 1.00a, agosto de 2026, arquivo publicado pelo portal Reforma Tributária'
    source_date: '2026-08-01'
    checked_at: '2026-11-24T11:19:00Z'
    limit: 'Manual da NF-e de Alienação de Bens Imóveis (modelo 77), não da NF-e modelo 55; lido numa cópia publicada por terceiro, porque o Portal Nacional da NF-e não abre por esta ferramenta. Usado como a documentação mais recente do mesmo sistema que consegui abrir; o MOC 7.00 da NF-e modelo 55 (cópia publicada pela Senior, novembro de 2020) foi aberto só nas seções iniciais, que tratam da assinatura com e-CNPJ ou e-CPF do emitente.'
  - classification: FATO
    claim: 'O Anexo I do MOC NF-e ABI, versão 1.00a (agosto de 2026), lista as regras de validação do certificado de transmissão (280 Certificado Transmissor inválido; 281 Certificado Transmissor Data Validade; 282 Certificado Transmissor sem CNPJ/CPF; 283 Certificado Transmissor - erro Cadeia de Certificação; 284 Certificado Transmissor revogado; 285 Certificado Transmissor difere ICP-Brasil; 286 Certificado Transmissor erro no acesso a LCR), dizendo que as regras A01 a A05 são validadas pelo próprio protocolo TLS; do certificado de assinatura (290 inválido; 291 Data Validade; 292 sem CNPJ/CPF; 293 erro Cadeia de Certificação; 294 revogado; 295 difere ICP-Brasil; 296 erro no acesso a LCR); e da assinatura (297 Assinatura difere do calculado; 298 Assinatura difere do padrão do Sistema; 213 CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital).'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Anexo-I-Leiaute-e-RV-v1.00a.pdf
    entity: 'Portal Nacional da NF-e, MOC NF-e ABI, Anexo I, Leiaute e Regras de Validação, versão 1.00a, agosto de 2026, arquivo publicado pelo portal Reforma Tributária'
    source_date: '2026-08-01'
    checked_at: '2026-11-24T11:20:00Z'
    limit: 'Regras do modelo 77, lidas numa cópia de terceiro. O Anexo I do MOC da NF-e modelo 55 não foi aberto; páginas de ajuda de emissores (Omie, rejeição 281, 14/01/2026, https://ajuda.omie.com.br/pt-BR/articles/6633173-281-rejeicao-certificado-transmissor-data-validade; Buscador NCM, rejeição 280, https://buscadorncm.com.br/nfe/rejeicoes/280) mostram os mesmos códigos e textos para a NF-e e a NFC-e (a do Buscador NCM cita o Anexo I do MOC 7.0), como convenção de mercado, não como norma. A regra 213, com o mesmo texto, foi conferida para os modelos 55 e 65 na Nota Técnica 2026.001 v1.02b.'
  - classification: FATO
    claim: 'A Nota Técnica 2014.002, versão 1.40 (julho de 2026), do serviço de distribuição de DF-e da NF-e, diz que a consulta é autenticada pelo CNPJ-base do certificado de transmissão e permitida para qualquer estabelecimento da empresa com o mesmo CNPJ-base; que um CNPJ-base consultado diferente do certificado gera a rejeição 593 "CNPJ-Base consultado difere do CNPJ-Base do Certificado Digital"; que as validações A01 a A05 do certificado de transmissão são feitas pelo protocolo; e que o campo CNPJ passou a ser alfanumérico.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/07/NT2014.002_v1.40-WsNFeDistribuicaoDFe-CNPJ-alfa.pdf
    entity: 'Portal Nacional da NF-e, Nota Técnica 2014.002 v1.40, Web Service de Distribuição de DF-e, julho de 2026, arquivo publicado pelo portal Reforma Tributária'
    source_date: '2026-07-01'
    checked_at: '2026-11-24T11:25:00Z'
    limit: 'Lida numa cópia de terceiro; o Portal Nacional da NF-e não abre por esta ferramenta.'
  - classification: FATO
    claim: 'O Manual dos Contribuintes das APIs do ADN do Sistema Nacional NFS-e, versão 1.0 (12/02/2026), diz que a consulta de distribuição pode usar um certificado cujo CNPJ tenha o mesmo CNPJ raiz do contribuinte; o Manual dos Contribuintes do Emissor Público Nacional (API) diz que certas consultas só devolvem dados se o certificado digital da conexão identificar um dos atores da nota (prestador, tomador ou intermediário).'
    reference: https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-apis-adn-sistema-nacional-nfse.pdf
    entity: 'Sistema Nacional NFS-e, Manual dos Contribuintes — APIs do ADN, versão 1.0, 12/02/2026; e Manual dos Contribuintes — Emissor Público Nacional API (https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-emissor-publico-api-sistema-nacional-nfs-e-v1-2-out2025.pdf/@@download/file)'
    source_date: '2026-02-12'
    checked_at: '2026-11-24T11:22:00Z'
    limit: 'Os trechos lidos não tratam do tipo de certificado aceito nem de mensagens de erro de certificado. Municípios com emissor próprio têm regras próprias.'
  - classification: FATO
    claim: 'A RFC 7292 (julho de 2014) descreve o PKCS #12 v1.1, formato de transferência de informações de identidade pessoal como chaves privadas e certificados, com modo de privacidade por senha (as informações são cifradas com chave derivada de uma senha) e modo de integridade por senha.'
    reference: https://www.rfc-editor.org/rfc/rfc7292
    entity: 'IETF, RFC 7292, PKCS #12: Personal Information Exchange Syntax v1.1, julho de 2014'
    source_date: '2014-07-01'
    checked_at: '2026-11-24T11:24:00Z'
    limit: 'Especificação do formato; não diz como cada autoridade certificadora entrega o arquivo A1 nem que extensão ele tem.'
  - classification: FATO
    claim: 'Um texto de fornecedor de software fiscal (publicado em 13/08/2026) diz que o A1 tem validade de 12 meses e não é renovado automaticamente, e que continua sendo emitido e usado; outro texto do mesmo fornecedor (06/12/2024, atualizado em 14/01/2025) resume a Resolução nº 211 e diz que a saída do A1 exigirá adaptações em soluções conectadas, inclusive módulos emissores de documentos fiscais, sem afirmar se a SEFAZ aceita os novos tipos.'
    reference: https://blog.tecnospeed.com.br/certificado-digital-a1/
    entity: 'TecnoSpeed, "Certificado Digital A1: últimas notícias" (13/08/2026) e "Resolução CG ICP-Brasil nº 211" (https://blog.tecnospeed.com.br/resolucao-cg-icp-brasil-no-211-novos-certificados-digitais-e-extincao-dos-modelos-a1-e-a2/)'
    source_date: '2026-08-13'
    checked_at: '2026-11-24T11:16:00Z'
    limit: 'Leitura de mercado por um fornecedor, não norma; citada só para mostrar que o tema está em aberto. Não é recomendação do fornecedor.'
  - classification: FATO
    claim: 'A Nota Técnica 2026.001 v1.02b da NF-e (modelos 55 e 65) cria o Provedor de Assinatura e Autorização (PAA), opcional, voltado a MEI, produtor rural e optantes do Simples Nacional, em que o documento é assinado com certificado ICP-Brasil do PAA; mantém a regra F03, rejeição 213 "CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital", com exceção para a nota com grupo do PAA autorizada pela SVRS.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/07/NT_2026.001_v1.02b-PAA-NFe.pdf
    entity: 'Portal Nacional da NF-e, Nota Técnica 2026.001 v1.02b, Provedor de Assinatura e Autorização (PAA), arquivo publicado pelo portal Reforma Tributária'
    source_date: '2026-07-01'
    checked_at: '2026-11-24T11:40:00Z'
    limit: 'Lida pelo revisor numa cópia de terceiro. Não traz as regras 280 a 298; confirma só a 213 para os modelos 55 e 65. Produção prevista para 05/10/2026 pelo controle de versões; data da versão 1.02b aproximada pela pasta de publicação (julho de 2026).'
  - classification: HIPÓTESE
    claim: 'A Distribuidora Exemplo de Ferramentas Ltda., a matriz e a filial, a Exemplo Serviços Técnicos Ltda., os certificados CERT-2026 e CERT-2027, seus números de série, datas e horários de validade, as janelas de alerta, os perfis, as notas, os horários de troca e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito normativo, orientação jurídica ou fiscal nem comportamento padrão de autoridade certificadora, SEFAZ ou ferramenta.'
    reference: Modelo editorial deste artigo; datas, dias da semana e janelas de alerta refeitos em Python (datetime) em 24/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, certificado, autoridade certificadora ou sistema real, nem prazos de alerta recomendados para todo caso.
---

*Leitura estimada: 21 minutos.*

**Antes de aceitar um sistema que emite nota com o certificado digital da empresa, escreva e aprove oito regras: para que o sistema usa o certificado (assinar o XML, abrir a conexão com o fisco, ou os dois); se ele é A1 ou A3, e como isso funciona no servidor ou na nuvem; onde o arquivo e a senha ficam guardados e quem pode carregá-los, usá-los e tirá-los; qual certificado vale para a matriz, para cada filial e para cada empresa do grupo; quem é avisado do vencimento, com quanta antecedência e o que acontece se ninguém agir; como o certificado novo é testado e ativado sem parar a emissão, e como se volta ao anterior; como o sistema separa uma falha de certificado de uma rejeição da nota; e o que fica registrado.** Depois, teste com um certificado de homologação e um roteiro de vencimento simulado. Sem isso, a primeira notícia de um certificado digital A1 vencido é o faturamento parado numa manhã de segunda-feira, com uma mensagem de erro que ninguém sabe ler.

**Este artigo não recomenda autoridade certificadora, prestador de serviço de confiança, emissor fiscal nem fornecedor, e não é orientação jurídica, contábil ou fiscal.** Quem pode ser o responsável pelo certificado da empresa, que procurações são necessárias e que documentos a empresa é obrigada a emitir são decisões com o advogado e o contador. As regras de tipos de certificado na ICP-Brasil estão mudando; onde cito uma norma ou um manual, digo qual versão consegui abrir. Empresas, certificados e números do exemplo são inventados.

## O que o certificado faz dentro do sistema

O certificado digital ICP-Brasil da empresa (o e-CNPJ) aparece em dois lugares diferentes quando o sistema conversa com o fisco, e vale separar desde o início:

- **Assinar.** O XML da nota, do cancelamento ou de outro evento leva uma assinatura digital feita com a chave privada do certificado. É ela que diz que o documento veio da empresa e não foi alterado. A Medida Provisória nº 2.200-2/2001 instituiu a ICP-Brasil justamente [para garantir a autenticidade, a integridade e a validade jurídica de documentos em forma eletrônica](https://planalto.gov.br/ccivil_03/mpv/Antigas_2001/2200-2.htm) (art. 1º).
- **Transmitir.** A conexão com o serviço do fisco é aberta com TLS e autenticação mútua: o servidor mostra o certificado dele, e o sistema mostra o da empresa. O manual de orientação mais recente da NF-e que consegui abrir, o do modelo de alienação de bens imóveis, de agosto de 2026, descreve [TLS 1.2 ou superior com autenticação mútua](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Visao-Geral-v1.00a.pdf) e diz que o certificado de transmissão identifica quem transmite, que não precisa ser o emitente.

Na maioria das empresas, o mesmo certificado faz as duas coisas. Mas são duas verificações diferentes, em momentos diferentes, com erros diferentes, e o sistema precisa saber qual delas falhou.

Onde o certificado costuma ser usado num sistema que lida com documentos fiscais:

- **NF-e e NFC-e.** Autorização, cancelamento, carta de correção e outros eventos.
- **Distribuição de documentos fiscais.** A consulta que traz as notas emitidas contra o CNPJ da empresa, usada na [conferência da NF-e de entrada](https://tornostudio.com/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/).
- **NFS-e.** No Sistema Nacional, a conexão é identificada pelo certificado; os detalhes estão em [NFS-e de padrão nacional](https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/).
- **Outros usos.** Bancos, órgãos e outros serviços podem pedir certificado próprio, nem sempre ICP-Brasil. Não entram no detalhe deste artigo, mas entram no mesmo cadastro (veja adiante).

Um certificado que vence para tudo isso ao mesmo tempo: notas, consultas e eventos.

### Norma, documentação do fisco, convenção de mercado, decisão da empresa e recomendação

Ajuda separar cinco camadas:

- **Norma.** A MP nº 2.200-2/2001, as resoluções do Comitê Gestor da ICP-Brasil e o DOC-ICP-04, que diz que tipos de certificado existem, por quanto tempo valem e onde a chave privada fica.
- **Documentação do fisco.** Os manuais de orientação do contribuinte e as notas técnicas da NF-e, e os manuais do Sistema Nacional NFS-e: que certificado o fisco aceita e que rejeição ele devolve.
- **Convenção de mercado.** Prazos de alerta, "renove com um mês de antecedência", páginas de ajuda de emissores que explicam cada rejeição. Úteis, mas não são regra.
- **Decisão da empresa.** Quem guarda, quem troca, quem é avisado, qual certificado vale para qual estabelecimento. É essa camada que precisa estar escrita antes de programar.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é sugestão de modelagem, não requisito de norma nem comportamento padrão de ferramenta.

## Onde este artigo termina e começam os outros

- **Assinatura de contratos.** Pessoas assinando documentos, com status de cada assinatura, está em [assinatura eletrônica no sistema](https://tornostudio.com/blog/assinatura-eletronica-sistema-status-documento-aceite/). Aqui é o sistema assinando sozinho, em nome da empresa.
- **Login dos usuários.** Senha e segundo fator estão em [autenticação em dois fatores](https://tornostudio.com/blog/autenticacao-dois-fatores-sistema-requisitos-aceite/). Aqui, o certificado não é login de pessoa, é a identidade da empresa diante do fisco.
- **Conteúdo da nota.** Campos, tributos e regras de validação de conteúdo estão em [NF-e na reforma tributária](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/) e no artigo de NFS-e. Aqui entram só as rejeições de certificado e de assinatura.
- **Certificados de banco.** A integração com o banco tem credenciais próprias, citadas em [boleto pelo sistema](https://tornostudio.com/blog/boleto-sistema-remessa-retorno-cnab-aceite/). Aqui eles só aparecem como linha do cadastro.

## A1 e A3: o que muda para um sistema em servidor ou na nuvem

O DOC-ICP-04, que fixa os requisitos mínimos dos certificados da ICP-Brasil, separava os tipos pela mídia onde a chave privada fica. Na versão 7.2, de 2020, que ainda listava o A1, a [chave do A1 ficava em repositório protegido por senha, cifrado por software, com validade máxima de 1 ano; a do A3, em hardware criptográfico homologado, com validade máxima de 5 anos](https://mailman.iti.gov.br/images/repositorio/legislacao/documentos-principais/04/DOC-ICP-04_-_v.7.2_-_REQUISITOS_MINIMOS_PARA_PC.pdf). O glossário do ITI descreve o [token como dispositivo USB para armazenar o certificado e o cartão inteligente como cartão com microchip](https://www.gov.br/iti/pt-br/centrais-de-conteudo/glossario).

Na prática, para quem compra um sistema:

- **A1.** É um arquivo, em geral no formato PKCS#12, que guarda a chave privada e o certificado cifrados com uma senha; a especificação descreve esse [modo de privacidade por senha](https://www.rfc-editor.org/rfc/rfc7292). Um sistema em servidor ou na nuvem consegue usá-lo sem ninguém por perto. É por isso que é comum em emissão automática. E é por isso que o arquivo e a senha, juntos, são a empresa: quem tem os dois assina em nome dela.
- **A3.** A chave fica num hardware: token, cartão ou HSM. O token na mesa do financeiro não serve a um sistema na nuvem que emite nota às 3h da manhã. As saídas são um HSM da própria empresa ou a guarda da chave por um terceiro. A versão 8.3 do DOC-ICP-04 só permite a [guarda de chaves privadas por terceiros em hardware criptográfico por entidade credenciada como prestador de serviço de confiança (PSC) ou, para chaves de funcionários, em soluções corporativas com HSM da própria instituição, acesso só pela rede interna e concordância expressa do titular](https://www.gov.br/iti/pt-br/assuntos/legislacao/resolucoes/resolucoes-old/Resolucao179_DOCICP04_8.3_compilada.pdf) (item 6.1.1.8). Para o sistema, isso vira uma integração com o serviço que guarda a chave, com autenticação, disponibilidade e prazo de sessão próprios.

As perguntas para o fornecedor são as mesmas nos dois casos: a emissão automática funciona sem uma pessoa digitar PIN a cada nota? O que acontece quando o serviço que guarda a chave está fora? Quanto tempo a assinatura leva por nota no pico do faturamento? Com A3 numa máquina local, quem liga a máquina depois de uma queda de energia?

### O que a Resolução nº 211/2024 muda

O Comitê Gestor da ICP-Brasil reorganizou os tipos de certificado. A Resolução nº 211, de 31/10/2024, [criou o selo eletrônico em software e em hardware (SE-S e SE-H) e os certificados de aplicações específicas (AE-S e AE-H), e extinguiu os certificados de assinatura dos tipos A1 e A2](https://www.normasbrasil.com.br/norma/resolucao-211-2024_468443.html) (arts. 2º e 3º). Ela também traz regras de transição:

- certificados A1, A2, A3 e outros [poderão ser emitidos e utilizados na cadeia V5 durante toda a sua vigência, até 02 de março de 2029](https://www.normasbrasil.com.br/norma/resolucao-211-2024_468443.html) (art. 13);
- A1 e A3 poderão ser emitidos na cadeia V10 [até 31 de dezembro de 2026, para uso restrito em aplicações específicas](https://www.normasbrasil.com.br/norma/resolucao-211-2024_468443.html) (art. 14);
- é vedado usar o selo eletrônico com propósito de assinatura que expresse a vontade da pessoa jurídica (art. 4º).

Li o texto numa reprodução do portal Normas Brasil; o repositório do ITI não abriu nesta pesquisa. A [lista de resoluções do ITI](https://www.gov.br/iti/pt-br/assuntos/legislacao/resolucoes) não mostra, pelas ementas, norma posterior que mude essas datas, mas não li o texto de todas. Do lado do fisco, o manual da NF-e mais recente que consegui abrir, o da NF-e de alienação de bens imóveis (modelo 77), de agosto de 2026, ainda fala em [certificado tipo A1 ou A3, com o CNPJ da pessoa jurídica titular](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Visao-Geral-v1.00a.pdf). Não encontrei documento do fisco dizendo se e quando os novos tipos passam a valer para emitir nota. Fornecedores de software fiscal também tratam o assunto como [adaptação em aberto](https://blog.tecnospeed.com.br/resolucao-cg-icp-brasil-no-211-novos-certificados-digitais-e-extincao-dos-modelos-a1-e-a2/).

O que isso pede do sistema, sem adivinhar o futuro:

- **Não amarrar o código ao nome "A1".** O sistema lê do próprio certificado o titular, o CNPJ, a validade, a cadeia e o uso de chave, e decide por isso, não por um campo "tipo" digitado.
- **Testar cada certificado novo antes de ativar.** Na próxima renovação, pergunte à autoridade certificadora que tipo de certificado e de cadeia você vai receber, e teste esse certificado no ambiente de homologação do fisco antes de colocá-lo em produção.
- **Acompanhar as notas técnicas.** Quem mantém o sistema acompanha as notas técnicas da NF-e e da NFS-e sobre certificado, e a empresa sabe quem faz isso.

## Onde o certificado fica guardado e quem acessa

A MP nº 2.200-2/2001 diz que a chave privada de assinatura é de [exclusivo controle, uso e conhecimento](https://planalto.gov.br/ccivil_03/mpv/Antigas_2001/2200-2.htm) do titular (art. 6º, parágrafo único). Para pessoa jurídica, o DOC-ICP-04 diz que o [representante legal indica o responsável pela geração e pelo uso](https://www.gov.br/iti/pt-br/assuntos/legislacao/resolucoes/resolucoes-old/Resolucao179_DOCICP04_8.3_compilada.pdf) (item 6.1.1.1). Quem é esse responsável, e o que isso significa para a empresa, é assunto do advogado. Para o sistema, a consequência é prática: o certificado não pode estar ao alcance de qualquer um.

Lugares onde ele não deveria estar:

- numa pasta compartilhada da rede, com a senha num arquivo de texto ao lado;
- no repositório de código do sistema, ou num arquivo de configuração copiado entre ambientes;
- no e-mail de quem comprou, encaminhado ao fornecedor e ao contador;
- instalado no computador de uma pessoa, que precisa estar ligado para a nota sair.

Recomendação da Torno para um certificado A1 usado pelo sistema:

- **Cofre de segredos.** O arquivo e a senha ficam num cofre de segredos do ambiente, cifrados, separados entre si, e só o serviço de emissão lê os dois. Nenhuma tela do sistema mostra a senha nem permite baixar o arquivo de volta.
- **Carga por tela própria.** Quem troca o certificado carrega o arquivo e digita a senha numa tela do sistema, que valida tudo na hora (veja adiante). O arquivo não passa por e-mail nem por chat.
- **Dois papéis.** Quem carrega não é quem ativa. O responsável fiscal carrega e testa; outra pessoa autorizada aprova a ativação. As regras de perfil seguem as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/), e a tela de carga pede o segundo fator mesmo para quem já está logado.
- **Ambientes separados.** O certificado de produção não é copiado para o ambiente de teste do sistema. Teste com homologação do fisco usa o próprio certificado da empresa, mas a partir de um ambiente com os mesmos cuidados, ou com um certificado de teste quando houver.
- **Backup e descarte.** O cofre entra no backup, e a [prova de restauração](https://tornostudio.com/blog/prova-restauracao-backup-software/) inclui o certificado: sistema restaurado sem certificado não emite. Certificado substituído e vencido é apagado do cofre num prazo escrito; os dados de identificação ficam no cadastro.
- **Fornecedor.** Se o fornecedor do sistema tem acesso ao cofre, isso está escrito no contrato, com o que acontece quando ele sai. Na [passagem técnica entre fornecedores](https://tornostudio.com/blog/troca-fornecedor-software-passagem-tecnica/), certificado e senha são itens da lista, e a recomendação é trocar a senha do cofre na saída.

Com A3 em HSM ou guardado por terceiro, a lógica é a mesma, trocando arquivo e senha por credencial de acesso ao serviço que guarda a chave.

![Ilustração de um cofre de segredos aberto, visto de frente, com o certificado CERT-2027 da Distribuidora Exemplo de Ferramentas Ltda. Dentro do cofre, duas gavetas separadas: na gaveta 1, o arquivo A1, no formato PKCS#12, cifrado; na gaveta 2, a senha, cifrada à parte, nunca no mesmo lugar. Ao lado, uma etiqueta com o cadastro lido do certificado: titular, matriz; CNPJ raiz fictício; série terminando em 9C41; válido de 09/12/2026, 10h05, até 09/12/2027, 10h05, horário de Brasília; usado em NF-e da matriz e da filial, distribuição de DF-e e NFS-e da matriz. Abaixo, quem tem cada chave, com uma chave desenhada para cada papel: serviço de emissão, lê arquivo e senha para assinar e transmitir e funciona sem pessoa por perto; responsável fiscal, carrega arquivo e senha na tela de carga, com segundo fator, e não pode baixar; diretor, aprova a ativação depois do teste e vê só o cadastro; TI, agenda a troca e vê o registro, sem ver a senha. Uma faixa vermelha diz o que ninguém faz: baixar o arquivo de volta, ver a senha, copiar o certificado para outro ambiente. Em seguida, fora do cofre, quatro lugares a evitar, cada um marcado com um X vermelho: pasta compartilhada com senha.txt ao lado; e-mail encaminhado ao fornecedor e ao contador; repositório de código ou arquivo de configuração; computador de uma pessoa, que precisa estar ligado. No fim, num sistema na nuvem: A1, arquivo e senha no cofre, emissão sem pessoa; A3 em token, na mesa de alguém, não serve a servidor na nuvem; A3 em HSM, próprio ou guardado por prestador credenciado, com integração, autenticação e disponibilidade próprias. Exemplo fictício.](./torno-certificado-cofre-chaveiro.svg)

*Exemplo fictício: empresa, certificado, número de série, datas e papéis inventados. O arquivo e a senha ficam separados no cofre, só o serviço de emissão lê os dois, e cada pessoa tem uma chave que faz uma coisa só. Ilustração original Torno, 2026.*

## Um cadastro para cada certificado

Recomendação da Torno: um cadastro de certificados no sistema, preenchido a partir do próprio certificado na carga, e não digitado:

- **Titular e CNPJ.** Nome e CNPJ lidos do certificado; o CNPJ-base (os oito primeiros caracteres) calculado a partir dele. O campo precisa aceitar o formato com letras, como em [CNPJ alfanumérico](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/).
- **Identificação.** Número de série, autoridade certificadora emissora, tipo e cadeia, como aparecem no certificado.
- **Validade.** Início e fim, com data, hora e fuso. O certificado traz o instante exato; o sistema mostra no horário de Brasília e calcula os alertas pelo mesmo relógio, como em [datas, fusos e prazos](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/). Um servidor com relógio errado pode achar válido o que já venceu, ou o contrário.
- **Uso.** Para quais serviços e estabelecimentos o certificado está ativo: NF-e da matriz, NF-e da filial, distribuição, NFS-e, outros.
- **Situação.** Em teste, ativo, reserva, vencido, revogado, apagado.
- **Responsáveis.** Quem carregou, quem aprovou, quem recebe os alertas.

Certificados de banco e de outros serviços entram no mesmo cadastro, mesmo que não sejam ICP-Brasil: o que importa é que ninguém seja surpreendido por um vencimento.

## Matriz, filial e certificado de outra empresa

O fisco compara o CNPJ-base, não o CNPJ inteiro, em pelo menos três lugares que consegui conferir:

- **Assinatura da NF-e.** O Anexo I do manual da NF-e de alienação de bens imóveis, de agosto de 2026, traz a regra de rejeição [213 "CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital"](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Anexo-I-Leiaute-e-RV-v1.00a.pdf), quando o certificado tem CNPJ; para certificado de pessoa física, a comparação é pelo CPF. A mesma regra, com o mesmo texto, aparece para a NF-e e a NFC-e (modelos 55 e 65) na [Nota Técnica 2026.001 v1.02b](https://www.reformatributaria.com/wp-content/uploads/2026/07/NT_2026.001_v1.02b-PAA-NFe.pdf), que cria uma exceção: a nota emitida por um Provedor de Assinatura e Autorização (PAA), opção para MEI, produtor rural e parte do Simples Nacional, é assinada com o certificado do PAA.
- **Distribuição de DF-e.** A Nota Técnica 2014.002 v1.40 diz que a consulta é [permitida para qualquer estabelecimento da empresa com o mesmo CNPJ-base do certificado, e rejeitada com 593 "CNPJ-Base consultado difere do CNPJ-Base do Certificado Digital"](https://www.reformatributaria.com/wp-content/uploads/2026/07/NT2014.002_v1.40-WsNFeDistribuicaoDFe-CNPJ-alfa.pdf) quando não é.
- **NFS-e nacional.** As APIs do ADN aceitam, na consulta, [certificado cujo CNPJ tenha o mesmo CNPJ raiz do contribuinte](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-apis-adn-sistema-nacional-nfse.pdf). Já o emissor público só devolve certos dados se o certificado da conexão for de um dos atores da nota. Emissores municipais próprios têm regras próprias.

O que isso significa:

- **Matriz e filiais.** Um certificado de qualquer estabelecimento passa nas regras de CNPJ-base para os outros estabelecimentos da mesma empresa. Se a empresa usa um certificado para todos ou um por estabelecimento é decisão dela, com o contador; o sistema precisa saber qual certificado usar para cada estabelecimento e cada serviço.
- **Outra empresa do grupo.** CNPJ-base diferente é outra empresa, e precisa do seu próprio certificado. Num sistema que atende várias empresas, o certificado de uma não pode ser escolhido para emitir pela outra, nem por engano, como no [isolamento entre empresas](https://tornostudio.com/blog/sistema-multiempresa-isolamento-dados-aceite/). Recomendação da Torno: a tela de carga recusa o certificado cujo CNPJ-base não seja de uma empresa cadastrada, e a ativação só oferece os estabelecimentos dessa mesma empresa.
- **Contador ou terceiro que transmite.** O manual diz que o certificado de transmissão identifica quem transmite e [não precisa ser o emitente](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Visao-Geral-v1.00a.pdf); o de assinatura precisa ter o CNPJ do emitente (a exceção é a emissão por PAA, citada acima, fora do escopo deste artigo). Se outra empresa transmite, o sistema precisa guardar dois certificados com papéis diferentes. Confirme no manual do modelo que você emite.

## Alerta de vencimento antes de parar a emissão

O A1 dura no máximo um ano. A conta é simples, e mesmo assim a emissão pode parar porque o aviso foi para o e-mail de quem saiu da empresa. O alerta precisa de regras escritas:

- **De onde vem a data.** Do certificado ativo, lido pelo sistema, não de um campo digitado nem de uma planilha. O alerta é do certificado que está em uso para cada serviço; se a troca aconteceu, os alertas do antigo param e os do novo começam.
- **Quando avisar.** Recomendação da Torno: a primeira janela com tempo para comprar, validar a identidade do responsável na autoridade certificadora, receber, testar e ativar; e janelas mais curtas depois. No exemplo adiante, 45, 30, 15, 7 e 1 dia antes. Prazos curtos para uma empresa com uma pessoa só no fiscal são prazos curtos demais.
- **Para quem.** Uma função, não uma pessoa: o responsável fiscal, quem aprova a compra e a TI. Se a janela de 15 dias passa sem certificado novo em teste, o aviso sobe para a direção.
- **Por onde.** Pelo mesmo canal dos outros alertas críticos, com confirmação de leitura, como em [monitoramento de software](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/). Um aviso só no painel do sistema não basta: ninguém abre o painel para ver se vai acontecer alguma coisa.
- **O que aparece no aviso.** Qual certificado, de qual empresa, que serviços ele atende, o instante exato do vencimento em horário de Brasília e o que fazer.
- **Outros estados.** Revogação também para a emissão. A SEFAZ confere a lista de certificados revogados; o sistema não precisa repetir isso a cada nota, mas uma rejeição por certificado revogado vira alerta crítico, não erro de nota.

## Trocar o arquivo e a senha sem parar a operação

O certificado novo é válido assim que é emitido; o antigo continua válido até vencer. Essa sobreposição é o que permite trocar sem parar. Recomendação da Torno para o fluxo:

1. **Carga.** O responsável fiscal carrega o arquivo e digita a senha. O sistema, na hora: abre o arquivo com a senha (senha errada para aqui, sem tocar no que está em produção); lê titular, CNPJ, validade, cadeia e uso de chave; recusa certificado vencido, ainda não válido, sem CNPJ, de CNPJ-base que não seja de uma empresa cadastrada, ou sem a chave privada; e mostra o resumo para conferência. O certificado entra como "em teste".
2. **Teste.** Com o certificado em teste, o sistema emite no ambiente de homologação do fisco uma nota de cada estabelecimento e cada serviço que o certificado vai atender, e faz uma consulta de distribuição. O resultado fica guardado. Os cuidados com o ambiente estão em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/).
3. **Aprovação.** Outra pessoa autorizada vê o resumo e o resultado do teste e aprova a ativação, com data e hora.
4. **Ativação.** Num horário escrito, fora do pico de emissão, o sistema passa a usar o novo para os serviços escolhidos. Notas que estavam sendo assinadas terminam com o antigo; as seguintes usam o novo. Nenhuma nota fica no meio.
5. **Observação.** A primeira nota de cada serviço com o certificado novo é conferida, e o sistema mostra qual certificado assinou cada nota.
6. **Reserva e volta.** O antigo fica como reserva até vencer. Se o novo falhar em produção, uma pessoa autorizada volta ao antigo com um clique, como num [plano de rollback](https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/), e isso fica registrado.
7. **Descarte.** Depois do vencimento, o arquivo e a senha do antigo saem do cofre; o cadastro e o histórico ficam.

A senha merece cuidado próprio. Trocar só a senha de um arquivo A1 gera, na prática, um arquivo novo; o sistema trata isso como uma nova carga, com o mesmo teste. E senha nunca é atualizada só no cofre, sem passar pela tela, porque aí ninguém sabe se ela abre o arquivo até a próxima nota falhar.

## Quando a nota não sai: falha local, conexão ou rejeição

Uma nota que não foi autorizada pode ter parado em três lugares, e o que fazer depende de qual:

- **Falha local.** O sistema não conseguiu assinar: senha errada, arquivo corrompido, certificado vencido pelo relógio do servidor, certificado de outra empresa, serviço do HSM fora. Nada foi enviado ao fisco. É erro de configuração; a nota fica aguardando, e repetir não resolve.
- **Falha na conexão.** A assinatura foi feita, mas a conexão TLS com o fisco não completou. O manual diz que as primeiras validações do certificado de transmissão (existência, validade, cadeia, lista de revogados e revogação) [são feitas pelo próprio protocolo TLS](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Anexo-I-Leiaute-e-RV-v1.00a.pdf). Por isso, um certificado de transmissão vencido pode aparecer como erro de conexão, sem código de rejeição, e não como uma rejeição com número. A mesma falha de conexão também acontece com rede instável ou serviço do fisco fora, e por isso o sistema registra o detalhe técnico do erro, como em [erro intermitente](https://tornostudio.com/blog/erro-intermitente-software-evidencias/).
- **Rejeição da SEFAZ.** A conexão completou, e o fisco devolveu um código. Os de certificado e de assinatura são uma família própria e não têm nada a ver com o conteúdo da nota.

Os códigos abaixo estão no [Anexo I do manual da NF-e de alienação de bens imóveis, versão 1.00a, de agosto de 2026](https://www.reformatributaria.com/wp-content/uploads/2026/08/MOC-NFe-ABI-Anexo-I-Leiaute-e-RV-v1.00a.pdf), o que consegui abrir. Páginas de ajuda de emissores mostram os mesmos números e textos para a NF-e comum, por exemplo a [281](https://ajuda.omie.com.br/pt-BR/articles/6633173-281-rejeicao-certificado-transmissor-data-validade) e a [280](https://buscadorncm.com.br/nfe/rejeicoes/280). Para a NF-e modelo 55, só confirmei em documento do fisco a 213, na Nota Técnica 2026.001; os demais códigos não. Confirme no Anexo I do manual do modelo e da versão que o seu sistema implementa.

| Código | Texto da rejeição | O que aconteceu |
|---|---|---|
| 280 | Certificado Transmissor inválido | Certificado da conexão ausente, de versão errada, emitido para uma autoridade certificadora em vez de para o titular, ou sem uso para autenticação de cliente |
| 281 | Certificado Transmissor Data Validade | Certificado da conexão fora da validade |
| 282 | Certificado Transmissor sem CNPJ/CPF | Certificado da conexão sem a identificação do titular |
| 283 | Certificado Transmissor - erro Cadeia de Certificação | Cadeia do certificado da conexão não reconhecida |
| 284 | Certificado Transmissor revogado | Certificado da conexão revogado |
| 285 | Certificado Transmissor difere ICP-Brasil | Certificado da conexão fora da ICP-Brasil |
| 286 | Certificado Transmissor erro no acesso a LCR | Lista de revogados do certificado da conexão inacessível ou inválida |
| 290 a 296 | Certificado Assinatura inválido, Data Validade, sem CNPJ/CPF, erro Cadeia de Certificação, revogado, difere ICP-Brasil, erro no acesso a LCR | Os mesmos problemas, no certificado que assinou o XML |
| 297 | Assinatura difere do calculado | O XML foi alterado depois de assinado, ou a assinatura foi calculada errado |
| 298 | Assinatura difere do padrão do Sistema | A assinatura não segue o padrão exigido |
| 213 | CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital | Certificado de outra empresa |
| 593 (distribuição de DF-e) | CNPJ-Base consultado difere do CNPJ-Base do Certificado Digital | Consulta de outra empresa com este certificado |

O que precisa estar escrito:

- **Classificação.** O sistema classifica cada falha como local, conexão, certificado, assinatura ou conteúdo da nota, e mostra isso ao usuário em linguagem de gente: "o certificado da matriz venceu às 16h20", não "erro 281".
- **Quem é avisado.** Falha de conteúdo vai para quem emitiu a nota. Falha de certificado vai para quem cuida do certificado, como alerta crítico, porque vai acontecer de novo na próxima nota.
- **Repetição.** Falha de conexão pode ser repetida algumas vezes, com intervalo; falha local, de certificado e de assinatura, não: repetir só enche a fila.
- **Bloqueio antes de enviar.** Recomendação da Torno: o sistema confere a validade do certificado antes de assinar e não manda ao fisco nota assinada com certificado vencido pelo seu próprio relógio.
- **297 depois de mexer no XML.** Rejeição 297 depois de uma atualização do sistema costuma indicar que algum passo altera o XML depois de assinar. É defeito do sistema, não do certificado.

![Ilustração de uma árvore de diagnóstico em três níveis, de cima para baixo, para a Distribuidora Exemplo de Ferramentas Ltda., que começa em: a NF-e não foi autorizada. Primeiro nível, no sistema: o sistema abriu o certificado e assinou? Se não, falha local: senha errada, arquivo corrompido, vencido pelo relógio do servidor, CNPJ-base de outra empresa, serviço do HSM fora; nada foi enviado à SEFAZ; não repetir; alerta a quem cuida do certificado. Se sim, segundo nível, na rede: a conexão TLS com a SEFAZ completou? Se não, conexão sem código: certificado de transmissão recusado pelo próprio protocolo, cadeia não reconhecida, rede instável ou SEFAZ fora; guardar o detalhe técnico; repetir com intervalo e alertar se persistir. Se sim, terceiro nível, na SEFAZ: que código voltou? Cinco folhas: 280 a 286, certificado de transmissão, alerta crítico, não repetir; 290 a 296, certificado de assinatura, alerta crítico, não repetir; 297 e 298, assinatura fora do padrão ou alterada, defeito do sistema, chamado à TI; 213 e 593, CNPJ-base de outra empresa, o 593 na distribuição de DF-e, bloquear; outros códigos, conteúdo da nota, vai para quem emitiu, fora deste artigo. No rodapé: códigos do Anexo I do manual da NF-e modelo 77, versão de agosto de 2026; confirme no manual do modelo e da versão que o seu sistema implementa. Exemplo fictício.](./torno-certificado-arvore-falha.svg)

*Exemplo fictício: a árvore é uma recomendação de modelagem; os códigos vêm do Anexo I do manual da NF-e de alienação de bens imóveis (modelo 77), de agosto de 2026, e precisam ser conferidos no manual do modelo e da versão que o seu sistema implementa. Ilustração original Torno, 2026.*

## O que fica registrado

Cada passo do certificado guarda quem, quando e o quê: carga, com o resultado das validações; teste em homologação, com as respostas do fisco; aprovação; ativação, com os serviços e estabelecimentos; volta ao anterior; descarte; cada alerta enviado e quem o leu. O que um registro desses precisa ter está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

E, em cada nota e evento, o número de série do certificado que assinou e o do que transmitiu. Quando alguém perguntar, meses depois, com que certificado uma nota foi assinada, a resposta está na nota, não na memória de alguém.

O registro nunca guarda a senha nem o conteúdo do arquivo.

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Quem é o responsável pelo uso do certificado da pessoa jurídica | Representante legal, com o advogado |
| A1 ou A3, e onde a chave fica (cofre, HSM próprio, guarda por terceiro) | Direção e TI, com o fornecedor do sistema |
| Um certificado para todos os estabelecimentos ou um por estabelecimento | Fiscal, com o contador |
| Quais serviços cada certificado atende (NF-e, distribuição, NFS-e, outros) | Fiscal e TI |
| Quem carrega, quem aprova, quem ativa, quem volta ao anterior | Direção, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |
| Acesso do fornecedor do sistema ao cofre | Direção e TI, no contrato |
| Janelas de alerta, destinatários e escalonamento | Fiscal e TI |
| Compra e renovação do certificado | Fiscal e financeiro |
| Horário da troca e conferência da primeira nota | Fiscal, com TI |
| Prazo para apagar certificado substituído | TI, com o advogado |
| Classificação das falhas e o que repetir automaticamente | TI, com o fiscal |
| Acompanhamento das notas técnicas sobre certificado | Fornecedor do sistema ou TI, com o fiscal |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Exemplo de Ferramentas Ltda. tem matriz e uma filial em outro estado, com o mesmo CNPJ-base. O sistema, na nuvem, emite NF-e para as duas, consulta a distribuição de DF-e para as duas e emite NFS-e de assistência técnica para a matriz. A Exemplo Serviços Técnicos Ltda., do mesmo grupo, tem CNPJ-base diferente e usa o mesmo sistema.

Regras da empresa (escolhas do exemplo):

- **Certificado.** Um e-CNPJ A1 da matriz, usado para assinar e transmitir em todos os serviços da matriz e da filial. A Exemplo Serviços tem o seu.
- **Guarda.** Arquivo e senha no cofre de segredos do ambiente; carga pela tela própria, com segundo fator.
- **Papéis.** Responsável fiscal carrega e testa; diretor aprova; TI agenda a ativação; serviço de emissão é o único que lê arquivo e senha.
- **Alertas.** 45, 30, 15, 7 e 1 dia antes, para o responsável fiscal, o diretor e a TI; sem certificado novo em teste na janela de 15 dias, aviso à direção por telefone.
- **Troca.** Ativação às 6h30, antes do faturamento; o antigo fica como reserva até vencer e é apagado no dia seguinte ao vencimento.

O certificado em uso, CERT-2026, tem número de série terminando em 7F3A e vale de 14/01/2026, 16h20, a **quinta-feira, 14/01/2027, 16h20** (horário de Brasília).

**Segunda, 30/11/2026 (45 dias antes).** O sistema manda o primeiro alerta. O diretor autoriza a compra no mesmo dia.

**Quarta, 09/12.** A autoridade certificadora emite o CERT-2027, série terminando em 9C41, válido de 09/12/2026, 10h05, a 09/12/2027, 10h05. Antes de comprar, o fiscal perguntou que tipo e que cadeia o certificado teria, e anotou a resposta no cadastro.

**Quarta, 09/12, à tarde.** O responsável fiscal carrega o arquivo. Na primeira tentativa, digita a senha errada; o sistema recusa, e nada muda em produção. Na segunda, o sistema abre o arquivo, lê o titular e o CNPJ da matriz, confirma o CNPJ-base, a validade e a cadeia, e o CERT-2027 entra como "em teste". No ambiente de homologação, uma NF-e da matriz e uma da filial são autorizadas, a consulta de distribuição das duas responde, e a NFS-e da matriz é emitida no ambiente de produção restrita.

**Quinta, 10/12.** O diretor vê o resumo e os testes e aprova. A TI agenda a ativação para segunda, 14/12, às 6h30.

**Segunda, 14/12.** Às 6h30, o CERT-2027 passa a ativo em todos os serviços; o CERT-2026 vira reserva. A primeira NF-e da matriz é autorizada às 6h52, a da filial às 7h10, a consulta de distribuição das 7h00 responde, e a primeira NFS-e sai às 9h15. Os alertas do CERT-2026 param; o próximo alerta do sistema é o do CERT-2027, em 25/10/2027.

**Terça, 15/12 (30 dias antes do vencimento do antigo).** Nenhum alerta é enviado: o CERT-2026 não está mais em uso.

**Sexta, 15/01/2027.** O CERT-2026 venceu às 16h20 da véspera. O arquivo e a senha saem do cofre; o cadastro e o histórico ficam.

![Ilustração de uma linha do tempo horizontal, do fim de novembro de 2026 a meados de janeiro de 2027, horário de Brasília, com dois trilhos de validade da Distribuidora Exemplo de Ferramentas Ltda. Trilho de cima, CERT-2026, série terminando em 7F3A: barra azul até a segunda-feira 14/12; dali em diante, barra hachurada de reserva, com a nota volta com um clique, até o marcador vermelho vence, 14/01, 16h20. Sobre ele, cinco marcadores de alerta: D−45, em 30/11, enviado; D−30, D−15, D−7 e D−1, em 15/12, 30/12, 07/01 e 13/01, riscados, cancelados porque o certificado saiu de uso. Trilho de baixo, CERT-2027, série terminando em 9C41: barra verde que começa em 09/12 e segue além do quadro. Uma seta grossa em 14/12 desce do trilho de cima para o de baixo, marcando a ativação. Uma faixa amarela entre 09/12 e 14/01 diz: os dois válidos, dá para trocar sem parar. Quatro eventos numerados, explicados abaixo: 1, quarta 09/12, CERT-2027 emitido às 10h05; carga com senha errada recusada, sem mudança em produção; com a senha certa, entra em teste; homologação de NF-e da matriz e da filial, distribuição de DF-e e NFS-e. 2, quinta 10/12, diretor aprova a ativação e a TI agenda. 3, segunda 14/12, às 6h30, CERT-2027 ativo e CERT-2026 em reserva; primeiras notas às 6h52, matriz, e 7h10, filial. 4, sexta 15/01, o CERT-2026 venceu na véspera às 16h20; arquivo e senha saem do cofre, o cadastro fica. No rodapé, próximo alerta: segunda 25/10/2027, 45 dias antes do vencimento do CERT-2027, em 09/12/2027, 10h05. Exemplo fictício.](./torno-certificado-linha-validade.svg)

*Exemplo fictício: certificados, números de série, datas, horários e janelas de alerta inventados. O certificado novo é testado e ativado enquanto o antigo ainda vale, e o antigo fica de reserva até vencer. Ilustração original Torno, 2026.*

Monte os cenários num ambiente de teste do sistema, com o ambiente de homologação do fisco e um relógio que possa ser adiantado, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/). As rejeições que o fisco não gera sob demanda são simuladas com respostas de teste preparadas à mão.

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Carga do CERT-2027 com senha errada | Recusada; nada muda em produção; tentativa registrada | Mensagem e registro |
| Carga do CERT-2027 com a senha certa | Titular, CNPJ, CNPJ-base, série 9C41, validade 09/12/2026 10h05 a 09/12/2027 10h05 e cadeia lidos do certificado; situação "em teste" | Resumo da carga |
| Simulação: carga do certificado da Exemplo Serviços para a Distribuidora | Recusada: CNPJ-base de outra empresa | Mensagem e registro |
| Simulação: carga de certificado vencido ou ainda não válido | Recusada, com as datas | Mensagem |
| Simulação: carga de arquivo só com o certificado, sem a chave privada | Recusada | Mensagem |
| Tela de carga para usuário sem o perfil | Negada | Tentativa registrada |
| Tela de carga sem segundo fator | Pede o segundo fator antes de aceitar o arquivo | Tela |
| Qualquer tela ou exportação do sistema | Nenhuma mostra a senha nem permite baixar o arquivo | Revisão das telas e da exportação |
| Teste em homologação com o CERT-2027 | NF-e da matriz e da filial autorizadas; distribuição das duas respondida; NFS-e emitida em produção restrita | Respostas guardadas |
| Ativação sem aprovação | Impossível; o botão só aparece depois da aprovação de outra pessoa | Tela e registro |
| Ativação em 14/12 às 6h30 | CERT-2027 ativo em todos os serviços; CERT-2026 em reserva; nenhuma nota assinada pela metade | Cadastro e lista de notas |
| Primeira NF-e da matriz e da filial depois da troca | Autorizadas; cada nota mostra a série 9C41 como certificado que assinou e transmitiu | Notas e registro |
| Simulação: falha do CERT-2027 em produção | Volta ao CERT-2026 por pessoa autorizada; notas seguintes assinadas com 7F3A; volta registrada | Registro e notas |
| Alertas depois da troca | Alertas do CERT-2026 cancelados; próximo alerta do CERT-2027 em 25/10/2027 | Agenda de alertas |
| Simulação: sem troca, relógio de teste em 30/11/2026 | Alerta de 45 dias para fiscal, diretor e TI, com certificado, serviços e vencimento em 14/01/2027 16h20 | Alerta recebido |
| Simulação: sem troca, relógio em 30/12/2026, sem certificado em teste | Alerta de 15 dias e aviso à direção | Alertas |
| Simulação: sem troca, relógio em 14/01/2027 às 16h21 | Sistema não assina; notas ficam aguardando certificado; alerta crítico; nenhuma nota enviada ao fisco | Fila e alerta |
| Simulação: servidor com relógio 3 horas atrasado | Diferença de relógio detectada e alertada | Alerta |
| Simulação: resposta 281 do fisco | Classificada como certificado de transmissão; mensagem "o certificado da matriz está fora da validade"; alerta crítico; sem nova tentativa automática | Mensagem, alerta e fila |
| Simulação: resposta 294 do fisco | Classificada como certificado revogado; emissão bloqueada para esse certificado; alerta à direção | Alerta e cadastro |
| Simulação: resposta 297 depois de uma atualização | Classificada como defeito de assinatura do sistema; chamado à TI; nota não é reenviada igual | Chamado e registro |
| Simulação: resposta 213 | Classificada como certificado de outra empresa; emissão bloqueada; conferência do cadastro | Alerta e registro |
| Simulação: consulta de distribuição da Exemplo Serviços com o certificado da Distribuidora | Impedida pelo sistema antes de enviar; se enviada, a resposta 593 é classificada como certificado de outra empresa | Registro |
| Simulação: falha de conexão TLS sem código | Classificada como conexão; até três novas tentativas com intervalo; detalhe técnico guardado; alerta se persistir | Registro e alerta |
| Simulação: falha de conteúdo da nota (rejeição que não é de certificado) | Vai para quem emitiu; nenhum alerta de certificado | Fila de notas |
| Restauração do ambiente a partir do backup | Sistema restaurado emite com o CERT-2027 em homologação | Prova de restauração |
| Descarte em 15/01/2027 | Arquivo e senha do CERT-2026 fora do cofre; cadastro e histórico preservados | Cofre e cadastro |
| Histórico do CERT-2027 | Carga, senha errada, teste, aprovação, agendamento, ativação e alertas, com autor e horário | Trilha do certificado |

*Fim do exemplo fictício. Distribuidora, filial, empresa do grupo, certificados, números de série, datas, horários, alertas, papéis e decisões são modelo editorial, sem cliente real, certificado real nem sistema entregue; as escolhas do exemplo são da empresa fictícia, não prazos recomendados para todo caso, orientação jurídica ou fiscal nem comportamento padrão de autoridade certificadora, SEFAZ ou ferramenta.*

Antes de aceitar, faça um inventário de verdade: quantos certificados a empresa tem, de quais CNPJs, onde cada um está hoje, quem sabe cada senha, quando cada um vence e quais serviços parariam se ele vencesse amanhã. Essa lista, sozinha, pode já mostrar o próximo problema.

Se a emissão fiscal for um módulo ligado ao ERP atual, veja o que reunir em [integração com ERP](https://tornostudio.com/blog/integracao-erp-briefing-orcamento/).

## Perguntas frequentes

### O certificado digital A1 vai acabar?

A Resolução CG ICP-Brasil nº 211/2024 extinguiu o tipo A1 e criou outros, mas manteve regras de transição: emissão e uso na cadeia V5 até 02/03/2029 e emissão na cadeia V10 até 31/12/2026, para uso restrito. O manual da NF-e mais recente que abri, o do modelo 77 (alienação de bens imóveis), ainda fala em A1 ou A3, e não achei documento do fisco que diga quando os novos tipos passam a valer para emitir nota. Por isso, a recomendação é construir o sistema para ler o certificado, e não o nome do tipo, e testar cada certificado novo em homologação antes de ativar.

### A1 ou A3 para emitir nota num sistema na nuvem?

Este artigo não recomenda um tipo. O A1 é um arquivo que o servidor usa sem pessoa por perto, e por isso exige cofre e controle de acesso sérios. O A3 guarda a chave em hardware; num servidor na nuvem, isso significa um HSM próprio ou a guarda da chave por um prestador credenciado, com integração, disponibilidade e custo próprios. Um token na mesa de alguém não atende emissão automática.

### Posso usar o certificado da matriz para emitir pelas filiais?

Pelas regras que consegui conferir, a NF-e, a distribuição de DF-e e as consultas do ADN da NFS-e comparam o CNPJ-base, que é o mesmo da matriz e das filiais. Se a empresa vai usar um certificado para todos é decisão dela, com o contador. O que não funciona é usar o certificado de outra empresa do grupo, com outro CNPJ-base. Municípios com emissor próprio podem ter regra diferente.

### O sistema pode renovar o certificado sozinho?

Não. A emissão de um certificado ICP-Brasil passa pela autoridade certificadora e pela identificação do responsável. O que o sistema faz é avisar a tempo, para quem pode agir, e tornar a troca segura: carga validada, teste, aprovação, ativação, volta e registro.

Para transformar o uso do certificado digital no seu sistema em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a lista de certificados que a empresa tem, onde cada um está guardado hoje e a mensagem de erro da última vez que um certificado vencido parou a emissão.

*Fontes consultadas em 24 de novembro de 2026: Medida Provisória nº 2.200-2/2001 (Planalto); Resolução CG ICP-Brasil nº 211/2024 (texto reproduzido por Normas Brasil; número, ementa e datas conferidos na lista de resoluções do ITI; o repositório do ITI com o texto integral não abriu nesta pesquisa); DOC-ICP-04 versões 8.3 (30/01/2025) e 7.2 (17/04/2020), no site do ITI; glossário do ITI; Manual de Orientação do Contribuinte da NF-e ABI, Visão Geral e Anexo I, versão 1.00a (agosto de 2026, cópias publicadas pelo portal Reforma Tributária); Nota Técnica 2014.002 v1.40 (julho de 2026, cópia publicada pelo portal Reforma Tributária); Nota Técnica 2026.001 v1.02b, do PAA (cópia publicada pelo portal Reforma Tributária); Sistema Nacional NFS-e, manuais dos contribuintes das APIs do ADN (v1.0, 12/02/2026) e do Emissor Público Nacional; RFC 7292 (IETF, julho de 2014); páginas de ajuda de emissores sobre as rejeições 280 e 281 e textos da TecnoSpeed sobre o A1 e a Resolução nº 211, como leitura de mercado. O Portal Nacional da NF-e e o Anexo I do MOC 7.00 da NF-e modelo 55 não abriram nesta pesquisa. Este artigo não recomenda autoridade certificadora nem fornecedor e não é orientação jurídica, contábil ou fiscal; empresas, certificados, números e ilustrações são fictícios.*
