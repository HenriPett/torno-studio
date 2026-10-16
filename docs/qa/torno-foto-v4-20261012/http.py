from pathlib import Path
import json,hashlib,urllib.request,concurrent.futures,sys
root=Path('/private/tmp/torno-foto-v4-release-20261012/dist');base=sys.argv[1].rstrip('/');output=Path(sys.argv[2])
def verify(p):
 route='/'+str(p.relative_to(root))
 if route.endswith('/index.html'):route=route[:-10]
 with urllib.request.urlopen(urllib.request.Request(base+route,headers={'User-Agent':'Torno-QA-bot'}),timeout=30) as r:
  body=r.read();status=r.status;content_type=r.headers.get('Content-Type')
 assert body==p.read_bytes(),route+' differs from approved artifact'
 return route,{'status':status,'bytes_equal':True,'sha256':hashlib.sha256(body).hexdigest(),'content_type':content_type,'bytes':len(body)}
results={}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for path,result in pool.map(verify,[p for p in root.rglob('*') if p.is_file()]):results[path]=result
output.write_text(json.dumps(results,indent=2)+'\n');print('PASS',base,len(results),'files byte-identical; PT/EN HTTP',results['/']['status'],results['/en/']['status'])
