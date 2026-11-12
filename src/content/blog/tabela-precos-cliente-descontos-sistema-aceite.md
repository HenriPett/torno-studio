---
content_id: torno-artigo-pt-20261112-tabela-precos-descontos
intent_id: buyer-price-lists-discount-rules-acceptance-pt
locale: pt-BR
type: artigo
status: review
working_title: 'Tabela de preços por cliente no sistema: regras de desconto e o que testar no aceite'
h1: 'Tabela de preços por cliente no sistema: regras de desconto e o que testar no aceite'
seo_title: 'Tabela de preços por cliente no sistema e descontos | Torno'
seo_description: 'Precedência entre tabela, faixa, promoção e desconto manual, limite por vendedor, preço por pagamento, vigência e preço gravado no pedido: o que testar.'
summary: 'Roteiro para quem contrata ou mantém um sistema de vendas com tabela de preços por cliente e regras de desconto: o que definir e testar antes do aceite — ordem de aplicação e precedência entre tabela geral, tabela do cliente, faixa por quantidade, promoção com vigência e desconto manual; acumulação ou não de descontos; limite de desconto por perfil e aprovação; preço diferenciado por forma ou prazo de pagamento (Lei 13.455/2017); vigência, versão e histórico da tabela; preço gravado no pedido versus reajuste posterior; arredondamento; e, quando houver venda ao consumidor, a informação de preço exigida pela Lei 10.962/2004, pelo Decreto 5.903/2006 e pelo CDC, com critérios de aceite sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar um sistema de vendas com tabela de preços por cliente e regras de desconto, para que cada pedido saia com o preço certo, explicável e estável depois de gravado?
proposed_path: /blog/tabela-precos-cliente-descontos-sistema-aceite/
canonical_url: https://tornostudio.com/blog/tabela-precos-cliente-descontos-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores comerciais e financeiros de distribuidoras, indústrias e atacados que contratam ou mantêm sistema de vendas, ERP próprio, força de vendas ou portal B2B sob medida com preço por cliente, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de colocar a formação de preço em uso ou antes de mudar as regras de preço e desconto de um sistema em uso.
scope: Vocabulário das camadas de preço; ordem de aplicação e precedência entre tabela geral, tabela do cliente ou grupo, faixa por quantidade, promoção com vigência, desconto manual e desconto no total; acumulação em cascata ou soma; limite de desconto por perfil, sobre o quê ele é medido e aprovação; preço por forma ou prazo de pagamento e a Lei 13.455/2017; vigência, versão e histórico de tabela; preço gravado no pedido versus reajuste posterior, orçamento com validade, pedido editado e faturamento parcial; etapa de arredondamento; informação de preço ao consumidor quando houver venda B2C (Lei 10.962/2004, Decreto 5.903/2006 e CDC); critérios de aceite com dados fictícios.
not_scope: Política comercial, definição de preços, margens ou percentuais; parecer jurídico, tributário ou concorrencial; cálculo de impostos na nota fiscal; regras de comissão (cobertas em outro artigo); fluxo de aprovação genérico (coberto em outro artigo); regras de arredondamento em geral (cobertas em outro artigo); emissão de documento em PDF (coberta em outro artigo); recomendação ou comparação de ERP, sistema ou fornecedor.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-12T11:23:18Z'
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
  - path: https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/
    reason: Detalha a comissão calculada sobre o valor do pedido; aqui o foco é como esse valor é formado.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Detalha precisão, regra de empate e etapa do arredondamento; aqui ele aparece só como a última camada do preço.
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Detalha estados, devolução e alteração de dados de um fluxo de aprovação; aqui só o gatilho do desconto acima do limite.
  - path: https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/
    reason: Trata o que acontece quando quem aprova o desconto está ausente.
  - path: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
    reason: Trata a emissão do orçamento ou da proposta em PDF, que congela o preço impresso; aqui o preço é formado.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir quem pode editar tabela, promoção e limites de desconto.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o registro de quem mudou uma tabela ou concedeu um desconto.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Ajuda a definir em que fuso e em que instante começa e termina a vigência de tabela e promoção.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Trata a carga de tabela de preços por planilha e seus erros.
  - path: https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/
    reason: Trata o retorno do pagamento ao pedido, necessário quando o preço depende da forma de pagamento.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com clientes, tabelas e promoções fictícios.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a política comercial em regras de preço e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'O art. 1º da Lei nº 13.455/2017 autoriza a diferenciação de preços de bens e serviços oferecidos ao público em função do prazo ou do instrumento de pagamento utilizado; o parágrafo único torna nula a cláusula contratual, em arranjos de pagamento ou outros acordos para prestação de serviço de pagamento, que proíba ou restrinja essa diferenciação; o art. 2º acrescenta o art. 5º-A à Lei nº 10.962/2004.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2017/lei-13455-26-junho-2017-785093-publicacaooriginal-153193-pl.html
    entity: Câmara dos Deputados (Legislação Informatizada), Lei nº 13.455, de 26 de junho de 2017, publicação original
    source_date: '2017-06-26'
    checked_at: '2026-11-12T11:00:00Z'
    limit: 'A página do Planalto (l13455.htm) recusou o acesso automatizado; texto lido no espelho da Câmara. Não é parecer jurídico.'
  - classification: FATO
    claim: 'Na Lei nº 10.962/2004, versão atualizada, o art. 2º, III (redação da Lei 13.543/2017), pede no comércio eletrônico a divulgação ostensiva do preço à vista junto à imagem do produto ou à descrição do serviço; o art. 5º manda o consumidor pagar o menor preço quando houver divergência entre os sistemas de informação de preço do estabelecimento; o art. 5º-A (incluído pela Lei 13.455/2017) obriga informar, em local e formato visíveis, os descontos oferecidos em função do prazo ou do instrumento de pagamento, com as sanções do CDC.'
    reference: https://www2.camara.leg.br/legin/fed/lei/2004/lei-10962-11-outubro-2004-534307-normaatualizada-pl.html
    entity: Câmara dos Deputados (Legislação Informatizada), Lei nº 10.962, de 11 de outubro de 2004, norma atualizada
    source_date: '2004-10-11'
    checked_at: '2026-11-12T11:05:00Z'
    limit: Texto lido no espelho da Câmara; trata da oferta e afixação de preços ao consumidor, não de venda entre empresas. Não é parecer jurídico.
  - classification: FATO
    claim: 'O Decreto nº 5.903/2006 exige informação de preço correta, clara, precisa, ostensiva e legível (art. 2º); preço à vista discriminado e, no parcelamento ou financiamento, valor total, número, periodicidade e valor das prestações, juros e acréscimos (art. 3º); considera infração informar preços apenas em parcelas, obrigando o consumidor ao cálculo do total (art. 9º, IV), e atribuir preços distintos para o mesmo item (art. 9º, VII); o parágrafo único do art. 10, incluído pelo Decreto 7.962/2013, aplica os arts. 2º, 3º e 9º às contratações no comércio eletrônico.'
    reference: https://www2.camara.leg.br/legin/fed/decret/2006/decreto-5903-20-setembro-2006-545543-normaatualizada-pe.html
    entity: Câmara dos Deputados (Legislação Informatizada), Decreto nº 5.903, de 20 de setembro de 2006, norma atualizada
    source_date: '2006-09-20'
    checked_at: '2026-11-12T11:05:00Z'
    limit: Texto lido no espelho da Câmara; o Decreto 7.962/2013 não foi aberto, só a indicação de inclusão na página. Não é parecer jurídico.
  - classification: FATO
    claim: 'No CDC (Lei nº 8.078/1990), a informação ou publicidade suficientemente precisa obriga o fornecedor e integra o contrato que vier a ser celebrado (art. 30); a oferta deve trazer informações corretas, claras, precisas e ostensivas, entre outras sobre preço (art. 31); se o fornecedor recusar cumprir a oferta, o consumidor pode exigir o cumprimento nos termos anunciados, aceitar outro produto equivalente ou rescindir o contrato (art. 35).'
    reference: https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html
    entity: Câmara dos Deputados (Legislação Informatizada), Lei nº 8.078, de 11 de setembro de 1990, norma atualizada
    source_date: '1990-09-11'
    checked_at: '2026-11-12T11:10:00Z'
    limit: Texto lido no espelho da Câmara; aplica-se a relações de consumo. Não é parecer jurídico.
  - classification: FATO
    claim: 'A documentação para desenvolvedores do Microsoft Dynamics 365 Business Central descreve o melhor preço como o menor preço permitido com o maior desconto de linha permitido numa data, define Lowest Price como método padrão e mostra um exemplo de método hierárquico em que o preço específico do cliente tem prioridade sobre os demais, mesmo sendo maior.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-extending-best-price-calculations
    entity: Microsoft Learn, Extending Price Calculations (Business Central), atualizada em 03/04/2023
    source_date: '2023-04-03'
    checked_at: '2026-11-12T11:15:00Z'
    limit: Exemplo de comportamento documentado de um produto, descrito para a onda de lançamentos 1 de 2020; versões posteriores podem diferir. Citado para mostrar que há mais de uma lógica de precedência, não como recomendação.
  - classification: FATO
    claim: 'A documentação do Business Central distingue desconto de linha, dado nas linhas do documento, de desconto de fatura, subtraído do total do documento quando a soma das linhas passa de um mínimo, e descreve preços especiais baseados em quantidade mínima, período e combinação de cliente, item e unidade de medida.'
    reference: https://learn.microsoft.com/en-us/dynamics365/business-central/across-prices-and-discounts
    entity: Microsoft Learn, Set up prices and discounts (Business Central), atualizada em 25/08/2026
    source_date: '2026-08-25'
    checked_at: '2026-11-12T11:15:00Z'
    limit: Documentação de um produto, citada como exemplo de vocabulário; não é recomendação.
  - classification: HIPÓTESE
    claim: 'A Distribuidora Exemplo Ltda., a cliente Mercearia Ponte Alta, o produto Detergente 5 L, as tabelas Geral e Revenda B, as versões, a Promoção da Limpeza, os percentuais de faixa, limite, aprovação e pagamento, o pedido PV-1088, a ordem de aplicação, a regra de não acumulação, o arredondamento e os critérios de aceite são modelo editorial fictício; as regras são proposta de modelagem, não exigência legal, política recomendada nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de política comercial, ferramenta ou fornecedor.
