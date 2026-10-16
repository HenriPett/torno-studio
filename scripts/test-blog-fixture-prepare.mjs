// Generates synthetic editorial records ONLY under the private fixture root.
// They are technical test data, never real articles or publication approvals.
// Usage: node scripts/test-blog-fixture-prepare.mjs
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { stringify } from 'yaml';

const root = '/private/tmp/torno-blog-fixtures-20261014';
const content = join(root, 'content');
const at = '2026-10-14T20:00:00Z';
await mkdir(content, { recursive: true });

const base = (id, locale, status, path, marker) => ({
  content_id: id, intent_id: `qa-${id}`, locale, type: 'artigo', status,
  working_title: null, h1: null, summary: null, primary_question: null,
  proposed_path: path, canonical_url: path ? `https://tornostudio.com${path}` : null,
  url_owner: null, audience: null, buyer_stage: null, scope: null, not_scope: null,
  author_name: null, author_basis: null, reviewer: null, reviewed_at: null,
  release_approved_by: null, release_approved_at: null, release_approval_evidence: null,
  created_at: '2026-10-13T08:00:00Z', first_published_at: null,
  last_substantive_update_at: null, verified_at: null,
  claims_and_sources: [], internal_links: [], translation_of: null,
  translation_status: null, evidence_of_publication: null, indexation_observation: null,
  _marker: marker,
});
const ready = (d, title, question) => Object.assign(d, {
  working_title: title, h1: title,
  summary: `${title}. Nota sintética exclusiva da suíte QA; não representa conteúdo editorial aprovado para publicação.`,
  primary_question: question,
  url_owner: 'QA fixture privada', audience: 'Leitor de fixture técnica',
  buyer_stage: 'aprendizado', scope: 'Exemplo sintético de estrutura editorial',
  not_scope: 'Oferta, resultado de cliente ou recomendação real',
  author_name: 'Autor de fixture privada',
  author_basis: 'Conteúdo sintético de QA, sem autorização de publicação',
  reviewer: 'Revisor de fixture privada', reviewed_at: '2026-10-13T09:00:00Z',
  release_approved_by: 'QA privado', release_approved_at: '2026-10-13T09:30:00Z',
  release_approval_evidence: 'PRIVATE_FIXTURE_DO_NOT_DEPLOY',
});

const rows = [
  ready(base('qa-published-pt','pt-BR','published','/blog/qa-registro-de-handover/','QA-PRIVATE-PUBLISHED-PT-HANDOVER'),
    'Registro de handover: fixture técnica', 'Como registrar um handover técnico?'),
  ready(base('qa-pair-pt','pt-BR','approved','/blog/qa-par-equivalente/','QA-PRIVATE-APPROVED-PT-PAIR'),
    'Decisão de escopo: fixture técnica', 'Como registrar uma decisão de escopo?'),
  ready(base('qa-pair-en','en','approved','/en/blog/qa-equivalent-pair/','QA-PRIVATE-APPROVED-EN-PAIR'),
    'Scope decision: private QA fixture', 'How should a scope decision be recorded?'),
  base('qa-draft','pt-BR','draft','/blog/qa-draft/','QA-PRIVATE-HIDDEN-DRAFT'),
  base('qa-review','pt-BR','review','/blog/qa-review/','QA-PRIVATE-HIDDEN-REVIEW'),
  ready(base('qa-approved-isolated','pt-BR','approved','/blog/qa-approved-isolado/','QA-PRIVATE-HIDDEN-APPROVED'),
    'Aprovação isolada: fixture técnica', 'O que acontece sem entry no manifesto?'),
  base('qa-hold','pt-BR','hold_cannibalization','/blog/qa-hold/','QA-PRIVATE-HIDDEN-HOLD'),
  base('qa-retired','pt-BR','retired','/blog/qa-retired/','QA-PRIVATE-HIDDEN-RETIRED'),
  base('qa-no-go','pt-BR','no_go','/blog/qa-no-go/','QA-PRIVATE-HIDDEN-NO-GO'),
  ready(base('qa-future','pt-BR','published','/blog/qa-futuro/','QA-PRIVATE-HIDDEN-FUTURE'),
    'Data futura: fixture técnica', 'O que acontece com data futura?'),
];
rows[0].verified_at = '2026-10-13T10:05:00Z';
rows[0].first_published_at = '2026-10-13T10:00:00Z';
rows[0].evidence_of_publication = {
  url: rows[0].canonical_url, canonical: rows[0].canonical_url,
  http_status: 200, noindex: false, artifact: 'PRIVATE_FIXTURE_DO_NOT_DEPLOY',
};
const future = rows.at(-1);
future.verified_at = '2026-10-13T10:05:00Z';
future.first_published_at = '2026-10-15T00:00:00Z';
future.evidence_of_publication = {
  url: future.canonical_url, canonical: future.canonical_url,
  http_status: 200, noindex: false, artifact: 'PRIVATE_FIXTURE_DO_NOT_DEPLOY',
};
rows[1].intent_id = rows[2].intent_id = 'qa-equivalent-scope';
rows[1].translation_of = rows[2].content_id;
rows[2].translation_of = rows[1].content_id;
for (const row of [rows[1], rows[2]]) row.translation_status = {
  status: 'approved', scope_equivalent: true,
  evidence: 'Revisão sintética de escopo da fixture privada',
  reviewed_by: 'Revisor de fixture privada', reviewed_at: '2026-10-13T09:15:00Z',
};

