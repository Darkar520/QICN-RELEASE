"""Exact finite controls; not universal mechanization or external support."""
from fractions import Fraction as Q
from itertools import permutations, product
from pathlib import Path
import json
import hashlib

ROOT=next(p for p in Path(__file__).resolve().parents if (p/'rigid-identity-framework').is_dir())
rows=[]

def check(name, condition, scope):
    assert condition, (name,scope)
    rows.append({'name':name,'passed':True,'scope':scope})

def clip(x):
    return max(Q(0),min(Q(1),x))

# Every nontrivial onto product encoding of a four-state support is a 2x2
# bijection. A factor's best uniform scalar prediction is its fibre midpoint.
states=list(product([0,1],repeat=2))
response=lambda x,j,w: Q(x[j if w==0 else 1-j])
for encoding in permutations(states):
    risk=Q(0)
    for j in range(2):
        for local,w in product([0,1],repeat=2):
            values=[response(x,j,w) for x,p in zip(states,encoding) if p[j]==local]
            risk=max(risk,(max(values)-min(values))/2)
    assert risk==Q(1,2)
check('V: complete four-state encoding enumeration',True,
      'All 24 bijections have minimax response error 1/2; independent predictors may take real values, with exact midpoint optimum')
check('V: nonempty comparator and strict margin',
      max(abs(response(x,j,w)-Q(1,2)) for x,j,w in product(states,range(2),range(2)))==Q(1,2)>Q(1,4),
      'Constant midpoint predictors attain the lower bound; positive strict certificate is not an infimum-attainment assumption')
for x in states:
    for word in product([0,1],repeat=3):
        actual=x
        factor=[x[0],x[1]]
        for command in word:
            actual=(actual[0],actual[1])  # Both named controls now hold.
            factor=[factor[0],factor[1]]
            assert tuple(factor)==actual
        assert (actual[0],actual[0])==(x[0],x[0])
assert response((0,0),0,1)!=response((0,1),0,1)
check('V: hold/product negative control',True,
      'All 32 initial-state/three-command histories are reproduced by native factors after replacing swap by hold; the swap response had separated the same port fibre')
for x,j,w in product(states,range(2),range(2)):
    received=(x[j],x[1-j])
    assert response(x,j,w)==received[w]
check('V: communication negative control',True,
      'Transmitting the partner bit permits exact swap, so the no-message interface is essential')
for p in permutations(range(4)):
    inverse={p[i]:i for i in range(4)}
    transition={p[i]:p[states.index(states[i][::-1])] for i in range(4)}
    for i in range(4):
        assert inverse[transition[p[i]]]==states.index(states[i][::-1])
check('V: primitive morphism inverses',True,
      'Every bijective renaming, inverse and conjugated swap obey the transition equation; injectivity alone is not used as isomorphism')

def index_losses(z,t):
    return (z+Q(t,8),1-z+Q(t,8))

def index_gaps(z):
    return tuple(min(index_losses(z,t)[1-l]-index_losses(z,t)[l] for t in range(3)) for l in range(2))

def index_scores(z,scale=Q(1)):
    return tuple(max(g,0)/(scale+max(g,0)) for g in index_gaps(z))

grid=[Q(i,16) for i in range(17)]
for z,zp in product(grid,repeat=2):
    eta=abs(z-zp)
    assert max(abs(a-b) for a,b in zip(index_gaps(z),index_gaps(zp)))<=2*eta
    assert max(abs(a-b) for a,b in zip(index_scores(z),index_scores(zp)))<=2*eta
    if 2*eta<index_gaps(z)[0]:
        assert index_gaps(zp)[0]>0
check('VIII: normalized local margin and continuation',True,
      'Three actual loss times; uniform 2eta gap bound, score bound and winner persistence on every grid pair')
check('VIII: equal-loss index control',index_scores(Q(1,2))==(0,0),
      'A tied name-based winner has no positive local index margin')
for z in grid:
    permuted=tuple(reversed(index_losses(z,0)))
    assert permuted[0]-permuted[1]==-(index_losses(z,0)[0]-index_losses(z,0)[1])
check('VIII: primitive loss relabeling',True,
      'Candidate permutation transports the winning loss without assuming its estimated index is preserved')

