"""Exact finite controls for the BC-MET/BC-RIG derivations."""
from fractions import Fraction as Q
from itertools import product
from math import prod

checks = 0

def check(condition, detail):
    global checks
    if not condition:
        raise AssertionError(detail)
    checks += 1

def weight(stage):
    return Q(1, 2**stage)

def circle_distance(x, y):
    gap = (x - y) % 1
    return min(gap, 1 - gap)

for n in range(1, 33):
    check(weight(n) * 4**n == 2**n, ('diverging weighted diameter', n))
    check(weight(n) * 2**n == 1, ('finite metric without vanishing tail', n))
    check(weight(n) < weight(n-1), ('uniform tail for bounded stages', n))

for k, amplitude, angle in product(range(9), (Q(0), Q(1,16), Q(1,4), Q(7,16)),
                                    (Q(0), Q(2,5), Q(9,10))):
    b = weight(k+1)
    radius = b*amplitude/(1+b)
    phi = angle-radius
    cost = weight(k)*amplitude
    check(max(circle_distance(angle, phi), b*circle_distance(angle, phi+amplitude))
          == radius, ('attainment', k, amplitude, angle))
    check(b*circle_distance(angle, angle+amplitude) == cost/2,
          ('pointwise displacement', k, amplitude, angle))
    check((radius == 0 if amplitude == 0 else cost/radius == 2*(1+b)),
          ('cost ratio', k, amplitude, angle))
    for j in range(32):
        candidate = Q(j,32)
        check(max(circle_distance(angle, candidate),
                  b*circle_distance(angle, candidate+amplitude)) >= radius,
              ('lower bound', k, amplitude, angle, j))
    for n in range(12):
        forward_shift = amplitude if n > k else Q(0)
        next_shift = amplitude if n+1 > k else Q(0)
        perturbation_shift = -amplitude if n == k else Q(0)
        check((angle + next_shift + perturbation_shift) % 1 == (angle + forward_shift) % 1,
              ('commuting square', k, n))
        check((angle + forward_shift - forward_shift) % 1 == angle,
              ('inverse square', k, n))

for n in range(1, 11):
    target = set(range(2**n))
    original = [j//2 for j in range(2**(n+1))]
    perturbed = [1 if j == 1 else j//2 for j in range(2**(n+1))]
    check(set(original) == set(perturbed) == target, ('two surjections', n))
    check(original.count(0) == 2 and perturbed.count(0) == 1,
          ('isolated zero history control', n))

for factors in product((Q(1,2), Q(1), Q(2)), repeat=4):
    impulse = [Q(i,7) for i in (1, 0, 5, 3)]
    max_amplification = max(
        prod(factors[k:n+1])
        for n in range(len(factors)) for k in range(n+1)
    )
    current = Q(0)
    for n, factor in enumerate(factors):
        current = factor*(current + impulse[n])
        explicit = sum(prod(factors[k:n+1])*impulse[k] for k in range(n+1))
        check(current == explicit <= max_amplification*sum(impulse), ('propagation', factors, n))

print(f'BC-MET/BC-RIG: {checks} exact finite checks passed')
