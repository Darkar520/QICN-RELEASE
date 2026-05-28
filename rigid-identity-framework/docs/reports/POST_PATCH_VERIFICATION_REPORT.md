# Post-Patch Verification Report

Date: 2026-05-26T21:10:12Z

## Boundary

This report records command outcomes after a conservative hardening patch. It does not certify theorem truth, empirical support, external adjudication, consciousness, phenomenality, identity transfer, agency, moral status, or bridge admissibility.


## Command: node scripts/verify-canonical-integrity.cjs
```text
{
  "output": "_build/canonical_hardening/canonical_integrity_check.json",
  "artifact_role": "canonical_integrity_check",
  "checked_at": "2026-05-26T21:10:12.442Z",
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
  "checked_at": "2026-05-26T21:10:12.504Z",
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
  "checked_at": "2026-05-26T21:10:12.600Z",
  "status": "PASS",
  "bundle": {
    "bundleDir": "_build/canonical_release_bundle_2026-05-26T21-10-12-564Z",
    "manifestPath": "_build/canonical_release_bundle_2026-05-26T21-10-12-564Z/canonical_release_manifest.json"
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

## Command: npm run verify:preregistration-coverage
```text

> qicn-rigid-identity-framework@0.0.0-fcr verify:preregistration-coverage
> node scripts/validate-preregistration-coverage.js

[PASS] 14/14 predictions have preregistration coverage.
EXIT_CODE=0
```

## Command: npm run lint:nonclaims
```text

> qicn-rigid-identity-framework@0.0.0-fcr lint:nonclaims
> node scripts/lint-nonclaims.js

Non-claim lint: 0 violations.
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
  "seed_material_policy": {
    "status": "frozen_explicit_salt_policy",
    "material": "hash({base_seed, role, scenario_salt, generator_version})",
    "scenario_id_policy": "scenario id is metadata only and must not affect PRNG material",
    "rename_invariance_required": true
  },
  "checked_scenario_ids": 6,
  "leaked_scenario_ids": [],
  "missing_role_models": [],
  "missing_scenario_salts": [],
  "rename_invariance_failures": [],
  "boundary": "This audit checks code-level scenario-label separation and rename invariance only. It does not prove epistemic blinding or empirical independence."
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
  "freeze_sha256": "5249ba6ef415a46ce6d3e5c01c558569fbb4dad9edf4e4206ee2a8e8f581033e",
  "controls_total": 5,
  "controls_passed": 5,
  "seeds_reviewed": [
    "cleanroom_seed_001",
    "cleanroom_holdout_002"
  ]
}
EXIT_CODE=0
```

## Command: npm run test:adversarial-negative-controls
```text

> qicn-rigid-identity-framework@0.0.0-fcr test:adversarial-negative-controls
> node scripts/run-adversarial-negative-controls.js

