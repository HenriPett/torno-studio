// Visão geral (Gestão): saudação, KPIs com explicação e caminho até o dado, pendências do dia e
// assistente da diretoria. Tudo vem de ctx.data; rótulos usam o vocabulário do setor.
import { h, icon, pageHeader, card, kpiTile, sparkline, badge, statusBadge, refChip, emptyState } from '../ui.js';
import { fmt } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

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

function weekday(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  return DIAS[new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay()];
}

function kpiValue(k) {
  const u = k.unidade || '';
  if (u === '%') return fmt.pct(k.valor);
  if (u === 'R$') return fmt.money(k.valor, { compact: true });
  return `${fmt.num(k.valor)}${u ? ` ${u}` : ''}`;
}

function kpiMeta(k) {
  const u = k.unidade || '';
  if (u === '%') return fmt.pct(k.meta);
  if (u === 'R$') return fmt.money(k.meta, { compact: true });
  return `${fmt.num(k.meta)}${u ? ` ${u}` : ''}`;
}

function onTarget(k) {
  if (typeof k.valor !== 'number' || typeof k.meta !== 'number') return null;
  return k.direcao === 'menor_melhor' ? k.valor <= k.meta : k.valor >= k.meta;
}

// Distância relativa da meta (positiva = pior que a meta).
function gap(k) {
  if (typeof k.valor !== 'number' || typeof k.meta !== 'number' || !k.meta) return 0;
  const d = (k.valor - k.meta) / Math.abs(k.meta);
  return k.direcao === 'menor_melhor' ? d : -d;
}

function chips(refs, ctx) {
  const ok = (refs || []).filter((r) => {
    try { return ctx.resolveRef(r); } catch { return false; }
  });
  if (!ok.length) return null;
  return h('div', { class: 'vg-chips' }, ok.map((r) => refChip(r, ctx)));
}

function explainPanel(k, ctx) {
  if (!k) return emptyState('Selecione um indicador para ver a explicação.');
  const alvo = onTarget(k);
  const tend = Array.isArray(k.tendencia) ? k.tendencia.filter((v) => typeof v === 'number') : [];
  const prev = tend.length > 1 ? tend[tend.length - 2] : null;
  const delta = prev != null && typeof k.valor === 'number' ? k.valor - prev : null;
  const caminho = Array.isArray(k.caminho) ? k.caminho : [];
  return h('div', { class: 'vg-explain' },
    h('div', { class: 'vg-explain-head' },
      h('div', { class: 'vg-explain-title' },
        h('span', { class: 'vg-eyebrow' }, ctx.areaName(k.area) || ''),
        h('h3', null, k.nome),
      ),
      alvo == null ? null : badge(alvo ? 'Na meta' : 'Fora da meta', alvo ? 'ok' : 'warn'),
    ),
    h('div', { class: 'vg-explain-figs' },
      h('div', { class: 'vg-fig' }, h('span', { class: 'vg-fig-label' }, 'Atual'), h('strong', { class: 'vg-num' }, kpiValue(k))),
      h('div', { class: 'vg-fig' }, h('span', { class: 'vg-fig-label' }, 'Meta'), h('strong', { class: 'vg-num' }, kpiMeta(k))),
      delta == null ? null : h('div', { class: 'vg-fig' },
        h('span', { class: 'vg-fig-label' }, 'Vs. mês anterior'),
        h('strong', { class: 'vg-num' }, `${delta > 0 ? '+' : delta < 0 ? '−' : ''}${fmt.num(Math.abs(Math.round(delta * 10) / 10))}${k.unidade === '%' ? ' p.p.' : ''}`),
      ),
      tend.length > 1 ? h('div', { class: 'vg-fig vg-fig-spark', 'aria-hidden': 'true' }, sparkline(tend, { width: 160, height: 40 })) : null,
    ),
    k.explicacao ? h('p', { class: 'vg-explain-text' }, k.explicacao) : null,
    caminho.length ? h('div', { class: 'vg-block' },
      h('h4', { class: 'vg-subtitle' }, 'Caminho até o dado'),
      h('ol', { class: 'vg-trail', 'aria-label': 'Caminho até o dado' },
        caminho.map((passo, i) => h('li', { class: 'vg-trail-step' },
          h('span', { class: 'vg-trail-text' }, passo),
          i < caminho.length - 1 ? h('span', { class: 'vg-trail-sep', 'aria-hidden': 'true' }, icon('chevron-right')) : null,
        )),
      ),
    ) : null,
    (k.fontes || []).length ? h('div', { class: 'vg-block' },
      h('h4', { class: 'vg-subtitle' }, 'Fontes'),
      chips(k.fontes, ctx) || h('p', { class: 'vg-muted' }, 'As fontes deste indicador estão em módulos desligados.'),
    ) : null,
  );
}

