# Briefing: site do "Founding Engineer sob demanda"

> Origem: `/Users/henriquepett/Downloads/pessoal/projeto-50k/plano/plano-de-negocios.md`. É a **fonte da verdade**: leia inteiro antes de começar. Os detalhes de oferta, mensagem e prova social estão em `projeto-50k/research/03-oferta-e-precificacao.md` (§4) e `05-go-to-market.md` (§8, §9 e §10).
> Fundador: Henrique Pett. Currículo em `projeto-50k/base/01-curriculo-en.txt` e `01-curriculo-pt.md`. Portfólio em `projeto-50k/base/02-portfolio-pessoal.md`.
> Deploy: **Vercel**.

## 1. Objetivo do site

É a "landing pública" das semanas 1–2 do plano de 90 dias (`05` §7). Ela serve de prova e de destino dos links do LinkedIn, das DMs e do one-pager. **O site não é canal de aquisição.** A métrica é: **o visitante entende a oferta em 10 segundos e agenda o diagnóstico de 45 min.**

Públicos (plano §4):
- **PT-BR:** dono, diretor de operações ou CFO de empresa tradicional média (50–249 pessoas) com operação manual ou em planilha.
- **EN:** founder pre-seed/seed sem CTO, nos EUA ou na Europa.
- **Ambos:** quem já tem protótipo em Lovable/Bolt e precisa levar à produção.

Portanto o site é **bilíngue (PT e EN)**, com rotas separadas, e não com tradução automática.

## 2. Posicionamento (plano §3), não alterar sem falar com o Maestro do projeto

- Categoria: **"Founding Engineer sob demanda" / "Fractional Founding Engineer"**.
- Manchete PT: *"Seu produto em produção em 6–10 semanas, construído e mantido por um único responsável sênior."*
- Manchete EN: *"Ship your product without hiring a team. One senior product engineer, accountable end to end."*
- Ênfase: **redução de complexidade + responsabilidade única + contato direto com quem constrói.** Velocidade aparece como atributo. **Nunca** vender por custo ou "mais barato".
- **"AI-native" só como prova de método** (seção "como eu trabalho"), nunca como manchete.

## 3. Regras invioláveis (plano §3 e proposta §7 e §15)

1. **Não fingir equipe.** O texto é em primeira pessoa ("eu"): um Product Engineer sênior, mais IA, mais rede de especialistas quando necessário. Nada de "nosso time de engenheiros".
2. **Não prometer:** "5x/10x mais rápido", "substitui 5 engenheiros", "sempre mais barato", "qualquer produto em 2 semanas", "fazemos tudo".
3. **Só métricas com fonte pública.** Loopt: **−27% de movimentos improdutivos e +21% de produtividade** (MundoLogística, 13/01/2026). **NÃO** usar "−41%" nem "−31%". **Não citar o nome "Loopt" nem do cliente-terminal sem autorização da Loopt:** até lá, escrever "produto de IA para operação de terminais de contêiner". Métricas da Bom.Capital e o "2 semanas → 30 min" são **autodeclarados**. Se usados, aparecem como relato ("reduzi..."), nunca como resultado publicado com selo.
4. **Projetos pessoais** (Ascende, FinPlan) aparecem como **projetos próprios**, nunca como clientes.
5. **Nada de depoimentos, logos de clientes ou reviews inventados.** Ainda não existe cliente do studio. Deixar o espaço preparado, mas vazio ou oculto.
6. Experiência internacional: "trabalhei remotamente em inglês numa consultoria que atendia empresas europeias". **Não** dizer "atendi clientes internacionais".

## 4. Estrutura sugerida (a equipe pode melhorar)

1. **Hero:** manchete + subtítulo + CTA "Agendar diagnóstico (45 min, grátis)".
2. **O problema:** "Tenho um problema/ideia e não quero montar um time" (exemplos da proposta §8: planilha, operação manual, SaaS, adicionar IA, protótipo que não aguenta produção).
3. **Como funciona: a escada** (plano §5.1), **com preços públicos**. Nenhuma software house brasileira publica preço; isso é diferencial (`02` §0.5):
   - Diagnóstico 45 min: grátis
   - Product Sprint: R$ 6.000 / US$ 3,000 (100% abatido do MVP se assinado em 30 dias; os entregáveis são do cliente)
   - Production-Ready (protótipo → produção): R$ 18.000 / US$ 7,000
   - MVP Core: R$ 42.000 / "from US$ 15,000" (preço de lançamento US$ 12–15k)
   - MVP Plus: R$ 65.000 / US$ 30,000
   - Product Evolution: a partir de R$ 4.000/mês / from US$ 1,500/mo, com horas-teto
   - Usar "a partir de" quando fizer sentido. Confirmar com o Maestro do projeto se o EN mostra o preço de lançamento.
4. **Garantias e regras:** garantia de 60 dias para bugs; escopo fechado com lista do que fica fora; código e nuvem na conta do cliente desde o dia 1; pagamento por marco; no máximo 1 MVP por vez ("quando eu pego seu projeto, ele tem minha atenção").
5. **Quem constrói:** Henrique, trajetória (PM + ML + full stack), cases conforme a regra 3, link para LinkedIn e GitHub.
6. **Como eu trabalho:** IA, agentes de código, testes e infra automatizados; especialistas sob demanda (pentest, design de marca, mobile nativo).
7. **O que eu não faço / para quem não é** (filtro honesto).
8. **FAQ:** prazo, propriedade do código, o que acontece se eu ficar indisponível (plano §7), NDA, LGPD/GDPR, cobrança internacional.
9. **CTA final + contato.**

## 5. Requisitos técnicos

- Framework à escolha da equipe, adequado à Vercel (ex.: Next.js App Router com SSG, ou Astro). Site estático, rápido, Lighthouse ≥ 95 em performance, acessibilidade e SEO.
- i18n PT/EN com `hreflang`, metadados, OG images, sitemap, robots.
- Analytics leve, sem banner de cookies desnecessário (ex.: Vercel Analytics). Respeitar LGPD/GDPR.
- Agendamento: link para ferramenta de agenda (Cal.com ou Calendly). **SEM DADO:** URL a definir pelo fundador, usar placeholder configurável.
- Formulário de contato opcional; se houver, sem armazenar dados pessoais desnecessários.
- Responsivo, dark/light, sem stock photos genéricas.

## 6. Decisões pendentes do fundador (perguntar, não inventar)

- **Nome da marca e domínio.** Até lá, usar "Henrique Pett — Founding Engineer" como marca provisória e a URL `*.vercel.app`.
- Link de agendamento e e-mail público.
- Autorização da Loopt para citar o nome (até lá, regra 3).
- Conta/time da Vercel (login: `npx vercel login`, que exige ação do fundador).
