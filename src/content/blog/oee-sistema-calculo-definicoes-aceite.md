---
content_id: torno-artigo-pt-20261113-oee-sistema
intent_id: buyer-oee-calculation-definitions-system-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'OEE no sistema: o que definir antes de automatizar o cálculo e como testar o número'
h1: 'OEE no sistema: o que definir antes de automatizar o cálculo e como testar o número'
seo_title: 'OEE no sistema: definições e testes antes de automatizar | Torno'
seo_description: 'Tempo planejado, paradas, ciclo ideal, microparadas, refugo, origem do apontamento e soma por turno: o que definir e testar antes de confiar no OEE do sistema.'
summary: 'Roteiro para a indústria que vai calcular o OEE (disponibilidade × performance × qualidade) num sistema, em vez da planilha: por que o mesmo turno pode dar números diferentes; o que é definição normativa, convenção de mercado e decisão da empresa; calendário e tempo planejado por máquina; lista de motivos e classificação das paradas planejadas e não planejadas, inclusive setup e preventiva; ciclo ideal por produto e máquina; microparadas e velocidade reduzida; refugo, retrabalho e peça boa; origem do dado (apontamento manual × sinal de máquina); granularidade por turno, ordem e máquina e soma ponderada; correções depois do fechamento; quem decide cada definição; e critérios de aceite (cenário, resultado esperado, evidência) sobre um exemplo fictício.'
primary_question: O que a indústria precisa definir antes de automatizar o cálculo do OEE num sistema, e como testar o número antes de usá-lo para decidir?
proposed_path: /blog/oee-sistema-calculo-definicoes-aceite/
canonical_url: https://tornostudio.com/blog/oee-sistema-calculo-definicoes-aceite/
url_owner: Torno; destino editorial proposto, ainda não publicado.
audience: Diretores industriais e de operações, gerentes de produção, PCP, manutenção, engenharia de processo, qualidade e TI de indústrias de médio e grande porte que vão contratar, especificar ou aceitar o cálculo de OEE num sistema (MES, ERP, painel ou sistema sob medida), e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de automatizar o cálculo ou de usar o número para metas e decisões.
scope: Fórmula do OEE e seus três fatores; diferença entre definição normativa (ISO 22400-2, citada só pelo que a página pública e o sumário mostram), convenção de mercado e decisão da empresa; calendário, turnos, refeições e tempo planejado por máquina; lista de motivos de parada e classificação planejada × não planejada, inclusive setup e manutenção preventiva; parada sem motivo; ciclo ideal por produto e máquina e performance acima de 100%; microparadas e velocidade reduzida; refugo, retrabalho e peça boa de primeira; apontamento manual × sinal de máquina e o que cada um responde; granularidade por turno, ordem e máquina, ordem que atravessa turnos e soma ponderada; arredondamento; correções depois do fechamento do turno; quem decide cada definição; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de MES, ERP, sensor, plataforma ou fornecedor; projeto de automação, coleta de sinais ou protocolo de comunicação com a máquina (coberto em outro artigo); divergência genérica entre painel e ERP (coberta em outro artigo); conteúdo genérico de datas e fusos, trilha de auditoria, permissões e operação sem internet (cobertos em outros artigos); metas de OEE, benchmark por setor ou promessa de ganho; uso do OEE em remuneração variável; interpretação do texto da ISO 22400, que não é público.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-13T15:10:00Z'
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
  - path: https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/
    reason: Trata como obter e interpretar o dado da máquina e levá-lo ao ERP; aqui o dado já chega e o assunto é o cálculo do OEE.
  - path: https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/
    reason: Trata números divergentes entre painel e ERP em geral; aqui as definições próprias do OEE.
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir quando tirar da planilha um cálculo que já existe; aqui o que precisa estar escrito antes de levar o OEE para o sistema.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Detalha como tratar o mesmo evento recebido duas vezes; aqui o caso do contador de peças.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Detalha datas, instantes e cortes de período; aqui o corte do turno e a ordem que atravessa a troca de turno.
  - path: https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/
    reason: Detalha gravação local e sincronização; aqui o apontamento feito sem rede no chão de fábrica.
  - path: https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/
    reason: Trata contagem e ajuste de estoque; aqui o refugo só entra como quantidade não boa no OEE.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo de um registro de auditoria em geral; aqui o que a correção de uma parada precisa registrar.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Define perfis e regras de acesso em geral; aqui quem pode reclassificar parada e até quando.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com turnos e apontamentos fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a planilha de OEE de uma linha em definições escritas e critérios de aceite.
