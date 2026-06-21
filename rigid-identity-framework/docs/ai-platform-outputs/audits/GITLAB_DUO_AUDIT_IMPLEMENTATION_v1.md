# GitLab Duo Audit Implementation v1

## Scope

This report records the local implementation pass based on two GitLab Duo
audits of QICN-RELEASE. The goal was to keep only findings verified against the
actual repository and to implement low-risk hardening without altering frozen
corpus hashes or claiming external validation.

## Implemented Changes

| Area | Change |
|---|---|
| GitLab CI | Added `.gitlab-ci.yml` with canonical integrity, framework release, and reproducibility audit jobs. |
| Dockerfile | Replaced historical `verify:v22` container command with canonical release checks plus `npm run verify:release`. |
| Reproducibility audit | Added `scripts/audit-public-release-reproducibility.cjs`, which emits JSON and Markdown artifacts under `_build/canonical_hardening`. |
| Framework release gate | Updated `rigid-identity-framework/package.json` so `verify:release` runs the preserved legacy suite through `verify:all-legacy`. |
| Progress evaluator | Updated the packaging check in `evaluate-framework-progress.js` to recognize canonical release verification instead of requiring the old Docker `verify:v22` text. |
| Triage documentation | Added `docs/GITLAB_DUO_AUDIT_TRIAGE_v1.md` to record confirmed, corrected, and deferred findings. |

## Verification Results

| Command | Result | Notes |
|---|---|---|
| `node --check scripts/audit-public-release-reproducibility.cjs` | PASS | Syntax valid. |
| `node --check scripts/evaluate-framework-progress.js` | PASS | Syntax valid. |
| `node -e "JSON.parse(...package.json...)"` | PASS | Package JSON valid. |
| `node scripts/verify-canonical-integrity.cjs` | PASS | Canonical hashes and boundary manifests verify. |
| `node scripts/verify-claim-registry.cjs` | PASS | 17/17 unique claim entries, no failures. |
| `node scripts/verify-canonical-release.cjs` | PASS | Canonical release bundle builds. |
| `node scripts/audit-public-release-reproducibility.cjs` | PASS_WITH_TRACKED_GAPS | Tracks PDF-only, dropped, local-path, and dirty-freeze provenance gaps. |
| `npm run verify:release` | PASS | Runs `verify:all-legacy`; 6/6 preserved gates pass. |
| `npm run verify:v22` | FAIL_EXPECTED_PREEXISTING | Fails at `audit:monolithic-build-quality` because the monolithic log has 91 LaTeX warnings and overfull boxes. This was not introduced by this pass. |

## Tracked Gaps Exposed by the New Audit

- `canon_manifest_has_pdf_only_sources`
- `pdf_release_manifest_has_pdf_only_entries`
- `pdf_release_manifest_has_dropped_entries`
- `pdf_release_manifest_contains_local_build_paths`
- `freeze_manifest_records_dirty_worktree_at_hardening_start`

These are now explicit CI/report artifacts rather than hidden release
provenance problems.

## Deferred Work

1. Repair `PASS_PDF_ONLY` and `DROP` TeX sources in a dedicated LaTeX
   reproducibility pass.
2. Regenerate `corpus/pdf_release/manifest.json` only if intentionally
   rebuilding the frozen corpus bundle and its SHA-256 sidecar.
3. Resolve monolithic LaTeX warnings separately if `verify:v22` must become
   strict-green again.
4. Mathematical strengthening of NFD/non-simulability remains a research task,
   not a CI hardening patch.
5. External empirical validation remains open and cannot be closed by software
   automation.

## Non-Claim

This implementation does not certify external support, consciousness,
phenomenality, subjectivity, identity transfer, bridge-burden closure,
independent replication, peer review, or empirical validity. It only improves
automation and makes known reproducibility/provenance gaps machine-visible.