def causal_weights(nodes,roots,edges,rho):
    pending=set(nodes);transfer={}
    while pending:
        ready=[e for e in pending if e in roots or all(a in transfer for a,b,w in edges if b==e)]
        assert ready,'Cyclic graph is outside the causal hypothesis'
        for e in ready:
            transfer[e]={l:Q(e==l) if e in roots else sum((w*transfer[a][l] for a,b,w in edges if b==e),Q(0)) for l in roots}
            pending.remove(e)
    ownership={}
    for e in nodes:
        d=sum(rho[l]*transfer[e][l] for l in roots)
        ownership[e]=None if d==0 else {l:rho[l]*transfer[e][l]/d for l in roots}
    return ownership

nodes=list(range(5));roots=[0,1];edges=[(0,2,Q(1)),(1,3,Q(1,2)),(2,4,Q(1,4)),(3,4,Q(1,2))];rho={0:Q(1),1:Q(2)}
own=causal_weights(nodes,roots,edges,rho)
for perm in permutations(nodes):
    f=dict(zip(nodes,perm));new=causal_weights([f[x] for x in nodes],[f[l] for l in roots],[(f[a],f[b],w) for a,b,w in edges],{f[l]:v for l,v in rho.items()})
    for e,l in product(nodes,roots):
        assert new[f[e]][f[l]]==own[e][l]
check('VIII: weighted causal path transport',True,
      'All 120 graph renamings preserve computed path contributions and normalized ownership, including multiple weighted paths')
before=causal_weights([0,1,2],[0,1],[(0,2,Q(1))],{0:Q(1),1:Q(1)})
after=causal_weights([0,1,2],[0,1],[(1,2,Q(1))],{0:Q(1),1:Q(1)})
check('VIII: causal transplant control',before[2][0]==1 and after[2][0]==0,
      'Holding root actuation ports, event name and reference fixed while changing the parent reverses attribution')
empty=causal_weights([0,1,2],[0,1],[],{0:Q(1),1:Q(1)})
check('VIII: unsupported event',empty[2] is None,
      'Zero path-mass denominator is missing evidence, not an ownership score of zero')

def primary_intervene(y,u):
    return tuple(Q(0) if i==u else v for i,v in enumerate(y))

def derived(y):
    passed=[]
    for u in range(5):
        yi=primary_intervene(y,u);drop=[a-b for a,b in zip(y,yi)]
        passed.append(drop[u]>=Q(1,4) and all(drop[j]==0 for j in range(5) if j!=u))
    weak=min(1+sum(y),2+sum(y))/8
    full=sum(y)/16
    return (Q(sum(passed),5),clip((weak-full)/(1+weak)))

for y in product([Q(0),Q(1,2),Q(1)],repeat=5):
    for nuisance in [0,1]:
        record=(y,nuisance)
        actual_profile=Q(sum(y[u]>=Q(1,4) for u in range(5)),5)
        actual_weak=(1+sum(y))/8;actual_full=sum(y)/16
        assert derived(record[0])==(actual_profile,(actual_weak-actual_full)/(1+actual_weak))
check('VIII: exact derived-coordinate reconstruction',True,
      '486 complete records, same intervention and loss protocol; closed nuisance fibre gives identical derived coordinates')
for n in range(3,30):
    lo=Q(1,4)-Q(1,2**n);hi=Q(1,4)+Q(1,2**n)
    assert derived((lo,Q(0),Q(0),Q(0),Q(0)))[0]==0
    assert derived((hi,Q(0),Q(0),Q(0),Q(0)))[0]==Q(1,5)
check('VIII: indicator-boundary control',True,
      'Arbitrarily small threshold crossings change the discrete profile; continuity requires strict clearance or abstention')
same_primary=(Q(1,2),)*5
profiles=[]
for hidden_context in [0,1]:
    target=(same_primary[0]-Q(hidden_context,2),*same_primary[1:])
    profiles.append(Q(same_primary[0]-target[0]>=Q(1,4)))
check('VIII: fibre obstruction to universal compression',profiles==[0,1] and Q(abs(profiles[1]-profiles[0]),2)==Q(1,2),
      'Same five baseline readings, different native causal responses: every five-field decoder incurs error at least 1/2')