claims_and_sources:
  - classification: FATO
    claim: 'A ISO 22400-2:2014 (Automation systems and integration — Key performance indicators (KPIs) for manufacturing operations management — Part 2: Definitions and descriptions), publicada em janeiro de 2014, especifica um número selecionado de KPIs em uso corrente, apresentados com fórmula e elementos, comportamento no tempo, unidade e outras características; para equipamentos, os KPIs se referem a unidades de trabalho conforme a IEC 62264. A página registra a emenda Amd 1:2017 (KPIs de gestão de energia) e o status "a ser revisada"; a ISO/DIS 22400-2, edição 2, está em desenvolvimento e substituirá a de 2014.'
    reference: https://www.iso.org/standard/54497.html
    entity: ISO, página da norma ISO 22400-2:2014; página da ISO/DIS 22400-2 em https://www.iso.org/standard/87563.html
    source_date: '2014-01'
    checked_at: '2026-11-13T14:52:00Z'
    limit: 'O texto da norma não é público e não foi lido; nenhuma cláusula, fórmula ou definição de elemento de tempo é reproduzida ou atribuída à norma. A página da ISO não menciona OEE no resumo.'
  - classification: FATO
    claim: 'O sumário da ISO 22400-2:2014-01 (E), publicado pelo DIN, lista as seções 5.1 Time elements, 5.2 Time model for work units, 5.3 Time model for production order, 5.4 Time model for personnel, 6 Description of KPIs e o Anexo B (informativo) Alternative OEE calculation based on loss time model.'
    reference: https://www.din.de/de/mitwirken/normenausschuesse/nam/veroeffentlichungen/wdc-beuth:din21:199599223/toc-2093186/download
    entity: DIN, sumário (table of contents) da ISO 22400-2:2014-01
    source_date: '2014-01'
    checked_at: '2026-11-13T14:56:00Z'
    limit: 'Só o sumário foi lido; o conteúdo das seções e do anexo não foi lido e não é descrito além dos títulos.'
  - classification: FATO
    claim: 'Segundo Kang, Zhao, Li e Horst (International Journal of Production Research, 2016), um conjunto de 34 KPIs foi introduzido na ISO 22400.'
    reference: https://www.nist.gov/node/1298431
    entity: NIST, página da publicação "A Hierarchical Structure of Key Performance Indicators for Operation Improvement in Production Systems" (Kang, N.; Zhao, C.; Li, J.; Horst, J. A.), IJPR 54(21), DOI 10.1080/00207543.2015.1136082
    source_date: '2016-10-03'
    checked_at: '2026-11-13T14:58:00Z'
    limit: Lido o resumo na página do NIST; o artigo completo não foi lido.
  - classification: FATO
    claim: 'Bengtsson, Andersson e Ekström (SPS2020, IOS Press) registram que o OEE foi introduzido por Nakajima (Introduction to TPM, 1988) como medida de desempenho dentro da manutenção produtiva total (TPM), calculada pela multiplicação de disponibilidade, performance e qualidade; que Nakajima apresenta como condições ideais disponibilidade acima de 90%, performance acima de 95% e qualidade acima de 99%, o que dá cerca de 85%, nível comumente chamado de classe mundial (atribuição a Jonsson e Lesshammar, 1999); que não há definição única aceita de OEE, porque as empresas definem de formas diferentes o que conta como perda; que o OEE em geral não é bom indicador para comparar empresas ou mesmo máquinas; que a coleta manual, de baixo custo, tem baixa exatidão (afirmação que o artigo apoia em Muchiri e Pintelon, 2008); e tratam como equívoco a ideia de que um sistema automático resolve sozinho a confiança no dado.'
    reference: https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141
    entity: 'Bengtsson, M.; Andersson, L.-G.; Ekström, P. "Misconceptions Within the Use of Overall Equipment Effectiveness – A Theoretical Discussion in Industrial Examples", SPS2020, IOS Press, pp. 36–47, DOI 10.3233/ATDE200141'
    source_date: '2020'
    checked_at: '2026-11-13T15:02:00Z'
    limit: 'Artigo de discussão teórica em anais revisados; as frases "ouvidas na indústria" do artigo são ilustrativas. O livro de Nakajima (1988) não foi lido; a origem é citada pelo que este artigo registra.'
  - classification: FATO
    claim: 'Muchiri e Pintelon (International Journal of Production Research, 2008) apresentam o OEE como ferramenta que acompanha diferentes tipos de perdas de produção e indica onde melhorar, analisam duas aplicações industriais e as lacunas entre teoria e prática, e propõem uma estrutura de classificação e medição de perdas adaptável às necessidades de cada fabricante.'
    reference: https://doi.org/10.1080/00207540601142645
    entity: 'Muchiri, P.; Pintelon, L. "Performance measurement using overall equipment effectiveness (OEE): literature review and practical application discussion", IJPR 46(13), 3517–3535, 2008'
    source_date: '2008-07'
    checked_at: '2026-11-13T14:55:00Z'
    limit: 'Lidos os metadados e o resumo (registro bibliográfico e página do resumo); o texto completo não abriu nesta sessão.'
  - classification: FATO
    claim: 'Tambare et al. (Sensors, 2022) apresentam OEE = disponibilidade × performance × qualidade, com disponibilidade como tempo disponível real sobre tempo disponível planejado, performance como tempo efetivo de operação sobre tempo disponível real e qualidade como quantidade boa sobre quantidade total; descrevem as seis grandes perdas da TPM (quebras, setup, ociosidade e pequenas paradas, velocidade reduzida, defeito e retrabalho, perdas de partida) e registram que a performance capta a perda por ritmo menor, ociosidade e pequenas paradas.'
    reference: https://www.mdpi.com/1424-8220/22/1/224
    entity: 'Tambare, P.; Meshram, C.; Lee, C.-C.; Ramteke, R. J.; Imoize, A. L. "Performance Measurement System and Quality Management in Data-Driven Industry 4.0: A Review", Sensors 22(1), 224, 29/12/2021'
    source_date: '2021-12-29'
    checked_at: '2026-11-13T15:00:00Z'
    limit: Artigo de revisão; a formulação é uma das usuais, não a definição normativa.
  - classification: FATO
    claim: 'A ISA descreve o ISA-95 (também conhecido como ANSI/ISA-95 ou IEC 62264) como conjunto de normas para integrar sistemas de negócio e logística aos sistemas de controle de manufatura, com modelo de níveis 0 a 4, tratando principalmente da interface entre o nível 3 (gestão de operações de manufatura, como MES) e o nível 4 (planejamento do negócio e logística, como ERP).'
    reference: https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
    entity: International Society of Automation, página do ISA-95
    source_date: null
    checked_at: '2026-11-13T15:04:00Z'
    limit: Página institucional sem data; o texto das normas não foi lido.
  - classification: HIPÓTESE
    claim: 'A Metalúrgica Exemplo Ltda., a prensa P-07, o turno A, os minutos de cada parada, o ciclo ideal de 30 s, o ciclo de roteiro de 33 s, as quantidades produzidas, refugadas e retrabalhadas, os produtos A e B, o turno B e as três definições do mesmo turno são modelo editorial fictício; as regras escolhidas no exemplo (setup e microparada como perda, retrabalho fora da peça boa, refeição e preventiva fora do tempo planejado, limite de microparada de 2 minutos) são proposta de modelagem e recomendação da Torno, não definição normativa nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno
    limit: Não representam cliente, sistema entregue, medição real, meta, benchmark nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 13 minutos.*

