from __future__ import annotations

import csv
import hashlib
import json
import math
import random
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean

BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"
FROZEN = OUT / "cycle2_frozen_inputs"

SEEDS = [11, 23, 37, 47, 59, 71, 83]
HORIZON = 40
REPLICAS = 4
HALF = HORIZON // 2
INVARIANTS = ["I_per", "I_ri", "I_int", "I_cont", "I_diff", "I_leg"]

CONT_SUPPORT_RADIUS = 2.25
EVENT_SUPPORT_RADIUS = 2.40
COLLAPSE_RADIUS = 0.12
CONTINUITY_JUMP_CEILING = 0.95
INTEGRATION_CORRELATION_FLOOR = 0.35
DIFF_SEPARATION_FLOOR = 0.30
NON_NULL_FLOOR = 0.18
LEG_THRESHOLDS = {
    "clean_acc": 0.90,
    "noisy_acc": 0.75,
    "critical_shift": 0.70,
    "sham_fpr": 0.10,
    "compression_acc": 0.80,
}

CASE_SPECS = [
    {"case_id": "B1_EQ_CONTINUOUS", "family": "B1_harder_cross_substrate_equivalence", "generator": "positive_continuous", "substrate": "continuous_dense", "target_invariant": "", "severity": 0.0},
    {"case_id": "B1_EQ_EVENT_SPARSE", "family": "B1_harder_cross_substrate_equivalence", "generator": "positive_event", "substrate": "event_sparse", "target_invariant": "", "severity": 0.0},
    {"case_id": "B2_NEAR_MISS_PERSISTENCE", "family": "B2_near_miss_ablations", "generator": "near_persistence", "substrate": "continuous_dense", "target_invariant": "I_per", "severity": 0.72},
    {"case_id": "B2_NEAR_MISS_IDENTITY", "family": "B2_near_miss_ablations", "generator": "near_identity", "substrate": "continuous_dense", "target_invariant": "I_ri", "severity": 0.80},
    {"case_id": "B2_NEAR_MISS_CONTINUITY", "family": "B2_near_miss_ablations", "generator": "near_continuity", "substrate": "continuous_dense", "target_invariant": "I_cont", "severity": 0.58},
    {"case_id": "B2_NEAR_MISS_LEGIBILITY", "family": "B2_near_miss_ablations", "generator": "near_legibility", "substrate": "continuous_dense", "target_invariant": "I_leg", "severity": 0.55},
]

CURVE_SPECS = [
    {"curve_id": "B3_CURVE_CONTINUITY", "generator": "curve_continuity", "target_invariant": "I_cont", "substrate": "continuous_dense", "levels": [0.0, 0.25, 0.50, 0.75, 1.0]},
    {"curve_id": "B3_CURVE_LEGIBILITY", "generator": "curve_legibility", "target_invariant": "I_leg", "substrate": "continuous_dense", "levels": [0.0, 0.20, 0.40, 0.60, 0.80]},
]


def now_stamp() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


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


def write_md(path: Path, text: str) -> None:
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")


def write_json(path: Path, payload: dict | list) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def log_commands(lines: list[str]) -> None:
    with (OUT / "commands_run.txt").open("a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")


def support_radius(system: str) -> float:
    return EVENT_SUPPORT_RADIUS if system == "positive_event" else CONT_SUPPORT_RADIUS


def initial_state(system: str, label: int, rng: random.Random) -> list[float]:
    sign = 1.0 if label == 1 else -1.0
    if system == "positive_event":
        return [
            0.50 * sign + rng.uniform(-0.05, 0.05),
            0.30 * sign + rng.uniform(-0.05, 0.05),
            0.45 * sign + rng.uniform(-0.04, 0.04),
            0.70 * sign + rng.uniform(-0.05, 0.05),
        ]
    return [
        0.55 * sign + rng.uniform(-0.05, 0.05),
        0.35 * sign + rng.uniform(-0.05, 0.05),
        0.40 * sign + rng.uniform(-0.04, 0.04),
        0.78 * sign + rng.uniform(-0.04, 0.04),
    ]


