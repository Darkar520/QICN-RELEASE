# RELEASE_MAP

## What is included
- Corpus PDF fuente: `corpus/pdf_release/pdf_corpus.zip`
- Manifest fuente: `corpus/pdf_release/manifest.json`
- Canon map: `release/CANON_MAP.v1.json`
- Index PDFs: `release/INDEX_PDFS.json`

## Conteos
- total clusters: 18
- CANON count: 18
- PASS_PDF_ONLY count: 3
- mirrors skipped: 1
- duplicates skipped: 0

## Reproducibility
- PDFs are immutable artifacts; identified by sha256.
- Canon selection policy is deterministic; see CANON_MAP.

## Admissibility
- Existe pipeline de admisibilidad en el proyecto.
- Referencias PR6-PR8: NOT_AVAILABLE en este paquete de release si no constan explícitas en PDFs.

## Directory map
```text
release_repo_qicn_2026-03-01*/
  README.md
  release/
    CANON_MAP.v1.json
    INDEX_PDFS.json
    RELEASE_MAP.md
    BLUEPRINT_EDITORIAL.md
    SUMMARY.json
    FREEZE_AUDIT_v1/
      git_log_1.txt
      git_tags.txt
  corpus/
    pdf_release/
      _unpacked/
      pdfs/
      manifest.json
      manifest.sha256.txt
      pdf_corpus.zip
      pdf_corpus.zip.sha256.txt
```

## Policy
- NotebookLM/SISTEMA_CANON_PAPERS = mirror-only.
- rigid-identity-framework/paperX = preferred source lineage cuando aparece en paths.
