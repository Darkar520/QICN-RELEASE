"""Exact positive and negative controls for the joint tower certificate."""
from fractions import Fraction as F
from itertools import product

from prefix_tower import (
    ALTERNATING, KAPPA, PROFILES, SAFE, SITES, State,
    circle, distance, prefix, readout, reference_bit, step,
)

SIGNS = (-1, 1)
ETA = F(1, 4 * 3**10)
ERRORS = (-ETA, F(0), ETA)


def legibility():
    for profile, site, depth in product(PROFILES, SITES, (7, 10, 12)):
        sham = State(profile, F(0), ALTERNATING, F(0))
        target = step(sham, write=(site, 1 - reference_bit(site)))
        reference = prefix(sham.code, depth)
        resolution = F(1, 3**depth)
        eta = resolution / 4
        for t in range(depth - site + 4):
            gap = abs(target.code - sham.code)
            assert gap == F(2, 3**(site + t))
            assert distance(target, sham) == gap
            assert readout(target)[:3] == readout(sham)[:3]
            assert (gap >= resolution) == (t <= depth - site)
            for error in (-eta, F(0), eta):
                assert prefix(sham.code + error, depth) == reference
                assert (prefix(target.code + error, depth) != reference) == (t <= depth - site)
                if t <= depth + 1 - site:
                    noisy_target = target.code + error
                    assert abs(noisy_target - target.code) < abs(noisy_target - sham.code)
            midpoint = (target.code + sham.code) / 2
            assert (abs(midpoint - sham.code) <= eta) == (t >= depth + 2 - site)
            assert abs(midpoint - target.code) == gap / 2
            # The exact half-gap, including equality, is an observation collision.
            assert abs(midpoint - sham.code) == gap / 2
            sham, target = step(sham), step(target)
    print("Legibility: 105 profile/site/depth trials with exact decoder and noise horizons")


def preparation(profile, sign):
    return State(profile, F(0), ALTERNATING, F(sign, 8))


def privileged_continuity():
    for profile, sign in product(PROFILES, SIGNS):
        line, clone = preparation(profile, sign), preparation(profile, -sign)
        exact_clone = line
        assert readout(line) == readout(clone)
        for t in range(4):
            u = -F(sign, 64 * 2**t)
            line, clone, exact_clone = (step(x, u) for x in (line, clone, exact_clone))
            assert line == exact_clone
            assert circle(line.phase) == 0
            assert circle(clone.phase) == F(1, 32 * 2**t)
            for e_line, e_clone in product(ERRORS, repeat=2):
                assert circle(clone.phase + e_clone) - circle(line.phase + e_line) >= F(1, 256) - 2 * ETA
    print("Continuity: 56 matched successor observations and exact-state clone tie")


def discrimination():
    for profile, sign in product(PROFILES, SIGNS):
        start = preparation(profile, sign)
        assert readout(step(start, q=1)) == readout(step(start, q=-1))
        for assignment in SIGNS:
            state = step(start, q=assignment)
            left, right = (step(state, F(port, 128)).phase for port in SIGNS)
            assert circle(right) - circle(left) == F(assignment * sign, 64)
            for e_left, e_right in product(ERRORS, repeat=2):
                assert assignment * sign * (circle(right + e_right) - circle(left + e_left)) >= F(1, 64) - 2 * ETA
        ablated = preparation(profile, 0)
        assert circle(step(ablated, F(-1, 128)).phase) == circle(step(ablated, F(1, 128)).phase) == F(1, 128)
    print("Discrimination: 28 causal assignments and equal-cost ablations")


def return_prediction():
    for profile in PROFILES:
        prior = preparation(profile, 0)
        histories = [(readout(prior), readout(preparation(profile, sign))) for sign in SIGNS]
        assert histories[0] == histories[1]
        losses = []
        for sign in SIGNS:
            state = preparation(profile, sign)
            assert abs(state.memory) <= SAFE
            actual = {port: circle(step(state, F(port, 64)).phase) for port in SIGNS}
            losses.append(actual)
            assert actual[-sign] == 0 and actual[sign] == F(1, 32)
            for error in (-F(1, 32), F(0), F(1, 32)):
                predicted = {port: circle(F(port, 64) + KAPPA * (state.memory + error)) for port in SIGNS}
                assert min(predicted, key=predicted.get) == -sign
        for blind_port in SIGNS:
            assert sum(row[blind_port] > 0 for row in losses) == 1
            assert sum(row[blind_port] for row in losses) / 2 == F(1, 64)
    print("Return prediction: 14 hidden preparations, both constant blind policies and informed tie")


def ownership():
    writes = (None,) + tuple((site, 1 - reference_bit(site)) for site in SITES)
    for profile, write, reference in product(PROFILES, writes, (SIGNS, SIGNS[::-1])):
        starts = [preparation(profile, sign) for sign in reference]
        retained = [step(x, q=1, write=write) for x in starts]
        transplanted = [step(x, q=-1, write=write) for x in starts]
        assert list(map(readout, retained)) == list(map(readout, transplanted))
        assert transplanted == retained[::-1]
        for assigned, expected in ((retained, 1), (transplanted, 0)):
            phases = [step(x).phase for x in assigned]
            for errors in product(ERRORS, repeat=2):
                signed = [(y + e + F(1, 2)) % 1 - F(1, 2) for y, e in zip(phases, errors)]
                assert all(abs(y) > ETA for y in signed)
                decoded = tuple(1 if y > 0 else -1 for y in signed)
                assert F(sum(a == b for a, b in zip(reference, decoded)), 2) == expected
                assert F(sum(a == b for a, b in zip(reference[::-1], decoded[::-1])), 2) == expected
        zero = step(step(preparation(profile, 0), q=-1, write=write))
        assert all(circle(zero.phase + error) <= ETA for error in ERRORS)
    print("Ownership: 84 paired protocols with retention, transplant, renaming and null controls")


if __name__ == "__main__":
    legibility()
    privileged_continuity()
    discrimination()
    return_prediction()
    ownership()
