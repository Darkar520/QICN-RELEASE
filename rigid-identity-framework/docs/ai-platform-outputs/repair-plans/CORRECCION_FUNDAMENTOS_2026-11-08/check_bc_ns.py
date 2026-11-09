"""Exact arithmetic controls for the binary budget and common readout."""
from fractions import Fraction as Q
from itertools import product

checks = 0

def check(condition, detail):
    global checks
    if not condition:
        raise AssertionError(detail)
    checks += 1

def ternary(bits):
    return sum((Q(2 * bit, 3**j) for j, bit in enumerate(bits, 1)), Q(0))

def angle(x, y):
    difference = (x - y) % 1
    return min(difference, 1 - difference)

def code_bounds():
    for budget in range(9):
        diameter = Q(1, 3**budget)
        intervals = [(ternary(prefix), ternary(prefix) + diameter)
                     for prefix in product((0, 1), repeat=budget)]
        endpoints = sorted(x for interval in intervals for x in interval)
        check(len(endpoints) == len(set(endpoints)) == 2**(budget+1), ('packing size', budget))
        for lo, hi in zip(endpoints, endpoints[1:]):
            check(hi - lo >= diameter, ('packing gap', budget))
        for lo, hi in intervals:
            midpoint = (lo + hi) / 2
            check(max(midpoint-lo, hi-midpoint) == diameter/2, ('midpoint', budget))
        zero_prefix = (0,) * budget
        check(ternary(zero_prefix + (0,)) < ternary(zero_prefix + (1,)),
              ('exact real sees a late bit', budget))
        check(Q(1, 2**(budget+1)) < Q(1, 2**budget), ('binary history error', budget))

def common_readout():
    phases = (Q(0), Q(1,8), Q(3,8), Q(7,8))
    bits = ((0,)*6, (1,0,1,1,0,0), (0,0,0,0,0,1), (1,)*6)
    for k, a in product(range(6), (Q(1,16), Q(1,4), Q(7,16))):
        beta = Q(1,3**(k+1))
        for theta, phi, s, r, x, y in product(phases, phases, (0,1), (0,1), bits, bits):
            history = max(max(angle(theta+s*a*(t>k), phi+r*a*(t>k)),
                              int(x[:t] != y[:t])) / 3**t for t in range(8))
            readout = max(angle(theta,phi), beta*angle(theta+s*a,phi+r*a), abs(ternary(x)-ternary(y)))
            check(history <= readout <= 3*history, ('common bound',k,a,theta,phi,s,r))
        for theta, s, b in product(phases, (0,1), bits):
            for t in range(len(b)):
                coordinate_angle = (theta+s*a*(t>k)) % 1
                check((coordinate_angle-s*a*(t>k)) % 1 == theta, ('stage phase',t,s))
                check(0 <= ternary(b)-ternary(b[:t]) <= Q(1,3**t), ('tail',t,s))
        cost = a/3**k
        hausdorff = beta*a/(1+beta)
        phi = -hausdorff
        check(max(angle(0,phi),beta*angle(0,phi+a)) == hausdorff, ('optimal phase match',k,a))
        check(cost/hausdorff == 3*(1+beta), ('cost ratio',k,a))
        check(beta*angle(0,a) == beta*a > 0, ('anchored external witness',k,a))
        base, added = (Q(0), Q(0), ternary(bits[0])), (Q(0), a, ternary(bits[0]))
        check(base[2] == added[2] and base[1] != added[1], ('scalar drops phase',k,a))
        shifted_phases = tuple((x+a)%1 for x in phases)
        check(tuple((x-a)%1 for x in shifted_phases) == phases and shifted_phases != phases,
              ('invertible internal rotation',k,a))

code_bounds()
common_readout()
print(f'BC-NS/common readout: {checks} exact finite checks passed')
