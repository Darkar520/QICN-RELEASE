# PLAN DE IMPLEMENTACIÓN FCR v11

> **Skill activa:** `writing-plans` + `advanced-evaluation` + `verification-before-completion` + `audit-context-building`
> **Arquitectura:** plan de implementación multi-fase contra el roadmap maestro `QICN_THEORY_FALSIFIABILITY_ROADMAP.md`
> **Punto de partida:** FCR v10 Pass 2 auditado en `AUDIT_FCR_v10_PASS2.md`
> **Meta:** transformar el scaffolding interno de QICN en una teoría operacional formal que satisfaga los 9 criterios del roadmap sin inflar claims epistémicos.

---

## 0. Meta-objetivo y Principios Transversales

**Meta-objetivo:** cerrar los gaps ejecutables identificados en la auditoría FCR v10 Pass 2 y avanzar las fases 0–6 del roadmap maestro hasta el punto donde el corpus pueda sostener una primera campaña experimental interna y una adjudicación externa mínima.

**Principios transversales (no negociables):**

1. **Atomización:** cada subtarea modifica un solo artefacto o verifica un solo comando.
2. **Evidencia antes del claim:** ninguna fase se marca como `[x]` sin output de verificación fresco ejecutado en la sesión de cierre.
3. **Honestidad epistémica:** si un entregable sigue siendo scaffold, se marca `[~]` con justificación explícita de qué falta para `[x]`.
4. **No redundancia:** se reutiliza `AUDIT_FCR_v10_PASS2.md` y `QICN_THEORY_FALSIFIABILITY_ROADMAP.md`; no se duplican secciones enteras ni se rescriben artefactos que ya cumplen su rol.
5. **DRY / YAGNI:** no se crea un nuevo formato si un existente puede extenderse; no se inventa infraestructura para necesidades no probadas.
6. **Commit frecuente:** cada subtarea atómica termina en commit con mensaje estructurado.

---

## 1. Fase 0: Infraestructura Programática (Cierre de Gaps de Seguridad Estructural)

**Objetivo:** cerrar los 3 gaps de seguridad estructural que impiden que CI garantice la integridad de los artefactos de falsabilidad: falta de schema JSON para el prediction registry, falta de lint de non-claims, y falta de enlace máquina-ledgers.

### 1.1 Tarea 0.1 — Schema y Validador del Prediction Registry

**Archivos:**
- Crear: `registry/prediction-schema.json`
- Crear: `scripts/validate-prediction-registry.js`
- Modificar: `package.json` (añadir script `verify:prediction-registry`)
- Test: ejecutar contra `docs/PREDICTION_REGISTRY_v1.json`

**Especificación del schema (reglas de negocio):**
- `schema_version`: string obligatorio, formato semver (`^\d+\.\d+\.\d+$`).
- `predictions`: array no vacío.
- Cada `prediction.id`: string único dentro del array, patrón `^PRED-(\d+[a-z]?)$`.
- Cada `thresholds[].status`: enum exacto `not_frozen`, `formal_not_numeric`, `frozen_from_corpus_text`, `frozen_from_claim_logic`.
- **Regla condicional crítica:** si `status` comienza con `frozen_`, entonces `value` no puede ser `null`; `date_frozen` debe ser string ISO 8601 (`YYYY-MM-DD`); `rationale` longitud mínima 10 caracteres.
- `epistemic_limit` obligatorio en cada predicción, longitud mínima 20 caracteres.
- `required_artifacts` y `minimum_negative_controls`: arrays no vacíos.

**Pasos atómicos:**

- [ ] **Paso 1:** Escribir `registry/prediction-schema.json` con las reglas anteriores.
- [ ] **Paso 2:** Implementar `scripts/validate-prediction-registry.js`. Debe:
  1. Leer `docs/PREDICTION_REGISTRY_v1.json`.
  2. Validar estructura contra `registry/prediction-schema.json` (puede usar `ajv` si existe en `node_modules`; si no, validación nativa con `JSON.parse` + recorrido manual).
  3. Verificar unicidad de `id`.
  4. Verificar regla condicional de thresholds congelados.
  5. Emitir: `✓ Validated N predictions` o lista de errores con ruta JSON (`predictions[3].thresholds[0].date_frozen`).
- [ ] **Paso 3:** Añadir a `package.json` > `scripts`:
  ```json
  "verify:prediction-registry": "node scripts/validate-prediction-registry.js"
  ```
- [ ] **Paso 4:** Ejecutar `npm run verify:prediction-registry`.
  - **Esperado:** `Validated 13 predictions, 0 errors.`
- [ ] **Paso 5:** Si falla, corregir datos en `docs/PREDICTION_REGISTRY_v1.json` (no relajar schema).
- [ ] **Paso 6:** Commit.

