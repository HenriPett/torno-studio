// Tela #admin: configuração da demo. Só é alcançada por quem pode editar (app.js bloqueia os demais).
import * as ui from './ui.js';
import { FEATURES, FEATURE_BY_ID, OFERTAS, applyDependencies, isFeatureOn } from './features.js';
import {
  SECTOR_IDS, DEMO_PROFILES, newProfileId, cloneConfig, sameConfig, normalizeConfig,
} from './config.js';
import { fmt } from './format.js';

const { h, icon } = ui;

const SECTOR_LABEL = {
  textil: 'Têxtil e confecção', alimentos: 'Alimentos e bebidas', plasticos: 'Plásticos e embalagens',
  maquinas: 'Máquinas e equipamentos', metalmecanica: 'Metalmecânica', moveis: 'Madeira e móveis',
  eletroeletronicos: 'Material elétrico e eletroeletrônicos', autopecas: 'Autopeças e implementos',
};

// empresa fictícia de cada setor (preenchida do pacote quando carregado; aqui o fallback)
const SECTOR_EMPRESA = {
  textil: 'Malharia Serra do Itajuí S.A.', alimentos: 'Lácteos Tribeira S.A.',
  plasticos: 'Morretiba Embalagens Plásticas S.A.', maquinas: 'Cambucá Equipamentos Industriais S.A.',
  metalmecanica: 'Metalúrgica Alto Piraí S.A.', moveis: 'Indústria Moveleira Trilha Alta S.A.',
  eletroeletronicos: 'Correntia Motores e Painéis S.A.', autopecas: 'Altaponte Componentes Automotivos S.A.',
};

