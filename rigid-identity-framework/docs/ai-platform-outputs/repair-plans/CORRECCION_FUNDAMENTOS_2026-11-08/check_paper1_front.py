"""Exact controls for the scope of the Paper I corrections."""
from fractions import Fraction as F
from itertools import product

for n in (2, 10, 100, 1000):
    r = F(1, n)
    for x in (F(0), (1 - r) / 2, 1 - r):
        assert (x + r)**2 - x*x >= r*r
    assert r*r / r == r
assert max(abs(a-b) for a,b in product((0,1),repeat=2)) < 2

words = tuple(product((0, 1), repeat=6))
for x,y in product(words, repeat=2):
    if x == y:
        continue
    m = next(i for i,(u,v) in enumerate(zip(x,y),1) if u != v)
    diff = abs(sum(F(2*(u-v),3**i) for i,(u,v) in enumerate(zip(x,y),1)))
    assert F(1,3**m) <= diff <= F(3,3**m)

weights = ((0,F(3,4)), (1,F(1,4)))
stable, sensitive = (lambda y,z: z), (lambda y,z: y ^ z)
def probability(model, intervention):
    return sum(w for z,w in weights if model(intervention,z))
assert probability(stable,0) == probability(sensitive,0) == F(1,4)
assert probability(stable,1) == F(1,4) < probability(sensitive,1) == F(3,4)

histories = tuple(product((0,1),repeat=2))
assert len({x[0] for x in histories}) == 2 < len(histories)
assert all((p,0)[0] == p for p in (0,1))
for a,b,t in product((F(0),F(1,2),F(1)), repeat=3):
    q=(1-t)*a+t*b
    assert 0 <= q <= 1 and q+(1-q)==1
assert (F(0)+F(1))/2 == F(1,2)
print("Fixed scales, 4032 ternary pairs, two causal laws, prefix sections and convex probability limits: PASS")
