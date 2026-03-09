from __future__ import annotations

import csv
import hashlib
import json
import math
import random
from pathlib import Path
from statistics import mean


BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"

SEEDS = [11, 23, 37, 47, 59]
HORIZON = 36
REPLICAS_PER_CLASS = 4
HALF = HORIZON // 2

INVARIANTS = ["I_per", "I_ri", "I_int", "I_cont", "I_diff", "I_leg"]

CONT_SUPPORT_RADIUS = 2.25
DISC_SUPPORT_RADIUS = 4.25
NEG_SUPPORT_RADIUS = 4.50
COLLAPSE_RADIUS = 0.12
CONTINUITY_JUMP_CEILING = 0.95
INTEGRATION_RESOLUTION_FLOOR = 0.05
DIFF_SEPARATION_FLOOR = 0.30
NON_NULL_FLOOR = 0.18
LEG_THRESHOLDS = {
    "clean_acc": 0.90,
    "noisy_acc": 0.75,
    "critical_shift": 0.70,
    "sham_fpr": 0.10,
    "compression_acc": 0.80,
}


def tanh(x: float) -> float:
    return math.tanh(x)


def clamp(x: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, x))


def vec_norm(x: list[float]) -> float:
    return math.sqrt(sum(v * v for v in x))


def vec_dist(a: list[float], b: list[float]) -> float:
    return vec_norm([x - y for x, y in zip(a, b)])


def mean_vec(vectors: list[list[float]]) -> list[float]:
    if not vectors:
        return [0.0, 0.0, 0.0]
    n = len(vectors)
    dim = len(vectors[0])
    return [sum(v[i] for v in vectors) / n for i in range(dim)]


def quantile(values: list[float], q: float) -> float:
    if not values:
        return 0.0
    xs = sorted(values)
    idx = int(round((len(xs) - 1) * q))
    return xs[idx]


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


NEG_W = []
_rng_w = random.Random(123)
for i in range(12):
    row = []
    for j in range(12):
        if i == j:
            row.append(0.35 if i % 2 == 0 else -0.22)
        else:
            row.append(_rng_w.uniform(-0.85, 0.85))
    NEG_W.append(row)


def initial_state(system: str, label: int, rng: random.Random) -> list[float]:
    sign = 1.0 if label == 1 else -1.0
    if system in {"positive_continuous", "ablate_integration", "ablate_continuity", "ablate_differentiation", "ablate_legibility", "ablate_identity"}:
        return [
            0.55 * sign + rng.uniform(-0.05, 0.05),
            0.35 * sign + rng.uniform(-0.05, 0.05),
            0.40 * sign + rng.uniform(-0.04, 0.04),
            0.78 * sign + rng.uniform(-0.04, 0.04),
        ]
    if system == "ablate_persistence":
        return [
            0.60 * sign + rng.uniform(-0.05, 0.05),
            0.40 * sign + rng.uniform(-0.05, 0.05),
            0.35 * sign + rng.uniform(-0.05, 0.05),
            0.70 * sign + rng.uniform(-0.05, 0.05),
        ]
    if system == "positive_discrete":
        base = 2 if label == 1 else -2
        return [base, 1 if label == 1 else -1, 1 if label == 1 else -1, base]
    if system == "complexity_negative":
        return [sign * (0.7 if i < 3 else 0.3) + rng.uniform(-0.2, 0.2) for i in range(12)]
    raise ValueError(system)


def factorized_step(system: str, state: list[float], mode: str, label: int, t: int) -> list[float]:
    if system.startswith("positive") or system.startswith("ablate"):
        if system == "positive_discrete":
            u_q = (-2 if label == 1 else 2) if (mode == "critical" and t >= HALF) else 0
            target = [
                2 * state[0],
                2 * state[1],
                2 * state[2],
                2 * state[3] + u_q,
            ]
            return [discrete_step_one(c, y) for c, y in zip(state, target)]
        u_m = 0.05 if (mode == "sham" and t >= HALF) else 0.0
        u_q = (-1.1 if label == 1 else 1.1) if (mode == "critical" and t >= HALF) else 0.0
        return [
            tanh(0.91 * state[0] + u_m),
            tanh(0.89 * state[1]),
            tanh(0.90 * state[2]),
            tanh(0.92 * state[3] + u_q),
        ]
    if system == "complexity_negative":
        return [tanh(NEG_W[i][i] * state[i] + 0.05 * math.sin((t + 1) * (i + 1))) for i in range(12)]
    raise ValueError(system)


