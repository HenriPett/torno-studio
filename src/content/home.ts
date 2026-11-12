/**
 * Conteúdo da home (/ e /en/), indústria de médio e grande porte.
 * Fonte: docs/estrategia-2026-11-torno-industria.md (§2 posicionamento, §4 oferta, §5 honestidade, §9 voz).
 * A home fala de "indústria" em geral: nenhum setor citado por nome e nenhum link para /para/.
 * Exemplos de áreas e mocks são ilustrativos e rotulados. Sem preço.
 */
import type { Locale } from '../config/routes.mjs';
import type { FaqEntry, FeatureEntry } from './types';

/** Mesmas formas das props de ds/mocks/AskMock e PanelMock (tipadas aqui para os testes importarem sem .astro). */
interface AskSource {
  title: string;
  detail: string;
}
interface PanelKpi {
  label: string;
  value: string;
  delta?: string;
  tone?: 'ok' | 'warn' | 'neutral';
}
interface PanelAlert {
  tone: 'warn' | 'ok' | 'info';
  text: string;
  meta: string;
}

export interface HomeIds {
  hero: string;
  brain: string;
  solutions: string;
  custom: string;
  process: string;
  structure: string;
  proof: string;
  fit: string;
  faq: string;
}

export interface HomeContent {
  /** Âncoras das seções (o header linka `solutions`: #solucoes / #solutions). */
  ids: HomeIds;
  hero: { eyebrow: string; title: string; lead: string; secondary: string; facts: string[] };
  brain: {
    eyebrow: string;
    title: string;
    lead: string;
    sourcesTitle: string;
    sources: string[];
    points: FeatureEntry[];
    mock: { asker: string; question: string; answer: string; sources: AskSource[] };
  };
  solutions: { eyebrow: string; title: string; lead: string; exampleLabel: string; areas: FeatureEntry[] };
  custom: {
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
    mock: { title: string; kpis: PanelKpi[]; alerts: PanelAlert[] };
  };
  process: { eyebrow: string; title: string; lead: string; link: string };
  structure: { eyebrow: string; title: string; lead: string; link: string };
  proof: {
    eyebrow: string;
    title: string;
    lead: string;
    stats: { value: string; label: string }[];
    statSource: string;
    caseLink: string;
    allCases: string;
    note: string;
  };
  fit: { eyebrow: string; title: string; yesTitle: string; yes: string[]; noTitle: string; no: string[] };
  faq: { eyebrow: string; title: string; items: FaqEntry[] };
  cta: { title: string; text: string; secondary: string };
}

export const MUNDOLOGISTICA_URL = 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres';

