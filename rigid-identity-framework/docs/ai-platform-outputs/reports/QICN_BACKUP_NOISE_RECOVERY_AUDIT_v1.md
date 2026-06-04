# QICN Backup Noise Recovery Audit v1

Fecha: 2026-06-03.
Backup auditado: `rigid-identity-framework-backup-noise`.
Marco activo comparado: `rigid-identity-framework`.
Modo: auditoria de recuperacion. No se movio, borro ni restauro ningun archivo.

## 1. Pregunta de auditoria

Determinar si el backup contiene archivos teoricamente relevantes que fueron retirados injustamente del marco activo, o si debe mantenerse como ruido/archivo historico sin reintegracion.

La regla usada fue conservadora: un archivo no se recomienda para retorno solo porque exista en el backup. Debe aportar una de estas cosas:

- fuente LaTeX no representada en el activo;
- PDF/fuente mas extenso con perdida plausible de contenido;
- evidencia o procedencia unica;
- snapshot necesario para trazabilidad;
- resultado tecnico no absorbido por una version posterior.

## 2. Estructura del backup

El backup no es plano. Contiene:

| Ruta | Archivos | PDF | TeX | MD | JSON | Clasificacion preliminar |
|---|---:|---:|---:|---:|---:|---|
| `artifacts` | 4 | 0 | 0 | 0 | 4 | Decision records PRED-EXT-01 |
| `paper_bridge_operational_subjecthood` | 1 | 0 | 1 | 0 | 0 | Fuente LaTeX puente suelta |
| `rigid-identity-framework` | 236 | 6 | 16 | 53 | 31 | Snapshot parcial anidado |

Dentro del snapshot anidado:

| Carpeta | Archivos | PDF | TeX | MD | JSON | Diagnostico |
|---|---:|---:|---:|---:|---:|---|
| `canonical_core_legacy` | 8 | 0 | 0 | 0 | 0 | No contiene fuente/PDF directo; no rescate inmediato |
| `docs` | 121 | 5 | 5 | 53 | 31 | Contiene historico v18-v25 y teoria I_int |
| `monolithic` | 20 | 1 | 11 | 0 | 0 | Contiene secciones LaTeX y monolito alternativo |
| `paper1` | 9 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper2` | 8 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper3` | 10 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper4` | 8 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper5_operational_consciousness` | 10 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper6_predictions_falsation` | 10 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper7_operational_life_subjecthood` | 9 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper8_first_person_subjectivity` | 7 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper9_phenomenal_bridge_organization` | 7 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper10_external_adjudication` | 4 | 0 | 0 | 0 | 0 | Solo logs/auxiliares |
| `paper_bridge_operational_subjecthood` | 5 | 0 | 0 | 0 | 0 | Solo auxiliares del bridge |

## 3. Resultado sobre carpetas `paper1` a `paper10`

Conclusion: no hay fuentes LaTeX ni PDFs dentro de las carpetas `paper1` a `paper10` del backup anidado.

Los archivos detectados son:

- `main.aux`;
- `main.bcf`;
- `main.log`;
- `main.out`;
- `main.run.xml`;
- `main.bbl`;
- `main.blg`;
- `main.toc`;
- logs de compilacion de Codex;
- `build_pass1.log`.

Decision: no devolver estos archivos al marco teorico. Son artefactos de compilacion o logs. Pueden conservarse como evidencia historica si se desea, pero no deben volver a las carpetas canonicas de paper.

## 4. Comparacion de secciones monolithic contra papers activos

El backup contiene secciones de monolito como `02-paper1.tex`, `03-paper2.tex`, etc. Se compararon contra los `main.tex` activos equivalentes.

| Backup | Activo comparado | Bytes backup | Bytes activo | Delta activo-backup | Recomendacion |
|---|---|---:|---:|---:|---|
| `02-paper1.tex` | `paper1/main.tex` | 78152 | 84883 | +6731 | No restaurar; activo mas completo |
| `03-paper2.tex` | `paper2/main.tex` | 50120 | 52954 | +2834 | No restaurar; activo mas completo |
| `04-paper3.tex` | `paper3/main.tex` | 34816 | 42163 | +7347 | No restaurar como fuente; el problema real sigue siendo `paper3/main-3.pdf` |
| `05-paper4.tex` | `paper4/main.tex` | 29393 | 30433 | +1040 | No restaurar; activo mas completo |
| `06-paper5.tex` | `paper5_operational_consciousness/main.tex` | 95391 | 96939 | +1548 | No restaurar; activo mas completo |
| `07-paper6.tex` | `paper6_predictions_falsation/main.tex` | 47926 | 50765 | +2839 | No restaurar; activo mas completo |
| `08-paper7.tex` | `paper7_operational_life_subjecthood/main.tex` | 78864 | 82184 | +3320 | No restaurar; activo mas completo |
| `09-paper8.tex` | `paper8_first_person_subjectivity/main.tex` | 130518 | 133563 | +3045 | No restaurar; activo mas completo |
| `10-paper9.tex` | `paper9_phenomenal_bridge_organization/main.tex` | 121717 | 125173 | +3456 | No restaurar; activo mas completo |
| `11-paper10.tex` | `paper10_external_adjudication/main.tex` | 68601 | 67822 | -779 | Candidato menor de diff, no restauracion directa |

Los hashes no coinciden en ningun caso. Esto indica evolucion editorial, pero el tamano favorece al activo en 9 de 10 comparaciones.

## 5. Candidato C1: `paper10` requiere diff de contenido, no restauracion

`monolithic/build/sections/11-paper10.tex` del backup es 779 bytes mayor que `paper10_external_adjudication/main.tex` activo. Un `git diff --no-index --stat` indico:

`1 file changed, 163 insertions(+), 125 deletions(-)`

Interpretacion: no es una simple version mas extensa. Hay cambios cruzados. Por tanto, no debe copiarse encima del activo.

Recomendacion:

- crear una revision manual de diff;
- extraer solo contenido cientifico no redundante si existe;
- no restaurar el archivo completo.

Estado: `DIFF_REVIEW_CANDIDATE`.

## 6. Candidato C2: paper puente operacional

Ruta:

`rigid-identity-framework-backup-noise/paper_bridge_operational_subjecthood/main.tex`

Hash:

`A212979997A2D6BB16DB9EA0B31D2C136289B1CFF8FA5093252F628C9DC6DEED`

Titulo detectado:

`From Structural Invariants to Operational Subjecthood: A Constructive Bridge`

Secciones detectadas incluyen:

- `Scope, System Boundary, and Non-Inference Note`;
- `Operational Self-Reference`;
- `Operational Unified Perspective`;
- `Operational Intentionality`;
- `Operational Qualia`;
- `Operational Phenomenology`;
- `Operational Subjecthood`;
- `Theorem: Partial Operational Subjecthood`;
- `What Is NOT Implied`;
- `Computational Verification Status`;
- `Terminology Stratification and Debt Ledger`;
- `Runtime Evidence Taxonomy`;
- `Non-Entailment Library`;
- `External Adjudication Readiness Index`;
- `Open Questions`.

Comparacion:

- backup suelto: 79790 bytes;
- backup monolithic section `12-bridge.tex`: 77288 bytes;
- activo `monolithic/build/sections/12-bridge-paper.tex`: 76635 bytes.

Un diff contra el activo mostro:

`1 file changed, 1 insertion(+), 95 deletions(-)`

Interpretacion: el archivo suelto parece contener preambulo/estructura completa y un bloque adicional frente al fragmento activo. No se debe meter como paper canonico sin auditoria semantica, porque usa terminos interpretativos fuertes como `subjecthood`, `qualia`, `phenomenology` e `intentionality`.

Recomendacion:

- recuperar como candidato en una carpeta de revision, no como canon inmediato;
- someter a auditoria de inflacion semantica;
- separar formalmente definiciones operativas de interpretacion fenomenologica;
- si aporta contenido no redundante, integrarlo como apendice o bridge note con no-claims fuertes.

Estado: `RECOVERY_REVIEW_CANDIDATE`.

## 7. Candidato C3: notas I_int v18-v22

El backup contiene en `docs/theory`:

- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.tex/pdf`;
- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.tex/pdf`;
- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex/pdf`;
- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.tex/pdf`;
- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex/pdf`.

El activo no contiene esos archivos con esos nombres. El activo si contiene artefactos posteriores relacionados con finite separator packages, incluyendo v22 JSONs.

Titulos y secciones detectadas indican que estas notas documentan:

- product-separator counterexample;
- conditional closure of `I_int`;
- finite package primitives;
- constructed v21/v22 package;
- main theorem;
- non-circularity and reviewer burden;
- implementation status.

Decision: no insertar en canon teorico activo automaticamente. Sin embargo, si son relevantes para la historia formal de `I_int`, pueden rescatarse como archivo historico de teoria o recovery appendix.

Recomendacion:

- recuperar v22 primero como `historical_source_candidate`;
- comparar contra `FINITE_SEPARATOR_COMPLETE_PACKAGE_v22` activo;
- si v22 contiene explicacion formal no preservada en reportes/JSON actuales, integrarla en `docs/theory` o `docs/ai-platform-outputs/recovery/` con estatus no canonico.

Estado: `HISTORICAL_THEORY_REVIEW_CANDIDATE`.

## 8. Candidato C4: PRED-EXT-01 decision records

El backup contiene:

| Backup decision record | Hash | Estado |
|---|---|---|
| `rehearsal_run_001/decision_record.json` | `2FC99C7987D23C844230DA629AC14C1671E12B924BE1E66F76D55DAD33805AF0` | No localizado en activo por nombre equivalente |
| `v1_internal_pilot_001/decision_record.json` | `BF677B9F839D549A8C3AC4F89676B34FE055A2D162DE2D9740751056003DF99F` | Ya existe en activo como `PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json` |
| `v2_cleanroom_synthetic_001/decision_record.json` | `02A16B7D91A17AA859783667724A18A66D2A352578FC7C34C524CF82B32E2E21` | No localizado en activo por nombre equivalente |
| `v3_cleanroom_synthetic_001/decision_record.json` | `1F95A817D8CB585297F0348474C1734D6FAEBE6A554695617A81057430F9CD04` | Ya existe en activo como `PRED_EXT_01_CLEANROOM_DECISION_RECORD.json` |

El boundary del v3 activo/backup es correcto: declara soporte sintetico clean-room, no evidencia empirica, no adjudicacion externa y no validacion de conciencia, fenomenalidad, identidad, agencia, estatus moral ni el framework completo.

Decision:

- no restaurar v1 ni v3: ya estan preservados por hash;
- revisar si rehearsal y v2 deben archivarse como trazabilidad historica;
- no usarlos como evidencia cientifica externa.

Estado: `PROVENANCE_ARCHIVE_CANDIDATE` para rehearsal y v2.

## 9. Monolito alternativo del backup

Backup:

- ruta: `rigid-identity-framework-backup-noise/rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf`;
- paginas estimadas: 348;
- bytes: 2649104;
- hash: `7636569DD85AFE7D16231E4D2DCFF22E9D71F2BDBE0D75C202A05228CE9EB8EE`.

Activo:

- ruta: `rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf`;
- paginas estimadas: 329;
- bytes: 2594106;
- hash: `1F056F61B101766998968DA347606E9EB5D806F7FBFF69F00ACA3F0300483AFB`.

Decision: no reemplazar el activo. El backup tiene mas paginas estimadas, por lo que puede contener material omitido o diferencias de build, pero debe tratarse como snapshot alternativo.

Recomendacion:

- comparar indice/TOC si se hace una fase 2;
- no usar como fuente directa de papers;
- registrar como `MONOLITHIC_HISTORICAL_SNAPSHOT_CANDIDATE`.

## 10. Archivos que no deben volver

No se recomienda devolver al marco activo:

- logs `__codex_pdflatex_*`;
- `build_pass1.log`;
- auxiliares `.aux`, `.bcf`, `.bbl`, `.blg`, `.out`, `.run.xml`, `.toc`;
- reportes historicos masivos como canon teorico;
- secciones monolithic antiguas para sobreescribir `paper*/main.tex`;
- `paper1` a `paper10` del backup anidado, porque no contienen fuente ni PDF.

## 11. Dictamen

No hay evidencia suficiente para restaurar automaticamente carpetas completas del backup.

Si se procede a rescate, los candidatos reales son puntuales:

1. `paper_bridge_operational_subjecthood/main.tex` como candidato de revision, no canon inmediato.
2. `docs/theory/I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex/pdf` como candidato historico de teoria, comparado contra finite-separator v22 activo.
3. `artifacts/pred-ext-01/rehearsal_run_001/decision_record.json` y `v2_cleanroom_synthetic_001/decision_record.json` como candidatos de archivo de procedencia.
4. `monolithic/QICN_MONOLITHIC.pdf` del backup como snapshot historico alternativo.
5. `monolithic/build/sections/11-paper10.tex` como diff-review candidate.

Ninguno debe restaurarse por copia directa sobre el activo.

## 12. Siguiente fase recomendada

Crear una carpeta de cuarentena de recuperacion, por ejemplo:

`docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/`

Luego copiar ahi solamente los candidatos C1-C4 y producir diffs formales antes de decidir integracion canonica.

No hacer movimiento destructivo. No tocar `paper1` a `paper10` activos todavia.

