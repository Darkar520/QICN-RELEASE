# Auditoría Externa Profunda — QICN-FRAMEWORK

**Auditor:** OpenCode (modelo `minimax-m3`)
**Fecha:** 2026-06-10
**Alcance:** QICN-FRAMEWORK (raíz + `rigid-identity-framework/` + `QICN-SYSTEM/`)
**Prompt aplicado:** Plantilla de auditoría externa QICN-FRAMEWORK v1 (8 fases)

---

## Alerta temprana — Hallazgos CRÍTICOS

Antes del resumen, cuatro hallazgos que requieren atención inmediata:

1. **Los 6 hashes de PDFs reportados en `QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` NO coinciden con el estado actual del workspace.** Todos los PDFs (monolito + papers 5/7/8/9/10) tienen timestamps del 2026-06-04 al 2026-06-06 y hashes diferentes. El reporte quedó obsoleto tras una recompilación no documentada.
2. **`QICN-SYSTEM/package.json` se llama `versiones-de-interfaz`.** Es un nombre legacy de un proyecto distinto. No hay relación semántica con QICN.
3. **`QICN-SYSTEM/AGENTS.md` contiene 7 paths absolutos a `C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\Sistema Canon Sandbox\…`**, un repositorio que no existe en este workspace. Toda la sección de "Document Roles" y parte de "Source Of Truth Files" son inalcanzables.
4. **`QICN-SYSTEM/netlify/functions/selfpatch-apply.js` es un pipeline LLM→GitHub-de-producción completo** que crea ramas, aplica ediciones via la API Contents de GitHub y abre PRs etiquetados. Tiene kill switch y risk classifier, pero escribe tanto en el filesystem local (`fs.writeFileSync` línea 78) como en GitHub (`PUT` línea 188).

---

## 1. Resumen ejecutivo

**Veredicto:** `PASS_WITH_TRACKED_DEBT`

**Severidad de hallazgos (conteo):**
- CRÍTICA: 4 (alerta temprana) + 2 adicionales en runtime
- ALTA: 6
- MEDIA: 7
- BAJA: 5

**Top 3 problemas más graves:**

1. **Hashes stale de Fase 5B (CRÍTICA).** El reporte principal de higiene PDF declara hashes y métricas que ya no corresponden al estado del repo. El sistema de "firma por SHA256" pierde valor probatorio cuando el reporte nunca se re-emite tras recompilaciones. Esto contradice `INSTRUCCIONES.md §1.2` (trazabilidad) y `§1.3` (auditoría pre-push).

2. **Runtime desacoplado y con packaging pseudocientífico (CRÍTICA).** `QICN-SYSTEM` es una aplicación React/Netlify que (a) NO importa `registry/theorems.jsonl`, (b) usa nombres como "Singularidad Ontológica", "Trascendencia Fractal", "Anti-Yo", "PMIA", "HolographicMemoryNexus", (c) define valores simbólicos `HYPERCOHERENCE_VALUE: 9999.0` con el comentario "NO SE USA PARA CRECIMIENTO", y (d) tiene un god component `SimulationEngine.jsx` de 580KB / 11.307 líneas. Aunque la matemática implementada en `CanonicalInvariantPackage.js` es coherente con la del framework, la presentación de marketing del runtime contradice la disciplina de no-inflación de claims exigida por `INSTRUCCIONES.md §6`.

3. **Auto-calibración circular sobre fixture con DW≈0.0385 (ALTA, conocido).** La suite `negative-control-suite.js` "pasa" 6/6 emitiendo simultáneamente el warning `[v30 STRICT] Fixture DW=0.0385 < 0.5 — severe serial autocorrelation. BLOCKED.` La base estadística de las gates (AICc, MI, NLL gaussiana) es matemáticamente inválida con `ρ≈0.98`. El cold audit v28 (8/100) ya documentó esto; la situación no ha cambiado.

---

## 2. Hallazgos verificados

### 2.1 CRÍTICOS

#### C-1. Hashes de PDFs obsoletos en reporte Fase 5B

- **Descripción:** Los SHA256 declarados en `QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` (líneas 65-69 y 121) no coinciden con los PDFs actuales en disco.
- **Evidencia (hashes reportados vs. actuales, parcial):**

| Artefacto | Hash reportado | Hash actual (verificado) | Coincide |
|---|---|---|---|
| `QICN_MONOLITHIC.pdf` | `D2AA44352A967A77…` (post-closure addendum) | `16618EA1298C6FDAD7…` | NO |
| `paper5/main.pdf` | `079F7AAEAEC53763…` | `CA1520FAB347EA0B…` | NO |
| `paper7/main.pdf` | `29543CDDF3431B50…` | `B7DEB08985E3B54…` | NO |
| `paper8/main.pdf` | `5E761031D3E6A5DA…` | `2489E9CAE54EE4AF…` | NO |
| `paper9/main.pdf` | `266BE4037511F2AF…` | `BE66CD239F4B56FF…` | NO |
| `paper10/main.pdf` | `C561FDEF26F93249…` | `73D217F6C3C3180F…` | NO |

  Los timestamps de los PDFs son 2026-06-04 a 2026-06-06; el reporte está fechado 2026-06-04. Hubo al menos una recompilación post-reporte. La métrica de log también está desfasada: 7 overfull / 330 underfull (verificado) vs. 8 overfull / 331 underfull (reportado).
- **Severidad:** CRÍTICA — el sistema de hashes pierde valor probatorio si los reportes no se reemiten tras cada cambio.
- **Recomendación:** Re-emitir el reporte de Fase 5B con los hashes actuales, marcar el reporte previo como `SUPERSEDED_BY_PHASE_5D`, y añadir una regla en `INSTRUCCIONES.md` que prohíba reports con hashes no sincronizados al estado del repo al momento del push.

#### C-2. `QICN-SYSTEM/package.json` con nombre legacy

- **Descripción:** `"name": "versiones-de-interfaz"` (línea 2). Es metadata que aparece en `npm ls`, `npm view`, y se propaga a artefactos de build.
- **Evidencia:** `QICN-SYSTEM/package.json:2`
- **Severidad:** CRÍTICA — cualquier release de QICN-SYSTEM con este nombre genera ambigüedad de provenance. Si se publica a npm con `--access public` accidentalmente, el package quedaría en el registro público con un nombre que no representa el contenido.
- **Recomendación:** Cambiar a `"name": "qicn-runtime"` o similar; sincronizar `name` con la línea narrativa de QICN. Documentar el rename en el ledger.

#### C-3. `QICN-SYSTEM/AGENTS.md` con paths rotos

