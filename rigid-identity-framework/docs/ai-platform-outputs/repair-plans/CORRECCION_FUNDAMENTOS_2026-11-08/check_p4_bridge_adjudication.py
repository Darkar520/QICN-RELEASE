"""Exact controls for the local P4 propositions and adjudication rules."""
from fractions import Fraction as Q
from itertools import combinations, product
from math import isqrt

from check_p1_dynamics import rotate, step, ternary


def truncate(bits, depth):
    return bits[:depth] + tuple(j % 2 for j in range(depth, len(bits)))


def tower_transition(phase, bits, u, q):
    return rotate(u, q * Q(1, 9) * bits[0]), step(bits)


def self_reference_checks():
    checked = zero = sharp = 0
    for depth in range(1, 7):
        for prefix, tail, q, u in product(
                product((0, 1), repeat=depth), ((0, 0, 0), (1, 1, 1), (0, 1, 0)),
                (-1, 0, 1), (Q(0), Q(1, 4))):
            bits = prefix + tail
            cut = truncate(bits, depth)
            assert truncate(cut, depth) == cut
            assert truncate(truncate(bits, depth + 1), depth) == cut
            assert truncate(prefix + tuple(1 - b for b in tail), depth) == cut
            assert abs(ternary(bits) - ternary(cut)) <= Q(1, 3**depth)
            left_phase, left_bits = tower_transition(Q(0), bits, u, q)
            right_phase, right_bits = tower_transition(Q(0), cut, u, q)
            left_bits = truncate(left_bits, depth)
            mismatches = [j + 1 for j, (a, b) in enumerate(zip(left_bits, right_bits, strict=True)) if a != b]
            opposite = prefix[-1] != (depth - 1) % 2
            assert mismatches == ([depth + 1] if opposite else [])
            assert left_phase == right_phase
            assert abs(ternary(left_bits) - ternary(right_bits)) == Q(2 * opposite, 3**(depth + 1))
            zero += int(not opposite)
            sharp += int(opposite)
            checked += 1
    bits = (1, 0, 1)
    assert tower_transition(Q(0), bits, Q(0), 1)[0] != tower_transition(Q(0), truncate(bits, 0), Q(0), 1)[0]
    for theta in (Q(0), Q(1, 4), Q(1, 2), Q(3, 4)):
        assert not all(tower_transition(theta, bits, u, 0)[0] == theta for u in (Q(0), Q(1, 4)))
    assert zero == sharp and checked == zero + sharp
    print(f"Bridge: {checked} truncation checks; {sharp} sharp and {zero} zero defects")


def calibrated_margin(candidate, rivals, scale, admissible=True):
    if not admissible or candidate is None or not rivals or scale <= 0:
        return "insufficient", None, None
    raw = min(rivals) - candidate
    status = "win" if raw > 0 else "loss" if raw < 0 else "tie"
    return status, raw, min(Q(1), max(Q(0), raw / scale))


def decode_label(observed):
    if observed == Q(1, 2):
        return None
    return int(observed > Q(1, 2))


def sections(edge_bits):
    edges = ((0, 1), (1, 2), (2, 0))
    return {labels for labels in product((0, 1), repeat=3)
            if all((labels[i] ^ k) == labels[j] for (i, j), k in zip(edges, edge_bits, strict=True))}


