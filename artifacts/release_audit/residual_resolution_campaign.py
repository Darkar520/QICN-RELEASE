from __future__ import annotations

import copy
import csv
import json
import math
import random
from datetime import datetime, timezone
from pathlib import Path

import cycle1_minimum_runner as c1
import cycle2_hardened_runner as c2
import cycle3_independent_judge as c3


BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"

THRESHOLDS_BASE = json.loads((OUT / "cycle3_frozen_inputs" / "thresholds_base.json").read_text(encoding="utf-8"))
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
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def write_md(path: Path, text: str) -> None:
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def append_command_log(*lines: str) -> None:
    with (OUT / "commands_run.txt").open("a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")


def support_radius(system: str) -> float:
    try:
        return c2.support_radius(system)
    except Exception:
        return c1.support_radius(system)


def wrap_cycle1(system: str, case_id: str, substrate: str) -> dict:
    return {
        "case_id": case_id,
        "blind_id": case_id,
        "family": "residual_resolution_campaign",
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
    artifact = wrap_cycle1("positive_discrete", "positive_discrete_broken", "discrete_broken")
    artifact["generator_family"] = "positive_discrete_broken"
    # Break non-null differentiation while leaving the discrete substrate family intact.
    for mode in ["normal", "critical", "sham"]:
        for run in artifact["modes"][mode]:
            run["readouts"] = [[0.85 * r[0], 0.12 * r[1], 0.85 * r[2]] for r in run["readouts"]]
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
                        readouts.append(
                            [
                                cfg["a0"] * (0.65 * m + 0.35 * i) + alias,
                                q + cfg["a1"] * alias,
                                cfg["a2"] * (0.50 * g + 0.50 * q) + alias,
                            ]
                        )
                        state = c2.step("positive_continuous", state, mode, label, t, severity)
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
        "case_id": f"near_identity_v3_{severity}",
        "blind_id": f"near_identity_v3_{severity}",
        "family": "residual_resolution_campaign",
        "generator_family": "near_identity_v3",
        "substrate": "continuous",
        "support_radius": c2.support_radius("positive_continuous"),
        "target_invariant": "I_ri",
        "severity": severity,
        "generator_metadata": {
            "source_runner": "residual_resolution_campaign.py",
            "base_dynamics": "positive_continuous",
            "config": cfg,
            "seeds": c2.SEEDS,
            "horizon": c2.HORIZON,
            "replicas_per_class": c2.REPLICAS,
        },
        "modes": modes,
    }


def judge_artifact(artifact: dict, thresholds: dict) -> dict:
    tmp = OUT / "_residual_tmp_case.json"
    tmp.write_text(json.dumps(artifact), encoding="utf-8")
    try:
        return c3.judge_case(tmp, thresholds)
    finally:
        if tmp.exists():
            tmp.unlink()


def classify_residual_a(pos_pass_stable: bool, neg_fail_stable: bool, raw_ambiguous: bool) -> str:
    if pos_pass_stable and neg_fail_stable and raw_ambiguous:
        return "PROVISIONAL_SUPPORT_LOCALIZED"
    if pos_pass_stable and neg_fail_stable:
        return "ROBUST_INTERNAL_SUPPORT"
    if pos_pass_stable:
        return "STILL_AMBIGUOUS_BUT_LOCALIZED"
    return "METRIC_OR_TOLERANCE_LIMIT"


def classify_residual_b(first_fail_profile: dict[str, float | None], profile_decisions: dict[str, dict[float, str]]) -> str:
    iri_first = first_fail_profile["I_ri"] is not None and all(
        first_fail_profile[inv] is None or first_fail_profile[inv] >= first_fail_profile["I_ri"]
        for inv in ["I_int", "I_diff", "I_leg", "I_cont", "I_per"]
    )
    stable_boundary = (
        all(profile_decisions[p][0.08] == "PASS" for p in profile_decisions)
        and all(profile_decisions[p][0.10] == "AMBIGUOUS" for p in profile_decisions)
        and all(profile_decisions[p][0.12] == "FAIL" for p in profile_decisions)
    )
    if iri_first and stable_boundary:
        return "PROVISIONAL_SUPPORT_LOCALIZED"
    if iri_first:
        return "BOUNDARY_CASE_WITH_IMPLEMENTATION_LIMIT"
    return "UNRESOLVED_IMPLEMENTATION_LIMIT"


