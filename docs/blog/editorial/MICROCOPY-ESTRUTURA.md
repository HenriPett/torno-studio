# Microcopy da estrutura editorial — Torno Studio

> Mote · 14/10/2026 · Texto para revisão de Verso e repasse por Farol a Batuta/Compasso. Apenas estrutura; nenhum artigo, card ou placeholder público é autorizado por este arquivo.

## PT-BR

| Uso | Texto visível |
|---|---|
| Link no menu/rodapé | Blog |
| Título do índice (`/blog/`) | Blog |
| Introdução do índice | Textos sobre software sob medida, decisões de produto e o trabalho de colocar sistemas em produção. |
| Estado vazio | Ainda não há artigos publicados em português. |
| CTA do índice vazio: título | Tem um projeto em mente? |
| CTA do índice vazio: apoio | Conte o que precisa construir ou melhorar. Eu ajudo a definir o próximo passo. |
| Botão desse CTA | Agendar diagnóstico (45 min, grátis) |
| Navegação do artigo: início | Início |
| Navegação do artigo: índice | Blog |
| Voltar ao índice | Voltar ao blog |
| Autoria no artigo, se verificada | {nome do autor verificado} |
| Data inicial | Publicado em {data real de publicação} |
| Data de revisão | Atualizado em {data real de atualização} |
| CTA no artigo: título | Quer discutir o seu projeto? |
| CTA no artigo: apoio | Traga o contexto; eu ajudo a definir o escopo e o próximo passo. |
| Botão desse CTA | Agendar diagnóstico (45 min, grátis) |
| Bloco de outros artigos, se houver | Outros artigos |

## EN

| Use | Visible copy |
|---|---|
| Menu/footer link | Blog |
| Index title (`/en/blog/`) | Blog |
| Index introduction | Notes on custom software, product decisions, and getting systems into production. |
| Empty state | No articles are available in English yet. |
| Empty-index CTA: heading | Have a project in mind? |
| Empty-index CTA: body | Tell me what you need to build or improve. I can help define the next step. |
| CTA button | Book a 45-min scoping call (free) |
| Article breadcrumb: home | Home |
| Article breadcrumb: index | Blog |
| Return to index | Back to the blog |
| Article byline, if verified | {verified author name} |
| Original date | Published on {actual publication date} |
| Revision date | Updated on {actual update date} |
| Article CTA: heading | Want to discuss your project? |
| Article CTA: body | Share the context; I'll help define the scope and next step. |
| CTA button | Book a 45-min scoping call (free) |
| Related articles heading, when there are any | More articles |

## Regras de exibição para a implementação

- O índice vazio mostra a frase de estado vazio e o CTA; não mostra card, título de artigo, categoria, contagem, autor, data, paginação ou seção “Outros artigos” sem conteúdo publicado.
- Um artigo só aparece no índice, navegação e links relacionados depois de publicado e disponível no mesmo idioma. A versão EN não presume tradução de artigo PT.
- As chaves entre chaves acima indicam valores do artigo real para a equipe de implementação; nunca são texto público. Mostrar “Atualizado em” / “Updated on” somente quando houver revisão editorial posterior à publicação. Datas devem vir do conteúdo efetivamente publicado, no formato do idioma. Não usar data de build como data editorial.
- Byline aparece apenas em artigo real com autoria confirmada para aquele texto; se não houver autor verificado, omitir o campo. Usar “Henrique Pett” somente quando ele de fato for o autor. Breadcrumb aparece apenas em páginas de artigo reais. Não incluir link para o LinkedIn pessoal do fundador.
- O botão usa o destino de agendamento do idioma já configurado no site. Não apontar o CTA EN à landing `/diagnostico/`, que é PT e de campanha.

## Checagem editorial

- [FATO, 14/10/2026, `projeto-50k-site/src/content/pt-BR.ts` e `src/content/en.ts`]: os textos dos botões reproduzem o CTA principal do site. “45 min” e “grátis/free” já são a oferta pública.
- [FATO, 14/10/2026, `marketing/BRIEFING-MARKETING.md` §4 e `marketing/PLANO-MARKETING.md` §1.1]: marca exata, voz em primeira pessoa, site como teto, sem prova ou resultado novo. O índice vazio não afirma publicação ou cadência.
- [FATO, 14/10/2026, `marketing/seo/requisitos-tecnicos-seo-site.md` S5–S8]: artigo, idioma, autoria e datas reais são condicionais. Este documento entrega somente texto; implementação e publicação cabem ao fluxo Farol → Batuta/Compasso.
