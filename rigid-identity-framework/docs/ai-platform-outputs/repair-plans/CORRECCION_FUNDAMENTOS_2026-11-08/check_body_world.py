"""Exact controls for the prospective four-state body/world extension.

Finite controls check realizations, not every member of a nonparametric rival
class. Universal separation uses the proofs in Paper IX. Synthetic evidence.
"""
from fractions import Fraction as F
from itertools import product

from body_world_tower import (
    ALPHA, BETA, EVAL_GAIN, H, VALUE_SCALE, WORLD_SCALE, LOOP_SCALE,
    ZERO, IDENTITY as I, SWAP as S, ROTATION as J, EVALUATIVE as B,
    COMMON as Q, FIRST, SECOND, NULL, ExtendedState, Mechanism,
    add, subtract, scale, apply, multiply, transpose, norm, operator_norm,
    role_frame, fibre_update, fibre_matrix, advance, native_readout,
)
from prefix_tower import (
    ALTERNATING, CONTEXTS, PROFILES, SITES, State, TAP, readout,
    reference_bit, step, write_prefix,
)


BITS=(0,1)
ETA=F(1,4*3**10)


def rank(matrix):
    a=[list(row) for row in matrix];pivot=0
    for col in range(len(a[0])):
        found=next((i for i in range(pivot,len(a)) if a[i][col]),None)
        if found is None:continue
        a[pivot],a[found]=a[found],a[pivot]
        value=a[pivot][col];a[pivot]=[x/value for x in a[pivot]]
        for i in range(len(a)):
            if i!=pivot:
                value=a[i][col];a[i]=[x-value*y for x,y in zip(a[i],a[pivot])]
        pivot+=1
        if pivot==len(a):break
    return pivot


def inverse(matrix):
    n=len(matrix)
    a=[list(row)+[F(i==j) for j in range(n)] for i,row in enumerate(matrix)]
    for col in range(n):
        found=next(i for i in range(col,n) if a[i][col])
        a[col],a[found]=a[found],a[col]
        value=a[col][col];a[col]=[x/value for x in a[col]]
        for i in range(n):
            if i!=col:
                value=a[i][col];a[i]=[x-value*y for x,y in zip(a[i],a[col])]
    return tuple(tuple(row[n:]) for row in a)


def determinant(matrix):
    a=[list(row) for row in matrix];answer=F(1)
    for col in range(len(a)):
        found=next((i for i in range(col,len(a)) if a[i][col]),None)
        if found is None:return F(0)
        if found!=col:a[col],a[found]=a[found],a[col];answer=-answer
        value=a[col][col];answer*=value;a[col]=[x/value for x in a[col]]
        for i in range(col+1,len(a)):
            value=a[i][col];a[i]=[x-value*y for x,y in zip(a[i],a[col])]
    return answer


def matrix_gap(a,b):
    return max(abs(x-y) for left,right in zip(a,b) for x,y in zip(left,right))


def trace(core, commands=(), *, lesion=None, pulse=ZERO, evaluate=False, motor=F(1)):
    if lesion=='D':core=core._replace(profile=CONTEXTS[0])
    mechanism=Mechanism(Q if lesion=='W' else I,
                         multiply(B,Q) if lesion=='V' else B,
                         F(0) if lesion=='E' else motor)
    states=[ExtendedState(core)]
    for time in range(1,5):
        state=advance(states[-1],commands[time-1] if time<=len(commands) else {},
                      mechanism,evaluate=evaluate and time==2,
                      world_input=pulse if time==1 else ZERO)
        if lesion=='A' and time==1:
            code=write_prefix(state.core.code,5,1-reference_bit(5))
            state=state._replace(core=state.core._replace(code=code))
        if lesion=='T' and time==3:
            state=state._replace(core=state.core._replace(memory=F(0)))
        states.append(state)
    return tuple(states)


def core(role=0,code=ALTERNATING,memory=F(0)):
    return State(CONTEXTS[role],F(0),code,memory)


