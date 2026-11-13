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
import { criaCtx, SETOR_IDS, pacote } from './catalogo.mjs';
import { AVISO_LIMITE } from './ai.mjs';
import { buildTools } from './tools.mjs';
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

/* ---------------- Portal do cliente: acesso, dados internos, preço, cliente e histórico ---------------- */

/** Códigos internos de um pacote: máquinas, OS e NCs (não podem aparecer para o cliente). */
const codigosInternos = (d) => [...(d.maquinas ?? []).map((m) => m.id), ...(d.manutencao ?? []).map((o) => o.id), ...(d.nao_conformidades ?? []).map((n) => n.id)];
const achaCodigo = (txt, codigos) => codigos.find((c) => new RegExp(`(?<![\\w-])${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w])`).test(txt))
  ?? (/\b(NC|OS)-\d/.exec(txt)?.[0] ?? null);

teste('portal (motor local): pergunta interna vira "fora do seu acesso" (não "todas as máquinas estão operando")', async () => {
  for (const setor of SETOR_IDS) {
    const ctx = criaCtx({ setor, modulos: {} }, []);
    const cli = motor.clientePadraoDoPortal(ctx.data);
    const v = motor.visaoDoCliente(ctx, cli);
    for (const m of ['manutencao', 'qualidade', 'operadores', 'marketing', 'integracoes', 'seguranca']) assert.equal(v.isEnabled(m), false, `${setor}: ${m}`);
    for (const m of ['portal', 'comercial', 'visao-geral', 'producao']) assert.equal(v.isEnabled(m), true, `${setor}: ${m}`);
    for (const q of ['Tem alguma máquina parada?', 'Qual o OEE da fábrica?', 'Quais não conformidades estão abertas?', 'O que mais preocupa na qualidade?']) {
      const r = motor.responder(ctx, q, { modulo: 'portal', cliente: cli });
      assert.match(r.texto, /^No portal você vê só os seus pedidos, o catálogo e as condições comerciais; isso fica com a equipe da /, `${setor}: ${q} → ${r.texto}`);
      assert.ok(!/operando|não conformidade/i.test(r.texto), r.texto);
      assert.ok(r.fontes.every((f) => f.startsWith('rep:')), r.fontes.join(' '));
    }
  }
  // com a produção desligada, o portal também não a enxerga
  const semProd = criaCtx({ setor: 'textil', modulos: { producao: false } }, []);
  assert.equal(motor.visaoDoCliente(semProd, 'CLI-1042').isEnabled('producao'), false);
});

