---
content_id: torno-artigo-pt-20261110-cnpj-alfanumerico
intent_id: buyer-alphanumeric-cnpj-system-adaptation-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'CNPJ alfanumérico no sistema: o que adaptar e testar'
h1: 'CNPJ alfanumérico no sistema: o que adaptar e testar antes de receber o primeiro'
seo_title: 'CNPJ alfanumérico no sistema: o que adaptar e testar | Torno'
seo_description: 'Campo de texto, zeros à esquerda, máscara, dígito verificador com letras, busca, NF-e, planilhas e APIs: o que adaptar e testar para o CNPJ com letras.'
summary: 'Roteiro para quem contrata ou mantém sistema interno, ERP próprio ou integração adaptar o sistema ao CNPJ alfanumérico: o que mudou e o que não mudou segundo a Receita Federal, inventário de onde o CNPJ vive, tipo do campo e banco de dados (texto de 14 posições, zeros à esquerda, unicidade e chaves estrangeiras), máscara e entrada, cálculo do dígito verificador com o exemplo oficial, busca e ordenação, NF-e, planilhas, APIs, relatórios e critérios de aceite com dados fictícios.'
primary_question: O que a empresa precisa adaptar e testar no sistema interno, ERP próprio ou integração para cadastrar, validar, buscar, trocar e exportar CNPJs com letras sem quebrar os CNPJs numéricos que já existem?
proposed_path: /blog/cnpj-alfanumerico-sistema-adaptar-testar/
canonical_url: https://tornostudio.com/blog/cnpj-alfanumerico-sistema-adaptar-testar/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos, gestores e responsáveis que contratam ou mantêm sistema interno, ERP próprio ou integração que guarda, valida ou troca CNPJ de clientes, fornecedores ou filiais.
buyer_stage: Adequação e aceite de um sistema já em uso ou em contratação, antes de receber ou cadastrar o primeiro CNPJ alfanumérico.
scope: O que mudou e o que não mudou no CNPJ; inventário de onde o CNPJ aparece; tipo do campo, tamanho, zeros à esquerda, unicidade, índices e chaves estrangeiras; máscara, maiúsculas e texto colado; dígito verificador pelo algoritmo publicado pela Receita, com o exemplo oficial calculado; busca e ordenação; NF-e (com a nota técnica lida por resumo secundário), planilhas e CSV, APIs; relatórios e exportações; critérios de aceite com dados fictícios.
not_scope: Parecer contábil, fiscal ou jurídico; recomendação ou comparação de ERP, emissor, biblioteca ou fornecedor; leiaute detalhado da NF-e ou de outros documentos fiscais; cálculo de tributos; lista de combinações bloqueadas pela Receita; procedimento de inscrição no CNPJ.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-10T21:12:32Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-10T21:18:07Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-10T21:19:29Z'
release_approval_evidence: 'Rotina agendada "Blogs SEO — tarde" de Henrique (escopo: commit e push editorial na main; autorização registrada em 04/11/2026 e atualizada em 07/11/2026), execução 2026-11-10-1800-claude; revisão factual independente NO-GO às 2026-11-10T21:18:07Z com cinco correções obrigatórias aplicadas pelo integrador; revisão final independente do diff antes do push.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/
    reason: Detalha modelo, validação por linha e devolutiva de erros na importação; aqui só se aplica isso à coluna de CNPJ.
  - path: https://tornostudio.com/blog/busca-filtros-sistema-resultados/
    reason: Detalha o contrato da busca, filtros e ordenação; aqui o foco é buscar CNPJ com e sem máscara e ordenar valores mistos.
  - path: https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/
    reason: Cobre outra adequação da NF-e (IBS e CBS) e a divisão de responsabilidades com o emissor.
  - path: https://tornostudio.com/blog/versionamento-api-integracao-aceite/
    reason: Ajuda a aceitar a mudança de tipo do campo CNPJ numa API sem interromper a integração.
  - path: https://tornostudio.com/blog/exportacao-dados-sistema-aceite/
    reason: Detalha como especificar e conferir a exportação em que o CNPJ precisa sair como texto.
  - path: https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/
    reason: Ajuda a validar a conversão da coluna de número para texto como uma migração de dados, com conciliação.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste antes de executar os cenários com CNPJs fictícios.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para levantar onde o CNPJ vive no sistema e transformar a adequação em escopo e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'O CNPJ alfanumérico mantém 14 posições e a máscara atual; as 12 primeiras posições (raiz e ordem) aceitam números de 0 a 9 e letras maiúsculas de A a Z; as duas últimas, os dígitos verificadores, são numéricas; todo CNPJ tem 14 caracteres e pode ter zeros à esquerda; os CNPJs já existentes continuam válidos e não mudam; os dois formatos valem em todos os processos e sistemas precisam ler o formato alfanumérico; novas inscrições ainda podem receber CNPJ numérico; certas combinações de letras são bloqueadas internamente pela Receita, sem lista publicada; o documento cita as INs RFB 2.119/2022 e 2.229/2024.'
    reference: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf
    entity: Receita Federal, Perguntas e Respostas CNPJ alfanumérico (perguntas 2, 6, 7, 13, 15, 21, 23, 26, 27, 28, 36, 38 e 45)
    source_date: null
    checked_at: '2026-11-10T21:05:00Z'
    limit: Documento sem data. Não trata de banco de dados, de minúsculas nem do caso de resto 0 ou 1 no cálculo do DV. O texto da IN RFB 2.229/2024 não foi aberto (sites de normas bloqueados no ambiente de pesquisa); nenhum artigo da IN é citado.
  - classification: FATO
    claim: 'O dígito verificador é calculado pelo módulo 11; cada caractere é convertido pelo código ASCII menos 48 (A = 17); pesos 5,4,3,2,9,8,7,6,5,4,3,2 para o primeiro DV e 6,5,4,3,2,9,8,7,6,5,4,3,2 para o segundo; DV = 11 − resto; no exemplo oficial 12.ABC.345/01DE, soma 459, resto 8, DV1 3; soma 424, resto 6, DV2 5; resultado 12.ABC.345/01DE-35.'
    reference: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf
    entity: Receita Federal, Perguntas e Respostas CNPJ alfanumérico (pergunta 14)
    source_date: null
    checked_at: '2026-11-10T21:05:00Z'
    limit: Cálculo refeito em Python e à mão para este artigo. A regra de resto 0 ou 1 não aparece no documento; o artigo a apresenta como regra do CNPJ numérico a confirmar e como caso de teste.
  - classification: FATO
    claim: 'O Serpro disponibilizou rotinas de validação do DV em Java, Python e TypeScript e um PDF explicativo; a fórmula do módulo 11 se mantém, com conversão pelo código ASCII menos 48.'
    reference: https://serpro.gov.br/menu/noticias/noticias-2024/cnpj-alfanumerico
    entity: Serpro, notícia de 21/10/2024
    source_date: '2024-10-21'
    checked_at: '2026-11-10T21:07:00Z'
    limit: O código e o PDF do Serpro não foram abertos; a notícia não trata do resto 0 ou 1.
  - classification: FATO
    claim: 'A Receita Federal anunciou em 16/10/2024, com a publicação da IN RFB 2.229/2024, que o CNPJ teria letras e números a partir de julho de 2026 e que a mudança não afetaria os CNPJs existentes; a IN é de 15/10/2024.'
    reference: https://agenciagov.ebc.com.br/noticias/202410/receita-federal-anuncia-que-cnpj-tera-letras-e-numeros-a-partir-de-julho-de-2026
    entity: Agência Gov/EBC, 16/10/2024; data da IN conforme notícia do Serpro de 21/10/2024
    source_date: '2024-10-16'
    checked_at: '2026-11-10T21:06:00Z'
    limit: Notícia oficial; texto da IN não aberto.
  - classification: FATO
    claim: 'A implantação do CNPJ alfanumérico ocorre a partir de 31/07/2026; entidades já inscritas não têm o número alterado; CNPJs numéricos continuam podendo ser atribuídos; a recomendação é avaliar sistemas, cadastros e integrações; a Receita oferece simulador e documentação para equipes de desenvolvimento.'
    reference: https://agenciagov.ebc.com.br/noticias/202607/implantacao-do-cnpj-alfanumerico-ocorrera-a-partir-de-31-de-julho
    entity: Agência Gov/EBC, 03/07/2026; e https://agenciagov.ebc.com.br/noticias/202607/cnpj-alfanumerico-o-que-muda-para-empresas-e-empreendedores (24/07/2026)
    source_date: '2026-07-03'
    checked_at: '2026-11-10T21:08:00Z'
    limit: O simulador não foi aberto.
  - classification: FATO
    claim: 'A Receita Federal gerou o primeiro CNPJ alfanumérico em 31/07/2026, conforme o cronograma de implantação.'
    reference: https://agenciagov.ebc.com.br/noticias/202607/receita-federal-gera-o-primeiro-cnpj-em-formato-alfanumerico
    entity: Agência Gov/EBC, 31/07/2026
    source_date: '2026-07-31'
    checked_at: '2026-11-10T21:19:00Z'
    limit: Notícia oficial; o artigo não cita o número nem a empresa.
  - classification: FATO
    claim: 'A Nota Técnica 2026.004 (Receita Federal, ENCAT e CGIBS) altera os schemas da NF-e e da NFC-e para o CNPJ alfanumérico, inclusive CNPJ de emitente, destinatário, transportador e documentos referenciados e a chave de acesso de 44 posições; a versão 1.01 manteve a produção em 01/07/2026.'
    reference: https://notagateway.com.br/?p=12475
    entity: Resumos secundários da NT 2026.004 v1.00 (Nota Gateway, 13/05/2026) e v1.01 (https://inventti.com.br/nt-2026-004-v1-01-e-publicada-sefaz-complementa-adequacoes-para-o-cnpj-alfanumerico-na-nf-e-e-nfc-e/, 18/06/2026)
    source_date: '2026-05-13'
    checked_at: '2026-11-10T21:10:00Z'
    limit: O PDF oficial no Portal Nacional da NF-e não abriu (bloqueio no ambiente de pesquisa); o artigo qualifica a informação como lida por resumo e não cita campos além dos gerais.
  - classification: FATO
    claim: 'Num teste feito para este artigo, um CSV convertido para planilha com o LibreOffice 24.2 em modo headless, com o filtro de importação padrão, converteu 12345678000E23 em número em notação científica (1,2345678E+33) e 00123456000149 em 123456000149; 12ABC34501DE35 ficou como texto.'
    reference: Teste local de conversão CSV → XLSX com LibreOffice em modo headless, lido com openpyxl, em 10/11/2026.
    entity: Torno Studio
    checked_at: '2026-11-10T21:11:00Z'
    limit: Um programa e uma configuração; o Excel e outras planilhas não foram testados. Não é recomendação de ferramenta.
  - classification: HIPÓTESE
    claim: 'CNPJs 11.222.333/0001-81, 00.123.456/0001-49, 12.ABC.345/01DA-01 e 12345678000E23, o inventário, as regras de normalização, ordenação e erro e os critérios de aceite são modelos editoriais fictícios; os DVs foram calculados em Python pelo algoritmo publicado (com a regra de resto 0 ou 1 do CNPJ numérico para 12.ABC.345/01DA-01).'
    reference: Modelo editorial deste artigo; cálculos em Python em 10/11/2026.
    entity: Torno Studio
    limit: Não representam empresa, cliente, sistema entregue nem teste executado em sistema real; números podem coincidir com inscrições reais e servem só para teste de cálculo.
---

*Leitura estimada: 10 minutos.*

**Para adaptar o sistema ao CNPJ alfanumérico, trate o CNPJ como texto de 14 posições em todos os lugares onde ele vive: formulário, validação, banco, busca, integrações, NF-e, planilhas e relatórios.** As 12 primeiras posições passam a aceitar letras maiúsculas, os dois dígitos verificadores continuam numéricos e os CNPJs atuais não mudam. No aceite, peça para ver o exemplo oficial da Receita, 12.ABC.345/01DE-35, atravessar o sistema inteiro ao lado de um CNPJ numérico antigo, sem perder letra, zero à esquerda ou dígito.

**Este artigo não é parecer contábil, fiscal ou jurídico e não recomenda ERP, emissor, biblioteca ou fornecedor.** As regras citadas vêm do material da Receita Federal; as decisões de produto são suas.

## O que mudou e o que não mudou

Segundo o [Perguntas e Respostas do CNPJ alfanumérico da Receita Federal](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf), que cita as Instruções Normativas RFB 2.119/2022 e 2.229/2024:

- **Continua igual:** 14 posições e a mesma máscara, `AA.AAA.AAA/AAAA-DV`. Raiz nas 8 primeiras, ordem do estabelecimento nas 4 seguintes, dígitos verificadores nas 2 últimas.
- **Muda:** as 12 primeiras posições podem ter números de 0 a 9 ou letras maiúsculas de A a Z. Os dois dígitos verificadores seguem numéricos.
- **Não muda:** nenhum CNPJ existente é alterado ou cancelado, e os dois formatos valem em todos os processos.
- **Detalhe que pega sistema:** novas inscrições ainda podem receber CNPJ só numérico. Você vai conviver com os dois formatos por tempo indeterminado.

A [Agência Gov informou](https://agenciagov.ebc.com.br/noticias/202607/implantacao-do-cnpj-alfanumerico-ocorrera-a-partir-de-31-de-julho) que a implantação começaria em 31 de julho de 2026 e recomendou que as organizações avaliem sistemas, cadastros e integrações. Em 31 de julho, a Receita [gerou o primeiro CNPJ alfanumérico](https://agenciagov.ebc.com.br/noticias/202607/receita-federal-gera-o-primeiro-cnpj-em-formato-alfanumerico). Se o seu sistema cadastra clientes ou fornecedores novos, um CNPJ com letras pode chegar em qualquer cadastro.

## Onde o CNPJ vive no seu sistema

Antes de orçar, faça o inventário. Num sistema interno típico, o CNPJ não mora num campo só: ele pode aparecer em cadastros, chaves, nomes de arquivo, filtros e mensagens trocadas com terceiros. Liste, para cada lugar, quem grava, quem lê e em que formato:

- **Cadastros:** clientes, fornecedores, transportadoras, filiais da própria empresa, contatos.
- **Banco:** colunas, chaves primárias e estrangeiras, índices, tabelas de histórico e auditoria.
- **Regras:** validação de DV, agrupamento de matriz e filiais pela raiz, detecção de duplicidade.
- **Saídas e entradas:** XML de NF-e, APIs, arquivos de banco, planilhas importadas e exportadas, relatórios, PDFs.
- **Código e configuração:** máscaras no front-end, expressões regulares, conversões para número, campos de tela com tamanho fixo.

Uma busca no código por padrões como `\d{14}`, conversões para inteiro e máscaras do tipo `99.999.999/9999-99` costuma achar a maior parte. O que não está no código (planilhas da equipe, sistemas de parceiros) entra na lista mesmo assim.

![Mapa ilustrativo no estilo de linha de metrô, com o título Por onde o CNPJ passa no sistema e o subtítulo Cada estação é um ponto de falha possível. A Linha CNPJ desce em zigue-zague por oito estações numeradas: 1 Formulário, aceita letras maiúsculas e cola com pontuação; 2 Validação, DV calculado com letras; 3 Banco, texto de 14, zeros à esquerda, índice único; 4 Busca, encontra por trecho; 5 Integrações/APIs, o outro lado aceita letras?; 6 NF-e/XML, CNPJ e chave de 44 posições; 7 Planilhas, sem notação científica; 8 Relatórios e exportação, coluna como texto, sem corte. Rodapé: Oito pontos para conferir antes de aceitar o campo.](./torno-cnpj-mapa-sistema.svg)

*As estações são exemplos de onde o CNPJ costuma passar; o inventário do seu sistema pode ter outras. Ilustração original Torno Studio, 2026.*

## Campo e banco de dados: texto de 14 posições

O ponto mais comum de quebra é o tipo da coluna. CNPJ guardado como número inteiro não aceita letras e já perdia zeros à esquerda; a Receita lembra que todo CNPJ tem 14 caracteres e pode começar com zeros. Peça:

- **Tipo texto, com 14 caracteres**, guardando só letras e dígitos, sem pontuação. A máscara é exibição.
- **Uma forma canônica:** maiúsculas, sem espaços, sem pontos, barra ou hífen. É ela que entra em índices e comparações.
- **Unicidade sobre a forma canônica.** Se o banco aceita `12ABC34501DE35` e `12.ABC.345/01DE-35` como valores diferentes, você terá clientes duplicados.
- **Chaves estrangeiras com o mesmo tipo** em todas as tabelas que referenciam o CNPJ. Se a chave primária muda de número para texto e uma tabela de pedidos fica como número, a ligação quebra.
- **Raiz e ordem como texto**, se o sistema separa os 8 primeiros caracteres para agrupar matriz e filiais.

A conversão da coluna é uma migração de dados: conte registros antes e depois, confira os zeros à esquerda e compare amostras, como em [migração de dados com validação](https://tornostudio.com/blog/migracao-dados-validacao-troca-sistema/).

## Máscara e entrada: o que o usuário digita ou cola

O usuário vai colar o CNPJ de um e-mail, de um PDF ou de um site. Escreva a regra antes de testar:

- A máscara aceita letras nas 12 primeiras posições e só dígitos nas 2 últimas.
- Texto colado com pontos, barra, hífen ou espaços é limpo antes da validação.
- **Minúsculas:** a Receita define letras maiúsculas. Decida se o sistema converte para maiúsculas ou rejeita com mensagem. Eu prefiro converter e mostrar o valor final, mas o importante é estar escrito.
- Teclado numérico no celular deixa de servir para esse campo.
- A mensagem de erro diz o que está errado: tamanho, caractere inválido ou dígito verificador.

## Dígito verificador com letras

O cálculo continua no módulo 11. A diferença é a conversão: cada caractere vira o seu código ASCII menos 48. Dígitos ficam com o próprio valor; `A` vale 17, `B` 18, `C` 19, e assim por diante. O [Serpro](https://serpro.gov.br/menu/noticias/noticias-2024/cnpj-alfanumerico) publicou rotinas de validação em Java, Python e TypeScript e um PDF explicativo.

O exemplo oficial da Receita é a base 12.ABC.345/01DE:

1. Valores: 1, 2, 17, 18, 19, 3, 4, 5, 0, 1, 20, 21.
2. Pesos do primeiro dígito: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2. Produtos somados: 459.
3. 459 dividido por 11 deixa resto 8. Primeiro dígito: 11 − 8 = **3**.
4. Para o segundo, acrescente o 3 e use os pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2. Soma: 424, resto 6. Segundo dígito: 11 − 6 = **5**.

Resultado: **12.ABC.345/01DE-35**.

![Folha de cálculo do dígito verificador do exemplo oficial da Receita Federal, 12.ABC.345/01DE. Primeiro dígito: os caracteres 1, 2, A, B, C, 3, 4, 5, 0, 1, D, E viram os valores 1, 2, 17, 18, 19, 3, 4, 5, 0, 1, 20, 21 (código ASCII menos 48); multiplicados pelos pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, dão 5, 8, 51, 36, 171, 24, 28, 30, 0, 4, 60, 42; soma 459, resto da divisão por 11 igual a 8, primeiro dígito 11 − 8 = 3. Segundo dígito: os mesmos valores seguidos do 3, com pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2; soma 424, resto 6, segundo dígito 11 − 6 = 5. Resultado: 12.ABC.345/01DE-35.](./torno-cnpj-calculo-dv.svg)

*Cálculo do exemplo publicado pela Receita Federal no Perguntas e Respostas do CNPJ alfanumérico, conferido para este artigo. Ilustração original Torno Studio, 2026.*

Três cuidados no aceite:

- **Resto 0 ou 1.** O material da Receita mostra um exemplo com restos 8 e 6 e não trata desse caso. No CNPJ numérico, resto 0 ou 1 resulta em dígito 0; não encontrei essa regra no material da Receita que li e não abri o código do Serpro. Confirme nesse material e transforme em caso de teste.
- **Minúsculas antes do cálculo.** Calculado sobre `12abc34501de`, o mesmo algoritmo não dá 35 (dá 05 se aplicada a regra de resto 0 ou 1), porque as letras minúsculas têm outro código. Se o sistema não normaliza antes de validar, rejeita um CNPJ válido.
- **Não invente lista de letras proibidas.** A Receita diz que bloqueia internamente algumas combinações, mas não publica a lista. O validador aceita A a Z e confere o DV.

## Busca e ordenação

Quem procura um fornecedor digita o CNPJ do jeito que tem em mãos. A busca deve achar `12.ABC.345/01DE-35`, `12ABC34501DE35` e `12abc34501de35`, e, se fizer sentido, parte do número. Busca pela raiz traz matriz e filiais.

Ordenação mista é decisão, não acidente. Em comparação por código de caractere, dígitos vêm antes de letras; o resultado real depende da configuração do banco (a *collation*). Documente a ordem esperada e confira se tela e exportação seguem a mesma. Os detalhes do contrato de busca estão em [busca e filtros no sistema](https://tornostudio.com/blog/busca-filtros-sistema-resultados/).

## Integrações e arquivos de terceiros

**NF-e.** A Nota Técnica 2026.004, da Receita Federal com o ENCAT e o CGIBS, altera os schemas da NF-e e da NFC-e para o CNPJ alfanumérico. Li a nota por resumos, não pelo PDF oficial: segundo o [resumo da versão 1.00](https://notagateway.com.br/?p=12475), os campos de CNPJ (emitente, destinatário, transportador, documentos referenciados, entre outros) e a chave de acesso de 44 posições passam a aceitar caracteres; segundo o [resumo da versão 1.01](https://inventti.com.br/nt-2026-004-v1-01-e-publicada-sefaz-complementa-adequacoes-para-o-cnpj-alfanumerico-na-nf-e-e-nfc-e/), a produção ficou em 1º de julho de 2026. Confira a versão vigente no Portal Nacional da NF-e. Mesmo que seu sistema não emita nota, ele pode ler XML de fornecedores, extrair o CNPJ da chave de acesso ou guardar a chave numa coluna numérica. Se a emissão é de um terceiro, o artigo sobre [IBS e CBS na NF-e](https://tornostudio.com/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/) ajuda a dividir responsabilidades.

**Planilhas e CSV.** Planilha trata o que parece número como número. Num teste feito para este artigo, converti um CSV para planilha com o LibreOffice em modo headless, com o filtro de importação padrão: `00123456000149` virou `123456000149`, e o CNPJ fictício `12345678000E23`, que tem um único `E` entre dígitos, virou o número 1,2345678E+33. Um CNPJ alfanumérico pode, portanto, ser lido como notação científica. Não testei o Excel; teste o programa que sua equipe usa. Na importação, o sistema lê a coluna como texto e recusa a linha se o valor não tem 14 caracteres válidos, com a devolutiva descrita em [importação de planilhas](https://tornostudio.com/blog/importacao-planilhas-sistema-tratar-erros/).

**APIs e parceiros.** Se a sua API publica o CNPJ como número, mudar para texto é uma mudança incompatível para quem consome: combine versão e prazo, como em [versionamento de API](https://tornostudio.com/blog/versionamento-api-integracao-aceite/). Do outro lado, se um parceiro só aceita números, o sistema precisa parar com erro claro e o registro ficar pendente, sem remover as letras, truncar ou trocar por zeros.

## Relatórios e exportações

Relatório é onde o problema aparece por último. Confira colunas com largura fixa, PDFs que cortam o campo, filtros por faixa numérica e exportações que tiram a máscara e deixam o arquivo virar número na planilha de quem recebe. A exportação sai com o CNPJ como texto, completo, e quem abre o arquivo vê o mesmo valor que está na tela; o roteiro está em [exportação de dados](https://tornostudio.com/blog/exportacao-dados-sistema-aceite/).

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** Todos os CNPJs abaixo são de teste, com DV calculado pelo algoritmo publicado, e não identificam empresas. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Cadastrar 12.ABC.345/01DE-35 | Aceito; gravado como `12ABC34501DE35`; exibido com máscara | Tela e registro no banco |
| Digitar `12ABC34501DE35`, sem máscara | Mesmo registro e mesma forma canônica | Registro no banco |
| Colar ` 12.abc.345/01de-35 ` com espaços e minúsculas | Conforme a regra escrita: normaliza para `12ABC34501DE35` ou rejeita com mensagem; nunca grava minúsculas | Tela e registro |
| Cadastrar 12.ABC.345/01DE-36 | Rejeitado com mensagem de dígito verificador | Mensagem na tela |
| Cadastrar 12.ABC.345/01DE-3A | Rejeitado: dígitos verificadores só numéricos | Mensagem na tela |
| Cadastrar o numérico 11.222.333/0001-81 | Aceito como antes | Tela e registro |
| Cadastrar 12.ABC.345/01DA-01 (primeiro resto 0) | Aceito, se a regra de resto 0 ou 1 confirmada for DV 0 | Cálculo anexado e tela |
| Cadastrar 00.123.456/0001-49 | Zeros à esquerda preservados na tela, no banco e na exportação | Registro e arquivo exportado |
| Cadastrar de novo 12.ABC.345/01DE-35, com outra formatação | Bloqueado como duplicado | Mensagem e banco sem segundo registro |
| Pedido de cliente com CNPJ alfanumérico | Gravado e consultado com a ligação ao cliente | Consulta do pedido |
| Buscar `ABC345`, `12.ABC` e a raiz `12ABC345` | Encontra o cadastro; a raiz traz matriz e filiais | Resultado da busca |
| Ordenar lista com numéricos e alfanuméricos | Ordem documentada, igual na tela e na exportação | Tela e arquivo |
| Importar CSV com `12345678000E23` e `00123456000149` | Valores gravados idênticos ao arquivo | Recibo da importação e banco |
| Ler XML de NF-e de homologação com emitente alfanumérico | CNPJ e chave de acesso lidos e ligados ao fornecedor certo | Registro da leitura |
| Enviar CNPJ alfanumérico a parceiro que só aceita números | Erro claro, registro pendente, nada truncado | Log da integração |
| Exportar relatório de clientes | CNPJ completo, como texto, sem corte | Arquivo aberto na planilha da equipe |

*Fim do exemplo fictício. CNPJs, regras de normalização e ordenação e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue.*

## Perguntas frequentes

### Preciso trocar o CNPJ da minha empresa?

Não. Segundo a Receita Federal, os CNPJs existentes continuam válidos e não são alterados. A adaptação é para o sistema lidar com os CNPJs de terceiros e com novas inscrições.

### Basta trocar a validação do dígito verificador?

Não. A validação é uma estação. Se a coluna do banco for numérica, se a planilha converter o valor ou se a integração recusar letras, o CNPJ quebra em outro ponto. Por isso o inventário vem antes.

### Posso guardar com máscara?

Pode exibir com máscara, mas guarde a forma canônica de 14 caracteres. Guardar com e sem máscara no mesmo campo quebra a unicidade e a busca.

### Até quando o sistema vai receber CNPJ numérico?

Sem data de fim. A Receita diz que novas inscrições ainda podem receber CNPJ numérico, e os existentes não mudam. Os dois formatos convivem.

Para mapear onde o CNPJ vive no seu sistema e transformar a adequação em escopo e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a lista de cadastros, integrações e planilhas que usam CNPJ, sem dados reais de clientes.

*Fontes consultadas em 10 de novembro de 2026: Receita Federal (Perguntas e Respostas do CNPJ alfanumérico), Serpro, Agência Gov e resumos secundários da Nota Técnica 2026.004 (Nota Gateway e Inventti); o texto da IN RFB 2.229/2024 e o PDF oficial da nota técnica não foram abertos. Este artigo não é parecer contábil, fiscal ou jurídico e não recomenda ferramenta nem fornecedor; CNPJs e cenários são modelos editoriais fictícios.*
