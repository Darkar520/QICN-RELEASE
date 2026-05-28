# Post-Patch Baseline Report (pre-modification snapshot)

Date: 2026-05-26T20:58:57Z

## Repository roots
- outer root: `QICN-RELEASE-main`
- framework root: `QICN-RELEASE-main/rigid-identity-framework`

## File inventory summary
```text
total_files=296
docs/preregistrations/PRED-01_prereg_v0.md
docs/preregistrations/PRED-02_freeze_v1.json
docs/preregistrations/PRED-02_freeze_v2.json
docs/preregistrations/PRED-02_prereg_v0.md
docs/preregistrations/PRED-02_prereg_v1.md
docs/preregistrations/PRED-02_prereg_v2.md
docs/preregistrations/PRED-03_prereg_v0.md
docs/preregistrations/PRED-04a_prereg_v0.md
docs/preregistrations/PRED-04b_prereg_v0.md
docs/preregistrations/PRED-04c_freeze_v2.json
docs/preregistrations/PRED-04c_freeze_v3.json
docs/preregistrations/PRED-04c_prereg_v1.md
docs/preregistrations/PRED-04c_prereg_v2.md
docs/preregistrations/PRED-04c_prereg_v3.md
docs/preregistrations/PRED-05_prereg_v0.md
docs/preregistrations/PRED-06_prereg_v1.md
docs/preregistrations/PRED-07_prereg_v0.md
docs/preregistrations/PRED-08_prereg_v0.md
docs/preregistrations/PRED-09_prereg_v0.md
docs/preregistrations/PRED-10_prereg_v0.md
docs/preregistrations/PRED-11_freeze_v1.json
docs/preregistrations/PRED-11_freeze_v2.json
docs/preregistrations/PRED-11_prereg_v0.md
docs/preregistrations/PRED-11_prereg_v1.md
docs/preregistrations/PRED-11_prereg_v2.md
docs/preregistrations/PRED-EXT-01_freeze_v1.json
docs/preregistrations/PRED-EXT-01_freeze_v2.json
docs/preregistrations/PRED-EXT-01_freeze_v3.json
docs/preregistrations/PRED-EXT-01_prereg_v0.md
docs/preregistrations/PRED-EXT-01_prereg_v1.md
docs/preregistrations/PRED-EXT-01_prereg_v2.md
docs/preregistrations/PRED-EXT-01_prereg_v3.md
```

## Available npm scripts
```json
{
  "extract:registry": "node scripts/extract-registry.js",
  "verify:corpus-registry": "node scripts/validate-corpus.js",
  "verify:macro-registry": "node scripts/validate-macros.js",
  "verify:prediction-registry": "node scripts/validate-prediction-registry.js",
  "generate:prereg-scaffolds": "node scripts/generate-preregistration-scaffolds.js",
  "lint:nonclaims": "node scripts/lint-nonclaims.js",
  "extract:claim-ledger": "node scripts/extract-claim-ledger.js",
  "resync:macro-cache": "node scripts/resync-macro-cache.js",
  "test:resync-macro-cache": "node scripts/test-resync-macro-cache.js",
  "audit:extractor-reproducibility": "node scripts/probe-extractor-reproducibility.js",
  "analyze:impact": "node scripts/fcr-impact-analyzer.js",
  "audit:monolithic-risk": "node scripts/verify-monolithic-risk.js",
  "test:tamper-prereg": "node scripts/tamper-inject.js --self-test",
  "report:corpus-health": "node scripts/generate-report.js",
  "verify:coordinate-specs": "node scripts/verify-coordinate-specs.js",
  "rehearse:pred-ext-01": "node scripts/run-pred-ext-01-rehearsal.js",
  "pilot:pred-ext-01": "node scripts/run-pred-ext-01-pilot.js",
  "test:external-trace-generator": "node scripts/test-external-trace-generator.js",
  "cleanroom:pred-ext-01": "node scripts/run-pred-ext-01-cleanroom.js",
  "review:cleanroom-pred-ext-01": "node scripts/cleanroom-reviewer-quarantine.js",
  "audit:generator-independence": "node scripts/audit-generator-independence.js",
  "execute:pred-02": "node scripts/run-pred-02-execution.js",
  "execute:pred-04c": "node scripts/run-pred-04c-execution.js",
  "execute:pred-11": "node scripts/run-pred-11-execution.js",
  "verify:preregistration-coverage": "node scripts/validate-preregistration-coverage.js",
  "build:monolithic": "node scripts/build-monolithic-volume.js",
  "compile:monolithic": "node scripts/build-monolithic-volume.js --compile",
  "generate:curation-batch": "node scripts/generate-curation-batch.js",
  "audit:extractor-diagnostic": "node scripts/verify-registry-reproducibility.js",
  "verify:curation-overlays": "node scripts/verify-curation-overlays.js",
  "test:trace-memory-rival": "node scripts/test-trace-memory-rival.js"
}
```