teste('portal: nenhum código de máquina, OS ou NC nem meta do representante em ferramenta ou resposta local (8 setores)', async () => {
  for (const setor of SETOR_IDS) {
    const ctx = criaCtx({ setor, modulos: {} }, []);
    const codigos = codigosInternos(ctx.data);
    for (const c of ctx.data.clientes) {
      const v = motor.visaoDoCliente(ctx, c.id);
      const tools = Object.fromEntries(buildTools(v, {}).map((t) => [t.name, t]));
      const saidas = [
        tools.consultar_ordens?.execute({}), tools.consultar_pedidos?.execute({}), tools.consultar_pedidos?.execute({ status: 'atrasado' }),
        tools.consultar_clientes_representantes?.execute({}), tools.consultar_estoque_preco?.execute({}), tools.regras_comerciais?.execute({}),
        tools.buscar_documentos?.execute({ consulta: 'pedido atraso entrega' }), tools.buscar_documentos?.execute({ consulta: 'máquina manutenção qualidade' }),
      ];
      for (const s of saidas) {
        const txt = JSON.stringify(s ?? {});
        assert.equal(achaCodigo(txt, codigos), null, `${setor}/${c.id}: ferramenta vazou ${achaCodigo(txt, codigos)}: ${txt.slice(0, 300)}`);
        assert.ok(!/meta_mes|realizado_mes|ultimo_evento/.test(txt), `${setor}/${c.id}: ${txt.slice(0, 200)}`);
      }
      const perguntas = [
        'Onde está o meu pedido?', 'Quais pedidos estão atrasados?', 'Por que meu pedido atrasou?', 'Tem alguma máquina parada?',
        'Quem é meu representante?', ...v.data.pedidos.map((p) => `Onde está o pedido ${p.id}?`), ...v.data.ordens.map((o) => `Como está a ${o.id}?`),
        ...v.data.perguntas_sugeridas.map((p) => p.pergunta),
      ];
      for (const q of perguntas) {
        const r = motor.responder(ctx, q, { modulo: 'portal', cliente: c.id });
        assert.equal(achaCodigo(r.texto, codigos), null, `${setor}/${c.id}: "${q}" vazou ${achaCodigo(r.texto, codigos)}: ${r.texto}`);
        assert.ok(!/\bmeta\b|realizou/.test(r.texto), `${setor}/${c.id}: "${q}": ${r.texto}`);
      }
    }
  }
  // o motivo vira genérico, com status, % e nova previsão
  const ctx = criaCtx({ setor: 'textil', modulos: {} }, []);
  const r = motor.responder(ctx, 'Onde está o meu pedido PV-88213?', { modulo: 'portal', cliente: 'CLI-1042' });
  assert.match(r.texto, /atrasado, previsão de entrega 21\/11/);
  assert.match(r.texto, /ajuste de qualidade em andamento/i);
  assert.ok(!/TIN-03|OS-7731|reprocesso|ΔE/.test(r.texto), r.texto);
  const op = buildTools(motor.visaoDoCliente(ctx, 'CLI-1050'), {}).find((t) => t.name === 'consultar_ordens').execute({});
  assert.deepEqual(op.itens.map((o) => [o.id, o.status, o.progresso, o.previsao_entrega, o.motivo_atraso]),
    [['OP-24522', 'atrasada', 71, '2026-11-19', 'Ajuste de qualidade em andamento']]);
  assert.equal(motor.motivoParaCliente('Tecido estampado chegou 6 dias atrasado e com rapport deslocado (NC-2026-122)'), 'Atraso de fornecedor e ajuste de qualidade em andamento');
  // fora do portal, os dados internos continuam completos
  const interno = buildTools(ctx, {}).find((t) => t.name === 'consultar_clientes_representantes').execute({ id: 'REP-01' });
  assert.equal(interno.itens[0].meta_mes, 920000);
});

teste('portal: preço pela tabela do cliente (sem a resposta pronta da Tabela B)', async () => {
  const ctx = criaCtx({ setor: 'textil', modulos: {} }, []);
  const Q = 'Quero recomprar a camiseta básica 2381. Tem pronta entrega?';
  const v = motor.visaoDoCliente(ctx, 'CLI-1044');
  assert.ok(v.data.perguntas_sugeridas.length && v.data.perguntas_sugeridas.every((p) => p.resposta === undefined), 'sugeridas sem resposta pronta');
  let r = motor.responder(ctx, Q, { modulo: 'portal', cliente: 'CLI-1044' }); // Tabela A: 6% a menos
  assert.match(r.texto, /pela Tabela A, \*\*R\$\s17,77\*\*/);
  assert.ok(!/Tabela B|18,90/.test(r.texto), r.texto);
  r = motor.responder(ctx, Q, { modulo: 'portal', cliente: 'CLI-1042' }); // Tabela B: a de referência
  assert.match(r.texto, /pela Tabela B, \*\*R\$\s18,90\*\*/);
  r = motor.responder(ctx, Q, { modulo: 'portal', cliente: 'CLI-1049' }); // Atacado: 12% a menos
  assert.match(r.texto, /pela Tabela Atacado, \*\*R\$\s16,63\*\*/);
  const t = buildTools(v, {}).find((x) => x.name === 'consultar_estoque_preco').execute({ sku: 'SI-2381' });
  assert.deepEqual([t.itens[0].preco, t.itens[0].tabela], [17.77, 'Tabela A']);
  // tabela sem regra de diferença: preço de referência, dito assim
  const mov = criaCtx({ setor: 'moveis', modulos: {} }, []);
  const cli = mov.data.clientes[0];
  const p = motor.precoNaTabela(mov, mov.data.produtos[0], cli);
  assert.equal(p.preco, mov.data.produtos[0].preco);
  // fora do portal, a pergunta sugerida segue com a resposta pronta
  assert.match(motor.responder(ctx, Q, { modulo: 'comercial' }).texto, /Tabela B, R\$ 18,90/);
});