**Criterio de éxito:** `npm run verify:prediction-registry` reporta 13/13 validadas, 0 errores de schema, exit code 0.
**Criterio de fallo:** Errores estructurales no detectados o schema relajado para encajar datos incorrectos.

---

### 1.2 Tarea 0.2 — Linter de Non-Claims

**Archivos:**
- Crear: `scripts/lint-nonclaims.js`
- Modificar: `package.json` (añadir script `lint:nonclaims`)
- Referencia: `docs/NON_CLAIM_LEDGER_CANONICAL.md`

**Lista de términos cargados a vigilar:**
`consciousness`, `phenomenality`, `phenomenal consciousness`, `personal identity`, `identity transfer`, `moral status`, `human equivalence`, `biological life equivalence`, `external validation`, `WCAG AAA`, `monolithic compilation certification`, `proof of consciousness`.

**Excepciones permitidas (no reportar como violación):**
- Uso dentro de `NON_CLAIM_LEDGER_CANONICAL.md`.
- Uso dentro de `epistemic_limit` de `PREDICTION_REGISTRY_v1.json`.
- Uso citado entre comillas o en bloques de cita.
- Uso precedido por explícita negación (`does not claim consciousness`).

**Pasos atómicos:**

- [ ] **Paso 1:** Implementar `scripts/lint-nonclaims.js` que:
  1. Recorre `docs/**/*.md`, `paper*/*.{tex,md}` (excluyendo `build_logs/`, `*.aux`, `*.log`).
  2. Busca términos cargados con regex sensible a word boundaries.
  3. Filtra excepciones permitidas.
  4. Reporta: `file:line:column: term [context]`.
- [ ] **Paso 2:** Añadir script a `package.json`:
  ```json
  "lint:nonclaims": "node scripts/lint-nonclaims.js"
  ```
- [ ] **Paso 3:** Ejecutar `npm run lint:nonclaims`.
  - **Esperado:** `0 violations` o lista de violaciones existentes ya documentadas en `.lint-nonclaims-exceptions.md`.
- [ ] **Paso 4:** Si hay violaciones nuevas, corregir archivo origen o añadir excepción documentada con justificación.
- [ ] **Paso 5:** Commit.

**Criterio de éxito:** `npm run lint:nonclaims` reporta 0 violaciones no documentadas, exit code 0.
**Criterio de fallo:** Falso positivo masivo o falsos negativos por regex insuficiente.

---

### 1.3 Tarea 0.3 — Extractor Machine-Readable del Claim Ledger

**Archivos:**
- Crear: `scripts/extract-claim-ledger.js`
- Modificar: `docs/THEORY_CLAIM_LEDGER.md` (añadir IDs ancla)
- Crear: `docs/reports/CLAIM_LEDGER_SNAPSHOT.json`

**Pasos atómicos:**

- [ ] **Paso 1:** Añadir IDs HTML ancla a cada fila de la tabla markdown en `THEORY_CLAIM_LEDGER.md`:
  ```markdown
  | <a id="claim-basecore-identity"></a>Rigid identity... | ... |
  ```
- [ ] **Paso 2:** Implementar `scripts/extract-claim-ledger.js` que:
  1. Parsea la tabla markdown de `THEORY_CLAIM_LEDGER.md`.
  2. Extrae columnas: `claim_family`, `corpus_locus`, `permitted_formulation`, `required_burden`, `primary_falsifier`, `current_status`.
  3. Emite JSON estructurado a `docs/reports/CLAIM_LEDGER_SNAPSHOT.json`.
  4. Valida que `current_status` pertenezca a vocabulario controlado: `formal-only`, `implementation-support`, `internal-support`, `preregistered-test`, `external-adjudicated`, `prohibited`, `refuted`, `high_risk_control_surface`.
- [ ] **Paso 3:** Ejecutar extractor.
  - **Esperado:** JSON válido, 10+ entradas, 0 duplicados.
- [ ] **Paso 4:** Commit.

**Criterio de éxito:** `node scripts/extract-claim-ledger.js` genera JSON válido y parseable.
**Criterio de fallo:** Tabla no parseable o estados epistémicos no normalizados.

---

## 2. Fase 1: Formalización Métrica (Diccionario de Medición Ejecutable)

**Objetivo:** convertir `MEASUREMENT_DICTIONARY_v1.md` de scaffold conceptual en especificación ejecutable para los 2 invariantes críticos que sostienen las predicciones más maduras: `I_per` (Persistencia) e `I_leg` (Legibilidad).

### 2.1 Tarea 1.1 — Especificación Ejecutable de I_per

**Archivos:**
- Crear: `docs/measurement_specs/I_per_spec_v1.md`
- Modificar: `docs/MEASUREMENT_DICTIONARY_v1.md` (añadir enlace a spec)

