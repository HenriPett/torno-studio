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
      body: 'Entrevistas por área, inventário de dados e mapa de oportunidades com esforço e risco.',
    },
    {
      meta: 'Uma área, um problema',
      title: 'Piloto',
      body: 'Critério de sucesso combinado antes e medido depois, com dados reais.',
    },
    {
      meta: 'Área por área',
      title: 'Implantação por etapas',
      body: 'As outras áreas entram na ordem que o piloto indicar, sobre a mesma base.',
    },
    {
      meta: 'Mensal',
      title: 'Operação assistida',
      body: 'Monitoramento, ajustes, novos casos de uso e relatório mensal.',
    },
  ],
  en: [
    { meta: '45 minutes, free', title: 'Intro call', body: 'We learn how the plant runs, which problem hurts most and who decides.' },
    {
      meta: '2 to 4 weeks',
      title: 'Assessment',
      body: 'Interviews in each area, a data inventory and an opportunity map with effort and risk.',
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
      body: 'Dados, segurança, UX e infraestrutura conforme o escopo, nomeados na proposta.',
    },
    {
      eyebrow: 'Governança',
      title: 'Ritos e registro',
      body: 'Patrocinador e ponto focal, reunião quinzenal, critério por etapa e relatório mensal.',
    },
    {
      eyebrow: 'Segurança e LGPD',
      title: 'Dados sob as regras da TI',
      body: 'Infraestrutura da empresa ou nuvem aprovada, acesso por perfil e uso registrado.',
    },
    {
      eyebrow: 'Continuidade',
      title: 'Tudo em nome da empresa',
      body: 'Código, documentação e contas da empresa desde o primeiro dia, com manual de operação.',
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
      body: 'Data, security, UX and infrastructure by scope, named in the proposal.',
    },
    {
      eyebrow: 'Governance',
      title: 'Cadence and records',
      body: 'Sponsor and point of contact, biweekly reviews, a criterion per stage and a monthly report.',
    },
    {
      eyebrow: 'Security and privacy',
      title: 'Data under your IT rules',
      body: 'Your infrastructure or an approved cloud, role-based access and usage logs.',
    },
    {
      eyebrow: 'Continuity',
      title: 'Everything in your name',
      body: 'Code, documentation and accounts are yours from day one, with a runbook.',
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
      lead: 'Cada etapa tem proposta fechada e termina com uma decisão da empresa. A próxima só começa depois que a anterior foi medida.',
      secondary: 'Ver as etapas',
    },
    stages: {
      eyebrow: 'Etapas',
      title: 'Da primeira conversa à operação.',
      lead: 'A empresa pode parar ao fim de qualquer etapa e fica com o que foi entregue.',
      workLabel: 'O que fazemos',
      deliverableLabel: 'O que a empresa recebe',
      items: [
        {
          title: 'Conversa inicial',
          meta: '45 minutos, sem custo',
          body: 'Com quem conhece a operação e com quem decide.',
          work: [
            'Entendemos a operação, os sistemas e o problema que mais pesa.',
            'Verificamos o encaixe e quem patrocina o projeto.',
          ],
          deliverable: 'Proposta fechada do diagnóstico, ou a indicação de que não há encaixe.',
        },
        {
          title: 'Diagnóstico',
          meta: 'Planejado para 2 a 4 semanas',
          body: 'Onde a IA paga o esforço, área por área.',
          work: [
            'Entrevistas com uma ou duas pessoas por área.',
            'Inventário de dados e sistemas, com esforço e risco de cada oportunidade.',
          ],
          deliverable:
            'Mapa de oportunidades, piloto recomendado e critério de sucesso. O relatório é da empresa, contrate ou não o restante.',
        },
        {
          title: 'Piloto',
          meta: 'Uma área, um problema',
          body: 'O primeiro uso real, pequeno o bastante para medir.',
          work: [
            'Montamos a base e o agente ou a tela, e treinamos quem usa.',
            'Medimos o critério de sucesso antes e depois.',
          ],
          deliverable: 'Piloto em uso, medido, com a recomendação do que expandir.',
        },
        {
          title: 'Implantação por etapas',
          meta: 'Área por área',
          body: 'As outras áreas entram na ordem que o piloto indicar.',
          work: ['Cada área nova tem escopo, responsável e critério próprios, e as integrações são feitas com a TI.'],
          deliverable: 'Cada área em uso, documentada e medida.',
        },
        {
          title: 'Operação assistida',
          meta: 'Mensalidade',
          body: 'Acompanhamento com os agentes no dia a dia.',
          work: [
            'Monitoramento de uso e de qualidade, ajustes e novos casos de uso.',
          ],
          deliverable: 'Relatório mensal de uso, problemas resolvidos e próximos passos.',
        },
      ],
    },
    delivery: {
      eyebrow: 'Estrutura de entrega',
      title: 'Uma liderança técnica e especialistas quando o escopo pede.',
      lead: 'Desde o início, a empresa sabe quem responde pelo projeto.',
      items: [
        {
          eyebrow: 'Liderança técnica única',
          title: 'Uma pessoa responde do diagnóstico à operação',
          body: 'Hoje é Henrique Pett, fundador da Torno. Ele conduz as entrevistas, desenha a solução e escreve código.',
        },
        {
          eyebrow: 'Rede de especialistas sob demanda',
          title: 'Especialistas nomeados na proposta',
          body: 'Dados, segurança, UX, infraestrutura e especialistas do setor entram quando o escopo pede, com nome e papel na proposta.',
        },
      ],
    },
    governance: {
      eyebrow: 'Governança',
      title: 'Ritos simples, decisões por escrito.',
      lead: 'A diretoria acompanha sem entrar no detalhe técnico.',
      items: [
        { title: 'Patrocinador e ponto focal', body: 'Um na diretoria e outro na operação, definidos na proposta.' },
        { title: 'Reunião quinzenal', body: 'Andamento, bloqueios e decisões, com pauta enviada antes.' },
        { title: 'Critério por etapa', body: 'Combinado antes de começar e medido no fim.' },
        { title: 'Relatório mensal', body: 'O que foi feito e medido e o que vem a seguir.' },
        { title: 'Registro de decisões', body: 'Com data, motivo e quem aprovou.' },
      ],
    },
    security: {
      eyebrow: 'Segurança e LGPD',
      title: 'Os dados seguem as regras da sua TI.',
      lead: 'A TI aprova a arquitetura antes de qualquer dado sair de onde está.',
      items: [
        { title: 'Onde os dados ficam', body: 'Na infraestrutura da empresa ou em nuvem aprovada pela TI.' },
        { title: 'Acesso por perfil', body: 'Cada pessoa vê só o que o perfil dela permite.' },
        { title: 'Uso registrado', body: 'Perguntas, respostas e ações ficam registradas para auditoria.' },
        { title: 'Modelos de terceiros', body: 'Os dados da empresa não treinam modelos de terceiros.' },
        { title: 'Confidencialidade', body: 'Acordo assinado antes do diagnóstico, se a empresa pedir.' },
        { title: 'LGPD', body: 'Dados pessoais só para a finalidade combinada, com o papel de cada parte em contrato.' },
      ],
    },
    continuity: {
      eyebrow: 'Continuidade',
      title: 'A empresa não fica presa à Torno.',
      lead: 'O que construímos continua funcionando com ou sem a gente.',
      items: [
        { title: 'Em nome da empresa', body: 'Código, documentação e contas de nuvem, desde o primeiro dia.' },
        { title: 'Manual de operação', body: 'Como funciona, como monitorar e o que fazer quando algo falha.' },
        { title: 'Transição para a TI', body: 'Quando a TI quiser assumir, fazemos a passagem com sessões de trabalho.' },
      ],
    },
    client: {
      eyebrow: 'Da sua parte',
      title: 'O que precisamos da empresa.',
      lead: 'O esforço interno é pequeno, mas precisa estar na agenda.',
      items: [
        { title: 'Um patrocinador', body: 'Alguém da diretoria que decide ao fim de cada etapa.' },
        { title: 'Um ponto focal', body: 'Alguém da operação que agenda entrevistas e destrava acessos.' },
        { title: 'Tempo das áreas', body: 'Cerca de uma hora por entrevistado e um usuário-chave no piloto.' },
        { title: 'A TI junto', body: 'Acesso combinado com a TI, de preferência só leitura.' },
      ],
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Quanto custa?',
          a: 'Cada etapa tem proposta fechada, orçada depois da etapa anterior, porque o valor depende das áreas e dos sistemas. A operação assistida é mensal.',
        },
        {
          q: 'A Torno é uma pessoa só?',
          a: 'A Torno tem uma liderança técnica única, Henrique Pett. Especialistas entram conforme o escopo, nomeados na proposta, e a documentação evita que o projeto dependa da memória de alguém.',
        },
        {
          q: 'Precisa trocar o ERP?',
          a: 'Não. Trabalhamos sobre o ERP atual, seja TOTVS, SAP, Senior ou outro, com os acessos que a TI liberar.',
        },
        {
          q: 'A IA pode errar?',
          a: 'Pode. Por isso cada resposta cita a fonte, e ações que alteram dados nos sistemas passam pela aprovação de uma pessoa.',
        },
        {
          q: 'Podemos parar no meio?',
          a: 'Sim, ao fim de qualquer etapa. A empresa fica com o que foi entregue até ali, inclusive código e documentação.',
        },
      ],
    },
    cta: {
      title: 'Comece pela conversa inicial.',
      text: '45 minutos, sem custo, para ver se o diagnóstico faz sentido.',
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
      lead: 'Every stage has a fixed proposal and ends with your decision. The next one starts only after the last one was measured.',
      secondary: 'See the stages',
    },
    stages: {
      eyebrow: 'Stages',
      title: 'From the first call to operation.',
      lead: 'You can stop at the end of any stage and keep what was delivered.',
      workLabel: 'What we do',
      deliverableLabel: 'What you get',
      items: [
        {
          title: 'Intro call',
          meta: '45 minutes, free',
          body: 'With people who know the operation and people who decide.',
          work: ['We learn the operation, its systems and the problem that hurts most.', 'We check fit and who sponsors the project.'],
          deliverable: 'A fixed proposal for the assessment, or a clear note that it is not a fit.',
        },
        {
          title: 'Assessment',
          meta: 'Planned for 2 to 4 weeks',
          body: 'Where AI is worth the effort, area by area.',
          work: [
            'Interviews with one or two people per area.',
            'An inventory of data and systems, with effort and risk for each opportunity.',
          ],
          deliverable: 'Opportunity map, recommended pilot and success criterion. The report is yours either way.',
        },
        {
          title: 'Pilot',
          meta: 'One area, one problem',
          body: 'The first real use, small enough to measure.',
          work: [
            'We build the base and the agent or screen, and train the users.',
            'We measure the success criterion before and after.',
          ],
          deliverable: 'A pilot in use, measured, with a recommendation on what to expand.',
        },
        {
          title: 'Staged rollout',
          meta: 'Area by area',
          body: 'Other areas follow in the order the pilot suggests.',
          work: ['Each new area has its own scope, owner and criterion, with integrations built with IT.'],
          deliverable: 'Each area in use, documented and measured.',
        },
        {
          title: 'Managed operation',
          meta: 'Monthly fee',
          body: 'Support once the agents are part of daily work.',
          work: ['Monitoring of usage and quality, tuning and new use cases.'],
          deliverable: 'A monthly report on usage, issues solved and next steps.',
        },
      ],
    },
    delivery: {
      eyebrow: 'Delivery structure',
      title: 'One technical lead, plus specialists when the scope calls for them.',
      lead: 'From day one you know who is accountable.',
      items: [
        {
          eyebrow: 'One technical lead',
          title: 'One person answers from assessment to operation',
          body: 'Today that is Henrique Pett, founder of Torno. He runs the interviews, designs the solution and writes code.',
        },
        {
          eyebrow: 'On-demand specialist network',
          title: 'Specialists named in the proposal',
          body: 'Data, security, UX, infrastructure and industry specialists join by scope, named with a role in the proposal.',
        },
      ],
    },
    governance: {
      eyebrow: 'Governance',
      title: 'Simple cadence, decisions in writing.',
      lead: 'Leadership follows along without diving into technical detail.',
      items: [
        { title: 'Sponsor and point of contact', body: 'One in leadership and one in operations, named in the proposal.' },
        { title: 'Biweekly review', body: 'Progress, blockers and decisions, with an agenda sent ahead.' },
        { title: 'Criterion per stage', body: 'Agreed before it starts and measured at the end.' },
        { title: 'Monthly report', body: 'What was done and measured, and what comes next.' },
        { title: 'Decision log', body: 'With date, reason and approver.' },
      ],
    },
    security: {
      eyebrow: 'Security and privacy',
      title: 'Your data follows your IT rules.',
      lead: 'IT approves the architecture before any data moves.',
      items: [
        { title: 'Where data lives', body: 'In your infrastructure or a cloud your IT approves.' },
        { title: 'Role-based access', body: 'Each person sees only what their role allows.' },
        { title: 'Usage logs', body: 'Questions, answers and agent actions are logged for audit.' },
        { title: 'Third-party models', body: 'Your data is never used to train third-party models.' },
        { title: 'Confidentiality', body: 'An NDA before the assessment, if you ask.' },
        { title: 'Data protection', body: 'Personal data only for the agreed purpose, with each party’s role in the contract.' },
      ],
    },
    continuity: {
      eyebrow: 'Continuity',
      title: 'You are never locked in.',
      lead: 'What we build keeps running with or without us.',
      items: [
        { title: 'In your name', body: 'Code, documentation and cloud accounts, from day one.' },
        { title: 'Runbook', body: 'How it works, how to monitor it and what to do when something fails.' },
        { title: 'Handover to IT', body: 'When IT wants to take over, we hand over in working sessions.' },
      ],
    },
    client: {
      eyebrow: 'On your side',
      title: 'What we need from you.',
      lead: 'The internal effort is small, but it has to be on the calendar.',
      items: [
        { title: 'A sponsor', body: 'Someone in leadership who decides at the end of each stage.' },
        { title: 'A point of contact', body: 'Someone in operations who books interviews and unblocks access.' },
        { title: 'Time from each area', body: 'About an hour per interviewee and a key user in the pilot.' },
        { title: 'IT on board', body: 'System access agreed with IT, read-only where possible.' },
      ],
    },
    faq: {
      title: 'Questions',
      items: [
        {
          q: 'How much does it cost?',
          a: 'Each stage has a fixed proposal, quoted after the previous stage, because the price depends on areas and systems. Managed operation is a monthly fee.',
        },
        {
          q: 'Is Torno just one person?',
          a: 'Torno has one technical lead, Henrique Pett, accountable for the whole project. Specialists join by scope and are named in the proposal.',
        },
        { q: 'Do we need to replace our ERP?', a: 'No. We work on top of your current ERP, with the access your IT grants.' },
        {
          q: 'Can we stop halfway?',
          a: 'Yes, at the end of any stage. You keep everything delivered so far, including code and documentation.',
        },
      ],
    },
    cta: { title: 'Start with an intro call.', text: '45 minutes, free, to see whether an assessment makes sense.' },
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
        'A Torno implanta IA e software sob medida na operação de indústrias de médio e grande porte. Jaraguá do Sul, SC. Liderança técnica de Henrique Pett.',
    },
    hero: {
      eyebrow: 'Sobre a Torno',
      title: 'Engenharia de IA e software para quem fabrica.',
      lead: 'A Torno implanta IA na operação de indústrias médias e grandes, área por área, junto com a TI.',
    },
    why: {
      eyebrow: 'Por que existimos',
      title: 'Ferramenta de IA sobra. Falta quem implante na fábrica.',
      paragraphs: [
        'Há muito produto de IA horizontal e pouco adaptado à rotina de uma indústria. Ficha técnica, setup, refugo e o saber de quem opera a máquina há décadas raramente estão no mesmo lugar.',
        'Por isso começamos pela operação. Entrevistamos as áreas, entendemos os sistemas e só então propomos um piloto curto, com critério de sucesso combinado antes.',
      ],
    },
    focus: {
      eyebrow: 'Foco',
      title: 'Só indústria, a partir de Jaraguá do Sul.',
      paragraphs: [
        'A Torno fica em Jaraguá do Sul, polo industrial do norte de Santa Catarina. O trabalho é remoto, com idas à planta combinadas na proposta.',
      ],
      facts: [
        { title: 'Indústrias de médio e grande porte', body: 'Com ERP implantado e informação espalhada em planilhas e pessoas.' },
        { title: 'Jaraguá do Sul, SC', body: 'Todo o Brasil, com prioridade para o Sul.' },
        { title: 'Proposta fechada por etapa', body: 'Cada etapa orçada depois da decisão anterior.' },
      ],
    },
    process: {
      eyebrow: 'Como trabalhamos',
      title: 'Cinco etapas, cada uma com uma decisão no fim.',
      lead: 'Da conversa inicial à operação assistida, com governança e segurança descritas antes de começar.',
      link: 'Ver como trabalhamos',
    },
    lead: {
      eyebrow: 'Liderança técnica',
      title: 'Quem responde pelo projeto.',
      name: 'Henrique Pett',
      role: 'Fundador e líder técnico',
      photoAlt: 'Henrique Pett',
      bio: [
        'Desde 2021, Henrique passou por pesquisa em machine learning, desenvolvimento full stack, ciência de dados, engenharia de ML e gestão de produto. Leva modelos até a produção e continua escrevendo código.',
        'Num produto de IA para terminais de contêineres, construiu o modelo como engenheiro de ML e depois liderou o produto. Antes, foi o primeiro profissional de dados de uma fintech de crédito e trabalhou, em inglês, numa consultoria para empresas europeias.',
        'Na Torno, conduz cada projeto do diagnóstico à operação e aciona especialistas quando o escopo pede.',
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
        'Torno builds and rolls out custom AI and software in the operations of mid-size and large manufacturers. Based in Jaraguá do Sul, Brazil. Led by Henrique Pett.',
    },
    hero: {
      eyebrow: 'About Torno',
      title: 'AI and software engineering for manufacturers.',
      lead: 'Torno rolls out AI in the operations of mid-size and large manufacturers, one area at a time, together with IT.',
    },
    why: {
      eyebrow: 'Why we exist',
      title: 'AI tools are everywhere. Few people put them to work on the plant floor.',
      paragraphs: [
        'Most AI products are horizontal and few fit the routine of a plant. Technical sheets, setups, scrap and the know-how of people who have run a machine for decades rarely sit in one place.',
        'So we start with the operation. We interview each area, learn the systems and only then propose a short pilot with a success criterion agreed up front.',
      ],
    },
    focus: {
      eyebrow: 'Focus',
      title: 'Manufacturing only, from Jaraguá do Sul, Brazil.',
      paragraphs: [
        'Torno is based in Jaraguá do Sul, an industrial city in the north of Santa Catarina, Brazil. Work is remote, with plant visits agreed in the proposal.',
      ],
      facts: [
        { title: 'Mid-size and large manufacturers', body: 'With an ERP in place and information spread across spreadsheets and people.' },
        { title: 'Jaraguá do Sul, Brazil', body: 'All of Brazil, with priority for the South.' },
        { title: 'Fixed proposal per stage', body: 'Each stage quoted after the previous decision.' },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'Five stages, each ending with a decision.',
      lead: 'From the intro call to managed operation, with governance and security set out before we start.',
      link: 'See how we work',
    },
    lead: {
      eyebrow: 'Technical lead',
      title: 'Who is accountable for the project.',
      name: 'Henrique Pett',
      role: 'Founder and technical lead',
      photoAlt: 'Henrique Pett',
      bio: [
        'Since 2021, Henrique has worked in machine learning research, full stack development, data science, ML engineering and product management. He takes models to production and still writes code.',
        'On an AI product for container terminals, he built the model as an ML engineer and then led the product. Before that, he was the first data hire at a credit fintech and worked for European companies through a consultancy.',
        'At Torno, he runs each project from assessment to operation and brings in specialists when the scope calls for them.',
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
    /** Demonstração na conversa inicial, com dados fictícios. Sem link: o acesso é enviado em privado. */
    demo: { title: string; body: string };
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
      demo: {
        title: 'Demonstração',
        body: 'Mostramos ao vivo, com dados fictícios do seu setor. Depois, enviamos um acesso privado para a sua equipe testar.',
      },
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
      demo: { title: 'Demo', body: 'We show it live, with fictional data from your sector. Afterwards, we send private access for your team to try it.' },
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
