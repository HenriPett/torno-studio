---
content_id: torno-artigo-pt-20261111-cadastro-duplicado
intent_id: buyer-duplicate-customer-records-dedup-merge-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Cadastro duplicado de clientes no sistema: o que definir e testar antes de mesclar'
h1: 'Cadastro duplicado de clientes no sistema: o que definir e testar antes de mesclar'
seo_title: 'Cadastro duplicado de clientes no sistema: aceite | Torno'
seo_description: 'Chave de identidade, normalização de CPF, e-mail e telefone, aviso na criação, mesclagem com histórico e desfazer: o que definir e testar contra duplicatas.'
summary: 'Roteiro para quem contrata ou mantém um sistema com cadastro de clientes definir e testar como evitar e tratar cadastros duplicados: o que identifica um cliente (CPF/CNPJ, e-mail, telefone), forma canônica de documento, e-mail, telefone e nome, unicidade no banco de dados, aviso de possível duplicata na criação, mesclagem que preserva pedidos, notas e anexos com trilha, desfazer, importações e integrações que recriam duplicatas e o vínculo com a qualidade dos dados na LGPD, com referências de Unicode, Anatel, PostgreSQL, Salesforce e HubSpot e critérios de aceite sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar um sistema com cadastro de clientes, para que ele evite cadastros duplicados e, quando eles existirem, permita mesclá-los sem perder histórico nem misturar pessoas diferentes?
proposed_path: /blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
canonical_url: https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores comerciais, financeiros e de atendimento que contratam ou mantêm sistema interno, ERP próprio, CRM sob medida ou portal com cadastro de clientes alimentado por várias entradas, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de colocar o cadastro em uso ou antes de uma limpeza de cadastros duplicados no sistema em uso.
scope: Por que duplicatas surgem; chave de identidade e sinais de semelhança; forma canônica de CPF/CNPJ, e-mail, telefone e nome; unicidade no banco de dados sobre a forma canônica; aviso ou bloqueio na criação; mesclagem com registro sobrevivente, escolha campo a campo, histórico de pedidos, notas e anexos e identificador antigo; trilha da mesclagem; desfazer; importações e integrações; limpeza do legado; qualidade dos dados e correção na LGPD; referência técnica de Unicode UAX #15, Anatel, ITU-T E.164, PostgreSQL 18, Salesforce e HubSpot; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de CRM, ERP, banco de dados, biblioteca ou fornecedor de qualidade de dados; parecer jurídico ou garantia de conformidade com a LGPD; algoritmo de similaridade de nomes ou pontuação probabilística; validação de documento em bases da Receita Federal; formato do CNPJ alfanumérico (coberto em outro artigo); eventos repetidos de integração (coberto em outro artigo); erros de importação em geral (coberto em outro artigo); atendimento ao pedido do titular (coberto em outro artigo).
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-11T15:10:36Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-11T15:20:40Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-11T15:21:36Z'
release_approval_evidence: 'Revisão factual independente (agente Claude opus) NO-GO às 2026-11-11T15:20:40Z por uma frase além da fonte (Salesforce 000331044: o artigo não diz se o histórico movido volta), corrigida pelo integrador, que também aplicou sugestões (HubSpot "por padrão", regras do exemplo explícitas para CPFs diferentes, contrato como anexo e desfazer, nome em NFC); fontes Lei 13.709/2018 (Câmara), Unicode UAX #15 rev. 56, Anatel, ITU-T E.164 ed. 7, PostgreSQL 18, Salesforce Trailhead e Ajuda, HubSpot abertas em 11/11/2026; diff final sujeito a revisão final independente; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não recomenda ferramenta nem fornecedor; não é parecer jurídico.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
    reason: Detalha o formato do CNPJ com letras, máscara e dígito verificador; aqui só se usa a forma canônica do documento como chave.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Detalha modelo, validação por linha e recibo da importação; aqui o foco é a importação que recria clientes existentes.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Trata o evento de integração que chega duas vezes; aqui o problema é o mesmo cliente com dois cadastros.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo do registro de quem mesclou, quando e o que mudou.
  - path: https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/
    reason: Detalha o atendimento ao pedido de correção do titular e o aviso a quem recebeu o dado; aqui a LGPD aparece só como qualidade do cadastro.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir quem pode ver o cadastro existente no aviso, quem pode mesclar e quem pode desfazer.
  - path: https://tornostudio.com/blog/arquivar-excluir-registros-sistema/
    reason: Ajuda a decidir o destino do cadastro que deixa de existir após a mesclagem e de seus vínculos.
  - path: https://tornostudio.com/blog/busca-filtros-sistema-resultados/
    reason: Ajuda a especificar a busca que encontra o cliente com e sem máscara, acento ou maiúscula.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Ajuda quando a limpeza de duplicatas acontece junto com a troca de sistema.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com cadastros fictícios antes de executar os cenários.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as regras de identidade e mesclagem do cadastro em requisitos e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'A LGPD lista entre os princípios do tratamento a qualidade dos dados, garantia aos titulares de exatidão, clareza, relevância e atualização dos dados (art. 6º, V), e dá ao titular o direito de obter do controlador a correção de dados incompletos, inexatos ou desatualizados (art. 18, III); o art. 18, § 6º, trata de informar os agentes de tratamento.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
    entity: Câmara dos Deputados (norma atualizada), Lei nº 13.709/2018
    source_date: '2026-02-26'
    checked_at: '2026-11-11T15:10:00Z'
    limit: 'Espelho da Câmara (metadado de alteração 26/02/2026, com remissões à Lei nº 15.352/2026); a página do Planalto recusou o acesso automatizado. Não é parecer jurídico.'
  - classification: FATO
    claim: 'O UAX #15 define as formas de normalização NFD, NFC, NFKD e NFKC; a equivalência canônica trata como equivalentes sequências de caracteres que diferem em bytes, como a forma pré-composta e a decomposta; depois de normalizar, uma comparação binária das cadeias transformadas determina a equivalência.'
    reference: https://www.unicode.org/reports/tr15/tr15-56.html
    entity: Unicode Consortium, Unicode Standard Annex #15, revisão 56 (Unicode 16.0.0)
    source_date: '2024-08-14'
    checked_at: '2026-11-11T15:10:00Z'
    limit: 'Revisão 56 lida; a página da versão mais recente redirecionou e não abriu para o robô. Normalizar não remove acentos nem iguala maiúsculas: isso é decisão separada.'
  - classification: FATO
    claim: 'Segundo a Anatel, o código de país do Brasil definido pela UIT é 55, o código de área tem dois dígitos, o número de assinante da telefonia fixa tem oito dígitos e o da telefonia móvel tem nove.'
    reference: https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro
    entity: Anatel, Plano de Numeração Brasileiro
    source_date: '2026-08-28'
    checked_at: '2026-11-11T15:10:00Z'
    limit: Página publicada em 03/03/2015 e modificada em 28/08/2026; também lista oito dígitos para o Serviço Móvel Especializado. Não cobre números de outros países.
  - classification: FATO
    claim: 'A Recomendação ITU-T E.164 trata da estrutura e funcionalidade dos números do plano internacional; a edição 7 (02/2026), aprovada em 13/02/2026, está em vigor e substituiu a de 11/2010.'
    reference: https://www.itu.int/itu-t/recommendations/rec.aspx?rec=E.164
    entity: ITU-T, base de Recomendações (E.164)
    source_date: '2026-02-13'
    checked_at: '2026-11-11T15:10:00Z'
    limit: Lida a página da base de recomendações e o resumo; o texto integral da edição 7 não foi lido, e o artigo não afirma limite de dígitos.
  - classification: FATO
    claim: 'Na documentação do PostgreSQL 18, um índice UNIQUE sobre uma expressão como lower(col1) impede linhas cujos valores diferem só em maiúsculas; um índice único parcial impõe unicidade só entre as linhas que satisfazem o predicado; colações não determinísticas podem considerar iguais cadeias com bytes diferentes (ignorando maiúsculas ou acentos), com penalidade de desempenho e operações de padrão que não são possíveis.'
    reference: https://www.postgresql.org/docs/current/indexes-expressional.html
    entity: PostgreSQL Global Development Group, documentação 18 (seções 11.7 e 11.8, https://www.postgresql.org/docs/current/indexes-partial.html; 23.2, https://www.postgresql.org/docs/current/collation.html)
    source_date: null
    checked_at: '2026-11-11T15:10:00Z'
    limit: 'Documentação da versão 18 (18.6), a corrente na consulta; exemplo de um banco de dados, não recomendação de ferramenta.'
  - classification: FATO
    claim: 'No Salesforce, regras de correspondência definem o critério para identificar duplicatas e regras de duplicidade definem a ação; conforme a configuração, o usuário vê um alerta de que vai criar uma duplicata ou é impedido de criá-la.'
    reference: https://trailhead.salesforce.com/content/learn/modules/sales_admin_duplicate_management/sales_admin_duplicate_management_unit_1
    entity: Salesforce Trailhead, Improve Data Quality in Salesforce
    source_date: null
    checked_at: '2026-11-11T15:10:00Z'
    limit: Página sem data; descreve a criação de registros, não a edição. A página de considerações de mesclagem da Ajuda Salesforce não renderizou para o robô.
  - classification: FATO
    claim: 'Segundo artigo de ajuda da Salesforce (publicado em 01/06/2026), na mesclagem de contatos o registro principal é mantido e o duplicado vai para a Lixeira; restaurá-lo da Lixeira não afeta o registro principal.'
    reference: https://help.salesforce.com/apex/HTViewSolution?id=000331044&language=en_US
    entity: Salesforce Help, Recover Merged Salesforce Contacts
    source_date: '2026-06-01'
    checked_at: '2026-11-11T15:10:00Z'
    limit: O artigo não diz se os registros relacionados voltam ao contato restaurado.
  - classification: FATO
    claim: 'Na documentação do HubSpot, não é possível desfazer a mesclagem de registros; os valores do registro principal têm prioridade; atividades e associações dos dois registros passam ao novo registro; um novo Record ID é criado (salvo em beta de preservação de ID); o e-mail do contato secundário vira e-mail secundário; o HubSpot compara diariamente propriedades para sugerir possíveis duplicatas.'
    reference: https://knowledge.hubspot.com/records/merge-records
    entity: HubSpot Knowledge Base, Merge records (atualizado em 05/09/2026); e https://knowledge.hubspot.com/records/manage-duplicate-records (atualizado em 23/10/2026)
    source_date: '2026-10-23'
    checked_at: '2026-11-11T15:10:00Z'
    limit: Comportamento de um produto específico na data de consulta; não é padrão de mercado nem recomendação.
  - classification: FATO
    claim: 'CPF 123.456.789-09 e CNPJ 11.222.333/0001-81 têm dígitos verificadores consistentes pelo cálculo módulo 11 e são usados aqui como números fictícios de teste.'
    reference: Cálculo em Python na pesquisa de 11/11/2026.
    entity: Torno Studio
    checked_at: '2026-11-11T15:10:00Z'
    limit: Validade do cálculo não indica titular real nem inexistência de titular; usar só em ambiente de teste.
  - classification: HIPÓTESE
    claim: 'Os cadastros C-1042 e C-2210, Maria Aparecida Souza, João Souza, José Ribeiro, os telefones, e-mails, pedidos, notas e anexos, a janela de 30 dias para desfazer, a regra de sobrevivência e os critérios de aceite são modelo editorial fictício; a separação entre chave de identidade e sinais de semelhança e as regras de mesclagem são proposta de modelagem, não exigência legal nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 11 minutos.*

**Para aceitar um cadastro de clientes que não se duplica, exija três decisões por escrito: o que identifica um cliente (a chave), como cada dado é reduzido a uma forma única antes de comparar (a forma canônica) e o que acontece quando duas fichas são da mesma pessoa (a mesclagem).** No aceite, peça para ver isso com dados fictícios: o mesmo CPF digitado com e sem máscara sendo recusado, um telefone escrito de três jeitos gerando aviso, uma mesclagem que leva pedidos, notas e anexos para a ficha que fica, e o identificador antigo ainda encontrando o cliente.

**Este artigo não recomenda ferramenta nem fornecedor e não é parecer jurídico.** Produtos e bancos de dados citados são referência técnica; as regras de identidade e de mesclagem são decisão do seu negócio.

## Por que o mesmo cliente vira duas fichas

Uma duplicata não exige descuido de ninguém. Basta o cliente entrar por mais de uma porta e cada porta escrever do seu jeito: o balcão cadastra "Maria Ap. Souza", o site grava "MARIA APARECIDA SOUZA", a planilha importada traz o CPF com pontos e o aplicativo de mensagens traz só o telefone com +55 na frente.

Para o sistema, sem regra, são textos diferentes. O resultado aparece longe da tela de cadastro: histórico de compras partido em dois, limite de crédito calculado sobre metade dos pedidos, cobrança enviada para o endereço velho, relatório de clientes ativos inflado.

Cada porta é um ponto de teste: tela de cadastro, cadastro rápido no pedido, formulário do site, importação, API e integrações. A regra precisa valer em todas, não só na tela principal.

## Chave de identidade e sinais de semelhança

Separe duas coisas que costumam vir misturadas no pedido "não deixar duplicar":

- **Chave de identidade**: o dado que, se igual, significa o mesmo cliente. Para pessoa física, em geral o CPF; para empresa, o CNPJ. O sistema pode **bloquear** um segundo cadastro com a mesma chave.
- **Sinais de semelhança**: dados que sugerem, mas não provam, o mesmo cliente: e-mail, telefone, nome parecido, mesmo endereço. Aqui o sistema **avisa** e deixa uma pessoa decidir.

E-mail e telefone parecem chaves, mas são compartilhados: mãe e filho usam o mesmo celular, a empresa inteira usa o e-mail do financeiro, o contador cadastra o próprio telefone em vinte clientes. Bloquear por esses dados impede cadastros legítimos; mesclar automaticamente por eles junta pessoas diferentes.

Decida também os casos de borda da chave:

- **Cliente sem documento**: estrangeiro, consumidor que não informou CPF, cadastro rápido no balcão. Qual chave vale, ou ele fica sem chave e só com aviso?
- **Matriz e filial**: CNPJs com a mesma raiz e ordem diferente são o mesmo cliente para cobrança e limite de crédito, ou cadastros separados ligados a um grupo?
- **Documento corrigido**: se alguém digitou o CPF errado e outra ficha tem o certo, a correção é edição ou mesclagem?

O formato do CNPJ com letras, a máscara e o dígito verificador estão em [CNPJ alfanumérico no sistema](https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/); aqui só importa que a chave seja comparada na forma canônica.

## Forma canônica: o que comparar e o que exibir

Para comparar, o sistema reduz cada dado a uma forma única. O que o usuário digitou pode continuar sendo exibido; o que se compara e se guarda para unicidade é a forma canônica.

| Dado | Exemplo digitado | Forma canônica proposta |
|---|---|---|
| CPF | 123.456.789-09 / 12345678909 | 12345678909 (só os 11 dígitos) |
| CNPJ | 11.222.333/0001-81 | 11222333000181 (14 posições, letras em maiúsculas no alfanumérico) |
| E-mail | " Maria.Souza@Example.com " | maria.souza@example.com (sem espaços, em minúsculas) |
| Telefone celular | (11) 98765-4321 / 11 98765 4321 | +5511987654321 |
| Nome | "José" composto ou decomposto | Mesma sequência Unicode (NFC) |

**Telefone.** Um formato internacional único evita que "(11) 98765-4321" e "+55 11 98765-4321" sejam números diferentes. Segundo o [Plano de Numeração Brasileiro da Anatel](https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro), o código de país do Brasil é 55, o código de área tem dois dígitos, o número fixo tem oito e o celular, nove. O plano internacional é a [Recomendação ITU-T E.164](https://www.itu.int/itu-t/recommendations/rec.aspx?rec=E.164), cuja edição em vigor é de fevereiro de 2026. Combine o que fazer com número sem código de área, com zero e código de operadora na frente e com celular antigo de oito dígitos: corrigir, recusar ou guardar como "a revisar".

**Nome.** O mesmo "é" pode ser gravado como um caractere ou como "e" mais um acento combinado; texto colado de PDF ou de outro sistema às vezes chega assim. O [anexo UAX #15 do Unicode](https://www.unicode.org/reports/tr15/tr15-56.html) chama isso de equivalência canônica e define formas de normalização (NFC, NFD, NFKC, NFKD); depois de normalizar, uma comparação byte a byte decide a equivalência. Normalizar **não** remove acentos nem iguala maiúsculas: tratar "JOSE" e "José" como iguais é outra decisão, útil para sugerir duplicata, arriscada como chave.

**Abreviações.** "Maria Ap. Souza" e "Maria Aparecida Souza" não ficam iguais por nenhuma normalização. Semelhança de nome é sinal para aviso, nunca chave para bloqueio ou mesclagem automática.

A mesma forma canônica serve à busca: quem procura "12345678909" encontra quem foi cadastrado com pontos. O contrato da busca está em [busca e filtros no sistema](https://tornostudio.com/blog/busca-filtros-sistema-resultados/).

![Ilustração no estilo ache as diferenças com duas fichas de cadastro fictícias. Ficha C-1042, já cadastrada: Maria Ap. Souza, CPF 123.456.789-09, celular (11) 98765-4321, e-mail maria.souza@example.com. Novo cadastro digitado: MARIA APARECIDA SOUZA, CPF 12345678909, celular +55 11 98765 4321, e-mail Maria.Souza@Example.com, com as quatro diferenças circuladas. Abaixo, na forma canônica: CPF 12345678909 igual, celular +5511987654321 igual, e-mail maria.souza@example.com igual e nome só parecido, porque Ap. não é Aparecida. Conclusão: mesmo CPF, o sistema recusa e mostra C-1042; nome parecido, sozinho, gera só aviso. Exemplo fictício.](./torno-duplicado-diferencas.svg)

*Exemplo fictício: nomes, CPF, celular e e-mail inventados; as diferenças somem na forma canônica, menos a do nome. Ilustração original Torno Studio, 2026.*

## Unicidade no banco de dados, não só na tela

Um aviso na tela não impede duas pessoas de salvarem o mesmo CPF no mesmo segundo, nem uma integração que grava direto. A regra de chave precisa existir também no banco de dados, sobre a forma canônica.

Como referência técnica, a documentação do PostgreSQL 18 mostra três recursos para isso: um [índice único sobre uma expressão](https://www.postgresql.org/docs/current/indexes-expressional.html), como `lower(col1)`, impede valores que diferem só em maiúsculas; um [índice único parcial](https://www.postgresql.org/docs/current/indexes-partial.html) impõe unicidade só nas linhas que atendem a uma condição, útil para exigir CPF único entre cadastros que têm CPF e estão ativos; e [colações não determinísticas](https://www.postgresql.org/docs/current/collation.html) podem tratar como iguais textos que diferem em maiúsculas ou acentos, com custo de desempenho e algumas operações de padrão indisponíveis, segundo a própria documentação. Outros bancos têm recursos equivalentes. Para o aceite, importa a pergunta: **onde a regra é garantida quando duas gravações chegam juntas?**

## Aviso de possível duplicata na criação

Para a chave, bloqueio. Para sinais, aviso. O [Salesforce](https://trailhead.salesforce.com/content/learn/modules/sales_admin_duplicate_management/sales_admin_duplicate_management_unit_1), por exemplo, separa a regra que identifica a possível duplicata da regra que decide a ação: alertar o usuário ou impedir a criação. No sistema sob medida, escreva o mesmo:

- Quais sinais disparam o aviso (telefone igual, e-mail igual, nome parecido no mesmo CEP) e em quais portas.
- O que o aviso mostra. Exibir nome, documento e telefone completos de outro cliente a qualquer usuário pode expor dados; defina, como em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/), quem vê o quê.
- O que o usuário pode fazer: abrir o cadastro existente, continuar mesmo assim (com motivo) ou pedir revisão.
- Se o aviso ignorado fica registrado, para que se possa medir quantos avisos são falsos.

Na API e na importação não há tela. Combine a resposta: erro com o identificador do cadastro existente, criação marcada como "suspeita" ou fila de revisão.

## Mesclagem: o que fica, o que vai e o que não muda

Quando duas fichas são do mesmo cliente, a mesclagem precisa de regras escritas:

1. **Registro sobrevivente.** Qual ficha fica: a mais antiga, a com mais histórico ou a escolhida pelo usuário? O identificador da outra não some: vira um apelido que aponta para a sobrevivente, para que links, relatórios antigos e integrações continuem achando o cliente.
2. **Campo a campo.** Para cada campo com valores diferentes, quem escolhe e qual é o padrão. O e-mail descartado é apagado ou guardado como secundário?
3. **Histórico que se move.** Pedidos, orçamentos, contratos, chamados, anexos, notas fiscais, títulos a receber, consentimentos e observações passam para a sobrevivente. Liste cada tipo; o que não está na lista fica órfão.
4. **O que não muda.** Documentos emitidos guardam os dados com que foram emitidos. A nota fiscal emitida para a ficha antiga passa a aparecer no histórico da sobrevivente, mas o arquivo da nota não é reescrito.
5. **Totais recalculados.** Limite de crédito, saldo, pontos de fidelidade, classificação do cliente.
6. **Trilha.** Quem mesclou, quando, quais fichas, valores de cada campo antes e depois e lista dos itens movidos. O conteúdo desse registro está detalhado em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).
7. **Permissão.** Quem pode mesclar e se mesclar fichas com documentos diferentes é proibido ou exige permissão específica.

Produtos de mercado tomam decisões diferentes, o que mostra que a regra é escolha. No [HubSpot](https://knowledge.hubspot.com/records/merge-records), segundo a documentação atualizada em setembro de 2026, os valores do registro principal têm prioridade, atividades e associações dos dois vão para o registro resultante; por padrão, um novo identificador é criado e o e-mail do contato secundário vira e-mail secundário.

O destino da ficha que deixa de existir (excluída, inativada ou só escondida) segue o que você definiu em [arquivar ou excluir registros](https://tornostudio.com/blog/arquivar-excluir-registros-sistema/).

![Ilustração de dois rios que se juntam. O rio da esquerda, C-2210, cadastro do site, leva 1 pedido, 1 nota e 1 contrato. O rio da direita, C-1042, cadastro do balcão, leva 3 pedidos, 2 notas e 1 anexo. Depois da confluência, C-1042 sobrevivente leva 4 pedidos, 3 notas e 2 anexos. Na margem esquerda, uma placa indica C-2210 para C-1042: o identificador antigo, como apelido, ainda acha o cliente. Na margem direita, um marco de pedra registra a trilha: quem, quando e o quê. Rio abaixo, uma comporta pergunta: desfazer? Regra escrita antes de mesclar. Nada do histórico fica para trás. Exemplo fictício.](./torno-duplicado-rios-mesclagem.svg)

*Exemplo fictício: fichas, pedidos, notas e anexos inventados; a mesclagem leva todo o histórico para a ficha que fica. Ilustração original Torno Studio, 2026.*

## Desfazer a mesclagem

Mesclar duas pessoas diferentes por engano é o erro mais caro do processo, porque mistura histórico, documentos e contatos de uma na ficha da outra. Por isso, decida antes se haverá desfazer:

- **Não há desfazer.** É uma escolha legítima: no HubSpot, a documentação diz que não é possível desfazer a mesclagem. Nesse caso, a mesclagem pede confirmação forte e permissão restrita, e a correção é manual.
- **Restaurar a ficha removida.** Num artigo de ajuda do [Salesforce](https://help.salesforce.com/apex/HTViewSolution?id=000331044&language=en_US), o contato duplicado vai para a Lixeira na mesclagem, e restaurá-lo não afeta o registro principal. Restaurar a ficha, portanto, não é o mesmo que desfazer a mesclagem: o registro principal continua como está, e o artigo não diz que o histórico movido volta com a ficha restaurada.
- **Desfazer de verdade.** O sistema usa a lista de itens movidos da trilha para devolver cada um à ficha original, dentro de uma janela de tempo.

Se houver desfazer de verdade, escreva o que acontece com o que foi criado depois da mesclagem (um pedido novo lançado na ficha sobrevivente volta para qual?), com campos editados depois e com integrações que já receberam a ficha mesclada.

## Importações e integrações que recriam duplicatas

Limpar duplicatas não adianta se a próxima importação recria tudo. Toda entrada que cria cliente precisa usar a mesma forma canônica e a mesma regra de chave da tela.

- **Importação de planilha**: cada linha com chave já existente atualiza a ficha, vira pendência ou é recusada, conforme regra escrita, e o recibo diz o que aconteceu com cada linha. Modelo, validação e recibo estão em [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).
- **Integrações**: guarde o identificador externo de cada sistema ligado à ficha. Depois de uma mesclagem, o sistema externo continua mandando o identificador antigo; o apelido precisa resolvê-lo para a sobrevivente, em vez de criar uma ficha nova.
- **Evento repetido** (o mesmo envio chegando duas vezes) é outro problema, com outra solução, descrito em [evento duplicado na integração](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).

## Limpeza das duplicatas que já existem

Num sistema em uso, a nova regra de unicidade pode nem conseguir ser ligada enquanto houver CPFs repetidos. Peça um relatório de suspeitas, com cada par e o motivo (mesmo documento, mesmo telefone, nome parecido), uma fila de revisão por pessoas que conhecem os clientes e mesclagens em lotes, com contagem de pedidos e notas antes e depois. Mesclagem automática em massa só para o caso mais forte, a mesma chave na forma canônica, e ainda assim com amostra conferida. Se a limpeza acontece junto com a troca de sistema, veja [validação na migração de dados](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/).

## Cadastro duplicado e LGPD

A [LGPD](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) inclui entre os princípios a **qualidade dos dados**, "garantia, aos titulares, de exatidão, clareza, relevância e atualização dos dados" (art. 6º, V), e dá ao titular o direito à correção de dados incompletos, inexatos ou desatualizados (art. 18, III). Duas fichas da mesma pessoa, uma com endereço velho, tornam a correção incompleta: corrige-se uma e a outra continua sendo usada.

O risco inverso também existe: mesclar duas pessoas diferentes coloca o histórico de uma na ficha da outra, e a próxima consulta ou resposta pode mostrar a alguém dados que não são dele. Como atender o pedido de correção e avisar quem recebeu o dado está em [pedido do titular na LGPD](https://tornostudio.com/blog/lgpd-pedido-titular-sistema-aceite/). Confirme as obrigações do seu caso com o jurídico ou o encarregado.

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Ficha C-1042: Maria Ap. Souza, CPF 123.456.789-09 (número fictício com dígitos verificadores válidos, para passar na validação), celular +5511987654321, e-mail maria.souza@example.com, cadastrada no balcão, com 3 pedidos, 2 notas fiscais e 1 anexo. Ficha C-2210: MARIA APARECIDA SOUZA, sem CPF, mesmo celular, e-mail Maria.Souza@Example.com, criada pelo site, com 1 pedido, 1 nota fiscal e 1 contrato em PDF. Regras: CPF/CNPJ é chave e bloqueia; telefone, e-mail e nome parecido só avisam; sobrevivente é a ficha mais antiga; mesclar fichas com CPFs diferentes é recusado; o contrato em PDF conta como anexo; desfazer em até 30 dias, e o que foi lançado na sobrevivente depois da mesclagem fica nela. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Criar "MARIA APARECIDA SOUZA" com CPF 123.456.789-09 | Recusado: CPF já cadastrado; oferece abrir C-1042 a quem tem permissão | Mensagem e banco sem nova ficha |
| Criar pela API com CPF "12345678909 " (espaço no fim) | Recusado com código de erro e identificador C-1042 | Resposta da API |
| Dois usuários salvam o mesmo CPF novo no mesmo instante | Só uma ficha criada; o segundo recebe a mensagem de duplicata | Duas sessões e contagem no banco |
| Criar "Maria Ap. Souza", sem CPF, celular (11) 98765-4321 | Aviso de possível duplicata (mesmo celular); pode seguir com motivo | Tela e registro do aviso ignorado |
| Criar "João Souza" com o mesmo celular e e-mail de C-1042 | Aviso, sem bloqueio nem mesclagem automática | Nova ficha e registro do aviso |
| Criar "José Ribeiro" colado de PDF (acento decomposto) com "José Ribeiro" já cadastrado | Aviso de possível duplicata; nome gravado e exibido em NFC, igual ao já cadastrado | Tela e nome em NFC no banco |
| Buscar "12345678909" e "(11) 98765 4321" | Encontra C-1042 nos dois casos | Resultado da busca |
| Mesclar C-2210 em C-1042, escolhendo o nome completo de C-2210 | C-1042 com 4 pedidos, 3 notas, 2 anexos e nome Maria Aparecida Souza; CPF de C-1042 mantido | Contagens e campos antes e depois |
| Abrir a nota emitida para C-2210 antes da mesclagem | Aparece no histórico de C-1042; arquivo da nota inalterado | Hash do arquivo antes e depois |
| Abrir o link de C-2210 e consultar C-2210 pela API | Leva a C-1042, com a indicação "mesclado em" | Tela e resposta da API |
| Integração envia atualização com o identificador externo de C-2210 | Aplicada em C-1042; nenhuma ficha recriada | Registro da integração |
| Consultar a trilha da mesclagem | Usuário, data e hora, fichas, valores antes e depois e lista de itens movidos | Registro exportado |
| Desfazer no dia 5, com um pedido novo lançado em C-1042 no dia 2 | C-2210 volta com 1 pedido, 1 nota e 1 contrato; o pedido novo fica em C-1042, conforme a regra escrita | Contagens e trilha do desfazer |
| Desfazer no dia 31 | Recusado: fora da janela; orienta correção manual | Mensagem |
| Mesclar duas fichas com CPFs diferentes | Recusado, com mensagem que aponta a divergência de CPF | Mensagem e trilha |
| Usuário sem permissão tenta mesclar | Ação indisponível ou negada | Tela e registro |
| Importar planilha com 3 linhas de C-1042 em formatos diferentes | Nenhuma ficha nova; atualização ou pendência por linha, conforme a regra | Recibo da importação |
| Relatório de suspeitas na base de teste | Lista o par C-1042 e C-2210 com o motivo "mesmo celular e mesmo e-mail"; nada é mesclado sozinho | Arquivo exportado |

*Fim do exemplo fictício. Fichas, nomes, documentos, telefones, e-mails, pedidos, janela de desfazer e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. As regras de chave, aviso, sobrevivência e desfazer são escolhas do exemplo, não exigência legal nem padrão de ferramenta.*

## Perguntas frequentes

### Posso usar o e-mail como chave do cliente?

Pode, se o seu negócio garante um e-mail por cliente, como num cadastro de consumidor com login. Em vendas para empresas e famílias, o e-mail é compartilhado, e usá-lo como chave impede cadastros legítimos ou junta pessoas diferentes.

### Mesclagem automática é segura?

Só para a regra mais forte, a mesma chave na forma canônica, e mesmo assim com trilha e conferência por amostra. Para nome, telefone e e-mail, a mesclagem automática troca uma duplicata visível por uma mistura de pessoas difícil de achar.

Para transformar as regras de identidade e mesclagem do seu cadastro em requisitos e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a lista das portas por onde clientes entram, um exemplo anonimizado de duplicata e o que depende da ficha do cliente (pedidos, notas, cobranças), sem dados reais de clientes.

*Fontes consultadas em 11 de novembro de 2026: Lei nº 13.709/2018 (espelho da Câmara dos Deputados), Unicode UAX #15 revisão 56, Plano de Numeração Brasileiro (Anatel), base de recomendações ITU-T (E.164), documentação do PostgreSQL 18, Salesforce Trailhead e Ajuda Salesforce, e HubSpot Knowledge Base. Este artigo não recomenda ferramenta nem fornecedor e não é parecer jurídico; fichas, clientes, documentos e ilustrações são modelos editoriais fictícios.*