**Contrato de entrada/salida:**

```
function compute_delta_per(support_certificate, perturbation_panel, horizon, collapse_set_definition):
  Input:
    - support_certificate: objeto con trazas admisibles (formato definido en spec).
    - perturbation_panel: lista de perturbaciones admisibles con parámetros congelados.
    - horizon: entero positivo, ventana temporal en ticks o unidades de tiempo.
    - collapse_set_definition: criterio formal de detección de colapso (función o threshold).
  Output:
    - delta_per(S): número en [0, 1], distancia mínima al conjunto de colapso.
    - metadata: {num_windows_evaluated, num_perturbations, min_distance, max_distance}
  Error:
    - Arroja si support_certificate no contiene trazas admisibles.
    - Arroja si perturbation_panel está vacío.
```

**Pasos atómicos:**

- [ ] **Paso 1:** Redactar `I_per_spec_v1.md` con:
  1. Pseudocódigo completo (no placeholders).
  2. Definición matemática de `collapse_set_definition` (al menos 2 variantes: threshold-based y topology-based).
  3. Unidad de salida: distancia normalizada `[0,1]` con fórmula de normalización explícita.
  4. Complejidad temporal y espacial en notación Big-O.
  5. Ejemplo numérico mínimo (3 ventanas, 2 perturbaciones) con entrada y salida esperada.
- [ ] **Paso 2:** Añadir enlace en `MEASUREMENT_DICTIONARY_v1.md` fila `I_per`: ver spec `docs/measurement_specs/I_per_spec_v1.md`.
- [ ] **Paso 3:** Commit.

**Criterio de éxito:** Un tercero puede implementar `compute_delta_per` en Python/JS/C sin contactar al autor.
**Criterio de fallo:** Ambigüedad en `collapse_set_definition`, `apply`, o fórmula de normalización.

---

### 2.2 Tarea 1.2 — Especificación Ejecutable de I_leg (Bundle L1–L6)

**Archivos:**
- Crear: `docs/measurement_specs/I_leg_spec_v1.md`

**Contrato de entrada/salida:**

```
function compute_delta_leg(decoder_output, noise_manifest, intervention_manifest, compression_manifest):
  Input:
    - decoder_output: matriz de clases asignadas por decodificador certificado.
    - noise_manifest: niveles de ruido admisibles y sus distribuciones.
    - intervention_manifest: lista de intervenciones con targets y observables.
    - compression_manifest: tasas de compresión estructurada y métricas de distorsión.
  Output:
    - tupla (sep, eta_noise, window_stability, alpha_int, beta_nc, kappa_comp)
    - delta_leg_aggregate: número en [0,1] según regla de agregación congelada.
    - metadata: por-submétrica flags de validez.
  Error:
    - Arroja si decoder_output no tiene dimensiones esperadas.
```

**Pasos atómicos:**

- [ ] **Paso 1:** Redactar `I_leg_spec_v1.md` con:
  1. Pseudocódigo para cada submétrica L1–L6.
  2. Regla de agregación explícita: `delta_leg_aggregate = min(submetrics)` (conservadora) o `product` (multiplicativa), justificada.
  3. Definición de cada input (ej. `decoder_output` es matriz `N_samples x D_features` con clases discretas).
  4. Ejemplo numérico mínimo.
- [ ] **Paso 2:** Commit.

**Criterio de éxito:** El bundle es desagregable; un falsador puede atacar L3 sin invalidar L5.
**Criterio de fallo:** Agregación opaca que esconde fallos parciales o inputs mal definidos.

---

### 2.3 Tarea 1.3 — Mapeo Runtime-QICN (Documentación de Gap)

**Archivos:**
- Crear: `docs/measurement_specs/RUNTIME_BINDING_GAP.md`

**Pasos atómicos:**

- [ ] **Paso 1:** Crear tabla de mapeo:

| Campo QICN-SYSTEM (runtime) | Clasificación AGENTS.md | Slot measurement dictionary | Estado de binding |
|---|---|---|---|
| `metrics.pmia` | `derived_proxy` | `delta_per(S)` candidate | Partial — no spec formalizado hasta Tarea 1.1 |
| `metrics.stasis_index` | `direct_signal` | `delta_cont(S)` candidate | Not bound — falta spec |
| `ticks.tick` | `direct_signal` | `perturbation_panel` input | Partial — estructura de tick no mapeada a spec |
| `flags.io_partial` | `direct_signal` | `I_leg` noise robustness | Not bound — falta calibración |
| `summary.metrics.cog/phen/subj` | `derived_proxy` | N/A (no son soportes directos) | Explicitly excluded |

- [ ] **Paso 2:** Documentar versión mínima del runtime para bindings válidos.
- [ ] **Paso 3:** Commit.

