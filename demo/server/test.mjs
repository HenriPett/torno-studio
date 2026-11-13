// Testes do backend da demo, sem dependências: node demo/server/test.mjs
// Chama router.handle com Request objects e um FileStore temporário. A IA é testada com um fetch
// falso que imita o stream SSE da Anthropic (tool_use → continuar:true → texto final).
// Com ANTHROPIC_API_KEY no ambiente e TESTE_IA_REAL=1, faz também uma conversa real curta.

import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { handle } from './router.mjs';
import { FileStore } from './store.mjs';
import { criaCtx, SETOR_IDS } from './catalogo.mjs';
import { AVISO_LIMITE } from './ai.mjs';
import * as motor from '../web/src/ai/local-engine.js';
import { api, AVISO_FALHA } from '../web/src/api.js';
import { createAssistant, definirClientePortal } from '../web/src/ai/assistant.js';

const ORIGEM = 'https://demo.teste';
const dir = await mkdtemp(path.join(os.tmpdir(), 'torno-demo-teste-'));
const store = new FileStore(dir);
const ENV = { DEMO_ADMIN_PASSWORD: 'senha-admin-certa', DEMO_SESSION_SECRET: 'x'.repeat(40), DEMO_DAILY_MESSAGES: '50' };

let ok = 0;
const testes = [];
const teste = (nome, fn) => testes.push([nome, fn]);

/** Cliente com pote de cookies. */
function cliente(env = ENV, extra = {}) {
  const pote = {};
  return {
    pote,
    async req(metodo, caminho, corpo, { headers = {}, semOrigem = false, fetch } = {}) {
      const h = new Headers(headers);
      if (!semOrigem && !h.has('origin')) h.set('origin', ORIGEM);
      if (corpo !== undefined && !h.has('content-type')) h.set('content-type', 'application/json');
      const ck = Object.entries(pote).map(([k, v]) => `${k}=${v}`).join('; ');
      if (ck) h.set('cookie', ck);
      const r = await handle(new Request(ORIGEM + caminho, { method: metodo, headers: h, body: corpo === undefined ? undefined : JSON.stringify(corpo) }),
        { env, store, fetch: fetch ?? extra.fetch });
      for (const c of r.headers.getSetCookie()) {
        const [par] = c.split(';'); const i = par.indexOf('=');
        const k = par.slice(0, i), v = par.slice(i + 1);
        if (/Max-Age=0/.test(c)) delete pote[k]; else pote[k] = v;
      }
      return r;
    },
  };
}

async function leSSE(r) {
  assert.match(r.headers.get('content-type'), /text\/event-stream/);
  const txt = await r.text();
  assert.ok(txt.endsWith('\n\n'), 'SSE termina com linha em branco');
  return txt.trim().split('\n\n').map((b) => {
    const linhas = b.split('\n');
    assert.ok(linhas[0].startsWith('event: ') && linhas[1].startsWith('data: ') && linhas.length === 2, `bloco SSE bem formado: ${b.slice(0, 80)}`);
    return { evento: linhas[0].slice(7), dados: JSON.parse(linhas[1].slice(6)) };
  });
}

const admin = cliente();
const visitante = cliente();
let demoId, senha;

teste('admin: senha errada → 401 com atraso; certa → cookie', async () => {
  const t0 = Date.now();
  let r = await admin.req('POST', '/api/admin/entrar', { senha: 'errada' });
  assert.equal(r.status, 401);
  assert.ok(Date.now() - t0 >= 350, 'atraso em falha');
  r = await admin.req('GET', '/api/admin/demos');
  assert.equal(r.status, 401);
  r = await admin.req('POST', '/api/admin/entrar', { senha: 'senha-admin-certa' });
  assert.equal(r.status, 200);
  assert.ok(admin.pote.ta);
  r = await admin.req('GET', '/api/admin/sessao');
  assert.deepEqual(await r.json(), { ok: true, ia: { disponivel: false, modelo: null } });
});

teste('admin sem DEMO_ADMIN_PASSWORD → 503', async () => {
  const c = cliente({ DEMO_SESSION_SECRET: 'y'.repeat(40) });
  const r = await c.req('POST', '/api/admin/entrar', { senha: 'x' });
  assert.equal(r.status, 503);
  assert.match((await r.json()).erro, /DEMO_ADMIN_PASSWORD/);
});

teste('CSRF: POST sem Origin, com Origin de fora ou sem JSON → 403', async () => {
  let r = await admin.req('POST', '/api/admin/demos', { nome: 'X', setor: 'textil' }, { semOrigem: true });
  assert.equal(r.status, 403);
  r = await admin.req('POST', '/api/admin/demos', { nome: 'X', setor: 'textil' }, { headers: { origin: 'https://malicioso.example' } });
  assert.equal(r.status, 403);
  r = await admin.req('POST', '/api/admin/demos', { nome: 'X', setor: 'textil' }, { headers: { 'content-type': 'text/plain' } });
  assert.equal(r.status, 403);
  r = await admin.req('POST', '/api/admin/demos', { nome: 'X', setor: 'textil' }, { semOrigem: true, headers: { 'sec-fetch-site': 'same-origin' } });
  assert.equal(r.status, 201, 'sem Origin mas Sec-Fetch-Site same-origin passa');
  const { demo } = await r.json();
  assert.equal((await admin.req('DELETE', `/api/admin/demos/${demo.id}`)).status, 200);
});