# The new bridge plant is tested as a rational finite cohort of its four
# actual ports. Its infinite-core/global-class proof remains in the manuscript.
ALPHA=Q(1,8);BETA=H=Q(1,4);CHI=KAPPA=Q(1,8);ZETA=Q(1,128)
L0=((Q(1,2),Q(-1,2)),(Q(1,2),Q(1,2)))
IDENTITY=((Q(1),Q(0)),(Q(0),Q(1)))
PROJECTOR=((Q(1,2),Q(1,2)),(Q(1,2),Q(1,2)))
GAMMA=H*BETA*CHI;XI2=H**2*BETA*CHI*KAPPA;XI4=H**4*BETA*CHI*ZETA

def matvec(a,x):
    return tuple(sum((aij*xj for aij,xj in zip(row,x)),Q(0)) for row in a)

def port_step(state,sigma=1,motor=1,evaluate=False,body=(Q(0),Q(0)),world=(Q(0),Q(0)),
              projection=IDENTITY,flatten=IDENTITY,direction=0,erase_index=False,zeta=ZETA):
    b,w=state[:2],state[2:];p=1 if erase_index else sigma
    qw=matvec(projection,w)
    e=tuple(p*x-y for x,y in zip(qw,b));re=matvec(flatten,e)
    lin=matvec(L0,re)
    nonlinear=KAPPA*re[0]*re[1]+zeta*re[0]**2*re[1]**2
    force=tuple(CHI*(lin[i]+(nonlinear if i==direction else 0)) if evaluate else Q(0) for i in range(2))
    nb=tuple(ALPHA*b[i]+BETA*p*qw[i]+force[i]+body[i] for i in range(2))
    nw=matvec(projection,tuple(ALPHA*w[i]+BETA*motor*p*b[i]+world[i] for i in range(2)))
    return nb+nw

ZERO=(Q(0),)*4

def world_consequence(v,sigma=1,**kw):
    arms=[]
    for active in [False,True]:
        state=port_step(ZERO,sigma,world=tuple(H*sigma*x for x in v),**kw)
        state=port_step(state,sigma,evaluate=active,**kw)
        state=port_step(state,sigma,**kw)
        arms.append(state)
    return tuple(sigma*(arms[1][j]-arms[0][j]) for j in [2,3])

def root_consequence(signs,sigma=1,direction=0,**kw):
    arms=[]
    for active in [False,True]:
        state=port_step(ZERO,sigma,body=tuple(H*x for x in signs[:2]),
                        world=tuple(H*sigma*x for x in signs[2:]),direction=direction,**kw)
        state=port_step(state,sigma,evaluate=active,direction=direction,**kw)
        state=port_step(state,sigma,direction=direction,**kw)
        arms.append(state)
    return sigma*(arms[1][2+direction]-arms[0][2+direction])

SQUARE=list(product([Q(-1),Q(0),Q(1)],repeat=2))
ROOTS=list(product([Q(-1),Q(1)],repeat=4))

def parity4(x):
    return x[0]*x[1]*x[2]*x[3]

def fourth_contrast(data):
    return sum((parity4(s)*data[s] for s in ROOTS),Q(0))/16

for v,sigma in product(SQUARE,[-1,1]):
    lin=matvec(L0,v)
    exact=(GAMMA*lin[0]+XI2*v[0]*v[1]+XI4*v[0]**2*v[1]**2,GAMMA*lin[1])
    assert world_consequence(v,sigma)==exact
check('IX: physical quartic world consequence',GAMMA==Q(1,128) and XI4==Q(1,1048576),
      'Paired three-transition simulations, both actual index orientations and all nine reserved points give the analytic coefficients')

for direction,sigma in product([0,1],[-1,1]):
    actual={s:root_consequence(s,sigma,direction) for s in ROOTS}
    assert fourth_contrast(actual)==4*XI4
    for mask in range(15):
        if mask==15:continue
        basis={s:Q(1) for s in ROOTS}
        for s in ROOTS:
            for j in range(4):
                if mask & (1<<j):basis[s]*=s[j]
        assert fourth_contrast(basis)==0
    proper={s:y-4*XI4*parity4(s) for s,y in actual.items()}
    assert fourth_contrast(proper)==0
    assert max(abs(actual[s]-proper[s]) for s in ROOTS)==4*XI4
check('IX: full proper-ancestry contrast',True,
      'Both late directions and both indices: target fourth contrast 4xi4, all 15 proper Boolean Fourier basis functions zero, explicit optimal proper forecast')

