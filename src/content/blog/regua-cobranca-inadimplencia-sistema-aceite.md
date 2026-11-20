---
content_id: torno-artigo-pt-20261120-regua-cobranca
intent_id: buyer-receivables-dunning-collection-rules-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Régua de cobrança no sistema: o que definir e testar antes de automatizar lembretes e cobrança de contas a receber'
h1: 'Régua de cobrança no sistema: o que definir e testar antes de automatizar lembretes e cobrança de contas a receber'
seo_title: 'Régua de cobrança no sistema: regras e aceite | Torno'
seo_description: 'Régua de cobrança automática: lembretes, canais e horários, quando parar, juros e multa do contrato, negativação e protesto como decisão humana e testes de aceite.'
summary: 'Roteiro para a empresa que vai automatizar no sistema a régua de cobrança das contas a receber (ERP, sistema financeiro ou sistema sob medida): os toques antes e depois do vencimento; dia útil, horários e frequência; canais, permissão de contato e e-mail que voltou; quando a régua para ou pausa (pagamento baixado, pagamento informado, acordo, contestação, cancelamento, renegociação, opt-out); multa, juros e correção vindos do contrato e os limites da relação de consumo; segunda via com valor atualizado; pagamento parcial e cliente com vários títulos; negativação e protesto como decisão humana; tom da mensagem; LGPD; registro auditável do que foi enviado; quem decide cada regra; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício com as contas fechadas.'
primary_question: O que uma empresa precisa definir e testar antes de automatizar no sistema a régua de cobrança das contas a receber, para que lembretes e avisos saiam na hora certa, parem quando o cliente paga, acerta ou contesta, cobrem o valor que o contrato permite e deixem as decisões de negativação e protesto com pessoas?
proposed_path: /blog/regua-cobranca-inadimplencia-sistema-aceite/
canonical_url: https://tornostudio.com/blog/regua-cobranca-inadimplencia-sistema-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Donos, diretores financeiros, gestores de contas a receber e de crédito e cobrança de pequenas e médias empresas, principalmente B2B, que vão contratar, especificar, ajustar ou aceitar a automação da cobrança (módulo de ERP, sistema financeiro ou sistema sob medida), e quem vai implementá-la.
buyer_stage: Especificação e aceite, antes de trocar a planilha de vencidos e os lembretes enviados à mão por uma régua de cobrança automática.
scope: Toques antes, no e depois do vencimento; contagem em dias corridos ou úteis e vencimento em dia não útil; horários, frequência e agrupamento por cliente; canais (e-mail, WhatsApp, telefonema, carta), permissão e opt-out por canal e e-mail que voltou; eventos que param ou pausam a régua (pagamento baixado, pagamento informado, acordo, contestação, cancelamento, renegociação) e dependência da baixa e da conciliação; multa, juros e correção vindos do contrato, regra supletiva do Código Civil e limites da relação de consumo citados do texto da lei; segunda via com valor atualizado; pagamento parcial e cliente com vários títulos; negativação e protesto como decisão humana e o que o sistema registra; tom e conteúdo da mensagem; LGPD; registro auditável do envio; quem decide cada regra; critérios de aceite com dados fictícios.
not_scope: Parecer jurídico, contábil ou fiscal; redação de contrato, de cláusula de multa e juros ou de aviso de cobrança; escolha de base legal na LGPD; recomendação ou comparação de bureau de crédito, banco, PSP, cartório, plataforma de mensagens, empresa de cobrança ou fornecedor de software; política de crédito e limite de crédito; cobrança judicial e prescrição; cessão de crédito e securitização; tutorial de boleto, CNAB ou API Pix; desenho da conciliação bancária, do Pix Automático, da integração de pagamentos e do envio de e-mails e WhatsApp em geral (cobertos em outros artigos).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-20T15:23:10Z'
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
    reason: Trata a baixa por extrato e retorno de cobrança, o casamento e a fila de exceções; aqui a baixa só como o evento que para a régua e a dependência de horário entre as duas rotinas.
  - path: https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/
    reason: Trata a autorização e a cobrança recorrente via Pix Automático; aqui a régua sobre títulos já vencidos, qualquer que seja o meio de pagamento.
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata a confirmação assíncrona do pagamento e os estados do pedido; aqui o efeito dessa confirmação sobre a cobrança.
  - path: https://tornostudio.com/blog/whatsapp-sistema-avisos-automaticos-aceite/
    reason: Trata o WhatsApp como canal de aviso em geral, permissão, modelos e custos; aqui só o uso do canal na régua de cobrança.
  - path: https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/
    reason: Trata estados de envio, entrega e falha de e-mail; aqui o e-mail que voltou como evento que troca o canal da régua.
  - path: https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/
    reason: Trata a inadimplência como regra de estorno de comissão; aqui a cobrança do título em atraso.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Trata precisão e etapa do arredondamento; aqui o arredondamento dos juros proporcionais e do saldo.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Trata datas civis, instantes e cortes de período; aqui o dia útil, o vencimento em feriado e o horário de envio.
  - path: https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/
    reason: Trata o atendimento aos direitos do titular; aqui o dado de contato usado na cobrança e o pedido de não receber por um canal.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria; aqui o que o registro de cada envio e de cada decisão de cobrança precisa guardar.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento recebido em dobro; aqui o aviso de pagamento repetido que não pode baixar duas vezes.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata documentos emitidos e dados congelados; aqui a segunda via e o aviso como documento do momento do envio.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Trata alçadas e aprovações em geral; aqui a alçada de acordo, desconto de encargos e envio a negativação ou protesto.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso; aqui quem pode pausar, encerrar a régua e propor negativação.
  - path: https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
    reason: Trata cadastros duplicados; aqui o cliente com dois cadastros que recebe a régua em dobro.
  - path: https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/
    reason: Trata devoluções e trocas; aqui a devolução que cancela ou abate o título em cobrança.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Trata alertas de fluxo crítico; aqui a rotina de cobrança que não rodou ou rodou fora de hora.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste, com destinos de mensagem controlados e clientes fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando a planilha deixa de bastar; aqui o caso da planilha de vencidos.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a régua de cobrança em regras escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'O Código de Defesa do Consumidor, no texto compilado do Planalto, diz: no art. 42, que, na cobrança de débitos, o consumidor inadimplente não será exposto a ridículo nem submetido a constrangimento ou ameaça, e, no parágrafo único, que o consumidor cobrado em quantia indevida tem direito à repetição do indébito por valor igual ao dobro do que pagou em excesso, com correção e juros legais, salvo engano justificável; no art. 42-A, que os documentos de cobrança apresentados ao consumidor devem conter nome, endereço e CPF ou CNPJ do fornecedor; no art. 43, que o consumidor tem acesso às informações sobre ele em cadastros, que informações negativas não podem ser mantidas por período superior a cinco anos (§1º), que a abertura de cadastro deve ser comunicada por escrito ao consumidor quando não solicitada por ele (§2º) e que, havendo inexatidão, o arquivista comunica a correção aos destinatários em cinco dias úteis (§3º); no art. 52, que no fornecimento com outorga de crédito ou financiamento ao consumidor o fornecedor informa previamente juros de mora, taxa efetiva anual e acréscimos, que as multas de mora não podem ser superiores a 2% do valor da prestação (§1º, redação da Lei 9.298/1996) e que é assegurada a liquidação antecipada com redução proporcional dos juros (§2º); e, no art. 71, que é crime usar na cobrança ameaça, coação, constrangimento físico ou moral, afirmações falsas, incorretas ou enganosas, ou procedimento que exponha o consumidor injustificadamente a ridículo ou interfira com seu trabalho, descanso ou lazer, com pena de detenção de três meses a um ano e multa.'
    reference: https://planalto.gov.br/ccivil_03/LEIS/L8078.htm
    entity: 'Presidência da República, Lei nº 8.078/1990 (Código de Defesa do Consumidor), texto no portal do Planalto'
    source_date: null
    checked_at: '2026-11-20T15:08:00Z'
    limit: 'Texto legal lido pela ferramenta de leitura automática, que devolveu resumo e trechos curtos, não a íntegra literal; o Planalto adverte que o texto não substitui o publicado no DOU. O art. 52, §1º, está no artigo sobre fornecimento com outorga de crédito ou financiamento ao consumidor; o alcance a outras cobranças, a aplicação do CDC a empresas clientes e a interpretação dos arts. 42 e 71 são perguntas para o advogado. Não é parecer jurídico.'
  - classification: FATO
    claim: 'A Súmula 359 do STJ, da Segunda Seção, julgada em 13/08/2008 e publicada no DJe de 08/09/2008, diz: "Cabe ao órgão mantenedor do Cadastro de Proteção ao Crédito a notificação do devedor antes de proceder à inscrição."'
    reference: https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=359
    entity: 'Superior Tribunal de Justiça, pesquisa de súmulas, Súmula 359'
    source_date: '2008-09-08'
    checked_at: '2026-11-20T15:09:00Z'
    limit: 'Enunciado da súmula, sem leitura dos precedentes. Não define o meio da notificação nem o prazo.'
  - classification: FATO
    claim: 'Segundo notícia do Migalhas de 18/09/2024, a Terceira Turma do STJ decidiu, por maioria, em 17/09/2024 (REsp 2.092.539, relator ministro Marco Aurélio Bellizze), que é válida a notificação do consumidor por e-mail, SMS ou aplicativo antes da inscrição em cadastro de proteção ao crédito, alinhando-se à Quarta Turma (REsp 2.063.145, março de 2024), que aceitou o meio eletrônico desde que comprovados o envio e a entrega ao servidor de destino; a ministra Nancy Andrighi ficou vencida. Segundo publicação do escritório Machado Meyer de 09/08/2023, a mesma Terceira Turma havia decidido em 2023 (REsp 2.056.285/RS, relatora ministra Nancy Andrighi) que a notificação exclusivamente por e-mail ou SMS não bastava.'
    reference: https://www.migalhas.com.br/quentes/415506/stj-consumidor-pode-ser-notificado-por-sms-sobre-negativacao
    entity: 'Migalhas, notícia de 18/09/2024; Machado Meyer Advogados, "Como notificar a inscrição em cadastro de inadimplentes", 09/08/2023 (https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/inteligencia-juridica-contencioso/como-notificar-a-inscricao-em-cadastro-de-inadimplentes)'
    source_date: '2024-09-18'
    checked_at: '2026-11-20T15:10:00Z'
    limit: 'Fontes secundárias (notícia e publicação de escritório), não os acórdãos, que não foram abertos. Citadas só para mostrar que o meio da notificação prévia mudou de entendimento entre 2023 e 2024; o entendimento atual e sua aplicação a cada caso são perguntas para o advogado.'
  - classification: FATO
    claim: 'A Lei 9.492/1997, no texto do Planalto, define protesto como o ato formal e solene pelo qual se prova a inadimplência e o descumprimento de obrigação originada em títulos e outros documentos de dívida (art. 1º); atribui ao tabelião de protesto a protocolização, a intimação, o recebimento do pagamento, a lavratura e o registro do protesto ou o acatamento da desistência do credor (art. 3º); prevê que o tabelião intima o devedor no endereço fornecido pelo apresentante, com alterações que admitem intimação por meio eletrônico ou aplicativo de mensagens com confirmação de recebimento (art. 14); que o pagamento do título apresentado é feito no tabelionato, pelo valor apresentado acrescido de emolumentos e despesas (art. 19); e que o cancelamento do registro do protesto pode ser pedido por qualquer interessado com o título ou, na falta dele, com declaração de anuência do credor (art. 26).'
    reference: https://planalto.gov.br/ccivil_03/leis/l9492.htm
    entity: 'Presidência da República, Lei nº 9.492/1997 (protesto de títulos), texto no portal do Planalto, com alterações posteriores, inclusive da Lei 14.711/2023'
    source_date: null
    checked_at: '2026-11-20T15:09:00Z'
    limit: 'Texto legal lido por ferramenta de leitura automática, que devolveu resumo; não é parecer. Quando protestar, o que levar a protesto e como tratar o título depois são decisões da empresa com o advogado.'
  - classification: FATO
    claim: 'A Lei 13.709/2018 (LGPD), no texto do Planalto, lista entre as hipóteses de tratamento de dados pessoais a execução de contrato (art. 7º, V), o exercício regular de direitos em processo judicial, administrativo ou arbitral (VI), o legítimo interesse (IX) e a proteção do crédito (X); estabelece os princípios de finalidade, necessidade e transparência (art. 6º, I, III e VI); lista os direitos do titular, inclusive a revogação do consentimento (art. 18, IX) e a oposição a tratamento feito com dispensa de consentimento em caso de descumprimento da lei (art. 18, §2º); e exige que controlador e operador mantenham registro das operações de tratamento, especialmente quando baseado no legítimo interesse (art. 37).'
    reference: https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/Lei/L13709.htm
    entity: 'Presidência da República, Lei nº 13.709/2018 (LGPD), texto no portal do Planalto'
    source_date: null
    checked_at: '2026-11-20T15:10:00Z'
    limit: 'Texto legal lido por ferramenta de leitura automática. A escolha da base legal para a cobrança e o tratamento do pedido de não receber mensagens são decisões do controlador com o encarregado e o advogado; o artigo não escolhe base legal.'
  - classification: FATO
    claim: 'A Lei 14.905/2024, no texto do Planalto, deu nova redação ao Código Civil: na falta de índice de atualização monetária convencionado ou previsto em lei específica, aplica-se o IPCA (art. 389, parágrafo único); o devedor em mora responde pelos prejuízos, mais juros, atualização monetária e honorários de advogado (art. 395); quando os juros não forem convencionados ou a taxa não for estipulada, a taxa legal é a Selic deduzido o IPCA, com metodologia definida pelo Conselho Monetário Nacional e divulgada pelo Banco Central, e é considerada zero se der negativa (art. 406, §§1º a 3º). A mesma lei diz que a Lei de Usura (Decreto 22.626/1933) não se aplica, entre outras, às obrigações contratadas entre pessoas jurídicas e às representadas por títulos de crédito.'
    reference: https://planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14905.htm
    entity: 'Presidência da República, Lei nº 14.905/2024, texto no portal do Planalto'
    source_date: '2024-06-28'
    checked_at: '2026-11-20T15:10:00Z'
    limit: 'Texto legal lido por ferramenta de leitura automática; o texto compilado do Código Civil no Planalto não foi aberto. Qual regra vale em cada contrato é pergunta para o advogado.'
  - classification: FATO
    claim: 'O Código Civil diz que o devedor incorre de pleno direito na cláusula penal quando, culposamente, deixa de cumprir a obrigação ou se constitui em mora (art. 408); que a cláusula penal pode se referir simplesmente à mora (art. 409); que o valor da cominação imposta na cláusula penal não pode exceder o da obrigação principal (art. 412); e que a penalidade deve ser reduzida equitativamente pelo juiz se a obrigação principal tiver sido cumprida em parte ou se o montante for manifestamente excessivo (art. 413).'
    reference: https://www.projuris.com.br/ccc/cc-comentado-da-clausula-penal-art-408-ao-416/
    entity: 'Projuris, "CAPÍTULO V – Da Cláusula Penal (art. 408º ao art. 416º)", reprodução do texto do Código Civil (Lei nº 10.406/2002) com comentários'
    source_date: null
    checked_at: '2026-11-20T15:10:00Z'
    limit: 'Reprodução em site privado (fornecedor de software jurídico), usada porque o texto compilado do Código Civil no Planalto não foi aberto nesta sessão; só os trechos de lei foram usados, não os comentários. Não é parecer.'
  - classification: FATO
    claim: 'O Manual de Padrões para Iniciação do Pix do Banco Central (versão 2.10.0) descreve, para a cobrança com vencimento, os campos opcionais valor original, abatimento, desconto, juros e multa e o campo obrigatório valor final, considerados abatimentos, desconto, juros e multa; diz que o PSP do recebedor calcula o valor a partir da data de pagamento pretendida informada pelo PSP do pagador (ou, sem ela, do vencimento, se não vencida, ou da data da consulta, se vencida); que o campo validadeAposVencimento indica quantos dias corridos depois do vencimento a cobrança ainda pode ser paga; e que a data de vencimento e o último dia de validade que caem em fim de semana ou feriado são prorrogados para o dia útil seguinte.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf
    entity: 'Banco Central do Brasil, Regulamento Pix, Manual de Padrões para Iniciação do Pix, versão 2.10.0'
    source_date: null
    checked_at: '2026-11-20T15:11:00Z'
    limit: 'Documento técnico do arranjo Pix; o trecho lido não traz data de publicação nem as regras de cálculo do Anexo III. Não trata de boleto. Citado como exemplo de como um meio de pagamento modela valor atualizado e vencimento em dia não útil.'
  - classification: FATO
    claim: 'A documentação da plataforma do WhatsApp para empresas (Meta, atualizada em 03/11/2025) diz que a empresa precisa obter opt-in antes de enviar mensagens, que o opt-in deve deixar claro que a pessoa concorda em receber mensagens daquela empresa, nomeada, que a empresa escolhe o meio de coleta e deve cumprir a lei aplicável; e, na seção de dicas ("Helpful tips"), não entre os requisitos, recomenda obter opt-in separado por categoria de mensagem e dar instruções claras para a pessoa deixar de receber categorias específicas, honrando esses pedidos.'
    reference: https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in
    entity: 'Meta for Developers, WhatsApp Business Platform, "Get opt-in for WhatsApp" (atualizada em 03/11/2025)'
    source_date: '2025-11-03'
    checked_at: '2026-11-20T15:11:00Z'
    limit: 'Documentação de plataforma, sujeita a mudança; política de uso do canal, não norma legal. Citada só porque a régua usa o canal; não é recomendação do canal.'
  - classification: FATO
    claim: 'A documentação de categorização de modelos (templates) do WhatsApp (Meta, atualizada em 30/01/2025) diz que modelos de utilidade não podem ser promocionais e devem ser específicos do usuário ou solicitados, ou essenciais para ele; dá como exemplo de alerta de conta um lembrete de pagamento mensal; e diz que modelos que misturam utilidade e conteúdo de marketing são tratados como marketing.'
    reference: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization
    entity: 'Meta for Developers, WhatsApp Business Platform, "Template categorization" (atualizada em 30/01/2025)'
    source_date: '2025-01-30'
    checked_at: '2026-11-20T15:11:00Z'
    limit: 'Documentação de plataforma, sujeita a mudança; a página não traz exemplo específico de aviso de pagamento em atraso. Não define preço nem aprovação de modelo.'
  - classification: HIPÓTESE
    claim: 'A Distribuidora Exemplo Ltda., o Restaurante Exemplo Ltda., a Oficina Exemplo Ltda., a Padaria Exemplo Ltda., os títulos T-4512, T-4518, T-4521, T-4522 e T-4530, os valores, as datas, os passos da régua (D−3, D+1, D+5, D+10, D+15, D+30), os canais, os horários, os percentuais de multa e juros do contrato, a ordem de quitação do pagamento parcial, a alçada de acordo, o prazo de pausa do pagamento informado e as decisões do exemplo são modelo editorial fictício e recomendação de modelagem da Torno, não requisito legal, nem limite legal, nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; datas e contas refeitas em Python (datetime e Decimal) em 20/11/2026.
    entity: Torno
    limit: Não representam cliente, empresa, contrato, título, cobrança real ou sistema entregue, nem percentuais, prazos ou passos recomendados.
