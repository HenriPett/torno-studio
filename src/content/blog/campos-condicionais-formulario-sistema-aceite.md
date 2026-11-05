---
content_id: torno-artigo-pt-20261105-campos-condicionais
intent_id: buyer-conditional-form-fields-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Campos condicionais em formulários: o que definir e testar'
h1: 'Campos condicionais em formulários: como definir e testar as regras'
seo_title: 'Campos condicionais em formulário: critérios de aceite | Torno'
seo_description: 'Defina quando um campo aparece, torna-se obrigatório e deixa de valer após uma resposta mudar. Veja cenários para testar um formulário interno.'
summary: 'Critérios de aceite para formulários que mudam campos e exigências conforme as respostas.'
primary_question: Como especificar e testar campos condicionais em um formulário de sistema interno?
proposed_path: /blog/campos-condicionais-formulario-sistema-aceite/
canonical_url: https://tornostudio.com/blog/campos-condicionais-formulario-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Gestores que contratam um sistema interno com cadastros ou solicitações.
buyer_stage: Especificação de regras e aceite do formulário.
scope: Exibição, obrigatoriedade, mudança de resposta, dados antigos, validação e erros compreensíveis.
not_scope: Produto existente da Torno, regra legal universal ou formulário de cliente real.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-05T15:10:00Z'
reviewer: Revisor editorial independente (agente Codex)
reviewed_at: '2026-11-05T15:15:53Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-05T15:15:54Z'
release_approval_evidence: Revisão independente GO de texto, fontes e imagens; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/
    reason: Processo de decisão posterior ao envio do formulário.
  - path: https://tornostudio.com/blog/acessibilidade-software-sob-medida-aceite/
    reason: Aprofunda testes de uso para pessoas com deficiência.
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Contrasta entrada por formulário com importação em lote.
  - path: https://tornostudio.com/diagnostico/
    reason: Próxima etapa para especificar o processo real.
claims_and_sources:
  - classification: FATO
    claim: O tutorial de formulários do W3C orienta fornecer instruções, identificar controles e validar entradas com mensagens compreensíveis.
    reference: https://www.w3.org/WAI/tutorials/forms/
    entity: W3C WAI
    source_date: null
    checked_at: '2026-11-05T15:10:00Z'
    limit: Diretrizes de acessibilidade e uso; não definem quais campos de negócio devem ser condicionais.
  - classification: FATO
    claim: A MDN descreve validação de formulário e a possibilidade de restrições que combinam vários campos.
    reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
    entity: MDN Web Docs
    source_date: '2026-10-14'
    checked_at: '2026-11-05T15:10:00Z'
    limit: Recurso de plataforma web; a regra também precisa ser conferida no processamento do sistema.
  - classification: HIPÓTESE
    claim: Tipos de pedido, campos e cenários deste artigo são exemplos editoriais fictícios.
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, produto entregue ou teste executado.
---

**Um campo condicional só deve aparecer quando a resposta anterior o torna pertinente; a regra também precisa dizer se ele é obrigatório e o que acontece com um valor já preenchido quando a resposta muda.** Para aceitar um formulário interno, teste cada caminho até o registro final. Esconder um campo na tela não basta para decidir o que será salvo.

**Exemplo fictício:** um pedido de compra pergunta “Há fornecedor escolhido?”. Se a resposta é “sim”, abre o campo “Fornecedor”. Se é “não”, o campo não aparece. A organização deve decidir se “Fornecedor” se torna obrigatório no primeiro caso, se a resposta pode mudar depois e se o nome antigo deve ser apagado, preservado como histórico ou sinalizado para revisão. Não há uma regra universal para todos os formulários.

## Escreva a condição em uma frase testável

Uma especificação vaga, como “mostrar os campos necessários”, deixa decisões escondidas na implementação. Prefira uma matriz com **pergunta anterior, resposta, campo exibido, obrigatoriedade, destino do valor antigo e mensagem de erro**. Ela deve incluir o caminho em que a pessoa volta e troca a resposta.