teste('admin: criar demo valida setor/módulos e devolve senha legível', async () => {
  let r = await admin.req('POST', '/api/admin/demos', { nome: 'Teste', setor: 'nao-existe' });
  assert.equal(r.status, 400);
  r = await admin.req('POST', '/api/admin/demos', { nome: 'Teste', setor: 'textil', modulos: { inventado: true } });
  assert.equal(r.status, 400);
  r = await admin.req('POST', '/api/admin/demos', { nome: 'Malharia do Vale (prospect)', setor: 'textil', nota: 'reunião dia 20' });
  assert.equal(r.status, 201);
  const j = await r.json();
  assert.match(j.demo.id, /^[a-z2-7]{12}$/);
  assert.match(j.senha, /^[a-z]+-\d{4}-[a-z]+$/);
  assert.equal(j.demo.senha, undefined);
  assert.equal(j.demo.url, `/demo/${j.demo.id}`);
  assert.equal(j.demo.modulos.producao, true);
  demoId = j.demo.id; senha = j.senha;
});

teste('admin: listar (sem hash, com aprendizado_qtd e url)', async () => {
  const r = await admin.req('GET', '/api/admin/demos');
  const lista = await r.json();
  const d = lista.find((x) => x.id === demoId);
  assert.ok(d);
  assert.equal(d.aprendizado_qtd, 0);
  assert.equal(d.url, `/demo/${demoId}`);
  assert.ok(!JSON.stringify(lista).includes('"hash"'));
  assert.ok(!JSON.stringify(lista).includes('"salt"'));
});

teste('entrar: senha errada, id inexistente e id malformado dão a mesma resposta; certa dá cookie', async () => {
  const r1 = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha: 'errada' });
  const r2 = await visitante.req('POST', '/api/demo/aaaaaaaaaaaa/entrar', { senha });
  const r3 = await visitante.req('POST', '/api/demo/xx/entrar', { senha });
  for (const r of [r1, r2, r3]) { assert.equal(r.status, 401); assert.deepEqual(await r.json(), { erro: 'Link ou senha inválidos' }); }
  const r = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 200);
  const c = r.headers.getSetCookie()[0];
  assert.match(c, new RegExp(`^td_${demoId}=`));
  assert.match(c, /HttpOnly/); assert.match(c, /Secure/); assert.match(c, /SameSite=Lax/); assert.match(c, /Path=\//);
});

teste('/estado com e sem cookie; conta acesso', async () => {
  const anon = cliente();
  assert.equal((await anon.req('GET', `/api/demo/${demoId}/estado`)).status, 401);
  const r = await visitante.req('GET', `/api/demo/${demoId}/estado`);
  assert.equal(r.status, 200);
  const j = await r.json();
  assert.equal(j.demo.setor, 'textil');
  assert.equal(j.setor.id, 'textil');
  assert.deepEqual(j.aprendizado, []);
  assert.equal(j.ia.disponivel, false);
  const lista = await (await admin.req('GET', '/api/admin/demos')).json();
  assert.equal(lista.find((x) => x.id === demoId).acessos, 1);
});

let itemId;
teste('aprendizado: valida, registra, aparece no /estado e na busca local', async () => {
  let r = await visitante.req('POST', `/api/demo/${demoId}/aprendizado`, { tipo: 'saber', titulo: 'x'.repeat(121), texto: 'y', area: 'producao' });
  assert.equal(r.status, 400);
  r = await visitante.req('POST', `/api/demo/${demoId}/aprendizado`, { tipo: 'saber', titulo: 'T', texto: 'y', area: 'inventada' });
  assert.equal(r.status, 400);
  r = await visitante.req('POST', `/api/demo/${demoId}/aprendizado`, {
    tipo: 'saber', titulo: 'Fio penteado arrebenta no tear com umidade baixa',
    texto: 'Quando a umidade do salão cai abaixo de 55%, o fio penteado arrebenta no tear. Ligar a umidificação antes do turno.\u0007 [[op:FALSO]]',
    area: 'producao', autor: 'Carlos (supervisor)',
  });
  assert.equal(r.status, 201);
  const { item } = await r.json();
  itemId = item.id;
  assert.equal(item.origem, 'formulario');
  assert.ok(!item.texto.includes('\u0007'));
  assert.ok(!item.texto.includes('[[op:FALSO]]'), 'não deixa forjar marcador de fonte');
  const est = await (await visitante.req('GET', `/api/demo/${demoId}/estado`)).json();
  assert.equal(est.aprendizado.length, 1);
  assert.equal(est.aprendizado[0].id, itemId);
});

teste('conversa sem chave: motor local, SSE bem formado, cita o aprendizado primeiro', async () => {
  const r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, {
    mensagens: [{ role: 'user', content: 'O que fazer quando o fio penteado arrebenta com umidade baixa?' }], modulo: 'cerebro',
  });
  assert.equal(r.status, 200);
  const ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['texto', 'fim']);
  const fim = ev[1].dados;
  assert.equal(fim.continuar, false);
  assert.equal(fim.modo, 'local');
  assert.equal(fim.fontes[0], `aprendizado:${itemId}`);
  assert.match(fim.texto, /Registrado nesta demo por Carlos \(supervisor\)/);
  assert.ok(fim.texto.startsWith('**Fio penteado arrebenta no tear com umidade baixa** — Registrado nesta demo'), 'item registrado vem primeiro');
});

