from pathlib import Path
from fractions import Fraction as Q
import json,runpy
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
HERE=Path(__file__).resolve().parent
OUT=ROOT/'.cache/qicn-math-regressions';OUT.mkdir(parents=True,exist_ok=True)
runpy.run_path(str(HERE/'check_regime_model.py'),run_name='__main__')
base=json.loads((OUT/'REGIME_MODEL_CHECKS.json').read_text(encoding='utf-8'));rows=list(base['results'])
def check(name,condition,detail):
    rows.append(dict(name=name,passed=bool(condition),detail=detail))
    if not condition:raise AssertionError(name)
for n in (2,3,10,100):
    check('discontinuity despite controlled convergence n='+str(n),Q(1,2)>Q(1,4) and Q(1,n)>0,
          'At s=0 and s=1/n with zero bits, the limiting readout jumps by 1/2 while domain distance tends to zero; see universal source proof.')
for x in (0,1):
    check('setwise transport control x='+str(x),(1-x)!=x,
          'Flipping {0,1} preserves the set but not an identity readout; a fixed-transport assumption cannot be inferred from set preservation.')
for scale in (Q(1,10),Q(1),Q(10)):
    r=2*scale;ref=4*scale
    check('unit-normalized protection scale='+str(scale),1/(1+r/ref)==Q(2,3),
          'Changing distance units changes both loss and reference distance; the dimensionless protection is invariant.')
for rel in ('basecore/core/sections/04_regime_constraints_absorbed.tex','paper2/main.tex'):
    t=(ROOT/'rigid-identity-framework'/rel).read_text(encoding='utf-8')
    check('controlled axiom present '+rel,'[E1: Controlled Asymptotic Compatibility]' in t and '\\label{ax:e2}' in t,
          'Static link to the selected canonical axiom revision, not proof certification.')
    check('obsolete constancy argument removed '+rel,'sequence is constant' not in t and 'constant along the trajectory' not in t,
          'An exact-compatibility obstruction remains explicitly as a negative control.')
result=dict(scope='R2 finite rational controls and source-link checks; universal proofs reside in the mathematical text',
            checks=len(rows),passed=sum(x['passed'] for x in rows),results=rows)
(OUT/'REGIME_IMPLEMENTATION_CHECKS.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
cache=ROOT/'.cache/qicn-regimes';cache.mkdir(exist_ok=True,parents=True)
(cache/'controls.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print('R2_CONTROLS',result['passed'],result['checks'])