## Command: node scripts/verify-canonical-integrity.cjs
```text
{
  "output": "_build/canonical_hardening/canonical_integrity_check.json",
  "artifact_role": "canonical_integrity_check",
  "checked_at": "2026-05-26T20:58:57.856Z",
  "status": "PASS",
  "checks": {
    "zip_sha256_match": true,
    "manifest_sha256_match": true,
    "canonical_pdf_count": 25,
    "index_count": 25,
    "freeze_tag_listed_in_audit": true,
    "freeze_snapshot_commit_listed_in_audit": true,
    "claim_registry_entries": 17,
    "layer_count": 6,
    "interface_count": 8,
    "non_canonical_material_physically_separated": true,
    "upstream_pin_status": "resolved"
  },
  "failures": [],
  "warnings": [],
  "provenance_notes": [
    "working_tree_not_clean_at_hardening_start"
  ]
}
EXIT_CODE=0
```

## Command: node scripts/verify-claim-registry.cjs
```text
{
  "output": "_build/canonical_hardening/claim_registry_check.json",
  "artifact_role": "claim_registry_check",
  "checked_at": "2026-05-26T20:58:57.903Z",
  "status": "PASS",
  "counts": {
    "entries": 17,
    "unique_ids": 17,
    "allowed_classes": 6
  },
  "failures": [],
  "warnings": []
}
EXIT_CODE=0
```

## Command: node scripts/verify-canonical-release.cjs
```text
{
  "output": "_build/canonical_hardening/canonical_release_check.json",
  "artifact_role": "canonical_release_check",
  "checked_at": "2026-05-26T20:58:57.979Z",
  "status": "PASS",
  "bundle": {
    "bundleDir": "_build/canonical_release_bundle_2026-05-26T20-58-57-960Z",
    "manifestPath": "_build/canonical_release_bundle_2026-05-26T20-58-57-960Z/canonical_release_manifest.json"
  },
  "failures": [],
  "warnings": []
}
EXIT_CODE=0
```

## Command: npm run extract:registry
```text

> qicn-rigid-identity-framework@0.0.0-fcr extract:registry
> node scripts/extract-registry.js

FCR extraction complete.
version=2026-05-26
formal_entries=699
macro_entries=377
theorems=/mnt/data/qicn_patch_work/QICN-RELEASE-main/rigid-identity-framework/registry/theorems.jsonl
macros=/mnt/data/qicn_patch_work/QICN-RELEASE-main/rigid-identity-framework/registry/macros.jsonl
mode=overwrite
note=This is a structural draft. Epistemic statuses come from environment type plus AUDIT_MASTER_v5 overlays; human mathematical curation is still required.
EXIT_CODE=0
```

## Command: npm run verify:corpus-registry -- --strict-crossrefs
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:corpus-registry
> node scripts/validate-corpus.js --strict-crossrefs

# FCR Validation Report

- Formal entries: 699
- Macro entries: 377
- Theorem entries: 99
- Hypothesis entries: 20
- Conjecture entries: 2
- Audit-overlaid entries: 21
- False-status entries: 0
- Proved-status entries: 232
- Conditional-status entries: 334
- Heuristic-status entries: 122
- Active macro-collision entries: 0
- Active macro-collision groups: 0

## Blockers

None.

## Warnings

None.

EXIT_CODE=0
```

## Command: npm run verify:macro-registry
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:macro-registry
> node scripts/validate-macros.js

# FCR Macro Validation

- Macro entries: 377
- Canonical macro entries: 40
- Blockers: 0
- Warnings: 0

## Blockers
None.

## Warnings
None.
EXIT_CODE=0
```

## Command: npm run audit:extractor-reproducibility
```text

> qicn-rigid-identity-framework@0.0.0-fcr audit:extractor-reproducibility
> node scripts/probe-extractor-reproducibility.js

Wrote docs/reports/EXTRACTOR_REPRODUCIBILITY_AUDIT.md
status=REPRODUCIBLE
formal_registry=699
formal_extracted=699
macro_registry=377
macro_extracted=377
EXIT_CODE=0
```

## Command: npm run verify:prediction-registry
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:prediction-registry
> node scripts/validate-prediction-registry.js

Validated 14 predictions, 0 errors.
Prediction canon map: 11 LaTeX rows, 1 registry extension(s).
EXIT_CODE=0
```

## Command: npm run verify:curation-overlays
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:curation-overlays
> node scripts/verify-curation-overlays.js

====================================================
QICN Registry Curation Overlay Gate
====================================================
[PASS] Validated 1 curation overlay file(s).
EXIT_CODE=0
```

## Command: npm run test:trace-memory-rival
```text

> qicn-rigid-identity-framework@0.0.0-fcr test:trace-memory-rival
> node scripts/test-trace-memory-rival.js

====================================================
QICN Trace-Memory Rival Unit Tests
====================================================
[PASS] trace-memory rival tests passed.
EXIT_CODE=0
```

## Command: npm run test:external-trace-generator
```text

> qicn-rigid-identity-framework@0.0.0-fcr test:external-trace-generator
> node scripts/test-external-trace-generator.js

====================================================
QICN External Trace Generator Tests
====================================================
[PASS] external trace generator tests passed.
EXIT_CODE=0
```

