"""Exact checks for the joint measurement window and projection geometry."""
from fractions import Fraction as Q
from itertools import combinations, product
from math import prod

from check_p4_bridge_adjudication import decode_label, sections

CONTEXTS = (0, 1)
BASE = (1,) * 5
COMMANDS = range(6)


def transition(state, command):
    z, bits = state
    return z, tuple(0 if j == command else b for j, b in enumerate(bits, 1))


def observations(state):
    z, (index, own, continuity, perspective, value) = state
    reference = (Q(1 - z), Q(z))
    control = (Q(1, 2), Q(1, 2))
    return ((Q(1 + index, 2), Q(1 - index, 2)), reference if own else control, reference,
            control, (Q(continuity), Q(0)), perspective * z, (value, 0))


def mean(values):
    data = tuple(values)
    return sum(data, Q(0)) / len(data)


def errors(actual, predicted):
    return mean(abs(x - y) for x, y in zip(actual, predicted, strict=True))


def score_primaries(bits, command):
    rows = tuple(observations(transition((z, bits), command)) for z in CONTEXTS)
    indices = mean(max(q) - min(q) for q, *_ in rows)
    ownership = mean(errors(ref, ctrl) - errors(ref, cand) for _, cand, ref, ctrl, *_ in rows)
    continuity = mean((c - other) / (1 + c) for _, _, _, _, (c, other), _, _ in rows)
    outcomes = tuple(row[-2] for row in rows)
    blind_loss = min(errors(outcomes, (guess, guess)) for guess in CONTEXTS)
    indexed_predictions = tuple(bits[3] * z if command != 4 else 0 for z in CONTEXTS)
    indexed_loss = errors(outcomes, indexed_predictions)
    perspective = (blind_loss - indexed_loss) / (1 + blind_loss)
    self_value, other = tuple(mean(row[-1][j] for row in rows) for j in (0, 1))
    valuation = (self_value - other) / (1 + self_value)
    return indices, ownership, continuity, perspective, valuation


def is_selective(before, after, target):
    drops = tuple(x-y for x, y in zip(before, after, strict=True))
    return drops[target] >= Q(1, 4) and all(abs(x) <= Q(1, 8) for j, x in enumerate(drops) if j != target)


def window_checks():
    state_controls = 0
    for bits, command in product(product(CONTEXTS, repeat=5), COMMANDS):
        measured = score_primaries(bits, command)
        b = transition((0, bits), command)[1]
        assert measured == (b[0], Q(b[1], 2), Q(b[2], 1+b[2]), Q(b[3], 2+b[3]), Q(b[4], 1+b[4]))
        state_controls += 1
    base = score_primaries(BASE, 0)
    targeted = tuple(score_primaries(BASE, command) for command in range(1, 6))
    assert all(is_selective(base, after, target) for target, after in enumerate(targeted))
    assert not any(is_selective(base, score_primaries(BASE, 0), j) for j in range(5))
    reserve = (0, 2)
    observed = {u: tuple(observations(transition((z, BASE), u))[-2] for z in CONTEXTS) for u in reserve}
    candidate = sum(errors(y, CONTEXTS) for y in observed.values())
    rivals = [sum(errors(y, (rule[u], rule[u])) for u, y in observed.items())
              for rule in product(CONTEXTS, repeat=6)]
    assert candidate == 0 and set(rivals) == {Q(1)}
    assert sum(errors(y, y) for y in observed.values()) == candidate  # restored index
    irred = (min(rivals) - candidate) / (1 + min(rivals))
    coordinates = (*base, Q(1), irred)
    assert coordinates == (1, Q(1, 2), Q(1, 2), Q(1, 3), Q(1, 2), 1, Q(1, 2))
    assert min(coordinates) == Q(1, 3) > Q(1, 4)
    assert prod(coordinates) == Q(1, 48) > Q(1, 4)**7
    record = (coordinates, targeted, candidate, min(rivals))
    attachments = {(mode, w): record for mode, w in product(range(3), CONTEXTS)}
    for edge_bits, expected in (((0, 1, 1), {(0, 0, 1), (1, 1, 0)}), ((0, 0, 1), set())):
        edge_rows = [{(decode_label(Q(w)), decode_label(Q(w ^ k))) for w in CONTEXTS} for k in edge_bits]
        realized = {ws for ws in product(CONTEXTS, repeat=3)
                    if all((ws[j], ws[(j+1) % 3]) in edge_rows[j] for j in range(3))}
        assert set(attachments.values()) == {record}
        assert realized == sections(edge_bits) == expected
    print(f"Window: {state_controls} preparations/commands; {len(rivals)} weak predictors; 2 and 0 transport sections")


def square_distance(left, right):
    return sum((a-b)**2 for a, b in zip(left, right, strict=True))


def geometry_checks():
    discrete = (0, 2)
    assert max(abs(x-y) for x, y in product(discrete, repeat=2)) == 2
    assert min(max(abs(x-z) for x in discrete) for z in discrete) == 2
    triangle = ((Q(0), Q(0)), (Q(2), Q(0)), (Q(1), Q(3, 2)))
    assert max(square_distance(a, b) for a, b in combinations(triangle, 2)) == 4
    midpoint = (Q(1), Q(0))
    assert square_distance(midpoint, triangle[-1]) == Q(9, 4) > 1
    circumcenter = (Q(1), Q(5, 12))
    assert all(square_distance(circumcenter, p) == Q(169, 144) for p in triangle)
    grid = tuple(Q(i, 8) for i in range(9))
    max_distance = lambda a, b: max(abs(x-y) for x, y in zip(a, b, strict=True))
    points = tuple(product(grid, repeat=2))
    pair_checks = 0
    for a, b in product(points, repeat=2):
        assert abs(a[0]-b[0]) <= max_distance(a, b)
        assert a[0] == (lambda y: y)(a[0])
        if a[0] == b[0]:
            assert abs(a[0]-b[0]) == 0
        pair_checks += 1
    assert max(max_distance(a, b) for a, b in product(points, repeat=2) if a[0] == b[0]) == 1
    scalar_checks = 0
    for left, right in combinations(grid, 2):
        for slope in (Q(0), Q(1, 2), Q(1), Q(3)):
            a, b = slope * left, slope * right
            center = (a+b)/2
            radius = max(abs(a-center), abs(b-center))
            assert radius == (b-a)/2 == slope*(right-left)/2
            for guess in grid:
                assert max(abs(a-guess), abs(b-guess)) >= radius
            if slope:
                assert right-left == 2*radius/slope
            else:
                assert radius == 0 and left != right
            scalar_checks += 1
    print(f"Geometry: {pair_checks} projection pairs; {scalar_checks} scalar fibres; 2 centre counterexamples")


if __name__ == "__main__":
    window_checks()
    geometry_checks()
