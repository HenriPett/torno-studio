# Estratégia 2026-11: a Torno para a indústria

> Pedido do Henrique (ditado em 2026-11-12): refatorar a Torno inteira, marca, site e forma de atuar, para atender indústrias grandes (200+ funcionários), com landings por setor isoladas entre si, cases reescritos e o blog mantido com design novo.
> Este documento substitui o posicionamento do `BRIEFING.md` antigo ("Founding Engineer sob demanda" para PMEs). Ele é a fonte de verdade para o site a partir desta branch.
> Base de contexto: segundo cérebro do Henrique (notas `servico-ia-setorial`, `industria-textil-sc`, `nekt`, `torno`, `loopt`, `mateus`) e o relatório de pesquisa de 2026-11-12 (IBGE CEMPRE 2024, sites da Nekt e da Murmur).

## 1. Por que mudar

- A Torno estava pausada desde 2026-11-09. O posicionamento antigo (engenheiro sênior sob demanda, PMEs, protótipos de Lovable/Bolt, preços públicos a partir de R$ 6 mil) não gerou tração: o mercado de PME está saturado de agências de IA e a própria IA reduziu o valor de "construir rápido".
- Na conversa com o Mateus (Murmur, 2026-11-12): há mercado em serviço de software e IA sob medida para empresa média e grande, porque há muito produto horizontal e pouco adaptado a um negócio específico. Indústria grande não contrata agência genérica: quer alguém que fale a língua dela. Nichar num setor enorme sem atendimento específico. Fugir de médicos, dentistas e advogados.
- A Nekt (Florianópolis) vende "Company Brain" como plataforma horizontal de dados. Segundo a pesquisa de 2026-11-12: 16 cases no site, nenhum de indústria, o maior com 201-500 pessoas, conectores de ERP que cobrem o lado comercial e financeiro e não a produção, e um programa de parceiros para consultorias que implantam. O espaço que sobra é o de quem implanta, por setor, com conhecimento de chão de fábrica.
- Santa Catarina tem muitas unidades industriais grandes. Unidades locais com 250+ pessoas por setor (IBGE, CEMPRE 2024): têxtil 84, alimentos 70, plástico 40, máquinas 34, madeira e móveis 33, material elétrico 26, metal 26, veículos 23, papel 23. O Henrique mora em Jaraguá do Sul, polo têxtil e metalmecânico.

## 2. Posicionamento

- **Marca:** Torno. "Studio" sai de todo o texto do site, dos metadados e do JSON-LD. O domínio `tornostudio.com` continua (trocar domínio é decisão separada, ver §11). `PUBLIC_SITE_BRAND` já é "Torno" na Netlify; `site.organizationName` passa a ser "Torno".
- **Categoria:** engenharia de IA e software sob medida para a indústria.
- **Promessa central:** a Torno junta os dados e o conhecimento da operação num "cérebro" da empresa e coloca agentes de IA para trabalhar nas áreas que mais perdem tempo (produção e PCP, qualidade, manutenção, comercial e representantes, marketing, suprimentos, atendimento), implantando por etapas, dentro das regras da TI do cliente, com responsabilidade clara do primeiro diagnóstico à operação.
- **Mensagem em uma frase (referência para a home):** "IA aplicada à operação industrial, desenhada para a sua fábrica e implantada por etapas." O texto final é do subagente de copy, dentro das regras do §9.
- **Diferença contra as alternativas** (sem citar concorrentes no site):
  - Plataforma horizontal (dados, "company brain"): entrega ferramenta; a Torno entrega o resultado numa área, no vocabulário do setor, e cuida da implantação e da adoção.
  - Agência de IA genérica: chatbot e automação de marketing para qualquer empresa; a Torno começa pela operação e só fala com indústria.
  - Consultoria grande: projeto longo e caro antes do primeiro uso; a Torno trabalha com piloto curto, critério de sucesso combinado antes e expansão área por área.
  - Time interno: a Torno não substitui a TI; trabalha com ela e deixa código, documentação e acessos na conta do cliente.

## 3. ICP

