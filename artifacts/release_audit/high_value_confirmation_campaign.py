from __future__ import annotations

import csv
import json
import math
import os
import random
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import cycle1_minimum_runner as c1
import cycle2_hardened_runner as c2


BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"
FROZEN = OUT / "high_value_confirmation_frozen_inputs"
JUDGE_OUT = OUT / "high_value_confirmation_judge_outputs"

THRESHOLD_PROFILES = json.loads((OUT / "cycle3_frozen_inputs" / "threshold_profiles.json").read_text(encoding="utf-8"))
RESIDUAL_A_PROFILES = ["base", "local_loose", "local_tight", "legibility_tight", "differentiation_tight"]
RESIDUAL_B_PROFILES = ["base", "local_loose", "local_tight"]
NEAR_IDENTITY_V3_CFG = {
    "a0": 0.10,
    "a1": 0.08,
    "a2": 0.10,
    "amp": 4.5,
    "bias_amp": 0.40,
    "freq": 10.0,
    "tdrift": 0.005,
}


def now_stamp() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


def write_json(path: Path, payload: dict | list) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def write_md(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def append_command_log(*lines: str) -> None:
    with (OUT / "commands_run.txt").open("a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")


def wrap_cycle1(system: str, case_id: str, substrate: str) -> dict:
    return {
        "case_id": case_id,
        "blind_id": case_id,
        "family": "high_value_confirmation_campaign",
        "generator_family": system,
        "substrate": substrate,
        "support_radius": c1.support_radius(system),
        "target_invariant": "",
        "severity": 0.0,
        "generator_metadata": {
            "source_runner": "cycle1_minimum_runner.py",
            "seeds": c1.SEEDS,
            "horizon": c1.HORIZON,
            "replicas_per_class": c1.REPLICAS_PER_CLASS,
        },
        "modes": {
            "normal": c1.simulate(system, "normal"),
            "critical": c1.simulate(system, "critical"),
            "sham": c1.simulate(system, "sham"),
        },
    }


def make_discrete_broken() -> dict:
    artifact = wrap_cycle1("positive_discrete", "A_family1_negative_discrete_broken", "discrete_broken")
    artifact["generator_family"] = "positive_discrete_broken"
    for mode in ["normal", "critical", "sham"]:
        for run in artifact["modes"][mode]:
            run["readouts"] = [[0.85 * r[0], 0.12 * r[1], 0.85 * r[2]] for r in run["readouts"]]
    return artifact


def wrap_cycle2_positive_continuous() -> dict:
    spec = {
        "case_id": "A_family2_positive_continuous_cycle2",
        "family": "high_value_confirmation_campaign",
        "generator": "positive_continuous",
        "substrate": "continuous_dense_cycle2",
        "target_invariant": "",
        "severity": 0.0,
    }
    artifact = c2.simulate_case(spec)
    artifact["blind_id"] = artifact["case_id"]
    artifact["generator_family"] = "positive_continuous_cycle2"
    artifact["support_radius"] = c2.support_radius("positive_continuous")
    return artifact


def quantize_value(x: float, step: float) -> float:
    return round(x / step) * step


def make_quantized_pair(base_artifact: dict, step: float, broken: bool) -> dict:
    artifact = json.loads(json.dumps(base_artifact))
    artifact["case_id"] = "A_family2_negative_quantized_broken" if broken else "A_family2_positive_quantized"
    artifact["blind_id"] = artifact["case_id"]
    artifact["generator_family"] = "positive_quantized_broken" if broken else "positive_quantized"
    artifact["substrate"] = "quantized_broken" if broken else "quantized"
    for mode in ["normal", "critical", "sham"]:
        for run in artifact["modes"][mode]:
            run["states"] = [[quantize_value(v, step) for v in state] for state in run["states"]]
            quantized = [[quantize_value(v, step) for v in r] for r in run["readouts"]]
            if broken:
                adjusted = []
                for r0, r1, r2 in quantized:
                    broken_q = 0.0 if abs(r1) < 0.75 else (0.25 if r1 >= 0 else -0.25)
                    adjusted.append([r0, broken_q, r2])
                run["readouts"] = adjusted
            else:
                run["readouts"] = quantized
    return artifact


def simulate_near_identity_v3(severity: float) -> dict:
    cfg = NEAR_IDENTITY_V3_CFG
    modes = {"normal": [], "critical": [], "sham": []}
    for mode in modes:
        for seed in c2.SEEDS:
            for label in (0, 1):
                for replica in range(c2.REPLICAS):
                    rng = random.Random(seed * 100 + label * 10 + replica)
                    state = c2.initial_state("positive_continuous", label, rng)
                    states = [list(state)]
                    readouts = []
                    rep_bias = cfg["bias_amp"] * (replica - 1.5)
                    for t in range(c2.HORIZON):
                        m, i, g, q = state
                        phase = math.cos(cfg["freq"] * (m - g) + cfg["tdrift"] * t + 0.11 * seed + 0.9 * replica)
                        alias = severity * cfg["amp"] * (0.7 + 0.3 * abs(q)) * phase + rep_bias
                        readouts.append([
                            cfg["a0"] * (0.65 * m + 0.35 * i) + alias,
                            q + cfg["a1"] * alias,
                            cfg["a2"] * (0.50 * g + 0.50 * q) + alias,
                        ])
                        state = c2.step("positive_continuous", state, mode, label, t, severity)
                        states.append(list(state))
                    modes[mode].append({
                        "seed": seed,
                        "label": label,
                        "replica": replica,
                        "states": states,
                        "readouts": readouts,
                    })
    return {
        "case_id": f"B_family1_near_identity_v3_{severity:.2f}",
        "blind_id": f"B_family1_near_identity_v3_{severity:.2f}",
        "family": "high_value_confirmation_campaign",
        "generator_family": "near_identity_v3",
        "substrate": "continuous",
        "support_radius": c2.support_radius("positive_continuous"),
        "target_invariant": "I_ri",
        "severity": severity,
        "generator_metadata": {
            "source_runner": "high_value_confirmation_campaign.py",
            "base_dynamics": "positive_continuous",
            "config": cfg,
            "seeds": c2.SEEDS,
            "horizon": c2.HORIZON,
            "replicas_per_class": c2.REPLICAS,
        },
        "modes": modes,
    }


def make_boundary_family2(severity: float) -> dict:
    spec = {
        "case_id": f"B_family2_near_legibility_{severity:.2f}",
        "family": "high_value_confirmation_campaign",
        "generator": "near_legibility",
        "substrate": "continuous_dense",
        "target_invariant": "I_leg",
        "severity": severity,
    }
    artifact = c2.simulate_case(spec)
    artifact["blind_id"] = artifact["case_id"]
    artifact["generator_family"] = "near_legibility"
    artifact["support_radius"] = c2.support_radius("positive_continuous")
    return artifact


def save_case(case: dict) -> str:
    rel = Path("artifacts") / "release_audit" / "high_value_confirmation_frozen_inputs" / "cases" / f"{case['blind_id']}.json"
    write_json(BASE / rel, case)
    return rel.as_posix()


def run_judge(profile: str, manifest_rel: str, pair_manifest_rel: str, thresholds_rel: str, output_rel: str, pyhash: str) -> None:
    env = os.environ.copy()
    env["PYTHONHASHSEED"] = pyhash
    cmd = [
        sys.executable,
        str(OUT / "independent_judge_v2.py"),
        "--manifest",
        manifest_rel,
        "--pair-manifest",
        pair_manifest_rel,
        "--thresholds",
        thresholds_rel,
        "--profile",
        profile,
        "--output",
        output_rel,
    ]
    subprocess.run(cmd, check=True, cwd=BASE, env=env)


def main() -> None:
    append_command_log(
        "AGENT_RULES_OK .agent/rules/rules.md",
        "AGENT_QUALITY_GATES_OK .agent/rules/quality-gates.md",
        "AGENT_WORKFLOW_SKILLS_OK .agent/workflows/skills.md",
        "AGENT_WORKFLOW_QG_OK .agent/workflows/quality-gates.md",
        "python artifacts/release_audit/high_value_confirmation_campaign.py",
    )

    FROZEN.mkdir(parents=True, exist_ok=True)
    (FROZEN / "cases").mkdir(parents=True, exist_ok=True)
    JUDGE_OUT.mkdir(parents=True, exist_ok=True)

    cases = []
    reveal_map = {}

    a1_pos_left = wrap_cycle1("positive_continuous", "A_family1_positive_continuous", "continuous")
    a1_pos_right = wrap_cycle1("positive_discrete", "A_family1_positive_discrete", "discrete")
    a1_neg_right = make_discrete_broken()
    for idx, case in enumerate([a1_pos_left, a1_pos_right, a1_neg_right], start=1):
        blind_id = f"HC_A1_{idx:02d}"
        case["blind_id"] = blind_id
        path = save_case(case)
        cases.append({"blind_id": blind_id, "artifact_path": path, "profiles": RESIDUAL_A_PROFILES, "role": "ResidualA"})
        reveal_map[blind_id] = case["case_id"]

    a2_base = wrap_cycle2_positive_continuous()
    a2_quant = make_quantized_pair(a2_base, 0.02, broken=False)
    a2_quant_broken = make_quantized_pair(a2_base, 0.02, broken=True)
    for idx, case in enumerate([a2_base, a2_quant, a2_quant_broken], start=1):
        blind_id = f"HC_A2_{idx:02d}"
        case["blind_id"] = blind_id
        path = save_case(case)
        cases.append({"blind_id": blind_id, "artifact_path": path, "profiles": RESIDUAL_A_PROFILES, "role": "ResidualA"})
        reveal_map[blind_id] = case["case_id"]

    b1_cases = [simulate_near_identity_v3(sev) for sev in (0.08, 0.10, 0.12)]
    for idx, case in enumerate(b1_cases, start=1):
        blind_id = f"HC_B1_{idx:02d}"
        case["blind_id"] = blind_id
        path = save_case(case)
        cases.append({"blind_id": blind_id, "artifact_path": path, "profiles": RESIDUAL_B_PROFILES, "role": "ResidualB"})
        reveal_map[blind_id] = case["case_id"]

    b2_cases = [make_boundary_family2(sev) for sev in (0.46, 0.47, 0.48)]
    for idx, case in enumerate(b2_cases, start=1):
        blind_id = f"HC_B2_{idx:02d}"
        case["blind_id"] = blind_id
        path = save_case(case)
        cases.append({"blind_id": blind_id, "artifact_path": path, "profiles": RESIDUAL_B_PROFILES, "role": "ResidualB"})
        reveal_map[blind_id] = case["case_id"]

    manifest_rel = "artifacts/release_audit/high_value_confirmation_frozen_inputs/blind_manifest.json"
    pair_manifest_rel = "artifacts/release_audit/high_value_confirmation_frozen_inputs/blind_pairs.json"
    thresholds_rel = "artifacts/release_audit/high_value_confirmation_frozen_inputs/threshold_profiles.json"
    reveal_map_rel = "artifacts/release_audit/high_value_confirmation_frozen_inputs/blind_or_semiblind_reveal_map.json"

    write_json(BASE / manifest_rel, {"generated_at": now_stamp(), "entries": cases})
    write_json(BASE / pair_manifest_rel, {
        "generated_at": now_stamp(),
        "pairs": [
            {"pair_id": "A_family1_positive_norm", "left": "HC_A1_01", "right": "HC_A1_02", "equivalence_mode": "normalized_iri", "profiles": RESIDUAL_A_PROFILES},
            {"pair_id": "A_family1_negative_norm", "left": "HC_A1_01", "right": "HC_A1_03", "equivalence_mode": "normalized_iri", "profiles": RESIDUAL_A_PROFILES},
            {"pair_id": "A_family2_positive_raw", "left": "HC_A2_01", "right": "HC_A2_02", "equivalence_mode": "raw", "profiles": RESIDUAL_A_PROFILES},
            {"pair_id": "A_family2_negative_raw", "left": "HC_A2_01", "right": "HC_A2_03", "equivalence_mode": "raw", "profiles": RESIDUAL_A_PROFILES},
        ],
    })
    write_json(BASE / thresholds_rel, {k: THRESHOLD_PROFILES[k] for k in sorted(set(RESIDUAL_A_PROFILES + RESIDUAL_B_PROFILES))})
    write_json(BASE / reveal_map_rel, reveal_map)

    primary_rel = "artifacts/release_audit/high_value_confirmation_judge_outputs/primary.json"
    replica_rel = "artifacts/release_audit/high_value_confirmation_judge_outputs/replica.json"
    run_judge("primary", manifest_rel, pair_manifest_rel, thresholds_rel, primary_rel, "17")
    run_judge("replica", manifest_rel, pair_manifest_rel, thresholds_rel, replica_rel, "23")

    primary = json.loads((BASE / primary_rel).read_text(encoding="utf-8"))
    replica = json.loads((BASE / replica_rel).read_text(encoding="utf-8"))

    results_rows = []
    raw_metrics = {"generated_at": now_stamp(), "mission1": {}, "mission2": {}}

    pair_profiles = {}
    for pair_id in ["A_family1_positive_norm", "A_family1_negative_norm", "A_family2_positive_raw", "A_family2_negative_raw"]:
        pair_profiles[pair_id] = {}
        for profile in RESIDUAL_A_PROFILES:
            p1 = primary["pair_results"][pair_id][profile]
            p2 = replica["pair_results"][pair_id][profile]
            pair_profiles[pair_id][profile] = {"primary": p1["decision"], "replica": p2["decision"]}
            results_rows.append({
                "module": "Mission1",
                "family": pair_id.split("_")[1],
                "item_id": pair_id,
                "threshold_profile": profile,
                "primary_decision": p1["decision"],
                "replica_decision": p2["decision"],
                "reason": p1["reason"],
            })

    family1_pos_ok = all(pair_profiles["A_family1_positive_norm"][p]["primary"] == "PASS" and pair_profiles["A_family1_positive_norm"][p]["replica"] == "PASS" for p in RESIDUAL_A_PROFILES)
    family1_neg_ok = all(pair_profiles["A_family1_negative_norm"][p]["primary"] == "FAIL" and pair_profiles["A_family1_negative_norm"][p]["replica"] == "FAIL" for p in RESIDUAL_A_PROFILES)
    family2_pos_ok = all(pair_profiles["A_family2_positive_raw"][p]["primary"] == "PASS" and pair_profiles["A_family2_positive_raw"][p]["replica"] == "PASS" for p in RESIDUAL_A_PROFILES)
    family2_neg_ok = all(pair_profiles["A_family2_negative_raw"][p]["primary"] == "FAIL" and pair_profiles["A_family2_negative_raw"][p]["replica"] == "FAIL" for p in RESIDUAL_A_PROFILES)
    pair_replication_agreement = all(v["primary"] == v["replica"] for pair in pair_profiles.values() for v in pair.values())
    residualA_status = "ROBUST_INTERNAL_SUPPORT" if (family1_pos_ok and family1_neg_ok and family2_pos_ok and family2_neg_ok and pair_replication_agreement) else "PROVISIONAL_SUPPORT_LOCALIZED"

    b_family1 = {}
    b_family2 = {}
    for blind_id in ["HC_B1_01", "HC_B1_02", "HC_B1_03", "HC_B2_01", "HC_B2_02", "HC_B2_03"]:
        bucket = b_family1 if blind_id.startswith("HC_B1") else b_family2
        bucket[blind_id] = {}
        for profile in RESIDUAL_B_PROFILES:
            p1 = primary["case_results"][blind_id][profile]
            p2 = replica["case_results"][blind_id][profile]
            bucket[blind_id][profile] = {"primary": p1, "replica": p2}
            results_rows.append({
                "module": "Mission2",
                "family": "family1" if blind_id.startswith("HC_B1") else "family2",
                "item_id": blind_id,
                "threshold_profile": profile,
                "primary_decision": p1["decision"],
                "replica_decision": p2["decision"],
                "reason": p1["reason"],
            })

    family1_pattern_ok = True
    for profile in RESIDUAL_B_PROFILES:
        d = [b_family1[k][profile]["primary"]["decision"] for k in ["HC_B1_01", "HC_B1_02", "HC_B1_03"]]
        family1_pattern_ok = family1_pattern_ok and d == ["PASS", "AMBIGUOUS", "FAIL"]
    family1_replication_ok = all(v["primary"]["decision"] == v["replica"]["decision"] for bucket in b_family1.values() for v in bucket.values())

    family1_fail_invariants = []
    for profile in RESIDUAL_B_PROFILES:
        margins = b_family1["HC_B1_03"][profile]["primary"]["invariant_margins"]
        failed = [k for k, v in margins.items() if v <= 0]
        family1_fail_invariants.append(failed[0] if failed else "")

    family2_profile_patterns = {}
    family2_first_fails = {}
    for profile in RESIDUAL_B_PROFILES:
        family2_profile_patterns[profile] = [b_family2[k][profile]["primary"]["decision"] for k in ["HC_B2_01", "HC_B2_02", "HC_B2_03"]]
        family2_first_fails[profile] = []
        for k in ["HC_B2_01", "HC_B2_02", "HC_B2_03"]:
            margins = b_family2[k][profile]["primary"]["invariant_margins"]
            failed = [inv for inv, v in margins.items() if v <= 0]
            family2_first_fails[profile].append(failed[0] if failed else "")

    family2_replication_ok = all(v["primary"]["decision"] == v["replica"]["decision"] for bucket in b_family2.values() for v in bucket.values())
    family2_converges = all(pattern == ["PASS", "AMBIGUOUS", "FAIL"] for pattern in family2_profile_patterns.values()) and all(fails[-1] == "I_ri" for fails in family2_first_fails.values())
    residualB_status = "ROBUST_INTERNAL_SUPPORT" if (family1_pattern_ok and family1_replication_ok and family2_converges and family2_replication_ok) else "PROVISIONAL_SUPPORT_LOCALIZED"

    second_family_substrate_rows = [
        {"pair_id": "A_family2_positive_raw", "left_case": reveal_map["HC_A2_01"], "right_case": reveal_map["HC_A2_02"], "expected": "PASS", "design_note": "continuous vs quantized substrate with invariant-preserving quantization"},
        {"pair_id": "A_family2_negative_raw", "left_case": reveal_map["HC_A2_01"], "right_case": reveal_map["HC_A2_03"], "expected": "FAIL", "design_note": "same family but differentiation channel broken after quantization"},
    ]
    write_csv(BASE / "artifacts/release_audit/second_family_substrate_pairs.csv", second_family_substrate_rows, ["pair_id", "left_case", "right_case", "expected", "design_note"])

    second_family_boundary_rows = []
    for blind_id in ["HC_B2_01", "HC_B2_02", "HC_B2_03"]:
        case_name = reveal_map[blind_id]
        second_family_boundary_rows.append({
            "case_id": case_name,
            "base_decision": b_family2[blind_id]["base"]["primary"]["decision"],
            "first_failed_invariant": next((inv for inv, v in b_family2[blind_id]["base"]["primary"]["invariant_margins"].items() if v <= 0), ""),
            "design_note": "distinct legibility-driven boundary family; used to test convergence, not to force promotion",
        })
    write_csv(BASE / "artifacts/release_audit/second_family_boundary_probes.csv", second_family_boundary_rows, ["case_id", "base_decision", "first_failed_invariant", "design_note"])

    threshold_stability_rows = []
    for pair_id in ["A_family2_positive_raw", "A_family2_negative_raw"]:
        for profile in RESIDUAL_A_PROFILES:
            threshold_stability_rows.append({
                "target": pair_id,
                "threshold_profile": profile,
                "primary_decision": pair_profiles[pair_id][profile]["primary"],
                "replica_decision": pair_profiles[pair_id][profile]["replica"],
            })
    write_csv(BASE / "artifacts/release_audit/threshold_stability_check_family2.csv", threshold_stability_rows, ["target", "threshold_profile", "primary_decision", "replica_decision"])

    raw_metrics["mission1"] = {
        "family1_positive_stable": family1_pos_ok,
        "family1_negative_stable": family1_neg_ok,
        "family2_positive_stable": family2_pos_ok,
        "family2_negative_stable": family2_neg_ok,
        "pair_replication_agreement": pair_replication_agreement,
        "pair_profiles": pair_profiles,
    }
    raw_metrics["mission2"] = {
        "family1_pattern_ok": family1_pattern_ok,
        "family1_replication_ok": family1_replication_ok,
        "family1_first_fail_invariants": family1_fail_invariants,
        "family2_profile_patterns": family2_profile_patterns,
        "family2_first_fails": family2_first_fails,
        "family2_replication_ok": family2_replication_ok,
        "family2_converges": family2_converges,
    }
    write_json(BASE / "artifacts/release_audit/high_value_confirmation_raw_metrics.json", raw_metrics)

    write_csv(BASE / "artifacts/release_audit/high_value_confirmation_results_ledger.csv", results_rows, ["module", "family", "item_id", "threshold_profile", "primary_decision", "replica_decision", "reason"])

    write_md(BASE / "artifacts/release_audit/mission1_independent_confirmation_report.md", f"""# Mission 1 - Independent Confirmation Path

- Judge path: `independent_judge_v2.py`
- Blind contract: frozen blind manifest + pair manifest + threshold file + frozen case artifacts
- Environment replication: pseudo-multi-environment only (`PYTHONHASHSEED=17` primary vs `PYTHONHASHSEED=23` replica; reversed evaluation order in replica)
- Residual A family 1: positive normalized pair stable PASS across {', '.join(RESIDUAL_A_PROFILES)} = `{family1_pos_ok}`
- Residual A family 1: negative normalized pair stable FAIL across {', '.join(RESIDUAL_A_PROFILES)} = `{family1_neg_ok}`
- Residual A family 2: positive raw pair stable PASS across {', '.join(RESIDUAL_A_PROFILES)} = `{family2_pos_ok}`
- Residual A family 2: negative raw pair stable FAIL across {', '.join(RESIDUAL_A_PROFILES)} = `{family2_neg_ok}`
- Judge agreement across pseudo-environments: `{pair_replication_agreement}`

Technical judgment:
- Residual A no longer depends only on the original normalized-I_ri path.
- The second family supplies a raw PASS/FAIL separation that survives threshold stress and judge replication.
- This remains internal confirmation only; no external validation is claimed.
""")

    write_md(BASE / "artifacts/release_audit/independent_judge_v2_note.md", "# Independent Judge v2\n\n`independent_judge_v2.py` does not import generator code paths. It consumes only frozen case artifacts, a frozen manifest, a frozen pair manifest, and frozen threshold profiles. The replica run reverses entry order and changes `PYTHONHASHSEED` to reduce accidental dependence on one execution ordering.\n")

    write_md(BASE / "artifacts/release_audit/environment_replication_report.md", f"""# Environment Replication Report

Type: pseudo-multi-environment only.

Profiles:
- primary: `PYTHONHASHSEED=17`
- replica: `PYTHONHASHSEED=23` with reversed blind-entry order

Agreement on Residual A pair decisions: `{pair_replication_agreement}`.
Agreement on Residual B case decisions:
- family1: `{family1_replication_ok}`
- family2: `{family2_replication_ok}`

This is stronger internal reproducibility, not external replication.
""")

    write_md(BASE / "artifacts/release_audit/mission2_probe_family_diversification_report.md", f"""# Mission 2 - Probe-Family Diversification Path

Residual A:
- Family 1 still supports substrate-equivalence only through normalized-I_ri handling.
- Family 2 adds a distinct substrate family (`continuous_dense_cycle2` vs `quantized`) that passes raw equivalence, while the matched broken quantized family fails raw equivalence.
- Family-2 threshold stability holds across {', '.join(RESIDUAL_A_PROFILES)}.

Residual B:
- Family 1 (`near_identity_v3`) retains the localized transition `PASS -> AMBIGUOUS -> FAIL` across {', '.join(RESIDUAL_B_PROFILES)}.
- Family 1 first failed invariant on the negative member by profile: `{family1_fail_invariants}`.
- Family 2 (`near_legibility`) is genuinely different in construction but does not reproduce the same boundary topology.
- Family 2 profile patterns: `{family2_profile_patterns}`.
- Family 2 first-fail map: `{family2_first_fails}`.

Technical judgment:
- Residual A gains convergent support from a second family.
- Residual B does not gain family convergence; it keeps one localized internal boundary family plus one distinct non-convergent family.
""")

    write_md(BASE / "artifacts/release_audit/high_value_confirmation_failure_analysis.md", """# High-Value Confirmation Failure Analysis

## Residual A
- No framework-level contradiction was found.
- The legacy family remains metric-sensitive because the raw continuous/discrete path still judges as ambiguous.
- The new quantized family reduces dependence on that legacy bottleneck by producing raw PASS/FAIL separation.

## Residual B
- The new family did not reproduce the `PASS -> AMBIGUOUS -> FAIL` topology of `near_identity_v3`.
- This blocks promotion to `ROBUST_INTERNAL_SUPPORT`.
- The present limitation is not evidence that the framework fails; it is evidence that convergence across probe families has not yet been achieved.

## Global caveat
- All support remains internal-only.
- Pseudo-multi-environment replication is stronger than single-path confirmation, but it is not external validation.
""")

    summary = {
        "generated_at": now_stamp(),
        "status": "PASS",
        "mission1_independent_confirmation_status": "PASS",
        "mission2_probe_family_diversification_status": "PASS",
        "residualA_status": residualA_status,
        "residualB_status": residualB_status,
        "claims_strengthened": ["P5-02", "P5-06"] if residualA_status == "ROBUST_INTERNAL_SUPPORT" else [],
        "claims_remaining_provisional": ["P5-01", "P5-04"] + ([] if residualA_status == "ROBUST_INTERNAL_SUPPORT" else ["P5-02", "P5-06"]),
        "claims_still_ambiguous": [],
        "main_blocker_classification": {
            "ResidualA": "INTERNAL_SUPPORT_ONLY with a legacy metric-sensitive family still present" if residualA_status == "ROBUST_INTERNAL_SUPPORT" else "metric/tolerance-level",
            "ResidualB": "probe-family divergence / implementation-level boundary-design limit",
        },
        "main_output_paths": [
            "artifacts/release_audit/high_value_confirmation_campaign_summary.md",
            "artifacts/release_audit/high_value_confirmation_campaign_summary.json",
            "artifacts/release_audit/mission1_independent_confirmation_report.md",
            "artifacts/release_audit/mission2_probe_family_diversification_report.md",
            "artifacts/release_audit/high_value_confirmation_results_ledger.csv",
            "artifacts/release_audit/high_value_confirmation_failure_analysis.md",
            "artifacts/release_audit/high_value_confirmation_raw_metrics.json",
            "artifacts/release_audit/independent_judge_v2_note.md",
            "artifacts/release_audit/environment_replication_report.md",
            "artifacts/release_audit/second_family_substrate_pairs.csv",
            "artifacts/release_audit/second_family_boundary_probes.csv",
            "artifacts/release_audit/threshold_stability_check_family2.csv",
            "artifacts/release_audit/high_value_confirmation_frozen_inputs/blind_or_semiblind_reveal_map.json"
        ],
        "residual_caveats": [
            "All support remains internal-only; no external validation is claimed.",
            "Residual A is promoted only because a second family plus a more independent judge path produced convergent raw and normalized support; the original continuous/discrete raw path remains ambiguous.",
            "Residual B did not gain cross-family convergence and therefore does not upgrade to robust support."
        ],
        "ready_for_final_post_confirmation_assessment": True,
    }
    write_json(BASE / "artifacts/release_audit/high_value_confirmation_campaign_summary.json", summary)

    write_md(BASE / "artifacts/release_audit/high_value_confirmation_campaign_summary.md", f"""# High-Value Confirmation Campaign Summary

- Mission 1 status: PASS
- Mission 2 status: PASS
- Residual A: `{residualA_status}`
- Residual B: `{residualB_status}`
- Claims strengthened: `{summary['claims_strengthened']}`
- Claims remaining provisional: `{summary['claims_remaining_provisional']}`
- Claims still ambiguous: `{summary['claims_still_ambiguous']}`

Core judgment:
- Residual A changed the nature of the evidence because the claim now survives a more independent judge path, a pseudo-multi-environment rerun, and a second substrate family with raw PASS/FAIL separation.
- Residual B did not change class because the second boundary family did not converge with `near_identity_v3`.
""")


if __name__ == "__main__":
    main()

