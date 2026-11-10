---
content_id: torno-artigo-pt-20261110-estoque-lote-validade
intent_id: buyer-inventory-lot-expiry-fefo-traceability-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Controle de estoque por lote e validade: o que definir e testar no aceite do sistema'
h1: 'Controle de estoque por lote e validade: o que definir e testar no aceite do sistema'
seo_title: 'Controle de estoque por lote e validade: aceite | Torno'
seo_description: 'Lote obrigatório, validade, FEFO, quarentena, leitura GS1 e rastreio para recolhimento: o que definir e testar no aceite de um sistema de estoque sob medida.'
summary: 'Roteiro para quem vai contratar um sistema ou módulo de estoque sob medida definir e testar o controle por lote e validade: a chave do lote, lote e validade obrigatórios na entrada e o que fazer quando a etiqueta não traz o lote, leitura das etiquetas GS1 (inclusive a validade com dia 00), separação FEFO e validade mínima exigida pelo cliente, quarentena e lote vencido, inventário e devolução por lote, rastreabilidade para trás e para frente, simulado de recolhimento, quem decide cada regra e critérios de aceite com um exemplo fictício de distribuidora.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar um sistema sob medida, para que o controle de estoque por lote e validade funcione na entrada, na separação, no bloqueio e em um recolhimento?
proposed_path: /blog/estoque-lote-validade-fefo-sistema-aceite/
canonical_url: https://tornostudio.com/blog/estoque-lote-validade-fefo-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores de distribuidoras, pequenas indústrias, food service, cosméticos e autopeças que vão contratar um sistema ou módulo de estoque sob medida com controle por lote e validade, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de ligar o controle por lote e validade em produção.
scope: Chave do lote (GTIN ou SKU mais código do lote); lote e validade obrigatórios na entrada e tratamento da etiqueta sem lote; leitura dos Identificadores de Aplicação GS1 (01), (10), (11) e (17), inclusive o dia 00 da validade; separação FEFO e exceção de validade mínima por cliente; estados do lote (disponível, quarentena, vencido); inventário, ajuste e devolução por lote; rastreabilidade para trás e para frente; simulado de recolhimento com tempo medido; dono de cada regra; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de ERP, WMS ou fornecedor; parecer jurídico, sanitário ou regulatório e garantia de conformidade; medicamentos e produtos de saúde com regras setoriais próprias de rastreabilidade; reservas e camadas de saldo de marketplace (cobertas em outro artigo); regras fiscais; tutorial de impressão ou de desenho de etiqueta; ordem dos campos e separadores dentro do código de barras.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-10T11:27:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-10T11:40:37Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-10T11:41:59Z'
release_approval_evidence: 'Revisão independente de texto, fontes (GS1: tabela de AIs, GSCN 19-060 e 21-040, GS1 Suécia; RDC Anvisa 655/2022; CDC art. 10; Portaria MJSP 618/2019) e figuras, GO condicionado a quatro correções (FEFO no cenário de quarentena, estado vencido, nota do dia 00 e metadados de aprovação), aplicadas pelo integrador; parecer às 2026-11-10T11:40:37Z; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não recomenda ERP, WMS nem fornecedor; diff final sujeito a revisão final independente.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/
    reason: Cobre o ensaio do leitor com etiquetas reais; aqui o foco é o que o sistema faz com os campos de lote e validade lidos.
  - path: https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/
    reason: Define as camadas do saldo (físico, reservado, bloqueado, disponível); o lote em quarentena entra como bloqueado nessa modelagem.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Ajuda a especificar a carga inicial de saldos por lote e o tratamento das linhas com erro.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Orienta a conferir os saldos por lote ao trocar de sistema.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Detalha como definir quem libera quarentena, autoriza exceção de validade e ajusta inventário.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o registro de quem bloqueou, liberou ou ajustou um lote e quando.
  - path: https://tornostudio.com/blog/arquivar-excluir-registros-sistema/
    reason: Explica por que lote vencido ou sem saldo se arquiva e não se exclui.
  - path: https://tornostudio.com/blog/exportacao-dados-sistema-aceite/
    reason: Ajuda a especificar e conferir a lista exportada no simulado de recolhimento.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar as regras de lote e validade da empresa em requisitos e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'Na tabela de Identificadores de Aplicação da GS1, (01) é o GTIN, (02) identifica os itens comerciais contidos em uma unidade logística, (10) é o número de lote, (11) é a data de produção e (17) é a data de validade, as duas no formato AAMMDD.'
    reference: https://gs1.org/standards/barcodes/application-identifiers/243?lang=en
    entity: GS1 (gs1.org), Application Identifiers
    source_date: null
    checked_at: '2026-11-10T11:27:00Z'
    limit: Página sem data; traz nomes e formato de data, não o tamanho máximo nem a regra do dia 00, que remetem às GS1 General Specifications. O artigo não afirma a ordem dos campos nem separadores.
  - classification: FATO
    claim: 'O lote no AI (10) é alfanumérico, de 1 a 20 caracteres, e o dono da marca e o fabricante devem garantir que o número de lote não se repita para um mesmo GTIN, mesmo com fabricação em locais diferentes.'
    reference: https://www.gs1.org/docs/barcodes/GSCN_19-060_BatchNumberUpdate.pdf
    entity: GS1 AISBL, GSCN WR 19-060 (GTIN Uniqueness), relativo às General Specifications 19.1
    source_date: '2019-04-17'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Documento de mudança de 2019, não a versão vigente das General Specifications; o limite de 20 caracteres aparece no diagrama de formato. Confirmar na release vigente.
  - classification: FATO
    claim: 'Pela regra geral da GS1, uma validade (17) com dia 00 é interpretada como o último dia do mês indicado; para produtos de saúde regulados, a partir de 01/01/2025 o dia não pode ser expresso como 00.'
    reference: https://www.gs1.org/docs/barcodes/GSCN_21-040_HealthcareExpDate.pdf
    entity: GS1 AISBL, GSCN WR 21-040
    source_date: '2021-07-01'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Excerto de rascunho da release 21.1 (julho de 2021); o texto na versão vigente das General Specifications não foi aberto. O artigo manda confirmar a regra com a versão vigente e com o fornecedor das etiquetas.
  - classification: FATO
    claim: 'A GS1 Suécia informou que, a partir de 1º de janeiro de 2025, fabricantes de produtos de saúde regulados devem codificar a validade com dia específico, porque uma data como 2024-12-00 poderia ser qualquer dia de dezembro.'
    reference: https://gs1.se/en/news/change-of-date-format-for-regulated-healthcare-products/
    entity: GS1 Sweden
    source_date: '2024-11-27'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Organização-membro, não a GS1 global; a página não menciona a convenção do último dia do mês. Escopo restrito a saúde regulada.
  - classification: FATO
    claim: 'A RDC nº 655/2022 da Anvisa trata do recolhimento de alimentos, entrou em vigor em 2 de maio de 2022 e revogou a RDC nº 24/2015 (arts. 38 e 39); aplica-se a empresas que produzem, armazenam, distribuem, importam ou comercializam alimentos (art. 2º).'
    reference: https://ses.sp.bvs.br/wp-content/uploads/2022/03/U_RS-MS-ANVISA-RDC-655_240322.pdf
    entity: Anvisa, RDC nº 655 de 24/03/2022 (cópia publicada pela SES-SP/BVS)
    source_date: '2022-03-24'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Cópia hospedada pela SES-SP, não o portal da Anvisa; alterações posteriores a 2022 não verificadas. Confirmar texto consolidado na base Anvisa Legis.
  - classification: FATO
    claim: 'A RDC 655/2022 exige que a empresa tenha plano de recolhimento (art. 4º), que a rastreabilidade seja assegurada em todas as etapas da cadeia (art. 5º) e que os registros permitam identificar as empresas imediatamente anterior e posterior na cadeia produtiva (art. 6º); define rastreabilidade como o conjunto de procedimentos que permite detectar a origem e acompanhar a movimentação de um produto (art. 3º, XII) e lote como conjunto de produtos de um mesmo tipo, processados pelo mesmo fabricante ou fracionador em tempo determinado, sob condições essencialmente iguais (art. 3º, IX).'
    reference: https://ses.sp.bvs.br/wp-content/uploads/2022/03/U_RS-MS-ANVISA-RDC-655_240322.pdf
    entity: Anvisa, RDC nº 655/2022 (cópia SES-SP/BVS)
    source_date: '2022-03-24'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Aplica-se a alimentos; não generalizar para outros segmentos. Cópia não oficial da Anvisa.
  - classification: FATO
    claim: 'Pela RDC 655/2022, a empresa comunica a Anvisa imediatamente após a ciência (art. 21), envia relatório inicial em até 48 horas (art. 22), relatórios periódicos a partir de 30 dias e conclusivo em até 120 dias (art. 24), e guarda registros por 6 meses após o vencimento para produtos com validade na rotulagem, 6 meses após recebimento ou distribuição para perecíveis sem validade e 5 anos nos demais casos (art. 35).'
    reference: https://ses.sp.bvs.br/wp-content/uploads/2022/03/U_RS-MS-ANVISA-RDC-655_240322.pdf
    entity: Anvisa, RDC nº 655/2022 (cópia SES-SP/BVS)
    source_date: '2022-03-24'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Usado só para mostrar que o prazo de resposta é curto e que o registro precisa durar; não é parecer nem afirmação de conformidade de sistema. O artigo cita apenas a comunicação imediata, as 48 horas e os prazos de guarda.
  - classification: FATO
    claim: 'CDC, art. 10, § 1º: o fornecedor que, depois de colocar o produto no mercado, tiver conhecimento da periculosidade que ele apresente deve comunicar o fato imediatamente às autoridades competentes e aos consumidores, mediante anúncios publicitários.'
    reference: https://legis.senado.leg.br/norma/549954/publicacao/15763242
    entity: Senado Federal, Lei nº 8.078/1990 (Código de Defesa do Consumidor)
    source_date: '1990-09-11'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Texto da publicação no Senado; redação consolidada no Planalto não aberta.
  - classification: FATO
    claim: 'A Portaria MJSP nº 618/2019 trata do procedimento de chamamento (recall) de produtos e prevê comunicar à Senacon, em 24 horas, o início das investigações (art. 2º) e dois dias úteis da decisão de realizar o chamamento (art. 3º).'
    reference: https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/defesadoconsumidor/Biblioteca/legislacao-upload/portaria_mjsp_n-_618_2019.pdf
    entity: Ministério da Justiça e Segurança Pública, Portaria nº 618 de 01/07/2019
    source_date: '2019-07-01'
    checked_at: '2026-11-10T11:27:00Z'
    limit: Vigência em 2026 não confirmada; o artigo diz isso e manda confirmar com o responsável jurídico.
  - classification: HIPÓTESE
    claim: 'A Distribuidora Fictícia Sul, o fornecedor Conservas Exemplo, os clientes, o SKU MT-340, o GTIN 12000000012343, os lotes, datas, saldos, a nota 4410, os critérios de aceite e as ilustrações são modelos editoriais fictícios; as regras de lote interno para etiqueta sem lote, validade mínima por cliente, desempate do FEFO, estados do lote e quarentena são proposta editorial de modelagem, não exigências das normas citadas.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de ERP, WMS ou fornecedor. O dígito verificador do GTIN fictício foi calculado pelo algoritmo padrão.
