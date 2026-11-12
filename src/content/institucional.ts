/**
 * Conteúdo das páginas institucionais: /como-trabalhamos/, /about/, /contact/ (+ EN) e os blocos que a home
 * e a /diagnostico/ reaproveitam (etapas e estrutura de entrega).
 * Fonte: docs/estrategia-2026-11-torno-industria.md §4.2 (etapas), §4.4 (estrutura), §5 (honestidade), §9 (voz).
 * Voz "nós"/"a Torno". Sem preço, sem equipe inventada, sem promessa de resultado.
 */
import type { Locale } from '../config/routes.mjs';
import type { FaqEntry, FeatureEntry, StepEntry } from './types';

/** As cinco etapas reais (estratégia §4.2). Usadas na home, em /como-trabalhamos/ e no /sobre/. */
export const etapas: Record<Locale, StepEntry[]> = {
  'pt-BR': [
    {
      meta: '45 minutos, sem custo',
      title: 'Conversa inicial',
      body: 'Entendemos a operação, o problema que mais pesa e quem decide.',
    },
    {
      meta: '2 a 4 semanas',
      title: 'Diagnóstico',
      body: 'Entrevistas por área, inventário de dados e sistemas e um mapa de oportunidades com esforço e risco.',
    },
    {
      meta: 'Uma área, um problema',
      title: 'Piloto',
      body: 'Critério de sucesso combinado antes e medido depois, com dados reais da operação.',
    },
    {
      meta: 'Área por área',
      title: 'Implantação por etapas',
      body: 'As outras áreas entram na ordem que o piloto indicar, sobre a mesma base.',
    },
    {
      meta: 'Mensal',
      title: 'Operação assistida',
      body: 'Monitoramento, ajustes, novos casos de uso, treinamento e relatório mensal.',
    },
  ],
  en: [
    { meta: '45 minutes, free', title: 'Intro call', body: 'We learn how the plant runs, which problem hurts most and who decides.' },
    {
      meta: '2 to 4 weeks',
      title: 'Assessment',
      body: 'Interviews in each area, an inventory of data and systems and a map of opportunities with effort and risk.',
    },
    { meta: 'One area, one problem', title: 'Pilot', body: 'A success criterion agreed up front and measured afterwards, on real plant data.' },
    { meta: 'Area by area', title: 'Staged rollout', body: 'Other areas follow in the order the pilot suggests, on the same foundation.' },
    { meta: 'Monthly', title: 'Managed operation', body: 'Monitoring, tuning, new use cases, training and a monthly report.' },
  ],
};

/** Estrutura de entrega (estratégia §4.4): responde a "é uma pessoa só?" sem inventar equipe. */
export const estrutura: Record<Locale, FeatureEntry[]> = {
  'pt-BR': [
    {
      eyebrow: 'Responsável',
      title: 'Liderança técnica única',
      body: 'Uma pessoa responde pelo projeto do diagnóstico à operação. Hoje é Henrique Pett, fundador da Torno.',
    },
    {
      eyebrow: 'Especialistas',
      title: 'Rede sob demanda',
      body: 'Dados, segurança, UX, infraestrutura e especialistas do setor entram conforme o escopo, nomeados na proposta.',
    },
    {
      eyebrow: 'Governança',
      title: 'Ritos e registro',
      body: 'Patrocinador e ponto focal na empresa, reunião quinzenal, critério de sucesso por etapa e relatório mensal.',
    },
    {
      eyebrow: 'Segurança e LGPD',
      title: 'Dados sob as regras da TI',
      body: 'Infraestrutura da empresa ou nuvem aprovada pela TI, acesso por perfil e uso registrado. Os dados não treinam modelos de terceiros.',
    },
    {
      eyebrow: 'Continuidade',
      title: 'Tudo em nome da empresa',
      body: 'Código, documentação, acessos e contas são da empresa desde o primeiro dia, com manual de operação para a TI assumir quando quiser.',
    },
  ],
  en: [
    {
      eyebrow: 'Accountability',
      title: 'One technical lead',
      body: 'One person answers for the project from assessment to operation. Today that is Henrique Pett, founder of Torno.',
    },
    {
      eyebrow: 'Specialists',
      title: 'On-demand network',
      body: 'Data, security, UX, infrastructure and industry specialists join by scope and are named in the proposal.',
    },
    {
      eyebrow: 'Governance',
      title: 'Cadence and records',
      body: 'A sponsor and a point of contact on your side, biweekly reviews, a success criterion per stage and a monthly report.',
    },
    {
      eyebrow: 'Security and privacy',
      title: 'Data under your IT rules',
      body: 'Your infrastructure or a cloud your IT approves, role-based access and usage logs. Your data never trains third-party models.',
    },
    {
      eyebrow: 'Continuity',
      title: 'Everything in your name',
      body: 'Code, documentation, access and accounts belong to you from day one, with a runbook so your IT can take over when it wants.',
    },
  ],
};

