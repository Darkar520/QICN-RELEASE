"""Exact controls; universal additive separation is proved in Paper IX/Lean."""
from fractions import Fraction as F
from itertools import product
import check_body_world as old
from body_world_tower import (
    ExtendedState, Mechanism, IDENTITY as I, COMMON as Q, EVALUATIVE as B,
    ZERO, H, EVAL_GAIN, VALUE_SCALE, add, subtract, scale, apply,
    multiply, norm, role_frame, advance,
)
from nonadditive_body_world import advance_nonlinear, KAPPA, CROSS_SCALE


def valuation(role, v, *, interaction=True, flatten=False, motor=F(1)):
    ref=role_frame(old.CONTEXTS[role]);pulse=scale(H,apply(old.transpose(ref),v))
    records=[]
    for arm in (False,True):
        state=ExtendedState(old.core(role))
        for time in range(1,4):
            state=advance_nonlinear(state,mechanism=Mechanism(I,B,motor),
                                    world_input=pulse if time==1 else ZERO,
                                    evaluate=arm and time==2,
                                    interaction=interaction,flatten=flatten)
        records.append(state)
    return apply(ref,subtract(records[1].world,records[0].world))


def mixed(field):
    return subtract(add(field((F(1),F(1))),field((F(-1),F(-1)))),
                    add(field((F(1),F(-1))),field((F(-1),F(1)))))


def response_controls():
    grid=tuple(product((F(-1),F(-1,2),F(0),F(1,2),F(1)),repeat=2))
    for role,v,interaction in product(old.BITS,grid,(False,True)):
        expected=scale(VALUE_SCALE,apply(B,v))
        if interaction:expected=add(expected,(CROSS_SCALE*v[0]*v[1],F(0)))
        assert valuation(role,v,interaction=interaction)==expected
        # Full cross-term disclosure makes the rival's future world reading exact.
        linear=scale(VALUE_SCALE,apply(B,v))
        rival=add(linear,(CROSS_SCALE*v[0]*v[1],F(0)))
        assert rival==valuation(role,v)
        assert valuation(role,v,motor=F(0))==ZERO
    for role in old.BITS:
        field=lambda v:valuation(role,v)
        assert mixed(field)==(4*CROSS_SCALE,F(0))
        assert old.circulation(field)==4*VALUE_SCALE
        assert mixed(lambda v:valuation(role,v,interaction=False))==ZERO
        for v in grid:
            assert subtract(field(v),field(scale(F(-1),v)))==scale(2*VALUE_SCALE,apply(B,v))
            assert valuation(role,v,flatten=True)==valuation(role,(sum(v)/2,sum(v)/2),flatten=True)
    print('Response: both roles, 25 stimuli, exact xi=1/4096, antipodal/circulation preserved; flattened and disclosed-cross ties')


def additive_controls():
    corners=tuple(product((F(-1),F(1)),repeat=2));count=0
    # Arbitrary tabulated univariate channels: no continuity or linearity assumption.
    # Their first coordinate alone suffices for the lower bound.
    for values in product((-2*CROSS_SCALE,F(0),2*CROSS_SCALE),repeat=4):
        g=lambda v:(values[int(v[0]>0)]+values[2+int(v[1]>0)],F(0))
        assert mixed(g)==ZERO
        errors=[abs(CROSS_SCALE*x*y-g((x,y))[0]) for x,y in corners]
        assert max(errors)>=CROSS_SCALE;count+=1
    assert max(norm(subtract(valuation(0,v),scale(VALUE_SCALE,apply(B,v)))) for v in corners)==CROSS_SCALE
    # All raw observation noise signs for both arms, all four corners.
    eta=CROSS_SCALE/64;worst=F(1)
    for signs in product((-1,1),repeat=8):
        obs=[valuation(0,v)[0]+eta*(signs[2*i]-signs[2*i+1]) for i,v in enumerate(corners)]
        contrast=obs[0]-obs[1]-obs[2]+obs[3]
        rival_min=abs(contrast)/4
        candidate=max(abs(obs[i]-valuation(0,v)[0]) for i,v in enumerate(corners))
        gap=rival_min-candidate
        assert gap>=F(15,16)*CROSS_SCALE;worst=min(worst,gap)
    assert worst==F(15,65536)
    print('Additive: 81 arbitrary corner-channel tables; exact clean optimum xi; 256 raw-noise controls; sharp robust margin 15/65536')