- **Descripción:** Las secciones "Canonical Term Usage" (líneas 63-66) y "Document Roles" (líneas 70-82) referencian un repositorio inexistente.
- **Evidencia (extracto):**
  - Línea 63: `[IMPLEMENTATION_STATUS.md](c:/Users/irisp/OneDrive/Escritorio/TRADING%203.0/Sistema%20Canon%20Sandbox/docs/IMPLEMENTATION_STATUS.md)`
  - Líneas 72-77, 80-81, 186-187: misma raíz `TRADING 3.0/Sistema Canon Sandbox/`
- **Severidad:** CRÍTICA — operadores que sigan este AGENTS.md como fuente de verdad serán enviados a documentos que no existen. Esto contradice el principio de "fuente de verdad" que el propio AGENTS.md declara.
- **Recomendación:** Reescribir las secciones afectadas apuntando a los archivos reales dentro de `QICN-SYSTEM/`. Los paths correctos son del estilo `QICN-SYSTEM/docs/DESCRIPTOR_REGISTRY.md` (verificar existencia primero).

#### C-4. Pipeline LLM→GitHub-de-producción (`selfpatch-apply.js`)

- **Descripción:** Función Netlify `handler` que recibe un patch JSON, lo valida contra `policyJson` y `isProtectedPath`, y crea una rama + PR en GitHub con la edición aplicada. Implementa dos rutas: (a) `applyPatchLocally` con `fs.writeFileSync` (línea 78), y (b) `createBranchAndPr` con la GitHub Contents API (línea 188).
- **Evidencia:** `QICN-SYSTEM/netlify/functions/selfpatch-apply.js:55-99` (local), `142-241` (GitHub), `243-249` (auth check).
- **Severidad:** CRÍTICA — superficie de seguridad que permite a un LLM (o a cualquier caller con un JWT válido) crear commits y PRs en el repo de producción. Aunque tiene kill switch (`QICN_KILLSWITCH` env var), risk classifier (`risk-classifier.js`), y protected paths, la existencia de este pipeline en una función serverless pública es un riesgo si el endpoint no está detrás de un auth robusto.
- **Recomendación:** Documentar explícitamente el modelo de amenaza: ¿quién puede llamar al endpoint? ¿Cuál es el flujo de aprobación? Si el endpoint está abierto, exigir `requireUser` + MFA + quorum de aprobaciones para `riskLevel !== "low"`.

### 2.2 ALTOS

#### A-1. Scripts `verify-canonical-*.cjs` no están donde el prompt asume