def discrete_step_one(current: float, target: float) -> float:
    proposed = round(target / 2.0)
    return clamp(proposed, -2, 2)


def step(system: str, state: list[float], mode: str, label: int, t: int, rng: random.Random) -> list[float]:
    if system == "positive_continuous":
        u_m = 0.05 if (mode == "sham" and t >= HALF) else 0.0
        u_g = (-0.18 if label == 1 else 0.18) if (mode == "critical" and t >= HALF) else 0.0
        u_q = (-1.1 if label == 1 else 1.1) if (mode == "critical" and t >= HALF) else 0.0
        m, i, g, q = state
        return [
            tanh(0.91 * m + 0.24 * i + 0.08 * g + 0.04 * q + u_m),
            tanh(0.21 * m + 0.89 * i + 0.17 * g + 0.06 * q),
            tanh(0.11 * m + 0.18 * i + 0.90 * g + 0.20 * q + u_g),
            tanh(0.07 * m + 0.05 * i + 0.24 * g + 0.92 * q + u_q),
        ]
    if system == "ablate_persistence":
        return [0.28 * state[0], 0.24 * state[1], 0.20 * state[2], 0.18 * state[3]]
    if system == "ablate_identity":
        m, i, g, q = state
        shared = tanh(0.92 * (abs(m) + abs(i) + abs(g) + abs(q)) / 4.0)
        return [
            shared,
            shared,
            shared,
            shared,
        ]
    if system == "ablate_integration":
        return factorized_step(system, state, mode, label, t)
    if system == "ablate_continuity":
        m, i, g, q = step("positive_continuous", state, mode, label, t, rng)
        if t >= 10:
            q = 0.99 if (t % 2 == 0) else -0.99
        return [m, i, g, q]
    if system == "ablate_differentiation":
        m, i, g, q = state
        return [
            tanh(0.85 * m + 0.10 * i),
            tanh(0.84 * i + 0.10 * m),
            0.18 * g,
            0.15 * q,
        ]
    if system == "ablate_legibility":
        return step("positive_continuous", state, mode, label, t, rng)
    if system == "positive_discrete":
        u_m = 1 if (mode == "sham" and t >= HALF) else 0
        u_g = (-3 if label == 1 else 3) if (mode == "critical" and t >= HALF) else 0
        u_q = (-6 if label == 1 else 6) if (mode == "critical" and t >= HALF) else 0
        m, i, g, q = state
        target = [
            2 * m + i + g + u_m,
            m + 2 * i + g + q,
            i + 2 * g + q + u_g,
            g + 2 * q + m + u_q,
        ]
        return [discrete_step_one(c, y) for c, y in zip(state, target)]
    if system == "complexity_negative":
        nxt = []
        for i in range(12):
            s = 0.0
            for j in range(12):
                s += NEG_W[i][j] * state[j]
            if mode == "critical" and t >= HALF and i < 4:
                s += -0.9 if label == 1 else 0.9
            if mode == "sham" and t >= HALF and i == 0:
                s += 0.03
            s += 0.18 * math.sin((t + 1) * (i + 1))
            nxt.append(tanh(s))
        return nxt
    raise ValueError(system)


