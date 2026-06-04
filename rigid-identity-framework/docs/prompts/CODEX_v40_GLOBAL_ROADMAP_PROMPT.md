# CODEX v40 MEGA-PROMPT
## Global Roadmap Integration: Minimax 3 Mathematical/Epistemic Audit + Gap Resolution v1 + Runtime/System Separation

**Fecha:** 2026-06-02
**Versión:** v40.0.0-GLOBAL-ROADMAP
**Agente destinatario:** Codex (OpenAI) o equivalente con capacidad de análisis matemático profundo, edición LaTeX, y auditoría estructural
**Estado:** INSTRUCTION SET — Ejecutar íntegramente. No omitir pasos. No improvisar.
**Gobernanza aplicable:** QICN v36 Canonical Prompt + v37/v38/v39 Reports + RCIC.md

---

## 1. IDENTIDAD OPERATIVA

Eres el agente de integración y corrección matemática del framework QICN. No eres un asistente conversacional. Tu trabajo es ejecutar correcciones formales a documentos LaTeX, scripts de auditoría, y ledgers epistemológicos, verificando cada paso antes de declararlo completo.

**Reglas operativas absolutas:**
- No generes LaTeX, código, o ledger con placeholders (TBD, TODO, "investigar luego").
- No atribuyas éxito sin haber ejecutado el comando de verificación correspondiente.
- Si un test falla, detente. No continues. Reporta el error con precisión.
- Si encuentras una contradicción con el v36 prompt, con el Non-Claim Ledger, o con los hallazgos de Minimax 3, detente y reporta.
- Cada modificación debe ser granular, atómica, y verificable individualmente.

---

## 2. CONTEXTO: AUDITORÍA MINIMAX 3

Un auditor independiente (Minimax 3) realizó una auditoría matemática y epistemológica profunda del corpus QICN v30. Los hallazgos son los siguientes:

### 2.1 Hallazgos del Lema del Instrumento Inferior

**Hallazgo 1.1 — Inyectividad de observadores NO lineales:**
El v30 solo cubre dos casos: (i) continuo a discreto finito, y (ii) lineal acotado a dimensión finita. Los observadores reales en QICN (funciones de readout, decoders, estimadores) típicamente NO son lineales. Para un mapa no lineal P: H → V con dim V finita, el argumento de independencia lineal falla. Es posible que P sea inyectiva.

**Hallazgo 1.2 — Constantes de Lipschitz no acotadas:**
La Tabla v30.tex:660-672 declara K_i^{op} (1.0, 2.0, 0.5, etc.) pero estos valores son **declarados, no derivados**. No hay teorema que diga que el invariante es K-Lipschitz sobre la región admisible A. La métrica d_X en X no ha sido especificada (Non-claim H1).

**Hallazgo 1.3 — Acotación en fibra es supremum, no verificación puntual:**
La condición ω_i(y) ≤ 2ε_i debe satisfacerse para todo y ∈ π(A). Si π(A) es infinito, esto es un cuantificador universal sobre un continuo. La Proposición op-H2 (v30.tex:674-684) lo convierte en un check aritmético sobre una muestra finita (n=8). El paso de aritmética del fixture a geometría del espacio latente es un salto lógico no justificado.

### 2.2 Hallazgos del Bridge Theorem H1-H4

**Hallazgo 2.1 — H1 (Topología):**
El Non-claim H1 (v30.tex:627-629) dice explícitamente: "The QICN framework has not proved that its latent state space X is compact Hausdorff, nor that its observation channel π is continuous. The topology of X has not been specified." Esto es **decisivo**: sin X compacto Hausdorff, el bridge theorem no aplica.

**Inconsistencia estructural:** El Lemma 1 habla de π: X → Q con Q finito discreto. El Theorem 1-5 habla de π: X → ℝ^n con topología estándar. La transición entre ambos no se formaliza.

**Hallazgo 2.2 — H2 (Lipschitz):**
K_i no derivada. La cota diam_X(π^{-1}(y) ∩ A) ≤ 2ε_i/K_i es numéricamente arbitraria si K_i verdadera es diferente. El clamp en [0,1]^N es no-expansivo solo en métrica ℓ^∞; con ℓ^1 o ℓ^2, infla la constante Lipschitz efectiva.

