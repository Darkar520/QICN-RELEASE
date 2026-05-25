# Auditoria Profunda: Implementacion FCR v10 por Codex

> **Auditor:** OpenCode (kimi-k2.6)
> **Fecha:** 2026-05-25
> **Postura:** Objetiva, anti-sycophancy, anti-psychophancy
> **Baseline Auditado:** Commit `f48e42c` + working tree con cambios v10 no commiteados
> **Skills Activas:** audit-context-building, advanced-evaluation, verification-before-completion

---

## 0. Veredicto Ejecutivo (en una frase)

**Codex implemento el FCR v10 con calidad tecnica notablemente superior al promedio de agentes LLM, pero dejo fuera de scope 5 entregables documentales clave del plan original, y realizo una segunda cirugia sobre v9 que OpenCode no habia detectado como necesaria.**

---

## 1. Metodologia de Auditoria

Esta auditoria aplica los criterios del skill `audit-context-building`:

1. **Line-by-line analysis** de cada archivo nuevo y modificado.
2. **Cross-reference verification:** cada claim de Codex fue verificado con comando real.
3. **Evidence-before-claims:** todos los outputs de verificacion se ejecutaron frescos en esta sesion.
4. **Anti-hallucination:** cuando no pude verificar algo, lo declare explicitamente.
5. **Gap hunting:** busque lo que falta, no solo lo que esta.

**Comandos ejecutados para evidencia:**
- `npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity`
- `npm run analyze:impact -- --audit-overlays`
- `npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity --json`
- `npm run verify:corpus-registry -- --strict-crossrefs`
- `npm run verify:macro-registry`
- `git diff` sobre cada archivo modificado
- `glob` sobre cada entregable faltante

---

## 2. Inventario de Cambios (lo que realmente toco Codex)

### Archivos NUEVOS (7)

| Archivo | Lineas | Tipo | Estado Auditoria |
|---|---|---|---|
| `scripts/fcr-impact-analyzer.js` | 362 | Script ejecutable | **Verificado funcional** |
| `docs/PREDICTION_REGISTRY_v1.json` | 231 | JSON schema + datos | **Verificado valido** |
| `docs/FALSIFIER_MATRIX.md` | 43 | Markdown matriz | **Verificado existente** |
| `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md` | 1035 | Ledger maestro | **Verificado actualizado** |
| `docs/CODEX_PROMPT_FCR_v10.md` | 373 | Prompt plan v10 | **Verificado existente** |
| `docs/reports/FCR_V9_CODEX_AUDIT_REPAIR.md` | 62 | Auditoria v9 por Codex | **Verificado existente** |
| `docs/AUDIT_HANDOFF_FCR_v9.md` | 557 | Handoff OpenCode v9 | Pre-existente, no modificado |

### Archivos MODIFICADOS (11)

| Archivo | Naturaleza del cambio | Evaluacion |
|---|---|---|
| `package.json` | +1 script `analyze:impact` | Correcto, minimal |
| `docs/FCR_SPEC.md` | + boundary claims + impact analysis section | **Excelente** - corrige overclaims de v9 |
| `paper5_operational_consciousness/main.tex` | **Segunda cirugia del decoder** (ver Seccion 3) | **Inesperado pero justificado** |
| `scripts/registry-lib.js` | + classifyMacroCollision, groupByLatexName, heuristic envs | **Arquitectura mejorada** |
| `scripts/generate-report.js` | Usa nueva API de clasificacion de macros | **Consistente con registry-lib** |
| `scripts/validate-macros.js` | Simplificado para usar registry-lib | Correcto |
| `registry/theorems.jsonl` | Regenerado | Esperado |
| `registry/macros.jsonl` | Regenerado | Esperado |
| `docs/reports/CORPUS_HEALTH_REPORT.md` | Regenerado | Esperado |
| `docs/reports/DEPENDENCY_GRAPH.dot` | Regenerado | Esperado |
| `docs/reports/MACRO_COLLISION_REPORT.md` | Regenerado con nueva clasificacion | Esperado |
| `docs/reports/THEOREM_ATLAS.md` | Regenerado | Esperado |

---

## 3. Hallazgo Critico: Codex Re-Cirugia Paper 5 (v9) sin que OpenCode lo pidiera

**Esto es lo mas importante de la auditoria.**

Codex no solo implemento v10. Durante su propia auditoria interna (`FCR_V9_CODEX_AUDIT_REPAIR.md`), descubrio que la cirugia del decoder que OpenCode hizo en v9 **aun tenia una falla logica residual**. Y la corrigio.

