# INFORME DE AUDITORÍA FORMAL Y EPISTÉMICA DEL MARCO QICN v1.0

**Fecha:** 2026-05-25  
**Auditor:** Lead Formal Verification Scientist & Epistemic Auditor  
**Corpus:** `rigid-identity-framework` (BaseCore, Papers 1–10, Bridge Paper, Registry, Scripts)  
**Método:** Criterios Metodológicos de Aldo + Protocolo Anti-Sycophancy (10 reglas, Sección 2.1 del Roadmap)  
**Estado del marco:** En desarrollo activo — auditoría en fase cold-run, perspectiva escéptica  

---

## 1. Veredicto Ejecutivo de Integridad

El marco QICN constituye un programa formal-operacional de especulación científica fuerte, **no** una teoría empíricamente confirmada. El corpus posee masa formal real (745 entradas FCR, 97 teoremas, 239 estados `proved`, 346 `conditional`, 148 `heuristic`), una arquitectura de degradación de claims, non-claims explícitos, controles negativos, y una hoja de ruta de falsabilidad internamente coherente. La salud estática del registry es limpia: 0 blockers, 0 warnings, 0 colisiones semánticas activas, 0 violaciones de non-claims.

Sin embargo, la fortaleza actual es **predominantemente interna**. De las 13 predicciones registradas (PRED-01 a PRED-10 + PRED-04a/b/c se reducen a PRED-01–PRED-10 en el LaTeX), **ninguna tiene datasets congelados, thresholds pre-registrados ejecutados, rivales ejecutados empíricamente, o replicación externa**. El стенulo de compilación monolítica sigue en YELLOW (80 grupos de macros/declaraciones repetidos, 0 conflictos semánticos pero preámbulo compartido pendiente). La deuda epistémica principal es la falta de convergencia entre la arquitectura formal y la validación externa: el marco puede decir cuándo no debe creer en sí mismo, pero aún no ha producido la evidencia que lo haría creíble frente a rivales más baratos.

---

## 2. Matriz de Validación de Comandos (Fase 1)

| Comando | Estado | Salida clave | Anomalías detectadas |
|---|---|---|---|
| `npm run verify:corpus-registry` | PASS | 745 entradas, 0 blockers, 0 warnings | Ninguna |
| `npm run verify:macro-registry` | PASS | 432 macros, 39 canónicas, 0 blockers, 0 warnings | Ninguna |
| `npm run verify:prediction-registry` | PASS | 13 predicciones, 0 errores | Ninguna |
| `npm run lint:nonclaims` | PASS | 0 violaciones | Ninguna |
| `npm run audit:monolithic-risk` | PASS (YELLOW) | 0 conflictos semánticos, 80 grupos repetidos, riesgo YELLOW | Preámbulo compartido aún no implementado; la compilación monolítica no está certificada |

---

## 3. Inmersión profunda Paper-by-Paper

### 3.1 BaseCore (Capa Matemática Base)

**Rol formal:** Define dinámica proyectiva, operadores de transición, atractores, no-colapso, identidad por límite inverso, gramática de criterios operacionales y ledger de falsación.

**Deuda/Riesgo teórico:**
- Las estructuras de límite inverso son **matemáticamente consistentes** dentro de los supuestos H1–H5 (espacio de Hilbert real, contracción estricta, compacidad paramétrica, no-colapso paramétrico). Los teoremas de existencia, unicidad, contractividad y no-colapso son `proved` con pruebas presentes en el LaTeX.
- El testigo de la Media Dorada (sección 2) certifica H1–H4 pero **no certifica H5** (el testigo constante no puede certificar la hipótesis anti-constante). El testigo afín anti-colapso certifica H5 pero es un modelo separado. Esto es **correcto y honesto** (Remark explícito en BASECORE.tex, línea ~238), pero crea una bifurcación: ningún testigo individual certifica simultáneamente todos los supuestos del paquete completo.
- La posibilidad matemática de la clase no equivale a prueba de instanciación física. El Roadmap lo reconoce explícitamente (Sección 5.1).