- **Primário:** indústrias com 200 ou mais funcionários no Brasil, com prioridade para Santa Catarina e o Sul. Decisores: CEO/diretor-geral, diretor industrial ou de operações, CFO, gerente/diretor de TI, diretor comercial.
- **Setores para teste (uma landing cada):** têxtil e confecção; alimentos e bebidas; plásticos e embalagens; máquinas e equipamentos; metalmecânica; madeira e móveis; material elétrico e eletroeletrônicos; autopeças e implementos. O têxtil é o candidato mais forte (Jaraguá do Sul, 84 unidades grandes em SC, nada específico em português encontrado).
- **Sinais de encaixe:** ERP implantado (TOTVS, SAP, Senior ou outro) e informação espalhada em planilhas, PDFs, e-mails e na cabeça de pessoas experientes; perda de conhecimento com aposentadoria e rotatividade; muitas consultas repetidas entre áreas; rede de representantes ou de facções/terceiros; pressão de custo e de prazo.
- **Fora do ICP (o site diz isso com educação):** empresas pequenas, apps B2C, MVP de startup, protótipo de no-code para produção, clínicas, escritórios.

## 4. Oferta e modelo de serviço

### 4.1 O que entregamos

1. **Cérebro da operação:** uma base que reúne o que a empresa já tem (ERP, MES quando houver, planilhas, fichas técnicas, procedimentos, normas, histórico de não conformidades, contratos, catálogos, e-mails e chamados) com permissões por área e respostas que citam a fonte. Fica na infraestrutura do cliente ou numa nuvem aprovada pela TI dele.
2. **Agentes por área:** assistentes e automações que usam esse cérebro para uma tarefa definida, com um responsável na área. Exemplos (sempre rotulados como exemplos):
   - Produção e PCP: consulta de roteiro, ficha técnica e histórico de ordem; resumo de turno; alerta de atraso.
   - Qualidade: busca em não conformidades e ações anteriores; rascunho de relatório 8D; conferência de especificação.
   - Manutenção: histórico do equipamento, manual e procedimento no celular do técnico.
   - Comercial e representantes: preço, prazo, estoque e status de pedido consultados em linguagem natural; preparação de visita; proposta com as regras comerciais.
   - Marketing e catálogo: fichas de produto, conteúdo técnico e respostas a clientes a partir de dados aprovados.
   - Conhecimento de operadores: o saber de quem tem 20 anos de casa registrado e consultável para treinar quem chega.
   - Gestão: indicadores explicados em português, com o caminho até o dado.
3. **Software sob medida** quando o problema pede tela, integração ou fluxo próprio (portal de representantes, painel de chão de fábrica, integração entre sistemas).

### 4.2 Como trabalhamos (etapas)

1. **Conversa inicial** (45 min, sem custo): entender a operação, o problema e quem decide.
2. **Diagnóstico** (proposta fechada; planejado para 2 a 4 semanas): entrevistas por área, inventário de dados e sistemas, mapa de oportunidades com estimativa de esforço e risco, recomendação de um piloto e critério de sucesso. O relatório é do cliente, contrate ou não o restante.
3. **Piloto** numa área, num problema, com critério de sucesso medido antes e depois.
4. **Implantação por etapas** nas demais áreas, priorizadas pelo que o piloto mostrar.
5. **Operação assistida** (mensalidade): monitoramento, ajustes, novos casos de uso, treinamento e relatório mensal.

### 4.3 Preços

- **Os preços públicos saem do site.** Os valores antigos (Product Sprint R$ 6 mil, Production-Ready R$ 18 mil, MVP R$ 42-65 mil, Evolution a partir de R$ 4 mil/mês) foram feitos para PME. Para indústria grande o preço depende de escopo, sistemas e áreas, e um número baixo publicado tira credibilidade. O site passa a dizer "proposta fechada por etapa, após o diagnóstico".
- `src/config/pricing.ts` deixa de ser usado pelas páginas. Os testes de preço (`tests/copy-pricing.spec.ts`, `tests/qa/pricing.spec.ts`) são removidos junto.
- Sugestão para o Henrique decidir fora do site: diagnóstico pago com valor abatido do piloto; piloto com preço fechado; mensalidade de operação assistida.

### 4.4 Estrutura de entrega (o que responde a "é só uma pessoa?")

Não inventamos equipe. Mostramos estrutura, que é verdadeira e é o que a indústria avalia:
- **Liderança técnica única e responsável** pelo projeto, do diagnóstico à operação (hoje, Henrique Pett, fundador).
- **Rede de especialistas sob demanda** (dados, segurança, UX, infraestrutura, especialistas do setor), acionada por escopo e nomeada na proposta quando entrar no projeto.
- **Governança:** patrocinador e ponto focal do lado do cliente, ritos quinzenais, critério de sucesso por etapa, relatório mensal, registro de decisões.
- **Segurança e LGPD:** dados na infraestrutura do cliente ou em nuvem aprovada pela TI; acesso por perfil; registros de uso; dados do cliente não são usados para treinar modelos de terceiros; acordo de confidencialidade antes do diagnóstico quando o cliente pedir.
- **Continuidade:** código, documentação, acessos e contas em nome do cliente desde o primeiro dia; manual de operação; transição para a TI interna quando ela quiser assumir.

