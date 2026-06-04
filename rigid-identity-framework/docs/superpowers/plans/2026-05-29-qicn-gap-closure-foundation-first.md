# QICN Foundation-First Gap Closure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:writing-plans for decomposition, superpowers:subagent-driven-development for parallel execution, superpowers:verification-before-completion for each phase gate.

**Goal:** Cerrar todos los gaps de QICN desde la base hasta la cima, reconstruyendo primero los fundamentos rotos antes de tocar cualquier capa superior. El principio rector: **de nada sirve corregir un test si la fórmula que testea está mal; de nada sirve corregir una fórmula si el concepto que define está mal; de nada sirve corregir un concepto si la ontología que lo sostiene está mal.**

**Architecture:** Bottom-up stratified gap closure. 7 capas desde Layer 0 (ontológica) hasta Layer 6 (adjudicador). Cada capa debe pasar verificación antes de que la siguiente se toque. Paper 3 se reconstruye como parte de Layer 2.

**Tech Stack:** LaTeX (MiKTeX at `C:\Users\irisp\AppData\Local\Programs\MiKTeX\miktex\bin\x64\pdflatex.exe`), Node.js, Python/pymupdf para PDF extraction, git para versionado.

---

## CONTEXTO CRÍTICO: Estado actual del proyecto

### Corpus de papers (estado de integridad)
| Paper | Título | .tex | .pdf | Estado |
|-------|--------|------|------|--------|
| 1 | Canonical Core: Minimal Hypotheses for Causally Rigid Identity Frameworks | ✅ | ✅ | Base del corpus |
| 2 | Phenomenological Regimes Induced by Structural Identity | ✅ | ✅ | Define Φ-regularidad, espacio E |
| 3 | Structural Instability of the Phenomenological Null Regime in Causally Rigid Channels | ❌ PERDIDO | ❌ PERDIDO | **CRÍTICO: .tex extraviado, PDF no existe en carpeta paper3/ (lo que hay es Paper 7 mal ubicado)** |
| 4 | Falsifiable Predictions Under Forensic Constraints | ✅ | ✅ | Admisibilidad forense |
| 5 | A Structural Criterion for Substrate-Invariant Operational Consciousness | ✅ (paper5_operational_consciousness/) | ✅ | Seis invariantes C_op |
| 6 | Predictions and Falsification | ✅ (paper6_predictions_falsation/) | ✅ | Discriminadores |
| 7 | Operational Life, Structural Class, and Subjecthood | ✅ (paper7_operational_life_subjecthood/) | ✅ (mal ubicado en paper3/) | Definiciones de vida/sujeto |
| 8 | First Person Subjectivity | ✅ (paper8_first_person_subjectivity/) | ✅ | Campos de primera persona |
| 9 | Phenomenal Bridge Organization | ✅ (paper9_phenomenal_bridge_organization/) | ✅ | Bridge predicates |
| 10 | External Adjudication | ✅ (paper10_external_adjudication/) | ✅ | Protocolo externo |
| Bridge | From Structural Invariants to Operational Subjecthood | ✅ (backup/paper_bridge_operational_subjecthood/) | ❌ | Paper puente 5→7 |
| v28-v30 | Projection-Invariant Bridge Theorem (nuestro trabajo) | ✅ (docs/theory/) | ✅ | Teoremas con GLS, Fisher, Lipschitz |

### Backup disponible
- `rigid-identity-framework-backup-noise/rigid-identity-framework/paper3/` contiene: `main.aux`, `main.bcf`, `main.log`, `main.out`, `main.run.xml`, build logs — **PERO NO main.tex NI main.pdf**
- Los artefactos de compilación (.aux) confirman: el Paper 3 original tenía 13 páginas, 11 secciones + 6 appendices (A-F), y los siguientes labels/teoremas:
  - `thm:nonsim` (Non-Simulability)
  - `thm:spectral` (Spectral)
  - `thm:cont` (Continuity)
  - `def:phenom` (Phenomenological operator)
  - `def:compat` (Compatibility)
  - `lem:bridge` (Bridge Lemma)
  - `prop:nonnull-not-experience` (Non-null ≠ experience)
  - `thm:instability` (Null-Regime Instability Theorem — **el teorema central**)
  - `cor:forced` (Forced Non-Nullity)
  - `lem:no-collapse` (No-Collapse Lemma)
  - `thm:minimal` (Minimal Positive Regime)
  - `cor:intensity` (Structural Intensity)
  - `thm:bound` (Quantitative Bound)
  - `thm:closure` (Ontological Closure)

