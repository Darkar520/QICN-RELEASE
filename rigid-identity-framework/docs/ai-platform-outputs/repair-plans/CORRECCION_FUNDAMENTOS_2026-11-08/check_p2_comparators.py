"""Rational finite controls for the P2 cofinal tower and label protocol."""
from fractions import Fraction as Q
from itertools import product
from check_p1_dynamics import bit_distance, circle_distance, rotate, step, ternary

checks = 0


def check(condition):
    global checks
    assert condition
    checks += 1


def late(s, theta, a):
    return rotate(theta, s * a)


def decode(early, late_phase, a):
    offset = rotate(late_phase, -early)
    return int(circle_distance(offset, a) < circle_distance(offset, 0))


angles = (Q(0), Q(2, 7), Q(13, 14))
shifts = (Q(1, 7), Q(1, 4), Q(2, 5))
lam = Q(1, 9)
for k, a, u, s, q, first in product(range(5), shifts, angles, (0, 1), (-1, 0, 1), (0, 1)):
    beta = Q(1, 3**(k + 1))
    exact = rotate(u, q * lam * first)
    compare = rotate(u, q * lam / 2)
    check(circle_distance(exact, compare) == abs(q) * lam / 2)
    check(circle_distance(late(s, exact, a), late(s, compare, a)) <= lam / 2)
    check(decode(exact, late(s, exact, a), a) == s)
    check(decode(exact, late(1 - s, exact, a), a) == 1 - s)
    noise = a * beta / (4 * (1 + beta))
    for e0, e1 in product((-noise, noise), (-noise / beta, noise / beta)):
        check(decode(rotate(exact, e0), rotate(late(s, exact, a), e1), a) == s)
    check(beta * lam / 2 <= lam / 2 < Q(1, 6))

for t in range(1, 6):
    states = list(product((0, 1), repeat=t))
    for x, y in product(states, repeat=2):
        first_jump = lam * abs(x[0] - y[0])
        check(max(first_jump, bit_distance(step(x), step(y))) <= bit_distance(x, y) / 3)
        if x[0] != y[0]:
            check(abs(ternary(x) - ternary(y)) >= Q(1, 3))
    for bits in states:
        # The first bit is available on every cofinal stage.
        check(step((*bits, 0))[:-1] == step(bits))
        check(step((*bits, 1))[:-1] == step(bits))
        if t >= 2:
            check(step(step(bits))[1] == 1)

for a, u, s, sp, bit, other in product(shifts, angles, (0, 1), (0, 1), (0, 1), (0, 1)):
    p = late(s, rotate(u, lam * bit), a)
    m = late(s, rotate(u, -lam * bit), a)
    pp = late(sp, rotate(u, lam * other), a)
    mp = late(sp, rotate(u, -lam * other), a)
    check(circle_distance(p - pp, m - mp) == 2 * lam * abs(bit - other))

channels = {"early", "late", "ternary"}
partitions = []
for mask in range(1, 7):
    a_side = {name for i, name in enumerate(sorted(channels)) if mask & (1 << i)}
    b_side = channels - a_side
    phase_side = b_side if "ternary" in a_side else a_side
    check(bool(phase_side & {"early", "late"}))
    partitions.append((a_side, b_side))
check(len(partitions) == 6)
check(Q(1, 3) * lam / 2 == Q(1, 54))
check(Q(1, 54) - Q(1, 64) == Q(5, 1728))
check(circle_distance(rotate(Q(0), lam), Q(0)) > 0)  # depth zero loses the first bit
check(circle_distance(rotate(Q(0), 0 * lam), Q(0)) == 0)  # coupling ablation

# Orientation check for the earlier Euclidean carrier: Q^T J Q = det(Q) J.
J = ((Q(0), Q(-1)), (Q(1), Q(0)))
for c, s, reflection in product((Q(1), Q(3, 5)), (-1, 1), (-1, 1)):
    sine = s * (Q(0) if c == 1 else Q(4, 5))
    frame = ((c, -reflection * sine), (sine, reflection * c))
    for i, j in product(range(2), repeat=2):
        entry = sum(frame[k][i] * J[k][l] * frame[l][j] for k, l in product(range(2), repeat=2))
        check(entry == reflection * J[i][j])
print(f"{checks} exact P2 finite controls passed")