def readout(system: str, state: list[float], t: int, rng: random.Random) -> list[float]:
    if system == "positive_continuous":
        m, i, g, q = state
        return [0.65 * m + 0.35 * i, q, 0.50 * g + 0.50 * q]
    if system == "ablate_persistence":
        m, i, g, q = state
        return [0.65 * m + 0.35 * i, q, 0.50 * g + 0.50 * q]
    if system == "ablate_identity":
        m, i, g, q = state
        merged = abs(m) + abs(i) + abs(g) + abs(q)
        return [0.25 * merged, 0.10 * merged, 0.20 * merged]
    if system == "ablate_integration":
        m, i, g, q = state
        return [0.65 * m + 0.35 * i, q, 0.50 * g + 0.50 * q]
    if system == "ablate_continuity":
        m, i, g, q = state
        return [0.65 * m + 0.35 * i, q, 0.50 * g + 0.50 * q]
    if system == "ablate_differentiation":
        m, i, g, q = state
        return [0.65 * m + 0.35 * i, 0.0, 0.10 * g]
    if system == "ablate_legibility":
        m, i, g, q = state
        return [
            0.04 * (m + i),
            0.0,
            0.04 * (g + q),
        ]
    if system == "positive_discrete":
        m, i, g, q = state
        return [(0.65 * m + 0.35 * i) / 2.0, q / 2.0, (0.50 * g + 0.50 * q) / 2.0]
    if system == "complexity_negative":
        x0, x1, x2 = state[0], state[1], state[2]
        return [
            x0 + 0.65 * math.sin(3 * t),
            x1 + 0.55 * math.sin(5 * t),
            x2 + 0.60 * math.sin(7 * t),
        ]
    raise ValueError(system)


def support_radius(system: str) -> float:
    if system == "positive_discrete":
        return DISC_SUPPORT_RADIUS
    if system == "complexity_negative":
        return NEG_SUPPORT_RADIUS
    return CONT_SUPPORT_RADIUS


def connectivity_density(system: str) -> float:
    if system in {"positive_continuous", "ablate_persistence", "ablate_identity", "ablate_continuity", "ablate_differentiation", "ablate_legibility"}:
        return 0.75
    if system == "ablate_integration":
        return 0.25
    if system == "positive_discrete":
        return 0.75
    if system == "complexity_negative":
        return 11.0 / 12.0
    raise ValueError(system)


def simulate(system: str, mode: str = "normal") -> list[dict]:
    runs = []
    for seed in SEEDS:
        for label in (0, 1):
            for replica in range(REPLICAS_PER_CLASS):
                rng = random.Random(seed * 100 + label * 10 + replica)
                state = initial_state(system, label, rng)
                states = [list(state)]
                readouts = []
                for t in range(HORIZON):
                    readouts.append(readout(system, state, t, rng))
                    state = step(system, state, mode, label, t, rng)
                    states.append(list(state))
                runs.append(
                    {
                        "seed": seed,
                        "label": label,
                        "replica": replica,
                        "states": states,
                        "readouts": readouts,
                    }
                )
    return runs


def embed(readouts: list[list[float]]) -> list[float]:
    if not readouts:
        return [0.0, 0.0, 0.0]
    tail_start = len(readouts) // 2
    tail = readouts[tail_start:]
    return mean_vec(tail)


def decode(readouts: list[list[float]]) -> int:
    return 1 if embed(readouts)[1] >= 0 else 0


def add_noise(readouts: list[list[float]], seed: int) -> list[list[float]]:
    rng = random.Random(seed)
    noisy = []
    for r in readouts:
        noisy.append([v + rng.uniform(-0.08, 0.08) for v in r])
    return noisy


def compress_history(readouts: list[list[float]]) -> list[list[float]]:
    return readouts[::2] if len(readouts) > 1 else readouts


def activity_entropy(readouts: list[list[float]]) -> float:
    bins = {}
    total = 0
    for r in readouts:
        key = tuple(int((clamp(v, -1.5, 1.5) + 1.5) * 4) for v in r)
        bins[key] = bins.get(key, 0) + 1
        total += 1
    ent = 0.0
    for count in bins.values():
        p = count / total
        ent -= p * math.log(p + 1e-12, 2)
    return ent


