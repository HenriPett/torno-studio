# Copy PT-BR: landing `/`, `/privacidade`, `/404`

> Autor: Verso (copywriter). Público: dono, diretor de operações ou CFO de empresa tradicional média (50–249 pessoas) com operação manual ou em planilha; secundário: quem já tem protótipo em Lovable/Bolt.
> Fontes: BRIEFING §2–3; PLANO-DEV §2.2, §2.3, §5.3, §5.4; plano §3–§8; `research/03` §4 e §7; `research/05` §8–9; currículos.
> Rascunho para revisão. Depois que o tipo `SiteCopy` existir em `src/content/types.ts`, este texto vai para `src/content/pt-BR.ts`.

## Convenções

- `{SITE_BRAND}`: marca, sempre lida da config. Nunca escrita à mão. Usada só no header, footer, `<title>` e OG.
- `{BOOKING_URL}`, `{CONTACT_EMAIL}`, `{LINKEDIN_URL}`, `{GITHUB_URL}`: de `src/config/site.ts`.
- `{price.*}`: valores de `src/config/pricing.ts`. Entre parênteses, o valor esperado (PLANO-DEV §5.3), só para revisão.
- `MUNDOLOGISTICA_URL` = https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres
- Limites de caracteres por bloco: combinados com o Timbre (ver tabela no fim).

---

## 0. Header

- Wordmark: `{SITE_BRAND}`
- Nav (âncoras, 4 itens ≤ 12):
  - Preços → `#precos`
  - Garantias → `#garantias`
  - Quem sou → `#quem`
  - FAQ → `#faq`
- Seletor de idioma: `PT` / `EN` · rótulo acessível: "Mudar idioma para inglês"
- Tema: rótulo acessível "Alternar tema claro/escuro"
- CTA desktop (≤ 22): **Agendar diagnóstico** → `{BOOKING_URL}`
- CTA mobile (≤ 10): **Agendar** → `{BOOKING_URL}`
- Link "pular para o conteúdo": "Pular para o conteúdo"

---

## 1. Hero (`#inicio`)

- Eyebrow: **Founding Engineer sob demanda**
- Manchete (fixa, plano §3): **Seu produto em produção em 6–10 semanas, construído e mantido por um único responsável sênior.**
- Subtítulo: Tire a operação da planilha ou coloque um produto no ar sem montar uma área de tecnologia. Você fala direto com quem constrói, com preço fechado.
- CTA primário: **Agendar diagnóstico (45 min, grátis)** → `{BOOKING_URL}`
- CTA secundário: **Ver preços** → `#precos`
- Microprova (abaixo dos CTAs): Preços publicados · Código na sua conta desde o dia 1 · Garantia de 60 dias no MVP

---

## 2. O problema (`#problema`)

- Título: **Você tem um problema claro e não quer montar uma área de TI.**
- Intro: Contratar desenvolvedores leva meses. Uma software house coloca um gerente de conta entre você e quem programa. Eu pego o problema inteiro e respondo por ele, do primeiro rascunho ao sistema rodando.
- Cards:
  1. **A operação roda em planilha.** — A planilha virou sistema e ninguém mais confia nos números. Transformo isso em software com regras e histórico.
  2. **Um processo depende de uma pessoa só.** — Aprovação, conferência, conciliação: se essa pessoa sai de férias, tudo trava. Levo o fluxo para o sistema.
  3. **Você quer IA, mas onde ela dá retorno.** — Antes do modelo: qual decisão melhora e quanto isso vale? Coloco IA onde há métrica, e digo quando não compensa.
  4. **Há um produto para vender.** — Um portal para clientes, um SaaS a partir do que vocês já fazem bem. Do escopo ao go-live, com preço fechado.
  5. **O protótipo não aguenta cliente de verdade.** — Ferramentas de IA para protótipo (Lovable, Bolt e similares) chegam à demo. Falta segurança, deploy e um responsável.

---

## 3. Como funciona: a escada (`#precos`)

- Título: **Preço publicado, escopo fechado, um degrau de cada vez.**
- Intro: Você sabe quanto custa antes de assinar. Cada etapa termina com algo que é seu, e você decide se sobe para a próxima. O diagnóstico é grátis e pode terminar em "não construa software agora".
- Rótulo de preço "a partir de": "a partir de"
- Rótulo de prazo: "Prazo"
- Rótulo de lista: "O que inclui"
- Rótulo de pagamento: "Pagamento"
- Marcador de degrau alternativo (Production-Ready, MVP Plus): "ou"
- Legenda da tabela do Evolution: "Planos do Product Evolution"
- Cabeçalhos da tabela do Evolution: "Plano" / "Horas/mês" / "Preço/mês"

