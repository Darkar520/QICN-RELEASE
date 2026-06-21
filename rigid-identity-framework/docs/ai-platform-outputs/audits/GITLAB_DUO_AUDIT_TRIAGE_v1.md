# GitLab Duo Audit Triage v1

## Scope

This document triages two GitLab Duo audits of QICN-RELEASE and records which
findings were verified locally. It is an internal governance artifact, not an
external review, peer review, empirical validation, or certification of QICN.

## Verified Findings

| Finding | Local status | Action |
|---|---|---|
| Missing GitLab CI pipeline | Confirmed: `.gitlab-ci.yml` was absent. | Added GitLab CI jobs for canonical integrity and reproducibility audit. |
| Dockerfile pinned to historical `verify:v22` | Confirmed: root `Dockerfile` used `CMD ["npm", "run", "verify:v22"]`. | Updated Dockerfile to run canonical release checks and framework `verify:release`. |
| `PASS_PDF_ONLY` sources exist | Confirmed in `release/canon_manifest.v1.json`. | Added reproducibility audit to track these as explicit gaps. |
| `DROP` and `PASS_PDF_ONLY` entries exist in PDF release manifest | Confirmed in `corpus/pdf_release/manifest.json`. | Added machine-readable report generation under `_build/canonical_hardening`. |
| Local build paths appear in frozen PDF manifest | Confirmed in `corpus/pdf_release/manifest.json`. | Tracked as provenance hygiene gap without mutating the frozen manifest hash. |
| Claims remain internal/no external support | Confirmed by claim registry and boundary manifests. | No claim inflation performed. |

## Corrected or Outdated Findings

| Finding | Local status | Resolution |
|---|---|---|
| `upstream_pin_status` unresolved or partially resolved | Not current. `release/release_freeze_manifest.json` reports `resolved`. | Treat as closed for current release. |
| `verify:release` points to v27 | Not current. `rigid-identity-framework/package.json` currently maps `verify:release` to `verify:v26`. | Docker now calls `verify:release` rather than a hard-coded historical gate. |
| GitLab project default branch unknown | Not a local repo issue. Current local branch is `main` and remotes were pushed in the prior v39 pass. | No code change. |

## Deferred Findings

| Finding | Reason deferred |
|---|---|
| Repair all non-compiling TeX sources | Requires a dedicated LaTeX reconstruction pass and may change canonical PDFs/manifests. |
| Regenerate `corpus/pdf_release/manifest.json` without local paths | Would change the manifest SHA-256 sidecar and must be done only as an intentional release regeneration. |
| Strengthen non-simulability and NFD from assumptions into deeper derived theorems | Requires mathematical research, not a quick repo hardening patch. |
| External empirical validation | Requires protocol, data channel, independent execution, and human/peer review. Software hardening cannot close it. |

## Implemented Files

- `.gitlab-ci.yml`
- `scripts/audit-public-release-reproducibility.cjs`
- `docs/GITLAB_DUO_AUDIT_TRIAGE_v1.md`

## Non-Claim

This triage does not certify support for consciousness, phenomenality,
subjectivity, identity transfer, bridge-burden closure, empirical validity, or
external review. It only improves release automation and tracks reproducibility
gaps that were already present in the frozen corpus.