def stability_controls():
    grid=tuple(product((F(-1),F(0),F(1)),repeat=4));count=0
    for i,z in enumerate(grid):
        other=grid[(17*i+3)%len(grid)]
        for q,motor,flatten,evaluate in product((I,Q),(-1,0,1),(False,True),(False,True)):
            mechanism=Mechanism(q,B,F(motor))
            state=ExtendedState(old.core(i%2),z[:2],z[2:])
            rival=ExtendedState(state.core,other[:2],other[2:])
            left=advance_nonlinear(state,mechanism=mechanism,evaluate=evaluate,flatten=flatten,
                                   body_input=(H,-H),world_input=(-H,H))
            right=advance_nonlinear(rival,mechanism=mechanism,evaluate=evaluate,flatten=flatten,
                                    body_input=(H,-H),world_input=(-H,H))
            assert max(norm(left.body),norm(left.world))<=1
            assert norm(left.body)<=F(15,16) and norm(left.world)<=F(3,4)
            distance=max(norm(subtract(z[:2],other[:2])),norm(subtract(z[2:],other[2:])))
            after=max(norm(subtract(left.body,right.body)),norm(subtract(left.world,right.world)))
            assert after<=(F(3,4) if evaluate else F(1,2))*distance
            assert left.core==old.step(state.core)
            if not evaluate:
                assert left==advance(state,mechanism=mechanism,body_input=(H,-H),world_input=(-H,H))
            if z==(F(0),)*4:
                zero=advance_nonlinear(state)
                assert zero.body==zero.world==ZERO
            e=subtract(apply(role_frame(state.core.profile),apply(q,state.world)),state.body)
            field=add(apply(B,e),(KAPPA*e[0]*e[1],F(0)))
            assert sum(x*y for x,y in zip(e,field))>=sum(x*x for x in e)/4
            count+=1
    print('Stability:',count,'exact cube/projection/difference controls; 3/4 intervened, 1/2 native; positive corrective component')


def six_and_cross_controls():
    def adapted(state,native=None,mechanism=Mechanism(),**kw):
        flatten=mechanism.evaluation_map==multiply(B,Q)
        assert flatten or mechanism.evaluation_map==B
        return advance_nonlinear(state,native,mechanism._replace(evaluation_map=B),flatten=flatten,**kw)
    saved=old.advance;old.advance=adapted
    try:
        assert old.six_certificates()==(1,)*6
        expected={'D':(0,1,0,1,1,1),'V':(1,0,1,1,1,1),'W':(1,0,0,1,1,1),
                  'A':(1,1,1,0,1,1),'E':(1,0,1,1,0,1),'T':(1,1,1,1,1,0)}
        for key,row in expected.items():assert old.six_certificates(key)==row
        assert old.rank(tuple(tuple(1-v for v in row) for row in expected.values()))==6
    finally:old.advance=saved
    # Force supplied to a shared-state rival, before update, reproduces trajectories.
    for role in old.BITS:
        state=ExtendedState(old.core(role),(H,-H),(H,H))
        for time in range(12):
            evaluate=bool(time%2);command={'q':time%3-1}
            target=advance_nonlinear(state,command,evaluate=evaluate)
            rival=advance(state,command,evaluate=evaluate)
            if evaluate:
                e=subtract(apply(role_frame(state.core.profile),state.world),state.body)
                rival=rival._replace(body=add(rival.body,(EVAL_GAIN*KAPPA*e[0]*e[1],F(0))))
            assert target==rival
            state=target
    print('Six-burden lesion matrix unchanged, rank6; fully cross-informed shared-state rival matches complete trajectories')


if __name__=='__main__':
    response_controls();additive_controls();stability_controls();six_and_cross_controls()
    print('external_support_certified=false')