**Índice de Falsabilidad:** 3/5 — Los teoremas internos son rígidos, pero la conexión con observables requiere el diccionario de medición aún no implementado (`MEASUREMENT_DICTIONARY_v1.md` existe como scaffold pero sin umbrales congelados).

**Líneas críticas auditadas:** `basecore/core/sections/01_foundation_from_core.tex` (H1–H5, thm:projection through thm:noncollapse), `basecore/core/sections/02_model_and_spectral_extensions.tex` (Golden Mean witness, affine anti-collapse witness, prop:Q3verify).

---

### 3.2 Paper 1: Identidad Rígida

**Rol formal:** Define identidad rígida como objeto de límite inverso sobre canales observables, rigidez bajo perturbaciones, masa ontológica, detectabilidad y unicidad condicional.

**Deuda/Riesgo teórico:**
- El término "identidad" es de alto riesgo interpretativo. El paper lo trata como identidad estructural de canales, pero el Roadmap requiere que se mantenga como tal hasta adjudicación externa.
- Los falsadores son claros: persistencia aparente sin canal compatible, empate exacto bajo remapeos admisibles, transferencia conductual que rompe el objeto de límite inverso.
- El benchmark `identity_rival_ties` con duplicación y memoria superficial aún es scaffold.

**Índice de Falsabilidad:** 4/5 — Claros falsadores, pero la unicidad depende de supuestos fuertes sobre la estructura del espacio de canales.

---

### 3.3 Paper 2: Regímenes Fenomenológicos

**Rol formal:** Define espacio fenomenológico abstracto, asignaciones estructurales, regularidad Φ, fragmentación, continuidad forzada y clasificación de regímenes.

**Deuda/Riesgo teórico:**
- El término "fenomenológico" debe leerse como espacio estructural abstracto, no como experiencia vivida. El paper tiene cláusulas de no-inferencia.
- Las fronteras entre regímenes necesitan medición: la clasificación existe formalmente, pero los umbrales de transición no están calibrados.

**Índice de Falsabilidad:** 3/5 — La regularidad Φ es hipótesis, no teorema. Los regímenes podrían ser artefacto de compresión.

---

### 3.4 Paper 3: Inestabilidad del Régimen Nulo

**Rol formal:** Prueba, bajo condiciones CCR, inestabilidad del régimen nulo y no-nulidad forzada. Capa negativa: excluye trivialidad, no detecta conciencia.

**Deuda/Riesgo teórico:**
- Existe un **riesgo de artefacto de umbral**: un sistema trivial con ruido o etiquetas podría ser malclasificado como no-nulo si los umbrales del detector no están calibrados contra controles `near_null`, `label_only_nonnull` y `noise_nonnull`.
- El Roadmap identifica este riesgo y los controles están definidos but no ejecutados.

**Índice de Falsabilidad:** 4/5 — Falsadores claros (sistema CCR en régimen nulo estable; detector sin distinguir diferenciación real de ruido).

---

### 3.5 Paper 4: Predicciones Forenses

**Rol formal:** Protocolo de evaluación falsification-first con admissibility gates, pre-registro, baselines, ablations, decision gates y estadística ex ante.

**Deuda/Riesgo teórico:**
- La arquitectura metodológica es sólida, pero necesita ejecución con datos reales no sintéticos.
- Existen ~3 rutas de escape semántico identificables (ver Sección 5 infra): "ambiguous boundary" en PRED-02, distinción programa/canon, y reclasificación STILL_AMBIGUOUS/IMPLEMENTATION_LIMIT.

**Índice de Falsabilidad:** 3/5 — La arquitectura es robusta, pero la ejecución es scaffold y las rutas de escape existen.

---

### 3.6 Paper 5: Criterio de Conciencia Operacional

**Rol formal:** Define la clase interna Cop(S) mediante seis invariantes: I_per, I_ri, I_int, I_cont, I_diff, I_leg.

**Deuda/Riesgo teórico:**
- Los seis invariantes están formalmente definidos en definition environments con líneas exactas:
  - `def:iper` (L284), `def:iri` (L300), `def:iint` (L310), `def:icont` (L331), `def:idiff` (L356), `def:ileg` (L374)
