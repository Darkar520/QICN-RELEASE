from pathlib import Path
from fractions import Fraction as Q
from itertools import product
import json,re
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
HERE=Path(__file__).resolve().parent
OUT=ROOT/'.cache/qicn-math-regressions';OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def check(name,ok,detail):
    checks.append(dict(name=name,passed=bool(ok),detail=detail))
    if not ok:raise AssertionError(name)
xs=(Q(0),Q(3,4),Q(3,2))
check('raw tolerance rejects transitivity',abs(xs[0]-xs[1])<=1 and abs(xs[1]-xs[2])<=1 and abs(xs[0]-xs[2])>1,
      'Counterexample persists even when all decoder labels are identical.')
domain=range(12)
decode=lambda x:(x//4,x%2)
cell=lambda x:x//3
relation=lambda x,y:decode(x)==decode(y) and cell(x)==cell(y)
check('closed relation reflexive',all(relation(x,x) for x in domain),'Intersection of decoder equality and response-cell equality.')
check('closed relation symmetric',all(relation(x,y)==relation(y,x) for x,y in product(domain,repeat=2)),'Finite mathematical model of response matching.')
check('closed relation transitive',all(not(relation(x,y) and relation(y,z)) or relation(x,z) for x,y,z in product(domain,repeat=3)),
      'This model supplies closure; it does not establish all operational legibility clauses.')
supports=((1,1,1,0,0,0),(0,0,0,1,1,1))
check('individual witnesses need not share support',all(any(s[i] for s in supports) for i in range(6)) and not any(all(s) for s in supports),
      'Logical quantifier control, not a realization of physical six-invariant systems.')
check('losing one certificate need not lose every certificate',not all((1,0,1,1,1,1)) and all((1,1,1,1,1,1)),
      'A failed chosen support and a different passing support are distinct logical possibilities.')
t=(ROOT/'rigid-identity-framework/basecore/core/sections/07_operational_criterion_absorbed.tex').read_text(encoding='utf-8')
u=(ROOT/'rigid-identity-framework/basecore/core/sections/08_claim_boundary_and_falsation.tex').read_text(encoding='utf-8')
check('closure definition precedes legibility',t.index('\\label{def:decoder}')<t.index('\\label{def:ileg}'),'Closure is a declared input condition.')
check('exclusive rupture assertion removed','then exactly one of the following occurs' not in t,'No forced exclusive outcome classification.')
check('certificate tuple and indicator separated',r'\Cert(S)=\bigl' in t and 'CertFlag' in u and not re.search(r'\\Cert\(S\)\s*=\s*[01]',u),
      'Cert remains an object; CertFlag denotes the indicator. Unknown empirical evidence is not a mathematical zero.')
result=dict(scope='Finite mathematical closure controls and logical/source checks, not empirical validation',checks=len(checks),passed=sum(x['passed'] for x in checks),results=checks)
cache=ROOT/'.cache/qicn-partitions';cache.mkdir(parents=True,exist_ok=True)
(cache/'controls.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
(OUT/'PARTITION_CONTROLS.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k!='results'}))
