/** Editorial contract: one publication decision, persisted before Astro builds. */
import { readFile, readdir, mkdir, writeFile, rename, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { parse } from 'yaml';
export const BLOG_ORIGIN = 'https://tornostudio.com';
export const BLOG_STATES = ['draft','review','approved','published','hold_cannibalization','retired','no_go'];
export const blogIndexPath = locale => locale === 'en' ? '/en/blog/' : '/blog/';
const reserved = new Set(['recovery-commercial','lovable-production-commercial','rls-multitenant-howto']);
const blockedSlugs = new Set(['quanto-custa-sistema-sob-medida','prototipo-para-producao']);
export const sha256 = value => createHash('sha256').update(value).digest('hex');
const fail = message => { throw new Error(`[blog] ${message}`); };
const text = value => typeof value === 'string' && value.trim().length > 0;
export function timestamp(value, label) {
  if (!text(value) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) fail(`${label}: ISO timestamp with timezone required`);
  const day = value.slice(0,10);
  if (new Date(`${day}T00:00:00Z`).toISOString().slice(0,10) !== day || !Number.isFinite(Date.parse(value))) fail(`${label}: invalid date`);
  return Date.parse(value);
}
export function validateRecord(data, body, buildAt, releaseApproval = null) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('frontmatter object required');
  const d = data;
  for (const key of ['content_id','intent_id','locale','type','status']) if (!text(d[key])) fail(`${key} required`);
  if (!['pt-BR','en'].includes(d.locale) || d.type !== 'artigo' || !BLOG_STATES.includes(d.status)) fail(`${d.content_id}: invalid locale/type/state`);
  const now = timestamp(buildAt,'buildAt');
  for (const key of ['created_at','reviewed_at','verified_at','first_published_at','last_substantive_update_at','release_approved_at']) {
    if (d[key] != null) timestamp(d[key],key);
  }
  for (const key of ['created_at','reviewed_at','verified_at','release_approved_at']) if (d[key] != null && Date.parse(d[key]) > now) fail(`${key}: future observation`);
  if (d.last_substantive_update_at != null && (!d.first_published_at || Date.parse(d.last_substantive_update_at) <= Date.parse(d.first_published_at))) fail('update requires later substantive date');
  const isCandidate = ['approved','published'].includes(d.status);
  if (!isCandidate) return false;
  if (d.status === 'approved' && !releaseApproval) return false;
  for (const key of ['working_title','h1','summary','primary_question','proposed_path','canonical_url','url_owner','audience','buyer_stage','scope','not_scope','author_name','author_basis','reviewer','reviewed_at','release_approved_by','release_approved_at','release_approval_evidence']) if (!text(d[key])) fail(`${d.content_id}: ${key} required for release`);
  if (!text(body)) fail('body required for release');
  if (reserved.has(d.intent_id)) fail(`reserved intention: ${d.intent_id}`);
  const prefix = blogIndexPath(d.locale);
  if (!d.proposed_path.startsWith(prefix) || !/^[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(d.proposed_path.slice(prefix.length))) fail('invalid blog path');
  const slug = d.proposed_path.slice(prefix.length,-1);
  if (blockedSlugs.has(slug)) fail(`no_go slug: ${slug}; reapproval must update the registry explicitly`);
  if (d.canonical_url !== BLOG_ORIGIN + d.proposed_path) fail('canonical must use final origin and exact path');
  if (!Array.isArray(d.claims_and_sources) || !Array.isArray(d.internal_links)) fail('sources and internal_links arrays required');
  for (const source of d.claims_and_sources) {
    if (!source || !['FATO','ESTIMATIVA','HIPÓTESE'].includes(source.classification) || !text(source.claim) || !text(source.reference) || !text(source.entity) || !text(source.limit)) fail('invalid claim/source');
    timestamp(source.checked_at,'source.checked_at');
    if (Date.parse(source.checked_at)>now) fail('future source check');
  }
  for (const link of d.internal_links) if (!link || !text(link.path) || !text(link.reason)) fail('internal link requires path/reason');
  if (d.status === 'published') {
    if (!d.verified_at || !d.evidence_of_publication || typeof d.evidence_of_publication !== 'object') fail('published requires public evidence and verified_at');
    const e=d.evidence_of_publication;
    if (e.url !== d.canonical_url || e.canonical !== d.canonical_url || e.http_status !== 200 || e.noindex !== false || !text(e.artifact)) fail('invalid publication evidence');
  }
  // Unknown publication time stays null. A known future date never creates a route.
  if ([d.first_published_at,d.last_substantive_update_at].some(v=>v != null && Date.parse(v)>now)) return false;
  return true;
}
async function markdownFiles(dir) {
  try { await stat(dir); } catch (e) { if(e.code==='ENOENT')return []; throw e; }
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.isSymbolicLink()) fail('content symlinks are forbidden');
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) out.push(...await markdownFiles(file));
    else if(entry.isFile() && entry.name.endsWith('.md'))out.push(file);
  }
  return out.sort();
}
export async function prepareBlogManifest(root, buildAt) {
  const source=path.join(root,'src/content/blog');
  let approvals={entries:[]};
  try { approvals=JSON.parse(await readFile(path.join(root,'.astro/blog-release-approval.json'),'utf8')); } catch(e) { if(e.code!=='ENOENT')throw e; }
  if(!Array.isArray(approvals.entries))fail('invalid release approval manifest');
  const entries=[];const ids=new Set();const paths=new Set();const intents=new Set();
  const sourceHashes={};
  for(const file of await markdownFiles(source)) {
    const raw=await readFile(file,'utf8');
    const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
    if(!match)fail(`frontmatter missing: ${file}`);
    const d=parse(match[1],{uniqueKeys:true});
    const approval=approvals.entries.find(a=>a.contentId===d.content_id && a.locale===d.locale);
    if(approval && (approval.contentRevision!==sha256(raw) || approval.path!==d.proposed_path || !text(approval.approvedBy) || !text(approval.approvedAt)))fail('release approval hash/path mismatch');
    if(approval)timestamp(approval.approvedAt,'release decision');
    const eligible=validateRecord(d,match[2],buildAt,approval);
    if(ids.has(d.content_id))fail(`duplicate content_id: ${d.content_id}`);ids.add(d.content_id);
    const relative=path.relative(root,file);sourceHashes[relative]=sha256(raw);
    if(!eligible)continue;
    const key=`${d.intent_id}:${d.locale}`;
    if(paths.has(d.proposed_path)||intents.has(key))fail('duplicate path or intention');
    paths.add(d.proposed_path);intents.add(key);
    entries.push({id:d.content_id,collectionId:path.relative(source,file).replace(/\.md$/,'').toLowerCase(),file:relative,hash:sha256(raw),path:d.proposed_path,slug:d.proposed_path.split('/').filter(Boolean).at(-1),locale:d.locale,data:d,alternates:[]});
  }
  for(const e of entries) {
    const d=e.data;
    if(d.translation_of == null)continue;
    const other=entries.find(x=>x.id===d.translation_of);
    // An unavailable translation is not an alternate.
    if(!other)continue;
    if(other.locale===e.locale || other.data.intent_id!==d.intent_id)fail('translation intention/locale mismatch');
    if(other.data.translation_of!==e.id)fail('translation pair must be reciprocal by content_id');
    const approval=d.translation_status;
    if(!approval || typeof approval!=='object' || approval.status!=='approved' || approval.scope_equivalent!==true || !text(approval.evidence) || !text(approval.reviewed_by))fail('translation needs verified scope equivalence');
    timestamp(approval.reviewed_at,'translation reviewed_at');
    if(Date.parse(approval.reviewed_at)>Date.parse(buildAt))fail('future translation approval');
    // Both release approvals are required by validateRecord; this explicit review covers the pair.
    const alts=[e,other].map(x=>({hreflang:x.locale,href:BLOG_ORIGIN+x.path}));
    alts.push({hreflang:'x-default',href:BLOG_ORIGIN+[e,other].find(x=>x.locale==='en').path});
    e.alternates=alts;
  }
  const manifest={version:1,buildAt,sourceHashes,entries};
  const dir=path.join(root,'.astro');await mkdir(dir,{recursive:true});
  const target=path.join(dir,'blog-manifest.json');
  await writeFile(target+'.tmp',JSON.stringify(manifest,null,2)+'\n');await rename(target+'.tmp',target);
  return manifest;
}
/** Inspect rendered Markdown links, including relative URLs, references, HTML and fragments. */
export async function validateBlogOutput(root, manifest) {
  for(const e of manifest.entries) {
    const html=await readFile(path.join(root,e.path,'index.html'),'utf8');
    const urls=[...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(m=>m[1]);
    urls.push(...e.data.internal_links.map(l=>l.path));
    for(const raw of urls) {
      const u=new URL(raw.replaceAll('&amp;','&'),BLOG_ORIGIN+e.path);
      if(!['http:','https:'].includes(u.protocol))continue;
      if(u.origin!==BLOG_ORIGIN)continue;
      const rel=decodeURIComponent(u.pathname).replace(/^\//,'');
      const target=path.resolve(root,!rel ? 'index.html' : rel.endsWith('/')?rel+'index.html':rel);
      if(!target.startsWith(path.resolve(root)+path.sep))fail('link escapes output');
      let content;
      try{content=await readFile(target,'utf8');}catch{fail(`broken or invisible link: ${e.path} -> ${raw}`);}
      if(u.hash && target.endsWith('.html')) {
        const id=decodeURIComponent(u.hash.slice(1));
        if(![...content.matchAll(/\bid=["']([^"']+)["']/g)].some(m=>m[1]===id))fail(`missing fragment: ${raw}`);
      }
    }
  }
}

/** Rehype: preserve table semantics inside a keyboard-accessible scroll region. */
export function blogScrollableBlocks() {
  return (tree, file) => {
    const filepath=String(file.path || file.history?.[0] || '').replaceAll('\\','/');
    if(!filepath.includes('/content/blog/'))return;
    const en=file.data?.astro?.frontmatter?.locale==='en';
    const visit=node=>{
      if(node.type==='element' && node.tagName==='pre'){node.properties??={};node.properties.tabIndex=0;}
      for(let i=0;i<(node.children??[]).length;i++){
        const child=node.children[i];
        visit(child);
        if(child.type==='element' && child.tagName==='table'){
          node.children[i]={type:'element',tagName:'div',properties:{className:['blog-table-block']},children:[
            {type:'element',tagName:'p',properties:{className:['blog-table-hint']},children:[{type:'text',value:en?'Scroll horizontally if needed to see all columns.':'Se necessário, role horizontalmente para ver todas as colunas.'}]},
            {type:'element',tagName:'div',properties:{className:['blog-table-scroll'],tabIndex:0,role:'region',ariaLabel:en?'Scrollable table':'Tabela com rolagem horizontal'},children:[child]}
          ]};
        }
      }
    };visit(tree);
  };
}
