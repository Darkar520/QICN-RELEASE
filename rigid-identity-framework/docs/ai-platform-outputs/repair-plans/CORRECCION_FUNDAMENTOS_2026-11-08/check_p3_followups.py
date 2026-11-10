"""Exact rational controls for the three local P3 follow-ups."""
from fractions import Fraction as Q
from itertools import product

from check_p1_dynamics import circle_distance, rotate
from check_p2_common_support import PROFILES, code_step, readout
from check_p2_diagnostics import noise_grid

KAPPA = Q(1, 8)
NOISE = Q(1, 32768)
TOLERANCE = Q(1, 2048)
RETENTIONS = (Q(1, 2), Q(5, 8), Q(3, 4))
STRENGTHS = (Q(1, 12), Q(7, 72), Q(1, 9))
MODELS = ("M", "B")


def step(state, command, q, strength, retention, model, kappa):
    _, code, memory = state
    bit = int(code >= Q(2, 3))
    sign = -1 if q == -1 or (q == 1 and model == "B") else 1
    load = strength * q * bit
    shift = load + (kappa * memory if q == 0 else 0)
    return rotate(command, shift), code_step(code), retention * sign * memory + load


def contrast(controls, strength, retention, model, errors=(0, 0), kappa=KAPPA, code=Q(2, 3)):
    phases = []
    for arm, error in zip((1, -1), errors, strict=True):
        state = (Q(0), code, Q(0))
        for time, q in enumerate((arm, *controls)):
            state = step(state, Q(13 + time, 14), q, strength, retention, model, kappa)
        phases.append(state[0] + error)
    return (phases[0] - phases[1] + Q(1, 2)) % 1 - Q(1, 2)


def feedback_checks():
    state_checks = selection = ties = 0
    codes = (Q(0), Q(1, 3), Q(2, 3), Q(1))
    phases = (Q(0), Q(1, 7), Q(13, 14))
    for strength, retention, model in product((Q(0), *STRENGTHS), RETENTIONS, MODELS):
        states = tuple(product(phases, codes, (-4 * strength, Q(0), 4 * strength)))
        for q, u in product((-1, 0, 1), phases):
            transitions = [(x, step(x, u, q, strength, retention, model, KAPPA)) for x in states]
            prediction = rotate(u, q * strength / 2)
            for x, xx in transitions:
                assert abs(xx[2]) <= 4 * strength
                assert circle_distance(xx[0], prediction) <= strength / 2
                for profile in PROFILES:
                    obs = readout(profile, xx[0], xx[1])
                    assert tuple((v - obs[0]) % 1 for v in obs[:3]) == tuple(v % 1 for v in profile)
            for (x, xx), (y, yy) in product(transitions, repeat=2):
                d = max(circle_distance(x[0], y[0]), abs(x[1] - y[1]), abs(x[2] - y[2]) / 4)
                assert abs(xx[1] - yy[1]) == abs(x[1] - y[1]) / 3
                assert max(circle_distance(xx[0], yy[0]), abs(xx[1] - yy[1]),
                           abs(xx[2] - yy[2]) / 4) <= Q(5, 6) * d
                state_checks += 1
        if strength:
            x = (Q(0), Q(1, 4), Q(0))
            y = (KAPPA * strength / retention, Q(1, 4), strength)
            xx, yy = (step(s, Q(0), 0, strength, retention, model, KAPPA) for s in (x, y))
            assert abs(yy[2] - xx[2]) == retention * strength
            assert circle_distance(xx[0], yy[0]) == retention * circle_distance(x[0], y[0])

    grid = tuple(product(noise_grid(NOISE), repeat=2))
    for strength, retention, horizon in product(STRENGTHS, RETENTIONS, (5, 6)):
        for j in (1, horizon - 2):
            schedules = []
            for q in (1, -1):
                controls = [0] * (horizon - 1)
                controls[j - 1] = q
                schedules.append(tuple(controls))
            k = horizon - 2
            magnitude = 2 * KAPPA * strength * retention ** k
            assert contrast((0,) * (horizon - 1), strength, retention, "M") == magnitude
            double = (1, 1) + (0,) * (horizon - 3)
            for model in MODELS:
                assert contrast(double, strength, retention, model) == magnitude
                assert contrast((*schedules[0][:-1], 1), strength, retention, model) == 0
                assert contrast(schedules[0], strength, retention, model, kappa=0) == 0
                assert contrast(schedules[0], strength, retention, model, code=Q(0)) == 0
                assert contrast(schedules[1], strength, retention, model) == -magnitude
            ties += 1
            observed = {
                model: tuple(tuple(contrast(q, strength, retention, model, error) for error in grid)
                             for q in schedules)
                for model in MODELS
            }
            for errors in grid:
                calibration = contrast((0, 0), strength, retention, "M", errors)
                assert calibration == contrast((0, 0), strength, retention, "B", errors)
                a = max(RETENTIONS[0], min(RETENTIONS[-1], calibration / (2 * KAPPA * strength)))
                assert abs(a - retention) <= NOISE / (KAPPA * strength)
                pred = 2 * KAPPA * strength * a ** k
                predictions = {"M": (pred, -pred), "B": (-pred, -pred)}
                for truth, values in observed.items():
                    for data in product(*values):
                        passing = [model for model, pair in predictions.items()
                                   if max(abs(x - y) for x, y in zip(pair, data, strict=True)) <= TOLERANCE]
                        assert passing == [truth]
                        selection += 1
    assert Q(43, 8) * NOISE < TOLERANCE < KAPPA / 48 - 2 * NOISE
    print(f"VI: {state_checks} state checks; {selection} held-out decisions; {ties} parity/control groups")