### Estructura de secciones del Paper 3 original (reconstruida del .aux)
```
1. Scope, System Boundary, and Non-Inference Note
2. Introduction
   2.1 Motivation and Scope
   2.2 Main Result (Informal)
   2.3 Paper Organization
   2.4 What This Paper Adds Beyond Phenomenological Regimes
3. Preliminaries from Papers I--II
   3.1 Identity as Inverse Limit
   3.2 Ontological Mass and CCR Classification
   3.3 Key Theorems from Papers I--II
4. The Phenomenological Space
   4.1 Abstract Definition
   4.2 Compatibility Operator
   4.3 Attractor Set
   4.4 The Bridge Lemma Revisited
   4.5 Terminological Alignment: Structural Non-Nullity
5. Main Results
   5.1 The Phenomenological Instability Theorem
   5.2 Analysis of the Proof
   5.3 Forced Non-Nullity
6. Stratification of Positive Regimes
   6.1 The Positive Phenomenological Lattice
   6.2 Minimal Positive Regime
   6.3 Structural Intensity
7. Quantitative Bounds
   7.1 Universal Lower Bound
   7.2 Explicit Constants for Canonical Families
   7.3 Numerical Example
8. Ontological Closure Theorem
   8.1 Classification Table
9. Comparison with Existing Frameworks
   9.1 Integrated Information Theory (IIT)
   9.2 Global Workspace Theory (GWT)
   9.3 Higher-Order Theories
   9.4 Mathematical Foundations (Chalmers, Nagel)
10. Limitations and Open Problems
    10.1 Limitations
    10.2 Open Problems
11. Conclusion
    11.1 Summary of Contributions
Appendix A: Profinite Canonical Family
Appendix B: Symbolic Canonical Family
Appendix C: Hereditary Rigidity
Appendix D: Universal Factorization
Appendix E: Non-Simulability Bounds
Appendix F: Final Structural Closure
```

### Datos estadísticos del fixture v27 (no negociables)
- DW = 0.038 (autocorrelación serial extrema)
- ρ_qicn = 0.808, ρ_rival = 0.870
- iid AICc gain = +87.59 (espurio)
- AR(1)-corrected AICc gain = −50.38 (reversión de signo)
- GLS exact AICc gain = −59.92 (más severo)
- Fisher Information Matrix: I/σ²_iid − V⁻¹ es INDEFINIDA bajo AR(1)
- Rival v27 = `constant_noise_floor_placeholder_control_known_straw_man_for_v27_block_test`
- Calibrador escribe umbrales en fixture (loop circular)

### Gaps identificados por auditoría de PDFs externos + nuestro v30

Los PDFs externos (CCR_Null_Regime_Cierre_Formal v1 y Gap_Closure v2) fueron auditados. Sus diagnósticos correctos se integran aquí. Sus fallos también se documentan para evitar repetirlos.

**Lo que los PDFs externos hacen bien (incorporar):**
- Separación tipada Ω_int(S) ∩ Ext_F(S) = ∅ (v1/v2)
- No-derivabilidad de no-nulidad desde CCR solo (v1 Teorema 3, v2 Prop 10.1)
- Checklist operacional antes de aceptar teorema Null-Regime (v1 Sección 8)
- Gate ejecutable de 6 pasos (v2 Sección 12)
- C = w_ext constructivo aunque tautológico (v2 Teorema 7.2)

