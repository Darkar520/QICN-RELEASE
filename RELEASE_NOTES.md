# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: `QICN-RELEASE/main`

## Public release shape

- active base layer: BaseCore
- downstream public packages: Papers I-IX
- legacy package: canonical_core_legacy
- preserved variant families: historical frozen core PDF, supporting parallel lineages, NotebookLM mirrors, and operational annexes

## Verification

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/build-canonical-release-bundle.cjs
node scripts/verify-canonical-release.cjs
```

## Governance

- historical freeze tags remain provenance anchors only
- `main` is the sole live public authority
- BaseCore is the active mathematical source package in this release
- canonical_core_legacy is preserved as archival comparison material only

## Non-claim boundary

This release package is an editorial, documentary, and technical synchronization artifact. It does not imply external validation, runtime closure, bridge admissibility, or phenomenality.
