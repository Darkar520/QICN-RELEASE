"""Exact finite controls; analytic infinite claims are proved in the manuscripts."""
from fractions import Fraction as F
from itertools import product

def law_and_history():
    flip=lambda x,e:1-x
    assert any(flip(0,e)!=flip(1,e) for e in (0,1))
    assert all(flip(0,e)==1 for e in (0,1))
    states=[0]
    for e in range(8):states.append(flip(states[-1],e))
    fitted=dict(zip(range(8),states[1:]))
    assert all(fitted[e]==states[e+1] for e in range(8))
    repeated_inputs=[0]*8
    assert any(e==f and y!=z for e,y in zip(repeated_inputs,states[1:]) for f,z in zip(repeated_inputs,states[1:]))
    assert len(tuple(product((0,1),repeat=3)))==8
    for n in range(1,12):
        assert (0,)*n+(1,) != (0,)*(n+1)  # Nonclosed histories can share every finite-prefix language.
    print('R0, trajectory-domain and closed-prefix negative controls: PASS')

def weighted_and_multiscale():
    for k in range(8):
        block=range(2**k,2**(k+1))
        assert sum((F(1,n) for n in block),F(0))>=F(1,2)
        assert sum((F(1,n*n) for n in block),F(0))<=F(1,2**k)
    def code(b):return sum((2*F(x,3**(j+1)) for j,x in enumerate(b)),F(0))
    words=tuple(product((0,1),repeat=6))
    for n in range(5):
        x=(0,)*6;y=tuple(int(j==n+1) for j in range(6));d=F(1,3**(n+2))
        assert code(x[:n+1])==code(y[:n+1]) and abs(code(x)-code(y))/d==2
    for a,b in product(words,repeat=2):
        if a==b:continue
        m=next(j for j in range(6) if a[j]!=b[j]);d=F(1,3**(m+1));gap=abs(code(a)-code(b))
        assert d<=gap<=3*d
        for e in (F(1,12),F(1,6)):
            assert (1-e)*gap >= (1-3*e)*d>0
    print('Polynomial boundary, finite truncations and nonempty multiscale family: PASS')

def identification():
    q=(F(1),F(0));tv=sum(abs(a-b) for a,b in zip(q,q[::-1]))/2
    assert tv==1 and (q[0]-q[1])*(1-tv)==0
    assert (q[::-1])[::-1]==q  # Passive relabeling with transported reference.
    risk=min(sum(F(int(c!=v),2) for c in (0,1)) for v in (0,1))
    assert risk==F(1,2)  # Constant versus current-feature decoder, no extra history.
    current_risk=sum(F(int(c!=c),2) for c in (0,1))
    assert current_risk==0 and risk-current_risk==F(1,2)
    # Giving both families every binary lookup table restores equality without history.
    tables=tuple(product((0,1),repeat=2))
    matched=min(sum(F(int(table[c]!=c),2) for c in (0,1)) for table in tables)
    assert matched==current_risk
    for x in (F(-1),F(1)):
        internal=external=x
        for _ in range(8):
            internal=internal/2-internal/4
            external=external/2-external/4
            assert internal==external
    assert abs(F(1))-abs(F(0))==1  # Amplitude-only boundary control.
    assert (F(-2)-F(-3))/(1+F(-2))==-1
    assert F(2,3)<F(3,4)<F(200,201)
    for scale in (F(1,100),F(1),F(100)):
        assert (2*scale)/(scale+2*scale)==F(2,3)
    print('Renaming, history/capacity, feedback/boundary and calibrated-unit controls: PASS')

def decisions():
    xs=(F(1,2),)*7;ys=(F(3,4),)*7
    assert min(xs)==F(1,2) and min(ys)==F(3,4)
    assert F(3,4)**2>F(3,2)*F(1,2)**2  # Why normalization matters.
    for c in (F(0),F(1,2)):
        assert all(c+F(1,n)>c for n in range(1,100))
    points=(F(0),F(3,4),F(3,2))
    assert abs(points[0]-points[1])<=1 and abs(points[1]-points[2])<=1 and abs(points[0]-points[2])>1
    # The same separated states give either a trivial or nontrivial response quotient.
    states=(F(1,4),F(3,4));constant=lambda x:0;decoder=lambda x:int(x>=F(1,2))
    assert states[0]!=states[1]
    assert len({constant(x) for x in states})==1 and len({decoder(x) for x in states})==2
    def certified_cell(y,noise):
        lo,hi=y-noise,y+noise
        if lo>=0 and hi<F(1,2):return 0
        if lo>=F(1,2) and hi<=1:return 1
        return None
    for center in states:
        for error in (F(-1,16),F(0),F(1,16)):
            assert certified_cell(center+error,F(1,16))==decoder(center)
    assert certified_cell(F(1,2),F(1,16)) is None
    assert certified_cell(F(15,32),F(1,16)) is None
    # Any fixed certified horizon can agree with a continuation that later fails.
    for horizon in range(1,12):
        a=[1]*(horizon+2);b=[1]*(horizon+1)+[0]
        assert a[:horizon+1]==b[:horizon+1] and a[-1]!=b[-1]
    print('Normalized gates, nonattained ties, cell closure and decoder witnesses: PASS')

if __name__=='__main__':
    law_and_history();weighted_and_multiscale();identification();decisions()
    print('external_support_certified=false')
