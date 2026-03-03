# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: 3395006bdac94f26f956ade3e560ce1ceb1de76321323e6db242acfc86db6654
- corpus/pdf_release/manifest.json: dd2f3a930e6cedcbd084f200506572fcac237864a21b8ba68e82ba85b87258e7

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

## What's Excluded

- Regeneration of `pdf_corpus.zip` for Camino 1.
- Rewriting paper contents.
- Full upstream workspace build artifacts.

## Reproducibility

- Recompute SHA256 for zip and manifest.
- Compare each value against the corresponding `.sha256.txt` file.
- Accept release only if both matches are true.

## Governance

- Integrity evidence: `release/FREEZE_AUDIT_v1/integrity_check.json`
- Command evidence: `release/FREEZE_AUDIT_v1/commands_run.txt`
- Git freeze evidence: `release/FREEZE_AUDIT_v1/git_status.txt`, `git_log_1.txt`, `git_tags.txt`

## Gitification Plan (PowerShell)

```powershell
Set-Location "C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\release_repo_qicn_2026-03-01"
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
