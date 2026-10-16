import subprocess,pathlib,shutil
out=pathlib.Path('docs/qa/seo-especializado-20261013')
portal='QA V4 Baseline'
base='https://6aceb0964d6310adcb4cf102--tornostudio.netlify.app'
paths=['/recuperacao-de-projeto/','/en/software-project-rescue/','/lovable-em-producao/','/en/lovable-to-production/','/guias/rls-multiempresa/','/en/guides/multi-tenant-rls/']
def run(action,*args):
 p=subprocess.run(['maestri','portal',action,portal,*map(str,args)],capture_output=True,text=True,check=True)
 return p.stdout.strip()
for i,path in enumerate(paths):
 run('navigate',base+path)
 for width in [1280,360]:
  run('resize',width,844)
  run('scroll','up',20000)
  (out/f'portal-{i}-{width}-top.txt').write_text(run('snapshot'))
  shot=run('screenshot');shutil.copyfile(shot,out/f'portal-{i}-{width}-top.png')
  if i<4:
   run('scrollintoview','#escopo')
   (out/f'portal-{i}-{width}-scope.txt').write_text(run('snapshot'))
   shutil.copyfile(run('screenshot'),out/f'portal-{i}-{width}-scope.png')
   run('scrollintoview','main details summary')
   (out/f'portal-{i}-{width}-faq.txt').write_text(run('snapshot'))
   shutil.copyfile(run('screenshot'),out/f'portal-{i}-{width}-faq.png')
  else:
   run('scrollintoview','.table-scroll')
   (out/f'portal-{i}-{width}-matrix.txt').write_text(run('snapshot'))
   shutil.copyfile(run('screenshot'),out/f'portal-{i}-{width}-matrix.png')
   run('scrollintoview','main details summary')
   run('click','main details summary')
   run('scrollintoview','main details pre')
   (out/f'portal-{i}-{width}-sql.txt').write_text(run('snapshot'))
   shutil.copyfile(run('screenshot'),out/f'portal-{i}-{width}-sql.png')
   run('click','main details summary')
  print(f'captured {path} {width}',flush=True)