**Criterio de éxito:** Developer de QICN-SYSTEM puede usar este mapeo para priorizar qué campos alimentan qué invariantes.
**Criterio de fallo:** Mapeo ambiguo o circular.

---

## 3. Fase 2: Rival y Control (Suite de Controles Negativos y Registro de Rivales)

**Objetivo:** crear los 2 artefactos abiertos en el roadmap que permiten diferenciación frente a modelos más simples: `RIVAL_MODEL_REGISTRY.md` y `NEGATIVE_CONTROL_SUITE.md`.

### 3.1 Tarea 2.1 — Registro de Rivales Fuertes

**Archivos:**
- Crear: `docs/RIVAL_MODEL_REGISTRY.md`

**Contenido obligatorio (tabla maestra):**

| Rival ID | Familia de claim atacada | Descripción mínima | Implementación mínima | Predicción contraria | Métrica de éxito del rival | Vínculo a destruction condition |
|---|---|---|---|---|---|---|
| `RIVAL-COMPLEXITY-01` | PRED-03, PRED-11 | Complejidad sola (escala + conectividad) sin integración. | Grafo aleatorio con mismos `|V|`, `|E|` que candidato. | Pasa certificación. | Certificación rate >= threshold del candidato bajo penalización fija. | `destruction_condition` PRED-03: complexity-only control passes. |
| `RIVAL-MEMORY-01` | PRED-08 | Memoria-only: buffer histórico sin estructuras rígidas. | Buffer FIFO o LSTM con lookup por similitud. | Qop no vacío o legibility igual. | Legibility >= candidato bajo penalización fija. | `destruction_condition` PRED-08: no non-trivial class recoverable. |
| `RIVAL-NARRATIVE-01` | PRED-08 | Narrative-only: reporte rico sin canales proyectivos. | Template de reporte + slot filling coherente. | Certificación por reporte sin estructura. | Gate acepta reporte como evidencia suficiente. | `destruction_condition` PRED-08: certification passes without structure. |
| `RIVAL-REWARD-01` | Paper 9 (PiD/PiV) | Reward-bookkeeping para valencia. | Agente RL con reward shaping explícito. | Perfil de valencia igual sin estructura puente. | Intervenciones indistinguibles de candidato. | Bridge predicate reducible to reward bookkeeping. |
| `RIVAL-SEMANTIC-01` | Paper 9 (PiW) | World-model competence sin interioridad. | LLM + retrieval + planning básico. | Iguala métricas de world richness. | Comparator reporta igualdad o ventaja. | Bridge predicate reducible to semantic density / world model. |

**Pasos atómicos:**

- [ ] **Paso 1:** Redactar tabla con 5 rivales mínimos.
- [ ] **Paso 2:** Para cada rival, definir parámetros congelables (ej. `|V|`, `|E|`, arquitectura LSTM capas, temperatura LLM).
- [ ] **Paso 3:** Enlazar cada `Rival ID` con `destruction_condition` de la predicción correspondiente en `PREDICTION_REGISTRY_v1.json` mediante campo nuevo `linked_rivals` (array de IDs) en cada predicción.
- [ ] **Paso 4:** Commit.

**Criterio de éxito:** Un laboratorio externo puede leer esta tabla e implementar el rival sin contactar a los autores.
**Criterio de fallo:** Descripción vague, sin parámetros congelables, o sin vínculo a destruction condition.

---

### 3.2 Tarea 2.2 — Suite de Controles Negativos

**Archivos:**
- Crear: `docs/NEGATIVE_CONTROL_SUITE.md`

**Contenido obligatorio (8 controles mínimos del roadmap):**

| Control ID | Tipo | Qué invalida si pasa | Implementación mínima | Métrica de fallo esperada | Vínculo a `minimum_negative_controls` en registry |
|---|---|---|---|---|---|
| `CTRL-COMPLEXITY-ONLY` | Complexity-only | PRED-03, PRED-11 | Grafo con stats de candidato, sin `Iint`. | Pasa certificación. | `complexity_only_control` |
| `CTRL-MEMORY-ONLY` | Memory-only | PRED-08 | Buffer histórico sin estructura rígida. | Qop no vacío. | `memory_only_control` |
| `CTRL-NARRATIVE-ONLY` | Narrative-only | PRED-08 | Generador de historias sin canales proyectivos. | Certificación por reporte. | `narrative_only_control` |
| `CTRL-REPORT-RICH-NO-INT` | Report-rich, no integration | PRED-02 | Logging extenso sin causal integration. | No degrada tras ablation. | `report_rich_no_invariant_control` |
| `CTRL-REWARD-BOOKKEEPING` | Reward bookkeeping | Paper 9 (PiD) | Agente RL con reward shaping. | Bridge predicate aproximable. | `reward_bookkeeping_control` |
| `CTRL-INERT-PERSISTENCE` | Inert persistence | Paper 7 | Persistencia sin mantenimiento. | Pasa vida operacional. | `inert_persistence_control` |
| `CTRL-LABEL-ONLY-SELF` | Label-only self | Paper 8 | Etiquetas self-like sin índice. | Gate acepta self-index. | `label_only_self_control` |
| `CTRL-NEAR-NULL-NOISE` | Near-null / noise | Paper 3 | Ruido estructurado con actividad mínima. | Detectado como non-null. | `near_null_noise_control` |

