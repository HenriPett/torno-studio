// Como funciona (UX §4.10): página de leitura com seções âncora.
//   respostas (integracoes) · quem-ve (seguranca) · canais (manutencao/comercial) · dados (seguranca) · demonstracao
// Conteúdo reaproveitado de modules/integracoes.js, modules/seguranca.js, do celular do técnico
// (manutencao.js) e do WhatsApp do representante (comercial.js). Pacote A.

import { h, icon, badge, select, phoneFrame, statusInfo } from '../ui.js';
import { normalize } from '../format.js';

const STATUS_INT = {
  conectado: ['Conectado', 'ok'],
  sincronizando: ['Sincronizando', 'accent'],
  erro: ['Erro', 'danger'],
  planejado: ['Planejado', 'neutral'],
};

function minutos(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return null;
  return Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) / 60000);
}

function relativo(iso, agoraMin) {
  const m = minutos(iso);
  if (m == null) return 'ainda não sincronizou';
  const diff = agoraMin - m;
  if (diff < 1) return 'agora mesmo';
  if (diff < 60) return `há ${diff} min`;
  if (diff < 24 * 60) return `há ${Math.floor(diff / 60)} h`;
  const dias = Math.floor(diff / 1440);
  return dias === 1 ? 'ontem' : `há ${dias} dias`;
}

function iconeDoTipo(tipo) {
  const t = normalize(tipo);
  if (t.includes('erp')) return 'database';
  if (t.includes('mes')) return 'factory';
  if (t.includes('mensag') || t.includes('whats')) return 'message';
  if (t.includes('mail')) return 'send';
  if (t.includes('chamad')) return 'alert';
  if (t.includes('planilha')) return 'file';
  if (t.includes('plm') || t.includes('ficha')) return 'box';
  if (t.includes('qualid') || t.includes('metrolog')) return 'shield-check';
  if (t.includes('edi')) return 'link';
  return 'file';
}

export function nomeCurto(nome) {
  return String(nome || '').replace(/\s*\(ex\.?:[^)]*\)\s*/i, '').trim() || nome;
}

function secao(id, titulo, ...filhos) {
  return h('section', { class: 'how__section', id: `cf-${id}`, 'data-secao': id, 'aria-labelledby': `cf-${id}-t` },
    h('h2', { id: `cf-${id}-t` }, titulo), ...filhos);
}

// ---------- 1. De onde vêm as respostas ----------
function deOndeVem(ctx) {
  const d = ctx.data;
  const conectores = d.integracoes || [];
  const syncs = conectores.map((i) => minutos(i.ultima_sync)).filter((m) => m != null);
  const agora = Math.max(minutos(`${ctx.today}T10:00`), (syncs.length ? Math.max(...syncs) : 0) + 5);
  const fmt = ctx.fmt;
  return secao('respostas', 'De onde vêm as respostas',
    h('p', { class: 'how__lead' }, `Nada é copiado à mão: o cérebro lê os sistemas que a ${ctx.empresaCurta || ctx.empresa} já usa.`),
    conectores.length
      ? h('ul', { class: 'how-list' }, conectores.map((c) => {
        const [label, tone] = STATUS_INT[c.status] || [statusInfo(c.status).label, 'neutral'];
        const quando = c.status === 'planejado' && !c.ultima_sync ? 'Próxima fase' : relativo(c.ultima_sync, agora);
        const regs = c.registros ? `${fmt.num(c.registros)} registros` : null;
        return h('li', null,
          h('span', { class: 'how-list__icon', 'aria-hidden': 'true' }, icon(iconeDoTipo(c.tipo), { size: 18 })),
          h('div', { class: 'how-list__main' },
            h('span', { class: 'how-list__name' }, nomeCurto(c.nome)),
            h('span', { class: 'how-list__meta' }, c.observacao || c.tipo),
            h('span', { class: 'how-list__mobile' }, [label, quando, regs].filter(Boolean).join(' · '))),
          h('div', { class: 'how-list__side' },
            badge(label, tone),
            h('span', null, quando),
            regs ? h('span', { class: 'num' }, regs) : null));
      }))
      : h('p', { class: 'muted' }, 'Nenhuma integração descrita para este setor.'));
}