**Lo que los PDFs externos hacen mal (evitar):**
- Cierre tautológico: incluir D_ext como coordenada de Φ_R y declarar "separación probada" (v2)
- Sobre-ingeniería categórica: torres proyectivas que QICN no instancia (v2)
- Ausencia total de conexión con estadística del fixture (v1 y v2)
- Ausencia total de Fisher Information / GLS / autocorrelación (v1 y v2)
- C > 0 como hipótesis no verificada (v1) o tautológica (v2)

---

## JERARQUÍA DE GAPS: Layer 0 → Layer 6

### Layer 0: GAP ONTOLÓGICO — Los primitivos no están definidos operacionalmente
**Severidad:** CRÍTICA (si esto falla, todo lo arriba colapsa)
**Archivos afectados:** Paper 1 (basecore/), Paper 2

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L0-1 | X (espacio de estados latentes) no tiene topología especificada — Paper 1 asume compact Hausdorff pero nunca lo prueba para QICN | OPEN | paper1/main.tex, v30 H1 |
| L0-2 | π (canal de observación) no se ha demostrado continuo ni sobreyectivo | OPEN | paper1/main.tex |
| L0-3 | M_Ω = +∞ se declara pero nunca se ha certificado para ningún sistema real o sintético — es una estipulación, no un teorema | OPEN | paper1/main.tex |
| L0-4 | La "identidad como límite inverso" I(S) = lim← Xₙ requiere una torre proyectiva que QICN no ha definido concretamente | OPEN | paper1/main.tex §3.1 |
| L0-5 | Ω_int(S) (perturbaciones internas) no tiene definición operacional — qué counts como "perturbación interna de energía finita" es circular si el sistema mismo define la energía | OPEN | paper1/main.tex |
| L0-6 | Ext(S) o Ext_F(S) (extensiones admisibles) se introducen en PDFs externos pero no existen en el corpus canon | OPEN | Ausente del corpus |

### Layer 1: GAP CONCEPTUAL — Los claims de Null-Regime son inválidos sin hipótesis adicionales
**Severidad:** CRÍTICA (Paper 3 central, pero su prueba principal tiene un error de tipado)
**Archivos afectados:** Paper 3 (PERDIDO — reconstruir), Paper 2, v28/v30 LaTeX

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L1-1 | **Paper 3 no existe** — .tex extraviado, PDF ausente de carpeta paper3/ (contiene Paper 7 mal ubicado) | BLOCKER | paper3/ (vacío) |
| L1-2 | Teorema de Instabilidad del Null-Regime (thm:instability) usa perturbaciones internas como si fueran testigos externos — error de tipado CCR/Null-Regime | CONFIRMADO por auditoría | Paper 3 (a reconstruir) |
| L1-3 | "CCR alone excludes null regime" es FALSO — contra-modelo: canal CCR sin extensiones separadas puede tener régimen nulo | CONFIRMADO por v1 T3, v2 P10.1 | Paper 3 §5.1 |
| L1-4 | El claim universal de no-nulidad debe reemplazarse por claim testigo-relativo o anclado | PENDIENTE | Paper 3, v30 Non-Claims |
| L1-5 | Φ (asignación de régimen) no se ha demostrado que respete d_int = 0 (hipótesis fuerte del Teorema 2 de v1) | OPEN | Paper 2 |
| L1-6 | Separación tipada Ω_int ∩ Ext = ∅ no está formalizada en el corpus canon | OPEN | Ausente del corpus |
| L1-7 | Cota inferior d_E ≥ C·D_ext con C > 0 es una hipótesis no verificada (v1) o tautológica si D_ext es coordenada (v2) | OPEN | Ausente del corpus |