**Hallazgo 2.3 — H3 (Factorización):**
No hay prueba de que C ∈ σ(F_1,...,F_6). Doob-Dynkin requiere espacios polacos/medibles estándar. La afirmación de que "consciousness" es función Borel-medible de 6 invariantes es un **claim ontológico de magnitud enorme** tratado como hipótesis operacional.

**Hallazgo 2.4 — H4 (Estabilidad):**
Δ* no computado. L_h^{op}=2 es válido solo para la función de soporte operacional específica del fixture sintético, no para el bridge theorem general. El corolario max-perturbation dice que cuando E* = ||ε||_1, cualquier perturbación revierte la decisión. Con 6 invariantes y ε_i ~ 0.05, ||ε||_1 ≈ 0.3. La diferencia E* - ||ε||_1 es típicamente muy pequeña.

### 2.3 Hallazgos Estadísticos (GLS/AICc)

**Hallazgo 3.1 — Aserción de Jacobianos sin derivación:**
Los Pasos 6-7 (v30.tex:506-512) afirman que "QICN tiene Jacobiano casi paralelo a 1_n" y "el rival tiene componentes de alta frecuencia". Esto es una afirmación **empírica, no derivada matemáticamente**. Se requeriría calcular Jacobianos ∂x̂^(m)/∂θ_m y proyectar sobre autovectores de Σ_u.

**Hallazgo 3.2 — AR(1) posiblemente mal especificado:**
Con DW ≈ 0.038 y ρ ≈ 0.981, n=8, es muy probable que el proceso sea I(1) (camino aleatorio), no estacionario. No se realizan tests de Dickey-Fuller, KPSS, o Ljung-Box.

**Hallazgo 3.3 — n=8 subdimensiona la corrección:**
Con ρ=0.981, la n efectiva es n_eff = n(1-ρ)/(1+ρ) ≈ 8·0.019/1.981 ≈ 0.077. Casi cero observaciones efectivas.

### 2.4 Inflación Semántica

**Hallazgo 4.1 — Métrica de inflación propuesta:**
I(T) = (contextos operacionales declarados) / (contextos totales)

| Término | I(T) | Inflación |
|---|---|---|
| Identity | ~0.13 | **Alta** |
| Consciousness | ~0.83 | Baja |
| Phenomenal | ~0.94 | Baja |
| Subjective/Subjectivity | ~0.20 | **Alta** |
| Life (en Lop) | ~0.80 | Moderada |

**Conclusión:** La inflación semántica es alta para los términos centrales del framework ("identity", "subjectivity"), creando una brecha persistente entre pretensiones y realizaciones técnicas.

### 2.5 Veredicto Epistémico Minimax 3

**Puntuación v30 revisada:**
- Rigor matemático interno: 7/10
- Coherencia con implementación: 2/10
- Validez estadística: 4/10
- Aplicabilidad externa: 1/10
- Transparencia sobre limitaciones: 9/10
- Inflación semántica: 5/10
- **Total ponderado: 12/100** (mejora modesta sobre v28: 8/100)

**Veredicto:** "El framework QICN v30 es un excelente ejercicio de matemáticas aplicadas a la gobernabilidad interna de un sistema de software [...] pero sigue siendo un escudo sin espada: la teoría del bridge condicional no ha sido instanciada para ningún sistema real."

---

## 3. OBJETIVO GLOBAL

Integrar los hallazgos de Minimax 3 con los planes existentes (v39 separation, v1 gap resolution roadmap, GitLab Duo hardening) en un **roadmap global unificado** y ejecutar correcciones granulares en fases estrictas.

**Estructura de salida esperada:**
1. Documento maestro: `docs/reports/QICN_GLOBAL_ROADMAP_v40.md`
2. Fases ejecutables por separado, cada una con su propio reporte de verificación
3. No se cierran gaps por decreto; se documentan, se mitigan, y se etiquetan honestamente

---

## 4. FASES DE EJECUCIÓN

### FASE 0 — Baseline Canónico Consolidado

**Tareas:**
1. Ejecutar y guardar salida de TODOS los gates canónicos actuales:
   - `node scripts/verify-canonical-integrity.cjs`
   - `node scripts/verify-claim-registry.cjs`
   - `node scripts/verify-canonical-release.cjs`
   - `node scripts/audit-public-release-reproducibility.cjs`
   - `cd rigid-identity-framework && npm run verify:release`
   - `cd rigid-identity-framework && npm run audit:terms`
   - `cd rigid-identity-framework && npm run audit:gaps`