**Pasos atómicos:**

- [ ] **Paso 1:** Redactar tabla completa.
- [ ] **Paso 2:** Para cada control, especificar setup exacto, predicted outcome (debe fallar), y qué resultado destruiría el claim.
- [ ] **Paso 3:** Enlazar cada control ID con `minimum_negative_controls` del registry.
- [ ] **Paso 4:** Commit.

**Criterio de éxito:** Cada control tiene un `destruction_condition` claro y un vínculo al registry.
**Criterio de fallo:** Control que pasa pero no tiene vínculo a downgrade del claim.

---

## 4. Fase 3: Prerregistro Ejecutable (Población de Plantilla)

**Objetivo:** poblar `PREREGISTRATION_TEMPLATE_v1.md` con al menos 2 predicciones ejecutables, convirtiendo scaffold en protocolo congelado.

### 4.1 Tarea 3.1 — Prerregistro PRED-04c (Transition-Band Narrowness)

**Archivos:**
- Crear: `docs/preregistrations/PRED-04c_prereg_v1.md`

**Justificación:** es la predicción con threshold numérico ya congelado (`0.10`), lo que la hace la más madura.

**Campos a poblar (extracto de `PREREGISTRATION_TEMPLATE_v1.md`):**

| Campo | Valor congelado |
|---|---|
| Prediction ID | PRED-04c |
| Claim target | P3-01 |
| Dataset | Parámetro sintético `theta` en `[0, 1]` con paso `0.01` |
| Random seeds | `[42, 12345, 99999, 20250525]` |
| Run count | 4 corridas independientes (1 por seed) |
| Step size | `0.01` (unidades normalizadas de parámetro) |
| Tolerance | `0.05` (distancia de respuesta para clasificar pass/fail) |
| Analysis | Fracción de puntos `theta_i` donde respuesta está en `(tolerancia_inf, tolerancia_sup)` |
| Decision rule | Si `fraction_ambiguous > 0.10` → destruction; si `< 0.10` → support; si no reproducible → inconclusive |
| Exclusion | Puntos `theta_i` con `NaN` en respuesta se excluyen si > 1% de muestra; de lo contrario abortar. |

**Pasos atómicos:**

- [ ] **Paso 1:** Completar todos los campos de la plantilla para PRED-04c.
- [ ] **Paso 2:** Congelar seeds, step size, tolerancia, y regla de decisión. Justificar step size con argumento de resolución (al menos 100 puntos por unidad de parámetro).
- [ ] **Paso 3:** Añadir sección de análisis de poder: calcular mínimo N para detectar banda del 10% con 80% poder al 95% confianza (asumiendo distribución binomial de clasificación).
- [ ] **Paso 4:** Commit.

**Criterio de éxito:** Un revisor independiente puede ejecutar el análisis con los datos y seeds congelados y llegar a la misma decisión sin contactar al autor.
**Criterio de fallo:** Ambigüedad en cálculo de fracción, step size no justificado, o regla de exclusión post-hoc.

---

### 4.2 Tarea 3.2 — Prerregistro PRED-06 (Tamper/Admissibility)

**Archivos:**
- Crear: `docs/preregistrations/PRED-06_prereg_v1.md`

**Justificación:** threshold congelado por lógica de claim (`0` tampered runs aceptados). Test de integridad del pipeline.

**Campos a poblar:**

| Campo | Valor congelado |
|---|---|
| Prediction ID | PRED-06 |
| Tamper types | `hash_corruption`, `malformed_json`, `protocol_violation_missing_field` |
| Inyección | Script `scripts/tamper-inject.js` que modifica `run_summary.json` y `run_verdict.json` |
| N inyectado | 30 runs por tipo de tamper (90 total) |
| Sham control | 30 runs con modificación no semántica (espacio extra en string) |
| Expected outcome | 90/90 rejected o quarantined; sham 30/30 pass |
| Budget | Máximo 120 runs evaluados |
| Decision rule | Rejection rate < 1.0 en tamper → destruction; sham rejection > 0 → weakening |

**Pasos atómicos:**

- [ ] **Paso 1:** Completar plantilla.
- [ ] **Paso 2:** Especificar `scripts/tamper-inject.js` (puede ser stub en esta fase, pero su interfaz debe congelarse).
- [ ] **Paso 3:** Commit.