### Degrau 0. Diagnóstico
- Preço: **Grátis**
- Prazo: 45 minutos
- Resumo: Uma conversa para entender o problema e ver se vale construir algo.
- O que inclui:
  - Entender o processo, a dor e quem decide
  - Estimar quanto o problema custa hoje
  - Indicar o degrau certo, com faixa de preço
  - Dizer quando não vale construir agora
- Pagamento: Sem custo e sem compromisso.
- CTA: **Agendar diagnóstico** → `{BOOKING_URL}`

### Degrau 1. Product Sprint
- Preço: **{price.sprint} (R$ 6.000)**
- Prazo: 2 semanas
- Resumo: O projeto do seu produto, pronto para construir e com preço fechado.
- O que inclui:
  - Problema e métrica de sucesso definidos
  - Escopo com critérios de aceite e o que fica fora
  - Arquitetura técnica
  - Protótipo navegável do fluxo principal
  - Plano de marcos com preço fechado do MVP
- Pagamento: 100% antecipado.
- Selo: **100% abatido do MVP**
- Nota (destaque): **100% abatido do MVP** se você assinar em até 30 dias. Os entregáveis são seus, mesmo se não seguir comigo.

### Degrau 1b. Production-Ready
- Preço: **{price.productionReady} (R$ 18.000)**
- Prazo: 2–3 semanas
- Resumo: Para quem já tem um protótipo e precisa colocá-lo em produção.
- O que inclui:
  - Auditoria de segurança, login, segredos e LGPD básica
  - Correção dos problemas críticos e testes do fluxo
  - Deploy automatizado, homologação e produção
  - Monitoramento, alertas e backup na sua conta
  - Documentação de passagem
- Pagamento: 50% no início, 50% na entrega.
- Nota: Não inclui reescrever o produto nem criar funcionalidades novas; isso vai para um MVP ou para o Evolution.

### Degrau 2. MVP Core
- Preço: **{price.mvpCore} (R$ 42.000)**
- Prazo: 6–7 semanas
- Resumo: Seu produto em produção, com o escopo definido no Sprint.
- O que inclui:
  - 1 jornada principal, de ponta a ponta
  - Até 2 perfis de usuário e até 2 integrações
  - Web responsivo, login e painel administrativo
  - Deploy, monitoramento e alertas
  - Garantia de 60 dias para bugs
- Pagamento: 40% na assinatura, 30% no beta em homologação, 30% no go-live.

### Degrau 2b. MVP Plus
- Preço: **{price.mvpPlus} (R$ 65.000)**
- Prazo: 8–10 semanas
- Resumo: O Core com mais perfis, mais integrações e uma camada a mais.
- O que inclui:
  - Tudo do MVP Core
  - Até 3 perfis de usuário e até 4 integrações
  - Mais 1: IA (LLM, RAG ou agente), pagamentos ou BI
  - Garantia de 60 dias para bugs
- Pagamento: 40% na assinatura, 30% no beta em homologação, 30% no go-live.

### Degrau 3. Product Evolution
- Preço: **a partir de {price.evolution.essencial}/mês (R$ 4.000)**
- Prazo: mensal
- Resumo: Depois do go-live, o mesmo responsável segue cuidando do produto.
- O que inclui:
  - Monitoramento, correções e segurança
  - Funcionalidades novas de um backlog priorizado
  - Horas-teto por mês, sem surpresa na conta
- Pagamento: Mensal, 100% antecipado.
- Planos:
  - **Essencial** · ~10 h/mês · {price.evolution.essencial} (R$ 4.000/mês) — Monitoramento, correções, segurança e 1 reunião por mês.
  - **Evolução** · ~25 h/mês · {price.evolution.evolucao} (R$ 9.000/mês) — Essencial + 1 entrega de funcionalidade a cada 2 semanas.
  - **Parceiro técnico** · ~45 h/mês · {price.evolution.parceiro} (R$ 16.000/mês) — Evolução + roadmap, apoio em captação e 1º dev contratado.
