---
content_id: torno-artigo-pt-20261106-lgpd-pedido-titular
intent_id: buyer-lgpd-data-subject-request-system-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Pedido do titular na LGPD: o que o sistema precisa permitir'
h1: 'Pedido do titular na LGPD: o que o sistema precisa permitir e como testar'
seo_title: 'Pedido do titular LGPD: o que o sistema deve ter | Torno'
seo_description: 'Acesso, correção, eliminação, portabilidade: o que o sistema precisa permitir para a empresa atender o pedido do titular na LGPD e como testar no aceite.'
summary: 'Capacidades que um sistema sob medida precisa ter para a empresa atender pedidos de titulares na LGPD, prazos que constam da lei e critérios de aceite com titular fictício.'
primary_question: O que um sistema sob medida precisa permitir para a empresa atender os pedidos do titular previstos na LGPD, e como testar isso antes do aceite?
proposed_path: /blog/lgpd-pedido-titular-sistema-aceite/
canonical_url: https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores que contratam ou mantêm um sistema próprio (portal, ferramenta interna, app web) com dados pessoais de clientes, colaboradores ou parceiros.
buyer_stage: Especificação e aceite de um sistema novo, ou adequação de um sistema em uso.
scope: Capacidades do sistema por direito do titular (confirmação, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação de compartilhamento, revogação de consentimento), localização do dado, comunicação a terceiros, prazos que constam da lei e prazo configurável, registro do pedido, divisão de responsabilidades e critérios de aceite.
not_scope: Parecer jurídico, escolha de base legal ou prazo de retenção, revisão de decisão automatizada (art. 20), incidente de segurança, política de privacidade, cookies, certificação ou garantia de conformidade.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-06T21:30:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-06T21:39:22Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-06T21:39:30Z'
release_approval_evidence: Revisão independente GO de texto, fontes oficiais (LGPD na Câmara, ANPD) e imagens após correções; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não é parecer jurídico.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/arquivar-excluir-registros-sistema/
    reason: A eliminação a pedido do titular esbarra nas mesmas dependências de registros; aquele artigo exclui LGPD do escopo, então os dois se completam.
  - path: https://tornostudio.com/blog/exportacao-dados-sistema-aceite/
    reason: A cópia integral e a portabilidade precisam de contrato de campos, formato e destino; aquele artigo trata a exportação operacional.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Aprofunda o registro de quem atendeu o pedido, o que foi feito e quando, e alerta para dado pessoal no próprio log.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Gerar o dossiê do titular e executar a eliminação são ações sensíveis que precisam de perfil e escopo definidos.
  - path: https://tornostudio.com/blog/prova-restauracao-backup-software/
    reason: Ajuda a prever o que uma restauração de backup traz de volta depois de uma eliminação.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar os pedidos do titular em escopo e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'O art. 18 da LGPD lista os direitos que o titular pode obter do controlador: confirmação, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou em desconformidade, portabilidade, eliminação dos dados tratados com consentimento (ressalvado o art. 16), informação sobre compartilhamento, informação sobre a possibilidade de não consentir e revogação do consentimento; o §2º trata da oposição e o §3º exige requerimento expresso do titular ou de representante.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Congresso Nacional (Lei nº 13.709/2018, texto atualizado publicado pela Câmara dos Deputados)
    source_date: '2018-08-14'
    checked_at: '2026-11-06T21:00:00Z'
    limit: 'Texto consolidado lido na Câmara; a página do Planalto bloqueou a leitura automatizada. Paráfrase; conferir a redação literal antes de citar entre aspas.'
  - classification: FATO
    claim: 'Pelo art. 19 da LGPD, a confirmação de existência ou o acesso são providenciados em formato simplificado, imediatamente, ou por declaração clara e completa com origem, inexistência de registro, critérios e finalidade, em até 15 dias do requerimento; o §1º pede armazenamento que favoreça o acesso, o §2º admite meio eletrônico seguro ou forma impressa, o §3º prevê cópia eletrônica integral em formato reutilizável e o §4º permite prazos setoriais diferenciados pela ANPD.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Congresso Nacional (Lei nº 13.709/2018, texto atualizado publicado pela Câmara dos Deputados)
    source_date: '2018-08-14'
    checked_at: '2026-11-06T21:00:00Z'
    limit: Único prazo em dias na lei para pedidos do titular; vale para confirmação e acesso, não para os demais direitos.
  - classification: FATO
    claim: 'O art. 18, §5º, remete prazos e termos do atendimento a regulamento, sem custo para o titular; o §4º exige resposta com as razões quando a providência não puder ser imediata; o §6º manda informar de imediato os agentes com quem houve compartilhamento sobre correção, eliminação, anonimização ou bloqueio, salvo impossibilidade comprovada ou esforço desproporcional; o §7º exclui da portabilidade os dados já anonimizados.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Congresso Nacional (Lei nº 13.709/2018, texto atualizado publicado pela Câmara dos Deputados)
    source_date: '2018-08-14'
    checked_at: '2026-11-06T21:00:00Z'
    limit: O §6º tem redação da Lei nº 13.853/2019. Paráfrase.
  - classification: FATO
    claim: 'O art. 5º, XI, XIII e XIV, define anonimização, bloqueio e eliminação; o art. 16 autoriza a conservação após o término do tratamento para obrigação legal ou regulatória, estudo por órgão de pesquisa, transferência a terceiro respeitados os requisitos legais e uso exclusivo do controlador com dados anonimizados; o art. 8º, §5º, prevê revogação do consentimento por procedimento gratuito e facilitado, mantidos os tratamentos anteriores enquanto não houver pedido de eliminação.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Congresso Nacional (Lei nº 13.709/2018, texto atualizado publicado pela Câmara dos Deputados)
    source_date: '2018-08-14'
    checked_at: '2026-11-06T21:00:00Z'
    limit: A aplicação de cada hipótese de conservação ao caso concreto é decisão jurídica.
  - classification: FATO
    claim: 'O art. 37 exige que controlador e operador mantenham registro das operações de tratamento; o art. 41, §2º, I, atribui ao encarregado aceitar reclamações e comunicações dos titulares, prestar esclarecimentos e adotar providências.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Congresso Nacional (Lei nº 13.709/2018, texto atualizado publicado pela Câmara dos Deputados)
    source_date: '2018-08-14'
    checked_at: '2026-11-06T21:00:00Z'
    limit: Paráfrase.
  - classification: FATO
    claim: 'A Resolução CD/ANPD nº 2/2022 dá prazo em dobro ao agente de tratamento de pequeno porte para a declaração completa do art. 19, II (art. 14, III), permite a declaração simplificada em até 15 dias (art. 15), aplica o dobro ao atendimento do art. 18 nos termos de regulamentação específica (art. 14, I).'
    reference: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias), Conselho Diretor
    source_date: '2022-01-27'
    checked_at: '2026-11-06T21:00:00Z'
    limit: 'Vale só para quem se enquadra (arts. 2º a 4º, com exclusões por receita, grupo econômico e alto risco); página modificada em 16/09/2026 e que não substitui o DOU.'
  - classification: FATO
    claim: 'Na agenda regulatória da ANPD, em tabela atualizada em 20/10/2026, o item Direitos dos titulares (arts. 9º, 18, 19 e 20) aparece em andamento, sem consulta à sociedade realizada e em fase de elaboração interna.'
    reference: https://www.gov.br/anpd/pt-br/assuntos/regulacao/agenda-regulatoria-1
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias)
    source_date: '2026-10-20'
    checked_at: '2026-11-06T21:00:00Z'
    limit: 'Estado sujeito a mudança; reconferir no dia da publicação. O balanço da agenda de agosto/2026 menciona RAIR publicado e espera de deliberação sobre consulta pública.'
  - classification: FATO
    claim: 'A lista de regulamentações vigentes da ANPD não traz norma que fixe prazos para os direitos dos titulares dos arts. 18 e 19.'
    reference: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias)
    checked_at: '2026-11-06T21:00:00Z'
    limit: A página traz títulos e ementas; conferido em 06/11/2026 e sujeito a mudança.
  - classification: FATO
    claim: 'A petição do titular à ANPD pressupõe solicitação já apresentada ao controlador e não atendida, e pede comprovante do requerimento, como número de protocolo, orientações recebidas, mensagens e e-mails.'
    reference: https://www.gov.br/anpd/pt-br/fluxo-da-peticao-do-titular
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias)
    checked_at: '2026-11-06T21:00:00Z'
    limit: Página sem data visível; não fixa prazos.
  - classification: FATO
    claim: 'Segundo o guia da ANPD sobre o encarregado, ele não é o responsável, perante a ANPD, pela conformidade do tratamento feito pelo controlador, e as decisões sobre o tratamento cabem ao controlador.'
    reference: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/copy_of_guia_da_atuacao_do_encarregado_anpd.pdf/@@display-file/file
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias)
    source_date: '2024-12-01'
    checked_at: '2026-11-06T21:00:00Z'
    limit: Guia orientativo (v1.0, dezembro de 2024), não norma; data da fonte indicada apenas por mês.
  - classification: FATO
    claim: 'Segundo o guia de agentes de tratamento da ANPD, os direitos são exercidos, em regra, perante o controlador; o operador age no limite das finalidades determinadas pelo controlador; o desenvolvedor de software contratado aparece como exemplo de operador.'
    reference: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/Segunda_Versao_do_Guia_de_Agentes_de_Tratamento_retificada.pdf/@@display-file/file
    entity: Agência Nacional de Proteção de Dados (ANPD; antiga Autoridade, que publicou os guias)
    source_date: '2022-04-01'
    checked_at: '2026-11-06T21:00:00Z'
    limit: Guia orientativo (v2.0, abril de 2022); o enquadramento de cada fornecedor é caso a caso e o guia não cria dever de o operador atender o titular.
  - classification: HIPÓTESE
    claim: 'A divisão de responsabilidades, a tabela de capacidades, o Titular T-01, o protocolo, os critérios de aceite e as ilustrações deste artigo são modelos editoriais fictícios.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue nem teste executado; não são parecer jurídico nem garantia de conformidade.