## 5. Regras de honestidade (substituem o §3 do BRIEFING antigo)

1. **Marca institucional, sem afirmações falsas.** Voz em "nós" e "a Torno". Proibido inventar membros de equipe, número de funcionários, escritórios, logos de clientes, depoimentos, certificações (ISO, SOC 2 etc.), prêmios, parcerias ou métricas. Quando uma pessoa aparece com nome, é o Henrique, com cargo real (fundador e líder técnico).
2. **Sem promessa de resultado.** Nada de "reduza 30% do custo", "ROI em 3 meses", "substitui X pessoas", "10x mais rápido". Resultado se promete por etapa, com critério combinado no diagnóstico.
3. **Métricas só com fonte pública.** Loopt: −27% de movimentos improdutivos e +21% de produtividade (MundoLogística, 13/01/2026), sempre atribuídas à empresa ("segundo a Loopt") e à solução da equipe, não ao Henrique sozinho. Nunca "−41%" nem "−31%". Bom.Capital: números autodeclarados, sempre como relato.
4. **Clientes da Loopt nunca são citados** (nem Deicmar, Ecoporto, TBSA, Santos Brasil, nem por descrição que os identifique). O nome "Loopt" aparece só como já aparece hoje: no case e na prova, com link para a fonte.
5. **Cases são experiência de quem conduz a Torno.** A Loopt é experiência profissional do fundador (engenharia de ML e depois gestão do produto de IA), descrita como já está no site; não é cliente da Torno e o site não detalha vínculo atual. A Ascende é projeto próprio, nunca cliente. A Bom.Capital é experiência profissional anterior.
6. **Cenários são rotulados.** Exemplos de implantação por setor e mocks de interface levam o selo "Cenário ilustrativo" ou "Ilustração" e não usam nomes de empresas reais.
7. **Fatos de setor citam a fonte** (IBGE, ABIT, FIESC, Comissão Europeia, matéria datada) e não citam empresas do setor por nome como se fossem clientes ou alvos.
8. **Sem foto de banco** e sem imagem que pareça fábrica do cliente. Visual é tipográfico, com mocks de interface rotulados.
9. **Porte não aparece como número no site** (decisão do Henrique, 2026-11-12). O corte de 200+ funcionários é critério interno de ICP e de prospecção; no texto público usamos "indústrias de médio e grande porte". O teste C45 em `tests/qa/content-audit.spec.ts` barra "200+", "200 ou mais" e variações.

## 6. Arquitetura do site

| Rota | Situação | Observação |
|---|---|---|
| `/` e `/en/` | **Nova** | Home para indústria 200+. EN enxuta, mesmo posicionamento. Fala de "indústria" em geral, sem listar setores. |
| `/como-trabalhamos/` e `/en/how-we-work/` | **Nova** | Etapas, governança, segurança, continuidade, estrutura de entrega. |
| `/cases/` e `/en/cases/` | **Nova** | Índice dos cases. |
| `/cases/loopt/`, `/cases/bom-capital/`, `/cases/ascende/` (+ EN) | **Reescritas** | Mesmos slugs; texto para o público industrial. |
| `/about/`, `/contact/` (+ EN) | **Reescritas** | Sobre a Torno (institucional) e contato. |
| `/diagnostico/` | **Reescrita** | Landing de campanha (Google Ads, `noindex, follow`), agora para o diagnóstico industrial. Mantém o contador sem cookie. |
| `/blog/` e artigos (+ EN) | **Só visual** | Conteúdo, slugs, frontmatter, schema e scripts editoriais intocados. |
| `/autores/henrique-pett/` (+ EN) | **Só visual** | Autoria do blog. |
| `/recuperacao-de-projeto/`, `/lovable-em-producao/`, `/guias/rls-multiempresa/` (+ EN) | **Mantidas, fora da navegação** | São páginas indexadas, linkadas pelo blog e cobertas pelos testes editoriais. Ganham o design novo e a marca "Torno", sem preço. Aposentar com 301 é decisão de fase 2 (ver §11). |
| `/privacidade/` (+ EN) | **Só visual** + menção ao contador das landings de setor | |
| `/para/<setor>/` | **Nova, isolada** | Landings de setor, ver §7. |
| `/design-system/` | **Nova, interna** | Referência visual, `noindex`, sem link. |

