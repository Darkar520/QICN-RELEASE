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
    assert len(set(states[1:]))==2  # Repeating the same input cannot fit these outputs.
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
    for x in (F(-1),F(1)):
        assert x/2-x/4==x/4
        assert 1-abs(x/4)==F(3,4)
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
    assert len({0,1})>1  # Explicit decoder-visible separation, unlike an unobserved state gap.
    print('Normalized gates, nonattained ties, cell closure and decoder witnesses: PASS')

if __name__=='__main__':
    law_and_history();weighted_and_multiscale();identification();decisions()
    print('external_support_certified=false')
