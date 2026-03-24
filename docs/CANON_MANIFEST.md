# CANON_MANIFEST

This document summarizes what belongs to the canonical release package and how
those documents are classified.

## Canonical package scope

- Canonical PDF clusters in the release package: `18`
- Canonical package identity: `release-2026-03-01`
- Primary source-of-truth inventory: `release/canon_manifest.v1.json`

## Primary formal spine

These documents are the preferred source-of-truth lineages for the release:

- `corpus/pdf_release/pdfs/canonical_core__3b77e7b20616cf25.pdf`
  - preferred source: `rigid-identity-framework/CANONICAL_CORE.tex`
  - role: foundational formal core
  - status: `PASS_PDF_ONLY`
- `corpus/pdf_release/pdfs/6968859f53621468_6968859f53621468_main_f973c787__6968859f53621468.pdf`
  - preferred source: `rigid-identity-framework/paper1/main.tex`
  - role: identity rigidity / inverse-limit paper
- `corpus/pdf_release/pdfs/9e4b83e44e669730_9e4b83e44e669730_main_d5f7405e__9e4b83e44e669730.pdf`
  - preferred source: `rigid-identity-framework/paper2/main.tex`
  - role: phenomenological-regime classification paper
- `corpus/pdf_release/pdfs/dc23c9c9345aae47_dc23c9c9345aae47_main_ddd19561__dc23c9c9345aae47.pdf`
  - preferred source: `rigid-identity-framework/paper3/main.tex`
  - role: null-regime instability paper
- `corpus/pdf_release/pdfs/44806ece96bbdae2_main_1c305418__44806ece96bbdae2.pdf`
  - preferred source: `rigid-identity-framework/paper4/main.tex`
  - role: operational falsification protocol

## Supporting lineages included in the freeze

These documents remain inside the immutable package, but they are not the
preferred source-of-truth lineages:

- `1a86ec656885a998_1a86ec656885a998_main_ac20e128__1a86ec656885a998.pdf`
- `aa4d0b933892715a_aa4d0b933892715a_main_df41c33d__aa4d0b933892715a.pdf`
- `c3d1cc6abf9c8c70_c3d1cc6abf9c8c70_main_93b0b0fc__c3d1cc6abf9c8c70.pdf`

These preserve supporting formal or parallel lineage, not primary
source-of-truth status.

## Derived or mirror lineages included in the freeze

These documents remain in the immutable package for genealogy and comparison,
but they must not be promoted to source-of-truth status:

- `canonical_core_74be3e__eead218e079c0ad2.pdf`
- `canonical_core_957f4e__ea247e98e09de39b.pdf`
- `phenomenological_instability__04b40ecc9376767e.pdf`
- `phenomenological_instability_2fe669__0b013024c06a2f7d.pdf`
- `phenomenological_regimes__9dab69286f9e9107.pdf`
- `phenomenological_regimes_529d6b__39860a8a5035ed82.pdf`
- `rigid_identity_paper__3e026c9275c59788.pdf`
- `rigid_identity_paper_8925ec__bb0cda8022f6c8ac.pdf`

Their function is release traceability and lineage preservation, not promotion
to preferred source-of-truth status.

## Operational annexes included in the freeze

These documents are part of the package but are not proof-bearing theoretical
source texts:

- `857c4c89149a369c_857c4c89149a369c_main_7294ab07__857c4c89149a369c.pdf`
- `87dc170947cc65f0_87dc170947cc65f0_main_c7b5d93e__87dc170947cc65f0.pdf`

They are operational annexes linked to export evidence, not to theorem closure.

## Release governance documents

The following files are canonical as governance and interpretation-boundary
documents:

- `release/GLOSSARY_CANONICAL.v1.md`
- `release/METHODS_GOVERNANCE_HUB.v1.md`
- `release/STYLE_DISCLAIMER_POLICY.v1.md`
- `release/TERM_MIGRATION_PLAN.v1.md`
- `release/CROSSPAPER_LINKMAP.v1.json`
- `release/BLUEPRINT_EDITORIAL.md`
- `release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md`

## Out of canon

The following material is outside the canonical freeze boundary:

- physically separated excluded material under `release/_non_canonical/`
  - `release/_non_canonical/EDITORIAL_GROUPING_V2/`
  - `release/_non_canonical/RELEASE_V2_PREP_A/`
- Ad hoc editorial planning not included in the tagged package
- Runtime outputs from `QICN-SYSTEM`
- Any external validation narrative or publication-facing claim
