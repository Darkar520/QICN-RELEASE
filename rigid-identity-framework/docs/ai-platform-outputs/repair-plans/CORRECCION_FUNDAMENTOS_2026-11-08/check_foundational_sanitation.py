"""Exact controls for projective and calibrated-transport repairs.

Infinite/cardinality statements are proved in the manuscript. Finite controls
check realizations and negative controls; the six halfspaces below are a
synthetic metric calibration, not six instantiated consciousness predicates.
"""
from fractions import Fraction as F
from itertools import product


def code(bits):
    return sum((2*F(bit,3**j) for j,bit in enumerate(bits,1)),F(0))


def projective_controls():
    for n in range(1,8):
        words=tuple(product((0,1),repeat=n))
        # Interleaving provides the finite coding prototype of the continuum
        # injection; canonical binary expansion and Cantor--Bernstein supply
        # the infinite cardinality argument in the paper.
        codes={code(tuple(z for pair in zip(u,b) for z in pair)) for u,b in product(words,repeat=2)}
        assert len(codes)==2**(2*n)
        for t in range(n):
            for prefix in product((0,1),repeat=t):
                fibre=[w for w in words if w[:t]==prefix]
                assert len(fibre)==2**(n-t)>1
        for tail in product((0,1),repeat=n-1):
            assert len([w for w in words if w[:-1]==tail])==2
        assert len(words)==2**n
    # Without lifting/surjectivity a split at level1 can disappear entirely.
    level1=('a','b');active_level2=('A',);bond={'A':'a'}
    active_histories=[(0,x,y) for x,y in product(level1,active_level2) if bond[y]==x]
    assert len(active_histories)==1
    # Sections do not make the original maps bijective; only their images.
    for n in range(8):
        for prefix in product((0,1),repeat=n):
            selected=prefix+(0,)
            assert selected[:-1]==prefix
            assert len([w for w in product((0,1),repeat=n+1) if w[:-1]==prefix])==2
    ugrid=tuple(F(k,4) for k in range(5))
    orbital=[(u,(0,)*7) for u in ugrid]
    assert len(orbital)==len(ugrid)<len(ugrid)*2**7
    assert len(set(u for u,_ in orbital))==len(orbital)
    print('Projective: injective interleaved codes coexist with noninjective cuts; fibres2/prefixes2^t; orbital-only collapse; dead-lift control')


def channel_and_mass_controls():
    edges=((0,1,F(1,3)),(1,2,F(1,4)))
    labels=(0,0,0,1)
    for a,b,cost in edges:
        assert cost<1 and labels[a]==labels[b]
    assert sum(e[2] for e in edges)==F(7,12)
    assert labels[0]!=labels[3]  # No finite admissible path to the other component.
    false_labels=(0,0,1,1)
    assert any(false_labels[a]!=false_labels[b] and cost<1 for a,b,cost in edges)
    words=tuple(product((0,1),repeat=7));whole=set(words)
    for mask in words:
        image={tuple(a^b for a,b in zip(w,mask)) for w in words}
        assert image==whole
        cost=sum((F(bit,2**j) for j,bit in enumerate(mask,1)),F(0))
        assert cost<1
        for n in range(8):
            for w in words[:8]:
                assert tuple(a^b for a,b in zip(w,mask))[:n]==tuple(a^b for a,b in zip(w[:n],mask[:n]))
    for n in range(7):
        for w in words:
            completion=w[:n]+(0,)*(7-n)
            first=next((j for j,(a,b) in enumerate(zip(w,completion),1) if a!=b),None)
            d=F(0) if first is None else F(1,2**first)
            assert d<=F(1,2**(n+1))
    # A positive-deformation external jump is allowed only in an enlarged sector.
    for k in range(7):
        beta=F(1,2**(k+1));amp=F(1,4)
        deformation=beta*amp/(1+beta);cost=F(1,2**k)*amp
        assert deformation>0 and cost/deformation==2*(1+beta)
    print('Channels/mass: finite chains, disconnected counterexample; coherent support automorphisms, positive point motion and finite-mass enlarged sector; prefix tail bound')


