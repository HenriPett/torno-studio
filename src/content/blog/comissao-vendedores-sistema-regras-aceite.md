---
content_id: torno-artigo-pt-20261109-comissao-vendedores
intent_id: buyer-sales-commission-rules-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Sistema de comissão de vendedores: regras a definir e o que testar no aceite'
h1: 'Sistema de comissão de vendedores: regras a definir e o que testar no aceite'
seo_title: 'Sistema de comissão de vendedores: regras e aceite | Torno'
seo_description: 'Base de cálculo, momento devido, estorno, faixas, regra que muda no mês e extrato contestável: o que definir e testar num sistema de comissão de vendedores.'
summary: 'O que a empresa precisa decidir e o que pedir para ver no aceite de um sistema de comissão de vendedores sob medida: base de cálculo, momento em que a comissão é devida, cancelamento e estorno, faixas marginais ou sobre o total, versão da regra, divisão e centavos, e extrato que o vendedor confere e contesta, com exemplo fictício.'
primary_question: O que a empresa precisa definir e testar antes de aceitar um sistema de comissão de vendedores sob medida?
proposed_path: /blog/comissao-vendedores-sistema-regras-aceite/
canonical_url: https://tornostudio.com/blog/comissao-vendedores-sistema-regras-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gerentes comerciais e financeiros que vão contratar ou refazer o cálculo de comissão de vendedores, hoje feito em planilha ou num ERP que não atende às regras da empresa.
buyer_stage: Especificação e aceite de um sistema novo, ou troca de uma planilha ou módulo em uso.
scope: Separação entre política de comissão (decisão da empresa) e cálculo (sistema); base de cálculo; momento em que a comissão é devida (pedido, faturamento, recebimento, parcelas); cancelamento, devolução, inadimplência e estorno; metas e faixas marginais ou sobre o total; vigência e versão da regra em cada lançamento; divisão entre vendedores e centavos; extrato conferível e contestável com trilha; critérios de aceite com dados fictícios; operação em paralelo à planilha.
not_scope: Parecer trabalhista, contábil ou fiscal; definição de percentuais ou de política de remuneração; enquadramento de vendedor empregado ou representante comercial; folha de pagamento, encargos, DSR e tributos sobre comissão; escolha de ERP.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-09T11:23:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-09T11:43:03Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-09T11:43:56Z'
release_approval_evidence: Revisão independente de texto, fontes (Lei nº 3.207/1957 e Lei nº 4.886/1965, Câmara dos Deputados) e figuras, NO-GO com correções obrigatórias aplicadas pelo redator e GO da revisão factual independente às 2026-11-09T11:43:03Z; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique; não é parecer trabalhista, contábil ou fiscal.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/quando-automatizar-processos-planilhas/
    reason: Ajuda a decidir se o cálculo de comissão hoje em planilha justifica um sistema, antes de especificar as regras.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Aprofunda quando e como arredondar, base para a divisão de comissão e os centavos que sobram.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Ajuda a escolher qual data define a vigência da regra e o período de fechamento.
  - path: https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/
    reason: Detalha o que exigir quando o mesmo aviso de recebimento chega duas vezes, para não gerar comissão em dobro.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Aprofunda o registro de quem alterou regra, decidiu contestação ou lançou ajuste, quando e por quê.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar a política de comissão em regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'A Lei nº 3.207/1957 regula as atividades dos empregados vendedores, viajantes ou pracistas; pelo art. 3º, a proposta de venda considera-se aceita se o empregador não a recusar por escrito em 10 dias da proposta, ou em 90 dias (prorrogáveis) quando a transação é com comerciante ou empresa estabelecida em outro Estado ou no exterior; pelo art. 4º, o pagamento de comissões é mensal, expedindo a empresa, no fim de cada mês, a conta respectiva com as cópias das faturas, podendo as partes fixar outra época que não exceda um trimestre contado da aceitação do negócio; pelo art. 5º, nas transações por prestações sucessivas a comissão é exigível de acordo com a ordem de recebimento; pelo art. 7º, verificada a insolvência do comprador, o empregador pode estornar a comissão que houver pago; nenhum outro artigo da lei menciona estorno.'
    reference: https://www2.camara.leg.br/legin/fed/lei/1950-1959/lei-3207-18-julho-1957-354828-publicacaooriginal-1-pl.html
    entity: Câmara dos Deputados (Legislação Informatizada), Lei nº 3.207, de 18 de julho de 1957, publicação original
    source_date: '1957-07-22'
    checked_at: '2026-11-09T11:20:00Z'
    limit: 'Texto da publicação original (DOU de 22/07/1957); a página de dados da norma na Câmara informa "Não consta revogação expressa" e não oferece texto atualizado. A CLT (arts. 457 e 466) não pôde ser lida por inteiro nas fontes oficiais abertas e não é citada. A aplicação a cada contrato, inclusive a interação com a CLT e a jurisprudência, é questão jurídica.'
  - classification: FATO
    claim: 'A Lei nº 4.886/1965 define o representante comercial autônomo como pessoa jurídica ou física sem relação de emprego; pelo art. 32 (redação da Lei nº 8.420/1992), o representante adquire o direito às comissões quando do pagamento dos pedidos ou propostas, o pagamento deve ser feito até o dia 15 do mês subsequente ao da liquidação da fatura e as comissões devem ser calculadas pelo valor total das mercadorias, e são vedadas alterações que impliquem, direta ou indiretamente, a diminuição da média dos resultados auferidos pelo representante nos últimos seis meses (§7º); pelo art. 33, §1º, nenhuma retribuição é devida se a falta de pagamento resultar de insolvência do comprador ou se o negócio for por ele (comprador) desfeito, e, pelo §2º, salvo ajuste em contrário, as comissões são pagas mensalmente.'
    reference: https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4886-9-dezembro-1965-368416-normaatualizada-pl.html
    entity: Câmara dos Deputados (Legislação Informatizada), Lei nº 4.886, de 9 de dezembro de 1965, norma atualizada
    source_date: '2021-08-27'
    checked_at: '2026-11-09T11:20:00Z'
    limit: 'Data da fonte é a última modificação indicada nos metadados da página (alteração mais recente anotada: Lei nº 14.195/2021, no art. 44). O §1º do art. 33 traz também a sustação da entrega por situação do comprador; o artigo resume. O que compõe o "valor total das mercadorias" e o enquadramento de cada vendedor são questões jurídicas.'
  - classification: HIPÓTESE
    claim: 'O vendedor V-07, os pedidos P-1150, P-1188 e P-1201, as regras v1 e v2, as faixas, percentuais, metas, valores, datas, a contestação, a divisão entre vendedores e os critérios de aceite deste artigo, bem como as ilustrações, são modelos editoriais fictícios.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, política de comissão recomendada, sistema entregue nem teste executado; não são parecer trabalhista, contábil ou fiscal.