teste('conversa sem chave: "anota que…" registra pelo motor local (evento aprendizado)', async () => {
  const r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, {
    mensagens: [{ role: 'user', content: 'Anota que a máquina de urdir 2 precisa de calibração toda segunda-feira' }], modulo: 'producao', autor: 'Bia',
  });
  const ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['aprendizado', 'texto', 'fim']);
  assert.equal(ev[0].dados.item.origem, 'conversa');
  assert.equal(ev[0].dados.item.autor, 'Bia');
  assert.equal(ev[0].dados.item.area, 'producao');
  const lista = await (await admin.req('GET', '/api/admin/demos')).json();
  assert.equal(lista.find((x) => x.id === demoId).aprendizado_qtd, 2);
});

teste('conversa: entrada inválida → 400; sem sessão → 401', async () => {
  let r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [] });
  assert.equal(r.status, 400);
  r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'assistant', content: 'oi' }] });
  assert.equal(r.status, 400);
  r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { estado: 'adulterado.abc' });
  assert.equal(r.status, 400);
  r = await cliente().req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'oi' }] });
  assert.equal(r.status, 401);
  r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'x'.repeat(250 * 1024) }] });
  assert.equal(r.status, 413);
});

/* ---------------- IA com fetch falso ---------------- */

function sseAnthropic(eventos) {
  const txt = eventos.map(([ev, d]) => `event: ${ev}\ndata: ${JSON.stringify({ type: ev, ...d })}\n\n`).join('');
  const enc = new TextEncoder().encode(txt);
  // entrega em pedaços pequenos para testar o parser
  return new Response(new ReadableStream({ start(c) { for (let i = 0; i < enc.length; i += 37) c.enqueue(enc.slice(i, i + 37)); c.close(); } }),
    { status: 200, headers: { 'content-type': 'text/event-stream' } });
}

function fetchFalso(roteiro) {
  const chamadas = [];
  const fn = async (url, init) => {
    const body = JSON.parse(init.body);
    chamadas.push({ url, headers: init.headers, body });
    const passo = roteiro[chamadas.length - 1];
    return typeof passo === 'function' ? passo(body) : passo;
  };
  fn.chamadas = chamadas;
  return fn;
}

const ENV_IA = { ...ENV, ANTHROPIC_API_KEY: 'sk-teste-falso' };

teste('IA (fetch falso): tool_use → continuar:true com estado assinado → texto final com fontes', async () => {
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const ff = fetchFalso([
    sseAnthropic([
      ['message_start', { message: { id: 'msg_1', role: 'assistant', content: [] } }],
      ['content_block_start', { index: 0, content_block: { type: 'thinking', thinking: '', signature: '' } }],
      ['content_block_delta', { index: 0, delta: { type: 'thinking_delta', thinking: 'Vou buscar.' } }],
      ['content_block_delta', { index: 0, delta: { type: 'signature_delta', signature: 'sig123' } }],
      ['content_block_stop', { index: 0 }],
      ['content_block_start', { index: 1, content_block: { type: 'tool_use', id: 'toolu_1', name: 'buscar_documentos', input: {} } }],
      ['content_block_delta', { index: 1, delta: { type: 'input_json_delta', partial_json: '{"consulta": "fio pent' } }],
      ['content_block_delta', { index: 1, delta: { type: 'input_json_delta', partial_json: 'eado umidade"}' } }],
      ['content_block_stop', { index: 1 }],
      ['content_block_start', { index: 2, content_block: { type: 'tool_use', id: 'toolu_2', name: 'consultar_ordens', input: {} } }],
      ['content_block_delta', { index: 2, delta: { type: 'input_json_delta', partial_json: '{"status":"atrasada"}' } }],
      ['content_block_stop', { index: 2 }],
      ['message_delta', { delta: { stop_reason: 'tool_use' }, usage: { output_tokens: 30 } }],
      ['message_stop', {}],
    ]),
    (body) => {
      // a 2ª chamada recebe o histórico com thinking intacto + tool_result num único turno user
      const [, asst, res] = body.messages;
      assert.equal(asst.role, 'assistant');
      assert.deepEqual(asst.content[0], { type: 'thinking', thinking: 'Vou buscar.', signature: 'sig123' });
      assert.deepEqual(asst.content[1].input, { consulta: 'fio penteado umidade' });
      assert.equal(res.role, 'user');
      assert.deepEqual(res.content.map((c) => c.tool_use_id), ['toolu_1', 'toolu_2']);
      assert.ok(res.content[0].content.includes(`aprendizado:${itemId}`), 'busca inclui o aprendizado');
      return sseAnthropic([
        ['message_start', { message: { id: 'msg_2', role: 'assistant', content: [] } }],
        ['content_block_start', { index: 0, content_block: { type: 'text', text: '' } }],
        ['content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'Ligue a umidificação antes do turno, ' } }],
        ['content_block_delta', { index: 0, delta: { type: 'text_delta', text: `como registrou o Carlos [[aprendizado:${itemId}]] [[op:INEXISTENTE]].` } }],
        ['content_block_stop', { index: 0 }],
        ['message_delta', { delta: { stop_reason: 'end_turn' } }],
        ['message_stop', {}],
      ]);
    },
  ]);

  let r = await ia.req('POST', `/api/demo/${demoId}/conversa`, {
    mensagens: [{ role: 'user', content: 'O fio penteado está arrebentando, o que fazer?' }], modulo: 'cerebro',
  }, { fetch: ff });
  let ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['ferramenta', 'ferramenta', 'fim']);
  assert.deepEqual(ev[0].dados, { nome: 'buscar_documentos', rotulo: 'Buscando nos documentos da empresa' });
  let fim = ev.at(-1).dados;
  assert.equal(fim.continuar, true);
  assert.equal(fim.rodada, 1);
  assert.ok(typeof fim.estado === 'string' && fim.estado.includes('.'));

  // pedido à API: modelo, sem extended thinking, cache no bloco fixo, ferramentas da demo
  const req1 = ff.chamadas[0];
  assert.equal(req1.url, 'https://api.anthropic.com/v1/messages');
  assert.equal(req1.headers['x-api-key'], 'sk-teste-falso');
  assert.equal(req1.headers['anthropic-version'], '2026-10-21');
  assert.equal(req1.body.model, 'claude-sonnet-5-5');
  assert.equal(req1.body.max_tokens, 1200);
  assert.equal(req1.body.stream, true);
  assert.deepEqual(req1.body.thinking, { type: 'between_tools' });
  assert.deepEqual(req1.body.system[0].cache_control, { type: 'ephemeral' });
  assert.match(req1.body.system[1].text, /Fio penteado arrebenta/);
  assert.match(req1.body.system[0].text, /Comece pela conclusão, em uma frase/, 'tom de executivo no prompt');
  assert.match(req1.body.system[0].text, /a TIN-03 \(jet de tingimento 3\)/);
  assert.ok(req1.body.tools.some((t) => t.name === 'registrar_aprendizado'));
  assert.equal(req1.body.tool_choice, undefined);

  // estado adulterado é recusado
  const [corpo, sig] = fim.estado.split('.');
  const adult = JSON.parse(Buffer.from(corpo, 'base64url'));
  adult.rodada = 0;
  r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { estado: `${Buffer.from(JSON.stringify(adult)).toString('base64url')}.${sig}` }, { fetch: ff });
  assert.equal(r.status, 400);

  r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { estado: fim.estado }, { fetch: ff });
  ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['texto', 'texto', 'fim']);
  fim = ev.at(-1).dados;
  assert.equal(fim.continuar, false);
  assert.equal(fim.rodada, 2);
  assert.match(fim.texto, /\[\[aprendizado:/, 'servidor mantém os marcadores no texto');
  assert.deepEqual(fim.fontes, [`aprendizado:${itemId}`], 'ref inexistente fica fora das fontes');
});

