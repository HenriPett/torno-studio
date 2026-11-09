---
content_id: torno-artigo-pt-20261109-pix-automatico
intent_id: buyer-pix-automatico-recurring-billing-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Pix Automático no sistema: o que definir e testar antes de aceitar a integração'
h1: 'Pix Automático no sistema: o que definir e testar antes de aceitar a integração'
seo_title: 'Pix Automático: integração com o sistema e aceite | Torno'
seo_description: 'Autorização, prazo de envio de cada cobrança, falha e nova tentativa, cancelamento, conciliação por idRec, txid e endToEndId: o que testar no aceite do Pix Automático.'
summary: 'O que a empresa precisa decidir e pedir para ver antes de aceitar a integração do Pix Automático com o seu sistema: jornadas de autorização, envio de cada cobrança no prazo, valor máximo do pagador, falha e nova tentativa, cancelamento por pagador ou recebedor, avisos da instituição, conciliação por idRec, txid e endToEndId e evidências de aceite, com exemplo fictício de uma escola com mensalidade variável.'
primary_question: O que a empresa deve definir e testar no sistema antes de aceitar uma integração de cobrança recorrente com Pix Automático?
proposed_path: /blog/pix-automatico-cobranca-recorrente-sistema-aceite/
canonical_url: https://tornostudio.com/blog/pix-automatico-cobranca-recorrente-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores financeiros que vão contratar ou ampliar um sistema próprio (portal, ferramenta interna, app web) para cobrar mensalidades ou assinaturas com Pix Automático, e quem vai implementar a integração com a instituição de pagamento (PSP).
buyer_stage: Especificação e aceite da integração, antes de migrar clientes para a cobrança recorrente.
scope: Dados da recorrência e jornadas de autorização; ciclo de cada cobrança e prazo de envio; valor fixo ou variável e valor máximo do pagador; falha de liquidação e novas tentativas; cancelamento de cobrança, agendamento e autorização por pagador ou recebedor; avisos da instituição (webhooks) e consulta de reconciliação; conciliação por idRec, txid e endToEndId; critérios de aceite com dados fictícios.
not_scope: Consultoria regulatória ou jurídica; recomendação, comparação ou contratação de PSP; regras internas de cada PSP (elegibilidade, tarifas, prazos combinados com o recebedor); tutorial completo da API Pix ou do Arquivo Padronizado; parecer contábil ou fiscal; débito automático e boleto.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-09T15:14:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-09T15:27:43Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-09T15:28:30Z'
release_approval_evidence: Revisão independente de texto, fontes (Guia de implementação do Pix Automático v1.3, FAQ Pix Automático, Manual de Tempos do Pix v7.0, especificação OpenAPI da API Pix e Orientações do Arquivo Padronizado, todos do Banco Central do Brasil) e figuras, NO-GO às 2026-11-09T15:21:40Z com correção obrigatória aplicada pelo redator e GO da revisão factual independente às 2026-11-09T15:27:43Z; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não é consultoria regulatória nem recomendação de PSP.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata o status de um pagamento avulso; este artigo cobre o ciclo recorrente e remete para lá a separação entre estado do pedido e do pagamento.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Detalha o que exigir quando o mesmo aviso de pagamento chega duas vezes, para não dar baixa em dobro.
  - path: https://tornostudio.com/blog/integracao-eventos-fora-ordem/
    reason: Aprofunda o tratamento de avisos que chegam fora de ordem, como cancelamento antes da confirmação do agendamento.
  - path: https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/
    reason: Cobre a conciliação bancária geral; aqui o foco é a cadeia de identificadores da recorrência.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Ajuda a definir datas de corte e horários de Brasília para as janelas de envio e cancelamento.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a fazer os ensaios em ambiente de teste do PSP, separado de produção.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a política de cobrança em regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'Guia de implementação do Pix Automático (versão 1.3): jornada 1 sem QR Code, com solicitação de confirmação que pode ficar pendente até 30 dias; jornada 2 com QR Code só com os dados da recorrência; jornada 3 com QR Code de pagamento imediato e recorrência, indissociáveis; jornada 4 com pagamento ou agendamento de uma cobrança (com vencimento ou estática), seguido de oferta opcional da autorização. Instrução de pagamento enviada com antecedência de 2 a 10 dias corridos; liquidação de 0h a 8h e nova tentativa obrigatória de 18h a 21h no mesmo dia se faltar saldo; novas tentativas após o vencimento só se a recorrência permitir, em até 7 dias corridos, no máximo em 3 datas e com o mesmo valor, cada uma enviada até 23h59 do dia anterior; o pagador cancela agendamento até 23h59 da véspera; o recebedor cancela cobrança se a mensagem chegar até 22h da véspera; cancelamento da recorrência pelo recebedor vale a partir de D+1, ou D+2 se recebido após 22h; o cancelamento da autorização pelo pagador cancela agendamentos vinculados, exceto os do próprio dia; o valor máximo é definido pelo pagador, verificado no agendamento e não compartilhado com o recebedor; idRec tem 29 caracteres e o segundo indica se a recorrência permite novas tentativas; quando a liquidação falha e uma nova instrução é enviada, ela precisa de novo identificador fim a fim; o recebedor é notificado de sucesso ou insucesso do agendamento, de cancelamento do agendamento pelo pagador e do resultado do cancelamento que pediu.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/automatico/guia_pix_automatico.pdf
    entity: Banco Central do Brasil, Guia de implementação do Pix Automático, versão 1.3
    source_date: null
    checked_at: '2026-11-09T15:05:00Z'
    limit: 'Documento sem data. Guia para participantes, não norma; lido por extração automatizada do PDF. O artigo descreve as regras do ponto de vista do sistema do recebedor; prazos entre o recebedor e o seu PSP são combinados entre eles.'
  - classification: FATO
    claim: 'FAQ do BCB para participantes: instruções enviadas entre 10 e 2 dias antes da data prevista (4.4); valor acima do máximo do pagador faz o agendamento não ocorrer, sem cancelar a autorização (4.7); janelas obrigatórias de 0h a 8h e de 18h a 21h (4.13); a nova instrução após erro de liquidação mantém o mesmo txid (4.12) e a nova tentativa após o vencimento mantém o mesmo txid da cobrança original (4.15); o recebedor não pode cancelar uma retentativa (4.14); a não liquidação de uma cobrança não cancela a autorização (5.3) e as partes podem usar outro meio, como Pix Cobrança, para acertar a cobrança não paga (6.13); o cancelamento da autorização implica o da recorrência e vice-versa (5.1), e agendamentos existentes são cancelados a partir de D+1 (5.2); o identificador fim a fim da liquidação é o mesmo da instrução de pagamento e considera a data prevista (6.3); o idRec é o mesmo em todas as jornadas (3.13); periodicidades semanal, mensal, trimestral, semestral ou anual (1.2); a operação do Pix Automático é independente da do débito automático, não há migração automática e cabe ao recebedor cancelar o débito automático quando o cliente autoriza o Pix Automático (2.8); pagamentos realizados e não realizados são identificados por conciliação após o fim da última janela obrigatória, às 21h (7.5).'
    reference: https://cdn-www.bcb.gov.br/content/estabilidadefinanceira/pix/pix-automatico-FAQ-participantes.pdf
    entity: Banco Central do Brasil, Pix Automático — perguntas frequentes dos participantes
    source_date: null
    checked_at: '2026-11-09T15:00:00Z'
    limit: Documento sem data; respostas dirigidas a participantes (PSPs). O FAQ não menciona webhooks.
  - classification: FATO
    claim: 'Manual de Tempos do Pix: o PSP que envia cancelamento de autorização ou recorrência (pain.011) aguarda até 12 horas pela confirmação, e o que envia cancelamento de débito agendado ou de cobrança (camt.055) aguarda até 12 horas pela resposta (camt.029); sem resposta, o fluxo é considerado efetivado.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/IX_ManualdeTemposdoPix.pdf
    entity: Banco Central do Brasil, Manual de Tempos do Pix, versão 7.0
    source_date: '2026-02-02'
    checked_at: '2026-11-09T15:08:00Z'
    limit: Data da fonte é a revisão mais recente do histórico do documento (versão 7.0 de 23/11/2025). Prazos entre PSPs; o sistema do recebedor vê o efeito pela instituição contratada.
  - classification: FATO
    claim: 'Na especificação da API Pix do BCB consultada em 09/11/2026 há recursos para recorrência (/rec, /rec/{idRec}), solicitação de recorrência (/solicrec), cobrança recorrente (/cobr/{txid}), pedido de nova tentativa (/cobr/{txid}/retentativa/{data}) e configuração de webhooks (/webhookrec, /webhookcobr); a cobrança se liga à recorrência pelo campo idRec; o pedido de nova tentativa é recusado se a política de retentativa da recorrência não permitir, se a data não for futura ou se já houver tentativa solicitada ou agendada para a mesma data.'
    reference: https://bacen.github.io/pix-api/openapi.yaml
    entity: Banco Central do Brasil, especificação OpenAPI da API Pix
    source_date: null
    checked_at: '2026-11-09T15:10:00Z'
    limit: 'O arquivo lido declara a versão 2.11.0-rc1 (candidata); o artigo não afirma qual versão está estável nem lista enums de status, que não puderam ser lidos por completo. Cada PSP implementa a API e os webhooks com detalhes próprios.'
  - classification: FATO
    claim: 'O Arquivo Padronizado do Pix Automático, baseado no CNAB 750, é voltado aos sistemas dos recebedores como alternativa à API Pix; o ID da recorrência vem do arquivo retorno.'
    reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/automatico/Orientacoes_Arquivo_Padronizado_Pix_Automatico.pdf
    entity: Banco Central do Brasil, Orientações sobre o Arquivo Padronizado para o Pix Automático, versão 1.0
    source_date: '2024-11-29'
    checked_at: '2026-11-09T15:12:00Z'
    limit: Versão inicial; o artigo não descreve o layout.
  - classification: HIPÓTESE
    claim: 'A escola, o responsável, o contrato C-0312, as mensalidades, valores, datas, identificadores encurtados, estados de negócio, critérios de aceite e as ilustrações deste artigo são modelos editoriais fictícios.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, PSP, sistema entregue nem teste executado; não são consultoria regulatória.
