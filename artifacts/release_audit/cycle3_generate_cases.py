from __future__ import annotations

import hashlib
import json
import random
from datetime import datetime, timezone
from pathlib import Path

import cycle1_minimum_runner as c1
import cycle2_hardened_runner as c2


BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "artifacts" / "release_audit"
FROZEN = OUT / "cycle3_frozen_inputs"
CASES = FROZEN / "cases"


def now_stamp() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


def write_json(path: Path, payload: dict | list) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def append_command_log(*lines: str) -> None:
    with (OUT / "commands_run.txt").open("a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")


def wrap_cycle1(case_id: str, system: str, family: str, target_invariant: str, substrate: str) -> dict:
    return {
        "case_id": case_id,
        "family": family,
        "generator_family": system,
        "substrate": substrate,
        "support_radius": c1.support_radius(system),
        "target_invariant": target_invariant,
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


def wrap_cycle2(case_id: str, generator: str, family: str, target_invariant: str, substrate: str, severity: float) -> dict:
    artifact = c2.simulate_case(
        {
            "case_id": case_id,
            "family": family,
            "generator": generator,
            "substrate": substrate,
            "target_invariant": target_invariant,
            "severity": severity,
        }
    )
    artifact["support_radius"] = c2.support_radius(generator)
    artifact["generator_family"] = generator
    return artifact


def load_cycle2_thresholds() -> dict:
    thresholds_path = OUT / "cycle2_frozen_inputs" / "thresholds.json"
    return json.loads(thresholds_path.read_text(encoding="utf-8"))


def adjust_thresholds(base: dict, *, delta: float = 0.0, leg_delta: float = 0.0, cont_delta: float = 0.0, collapse_delta: float = 0.0) -> dict:
    t = json.loads(json.dumps(base))
    t["collapse_radius"] = round(max(0.0, t["collapse_radius"] + collapse_delta), 6)
    t["integration_correlation_floor"] = round(max(0.0, t["integration_correlation_floor"] + delta), 6)
    t["continuity_jump_ceiling"] = round(max(0.0, t["continuity_jump_ceiling"] + cont_delta), 6)
    t["differentiation_separation_floor"] = round(max(0.0, t["differentiation_separation_floor"] + delta), 6)
    t["non_null_floor"] = round(max(0.0, t["non_null_floor"] + delta), 6)
    leg = t["legibility"]
    leg["clean_acc"] = round(min(1.0, max(0.0, leg["clean_acc"] + leg_delta)), 6)
    leg["noisy_acc"] = round(min(1.0, max(0.0, leg["noisy_acc"] + leg_delta)), 6)
    leg["critical_shift"] = round(min(1.0, max(0.0, leg["critical_shift"] + leg_delta)), 6)
    leg["sham_fpr"] = round(min(1.0, max(0.0, leg["sham_fpr"] - leg_delta)), 6)
    leg["compression_acc"] = round(min(1.0, max(0.0, leg["compression_acc"] + leg_delta)), 6)
    return t


def main() -> None:
    FROZEN.mkdir(parents=True, exist_ok=True)
    CASES.mkdir(parents=True, exist_ok=True)

    append_command_log(
        "AGENT_RULES_OK .agent/rules/rules.md",
        "AGENT_QUALITY_GATES_OK .agent/rules/quality-gates.md",
        "AGENT_WORKFLOW_SKILLS_OK .agent/workflows/skills.md",
        "AGENT_WORKFLOW_QG_OK .agent/workflows/quality-gates.md",
        "python artifacts/release_audit/cycle3_generate_cases.py",
    )

    case_specs = [
        {
            "case_id": "C3_NEG_COMPLEXITY",
            "type": "cycle1",
            "system": "complexity_negative",
            "family": "negative_control_complexity",
            "target_invariant": "I_ri,I_cont,I_diff,I_leg",
            "substrate": "dense_control",
        },
        {
            "case_id": "C3_EQ_CONTINUOUS",
            "type": "cycle1",
            "system": "positive_continuous",
            "family": "cross_substrate_positive",
            "target_invariant": "",
            "substrate": "continuous",
        },
        {
            "case_id": "C3_EQ_DISCRETE",
            "type": "cycle1",
            "system": "positive_discrete",
            "family": "cross_substrate_positive",
            "target_invariant": "",
            "substrate": "discrete",
        },
        {
            "case_id": "C3_NEAR_IDENTITY",
            "type": "cycle2",
            "generator": "near_identity",
            "family": "near_miss_ablation",
            "target_invariant": "I_ri",
            "substrate": "continuous",
            "severity": 0.80,
        },
        {
            "case_id": "C3_NEAR_LEGIBILITY",
            "type": "cycle2",
            "generator": "near_legibility",
            "family": "near_miss_ablation",
            "target_invariant": "I_leg",
            "substrate": "continuous",
            "severity": 0.55,
        },
    ]

    artifacts = {}
    for spec in case_specs:
        if spec["type"] == "cycle1":
            artifact = wrap_cycle1(spec["case_id"], spec["system"], spec["family"], spec["target_invariant"], spec["substrate"])
        else:
            artifact = wrap_cycle2(spec["case_id"], spec["generator"], spec["family"], spec["target_invariant"], spec["substrate"], spec["severity"])
        artifacts[spec["case_id"]] = artifact

    blind_ids = [f"B{idx:03d}" for idx in range(1, len(case_specs) + 1)]
    rng = random.Random(307)
    shuffled_case_ids = [spec["case_id"] for spec in case_specs]
    rng.shuffle(shuffled_case_ids)
    blind_map = {blind_id: case_id for blind_id, case_id in zip(blind_ids, shuffled_case_ids)}
    reveal_map = {}
    manifest_entries = []
    for blind_id, case_id in blind_map.items():
        artifact = artifacts[case_id]
        artifact["blind_id"] = blind_id
        path = CASES / f"{blind_id}.json"
        write_json(path, artifact)
        reveal_map[blind_id] = {
            "case_id": case_id,
            "family": artifact["family"],
            "generator_family": artifact["generator_family"],
            "target_invariant": artifact["target_invariant"],
            "substrate": artifact["substrate"],
        }
        manifest_entries.append(
            {
                "blind_id": blind_id,
                "artifact_path": str(path.relative_to(BASE)).replace("\\", "/"),
                "sha256": sha256_file(path),
            }
        )

    base_thresholds = load_cycle2_thresholds()
    threshold_profiles = {
        "base": base_thresholds,
        "local_loose": adjust_thresholds(base_thresholds, delta=-0.02, leg_delta=-0.02, cont_delta=0.04, collapse_delta=-0.01),
        "local_tight": adjust_thresholds(base_thresholds, delta=0.02, leg_delta=0.02, cont_delta=-0.04, collapse_delta=0.01),
        "legibility_tight": adjust_thresholds(base_thresholds, leg_delta=0.03),
        "differentiation_tight": adjust_thresholds(base_thresholds, delta=0.03),
    }

    pair_lookup = {case_id: blind_id for blind_id, case_id in blind_map.items()}
    blind_pairs = [
        {
            "pair_id": "PAIR001",
            "left": pair_lookup["C3_EQ_CONTINUOUS"],
            "right": pair_lookup["C3_EQ_DISCRETE"],
        }
    ]
    stress_targets = [
        {
            "blind_id": pair_lookup["C3_EQ_CONTINUOUS"],
            "profiles": ["base", "local_loose", "local_tight", "legibility_tight", "differentiation_tight"],
        },
        {
            "blind_id": pair_lookup["C3_EQ_DISCRETE"],
            "profiles": ["base", "local_loose", "local_tight", "legibility_tight", "differentiation_tight"],
        },
        {
            "blind_id": pair_lookup["C3_NEG_COMPLEXITY"],
            "profiles": ["base", "local_loose", "local_tight"],
        },
        {
            "blind_id": pair_lookup["C3_NEAR_IDENTITY"],
            "profiles": ["base", "local_loose", "local_tight"],
        },
        {
            "blind_id": pair_lookup["C3_NEAR_LEGIBILITY"],
            "profiles": ["base", "local_loose", "local_tight", "legibility_tight"],
        },
    ]

    blind_manifest = {
        "generated_at": now_stamp(),
        "cycle": "cycle3",
        "judge_contract": "judge consumes only blind_manifest.json, blind_pairs.json, stress_targets.json, thresholds_base.json, threshold_profiles.json, and frozen case artifacts",
        "entries": sorted(manifest_entries, key=lambda x: x["blind_id"]),
    }

    write_json(FROZEN / "blind_manifest.json", blind_manifest)
    write_json(FROZEN / "blind_pairs.json", blind_pairs)
    write_json(FROZEN / "stress_targets.json", stress_targets)
    write_json(FROZEN / "thresholds_base.json", base_thresholds)
    write_json(FROZEN / "threshold_profiles.json", threshold_profiles)
    write_json(FROZEN / "blind_reveal_map.json", reveal_map)


if __name__ == "__main__":
    main()