---

*Leitura estimada: 23 minutos.*

**Antes de automatizar a régua de cobrança, escreva e aprove dez regras: quais toques saem antes e depois do vencimento e como os dias são contados; em que canais, em que horários e com que frequência; o que acontece quando o e-mail volta ou o contato pede para não receber por um canal; quais eventos param ou pausam a régua, e de onde cada evento vem; qual multa, quais juros e qual correção o sistema calcula, e de onde vem cada percentual; como sai a segunda via com valor atualizado; o que fazer com pagamento parcial e com o cliente que tem vários títulos; quem decide negativar ou protestar; o que a mensagem pode e não pode dizer; e o que fica registrado de cada envio.** Depois, teste com títulos fictícios cujas datas e valores você já conferiu à mão: um vencimento em feriado, um pagamento que entra minutos antes do aviso, um pagamento parcial, uma contestação e um e-mail que volta. Sem isso, o sistema manda aviso de atraso para quem pagou ontem, cobra multa de quem pagou no primeiro dia útil depois do feriado e deixa a decisão de negativar um cliente nas mãos de um agendamento.

**Este artigo não é parecer jurídico e não recomenda bureau de crédito, banco, cartório, plataforma de mensagens nem fornecedor de software.** As leis aparecem pelo que o texto diz; o que elas significam no seu contrato e no seu tipo de cliente é pergunta para o advogado. Empresa, clientes, títulos e números do exemplo são inventados.