- Nota de regras: Mensal antecipado, mínimo de 3 meses. Horas não usadas não acumulam. Hora excedente: {price.evolution.overage} (R$ 400/h).

- CTA ao fim da escada: **Agendar diagnóstico (45 min, grátis)** → `{BOOKING_URL}`
- Nota abaixo do CTA: Não sabe qual degrau é o seu? É para isso que serve o diagnóstico.

---

## 4. Garantias e regras (`#garantias`)

- Título: **Regras claras, escritas no contrato.**
- Intro: Projeto de software dá errado por escopo que cresce sem preço, por dependência de quem construiu e por pagamento desalinhado com entrega. Estas regras existem para isso.
- Itens:
  1. **Garantia de 60 dias para bugs.** — Depois do go-live, corrijo sem custo tudo o que não cumprir os critérios de aceite. Funcionalidade nova não é bug: vai para o Evolution ou para um aditivo.
  2. **Escopo fechado, com o que fica fora.** — O Sprint define o que entra e o que não entra. Mudança no meio do caminho vira aditivo com preço, ou troca de um item por outro sem custo.
  3. **Código e nuvem na sua conta desde o dia 1.** — O repositório, o banco e a infraestrutura ficam no seu nome desde o começo. A propriedade intelectual é transferida a você no pagamento final.
  4. **Pagamento por marco.** — Você paga por etapa entregue. A etapa seguinte começa depois do pagamento da anterior, sem surpresa para nenhum dos lados.
  5. **Um MVP por vez.** — Não pego dois MVPs ao mesmo tempo. Quando eu pego o seu projeto, ele tem a minha atenção.
  6. **Demonstração toda semana.** — Uma vez por semana você vê software funcionando, não slide. Ajustes de rota acontecem cedo.
- Subtítulo da lista: **O que fica fora de todo projeto, salvo combinado à parte**
- Lista:
  - Apps nativos iOS/Android (entrego web ou PWA; nativo é à parte)
  - Compliance regulado (Bacen, ANS, PCI) e auditoria de segurança
  - Migração de mais de uma fonte de dados legada
  - Conteúdo, marketing e SEO
  - Suporte 24/7
  - Custos de nuvem, APIs e licenças (pagos direto por você, na sua conta)
  - Treinar modelo de ML próprio (o MVP Plus usa APIs e RAG)

---

## 5. Quem constrói (`#quem`)

- Título: **Quem constrói: Henrique Pett**
- Foto: alt "Henrique Pett" (foto real; até lá, monograma)
- Bio, parágrafo 1: Desde 2021 passei por quase todas as funções de um produto de dados e IA: pesquisa de ML, full stack, ciência de dados, engenharia de ML e gestão de produto. Num produto de IA para terminais de contêiner, construí o modelo como engenheiro de ML e passei a liderar o produto como PM, escrevendo código de produção.
- Bio, parágrafo 2: Não sou especialista profundo em uma camada só, e sei quando um problema precisa de um. O que eu faço bem é pegar um problema de negócio e levá-lo até software em produção, respondendo por cada parte. Também trabalhei remotamente, em inglês, numa consultoria que atendia empresas europeias.
- Título dos cases: **O que já construí**
- Cases:
  1. **IA na operação de terminais de contêiner** — Produto de IA que substitui o planejamento manual do pátio. Segundo a empresa: −27% de movimentos improdutivos e +21% de produtividade.
     - Com `PUBLIC_LOOPT_AUTHORIZED=true` (F4): **Loopt: IA na operação de terminais de contêiner** — Produto de IA da Loopt que substitui o planejamento manual do pátio. Segundo a Loopt, o resultado foi −27% de movimentos improdutivos e +21% de produtividade. (O terminal cliente segue sem nome.)
     - Rótulo de fonte: **Dado público · MundoLogística, jan/2026** → `MUNDOLOGISTICA_URL` (o texto visível nunca leva o nome da empresa, mesmo que a URL leve)
  2. **Crédito na Bom.Capital** — Relato meu: como primeiro profissional de dados da fintech, construí o modelo da análise de crédito, que levava em média 48 horas e passou a menos de 2 horas.
     - Rótulo de fonte: **Relato meu**
  3. **Projeto próprio: Ascende** — App com conselheiro de IA que registra finanças, treino e sono a partir de uma frase. Feito por mim, de ponta a ponta.
     - Rótulo de fonte: **ascende.site** → https://ascende.site
