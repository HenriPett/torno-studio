---
seo_title: "Custo de manutenção de software após o lançamento | Torno"
seo_description: "Planeje o custo recorrente de um software web após o lançamento: serviços de operação, suporte, correções e evolução, com premissas e responsáveis."
title: "Custo de manutenção de software: o que prever após o lançamento"
summary: "Um roteiro para estimar o orçamento recorrente de um software web após o go-live, separando faturas de provedores, trabalho de manutenção e evolução funcional."
primary_question: "Como estimar o orçamento recorrente de operação e manutenção de um software web depois do lançamento, separando faturas de provedores, suporte e correções, e evolução funcional?"
proposed_path: /blog/custo-manutencao-software-apos-lancamento/
canonical_planned: https://tornostudio.com/blog/custo-manutencao-software-apos-lancamento/
locale: pt-BR
status: review
---

Depois que um software web entra em produção, o orçamento passa a incluir contas que a proposta de construção talvez não cubra. Para prever o gasto recorrente, separe **faturas dos provedores**, **trabalho para manter a operação** e **evolução funcional**. O preço de construir a primeira versão não determina automaticamente o custo dessas três frentes.

Este roteiro serve para organizar uma conversa de orçamento após o go-live. A arquitetura, o contrato e o uso medido é que dizem quais itens entram na conta.

## Três contas diferentes depois do go-live

**Operação** reúne os serviços usados pelo sistema: por exemplo, hospedagem, banco de dados, armazenamento, envio de mensagens e APIs externas. Cada fornecedor pode cobrar assinatura, consumo ou uma combinação dos dois. A fatura do provedor pertence ao titular da conta; ela não se transforma em serviço do Torno Studio por aparecer no mesmo orçamento.

**Manutenção e suporte** são trabalho: acompanhar alertas, investigar incidentes, aplicar correções, revisar dependências e combinar quem responde quando algo falha. Uma proposta precisa dizer quais atividades estão incluídas, qual canal aciona o responsável e qual é o horário de atendimento. Monitoramento contratado não significa, por si só, resposta a qualquer hora ou restauração garantida.

**Evolução** muda o produto: uma regra de negócio nova, outro fluxo, uma integração adicional. Deve ter escopo e aprovação próprios. Chamar uma funcionalidade nova de “correção” torna o orçamento difícil de comparar.

## A ficha que permite somar o custo recorrente

Preencha uma linha **para cada componente realmente presente na arquitetura**. Some o custo-base conhecido às parcelas de uso variável; mantenha “a cotar” separado até obter a tarifa ou proposta. A [AWS Well-Architected, no pilar de otimização de custos](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html) trata consciência de gasto e uso e revisão ao longo do tempo como práticas de gestão. Essa orientação é para workloads AWS; não fornece preço para o seu sistema nem pressupõe que ele use AWS.

| Componente ou trabalho | Base conhecida ou a cotar | Uso variável e premissa a medir | Total do período | Quem recebe a fatura ou executa | Próxima revisão |
|---|---|---|---|---|---|
| Hospedagem e banco | Plano/configuração contratados; registrar valor e período da fatura ou marcar **a cotar** | Instâncias, armazenamento, transferência e excedentes conforme o contrato | Base + uso faturado; **a cotar** se faltar tarifa | Titular das contas de infraestrutura; responsável técnico acompanha | Data do próximo fechamento da fatura |
| Arquivos e APIs externas | Assinatura, franquia incluída e unidade cobrada; ou **a cotar** | GB armazenados/transferidos, chamadas ou usuários, apenas se cobrados | Base + unidades cobradas × tarifa; ou **a cotar** | Titular de cada conta; responsável técnico confere uso | Antes da renovação ou mudança de volume |
| Mensagens e notificações | Plano e eventual franquia; ou **a cotar** | Mensagens efetivamente enviadas, por canal e unidade faturada | Base + excedentes × tarifa; ou **a cotar** | Titular da conta de comunicação | No fechamento mensal |
| Monitoramento, backups e incidentes | Ferramenta e trabalho contratado, cada qual em linha própria; ou **a cotar** | Eventos, retenção ou horas adicionais, se o acordo cobrar por uso | Ferramenta + trabalho + excedentes; ou **a cotar** | Provedor da ferramenta e pessoa nomeada para resposta | Após um incidente e no ciclo contratual |
| Suporte, correções e evolução | Escopo, período, limite de horas e preço em proposta separada; ou **a cotar** | Horas ou solicitações fora do escopo, só após aprovação | Valor contratado + adicionais aprovados; ou **a cotar** | Prestador contratado; quem aprova é o cliente | Antes de renovar o acordo |