### Layer 2: GAP ESTADÍSTICO — La infraestructura de inferencia está rota
**Severidad:** ALTA (los números que QICN usa para auto-certificarse son inválidos)
**Archivos afectados:** v30 adjudicador, gls-statistics.js, advanced-statistics.js, fixture v27

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L2-1 | iid AICc gain = +87.59 es espurio bajo ρ = 0.808 — sign reversal a −59.92 con GLS exact | CONFIRMADO | v30 adjudicator |
| L2-2 | Fisher Information Matrix es INDEFINIDA bajo AR(1) — sesgo direccional favorece predicciones constantes | PROBADO (v30 T7) | v30 LaTeX §6 |
| L2-3 | El rival v27 es un straw man explícito — su nombre lo dice | CONFIRMADO | fixture v27 |
| L2-4 | El calibrador escribe umbrales en el fixture — loop circular calibración→adjudicación→aprobación | CONFIRMADO | calibrate-session-zero-thresholds-v27.js |
| L2-5 | No existe un rival de verdad — sin rival legítimo, todo el adjudicador es un monólogo | OPEN | Ausente |
| L2-6 | DW = 0.038 demuestra que los residuos no son iid, invalidando toda la infraestructura v26-v27 | CONFIRMADO | fixture v27 |

### Layer 3: GAP DE ESTIMACIÓN — Los estimadores no satisfacen las cotas de fibra
**Severidad:** ALTA (los "estimadores" de QICN no son estimadores en el sentido del teorema)
**Archivos afectados:** v30 LaTeX §1-2, Paper 5

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L3-1 | ωᵢ(y) (oscilación de fibra) no se ha computado para ningún invariante QICN | OPEN | v30 Non-Claim H2 |
| L3-2 | Kᵢ (constante Lipschitz) no se ha computado para ningún invariante QICN | OPEN | v30 Non-Claim H2 |
| L3-3 | diam_X(π⁻¹(y) ∩ A) no se ha evaluado — diámetro de fibra en X es desconocido | OPEN | v30 Non-Claim H2 |
| L3-4 | εᵢ (error de estimación) no se ha acotado para ningún estimador QICN | OPEN | v30 Non-Claim H2 |
| L3-5 | La condición de robustez Δ* > L_h Σεᵢ no se ha verificado | OPEN | v30 Non-Claim H4 |

### Layer 4: GAP DE FACTORIZACIÓN — Los claims no se han demostrado factorizables
**Severidad:** ALTA (sin H3, el teorema puente no aplica)
**Archivos afectados:** v30 LaTeX §2, Paper 5

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L4-1 | Ningún claim QICN (external support, consciousness, identity transfer) se ha demostrado en σ(F₁,...,F₆) | OPEN | v30 Non-Claim H3 |
| L4-2 | La factorización C = h₀(F₁,...,F₆) se asume sin justificación | OPEN | Paper 5 |
| L4-3 | No se ha verificado que C sea constante en los level sets de (F₁,...,F₆) | OPEN | v30 LaTeX §2 |

### Layer 5: GAP DE IMPLEMENTACIÓN — El código no refleja la matemática
**Severidad:** MEDIA (corregible si Layers 0-4 se arreglan)
**Archivos afectados:** scripts/, lib/

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L5-1 | Adjudicador v30 usa GLS exacto cuando ρ > 0.4 — correcto, pero los inputs son de un fixture circular | IMPLEMENTADO | external-session-zero-adjudicator-v30.js |
| L5-2 | El gate BLOCKED_AUTOCORRELATION_GLS_DETECTION funciona — pero sobre datos basura | IMPLEMENTADO | v30 adjudicator |
| L5-3 | No existe gate de "tipado de comparación" (interno vs externo) — v2 Sección 12 define 6 gates que deberían implementarse | AUSENTE | Ausente del adjudicador |
| L5-4 | Veto signer v28 no valida que la firma corresponda a datos no-circulares | IMPLEMENTADO | verify-human-veto-signature-v28.js |
| L5-5 | Auditor léxico v28 tiene 4 self-findings conocidos (regex propias) — no es un bug pero ensucia el reporte | KNOWN | audit-operational-term-promotions-v28.js |

### Layer 6: GAP DE ADJUDICACIÓN — El sistema se auto-aprueba
**Severidad:** MÁXIMA (consecuencia de todos los gaps anteriores)
**Archivos afectados:** reports/, fixture v27