/* ------------------------------------------------------------------------------------------------ */
/* /como-trabalhamos/ e /en/how-we-work/                                                            */
/* ------------------------------------------------------------------------------------------------ */

export interface Stage {
  title: string;
  meta: string;
  body: string;
  /** O que fazemos. */
  work: string[];
  /** O que a empresa recebe. */
  deliverable: string;
}

export interface HowWeWorkContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; secondary: string };
  stages: { eyebrow: string; title: string; lead: string; workLabel: string; deliverableLabel: string; items: Stage[] };
  delivery: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  governance: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  security: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  continuity: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  client: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  faq: { title: string; items: FaqEntry[] };
  cta: { title: string; text: string };
}

export const howWeWork: Record<Locale, HowWeWorkContent> = {
  'pt-BR': {
    meta: {
      title: 'Como trabalhamos | {brand}',
      description:
        'Etapas, entregas, governança, segurança e continuidade da Torno: do diagnóstico à operação assistida, com proposta fechada por etapa.',
    },
    hero: {
      eyebrow: 'Como trabalhamos',
      title: 'Por etapas, com o critério de sucesso combinado antes.',
      lead: 'Cada etapa tem proposta fechada, um entregável definido e termina com uma decisão da empresa. A próxima só começa quando a anterior foi medida.',
      secondary: 'Ver as etapas',
    },
    stages: {
      eyebrow: 'Etapas',
      title: 'Da primeira conversa à operação.',
      lead: 'A empresa pode parar ao fim de qualquer etapa e fica com o que foi entregue até ali.',
      workLabel: 'O que fazemos',
      deliverableLabel: 'O que a empresa recebe',
      items: [
        {
          title: 'Conversa inicial',
          meta: '45 minutos, sem custo',
          body: 'Uma conversa com quem conhece a operação e com quem decide.',
          work: [
            'Entendemos a operação, os sistemas em uso e o problema que mais pesa.',
            'Verificamos se há encaixe e quem patrocina o projeto.',
          ],
          deliverable: 'Proposta fechada do diagnóstico, ou a indicação de que não há encaixe.',
        },
        {
          title: 'Diagnóstico',
          meta: 'Planejado para 2 a 4 semanas',
          body: 'Um retrato das áreas, dos dados e de onde a IA paga o esforço.',
          work: [
            'Entrevistas com uma ou duas pessoas por área.',
            'Inventário de dados e sistemas com a TI: ERP, MES, planilhas, documentos e históricos.',
            'Estimativa de esforço e risco de cada oportunidade.',
          ],
          deliverable:
            'Relatório com o mapa de oportunidades, a recomendação de um piloto e o critério de sucesso. O relatório é da empresa, contrate ou não o restante.',
        },
        {
          title: 'Piloto',
          meta: 'Uma área, um problema',
          body: 'O primeiro uso real, pequeno o bastante para medir.',
          work: [
            'Montamos a parte do cérebro da operação que o piloto precisa.',
            'Construímos o agente ou a tela e treinamos quem vai usar.',
            'Medimos o critério de sucesso antes e depois.',
          ],
          deliverable: 'Piloto em uso, com a medição combinada e a recomendação do que expandir.',
        },
        {
          title: 'Implantação por etapas',
          meta: 'Área por área',
          body: 'As outras áreas entram na ordem que o piloto indicar.',
          work: [
            'Cada área nova tem escopo, responsável e critério próprios.',
            'Integrações com os sistemas da empresa feitas com a TI.',
          ],
          deliverable: 'Cada área em uso, documentada e com o critério da etapa medido.',
        },
        {
          title: 'Operação assistida',
          meta: 'Mensalidade',
          body: 'Acompanhamento depois que os agentes entram no dia a dia.',
          work: [
            'Monitoramento de uso e de qualidade das respostas.',
            'Ajustes, novos casos de uso e treinamento de quem chega.',
          ],
          deliverable: 'Relatório mensal com uso, problemas resolvidos e próximos passos.',
        },
      ],
    },
    delivery: {
      eyebrow: 'Estrutura de entrega',
      title: 'Uma liderança técnica e especialistas quando o escopo pede.',
      lead: 'A empresa sabe desde o início quem responde pelo projeto e quem mais vai trabalhar nele.',
      items: [
        {
          eyebrow: 'Liderança técnica única',
          title: 'Uma pessoa responde do diagnóstico à operação',
          body: 'Hoje é Henrique Pett, fundador da Torno. Ele conduz as entrevistas, desenha a solução, escreve código e responde pelos resultados de cada etapa.',
        },
        {
          eyebrow: 'Rede de especialistas sob demanda',
          title: 'Especialistas nomeados na proposta',
          body: 'Dados, segurança, UX, infraestrutura e especialistas do setor entram quando o escopo pede. Cada um aparece com nome e papel na proposta antes de começar.',
        },
      ],
    },
    governance: {
      eyebrow: 'Governança',
      title: 'Ritos simples, decisões por escrito.',
      lead: 'A diretoria acompanha o projeto sem precisar entrar no detalhe técnico.',
      items: [
        { title: 'Patrocinador e ponto focal', body: 'Um patrocinador na diretoria e um ponto focal na operação, definidos na proposta.' },
        { title: 'Reunião quinzenal', body: 'Andamento, bloqueios e decisões pendentes, com pauta enviada antes.' },
        { title: 'Critério por etapa', body: 'Cada etapa tem um critério de sucesso combinado antes de começar e medido no fim.' },
        { title: 'Relatório mensal', body: 'O que foi feito, o que foi medido, o que mudou e o que vem a seguir.' },
        { title: 'Registro de decisões', body: 'Decisões técnicas e de escopo registradas com data, motivo e quem aprovou.' },
      ],
    },
    security: {
      eyebrow: 'Segurança e LGPD',
      title: 'Os dados seguem as regras da sua TI.',
      lead: 'A arquitetura é aprovada pela TI antes de qualquer dado sair de onde está.',
      items: [
        { title: 'Onde os dados ficam', body: 'Na infraestrutura da empresa ou numa nuvem aprovada pela TI.' },
        { title: 'Acesso por perfil', body: 'Cada pessoa consulta só o que o perfil dela permite nos sistemas de origem.' },
        { title: 'Uso registrado', body: 'Perguntas, respostas e ações dos agentes ficam registradas para auditoria.' },
        { title: 'Modelos de terceiros', body: 'Os dados da empresa não são usados para treinar modelos de terceiros.' },
        { title: 'Confidencialidade', body: 'Acordo de confidencialidade assinado antes do diagnóstico, quando a empresa pedir.' },
        { title: 'LGPD', body: 'Dados pessoais tratados só para a finalidade combinada, com o papel de cada parte definido em contrato.' },
      ],
    },
    continuity: {
      eyebrow: 'Continuidade',
      title: 'A empresa não fica presa à Torno.',
      lead: 'O que construímos continua funcionando com ou sem a gente.',
      items: [
        { title: 'Em nome da empresa', body: 'Código, documentação, acessos e contas de nuvem ficam em nome da empresa desde o primeiro dia.' },
        { title: 'Manual de operação', body: 'Como funciona, como monitorar, o que fazer quando algo falha e como incluir um caso novo.' },
        { title: 'Transição para a TI', body: 'Quando a TI quiser assumir, fazemos a passagem com sessões de trabalho e acompanhamento.' },
      ],
    },
    client: {
      eyebrow: 'Da sua parte',
      title: 'O que precisamos da empresa.',
      lead: 'O esforço da equipe interna é pequeno, mas precisa estar reservado na agenda.',
      items: [
        { title: 'Um patrocinador', body: 'Alguém da diretoria que decide ao fim de cada etapa.' },
        { title: 'Um ponto focal', body: 'Uma pessoa da operação que agenda entrevistas e destrava acessos.' },
        { title: 'Tempo das áreas', body: 'Cerca de uma hora por pessoa entrevistada no diagnóstico e o usuário-chave no piloto.' },
        { title: 'A TI junto', body: 'Acesso aos sistemas combinado com a TI, de preferência com perfil de leitura.' },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Quanto custa?',
          a: 'Cada etapa tem proposta fechada. O diagnóstico é orçado depois da conversa inicial; o piloto e a implantação, depois do diagnóstico, porque o valor depende das áreas, dos sistemas e do volume de dados. A operação assistida é mensal.',
        },
        {
          q: 'A Torno é uma pessoa só?',
          a: 'A Torno tem uma liderança técnica única, Henrique Pett, que responde pelo projeto inteiro. Especialistas em dados, segurança, UX, infraestrutura ou do setor entram conforme o escopo e são nomeados na proposta.\n\nA governança, a documentação e as contas em nome da empresa existem para que o projeto não dependa da memória de ninguém.',
        },
        {
          q: 'Precisa trocar o ERP?',
          a: 'Não. Trabalhamos sobre o que a empresa já usa, seja TOTVS, SAP, Senior ou outro, com os acessos que a TI liberar.',
        },
        {
          q: 'A IA pode errar?',
          a: 'Pode. Por isso cada resposta cita a fonte, cada agente tem um responsável na área e ações que alteram dados nos sistemas passam pela aprovação de uma pessoa.',
        },
        {
          q: 'Podemos parar no meio?',
          a: 'Sim, ao fim de qualquer etapa. A empresa fica com o que foi entregue até ali, inclusive código e documentação.',
        },
      ],
    },
    cta: {
      title: 'Comece pela conversa inicial.',
      text: '45 minutos, sem custo, para entender a operação e ver se o diagnóstico faz sentido.',
    },
  },
  en: {
    meta: {
      title: 'How we work | {brand}',
      description:
        'Torno’s stages, deliverables, governance, security and continuity: from assessment to managed operation, with a fixed proposal per stage.',
    },
    hero: {
      eyebrow: 'How we work',
      title: 'In stages, with success defined up front.',
      lead: 'Every stage has a fixed proposal and a defined deliverable, and ends with your decision. The next one starts only after the last one was measured.',
      secondary: 'See the stages',
    },
    stages: {
      eyebrow: 'Stages',
      title: 'From the first call to operation.',
      lead: 'You can stop at the end of any stage and keep everything delivered so far.',
      workLabel: 'What we do',
      deliverableLabel: 'What you get',
      items: [
        {
          title: 'Intro call',
          meta: '45 minutes, free',
          body: 'A conversation with people who know the operation and people who decide.',
          work: ['We learn how the plant runs, which systems it uses and which problem hurts most.', 'We check fit and who sponsors the project.'],
          deliverable: 'A fixed proposal for the assessment, or a clear note that it is not a fit.',
        },
        {
          title: 'Assessment',
          meta: 'Planned for 2 to 4 weeks',
          body: 'A picture of the areas, the data and where AI is worth the effort.',
          work: [
            'Interviews with one or two people per area.',
            'An inventory of data and systems with IT: ERP, MES, spreadsheets, documents and records.',
            'Effort and risk estimates for each opportunity.',
          ],
          deliverable: 'A report with the opportunity map, a recommended pilot and its success criterion. The report is yours either way.',
        },
        {
          title: 'Pilot',
          meta: 'One area, one problem',
          body: 'The first real use, small enough to measure.',
          work: [
            'We build the part of the operations brain the pilot needs.',
            'We build the agent or screen and train the people who will use it.',
            'We measure the success criterion before and after.',
          ],
          deliverable: 'A pilot in use, with the agreed measurement and a recommendation on what to expand.',
        },
        {
          title: 'Staged rollout',
          meta: 'Area by area',
          body: 'Other areas follow in the order the pilot suggests.',
          work: ['Each new area has its own scope, owner and criterion.', 'Integrations with your systems are built together with IT.'],
          deliverable: 'Each area in use, documented, with its criterion measured.',
        },
        {
          title: 'Managed operation',
          meta: 'Monthly fee',
          body: 'Support once the agents are part of daily work.',
          work: ['Monitoring of usage and answer quality.', 'Tuning, new use cases and training for new staff.'],
          deliverable: 'A monthly report on usage, issues solved and next steps.',
        },
      ],
    },
    delivery: {
      eyebrow: 'Delivery structure',
      title: 'One technical lead, plus specialists when the scope calls for them.',
      lead: 'From day one you know who is accountable and who else will work on the project.',
      items: [
        {
          eyebrow: 'One technical lead',
          title: 'One person answers from assessment to operation',
          body: 'Today that is Henrique Pett, founder of Torno. He runs the interviews, designs the solution, writes code and answers for each stage.',
        },
        {
          eyebrow: 'On-demand specialist network',
          title: 'Specialists named in the proposal',
          body: 'Data, security, UX, infrastructure and industry specialists join when the scope calls for them, each named with a role in the proposal.',
        },
      ],
    },
    governance: {
      eyebrow: 'Governance',
      title: 'Simple cadence, decisions in writing.',
      lead: 'Leadership can follow the project without diving into technical detail.',
      items: [
        { title: 'Sponsor and point of contact', body: 'A sponsor in leadership and a point of contact in operations, named in the proposal.' },
        { title: 'Biweekly review', body: 'Progress, blockers and pending decisions, with an agenda sent ahead.' },
        { title: 'Criterion per stage', body: 'Each stage has a success criterion agreed before it starts and measured at the end.' },
        { title: 'Monthly report', body: 'What was done, what was measured, what changed and what comes next.' },
        { title: 'Decision log', body: 'Technical and scope decisions recorded with date, reason and approver.' },
      ],
    },
    security: {
      eyebrow: 'Security and privacy',
      title: 'Your data follows your IT rules.',
      lead: 'IT approves the architecture before any data moves.',
      items: [
        { title: 'Where data lives', body: 'In your infrastructure or a cloud your IT approves.' },
        { title: 'Role-based access', body: 'Each person sees only what their role allows in the source systems.' },
        { title: 'Usage logs', body: 'Questions, answers and agent actions are logged for audit.' },
        { title: 'Third-party models', body: 'Your data is never used to train third-party models.' },
        { title: 'Confidentiality', body: 'An NDA signed before the assessment, when you ask for one.' },
        { title: 'Data protection', body: 'Personal data used only for the agreed purpose, with each party’s role set in the contract.' },
      ],
    },
    continuity: {
      eyebrow: 'Continuity',
      title: 'You are never locked in.',
      lead: 'What we build keeps running with or without us.',
      items: [
        { title: 'In your name', body: 'Code, documentation, access and cloud accounts are yours from day one.' },
        { title: 'Runbook', body: 'How it works, how to monitor it, what to do when something fails and how to add a use case.' },
        { title: 'Handover to IT', body: 'When IT wants to take over, we hand over with working sessions and follow-up.' },
      ],
    },
    client: {
      eyebrow: 'On your side',
      title: 'What we need from you.',
      lead: 'The internal effort is small, but it has to be on the calendar.',
      items: [
        { title: 'A sponsor', body: 'Someone in leadership who decides at the end of each stage.' },
        { title: 'A point of contact', body: 'Someone in operations who books interviews and unblocks access.' },
        { title: 'Time from each area', body: 'About an hour per person interviewed, and a key user during the pilot.' },
        { title: 'IT on board', body: 'System access agreed with IT, read-only where possible.' },
      ],
    },
    faq: {
      title: 'Questions',
      items: [
        {
          q: 'How much does it cost?',
          a: 'Each stage has a fixed proposal. The assessment is quoted after the intro call; the pilot and rollout after the assessment, because the price depends on areas, systems and data volume. Managed operation is a monthly fee.',
        },
        {
          q: 'Is Torno just one person?',
          a: 'Torno has one technical lead, Henrique Pett, who is accountable for the whole project. Data, security, UX, infrastructure or industry specialists join by scope and are named in the proposal.',
        },
        { q: 'Do we need to replace our ERP?', a: 'No. We work on top of what you already use, whether TOTVS, SAP or another system, with the access your IT grants.' },
        {
          q: 'Can we stop halfway?',
          a: 'Yes, at the end of any stage. You keep everything delivered so far, including code and documentation.',
        },
      ],
    },
    cta: { title: 'Start with an intro call.', text: '45 minutes, free, to understand your operation and see whether an assessment makes sense.' },
  },
};