def evaluate_system(system: str) -> dict:
    normal = simulate(system, "normal")
    critical = simulate(system, "critical")
    sham = simulate(system, "sham")

    all_states = [state for run in normal for state in run["states"]]
    support_margin = min(
        min(vec_norm(state) - COLLAPSE_RADIUS, support_radius(system) - vec_norm(state))
        for state in all_states
    )

    embeddings = [embed(run["readouts"]) for run in normal]
    by_label = {0: [], 1: []}
    for run, emb in zip(normal, embeddings):
        by_label[run["label"]].append(emb)
    centroids = {label: mean_vec(vs) for label, vs in by_label.items()}
    inter = vec_dist(centroids[0], centroids[1])
    within = max(vec_dist(emb, centroids[label]) for label, embs in by_label.items() for emb in embs)
    rigidity_gap = inter - within

    sample_states = [run["states"][t] for run in normal[: min(12, len(normal))] for t in range(0, HORIZON, 6)]
    integration_raw = mean(
        vec_dist(step(system, s, "normal", 1, 0, random.Random(0)), factorized_step(system, s, "normal", 1, 0))
        for s in sample_states
    )
    integration_gap = integration_raw - INTEGRATION_RESOLUTION_FLOOR

    jumps = [vec_dist(r2, r1) for run in normal for r1, r2 in zip(run["readouts"], run["readouts"][1:])]
    continuity_gap = CONTINUITY_JUMP_CEILING - quantile(jumps, 0.95)

    mean_abs_second = mean(abs(emb[1]) for emb in embeddings)
    differentiation_gap = min(inter - DIFF_SEPARATION_FLOOR, mean_abs_second - NON_NULL_FLOOR)

    clean_acc = mean(1.0 if decode(run["readouts"]) == run["label"] else 0.0 for run in normal)
    noisy_acc = mean(
        1.0 if decode(add_noise(run["readouts"], run["seed"] * 1000 + run["replica"])) == run["label"] else 0.0
        for run in normal
    )
    compression_acc = mean(1.0 if decode(compress_history(run["readouts"])) == run["label"] else 0.0 for run in normal)
    critical_shift_rate = mean(1.0 if decode(run["readouts"]) != run["label"] else 0.0 for run in critical)
    sham_fpr = mean(1.0 if decode(run["readouts"]) != run["label"] else 0.0 for run in sham)
    legibility_gap = min(
        clean_acc - LEG_THRESHOLDS["clean_acc"],
        noisy_acc - LEG_THRESHOLDS["noisy_acc"],
        critical_shift_rate - LEG_THRESHOLDS["critical_shift"],
        LEG_THRESHOLDS["sham_fpr"] - sham_fpr,
        compression_acc - LEG_THRESHOLDS["compression_acc"],
    )

    invariant_margins = {
        "I_per": round(support_margin, 6),
        "I_ri": round(rigidity_gap, 6),
        "I_int": round(integration_gap, 6),
        "I_cont": round(continuity_gap, 6),
        "I_diff": round(differentiation_gap, 6),
        "I_leg": round(legibility_gap, 6),
    }
    pass_flags = {k: v > 0 for k, v in invariant_margins.items()}
    consciousness_op_pass = all(pass_flags.values())
    q_op_non_empty = consciousness_op_pass and inter > 0.0 and clean_acc > LEG_THRESHOLDS["clean_acc"]

    return {
        "system": system,
        "substrate": "continuous" if "continuous" in system or system.startswith("ablate") else ("discrete" if system == "positive_discrete" else "dense_control"),
        "connectivity_density": round(connectivity_density(system), 6),
        "activity_entropy": round(activity_entropy([r for run in normal for r in run["readouts"]]), 6),
        "invariant_margins": invariant_margins,
        "pass_flags": pass_flags,
        "clean_acc": round(clean_acc, 6),
        "noisy_acc": round(noisy_acc, 6),
        "compression_acc": round(compression_acc, 6),
        "critical_shift_rate": round(critical_shift_rate, 6),
        "sham_fpr": round(sham_fpr, 6),
        "class_separation": round(inter, 6),
        "within_class_radius": round(within, 6),
        "integration_raw": round(integration_raw, 6),
        "p95_jump": round(quantile(jumps, 0.95), 6),
        "mean_abs_second": round(mean_abs_second, 6),
        "consciousness_op_pass": consciousness_op_pass,
        "q_op_non_empty": q_op_non_empty,
        "normal_signature": class_signature(normal),
        "critical_signature": class_signature(critical),
        "sham_signature": class_signature(sham),
    }


def class_signature(runs: list[dict]) -> dict:
    out = {"label0_to_0": 0, "label0_to_1": 0, "label1_to_0": 0, "label1_to_1": 0}
    for run in runs:
        pred = decode(run["readouts"])
        key = f"label{run['label']}_to_{pred}"
        out[key] += 1
    return out


