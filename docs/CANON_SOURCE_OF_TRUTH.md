# CANON_SOURCE_OF_TRUTH

## Purpose

This document fixes the live public source-of-truth boundary for `QICN-RELEASE`.

## Authority state

- Public source-of-truth repository: `QICN-RELEASE`
- Sole live public branch authority: `main`
- Historical freeze tag retained as provenance: `release-2026-03-01`
- Historical explicit canonical tag retained as provenance: `canonical-freeze-2026-03-01`
- Active mathematical base layer on trunk: `rigid-identity-framework/basecore/`
- Preserved legacy package on trunk: `rigid-identity-framework/canonical_core_legacy/`
- Public downstream package set on trunk: Papers I-IX

## Source-of-truth files

1. `rigid-identity-framework/basecore/`
2. `corpus/pdf_release/pdf_corpus.zip`
3. `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
4. `corpus/pdf_release/manifest.json`
5. `corpus/pdf_release/manifest.sha256.txt`
6. `release/CANON_MAP.v1.json`
7. `release/INDEX_PDFS.json`
8. `release/release_freeze_manifest.json`
9. `release/canon_manifest.v1.json`
10. `release/claim_registry.v1.json`
11. `release/layer_boundaries.v1.json`
12. `release/system_interface_boundary.v1.json`

## What counts as current public canon

- the BaseCore source package and its compiled PDF
- the immutable PDF corpus and its index/manifests as currently published on `main`
- the downstream papers explicitly listed in `release/canon_manifest.v1.json`
- the release governance and boundary documents that constrain interpretation

## What does not count as current public canon

- historical audit snapshots whose scope pre-dates the current trunk alignment
- mirror or reconstructed variants as active source-of-truth
- `release/_non_canonical/`
- `QICN-SYSTEM` runtime outputs as theorem-bearing sources

## Non-claim boundary

Public canonicalization of trunk improves traceability and public alignment only. It does not constitute external validation, theory confirmation, bridge admissibility, human equivalence, or metaphysical closure.
