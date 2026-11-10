---
content_id: torno-artigo-pt-20261110-sla-horas-uteis
intent_id: buyer-helpdesk-sla-business-hours-pause-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'SLA em horas úteis no sistema de chamados: o que definir e testar no aceite'
h1: 'SLA em horas úteis no sistema de chamados: o que definir e testar no aceite'
seo_title: 'SLA em horas úteis no sistema de chamados: aceite | Torno'
seo_description: 'Expediente, feriados como 20/11, início da contagem, pausa aguardando cliente, reabertura e alertas: o que definir e testar no SLA do sistema de chamados.'
summary: 'Roteiro para quem vai contratar um sistema de chamados sob medida definir e testar o SLA em horas úteis: calendário de expediente e feriados (inclusive 20 de novembro, feriado nacional desde 2023, e os feriados locais que o cliente precisa cadastrar), fuso de quem atende, início da contagem fora do expediente, primeira resposta e resolução, o que pausa e o que não pausa o relógio, reabertura, alertas antes do estouro, relatório de cumprimento e trilha de mudanças, com referências da documentação de Zendesk, Jira Service Management e Freshdesk e critérios de aceite calculados sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar um sistema de chamados sob medida, para que o prazo de SLA em horas úteis seja calculado, pausado, exibido e relatado como o negócio combinou?
proposed_path: /blog/sla-horas-uteis-sistema-chamados-aceite/
canonical_url: https://tornostudio.com/blog/sla-horas-uteis-sistema-chamados-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores de operações de atendimento, suporte técnico, manutenção e serviços B2B que vão contratar um sistema ou módulo de chamados sob medida com prazo de SLA em horas úteis, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de usar o prazo de SLA para cobrar a equipe ou reportar ao cliente.
scope: Composição da meta (início, duração, calendário, pausa e parada); calendário de expediente, feriados nacionais, locais e pontos facultativos e quem os cadastra; fuso de referência de quem atende; início da contagem fora do expediente; primeira resposta e resolução; estados que pausam e que não pausam; reabertura; alertas antes do estouro; relatório de cumprimento; trilha de mudanças de calendário e de estado; referência técnica de Zendesk, Jira Service Management (Data Center) e Freshdesk; prazo do SAC regulado em dias corridos como obrigação separada; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ferramenta de helpdesk ou fornecedor; parecer jurídico ou trabalhista e garantia de conformidade; redação de contrato de SLA, multas ou créditos; escala de plantão e operação 24x7; representação técnica de datas, RFC 3339, UTC e corte de relatório (cobertos em outro artigo); matriz de alertas técnicos de monitoramento (coberta em outro artigo); metas de SLA recomendadas por setor.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-10T15:18:28Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-10T15:21:15Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-10T15:24:24Z'
release_approval_evidence: 'Revisão independente de texto, fontes (Lei 14.759/2023; Portaria MGI 11.460/2025; Decreto 11.034/2022; IANA tz 2019b; Secom; MME; documentação Zendesk, Jira Service Management DC/Server 5.2 e Freshdesk) e figuras, GO condicionado a três correções na ficha (fonte Zendesk sobre feriados, versão do Jira, created_at real), aplicadas pelo integrador; parecer às 2026-11-10T15:21:15Z; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não recomenda ferramenta nem fornecedor; não é parecer jurídico; diff final sujeito a revisão final independente.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Cobre data civil, instante, offset, zona e corte de relatório; aqui só se aplica isso ao relógio do SLA.
  - path: https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/
    reason: Detalha destinatário, cobertura, escalonamento e teste de alertas; aqui o alerta é só o aviso antes do estouro do prazo.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o registro de quem pausou, retomou, reabriu ou alterou o calendário e quando.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir quem pode pausar um chamado e quem pode editar o calendário de expediente.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Ajuda quando o percentual de cumprimento do painel não bate com a lista de chamados.
  - path: https://tornostudio.com/blog/exportacao-dados-sistema-aceite/
    reason: Ajuda a especificar e conferir a exportação do relatório de cumprimento.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste, inclusive datas simuladas e calendário de teste, antes de executar os cenários.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as regras de SLA da operação em requisitos e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'A Lei nº 14.759, de 21/12/2023, declara feriado nacional o dia 20 de novembro, Dia Nacional de Zumbi e da Consciência Negra (art. 1º), com vigência na data de publicação (art. 2º), no DOU de 22/12/2023.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2023/lei-14759-21-dezembro-2023-795091-publicacaooriginal-170522-pl.html
    entity: Câmara dos Deputados (espelho da publicação original), Lei nº 14.759/2023
    source_date: '2023-12-21'
    checked_at: '2026-11-10T15:09:55Z'
    limit: Espelho da Câmara, que avisa não substituir o DOU; a página do Planalto não abriu (bloqueio do proxy).
  - classification: FATO
    claim: 'Em 2026, 20 de novembro cai numa sexta-feira.'
    reference: Cálculo de calendário (gregoriano) na pesquisa de 10/11/2026.
    entity: Torno Studio
    checked_at: '2026-11-10T15:09:55Z'
    limit: Fato de calendário, conferido por script e à mão.
  - classification: FATO
    claim: 'A Portaria MGI nº 11.460, de 29/12/2025, divulga os feriados nacionais e estabelece os pontos facultativos de 2026 para órgãos e entidades da administração pública federal; lista 20/11 entre os feriados nacionais e trata Carnaval (16 e 17/02) e Corpus Christi (04/06) como ponto facultativo.'
    reference: https://files.cercomp.ufg.br/weby/up/67/o/Portaria_MGI_N%C2%BA_11.460_2025.pdf
    entity: Ministério da Gestão e da Inovação em Serviços Públicos, Portaria nº 11.460/2025 (cópia hospedada pela UFG)
    source_date: '2025-12-29'
    checked_at: '2026-11-10T15:09:55Z'
    limit: Cópia hospedada pela UFG, não o DOU nem o gov.br; vale para a administração pública federal, não define o expediente de empresa privada.
  - classification: FATO
    claim: 'O banco de dados de fusos da IANA, na versão 2019b, registrou que o Brasil cancelou o horário de verão e ficaria no horário padrão por tempo indeterminado.'
    reference: https://lists.iana.org/hyperkitty/list/tz@iana.org/thread/NV262QXW4YG3CN3UNPELM35ET7P3SRFD/
    entity: IANA tz mailing list, anúncio da release 2019b (Paul Eggert)
    source_date: '2019-07-02'
    checked_at: '2026-11-10T15:09:55Z'
    limit: Anúncio técnico, não o ato normativo; o decreto de 2019 não foi aberto e não é citado.
  - classification: FATO
    claim: 'A Secom informou ser falso que o governo tenha adotado o horário de verão (página de 03/10/2025, atualizada em 27/10/2026), e o relatório de monitoramento do MME de 31/08/2026 registra que os estudos do ONS não indicam a pertinência do horário de verão em 2026/2027.'
    reference: https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/10/governo-do-brasil-nao-adotou-horario-de-verao
    entity: Secom/Presidência; MME, Relatório de Monitoramento da Agenda Estratégica Eletroenergética 2026 (2º tri), https://www.gov.br/mme/pt-br/assuntos/secretarias/secretaria-nacional-energia-eletrica/agenda-estrategica-eletroenergetica-2026/RELATRIODEMONITORAMENTO_AGENDA__2TRIM_MINv310826vf3.pdf
    source_date: '2026-10-27'
    checked_at: '2026-11-10T15:09:55Z'
    limit: O governo segue avaliando periodicamente; a situação vale para a data de consulta e pode mudar.
  - classification: FATO
    claim: 'No Zendesk, o horário de operação de uma política de SLA pode ser horário comercial ou calendário corrido; a escolha entre horário comercial e calendário corrido é feita por prioridade; as métricas incluem tempo de primeira resposta e tempo de resolução; o tempo em Solved é tratado como pausa e, na reabertura, o tempo total de resolução continua contando desde a criação original.'
    reference: https://support.zendesk.com/hc/en-us/articles/4408829459866-Defining-SLA-policies
    entity: Zendesk Support, Defining SLA policies; e https://support.zendesk.com/hc/en-us/articles/4408825745690-Can-I-pause-the-SLA-timer-or-reset-it-under-certain-conditions
    source_date: null
    checked_at: '2026-11-10T15:09:55Z'
    limit: Páginas sem data. A página de políticas não trata de feriados nem de tempo fora do expediente. Não foram abertas as páginas sobre cadastro de feriados e fuso do schedule; o artigo não afirma nada sobre elas.
  - classification: FATO
    claim: 'No Zendesk, a métrica Requester wait time pausa no status Pending, e Agent work time pausa em Pending e On-hold.'
    reference: https://support.zendesk.com/hc/en-us/articles/4408825745690-Can-I-pause-the-SLA-timer-or-reset-it-under-certain-conditions
    entity: Zendesk Support
    source_date: null
    checked_at: '2026-11-10T15:09:55Z'
    limit: Página sem data.
  - classification: FATO
    claim: 'No Jira Service Management Data Center/Server, o SLA tem condições de início, pausa e parada; o tempo não conta quando ao menos uma condição de pausa se aplica; um novo ciclo começa se a condição de início ocorre de novo após a parada; metas usam calendário e são escritas em horas e minutos, não em dias; calendários param o relógio fora do horário de trabalho, em feriados e fins de semana.'
    reference: https://confluence.atlassian.com/servicemanagementserver0502/setting-up-slas-1167736715.html
    entity: Atlassian, documentação Jira Service Management Data Center/Server 5.2
    source_date: null
    checked_at: '2026-11-10T15:09:55Z'
    limit: Documentação de Data Center/Server, não da versão Cloud, cujo corpo não foi lido.
  - classification: FATO
    claim: 'No Freshdesk, cada política de SLA usa o horário comercial configurado ou horas corridas (24x7); há lembretes antes do estouro, de 5 minutos a 4 horas (plano Pro ou acima), e escalonamentos após a violação; reabrir um chamado para um status com o timer de SLA ligado volta a contar.'
    reference: https://support.freshdesk.com/support/solutions/articles/37626-understanding-sla-policies
    entity: Freshworks, Understanding SLA policies (modificado em 20/08/2026); e https://support.freshdesk.com/support/solutions/articles/225357-will-the-reopening-of-a-resolved-ticket-count-against-average-resolution-time-
    source_date: '2026-08-20'
    checked_at: '2026-11-10T15:09:55Z'
    limit: O artigo oficial não cobre feriados nem quais status pausam por padrão; a página sobre múltiplos horários não foi aberta.
  - classification: FATO
    claim: 'O Decreto nº 11.034/2022 regulamenta o SAC para fornecedores dos serviços regulados pelo Poder Executivo federal (art. 1º) e manda responder as demandas do consumidor em sete dias corridos, contados do registro (art. 13).'
    reference: https://www2.camara.leg.br/legin/fed/decret/2022/decreto-11034-5-abril-2022-792480-publicacaooriginal-164911-pe.html
    entity: Câmara dos Deputados (espelho da publicação original), Decreto nº 11.034 de 05/04/2022
    source_date: '2022-04-05'
    checked_at: '2026-11-10T15:09:55Z'
    limit: Publicação original via Câmara; texto consolidado do Planalto não aberto (bloqueio). Não é parecer jurídico.
  - classification: HIPÓTESE
    claim: 'Os casos A, B e C, o calendário seg–sex 08h–18h, as metas de 8 h, 2 h e 4 h úteis, os estados, as políticas de reabertura, o alerta a 75% e os critérios de aceite são modelos editoriais fictícios; a classificação do que pausa e do que não pausa, a regra de resposta automática e a política de reabertura são proposta de modelagem, não exigência legal nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo; cálculos conferidos por script e à mão na pesquisa de 10/11/2026.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 10 minutos.*