---

**Quem decide como responder a um pedido do titular é a empresa, com o encarregado e o jurídico. Quem precisa conseguir executar a resposta é o sistema.** No aceite, peça três demonstrações com um titular fictício: o sistema encontra tudo o que guarda sobre a pessoa, executa a ação decidida (corrigir, bloquear, anonimizar ou eliminar) em todos os lugares combinados e registra pedido, decisão, resposta e datas.

**Não é parecer jurídico.** Base legal, tempo de guarda e conteúdo de cada resposta são decisões da empresa, com o encarregado e o jurídico. Aqui eu trato do que o sistema precisa permitir para cumprir essas decisões e de como testar isso antes do aceite.

## Quem decide e quem executa

A empresa que define o uso dos dados é a controladora, e é perante ela que o titular exerce seus direitos, em regra, segundo o [guia de agentes de tratamento da ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/Segunda_Versao_do_Guia_de_Agentes_de_Tratamento_retificada.pdf/@@display-file/file) (v2.0, abril de 2022). O encarregado recebe as reclamações e comunicações dos titulares e adota providências ([art. 41, §2º, I, da LGPD](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html)), mas as decisões sobre o tratamento são da empresa, como lembra o [guia da ANPD sobre o encarregado](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/copy_of_guia_da_atuacao_do_encarregado_anpd.pdf/@@display-file/file) (dezembro de 2024).

