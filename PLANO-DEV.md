# PLANO-DEV: site "Founding Engineer sob demanda"

> Autor: Batuta (Maestro de Desenvolvimento, floor "Site"). Data: 2026-10-08.
> Fontes: `BRIEFING.md`; `projeto-50k/plano/plano-de-negocios.md` (§3, §4, §5, §7); `research/03` §4; `research/05` §8–10.
> As regras invioláveis do BRIEFING §3 valem acima de qualquer decisão deste plano.

---

## 1. Stack e arquitetura

### 1.1 Decisões

| Tema | Decisão | Por quê |
|---|---|---|
| Framework | **Astro 5** (output estático, zero JS por padrão) | Landing de conteúdo; o HTML estático facilita Lighthouse ≥ 95; adapter oficial e deploy nativo na Vercel |
| Linguagem | TypeScript (strict) | Tipar o conteúdo (preços, seções) e os placeholders |
| Estilo | CSS próprio com **design tokens** em `:root` (custom properties) + CSS por componente (scoped do Astro). Sem framework de UI | Menos CSS enviado; dark/light via tokens |
| Fontes | 1 família variável self-hosted (`@fontsource-variable`), subset latin, `font-display: swap`, preload | Sem request a terceiros (LGPD) e sem CLS |
| Imagens | `astro:assets` (AVIF/WebP, dimensões fixas). Só foto real do fundador e diagramas/ilustrações próprias (SVG). **Sem stock** | BRIEFING §5 |
| Interatividade | Ilhas mínimas em JS puro: toggle de tema, troca de idioma, `<details>` nativo no FAQ | Nada de React/hydration para isso |
| Analytics | **Vercel Web Analytics** (sem cookies) + Speed Insights | Dispensa banner de cookies; aviso na página de privacidade |
| Formulário | **Não há na v1.** CTA = link de agenda + `mailto:` | Não coletar dado pessoal sem necessidade (LGPD/GDPR). Reavaliar depois |
| Deploy | Vercel (`npx vercel`): preview primeiro, produção após aprovação do QA | BRIEFING / papel |
| Qualidade | `astro check`, Prettier, Lighthouse CI (`@lhci/cli`) com asserts ≥ 0,95, `linkinator` para links, Playwright + `@axe-core/playwright` para a11y e i18n | Gates objetivos para o QA |

### 1.2 i18n (PT/EN, rotas separadas, sem tradução automática)

- Roteamento nativo do Astro (`i18n: { locales: ['pt-BR','en'], defaultLocale: 'pt-BR', routing: { prefixDefaultLocale: false } }`).
  - **`/`** → PT-BR (mercado prioritário: "Brasil primeiro", plano §8).
  - **`/en/`** → EN.
- Sem redirecionamento automático por `Accept-Language` (ruim para SEO e para quem compartilha link). Há um seletor de idioma visível no header, que leva à página equivalente.
- `<html lang>` correto; `<link rel="alternate" hreflang="pt-BR">`, `hreflang="en"` e `hreflang="x-default"` (→ `/en/`) em todas as páginas; `canonical` por idioma.
- Conteúdo em arquivos tipados por idioma: `src/content/pt-BR.ts` e `src/content/en.ts`, com o **mesmo tipo** `SiteCopy`. Faltar uma chave quebra o build. O texto é escrito por idioma (copywriter), não traduzido.
- Preços em `src/config/pricing.ts`: BRL para `/` e USD para `/en/`, formatados com `Intl.NumberFormat` do idioma.
- Metadados, título, descrição e **OG image por idioma** (PNG 1200×630 gerado no build com `satori` + `@resvg/resvg-js`, ou estático feito pelo designer).
- `@astrojs/sitemap` com i18n (inclui alternates); `robots.txt` aponta para o sitemap. Enquanto estiver em `*.vercel.app` de preview, `noindex` (ver §5).

### 1.3 Configuração e placeholders (decisões do fundador)

Tudo que depende do fundador fica em **`src/config/site.ts`**, lido de variáveis de ambiente com fallback para placeholder visível em dev:

| Chave | Env var | Valor provisório |
|---|---|---|
| **Marca (fonte única)** | `PUBLIC_SITE_BRAND` → exportado como `SITE_BRAND` | `"[Marca]"` (placeholder neutro). **A marca não leva o nome do fundador**; Henrique aparece só como quem constrói (seção "Quem constrói", bio, LinkedIn). Nenhum componente, título, OG ou meta escreve a marca à mão: todos leem `SITE_BRAND` |
| URL do site | `PUBLIC_SITE_URL` | URL `*.vercel.app` do projeto |
| Link de agenda (diagnóstico 45 min) | `PUBLIC_BOOKING_URL` | `#agendar` + aviso no build se vazio |
| E-mail público | `PUBLIC_CONTACT_EMAIL` | vazio → bloco de e-mail oculto |
| LinkedIn / GitHub | `PUBLIC_LINKEDIN_URL`, `PUBLIC_GITHUB_URL` | dos arquivos `projeto-50k/base/` (confirmar) |
| Citar a Loopt pelo nome | `PUBLIC_LOOPT_AUTHORIZED` | `false` → "produto de IA para operação de terminais de contêiner" |
| Citar a Bom.Capital pelo nome | — | **Autorizado pelo fundador:** nome "Bom.Capital" com as métricas como relato em 1ª pessoa, sem selo de resultado publicado |
| Mostrar seção de depoimentos/logos | `PUBLIC_SHOW_TESTIMONIALS` | `false` (componente pronto, **sem conteúdo**) |
| Indexação | `PUBLIC_ALLOW_INDEXING` | `false` até a produção com domínio |

O build falha em produção (`VERCEL_ENV=production`) se `PUBLIC_BOOKING_URL` estiver vazio, para não publicar CTA quebrado.

### 1.4 Estrutura do repositório

```
astro.config.mjs        # i18n, sitemap, site URL
vercel.json             # headers de segurança e cache
src/
  config/site.ts        # placeholders configuráveis (§1.3)
  config/pricing.ts     # escada de valor BRL/USD (fonte: plano §5.1)
  content/pt-BR.ts      # copy PT
  content/en.ts         # copy EN
  content/types.ts      # tipo SiteCopy
  components/           # Hero, Problem, Ladder, Guarantees, About, Method, NotFor, Faq, FinalCta, Header, Footer, ThemeToggle, LangSwitch, Testimonials (oculto)
  layouts/Base.astro    # <head>, hreflang, OG, tema
  pages/index.astro     # PT
  pages/privacidade.astro
  pages/en/index.astro  # EN
  pages/en/privacy.astro
  pages/404.astro
  styles/tokens.css     # design tokens light/dark
public/                 # favicon, robots.txt, foto do fundador
tests/                  # Playwright (a11y, i18n, links)
```

---

## 2. Sitemap e seções

### 2.1 Páginas

| Rota PT | Rota EN | Conteúdo |
|---|---|---|
| `/` | `/en/` | Landing de 1 página (abaixo) |
| `/privacidade` | `/en/privacy` | Aviso curto: analytics sem cookies, nenhum formulário, contato e direitos LGPD/GDPR |
| `/404` | (mesma, bilíngue) | Link de volta para as duas versões |

Sem blog na v1. Os artigos de SEO do plano (`05` §10.2, semanas 4/8/12) entram depois como `/artigos/`, fora deste escopo.

### 2.2 Seções da landing (âncoras iguais nos dois idiomas)

A métrica do site: **entender a oferta em 10 s e agendar o diagnóstico de 45 min.** O CTA de agenda aparece no header (fixo), no hero, ao fim da escada e no final.

| # | Seção (âncora) | Conteúdo | Fonte / cuidado |
|---|---|---|---|
| 0 | Header | `SITE_BRAND` (wordmark tipográfico, sem logo desenhado para um nome específico), links de âncora, seletor PT/EN, tema, CTA "Agendar diagnóstico" | — |
| 1 | **Hero** (`#inicio`) | Manchete exata do plano §3 + subtítulo (responsabilidade única, contato direto com quem constrói, preço fechado) + CTA "Agendar diagnóstico (45 min, grátis)" + CTA secundário "Ver preços" | Manchetes **não mudam** sem o Maestro do projeto. Sem "AI-native" aqui |
| 2 | **O problema** (`#problema`) | "Tenho um problema/ideia e não quero montar um time": planilha, operação manual, SaaS, adicionar IA, protótipo Lovable/Bolt que não aguenta produção. Variação por público: PT fala com PME tradicional; EN com founder sem CTO | Plano §4; `05` §9.1 |
| 3 | **Como funciona: a escada** (`#precos`) | Diagnóstico → Product Sprint → Production-Ready → MVP Core → MVP Plus → Product Evolution, **com preços públicos**, prazo, o que inclui e forma de pagamento. Destaque: Sprint 100% abatido do MVP em 30 dias; entregáveis do cliente | Plano §5.1, `03` §4. Ver pendências P1–P3 sobre preços EN |
| 4 | **Garantias e regras** (`#garantias`) | 60 dias de garantia para bugs; escopo fechado + lista do que fica fora; código, repositório e nuvem na conta do cliente desde o dia 1; pagamento por marco; no máximo 1 MVP por vez | Plano §5.4, §6.2. **Não** publicar a "garantia de prazo" (hipótese jurídica em `03` §4) |
| 5 | **Quem constrói** (`#quem`) | Henrique em primeira pessoa: PM + ML + full stack; cases conforme a regra 3; links LinkedIn/GitHub; foto real | Ver §2.3 |
| 6 | **Como eu trabalho** (`#metodo`) | IA e agentes de código, testes e infra automatizados (aqui "AI-native" é **prova de método**); especialistas sob demanda (pentest, design de marca, mobile nativo); demo semanal | Plano §7 |
| 7 | **Para quem não é** (`#nao-e-para`) | Filtro honesto: apps nativos iOS/Android, compliance regulado sem especialista, "time inteiro barato", quem quer preço por hora, prazos de 2 semanas para qualquer produto | `03` §4 "Fora do escopo"; BRIEFING regra 2 |
| 8 | **FAQ** (`#faq`) | Prazo; propriedade do código; e se eu ficar indisponível (plano §7: código na conta do cliente, documentação, engenheiro reserva, buffer, cláusula de suspensão, reembolso pro rata); NDA; LGPD/GDPR (DPA); cobrança internacional (EN: fatura em USD via transferência internacional, B2B; detalhes a confirmar); "o Lovable faz isso por US$ 25" | `05` §9.4, plano §7–8 |
| 9 | **CTA final + contato** (`#contato`) | Repetir oferta do diagnóstico; e-mail (se definido); LinkedIn | — |
| — | Depoimentos/logos | Componente pronto, **oculto** (`PUBLIC_SHOW_TESTIMONIALS=false`), sem nenhum conteúdo de exemplo no build | Regra 5 |