def projection_controls():
    writes=(None,)+tuple(product(SITES,BITS))
    probes=(None,)+tuple(product(SITES,BITS))
    commands=[dict(u=u,q=q,write=w,probe=p)
              for u,w,q in product((F(0),F(1,4)),writes,(-1,0,1))
              for p in (probes if q==0 else (None,))]
    count=0
    for profile,code,memory in product(PROFILES,(F(0),ALTERNATING,F(1)),(F(-1,4),F(0),F(1,4))):
        x=State(profile,F(1,8),code,memory)
        for i,command in enumerate(commands):
            expected=step(x,**command)
            for body,world in ((ZERO,ZERO),((H,-H),(-H,H))):
                state=ExtendedState(x,body,world)
                mechanism=Mechanism(Q if i%2 else I,B,F((-1)**i))
                result=advance(state,command,mechanism,evaluate=bool(i%2),
                               world_input=(H,F(0)))
                assert result.core==expected and native_readout(result)==readout(expected)
                count+=1
            zero=advance(ExtendedState(x),command)
            assert zero.body==zero.world==ZERO
    for profile in PROFILES:
        left=ExtendedState(State(profile,F(0),ALTERNATING,F(1,8)),(H,-H),ZERO)
        right=left._replace(body=(-H,H),world=(H,H))
        for time in range(16):
            assert native_readout(left)==native_readout(right)
            observed=(native_readout(left)[0]+((-1)**time)*ETA)%1
            command={'q':1 if observed>F(1,32) else 0,'u':F(time%3,16)}
            left=advance(left,command,Mechanism(I,B,F(1)))
            right=advance(right,command,Mechanism(Q,B,F(-1)))
    print('Projection:',count,'native lift checks, invariant zero sections and seven adaptive pairs',flush=True)


def stability_controls():
    evaluations=(B,I,S,NULL,multiply(B,Q),multiply(B,FIRST),multiply(B,SECOND),transpose(B))
    corners=tuple(product((F(-1),F(1)),repeat=4))
    inputs=tuple(product((-H,H),repeat=2));count=0;worst=F(0)
    for q,l,motor,evaluate in product((I,Q),evaluations,(F(-1),F(0),F(1)),BITS):
        mechanism=Mechanism(q,l,motor)
        matrix=fibre_matrix(I,mechanism,evaluate=bool(evaluate))
        bound=operator_norm(matrix)
        assert bound<=F(3,4)
        if not evaluate:assert bound<=F(1,2)
        for z,p,d in product(corners,inputs,inputs):
            b,w=fibre_update(z[:2],z[2:],I,mechanism,evaluate=bool(evaluate),body_input=p,world_input=d)
            assert max(norm(b),norm(w))<=1
            worst=max(worst,norm(b),norm(w));count+=1
    assert worst==1
    print('Safety:',count,'affine-box corner checks; exact invariant bound and contraction <= 3/4',flush=True)


def valuation(role,v,lesion=None,l=None):
    reference=role_frame(CONTEXTS[role])
    pulse=scale(H,apply(transpose(reference),v))
    if l is None:
        active=trace(core(role),lesion=lesion,pulse=pulse,evaluate=True)
        passive=trace(core(role),lesion=lesion,pulse=pulse,evaluate=False)
    else:
        def run(evaluate):
            state=ExtendedState(core(role));states=[state]
            for time in range(1,4):
                state=advance(state,mechanism=Mechanism(I,l,F(1)),
                              world_input=pulse if time==1 else ZERO,
                              evaluate=evaluate and time==2)
                states.append(state)
            return states
        active,passive=run(True),run(False)
    return apply(reference,subtract(active[3].world,passive[3].world))


def valuation_matrix(role,lesion=None,l=None):
    columns=[valuation(role,v,lesion,l) for v in ((F(1),F(0)),(F(0),F(1)))]
    return transpose(tuple(columns))