export function render(root, ctx) {
  if (!ctx.store || !ctx.store.canEdit()) {
    root.appendChild(ui.card({
      titulo: 'Acesso restrito',
      corpo: h('div', { class: 'module-error' },
        icon('lock', { size: 22 }),
        h('p', null, 'Somente quem edita esta demo acessa o admin.'),
        h('p', { class: 'module-error__hint' }, 'Peça ao responsável pela demonstração para abrir esta tela.')),
      class: 'card--notice',
    }));
    return;
  }

  // rascunho editável; só vira oficial ao Salvar
  let saved = cloneConfig(normalizeConfig(ctx.config));
  let draft = cloneConfig(saved);
  let saving = false;
  let statusMsg = null; // {tone, text}
  let confirmDeleteId = null;

  const empresaDoSetor = (id) => (id === ctx.sector.id && ctx.data?.empresa?.nome) || SECTOR_EMPRESA[id] || SECTOR_LABEL[id];

  const host = h('div', { class: 'admin' });
  root.appendChild(host);

  function dirty() {
    return !sameConfig(saved, draft);
  }

  function countOn() {
    const m = { ...draft.modulos };
    applyDependencies(m);
    return FEATURES.filter((f) => isFeatureOn(m, f.id)).length;
  }

  function rerender() {
    host.replaceChildren(
      ui.pageHeader({
        titulo: 'Administração da demo',
        subtitulo: ctx.store.kind === 'local'
          ? 'Modo local: a configuração fica só neste navegador.'
          : 'A configuração vale para todos os aparelhos que abrem o link desta demo.',
        acoes: h('div', { class: 'admin__save' },
          statusMsg ? h('span', { class: `admin__status tone-${statusMsg.tone}` },
            statusMsg.tone === 'ok' ? icon('check', { size: 15 }) : statusMsg.tone === 'danger' ? icon('alert', { size: 15 }) : null,
            statusMsg.text) : null,
          ui.button('Descartar alterações', { variant: 'ghost', disabled: !dirty() || saving, onClick: discard }),
          ui.button(saving ? 'Salvando…' : 'Salvar', { variant: 'primary', icone: saving ? null : 'check', disabled: !dirty() || saving, onClick: save })),
      }),
      dirty() ? h('div', { class: 'admin__dirty', role: 'status' }, icon('info', { size: 14 }),
        'Há mudanças não salvas. Elas só valem na demo depois de Salvar.') : null,
      sectorCard(),
      empresaCard(),
      modulesCard(),
      profilesCard(),
    );
  }

  // (1) Setor ativo
  function sectorCard() {
    return ui.card({
      titulo: 'Setor ativo da demo',
      subtitulo: 'Define qual pacote de dados a demo mostra por padrão.',
      corpo: h('div', { class: 'admin-grid admin-grid--sectors' }, SECTOR_IDS.map((id) => {
        const on = draft.setor === id;
        return h('button', {
          type: 'button', class: ['sector-opt', on && 'is-active'], 'aria-pressed': String(on),
          onClick: () => {
            if (draft.setor === id) return;
            draft.setor = id;
            rerender();
          },
        },
        h('span', { class: 'sector-opt__name' }, SECTOR_LABEL[id]),
        h('span', { class: 'sector-opt__company' }, empresaDoSetor(id)),
        on ? icon('check', { size: 16, class: 'sector-opt__check' }) : null);
      })),
    });
  }

  // (2) Nome exibido
  function empresaCard() {
    const placeholder = empresaDoSetor(draft.setor);
    return ui.card({
      titulo: 'Nome da empresa exibido',
      subtitulo: 'Deixe em branco para usar o nome fictício do pacote do setor.',
      corpo: h('div', { class: 'admin-field' },
        h('label', { class: 'control' },
          h('span', { class: 'control__label' }, 'Nome exibido'),
          h('input', {
            type: 'text', class: 'text-input', value: draft.empresa_nome, placeholder,
            maxlength: '80',
            onInput: (e) => {
              draft.empresa_nome = e.target.value;
              updateSaveButtons();
            },
          })),
        h('p', { class: 'admin-hint' }, 'Aparece na barra lateral e no topo em vez de ', h('b', null, placeholder), '.')),
    });
  }

  // (3) Módulos
  function modulesCard() {
    const m = { ...draft.modulos };
    applyDependencies(m);
    return ui.card({
      titulo: 'Módulos',
      subtitulo: `${countOn()} de ${FEATURES.length} ligados. Desligar um módulo também desliga os que dependem dele.`,
      corpo: h('div', { class: 'admin-modules' }, OFERTAS.map((of) => {
        const items = FEATURES.filter((f) => f.oferta === of.id);
        if (!items.length) return null;
        return h('div', { class: 'admin-modules__group' },
          h('p', { class: 'admin-modules__group-label' }, of.nome),
          items.map((f) => moduleRow(f, m)));
      })),
    });
  }

  function moduleRow(f, effective) {
    const locked = !!f.sempreLigado;
    const on = isFeatureOn(effective, f.id);
    const deps = f.depende.map((d) => FEATURE_BY_ID[d]?.nome).filter(Boolean);
    const forcedOff = !locked && on === false && draft.modulos[f.id] !== false; // desligado por dependência
    const sw = h('button', {
      type: 'button', class: ['switch', on && 'is-on', locked && 'is-locked'], role: 'switch',
      'aria-checked': String(on), 'aria-label': `${f.nome}: ${on ? 'ligado' : 'desligado'}`,
      disabled: locked, 'data-module': f.id,
      onClick: () => toggleModule(f),
    }, h('span', { class: 'switch__thumb' }));
    return h('div', { class: ['admin-module', !on && 'is-off'] },
      h('span', { class: 'admin-module__icon' }, icon(f.icone, { size: 18 })),
      h('div', { class: 'admin-module__text' },
        h('div', { class: 'admin-module__name' }, f.nome,
          locked ? ui.badge('sempre ligado', 'neutral') : null,
          forcedOff ? ui.badge('depende de módulo desligado', 'warn') : null),
        h('p', { class: 'admin-module__desc' }, f.descricao),
        deps.length ? h('p', { class: 'admin-module__dep' }, 'Depende de: ', deps.join(', ')) : null),
      sw);
  }

  function toggleModule(f) {
    if (f.sempreLigado) return;
    const turningOff = draft.modulos[f.id] !== false;
    if (turningOff) {
      draft.modulos[f.id] = false;
      // cascata completa
      const before = { ...draft.modulos };
      applyDependencies(draft.modulos);
      const cascaded = FEATURES.filter((x) => before[x.id] !== false && draft.modulos[x.id] === false && x.id !== f.id);
      if (cascaded.length) {
        ui.toast(`“${f.nome}” desligado. Também desliguei: ${cascaded.map((x) => x.nome).join(', ')}.`, { tone: 'neutral' });
      }
    } else {
      draft.modulos[f.id] = true;
      // ligar de volta não liga dependências automaticamente; avisa se faltar
      const faltando = f.depende.filter((d) => draft.modulos[d] === false).map((d) => FEATURE_BY_ID[d]?.nome);
      if (faltando.length) {
        ui.toast(`Para usar “${f.nome}” ligue antes: ${faltando.join(', ')}.`, { tone: 'neutral' });
      }
    }
    statusMsg = null;
    rerender();
  }

  // (4) Perfis de demo
  function profilesCard() {
    const temPerfis = draft.perfis.length > 0;
    const sugestoes = !temPerfis ? DEMO_PROFILES : [];
    let nomeNovo = '';
    const nomeInput = h('input', {
      type: 'text', class: 'text-input', placeholder: 'Nome do perfil (ex.: Têxtil completo)', maxlength: '80',
      onInput: (e) => { nomeNovo = e.target.value; },
    });

    return ui.card({
      titulo: 'Perfis de demo',
      subtitulo: 'Combinações de setor, nome e módulos salvas para aplicar de uma vez numa reunião.',
      corpo: h('div', { class: 'admin-profiles' },
        h('div', { class: 'admin-profiles__save' },
          nomeInput,
          ui.button('Salvar configuração atual', {
            variant: 'secondary', icone: 'plus',
            onClick: () => {
              const nome = (nomeNovo || '').trim() || `Perfil ${draft.perfis.length + 1}`;
              draft.perfis = [...draft.perfis, {
                id: newProfileId(), nome: nome.slice(0, 80), setor: draft.setor,
                empresa_nome: draft.empresa_nome, modulos: { ...draft.modulos },
              }];
              statusMsg = null;
              rerender();
            },
          })),
        temPerfis
          ? h('ul', { class: 'profile-list' }, draft.perfis.map((p) => profileRow(p)))
          : h('div', { class: 'admin-profiles__empty' },
            h('p', { class: 'admin-hint' }, 'Nenhum perfil salvo ainda. Sugestões rápidas:'),
            h('ul', { class: 'profile-list profile-list--sug' }, sugestoes.map((p) => suggestionRow(p))))),
    });
  }

  function profileSummary(p) {
    const m = { ...p.modulos };
    applyDependencies(m);
    const n = FEATURES.filter((f) => isFeatureOn(m, f.id)).length;
    return `${SECTOR_LABEL[p.setor]} · ${n} módulos${p.empresa_nome ? ` · ${p.empresa_nome}` : ''}`;
  }

  function profileRow(p) {
    const confirming = confirmDeleteId === p.id;
    return h('li', { class: 'profile-row' },
      h('div', { class: 'profile-row__text' },
        h('span', { class: 'profile-row__name' }, p.nome),
        h('span', { class: 'profile-row__sum' }, profileSummary(p))),
      h('div', { class: 'profile-row__actions' },
        ui.button('Aplicar', { variant: 'secondary', size: 'sm', onClick: () => applyProfile(p) }),
        confirming
          ? h('span', { class: 'confirm-inline' },
            h('span', { class: 'confirm-inline__q' }, 'Excluir?'),
            ui.button('Sim', { variant: 'danger', size: 'sm', onClick: () => deleteProfile(p.id) }),
            ui.button('Não', { variant: 'ghost', size: 'sm', onClick: () => { confirmDeleteId = null; rerender(); } }))
          : ui.button('Excluir', {
            variant: 'ghost', size: 'sm', icone: 'trash',
            onClick: () => { confirmDeleteId = p.id; rerender(); },
          })));
  }

  function suggestionRow(p) {
    return h('li', { class: 'profile-row profile-row--sug' },
      h('div', { class: 'profile-row__text' },
        h('span', { class: 'profile-row__name' }, p.nome),
        h('span', { class: 'profile-row__sum' }, profileSummary(p))),
      ui.button('Usar', { variant: 'secondary', size: 'sm', onClick: () => applyProfile(p) }));
  }

  function applyProfile(p) {
    draft.setor = SECTOR_IDS.includes(p.setor) ? p.setor : draft.setor;
    draft.empresa_nome = p.empresa_nome || '';
    draft.modulos = { ...p.modulos };
    applyDependencies(draft.modulos);
    confirmDeleteId = null;
    statusMsg = { tone: 'neutral', text: `Perfil “${p.nome}” aplicado. Salve para valer na demo.` };
    ui.toast(`Perfil “${p.nome}” carregado. Clique em Salvar para aplicar.`, { tone: 'neutral' });
    rerender();
  }

  function deleteProfile(id) {
    draft.perfis = draft.perfis.filter((x) => x.id !== id);
    confirmDeleteId = null;
    rerender();
  }

  function discard() {
    draft = cloneConfig(saved);
    confirmDeleteId = null;
    statusMsg = null;
    rerender();
  }

  async function save() {
    if (!dirty() || saving) return;
    saving = true;
    statusMsg = null;
    rerender();
    try {
      const stored = await ctx.store.save(draft);
      saved = cloneConfig(stored);
      draft = cloneConfig(stored);
      saving = false;
      statusMsg = { tone: 'ok', text: `Salvo às ${fmt.time(stored.atualizado_em) || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` };
      rerender();
      ctx.applyConfig(stored); // reflete em toda a demo (menu, setor)
    } catch (err) {
      saving = false;
      statusMsg = { tone: 'danger', text: err.message || 'Não foi possível salvar. Tente de novo.' };
      rerender();
    }
  }

  // atualização leve dos botões quando só o campo de texto muda (sem rebuildar tudo e perder o foco)
  function updateSaveButtons() {
    const box = host.querySelector('.admin__save');
    if (!box) return;
    const btns = box.querySelectorAll('button');
    const d = dirty();
    if (btns[0]) btns[0].disabled = !d || saving; // descartar
    if (btns[1]) btns[1].disabled = !d || saving; // salvar
    const dirtyBar = host.querySelector('.admin__dirty');
    if (d && !dirtyBar) rerender();
    if (!d && dirtyBar) rerender();
  }

  rerender();
}
