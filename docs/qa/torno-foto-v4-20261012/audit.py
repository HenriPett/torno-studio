from pathlib import Path
from bs4 import BeautifulSoup
import json,hashlib,tarfile,re
old=Path('/tmp/torno-reel-release/dist');new=Path('/private/tmp/torno-foto-v4-release-20261012/dist');out=Path('/Users/henriquepett/Downloads/pessoal/projeto-50k-site/docs/qa/torno-foto-v4-20261012')
report={};before={str(p.relative_to(old)):hashlib.sha256(p.read_bytes()).hexdigest() for p in old.rglob('*') if p.is_file()};after={str(p.relative_to(new)):hashlib.sha256(p.read_bytes()).hexdigest() for p in new.rglob('*') if p.is_file()}
for file in ['index.html','en/index.html']:
 b=BeautifulSoup((old/file).read_text(),'html.parser');a=BeautifulSoup((new/file).read_text(),'html.parser')
 bp=b.select_one('#quem picture');ap=a.select_one('#quem picture');assert bp and ap
 assert bp.img.get('alt')==ap.img.get('alt')=='Henrique Pett'
 assert bp.img.get('width')==ap.img.get('width')=='160'
 assert bp.img.get('height')==ap.img.get('height')=='160'
 assert bp.img.get('loading')==ap.img.get('loading')=='lazy'
 assert bp.img.get('sizes')==ap.img.get('sizes')=='(min-width: 64em) 160px, 96px'
 assert len(ap.select('source'))==2
 assert str(b.select_one('.ladder__fit'))==str(a.select_one('.ladder__fit'))
 bp.extract();ap.extract()
 assert str(b)==str(a),file+' changed outside portrait markup'
 report[file]={'entire_html_outside_portrait_equal':True,'reel_exact_html_preserved':True,'alt_sizes_dimensions_lazy_unchanged':True}
for f in before:
 if f in ['index.html','en/index.html'] or 'henrique-pett.' in f:continue
 assert before[f]==after[f],f+' unexpectedly changed'
removed=sorted(set(before)-set(after));added=sorted(set(after)-set(before))
assert len(removed)==len(added)==16 # 15 responsive variants + original WebP emitted by Astro
assert all('henrique-pett.' in f for f in removed+added)
report['only_replaced_assets']={'removed':removed,'added':added}
report['artifact_sha256']=after
report['variants_bytes']={f:(new/f).stat().st_size for f in added}
(out/'audit.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS: homes identical outside portrait; REEL exact HTML preserved; all other files byte-identical; 15 responsive variants plus source WebP replaced.')