// ---------- 2. Quem vê o quê ----------
function quemVe(ctx) {
  const perfis = ctx.data.perfis_acesso || [];
  const areasTodas = (ctx.data.areas || []).map((a) => a.id);
  const nomes = (ids) => (ids.length >= areasTodas.length ? 'Todas as áreas' : ids.map((a) => ctx.areaName(a)).join(', '));
  let atual = perfis.find((p) => p.id !== 'diretoria')?.id || perfis[0]?.id;
  const btnLabel = h('span', { class: 'btn__label' });
  const pinta = () => { btnLabel.textContent = `Perguntar como ${perfis.find((p) => p.id === atual)?.nome || ''}`; };
  const seletor = select({
    id: 'cf-perfil', label: 'Perfil', value: atual,
    options: perfis.map((p) => ({ value: p.id, label: p.nome })),
    onChange: (v) => { atual = v; pinta(); },
  });
  const btn = h('button', {
    type: 'button', class: 'btn btn--secondary',
    onClick: () => ctx.perguntar('', { perfil: atual, enviar: false, modulo: 'visao-geral' }),
  }, icon('user', { size: 18 }), btnLabel);
  pinta();
  return secao('quem-ve', 'Quem vê o quê',
    h('p', { class: 'how__lead' }, 'Cada pessoa só vê as áreas do seu perfil. A mesma pergunta tem respostas diferentes para o PCP e para a diretoria.'),
    perfis.length ? h('ul', { class: 'how-list' }, perfis.map((p) => h('li', null,
      h('span', { class: 'how-list__icon', 'aria-hidden': 'true' }, icon('users', { size: 18 })),
      h('div', { class: 'how-list__main' },
        h('span', { class: 'how-list__name' }, p.nome),
        h('span', { class: 'how-list__meta' },
          `${nomes(p.areas || [])} · ${ctx.fmt.num(p.usuarios)} ${p.usuarios === 1 ? 'pessoa' : 'pessoas'}`))))) : null,
    perfis.length ? h('div', { class: 'how-ask' }, seletor, btn) : null);
}

// ---------- 3. Onde a equipe pergunta ----------
function osRank(o) {
  return ({ corretiva: 0, preditiva: 1, preventiva: 2 }[o.tipo] ?? 3) * 10 + (o.status === 'aberta' ? 0 : 1);
}

function celularTecnico(ctx) {
  const d = ctx.data;
  const abertas = (d.manutencao || []).filter((o) => o.status !== 'concluida')
    .sort((a, b) => osRank(a) - osRank(b) || String(a.data).localeCompare(String(b.data)));
  const os = abertas[0];
  if (!os) return phoneFrame(h('div', { class: 'how-phone' }, h('p', { class: 'muted' }, 'Nenhuma OS aberta no momento.')));
  const maq = (d.maquinas || []).find((x) => x.id === os.maquina);
  const doc = os.procedimento ? (d.documentos || []).find((x) => x.id === os.procedimento) : null;
  const tipo = statusInfo(os.tipo);
  return phoneFrame(h('div', { class: 'how-phone' },
    h('div', { class: 'how-phone__top' }, h('span', null, 'Minhas OS'), maq ? ctx.ui.statusBadge(maq.status) : null),
    h('div', { class: 'how-phone__card' },
      h('div', { class: 'row' }, h('span', { class: 'how-phone__id' }, os.id), badge(tipo.label, tipo.tone === 'danger' ? 'warn' : tipo.tone)),
      maq ? h('span', { class: 'muted' }, `${maq.id} · ${maq.nome}`) : null,
      h('p', null, os.descricao),
      (os.pecas || []).length ? h('p', { class: 'muted' }, `Peças: ${os.pecas.join(', ')}`) : null),
    doc ? h('div', { class: 'how-phone__card' },
      h('strong', null, doc.titulo),
      (doc.trechos || []).length ? h('ol', { class: 'how-phone__steps' }, doc.trechos.slice(0, 4).map((t) => h('li', null,
        t.secao ? h('b', null, t.secao) : null, t.texto))) : null) : null));
}