O fornecedor do sistema tende a ser operador quando trata dados em nome da empresa, agindo no limite das finalidades do controlador; o guia de agentes usa o desenvolvedor contratado como exemplo. O guia não atribui ao operador o atendimento direto ao titular; por isso, convém que o contrato diga o que o fornecedor faz quando recebe um pedido e como apoia a empresa a respondê-lo. Uma divisão possível:

| Tarefa | Jurídico e encarregado | Fornecedor do sistema | Operação da empresa |
|---|---|---|---|
| Base legal e tempo de guarda | Define e registra | Implementa campos e regras | Segue o procedimento |
| Busca, cópia, correção e eliminação | Aprova o necessário | Implementa e demonstra | Valida em homologação |
| Verificação de identidade | Define o procedimento | Registra que foi feita | Executa |
| Resposta ao titular | Decide o conteúdo | Gera relatórios e cópias | Envia pelo canal combinado |
| Aviso a quem recebeu os dados | Valida exceções | Lista destinatários e registra o envio | Acompanha o retorno |

## Direitos do titular na LGPD: o que o software precisa permitir

O [art. 18 da LGPD](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) lista o que o titular pode obter do controlador. Cada direito vira uma capacidade e uma evidência:

| Direito (LGPD) | O sistema precisa permitir | Evidência no aceite |
|---|---|---|
| Confirmação e acesso (art. 18, I e II; art. 19) | Reunir o que existe sobre a pessoa e gerar as duas respostas | Relatório com origem e finalidade |
| Correção (art. 18, III) | Corrigir dado incompleto, inexato ou desatualizado | Antes e depois, inclusive no sistema integrado |
| Anonimização, bloqueio ou eliminação (art. 18, IV e VI) | Executar a ação decidida, preservando o que deve ser conservado | O que foi afetado, o que ficou e por quê |
| Portabilidade e cópia integral (art. 18, V; art. 19, §3º) | Exportar os dados da pessoa em formato reutilizável | Arquivo conferido campo a campo |
| Compartilhamento (art. 18, VII) | Listar com quem houve uso compartilhado | Destinatários do titular de teste |
| Revogação do consentimento (art. 18, IX; art. 8º, §5º) | Revogar de forma gratuita e facilitada e parar o que dependia dele | Data da revogação e envio interrompido |
| Oposição (art. 18, §2º) | Registrar e encaminhar ao jurídico | Pedido com decisão anotada |