### 2.3 Prova social permitida (checklist do copy e do QA)

- ✅ "Produto de IA para operação de terminais de contêiner: **−27% de movimentos improdutivos e +21% de produtividade**", com link para a matéria da MundoLogística (13/01/2026). Rótulo visível: "MundoLogística, jan/2026" / "MundoLogística, Jan 2026" (limite de 40 caracteres; a data exata fica na matéria do link). Sem o nome "Loopt" nem do cliente-terminal enquanto `PUBLIC_LOOPT_AUTHORIZED=false`.
- ✅ Relatos autodeclarados, sempre como relato em 1ª pessoa e sem selo: na Bom.Capital, "reduzi a análise de crédito de 48 h para menos de 2 h" (nome autorizado; relato, sem selo); "levei o provisionamento de cliente novo de 2 semanas para 30 minutos".
- ✅ Ascende e FinPlan como **projetos próprios**.
- ✅ "Trabalhei remotamente, em inglês, numa consultoria que atendia empresas europeias." Artigo na neptune.ai (data a confirmar, ver P7).
- ❌ −41%, −31%, "clientes internacionais", "nosso time", 5x/10x, "substitui 5 engenheiros", "mais barato", qualquer depoimento/logo.

---

## 3. Equipe (recrutamento quando o modo Maestro estiver ativo)

Floor **"Site"**, diretório `/Users/henriquepett/Downloads/pessoal/projeto-50k-site`. Reaproveito os roles globais existentes; crio só o de copywriter. Codinomes no tema musical (eu sou a Batuta).

| Codinome | Role | Responsabilidade | Entra na fase |
|---|---|---|---|
| **Compasso** | Tech Lead (global) | Scaffold Astro, i18n, config/placeholders, CI de qualidade (Lighthouse CI, linkinator, Playwright+axe), revisão de código de todo PR do Ritmo | 1 |
| **Timbre** | Product Designer (global) | Hierarquia da página, wireframe mobile-first, design system (tokens light/dark, tipografia, escala, componentes), OG images, regra "sem stock" | 2 |
| **Verso** | **Copywriter bilíngue PT/EN** (role novo) | Copy PT e EN escrito nativamente por público, dentro das regras do BRIEFING §3, com checklist de prova social (§2.3) | 2 (paralelo a Timbre) |
| **Ritmo** | Frontend Developer (global) | Implementar componentes e páginas sobre o scaffold, a partir do design e do copy | 3 |
| **Afinador** | QA Engineer (global) | Gates da fase 4 + auditoria de conteúdo contra as regras invioláveis | 4 (prepara o checklist já na fase 2) |
| **Palco** | DevOps Engineer (global) | Projeto Vercel, env vars, headers, preview/produção, domínio depois | 5 (só se o Compasso não absorver; decido na fase 4) |

**Quem fala com quem:**
- **Batuta ↔ todos.** Eu distribuo tarefas, reviso e faço os merges/commits de integração. Só eu falo com o Maestro do projeto (`maestri ask "Claude Code"`) e com o fundador.
- **Verso ↔ Timbre:** limites de tamanho de texto por seção e hierarquia (direto, com cópia para mim nas decisões).
- **Compasso ↔ Ritmo:** arquitetura, convenções e code review (direto).
- **Timbre → Ritmo:** handoff de tokens e especificações de componentes (direto).
- **Afinador → Ritmo / Compasso:** bugs com passo a passo e evidência (direto); bloqueadores de conteúdo passam por mim.
- **Dúvidas de posicionamento/conteúdo** (qualquer um) → Batuta → Maestro do projeto. Ninguém inventa preço, número ou nome.