### Lo que OpenCode dejo en v9 (lineas 370-423 de paper5):

```latex
\begin{definition}[Certified decoder]\label{def:decoder}
A decoder $D \in \Dec_S$ is certified if it satisfies the six legibility clauses of Definition~\ref{def:ileg} on $\Aset$ for the chosen horizon family.
\end{definition}
```

**Problema residual:** La prueba de transitividad de Codex citaba "el decoder family es cerrado bajo composicion (Definition~\ref{def:decoder})", pero `def:decoder` en v9 NO mencionaba composicion ni cerradura estructural. Era una referencia circular encubierta: la prueba invocaba una propiedad que la definicion no establecia.

### Lo que Codex reescribio (diff actual en working tree):

```latex
\begin{definition}[Decoder family and structural closure]\label{def:decoder}
A decoder family $\Dec_S$ for $S$ is a family of maps from admissible readout windows $h_{S,T}(x;u_\bullet)$ to a declared class set $\Class_S$, indexed by admissible horizons and intervention schedules. The family is \emph{structurally closed} when all its members use the same class set, class equality composes exactly, and the induced intervention-response cells are transitive under the certified matching relation. Definition~\ref{def:ileg} below adds the operational clauses required before such a structurally closed family counts as certified for legibility.
\end{definition}
```

Y la prueba de transitividad fue reescrita para usar un decoder fijo arbitrario $D$ en lugar de decoders distintos $D_x, D_y, D_z$, lo cual es **mas riguroso matematicamente** porque no necesita asumir que los decoders estan indexados por los elementos comparados.

### Evaluacion de esta segunda cirugia:

| Aspecto | Calificacion |
|---|---|
| Correctitud matematica | **Mejor que v9** - elimina la circularidad residual |
| Riesgo de introducir nuevos bugs | **Bajo** - el cambio es local al bloque del decoder y la prueba |
| Transparencia | **Mejorable** - Codex no le aviso a OpenCode que re-cirugiaria v9 |
| Consistencia con FCR | **Alta** - la nueva definicion si contiene la propiedad que la prueba usa |

**Veredicto:** La correccion es tecnicamente valida y mejora el corpus. Pero **viola el principio de versiones congeladas**: v9 fue commiteado como estable, y Codex lo modifico sin un nuevo commit explicito. Esto crea ambiguedad: `f48e42c` ya no representa el estado real del corpus.

---

## 4. Evaluacion del Impact Analyzer (fcr-impact-analyzer.js)

### Calidad de Codigo

| Criterio | Estado |
|---|---|
| Read-only (no edita registry) | **Cumple** - solo lee theorems.jsonl |
| Error handling robusto | **Cumple** - parse errors, duplicate IDs, missing deps, cycles reportados claramente |
| Deterministic sorting | **Cumple** - sort por depth, luego por id lexicografico |
| CLI ergonómico | **Cumple** - `--target`, `--audit-overlays`, `--json`, usage message |
| Exports para testing | **Cumple** - `module.exports` con funciones clave |
| Limitation warning | **Cumple** - "Syntactic/FCR-explicit dependency impact only..." |

### Verificacion de Output

Comando: `npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity`

Resultado verificado:
- Direct dependents: 1 (`basecore:theorem:thm-fragmentation`)
- Transitive dependents: 3 (el teorema + 2 proposition/theorem en depth 2)
- Max depth: 2
- **All impacted entries are `proved` status** - esto es una senal de riesgo: si `hyp:phi-regularity` cambia, 3 teoremas `proved` podrian necesitar rebajarse a `conditional`

Comando: `npm run analyze:impact -- --audit-overlays`

Resultado verificado:
- 20 audit overlays rankeados por impacto transitivo
- `paper2:hypothesis:hyp-phi-paper2` tiene mayor impacto (4 direct, 5 transitive, depth 2)
- 5 overlays tienen 0 downstream impact (leaves) - son cambios aislados

**Punto de atencion:** El analyzer solo sigue `depends_on` explicito. Si un teorema depende semanticamente de `hyp:phi-regularity` pero no tiene un `\ref{hyp:phi-regularity}` en su cuerpo o prueba, el analyzer NO lo detectara. La advertencia de limitacion esta presente, pero los usuarios humanos podrian ignorarla.

---

## 5. Evaluacion del Prediction Registry (PREDICTION_REGISTRY_v1.json)

### Estructura

Schema bien disenado con campos:
- `id`, `source_paper`, `claim_target`, `claim_family`
- `observable`, `manipulation`, `framework_prediction`, `rival_prediction`
- `support_condition`, `weakening_condition`, `destruction_condition`
- `required_artifacts` (array)
- `minimum_negative_controls` (array)
- `current_status`, `epistemic_limit`