def circulation(field,r=F(1)):
    vertices=((-r,-r),(r,-r),(r,r),(-r,r),(-r,-r))
    return sum((sum((a*b for a,b in zip(scale(F(1,2),add(field(u),field(v))),subtract(v,u))),F(0))
                for u,v in zip(vertices,vertices[1:])),F(0))


def poly_add(a,b):
    n=max(len(a),len(b));return tuple((a[i] if i<len(a) else F(0))+(b[i] if i<len(b) else F(0)) for i in range(n))


def poly_scale(a,c):return tuple(c*x for x in a)


def poly_mul(a,b):
    c=[F(0)]*(len(a)+len(b)-1)
    for i,x in enumerate(a):
        for j,y in enumerate(b):c[i+j]+=x*y
    return tuple(c)


def poly_derivative(a):return tuple(F(i)*a[i] for i in range(1,len(a))) or (F(0),)


def poly_value(a,x):return sum((coefficient*x**i for i,coefficient in enumerate(a)),F(0))


def hermite_bases(nodes):
    result=[]
    for node in nodes:
        lagrange=(F(1),)
        for other in nodes:
            if other!=node:lagrange=poly_scale(poly_mul(lagrange,(-other,F(1))),1/(node-other))
        square=poly_mul(lagrange,lagrange)
        slope=poly_value(poly_derivative(lagrange),node)
        h=poly_mul((1+2*slope*node,-2*slope),square)
        k=poly_mul((-node,F(1)),square)
        result.append((h,k))
    return result


def valuation_controls():
    gamma=VALUE_SCALE;nodes=(F(-1),F(0),F(1));points=tuple(product(nodes,repeat=2))
    field=lambda v:scale(gamma,apply(B,v))
    for role,v in product(BITS,points):assert valuation(role,v)==field(v)
    assert circulation(field)==4*gamma==F(1,32)
    gradient=lambda v:scale(gamma/2,v)
    assert circulation(gradient)==0
    assert max(norm(subtract(field(v),gradient(v))) for v in points)==gamma/2
    scalar_decoder=lambda v:scale(gamma,apply(B,(F(0),v[1])))
    assert max(norm(subtract(field(v),scalar_decoder(v))) for v in points)==gamma/2
    for a,b in product(range(-3,4),repeat=2):
        u=(F(b),F(-a)) if a or b else (F(1),F(1))
        u=scale(1/norm(u),u)
        assert a*u[0]+b*u[1]==0
        assert norm(field(u))>=gamma/2 and field(scale(F(-1),u))==scale(F(-1),field(u))
    finite_codec={v[0]+3*v[1]:field(v) for v in points}
    assert len(finite_codec)==9
    assert all(finite_codec[v[0]+3*v[1]]==field(v) for v in points)
    u=(F(1),F(-1,3));assert u[0]+3*u[1]==0 and norm(subtract(field(u),finite_codec[F(0)]))>=gamma/2

    bases=hermite_bases(nodes)
    def interpolated_gradient(x,y):
        answer=[F(0),F(0)]
        for i,j in product(range(3),repeat=2):
            hx,kx=bases[i];hy,ky=bases[j];gx,gy=field((nodes[i],nodes[j]))
            answer[0]+=gx*poly_value(poly_derivative(kx),x)*poly_value(hy,y)+gy*poly_value(poly_derivative(hx),x)*poly_value(ky,y)
            answer[1]+=gx*poly_value(kx,x)*poly_value(poly_derivative(hy),y)+gy*poly_value(hx,x)*poly_value(poly_derivative(ky),y)
        return tuple(answer)
    assert all(interpolated_gradient(*v)==field(v) for v in points)
    assert valuation_matrix(0,l=I)==tuple(tuple(gamma*x for x in row) for row in I)
    assert circulation(lambda v:valuation(0,v,l=I))==0
    assert circulation(lambda v:valuation(0,v,l=transpose(B)))==-4*gamma
    errors=tuple(product((-gamma/64,gamma/64),repeat=4))
    for e in errors:
        assert norm((e[0]-e[1],e[2]-e[3]))<=gamma/32
        assert gamma/2-2*norm((e[0]-e[1],e[2]-e[3]))>=7*gamma/16
    print('V: exact scalar/gradient optimum gamma/2; nonzero circulation; scalar and Hermite grid emulators exposed',flush=True)