**Git:** todos em `main`, commits pequenos e frequentes, mensagens no formato `tipo(escopo): descrição` (ex.: `feat(hero): …`, `content(en): …`). Cada um só mexe nos arquivos da sua área; conflitos passam por mim.

---

## 4. Fases e critérios de pronto

| Fase | Entregas | Responsáveis | Pronto quando |
|---|---|---|---|
| **0. Plano** | Este documento; dúvidas enviadas ao Maestro do projeto | Batuta | PLANO-DEV.md commitado; modo Maestro ativo; equipe recrutada |
| **1. Arquitetura** | Scaffold Astro + TS strict; i18n `/` e `/en/`; `site.ts`/`pricing.ts` com placeholders; layout base com hreflang/canonical/OG; sitemap/robots; Vercel Analytics; scripts `check`, `test`, `lhci`, `links` | Compasso | `npm run build` sem erro; páginas PT/EN vazias com hreflang corretos; tipo `SiteCopy` faz o build falhar se faltar chave; CI local roda |
| **2. Design + copy** (paralelos) | Timbre: wireframe mobile/desktop, tokens light/dark (contraste AA), tipografia, componentes, OG. Verso: copy PT e EN completos de todas as seções, em `content/*.ts` | Timbre, Verso; revisão Batuta | Batuta conferiu o copy contra o BRIEFING §3 e o checklist §2.3 (sem nenhum item ❌); manchetes idênticas às do plano; preços batem com `pricing.ts`; design aprovado por mim |
| **3. Implementação** | Todas as seções, header/footer, toggle de tema, seletor de idioma, FAQ, privacidade, 404, depoimentos ocultos | Ritmo; review Compasso | Paridade PT/EN; funciona sem JS (exceto o toggle); sem CLS visível; review do Compasso aprovado |
| **4. QA** | Relatório do Afinador | Afinador | **Lighthouse ≥ 95** em Performance, Acessibilidade, Best Practices e SEO (mobile e desktop, PT e EN); **0 violação axe** séria/crítica; navegação por teclado e foco visível; responsivo em 360, 768, 1280 e 1920 px sem scroll horizontal; dark/light legíveis; **0 link quebrado**; hreflang/canonical/sitemap válidos; `lang` correto; auditoria de conteúdo: nenhum item proibido, nenhum "Loopt", nenhum depoimento |
| **5. Preview** | `npx vercel` (preview) com env vars de placeholder; `noindex` | Batuta/Palco; **login do fundador** | URL de preview no ar; QA repetido no preview (Lighthouse na URL real) |
| **6. Produção** | `npx vercel --prod` | Batuta/Palco | QA aprovou o preview; `PUBLIC_BOOKING_URL` definido (ou o fundador aceitou publicar com placeholder); relatório enviado ao Maestro do projeto |

`maestri floor status` atualizado a cada mudança de fase (working/blocked/review/done) com `--progress n/6`.

---

## 5. Histórico de decisões (fundador e Maestro do projeto)

> **Esta seção é só histórico.** A ÚNICA lista viva de pendências do fundador é `projeto-50k/PAINEL-DO-FUNDADOR.md`, mantida só pelo Maestro do projeto (regra de 2026-10-09). Pendência nova vai para ele com `maestri ask "Claude Code" "PENDÊNCIA: ..."`; não é registrada aqui.

### 5.1 Pendências iniciais do fundador (histórico; todas tratadas ou migradas para o painel)

