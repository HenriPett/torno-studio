---
content_id: torno-artigo-pt-20261111-documentos-pdf
intent_id: buyer-pdf-document-generation-templates-acceptance-pt
locale: pt-BR
type: artigo
status: approved
working_title: 'Gerar documentos em PDF no sistema: o que definir e testar nos modelos'
h1: 'Gerar documentos em PDF no sistema: o que definir e testar nos modelos'
seo_title: 'Gerar documentos em PDF no sistema: modelos e aceite | Torno'
seo_description: 'Dados congelados na emissão, versão do modelo, numeração, tabelas longas, acentos e R$, PDF/A, acessibilidade e segunda via: o que testar antes do aceite.'
summary: 'Roteiro para quem contrata ou mantém um sistema que gera propostas, orçamentos, contratos e recibos em PDF a partir de modelos: o que definir e testar na emissão — dados congelados no momento da emissão versus dados atuais do cadastro, versão do modelo, numeração, quebra de página com tabelas e textos longos, fontes embutidas e caracteres como acentos, ç e R$, PDF/A para arquivamento, acessibilidade com PDF marcado (PDF/UA), tamanho e tempo de geração, segunda via, correção e trilha, envio por e-mail ou link com validade, com referências da ISO, da Library of Congress, do Conarq, do W3C e da PDF Association e critérios de aceite sobre um exemplo fictício.'
primary_question: O que a empresa precisa definir e testar, antes de aceitar um sistema que gera documentos em PDF a partir de modelos, para que cada documento emitido saia completo, legível, numerado, rastreável e igual a si mesmo quando for consultado ou reenviado depois?
proposed_path: /blog/gerar-documentos-pdf-sistema-modelos-aceite/
canonical_url: https://tornostudio.com/blog/gerar-documentos-pdf-sistema-modelos-aceite/
url_owner: Torno Studio; destino editorial proposto, ainda não publicado.
audience: Donos e gestores comerciais, financeiros, administrativos e jurídicos que contratam ou mantêm sistema interno, ERP próprio, CRM sob medida ou portal que emite propostas, orçamentos, contratos, recibos ou relatórios em PDF, e quem vai implementá-lo.
buyer_stage: Especificação e aceite, antes de colocar a emissão de documentos em uso ou antes de trocar o modelo ou o motor de geração de um sistema em uso.
scope: Documento emitido como registro do momento da emissão; dados congelados versus dados atuais; versão do modelo; numeração e concorrência; quebra de página, tabelas longas, textos longos e campos vazios; fontes embutidas, acentos, ç, R$ e texto copiável; PDF/A para arquivamento e validação; acessibilidade com PDF marcado, PDF/UA e técnicas WCAG para PDF; tamanho e tempo de geração; segunda via, correção, cancelamento e trilha; envio por e-mail ou link com validade; referência da ISO 32000-2, ISO 19005, ISO 14289, Library of Congress, Conarq, Decreto 10.278/2020 e W3C; critérios de aceite com dados fictícios.
not_scope: Recomendação ou comparação de motor de PDF, biblioteca, editor de modelos ou fornecedor; parecer jurídico sobre validade de contrato, recibo ou documento digital; assinatura eletrônica (coberta em outro artigo); documentos fiscais como NF-e e NFS-e e seus leiautes oficiais (cobertos em outros artigos); leitura de dados de PDF recebido (coberta em outro artigo); exportação de dados em planilha (coberta em outro artigo); política de gestão documental ou tabela de temporalidade; auditoria completa de acessibilidade.
author_name: Henrique Pett
author_basis: Henrique Pett
created_at: '2026-11-11T21:12:00Z'
reviewer: Revisor editorial independente (agente Claude opus)
reviewed_at: '2026-11-11T21:20:46Z'
verified_at: null
release_approved_by: Integrador editorial (autorização do usuário)
release_approved_at: '2026-11-11T21:24:30Z'
release_approval_evidence: 'Revisão factual independente (agente Claude opus) NO-GO às 2026-11-11T21:20:46Z por quatro pontos (conector no resumo, figura da quebra de página sem o número da proposta na página 2, "dia 8" ambíguo, superlativo sem fonte), corrigidos pelo autor a pedido do integrador, com sugestões aplicadas ("podem fazer", cancelamento da última proposta, "Ltda.", numeração na falha); fontes ISO 32000-2:2020 (página da ISO), PDF Association (acesso sem custo à ISO 32000-2 e PDF/UA-2), Library of Congress (PDF/A e PDF/A-2), Conarq Orientação Técnica nº 4, Decreto 10.278/2020 (Senado e anexo na Câmara), W3C técnicas PDF6 e PDF9 e veraPDF abertas em 11/11/2026; sem revisão pessoal atribuída a Henrique; não recomenda ferramenta nem fornecedor; não é parecer jurídico; diff final sujeito a revisão final independente.'
first_published_at: null
last_substantive_update_at: null
evidence_of_publication: null
indexation_observation: null
translation_of: null
translation_status: Sem versão EN.
internal_links:
  - path: https://tornostudio.com/blog/assinatura-eletronica-sistema-status-documento-aceite/
    reason: Detalha a assinatura e os estados do documento depois de emitido; aqui o foco é a emissão do PDF a partir do modelo.
  - path: https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/
    reason: Trata o caminho inverso, ler dados de um PDF recebido; aqui o sistema produz o PDF.
  - path: https://tornostudio.com/blog/exportacao-dados-sistema-aceite/
    reason: Trata a exportação de dados para análise em planilha; aqui o arquivo é um documento para o cliente.
  - path: https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/
    reason: Detalha estados de envio, falha e reenvio do e-mail que leva o documento.
  - path: https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/
    reason: Detalha o conteúdo do registro de quem emitiu, reemitiu, corrigiu ou enviou.
  - path: https://tornostudio.com/blog/acessibilidade-software-sob-medida-aceite/
    reason: Explica como especificar e demonstrar acessibilidade no aceite; aqui ela aparece aplicada ao PDF.
  - path: https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/
    reason: Ajuda a garantir que o total do PDF seja o mesmo da tela e do banco.
  - path: https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/
    reason: Ajuda a definir em qual fuso horário a data e a hora de emissão aparecem.
  - path: https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/
    reason: Mostra por que o documento emitido não é reescrito quando o cadastro muda ou é mesclado e trata nomes com acento decomposto.
  - path: https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/
    reason: Ajuda a definir quem pode emitir, corrigir, cancelar e baixar cada tipo de documento.
  - path: https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/
    reason: Trata arquivos enviados por usuários; aqui o arquivo é gerado pelo sistema, mas consulta e permissão seguem regras parecidas.
  - path: https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/
    reason: Documento fiscal tem regras próprias de emissão e numeração, fora do escopo deste artigo.
  - path: https://tornostudio.com/blog/criterios-aceite-mvp/
    reason: Explica como transformar regras em critérios de aceite verificáveis.
  - path: https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/
    reason: Orienta a preparar o ambiente de teste com clientes e documentos fictícios.
  - path: https://tornostudio.com/diagnostico/
    reason: Conversa inicial para transformar os documentos que o sistema emite em regras e cenários de teste.