teste('IA (fetch falso): registrar_aprendizado emite evento aprendizado; 5ª rodada usa tool_choice none', async () => {
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const usaFerramenta = (nome, input) => sseAnthropic([
    ['message_start', { message: { id: 'm', role: 'assistant', content: [] } }],
    ['content_block_start', { index: 0, content_block: { type: 'tool_use', id: `toolu_${Math.random().toString(36).slice(2)}`, name: nome, input: {} } }],
    ['content_block_delta', { index: 0, delta: { type: 'input_json_delta', partial_json: JSON.stringify(input) } }],
    ['content_block_stop', { index: 0 }],
    ['message_delta', { delta: { stop_reason: 'tool_use' } }],
  ]);
  const ff = fetchFalso([
    usaFerramenta('registrar_aprendizado', { tipo: 'ocorrencia', titulo: 'Tear 4 vibrando', texto: 'Tear 4 começou a vibrar no 2º turno', area: 'manutencao' }),
    usaFerramenta('consultar_kpis', {}),
    usaFerramenta('consultar_kpis', { id: 'oee' }),
    usaFerramenta('buscar_aprendizado', { termo: 'tear' }),
    (body) => {
      assert.deepEqual(body.tool_choice, { type: 'none' });
      return sseAnthropic([
        ['content_block_start', { index: 0, content_block: { type: 'text', text: '' } }],
        ['content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'Registrado.' } }],
        ['content_block_stop', { index: 0 }],
        ['message_delta', { delta: { stop_reason: 'end_turn' } }],
      ]);
    },
  ]);
  let r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'Registra que o tear 4 vibrou' }], autor: 'Ana' }, { fetch: ff });
  let ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['ferramenta', 'aprendizado', 'fim']);
  assert.equal(ev[1].dados.item.autor, 'Ana');
  assert.equal(ev[1].dados.item.origem, 'conversa');
  let fim = ev.at(-1).dados;
  let n = 1;
  while (fim.continuar) {
    r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { estado: fim.estado }, { fetch: ff });
    ev = await leSSE(r);
    fim = ev.at(-1).dados;
    n++;
    assert.ok(n <= 5);
  }
  assert.equal(n, 5);
  assert.equal(fim.texto, 'Registrado.');
});

teste('IA (fetch falso): 529 → evento erro amigável e recuperável', async () => {
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const ff = fetchFalso([new Response(JSON.stringify({ type: 'error', error: { type: 'overloaded_error', message: 'Overloaded' } }), { status: 529 })]);
  const r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'oi' }] }, { fetch: ff });
  const ev = await leSSE(r);
  assert.deepEqual(ev.map((e) => e.evento), ['erro']);
  assert.equal(ev[0].dados.recuperavel, true);
  assert.match(ev[0].dados.erro, /sobrecarregada/);
  // o cliente pode cair no motor local
  const r2 = await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }], motor: 'local' }, { fetch: ff });
  const ev2 = await leSSE(r2);
  assert.equal(ev2.at(-1).dados.modo, 'local');
  assert.ok(ev2.at(-1).dados.fontes.some((f) => f.startsWith('op:')));
});

/* ---------------- Portal do cliente ---------------- */