**Para aceitar o SLA em horas úteis de um sistema de chamados, exija que a regra esteja escrita em cinco partes: quando o relógio começa, quantas horas úteis ele tem, qual calendário de expediente e feriados ele segue, o que o pausa e o que o para.** No aceite, peça para ver isso com dados fictícios: um chamado aberto às vésperas de um feriado com prazo calculado até a hora, um chamado aberto no sábado, uma pausa "aguardando cliente", uma reabertura e um relatório de cumprimento que bate com a lista de chamados.

**Este artigo não recomenda ferramenta de helpdesk nem fornecedor e não é parecer jurídico.** As ferramentas citadas são referência técnica; metas, calendários e regras de pausa são decisão da sua operação.

## O que "8 horas úteis" precisa dizer

"Resolver em 8 horas úteis" parece claro até o primeiro chamado aberto às 16h30 de uma véspera de feriado. Para o sistema, a meta precisa de cinco respostas:

- **Início**: abertura do chamado, classificação, ou a primeira hora útil depois da abertura?
- **Duração**: 8 horas de expediente, com qual meta para primeira resposta e qual para resolução?
- **Calendário**: dias e horários de expediente, feriados e quem os mantém.
- **Pausa**: quais estados interrompem a contagem e quais não.
- **Parada**: o que encerra a medição e o que acontece se o chamado volta.