claims_and_sources:
  - classification: FATO
    claim: 'A ISO 32000-2:2020 é a parte 2 da norma do formato PDF (PDF 2.0), segunda edição, publicada em dezembro de 2020; a página da ISO informa que foi revista e confirmada em 2026 e que a norma não trata de métodos de conversão nem de validação de conformidade.'
    reference: https://www.iso.org/standard/75839.html
    entity: ISO, ISO 32000-2:2020 Document management — Portable document format — Part 2 PDF 2.0
    source_date: '2020-12-01'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Lida a página de catálogo da ISO, não o texto integral da norma; mês de publicação informado pela ISO, dia não informado.
  - classification: FATO
    claim: 'Segundo a PDF Association, desde 05/04/2023 a ISO 32000-2 (PDF 2.0) está disponível sem custo, com patrocínio de Adobe, Apryse e Foxit.'
    reference: https://pdfa.org/announcing-no-cost-access-to-iso-32000-2-pdf-2-0/
    entity: PDF Association, Announcing no-cost access to ISO 32000-2 (PDF 2.0)
    source_date: '2023-04-05'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Anúncio da entidade; o artigo não cita os patrocinadores para não sugerir fornecedor.
  - classification: FATO
    claim: 'Segundo a Library of Congress, a família PDF/A (ISO 19005) é uma forma restrita do PDF para preservação de longo prazo; em PDF/A-1 a PDF/A-3 todas as fontes devem estar embutidas e ser legalmente embutíveis, criptografia não é permitida, JavaScript e execução de arquivos são proibidos e cores devem ser especificadas de modo independente de dispositivo; PDF/A-1 (2005) se baseia no PDF 1.4, PDF/A-2 (2011) e PDF/A-3 (2012) na ISO 32000-1, e PDF/A-4 (2020) na ISO 32000-2; PDF/A-3 permite embutir arquivos de qualquer formato; PDF/A-4 abandona os níveis A, B e U.'
    reference: https://loc.gov/preservation/digital/formats/fdd/fdd000318.shtml
    entity: Library of Congress, Sustainability of Digital Formats, PDF/A Family (fdd000318)
    source_date: '2024-05-08'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Descrição técnica de uma biblioteca nacional, não o texto da ISO 19005; lida a primeira parte da página.
  - classification: FATO
    claim: 'Segundo a Library of Congress, no PDF/A-2 o nível A atende a todos os requisitos e exige marcação de estrutura (tags); o nível B cobre só a aparência visual e é adequado a documentos digitalizados de papel; o nível U é o B com exigência de equivalente Unicode para todo o texto, sem exigir tags.'
    reference: https://loc.gov/preservation/digital/formats/fdd/fdd000319.shtml
    entity: Library of Congress, Sustainability of Digital Formats, PDF/A-2 (fdd000319)
    source_date: '2022-07-29'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Descrição técnica, não o texto da ISO 19005-2.
  - classification: FATO
    claim: 'A Orientação Técnica nº 4 do Conarq (outubro de 2016), dirigida aos órgãos e entidades do Sistema Nacional de Arquivos, recomenda preferencialmente o PDF/A-1 para arquivamento, PDF/A-2 quando for necessária assinatura digital avançada, não converter entre subtipos, verificar licenças das fontes embutidas, definir perfis de uso para arquivos associados no PDF/A-3 e usar validador de conformidade.'
    reference: https://www.gov.br/conarq/pt-br/assuntos/camaras-tecnicas-setoriais-inativas/camara-tecnica-de-documentos-eletronicos-ctde/Orientacao_tecnica_4.pdf
    entity: Conselho Nacional de Arquivos (Conarq), Câmara Técnica de Documentos Eletrônicos, Orientação Técnica nº 4
    source_date: '2016-10-01'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Orientação para o SINAR, de câmara técnica hoje listada como inativa; não é norma obrigatória para empresas privadas.
  - classification: FATO
    claim: 'O Decreto nº 10.278/2020 estabelece técnica e requisitos para a digitalização de documentos físicos; o art. 2º, parágrafo único, I, exclui os documentos nato-digitais, e o Anexo I indica PDF/A como formato para textos impressos e manuscritos digitalizados.'
    reference: https://legis.senado.leg.br/norma/31990460/publicacao/31991288
    entity: Senado Federal (Legislação), Decreto nº 10.278, de 18 de março de 2020; Anexo I conferido em https://www2.camara.leg.br/legin/fed/decret/2020/decreto-10278-18-marco-2020-789857-anexo-pe.pdf
    source_date: '2020-03-18'
    checked_at: '2026-11-11T21:00:00Z'
    limit: 'A página do Planalto recusou o acesso automatizado; texto lido no Senado e anexo no espelho da Câmara. Não se aplica ao PDF gerado pelo sistema. Não é parecer jurídico.'
  - classification: FATO
    claim: 'Segundo a PDF Association, a ISO 14289-2:2024 (PDF/UA-2) define o uso de PDF marcado (tagged PDF) em arquivos PDF 2.0, permite produzir PDF 2.0 conforme às WCAG e sucede a ISO 14289-1:2014 (PDF/UA-1); a própria página adverte que conformidade com PDF/UA-2 não garante, sozinha, a acessibilidade do conteúdo.'
    reference: https://pdfa.org/iso-14289-2-pdfua-2/
    entity: PDF Association, ISO 14289-2 (PDF/UA-2)
    source_date: null
    checked_at: '2026-11-11T21:00:00Z'
    limit: Página sem data; descrição da entidade que desenvolve a norma, não o texto da ISO.
  - classification: FATO
    claim: 'As técnicas do W3C para WCAG PDF9 e PDF6 descrevem, em PDF marcado, títulos com as tags H e H1 a H6 e tabelas com Table, TR, TH e TD, ligados ao critério 1.3.1 (Informações e Relações).'
    reference: https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF9.html
    entity: W3C WAI, Techniques for WCAG 2.2, PDF9 (atualizada em 26/01/2026); PDF6 em https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF6.html (atualizada em 25/09/2025)
    source_date: '2026-01-26'
    checked_at: '2026-11-11T21:00:00Z'
    limit: Técnicas são exemplos suficientes, não a única forma de atender ao critério.
  - classification: FATO
    claim: 'O veraPDF é um validador de código aberto de todas as partes e níveis do PDF/A e das partes 1 e 2 do PDF/UA, mantido por consórcio liderado pela Open Preservation Foundation e pela PDF Association.'
    reference: https://verapdf.org/home/
    entity: veraPDF, About veraPDF
    source_date: null
    checked_at: '2026-11-11T21:00:00Z'
    limit: Citado como exemplo de validador, não recomendação; validação automática não substitui leitura humana.
  - classification: FATO
    claim: 'A documentação de um conversor comercial de HTML para PDF descreve a repetição automática do cabeçalho e do rodapé da tabela (thead e tfoot) quando a tabela ocupa várias páginas, com opção para desligar.'
    reference: https://www.essentialobjects.com/doc/pdf/htmltopdf/table_header.aspx
    entity: Essential Objects, EO.Pdf, Repeating table header and footer
    source_date: null
    checked_at: '2026-11-11T21:00:00Z'
    limit: Exemplo de comportamento documentado de um produto; o artigo não cita o nome nem recomenda o produto; outros motores se comportam de outro modo.
  - classification: HIPÓTESE
    claim: 'A empresa Cozinhas Exemplo Ltda., a cliente Padaria Ribeiro ME, a proposta P-2026-0147, o recibo R-0412, endereços, valores, versões de modelo, a numeração, a janela de 7 dias do link, o limite de 2 MB, a escolha de PDF/A-2a e os critérios de aceite são modelo editorial fictício; as regras de emissão, numeração, segunda via e correção são proposta de modelagem, não exigência legal nem comportamento padrão de ferramenta.'
    reference: Modelo editorial deste artigo.
    entity: Torno Studio
    limit: Não representam cliente, sistema entregue, teste executado nem recomendação de ferramenta ou fornecedor.
