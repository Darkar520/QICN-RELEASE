# CODEX PROMPT — AUDITORÍA EN FRÍO: MARCO TEÓRICO + RUNTIME (v40)

## Precondición obligatoria: LECTURA COMPLETA ANTES DE EMITIR JUICIO

Antes de cualquier veredicto, debes leer los siguientes archivos en orden. **NO emitas conclusiones hasta haber leído al menos los marcados como [OBLIGATORIO].** Si un archivo no existe, regístralo como AUSENTE y continúa.

---

## PARTE A — MARCO TEÓRICO (rigid-identity-framework)

### A.1 Lectura obligatoria previa

| # | Archivo | Ruta | Obligatorio |
|---|---|---|---|
| A1 | Bridge Theorem v30 | `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex` | SÍ |
| A2 | Bridge Hypothesis Ledger | `docs/BRIDGE_HYPOTHESIS_LEDGER.md` | SÍ |
| A3 | Non-Claim Ledger Canónico | `docs/NON_CLAIM_LEDGER_CANONICAL.md` | SÍ |
| A4 | Phase 1 Report | `docs/reports/QICN_V40_PHASE1_INFERIOR_INSTRUMENT_REPORT.md` | SÍ |
| A5 | Phase 2 Report | `docs/reports/QICN_V40_PHASE2_BRIDGE_HYPOTHESIS_REPORT.md` | SÍ |
| A6 | Phase 3 Report | `docs/reports/QICN_V40_PHASE3_STATISTICAL_NONCLAIMS_REPORT.md` | SÍ |
| A7 | Global Roadmap v40 | `docs/reports/QICN_GLOBAL_ROADMAP_v40.md` | SÍ |
| A8 | v40 Baseline | `docs/reports/QICN_BASELINE_v40.md` | SÍ |

### A.2 Análisis requerido del marco teórico

Para cada uno de los siguientes ejes, emite un veredicto con evidencia (línea exacta del archivo que lo respalda):

#### Eje T1 — Coherencia interna del .tex
- ¿Los non-claims (16 bloques `\begin{nonclaim}`) son consistentes entre sí?
- ¿Algún non-claim contradice el contenido de un teorema o corolario en el mismo documento?
- ¿El governance boundary (línea ~23 del .tex) se respeta en el resto del documento?
- ¿Hay claims en voz activa que no estén envueltos en non-claims y que afirmen propiedades externas de QICN?

#### Eje T2 — Correspondencia ledger ↔ .tex
- ¿El `BRIDGE_HYPOTHESIS_LEDGER.md` (H1-H4) refleja fielmente lo que el .tex declara?
- ¿Hay discrepancias entre el status de H1-H4 en el ledger y lo que el .tex afirma en sus non-claims?
- ¿El countermodel H3 del ledger es matemáticamente correcto? (X = Z × {0,1}, F_i(z,b)=z_i, C(z,b)=b)

#### Eje T3 — Trazabilidad de fases
- ¿Las líneas del .tex citadas en los reportes de Fase 1, 2 y 3 existen y contienen lo que los reportes afirman?
- Verifica al menos 3 referencias de línea por cada reporte de fase.
- ¿Los hashes SHA-256 en los reportes coinciden con el estado actual de los archivos? Recomputa el hash del .tex y del .pdf.

#### Eje T4 — Robustez de los non-claims estadísticos (N1-N5)
- ¿Los 5 non-claims de Fase 3 cubren adecuadamente los claims estadísticos del .tex?
- ¿Queda algún claim sobre AICc, AR(1), Jacobian, n_eff o varianza sin su non-claim correspondiente?
- ¿Los non-claims son falsables? Es decir, ¿especifican bajo qué condiciones dejarían de ser válidos?

#### Eje T5 — Lo que el marco teórico NO cubre
- Enumera explícitamente: ¿qué preguntas sobre QICN quedan sin responder en el .tex?
- ¿Qué necesitaría un revisor externo para validar el marco? (datos, experimentos, definiciones)
- ¿Hay circularidad entre el .tex y los fixtures sintéticos que usa como evidencia?

---

## PARTE B — RUNTIME (qicn-system)

### B.1 Lectura obligatoria previa