- Linha do artigo (texto puro, sem link): Escrevi para o blog da neptune.ai o artigo técnico "How to Build ML Model Training Pipeline" (2023).
- Links: **LinkedIn** → `{LINKEDIN_URL}` · **GitHub** → `{GITHUB_URL}`
- Nota sobre relatos (texto pequeno abaixo dos cases): "Relato meu" indica resultado que eu mesmo medi ou acompanhei, sem publicação externa.

---

## 6. Como eu trabalho (`#metodo`)

- Título: **Como uma pessoa só dá conta do produto inteiro**
- Intro: Trabalho de forma AI-native: agentes de código escrevem e revisam comigo, e testes e infraestrutura são automatizados desde a primeira semana. Isso libera tempo para o que exige julgamento.
- Itens:
  1. **Agentes de código, com revisão humana.** — Uso agentes de IA para escrever, testar e refatorar. Cada linha que vai para produção passa pela minha revisão e pelos testes.
  2. **Testes e deploy automatizados.** — Desde o início, o projeto tem testes do fluxo principal, deploy automático, homologação separada da produção e monitoramento com alertas.
  3. **Decisões por escrito.** — Decisões de arquitetura, runbooks e documentação de passagem ficam no repositório. Qualquer engenheiro consegue continuar o trabalho.
  4. **Especialistas quando o projeto pede.** — Pentest, design de marca, app nativo ou jurídico: trago um especialista, orçado à parte e combinado com você antes.
- Fechamento: Você sempre fala comigo. Não há gerente de conta, repasse ou telefone sem fim.

---

## 7. Para quem não é (`#nao-e-para`)

- Título: **Para quem eu não sou a escolha certa**
- Intro: Prefiro dizer agora do que descobrir no meio do projeto.
- Itens:
  - Quem precisa de app nativo para iOS e Android como produto principal.
  - Projetos de compliance regulado (PCI, HIPAA, Bacen, ANS) sem um especialista da área envolvido.
  - Quem procura desenvolvedores alocados ou cobrança por hora.
  - Quem decide só pelo menor preço: há opções que custam menos, e eu não compito nisso.
  - Quem espera qualquer produto pronto em 2 semanas. Sistema confiável leva o tempo do escopo.

---

## 8. FAQ (`#faq`)

- Título: **Perguntas frequentes**
- Perguntas:
  1. **Quanto tempo leva?**
     O Sprint leva 2 semanas. Um Production-Ready, 2 a 3. Um MVP Core fica em produção em 6 a 7 semanas, e um MVP Plus em 8 a 10. O cronograma de marcos sai do Sprint, junto com o preço fechado.
  2. **De quem é o código?**
     Seu. O repositório, o banco e a nuvem ficam na sua conta desde o primeiro dia. A propriedade intelectual é transferida a você no pagamento final. Os entregáveis do Sprint são seus mesmo se você não seguir para o MVP.
  3. **Você é uma pessoa só. E se ficar indisponível?**
     O código, o repositório e a nuvem ficam na sua conta desde o primeiro dia, e a documentação é escrita durante o projeto, não no fim: qualquer desenvolvedor sênior consegue assumir. O cronograma tem folga de 15 a 20% para imprevistos. E, se o projeto não puder seguir, você recebe de volta, proporcionalmente, o que pagou e não foi entregue.
  4. **Por que não contratar uma software house?**
     Pode fazer sentido se você precisa de muita gente alocada por muito tempo. A diferença aqui é que você fala com quem constrói, sem intermediário, e o preço é fechado depois do Sprint, não estimado por hora.
  5. **Ferramentas de IA para protótipo (Lovable, Bolt e similares) já não fazem isso?**
     Fazem o protótipo, e muitas vezes ele é um ótimo ponto de partida. O que eu entrego é produção: dados protegidos, login, integrações, deploy, monitoramento e alguém responsável quando algo quebra. Para quem já tem o protótipo, existe o Production-Ready.
  6. **Você assina NDA e emite nota fiscal?**
     Sim para os dois. Se preferir, assino o NDA antes do diagnóstico. Emito nota fiscal de serviço.
  7. **E a LGPD?**
     Nos projetos, você é o controlador dos dados do seu produto e indica o seu encarregado; eu atuo como operador, seguindo as suas instruções, com as responsabilidades em contrato (acordo de tratamento de dados). Os dados ficam na infraestrutura da sua conta. Compliance regulado (Bacen, ANS e afins) exige especialista da área, orçado à parte.
  8. **O que acontece depois do go-live?**
     Durante 60 dias, corrijo bugs sem custo. Depois, você pode seguir sozinho com a documentação que fica no repositório, ou contratar o Product Evolution, com horas-teto por mês.