### Poblacion

8 predicciones incluidas:
- PRED-02, PRED-03, PRED-04a, PRED-04b, PRED-04c, PRED-05, PRED-09, PRED-11

**Faltan del Paper 6 original:**
- PRED-01 (cross-substrate class preservation)
- PRED-06 (tamper/sham controls)
- PRED-07 (stability under bounded perturbation)
- PRED-08 (non-emptiness of Qop)
- PRED-10 (legibility under noise/compression)

**Evaluacion:** El scaffold esta bien, pero la cobertura es parcial. El prompt v10 pedia "Initial prediction families: PRED-02, PRED-03/PRED-11, PRED-04a/b/c, PRED-05, PRED-09" - Codex cubrio exactamente esas, nada mas. Es obediente pero no proactivo.

### Criterio del tercero independiente

> "A third-party reviewer should be able to design a concrete test or falsification attempt from each record without private explanation from the authors."

**Veredicto: CUMPLE PARCIALMENTE.** Las condiciones de destruccion son claras (ej: "Response falls outside tolerance in the frozen pass-region panel"). Pero faltan valores numericos congelados para los thresholds. "Frozen pass-region panel" y "frozen width threshold" son conceptos correctos, pero no tienen valores asignados. Un tercero sabria QUE medir, pero no SABRIA exactamente cual es el valor critico.

---

## 6. Evaluacion de la Matriz de Falsadores (FALSIFIER_MATRIX.md)

**Fortaleza:** Traduce las 8 predicciones del registry a una tabla legible con support/weakening/destruction conditions. Incluye "Anti-Inflation Rules" que explicitan que:
- Support condition no es evidencia sin preregistro
- Destruction condition debe trigger downgrade, no reinterpretacion
- Internal support no es validacion externa

**Debilidad:** Es esencialmente una vista en Markdown del JSON. No anade informacion nueva. El prompt v10 pedia "falsifier shapes" - la matriz los organiza pero no los profundiza. No hay:
- Rango de valores esperados para cada observable
- Protocolo de medicion detallado
- Criterio de exclusion de outliers
- Power analysis o tamano de muestra

**Veredicto:** Cumple como documento organizador. No cumple como preregistro ejecutable.

---

## 7. Evaluacion del Roadmap Ledger Actualizado

Estados actualizados en Seccion 13:

| Punto | Estado | Evaluacion Auditoria |
|---|---|---|
| Analizador de impacto deductivo | `[x]` | **Correcto** - script existe, funciona, output verificado |
| Guardia contra inflacion documental | `[x]` | **Correcto** - criterio OpenCode integrado |
| Criterio de tercero independiente | `[~]` | **Honesto** - scaffold existe pero faltan thresholds concretos |
| Registro de predicciones | `[~]` | **Honesto** - 8/13 predicciones del Paper 6 incluidas |
| Matriz de falsadores | `[~]` | **Honesto** - organiza pero no es preregistro ejecutable |
| Diccionario de medicion | `[ ]` | **Pendiente real** - no existe el archivo |
| Suite de controles negativos | `[ ]` | **Pendiente real** - no existe el archivo |
| Registro de rivales fuertes | `[ ]` | **Pendiente real** - no existe el archivo |
| Preregistro formal | `[ ]` | **Pendiente real** - no existe el archivo |
| Replicacion/adjudicacion externa | `[ ]` | **Pendiente real** - no existe el archivo |
| Riesgo de compilacion monolitica | `[ ]` | **Pendiente real** - no existe el archivo a pesar de que el prompt v10 lo pedia en Phase 4 |

**Evaluacion de honestidad del ledger:** Los estados `[~]` son apropiados. No hay `[x]` falsos. Codex no marco `[x]` en ningun punto que requiera ejecucion experimental. Eso demuestra disciplina epistemica.

---

## 8. Gaps y Brechas Identificados

### Gap 1: 5 Entregables del Prompt v10 Faltan (CRITICO)

El prompt v10 explictamente pedia:

| Entregable | Fase v10 | Estado Actual | Riesgo |
|---|---|---|---|
| `MONOLITHIC_COMPILE_RISK_AUDIT.md` | Phase 4 | **NO EXISTE** | El prompt lo pedia explictamente |
| `THEORY_CLAIM_LEDGER.md` | Phase 1 | **NO EXISTE** | Entregable clave del roadmap maestro |
| `NON_CLAIM_LEDGER_CANONICAL.md` | Phase 1 | **NO EXISTE** | Entregable clave del roadmap maestro |
| `PREREGISTRATION_TEMPLATE_v1.md` | Phase 6/roadmap | **NO EXISTE** | Necesario para congelar predicciones |
| `MEASUREMENT_DICTIONARY_v1.md` | Phase 1/roadmap | **NO EXISTE** | Necesario para traducir invariantes a observables |