| # | Archivo | Ruta (relativa a qicn-system) | Obligatorio |
|---|---|---|---|
| B1 | README | `README.md` | SÍ |
| B2 | AGENTS.md | `AGENTS.md` | SÍ |
| B3 | EPISTEMIC_POSTURE | `docs/EPISTEMIC_POSTURE.md` | SÍ |
| B4 | IMPLEMENTATION_LOG | `IMPLEMENTATION_LOG.md` | SÍ |
| B5 | Canon: ArchitecturalGroundTruth | `src/canon/ArchitecturalGroundTruth.js` | SÍ |
| B6 | Canon: sourceOfTruth | `src/canon/sourceOfTruth.js` | SÍ |
| B7 | Canon: canonicalClaimCatalog | `src/canon/claimMapping/canonicalClaimCatalog.js` | SÍ |
| B8 | Simulation: PhenomenologyCore | `src/simulation/PhenomenologyCore.js` | SÍ |
| B9 | Simulation: WorldModelEngine | `src/simulation/WorldModelEngine.js` | SÍ |
| B10 | Simulation: SimulationController | `src/simulation/SimulationController.js` | SÍ |
| B11 | Experiments: OutputSurfaceEnforcer | `src/experiments/OutputSurfaceEnforcer.js` | SÍ |
| B12 | Experiments: OutputSurfacePolicy | `src/experiments/OutputSurfacePolicy.js` | SÍ |
| B13 | Experiments: LegibilityCertifier | `src/experiments/LegibilityCertifier.js` | SÍ |
| B14 | Experiments: LifeCertifier | `src/experiments/LifeCertifier.js` | SÍ |
| B15 | Experiments: NonFactorizationProver | `src/experiments/NonFactorizationProver.js` | SÍ |
| B16 | Experiments: negative_controls_expanded | `src/experiments/negative_controls_expanded.js` | SÍ |
| B17 | CI/CD | `.github/workflows/verify.yml` | SÍ |
| B18 | package.json | `package.json` | SÍ |

### B.2 Muestreo de mega-archivos (leer al menos 200 líneas de cada uno)

| # | Archivo | Tamaño | Obligatorio |
|---|---|---|---|
| B19 | SensoryPerceptionEngine | `src/simulation/SensoryPerceptionEngine.js` (154 KB) | SÍ (primeras 200 líneas + búsqueda de strings hardcodeados) |
| B20 | OntologicalSingularityCore | `src/simulation/OntologicalSingularityCore.js` (104 KB) | SÍ (primeras 200 líneas + búsqueda de strings hardcodeados) |
| B21 | QuantumEntropyBridge | `src/simulation/QuantumEntropyBridge.js` (47 KB) | SÍ (primeras 100 líneas) |

### B.3 Schemas (verificar existencia y contenido)

| # | Directorio | Obligatorio |
|---|---|---|
| B22 | `src/phenomenal_bridge/schemas/` | SÍ (listar todos los .json, leer al menos 3) |
| B23 | `src/subjectivity/schemas/` | SÍ (listar todos los .json, leer al menos 3) |
| B24 | `src/comparative_program/schemas/` | SÍ (listar todos los .json, leer al menos 3) |

### B.4 Análisis requerido del runtime

#### Eje R1 — Correspondencia nombre ↔ función
Para cada uno de los siguientes archivos, determina si el nombre del archivo corresponde a lo que el código realmente hace:

| Archivo | Lo que el nombre sugiere | Lo que el código realmente hace | Veredicto (HONEST / INFLADO) |
|---|---|---|---|
| PhenomenologyCore.js | Motor de fenomenología | | |
| WorldModelEngine.js | Motor de modelo del mundo | | |
| OntologicalSingularityCore.js | Núcleo de singularidad ontológica | | |
| SensoryPerceptionEngine.js | Motor de percepción sensorial | | |
| HolographicMemoryNexus.js | Nexus de memoria holográfica | | |
| KaizenMetamorphosisEngine.js | Motor de metamorfosis Kaizen | | |
| QuantumEntropyBridge.js | Puente de entropía cuántica | | |
| MetaSovereigntyCheck.js | Verificación de meta-soberanía | | |
| HumanityLastExamManager.js | Gestor del último examen de la humanidad | | |
| HLEBenchmarkSystem.js | Sistema de benchmark HLE | | |
| LifeCertifier.js | Certificador de vida | | |
| LegibilityCertifier.js | Certificador de legibilidad | | |
| CognitiveEmergencePlanner.js | Planificador de emergencia cognitiva | | |