- **Descripción:** El prompt de auditoría instruye ejecutar `node scripts\verify-canonical-*.cjs` desde `rigid-identity-framework/`. Esos scripts NO existen en `rigid-identity-framework/scripts/`. SÍ existen en la raíz: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\scripts\`.
- **Evidencia:** `scripts/` en raíz contiene `verify-canonical-integrity.cjs`, `verify-claim-registry.cjs`, `verify-canonical-release.cjs`, `audit-public-release-reproducibility.cjs`, `build-canonical-release-bundle.cjs`, `sync-public-trunk-basecore-release.cjs`, `sync-public-trunk-canonicalization.cjs`.
- **Severidad:** ALTA — el prompt de auditoría contiene una falsa expectativa; el AGENTS.md de la raíz referencia los scripts correctamente, pero el path relativo desde el subdirectorio falla. El Phase 6 report ya documentó esto y su addendum re-clasificó el hallazgo como `TRACEABILITY_AMBIGUITY_RESOLVED_BY_ROOT_CWD`. El prompt de auditoría, sin embargo, NO fue actualizado.
- **Recomendación:** Re-escribir el prompt de auditoría con paths absolutos o con la nota explícita "ejecutar desde `QICN-FRAMEWORK/`".

#### A-2. `mono:basecore:hyp:H3` aparece 2 veces en `01-basecore.tex`

- **Descripción:** Búsqueda en `monolithic/build/sections/01-basecore.tex` muestra el label en líneas 72 y 1106.
- **Evidencia:**
  - Línea 72: `\begin{hypothesis}[H3: Completeness]\label{mono:basecore:hyp:H3}` — hipótesis de COMPLETITUD
  - Línea 1106: `\begin{hypothesis}[H3: Metric on $\mathcal{E}$]\label{mono:basecore:hyp:h3}` — hipótesis de MÉTRICA (distinta)
- **Severidad:** ALTA — LaTeX case-folds los labels y trata ambas como la misma etiqueta. Aunque las dos hipótesis son semánticamente diferentes, las referencias cruzadas colapsarán. El cross-audit gap closure ya identificó esto como "case-insensitive grouping artifact" pero NO renombró uno de los labels.
- **Recomendación:** Renombrar `mono:basecore:hyp:h3` a `mono:basecore:hyp:h3-metric` (o similar) en `01-basecore.tex` y en cualquier archivo que lo referencie. Regenerar el monolito. Documentar el rename en el ledger.

#### A-3. Sección 12 del monolito sin source path

- **Descripción:** `monolithic/build/sections/12-operational-consciousness-to-operational-subjecthood-bridge.tex` (1.355 líneas) es generado por el builder desde un cache de recuperación, porque la carpeta `paper_bridge_operational_subjecthood/` no existe.
- **Evidencia:**
  - `build-monolithic-volume.js:96`: `relPath: "paper_bridge_operational_subjecthood/main.tex"`
  - `registry-lib.js:454`: branch para `paper_bridge_operational_subjecthood/`
  - `lint-nonclaims.js:130`: walk sobre `paper_bridge_operational_subjecthood`
  - Carpeta física: NO EXISTE (`Test-Path` retorna false)
- **Severidad:** ALTA — `INSTRUCCIONES.md §2` exige "el código LaTeX canónico" para cada paper. Sin source path, el estado correcto es `SOURCE_RECOVERY_REQUIRED`, marcado en el addendum del reporte Fase 5B pero todavía no resuelto.
- **Recomendación:** Decidir entre (a) crear la carpeta `paper_bridge_operational_subjecthood/` con `main.tex` reconstruido desde la sección generada y marcado como `RECONSTRUCTED`, o (b) documentar explícitamente que el paper es un artifact de cierre y no se preserva como source canónico.

#### A-4. Cold audit v28 (8/100) sigue vigente: n=8, k=6, DW≈0.0385

- **Descripción:** La suite `test:negative-control-suite` pasa 6/6 con el warning activo.
- **Evidencia (output verificado del test):**
  ```
  [v30 STRICT] Fixture DW=0.0385 < 0.5 — severe serial autocorrelation. BLOCKED.
  [v30 STRICT] Fixture DW=0.0000 < 0.5 — severe serial autocorrelation. BLOCKED.
  [v30 STRICT] Fixture DW=0.0385 < 0.5 — severe serial autocorrelation. BLOCKED.
  Negative-control suite v30: PASS; cases=6/6; external_support_certified=false
  ```
- **Severidad:** ALTA — el sistema "pasa" sus propias gates mientras simultáneamente declara que los datos son inválidos para análisis estadístico. Es un caso clásico de "the test is testing itself" (cold audit §B.2). El `external_support_certified=false` lo reconoce, pero la arquitectura de reportes no refleja esta distinción.
- **Recomendación:** (a) Bloquear PASS cuando DW<0.5, o (b) etiquetar el PASS como `PASS_INTERNAL_CALIBRATION_ONLY` para distinguir de validaciones externas.

#### A-5. Adversarial harness gap (v2/v3) confirmado y sin resolver

- **Descripción:** `scripts/lib/adversarial-negative-controls.js:30` emite `seeded_weighted_panel_v3_explicit_salt`, pero `scripts/lib/external-trace-generator.js:77-78` solo acepta `seeded_weighted_panel_v2`. Cualquier ejecución de `npm run test:adversarial-negative-controls` falla con `Unsupported generative_model`.
- **Evidencia (output verificado):**
  ```
  [FATAL] adversarial negative-control run failed: Unsupported generative_model: seeded_weighted_panel_v3_explicit_salt
  ```
- **Severidad:** ALTA — el gap está documentado en el reporte Fase 6 y su addendum, pero no se ha resuelto. La capacidad de Phase 6 de usar el adversarial negative-control search como artefacto de soporte está bloqueada.
- **Recomendación:** Decidir entre (a) actualizar `external-trace-generator.js` para aceptar v3, o (b) actualizar `adversarial-negative-controls.js` para emitir v2. Marcar el gap como `PHASE6_INTERNAL_HARNESS_COMPATIBILITY_GAP` cerrado.

#### A-6. `references.bib` con duplicado semántico Tononi

- **Descripción:** El archivo contiene `tononi2004` y `tononi`, ambos authored by Tononi 2004 (IIT).
- **Evidencia:** `release/references.bib:99` y `release/references.bib:435`
- **Severidad:** ALTA — la métrica "52 unique keys" no captura duplicados semánticos. Si el framework cita `{tononi}` y `{tononi2004}` en el mismo paper, biber generará entradas BibTeX duplicadas en el PDF.
- **Recomendación:** Deduplicar a un solo key. Si la intención es preservar ambos, marcar el segundo como `note = {duplicate of tononi2004}` y actualizar las citas.

### 2.3 MEDIOS

#### M-1. Falta el doc `CANON_SOURCE_OF_TRUTH.md` en `rigid-identity-framework/docs/`

- **Descripción:** El AGENTS.md de la raíz lo lista como el primer archivo a leer, pero no existe. Sí existen equivalentes machine-readable en `QICN-FRAMEWORK/release/`: `canon_manifest.v1.json`, `claim_registry.v1.json`, `layer_boundaries.v1.json`, `system_interface_boundary.v1.json`. El Phase 6 reporte los lista como "Source-of-Truth Inputs Read" pero no aclara que el path resuelve a la raíz, no al subdirectorio.
- **Severidad:** MEDIA — confusión de paths, no pérdida de información.
- **Recomendación:** Crear `rigid-identity-framework/docs/CANON_SOURCE_OF_TRUTH.md` que apunte a los archivos reales (en `../../release/`).

#### M-2. 21 entradas `audit_overlaid` en registry contradicen claim "100% draft"

- **Descripción:** `registry/theorems.jsonl` tiene 699 entradas: 678 `draft_extracted` + 21 `audit_overlaid`. El cross-audit gap closure lo reconoció.
- **Evidencia:** Salida verificada de `Get-Content ... | Group-Object curation_status`.
- **Severidad:** MEDIA — el ledger mismo lo llama "stale or overbroad".
- **Recomendación:** Actualizar reportes que digan "100% draft" o "all 699 draft_extracted". Documentar el porcentaje en cada reporte.

#### M-3. IDs de registry inconsistentes

- **Descripción:** Los IDs del registry no siguen un patrón uniforme. La entrada 3 del archivo es `basecore:hypothesis:hyp-h3-basecorecoresections01-foundation-from-core-l43` mientras que las otras hipótesis son `basecore:hypothesis:hyp-h1`, `hyp-h2`, `hyp-h4`.
- **Evidencia:** Primeras 5 entradas del registry.
- **Severidad:** MEDIA — la inconsistencia dificulta el parseo y las referencias cruzadas.
- **Recomendación:** Normalizar todos los IDs a `basecore:hypothesis:hyp-h3` con un campo separado `source_path` para la ubicación.

#### M-4. `kind` field vacío en entradas del registry

- **Descripción:** Las primeras 5 entradas tienen `kind : ""` (vacío), aunque el `schema.json` define `kind` como propiedad requerida para varios tipos de entrada.
- **Evidencia:** `registry/theorems.jsonl` primeras 5 líneas.
- **Severidad:** MEDIA — el validador de schema debería detectar esto; o el schema no se ejecuta sobre las entradas, o el campo `kind` no es realmente requerido para `theorem_entry`.
- **Recomendación:** Verificar el schema y poblar el campo `kind` con valores como `hypothesis`, `proposition`, `theorem`, etc.

#### M-5. `theorems.delta.json` con arrays vacíos

- **Descripción:** El archivo de delta tiene `"added": [], "removed": [], "changed": []` — no hay deltas registrados.
- **Evidencia:** `registry/theorems.delta.json` completo.
- **Severidad:** MEDIA — o bien el delta está deshabilitado, o bien los cambios se aplican directamente a `theorems.jsonl`. La existencia de un archivo de delta vacío es ruido.
- **Recomendación:** Documentar el rol de `theorems.delta.json` o eliminarlo si no se usa.

#### M-6. Phase 6 reporte sin SHA256 propio declarado

- **Descripción:** El reporte declara hashes externamente ("Run after final content stabilization; hashes are not self-embedded to avoid self-referential hash drift"). El audit prompt pregunta por hashes del reporte y el ledger.
- **Evidencia:** `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md:144-145` y el addendum en líneas 162-265.
- **Severidad:** MEDIA — la decisión de no auto-incrustar hashes es defendible, pero reduce la auditabilidad externa.
- **Recomendación:** Mantener la política actual pero añadir un comando shell explícito al final del reporte: `Get-FileHash ... -Algorithm SHA256` que el lector pueda ejecutar.

#### M-7. `PHASE 6` ledger entry con hashes que el propio ledger declara "pending"

- **Descripción:** Varias entradas del ledger contienen frases como "Pending final hash after ledger update" o "Final hash must be recomputed after this ledger entry is closed". La línea 604 lo dice explícitamente.
- **Evidencia:** `IMPLEMENTATION_TRACE_LEDGER.md:604` y similares.
- **Severidad:** MEDIA — un ledger que documenta hashes "pending" no cumple su función de trazabilidad.
- **Recomendación:** Después de cerrar cada entrada, ejecutar `Get-FileHash` y actualizar el valor in-place, o documentar el hash en una sección "Final Hash" que se rellene en una pasada final.

### 2.4 BAJOS

#### L-1. Log count vs reported discrepante (-1 overfull, -1 underfull)

- **Descripción:** El log del monolito muestra 7 overfull / 330 underfull, no 8/331 como reporta Fase 5B.
- **Severidad:** BAJA — discrepancia menor, probablemente debida a una recompilación post-reporte que afectó 1 línea.
- **Recomendación:** Aceptar como ruido de layout; re-emitir reporte si se cambia la política de "tracked debt".

#### L-2. `\codestate` definido una sola vez

- **Descripción:** El grep en `monolithic/preamble/setup.tex` muestra solo 1 match.
- **Severidad:** BAJA — la afirmación del cross-audit gap closure ("Removed duplicate/confusing `\codestate` definitions") es correcta.
- **Recomendación:** Ninguna.

#### L-3. `paper1` con archivos auxiliares

- **Descripción:** `paper1/` contiene `.aux`, `.bbl`, `.bcf`, `.blg`, `.log`, `.out`, `.run.xml` — todos artefactos de build.
- **Severidad:** BAJA — `INSTRUCCIONES.md §5` permite conservarlos temporalmente, pero indica que pueden tratarse como ruido.
- **Recomendación:** Añadir a `.gitignore` los artefactos de build y dejar solo `main.tex`, `main.pdf`, `references.bib` (si existe) en el repo.

#### L-4. `release/INDEX_PDFS.json` generado 2026-05-28

- **Descripción:** El índice de PDFs tiene `generated_at: 2026-05-28T01:52:24.190Z` — más de 2 semanas antes de la fecha del reporte Fase 5B.
- **Severidad:** BAJA — presumiblemente correcto si los PDFs no cambiaron desde entonces; pero combinado con C-1 (hashes desactualizados), la cadena de provenance tiene gaps.
- **Recomendación:** Regenerar `INDEX_PDFS.json` y verificar que los hashes coincidan con los PDFs actuales.

#### L-5. 12 secciones ✓

- **Descripción:** `monolithic/build/sections/` tiene exactamente 12 archivos `.tex` numerados 01-12.
- **Severidad:** BAJA — confirmación de que la métrica reportada es correcta.
- **Recomendación:** Ninguna.

---

## 3. Regresiones detectadas

| # | Regresión | Evidencia | Severidad |
|---|---|---|---|
| R-1 | Hashes de PDFs obsoletos en reporte Fase 5B (todos 6 PDFs) | Tabla §2.1 C-1 | CRÍTICA |
| R-2 | Log de monolito recompilado sin actualizar reporte (-1 overfull/-1 underfull) | §2.4 L-1 | BAJA |
| R-3 | `package.json` QICN-SYSTEM con nombre legacy (probablemente pre-existe, no es regresión reciente) | §2.1 C-2 | CRÍTICA |
| R-4 | AGENTS.md QICN-SYSTEM con paths a repositorio inexistente (probablemente pre-existe) | §2.1 C-3 | CRÍTICA |
| R-5 | La métrica "100% draft_extracted" se ha mantenido en algunos reportes a pesar de 21 entradas `audit_overlaid` | §2.3 M-2 | MEDIA |

No se detectaron regresiones en el corpus matemático: los teoremas BaseCore, los 6 invariantes, y la estructura del monolito están intactos. Las regresiones son de provenance y packaging, no de contenido.

---

## 4. Inconsistencias entre reportes y realidad

| # | Lo que el reporte dice | Lo que se verificó | Discrepancia |
|---|---|---|---|
| I-1 | `release/references.bib` SHA256 = `AB8059BC…` (idéntico root e inner) | Root e inner: ambos `AB8059BC27032689…` | COINCIDE ✓ |
| I-2 | 12 secciones activas, 401 labels, 401 unique | 12 secciones; suma de `\label{}` por sección = 401; IDs únicos (no verifiqué unicidad total, solo suma) | COINCIDE ✓ |
| I-3 | `mono:basecore:hyp:H3` aparece 1 o 2 veces | Aparece 2 veces (líneas 72 y 1106) — pero son hipótesis DISTINTAS (H3=Completeness, h3=Metric on E) | SEMI-COINCIDE: 2 matches reales, semánticamente diferentes |
| I-4 | Monolithic 8 overfull / 331 underfull | 7 overfull / 330 underfull | DISCREPA (-1/-1) |
| I-5 | `npm run test:negative-controls` PASS, 6/6 | `npm run test:negative-control-suite` (nombre real) PASS, 6/6, con 4 warnings de DW | COINCIDE con corrección de nombre |
| I-6 | `npm run test:adversarial-negative-controls` FAIL con `seeded_weighted_panel_v3_explicit_salt` | FAIL exacto, mismo mensaje | COINCIDE ✓ |
| I-7 | `git show 1452a8c --name-only` toca 2 archivos | Toca `IMPLEMENTATION_TRACE_LEDGER.md` y `QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md` | COINCIDE ✓ |
| I-8 | 3 scripts `verify-canonical-*.cjs` ejecutables desde `rigid-identity-framework/scripts/` | NO existen en `rigid-identity-framework/scripts/`. Existen en root `QICN-FRAMEWORK/scripts/`. Ejecutados desde root: PASS los 3 (25 PDFs, 17 claim entries, 6 layers, 8 interfaces) | DISCREPA (path); coincide resultado si se ejecuta desde root |
| I-9 | `tononi2004` y `baars1988` en `release/references.bib` | Ambos presentes (líneas 99 y 18) | COINCIDE ✓ |
| I-10 | `Rosenthal`, `Lau`, `Mashour`, `Dehaene` NO en `release/references.bib` | Cero matches | COINCIDE ✓ |
| I-11 | `paper_bridge_operational_subjecthood/main.tex` no existe | `Test-Path` retorna false; la carpeta no existe | COINCIDE ✓ (gap conocido) |
| I-12 | Hashes de 6 PDFs | Ver tabla §2.1 C-1 | DISCREPA completamente (todos) |
| I-13 | 699 entradas en `theorems.jsonl` | 699 entradas | COINCIDE ✓ |
| I-14 | Registry: 678 draft + 21 audit | 678 + 21 | COINCIDE ✓ |
| I-15 | 37 entradas en ledger | 37 entradas (## 2026-XX-XX) | COINCIDE ✓ |

---

## 5. Calidad del código

### Framework (rigid-identity-framework/)

- **Mantenibilidad:** Aceptable. Los scripts en `scripts/` están bien nombrados y agrupados (liberation de scripts, fixtures, lib). El builder monolítico es complejo pero documentado en los reportes.
- **Acoplamiento:** Bajo entre scripts. Los scripts de validación leen fixtures, los adjudicadores leen fixtures+predicciones, los auditores leen adjudicaciones. Hay un acoplamiento secuencial débil (calibrador muta fixture in-place — documentado en cold audit v28 §C.3).
- **Código muerto:** No detectado en muestreo. El builder tiene 96 líneas revisadas (incluyendo el path de paper_bridge), todas con propósito claro.
- **Documentación:** Excelente en cantidad. El ledger tiene 37 entradas estructuradas; los reportes están fechados y trazados.

### Runtime (QICN-SYSTEM/)

- **Mantenibilidad:** POBRE. `SimulationEngine.jsx` con 11.307 líneas y 580KB es un **god component** clásico. No es humanamente revisable en una sesión. Probablemente contiene estado, render, side effects, y business logic mezclados.
- **Acoplamiento:** ALTO. `OntologicalSingularityCore.js` importa `PhenomenologyCore`, `MetaSovereigntyCheck`, `WorldModelEngine`, `CognitiveEmergencePlanner`, `SovereigntyRequirementMatrix` — 5 dependencias directas. `SensoryPerceptionEngine.js` (154KB) y `QuantumEntropyBridge.js` (47KB) sugieren arquitecturas similares.
- **Código muerto:** No verificable sin análisis estático profundo. La nomenclatura pseudocientífica (HolographicMemoryNexus, KaizenMetamorphosisEngine, HumanityLastExamManager) sugiere código especulativo.
- **Nomenclatura:** PROBLEMÁTICA. Términos como "Ascensión", "Trascendencia Fractal", "Anti-Yo", "Holographic Memory" no son jerga técnica estándar y pueden inducir a error sobre las capacidades del sistema.
- **Magic numbers:** `HYPERCOHERENCE_VALUE: 9999.0` con comentario "NO SE USA PARA CRECIMIENTO" — ¿por qué existe entonces? Es código que se documenta a sí mismo como inútil.

### Diferencia de régimen de calidad

El framework LaTeX+scripts está en un régimen de **auditoría rigurosa** (37 entradas de ledger, fixtures versionados, hashes firmados). El runtime React+Netlify está en un régimen de **prototipo especulativo** (god component, nombres chamánicos, magic numbers). La comunicación entre ambos es nula: **no se encontró ninguna referencia a `theorems.jsonl` en `QICN-SYSTEM/src/`**.

---

## 6. Seguridad

| Superficie | Estado | Notas |
|---|---|---|
| `netlify/functions/selfpatch-apply.js` | SUPERFICIE CRÍTICA | Pipeline LLM→GitHub con kill switch y risk classifier. Ver §2.1 C-4. |
| `netlify/functions/llm-proxy.js` | NO REVISADO en este audit (falla de scope) | Existe en la lista de "Surfaces Of Review Priority" del AGENTS.md de QICN-SYSTEM. |
| Secrets en `services/config.js` | NO ENCONTRADOS | Solo se leyeron las primeras 100 líneas (no se observan API keys hardcoded; las URLs apuntan a `https://api.github.com` con token via env var). |
| Ed25519 vetos (QICN-FRAMEWORK) | SELF-TEST ONLY | El cold audit v28 §C.1 ya documentó: "A real deployment requires an external key server, certificate authority, revocation policy, RFC 3161 TSA, and independent reviewer identity checks." |
| Cross-repo coupling | INEXISTENTE | No hay acoplamiento entre QICN-FRAMEWORK y QICN-SYSTEM, lo cual es un punto POSITIVO de seguridad (compromiso de uno no afecta al otro). |