**Diagnostico:** Codex priorizo los entregables tecnicos (script + JSON) sobre los documentales. Esto es comprensible dado que Codex es un agente de razonamiento/codigo, pero deja un hueco importante en la capa de arquitectura epistemica.

### Gap 2: Registry de Predicciones Incompleto (MEDIO)

Solo 8/13 predicciones del Paper 6 estan registradas. Las faltantes (PRED-01, PRED-06, PRED-07, PRED-08, PRED-10) son igualmente falsificables.

### Gap 3: Faltan Thresholds Numericos Congelados (MEDIO)

Ejemplo del registry:
> "framework_prediction": "The transition band is neither pass nor fail and occupies less than 10 percent of the scanned parameter space."

El "10 percent" aparece como valor, pero no esta marcado como `frozen_threshold` con un campo de `rationale` y `date_frozen`. Para ser preregistro de verdad, cada valor numerico necesita:
- `value`
- `rationale` (por que ese valor y no otro)
- `date_frozen` (cuando se congelo)
- `modification_log` (si alguien intenta cambiarlo despues)

### Gap 4: FCR_SPEC.md Carece de Seccion sobre Limites del Impact Analyzer (MENOR)

El spec menciona el analyzer (lineas 86-102) pero no documenta sus limitaciones con suficiente dureza. Deberia explicitar:
- No detecta dependencias semanticas implicitas
- No distingue entre dependencia critica y dependencia decorativa
- No evalua si un impacted entry puede ser salvado por reformulacion

### Gap 5: El Git Status es Sucio (MENOR pero OPERATIVO)

Hay 11 archivos modificados y 7 archivos nuevos sin commitear. El working tree no esta limpio. Si el sistema falla ahora, no hay un commit que capture el estado exacto. Ademas, Paper 5 fue modificado sobre el commit v9, creando ambiguedad historica.

---

## 9. Recomendaciones para la Siguiente Interaccion con Codex

### Prioridad A: Completar los Entregables Faltantes

**Tarea 1:** `MEASUREMENT_DICTIONARY_v1.md`
- Asignar cada uno de los 6 invariantes de Paper 5 a: observable concreto, estimador, umbral, fuente de error, control negativo.
- Ejemplo: `I_per` -> observable: "tasa de permanencia de clase bajo perturbacion"; estimador: "fraction de ventanas donde la clase se mantiene"; umbral: "> 0.95"; error: "falso positivo por inestabilidad del decoder".

**Tarea 2:** `PREREGISTRATION_TEMPLATE_v1.md`
- Template que obligue a llenar: N, alfa, power, metrica primaria, metrica secundaria, threshold de destruccion, exclusiones, seeds, plan de analisis.
- Vincularlo a cada entrada del `PREDICTION_REGISTRY_v1.json`.

**Tarea 3:** `MONOLITHIC_COMPILE_RISK_AUDIT.md`
- Aunque sea baja prioridad, el prompt v10 lo pidio. Documentar los 124 grupos de definiciones identicas repetidas y los 18 grupos de declaraciones newtheorem.

### Prioridad B: Completar el Prediction Registry

**Tarea 4:** Anadir PRED-01, PRED-06, PRED-07, PRED-08, PRED-10 al JSON.

**Tarea 5:** Agregar campos de `frozen_threshold` a cada prediccion que tenga valores numericos.

### Prioridad C: Crear Ledgers de Claims

**Tarea 6:** `THEORY_CLAIM_LEDGER.md` - listar todos los claims "fuertes" del corpus con su burden operacional, falsador asignado, y estado actual.

**Tarea 7:** `NON_CLAIM_LEDGER_CANONICAL.md` - listar todo lo que el corpus explicitamente NO reclama, como cortafuegos contra drift futuro.

### Prioridad D: Commit y Versionado

**Tarea 8:** Hacer commit del estado actual (incluyendo la segunda cirugia de Paper 5) con mensaje que documente tanto v9-repair como v10-implementation.

**Tarea 9:** Crear tag `fcr-v10-granular-1` para marcar este punto de control.

---

## 10. Evaluacion de la Implementacion en el Marco del Plan Madre (Roadmap)

### Cobertura del Roadmap por FCR v10