---

## 9. CTA final + contato (`#contato`)

- Título: **Comece por uma conversa de 45 minutos.**
- Texto: No diagnóstico você me conta o problema, e eu digo com franqueza se vale construir, qual degrau faz sentido e quanto custa. Se a resposta for "ainda não", você sai com isso também.
- CTA: **Agendar diagnóstico (45 min, grátis)** → `{BOOKING_URL}`
- Contato secundário (se `{CONTACT_EMAIL}` definido): Prefere e-mail? Escreva para `{CONTACT_EMAIL}`.
- LinkedIn: Ou me chame no **LinkedIn** → `{LINKEDIN_URL}`

---

## 10. Footer

- Linha: `{SITE_BRAND}` · Founding Engineer sob demanda · Produtos de software do diagnóstico à produção.
- Links: Privacidade → `/privacidade` · English → `/en/` · LinkedIn · GitHub
- Copyright: © {ano} `{SITE_BRAND}`

---

## 11. Página de privacidade (`/privacidade`)

- Meta title: Privacidade | `{SITE_BRAND}`
- Meta description: Como este site trata dados pessoais: cookies só com o seu consentimento, sem formulário e com seus direitos pela LGPD.
- Título: **Privacidade**
- Atualizado em: 2026-10-09 (data fixa; muda só quando o texto mudar)
- Corpo:
  - **Resumo.** Este site apresenta o meu trabalho. Não tem cadastro nem formulário. Uso cookies de medição e de publicidade só se você aceitar no aviso de cookies; recusar não muda nada no site. Esta política segue a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
  - **Quem trata os dados.** O controlador é a empresa identificada no fim desta página, pela qual presto os serviços apresentados aqui. Como agente de tratamento de pequeno porte, ela não indicou encarregado (Resolução CD/ANPD nº 2/2022, art. 11). O canal para pedidos e reclamações sobre seus dados é o e-mail de contato abaixo, que chega direto a mim.
  - **Que dados são tratados.** Registros técnicos: a Netlify, que hospeda o site e atua como operadora em meu nome, registra dados de cada acesso, como endereço IP, data e hora, página pedida, página de origem, navegador e país aproximado. Eu não mantenho cópia própria desses registros. Conto as visitas à página de diagnóstico de forma agregada (um número por dia), sem cookies e sem guardar IP ou navegador (legítimo interesse, art. 7º, IX). Agendamento e e-mail: só o que você mesmo informa, como nome, e-mail, o assunto da conversa e a resposta à pergunta "Como chegou até aqui?" do formulário do Calendly. Com o seu consentimento de Medição: o agendamento do Calendly abre dentro do site, e a origem da visita é repassada a ele, ou seja, os 5 parâmetros UTM da campanha que trouxe você (fonte, meio, campanha, conteúdo e termo); nunca repasso identificadores individuais, como o identificador de clique do anúncio. Com o seu consentimento de Publicidade: o Google Ads grava cookies e identificadores no seu navegador para medir o resultado dos meus anúncios. Se você aceitou as duas categorias e agenda um diagnóstico dentro do site, o Google Ads recebe um aviso de conversão, sem nome, e-mail ou dados do agendamento.
  - **Para que e com qual base legal.** Registros técnicos servem para manter o site no ar e seguro: legítimo interesse (art. 7º, IX, da LGPD). Agendamento, e-mail e a resposta à pergunta do Calendly servem para marcar e fazer a conversa e preparar uma proposta, a seu pedido: procedimentos preliminares a um contrato (art. 7º, V). O agendamento do Calendly dentro do site, o repasse da origem da visita, os cookies de publicidade e o aviso de conversão ao Google Ads dependem do seu consentimento (art. 7º, I), que você pode revogar a qualquer momento. Quando a lei exige guardar algo, a base é o cumprimento de obrigação legal (art. 7º, II).
  - **Cookies e armazenamento no navegador.** Antes da sua escolha, nada de terceiros é carregado. Necessários: guardo no seu navegador a sua escolha sobre cookies e, se você trocar, a preferência de tema; isso não sai do seu dispositivo. Medição: o agendamento abre dentro do site num quadro do próprio Calendly, que aplica a política e os cookies dele e pode carregar ferramentas de terceiros que o Calendly usa, inclusive de publicidade, como Google Analytics, Facebook, Segment, Braze, OneTrust, Stripe e reCAPTCHA. Assim que o quadro abre, antes da sua escolha no aviso do próprio Calendly, essas ferramentas podem receber o seu endereço IP e o endereço da página; a origem da visita fica guardada só nesta sessão do navegador. Sem Medição, o botão abre a página do próprio Calendly. Publicidade: carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios. A lista completa está na tabela abaixo.
  - **Com quem os dados são compartilhados.** Só com os fornecedores que fazem o site, o contato e a medição de anúncios funcionarem, e só para isso: a Netlify (hospedagem); o Calendly (agenda), que abre dentro do site só com o seu consentimento de Medição e, sem ele, na página do próprio Calendly; nos dois casos, vale a política de privacidade e de cookies do Calendly; e o Google, que hospeda o meu e-mail e, com o seu consentimento de Publicidade, opera o Google Ads. Cada um segue a própria política de privacidade. Não vendo dados. Autoridades só recebem dados mediante requisição legal.
  - **Transferência internacional.** A Netlify e o Google processam dados nos Estados Unidos, e o Calendly também pode processá-los fora do Brasil. Essas transferências seguem o art. 33 da LGPD, com base nos compromissos contratuais de proteção de dados desses fornecedores.
  - **Por quanto tempo.** Os registros técnicos de acesso ficam com a Netlify pelo prazo de retenção dela, e eu não os guardo à parte. Os dados do Google Ads ficam pelo prazo da política do Google, e cada cookie dura o prazo indicado na tabela abaixo. A sua escolha sobre cookies fica guardada no seu navegador por 6 meses; depois disso, o aviso aparece de novo. Mensagens e dados de agendamento ficam enquanto forem necessários para a conversa. Se ela virar contrato, guardo o que a lei exigir pelo prazo legal; se não virar, apago quando deixarem de ser necessários ou quando você pedir.
  - **Seus direitos.** Pela LGPD (art. 18), você pode pedir: confirmação de que trato seus dados e acesso a eles; correção; anonimização, bloqueio ou eliminação; portabilidade; informação sobre com quem eles foram compartilhados; e se opor a um tratamento baseado em legítimo interesse. Você pode revogar ou mudar o seu consentimento a qualquer momento em "Preferências de cookies", no rodapé de todas as páginas. Respondo em até 15 dias pelo contato abaixo. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
  - **Segurança.** O site é estático, servido só por HTTPS, e não guarda dados pessoais em banco de dados próprio. O acesso às contas dos fornecedores é restrito a mim.
  - **Mudanças nesta política.** Quando esta política mudar, atualizo a data no topo da página.
