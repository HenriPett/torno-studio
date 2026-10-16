/** Exact, hash-bound overlay for the approved maintenance article's unchanged Markdown. */
import {readFile} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const sha=value=>createHash('sha256').update(value).digest('hex');
const fail=message=>{throw new Error('[blog-maintenance] '+message)};
export const maintenanceId='torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento';
export const maintenanceFile=maintenanceId+'.md';
export const maintenancePath='/blog/custo-manutencao-software-apos-lancamento/';
export const maintenanceHashes={body:'560cb0f8a33dbba8d7db6018507c9d2c122cf420da4d82a2382d88505f3757e8',receipt:'1ad6b673effde63ba2f9769e00b7377861c556331e260d0deb20a3d9277ed3cf',sheet:'f3db6eb275824a45c3fec917772393cf84cec2be762a5523bd390e8acfaed5a4',sources:'29be5a5da81982d85e95edc2f91d02d845bcd1bbb760ea4fd4de779ac5ac8216',svg:'36d16c69c5c75d61cdfc167adfb634c2b16b90ea037d3f76eece7144993d9c5d',sidecar:'4dd4c396929878576a452e08693e3e85d87e3d80377b9d2af3f42e02f581f196',assetManifest:'21301bdfee6fc0b0fb88dffd968cfa6df337e23ce4f7c0668b4f11205a81e7cc',history:'ce340dd2e42f915949060f75a0041e8e8aa85a8e4dc16a39b6167cd22f4e6d47'};
const evidenceFiles=root=>({
  body:path.join(root,'src/content/blog',maintenanceFile),
  receipt:path.join(root,'docs/blog/editorial/receipts/ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-APROVACAO-RELEASE.json'),
  sheet:path.join(root,'docs/blog/editorial/reviews/ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-FICHA-EDITORIAL.md'),
  sources:path.join(root,'docs/blog/editorial/reviews/custo-manutencao-fontes-20261016.json'),
  svg:path.join(root,'src/content/blog/orcamento-apos-lancamento.svg'),
  sidecar:path.join(root,'src/config/blog-maintenance-sidecar.json'),
  assetManifest:path.join(root,'docs/blog/editorial/reviews/ARTIGO-MANUTENCAO-POS-LANCAMENTO-20261016-MANIFESTO-ASSET.json'),
  history:path.join(root,'docs/blog/editorial/receipts/HISTORICO-INTENCAO-URL-pre-publicacao-manutencao-20261016.md'),
});
const copiedSidecar=root=>path.join(root,'src/config/blog-maintenance-sidecar.json');
const copiedSvg=root=>path.join(root,'src/content/blog/orcamento-apos-lancamento.svg');
async function verified(file,expected,label){const data=await readFile(file);if(sha(data)!==expected)fail(label+' SHA mismatch');return data;}
export async function maintenanceOverlay(root,file,raw,frontmatter){
  if(path.basename(file)!==maintenanceFile)return frontmatter;
  if(sha(raw)!==maintenanceHashes.body)fail('approved Markdown bytes changed');
  const evidence=evidenceFiles(root);
  for(const [kind,filePath] of Object.entries(evidence))await verified(filePath,maintenanceHashes[kind],kind);
  await verified(copiedSidecar(root),maintenanceHashes.sidecar,'copied sidecar');
  await verified(copiedSvg(root),maintenanceHashes.svg,'copied SVG');
  const receipt=JSON.parse(await readFile(evidence.receipt,'utf8'));
  const sidecar=JSON.parse(await readFile(copiedSidecar(root),'utf8'));
  const sources=JSON.parse(await readFile(evidence.sources,'utf8'));
  if(receipt.content_id!==maintenanceId||receipt.intent_id!=='postlaunch-software-operating-cost-pt'||receipt.locale!=='pt-BR'||receipt.proposed_path!==maintenancePath||receipt.canonical_url_planned!=='https://tornostudio.com'+maintenancePath||receipt.state_before!=='review'||receipt.state_after!=='approved'||receipt.publication?.published!==false||receipt.approved_content?.sha256!==maintenanceHashes.body||receipt.asset_integration?.sidecar_sha256!==maintenanceHashes.sidecar||receipt.asset_integration?.manifest_sha256!==maintenanceHashes.assetManifest||receipt.approved_runtime_assets?.length!==1||receipt.approved_runtime_assets[0].sha256!==maintenanceHashes.svg||receipt.authorization_provenance?.delegated_release_approval?.release_approved_at_utc!=='2026-10-16T12:17:54Z')fail('receipt identity or state');
  if(sidecar.content_id!==maintenanceId||sidecar.intent_id!==receipt.intent_id||sidecar.planned_path!==maintenancePath||sidecar.source_bindings?.body_sha256!==maintenanceHashes.body||sidecar.source_bindings?.editorial_sheet_sha256!==maintenanceHashes.sheet||sidecar.source_bindings?.sources_sha256!==maintenanceHashes.sources||sidecar.asset!=='orcamento-apos-lancamento.svg'||sidecar.delivery_scope?.runtime_asset!=='orcamento-apos-lancamento.svg'||sidecar.delivery_scope?.qa_only?.length!==4)fail('sidecar identity or asset scope');
  if(frontmatter.status!=='review'||frontmatter.locale!=='pt-BR'||frontmatter.title!==receipt.h1_wrapper||frontmatter.seo_title!==receipt.seo_title||frontmatter.seo_description!==receipt.seo_description||frontmatter.summary!==receipt.summary||frontmatter.primary_question!==receipt.primary_question||frontmatter.proposed_path!==maintenancePath||frontmatter.canonical_planned!==receipt.canonical_url_planned||Object.hasOwn(frontmatter,'content_id')||Object.hasOwn(frontmatter,'author_name')||Object.hasOwn(frontmatter,'first_published_at'))fail('approved Markdown frontmatter differs from receipt');
  const byId=Object.fromEntries(sources.sources.map(s=>[s.id,s]));
  for(const id of ['aws-cost-optimization','supabase-cost-control','torno-home'])if(byId[id]?.http_status!==200||!byId[id]?.checked_at_utc||!byId[id]?.final_url)fail('missing verified source '+id);
  const fact=(id,claim,limit)=>({classification:'FATO',claim,reference:byId[id].final_url,entity:id==='aws-cost-optimization'?'AWS':id==='supabase-cost-control'?'Supabase':'Torno Studio',checked_at:byId[id].checked_at_utc,limit});
  return {...frontmatter,content_id:receipt.content_id,intent_id:receipt.intent_id,type:'artigo',working_title:receipt.h1_wrapper,h1:receipt.h1_wrapper,canonical_url:receipt.canonical_url_planned,url_owner:receipt.intent_id,audience:'Dono ou gestor de software web que planeja a operação após o lançamento.',buyer_stage:'Planejamento de continuidade e orçamento recorrente pós-go-live.',scope:'Ficha por componente e cenários didáticos para separar faturas de provedores, manutenção e suporte, e evolução funcional.',not_scope:'Preço de construção do MVP, cotação, média universal, case, ROI, teto global ou cobertura 24/7 presumida.',author_name:null,author_basis:null,created_at:null,verified_at:null,first_published_at:null,last_substantive_update_at:null,evidence_of_publication:null,translation_of:null,internal_links:[{path:'https://tornostudio.com/#precos',reason:'Oferta Product Evolution e garantia para bugs do MVP permanecem na home.'}],claims_and_sources:[fact('aws-cost-optimization','Consciência de gasto e uso e revisão contínua integram práticas de custos da AWS.','Aplica-se a workloads AWS; não fornece preço para este sistema.'),fact('supabase-cost-control','Spend Cap da Supabase cobre apenas certos itens de uso e exclui outros.','Não limita fornecedores externos nem substitui análise do contrato.'),fact('torno-home','Home publica Product Evolution e garantia de 60 dias para bugs do MVP.','Oferta observada na data da consulta; não inclui automaticamente infraestrutura, suporte contínuo ou novas funções.'),{classification:'HIPÓTESE',claim:'Cenários de 30 dias e fórmulas com F, G, M e S são exemplos didáticos.',reference:'Exemplo original do artigo.',entity:'Torno Studio',limit:'Sem preços de mercado, proposta, case ou ROI.'}]};
}
export async function verifyMaintenanceApproval(root,approval,data){
  if(!approval)fail('missing exact release approval');
  const evidence=evidenceFiles(root);
  const receipt=JSON.parse(await verified(evidence.receipt,maintenanceHashes.receipt,'receipt'));
  const sidecar=JSON.parse(await verified(copiedSidecar(root),maintenanceHashes.sidecar,'copied sidecar'));
  const assets=[{path:'orcamento-apos-lancamento.svg',sha256:maintenanceHashes.svg}];
  const files=[{path:'custo-manutencao-software-apos-lancamento-final.md',sha256:maintenanceHashes.body},...assets,{path:'sidecar.json',sha256:maintenanceHashes.sidecar}];
  if(approval.contentId!==maintenanceId||approval.intentId!==data.intent_id||approval.path!==maintenancePath||approval.locale!=='pt-BR'||approval.contentRevision!==maintenanceHashes.body||approval.approvedBy!=='Farol (delegado operacional)'||approval.approvedAt!=='2026-10-16T12:17:54Z'||approval.reviewedBy!=='Verso'||approval.reviewedAt!=='2026-10-16T12:06:26Z'||approval.authorizationEvidence?.receiptSha256!==maintenanceHashes.receipt||approval.authorizationEvidence?.receiptEventId!==receipt.event_id||approval.authorizationEvidence?.authorizationProvenance?.personal_hash_approval_by_henrique!==false||approval.metadata?.title!==receipt.seo_title||approval.metadata?.description!==receipt.seo_description||approval.metadata?.h1!==receipt.h1_wrapper||approval.metadata?.canonical!==receipt.canonical_url_planned||JSON.stringify(approval.assets)!==JSON.stringify(assets)||JSON.stringify(approval.approvedFiles)!==JSON.stringify(files)||JSON.stringify(approval.excludedAssets)!==JSON.stringify(['*.png'])||approval.sources?.releaseReceiptSha256!==maintenanceHashes.receipt||approval.sources?.editorialSheetSha256!==maintenanceHashes.sheet||approval.sources?.sourceReviewSha256!==maintenanceHashes.sources||approval.sources?.assetManifestSha256!==maintenanceHashes.assetManifest||approval.sources?.sidecarSha256!==maintenanceHashes.sidecar||approval.sources?.historyAfterApprovalSha256!==maintenanceHashes.history||sidecar.placement?.before_heading_exact!=='Onde termina a garantia e começa um novo acordo')fail('approval/metadata/provenance/sidecar mismatch');
}
export function insertMaintenanceFigure(tree,file){
  if(path.basename(String(file.path??''))!==maintenanceFile)return false;
  const root=process.cwd();
  if(sha(readFileSync(file.path))!==maintenanceHashes.body||sha(readFileSync(copiedSidecar(root)))!==maintenanceHashes.sidecar||sha(readFileSync(copiedSvg(root)))!==maintenanceHashes.svg)fail('figure source hash changed');
  const sidecar=JSON.parse(readFileSync(copiedSidecar(root),'utf8'));
  const textOf=node=>typeof node?.value==='string'?node.value:(node?.children??[]).map(textOf).join('');
  const children=tree.children??[];
  const section=children.map((n,i)=>n.type==='heading'&&n.depth===2&&textOf(n)===sidecar.placement.after_section_heading_exact?i:-1).filter(i=>i>=0);
  const next=children.map((n,i)=>n.type==='heading'&&n.depth===2&&textOf(n)===sidecar.placement.before_heading_exact?i:-1).filter(i=>i>=0);
  const prefix='Os volumes, a franquia e a forma de cobrança são [HIPÓTESE]';
  const paragraphs=children.map((n,i)=>n.type==='paragraph'&&textOf(n).startsWith(prefix)?i:-1).filter(i=>i>=0);
  if(section.length!==1||next.length!==1||paragraphs.length!==1||!(section[0]<paragraphs[0]&&paragraphs[0]+1===next[0]))fail('figure placement anchor missing, duplicated or moved');
  const figure={type:'figure',data:{hName:'figure',hProperties:{className:['blog-figure','blog-figure--maintenance'],ariaDescribedBy:'maintenance-figure-equivalent'}},children:[
    {type:'image',url:'./orcamento-apos-lancamento.svg',alt:sidecar.alt},
    {type:'paragraph',data:{hName:'figcaption',hProperties:{className:['blog-figure-caption']}},children:[{type:'text',value:sidecar.caption}]},
    {type:'paragraph',data:{hName:'p',hProperties:{className:['visually-hidden'],id:'maintenance-figure-equivalent'}},children:[{type:'text',value:sidecar.text_equivalent}]}
  ]};
  children.splice(paragraphs[0]+1,0,figure);
  return true;
}
export async function validateMaintenanceHtml(root,html){
  const projectRoot=path.dirname(root); // validateBlogOutput receives Astro's dist directory.
  const sidecar=JSON.parse(await verified(copiedSidecar(projectRoot),maintenanceHashes.sidecar,'copied sidecar'));
  const figures=[...html.matchAll(/<figure\b[^>]*class="[^"]*blog-figure--maintenance[^"]*"[^>]*>([\s\S]*?)<\/figure>/g)];
  if(figures.length!==1)fail('exactly one maintenance figure required');
  const f=figures[0][1];const svg=f.match(/src="(\/_astro\/orcamento-apos-lancamento\.[^"/]+\.svg)"/);
  if(!svg||!f.includes('alt="'+sidecar.alt+'"')||!f.includes(sidecar.caption)||!f.includes(sidecar.text_equivalent)||!f.includes('<figcaption')||!f.includes('id="maintenance-figure-equivalent"'))fail('approved figure/alt/caption/equivalent absent');
  if(sha(await readFile(path.join(root,svg[1].slice(1))))!==maintenanceHashes.svg)fail('rendered SVG asset hash mismatch');
  const p=html.indexOf('Os volumes, a franquia e a forma de cobrança são');const g=html.indexOf(figures[0][0]);const h=html.indexOf('Onde termina a garantia e começa um novo acordo');
  if(p<0||!(p<g&&g<h)||html.indexOf('Orçamento pós-lançamento organizado',g)<0)fail('figure placement changed');
  if(!html.includes('<title>Custo de manutenção de software após o lançamento | Torno</title>')||!html.includes('<link rel="canonical" href="https://tornostudio.com'+maintenancePath+'">')||[...html.matchAll(/<h1\b/g)].length!==1||/"author"|datePublished|dateModified|<time\b/.test(html))fail('maintenance SEO/schema/byline/date mismatch');
}
