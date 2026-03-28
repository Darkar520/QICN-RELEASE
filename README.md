# QICN Release Package

Audit-first public release package with immutable PDF corpus artifacts and canonical boundary metadata.

## Quick verification

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

## Current public canonical scope

- primary formal spine: Canonical Core and Papers I-V
- accepted supporting public extensions: Papers VI-VII
- not yet public canon: Paper VIII pending release-audit acceptance

## Source-of-truth documents

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

## Non-goals

- no source recompilation pipeline inside this repo
- no external validation claims
- no automatic bridge from internal runtime work to public theory closure