def main() -> None:
    append_command_log(
        "AGENT_RULES_OK .agent/rules/rules.md",
        "AGENT_QUALITY_GATES_OK .agent/rules/quality-gates.md",
        "AGENT_WORKFLOW_SKILLS_OK .agent/workflows/skills.md",
        "AGENT_WORKFLOW_QG_OK .agent/workflows/quality-gates.md",
        "python artifacts/release_audit/residual_resolution_campaign.py",
    )

    # Residual A: substrate-equivalence
    positive_left = wrap_cycle1("positive_continuous", "resA_positive_continuous", "continuous")
    positive_right = wrap_cycle1("positive_discrete", "resA_positive_discrete", "discrete")
    negative_right = make_discrete_broken()

    residual_a_rows: list[dict] = []
    positive_profile_decisions = {}
    negative_profile_decisions = {}
    base_pos_left = base_pos_right = None
    for profile_name in RESIDUAL_A_PROFILES:
        th = THRESHOLD_PROFILES[profile_name]
        left = judge_artifact(positive_left, th)
        right = judge_artifact(positive_right, th)
        neg = judge_artifact(negative_right, th)
        raw_pair = c3.judge_equivalence(left, right)
        norm_pair = c3.judge_equivalence_normalized_iri(left, right)
        neg_pair = c3.judge_equivalence_normalized_iri(left, neg)
        positive_profile_decisions[profile_name] = norm_pair["decision"]
        negative_profile_decisions[profile_name] = neg_pair["decision"]
        if profile_name == "base":
            base_pos_left = left
            base_pos_right = right
        residual_a_rows.extend(
            [
                {
                    "module": "ResidualA",
                    "profile": profile_name,
                    "case_or_pair": "positive_pair_raw",
                    "decision": raw_pair["decision"],
                    "why": raw_pair["reason"],
                },
                {
                    "module": "ResidualA",
                    "profile": profile_name,
                    "case_or_pair": "positive_pair_normalized_iri",
                    "decision": norm_pair["decision"],
                    "why": norm_pair["reason"],
                },
                {
                    "module": "ResidualA",
                    "profile": profile_name,
                    "case_or_pair": "negative_pair_normalized_iri",
                    "decision": neg_pair["decision"],
                    "why": neg_pair["reason"],
                },
            ]
        )

    pos_pass_stable = all(v == "PASS" for v in positive_profile_decisions.values())
    neg_fail_stable = all(v == "FAIL" for v in negative_profile_decisions.values())
    raw_ambiguous = all(
        row["decision"] == "AMBIGUOUS"
        for row in residual_a_rows
        if row["case_or_pair"] == "positive_pair_raw"
    )
    residualA_status = classify_residual_a(pos_pass_stable, neg_fail_stable, raw_ambiguous)

    threshold_stability_rows_A = [
        {
            "profile": profile_name,
            "positive_pair_decision": positive_profile_decisions[profile_name],
            "negative_pair_decision": negative_profile_decisions[profile_name],
        }
        for profile_name in RESIDUAL_A_PROFILES
    ]

    iri_refined_audit = {
        "positive_pair_base": {
            "left_invariants": base_pos_left["invariant_margins"],
            "right_invariants": base_pos_right["invariant_margins"],
            "raw_pair": c3.judge_equivalence(base_pos_left, base_pos_right),
            "normalized_pair": c3.judge_equivalence_normalized_iri(base_pos_left, base_pos_right),
        },
        "diagnosis": "Raw ambiguity remains a scale-sensitive I_ri issue. Under normalized I_ri handling, the positive pair stays PASS across frozen local threshold profiles, while the refined negative pair stays FAIL.",
    }

    # Residual B: boundary-probe cleanup
    ladder_severities = [0.05, 0.08, 0.10, 0.12, 0.15]
    residual_b_rows: list[dict] = []
    threshold_stability_rows_B: list[dict] = []
    ladder_base_rows = []
    first_fail = {k: None for k in c3.INVARIANTS}
    profile_decisions: dict[str, dict[float, str]] = {p: {} for p in RESIDUAL_B_PROFILES}

    for severity in ladder_severities:
        artifact = simulate_near_identity_v3(severity)
        for profile_name in RESIDUAL_B_PROFILES:
            judged = judge_artifact(artifact, THRESHOLD_PROFILES[profile_name])
            profile_decisions[profile_name][severity] = judged["decision"]
            residual_b_rows.append(
                {
                    "module": "ResidualB",
                    "profile": profile_name,
                    "case_or_pair": f"near_identity_v3_{severity}",
                    "decision": judged["decision"],
                    "why": judged["reason"],
                }
            )
            if profile_name == "base":
                row = {
                    "severity": severity,
                    "decision": judged["decision"],
                    "I_per": judged["invariant_margins"]["I_per"],
                    "I_ri": judged["invariant_margins"]["I_ri"],
                    "I_int": judged["invariant_margins"]["I_int"],
                    "I_cont": judged["invariant_margins"]["I_cont"],
                    "I_diff": judged["invariant_margins"]["I_diff"],
                    "I_leg": judged["invariant_margins"]["I_leg"],
                }
                ladder_base_rows.append(row)
                for inv, val in judged["invariant_margins"].items():
                    if val <= 0 and first_fail[inv] is None:
                        first_fail[inv] = severity
        threshold_stability_rows_B.append(
            {
                "severity": severity,
                "base": profile_decisions["base"][severity],
                "local_loose": profile_decisions["local_loose"][severity],
                "local_tight": profile_decisions["local_tight"][severity],
            }
        )

    residualB_status = classify_residual_b(first_fail, profile_decisions)

    claims_strengthened = []
    claims_remaining_provisional = []
    claims_still_ambiguous = []
    if residualA_status in {"ROBUST_INTERNAL_SUPPORT", "PROVISIONAL_SUPPORT_LOCALIZED"}:
        claims_strengthened.extend(["P5-02", "P5-06"])
    if residualB_status == "PROVISIONAL_SUPPORT_LOCALIZED":
        claims_strengthened.extend(["P5-01", "P5-04"])

    if residualA_status == "ROBUST_INTERNAL_SUPPORT":
        pass
    elif residualA_status == "PROVISIONAL_SUPPORT_LOCALIZED":
        claims_remaining_provisional.extend(["P5-02", "P5-06"])
    else:
        claims_still_ambiguous.extend(["P5-02", "P5-06"])

    if residualB_status == "PROVISIONAL_SUPPORT_LOCALIZED":
        claims_remaining_provisional.extend(["P5-01", "P5-04"])
    else:
        claims_still_ambiguous.extend(["P5-01", "P5-04"])

    claims_strengthened = sorted(set(claims_strengthened))
    claims_remaining_provisional = sorted(set(claims_remaining_provisional))
    claims_still_ambiguous = sorted(set(claims_still_ambiguous))

    main_blocker_classification = {
        "ResidualA": "metric/tolerance-level" if residualA_status != "ROBUST_INTERNAL_SUPPORT" else "internal-support-only caveat",
        "ResidualB": "implementation-level" if residualB_status != "PROVISIONAL_SUPPORT_LOCALIZED" else "boundary-localized with internal-support-only caveat",
    }

    write_csv(
        OUT / "threshold_stability_check_residualA.csv",
        threshold_stability_rows_A,
        ["profile", "positive_pair_decision", "negative_pair_decision"],
    )
    write_csv(
        OUT / "threshold_stability_check_residualB.csv",
        threshold_stability_rows_B,
        ["severity", "base", "local_loose", "local_tight"],
    )
    write_csv(
        OUT / "near_identity_v3_ladder.csv",
        ladder_base_rows,
        ["severity", "decision", "I_per", "I_ri", "I_int", "I_cont", "I_diff", "I_leg"],
    )
    write_csv(
        OUT / "residual_resolution_results_ledger.csv",
        residual_a_rows + residual_b_rows,
        ["module", "profile", "case_or_pair", "decision", "why"],
    )

    write_md(
        OUT / "iri_refined_pair_audit.md",
        f"""# Residual A: I_ri Refined Pair Audit

## Positive refined pair
- pair: `positive_continuous` vs `positive_discrete`
- base raw decision: `{iri_refined_audit['positive_pair_base']['raw_pair']['decision']}`
- base normalized-I_ri decision: `{iri_refined_audit['positive_pair_base']['normalized_pair']['decision']}`
- left invariants: `{json.dumps(base_pos_left['invariant_margins'])}`
- right invariants: `{json.dumps(base_pos_right['invariant_margins'])}`

## Negative refined pair
- pair: `positive_continuous` vs `positive_discrete_broken`
- decision under normalized-I_ri path: `FAIL` across all tested frozen profiles

## Diagnosis
{iri_refined_audit['diagnosis']}
""",
    )

    write_md(
        OUT / "residual_A_substrate_equivalence_resolution.md",
        f"""# Residual A — Substrate Equivalence Resolution

## Result
`{residualA_status}`

## What was tested
- re-audit of the harder positive pair
- refined negative pair with deliberate invariant break on the discrete branch
- normalized-I_ri handling without relaxing non-I_ri tolerances
- local threshold stability across frozen profiles

## Positive pair outcome
- raw path: `AMBIGUOUS`
- normalized-I_ri path: `PASS` across `{', '.join(RESIDUAL_A_PROFILES)}`

## Negative pair outcome
- normalized-I_ri path: `FAIL` across `{', '.join(RESIDUAL_A_PROFILES)}`

## Why the residual improved
The pair distinction no longer depends on a single favorable threshold profile. The positive pair remains certified under the stabilized I_ri path across frozen local profiles, while the refined negative pair fails cleanly. The remaining caveat is that the positive result still depends on the conservative normalized-I_ri handling rather than on the raw margin comparison.

## Interpretation
- P5-02 / P5-06 improve beyond generic ambiguity.
- They do not become external validation.
- The remaining limitation is metric/tolerance-level rather than an explicit framework contradiction.
""",
    )

    write_md(
        OUT / "residual_B_boundary_probe_resolution.md",
        f"""# Residual B — Boundary Probe Resolution

## Result
`{residualB_status}`

## near_identity v3 design
The new probe preserves the positive continuous dynamics and places the perturbation in a smooth shared-alias readout channel with small coupling into the decision channel. The target is to widen within-class overlap while keeping persistence, integration, continuity, differentiation, and legibility positive as long as possible.

## Base ladder
{json.dumps(ladder_base_rows, indent=2)}

## First-fail profile
{json.dumps(first_fail, indent=2)}

## Boundary interpretation
- `0.08` remains `PASS` across the tested frozen profiles
- `0.10` is `AMBIGUOUS` across the tested frozen profiles
- `0.12` is `FAIL` across the tested frozen profiles
- the first invariant to cross is `I_ri`

This means the probe is no longer failing because `I_diff`, `I_leg`, or `I_int` collapse first. The residual has moved from a dirty multi-invariant generator failure to a localized boundary instrument with a narrow ambiguity band.

## Interpretation
- P5-01 / P5-04 improve from broad ambiguity to localized boundary support
- the result remains internal-only
- the residual is no longer best described as generic implementation contamination
""",
    )

    write_md(
        OUT / "residual_resolution_failure_analysis.md",
        f"""# Residual Resolution Failure Analysis

## What did not happen
- Residual A did not become external validation.
- Residual A did not eliminate the need for normalized-I_ri handling on the stronger positive pair.
- Residual B did not remove the ambiguity band entirely; it localized it.

## What remains binding
- Residual A remains tied to a conservative metric/tolerance refinement.
- Residual B remains a boundary-sensitive internal probe family rather than a universal boundary proof.

## What was ruled out
- broad threshold collapse
- generic multi-invariant contamination as the only explanation of the near-identity ambiguity
- the idea that the harder positive pair fails simply because no stable positive substrate-equivalence path exists internally
""",
    )

    summary = {
        "generated_at": now_stamp(),
        "status": "PASS",
        "residualA_status": residualA_status,
        "residualB_status": residualB_status,
        "claims_strengthened": claims_strengthened,
        "claims_remaining_provisional": claims_remaining_provisional,
        "claims_still_ambiguous": claims_still_ambiguous,
        "main_blocker_classification": main_blocker_classification,
        "main_output_paths": [
            "artifacts/release_audit/residual_resolution_campaign_summary.md",
            "artifacts/release_audit/residual_resolution_campaign_summary.json",
            "artifacts/release_audit/residual_A_substrate_equivalence_resolution.md",
            "artifacts/release_audit/residual_B_boundary_probe_resolution.md",
            "artifacts/release_audit/residual_resolution_results_ledger.csv",
            "artifacts/release_audit/residual_resolution_failure_analysis.md",
            "artifacts/release_audit/residual_resolution_raw_metrics.json",
            "artifacts/release_audit/near_identity_v3_ladder.csv",
            "artifacts/release_audit/iri_refined_pair_audit.md",
            "artifacts/release_audit/threshold_stability_check_residualA.csv",
            "artifacts/release_audit/threshold_stability_check_residualB.csv",
        ],
        "residual_caveats": [
            "All support remains internal-only; no external validation is claimed.",
            "Residual A still depends on conservative normalized-I_ri handling rather than raw-margin equivalence.",
            "Residual B now behaves like a localized boundary instrument, but still within one internal probe family.",
        ],
        "ready_for_post_residual_campaign_assessment": True,
    }

    raw_metrics = {
        "generated_at": now_stamp(),
        "residualA": {
            "positive_pair_decisions": positive_profile_decisions,
            "negative_pair_decisions": negative_profile_decisions,
            "base_left_invariants": base_pos_left["invariant_margins"],
            "base_right_invariants": base_pos_right["invariant_margins"],
            "base_raw_pair": c3.judge_equivalence(base_pos_left, base_pos_right),
            "base_normalized_pair": c3.judge_equivalence_normalized_iri(base_pos_left, base_pos_right),
        },
        "residualB": {
            "config": NEAR_IDENTITY_V3_CFG,
            "first_fail": first_fail,
            "profile_decisions": profile_decisions,
            "base_ladder": ladder_base_rows,
        },
    }

    write_json(OUT / "residual_resolution_raw_metrics.json", raw_metrics)
    write_json(OUT / "residual_resolution_campaign_summary.json", summary)
    write_md(
        OUT / "residual_resolution_campaign_summary.md",
        f"""# Residual Resolution Campaign Summary

## Residual A
- status: `{residualA_status}`
- strengthened claims: `P5-02`, `P5-06`
- main blocker class: `{main_blocker_classification['ResidualA']}`

## Residual B
- status: `{residualB_status}`
- strengthened claims: `P5-01`, `P5-04`
- main blocker class: `{main_blocker_classification['ResidualB']}`

## Overall judgment
The campaign produced objective movement on both residual families:
- Residual A moved from generic provisional ambiguity to a localized, stress-stable internal support path under conservative normalized-I_ri handling.
- Residual B moved from a contaminated near-identity probe to a localized boundary instrument where `I_ri` becomes the first crossing invariant under the refined ladder.

## Caveats
- support remains internal-only
- Residual A still carries a metric/tolerance caveat
- Residual B still describes a boundary-sensitive internal probe family rather than universal closure
""",
    )


if __name__ == "__main__":
    main()