Navegação (header): Soluções (âncora na home), Como trabalhamos, Cases, Blog, Sobre, CTA "Agendar diagnóstico". Rodapé: as mesmas páginas, privacidade, LinkedIn, cidade. Nenhum link de setor em lugar nenhum.

## 7. Landings de setor

### 7.1 Lista e URLs

| Setor | URL |
|---|---|
| Têxtil e confecção | `/para/textil/` |
| Alimentos e bebidas | `/para/alimentos/` |
| Plásticos e embalagens | `/para/plasticos/` |
| Máquinas e equipamentos | `/para/maquinas/` |
| Metalmecânica | `/para/metalmecanica/` |
| Madeira e móveis | `/para/moveis/` |
| Material elétrico e eletroeletrônicos | `/para/eletroeletronicos/` |
| Autopeças e implementos | `/para/autopecas/` |

`/para/` não tem índice: responde 404.

### 7.2 Isolamento (obrigatório)

Quem recebe a página do têxtil não pode descobrir que existe a do setor de alimentos navegando pelo site.
- Nenhuma página do site linka uma landing de setor: home, header, footer, blog, cases, sobre, contato, 404, `llms.txt`, `sitemap*.xml`, `robots.txt` (sem `Disallow: /para/`, que revelaria o caminho), JSON-LD, Markdown para agentes.
- Uma landing de setor não linka outra e não cita outro setor pelo nome. Ela pode linkar a home, os cases, o "como trabalhamos" e o contato.
- Cada landing é um arquivo de conteúdo próprio (`src/content/setores/<slug>.ts`) e uma página própria (`src/pages/para/<slug>.astro`). O template (`SectorLanding.astro`) recebe um setor por vez. Nenhum componente renderizado itera uma lista de setores.
- `<meta name="robots" content="noindex, nofollow">`, sem canonical, sem hreflang, sem par em inglês, e `X-Robots-Tag: noindex` pela Netlify. Sem `.md` gerado para agentes.
- Um teste no build (`astro:build:done`) e um teste Playwright falham se qualquer HTML, o sitemap ou o `llms.txt` apontar para `/para/` fora da própria página, ou se uma landing apontar para outra.

### 7.3 Uso em outbound

- O e-mail para o decisor de uma indústria têxtil leva o link direto `https://tornostudio.com/para/textil/`. O texto do e-mail cita uma dor do setor que a página desenvolve.
- Medição sem cookie: o contador agregado por dia que já existe na `/diagnostico/` passa a contar também cada `/para/<setor>/` (uma chave por setor e dia, sem IP, sem user agent, sem query string). `npm run visitas` mostra a tabela.
- Decisão de setor: após 4 a 6 semanas de envio com volume comparável por setor, comparar respostas, visitas e reuniões agendadas por setor. O setor que responder melhor ganha conteúdo próprio (blog, guias) e, aí sim, pode ganhar uma página indexável.

### 7.4 Estrutura de cada landing

Hero com a dor do setor → contexto do setor (fatos com fonte) → dores reconhecíveis → áreas atendidas na linguagem do setor → mock rotulado de pergunta e resposta → como o cérebro da operação se monta naquele setor → cenário ilustrativo de implantação (rotulado) → prova real (case Loopt e cases gerais, sem inventar resultado no setor) → como trabalhamos (resumo, link) → FAQ → CTA de agenda → fontes.

## 8. Direção de design

- Referências: a linguagem visual da Apple (tipografia grande com tracking negativo, muito respiro, seções de produto com hierarquia forte, alternância de fundos branco, cinza-claro e preto, cards de canto generoso, animações discretas) e da Nekt (ritmo de seções de produto, mocks de interface no lugar de fotos). Reproduzimos linguagem e ritmo; nunca logos, imagens, ícones, textos ou fontes proprietárias delas.
- Fonte variável auto-hospedada próxima da estética Apple, paleta contida com um acento, claro e escuro, AA de contraste, animações só com `prefers-reduced-motion: no-preference` e partindo de estado visível.
- Mocks de interface em HTML/CSS (pergunta e resposta com fonte citada, painel, procedimento) com selo "Ilustração".
- Metas: Lighthouse ≥ 95 em desempenho, acessibilidade, boas práticas e SEO; axe sem violações sérias; sem rolagem horizontal em 360 px.
- Especificação detalhada: `docs/design/DESIGN-2026-11.md`. Referência viva: `/design-system/`.

