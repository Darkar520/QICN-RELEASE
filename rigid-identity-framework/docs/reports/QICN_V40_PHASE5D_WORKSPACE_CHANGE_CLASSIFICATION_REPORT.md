# QICN v40 Phase 5D Workspace Change Classification Report

Status: CLASSIFICATION_COMPLETE_USER_APPROVED_V26_REMOVAL_FROM_CANON
Date: 2026-06-04
Workspace: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK`

## Boundary

This report classifies the dirty workspace after Phase 5 closure. It does not certify
theorem truth, empirical support, consciousness, phenomenality, identity transfer, external
validation, peer review, or publication readiness.

No file was deleted, restored, moved, staged, or committed in the original classification pass.
In the follow-up governance pass, the user explicitly approved not restoring
`rigid-identity-framework/monolithic/QICN_MONOLITHIC_v26.pdf` because the historical
PDF was moved outside the canonical theoretical workspace into a backup/noise archive.

## Why This Pass Was Needed

The workspace contains accumulated changes from several work streams:

- Phase 5 paper and monolithic work;
- Codex lateral cross-audit implementation;
- current Phase 5C final closure;
- older v25-v35/v40 hardening artifacts;
- generated reports and fixtures;
- backup/noise directories;
- one tracked deletion.

Committing or reverting this state as one block would be unsafe because it would mix
canonical work, generated evidence, historical artifacts, and unclassified changes.

## Snapshot Counts

Command:

```powershell
git status --short
```

Observed counts:

| Class | Count |
|---|---:|
| Total status lines | 161 |
| Modified tracked entries | 48 |
| Deleted tracked entries | 1 |
| Untracked top-level/status entries | 112 |

## High-Risk Finding

| Path | Status | Classification | Required action |
|---|---|---|---|
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC_v26.pdf` | deleted tracked file | USER_APPROVED_REMOVAL_FROM_CANONICAL_WORKSPACE | Do not restore in the canonical theoretical workspace. Keep deletion as an intentional cleanup decision when the relevant phase commit is prepared. |

This was the only tracked deletion observed in the original classification pass. It no
longer blocks because the user approved the deletion from the canonical workspace, but it
still must not be swept into a broad `git add -A` commit. It should be committed only in a
phase-scoped cleanup or closure commit that documents the backup/noise relocation rationale.

## Canonical Phase 5 Closure Set

These files are directly tied to the final Phase 5 closure and should be reviewed together
as one candidate commit or one candidate patch set.

