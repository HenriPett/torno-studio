---
content_id: torno-artigo-pt-20261105-nfe-ibs-cbs
intent_id: buyer-nfe-reforma-tributaria-ibs-cbs-system-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'IBS e CBS na NF-e: o que pedir e testar no sistema'
h1: 'IBS e CBS na NF-e: o que pedir e testar no sistema que emite a nota'
seo_title: 'IBS e CBS na nota fiscal: o que testar no sistema | Torno'
seo_description: 'Rejeição adiada não é obrigação afastada. Veja o que pedir ao sistema que emite NF-e e como testar os campos de IBS, CBS e cClassTrib.'
summary: 'Linha do tempo oficial, divisão de responsabilidades e critérios de aceite para o sistema que emite NF-e com os campos de IBS e CBS.'
primary_question: O que pedir e testar no sistema que emite NF-e para os campos de IBS e CBS da reforma tributária?
proposed_path: /blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
canonical_url: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores e responsáveis por contratar ou manter um sistema próprio que emite NF-e/NFC-e ou se integra a um emissor.
buyer_stage: Adequação e aceite de um sistema emissor já em uso ou em contratação.
scope: Datas oficiais de obrigatoriedade dos campos de IBS e CBS na NF-e/NFC-e, diferença entre anúncio e regra vigente, programa de conformidade, divisão de responsabilidades e critérios de aceite testáveis.
not_scope: Consultoria tributária, escolha de CST ou cClassTrib para um produto, NFS-e e outros documentos, leiaute detalhado da nota técnica, emissor ou cliente específico.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-05T21:15:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-05T21:22:47Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-05T21:22:48Z'
release_approval_evidence: Revisão independente GO de texto, fontes oficiais e imagens após correções; autorização editorial permanente do usuário, sem revisão pessoal atribuída a Henrique.
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a confirmar que o teste roda em ambiente separado antes de emitir notas de ensaio.
  - path: https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/
    reason: Ajuda a planejar a volta atrás quando uma nova versão do leiaute ou da tabela causa problema.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Aprofunda o registro de quem alterou o quê, útil para a evidência de classificação e envio.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para delimitar a adequação do sistema emissor.
