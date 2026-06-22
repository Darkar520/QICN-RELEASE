# QICN — Convenciones de Compilación por Unidad

**Estado:** convención de reproducibilidad activa.
**Fecha:** 2026-06-22.
**Agente:** Kiro (ejecutor de cierre de gaps de tooling/provenance, no-destructivo).
**Alcance:** registrar convenciones de compilación in situ por unidad del corpus
cuando la secuencia genérica de 4 pasos (`pdflatex -> biber -> pdflatex ->
pdflatex`) no aplica tal cual. No modifica ninguna fuente `.tex`/`.bib`.

> **Nota anti-inflación.** Una compilación exitosa es reproducibilidad mecánica
> únicamente: no es validación científica, externa ni human-curated. Ningún claim
> se eleva a NEW_CLAIM; `external_support_certified=false` y
> `FULL_COP_MEMBERSHIP: NOT_YET` permanecen intactos.

## Convención CC-1 — `paper10_external_adjudication` es una unidad sin bibliografía

**Convención.** `paper10_external_adjudication` se compila **sin** el paso `biber`.
Es una unidad sin bibliografía por diseño y el paso `biber` debe **omitirse** para
esta unidad.

**Secuencia de compilación correcta (in situ):**

```text
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

**Evidencia (verificada 2026-06-22):**

- `main.tex` no contiene `\cite`, `\addbibresource`, `\bibliography`,
  `\thebibliography`, `\printbibliography`, `\bibitem` ni paquete `biblatex`.
- `main.bbl` = 0 bytes; `main.bcf` no existe.
- `pdflatex` x2 => EXIT 0, 33 páginas, 0 referencias indefinidas, 0 citas
  indefinidas.

**Naturaleza del defecto.** Es un **defecto de protocolo**, no del PDF: el runner
de reproducibilidad de 4 pasos invoca `biber` incondicionalmente, y sobre un
documento sin biblatex `biber` devuelve EXIT 2 (`Cannot find main.bcf`). Ese
EXIT 2 es un artefacto de invocación inofensivo, no una regresión del documento.

**Acción NO permitida bajo esta convención.** No se debe "arreglar" el EXIT 2
inventando una bibliografía (`\addbibresource` + `.bib` vacío o ficticio) ni
añadiendo `biblatex` sin contenido bibliográfico real. Si en el futuro paper10
necesitara bibliografía, sería un cambio de contenido deliberado, fuera del
alcance de esta convención de reproducibilidad.

**Cruce con el manifiesto.** Esta convención formaliza, como práctica establecida,
la "causa raíz propuesta (NO ejecutada)" de paper10/biber registrada en
`docs/ai-platform-outputs/reports/QICN_REPRODUCIBILITY_MANIFEST_2026-06-21.md`
(nota 1). No se reescribe ese manifiesto fechado.

## Nota de corrección — ubicación de los gates `.cjs`

El manifiesto 2026-06-21 afirma que los verificadores `.cjs`
(`verify-canonical-integrity.cjs`, `verify-claim-registry.cjs`,
`verify-canonical-release.cjs`) "NO EXISTEN". Eso es incorrecto por **tier**: esos
`.cjs` viven en el repositorio **padre** `QICN-FRAMEWORK/scripts/`, no en
`rigid-identity-framework/scripts/`. Verificado 2026-06-22: los tres existen y
devuelven **PASS / EXIT 0** (`canonical_pdf_count=25`, claim registry `entries=17`,
release PASS). La cadena del framework (`npm run ...`) vive en
`rigid-identity-framework/`. Esta nota corrige el tier sin reescribir el
manifiesto fechado.