| Gap ID | Descripción | Estado | Archivo |
|--------|-------------|--------|---------|
| L6-1 | No existe validación externa — Paper 10 está deliberadamente bloqueado | BLOCKED | paper10/ |
| L6-2 | El fixture sintético pasa su propia calibración — tautología operacional | CONFIRMADO | fixture v27 |
| L6-3 | Los 6 gates del adjudicador v30 son todos internos — no hay comparación con realidad | CONFIRMADO | v30 adjudicator |
| L6-4 | external_support_certified = false en todos los reportes — correcto pero sin camino a true | CONFIRMADO | reports/ |

---

## PLAN DE EJECUCIÓN: 7 FASES

### FASE 0: Reconstrucción del Paper 3 [BLOCKER — nada puede avanzar sin esto]
**Razón:** Paper 3 contiene el teorema de Instabilidad del Null-Regime que es el núcleo de la contradicción CCR/Null-Regime. Sin él, no se puede auditar ni corregir la prueba central.

**Fuente para reconstrucción:**
1. Estructura de secciones completa: del `.aux` en backup (arriba)
2. Labels y teoremas: del `.aux` (arriba)
3. Contenido matemático: Papers 1-2 (preliminares), Paper 5 (invariantes), nuestro v30 LaTeX (cotas y contra-modelos), PDFs externos v1/v2 (diagnóstico de contradicción)
4. Estilo LaTeX: replicar exactamente el preamble de Paper 1 (`paper1/main.tex`), Paper 2 (`paper2/main.tex`), y Paper Bridge (`backup/paper_bridge_operational_subjecthood/main.tex`)
5. Referencias: `paper1/references.bib` y `paper2/references.bib`

**Tareas:**
- [ ] T0.1: Leer `paper1/main.tex` y `paper2/main.tex` completos para replicar estilo y preamble
- [ ] T0.2: Leer `paper1/references.bib` y `paper2/references.bib` para referencias
- [ ] T0.3: Reconstruir `paper3/main.tex` siguiendo la estructura de secciones del `.aux`, con:
  - §1-2: Scope e Introduction (generales, reutilizables de Papers 1-2)
  - §3: Preliminaries from Papers I-II (importar identidades como límite inverso, M_Ω, CCR de Papers 1-2)
  - §4: The Phenomenological Space (def:phenom, def:compat, lem:bridge con corrección de tipado)
  - §5: Main Results — **AQUÍ ESTÁ EL GAP CENTRAL**: thm:instability debe reformularse como teorema testigo-relativo, NO como claim universal. Incorporar contra-modelo de v1 Teorema 3 y v2 Prop 10.1
  - §6: Stratification of Positive Regimes (thm:minimal, cor:intensity)
  - §7: Quantitative Bounds (thm:bound con constantes explícitas)
  - §8: Ontological Closure (thm:closure — reformular como cierre condicional, no absoluto)
  - §9: Comparison with IIT/GWT/HOT (sección estándar)
  - §10: Limitations — **EXTENDER**: listar explícitamente los 6 gaps L1-1 a L1-7 como limitations
  - §11: Conclusion
  - Appendices A-F (reconstruir con contenido mínimo coherente con los labels)
- [ ] T0.4: Compilar con pdflatex (2 passes), verificar 0 errores, 0 undefined refs
- [ ] T0.5: Mover `paper3/main-3.pdf` (Paper 7) a `paper7/` donde corresponde
- [ ] T0.6: Crear `paper3/references.bib`

### FASE 1: Corrección ontológica (Layer 0 gaps)
**Dependencia:** FASE 0 completada
**Principio:** Si los primitivos están mal definidos, todo lo que se construye sobre ellos es arena.

