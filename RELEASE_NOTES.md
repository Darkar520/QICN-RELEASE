# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: `QICN-RELEASE/main`

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: 033558681adad9e746db6d942130537f68a1cf92cd7f2103e947ed7be6488632
- corpus/pdf_release/manifest.json: 79816c05953b805aa7fc891a2b76bdd0e73466aee21d193b697d29cdf98610cd

## Public canonical scope

- primary formal spine: Canonical Core and Papers I-V
- accepted supporting public extensions: Papers VI-VII
- explicitly outside current public canon: Paper VIII pending release-audit acceptance

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