====================================================
QICN Adversarial Negative Control Search
====================================================
Wrote docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_DECISION_RECORD.json
Wrote docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md
Status: adversarial_negative_controls_pass
Boundary: internal synthetic negative-control search only; no empirical support or external adjudication.
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
Compile status: compiled
EXIT_CODE=0
```

## Modified files
```text
artifacts/pred-ext-01/v3_cleanroom_synthetic_001/decision_record.json
docs/CLAIM_STATUS_POLICY.md
docs/EXTERNAL_REPLICATION_PROTOCOL.md
docs/EXTERNAL_REPLICATION_PROTOCOL_v2.md
docs/RIVAL_MODEL_REGISTRY.md
docs/preregistrations/PRED-EXT-01_freeze_v3.json
docs/protocols/EXTERNAL_EMPIRICAL_CAMPAIGN_MINIMAL.md
docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_DECISION_RECORD.json
docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md
docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md
docs/reports/FCR_V17_1_HARDENING_PATCH_REPORT.md
docs/reports/FCR_V17_ADVERSARIAL_HARDENING_REPORT.md
docs/reports/GENERATOR_INDEPENDENCE_AUDIT.md
docs/reports/I_INT_CURATION_OVERLAY_v1.json
docs/reports/I_INT_STATUS_UPDATE.md
docs/reports/MONOLITHIC_BUILD_REPORT.md
docs/reports/POST_PATCH_VERIFICATION_REPORT.md
docs/reports/PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json
docs/reports/PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json
docs/reports/PRED_11_INTERNAL_EXECUTION_DECISION_RECORD.json
docs/reports/PRED_EXT_01_CLEANROOM_DECISION_RECORD.json
docs/reports/REGISTRY_CURATION_BATCH_002_SUPERSEDED_NOTE.md
docs/reports/REGISTRY_CURATION_BATCH_003_HUMAN_REVIEW_SCAFFOLD.md
docs/reports/REGISTRY_CURATION_BATCH_003_INDEX.json
docs/reports/THEOREM_ATLAS.md
docs/templates/EXTERNAL_DATASET_MANIFEST.template.json
docs/templates/EXTERNAL_REPLICATION_DECISION_RECORD.template.json
monolithic/QICN_MONOLITHIC.aux
monolithic/QICN_MONOLITHIC.bcf
monolithic/QICN_MONOLITHIC.log
monolithic/QICN_MONOLITHIC.out
monolithic/QICN_MONOLITHIC.pdf
monolithic/QICN_MONOLITHIC.run.xml
monolithic/QICN_MONOLITHIC.tex
monolithic/QICN_MONOLITHIC.toc
monolithic/build/sections/01-basecore.tex
monolithic/build/sections/02-paper-1.tex
monolithic/build/sections/03-paper-2.tex
monolithic/build/sections/04-paper-3.tex
monolithic/build/sections/05-paper-4.tex
monolithic/build/sections/06-paper-5.tex
monolithic/build/sections/07-paper-6.tex
monolithic/build/sections/08-paper-7.tex
monolithic/build/sections/09-paper-8.tex
monolithic/build/sections/10-paper-9.tex
monolithic/build/sections/11-paper-10.tex
monolithic/build/sections/12-bridge-paper.tex
monolithic/compile.ps1
monolithic/preamble/packages.tex
monolithic/preamble/setup.tex
package.json
registry/macros.jsonl
registry/theorems.jsonl
scripts/audit-generator-independence.js
scripts/build-monolithic-volume.js
scripts/generate-curation-batch.js
scripts/lib/adversarial-negative-controls.js
scripts/lib/external-trace-generator.js
scripts/lib/pred-ext-01-evaluator.js
scripts/lib/trace-memory-rival.js
scripts/registry-lib.js
scripts/run-adversarial-negative-controls.js
scripts/run-pred-ext-01-cleanroom.js
scripts/test-external-trace-generator.js
scripts/test-trace-memory-rival.js
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

## Command: npm run audit:extractor-diagnostic
```text

> qicn-rigid-identity-framework@0.0.0-fcr audit:extractor-diagnostic
> node scripts/verify-registry-reproducibility.js

====================================================
QICN Extractor Reproducibility Diagnostic
====================================================
Missing-source formal entries: 0
Missing-source macro entries: 0
Residual formal delta: 0
Residual macro delta: 0
Wrote docs/reports/EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md
EXIT_CODE=0
```

## Packaging cleanup

Build cache/log files were removed from the patched archive after successful verification:

```text
monolithic/build/
monolithic/QICN_MONOLITHIC.aux
monolithic/QICN_MONOLITHIC.bcf
monolithic/QICN_MONOLITHIC.log
monolithic/QICN_MONOLITHIC.out
monolithic/QICN_MONOLITHIC.run.xml
monolithic/QICN_MONOLITHIC.toc
```

The monolithic builder can regenerate these artifacts with `npm run compile:monolithic`.

## Final patch files of interest

```text
CHANGELOG_QICN_PATCH.md
PATCH_AUDIT_SUMMARY.md
docs/CLAIM_STATUS_POLICY.md
docs/EXTERNAL_REPLICATION_PROTOCOL_v2.md
docs/preregistrations/PRED-EXT-01_freeze_v3.json
docs/protocols/EXTERNAL_EMPIRICAL_CAMPAIGN_MINIMAL.md
docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md
docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md
docs/reports/FCR_V17_1_HARDENING_PATCH_REPORT.md
docs/reports/GENERATOR_INDEPENDENCE_AUDIT.md
docs/reports/I_INT_STATUS_UPDATE.md
docs/reports/POST_PATCH_BASELINE_REPORT.md
docs/reports/POST_PATCH_VERIFICATION_REPORT.md
docs/reports/REGISTRY_CURATION_BATCH_003_HUMAN_REVIEW_SCAFFOLD.md
docs/templates/EXTERNAL_DATASET_MANIFEST.template.json
docs/templates/EXTERNAL_REPLICATION_DECISION_RECORD.template.json
scripts/lib/adversarial-negative-controls.js
scripts/run-adversarial-negative-controls.js
```