A cópia integral do art. 19, §3º, cabe quando o tratamento tem origem no consentimento do titular ou em contrato. A portabilidade, a outro fornecedor, depende de regulamentação da ANPD, observa os segredos comercial e industrial e não inclui dado já anonimizado (art. 18, V e §7º). Revogar o consentimento não apaga nada sozinho: os tratamentos anteriores seguem válidos enquanto não houver pedido de eliminação (art. 8º, §5º). Eliminar a pedido também tem condições: o inciso IV cobre dado desnecessário, excessivo ou tratado em desconformidade, e o VI, dado tratado com consentimento, ressalvadas as hipóteses de conservação do art. 16. Se o modelo de dados não guarda de onde veio cada informação, a declaração completa do art. 19, II, vira investigação manual.

## Onde o dado da pessoa fica

Apagar o cadastro raramente alcança tudo. O dado de uma pessoa aparece em:

- cadastro e registros ligados a ele;
- anexos e campos de texto livre;
- histórico e trilha de auditoria, que guardam valores antigos;
- mensagens enviadas e exportações já geradas;
- cópias de backup;
- sistemas integrados que receberam o dado.

Um inventário de onde o dado mora serve ao atendimento e ao registro das operações de tratamento do [art. 37](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html).

![Corte de solo fictício intitulado “Um pedido, cinco camadas e uma raiz”: na superfície, o pedido do Titular T-01; abaixo, cadastro, anexos, histórico e log, mensagens enviadas e backup, cada camada com a decisão a tomar (no histórico e log, decidir o que manter do atendimento); uma raiz lateral chega a um sistema integrado, com a nota de comunicar quem recebeu os dados.](./torno-lgpd-camadas.svg)

*Exemplo fictício: o Titular T-01 e as decisões por camada não representam sistema ou cliente real. Eliminar, anonimizar ou manter é decisão da empresa, com o jurídico. Ilustração original Torno Studio, 2026.*

## Exclusão de dados no sistema: eliminar, anonimizar ou bloquear

O [art. 5º da LGPD](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) define três ações diferentes:

- **Eliminação:** exclusão do dado armazenado, qualquer que seja o procedimento.
- **Anonimização:** o dado não pode mais ser associado à pessoa, direta ou indiretamente, por meios técnicos razoáveis. Trocar o nome por asteriscos e manter CPF e e-mail não é isso.
- **Bloqueio:** suspensão temporária do tratamento, com o dado guardado. Bloquear não é apagar.

### Quando o dado fica

O [art. 16](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) manda eliminar os dados ao fim do tratamento, mas autoriza conservá-los em quatro hipóteses, entre elas o cumprimento de obrigação legal ou regulatória e o uso exclusivo do controlador com dados anonimizados. Qual hipótese se aplica é decisão jurídica; o sistema marca o dado preservado, guarda o motivo e restringe quem o vê. Exemplo fictício: a nota fiscal da pessoa fica, pela obrigação fiscal apontada pelo jurídico; o cadastro de marketing é eliminado.

### Dependências, logs e backups

A eliminação esbarra nos mesmos [registros que dependem do cadastro](https://tornostudio.com/blog/arquivar-excluir-registros-sistema/) que qualquer exclusão. Log e trilha de auditoria também guardam dado pessoal: decida se entram na eliminação, na anonimização ou na conservação. Para backups, não prometa apagar cada cópia; escreva a política (o que expira, quando, e o que fazer se [uma restauração trouxer de volta](https://tornostudio.com/blog/prova-restauracao-backup-software/) um dado eliminado) e peça que seja demonstrada.

### Quem recebeu o dado também precisa saber

Pelo [art. 18, §6º](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html), o responsável deve informar de imediato os agentes com quem compartilhou os dados sobre correção, eliminação, anonimização ou bloqueio, para que repitam o procedimento, salvo se isso for comprovadamente impossível ou implicar esforço desproporcional. Por titular, o sistema precisa saber para onde o dado foi e registrar cada aviso.

## Prazo da requisição do titular: o que está na lei e o que depende de regulamento

O único prazo em dias que a LGPD fixa para pedidos do titular está no [art. 19](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) e vale para confirmação de existência e acesso:

- **formato simplificado:** imediatamente;
- **declaração clara e completa**, com origem, critérios e finalidade: em até 15 dias contados da data do requerimento.

Para agentes de tratamento de pequeno porte, a [Resolução CD/ANPD nº 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022) dobra o prazo da declaração completa (art. 14, III) e permite a simplificada em até 15 dias (art. 15); o dobro para os demais pedidos (art. 14, I) depende do regulamento ainda não editado. O enquadramento tem condições, como limite de receita e ausência de alto risco (arts. 2º a 4º), e é decisão jurídica.

O art. 18, §5º, remete os prazos dos demais direitos a regulamento. Na [agenda regulatória da ANPD](https://www.gov.br/anpd/pt-br/assuntos/regulacao/agenda-regulatoria-1), em tabela de 20/10/2026, o item Direitos dos titulares segue em andamento, sem consulta à sociedade. Até 6 de novembro de 2026, não encontrei entre as regulamentações vigentes da ANPD norma que fixe prazo para correção, eliminação ou portabilidade. Desconfie de “30 dias para tudo” ou de “15 dias para qualquer pedido”.

Para o sistema: registrar a data do requerimento, deixar o prazo configurável por tipo de pedido (o art. 19, §4º, admite prazos setoriais), alertar antes do vencimento e guardar a resposta com as razões quando a providência não puder ser imediata (art. 18, §4º).

![Envelope aberto com cinco folhas da declaração completa a um pedido fictício: confirmação de tratamento, origem dos dados, inexistência de registro (se for o caso), critérios utilizados e finalidade do tratamento. Um carimbo traz a data do pedido, 03/11, e o prazo de até 15 dias para a declaração completa (art. 19, II, da LGPD), com o rótulo Exemplo fictício.](./torno-lgpd-envelope-resposta.svg)

*Exemplo fictício: datas e conteúdo não vêm de um pedido real. O conteúdo de cada resposta é definido pela empresa, com o encarregado. Ilustração original Torno Studio, 2026.*

## Do pedido ao protocolo: o registro que o sistema precisa guardar

Os direitos são exercidos por requerimento expresso do titular ou de representante legalmente constituído (art. 18, §3º). Segundo a [página da ANPD sobre o fluxo da petição do titular](https://www.gov.br/anpd/pt-br/fluxo-da-peticao-do-titular), a petição à ANPD pressupõe pedido já feito ao controlador e não atendido, com comprovante como número de protocolo, mensagens e e-mails. O titular guarda o protocolo; a empresa precisa mostrar o próprio lado:

- número de protocolo, canal e data do requerimento;
- quem pediu (titular ou representante) e a verificação de identidade feita, sem guardar documento além do necessário;
- o que foi pedido, a decisão e quem decidiu;
- o que o sistema executou, onde e quando;
- a resposta enviada, com data e meio.

Defina [quem pode gerar o dossiê ou eliminar](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/) e mantenha o [registro do atendimento](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). O dossiê também é dado pessoal: entregue por meio eletrônico seguro ou impresso, a critério do titular (art. 19, §2º), não como anexo solto em e-mail. Para a cópia integral, combine o [contrato de campos e formato do arquivo](https://tornostudio.com/blog/exportacao-dados-sistema-aceite/).

## Critérios de aceite com um titular fictício

Em homologação, crie o **Titular T-01 (fictício)** com dados em cadastro, anexo, campo livre, e-mail enviado e sistema integrado, e outro titular fictício com o mesmo e-mail:

1. A busca por identificador combinado encontra o T-01 em todas as fontes, inclusive anexo e campo livre.
2. A declaração completa traz origem, critérios e finalidade, em linguagem legível; a lista de compartilhamentos (art. 18, VII) sai quando pedida; e um titular inexistente gera a declaração de inexistência de registro.
3. Quando cabível (tratamento baseado em consentimento ou contrato), a cópia integral sai em formato reutilizável (JSON ou CSV com dicionário de campos, por exemplo), conferida campo a campo.
4. A correção aparece em todas as telas e saídas, e o sistema integrado recebe o ajuste.
5. A eliminação remove ou anonimiza conforme a decisão; o dado marcado para conservação fica, com motivo e acesso restrito.
6. O bloqueio impede uso em nova operação sem apagar o dado.
7. A revogação do consentimento interrompe o envio que dependia dele e registra o momento, sem apagar nada.
8. O pedido do T-01 não afeta o outro titular com o mesmo e-mail.
9. Um perfil sem autorização não gera o dossiê nem elimina.
10. O protocolo mostra datas, prazo configurado, decisão, resposta, responsável e aviso a cada destinatário.

*Fim do exemplo fictício. O T-01 e os critérios são um modelo editorial, não um teste executado em sistema real.*

## Sistema novo ou sistema em uso

**Num sistema novo**, preveja no modelo de dados o vínculo de cada registro com a pessoa, origem, finalidade, destinatários e marcação de conservação.

**Num sistema em uso**, comece pelo inventário de onde o dado mora e, enquanto as capacidades não existem, atenda com um roteiro manual documentado. Não finja que existe um botão.

## Perguntas frequentes

### Qual o prazo para responder a um pedido do titular na LGPD?

Só confirmação e acesso têm prazo em dias na lei (art. 19): simplificado imediatamente, declaração completa em até 15 dias do requerimento, com regra própria para pequeno porte. Os demais dependem de regulamento que, segundo a ANPD em 20/10/2026, ainda estava em elaboração.

### Excluir o cadastro atende ao pedido de eliminação?

Nem sempre. O dado pode estar em anexos, logs, integrações e backups, e parte dele pode ter de ser conservada (art. 16).

Para transformar essa lista em escopo e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) um mapa de onde os dados de uma pessoa aparecem hoje. A Torno ajuda a definir o que o sistema precisa fazer e como demonstrar; base legal, retenção e resposta continuam com o encarregado e o jurídico da empresa.

*Fontes oficiais consultadas em 6 de novembro de 2026. Este artigo não é parecer jurídico; tabelas, Titular T-01, protocolo e ilustrações são modelos editoriais fictícios.*
