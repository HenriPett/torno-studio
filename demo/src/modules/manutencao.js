// Manutenção: grade de máquinas com status, OS abertas e histórico, detalhe do equipamento e a
// "visão celular do técnico" (phoneFrame com a OS mais urgente, procedimento e chat variante phone).
import {
  h, icon, pageHeader, card, table, badge, statusBadge, refChip, tabs, emptyState,
  toolbar, select, searchInput, phoneFrame,
} from '../ui.js';
import { fmt } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const MAQ_STATUS = {
  operando: { label: 'Operando', tone: 'ok' },
  alerta: { label: 'Em alerta', tone: 'warn' },
  parada: { label: 'Parada', tone: 'danger' },
  manutencao: { label: 'Em manutenção', tone: 'accent' },
};
const OS_TIPO = { corretiva: 'Corretiva', preventiva: 'Preventiva', preditiva: 'Preditiva' };

function ensureCss() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[data-mod-css="mod-a"]')) return;
  const href = new URL('../../css/mod-a.css', import.meta.url).href;
  if ([...document.querySelectorAll('link[rel="stylesheet"]')].some((l) => l.href === href)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.modCss = 'mod-a';
  document.head.appendChild(link);
}

function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

function chips(refs, ctx, cls = 'mnt-chips') {
  const ok = (refs || []).filter((r) => { try { return ctx.resolveRef(r); } catch { return false; } });
  if (!ok.length) return null;
  return h('div', { class: cls }, ok.map((r) => refChip(r, ctx)));
}

function stat(label, value, tone) {
  return h('div', { class: `mnt-stat${tone ? ` is-${tone}` : ''}` },
    h('strong', { class: 'mnt-stat-value' }, value), h('span', { class: 'mnt-stat-label' }, label));
}

function osRank(os) {
  const st = { aberta: 0, em_execucao: 1, concluida: 2 };
  const tp = { corretiva: 0, preditiva: 1, preventiva: 2 };
  return (st[os.status] ?? 3) * 10 + (tp[os.tipo] ?? 3);
}

function maqCard(m, ctx, onSelect, selected) {
  const info = MAQ_STATUS[m.status] || { label: m.status, tone: 'neutral' };
  const linha = (ctx.data.linhas || []).find((l) => l.id === m.linha);
  const preventivaDias = fmt.daysFromToday(m.proxima_preventiva, ctx.today);
  return h('button', {
    type: 'button', class: `mnt-maq is-${info.tone}${m.id === selected ? ' is-selected' : ''}`,
    'aria-pressed': String(m.id === selected), onclick: () => onSelect(m.id),
  },
    h('span', { class: 'mnt-maq-head' },
      h('span', { class: 'mnt-maq-id' }, m.id),
      badge(info.label, info.tone),
    ),
    h('span', { class: 'mnt-maq-name' }, m.nome),
    h('span', { class: 'mnt-maq-sub' }, linha?.nome || m.linha),
    h('dl', { class: 'mnt-maq-figs' },
      h('div', null, h('dt', null, 'Horímetro'), h('dd', { class: 'mnt-num' }, `${fmt.num(m.horimetro)} h`)),
      h('div', null, h('dt', null, 'MTBF'), h('dd', { class: 'mnt-num' }, `${fmt.num(m.mtbf_h)} h`)),
      h('div', null, h('dt', null, 'Preventiva'),
        h('dd', { class: `mnt-num${preventivaDias != null && preventivaDias <= 3 ? ' is-soon' : ''}` }, fmt.rel(m.proxima_preventiva, ctx.today))),
    ),
  );
}

