# QICN - Release Package (2026-03-01)

Este repositorio es un **paquete de release auditable** que distribuye un **corpus PDF** y un **mapa canonico** para navegacion/editorial.  
El foco es **integridad verificable por artefactos** (hashes + manifest), no recompilacion completa de fuentes.

## Quick Start (verificacion de integridad)

### Linux / macOS / WSL (bash)

```bash
cd /path/to/QUICN-RELEASE

ZIP_ACTUAL=$(sha256sum corpus/pdf_release/pdf_corpus.zip | awk '{print $1}')
ZIP_EXPECTED=$(awk '{print $1}' corpus/pdf_release/pdf_corpus.zip.sha256.txt)
MAN_ACTUAL=$(sha256sum corpus/pdf_release/manifest.json | awk '{print $1}')
MAN_EXPECTED=$(awk '{print $1}' corpus/pdf_release/manifest.sha256.txt)

echo "zip_match=$([ "$ZIP_ACTUAL" = "$ZIP_EXPECTED" ] && echo True || echo False)"
echo "manifest_match=$([ "$MAN_ACTUAL" = "$MAN_EXPECTED" ] && echo True || echo False)"
```

### PowerShell (Windows)

```powershell
Set-Location "C:\path\to\QUICN-RELEASE"

$zipReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\pdf_corpus.zip").Hash.ToLower()
$zipExp  = ((Get-Content "corpus\pdf_release\pdf_corpus.zip.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()
$manReal = (Get-FileHash -Algorithm SHA256 "corpus\pdf_release\manifest.json").Hash.ToLower()
$manExp  = ((Get-Content "corpus\pdf_release\manifest.sha256.txt" -Raw).Split() | Select-Object -First 1).ToLower()

"zip_match=$($zipReal -eq $zipExp)"
"manifest_match=$($manReal -eq $manExp)"
```

Si `zip_match=True` y `manifest_match=True`, la integridad basica del release esta OK.

## Directory Map
- `release/`
  - `CANON_MAP.v1.json` - canonizacion y claves documentales
  - `INDEX_PDFS.json` - indice de PDFs del corpus
  - `RELEASE_MAP.md` - mapa de release / navegacion
  - `BLUEPRINT_EDITORIAL.md` - blueprint editorial para alineacion de documentos
  - `SUMMARY.json` - resumen del release
  - `FREEZE_AUDIT_v1/` - artefactos de auditoria del freeze package
    - `git_log_1.txt` - historial de commits del repositorio
    - `git_tags.txt` - tags de release
    - `CORPUS_MANIFEST_AUDIT.json` - auditoria maquina-legible con verificacion de hashes
    - `FREEZE_AUDIT_REPORT.md` - reporte completo de auditoria
- `corpus/pdf_release/`
  - `pdf_corpus.zip` - corpus PDF final
  - `manifest.json` - manifest con hashes por PDF
  - `*.sha256.txt` - hashes oficiales del zip y del manifest

## What's Included
- Corpus PDF consolidado y deduplicado con `manifest.json` y hashes SHA-256.
- Canon map e indice para navegacion y futura edicion editorial.
- Documentacion de release: verificacion, limites y no-goals.

## What's Excluded (Non-goals)
- No intenta recompilar el corpus desde fuentes LaTeX.
- No reemplaza el workspace completo de trabajo; empaqueta artefactos verificables.
- No hace afirmaciones ontologicas (p. ej., "qualia" biologica); el paquete se limita a evidencia verificable por artefactos.

## Reproducibility
La reproducibilidad del release se define como:
- `pdf_corpus.zip` coincide con su SHA-256 esperado.
- `manifest.json` coincide con su SHA-256 esperado.

Eso garantiza que el paquete distribuido no fue alterado respecto al release generado.

## Known Limitations
Algunos documentos se incluyen como PDF canonical sin fuente compilable incluida en este paquete (ver `RELEASE_NOTES.md`).

## Next Steps (post-release, fuera de este paquete)
- Edicion editorial: unificacion de definiciones, reduccion de redundancia, y mapeo consistente de secciones "Methods / Admissibility / RO/SNO" en un paper objetivo.
- Versionado: crear siguientes tags del release cuando existan revisiones editoriales o nuevos corpora verificables.
