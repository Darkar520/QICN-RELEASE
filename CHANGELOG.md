# CHANGELOG

## [release-2026-03-01] - v1 Release Package (audit-ready)

### H1 - PDF corpus consolidado (distribucion verificable)
- Corpus PDF empaquetado en `corpus/pdf_release/pdf_corpus.zip`.
- Integridad verificable por hash SHA-256 (`pdf_corpus.zip.sha256.txt`) y manifest (`manifest.json` + `manifest.sha256.txt`).

### H2 - Canonizacion documental (control editorial minimo)
- Se definio canonizacion y clustering en `release/CANON_MAP.v1.json`.
- Indice de PDFs en `release/INDEX_PDFS.json`.

### H3 - Blueprint editorial (mapa de alineacion)
- `release/BLUEPRINT_EDITORIAL.md` define lineamientos de alineacion, definiciones y ubicacion sugerida de secciones.
- `release/RELEASE_MAP.md` como mapa de navegacion del release.

### H4 - Gobernanza de release (auditable)
- `RELEASE_NOTES.md` establece verificacion por hashes y no-goals del paquete.
- `.gitignore` ajustado para evitar artefactos temporales/caches en commits.

### H5 - Deduplicacion determinista
- PDFs deduplicados por SHA-256 (solo un representante por hash).
- Duplicados tratados via canon map / index (sin ambiguedad en el bundle).

### H6 - Manejo explicito de "PDF-only"
- Documentos sin fuente compilable incluida se manejan como "PDF canonical" (limitacion explicita en release notes).

### H7 - Estructura de repositorio orientada a distribucion
- Release prioriza distribucion verificable del corpus PDF sobre recompilacion desde fuentes.
- Se excluyen caches/builds temporales.

### H8 - Preparacion para iteracion editorial posterior
- El paquete queda listo para una fase posterior de edicion editorial: unificacion de definiciones, Methods/Admissibility, RO/SNO, reduccion de redundancia.