def markov(role,lesion=None,motor=F(1)):
    runs=[trace(core(role),lesion=lesion,pulse=scale(H,v),motor=motor)
          for v in ((F(1),F(0)),(F(0),F(1)))]
    return tuple(tuple(tuple(run[time].body[j] for run in runs) for j in BITS) for time in (1,2,3,4))


def hankel(markovs):
    x,y,z=markovs[:3]
    return tuple(x[i]+y[i] for i in BITS)+tuple(y[i]+z[i] for i in BITS)


def world_controls():
    t=WORLD_SCALE
    for role,motor in product(BITS,(F(-1),F(0),F(1))):
        m=markov(role,motor=motor);p=role_frame(CONTEXTS[role])
        assert m[0]==NULL and m[1]==tuple(tuple(t*x for x in row) for row in p)
        assert m[2]==tuple(tuple(2*ALPHA*t*x for x in row) for row in p)
        h=hankel(m)
        assert rank(h)==4 and determinant(h)==t**4
        assert operator_norm(inverse(h))==24
        assert F(1,4)/operator_norm(inverse(h))==F(1,96)
    # Exact input/output Jacobian used by the C1 minimality proof. Compute it
    # from actual two-impulse trajectories, not from a separately coded A.
    for role,amplitude in product(BITS,(H/2,H)):
        columns=[]
        for j in range(4):
            u=tuple(amplitude*F(j==i) for i in BITS)
            v=tuple(amplitude*F(j==i+2) for i in BITS)
            state=ExtendedState(core(role))
            state=advance(state,world_input=u)
            second=advance(state,world_input=v)
            third=advance(second)
            columns.append(scale(1/amplitude,second.body+third.body))
        jacobian=transpose(tuple(columns))
        assert rank(jacobian)==4 and determinant(jacobian)==BETA**4
    h=hankel(markov(0));checked=0
    for entries in product((F(-1,4),F(0),F(1,4)),repeat=4):
        a=(entries[:2],entries[2:])
        for b,c in product((I,S,Q),repeat=2):
            m0=multiply(c,b);m1=multiply(multiply(c,a),b);m2=multiply(multiply(c,multiply(a,a)),b)
            rival=hankel((m0,m1,m2))
            assert rank(rival)<=2 and matrix_gap(h,rival)>=F(1,96);checked+=1
    assert rank(hankel(markov(0,'W')))==2
    assert markov(0,'W')[1]==markov(1,'W')[1]
    common=(F(1),F(1))
    full=trace(core(1),pulse=scale(H,common));compressed=trace(core(1),pulse=scale(H,common),lesion='W')
    assert all(a.body==b.body and a.world==b.world for a,b in zip(full,compressed))
    assert F(1,6)-2*F(1,64)==F(13,96)
    print('W: rank-four minimal realization; C1 input/output Jacobian checked; inverse norm 24;',checked,'rank-two LTI controls',flush=True)


