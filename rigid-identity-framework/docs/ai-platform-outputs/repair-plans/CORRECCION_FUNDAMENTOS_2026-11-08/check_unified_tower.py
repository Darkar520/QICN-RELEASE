"""Exact controls for the V–VII–VIII circle-prefix tower protocol."""

from fractions import Fraction as F
from itertools import product
from typing import NamedTuple

LAMBDA = F(1, 12)
A = F(1, 2)
KAPPA = F(1, 8)
AMBIENT = 4 * LAMBDA
SAFE = F(1, 4)
CORE = F(1, 16)
SHOCK = F(1, 8)
BUDGET = F(1, 64)
ALTERNATING = F(1, 4)
PROFILES = ((0, 0, 0),) + tuple(
    tuple(F(j, 8) if t > k else F(0) for t in range(3))
    for k, j in product(range(2), range(1, 4))
)


class State(NamedTuple):
    profile: tuple
    phase: F
    code: F
    memory: F


def step(state, u, q):
    p, _, c, m = state
    bit = int(c >= F(2, 3))
    phase = (u + q * LAMBDA * bit + (KAPPA * m if q == 0 else 0)) % 1
    memory = (-A if q == -1 else A) * m + LAMBDA * q * bit
    return State(p, phase, (1 - c) / 3, memory)


def readout(state):
    return tuple((state.phase + p) % 1 for p in state.profile) + (state.code,)


def circle(x):
    r = x % 1
    return min(r, 1 - r)


def clip(action):
    return max(-BUDGET, min(BUDGET, action))


def core_distance(state):
    assert state.code == ALTERNATING
    return max(circle(state.phase), max(0, abs(state.memory) - CORE) / 4)


def viability(state):
    return AMBIENT - abs(state.memory)


def verify_recovery():
    assert A * SAFE + LAMBDA == F(5, 24) < SAFE
    assert AMBIENT - SAFE == LAMBDA
    assert (SAFE - CORE) / 4 == F(3, 64)
    assert AMBIENT - (A * AMBIENT + LAMBDA) >= 0
    assert KAPPA * SHOCK == BUDGET
    count = 0
    for p, m, sign in product(PROFILES, (F(i, 32) for i in range(-2, 3)), (-1, 1)):
        initial = State(p, F(0), ALTERNATING, m)
        for q in (-1, 1):
            assert core_distance(step(initial, F(0), q)) == 0
        damaged = initial._replace(phase=(sign * F(1, 32)) % 1, memory=sign * SHOCK)
        d0 = core_distance(damaged)
        assert d0 == F(1, 32)
        passive = step(damaged, F(0), 0)
        active = step(damaged, clip(-KAPPA * damaged.memory), 0)
        assert min(map(viability, (initial, damaged, passive, active))) >= LAMBDA
        assert 1 - core_distance(active) / d0 == 1
        assert 1 - core_distance(passive) / d0 == F(1, 2)
        count += 1
    p = PROFILES[0]
    pair = [State(p, (sign * F(1, 32)) % 1, ALTERNATING, sign * SHOCK)
            for sign in (-1, 1)]
    for u in (BUDGET * F(i, 8) for i in range(-8, 9)):
        distances = [core_distance(step(x, u, 0)) for x in pair]
        assert sum(distances) / 2 == BUDGET
    for x, noise in product(pair, (F(i, 64) for i in range(-2, 3))):
        active = step(x, clip(-KAPPA * (x.memory + noise)), 0)
        assert core_distance(active) <= F(1, 256)
        assert (BUDGET - core_distance(active)) / core_distance(x) >= F(3, 8)
    outside = pair[0]._replace(memory=AMBIENT)
    assert viability(outside) == 0
    print(f"Recovery: {count} same-plant shocks; 17 open-loop actions; 10 noisy measurements")


def verify_prefix():
    codes = tuple(sum(F(2 * bit, 3**i) for i, bit in enumerate(bits, 1))
                  + ALTERNATING / 3**5 for bits in product((0, 1), repeat=5))
    assert len(set(codes)) == 32
    count = 0
    for p, c, m in product(PROFILES, codes, (-SAFE, F(0), SAFE)):
        initial = State(p, F(0), c, m)
        same_coordinates = (p, (1 - c) / 3)
        for q, u in product((-1, 0, 1), (F(i, 64) for i in range(64))):
            result = step(initial, u, q)
            assert (result.profile, result.code) == same_coordinates
            assert viability(result) >= LAMBDA
            count += 1
    assert len({(1 - c) / 3 for c in codes}) == len(codes)
    # A separated phase codebook can mimic five lesions but exposes them to a command-only rival.
    initial = State(PROFILES[0], F(0), ALTERNATING, F(0))
    words = (31,) + tuple(31 ^ (1 << j) for j in range(5))
    for word in words:
        u = F(word, 32)
        result = step(initial, u, 0)
        assert result.phase * 32 == u * 32 == word
    print(f"Prefix: {count} transitions with control-independent profile and code; 6 command-only labels")


def verify_history():
    history = []
    for sign in (-1, 1):
        x0 = State(PROFILES[0], F(0), ALTERNATING, sign * SHOCK)
        x1 = step(x0, F(0), 0)
        x2 = step(x1, F(0), 1)
        x3 = step(x2, F(0), 0)
        assert x1.phase == (sign * BUDGET) % 1
        assert x3.phase == (sign * F(1, 256)) % 1
        history.append((readout(x1), readout(x2), sign))
    assert history[0][1] == history[1][1]
    assert history[0][0] != history[1][0]
    best_snapshot = min(F(sum(pred != sign for _, _, sign in history), len(history))
                        for pred in (-1, 1))
    past_lookup = {past: sign for past, _, sign in history}
    best_history = F(sum(past_lookup[past] != sign for past, _, sign in history), len(history))
    assert best_snapshot - best_history == F(1, 2)
    assert 2 * F(1, 256) == BUDGET / 2
    print("History: current four-channel collision, historical loss gap 1/2; matched-history rival ties")


if __name__ == "__main__":
    verify_recovery()
    verify_prefix()
    verify_history()
