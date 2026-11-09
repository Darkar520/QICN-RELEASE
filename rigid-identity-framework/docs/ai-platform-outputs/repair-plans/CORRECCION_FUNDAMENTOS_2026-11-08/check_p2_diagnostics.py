"""Exact controls for paired rupture detection and passive identity resolution."""
from fractions import Fraction as Q
from itertools import combinations, product

from check_p1_dynamics import circle_distance, rotate

L = Q(1, 12)
ETA = Q(1, 64)


def paired_readouts(u, strength, first_bit, a, noise):
    """Two resets with the same prepared bit and the same exogenous phase input."""
    return tuple(
        (
            rotate(u, q * strength * first_bit + early_error),
            rotate(u, q * strength * first_bit + a + late_error),
        )
        for q, (early_error, late_error) in zip((1, -1), noise, strict=True)
    )


def detects_coupling(plus, minus):
    return circle_distance(plus[0], minus[0]) > L


def phase_metric(x, y, beta):
    return max(circle_distance(x[0], y[0]), beta * circle_distance(x[1], y[1]))


def compatible_offsets(y, candidates, beta, eta):
    offset = (y[1] - y[0]) % 1
    radius = (1 + 1 / beta) * eta
    return tuple(a for a in candidates if circle_distance(a, offset) <= radius)


def noise_grid(radius):
    return (-radius, Q(0), radius)


def main():
    counts = {"positive": 0, "null": 0, "sham": 0, "paired_boundary": 0,
              "identity_resolved": 0, "identity_ambiguous": 0, "geometry": 0}
    phases = (Q(0), Q(1, 7), Q(1, 2), Q(13, 14))
    alternatives = (Q(1, 16), Q(1, 8), Q(3, 16), Q(1, 4), Q(3, 8), Q(7, 16))

    for u, a, strength, first, eta in product(
        phases, (Q(1, 16), Q(1, 4)), (Q(0), L, Q(7, 72), Q(1, 9)),
        (0, 1), (Q(0), ETA, L / 2 - Q(1, 1000))
    ):
        kind = "null" if strength == 0 else ("positive" if first else "sham")
        for e_plus, e_minus in product(noise_grid(eta), repeat=2):
            pair = paired_readouts(u, strength, first, a, ((e_plus, e_plus), (e_minus, e_minus)))
            assert detects_coupling(*pair) == (kind == "positive")
            score = circle_distance(pair[0][0], pair[1][0])
            assert abs(score - L) >= L - 2 * eta
            counts[kind] += 1

    for u, a, beta in product(phases, (Q(1, 16), Q(1, 4)), (Q(1, 3), Q(1, 9))):
        null = paired_readouts(u, Q(0), 1, a, ((0, 0), (0, 0)))
        coupled = paired_readouts(u, L, 1, a, ((0, 0), (0, 0)))
        midpoint_null = paired_readouts(u, Q(0), 1, a, ((L / 2, L / 2), (-L / 2, -L / 2)))
        midpoint_coupled = paired_readouts(u, L, 1, a, ((-L / 2, -L / 2), (L / 2, L / 2)))
        assert midpoint_null == midpoint_coupled
        assert all(phase_metric(y, x, beta) == L / 2 for clean in (null, coupled)
                   for y, x in zip(midpoint_null, clean, strict=True))
        counts["paired_boundary"] += 1

    for k, (a, ap), u in product(range(4), combinations(alternatives, 2), phases):
        beta = Q(1, 3**(k + 1))
        separation = beta * (ap - a) / (1 + beta)
        assert separation == beta * circle_distance(a, ap) / (1 + beta)
        target = (u, rotate(u, a))
        neighbor = (rotate(u, -separation), rotate(u, ap - separation))
        assert phase_metric(target, neighbor, beta) == separation
        counts["geometry"] += 1
        for eta in (ETA, separation / 2, separation / 3):
            candidates = (a, ap)
            if separation > 2 * eta:
                for clean, expected in ((target, a), (neighbor, ap)):
                    for e0, e1 in product(noise_grid(eta), noise_grid(eta / beta)):
                        observed = (rotate(clean[0], e0), rotate(clean[1], e1))
                        assert compatible_offsets(observed, candidates, beta, eta) == (expected,)
                        counts["identity_resolved"] += 1
            else:
                midpoint = (rotate(u, -separation / 2),
                            rotate(u, a + (ap - a - separation) / 2))
                assert all(phase_metric(midpoint, clean, beta) <= eta for clean in (target, neighbor))
                assert compatible_offsets(midpoint, candidates, beta, eta) == candidates
                counts["identity_ambiguous"] += 1

    assert 2 * (1 + 3) * ETA == Q(1, 8)
    assert Q(1, 4) - Q(1, 16) > Q(1, 8)
    assert L - 2 * ETA == Q(5, 96)
    print(f"{sum(counts.values())} exact control cases, zero mismatches")
    print(counts)


if __name__ == "__main__":
    main()