- Contato: `{CONTACT_EMAIL}` · Controlador: `{PUBLIC_LEGAL_NAME}`, `{PUBLIC_LEGAL_ID}` (das envs).
- Sem e-mail definido: "Para qualquer pedido sobre seus dados, fale comigo pelo LinkedIn."
- Link de volta: ← Voltar para a página inicial

---

## 12. Página 404 (bilíngue, mesma página)

- Meta title: Página não encontrada | `{SITE_BRAND}`
- PT: **Esta página não existe.** O endereço pode ter mudado ou estar digitado errado. → **Voltar para o início** (`/`)
- EN: **This page doesn't exist.** → **Go to the English site** (`/en/`)

---

## 13. Metadados e OG

- `<title>` (≤ 60): Founding Engineer sob demanda | `{SITE_BRAND}`
- Meta description (≤ 155): Seu produto em produção em 6–10 semanas, com um único responsável sênior. Preços publicados, escopo fechado e código na sua conta desde o dia 1.
- OG title: Seu produto em produção em 6–10 semanas, com um único responsável sênior.
- OG description: Diagnóstico de 45 minutos, grátis. Preços publicados, escopo fechado, garantia de 60 dias no MVP.
- Texto da imagem OG (1200×630):
  - Linha 1 (pequena): `{SITE_BRAND}` · Founding Engineer sob demanda
  - Linha 2 (grande): Seu produto em produção em 6–10 semanas.
  - Linha 3: Um único responsável sênior, do diagnóstico à produção.
