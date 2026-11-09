"""Exact synthetic controls for P2, with geometry and witness losses kept separate."""
from collections import Counter
from fractions import Fraction as Q
from itertools import combinations, product

from check_p1_dynamics import circle_distance, rotate, step, ternary
from check_p2_diagnostics import L, detects_coupling, noise_grid, paired_readouts

ETA = Q(1, 256)
OLD_ETA = Q(1, 64)
LAMBDA = Q(1, 9)
JUMP = Q(1, 4)
K = 1
M = 8


def profile(address, amplitude, last):
    return tuple(amplitude if t > address else Q(0) for t in range(last + 1))


def metric(x, y, weights):
    return max(w * circle_distance(a, b) for w, a, b in zip(weights, x, y, strict=True))


def compatible(observed, offsets, weights, eta):
    """Intersect all closed phase arcs, including those that wrap through zero."""
    centers = tuple((a - p) % 1 for a, p in zip(observed, offsets, strict=True))
    constraints = tuple((c, eta / w) for c, w in zip(centers, weights, strict=True)
                        if eta / w < Q(1, 2))
    endpoints = {Q(0)}
    for center, radius in constraints:
        endpoints.update((rotate(center, -radius), rotate(center, radius)))
    return any(all(circle_distance(point, c) <= r for c, r in constraints)
               for point in endpoints)


def transition(state, u, q, coupling=LAMBDA, kind="reference"):
    if state is None or kind == "escape":
        return None
    branch, _, bits = state
    if kind == "null_reset":
        return 0, Q(0), (0,) * len(bits)
    shifted_u = u + Q(1, 4) if kind == "jump" and 0 < u <= Q(1, 32) else u
    return branch, rotate(shifted_u, q * coupling * bits[0]), step(bits)


def observation(state, masked=False):
    branch, phase, bits = state
    return phase, phase if masked else rotate(phase, branch * JUMP), ternary(bits)


