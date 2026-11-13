// Teste de mesa do renderizador de Markdown (sem DOM): node demo/web/src/ui/markdown.test.mjs
import assert from 'node:assert/strict';
import {
  markdownToHtml as md, parseMarkdown, cortaParcial, criaCitas, refsDoTexto, textoParaCopiar, markdownToText,
} from './markdown.js';

let n = 0;
const casos = [];
const caso = (nome, fn) => casos.push([nome, fn]);
const semAsterisco = (html) => assert.ok(!/\*/.test(html.replace(/<[^>]+>/g, '')), `asterisco literal em: ${html}`);

caso('parágrafos e quebra simples', () => {
  assert.equal(md('Linha um\nlinha dois\n\nOutro parágrafo.'), '<p>Linha um<br>linha dois</p><p>Outro parágrafo.</p>');
});

caso('negrito, itálico, código', () => {
  assert.equal(md('Há **4 OPs atrasadas** e *uma* em `análise`.'), '<p>Há <strong>4 OPs atrasadas</strong> e <em>uma</em> em <code>análise</code>.</p>');
  assert.equal(md('__forte__ e _leve_'), '<p><strong>forte</strong> e <em>leve</em></p>');
  assert.equal(md('snake_case_id fica'), '<p>snake_case_id fica</p>');
  assert.equal(md('5 * 3 = 15'), '<p>5 * 3 = 15</p>'); // aritmética com espaços fica
});

caso('listas com e sem número, aninhada', () => {
  assert.equal(md('Resumo:\n- **OP-1** atrasada\n- OP-2\n  - detalhe\n* outra'),
    '<p>Resumo:</p><ul><li><strong>OP-1</strong> atrasada</li><li>OP-2<ul><li>detalhe</li></ul></li><li>outra</li></ul>');
  assert.equal(md('1. um\n2. dois'), '<ol><li>um</li><li>dois</li></ol>');
  assert.equal(md('• bolinha'), '<ul><li>bolinha</li></ul>');
  assert.equal(md('3. três\n4. quatro'), '<ol start="3"><li>três</li><li>quatro</li></ol>');
});

caso('títulos viram h4', () => {
  assert.equal(md('# A\n## B\n### C'), '<h4>A</h4><h4>B</h4><h4>C</h4>');
});

caso('tabela GFM com números à direita e rolagem', () => {
  const t = md('| Máquina | Situação | Horas |\n|---|---|---|\n| TEA-12 | Parada | 1.200 |\n| TIN-03 | **Alerta** | 41,5 |');
  assert.equal(t, '<div class="md-table"><table><thead><tr><th>Máquina</th><th>Situação</th><th align="right">Horas</th></tr></thead>' +
    '<tbody><tr><td>TEA-12</td><td>Parada</td><td align="right">1.200</td></tr><tr><td>TIN-03</td><td><strong>Alerta</strong></td><td align="right">41,5</td></tr></tbody></table></div>');
});

caso('citação, link e HTML cru', () => {
  assert.equal(md('> nota importante'), '<blockquote><p>nota importante</p></blockquote>');
  assert.equal(md('veja [o site](https://x.com)'), '<p>veja o site</p>');
  assert.equal(md('<img src=x onerror=alert(1)> <b>oi</b>'), '<p>&lt;img src=x onerror=alert(1)&gt; &lt;b&gt;oi&lt;/b&gt;</p>');
});

caso('marcadores de fonte viram sobrescritos numerados (reuso e filtro)', () => {
  const citas = criaCitas({ aceita: (r) => !r.startsWith('maq:') });
  const h = md('A **OP-1**[[op:OP-1]] e a **TIN-03**[[maq:TIN-03]] (de novo [[op:OP-1]]) e [[nc:N-2]].', { citas });
  assert.equal(h, '<p>A <strong>OP-1</strong><sup data-ref="op:OP-1">1</sup> e a <strong>TIN-03</strong> (de novo <sup data-ref="op:OP-1">1</sup>) e <sup data-ref="nc:N-2">2</sup>.</p>');
  assert.deepEqual(citas.completar(['kpi:x', 'op:OP-1']), ['op:OP-1', 'nc:N-2', 'kpi:x']);
  assert.deepEqual(refsDoTexto('a [[op:1]] b [[ doc:D#t1 ]] [[op:1]]'), ['op:1', 'doc:D#t1']);
});