- OG image alt: Seu produto em produção em 6–10 semanas, com um único responsável sênior.

---

## 14. Banner de consentimento (docs/consent/SPEC.md §4, §8, §9; limites DESIGN.md §13.5)

- 1º nível (region, aria-label "Aviso de cookies"): Uso cookies de medição e publicidade só se você aceitar. → link **Política de privacidade** (`/privacidade#cookies`)
- Botões (mesmo peso): **Aceitar** · **Recusar** · **Personalizar**
- 2º nível (diálogo): **Preferências de cookies**. Escolha o que pode carregar neste site. Medição e Publicidade ficam desligadas até você ligar, e recusar não muda nada no site. Você pode mudar de ideia a qualquer momento pelo rodapé.
  - **Necessários** (necessary): Guardam a sua escolha sobre cookies e, se você trocar, a preferência de tema. Ficam só no seu navegador, não saem do seu dispositivo e não podem ser desligados.
  - **Medição** (measurement): Abre a agenda num quadro do Calendly e repassa a origem da visita. Valem os cookies e a política do Calendly. Ao abrir, antes da sua escolha no aviso dele, ferramentas de terceiros do Calendly, inclusive de publicidade (Google Analytics, Facebook, Segment, Braze, Stripe, reCAPTCHA), podem receber seu IP e a página. · [Privacidade do Calendly](https://calendly.com/legal/privacy-notice)
  - **Publicidade** (advertising): Carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios e avisa quando um diagnóstico é agendado. Nome, e-mail e dados do agendamento não são enviados ao Google. · [Cookies do Google Ads](https://policies.google.com/technologies/ads?hl=pt-BR)
- "Sempre ativo" (necessary) · **Salvar escolhas** · **Aceitar tudo** · **Recusar tudo** · close: "Fechar"
- saved (aria-live): "Preferências de cookies salvas"
- Footer: **Preferências de cookies**

### Cookies e armazenamento usados

Lista do que este site pode gravar no seu navegador, por categoria. Medição e Publicidade só gravam algo depois do seu consentimento. Os cookies do Calendly só existem se você aceitar Medição e abrir o agendamento: são definidos pelo Calendly dentro do quadro de agendamento, e o Calendly pode usar outros conforme a política dele.

Caption: "Cookies e armazenamento local deste site"

| Nome | Fornecedor | Finalidade | Categoria | Duração |
|---|---|---|---|---|
| Nome | Fornecedor | Finalidade | Categoria | Duração |
| _gcl_au | Google (Google Ads) | Medir a eficácia dos anúncios. Cookie do domínio do site (1ª parte). | Publicidade | 90 dias |
| _gcl_ls | Google (Google Ads) | Medir a eficácia dos anúncios. Armazenamento local do navegador. | Publicidade | Sem prazo publicado pelo Google; apagado quando você revoga o consentimento |
| ts-consent | Este site | Registrar a sua escolha sobre cookies. Armazenamento local do navegador. | Necessário | 6 meses |
| ts-utm | Este site | Guardar a origem da visita (UTMs da campanha) para repassá-la ao Calendly. Armazenamento de sessão do navegador. | Medição | Até você fechar a aba |
| theme | Este site | Lembrar o tema claro ou escuro, só se você trocar. Armazenamento local do navegador. | Necessário | Até você limpar os dados do navegador |
| __cf_bm | Calendly (Cloudflare), em .calendly.com | Segurança e proteção contra robôs no agendamento. | Medição | 30 minutos |
| _cfuvid | Calendly (Cloudflare), em .calendly.com | Segurança do agendamento. | Medição | Até você fechar o navegador |
| OptanonConsent | Calendly (OneTrust), em .calendly.com | Guardar a sua escolha de cookies no Calendly. | Medição | 1 ano |
| m | Calendly (Stripe), em m.stripe.com | Prevenção de fraude. | Medição | Cerca de 1 ano |

Fonte do _gcl_au / source: https://business.safety.google/adscookies/

---

## Limites de caracteres (com espaços)

Ver tabela combinada com o Timbre em `docs/copy/en.md` (mesma tabela para os dois idiomas).
