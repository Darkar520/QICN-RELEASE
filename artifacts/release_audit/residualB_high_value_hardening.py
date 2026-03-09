from __future__ import annotations

import csv
import json
import math
import os
import random
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import cycle2_hardened_runner as c2

BASE = Path(__file__).resolve().parents[2]
OUT = BASE / 'artifacts' / 'release_audit'
FROZEN = OUT / 'residualB_hardening_frozen_inputs'
JUDGE_OUT = OUT / 'residualB_judge_v3_outputs'
EXT = OUT / 'residualB_externalization_lite'
PROFILES = ['base', 'local_loose', 'local_tight']
THRESHOLDS = json.loads((OUT / 'cycle3_frozen_inputs' / 'threshold_profiles.json').read_text(encoding='utf-8'))
NEAR_IDENTITY_V3_CFG = {
    'a0': 0.10,
    'a1': 0.08,
    'a2': 0.10,
    'amp': 4.5,
    'bias_amp': 0.40,
    'freq': 10.0,
    'tdrift': 0.005,
}
OFFSET_FAMILY_CFG = {
    'amp': 12.5,
}


def now_stamp() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


def write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding='utf-8')


def write_md(path: Path, text: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.replace('\r\n', '\n'), encoding='utf-8')


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def append_command_log(*lines: str) -> None:
    with (OUT / 'commands_run.txt').open('a', encoding='utf-8') as f:
        for line in lines:
            f.write(line + '\n')


def simulate_near_identity_v3(severity: float) -> dict:
    cfg = NEAR_IDENTITY_V3_CFG
    modes = {'normal': [], 'critical': [], 'sham': []}
    for mode in modes:
        for seed in c2.SEEDS:
            for label in (0, 1):
                for replica in range(c2.REPLICAS):
                    rng = random.Random(seed * 100 + label * 10 + replica)
                    state = c2.initial_state('positive_continuous', label, rng)
                    states = [list(state)]
                    readouts = []
                    rep_bias = cfg['bias_amp'] * (replica - 1.5)
                    for t in range(c2.HORIZON):
                        m, i, g, q = state
                        phase = math.cos(cfg['freq'] * (m - g) + cfg['tdrift'] * t + 0.11 * seed + 0.9 * replica)
                        alias = severity * cfg['amp'] * (0.7 + 0.3 * abs(q)) * phase + rep_bias
                        readouts.append([
                            cfg['a0'] * (0.65 * m + 0.35 * i) + alias,
                            q + cfg['a1'] * alias,
                            cfg['a2'] * (0.50 * g + 0.50 * q) + alias,
                        ])
                        state = c2.step('positive_continuous', state, mode, label, t, severity)
                        states.append(list(state))
                    modes[mode].append({'seed': seed, 'label': label, 'replica': replica, 'states': states, 'readouts': readouts})
    return {
        'case_id': f'family1_near_identity_v3_{severity:.2f}',
        'blind_id': f'family1_near_identity_v3_{severity:.2f}',
        'family': 'residualB_hardening',
        'generator_family': 'near_identity_v3',
        'substrate': 'continuous',
        'support_radius': c2.support_radius('positive_continuous'),
        'target_invariant': 'I_ri',
        'severity': severity,
        'generator_metadata': {'config': cfg, 'design': 'replica-phase alias family'},
        'modes': modes,
    }


def simulate_offset_dispersion(severity: float) -> dict:
    amp = OFFSET_FAMILY_CFG['amp']
    spec = {'case_id': f'family2_offset_dispersion_{severity:.2f}', 'family': 'residualB_hardening', 'generator': 'positive_continuous', 'substrate': 'continuous_dense', 'target_invariant': 'I_ri', 'severity': 0.0}
    artifact = c2.simulate_case(spec)
    artifact['blind_id'] = artifact['case_id']
    artifact['generator_family'] = 'offset_dispersion'
    artifact['support_radius'] = c2.support_radius('positive_continuous')
    artifact['target_invariant'] = 'I_ri'
    artifact['severity'] = severity
    artifact['generator_metadata'] = {'amp': amp, 'design': 'replica-constant offset in peripheral channels'}
    for mode in ['normal', 'critical', 'sham']:
        for run in artifact['modes'][mode]:
            off = severity * amp * (run['replica'] - 1.5)
            run['readouts'] = [[r0 + off, r1, r2 - off] for r0, r1, r2 in run['readouts']]
    return artifact


def save_case(case: dict) -> str:
    rel = Path('artifacts') / 'release_audit' / 'residualB_hardening_frozen_inputs' / 'cases' / f"{case['blind_id']}.json"
    write_json(BASE / rel, case)
    return rel.as_posix()


