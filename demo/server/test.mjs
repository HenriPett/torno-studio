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

teste('teto diário: passa do limite → resposta local com aviso', async () => {
  const env = { ...ENV_IA, DEMO_DAILY_MESSAGES: '1' };
  const ia = cliente(env);
  ia.pote[`td_${demoId}`] = visitante.pote[`td_${demoId}`];
  const ff = fetchFalso([]);
  const r = await ia.req('POST', `/api/demo/${demoId}/conversa`, { mensagens: [{ role: 'user', content: 'Quais ordens estão atrasadas?' }] }, { fetch: ff });
  const ev = await leSSE(r);
  assert.equal(ev.at(-1).dados.modo, 'local');
  assert.match(ev.at(-1).dados.aviso, /limite/);
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

teste('DELETE da demo apaga aprendizado e uso', async () => {
  await visitante.req('POST', `/api/demo/${demoId}/aprendizado`, { tipo: 'nota', titulo: 'a', texto: 'b', area: 'gestao' }).catch(() => {});
  const r = await admin.req('DELETE', `/api/admin/demos/${demoId}`, undefined);
  assert.equal(r.status, 200);
  assert.deepEqual(await store.list(`aprendizado/${demoId}/`), []);
  assert.deepEqual(await store.list(`uso/${demoId}/`), []);
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
