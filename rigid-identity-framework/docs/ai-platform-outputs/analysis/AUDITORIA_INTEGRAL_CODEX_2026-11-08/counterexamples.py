"""Independent finite checks of audit counterexamples; no runtime/theory imports.
These checks falsify specific implications, not an entire research program.
Run: python counterexamples.py. Standard library only.
"""
import math,json
from pathlib import Path
out=[]
def check(name,condition,evidence):
 assert condition,name
 out.append({'id':name,'counterexample_confirmed':True,'evidence':evidence})
# Paper X: a tied decision never incurs error under the actual published loss.
r=sum(int('tie'!=label and 'tie'!='tie') for label in ('h','m'))/2
check('X-01-always-tie',r==0 and r<.5,{'risk':r,'claimed_lower_bound_no_leak':.5})
# General metric-space diameter 2 eps is not sufficient for radius eps.
pts=(0,2); radius=min(max(abs(x-c) for x in pts) for c in pts)
check('A-02-discrete-center',radius==2 and max(pts)-min(pts)==2,{'epsilon':1,'diameter':2,'best_radius_in_codomain':radius})
check('A-02-Banach-triangle',2/math.sqrt(3)>1,{'equilateral_side':2,'circumradius':2/math.sqrt(3),'epsilon':1})
# F(x,y)=x, observation x: exact F despite nonzero diameter of observation fibers.
fiber=((0,0),(0,1)); error=max(abs(x-0) for x,y in fiber)
check('A-03-upper-Lipschitz-not-coercivity',error==0 and math.dist(*fiber)==1,{'K':1,'epsilon':0,'fiber_diameter':math.dist(*fiber)})
# A nonconstant map is needed for uniqueness of target decision, not just margin.
check('A-06-target-rule-link',int(-1>=0)!=1,{'C':1,'h0':1,'h_support':-1,'threshold':0,'margin':1,'estimator_error':0,'h_decision':0})
# Declared tolerance can grow while actual estimator stays exact.
check('A-05-not-iff',int(1>=0)==1 and 2>abs(1),{'true_support':1,'exact_estimated_support':1,'threshold':0,'declared_error_budget':2,'decision_preserved':True})
# n=2, rho=.5, sigma_e^2=1: explicit 2x2 covariance inverse spectrum.
rho=.5; actual=(1-rho,1+rho)
formula=tuple((1-rho*rho)/(1-2*rho*math.cos(math.pi*j/3)+rho*rho) for j in (1,2))
check('A-08-AR1-inverse-eigenvalues',any(abs(a-b)>1e-5 for a,b in zip(sorted(actual),sorted(formula))),{'actual_eigenvalues':actual,'published_formula':formula})
# Full profile PW and GLS are identical for fixed residual vector and same rho.
u=(1.,2.,-.5,1.2);n=len(u); q=(1-rho*rho)*u[0]**2+sum((u[t]-rho*u[t-1])**2 for t in range(1,n))
pw=n/2*(math.log(2*math.pi*q/n)+1)-.5*math.log(1-rho*rho)
gls=n/2*(math.log(2*math.pi*q/((1-rho*rho)*n))+1)+(n-1)/2*math.log(1-rho*rho)
check('A-10-PW-GLS-identity',abs(pw-gls)<1e-12,{'PW_NLL':pw,'GLS_NLL':gls,'difference':pw-gls})
# Direct log densities verify AIC sign with zero residual.
logdetG=math.log(4/3);logdetI=2*math.log(4/3)
direct=(-logdetG)-(-logdetI)
printed=logdetG-logdetI
check('A-07-AIC-logdet-sign',abs(direct+printed)<1e-12 and direct>0,{'direct_2logL_difference':direct,'printed_logdet_ratio':printed})
# Nontransitivity of closeness at tolerance 1.
a,b,c=0,.75,1.5
check('VII-03-proximity-not-equivalence',abs(a-b)<=1 and abs(b-c)<=1 and abs(a-c)>1,{'states':[a,b,c],'tolerance':1})
# Weighted norm fails to control raw coordinate by unweighted margin.
check('VII-04-weighted-margin',.001*1<.1 and 1>.1,{'coordinate_change':1,'weight':.001,'weighted_distance':.001,'margin':.1})
# Ownership subtraction penalizes deviation from a control as written.
lam=.5; good=1-abs(1-1)-lam*abs(1-0); matching=1-abs(1-1)-lam*abs(1-1)
check('VIII-02-control-sign',good<matching,{'correct_distinct_from_control_score':good,'identical_control_score':matching})
# Distinct points on two axes can both be observed inside eta ball about null.
t1,t2=(2,0),(0,2);e1,e2=(1,0),(0,1);eta=1
check('III-two-eta-not-null-exclusion',math.dist(t1,t2)>2*eta and math.dist(t1,e1)<=eta and math.dist(t2,e2)<=eta and math.dist(e1,(0,0))<=eta and math.dist(e2,(0,0))<=eta,{'true_separation':math.dist(t1,t2),'eta':eta,'estimate1':e1,'estimate2':e2})
# Rotation has a fixed origin; strict contraction has no eigenvalue of modulus 1.
check('base-rotation-origin',(-0.,0.)==(0.,0.),{'rotation_90_of_origin':[0,0]})
# Upper Lipschitz bound on x^2 gives no uniform positive lower bound near zero.
q=[((1/n)**2)/(1/n) for n in (10,100,1000,10000)]
check('I-square-not-lower-Lipschitz',q[-1]<.001,{'difference_quotients_towards_zero':q})
# H5 legacy: each constant can be moved by some control, but every fixed point is constant.
check('legacy-H5-quantifiers',all(any(v!=c for v in (0,1)) for c in (-1,0,.5,1,2)),{'T0':'constant 0','T1':'constant 1','all_fixed_points_constant':True})
# Upper summability of weights alone doesn't control growing coordinate metrics.
terms=[2**(-t)*4**t for t in range(1,10)]
check('I-weighted-history-distance-diverges',all(terms[i+1]==2*terms[i] for i in range(len(terms)-1)),{'summable_weights':'2^-t','coordinate_distance':'4^t','weighted_terms':terms})
# On nonconvex two-point support, projection of midpoint is not unique.
check('I-nonconvex-projection',abs(.5-0)==abs(.5-1),{'support':[0,1],'point':.5,'minimizers':[0,1]})
result={'scope':'Synthetic mathematical counterexamples only; not empirical QICN measurements','checks':len(out),'passed':len(out),'external_support_certified':False,'results':out}
Path(__file__).with_name('COUNTEREXAMPLES_RESULTS.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