## O que a planilha de vencidos faz e a régua automática precisa fazer melhor

Em muitas empresas pequenas e médias, a cobrança é uma planilha de títulos vencidos, filtrada de manhã por alguém do financeiro, que manda e-mails e mensagens copiando um texto de uma conversa anterior. A pessoa sabe que o cliente X avisou que ia pagar na sexta, que o cliente Y reclamou da mercadoria e que o cliente Z mudou de e-mail. A planilha não sabe.

A **régua de cobrança** é a sequência combinada de contatos com o cliente em volta do vencimento: lembrete antes, avisos depois, uma ligação, e uma decisão sobre o que fazer se nada der certo. Automatizar a régua é passar para o sistema a parte repetitiva desse trabalho. O risco é passar junto, sem perceber, as decisões que a pessoa tomava de cabeça: não cobrar quem já pagou, não cobrar o título contestado, não mandar mensagem de domingo, não ameaçar com o que a empresa não vai fazer.

A régua de cobrança automática só funciona se cada uma dessas decisões virar regra escrita, com dono, e se o sistema souber, na hora de enviar, o estado real de cada título.

### Norma, documentação, interpretação e recomendação

Ajuda separar quatro camadas, e o texto sinaliza cada uma:

- **Norma.** O Código de Defesa do Consumidor, a lei de protesto, a LGPD e o Código Civil dizem algumas coisas sobre cobrança. Cito o que o texto diz e o artigo de onde vem.
- **Documentação.** O manual do Pix do Banco Central e a documentação do WhatsApp para empresas mostram como um meio de pagamento e um canal de mensagens modelam valor atualizado, vencimento, permissão e categoria de mensagem. Não são regra para a sua empresa.
- **Interpretação.** Se uma regra do CDC vale para o seu cliente empresa, se a notificação por e-mail basta, se a multa do contrato é válida: isso é interpretação, e fica com o advogado. Onde houver interpretação, o texto diz que é pergunta para ele.
- **Recomendação da Torno.** Onde digo "recomendação da Torno", é uma sugestão de modelagem do sistema, não requisito legal nem comportamento padrão de ferramenta.

## O que este artigo não repete

A régua depende de vários assuntos que têm artigo próprio aqui no blog:

- **Baixa do pagamento.** A régua para quando o pagamento é baixado, e a baixa vem da [conciliação bancária](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/), por extrato, retorno de cobrança ou Pix. Aqui interessa só o efeito da baixa na régua e o horário entre as duas rotinas.
- **Confirmação do pagamento.** Quando o pagamento é confirmado por aviso assíncrono do meio de pagamento, os estados e as repetições estão em [integração de pagamentos](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/).
- **Pix Automático.** A cobrança recorrente autorizada pelo pagador, com seu próprio ciclo de tentativas, está em [Pix Automático no sistema](https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/). Aqui a régua vale para qualquer título vencido, qualquer que seja o meio.
- **Canais.** Permissão, modelos e custos do WhatsApp estão em [WhatsApp no sistema](https://tornostudio.com/blog/whatsapp-sistema-avisos-automaticos-aceite/); os estados de envio e falha de e-mail, em [e-mails do sistema](https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/).
- **Comissão.** O que a inadimplência faz com a comissão do vendedor está em [comissão de vendedores](https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/).

## Os toques: antes, no e depois do vencimento

A régua é uma lista de passos, cada um com um dia relativo ao vencimento, um canal e um texto. Um exemplo comum: lembrete três dias antes, aviso no dia seguinte ao vencimento, outro cinco dias depois, outro dez dias depois, uma ligação, e uma decisão sobre o que fazer a partir do trigésimo dia. Os números são da empresa. O que precisa estar escrito:

- **O lembrete antes do vencimento é cobrança ou serviço?** Um lembrete de vencimento automático, com o link da segunda via, é um aviso útil. Ele não deve soar como cobrança de quem ainda não deve nada. Escreva o texto pensando nisso.
- **Dias corridos ou dias úteis.** "D+5" é cinco dias corridos depois do vencimento ou cinco dias úteis? Os dois funcionam; o que não funciona é cada pessoa entender de um jeito.
- **Vencimento em dia não útil.** Se o título vence num feriado, o vencimento efetivo é o dia útil seguinte? Pelo contrato, pelo banco, pela regra do meio de pagamento? O manual do Pix do Banco Central, por exemplo, diz que, na cobrança com vencimento, [a data de vencimento que cai em fim de semana ou feriado é prorrogada para o dia útil seguinte](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf). Se o sistema conta o atraso a partir da data impressa e o meio de pagamento a partir do dia útil seguinte, o aviso de atraso sai para quem pagou em dia. Confirme a regra de cada meio que você usa.
- **Toque que cai em dia não útil.** O D+5 caiu num domingo: vai para segunda, é antecipado para sexta, ou é pulado? E o lembrete antes do vencimento que cai num feriado?
- **Calendário.** Qual calendário de feriados vale: nacional, do estado, da cidade da empresa, da cidade do cliente? A regra geral de datas está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **O último passo.** O que acontece depois do último aviso? Recomendação da Torno: o último passo automático não envia nada ao cliente; abre uma tarefa para uma pessoa decidir.

## Horários e frequência

A régua pode cumprir todas as datas e, mesmo assim, incomodar o cliente.

- **Janela de envio.** Em que horários a régua pode enviar, e em que dias? O CDC tipifica como crime, na cobrança de dívidas do consumidor, o procedimento que [interfira com seu trabalho, descanso ou lazer](https://planalto.gov.br/ccivil_03/LEIS/L8078.htm) (art. 71). Se isso se aplica à sua cobrança e o que significa em horários concretos é pergunta para o advogado. Recomendação da Torno: escreva uma janela (por exemplo, dias úteis, das 9h às 18h, no fuso do cliente) e faça o sistema respeitá-la sempre.
- **Rotina atrasada.** Se a rotina que dispara a régua falha às 9h e só roda às 22h, ela envia às 22h? Não deveria. A rotina que não rodou precisa virar alerta, como em [monitoramento de fluxo crítico](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/), e o envio passa para o próximo horário permitido.
- **Frequência por cliente.** O cliente com cinco títulos em atraso não deve receber cinco mensagens no mesmo dia. Defina um limite de contatos por cliente por dia e por semana, e agrupe os títulos numa mensagem só.
- **Cliente com dois cadastros.** Se o mesmo cliente está cadastrado duas vezes, ele recebe a régua em dobro e o limite de frequência não funciona. O tratamento está em [cadastro duplicado de clientes](https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/).

![Ilustração de um mostrador circular com a régua de cobrança do título T-4512, de R$ 4.800,00, do Restaurante Exemplo Ltda., cliente da Distribuidora Exemplo Ltda. Cada marca do anel equivale a cerca de um dia. No topo, o vencimento original, segunda-feira 02/11/2026, feriado de Finados, marcado em amarelo, com a indicação de que o vencimento efetivo passa para terça-feira, 03/11. No sentido anti-horário, antes do topo, o lembrete de 30/10, D−3, por e-mail. No sentido horário, depois do topo: 04/11, D+1, e-mail e WhatsApp; 09/11, D+5, porque 08/11 é domingo; 13/11, D+10, marcado com um X vermelho e a nota não sai; 18/11, D+15, telefonema, e 03/12, D+30, fila de decisão humana, os dois tracejados como cancelados. Um traço vermelho corta o anel em 13/11, antes do D+10: no centro, a explicação, pago em 13/11 às 7h50 por Pix, baixa às 8h30 pela conciliação, 10 dias de atraso, R$ 4.912,00. O anel fica cinza depois do pagamento e há um trecho marcado como fora da régua. Abaixo, as regras do exemplo: vencimento em dia não útil passa ao dia útil seguinte; toque depois do vencimento que cai em dia não útil vai para o dia útil seguinte; envio só em dia útil, das 9h às 18h; no máximo um toque por cliente por dia, com os títulos agrupados; a régua só roda depois da conciliação do dia; o D+30 nunca envia nada e abre uma decisão humana. Exemplo fictício.](./torno-cobranca-mostrador-regua.svg)

*Exemplo fictício: empresas, título, datas e valores inventados; os dias de cada toque, os canais e os horários são escolhas da empresa do exemplo, não recomendação. Ilustração original Torno, 2026.*

## Canais, permissão e o e-mail que voltou

E-mail, WhatsApp, SMS, telefonema, carta. A régua costuma combinar alguns. Para cada canal, escreva:

- **De onde vem o contato.** Qual e-mail e qual telefone recebem a cobrança: o do cadastro do cliente, o do contato financeiro, o do comprador? Em B2B, mandar o aviso de atraso para o comprador que fez o pedido, e não para o contas a pagar do cliente, costuma só atrasar o pagamento e criar constrangimento desnecessário.
- **Permissão.** A documentação do WhatsApp para empresas diz que a empresa precisa [obter opt-in antes de enviar mensagens, com o nome da empresa e a indicação clara de que a pessoa concorda em receber mensagens dela](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in), e, entre as dicas da página, recomenda dar instruções claras para deixar de receber categorias específicas de mensagem e honrar esses pedidos. A mesma plataforma diz que modelos de utilidade [não podem ter conteúdo promocional](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization), e que o modelo que mistura utilidade e marketing é tratado como marketing. Na prática: o aviso de cobrança não carrega oferta. O resto do desenho do canal está em [WhatsApp no sistema](https://tornostudio.com/blog/whatsapp-sistema-avisos-automaticos-aceite/).
- **Pedido para não receber por um canal.** O contato responde "não quero receber cobrança por aqui". Recomendação da Torno: o sistema registra o pedido, para aquele canal para aquele contato, e continua pelos outros canais que a empresa decidiu manter. Se a empresa pode continuar cobrando por outro canal, e com qual base, é decisão com o advogado e o encarregado de dados (veja a seção de LGPD).
- **E-mail que voltou.** O provedor informa que o endereço não existe. O sistema marca o endereço como inválido, não insiste nele nos próximos passos e abre uma tarefa para o financeiro atualizar o contato. Se houver outro canal com permissão, a régua pode usá-lo. Sem nenhum canal válido, o passo não sai, e isso precisa aparecer numa fila, não sumir. A diferença entre "aceito pelo provedor", "entregue" e "voltou" está em [e-mails do sistema](https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/).
- **Telefonema.** A ligação é feita por uma pessoa. O sistema gera a tarefa, mostra o histórico de envios e registra o resultado da ligação.

## Quando a régua para ou pausa

Aqui está a regra que mais gera reclamação depois do go-live: a régua que não para. Separe parar de pausar. Parar encerra a régua do título. Pausar suspende os envios até uma data ou condição, e a régua volta sozinha se a condição não se cumprir.

- **Pagamento baixado.** A régua para quando o pagamento é baixado no título. A baixa depende da [conciliação](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/): se a conciliação do dia roda às 8h30 e a régua às 9h, o cliente que pagou às 7h50 não recebe o aviso. Se a conciliação atrasa e a régua roda antes, ele recebe. **A régua precisa esperar a conciliação do dia terminar**, ou não enviar. Escreva até que horas ela espera e o que acontece se a conciliação não terminar.
- **Aviso de pagamento repetido.** O meio de pagamento manda o mesmo aviso duas vezes. O título não pode ser baixado duas vezes, nem a régua reaberta por um estorno que não existiu; o tratamento é o de [evento duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Pagamento informado.** O cliente manda o comprovante, mas o dinheiro ainda não apareceu no extrato. Recomendação da Torno: pausa curta, com prazo escrito; se a baixa não vier no prazo, o título vai para uma fila do financeiro, não volta calado para a régua.
- **Acordo.** O financeiro combinou com o cliente uma data de pagamento ou parcelas. A régua pausa até a data. Se o acordo não for cumprido, a régua volta, no passo que a empresa definiu. Quem pode fazer acordo, até que valor e com que desconto, é alçada, como em [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/).
- **Contestação.** O cliente diz que a mercadoria veio errada, que o serviço não foi prestado, que o valor está errado. A régua pausa **só o título contestado**, até a contestação ser resolvida. Os outros títulos do mesmo cliente seguem.
- **Cancelamento e devolução.** A nota foi cancelada, o pedido foi devolvido. O título sai da régua, ou tem o valor abatido. A devolução tem regras próprias em [devolução e troca de mercadoria](https://tornostudio.com/blog/devolucao-troca-mercadoria-sistema-aceite/).
- **Renegociação.** O título original é substituído por títulos novos. O original para; os novos têm a régua deles, com os vencimentos novos.
- **Quem pode parar.** Pausar e encerrar a régua de um título são ações com perfil próprio, nas [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/). Cada ação grava quem, quando e por quê.

![Ilustração de um quadro com oito interruptores que mudam a régua de cobrança da Distribuidora Exemplo Ltda. Cada interruptor tem o evento, quem o registra e o efeito, em etiqueta colorida. 1, pagamento baixado, registrado pela conciliação: para, régua do título encerrada. 2, pagamento informado, registrado pelo cliente com comprovante: pausa por até 2 dias úteis; sem baixa, vai para a fila. 3, acordo registrado pelo financeiro: pausa até a data; se o acordo for quebrado, a régua retoma. 4, contestação aberta, registrada pelo financeiro ou pelo comercial: pausa só o título contestado. 5, título cancelado, registrado pelo faturamento: para, por nota fiscal cancelada ou devolução total. 6, renegociação, registrada pelo financeiro com alçada: para, o título original sai e o título novo tem régua nova. 7, opt-out de canal, pedido pelo contato do cliente: troca, só aquele canal deixa de ser usado. 8, e-mail que voltou, informado pelo provedor de e-mail: troca, o endereço fica inválido e a régua usa outro canal ou abre uma fila. No rodapé: parar é diferente de pausar, porque a pausa tem data ou condição de volta, e cada acionamento grava quem, quando, por quê e qual título. Exemplo fictício.](./torno-cobranca-interruptores.svg)

*Exemplo fictício: eventos, efeitos e responsáveis são escolhas da empresa do exemplo; o que importa é que cada interruptor exista, tenha dono e deixe registro. Ilustração original Torno, 2026.*

## Multa, juros e correção: de onde vem cada número

A régua mostra um valor ao cliente. Esse valor precisa ser o que o contrato permite, calculado do mesmo jeito em todos os lugares: no aviso, na segunda via, no boleto ou no Pix, e na baixa.

**De onde vem a regra.** Em primeiro lugar, do contrato com o cliente: o percentual de multa, os juros de mora e o índice de correção, se houver. O sistema não deve inventar encargo que o contrato não prevê. Quando o contrato é omisso, o Código Civil tem regras supletivas: com a redação dada pela Lei 14.905/2024, [na falta de índice convencionado aplica-se o IPCA, e, quando a taxa de juros não foi estipulada, a taxa legal é a Selic menos o IPCA, considerada zero se der negativa](https://planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14905.htm) (arts. 389 e 406). A mesma lei diz que a Lei de Usura não se aplica a obrigações contratadas entre pessoas jurídicas. Qual regra vale para cada contrato é pergunta para o advogado; o que o sistema precisa é **saber, para cada título, qual regra está aplicando e de onde ela veio**.

**Multa como cláusula penal.** O Código Civil diz que [o valor da cláusula penal não pode exceder o da obrigação principal e que o juiz deve reduzi-la equitativamente se a obrigação tiver sido cumprida em parte ou se o montante for manifestamente excessivo](https://www.projuris.com.br/ccc/cc-comentado-da-clausula-penal-art-408-ao-416/) (arts. 412 e 413; li esses artigos numa reprodução do texto da lei, não no Planalto). O que isso significa para a multa do seu contrato, inclusive em pagamento parcial, é pergunta para o advogado.

**Relação de consumo.** Se a empresa vende a consumidores com crédito ou financiamento, o CDC diz que, nesse fornecimento, [as multas de mora não podem ser superiores a 2% do valor da prestação](https://planalto.gov.br/ccivil_03/LEIS/L8078.htm) (art. 52, §1º, na redação da Lei 9.298/1996), e exige informação prévia sobre juros de mora e acréscimos. O alcance exato desse limite fora do crédito e do financiamento, e se um cliente empresa pode ser tratado como consumidor, são perguntas para o advogado. O CDC também diz que o consumidor cobrado em quantia indevida tem direito a receber em dobro o que pagou em excesso, salvo engano justificável (art. 42, parágrafo único): mais um motivo para o cálculo estar certo e testado. Recomendação da Torno: se a empresa tem clientes empresa e pessoa física, o sistema distingue os dois e não aplica a régua de um ao outro sem regra escrita.

**As perguntas de sistema:**

- **A partir de quando.** Os juros contam do dia seguinte ao vencimento efetivo, ou do vencimento impresso? É a armadilha do feriado do exemplo abaixo.
- **Juros proporcionais.** Mês de 30 dias, ou dias reais do mês? Simples ou compostos? Escreva a fórmula.
- **Multa uma vez.** A multa incide uma vez por título, não a cada aviso, nem de novo sobre o saldo depois de um pagamento parcial, salvo regra do contrato.
- **Arredondamento.** Em que etapa o valor é arredondado e como os centavos fecham entre aviso, segunda via e baixa. Os cuidados estão em [valores monetários e arredondamento](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/).
- **Desconto e dispensa.** Quem pode dispensar multa ou juros, e até quanto. É alçada, com registro.

### Segunda via com valor atualizado

O cliente pede a segunda via no dia 12 para pagar no dia 13. O valor da segunda via é o devido no dia em que ele pretende pagar, não no dia em que pediu. O manual do Pix do Banco Central mostra esse desenho na cobrança com vencimento: o recebedor calcula [o valor final, considerados abatimento, desconto, juros e multa, a partir da data de pagamento pretendida](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf), e um campo indica por quantos dias depois do vencimento a cobrança ainda pode ser paga. Se a empresa usa boleto ou Pix com encargos calculados pelo banco ou pelo PSP, **os percentuais configurados lá precisam ser os mesmos do sistema**; senão, o aviso diz um valor e o meio de pagamento cobra outro. A segunda via em PDF é um documento do momento da emissão, como em [gerar documentos em PDF](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/): guarde o valor e a data para os quais ela foi emitida.

## Pagamento parcial e cliente com vários títulos

Dois casos que a planilha resolve de cabeça e o sistema precisa resolver por regra.

**Pagamento parcial.** O cliente deve R$ 1.226,80 e paga R$ 1.000,00. O pagamento quita primeiro os encargos ou primeiro o principal? Sobre o saldo, correm juros? Incide nova multa? A ordem de quitação vem do contrato e do que o advogado orientar; o sistema precisa aplicá-la sempre do mesmo jeito, mostrar o saldo atualizado no próximo aviso e não reiniciar a régua do zero como se fosse um título novo.

**Cliente com vários títulos.** O cliente tem um título vencido, um contestado e um que ainda vai vencer. Cada título tem o seu estado; a contestação de um não pausa os outros, e o pagamento de um não para a régua dos outros. A mensagem agrupa os títulos do dia, mas cada título é baixado, pausado ou encerrado por conta própria. E quando o cliente paga um valor sem dizer qual título: qual é quitado primeiro, o mais antigo? Escreva a regra e a fila de exceções.

## Negativação e protesto: decisão humana

Negativar o cliente num cadastro de proteção ao crédito e levar o título a protesto em cartório têm efeito grande e difícil de desfazer sobre o cliente. **Recomendação da Torno: nenhum dos dois sai de um agendamento.** A régua pode chegar ao passo em que a decisão é proposta; a decisão é de uma pessoa com alçada, registrada com nome, data e motivo, depois de conferir que o título não está pago, contestado, em acordo ou cancelado, e com a orientação do advogado.

O que a lei diz e por que isso importa para o sistema:

- **Comunicação prévia.** O CDC diz que [a abertura de cadastro deve ser comunicada por escrito ao consumidor quando não solicitada por ele](https://planalto.gov.br/ccivil_03/LEIS/L8078.htm) (art. 43, §2º), e que informações negativas não podem ficar por mais de cinco anos (§1º). A Súmula 359 do STJ diz que [cabe ao órgão mantenedor do cadastro de proteção ao crédito a notificação do devedor antes de proceder à inscrição](https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=359). O meio dessa notificação mudou de entendimento: segundo uma [publicação de escritório de advocacia](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/inteligencia-juridica-contencioso/como-notificar-a-inscricao-em-cadastro-de-inadimplentes), uma turma do STJ decidiu em 2023 que e-mail ou SMS sozinhos não bastavam; segundo [notícia de 2024](https://www.migalhas.com.br/quentes/415506/stj-consumidor-pode-ser-notificado-por-sms-sobre-negativacao), a mesma turma passou a admitir o meio eletrônico, alinhada a outra turma que exigiu comprovar envio e entrega. Não li os acórdãos. Para o sistema, a consequência é guardar, de cada título enviado a cadastro, o que foi enviado, quando, a quem e com qual comprovante.
- **Protesto.** A Lei 9.492/1997 define o protesto como [o ato formal e solene que prova a inadimplência e o descumprimento de obrigação originada em títulos e outros documentos de dívida](https://planalto.gov.br/ccivil_03/leis/l9492.htm) (art. 1º). A intimação do devedor é feita pelo tabelião (art. 14), e o pagamento do título apresentado é feito no tabelionato, com emolumentos e despesas (art. 19). Para o sistema, isso significa que, depois que o título vai a protesto, o dinheiro pode chegar por outro caminho, e a régua não deveria continuar mandando o link de pagamento como se nada tivesse acontecido. Escreva, com o advogado, o que a régua faz com o título em protesto. O cancelamento do protesto pode exigir [declaração de anuência do credor](https://planalto.gov.br/ccivil_03/leis/l9492.htm) (art. 26): quando o cliente paga depois do protesto, o sistema gera a tarefa de emitir a anuência.
- **Depois do pagamento.** O título negativado foi pago. Quem pede a baixa no cadastro, em que prazo e como se comprova é pergunta para o advogado; para o sistema, a baixa do pagamento de um título negativado gera uma tarefa no mesmo dia, com prazo e dono.

![Ilustração de uma escada de quatro degraus, à esquerda, com uma caixa à direita na altura de cada degrau, mostrando quem decide cada passo da cobrança na Distribuidora Exemplo Ltda.; quanto mais alto o degrau, maior o efeito sobre o cliente e menos o sistema decide sozinho. Degrau 1, sistema, por regra aprovada: lembrete D−3 e avisos D+1, D+5 e D+10, segunda via com valor atualizado, parar com a baixa e pausar com acordo ou contestação registrados. Degrau 2, equipe do financeiro: telefonema no D+15, acordo dentro da alçada, registro da contestação e atualização do contato que voltou. Degrau 3, gestor financeiro ou diretoria: acordo fora da alçada, dispensa de multa ou juros e proposta de negativação ou protesto a partir do D+30. Degrau 4, advogado: texto dos avisos, multa e juros, relação de consumo, LGPD, notificação prévia, protesto e cobrança judicial. Abaixo, uma nota em vermelho: negativação e protesto nunca saem de um agendamento; saem de uma decisão registrada, com nome, data e a orientação do advogado anexada. Exemplo fictício.](./torno-cobranca-escada-decisao.svg)

*Exemplo fictício: degraus, alçadas e responsáveis são escolhas da empresa do exemplo; em outra empresa, os nomes mudam, mas a escada continua existindo. Ilustração original Torno, 2026.*

## O que a mensagem pode e não pode dizer

O texto de cada passo é decisão da empresa, revisada pelo advogado. Algumas regras de sistema ajudam:

- **Sem exposição e sem ameaça.** O CDC diz que, na cobrança de débitos, [o consumidor inadimplente não será exposto a ridículo nem submetido a qualquer tipo de constrangimento ou ameaça](https://planalto.gov.br/ccivil_03/LEIS/L8078.htm) (art. 42), e o art. 71 tipifica como crime, entre outros, o uso de ameaça e de afirmações falsas, incorretas ou enganosas na cobrança. Para o sistema: a mensagem vai para o contato responsável pelo pagamento, não para grupos, não com cópia para terceiros, e não com o valor devido no assunto ou na prévia da notificação quando o canal mostra isso a quem estiver olhando a tela. E a régua não anuncia negativação ou protesto que a empresa não decidiu fazer; uma ameaça que não se cumpre pode ser exatamente a afirmação enganosa que a lei proíbe, e a avaliação disso é do advogado.
- **Identificação de quem cobra.** O CDC diz que os documentos de cobrança apresentados ao consumidor devem trazer [nome, endereço e CPF ou CNPJ do fornecedor](https://planalto.gov.br/ccivil_03/LEIS/L8078.htm) (art. 42-A). Recomendação da Torno: inclua esses dados em todos os modelos, de consumidor ou de empresa; custa uma linha.
- **Dados do título.** Número do título ou da nota, vencimento, valor original, encargos e valor atualizado, e como pagar. Se o valor mudou desde o último aviso, a mensagem diz por quê.
- **Canal de resposta.** Como o cliente informa que pagou, que quer negociar ou que contesta. A resposta precisa chegar a uma pessoa e virar evento no título (pagamento informado, acordo, contestação), não ficar perdida numa caixa de entrada.
- **Versão do modelo.** O texto muda com o tempo. Cada envio guarda qual versão do modelo foi usada.

## LGPD: base legal, minimização e pedido de não receber

Em B2B, a cobrança vai para pessoas: o contato financeiro do cliente, o sócio, o comprador. O nome, o e-mail e o telefone delas são dados pessoais. A LGPD lista as hipóteses em que o tratamento pode ocorrer, entre elas [a execução de contrato, o exercício regular de direitos, o legítimo interesse e a proteção do crédito](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/Lei/L13709.htm) (art. 7º, V, VI, IX e X). Qual delas sustenta a sua régua é decisão do controlador com o encarregado e o advogado; o artigo não escolhe. Para o sistema:

- **Registre a base escolhida** para o tratamento de cobrança, e a permissão por canal quando o canal a exige (como o opt-in do WhatsApp, que é regra da plataforma e não substitui a análise da LGPD).
- **Minimização.** A régua usa os dados necessários para cobrar; não precisa de mais. A lei fala em [limitação ao mínimo necessário](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/Lei/L13709.htm) (art. 6º, III).
- **Pedido do titular.** O pedido de acesso, correção ou oposição de um contato segue o fluxo de [pedido do titular na LGPD](https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/). Corrigir o e-mail de um contato precisa atualizar a régua no mesmo dia.
- **Registro das operações.** A LGPD exige que controlador e operador mantenham [registro das operações de tratamento](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/Lei/L13709.htm) (art. 37). O registro de envios da régua é parte disso.

## Registro auditável do que foi enviado

Quando o cliente diz "nunca recebi aviso" ou "vocês me cobraram depois que eu paguei", a resposta está no registro. Recomendação da Torno: cada envio grava, no mínimo:

- título ou títulos incluídos, passo da régua e motivo do disparo;
- canal, destinatário e de onde o contato veio;
- modelo e versão do texto, e o valor mostrado, com a data de referência do cálculo;
- horário previsto, horário de envio e resultado (aceito pelo provedor, entregue, falhou, voltou);
- estado do título no momento do envio (aberto, pago, pausado), para provar que a régua consultou o estado antes de enviar;
- e, para cada pausa, encerramento, acordo, contestação, proposta e decisão de negativação ou protesto: quem, quando, por quê.

O que um registro de auditoria precisa ter para servir de prova está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Quem decide cada regra

| Definição | Quem decide |
|---|---|
| Passos da régua, dias, contagem e regra de dia não útil | Gestor financeiro |
| Canais, janela de envio e limite de frequência por cliente | Gestor financeiro, com comercial (relacionamento com o cliente) |
| Texto de cada passo e o que a mensagem pode prometer | Gestor financeiro, revisado pelo advogado |
| Multa, juros, índice de correção e fórmula | Contrato, com o advogado; contador para o efeito contábil |
| Ordem de quitação do pagamento parcial e de pagamento sem título indicado | Contrato, com o advogado e o gestor financeiro |
| Prazo de pausa do pagamento informado e fila de exceções | Gestor financeiro |
| Alçada de acordo, desconto e dispensa de encargos | Diretoria, com [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) |
| Quem registra contestação e quem a resolve | Financeiro e comercial |
| Proposta e decisão de negativação e de protesto | Gestor financeiro ou diretoria, com o advogado |
| O que a régua faz com título em protesto, negativado ou em cobrança judicial | Advogado e gestor financeiro |
| Base legal, permissão por canal e pedido de não receber | Encarregado de dados e advogado |
| Dependência entre conciliação e régua, horários das rotinas e alertas | Financeiro e TI |
| Quem pode pausar, encerrar e reabrir a régua de um título | Gestor financeiro, com as [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) |

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Exemplo Ltda. vende embalagens e material de limpeza só para empresas, com boleto e Pix. Regras da empresa (escolhas do exemplo, tiradas do contrato fictício com os clientes, não recomendação nem limite legal):

- **Passos.** D−3: lembrete por e-mail. D+1, D+5 e D+10: aviso por e-mail e, se houver opt-in, por WhatsApp, com segunda via. D+15: tarefa de telefonema para o financeiro. D+30: tarefa de decisão para o gestor financeiro (negativação, protesto ou cobrança pelo advogado); **nada é enviado ao cliente nem a terceiros automaticamente**.
- **Dias.** Vencimento em dia não útil passa para o dia útil seguinte (vencimento efetivo). Passos depois do vencimento contam dias corridos a partir do vencimento efetivo; se caem em dia não útil, vão para o dia útil seguinte. O lembrete D−3 conta do vencimento impresso; se cai em dia não útil, é antecipado para o dia útil anterior.
- **Janela.** Envio só em dia útil, das 9h às 18h. No máximo um contato por cliente por dia, com os títulos do dia agrupados.
- **Rotinas.** A conciliação do dia roda às 8h30. A régua roda às 9h, só depois de a conciliação terminar; se ela não terminar até as 11h, a régua do dia não envia e o financeiro recebe um alerta.
- **Encargos.** Multa de 2% sobre o principal, uma única vez. Juros de 1% ao mês sobre o principal em aberto, proporcionais aos dias de atraso, em mês de 30 dias, contados a partir do dia seguinte ao vencimento efetivo. Valores arredondados a centavos, metade para cima, no fim de cada cálculo.
- **Pagamento parcial.** Quita primeiro multa e juros vencidos e depois o principal; sobre o saldo correm juros, sem nova multa.
- **Paradas.** Pagamento baixado: para. Pagamento informado com comprovante: pausa por até 2 dias úteis; sem baixa, fila do financeiro. Acordo: pausa até a data combinada; quebrado, retoma no dia útil seguinte com aviso de acordo não cumprido e mantém o D+30 na data original. Contestação: pausa só o título. Cancelamento ou devolução total: para. Opt-out de canal: para só aquele canal. E-mail que voltou: endereço inválido, tarefa para atualizar o contato.
- **Alçada.** O financeiro pode combinar nova data de pagamento até 10 dias depois do acordo, sem desconto; desconto ou dispensa de encargos é do gestor.

**Os clientes e os títulos** (vencimento impresso em segunda-feira, 02/11/2026, feriado de Finados, exceto onde indicado; vencimento efetivo terça-feira, 03/11):

| Cliente | Título | Valor | Situação no exemplo |
|---|---|---|---|
| Restaurante Exemplo Ltda. | T-4512 | R$ 4.800,00 | Paga em 13/11 |
| Padaria Exemplo Ltda. | T-4518 | R$ 3.000,00 | E-mail volta; acordo; paga em 26/11 |
| Oficina Exemplo Ltda. | T-4521 | R$ 1.200,00 | Pagamento parcial em 10/11; quita em 17/11 |
| Oficina Exemplo Ltda. | T-4530 | R$ 650,00 | Vence qui 05/11; contestado em 06/11 |
| Oficina Exemplo Ltda. | T-4522 | R$ 1.200,00 | Vence qui 03/12; ainda não vencido |

**Sexta-feira, 30/10.** O lembrete D−3 sai às 9h. A Oficina recebe um único e-mail com o T-4521 e o T-4530 (o D−3 do T-4530, de quinta 05/11, cairia em 02/11, feriado, e foi antecipado para 30/10). O e-mail da Padaria volta às 9h02, com falha permanente: o endereço é marcado como inválido; a Padaria não tem opt-in de WhatsApp; o financeiro recebe a tarefa de atualizar o contato.

**Quarta-feira, 04/11 (D+1).** Restaurante e Oficina recebem e-mail e WhatsApp. A Padaria não recebe nada: não há canal válido, e o passo fica na fila do financeiro. Na quinta, 05/11, o financeiro atualiza o e-mail da Padaria.

**Sexta-feira, 06/11.** Às 8h40, a Oficina liga dizendo que parte da mercadoria do T-4530 veio avariada; o financeiro registra a contestação. O D+1 do T-4530 não sai às 9h. O T-4521 continua na régua.

**Segunda-feira, 09/11 (D+5; 08/11 foi domingo).** Restaurante, Padaria (no e-mail novo) e Oficina recebem o aviso. Às 10h, o contato da Oficina responde no WhatsApp que não quer receber cobrança por ali; o pedido é registrado e o WhatsApp sai da régua da Oficina.

**Terça-feira, 10/11.** A Oficina paga R$ 1.000,00 do T-4521. Com 7 dias de atraso, o título devia R$ 1.226,80: principal 1.200,00, multa 24,00 (2%), juros 2,80 (1.200 × 1% × 7/30). O pagamento quita 26,80 de encargos e 973,20 do principal; saldo de R$ 226,80.

**Quinta-feira, 12/11.** O Restaurante pede a segunda via para pagar no dia seguinte: R$ 4.912,00.

**Sexta-feira, 13/11 (D+10).** O Restaurante paga por Pix às 7h50; a conciliação baixa o T-4512 às 8h30; às 9h a régua não envia o D+10 para o Restaurante e cancela o D+15 e o D+30 do título. A Oficina recebe o D+10 do T-4521 só por e-mail, com o saldo atualizado: 226,80 + juros de 3 dias (226,80 × 1% × 3/30 = 0,2268, arredondado para 0,23) = R$ 227,03. A Padaria recebe o D+10 por e-mail.

**Terça-feira, 17/11.** A Oficina paga o saldo do T-4521: 226,80 + juros de 7 dias desde 10/11 (226,80 × 1% × 7/30 = 0,5292, arredondado para 0,53) = R$ 227,33, sem nova multa. A régua do T-4521 para.

**Quarta-feira, 18/11 (D+15).** O financeiro liga para a Padaria. **Quinta-feira, 19/11:** acordo para pagar o T-4518 em quinta, 26/11, com os encargos do contrato até essa data: 3.000,00 + multa 60,00 + juros de 23 dias (3.000 × 1% × 23/30 = 23,00) = R$ 3.083,00. A régua do T-4518 pausa até 26/11. A Padaria paga em 26/11; a régua para.

| Título | Data do pagamento | Dias de atraso | Principal quitado | Multa | Juros | Total pago |
|---|---|---|---|---|---|---|
| T-4512 | 13/11 | 10 | 4.800,00 | 96,00 | 16,00 | 4.912,00 |
| T-4521 (parcial) | 10/11 | 7 | 973,20 | 24,00 | 2,80 | 1.000,00 |
| T-4521 (saldo) | 17/11 | 7 desde 10/11 | 226,80 | — | 0,53 | 227,33 |
| T-4518 | 26/11 | 23 | 3.000,00 | 60,00 | 23,00 | 3.083,00 |

**A armadilha do feriado.** Se o sistema contasse o atraso do T-4512 a partir de 02/11, o vencimento impresso, seriam 11 dias, juros de R$ 17,60 (4.800 × 1% × 11/30) e total de R$ 4.913,60: R$ 1,60 a mais do que o contrato do exemplo permite. E quem pagasse em 03/11 receberia aviso de atraso e cobrança de multa por ter pago no primeiro dia útil depois do feriado.

![Ilustração de dois títulos fictícios em corte, com as regras do contrato do exemplo: multa de 2% uma única vez e juros de 1% ao mês, proporcionais aos dias, em mês de 30 dias. Primeiro, o T-4512 do Restaurante Exemplo Ltda., pago em 13/11, como um bloco empilhado: principal de R$ 4.800,00 na base, multa de 2%, R$ 96,00, acima, e juros de 10 dias, R$ 16,00, no topo, com o total de R$ 4.912,00 e a conta 4.800 × 1% × 10/30 = 16,00, atraso de 03/11 a 13/11; as camadas estão fora de escala. Ao lado, dois erros em vermelho: contar o atraso desde 02/11, o feriado, daria 11 dias, juros de R$ 17,60 e total de R$ 4.913,60, R$ 1,60 a mais; e cobrar encargos de quem pagou em 03/11, que deve R$ 4.800,00 sem multa e sem juros. Uma caixa diz que a segunda via emitida em 12/11 para pagamento em 13/11 sai por R$ 4.912,00, porque o valor muda com a data de pagamento pretendida. Abaixo, o T-4521 da Oficina Exemplo Ltda., com pagamento parcial: em 10/11, uma barra com principal de R$ 1.200,00, multa de R$ 24,00 e juros de R$ 2,80, total R$ 1.226,80; abaixo dela, o pagamento de R$ 1.000,00, que pela regra do contrato do exemplo quita primeiro os encargos, R$ 26,80, e depois R$ 973,20 do principal, deixando saldo de R$ 226,80. Em 17/11, juros de 226,80 × 1% × 7/30 = 0,5292, arredondados para R$ 0,53, sem nova multa, e quitação de R$ 227,33. Uma nota diz que a ordem de quitação vem do contrato e deve ser conferida com o advogado. Exemplo fictício.](./torno-cobranca-titulo-corte.svg)

*Exemplo fictício: contrato, percentuais, datas e valores inventados; os percentuais e a ordem de quitação são do contrato da empresa do exemplo, não recomendação nem limite legal. Ilustração original Torno, 2026.*

Monte os cenários em um ambiente de teste, como orienta o artigo sobre [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com clientes fictícios e **destinos de e-mail e telefone controlados**, para nenhuma mensagem de teste chegar a um cliente real. Escreva cada cenário como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cálculo do vencimento efetivo do T-4512, impresso em 02/11 (feriado) | 03/11 | Tela do título |
| Lembrete D−3 do T-4512 | Sai em 30/10 às 9h, por e-mail | Registro de envio |
| D−3 do T-4530 (vence 05/11; 02/11 é feriado) | Antecipado para 30/10 e agrupado com o T-4521 num único e-mail para a Oficina | Registro de envio com dois títulos |
| Pagamento do T-4512 em 03/11 (simulação) | Baixa por R$ 4.800,00, sem multa nem juros; nenhum aviso de atraso | Baixa e registro de envios |
| E-mail da Padaria volta em 30/10 | Endereço marcado como inválido; tarefa para o financeiro; nenhuma nova tentativa no mesmo endereço | Contato, tarefa e registro |
| D+1 da Padaria sem canal válido | Nada é enviado; o passo aparece na fila do financeiro | Fila |
| D+1 do T-4512 | Sai em 04/11, por e-mail e WhatsApp (há opt-in) | Registro de envio |
| Simulação: cliente sem opt-in de WhatsApp | Só e-mail | Registro de envio |
| Contestação do T-4530 registrada às 8h40 de 06/11 | D+1 do T-4530 não sai; T-4521 continua na régua | Estado dos títulos e registro |
| Simulação: T-4522 com D−3 em 30/11, com T-4530 contestado | Lembrete do T-4522 sai normalmente | Registro de envio |
| D+5 do T-4512 (08/11 é domingo) | Sai em 09/11, segunda | Registro de envio |
| Opt-out de WhatsApp da Oficina às 10h de 09/11 | Registrado com data, hora e origem; envios seguintes à Oficina só por e-mail | Contato e registro de envio de 13/11 |
| Pagamento parcial de R$ 1.000,00 no T-4521 em 10/11 | Encargos 26,80 quitados; principal 973,20; saldo 226,80; régua continua | Extrato do título |
| D+10 do T-4521 em 13/11 | Valor mostrado R$ 227,03; sem nova multa | Registro de envio com valor e data de referência |
| Quitação do T-4521 em 17/11 | Valor devido R$ 227,33; régua encerrada | Baixa e estado do título |
| Simulação: segunda multa sobre o saldo do T-4521 | Não é calculada | Extrato do título |
| Segunda via do T-4512 pedida em 12/11 para pagar em 13/11 | R$ 4.912,00; documento guarda a data de referência | PDF e registro |
| Simulação: percentuais de multa ou juros diferentes entre sistema e banco ou PSP | Divergência apontada antes de emitir a cobrança | Relatório de conferência |
| Pix do T-4512 às 7h50 de 13/11, conciliação às 8h30 | D+10 não sai às 9h; D+15 e D+30 cancelados | Estado do título e registro |
| Simulação: conciliação de 13/11 falha | Às 9h nada sai; às 11h, alerta ao financeiro; nenhum aviso ao Restaurante | Alerta e registro |
| Simulação: rotina da régua só roda às 19h | Nada sai às 19h; envio reprogramado para 9h do dia útil seguinte, depois de nova consulta ao estado | Registro |
| Simulação: aviso de pagamento do T-4512 recebido duas vezes | Uma baixa só; régua não reabre | Baixa e log de eventos |
| Simulação: comprovante enviado pelo cliente sem baixa | Pausa até 2 dias úteis; sem baixa, fila do financeiro | Estado e fila |
| Telefonema D+15 da Padaria | Tarefa criada em 18/11 com histórico de envios | Tarefa |
| Acordo da Padaria em 19/11 para 26/11 | Régua pausada até 26/11; valor combinado R$ 3.083,00 | Registro do acordo |
| Simulação: acordo com desconto, registrado pelo financeiro | Exige aprovação do gestor | Pedido de aprovação |
| Pagamento da Padaria em 26/11 | Régua do T-4518 encerrada | Estado do título |
| Simulação: Padaria não paga em 26/11 | Em 27/11, aviso de acordo não cumprido; D+30 em 03/12 abre tarefa de decisão para o gestor | Registro e tarefa |
| Simulação: D+30 de título em aberto | Nenhum envio a cliente, bureau ou cartório; tarefa de decisão com o histórico | Tarefa e registro |
| Simulação: alguém tenta enviar título a negativação sem decisão registrada | Recusado | Tentativa recusada com a mensagem |
| Simulação: título contestado proposto para protesto | Bloqueado até a contestação ser resolvida | Tentativa bloqueada |
| Simulação: título negativado é pago | Tarefa de pedir a baixa no cadastro no mesmo dia, com dono e prazo | Tarefa |
| Simulação: título pago depois do protesto | Tarefa de emitir a declaração de anuência | Tarefa |
| Simulação: título de cliente pessoa física | Régua não roda até o financeiro confirmar a regra com o advogado | Pendência |
| Mensagem de qualquer passo | Traz nome, endereço e CNPJ da Distribuidora, títulos, valores e canal de resposta; sem oferta; sem valor na prévia da notificação | Modelo e registro |
| Cliente com 3 títulos vencendo no mesmo passo | Uma mensagem só, com os 3 | Registro de envio |
| Registro de cada envio | Título, passo, canal, destinatário, versão do modelo, valor e data de referência, horário e resultado | Relatório de envios |
| Contato da Oficina corrigido por pedido do titular | Régua passa a usar o dado corrigido no mesmo dia | Contato e registro |

*Fim do exemplo fictício. Empresas, títulos, valores, datas, contrato, percentuais, passos, canais, horários, alçadas e decisões são modelo editorial, sem cliente, empresa, contrato, cobrança real ou sistema entregue; as escolhas do exemplo são da empresa fictícia, não regras recomendadas, nem limites legais, nem comportamento padrão de ferramenta.*

Antes do go-live, pegue os títulos vencidos dos últimos três meses e rode a régua nova num ambiente de teste, sem enviar nada: quantos avisos teriam saído para quem já tinha pago, quantos títulos contestados teriam sido cobrados, quantos contatos não têm canal válido e quanto os valores calculados diferem do que o banco ou o PSP cobrou. Se a dúvida ainda é se vale sair da planilha de vencidos, veja [quando automatizar processos de planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Perguntas frequentes

### A régua de cobrança pode negativar ou protestar automaticamente?

Tecnicamente, muitos sistemas conseguem enviar títulos a um bureau ou a um cartório sem intervenção. Este artigo recomenda que não: são decisões com efeito grande sobre o cliente, que dependem de conferir que o título não está pago, contestado, em acordo ou cancelado, e que têm requisitos legais de comunicação e de cancelamento que o advogado precisa orientar. A régua propõe; uma pessoa decide e registra.

### Posso cobrar multa de 10% de um cliente empresa?

Depende do contrato e da relação, e é pergunta para o advogado. O limite de 2% do CDC está no artigo sobre fornecimento com crédito ou financiamento ao consumidor; se ele se aplica ao seu caso, e se o seu cliente empresa pode ser tratado como consumidor, não é algo que o sistema decida. O que o sistema precisa é aplicar o percentual que o contrato de cada cliente prevê, saber de onde ele veio e não cobrar o que o contrato não prevê.

### Quantos lembretes a régua deve ter?

Não há número certo, e este artigo não recomenda um. Comece com poucos passos, meça quantos pagamentos entram depois de cada um e quantas reclamações aparecem, e ajuste. O que precisa estar certo desde o primeiro dia é parar quando o cliente paga, acerta ou contesta.

### O cliente pediu para não receber cobrança por WhatsApp. Posso continuar por e-mail?

A documentação do WhatsApp para empresas recomenda honrar o pedido para deixar de receber categorias de mensagem. Se a empresa pode continuar cobrando por outro canal, e com qual base legal, é decisão com o encarregado de dados e o advogado. Para o sistema, o pedido precisa ser registrado por canal e respeitado em todos os envios seguintes.

Para transformar a régua de cobrança em regras escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) o texto dos avisos que vocês mandam hoje, a planilha de vencidos de um mês (sem dados de clientes) e o caso mais recente de cliente cobrado depois de ter pago.

*Fontes consultadas em 20 de novembro de 2026: Código de Defesa do Consumidor (Lei 8.078/1990), Lei 9.492/1997, LGPD (Lei 13.709/2018) e Lei 14.905/2024, no portal do Planalto; Código Civil, arts. 408 a 413, em reprodução do texto da lei (Projuris); Súmula 359 do STJ; Migalhas (18/09/2024) e Machado Meyer (09/08/2023) sobre o meio da notificação prévia, sem leitura dos acórdãos; Banco Central, Manual de Padrões para Iniciação do Pix, versão 2.10.0; Meta, documentação do WhatsApp Business Platform sobre opt-in (03/11/2025) e categorias de modelo (30/01/2025). Este artigo não é parecer jurídico e não recomenda bureau, banco, cartório, plataforma nem fornecedor; empresas, títulos, números e ilustrações são fictícios.*