---

*Leitura estimada: 13 minutos.*

**Para aceitar um sistema com tabela de preços por cliente, exija por escrito a ordem em que as regras de preço se aplicam, o que acumula e o que não acumula, e o que acontece com o preço depois que o pedido é gravado.** No aceite, peça para ver isso com dados fictícios: um mesmo item que cai ao mesmo tempo na tabela do cliente, numa faixa por quantidade e numa promoção, com o preço final explicado camada por camada; um desconto acima do limite do vendedor que para o pedido até alguém aprovar; e um pedido antigo que mantém o preço quando a tabela é reajustada.

**Este artigo não define política comercial, não recomenda sistema nem fornecedor e não é parecer jurídico.** Os percentuais e as regras do exemplo são inventados; quanto cobrar e de quem é decisão da empresa, com o jurídico e o contador. As leis citadas são referência para conversar com eles.

## Preço é o resultado de regras, não um campo

Num sistema de vendas simples, o preço é um campo do produto. Numa distribuidora, indústria ou atacado, o preço do mesmo item muda conforme quem compra, quanto compra, quando compra, como paga e quanto o vendedor negociou. Se essas regras não forem escritas, cada uma vai parar num lugar: uma no cadastro do cliente, outra numa planilha, outra na cabeça do vendedor, e o sistema calcula um preço que ninguém consegue explicar.