function osDetail(os, ctx, { showMaquina } = {}) {
  const maq = (ctx.data.maquinas || []).find((x) => x.id === os.maquina);
  return h('article', { class: `mnt-os is-${os.status}` },
    h('header', { class: 'mnt-os-head' },
      h('div', null,
        h('span', { class: 'mnt-os-id' }, os.id),
        badge(OS_TIPO[os.tipo] || os.tipo, os.tipo === 'corretiva' ? 'danger' : os.tipo === 'preditiva' ? 'warn' : 'neutral'),
        statusBadge(os.status),
      ),
      h('span', { class: 'mnt-os-date mnt-num' }, fmt.date(os.data)),
    ),
    showMaquina && maq ? h('p', { class: 'mnt-muted' }, `${maq.id} · ${maq.nome}`) : null,
    h('p', { class: 'mnt-os-desc' }, os.descricao),
    h('dl', { class: 'mnt-os-figs' },
      h('div', null, h('dt', null, 'Técnico'), h('dd', null, os.tecnico || '—')),
      os.duracao_h != null ? h('div', null, h('dt', null, 'Duração'), h('dd', { class: 'mnt-num' }, `${fmt.num(os.duracao_h)} h`)) : null,
      (os.pecas || []).length ? h('div', null, h('dt', null, 'Peças'), h('dd', null, os.pecas.join(', '))) : null,
    ),
    chips([`os:${os.id}`, `maq:${os.maquina}`, os.procedimento ? `doc:${os.procedimento}` : null], ctx),
  );
}

function equipDetail(m, ctx) {
  if (!m) return emptyState('Selecione uma máquina na grade para ver o detalhe.');
  const d = ctx.data;
  const info = MAQ_STATUS[m.status] || { label: m.status, tone: 'neutral' };
  const linha = (d.linhas || []).find((l) => l.id === m.linha);
  const oss = (d.manutencao || []).filter((o) => o.maquina === m.id)
    .sort((a, b) => osRank(a) - osRank(b) || String(b.data).localeCompare(String(a.data)));
  const manual = m.manual ? (d.documentos || []).find((x) => x.id === m.manual) : null;
  const procs = [...new Set(oss.map((o) => o.procedimento).filter(Boolean))];
  const saberes = ctx.isEnabled('operadores')
    ? (d.saberes || []).filter((s) => s.maquina === m.id) : [];

  return h('div', { class: 'mnt-detail' },
    h('div', { class: 'mnt-detail-head' },
      h('div', null,
        h('span', { class: 'mnt-eyebrow' }, m.id),
        h('h3', null, m.nome),
        h('p', { class: 'mnt-muted' }, `${linha?.nome || m.linha} · ${m.tipo || ''} · ${m.fabricante || ''}${m.ano ? ` (${m.ano})` : ''}`),
      ),
      badge(info.label, info.tone),
    ),
    h('dl', { class: 'mnt-dl' },
      h('div', null, h('dt', null, 'Horímetro'), h('dd', { class: 'mnt-num' }, `${fmt.num(m.horimetro)} h`)),
      h('div', null, h('dt', null, 'MTBF'), h('dd', { class: 'mnt-num' }, `${fmt.num(m.mtbf_h)} h`)),
      h('div', null, h('dt', null, 'Próxima preventiva'), h('dd', { class: 'mnt-num' }, `${fmt.date(m.proxima_preventiva)} · ${fmt.rel(m.proxima_preventiva, ctx.today)}`)),
    ),
    h('section', { class: 'mnt-section' },
      h('h4', null, 'Ordens de serviço'),
      oss.length ? h('div', { class: 'mnt-os-list' }, oss.map((o) => osDetail(o, ctx))) : h('p', { class: 'mnt-muted' }, 'Sem OS para este equipamento.'),
    ),
    (manual || procs.length) ? h('section', { class: 'mnt-section' },
      h('h4', null, 'Documentos'),
      chips([m.manual ? `doc:${m.manual}` : null, ...procs.map((p) => `doc:${p}`)].filter(Boolean), ctx),
    ) : null,
    saberes.length ? h('section', { class: 'mnt-section' },
      h('h4', null, 'Saberes de operador'),
      h('ul', { class: 'mnt-saberes' }, saberes.map((s) => h('li', null,
        h('span', { class: 'mnt-saber-title' }, s.titulo),
        h('span', { class: 'mnt-muted' }, `${s.autor}, ${s.funcao} · ${s.tempo_casa_anos} anos`),
      ))),
      chips(saberes.map((s) => `saber:${s.id}`), ctx),
    ) : null,
    h('div', { class: 'mnt-detail-actions' },
      h('button', { type: 'button', class: 'btn btn-secondary mnt-btn', onclick: () => ctx.openRef(`maq:${m.id}`) },
        icon('external'), 'Abrir equipamento'),
    ),
  );
}