| Path | Status class | Recommendation |
|---|---|---|
| `rigid-identity-framework/scripts/build-monolithic-volume.js` | tracked modified | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/monolithic/compile.ps1` | tracked modified | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC.tex` | tracked modified | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf` | untracked | KEEP_PHASE5_CLOSURE; important final artifact, should not be left outside if monolithic PDF is canonical |
| `rigid-identity-framework/docs/reports/MONOLITHIC_BUILD_REPORT.md` | tracked modified | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/reports/QICN_GLOBAL_ROADMAP_v40.md` | untracked | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_PDF_REPRODUCIBILITY_STATUS.md` | untracked | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md` | untracked | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` | untracked | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/reports/QICN_V40_OPENCODE_CROSS_AUDIT_GAP_CLOSURE_REPORT.md` | untracked | KEEP_PHASE5_CLOSURE |
| `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | untracked directory member | KEEP_PHASE5_CLOSURE |

Do not commit this set with unrelated v27 fixture/script changes unless the commit is
explicitly meant to be a broad historical snapshot.

## Prior Phase 5 / Paper Canon Candidate Set

These files appear related to earlier paper extension/recompilation and Phase 5B work.
They should be kept, but ideally committed separately from the final workspace hygiene
closure.

| Path or group | Observed status | Recommendation |
|---|---|---|
| `release/references.bib` | tracked modified | KEEP_PHASE5B_BIBLIOGRAPHY |
| `rigid-identity-framework/release/references.bib` | tracked modified | KEEP_PHASE5B_BIBLIOGRAPHY |
| `rigid-identity-framework/basecore/core/sections/06_structural_classes_and_dynamics.tex` | tracked modified | KEEP_CROSS_AUDIT_FORMAL_BOUNDARY |
| `rigid-identity-framework/monolithic/preamble/setup.tex` | tracked modified | KEEP_MONOLITHIC_PREAMBLE |
| `rigid-identity-framework/monolithic/preamble/packages.tex` | tracked modified | REVIEW_KEEP_MONOLITHIC_PREAMBLE |
| `rigid-identity-framework/paper1/main.tex`, `paper1/main.pdf` | tracked modified | REVIEW_PRIOR_PAPER_UPDATE |
| `rigid-identity-framework/paper2/main.tex`, `paper2/main.pdf` | tracked modified | REVIEW_PRIOR_PAPER_UPDATE |
| `rigid-identity-framework/paper3/main.tex`, `paper3/main.pdf`, `paper3/references.bib` | tracked modified | KEEP_PRIOR_PHASE5_PAPER_WORK |
| `rigid-identity-framework/paper4/main.tex`, `paper4/main.pdf` | tracked modified | KEEP_PRIOR_PHASE5_PAPER_WORK |
| `rigid-identity-framework/paper5_operational_consciousness/main.pdf` | tracked modified | KEEP_PHASE5B_RECOMPILE |
| `rigid-identity-framework/paper6_predictions_falsation/main.tex`, `main.pdf` | tracked modified | KEEP_PRIOR_PHASE5_PAPER_WORK |
| `rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf` | tracked modified | KEEP_PHASE5B_RECOMPILE |
| `rigid-identity-framework/paper8_first_person_subjectivity/main.pdf` | tracked modified | KEEP_PHASE5B_RECOMPILE |
| `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex`, `main.pdf` | tracked modified | KEEP_PHASE5B_REPAIR_AND_RECOMPILE |
| `rigid-identity-framework/paper10_external_adjudication/main.pdf` | tracked modified | KEEP_PHASE5B_RECOMPILE |

These should not be discarded. They are likely important, but they deserve a separate
paper/PDF canon commit or review gate.

## Reports and Documentation Candidate Set

These are likely useful as formal traceability artifacts. They should be retained unless a
later documentation pass consolidates them deliberately.

| Group | Recommendation |
|---|---|
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE1_*` through `PHASE5*` | KEEP_CANONICAL_PHASE_REPORTS |
| `rigid-identity-framework/docs/reports/QICN_BASELINE_v40.md` | KEEP_CANONICAL_PHASE_REPORT |
| `rigid-identity-framework/docs/reports/QICN_CRITICAL_GAPS_AUDIT.md` | KEEP_REVIEW_FOR_OVERLAP |
| `rigid-identity-framework/docs/reports/QICN_HARDENING_PROMPT_v30.md` | KEEP_LEGACY_CONTEXT_OR_ROUTE_TO_PROMPTS |
| `rigid-identity-framework/docs/prompts/CODEX_v40_*` | KEEP_PROMPT_TRACEABILITY |
| `rigid-identity-framework/INSTRUCCIONES.md` | KEEP_LOCAL_GOVERNANCE |
| `rigid-identity-framework/VERSION.md` | KEEP_VERSIONING |
| `rigid-identity-framework/docs/BRIDGE_HYPOTHESIS_LEDGER.md` | KEEP_THEORY_LEDGER |
| `rigid-identity-framework/docs/QICN_GLOSSARY.md` | KEEP_CANONICAL_GLOSSARY |
| `rigid-identity-framework/docs/RALSI_REFERENCE.md` | KEEP_REFERENCE_DOC |
| `rigid-identity-framework/docs/SEMANTIC_INFLATION_AUDIT_v40.md` | KEEP_PHASE4_ARTIFACT |

## Review-Before-Commit Set

These tracked files changed but were not proven in this pass to belong to the Phase 5
closure set. They should not be swept into a Phase 5 commit without a targeted diff review.

| Path or group | Reason |
|---|---|
| `.gitignore` | Repository policy change; needs separate review. |
| `Dockerfile` | Runtime/container change; not part of PDF closure. |
| `rigid-identity-framework/package.json` | Script/dependency surface; review exact diff before commit. |
| `rigid-identity-framework/docs/NON_CLAIM_LEDGER_CANONICAL.md` | Claim ledger change; scientific boundary sensitive. |
| `rigid-identity-framework/docs/THEORY_CLAIM_LEDGER.md` | Claim ledger change; scientific boundary sensitive. |
| `rigid-identity-framework/docs/fixtures/*v27*.json` | Fixture/provenance changes; verify against scripts before commit. |
| `rigid-identity-framework/docs/reports/*v26*`, `*v27*` modified reports | Legacy report updates; commit separately from Phase 5 closure. |
| `rigid-identity-framework/scripts/audit-operational-term-promotions-v27.js` | Verification script change; run matching gate before commit. |
| `rigid-identity-framework/scripts/audit-v25-superior-gaps.js` | Verification script change; run matching gate before commit. |
| `rigid-identity-framework/scripts/audit-v27-superior-gaps.js` | Verification script change; run matching gate before commit. |
| `rigid-identity-framework/scripts/calibrate-session-zero-thresholds-v27.js` | Calibration script change; requires targeted verification. |
| `rigid-identity-framework/scripts/evaluate-framework-progress.js` | Evaluation script change; scientific status sensitive. |
| `rigid-identity-framework/scripts/external-session-zero-adjudicator-v27.js` | Adjudication script change; external/internal claim boundary sensitive. |

