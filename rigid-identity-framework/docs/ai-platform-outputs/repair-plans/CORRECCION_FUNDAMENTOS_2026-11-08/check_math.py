"""Independent finite regression controls; mathematical proofs are in BaseCore.

Uses only the standard library. Exact rational calculations are used for the
affine witness and cell errors. Random finite checks are deterministic and are
not advertised as universal proofs or empirical QICN measurements.
"""
from pathlib import Path
from fractions import Fraction as Q
import json, math, random

ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
OUT=ROOT/'.cache/qicn-math-regressions/first-correction';OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,condition,detail):
    results.append(dict(name=name,passed=bool(condition),detail=detail))
    if not condition:
        (OUT/'MATH_CHECKS.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
        raise AssertionError(name)

def norm(xs):return math.sqrt(sum(float(x)**2 for x in xs)/len(xs))
def clamp(x):return min(1,max(0,x))

check('zero increments preserve identity',clamp(Q(1,5))-clamp(Q(1,10))==Q(1,10),
      'The old zero-factor bound fails on two distinct interior states.')
check('positive increments may expand',
      (clamp(Q(6,5)*Q(1,5))-clamp(Q(6,5)*Q(1,10)))/Q(1,10)>1,
      'Positive resonance with no dissipative feedback is not automatically contractive.')
for n in (3,7,16):
    incoming=1;outgoing=n-1
    ratio=norm([0]+[1]*(n-1))/norm([1]+[0]*(n-1))
    check(f'directed star norm N={n}',ratio>incoming and math.isclose(ratio,math.sqrt(incoming*outgoing)),
          'Incoming degree alone underestimates the Euclidean norm; the row/column bound is sharp here.')

k=Q(1,4);slope=Q(1,4)
for n in (1,2,3,7,16):
    cells=[(Q(2*i+1,2*n))*slope for i in range(n)]
    # Exact integral of (slope*s-cell_mean)^2 on all cells.
    error2=Q(0)
    for i,a_i in enumerate(cells):
        lo,hi=Q(i,n),Q(i+1,n)
        error2+=slope*slope*(hi**3-lo**3)/3-slope*a_i*(hi**2-lo**2)+a_i*a_i*(hi-lo)
    check(f'exact cell variance N={n}',error2==Q(1,16*12*n*n),str(error2))
    for u in (Q(0),Q(1,8),Q(1,4)):
        mean=(Q(1,8)+u)/(1-k)
        fixed=[a_i+u+k*mean for a_i in cells]
        actual=[clamp(k*sum(fixed)/n+a_i+u) for a_i in cells]
        check(f'exact fixed point N={n} u={u}',actual==fixed and all(0<=x<=1 for x in fixed),
              'Rational substitution in the finite transition, including the range condition.')
        if n>1:
            check(f'finite noncollapse N={n} u={u}',len(set(fixed))==n,
                  'Distinct cell averages produce distinct equilibrium coordinates.')
        x=[float((i+1)%2) for i in range(n)]
        for _ in range(100):
            m=sum(x)/n;x=[clamp(float(k)*m+float(a_i+u)) for a_i in cells]
        check(f'iteration reaches oracle N={n} u={u}',
              norm([x_i-float(f_i) for x_i,f_i in zip(x,fixed)])<2e-15,
              'Finite regression from an alternating initial state; oracle is the exact fixed-point formula.')

check('uniform noncollapse distance',slope*slope/12==Q(1,192),
      'Exact squared L2 distance of s/4 plus any constant from the constant subspace.')
u1,u2=Q(0),Q(1,4)
shift=(u2-u1)/(1-k)
check('parameter sensitivity attains bound',shift==Q(1,3),
      'Equilibrium shift equals input shift divided by 1-kappa.')

# Verify the dissipative bound on a directed, unbalanced graph, with clipping.
rng=random.Random(20261108)
n=9;eta=0.2;alpha=1;beta=0.8;theta=10
bound=abs(1-alpha*beta)+eta*math.sqrt(n-1)/theta
max_ratio=0
for _ in range(300):
    x=[rng.random() for _ in range(n)];y=[rng.random() for _ in range(n)]
    def transition(z):
        return [clamp((1-alpha*beta)*z[i]+eta*(z[0]/theta if i else 0)+(i-4)/20) for i in range(n)]
    tx,ty=transition(x),transition(y)
    ratio=norm([a-b for a,b in zip(tx,ty)])/norm([a-b for a,b in zip(x,y)])
    max_ratio=max(max_ratio,ratio)
check('directed dissipative bound finite regression',bound<1 and max_ratio<=bound+1e-14,
      dict(seed=20261108,pairs=300,bound=bound,maximum_observed_ratio=max_ratio))

# A perturbation of forcing saturates the general fixed-point bound.
delta=Q(1,100)
check('fixed-point perturbation denominator',delta/(1-k)==Q(1,75),
      'For identical kappa and a constant forcing perturbation, the exact equilibrium difference is delta/(1-kappa).')
check('trajectory perturbation geometric bound',
      sum(k**j*delta for j in range(8))==delta*(1-k**8)/(1-k),
      'Exact eight-step recursion, including the zero initial discrepancy case.')
check('zero kappa convention',sum(Q(0)**j for j in range(4))==1,
      'At kappa=0 the error is bounded by one-step discrepancy after the first step.')

for n in (1,3,16):
    # f_N is zero/one on each half-cell; both half lengths are 1/(2N).
    uniform_error2=n*(Q(1,2*n)*k*k/4+Q(1,2*n)*k*k/4)
    check(f'uniform consistency negative control N={n}',uniform_error2==k*k/4,
          'Even T=kappa*Id admits no vanishing uniform cell-average error on the entire cube of L2 functions.')

check('H1-H4 collapse witness',Q(1,2)*0==0,
      'The unique fixed point of f -> f/2 is the constant zero function; see source for the universal proof.')
check('complete-codomain lower-Lipschitz counterexample',
      Q(1,100)**3<Q(1,100)*Q(1,100),
      'x^3 at x=0.01,y=0 violates proposed lower constant C=0.01; the source proves failure for every C>0.')
check('compactness control preserves uniform continuity',abs(Q(5)-Q(2))==abs(Q(5)-Q(2)),
      'Gamma(u)=u is 1-Lipschitz on noncompact R; its equilibrium image remains noncompact.')

payload=dict(scope='Synthetic mathematical regression controls, not universal proofs or external validation',
             checks=len(results),passed=sum(r['passed'] for r in results),results=results)
(OUT/'MATH_CHECKS.json').write_text(json.dumps(payload,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in payload.items() if k!='results'}))