teste('portal (servidor): modulo portal sem cliente → 400; histórico só com turnos marcados do mesmo cliente', async () => {
  let r = await visitante.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal' });
  assert.equal(r.status, 400);
  assert.match((await r.json()).erro, /cliente/i);
  const ia = cliente(ENV_IA);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const vistos = [];
  const fim = () => sseAnthropic([
    ['content_block_start', { index: 0, content_block: { type: 'text', text: '' } }],
    ['content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'ok' } }],
    ['content_block_stop', { index: 0 }], ['message_delta', { delta: { stop_reason: 'end_turn' } }],
  ]);
  const ff = fetchFalso([(b) => { vistos.push(b.messages); return fim(); }, (b) => { vistos.push(b.messages); return fim(); }]);
  const M = (role, content, cli) => ({ role, content, ...(cli ? { cliente: cli } : {}) });
  const mensagens = [
    M('user', 'Pergunta interna'), M('assistant', 'PV-88227 da Magazine atrasado'),
    M('user', 'Pergunta de outro cliente', 'CLI-1050'), M('assistant', 'Resposta de outro cliente', 'CLI-1050'),
    M('user', 'Onde está o meu pedido?', 'CLI-1042'), M('assistant', 'O PV-88213 chega em 21/11.', 'CLI-1042'),
    M('user', 'E as joggers vão junto?', 'CLI-1042'),
  ];
  await leSSE(await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens, modulo: 'portal', cliente: 'CLI-1042' }, { fetch: ff }));
  assert.deepEqual(vistos[0], [
    { role: 'user', content: 'Onde está o meu pedido?' }, { role: 'assistant', content: 'O PV-88213 chega em 21/11.' },
    { role: 'user', content: 'E as joggers vão junto?' },
  ], 'só a sequência final marcada com o mesmo cliente, sem a marca no que vai para a API');
  // a marca de outro cliente no meio corta o histórico dali para trás
  const mistura = [...mensagens.slice(4, 6), M('user', 'Outra', 'CLI-1050'), M('assistant', 'x', 'CLI-1050'), M('user', 'E agora?', 'CLI-1042')];
  await leSSE(await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: mistura, modulo: 'portal', cliente: 'CLI-1042' }, { fetch: ff }));
  assert.deepEqual(vistos[1], [{ role: 'user', content: 'E agora?' }]);
});

