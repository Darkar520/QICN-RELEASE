from pathlib import Path
import json,subprocess,os,time,shutil
OUT=Path(__file__).resolve().parent;info=json.loads((OUT/'VERIFICATION_COPY.json').read_text(encoding='utf-8'));ROOT=Path(info['copy_root']);INNER=ROOT/'rigid-identity-framework'
steps=[('root-integrity',ROOT,['node','scripts/verify-canonical-integrity.cjs']),('root-claims',ROOT,['node','scripts/verify-claim-registry.cjs']),('root-release',ROOT,['node','scripts/verify-canonical-release.cjs']),('inner-release',INNER,['cmd.exe','/d','/s','/c','npm run verify:release'])]
results=[]
for name,cwd,cmd in steps:
 start=time.monotonic();r=subprocess.run(cmd,cwd=cwd,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=300)
 (OUT/(name+'.log')).write_text(r.stdout+'\nSTDERR\n'+r.stderr,encoding='utf-8')
 results.append({'name':name,'cwd':str(cwd),'command':cmd,'exit':r.returncode,'seconds':round(time.monotonic()-start,2),'log':name+'.log'})
 (OUT/'REQUIRED_VERIFICATION.json').write_text(json.dumps({'isolation':info,'steps':results,'external_support_certified':False,'note':'PASS of software/policy gates is not a proof of mathematics or external evidence'},indent=2),encoding='utf-8')
 print(name,'EXIT',r.returncode,flush=True)
 if r.returncode:
  print('STOPPED_ON_FIRST_GATE_FAILURE',flush=True);raise SystemExit(r.returncode)
target=OUT/'verification_reports';target.mkdir(exist_ok=True)
for p in (INNER/'docs/reports').glob('*.json'):
 if p.name.startswith(('SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION','V35_ALL_LEGACY_VERIFICATION','GAP_CLOSURE_STATUS_v31')):shutil.copy2(p,target/p.name)
for p in (target).glob('SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION*.json'):
 r=json.loads(p.read_text(encoding='utf-8-sig'));print(p.name,'verdict=',r.get('verdict'),'external_support_certified=',r.get('external_support_certified'),flush=True)