As ferramentas de mercado separam essas peças. O [Jira Service Management](https://confluence.atlassian.com/servicemanagementserver0502/setting-up-slas-1167736715.html) (documentação Data Center) define condições de início, pausa e parada e metas ligadas a um calendário, em horas e minutos, não em dias. No sistema sob medida, as mesmas perguntas ficam com você.

A representação técnica de datas, instantes e corte de relatório está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/); aqui o foco é o relógio do SLA.

## Calendário de expediente e feriados

O calendário é um cadastro, não uma constante no código: dias da semana, início e fim do expediente, intervalo (se o almoço não conta, diga) e datas sem expediente.

**Feriados nacionais.** Desde a [Lei nº 14.759/2023](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14759-21-dezembro-2023-795091-publicacaooriginal-170522-pl.html), 20 de novembro, Dia Nacional de Zumbi e da Consciência Negra, é feriado nacional. Em 2026 ele cai numa sexta-feira: um chamado aberto na quinta à tarde só volta a contar na segunda. Um calendário montado antes de 2023 e nunca revisto erra esse prazo.

**Feriados estaduais e municipais** variam conforme o local da operação. O sistema não deve adivinhá-los: o cliente cadastra os feriados de cada unidade, e o contrato diz quem faz isso e com que antecedência.