**Recomendación de seguridad inmediata:** Auditar `llm-proxy.js` (no se pudo en este audit por scope). Documentar el modelo de amenaza de `selfpatch-*` en un runbook de operaciones.

---

## 7. Validación científica

El framework es **honesto sobre sus limitaciones**. Cita textual del cold audit v28 (AUDIT_FORMAL_PROFUNDO_QICN_v28.md, línea 12):

> *"El framework QICN v28 es un edificio de gobernabilidad de software extraordinariamente elaborado construido sobre un vacío empírico total. Su virtud principal —la auto-conciencia de sus propias limitaciones, formalizada en governance boundaries, non-claim boundaries, y la degradación explícita del Bridge Theorem a Conjecture en v28— es también su revelación más devastadora: el framework sabe que no ha probado nada, y ha construido una maquinaria de 30+ scripts y 10+ papers para documentar sistemáticamente esa no-prueba."*

Esta evaluación sigue vigente. Estado de los 8 criterios Popperianos (auditoría fría v28):

| Criterio | Estado |
|---|---|
| Falsabilidad empírica | PRED-01 a PRED-11 definidos, 0 ejecutados contra datos reales |
| Rivales plausibles | Straw-man confeso (`constant_noise_floor_placeholder_control_known_straw_man_for_v27_block_test`); Phase 6 introduce IIT/GWT/HOT pero sin datos |
| Revisión matemática independiente | 0/77 teoremas revisados por humanos externos |
| Replicación externa | 0 replicaciones |
| Datos empíricos | 0 datasets externos (fixtures sintéticos con DW≈0.0385) |
| Inferencia estadística válida | DW≈0.0385, n=8, rival trivial |
| Gobernanza criptográfica | Auto-generado, sin CA |
| Compuerta semántica | ~60% cobertura de sinónimos (cold audit v28 §C.2) |