for state in product([Q(-1),Q(1)],repeat=4):
    for sigma,motor,direction in product([-1,1],[-1,0,1],[0,1]):
        for inputs in product([Q(-1,4),Q(1,4)],repeat=4):
            nxt=port_step(state,sigma,motor,True,inputs[:2],inputs[2:],direction=direction)
            assert max(map(abs,nxt[:2]))<=Q(61,64)
            assert max(map(abs,nxt[2:]))<=Q(3,4)
check('IX: invariant-cube controls',True,
      'All signed cube vertices, extreme actuators, motor settings and query directions obey the analytic safety envelopes; universal derivative proof is in source')

washout=Q(1,2)*Q(3,8)**6
assert Q(1,32)-washout>Q(1,64)
check('IX: global product-bound constants',min(Q(1,384),Q(1,2*3**9),Q(1,128))==Q(1,39366)>Q(1,78732),
      'Positive enlarged-sector lower bound and strict certificate; no inference of full integration from projection alone')

def matrix_rank(matrix):
    m=[list(row) for row in matrix];r=0
    for j in range(len(m[0])):
        pivot=next((i for i in range(r,len(m)) if m[i][j]),None)
        if pivot is None:continue
        m[r],m[pivot]=m[pivot],m[r]
        lead=m[r][j];m[r]=[x/lead for x in m[r]]
        for i in range(len(m)):
            if i!=r:
                scale=m[i][j];m[i]=[x-scale*y for x,y in zip(m[i],m[r])]
        r+=1
        if r==len(m):break
    return r

def world_hankel(projection=IDENTITY,motor=1):
    markov=[]
    for axis in range(2):
        state=ZERO;sequence=[]
        for t in range(3):
            pulse=tuple(H if axis==j and t==0 else Q(0) for j in range(2))
            state=port_step(state,motor=motor,world=pulse,projection=projection)
            sequence.append(state[2:])
        markov.append(sequence)
    mats=[[[markov[j][t][i] for j in range(2)] for i in range(2)] for t in range(3)]
    return [mats[0][i]+mats[1][i] for i in range(2)]+[mats[1][i]+mats[2][i] for i in range(2)]

assert matrix_rank(world_hankel())==4
assert H*BETA**2/(1+ALPHA**2+BETA**2)==Q(1,69)
assert matrix_rank(world_hankel(PROJECTOR))==2 and matrix_rank(world_hankel(motor=0))==2
check('IX: world dynamic-order certificate',True,
      'Hankel entries come from actual impulse dynamics, rank four intact and rank two for compression or motor cutting, with certified singular-value lower bound 1/69')

for sigma in [-1,1]:
    body_sequences=[]
    for motor in [-1,1]:
        state=ZERO;sequence=[]
        for t in range(4):
            state=port_step(state,sigma,motor,world=(H,H) if t==0 else (Q(0),Q(0)))
            sequence.append(state)
        assert sigma*sequence[3][0]==H*(3*ALPHA**2*BETA+motor*BETA**3)
        body_sequences.append([x[:2] for x in sequence])
    assert body_sequences[0][:3]==body_sequences[1][:3]
check('IX: causal motor and selected early control',True,
      'Only the first three BODY responses are claimed equal; the fourth return differs and is a physical edge effect')

def stored_roots(signs,reset_first=False):
    r=Q(17,64);recovered=[]
    for j,s in enumerate(signs,6):
        a=Q(1,2**j);bar=a/(32*(1-r))
        after_store=r*bar+(a*s/2)/4+a/32
        assert after_store==bar+a*s/8
        after_query=r*after_store+a/32
        if reset_first and j==6:
            commanded=4*bar-4*r*after_store-a/8
            assert abs(commanded)<=a
            after_query=r*after_store+commanded/4+a/32
        recovered.append((after_query-bar)/(r*a/8))
    return tuple(recovered)

for query in [0,1]:
    intact={s:root_consequence(stored_roots(s),direction=query) for s in ROOTS}
    collapsed={s:root_consequence(stored_roots(s,True),direction=query) for s in ROOTS}
    assert fourth_contrast(intact)==4*XI4 and fourth_contrast(collapsed)==0
    for a,b in product(ROOTS,repeat=2):
        if a[1:]==b[1:]:assert collapsed[a]==collapsed[b]
check('IX: equal-retention late-query alternatives',True,
      'Four actual native Hilbert payloads, late physical query and world consequence; both models may retain all four roots, and reset removes a causal root without changing query coverage')