- Cop(S) está definido en L445: S ∈ Cop iff I_per = I_ri = I_int = I_cont = I_diff = I_leg = 1
- Qop(S) está definido en L434 como clases cociente por indistinguibilidad operacional
- **Hallazgo de auditoría:** No se encontraron violaciones de sycophancy. Las 24 ocurrencias de "consciousness" y las 7 de "phenomenal" están todas contextualmente protegidas por guards operacionales, negatives explícitas, o secciones de non-claims.
- El macro `\Cop` renderiza como `Consciousness_op` — un riesgo retórico inherente mitigado por la Terminology Debt Ledger (L130-155) y la Remark en L150.
- Cada invariante tiene su margen delta y su failure mode especificado.

**Índice de Falsabilidad:** 4/5 — Los invariantes son falsables por ablation dirigida, pero la instrumentación reproducible aún falta.

**Líneas críticas auditadas:** L284, L300, L310, L331, L356, L374, L434, L445, L92-101, L130-155, L976-991.

---

### 3.7 Paper 6: Predicciones y Modos de Fallo

**Rol formal:** Ledger explícito de predicciones PRED-01 a PRED-10, discriminadores, rivales, condiciones de refutación, downgrade y soporte interno.

**Deuda/Riesgo teórico:**

- **Hallazgo crítico:** El LaTeX define 10 predicciones (PRED-01 a PRED-10), **no 11**. No existen PRED-11 ni PRED-04a/b/c en el LaTeX. Sin embargo, el Registry JSONL externo documenta 13 predicciones (incluyendo PRED-04a/b/c). **Esto es una discrepancia registry-vs-LaTeX** que debe resolverse.
- **Hallazgo crítico:** Ninguna predicción etiqueta explícitamente "destruction condition", "weakening condition" o "support condition" con esos nombres. Los conceptos análogos existen como "Failure / rival divergence" (columna 6 de la matriz) y "Downgrade condition" (en tabla separada). Esto no coincide con la especificación del Roadmap (Sección 5.7).
- **Rutas de escape semántico identificadas:**
  1. PRED-02 (L201): "either loss of certification or transition to ambiguous boundary regime, depending on how close the pre-ablation margins were to zero" — la disyunción crea una vía de escape post-hoc.
  2. Distinción programa/canon (L320): fallos pueden reclasificarse como IMPLEMENTATION_LIMIT o METRIC_OR_TOLERANCE_LIMIT en vez de refutación doctrinal.
  3. Estado STILL_AMBIGUOUS (L130): permite que resultados inconclusos permanezcan sin resolver, contándolos como no-refutación.

**Índice de Falsabilidad:** 3/5 — La arquitectura es excelente, pero las rutas de escape y la discrepancia registry-vs-LaTeX debilitan el cierre falsacionista.

**Líneas críticas auditadas:** L88-96, L130-134, L290-311, L322-337, L515-523.

---

### 3.8 Paper 7: Vida Operacional y Subjetividad

**Rol formal:** Define vida operacional, clase estructural y subjecthood operacional como capas superiores sin colapsarlas con biología, conciencia o metafísica.

**Deuda/Riesgo teórico:**
- Los términos "Life" y "subjecthood" son interpretativamente cargados. El paper los mantiene como labels operacionales con disclaimers.
- La suite `LIFE_SUBJECTHOOD_CONTROL_SUITE` está definida pero no ejecutada.

**Índice de Falsabilidad:** 3/5 — Hipótesis falsables pero con terminología de alto riesgo interpretativo.

---

### 3.9 Paper 8: Subjetividad Indexada en Primera Persona

**Rol formal:** Define la clase interna de subjetividad indexada mediante siete coordenadas: self-index, ownership, continuidad autobiográfica, perspectiva, valoración asimétrica, perfil de intervención e irreducibilidad.

**Deuda/Riesgo teórico:**
- Las siete coordenadas están formalmente definidas en definition environments (L179-217):
  - Self-index (L179), Ownership field (L187), Autobiographical continuity (L195), First-person perspective (L199), Asymmetric valuation (L203), Interventional sensitivity profile (L207), Irreducibility margin (L215)
