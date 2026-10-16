// Runs isolated private fixture builds that MUST fail closed.
// Each scenario is a directory under /private/tmp/torno-blog-fixtures-20261014/negative/
// with content/*.md and release-manifest.json. No source in this repository is edited.
import { spawnSync } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { assert, runChecks } from './test-blog-common.mjs';

const root = '/private/tmp/torno-blog-fixtures-20261014';
const scenarios = [
  'invalid-timezone', 'invalid-calendar', 'duplicate-canonical',
  'reserved-intent', 'mismatched-translation-intent',
  'markdown-link-to-draft', 'historic-no-go-slug', 'missing-author', 'missing-release-approval',
];
const reason = {
  'invalid-timezone': /ISO timestamp with timezone required/,
  'invalid-calendar': /invalid date/,
  'duplicate-canonical': /duplicate path or intention/,
  'reserved-intent': /reserved intention/,
  'mismatched-translation-intent': /translation intention\/locale mismatch/,
  'markdown-link-to-draft': /broken or invisible link/,
  'historic-no-go-slug': /no_go slug/,
  'missing-author': /author_name required for release/,
  'missing-release-approval': /release_approved_by required for release/,
};
const wrapper = '/private/tmp/torno-blog-build.py';
const buildAt = '2026-10-14T20:00:00Z';
const only = process.argv[2] === '--only' ? process.argv[3] : null;
if (only) assert(scenarios.includes(only), `cenário desconhecido: ${only}`);

await stat(wrapper);
const cases = scenarios.filter((name) => !only || name === only).map((name) => [`fail-closed ${name}`, async () => {
  const dir = join(root, 'negative', name);
  const source = await readdir(join(dir, 'content'));
  assert(source.some((file) => file.endsWith('.md')), 'cenário sem Markdown');
  const safeName = name === 'missing-release-approval' ? 'missing-approval' : name;
  const output = `/private/tmp/torno-blog-neg-${safeName}-20261014`;
  const result = spawnSync('python3', [wrapper, '--fixture-dir', dir, '--build-at', buildAt, '--output', output], {
    cwd: process.cwd(), encoding: 'utf8', timeout: 180000,
  });
  assert(!result.error, `runner falhou: ${result.error?.message}`);
  assert(result.status !== 0, `build inválido passou: ${name}`);
  const outputText = result.stdout + result.stderr;
  assert(reason[name].test(outputText), `rejeição pelo motivo errado em ${name}: ${outputText.slice(-400)}`);
  let finalized = true;
  try { await stat(join(output, 'build-meta.json')); } catch (error) { if (error.code === 'ENOENT') finalized = false; else throw error; }
  assert(!finalized, `build inválido gerou manifesto final: ${name}`);
  console.log(`  expected rejection: ${outputText.match(reason[name])?.[0]}`);
}]);
await runChecks(cases);