---

*Leitura estimada: 8 minutos.*

**Antes de aceitar um sistema de comissão de vendedores, escreva a política que ele vai aplicar: sobre qual valor a comissão incide, em que momento ela é devida, o que acontece com cancelamento, devolução e inadimplência, como funcionam as faixas e qual regra vale quando ela muda no meio do período.** No aceite, peça um extrato fictício em que cada linha mostre origem, base, percentual e versão da regra, e em que o vendedor contesta uma linha sem que ela desapareça.

**Não é parecer trabalhista, contábil nem fiscal.** A política de comissão é decisão da empresa, com orientação jurídica e contábil. Aqui eu trato do que o sistema precisa fazer com essa política, e de como testar.

## O que o sistema calcula e o que a empresa decide

O sistema aplica regras; não escolhe percentual, base nem momento. Isso depende do contrato de cada vendedor e da lei aplicável, que não é a mesma para todos:

- Para o **empregado vendedor**, a [Lei nº 3.207/1957](https://www2.camara.leg.br/legin/fed/lei/1950-1959/lei-3207-18-julho-1957-354828-publicacaooriginal-1-pl.html) prevê, sem prejuízo da CLT, entre outros pontos, pagamento mensal das comissões (outra época pode ser ajustada, sem passar de um trimestre da aceitação do negócio) e aceitação tácita da proposta se o empregador não a recusar por escrito em 10 dias, ou 90 dias, prorrogáveis, em transação com comerciante ou empresa estabelecida em outro Estado ou no exterior.
- Para o **representante comercial autônomo**, sem vínculo de emprego, a [Lei nº 4.886/1965](https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4886-9-dezembro-1965-368416-normaatualizada-pl.html) diz que o direito à comissão nasce com o pagamento dos pedidos, que o pagamento vai até o dia 15 do mês seguinte à liquidação da fatura e que, salvo ajuste, as comissões são pagas mensalmente.

Por isso as regras precisam ser configuráveis por tipo de vendedor ou contrato, cada uma com um responsável na empresa. Se o cálculo vive numa planilha e você ainda avalia se vale um sistema, veja [quando automatizar processos com planilhas](https://tornostudio.com/blog/quando-automatizar-processos-planilhas/).

## Base de cálculo

Defina por escrito sobre qual valor o percentual incide: bruto ou líquido, antes ou depois de desconto, com ou sem frete, impostos destacados e juros de parcelamento. Para representantes, a [Lei nº 4.886/1965](https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4886-9-dezembro-1965-368416-normaatualizada-pl.html) (art. 32, §4º) manda calcular pelo valor total das mercadorias; o que entra nesse total é pergunta para o jurídico. O extrato mostra a base em cada linha, não só o resultado.

## Quando a comissão é devida

Defina, dentro do que o contrato e a lei aplicável permitem, o evento: pedido aceito, pedido faturado ou valor recebido. Para o empregado vendedor, a [Lei nº 3.207/1957](https://www2.camara.leg.br/legin/fed/lei/1950-1959/lei-3207-18-julho-1957-354828-publicacaooriginal-1-pl.html) (art. 5º) diz que, nas transações em que a empresa se obrigar por prestações sucessivas, a comissão é exigível de acordo com a ordem de recebimento delas. Na regra por recebimento, cada parcela gera sua linha, e o mesmo aviso de pagamento recebido duas vezes não gera duas comissões; veja [o que exigir quando um evento chega repetido](https://tornostudio.com/blog/integracao-evento-duplicado-regra-negocio/).

## Cancelamento, devolução, inadimplência e estorno

Cada um precisa de regra própria:

- **Cancelamento antes do evento que torna a comissão devida**: defina se a linha some ou fica registrada como cancelada, e se o motivo (cliente ou empresa) muda o tratamento.
- **Devolução depois de paga a comissão**: para o empregado vendedor, a Lei nº 3.207/1957 só menciona estorno no caso de insolvência do comprador (art. 7º); estorno por devolução ou cancelamento é ponto a confirmar com o jurídico. Se a política prevê estorno, ele fica ligado à venda original, usa a regra daquela venda e entra no extrato do período da devolução, sem reabrir extrato fechado.
- **Inadimplência**: na regra por recebimento, o não pago não gera comissão; na regra por faturamento, decida se e quando há estorno. A Lei nº 3.207/1957 (art. 7º) permite estornar a comissão paga se verificada a insolvência do comprador; a Lei nº 4.886/1965 (art. 33, §1º) diz que nenhuma retribuição é devida ao representante se a falta de pagamento resultar de insolvência do comprador ou se o negócio for desfeito pelo comprador. Atraso e insolvência são estados diferentes no sistema; o enquadramento é da empresa, com o jurídico.

## Metas e faixas: marginal ou sobre o total

“3% acima de R$ 50 mil” tem duas leituras, e elas pagam valores diferentes.

**Início do exemplo fictício.** Faixas: até R$ 50.000,00, 2%; de R$ 50.000,01 a R$ 100.000,00, 3%; acima de R$ 100.000,00, 4%.

- **Faixa sobre o total**: o percentual da faixa atingida vale para todo o valor. R$ 120.000,00 × 4% = R$ 4.800,00.
- **Faixa marginal**: cada pedaço paga o percentual da sua faixa. R$ 50.000,00 × 2% + R$ 50.000,00 × 3% + R$ 20.000,00 × 4% = R$ 1.000,00 + R$ 1.500,00 + R$ 800,00 = R$ 3.300,00.

| Vendas do mês | Faixa sobre o total | Faixa marginal |
|---|---|---|
| R$ 50.000,00 | R$ 1.000,00 | R$ 1.000,00 |
| R$ 50.001,00 | R$ 1.500,03 | R$ 1.000,03 |
| R$ 100.000,00 | R$ 3.000,00 | R$ 2.500,00 |
| R$ 100.001,00 | R$ 4.000,04 | R$ 2.500,04 |
| R$ 120.000,00 | R$ 4.800,00 | R$ 3.300,00 |

Na faixa sobre o total, R$ 1,00 a mais de venda no limite de R$ 100.000,00 rende R$ 1.000,04 a mais de comissão. *Fim do exemplo fictício.*

A escolha é da empresa. Mas o degrau afeta comportamento e estorno: uma devolução que derruba o mês abaixo do limite muda o percentual do mês inteiro? Defina também em qual faixa cai o valor exato do limite, e teste esse valor.

![Gráfico de degraus fictício: comissão no eixo vertical e vendas do mês no eixo horizontal, de R$ 0 a R$ 120.000,00, com faixas de 2% até R$ 50.000,00, 3% até R$ 100.000,00 e 4% acima. A linha da faixa sobre o total salta de R$ 1.000,00 para R$ 1.500,03 em R$ 50.001,00 e de R$ 3.000,00 para R$ 4.000,04 em R$ 100.001,00, terminando em R$ 4.800,00. A linha da faixa marginal sobe sem saltos: R$ 1.000,00 em R$ 50.000,00, R$ 2.500,00 em R$ 100.000,00, R$ 2.500,04 em R$ 100.001,00 e R$ 3.300,00 em R$ 120.000,00. Destaque: R$ 1,00 a mais de venda, R$ 1.000,04 a mais de comissão.](./torno-comissao-faixas.svg)

*Exemplo fictício: faixas e valores não são recomendação de política de comissão. A escolha entre faixa marginal e faixa sobre o total é da empresa. Ilustração original Torno Studio, 2026.*

## Regra que muda no meio do período

Toda regra precisa de vigência, e vigência por data de quê: do pedido, da aceitação, do faturamento ou do recebimento? Uma parcela recebida em outubro de um pedido de setembro pode cair em regras diferentes conforme a escolha; o artigo sobre [datas e cortes de período](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/) ajuda a decidir. Peça que cada lançamento grave a versão da regra que o gerou, e que nova versão não recalcule o passado sem uma decisão explícita, registrada com responsável e motivo na [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/). Para representantes, a Lei nº 4.886/1965 (art. 32, §7º) veda alterações que reduzam, direta ou indiretamente, a média dos resultados dos últimos seis meses; mudança que reduza comissão vai ao jurídico.

## Divisão entre vendedores e centavos

Venda compartilhada precisa de percentual por participante e de destino para o centavo que sobra. R$ 100,00 divididos por três não fecham em R$ 33,33 cada: faltam R$ 0,01. Defina quem recebe a diferença e em que etapa se arredonda; o artigo sobre [arredondamento de valores monetários](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/) detalha essas escolhas.

## Extrato que o vendedor confere e contesta

A Lei nº 3.207/1957 (art. 4º) prevê que a empresa expeça, no fim de cada mês, a conta das comissões com as cópias das faturas. O extrato deve permitir conferir cada linha: origem, data, base, percentual, valor e versão da regra. A contestação fica na linha, com quem, quando, motivo e decisão, e a linha segue visível durante a análise.

![Extrato fictício do vendedor V-07, outubro de 2026, com quatro linhas: parcela 1/2 do Pedido P-1201 recebida, base R$ 5.000,00, 3%, R$ 150,00, regra v2; parcela 2/2 do Pedido P-1188 recebida, base R$ 4.000,00, 2%, R$ 80,00, regra v1, com balão de contestação “pedido aceito em 02/10; não seria a v2?”, em análise pelo financeiro; devolução do Pedido P-1150, base R$ 1.000,00, estorno de R$ 20,00 pela regra v1; ajuste de faixa, base do mês R$ 8.000,00 acima da meta de R$ 6.000,00, mais 0,5%, R$ 40,00, regra Faixas v1. Total: R$ 250,00, uma linha em contestação.](./torno-comissao-extrato.svg)

*Exemplo fictício: vendedor, pedidos, regras e valores não vêm de empresa ou sistema real. Cada linha mostra a regra e a versão que a gerou. Ilustração original Torno Studio, 2026.*

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Regra v1: 2% sobre o valor recebido dos produtos, sem frete. Regra v2: 3%, para pedidos emitidos a partir de 01/10/2026. Faixas v1: mais 0,5% sobre a base do mês quando ela for igual ou maior que R$ 6.000,00.

1. O Pedido P-1201, emitido em 05/10/2026, de R$ 10.000,00 em produtos, com frete cobrado à parte, em duas parcelas de R$ 5.000,00: a parcela 1/2 recebida gera R$ 150,00 (3%, regra v2); a parcela 2/2 só gera comissão quando recebida; o frete não entra na base.
2. A parcela 2/2 do Pedido P-1188, de R$ 4.000,00, emitido em 28/09/2026 e aceito em 02/10/2026, recebida em outubro, gera R$ 80,00 pela regra v1, e publicar a v2 não recalcula esse lançamento.
3. A devolução de R$ 1.000,00 do Pedido P-1150, emitido antes de 01/10/2026, estorna R$ 20,00 pela regra v1, ligada à venda original, no extrato de outubro.
4. A base do mês de R$ 8.000,00 (5.000 + 4.000 − 1.000) gera o ajuste de faixa de R$ 40,00; com base de exatamente R$ 6.000,00, o ajuste também é gerado.
5. O extrato de V-07 fecha em R$ 250,00 (150 + 80 − 20 + 40).
6. Com as faixas da seção “Metas e faixas”, vendas de R$ 120.000,00 geram R$ 4.800,00 na faixa sobre o total ou R$ 3.300,00 na marginal, conforme a configuração; R$ 100.000,00 e R$ 100.001,00 reproduzem a tabela.
7. Uma comissão de R$ 100,00 dividida por três vendedores fecha em R$ 100,00, e o centavo vai para quem a regra indicar.
8. Um título vencido e não pago não gera comissão na regra por recebimento.
9. O mesmo aviso de recebimento processado duas vezes não gera segunda comissão.
10. V-07 contesta a linha do P-1188 (“pedido aceito em 02/10; não seria a v2?”); o sistema registra pessoa, data e motivo, mostra a linha em análise pelo financeiro até a decisão, e a linha não some do extrato.
11. Depois do fechamento, um ajuste entra como lançamento novo no período seguinte, sem alterar o extrato fechado.

*Fim do exemplo fictício. Vendedor, pedidos, regras e critérios são um modelo editorial, não um teste executado em sistema real.*

## Sistema novo ou sistema em uso

**Num sistema novo**, escreva a política antes das telas, com casos de borda e responsável por regra, e grave a versão da regra desde o primeiro lançamento.

**Ao substituir planilha ou ERP**, rode os dois em paralelo por um ou dois fechamentos, compare vendedor a vendedor e explique cada diferença; às vezes o erro está na planilha. Só então desligue o cálculo antigo.

## Perguntas frequentes

### O sistema pode decidir a regra de comissão por mim?

Não. Ele aplica a política que a empresa definiu, com orientação jurídica e contábil; o que se testa no aceite é se aplica exatamente essa política.

### Quando a regra muda, o sistema deve recalcular os meses anteriores?

Só com decisão explícita e registrada. O padrão seguro é cada lançamento guardar a versão da regra que o gerou.

### Representante comercial e vendedor empregado podem usar a mesma regra?

Podem estar no mesmo sistema, mas as leis e os contratos são diferentes. Configure regras separadas e confirme cada uma com o jurídico.

Para transformar a sua política de comissão em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a planilha ou relatório atual, sem dados reais de vendedores, e a lista de casos que hoje geram dúvida no fechamento.

*Fontes consultadas em 9 de novembro de 2026. Este artigo não é parecer trabalhista, contábil nem fiscal; vendedor, pedidos, regras, valores e ilustrações são modelos editoriais fictícios.*