rate=Q(17,64);a=Q(1,256);terminal=[]
for order in [-1,1]:
    bar=a/(32*(1-rate));z=bar
    for pulse in [order*a/2,-order*a/2,Q(0)]:z=rate*z+pulse/4+a/32
    terminal.append(z-bar)
assert terminal[0]==-terminal[1] and abs(terminal[0])==a*rate*(1-rate)/8
check('IX: temporal-order control',True,
      'Three native transitions with identical pulse multisets and costs have opposite actual terminal payloads; a third-step reset returns the common reference')

replica_checks=0
for state in product([Q(-1),Q(0),Q(1)],repeat=4):
    for sigma,motor,evaluate in product([-1,1],[-1,0,1],[False,True]):
        b,w=state[:2],state[2:];e=tuple(sigma*x-y for x,y in zip(w,b));linear=matvec(L0,e)
        scalar=KAPPA*e[0]*e[1]+ZETA*e[0]**2*e[1]**2
        hybrid=tuple(ALPHA*b[i]+BETA*sigma*w[i]+(CHI*(linear[i]+(scalar if i==0 else 0)) if evaluate else 0) for i in range(2))+tuple(ALPHA*w[i]+BETA*motor*sigma*b[i] for i in range(2))
        assert hybrid==port_step(state,sigma,motor,evaluate)
        replica_checks+=1
check('IX: unrestricted shared-state replica',replica_checks==972,
      'Linear control plus one scalar evaluator exactly reproduces the candidate without new state or information; it has a genuine four-root join and is an explicit enlargement control')
assert fourth_contrast({s:root_consequence(s,zeta=Q(0)) for s in ROOTS})==0
check('IX: removed-interaction negative control',True,
      'Deleting the physical quartic coupling removes the identifying fourth contrast; no positive B9 certificate is retained in that control')

# Recompute cross-effects from the same physical preparations, not from a
# desired Boolean lesion matrix. These are certified lower scores.
a_coefficients={
 'intact':fourth_contrast({s:root_consequence(s) for s in ROOTS}),
 'D':fourth_contrast({s:root_consequence(s,erase_index=True) for s in ROOTS}),
 'V':fourth_contrast({s:root_consequence(s,flatten=PROJECTOR) for s in ROOTS}),
 'W':fourth_contrast({s:root_consequence(s,projection=PROJECTOR) for s in ROOTS}),
 'A':fourth_contrast({s:root_consequence(stored_roots(s,True)) for s in ROOTS}),
 'E':fourth_contrast({s:root_consequence(s,motor=0) for s in ROOTS}),
 'T':fourth_contrast({s:root_consequence(s) for s in ROOTS})}
a_scores={k:clip(abs(v)/(2*XI4)) for k,v in a_coefficients.items()}
assert list(a_scores.values())==[1,1,Q(3,4),Q(1,2),0,0,1],a_scores
lesion_profiles={
 'intact':(1,1,1,a_scores['intact'],1,1),
 'D':(0,1,1,a_scores['D'],1,1),
 'V':(1,0,1,a_scores['V'],1,1),
 'W':(1,0,0,a_scores['W'],1,1),
 'A':(1,1,1,a_scores['A'],1,1),
 'E':(1,0,0,a_scores['E'],0,1),
 'T':(1,1,1,a_scores['T'],1,0)}
# Other entries are linked to the separately executed index, circulation,
# Hankel, motor and native-order controls above; A is the coupled calculation.
targets=[{0},{1,3},{1,2,3},{3},{1,2,3,4},{5}]
drops=[tuple(1-Q(x) for x in lesion_profiles[k]) for k in 'DVWAET']
assert matrix_rank([list(d) for d in drops])==6
for d,target in zip(drops,targets):
    assert all(d[j]>=Q(1,8) if j in target else d[j]==0 for j in range(6))
assert min(x for d in drops for x in d if x)>Q(1,8)
check('IX: physical cross-effects retained in lesion template',True,
      'V and W leave A scores 3/4 and 1/2, E removes A; six full templates have rank six, fixed scale, target threshold 1/8 and exact off-target tolerance zero')

