"""Exact controls for the common seven-profile support and its shared readout."""
from collections import Counter
from fractions import Fraction as Q
from itertools import combinations, product

from check_p1_dynamics import circle_distance, rotate, ternary
from check_p2_diagnostics import detects_coupling, paired_readouts
from check_p2_ruptures import compatible, profile

ETA = Q(1, 256)
LAM = Q(1, 9)
WEIGHTS = (Q(1), Q(1, 3), Q(1, 9), Q(1))
PROFILES = [(Q(0),) * 3] + [profile(k, Q(j, 8), 2) for k, j in product(range(2), range(1, 4))]


def readout(p, phase, code):
    return tuple(rotate(phase, a) for a in p) + (code,)


def distance(x, y):
    return max(*(w * circle_distance(a, b) for w, a, b in zip(WEIGHTS[:3], x[:3], y[:3], strict=True)),
               abs(x[3] - y[3]))


def code_step(code):
    return (1 - code) / 3


def profile_distance(p, pp):
    offsets = tuple(x - y for x, y in zip(p, pp, strict=True))
    return max(WEIGHTS[i] * WEIGHTS[j] * abs(offsets[i] - offsets[j])
               / (WEIGHTS[i] + WEIGHTS[j]) for i, j in combinations(range(3), 2))


def main():
    count = Counter()

    def check(kind, condition):
        assert condition, kind
        count[kind] += 1

    g = Q(1, 80)
    floor = WEIGHTS[2] * LAM / 2
    check("bounds", floor == Q(1, 162) and LAM / 2 == Q(1, 18))
    check("bounds", floor - ETA == Q(47, 20736) and 2 * ETA < g)
    indexed = tuple(range(len(PROFILES)))
    geo = [[profile_distance(p, pp) for pp in PROFILES] for p in PROFILES]
    catalogues = [tuple(i for i in indexed if mask & (1 << i))
                  for mask in range(1, 1 << len(PROFILES))]
    for left, right in combinations(catalogues, 2):
        forward = max(min(geo[i][j] for j in right) for i in left)
        backward = max(min(geo[i][j] for i in left) for j in right)
        check("catalogue_gap", max(forward, backward) >= g)
    check("catalogue_gap", geo[0][4] == g)
    check("coverage", (0,) != (0, 4)
          and readout(PROFILES[0], Q(0), Q(0)) == readout(PROFILES[(0, 4)[0]], Q(0), Q(0)))

    angles = (Q(0), Q(1, 7), Q(13, 14))
    codes = tuple(ternary(b) for b in product((0, 1), repeat=3)) + (Q(1),)
    for p, u, code, q, strength in product(PROFILES, angles, codes, (-1, 0, 1), (Q(0), LAM)):
        first = int(code >= Q(2, 3))
        clean = readout(p, rotate(u, q * strength * first), code_step(code))
        approximate = readout(p, rotate(u, q * strength / 2), code_step(code))
        check("product_comparator", distance(clean, approximate) == abs(q) * strength / 2)
        check("support", 0 <= code_step(code) <= Q(1, 3))
        check("support", all((clean[t] - clean[0]) % 1 == p[t] for t in range(3)))
        check("differentiation", code_step(code_step(code)) >= Q(2, 9))
        check("continuity", distance(readout(p, u, code), clean) <= 1)

    channels = set(range(4))
    for mask in range(1, 15):
        split = {i for i in channels if mask & (1 << i)}
        opposite = channels - split if 3 in split else split
        check("partitions", bool(opposite) and 3 not in opposite)
        t = min(opposite)
        for p, pp, u in product(PROFILES, PROFILES, angles):
            minus = (rotate(u, p[t]), rotate(u, pp[t] - LAM))
            plus = (rotate(u, p[t]), rotate(u, pp[t] + LAM))
            check("fiber_response", circle_distance(plus[0] - plus[1], minus[0] - minus[1]) == 2 * LAM)
            check("fiber_response", WEIGHTS[t] * LAM / 2 >= floor)
    for i, j in combinations(range(3), 2):
        offsets = {(p[j] - p[i]) % 1 for p in PROFILES}
        check("exact_initial_geometry", Q(1, 16) not in offsets)

    for p, u, code in product(PROFILES, angles, codes):
        y = readout(p, u, code)
        perturbed = tuple(rotate(v, ETA / w) for v, w in zip(y[:3], WEIGHTS[:3], strict=True))
        check("identity_decoder", tuple(pp for pp in PROFILES
              if compatible(perturbed, pp, WEIGHTS[:3], ETA)) == (p,))

    for p, a, b in product(PROFILES, codes, codes):
        for _ in range(6):
            a, b = code_step(a), code_step(b)
        for _ in range(4):
            check("sham_window_merge", distance(readout(p, Q(0), a), readout(p, Q(0), b)) <= ETA)
            a, b = code_step(a), code_step(b)
    for u, b1 in product(angles, (0, 1)):
        reference = paired_readouts(u, LAM, b1, Q(1, 4), ((ETA, ETA), (-ETA, -ETA)))
        check("paired_response_control", detects_coupling(*reference) == bool(b1))

    print(f"{sum(count.values())} exact common-support cases")
    print(dict(count))


if __name__ == "__main__":
    main()