const ATRASADOS = 'Quais pedidos estão atrasados?';
teste('portal (motor local): Moda Ponto Certo só vê os pedidos dela; cliente inválido → 400', async () => {
  const ev = await leSSE(await visitante.req('POST', `/api/demo/${demoId}/conversa`, {
    mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal', cliente: 'CLI-1042',
  }));
  const fim = ev.at(-1).dados;
  assert.match(fim.texto, /PV-88213/);
  for (const outro of ['PV-88227', 'PV-88240', 'Magazine', 'Boutique']) assert.ok(!fim.texto.includes(outro), `vazou ${outro}`);
  assert.ok(fim.fontes.every((f) => !/PV-882(27|40)|OP-245(22|30)/.test(f)), fim.fontes.join(' '));
  // sem cliente, a mesma pergunta lista os três (é a visão interna)
  const ev2 = await leSSE(await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'comercial' }));
  assert.match(ev2.at(-1).dados.texto, /PV-88227/);
  for (const cliente of ['CLI-9999', 42, 'cliente:CLI-1042']) {
    const r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal', cliente });
    assert.equal(r.status, 400, String(cliente));
  }
  // a visão do cliente no motor: sem chão de fábrica, sem aprendizado, só os pedidos/OPs dele
  const v = motor.visaoDoCliente(criaCtx({ setor: 'textil', modulos: {} }, [{ id: 'x', titulo: 'a', texto: 'b' }]), 'CLI-1042');
  assert.deepEqual(v.data.pedidos.map((p) => p.cliente), v.data.pedidos.map(() => 'CLI-1042'));
  assert.ok(v.data.ordens.length && v.data.ordens.every((o) => v.data.pedidos.some((p) => p.ordem === o.id || o.pedido === p.id)));
  assert.deepEqual([v.data.maquinas, v.data.nao_conformidades, v.aprendizado], [[], [], []]);
  assert.equal(motor.refOk(v, 'pedido:PV-88227'), false);
  assert.equal(motor.refOk(v, 'pedido:PV-88213'), true);
});

teste('portal (IA, fetch falso): ferramentas do cliente, prompt com o cliente, resultado e fontes filtrados', async () => {
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const ff = fetchFalso([
    (body) => {
      const nomes = body.tools.map((t) => t.name);
      assert.deepEqual(nomes.filter((n) => !['buscar_documentos', 'consultar_pedidos', 'consultar_ordens', 'consultar_estoque_preco', 'consultar_clientes_representantes', 'regras_comerciais'].includes(n)), []);
      assert.ok(nomes.includes('consultar_pedidos'));
      assert.match(body.system[1].text, /Portal do cliente: quem pergunta é o lojista Moda Ponto Certo/);
      assert.ok(!body.system[1].text.includes('<aprendizado>'), 'sem o aprendizado interno');
      assert.equal(body.messages.length, 1, 'sem o histórico das telas internas');
      return sseAnthropic([
        ['content_block_start', { index: 0, content_block: { type: 'tool_use', id: 'toolu_p', name: 'consultar_pedidos', input: {} } }],
        ['content_block_delta', { index: 0, delta: { type: 'input_json_delta', partial_json: '{"status":"atrasado"}' } }],
        ['content_block_stop', { index: 0 }],
        ['message_delta', { delta: { stop_reason: 'tool_use' } }],
      ]);
    },
    (body) => {
      const res = body.messages.at(-1).content[0].content;
      assert.match(res, /PV-88213/);
      assert.ok(!/PV-88227|PV-88240/.test(res), 'a ferramenta não devolve pedidos de outros clientes');
      return sseAnthropic([
        ['content_block_start', { index: 0, content_block: { type: 'text', text: '' } }],
        ['content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'Seu pedido [[pedido:PV-88213]] atrasou. [[pedido:PV-88227]]' } }],
        ['content_block_stop', { index: 0 }],
        ['message_delta', { delta: { stop_reason: 'end_turn' } }],
      ]);
    },
  ]);
  const historico = [{ role: 'user', content: ATRASADOS }, { role: 'assistant', content: 'PV-88227 (Magazine Horizonte Sul) e PV-88240 atrasados.' }];
  let ev = await leSSE(await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [...historico, { role: 'user', content: ATRASADOS }], modulo: 'portal', cliente: 'CLI-1042' }, { fetch: ff }));
  let fim = ev.at(-1).dados;
  assert.equal(fim.continuar, true);
  ev = await leSSE(await ia.req('POST', `/api/demo/${demoId}/conversa`, { estado: fim.estado }, { fetch: ff }));
  fim = ev.at(-1).dados;
  assert.deepEqual(fim.fontes, ['pedido:PV-88213'], 'ref de outro cliente fica fora das fontes');
});

/** fetch global → handle(), com os cookies do cliente de teste (para exercitar api.js e assistant.js). */
function fetchPelo(c, env, extra = {}) {
  return async (url, init = {}) => {
    const h = new Headers(init.headers);
    h.set('origin', ORIGEM);
    h.set('cookie', Object.entries(c.pote).map(([k, v]) => `${k}=${v}`).join('; '));
    return handle(new Request(ORIGEM + url, { method: init.method, headers: h, body: init.body }), { env, store, ...extra });
  };
}