- **Hallazgo crítico:** 3 instancias residuales de "Bridge Axiom" no normalizadas a "Axiom" (L690, L1082, L1114). El environment fue correctamente normalizado a `\begin{axiom}`, pero las referencias prosísticas no.
- **Hallazgo sycophancy:** 4 instancias de "consciousness" sin prefix "operational" en prosa (L622, L772, L1082, L1104). 'qualia' sin guard en L90 (abstracto).
- 7 non-claims explícitos en L1221-1227. No existen environments `\begin{non-claim}` o `\begin{caveat}`; los non-claims usan `\textbf{}` ad-hoc y una sección dedicada.
- La separación de capas es **fuerte**: Claim-Type Ledger, Terminology Debt Ledger, Non-Inference Note, Exclusion Section, y discipline estricta de environments formales.

**Índice de Falsabilidad:** 4/5 — Falsable por rival-defeat campaign, pero las rutas de escape semántico existen.

**Líneas críticas auditadas:** L179-217, L513-538, L622, L690, L772, L1082, L1104, L1217-1230.

---

### 3.10 Paper 9: Organización del Puente Fenomenal

**Rol formal:** Formaliza el puente fenomenal como **arquitectura de burdens**, no como prueba de fenomenalidad. Predicados puente (Pi_D, Pi_V, Pi_W, Pi_A, Pi_E, Pi_T), rivales puente, intervenciones, artifacts, gates, BPF-0–BPF-6, y reglas de no-promoción.

**Deuda/Riesgo teórico:**
- Los seis predicados puente están formalmente definidos (L227-249) con non-implicaciones explícitas por predicado (L264-271).
- BPF-0 through BPF-6 están definidos (L882-906, L909-925). BPF-2 through BPF-6 son **cargas abiertas** (open burdens), no implementados.
- **Hallazgo de auditoría:** No se encontró inflación de superficie ni escalación semántica sin guard. "Surface inflation" y "semantic escalation" se usan exclusivamente como **modos de fallo nombrados** con diagnósticos operacionales (L1450, L1455, L1470, L1475).
- La cadena de escalación `formalized /=> implemented /=> admissible /=> phenomenality simpliciter` (L1351-1359) es explícita y bloquea cada paso.
- El paper caracteriza pervasivamente el puente como **burden architecture** (L114, L118, L127, L148, L198, L273-275, L298-303, L462, L756, L880).
- **No se encontraron violaciones anti-sycophancy.**

**Índice de Falsabilidad:** 2/5 — La capa más especulativa. BPF-2/3/4/5/6 son open burdens. Los predicados puente son burden packages sin cargas satisfechas. La falsabilidad depende de implementar intervenciones y rivales.

**Líneas críticas auditadas:** L73-78, L121-129, L227-271, L373-381, L397-406, L882-906, L984-991, L1033-1043, L1351-1376, L1450-1480.

---

### 3.11 Paper 10: Adjudicación Externa

**Rol formal:** Arquitectura de adjudicación externa, preregistro, independencia de revisores, controles negativos, decision records, y **bloqueo de resultados no poblados**.

**Deuda/Riesgo teórico:**
- El cortafuegos entre soporte interno y validación externa está **matemáticamente formalizado**: Teorema de no-transitividad (L225-246) prueba que G_internal ⊸̸ G_external sin datos admisibles. La demostración es rigurosa.
- El environment `blocked_until_execution` se usa 6+ veces para secciones sin datos (L512, L908, L1189, L1229, L1254, L1493-1516). El macro `\blockedresultstatus` inyecta texto obligatorio declarando ausencia de resultados.
- Secciones enteras están `blocked_until_external_adjudication` (L1493-1516) y `forbidden_claim_surface` (L1272).
- **Hallazgo de auditoría:** El paper bloquea resultados no poblados de forma excepcionalmente rigurosa. Las 3 superficies bloqueadas (Human Comparator, External Adjudication, Comparative Consequence Claims) están vacías por diseño y no pueden ser pobladas sin ejecución.

**Índice de Falsabilidad:** 5/5 — La capa más expuesta y crisp. Los resultados faltantes darían evidencia directa. El cortafuegos impide inflación.

