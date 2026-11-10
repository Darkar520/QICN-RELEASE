"""Exact synthetic controls for the preregistered Paper VI memory prediction."""
from collections import Counter
from fractions import Fraction as Q
from itertools import product

from check_p1_dynamics import circle_distance, rotate
from check_p2_common_support import LAM, PROFILES, code_step, readout
from check_p2_diagnostics import L, noise_grid

NOISE = Q(1, 4096)
TOLERANCE = Q(1, 256)
RETENTION = (Q(1, 2), Q(5, 8), Q(3, 4))
COUPLING = (L, Q(7, 72), LAM)
CALIBRATION = (PROFILES[0], Q(0), Q(2, 3))
HOLDOUT = tuple(product(PROFILES[1:], (Q(1, 7), Q(13, 14)), (Q(2, 3), Q(1))))
SCHEDULES = tuple((horizon, j) for horizon in (4, 5) for j in (1, horizon - 1))
MODELS = ("memory", "additive")


def trajectory(model, prep, strength, retention, arm, phases, probes):
    profile, phase, code = prep
    memory = Q(0)
    path = [(readout(profile, phase, code), memory)]
    for time, command in enumerate(phases):
        q = arm if time == 0 else probes.get(time, 0)
        bit = int(code >= Q(2, 3))
        load = strength * q * bit
        phase = rotate(command, load)
        code = code_step(code)
        if model != "original":
            memory *= retention
            if model == "memory" and q == -1:
                memory = -memory
            memory += load
            if model == "additive_offset" and time > 0:
                memory += strength * q
        path.append((readout(profile, phase, code), memory))
    return path


def pair(model, prep, strength, retention, phases, probes):
    return tuple(trajectory(model, prep, strength, retention, arm, phases, probes)
                 for arm in (1, -1))


def phase_schedule(prep, horizon):
    return tuple(rotate(prep[1], Q(time + 1, 11)) for time in range(horizon))


def contrast(arms, errors=(Q(0), Q(0))):
    plus, minus = arms
    return plus[-1][1] + errors[0] - minus[-1][1] - errors[1]


def fit(calibration, strength, errors):
    estimate = contrast(calibration, errors) / (2 * strength)
    return max(RETENTION[0], min(RETENTION[-1], estimate))


def predict(model, strength, retention, horizon):
    magnitude = 2 * strength * retention ** (horizon - 1)
    return (magnitude, -magnitude if model == "memory" else magnitude)


def decide(observed, predictions):
    passing = [name for name, predicted in predictions.items()
               if max(abs(x - y) for x, y in zip(observed, predicted, strict=True)) <= TOLERANCE]
    if len(passing) == 1:
        return passing[0]
    return "tie" if passing else "neither"