---

*Leitura estimada: 12 minutos.*

**Para aceitar um sistema que gera documentos em PDF, exija três decisões por escrito: que o documento emitido é uma fotografia (guarda os dados e a versão do modelo daquele momento e não muda depois), como o número nasce e nunca se repete, e como o modelo se comporta quando o conteúdo não cabe.** No aceite, peça para ver isso com dados fictícios: uma proposta de 20 itens que quebra de página com o cabeçalho repetido, um nome com acento e "ç" que sai igual ao ser copiado do PDF, uma segunda via idêntica ao original mesmo depois de o cadastro mudar e uma correção que gera documento novo sem apagar o antigo.

**Este artigo não recomenda ferramenta nem fornecedor e não é parecer jurídico.** Normas e documentação citadas são referência técnica; o que vale como documento para o seu negócio e para os seus contratos é decisão sua, com o jurídico e o contador.

## Documento emitido é fotografia, não espelho do cadastro

A pergunta que mais evita problema é simples: **quando alguém abrir este recibo daqui a um ano, ele mostra o que foi entregue ao cliente ou o que está no cadastro hoje?**

Um sistema que gera o PDF na hora da consulta, sempre a partir do banco, responde "o que está no cadastro hoje". Se o cliente mudou de endereço, o recibo antigo passa a mostrar o endereço novo. Se o preço do produto mudou, a proposta antiga passa a mostrar outro total. Se o nome da empresa mudou de "ME" para "Ltda.", o contrato antigo muda junto. O cliente tem um arquivo; o sistema mostra outro, com o mesmo número.