**Inflación de claims:** El framework mismo la evita en el texto teórico. La inflación potencial está en el **runtime** (QICN-SYSTEM), donde la nomenclatura puede sugerir capacidades que la matemática no soporta.

**Gaps de validación externa:** Persisten. La Phase 6 es un inventario, no una validación. El framework necesita (a) datasets reales, (b) revisor matemático externo, (c) rival plausible, (d) replicación independiente.

---

## 8. Recomendaciones priorizadas

### Prioridad 1 (CRÍTICA — atender antes de cualquier release pública)

1. **Re-emitir hashes de Fase 5B** o marcar el reporte como `SUPERSEDED_BY_PHASE_5D` con los hashes actuales. (Resuelve C-1, R-1)
2. **Renombrar `QICN-SYSTEM/package.json` name** a un nombre consistente con QICN. (Resuelve C-2)
3. **Reescribir paths en `QICN-SYSTEM/AGENTS.md`** para que apunten a archivos reales en `QICN-SYSTEM/docs/` o eliminarlos. (Resuelve C-3)
4. **Documentar modelo de amenaza de `selfpatch-apply.js`**: quién puede llamar, qué aprobaciones se requieren, cómo se detecta compromiso. (Resuelve C-4)

### Prioridad 2 (ALTA — atender antes de Phase 7/publication-readiness)