claims_and_sources:
  - classification: FATO
    claim: 'O Ato Conjunto RFB/CGIBS nº 4/2026 torna obrigatório informar IBS e CBS, para fatos geradores a partir de 03/08/2026 na NF-e e NFC-e; a partir de 01/12/2026 na NF-e de quem é sujeito passivo de IBS/CBS sem ser contribuinte do ICMS; e a partir de 01/01/2027 para o Simples Nacional, a NF-e com tributação monofásica e a importação via Duimp.'
    reference: https://www.cgibs.gov.br/upload/arquivos/202607/31091735-20260730-16h30-ato-conjunto-rfb-cgibs-na-c2-ba-4-260731-090909.pdf
    entity: Receita Federal do Brasil e Comitê Gestor do IBS
    source_date: '2026-07-30'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Trata da obrigatoriedade de informar os campos; não define a classificação de cada operação. NFS-e e outros documentos ficaram fora do artigo.
  - classification: FATO
    claim: 'Em 15/06/2026, o CGIBS anunciou rejeição automática a partir de 03/08/2026 para documentos sem os campos de IBS e CBS e alíquotas de teste de 1% (0,1% IBS e 0,9% CBS).'
    reference: https://www.cgibs.gov.br/novo-marco-da-reforma-tributaria-inicia-em-03-de-agosto-com-preenchimento-obrigatorio-dos-campos-relativos-ao-ibs-e-a-cbs
    entity: Comitê Gestor do IBS
    source_date: '2026-06-15'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Anúncio posteriormente alterado pelo adiamento de 06/08/2026; usado como exemplo de anúncio que não corresponde à regra vigente.
  - classification: FATO
    claim: 'Em 06/08/2026, Receita Federal e CGIBS informaram que a falta dos campos, neste momento, não gera rejeição; que o adiamento não afasta a obrigação de adequação; e que em 04/08/2026 88% dos documentos de contribuintes obrigados já traziam IBS e CBS.'
    reference: https://www.cgibs.gov.br/receita-federal-e-comite-gestor-do-ibs-esclarecem-adiamento-das-regras-de-validacao-dos-documentos-fiscais-eletronicos
    entity: Comitê Gestor do IBS e Receita Federal do Brasil
    source_date: '2026-08-06'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Não fixa data para a validação que rejeita a nota; a situação pode mudar por nova norma ou nota técnica.
  - classification: FATO
    claim: 'O Ato Conjunto RFB/CGIBS nº 5/2026 (PNCT 2026) mantém no programa quem não cumpre as obrigações acessórias se houver aumento progressivo de notas com IBS/CBS corretos, resposta no prazo a intimações, correção até 31/12/2026 das inconsistências comunicadas e indicação de profissional de contabilidade responsável.'
    reference: https://www.gov.br/sped/pt-br/assuntos/documentos-fiscais/dere/atos-conjuntos/ato-conjunto-rfb_cgibs-no-5-de-12-de-agosto-dee-2026.pdf/@@display-file/file
    entity: Receita Federal do Brasil e Comitê Gestor do IBS
    source_date: '2026-08-12'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Resumo dos critérios; a aplicação a cada empresa depende do texto integral e de orientação contábil.
  - classification: FATO
    claim: 'O Comunicado Conjunto informa dispensa de recolhimento do IBS e da CBS para quem emitir os documentos observando as normas e notas vigentes.'
    reference: https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/dezembro/comunicado-conjunto
    entity: Receita Federal do Brasil
    source_date: '2025-12-02'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Página atualizada em 28/10/2026; a dispensa é condicionada ao cumprimento das obrigações acessórias, conforme também orientou o CGIBS em 12/12/2025.
  - classification: FATO
    claim: 'O CGIBS orientou que os contribuintes que cumprirem as obrigações acessórias estarão dispensados do recolhimento.'
    reference: https://www.cgibs.gov.br/comite-gestor-do-ibs-e-receita-federal-divulgam-orientacoes-sobre-a-entrada-em-vigor-da-cbs-e-do-ibs-em-1-de-janeiro-de-2026
    entity: Comitê Gestor do IBS
    source_date: '2025-12-12'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Orientação para 2026; não substitui análise do contador sobre a situação da empresa.
  - classification: FATO
    claim: 'Segundo o Informe Técnico 2025.002 v1.60, o cClassTrib tem 6 dígitos, os 3 primeiros correspondem ao CST do IBS/CBS, cada código tem vigência própria, e as alíquotas de 2026 são CBS 0,9%, IBS estadual 0,1% e IBS municipal 0.'
    reference: https://www.reformatributaria.com/wp-content/uploads/2026/06/IT-2025.002-v.1.60-Tabelas-de-Classificacao-do-IBS-e-da-CBS-2026_06_22.pdf
    entity: Informe Técnico 2025.002 v1.60 (cópia publicada por reformatributaria.com)
    source_date: '2026-06-22'
    checked_at: '2026-11-05T21:12:00Z'
    limit: Cópia não oficial da versão de 22/06/2026; a tabela vigente deve ser conferida na fonte oficial (consumo.tributos.gov.br) e pode ter versão mais recente.
  - classification: HIPÓTESE
    claim: 'A divisão de responsabilidades, os critérios de aceite, a nota e a ficha de conferência deste artigo são modelos editoriais fictícios.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, emissor, sistema entregue nem teste executado; não são consultoria tributária.
---

**Uma NF-e autorizada não é, por si só, uma NF-e correta.** Desde 3 de agosto de 2026, NF-e e NFC-e devem trazer os campos de IBS e CBS (Simples Nacional e alguns casos têm datas posteriores). A validação que rejeitaria a nota sem eles foi adiada, mas a obrigação de adequação continua. Para aceitar o sistema que emite suas notas, peça três garantias: cada item sai com a classificação definida pelo seu contador, o código usado está vigente na data de emissão e o sistema guarda evidência do que foi enviado.

Este texto é para quem contrata ou mantém um sistema próprio que emite NF-e/NFC-e ou se integra a um emissor. **Não é consultoria tributária.** Qual CST e qual cClassTrib se aplicam a cada produto ou operação é decisão do contador ou da assessoria tributária. O papel do sistema é implementar essa decisão, validar o que pode ser validado e registrar o resultado.

## Linha do tempo: o que é regra e o que foi anúncio

