"""Exact independent-block campaign controls. Synthetic evidence only."""
from fractions import Fraction as F
from itertools import product
from math import comb


def tail(n, k, probability):
    return sum((F(comb(n, j)) * probability**j * (1-probability)**(n-j)
                for j in range(k, n+1)), F(0))


def campaign_signature(units, window, threshold):
    return (tuple(units), window, threshold)


def integrity_ok(units, calibration_units, frozen, selected):
    return (len(set(units)) == len(units)
            and set(units).isdisjoint(calibration_units)
            and selected == frozen)


def check_campaign():
    alpha = F(1, 20)
    size = tail(20, 15, F(1, 2))
    power = tail(20, 15, F(4, 5))
    assert size == F(5425, 262144) < alpha
    assert tail(20, 14, F(1, 2)) > alpha
    assert power > F(4, 5)
    signs = tuple(product((0, 1), repeat=5))
    fixed_guesses = (0, 1, 0, 1, 0)
    blind_passes = sum(tuple(labels) == fixed_guesses for labels in signs)
    leaked_passes = sum(tuple(labels) == tuple(labels) for labels in signs)
    assert F(blind_passes, len(signs)) == F(1, 32)
    assert F(leaked_passes, len(signs)) == 1
    permitted_features = (0, 1, 0, 1, 0)
    blind_trace = [(permitted_features, labels, permitted_features) for labels in signs]
    leaked_trace = [(permitted_features, labels, labels) for labels in signs]
    def invariant_to_hidden_label(trace):
        return all(output == other_output for features, labels, output in trace
                   for other_features, other_labels, other_output in trace
                   if features == other_features)
    assert invariant_to_hidden_label(blind_trace)
    assert not invariant_to_hidden_label(leaked_trace)

    block_signs = tuple(product((0, 1), repeat=3))
    naive_rate = F(sum(4*sum(s) >= 10 for s in block_signs), len(block_signs))
    corrected_rate = F(sum(tail(3, sum(s), F(1, 2)) <= alpha for s in block_signs), len(block_signs))
    assert naive_rate == F(1, 8)
    assert tail(12, 10, F(1, 2)) == F(79, 4096)
    assert corrected_rate == 0

    selected = F(sum(all(a) or all(b) for a,b in product(signs, repeat=2)), len(signs)**2)
    assert selected == F(63, 1024) > alpha
    assert F(1, 32) < alpha and 2*F(1, 32) >= selected
    for k in range(1, 5):
        assert 1-(1-F(1, 32))**k <= k*F(1, 32)

    units = tuple(f"block-{i}" for i in range(20))
    calibration = ("calibration-0", "calibration-1")
    frozen = campaign_signature(units, "window-A", 15)
    assert integrity_ok(units, calibration, frozen, frozen)
    assert not integrity_ok(units, ("block-0",), frozen, frozen)
    duplicate_units = tuple(f"block-{i}" for i in range(3) for _ in range(4))
    assert not integrity_ok(duplicate_units, (), frozen, frozen)
    assert not integrity_ok(units, calibration, frozen, campaign_signature(units, "window-B", 14))
    for clean_difference, noise, threshold in product((F(-1), F(0), F(1, 2)),
                                                      (F(-1, 16), F(0), F(1, 16)),
                                                      (F(0), F(1, 8))):
        eta=F(1, 32)
        observed=clean_difference+noise
        if observed > 2*eta+threshold:
            assert clean_difference > threshold
    print(f"Campaign: exact size {size}, power {power}; five-label leak 1/32 -> 1")
    print("Pseudoreplication: nominal 79/4096, actual 1/8, corrected size 0")
    print("Selected window: fixed 1/32, selected 63/1024; provenance guards reject all three traces")


if __name__ == "__main__":
    check_campaign()
