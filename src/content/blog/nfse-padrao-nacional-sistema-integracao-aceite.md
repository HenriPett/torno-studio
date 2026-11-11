---
content_id: torno-artigo-pt-20261111-nfse-nacional
intent_id: buyer-nfse-national-standard-system-integration-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'NFS-e no padrão nacional: o que pedir e testar no sistema'
h1: 'NFS-e no padrão nacional: o que pedir e testar no sistema que emite a nota de serviço'
seo_title: 'NFS-e padrão nacional: o que pedir e testar no sistema | Torno'
seo_description: 'DPS, ADN, eventos, certificado, IBS/CBS e leiaute: o que pedir ao sistema que emite ou integra a NFS-e nacional e como testar, com critérios de aceite.'
summary: 'Roteiro para quem contrata ou mantém sistema que emite ou integra NFS-e: como funciona o Sistema Nacional (DPS, Sefin Nacional, ADN, DANFSe, produção restrita), os dois caminhos conforme o município, eventos de cancelamento, substituição e manifestação, certificado digital, campos de IBS e CBS sem entrar em tributação, atualização de leiaute e critérios de aceite com exemplo fictício.'
primary_question: O que pedir e testar no sistema que emite ou integra a NFS-e de padrão nacional, considerando o caminho do município, os eventos da nota, o certificado digital, os campos de IBS e CBS e as atualizações de leiaute?
proposed_path: /blog/nfse-padrao-nacional-sistema-integracao-aceite/
canonical_url: https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores de empresas de serviços que contratam ou mantêm sistema próprio, ERP ou integração que emite NFS-e ou se conecta a um emissor.
buyer_stage: Adequação e aceite de um sistema emissor de NFS-e já em uso ou em contratação.
scope: Componentes do Sistema Nacional NFS-e (DPS, NFS-e, Sefin Nacional, ADN, Emissor Nacional, DANFSe, APIs, produção restrita e produção); município que usa o emissor nacional e município com emissor próprio que compartilha com o ADN; identificação e reenvio da DPS; eventos de cancelamento, substituição e manifestação do tomador; certificado digital; distribuição de documentos pelo ADN; presença dos grupos de IBS e CBS e situação das notas técnicas; rotina de atualização de leiaute; critérios de aceite com exemplo fictício.
not_scope: Consultoria tributária; escolha de código de tributação, CST, cClassTrib ou alíquota; recomendação ou comparação de emissor, ERP ou fornecedor; parecer jurídico; NF-e de mercadorias (coberta em outro artigo); NFS-e Via em detalhe; leiaute campo a campo.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-11T11:26:28Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-11T11:38:43Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-11T11:42:46Z'
release_approval_evidence: 'Rotina agendada "Blogs SEO — manhã" de Henrique (escopo: commit e push editorial na main; autorização registrada em 04/11/2026 e atualizada em 07/11/2026), execução 2026-11-11-0815-claude; revisão factual independente NO-GO às 2026-11-11T11:38:43Z com seis correções obrigatórias (Resolução CGSN 189 revogada pela 191 e Simples obrigado desde 01/11/2026, regime da empresa além do município, MEI sem ICMS, redação do art. 62, lista de notas técnicas, legibilidade de uma figura) aplicadas na integração; revisão final independente do diff antes do push.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Cobre IBS e CBS na NF-e de mercadorias e a divisão de responsabilidades entre contador, fornecedor e operação; aqui não se repete.
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Detalha a adaptação do sistema ao CNPJ alfanumérico, que a NT 009 também leva aos campos da NFS-e.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Aprofunda o reenvio seguro, aplicado aqui à DPS reenviada depois de uma resposta perdida.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a confirmar que o teste aponta para a produção restrita, e não para a produção, antes de emitir notas de ensaio.
  - path: https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/
    reason: Ajuda a planejar a volta atrás quando uma nova versão de leiaute causa problema.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o registro de quem pediu cada emissão ou evento e quando.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como escrever cenário, resultado esperado e evidência.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar os municípios e fluxos de nota da empresa em escopo e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'Segundo material da Receita Federal (junho de 2026) que reproduz a LC 214/2025, art. 62, desde 01/01/2026 o município deve autorizar seus contribuintes a emitir a NFS-e de padrão nacional no ambiente nacional ou, se tiver emissor próprio, compartilhar os documentos fiscais eletrônicos gerados, conforme leiaute padronizado, com o ambiente de dados nacional da NFS-e; segundo o § 7º, o não atendimento implica a suspensão temporária das transferências voluntárias; no cenário de emissor próprio o contribuinte terá dois documentos fiscais autorizados e válidos para a mesma operação, e no cenário do emissor nacional há documento único com validade jurídica; a obrigatoriedade do emissor nacional para o Simples Nacional aparece como próximo passo, citando a Resolução CGSN nº 189/2026.'
    reference: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/5deg-modulo-cfc-rfb-obrigacoes-acessorias-documentos-fiscais-nfs-e-hermano.pdf
    entity: Receita Federal do Brasil, slides "Documentos Fiscais – NFS-e" (curso de reforma tributária, material de apoio)
    source_date: '2026-06-01'
    checked_at: '2026-11-11T11:05:00Z'
    limit: Apresentação, não texto legal; o texto da LC 214/2025 no Planalto não abriu (bloqueio ao acesso automatizado). Data do material é "junho/2026", sem dia; source_date usa o primeiro dia do mês. A redação do § 1º, I e II ("compartilhar os documentos fiscais eletrônicos gerados, conforme leiaute padronizado, para o ambiente de dados nacional da NFS-e") foi conferida no comunicado da Subsecretaria da Receita do DF (https://static.fazenda.df.gov.br/arquivos/servico-1202/comunicado_NFSe_padrao_nacional_04-11-2025.pdf, data 04/11/2025 pelo nome do arquivo; conferido em 2026-11-11), que não transcreve o § 7º; o § 7º vem só dos slides. A Resolução CGSN nº 189/2026 citada nos slides foi revogada pela Resolução CGSN nº 191/2026.
  - classification: FATO
    claim: 'A NT SE/CGNFS-e nº 004, versão 2.0, de 10/12/2025, inclui o grupo IBSCBS na DPS e na NFS-e como facultativo; o ambiente de produção restrita com os novos grupos foi implantado em 10/12/2025 e o leiaute tem validade jurídica a partir de 05/01/2026; o contribuinte preenche a DPS e a envia à Sefin Nacional, que valida e autoriza a NFS-e em XML com a DPS assinada incorporada; municípios com emissor próprio compartilham as NFS-e no leiaute nacional com o ADN; Emissor Nacional Web, consulta pública e DANFSe ainda não exibiam os grupos IBSCBS na produção restrita.'
    reference: https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc-producao-restrita-piloto/nt-004-se-cgnfse-novo-layout-rtc-v2-00-20251210.pdf
    entity: Secretaria-Executiva do Comitê Gestor da NFS-e de Padrão Nacional (SE/CGNFS-e)
    source_date: '2025-12-10'
    checked_at: '2026-11-11T11:15:00Z'
    limit: A capa diz versão 2.0 e a introdução fala em quarta versão; o artigo cita a data de 10/12/2025. A situação de exibição nos produtos pode ter mudado depois.
  - classification: FATO
    claim: 'O portal da NFS-e lista os serviços de API com ambiente de produção restrita (adn.producaorestrita.nfse.gov.br, sefin.producaorestrita.nfse.gov.br) e produção (adn.nfse.gov.br, sefin.nfse.gov.br): ADN (contribuintes e municípios), Parâmetros Municipais, DANFSe, CNC e Sefin Nacional.'
    reference: https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/apis-prod-restrita-e-producao
    entity: Portal NFS-e (gov.br/nfse)
    source_date: '2026-08-20'
    checked_at: '2026-11-11T11:06:00Z'
    limit: Página atualizada em 20/08/2026; lista os endereços, não descreve as regras de cada serviço.
  - classification: FATO
    claim: 'Segundo o Manual dos Contribuintes do Emissor Público Nacional (APIs), POST /nfse gera a NFS-e de forma síncrona a partir da DPS e devolve a rejeição com motivo ou o XML gerado; uma DPS com a chave de uma NFS-e já emitida gera evento de cancelamento por substituição vinculado à original e a NFS-e substituta; GET /nfse/{chaveAcesso} consulta a nota; GET /dps/{id} devolve a chave para quem é prestador, tomador ou intermediário; HEAD /dps/{id} informa se a NFS-e foi gerada a qualquer certificado válido; o identificador da DPS tem código do município, tipo e número de inscrição, série (5) e número (15); POST e GET /nfse/{chaveAcesso}/eventos registram e listam eventos, com exemplos como cancelamento e manifestação de confirmação pelo tomador; o XML do evento traz assinatura digital do emissor do evento; há Swagger em produção restrita.'
    reference: https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-emissor-publico-api-sistema-nacional-nfs-e-v1-2-out2025.pdf
    entity: Sistema Nacional NFS-e, Manual dos Contribuintes – Emissor Público Nacional (APIs)
    source_date: '2025-03-17'
    checked_at: '2026-11-11T11:10:00Z'
    limit: O nome do arquivo indica v1.2 de outubro de 2025, mas o histórico do PDF mostra só a versão 1.0 de 17/03/2025. A lista completa de eventos e códigos está no Anexo II, que não foi aberto. O manual não detalha mTLS nem prazos de cancelamento.
  - classification: FATO
    claim: 'Segundo o Manual dos Contribuintes das APIs do ADN, versão 1.0 de 12/02/2026, GET /DFe/{NSU} devolve o documento fiscal associado ao NSU e GET /NFSe/{ChaveAcesso}/Eventos devolve os eventos vinculados à chave; as consultas podem usar certificado com o mesmo CNPJ raiz do contribuinte consultado.'
    reference: https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-apis-adn-sistema-nacional-nfse.pdf
    entity: Sistema Nacional NFS-e, Manual dos Contribuintes – APIs do ADN
    source_date: '2026-02-12'
    checked_at: '2026-11-11T11:08:00Z'
    limit: Versão inicial; não define a frequência de consulta.
  - classification: FATO
    claim: 'A adesão ao padrão nacional é ratificada pelo município com Termo de Adesão e convênio no âmbito do CGNFS-e, e os municípios conveniados escolhem quais produtos disponibilizam aos contribuintes; a página de monitoramento informa a adesão de todos os 5.571 entes federados.'
    reference: https://www.gov.br/nfse/pt-br/municipios/conheca/o-projeto-nfs-e
    entity: Portal NFS-e, páginas "O projeto NFS-e" (atualizada em 31/10/2023) e "Monitoramento das Adesões" (https://www.gov.br/nfse/pt-br/municipios/monitoramento-adesoes)
    source_date: '2023-10-31'
    checked_at: '2026-11-11T11:07:00Z'
    limit: A página de monitoramento não informa data de referência nem distingue adesão de uso do emissor nacional; a planilha vinculada tem sufixo 20260928, não confirmado como data do dado.
  - classification: FATO
    claim: 'O MEI prestador de serviços não sujeitos ao ICMS está obrigado a emitir NFS-e por uma das formas disponíveis no sistema nacional desde 1º de setembro de 2023.'
    reference: https://www.gov.br/nfse/pt-br/noticias/resolucao-cgsn-no-169-traz-novos-beneficios-ao-mei
    entity: Portal NFS-e, notícia sobre a Resolução CGSN nº 169
    source_date: '2022-07-29'
    checked_at: '2026-11-11T11:09:00Z'
    limit: Notícia de 29/07/2022, atualizada em 16/06/2026.
  - classification: FATO
    claim: 'Segundo a Fenacon, a Resolução CGSN nº 191/2026 revogou expressamente a Resolução CGSN nº 189/2026, que previa 1º de setembro de 2026, e tornou obrigatória para ME e EPP do Simples Nacional, com efeitos a partir de 1º de novembro de 2026, a emissão de NFS-e pelo Emissor Nacional, pela aplicação web ou por integração via API.'
    reference: https://fenacon.org.br/noticias/simples-nacional-nfs-e-nacional-sera-obrigatoria-para-me-e-epp-a-partir-de-1o-de-novembro-de-2026/
    entity: Fenacon (entidade representativa), notícia de 29/10/2026 sobre a Resolução CGSN nº 191/2026; confirmação secundária no CRCMA (https://crcma.org.br/noticias/simples-nacional-me-e-epp-terao-nfs-e-padrao-nacional-obrigatoria-a-partir-de-novembro, 12/08/2026)
    source_date: '2026-10-29'
    checked_at: '2026-11-11T11:41:00Z'
    limit: Resolução 189 revogada. Matérias de entidade, não o texto da resolução; qualificado no texto. A Fenacon data a Resolução 191 de 04/08/2026 e não informa a data no DOU; o CRCMA a data de 10/08/2026. Nenhuma das duas matérias trata expressamente do município com emissor próprio; o artigo diz isso e manda confirmar com o contador.
  - classification: FATO
    claim: 'Segundo comunicado da SE/CGNFS-e reproduzido pelo CRCMS em 24/08/2026, os prazos para informar IBS e CBS na NFS-e variam conforme o tipo de fornecimento (01/10/2026, 01/12/2026 e, para optantes do Simples que fizerem a opção, 01/01/2027); até 31/12/2026 a ausência das informações não provoca rejeição, mas pode caracterizar desconformidade do documento.'
    reference: https://crcms.org.br/?p=37622
    entity: Conselho Regional de Contabilidade de Mato Grosso do Sul, reproduzindo comunicado da SE/CGNFS-e
    source_date: '2026-08-24'
    checked_at: '2026-11-11T11:18:00Z'
    limit: Reprodução secundária; o comunicado original no portal NFS-e não abriu. O artigo não detalha quais serviços estão em cada data (questão tributária).
  - classification: FATO
    claim: 'Segundo comunicado do CGNFS-e reproduzido pelo CRCMA em 03/11/2026, a produção segue a NT 004 acrescida de um domínio da NT 007; a omissão do grupo IBS/CBS não gera rejeição no ADN; preenchido o grupo, todos os códigos e classificações correspondentes passam a ser obrigatórios, e os emissores municipais integrados ao ADN aplicam as mesmas regras; o release 1 da NT 009 está só na produção restrita, sem efeito fiscal, com previsão de releases em produção até 01/12/2026 e cronograma formal a ser publicado.'
    reference: https://crcma.org.br/noticias/nfs-e-nacional-confira-as-orientacoes-sobre-leiaute-em-producao-regras-de-preenchimento-de-ibs-cbs-e-status-da-nota-tecnica-009
    entity: Conselho Regional de Contabilidade do Maranhão, reproduzindo orientação do CGNFS-e (fonte citada Fenacon)
    source_date: '2026-11-03'
    checked_at: '2026-11-11T11:16:00Z'
    limit: Reprodução secundária; a notícia original do portal NFS-e não abriu no ambiente de pesquisa. A data 01/12/2026 é previsão, não cronograma formal.
  - classification: FATO
    claim: 'A NT SE/CGNFS-e nº 009 v1.0, de 04/06/2026, cria o grupo gIBSCBSAjuste para notas de ajuste, define finNFSe (0 regular, 1 crédito, 2 débito), muda os campos de CNPJ de numérico para caractere para o CNPJ alfanumérico "a ser implementado a partir de julho de 2026" e informa que o cronograma de implantação seria publicado no portal.'
    reference: https://fenacon.org.br/wp-content/uploads/2026/06/nt-009-se-cgnfse-v1-0-1.pdf
    entity: SE/CGNFS-e, NT 009 v1.0 (cópia publicada pela Fenacon)
    source_date: '2026-06-04'
    checked_at: '2026-11-11T11:12:00Z'
    limit: Cópia não oficial; o original no portal NFS-e não abriu no ambiente de pesquisa. O artigo não detalha campos.
  - classification: FATO
    claim: 'A NT SE/CGNFS-e nº 009 v1.01, de 11/09/2026, informa que, a partir de 01/01/2027, o domínio "Desconhecido (tipo não informado na nota de origem)" de campos de comércio exterior não será admitido nas NFS-e compartilhadas pelos municípios ao ADN; não fixa datas de produção.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/10/Nota-tecnica-SE-CGNFSe-no-009-Versao-1.01.pdf
    entity: SE/CGNFS-e, NT 009 v1.01 (cópia publicada por reformatributaria.com)
    source_date: '2026-09-11'
    checked_at: '2026-11-11T11:13:00Z'
    limit: Cópia não oficial; há referências internas inconsistentes à versão do anexo (V1.04.00 e V1.04.01).
  - classification: FATO
    claim: 'O Ato Técnico Conjunto RFB/SUFIS/CGIBS/Diretoria-Executiva nº 7, de 28/09/2026, aprova a NT 009 v1.01 com Anexo VI (leiautes e regras de negócio RTC, v1.04) e Anexo VII (cIndOp, v1.02), e a NT 010 v1.00 da NFS-e Via com o manual v1.02; entra em vigor na publicação.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/10/ATO-TECNICO-CONJUNTO-No-7-DE-28-DE-SETEMBRO-DE-2026.pdf
    entity: Receita Federal do Brasil e Comitê Gestor do IBS (cópia publicada por reformatributaria.com)
    source_date: '2026-09-28'
    checked_at: '2026-11-11T11:21:00Z'
    limit: Cópia não oficial; o PDF no site do CGIBS não abriu no ambiente de pesquisa. A data de publicação (01/10/2026) vem da Fenacon (https://fenacon.org.br/?p=55552, 12/10/2026).
  - classification: FATO
    claim: 'A NT 010 v1.00, de 11/09/2026, trata da NFS-e Via (serviço de exploração de via) e define o evento de manifestação do adquirente da NFS-e Via, com aceite ou rejeição com motivo; segundo a Fenacon (12/10/2026), as atualizações da NT 010 seriam implantadas na produção restrita em 05/10/2026 e na produção em 19/10/2026.'
    reference: https://www.gov.br/nfse/pt-br/nfs-e-via/documentacao-tecnica/notas-tecnicas/nt-010-se-cgnfse-leiaute-nfse-via-v-1.00.pdf
    entity: SE/CGNFS-e, NT 010 v1.00; datas segundo Fenacon (https://fenacon.org.br/?p=55552)
    source_date: '2026-09-11'
    checked_at: '2026-11-11T11:20:00Z'
    limit: O evento descrito na NT 010 é específico da NFS-e Via; as datas de implantação são de matéria de entidade. A data de produção (19/10/2026) era anunciada na matéria e não foi confirmada depois.
  - classification: FATO
    claim: 'Em menos de um ano (de 10/12/2025 a 11/09/2026), a documentação da NFS-e trouxe, entre outras, a NT 004 (em produção, com um domínio da NT 007), a NT 008 (leiaute nacional do DANFSe), a NT 009 (v1.0 e v1.01) e a NT 010 (NFS-e Via).'
    reference: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/5deg-modulo-cfc-rfb-obrigacoes-acessorias-documentos-fiscais-nfs-e-hermano.pdf
    entity: Receita Federal (NT 008 e NT 009 citadas nos slides de junho de 2026); NT 004, NT 009 v1.0 e v1.01 e NT 010 conforme fontes acima; NT 007 conforme a reprodução pelo CRCMA (https://crcma.org.br/noticias/nfs-e-nacional-confira-as-orientacoes-sobre-leiaute-em-producao-regras-de-preenchimento-de-ibs-cbs-e-status-da-nota-tecnica-009)
    source_date: '2026-11-03'
    checked_at: '2026-11-11T11:22:00Z'
    limit: Lista não exaustiva. A NT 007 e a NT 008 não foram abertas nem datadas; o artigo só as menciona como exemplos, sem descrever o conteúdo além do papel indicado nas fontes.
  - classification: HIPÓTESE
    claim: 'A empresa Serviços Fictícios Ltda. (fora do Simples Nacional), os Municípios A e B, as DPS série 1 nº 1042 e 1043, datas, prazo de aviso do certificado e os critérios de aceite são um modelo editorial fictício.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, município, emissor, sistema entregue nem teste executado; não são consultoria tributária.
---

*Leitura estimada: 13 minutos.*

**Antes de aceitar o sistema que emite suas NFS-e, descubra qual caminho cada município onde você presta serviço escolheu e peça para ver, em ambiente de teste, a vida inteira de uma nota: envio, autorização, reenvio sem duplicar, cancelamento ou substituição, eventos registrados por terceiros e XML guardado.** Desde 1º de janeiro de 2026, o município precisa autorizar a NFS-e de padrão nacional ou compartilhar com o ambiente nacional as notas do próprio emissor. Isso muda o que o seu sistema conversa, e com quem.

**Este artigo não é consultoria tributária nem parecer jurídico e não recomenda emissor, ERP ou fornecedor.** Qual código de tributação, CST, cClassTrib ou alíquota se aplica a cada serviço é decisão do seu contador. O papel do sistema é levar essa decisão para a nota, mostrar quando algo deu errado e guardar a prova. Se a sua dúvida é sobre a NF-e de mercadorias, o artigo sobre [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/) trata disso.

## O que é o Sistema Nacional NFS-e

Em vez de cada prefeitura ter um modelo próprio de nota de serviço, o padrão nacional define um leiaute único e um conjunto de serviços públicos. As peças que importam para quem mantém um sistema:

- **DPS (Declaração de Prestação de Serviço):** é o que a sua empresa envia. Segundo a [Nota Técnica nº 004 do CGNFS-e](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc-producao-restrita-piloto/nt-004-se-cgnfse-novo-layout-rtc-v2-00-20251210.pdf), o contribuinte preenche a DPS e a envia à **Sefin Nacional**, que valida e autoriza a NFS-e em XML, com a DPS assinada dentro dela.
- **NFS-e:** o documento autorizado, identificado por uma chave de acesso.
- **ADN (Ambiente de Dados Nacional):** o repositório nacional que recebe as notas, inclusive as que os municípios com emissor próprio compartilham.
- **Emissor Nacional:** o emissor público, com portal web e API. O [manual de APIs do emissor público](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-emissor-publico-api-sistema-nacional-nfs-e-v1-2-out2025.pdf) descreve a geração síncrona: o sistema envia a DPS e recebe, na mesma chamada, a rejeição com o motivo ou o XML da NFS-e.
- **DANFSe:** a representação para impressão da nota, também oferecida como serviço de API.
- **Dois ambientes:** a página de [APIs do portal NFS-e](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/apis-prod-restrita-e-producao) separa **produção restrita** (testes, em endereços como `adn.producaorestrita.nfse.gov.br`) e **produção** (`adn.nfse.gov.br`), com serviços de ADN, Parâmetros Municipais, DANFSe, CNC e Sefin Nacional.

Quem já é obrigado a usar o sistema nacional também conta. O MEI que presta serviços não sujeitos ao ICMS [está obrigado a emitir a NFS-e pelo sistema nacional desde 1º de setembro de 2023](https://www.gov.br/nfse/pt-br/noticias/resolucao-cgsn-no-169-traz-novos-beneficios-ao-mei). Para micro e pequenas empresas do Simples Nacional, a [Fenacon informa](https://fenacon.org.br/noticias/simples-nacional-nfs-e-nacional-sera-obrigatoria-para-me-e-epp-a-partir-de-1o-de-novembro-de-2026/) que a Resolução CGSN nº 191/2026 revogou a Resolução nº 189/2026, que previa 1º de setembro, e tornou obrigatória, desde 1º de novembro de 2026, a emissão pelo Emissor Nacional, pela aplicação web ou por integração via API. A regra foi lida na matéria da entidade, não no texto da resolução: confirme com o seu contador como ela se aplica à sua empresa.

## O caminho da nota depende do município

O [material da Receita Federal sobre NFS-e](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/5deg-modulo-cfc-rfb-obrigacoes-acessorias-documentos-fiscais-nfs-e-hermano.pdf) (junho de 2026) reproduz o art. 62 da Lei Complementar 214/2025: desde 1º de janeiro de 2026, o município deve autorizar seus contribuintes a emitir a NFS-e de padrão nacional no ambiente nacional ou, se tiver emissor próprio, compartilhar os documentos fiscais eletrônicos gerados, conforme leiaute padronizado, com o ambiente de dados nacional da NFS-e. Segundo o § 7º, o não atendimento implica a suspensão temporária das transferências voluntárias. O mesmo material descreve os dois cenários:

- **Município que usa os emissores nacionais:** a nota nasce no Sistema Nacional. Há um único documento fiscal com validade jurídica.
- **Município que mantém o emissor próprio:** a empresa emite no sistema da prefeitura, e o município compartilha o documento com o ADN no padrão nacional. Segundo a Receita, nesse cenário o contribuinte terá dois documentos fiscais autorizados e válidos para a mesma operação.

![Vista aérea de uma estrada que sai de um prédio rotulado “Sistema da empresa” e chega a um entroncamento com uma placa: “Qual caminho o município escolheu?”. A estrada da esquerda, rotulada “Município A: usa o Emissor Nacional”, passa por “DPS enviada à Sefin Nacional (portal ou API)” e chega a “NFS-e de padrão nacional: documento único”. A estrada da direita, rotulada “Município B: emissor próprio”, passa por “Nota emitida no sistema da prefeitura (regras do município)” e por “Município compartilha a nota com o ADN no padrão nacional”, com a marcação “dois documentos para a mesma operação”. As duas estradas terminam numa praça rotulada “ADN – Ambiente de Dados Nacional”. Rodapé: “Desde 01/01/2026 (LC 214/2025, art. 62): o município autoriza o emissor nacional ou compartilha com o ADN.”](./torno-nfse-dois-caminhos.svg)

*Municípios A e B são fictícios; cenários segundo material da Receita Federal de junho de 2026. Ilustração original Torno Studio, 2026.*

Adesão não responde à pergunta. O portal informa que [todos os 5.571 entes federados aderiram](https://www.gov.br/nfse/pt-br/municipios/monitoramento-adesoes), mas a adesão é um convênio, e [os municípios conveniados escolhem quais produtos disponibilizam](https://www.gov.br/nfse/pt-br/municipios/conheca/o-projeto-nfs-e). Um município aderente pode manter o emissor próprio. Por isso, o primeiro pedido ao fornecedor é uma tabela simples:

| Município onde a empresa presta serviço | Caminho | Por onde o sistema emite | Quem confirmou e quando |
|---|---|---|---|
| Município A (fictício) | Emissor Nacional | API da Sefin Nacional | Contador, com data |
| Município B (fictício) | Emissor próprio + ADN | Webservice da prefeitura | Contador e prefeitura, com data |

Se a empresa tem filiais ou atende em mais de uma cidade, o sistema pode precisar dos dois caminhos ao mesmo tempo. E, no caminho do emissor próprio, regras de leiaute nacional ainda chegam até você: a NT 009 v1.01, por exemplo, informa que, a partir de 1º de janeiro de 2027, o valor "Desconhecido (tipo não informado na nota de origem)" em campos de comércio exterior não será admitido nas notas que os municípios compartilham com o ADN.

O regime da empresa também pesa: MEI e, desde 1º de novembro de 2026, ME e EPP do Simples Nacional emitem pelo Emissor Nacional mesmo onde a prefeitura mantém emissor próprio, segundo as fontes citadas acima. Essas fontes não preveem exceção para o município com emissor próprio, mas também não tratam dele expressamente. Confirme o enquadramento com o contador antes de preencher a tabela.

## O que pedir ao sistema

### Envio da DPS sem duplicar a nota

A resposta da Sefin Nacional é síncrona, mas a rede não é confiável. Se a conexão cai depois do envio, o sistema não sabe se a nota foi gerada. Reenviar às cegas pode virar duas notas.

O manual do emissor público ajuda aqui. O identificador da DPS é composto pelo código do município, tipo e número de inscrição do emitente, **série e número da DPS**. E há duas consultas por esse identificador: `HEAD /dps/{id}` informa se a NFS-e foi gerada; `GET /dps/{id}` devolve a chave de acesso para quem é prestador, tomador ou intermediário. Peça:

- numeração de DPS controlada pelo sistema, sem reaproveitar número;
- antes de reenviar, consulta pelo identificador da DPS;
- uma tela de notas "em dúvida", que não somem nem são reenviadas sem regra.

O raciocínio é o mesmo de [evento que chega duas vezes numa integração](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/): o mesmo pedido, repetido, precisa ter um único efeito.

### Rejeição com motivo e XML guardado

Quando a Sefin rejeita, ela devolve o motivo. O sistema deve mostrá-lo em linguagem que a operação entenda, manter a nota como pendente e permitir corrigir e reenviar. Quando autoriza, o sistema guarda o XML da NFS-e e a chave de acesso, e consegue gerar ou obter o DANFSe. Ficar só com o PDF não basta: o XML é o documento.

### Certificado digital

O Sistema Nacional identifica quem está chamando pelo certificado digital usado na chamada. Segundo o manual do emissor público, a consulta que devolve a chave só funciona se o certificado corresponder a um dos atores da nota. Nas [APIs do ADN](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-apis-adn-sistema-nacional-nfse.pdf), a consulta pode ser feita com certificado do mesmo CNPJ raiz do contribuinte. Peça:

- onde o certificado fica guardado, quem tem acesso e como ele é trocado;
- aviso de vencimento com antecedência combinada, para alguém que pode agir;
- certificado de teste ou de produção restrita separado do de produção, se o fornecedor usar um;
- para filiais, confirmação de qual certificado assina cada emissão.

### Eventos: cancelamento, substituição e manifestação

Depois de autorizada, a nota continua mudando por meio de eventos. O manual do emissor público descreve um serviço genérico (`POST` e `GET` em `/nfse/{chaveAcesso}/eventos`) e cita exemplos:

- **Cancelamento:** registrado como evento vinculado à nota.
- **Substituição:** a empresa envia uma nova DPS com a chave da nota a substituir. O sistema nacional gera um **evento de cancelamento por substituição**, vinculado à original, e a NFS-e substituta.
- **Manifestação do tomador:** o manual cita a manifestação de confirmação da prestação do serviço pelo tomador.

O seu sistema não registra só os próprios eventos; também precisa saber dos eventos que outros registraram nas suas notas. Pelo [manual do ADN](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/manual-contribuintes-apis-adn-sistema-nacional-nfse.pdf), `GET /NFSe/{chave}/Eventos` devolve os eventos de uma nota, e `GET /DFe/{NSU}` distribui documentos em sequência numerada. Peça que o sistema guarde o último NSU lido, retome dali depois de uma falha e mostre, na ficha de cada nota, a situação atual e a lista de eventos.

A lista completa de eventos, códigos e prazos está no anexo de eventos da documentação técnica. Peça ao fornecedor que diga quais eventos o sistema suporta, quais não, e o que a operação faz nesses casos.

Um cuidado de leitura: a "manifestação do adquirente" que aparece nas notícias de outubro de 2026 é a da **NFS-e Via**, a nota de serviço de exploração de via. A [NT 010](https://www.gov.br/nfse/pt-br/nfs-e-via/documentacao-tecnica/notas-tecnicas/nt-010-se-cgnfse-leiaute-nfse-via-v-1.00.pdf) define esse evento, com aceite ou rejeição com motivo, para esse documento. Segundo a [Fenacon](https://fenacon.org.br/?p=55552), em matéria de 12 de outubro de 2026, as atualizações da NT 010 seriam implantadas na produção restrita em 5 de outubro e na produção em 19 de outubro de 2026. Se a sua empresa não é concessionária de via, isso não muda o seu sistema; não confunda com a manifestação do tomador da NFS-e comum.

Na prática, a ficha de cada nota no sistema deveria contar essa história. Num exemplo fictício, a Serviços Fictícios Ltda. envia em 06/10/2026, às 09:14, a DPS série 1, nº 1042, no Município A; a NFS-e é autorizada e a chave fica guardada. Em 07/10/2026, a nota é substituída pela DPS nº 1043, o que gera o evento de cancelamento por substituição na original. Em 09/10/2026, o tomador registra a manifestação de confirmação na nota substituta. Cada passo deixa um XML guardado, com data, hora e quem pediu.

![Ficha de uma nota de serviço marcada “Exemplo fictício”, da empresa Serviços Fictícios Ltda., Município A, com quatro carimbos em sequência. Carimbo 1: “DPS enviada – 06/10/2026 09:14 – série 1, nº 1042”. Carimbo 2: “NFS-e autorizada – chave de acesso guardada”. Carimbo 3, em diagonal: “Substituída – evento de cancelamento por substituição – 07/10/2026”. Uma seta leva a uma segunda ficha, “NFS-e substituta – DPS série 1, nº 1043”, com o carimbo 4: “Manifestação do tomador: confirmação – 09/10/2026”. Anotação na margem: “Cada carimbo: XML guardado, data e hora, quem pediu”.](./torno-nfse-vida-da-nota.svg)

*Exemplo fictício: empresa, município, números e datas inventados. Ilustração original Torno Studio, 2026.*

## IBS e CBS na NFS-e: o que o sistema precisa suportar

Sem entrar na tributação, o que muda para o sistema é a presença dos grupos de IBS e CBS no leiaute, e as regras que dizem quando eles são aceitos.

**Regra técnica vigente.** A NT 004, de 10 de dezembro de 2025, colocou o grupo de IBS e CBS na DPS e na NFS-e como **facultativo**, com produção restrita desde 10/12/2025 e validade jurídica do leiaute a partir de 5 de janeiro de 2026. Segundo [orientação do CGNFS-e reproduzida pelo CRC do Maranhão](https://crcma.org.br/noticias/nfs-e-nacional-confira-as-orientacoes-sobre-leiaute-em-producao-regras-de-preenchimento-de-ibs-cbs-e-status-da-nota-tecnica-009) em 3 de novembro de 2026, a produção ainda segue a NT 004 (acrescida de um domínio da NT 007), e a omissão do grupo não gera rejeição no ADN. Mas, **se o grupo for preenchido, todos os códigos e classificações correspondentes passam a ser obrigatórios**, e os emissores municipais integrados ao ADN aplicam as mesmas regras.

**Obrigação e rejeição são coisas diferentes.** Segundo [comunicado do CGNFS-e reproduzido pelo CRC de Mato Grosso do Sul](https://crcms.org.br/?p=37622), os prazos para informar IBS e CBS na NFS-e variam conforme o tipo de serviço, com datas em 1º de outubro de 2026, 1º de dezembro de 2026 e, para optantes do Simples que fizerem essa opção, 1º de janeiro de 2027. Até 31 de dezembro de 2026, a ausência das informações não provoca rejeição, mas pode caracterizar desconformidade do documento. Em qual data a sua empresa entra é pergunta para o contador. A leitura das duas orientações foi feita em reproduções de conselhos regionais, porque a notícia original do portal não abriu.

**Em teste, ainda não em produção.** A NT 009 traz a próxima leva de mudanças. A [versão 1.0](https://fenacon.org.br/wp-content/uploads/2026/06/nt-009-se-cgnfse-v1-0-1.pdf), de 4 de junho de 2026, cria o grupo de ajuste (`gIBSCBSAjuste`) e a finalidade da nota (`finNFSe`: regular, crédito ou débito) para notas de ajuste, e muda os campos de CNPJ de numérico para caractere por causa do [CNPJ alfanumérico](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/). A [versão 1.01](https://www.reformatributaria.com/wp-content/uploads/2026/10/Nota-tecnica-SE-CGNFSe-no-009-Versao-1.01.pdf), de 11 de setembro de 2026, foi aprovada pelo [Ato Técnico Conjunto nº 7](https://www.reformatributaria.com/wp-content/uploads/2026/10/ATO-TECNICO-CONJUNTO-No-7-DE-28-DE-SETEMBRO-DE-2026.pdf), de 28 de setembro de 2026. A leitura das duas versões e do ato foi feita em cópias publicadas por terceiros, não no portal oficial. Segundo a mesma orientação reproduzida pelo CRC do Maranhão, o primeiro release da NT 009 está na produção restrita, sem efeito fiscal, e a previsão é levar os releases à produção até 1º de dezembro de 2026, com cronograma formal ainda a publicar. Previsão não é data: o sistema precisa estar pronto para testar antes e para trocar quando a data for publicada.

O que pedir, então:

- o sistema envia o grupo de IBS e CBS **completo ou não envia**, conforme a decisão registrada pelo contador; nunca um grupo pela metade;
- a classificação de cada serviço vem de um cadastro aprovado, com registro de quem alterou;
- o sistema mostra, por período, quantas notas saíram com e sem o grupo;
- campos de CNPJ aceitam letras, sem quebrar os CNPJs numéricos.

## Atualização de leiaute: combine a rotina, não só a versão

Em menos de um ano, a documentação da NFS-e trouxe, entre outras, a NT 004 (em produção, com um domínio da NT 007), a NT 008 (leiaute nacional do DANFSe), a NT 009 (já em duas versões) e a NT 010 (NFS-e Via). Nenhum contrato de manutenção sobrevive a esse ritmo sem uma rotina escrita:

1. **Quem acompanha** as publicações do portal NFS-e e dos municípios com emissor próprio.
2. **Em quanto tempo** uma nova versão é avaliada e vira estimativa.
3. **Onde é testada:** na produção restrita, nunca na produção. Antes, [confira se o ambiente de teste aponta mesmo para a produção restrita](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/); uma nota de ensaio na produção é nota de verdade.
4. **Como troca:** com data combinada com a operação e um [plano de volta atrás](https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/) se a nova versão falhar.
5. **O que fica registrado:** versão do leiaute em uso, data da troca e quem aprovou.

## Critérios de aceite com exemplo fictício

**Início do exemplo fictício.** A Serviços Fictícios Ltda. é uma empresa inventada, fora do Simples Nacional, que presta serviços no Município A (que usa o Emissor Nacional) e no Município B (que mantém emissor próprio). Nenhum dado é real. Todos os cenários rodam na produção restrita ou no ambiente de teste da prefeitura, e cada um segue o formato de [critérios de aceite verificáveis](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Emitir nota no Município A com DPS série 1, nº 1042 | NFS-e autorizada; XML e chave guardados; DANFSe disponível | XML, chave e DANFSe ligados ao pedido no sistema |
| Emitir nota no Município B | Nota autorizada pela prefeitura; XML e número guardados; nota localizada depois na distribuição do ADN, quando o município a tiver compartilhado | Retorno da prefeitura e registro da leitura no ADN |
| Enviar DPS com dado inválido | Rejeição com o motivo devolvido pela Sefin, em linguagem clara; nota pendente | Tela e retorno guardado |
| Conexão cai depois do envio da DPS nº 1042 | Sistema consulta pelo identificador da DPS antes de reenviar; nenhuma segunda nota | Log da consulta e uma única chave |
| Tentar reaproveitar o nº 1042 em outra nota | Bloqueado pelo sistema | Mensagem na tela |
| Cancelar uma nota autorizada | Evento registrado; nota aparece como cancelada no sistema | XML do evento e situação da nota |
| Substituir a nota da DPS nº 1042 pela DPS nº 1043 | NFS-e substituta gerada; original com evento de cancelamento por substituição; as duas ligadas | XMLs das duas notas e do evento |
| Tomador registra manifestação de confirmação | Evento lido e exibido na ficha da nota | Lista de eventos da nota |
| Falha na leitura da distribuição pelo ADN | Leitura retomada a partir do último NSU guardado, sem lacuna nem duplicidade | Log com NSU inicial e final |
| Certificado a 30 dias do vencimento (prazo fictício) | Aviso para o responsável combinado | Registro do aviso |
| Emitir com certificado vencido | Erro claro; nada enviado em silêncio | Mensagem e log |
| Serviço com classificação de IBS e CBS aprovada | Grupo completo na DPS, conforme o cadastro | XML conferido item a item |
| Serviço sem classificação aprovada | Sistema bloqueia ou alerta, conforme regra escrita; não envia grupo pela metade | Tela e XML |
| Tomador com CNPJ alfanumérico, quando o leiaute da NT 009 estiver disponível no ambiente de teste | Aceito e enviado sem perder letras | XML |
| Nova versão de leiaute publicada | Avaliada, testada na produção restrita e trocada na data aprovada | Registro da troca |

*Fim do exemplo fictício. Empresa, municípios, números, prazos e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue.*

Para os registros de quem pediu cada emissão, cancelamento ou troca de certificado, o artigo sobre [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/) detalha o que guardar.

## Emissor terceirizado ou sistema próprio

**Se o seu sistema chama um emissor de terceiros**, o leiaute e a conversa com a Sefin ou com a prefeitura tendem a ficar com ele (confirme no contrato). Pergunte: quais municípios e caminhos ele cobre, qual versão de nota técnica está em produção e qual está em teste, quais eventos suporta, como devolve o XML e os eventos ao seu sistema, onde fica o certificado e se há acesso à produção restrita.

**Se o seu sistema conversa direto com a Sefin Nacional e com as prefeituras**, tudo fica com você: leiaute, certificado, numeração, eventos, distribuição e rotina de atualização. Nesse caso, a rotina de leiaute deixa de ser detalhe e entra no contrato de manutenção.

Nos dois casos, o teste é o mesmo: emitir na produção restrita e acompanhar a nota até o último evento.

## Perguntas frequentes

### Meu município aderiu ao padrão nacional. Então emito pelo Emissor Nacional?

Não necessariamente. Adesão é convênio; o município escolhe quais produtos oferece e pode manter o emissor próprio, compartilhando as notas com o ADN. Mas, se a sua empresa é MEI ou optante do Simples Nacional, a emissão pelo Emissor Nacional já é obrigatória, independentemente do município, segundo as fontes citadas neste artigo. Confirme com o contador e com a prefeitura.

### A nota sem IBS e CBS está sendo autorizada. Está tudo certo?

Autorizada não quer dizer em conformidade. Segundo orientação do CGNFS-e reproduzida por conselhos regionais de contabilidade, a omissão não gera rejeição até 31 de dezembro de 2026, mas pode caracterizar desconformidade depois do prazo de cada tipo de serviço. A data que vale para a sua empresa é pergunta para o contador.

### Cancelar e emitir outra é o mesmo que substituir?

Não. Na substituição, a nova DPS traz a chave da nota original, e o sistema nacional registra o cancelamento por substituição ligando as duas. Cancelar e emitir outra deixa duas notas sem vínculo. Qual usar em cada situação é regra fiscal; o sistema precisa suportar as duas e mostrar a ligação.

### Preciso testar de novo a cada nota técnica?

Sim, ao menos os cenários que a nota técnica toca. Por isso a tabela de aceite vale guardar: ela vira a bateria de teste de cada nova versão.

Se você mantém um sistema que emite NFS-e e quer transformar os seus municípios e fluxos de nota em escopo e cenários de teste, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a lista de cidades onde presta serviço e de como emite hoje, sem dados reais de clientes. A decisão tributária continua com o seu contador.

*Fontes consultadas em 11 de novembro de 2026: Portal NFS-e (APIs, manuais do emissor público e do ADN, projeto e adesões, NT 004, NT 010, notícia sobre o MEI), material da Receita Federal sobre NFS-e, comunicado da Receita do Distrito Federal sobre a NFS-e nacional, cópias não oficiais da NT 009 (v1.0 e v1.01) e do Ato Técnico Conjunto nº 7, matérias da Fenacon e reproduções de comunicados do CGNFS-e pelos CRCs do Maranhão e de Mato Grosso do Sul. O texto da LC 214/2025, o anexo de eventos e as notícias originais do portal NFS-e não foram abertos. Este artigo não é consultoria tributária nem parecer jurídico e não recomenda emissor ou fornecedor; empresa, municípios, números e critérios são modelos editoriais fictícios.*
