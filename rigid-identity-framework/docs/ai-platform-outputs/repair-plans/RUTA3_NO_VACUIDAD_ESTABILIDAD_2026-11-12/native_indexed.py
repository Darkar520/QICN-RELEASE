"""Exact prepared sections of the infinite Hilbert-prefix plant.

An infinite sham background a_j/[32(1-r_i)] is retained symbolically; only
finite deviations are stored. This is not a truncation proof of global Cop.
The rational section evolves q=0, theta=0 exactly. A first phase challenge
is evaluated from the exact infinite sum, without approximating a cosine.
"""
from dataclasses import dataclass, field
from fractions import Fraction as F
from functools import lru_cache
from itertools import product

def a(j):
    assert j >= 1
    return F(1,2)**j

def clip(value,low,high):
    return min(high,max(low,value))

@dataclass
class NativeSection:
    sigma: int
    mu: F = F(1,64)
    head: int = 0
    switches: tuple = (1,1,1,1,1)
    bits23: tuple = (0,1)
    delta: dict = field(default_factory=dict)

    def __post_init__(self):
        assert self.sigma in (-1,1)
        assert -F(1,64) <= self.mu <= F(1,64)
        assert all(v in (0,1) for v in [self.head,*self.switches,*self.bits23])

    def rate(self,port):
        return F(1,4) + (1 if port=='L' else -1)*self.sigma*self.mu

    @property
    def body(self):
        return 'L' if self.sigma==1 else 'R'

    @property
    def partner(self):
        return 'R' if self.sigma==1 else 'L'

    def background(self,port,j):
        return a(j)/(32*(1-self.rate(port)))

    def state(self,port,j):
        return self.background(port,j)+self.delta.get((port,j),F(0))

    def ell(self):
        # sum_j a_j^2=1/3; this includes the ENTIRE infinite background.
        base = sum((1/(1-self.rate(p)) for p in ('L','R')),F(0))/64
        return base+F(3,2)*sum((a(j)*v for (p,j),v in self.delta.items()),F(0))

    def phase(self,u=F(0),q=0):
        return (u+q*F(1,32)*(self.head+self.ell()/4)) % 1

    def code(self):
        prefix=[self.head,*self.bits23,*self.switches,(1+self.sigma)//2]
        assert len(prefix)==9
        value=sum((2*F(bit)*F(1,3)**j for j,bit in enumerate(prefix,1)),F(0))
        start=10 if self.sigma==-1 else 11
        return value+F(9,4)*F(1,3)**start

    def step(self,inputs=None,targets=None,routes=None):
        """q=u=0 and old theta=0; clipped targets are actual native feedback."""
        inputs=inputs or {};targets=dict(targets or {});routes=routes or {}
        for dest,source in routes.items():
            p,j=dest;sp,sj=source
            assert j==sj
            targets[dest]=self.background(p,j)+self.rate(sp)*self.delta.get(source,F(0))
        new={}
        for key in set(self.delta)|set(inputs)|set(targets):
            p,j=key;v=F(inputs.get(key,0))
            if key in targets:
                v=clip(4*F(targets[key])-4*self.rate(p)*self.state(p,j)-a(j)/8,-a(j),a(j))
            assert -a(j) <= v <= a(j)
            d=self.rate(p)*self.delta.get(key,F(0))+v/4
            if d:new[key]=d
        return NativeSection(self.sigma,self.mu,self.head,self.switches,
                             (0,1-self.bits23[0]),new)

    def exchange(self):
        # Passive exchange flips bit 9 and the alternating tail from 10.
        return NativeSection(-self.sigma,self.mu,self.head,self.switches,self.bits23,
            {('R' if p=='L' else 'L',j):v for (p,j),v in self.delta.items()})

    def energy_deviation(self):
        return sum((v*v for v in self.delta.values()),F(0))

def parity_trial(sigma,x,y,g,j=4,mu=F(1,64)):
    initial=NativeSection(sigma,mu,bits23=((x+1)//2,(y+1)//2))
    inputs={('L',j):a(j)*x*y*(1+g*sigma)/4,
            ('R',j):a(j)*x*y*(1-g*sigma)/4}
    final=initial.step(inputs)
    observed=8/a(j)*(final.delta.get(('L',j),0)-final.delta.get(('R',j),0))
    return initial,final,observed

def index_trial(sigma,exact_clone=False,mu=F(1,64)):
    initial=NativeSection(sigma,mu)
    clone=NativeSection(sigma,mu,delta={} if exact_clone else {(initial.body,1):-F(1,4)})
    offset=-F(1,32)*initial.ell()/4
    theta=clone.phase(offset,1)
    clearance=min(theta,1-theta)
    return clearance

def ownership_trial(sigma,r,mode='normal',soft=F(1,2),mu=F(1,64)):
    initial=NativeSection(sigma,mu)
    direction=0 if mode=='collapse' else -1 if mode=='opposite' else 1
    inputs={(initial.body,2):direction*a(2)*r/2,
            (initial.partner,2):-direction*a(2)*r/2}
    observed=8/a(2)*initial.step(inputs).delta.get((initial.body,2),F(0))
    report=(1+2*soft*observed)/2
    reference=F(1+r,2)
    return F(1,2)-abs(report-reference)

def continuity_trial(sigma,r,mode='normal',scale=F(1),mu=F(1,64)):
    initial=NativeSection(sigma,mu)
    body,other=initial.body,initial.partner
    initial.delta={(body,3):a(3)*r/8,(other,3):-a(3)*r/8}
    first=initial.step()
    if mode=='break':
        first=initial.step(targets={(p,3):initial.background(p,3) for p in (body,other)})
    elif mode in ('swap','copy','perm'):
        routes={(body,3):(other,3)}
        if mode in ('swap','perm'):routes[(other,3)]=(body,3)
        first=initial.step(routes=routes)
    final=first.step(routes=routes) if mode=='perm' else first.step()
    scores={p:min(clip(r*8/(a(3)*initial.rate(p)**t)*state.delta.get((p,3),F(0)),F(0),F(1))
                  for t,state in [(1,first),(2,final)]) for p in (body,other)}
    rival=scores[body] if mode=='clone' else scores[other]
    return (scores[body]-rival)/(scale+scores[body])

def valuation_trial(sigma,mu=F(1,64),swap=False,scale=F(1)):
    initial=NativeSection(sigma,mu)
    responses=[]
    for port in (initial.body,initial.partner):
        if swap:port='L' if port=='R' else 'R'
        first=initial.step({(port,1):F(1,2)})
        second=first.step()
        responses.append(first.energy_deviation()+second.energy_deviation())
    return (responses[0]-responses[1])/(scale+responses[0]),responses

TARGETS={'swap':{1,2,4},'own':{1},'break':{2},'flat':{3},'val':{4},
         'remap':{1,2},'clone':{0,2},'trans':{1,2},'perm':{1,2},'xsub':{3}}

@lru_cache(maxsize=None)
def comparison_losses(j=4,flattened=False,mu=F(1,64)):
    """Observed exact cube errors; universal minimality is proved in TeX/Lean."""
    cube=list(product((-1,1),repeat=3))
    def forecast(s,x,y,g):
        register=s*x
        register=register*y
        return register*g
    def errors(g):
        weak=full=F(0)
        for s,x,y in cube:
            effective=0 if flattened else g
            _,_,target=parity_trial(s,x,y,effective,j,mu)
            prediction=0 if flattened else forecast(s,x,y,g)
            weak+=target*target
            full+=(target-prediction)**2
        return weak/len(cube),full/len(cube)
    base=errors(1)
    intervention=[errors(0 if name in ('flat','xsub') else -1 if name=='swap' else 1) for name in TARGETS]
    contrast=[F(0),F(0)]
    for s,x,y in cube:
        _,_,active=parity_trial(s,x,y,0 if flattened else 1,j,mu)
        _,_,flat=parity_trial(s,x,y,0,j,mu)
        true=active-flat
        predicted=0 if flattened else forecast(s,x,y,1)-forecast(s,x,y,0)
        contrast[0]+=true*true/len(cube)
        contrast[1]+=(true-predicted)**2/len(cube)
    losses=[(base[k]+sum((row[k] for row in intervention),F(0))/len(intervention)+contrast[k])/3 for k in (0,1)]
    losses[1]+=F(0) if flattened else F(3,16)
    return tuple(losses)

def measurements(sigma,operator='sham',soft=False,mu=F(1,64)):
    """Primary outputs follow executed probes; no baseline vector is assigned."""
    e=F(1,4096) if soft else None
    index=index_trial(sigma,operator=='clone',mu)/F(3,2048)
    if soft:index*=e
    ownmode='collapse' if operator=='own' else 'opposite' if operator in ('swap','remap','trans','perm') else 'normal'
    own=sum((ownership_trial(sigma,r,ownmode,e if soft else F(1,2),mu) for r in (-1,1)),F(0))/2
    contmode={'break':'break','remap':'swap','swap':'swap','trans':'copy','perm':'perm','clone':'clone'}.get(operator,'normal')
    continuity=sum((continuity_trial(sigma,r,contmode,(1-e)/e if soft else F(1),mu) for r in (-1,1)),F(0))/2
    weak,full=comparison_losses(4,operator in ('flat','xsub'),mu)
    gap=weak-full
    scaleP=F(179,240)/e-F(14,15) if soft else F(313,240)
    perspective=gap/(scaleP+weak)
    scaleR=F(179,240)/e-F(14,15) if soft else F(1)
    irreducibility=gap/(scaleR+weak)
    scaleV=1-F(4385,262144) if soft else F(1)
    valuation,_=valuation_trial(sigma,-mu if operator=='val' else mu,operator=='swap',scaleV)
    return [index,max(F(0),own),max(F(0),continuity),max(F(0),perspective),max(F(0),valuation)],irreducibility