function attentionItems(ctx) {
  const d = ctx.data;
  const groups = [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));

  if (ctx.isEnabled('producao')) {
    const late = (d.ordens || []).filter((o) => o.status === 'atrasada');
    groups.push({
      id: 'ops', titulo: `${ctx.term('ordens')} atrasadas`, icone: 'factory', modulo: 'producao',
      itens: late.map((o) => ({
        ref: `op:${o.id}`, titulo: `${o.id} · ${prodBy[o.sku]?.nome || o.sku}`,
        detalhe: o.motivo_atraso || `Prazo ${fmt.date(o.prazo)} (${fmt.rel(o.prazo, ctx.today)})`,
        meta: `${o.progresso ?? 0}% concluído`, status: o.status,
      })),
    });
  }
  if (ctx.isEnabled('qualidade')) {
    const ncs = (d.nao_conformidades || []).filter((n) => n.status !== 'encerrada' && n.severidade === 'alta');
    groups.push({
      id: 'ncs', titulo: 'Não conformidades abertas de severidade alta', icone: 'shield-check', modulo: 'qualidade',
      itens: ncs.map((n) => ({
        ref: `nc:${n.id}`, titulo: `${n.id} · ${prodBy[n.sku]?.nome || n.sku || ''}`,
        detalhe: n.descricao, meta: `${n.origem === 'cliente' ? 'Reclamação de cliente' : n.origem === 'fornecedor' ? 'Fornecedor' : 'Interna'} · ${n.responsavel || ''}`,
        status: n.status,
      })),
    });
  }
  if (ctx.isEnabled('manutencao')) {
    const rank = { parada: 0, alerta: 1 };
    const ms = (d.maquinas || []).filter((m) => m.status === 'alerta' || m.status === 'parada')
      .sort((a, b) => rank[a.status] - rank[b.status]);
    groups.push({
      id: 'maq', titulo: `${cap(ctx.term('maquinas'))} em alerta ou paradas`, icone: 'wrench', modulo: 'manutencao',
      itens: ms.map((m) => {
        const os = (d.manutencao || []).find((o) => o.maquina === m.id && o.status !== 'concluida');
        return {
          ref: `maq:${m.id}`, titulo: `${m.id} · ${m.nome}`,
          detalhe: os ? `${os.id}: ${os.descricao}` : `${lineBy[m.linha]?.nome || m.linha} · sem OS aberta`,
          meta: `Próxima preventiva ${fmt.date(m.proxima_preventiva)}`, status: m.status,
        };
      }),
    });
  }
  if (ctx.isEnabled('comercial')) {
    const cliBy = Object.fromEntries((d.clientes || []).map((c) => [c.id, c]));
    const ps = (d.pedidos || []).filter((p) => p.status === 'atrasado');
    groups.push({
      id: 'ped', titulo: 'Pedidos atrasados', icone: 'truck', modulo: 'comercial',
      itens: ps.map((p) => ({
        ref: `pedido:${p.id}`, titulo: `${p.id} · ${cliBy[p.cliente]?.nome || p.cliente}`,
        detalhe: p.observacao || `Previsão de entrega ${fmt.date(p.previsao_entrega)}${p.ordem ? ` · ${p.ordem}` : ''}`,
        meta: fmt.rel(p.previsao_entrega, ctx.today), status: p.status,
      })),
    });
  }
  return groups;
}

