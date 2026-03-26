# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: `QICN-RELEASE/main`

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: 3395006bdac94f26f956ade3e560ce1ceb1de76321323e6db242acfc86db6654
- corpus/pdf_release/manifest.json: a5be525da3c18cea1202d66b4c0d22795f5e4d00f9baafef10951fe95ff3446c

## What's Included

- `corpus/pdf_release/pdf_corpus.zip`
- `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
- `corpus/pdf_release/manifest.json`
- `corpus/pdf_release/manifest.sha256.txt`
- `release/CANON_MAP.v1.json`
- `release/INDEX_PDFS.json`
- `release/RELEASE_MAP.md`
- `release/BLUEPRINT_EDITORIAL.md`
- `release/GLOSSARY_CANONICAL.v1.md`
- `release/METHODS_GOVERNANCE_HUB.v1.md`
- `release/STYLE_DISCLAIMER_POLICY.v1.md`
- `release/TERM_MIGRATION_PLAN.v1.md`
- `release/CROSSPAPER_LINKMAP.v1.json`
- `release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md`
- `docs/CANON_SOURCE_OF_TRUTH.md`
- `docs/CANON_MANIFEST.md`
- `docs/CLAIM_REGISTRY.md`
- `docs/LAYER_BOUNDARIES.md`
- `docs/THEORY_SYSTEM_INTERFACE.md`
- `docs/CANONICAL_RELEASE_NOTES.md`
- `release/release_freeze_manifest.json`
- `release/canon_manifest.v1.json`
- `release/claim_registry.v1.json`
- `release/layer_boundaries.v1.json`
- `release/system_interface_boundary.v1.json`

## What's Excluded

- Regeneration of `pdf_corpus.zip` for Camino 1.
- Rewriting paper contents.
- Full upstream workspace build artifacts.
- `release/_non_canonical/` editorial/preparatory material outside the tagged
  canonical freeze.

## Reproducibility

- Recompute SHA256 for zip and manifest.
- Compare each value against the corresponding `.sha256.txt` file.
- Accept release only if both matches are true.
- Preferred cross-platform verification path:
  - `node scripts/verify-canonical-integrity.cjs`
  - `node scripts/verify-claim-registry.cjs`
  - `node scripts/verify-canonical-release.cjs`

## Governance

- Integrity evidence: `release/FREEZE_AUDIT_v1/integrity_check.json`
- Command evidence: `release/FREEZE_AUDIT_v1/commands_run.txt`
- Git freeze evidence: `release/FREEZE_AUDIT_v1/git_status.txt`, `git_log_1.txt`, `git_tags.txt`

## Historical Gitification Plan (reference only)

```text
git init
git add .gitignore README.md RELEASE_NOTES.md CHANGELOG.md
git add release corpus\pdf_release
git commit -m "release: QICN package v1 (canon map + pdf corpus + integrity hashes)"
git branch -M main
git tag release-2026-03-01
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
git push origin --tags
```

## Canonical hardening verification

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/build-canonical-release-bundle.cjs
node scripts/verify-canonical-release.cjs
```
