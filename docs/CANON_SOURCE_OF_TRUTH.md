# CANON_SOURCE_OF_TRUTH

## Purpose

This document fixes the strongest verifiable canonical boundary available inside
`release_repo_qicn_2026-03-01` without rewriting theoretical source texts.

## Canonical freeze reference

- Release repository: `release_repo_qicn_2026-03-01`
- Canonical freeze tag observed locally: `release-2026-03-01`
- Observed local tag commit: `2d7504be95ca33af5941e30abf7059dc2774edca`
- Explicit upstream canonical tag: `canonical-freeze-2026-03-01`
- Explicit upstream canonical tag commit:
  `2d7504be95ca33af5941e30abf7059dc2774edca`
- Freeze audit snapshot commit captured inside the repo:
  `2b0d0c0 release: QICN package v1 (canon map + pdf corpus + integrity hashes)`
- Observed remote branch `origin/main` at closure:
  live-reviewed as carrying the canonical-hardening closure history and the
  local freeze object in ancestry; because branch tips are mutable, this is
  supportive evidence only and not treated as the canonical pin.
- Observed remote tag `release-2026-03-01`:
  `cb4ec37384e9601f3081ec60c85ca154cd180e8b`

## Interpretation of the freeze state

- A verifiable local freeze exists.
- The strongest available pin is now resolved both locally and upstream:
  local tag `release-2026-03-01` and explicit remote tag
  `canonical-freeze-2026-03-01` both name the freeze object
  `2d7504be95ca33af5941e30abf7059dc2774edca`.
- Remote tag `release-2026-03-01` remains a historical release-package tag
  for the earlier package commit `cb4ec37384e9601f3081ec60c85ca154cd180e8b`;
  it should not be confused with the stronger freeze tag above.
- The working tree observed at hardening start was not clean:
  `release/EDITORIAL_GROUPING_V2/` and `release/RELEASE_V2_PREP_A/` were
  present as untracked auxiliary materials.
- Those materials are now physically separated under
  `release/_non_canonical/`.
- That observation remains a provenance note, not an active warning on the
  current canonical baseline.
- Therefore the canonical reference is the tagged freeze package, not the
  observed working tree.

## Source-of-truth files

The following files are the release-level source of truth for the canonical
freeze:

1. `corpus/pdf_release/pdf_corpus.zip`
2. `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
3. `corpus/pdf_release/manifest.json`
4. `corpus/pdf_release/manifest.sha256.txt`
5. `release/CANON_MAP.v1.json`
6. `release/INDEX_PDFS.json`
7. `release/FREEZE_AUDIT_v1/integrity_check.json`
8. `release/release_freeze_manifest.json`
9. `release/canon_manifest.v1.json`
10. `release/claim_registry.v1.json`
11. `release/layer_boundaries.v1.json`
12. `release/system_interface_boundary.v1.json`

## What counts as canon

- The immutable PDF corpus enumerated by the release manifest and PDF index.
- The canonical selection metadata that defines preferred lineages and mirror
  policy.
- The release governance documents included in `release/`, but only as release
  governance and claim-boundary material, not as theorem proofs.

## What does not count as source-of-truth canon

- Physically separated excluded material under
  `release/_non_canonical/`, including:
  - `release/_non_canonical/EDITORIAL_GROUPING_V2/`
  - `release/_non_canonical/RELEASE_V2_PREP_A/`
- Upstream workspaces outside this repo, except as lineage references recorded
  by `CANON_MAP.v1.json`.
- `QICN-SYSTEM` runtime artifacts, metrics, labels, policies, or controlled
  statements.
- Any external validation claim, publication claim, or framework-confirmation
  statement.

## Non-claim boundary

Canonical freeze means that the package boundary, the included corpus, and the
documented claim layers are traceable. It does not mean the framework is
externally validated, empirically closed, or scientifically confirmed.
