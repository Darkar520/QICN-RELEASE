# CANONICAL_RELEASE_NOTES

## Purpose

This note accompanies the canonical hardening supplement for
`release_repo_qicn_2026-03-01`.

## What this supplement adds

- explicit source-of-truth documentation
- a disciplined canon manifest
- a claim registry
- layer boundaries
- an explicit interface boundary with `QICN-SYSTEM`
- verification scripts for canonical integrity and release bundle assembly

## What this supplement does not add

- no new theorem claims
- no new validation claims
- no runtime-derived theory confirmation
- no closure of ontology, phenomenology, or empirical applicability

## Current freeze status

- strongest available freeze: local tag `release-2026-03-01`
- verifiable package core: `corpus/pdf_release/*` plus release manifests
- upstream pin status: `partially_resolved`
- remote evidence:
  - `origin/main` has been live-verified as carrying the canonical-hardening
    closure history and the local freeze object in ancestry; branch state is
    supportive evidence only and not canonical tag closure
  - remote tag `release-2026-03-01` resolves to
    `cb4ec37384e9601f3081ec60c85ca154cd180e8b`
- remaining gap: strongest local freeze commit
  `2d7504be95ca33af5941e30abf7059dc2774edca` is not yet named by a dedicated
  remote freeze tag or equivalent upstream pin; remote branch state alone does
  not close that gap
- non-canonical v2 auxiliary folders are now physically separated under
  `release/_non_canonical/`

## Included in the canonical bundle

- immutable PDF corpus zip and sidecars
- release manifest and canon map
- claim registry and boundary docs
- freeze manifest and release notes
- explicit category manifests for:
  - `canonical_primary`
  - `canonical_support_or_operational_annexes`
  - `derived_or_lineage_material`
  - `excluded_non_canonical_material`

## Excluded from the canonical bundle

- excluded tree under `release/_non_canonical/`
- external runtime artifacts from `QICN-SYSTEM`
- any material that would present internal support as theory validation

## Non-claim boundary

Canonical hardening improves traceability and epistemic order. It does not
constitute publication, proof of the framework, or external validation.
