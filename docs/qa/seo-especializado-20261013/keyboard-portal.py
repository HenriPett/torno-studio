import subprocess,pathlib,shutil,re,time,json
out=pathlib.Path('docs/qa/seo-especializado-20261013')
portal='QA V4 Baseline';base='https://6aceb0964d6310adcb4cf102--tornostudio.netlify.app'
paths=['/recuperacao-de-projeto/','/en/software-project-rescue/','/lovable-em-producao/','/en/lovable-to-production/']
def run(action,*args):
 return subprocess.run(['maestri','portal',action,portal,*map(str,args)],capture_output=True,text=True,check=True).stdout.strip()
results=[]
for i,path in enumerate(paths):
 run('navigate',base+path);run('resize',360,844)
 run('scrollintoview','main details summary');run('focus','main details summary')
 run('key','Enter');time.sleep(.25)
 opened=bool(re.search(r'<details\b[^>]*\bopen(?:[\s=>])',run('html')))
 run('key','Space');time.sleep(.25)
 closed=not bool(re.search(r'<details\b[^>]*\bopen(?:[\s=>])',run('html')))
 run('key','Tab');time.sleep(.25)
 snap=run('snapshot');(out/f'faq-{i}-keyboard.txt').write_text(snap)
 shutil.copyfile(run('screenshot'),out/f'faq-{i}-keyboard.png')
 results.append({'path':path,'enter_opens':opened,'space_closes':closed,'snapshot':snap})
 print(path,'Enter=',opened,'Space=',closed,flush=True)
(out/'faq-keyboard.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
