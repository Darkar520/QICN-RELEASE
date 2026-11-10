"""Exact circle-prefix plant with one optional write and one optional neutral probe."""

from fractions import Fraction as F
from itertools import product
from typing import NamedTuple

LAMBDA = F(1, 12)
RETENTION = F(1, 2)
KAPPA = F(1, 8)
SAFE = F(1, 4)
ALTERNATING = F(1, 4)
SITES = (3, 4, 5, 6, 7)
TAP = F(1, 16 * 3**7)
PROFILES = ((F(0),) * 3,) + tuple(
    tuple(F(j, 8) if t > k else F(0) for t in range(3))
    for k, j in product(range(2), range(1, 4))
)
CONTEXTS = (PROFILES[0], (F(0), F(0), F(1, 8)))


class State(NamedTuple):
    profile: tuple
    phase: F
    code: F
    memory: F


def prefix(code, depth):
    """Decode a Cantor prefix, also on the certified midpoint noise tube."""
    digits = []
    for _ in range(depth):
        bit = int(code >= F(1, 2))
        digits.append(bit)
        code = 3 * code - 2 * bit
    return tuple(digits)


def reference_bit(site):
    return (site - 1) % 2


def active(code, site):
    return int(prefix(code, site)[-1] == reference_bit(site))


def write_prefix(code, site, bit):
    old = prefix(code, site)[-1]
    return code + F(2 * (bit - old), 3**site)


def circle(displacement):
    turn = displacement % 1
    return min(turn, 1 - turn)


def distance(left, right):
    if left.profile != right.profile:
        return F(1)
    return max(circle(left.phase - right.phase), abs(left.code - right.code),
               abs(left.memory - right.memory) / 4)


def readout(state):
    return tuple((state.phase + offset) % 1 for offset in state.profile) + (state.code,)


def step(state, u=F(0), q=0, *, write=None, probe=None, strength=TAP, rival=False):
    """Advance under a fixed command. A probe reads the pre-transition tape."""
    if q not in (-1, 0, 1):
        raise ValueError("q must be -1, 0 or 1")
    if probe is not None:
        site, role = probe
        if q != 0 or site not in SITES or role not in (0, 1):
            raise ValueError("a role probe must be neutral and use a protected-interface site")
        u += strength * active(state.code, site) * int(state.profile == CONTEXTS[role])

    bit = prefix(state.code, 1)[0]
    phase = u + q * LAMBDA * bit + (KAPPA * state.memory if q == 0 else 0)
    sign = -1 if q == -1 or (rival and q == 1) else 1
    memory = RETENTION * sign * state.memory + LAMBDA * q * bit
    code = (1 - state.code) / 3
    if write is not None:
        site, value = write
        if site not in SITES or value not in (0, 1):
            raise ValueError("one binary digit in positions 3 through 7 may be overwritten")
        code = write_prefix(code, site, value)
    return State(state.profile, phase % 1, code, memory)