## Untracked Noise / Archive / Recovery Candidates

These should not be committed blindly.

| Path or group | Classification | Recommendation |
|---|---|---|
| `rigid-identity-framework-backup-noise/` | BACKUP_NOISE_OR_RECOVERY_POOL | Keep untracked until a dedicated recovery audit decides what to rescue. |
| `_audit_v21_extract/`, `_audit_v23_extract/`, `_audit_v26_extract/` | AUDIT_EXTRACTS | Keep untracked or archive outside canonical repo after approval. |
| `TEORIA QICN/` | UNCLASSIFIED_THEORY_FOLDER | Audit before moving or committing. |
| `AUDIT_FORMAL_PROFUNDO_QICN_v28.md` | ROOT_LEVEL_REPORT | Route to appropriate docs location or classify as external audit. |
| `.gitlab-ci.yml` | CI_CONFIG_CANDIDATE | Review separately; do not include in Phase 5 closure commit blindly. |
| `package.json.v35-precentralization.bak` | BACKUP_FILE | Keep as backup only if provenance matters; otherwise archive after approval. |
| `rigid-identity-framework/docs/superpowers/` | TOOLING_DOCS_OR_PLUGIN_OUTPUT | Review separately. |
| `rigid-identity-framework/docs/theory/*v28-v31*` | THEORY_ARTIFACTS | Likely important; keep, but commit as theory artifact set, not workspace hygiene. |
| `rigid-identity-framework/scripts/legacy/` | LEGACY_TOOLING | Keep if referenced by `verify:all-legacy`; otherwise review. |
| `rigid-identity-framework/scripts/lib/*statistics*`, `bridge-estimator-verification.js` | SCRIPT_LIB_CANDIDATES | Verify gates before commit. |
| `rigid-identity-framework/scripts/external-session-zero-adjudicator-v28/v30/v31.js` | ADJUDICATION_SCRIPT_CANDIDATES | Keep pending targeted verification. |
| `docs/reports/*` at repository root | ROOT_DOCS_CANDIDATES | Decide whether root-level docs are canonical or should be mirrored under `rigid-identity-framework/docs`. |

## Recommended Commit / Cleanup Order

1. **Commit or snapshot Phase 5 closure set only.**
   Include canonical compile route, final monolithic report, final Phase 5 reports, roadmap/status, ledger, and final monolithic PDF if the PDF is meant to be canonical.

2. **Handle the approved tracked deletion deliberately.**
   `rigid-identity-framework/monolithic/QICN_MONOLITHIC_v26.pdf` has user approval to remain outside the canonical workspace. Commit that deletion only in a scoped phase commit, not in a broad workspace sweep.

3. **Review and commit paper/PDF canon updates.**
   Group paper source/PDF changes separately from tooling and fixtures.

4. **Review scientific ledgers and v27/v28/v30/v31 scripts.**
   Run targeted verification before committing claim-ledger, fixture, calibration, or adjudicator changes.

5. **Classify untracked folders.**
   Backup/noise and audit-extract folders should remain out of the canonical commit unless a recovery audit names exact files to rescue.

6. **Only then start Phase 6.**
   Phase 6 should start from a known clean commit or at least from a classified dirty state where no unclassified deletion or untracked canonical PDF remains.

## Current Decision

The workspace is now classified, but not cleaned.

Follow-up user decision:

- `rigid-identity-framework/monolithic/QICN_MONOLITHIC_v26.pdf` should remain deleted from the canonical workspace.
- Rationale: the user moved the historical PDF outside the theoretical workspace into a backup/noise archive used for historical files, ROMs, reports, and artifacts that would otherwise pollute the framework.
- Operational constraint: this approval does not authorize broad deletion of other files.

Safe to proceed conceptually:

- Phase 5 remains closed for active PDF/LaTeX reproducibility.
- Phase 6 can be planned.

Not safe to do blindly:

- `git add -A`;
- broad commit of all changes;
- broad revert;
- moving backup/noise directories into canon without recovery audit.

Recommended next action:

- Stage only the verified phase-scoped set after reviewing the final diff and confirming
  that no unclassified backup/noise artifacts are included.
