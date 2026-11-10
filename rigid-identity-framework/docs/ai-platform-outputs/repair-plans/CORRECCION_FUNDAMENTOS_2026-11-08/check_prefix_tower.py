"""Preregistered exact checks on the re-writable V–VIII tower."""

from fractions import Fraction as F
from itertools import combinations, product
from math import prod

import check_unified_tower as native
from prefix_tower import (
    ALTERNATING, CONTEXTS, KAPPA, LAMBDA, PROFILES, RETENTION, SAFE, SITES, TAP,
    State, active, circle, distance, prefix, readout, reference_bit, step, write_prefix,
)

WRITES = (None,) + tuple(product(SITES, (0, 1)))
LESIONS = tuple((j, 1 - reference_bit(j)) for j in SITES)
WEIGHTS = (F(1), F(1, 3), F(1, 9))
TAPE_GAP = F(1, 3**10)
PHASE_ERROR = TAP / 4


def encode(bits, tail=F(0)):
    return sum(F(2 * bit, 3**i) for i, bit in enumerate(bits, 1)) + tail / 3**len(bits)


def shift_cut(bits, write):
    result = [0] + [1 - bit for bit in bits[:-1]]
    if write is not None and write[0] <= len(bits):
        result[write[0] - 1] = write[1]
    return tuple(result)


def verify_links():
    projected = 0
    for depth in range(1, 11):
        for bits in product((0, 1), repeat=depth):
            state = State(CONTEXTS[0], F(0), encode(bits, ALTERNATING), F(0))
            for write in WRITES:
                observed = prefix(step(state, write=write).code, depth)
                assert observed == shift_cut(bits, write)
                for cut in range(1, depth + 1):
                    assert observed[:cut] == shift_cut(bits[:cut], write)
                    projected += 1
    for j, role in product(SITES, (0, 1)):
        bits = prefix(ALTERNATING, 7)
        a, b = (State(CONTEXTS[role], F(0), encode(bits, F(tail)), F(1, 8)) for tail in (0, 1))
        for write in WRITES:
            left = step(a, probe=(j, role), write=write)
            right = step(b, probe=(j, role), write=write)
            assert (left.phase, left.memory, prefix(left.code, 7)) == (
                right.phase, right.memory, prefix(right.code, 7))
    a = State(CONTEXTS[0], F(0), ALTERNATING, F(0))
    b = a._replace(code=write_prefix(a.code, 7, 1))
    assert prefix(a.code, 6) == prefix(b.code, 6)
    assert circle(step(a, probe=(7, 0)).phase - step(b, probe=(7, 0)).phase) == TAP
    assert abs(write_prefix(F(1, 9), 3, 0) - write_prefix(F(2, 9), 3, 0)) == F(5, 27)
    print(f"Projective tape: {projected} exact cut agreements; 110 cofinal probe/write cases and an omitted-bit control")


def verify_common_plant():
    gap = min(max(WEIGHTS[i] * WEIGHTS[j] / (WEIGHTS[i] + WEIGHTS[j]) *
                  abs((p[i] - r[i]) - (p[j] - r[j]))
                  for i, j in combinations(range(3), 2)) for p, r in combinations(PROFILES, 2))
    assert gap == F(1, 80)
    assert WEIGHTS[-1] * LAMBDA / 2 == F(1, 216)
    assert LAMBDA / 2 == F(1, 24)
    assert KAPPA * SAFE + TAP <= LAMBDA / 2
    assert max(F(5, 9), RETENTION + 3 * LAMBDA / 4,
               3 * LAMBDA, 4 * KAPPA + TAP * 3**7) == F(9, 16)

    codes = (F(0), F(1, 3), F(2, 3), F(1), ALTERNATING, F(1, 9), F(2, 9), F(1, 27),
             *(write_prefix(ALTERNATING, j, b) for j, b in LESIONS))
    commands = tuple((q, None) for q in (-1, 0, 1)) + tuple((0, probe) for probe in product(SITES, (0, 1)))
    p_checks = 0
    native_checks = 0
    for profile in PROFILES:
        states = [State(profile, F(i % 3, 8), c, (F(0), SAFE, -SAFE)[i % 3])
                  for i, c in enumerate(codes)]
        u = F(7, 8)
        for q in (-1, 0, 1):
            for x in states:
                assert step(x, u, q) == native.step(native.State(*x), u, q)
                native_checks += 1
        for (q, probe), write in product(commands, WRITES):
            outputs = [step(x, u, q, probe=probe, write=write) for x in states]
            approx = (u + q * LAMBDA / 2) % 1
            for x, y in zip(states, outputs):
                assert y.profile == profile and abs(y.memory) <= SAFE
                assert circle(y.phase - approx) <= LAMBDA / 2
                assert prefix(y.code, 2) == (0, 1 - prefix(x.code, 1)[0])
                assert prefix(step(y, u, q, probe=probe, write=write).code, 2) == (0, 1)
            for i, j in combinations(range(len(states)), 2):
                assert distance(outputs[i], outputs[j]) <= F(9, 16) * distance(states[i], states[j])
                p_checks += 1
    print(f"Common plant: {native_checks} original transitions; {p_checks} contraction pairs; g=1/80")