teste('front (assistant.js): pergunta do portal sem cliente usa o cliente padrão do portal (nunca os dados completos)', async () => {
  const fetchOriginal = globalThis.fetch;
  try {
    globalThis.fetch = fetchPelo(visitante, ENV);
    definirClientePortal(null);
    const data = pacote('textil');
    const padrao = motor.clientePadraoDoPortal(data);
    const ass = createAssistant(() => ({ demo: { id: demoId }, api, data }));
    const r = await ass.perguntar({ mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal' });
    const meus = data.pedidos.filter((p) => p.cliente === padrao).map((p) => p.id);
    const outros = data.pedidos.filter((p) => p.cliente !== padrao && p.status === 'atrasado').map((p) => p.id);
    assert.ok(outros.length && outros.every((id) => !r.texto.includes(id)), r.texto);
    assert.ok(r.texto.includes(meus.find((id) => data.pedidos.find((p) => p.id === id).status === 'atrasado') ?? 'Nenhum'), r.texto);
    // cliente explícito vence o "Ver como" atual (o "Tentar de novo" e a sessão recarregada passam o da mensagem)
    definirClientePortal('CLI-1050');
    const r2 = await ass.perguntar({ mensagens: [{ role: 'user', content: ATRASADOS }], modulo: 'portal', cliente: 'CLI-1042' });
    assert.match(r2.texto, /PV-88213/);
    assert.ok(!/PV-88227/.test(r2.texto));
  } finally {
    definirClientePortal(null);
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

teste('motor local: resumo do dia não sequestra pergunta de área, de registro nem de outra tela', async () => {
  const ctx = criaCtx({ setor: 'textil', modulos: {} }, []);
  const RESUMO = /^\*\*Hoje .*; comece /;
  for (const [q, modulo] of [['O que eu preciso ver hoje?', 'visao-geral'], ['O que eu preciso ver hoje?', undefined], ['O que mais preocupa na operação hoje?', undefined], ['Onde devo focar hoje?', 'visao-geral']]) {
    assert.match(motor.responder(ctx, q, { modulo }).texto, RESUMO, `${q} (${modulo})`);
  }
  // registro citado → o registro
  let r = motor.responder(ctx, 'O que eu preciso saber sobre a TIN-03 hoje?', { modulo: 'qualidade' });
  assert.ok(!RESUMO.test(r.texto) && r.fontes.includes('maq:TIN-03'), r.texto);
  // área citada → a lista da área
  r = motor.responder(ctx, 'O que mais preocupa na qualidade?', { modulo: 'qualidade' });
  assert.ok(!RESUMO.test(r.texto), r.texto);
  assert.match(r.texto, /não conformidades? em aberto/);
  assert.ok(r.fontes.every((f) => f.startsWith('nc:')), r.fontes.join(' '));
  r = motor.responder(ctx, 'Qual máquina pede atenção na tinturaria?', {});
  assert.ok(!RESUMO.test(r.texto), r.texto);
  assert.match(r.texto, /fora da operação normal no setor produtivo Tinturaria/);
  assert.ok(r.fontes.includes('maq:TIN-03') && !r.fontes.includes('maq:TEA-12'), r.fontes.join(' '));
  // a mesma pergunta geral feita na tela de uma área vai para a área, não para o resumo (nem a resposta pronta da visão geral)
  r = motor.responder(ctx, 'O que eu preciso ver hoje?', { modulo: 'qualidade' });
  assert.ok(!RESUMO.test(r.texto) && r.fontes.every((f) => f.startsWith('nc:')), r.texto);
  r = motor.responder(ctx, 'O que mais preocupa hoje?', { modulo: 'manutencao' });
  assert.ok(r.fontes.every((f) => /^(maq|os):/.test(f)) && r.fontes.length, r.texto);
});

teste('motor local: severidade e status para o leitor; corte sem pontuação antes do "…"', async () => {
  for (const setor of SETOR_IDS) {
    const ctx = criaCtx({ setor, modulos: {} }, []);
    const r = motor.responder(ctx, 'Quais não conformidades estão abertas?', { modulo: 'qualidade' });
    assert.ok(!/\(media, |\bem_analise\b|severidade media/.test(r.texto), `${setor}: ${r.texto}`);
    for (const n of ctx.data.nao_conformidades.slice(0, 3)) {
      const t = motor.responder(ctx, `Me fale da ${n.id}`, {}).texto;
      assert.ok(!/severidade media\b/.test(t), t);
      assert.ok(!/[,.;:]…/.test(t), `${setor}: ${t}`);
    }
    for (const q of ['O que eu preciso ver hoje?', 'Quais máquinas estão paradas?', 'Quais ordens estão atrasadas?']) {
      const t = motor.responder(ctx, q, { modulo: 'visao-geral' }).texto;
      assert.ok(!/[,.;:]…/.test(t), `${setor}: ${q}: ${t}`);
    }
  }
  assert.match(motor.responder(criaCtx({ setor: 'textil', modulos: {} }, []), 'Quais não conformidades estão abertas?', {}).texto, /\(média, aberta\)|\(média, em análise\)/);
  assert.equal(motor.corta('contra o padrão MAR-07, puxando o tom', 26), 'contra o padrão MAR-07…');
  assert.equal(motor.corta('estoque com 6.200 peças', 17), 'estoque com…');
  assert.equal(motor.corta('estoque com 6. peças', 15), 'estoque com 6…');
  assert.equal(motor.severidadeLabel('media'), 'média');
});

teste('motor local: registro que cita cliente/máquina/pedido pelo nome usa essas entidades em "Nos dados da empresa"', async () => {
  const t = 'O cliente Magazine Horizonte Sul exige aviso de atraso com 5 dias de antecedência, senão aplica multa de 2%.';
  const item = { id: '0000000000009-mhsul1', tipo: 'nota', titulo: t.slice(0, 78), texto: t, area: 'comercial', autor: 'Bia', origem: 'formulario', criado_em: '2026-11-13T10:00:00.000Z' };
  const maq = { id: '0000000000008-jet003', tipo: 'saber', titulo: 'O Jet HT de tingimento 3 precisa de purga extra no inverno', texto: 'Purgar 2 min a mais.', area: 'producao', autor: 'Bia', criado_em: '2026-11-12T10:00:00.000Z' };
  const ctx = criaCtx({ setor: 'textil', modulos: {} }, [maq, item]);
  const q = motor.perguntaDerivada(item, ctx);
  assert.equal(q, 'O que a equipe registrou sobre a Magazine Horizonte Sul?');
  for (const modulo of [undefined, 'comercial']) {
    const r = motor.responder(ctx, q, { modulo });
    assert.equal(r.fontes[0], `aprendizado:${item.id}`);
    const dados = r.texto.split('**Nos dados da empresa:**')[1] ?? '';
    assert.match(dados, /Magazine Horizonte Sul\*\*\[\[cliente:CLI-1050\]\]/);
    assert.match(dados, /PV-88227/, 'os pedidos daquele cliente');
    for (const op of ['OP-24518', 'OP-24530', 'OP-24535']) assert.ok(!dados.includes(op), `não lista todas as OPs atrasadas: ${dados}`);
  }
  // máquina citada pelo nome → pergunta e dados pela máquina
  assert.equal(motor.perguntaDerivada(maq, ctx), 'O que a equipe registrou sobre a TIN-03?');
  const r = motor.responder(ctx, motor.perguntaDerivada(maq, ctx), {});
  assert.equal(r.fontes[0], `aprendizado:${maq.id}`);
  assert.ok(r.fontes.includes('maq:TIN-03'), r.fontes.join(' '));
  // sem entidade no registro: a parte da empresa continua sendo a resposta da pergunta
  const solto = { ...item, id: '0000000000007-solto1', titulo: 'Umidade baixa quebra o fio penteado', texto: 'Ligar a umidificação antes do turno.' };
  const r2 = motor.responder(criaCtx({ setor: 'textil', modulos: {} }, [solto]), motor.perguntaDerivada(solto, ctx), {});
  assert.equal(r2.fontes[0], `aprendizado:${solto.id}`);
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

teste('demo desativada ou expirada: senha certa → 410 "link desativado"; senha errada continua 401; admin ainda abre', async () => {
  const DESATIVADO = { erro: 'Este link foi desativado ou expirou.' };
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: false });
  let r = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 410);
  assert.deepEqual(await r.json(), DESATIVADO);
  r = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha: 'errada' });
  assert.equal(r.status, 401, 'quem só errou a senha não vê a tela de link desativado');
  assert.deepEqual(await r.json(), { erro: 'Link ou senha inválidos' });
  assert.equal((await visitante.req('GET', `/api/demo/${demoId}/estado`)).status, 401);
  r = await admin.req('GET', `/api/demo/${demoId}/estado`);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).admin, true);
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: true, expira_em: '2020-01-01' });
  r = await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 410);
  assert.deepEqual(await r.json(), DESATIVADO);
  assert.equal((await visitante.req('POST', `/api/demo/${demoId}/entrar`, { senha: 'errada' })).status, 401);
});