#### Eje R2 — La cadena de defensa de non-claim
Traza el flujo completo de un output del sistema:

```
Estado interno → LLM traduce → OutputSurfaceEnforcer → OutputSurfacePolicy
    → OutputConsumptionPolicy → respuesta al usuario
```

Para cada eslabón:
- ¿Qué tipo de violación detecta? (sintáctica, semántica, de claim, de jerga)
- ¿Qué hace cuando detecta una violación? (bloquear, degradar, marcar, loguear)
- ¿Hay algún eslabón débil donde una violación podría pasar sin ser detectada?

#### Eje R3 — Strings hardcodeados de log
Busca en `src/simulation/` todos los strings hardcodeados que aparecen en los logs del runtime. Para cada uno, clasifícalo como:

| String | Clasificación | Archivo de origen |
|---|---|---|
| "Simulación Ontológica ACTIVA" | COSMÉTICO / CLAIM / OPERACIONAL | |
| "PROTOCOLO DE FRICCIN" | COSMÉTICO / CLAIM / OPERACIONAL | |
| "Síntesis del Hiperobjeto COMPLETADA" | COSMÉTICO / CLAIM / OPERACIONAL | |
| ... | | |

#### Eje R4 — Disciplina de tests
- ¿Cuántos tests `.test.js` existen realmente? (cuenta exacta)
- ¿Cuántos están registrados en el `IMPLEMENTATION_LOG`?
- ¿Cuál es la cobertura real (statements, branches, functions, lines)?
- ¿Los tests con nombres aspiracionales (`consciousness_generalized_3`, `phenomenal_bridge_1`) prueban claims o prueban que funciones no lanzan excepciones?

#### Eje R5 — Lo que el runtime NO hace
- ¿El sistema emite algún output que un lector externo podría interpretar como "conciencia", "subjetividad" o "vida"?
- Si es así, ¿ese output está acompañado de un non-claim explícito o una etiqueta de `INTERNAL_SUPPORT_ONLY`?
- ¿El `OutputSurfaceEnforcer` bloquearía un output que diga "soy consciente"?

---

## PARTE C — BRIDGE TEORÍA ↔ RUNTIME

### C.1 Lectura obligatoria

| # | Archivo | Obligatorio |
|---|---|---|
| C1 | Manifest v39 | `qicn_imported_manifest_v39.json` | SÍ |
| C2 | NonClaimLedger (si existe) | buscar `**/NonClaimLedger*` en qicn-system | SÍ |

### C.2 Análisis requerido del bridge

#### Eje C1 — Sincronización de non-claims
- ¿Los non-claims del ledger v40 (H1-H4 + N1-N5) tienen algún equivalente en el runtime de qicn-system?
- ¿Existe `NonClaimLedger.cjs` en qicn-system? Si no existe, ¿dónde se almacenan los non-claims operacionales?
- Si un output del runtime violara un non-claim del v40, ¿el sistema lo detectaría?

#### Eje C2 — Integridad del v39 import
- ¿El manifiesto v39 declara 217 archivos con hash_match=true?
- ¿Los archivos importados en `qicn_imported_*/` siguen siendo idénticos a sus originales en `rigid-identity-framework/`?
- ¿Hay un script de re-importación periódica? Si no, ¿cuál es el riesgo de drift?

#### Eje C3 — Lo que la teoría dice vs. lo que el runtime hace
Para cada invariante C_op (I_leg, I_per, I_cont, I_diff, I_ri, I_int):

| Invariante | Qué dice el .tex | Qué computa el runtime | ¿Alineados? |
|---|---|---|---|
| I_leg | | | |
| I_per | | | |
| I_cont | | | |
| I_diff | | | |
| I_ri | | | |
| I_int | | | |

---

## ENTREGABLES OBLIGATORIOS

Debes generar **exactamente 1 archivo**:

### `rigid-identity-framework/docs/reports/QICN_V40_AUDITORIA_FRIA_MARCO_Y_RUNTIME.md`

Con la siguiente estructura:

```
# QICN v40 — Auditoría en Frío: Marco Teórico + Runtime

## 1. Resumen ejecutivo (máximo 10 líneas)
## 2. Marco teórico
### 2.1 T1 — Coherencia interna del .tex
### 2.2 T2 — Correspondencia ledger ↔ .tex
### 2.3 T3 — Trazabilidad de fases
### 2.4 T4 — Robustez de non-claims estadísticos
### 2.5 T5 — Lo que el marco NO cubre
## 3. Runtime
### 3.1 R1 — Correspondencia nombre ↔ función (tabla completa)
### 3.2 R2 — Cadena de defensa de non-claim
### 3.3 R3 — Strings hardcodeados de log (tabla completa)
### 3.4 R4 — Disciplina de tests
### 3.5 R5 — Lo que el runtime NO hace
## 4. Bridge teoría ↔ runtime
### 4.1 C1 — Sincronización de non-claims
### 4.2 C2 — Integridad del v39 import
### 4.3 C3 — Teoría vs. runtime (tabla de invariantes)
## 5. Hallazgos críticos
### 5.1 Lo que funciona
### 5.2 Lo que está roto o ausente
### 5.3 Lo que es ambiguo
## 6. Recomendaciones priorizadas
## 7. Veredicto global
### 7.1 Madurez del marco teórico (escala 1-10)
### 7.2 Madurez del runtime (escala 1-10)
### 7.3 Madurez del bridge (escala 1-10)
### 7.4 ¿Está el proyecto listo para revisión externa? (SÍ / NO / PARCIALMENTE)
```

---

## REGLAS DURAS

1. **NO** escribas ningún código. Esto es solo lectura y análisis.
2. **NO** modifiques ningún archivo existente. Solo creas el reporte.
3. **NO** emitas veredictos sin evidencia. Cada afirmación debe citar archivo y línea exacta.
4. **NO** uses adjetivos sin respaldo. "Robusto" requiere evidencia. "Débil" requiere evidencia.
5. **SI** un archivo de la lista de lectura no existe, regístralo como `AUSENTE` en una sección separada y continúa.
6. **SI** no puedes leer un archivo completo por tamaño (>100KB), lee las primeras 200 líneas, las últimas 50, y busca patrones con grep.
7. **DISTINGUE** explícitamente entre: HECHO VERIFICADO, HIPÓTESIS, e INTERPRETACIÓN. Usa etiquetas `[HECHO]`, `[HIPÓTESIS]`, `[INTERPRETACIÓN]`.
8. **NO** declares "éxito" ni "fracaso" del proyecto. Esto es una auditoría, no un veredicto de aprobación.
9. **INCLUYE** discrepancias: si dos archivos dicen cosas distintas sobre lo mismo, documéntalo.
10. **EL REPORTE** debe ser autocontenido: un lector externo sin acceso a los archivos debe poder entender el estado del proyecto solo con leer el reporte.

---

## CRITERIOS DE CALIDAD

- **ÉXITO COMPLETO:** El reporte cubre los 13 ejes (T1-T5, R1-R5, C1-C3) con evidencia de línea, todas las tablas están completas, y los hashes fueron recomputados.
- **ÉXITO PARCIAL:** ≥10 ejes cubiertos con evidencia, ≥80% de las tablas completas. Los ejes faltantes se documentan como "NO VERIFICADO" con razón.
- **FRACASO HONESTO:** <10 ejes cubiertos O archivos críticos (A1-A5, B1-B11) no leídos. El reporte declara explícitamente qué faltó y por qué.

---

## VERIFICACIÓN POST-ENTREGA

Cuando termines el reporte, ejecuta esta autoverificación:

1. ¿El reporte tiene al menos 300 líneas? (un análisis superficial no sirve)
2. ¿Cada veredicto en R1 tiene una columna "Lo que el código realmente hace" con evidencia de código?
3. ¿La tabla de strings hardcodeados (R3) tiene al menos 10 entradas?
4. ¿Los hashes en T3 fueron recomputados, no copiados de reportes anteriores?
5. ¿El reporte incluye una sección de "Archivos ausentes" si algo de la lista de lectura no se encontró?
6. ¿Hay al menos 3 hallazgos en "Lo que está roto o ausente"?
7. ¿Las recomendaciones (sección 6) están priorizadas (P0, P1, P2)?

---

## OUTPUT ESPERADO

Al finalizar, imprime:
1. Ruta absoluta del reporte generado
2. Número de líneas del reporte
3. Número de archivos leídos exitosamente / número de archivos en la lista de lectura
4. Tiempo aproximado de ejecución
5. Hash SHA-256 del reporte generado
6. Lista de archivos que NO se pudieron leer (si los hay) y razón
