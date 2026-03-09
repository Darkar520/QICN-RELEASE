from __future__ import annotations

import argparse
import json
import math
import os
import random
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean


BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"
FROZEN = OUT / "cycle3_frozen_inputs"
JUDGE_OUT = OUT / "cycle3_judge_outputs"
INVARIANTS = ["I_per", "I_ri", "I_int", "I_cont", "I_diff", "I_leg"]
AMBIGUITY_BAND = 0.03


def now_stamp() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


def load_json(path: Path) -> dict | list:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict | list) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def append_command_log(*lines: str) -> None:
    with (OUT / "commands_run.txt").open("a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")


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


def classify_case(invariant_margins: dict, consciousness_op_pass: bool) -> tuple[str, str]:
    nearest = min(abs(v) for v in invariant_margins.values())
    if consciousness_op_pass and nearest <= AMBIGUITY_BAND:
        return "AMBIGUOUS", f"all invariants stayed positive, but the nearest invariant margin {nearest:.3f} falls inside the ambiguity band"
    if consciousness_op_pass:
        return "PASS", "all six invariant margins remain positive with headroom beyond the ambiguity band"
    if nearest <= AMBIGUITY_BAND:
        return "AMBIGUOUS", f"certification failed and at least one invariant lies inside the ambiguity band ({nearest:.3f})"
    failed = [k for k, v in invariant_margins.items() if v <= 0]
    return "FAIL", f"certification failed because invariant margins crossed below zero: {', '.join(failed)}"


def judge_case(case_path: Path, thresholds: dict) -> dict:
    case = load_json(case_path)
    normal = case["modes"]["normal"]
    critical = case["modes"]["critical"]
    sham = case["modes"]["sham"]

    all_states = [state for run in normal for state in run["states"]]
    support_margin = min(
        min(vec_norm(state) - thresholds["collapse_radius"], case["support_radius"] - vec_norm(state))
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
    decision, reason = classify_case(invariant_margins, consciousness_op_pass)

    return {
        "blind_id": case["blind_id"],
        "substrate": case["substrate"],
        "decision": decision,
        "reason": reason,
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


def judge_equivalence(left: dict, right: dict) -> dict:
    if left["decision"] != "PASS" or right["decision"] != "PASS":
        return {
            "decision": "FAIL",
            "reason": "at least one member of the pair failed certification under the base threshold profile",
        }
    same_signatures = left["normal_signature"] == right["normal_signature"] and left["critical_signature"] == right["critical_signature"] and left["sham_signature"] == right["sham_signature"]
    max_margin_delta = max(abs(left["invariant_margins"][k] - right["invariant_margins"][k]) for k in INVARIANTS)
    if same_signatures and max_margin_delta <= 0.65:
        return {
            "decision": "PASS",
            "reason": "both blind cases certified and preserved matching transition signatures with bounded invariant-margin divergence",
        }
    if same_signatures:
        return {
            "decision": "AMBIGUOUS",
            "reason": "signatures match, but invariant-margin divergence exceeds the clean equivalence tolerance",
        }
    return {
        "decision": "AMBIGUOUS",
        "reason": "both blind cases certified, but transition signatures diverged under the harder substrate challenge",
    }


def judge_equivalence_normalized_iri(left: dict, right: dict) -> dict:
    if left["decision"] != "PASS" or right["decision"] != "PASS":
        return {
            "decision": "FAIL",
            "reason": "at least one member of the pair failed certification under the base threshold profile",
        }
    same_signatures = left["normal_signature"] == right["normal_signature"] and left["critical_signature"] == right["critical_signature"] and left["sham_signature"] == right["sham_signature"]
    raw_deltas = {k: abs(left["invariant_margins"][k] - right["invariant_margins"][k]) for k in INVARIANTS}
    iri_scale_left = max(abs(left["class_separation"]), 1e-9)
    iri_scale_right = max(abs(right["class_separation"]), 1e-9)
    iri_shape_left = left["invariant_margins"]["I_ri"] / iri_scale_left
    iri_shape_right = right["invariant_margins"]["I_ri"] / iri_scale_right
    iri_shape_delta = abs(iri_shape_left - iri_shape_right)
    non_iri_delta = max(raw_deltas[k] for k in INVARIANTS if k != "I_ri")
    if same_signatures and non_iri_delta <= 0.65 and iri_shape_delta <= 0.05:
        return {
            "decision": "PASS",
            "reason": "signatures match, non-I_ri margins stay within tolerance, and normalized I_ri shape is preserved",
            "iri_shape_delta": round(iri_shape_delta, 6),
            "non_iri_delta": round(non_iri_delta, 6),
        }
    if same_signatures:
        return {
            "decision": "AMBIGUOUS",
            "reason": "signatures match, but either normalized I_ri shape or another margin stays outside the clean tolerance",
            "iri_shape_delta": round(iri_shape_delta, 6),
            "non_iri_delta": round(non_iri_delta, 6),
        }
    return {
        "decision": "AMBIGUOUS",
        "reason": "both cases certify, but transition signatures diverged under the harder substrate challenge",
        "iri_shape_delta": round(iri_shape_delta, 6),
        "non_iri_delta": round(non_iri_delta, 6),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", required=True, choices=["primary", "replica"])
    args = parser.parse_args()

    append_command_log(f"python artifacts/release_audit/cycle3_independent_judge.py --profile {args.profile}")

    manifest = load_json(FROZEN / "blind_manifest.json")
    blind_pairs = load_json(FROZEN / "blind_pairs.json")
    stress_targets = load_json(FROZEN / "stress_targets.json")
    threshold_profiles = load_json(FROZEN / "threshold_profiles.json")

    entries = list(manifest["entries"])
    if args.profile == "replica":
        entries = list(reversed(entries))

    base_results = {}
    for entry in entries:
        blind_id = entry["blind_id"]
        case_path = BASE / entry["artifact_path"]
        base_results[blind_id] = judge_case(case_path, threshold_profiles["base"])

    pair_results = {}
    for pair in blind_pairs:
        pair_results[pair["pair_id"]] = judge_equivalence(base_results[pair["left"]], base_results[pair["right"]])

    stress_results = {}
    for target in stress_targets:
        blind_id = target["blind_id"]
        case_path = BASE / next(entry["artifact_path"] for entry in manifest["entries"] if entry["blind_id"] == blind_id)
        stress_results[blind_id] = {}
        for profile_name in target["profiles"]:
            stress_results[blind_id][profile_name] = judge_case(case_path, threshold_profiles[profile_name])

    payload = {
        "generated_at": now_stamp(),
        "profile": args.profile,
        "judge_contract": {
            "consumes": [
                "blind_manifest.json",
                "blind_pairs.json",
                "stress_targets.json",
                "threshold_profiles.json",
                "frozen case artifacts",
            ],
            "blind_reveal_map_seen": False,
            "pythonhashseed": os.environ.get("PYTHONHASHSEED", ""),
        },
        "base_results": base_results,
        "pair_results": pair_results,
        "stress_results": stress_results,
    }
    write_json(JUDGE_OUT / args.profile / "blind_judgments.json", payload)


if __name__ == "__main__":
    main()