const hashes = new Map();
for (const row of rows) {
  const { _marker: marker, ...frontmatter } = row;
  const link = row.locale === 'en' ? '/en/software-project-rescue/' : '/recuperacao-de-projeto/';
  let body = `${marker}. Conteúdo sintético privado para verificar estado, idioma e links.\n\n[Próxima etapa](${link})\n`;
  if (row.content_id === 'qa-published-pt') body += '\n```text\n' + 'coluna_muito_longa_'.repeat(30) + '\n```\n\n| Etapa | Observação longa |\n| --- | --- |\n| QA | ' + 'conteúdo largo '.repeat(25) + '|\n';
  if (row.content_id === 'qa-pair-en') body += '\n| Stage | Long observation |\n| --- | --- |\n| QA | ' + 'wide content '.repeat(25) + '|\n';
  const raw = `---\n${stringify(frontmatter)}---\n\n${body}`;
  await writeFile(join(content, `${row.content_id}.md`), raw);
  hashes.set(row.content_id, createHash('sha256').update(raw).digest('hex'));
}
const expected = {
  visible: rows.slice(0, 3).map((row) => ({
    path: row.proposed_path, locale: row.locale, status: row.status, marker: row._marker,
    author: row.author_name, publishedAt: row.first_published_at,
    updatedAt: row.last_substantive_update_at,
    pair: row.content_id === 'qa-pair-pt' ? rows[2].proposed_path : row.content_id === 'qa-pair-en' ? rows[1].proposed_path : null,
  })),
  hidden: rows.slice(3).map((row) => ({ path: row.proposed_path, status: row.status, marker: row._marker })),
};
await writeFile(join(root, 'expected.json'), JSON.stringify(expected, null, 2) + '\n');
const approval = (row) => ({
  contentId: row.content_id, locale: row.locale, contentRevision: hashes.get(row.content_id),
  path: row.proposed_path, approvedBy: 'QA privado', approvedAt: '2026-10-13T09:30:00Z',
});
await writeFile(join(root, 'release-manifest.json'), JSON.stringify({ entries: [approval(rows[1]), approval(rows[2])] }, null, 2) + '\n');
await writeFile(join(root, 'PRIVATE_FIXTURE_DO_NOT_DEPLOY'), 'Synthetic QA content. Never deploy or publish.\n');
console.log(`Prepared ${rows.length} private Markdown records at ${content}; 2 private release entries; build clock: ${at}`);
