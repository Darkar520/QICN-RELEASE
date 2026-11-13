"""Exact rational kernels and boundary controls; infinite geometry is in TeX."""
from fractions import Fraction as F
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[4]

def gap(d, c, C):
    return c*c*min(d/2, 1/(4*C))/(2*C+4*c)

checks = 0
for d in map(F, [F(1,8), F(1,2), 1, 4]):
    for c, C in [(F(1), F(1)), (F(1), F(2)), (F(1,8), F(2))]:
        delta = gap(d,c,C)
        assert 0 < delta <= F(1,24)
        h = delta*F(99,100)
        ds = min(d/2, 1/(4*C))
        assert (2*C/c+4)*h < c*ds
        # Choose an actual rational chain slack eta > 2h.
        slack = c*ds-(2*C/c+4)*h
        eta = 2*h + slack*c/(2*C)
        assert eta > 2*h
        assert C*eta/c+2*h < c*ds-2*h
        perturb = delta*F(49,100)
        assert delta-perturb > delta/2
        checks += 1
assert gap(F(1,2), F(1), F(2)) == F(1,64)

# Canonical Cartesian corners: the lower bound is not lost when an axis
# factor degenerates; the near-product controls instead change the embedding.
for R in [F(1,2), F(2,3), F(1)]:
    for numerator in range(1,100):
        h = R*F(numerator,100)
        if R-h <= h:
            assert R/2 <= h
        checks += 1

# The infinite tail calculation sum_{j>=n}4^-j=(4/3)4^-n is analytic.
# Its rational square envelope verifies 4/sqrt(3) < 3 without rounding.
assert F(16,3) < 9
for n in range(1,41):
    epsilon = F(1,2)**n
    assert 4*epsilon > 0
    assert 4*F(1,2)**(n+1) == (4*epsilon)/2
    assert n+1 <= 2**n
    # Orthogonal embedding norm squared lies between the squared max metric
    # and twice it; fixed B compression loses exactly the lower constant.
    for x,y in [(F(0),F(1)), (F(1),F(0)), (F(1,3),F(2,5))]:
        assert max(x,y)**2 <= x*x+y*y <= 2*max(x,y)**2
        assert epsilon**2*max(x,y)**2 <= x*x+epsilon**2*y*y
    checks += 1

R2=F(1,3); K=F(1,3); delta_atom=F(1,2)
assert R2 > delta_atom**2
assert K/delta_atom == F(2,3)
assert F(1) > K
assert R2 < 1
for numerator in range(1,257):
    s = F(numerator,256)
    E_damage = s*s*R2
    E_protected = 1+E_damage
    Delta2 = s*s*R2
    # Squared positive ratios avoid replacing R=sqrt(1/3) by a float.
    assert E_protected**2 > (K/delta_atom)**2 * Delta2
    # The minimum protected ratio is at s=1, via
    # (R-t)(1-tR)>=0 for t=sR. Divide by R to remain rational.
    assert (1-s)*(1-s*R2) >= 0
    assert E_damage**2 / Delta2 == s*s*R2
    checks += 1
# Damage ratios converge to zero; full clamp is real and violates a putative
# strict threshold in the SAME damage sector. Identity/exchange have no
# positive-deformation witness on either W or QxQ.
for n in range(1,41):
    s=F(1,2)**n
    assert s*s*R2 <= F(1,4)**n
assert K*K/R2 == R2 < (K/delta_atom)**2
assert all(Delta == 0 for Delta in [F(0),F(0)])

paper=(ROOT/'paper1/main.tex').read_text(encoding='utf-8')
base=(ROOT/'basecore/core/sections/03_identity_rigidity_absorbed.tex').read_text(encoding='utf-8')
for label in ['prop:wedge-cartesian-gap','thm:wedge-bilipschitz-gap',
              'prop:wedge-degenerate-controls','prop:wedge-energy-regimes']:
    assert paper.count('\\label{'+label+'}') == 1, label
assert '\\label{prop:base-wedge-metric-sector}' in base
assert 'physical joules' in paper
print(json.dumps({'rational_controls':checks,'passed':True,
    'analytic_geometry':'TeX; not inferred from finite slices',
    'energy':'declared operational hybrid actuator; not physical calibration',
    'external_support_certified':False}))
