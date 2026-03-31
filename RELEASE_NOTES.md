# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: `QICN-RELEASE/main`

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: 8d37675d32b0530680878785a208ac856f45cb8fcc9463a346401846b4a7b124
- corpus/pdf_release/manifest.json: 961a1cadca83f37ecfa824bede611e31f5378e343d3c8748fc75c54d3b922227

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