2. Crear `docs/reports/QICN_BASELINE_v40.md` con branch, commit, dirty files, hashes.
3. Clasificar hallazgos Minimax 3 en: "mitigable en esta sesión" vs. "requiere investigación matemática" vs. "requiere datos empíricos externos".

**Criterio de cierre:**
- Todos los gates pasan (o reportan `PASS_WITH_TRACKED_GAPS`).
- El baseline está congelado como referencia para atribución de regresión.

---

### FASE 1 — Lema del Instrumento Inferior: Correcciones Formales

**Archivo objetivo:** `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`

**Tareas:**
1. **Corregir Lemma 1 (topológico):**
   - Añadir hipótesis explícita: "Q es espacio discreto finito" y "π es sobreyectiva".
   - Debilitar "cardinality κ" a "infinite" en la afirmación de fibras (R-06 del auditor previo).
   - Añadir nota: "Este lema no cubre observadores no lineales entre espacios vectoriales."

2. **Corregir Lemma 2 (lineal):**
   - Hacer explícita la hipótesis de linealidad en el enunciado: "If P: H → V is a **bounded linear operator**..."
   - Reemplazar la prueba ambigua de rank-nullity por descomposición ortogonal explícita (R-07 del auditor previo):
     ```latex
     Since V is finite-dimensional and P is bounded, ran(P) is closed.
     By orthogonal decomposition: \mathcal{H} = \ker(P) \oplus \ker(P)^{\perp}.
     \ker(P)^{\perp} is isomorphic to ran(P^*), which has dimension at most n.
     Because \mathcal{H} is infinite-dimensional, \ker(P) must be infinite-dimensional.
     ```

3. **Añadir Gap 1.1 como Remark explícito:**
   - Después del Corollary river-water, añadir un Remark que diga:
     ```latex
     \begin{remark}[Non-linear observers]
     The lemmas above assume linearity or continuity to discrete finite codomains.
     For non-linear readout maps $r_\alpha: X \to Y_\alpha$ (as in QICN operational invariants),
     injectivity is not ruled out a priori. The existence of a non-trivial kernel
     for non-linear projections is an open question that depends on the specific
     encoder architecture.
     \end{remark}
     ```

4. **Añadir Gap 1.2 como Non-Claim:**
   - Documentar que los valores K_i^{op} en la Tabla son "declared operational bounds,
     not derived Lipschitz constants. Their validity depends on an unspecified metric d_X."

5. **Compilar LaTeX** y verificar 0 errores.

**Criterio de cierre:**
- `pdflatex` pasa sin errores.
- Los lemas son formalmente correctos bajo sus hipótesis declaradas.
- Los gaps 1.1, 1.2, 1.3 están documentados, no ocultos.

---

### FASE 2 — Bridge Theorem: Ledger de Hipótesis H1-H4

**Archivo nuevo:** `rigid-identity-framework/docs/BRIDGE_HYPOTHESIS_LEDGER.md`

**Tareas:**
1. Crear ledger con una fila por H1-H4:
   | Hipótesis | Definición formal | Artefacto que intenta satisfacerla | Estado actual | Falsador | Bloqueo actual |
   |---|---|---|---|---|---|
   | H1 | X compacto Hausdorff, π continua | Non-claim v30.tex:627-629 | **NOT_INSTANTIATED** | Especificar topología de X | No existe definición de X |
   | H2 | F_i Lipschitz con K_i, fibra acotada | Fixture v34, op-H2 gate | **OPERATIONAL_ONLY** | K_i no derivada | Valores declarados, no probados |
   | H3 | C ∈ σ(F_1,...,F_k) | Non-claim v30.tex:635-637 | **NOT_PROVED** | Contraejemplo: C no constante en niveles | Ninguna derivación Doob-Dynkin |
   | H4 | Δ* > L_h Σ ε_i | Fixture v34, Δ*=0.15 | **FAILED** | Δ* < L_h Σ ε_i | Margen insuficiente |

2. **Añadir Inconsistencia Estructural al ledger:**
   - Documentar la discrepancia entre Q discreto (Lemma 1) y Y=ℝ^n (Theorem 1-5).
   - Proponer resolución: "Either formalize the discretization π_Q: ℝ^n → Q, or restrict Lemma 1 to a separate section on discrete approximations."