def decide_test1(neg: dict) -> tuple[str, str]:
    if not neg["consciousness_op_pass"] and neg["connectivity_density"] >= 0.85 and neg["activity_entropy"] >= 2.0:
        why = (
            f"negative control stayed superficially rich (density={neg['connectivity_density']}, entropy={neg['activity_entropy']}) "
            f"but failed certification because margins {neg['invariant_margins']} do not preserve the full invariant set"
        )
        return "PASS", why
    if neg["consciousness_op_pass"]:
        return "FAIL", "negative control passed Consciousness_op despite violating the intended invariant package"
    return "AMBIGUOUS", "negative control failed certification, but the superficial richness/connectivity profile was not strong enough to make the protection claim decisive"


def decide_ablation(result: dict, target: str) -> tuple[str, str]:
    target_failed = not result["pass_flags"][target]
    global_failed = not result["consciousness_op_pass"]
    if target_failed and global_failed:
        return "PASS", f"targeted ablation broke {target} and the candidate exited Consciousness_op"
    if target_failed and not global_failed:
        return "AMBIGUOUS", f"{target} failed but the global class verdict did not drop"
    if (not target_failed) and global_failed:
        return "AMBIGUOUS", f"candidate failed globally, but the targeted invariant {target} did not localize as failed"
    return "FAIL", f"ablation left {target} positive and did not eject the candidate from Consciousness_op"


def decide_test3(a: dict, b: dict) -> tuple[str, str]:
    if a["consciousness_op_pass"] and b["consciousness_op_pass"]:
        same_signatures = (
            a["normal_signature"] == b["normal_signature"]
            and a["critical_signature"] == b["critical_signature"]
            and a["sham_signature"] == b["sham_signature"]
        )
        same_invariants = all(a["pass_flags"][k] and b["pass_flags"][k] for k in INVARIANTS)
        if same_signatures and same_invariants:
            return "PASS", "both substrates preserved all six invariants and matched the same operational class-transition signature under normal, critical, and sham interventions"
        return "AMBIGUOUS", "both substrates certified, but the class-transition signatures were not identical enough for a clean cycle-1 equivalence verdict"
    if (not a["consciousness_op_pass"]) or (not b["consciousness_op_pass"]):
        return "FAIL", "at least one substrate realization failed certification, so substrate invariance could not be sustained"
    return "AMBIGUOUS", "cross-substrate evidence is mixed"


def write_md(path: Path, text: str) -> None:
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)