def signed_turn(turn):
    return (turn + F(1, 2)) % 1 - F(1, 2)


def verify_parity():
    count = 0
    for length in range(5):
        magnitude = 2 * KAPPA * LAMBDA * RETENTION**length
        for signs, edits, rival in product(product((-1, 0, 1), repeat=length), (False, True), (False, True)):
            prep = State(CONTEXTS[1], F(0), F(1), F(0))
            pair = [step(prep, q=q, write=LESIONS[0] if edits else None, rival=rival) for q in (1, -1)]
            for k, q in enumerate(signs):
                pair = [step(x, q=q, write=LESIONS[k % len(LESIONS)] if edits else None, rival=rival)
                        for x in pair]
            assert pair[0].code == pair[1].code
            power = signs.count(-1) + (signs.count(1) if rival else 0)
            pos, neg = [step(x, F(7, 8), probe=(7, 1), rival=rival).phase for x in pair]
            assert signed_turn(pos - neg) == (-1)**power * magnitude
            assert step(pair[0], q=1, rival=rival).phase == step(pair[1], q=1, rival=rival).phase
            count += 1
        critical = magnitude / 2
        for error in (critical / 2, critical, 2 * critical):
            high_lower = magnitude - 2 * error
            low_upper = -magnitude + 2 * error
            assert (high_lower > low_upper) == (error < critical)
    print(f"Parity: {count} matched histories; five exact noise frontiers")


def verify_recovery_and_boundary():
    assert F(1, 3) - SAFE == F(1, 12)
    assert RETENTION * SAFE + LAMBDA == F(5, 24)
    assert (SAFE - native.CORE) / 4 == F(3, 64)
    count = 0
    for p, m, sign in product(PROFILES, (F(-1, 16), F(0), F(1, 16)), (-1, 1)):
        core = State(p, F(0), ALTERNATING, m)
        assert all(native.core_distance(step(core, q=q)) == 0 for q in (-1, 1))
        shocked = State(p, (sign * F(1, 32)) % 1, ALTERNATING, sign * F(1, 8))
        d0 = native.core_distance(shocked)
        passive = 1 - native.core_distance(step(shocked)) / d0
        assert passive == F(1, 2)
        for noise in (F(-1, 32), F(0), F(1, 32)):
            feedback = native.clip(-KAPPA * (shocked.memory + noise))
            recovered = step(shocked, feedback)
            ret = 1 - native.core_distance(recovered) / d0
            assert ret - passive >= F(3, 8) and abs(recovered.memory) <= SAFE
            if noise == 0:
                assert ret == 1
            count += 1

    for u in (F(k, 512) for k in range(-8, 9)):
        final = [step(State(CONTEXTS[0], F(0), ALTERNATING, s * F(1, 8)), u) for s in (-1, 1)]
        assert sum(native.core_distance(x) for x in final) / 2 == F(1, 64)

    boundary = 0
    for p, m, code in product(PROFILES, (-SAFE, F(0), SAFE), (F(0), ALTERNATING, F(1))):
        x = State(p, F(7, 8), code, m)
        for _ in range(7):
            x = step(x)
        sham = step(x)
        interior = step(x, F(1, 8))
        threat = step(x, write=LESIONS[0])
        assert interior.code == sham.code
        assert abs(threat.code - sham.code) == F(2, 27) and abs(threat.memory) <= SAFE
        boundary += 1

    histories = []
    for s in (-1, 1):
        start = State(CONTEXTS[0], F(0), ALTERNATING, s * F(1, 8))
        past = step(start)
        present = step(past, q=1)
        loss = {a: circle(step(present, F(a, 256)).phase) for a in (-1, 1)}
        correct = min(loss, key=loss.get)
        assert loss[correct] == 0 < loss[-correct] == F(1, 128)
        histories.append((readout(past), readout(present), correct))
    assert histories[0][1] == histories[1][1] and histories[0][2] != histories[1][2]
    assert all((-1 if signed_turn(y[0]) > 0 else 1) == action for y, _, action in histories)
    print(f"Viability: {count} recoveries; 17 open-loop controls; {boundary} boundary traces; historical gain 1/2")


def verify_single_trajectory():
    def label(code):
        return int(prefix(code, 10) != prefix(ALTERNATING, 10))

    def interval(bits):
        left = encode(bits)
        return left, left + TAPE_GAP

    reference = prefix(ALTERNATING, 10)
    lo, hi = interval(reference)
    separation = min(max(lo - other_hi, other_lo - hi)
                     for bits in product((0, 1), repeat=10) if bits != reference
                     for other_lo, other_hi in (interval(bits),))
    assert separation == TAPE_GAP
    tests = 0
    for p, target in product(PROFILES, (None,) + LESIONS):
        state = step(State(p, F(0), ALTERNATING, F(0)), write=target)
        for _ in range(4):
            for error in (-TAPE_GAP / 4, F(0), TAPE_GAP / 4):
                assert label(state.code + error) == int(target is not None)
                tests += 1
            state = step(state)
        if target == LESIONS[-1]:
            assert label(state.code) == 0
    print(f"Single-trajectory legibility: {tests} labels with bounded noise; position 7 exits at the fourth sham step")


