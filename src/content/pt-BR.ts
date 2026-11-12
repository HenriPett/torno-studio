/**
 * Copy compartilhado PT-BR (contrato em ./types.ts): meta, OG, rótulos comuns, consentimento, privacidade,
 * /diagnostico/ e 404. Home e páginas institucionais: ./home.ts e ./institucional.ts.
 * Regras: docs/estrategia-2026-11-torno-industria.md (§5 honestidade, §9 voz).
 */

import type { SiteCopy } from './types';

export const ptBR: SiteCopy = {
  locale: 'pt-BR',

  meta: {
    home: {
      title: '{brand} | IA e software sob medida para a indústria',
      description:
        'Juntamos dados e conhecimento da operação num cérebro da empresa e colocamos agentes de IA nas áreas da fábrica. Implantação por etapas, com a sua TI.',
    },
    privacy: {
      title: 'Privacidade | {brand}',
      description:
        'Como este site trata dados pessoais: cookies só com o seu consentimento, sem formulário e com seus direitos pela LGPD.',
    },
    notFound: {
      title: 'Página não encontrada | {brand}',
      description: 'O endereço pode ter mudado ou estar digitado errado.',
    },
  },

  og: {
    title: 'IA aplicada à operação industrial.',
    description: 'Cérebro da operação e agentes de IA por área, implantados por etapas e dentro das regras da TI da sua indústria.',
    imageAlt: 'IA aplicada à operação industrial, desenhada para a sua fábrica e implantada por etapas.',
    imageLines: [
      '{brand} · IA e software para a indústria',
      'IA aplicada à operação industrial.',
      'Desenhada para a sua fábrica e implantada por etapas.',
    ],
  },

  common: {
    skipToContent: 'Pular para o conteúdo',
    languageSwitchShort: 'EN',
    languageSwitchLabel: 'Mudar idioma para inglês',
    themeToggleLabel: 'Alternar tema claro/escuro',
    // Sem menu mobile no design (Timbre); mantidos porque o contrato exige.
    bookingCtaHeader: 'Agendar diagnóstico',
    bookingCtaHeaderMobile: 'Agendar',
  },

  consent: {
    regionLabel: "Aviso de cookies",
    text: "Uso cookies de medição e publicidade só se você aceitar.",
    policyLink: "Política de privacidade",
    accept: "Aceitar",
    reject: "Recusar",
    customize: "Personalizar",
    dialog: {
      title: "Preferências de cookies",
      intro:
        "Escolha o que pode carregar neste site. Medição e Publicidade ficam desligadas até você ligar, e recusar não muda nada no site. Você pode mudar de ideia a qualquer momento pelo rodapé.",
      alwaysOn: "Sempre ativo",
      categories: {
        necessary: {
          name: "Necessários",
          description:
            "Guardam a sua escolha sobre cookies e, se você trocar, a preferência de tema. Ficam só no seu navegador, não saem do seu dispositivo e não podem ser desligados.",
          vendors: [],
        },
        measurement: {
          name: "Medição",
          description:
            "Abre a agenda num quadro do Calendly e repassa a origem da visita. Valem os cookies e a política do Calendly. Ao abrir, antes da sua escolha no aviso dele, ferramentas de terceiros do Calendly, inclusive de publicidade (Google Analytics, Facebook, Segment, Braze, Stripe, reCAPTCHA), podem receber seu IP e a página.",
          vendors: [{ label: "Privacidade do Calendly", url: "https://calendly.com/legal/privacy-notice" }],
        },
        advertising: {
          name: "Publicidade",
          description:
            "Carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios e avisa quando um diagnóstico é agendado. Nome, e-mail e dados do agendamento não são enviados ao Google.",
          vendors: [{ label: "Cookies do Google Ads", url: "https://policies.google.com/technologies/ads?hl=pt-BR" }],
        },
      },
      save: "Salvar escolhas",
      acceptAll: "Aceitar tudo",
      rejectAll: "Recusar tudo",
      close: "Fechar",
    },
    footerLink: "Preferências de cookies",
    saved: "Preferências de cookies salvas",
  },

  privacy: {
    title: 'Privacidade',
    updatedLabel: 'Atualizado em',
    updated: '2026-10-09',
    sections: [
      {
        title: "Resumo",
        body: "Este site apresenta o meu trabalho. Não tem cadastro nem formulário. Uso cookies de medição e de publicidade só se você aceitar no aviso de cookies; recusar não muda nada no site. Esta política segue a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).",
      },
      {
        title: "Quem trata os dados",
        body: "O controlador é a empresa identificada no fim desta página, pela qual presto os serviços apresentados aqui. Como agente de tratamento de pequeno porte, ela não indicou encarregado (Resolução CD/ANPD nº 2/2022, art. 11). O canal para pedidos e reclamações sobre seus dados é o e-mail de contato abaixo, que chega direto a mim.",
      },
      {
        title: "Que dados são tratados",
        body: "Registros técnicos: a Netlify, que hospeda o site e atua como operadora em meu nome, registra dados de cada acesso, como endereço IP, data e hora, página pedida, página de origem, navegador e país aproximado. Eu não mantenho cópia própria desses registros. Conto as visitas à página de diagnóstico de forma agregada (um número por dia), sem cookies e sem guardar IP ou navegador (legítimo interesse, art. 7º, IX). Agendamento e e-mail: só o que você mesmo informa, como nome, e-mail, o assunto da conversa e a resposta à pergunta \"Como chegou até aqui?\" do formulário do Calendly. Com o seu consentimento de Medição: o agendamento do Calendly abre dentro do site, e a origem da visita é repassada a ele, ou seja, os 5 parâmetros UTM da campanha que trouxe você (fonte, meio, campanha, conteúdo e termo); nunca repasso identificadores individuais, como o identificador de clique do anúncio. Com o seu consentimento de Publicidade: o Google Ads grava cookies e identificadores no seu navegador para medir o resultado dos meus anúncios. Se você aceitou as duas categorias e agenda um diagnóstico dentro do site, o Google Ads recebe um aviso de conversão, sem nome, e-mail ou dados do agendamento.",
      },
      {
        title: "Para que e com qual base legal",
        body: "Registros técnicos servem para manter o site no ar e seguro: legítimo interesse (art. 7º, IX, da LGPD). Agendamento, e-mail e a resposta à pergunta do Calendly servem para marcar e fazer a conversa e preparar uma proposta, a seu pedido: procedimentos preliminares a um contrato (art. 7º, V). O agendamento do Calendly dentro do site, o repasse da origem da visita, os cookies de publicidade e o aviso de conversão ao Google Ads dependem do seu consentimento (art. 7º, I), que você pode revogar a qualquer momento. Quando a lei exige guardar algo, a base é o cumprimento de obrigação legal (art. 7º, II).",
      },
      {
        title: "Cookies e armazenamento no navegador",
        body: "Antes da sua escolha, nada de terceiros é carregado. Necessários: guardo no seu navegador a sua escolha sobre cookies e, se você trocar, a preferência de tema; isso não sai do seu dispositivo. Medição: o agendamento abre dentro do site num quadro do próprio Calendly, que aplica a política e os cookies dele e pode carregar ferramentas de terceiros que o Calendly usa, inclusive de publicidade, como Google Analytics, Facebook, Segment, Braze, OneTrust, Stripe e reCAPTCHA. Assim que o quadro abre, antes da sua escolha no aviso do próprio Calendly, essas ferramentas podem receber o seu endereço IP e o endereço da página; a origem da visita fica guardada só nesta sessão do navegador. Sem Medição, o botão abre a página do próprio Calendly. Publicidade: carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios. A lista completa está na tabela abaixo.",
      },
      {
        title: "Com quem os dados são compartilhados",
        body: "Só com os fornecedores que fazem o site, o contato e a medição de anúncios funcionarem, e só para isso: a Netlify (hospedagem); o Calendly (agenda), que abre dentro do site só com o seu consentimento de Medição e, sem ele, na página do próprio Calendly; nos dois casos, vale a política de privacidade e de cookies do Calendly; e o Google, que hospeda o meu e-mail e, com o seu consentimento de Publicidade, opera o Google Ads. Cada um segue a própria política de privacidade. Não vendo dados. Autoridades só recebem dados mediante requisição legal.",
      },
      {
        title: "Transferência internacional",
        body: "A Netlify e o Google processam dados nos Estados Unidos, e o Calendly também pode processá-los fora do Brasil. Essas transferências seguem o art. 33 da LGPD, com base nos compromissos contratuais de proteção de dados desses fornecedores.",
      },
      {
        title: "Por quanto tempo",
        body: "Os registros técnicos de acesso ficam com a Netlify pelo prazo de retenção dela, e eu não os guardo à parte. Os dados do Google Ads ficam pelo prazo da política do Google, e cada cookie dura o prazo indicado na tabela abaixo. A sua escolha sobre cookies fica guardada no seu navegador por 6 meses; depois disso, o aviso aparece de novo. Mensagens e dados de agendamento ficam enquanto forem necessários para a conversa. Se ela virar contrato, guardo o que a lei exigir pelo prazo legal; se não virar, apago quando deixarem de ser necessários ou quando você pedir.",
      },
      {
        title: "Seus direitos",
        body: "Pela LGPD (art. 18), você pode pedir: confirmação de que trato seus dados e acesso a eles; correção; anonimização, bloqueio ou eliminação; portabilidade; informação sobre com quem eles foram compartilhados; e se opor a um tratamento baseado em legítimo interesse. Você pode revogar ou mudar o seu consentimento a qualquer momento em \"Preferências de cookies\", no rodapé de todas as páginas. Respondo em até 15 dias pelo contato abaixo. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).",
      },
      {
        title: "Segurança",
        body: "O site é estático, servido só por HTTPS, e não guarda dados pessoais em banco de dados próprio. O acesso às contas dos fornecedores é restrito a mim.",
      },
      {
        title: "Mudanças nesta política",
        body: "Quando esta política mudar, atualizo a data no topo da página.",
      },
    ],
    contact: {
      title: 'Contato',
      controllerLabel: 'Controlador',
      linkedinFallback: { lead: 'Para qualquer pedido sobre seus dados, fale comigo pelo', label: 'LinkedIn' },
    },
    backLink: 'Voltar para a página inicial',
    cookies: {
      title: "Cookies e armazenamento usados",
      intro: "Lista do que este site pode gravar no seu navegador, por categoria. Medição e Publicidade só gravam algo depois do seu consentimento. Os cookies do Calendly só existem se você aceitar Medição e abrir o agendamento: são definidos pelo Calendly dentro do quadro de agendamento, e o Calendly pode usar outros conforme a política dele.",
      caption: "Cookies e armazenamento local deste site",
      headers: { name: "Nome", vendor: "Fornecedor", purpose: "Finalidade", category: "Categoria", duration: "Duração" },
      rows: [
        { name: "_gcl_au", vendor: "Google (Google Ads)", purpose: "Medir a eficácia dos anúncios. Cookie do domínio do site (1ª parte).", category: "Publicidade", duration: "90 dias" },
        { name: "_gcl_ls", vendor: "Google (Google Ads)", purpose: "Medir a eficácia dos anúncios. Armazenamento local do navegador.", category: "Publicidade", duration: "Sem prazo publicado pelo Google; apagado quando você revoga o consentimento" },
        { name: "ts-consent", vendor: "Este site", purpose: "Registrar a sua escolha sobre cookies. Armazenamento local do navegador.", category: "Necessário", duration: "6 meses" },
        { name: "ts-utm", vendor: "Este site", purpose: "Guardar a origem da visita (UTMs da campanha) para repassá-la ao Calendly. Armazenamento de sessão do navegador.", category: "Medição", duration: "Até você fechar a aba" },
        { name: "theme", vendor: "Este site", purpose: "Lembrar o tema claro ou escuro, só se você trocar. Armazenamento local do navegador.", category: "Necessário", duration: "Até você limpar os dados do navegador" },
        { name: "__cf_bm", vendor: "Calendly (Cloudflare), em .calendly.com", purpose: "Segurança e proteção contra robôs no agendamento.", category: "Medição", duration: "30 minutos" },
        { name: "_cfuvid", vendor: "Calendly (Cloudflare), em .calendly.com", purpose: "Segurança do agendamento.", category: "Medição", duration: "Até você fechar o navegador" },
        { name: "OptanonConsent", vendor: "Calendly (OneTrust), em .calendly.com", purpose: "Guardar a sua escolha de cookies no Calendly.", category: "Medição", duration: "1 ano" },
        { name: "m", vendor: "Calendly (Stripe), em m.stripe.com", purpose: "Prevenção de fraude.", category: "Medição", duration: "Cerca de 1 ano" },
      ],
    },
  },

  diagnostico: {
    meta: {
      title: 'Diagnóstico de IA para a operação industrial | {brand}',
      description:
        'Em 2 a 4 semanas, um mapa de onde a IA ajuda a sua fábrica, com esforço, risco e um piloto recomendado. Comece por uma conversa de 45 minutos.',
    },
    hero: {
      eyebrow: 'Diagnóstico de IA para a indústria',
      title: 'Descubra onde a IA ajuda a sua fábrica antes de investir nela.',
      lead: 'Entrevistas por área, inventário de dados e sistemas e um mapa de oportunidades com esforço, risco e um piloto recomendado. O relatório fica com a empresa.',
      cta: 'Agendar diagnóstico',
      facts: ['Conversa inicial de 45 min, sem custo', 'Proposta fechada antes de começar', 'Confidencialidade assinada, se pedir'],
    },
    deliverables: {
      eyebrow: 'O que a empresa recebe',
      title: 'Um relatório para a diretoria decidir o próximo passo.',
      lead: 'Os documentos do diagnóstico ficam com a empresa e servem de base para qualquer fornecedor, inclusive para não seguir com a Torno.',
      items: [
        {
          eyebrow: 'Áreas',
          title: 'Mapa de oportunidades',
          body: 'Onde o tempo se perde em produção, qualidade, manutenção, comercial e suprimentos, com exemplos colhidos nas entrevistas.',
        },
        {
          eyebrow: 'Sistemas',
          title: 'Inventário de dados',
          body: 'ERP, MES, planilhas, fichas técnicas, procedimentos e históricos: o que existe, onde está, quem responde e em que estado.',
        },
        {
          eyebrow: 'Prioridade',
          title: 'Esforço e risco por caso',
          body: 'Estimativa de esforço, dependências da TI e riscos de dados e de adoção, para comparar as opções com o mesmo critério.',
        },
        {
          eyebrow: 'Piloto',
          title: 'Primeiro passo recomendado',
          body: 'Uma área, um problema, um responsável e o critério de sucesso que será medido antes e depois do piloto.',
        },
      ],
    },
    steps: {
      eyebrow: 'Como funciona',
      title: 'Da primeira conversa ao piloto.',
      lead: 'Cada etapa tem proposta fechada e termina com uma decisão da empresa.',
      items: [
        {
          meta: '45 minutos, sem custo',
          title: 'Conversa inicial',
          body: 'Entendemos a operação, o problema que mais pesa e quem decide. Se não houver encaixe, dizemos na própria conversa.',
        },
        {
          meta: '2 a 4 semanas',
          title: 'Diagnóstico',
          body: 'Entrevistas por área, levantamento de dados e sistemas com a TI e o relatório com o mapa de oportunidades.',
        },
        {
          meta: 'Uma área',
          title: 'Piloto',
          body: 'Um problema, com o critério de sucesso medido antes e depois, usando dados reais da operação.',
        },
        {
          meta: 'Área por área',
          title: 'Implantação e operação',
          body: 'As outras áreas entram na ordem que o piloto indicar, com acompanhamento mensal depois da entrada em uso.',
        },
      ],
    },
    proofs: {
      eyebrow: 'Experiência',
      title: 'Quem conduz já levou IA para dentro de uma operação.',
      lead: 'A Torno é conduzida por Henrique Pett, que construiu o modelo de IA e depois liderou o produto usado na operação de terminais de contêineres da Loopt.',
      stats: [
        {
          value: '−27%',
          label: 'de movimentos improdutivos no pátio',
          source: { label: 'segundo a Loopt, MundoLogística, 13/01/2026', href: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres' },
        },
        {
          value: '+21%',
          label: 'de produtividade na operação',
          source: { label: 'segundo a Loopt, MundoLogística, 13/01/2026', href: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres' },
        },
      ],
      items: [
        {
          eyebrow: 'IA em operação',
          title: 'Loopt',
          body: 'Engenharia de ML e, depois, gestão do produto de IA que recomenda onde posicionar cada contêiner no pátio. Os números acima são da solução da equipe, publicados pela empresa.',
        },
        {
          eyebrow: 'Dados e crédito',
          title: 'Bom.Capital',
          body: 'Relato do fundador: como primeiro profissional de dados da fintech, construiu o modelo de análise de crédito, que levava em média 48 horas e passou a menos de 2 horas.',
        },
      ],
      note: 'Experiência profissional de quem conduz a Torno, anterior a ela. Loopt e Bom.Capital não são clientes da Torno. O relato da Bom.Capital não tem publicação externa.',
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          q: 'Quanto custa o diagnóstico?',
          a: 'O diagnóstico tem proposta fechada, enviada depois da conversa inicial. O valor depende do número de áreas, plantas e sistemas envolvidos. A conversa de 45 minutos não tem custo.',
        },
        {
          q: 'Precisa trocar o ERP ou mexer nos sistemas?',
          a: 'Não. Trabalhamos com o que a empresa já usa, seja TOTVS, SAP, Senior ou outro, e só acessamos o que a TI liberar, com perfil de leitura sempre que possível.',
        },
        {
          q: 'Os dados saem da empresa?',
          a: 'No diagnóstico, trabalhamos com entrevistas, amostras e acessos de leitura combinados com a TI. Na implantação, os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI e não são usados para treinar modelos de terceiros.\n\nAssinamos acordo de confidencialidade antes de começar, se a empresa pedir.',
        },
        {
          q: 'Quem participa do lado da empresa?',
          a: 'Um patrocinador na diretoria, um ponto focal e uma ou duas pessoas por área entrevistada, cerca de uma hora cada. A TI participa do inventário de sistemas.',
        },
        {
          q: 'E se o diagnóstico mostrar que não vale a pena?',
          a: 'O relatório diz isso e explica os motivos. Ele pertence à empresa, contrate ou não as etapas seguintes.',
        },
        {
          q: 'A Torno é uma pessoa só?',
          a: 'A Torno tem uma liderança técnica única, Henrique Pett, que responde pelo projeto do diagnóstico à operação. Especialistas em dados, segurança, UX, infraestrutura ou do setor entram conforme o escopo e são nomeados na proposta.',
        },
      ],
    },
    finalCta: {
      title: 'Comece por uma conversa de 45 minutos.',
      text: 'Conte qual área mais perde tempo hoje. Ao fim da conversa, você sabe se o diagnóstico faz sentido e o que separar para ele.',
    },
  },

  notFound: {
    title: 'Esta página não existe.',
    body: 'O endereço pode ter mudado ou estar digitado errado.',
    homeLink: 'Voltar para o início',
  },
};