**Antes de colocar o OEE no sistema, escreva e aprove cinco definições: qual é o tempo planejado de cada máquina em cada turno, quais paradas são planejadas e quais são perda, qual é o ciclo ideal de cada produto em cada máquina, o que conta como peça boa e de onde vem cada dado (apontamento do operador ou sinal da máquina).** Depois, prove o cálculo com turnos fictícios de resultado conhecido, conferidos minuto a minuto, antes de usar o número para metas, prioridades de manutenção ou comparação entre linhas. Sem isso, o sistema calcula rápido um número que cada área lê de um jeito.

**Este artigo não recomenda MES, ERP, sensor nem fornecedor.** Empresa, máquinas, minutos e peças do exemplo são inventados. A ISO 22400-2 aparece só pelo que a página pública e o sumário mostram, porque o texto da norma não é público.

## O que o OEE mede e por que o mesmo turno dá números diferentes

O OEE (*overall equipment effectiveness*, eficiência global do equipamento) multiplica três fatores: **disponibilidade** (quanto do tempo planejado a máquina ficou operando), **performance** (quanto ela produziu no tempo em que operou, comparado ao ciclo ideal) e **qualidade** (quanto do que saiu foi peça boa). Uma formulação usual, registrada num artigo de revisão de 2022, é [disponibilidade × performance × qualidade](https://www.mdpi.com/1424-8220/22/1/224), com cada fator definido como uma razão entre tempos ou quantidades.

A medida nasceu dentro da manutenção produtiva total (TPM). Um artigo de 2020 sobre equívocos no uso do OEE registra que ela [foi introduzida por Nakajima, em 1988, como medida de desempenho da TPM](https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141), e acrescenta dois pontos que interessam a quem vai automatizar o cálculo: **não há uma definição única aceita**, porque as empresas decidem de formas diferentes o que conta como perda, e por isso o OEE **em geral não serve para comparar empresas, nem mesmo máquinas**. A revisão de Muchiri e Pintelon, publicada em 2008 no *International Journal of Production Research*, chega a uma conclusão parecida por outro caminho: ao comparar aplicações industriais, aponta [lacunas entre a teoria e a prática](https://doi.org/10.1080/00207540601142645) e propõe uma classificação de perdas que cada fabricante adapta à sua realidade.

O resultado prático: com os mesmos minutos e as mesmas peças, três regras diferentes dão três OEEs. A figura abaixo mostra um turno fictício calculado de três jeitos.

![Ilustração de um manômetro de 0 a 100% com três ponteiros para o mesmo turno fictício da prensa P-07 da Metalúrgica Exemplo Ltda., turno A de 480 minutos, 600 peças, 24 refugadas e 12 retrabalhadas. Ponteiro A, regra combinada: 65,6%. Ponteiro B: 81,2%. Ponteiro C: 62,7%. Abaixo, uma tabela com o que muda entre as três regras. Tempo planejado: A 430 minutos, B 390 minutos, C 450 minutos. Preventiva de 20 minutos: A e B fora do tempo planejado, C conta como perda. Setup de 40 minutos: A e C contam como perda, B fora do tempo planejado. Ciclo de referência: A e C usam o ciclo ideal de 30 segundos, B usa o ciclo do roteiro, de 33 segundos. Retrabalho de 12 peças: A e C não contam como peça boa, B conta. Disponibilidade: A 81,4%, B 89,7%, C 77,8%. Performance: A 85,7%, B 94,3%, C 85,7%. Qualidade: A 94,0%, B 96,0%, C 94,0%. OEE: A 65,6%, B 81,2%, C 62,7%. Nota: mesmos minutos e mesmas peças; muda só a regra; refeição de 30 minutos fora do tempo planejado nas três. Exemplo fictício.](./torno-oee-manometro-tres-regras.svg)

*Exemplo fictício: empresa, máquina, minutos, peças e regras inventados; o turno é o mesmo, e a diferença de 18,5 pontos entre B e C vem só das definições. Ilustração original Torno, 2026.*

A regra B deixa o setup fora do tempo planejado, mede a performance contra o ciclo do roteiro, mais lento que o ideal, e conta o retrabalho como peça boa; as três escolhas sobem o número. O problema aparece quando a engenharia acha que o painel usa a regra A, a diretoria compara a linha com outra que usa a B e ninguém sabe qual está no sistema.

### Norma, convenção e decisão da empresa

Ajuda separar três camadas na conversa:

- **Definição normativa.** A ISO 22400-2, de janeiro de 2014, [especifica um conjunto de indicadores de gestão de operações de manufatura](https://www.iso.org/standard/54497.html), cada um com fórmula, elementos, comportamento no tempo e unidade, e relaciona os indicadores de equipamento às unidades de trabalho da IEC 62264. Um artigo de 2016 contabiliza [34 indicadores na ISO 22400](https://www.nist.gov/node/1298431). O [sumário publicado pelo DIN](https://www.din.de/de/mitwirken/normenausschuesse/nam/veroeffentlichungen/wdc-beuth:din21:199599223/toc-2093186/download) mostra seções de elementos de tempo e modelos de tempo para unidade de trabalho, ordem de produção e pessoal, e um anexo informativo com um *cálculo alternativo de OEE baseado num modelo de tempo de perdas*. Não lemos o texto, que é pago, e não reproduzimos fórmulas dele. A própria ISO indica que a parte 2 [está em revisão](https://www.iso.org/standard/87563.html). Se a empresa decidir seguir a norma, alguém compra o texto e confere as definições contra o sistema.
- **Convenção de mercado.** A fórmula de três fatores, as "seis grandes perdas" da TPM e o famoso 85% de "classe mundial" (ver as perguntas frequentes) vêm da literatura e da prática, não de uma norma obrigatória. Pelo sumário, a ISO 22400-2 também traz um cálculo de OEE, no Anexo B, informativo; como não lemos o texto, não dizemos como ele se compara à fórmula usual.
- **Decisão da empresa.** Calendário, lista de motivos, se setup é perda, qual ciclo vale, o que é peça boa. Essa camada decide o número, e é ela que precisa estar escrita antes de alguém programar.

Duas fronteiras com outros textos do blog: como obter o sinal da máquina e o que ele significa está em [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/); aqui o dado já chega e o assunto é a conta. E se o problema é um painel que mostra um número e o ERP outro, por período, filtro ou atraso, o roteiro geral está em [dashboard e ERP com números diferentes](https://tornostudio.com/blog/dashboard-erp-numeros-divergentes-aceite/).

## Tempo planejado: o calendário de cada máquina

A disponibilidade divide o tempo em que a máquina operou pelo **tempo planejado**. Tudo o que fica fora do tempo planejado não aparece como perda, e por isso essa definição pesa mais do que parece.

Escreva, por máquina ou célula:

- **Turnos e horários**, inclusive a troca de turno e o turno que passa da meia-noite. Em que dia cai a produção das 22:00 às 06:00 é uma decisão de corte; o raciocínio geral está em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Refeição e pausas.** Se a máquina para na refeição, o intervalo sai do tempo planejado. Se há revezamento e ela continua rodando, o intervalo fica dentro.
- **Dias sem programação**: feriados, fins de semana, falta de demanda. A máquina sem ordem programada pode ficar fora do tempo planejado, mas alguém precisa dizer, no calendário, que ela não estava programada, e não descobrir isso depois pelo número baixo.
- **Manutenção preventiva programada.** Fica fora (é planejada) ou dentro (é perda a reduzir)? As duas leituras existem; o exemplo deste artigo deixa a preventiva fora do tempo planejado e mostra no relatório os minutos dela à parte.
- **Quem mantém o calendário**: a hora extra de sábado precisa estar cadastrada antes do turno.

## Paradas planejadas e não planejadas: a lista de motivos

O apontamento de produção vale o que vale a lista de motivos. Peça uma lista fechada, curta o bastante para o operador escolher em segundos, com três atributos por motivo:

1. **Categoria de perda**: planejada (fora do tempo planejado), parada (desconta da disponibilidade), velocidade ou microparada (desconta da performance).
2. **Área responsável**, como manutenção, PCP, qualidade, logística ou ferramentaria, para que o relatório de perdas vá para quem age.
3. **Se exige comentário**, por exemplo "outros".

Três decisões costumam ficar sem dono:

- **Setup.** A TPM trata o setup como uma das [seis grandes perdas](https://www.mdpi.com/1424-8220/22/1/224). Muitas empresas, porém, o colocam como parada planejada porque a troca é programada. Se ficar como planejado, o OEE não mostra o ganho de uma troca rápida; o artigo de 2020 lembra também que [aumentar o lote para reduzir setup pode subir o OEE](https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141), o que não é necessariamente bom para a fábrica. A recomendação da Torno é tratar setup como perda e mostrar os minutos de setup separados, para a decisão de lote continuar visível.
- **Falta de material, de operador ou de ordem.** A máquina estava pronta e parou por causa de fora. Fica como perda de disponibilidade, com a área de origem, ou sai do tempo planejado? Se sair, o OEE da máquina fica bonito e o problema some do relatório.
- **Parada sem motivo.** O sinal da máquina mostra que ela parou, mas ninguém apontou o motivo. O sistema não pode escolher um motivo sozinho. Ela entra como "sem motivo", conta como perda não planejada e vai para uma lista de pendências do líder do turno, com prazo para classificar.

## Ciclo ideal por produto e máquina

A performance compara o que foi produzido com o que a máquina produziria no ciclo ideal, no tempo em que operou. O **ciclo ideal** é, portanto, a régua do fator.

- **Por produto e por máquina.** A mesma peça tem ciclos diferentes em prensas diferentes; produtos diferentes têm ciclos diferentes na mesma prensa. Num turno com dois produtos, a conta soma peças × ciclo de cada produto. Usar um ciclo médio, ou o do primeiro produto da ordem, distorce o número.
- **Ideal ou padrão do roteiro.** O ciclo do roteiro costuma ter folga para custeio e programação; usado como régua, ele esconde a perda de velocidade. O artigo de 2020 cita a [manipulação de tempos de ciclo](https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141) entre os jeitos de distorcer o OEE. Combine qual é o ciclo de referência, de onde ele vem (capacidade nominal do fabricante, melhor ciclo sustentado, ensaio) e quem o aprova.
- **Performance acima de 100%.** É sinal de régua errada (ciclo cadastrado mais lento que o real) ou de contagem errada. O sistema avisa o dono do cadastro, sem cortar em 100% em silêncio.
- **Produto sem ciclo cadastrado.** O cálculo daquele trecho fica pendente e aparece como pendente. Usar um valor padrão produz um número falso que ninguém percebe.
- **Mudança de ciclo.** Quando a engenharia altera um ciclo ideal, a mudança vale da data em diante, e os turnos antigos não são recalculados sem decisão explícita, para a série histórica continuar comparável.

## Microparadas e velocidade reduzida

As seis grandes perdas incluem as **pequenas paradas** e a **velocidade reduzida**, que a formulação usual coloca na performance: o fator [capta a perda por ritmo menor, ociosidade e pequenas paradas](https://www.mdpi.com/1424-8220/22/1/224). Na prática, uma prensa que para 40 vezes por 20 a 30 segundos para desenroscar uma tira não gera nenhum apontamento, e a perda aparece só como performance baixa, sem motivo.

Defina:

- **O limite de microparada**, por exemplo 2 minutos (valor do exemplo). Abaixo dele, a parada não pede motivo ao operador e entra na performance; acima, vira parada com motivo e desconta da disponibilidade.
- **Como a microparada é medida.** No apontamento manual, ela não existe. Com sinal da máquina, ela pode ser contada e somada, e o relatório mostra quantas foram e quantos minutos somaram.
- **O que o relatório mostra.** Para o mesmo ciclo ideal, mudar o limite não muda o OEE final: só desloca minutos entre disponibilidade e performance. Esse comportamento é um bom teste de que a conta está fechada.

## Refugo, retrabalho e peça boa

A qualidade divide as peças boas pelo total produzido. Falta definir o que é "boa":

- **Peça boa de primeira.** O retrabalho conta como boa ou não? Contar retrabalho como boa sobe a qualidade e esconde o custo do retrabalho. A recomendação da Torno é medir a qualidade como peça boa de primeira e mostrar o retrabalho separado.
- **Peças de ajuste e de partida.** As peças descartadas depois de um setup são refugo daquele turno ou ficam numa categoria de partida? Elas estão entre as seis grandes perdas.
- **Quem declara o refugo e quando.** O operador aponta na hora? A qualidade reprova no fim do lote ou no dia seguinte? Se a reprovação chega depois do fechamento do turno, o sistema precisa atribuí-la ao turno e à ordem de origem, e o OEE daquele turno muda. Combine se e até quando isso acontece.
- **Unidade.** Contagem da máquina e apontamento da qualidade na mesma unidade (peças, quilos, golpes), ou com conversão cadastrada.

O refugo apontado costuma também baixar material do estoque; a conferência do saldo é outro assunto, tratado em [inventário de estoque no sistema](https://tornostudio.com/blog/inventario-contagem-estoque-sistema-aceite/). Aqui ele só entra como quantidade não boa.

## De onde vem o dado: apontamento manual ou sinal de máquina

Cada dado do OEE tem uma origem, e a origem define o que dá para confiar:

| Dado | Apontamento do operador | Sinal da máquina |
|---|---|---|
| Início e fim de parada | Arredondado, às vezes lançado no fim do turno | Preciso, se o sinal de "parada" estiver definido |
| Motivo da parada | Sim, se a lista for boa | Não; a máquina sabe que parou, não por quê |
| Microparadas | Não aparecem | Aparecem |
| Peças produzidas | Contagem manual ou por embalagem | Contador, que pode zerar ou contar golpe sem peça |
| Peça boa e refugo | Operador e qualidade | Só com inspeção automática |

O artigo de 2020, citando Muchiri e Pintelon, resume os dois lados: a [coleta manual tem custo baixo e exatidão baixa](https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141), e achar que um sistema automático resolve sozinho a confiança no dado também é um equívoco. Na maior parte das fábricas, o desenho que funciona combina os dois: a máquina marca quando parou e quantos ciclos fez; a pessoa diz por quê e quantas peças foram boas.

Escreva qual origem prevalece em cada dado e o que acontece quando elas discordam (o contador diz 612 ciclos, o operador apontou 600 peças). Três casos merecem cenário de teste:

- **Contador que zera** ao reiniciar o controlador ou leitura repetida após queda de rede. Como levantar esse comportamento no equipamento está em [dados da máquina no ERP](https://tornostudio.com/blog/dados-maquina-erp-integracao-opc-ua/); o tratamento de eventos repetidos, em [evento duplicado na integração](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).
- **Apontamento sem rede.** Se o tablet da célula grava localmente e sincroniza depois, o horário da parada é o do apontamento, não o da sincronização; o desenho geral está em [sistema sem internet](https://tornostudio.com/blog/sistema-sem-internet-dados-sincronizacao/).
- **Onde o cálculo mora.** No modelo ISA-95 (IEC 62264), a [gestão de operações de manufatura, onde fica o MES, é o nível 3, e o ERP, o nível 4](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard). É comum o OEE ser calculado perto do chão de fábrica e o ERP receber o resultado ou os totais. Seja qual for o arranjo, combine qual sistema é a fonte do número oficial.

## Granularidade: turno, ordem, máquina e como somar

O OEE pode ser calculado por máquina e turno, por ordem de produção, por linha, por dia ou por mês. Combine:

- **A menor unidade guardada.** Guarde os minutos e as peças por máquina, turno, ordem e produto, e calcule os níveis acima a partir deles.
- **Como somar.** O OEE de dois turnos não é a média dos dois percentuais. Some os tempos e as peças e refaça a conta, o que equivale a pesar cada turno pelo tempo planejado. No exemplo abaixo, a média simples fica quase cinco pontos abaixo da conta certa.
- **Ordem que atravessa a troca de turno.** Os minutos e as peças se dividem pelo horário em que aconteceram; a soma dos dois turnos bate com o total da ordem.
- **Arredondamento.** Calcule a partir dos minutos e das peças e arredonde só na exibição. Multiplicar três percentuais já arredondados pode diferir da conta exata em um décimo.

## Correções depois do fechamento

Paradas são reclassificadas: o líder descobre que a "falta de material" era um problema de ferramenta, a qualidade reprova um lote no dia seguinte. Combine quem pode corrigir, até quando e o que o sistema registra. Perfis em geral se definem como em [permissões de acesso no software](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/); aqui, por exemplo, o líder corrige até o fim do turno seguinte e o PCP depois disso, com motivo. A correção recalcula o turno e guarda o valor anterior, quem corrigiu, quando e por quê; o conteúdo de um bom registro está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Combine também o que acontece com um relatório mensal já enviado: ajuste no período seguinte ou reemissão.

## Quem decide cada definição

| Definição | Quem decide |
|---|---|
| Calendário, turnos, pausas e dias sem programação | PCP, com produção |
| Lista de motivos e categoria de cada motivo | Produção, manutenção e PCP; diretoria industrial arbitra |
| Setup, preventiva e falta de material: planejada ou perda | Diretoria industrial |
| Ciclo ideal por produto e máquina | Engenharia de processo |
| Limite de microparada | Engenharia de processo, com produção e automação |
| Peça boa, refugo, retrabalho e peças de partida | Qualidade |
| Origem de cada dado e o que prevalece quando discordam | Produção, automação e TI |
| Granularidade, fechamento, correções e prazos | PCP e controladoria industrial, com TI |
| Sistema que guarda o número oficial | TI, com a diretoria industrial |
| Uso do número em metas e avaliações | Diretoria; com RH, se afetar pessoas |

Se a planilha de OEE de hoje tem fórmulas que só uma pessoa entende, essa tabela é o primeiro passo para levá-la ao sistema; quando faz sentido sair da planilha está em [quando automatizar processos que vivem em planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Metalúrgica Exemplo Ltda. vai calcular o OEE da prensa P-07 no sistema. O turno A vai das 06:00 às 14:00 (480 minutos), com refeição de 30 minutos com a máquina parada e preventiva programada de 20 minutos; as duas ficam fora do tempo planejado, que é de 430 minutos. No turno de teste houve setup de 40 minutos, quebra de 25 minutos e falta de material de 15 minutos, todos contados como perda: 350 minutos operando. O ciclo ideal do produto A na P-07 é de 30 segundos (0,5 minuto). Saíram 600 peças: 24 refugadas e 12 retrabalhadas, logo 564 boas de primeira. Microparadas abaixo de 2 minutos somaram 18 minutos e entram na performance.

A conta: disponibilidade 350 ÷ 430 = 81,4%; performance (600 × 0,5) ÷ 350 = 300 ÷ 350 = 85,7%; qualidade 564 ÷ 600 = 94,0%; OEE 81,4% × 85,7% × 94,0% = 65,6%, o mesmo que 564 peças boas × 0,5 minuto ÷ 430 minutos planejados (282 ÷ 430).

![Ilustração de uma ampulheta que mostra como os 480 minutos do turno A da prensa P-07, na empresa fictícia Metalúrgica Exemplo Ltda., viram minutos de peça boa. No alto, 480 minutos de turno, das 06:00 às 14:00. Saem 50 minutos planejados: refeição de 30 minutos e preventiva de 20 minutos. Ficam 430 minutos de tempo planejado. Saem 80 minutos de paradas: setup de 40, quebra de 25 e falta de material de 15. Ficam 350 minutos operando. Saem 50 minutos de microparadas, 18 minutos, e velocidade reduzida, 32 minutos. Ficam 300 minutos em ritmo ideal, que equivalem a 600 peças a 30 segundos. Saem 18 minutos de refugo e retrabalho: 36 peças vezes meio minuto. No fundo da ampulheta, 282 minutos de peça boa, 564 peças. Disponibilidade 350 dividido por 430, 81,4%. Performance 300 dividido por 350, 85,7%. Qualidade 564 dividido por 600, 94,0%. OEE 282 dividido por 430, 65,6%. Exemplo fictício.](./torno-oee-ampulheta-turno.svg)

*Exemplo fictício: empresa, máquina, turno, minutos e peças inventados; cada camada da ampulheta é uma perda que alguém precisa ter definido antes do cálculo. Ilustração original Torno, 2026.*

Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/), com turnos e apontamentos fictícios carregados para cada caso, e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Turno A da P-07 com os dados do exemplo | Tempo planejado 430; operando 350; disponibilidade 81,4%; performance 85,7%; qualidade 94,0%; OEE 65,6% | Relatório do turno com minutos por categoria e motivo, peças e memória de cálculo |
| Mesmo turno, com a definição B carregada só no ambiente de teste | OEE 81,2%, e a tela informa qual definição e qual versão dela foi usada | Relatório com a versão da regra |
| Revezamento cadastrado na refeição e máquina rodando no intervalo | Os 30 minutos entram no tempo planejado e as peças contam | Calendário e relatório do turno |
| Parada de 12 minutos sem motivo ao fim do turno | Aparece como "sem motivo", conta como perda não planejada e entra na lista de pendências do líder | Lista de pendências e relatório |
| Os 18 minutos de microparadas reclassificados como paradas com motivo | Disponibilidade 77,2% (332 ÷ 430), performance 90,4% (300 ÷ 332) e o OEE continua 65,6% | Os dois relatórios lado a lado |
| Turno com 400 peças do produto A (30 s) e 150 do produto B (48 s), 350 minutos operando | Performance (200 + 120) ÷ 350 = 91,4%, e não 78,6%, que seria usar 30 s para tudo | Memória de cálculo por produto |
| Produto C sem ciclo ideal cadastrado | O trecho fica pendente e aparece como pendente; nenhum valor padrão é usado | Tela e lista de pendências |
| Ciclo ideal cadastrado de 45 s para um produto que roda a 30 s | Performance acima de 100% gera aviso ao dono do cadastro, sem corte silencioso em 100% | Aviso registrado |
| 12 peças retrabalhadas | Não entram como boas; o relatório mostra o retrabalho separado | Relatório de qualidade do turno |
| Lote do turno A reprovado pela qualidade no dia seguinte | O refugo é atribuído ao turno A e à ordem de origem, e o OEE do turno é recalculado dentro do prazo combinado | Valor antes e depois e registro da correção |
| Contador da P-07 zera ao reiniciar o controlador no meio do turno | Nenhuma peça é perdida nem contada duas vezes | Leituras brutas e total do turno |
| Ordem iniciada às 12:00 e encerrada às 16:00 | Minutos e peças divididos às 14:00 entre turnos A e B; a soma bate com a ordem | Relatório por turno e por ordem |
| Dia com turno A (430 min, OEE 65,6%) e turno B (200 min planejados, 80 min de peça boa, OEE 40,0%) | OEE do dia (282 + 80) ÷ 630 = 57,5%, e não a média simples de 52,8% | Relatório diário com a memória |
| Líder reclassifica a quebra como falta de ferramenta após o fechamento | Recalcula o turno; registra valor anterior, quem, quando e motivo; operador não consegue fazer a mesma correção | Registro da correção e tentativa negada |
| Tablet da célula sem rede por 40 minutos, com duas paradas apontadas | Depois da sincronização, as paradas ficam com o horário em que foram apontadas | Registro com horário do apontamento e da sincronização |
| Painel da fábrica e relatório do ERP para o turno A | Mesmo OEE, ou a diferença explicada pela regra de atualização combinada | Os dois números com horário da consulta |

*Fim do exemplo fictício. Empresa, máquina, minutos, peças, ciclos, regras e critérios são modelo editorial, sem medição real, cliente ou sistema entregue; as definições do exemplo são escolhas da empresa fictícia, não norma.*

## Perguntas frequentes

### Um OEE de 85% é o que devemos buscar?

O 85% vem das condições ideais que Nakajima apresentou (disponibilidade acima de 90%, performance acima de 95% e qualidade acima de 99%), cujo produto dá cerca de 85%, nível que passou a ser [chamado de classe mundial](https://ebooks.iospress.nl/pdf/doi/10.3233/ATDE200141). É uma referência popular, não uma norma, e o mesmo artigo trata a busca por esse número como um dos equívocos comuns. Como as definições mudam o número em vários pontos, a meta útil é a da própria máquina, com a regra fixa, ao longo do tempo.

### Dá para comparar o OEE entre fábricas ou entre linhas?

Só se as definições forem as mesmas e estiverem escritas, o que raramente acontece entre empresas. Dentro da empresa, compare máquinas com a mesma regra e olhe os três fatores e os minutos por motivo, não só o percentual final.

Para transformar a planilha de OEE de uma linha em definições escritas e critérios de aceite, leve à [conversa de diagnóstico](https://tornostudio.com/diagnostico/) a planilha ou o relatório que vocês usam hoje, a lista de motivos de parada e um turno real com os minutos anotados, sem dados confidenciais de clientes.

*Fontes consultadas em 13 de novembro de 2026: ISO, páginas da ISO 22400-2:2014 e da ISO/DIS 22400-2; sumário da ISO 22400-2:2014 publicado pelo DIN; Kang, Zhao, Li e Horst (IJPR, 2016), na página do NIST; Bengtsson, Andersson e Ekström, "Misconceptions Within the Use of Overall Equipment Effectiveness" (SPS2020, IOS Press); Muchiri e Pintelon (IJPR, 2008), resumo; Tambare e outros (Sensors, 2022); ISA, página do ISA-95. Empresa, máquina, números e ilustrações são fictícios.*