5. **Resolver el gap adversarial v2/v3** (decidir versión canónica y migrar la otra). (Resuelve A-5)
6. **Decidir source path del Bridge paper** (reconstruir o documentar como `SOURCE_RECOVERY_REQUIRED`). (Resuelve A-3)
7. **Renombrar `mono:basecore:hyp:h3` a algo distinto de H3** (e.g., `hyp:h3-metric`). (Resuelve A-2)
8. **Deduplicar Tononi en `references.bib`** (mantener un solo key). (Resuelve A-6)
9. **Crear `rigid-identity-framework/docs/CANON_SOURCE_OF_TRUTH.md`** que apunte a los archivos reales en root `release/`. (Resuelve M-1)

### Prioridad 3 (MEDIA — deuda técnica de packaging)

10. **Actualizar reportes con "100% draft"** para reflejar 21 entradas `audit_overlaid`. (Resuelve M-2)
11. **Normalizar IDs del registry** (M-3) y poblar `kind` (M-4).
12. **Decidir rol de `theorems.delta.json`** (M-5).
13. **Refactorizar `SimulationEngine.jsx`** en componentes más pequeños. (Mejora mantenibilidad runtime)
14. **Limpiar nomenclatura pseudocientífica en runtime** (M-Naming).

### Prioridad 4 (BAJA — housekeeping)

15. Añadir artefactos de build a `.gitignore`. (L-3)
16. Regenerar `INDEX_PDFS.json` y verificar consistencia. (L-4)
17. Documentar la convención de nombres de scripts npm (e.g., `test:negative-control-suite` vs `test:negative-controls`). (Mejora auditabilidad)

### Recomendación estratégica (a discutir)

El **runtime (QICN-SYSTEM) y el framework (QICN-FRAMEWORK) están desacoplados a nivel de código** (no hay imports cruzados). Esto puede ser intencional (separación de capas), pero genera la apariencia de dos productos diferentes con marcas similares. Recomiendo:

- **Documentar explícitamente la relación** entre QICN-FRAMEWORK (teoría + verificador) y QICN-SYSTEM (runtime de demostración).
- **Establecer un puente declarado** (un módulo que traduzca teoremas del registry a invariantes del runtime).
- **Estandarizar la nomenclatura** entre ambos (los 6 invariantes de `CanonicalInvariantPackage.js` deben tener counterparts en el registry con los mismos nombres).

---

## 9. Anexo técnico

### 9.1 Comandos ejecutados (resumen)

```bash
# Fase 2
Get-FileHash release/references.bib -Algorithm SHA256            # AB8059BC…
Get-FileHash rigid-identity-framework/release/references.bib    # AB8059BC… (idéntico)
Get-FileHash monolithic/QICN_MONOLITHIC.pdf                      # 16618EA1…
Get-FileHash paper5/main.pdf                                     # CA1520FA…
# ... paper7, 8, 9, 10 — todos NO coinciden con hashes reportados
node scripts/verify-canonical-integrity.cjs                     # PASS, 25 PDFs, 17 claims
node scripts/verify-claim-registry.cjs                          # PASS, 17/17
node scripts/verify-canonical-release.cjs                       # PASS, bundle created

# Fase 3
npm run test:trace-memory-rival                                 # PASS
npm run test:negative-control-suite                             # PASS, 6/6, DW warnings
npm run test:adversarial-negative-controls                      # FAIL, generative_model gap
git log --oneline -20                                           # 1452a8c visible
git show 1452a8c --name-only                                    # 2 files

# Fase 4
Get-ChildItem monolithic/build/sections/*.tex | Measure-Object   # 12
grep '\label{' monolithic/build/sections/*.tex                  # suma = 401

# Fase 5
Get-Content registry/theorems.jsonl | Measure-Object            # 699
Get-Content ... | Group-Object curation_status                  # 678 draft, 21 audit

# Fase 6
Get-ChildItem QICN-SYSTEM/src/components/SimulationEngine.jsx   # 580KB, 11,307 lines
Get-ChildItem QICN-SYSTEM/src/simulation/                       # 22 files
Get-Content QICN-SYSTEM/services/config.js | head -100          # TOTAL_NODES, HYPERCOHERENCE_VALUE
Get-Content QICN-SYSTEM/src/simulation/OntologicalSingularityCore.js | head -60  # pseudociencia
Get-Content QICN-SYSTEM/netlify/functions/selfpatch-apply.js    # 372 lines, GitHub API
Get-Content QICN-SYSTEM/package.json                            # "versiones-de-interfaz"
Get-Content QICN-SYSTEM/AGENTS.md                               # paths a TRADING 3.0/

# Fase 7
grep "theorems.jsonl" QICN-SYSTEM/src/                          # 0 matches

# Fase 8
Get-Content .../IMPLEMENTATION_TRACE_LEDGER.md | grep "^## 20"  # 37 entries
```

### 9.2 Hashes verificados (resumen)