def decode_context(state, error=F(0)):
    early, _, late, _ = readout(state)
    difference = late - early + 2 * error
    return min((0, 1), key=lambda i: circle(difference - CONTEXTS[i][2]))


def probe_bit(state, site, role, error=F(0), strength=TAP):
    observed = readout(step(state, probe=(site, role), strength=strength))[0]
    return int(signed_turn(observed + error) > TAP / 2)


def prepared(write=None):
    return tuple(step(State(p, F(0), ALTERNATING, F(0)), write=write) for p in CONTEXTS)


def primary_scores(states, error=F(0), relabel=False):
    indexes, ownerships, continuities, valuations = [], [], [], []
    outcomes, predictions = [], []
    roles = (1, 0) if relabel else (0, 1)
    perspective = roles.index(1)
    for block, state in enumerate(states):
        z = roles.index(block)
        y = [tuple(probe_bit(state, site, r, error) for r in roles) for site in SITES]
        weights = tuple(F(1 + y[0][r] - y[0][1 - r], 2) for r in (0, 1))
        indexes.append(max(weights) - min(weights))
        own = [F(1 + y[1][r] - y[1][1 - r], 2) for r in (0, 1)]
        ownerships.append(F(1, 2) - sum(abs(own[r] - int(r == z)) for r in (0, 1)) / 2)
        continuities.append(F(y[2][z] - y[2][1 - z], 1 + y[2][z]))
        outcomes.append(y[3][perspective])
        predictions.append(int(decode_context(state, error) == 1) * active(state.code + error, SITES[3]))
        valuations.append(F(y[4][z] - y[4][1 - z], 1 + y[4][z]))
    candidate = F(sum(a != b for a, b in zip(outcomes, predictions)), 2)
    best_weak = min(F(sum(a != r for a in outcomes), 2) for r in (0, 1))
    return (sum(indexes) / 2, sum(ownerships) / 2, sum(continuities) / 2,
            (best_weak - candidate) / (1 + best_weak), sum(valuations) / 2)


def verify_measurement():
    baseline = (F(1), F(1, 2), F(1, 2), F(1, 3), F(1, 2))
    trials = 0
    for error, relabel in product((-PHASE_ERROR, F(0), PHASE_ERROR), (False, True)):
        sham = primary_scores(prepared(), error, relabel)
        assert sham == baseline
        for i, write in enumerate(LESIONS):
            scores = primary_scores(prepared(write), error, relabel)
            drops = tuple(a - b for a, b in zip(sham, scores))
            assert drops[i] >= F(1, 4)
            assert all(x == 0 for j, x in enumerate(drops) if i != j)
            trials += 1
        assert primary_scores(prepared(), error, relabel) == sham
    for i, write in enumerate(LESIONS):
        site = SITES[i]
        assert primary_scores(prepared((site, reference_bit(site)))) == baseline
        for state in prepared(write):
            assert active(state.code, SITES[i]) == 0
            assert all(probe_bit(state, j, r, strength=F(0)) == 0 for j, r in product(SITES, (0, 1)))

    reserve = [prepared(write) for write in (None, LESIONS[1])]
    targets = []
    for block in reserve:
        assert (readout(block[0])[0], block[0].code, block[0].memory) == (
            readout(block[1])[0], block[1].code, block[1].memory)
        outcomes = [probe_bit(x, SITES[3], 1) for x in block]
        assert [int(decode_context(x) == 1) * active(x.code, SITES[3]) for x in block] == outcomes
        assert outcomes == [0, 1]
        targets.append(outcomes)
    best = min(sum(F(sum(y != answer for y in ys), 2) for ys, answer in zip(targets, rule))
               for rule in product((0, 1), repeat=2))
    candidate = F(0)
    assert best - candidate == 1
    irred = (best - candidate) / (1 + best)
    coordinates = baseline + (F(1), irred)
    assert min(coordinates) == F(1, 3) and prod(coordinates) == F(1, 48)
    assert min(coordinates) >= F(1, 4) and prod(coordinates) >= F(1, 4)**7
    # A rival given the late channel can use the same decoded context and tie.
    assert all(probe_bit(x, SITES[3], 1) == int(decode_context(x) == 1) for pair in reserve for x in pair)
    at_frontier = [readout(step(x, probe=(SITES[3], 1)))[0] for x in reserve[0]]
    assert at_frontier[0] + TAP / 2 == at_frontier[1] - TAP / 2
    print(f"VIII: {trials} selective checks; 4 reserved predictions; loss gap 1, gate 1/3, Phi^7=1/48")


if __name__ == "__main__":
    verify_links()
    verify_common_plant()
    verify_parity()
    verify_recovery_and_boundary()
    verify_single_trajectory()
    verify_measurement()