def main():
    counts = Counter()
    grid = tuple(product(noise_grid(NOISE), repeat=2))
    minimum_interaction = None
    maximum_winner_error = Q(0)
    minimum_loser_error = None

    for prep, (horizon, j), strength, q in product(
            HOLDOUT, SCHEDULES, (Q(0), *COUPLING), (-1, 0, 1)):
        phases = phase_schedule(prep, horizon)
        base_plus, base_minus = pair("original", prep, strength, Q(0), phases, {j: q})
        assert base_plus[0] == base_minus[0] and base_plus[2:] == base_minus[2:]
        assert circle_distance(base_plus[1][0][0], base_minus[1][0][0]) == 2 * strength
        counts["original_extinction_four_channels"] += 1
        for model in MODELS:
            outcome = pair(model, prep, strength, RETENTION[1], phases, {j: q})
            for original, extended in zip((base_plus, base_minus), outcome, strict=True):
                assert tuple(x[0] for x in original) == tuple(x[0] for x in extended)
            expected = 2 * strength * RETENTION[1] ** (horizon - 1)
            if model == "memory" and q == -1:
                expected = -expected
            assert contrast(outcome) == expected
            counts["extension_projection"] += 1

    for strength, retention, (horizon, j) in product(COUPLING, RETENTION, SCHEDULES):
        prep = HOLDOUT[(horizon + j) % len(HOLDOUT)]
        phases = phase_schedule(prep, horizon)
        calibration = pair("memory", CALIBRATION, strength, retention, (Q(0), Q(0)), {})
        assert calibration == pair("additive", CALIBRATION, strength, retention, (Q(0), Q(0)), {})
        holdout = {model: tuple(pair(model, prep, strength, retention, phases, {j: q})
                                for q in (1, -1)) for model in MODELS}
        for model, arms in holdout.items():
            assert tuple(map(contrast, arms)) == predict(model, strength, retention, horizon)
            for index, q in enumerate((1, -1)):
                additive = pair("additive_offset", prep, strength, retention, phases, {j: q})
                assert contrast(additive) == contrast(holdout["additive"][index])
                assert additive[0][-1][1] != holdout["additive"][index][0][-1][1]
            assert contrast(pair(model, prep, strength, retention, phases, {})) == predict(
                "additive", strength, retention, horizon)[0]
        counts["common_additive_and_sham"] += 1

        double_probe = pair("memory", prep, strength, retention, phases, {1: -1, horizon - 1: -1})
        assert contrast(double_probe) == predict("additive", strength, retention, horizon)[0]
        counts["double_probe_cancellation"] += 1

        for cal_error in grid:
            fitted = fit(calibration, strength, cal_error)
            assert abs(fitted - retention) <= NOISE / strength
            predictions = {model: predict(model, strength, fitted, horizon) for model in MODELS}
            for truth, (positive, negative) in holdout.items():
                rival = next(model for model in MODELS if model != truth)
                for positive_error, negative_error in product(grid, repeat=2):
                    observed = (contrast(positive, positive_error), contrast(negative, negative_error))
                    assert decide(observed, predictions) == truth
                    residual = {model: max(abs(x - y) for x, y in zip(observed, yhat, strict=True))
                                for model, yhat in predictions.items()}
                    maximum_winner_error = max(maximum_winner_error, residual[truth])
                    if minimum_loser_error is None or residual[rival] < minimum_loser_error:
                        minimum_loser_error = residual[rival]
                    if truth == "memory":
                        interaction = observed[0] - observed[1]
                        if minimum_interaction is None or interaction < minimum_interaction:
                            minimum_interaction = interaction
                    else:
                        assert abs(observed[0] - observed[1]) <= 4 * NOISE
                    counts[f"heldout_select_{truth}"] += 1

        predictions = {model: predict(model, strength, retention, horizon) for model in MODELS}
        assert decide((Q(0), Q(0)), predictions) == "neither"
        assert decide(predictions["memory"], {"m1": predictions["memory"], "m2": predictions["memory"]}) == "tie"
        extreme = (predictions["memory"][0], Q(0))
        assert decide(extreme, predictions) == "neither"
        counts["ties_and_rejections"] += 1

        for model in MODELS:
            no_memory = pair(model, prep, strength, Q(0), phases, {j: -1})
            assert contrast(no_memory) == 0
            assert circle_distance(no_memory[0][1][0][0], no_memory[1][1][0][0]) == 2 * strength
            for sham_code, sham_strength in ((Q(0), strength), (prep[2], Q(0))):
                sham_prep = (prep[0], prep[1], sham_code)
                sham = pair(model, sham_prep, sham_strength, retention, phases, {j: -1})
                assert contrast(sham) == 0 and sham[0] == sham[1]
            counts["memory_ablation_and_preparation_controls"] += 1

        plus = trajectory("memory", prep, Q(0), retention, 1, (L, *phases[1:]), {j: -1})
        minus = trajectory("memory", prep, Q(0), retention, -1, (-L, *phases[1:]), {j: -1})
        assert circle_distance(plus[1][0][0], minus[1][0][0]) == 2 * L
        assert contrast((plus, minus)) == 0 and plus[2:] == minus[2:]
        counts["unmatched_phase_control"] += 1

    assert minimum_interaction == Q(1, 48) - 4 * NOISE
    assert maximum_winner_error <= TOLERANCE < minimum_loser_error
    print("Exact P3 synthetic controls, zero mismatches")
    print(dict(counts))
    print(f"Minimum observed interaction: {minimum_interaction}")
    print(f"Maximum accepted residual: {maximum_winner_error}; minimum rejected residual: {minimum_loser_error}")


if __name__ == "__main__":
    main()