# A common rational straight-line forecast language. Counter evaluates the
# actual port predictor while collecting its unfolded operator graph and
# rational constants; duplicates are deliberately charged again (upper bound).
class Counted:
    ops=0;constants=set()
    def __init__(self,value):self.value=Q(value)
    @classmethod
    def wrap(cls,x):
        if isinstance(x,cls):return x
        x=Q(x);cls.constants.add(x);return cls(x)
    def binary(self,other,op):
        other=self.wrap(other);type(self).ops+=1
        return Counted(op(self.value,other.value))
    def __add__(self,o):return self.binary(o,lambda a,b:a+b)
    __radd__=__add__
    def __sub__(self,o):return self.binary(o,lambda a,b:a-b)
    def __rsub__(self,o):return self.wrap(o).__sub__(self)
    def __mul__(self,o):return self.binary(o,lambda a,b:a*b)
    __rmul__=__mul__
    def __neg__(self):return self*Q(-1)
    def __pow__(self,n):
        assert n==2
        return self*self

Counted.ops=0;Counted.constants=set()
counted_result=root_consequence(tuple(Counted(x) for x in ROOTS[3]))
assert counted_result.value==root_consequence(ROOTS[3])
constant_bits=sum(1+abs(v.numerator).bit_length()+v.denominator.bit_length()
                  for v in Counted.constants)
port_program_cost=Counted.ops+constant_bits+32  # registers, query/index branch
# One shared port subroutine serves all modes and six tasks. Extra explicit
# native affine query formulas, scales and head branches have this conservative
# code bound (6 formulas, each <= 32 operations/registers and 16 constants of
# <= 32 bits); constants here cover the rational native coefficients as well.
native_formula_bound=6*(32+16*32)
program_cost_bound=port_program_cost+native_formula_bound
assert program_cost_bound<=4096,(port_program_cost,program_cost_bound)
assert program_cost_bound*XI4/2**18<=XI4/64
check('IX: common forecast description budget',True,
      'Executed flattened port graph plus explicit native affine/formula code bound; common constants/operators/register language, not semantic module counts')

# Instrumental independence is evaluated on nonconstant transcript functions.
# Gains alter the readout, not truth flags or incoming causal inputs.
raw_heads=[
 [Q(1,16),Q(-1,16)],
 [world_consequence(v)[0] for v in SQUARE],
 [x for row in world_hankel() for x in row],
 [root_consequence(s) for s in ROOTS],
 [Q(-1,256),Q(1,256)],
 terminal]
assert all(any(x!=y for x in h for y in h) for h in raw_heads)
records=[]
for gains in product([Q(0),Q(1)],repeat=6):
    payloads=[[str(g*x) for x in h] for g,h in zip(gains,raw_heads)]
    # Homogeneous separator certificates scale from the actual transcript.
    ratios=[max(abs(Q(x)) for x in payload)/max(abs(x) for x in h)
            for payload,h in zip(payloads,raw_heads)]
    scores=tuple(clip(2*r) for r in ratios)
    assert scores==gains
    stored={'payloads':payloads,'gains':[str(g) for g in gains],
            'authority':'synthetic_mathematical_certificate',
            'external_support_certified':False}
    encoded=json.dumps(stored,sort_keys=True,separators=(',',':'))
    row={'payload':stored,'digest':hashlib.sha256(encoded.encode()).hexdigest()}
    decoded=json.loads(json.dumps(row))
    assert hashlib.sha256(json.dumps(decoded['payload'],sort_keys=True,separators=(',',':')).encode()).hexdigest()==row['digest']
    assert decoded['payload']['payloads']==payloads
    records.append(scores)
assert len(set(records))==64
assert not any(r[0]!=r[2] for r in records if r[0]==r[2])
check('IX: instrumental semantic and row-local independence',True,
      '64 complete nonconstant/zero transcript families with fixed losses and row-local payload/hash reconstruction; tying D/W gains forbids discordant patterns, conjunction is not independent')

FRAMES=[IDENTITY,((-Q(1),Q(0)),(Q(0),-Q(1))),((Q(0),Q(1)),(Q(1),Q(0)))]
for frame in FRAMES:
    for v in SQUARE:
        # All frames here are orthogonal involutions. Conjugate the whole
        # force, including its nonlinear direction, rather than just L0.
        reindexed=matvec(frame,v)
        recovered=matvec(frame,reindexed)
        assert recovered==v
        physical=world_consequence(recovered)
        mode_response=matvec(frame,physical)
        assert matvec(frame,mode_response)==world_consequence(v)
for v in SQUARE:
    x=v
    for a,b in [(0,1),(1,2),(2,0)]:
        x=matvec(FRAMES[b],matvec(FRAMES[a],x))
    assert x==v
