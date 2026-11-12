"""Exact finite controls. The infinite-dimensional and statistical proofs are in TeX."""
from fractions import Fraction as F
from itertools import product
from math import comb

lam=F(1,32);beta=F(1,3);eps=F(1,512)
assert beta*lam/4==F(1,384) and eps<beta*lam/4
assert 2*eps/beta<lam/2 and 2*eps<F(1,3)
assert beta/(1+beta)*F(1,4)==F(1,16)
for n in range(1,5):
    a=[F(1,2**j) for j in range(1,n+1)]
    corners=tuple(product((-1,1),repeat=2*n))
    ell=lambda z:F(3,2)*sum((F(1,2**j)*z[k*n+j-1] for k in range(2) for j in range(1,n+1)),F(0))
    vectors=[tuple(sign*a[j%n] for j,sign in enumerate(s)) for s in corners]
    assert all(abs(ell(z))<=1 for z in vectors)
    assert min(1+ell(z)/4-ell(w)/4 for z in vectors for w in vectors)>=F(1,2)
    for z in vectors:
        for c in (F(-1),F(0),F(1)):
            v=z
            nxt=[(x+y)/4+a[j%n]*c/32 for j,(x,y) in enumerate(zip(z,v))]
            assert all(abs(x)<=F(17,32)*a[j%n] for j,x in enumerate(nxt))
    assert sum((2*x*x for x in a),F(0))<F(2,3)
assert F(1,4)+F(1,4)==F(1,2) and lam/2<F(1,2)
for word in product((0,1),repeat=8):
    code=lambda w:sum((2*F(x,3**(j+1)) for j,x in enumerate(w)),F(0))
    def step(w):return (w[0],0)+tuple(1-x for x in w[1:-1])
    now=word
    if code(word)<F(1,27):
        assert code(step(word))>=F(2,27)
        assert code((1-word[0],)+word[1:])>=F(2,3)
    for _ in range(8):
        assert (code(now)>=F(1,2))==bool(word[0])
        for noise in (F(-1,16),F(1,16)):
            assert (code(now)+noise>=F(1,2))==bool(word[0])
        now=step(now)
    flipped=(1-word[0],)+word[1:]
    assert abs(code(flipped)-code(word))==F(2,3)

# The nonlinear equivariance is analytic. This rational sham/impulse slice checks transport.
for j in range(1,9):
    a=F(1,2**j);base=a/24;impulse=a/4
    left=[base,base];right=[base,base]
    response_l=response_r=F(0)
    for t in range(10):
        vl=[impulse if t==0 else 0,0];vr=vl[::-1]
        left=[(x+v)/4+a/32 for x,v in zip(left,vl)]
        right=[(x+v)/4+a/32 for x,v in zip(right,vr)]
        assert left==right[::-1]
        response_l+=sum((x-base)**2 for x in left)
        response_r+=sum((x-base)**2 for x in right)
    assert response_l==response_r>0
    assert (response_l-response_r)/(1+response_l)==0
    # Unequal readout weights alone manufacture a contrast; causal matching must catch it.
    x=impulse/4
    assert 2*x*x-x*x>0
    # A genuine unequal actuator gain is a separate asymmetric control, not full membership.
    assert (impulse/4)**2-(impulse/8)**2==3*impulse**2/64

# Exact tails and worst-case selective corruption; no independence of the bad event is used.
n=8;tail=sum(F(comb(n,k),2**n) for k in range(7,n+1))
assert tail==F(9,256)
joint=1-(1-tail)**2
assert joint<=2*tail
states=list(product((0,1),repeat=n))
reject=[sum(s)>=7 for s in states]
remaining=[i for i,r in enumerate(reject) if not r]
for budget in (0,1,16,247):
    changed=reject[:]
    for i in remaining[:budget]:changed[i]=True
    assert F(sum(changed),256)<=min(F(1),tail+F(budget,256))
L=F(3,2);e=F(1,100);t=F(1,8);power_tail=F(1,10);g=F(1,2)
assert g>t+power_tail+4*L*e
assert -g+power_tail+2*L*e < -t-2*L*e
for units in (F(1,100),F(1),F(100)):
    assert (L/units)*(e*units)==L*e
print('Infinite-model finite slices, product corners, noise, symmetry and interface bounds: PASS')
print('external_support_certified=false')