caso('streaming: nada de marcador cru em nenhum prefixo', () => {
  const final = 'Hoje há **4 OPs atrasadas** e *2 máquinas* paradas.[[op:OP-24518]]\n\n- **OP-24518** · moletom: reprocesso[[op:OP-24518]]\n- `TEA-12` parado\n\n| Máquina | Situação |\n|---|---|\n| TEA-12 | Parada |\n| TIN-03 | Alerta |\n\nFim.';
  for (let k = 1; k <= final.length; k++) {
    const pref = final.slice(0, k);
    const html = md(pref, { parcial: true });
    semAsterisco(html);
    const vis = html.replace(/<[^>]+>/g, '');
    assert.ok(!/\[\[|\]\]|`/.test(vis), `marcador cru no prefixo ${k}: ${vis}`);
    assert.ok(!/\|/.test(vis), `pipe de tabela cru no prefixo ${k}: ${JSON.stringify(pref.slice(-30))} → ${vis}`);
  }
  // a tabela só aparece com o separador
  assert.ok(!md('| a | b |\n|-', { parcial: true }).includes('<table>'));
  assert.ok(md('| a | b |\n|---|---|\n', { parcial: true }).includes('<table>'));
  // negrito otimista durante o streaming
  assert.equal(md('Há **4 OPs', { parcial: true }), '<p>Há <strong>4 OPs</strong></p>');
  assert.equal(md('Há **', { parcial: true }), '<p>Há</p>');
  assert.equal(md('ver [[op:OP-2', { parcial: true }), '<p>ver</p>');
  assert.equal(cortaParcial('x [[op:1]'), 'x ');
});

caso('texto final: delimitador sem par não sobra', () => {
  for (const s of ['**sem fim', 'texto* solto', '*abre', 'a ** b', 'fim **', '***x***', '**a *b* c**']) semAsterisco(md(s));
  assert.equal(md('***x***'), '<p><strong><em>x</em></strong></p>');
  assert.equal(md('**a *b* c**'), '<p><strong>a <em>b</em> c</strong></p>');
});

caso('texto do motor local renderiza limpo', () => {
  const t = '**OP-24518**[[op:OP-24518]] · Moletom (SI-5120): atrasada, 48% concluída.\n- 3.600 peças no setor produtivo Tinturaria; prazo 12/11.\n- **Motivo do atraso:** Lote 3 reprovado.';
  const h = md(t);
  semAsterisco(h);
  assert.ok(h.startsWith('<p><strong>OP-24518</strong><sup data-ref="op:OP-24518">1</sup>'));
  assert.ok(h.includes('<ul><li>3.600'));
});

caso('copiar: sem marcadores, com Fontes no fim; texto puro', () => {
  assert.equal(textoParaCopiar('A **OP-1**[[op:OP-1]] atrasou [[os:OS-2]].', [{ n: 1, tipo: 'Ordem de produção', rotulo: 'OP-1 · Moletom' }, { n: 2, rotulo: 'OS-2' }]),
    'A **OP-1** atrasou.\n\nFontes:\n1. Ordem de produção: OP-1 · Moletom\n2. OS-2');
  assert.equal(markdownToText('**A** e _b_\n- c'), 'A e b\n\n• c');
});

caso('estrutura: parseMarkdown devolve árvore', () => {
  const a = parseMarkdown('# T\n\n- a\n- b');
  assert.deepEqual(a.map((b) => b.t), ['h', 'ul']);
  assert.equal(a[1].itens.length, 2);
});

let falhas = 0;
for (const [nome, fn] of casos) {
  try { fn(); n++; console.log(`ok  ${nome}`); } catch (e) { falhas++; console.log(`FALHA ${nome}\n  ${e.message}`); }
}
console.log(`\n${n}/${casos.length} passaram`);
process.exit(falhas ? 1 : 0);