teste('front (api.js + assistant.js): cliente do portal vai no corpo; troca silenciosa para o local traz aviso', async () => {
  const fetchOriginal = globalThis.fetch;
  try {
    globalThis.fetch = fetchPelo(visitante, ENV);
    const ass = createAssistant(() => ({ demo: { id: demoId }, api }));
    definirClientePortal('CLI-1042');
    let r = await ass.perguntar({ mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal' });
    assert.match(r.texto, /PV-88213/);
    assert.ok(!/PV-88227|PV-88240/.test(r.texto));
    assert.equal(r.aviso, null);
    r = await ass.perguntar({ mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'comercial' });
    assert.match(r.texto, /PV-88227/, 'fora do portal o cliente não vai junto');
    definirClientePortal(null);

    // IA com 529: api.js refaz pelo motor local e devolve o aviso
    const ff = fetchFalso([new Response('{"type":"error","error":{"type":"overloaded_error"}}', { status: 529 })]);
    globalThis.fetch = fetchPelo(visitante, ENV_IA, { fetch: ff });
    r = await ass.perguntar({ mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }] });
    assert.equal(r.modo, 'local');
    assert.equal(r.aviso, AVISO_FALHA);
    // sem ctx.api (conversaDireta) também
    const direto = createAssistant(() => ({ demo: { id: demoId } }));
    const ff2 = fetchFalso([new Response('{"type":"error","error":{"type":"overloaded_error"}}', { status: 529 })]);
    globalThis.fetch = fetchPelo(visitante, ENV_IA, { fetch: ff2 });
    r = await direto.perguntar({ mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }] });
    assert.equal(r.modo, 'local');
    assert.equal(r.aviso, AVISO_FALHA);
  } finally {
    globalThis.fetch = fetchOriginal;
  }
});

/* ---------------- Motor local: resumo do dia e pergunta derivada ---------------- */

teste('motor local: "o que eu preciso ver hoje?" vem com conclusão, 3–4 itens com impacto e próximo passo', async () => {
  for (const setor of SETOR_IDS) {
    const ctx = criaCtx({ setor, modulos: {} }, []);
    for (const q of ['O que eu preciso ver hoje?', 'O que mais preocupa na operação hoje?', 'Quais são os alertas do dia?']) {
      const r = motor.responder(ctx, q, { modulo: 'visao-geral' });
      const [conclusao, ...resto] = r.texto.split('\n').filter(Boolean);
      assert.match(conclusao, /^\*\*Hoje .*; comece .*\.\*\*$/, `${setor}: ${conclusao}`);
      assert.ok(resto.length >= 3 && resto.length <= 4, `${setor}: ${resto.length} itens`);
      for (const [i, item] of resto.entries()) {
        assert.ok(item.startsWith(`${i + 1}. `), item);
        assert.match(item, /\*\*Próximo passo:\*\* /, item);
        assert.match(item, /\[\[(pedido|op|maq|nc|os):/, `item sem fonte: ${item}`);
      }
      assert.ok(r.fontes.length >= 3 && r.fontes.length <= 8);
      for (const ref of r.fontes) assert.ok(motor.refOk(ctx, ref), ref);
      // os valores e datas citados vêm do pacote
      for (const m of r.texto.matchAll(/\*\*Pedido ([^*]+)\*\*\[\[pedido:[^\]]+\]\], de [^(]+\((R\$ [\d.,]+)\)/g)) {
        const pv = ctx.data.pedidos.find((p) => p.id === m[1]);
        const total = pv.itens.reduce((s2, i) => s2 + i.quantidade * i.preco_unit, 0);
        assert.equal(m[2].replace(/\s/g, ' '), motor.f.money(total).replace(/\s/g, ' '));
      }
    }
  }
});

teste('pergunta derivada casa com o próprio item em responder()', async () => {
  const base = { autor: 'Bia', origem: 'formulario' };
  for (const setor of SETOR_IDS) {
    const ctx0 = criaCtx({ setor, modulos: {} }, []);
    const d = ctx0.data;
    const itens = [
      { tipo: 'nota', titulo: `A ${d.ordens[0].id.toLowerCase()} só pode sair depois da inspeção`, texto: 'Combinado com o PCP.', area: 'producao' },
      { tipo: 'saber', titulo: 'Conferir o pedido antes de liberar', texto: `O ${d.pedidos[0].id} tem embalagem especial.`, area: 'comercial' },
      { tipo: 'ocorrencia', titulo: `NC ${d.nao_conformidades[0].id} reaberta`, texto: 'Cliente ligou de novo.', area: 'qualidade' },
      { tipo: 'saber', titulo: 'Umidade baixa no salão quebra o fio penteado no inverno quando o turno começa cedo', texto: 'Ligar a umidificação antes do turno.', area: 'producao' },
      { tipo: 'documento', titulo: 'OEE conta setup como parada planejada', texto: 'Regra da diretoria.', area: 'gestao' },
      { tipo: 'ocorrencia', titulo: 'Queda de energia', texto: 'Às 14h faltou luz por 10 minutos.', area: 'manutencao' },
      { tipo: 'saber', titulo: 'Aquecer antes', texto: 'Esperar 20 minutos.', area: 'manutencao', maquina: d.maquinas[0].id },
    ].map((x, i) => ({ ...base, ...x, id: `00000000000${i}0-teste${i}`, criado_em: `2026-11-1${i}T10:00:00.000Z` }));
    const ctx = criaCtx({ setor, modulos: {} }, itens);
    for (const it of itens) {
      const q = motor.perguntaDerivada(it, ctx);
      assert.ok(!/“[^”]*”/.test(q) || !/\b[A-Z]{2,}-\d/.test(q), q);
      const r = motor.responder(ctx, q, {});
      assert.ok(r.fontes.slice(0, 2).includes(`aprendizado:${it.id}`), `${setor}: "${q}" não casou com ${it.titulo} (${r.fontes.join(' ')})`);
    }
    assert.equal(motor.perguntaDerivada(itens[0], ctx), `O que a equipe registrou sobre a ${d.ordens[0].id}?`);
    assert.match(motor.perguntaDerivada(itens[3], ctx), /^O que a equipe sabe sobre “umidade baixa no salão quebra o fio penteado no inverno…”\?$/);
    assert.match(motor.perguntaDerivada(itens[4], ctx), /^Qual é a regra para “OEE conta setup/);
  }
});

teste('teto diário: passa do limite → resposta local com aviso', async () => {
  const env = { ...ENV_IA, DEMO_DAILY_MESSAGES: '1' };
  const ia = cliente(env);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const ff = fetchFalso([]);
  const r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }] }, { fetch: ff });
  const ev = await leSSE(r);
  assert.equal(ev.at(-1).dados.modo, 'local');
  assert.equal(ev.at(-1).dados.aviso, AVISO_LIMITE);
  assert.equal(ff.chamadas.length, 0);
});

