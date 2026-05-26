# INFORME DE AUDITORÍA FCR v14-CORE — VERIFICACIÓN PROFUNDA + ANÁLISIS GIT + CAMINO A MAGNUM OPUS

**Auditor:** Lead Formal Verification Scientist & Epistemic Auditor  
**Fecha:** 2026-05-26  
**Corpus:** `rigid-identity-framework` (v13.1 → v14-core)  
**Método:** audit-context-building + verification-before-completion + codebase-audit-pre-push + gateguard  
**Objetivo:** Verificar claim por claim la implementación Codex v14-core, analizar estado del repositorio Git, identificar gaps restantes, y trazar el camino a magnum opus.

---

## 1. ESTADO DEL REPOSITORIO GIT

### Hallazgo Importante

El repositorio **ya está limpio, commiteado y sincronizado con origin/main.**

| Métrica | Valor |
|---|---|
| Branch local | `main` |
| Commit HEAD | `2aaffed` — "fcr(v14-core): implement trace-memory rival, rehearsal runner, coordinate spec edge cases, and registry diagnostic" |
| Commit origin/main | `2aaffed` (identical) |
| Working tree | **Clean** — nothing to commit |
| Untracked files | **0** |
| Diff local vs remote | **0** — already pushed |

**Conclusión:** El v14-core ya está en GitHub (`https://github.com/Darkar520/QICN-RELEASE.git`). No hay archivos sucios, no hay archivos no trackeados, no hay cambios pendientes. El `.gitignore` es completo (cubre OS files, Node, caches, IDE files, logs, builds). **No se requiere ninguna operación git adicional.**

### Branches remotas

```
remotes/origin/main
remotes/origin/copilot/analyze-quicn-release-repo
remotes/origin/copilot/audit-internal-scientific-release-freeze
remotes/origin/copilot/audit-quicn-release-integrity
remotes/origin/copilot/evaluate-quicn-release
remotes/origin/internal-scientific-release-final-freeze
```

**Recomendación:** Las branches `copilot/*` son artefactos de sesiones previas y deberían limpiarse para presentar un repositorio profesional. La branch `internal-scientific-release-final-freeze` parece ser una release tag/branch legítima.

---

## 2. MATRIZ DE VERIFICACIÓN v14-CORE CLAIM-POR-CLAIM

### 2.1 Diagnóstico Forense del Extractor

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| `verify-registry-reproducibility.js` creado | `scripts/verify-registry-reproducibility.js` | **SÍ** | 217 líneas, lee registry JSONL, computa missing-source stats, residual deltas, escribe `EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md` | 9/10 |
| `EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md` generado | `docs/reports/EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md` | **SÍ** | 49 líneas, tabla de delta accounting con 745/432/107/94/53/13 | 8/10 |
| `audit:extractor-diagnostic` ejecutable | `package.json` L24 | **SÍ** | Script validado, output: Missing-source formal=107, macro=94; Residual formal=53, macro=13 | 9/10 |

**Hallazgo crítico del diagnóstico:** Los archivos faltantes explican 107 entradas formales y 94 macros, pero queda un **delta residual real**: 53 entradas formales y 13 macros no explicadas por missing sources. Esto significa que el extractor tiene un problema real además de archivos faltantes. Codex fue honesto al reportar esto en vez de atribuir todo a archivos faltantes.

### 2.2 RIVAL-TRACE-MEMORY-01 Ejecutable

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| `trace-memory-rival.js` implementado | `scripts/lib/trace-memory-rival.js` | **SÍ** | 88 líneas, implementa `fitTraceMemoryRival()`, `shannonEntropy()`, `totalVariation()`, `transitionDistribution()`, `normalizeCounts()` | 9/10 |
| Usa memory depth configurable | `trace-memory-rival.js` L37 | **SÍ** | `memoryDepth` default 1, validación de array length | ✓ |
| No dependencias externas | `trace-memory-rival.js` | **SÍ** | Solo Node.js builtins | ✓ |