## Command: npm run audit:generator-independence
```text

> qicn-rigid-identity-framework@0.0.0-fcr audit:generator-independence
> node scripts/audit-generator-independence.js

{
  "status": "generator_independence_pass",
  "freeze": "docs/preregistrations/PRED-EXT-01_freeze_v3.json",
  "generator": "scripts/lib/external-trace-generator.js",
  "checked_scenario_ids": 6,
  "leaked_scenario_ids": [],
  "missing_role_models": [],
  "boundary": "This audit checks code-level scenario-label separation only. It does not prove epistemic blinding or empirical independence."
}
EXIT_CODE=0
```

## Command: npm run cleanroom:pred-ext-01
```text

> qicn-rigid-identity-framework@0.0.0-fcr cleanroom:pred-ext-01
> node scripts/run-pred-ext-01-cleanroom.js

====================================================
QICN PRED-EXT-01 Clean-Room Synthetic Runner
====================================================
Wrote artifacts/pred-ext-01/v3_cleanroom_synthetic_001/decision_record.json
Wrote docs/reports/PRED_EXT_01_CLEANROOM_DECISION_RECORD.json
Status: executed_clean_room_synthetic
Verdict: clean_room_synthetic_support_with_holdout_controls_passed
Primary controls: 5/5 passed
Holdout controls: 5/5 passed
Boundary: clean-room synthetic execution only; no empirical support or external adjudication.
EXIT_CODE=0
```

## Command: npm run review:cleanroom-pred-ext-01
```text

> qicn-rigid-identity-framework@0.0.0-fcr review:cleanroom-pred-ext-01
> node scripts/cleanroom-reviewer-quarantine.js

{
  "status": "review_pass",
  "freeze_sha256": "527ed0e1bc171e8e57762ea1dd30fec9c512738ee0a1d74a342b2f0c0fd58c89",
  "controls_total": 5,
  "controls_passed": 5,
  "seeds_reviewed": [
    "cleanroom_seed_001",
    "cleanroom_holdout_002"
  ]
}
EXIT_CODE=0
```

## Command: npm run execute:pred-02
```text

> qicn-rigid-identity-framework@0.0.0-fcr execute:pred-02
> node scripts/run-pred-02-execution.js

PRED-02 status=executed_internal_synthetic
PRED-02 verdict=internal_synthetic_support_with_negative_controls_passed
Wrote docs/reports/PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json
EXIT_CODE=0
```

## Command: npm run execute:pred-04c
```text

> qicn-rigid-identity-framework@0.0.0-fcr execute:pred-04c
> node scripts/run-pred-04c-execution.js

PRED-04c status=executed_internal_synthetic
PRED-04c verdict=internal_synthetic_support_with_negative_controls_passed
Wrote docs/reports/PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json
EXIT_CODE=0
```

## Command: npm run execute:pred-11
```text

> qicn-rigid-identity-framework@0.0.0-fcr execute:pred-11
> node scripts/run-pred-11-execution.js

PRED-11 status=executed_internal_synthetic
PRED-11 verdict=internal_synthetic_support_with_negative_controls_passed
Wrote docs/reports/PRED_11_INTERNAL_EXECUTION_DECISION_RECORD.json
EXIT_CODE=0
```

## Command: npm run test:tamper-prereg
```text

> qicn-rigid-identity-framework@0.0.0-fcr test:tamper-prereg
> node scripts/tamper-inject.js --self-test

{
  "tamper_runs": 90,
  "tamper_rejected_or_quarantined": 90,
  "sham_runs": 30,
  "sham_accepted": 30,
  "decision": "self_test_pass",
  "boundary": "This is a preregistration harness self-test, not empirical validation."
}
EXIT_CODE=0
```

## Command: npm run lint:nonclaims
```text

> qicn-rigid-identity-framework@0.0.0-fcr lint:nonclaims
> node scripts/lint-nonclaims.js

Non-claim lint: 0 violations.
EXIT_CODE=0
```

## Command: npm run verify:preregistration-coverage
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:preregistration-coverage
> node scripts/validate-preregistration-coverage.js

[PASS] 14/14 predictions have preregistration coverage.
EXIT_CODE=0
```

## Command: npm run audit:monolithic-risk
```text

> qicn-rigid-identity-framework@0.0.0-fcr audit:monolithic-risk
> node scripts/verify-monolithic-risk.js

Wrote docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md
EXIT_CODE=0
```

## Command: npm run build:monolithic
```text

> qicn-rigid-identity-framework@0.0.0-fcr build:monolithic
> node scripts/build-monolithic-volume.js

Wrote monolithic/QICN_MONOLITHIC.tex
Wrote docs/reports/MONOLITHIC_BUILD_REPORT.md
Compile status: not_run
EXIT_CODE=0
```

## Command: npm run compile:monolithic
```text

> qicn-rigid-identity-framework@0.0.0-fcr compile:monolithic
> node scripts/build-monolithic-volume.js --compile

Wrote monolithic/QICN_MONOLITHIC.tex
Wrote docs/reports/MONOLITHIC_BUILD_REPORT.md
Compile status: failed
EXIT_CODE=1
```
