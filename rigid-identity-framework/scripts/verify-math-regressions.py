"""Run the preserved finite controls; these do not replace universal Lean proofs."""
from pathlib import Path
import json,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
TESTS=ROOT/'docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08'
CACHE=ROOT.parent/'.cache/qicn-math-regressions';CACHE.mkdir(parents=True,exist_ok=True)
results=[]
for name in ['check_math.py','check_regime_implementation.py','check_partitions.py','check_null.py']:
    run=subprocess.run([sys.executable,str(TESTS/name)],cwd=ROOT,capture_output=True,text=True,encoding='utf-8',errors='replace')
    (CACHE/(name+'.log')).write_text(run.stdout+run.stderr,encoding='utf-8')
    results.append({'script':name,'exit':run.returncode})
    print(name+': '+('PASS' if run.returncode==0 else 'FAIL'),flush=True)
    if run.returncode:
        print(run.stdout+run.stderr)
        break
success=len(results)==4 and all(r['exit']==0 for r in results)
(CACHE/'summary.json').write_text(json.dumps({'passed':success,'results':results,'scope':'Finite controls and source links; not empirical validation or complete theorem formalization.'},indent=2),encoding='utf-8')
sys.exit(0 if success else 1)