Antes de discutir telas, dê nome às camadas que existem no seu negócio. As mais comuns:

- **Tabela geral**: o preço de referência de cada item, para quem não tem condição especial.
- **Tabela do cliente ou do grupo**: preço próprio para um cliente, uma rede ou um grupo (revenda, varejo, construtora). É o que se costuma chamar de **tabela de preço diferenciada**.
- **Faixa por quantidade**: preço ou percentual que muda conforme a quantidade da linha ou do pedido.
- **Promoção com vigência**: preço ou desconto válido entre duas datas, para alguns itens, clientes ou canais.
- **Desconto manual**: o que o vendedor concede na negociação, por item ou no pedido.
- **Condição de pagamento**: diferença de preço por forma ou prazo de pagamento.
- **Desconto no total do pedido**: aplicado sobre a soma, e não sobre cada linha.

A documentação de um ERP de mercado ilustra essa separação: o Business Central [distingue desconto de linha e desconto de fatura](https://learn.microsoft.com/en-us/dynamics365/business-central/across-prices-and-discounts), este subtraído do total quando a soma passa de um mínimo, e descreve preços especiais por quantidade mínima, período e combinação de cliente, item e unidade. Não é recomendação de produto; é vocabulário útil para a conversa. O seu sistema pode ter menos camadas ou outras. O que importa é que a lista seja fechada e que cada camada tenha dono.

## Ordem de aplicação e precedência: escreva a pilha

Quando um item cai em mais de uma regra ao mesmo tempo, o sistema precisa saber qual vale. Há duas lógicas comuns, e as duas são legítimas:

- **Hierarquia**: a regra mais específica ganha, mesmo que dê um preço maior. Se o cliente tem tabela própria, a tabela geral nem é consultada.
- **Melhor preço**: o sistema calcula todas as regras aplicáveis e fica com o menor.

A documentação do Business Central mostra as duas: o método padrão [busca o menor preço permitido com o maior desconto de linha permitido numa data](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-extending-best-price-calculations), e a mesma página traz um exemplo de método hierárquico em que o preço do cliente tem prioridade sobre os demais, mesmo que seja maior. Ou seja: nem uma ferramenta pronta decide isso por você. Escolha e escreva.

Escreva a ordem como uma pilha de peneiras: cada camada recebe o preço da anterior e entrega um novo. Para cada camada, responda:

1. **Quando ela se aplica.** Cliente, grupo, item, família, quantidade, canal, data, empresa (num sistema com várias empresas).
2. **Sobre o quê ela incide.** Sobre o preço de tabela, sobre o preço que saiu da camada anterior ou sobre o total do pedido.
3. **O que ela faz.** Substitui o preço por um valor fixo, aplica percentual ou aplica valor em reais.
4. **Com quem ela disputa.** Se duas camadas não acumulam, qual critério decide: a mais específica, a de menor preço ou uma prioridade numerada.
5. **O que acontece em empate.** Duas promoções vigentes para o mesmo item, com o mesmo preço ou com prioridade igual, precisam de critério de desempate, ou o resultado fica imprevisível.

![Ilustração de uma pilha de peneiras com o cálculo do preço do item fictício Detergente 5 L, 60 unidades, para a cliente fictícia Mercearia Ponte Alta em 12/11/2026. Camada 0, tabela geral, R$ 40,00, riscada: só vale se o cliente não tem tabela. Camada 1, tabela do cliente Revenda B versão 3: R$ 36,00. Camada 2, faixa ou promoção: a faixa de 50 unidades ou mais, menos 5%, dá R$ 34,20; a promoção de 10 a 20/11, R$ 35,00, aparece riscada; as duas não acumulam e fica o menor, R$ 34,20. Camada 3, desconto manual de 3%, dentro do limite de 3% do vendedor: R$ 33,174. Camada 4, Pix à vista, menos 2%: R$ 32,51052. Camada 5, arredondamento do unitário em 2 casas: preço gravado no pedido R$ 32,51; 60 unidades vezes R$ 32,51, total R$ 1.950,60; arredondar só o total daria R$ 1.950,63. Rodapé: a ordem é uma escolha escrita, não um padrão. Exemplo fictício.](./torno-precos-pilha-peneiras.svg)

*Exemplo fictício: cliente, produto, tabelas, percentuais e datas inventados; cada camada recebe o preço da anterior, na ordem que a empresa escreveu. Ilustração original Torno Studio, 2026.*

Peça que a ordem seja mostrada na tela do pedido, não só documentada: ao lado de cada item, de onde veio o preço e quais camadas foram aplicadas ou descartadas. Um vendedor que vê "promoção descartada: faixa deu menos" tende a não abrir chamado; um vendedor que só vê "R$ 32,51" abre.

## Acumula ou não acumula: escreva a conta

"Desconto de 5% mais 3%" pode significar duas contas diferentes:

- **Em cascata**: 5% sobre o preço, depois 3% sobre o resultado. Em R$ 36,00, dá R$ 33,174, ou 7,85% no total.
- **Somado**: 8% sobre o preço. Em R$ 36,00, dá R$ 33,12.

A diferença é de R$ 0,054 por unidade no exemplo e, num pedido grande, vira um valor que o financeiro vai encontrar. Escreva, para cada par de camadas: acumula em cascata, acumula somando ou não acumula. Escreva também o que acontece com o desconto no total do pedido: se ele é rateado entre as linhas (e como os centavos do rateio são distribuídos) ou se fica só no rodapé. Isso muda o valor de cada item na nota, no relatório de margem e na base da comissão.

Por falar em comissão: este artigo trata de como o valor do pedido é formado. Sobre qual valor a comissão incide, e o que acontece quando há desconto, está em [comissão de vendedores no sistema](https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/).

## Limite de desconto por perfil e aprovação

O **limite de desconto por vendedor** costuma gerar atrito, porque mexe com a negociação. Antes de configurar números, decida:

- **Sobre o que o limite é medido.** Só sobre o desconto manual? Sobre o desconto total em relação à tabela do cliente? Em relação à tabela geral? Ou sobre um preço mínimo por item, calculado a partir do custo? Cada escolha muda quem pode vender o quê. No exemplo, com faixa por quantidade, 3% de desconto manual e Pix, o preço final fica 9,69% abaixo da tabela do cliente; se o limite fosse medido sobre o desconto total, o mesmo pedido passaria do limite do supervisor e precisaria do gerente.
- **Por item ou por pedido.** Um item com 10% e o resto sem desconto pode passar num limite médio por pedido e não passar num limite por item.
- **Por perfil.** Vendedor, supervisor, gerente; representante externo pode ter outro limite. Defina quem cadastra os limites e quem pode mudá-los, como em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).
- **O que acontece acima do limite.** O sistema bloqueia, ou deixa salvar e manda para aprovação? Enquanto aguarda, o pedido pode ser faturado, reservar estoque, ser enviado ao cliente como orçamento?
- **O que invalida a aprovação.** Se o vendedor muda a quantidade ou o preço depois de aprovado, a aprovação continua valendo? A regra prudente é: mudou o que foi aprovado, volta para aprovação.
- **Custo e margem na tela.** Se o limite for por margem, decida se o vendedor vê o custo ou só um aviso de "abaixo do mínimo".