**Pontos facultativos não são feriados nacionais.** A [Portaria MGI nº 11.460/2025](https://files.cercomp.ufg.br/weby/up/67/o/Portaria_MGI_N%C2%BA_11.460_2025.pdf) (cópia hospedada pela UFG), que divulga o calendário de 2026 da administração pública federal, lista Carnaval e Corpus Christi como ponto facultativo. A portaria vale para o serviço público federal; se a sua equipe trabalha no Carnaval depende da empresa, de acordos coletivos e da legislação local, e o calendário reflete essa decisão.

Combine também o que acontece quando um feriado é cadastrado depois que chamados já estão abertos: os prazos em aberto são recalculados ou mantidos? Chamados encerrados não devem mudar de resultado retroativamente. Quem pode editar o calendário é uma permissão, como em [permissões de acesso como regra de negócio](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## O fuso de quem atende

Horas úteis são horas do expediente de quem atende, não de quem abre o chamado. Para uma equipe em São Paulo, o calendário segue a zona `America/Sao_Paulo`. O Brasil não adota horário de verão desde 2019, como registrou o [banco de fusos da IANA na versão 2019b](https://lists.iana.org/hyperkitty/list/tz@iana.org/thread/NV262QXW4YG3CN3UNPELM35ET7P3SRFD/); a [Secom desmentiu em 2025 a adoção do horário de verão](https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/10/governo-do-brasil-nao-adotou-horario-de-verao), e o [relatório do MME de agosto de 2026](https://www.gov.br/mme/pt-br/assuntos/secretarias/secretaria-nacional-energia-eletrica/agenda-estrategica-eletroenergetica-2026/RELATRIODEMONITORAMENTO_AGENDA__2TRIM_MINv310826vf3.pdf) registra que os estudos do ONS não indicam a medida para 2026/2027. Mesmo assim, peça que o calendário guarde a zona, não um deslocamento fixo de três horas: as regras já mudaram uma vez e podem mudar de novo.

Com equipes em fusos diferentes, cada calendário tem sua zona, e o contrato diz qual vale quando o chamado troca de equipe.

## Início da contagem, primeira resposta e resolução

Um chamado aberto no sábado às 11h não começa a contar no sábado. O sistema precisa mostrar dois horários: **abertura** (quando o cliente registrou) e **início da contagem** (a próxima hora útil). Sem os dois, o tempo de espera do cliente e o tempo útil da equipe se confundem.

Separe também as metas. **Primeira resposta** mede quanto o cliente esperou por um retorno humano; **resolução** mede quanto levou para resolver. O [Zendesk](https://support.zendesk.com/hc/en-us/articles/4408829459866-Defining-SLA-policies) trata as duas como métricas distintas e deixa escolher, por prioridade, horário comercial ou calendário corrido. Decida se a resposta automática de recebimento conta como primeira resposta. No exemplo deste artigo, não conta.

## Pausas: o que pausa e o que não pausa

A pausa evita cobrar da equipe o tempo em que ela depende do cliente. A regra diz quais estados pausam, quem pode usá-los e o que acontece quando o cliente responde.

Uma modelagem possível, a combinar:

- **Pausa**: aguardando cliente (informação, acesso, aprovação), aguardando janela agendada pelo cliente.
- **Não pausa**: aguardando outra área interna, aguardando fornecedor da própria empresa, "em análise".
- **Retomada**: resposta do cliente volta o chamado para atendimento e o relógio recomeça de onde parou.

No Zendesk, segundo a [documentação de pausa](https://support.zendesk.com/hc/en-us/articles/4408825745690-Can-I-pause-the-SLA-timer-or-reset-it-under-certain-conditions), a métrica de espera do solicitante pausa no status Pending, e a de trabalho do agente, em Pending e On-hold. É essa lista que o contrato do seu sistema precisa fixar.

Duas bordas: uma pausa que termina às 17h50 devolve só 10 minutos de expediente naquele dia; uma pausa iniciada fora do expediente não "desconta" nada, porque nada estava contando. Cada pausa e retomada fica registrada com usuário, horário e motivo, como em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), para que pausas indevidas apareçam.

![Régua de tempo de quinta 19/11 a segunda 23/11/2026, horário de São Paulo, para chamado fictício com meta de 8 horas úteis e expediente das 08h às 18h. Contadas: quinta 16h30–18h (1h30), segunda 08h–09h (1h) e 10h30–16h (5h30). Não contadas: noites, sexta 20/11 feriado nacional, sábado e domingo. Pausa aguardando cliente na segunda 09h–10h30. Marcos: abertura quinta 16h30 e vencimento segunda 16h00. Exemplo fictício.](./torno-sla-regua-semana.svg)

*Exemplo fictício: chamado, calendário e meta inventados; uma faixa por dia, das 08h às 18h. Ilustração original Torno Studio, 2026.*

A régua mostra o Caso A dos critérios de aceite: 1h30 na quinta, nada no feriado nem no fim de semana, 1h na segunda até a pausa e as 5h30 restantes a partir das 10h30. Vence segunda, 16h00; sem a pausa, às 14h30.

## Reabertura: continua ou recomeça

Quando o cliente reabre um chamado resolvido, há três políticas defensáveis, e nenhuma é a certa por definição:

1. **Continua o mesmo SLA**, com o tempo em "resolvido" pausado. É o que a documentação do Zendesk descreve para o tempo total de resolução: ele continua contando desde a criação original.
2. **Novo ciclo com meta cheia.** O Jira descreve um novo ciclo quando a condição de início ocorre de novo após a parada.
3. **Meta própria de reabertura**, menor que a original.

No [Freshdesk](https://support.freshdesk.com/support/solutions/articles/225357-will-the-reopening-of-a-resolved-ticket-count-against-average-resolution-time-), reabrir para um status com o timer de SLA ligado volta a contar. A escolha é de negócio. O contrato diz qual vale e como o relatório mostra o chamado original: cumprido, e a reabertura como medição separada, ou tudo junto?

![Ilustração de três cronômetros: Contando, com o ponteiro em movimento durante o expediente e o chamado aberto; Pausado, com ícone de pausa, aguardando o cliente; e Parado, com ícone de conferido, chamado resolvido. Abaixo, a pergunta: reaberto, continua de onde parou ou começa de novo? Decisão de negócio, por escrito.](./torno-sla-cronometro-estados.svg)

*Três estados do cronômetro do prazo; a regra de retomada na reabertura é decisão de negócio, a definir no contrato. Ilustração original Torno Studio, 2026.*

## Alertas antes do estouro

Um alerta no estouro chega tarde. Defina um aviso antes, por percentual do prazo útil consumido ou por tempo restante, com destinatário e uma escalada no estouro. O [Freshdesk](https://support.freshdesk.com/support/solutions/articles/37626-understanding-sla-policies), por exemplo, oferece lembretes de 5 minutos a 4 horas antes do vencimento (planos Pro ou acima) e escalonamentos após a violação. Combine o limiar, quem recebe e se o aviso respeita o expediente. Destinatário, canal e teste de alertas estão em [monitoramento de software](https://tornostudio.com/blog/monitoramento-software-alertas-fluxo-critico/).

## Relatório de cumprimento e trilha de mudanças

O relatório diz quantos chamados elegíveis cumpriram o prazo, por meta, período, equipe e prioridade. Por chamado, peça abertura, início da contagem, tempo útil, tempo pausado, tempo corrido, prazo, resultado e versão do calendário. Assim o percentual do painel pode ser refeito à mão a partir da lista; se não bater, veja [números divergentes no painel](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/). A exportação segue o que está em [exportação de dados](https://tornostudio.com/blog/exportacao-dados-sistema-aceite/).

Mudanças de calendário, meta e estado ficam na trilha com quem, quando, valor anterior e novo; sem isso, ninguém explica por que um chamado de março aparece vencido num relatório tirado em junho.

## SAC regulado: dias corridos, outra régua

Se a sua empresa presta serviço regulado pelo Poder Executivo federal, o [Decreto nº 11.034/2022](https://www2.camara.leg.br/legin/fed/decret/2022/decreto-11034-5-abril-2022-792480-publicacaooriginal-164911-pe.html) manda responder as demandas do consumidor no SAC em sete **dias corridos**, contados do registro (art. 13), com possibilidade de prazo específico fixado pela agência do setor (art. 13, § 4º), e se aplica a esses fornecedores (art. 1º). Um SLA em horas úteis não substitui esse prazo, e os dois podem conviver no mesmo chamado. Confirme com o jurídico se o decreto se aplica a você.

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Calendário: segunda a sexta, 08h–18h sem intervalo, zona `America/Sao_Paulo`, feriado nacional em sexta 20/11/2026. Metas: resolução em 8 h úteis; primeira resposta em 2 h úteis. Pausa: só "aguardando cliente". Resposta automática não conta como primeira resposta. Alerta a 75% da meta; escalada no estouro. Monte os cenários num ambiente de teste com data simulada, como em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Caso A: aberto qui 19/11 16h30; pausa "aguardando cliente" seg 23/11 09h00–10h30 | 1h30 na quinta, 0 na sexta feriado e no fim de semana, 1h00 na segunda até a pausa; vence seg 23/11 16h00 | Prazo exibido no chamado e histórico de pausa |
| Caso A sem a pausa | Vence seg 23/11 14h30 | Prazo exibido no chamado |
| Caso A num calendário de teste em que 20/11 é dia útil, sem pausa | Vence sex 20/11 14h30: prova que o prazo lê o calendário cadastrado | Calendário de teste e prazo |
| Caso B: aberto sáb 21/11 11h00 | Abertura 21/11 11h00 e início da contagem 23/11 08h00 exibidos; primeira resposta vence seg 10h00; resolução vence seg 16h00 | Chamado e relatório com os dois horários |
| Caso B: resposta automática enviada sáb 11h00 | Não cumpre a meta de primeira resposta; o relógio continua até a resposta de um atendente | Histórico de mensagens e estado da meta |
| Chamado com 2h00 restantes, pausado; cliente responde seg 23/11 17h50 | Contam 10 min na segunda; retoma ter 24/11 08h00 com 1h50; vence ter 09h50 | Histórico de retomada e novo prazo |
| Caso A movido para "aguardando outra área" seg 09h00–10h30, em vez de "aguardando cliente" | Relógio não pausa; vence seg 14h30 | Estado e prazo inalterado |
| Caso C: Caso A resolvido seg 23/11 15h00 (7h00 úteis consumidas) e reaberto ter 24/11 09h00 | Conforme a política escrita: continua, vence ter 10h00; novo ciclo de 8 h, vence ter 17h00; meta de reabertura de 4 h, vence ter 13h00 | Prazo após reabertura e registro da política aplicada |
| Chamado resolvido e reaberto sex 20/11 10h00, com meta de reabertura de 4 h | Feriado não conta; contagem começa seg 23/11 08h00; vence seg 12h00 | Prazo exibido |
| Servidor em UTC; Caso A aberto às 19h30 UTC de 19/11 (16h30 em São Paulo) | Mesmo prazo, exibido como seg 23/11 16h00 no horário de São Paulo | Registro do instante e tela do chamado |
| Caso A com alerta a 75% (6h00 úteis) | Aviso ao responsável seg 23/11 14h00; se não resolvido, escalada às 16h00 | Registro de envio com horário e destinatário |
| Relatório do período com o Caso A resolvido seg 15h00 | Cumprido; 7h00 úteis, 1h30 pausada, 94h30 corridas; percentual refeito à mão a partir da lista exportada | Arquivo exportado e conta conferida |
| Feriado municipal fictício cadastrado em 23/11 para 24/11, com chamados abertos | Prazos em aberto recalculados ou mantidos conforme a regra escrita; chamados encerrados não mudam; alteração com usuário, data e valor anterior | Trilha da alteração e prazos antes e depois |

*Fim do exemplo fictício. Calendário, metas, chamados, horários, políticas e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. As regras de pausa, resposta automática e reabertura são escolhas do exemplo, não exigência legal nem padrão de ferramenta.*

## Perguntas frequentes

### SLA em horas úteis ou em horas corridas?

Depende do que foi prometido ao cliente. Horas úteis medem a equipe dentro do expediente; horas corridas medem a espera do cliente. As duas podem coexistir, por meta.

### Quem cadastra os feriados?

A empresa que opera o atendimento, porque feriados locais e pontos facultativos dependem de onde e como ela trabalha. O sistema oferece o cadastro, registra quem alterou e aplica a regra combinada aos chamados em aberto.

Para transformar as regras de SLA da sua operação em requisitos e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) o calendário de expediente das equipes, a lista de estados do chamado e um relatório de cumprimento atual, sem dados reais de clientes.

*Fontes consultadas em 10 de novembro de 2026: Lei nº 14.759/2023 e Decreto nº 11.034/2022 (espelhos da Câmara dos Deputados), Portaria MGI nº 11.460/2025 (cópia da UFG), IANA tz 2019b, Secom, MME, e documentação de Zendesk, Jira Service Management Data Center e Freshdesk. Este artigo não recomenda ferramenta nem fornecedor e não é parecer jurídico; chamados, calendários, metas e ilustrações são modelos editoriais fictícios.*