Escreva a regra: no momento da **emissão**, o sistema grava o arquivo gerado e, se for útil, os dados usados para gerá-lo (cliente, itens, valores, condições, versão do modelo). A partir daí, consultar, baixar ou enviar de novo usa o arquivo guardado. Guarde também uma impressão digital do arquivo (um hash, como SHA-256) para provar, no aceite e depois, que o arquivo não mudou.

Separe **rascunho** de **emitido**. Enquanto é rascunho, a proposta pode refletir o cadastro atual e o modelo atual; ao emitir, congela. Defina o que dispara a emissão: um botão, a aprovação interna, o envio ao cliente. O mesmo vale para documentos ligados ao cadastro do cliente: como em [cadastro duplicado de clientes](https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/), mesclar ou corrigir o cadastro não reescreve documento emitido.

![Ilustração de uma fotografia instantânea do recibo fictício R-0412, Padaria Ribeiro ME, Rua das Acácias, 120, valor R$ 1.980,00, serviço de instalação, modelo versão 2, emitido em 03/11/2026 às 14:05, arquivo guardado. Ao lado, o cadastro em 10/11/2026 mostra Padaria Ribeiro Ltda. e Av. Brasil, 455, endereço que mudou em 07/11. Abaixo, a pergunta: alguém pede o recibo de 03/11 de novo. Reabrir ou tirar segunda via entrega o mesmo arquivo de 03/11, com Rua das Acácias, modelo 2 e hash igual. Regerar com o cadastro de hoje está errado: daria um recibo de 03/11 com o endereço de 10/11, documento diferente com o mesmo número. Corrigir de verdade gera o novo documento R-0412-A, com motivo, e o original fica marcado como substituído. Exemplo fictício.](./torno-pdf-fotografia-emissao.svg)

*Exemplo fictício: empresa, endereços, valores e datas inventados; o documento emitido guarda os dados do momento da emissão. Ilustração original Torno Studio, 2026.*

## Versão do modelo: quem muda o quê e quando vale

O modelo é o desenho do documento: logotipo, textos fixos, cláusulas, campos, tabelas, rodapé. Ele muda: a cláusula de reajuste foi reescrita, o endereço da empresa mudou, o jurídico pediu uma linha nova no contrato. Combine:

- **Quem pode editar o modelo** e se a edição passa por aprovação antes de valer. Um modelo de contrato editado por qualquer usuário é um contrato que qualquer usuário pode mudar.
- **Versão numerada**, com data de início de vigência. Cada documento emitido registra a versão usada.
- **O que acontece com rascunhos** abertos quando sai uma versão nova: passam para a nova ou ficam na antiga até alguém decidir.
- **Pré-visualização com dados de teste** antes de publicar a versão, incluindo os casos difíceis deste artigo.
- **Campos que o modelo usa** e o que fazer quando um deles não existe no registro: esconder a linha, mostrar "—" ou bloquear a emissão. "Prezado {nome_contato}" impresso literalmente no PDF é um defeito comum de modelo.

Se o modelo é editado por pessoas de negócio num editor visual, peça também limites: o que o editor deixa mudar (texto, ordem, logotipo) e o que fica fixo (numeração, total, dados obrigatórios).

## Numeração: quando o número nasce e o que acontece com ele

Proposta, orçamento, contrato e recibo costumam ter número próprio. Decida e escreva:

1. **Formato e sequência.** Por tipo de documento, por ano, por empresa (num sistema com várias empresas, cada uma tem a sua sequência?).
2. **Quando o número nasce.** No rascunho ou só na emissão. Número no rascunho gera buracos quando rascunhos são descartados; número na emissão evita isso.
3. **Buracos e cancelamento.** Um documento cancelado mantém o número, marcado como cancelado; o número não é reaproveitado.
4. **Concorrência.** Duas pessoas emitindo ao mesmo tempo não podem receber o mesmo número. Isso se garante no banco de dados, não na tela.
5. **Repetição.** Se a geração falha e alguém clica de novo, o sistema não pode consumir número para a tentativa que falhou nem um segundo número para o mesmo documento.

Documentos fiscais (NF-e, NFS-e) têm numeração, leiaute e emissão definidos pelas regras fiscais e não são gerados por um modelo livre do sistema; veja [NFS-e de padrão nacional](https://tornostudio.com/blog/nfse-padrao-nacional-sistema-integracao-aceite/). Este artigo trata dos documentos comerciais e administrativos que a própria empresa desenha.

## Quebra de página, tabelas longas e textos que não cabem

Um modelo bonito com três itens pode virar um documento ilegível com quarenta. Especifique o comportamento quando o conteúdo cresce:

- **Tabela que passa de página.** O cabeçalho da tabela se repete em cada página? Uma linha pode ser cortada ao meio ou passa inteira para a página seguinte? O total pode ficar sozinho no topo de uma página? Motores de geração se comportam de modos diferentes: a documentação de um conversor comercial de HTML para PDF, por exemplo, [descreve a repetição automática do cabeçalho e do rodapé da tabela](https://www.essentialobjects.com/doc/pdf/htmltopdf/table_header.aspx) quando ela ocupa várias páginas, com opção para desligar. Não presuma; peça para ver.
- **Identificação em cada página.** Número do documento e "página X de Y" no cabeçalho ou rodapé, para que uma página solta ainda diga de onde veio.
- **Textos longos.** Nome de cliente com 120 caracteres, descrição de item com cinco linhas, observação de três páginas, endereço de e-mail ou link sem espaço que não quebra. O texto quebra a linha, é cortado ou empurra a tabela para fora da margem?
- **Campos vazios e opcionais.** Desconto zero aparece como "R$ 0,00" ou some? Cliente sem complemento de endereço deixa uma vírgula sobrando?
- **Assinaturas e blocos que não devem se separar.** O espaço de assinatura não pode ficar sozinho numa página sem nenhuma cláusula; o título de uma seção não pode ficar no pé da página, separado do texto.

![Ilustração de uma tabela de proposta que quebra entre duas páginas, com a proposta fictícia P-2026-0147 de 20 itens. Em cima, sem regra de quebra: a linha 19, Instalação elétrica, 1, 3.480,00, é cortada ao meio pela quebra de página, e a página 2 começa sem cabeçalho e sem número de página, só com a linha 20, Treinamento da equipe, e o total de R$ 34.430,00; a legenda em vermelho diz que a página 2 não informa quais são as colunas nem de qual proposta é. Embaixo, com regra de quebra: a página 1 termina na linha 18 com P-2026-0147, página 1 de 2, e continua na página 2; a página 2 repete o cabeçalho Descrição, Qtd e Valor (R$), traz a linha 19 inteira, a linha 20 e o total, com P-2026-0147, página 2 de 2, no rodapé. Exemplo fictício.](./torno-pdf-folha-quebra.svg)

*Exemplo fictício: proposta, itens e valores inventados; a regra de quebra decide onde a tabela continua e o que se repete em cada página. Ilustração original Torno Studio, 2026.*

Os valores impressos precisam ser os mesmos da tela e do banco, com a mesma regra de arredondamento; veja [valores monetários no sistema](https://tornostudio.com/blog/valores-monetarios-arredondamento-sistema/). A data e a hora de emissão precisam de fuso definido, como em [datas e fusos no sistema](https://tornostudio.com/blog/datas-fusos-sistema-prazos-relatorios/): um recibo emitido às 22h30 de São Paulo não pode sair com a data do dia seguinte.

## Fontes, acentos, ç e R$: o texto precisa sair e voltar igual

Um PDF pode parecer certo na tela de quem o gerou e sair com quadrados no lugar de "ç" e "ã" na tela do cliente, ou trocar as aspas e o travessão. Peça três coisas:

- **Fontes embutidas no arquivo**, para que o documento não dependa das fontes instaladas no computador de quem abre. Confira a licença da fonte: nem toda fonte comercial permite ser embutida em arquivo distribuído, e a [Orientação Técnica nº 4 do Conarq](https://www.gov.br/conarq/pt-br/assuntos/camaras-tecnicas-setoriais-inativas/camara-tecnica-de-documentos-eletronicos-ctde/Orientacao_tecnica_4.pdf) lembra de verificar as licenças das fontes embutidas.
- **Todos os caracteres do seu uso real**: á, à, â, ã, é, ê, í, ó, ô, õ, ú, ç em maiúsculas e minúsculas, "R$" com o espaço que não separa o símbolo do valor na quebra de linha, "nº", "º", "ª", "§", aspas curvas, travessão e, se houver clientes estrangeiros, nomes em outros alfabetos. Nomes colados de outro sistema podem chegar com acento decomposto; a forma única desses textos está em [cadastro duplicado de clientes](https://tornostudio.com/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/).
- **Texto que pode ser copiado e buscado.** Selecione um trecho do PDF, cole num editor de texto e compare: "Padaria Ribeiro — São João" precisa voltar igual. Se o PDF é uma imagem do texto, a busca, a leitura por leitor de tela e a cópia não funcionam.

## PDF/A para arquivamento: quando pedir e como conferir

O PDF comum é definido pela ISO 32000; a [ISO 32000-2:2020](https://www.iso.org/standard/75839.html) é o PDF 2.0, e a PDF Association informa que ela [está disponível sem custo](https://pdfa.org/announcing-no-cost-access-to-iso-32000-2-pdf-2-0/) desde 2023. O **PDF/A** (ISO 19005) é uma forma restrita do PDF feita para preservação: o arquivo precisa conter tudo o que é necessário para ser exibido do mesmo jeito no futuro.

Segundo a [descrição da Library of Congress](https://loc.gov/preservation/digital/formats/fdd/fdd000318.shtml), nas partes 1 a 3 do PDF/A todas as fontes devem estar embutidas e ser legalmente embutíveis, criptografia não é permitida, JavaScript e execução de arquivos são proibidos e as cores precisam ser definidas de modo independente do dispositivo. As partes são PDF/A-1 (2005, baseada no PDF 1.4), PDF/A-2 (2011) e PDF/A-3 (2012), baseadas no PDF 1.7, e PDF/A-4 (2020), baseada no PDF 2.0; o PDF/A-3 permite embutir arquivos de qualquer formato dentro do PDF.

Para o PDF/A-2, a [Library of Congress](https://loc.gov/preservation/digital/formats/fdd/fdd000319.shtml) descreve três níveis: **B** garante a aparência; **U** é o B com equivalente Unicode para todo o texto (o que ajuda a busca e a cópia); **A** atende a todos os requisitos e exige a marcação de estrutura do documento. O PDF/A-4 abandonou esses níveis.

O que decidir:

- **Se precisa de PDF/A e para quais documentos.** Um contrato que fica guardado por anos é candidato; um orçamento que vale 15 dias talvez não. Converse com quem cuida do arquivo da empresa.
- **Qual parte e nível.** Para órgãos do Sistema Nacional de Arquivos, a orientação do Conarq de 2016 recomenda preferencialmente o PDF/A-1 para arquivamento, PDF/A-2 quando for necessária assinatura digital avançada, e não converter entre subtipos. Para empresa privada, ela é referência, não obrigação.
- **Como conferir.** "Salvo como PDF/A" no nome do arquivo não prova nada. Peça a validação de uma amostra num validador de conformidade; o [veraPDF](https://verapdf.org/home/), por exemplo, é um validador de código aberto para todas as partes do PDF/A, mantido por consórcio liderado pela Open Preservation Foundation e pela PDF Association.
- **Conflitos com outras exigências.** Nas partes 1 a 3, o PDF/A não aceita criptografia; se o documento precisa de senha para abrir, ele não será PDF/A dessas partes. Se a assinatura digital será aplicada depois, veja com o fornecedor de assinatura se o arquivo continua conforme; o fluxo de assinatura está em [assinatura eletrônica no sistema](https://tornostudio.com/blog/assinatura-eletronica-sistema-status-documento-aceite/).

Uma confusão comum: o [Decreto nº 10.278/2020](https://legis.senado.leg.br/norma/31990460/publicacao/31991288) trata da **digitalização** de documentos físicos e seu [Anexo I](https://www2.camara.leg.br/legin/fed/decret/2020/decreto-10278-18-marco-2020-789857-anexo-pe.pdf) indica PDF/A para textos digitalizados, mas o próprio decreto exclui os documentos nato-digitais (art. 2º, parágrafo único, I). A proposta gerada pelo sistema já nasce digital; esse decreto não é a regra dela. Confirme com o jurídico o que se aplica ao seu caso.

## Acessibilidade: PDF com estrutura, não só aparência

Um PDF pode ter a aparência certa e, para um leitor de tela, ser uma sequência de textos soltos, sem saber o que é título, o que é tabela e em que ordem ler. O que resolve é o **PDF marcado** (tagged PDF): uma estrutura dentro do arquivo que diz o que é cada parte.

As técnicas do W3C para as WCAG descrevem, por exemplo, [títulos marcados com as tags H1 a H6](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF9.html) e [tabelas com Table, TR, TH e TD](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF6.html), para que a relação entre cabeçalho e célula não se perca. A norma de acessibilidade do PDF é a ISO 14289 (PDF/UA); segundo a [PDF Association](https://pdfa.org/iso-14289-2-pdfua-2/), a PDF/UA-2, de 2024, define o uso de PDF marcado no PDF 2.0 e sucede a PDF/UA-1; a própria página adverte que estar conforme à PDF/UA-2 não garante, sozinho, que o conteúdo seja acessível.

Para o aceite, combine: quais documentos precisam ser acessíveis (o recibo que vai ao cliente final é um bom candidato), se o arquivo sai marcado, com idioma e título definidos, se a ordem de leitura segue a ordem visual, se o logotipo tem texto alternativo ou é marcado como decorativo, e se alguém usa um leitor de tela para ler um documento de exemplo do começo ao fim. Como especificar e demonstrar acessibilidade está em [acessibilidade no software sob medida](https://tornostudio.com/blog/acessibilidade-software-sob-medida-aceite/).

## Tamanho do arquivo e tempo de geração

Logotipo em alta resolução repetido em cada página, fotos de produtos sem compressão e fontes completas embutidas podem fazer uma proposta de duas páginas pesar dezenas de megabytes. Defina um limite por tipo de documento, coerente com o canal: se vai como anexo de e-mail, ele precisa caber no limite do seu provedor e do provedor do cliente. Peça para ver o tamanho do documento mais pesado do exemplo, não do mais leve.

Também defina o tempo: um recibo de uma página pode sair na hora; um relatório de 300 páginas talvez precise ser gerado em segundo plano, com estado "gerando", "pronto" ou "falhou" e aviso quando terminar. Se falhar, o usuário vê a falha e pode tentar de novo, sem número duplicado e sem documento pela metade marcado como emitido.

## Segunda via, correção, cancelamento e trilha

Três ações costumam ser confundidas:

- **Segunda via**: o mesmo arquivo emitido, com o mesmo hash. Se o modelo exige a marca "2ª via", decida se ela é aplicada num arquivo novo (e então o arquivo original continua guardado sem alteração) ou só no nome do arquivo baixado.
- **Correção**: documento novo, com número ligado ao original (por exemplo, R-0412-A), motivo registrado, e o original marcado como substituído, sem ser apagado.
- **Cancelamento**: o documento fica guardado, marcado como cancelado, com motivo, e o número não é reaproveitado.

Registre quem emitiu, quando, com qual versão do modelo, o hash do arquivo, quem baixou, reenviou, corrigiu ou cancelou. O conteúdo desse registro está em [trilha de auditoria](https://tornostudio.com/blog/trilha-auditoria-sistema-requisitos-negocio/), e quem pode fazer cada ação, em [permissões de acesso](https://tornostudio.com/blog/permissoes-acesso-software-regras-negocio/).

## Envio por e-mail ou link com validade

O documento sai do sistema por anexo de e-mail, por link ou pelos dois. Decida:

- **Anexo ou link.** Anexo fica com o cliente para sempre, mas pesa e pode ser barrado; link permite controlar acesso, mas depende de o sistema estar no ar e de a regra de acesso funcionar.
- **Validade do link.** Por quanto tempo o link funciona, o que a pessoa vê quando ele expira (uma página que explica e oferece pedir um novo, não um erro técnico) e se o link expirado pode ser renovado sem gerar outro documento.
- **Quem pode abrir.** Qualquer pessoa com o link, ou só quem entrar com login? Link encaminhado por engano mostra o contrato a quem não devia?
- **Registro do envio.** Para qual endereço, quando, e o que aconteceu: aceito pelo provedor, devolvido, aberto pelo link. Estados de envio, falha e reenvio estão em [e-mails do sistema](https://tornostudio.com/blog/emails-sistema-envio-entrega-falha/).

Arquivos que o usuário anexa ao registro, como o contrato assinado devolvido pelo cliente, seguem as regras de [anexos no sistema](https://tornostudio.com/blog/anexos-sistema-envio-consulta-arquivos/). Ler dados de um PDF recebido é o caminho inverso, tratado em [OCR de PDF no sistema](https://tornostudio.com/blog/ocr-pdf-sistema-revisao-dados-aceite/); e levar dados para análise em planilha é [exportação de dados](https://tornostudio.com/blog/exportacao-dados-sistema-aceite/), não emissão de documento.

## Critérios de aceite com dados fictícios

**Início do exemplo fictício.** A Cozinhas Exemplo Ltda. emite propostas (modelo versão 3) e recibos (modelo versão 2) para a cliente Padaria Ribeiro ME. Proposta P-2026-0147 com 20 itens e total de R$ 34.430,00; recibo R-0412 emitido em 03/11/2026 às 14:05 (horário de São Paulo), endereço Rua das Acácias, 120, valor R$ 1.980,00. Em 07/11, o cadastro muda para Padaria Ribeiro Ltda., Av. Brasil, 455. Regras: o número nasce na emissão, por tipo e ano, sem reaproveitamento; documento emitido não muda; segunda via é o mesmo arquivo; correção gera novo documento com sufixo e marca o original como substituído; recibos e contratos saem em PDF/A-2a, o nível que exige estrutura marcada; anexo de e-mail até 2 MB; link de download vale 7 dias. Monte os cenários em [ambiente de homologação](https://tornostudio.com/blog/ambiente-homologacao-conferir-antes-testar-sistema/) e escreva cada um como em [critérios de aceite do MVP](https://tornostudio.com/blog/criterios-aceite-mvp/).

| Cenário | Resultado esperado | Evidência |
|---|---|---|
| Emitir P-2026-0147 com 20 itens | Tabela em 2 páginas; cabeçalho repetido na página 2; nenhuma linha cortada; "página X de Y" e número da proposta em cada página | PDF gerado |
| Item com descrição de 5 linhas e cliente com nome de 120 caracteres | Texto quebra dentro da coluna e da margem; nada cortado nem sobreposto | PDF gerado |
| Proposta sem desconto e cliente sem complemento de endereço | Linha de desconto e vírgula sobrando não aparecem, conforme o modelo | PDF gerado |
| Modelo com campo que não existe no registro | Emissão bloqueada com mensagem que indica o campo; nenhum "{campo}" impresso | Tela e registro |
| Nome "Padaria Ribeiro — São João", observação com "ç", "ã", "nº", aspas curvas e "R$ 1.980,00" | Todos os caracteres corretos; "R$" não separado do valor na quebra de linha | PDF aberto em dois leitores diferentes |
| Copiar o nome e o total do PDF e colar num editor de texto | Texto colado igual ao do cadastro e ao da tela | Captura do texto colado |
| Conferir as fontes do recibo R-0412 | Todas as fontes embutidas | Propriedades do arquivo |
| Validar R-0412 como PDF/A-2a | Validador sem erros de conformidade | Relatório do validador |
| Ler R-0412 com leitor de tela | Título, ordem de leitura e tabela anunciados corretamente; logotipo com texto alternativo ou ignorado | Gravação ou anotação do teste |
| Baixar a segunda via de R-0412 em 10/11, depois da mudança de cadastro | Mesmo arquivo de 03/11, com Rua das Acácias; hash igual ao registrado na emissão | Hash antes e depois |
| Publicar o modelo de recibo versão 3 e reabrir R-0412 | R-0412 continua no modelo versão 2; só novos recibos usam a versão 3 | Arquivo e registro da versão |
| Corrigir o valor de R-0412 | Novo R-0412-A com motivo; R-0412 marcado como substituído e ainda disponível | Lista de documentos e trilha |
| Cancelar a proposta P-2026-0148, a última emitida | Documento marcado como cancelado; próxima proposta recebe P-2026-0149 | Lista de documentos |
| Duas pessoas emitem propostas no mesmo instante | Números diferentes e consecutivos; nenhum repetido | Duas sessões e registro no banco |
| Geração falha no meio e o usuário tenta de novo | Um único documento emitido; nenhum número consumido pela falha | Registro e lista de documentos |
| Gerar a proposta mais pesada do exemplo, com fotos dos itens | Arquivo até 2 MB; se passar, envio por link em vez de anexo | Tamanho do arquivo |
| Enviar R-0412 por e-mail com link e abrir o link 8 dias depois do envio | Página explica que o link expirou e permite pedir um novo; nenhum documento novo gerado | Tela e registro do envio |
| Consultar a trilha de R-0412 | Quem emitiu, quando, versão do modelo, hash, envios, downloads e a correção | Registro exportado |

*Fim do exemplo fictício. Empresas, cliente, documentos, valores, datas, versões, limites e critérios são um modelo editorial, não um teste executado, cliente real nem sistema entregue. As regras de numeração, segunda via, correção, PDF/A e validade do link são escolhas do exemplo, não exigência legal nem padrão de ferramenta.*

## Perguntas frequentes

### Preciso guardar o PDF ou basta guardar os dados para gerá-lo de novo?

Guardar só os dados exige que o modelo, as fontes e o motor de geração da época também sejam guardados e produzam exatamente o mesmo arquivo anos depois, o que é difícil de garantir. Guardar o arquivo emitido, com hash, é a forma mais direta de responder "o que o cliente recebeu". Os dados podem ser guardados junto, para busca e relatórios.

### Todo documento gerado precisa ser PDF/A?

Não necessariamente. PDF/A faz sentido para o que precisa ser guardado e aberto do mesmo jeito por muitos anos; tem restrições, como não aceitar criptografia nas partes 1 a 3. Decida por tipo de documento, com quem cuida do arquivo da empresa e, quando houver exigência legal, com o jurídico.

Para transformar os documentos que o seu sistema emite em regras e cenários de teste, leve à [conversa de diagnóstico com Henrique](https://tornostudio.com/diagnostico/) a lista de documentos (proposta, contrato, recibo), um exemplo anonimizado de cada um e o caminho que ele percorre até o cliente, sem dados reais de clientes.

*Fontes consultadas em 11 de novembro de 2026: ISO 32000-2:2020 (página da ISO), PDF Association (acesso à ISO 32000-2 e PDF/UA-2), Library of Congress (descrições de formato PDF/A e PDF/A-2), Conarq (Orientação Técnica nº 4), Decreto nº 10.278/2020 (Senado e anexo no espelho da Câmara), W3C (técnicas PDF6 e PDF9 para WCAG), veraPDF e documentação de um conversor comercial de HTML para PDF. Este artigo não recomenda ferramenta nem fornecedor e não é parecer jurídico; empresas, clientes, documentos e ilustrações são modelos editoriais fictícios.*
