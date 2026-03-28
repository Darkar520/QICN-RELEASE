# CANON_SOURCE_OF_TRUTH

## Purpose

This document fixes the live public source-of-truth boundary for `QICN-RELEASE`.

## Authority state

- Public source-of-truth repository: `QICN-RELEASE`
- Sole live public branch authority: `main`
- Historical freeze tag retained as provenance: `release-2026-03-01`
- Historical explicit canonical tag retained as provenance: `canonical-freeze-2026-03-01`
- Live public canonicalization on trunk:
  - primary formal spine: Canonical Core and Papers I-V
  - accepted supporting public extensions: Papers VI-VII
  - explicitly outside the public canon for now: Paper VIII pending release-audit acceptance

## Source-of-truth files

1. `corpus/pdf_release/pdf_corpus.zip`
2. `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
3. `corpus/pdf_release/manifest.json`
4. `corpus/pdf_release/manifest.sha256.txt`
5. `release/CANON_MAP.v1.json`
6. `release/INDEX_PDFS.json`
7. `release/release_freeze_manifest.json`
8. `release/canon_manifest.v1.json`
9. `release/claim_registry.v1.json`
10. `release/layer_boundaries.v1.json`
11. `release/system_interface_boundary.v1.json`

## What counts as current public canon

- the immutable PDF corpus and its index/manifests as currently published on `main`
- the primary formal spine through Paper V
- the accepted supporting public extensions Papers VI-VII
- the release governance and boundary documents that constrain interpretation

## What does not count as current public canon

- historical audit snapshots whose scope pre-dates the current trunk expansion
- `release/_non_canonical/`
- `QICN-SYSTEM` runtime outputs
- Paper VIII until a release-audit acceptance path is recorded inside the public release repo

## Non-claim boundary

Public canonicalization of trunk improves traceability and public alignment only. It does not constitute external validation, theory confirmation, human equivalence, or metaphysical closure.
