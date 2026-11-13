// Ponte para o motor local ÚNICO do projeto: demo/web/src/ai/local-engine.js (mantido pelo front).
// Contrato usado aqui: responder(ctx, pergunta, {modulo, perfil}) → {texto, fontes, modo};
// buscar(ctx, termo, {perfil}); e os utilitários exportados (tokens, norm, corta, f, ligado, refOk,
// filtraRefs, perfilAreas, statusLabel). O servidor não edita nem copia esse arquivo.
//
// O aprendizado da demo: enquanto o motor do front não ler ctx.aprendizado, o servidor busca nele aqui
// (mesma fórmula de pontuação do motor) e junta com a busca do motor; se o motor passar a devolver
// refs `aprendizado:<id>`, a junção deduplica por ref. Em empate, o aprendizado vem primeiro.

import * as motor from '../web/src/ai/local-engine.js';

export const { responder, buscar, tokens, norm, corta, f, ligado, refOk, filtraRefs, perfilAreas, statusLabel } = motor;

function casa(t, p) {
  if (t === p) return true;
  if (/\d/.test(t) || /\d/.test(p)) return false;
  if (t.length >= 4 && p.startsWith(t)) return true;
  if (p.length >= 4 && t.startsWith(p)) return true;
  const raiz = (s) => s.replace(/(oes|aes|es|s)$/, '').slice(0, 6);
  return t.length >= 4 && p.length >= 4 && raiz(t) === raiz(p);
}

/** Busca só no aprendizado da demo. → [{ref, titulo, trecho, area, score, aprendizado:true, achados, total}] */
export function buscaAprendizado(ctx, termo, { perfil, limite = 8 } = {}) {
  const q = [...new Set(tokens(termo))];
  if (!q.length) return [];
  const areas = perfilAreas(ctx, perfil);
  const res = [];
  for (const a of ctx?.aprendizado ?? []) {
    if (areas && a.area && !areas.includes(a.area)) continue;
    const tt = tokens(`${a.titulo} ${a.maquina ?? ''} ${a.tipo}`), tx = tokens(a.texto);
    let score = 0, achados = 0;
    for (const t of q) {
      const noT = tt.some((p) => casa(t, p)), noX = tx.some((p) => casa(t, p));
      if (noT || noX) achados++;
      score += (noT ? 3 : 0) + (noX ? 1 : 0);
    }
    if (!achados) continue;
    score *= 0.5 + achados / q.length / 2;
    res.push({
      ref: `aprendizado:${a.id}`, titulo: `${a.titulo} (registrado nesta demo por ${a.autor})`, trecho: corta(a.texto, 220),
      area: a.area, score: Math.round(score * 100) / 100, aprendizado: true, achados, total: q.length,
    });
  }
  return res.sort((x, y) => y.score - x.score || y.ref.localeCompare(x.ref)).slice(0, limite); // empate: mais recente
}

/** Busca do motor + aprendizado, deduplicada por ref; aprendizado vence empates. */
export function buscarTudo(ctx, termo, { perfil, limite = 8 } = {}) {
  const apr = buscaAprendizado(ctx, termo, { perfil, limite });
  const refsApr = new Set(apr.map((x) => x.ref));
  const base = buscar(ctx, termo, { perfil, limite: limite + apr.length })
    .filter((x) => !refsApr.has(x.ref))
    .map((x) => (String(x.ref).startsWith('aprendizado:') ? { ...x, aprendizado: true } : x));
  return [...apr, ...base]
    .sort((a, b) => b.score - a.score || (b.aprendizado ? 1 : 0) - (a.aprendizado ? 1 : 0))
    .slice(0, limite);
}