def radius(z,cap=F(1)):
    # Distance to six fixed failure halfspaces in a synthetic l-infinity chart.
    return tuple(min(cap,max(F(0),v)) for v in z)


def transport_controls():
    states=[tuple(F(((i*(2*j+1)+3*j)%17)-4,8) for j in range(6)) for i in range(96)]
    count=0
    for x,y in product(states,repeat=2):
        d=max(abs(a-b) for a,b in zip(x,y));rx,ry=radius(x),radius(y)
        assert all(abs(a-b)<=d for a,b in zip(rx,ry))
        assert min(ry)>=min(rx)-d
        if min(rx)>0 and d<min(rx)/2:assert all(v>0 for v in y)
        count+=1
    # An open failure halfspace has zero distance at its good boundary.
    assert radius((F(0),)*6)==(F(0),)*6
    assert all(v>=0 for v in (F(0),)*6)
    assert min(F(1),F(99))==1  # Common capping is nonexpansive; empty bad set caps at1.
    for x in (F(-1),F(0),F(1,4),F(3,4)):
        for y in (F(0),F(1,4),F(1)):
            assert abs(min(F(1),x)-min(F(1),y))<=abs(x-y)
    # Arbitrary certificates need not coincide at the identical presentation.
    assert F(1,4)!=F(1,2)
    # Identical plant, different comparator sector: gap transport fails.
    target=(F(0),F(0));ones=(F(1),F(1));zeros=(F(0),F(0))
    loss=lambda y,r:max(abs(a-b) for a,b in zip(y,r))
    assert min(loss(target,r) for r in [ones])==1
    assert min(loss(target,r) for r in [ones,zeros])==0
    # Raw gaps scale with units unless the readout metric is pulled back.
    assert loss(tuple(2*x for x in target),tuple(2*x for x in ones))==2
    assert loss(tuple(2*x for x in target),tuple(2*x for x in ones))/2==loss(target,ones)
    print('Transport:',count,'six-radius comparisons; budget bound; zero-radius/good-point, certificate-choice, rival omission and uncalibrated-unit controls')


def decoder_and_window_controls():
    histories=tuple(product((F(0),F(1)),repeat=2))
    d1=lambda h:int(h[1]>F(1,2))
    hmap=lambda h:tuple(x+3 for x in h)
    d2=lambda h:1-d1(tuple(x-3 for x in h))
    for a,b in product(histories,repeat=2):
        assert (d1(a)==d1(b))==(d2(hmap(a))==d2(hmap(b)))
    for h in histories:
        for noise in product((-F(1,4),F(0),F(1,4)),repeat=2):
            observed=tuple(a+b for a,b in zip(h,noise))
            assert d2(hmap(observed))==1-d1(h)
    assert d1((F(0),F(1,2)-F(1,100)))!=d1((F(0),F(1,2)+F(1,100)))
    # Finite sampled histories can hide a later change; this is not full-domain
    # operator equivalence, because late clock states reveal the difference.
    for horizon in range(1,8):
        a=[0]*(horizon+2);b=[0]*(horizon+1)+[1]
        assert a[:horizon+1]==b[:horizon+1] and a[-1]!=b[-1]
    # Arbitrarily small full operator perturbations need not preserve a fixed
    # invariant support: identity versus positive drift, so its global radius0.
    for n in (16,32,64):
        eps=F(1,n);support=(F(1,4),F(3,4))
        f=lambda x:x;g=lambda x:min(F(1),x+eps)
        assert max(abs(g(x)-f(x)) for x in support)<=eps
        assert g(support[-1])>support[-1]
    print('Decoders: quotient/label/noise transport; approximate-boundary and late-window counterexamples; global robustness cannot be inferred from a raw gap')


if __name__=='__main__':
    projective_controls();channel_and_mass_controls();transport_controls();decoder_and_window_controls()
    print('external_support_certified=false')