def motor_controls():
    s=LOOP_SCALE;common=(F(1),F(1));out={}
    for motor in (F(-1),F(0),F(1)):
        run=trace(core(1),pulse=scale(H,common),motor=motor)
        assert run[2].body==scale(H*BETA,common)
        assert run[3].body==scale(2*H*ALPHA*BETA,common)
        expected=H*(3*ALPHA**2*BETA+motor*BETA**3)
        assert run[4].body==scale(expected,common)
        residual=subtract(run[4].body,scale(3*ALPHA/2,run[3].body))
        assert residual==scale(motor*s,common)
        out[motor]=run[4].body
    assert norm(subtract(out[F(1)],out[F(-1)]))==2*s
    midpoint=scale(F(1,2),add(out[F(1)],out[F(-1)]))
    assert max(norm(subtract(value,midpoint)) for value in out.values())==s
    for errors in product((-s/64,s/64),repeat=2):
        assert 1-2*max(map(abs,errors))/s==F(31,32)
    # The same primitive inputs but a leaked surgery label allow a fake fit.
    labelled=lambda label:add(midpoint,scale(label*s,common))
    assert labelled(F(1))==out[F(1)] and labelled(F(-1))==out[F(-1)]
    fixed_cut=[trace(core(1),pulse=scale(H,common),lesion='E',motor=label)[4].body
               for label in (F(-1),F(1))]
    assert fixed_cut[0]==fixed_cut[1]==midpoint
    assert labelled(F(1))!=labelled(F(-1))  # Illicit label sensitivity with the physical edge fixed.
    print('E: early competence unchanged; signed motor return +/-1/256; cut and label-leak controls',flush=True)


def signed_phase(value):return (value+F(1,2))%1-F(1,2)


def d_matrix(lesion=None):
    matrix=[]
    for p,r in product(BITS,repeat=2):
        outcomes=[]
        for target in BITS:
            commands=({'write':(3,reference_bit(3)^target)},{},{'probe':(4,r)},{})
            outcomes.append(signed_phase(trace(core(p),commands,lesion=lesion)[3].core.phase))
        matrix.append(outcomes[0]-outcomes[1])
    return tuple(matrix)


def a_optimum(lesion=None):
    words=tuple(product(BITS,repeat=2));responses=[]
    for word in words:
        code=ALTERNATING
        for site,bit in zip((3,4),word):code=write_prefix(code,site,reference_bit(site)^(1-bit))
        answers=[]
        for query in BITS:
            run=trace(core(0,code),({}, {'probe':(4+query,0)}),lesion=lesion)
            phase=signed_phase(run[2].core.phase)
            for error in (-TAP/16,F(0),TAP/16):assert int(phase+error>TAP/2)==int(phase>TAP/2)
            answers.append(int(phase>TAP/2))
        responses.append(tuple(answers))
    maps=tuple(product(BITS,repeat=4))
    return F(min(sum(decoder[2*encoder[i]+q]!=responses[i][q]
                     for i,q in product(range(4),BITS)) for encoder,decoder in product(maps,repeat=2)),8)


def temporal_gap(lesion=None):
    x=core(1,ALTERNATING+F(2,3))
    runs=[trace(x,({'q':first},{'q':second},{'q':1},{}),lesion=lesion)
          for first,second in ((1,0),(0,1))]
    assert native_readout(runs[0][3])==native_readout(runs[1][3])
    return abs(signed_phase(runs[0][4].core.phase)-signed_phase(runs[1][4].core.phase))


def six_certificates(lesion=None):
    c=d_matrix(lesion);d=bool(c[0]-c[1]-c[2]+c[3])
    v=all(rank(valuation_matrix(role,lesion))==2 and
          circulation(lambda z:valuation(role,z,lesion))!=0 for role in BITS)
    worlds=[markov(role,lesion) for role in BITS]
    w=all(rank(hankel(m))==4 for m in worlds) and worlds[0][1]!=worlds[1][1]
    a=a_optimum(lesion)>0
    common=(F(1),F(1))
    plus=trace(core(1),pulse=scale(H,common),lesion=lesion,motor=F(1))
    minus=trace(core(1),pulse=scale(H,common),lesion=lesion,motor=F(-1))
    e=norm(subtract(plus[4].body,minus[4].body))>0
    t=temporal_gap(lesion)>0
    return tuple(map(int,(d,v,w,a,e,t)))