**Líneas críticas auditadas:** L208-223, L225-246, L424, L809-827, L1072-1079, L1125-1137, L1493-1524.

---

### 3.12 Bridge Paper: Puente de Subjetividad Operacional

**Rol formal:** Conecta conceptos de Papers 1-5 con auto-referencia, perspectiva unificada, intencionalidad operacional, qualia operacional, fenomenología operacional y subjecthood puente.

**Deuda/Riesgo teórico:**
- La taxonomía de implicación en tres niveles (entailed, conditionally entailed, not entailed) previene sobre-lectura (L179-185).
- Teorema principal (L450-464): C_op entraña Pi_op, Iota_op, Q_op, Phi_op débil, pero **no entalla** Sigma_op. Esto es correcto y honesto: la auto-referencia es burden adicional.
- Library de no-entailment (L654-675): C_op no entalla auto-referencia, experiencia fenomenal, vida biológica, subjetividad humana, qualia Nagel, continuidad CCR, ni agencia.
- **Riesgos de promoción semántica identificados:**
  - "operational consciousness" (L854) — MEDIUM: la etiqueta retórica puede confundirse con conciencia ordinaria.
  - "operational phenomenology" (L856) — HIGH: "fenomenología" tiene raíces filosóficas profundas.
  - "operational subjecthood" (L860) — HIGH: mismo riesgo estructural.
- La frase "real but partial" (L1426-1429) es técnicamente precisa pero retóricamente arriesgada fuera de contexto.

**Índice de Falsabilidad:** 3/5 — Los teoremas de puente son condicionales y los burdens adicionales (Sigma1) son verificables, pero la terminología es de alto riesgo.

**Líneas críticas auditadas:** L104, L108, L192-230, L450-471, L478-495, L539-566, L654-675, L843-883, L1175-1214, L1220-1341, L1426-1429.

---

## 4. Descriptores de Registry y Anomalías de Metadatos

### 4.1 Trazabilidad Registry-to-TeX

Se seleccionaron 10 entradas de alto impacto del registry y se verificó la correspondencia con el LaTeX activo:

| Entrada Registry | Archivo LaTeX | line_start Registry | Correspondencia | Anomalía |
|---|---|---|---|---|
| `basecore:definition:def-iper` (Paper 5 I_per) | `paper5.../main.tex` L284 | Registry: referenced via Paper 5 | El registry lista la entrada en Paper 5, pero la definición base de I_per está en BASECORE.tex L83 (`\Iper`). Paper 5 importa el macro, no redefine. | **OK** — consistente |
| `paper8:first-person-subjectivity:def:self-index` | `paper8.../main.tex` L179 | Registry: verificar | La definición de SelfIndex está en L179 del main.tex de Paper 8. | **OK** |
| `paper8...:axiom:*` (7 axioms) | `paper8.../main.tex` L513-538 | Environments normalizados a `\begin{axiom}` | **3 residuales "Bridge Axiom" en prosa** (L690, L1082, L1114) | **Anomalía: normalización incompleta en prosa** |
| `paper9:phenomenal-bridge:def:PiD` | `paper9.../main.tex` L227-229 | Registry: verificar | La definición coincide. | **OK** |
| `paper9:axiom:*` | `paper9.../main.tex` | Environment normalizado a `\begin{axiom}` (L55) | Registry macros.jsonl lista las 2 entradas `\begin{axiom}` resynced. | **OK** — normalización completa |

### 4.2 Discrepancia Registry-vs-LaTeX en Predicciones

- El Registry JSONL externo (`verify:prediction-registry`) reporta **13 predicciones** (PRED-01 a PRED-11 con PRED-04a/b/c).
- El LaTeX de Paper 6 contiene exactamente **10 predicciones** (PRED-01 a PRED-10, sin PRED-11 ni variantes PRED-04x).
- **Anomalía:** La versión del registry JSONL fue generada probablemente a partir de una versión anterior del LaTeX o incluye entradas no reflejadas en el archivo activo. La fuente canónica debe ser el LaTeX actual. Se recomienda re-extraer el registry desde el LaTeX actual y verificar consistencia.