**Calidad del rival:** El rival es un predictor de memoria de traza de primer orden (memory-depth=1) que construye distribuciones de transición basadas en conteos empíricos. Es un rival realmente ejecutable, no un stub. La función `fitTraceMemoryRival` devuelve un objeto con `id: "RIVAL-TRACE-MEMORY-01"`, `predict(context)`, `parameterCount`, `trainingEntropyBits`. Esto es arquitectónicamente correcto: el rival debe ser un modelo entrenable, no una tabla hardcodeada.

### 2.3 PRED-EXT-01 Rehearsal Runner Actualizado

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| Usa rival real de trazas | `run-pred-ext-01-rehearsal.js` L4-8 | **SÍ** | `require("./lib/trace-memory-rival")` y `fitTraceMemoryRival(traces.baseline, { memoryDepth: 1 })` | 9/10 |
| Distribuciones no hardcoded para rival | `run-pred-ext-01-rehearsal.js` | **SÍ** | `transitionDistribution()` genera distribuciones desde trazas sintéticas | ✓ |
| Métricas extendidas | `run-pred-ext-01-rehearsal.js` | **SÍ** | Añade `rival_parameter_count`, `rival_training_entropy_bits` | ✓ |

**Hallazgo:** El runner ahora tiene 148 líneas (vs 115 en v13.1). Las distribuciones del rival ya no son hardcoded — se generan dinámicamente desde trazas sintéticas mediante `transitionDistribution()`. Esto es una mejora sustancial: el rival ahora es realmente un componente ejecutable del pipeline.

### 2.4 Preregistro PRED-11

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| PRED-11_prereg_v0.md creado | `docs/preregistrations/PRED-11_prereg_v0.md` | **SÍ** | 105 líneas, boundary, required header, hypothesis/rival, measurement binding, dataset/seeds/controls, decision record scaffold, anti-inflation clause | 9/10 |

**Calidad:** El preregistro es completo y sigue el mismo formato que PRED-04c y PRED-06. Tiene estado honesto (`not_frozen`, `not_assigned`, `blocked_no_runner`). La decisión record scaffold incluye JSON con campos de verificación.

### 2.5 Overlay de Curación I_int

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| `I_INT_CURATION_OVERLAY_v1.json` creado | `docs/reports/I_INT_CURATION_OVERLAY_v1.json` | **SÍ** | 27 líneas, JSON válido con `overlays` array | 8/10 |
| No edita JSONL manualmente | Boundary del overlay L5-7 | **SÍ** | "does not edit registry/theorems.jsonl, does not edit registry/macros.jsonl" | ✓ |
| Recomienda downgrade honesto | `recommended_epistemic_status` | **SÍ** | `"conditional"` con `reason` explicando la carga formal abierta | ✓ |

**Calidad:** El overlay es un JSON separado que puede ser aplicado por un gate de curación sin mutar el registry directamente. Es la solución arquitectónicamente correcta para el problema de I_int.

### 2.6 Gate de Curación

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| `verify-curation-overlays.js` creado | `scripts/verify-curation-overlays.js` | **SÍ** | 82 líneas, valida overlays contra registry JSONL | 9/10 |
| Valida target_id en registry | `verify-curation-overlays.js` L45-55 | **SÍ** | Comprueba que `target_id` existe en `theorems.jsonl` | ✓ |
| Valida status mismatch | `verify-curation-overlays.js` L56-65 | **SÍ** | Comprueba que `recommended_epistemic_status` difiere del actual | ✓ |
| Valida blocked_actions no vacío | `verify-curation-overlays.js` L70-75 | **SÍ** | Requiere array no vacío de acciones bloqueadas | ✓ |
| `npm run verify:curation-overlays` | Gate ejecutado | **PASS** | "Validated 1 curation overlay file(s)" | ✓ |