teste('entrar: depois de 20 senhas erradas na hora, até a certa dá a mesma resposta; cookie malformado não derruba', async () => {
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: true, expira_em: null });
  const outro = cliente();
  const rs = await Promise.all(Array.from({ length: 20 }, () => outro.req('POST', `/api/demo/${demoId}/entrar`, { senha: 'errada' })));
  assert.ok(rs.every((r) => r.status === 401));
  const r = await outro.req('POST', `/api/demo/${demoId}/entrar`, { senha });
  assert.equal(r.status, 401);
  assert.deepEqual(await r.json(), { erro: 'Link ou senha inválidos' });
  // no limite de tentativas, a senha certa de uma demo desativada também é 401 (não revela o 410)
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: false });
  assert.equal((await outro.req('POST', `/api/demo/${demoId}/entrar`, { senha })).status, 401);
  await admin.req('PATCH', `/api/admin/demos/${demoId}`, { ativo: true });
  assert.equal((await cliente().req('GET', `/api/demo/${demoId}/estado`, undefined, { headers: { cookie: 'x=%E0%A4%A' } })).status, 401);
});

teste('acessos concorrentes não desfazem o PATCH do admin (ativo, senha, expira_em)', async () => {
  const { demo: dc, senha: s0 } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Corrida', setor: 'textil' })).json();
  let senhaAtual = s0, oks = 0, sessoesComAcesso = 0;
  for (let rodada = 0; rodada < 5; rodada++) {
    let oksDaRodada = 0;
    const v = cliente();
    assert.equal((await v.req('POST', `/api/demo/${dc.id}/entrar`, { senha: senhaAtual })).status, 200);
    // ondas de 15 GET /estado em paralelo enquanto o PATCH desativa, troca a senha e muda o prazo
    let feito = false;
    const patch = admin.req('PATCH', `/api/admin/demos/${dc.id}`, { ativo: false, nova_senha: true, expira_em: '2030-01-0' + (rodada + 1) })
      .finally(() => { feito = true; });
    do {
      const rs = await Promise.all(Array.from({ length: 15 }, () => v.req('GET', `/api/demo/${dc.id}/estado`)));
      oksDaRodada += rs.filter((r) => r.status === 200).length;
    } while (!feito);
    oks += oksDaRodada;
    if (oksDaRodada) sessoesComAcesso++;
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
  // um acesso por sessão a cada 10 min: os GETs paralelos de cada rodada (mesma sessão) contam uma vez
  const d = (await (await admin.req('GET', '/api/admin/demos')).json()).find((x) => x.id === dc.id);
  assert.ok(oks > sessoesComAcesso, 'houve GETs paralelos na mesma sessão');
  assert.equal(d.acessos, sessoesComAcesso, 'listagem soma os acessos (um por sessão)');
  assert.ok(sessoesComAcesso > 0 && Date.parse(d.ultimo_acesso) > Date.now() - 60e3);
  const um = await (await admin.req('GET', `/api/admin/demos/${dc.id}`)).json();
  assert.equal(um.acessos, sessoesComAcesso);
  const { demo: aposPatch } = await (await admin.req('PATCH', `/api/admin/demos/${dc.id}`, { nota: 'x' })).json();
  assert.equal(aposPatch.acessos, sessoesComAcesso, 'resposta do PATCH traz os acessos agregados');
  assert.equal((await admin.req('DELETE', `/api/admin/demos/${dc.id}`, undefined)).status, 200);
  assert.deepEqual(await store.list(`acessos/${dc.id}/`), []);
});

/** sid da sessão de demo (payload do cookie td_<id>). */
const sidDe = (c, id) => JSON.parse(Buffer.from(decodeURIComponent(c.pote[`td_${id}`]).split('.')[0], 'base64url')).sid;

teste('acessos: um por sessão a cada 10 min; outra sessão conta; janela anterior com menos de 10 min não grava', async () => {
  const { demo: da, senha: sa } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Acessos', setor: 'textil' })).json();
  const v1 = cliente(), v2 = cliente();
  assert.equal((await v1.req('POST', `/api/demo/${da.id}/entrar`, { senha: sa })).status, 200);
  assert.equal((await v2.req('POST', `/api/demo/${da.id}/entrar`, { senha: sa })).status, 200);
  for (let i = 0; i < 3; i++) assert.equal((await v1.req('GET', `/api/demo/${da.id}/estado`)).status, 200);
  await Promise.all(Array.from({ length: 5 }, () => v2.req('GET', `/api/demo/${da.id}/estado`)));
  let chaves = await store.list(`acessos/${da.id}/`);
  assert.equal(chaves.length, 2, chaves.join(' '));
  const s1 = sidDe(v1, da.id);
  assert.match(s1, /^[a-f0-9]{12}$/);
  assert.ok(chaves.some((k) => k.endsWith(`-${s1}`)));
  // janela anterior: com acesso há 5 min não grava; há 11 min grava
  const J = 10 * 60 * 1000, agora = Date.now(), janela = Math.floor(agora / J) * J;
  await store.delete(chaves.find((k) => k.endsWith(`-${s1}`)));
  const ant = `acessos/${da.id}/${String(janela - J).padStart(13, '0')}-${s1}`;
  await store.set(ant, { em: new Date(agora - 5 * 60 * 1000).toISOString() });
  await v1.req('GET', `/api/demo/${da.id}/estado`);
  assert.equal((await store.list(`acessos/${da.id}/`)).length, 2, 'menos de 10 min desde o último: não grava');
  await store.set(ant, { em: new Date(agora - 11 * 60 * 1000).toISOString() });
  await v1.req('GET', `/api/demo/${da.id}/estado`);
  assert.equal((await store.list(`acessos/${da.id}/`)).length, 3, 'mais de 10 min: grava');
  await admin.req('DELETE', `/api/admin/demos/${da.id}`, undefined);
});

teste('acessos: a listagem do admin compacta as chaves antigas em acessos_resumo/<id> sem contar duas vezes', async () => {
  const { demo: dk } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Compacta', setor: 'textil' })).json();
  const hora = Date.now() - 3 * 3600e3;
  for (let i = 0; i < 7; i++) await store.set(`acessos/${dk.id}/${String(hora + i * 60e3).padStart(13, '0')}-velha${i}0`, { em: new Date(hora + i * 60e3).toISOString() });
  await store.set(`acessos/${dk.id}/${String(hora - 1).padStart(13, '0')}-abcd1234`, { em: new Date(hora - 1).toISOString() }); // formato antigo
  const recente = `acessos/${dk.id}/${String(Date.now()).padStart(13, '0')}-recente01`;
  await store.set(recente, { em: new Date().toISOString() });
  const lista = async () => (await (await admin.req('GET', '/api/admin/demos')).json()).find((x) => x.id === dk.id);
  let d = await lista();
  assert.equal(d.acessos, 9);
  assert.deepEqual(await store.list(`acessos/${dk.id}/`), [recente], 'as somadas foram apagadas; a recente fica');
  const resumo = await store.get(`acessos_resumo/${dk.id}`);
  assert.equal(resumo.total, 8);
  assert.equal(resumo.ultimo_acesso, new Date(hora + 6 * 60e3).toISOString());
  d = await lista();
  assert.equal(d.acessos, 9, 'listar de novo não soma de novo');
  assert.equal((await (await admin.req('GET', `/api/admin/demos/${dk.id}`)).json()).acessos, 9);
  // apagar que falhou depois de gravar o resumo: a chave que ficou (<= ate) não conta de novo e é limpa
  const sobra = `acessos/${dk.id}/${String(hora + 60e3).padStart(13, '0')}-velha10`;
  await store.set(sobra, { em: 'x' });
  assert.equal((await lista()).acessos, 9);
  assert.deepEqual(await store.list(`acessos/${dk.id}/`), [recente]);
  // chaves órfãs (demo que não existe mais) somem na listagem
  await store.set('acessos/zzzzzzzzzzzz/0000000000001-orfa0001', { em: 'x' });
  await store.set('aprendizado/zzzzzzzzzzzz/0000000000001-orfa01', { id: 'x' });
  await lista();
  assert.deepEqual([...await store.list('acessos/zzzzzzzzzzzz/'), ...await store.list('aprendizado/zzzzzzzzzzzz/')], []);
  await admin.req('DELETE', `/api/admin/demos/${dk.id}`, undefined);
  assert.equal(await store.get(`acessos_resumo/${dk.id}`), null);
});

teste('apagar demo: lotes de 50 e demo/<id> sai primeiro (falha no meio não deixa o link vivo)', async () => {
  const { demo: dx, senha: sx } = await (await admin.req('POST', '/api/admin/demos', { nome: 'Apagar', setor: 'textil' })).json();
  for (let i = 0; i < 120; i++) await store.set(`acessos/${dx.id}/${String(1e12 + i).padStart(13, '0')}-k${String(i).padStart(7, '0')}`, { em: 'x' });
  // store que conta deleções simultâneas e falha na 70ª
  let ativos = 0, maxAtivos = 0, n = 0;
  const falha = Object.create(store);
  falha.delete = async (k) => {
    n++;
    if (n === 70) throw new Error('falha simulada');
    ativos++; maxAtivos = Math.max(maxAtivos, ativos);
    try { await store.delete(k); } finally { ativos--; }
  };
  falha.list = (p) => store.list(p); falha.get = (k) => store.get(k); falha.set = (k, v) => store.set(k, v);
  const r = await handle(new Request(`${ORIGEM}/api/admin/demos/${dx.id}`, { method: 'DELETE', headers: { origin: ORIGEM, cookie: `ta=${admin.pote.ta}` } }), { env: ENV, store: falha });
  assert.equal(r.status, 500);
  assert.equal(await store.get(`demo/${dx.id}`), null, 'o registro da demo saiu antes da falha');
  assert.ok(maxAtivos <= 50, `no máximo 50 deleções ao mesmo tempo (${maxAtivos})`);
  assert.equal((await cliente().req('POST', `/api/demo/${dx.id}/entrar`, { senha: sx })).status, 401, 'o link não está vivo');
  // a listagem limpa o que sobrou
  await admin.req('GET', '/api/admin/demos');
  assert.deepEqual(await store.list(`acessos/${dx.id}/`), []);
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