| # | Pendência | Placeholder atual | Bloqueia |
|---|---|---|---|
| F1 | Nome da marca (a Vela pesquisa; o fundador escolhe) e domínio | `SITE_BRAND="[Marca]"`; `*.vercel.app` | Produção com domínio (não bloqueia preview) |
| F2 | Link de agendamento (Cal.com/Calendly) | `PUBLIC_BOOKING_URL` vazio | **Produção** |
| ~~F3~~ | ~~E-mail público~~ → **resolvido:** henriquepett@gmail.com (env `PUBLIC_CONTACT_EMAIL` na Vercel, todos os ambientes) | — | — |
| F4 | Autorização da Loopt para citar o nome | `PUBLIC_LOOPT_AUTHORIZED=false` | Não |
| ~~F5~~ | ~~Citar a Bom.Capital~~ → **resolvido:** pode citar pelo nome, métricas como relato | — | — |
| F6 | Foto profissional e URLs de LinkedIn/GitHub confirmadas | monograma SVG | Não (fica melhor com foto) |
| F8 | URL do artigo na neptune.ai ("How to Build ML Model Training Pipeline"), que não está nas fontes | `PUBLIC_NEPTUNE_ARTICLE_URL` vazio → cita o artigo sem link | Não |
| F9 | Razão social e CNPJ do controlador (página de privacidade) | `PUBLIC_LEGAL_NAME` / `PUBLIC_LEGAL_ID` vazios → aviso no build | **Produção** |
| F10 | Bio: pode dizer que hoje é PM em tempo integral do produto de terminais? (até lá, texto neutro, sem afirmar vínculo atual) | bio neutra | Não |
| F11 | Confirmar o fundador como encarregado (LGPD) na privacidade | fundador como encarregado | Não |
| F12 | Marco Civil art. 15 (guarda de logs de acesso por 6 meses): vale para este site? Precisa de log drain? Perguntar ao contador/advogado (ver `06`) | privacidade não promete 6 meses; sem log drain | Não (revisar antes de escalar tráfego) |
| ~~F7~~ | ~~Login na Vercel~~ → **resolvido:** conta henripett, projeto `founding-engineer-site` (hobby). Preview protegido por Vercel Authentication | — | — |

### 5.2 Para o Maestro do projeto (vou perguntar via `maestri ask "Claude Code"`)

| # | Dúvida |
|---|---|
| P1 | EN, MVP Core: mostrar o preço de lançamento ("from US$ 12,000" ou "from US$ 15,000"?) ou o pós-prova US$ 18k? O BRIEFING diz "from US$ 15,000"; `03` §4 diz US$ 18.000 e o plano §5.1 diz US$ 12–15k no lançamento |
| P2 | EN, MVP Plus: o plano marca US$ 30k como "pós-prova". Mostrar já, ou "from US$ 20,000"/sob consulta durante o lançamento? |
| P3 | Product Evolution: mostrar os 3 planos (Essencial/Evolução/Parceiro, R$ 4k/9k/16k e US$ 1,5k/4k/7k) ou só "a partir de"? |
| P4 | Marca: BRIEFING diz "Henrique Pett — Founding Engineer"; `05` §10.1 diz "Henrique Pett — Product Engineering". Uso a do BRIEFING? |
| P5 | Mencionar a vaga limitada de preço de lançamento internacional ("até 2 clientes", em troca de case público)? |
| P6 | Publicar a forma de pagamento por degrau (Sprint 100% antecipado; Production-Ready 50/50; MVP 40/30/30) ou só "pagamento por marco"? |
| P7 | Data correta do artigo/aquisição da neptune.ai a usar (plano §12 item 3) e se o artigo entra no site |

### 5.3 Decisões do Maestro do projeto (2026-10-08)

| # | Decisão |
|---|---|
| P1 | EN, MVP Core: **"from US$ 15,000"**. O piso de US$ 12k fica só na conversa comercial |
| P2 | EN, MVP Plus: **"Custom quote"**, sem ancorar US$ 30k em público. PT mantém **R$ 65.000** |
| P3 | Evolution: mostrar **os 3 planos com horas-teto**: Essencial ~10 h (R$ 4.000 / US$ 1,500), Evolução ~25 h (R$ 9.000 / US$ 4,000), Parceiro técnico ~45 h (R$ 16.000 / US$ 7,000), mensal antecipado, mínimo 3 meses, horas não acumulam, excedente R$ 400/h / US$ 160/h (`03` §4) |
| P4 | Marca provisória: **"Henrique Pett — Founding Engineer"** (pendente de confirmação do fundador, F1) |
| P5 | **Não** mencionar o limite do preço de lançamento nem a troca por case |
| P6 | **Publicar o pagamento por degrau:** Sprint 100% antecipado; Production-Ready 50% início / 50% entrega; MVP 40% assinatura / 30% beta em staging / 30% go-live; Evolution mensal antecipado |
| P7 | **"Fintech de crédito"**, sem nome, até o fundador confirmar (F5). neptune.ai: **sim, com link** para o artigo, sem destacar a data |

### 5.4 Decisões do fundador (2026-10-08, depois de P1–P7)

| # | Decisão | Efeito no projeto |
|---|---|---|
| D1 | **A marca não leva o nome do fundador.** É independente; o nome será escolhido entre as opções que a Vela está pesquisando | Substitui P4. Marca = variável única `SITE_BRAND` (env `PUBLIC_SITE_BRAND`), placeholder `"[Marca]"`. Henrique aparece só em "Quem constrói", bio e LinkedIn. Textos usam a marca o mínimo possível e na 1ª pessoa ("eu"); a marca nunca pode soar como "nós/time" (regra 1) |
| D2 | **Bom.Capital pode ser citada pelo nome**, com as métricas como relato do fundador, sem selo de resultado publicado | Substitui P7 (parte Bom.Capital). F5 resolvido |
| D3 | Preços continuam como em §5.3 | Sem mudança |