// Celular do técnico: OS mais urgente + passo a passo do procedimento (trechos do documento).
function technicianPhone(ctx) {
  const d = ctx.data;
  const abertas = (d.manutencao || []).filter((o) => o.status !== 'concluida')
    .sort((a, b) => osRank(a) - osRank(b) || String(a.data).localeCompare(String(b.data)));
  const os = abertas[0];
  if (!os) {
    return phoneFrame(h('div', { class: 'mnt-phone-empty' }, emptyState('Nenhuma OS aberta no momento.')));
  }
  const maq = (d.maquinas || []).find((x) => x.id === os.maquina);
  const doc = os.procedimento ? (d.documentos || []).find((x) => x.id === os.procedimento) : null;
  const trechos = doc?.trechos || [];
  const info = maq ? (MAQ_STATUS[maq.status] || { label: maq.status, tone: 'neutral' }) : null;

  return phoneFrame(h('div', { class: 'mnt-phone' },
    h('div', { class: 'mnt-phone-top' },
      h('span', { class: 'mnt-phone-app' }, icon('wrench'), 'Minhas OS'),
      info ? badge(info.label, info.tone) : null,
    ),
    h('div', { class: 'mnt-phone-card' },
      h('div', { class: 'mnt-phone-os-head' },
        h('span', { class: 'mnt-os-id' }, os.id),
        badge(OS_TIPO[os.tipo] || os.tipo, os.tipo === 'corretiva' ? 'danger' : 'warn'),
      ),
      maq ? h('p', { class: 'mnt-phone-maq' }, `${maq.id} · ${maq.nome}`) : null,
      h('p', { class: 'mnt-phone-desc' }, os.descricao),
      (os.pecas || []).length ? h('p', { class: 'mnt-phone-pecas' }, h('strong', null, 'Peças: '), os.pecas.join(', ')) : null,
    ),
    doc ? h('div', { class: 'mnt-phone-proc' },
      h('h5', null, icon('file'), doc.titulo),
      trechos.length ? h('ol', { class: 'mnt-proc-steps' }, trechos.map((t) => h('li', null,
        t.secao ? h('span', { class: 'mnt-proc-sec' }, t.secao) : null,
        h('span', { class: 'mnt-proc-text' }, t.texto),
      ))) : h('p', { class: 'mnt-muted' }, 'Procedimento sem trechos cadastrados.'),
      chips([`doc:${doc.id}`], ctx, 'mnt-chips mnt-chips-phone'),
    ) : null,
    h('div', { class: 'mnt-phone-chat' },
      chatPanel({ ctx, modulo: 'manutencao', titulo: 'Assistente de campo', variante: 'phone' }),
    ),
  ));
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data || {};
  const maquinas = d.maquinas || [];
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));

  const operando = maquinas.filter((m) => m.status === 'operando').length;
  const alerta = maquinas.filter((m) => m.status === 'alerta').length;
  const paradas = maquinas.filter((m) => m.status === 'parada').length;
  const osAbertas = (d.manutencao || []).filter((o) => o.status !== 'concluida').length;

  let sel = (maquinas.find((m) => m.status === 'parada') || maquinas.find((m) => m.status === 'alerta') || maquinas[0] || {}).id || null;
  let fLinha = '', busca = '';

  const gridBox = h('div', { class: 'mnt-grid-box' });
  const detailBox = h('div', { class: 'mnt-detail-box', 'aria-live': 'polite' });

  function drawDetail() {
    detailBox.replaceChildren(equipDetail(maquinas.find((m) => m.id === sel), ctx));
  }
  function selectMaq(id) { sel = id; drawDetail(); drawGrid(); }

  function drawGrid() {
    const { normalize } = fmt;
    const q = normalize(busca);
    const rows = maquinas.filter((m) => {
      if (fLinha && m.linha !== fLinha) return false;
      if (!q) return true;
      return normalize(`${m.id} ${m.nome} ${lineBy[m.linha]?.nome || ''} ${m.tipo || ''}`).includes(q);
    }).sort((a, b) => {
      const rank = { parada: 0, alerta: 1, manutencao: 2, operando: 3 };
      return (rank[a.status] - rank[b.status]) || String(a.id).localeCompare(String(b.id));
    });
    gridBox.replaceChildren(rows.length
      ? h('div', { class: 'mnt-maqs', role: 'list', 'aria-label': cap(ctx.term('maquinas')) },
          rows.map((m) => h('div', { role: 'listitem' }, maqCard(m, ctx, selectMaq, sel))))
      : emptyState(`Nenhuma ${ctx.term('maquina')} com esses filtros.`));
  }

  const linhasComMaq = [...new Set(maquinas.map((m) => m.linha))];
  const gridView = () => h('div', { class: 'mnt-grid-wrap' },
    toolbar(
      select({
        id: 'mnt-linha', label: cap(ctx.term('linha')), value: fLinha,
        options: [{ value: '', label: `Todas as ${ctx.term('linhas')}` }, ...linhasComMaq.map((l) => ({ value: l, label: lineBy[l]?.nome || l }))],
        onChange: (v) => { fLinha = v?.target ? v.target.value : v; drawGrid(); },
      }),
      searchInput({ id: 'mnt-busca', placeholder: `Buscar ${ctx.term('maquina')} ou ${ctx.term('linha')}`,
        onInput: (v) => { busca = v?.target ? v.target.value : v; drawGrid(); } }),
    ),
    gridBox,
  );

  const historyView = () => {
    const oss = [...(d.manutencao || [])].sort((a, b) => osRank(a) - osRank(b) || String(b.data).localeCompare(String(a.data)));
    return oss.length
      ? h('div', { class: 'mnt-os-list' }, oss.map((o) => osDetail(o, ctx, { showMaquina: true })))
      : emptyState('Sem ordens de serviço registradas.');
  };

  drawGrid();
  drawDetail();

  el.replaceChildren(h('div', { class: 'mnt-page' },
    pageHeader({
      titulo: ctx.areaName('manutencao') || 'Manutenção',
      subtitulo: `${cap(ctx.term('maquinas'))}, OS e procedimentos · ${ctx.empresa} · ${fmt.date(ctx.today)}`,
    }),
    h('div', { class: 'mnt-stats', role: 'group', 'aria-label': 'Resumo da manutenção' },
      stat('Operando', fmt.num(operando), 'ok'),
      stat('Em alerta', fmt.num(alerta), alerta ? 'warn' : null),
      stat('Paradas', fmt.num(paradas), paradas ? 'danger' : 'ok'),
      stat('OS abertas', fmt.num(osAbertas)),
    ),
    h('div', { class: 'mnt-layout' },
      h('div', { class: 'mnt-main' },
        card({
          titulo: 'Equipamentos e OS', class: 'mnt-card',
          corpo: tabs([
            { id: 'grade', label: cap(ctx.term('maquinas')), render: gridView },
            { id: 'historico', label: 'Histórico de OS', render: historyView },
          ], { initial: 'grade' }),
        }),
        card({ titulo: 'Detalhe do equipamento', corpo: detailBox, class: 'mnt-card' }),
      ),
      h('div', { class: 'mnt-aside' },
        card({ titulo: 'Celular do técnico', corpo: technicianPhone(ctx), class: 'mnt-card mnt-phone-card-wrap' }),
      ),
    ),
  ));
}