---

*Leitura estimada: 9 minutos.*

**Antes de aceitar uma integração de Pix Automático, defina com o fornecedor como o sistema cria cada recorrência, quando envia cada cobrança, o que faz quando o pagamento falha ou o pagador cancela, e como liga cada valor recebido ao contrato certo.** No aceite, peça para ver, em ambiente de teste, uma parcela fictícia passar por envio no prazo, recusa por valor acima do máximo, nova tentativa, cancelamento e baixa, com os identificadores `idRec`, `txid` e `endToEndId` guardados em cada etapa.

**Não é consultoria regulatória e não recomendo instituição.** As regras citadas vêm de documentos do Banco Central (BCB) consultados em 09/11/2026; elas mudam, e a sua instituição de pagamento (o PSP do recebedor) tem prazos e formatos próprios. Confirme com ela antes de especificar.

## O que muda em relação a um Pix avulso

No Pix avulso, o sistema gera uma cobrança, espera o pagamento e dá baixa; o artigo sobre [status de pagamento no pedido](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/) trata desse caso. No Pix Automático há três camadas que vivem por meses:

- **A recorrência**: o acordo autorizado pelo pagador, com periodicidade, valor fixo ou variável, datas e política de novas tentativas. Ela tem um `idRec`.
- **A cobrança de cada ciclo**: a mensalidade de dezembro, com valor e data previstos. Ela tem um `txid`.
- **A liquidação**: o débito efetivo na conta do pagador, identificado por um `endToEndId`.