def transport_checks():
    score_checks = 0
    losses = (Q(0), Q(1, 4), Q(1), Q(2))
    for candidate, rival, scale in product(losses, losses, (Q(1, 2), Q(1), Q(2))):
        status, raw, normalized = calibrated_margin(candidate, (rival,), scale)
        assert raw == rival - candidate and 0 <= normalized <= 1
        assert status == ("win" if candidate < rival else "loss" if candidate > rival else "tie")
        assert (normalized > 0) == (raw > 0)
        # A square-root factor is evaluated exactly whenever its radicand is a rational square.
        numerator, denominator = isqrt(normalized.numerator), isqrt(normalized.denominator)
        if numerator**2 == normalized.numerator and denominator**2 == normalized.denominator:
            factor = Q(numerator, denominator)
            assert factor**2 == normalized and 0 <= factor <= 1
        score_checks += 1
    assert calibrated_margin(Q(0), (Q(1, 4),), Q(1))[-1] == Q(1, 4)
    assert calibrated_margin(Q(1), (), Q(1)) == ("insufficient", None, None)
    assert calibrated_margin(Q(1), (Q(2),), Q(1), admissible=False) == ("insufficient", None, None)
    assert calibrated_margin(Q(1), (Q(2),), Q(0)) == ("insufficient", None, None)
    decode_checks = 0
    for k, w, e1, e2 in product((0, 1), (0, 1), (Q(-1, 4), Q(0), Q(1, 4)), (Q(-1, 4), Q(0), Q(1, 4))):
        assert (decode_label(w + e1), decode_label((w ^ k) + e2)) == (w, w ^ k)
        decode_checks += 1
    assert decode_label(Q(0) + Q(1, 2)) is None and decode_label(Q(1) - Q(1, 2)) is None
    for bits in product((0, 1), repeat=3):
        observed = sections(bits)
        assert len(observed) == (0 if sum(bits) % 2 else 2)
        for gauge in product((0, 1), repeat=3):
            renamed = tuple(k ^ gauge[i] ^ gauge[(i + 1) % 3] for i, k in enumerate(bits))
            assert sections(renamed) == {tuple(x ^ y for x, y in zip(a, gauge, strict=True)) for a in observed}
    assert sections((0, 0, 1)) == set()
    assert sections((0, 1, 1)) == {(0, 0, 1), (1, 1, 0)}
    print(f"IX: {score_checks} score cases; {decode_checks} noisy edge reports; 8 cycles under 8 relabellings")


def risk_and_coverage(rows, rule, gamma):
    risk = sum(weight * (gamma if rule[obs] == "tie" else int(rule[obs] != label))
               for obs, label, weight in rows)
    coverage = sum(weight for obs, _, weight in rows if rule[obs] != "tie")
    return risk, coverage


def adjudication_checks():
    actions = ("h", "m", "tie")
    observations = ("clean", "h", "m")
    counts = 0
    for leak, gamma in product((Q(0), Q(1, 8), Q(1, 4), Q(1, 2), Q(1)), (Q(1, 2), Q(3, 4), Q(1))):
        independent = [(obs, label, w) for label in ("h", "m")
                       for obs, w in (("clean", (1-leak)/2), (label, leak/2))]
        used = min(leak, Q(1, 2))
        selective = (("clean", "h", Q(1, 2)), ("clean", "m", Q(1, 2)-used), ("m", "m", used))
        for rule in map(lambda a: dict(zip(observations, a, strict=True)), product(actions, repeat=3)):
            for rows, bound in ((independent, (1-leak)/2), (selective, max(Q(0), Q(1, 2)-leak))):
                risk, coverage = risk_and_coverage(rows, rule, gamma)
                assert risk >= bound
                assert 0 <= coverage <= 1
                counts += 1
        perfect_on_leak = {"clean": "h", "h": "h", "m": "m"}
        assert risk_and_coverage(independent, perfect_on_leak, gamma) == ((1-leak)/2, 1)
        assert risk_and_coverage(selective, perfect_on_leak, gamma) == (Q(1, 2)-used, 1)
        assert risk_and_coverage(independent, dict.fromkeys(observations, "tie"), gamma) == (gamma, 0)
        if 0 < leak <= Q(1, 2):
            assert risk_and_coverage(selective, perfect_on_leak, gamma)[0] < (1-leak)/2
    permutations = tuple(combinations(range(4), 2))
    shuffled = [(i, "h" if i in h_indices else "m", Q(1, 4 * len(permutations)))
                for h_indices, i in product(permutations, range(4))]
    shuffled_checks = 0
    for gamma, choices in product((Q(1, 2), Q(3, 4), Q(1)), product(actions, repeat=4)):
        risk, coverage = risk_and_coverage(shuffled, dict(enumerate(choices)), gamma)
        assert risk == coverage / 2 + (1-coverage) * gamma
        shuffled_checks += 1
    print(f"X: {counts} null risk cases; {shuffled_checks} balanced-permutation rules")


if __name__ == "__main__":
    self_reference_checks()
    transport_checks()
    adjudication_checks()