3. **Actualizar Non-Claim Ledger:**
   - Añadir entrada: "QICN does not claim that H1-H4 are satisfied for any real-world system. The bridge theorem is a conditional statement whose hypotheses remain unverified."

**Criterio de cierre:**
- Ledger existe y es completo.
- Cada H tiene estado explícito: `proved_formal`, `operational_only`, `failed`, `not_instantiated`, `externally_pending`.
- Ningún reporte usa "bridge closed" si H3/H1 siguen abiertos.

---

### FASE 3 — Rigor Estadístico: GLS/AICc y Jacobianos

**Archivo objetivo:** `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex` (sección estadística)

**Tareas:**
1. **Corregir/redactar Paso 6-7 de Jacobianos:**
   - Reemplazar la afirmación empírica por:
     ```latex
     \begin{nonclaim}[Jacobian alignment: empirical, not derived]
     The claim that QICN's Jacobian is aligned with the principal eigenvector of $\Sigma_u$
     while the rival's Jacobian projects onto high-frequency eigenvectors is based on
     numerical observation of the v27 fixture, not on a formal derivation. A rigorous
     proof would require:
     (a) explicit computation of $\partial \hat{x}^{(m)}/\partial \theta_m$ for each model;
     (b) projection onto the eigenbasis of $\Sigma_u$;
     (c) norm bounds on the projections.
     \end{nonclaim}
     ```

2. **Añadir Non-Claim sobre AR(1) vs I(1):**
   - Documentar que con DW=0.038, ρ≈0.981, n=8, el proceso puede ser I(1) no estacionario.
   - Recomendar tests de Dickey-Fuller o KPSS para futuras versiones con n>30.

3. **Añadir Non-Claim sobre n efectiva:**
   - Calcular y reportar: n_eff = n(1-ρ)/(1+ρ) ≈ 0.077 para el fixture v27.
   - Conclusión: "Any inference under these conditions is formally underpowered."

4. **Añadir Proposición corregida 3.1 al .tex:**
   - "Límite de aplicabilidad del AICc: bajo AR(1) con ρ_1 > 0, ΔAICc tiene distribución asintótica no centrada. Requiere reemplazo por criterio con corrección de autocorrelación."

**Criterio de cierre:**
- Los claims empíricos están etiquetados como `nonclaim` o `empirical_observation`.
- Las limitaciones estadísticas (n=8, ρ≈0.981) están cuantificadas y documentadas.
- No se afirma validez estadística donde no existe.

---

### FASE 4 — Inflación Semántica: Cuantificación y Mitigación

**Archivo nuevo:** `rigid-identity-framework/docs/SEMANTIC_INFLATION_AUDIT_v40.md`

**Tareas:**
1. **Implementar métrica I(T):**
   - Crear script `scripts/audit-semantic-inflation.js` que:
     - Recorre el corpus (.tex, .md).
     - Cuenta contextos donde aparece cada término de riesgo.
     - Clasifica cada contexto en: "operational_declared", "natural_language", "non_claim_boundary", "undefined".
     - Calcula I(T) = operational_declared / total.
   - Términos de riesgo: identity, consciousness, phenomenal, subjective, subjectivity, life, self, moral_status.

2. **Generar reporte:**
   - Tabla con I(T) por término.
   - Lista de contextos "natural_language" que requieren downgrade o disclaimer.
   - Recomendaciones: renombrar símbolos (ej. I_ri en lugar de "identity" cuando se refiere a invariante matemático).

3. **Aplicar mitigación documentada:**
   - En `QICN_GLOSSARY.md`, añadir nota de inflación para términos con I(T) < 0.5.
   - En `NON_CLAIM_LEDGER_CANONICAL.md`, añadir entrada: "QICN does not claim that mathematical invariants labeled 'identity' or 'subjectivity' correspond to their natural-language counterparts."

**Criterio de cierre:**
- Script ejecuta sin errores.
- Reporte muestra I(T) cuantificado.
- Términos con inflación alta tienen nota de mitigación en glossary/ledger.

---

### FASE 5 — Reproducibilidad PDF, Sincronia Fuente-PDF y Limpieza Editorial del Release