def main():
    counts = Counter()

    def check(kind, condition):
        assert condition, kind
        counts[kind] += 1

    weights = tuple(Q(1, 3**t) for t in range(K + 2))
    candidates = [(Q(0),) * (K + 2)] + [
        profile(k, Q(j, M), K + 1)
        for k in range(K + 1) for j in range(1, (M + 1) // 2)
    ]
    check("candidate_count", len(set(candidates)) == len(candidates) == 7)
    phases = (Q(0), Q(1, 7), Q(13, 14))
    distances = []
    for p, ap in combinations(candidates, 2):
        differences = tuple(a - b for a, b in zip(p, ap, strict=True))
        d = max(weights[i] * weights[j] * abs(differences[i] - differences[j])
                / (weights[i] + weights[j])
                for i, j in combinations(range(K + 2), 2))
        low = max(v - d / w for v, w in zip(differences, weights, strict=True))
        high = min(v + d / w for v, w in zip(differences, weights, strict=True))
        check("geometry", low <= high)
        distances.append(d)
        shift = (low + high) / 2
        for theta in phases:
            clean = tuple(rotate(theta, v) for v in p)
            other = tuple(rotate(theta, v + shift) for v in ap)
            check("geometry", metric(clean, other, weights) == d)
            mid = tuple(rotate(theta, (a + b + shift) / 2)
                        for a, b in zip(p, ap, strict=True))
            check("identity_boundary", metric(mid, clean, weights) == d / 2
                  and metric(mid, other, weights) == d / 2)
            check("identity_boundary", all(compatible(mid, c, weights, d / 2) for c in (p, ap)))

    for p, theta in product(candidates, phases):
        clean = tuple(rotate(theta, v) for v in p)
        for errors in product(*(noise_grid(ETA / w) for w in weights)):
            noisy = tuple(rotate(x, n) for x, n in zip(clean, errors, strict=True))
            check("identity_resolution", tuple(c for c in candidates
                  if compatible(noisy, c, weights, ETA)) == (p,))

    check("geometry", min(distances) == Q(1, 80))
    check("identity_prior_noise", 2 * ETA < min(distances) <= 2 * OLD_ETA)
    deepest = profile(K, Q(1, M), K + 1)
    midpoint = tuple(rotate(Q(0), (v - Q(1, 80)) / 2) for v in deepest)
    check("identity_prior_noise", compatible(midpoint, candidates[0], weights, OLD_ETA)
          and compatible(midpoint, deepest, weights, OLD_ETA))
    for k in range(2, 8):
        check("unobserved_late", profile(k, JUMP, K + 1) == candidates[0])
        check("unobserved_late", JUMP / (3 ** (k + 1) + 1) < Q(1, 80))
    early, late = (profile(k, JUMP, K + 1) for k in (0, 1))
    check("omitted_cut", early != late and (early[0], early[-1]) == (late[0], late[-1]))

    controls = tuple(product(phases, (-1, 0, 1)))
    bits_grid = tuple(product((0, 1), repeat=3))
    states = tuple(product((0, 1), phases, bits_grid))
    for state, (u, q) in product(states, controls):
        reference = transition(state, u, q)
        exited = transition(state, u, q, kind="escape")
        check("persistence", reference[0] == state[0] and 0 <= reference[1] < 1
              and reference[2] in bits_grid)
        check("persistence", exited is None and transition(exited, u, q) is None)
        alternate = (1 - state[0], state[1], state[2])
        after_alternate = transition(alternate, u, q)
        check("identity_mask", observation(reference, True) == observation(after_alternate, True))
        check("identity_mask", observation(reference) != observation(after_alternate))
        check("identity_sham", (observation(reference)[1] - observation(reference)[0]) % 1
              == state[0] * JUMP)
        check("integration", transition(state, u, q, coupling=Q(0))
              == (state[0], u, step(state[2])))
        reset = transition(state, u, q, kind="null_reset")
        check("differentiation", reset == (0, Q(0), (0, 0, 0)))
        check("differentiation", transition(reset, u, q, kind="null_reset") == reset)
        later = transition(reference, u, q)
        for noise in noise_grid(ETA):
            check("differentiation", observation(later)[2] + noise > Q(1, 9)
                  and observation(reset)[2] + noise < Q(1, 9))

    check("differentiation", observation((0, Q(0), (1, 1, 1)))[2]
          > observation((0, Q(0), (0, 0, 0)))[2])
    for state, u in product(states, (Q(1, 32), Q(1, 64), Q(1, 128), Q(1, 1024))):
        ref0, refu = transition(state, Q(0), 0), transition(state, u, 0)
        jump0, jumpu = (transition(state, v, 0, kind="jump") for v in (Q(0), u))
        check("continuity_identity", (observation(jumpu)[1] - observation(jumpu)[0]) % 1
              == (observation(jump0)[1] - observation(jump0)[0]) % 1)
        for e0, e1 in product(noise_grid(ETA), repeat=2):
            control = circle_distance(rotate(ref0[1], e0), rotate(refu[1], e1))
            target = circle_distance(rotate(jump0[1], e0), rotate(jumpu[1], e1))
            check("continuity", control < Q(1, 8) < target)

    labels = []
    for u, strength, bit, e0, e1 in product(phases, (Q(0), L, LAMBDA), (0, 1),
                                            noise_grid(ETA), noise_grid(ETA)):
        pair = paired_readouts(u, strength, bit, JUMP, ((e0, e0), (e1, e1)))
        label = detects_coupling(*pair)
        check("integration", label == (strength > 0 and bit == 1))
        labels.append(label)
    for u in phases:
        null = paired_readouts(u, Q(0), 1, JUMP, ((L / 2, L / 2), (-L / 2, -L / 2)))
        coupled = paired_readouts(u, L, 1, JUMP, ((-L / 2, -L / 2), (L / 2, L / 2)))
        check("legibility", null == coupled)
        for p in (Q(0), Q(1, 4), Q(1, 2), Q(3, 4), Q(1)):
            check("legibility", max(p, 1 - p) >= Q(1, 2))
    check("compression", set(labels) == {False, True})
    check("compression", all(bool(int(label)) == label for label in labels))
    check("compression", len({0 for label in labels}) < len(set(labels)))
    for x, y, z in product((0, 1), repeat=3):
        check("quotient", not (x == y and y == z) or x == z)

    print(f"{sum(counts.values())} exact P2 alternative and rupture cases")
    print(dict(counts))


if __name__ == "__main__":
    main()