---

*Leitura estimada: 13 minutos.*

**Para aceitar um sistema de controle de estoque por lote e validade, exija que ele não deixe entrar mercadoria sem lote e validade, separe primeiro o que vence primeiro respeitando a validade mínima que cada cliente exige, tire do disponível o lote vencido ou suspeito e responda, numa consulta, de qual fornecedor veio cada lote e para quais clientes ele foi.** No aceite, peça para ver isso com dados fictícios: uma entrada sem lote recusada ou tratada pela regra combinada, uma etiqueta lida campo a campo, um pedido separado por validade, um lote posto em quarentena e um simulado de recolhimento com a lista de clientes exportada e a soma conferida.

**Este artigo não recomenda ERP, WMS nem fornecedor e não é parecer jurídico ou sanitário.** As normas citadas servem para mostrar por que o registro e o prazo importam; quais obrigações valem para a sua empresa depende do segmento e do produto e deve ser confirmado com o responsável técnico e o jurídico. Medicamentos e outros produtos de saúde têm regras próprias de rastreabilidade e ficam fora deste texto.

## O que é um lote para o sistema

Para o sistema, lote não é um texto solto: é uma chave. O mesmo código "L26241" pode aparecer em dois produtos diferentes, e o sistema não pode somar os dois. A GS1, que mantém o padrão GTIN, diz em uma [nota de mudança de 2019 sobre o número de lote](https://www.gs1.org/docs/barcodes/GSCN_19-060_BatchNumberUpdate.pdf) que o dono da marca e o fabricante devem garantir que o lote não se repita **para um mesmo GTIN**. Ou seja: a unicidade vale dentro do produto, não entre produtos.

Daí a chave mínima: **GTIN (ou SKU interno) + código do lote**. Quando o produto não tem GTIN e dois fornecedores entregam o mesmo SKU, inclua o fornecedor na chave. Defina também o que acontece quando chega o mesmo GTIN e o mesmo lote com uma validade diferente da já cadastrada: o sistema não deve escolher sozinho; deve parar e pedir decisão.

Vale separar dois sentidos da palavra. Para alimentos, a [RDC nº 655/2022 da Anvisa](https://ses.sp.bvs.br/wp-content/uploads/2022/03/U_RS-MS-ANVISA-RDC-655_240322.pdf) (cópia publicada pela Secretaria da Saúde de São Paulo) define lote como o conjunto de produtos de um mesmo tipo, processados pelo mesmo fabricante ou fracionador em tempo determinado, sob condições essencialmente iguais (art. 3º, IX). O lote do fabricante é esse. Um lote criado pelo seu sistema para identificar uma entrada não é o lote do fabricante, e o cadastro precisa mostrar essa diferença.

## Na entrada: lote e validade obrigatórios

O controle por lote nasce no recebimento. Se uma caixa entra sem lote, ela nunca mais será rastreada. Peça que a conferência de entrada exija, para os produtos marcados como controlados por lote:

- **Lote**, lido ou digitado, ligado à nota de entrada e ao fornecedor.
- **Validade**, obrigatória; **fabricação**, quando o produto a traz.
- **Validações**: validade posterior à fabricação; validade ainda não vencida na data do recebimento, ou bloqueio com motivo; quantidade por lote somando a quantidade da nota.

Quando o fornecedor imprime só mês e ano na validade, combine qual dia o sistema grava e mostre isso na tela; o mesmo raciocínio vale para o dia 00 explicado na próxima seção.

**Quando a etiqueta não traz o lote**, há duas saídas razoáveis, e o contrato precisa escolher uma por tipo de produto. É uma regra do projeto, não do padrão GS1:

1. **Recusar a conferência** até o lote ser obtido com o fornecedor.
2. **Criar um lote interno**, com origem marcada como "interno", ligado à nota de entrada, à data e ao responsável, e com a validade informada.

O que não pode existir é um lote genérico "SEM LOTE" que acumula entradas de datas e notas diferentes: ele torna impossível dizer de onde veio uma caixa.

Se a carga inicial de saldos por lote vier de planilha, aplique as mesmas validações; o artigo sobre [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/) mostra como tratar as linhas com erro. Na troca de sistema, confira os saldos lote a lote, como em [validação de migração de dados](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/).

## O que a etiqueta GS1 traz e o que o sistema precisa decodificar

Muitas caixas trazem, além do GTIN, lote e datas codificados com Identificadores de Aplicação (AIs), os números entre parênteses na linha legível. Pela [tabela de AIs da GS1](https://gs1.org/standards/barcodes/application-identifiers/243?lang=en):

- **(01)** é o GTIN do item comercial.
- **(10)** é o lote. Pela nota de 2019 citada acima, tem de 1 a 20 caracteres alfanuméricos.
- **(11)** é a data de produção, no formato AAMMDD (ano, mês, dia).
- **(17)** é a data de validade, também AAMMDD.

Em etiquetas de palete, o GTIN dos itens contidos pode vir em **(02)**, que a mesma tabela descreve como identificação dos itens comerciais contidos numa unidade logística.

![Etiqueta de caixa fictícia ampliada com o cabeçalho MOLHO DE TOMATE 340 g · CX 24 · MT-340, barras ilustrativas e a linha legível (01) 12000000012343 (11) 260615 (17) 270614 (10) L26241; cada campo é sublinhado e decodificado ao lado: GTIN do item comercial da caixa, fabricação 15/06/2026, validade 14/06/2027 e lote L26241 de 1 a 20 caracteres que não deve repetir para o mesmo GTIN. Um detalhe mostra a validade (17) 270600 lida como 30/06/2027, porque o dia 00 indica o último dia do mês, com a nota de que desde 01/01/2025 produtos de saúde regulados não usam 00; um carimbo tracejado pergunta o que fazer com etiqueta sem (10) e responde que o contrato decide entre recusar ou criar lote interno marcado. Marcado Exemplo fictício.](./torno-lote-etiqueta-gs1.svg)

*Exemplo fictício: produto, GTIN, datas e lote inventados; as barras são ilustrativas e não codificam dados. Ilustração original Torno Studio, 2026.*

Na etiqueta fictícia acima, `(01)12000000012343(11)260615(17)270614(10)L26241` vira quatro campos: GTIN 12000000012343, fabricação 15/06/2026, validade 14/06/2027 e lote L26241. O sistema deve preencher cada campo separadamente e compará-los com o que a nota de entrada diz.

**O dia 00.** A validade pode vir com o dia 00, como em `(17)270600`. Pela regra geral da GS1, registrada numa [nota de mudança de 2021](https://www.gs1.org/docs/barcodes/GSCN_21-040_HealthcareExpDate.pdf), o dia 00 é lido como o **último dia do mês**: 270600 vira 30/06/2027. A mesma nota diz que, para produtos de saúde regulados, a partir de 01/01/2025 o dia não pode ser 00; a [GS1 Suécia explicou a mudança](https://gs1.se/en/news/change-of-date-format-for-regulated-healthcare-products/) dizendo que uma data como "2024-12-00" poderia ser qualquer dia de dezembro. A nota de 2021 é um excerto de rascunho; confirme a regra na versão vigente das especificações da GS1. Para o aceite, o que importa é o sistema mostrar a data resolvida e marcar que o dia veio como 00.

Duas ressalvas. Nem toda etiqueta de fornecedor segue o padrão GS1, e este artigo não detalha a ordem dos campos nem como eles são separados dentro do código. Por isso o teste decisivo é com etiquetas reais dos seus fornecedores, como no ensaio descrito em [leitor de código de barras no sistema](https://tornostudio.com/blog/leitor-codigo-barras-sistema-requisitos-aceite/).

## FEFO na separação e a validade mínima do cliente

FEFO (*first expired, first out*) quer dizer: sai primeiro o lote que vence primeiro. FIFO (*first in, first out*) manda sair primeiro o que entrou primeiro. Em produto com validade, os dois divergem quando um lote que chegou depois vence antes. Para o sistema, a regra precisa estar escrita:

- **Ordem**: por validade; em empate, pela data de entrada.
- **Exclusões**: lote vencido, em quarentena ou bloqueado nunca é oferecido.
- **Lista de separação**: mostra lote e validade de cada linha, e a leitura na separação confere se a caixa coletada é do lote indicado.

A exceção mais comum é comercial. Redes de varejo e alguns clientes só aceitam mercadoria com um número mínimo de dias até o vencimento. Este artigo chama isso de **validade mínima remanescente**, um termo de modelagem, não de norma. A regra fica no cadastro do cliente, e a separação pula os lotes que não atendem. Se nenhum lote atende, o sistema para e pede uma decisão: avisar o cliente, entregar parcial ou autorizar a exceção. A exceção é feita por um perfil com permissão, com registro de quem autorizou; veja [permissões de acesso como regra de negócio](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## Vencido, suspeito, em quarentena: estados do lote

Saldo por lote sem estado não basta. Uma modelagem possível:

- **Disponível**: pode ser separado.
- **Quarentena**: suspeito, em análise ou devolvido; fora do disponível até alguém liberar.
- **Vencido**: passou da validade; muda de estado sozinho na virada da data e só aceita baixa, descarte ou devolução ao fornecedor, com responsável.

Na modelagem de saldo do artigo sobre [integração com marketplace](https://tornostudio.com/blog/integracao-marketplace-estoque-pedidos-aceite/), quarentena e vencido entram na camada "bloqueado": continuam no físico, saem do que pode ser vendido.

Três perguntas para o contrato: quem pode pôr e tirar um lote da quarentena; o que acontece com caixas do lote que já estão separadas para um pedido ainda não expedido; e como o pedido afetado é sinalizado. Cada mudança de estado precisa ficar registrada com usuário, horário e motivo, como em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Lote vencido ou zerado não se exclui: ele é a resposta de amanhã para "para quem vendemos isso?"; veja [arquivar ou excluir registros](https://tornostudio.com/blog/arquivar-excluir-registros-sistema/).

## Inventário, ajuste e devolução por lote

O inventário conta por lote, não só por produto. Se a contagem de um lote diverge, o ajuste é feito naquele lote, com motivo e perfil autorizado; o sistema não deve aceitar ajuste sem lote informado.

A devolução de cliente volta para o **lote original**, que o sistema confere contra as vendas daquele cliente, e entra em quarentena até a conferência física. Devolução de um lote que não foi vendido a esse cliente gera recusa ou exceção com responsável.

## Rastreabilidade para trás e para frente

Rastreabilidade tem duas direções. **Para trás**: de que fornecedor e nota de entrada veio o lote. **Para frente**: para quais clientes e pedidos ele foi, quanto ainda está separado e quanto está na prateleira. A soma das partes tem de fechar com o recebido.

Para alimentos, a RDC 655/2022 define rastreabilidade como o conjunto de procedimentos que permite detectar a origem e acompanhar a movimentação de um produto (art. 3º, XII), diz que ela deve ser assegurada em todas as etapas da cadeia (art. 5º) e exige registros que permitam identificar as empresas **imediatamente anterior e posterior** na cadeia produtiva (art. 6º). Para outros segmentos, confirme com o responsável técnico o que se aplica.

![Árvore horizontal de rastreabilidade do lote fictício L26290: no centro, o tronco Lote L26290 · MT-340 · fabricação 18/08/2026 · validade 17/08/2027 · 480 caixas recebidas; à esquerda, para trás, a raiz com a nota de entrada 4410 de 01/09/2026 e o fornecedor Conservas Exemplo Ltda; à direita, para frente, galhos com espessura proporcional à quantidade para Mercado Alfa 120 caixas, Padaria Central 96 e Restaurante Exemplo 60, expedidas, 276 no total; um galho tracejado com 24 caixas separadas para pedido ainda não expedido, a retirar; e um galho hachurado com 180 caixas na prateleira, em quarentena. No pé, a conta 276 + 24 + 180 = 480 caixas e o selo A soma fecha com o recebido. Marcado Exemplo fictício.](./torno-lote-arvore-rastreio.svg)

*Exemplo fictício: fornecedor, clientes, nota e quantidades inventados; espessura dos galhos proporcional às caixas. Ilustração original Torno Studio, 2026.*

## Simulado de recolhimento: o que o sistema precisa entregar

Quando um lote tem problema, o tempo é curto. Para alimentos, a RDC 655/2022 exige que a empresa tenha um plano de recolhimento (art. 4º), comunique a Anvisa imediatamente após a ciência (art. 21) e envie um relatório inicial em até 48 horas (art. 22). Para produtos de consumo em geral, o Código de Defesa do Consumidor, no [art. 10, § 1º](https://legis.senado.leg.br/norma/549954/publicacao/15763242), manda o fornecedor que descobre a periculosidade de um produto já no mercado comunicar o fato imediatamente às autoridades e aos consumidores. A [Portaria MJSP nº 618/2019](https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/defesadoconsumidor/Biblioteca/legislacao-upload/portaria_mjsp_n-_618_2019.pdf) detalha o procedimento de chamamento junto à Senacon, com prazos como 24 horas e dois dias úteis; confirme com o jurídico se ela continua vigente e o que se aplica ao seu caso.

O sistema não substitui o plano de recolhimento nem decide se há recolhimento. Ele precisa entregar, em minutos, os dados de que a empresa vai precisar. Peça no aceite um **simulado de recolhimento** de um lote fictício:

- Lista exportável por lote com cliente, contato, nota de saída, data e quantidade; o artigo sobre [exportação de dados](https://tornostudio.com/blog/exportacao-dados-sistema-aceite/) ajuda a definir e conferir esse arquivo.
- Total expedido conferido com a soma das linhas.
- Lote em quarentena e pedidos pendentes sinalizados.
- Horário de início e fim do simulado e quem executou.

Combine também por quanto tempo o histórico de lote fica disponível. A RDC 655/2022 prevê, para alimentos, guarda de registros de 6 meses após o vencimento para produtos com validade na rotulagem, 6 meses após o recebimento ou a distribuição para perecíveis sem validade e 5 anos nos demais casos (art. 35). A cópia da RDC usada aqui é da Secretaria da Saúde de São Paulo; confirme o texto consolidado na base da Anvisa.

## Quem decide cada regra

Boa parte do que está acima não é decisão técnica. Antes de especificar, escreva quem responde por cada regra:

- **Operação e logística**: estados do lote, ordem de separação, inventário, onde fica fisicamente a quarentena.
- **Qualidade ou responsável técnico**: quando um lote vai para quarentena, quem libera, o que fazer com etiqueta sem lote, quando acionar o plano de recolhimento.
- **Comercial**: validade mínima de cada cliente e quem pode autorizar exceção.
- **Jurídico e regulatório**: quais normas valem para o produto, prazos de guarda e de comunicação.
- **Fornecedor do sistema**: implementar as regras escritas, demonstrá-las no aceite e documentar o comportamento. Ele não define regra sanitária nem prazo legal.

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Fictícia Sul revende o SKU MT-340, "Molho de tomate 340 g, caixa com 24", GTIN da caixa 12000000012343, comprado da Conservas Exemplo Ltda. Data de referência: 12/11/2026. Cada cenário parte deste saldo:

| Lote | Fabricação | Validade | Dias até vencer | Saldo |
|---|---|---|---|---|
| L26120 | 15/05/2026 | 05/11/2026 | Vencido há 7 dias | 8 cx |
| L26241 | 15/06/2026 | 14/06/2027 | 214 | 60 cx |
| L26290 | 18/08/2026 | 17/08/2027 | 278 | 180 cx na prateleira |
| L26301 | 02/10/2026 | 01/10/2027 | 323 | 300 cx |

O L26290 chegou com 480 caixas na nota de entrada 4410, em 01/09/2026: 276 foram expedidas (Mercado Alfa 120, Padaria Central 96, Restaurante Exemplo 60), 24 estão separadas para um pedido ainda não expedido e 180 estão na prateleira. O cliente Rede Exemplo exige 270 dias de validade mínima, o que, em 12/11/2026, corta tudo que vence antes de 09/08/2027.

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Entrada de 480 cx de MT-340 sem lote informado | Conferência não conclui, ou cria lote interno marcado como "interno" e ligado à nota 4410, conforme a regra do contrato; nunca grava saldo "sem lote" | Tela de recusa ou cadastro do lote interno com nota e responsável |
| Entrada com fabricação 15/06/2026 e validade 14/05/2026, ou já vencida | Bloqueio com motivo; nada entra no disponível | Mensagem de erro e registro da tentativa |
| Lote "L26241" em dois GTINs; e mesmo GTIN e lote com validade diferente da cadastrada | Dois lotes distintos no primeiro caso; alerta e parada para decisão no segundo | Cadastro com os dois lotes e o alerta |
| Leitura de `(01)12000000012343(11)260615(17)270614(10)L26241` | GTIN, fabricação 15/06/2026, validade 14/06/2027 e lote L26241 em campos separados e comparados com a nota | Registro da leitura e tela de conferência |
| Etiqueta com `(17)270600` | Validade gravada como 30/06/2027, com marca de que o dia veio como 00 | Tela com a data resolvida e a marca |
| Etiqueta sem lote, só com GTIN e validade | Aplica a regra do primeiro cenário e registra que o lote não veio impresso | Cadastro com origem do lote e usuário |
| Pedido de 100 cx de cliente sem exigência de validade | FEFO: 60 cx de L26241 e 40 cx de L26290; L26120 não é oferecido | Lista de separação com lote e validade |
| Pedido de 50 cx da Rede Exemplo (mínimo de 270 dias) | L26241 (214 dias) é pulado; 50 cx de L26290 (278 dias); sem lote que atenda, o pedido para e pede autorização | Regra no cadastro do cliente, lista de separação e registro de quem autorizou, se houver exceção |
| Virada da data: L26120 venceu em 05/11/2026 | Estado muda para vencido sozinho; sai do disponível; só aceita baixa, descarte ou devolução ao fornecedor, com responsável | Estado e histórico do lote |
| Fornecedor avisa problema no L26290; usuário autorizado aplica quarentena | 180 cx da prateleira e 24 cx separadas ficam indisponíveis; as 24 são retiradas do pedido pendente, que é sinalizado; a separação passa a oferecer L26241 e, depois dele, L26301 (para a Rede Exemplo, só L26301) | Estado, saldo por lote e alerta no pedido |
| Consulta de rastreabilidade do L26290 | Para trás: Conservas Exemplo, nota 4410, 01/09/2026, 480 cx. Para frente: 120 + 96 + 60 expedidas, 24 separadas, 180 em estoque; soma 480 | Tela ou relatório da consulta |
| Simulado de recolhimento do L26290 | Lista exportada com cliente, contato, nota de saída, data e quantidade; total de 276 cx expedidas conferido | Arquivo, horário de início e fim e quem executou |
| Inventário: contagem de L26301 dá 297 cx; sistema mostra 300 | Ajuste de 3 cx no lote, com motivo e perfil autorizado; ajuste sem lote é recusado | Movimento de ajuste e histórico |
| Devolução de 10 cx do Mercado Alfa com etiqueta do L26290 | Volta ao L26290 em quarentena até conferência; lote não vendido a esse cliente gera recusa | Movimento de devolução e estado do lote |

*Fim do exemplo fictício. Distribuidora, fornecedor, clientes, GTIN, lotes, datas e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. A leitura do dia 00 segue a regra geral da GS1 descrita acima, a confirmar na versão vigente das especificações; o FEFO com validade mínima é regra combinada no projeto. Nenhuma das duas é exigência legal.*

## Perguntas frequentes

### FEFO ou FIFO: qual usar?

Para produto com validade, em geral FEFO, porque o que importa é o que vence primeiro. FIFO pode bastar quando todos os lotes têm a mesma vida útil e chegam em ordem. Em qualquer caso, a regra precisa estar escrita e testada, inclusive o desempate e as exceções por cliente.

### Preciso de etiqueta GS1 para controlar estoque por lote?

Não. O lote pode ser digitado ou lido de outro código. A etiqueta GS1 é uma forma padronizada de trazer GTIN, lote e datas, o que reduz digitação; se os seus fornecedores a usam, teste a leitura com etiquetas reais.

### O sistema substitui o plano de recolhimento?

Não. O plano é da empresa e define quem decide, quem comunica e como. O sistema entrega os dados: de onde veio o lote, para quem foi, quanto resta e em quanto tempo isso aparece.

Para transformar as regras de lote e validade da sua empresa em requisitos e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) três etiquetas de caixa de fornecedores diferentes, a lista de clientes que exigem validade mínima e uma nota de entrada típica, sem dados reais de clientes.

*Fontes consultadas em 10 de novembro de 2026: GS1 (tabela de Identificadores de Aplicação e notas de mudança GSCN 19-060 e 21-040), GS1 Suécia, RDC nº 655/2022 da Anvisa (cópia da SES-SP), Lei nº 8.078/1990 no Senado Federal e Portaria MJSP nº 618/2019. Este artigo não recomenda ERP, WMS nem fornecedor e não é parecer jurídico; distribuidora, fornecedor, clientes, GTIN, lotes, quantidades e ilustrações são modelos editoriais fictícios.*