![Matriz editorial fictícia que compara as respostas sim e não para fornecedor escolhido, mostrando campo visível, exigência e perguntas sobre o destino do valor anterior.](./torno-campos-condicionais-matriz.svg)

*Matriz de requisitos inventada para discussão, sem representar um formulário existente. Ilustração original Torno Studio, 2026.*

O [tutorial de formulários acessíveis do W3C](https://www.w3.org/WAI/tutorials/forms/) orienta associar instruções e rótulos aos controles e explicar erros de entrada. Em um campo condicional, isso significa que a pessoa deve entender **por que** a nova informação é pedida e como corrigir uma pendência; cor ou um asterisco isolado podem não bastar. A regra de negócio sobre o fornecedor, porém, vem da organização, não do W3C.

## O que acontece quando a resposta muda?

Imagine que a pessoa escolhe “sim”, digita “Fornecedor A” e depois muda para “não”. Há pelo menos três decisões separadas: o campo deixa de aparecer? O valor anterior continua no rascunho? O envio ao servidor aceita ou ignora esse valor? Defina o resultado para não reabrir um pedido com informação contraditória nem salvar silenciosamente um dado que já não se aplica.

A [MDN descreve validações que combinam diferentes campos](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation). Isso ajuda a implementar a experiência no navegador, mas a validação da interface não é prova suficiente do dado gravado: o teste de aceite deve consultar o registro resultante no sistema e verificar a regra acordada.

![Cena editorial de um formulário fictício em duas versões: primeiro com fornecedor preenchido, depois com a resposta alterada e o destino do valor anterior em aberto.](./torno-formulario-duas-respostas.svg)

*Duas etapas fictícias da mesma solicitação; não reproduzem tela real nem comprovam comportamento implementado. Ilustração original Torno Studio, 2026.*

## Quatro cenários de aceite

Use dados fictícios e registre entrada, estado da tela, mensagem e resultado salvo:

1. **Resposta que exige campo:** selecione “sim”, deixe “Fornecedor” vazio e tente enviar. O formulário deve apontar a pendência de modo compreensível, conforme a regra combinada.
2. **Resposta que dispensa campo:** selecione “não” e conclua sem preencher fornecedor. Confirme que nenhum valor antigo foi tratado como fornecedor ativo, conforme a política combinada.
3. **Mudança após preenchimento:** escolha “sim”, preencha o nome e mude para “não”. Confira o destino definido para o valor anterior, inclusive depois de salvar e reabrir.
4. **Volta ao caminho anterior:** mude novamente para “sim”. Confira se o valor reaparece ou se é solicitado de novo, de acordo com a política acordada, sem presumir que um dado antigo ainda é válido.

Se houver anexo, valor, tipo de solicitação ou várias condições encadeadas, repita o roteiro com as combinações relevantes. Não transforme toda combinação possível em um clique manual sem priorizar risco e frequência. O [guia de acessibilidade no aceite](https://tornostudio.com/blog/acessibilidade-software-sob-medida-aceite/) ajuda a ampliar o teste para teclado, leitura e mensagens de erro. O [fluxo de aprovação](https://tornostudio.com/blog/fluxo-aprovacao-sistema-regras/) começa depois que os dados necessários foram enviados; sua regra de decisão é outra pergunta.

## Perguntas frequentes

### Um campo oculto pode continuar salvo?

Pode, se essa for uma política explícita e fizer sentido para o processo. O ponto do aceite é verificar o destino combinado do valor antigo e evitar contradição no registro final.

### O navegador pode ser a única validação?

Não conte apenas com a mensagem da tela. Confira o resultado gravado e teste o caminho de envio permitido pelo sistema, especialmente se houver API ou importação.

Se você está definindo um formulário interno, a Torno pode ajudar a transformar essas condições em cenários verificáveis numa [conversa de diagnóstico](https://tornostudio.com/diagnostico/).
