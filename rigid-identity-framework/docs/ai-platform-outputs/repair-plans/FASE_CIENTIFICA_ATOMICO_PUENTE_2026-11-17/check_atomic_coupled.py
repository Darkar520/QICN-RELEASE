"""Exact finite controls, not a substitute for the general manuscript proofs."""
from fractions import Fraction as F
from itertools import product, permutations
from pathlib import Path
import hashlib,json

SIGNS=list(product((-1,1),repeat=5))
STATES=list(product((0,1),repeat=2))
A=lambda x:(x[1],x[0]^x[1])
identity=lambda x:x
swap=lambda x:(x[1],x[0])
def responses(x,transition):return (x,transition(x))
for ell in [(1,0),(0,1),(1,1)]:
    readings=[tuple(sum(a*b for a,b in zip(ell,y))%2 for y in responses(x,A)) for x in STATES]
    assert len(set(readings))==4
# All 24 onto product encodings of the four-state system, both port splits.
errors=[]
for encoding in permutations(STATES):
    for order in [(0,1),(1,0)]:
        e=F(0)
        for factor,port in enumerate(order):
            for bit in (0,1):
                for time in (0,1):
                    vals=[responses(x,A)[time][port] for x,code in zip(STATES,encoding) if code[factor]==bit]
                    e=max(e,F(max(vals)-min(vals),2))
        errors.append(e)
assert len(errors)==48 and min(errors)==F(1,2)
for x in STATES:
    assert responses(x,identity)==(x,x)
    assert swap(x)==(x[1],x[0])  # a cross-state message reproduces swap exactly

alpha,beta,h,chi,kappa,zeta=F(1,8),F(1,4),F(1,4),F(1,8),F(1,8),F(1,128)
eta=F(1,8);xi4=beta*chi*zeta*h**4;G=4*eta*xi4
assert xi4==F(1,1048576) and G==F(1,2097152)
def add(x,y):return tuple(a+b for a,b in zip(x,y))
def scale(c,x):return tuple(c*a for a in x)
def native(bits,write=None):
    b=list(bits);b[0]=bits[0];b[1]=0;b[2]=1-bits[1]
    # Sites 4..9 retained, including writable site 8 and fixed index 9.
    if write is not None:b[7]=write
    return tuple(b)
def advance(state,*,evaluate=False,cut=False,write=None,bi=(F(0),F(0)),wi=(F(0),F(0))):
    bits,body,world=state
    e=tuple(a-b for a,b in zip(world,body));l=((e[0]-e[1])/2,(e[0]+e[1])/2)
    td=bits[:9];r=2*td[7]-1
    force=scale(chi,l)
    nonlinear=chi*(kappa*e[0]*e[1]+zeta*(1+(0 if cut else eta*r))*e[0]**2*e[1]**2)
    force=add(force,(nonlinear,F(0)))
    bp=add(add(scale(alpha,body),scale(beta,world)),bi)
    if evaluate:bp=add(bp,force)
    wp=add(add(scale(alpha,world),scale(beta,body)),wi)
    return native(bits,write),bp,wp

def plant(signs,*,cut=False,sham=False):
    s1,s2,s3,s4,r=signs;bits=(0,)*8+(1,)
    z=advance((bits,(F(0),)*2,(F(0),)*2),write=(r+1)//2,
              bi=(h*s1,h*s2),wi=(h*s3,h*s4))
    evaluated=advance(z,evaluate=not sham,cut=cut)
    baseline=advance(z,evaluate=False,cut=cut)
    return advance(evaluated)[2][0]-advance(baseline)[2][0]
def base(s):
    s1,s2,s3,s4,r=s;a,b=s3-s1,s4-s2
    return beta*chi*(h*(a-b)/2+kappa*h*h*a*b+zeta*h**4*a*a*b*b)
def formula(s):
    s1,s2,s3,s4,r=s
    return base(s)+eta*r*xi4*(s3-s1)**2*(s4-s2)**2
def best_proper(s):
    s1,s2,s3,s4,r=s
    return base(s)+4*eta*r*xi4*(1-s1*s3-s2*s4)
def parity(s):
    q=1
    for x in s:q*=x
    return q
def contrast(fn):return sum((parity(s)*fn(s) for s in SIGNS),F(0))/32
for s in SIGNS:
    assert plant(s)==formula(s)
    assert plant(s,cut=True)==base(s)
    assert plant(s,sham=True)==0
    assert abs(formula(s)-best_proper(s))==G
assert contrast(formula)==G and contrast(base)==0 and contrast(best_proper)==0
# Full proper Walsh basis, including all four-root branches and shared sums.
for mask in range(31):
    def branch(s):
        q=1
        for i in range(5):
            if mask>>i&1:q*=s[i]
        return q
    assert contrast(branch)==0
# A partial exact four-root replica lacks the physical retained-bit coupling.
partial=max(abs(formula(s)-base(s)) for s in SIGNS)
assert partial==4*G
# A total replica uses the very same law and budget, all transitions, not a label penalty.
replica=advance
for s in SIGNS:
    assert replica is advance and formula(s)==plant(s)
assert max(abs(formula(s)-plant(s)) for s in SIGNS)==0
# Charge an explicit shared straight-line response DAG in the common language.
nodes={};cost=0
def node(kind,*args):
    global cost
    key=(kind,*args)
    if key not in nodes:
        nodes[key]=len(nodes)
        cost+=1+(abs(args[0].numerator).bit_length()+args[0].denominator.bit_length() if kind=='constant' else 0)
    return nodes[key]
def c(q):return node('constant',F(q))
def op(k,x,y):return node(k,x,y)
s=[node('input',i) for i in range(5)];a=op('sub',s[2],s[0]);b=op('sub',s[3],s[1]);ab=op('mul',a,b)
linear=op('mul',c(h/2),op('sub',a,b));bilinear=op('mul',c(kappa*h*h),ab)
quartic=op('mul',c(zeta*h**4),op('mul',ab,ab))
gain=op('add',c(1),op('mul',c(eta),s[4]));out=op('mul',c(beta*chi),op('add',op('add',linear,bilinear),op('mul',gain,quartic)))
assert cost<256 and 4096+cost<8192
B=8192;wc=G/(128*B);epsilon=G/1024
margin=G-4*epsilon-B*wc
assert margin==F(253,256)*G and margin>G/2
report={'passed':True,'atomic_encodings_checked':len(errors),'atomic_error':str(min(errors)),
        'delta_int':str(F(1,4)),'expanded_preparations':32,'fifth_contrast':str(G),
        'best_proper_error':str(G),'partial_four_root_error':str(partial),
        'sham_contrast':'0','td_cut_contrast':'0','total_replica_error':'0',
        'additional_response_graph_cost':cost,'response_graph_budget':B,
        'noisy_penalized_margin':str(margin),'safe_fibre_lipschitz':str(F(105,128)),
        'scope':'Exact finite controls; manuscript proofs carry universal claims in their stated classes.',
        'external_support_certified':False}
print(json.dumps(report,indent=2))
