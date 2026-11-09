from pathlib import Path
import json,subprocess,os,re,hashlib,time
OUT=Path(__file__).resolve().parent;INNER=OUT.parents[3];SRC=INNER/'docs/ai-platform-outputs/formal/lean'
LEAN=Path.home()/'.elan/toolchains/leanprover--lean4---v4.31.0/bin/lean.exe'
BUILD=OUT/'lean_recheck';BUILD.mkdir(exist_ok=True)
packages=[str(p/'.lake/build/lib/lean') for p in (SRC/'.lake/packages').iterdir() if (p/'.lake/build/lib/lean').exists()]
env=dict(os.environ);env['LEAN_PATH']=os.pathsep.join([str(BUILD),*packages])
sources={p.relative_to(SRC).with_suffix('').as_posix().replace('/','.'):p for p in [*sorted((SRC/'QICNLean').glob('*.lean')),SRC/'QICNLean.lean']}
done=set();results=[]
def compile_module(name):
 if name in done:return
 p=sources[name];t=p.read_text(encoding='utf-8-sig')
 for dep in re.findall(r'^import\s+([\w.]+)',t,re.M):
  if dep in sources:compile_module(dep)
 target=BUILD/p.relative_to(SRC).with_suffix('.olean');target.parent.mkdir(parents=True,exist_ok=True)
 started=time.monotonic();r=subprocess.run([str(LEAN),'-o',str(target),str(p.relative_to(SRC))],cwd=SRC,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=180)
 record={'module':name,'source':str(p),'source_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'exit':r.returncode,'seconds':round(time.monotonic()-started,2),'stdout':r.stdout,'stderr':r.stderr}
 results.append(record);(OUT/'LEAN_RECHECK.json').write_text(json.dumps({'method':'Fresh local QICN module objects; cached pinned mathlib dependencies reused read-only','lean':str(LEAN),'results':results},indent=2),encoding='utf-8')
 print(name,'EXIT',r.returncode,flush=True)
 if r.returncode:raise SystemExit(r.returncode)
 done.add(name)
for name in sources:compile_module(name)
axioms=BUILD/'AuditAxioms.lean';axioms.write_text('import QICNLean\n#print axioms QICNLean.dstar_universal_margin\n#print axioms QICNLean.projected_affine_attractor_isCompact\n#print axioms QICNLean.noncollapse_of_subspace_dichotomy\n',encoding='utf-8')
r=subprocess.run([str(LEAN),str(axioms)],cwd=SRC,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=120)
(OUT/'LEAN_AXIOMS.txt').write_text(r.stdout+r.stderr,encoding='utf-8');print('AXIOMS',r.returncode,r.stdout,flush=True)
print('FRESH_MODULES',len(done),flush=True)