**Requisito de design para D1 (critério de pronto das fases 2–4):** o layout não depende do comprimento do nome. Wordmark só tipográfico, sem `width` fixo, com `text-wrap`/truncagem segura no header mobile e `clamp()` no tamanho. O QA testa com 3 valores de `SITE_BRAND`: curto (`"Ox"`), médio (`"[Marca]"`) e longo (`"Northbridge Product Engineering"`), em 360 px e 1280 px, no header, no footer, no `<title>` e na OG image, sem quebra nem scroll horizontal. Trocar a marca = mudar 1 env var e redeploy.

### 5.5 Respostas do fundador (2026-10-08, rodada 2)

| # | Decisão | Efeito |
|---|---|---|
| F2 | Agenda: https://calendly.com/henriquepett/45min | env `PUBLIC_BOOKING_URL` (produção e preview) |
| F9 | Controlador: Henrique Nass Pett, CNPJ 43.609.432/0001-07 | env `PUBLIC_LEGAL_NAME` e `PUBLIC_LEGAL_ID` (produção e preview) |
| F1 | Marca: "a Vela já terminou" (`research/08-marca.md`: top 3 preliminar Torno / Lavra / Cinzel, sujeito a busca de anterioridade). Nome final a confirmar com a Vela e o Maestro do projeto | `PUBLIC_SITE_BRAND` quando confirmado |
| F4 | **Pode citar a Loopt.** O cliente-terminal continua sem nome (não autorizado) | env `PUBLIC_LOOPT_AUTHORIZED=true` + copy dos cases cita "Loopt" |
| F6 | Foto: a mesma do LinkedIn (200×200, `src/assets/henrique-pett.jpg`; trocar por versão maior quando houver) | Substitui o monograma |
| F8 | O artigo da neptune.ai foi removido (aquisição pela OpenAI) | **Remover** a menção e a env `PUBLIC_NEPTUNE_ARTICLE_URL` |
| F10 | Não dizer que trabalha em tempo integral | Bio neutra (já está) |
| F11 | Nos projetos, o encarregado é o da empresa contratante | Privacidade do site: agente de pequeno porte sem encarregado indicado, canal do titular = e-mail (Res. ANPD 2/2022, art. 11; `research/09` §1). FAQ LGPD: o cliente é o controlador dos dados do produto e indica o próprio encarregado; eu atuo como operador |
| F12 | "Não se preocupe com isso" | Sem log drain; a privacidade não promete 6 meses |

**Ponto aberto levantado pelo `research/09`:** o plano Hobby da Vercel é "non-commercial, personal use only". Um site comercial precisa do plano Pro (US$ 20/mês). Decisão do fundador antes da produção.

**Decisões (2026-10-08):** (a) o fundador vai **assinar o Vercel Pro** antes da produção; (b) a **produção espera a marca final**, para não publicar "[Marca]". Até lá, só preview.

### 5.6 Decisões do fundador (2026-10-08, rodada 3)

| # | Decisão | Efeito |
|---|---|---|
| F1 | **Marca: Torno** (recomendação do Maestro do projeto, `research/08` §2). Domínio (`tornostudio.com` / `.com.br`) será comprado depois pelo fundador | `PUBLIC_SITE_BRAND=Torno`; `PUBLIC_SITE_URL` quando houver domínio; indexação liberada só com o domínio |
| Deploy | **Netlify em vez da Vercel.** Substitui §1.1 (deploy/analytics), §4 fases 5–6 e as decisões sobre Vercel Pro | `netlify.toml` (headers, cache, trailing slash), env-guard por `CONTEXT=production`, URL por `URL`/`DEPLOY_PRIME_URL`; remover `@vercel/analytics` e `@vercel/speed-insights`; privacidade cita a Netlify como hospedagem; login `npx netlify login` exige o fundador |
| Analytics | Padrão: **nenhum analytics no cliente** (zero JS de terceiros, zero cookies). Opção do fundador: Netlify Analytics (server-side, pago) | Privacidade sem "medição de visitas" até decisão |

O projeto `founding-engineer-site` na Vercel fica parado (sem produção). Apagar só se o fundador pedir.

**Produção (2026-10-08):** https://tornostudio.netlify.app (projeto Netlify `tornostudio`, time HenriPett, plano Free). Selo "Powered by Netlify" desligado via API (`built_with_badge_enabled=false`, bug B5 do QA): ele injetava um script fora do build que cobria o hero no mobile e quebrava o foco por teclado. Se o site for recriado, desligar de novo.

