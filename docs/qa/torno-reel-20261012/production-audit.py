from pathlib import Path
import json,hashlib,urllib.request,concurrent.futures
root=Path('/tmp/torno-reel-release/dist');results={}
def verify(p):
 rel=str(p.relative_to(root));route='/'+rel
 if route.endswith('/index.html'):route=route[:-10]
 req=urllib.request.Request('https://tornostudio.com'+route,headers={'User-Agent':'Torno-QA-bot'})
 with urllib.request.urlopen(req,timeout=30) as r:
  body=r.read();headers=dict(r.headers);status=r.status
 assert body==p.read_bytes(),rel+' production differs'
 return route,{'status':status,'sha256':hashlib.sha256(body).hexdigest(),'bytes_equal':True,'csp':headers.get('Content-Security-Policy'),'content_type':headers.get('Content-Type')}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for route,result in pool.map(verify,[p for p in root.rglob('*') if p.is_file()]):results[route]=result
Path('/tmp/torno-reel-production-audit.json').write_text(json.dumps(results,indent=2)+'\n')
print('PASS: production matches every artifact file:',len(results),'files; PT/EN HTTP',results['/']['status'],results['/en/']['status'])