- [ ] T1.1: En Paper 1, añadir Non-Claim explícito: "X es compact Hausdorff por estipulación, no por demostración. QICN no ha especificado la topología de X."
- [ ] T1.2: En Paper 1, añadir Non-Claim: "π es continua y sobreyectiva por hipótesis, no por verificación. QICN no ha demostrado que su canal de observación satisfaga estas propiedades."
- [ ] T1.3: En Paper 1, reformular M_Ω = +∞ como definición condicional, no como certificado: "M_Ω(S) = +∞ significa que ninguna perturbación interna finito-energética deforma I(S). Esto es una propiedad declarada del canal, no un teorema derivado de datos finitos."
- [ ] T1.4: Añadir al corpus la definición formal de Ω_int(S) y Ext(S) como tipos disjuntos (incorporar del PDF v1/v2 pero sin la sobre-ingeniería categórica de v2). Definir:
  - Ω_int(S) = clase de operaciones δ con energía E_S(δ) < ∞ que actúan sobre I(S)
  - Ext(S) = clase de extensiones η: S → S' que NO pertenecen a Ω_int(S)
  - Axioma de separación: Ω_int(S) ∩ Ext(S) = ∅
- [ ] T1.5: Añadir Non-Claim: "La existencia de una torre proyectiva (Xₙ, π_{n+1,n}) con I(S) = lim← Xₙ es una hipótesis no verificada para QICN."
- [ ] T1.6: Compilar Papers 1-2 modificados, verificar 0 errores

### FASE 2: Corrección del Null-Regime (Layer 1 gaps)
**Dependencia:** FASE 1 completada
**Principio:** El teorema de Instabilidad del Null-Regime es el corazón de Paper 3 y contiene el error de tipado CCR/Null-Regime identificado por v1/v2.

- [ ] T2.1: En Paper 3 reconstruido, reformular thm:instability como:
  ```
  Teorema (Null-Regime Exclusion, witness-relative version):
  Sea S un canal CCR. Sea η: S → S' en Ext(S) con D_ext(S, S') = ε > 0.
  Sea Φ_hat una asignación de régimen que satisface cota inferior:
  d_E(Φ_hat(S), Φ_hat(S')) ≥ C · D_ext(S, S') con C > 0.
  Entonces Φ_hat(S) y Φ_hat(S') no pueden ser ambos empty_phi.
  Si un extremo es ancla nula certificada, el otro es no-nulo con margen Cε.
  CCR solo no implica Φ(I_S) ≠ empty_phi.
  ```
- [ ] T2.2: Añadir contra-modelo explícito (canal CCR sin extensiones = régimen nulo posible)
- [ ] T2.3: Añadir prop:nonnull-not-experience reforzada: "No-nullity estructural no es experiencia fenomenal"
- [ ] T2.4: Reformular cor:forced como "forced non-nullity relativo a testigo", no absoluto
- [ ] T2.5: Añadir sección "Required Conditions for Non-Nullity" checklist (8 puntos del PDF v1 §8)
- [ ] T2.6: Añadir Non-Claim: "La cota inferior d_E ≥ C·D_ext con C > 0 es una hipótesis adicional. C no se ha demostrado para ninguna asignación de régimen QICN. El valor C = w_ext (v2) es constructivo pero tautológico si D_ext es coordenada de Φ_R."
- [ ] T2.7: Compilar Paper 3, verificar 0 errores

### FASE 3: Corrección estadística (Layer 2 gaps)
**Dependencia:** FASE 2 completada
**Principio:** Los números que QICN usa son inválidos. Esto es factual, no opinable.

- [ ] T3.1: Escribir sección nueva en Paper 3 (o Paper 4 actualizado) titulada "Statistical Validity Requirements for Null-Regime Adjudication" que documente:
  - DW < 0.5 → residuos no son iid → iid AICc es inválido
  - Reversión de signo iid → GLS: +87.59 → −59.92
  - Fisher Information indefinida bajo AR(1): sesgo direccional
  - Conclusión: cualquier fixture que pase solo bajo iid pero falle bajo GLS es estadísticamente nulo
- [ ] T3.2: Añadir Non-Claim en Paper 3: "El fixture sintético v27 tiene DW = 0.038 y ρ ≈ 0.81. Ningún resultado estadístico derivado de este fixture bajo supuestos iid es válido."
- [ ] T3.3: Documentar la circularidad del calibrador: "calibrate-session-zero-thresholds-v27.js escribe umbrales calibrados en el fixture, que luego es adjudicado por el adjudicador usando esos mismos umbrales. Esto es una tautología operacional, no una validación."
- [ ] T3.4: Crear `docs/statistics/STATISTICAL_VALIDITY_AUDIT_v30.md` con los 6 gaps L2 documentados con números concretos