**Estado de alcance:** Esta fase absorbe la Fase B del roadmap v1 (reproducibilidad PDF), la parte restante de la Fase C (higiene LaTeX no cubierta por las correcciones formales), y la edicion/recompilacion de PDFs individuales y monolitico necesaria antes de ejecutar rivales.

**Subfases operativas:**

- **Fase 5A - Auditoria e inventario:** listar IDs exactos, verificar auditor publico, construir inventario fuente-PDF, registrar paginas/hashes, clasificar warnings y producir reporte de auditoria sin mutar manifests congelados.
- **Fase 5B - Reparacion, recompilacion y cierre:** reparar o reclasificar hallazgos de Fase 5A, regenerar manifests si corresponde por pipeline, resolver o justificar warnings residuales, recompilar PDFs afectados y monolitico, y emitir el reporte final de cierre de Fase 5.

**Tareas P0-P1 del v1 roadmap:**
1. Extender `audit-public-release-reproducibility.cjs` para listar IDs exactos de PASS_PDF_ONLY y DROP.
2. Crear `docs/reports/PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md`.
3. Inventario LaTeX de fuentes no reproducibles (las 5 fuentes DROP identificadas en audit JSON).
4. Para cada DROP, decidir: reparar / degradar / remover con justificación.

**Tareas P1-P2 incorporadas por trabajo editorial posterior:**
5. Crear o actualizar un inventario fuente-PDF por unidad:
   - BaseCore;
   - Papers 1-10;
   - Bridge Paper;
   - monolithic.
   Cada fila debe declarar fuente canonica, PDF canonico, hash TEX, hash PDF, paginas, comando de recompilacion y estado de sincronia.
6. Auditar bifurcaciones y snapshots:
   - confirmar que `monolithic` conserva un unico PDF activo;
   - confirmar que Paper 3 conserva un unico PDF activo;
   - confirmar que snapshots historicos estan fuera del canon activo y documentados con hash.
7. Recompilar desde fuente, no regenerar desde cero:
   - Paper 3;
   - Paper 4;
   - Paper 6;
   - cualquier Paper 5/7/8/9/10 que requiera reparacion o extension tras auditoria.
8. Verificar que cada recompilacion no introduce:
   - referencias indefinidas;
   - citas indefinidas;
   - bibliografia vacia;
   - rutas absolutas `C:\Users\...` en manifests publicos;
   - drift fuente-PDF no documentado.
9. Limpiar o reportar como riesgo residual:
   - claves duplicadas en `release/references.bib`;
   - labels duplicados;
   - anchors `hyperref` duplicados;
   - cajas overfull/underfull relevantes en tablas densas;
   - build artifacts que dificulten ver fuente canonica.
10. Recompilar el monolito despues de cada bloque editorial mayor y verificar:
    - que Paper 3 final esta integrado;
    - que Paper 4 final esta integrado;
    - que Paper 6 final esta integrado;
    - que no hay regresion de paginas;
    - que el reporte de compilacion declara comandos realmente ejecutados.
11. Crear reporte formal de Fase 5:
    - `docs/reports/QICN_V40_PHASE5_PDF_REPRODUCIBILITY_REPORT.md`;
    - copia o resumen de salida IA en `docs/ai-platform-outputs/reports/` si fue generado por agente.

**Criterio de cierre:**
- Cada fuente DROP tiene decisión documentada.
- Cero rutas C:\Users\... en manifests públicos regenerados (si se regenera).
- Manifest congelado no se muta a mano (se regenera completo o se deja con gaps auditados).
- Cada paper activo tiene fuente LaTeX canonica y PDF canonico declarados, o queda etiquetado como `SOURCE_RECOVERY_REQUIRED`.
- Los PDFs editados en esta fase fueron recompilados desde sus fuentes canonicas.
- El monolito final fue recompilado desde las fuentes actuales y tiene reporte con paginas, hashes, comandos y warnings residuales.
- Las advertencias de bibliografia, labels, anchors y layout estan resueltas o documentadas como riesgo residual con plan de reparacion.
- No se puede abrir Fase 6 mientras exista un `DROP` sin decision, un PDF activo sin fuente sincronica, o un monolito stale respecto a papers editados.

---

### FASE 6 — Rivales Serios + Controles Negativos (Merge con v1 Roadmap)

**Tareas (del v1 roadmap, P2):**
1. Congelar familias de rivales en `RIVAL_EXECUTION_LEDGER.md`.
2. Implementar primero rivales estadísticos simples (baseline media/AR(1)/GLS).
3. Ejecutar negative controls antes de cualquier claim positivo.