function cap(s) {
  s = String(s || '');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function attentionPanel(ctx) {
  const groups = attentionItems(ctx);
  const total = groups.reduce((s, g) => s + g.itens.length, 0);
  if (!groups.length) return emptyState('Nenhum módulo operacional ligado para gerar pendências.');
  return h('div', { class: 'vg-attn' },
    h('ul', { class: 'vg-attn-summary', 'aria-label': 'Resumo das pendências' },
      groups.map((g) => h('li', { class: `vg-attn-count${g.itens.length ? ' has-items' : ''}` },
        h('strong', { class: 'vg-num' }, String(g.itens.length)),
        h('span', null, g.titulo),
      )),
    ),
    total === 0 ? emptyState('Nada pendente hoje.') : null,
    groups.filter((g) => g.itens.length).map((g) => h('section', { class: 'vg-attn-group', 'aria-label': g.titulo },
      h('div', { class: 'vg-attn-group-head' },
        h('span', { class: 'vg-attn-icon', 'aria-hidden': 'true' }, icon(g.icone)),
        h('h4', null, g.titulo),
        ctx.isEnabled(g.modulo) ? h('button', {
          type: 'button', class: 'vg-link', onclick: () => ctx.navigate(g.modulo),
        }, 'Abrir módulo', icon('chevron-right')) : null,
      ),
      h('ul', { class: 'vg-attn-list' },
        g.itens.map((it) => h('li', null,
          h('button', { type: 'button', class: 'vg-attn-item', onclick: () => ctx.openRef(it.ref) },
            h('span', { class: 'vg-attn-main' },
              h('span', { class: 'vg-attn-title' }, it.titulo),
              it.detalhe ? h('span', { class: 'vg-attn-detail' }, it.detalhe) : null,
            ),
            h('span', { class: 'vg-attn-side' },
              statusBadge(it.status),
              it.meta ? h('span', { class: 'vg-attn-meta' }, it.meta) : null,
            ),
          ),
        )),
      ),
    )),
  );
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data || {};
  const kpis = d.kpis || [];
  let selected = kpis.length ? [...kpis].sort((a, b) => gap(b) - gap(a))[0].id : null;

  const explainBody = h('div', { class: 'vg-explain-wrap', 'aria-live': 'polite' });
  const tileWraps = [];

  function select(id) {
    selected = id;
    tileWraps.forEach(({ wrap, kid }) => {
      wrap.classList.toggle('is-selected', kid === id);
      const tile = wrap.querySelector('.kpi-tile');
      if (tile) tile.setAttribute('aria-pressed', String(kid === id));
    });
    explainBody.replaceChildren(explainPanel(kpis.find((k) => k.id === id), ctx));
  }

  const strip = h('div', { class: 'vg-kpis', role: 'list', 'aria-label': 'Indicadores' },
    kpis.map((k) => {
      const wrap = h('div', { class: 'vg-kpi', role: 'listitem' },
        kpiTile({ kpi: k, onClick: () => select(k.id) }));
      tileWraps.push({ wrap, kid: k.id });
      return wrap;
    }),
  );

  const dia = weekday(ctx.today);
  el.replaceChildren(
    h('div', { class: 'vg-page' },
      pageHeader({
        titulo: 'Bom dia',
        subtitulo: `${ctx.empresa} · ${dia ? `${dia}, ` : ''}${fmt.dateLong(ctx.today)}`,
      }),
      kpis.length ? strip : emptyState('Sem indicadores neste pacote de dados.'),
      h('div', { class: 'vg-grid' },
        h('div', { class: 'vg-col' },
          card({ titulo: 'Indicador explicado', corpo: explainBody, class: 'vg-card' }),
          card({ titulo: 'Precisa de atenção hoje', corpo: attentionPanel(ctx), class: 'vg-card' }),
        ),
        h('div', { class: 'vg-col' },
          card({
            titulo: 'Pergunte à operação',
            corpo: chatPanel({ ctx, modulo: 'visao-geral', titulo: 'Assistente da diretoria' }),
            class: 'vg-card vg-chat',
          }),
        ),
      ),
    ),
  );
  if (selected) select(selected);
}