teste('desligar módulo: ferramentas dele somem e o motor local não usa dados dele', async () => {
  let r = await admin.req('PATCH', `/api/admin/demos/${demoId}`, { modulos: { producao: false, comercial: false } });
  assert.equal(r.status, 200);
  const { demo } = await r.json();
  assert.equal(demo.modulos.portal, false, 'portal depende de comercial');
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  let nomes;
  const ff = fetchFalso([(body) => {
    nomes = body.tools.map((t) => t.name);
    return sseAnthropic([['content_block_start', { index: 0, content_block: { type: 'text', text: 'ok' } }], ['content_block_stop', { index: 0 }], ['message_delta', { delta: { stop_reason: 'end_turn' } }]]);
  }]);
  await leSSE(await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'oi' }] }, { fetch: ff }));
  for (const n of ['consultar_ordens', 'resumo_turnos', 'consultar_pedidos', 'consultar_estoque_preco', 'regras_comerciais']) assert.ok(!nomes.includes(n), n);
  for (const n of ['consultar_ncs', 'consultar_manutencao', 'buscar_aprendizado', 'registrar_aprendizado']) assert.ok(nomes.includes(n), n);
  const ev = await leSSE(await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }] }));
  assert.ok(!ev.at(-1).dados.fontes.some((f) => f.startsWith('op:') || f.startsWith('pedido:')));
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { modulos: { producao: true, comercial: true, portal: true } });
});

teste('DELETE do aprendizado (visitante e admin)', async () => {
  let r = await visitante.req('DELETE', `/api/demo/${demoId}/aprendizado/${itemId}`, undefined);
  assert.equal(r.status, 200);
  r = await visitante.req('DELETE', `/api/demo/${demoId}/aprendizado/${itemId}`, undefined);
  assert.equal(r.status, 404);
  const est = await (await visitante.req('GET', `/api/demo/${demoId}/estado`)).json();
  assert.ok(!est.aprendizado.some((a) => a.id === itemId));
  r = await admin.req('DELETE', `/api/admin/demos/${demoId}/aprendizado`, undefined);
  assert.equal(r.status, 200);
  assert.deepEqual(await (await admin.req('GET', `/api/admin/demos/${demoId}/aprendizado`)).json(), []);
});

teste('PATCH nova_senha:true invalida a senha e a sessão antigas', async () => {
  const r = await admin.req('PATCH', `/api/admin/demos/${demoId}`, { nova_senha: true });
  const j = await r.json();
  assert.ok(j.senha && j.senha !== senha);
  assert.equal((await visitante.req('GET', `/api/demo/${demoId}/estado`)).status, 401, 'cookie antigo deixa de valer');
  assert.equal((await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha })).status, 401);
  assert.equal((await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha: j.senha })).status, 200);
  senha = j.senha;
});

teste('demo desativada ou expirada = "Link ou senha inválidos"; admin ainda abre', async () => {
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: false });
  let r = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 401);
  assert.deepEqual(await r.json(), { erro: 'Link ou senha inválidos' });
  assert.equal((await visitante.req('GET', `/api/demo/${demoId}/estado`)).status, 401);
  r = await admin.req('GET', `/api/demo/${demoId}/estado`);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).admin, true);
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: true, expira_em: '2020-01-01' });
  assert.equal((await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha })).status, 401);
});

teste('entrar: depois de 20 senhas erradas na hora, até a certa dá a mesma resposta; cookie malformado não derruba', async () => {
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: true, expira_em: null });
  const outro = cliente();
  const rs = await Promise.all(Array.from({ length: 20 }, () => outro.req('POST', `/api/demo/${demoId}/entrar`, { senha: 'errada' })));
  assert.ok(rs.every((r) => r.status === 401));
  const r = await outro.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 401);
  assert.deepEqual(await r.json(), { erro: 'Link ou senha inválidos' });
  assert.equal((await cliente().req('GET', `/api/demo/${demoId}/estado`, undefined, { headers: { cookie: 'x=%E0%A4%A' } })).status, 401);
});