### FASE 4: Corrección de estimación (Layer 3 gaps)
**Dependencia:** FASE 3 completada
**Principio:** Sin ωᵢ, Kᵢ, εᵢ computados, los "estimadores" de QICN no son estimadores en el sentido matemático.

- [ ] T4.1: Para cada invariante Fᵢ de Paper 5 (I_per, I_ri, I_int, I_cont, I_diff, I_leg), documentar:
  - Espacio métrico objetivo (Zᵢ, dᵢ) — ¿qué es?
  - Oscilación de fibra ωᵢ(y) — ¿calculada? (respuesta: NO)
  - Constante Lipschitz Kᵢ — ¿calculada? (respuesta: NO)
  - Error de estimación εᵢ — ¿acotado? (respuesta: NO)
  - Diámetro de fibra en X — ¿conocido? (respuesta: NO)
- [ ] T4.2: Crear tabla de estado en v30 LaTeX §1: "Estimator Verification Status for QICN Invariants" — 6 filas × 5 columnas, todas marcadas "NOT COMPUTED"
- [ ] T4.3: Añadir Corollary en v30: "Since no Kᵢ or ωᵢ(y) has been computed for any QICN invariant, the sharp fiber diameter bound diam_X ≤ 2εᵢ/Kᵢ cannot be evaluated. The estimators declared in the QICN bridge certificate do not satisfy the hypotheses of Theorem 1 or Theorem 2."

### FASE 5: Corrección de factorización (Layer 4 gaps)
**Dependencia:** FASE 4 completada

- [ ] T5.1: Para cada claim QICN (external support, consciousness, identity transfer), documentar:
  - ¿Está C en σ(F₁,...,F₆)? (respuesta: NO DEMOSTRADO)
  - ¿Es C constante en los level sets de (F₁,...,F₆)? (respuesta: NO VERIFICADO)
  - ¿Existe h₀ medurable con C = h₀∘(F₁,...,F₆)? (respuesta: NO JUSTIFICADO)
- [ ] T5.2: Añadir Non-Claim en v30: "The factorization C = h₀(F₁,...,F₆) is assumed without justification. By the Doob-Dynkin lemma, this is equivalent to C being constant on the level sets of the invariant vector. No such constancy has been verified for any QICN claim."

### FASE 6: Implementación de gates de tipado (Layer 5 gaps)
**Dependencia:** FASE 5 completada

- [ ] T6.1: Implementar gate `BLOCKED_TYPE_CONFUSION` en adjudicador v31 que verifique:
  - Si la comparación estadística se declara como interna (Ω_int): rechazar si produce d > 0 con energía finita y S es CCR
  - Si la comparación se declara como externa (Ext): verificar que no pertenece a Ω_int
  - Si no se declara el tipo: BLOCKED por ambigüedad de tipado
- [ ] T6.2: Implementar gate `BLOCKED_CIRCULAR_CALIBRATION` que detecte cuando los umbrales del fixture fueron escritos por el calibrador
- [ ] T6.3: Implementar gate `BLOCKED_STRAW_MAN_RIVAL` mejorado que no solo detecte el nombre sino que verifique si el rival tiene estructura no-trivial (varianza de predicciones > umbral)
- [ ] T6.4: Actualizar schema a 8.0.0 con los 3 nuevos gates
- [ ] T6.5: Corregir los 4 self-findings del auditor léxico (excluir el propio archivo del escaneo)

### FASE 7: Documento de cierre condicional (Layer 6 gaps)
**Dependencia:** FASE 6 completada