**Marca final (2026-10-08):** o fundador definiu a grafia **"Torno Studio"** (substitui "Torno"). env `PUBLIC_SITE_BRAND="Torno Studio"` na Netlify, em todos os contextos.

### 5.7 Rodada 4 (2026-10-08): domínio e decisões D12–D14

- **Domínio:** só `tornostudio.com` (sem .com.br), na Netlify DNS. TLS Let's Encrypt; `www` → apex (301); `tornostudio.netlify.app` → domínio (301, netlify.toml). `PUBLIC_SITE_URL=https://tornostudio.com`.
- **D14:** o site fica como está (nome, foto, LinkedIn, case Loopt). **Indexação ligada** em produção (`PUBLIC_ALLOW_INDEXING=true`).
- **D12 b:** prazos públicos mantidos.
- **D13 (revista pelo fundador em 08/10):** **sem guarda de registros de acesso.** A proposta Edge Function + S3 fica arquivada como "não adotada" em `docs/infra/LOGS-MARCO-CIVIL.md`. A privacidade descreve só o que a Netlify registra por padrão, como operadora. O Microsoft Clarity fica fora; se entrar, será no pacote de tracking do marketing (D9), com banner de consentimento.
- **Conteúdo:**
  - FinPlan removida.
  - Production-Ready sem citar ferramenta.
  - Loopt com "publicados pela Loopt".
  - Bom.Capital como relato, sem link.
  - neptune.ai citada sem link (o artigo de 7/jun/2023 não está mais online).
  - Bloqueio de exclusões de clientes (Q8).

**Produção (item 11), 2026-10-08:** commit `21b1edf` publicado em https://tornostudio.com. Suíte no ar: 271/271, mais 4 testes pulados que só valem localmente.
**Backlog técnico (não bloqueia):**
- Nos deploy previews feitos pela CLI, trocar `DEPLOY_PRIME_URL` por `DEPLOY_URL`, para que canonical, OG e sitemap do preview não apontem para `main--…`, que responde 404. Proposta do Compasso.
- `http://www` faz 2 redirecionamentos até o destino.

**Consentimento, deploy 1 (2026-10-08):** em produção no commit `2d9eb04` (código `979bfa1`).
- Banner: Necessários + Publicidade.
- Consent Mode básico: o `gtag.js` com AW-934581192 só carrega depois do aceite, com `ad_personalization` negado e `allow_ad_personalization_signals:false`.
- Opt-out do GA4 `G-G6941HG7H1`, que estava vinculado à tag.
- Política e tabela de cookies validadas pelo Alicerce.
- **Deploy 2 pendente:** Medição, popup do Calendly, UTM, conversão com `PUBLIC_GADS_CONV_LABEL` (rótulo do fundador) e `/diagnostico/`.

**Deploy 2A, decisão do Alicerce (opção A, research/09 §6):**
- O popup do Calendly fica só com Medição.
- A descrição de Medição (modal e política) informa que GA, Facebook e outras ferramentas do Calendly podem receber o IP e o endereço da página assim que o quadro abre, antes da escolha no aviso do próprio Calendly.
- **Pendência:** antes de qualquer anúncio EN voltado à UE ou ao Reino Unido, repetir o teste com IP REAL da UE. Se disparar algo antes do aviso do Calendly, a UE passa para o link de saída (por geolocalização ou, em último caso, por idioma).

**Deploy 2A em produção (2026-10-08):** commit `e3f4e9e`.
- Medição: popup do Calendly + UTM.
- Publicidade: conversão `AW-934581192/EOw5CK7RiZYdEMin0r0D` (value 1, BRL), uma por agendamento.
- QA no ar: 316/316 + 1 flaky de teclado. Na repetição 5×, os testes de teclado e de conversão deram 60/60.
- **Próximo:** deploy 2B, `/diagnostico/` (R6), até 14/nov.
- **Pendente:** teste com IP real da UE antes de anúncios na UE.

**Deploy 2B em produção (2026-10-08):** commit `e0ce4dc`. Landing https://tornostudio.com/diagnostico/ (PT, `noindex, follow`, fora do sitemap, robots livre; texto do Mote v1.2 auditado pelo Crivo).
- QA no ar: 349/349.
- Na 1ª rodada houve 4 flaky de consentimento por rede, com 4 workers contra Google e Calendly. Em série, 12/12.
- Backlog baixo:
  - ~~B8~~: corrigido em `aac0049` e publicado em produção no `3f26d38` (QA no ar 349/349).
  - Estabilizar os testes de rede externa (workers=1 no modo produção).