def joint_controls():
    assert six_certificates()==(1,)*6
    expected={'D':(0,1,0,1,1,1),'V':(1,0,1,1,1,1),'W':(1,0,0,1,1,1),
              'A':(1,1,1,0,1,1),'E':(1,0,1,1,0,1),'T':(1,1,1,1,1,0)}
    signatures=[]
    for lesion in ('D','V','W','A','E','T'):
        actual=six_certificates(lesion);assert actual==expected[lesion],(lesion,actual)
        signatures.append(tuple(1-x for x in actual))
    assert rank(transpose(tuple(signatures)))==6
    assert d_matrix()==(TAP,F(0),F(0),TAP)
    assert a_optimum()==F(1,4) and temporal_gap()==F(1,384)
    margins=(F(1,4),F(7,16),F(13,96),F(1,4),F(31,32),F(1,2)-F(64,19683))
    assert min(margins)==F(13,96)>F(1,16)
    assert F(1,6)-F(1,64)-F(1,8)==F(5,192)>0
    print('Joint: six burdens in one four-step plant; full-rank selective response matrix; min margin 13/96',flush=True)


def gauge_and_hybrid_controls():
    group=[]
    for permutation,signs in product((I,S),product((F(-1),F(1)),repeat=2)):
        group.append(tuple(tuple(signs[i]*x for x in row) for i,row in enumerate(permutation)))
    count=0
    b,w=(H,-H),(F(1,8),-H)
    for p,q,motor,evaluate,cb,cw in product((I,S),(I,Q),(F(-1),F(0),F(1)),BITS,group,group):
        mechanism=Mechanism(q,B,motor)
        expected=fibre_update(b,w,p,mechanism,evaluate=bool(evaluate),body_input=(H,-H),world_input=(H,H))
        newp=multiply(multiply(cb,p),transpose(cw))
        newq=multiply(multiply(cw,q),transpose(cw))
        newl=multiply(multiply(cb,B),transpose(cb))
        actual=fibre_update(apply(cb,b),apply(cw,w),newp,Mechanism(newq,newl,motor),
                            evaluate=bool(evaluate),body_input=apply(cb,(H,-H)),world_input=apply(cw,(H,H)))
        assert actual==(apply(cb,expected[0]),apply(cw,expected[1]));count+=1

    # Two scalar input-coordinate evaluators share exactly the same state.
    # Sum their physical forces before the update; do not average readouts.
    for role,q,motor in product(BITS,(I,Q),(F(-1),F(0),F(1))):
        native=core(role);state=ExtendedState(native,(H,-H),(F(1,8),H));hybrid=state
        for time in range(10):
            command={'q':(-1,0,1)[time%3]};pulse=(H,F(0)) if time%2 else ZERO
            expected=advance(state,command,Mechanism(q,B,motor),evaluate=bool(time%2),world_input=pulse)
            p=role_frame(hybrid.core.profile);sensor=apply(p,apply(q,hybrid.world));error=subtract(sensor,hybrid.body)
            first=scale(EVAL_GAIN,apply(multiply(B,FIRST),error))
            second=scale(EVAL_GAIN,apply(multiply(B,SECOND),error))
            body=add(scale(ALPHA,hybrid.body),scale(BETA,sensor))
            if time%2:body=add(body,add(first,second))
            world=add(add(scale(ALPHA,apply(q,hybrid.world)),scale(BETA*motor,apply(q,apply(transpose(p),hybrid.body)))),apply(q,pulse))
            hybrid=ExtendedState(step(hybrid.core,**command),body,world)
            assert hybrid==expected
            state=expected
    print('Gauge:',count,'signed-frame conjugacies; state-sharing scalar hybrid matches every tested full trajectory',flush=True)


if __name__=='__main__':
    projection_controls()
    stability_controls()
    valuation_controls()
    world_controls()
    motor_controls()
    joint_controls()
    gauge_and_hybrid_controls()
    print('external_support_certified=false',flush=True)