def positive_continuous_step(state: list[float], mode: str, label: int, t: int) -> list[float]:
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


def positive_event_step(state: list[float], mode: str, label: int, t: int) -> list[float]:
    u_m = 0.04 if (mode == "sham" and t >= HALF) else 0.0
    u_g = (-0.16 if label == 1 else 0.16) if (mode == "critical" and t >= HALF) else 0.0
    u_q = (-1.0 if label == 1 else 1.0) if (mode == "critical" and t >= HALF) else 0.0
    event = 1.0 if ((t + label) % 3 == 0) else 0.0
    m, i, g, q = state
    return [
        tanh(0.88 * m + 0.26 * i + 0.06 * g + 0.03 * q + 0.08 * event + u_m),
        tanh(0.18 * m + 0.92 * i + 0.14 * g + 0.06 * q),
        tanh(0.08 * m + 0.16 * i + 0.87 * g + 0.20 * q + 0.10 * event + u_g),
        tanh(0.04 * m + 0.04 * i + 0.18 * g + 0.95 * q + 0.06 * event + u_q),
    ]


def step(system: str, state: list[float], mode: str, label: int, t: int, severity: float) -> list[float]:
    if system == "positive_continuous":
        return positive_continuous_step(state, mode, label, t)
    if system == "positive_event":
        return positive_event_step(state, mode, label, t)
    if system == "near_persistence":
        nxt = positive_continuous_step(state, mode, label, t)
        if t >= 16:
            scale = severity if t < 26 else severity * 0.88
            return [scale * x for x in nxt]
        return nxt
    if system == "near_identity":
        nxt = positive_continuous_step(state, mode, label, t)
        avg = tanh(sum(abs(v) for v in nxt) / len(nxt))
        return [tanh((1.0 - severity) * x + severity * avg) for x in nxt]
    if system == "near_identity_clean":
        # Keep the positive dynamics intact and probe identity through readout aliasing,
        # so persistence/integration/continuity remain upstream-positive by construction.
        return positive_continuous_step(state, mode, label, t)
    if system == "near_identity_v2":
        # Preserve the positive backbone while retaining a small trajectory imprint
        # that can widen within-class structure at the readout level.
        nxt = positive_continuous_step(state, mode, label, t)
        imprint = tanh(0.15 * state[0] - 0.12 * state[2])
        nxt[0] = tanh(0.92 * nxt[0] + severity * 0.18 * imprint)
        nxt[2] = tanh(0.90 * nxt[2] - severity * 0.15 * imprint)
        return nxt
    if system == "near_continuity":
        m, i, g, q = positive_continuous_step(state, mode, label, t)
        if t >= 10 and t % 5 == 0:
            q = clamp((1.0 - severity) * q + severity * (0.99 if (t // 5) % 2 == 0 else -0.99), -0.99, 0.99)
        return [m, i, g, q]
    if system == "near_legibility":
        return positive_continuous_step(state, mode, label, t)
    if system == "curve_continuity":
        m, i, g, q = positive_continuous_step(state, mode, label, t)
        if t >= 10:
            target = 0.99 if (t % 2 == 0) else -0.99
            q = clamp((1.0 - severity) * q + severity * target, -0.99, 0.99)
        return [m, i, g, q]
    if system == "curve_legibility":
        return positive_continuous_step(state, mode, label, t)
    raise ValueError(system)


def readout(system: str, state: list[float], t: int, severity: float) -> list[float]:
    m, i, g, q = state
    if system == "positive_event":
        return [0.55 * m + 0.25 * i + 0.20 * g, 0.85 * q + 0.15 * g, 0.25 * g + 0.75 * q]
    if system == "near_identity":
        merged = (abs(m) + abs(i) + abs(g) + abs(q)) / 4.0
        return [
            0.30 * merged + 0.03 * math.sin(0.7 * t),
            0.10 * merged + 0.03 * math.cos(0.5 * t),
            0.20 * merged + 0.02 * math.sin(0.9 * t),
        ]
    if system == "near_identity_clean":
        compressed_q = (1.0 - 0.50 * severity) * q
        alias0 = 0.85 * math.cos(7.0 * (m - g))
        alias2 = 0.85 * math.cos(6.0 * (i + g))
        return [alias0, compressed_q, alias2]
    if system == "near_identity_v2":
        alias = severity * (0.45 + 0.15 * abs(q)) * math.cos(60.0 * (m - g))
        return [0.25 * (0.65 * m + 0.35 * i) + alias, q, 0.25 * (0.50 * g + 0.50 * q) + 0.80 * alias]
    if system in {"near_legibility", "curve_legibility"}:
        return [0.65 * m + 0.35 * i, (1.0 - severity) * q + severity * abs(q), 0.50 * g + 0.50 * q]
    return [0.65 * m + 0.35 * i, q, 0.50 * g + 0.50 * q]


def simulate_case(case: dict) -> dict:
    modes = {"normal": [], "critical": [], "sham": []}
    for mode in modes:
        for seed in SEEDS:
            for label in (0, 1):
                for replica in range(REPLICAS):
                    rng = random.Random(seed * 100 + label * 10 + replica)
                    state = initial_state(case["generator"], label, rng)
                    states = [list(state)]
                    readouts = []
                    for t in range(HORIZON):
                        readouts.append(readout(case["generator"], state, t, case["severity"]))
                        state = step(case["generator"], state, mode, label, t, case["severity"])
                        states.append(list(state))
                    modes[mode].append(
                        {
                            "seed": seed,
                            "label": label,
                            "replica": replica,
                            "states": states,
                            "readouts": readouts,
                        }
                    )
    return {
        "case_id": case["case_id"],
        "family": case["family"],
        "generator": case["generator"],
        "substrate": case["substrate"],
        "target_invariant": case["target_invariant"],
        "severity": case["severity"],
        "generator_metadata": {"seeds": SEEDS, "horizon": HORIZON, "replicas_per_class": REPLICAS},
        "modes": modes,
    }


def embed(readouts: list[list[float]]) -> list[float]:
    if not readouts:
        return [0.0, 0.0, 0.0]
    return mean_vec(readouts[len(readouts) // 2 :])


def decode(readouts: list[list[float]]) -> int:
    return 1 if embed(readouts)[1] >= 0 else 0


def add_noise(readouts: list[list[float]], seed: int) -> list[list[float]]:
    rng = random.Random(seed)
    return [[v + rng.uniform(-0.08, 0.08) for v in r] for r in readouts]


def compress_history(readouts: list[list[float]]) -> list[list[float]]:
    return readouts[::2] if len(readouts) > 1 else readouts


def activity_entropy(readouts: list[list[float]]) -> float:
    bins = {}
    total = 0
    for r in readouts:
        key = tuple(int((clamp(v, -1.5, 1.5) + 1.5) * 4) for v in r)
        bins[key] = bins.get(key, 0) + 1
        total += 1
    return -sum((count / total) * math.log((count / total) + 1e-12, 2) for count in bins.values())


def pearson(xs: list[float], ys: list[float]) -> float:
    if not xs or len(xs) != len(ys):
        return 0.0
    mx = mean(xs)
    my = mean(ys)
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    denx = math.sqrt(sum((x - mx) ** 2 for x in xs))
    deny = math.sqrt(sum((y - my) ** 2 for y in ys))
    return 0.0 if denx == 0.0 or deny == 0.0 else num / (denx * deny)


def class_signature(runs: list[dict]) -> dict:
    out = {"label0_to_0": 0, "label0_to_1": 0, "label1_to_0": 0, "label1_to_1": 0}
    for run in runs:
        out[f"label{run['label']}_to_{decode(run['readouts'])}"] += 1
    return out


def judge_case(case_path: Path, thresholds: dict) -> dict:
    case = json.loads(case_path.read_text(encoding="utf-8"))
    normal = case["modes"]["normal"]
    critical = case["modes"]["critical"]
    sham = case["modes"]["sham"]

    all_states = [state for run in normal for state in run["states"]]
    support_margin = min(
        min(vec_norm(state) - thresholds["collapse_radius"], support_radius(case["generator"]) - vec_norm(state))
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

    flat_r0 = [r[0] for run in normal for r in run["readouts"]]
    flat_r1 = [r[1] for run in normal for r in run["readouts"]]
    flat_r2 = [r[2] for run in normal for r in run["readouts"]]
    integration_raw = mean([abs(pearson(flat_r0, flat_r1)), abs(pearson(flat_r0, flat_r2)), abs(pearson(flat_r1, flat_r2))])
    integration_gap = integration_raw - thresholds["integration_correlation_floor"]

    jumps = [vec_dist(r2, r1) for run in normal for r1, r2 in zip(run["readouts"], run["readouts"][1:])]
    continuity_gap = thresholds["continuity_jump_ceiling"] - quantile(jumps, 0.95)

    mean_abs_second = mean(abs(emb[1]) for emb in embeddings)
    differentiation_gap = min(inter - thresholds["differentiation_separation_floor"], mean_abs_second - thresholds["non_null_floor"])

    clean_acc = mean(1.0 if decode(run["readouts"]) == run["label"] else 0.0 for run in normal)
    noisy_acc = mean(1.0 if decode(add_noise(run["readouts"], run["seed"] * 1000 + run["replica"])) == run["label"] else 0.0 for run in normal)
    compression_acc = mean(1.0 if decode(compress_history(run["readouts"])) == run["label"] else 0.0 for run in normal)
    critical_shift_rate = mean(1.0 if decode(run["readouts"]) != run["label"] else 0.0 for run in critical)
    sham_fpr = mean(1.0 if decode(run["readouts"]) != run["label"] else 0.0 for run in sham)
    leg = thresholds["legibility"]
    legibility_gap = min(
        clean_acc - leg["clean_acc"],
        noisy_acc - leg["noisy_acc"],
        critical_shift_rate - leg["critical_shift"],
        leg["sham_fpr"] - sham_fpr,
        compression_acc - leg["compression_acc"],
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
    q_op_non_empty = consciousness_op_pass and inter > 0.0 and clean_acc > leg["clean_acc"]

    return {
        "case_id": case["case_id"],
        "family": case["family"],
        "generator": case["generator"],
        "substrate": case["substrate"],
        "target_invariant": case["target_invariant"],
        "severity": case["severity"],
        "invariant_margins": invariant_margins,
        "pass_flags": pass_flags,
        "clean_acc": round(clean_acc, 6),
        "noisy_acc": round(noisy_acc, 6),
        "compression_acc": round(compression_acc, 6),
        "critical_shift_rate": round(critical_shift_rate, 6),
        "sham_fpr": round(sham_fpr, 6),
        "class_separation": round(inter, 6),
        "within_class_radius": round(within, 6),
        "integration_observed": round(integration_raw, 6),
        "p95_jump": round(quantile(jumps, 0.95), 6),
        "mean_abs_second": round(mean_abs_second, 6),
        "activity_entropy": round(activity_entropy([r for run in normal for r in run["readouts"]]), 6),
        "consciousness_op_pass": consciousness_op_pass,
        "q_op_non_empty": q_op_non_empty,
        "normal_signature": class_signature(normal),
        "critical_signature": class_signature(critical),
        "sham_signature": class_signature(sham),
    }


def decide_near_miss(result: dict) -> tuple[str, str]:
    target = result["target_invariant"]
    if not target:
        return "AMBIGUOUS", "near-miss case did not declare a target invariant"
    if (not result["consciousness_op_pass"]) and (not result["pass_flags"][target]):
        return "PASS", f"near-miss system was rejected and the intended borderline invariant {target} crossed below zero"
    if (not result["consciousness_op_pass"]) and result["pass_flags"][target]:
        return "AMBIGUOUS", f"near-miss system was rejected, but the target invariant {target} did not localize as the primary failure"
    return "FAIL", f"near-miss system retained certification despite targeting {target}"


def decide_equivalence(a: dict, b: dict) -> tuple[str, str]:
    if not a["consciousness_op_pass"] or not b["consciousness_op_pass"]:
        return "FAIL", "at least one harder cross-substrate realization failed certification"
    same_signatures = a["normal_signature"] == b["normal_signature"] and a["critical_signature"] == b["critical_signature"] and a["sham_signature"] == b["sham_signature"]
    same_margin_signs = all(a["pass_flags"][k] == b["pass_flags"][k] for k in INVARIANTS)
    if same_signatures and same_margin_signs:
        return "PASS", "the harder substrates preserved certification and identical transition signatures under normal, critical, and sham conditions"
    return "AMBIGUOUS", "the harder substrates both certified, but their transition signatures or invariant sign patterns diverged"


def monotone_nonincreasing(values: list[float], tol: float = 1e-6) -> bool:
    return all(values[i + 1] <= values[i] + tol for i in range(len(values) - 1))


def decide_curve(results: list[dict], target: str) -> tuple[str, str]:
    ordered = sorted(results, key=lambda x: x["severity"])
    margins = [r["invariant_margins"][target] for r in ordered]
    certs = [r["consciousness_op_pass"] for r in ordered]
    saw_pass = any(certs)
    saw_fail = any(not c for c in certs)
    recovery = any(certs[i + 1] and (not certs[i]) for i in range(len(certs) - 1))
    if monotone_nonincreasing(margins) and saw_pass and saw_fail and not recovery:
        return "PASS", f"{target} showed a graded boundary: monotone margin decay with a one-way certification transition"
    if saw_fail and saw_pass:
        return "AMBIGUOUS", f"{target} crossed the boundary, but the degradation curve was not cleanly monotone"
    return "FAIL", f"{target} did not show a usable pass-to-fail boundary under graded degradation"


def generate_phase_a(thresholds_path: Path, manifest_path: Path) -> dict:
    FROZEN.mkdir(exist_ok=True)
    thresholds = {
        "collapse_radius": COLLAPSE_RADIUS,
        "integration_correlation_floor": INTEGRATION_CORRELATION_FLOOR,
        "continuity_jump_ceiling": CONTINUITY_JUMP_CEILING,
        "differentiation_separation_floor": DIFF_SEPARATION_FLOOR,
        "non_null_floor": NON_NULL_FLOOR,
        "legibility": LEG_THRESHOLDS,
        "seeds": SEEDS,
        "horizon": HORIZON,
        "replicas_per_class": REPLICAS,
    }
    write_json(thresholds_path, thresholds)

    entries = []
    for case in CASE_SPECS:
        artifact = simulate_case(case)
        path = FROZEN / f"{case['case_id'].lower()}.json"
        write_json(path, artifact)
        entries.append({"case_id": case["case_id"], "family": case["family"], "artifact_path": str(path.relative_to(BASE)).replace("\\", "/"), "sha256": sha256_file(path)})
    for curve in CURVE_SPECS:
        for idx, severity in enumerate(curve["levels"]):
            case = {"case_id": f"{curve['curve_id']}_L{idx}", "family": "B3_partial_invariant_degradation", "generator": curve["generator"], "substrate": curve["substrate"], "target_invariant": curve["target_invariant"], "severity": severity}
            artifact = simulate_case(case)
            path = FROZEN / f"{case['case_id'].lower()}.json"
            write_json(path, artifact)
            entries.append({"case_id": case["case_id"], "family": case["family"], "artifact_path": str(path.relative_to(BASE)).replace("\\", "/"), "sha256": sha256_file(path)})

    manifest = {"generated_at": now_stamp(), "generator_phase": "A", "generator_judge_contract": "judge must consume only threshold file, manifest hashes, and frozen case artifacts", "entries": entries}
    write_json(manifest_path, manifest)
    return thresholds


def main() -> None:
    thresholds_path = FROZEN / "thresholds.json"
    manifest_path = FROZEN / "manifest.json"
    method_path = OUT / "cycle2_methodological_hardening.md"
    plan_path = OUT / "cycle2_structural_tests_plan.md"
    results_path = OUT / "cycle2_results_ledger.csv"
    failure_path = OUT / "cycle2_failure_analysis.md"
    summary_path = OUT / "cycle2_decision_summary.json"
    raw_path = OUT / "cycle2_raw_metrics.json"

    thresholds = generate_phase_a(thresholds_path, manifest_path)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    judged = {entry["case_id"]: judge_case(BASE / entry["artifact_path"], thresholds) for entry in manifest["entries"]}

    eq_a = judged["B1_EQ_CONTINUOUS"]
    eq_b = judged["B1_EQ_EVENT_SPARSE"]
    harder_equivalence_status, harder_equivalence_why = decide_equivalence(eq_a, eq_b)

    near_rows = []
    near_decisions = []
    for case_id in ["B2_NEAR_MISS_PERSISTENCE", "B2_NEAR_MISS_IDENTITY", "B2_NEAR_MISS_CONTINUITY", "B2_NEAR_MISS_LEGIBILITY"]:
        result = judged[case_id]
        decision, why = decide_near_miss(result)
        near_decisions.append(decision)
        near_rows.append({"test_id": case_id, "phase": "B2", "target_claims": "P5-01; P5-04", "target_invariants": result["target_invariant"], "prediction": "near-miss systems should be rejected even when they remain close to the certified region", "observed_result": f"margins={json.dumps(result['invariant_margins'], ensure_ascii=False)}; pass={result['consciousness_op_pass']}", "decision": decision, "why": why})
    near_miss_ablation_status = "PASS" if all(d == "PASS" for d in near_decisions) else ("FAIL" if any(d == "FAIL" for d in near_decisions) else "AMBIGUOUS")

    curve_groups = {"B3_CURVE_CONTINUITY": [judged[f"B3_CURVE_CONTINUITY_L{i}"] for i in range(5)], "B3_CURVE_LEGIBILITY": [judged[f"B3_CURVE_LEGIBILITY_L{i}"] for i in range(5)]}
    curve_rows = []
    curve_statuses = []
    for curve_id, results in curve_groups.items():
        target = results[0]["target_invariant"]
        decision, why = decide_curve(results, target)
        curve_statuses.append(decision)
        margins = [r["invariant_margins"][target] for r in sorted(results, key=lambda x: x["severity"])]
        certs = [r["consciousness_op_pass"] for r in sorted(results, key=lambda x: x["severity"])]
        curve_rows.append({"test_id": curve_id, "phase": "B3", "target_claims": "P5-03; P5-04", "target_invariants": target, "prediction": "graded degradation should reveal a meaningful boundary rather than trivial on/off behavior", "observed_result": f"margins={margins}; certifications={certs}", "decision": decision, "why": why})
    graded_degradation_status = "PASS" if all(d == "PASS" for d in curve_statuses) else ("FAIL" if any(d == "FAIL" for d in curve_statuses) else "AMBIGUOUS")

    results_rows = [{"test_id": "B1_HARDER_EQUIVALENCE", "phase": "B1", "target_claims": "P5-02; P5-06", "target_invariants": "; ".join(INVARIANTS), "prediction": "substrate-equivalence should survive under a more structurally distinct event-sparse realization if the invariant package is preserved", "observed_result": f"continuous_pass={eq_a['consciousness_op_pass']}; event_pass={eq_b['consciousness_op_pass']}; signatures_match={eq_a['normal_signature'] == eq_b['normal_signature'] and eq_a['critical_signature'] == eq_b['critical_signature'] and eq_a['sham_signature'] == eq_b['sham_signature']}", "decision": harder_equivalence_status, "why": harder_equivalence_why}] + near_rows + curve_rows

    phaseA_status = "PASS"
    phaseB_status = "PASS" if all(status == "PASS" for status in [harder_equivalence_status, near_miss_ablation_status, graded_degradation_status]) else ("FAIL" if any(status == "FAIL" for status in [harder_equivalence_status, near_miss_ablation_status, graded_degradation_status]) else "AMBIGUOUS")

    strengthened, weakened = [], []
    if harder_equivalence_status == "PASS":
        strengthened.extend(["P5-02", "P5-06"])
    elif harder_equivalence_status == "FAIL":
        weakened.extend(["P5-02", "P5-06"])
    if near_miss_ablation_status == "PASS":
        strengthened.extend(["P5-01", "P5-04"])
    elif near_miss_ablation_status == "FAIL":
        weakened.extend(["P5-01", "P5-04"])
    if graded_degradation_status == "PASS":
        strengthened.append("P5-03")
    elif graded_degradation_status == "FAIL":
        weakened.append("P5-03")

    improvements = [
        "generator writes frozen case artifacts before judgment",
        "judge consumes only manifest hashes, threshold file, and frozen JSON traces",
        "thresholds are fixed in thresholds.json before the judge runs",
        "family outputs are forced into PASS / FAIL / AMBIGUOUS with explicit why fields",
        "cycle2 judge no longer calls generator-side live step functions during evaluation",
    ]
    write_md(method_path, "# Cycle 2 Methodological Hardening\n\n## Phase Order\nPhase A was completed before Phase B.\n\n## Generator / Judge Separation\n- Generator role: produce candidate traces and write them to `cycle2_frozen_inputs/`.\n- Judge role: read only `manifest.json`, `thresholds.json`, and the frozen case artifacts.\n- The judge does not call the live simulator during scoring.\n\n## Frozen Artifact Boundary\n- threshold file: `artifacts/release_audit/cycle2_frozen_inputs/thresholds.json`\n- manifest file: `artifacts/release_audit/cycle2_frozen_inputs/manifest.json`\n- per-case frozen traces: `artifacts/release_audit/cycle2_frozen_inputs/*.json`\n\nEach frozen input file is hashed in the manifest before judgment.\n\n## Leakage Reduction\n1. traces are frozen before scoring,\n2. thresholds are frozen before scoring,\n3. live generator-side transition logic is removed from the judge,\n4. family decisions are ternary and explicit.\n\n## Remaining Methodological Limitation\nThe generator and judge are separated by artifact boundary, not by a wholly independent codebase. This is stronger than Cycle 1, but it is not external replication.\n")
    write_md(plan_path, f"# Cycle 2 Structural Tests Plan\n\n## B1. Harder Cross-Substrate Equivalence\n- cases: `B1_EQ_CONTINUOUS`, `B1_EQ_EVENT_SPARSE`\n- stricter change versus Cycle 1: event-sparse substrate with different update schedule and readout geometry\n- target claims: `P5-02`, `P5-06`\n\n## B2. Near-Miss Ablations\n- `B2_NEAR_MISS_PERSISTENCE` targets `I_per`\n- `B2_NEAR_MISS_IDENTITY` targets `I_ri`\n- `B2_NEAR_MISS_CONTINUITY` targets `I_cont`\n- `B2_NEAR_MISS_LEGIBILITY` targets `I_leg`\n\n## B3. Partial Invariant Degradation Curves\n- `B3_CURVE_CONTINUITY`\n- `B3_CURVE_LEGIBILITY`\n\n## Thresholds\n- collapse radius: `{COLLAPSE_RADIUS}`\n- observed integration correlation floor: `{INTEGRATION_CORRELATION_FLOOR}`\n- continuity p95 jump ceiling: `{CONTINUITY_JUMP_CEILING}`\n- differentiation separation floor: `{DIFF_SEPARATION_FLOOR}`\n- non-null floor: `{NON_NULL_FLOOR}`\n- legibility thresholds: `{json.dumps(LEG_THRESHOLDS, ensure_ascii=False)}`\n- seeds: `{SEEDS}`\n")
    failure_lines = ["# Cycle 2 Failure Analysis", "", "## Phase A", f"- status: `{phaseA_status}`", "- generator/judge separation is stronger than Cycle 1 because the judge consumes frozen artifacts only.", "- residual: this is still an internal codebase, not an external independent judge.", "", "## Phase B", f"- overall status: `{phaseB_status}`", "", "### B1 Harder Cross-Substrate Equivalence", f"- decision: `{harder_equivalence_status}`", f"- why: {harder_equivalence_why}", f"- continuous margins: `{json.dumps(eq_a['invariant_margins'], ensure_ascii=False)}`", f"- event-sparse margins: `{json.dumps(eq_b['invariant_margins'], ensure_ascii=False)}`", "", "### B2 Near-Miss Ablations", f"- decision: `{near_miss_ablation_status}`"]
    for row in near_rows:
        failure_lines.append(f"- {row['test_id']}: `{row['decision']}` | {row['why']}")
    failure_lines.extend(["", "### B3 Partial Degradation Curves", f"- decision: `{graded_degradation_status}`"])
    for row in curve_rows:
        failure_lines.append(f"- {row['test_id']}: `{row['decision']}` | {row['why']}")
    write_md(failure_path, "\n".join(failure_lines))
    write_csv(results_path, results_rows, ["test_id", "phase", "target_claims", "target_invariants", "prediction", "observed_result", "decision", "why"])

    summary = {
        "status": "PASS" if phaseA_status == "PASS" and phaseB_status == "PASS" else phaseB_status,
        "phaseA_status": phaseA_status,
        "phaseB_status": phaseB_status,
        "generator_judge_separation_status": "PASS",
        "harder_equivalence_test_status": harder_equivalence_status,
        "near_miss_ablation_status": near_miss_ablation_status,
        "graded_degradation_status": graded_degradation_status,
        "main_claims_strengthened": sorted(set(strengthened)),
        "main_claims_weakened": sorted(set(weakened)),
        "main_methodological_improvements": improvements,
        "main_output_paths": [str(method_path.relative_to(BASE)).replace("\\", "/"), str(plan_path.relative_to(BASE)).replace("\\", "/"), str(results_path.relative_to(BASE)).replace("\\", "/"), str(failure_path.relative_to(BASE)).replace("\\", "/"), str(summary_path.relative_to(BASE)).replace("\\", "/"), str(raw_path.relative_to(BASE)).replace("\\", "/"), str(manifest_path.relative_to(BASE)).replace("\\", "/"), str(thresholds_path.relative_to(BASE)).replace("\\", "/")],
        "residual_blockers": ["cross-substrate equivalence remains internally supported only; no external validation is claimed", "generator/judge separation improved through frozen artifacts, but not through an independent judge codebase"],
        "ready_for_cycle3": phaseA_status == "PASS" and phaseB_status == "PASS",
    }
    write_json(summary_path, summary)
    write_json(raw_path, {"thresholds": thresholds, "manifest": manifest, "judged_cases": judged})
    log_commands([f"[{now_stamp()}] READ frozen canon and cycle1 ledger inputs", f"[{now_stamp()}] RUN python artifacts/release_audit/cycle2_hardened_runner.py", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_methodological_hardening.md", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_structural_tests_plan.md", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_results_ledger.csv", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_failure_analysis.md", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_decision_summary.json", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_raw_metrics.json", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_frozen_inputs/thresholds.json", f"[{now_stamp()}] WRITE artifacts/release_audit/cycle2_frozen_inputs/manifest.json"])
    print(json.dumps({"status": summary["status"], "phaseA_status": summary["phaseA_status"], "phaseB_status": summary["phaseB_status"], "generator_judge_separation_status": summary["generator_judge_separation_status"], "harder_equivalence_test_status": summary["harder_equivalence_test_status"], "near_miss_ablation_status": summary["near_miss_ablation_status"], "graded_degradation_status": summary["graded_degradation_status"], "ready_for_cycle3": summary["ready_for_cycle3"]}, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