O sistema precisa modelar as três e os estados de cada uma. Um erro comum é ter só "cliente adimplente/inadimplente" e perder a diferença entre "autorização cancelada" e "parcela não paga". Pelo [FAQ do BCB](https://cdn-www.bcb.gov.br/content/estabilidadefinanceira/pix/pix-automatico-FAQ-participantes.pdf) (item 5.3), uma cobrança não liquidada não cancela a autorização; as seguintes continuam.

Integração por API não é o único caminho: o BCB também publicou um [Arquivo Padronizado baseado no CNAB 750](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/automatico/Orientacoes_Arquivo_Padronizado_Pix_Automatico.pdf), como alternativa à API Pix. As decisões deste artigo valem para os dois.

## Autorização: qual jornada o seu cliente vai usar

O [Guia de implementação do Pix Automático](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/automatico/guia_pix_automatico.pdf) (versão 1.3) descreve quatro jornadas:

1. **Sem QR Code**: o recebedor envia uma solicitação que aparece no app do banco do pagador e pode ficar pendente até 30 dias.
2. **QR Code só com a recorrência**: o pagador lê e autoriza, sem pagar nada naquele momento.
3. **QR Code com primeiro pagamento e recorrência juntos**: pagar a primeira cobrança implica aceitar as seguintes; uma não acontece sem a outra.
4. **Pagamento ou agendamento de uma cobrança (com vencimento ou estática), seguido de oferta opcional da autorização.**

PSPs e outros materiais podem numerar as jornadas de outro jeito; no requisito, descreva a jornada, não só o número.

Para cada jornada escolhida, defina o que o sistema mostra enquanto a autorização está pendente, recusada, expirada ou cancelada, e o que acontece com o contrato do cliente em cada caso. O `idRec` é o mesmo qualquer que seja a jornada (FAQ, item 3.13); guarde-o no contrato desde a criação.

Defina também, na criação da recorrência, se ela **permite novas tentativas** depois do vencimento. Pelo Guia, essa escolha é do recebedor e fica registrada no próprio `idRec` (o segundo caractere indica se permite). Não dá para decidir depois, parcela a parcela.

## Envio de cada cobrança no prazo

Cada parcela vira uma instrução enviada ao banco do pagador **entre 10 e 2 dias corridos antes da data prevista** (FAQ, item 4.4; Guia). Fora dessa janela, a instrução não segue o fluxo previsto. Isso cria requisitos que costumam faltar na especificação:

- **Valor variável fechado a tempo.** Se a mensalidade inclui itens do mês, o valor precisa estar fechado antes do último dia de envio. Defina a data de corte e quem a aprova.
- **Rotina com responsável.** Um processo agendado que monta e envia as cobranças, com alerta se uma parcela chegar ao último dia sem envio confirmado.
- **Horário de referência.** Janelas e cortes usam horário de Brasília; veja [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Valor máximo do pagador.** O pagador pode definir um teto; se a cobrança passar dele, o agendamento não ocorre e a autorização continua (FAQ, item 4.7). Pelo Guia, esse teto fica só no banco do pagador e não é compartilhado com o recebedor: o sistema só descobre pela recusa. Defina a ação: avisar o responsável, oferecer outro meio de pagamento, revisar o valor.

![Régua de dias fictícia da mensalidade de dezembro de uma escola, com vencimento em 10/12/2026: faixa de envio da cobrança de 30/11 a 08/12 (10 a 2 dias antes); véspera 09/12 com dois marcadores, recebedor cancela cobrança até 22h e pagador cancela agendamento até 23h59; dia 10/12 com duas janelas de tentativa, 0h às 8h e 18h às 21h; após o vencimento, até 3 datas de nova tentativa até 17/12, marcadas “só se a recorrência permitir”.](./torno-pix-regua-parcela.svg)

*Exemplo fictício: escola, datas e janelas aplicadas a uma parcela imaginária, conforme o Guia de implementação do Pix Automático do BCB consultado em 09/11/2026. Os prazos combinados entre recebedor e PSP podem ser mais curtos. Ilustração original Torno Studio, 2026.*

## Falha de pagamento e nova tentativa

No dia previsto, a liquidação acontece entre 0h e 8h. Se faltar saldo, o banco do pagador faz obrigatoriamente uma nova tentativa entre 18h e 21h do mesmo dia (FAQ, itens 4.11 e 4.13). Depois do vencimento, e só se a recorrência permitir, o recebedor pode pedir novas tentativas em até 7 dias corridos, no máximo em 3 datas e com o mesmo valor, cada pedido enviado até 23h59 do dia anterior (Guia).

O que a empresa decide:

- Se usa novas tentativas e em quais dias (por exemplo, depois de datas usuais de pagamento de salário).
- O que acontece com o serviço do cliente durante as tentativas e depois da última.
- Como acertar a parcela que não foi paga. O FAQ (item 6.13) admite outro meio, como Pix Cobrança, sem afetar a recorrência. O sistema precisa ligar esse pagamento à mesma parcela, para não cobrar de novo na próxima tentativa.

O que testar: a [especificação da API Pix do BCB](https://bacen.github.io/pix-api/openapi.yaml), consultada em 09/11/2026, recusa o pedido de nova tentativa quando a política da recorrência não permite, quando a data não é futura ou quando já há tentativa para aquela data. O sistema deve tratar essas recusas como resultado previsto, com mensagem clara, e não como erro genérico.

## Cancelamento pelo pagador ou pelo recebedor

São quatro situações diferentes, com efeitos diferentes:

| Quem cancela | O quê | Regra no Guia do BCB | O que o sistema precisa fazer |
|---|---|---|---|
| Pagador | Um agendamento | Até 23h59 da véspera | Marcar a parcela como cancelada pelo pagador e acionar a política de cobrança |
| Pagador | A autorização | Imediato; cancela agendamentos vinculados, exceto os do próprio dia (FAQ 5.2: agendamentos a partir de D+1) | Encerrar a recorrência no contrato, sem enviar novas cobranças |
| Recebedor | Uma cobrança | Mensagem até 22h da véspera | Bloquear o pedido depois do horário e mostrar o motivo |
| Recebedor | A recorrência | Vale de D+1 em diante (D+2 se recebida após 22h) | Mostrar até quando ainda pode haver débito |

O recebedor não cancela uma nova tentativa já agendada (FAQ, item 4.14). E pelo [Manual de Tempos do Pix](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/IX_ManualdeTemposdoPix.pdf) (versão 7.0), um pedido de cancelamento sem resposta entre as instituições é considerado efetivado após 12 horas. Por isso o sistema precisa de um estado "cancelamento solicitado", distinto de "cancelado", e não pode tratar o clique do operador como fim do processo.

## Avisos da instituição e consulta de conferência

A especificação do BCB prevê webhooks para recorrências e cobranças (`/webhookrec` e `/webhookcobr`); o formato exato e o que cada PSP envia variam. Pelo Guia, o recebedor é avisado do sucesso ou insucesso do agendamento, do cancelamento do agendamento pelo pagador e do resultado do cancelamento que ele mesmo pediu.

Exija:

- **Aviso repetido sem efeito repetido**: a mesma confirmação recebida duas vezes dá uma baixa só. Veja [o que exigir quando um evento chega duplicado](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Aviso fora de ordem**: um cancelamento que chega antes da confirmação do agendamento não pode ser sobrescrito por ela. Veja [eventos fora de ordem](https://tornostudio.com/blog/integracao-eventos-fora-ordem/).
- **Consulta periódica**: uma rotina que compara recorrências e cobranças do sistema com a consulta ao PSP e aponta divergências, porque aviso perdido não gera alerta sozinho. O próprio FAQ (item 7.5) diz que pagamentos realizados e não realizados são identificados por conciliação depois do fim da última janela obrigatória, às 21h; agende a conferência para depois desse horário.

## Conciliação por idRec, txid e endToEndId

A cadeia é: o `idRec` aponta o contrato; o `txid` aponta a parcela; o `endToEndId` aponta o dinheiro que entrou. Na especificação do BCB, a cobrança traz o `idRec` da recorrência a que pertence.

Dois detalhes evitam baixa errada:

- **O `txid` não muda nas novas tentativas.** O FAQ manda manter o mesmo `txid` da cobrança original na nova tentativa (item 4.15) e na nova instrução após erro de liquidação (item 4.12). A parcela é uma só, por mais tentativas que tenha.
- **O `endToEndId` pode mudar.** Pelo Guia, quando a liquidação falha e uma nova instrução é enviada, ela precisa de novo identificador fim a fim; e pelo FAQ (item 6.3) o identificador considera a data prevista. Uma parcela pode ter mais de um `endToEndId` tentado e só um liquidado. Guarde todos, com o resultado de cada um.

![Chaveiro fictício com três etiquetas presas no mesmo aro: etiqueta grande “idRec — contrato C-0312, mensalidade, valor variável, novas tentativas: sim”; etiqueta média “txid — parcela dez/2026, R$ 980,00, vencimento 10/12”; duas etiquetas pequenas penduradas no txid, “endToEndId 1 — tentativa 10/12, sem saldo” e “endToEndId 2 — tentativa 14/12, liquidado”.](./torno-pix-tres-chaves.svg)

*Exemplo fictício: contrato, parcela, valores e identificadores encurtados para leitura; os reais têm formato definido pelo BCB. Ilustração original Torno Studio, 2026.*

Para o restante da conciliação (extrato, tarifas, devoluções), veja [conciliação bancária no sistema](https://tornostudio.com/blog/conciliacao-bancaria-sistema-extrato-aceite/).

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Uma escola cobra mensalidade variável (base mais atividades do mês) com vencimento no dia 10. O responsável pelo contrato C-0312 autorizou pela jornada 2, com novas tentativas permitidas e valor máximo de R$ 1.100,00, que a escola não conhece. Os ensaios rodam no [ambiente de teste do PSP](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Autorização pela jornada 2 | Contrato C-0312 mostra autorização ativa e guarda o `idRec` | Tela do contrato e registro da criação com o `idRec` |
| Autorização expirada ou recusada | Contrato fica "sem autorização"; nenhuma cobrança é enviada | Registro do estado e da mensagem ao responsável |
| Parcela de dezembro fechada em 01/12 | Cobrança enviada entre 01/12 e 08/12, com `txid` próprio e data e hora registradas | Registro de envio com data e hora |
| Parcela não fechada até 07/12 | Alerta ao financeiro em 07/12 até as 12h | Alerta registrado com destinatário, data e hora |
| Parcela de janeiro de R$ 1.180,00 acima do teto | Agendamento recusado; autorização segue ativa; responsável é avisado | Aviso do PSP e estados da parcela e do contrato |
| Parcela de dezembro (R$ 980,00) sem saldo em 10/12 | Parcela "não paga na data"; nova tentativa pedida para 14/12 | Pedido de nova tentativa com o mesmo `txid` |
| Pedido de quarta data de tentativa | Bloqueado no sistema antes de chegar ao PSP | Mensagem exibida ao operador |
| Liquidação em 14/12 | Baixa única da parcela; os dois `endToEndId` ligados a ela | Parcela com histórico de tentativas |
| Mesma confirmação recebida duas vezes | Uma baixa só | Registro do aviso repetido ignorado |
| Responsável cancela a autorização | Contrato encerra a recorrência; nenhuma cobrança nova é enviada | Aviso recebido e estado do contrato |
| Escola tenta cancelar a cobrança às 22h30 da véspera | Sistema bloqueia e explica o horário | Mensagem e registro da tentativa |
| Parcela acertada por Pix Cobrança | Mesma parcela baixada; recorrência segue ativa | Ligação entre o pagamento avulso e o `txid` |
| Aviso perdido | Consulta de conferência aponta a divergência na rodada agendada após 21h do dia previsto | Relatório de divergências |

*Fim do exemplo fictício. Escola, contrato, valores e critérios são um modelo editorial, não um teste executado em sistema real.*

## Sistema novo ou sistema em uso

**Num sistema novo**, modele recorrência, cobrança e liquidação como entidades separadas desde o início, com os três identificadores e o histórico de estados.

**Ao migrar de outro meio**, cada cliente precisa autorizar o Pix Automático. Para quem vem do débito automático, o FAQ do BCB (item 2.8) é explícito: não há migração automática, e cabe ao recebedor cancelar o débito automático quando o cliente autoriza o Pix Automático, para não cobrar duas vezes. Planeje um período em que os dois meios convivem, com relatório de quem já autorizou e de qual meio vale para cada parcela.

## Perguntas frequentes

### O Pix Automático cobra sozinho todo mês?

Não. A cada ciclo, o recebedor, por meio do seu PSP, precisa enviar a cobrança dentro da janela de 10 a 2 dias antes da data. Se o sistema não enviar, não há débito.

### Se a parcela não for paga, a autorização é cancelada?

Não. Pelo FAQ do BCB, a falha de uma cobrança não cancela a autorização; as seguintes continuam. A parcela pode ser acertada por outro meio.

### Preciso usar a API ou dá para usar arquivo?

O BCB publicou o Arquivo Padronizado como alternativa à API Pix. Pergunte ao seu PSP quais formas ele oferece e com quais prazos.

Para transformar a sua política de cobrança recorrente em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) os planos e periodicidades que cobra hoje, a documentação do PSP que pretende usar e a lista de casos que geram dúvida no financeiro, sem dados reais de clientes.

*Fontes consultadas em 9 de novembro de 2026. Este artigo não é consultoria regulatória nem recomendação de instituição; escola, contrato, valores, identificadores e ilustrações são modelos editoriais fictícios.*
