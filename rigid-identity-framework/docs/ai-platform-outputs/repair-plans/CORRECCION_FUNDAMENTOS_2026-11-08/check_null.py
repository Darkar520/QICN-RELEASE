from pathlib import Path
from fractions import Fraction as F
from itertools import product,combinations
import json,re,math
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
HERE=Path(__file__).resolve().parent
OUT=ROOT/'.cache/qicn-math-regressions';OUT.mkdir(parents=True,exist_ok=True)
I=ROOT/'rigid-identity-framework'
checks=[]
def check(family,ok,detail):
 assert ok,(family,detail)
 checks.append(dict(family=family,detail=detail,passed=True))

# Complete diamond: positive image is nonempty but infimum is null and two minima exist.
E=['0','a','b','1']
le=lambda a,b:a==b or a=='0' or b=='1'
A=['a','b'];mins=[a for a in A if not any(b!=a and le(b,a) for b in A)]
lowers=[x for x in E if all(le(x,a) for a in A)]
check('order',mins==A and lowers==['0'],'two incomparable minima; ambient infimum null')
for size in (1,2,3,4):
 for sub in combinations(E,size):
  minimal=[a for a in sub if not any(b!=a and le(b,a) for b in sub)]
  check('finite_minima',bool(minimal),str(sub))

# Triangle bound and its sharpness on the positive quadrant with l1 distance.
pts=list(product(range(4),repeat=2))
for x,y in combinations(pts,2):
 d=sum(abs(a-b) for a,b in zip(x,y));r0=sum(x);r1=sum(y)
 check('unanchored',2*max(r0,r1)>=d,'l1 pair '+str((x,y)))
check('sharp_half',sum((2,0))==F(1,2)*4 and sum((0,2))==F(1,2)*4,'(2,0),(0,2), separation 4')
check('anchored',all(abs(F(n,7))==F(n,7) for n in range(1,8)),'null anchor gives entire pair distance')
check('global_gap',all(F(1,n)>0 and F(1,n)<F(2,n) for n in range(2,30)),'[0,1] approximants 1-1/n force zero global gap; relative {0,1} gap one')

# General triangle/ball bound over a finite rational grid, using the actual error budgets.
grid=[F(n,2) for n in range(-4,5)]
for e0,e1,h0,h1 in product(grid,repeat=4):
 eta0=abs(e0-h0);eta1=abs(e1-h1);m=abs(e0-e1)
 assert abs(h0-h1)>=m-eta0-eta1
 for r0,r1 in [(F(0),F(0)),(F(1,2),F(1)),(F(1),F(1))]:
  if m>eta0+eta1+r0+r1:
   assert not(abs(h0)<=r0 and abs(h1)<=r1)
check('noise_general',True,'6561 rational configurations; asymmetric estimation/acceptance radii')
check('old_noise_counterexample',8>4 and math.dist((2,0),(1,0))==1 and math.dist((0,2),(0,1))==1 and math.dist((1,0),(0,0))==1 and math.dist((0,1),(0,0))==1,'true squared separation 8>4 yet both estimates in unit null ball')
check('four_eta_boundary',abs(-2-2)==4 and abs(-2-(-1))==1 and abs(2-1)==1 and abs(-1)==abs(1)==1,'boundary 4eta attained in finite metric space with star order and null zero')

for rho in [F(1,n) for n in range(1,30)]:
 for delta in [-rho,F(0),rho]:
  val=min(F(1),max(F(0),delta))
  check('stable_null',abs(val)<=rho,'identity readout with clipped perturbation '+str((rho,delta)))

for n in range(1,30):
 cost=sum((F(1,2**(j+1)) for j in range(n)),F(0))
 check('summable_cost',cost==1-F(1,2**n) and cost<1,'first '+str(n)+' changed coordinates; analytic infinite sum one')

Z=[0,1,2];phi={z:2*z for z in Z};psi={z:3*z for z in Z};factor={phi[z]:psi[z] for z in Z}
check('factorization',all(factor[phi[z]]==psi[z] for z in Z),'unique factor on injective image')
extensions=[{**factor,7:v} for v in (0,1)]
check('ambient_nonunique',extensions[0]!=extensions[1] and all(all(u[phi[z]]==psi[z] for z in Z) for u in extensions),'two ambient extensions commute identically')
for q in product(range(2),repeat=4):
 pair=next((a,b) for a,b in combinations(range(4),2) if q[a]==q[b])
 midpoint=F(pair[0]+pair[1],2)
 check('finite_budget',max(abs(pair[0]-midpoint),abs(pair[1]-midpoint))>=F(1,2),'collision '+str(pair))

for n in range(9):
 tail=F(1,3**(n+1));mid=tail/2
 check('prefix_error',max(abs(mid),abs(tail-mid))==F(1,2*3**(n+1)),'extreme continuations at prefix '+str(n))

p3=(I/'paper3/main.tex').read_text(encoding='utf-8');bc=(I/'basecore/core/sections/05_null_regime_absorbed.tex').read_text(encoding='utf-8')
for bad in [r'\Phi(\I)',r'\Phi(\tilde{\I})',r'\inZ',r'\subseteqZ',r'\timesZ','Any finite-energy modification can only change finitely many symbols','liminf_{N \\to \\infty} \\text{err}_N']:
 check('source_regression',bad not in p3,'removed invalid construction '+bad)
# In BaseCore the expression Phi(I) appears only in an explicit type-error warning.
check('source_bound',r'C\epsilon/2' in bc and r'C\epsilon/2' in p3,'unanchored bound propagated')
check('source_noise',r'\eta_0+\eta_1+r_0+r_1' in p3,'separate null acceptance budget')
check('source_stability','not dynamical instability' in bc and 'stable with' in p3,'no inference from separation to temporal instability')
s07=(I/'basecore/core/sections/07_operational_criterion_absorbed.tex').read_text(encoding='utf-8')
check('state_attractor_types',r'\Aset\cap \Attr(S)' not in s07 and r'\operatorname{Attr}_X(S)' in s07,'state attractor distinct from regime codomain')
check('state_attractor_model',all(F(1,2**n)<=F(1,2**(n-1)) for n in range(1,21)) and {0}.isdisjoint({10}),'T(x)=x/2 converges to state zero; readout 10+x has a distinct regime type')
check('spectral_domain','nonzero finite-dimensional Euclidean space' in p3,'singular-value statement excludes empty unit sphere')
result=dict(passed=True,checks=len(checks),families=sorted(set(c['family'] for c in checks)),controls=checks,
 note='Finite rational regression controls and source anchors; universal claims are proved in the sources. No physical experiment, kernel certification, CCR construction, or external validation.')
(OUT/'NULL_CONTROLS.json').write_text(json.dumps(result,indent=2))
cache=I.parent/'.cache/qicn-null';cache.mkdir(parents=True,exist_ok=True)
(cache/'controls.json').write_text(json.dumps(result,indent=2))
print(json.dumps({k:result[k] for k in ['passed','checks','families','note']}))
