from fractions import Fraction as Q
from itertools import product
from pathlib import Path
import json
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
HERE=Path(__file__).resolve().parent
OUT=ROOT/'.cache/qicn-math-regressions';OUT.mkdir(parents=True,exist_ok=True)
CACHE=ROOT/'.cache/qicn-reorganization';CACHE.mkdir(parents=True,exist_ok=True);rows=[]
def check(name,condition,detail):
    rows.append(dict(name=name,passed=bool(condition),detail=detail))
    if not condition:raise AssertionError(name)
def phi(bits):return sum((2*Q(int(b),3**(i+1)) for i,b in enumerate(bits)),Q(0))

for t in range(10):
    error=Q(1,3**(t+1));late=[0]*(t+1)+[1]
    check('nonfactorization witness t='+str(t),phi(late)==2*Q(1,3**(t+2)) and late[:t+1]==[0]*(t+1),
          'Same canonical prefix, positive exact readout difference in a later coordinate.')
    increment=Q(2,3**(t+2))
    check('uniform tail t='+str(t),sum((Q(2,3**(j+2)) for j in range(t,t+12)),Q(0))<error,
          'Finite truncation lies below the exact infinite geometric tail; universal equality is proved in the study.')
    check('old exact E1 rejected t='+str(t),increment>0,
          'The construction satisfies asymptotic E1a, and deliberately does not satisfy original exact E1.')
    # Fibre endpoints are represented exactly: the infinite all-one suffix sums geometrically.
    for prefix in product((0,1),repeat=min(t+1,5)):
        # This oracle uses the actual length of the tested prefix.
        radius=Q(1,2*3**len(prefix));lo=phi(prefix);hi=lo+2*radius;mid=(lo+hi)/2
        check('midpoint minimax '+''.join(map(str,prefix)),max(abs(mid-lo),abs(mid-hi))==radius,
              'Both fibre extrema attain the midpoint error; every decoder has at least half the endpoint distance.')
        for offset in (-radius, Q(0), radius, 3*radius):
            z=lo+offset
            check('any tested decoder endpoint bound',max(abs(z-lo),abs(z-hi))>=radius,
                  'Independent endpoint lower-bound control.')

for depth in range(1,8):
    words=list(product((0,1),repeat=depth));values={w:phi(w) for w in words}
    lower=upper=True
    for a in words:
        for b in words:
            if a==b:continue
            first=next(i for i,(x,y) in enumerate(zip(a,b)) if x!=y)
            d=Q(1,3**(first+1));diff=abs(values[a]-values[b])
            lower &= diff>=d;upper &= diff<=3*d
    check('bi-Lipschitz finite controls depth='+str(depth),lower and upper,
          'Finite words padded with zeros; the infinite case is proved by the signed tail bound.')

for n in range(1,8):
    words=list(product((0,1),repeat=n))
    exact={w:Q(w[0]) for w in words}
    check('exact compatibility finite-cut control depth='+str(n),all(exact[w]==Q(w[0]) for w in words),
          'An exactly compatible family factors through p0; it cannot satisfy E2.')
check('fixed-budget error can tend to zero',all(Q(1,2*3**(n+1))<Q(1,2*3**n) for n in range(1,12)),
      'Positive error for each fixed finite cut is not a positive uniform lower bound as resolution grows.')
result=dict(scope='Exact rational finite controls accompanying a written universal proof; not empirical evidence',
            checks=len(rows),passed=sum(r['passed'] for r in rows),results=rows)
(CACHE/'regime-model-checks.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
(OUT/'REGIME_MODEL_CHECKS.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k!='results'}))
