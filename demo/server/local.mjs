// Motor local (sem chave de API): importa o motor do front (demo/web/src/ai/local-engine.js, via motor.mjs)
// e só acrescenta o aprendizado da demo e o formato de saída do servidor.
// - Se a pergunta casa com algo registrado nesta demo, a resposta cita esse item primeiro.
// - "anota/registra/lembra/guarda/ensina que …" registra um item (como a IA faria com registrar_aprendizado).
// Respostas em Markdown simples; fontes em `fontes` (o texto do motor local não traz marcadores [[ref]],
// exceto o do item do aprendizado citado).

import { responder, buscaAprendizado, corta, f } from './motor.mjs';

const PEDIDO_REGISTRO = /^\s*(?:por favor,?\s*)?(anot[ae]|registr[ae]|lembr[ae](?:-se)?|guard[ae]|ensin[ae]|salv[ae])\b[\s,:-]*(?:(?:aqui|isso|isto)\b[\s,:-]*)?(?:que\s+|:\s*)?(.+)$/is;

const AREA_DO_MODULO = { producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial', marketing: 'marketing', operadores: 'operadores', portal: 'comercial' };

/** "anota que …" → {titulo, texto} ou null. */
export function pedidoDeRegistro(pergunta) {
  const m = PEDIDO_REGISTRO.exec(String(pergunta ?? ''));
  if (!m) return null;
  const texto = m[2].trim().replace(/^["“]|["”]$/g, '');
  if (texto.length < 8) return null;
  const primeira = texto.split(/(?<=[.!?])\s|\n/)[0];
  const titulo = corta(primeira.replace(/[.!?]+$/, ''), 80);
  return { titulo: titulo.charAt(0).toUpperCase() + titulo.slice(1), texto: texto.charAt(0).toUpperCase() + texto.slice(1) };
}

function maquinaCitada(ctx, texto) {
  const t = String(texto).toLowerCase();
  return (ctx.data?.maquinas ?? []).find((m) => t.includes(String(m.id).toLowerCase()))?.id ?? null;
}

const dataBr = (iso) => f.data(String(iso ?? '').slice(0, 10));

/**
 * @param ctx  criaCtx(demo, aprendizado)
 * @param opts {modulo, perfil, autor, registrar(input) → item}
 * @returns {texto, fontes, modo:'local', aprendizado?: item}
 */
export async function responderLocal(ctx, pergunta, { modulo, perfil, autor, registrar } = {}) {
  const p = String(pergunta ?? '').trim();
  const reg = pedidoDeRegistro(p);
  if (reg && typeof registrar === 'function') {
    const item = await registrar({
      tipo: /\b(dica|macete|truque|sempre que|quando)\b/i.test(reg.texto) ? 'saber' : 'nota',
      titulo: reg.titulo, texto: reg.texto, area: AREA_DO_MODULO[modulo] ?? 'gestao',
      maquina: maquinaCitada(ctx, reg.texto), autor,
    });
    return {
      texto: `Registrado no cérebro da ${ctx.empresa ?? 'empresa'}: **${item.titulo}** [[aprendizado:${item.id}]]\n\n` +
        'A partir de agora isso entra nas respostas e nas buscas desta demo. Pergunte sobre o assunto para ver.',
      fontes: [`aprendizado:${item.id}`], modo: 'local', aprendizado: item,
    };
  }

  const base = responder(ctx, p, { modulo, perfil });
  base.fontes = base.fontes ?? [];
  // se o motor do front já citou o aprendizado (quando ele passar a ler ctx.aprendizado), não duplica
  if (base.fontes.some((r) => String(r).startsWith('aprendizado:'))) return { ...base, modo: 'local' };
  const apr = buscaAprendizado(ctx, p, { perfil, limite: 3 })
    .filter((r) => r.score >= 2 && r.achados / r.total >= 0.5);
  if (!apr.length) return { ...base, modo: 'local' };

  const itens = apr.map((r) => (ctx.aprendizado ?? []).find((a) => `aprendizado:${a.id}` === r.ref)).filter(Boolean);
  const blocos = itens.slice(0, 2).map((a) =>
    `**${a.titulo}** — Registrado nesta demo por ${!a.autor || a.autor === 'Você' ? 'você' : a.autor} em ${dataBr(a.criado_em)}:\n${corta(a.texto, 600)} [[aprendizado:${a.id}]]`);
  const nadaNaBase = /^Não encontrei isso nos dados desta demo/.test(base.texto) || !base.fontes.length;
  const texto = nadaNaBase ? blocos.join('\n\n') : `${blocos.join('\n\n')}\n\n**Nos dados da empresa:**\n${base.texto}`;
  const fontes = [...itens.slice(0, 2).map((a) => `aprendizado:${a.id}`), ...(nadaNaBase ? [] : base.fontes)];
  return { texto, fontes, modo: 'local' };
}

