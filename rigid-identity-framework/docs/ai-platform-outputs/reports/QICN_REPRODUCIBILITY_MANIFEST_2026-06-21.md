# QICN Reproducibility Manifest — 2026-06-21

**Agente:** Kiro (ejecutor de reproducibilidad, auditor escéptico, no-destructivo).
**Alcance:** recompilación mecánica in situ de cada unidad del corpus (BASECORE +
paper1..paper10 + paper_bridge + monolithic) y manifiesto único de páginas + SHA256.

> **Nota anti-inflación (obligatoria).** La compilación exitosa es
> **reproducibilidad mecánica únicamente**. NO es validación científica, NO es
> validación externa, NO es peer review, NO es prueba human-curated. Ningún claim
> se elevó a NEW_CLAIM. `external_support_certified=false` y
> `FULL_COP_MEMBERSHIP: NOT_YET` permanecen intactos. No se editó ningún `.tex` ni
> `.bib`.

## Toolchain

- **pdflatex:** MiKTeX-pdfTeX 4.18 (MiKTeX 24.1)
- **biber:** 2.21
- **Nota OS:** MiKTeX emite un banner no fatal "unsupported version of Windows";
  la compilación procede con EXIT 0.
- **Secuencia (in situ por unidad):** `pdflatex (nonstopmode) -> biber -> pdflatex
  -> pdflatex`. Las fuentes nunca se regeneraron.

## Baseline de verificación (antes/después)

> Los tres scripts `.cjs` solicitados (`verify-canonical-integrity.cjs`,
> `verify-claim-registry.cjs`, `verify-canonical-release.cjs`) y
> `audit-public-release-reproducibility.cjs` **NO EXISTEN** en el repo (0 archivos
> `.cjs`; `package.json` no los referencia). Se usó la cadena canónica real.

| Verificación | Resultado |
|---|---|
| `npm run verify` (v31) | **EXIT 0** — PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; `external_support_certified=false` |
| `npm run verify:corpus-registry` | **EXIT 0** |
| `npm run verify:macro-registry` | **EXIT 0** |

## Criterios de estado

- **CLEAN** = compila + 0 referencias indefinidas + 0 citas indefinidas + 0 labels duplicados
- **WARN** = compila pero con refs/citas/labels pendientes
- **FAIL** = no compila

## Tabla de unidades

| Unidad | PDF | Páginas | SHA256 | refs_indef | citas_indef | labels_dup | Status |
|---|---|---|---|---|---|---|---|
| basecore | basecore/BASECORE.pdf | 44 | E13F48BB…E58AC | 0 | 0 | 0 | CLEAN |
| paper1 | paper1/main.pdf | 26 | BA8D8A9D…012B0 | 0 | 0 | 0 | CLEAN |
| paper2 | paper2/main.pdf | 17 | 2267116F…AB27A | 0 | 0 | 0 | CLEAN |
| paper3 | paper3/main.pdf | 17 | 9FBA3C6E…DE08F | 0 | 0 | 0 | CLEAN |
| paper4 | paper4/main.pdf | 16 | 98C47D4E…2E52 | 0 | 0 | 0 | CLEAN |
| paper5_operational_consciousness | paper5_operational_consciousness/main.pdf | 28 | 4B470DBF…E791 | 0 | 0 | 0 | CLEAN |
| paper6_predictions_falsation | paper6_predictions_falsation/main.pdf | 22 | 418C5765…12B7 | 0 | 0 | 0 | CLEAN |
| paper7_operational_life_subjecthood | paper7_operational_life_subjecthood/main.pdf | 28 | 4C5A76CD…A1E7 | 0 | 0 | 0 | CLEAN |
| paper8_first_person_subjectivity | paper8_first_person_subjectivity/main.pdf | 43 | 472CAC37…5E47 | 0 | 0 | 0 | CLEAN |
| paper9_phenomenal_bridge_organization | paper9_phenomenal_bridge_organization/main.pdf | 42 | A24F6101…A5D2 | 0 | 0 | 0 | CLEAN |
| paper10_external_adjudication | paper10_external_adjudication/main.pdf | 33 | C033BAA9…EB7D | 0 | 0 | 0 | CLEAN¹ |
| paper_bridge_operational_subjecthood | paper_bridge_operational_subjecthood/main.pdf | 25 | BBB65B9B…D1B2 | 0 | 0 | 0 | CLEAN |
| monolithic | monolithic/QICN_MONOLITHIC.pdf | 335 | 967CC915…3967 | 0 | 0 | 0 | CLEAN² |

(SHA256 completos en el `.json` acompañante.)

**Totales:** 13 unidades | 13 CLEAN | 0 WARN | 0 FAIL | 676 páginas.

### Notas

1. **paper10_external_adjudication** — el paso `biber` devolvió **EXIT 2**
   (`Cannot find main.bcf`). El documento **no usa biblatex** (sin
   `addbibresource`, sin `thebibliography`; `main.bbl` = 0 bytes). El fallo de
   biber es un artefacto de invocación sobre un documento sin bibliografía, **no
   un defecto del PDF**. Los pasos `pdflatex` dieron EXIT 0 y 0 indefinidas.
   **Causa raíz (sin ejecutar corrección):** el protocolo de 4 pasos invoca biber
   incondicionalmente; para esta unidad biber es innecesario. No se editó nada.

2. **monolithic** — compilado in situ desde el wrapper existente (NO reensamblado
   desde los papers). CLEAN según los criterios de este manifiesto (0 indefinidas).
   **NOTA:** el gate propio del proyecto `npm run audit:monolithic-build-quality`
   (v20) devuelve **FAIL (EXIT 1)** por **26 warnings tipográficos de LaTeX** (7
   overfull hbox, 7 hyperref pdfstring warnings); `undefined_references=0`. Son
   cosméticos, no defectos de referencia/cita/label, y **no se corrigieron** (sin
   edición de fuente).

## Discrepancias encontradas

- Scripts `.cjs` de baseline solicitados: **ausentes** (0 `.cjs` en el repo).
- `audit-public-release-reproducibility.cjs`: **ausente**; se usó el real
  `npm run audit:monolithic-build-quality`.
- paper10: biber EXIT 2 (documento sin biblatex; artefacto inofensivo).
- monolithic: gate v20 FAIL solo por warnings tipográficos (0 referencias
  indefinidas).

## Causas raíz propuestas (NO ejecutadas)

- **paper10 / biber:** el documento no define bibliografía; o bien se añade
  biblatex+`.bib` si se desea bibliografía, o se omite el paso biber para esta
  unidad. Decisión del usuario; ninguna acción aplicada.
- **monolithic / overfull boxes:** ajuste tipográfico (line-breaking, `sloppy`,
  o revisión de tablas/urls largas). No se tocó la fuente; es deuda cosmética
  rastreada, no bloqueante para reproducibilidad mecánica.