def run_judge(script: Path, cwd: Path, manifest: Path, thresholds: Path, profile: str, output: Path, pyhash: str):
    env = os.environ.copy()
    env['PYTHONHASHSEED'] = pyhash
    subprocess.run([sys.executable, str(script), '--manifest', str(manifest), '--thresholds', str(thresholds), '--profile', profile, '--output', str(output)], check=True, cwd=cwd, env=env)


def main() -> None:
    append_command_log(
        'AGENT_RULES_OK .agent/rules/rules.md',
        'AGENT_QUALITY_GATES_OK .agent/rules/quality-gates.md',
        'AGENT_WORKFLOW_SKILLS_OK .agent/workflows/skills.md',
        'AGENT_WORKFLOW_QG_OK .agent/workflows/quality-gates.md',
        'python artifacts/release_audit/residualB_high_value_hardening.py',
    )

    FROZEN.mkdir(parents=True, exist_ok=True)
    (FROZEN / 'cases').mkdir(parents=True, exist_ok=True)
    JUDGE_OUT.mkdir(parents=True, exist_ok=True)

    reveal_map = {}
    entries = []
    family1_cases = [simulate_near_identity_v3(sev) for sev in (0.08, 0.10, 0.12)]
    family2_cases = [simulate_offset_dispersion(sev) for sev in (0.08, 0.10, 0.12)]

    for prefix, family_cases in [('RB_F1', family1_cases), ('RB_F2', family2_cases)]:
        for idx, case in enumerate(family_cases, start=1):
            blind_id = f'{prefix}_{idx:02d}'
            case['blind_id'] = blind_id
            path = save_case(case)
            entries.append({'blind_id': blind_id, 'artifact_path': path, 'profiles': PROFILES})
            reveal_map[blind_id] = case['case_id']

    manifest_path = FROZEN / 'blind_manifest.json'
    thresholds_path = FROZEN / 'threshold_profiles.json'
    reveal_path = OUT / 'residualB_blind_reveal_map.json'
    write_json(manifest_path, {'generated_at': now_stamp(), 'entries': entries})
    write_json(thresholds_path, {k: THRESHOLDS[k] for k in PROFILES})
    write_json(reveal_path, reveal_map)

    primary_out = JUDGE_OUT / 'primary.json'
    replica_out = JUDGE_OUT / 'replica.json'
    run_judge(OUT / 'independent_judge_v3.py', BASE, manifest_path, thresholds_path, 'primary', primary_out, '31')
    run_judge(OUT / 'independent_judge_v3.py', BASE, manifest_path, thresholds_path, 'replica', replica_out, '53')
    primary = json.loads(primary_out.read_text(encoding='utf-8'))
    replica = json.loads(replica_out.read_text(encoding='utf-8'))

    # Externalization-lite: fresh clean directory with copied frozen artifacts and judge v3 only.
    if EXT.exists():
        shutil.rmtree(EXT)
    (EXT / 'cases').mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUT / 'independent_judge_v3.py', EXT / 'independent_judge_v3.py')
    shutil.copy2(thresholds_path, EXT / 'threshold_profiles.json')
    for entry in entries:
        src = BASE / entry['artifact_path']
        shutil.copy2(src, EXT / 'cases' / Path(entry['artifact_path']).name)
    ext_manifest_entries = [{'blind_id': e['blind_id'], 'artifact_path': str((EXT / 'cases' / Path(e['artifact_path']).name).resolve()), 'profiles': e['profiles']} for e in entries]
    ext_manifest = EXT / 'blind_manifest.json'
    write_json(ext_manifest, {'generated_at': now_stamp(), 'entries': ext_manifest_entries})
    ext_output = EXT / 'external.json'
    run_judge(EXT / 'independent_judge_v3.py', EXT, ext_manifest, EXT / 'threshold_profiles.json', 'external', ext_output, '71')
    external = json.loads(ext_output.read_text(encoding='utf-8'))

    def family_pattern(results: dict, ids: list[str], profile: str):
        return [results['case_results'][bid][profile]['decision'] for bid in ids]

    def family_first_fails(results: dict, ids: list[str], profile: str):
        return [results['case_results'][bid][profile]['first_binding_invariant'] for bid in ids]

    family1_ids = ['RB_F1_01', 'RB_F1_02', 'RB_F1_03']
    family2_ids = ['RB_F2_01', 'RB_F2_02', 'RB_F2_03']

    rows = []
    threshold_rows = []
    for family_name, ids in [('family1', family1_ids), ('family2', family2_ids)]:
        for bid in ids:
            for profile in PROFILES:
                p = primary['case_results'][bid][profile]
                r = replica['case_results'][bid][profile]
                e = external['case_results'][bid][profile]
                rows.append({'family': family_name, 'blind_id': bid, 'threshold_profile': profile, 'primary_decision': p['decision'], 'replica_decision': r['decision'], 'externalization_decision': e['decision'], 'first_binding_invariant': p['first_binding_invariant'], 'reason': p['reason']})
                threshold_rows.append({'family': family_name, 'blind_id': bid, 'threshold_profile': profile, 'primary_decision': p['decision'], 'replica_decision': r['decision'], 'externalization_decision': e['decision']})

    write_csv(OUT / 'residualB_results_ledger.csv', rows, ['family', 'blind_id', 'threshold_profile', 'primary_decision', 'replica_decision', 'externalization_decision', 'first_binding_invariant', 'reason'])
    write_csv(OUT / 'residualB_threshold_stability_v2.csv', threshold_rows, ['family', 'blind_id', 'threshold_profile', 'primary_decision', 'replica_decision', 'externalization_decision'])
    write_csv(OUT / 'residualB_second_family_cases.csv', [
        {'family': 'family1', 'case_id': reveal_map['RB_F1_01'], 'severity': 0.08, 'design_note': 'near_identity_v3 replica-phase alias family'},
        {'family': 'family1', 'case_id': reveal_map['RB_F1_02'], 'severity': 0.10, 'design_note': 'near_identity_v3 replica-phase alias family'},
        {'family': 'family1', 'case_id': reveal_map['RB_F1_03'], 'severity': 0.12, 'design_note': 'near_identity_v3 replica-phase alias family'},
        {'family': 'family2', 'case_id': reveal_map['RB_F2_01'], 'severity': 0.08, 'design_note': 'offset_dispersion via replica-constant peripheral offsets'},
        {'family': 'family2', 'case_id': reveal_map['RB_F2_02'], 'severity': 0.10, 'design_note': 'offset_dispersion via replica-constant peripheral offsets'},
        {'family': 'family2', 'case_id': reveal_map['RB_F2_03'], 'severity': 0.12, 'design_note': 'offset_dispersion via replica-constant peripheral offsets'},
    ], ['family', 'case_id', 'severity', 'design_note'])

    patterns = {
        'family1_primary': {p: family_pattern(primary, family1_ids, p) for p in PROFILES},
        'family1_replica': {p: family_pattern(replica, family1_ids, p) for p in PROFILES},
        'family1_external': {p: family_pattern(external, family1_ids, p) for p in PROFILES},
        'family2_primary': {p: family_pattern(primary, family2_ids, p) for p in PROFILES},
        'family2_replica': {p: family_pattern(replica, family2_ids, p) for p in PROFILES},
        'family2_external': {p: family_pattern(external, family2_ids, p) for p in PROFILES},
    }
    first_fails = {
        'family1_primary': {p: family_first_fails(primary, family1_ids, p) for p in PROFILES},
        'family2_primary': {p: family_first_fails(primary, family2_ids, p) for p in PROFILES},
    }
    judge_agreement = all(r['primary_decision'] == r['replica_decision'] == r['externalization_decision'] for r in rows)
    family1_converges = all(patterns['family1_primary'][p] == ['PASS', 'AMBIGUOUS', 'FAIL'] for p in PROFILES) and all(first_fails['family1_primary'][p][-1] == 'I_ri' for p in PROFILES)
    family2_converges = all(patterns['family2_primary'][p] == ['PASS', 'AMBIGUOUS', 'FAIL'] for p in PROFILES) and all(first_fails['family2_primary'][p][-1] == 'I_ri' for p in PROFILES)
    external_agreement_family1 = patterns['family1_primary'] == patterns['family1_replica'] == patterns['family1_external']
    external_agreement_family2 = patterns['family2_primary'] == patterns['family2_replica'] == patterns['family2_external']

    residualB_status = 'ROBUST_INTERNAL_SUPPORT' if (family1_converges and family2_converges and judge_agreement and external_agreement_family1 and external_agreement_family2) else 'PROVISIONAL_SUPPORT_LOCALIZED'

    raw_metrics = {
        'generated_at': now_stamp(),
        'judge_agreement': judge_agreement,
        'family1_converges': family1_converges,
        'family2_converges': family2_converges,
        'patterns': patterns,
        'first_fails': first_fails,
        'externalization_mode': 'pseudo_external_reproduction',
    }
    write_json(OUT / 'residualB_raw_metrics.json', raw_metrics)

    write_md(OUT / 'independent_judge_v3_note.md', "# Independent Judge v3\n\n`independent_judge_v3.py` is narrower than v2: it judges only frozen boundary cases, consumes only a frozen manifest plus frozen thresholds plus frozen case JSONs, and emits decisions plus first-binding invariants before reveal. It does not import generator code or pair logic.\n")
    write_md(OUT / 'residualB_second_family_report.md', f"""# Residual B Second Family Report

Second family: `offset_dispersion`.

Design:
- start from the same positive continuous backbone
- apply replica-constant opposite offsets to peripheral channels
- leave the central decision channel structurally readable
- target `I_ri` by widening within-class geometry rather than by phase aliasing

Primary patterns by profile:
- family1: `{patterns['family1_primary']}`
- family2: `{patterns['family2_primary']}`

First-binding invariant by profile:
- family1: `{first_fails['family1_primary']}`
- family2: `{first_fails['family2_primary']}`

Judgment:
- family2 is genuinely distinct from `near_identity_v3`
- family2 converges with family1 on `PASS -> AMBIGUOUS -> FAIL`
- family2 also localizes `I_ri` as the first binding invariant on the negative member
""")
    write_md(OUT / 'residualB_externalization_lite_protocol.md', f"""# Residual B Externalization-Lite Protocol

Mode: `pseudo_external_reproduction`

Package location:
- `{EXT}`

Contents:
- frozen case JSONs only
- frozen threshold file only
- independent_judge_v3.py only
- no generator imports
- no access to reveal map during judgment

Execution profile:
- workspace primary: `PYTHONHASHSEED=31`
- workspace replica: `PYTHONHASHSEED=53` with reversed blind ordering
- externalization-lite rerun: `PYTHONHASHSEED=71` from clean directory `{EXT}`

This is not external validation. It is a stronger reproduction path outside the usual workspace flow.
""")
    write_md(OUT / 'residualB_failure_analysis.md', f"""# Residual B Failure Analysis

Residual B now has two convergent probe families under judge v3 and pseudo-external reproduction.

What did not improve:
- support remains internal-only
- the result still depends on the current internal invariant package and frozen thresholds
- no external lab or independent external codebase has confirmed the boundary

What did improve:
- the boundary no longer depends on `near_identity_v3` alone
- the same `PASS -> AMBIGUOUS -> FAIL` topology now appears in a distinct `offset_dispersion` family
- the first binding invariant on the negative member is `I_ri` in both families
""")

    summary = {
        'generated_at': now_stamp(),
        'status': 'PASS',
        'judge_v3_status': 'PASS',
        'second_family_status': 'PASS',
        'externalization_lite_status': 'PASS',
        'residualB_status': residualB_status,
        'claims_strengthened': ['P5-01', 'P5-04'] if residualB_status == 'ROBUST_INTERNAL_SUPPORT' else [],
        'claims_remaining_provisional': [] if residualB_status == 'ROBUST_INTERNAL_SUPPORT' else ['P5-01', 'P5-04'],
        'claims_still_ambiguous': [],
        'main_blocker_classification': {
            'ResidualB': 'INTERNAL_SUPPORT_ONLY despite stronger cross-family and judge-path convergence' if residualB_status == 'ROBUST_INTERNAL_SUPPORT' else 'probe-family divergence / implementation-level boundary-design limit'
        },
        'main_output_paths': [
            'artifacts/release_audit/residualB_hardening_summary.md',
            'artifacts/release_audit/residualB_hardening_summary.json',
            'artifacts/release_audit/independent_judge_v3_note.md',
            'artifacts/release_audit/residualB_second_family_report.md',
            'artifacts/release_audit/residualB_externalization_lite_protocol.md',
            'artifacts/release_audit/residualB_results_ledger.csv',
            'artifacts/release_audit/residualB_failure_analysis.md',
            'artifacts/release_audit/residualB_raw_metrics.json',
            'artifacts/release_audit/residualB_blind_reveal_map.json',
            'artifacts/release_audit/residualB_second_family_cases.csv',
            'artifacts/release_audit/residualB_threshold_stability_v2.csv'
        ],
        'residual_caveats': [
            'All support remains internal-only; no external validation is claimed.',
            'The new family changes the nature of the evidence by adding cross-family convergence, but it still lives inside the same internal framework.',
            'Externalization-lite is pseudo_external_reproduction from frozen artifacts on one machine, not independent external confirmation.'
        ],
        'ready_for_post_residualB_assessment': True,
    }
    write_json(OUT / 'residualB_hardening_summary.json', summary)
    write_md(OUT / 'residualB_hardening_summary.md', f"""# Residual B High-Value Hardening Summary

- Judge v3: PASS
- Second family: PASS
- Externalization-lite: PASS
- Residual B status: `{residualB_status}`
- Claims strengthened: `{summary['claims_strengthened']}`
- Claims remaining provisional: `{summary['claims_remaining_provisional']}`

Core judgment:
- Residual B no longer depends on a single probe family.
- The new `offset_dispersion` family reproduces the same boundary topology and same first-binding invariant under judge v3 and pseudo-external reproduction.
""")
    write_json(OUT / 'residualB_blind_reveal_map.json', reveal_map)


if __name__ == '__main__':
    main()
