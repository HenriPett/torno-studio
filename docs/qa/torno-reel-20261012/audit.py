from pathlib import Path
from bs4 import BeautifulSoup
import hashlib,json,urllib.request,re
base=Path('/tmp/torno-reel-baseline/dist');release=Path('/tmp/torno-reel-release/dist')
out={}
for f in ['index.html','en/index.html','diagnostico/index.html','privacidade/index.html','en/privacy/index.html','404.html']:
 before=BeautifulSoup((base/f).read_text(),'html.parser');after=BeautifulSoup((release/f).read_text(),'html.parser')
 fit=after.select_one('.ladder__fit')
 expected=f in ['index.html','en/index.html']
 assert bool(fit)==expected,f
 if fit:
  assert len(fit.select('li'))==3
  assert fit.find_next_sibling().get('class')==['ladder__cta','actions']
  assert fit.find_previous_sibling().get('class')==['ladder__evolution']
  fit.extract()
 assert before.get_text(' ',strip=True)==after.get_text(' ',strip=True),f+' text drift'
 for tag,attr in [('a','href'),('img','src'),('source','srcset'),('link','hreflang')]:
  assert [x.get(attr) for x in before.select(tag)]==[x.get(attr) for x in after.select(tag)],(f,attr)
 out[f]={'copy_except_fit_equal':True,'links_images_hreflang_equal':True,'fit_present':expected}
preview='https://6acd598035084d048d68c172--tornostudio.netlify.app'
old='https://6ac931611c6d680c4ab9c222--tornostudio.netlify.app'
for path in ['/','/en/']:
 req=lambda u:urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Torno-QA-bot'}))
 with req(preview+path) as r: remote=r.read();status=r.status
 local=release/('index.html' if path=='/' else 'en/index.html')
 assert remote==local.read_bytes(),path+' preview bytes'
 prev=BeautifulSoup(req(old+path).read(),'html.parser');current=BeautifulSoup(remote,'html.parser')
 fit=current.select_one('.ladder__fit');fit.extract()
 assert prev.get_text(' ',strip=True)==current.get_text(' ',strip=True),path+' live baseline text drift'
 assert str(prev.select_one('#quem picture'))==str(current.select_one('#quem picture')),path+' portrait drift'
 out[path]={'preview_status':status,'preview_bytes_match_artifact':True,'previous_production_text_except_fit_equal':True,'portrait_markup_equal':True}
imgs=list(release.glob('_astro/henrique-pett.*'))
for p in imgs:
 assert req(preview+'/_astro/'+p.name).read()==p.read_bytes(),p.name
 assert req(old+'/_astro/'+p.name).read()==p.read_bytes(),p.name+' old production'
out['portrait_variants']={'count':len(imgs),'preview_and_previous_production_bytes_equal':True}
out['artifact_sha256']={str(p.relative_to(release)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(release.rglob('*')) if p.is_file()}
Path('/tmp/torno-reel-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print('PASS: 6 pages, unchanged copy/links/images/hreflang except fit; PT/EN preview exact bytes; previous production text and 15 portrait variants preserved')