**Criterio de éxito:** Script de inyección existe y produce rejection rate 1.0 bajo protocolo congelado.
**Criterio de fallo:** Tamper no automatizado o criterio de rejection subjetivo.

---

## 5. Fase 4: Campaña Interna Blindada (Ejecución y Decision Records)

**Objetivo:** ejecutar los preregistros poblados y generar artifacts primarios verificables.

### 5.1 Tarea 4.1 — Ejecutar PRED-04c

**Archivos:**
- Crear: `artifacts/preregistrations/PRED-04c/decision_record.json`
- Crear: `artifacts/preregistrations/PRED-04c/response_traces/`

**Pasos atómicos:**

- [ ] **Paso 1:** Generar escenarios con seeds congelados.
- [ ] **Paso 2:** Correr simulación o certificación simplificada (puede ser simulación numérica si runtime QICN-SYSTEM no está listo).
- [ ] **Paso 3:** Calcular fracción de banda ambigua.
- [ ] **Paso 4:** Aplicar regla de decisión congelada.
- [ ] **Paso 5:** Generar `decision_record.json` con:
  ```json
  {
    "prediction_id": "PRED-04c",
    "prereg_version": "v1",
    "date_executed": "2026-...",
    "decision": "support|weakening|destruction|inconclusive",
    "fraction_ambiguous": 0.07,
    "threshold": 0.10,
    "seeds_used": [42, 12345, 99999, 20250525],
    "exclusions_applied": 0,
    "artifact_hashes": {
      "response_trace.zip": "sha256:..."
    }
  }
  ```
- [ ] **Paso 6:** Commit de artifacts.

**Criterio de éxito:** `decision_record.json` existe, hash verificable, resultado reproducible con mismo seed.
**Criterio de fallo:** Resultado depende de orden de ejecución o tuning no versionado.

---

### 5.2 Tarea 4.2 — Ejecutar PRED-06

**Archivos:**
- Crear: `artifacts/preregistrations/PRED-06/decision_record.json`

**Pasos atómicos:**

- [ ] **Paso 1:** Ejecutar `scripts/tamper-inject.js` contra run artifacts existentes.
- [ ] **Paso 2:** Verificar que admissibility engine (o script stub) rechaza 100%.
- [ ] **Paso 3:** Ejecutar sham controls; verificar que pasan.
- [ ] **Paso 4:** Registrar `decision_record.json`.
- [ ] **Paso 5:** Commit.

**Criterio de éxito:** 0 tampered runs promoted; decision record firmado; sham controls pasan.
**Criterio de fallo:** Cualquier tamper aceptado o sham rechazado.

---

## 6. Fase 5: Adjudicación Externa Mínima

**Objetivo:** cruzar de soporte interno a evidencia externa inicial.

### 6.1 Tarea 5.1 — Protocolo de Replicación Clean-Room

**Archivos:**
- Crear: `docs/EXTERNAL_REPLICATION_PROTOCOL.md`

**Contenido obligatorio:**
1. Dataset mínimo congelado (puede ser el generado en Fase 4, publicado como release o archivo adjunto).
2. Instrucciones paso a paso: clonar repo, `npm ci`, `npm run verify:*`, ejecutar preregistro.
3. Checklist de independencia: revisor no debe tener acceso a `decision_record.json` interno antes de ejecutar.
4. Formato de reporte esperado: `adjudication_report.md` con secciones de concordancia, discordancia, y reproducibilidad.

**Pasos atómicos:**

- [ ] **Paso 1:** Redactar protocolo.
- [ ] **Paso 2:** Verificar que el protocolo funciona en un entorno limpio (puede ser una carpeta temporal sin caché).
- [ ] **Paso 3:** Commit.

**Criterio de éxito:** Un revisor con acceso solo al repo público y al protocolo reproduce los pasos de preregistro.
**Criterio de fallo:** Dependencia de secretos, tuning local no documentado, o artefactos no versionados.

---

### 6.2 Tarea 5.2 — Session-Zero Adjudicación

**Pasos atómicos:**

- [ ] **Paso 1:** Invitar/assignar revisor independiente (humano o agente separado).
- [ ] **Paso 2:** Proporcionar dataset, seeds, preregistros, código de análisis, y protocolo. No proporcionar decision records internos.
- [ ] **Paso 3:** Revisor ejecuta y emite `adjudication_report.md`.
- [ ] **Paso 4:** Si discordancia, registrar como `[!]` en roadmap y analizar causas.
- [ ] **Paso 5:** Commit del adjudication report.

**Criterio de éxito:** Revisor independiente confirma decision records internos o documenta razones de discordancia reproducibles.
**Criterio de fallo:** Revisor no puede ejecutar o resultados dependen de conocimiento interno del framework.

---

