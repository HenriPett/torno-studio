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
    /**
     * Demo interativa (DESIGN §9): rótulo da aba do `mock` acima e mais exemplos, um por área.
     * Ilustrativos e genéricos (sem setor, sem porte em número de funcionários), no mesmo estilo do mock.
     */
    demo: {
      tabsLabel: string;
      mockLabel: string;
      items: { label: string; asker: string; question: string; answer: string; sources: AskSource[] }[];
    };
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
  /** Contrato 2026-11-13: adoção de IA na indústria (IBGE) e onde entramos. Renderizado pelo HomePage. */
  adoption?: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Série para gráfico: ex. [{label:'2022', value:16.9, display:'16,9%'}, {label:'2024', value:41.9, display:'41,9%'}]. */
    series: { label: string; value: number; display: string }[];
    /** Números de apoio com fonte. */
    facts: { value: string; label: string; source: { label: string; href: string } }[];
    note: string;
  };
  impact?: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Resultados públicos anonimizados, com fonte. */
    items: { value: string; label: string; context: string; area: string; source: { label: string; href: string }; scope: 'industria' | 'global' }[];
    note: string;
  };
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
      lead: 'Juntamos os dados e o conhecimento da operação num cérebro da empresa e colocamos agentes de IA nas áreas que mais perdem tempo, por etapas.',
      secondary: 'Ver como trabalhamos',
      facts: ['Para indústrias de médio e grande porte', 'Proposta fechada por etapa', 'Código e dados em nome da empresa'],
    },
    brain: {
      eyebrow: 'O cérebro da operação',
      title: 'Pergunte à fábrica. A resposta vem com a fonte.',
      lead: 'Reunimos o que a empresa já tem numa base consultável, com permissões por área. Cada resposta mostra de onde saiu.',
      sourcesTitle: 'O que entra na base',
      sources: ['ERP', 'MES', 'Planilhas', 'Fichas técnicas', 'Procedimentos e normas', 'Não conformidades', 'Contratos e catálogos', 'E-mails e chamados'],
      points: [
        { title: 'Na infraestrutura aprovada pela TI', body: 'Servidores da empresa ou nuvem aprovada. Os dados não treinam modelos de terceiros.' },
        { title: 'Permissão por área', body: 'Cada pessoa vê só o que o perfil dela já permite nos sistemas.' },
        { title: 'Fonte em cada resposta', body: 'Ficha, ordem ou relatório citados, para conferir antes de agir.' },
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
      demo: {
        tabsLabel: 'Exemplos de perguntas por área',
        mockLabel: 'Produção',
        items: [
          {
            label: 'Qualidade',
            asker: 'Analista da qualidade · Inspeção final',
            question: 'Já tivemos rebarba fora de tolerância no item 3318? O que foi feito?',
            answer:
              'Sim, duas vezes neste ano [1]. Na última, a causa foi desgaste da ferramenta F-207, que passou a ser trocada a cada 40 mil ciclos [2].',
            sources: [
              { title: 'Não conformidades RNC-0847 e RNC-1033', detail: 'Inspeção final · item 3318' },
              { title: 'Relatório 8D-0047', detail: 'Causa raiz e ação corretiva' },
            ],
          },
          {
            label: 'Manutenção',
            asker: 'Técnico de manutenção · Turno C',
            question: 'A prensa P-04 parou com alarme de pressão hidráulica. O que resolveu antes?',
            answer:
              'Nas três últimas vezes, o filtro de retorno estava saturado [1]. O procedimento pede troca do filtro e purga, com a máquina bloqueada [2]. Há filtro reserva na posição B-12 [3].',
            sources: [
              { title: 'Ordens de manutenção da P-04', detail: 'OM 5521, 5874 e 6102' },
              { title: 'Procedimento PM-HID-03, rev. B', detail: 'Troca de filtro e purga' },
              { title: 'Estoque de peças de reposição', detail: 'ERP · almoxarifado' },
            ],
          },
          {
            label: 'Comercial',
            asker: 'Representante comercial · Região Sul',
            question: 'Consigo prometer 1.200 peças do item 5120 para o fim do mês?',
            answer:
              'Sim. Há 480 peças em estoque e uma ordem de 900 com término no dia 22 [1]. A entrega na sua região leva 3 dias úteis [2].',
            sources: [
              { title: 'Estoque e ordens de produção', detail: 'ERP · item 5120' },
              { title: 'Política comercial vigente', detail: 'Prazos por região' },
            ],
          },
          {
            label: 'Gestão',
            asker: 'Gerente industrial',
            question: 'Por que o refugo da linha 3 subiu na semana passada?',
            answer:
              'O refugo foi de 2,1% para 3,4%, no turno da noite de terça e quarta [1]. Nos dois dias entrou um lote de matéria-prima com umidade acima da especificação [2].',
            sources: [
              { title: 'Apontamentos de produção · linha 3', detail: 'Semana 44' },
              { title: 'Laudo de recebimento do lote 7781', detail: 'Controle de entrada' },
            ],
          },
        ],
      },
    },
    solutions: {
      eyebrow: 'Soluções',
      title: 'Agentes de IA para cada área da fábrica.',
      lead: 'Cada agente faz uma tarefa definida e tem um responsável na área. O diagnóstico define por onde começar.',
      exampleLabel: 'Exemplos ilustrativos',
      areas: [
        {
          eyebrow: 'Produção e PCP',
          title: 'Ordem, roteiro e turno numa consulta',
          body: 'Histórico da ordem, resumo de turno e alerta de atraso antes da data prometida.',
        },
        {
          eyebrow: 'Qualidade',
          title: 'Cada desvio com o histórico ao lado',
          body: 'Não conformidades e ações anteriores, rascunho de 8D e lote conferido contra a especificação.',
        },
        {
          eyebrow: 'Manutenção',
          title: 'O manual certo no celular do técnico',
          body: 'Histórico, manual e últimas intervenções na mão de quem está na máquina.',
        },
        {
          eyebrow: 'Comercial e representantes',
          title: 'Preço, prazo e estoque sem esperar retorno',
          body: 'Status de pedido, estoque e prazo numa pergunta, dentro das regras comerciais.',
        },
        {
          eyebrow: 'Marketing e catálogo',
          title: 'Fichas de produto a partir de dados aprovados',
          body: 'Catálogo e conteúdo técnico a partir da engenharia, revisados por quem responde.',
        },
        {
          eyebrow: 'Suprimentos',
          title: 'Fornecedor, prazo e consumo à vista',
          body: 'Preço e prazo por fornecedor, cobertura de estoque e pedidos em aberto antes da negociação.',
        },
        {
          eyebrow: 'Conhecimento dos operadores',
          title: 'O que 20 anos de casa ensinam, registrado',
          body: 'Ajustes de máquina e causas de defeito registrados com quem sabe, para treinar quem chega.',
        },
        {
          eyebrow: 'Gestão',
          title: 'Indicadores explicados em português',
          body: 'Por que o refugo subiu na semana, com o caminho até o dado de origem.',
        },
      ],
    },
    custom: {
      eyebrow: 'Software sob medida',
      title: 'Quando a área precisa de tela própria, construímos.',
      lead: 'Portal de representantes, painel de chão de fábrica ou integração entre sistemas, sobre a mesma base e as mesmas permissões.',
      points: [
        'Integra com o ERP e os sistemas atuais.',
        'Código e contas em nome da empresa desde o primeiro dia.',
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
      lead: 'Uma liderança técnica única e especialistas acionados pelo escopo, tudo por escrito antes de começar.',
      link: 'Governança, segurança e continuidade',
    },
    proof: {
      eyebrow: 'Prova',
      title: 'Experiência com IA dentro de uma operação real.',
      lead: 'A experiência de quem conduz a Torno: um produto de IA em terminais de contêineres, um modelo de crédito e um produto próprio.',
      stats: [
        { value: '−27%', label: 'de movimentos improdutivos' },
        { value: '+21%', label: 'de produtividade' },
      ],
      statSource: 'segundo a Loopt, MundoLogística, 13/01/2026',
      caseLink: 'Ler o case',
      allCases: 'Ver todos os cases',
      note: 'Resultados da solução da equipe da Loopt, publicados pela empresa. Os cases são experiência anterior à Torno e um produto próprio, e nenhum é cliente da Torno.',
    },
    fit: {
      eyebrow: 'Para quem é',
      title: 'A Torno trabalha só com indústria.',
      yesTitle: 'Faz sentido quando',
      yes: [
        'A operação roda sobre um ERP do qual várias áreas dependem.',
        'A informação está em planilhas, PDFs e na cabeça de pessoas experientes.',
        'Gente com décadas de casa está perto de se aposentar.',
        'As áreas fazem as mesmas perguntas umas às outras.',
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
          a: 'Não. Lemos o que a empresa já usa, seja TOTVS, SAP, Senior ou outro, com os acessos que a TI liberar.',
        },
        {
          q: 'Onde ficam os dados?',
          a: 'Na infraestrutura da empresa ou numa nuvem aprovada pela TI, com acesso por perfil. Os dados não treinam modelos de terceiros, e assinamos acordo de confidencialidade se a empresa pedir.',
        },
        {
          q: 'Quanto custa?',
          a: 'Cada etapa tem proposta fechada, orçada depois da etapa anterior, porque o valor depende das áreas e dos sistemas. A operação assistida é mensal.',
        },
        {
          q: 'Quanto tempo até o primeiro uso?',
          a: 'O diagnóstico leva de 2 a 4 semanas. O prazo do piloto entra na proposta, com o critério de sucesso.',
        },
        {
          q: 'A Torno é uma pessoa só?',
          a: 'A Torno tem uma liderança técnica única, Henrique Pett, que responde pelo projeto do início ao fim. Especialistas entram conforme o escopo e são nomeados na proposta.',
        },
        {
          q: 'A IA pode errar?',
          a: 'Pode. Por isso cada resposta cita a fonte, e ações que alteram dados nos sistemas passam pela aprovação de uma pessoa.',
        },
      ],
    },
    cta: {
      title: 'Vamos olhar a sua operação.',
      text: 'Uma conversa de 45 minutos, sem custo, para entender o problema. Se houver encaixe, o próximo passo é o diagnóstico.',
      secondary: 'Outras formas de contato',
    },
    adoption: {
      eyebrow: 'IA na indústria brasileira',
      title: 'A indústria que usa IA mais que dobrou em dois anos.',
      lead: 'Segundo o IBGE, a parcela das indústrias que usam IA foi de 16,9% em 2022 para 41,9% em 2024. Metade das que usam ainda não levou a IA para a fábrica. Nós começamos pela produção, pela qualidade e pela manutenção.',
      series: [
        { label: '2022', value: 16.9, display: '16,9%' },
        { label: '2024', value: 41.9, display: '41,9%' },
      ],
      facts: [
        {
          value: '57,5%',
          label: 'nas indústrias maiores (500 ou mais pessoas, IBGE) já usam IA',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
        {
          value: 'cerca de 1 em 5',
          label: 'das indústrias usa IA na produção',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
        {
          value: '51,9%',
          label: 'das que adotaram tecnologia digital avançada citam a concorrência como motivo',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
      ],
      note: 'Indústrias de transformação com 100 ou mais pessoas ocupadas. IBGE, PINTEC Semestral 2024, Indicadores Temáticos (set/2025).',
    },
    impact: {
      eyebrow: 'Resultados públicos',
      title: 'O que outras indústrias já mediram com IA.',
      lead: 'Números divulgados pelas próprias empresas, em áreas onde também atuamos. Nenhuma delas é cliente da Torno.',
      items: [
        {
          value: '5 mil h/mês',
          label: 'de trabalho que a empresa estima poupar com um assistente que acompanha 2.000 veículos de entrega',
          context: 'Processadora de proteínas, segundo a empresa',
          area: 'Logística',
          source: { label: 'SuperVarejo, set/2026', href: 'https://supervarejo.com.br/industria/seara-adota-inteligencia-artificial-para-ampliar-eficiencia-logistica-na-rota-de-entregas' },
          scope: 'industria',
        },
        {
          value: '+10%',
          label: 'de disponibilidade dos equipamentos, aproximadamente, em três anos com diagnóstico de falha por IA',
          context: 'Fabricante de motores elétricos em SC, segundo a empresa',
          area: 'Manutenção',
          source: { label: 'Artigo técnico da empresa, nov/2023', href: 'https://www.industriaquimica.es/descargar_documento/Weg7.pdf' },
          scope: 'industria',
        },
        {
          value: '16 dias',
          label: 'de prazo de cotação com IA, antes entre 29 e 51 dias',
          context: 'Siderúrgica brasileira, segundo a empresa',
          area: 'Comercial',
          source: { label: 'Baguete, mai/2025', href: 'https://www.baguete.com.br/noticias/gerdau-otimiza-cotacoes-com-ia-da-azure' },
          scope: 'industria',
        },
        {
          value: '1,7 vez',
          label: 'o crescimento de receita das empresas líderes em IA, comparado ao das demais',
          context: 'Estudo global e multissetorial da BCG, 2025',
          area: 'Resultado da empresa',
          source: { label: 'BCG, The Widening AI Value Gap, set/2025', href: 'https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings' },
          scope: 'global',
        },
      ],
      note: 'Resultados autodeclarados pelas empresas. No piloto, combinamos o indicador da área e medimos o antes e o depois na sua operação.',
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
      lead: 'We bring your operations data and know-how into one company brain and put AI agents to work where time is lost, in stages.',
      secondary: 'See how we work',
      facts: ['For mid-size and large manufacturers', 'Fixed proposal per stage', 'Code and data in your name'],
    },
    brain: {
      eyebrow: 'The operations brain',
      title: 'Ask the plant. Every answer cites its source.',
      lead: 'We bring what you already have into one searchable base, with permissions by area. Each answer shows where it came from.',
      sourcesTitle: 'What goes in',
      sources: ['ERP', 'MES', 'Spreadsheets', 'Technical sheets', 'Procedures and standards', 'Non-conformances', 'Contracts and catalogs', 'Emails and tickets'],
      points: [
        { title: 'On infrastructure IT approves', body: 'Your servers or an approved cloud. Your data never trains third-party models.' },
        { title: 'Permissions by area', body: 'Each person sees only what their role already allows.' },
        { title: 'A source in every answer', body: 'Sheet, order or report cited, to check before acting.' },
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
      demo: {
        tabsLabel: 'Example questions by area',
        mockLabel: 'Production',
        items: [
          {
            label: 'Quality',
            asker: 'Quality analyst · Final inspection',
            question: 'Have we had out-of-tolerance burrs on item 3318? What did we do?',
            answer:
              'Yes, twice this year [1]. Last time the cause was wear on tool F-207, now replaced every 40,000 cycles [2].',
            sources: [
              { title: 'Non-conformances NCR-0847 and NCR-1033', detail: 'Final inspection · item 3318' },
              { title: '8D report 8D-0047', detail: 'Root cause and corrective action' },
            ],
          },
          {
            label: 'Maintenance',
            asker: 'Maintenance technician · Shift C',
            question: 'Press P-04 stopped with a hydraulic pressure alarm. What fixed it before?',
            answer:
              'The last three times, the return filter was clogged [1]. The procedure calls for a new filter and a purge, with the machine locked out [2]. There is a spare in bin B-12 [3].',
            sources: [
              { title: 'P-04 maintenance orders', detail: 'MO 5521, 5874 and 6102' },
              { title: 'Procedure PM-HID-03, rev. B', detail: 'Filter replacement and purge' },
              { title: 'Spare parts stock', detail: 'ERP · storeroom' },
            ],
          },
          {
            label: 'Sales',
            asker: 'Sales rep · South region',
            question: 'Can we promise 1,200 units of item 5120 by the end of the month?',
            answer:
              'Yes. There are 480 units in stock and a 900-unit work order due on the 22nd [1]. Delivery to your region takes 3 business days [2].',
            sources: [
              { title: 'Stock and work orders', detail: 'ERP · item 5120' },
              { title: 'Current commercial policy', detail: 'Lead times by region' },
            ],
          },
          {
            label: 'Management',
            asker: 'Plant manager',
            question: 'Why did scrap on line 3 go up last week?',
            answer:
              'Scrap went from 2.1% to 3.4%, on the Tuesday and Wednesday night shifts [1]. On both days a raw material batch came in with moisture above spec [2].',
            sources: [
              { title: 'Production records · line 3', detail: 'Week 44' },
              { title: 'Incoming report for batch 7781', detail: 'Incoming inspection' },
            ],
          },
        ],
      },
    },
    solutions: {
      eyebrow: 'Solutions',
      title: 'AI agents for every area of the plant.',
      lead: 'Each agent does one defined job and has an owner in the area. The assessment decides where to start.',
      exampleLabel: 'Illustrative examples',
      areas: [
        { eyebrow: 'Production and planning', title: 'Order, routing and shift in one query', body: 'Work order history, shift summaries and delay alerts before the promised date.' },
        { eyebrow: 'Quality', title: 'Every deviation with its history', body: 'Past non-conformances and actions, draft 8D reports, batches checked against spec.' },
        { eyebrow: 'Maintenance', title: 'The right manual on the technician’s phone', body: 'History, manual and procedure in the hands of whoever is at the machine.' },
        { eyebrow: 'Sales and reps', title: 'Price, lead time and stock without waiting', body: 'Order status, stock and lead time in one question, within commercial rules.' },
        { eyebrow: 'Marketing and catalog', title: 'Product sheets from approved data', body: 'Catalog and technical content written from engineering data and reviewed by its owner.' },
        { eyebrow: 'Procurement', title: 'Supplier, lead time and usage at a glance', body: 'Price and lead time per supplier, stock coverage and open orders before negotiating.' },
        { eyebrow: 'Operator know-how', title: 'What 20 years on the floor teach, recorded', body: 'Machine adjustments and defect causes recorded with the people who know, to train new staff.' },
        { eyebrow: 'Management', title: 'Indicators explained in plain words', body: 'Why scrap went up this week, with the path back to the source data.' },
      ],
    },
    custom: {
      eyebrow: 'Custom software',
      title: 'When an area needs its own screen, we build it.',
      lead: 'A rep portal, a shop-floor dashboard or a systems integration, on the same data and permissions.',
      points: ['Integrates with your ERP and current systems.', 'Code, documentation and accounts in your name from day one.', 'A runbook so your IT can take over when it wants.'],
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
      lead: 'One technical lead and specialists brought in by scope, all in writing before we start.',
      link: 'Governance, security and continuity',
    },
    proof: {
      eyebrow: 'Proof',
      title: 'Experience with AI inside a real operation.',
      lead: 'The experience behind Torno: an AI product in container terminals, a credit model and a product of our own.',
      stats: [
        { value: '−27%', label: 'unproductive moves' },
        { value: '+21%', label: 'productivity' },
      ],
      statSource: 'according to Loopt, MundoLogística, Jan 13, 2026',
      caseLink: 'Read the case',
      allCases: 'See all cases',
      note: 'Results of the Loopt team’s solution, published by the company. The cases are experience before Torno and a product of our own, and none is a Torno client.',
    },
    fit: {
      eyebrow: 'Who it is for',
      title: 'Torno works with manufacturers only.',
      yesTitle: 'A good fit when',
      yes: [
        'Your operation runs on an ERP several areas depend on.',
        'Information sits in spreadsheets, PDFs and experienced people.',
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
          a: 'In your infrastructure or a cloud your IT approves, with role-based access. Your data never trains third-party models, and we sign an NDA if you ask.',
        },
        {
          q: 'How much does it cost?',
          a: 'Each stage has a fixed proposal, quoted after the previous stage. Managed operation is a monthly fee.',
        },
        {
          q: 'Is Torno just one person?',
          a: 'Torno has one technical lead, Henrique Pett, accountable from start to finish. Specialists join by scope and are named in the proposal.',
        },
        {
          q: 'Can the AI be wrong?',
          a: 'Yes. That is why every answer cites its source, and actions that change data in your systems need a person’s approval.',
        },
      ],
    },
    cta: {
      title: 'Let’s look at your operation.',
      text: 'A free 45-minute call to understand the problem. If there is a fit, the next step is the assessment.',
      secondary: 'Other ways to reach us',
    },
    adoption: {
      eyebrow: 'AI in Brazilian manufacturing',
      title: 'The share of manufacturers using AI more than doubled in two years.',
      lead: 'According to IBGE, the share of manufacturers using AI went from 16.9% in 2022 to 41.9% in 2024. Half of those using it have not taken it to the plant floor yet. We start with production, quality and maintenance.',
      series: [
        { label: '2022', value: 16.9, display: '16.9%' },
        { label: '2024', value: 41.9, display: '41.9%' },
      ],
      facts: [
        {
          value: '57.5%',
          label: 'of the largest manufacturers (500 or more people, IBGE) already use AI',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
        {
          value: 'about 1 in 5',
          label: 'manufacturers use AI in production',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
        {
          value: '51.9%',
          label: 'of those adopting advanced digital technology cite competition as a reason',
          source: { label: 'IBGE, PINTEC Semestral 2024', href: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf' },
        },
      ],
      note: 'Manufacturers with 100 or more employed people. IBGE, PINTEC Semestral 2024, Thematic Indicators (Sep 2025).',
    },
    impact: {
      eyebrow: 'Public results',
      title: 'What other manufacturers have already measured with AI.',
      lead: 'Figures published by the companies themselves, in areas where we also work. None of them is a Torno client.',
      items: [
        {
          value: '5,000 h/month',
          label: 'of work the company expects to save with an assistant that tracks 2,000 delivery vehicles',
          context: 'Protein processor, according to the company',
          area: 'Logistics',
          source: { label: 'SuperVarejo, Sep 2026', href: 'https://supervarejo.com.br/industria/seara-adota-inteligencia-artificial-para-ampliar-eficiencia-logistica-na-rota-de-entregas' },
          scope: 'industria',
        },
        {
          value: '+10%',
          label: 'equipment availability, approximately, over three years with AI fault diagnosis',
          context: 'Electric motor maker in Santa Catarina, according to the company',
          area: 'Maintenance',
          source: { label: 'Company technical article, Nov 2023', href: 'https://www.industriaquimica.es/descargar_documento/Weg7.pdf' },
          scope: 'industria',
        },
        {
          value: '16 days',
          label: 'quote turnaround with AI, down from 29 to 51 days',
          context: 'Brazilian steelmaker, according to the company',
          area: 'Sales',
          source: { label: 'Baguete, May 2025', href: 'https://www.baguete.com.br/noticias/gerdau-otimiza-cotacoes-com-ia-da-azure' },
          scope: 'industria',
        },
        {
          value: '1.7 times',
          label: 'the revenue growth of AI leaders compared with other companies',
          context: 'Global cross-industry study by BCG, 2025',
          area: 'Company results',
          source: { label: 'BCG, The Widening AI Value Gap, Sep 2025', href: 'https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings' },
          scope: 'global',
        },
      ],
      note: 'Results as reported by the companies. In a pilot, we agree on the area’s indicator and measure before and after in your operation.',
    },
  },
};