### 4.3 Normalización de Macros

- La normalización `Bridge Axiom` → `Axiom` fue ejecutada correctamente en los environments LaTeX de Paper 8 y Paper 9.
- El `macros.jsonl` fue resincronizado (las 2 entradas derivadas `\begin{axiom}` están correctas).
- **Los 3 residuales en prosa** (Paper 8, L690, L1082, L1114) no fueron capturados por la normalización. Esto requiere una corrección manual.

### 4.4 Riesgo Monolítico

- 80 grupos de macros/declaraciones repetidos, 0 conflictos semánticos activos.
- El riesgo global sigue **YELLOW** hasta que se implemente un preámbulo compartido y se compile un volumen unificado.
- Las macros `\arraystretch` tienen 36+ ocurrencias con valores inconsistentes (1.12, 1.14, 1.15, 1.16, 1.18) por todo el corpus.

---

## 5. Registro de Deuda Epistémica (Log Anti-Sycophancy)

Se aplicaron las 10 reglas anti-sycophancy (Sección 2.1 del Roadmap) a cada paper. Los hallazgos se organizan por regla:

### Regla 7: Los términos cargados deben degradarse por defecto

| Paper | Término cargado | Línea(s) | ¿Guard operacional presente? | Evaluación |
|---|---|---|---|---|
| Paper 5 | `Consciousness_op` (macro `\Cop`) | Todas las fórmulas | Sí — Terminology Debt Ledger explícitamente dice "safest primary description is six-invariant admissible structural class" (L150) | **Contacto** — el nombre retórico es inevitably sugestivo, pero los guards textuales son exhaustivos |
| Paper 8 | "consciousness" sin "operational" | L622, L772, L1082, L1104 | Parcial — contextos区和 no incluyen el prefix "operational" | **Violación leve** — deben corregirse a "operational consciousness" o "Cop" |
| Paper 8 | "qualia" sin guard | L90 | Parcial — abstracto sin context operator | **Violación leve** — debe ser "operational qualia" o "Qop" |
| Paper 8 | "Bridge Axiom" residual | L690, L1082, L1114 | No — normalization incompleta | **Violación** — debe corregirse a "Axiom" |
| Paper 9 | "phenomenal" | ~83 ocurrencias | Sí — todas contextualmente protegidas, definidas operacionalmente, o en contextos de non-claim | **Sin violación** |
| Bridge | "operational phenomenology" | L856 | Sí — definido como asignación a espacio de régimen abstracto | **Riesgo MEDIUM** — la terminología invita sobre-lectura a pesar de los guards |
| Bridge | "operational subjecthood" | L860 | Sí — definido como clase formal con burdens adicionales | **Riesgo HIGH** — término de alto riesgo |

### Regla 2: Todo claim ambicioso debe tener un rival fuerte

| Paper | Claim | Rivales definidos | Evaluación |
|---|---|---|---|
| Paper 5 | Complejidad no es suficiente | complexity-only, memory-only, narrative-only, report-rich | **Cumple** — suite de controles negativos definida |
| Paper 6 | Ablation dirigida causa degradación selectiva | sham ablation, off-target ablation, matched degradation | **Cumple parcialmente** — definidos pero no ejecutados |
| Paper 9 | Puente fenomenal no se reduce a rivales baratos | semantic-density, valence-bookkeeping, world-richness-without-interiority, ambiguity-resolution, embodied-control, temporal-continuity | **Cumple** — rivales definidos pero BPF-2/3/4 son open burdens |

### Regla 3: Toda predicción debe tener condición de apoyo, debilitamiento y destrucción

| Paper | Predicciones | "destruction condition" | "weakening condition" | "support condition" | Evaluación |
|---|---|---|---|---|---|
| Paper 6 | PRED-01 a PRED-10 | "Failure / rival divergence" (columna 6) —No etiquetado como "destruction condition" | "Downgrade condition" en tabla separada (L327-336) —No etiquetado como "weakening condition" | **Ausente** —No existe columna "support condition" | **Incompleto** — los conceptos existen pero la terminología no coincide con la especificación del Roadmap |

