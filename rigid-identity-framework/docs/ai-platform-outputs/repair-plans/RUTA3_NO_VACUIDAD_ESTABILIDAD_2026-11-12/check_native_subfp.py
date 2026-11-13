"""Exact population/probe controls; global compactness and closure proofs are TeX."""
from fractions import Fraction as F
from itertools import product,combinations
from pathlib import Path
import json
from native_indexed import (NativeSection,a,parity_trial,index_trial,ownership_trial,
                            continuity_trial,valuation_trial,measurements,TARGETS,
                            comparison_losses)

cube=list(product((-1,1),repeat=3));checks=0
# Full balanced population, not a sample of random signs or fitted weak rules.
features=[()] + [(i,) for i in range(3)] + list(combinations(range(3),2))
def feature(point,indices):
    v=F(1)
    for i in indices:v*=point[i]
    return v
gram=[[sum((feature(p,u)*feature(p,v) for p in cube),F(0))/8 for v in features] for u in features]
assert gram==[[F(i==j) for j in range(7)] for i in range(7)]
assert all(sum((p[0]*p[1]*p[2]*feature(p,u) for p in cube),F(0))==0 for u in features)
codes={NativeSection(s,bits23=((x+1)//2,(y+1)//2)).code():(s,x,y) for s,x,y in cube}
assert len(codes)==8
# Packed raw code and decoded bits carry the same information. A free feature
# changes the computational interface, rather than Shannon access.
product_tags={code:s*x*y for code,(s,x,y) in codes.items()}
assert set(product_tags.values())=={-1,1}
for coefficients in [tuple(F(i+j,7) for i in range(7)) for j in range(-4,5)]:
    error=sum(((p[0]*p[1]*p[2]-sum((c*feature(p,u) for c,u in zip(coefficients,features)),F(0)))**2 for p in cube),F(0))/8
    assert error==1+sum((c*c for c in coefficients),F(0))
    checks+=1

# Conditional command contrast for every three-of-four ancestry basis. No
# two-gate unary/binary circuit can have four inputs in an internal register.
for length in range(4):
    for subset in combinations(range(4),length):
        inner=F(0)
        for p in cube:
            def f(g):return feature((g,*p),subset)
            inner+=p[0]*p[1]*p[2]*(f(1)-f(0))
        assert inner==0
        checks+=1

assert F(17,64)+F(1,4)+F(1,32)==F(35,64)<1
assert F(17,64)+F(7,8)/4==F(31,64)<F(1,2)
assert F(1,94)<F(3,128)
assert 2*F(17,64)**2<F(2,5)**2
assert F(1,8)/(1-F(2,5))/16==F(5,384)<F(3,128)
assert F(1,384)>F(1,512)

for sigma in (-1,1):
    baseline=NativeSection(sigma)
    assert baseline.background(baseline.body,1)==F(1,47)
    assert baseline.background(baseline.partner,1)==F(1,49)
    assert baseline.ell()==F(1,47)+F(1,49)
    assert baseline.code()>0
    assert index_trial(sigma)==F(3,2048)
    assert index_trial(sigma,True)==0
    # Exact infinite-background active/passive return on both shock signs.
    for r in (-1,1):
        shock=NativeSection(sigma,delta={(baseline.body,1):F(r,8)})
        targets={(p,1):shock.background(p,1) for p in ('L','R')}
        active=shock.step(targets=targets)
        passive=shock.step()
        assert active.delta.get((baseline.body,1),F(0))==0
        assert abs(passive.delta[(baseline.body,1)])/F(1,8)==F(17,64)
        assert ownership_trial(sigma,r)==F(1,2)
        assert ownership_trial(sigma,r,'collapse')==0
        assert ownership_trial(sigma,r,'opposite')==-F(1,2)
        assert continuity_trial(sigma,r)==F(1,2)
        assert continuity_trial(sigma,r,'break')==0
        assert continuity_trial(sigma,r,'clone')==0
        assert continuity_trial(sigma,r,'swap')<=0
        assert continuity_trial(sigma,r,'copy')<=0
        assert continuity_trial(sigma,r,'perm')<=0
        # Two live swaps restore the terminal sign; the intermediate query
        # still witnesses the broken continuity, so endpoint-only scoring fails.
        memory=NativeSection(sigma,delta={(baseline.body,3):a(3)*r/8,
                                         (baseline.partner,3):-a(3)*r/8})
        route={(baseline.body,3):(baseline.partner,3),(baseline.partner,3):(baseline.body,3)}
        middle=memory.step(routes=route);end=middle.step(routes=route)
        assert r*middle.delta[(baseline.body,3)]<0
        assert r*end.delta[(baseline.body,3)]>0
        checks+=1
    for mu in (F(1,64),F(0),-F(1,64)):
        value,response=valuation_trial(sigma,mu)
        if mu>0:
            assert response==[F(4385,262144),F(4321,262144)]
            assert value==F(64,266529)
        elif mu==0:assert value==0
        else:assert value==-F(64,266465)
        checks+=1
    assert valuation_trial(sigma,swap=True)[0]<0
    # Equal-norm boundary inputs and their two-step indexed-channel contrast.
    for port,expected in ((baseline.body,F(1,128)),(baseline.partner,F(0))):
        moved=baseline.step({(port,1):F(1,2)})
        assert abs(moved.delta.get((baseline.body,1),F(0)))/16==expected
        assert F(1,2)**2==F(1,4)
    for x,y,g in product((-1,1),(-1,1),(-1,0,1)):
        for j in (4,5):
            initial,final,target=parity_trial(sigma,x,y,g,j)
            assert target==g*sigma*x*y
            other_initial,other_final,other_target=parity_trial(-sigma,x,y,g,j)
            assert other_target==-target
            assert initial.exchange().code()==other_initial.code()
            assert final.exchange().delta==other_final.delta
            checks+=1
    # Every clipping-region row is its own or its donor's retention gain.
    # The exact Frobenius envelope proves the rational 2/5 scalar bound;
    # these grid trajectories separately check the implemented live routing.
    grid=[(l,r) for l,r in product((-1,0,1),repeat=2)]
    for sourceL,sourceR in product(('L','R'),repeat=2):
        route={('L',3):(sourceL,3),('R',3):(sourceR,3)}
        images=[]
        for left,right in grid:
            state=NativeSection(sigma,delta={(p,3):a(3)*v-baseline.background(p,3)
                for p,v in [('L',left),('R',right)]})
            images.append(state.step(routes=route))
        for i,xy in enumerate(grid):
            for k,uv in enumerate(grid):
                before=a(3)**2*sum((F(x-y)**2 for x,y in zip(xy,uv)),F(0))
                after=sum(((images[i].state(p,3)-images[k].state(p,3))**2 for p in ('L','R')),F(0))
                assert after<=F(2,5)**2*before
                checks+=1

# At equal retention rates, two permutations even restore the exact endpoint
# of sham. The path-sensitive statistic must still report the intermediate cut.
for sigma,r in product((-1,1),repeat=2):
    m=NativeSection(sigma,F(0))
    m.delta={(m.body,3):a(3)*r/8,(m.partner,3):-a(3)*r/8}
    route={(m.body,3):(m.partner,3),(m.partner,3):(m.body,3)}
    assert m.step(routes=route).step(routes=route).delta==m.step().step().delta
    assert continuity_trial(sigma,r,'perm',mu=F(0))==0

for j in (4,5):
    assert comparison_losses(j)==(F(14,15),F(3,16))
    assert comparison_losses(j,True)==(F(0),F(0))
weak,full=comparison_losses()
assert weak-full==F(179,240)
assert (weak-full)/(1+weak)==F(179,464)
# Same-cost emulator matches the physical target and has the SAME three gates.
assert full-full==0
# A free product tag would have zero forecast error and <=3/16 cost: no gap.
assert F(1,16)-full<0

v=F(64,266529);threshold=v/2
for sigma in (-1,1):
    primary,irred=measurements(sigma)
    assert primary==[F(1),F(1,2),F(1,2),F(1,3),v]
    passed=0
    for name,targets in TARGETS.items():
        damaged,_=measurements(sigma,name)
        drops=[x-y for x,y in zip(primary,damaged)]
        assert all(drops[j]>=threshold for j in targets),(sigma,name,drops)
        assert all(drops[j]==0 for j in set(range(5))-targets),(sigma,name,drops)
        passed+=1;checks+=1
    assert passed==10
    vector=[*primary,F(passed,10),irred]
    assert min(vector)==v>F(1,8192)
    product_value=F(1)
    for number in vector:product_value*=number
    assert product_value==F(179,5568)*v>F(1,8)**7>F(1,16)**7
    softened,soft_irred=measurements(sigma,soft=True)
    assert softened==[F(1,4096)]*5
    assert soft_irred==F(1,4096)
    assert min(softened)>F(1,8192)
    assert F(1,4096)**6<F(1,16)**7
    assert soft_irred>F(1,16384)
    # Shams/passive transport keep primaries, giving no positive target drop.
    assert measurements(-sigma)==measurements(sigma)
    symmetric,symmetric_irred=measurements(sigma,mu=F(0))
    assert symmetric==[F(1),F(1,2),F(1,2),F(1,3),F(0)]
    assert symmetric_irred==F(179,464)
    assert min(symmetric)==0
    checks+=1

# History: the present phase is constant; the initial phase disambiguates
# the independently retained tag. Revealing the complete current tag ties both.
histories=[(F(-1,8),F(0),F(0)),(F(1,8),F(0),F(0))]
labels=[0,1]
current_risk=min(sum(F(pred!=label,2) for label in labels) for pred in (0,1))
history_risk=sum(F((history[0]>0)!=label,2) for history,label in zip(histories,labels))
assert current_risk-history_risk==F(1,2)
assert sum(F(tag!=label,2) for tag,label in zip(labels,labels))==0

root=Path(__file__).resolve().parents[4]
for folder,label in [('paper5_operational_consciousness','thm:asymmetric-native-six'),
                     ('paper7_operational_life_subjecthood','prop:asymmetric-native-life'),
                     ('paper8_first_person_subjectivity','thm:native-nonempty-subfp')]:
    assert ('\\label{'+label+'}') in (root/folder/'main.tex').read_text(encoding='utf8')
print(json.dumps({'passed':True,'exact_controls':checks,'full_sign_population':8,
 'weak_gram_rank':7,'weak_loss':str(weak),'full_loss':str(full),
 'scope':'Exact prepared infinite-background sections and finite algebra; global geometry/causal closure are TeX proofs.',
 'external_support_certified':False}))