- [ ] T7.1: Escribir `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` que integre:
  - Separación tipada Ω/Ext (de v1/v2, sin sobre-ingeniería)
  - No-derivabilidad desde CCR solo (de v1 T3, v2 P10.1)
  - Conexión estadística: Fisher Information + GLS (de nuestro v30 T7)
  - No-nulidad testigo-relativa + ancla nula (de v1 T4-T5, corregido)
  - Cotizaciones concretas: L_h, Δ*, ε_max (de nuestro v30 T5)
  - Checklist operacional (de v1 §8)
  - Non-Claims explícitos para cada gap abierto
- [ ] T7.2: Crear `docs/reports/GAP_CLOSURE_STATUS_v31.json` con el estado de cada gap L0-1 a L6-4
- [ ] T7.3: Ejecutar auditoría léxica sobre todos los archivos nuevos, corregir findings
- [ ] T7.4: Compilar todos los LaTeX modificados, verificar 0 errores

---

## REGLAS DE EJECUCIÓN

1. **Bottom-up obligatorio:** No se toca Layer N+1 hasta que Layer N pase verificación
2. **Verificación por fase:** Al final de cada fase, ejecutar:
   - `pdflatex` (2 passes) sobre cada `.tex` modificado → 0 errores, 0 undefined refs
   - Auditor léxico → 0 findings nuevos en archivos de la fase
   - `node external-session-zero-adjudicator-v30.js` → verificar que los gates siguen funcionando
3. **Non-Claims obligatorios:** Cada hipótesis no verificada debe tener un Non-Claim explícito en LaTeX
4. **Cero inflación:** Nunca promover un resultado testigo-relativo a universal. Nunca convertir "structural non-nullity" en "phenomenal consciousness"
5. **Números concretos:** Cada gap documentado debe tener al menos un número del fixture v27 cuando sea relevante
6. **Preservar legacy:** `--legacy-v27` y `--legacy-iid` deben seguir funcionando en el adjudicador
7. **Idioma:** Los LaTeX del corpus canon (Papers 1-10) van en inglés. Los documentos de auditoría y reportes internos pueden ir en español si se desea

---

## ARCHIVOS CRÍTICOS DE REFERENCIA

| Archivo | Rol |
|---------|-----|
| `paper1/main.tex` | Estilo LaTeX a replicar para Paper 3 |
| `paper2/main.tex` | Preliminares (Φ-regularidad, espacio E) |
| `paper1/references.bib` | Referencias base |
| `paper2/references.bib` | Referencias base |
| `backup/paper_bridge_operational_subjecthood/main.tex` | Estilo LaTeX alternativo (más completo) |
| `backup/paper3/main.aux` | Estructura de secciones y labels del Paper 3 original |
| `backup/paper3/main.log` | Confirmación: 13 páginas, 0 errores |
| `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex` | Nuestro teorema con GLS/Fisher/Lipschitz |
| `scripts/external-session-zero-adjudicator-v30.js` | Adjudicador con GLS exacto |
| `scripts/lib/gls-statistics.js` | Implementación GLS |
| `scripts/lib/advanced-statistics.js` | AR(1) + Miller-Madow |
| `scripts/audit-operational-term-promotions-v28.js` | Auditor léxico |
| `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json` | Fixture con DW=0.038 |

---

## SKILLS RECOMENDADAS PARA EJECUCIÓN

| Fase | Skill recomendada | Razón |
|------|-------------------|-------|
| FASE 0 | `writing-plans` + `subagent-driven-development` | Reconstrucción de Paper 3 es tarea grande con subtareas independientes |
| FASE 1-2 | `writing-plans` + `gateguard` | Cada Non-Claim y corrección teórica necesita verificación de que no introduce nueva circularidad |
| FASE 3 | `systematic-debugging` | Los gaps estadísticos son bugs factuales — necesitan diagnóstico preciso antes de corrección |
| FASE 4-5 | `verification-before-completion` | Los gaps de estimación y factorización son "no computado" — verificar que el estado documentado es correcto |
| FASE 6 | `test-driven-development` | Los gates nuevos son código — escribir test primero, implementar después |
| FASE 7 | `requesting-code-review` | El documento de cierre es el deliverable final — necesita review antes de commit |