/* ------------------------------------------------------------------------------------------------ */
/* /about/ e /en/about/                                                                             */
/* ------------------------------------------------------------------------------------------------ */

export interface AboutContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  why: { eyebrow: string; title: string; paragraphs: string[] };
  focus: { eyebrow: string; title: string; paragraphs: string[]; facts: FeatureEntry[] };
  process: { eyebrow: string; title: string; lead: string; link: string };
  lead: { eyebrow: string; title: string; name: string; role: string; photoAlt: string; bio: string[]; authorLink: string };
  cases: { eyebrow: string; title: string; lead: string; link: string; caseLink: string };
  cta: { title: string; text: string; secondary: string };
}

export const about: Record<Locale, AboutContent> = {
  'pt-BR': {
    meta: {
      title: 'Sobre a {brand} | IA e software para a indústria',
      description:
        'A Torno implanta IA e software sob medida na operação de indústrias com 200 ou mais funcionários. Jaraguá do Sul, SC. Liderança técnica de Henrique Pett.',
    },
    hero: {
      eyebrow: 'Sobre a Torno',
      title: 'Engenharia de IA e software para quem fabrica.',
      lead: 'A Torno implanta IA na operação de indústrias médias e grandes, área por área, junto com a TI e com responsabilidade clara do diagnóstico à operação.',
    },
    why: {
      eyebrow: 'Por que existimos',
      title: 'Ferramenta de IA sobra. Falta quem implante na fábrica.',
      paragraphs: [
        'Há muito produto de IA horizontal e pouco adaptado à rotina de uma indústria. Ficha técnica, setup, refugo, carteira de pedidos e o saber de quem opera a máquina há décadas raramente estão no mesmo lugar, e nenhuma ferramenta pronta resolve isso sozinha.',
        'A Torno começa pela operação. Entrevistamos as áreas, entendemos os sistemas e os documentos, e só então propomos o que construir. O primeiro passo é um piloto curto, com critério de sucesso combinado antes. A expansão segue o que o piloto mostrar.',
      ],
    },
    focus: {
      eyebrow: 'Foco',
      title: 'Só indústria, a partir de Jaraguá do Sul.',
      paragraphs: [
        'A Torno fica em Jaraguá do Sul, no norte de Santa Catarina, cidade de forte presença industrial. Atendemos indústrias com 200 ou mais funcionários no Brasil, com prioridade para o Sul.',
        'O trabalho é remoto, com idas à planta quando a etapa pede, combinadas na proposta.',
      ],
      facts: [
        { title: 'Indústrias com 200+ funcionários', body: 'Com ERP implantado e informação espalhada em planilhas, documentos e pessoas.' },
        { title: 'Jaraguá do Sul, SC', body: 'Atendimento a todo o Brasil, com prioridade para Santa Catarina e o Sul.' },
        { title: 'Proposta fechada por etapa', body: 'Diagnóstico, piloto e implantação orçados separadamente, depois de cada decisão.' },
      ],
    },
    process: {
      eyebrow: 'Como trabalhamos',
      title: 'Cinco etapas, cada uma com uma decisão no fim.',
      lead: 'Da conversa inicial à operação assistida, com governança, segurança e continuidade descritas antes de começar.',
      link: 'Ver como trabalhamos',
    },
    lead: {
      eyebrow: 'Liderança técnica',
      title: 'Quem responde pelo projeto.',
      name: 'Henrique Pett',
      role: 'Fundador e líder técnico',
      photoAlt: 'Henrique Pett',
      bio: [
        'Desde 2021, Henrique passou pelas funções de um produto de dados e IA: pesquisa em machine learning, desenvolvimento full stack, ciência de dados, engenharia de ML e gestão de produto. Leva modelos e aplicações até a infraestrutura de produção e continua escrevendo código.',
        'Num produto de IA para terminais de contêineres, construiu o modelo como engenheiro de ML e depois passou a liderar o produto. Antes, foi o primeiro profissional de dados de uma fintech de crédito e trabalhou remotamente, em inglês, numa consultoria que atendia empresas europeias.',
        'Na Torno, conduz cada projeto do diagnóstico à operação e aciona especialistas em dados, segurança, UX, infraestrutura ou do setor quando o escopo pede.',
      ],
      authorLink: 'Artigos e perfil de Henrique Pett',
    },
    cases: {
      eyebrow: 'Cases',
      title: 'Experiência de quem conduz a Torno.',
      lead: 'Experiência profissional anterior à Torno e um produto próprio. Nenhum deles é cliente da Torno.',
      link: 'Ver todos os cases',
      caseLink: 'Ler o case',
    },
    cta: {
      title: 'Vamos conversar sobre a sua operação.',
      text: 'Uma conversa de 45 minutos, sem custo, com quem vai conduzir o projeto.',
      secondary: 'Outras formas de contato',
    },
  },
  en: {
    meta: {
      title: 'About {brand} | AI and software for manufacturers',
      description:
        'Torno builds and rolls out custom AI and software in the operations of manufacturers with 200+ employees. Based in Jaraguá do Sul, Brazil. Led by Henrique Pett.',
    },
    hero: {
      eyebrow: 'About Torno',
      title: 'AI and software engineering for manufacturers.',
      lead: 'Torno rolls out AI in the operations of mid-size and large manufacturers, one area at a time, together with IT and with clear accountability from assessment to operation.',
    },
    why: {
      eyebrow: 'Why we exist',
      title: 'AI tools are everywhere. Few people put them to work on the plant floor.',
      paragraphs: [
        'Most AI products are horizontal and few fit the routine of a plant. Technical sheets, setups, scrap, the order book and the know-how of people who have run a machine for decades rarely sit in one place, and no off-the-shelf tool fixes that alone.',
        'Torno starts with the operation. We interview each area, learn the systems and documents, and only then propose what to build. The first step is a short pilot with a success criterion agreed up front. Expansion follows what the pilot shows.',
      ],
    },
    focus: {
      eyebrow: 'Focus',
      title: 'Manufacturing only, from Jaraguá do Sul, Brazil.',
      paragraphs: [
        'Torno is based in Jaraguá do Sul, an industrial city in the north of Santa Catarina, Brazil. We work with manufacturers that have 200 or more employees, with priority for southern Brazil.',
        'Work is remote, with plant visits when a stage calls for them, agreed in the proposal.',
      ],
      facts: [
        { title: 'Manufacturers with 200+ employees', body: 'With an ERP in place and information spread across spreadsheets, documents and people.' },
        { title: 'Jaraguá do Sul, Brazil', body: 'Serving all of Brazil, with priority for Santa Catarina and the South.' },
        { title: 'Fixed proposal per stage', body: 'Assessment, pilot and rollout quoted separately, after each decision.' },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'Five stages, each ending with a decision.',
      lead: 'From the intro call to managed operation, with governance, security and continuity set out before we start.',
      link: 'See how we work',
    },
    lead: {
      eyebrow: 'Technical lead',
      title: 'Who is accountable for the project.',
      name: 'Henrique Pett',
      role: 'Founder and technical lead',
      photoAlt: 'Henrique Pett',
      bio: [
        'Since 2021, Henrique has worked across the roles of a data and AI product: machine learning research, full stack development, data science, ML engineering and product management. He takes models and applications all the way to production infrastructure and still writes code.',
        'On an AI product for container terminals, he built the model as an ML engineer and then led the product. Before that, he was the first data hire at a credit fintech and worked remotely, in English, for a consultancy serving European companies.',
        'At Torno, he runs each project from assessment to operation and brings in data, security, UX, infrastructure or industry specialists when the scope calls for them.',
      ],
      authorLink: 'Articles and profile of Henrique Pett',
    },
    cases: {
      eyebrow: 'Cases',
      title: 'Experience behind Torno.',
      lead: 'Professional experience before Torno and one product of our own. None of them is a Torno client.',
      link: 'See all cases',
      caseLink: 'Read the case',
    },
    cta: { title: 'Let’s talk about your operation.', text: 'A free 45-minute call with the person who will run the project.', secondary: 'Other ways to reach us' },
  },
};

/* ------------------------------------------------------------------------------------------------ */
/* /contact/ e /en/contact/                                                                         */
/* ------------------------------------------------------------------------------------------------ */

export interface ContactContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  channels: {
    eyebrow: string;
    title: string;
    booking: { title: string; body: string };
    email: { title: string; body: string };
    linkedin: { title: string; body: string; label: string };
  };
  prepare: { eyebrow: string; title: string; lead: string; items: FeatureEntry[]; note: string };
  next: { eyebrow: string; title: string; items: StepEntry[] };
  location: { title: string; body: string; privacy: string };
  cta: { title: string; text: string };
}

