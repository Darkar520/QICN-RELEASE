# QICN Paper 3 Extension and Source Status v1

Fecha: 2026-06-03.
Alcance: `paper3`, con verificacion preliminar de fuentes para `basecore` y papers 4--10.

## 1. Resultado ejecutivo

Paper 3 fue extendido y recompilado desde su propio `paper3/main.tex`, sin crear un PDF desde cero y sin mezclar contenido de Paper 7.

PDF final:

`paper3/main.pdf`

Paginas finales:

`17`

Estado:

`PAPER3_EXTENDED_RECOMPILED`

Actualizacion posterior:

`PAPER3_RULE_ADJUSTED_RECOMPILED`

Se retiro del paper la metanarrativa explicita sobre no-overlap con otros papers y se reemplazo por contenido tecnico propio sobre null-fiber geometry. Tambien se reemplazo lenguaje de witness circularity por witness independence.

## 2. Principio editorial aplicado

La expansion no agrego contenido sobre operational life, subjecthood, first-person subjectivity ni phenomenal bridge organization. Esos temas pertenecen a papers posteriores.

La expansion se mantuvo dentro del dominio propio de Paper 3:

- null-regime instability;
- extension witnesses;
- lower-bound certification;
- failure modes;
- robust margin under estimator error;
- negative controls;
- boundary with adjacent papers;
- correction of canonical-family overclaim risk.

## 3. Cambios teoricos principales

### C1 - Witness audit layer

Se agrego una capa de auditoria de testigos:

- `Witness certificate`;
- `Non-circular witness admissibility`;
- `Certificate sufficiency`;
- explicit non-theorem on what certificates do not prove;
- failure modes for witness certification;
- robust decision margin;
- negative controls.

### C2 - Robust margin

Se agrego una regla formal:

Si un witness certificate da `C epsilon > 2 eta`, dos estimaciones con error `eta` no pueden ser certificadas conjuntamente como el mismo null element.

Esto no convierte runtime estimates en prueba; solo fija una condicion de margen si un estimador ya existe y tiene error certificado.

### C3 - Correction of canonical-family bounds

Se reemplazo la lectura peligrosa de que profinite/symbolic families dan automaticamente una constante positiva. Ahora la cota requiere un lower-bound certificate independiente.

Razon: compactness, summability, Lipschitz continuity or coordinate weights do not alone imply a positive lower Lipschitz constant. Cancellation or quotient collapse can force the effective constant to zero.

### C4 - Corpus role and non-overlap

Se agrego una seccion que delimita que pertenece a Paper 3 y que pertenece a Basecore/Papers 1--2/Papers 4--10. Esto evita redundancia y evita contaminar Paper 3 con temas posteriores.

## 4. Build ejecutado

Comandos:

1. `pdflatex -interaction=nonstopmode main.tex`
2. `biber main`
3. `pdflatex -interaction=nonstopmode main.tex`
4. `pdflatex -interaction=nonstopmode main.tex`
5. `pdflatex -interaction=nonstopmode main.tex`
6. `pdflatex -interaction=nonstopmode main.tex` despues del ajuste de regla editorial

`biber` completo correctamente en el segundo intento. El primer intento expiro por tiempo.

## 5. Hashes finales

| Archivo | SHA256 |
|---|---|
| `paper3/main.tex` | `E437C515B200A557950CDFA37F4A171B162A1DDB0E6A57DC04C6234BF9DB596F` |
| `paper3/main.pdf` | `5856B98441BDFEA4A7C4AEDFDCF7F1C7EB7FC122A03537AC8CD29DFEF2681A23` |
| `paper3/main.bbl` | `016F2B77B7093DE21E3F5C0CA52B01D4A8BF7F20AF9E46008D4FC47EE5DAE3A5` |
| `paper3/main.bcf` | `9C9E1CB1CD24595156290EC8D39530D253C610016FF7B258E76F480E50187B4B` |
| `paper3/main.log` | `2CB56793DF7148F420A2B69E06FF2E29D6A6935E6A8D9FA77C9A839BA64E2440` |

Previous active Paper 3 PDF hash before this recompilation:

`D854953CD1066121DB4398201AC855F0B987A5B5E21281D0353C111FEB2684C0`

## 6. Compile diagnostics

Final `main.log`:

- no `Overfull` entries detected after final pass;
- no unresolved-reference warnings detected after final pass;
- underfull boxes remain in narrow tables; these are typography warnings, not compile failure.

`biber` warnings:

- 54 duplicate-entry warnings in `../../release/references.bib`;
- these are global bibliography hygiene issues, not introduced by the Paper 3 extension.

## 7. Source status for Basecore and Papers 4--10

The claim that basecore and papers 4--10 have no LaTeX source is not correct in the current workspace. They do have source files.

| Unit | Source status | Observed source/dependency pattern |
|---|---|---|
| `basecore` | Source present | `BASECORE.tex`, `core/canonical_core_references.bib`, `core/sections/*.tex` |
| `paper4` | Source present | `main.tex`, `main.pdf`, central `../../release/references.bib` |
| `paper5_operational_consciousness` | Source present | `main.tex`, `main.pdf`, central `../../release/references.bib` |
| `paper6_predictions_falsation` | Source present | `main.tex`, `main.pdf`, central `../../release/references.bib` |
| `paper7_operational_life_subjecthood` | Source present | `main.tex`, `main.pdf`, central `../../release/references.bib` |
| `paper8_first_person_subjectivity` | Source present | `main.tex`, `main.pdf`, central `../../release/references.bib` |
| `paper9_phenomenal_bridge_organization` | Source present | `main.tex`, `main.pdf`, `references.bib`, `paper9_local_references.bib` |
| `paper10_external_adjudication` | Source present | `main.tex`, `main.pdf` |

Therefore the next repair target is not "generate missing LaTeX from PDFs" for these units. The next target is:

`SOURCE_PDF_SYNCHRONIZATION_AND_REPRODUCIBILITY_AUDIT`

## 8. Recommended next phase

1. For each of `basecore` and papers 4--10, compute pre-hashes of `.tex`, `.pdf`, and bibliography dependencies.
2. Recompile each unit from its existing source.
3. Compare output page count and hash against the current PDF.
4. If output diverges, classify as:
   - reproducible exact;
   - reproducible but hash-different;
   - source/PDF drift;
   - missing dependency;
   - build-environment drift.
5. Only after that, extend Paper 4 and Paper 6 using their current `main.tex` as base.

## 9. No-claims

This pass does not introduce external validation, empirical evidence, consciousness detection, life detection, subjecthood detection, or phenomenal claims. It strengthens Paper 3 as a conditional structural theorem paper.