Para fechar a ficha, anote **moeda, período, região, unidade, franquia, imposto aplicável e data em que cada preço foi consultado**. Confira esses campos no contrato e na fatura do serviço exato. Sem essa consulta, uma célula “a cotar” continua desconhecida; não vira zero.

Um limite de gastos de um provedor também não é teto do sistema inteiro. A [Supabase explica que seu Spend Cap cobre certos itens de uso e exclui outros](https://supabase.com/docs/guides/platform/cost-control). Ele não cobre contas de outros fornecedores. Leia as exclusões e o efeito de atingir uma cota antes de depender desse controle; as regras podem mudar.

## Duas propostas hipotéticas, calculadas na mesma janela

**[HIPÓTESE]** Considere duas propostas para operar um portal web durante uma janela de **30 dias**. São modelos didáticos, não propostas, preços ou prazos do Torno Studio. Em ambas, suponha o mesmo contrato hipotético de terceiros: **F** é a assinatura de hospedagem e banco para os 30 dias; armazenamento inclui **10 GB-mês** e cada GB-mês excedente custa **G**; cada mensagem enviada custa **M**, sem franquia de mensagens. **S** é o valor de um serviço de suporte por 30 dias, se contratado. F, G, M e S precisam vir de contratos ou cotações; nenhum valor monetário foi presumido aqui.

| Premissa verificável na janela de 30 dias | Proposta A | Proposta B |
|---|---:|---:|
| Armazenamento medido | 8 GB-mês | 25 GB-mês |
| Mensagens enviadas | 1.000 | 4.000 |
| Suporte pago após o go-live | Não contratado | Contratado pelo valor S |
| Fatura hipotética de terceiros | F + 1.000 × M | F + (25 − 10) × G + 4.000 × M |
| Trabalho de suporte | Sem parcela S e sem cobertura contratada | S, com escopo e horário a definir |
| **Total para comparar** | **F + 1.000 × M** | **F + 15 × G + 4.000 × M + S** |

Os volumes, a franquia e a forma de cobrança são **[HIPÓTESE]**, não dados de mercado. Para reproduzir a conta, substitua F, G, M e S pelos valores do serviço, região e contrato escolhidos; confira GB-mês e mensagens no painel e na fatura do período. Se o fornecedor cobrar por outra unidade, tiver franquia de mensagens ou mudar o plano, refaça a fórmula. A proposta A não inclui suporte pago; ausência de uma linha de suporte não significa que alguém responderá a incidentes gratuitamente.

## Onde termina a garantia e começa um novo acordo

No **MVP** do Torno Studio, a [garantia publicada é de 60 dias para bugs](https://tornostudio.com/#precos): correções do que não cumprir os critérios de aceite. **[FATO, home do Torno Studio consultada em 16/10/2026.]** Isso não paga hospedagem, banco, APIs ou mensagens de terceiros, nem inclui automaticamente suporte operacional contínuo ou novas funcionalidades. Para continuidade contratada, veja o [Product Evolution na home](https://tornostudio.com/#precos) e confirme o escopo aplicável; a tabela de planos fica na própria página.

Antes de assinar qualquer proposta, peça a ficha preenchida com os titulares das contas, a pessoa responsável por alertas e incidentes, os limites do suporte e a regra de aprovação de mudanças. Assim, o orçamento após o lançamento tem parcelas identificáveis e uma data para ser revisto.
