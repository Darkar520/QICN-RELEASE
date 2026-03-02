# RELEASE_NOTES - QICN Release Package

## Release ID
`release_repo_qicn_2026-03-01`

## Integrity & Hashes
SHA256 oficial del corpus:
`3395006bdac94f26f956ade3e560ce1ceb1de76321323e6db242acfc86db6654`

Archivos de integridad incluidos:
- `corpus/pdf_release/pdf_corpus.zip`
- `corpus/pdf_release/pdf_corpus.zip.sha256.txt`
- `corpus/pdf_release/manifest.json`
- `corpus/pdf_release/manifest.sha256.txt`

Verificación (PowerShell):
```powershell
Set-Location "C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\release_repo_qicn_2026-03-01"

$zipReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\pdf_corpus.zip").Hash.ToLower()
$zipExp  = ((Get-Content "corpus\pdf_release\pdf_corpus.zip.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()
$manReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\manifest.json").Hash.ToLower()
$manExp  = ((Get-Content "corpus\pdf_release\manifest.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()

"zip_match=$($zipReal -eq $zipExp)"
"manifest_match=$($manReal -eq $manExp)"
```

## Directory Map
- `release/`
  - `CANON_MAP.v1.json` (canonización y claves documentales)
  - `INDEX_PDFS.json` (índice de PDFs)
  - `RELEASE_MAP.md` (mapa de release)
  - `BLUEPRINT_EDITORIAL.md` (blueprint editorial)
  - `SUMMARY.json` (resumen)
- `corpus/pdf_release/`
  - `pdf_corpus.zip` (corpus PDF final)
  - `manifest.json` + hashes (integridad)

## What's Included
- Canon map + blueprint editorial.
- Corpus PDF consolidado y deduplicado con manifest y hashes.

## What's Excluded
- Fuentes LaTeX completas del workspace original (este paquete prioriza distribución verificable del corpus PDF).
- Artefactos temporales de compilación (`_build`, logs de build, caches).

## Non-goals
- No intenta recompilar fuentes LaTeX completas.
- No reemplaza el workspace de trabajo; empaqueta artefactos de release verificables.

## Reproducibility
Validación mínima:
1. Calcular hash SHA256 de `pdf_corpus.zip` y compararlo con `pdf_corpus.zip.sha256.txt`.
2. Calcular hash SHA256 de `manifest.json` y compararlo con `manifest.sha256.txt`.
3. Si ambos coinciden, el paquete no fue alterado respecto al release generado.

## Reproducibility - quick check
- Regla rápida: si `zip_match=True` y `manifest_match=True`, la integridad básica está OK.

## Admissibility / Governance
Este repositorio es un release package auditable: el corpus se valida por hash (zip + manifest).
No se hacen afirmaciones fuera de lo verificable por artefactos incluidos.

## Counts
- `canon=18`
- `pdf_only=3`
- `duplicates=0`
- `mirrors=1`

## Known Limitations
- `pdf_only=3`: documentos incluidos como PDF canónico sin fuente compilable en este paquete.

## Next Actions
1. `git init` + commit inicial.
2. Tag: `release-2026-03-01`.
3. Publicar como GitHub Release con el tag.

## Gitification Plan (PowerShell)
```powershell
Set-Location "C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\release_repo_qicn_2026-03-01"

git init

git config --get user.name
git config --get user.email

# Si falta, set local o global:
# git config user.name "TU_NOMBRE"
# git config user.email "TU_EMAIL"
# o:
# git config --global user.name "TU_NOMBRE"
# git config --global user.email "TU_EMAIL"

git status

git add .gitignore RELEASE_NOTES.md README.md
git add release corpus\pdf_release

git status
git commit -m "release: qicn package 2026-03-01 (canon map + pdf corpus + integrity hashes)"

git branch -M main
git tag release-2026-03-01

# NO CONSTA: URL del repo GitHub
# git remote add origin <GITHUB_REPO_URL>
git remote -v

git push -u origin main --tags

# Si el remoto exige master:
# git branch -M master
# git push -u origin master --tags
```