export const contact: Record<Locale, ContactContent> = {
  'pt-BR': {
    meta: {
      title: 'Contato | {brand}',
      description:
        'Agende a conversa inicial de 45 minutos com a Torno, sem custo, ou escreva. Veja o que levar para a conversa sobre IA na sua operação industrial.',
    },
    hero: {
      eyebrow: 'Contato',
      title: 'Fale com a Torno.',
      lead: 'O caminho mais rápido é agendar a conversa inicial de 45 minutos, sem custo. Quem atende é quem vai conduzir o projeto.',
    },
    channels: {
      eyebrow: 'Canais',
      title: 'Escolha como prefere começar.',
      booking: { title: 'Agenda', body: 'Escolha um horário para a conversa inicial. A confirmação chega por e-mail.' },
      email: { title: 'E-mail', body: 'Para mandar contexto antes da conversa ou pedir um acordo de confidencialidade.' },
      linkedin: { title: 'LinkedIn', body: 'Página da empresa, com novidades e artigos.', label: 'Torno no LinkedIn' },
    },
    prepare: {
      eyebrow: 'Antes da conversa',
      title: 'O que levar para a conversa.',
      lead: 'Nada precisa estar pronto. Quatro respostas já deixam a conversa mais útil.',
      items: [
        { title: 'Onde o tempo se perde', body: 'Qual área mais sofre hoje e um exemplo recente, como um pedido atrasado ou uma não conformidade que se repetiu.' },
        { title: 'Sistemas em uso', body: 'ERP, MES, planilhas e onde ficam fichas e procedimentos, e quem responde por eles.' },
        { title: 'Quem decide', body: 'Quem patrocinaria o projeto e quem seria o ponto focal na operação.' },
        { title: 'O que pesa no prazo', body: 'Auditoria, pico de pedidos ou a aposentadoria de alguém-chave, se houver.' },
      ],
      note: 'Não envie senhas, dados de clientes ou documentos confidenciais antes de combinarmos como recebê-los. Assinamos acordo de confidencialidade antes do diagnóstico, se a empresa pedir.',
    },
    next: {
      eyebrow: 'Depois da conversa',
      title: 'O que acontece em seguida.',
      items: [
        { meta: 'Na conversa', title: 'Encaixe', body: 'Dizemos se a Torno faz sentido para o problema. Se não fizer, dizemos também.' },
        { meta: 'Em poucos dias', title: 'Proposta do diagnóstico', body: 'Escopo, áreas, prazo e valor fechados por escrito.' },
        { meta: '2 a 4 semanas', title: 'Diagnóstico', body: 'Entrevistas, inventário de dados e o relatório com o piloto recomendado.' },
      ],
    },
    location: {
      title: 'Onde estamos',
      body: 'Jaraguá do Sul, Santa Catarina. Atendimento remoto em todo o Brasil e idas à planta combinadas na proposta.',
      privacy: 'Como tratamos dados pessoais',
    },
    cta: { title: 'Agende a conversa inicial.', text: '45 minutos, sem custo, com quem vai conduzir o projeto.' },
  },
  en: {
    meta: {
      title: 'Contact | {brand}',
      description: 'Book a free 45-minute intro call with Torno, or write to us. See what to bring to a conversation about AI in your plant operations.',
    },
    hero: {
      eyebrow: 'Contact',
      title: 'Talk to Torno.',
      lead: 'The fastest way in is a free 45-minute intro call. You talk to the person who will run the project.',
    },
    channels: {
      eyebrow: 'Channels',
      title: 'Choose how you want to start.',
      booking: { title: 'Calendar', body: 'Pick a time for the intro call. Confirmation arrives by email.' },
      email: { title: 'Email', body: 'To send context before the call or ask for an NDA.' },
      linkedin: { title: 'LinkedIn', body: 'Company page, with news and articles.', label: 'Torno on LinkedIn' },
    },
    prepare: {
      eyebrow: 'Before the call',
      title: 'What to bring.',
      lead: 'Nothing has to be ready. Four answers make the call more useful.',
      items: [
        { title: 'Where time is lost', body: 'Which area struggles most today, with a recent example such as a late order or a repeated non-conformance.' },
        { title: 'Systems in use', body: 'ERP, MES, spreadsheets and where sheets and procedures live, and who owns them.' },
        { title: 'Who decides', body: 'Who would sponsor the project and who would be the point of contact.' },
        { title: 'Deadline pressure', body: 'An audit, an order peak or a key person retiring, if any.' },
      ],
      note: 'Please do not send passwords, customer data or confidential documents before we agree how to receive them. We sign an NDA before the assessment if you ask.',
    },
    next: {
      eyebrow: 'After the call',
      title: 'What happens next.',
      items: [
        { meta: 'On the call', title: 'Fit', body: 'We tell you whether Torno makes sense for the problem, and say so if it does not.' },
        { meta: 'Within days', title: 'Assessment proposal', body: 'Scope, areas, timeline and price fixed in writing.' },
        { meta: '2 to 4 weeks', title: 'Assessment', body: 'Interviews, a data inventory and a report with the recommended pilot.' },
      ],
    },
    location: {
      title: 'Where we are',
      body: 'Jaraguá do Sul, Santa Catarina, Brazil. Remote work across Brazil, with plant visits agreed in the proposal.',
      privacy: 'How we handle personal data',
    },
    cta: { title: 'Book the intro call.', text: '45 minutes, free, with the person who will run the project.' },
  },
};