**B3, contador sem cookie da /diagnostico/, em produção (2026-10-09):** commit `302a41c`.
- Edge Function `count-diagnostico` + Netlify Blobs (`visitas-diagnostico`, 1 `{n}` por dia, fuso de São Paulo).
- Conta só GET de navegação real em produção (`Sec-Fetch-Dest: document` e `Sec-Fetch-Mode: navigate`, sem robô nem prefetch).
- Franquia do plano Free: 1.000.000 de invocações de edge por mês.
- TTFB quente: +11 ms.
- Leitura: `npm run visitas`, com a CLI da Netlify logada.
- A chave `2026-10-09` (48, todas de QA) foi apagada para a contagem começar limpa.
- O QA no ar usa um UA marcado como robô, para não inflar o contador.


**C1 em produção (2026-10-09):** retrato autorizado aplicado à seção Quem constrói PT/EN. Deploy `6ac931611c6d680c4ab9c222`, https://tornostudio.com. Fonte WebP 960×960 (63.156 bytes), variantes AVIF/WebP/JPEG até 480 px. Preview aprovado pelo Afinador em `docs/qa/RELATORIO-2026-10-09-c1-foto-preview.md`; produção: duas páginas e 15 variantes HTTP 200, arquivos iguais ao build (`docs/qa/evidencias/c1-foto-producao-http.json`). Build/check sem erros. Commit bloqueado por sandbox (`.git/index.lock`), deploy do working tree expressamente autorizado; HEAD base `0ce2f5c`. Playwright local bloqueado e Lighthouse não reexecutado. A4 confirma agenda, não conversão Ads. Registro completo: `projeto-50k/handoff/c1-site-2026-10-09.md`.

### Revisão de conversão — 14/10/2026
Pedido do fundador: analisar a Yaitec e aplicar melhorias ao site. Home PT passa a explicar software e IA para operação, mantendo responsabilidade individual e preços. EN mantém foco em founders. Quatro situações com exemplos e links substituem a lista genérica. Ordem atual: hero → situações → experiência do fundador → preços → garantias → método → filtros → FAQ → contato. Cases continuam identificados como experiência anterior/projeto próprio; não são clientes do studio. E-mail existente também aparece no hero; agenda e medição preservadas. FAQ distingue Sprint de implementação e explica aproveitamento de código. Esta revisão substitui a manchete e a ordem antigas do briefing; não altera ofertas, preços ou prazos.

Referência observada: https://www.yaitec.com/pt/ e https://www.yaitec.com/pt/servicos/automation (14/10/2026). Pontos úteis: exemplos operacionais, projetos e depoimentos visíveis, contato por mensagem e formatos de contratação. O site alega experiência e volume de projetos; faturamento, conversão e resultados comerciais não foram verificados. Nenhum texto, logo ou depoimento foi reutilizado. O aprendizado aplicado é tornar o trabalho e o próximo passo mais claros. Não foi aberta uma nova vertical jurídica nem criada uma oferta de automação barata.

Medição: registrar publicação desta versão; comparar conversas realizadas, qualificadas por oferta, propostas e recebimentos no CRM. Cliques de agenda consentidos não equivalem a reuniões nem ao total de contatos. Contatos por e-mail devem ter origem registrada quando conhecida. Alteração de conversão é hipótese, ainda sem resultado medido. Evidências técnicas em docs/qa/yaitec-20261014/.

### Cases aprofundados — 14/10/2026
Publicado o deploy `6acf74b406c100fbad5c86ef` em https://tornostudio.com, substituindo `6acf6ecee49ac4f37aa82f1f`. Novas páginas `/cases/loopt/`, `/cases/bom-capital/` e `/cases/ascende/`, com equivalentes `/en/cases/.../`, links nos cards da home, metadados próprios, imagens de compartilhamento e sitemap. Cada página apresenta contexto, participação, fluxo, resultado, fontes e contato.

Capturas reais dos sites públicos Loopt e Ascende, feitas em 14/10/2026, otimizadas em WebP e com legenda de origem. Loopt: gráficos de −27% movimentos improdutivos e +21% produtividade, atribuídos à empresa conforme MundoLogística (13/01/2026); índices normalizados 100→73 e 100→121. Bom.Capital: 48h médias antes e menos de 2h depois, conforme relato profissional do fundador, sem publicação externa; barra tracejada representa o limite superior de 2h. Ascende: projeto próprio publicado, recursos conferidos na página pública e documentação, exemplo com dados fictícios; não há números inventados de usuários ou receita. Loopt/Bom.Capital permanecem experiências profissionais anteriores ao studio.

Validação: build/check sem erros, 7 testes HTTP locais e 7 em produção; 17 rotas/arquivos publicados iguais ao build, CSP/indexação e infraestrutura preservados. Doze verificações de layout/imagens (seis rotas em 390px e 1440px), com revisão visual dos prints e gráficos pelo Maestri Portal. Testes Playwright usam API HTTP; navegador automatizado não foi executado por restrição do ambiente. Evidências e hashes em `docs/qa/cases-20261014/`.
