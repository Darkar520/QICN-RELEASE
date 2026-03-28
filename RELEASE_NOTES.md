# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: `QICN-RELEASE/main`

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: 1ab538bd42376f790debe7c11a5f1525deab83a24d45b3823846c0b0e5eb03d7
- corpus/pdf_release/manifest.json: c8f3c8b86de1a84ad42b9fdfe6ef81fb374ab9881d1509e9b0f5cef7d331b727

## Public canonical scope

- primary formal spine: Canonical Core and Papers I-VIII
- supporting public lineages remain separately classified under `release/canon_manifest.v1.json`

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
- historical audit files that still reflect the shorter spine are retained as provenance, not as live canon authority

## Non-claim boundary

This release package is a canonicalization and governance artifact. It does not imply external validation, runtime closure, or human-equivalence claims.