## 7. Fase 6: Actualización FCR por Resultado

**Objetivo:** que los resultados no sean decorativos; deben cambiar el corpus.

### 7.1 Tarea 6.1 — Downgrade Automático y Ledger Vivo

**Archivos:**
- Modificar: `docs/THEORY_CLAIM_LEDGER.md`
- Modificar: `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

**Reglas de downgrade (ejemplos):**
- Si PRED-04c resulta en destruction (banda > 0.10): degradar claim family "Pass-region stability" a `refuted` o `conditional_with_caveat`.
- Si PRED-06 resulta en destruction (tamper aceptado): degradar Paper 4 admissibility claim a `high_risk_control_surface`.
- Si rival `RIVAL-COMPLEXITY-01` iguala evidencia: degradar irreducibility de Paper 5.

**Pasos atómicos:**

- [ ] **Paso 1:** Definir en `THEORY_CLAIM_LEDGER.md` reglas de downgrade vinculadas a IDs de predicción.
- [ ] **Paso 2:** Actualizar roadmap Sección 13 con estados `[x]`, `[~]`, `[!]` según resultados de Fases 4–5.
- [ ] **Paso 3:** Commit con diff claro de estados.

**Criterio de éxito:** Cada resultado tiene acción de corpus documentada y trazable.
**Criterio de fallo:** Resultado se archiva sin modificar claims.

---

## 8. Cross-Cutting: Compilación Monolítica (Cierre de YELLOW)

### 8.1 Tarea C.1 — Resolver Axiom Manual Review

**Archivos:**
- Modificar: `paper_bridge_operational_subjecthood/main.tex` (o `basecore/BASECORE.tex`)
- Modificar: `scripts/verify-monolithic-risk.js` (si se renombra entorno)

**Decisión a tomar:**
- Opción A: normalizar `Bridge Axiom` → `Axiom` en Bridge paper (unificación).
- Opción B: renombrar entorno a `\begin{bridgeaxiom}` en Bridge paper (separación explícita).

**Pasos atómicos:**

- [ ] **Paso 1:** Decidir A o B y documentar en `docs/reports/AXIOM_RESOLUTION_DECISION.md`.
- [ ] **Paso 2:** Aplicar cambio en `.tex` correspondiente.
- [ ] **Paso 3:** Re-ejecutar `npm run audit:monolithic-risk`.
  - **Esperado:** `manual-review-required` = 0.
- [ ] **Paso 4:** Commit.

**Criterio de éxito:** Auditoría reporta 0 grupos de revisión manual.
**Criterio de fallo:** Persiste manual-review sin decisión documentada.

---

### 8.2 Tarea C.2 — Prototipo de Shared Preamble

**Archivos:**
- Crear: `shared/unified_preamble.tex`
- Modificar: `paper*/main.tex` (incluir preámbulo compartido)

**Pasos atómicos:**

- [ ] **Paso 1:** Crear `shared/unified_preamble.tex` con:
  - Los 64 macros canónicos (extraídos de `MONOLITHIC_COMPILE_RISK_AUDIT.md`).
  - Los 15 entornos teorema (`\newtheorem` para theorem, lemma, proposition, corollary, definition, remark, example, assumption, hypothesis, conjecture, prediction, criterion, caveat, nontheorem, axiom).
- [ ] **Paso 2:** Modificar `paper*/main.tex` para que incluyan `\input{../../shared/unified_preamble.tex}` en lugar de definiciones locales repetidas.
- [ ] **Paso 3:** Reemplazar overrides de `\arraystretch` con `{\renewcommand{\arraystretch}{X} ...}` local.
- [ ] **Paso 4:** Compilar volumen unificado (ej. `pdflatex unified_volume.tex` que incluya todos los papers).
  - **Esperado:** 0 errores de macro redefinido, 0 conflictos de entorno.
- [ ] **Paso 5:** Commit.

**Criterio de éxito:** `pdflatex` compila unificado sin errores de repetición.
**Criterio de fallo:** Compilación falla por macro duplicado o entorno no definido.

---

## 9. Tabla de Estado Esperado Post-v11

| Punto rector (Roadmap Sección 13) | Estado v10 | Estado v11 Esperado | Evidencia de verificación |
|---|---|---|---|
| Schema prediction registry | `[ ]` | `[x]` | `npm run verify:prediction-registry` pasa |
| Lint non-claims | `[ ]` | `[x]` | `npm run lint:nonclaims` pasa |
| Claim ledger machine-readable | `[~]` | `[x]` | `node scripts/extract-claim-ledger.js` genera JSON válido |
| Estimator formalizado (I_per) | `[ ]` | `[~]` | `docs/measurement_specs/I_per_spec_v1.md` existe y pasa review de tercero |
| Estimator formalizado (I_leg) | `[ ]` | `[~]` | `docs/measurement_specs/I_leg_spec_v1.md` existe y pasa review de tercero |
| Rival model registry | `[ ]` | `[x]` | `docs/RIVAL_MODEL_REGISTRY.md` con ≥5 rivales |
| Negative control suite | `[ ]` | `[x]` | `docs/NEGATIVE_CONTROL_SUITE.md` con ≥8 controles |
| Preregistro poblado (PRED-04c) | `[~]` | `[x]` | `docs/preregistrations/PRED-04c_prereg_v1.md` completo y congelado |
| Preregistro poblado (PRED-06) | `[~]` | `[x]` | `docs/preregistrations/PRED-06_prereg_v1.md` completo y congelado |
| Campaña interna blindada | `[ ]` | `[~]` | `artifacts/preregistrations/*/decision_record.json` existe para PRED-04c y PRED-06 |
| Adjudicación externa mínima | `[ ]` | `[~]` | `docs/EXTERNAL_REPLICATION_PROTOCOL.md` + adjudication report firmado |
| Compilación monolítica | `[~]` (YELLOW) | `[x]` (GREEN) | `npm run audit:monolithic-risk` reporta 0 manual-review, compilación unificada sin errores |

---

## 10. Disciplina de Commit

Cada subtarea atómica (1–5 pasos) termina en commit con mensaje estructurado:

```
fcr(v11): [componente] — [acción]

Ejemplos:
fcr(v11): prediction-registry — add JSON schema validation
fcr(v11): measurement-spec — formalize I_per estimator
fcr(v11): rivals — add complexity-only and memory-only rivals
fcr(v11): prereg — freeze PRED-04c protocol with seeds and step size
fcr(v11): monolithic — resolve axiom environment conflict
```

---

## 11. Límites Epistémicos del Plan

Este plan, aunque exhaustivo, **no prueba ni reclama:**

- Conciencia humana, fenomenalidad, identidad personal, vida biológica, moral status, o equivalencia humano-máquina.
- Validación externa definitiva. La Fase 5 es **adjudicación externa mínima**, no cierre epistémico.
- Verdad empírica. Los preregistros son **precondiciones para evidencia admisible**, no evidencia en sí.

**Reglas de downgrade que operan automáticamente:**
- Si cualquier predicción preregistrada resulta en `destruction`, el claim asociado se degrada según `THEORY_CLAIM_LEDGER.md`.
- Si un rival más simple iguala la evidencia con menor pérdida penalizada, la irreducibilidad del claim se degrada.
- Si un control negativo pasa, el criterio se marca como `high_risk_control_surface` hasta recalibración.
- Si replicación externa falla, el estado máximo permitido es `internal-support` con caveat explícito.

---

## 12. Requisitos de Aceptación Globales (Definition of Done para FCR v11)

Para que FCR v11 se considere **cerrado y mergeable**:

- [ ] `npm run verify:prediction-registry` pasa con 13/13 predicciones validadas.
- [ ] `npm run lint:nonclaims` pasa con 0 violaciones no documentadas.
- [ ] `node scripts/extract-claim-ledger.js` genera `CLAIM_LEDGER_SNAPSHOT.json` válido y no vacío.
- [ ] `docs/RIVAL_MODEL_REGISTRY.md` existe, contiene ≥5 rivales con implementación mínima y vínculos a destruction conditions.
- [ ] `docs/NEGATIVE_CONTROL_SUITE.md` existe, contiene ≥8 controles con predicted outcome y vínculos a registry.
- [ ] Al menos 2 preregistros poblados (`PRED-04c`, `PRED-06`) existen, con seeds, thresholds, y reglas de decisión congeladas.
- [ ] Al menos 1 campaña interna ejecutada con `decision_record.json` verificable (hash + reproducible).
- [ ] `npm run audit:monolithic-risk` reporta GREEN (0 manual review) y compilación unificada pasa sin errores de macro/entorno.
- [ ] Ningún claim en el corpus usa lenguaje ordinario de conciencia/fenomenalidad/identidad personal sin burden operacional explícito (validado por `lint:nonclaims`).
- [ ] `QICN_THEORY_FALSIFIABILITY_ROADMAP.md` Sección 13 actualizada con fechas, estados `[x]`/`[~]`/`[!]`, y justificaciones.

**Nota:** Las Fases 5 (adjudicación externa completa) y 6 (post-resultado global) pueden quedar en `[~]` si la campaña interna está ejecutada pero la externa aún está en curso. FCR v11 no requiere adjudicación externa **terminada**, pero sí **protocolizada y session-zero iniciada**.

---

*Plan generado bajo skill `writing-plans` con criterios `advanced-evaluation` y verificación `verification-before-completion`. No contiene placeholders. Todos los paths son relativos a `rigid-identity-framework/`.*