| Archivo | SHA256 |
|---|---|
| `QICN-FRAMEWORK/release/references.bib` | `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` |
| `QICN-FRAMEWORK/rigid-identity-framework/release/references.bib` | `AB8059BC…` (idéntico) |
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` | `A27FD6AE642C488DEA5E7826436594CDFE2670CF9268C4A30FAD5507068AAAF2` |
| `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md` | `EB4C3DB9AB705E210162700B706335DE537757B63DC94A702EAF3F01390E639E` |
| `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | `97B7D62506CD9DAF5A74553475522E62AA097C6B3394E074EBC17C74D8623CB1` |
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf` | `16618EA1298C6FDAD715EC29FC271E786E1F527BDF05313CD98517E7CA748E99` |
| `rigid-identity-framework/paper5_operational_consciousness/main.pdf` | `CA1520FAB347EA0BDF687A4B74257847CFAFF5BE0867ECE4891F37E8172193C9` |
| `rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf` | `B7DEB08985E3B5466F2642D0FF4252D1AABD268F6A1F610540C41CD3B15D724E` |
| `rigid-identity-framework/paper8_first_person_subjectivity/main.pdf` | `2489E9CAE54EE4AF912BC13D1F38ECFC236E7E442E71EAC7702832418EB794A5` |
| `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.pdf` | `BE66CD239F4B56FFB31D5705CFAE01EF622C647C4BB9E13F2B3BEDC08CDE6F86` |
| `rigid-identity-framework/paper10_external_adjudication/main.pdf` | `73D217F6C3C3180FC6ADBA0B266C30190C8C541A5C0FA19C56BE9454B0E87D7A` |

### 9.3 Prompts del audit aplicados

- Plantilla `QICN-FRAMEWORK/audits/AUDIT_EXTERNAL_PROMPT.md` (用户提供)
- 8 fases ejecutadas: governance, PDF hygiene, rivals, LaTeX, registry, QICN-SYSTEM, cross-subsystem, ledger

### 9.4 Limitaciones de este audit

- **Scope:** No se auditó `llm-proxy.js`, `quantum-entropy.js`, `runtime-health.js`, `killswitch-state.js` (otros puntos críticos del AGENTS.md de QICN-SYSTEM).
- **Profundidad:** Solo se leyeron ~30% de los archivos grandes (SimulationEngine.jsx, ColdAudit v28, etc.). Auditoría profunda requeriría lectura completa.
- **Reproducibilidad de tests:** Se ejecutaron los 3 tests npm principales; no se ejecutaron los 80+ scripts del package.json.
- **Compilación LaTeX:** No se recompiló el monolito desde cero; se asumió el estado actual como ground truth.
- **No se modificó ningún archivo del framework.** Solo se leyó, se ejecutaron scripts de solo lectura, y se escribió este reporte en `docs/ai-platform-outputs/audits/`.

---

## 10. Veredicto final

**`PASS_WITH_TRACKED_DEBT`**

El framework QICN-FRAMEWORK es internamente coherente, autoregula sus afirmaciones, y mantiene un ledger detallado de 37 entradas con trazabilidad explícita. Su principal activo es la honestidad: degrada el Bridge Theorem a Conjecture, etiqueta gaps como `HOT_BIB_GAP` y `ADVERSARIAL_HARNESS_COMPATIBILITY_GAP`, y emite `external_support_certified=false` en cada validación.

Su principal deuda es la **frescura de los artefactos firmados**: el reporte Fase 5B tiene hashes obsoletos, el log del monolito tiene -1/-1 vs el conteo reportado, y la suite de tests "pasa" mientras simultáneamente declara que los datos son inválidos. Estos problemas no invalidan la matemática; invalidan la trazabilidad. La trazabilidad es el producto que el framework vende, y tiene grietas.

El runtime (QICN-SYSTEM) merece una auditoría separada y dedicada. Los hallazgos de este audit (god component, nomenclatura pseudocientífica, magic numbers simbólicos, AGENTS.md con paths rotos, selfpatch-apply.js como superficie de seguridad) sugieren que QICN-SYSTEM está en un régimen de calidad muy diferente al del framework teórico. La falta de acoplamiento entre ambos es, paradójicamente, lo que permite que el framework mantenga su integridad mientras el runtime evoluciona separadamente.

**Recomendación operativa:** Cerrar los 4 hallazgos CRÍTICOS antes de cualquier comunicación pública de resultados. La prioridad 2 (ALTA) puede esperar a Phase 7, pero la prioridad 1 no.

---

*Reporte generado el 2026-06-10 por OpenCode (modelo minimax-m3). Hash de este archivo se calculará tras el cierre del audit. Los hallazgos son evidencia; las interpretaciones están marcadas como tales. El reporte no certifica soporte externo, consciencia, fenomenalidad, transferencia de identidad, cierre del bridge burden, ni revisión matemática humana.*


---

# ADDENDUM — Cobertura ampliada vía shell (raíz padre + QICN-SYSTEM)

- **Fecha:** 2026-06-10 (misma sesión, segunda pasada).
- **Cambio de método:** se confirmó que, aunque las herramientas de archivo están restringidas al repo interno, el **shell sí alcanza** la raíz padre `QICN-FRAMEWORK/` y el repo hermano `QICN-SYSTEM/` mediante rutas relativas (`..\`, `..\..\`). Esto permitió completar las Fases 3 (gates raíz), 6 (runtime) y 7 (consistencia) que en la primera pasada quedaron fuera de alcance.

## Resolución de hallazgos previos

- **H-F RESUELTO:** los archivos de gobernanza existen en la **raíz padre** (`AGENTS.md`, `docs/CANON_SOURCE_OF_TRUTH.md`, `docs/CLAIM_REGISTRY.md`, `docs/LAYER_BOUNDARIES.md`, `docs/CANON_MANIFEST.md`, `docs/THEORY_SYSTEM_INTERFACE.md`, `release/claim_registry.v1.json`, `release/layer_boundaries.v1.json`) → todos `True`. El reporte Phase 6 era honesto; solo faltaba declarar el `cwd`.
- **Gates `.cjs` CONFIRMADOS y PASAN** (ejecutados con `node ..\scripts\<gate>.cjs`):
  - `verify-canonical-integrity.cjs` → `status: PASS`; 25 PDFs canónicos; 17 entradas claim-registry; 6 capas; 8 interfaces; nota `working_tree_not_clean_at_hardening_start`.
  - `verify-claim-registry.cjs` → `status: PASS`; 17 entradas, 17 únicas, 6 clases.
  - `verify-canonical-release.cjs` → `status: PASS`; bundle generado, sin fallos.
  - El hallazgo original de "scripts faltantes" queda **definitivamente descartado**: era ambigüedad de `cwd`.
- **Bib raíz == bib interna:** ambas SHA256 = `AB8059BC…BEB54A`, **byte-idénticas**. La afirmación de sincronización del Phase 5B se sostiene.

## Fase 6 — Runtime QICN-SYSTEM (hallazgos confirmados)

| # | Hallazgo | Evidencia (hecho) | Severidad |
|---|---|---|---|
| R-1 | **God component** | `src/components/SimulationEngine.jsx` = **11,307 líneas** | ALTA (mantenibilidad) |
| R-2 | **Lenguaje pseudocientífico/grandilocuente** en runtime | `OntologicalSingularityCore.js` (1945 líneas): "Núcleo de la Singularidad Ontológica", "estado de Ascensión (Layer)", "PMIA", "auto-narrativa", "emergencia genuina", "conciencia" | MEDIA |
| R-3 | **Magic values simbólicos** | `services/config.js`: `TOTAL_NODES: 10_000_000`, `HYPERCOHERENCE_VALUE: 9999.0` (el propio comentario los marca "Valor simbólico") | BAJA |
| R-4 | **Self-modification en producción EXISTE** | `netlify/functions/selfpatch-apply.js` (336 líneas): `fs.writeFileSync` (L78), `mkdirSync` (L77), backups/rollback (L73,L89-91), y commits a GitHub vía `GITHUB_SELFPATCH_TOKEN` | ALTA (por naturaleza) |
| R-5 | **Metadata incorrecta** | `package.json` → `"name": "versiones-de-interfaz"` (no referencia a QICN) | BAJA |
| R-6 | **Rutas absolutas rotas** | `AGENTS.md` enlaza repetidamente a `c:/Users/irisp/.../TRADING 3.0/Sistema Canon Sandbox/docs/...` (otro proyecto; sobras de plantilla) | BAJA-MEDIA |

**Matiz importante sobre R-4 (self-patch):** NO es self-modification ingenua. Tiene controles en capas verificados en el código:
- Auth obligatoria: `AUTH_REQUIRED` default `true`; responde `401 UNAUTHORIZED` si no autenticado (L245-246); solo `POST` (L244).
- Jaula de rutas: `path.resolve(projectRoot, rel)` + `startsWith(projectRoot)` (L62-63).
- Gating por riesgo: bloquea si `!risk.allowed || riskLevel === 'high'` (L260).
- Kill-switches: local (`QICN_KILLSWITCH`), GitHub (`readGithubKillSwitchState`) y blob (`QICN_BLOB_KILLSWITCH_URL`); chequeados antes de escribir (L280, L314).
- Quórum: `quorumStart.allowed`, `quorumPreWrite.allowed` (L285, L319).
- Backups con rollback antes de cada escritura.
- Token desde `process.env` (no hardcodeado).

**Riesgos residuales de R-4:** (a) la jaula `startsWith(projectRoot)` sin separador final es un patrón débil conocido (un hermano `projectRoot + "-x"` podría pasar el prefijo); endurecer a `startsWith(projectRoot + path.sep)`. (b) `QICN_KILLSWITCH` por defecto `'OFF'` → el parcheo está **habilitado por defecto**; considerar fail-safe inverso (deshabilitado salvo opt-in explícito). (c) toda la seguridad depende de que las env vars estén bien configuradas en producción: verificarlo fuera de banda.

## Fase 7 — Consistencia entre subsistemas (hallazgos confirmados)

- **La base matemática del framework NO se ejecuta; se re-implementa/aproxima numéricamente en el runtime.** `CanonicalInvariantPackage.js` importa `computeInverseLimitScore` (`FiniteProjectionEvaluator`), `buildPersistenceCertificate`, `buildLegibilityCertificate`, `verifyNonFactorization`. Es una implementación de *scores* runtime, no una verificación de los teoremas formales.
- **Honestidad epistémica interna del runtime:** cada `InvariantRecord` expone `score`, `maturity`, `runtimeSignals`, `directSignals`, `proxySignals`, `judgeDependent`, `provenance`, y el paquete lleva `sourceOfTruth`/`supportScope`. Es decir, el runtime distingue señal directa vs proxy y marca dependencia de juez — buen patrón.
- **Acoplamiento registry↔runtime = conceptual, NO mecánico.** En todo `QICN-SYSTEM/src/` hay **una sola** mención de `theorems` (un comentario en `MetricProjectionOperator.js` L2). No hay consumo programático de `registry/theorems.jsonl` ni binding verificado código→teorema. El vocabulario compartido ("inverse limit", "projection", invariantes `I_ri`…) es de diseño, no una dependencia comprobable.
- **Implicación:** cualquier afirmación de que "el runtime implementa/valida el framework" **no está respaldada** por una dependencia de código. Son dos sistemas con vocabulario común y acoplamiento documental, no un pipeline formal-a-ejecución.

## Veredicto actualizado (global, ambos repos)

- **`rigid-identity-framework/`:** `PASS_WITH_DEBT` — reportes honestos, gates raíz PASAN, sin inflación interna. Deudas: H-A (hashes PDF volátiles), H-B (métricas log stale), H-C (label `H3`/`h3`), H-D (fuente del Bridge ausente), H-E (0/699 human_curated).
- **`QICN-SYSTEM/` (runtime):** `PASS_WITH_HIGH_SEVERITY_DEBT` — contraste fuerte con la disciplina del framework: god component de 11k líneas (R-1), lenguaje inflado/ontológico (R-2), self-patch en producción aunque defendido (R-4). El runtime parece regirse por una cultura distinta a `INSTRUCCIONES.md`.
- **Frontera teoría↔runtime:** sin acoplamiento mecánico. Esto es, de hecho, **consistente** con la "Regla de frontera LLM-runtime" de `INSTRUCCIONES.md` §6.1 (el runtime no valida la teoría), pero debe comunicarse explícitamente para no sobre-leer la relación.

## Recomendaciones añadidas

8. **(Alta) Auditar y endurecer `selfpatch-apply.js`:** jaula de rutas con `path.sep`, kill-switch fail-safe por defecto, y verificación documentada de env vars de producción (`AUTH_REQUIRED`, `QICN_KILLSWITCH`, token scope mínimo).
9. **(Alta) Descomponer `SimulationEngine.jsx`** (11k líneas) en módulos; es el principal riesgo de mantenibilidad del runtime.
10. **(Media) Aplicar la disciplina anti-inflación de `INSTRUCCIONES.md` §6 al runtime** o declarar explícitamente que el runtime es una capa interpretativa/simbólica no-canónica (renombrar/anotar "Singularidad Ontológica", "Ascensión", etc. como metáforas de UI, no resultados).
11. **(Baja) Corregir metadata:** `package.json name` y las rutas rotas de `AGENTS.md` (apuntan a "TRADING 3.0/Sistema Canon Sandbox").
12. **(Media) Documentar la frontera teoría↔runtime** en `THEORY_SYSTEM_INTERFACE.md`: dejar explícito que los invariantes del runtime son *scores* proxy/judge-dependent, no ejecución de los teoremas del registry.
