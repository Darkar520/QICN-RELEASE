# QICN Release Package

Audit-first public release package with active BaseCore source material, immutable PDF corpus artifacts, and explicit boundary metadata.

## Quick verification

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

## Current public release shape

- active mathematical base layer: BaseCore
- public downstream packages: Papers I-IX
- preserved legacy package: canonical_core_legacy
- preserved supporting, mirror, and historical variants remain separately classified under `release/canon_manifest.v1.json`

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

- no blind collapse of legacy or mirror material into the active base
- no external validation claims
- no automatic bridge from internal runtime work to public theory closure
- no phenomenality, human-equivalence, or adjudication claims from packaging alone
