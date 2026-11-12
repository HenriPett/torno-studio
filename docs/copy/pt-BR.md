# Copy PT-BR (2026-11, Torno para a indústria)

> Substitui o copy do "Founding Engineer sob demanda" (histórico no git, até o commit `62961a0`).
> Fonte de verdade das regras: `docs/estrategia-2026-11-torno-industria.md` (§5 honestidade, §9 voz).
> O texto final vive no código; este arquivo resume onde está e o que cada página diz.

## Onde está o texto

| Página | Arquivo |
|---|---|
| Home `/` | `src/content/home.ts` (`home['pt-BR']`) + etapas e estrutura de `src/content/institucional.ts` |
| Como trabalhamos `/como-trabalhamos/` | `src/content/institucional.ts` (`howWeWork['pt-BR']`) |
| Sobre `/about/` | `src/content/institucional.ts` (`about['pt-BR']`) |
| Contato `/contact/` | `src/content/institucional.ts` (`contact['pt-BR']`) |
| Diagnóstico `/diagnostico/` (Google Ads) | `src/content/pt-BR.ts` (`diagnostico`) |
| Meta da home, OG, rótulos comuns, consentimento, privacidade, 404 | `src/content/pt-BR.ts` |
| Header, footer, selo "Ilustração" | `src/content/chrome.ts` (design system) |
| Cases | `src/content/cases.ts` (a home e o /about/ leem só `name`, `title`, `description`, `category`, `routeId`) |

## Resumo por página

### Home
1. **Hero:** "IA aplicada à operação industrial, desenhada para a sua fábrica." CTA "Agendar diagnóstico" e "Ver como trabalhamos".
2. **O cérebro da operação:** "Pergunte à fábrica. A resposta vem com a fonte." O que entra na base (ERP, MES, planilhas, fichas, procedimentos, não conformidades, contratos, e-mails). Mock de pergunta e resposta com selo "Ilustração".
3. **Soluções** (`#solucoes`, âncora do header): agentes por área com exemplos ilustrativos (produção e PCP, qualidade, manutenção, comercial e representantes, marketing e catálogo, suprimentos, conhecimento dos operadores, gestão).
4. **Software sob medida:** portal de representantes, painel de chão de fábrica, integração. Mock de painel com selo.
5. **Como trabalhamos:** as 5 etapas (conversa inicial, diagnóstico, piloto, implantação por etapas, operação assistida). Carrega também o id legado `#precos`, que artigos do blog linkam.
6. **Estrutura de entrega:** liderança técnica única, rede de especialistas, governança, segurança e LGPD, continuidade.
7. **Prova:** −27% de movimentos improdutivos e +21% de produtividade, segundo a Loopt (MundoLogística, 13/01/2026), e os três cases.
8. **Para quem é / não é.**
9. **FAQ:** ERP, dados, preço (proposta fechada por etapa), prazo, "é uma pessoa só?", erro da IA, transição para a TI.
10. **CTA final:** "Vamos olhar a sua operação."

### Como trabalhamos
Etapas com "o que fazemos" e "o que a empresa recebe"; estrutura de entrega; governança; segurança e LGPD; continuidade; o que precisamos da empresa; FAQ; CTA.

### Sobre
Por que a Torno existe; foco em indústria a partir de Jaraguá do Sul; as 5 etapas; liderança técnica (Henrique Pett, fundador e líder técnico, foto pequena e link para o autor); cases; CTA.

### Contato
Agenda, e-mail (só com `PUBLIC_CONTACT_EMAIL`), LinkedIn da empresa; o que levar para a conversa; o que acontece depois; onde estamos.

### /diagnostico/
"Descubra onde a IA ajuda a sua fábrica antes de investir nela." O que a empresa recebe; como funciona; provas (Loopt com fonte, Bom.Capital como relato); FAQ; CTA final. Sem preço, `noindex, follow`.

## Regras rápidas
- Voz "nós"/"a Torno". Sem "eu" nas páginas institucionais.
- Sem preço público. "Proposta fechada por etapa."
- Sem setor citado na home e nenhum link para `/para/`.
- Métricas só com fonte; mocks e exemplos sempre rotulados.