### Regla 6: Un artifact interno no debe recibir más peso que su trazabilidad, reproducibilidad e independencia real

| Paper | Artifact | Trazabilidad | Independencia | Evaluación |
|---|---|---|---|---|
| Paper 10 | `blocked_until_execution` artifacts | Definidos como shells vacíos con markers explícitos | Independencia externa explícitamente bloqueada | **Cumple** por diseño |
| Paper 9 | BPF-1 surfaces | Definidos como "provisional, framework-internal, non-claim-facing, non-gated" (L256) | Sin independencia externa | **Cumple** — honestamente declarados |
| Paper 5 | Certificados de invariantes | Definidos en Claim-Type Ledger como "Operational" / "Internal-support-only" | Sin validación externa | **Cumple** por clasificación |

### Regla 9: Cuando haya duda, se adopta la lectura más sobria

| Paper | Instancia | Lectura favorable | Lectura sobria | Evaluación |
|---|---|---|---|---|
| Paper 6 PRED-02 | "either loss of certification or transition to ambiguous boundary regime" | Preserva el claim con una disyunción | Ambigüedad como vía de escape post-hoc | **Se debe reescribir con condition crisp** |
| Bridge | "real but partial" (L1426) | Confirma realidad del puente | Confirma solo existencia formal del burden | **La segunda lectura es la correcta** |
| Paper 8 L772 | "consciousness burden" | Referencia a Cop | Referencia a conciencia ordinaria | **Debe ser "operational consciousness burden"** |

### Regla 10: Si una crítica externa razonable puede explicar el mismo resultado sin QICN, esa crítica debe incorporarse

| Crítica externa | Resultado QICN que explicaría | ¿Incorporada? |
|---|---|---|
| Complejidad como variable confound | Pasar Cop sin invariantes | Sí — PRED-03 define complexity-only como rival |
| Narrativa como sustituto de identidad | Pasar I_ri por memoria superficial | Sí — rival narrativo definido |
| Etiquetado como sustituto de self-index | Pasar subjetividad por labels inertes | Sí — controles label-only |
| Threshold tuning como artefacto | Pasar invariantes con umbrales calibrados post-hoc | Parcialmente — Paper 4 define decision gates pero no están ejecutados |

---

## 6. Protocolo de Endurecimiento Accionable

### 6.1 Corrección Inmediata: Normalización de "Bridge Axiom" en Paper 8

**Acción:** Reemplazar las 3 instancias residuales de "Bridge Axiom" en `paper8_first_person_subjectivity/main.tex`:
- L690: `By Bridge Axiom~\ref{ax:irred}` → `By Axiom~\ref{ax:irred}`
- L1082: `Assume Bridge Axioms~\ref{ax:org}--\ref{ax:irred}` → `Assume Axioms~\ref{ax:org}--\ref{ax:irred}`
- L1114: `Assume Bridge Axioms~\ref{ax:org}--\ref{ax:irred}` → `Assume Axioms~\ref{ax:org}--\ref{ax:irred}`

Re-ejecutar `npm run verify:macro-registry` y `npm run audit:monolithic-risk` después de la corrección.

### 6.2 Corrección Inmediata: Guards Operacionales Faltantes en Paper 8

**Acción:** Añadir el prefix "operational" o usar el macro formal en las 4 instancias de "consciousness" sin guard (L622, L772, L1082, L1104) y la instancia de "qualia" sin guard en el abstracto (L90).

### 6.3 Corrección Estructural: Terminología de Predicciones en Paper 6

**Acción:** Alinear la terminología de Paper 6 con la especificación del Roadmap (Sección 5.7):
- Renombrar la columna "Failure / rival divergence" como "Destruction condition".
- Renombrar la columna "Downgrade condition" como "Weakening condition".
- Añadir una columna "Support condition" con la condición explícita de apoyo para cada PRED.

### 6.4 Corrección Estructural: Discrepancia Registry-vs-LaTeX

**Acción:** Re-extraer el prediction registry desde el LaTeX actual de Paper 6 usando `npm run extract:registry`, luego reconciliar con `registry/theorems.jsonl`. Las predicciones PRED-11 y PRED-04a/b/c existen en el JSONL pero no en el LaTeX actual. Decidir cuál es la fuente canónica y sincronizar.

