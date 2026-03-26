# CANONICAL_RELEASE_NOTES

## Purpose

This note accompanies the canonical hardening supplement for
`QICN-RELEASE`.

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
- sole public source-of-truth branch: `main`
- explicit upstream canonical tag: `canonical-freeze-2026-03-01`
- upstream pin status: `resolved`
- remote evidence:
  - `origin/main` has been live-verified as carrying the canonical-hardening
    closure history and the local freeze object in ancestry; branch state is
    supportive evidence only and not canonical tag closure
  - remote tag `canonical-freeze-2026-03-01` resolves to
    `2d7504be95ca33af5941e30abf7059dc2774edca`
  - remote tag `release-2026-03-01` resolves to
    `cb4ec37384e9601f3081ec60c85ca154cd180e8b`
- remaining gap: none for the upstream pin itself; the historical release tag
  `release-2026-03-01` remains an earlier package tag and should not be
  confused with the explicit canonical freeze tag above
- no competing public freeze branch is required or observed in the current
  remote baseline; `main` is the live branch authority and immutable tags keep
  freeze identity
- non-canonical v2 auxiliary folders are now physically separated under
  `release/_non_canonical/`
- the dirty working tree observed at hardening start is retained as provenance
  history only and is not treated as an active warning on the current baseline

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