Os estados, a devolução e a alteração de dados num fluxo de aprovação estão detalhados em [fluxo de aprovação no sistema](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/), e o que fazer quando o aprovador está de férias, em [substituto do aprovador](https://tornostudio.com/blog/substituto-aprovador-ausencia-sistema-aceite/). Aqui, o que importa é o gatilho: qual número, medido sobre o quê, dispara a aprovação.

## Preço por forma e prazo de pagamento

Desde 2017, a [Lei nº 13.455](https://www2.camara.leg.br/legin/fed/lei/2017/lei-13455-26-junho-2017-785093-publicacaooriginal-153193-pl.html) autoriza a diferenciação de preços de bens e serviços oferecidos ao público em função do prazo ou do instrumento de pagamento utilizado (art. 1º), torna nula a cláusula contratual, em arranjos de pagamento ou outros acordos para prestação de serviço de pagamento, que proíba ou restrinja essa diferenciação (parágrafo único) e acrescenta o art. 5º-A à Lei nº 10.962/2004, que manda informar esses descontos em local e formato visíveis. Como isso se aplica ao seu caso, especialmente em venda entre empresas e em contratos com as credenciadoras, é pergunta para o jurídico.

Para o sistema, a pergunta é operacional:

- **Em que camada o pagamento entra.** Antes ou depois do desconto manual? Ele conta para o limite do vendedor?
- **É desconto ou acréscimo.** Preço base no boleto a 28 dias com desconto no Pix, ou preço base à vista com acréscimo no prazo? O resultado pode ser igual; o que aparece no pedido, na nota e na comissão, não.
- **Prazo médio.** Em condições como 30/60/90 dias, o ajuste é por condição cadastrada ou calculado pelo prazo médio?
- **Quando a forma de pagamento muda depois.** O cliente fechou no Pix com 2% de desconto e pagou com boleto vencido. O sistema recalcula, cobra a diferença, mantém o preço e registra exceção? O retorno do pagamento ao pedido está em [integração de pagamentos e status do pedido](https://tornostudio.com/blog/integracao-pagamentos-status-pedido-aceite/).

## Vigência, versão e histórico da tabela

Tabela de preços muda: reajuste anual, mudança de custo, nova linha de produtos. Peça:

- **Versão com início e, se houver, fim de vigência.** Reajuste é uma versão nova da tabela, agendada; não é editar a versão em uso. A versão antiga continua consultável, com quem a criou e quando.
- **Qual data decide a versão.** Data do pedido, da aprovação, da entrega ou do faturamento? Defina também o instante e o fuso: uma promoção que termina "dia 20" acaba às 23h59 de 20/11 em São Paulo ou à meia-noite UTC? Veja [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/).
- **Lacunas e sobreposições.** Se a versão nova começa dia 01/12 e a antiga terminou dia 28/11, qual preço vale nos dias 29 e 30? Duas versões com vigência sobreposta devem ser recusadas no cadastro.
- **Item sem preço.** Item novo que ainda não está na tabela do cliente cai na tabela geral, bloqueia a venda ou pede preço manual com aprovação?
- **Carga por planilha.** Se as tabelas chegam por planilha, a importação precisa validar antes de gravar (item inexistente, preço zero, vírgula trocada por ponto); veja [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).
- **Quem pode mudar.** Criar e publicar versão de tabela, criar promoção e mudar limites de desconto são ações diferentes, com registro de quem fez e quando, como em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/).

## Preço gravado no pedido × reajuste posterior

Uma regra que evita muita discussão com o cliente: **o preço do pedido é gravado quando o pedido é confirmado e não muda quando a tabela muda.** Junto com o preço, grave o porquê: a versão da tabela, as camadas aplicadas, o desconto manual, quem aprovou e a condição de pagamento.

![Ilustração de uma etiqueta de preço com frente e verso, presa por barbante ao pedido fictício PV-1088, linha 1. Frente: Detergente 5 L, 60 unidades, R$ 32,51 por unidade, total da linha R$ 1.950,60, gravado em 12/11/2026 às 14:20. Verso, por que este preço: tabela Revenda B versão 3, desde 01/11; faixa de 50 unidades ou mais, menos 5%, R$ 34,20; promoção de R$ 35,00 descartada; desconto manual de 3% pelo vendedor, limite de 3%; aprovação não exigida; Pix à vista, menos 2%; arredondamento do unitário em 2 casas. Abaixo, em 01/12/2026 entra a Revenda B versão 4, mais 6% na tabela, de R$ 36,00 para R$ 38,16; um carimbo diz que o PV-1088 continua R$ 32,51; um pedido novo em 02/12 parte de R$ 38,16, com as mesmas regras. Exemplo fictício.](./torno-precos-etiqueta-pedido.svg)

*Exemplo fictício: pedido, produto, tabelas e datas inventados; o pedido guarda o preço e a explicação do momento em que foi confirmado. Ilustração original Torno Studio, 2026.*

A partir daí, decida os casos de borda:

- **Orçamento com validade.** Orçamento de 12/11 válido por 15 dias mantém o preço até 27/11; convertido em pedido depois disso, recalcula com aviso ao vendedor, ou mantém com aprovação? Se o orçamento é emitido em PDF, o documento guarda o preço da emissão; veja [gerar documentos em PDF no sistema](https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/).
- **Pedido editado depois do reajuste.** Item novo incluído num pedido antigo: preço de hoje ou da data do pedido? Mudança de quantidade que muda a faixa: recalcula só aquela linha?
- **Faturamento parcial e entrega futura.** O saldo de um pedido de novembro faturado em dezembro sai pelo preço do pedido, a menos que o contrato diga outra coisa.
- **Devolução.** O crédito usa o preço efetivamente cobrado, com todos os descontos, não o preço de tabela.
- **Recalcular em massa.** Se a empresa decidir reajustar pedidos em aberto, isso é uma ação explícita, com lista de pedidos afetados, registro e aviso, nunca efeito colateral de publicar uma tabela.

## Arredondamento: em que camada e sobre o quê

Cada camada com percentual gera casas decimais. No exemplo, o preço passa por R$ 33,174 e R$ 32,51052. Se o sistema arredonda o unitário para R$ 32,51 e multiplica por 60, o total é R$ 1.950,60; se guarda o unitário sem arredondar e arredonda só o total, dá R$ 1.950,63. As duas contas estão certas; só uma é a sua. Escreva em que camada o preço é arredondado (a cada camada, só no unitário final ou só no total), com quantas casas e com que regra de empate. A regra de empate e a diferença entre calcular, guardar e mostrar estão em [valores monetários no sistema](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/); aqui basta registrar a etapa como a última camada da pilha.

## Quando também há venda ao consumidor

Se a mesma empresa vende ao consumidor final, por loja física, site ou aplicativo, a exibição do preço tem regras próprias. Algumas que afetam diretamente o sistema:

- **Preço à vista visível junto ao produto.** A [Lei nº 10.962/2004](https://www2.camara.leg.br/legin/fed/lei/2004/lei-10962-11-outubro-2004-534307-normaatualizada-pl.html), no comércio eletrônico, pede a divulgação ostensiva do preço à vista junto à imagem do produto ou à descrição do serviço (art. 2º, III).
- **Desconto por forma de pagamento informado.** O art. 5º-A da mesma lei, incluído pela Lei 13.455/2017, manda informar em local e formato visíveis os descontos por prazo ou instrumento de pagamento.
- **Parcelamento com total.** O [Decreto nº 5.903/2006](https://www2.camara.leg.br/legin/fed/decret/2006/decreto-5903-20-setembro-2006-545543-normaatualizada-pe.html) pede o preço à vista e, no parcelamento ou financiamento, valor total, número, periodicidade e valor das prestações, juros e acréscimos (art. 3º); considera infração informar preços apenas em parcelas, obrigando o consumidor ao cálculo do total (art. 9º, IV). O parágrafo único do art. 10, incluído em 2013, aplica esses dispositivos ao comércio eletrônico.
- **Um preço por item.** O mesmo decreto considera infração atribuir preços distintos para o mesmo item (art. 9º, VII), e o art. 5º da Lei 10.962/2004 diz que, havendo divergência entre os sistemas de informação de preço do estabelecimento, o consumidor paga o menor. Na prática: vitrine, página do produto, carrinho e caixa precisam ler a mesma regra, não cópias da tabela que podem ficar fora de sincronia.
- **Oferta que vincula.** No [Código de Defesa do Consumidor](https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html), a informação suficientemente precisa sobre preço obriga o fornecedor e integra o contrato que vier a ser celebrado (art. 30), e a recusa em cumprir a oferta permite ao consumidor exigir o cumprimento nos termos anunciados (art. 35, I). Por isso, decida o que acontece com uma promoção que expira enquanto o item está no carrinho, e teste isso.

Tabela por cliente e desconto negociado costumam ser ferramentas de venda entre empresas; a parte de consumo pode ter outra pilha. Separe as duas por canal e confirme com o jurídico quais regras se aplicam a cada uma.

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Distribuidora Exemplo Ltda. vende Detergente 5 L. Tabela geral: R$ 40,00. A cliente Mercearia Ponte Alta está no grupo Revenda B, versão 3, vigente desde 01/11/2026: R$ 36,00. Faixa por quantidade: 50 unidades ou mais na linha, menos 5% sobre a tabela do cliente. Promoção da Limpeza: R$ 35,00, de 10/11 a 20/11/2026, até 23h59 no horário de São Paulo; não acumula com a faixa: entre tabela do cliente, faixa e promoção aplicáveis, fica o menor preço. Desconto manual em cascata, por item: vendedor até 3%, supervisor até 8%, acima disso gerente. Pix à vista: menos 2%, depois do desconto manual, fora do limite do vendedor. Arredondamento: só no unitário final, 2 casas, empate para cima. Revenda B versão 4, mais 6%, a partir de 01/12/2026. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cliente sem tabela própria compra 10 unidades | R$ 40,00 da tabela geral | Pedido e origem do preço na linha |
| Mercearia Ponte Alta compra 10 unidades em 05/11 | R$ 36,00 da Revenda B v3 | Pedido e origem do preço |
| Mesma cliente compra 10 unidades em 12/11 | R$ 35,00 da promoção (faixa não se aplica) | Pedido e origem do preço |
| Mesma cliente compra 60 unidades em 12/11 | R$ 34,20 da faixa; promoção listada como descartada | Linha do pedido com camadas |
| 60 unidades em 12/11 com 3% manual do vendedor e Pix | R$ 32,51 por unidade; total R$ 1.950,60; sem aprovação | Linha, total e memória de cálculo |
| Mesmo pedido, mas o vendedor tenta 5% manual | Pedido em "aguardando aprovação" do supervisor; não fatura nem é enviado como confirmado | Estado do pedido e registro |
| Supervisor aprova 5%; vendedor muda a quantidade para 70 | Aprovação anterior invalidada; pedido volta para aprovação | Histórico do pedido |
| Vendedor tenta 9% manual | Supervisor não consegue aprovar; só o gerente | Tela de cada perfil |
| Mesmo pedido com boleto a 28 dias, sem Pix | Sem o desconto de 2%; limite do vendedor inalterado | Linha e memória de cálculo |
| Pedido no Pix pago depois por boleto | Comportamento combinado (exceção registrada ou diferença cobrada), nunca mudança silenciosa do preço | Pedido, pagamento e registro |
| Pedido de 10 unidades às 23h50 de 20/11 (São Paulo) | Promoção ainda vale: R$ 35,00 | Pedido com data e hora |
| Pedido de 10 unidades às 00h10 de 21/11 (São Paulo) | Promoção encerrada: R$ 36,00 | Pedido com data e hora |
| Cadastrar segunda promoção para o mesmo item com vigência sobreposta e mesma prioridade | Cadastro recusado ou critério de desempate aplicado e mostrado | Tela de cadastro |
| Publicar Revenda B v4 com início em 01/12 | Pedidos de novembro mantêm o preço; v3 continua consultável | Pedido PV-1088 antes e depois |
| Pedido novo de 10 unidades em 02/12 | R$ 38,16 da Revenda B v4 | Pedido e origem do preço |
| Faturar em 03/12 o saldo do PV-1088 | Saldo sai a R$ 32,51 | Pedido e faturamento |
| Converter em 03/12 um orçamento de 12/11 válido por 15 dias | Preço recalculado pela v4, com aviso ao vendedor (ou mantido só com aprovação, conforme a regra) | Tela de conversão e registro |
| Item novo sem preço na Revenda B | Venda bloqueada ou preço da tabela geral, conforme a regra; nunca R$ 0,00 | Linha do pedido |
| Importar planilha da v4 com um item inexistente e um preço "38.16" | Nada gravado até a correção; erros apontados por linha | Relatório da importação |
| Consultar a trilha da Revenda B e do PV-1088 | Quem criou e publicou cada versão, quem concedeu e quem aprovou cada desconto | Registro exportado |

*Fim do exemplo fictício. Empresa, cliente, produto, tabelas, percentuais, datas, limites e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. A ordem das camadas, a regra de não acumulação, os limites e o arredondamento são escolhas do exemplo, não política recomendada, exigência legal nem padrão de ferramenta.*

## Perguntas frequentes

### Melhor preço ou hierarquia: qual escolher?

Depende da política comercial. Hierarquia protege a negociação feita com o cliente (o preço combinado vale, mesmo que uma promoção geral fique mais barata); melhor preço evita que o cliente pague mais do que um comprador qualquer. Há empresas que combinam as duas: hierarquia entre tabelas e melhor preço entre promoção e faixa, como no exemplo. O importante é que a escolha esteja escrita e apareça no teste.

### O sistema deve recalcular pedidos em aberto quando a tabela muda?

Por padrão, não: o pedido confirmado guarda o preço. Se a empresa quiser reajustar pedidos em aberto, isso deve ser uma ação explícita, com lista dos pedidos afetados, registro e aviso ao cliente, e não um efeito de publicar a tabela nova.

### O limite de desconto deve considerar a promoção?

Normalmente o limite mede o que o vendedor decide, não o que a empresa já concedeu por tabela ou promoção. Mas, se o problema é margem, um limite por preço mínimo do item protege melhor do que um percentual. Escolha uma medida e escreva qual é.

Para transformar a sua política comercial em regras de preço e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a lista das camadas de preço que existem hoje, dois ou três pedidos anonimizados com o preço explicado e as exceções que mais geram discussão, sem dados reais de clientes.

*Fontes consultadas em 12 de novembro de 2026: Lei nº 13.455/2017 (publicação original), Lei nº 10.962/2004, Decreto nº 5.903/2006 e Lei nº 8.078/1990 (CDC), nas versões da Legislação Informatizada da Câmara dos Deputados; documentação do Microsoft Dynamics 365 Business Central (cálculo de preço e página Set up prices and discounts). Este artigo não recomenda sistema nem fornecedor, não define política comercial e não é parecer jurídico; empresa, cliente, pedidos e ilustrações são modelos editoriais fictícios.*
