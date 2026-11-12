# Briefing: site da Torno (IA e software sob medida para a indústria)

> Atualizado em 2026-11-12. Substitui o briefing do "Founding Engineer sob demanda" para PMEs.
> Fonte de verdade: `docs/estrategia-2026-11-torno-industria.md`. Leia inteiro antes de mexer no site.
> Fundador e líder técnico: Henrique Pett. Deploy: Netlify (`main` publica em tornostudio.com; pull requests ganham deploy preview).

## 1. Objetivo do site

Ser a prova de seriedade da Torno para indústrias com 200+ funcionários e o destino dos links de outbound e de campanha. A métrica é: o diretor industrial, de TI ou o CEO entende em 10 segundos o que a Torno faz pela operação dele e agenda o diagnóstico.

Públicos:
- **PT-BR (principal):** decisores de indústrias com 200+ funcionários no Brasil, com prioridade para Santa Catarina e o Sul.
- **EN (enxuto):** a mesma oferta para quem chega em inglês; landings de setor só em PT.

## 2. Posicionamento

- Marca: **Torno** (sem "Studio" no site). Domínio `tornostudio.com` mantido por ora.
- Categoria: engenharia de IA e software sob medida para a indústria.
- Promessa: juntar dados e conhecimento da operação num cérebro da empresa e colocar agentes de IA para trabalhar nas áreas (produção e PCP, qualidade, manutenção, comercial e representantes, marketing, suprimentos, gestão), implantando por etapas, dentro das regras da TI do cliente, com responsabilidade clara.
- Entrada: conversa de 45 min e diagnóstico com proposta fechada. Sem preços públicos.

## 3. Regras invioláveis

1. **Marca institucional, sem afirmações falsas.** Voz em "nós" e "a Torno". Proibido inventar membros de equipe, número de funcionários, escritórios, logos, depoimentos, certificações, prêmios, parcerias ou métricas. A estrutura que mostramos é real: liderança técnica única, rede de especialistas sob demanda, governança, segurança e continuidade (estratégia §4.4).
2. **Sem promessa de resultado** ("reduza X%", "ROI em N meses", "substitui pessoas", "10x").
3. **Só métricas com fonte pública.** Loopt: −27% de movimentos improdutivos e +21% de produtividade, segundo a Loopt (MundoLogística, 13/01/2026), resultado da solução da equipe. Nunca "−41%" nem "−31%". Bom.Capital: números autodeclarados, sempre como relato.
4. **Não citar clientes da Loopt** nem descrevê-los de forma identificável. O nome "Loopt" só aparece onde já aparecia (case e prova, com fonte).
5. **Projetos próprios** (Ascende) aparecem como projetos próprios, nunca como clientes. Cases são experiência de quem conduz a Torno, não clientes contratados.
6. **Cenários e mocks de interface levam rótulo** ("Cenário ilustrativo", "Ilustração") e não usam nomes de empresas reais.
7. **Landings de setor isoladas** (`/para/<setor>/`): nenhuma página, menu, rodapé, blog, sitemap, `llms.txt` ou landing de outro setor aponta para elas; `noindex`. O build falha se isso for quebrado.
8. **Blog intocado no conteúdo:** `src/content/blog`, `src/content.config.ts`, `src/config/blog*` e `scripts/test-blog-*` pertencem ao job editorial. Mudanças no blog são só de layout e estilo.
9. **Sem foto de banco.** Visual tipográfico e mocks rotulados.

## 4. Requisitos técnicos

- Astro 5 estático na Netlify; i18n PT/EN com `hreflang` nas páginas que existem nos dois idiomas.
- Lighthouse ≥ 95 em desempenho, acessibilidade, boas práticas e SEO; axe sem violações sérias; sem rolagem horizontal em 360 px; claro e escuro.
- Consentimento e Google Ads conforme `docs/consent/` (não mexer sem necessidade). Contador de visitas sem cookie na `/diagnostico/` e nas landings de setor.
- Design: `docs/design/DESIGN-2026-11.md` e a página interna `/design-system/`.
- Agenda: `PUBLIC_BOOKING_URL`; e-mail: `PUBLIC_CONTACT_EMAIL`; controlador: `PUBLIC_LEGAL_NAME`/`PUBLIC_LEGAL_ID` (obrigatórios em produção).

## 5. Decisões pendentes do fundador

Ver `docs/estrategia-2026-11-torno-industria.md` §11 (domínio, preço do diagnóstico, páginas antigas, autorização da Loopt, plano de outbound, nome da página no LinkedIn).