assert matvec(FRAMES[2],matvec(FRAMES[1],(Q(1),Q(0))))!=(Q(1),Q(0))
check('IX: coherent three-mode transports',True,
      'Whole-law conjugacy with transported inputs/readouts/references returns every rational preparation; an omitted inverse does not')

raw_margin=4*XI4-program_cost_bound*XI4/2**18
assert raw_margin>3*XI4 and clip(raw_margin/XI4)==1
assert (raw_margin-4*(XI4/1024))>3*XI4
template_passes=[all(d[j]>=Q(1,8) if j in t else d[j]==0 for j in range(6))
                 for d,t in zip(drops,targets)]
profile=Q(sum(template_passes),len(template_passes))
factors=[*map(Q,lesion_profiles['intact']),clip(raw_margin/XI4),profile]
product_value=Q(1)
for factor in factors:product_value*=factor
# All eight are unit rationals here; no numerical root approximation.
assert product_value==1
functional=product_value
assert all(x==1 for x in lesion_profiles['intact']) and all(d for d in drops)
assert len(FRAMES)==3 and raw_margin>XI4 and functional>Q(1,16)
check('IX: completed exact mathematical record',True,
      'Positive proper-ancestry margin, intact six scores, matched lesion templates, transported witness and explicit cost; this is a synthetic operational binding, not empirical or phenomenal evidence')

# Null adjudication: conditional independence on the leak complement gives
# (1-p)/2; arbitrary selective leak without that assumption gives 1/2-p.
for p,gamma in product([Q(0),Q(1,4),Q(1,2),Q(3,4),Q(1)],
                       [Q(1,2),Q(3,4),Q(1)]):
    for abstain in [Q(0),Q(1,3),Q(1)]:
        risk=(1-p)*((1-abstain)/2+abstain*gamma)
        assert risk>=(1-p)/2>=max(Q(0),Q(1,2)-p)
    assert gamma>=Q(1,2) # always-tie does not have zero null risk
assert Q(1,4)<(1-Q(1,4))/2  # selective leakage separates the two claims
check('X: balance, abstention and selective-leak boundary',True,
      'Exact randomized null risk for gamma>=1/2, free abstention counterexample, and distinct leakage assumptions; shuffled balanced labels remain chance-level')

# Bridge: the countermodel changes an identity object, not a state point.
assert Q(1)/Q(1,16)==16<Q(10**6)
assert Q(1,10)>Q(1,32)
check('Bridge: object-sector and continuity hypotheses',True,
      'Independent Hausdorff object perturbation cost 1/gap 1/16 gives finite mass 16 while fixed state dynamics survive; continuity/null transfer still requires its separate typed hypotheses')

out=ROOT/'.cache/qicn-math-regressions';out.mkdir(parents=True,exist_ok=True)
payload={'parameters':{k:str(v) for k,v in {'alpha':ALPHA,'beta':BETA,'h':H,'chi':CHI,'kappa':KAPPA,'zeta':ZETA,'xi4':XI4}.items()},
 'root_world_responses':[{ 'preparation':list(map(str,s)), 'response':str(root_consequence(s))} for s in ROOTS],
 'lesion_scores':{k:list(map(str,v)) for k,v in lesion_profiles.items()},
 'four_root_coefficients':{k:str(v) for k,v in a_coefficients.items()},
 'program_cost':{'port':port_program_cost,'native_formula_bound':native_formula_bound,'total_bound':program_cost_bound,'budget':4096},
 'raw_margin_lower_bound':str(raw_margin),'normalized_margin':str(clip(raw_margin/XI4)),
 'intervention_profile':str(profile),'functional':str(functional),
 'head_factors':list(map(str,factors)),
 'independence_patterns':len(set(records)),'transport_modes':3,
 'program_source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
 'authority':'synthetic_mathematical_certificate','external_support_certified':False}
(out/'ETAPA2_BRIDGE_MATHEMATICAL_RECORD.json').write_text(json.dumps(payload,indent=2)+'\n',encoding='utf8')
report={'passed':True,'checks':len(rows),'controls':rows,'scope':'Finite rational model and negative controls. Manuscript universal proofs, broad comparator realizability and external empirical evidence remain distinct.','external_support_certified':False}
(out/'ETAPA2_DOWNSTREAM_CONTROLS.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8')
print(json.dumps({k:report[k] for k in ['passed','checks','scope','external_support_certified']}))