def main() -> None:
    plan_path = OUT / "cycle1_experimental_plan.md"
    results_path = OUT / "cycle1_results_ledger.csv"
    failure_path = OUT / "cycle1_failure_analysis.md"
    summary_path = OUT / "cycle1_decision_summary.json"
    raw_path = OUT / "cycle1_raw_metrics.json"

    positive = evaluate_system("positive_continuous")
    negative = evaluate_system("complexity_negative")
    discrete = evaluate_system("positive_discrete")
    ablations = {
        "I_per": evaluate_system("ablate_persistence"),
        "I_ri": evaluate_system("ablate_identity"),
        "I_int": evaluate_system("ablate_integration"),
        "I_cont": evaluate_system("ablate_continuity"),
        "I_diff": evaluate_system("ablate_differentiation"),
        "I_leg": evaluate_system("ablate_legibility"),
    }

    test1_decision, test1_why = decide_test1(negative)
    ablation_rows = []
    ablation_decisions = []
    for inv, result in ablations.items():
        decision, why = decide_ablation(result, inv)
        ablation_decisions.append(decision)
        ablation_rows.append(
            {
                "test_id": f"TEST2_{inv}",
                "target_claims": "P5-01; P5-04",
                "target_invariants": inv,
                "prediction": f"Removing {inv} should break certification or produce an explicit rupture",
                "observed_result": f"margins={json.dumps(result['invariant_margins'], ensure_ascii=False)}; pass={result['consciousness_op_pass']}",
                "decision": decision,
                "why": why,
            }
        )

    if all(d == "PASS" for d in ablation_decisions):
        test2_status = "PASS"
    elif any(d == "FAIL" for d in ablation_decisions):
        test2_status = "FAIL"
    else:
        test2_status = "AMBIGUOUS"

    test3_decision, test3_why = decide_test3(positive, discrete)

    results_rows = [
        {
            "test_id": "TEST1_COMPLEXITY_NEGATIVE",
            "target_claims": "P5-05; NC-02",
            "target_invariants": "I_ri; I_cont; I_leg",
            "prediction": "High complexity/connectivity without the invariant package must not certify as Consciousness_op",
            "observed_result": f"density={negative['connectivity_density']}; entropy={negative['activity_entropy']}; margins={json.dumps(negative['invariant_margins'], ensure_ascii=False)}; pass={negative['consciousness_op_pass']}",
            "decision": test1_decision,
            "why": test1_why,
        }
    ] + ablation_rows + [
        {
            "test_id": "TEST3_CROSS_SUBSTRATE_EQUIVALENCE",
            "target_claims": "P5-02; P5-06",
            "target_invariants": "I_per; I_ri; I_int; I_cont; I_diff; I_leg",
            "prediction": "Different substrates preserving the invariant package should remain in the same operational class relevant to cycle 1",
            "observed_result": f"continuous_pass={positive['consciousness_op_pass']}; discrete_pass={discrete['consciousness_op_pass']}; continuous_sig={json.dumps(positive['normal_signature'])}; discrete_sig={json.dumps(discrete['normal_signature'])}",
            "decision": test3_decision,
            "why": test3_why,
        }
    ]

    plan_text = f"""# Cycle 1 Experimental Plan\n\n## Scope\nCycle 1 executes only the three highest-value tests from the frozen scientific ledger:\n\n1. negative control against brute complexity/connectivity\n2. ablation ladder over the six critical invariants\n3. cross-substrate equivalence\n\nThe frozen canon is not modified. This cycle operationalizes Paper V for minimal differential testing.\n\n## Fixed Inputs\n- frozen canon: `canonical_freeze_record.md`\n- claim registry: `claim_matrix.csv`\n- prediction registry: `prediction_matrix.csv`\n- falsification registry: `falsification_matrix.csv`\n- reproducibility rule: `reproducibility_protocol.md`\n\n## Seeds\n`{SEEDS}`\n\n## Experimental Thresholds\nThese are cycle-1 operational thresholds. They are not doctrine updates.\n\n- support/collapse: support radius per system, collapse radius = `{COLLAPSE_RADIUS}`\n- integration resolution floor = `{INTEGRATION_RESOLUTION_FLOOR}`\n- continuity p95 jump ceiling = `{CONTINUITY_JUMP_CEILING}`\n- differentiation floors:\n  - class separation > `{DIFF_SEPARATION_FLOOR}`\n  - mean non-null readout > `{NON_NULL_FLOOR}`\n- legibility thresholds:\n  - clean decoder accuracy >= `{LEG_THRESHOLDS['clean_acc']}`\n  - noisy decoder accuracy >= `{LEG_THRESHOLDS['noisy_acc']}`\n  - critical intervention shift rate >= `{LEG_THRESHOLDS['critical_shift']}`\n  - sham false-positive rate <= `{LEG_THRESHOLDS['sham_fpr']}`\n  - compression accuracy >= `{LEG_THRESHOLDS['compression_acc']}`\n\n## Systems Used\n- positive candidate A: `positive_continuous`\n- positive candidate B: `positive_discrete`\n- negative control: `complexity_negative`\n- ablation variants: `ablate_persistence`, `ablate_identity`, `ablate_integration`, `ablate_continuity`, `ablate_differentiation`, `ablate_legibility`\n\n## Test 1\nThe control system is deliberately dense and activity-rich, but it is allowed to fail rigidity, continuity, and legibility.\n\n## Test 2\nEach ablation starts from the positive continuous candidate and degrades one target invariant while leaving the rest of the setup comparable.\n\n## Test 3\nThe continuous and discrete positive systems are treated as different substrates. Cycle 1 asks whether they preserve the same operational class signature under normal, critical, and sham intervention panels.\n"""

    failure_lines = [
        "# Cycle 1 Failure Analysis",
        "",
        "## Test 1",
        f"- decision: `{test1_decision}`",
        f"- why: {test1_why}",
        "",
        "## Test 2",
        f"- overall decision: `{test2_status}`",
    ]
    for inv, result in ablations.items():
        row = next(r for r in ablation_rows if r["target_invariants"] == inv)
        failure_lines.extend(
            [
                f"### {inv}",
                f"- decision: `{row['decision']}`",
                f"- why: {row['why']}",
                f"- margins: `{json.dumps(result['invariant_margins'], ensure_ascii=False)}`",
                "",
            ]
        )
    failure_lines.extend(
        [
            "## Test 3",
            f"- decision: `{test3_decision}`",
            f"- why: {test3_why}",
            f"- continuous margins: `{json.dumps(positive['invariant_margins'], ensure_ascii=False)}`",
            f"- discrete margins: `{json.dumps(discrete['invariant_margins'], ensure_ascii=False)}`",
            "",
            "## Main Weakening / Strengthening Signals",
            f"- complexity-only protection: `{test1_decision}`",
            f"- invariant criticality ladder: `{test2_status}`",
            f"- substrate equivalence (cycle-1 proxy): `{test3_decision}`",
        ]
    )

    main_failures = []
    main_strengthened = []
    main_weakened = []
    if test1_decision != "PASS":
        main_failures.append("complexity-negative control did not cleanly stay outside Consciousness_op")
        main_weakened.append("P5-05")
    else:
        main_strengthened.extend(["P5-05", "NC-02"])
    if test2_status != "PASS":
        main_failures.append("one or more ablations did not cleanly localize invariant loss")
        main_weakened.extend(["P5-01", "P5-04"])
    else:
        main_strengthened.extend(["P5-01", "P5-04"])
    if test3_decision == "FAIL":
        main_failures.append("cross-substrate equivalence failed under cycle-1 operational signature check")
        main_weakened.extend(["P5-02", "P5-06"])
    elif test3_decision == "AMBIGUOUS":
        main_failures.append("cross-substrate equivalence remains provisional under the cycle-1 proxy")
    else:
        main_strengthened.extend(["P5-02", "P5-06"])

    summary = {
        "status": "PASS",
        "cycle": "cycle1_minimum",
        "tests_executed": 3,
        "test1_status": test1_decision,
        "test2_status": test2_status,
        "test3_status": test3_decision,
        "thresholds": {
            "collapse_radius": COLLAPSE_RADIUS,
            "integration_resolution_floor": INTEGRATION_RESOLUTION_FLOOR,
            "continuity_jump_ceiling": CONTINUITY_JUMP_CEILING,
            "differentiation_separation_floor": DIFF_SEPARATION_FLOOR,
            "non_null_floor": NON_NULL_FLOOR,
            "legibility": LEG_THRESHOLDS,
        },
        "seeds": SEEDS,
        "systems": {
            "positive_continuous": positive,
            "positive_discrete": discrete,
            "complexity_negative": negative,
            "ablations": ablations,
        },
        "main_failures_detected": main_failures,
        "main_claims_strengthened": sorted(set(main_strengthened)),
        "main_claims_weakened": sorted(set(main_weakened)),
        "artifacts_generated": [
            str(plan_path.relative_to(BASE)).replace("\\", "/"),
            str(results_path.relative_to(BASE)).replace("\\", "/"),
            str(failure_path.relative_to(BASE)).replace("\\", "/"),
            str(summary_path.relative_to(BASE)).replace("\\", "/"),
            str(raw_path.relative_to(BASE)).replace("\\", "/"),
        ],
        "ready_for_cycle2": test1_decision == "PASS" and test2_status == "PASS",
    }

    write_md(plan_path, plan_text)
    write_md(failure_path, "\n".join(failure_lines))
    write_csv(
        results_path,
        results_rows,
        ["test_id", "target_claims", "target_invariants", "prediction", "observed_result", "decision", "why"],
    )
    summary_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
    raw_path.write_text(json.dumps({"positive": positive, "discrete": discrete, "negative": negative, "ablations": ablations}, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps(
        {
            "status": summary["status"],
            "tests_executed": summary["tests_executed"],
            "test1_status": summary["test1_status"],
            "test2_status": summary["test2_status"],
            "test3_status": summary["test3_status"],
            "ready_for_cycle2": summary["ready_for_cycle2"],
        },
        indent=2,
        ensure_ascii=False,
    ))


if __name__ == "__main__":
    main()