### 2.7 Coordinate Specs Endurecido

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| Bloquea secciones vacías | `verify-coordinate-specs.js` L15 | **SÍ** | `MIN_SECTION_CHARS = 40` | ✓ |
| Bloquea secciones triviales | `verify-coordinate-specs.js` L95 | **SÍ** | Rechaza `Constructive Estimator` sin fórmulas/code blocks (`!/[=<>]|```/.test(body)`) | ✓ |
| `npm run verify:coordinate-specs` | Gate ejecutado | **PASS** | "Validated 3 coordinate constructive specifications" | ✓ |

**Hallazgo:** El gate ahora no solo verifica presencia de secciones, sino que exige contenido sustantivo. `MIN_SECTION_CHARS = 40` evita secciones vacías o de un solo párrafo. La regex `![/=<>]|```/` para Constructive Estimator fuerza que haya al menos una fórmula matemática, desigualdad, o bloque de código. Esto cierra exactamente el gap que la auditoría v13.1 identificó.

### 2.8 Matriz de Cobertura de Preregistros

| Claim | Archivo | Verificado | Evidencia | Calidad |
|---|---|---|---|---|
| `PREREGISTRATION_COVERAGE_MATRIX.md` creado | `docs/reports/PREREGISTRATION_COVERAGE_MATRIX.md` | **SÍ** | 41 líneas, tabla PRED-01 a PRED-11 + PRED-EXT-01 con status de coverage | 8/10 |

**Calidad:** La matriz muestra que solo PRED-04c, PRED-06, PRED-11 y PRED-EXT-01 tienen preregistro artifacts. PRED-01, PRED-02, PRED-03, PRED-05, PRED-07, PRED-08, PRED-09, PRED-10 están marcados como `missing_preregistration`. Esto es honesto y útil para priorizar v15.

### 2.9 Todos los Gates de Verificación

| Gate | Resultado |
|---|---|
| `verify:corpus-registry -- --strict-crossrefs` | **PASS** — 745 entradas, 0 blockers, 0 warnings |
| `verify:macro-registry` | **PASS** — 432 macros, 39 canónicas, 0 blockers, 0 warnings |
| `verify:prediction-registry` | **PASS** — 14 predicciones, 0 errores, 11 filas LaTeX, 1 extensión |
| `lint:nonclaims` | **PASS** — 0 violaciones |
| `verify:coordinate-specs` | **PASS** — 3 specs validadas con contrato de input |
| `verify:curation-overlays` | **PASS** — 1 overlay validado |
| `test:tamper-prereg` | **PASS** — 90/90 rejected, 30/30 accepted |
| `audit:extractor-reproducibility` | **NOT_REPRODUCIBLE** — 745 vs 585 formal, 432 vs 325 macro |
| `audit:extractor-diagnostic` | **DIAGNÓSTICO COMPLETADO** — Missing-source: 107 formal / 94 macro; Residual: 53 formal / 13 macro |

**Tasa de gates PASS: 8/9.** El único gate que no pasa es el de extractor reproducibility, y Codex fue explícitamente honesto al no ocultarlo.

---

## 3. ANÁLISIS DE CALIDAD POR COMPONENTE v14-core

### 3.1 Extractor Diagnostic (La Mejora Más Importante)

**Calificación: 9.5/10**

La mejora central de v14-core no es un nuevo feature sino un **cambio epistemológico en cómo se trata el drift del extractor.**

**v13.1:** "El extractor es NOT_REPRODUCIBLE, probablemente por archivos faltantes."

**v14-core:** "El extractor es NOT_REPRODUCIBLE. Los archivos faltantes explican 107 entradas formales y 94 macros. Queda un delta residual de 53 entradas formales y 13 macros que NO se explican por archivos faltantes. Ese delta residual es una carga infraestructural abierta que debe investigarse."

Esta distinción es crítica porque:
1. Evita la racionalización fácil ("todo se explica por archivos faltantes").
2. Identifica exactamente qué archivos faltan: `basecore/core/sections/11_discrete_bridge.tex`, `paper_bridge_operational_subjecthood/main.tex`, `paper10_external_adjudication/main.tex`, `shared/preamble_qicn.tex`.
3. Deja un número concreto de entradas inexplicadas (53+13) que debe rastrearse a comportamiento del extractor, cambios de fuente, o entradas curadas intencionalmente.
4. La acción requerida es explícita: "Treat the extractor as authoritative only when both missing-source and residual deltas are zero, or every residual entry has a curated reason."

### 3.2 trace-memory-rival.js (RIVAL Ejecutable)

**Calificación: 9/10**

- **Implementación correcta:** Predictor de memoria de primer orden con conteos empíricos, entropía de Shannon, variación total.
- **Interfaz limpia:** `fitTraceMemoryRival(trace, options)` devuelve objeto con `predict`, `parameterCount`, `trainingEntropyBits`, `distribution`.
- **Sin dependencias externas:** Solo Node.js builtins.
- **Error handling:** Valida que trace sea array y length > memoryDepth.
- **Menos un punto:** No incluye tests unitarios del rival mismo. Un rival ejecutable debería tener tests que verifiquen que predice correctamente en trazas deterministas y que el parameter_count es correcto.

### 3.3 PRED-EXT-01 Rehearsal Runner v2

**Calificación: 9.5/10**

- **Ahora usa rival real:** `fitTraceMemoryRival(traces.baseline, { memoryDepth: 1 })` genera distribuciones rival dinámicamente.
- **Métricas extendidas:** `rival_parameter_count`, `rival_training_entropy_bits` permiten verificar que el rival cumple con la especificación de RIVAL_MODEL_REGISTRY.md.
- **Aún honestamente bloqueado:** `status: pipeline_rehearsal_not_evidence`, `verdict: blocked_threshold_not_frozen`.
- **SHA-256 de artifacts:** Verificación de integridad preservada.
- **Menos medio punto:** Las trazas sintéticas siguen siendo hardcoded (deterministic panel), no generadas por un proceso aleatorio con seed. Para un rehearsal esto es aceptable, pero un runner evidential debería usar generación estocástica con seed congelado.

### 3.4 I_int Curation Overlay

**Calificación: 8.5/10**

- **JSON válido con schema_version y boundary.**
- **Recomendación honesta:** `recommended_epistemic_status: "conditional"` con `reason` explicando que falta el lema de trivialidad de factorización.
- **Acciones bloqueadas:** `blocked_actions: ["use_as_standalone_proof", "upgrade_to_proved_without_lemma"]`.
- **Requisito para re-upgrade:** `required_for_reupgrade: ["factorization_triviality_lemma", "admissible_factorization_category_typed"]`.
- **Menos un punto y medio:** El overlay existe como documento separado pero no está "aplicado" al registry. El gate `verify:curation-overlays` lo valida estructuralmente, pero no hay un comando que "aplique" el overlay al registry JSONL (y es correcto que no lo haya, porque la policy dice no editar JSONL manualmente). Sin embargo, esto deja la curación en un estado "reportada pero no materializada".

### 3.5 PREREGISTRATION_COVERAGE_MATRIX.md

**Calificación: 8/10**

- **Honestidad:** Muestra 8 predicciones sin preregistro (`missing_preregistration`).
- **Priorización:** Marca PRED-02 y PRED-EXT-01 como v14 priority.
- **Menos dos puntos:** No incluye fechas objetivo o milestones para cada preregistro. Una matriz de cobertura sin timeline es un snapshot, no un plan de ejecución.

---

## 4. GAPS QUE PERSISTEN DESPUÉS DE v14-core

### 4.1 Gap Crítico: Delta Residual del Extractor (53 formal + 13 macro)

**Severidad: ALTA**
- Codex identificó honestamente que 53 entradas formales y 13 macros no se explican por archivos faltantes.
- **Acción requerida:** Investigar cada entrada residual individualmente. ¿Son entradas curadas intencionalmente? ¿Son duplicados? ¿Son entradas de archivos `.tex` que cambiaron de nombre? ¿Son entradas de archivos que existen pero el extractor no los encuentra?
- **Impacto:** Mientras este delta persista, `extract:registry` nunca podrá ser autoridad canónica.

### 4.2 Gap Crítico: Ningún Threshold Congelado

**Severidad: CRÍTICA**
- `delta_amb` existe como concepto pero no tiene valor numérico.
- `rho_selective` existe como métrica pero no tiene threshold.
- `penalized_loss_alpha` existe como concepto pero no tiene valor.
- **Impacto:** Este es EL gap que separa al marco de ser una teoría científica. Sin thresholds congelados, cualquier resultado puede ajustarse post-hoc.

### 4.3 Gap Alto: I_int Curado pero No Materializado

**Severidad: ALTA**
- El overlay recomienda downgrade a `conditional` pero el registry JSONL aún lista `prop:integration-transfer` como `proved`.
- **Acción requerida:** Crear un comando `apply:curation-overlays` que materialice los overlays validados al registry de forma machine-readable, o bien degradar manualmente (con decision record) si la policy lo permite.

### 4.4 Gap Alto: BPF-2/BPF-3 para Pi_D No Ejecutados

**Severidad: ALTA**
- PAPER9_BRIDGE_BURDEN_NARROWING especifica el observable, la intervención family, el rival family, y las condiciones.
- No existe runner, dataset, threshold, ni campaña de intervención.
- **Acción requerida:** Implementar BPF-2 (intervention harness) y BPF-3 (rival executor) para Pi_D.

### 4.5 Gap Medio: Monolithic Compile YELLOW

**Severidad: MEDIA**
- 80 grupos de macros/declaraciones repetidas, 0 conflictos semánticos.
- No hay volumen LaTeX unificado compilado.
- **Acción requerida:** Técnico, no afecta validez científica.

### 4.6 Gap Medio: Preregistros Faltantes (8 de 12)

**Severidad: MEDIA**
- PRED-01, PRED-02, PRED-03, PRED-05, PRED-07, PRED-08, PRED-09, PRED-10 no tienen preregistro scaffolds.
- **Acción requerida:** Crear scaffolds para las predicciones que serán ejecutadas en v15.

---

## 5. EVALUACIÓN GLOBAL DE LA IMPLEMENTACIÓN CODEX v14-core

### Calificación por dimensión

| Dimensión | Calificación | Justificación |
|---|---|---|
| **Honestidad epistémica** | 10/10 | Ningún claim inflado. El diagnostic separa explicado de residual. El rehearsal sigue bloqueado. |
| **Precisión de correcciones** | 9.5/10 | Correcciones quirúrgicas (L622, PRED-11, coordinate specs). Ningún cambio rompe coherencia. |
| **Arquitectura de gobernanza** | 9.5/10 | Canon map, curation protocol + overlay gate, coordinate gate endurecido, rehearsal runner con rival real, coverage matrix. |
| **Cobertura de auditoría previa** | 9.5/10 | Cierra 7/7 findings de v13.1. El único finding no cerrado (extractor reproducibility) ahora tiene diagnóstico forense que separa explicado de residual. |
| **Producción de artefactos** | 9/10 | 10+ nuevos archivos, 2 scripts nuevos, 1 JSON de reconciliación, 1 decision record, 1 overlay, 1 coverage matrix. |
| **Alineación con Roadmap** | 9.5/10 | El PLAN v14-pre sigue exactamente las prioridades. Los "next actions" del PLAN se implementaron. |
| **Ejecución empírica** | 3/10 | Ningún dataset real, ningún threshold congelado, ningún rival ejecutado empíricamente. PERO: el rehearsal ahora usa un rival real, no una tabla hardcoded. Eso es progreso real en la arquitectura del pipeline. |
| **Overall de esta pasada** | **9.3/10** | |

### Tendencia de mejora pasada-a-pasada

| Pasada | Overall | Progreso clave |
|---|---|---|
| v13 | 7.2/10 | Audit formal completo, 0 blockers |
| v13.1 | 9.2/10 | Canon map, PRED-02 delta_amb, coordinate specs, rehearsal runner |
| **v14-core** | **9.3/10** | **Extractor diagnostic forense, rival ejecutable, runner con rival real, overlay de curación, gate de curación, specs endurecidos** |

La tendencia es positiva y sostenida. Cada pasada cierra exactamente los gaps que la pasada anterior identificó, sin inventar claims ni inflar estados.

---

## 6. CAMINO A MAGNUM OPUS: QUÉ FALTA PARA SER "TEORÍA FORMAL, SERIA, BIEN ESTRUCTURADA, LIMPIA"

Un magnum opus no es volumen. Es **cierre arquitectónico completo**: cada claim fuerte protegido por non-claims, cada predicción con falsador activo, cada prueba verificable, cada capa capaz de morir sin arrastrar a las demás.

### Fase A: Congelar un solo threshold (v14.1 / v15 core)

**Objetivo:** Romper la barrera epistémica más importante.

**Acciones (ordenado por impacto):**

1. **Congelar `rho_selective_threshold` para PRED-EXT-01:**
   - Valor numérico con rationale (ej: 2.0, basado en power analysis del rehearsal).
   - Publicar en preregistration v1 con SHA-256.
   - Regla: si `rho_selective >= threshold` → support; si `< threshold` → no support.

2. **Congelar `penalized_loss_alpha`:**
   - Valor numérico (ej: 0.05 por cross-validation simulado).
   - Documentar en preregistration.

3. **Congelar dataset manifest:**
   - Fuente de trazas (sintético con seed), longitud, alfabeto.
   - Reglas de exclusión predeclaradas.

4. **Ejecutar PRED-EXT-01 con threshold congelado:**
   - Usar `run-pred-ext-01-rehearsal.js` adaptado a datos con seed.
   - Decision record firmado.
   - Si el rival gana (lower penalized loss) → degradar claim.
   - Si QICN gana → promover SOLO a `internal_support`, no a `external_validation`.

**Criterio de éxito:** Un decision record que dice "support" o "destruction" con threshold congelado, sin post-hoc edits.

### Fase B: Resolver Delta Residual del Extractor (v14.2)

**Objetivo:** Hacer que el extractor sea autoridad canónica.

1. **Investigar las 53 entradas formales residuales:**
   - Para cada entrada, determinar: ¿extractor bug? ¿archivo renombrado? ¿entrada curada intencionalmente?
   - Si curada intencionalmente: añadir campo `curation_reason` al registry.
   - Si bug del extractor: corregir extractor.
   - Si archivo renombrado: actualizar source paths.

2. **Investigar las 13 macros residuales:**
   - Mismo proceso.

3. **Restaurar archivos faltantes:**
   - `paper_bridge_operational_subjecthood/main.tex` (80 entradas formales, 44 macros) — está en backup ref.
   - `paper10_external_adjudication/main.tex` (15 entradas, 10 macros) — está en backup ref.
   - `basecore/core/sections/11_discrete_bridge.tex` (12 entradas) — no verificado en backup.
   - `shared/preamble_qicn.tex` (0 entradas formales, 40 macros) — no verificado en backup.

4. **Validar:** Re-ejecutar `audit:extractor-reproducibility` hasta que deltas = 0.

### Fase C: Materializar Overlay I_int (v14.3)

**Objetivo:** Degradar `prop:integration-transfer` honestamente.

1. **Opción A (preferida si hay tiempo):** Demostrar el lema de trivialidad de factorización.
   - Contratar matemático formal o producir prueba.
   - Añadir lema a Paper 5 o BaseCore.
   - Refactorizar `prop:integration-transfer`.
   - Aplicar overlay de re-upgrade.

2. **Opción B (fallback honesto):** Materializar el overlay de downgrade.
   - Crear comando `apply:curation-overlays` que genere un registry diff machine-readable.
   - Cambiar `paper5:proposition:prop-integration-transfer` a `conditional`.
   - Añadir caveat en Paper 5 explicando la carga abierta.
   - No hay opción C.

### Fase D: Ejecutar Controles Negativos (v15)

**Objetivo:** Demostrar especificidad.

1. **complexity-only control:** Sistema con alta complejidad pero sin invariantes QICN.
   - Debe fallar certificación bajo threshold congelado.
   - Si pasa → framework colapsa hacia complejidad.

2. **memory-only control:** Sistema con memoria pero sin integración causal.
   - Debe fallar `I_int`.

3. **narrative-only control:** Sistema con reporte rico pero sin invariantes.
   - Debe fallar `I_leg`.

4. **report-rich/no-integration control:** Sistema con reporte pero sin integración.
   - Debe fallar `Cop`.

5. **reward-bookkeeping control:** Sistema con reward pero sin organización puente.
   - Debe fallar BPF-1.

**Criterio de éxito:** Cada control falla por la razón pre-registrada, con decision record.

### Fase E: Ejecutar Ablaciones Dirigidas (v15)

**Objetivo:** Transformar definiciones en causalidad operacional.

1. **Destruir `I_int` (integración causal):**
   - Ablación verificada de conectividad funcional.
   - Verificar: ¿la clase `Cop` sale o contrae selectivamente?
   - Si no cambia → `I_int` no es constitutivo.

2. **Destruir `I_ri` (identidad rígida):**
   - Duplicar/remapar estado.
   - Verificar: ¿la clase se vuelve ambigua?

3. **Destruir `I_leg` (legibilidad):**
   - Añadir ruido/ compresión.
   - Verificar: ¿el decoder falla?

**Criterio de éxito:** Cada ablation produce degradación selectiva, no global. Decision records documentan `delta_amb`.

### Fase F: Ejecutar BPF-2/BPF-3 para Pi_D (v16)

**Objetivo:** Cerrar el puente fenomenal más simple.

1. **BPF-2 (Intervenciones Pi_D):**
   - Perturbaciones semánticas y de reporte.
   - Verificar selective residual no reproducible por rivales.

2. **BPF-3 (Rivales Pi_D):**
   - RIVAL-SEMANTIC-01, RIVAL-NARRATIVE-01.
   - Ejecutar penalized comparison.
   - Si rival gana → Pi_D es reducible.

### Fase G: Adjudicación Externa (v17)

**Objetivo:** Cruzar de soporte interno a evidencia externa.

1. **Dataset congelado, revisores independientes, decision records firmados.**
2. **Reproducibilidad clean-room:** Tercero reproduce pase, fallo, degradación.
3. **Actualización FCR por resultado:**
   - Predicción fallida → degradar theorem/claim.
   - Rival barato gana → degradar irreducibility.
   - Control negativo pasa → recalibrar criterio.

---

## 7. VEREDICTO FINAL

### Estado actual del marco QICN

El marco QICN en v14-core es un **programa formal-operacional con arquitectura de falsación documentada, gobernanza de registry, pipeline de rehearsal ejecutable, y una ruta clara hacia validación externa.**

### Lo que ya es real:

1. **Masa formal:** 745 entradas, 97 teoremas, 239 proved, 346 conditional.
2. **Arquitectura anti-inflacionaria:** Non-claims, caveat environments, claim-type ledger, terminology debt.
3. **Pipeline ejecutable (rehearsal):** Runner con rival real, métricas verificables, decision records bloqueados.
4. **Gobernanza de registry:** Canon map, curation overlays, coordinate specs gate, curation overlay gate.
5. **Honestidad extractor:** Diagnóstico forense que separa explicado de residual.

### Lo que falta para ser teoría científica:

1. **Un solo threshold congelado.** (CRÍTICO)
2. **Un control negativo ejecutado que falle.** (CRÍTICO)
3. **Resolver I_int (prueba o downgrade).** (ALTO)
4. **Replicación externa de un solo resultado.** (ALTO)
5. **Resolver delta residual del extractor (53+13).** (MEDIO-ALTO)

### Distancia al magnum opus

El marco está aproximadamente **60-70% de camino** hacia un magnum opus formal. La matemática es real, la arquitectura es sólida, la gobernanza es honesta. Lo que falta es la **evidencia empírica que haga que los formalismos mueran o sobrevivan de forma limpia.**

La siguiente pasada decisiva es **congelar un threshold y ejecutar un control negativo.** Eso transformaría el marco de "programa con pipeline de rehearsal" a "teoría con pipeline evidential." Todo lo demás es infraestructura alrededor de ese momento.

---

*Fin del Informe de Auditoría FCR v14-core*
*Próxima auditoría recomendada después de congelar un threshold y ejecutar un control negativo con decision record.*