export const home: Record<Locale, HomeContent> = {
  'pt-BR': {
    ids: {
      hero: 'inicio',
      brain: 'cerebro',
      solutions: 'solucoes',
      custom: 'sob-medida',
      process: 'etapas',
      structure: 'estrutura',
      proof: 'cases',
      fit: 'para-quem',
      faq: 'faq',
    },
    hero: {
      eyebrow: 'IA e software sob medida para a indústria',
      title: 'IA aplicada à operação industrial, desenhada para a sua fábrica.',
      lead: 'Juntamos os dados e o conhecimento da operação num cérebro da empresa e colocamos agentes de IA nas áreas que mais perdem tempo. Por etapas e dentro das regras da sua TI.',
      secondary: 'Ver como trabalhamos',
      facts: ['Para indústrias de médio e grande porte', 'Proposta fechada por etapa', 'Código e dados em nome da empresa'],
    },
    brain: {
      eyebrow: 'O cérebro da operação',
      title: 'Pergunte à fábrica. A resposta vem com a fonte.',
      lead: 'Reunimos o que a empresa já tem numa base consultável, com permissões por área. Cada resposta mostra o documento ou o registro de onde saiu.',
      sourcesTitle: 'O que entra na base',
      sources: ['ERP', 'MES', 'Planilhas', 'Fichas técnicas', 'Procedimentos e normas', 'Não conformidades', 'Contratos e catálogos', 'E-mails e chamados'],
      points: [
        { title: 'Na infraestrutura aprovada pela TI', body: 'Servidores da empresa ou uma nuvem que a TI aprovou. Os dados não treinam modelos de terceiros.' },
        { title: 'Permissão por área', body: 'Cada pessoa consulta só o que o perfil dela já permite nos sistemas de origem.' },
        { title: 'Fonte em cada resposta', body: 'Ficha, revisão, ordem ou relatório citados, para conferir antes de agir.' },
      ],
      mock: {
        asker: 'Supervisora de produção · Linha 2',
        question: 'Qual a faixa de temperatura da zona 3 para o PP copolímero depois da última revisão?',
        answer:
          'Entre 210 °C e 230 °C, com rosca a 45 rpm [1]. A revisão C baixou o limite superior de 240 °C para 230 °C por causa de manchas no lote 0912 [2].',
        sources: [
          { title: 'Ficha técnica 4471, rev. C', detail: 'Parâmetros de processo · p. 2' },
          { title: 'Relatório de não conformidade RNC-0912', detail: 'Causa e ação corretiva' },
        ],
      },
    },
    solutions: {
      eyebrow: 'Soluções',
      title: 'Agentes de IA para cada área da fábrica.',
      lead: 'Cada agente faz uma tarefa definida, usa o cérebro da operação e tem um responsável na área. O diagnóstico define por onde começar.',
      exampleLabel: 'Exemplos ilustrativos',
      areas: [
        {
          eyebrow: 'Produção e PCP',
          title: 'Ordem, roteiro e turno numa consulta',
          body: 'Roteiro, ficha técnica e histórico da ordem de produção, resumo de turno e alerta de atraso antes da data prometida.',
        },
        {
          eyebrow: 'Qualidade',
          title: 'Cada desvio com o histórico ao lado',
          body: 'Busca em não conformidades e ações anteriores, rascunho de relatório 8D e conferência do lote contra a especificação.',
        },
        {
          eyebrow: 'Manutenção',
          title: 'O manual certo no celular do técnico',
          body: 'Histórico do equipamento, manual e procedimento na mão de quem está na máquina, com as últimas intervenções.',
        },
        {
          eyebrow: 'Comercial e representantes',
          title: 'Preço, prazo e estoque sem esperar retorno',
          body: 'Status de pedido, estoque e prazo consultados em linguagem natural, preparação de visita e proposta dentro das regras comerciais.',
        },
        {
          eyebrow: 'Marketing e catálogo',
          title: 'Fichas de produto a partir de dados aprovados',
          body: 'Catálogo, conteúdo técnico e respostas a clientes escritos com base na engenharia e revisados por quem responde pela informação.',
        },
        {
          eyebrow: 'Suprimentos',
          title: 'Fornecedor, prazo e consumo à vista',
          body: 'Histórico de preço e prazo por fornecedor, cobertura de estoque e pedidos em aberto reunidos antes da negociação.',
        },
        {
          eyebrow: 'Conhecimento dos operadores',
          title: 'O que 20 anos de casa ensinam, registrado',
          body: 'Ajustes de máquina, cuidados de setup e causas de defeito registrados com quem sabe, para treinar quem chega.',
        },
        {
          eyebrow: 'Gestão',
          title: 'Indicadores explicados em português',
          body: 'Por que o refugo subiu na semana, com o caminho até o dado de origem para quem quiser conferir.',
        },
      ],
    },
    custom: {
      eyebrow: 'Software sob medida',
      title: 'Quando a área precisa de tela própria, construímos.',
      lead: 'Portal de representantes, painel de chão de fábrica ou integração entre sistemas, sobre a mesma base de dados e com as mesmas permissões.',
      points: [
        'Integra com o ERP e os sistemas que a empresa já usa.',
        'Código, documentação e contas em nome da empresa desde o primeiro dia.',
        'Manual de operação para a TI assumir quando quiser.',
      ],
      mock: {
        title: 'Planta 1 · Turno B',
        kpis: [
          { label: 'OEE linha 2', value: '78%', delta: '+3 p.p.', tone: 'ok' },
          { label: 'Refugo', value: '1,8%', delta: '−0,4 p.p.', tone: 'ok' },
          { label: 'Paradas não planejadas', value: '2', delta: '41 min', tone: 'warn' },
          { label: 'OPs em atraso', value: '4', delta: 'de 37', tone: 'neutral' },
        ],
        alerts: [
          { tone: 'warn', text: 'OP 18.207 pode atrasar 1 dia', meta: 'Carteira × capacidade da célula 3' },
          { tone: 'info', text: 'Setup da OP 18.233 começa às 15:00', meta: 'Prensa P-07 · ferramenta F-114' },
          { tone: 'ok', text: 'Lote 0915 liberado pela qualidade', meta: 'Inspeção final · 14:05' },
        ],
      },
    },
    process: {
      eyebrow: 'Como trabalhamos',
      title: 'Começamos pequeno e medimos antes de expandir.',
      lead: 'Cada etapa tem proposta fechada e termina com uma decisão da empresa.',
      link: 'Ver como trabalhamos',
    },
    structure: {
      eyebrow: 'Estrutura de entrega',
      title: 'Quem responde pelo projeto, do diagnóstico à operação.',
      lead: 'Uma liderança técnica única e especialistas acionados pelo escopo. É o que a sua TI e o jurídico vão avaliar, e está tudo por escrito antes de começar.',
      link: 'Governança, segurança e continuidade',
    },
    proof: {
      eyebrow: 'Prova',
      title: 'Experiência com IA dentro de uma operação real.',
      lead: 'Os cases mostram a experiência de quem conduz a Torno: um produto de IA usado na operação de terminais de contêineres, um modelo de crédito e um produto próprio.',
      stats: [
        { value: '−27%', label: 'de movimentos improdutivos' },
        { value: '+21%', label: 'de produtividade' },
      ],
      statSource: 'segundo a Loopt, MundoLogística, 13/01/2026',
      caseLink: 'Ler o case',
      allCases: 'Ver todos os cases',
      note: 'Resultados da solução da equipe da Loopt, publicados pela empresa. Os cases são experiência profissional anterior à Torno e um produto próprio; nenhum deles é cliente da Torno.',
    },
    fit: {
      eyebrow: 'Para quem é',
      title: 'A Torno trabalha só com indústria.',
      yesTitle: 'Faz sentido quando',
      yes: [
        'A operação já roda sobre um ERP e várias áreas dependem dele.',
        'A informação está espalhada em planilhas, PDFs, e-mails e na cabeça de pessoas experientes.',
        'Gente com décadas de casa está perto de se aposentar.',
        'As áreas fazem as mesmas perguntas umas às outras todos os dias.',
        'Há representantes, facções ou terceiros para atender.',
      ],
      noTitle: 'Não é a escolha certa para',
      no: [
        'Empresas pequenas ou em fase de validação.',
        'Apps para consumidor final e MVP de startup.',
        'Projetos sem um responsável dentro da empresa.',
        'Clínicas, consultórios e escritórios.',
      ],
    },
    faq: {
      eyebrow: 'Perguntas',
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Precisa trocar o ERP?',
          a: 'Não. O cérebro da operação lê o que a empresa já usa, seja TOTVS, SAP, Senior ou outro, com os acessos que a TI liberar.',
        },
        {
          q: 'Onde ficam os dados?',
          a: 'Na infraestrutura da empresa ou numa nuvem aprovada pela TI. O acesso segue o perfil de cada pessoa, o uso fica registrado e os dados não são usados para treinar modelos de terceiros.\n\nAssinamos acordo de confidencialidade antes do diagnóstico, se a empresa pedir.',
        },
        {
          q: 'Quanto custa?',
          a: 'Cada etapa tem proposta fechada. O diagnóstico é orçado depois da conversa inicial; o piloto e a implantação, depois do diagnóstico, porque o valor depende das áreas, dos sistemas e do volume de dados. A operação assistida é mensal.',
        },
        {
          q: 'Quanto tempo até o primeiro uso?',
          a: 'O diagnóstico é planejado para 2 a 4 semanas. O prazo do piloto entra na proposta, junto com o critério de sucesso, porque depende do acesso aos dados e da área escolhida.',
        },
        {
          q: 'A Torno é uma pessoa só?',
          a: 'A Torno tem uma liderança técnica única, Henrique Pett, que responde pelo projeto do diagnóstico à operação. Especialistas em dados, segurança, UX, infraestrutura ou do setor entram conforme o escopo e são nomeados na proposta.\n\nGovernança, documentação e contas em nome da empresa estão descritas na página Como trabalhamos.',
        },
        {
          q: 'A IA pode errar?',
          a: 'Pode. Por isso cada resposta cita a fonte, cada agente tem um responsável na área e ações que alteram dados nos sistemas passam pela aprovação de uma pessoa.',
        },
        {
          q: 'E se a TI quiser assumir depois?',
          a: 'Código, documentação, acessos e contas ficam em nome da empresa desde o primeiro dia. Entregamos um manual de operação e fazemos a transição quando a TI quiser.',
        },
      ],
    },
    cta: {
      title: 'Vamos olhar a sua operação.',
      text: 'Uma conversa de 45 minutos, sem custo, para entender o problema e quem decide. Se houver encaixe, o próximo passo é o diagnóstico.',
      secondary: 'Outras formas de contato',
    },
  },
  en: {
    ids: {
      hero: 'home',
      brain: 'brain',
      solutions: 'solutions',
      custom: 'custom-software',
      process: 'process',
      structure: 'structure',
      proof: 'cases',
      fit: 'fit',
      faq: 'faq',
    },
    hero: {
      eyebrow: 'Custom AI and software for manufacturers',
      title: 'Applied AI for industrial operations, designed for your plant.',
      lead: 'We bring your operations data and know-how into one company brain and put AI agents to work where time is lost. In stages, within your IT rules.',
      secondary: 'See how we work',
      facts: ['For mid-size and large manufacturers', 'Fixed proposal per stage', 'Code and data in your name'],
    },
    brain: {
      eyebrow: 'The operations brain',
      title: 'Ask the plant. Every answer cites its source.',
      lead: 'We bring what you already have into one searchable base, with permissions by area. Each answer shows the document or record it came from.',
      sourcesTitle: 'What goes in',
      sources: ['ERP', 'MES', 'Spreadsheets', 'Technical sheets', 'Procedures and standards', 'Non-conformances', 'Contracts and catalogs', 'Emails and tickets'],
      points: [
        { title: 'On infrastructure IT approves', body: 'Your servers or a cloud your IT approved. Your data never trains third-party models.' },
        { title: 'Permissions by area', body: 'Each person sees only what their role already allows in the source systems.' },
        { title: 'A source in every answer', body: 'Sheet, revision, order or report cited, so people can check before acting.' },
      ],
      mock: {
        asker: 'Production supervisor · Line 2',
        question: 'What is the zone 3 temperature range for PP copolymer after the latest revision?',
        answer:
          'Between 210 °C and 230 °C, with the screw at 45 rpm [1]. Revision C lowered the upper limit from 240 °C to 230 °C after streaks on batch 0912 [2].',
        sources: [
          { title: 'Technical sheet 4471, rev. C', detail: 'Process parameters · p. 2' },
          { title: 'Non-conformance report NCR-0912', detail: 'Root cause and corrective action' },
        ],
      },
    },
    solutions: {
      eyebrow: 'Solutions',
      title: 'AI agents for every area of the plant.',
      lead: 'Each agent does one defined job, uses the operations brain and has an owner in the area. The assessment decides where to start.',
      exampleLabel: 'Illustrative examples',
      areas: [
        { eyebrow: 'Production and planning', title: 'Order, routing and shift in one query', body: 'Routing, technical sheet and work order history, shift summaries and delay alerts before the promised date.' },
        { eyebrow: 'Quality', title: 'Every deviation with its history', body: 'Search past non-conformances and actions, draft 8D reports and check a batch against its spec.' },
        { eyebrow: 'Maintenance', title: 'The right manual on the technician’s phone', body: 'Equipment history, manual and procedure in the hands of whoever is at the machine.' },
        { eyebrow: 'Sales and reps', title: 'Price, lead time and stock without waiting', body: 'Order status, stock and lead time in plain language, visit prep and quotes within commercial rules.' },
        { eyebrow: 'Marketing and catalog', title: 'Product sheets from approved data', body: 'Catalog, technical content and customer answers based on engineering data and reviewed by its owner.' },
        { eyebrow: 'Procurement', title: 'Supplier, lead time and usage at a glance', body: 'Price and lead-time history per supplier, stock coverage and open orders gathered before negotiating.' },
        { eyebrow: 'Operator know-how', title: 'What 20 years on the floor teach, recorded', body: 'Machine adjustments, setup care and defect causes recorded with the people who know, to train new staff.' },
        { eyebrow: 'Management', title: 'Indicators explained in plain words', body: 'Why scrap went up this week, with the path back to the source data for anyone who wants to check.' },
      ],
    },
    custom: {
      eyebrow: 'Custom software',
      title: 'When an area needs its own screen, we build it.',
      lead: 'A sales rep portal, a shop-floor dashboard or an integration between systems, on the same data and the same permissions.',
      points: ['Integrates with the ERP and systems you already run.', 'Code, documentation and accounts in your name from day one.', 'A runbook so your IT can take over when it wants.'],
      mock: {
        title: 'Plant 1 · Shift B',
        kpis: [
          { label: 'OEE line 2', value: '78%', delta: '+3 pts', tone: 'ok' },
          { label: 'Scrap', value: '1.8%', delta: '−0.4 pts', tone: 'ok' },
          { label: 'Unplanned stops', value: '2', delta: '41 min', tone: 'warn' },
          { label: 'Late work orders', value: '4', delta: 'of 37', tone: 'neutral' },
        ],
        alerts: [
          { tone: 'warn', text: 'WO 18207 may slip one day', meta: 'Order book vs. cell 3 capacity' },
          { tone: 'info', text: 'Setup for WO 18233 starts at 3:00 pm', meta: 'Press P-07 · tool T-114' },
          { tone: 'ok', text: 'Batch 0915 released by quality', meta: 'Final inspection · 2:05 pm' },
        ],
      },
    },
    process: { eyebrow: 'How we work', title: 'Start small, measure, then expand.', lead: 'Each stage has a fixed proposal and ends with your decision.', link: 'See how we work' },
    structure: {
      eyebrow: 'Delivery structure',
      title: 'Who is accountable, from assessment to operation.',
      lead: 'One technical lead and specialists brought in by scope. That is what your IT and legal teams will review, and it is all in writing before we start.',
      link: 'Governance, security and continuity',
    },
    proof: {
      eyebrow: 'Proof',
      title: 'Experience with AI inside a real operation.',
      lead: 'The cases show the experience behind Torno: an AI product used in container terminal operations, a credit model and a product of our own.',
      stats: [
        { value: '−27%', label: 'unproductive moves' },
        { value: '+21%', label: 'productivity' },
      ],
      statSource: 'according to Loopt, MundoLogística, Jan 13, 2026',
      caseLink: 'Read the case',
      allCases: 'See all cases',
      note: 'Results of the Loopt team’s solution, published by the company. The cases are professional experience before Torno and a product of our own; none of them is a Torno client.',
    },
    fit: {
      eyebrow: 'Who it is for',
      title: 'Torno works with manufacturers only.',
      yesTitle: 'A good fit when',
      yes: [
        'Your operation runs on an ERP that several areas depend on.',
        'Information is spread across spreadsheets, PDFs, emails and experienced people.',
        'People with decades on the floor are close to retiring.',
        'Areas ask each other the same questions every day.',
      ],
      noTitle: 'Not the right choice for',
      no: ['Small companies or early-stage ventures.', 'Consumer apps and startup MVPs.', 'Projects with no owner inside the company.', 'Clinics and professional offices.'],
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Questions',
      items: [
        { q: 'Do we need to replace our ERP?', a: 'No. The operations brain reads what you already use, whether TOTVS, SAP or another system, with the access your IT grants.' },
        {
          q: 'Where does the data live?',
          a: 'In your infrastructure or a cloud your IT approves. Access follows each person’s role, usage is logged and your data never trains third-party models. We sign an NDA before the assessment if you ask.',
        },
        {
          q: 'How much does it cost?',
          a: 'Each stage has a fixed proposal. The assessment is quoted after the intro call; the pilot and rollout after the assessment. Managed operation is a monthly fee.',
        },
        {
          q: 'Is Torno just one person?',
          a: 'Torno has one technical lead, Henrique Pett, accountable from assessment to operation. Data, security, UX, infrastructure or industry specialists join by scope and are named in the proposal.',
        },
        {
          q: 'Can the AI be wrong?',
          a: 'Yes. That is why every answer cites its source, each agent has an owner in the area and actions that change data in your systems need a person’s approval.',
        },
      ],
    },
    cta: {
      title: 'Let’s look at your operation.',
      text: 'A free 45-minute call to understand the problem and who decides. If there is a fit, the next step is the assessment.',
      secondary: 'Other ways to reach us',
    },
  },
};