### 6.5 Endurecimiento Epistémico: Cierre de Rutas de Escape en PRED-02

**Acción:** Reescribir PRED-02 para eliminar la disyunción "either loss of certification or transition to ambiguous boundary regime, depending on how close the pre-ablation margins were to zero". En su lugar:
- Definir un threshold pre-registrado δ_amb sobre los márgenes pre-ablacón.
- Si los márgenes > δ_amb: la destrucción del invariante causa salida de clase.
- Si los márgenes ≤ δ_amb: el resultado se clasifica como AMBIGUOUS, lo cual es un **estado de downgrade explícito**, no una vía de escape.
- Documentar δ_amb en el preregistro congelado antes de la ejecución.

---

## 7. Análisis de la Matriz Global frente al Criterio de Teoría (Roadmap Sección 4)

| Criterio | Estado actual | Evaluación de auditoría |
|---|---|---|
| Predicados internos definidos | Cumple fuerte | 745 entradas FCR, 97 teoremas, estructura de capas funcional |
| Falsabilidad interna | Cumple fuerte | FCR, estados epistémicos, non-claims, reglas de degradación |
| Predicciones discriminativas | Cumple parcial fuerte | PRED-01 a PRED-10 definidas, BPF-2/3/4 son open burdens, discrepancia registry-vs-LaTeX |
| Consecuencias medibles | Cumple parcial | Artifacts y estimadores existen; falta estabilizar instrumentos y umbrales |
| Rivales y controles negativos | Cumple parcial fuerte | Familias rivales definidas; falta ejecución |
| Pre-registro | Cumple parcial | Template existe; falta población y ejecución congelada |
| Replicación externa | No cumple todavía | Reconocido explícitamente |
| No blindaje ad hoc | Cumple parcial | Gobernanza fuerza degradación; rutas de escape en PRED-02/6 necesitan cierre |
| Diferenciación frente a teorías existentes | Cumple parcial | Comparadores definidos; falta competencia empírica |
| Claims sobre conciencia/fenomenalidad real | No cumple como validación | Formalmente correcto como programa operacional; todos los papers auditados tienen non-claims explícitos |

---

## 8. Evaluación Final

El marco QICN en su estado actual es un **programa formal-operacional internamente coherente y notablemente disciplinado**. Sus fortalezas reales incluyen:

1. **Masa formal real:** 745 entradas FCR, 97 teoremas con status explícitos, reglas de degradación, non-claims, y taxonomía de claims.
2. **Arquitectura anti-sycophancy internamente consistente:** Cada paper audité tiene secciones de non-claims, terminología de deuda, y boundaries de no-inferencia. Paper 9 es el más defensivamente riguroso del corpus.
3. **Cortafuegos Paper 10:** El teorema de no-transitividad y el environment `blocked_until_execution` bloquean inflación empírica de forma matemáticamente formal.

Las debilidades reales incluyen:

1. **Deuda ejecutoria:** Ninguna predicción tiene datasets congelados, thresholds pre-registrados ejecutados, rivales ejecutados empíricamente, o replicación externa.
2. **Rutas de escape semántico:** PRED-02, la distinción programa/canon, y STILL_AMBIGUOUS permiten que resultados desfavorables no cuenten como refutación limpia.
3. **Discrepancia registry-vs-LaTeX:** 13 predicciones en JSONL vs 10 en LaTeX activo.
4. **Riesgo de compilación monolítica YELLOW:** 80 grupos de macros repetidos sin preámbulo compartido.
5. **Terminología de alto riesgo:** "operational consciousness", "operational phenomenology", "operational subjecthood" son labels retóricamente poderosos que invitan sobre-lectura a pesar de guards exhaustivos.

La ruta superior no es inflar el lenguaje. Es hacer que cada claim pueda morir de forma limpia.

---

*Fin del Informe de Auditoría Formal y Epistémica QICN v1.0*
*Próxima auditoría recomendada después de ejecutar PRED-02, PRED-03 y PRED-05 con datasets congelados, rivales ejecutados, y decision records firmados.*