def recovery(shocked, action):
    if not 0 < abs(shocked) <= 1 or abs(action) > Q(1, 4):
        return None
    endpoint = shocked / 2 + action
    if abs(endpoint) > 1:
        return None
    return 1 - abs(endpoint) / abs(shocked)


def certified_cell(observed, radius):
    cutoff = Q(1, 2)
    if observed + radius < cutoff:
        return "low"
    if observed - radius >= cutoff:
        return "high"
    return None


def viability_checks():
    shocks = (Q(-1), Q(1))
    assert min(Q(1) - abs(x) for x in (Q(0),)) == 1
    assert Q(1) - abs(shocks[0]) == 0
    for shock in shocks:
        active = recovery(shock, -shock / 4)
        passive = recovery(shock, Q(0))
        assert (active, passive, min(active, active - passive)) == (Q(3, 4), Q(1, 2), Q(1, 4))
        assert min(passive, passive - passive) == 0
    assert recovery(Q(0), Q(0)) is None
    assert recovery(Q(5, 4), Q(0)) is None
    assert recovery(Q(1), Q(1, 2)) is None
    actions = tuple(Q(i, 32) for i in range(-8, 9))
    for action in actions:
        assert sum(recovery(shock, action) for shock in shocks) / 2 == Q(1, 2)
    radius = Q(1, 16)
    points = tuple(Q(i, 32) for i in range(33))
    checks = 0
    for true, error in product(points, (Q(-1, 16), Q(0), Q(1, 16))):
        observed = max(Q(0), min(Q(1), true + error))
        label = certified_cell(observed, radius)
        clean = "low" if true < Q(1, 2) else "high"
        assert label is None or label == clean
        if abs(true - Q(1, 2)) > 2 * radius:
            assert label == clean
        checks += 1
    assert certified_cell(Q(1, 2), radius) is None
    assert certified_cell(Q(1, 2) - radius, radius) is None
    assert certified_cell(Q(1, 2) + radius, radius) == "high"
    labels = [certified_cell(x, radius) for x in points]
    labels = [label for label in labels if label is not None]
    for x, y, z in product(labels, repeat=3):
        assert not (x == y == z) or x == z
    x, y, z = Q(0), 3 * radius / 4, 3 * radius / 2
    assert abs(x - y) <= radius and abs(y - z) <= radius < abs(x - z)
    print(f"VII: {len(actions)} blind open-loop actions; {checks} noise/descriptor pairs; {len(labels)**3} certified label triples")


def ownership(candidate, baseline, reference, verified=True):
    if not verified or not reference or not (candidate.keys() == baseline.keys() == reference.keys()):
        return "insufficient", None, None
    if any(not 0 <= v <= 1 for mapping in (candidate, baseline, reference) for v in mapping.values()):
        return "insufficient", None, None
    raw = sum((abs(baseline[k] - v) - abs(candidate[k] - v) for k, v in reference.items()), Q(0)) / len(reference)
    return "sufficient", raw, max(Q(0), min(Q(1), raw))


def selective(before, after, targets):
    drops = tuple(x - y for x, y in zip(before[:5], after[:5], strict=True))
    return (all(drops[j] >= Q(1, 4) for j in targets)
            and all(abs(drops[j]) <= Q(1, 8) for j in range(5) if j not in targets))


def measurement_checks():
    values = tuple(Q(i, 4) for i in range(5))
    checks = 0
    for x, y, b, r in product(values, repeat=4):
        _, raw, clipped = ownership({"event": x}, {"event": b}, {"event": r})
        _, improved, _ = ownership({"event": y}, {"event": b}, {"event": r})
        assert -1 <= raw <= 1 and 0 <= clipped <= 1
        assert raw == abs(b - r) - abs(x - r)
        if abs(y - r) <= abs(x - r):
            assert improved >= raw
        checks += 1
    reference, candidate, baseline = {"a": Q(1), "b": Q(0)}, {"a": Q(1), "b": Q(0)}, {"a": Q(0), "b": Q(1)}
    assert ownership(candidate, baseline, reference) == ("sufficient", Q(1), Q(1))
    assert ownership(baseline, candidate, reference) == ("sufficient", Q(-1), Q(0))
    assert ownership(baseline, baseline, reference) == ("sufficient", Q(0), Q(0))
    assert ownership({}, {}, {}) == ("insufficient", None, None)
    assert ownership(candidate, baseline, {"a": Q(1)}) == ("insufficient", None, None)
    assert ownership(candidate, baseline, reference, verified=False) == ("insufficient", None, None)
    assert ownership(candidate, baseline, {"a": Q(2), "b": Q(0)}) == ("insufficient", None, None)
    renamed = tuple({("right" if k == "a" else "left"): v for k, v in mapping.items()}
                    for mapping in (candidate, baseline, reference))
    assert ownership(*renamed) == ownership(candidate, baseline, reference)
    assert ownership(renamed[0], renamed[1], {"right": Q(0), "left": Q(1)}) != ownership(*renamed)
    before = (Q(1, 2),) * 5
    after = (Q(1, 4), *before[1:])
    for derived in product(values, repeat=4):
        assert selective((*before, *derived[:2]), (*after, *derived[2:]), {0})
        assert not selective((*before, *derived[:2]), (*before, *derived[2:]), {0})
        assert not selective(before, (after[0], Q(3, 4), *after[2:]), {0})
    assert selective(before, (Q(1, 4),) * 5, set(range(5)))
    print(f"VIII: {checks} ownership grids; {len(values)**4} perturbations of derived scores")


if __name__ == "__main__":
    feedback_checks()
    viability_checks()
    measurement_checks()