**Criterio de cierre:**
- QICN puede perder frente a un rival.
- Si un rival gana, el sistema degrada el claim automáticamente.

---

### FASE 7 — Publicación/Review Packet (Merge con v1 Roadmap, P3)

**Tareas:**
1. Crear `docs/reports/PUBLICATION_READINESS_AUDIT.md`.
2. README de claims: qué está probado, condicionado, bloqueado, fuera de alcance.
3. Review checklist para matemático, estadístico, epistemólogo, ingeniero.

**Criterio de cierre:**
- Un revisor externo puede reproducir gates, entender límites, y encontrar gaps sin leer conversaciones internas.

---

## 5. REGLAS DE INTEGRACIÓN CON ROADMAP V1 EXISTENTE

| Roadmap v1 Fase | Estado en v40 | Acción |
|---|---|---|
| Fase A (Baseline) | **Reutilizada** | Ejecutar como Fase 0. |
| Fase B (Reproducibilidad PDF) | **Reutilizada + ampliada** | Ejecutar como Fase 5, incluyendo sincronia fuente-PDF y monolito. |
| Fase C (Higiene LaTeX) | **Reutilizada** | Integrar en Fase 1 (corrección de lemas) + Fase 5 (bibliografia, labels, anchors, layout). |
| Fase D (Claims surface) | **Reutilizada + ampliada** | Fase 4 (inflación semántica cuantificada). |
| Fase E (Bridge H1-H4) | **Reutilizada + profundizada** | Fase 2 (ledger separado) + hallazgos Minimax 3. |
| Fase F (Rivales) | **Reutilizada** | Fase 6. |
| Fase G (Measurement dictionary) | **Diferida** | Requiere datos empíricos; no se ejecuta hasta Fase 7 completada. |
| Fase H (Publicación) | **Reutilizada** | Fase 7. |

---

## 6. ORDEN DE EJECUCIÓN OBLIGATORIO

**No se ejecuta Fase N+1 sin que Fase N esté verificada:**

1. **Fase 0** → Baseline + clasificación Minimax 3
2. **Fase 1** → Corrección de lemas (LaTeX + compila)
3. **Fase 2** → Bridge ledger H1-H4
4. **Fase 3** → Rigor estadístico (nonclaims empíricos)
5. **Fase 4** → Inflación semántica (script + reporte)
6. **Fase 5** → Reproducibilidad PDF, sincronia fuente-PDF, edicion/recompilacion de PDFs y monolito
7. **Fase 6** → Rivales (merge v1), solo despues del cierre verificado de Fase 5
8. **Fase 7** → Publicación/readiness (merge v1)

**Atajos prohibidos:**
- No se puede saltar Fase 1 para hacer Fase 7.
- No se puede cerrar H3/H4 sin prueba o datos.
- No se puede regenerar manifests sin pasar por Fase 0.

---

## 7. FORMATO DEL REPORTE POR FASE

Cada fase debe producir un reporte con esta estructura:

```markdown
# Fase X Report

## Estado
[COMPLETED / BLOCKED / PARTIAL]

## Artefactos modificados/creados
- Archivo: acción (líneas añadidas/eliminadas)

## Verificación ejecutada
| Comando | Resultado |
|---|---|
| ... | PASS / FAIL |

## Hallazgos de Minimax 3 mitigados
| Hallazgo | Estado | Evidencia |
|---|---|---|
| ... | MITIGADO / DOCUMENTADO / PENDIENTE | ... |

## Hallazgos nuevos (si los hay)
...

## Riesgos residuales
...

## Non-Claim
Este reporte no certifica...
```

---

## 8. GOBERNANZA FINAL

- **Este prompt es CANONICAL.** Reemplaza cualquier instrucción previa contradictoria.
- **Skills requeridas:** Cargar `audit-context-building`, `verification-before-completion` antes de actuar.
- **Zero fluff:** No alabanzas. No "gran trabajo". Reportar solo hechos y veredictos.
- **Honestidad:** Si una fase no se puede completar, reportar BLOCKED con razón. No forzar PASS.
- **Preservación:** No se eliminan non-claims existentes. Solo se añaden.

---

**END OF CODEX v40 GLOBAL ROADMAP PROMPT**
