# QICN Release Package v1 (2026-03-01)

Audit-first release package with immutable PDF corpus artifacts and editorial metadata.

## Quick Start (cross-platform verification)

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

Expected for release acceptance:
- `verify-canonical-integrity.cjs` returns `PASS` or `PASS_WITH_WARNINGS`
- `verify-claim-registry.cjs` returns `PASS` or `PASS_WITH_WARNINGS`
- `verify-canonical-release.cjs` returns `PASS` or `PASS_WITH_WARNINGS`

## Directory Map

- `corpus/pdf_release/`
- `corpus/pdf_release/pdf_corpus.zip`
- `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
- `corpus/pdf_release/manifest.json`
- `corpus/pdf_release/manifest.sha256.txt`
- `release/CANON_MAP.v1.json`
- `release/INDEX_PDFS.json`
- `release/RELEASE_MAP.md`
- `release/BLUEPRINT_EDITORIAL.md`
- `release/FREEZE_AUDIT_v1/`

## Canonical hardening supplement

Canonical boundary, claim registry, and layer/interface boundaries are defined in:

- `docs/CANON_SOURCE_OF_TRUTH.md`
- `docs/CANON_MANIFEST.md`
- `docs/CLAIM_REGISTRY.md`
- `docs/LAYER_BOUNDARIES.md`
- `docs/THEORY_SYSTEM_INTERFACE.md`
- `docs/CANONICAL_RELEASE_NOTES.md`

Machine-readable counterparts:

- `release/release_freeze_manifest.json`
- `release/canon_manifest.v1.json`
- `release/claim_registry.v1.json`
- `release/layer_boundaries.v1.json`
- `release/system_interface_boundary.v1.json`

Explicitly excluded from canon/source-of-truth:

- `release/_non_canonical/`

Verification and bundle commands:

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/build-canonical-release-bundle.cjs
node scripts/verify-canonical-release.cjs
```

## Known limitations

- `pdf_only`: this package distributes canonical PDFs and release metadata; it does not include a full source recompilation pipeline.
- `release_id`: `release_repo_qicn_2026-03-01` is a historical release identifier, not a required clone directory name.

## Non-goals

- No recompilation of original source pipelines from the upstream workspace.
- No ontology claims or claims about human/biological qualia.
- No mutation of the original workspace outside this release package.