O [Ato Conjunto RFB/CGIBS nº 4, de 30/07/2026](https://www.cgibs.gov.br/upload/arquivos/202607/31091735-20260730-16h30-ato-conjunto-rfb-cgibs-na-c2-ba-4-260731-090909.pdf), fixou quando os campos de IBS e CBS passam a ser obrigatórios, por fato gerador:

- **03/08/2026:** NF-e e NFC-e.
- **01/12/2026:** NF-e de quem é sujeito passivo de IBS/CBS, mas não é contribuinte do ICMS.
- **01/01/2027:** empresas do Simples Nacional, NF-e com tributação monofásica e importação via Duimp.

![Escada de três degraus com as datas de obrigatoriedade: 03/08/2026, campos de IBS e CBS obrigatórios na NF-e e NFC-e; 01/12/2026, NF-e de quem não é contribuinte do ICMS; 01/01/2027, Simples Nacional, tributação monofásica e Duimp. Abaixo, um quadro tracejado com o texto "validação que rejeita a nota: adiada, sem data".](./torno-nfe-regua-datas.svg)

*Datas segundo o Ato Conjunto RFB/CGIBS nº 4/2026; adiamento da validação segundo o CGIBS em 06/08/2026. Ilustração original Torno Studio, 2026.*

O caso mostra por que a data da fonte importa. Em 15/06/2026, o CGIBS [anunciou rejeição automática a partir de 03/08](https://www.cgibs.gov.br/novo-marco-da-reforma-tributaria-inicia-em-03-de-agosto-com-preenchimento-obrigatorio-dos-campos-relativos-ao-ibs-e-a-cbs) e alíquotas de teste de 1% (0,1% de IBS e 0,9% de CBS). Em 06/08/2026, Receita Federal e CGIBS [esclareceram o adiamento](https://www.cgibs.gov.br/receita-federal-e-comite-gestor-do-ibs-esclarecem-adiamento-das-regras-de-validacao-dos-documentos-fiscais-eletronicos): a falta dos campos, “neste momento”, não gera rejeição, e o adiamento “não afasta a obrigação de adequação”. A mesma publicação informa que, em 04/08/2026, 88% dos documentos de contribuintes obrigados já traziam IBS e CBS. Conteúdo escrito antes de 06/08 pode ainda falar em rejeição; o anúncio não é a regra vigente.

### Por que preencher se a nota não é rejeitada?

Porque, segundo Receita Federal e CGIBS, a dispensa de recolhimento em 2026 vale para quem cumpre as obrigações acessórias. Como isso se aplica à sua empresa é pergunta para o contador. O [Comunicado Conjunto da Receita Federal](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/dezembro/comunicado-conjunto) dispensa o recolhimento do IBS e da CBS para quem emitir os documentos “observando as normas e notas vigentes”, e o [CGIBS reforçou](https://www.cgibs.gov.br/comite-gestor-do-ibs-e-receita-federal-divulgam-orientacoes-sobre-a-entrada-em-vigor-da-cbs-e-do-ibs-em-1-de-janeiro-de-2026) que a dispensa vale para quem cumprir as obrigações acessórias.

Além disso, o [Ato Conjunto RFB/CGIBS nº 5, de 12/08/2026](https://www.gov.br/sped/pt-br/assuntos/documentos-fiscais/dere/atos-conjuntos/ato-conjunto-rfb_cgibs-no-5-de-12-de-agosto-dee-2026.pdf/@@display-file/file), criou o Programa Nacional de Conformidade Tributária (PNCT 2026). Quem ainda não cumpre as obrigações acessórias permanece no programa se atender a quatro critérios:

1. aumento contínuo e progressivo da quantidade de notas com IBS e CBS corretos;
2. resposta no prazo às intimações;
3. correção, até 31/12/2026, das inconsistências comunicadas;
4. indicação de um profissional de contabilidade responsável.

O primeiro e o terceiro critérios dependem diretamente do sistema: ele precisa emitir certo e mostrar que está emitindo certo.

## Quem decide o quê

Boa parte dos problemas de adequação nasce de uma pergunta sem dono. Uma divisão possível, para ajustar ao seu caso:

| Decisão ou tarefa | Contador ou assessoria tributária | Fornecedor do sistema | Operação da empresa |
|---|---|---|---|
| CST e cClassTrib de cada produto e operação | Define e registra | Implementa o cadastro e as regras | Mantém o cadastro de produtos atualizado |
| Leiaute da nota conforme a NT vigente | Confirma a interpretação quando houver dúvida | Implementa e testa | Acompanha o cronograma |
| Novas versões de NT e tabelas | Avalia o impacto fiscal | Atualiza, testa em homologação e publica | Aprova a data de troca |
| Notas com problema | Orienta a correção | Mostra quais notas e por quê | Corrige o cadastro ou reemite |

O sistema pode sugerir uma classificação a partir de um cadastro aprovado, mas não deve inventar uma.

## Critérios de aceite testáveis

Um critério útil diz o que foi testado e qual evidência ficou. Estes são um ponto de partida, sempre em ambiente de teste e com dados fictícios:

1. **Cada item com IBS e CBS conforme a classificação definida.** Monte uma lista de produtos de teste com a classificação aprovada pelo contador e confira, no XML, o CST e o cClassTrib de cada item.
2. **Código vigente na data de emissão.** Pelo [Informe Técnico 2025.002 v1.60](https://www.reformatributaria.com/wp-content/uploads/2026/06/IT-2025.002-v.1.60-Tabelas-de-Classificacao-do-IBS-e-da-CBS-2026_06_22.pdf) (cópia não oficial da versão de 22/06/2026), o cClassTrib tem 6 dígitos, os 3 primeiros são o CST do IBS/CBS, e cada código tem data de início e de fim. Teste uma emissão com código fora da vigência: o sistema deve bloquear ou alertar, não enviar em silêncio.
3. **A soma dos itens bate com os totais.** Base e valores de IBS e CBS por item devem fechar com os totais da nota, inclusive com descontos e várias linhas. Para 2026, o mesmo Informe Técnico indica CBS de 0,9%, IBS estadual de 0,1% e IBS municipal zero; confirme com o contador antes de usar como referência.
4. **Homologação para cada regime que se aplica.** Se a empresa tem filiais em regimes diferentes, ou vai emitir em um dos casos de 01/12/2026 ou 01/01/2027, teste cada um no ambiente de homologação da SEFAZ. Antes, vale [conferir se o ambiente de teste está mesmo separado da produção](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/).
5. **Devolução e nota complementar.** Trate-as como cenários próprios, conforme a nota técnica vigente — confira a versão no [Portal da NF-e](https://www.nfe.fazenda.gov.br/portal/), porque as regras desses casos podem mudar entre versões.
6. **Rotina para novas versões de NT e tabelas.** Combine quem acompanha as publicações, em quanto tempo uma nova versão é avaliada e como a troca é testada antes de entrar em produção, com um [plano de volta atrás](https://tornostudio.com/blog/plano-rollback-atualizacao-sistema/) se algo falhar.
7. **Relatório de notas com os campos.** O sistema deve mostrar, por período, quantas notas saíram com IBS e CBS preenchidos e quais saíram sem. Esse número ajuda a demonstrar o “aumento contínuo e progressivo” que o PNCT exige de quem ainda não cumpre as obrigações.
8. **Log e XML guardados.** Guarde o XML enviado e o retorno, e registre quem alterou a classificação de um produto e quando. O artigo sobre [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/) detalha esse registro.

![Ilustração de uma nota fiscal fictícia com um carimbo "Autorizada" e, ao lado, uma ficha de conferência com quatro itens: classificação definida pelo contador, código vigente na data, itens somam o total e XML guardado.](./torno-nfe-dois-carimbos.svg)

*Exemplo fictício: a nota não contém dados reais. O carimbo de autorização não substitui a ficha de conferência. Ilustração original Torno Studio, 2026.*

## Emissor terceirizado ou sistema próprio

**Se o seu sistema chama um emissor de terceiros**, o leiaute tende a ficar com o emissor (confirme no contrato), mas a classificação de cada item ainda sai do seu cadastro. Pergunte qual versão da NT o emissor suporta, onde o cClassTrib é informado (no seu sistema ou no painel do emissor), quem atualiza as tabelas, se há ambiente de homologação e se o XML autorizado volta para o seu sistema.

**Se o seu sistema monta a nota**, tudo fica com você: leiaute, validações, tabelas e evidência. Nesse caso, a rotina de atualização (critério 6) deixa de ser detalhe e passa a ser parte do contrato de manutenção.

Nos dois casos, o teste é o mesmo: emitir em homologação e conferir o XML item a item.

## Perguntas frequentes

### Se a nota foi autorizada sem os campos, está tudo certo?

Não necessariamente. Segundo o CGIBS, a falta dos campos não gera rejeição neste momento, mas a obrigação de adequação continua, e a dispensa de recolhimento foi condicionada a emitir conforme as normas vigentes.

### O sistema pode escolher o cClassTrib sozinho?

Ele pode aplicar uma regra aprovada, mas a escolha é do contador. Peça que o sistema registre a origem da classificação e quem a alterou.

### Preciso corrigir notas já emitidas?

Depende da orientação do seu contador. O PNCT prevê correção até 31/12/2026 das inconsistências comunicadas; um relatório das notas sem os campos ajuda a responder.

Se você mantém um sistema que emite NF-e e quer transformar essa lista em escopo e cenários de teste para o seu caso, a Torno pode ajudar numa [conversa de diagnóstico](https://tornostudio.com/diagnostico/). A decisão tributária continua com o seu contador.

*Fontes oficiais consultadas em 5 de novembro de 2026. Este artigo não é consultoria tributária; tabela, nota e ficha de conferência são modelos editoriais fictícios.*
