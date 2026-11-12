import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'metalmecanica',
  sectorName: 'metalmecânica',
  meta: {
    title: 'IA para indústrias metalmecânicas | Torno',
    description:
      'Cérebro da operação e agentes de IA para orçamento por desenho, roteiro e apontamento, documentação de qualidade e manutenção. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para indústrias metalmecânicas',
    title: 'Orçamento por desenho sem esperar o veterano da usinagem',
    lead: 'A Torno junta ERP, roteiros, apontamentos, desenhos de cliente, orçamentos antigos e registros de qualidade num cérebro da operação. Em cima dele, agentes de IA atendem orçamentação, PCP, processo, qualidade, manutenção e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Poucas plantas grandes, com muita informação por pedido',
    body: [
      'Em Santa Catarina, metalurgia e fabricação de produtos de metal somam 66.221 pessoas ocupadas em mais de 7 mil unidades locais. Só 26 delas têm 250 ou mais pessoas ocupadas (IBGE, CEMPRE 2024).',
      'Numa metalmecânica desse porte, cada pedido começa com um desenho do cliente e termina com um certificado. No meio estão o orçamento, o roteiro, a programação de máquina, o apontamento e a inspeção. Boa parte da informação que decide prazo e margem está em orçamentos antigos e na experiência de poucas pessoas.',
    ],
  },
  pains: {
    title: 'O que pesa numa metalmecânica sob encomenda',
    items: [
      {
        title: 'Orçamento por desenho depende de duas pessoas',
        body: 'Calcular tempo de usinagem, material, tratamento térmico e serviços de terceiros de uma peça nova exige quem já fez algo parecido. Quando essas pessoas estão apagando incêndio na produção, a cotação espera.',
      },
      {
        title: 'Roteiro e tempo padrão desatualizados',
        body: 'O roteiro do ERP diz uma coisa, o apontamento mostra outra e a programação segue a experiência do encarregado.',
      },
      {
        title: 'Documentação de qualidade montada à mão',
        body: 'Relatório dimensional, certificado de material, plano de controle e, para os clientes que exigem, PPAP e FMEA. Juntar tudo por pedido toma horas da qualidade.',
      },
      {
        title: 'Retrabalho que volta',
        body: 'A mesma não conformidade reaparece em peças parecidas porque a ação tomada da última vez não chega a quem programa e a quem opera a máquina.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa metalmecânica',
    intro:
      'Os exemplos são ilustrativos. O diagnóstico mostra se o primeiro ganho está na cotação, no chão de fábrica ou na qualidade.',
    items: [
      {
        area: 'Orçamentação',
        title: 'Cotação a partir de peças semelhantes',
        body: 'O agente lê o desenho do cliente, encontra peças parecidas já feitas e traz roteiro, tempos apontados e custo realizado para o orçamentista.',
        example: '“Que flanges em aço 1045 acima de 300 mm de diâmetro já usinamos e quanto tempo levaram no torno CNC?”',
      },
      {
        area: 'PCP',
        title: 'Programação com o tempo que a fábrica faz',
        body: 'Compara tempo padrão e tempo apontado por operação e máquina, e avisa quando uma ordem vai passar da data.',
        example: '“Quais ordens da caldeiraria estão paradas por falta de chapa e quais dependem de terceiro?”',
      },
      {
        area: 'Engenharia de processo',
        title: 'Roteiro com o que a fábrica aprendeu',
        body: 'Sugere ajustes de roteiro a partir dos apontamentos e das observações dos operadores, para a engenharia aprovar.',
        example: '“Em quais peças o fresamento apontado ficou 20% acima do padrão nos últimos três meses?”',
      },
      {
        area: 'Qualidade',
        title: 'Documentação por pedido em minutos',
        body: 'Reúne certificados, relatórios dimensionais e registros de inspeção do pedido e prepara o rascunho do 8D quando há não conformidade.',
        example: '“Monte o pacote de documentação do pedido 7731 com certificados de material e relatório dimensional.”',
      },
      {
        area: 'Manutenção',
        title: 'Histórico da máquina no chão de fábrica',
        body: 'Manual, plano preventivo e ordens de serviço anteriores de cada centro de usinagem, consultados no celular do técnico.',
        example: '“Qual foi a última falha no eixo-árvore do centro de usinagem 4 e o que foi trocado?”',
      },
      {
        area: 'Comercial',
        title: 'Status de pedido sem ligar para a produção',
        body: 'Vendedores consultam andamento, previsão de entrega e documentação dos pedidos, com as permissões de cada um.',
        example: '“Em que operação está o pedido 7731 e qual a nova previsão de entrega?”',
      },
    ],
  },
  mock: {
    question: 'Já usinamos algo parecido com o desenho 55-118 do cliente? Quanto tempo levou?',
    answer:
      'Sim. A peça mais próxima é o eixo E-3307, no mesmo aço SAE 4140 e com diâmetro 8% menor. O roteiro teve torneamento CNC, fresamento de rasgo de chaveta, têmpera em terceiro e retífica. O tempo apontado de usinagem foi de 3 h 40 min por peça, 25 min acima do padrão por causa da retífica.',
    citations: ['Roteiro E-3307, rev. B', 'Apontamentos da OP 60412', 'Orçamento 0981'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa metalmecânica',
    body: [
      'O ERP traz pedidos, roteiros, tempos padrão, apontamentos e custos. A engenharia tem desenhos de cliente, programas CNC e instruções de trabalho. A qualidade tem certificados de material, relatórios dimensionais e não conformidades. O comercial tem anos de orçamentos.',
      'Ligamos tudo por pedido, peça e máquina. Assim, a pergunta sobre uma peça nova encontra as parecidas, com o caminho completo do orçamento à entrega. Cada resposta cita a fonte, e custo e margem ficam com quem a empresa autorizar.',
    ],
    inputs: [
      'Pedidos, roteiros, tempos padrão e apontamentos do ERP',
      'Desenhos de cliente e revisões',
      'Orçamentos ganhos e perdidos',
      'Certificados de material e relatórios dimensionais',
      'Não conformidades, 8D e ações tomadas',
      'Planos de manutenção das máquinas',
      'Entrevistas com programadores CNC e encarregados',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa usinagem com fila de cotações',
    intro:
      'Uma metalmecânica com cerca de 400 funcionários recebe mais pedidos de cotação do que consegue orçar no prazo que o cliente pede.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Levantamos as cotações dos últimos meses, quantas saíram no prazo e quanto tempo cada uma levou. Com orçamentação, produção e TI, combinamos o critério de sucesso.',
      },
      {
        title: 'Base de peças já feitas',
        body: 'Orçamentos antigos ligados a roteiro, apontamento e custo realizado, e desenhos indexados por material, forma e medida.',
      },
      {
        title: 'Piloto com dois orçamentistas',
        body: 'Eles usam o assistente nas cotações novas. Quando a peça é produzida, comparamos o orçado com o realizado.',
      },
      {
        title: 'Próxima etapa',
        body: 'Com o critério atingido, PCP e qualidade passam a usar a mesma base, começando pela documentação por pedido.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, primeiro na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Na metalmecânica ainda não temos case publicado, e o trabalho começa pelo diagnóstico, com critério combinado antes do piloto.',
  },
  faq: [
    {
      q: 'Os desenhos dos nossos clientes ficam protegidos?',
      a: 'Desenhos de cliente costumam ter cláusula de sigilo, e tratamos assim. Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI, com acesso por perfil e registro de uso, e não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP?',
      a: 'Lemos o ERP já implantado, seja TOTVS, SAP, Senior ou outro, pelo caminho que a TI aprovar. Onde o apontamento é parcial ou em papel, o diagnóstico avalia o que dá para usar e o que precisa ser registrado antes.',
    },
    {
      q: 'O que acontece com o conhecimento dos programadores e encarregados mais antigos?',
      a: 'Registramos em entrevistas e no acompanhamento do trabalho deles, com revisão de cada um antes de entrar na base. A ideia é que o orçamentista novo e o operador do terceiro turno consultem esse saber com a fonte e o nome de quem validou.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico tem proposta fechada, e cada etapa seguinte também, com escopo definido pelo que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantas cotações a empresa responde por mês e onde elas param. Saímos da conversa com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