teste('acessos concorrentes não desfazem o PATCH do admin (ativo, senha, expira_em)', async () => {
  const { demo: dc, senha: s0 } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Corrida', setor: 'textil' })).json();
  let senhaAtual = s0, oks = 0;
  for (let rodada = 0; rodada < 5; rodada++) {
    const v = cliente();
    assert.equal((await v.req('POST', `/api/demo/${dc.id}/entrar`, { senha: senhaAtual })).status, 200);
    // ondas de 15 GET /estado em paralelo enquanto o PATCH desativa, troca a senha e muda o prazo
    let feito = false;
    const patch = admin.req('PATCH', `/api/admin/demos/${dc.id}`, { ativo: false, nova_senha: true, expira_em: '2030-01-0' + (rodada + 1) })
      .finally(() => { feito = true; });
    do {
      const rs = await Promise.all(Array.from({ length: 15 }, () => v.req('GET', `/api/demo/${dc.id}/estado`)));
      oks += rs.filter((r) => r.status === 200).length;
    } while (!feito);
    const rp = await patch;
    const { senha: nova } = await rp.json();
    const reg = await store.get(`demo/${dc.id}`);
    assert.equal(reg.ativo, false, `rodada ${rodada}: o link voltou a ativo`);
    assert.equal(reg.senha_v, rodada + 2, `rodada ${rodada}: senha nova perdida`);
    assert.equal(reg.expira_em, new Date(`2030-01-0${rodada + 1}T23:59:59-03:00`).toISOString(), `rodada ${rodada}: prazo perdido`);
    assert.equal((await cliente().req('POST', `/api/demo/${dc.id}/entrar`, { senha: senhaAtual })).status, 401, 'senha antiga não vale');
    senhaAtual = nova;
    await admin.req('PATCH', `/api/admin/demos/${dc.id}`, { ativo: true });
  }
  const reg = await store.get(`demo/${dc.id}`);
  assert.equal(reg.acessos, 0, 'o registro da demo não é regravado por acesso');
  const d = (await (await admin.req('GET', '/api/admin/demos')).json()).find((x) => x.id === dc.id);
  assert.equal(d.acessos, oks, 'listagem soma os acessos');
  assert.ok(oks > 0 && Date.parse(d.ultimo_acesso) > Date.now() - 60e3);
  const um = await (await admin.req('GET', `/api/admin/demos/${dc.id}`)).json();
  assert.equal(um.acessos, oks);
  const { demo: aposPatch } = await (await admin.req('PATCH', `/api/admin/demos/${dc.id}`, { nota: 'x' })).json();
  assert.equal(aposPatch.acessos, oks, 'resposta do PATCH traz os acessos agregados');
  assert.equal((await admin.req('DELETE', `/api/admin/demos/${dc.id}`, undefined)).status, 200);
  assert.deepEqual(await store.list(`acessos/${dc.id}/`), []);
});

teste('entrar apaga as janelas de tentativas de horas anteriores', async () => {
  const { demo: dt, senha: st } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Tentativas', setor: 'moveis' })).json();
  const hora = Math.floor(Date.now() / 3600e3);
  for (const h of [hora - 30, hora - 2, hora - 1]) await store.set(`tentativas/${dt.id}/${h}-abc123`, { em: 'x' });
  await store.set(`tentativas/${dt.id}/${hora}-def456`, { em: 'x' });
  assert.equal((await cliente().req('POST', `/api/demo/${dt.id}/entrar`, { senha: st })).status, 200);
  assert.deepEqual(await store.list(`tentativas/${dt.id}/`), [`tentativas/${dt.id}/${hora}-def456`], 'só a janela da hora atual fica');
  await admin.req('DELETE', `/api/admin/demos/${dt.id}`, undefined);
});

teste('DELETE da demo apaga aprendizado e uso', async () => {
  await visitante.req('POST', `/api/demo/${demoId}/aprendizado`, { tipo: 'nota', titulo: 'a', texto: 'b', area: 'gestao' }).catch(() => {});
  const r = await admin.req('DELETE', `/api/admin/demos/${demoId}`, undefined);
  assert.equal(r.status, 200);
  assert.deepEqual(await store.list(`aprendizado/${demoId}/`), []);
  assert.deepEqual(await store.list(`uso/${demoId}/`), []);
  assert.deepEqual(await store.list(`tentativas/${demoId}/`), []);
  assert.equal(await store.get(`demo/${demoId}`), null);
});

if (process.env.ANTHROPIC_API_KEY && process.env.TESTE_IA_REAL === '1') {
  teste('IA real: conversa curta', async () => {
    const env = { ...ENV, ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY, DEMO_MODEL: process.env.DEMO_MODEL };
    const a = cliente(env);
    await a.req('POST', '/api/admin/entrar', { senha: 'senha-admin-certa' });
    const { demo } = await (await a.req('POST', '/api/admin/demos', { nome: 'IA real', setor: 'textil' })).json();
    let corpo = { mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas? Responda em 2 linhas.' }] };
    let fim, rodadas = 0;
    do {
      const ev = await leSSE(await a.req('POST', `/api/demo/${demo.id}/conversa`, corpo));
      const e = ev.find((x) => x.evento === 'erro');
      if (e) throw new Error(`erro da IA: ${e.dados.erro}`);
      fim = ev.at(-1).dados; rodadas++;
      corpo = { estado: fim.estado };
    } while (fim.continuar);
    console.log(`    [IA real] ${rodadas} rodada(s): ${fim.texto.slice(0, 200)} | fontes: ${fim.fontes.join(', ')}`);
    await a.req('DELETE', `/api/admin/demos/${demo.id}`, undefined);
  });
}

try {
  for (const [nome, fn] of testes) {
    try { await fn(); ok++; console.log(`ok  ${nome}`); }
    catch (e) { console.error(`FALHOU  ${nome}\n${e.stack}`); process.exitCode = 1; break; }
  }
} finally {
  await rm(dir, { recursive: true, force: true });
}
console.log(process.exitCode ? `\n${ok}/${testes.length} passaram (parou na primeira falha)` : `\n${ok}/${testes.length} passaram`);