| Fase Roadmap | % Cubierto por v10 | Notas |
|---|---|---|
| Fase 0: Freeze semantico | 40% | Ledgers no creados; scaffold de predicciones existe |
| Fase 1: Diccionario de medicion | 0% | No existe archivo |
| Fase 2: Suite de controles negativos | 10% | Solo lista en JSON; no hay suite ejecutable |
| Fase 3: Preregistro de predicciones | 30% | Scaffold JSON existe; falta template y congelacion |
| Fase 4: Campana interna blindada | 0% | No ejecutada |
| Fase 5: Adjudicacion externa | 0% | No ejecutada |
| Fase 6: Actualizacion FCR por resultado | 10% | Impact analyzer habilita esto; aun no aplicado |

### Veredicto Global sobre v10 como Paso hacia la Teoria

**Lo que v10 SI logro:**
1. Agrego una herramienta de mantenimiento real (impact analyzer).
2. Tradujo predicciones de prosa a formato machine-readable.
3. Establecio un schema reutilizable para futuras predicciones.
4. Hardened la documentacion FCR contra overclaim.
5. Corrigio una falla residual en v9 que OpenCode no detecto.

**Lo que v10 NO logro:**
1. No creo los ledgers de claims/non-claims congelados.
2. No creo el diccionario de medicion.
3. No creo el template de preregistro.
4. No ejecuto ningun control negativo, ablation, o rival.
5. No produjo evidencia experimental nueva.

**Conclusion:** v10 avanzo la **infraestructura documental y registral** pero no avanzo la **carga experimental**. Es un paso util y necesario, pero no un paso que acerque al marco a la categoria de "teoria cientifica testeada". Eso requiere ejecucion, no solo arquitectura.

---

## 11. Puntuacion Directa (Direct Scoring, escala 1-5)

| Criterio | Puntuacion | Justificacion |
|---|---|---|
| Honestidad epistemica | 5 | Sin overclaims; limitation warnings presentes; estados `[~]` honestos |
| Calidad de codigo del analyzer | 4.5 | Bien estructurado, read-only, deterministico, exporta tests; falta unit tests incluidos |
| Calidad del prediction registry | 4 | Buen schema, condiciones claras; falta completitud y thresholds congelados |
| Calidad de la matriz de falsadores | 3.5 | Organiza pero no profundiza; es vista del JSON |
| Cobertura del plan v10 | 3 | 5 entregables faltantes de 9 fases |
| Integridad del corpus previo | 3.5 | Re-cirugia v9 valida pero sin commit explicito |
| Respeto al roadmap maestro | 4 | Scaffold avanza; pero diccionario de medicion y ledgers son criticos y faltan |
| Trazabilidad del trabajo | 4 | Todo esta documentado en FCR_V9_CODEX_AUDIT_REPAIR.md y roadmap |

**Promedio ponderado: 3.9/5** — Implementacion tecnicamente competente con una correccion matematica valiosa, pero con brechas documentales significativas que deben cerrarse antes de declarar v10 completo.

---

## 12. Mensaje para Codex (Next Prompt)

> Codex: El v10 granular 1 esta bien en su nucleo tecnico. El impact analyzer es robusto y el prediction registry es un avance arquitectonico real. Sin embargo, hay **5 entregables del plan v10 que no existen** y son criticos para la siguiente fase:
>
> 1. `MEASUREMENT_DICTIONARY_v1.md` — sin esto, las predicciones no tienen observables concretos.
> 2. `PREREGISTRATION_TEMPLATE_v1.md` — sin esto, el prediction registry no puede congelarse.
> 3. `THEORY_CLAIM_LEDGER.md` — sin esto, los claims fuertes del corpus no estan trazados.
> 4. `NON_CLAIM_LEDGER_CANONICAL.md` — sin esto, los non-claims pueden driftear en futuros papers.
> 5. `MONOLITHIC_COMPILE_RISK_AUDIT.md` — lo pediste tu mismo en Phase 4.
>
> Ademas, necesitamos:
> - Completar las 5 predicciones faltantes del Paper 6 en el registry.
> - Agregar campos `frozen_threshold` con valor, rationale, date_frozen, y modification_log a cada prediccion con umbral numerico.
> - Hacer commit de TODO el working tree actual (incluyendo la segunda cirugia de Paper 5) con un mensaje descriptivo.
>
> **Regla:** No avanzar a la Fase 11 (BPF-2/BPF-3) ni a ejecucion experimental hasta que estos 5 entregables existan y el prediction registry tenga thresholds congelados. La infraestructura documental es el cuello de botella actual, no la falta de teoremas.

---

*Fin de la Auditoria Profunda FCR v10*