function whatsRepresentante(ctx) {
  const msgs = ctx.data.conversa_whatsapp || [];
  const limpa = (t) => String(t || '').replace(/\[\[[^\]]*\]\]/g, '').replace(/\*\*([^*]+)\*\*/g, '$1');
  return phoneFrame(h('div', { class: 'wa' },
    h('div', { class: 'wa__head' }, icon('message', { size: 16 }), `Assistente · ${ctx.empresaCurta || ctx.empresa}`),
    msgs.map((m) => h('div', { class: ['wa__msg', m.de === 'assistente' ? 'wa__msg--bot' : 'wa__msg--eu'] },
      limpa(m.texto), m.hora ? h('span', { class: 'wa__hora' }, m.hora) : null))));
}

function ondePergunta(ctx) {
  const quadros = [];
  if (ctx.isEnabled('manutencao')) {
    quadros.push(h('figure', { class: 'how-channel', style: { margin: '0' } },
      h('h3', null, 'No celular do técnico'),
      h('p', { class: 'muted' }, 'A OS mais urgente e o procedimento passo a passo, na beira da máquina.'),
      celularTecnico(ctx)));
  }
  if (ctx.isEnabled('comercial') && (ctx.data.conversa_whatsapp || []).length) {
    quadros.push(h('figure', { class: 'how-channel', style: { margin: '0' } },
      h('h3', null, `No WhatsApp do ${ctx.term('representante')}`),
      h('p', { class: 'muted' }, 'Estoque, preço e prazo do ERP, só da carteira dele.'),
      whatsRepresentante(ctx)));
  }
  if (!quadros.length) return null;
  return secao('canais', 'Onde a equipe pergunta',
    h('p', { class: 'how__lead' }, 'O mesmo cérebro responde onde a pessoa já está: no navegador, no celular do chão de fábrica ou no WhatsApp.'),
    h('div', { class: 'how-channels' }, quadros));
}

// ---------- 4. Seus dados ----------
function seusDados(ctx) {
  const itens = [
    ['lock', `Roda na infraestrutura da ${ctx.empresaCurta || ctx.empresa} ou em nuvem aprovada pela TI dela.`],
    ['users', 'Cada pessoa acessa só as áreas e os documentos do seu perfil.'],
    ['file', 'Toda pergunta e cada fonte consultada ficam registradas para auditoria.'],
    ['shield-check', 'Os dados da empresa não treinam modelos de terceiros.'],
  ];
  return secao('dados', 'Seus dados',
    h('ul', { class: 'how-data' }, itens.map(([ic, t]) => h('li', null, icon(ic, { size: 18 }), h('span', null, t)))));
}

// ---------- 5. Isto é uma demonstração ----------
function demonstracao() {
  return secao('demonstracao', 'Isto é uma demonstração',
    h('div', { class: 'how-demo' },
      h('p', { class: 'how__lead' },
        'Empresa, pessoas e números foram inventados. Num projeto real, o cérebro é montado com os sistemas, documentos e permissões da sua empresa, começando por um diagnóstico.'),
      h('p', null, h('a', { href: '/diagnostico/', target: '_blank', rel: 'noopener' }, 'Conversar com a Torno ›'))));
}

export function render(el, ctx) {
  const page = h('div', { class: 'how' },
    h('header', { class: 'page-header' },
      h('div', { class: 'page-header__text' },
        h('h1', { class: 'page-title' }, 'Como funciona'),
        h('p', { class: 'page-subtitle' }, 'De onde vêm as respostas, quem vê o quê e onde a equipe pergunta.'))),
    ctx.isEnabled('integracoes') ? deOndeVem(ctx) : null,
    ctx.isEnabled('seguranca') ? quemVe(ctx) : null,
    ondePergunta(ctx),
    ctx.isEnabled('seguranca') ? seusDados(ctx) : null,
    demonstracao(),
    h('footer', { class: 'how-foot' },
      h('span', null, 'Torno · tornostudio.com'),
      ctx.themeToggle ? ctx.themeToggle() : null));
  el.replaceChildren(page);
  return () => {};
}