## 9. Voz e regras de escrita

- Português do Brasil, registro profissional e direto, para diretor industrial. Frases curtas e concretas, com objetos do chão de fábrica (ficha técnica, ordem de produção, setup, refugo, não conformidade, representante, facção, lote). Inglês só na versão EN.
- "Nós" e "a Torno". Sem "eu".
- Cada frase passa no teste: o leitor consegue imaginar? dá para provar? um concorrente escreveria igual? Se falhar nos três, reescrever a partir dos fatos.
- Proibido (marcas de texto de IA): contraste "não é X, é Y" e variações; listas de negação ("sem X, sem Y, sem Z"); perguntas respondidas pelo próprio texto ("O resultado? ..."); dois-pontos de revelação; frases de efeito no fim de parágrafo; travessões em títulos, subtítulos e botões (e raros no corpo); tríades forçadas; palavras como robusto, revolucionário, potencializar, alavancar, jornada, ecossistema, transformação digital, "de ponta", "next level"; negrito decorativo; emojis.
- Uma ou duas frases de impacto por página (manchete e uma seção). O resto é simples e declarativo.
- CTA principal: "Agendar diagnóstico" (EN: "Book a call"). Secundários descrevem o que acontece ("Ver como trabalhamos", "Ler o case").

## 10. Plano de execução

Branch `cerebro/refatoracao-torno-industria`, pull request para `main`, revisão pelo deploy preview da Netlify. Commits pequenos em português.

| Fase | Quem | Escopo (arquivos de cada um não se sobrepõem) |
|---|---|---|
| 1 | Subagente (a) design system | `src/styles/*`, `src/components/ds/*`, `Header`, `Footer`, `src/content/chrome.ts`, `ui/*`, fonte no `Base.astro`, `/design-system/`, `docs/design/DESIGN-2026-11.md` |
| 1 | Subagente copy de setores | `src/content/setores/*.ts` (só dados, tipo em `types.ts`) |
| 1 | Orquestrador | Este documento, `BRIEFING.md`, rotas novas em `src/config/routes.mjs` |
| 2 | (b) home e institucionais | `/`, `/en/`, sobre, contato, como trabalhamos, diagnóstico; `src/content/pt-BR.ts`, `en.ts`, `types.ts`; remoção das seções e preços antigos |
| 2 | (c) cases | `src/content/cases.ts`, `src/components/cases/*`, `/cases/` (+ EN) |
| 2 | (d) landings de setor | `src/components/setores/*`, `src/pages/para/*` |
| 2 | (e) blog e páginas mantidas | `src/components/blog/*`, autor, guias, `CommercialPage`, privacidade, 404, estilo do banner de consentimento |
| 2 | (f) SEO técnico e isolamento | `Base.astro` (SEO), `lib/organization.ts`, `lib/person.ts`, `site.ts`, `llms.txt`, `robots`, `astro.config.mjs`, `netlify.toml`, `netlify/edge-functions/*`, teste de isolamento |
| 3 | Revisor independente | Honestidade das afirmações, isolamento, copy (marcas de IA), acessibilidade |
| 4 | Orquestrador | Build, testes, links, prints desktop/celular claro/escuro, PR |

## 11. Pendências e decisões do Henrique

1. **Domínio:** manter `tornostudio.com` ou migrar para um domínio sem "studio" (ex.: torno.ind.br, se disponível). A migração exige 301 de tudo e ajuste do job editorial do blog (`BLOG_ORIGIN`).
2. **Preço do diagnóstico:** pago (com abatimento no piloto) ou gratuito. O site hoje diz só "proposta fechada".
3. **Páginas antigas** (`/recuperacao-de-projeto/`, `/lovable-em-producao/`, guia RLS): aposentar com 301 para a home quando o job editorial for ajustado, ou manter como conteúdo de apoio.
4. **Autorização da Loopt** para tratar a experiência como "atuação na Loopt" de forma mais explícita na prova social; até lá, segue a regra do §5.
5. **Ordem de envio do outbound por setor** e volume por setor (para a comparação do §7.3 ser justa).
6. **Página da empresa no LinkedIn** ainda se chama "Torno Studio"; renomear para "Torno".
