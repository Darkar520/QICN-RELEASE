"""Exact paired-response controls on the common seven-profile support."""
from collections import Counter
from fractions import Fraction as Q
from itertools import product

from check_p1_dynamics import circle_distance, rotate
from check_p2_common_support import ETA, LAM, PROFILES, code_step, distance, readout
from check_p2_diagnostics import L, noise_grid


def paired_window(profile, phase, code, strength, command, errors, command_skew=Q(0)):
    initial = readout(profile, phase, code)
    first_bit = int(code >= Q(2, 3))
    return tuple(
        (initial, readout(profile, rotate(command, sign * (strength * first_bit + command_skew) + error),
                          code_step(code)))
        for sign, error in zip((1, -1), errors, strict=True)
    )


def score(window):
    plus, minus = window
    return circle_distance(plus[1][0], minus[1][0])


def decode(window):
    gap = score(window)
    if gap <= L / 2:
        return 0
    if gap >= 3 * L / 2:
        return 1
    return None


def window_distance(left, right):
    return max(distance(x, y)
               for arm_x, arm_y in zip(left, right, strict=True)
               for x, y in zip(arm_x, arm_y, strict=True))


def main():
    counts = Counter()
    phases = (Q(0), Q(1, 7), Q(13, 14))
    codes = (Q(0), Q(2, 9), Q(2, 3), Q(1))
    strengths = (Q(0), L, Q(7, 72), LAM)
    errors = tuple(product(noise_grid(ETA), repeat=2))
    exact = (Q(0), Q(0))

    for profile, phase, code in product(PROFILES, phases, codes):
        def window(strength, command=phase, error=exact, skew=Q(0)):
            return paired_window(profile, phase, code, strength, command, error, skew)

        bit = int(code >= Q(2, 3))
        null = window(Q(0))
        if bit:
            coupled = window(L)
            assert window_distance(null, coupled) == L
            assert score(coupled) - score(null) == 2 * L
            counts["L1_exact_separation"] += 1

            midpoint_null = window(Q(0), error=(L / 2, -L / 2))
            midpoint_coupled = window(L, error=(-L / 2, L / 2))
            assert midpoint_null == midpoint_coupled and decode(midpoint_null) is None
            assert window_distance(midpoint_null, null) == L / 2
            assert window_distance(midpoint_coupled, coupled) == L / 2
            counts["boundary_collision"] += 1

            intermediate = window(L / 2)
            assert score(intermediate) == L and decode(intermediate) is None
            counts["intermediate_abstention"] += 1

            mismatched = window(Q(0), skew=L)
            assert mismatched == coupled and decode(mismatched) == 1
            counts["unmatched_command_false_positive"] += 1

            for strength, before_error, after_error in product(strengths[1:], errors, errors):
                assert (decode(window(strength, error=before_error)),
                        decode(window(Q(0), error=after_error))) == (1, 0)
                counts["L4_ablation_no_miss"] += 1

        for strength, error in product(strengths, errors):
            expected = int(bit == 1 and strength > 0)
            clean = window(strength)
            observed = window(strength, error=error)
            assert window_distance(clean, observed) <= ETA
            assert abs(score(clean) - score(observed)) <= 2 * ETA
            label = decode(observed)
            assert label == expected
            counts["L2_robustness"] += 1
            encoded = format(label, "01b")
            assert len(encoded) == 1 and int(encoded, 2) == expected
            counts["L6_exact_compression"] += 1

        for strength in strengths:
            phase_labels = [
                tuple(decode(window(strength, command, error)) for error in errors)
                for command in phases
            ]
            expected = int(bit == 1 and strength > 0)
            for labels in product(*phase_labels):
                assert labels == (expected,) * 3
                counts["L3_reset_train"] += 1
                counts[f"L5_sham_bit_{bit}"] += 1

    assert all(counts[key] > 0 for key in (
        "L1_exact_separation", "L2_robustness", "L3_reset_train", "L4_ablation_no_miss",
        "L5_sham_bit_0", "L5_sham_bit_1", "L6_exact_compression", "boundary_collision",
        "intermediate_abstention", "unmatched_command_false_positive",
    ))
    assert 2 * ETA < L / 2 and 2 * L - 2 * ETA > 3 * L / 2
    print("Exact paired-response controls, zero mismatches")
    print(dict(counts))


if __name__ == "__main__":
    main()
