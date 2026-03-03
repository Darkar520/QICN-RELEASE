# QICN Release Package v1 (2026-03-01)

Audit-first release package with immutable PDF corpus artifacts and editorial metadata.

## Quick Start (PowerShell integrity check)

```powershell
Set-Location "C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\release_repo_qicn_2026-03-01"

$zipReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\pdf_corpus.zip").Hash.ToLower()
$zipExp  = ((Get-Content "corpus\pdf_release\pdf_corpus.zip.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()
$manReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\manifest.json").Hash.ToLower()
$manExp  = ((Get-Content "corpus\pdf_release\manifest.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()

"zip_match=$($zipReal -eq $zipExp)"
"manifest_match=$($manReal -eq $manExp)"
```

Expected for release acceptance:
- `zip_match=True`
- `manifest_match=True`

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

## Known limitations

- `pdf_only`: this package distributes canonical PDFs and release metadata; it does not include a full source recompilation pipeline.

## Non-goals

- No recompilation of original source pipelines from the upstream workspace.
- No ontology claims or claims about human/biological qualia.
- No mutation of the original workspace outside this release package.
