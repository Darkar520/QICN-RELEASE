# AUDITORÍA FORMAL PROFUNDA: QICN FRAMEWORK v28 CONSOLIDADO

**Panel:** Revisión por Pares Académicos — Física Matemática, Lógica Formal, Epistemología Popperiana, Ingeniería de Confiabilidad de Software  
**Fecha:** 2026-05-27  
**Objeto:** Repositorio QICN-FRAMEWORK (v28 hardened), incluyendo corpus LaTeX (10 papers + BaseCore + monolítico), infraestructura de verificación Node.js (adjudicadores v26/v27/v28, calibradores, auditores léxicos, verificadores Ed25519), fixtures sintéticos, y registros de claim/gobernanza.  
**Metodología:** Análisis línea-por-línea de 569 líneas del adjudicador v28, 192 líneas de `advanced-statistics.js`, 245 líneas del verificador Ed25519 v28, 266 líneas del auditor léxico v28, 163 líneas del gap audit v27, 156 líneas del calibrador v27, 81 líneas del Bridge Conjecture v28.tex, más los reportes de los 3 sub-agentes de exploración que cubrieron la totalidad del corpus LaTeX (10 papers, 11 secciones BaseCore, bridge theorem/conjecture), todos los fixtures JSON, todos los registros de claims/manifests, y la librería central `registry-lib.js` (1097 líneas).

---

## 1. RESUMEN CLÍNICO SEVERO

El framework QICN v28 es un edificio de gobernabilidad de software extraordinariamente elaborado construido sobre un vacío empírico total. Su virtud principal —la auto-conciencia de sus propias limitaciones, formalizada en governance boundaries, non-claim boundaries, y la degradación explícita del Bridge Theorem a Conjecture en v28— es también su revelación más devastadora: el framework sabe que no ha probado nada, y ha construido una maquinaria de 30+ scripts y 10+ papers para documentar sistemáticamente esa no-prueba.

La infraestructura de verificación v28 es **defensivamente competente** como software de gate-checking: sus compuertas estadísticas (AR(1)-corrected AICc, Miller-Madow MI, DW block en strict mode) son genuinamente más duras que las de v27. Pero esta competencia es irrelevante para la pretensión central del framework porque: (a) las compuertas se ejecutan exclusivamente sobre datos sintéticos auto-generados, (b) el rival modelo es un straw-man confeso (`"constant_noise_floor_placeholder_control_known_straw_man_for_v27_block_test"`), (c) el fixture presenta DW≈0.038 que destruye cualquier pretensión de iid Gaussian, y (d) el Bridge Conjecture permanece constructivamente incompleto —la existencia de la familia de estimadores {G_i} no ha sido demostrada.

La madurez real del framework es: **ingeniería de gobernabilidad interna avanzada, contenido científico externo nulo.**

---

## 2. ANÁLISIS DE TAUTOLOGÍAS Y CÍRCULOS VICIOSOS

### 2.1 La Tautología del Bridge Conjecture (CONFESADA por el propio framework)

El documento `PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex` contiene la autodemoción más honesta del corpus:

> *"The original 'proof' only showed that if such estimators exist, then the conclusion follows — which is a tautology, not a theorem."*

La estructura lógica del ex-Theorem era:

```
SI existen G_i tales que d(G_i(π(x)), F_i(x)) ≤ ε_i  →  ENTONCES Ĉ(π(x)) es adjudicable
```

Esto es una tautología condicional: el antecedente **asume exactamente lo que se necesita probar**. Sin una demostración constructiva de que {G_i} existen para las seis invariantes latentes declaradas (identity_channel_lock, history_alignment, response_phase, gauge_stability, intervention_fidelity, factorization_gap), el condicional es vacuo. El framework lo reconoce explícitamente en su `nonclaim` de incompletitud constructiva (punto 1: *"declaration is not existence"*). **Veredicto: tautología confesada, degradada correctamente a conjecture.**

### 2.2 El Bucle de Calibración Circular

El script `calibrate-session-zero-thresholds-v27.js` calibra los umbrales `support_gain_aicc` y `mi_leakage_threshold` ejecutando 2000 iteraciones Monte Carlo **sobre el mismo fixture sintético** que luego será evaluado por el adjudicador. El flujo es:

```
fixture sintético → calibrador → umbrales inyectados de vuelta al fixture → adjudicador evalúa el fixture con esos umbrales → PASS
```

Esto es circular por construcción: los umbrales se derivan de la distribución nula del propio fixture, garantizando que el fixture pasa por definición. El `support_gain_aicc = max(4.0, ceil(p95 * 10) / 10)` asegura que el umbral nunca será menor que 4.0, pero el p95 se computa sobre datos que comparten la misma distribución generativa que el fixture. **Veredicto: bucle de auto-calibración cerrado. No constituye validación externa.**

### 2.3 El Predictor Tautológico en la Dinámica de Proyección

El objeto de identidad I se define como el límite inverso:

```
I := lim_backward S_t = {(x_t)_t ∈ Π S_t | π_{t+1→t}(x_{t+1}) = x_t ∀t}
```

Bajo las hipótesis H1-H3 (convexidad, contracción ||K||<1, completitud), el teorema de punto fijo garantiza un punto fijo único. Esto es matemáticamente válido pero **ontológicamente vacío**: la existencia del punto fijo no demuestra que el límite inverso corresponda a "identidad rígida" en ningún sentido fenomenológico. La NFD hypothesis (Non-Finite Determination) afirma que I no está determinado por ningún subconjunto finito de canales observables — lo cual es precisamente lo que hace que la inferencia desde datos finitos sea indecidible sin el Bridge Conjecture (que permanece sin prueba). **Veredicto: la matemática del predictor es internamente consistente pero su conexión con la pretensión ontológica es una asunción no demostrada, no una deducción.**

### 2.4 El Rival Straw-Man Confeso

El campo `rival_model_class` del fixture v27 declara explícitamente:

```
"constant_noise_floor_placeholder_control_known_straw_man_for_v27_block_test"
```

El adjudicador v28 comprueba `rssRival < rssMeanModel` (GAP-05 en el gap audit). Pero cuando el rival es un piso de ruido constante diseñado para fallar, esta compuerta verifica que el rival es intencionalmente débil — no que el modelo QICN supera a un rival científicamente plausible. **Veredicto: la compuerta de rival-adequacy es funcionalmente una tautología de software — excluye rivales que no son rivales.**

---

## 3. DESGLOSE TÉCNICO DE VULNERABILIDADES

### DIMENSIÓN A: FÍSICA MATEMÁTICA Y ESTADÍSTICA

#### A.1 Durbin-Watson ≈ 0.038: Implicaciones para Validez Gaussiana

**Estado del código:** El adjudicador v28 (`external-session-zero-adjudicator-v28.js:399-403`) implementa:

```javascript
if (strict && dw !== null && dw < 0.5) {
  console.warn(`[v28 STRICT] Fixture DW=${dw.toFixed(4)} < 0.5 — severe serial autocorrelation. BLOCKED.`);
}
```

Y en líneas 419-423:
```javascript
if (strict && dw !== null && (dw < 1.0 || dw > 3.0)) {
  blockingReasons.push("BLOCKED_TEMPORAL_DEPENDENCE_STRICT");
}
```

**Análisis estadístico profundo:**

Un DW de 0.038 indica autocorrelación serial positiva de primer orden con ρ ≈ 1 - DW/2 ≈ 0.981. Esto significa que los residuales son esencialmente un camino aleatorio — no un ruido blanco. Las consecuencias son catastróficas para el modelo de verificación:

1. **NLL Gaussiano es inválido.** La función `gaussianInformation()` (línea 131-149) computa `nll += 0.5 * (log(2πσ²) + r²/σ²)` asumiendo observaciones iid. Con ρ≈0.98, la verosimilitud conjunta no factoriza — el NLL calculado es el logaritmo de un producto de densidades marginales, no la log-verosimilitud conjunta. El valor reportado es **matemáticamente incorrecto** como medida de ajuste.

2. **Intervalos de confianza con z=1.96 son espurios.** La función `weightedEffect()` (línea 151-167) calcula `ci95: [estimate - t*SE, estimate + t*SE]` donde t=2.365 para n≤8. Con autocorrelación extrema, la varianza efectiva del estimador está subestimada por un factor de aproximadamente (1+ρ)/(1-ρ) ≈ 104. Los intervalos de confianza reportados son ~10x demasiado estrechos. **El efecto podría no ser significativo si se corrige apropiadamente.**

3. **La corrección AR(1) en v28 es necesaria pero insuficiente.** `correctedGaussianInformation()` en `advanced-statistics.js:42-115` aplica la transformación Prais-Winsten/Cochrane-Orcutt, lo cual es metodológicamente correcto como primer orden. Sin embargo:
   - Con ρ≈0.98, la transformación pierde ~98% de los grados de libertad efectivos. El `n_eff = n * (1-ρ)/(1+ρ)` para n=8 da n_eff ≈ 0.08 — esencialmente cero observaciones independientes.
   - La transformación asume AR(1), pero con DW≈0.038, los residuales podrían seguir un proceso AR(p) con p>1, o tener raíz unitaria (el DW es consistente con ambas). No se realizan tests de Dickey-Fuller o KPSS.
   - El umbral `RHO_BLOCK_THRESHOLD = 0.4` es **demasiado permisivo**. Con n=8 y ρ=0.4, n_eff ≈ 8*(0.6/1.4) ≈ 3.4, que apenas supera el mínimo para AICc (n-k-1 > 0 con k=6 da n>7, pero n_eff≈3.4 < 7). El umbral debería ser ~0.2 para n=8 con k=6.

4. **Ljung-Box con maxLag=min(3, n-1)=3** es un test con n=8 puntos y 3 lags. La potencia estadística de este test con n=8 es esencialmente nula — no puede detectar nada. El p-value `exp(-Q/2)` (línea 198) es además una aproximación de cola que requiere n→∞ para ser válida.

**Veredicto: El fixture con DW≈0.038 destruye la base estadística de todo el pipeline de verificación. La corrección AR(1) de v28 es un paso en la dirección correcta, pero con n=8 y ρ≈0.98, ningún método de series temporales puede rescatar inferencia causal de este fixture.**

#### A.2 AICc vs AIC: ¿Por qué AICc es obligatorio?

**Fundamento teórico correcto:** AICc = AIC + 2k(k+1)/(n-k-1) es la corrección de segundo orden de Hurvich-Tsai para muestras finitas. Cuando n/k es pequeño (aquí n=8, k_qicn=6, n/k≈1.3), AIC subestima severamente la complejidad del modelo. AICc asintóticamente converge a AIC cuando n→∞, pero para n/k < 40, AICc es obligatorio.

**Vulnerabilidad — sobreajuste tautológico vs. straw-man:** La corrección AICc es necesaria pero insuficiente para prevenir sobreajuste tautológico porque:

1. Con n=8 y k_qicn=6, el denominador n-k-1 = 1, resultando en una corrección AICc = AIC + 2*6*7/1 = AIC + 84. Esto penaliza masivamente al modelo QICN — pero **también sería +∞ si k≥7** (overparameterized). El adjudicador v28 marca `overparameterized` y asigna AICc=+∞, lo cual es correcto.

2. El rival con k_rival=1 recibe una corrección AICc = AIC + 2*1*2/6 = AIC + 0.67. La asimetría de penalización es 84 vs 0.67 — un factor de 125x. Esto significa que el modelo QICN necesita un ajuste extraordinariamente mejor en NLL para compensar su complejidad. **Esto es metodológicamente correcto como protección contra sobreajuste.**

3. **Sin embargo**, el rival es un piso de ruido constante (straw-man confeso). Cualquier modelo con parámetros libres que no sea ruido constante superará al rival en ajuste. La compuerta AICc protege contra sobreajuste relativo al rival, pero si el rival es trivialmente débil, la protección es ilusoria: el modelo QICN puede ser sobreajustado y aún así ganar por AICc al straw-man.

**Veredicto: AICc es la elección correcta sobre AIC para n/k≈1.3, pero su función protectora se anula cuando el rival es intencionalmente no-competitivo. Se requiere un rival plausible (no placeholder) para que la comparativa AICc tenga fuerza discriminativa real.**

#### A.3 Fugas Estructurales y Affine Leakage

**Mecanismo en v28 (líneas 386-410):**

```javascript
const fit = linearFitYOnX(observed, qpred);
const maxSigma = Math.max(...sigmas);
const affineBlocked = fit.maxAbsResidual < 2 * maxSigma;
```

y

```javascript
const miMillerMadow = mutualInformationMillerMadow(observed, qpred);
const structuralLeakage = affineBlocked || miDecision > miThreshold || reducedChi2 < 0.05;
```

**Vulnerabilidad 1 — Affine leakage es burlable por transformaciones no lineales.** El test de affine leakage regresa `y = slope*x + intercept` y verifica si `maxAbsResidual < 2*maxSigma`. Si las predicciones QICN son una transformación no lineal de las observaciones (ej. `qicn_pred = tanh(observed)`, o `qicn_pred = observed^3 / max`), la regresión afín producirá residuales grandes y la compuerta no se activará — pero la información mutua sí será alta. El framework incluye MI como segunda compuerta, pero:

**Vulnerabilidad 2 — Miller-Madow MI con n=8 y bins=3 es ruidoso.** `mutualInformationMillerMadow` con `binCount = ceil(sqrt(8)) = 3` crea una tabla de contingencia 3×3 con 8 observaciones. Eso da un promedio de 8/9 ≈ 0.89 observaciones por celda. La corrección Miller-Madow `(m-1)/(2n)` donde m = número de celdas no-vacías (típicamente 5-7 de 9), da un bias correction de ~(5)/(16) ≈ 0.31 nats. Para MI verdadero = 0, el estimador Miller-Madow puede reportar MI ≈ 0.31 nats de bias residual. Con el umbral `mi_leakage_threshold` calibrado a p99 de la distribución nula (que también usa bins=3), la compuerta es **adaptativa al bias** — pero la variabilidad con 8 puntos y 3 bins es tan extrema que la distribución nula misma tiene una varianza enorme, haciendo el test esencialmente no informativo.

**Vulnerabilidad 3 — `reducedChi2 < 0.05` es una compuerta de sobre-ajuste.** Si χ²/df < 0.05, las predicciones ajustan *demasiado bien* — las predicciones están esencialmente copiando las observaciones dentro del σ declarado. Esto es una compuerta legítima de detección de fuga, pero con n=8 puntos y k=6 parámetros, χ²/df tiene 2 grados de libertad, y su distribución bajo H₀ es χ²(2)/2 con E[χ²/df] = 1. El percentil 5 de χ²(2)/2 es ≈0.05, lo cual coincide exactamente con el umbral. Esto significa que ~5% de los modelos correctamente especificados serán falsamente bloqueados. No es una vulnerabilidad crítica, pero indica que el umbral fue elegido para coincidir con el tamaño de la muestra, no derivado de un principio.

**Veredicto: El mecanismo de detección de fugas es conceptualmente correcto pero operacionalmente débil. Transformaciones no lineales simples (log, tanh, polinomiales de orden >1) burlan la compuerta afín. MI con n=8 y 3 bins es demasiado ruidoso para ser discriminativo. Se requerirían estimadores kernel de MI (Kraskov-Stögbauer-Grassberger) o tests de permutación exactos para n=8.**

---

### DIMENSIÓN B: LÓGICA, EPISTEMOLOGÍA E INFERENCIA

#### B.1 El Puente Continuo-Discreto: ¿Teorema o Declaración de Limitaciones?

El Bridge Conjecture v28 (demoted from Theorem) establece que SI existen estimadores {G_i} ε_i-preservantes, Y la claim C factoriza a través de {F_i}, Y la regla de decisión h es robusta al vector de tolerancias ε, ENTONCES Ĉ(π(x)) es un sustituto finito operacionalmente adjudicable.

**Análisis lógico-formal:**

1. **La estructura es un condicional de tres antecedentes.** Cada antecedente es una premisa no demostrada:
   - Antecedente 1 (existencia de G_i): **No probado.** El fixture declara columnas de estimadores pero "declaration is not existence" (v28.tex, nonclaim punto 1).
   - Antecedente 2 (factorización C = h(F_1,...,F_k)): **No probado.** No se ha demostrado que claims como "consciencia" o "transferencia de identidad" factoricen a través de las seis invariantes declaradas (v28.tex, nonclaim punto 2).
   - Antecedente 3 (robustez de h a ε): **No analizado.** No hay análisis de sensibilidad de la regla de decisión (v28.tex, nonclaim punto 3).

2. **El condicional es lógicamente válido pero epistemológicamente vacío.** Un condicional con antecedentes no demostrados es equivalente a: "Si tuviéramos todo lo que necesitamos, entonces podríamos hacer lo que queremos." Esto no es un puente — es un **programa de investigación** disfrazado de teorema.

3. **El Lemma de No-Reconstrucción (Lemma 1 en v28.tex) es el único resultado demostrado** del documento, y dice que SI π no es inyectiva, ENTONCES el bridge certificate no puede reconstruir X. Esto es correcto y trivial — es la definición de no-inyectividad.

**Veredicto: El "puente" no resuelve la proyección continuo-discreta. Es una explicitación honesta de por qué no se ha resuelto. La demotion a conjecture en v28 es intelectualmente honesta pero no añade fuerza probatoria — simplemente etiqueta la brecha en vez de cerrarla.**

#### B.2 El Bucle de Auto-Certificación Circular

**La suite `verify:v28` se ejecuta sobre:**
- `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json` (8 puntos, datos sintéticos)
- `SESSION_ZERO_SYNTHETIC_DATASET_v26.json` / `v27.json` (8 puntos, datos sintéticos)
- `SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json` / `v27.json` (predicciones congeladas del mismo modelo que generó los datos)

**El flujo end-to-end es:**

```
1. El autor define un modelo generativo → produce datos sintéticos
2. El autor define predicciones QICN a priori → se freezan en prediction bundle
3. El calibrador ejecuta Monte Carlo sobre el fixture → deriva umbrales
4. Los umbrales se inyectan de vuelta al fixture
5. El adjudicador evalúa el fixture con esos umbrales → PASS
6. El gap audit verifica que las compuertas existen → PASS
7. El auditor léxico verifica que nadie dice "proves" → PASS
8. El verificador Ed25519 genera claves, firma, y verifica → PASS
```

**Cada PASS en esta cadena es una auto-verificación del software, no una verificación del framework.** Las compuertas verifican que las compuertas funcionan. Esto tiene valor de ingeniería de software (regression testing) pero **cero valor de validación científica**. Es como verificar que un termómetro funciona sumergiéndolo en un baño de temperatura controlada por el propio termómetro.

**El framework es consciente de esto:** cada reporte incluye `governance_boundary`, `external_support_certified: false`, y el bridge conjecture v28.tex dice explícitamente *"A synthetic fixture that passes its own calibration loop proves nothing about external reality."* Pero la estructura del repositorio —10 papers, 30+ scripts, fixtures, manifests, claim registries— crea la impresión de un edificio científico completo cuando en realidad es una maquinaria de auto-consistencia.

**Veredicto: Bucle cerrado de software confeso. La suite verify:v28 es un test de regresión de software, no una validación empírica. El framework lo reconoce pero la arquitectura del repositorio no refleja esta distinción — los reports de PASS se almacenan junto a la teoría, creando una ilusión de acumulación de evidencia.**

#### B.3 Tautologías del Predictor

**La dinámica de proyección define I como el límite inverso.** El "predictor" en el contexto de verificación es la claim C(x) = h(F_1(x),...,F_k(x)) donde C es una propiedad del sistema latente. La pregunta es: ¿asume la dinámica de proyección implícitamente la existencia de lo que predice?

**Análisis:**

1. **El límite inverso I existe bajo H1-H3** — esto es un teorema de punto fijo en espacios métricos completos, no una tautología. Es matemáticamente válido.

2. **La identificación de I con "identidad rígida" ES una asunción no demostrada.** La prueba del punto fijo muestra que existe un objeto matemático con las propiedades formales declaradas. Mostrar que este objeto corresponde a "identidad" en el sentido ontológico que el framework pretende requiere un argumento adicional que no se proporciona.

3. **La hipótesis NFD (Non-Finite Determination)** afirma que I no está determinado por ningún subconjunto finito de canales. Si I es genuinamente no-finitamente-determinado, entonces **por definición** no puede ser verificado por datos finitos — lo cual hace que la pretensión de adjudicación finita sea una contradicción interna. El Bridge Conjecture intenta resolver esto mostrando que ciertas claims factorizan a través de invariantes finitamente preservables, pero la factorización no está demostrada (B.1).

**Veredicto: No es una tautología en el sentido estricto (la existencia del punto fijo es demostrable), pero la conexión entre el punto fijo y la "identidad rígida" ontológica es una asunción categorial no verificable desde dentro del framework. Combinada con NFD, crea una paradoja epistémica: el objeto que se pretende verificar es, por hipótesis, inverificable por medios finitos.**

---

### DIMENSIÓN C: INGENIERÍA DE SOFTWARE Y GOBERNANZA

#### C.1 Seguridad Criptográfica: Ed25519 Human Veto Scheme

**Análisis del esquema v28 (`verify-human-veto-signature-v28.js`):**

**Fortalezas:**
- Uso correcto de `crypto.verify()` con Ed25519 (línea 121)
- Verificación de fingerprint SHA-256 del DER de la clave pública (línea 42-46)
- Protección contra replay: `(report_sha256, timestamp_token_rfc3161)` se registran en `used_replay_protection_entries` (línea 103-106)
- Tolerancia de timestamp ±300s (línea 80)
- Registro inmutable: self-test escribe a `TEMP_REGISTRY`, no al de producción (línea 22-23)

**Vulnerabilidades críticas:**

1. **El registro de claves es auto-generado.** La función `selfTest()` (línea 155-235) genera claves Ed25519, las registra en el registry, firma, y verifica — todo dentro del mismo proceso. En producción, un atacante con acceso al sistema de archivos puede:
   - Reemplazar `TRUSTED_KEYS_REGISTRY_v27.json` con sus propias claves
   - O modificar el campo `status` de `"active"` a `"revoked"` o viceversa
   - No hay autoridad certificadora externa, no hay revocación real, no hay chain of trust

2. **El `production_note` del self-test lo confiesa:** (línea 179 del v28)
   ```
   "A real deployment requires an external key server, certificate authority, revocation policy, RFC 3161 TSA, and independent reviewer identity checks."
   ```
   Ninguno de estos existe.

3. **El RFC 3161 timestamp es simulado.** La función `parseRfc3161Timestamp()` (línea 59-63) simplemente parsea un string ISO — no verifica contra un Time Stamp Authority real. Un atacante puede fabricar cualquier timestamp.

4. **La protección contra replay es local.** `appendReplayEntry()` (línea 108-112) escribe al filesystem local. Un atacante que controle el filesystem puede eliminar entradas de replay protection.

5. **No hay separación de duties.** La misma persona que controla el repositorio controla el registry, las claves, los timestamps, y la verificación. Esto viola el principio fundamental de no-single-point-of-trust en sistemas criptográficos.

**Veredicto: El esquema Ed25519 es criptográficamente correcto como código pero operacionalmente nulo como garantía de confianza. En un despliegue real sin CA externa, el esquema proporciona seguridad equivalente a un archivo de configuración firmado por la misma persona que lo verifica — es decir, ninguna.**

#### C.2 El Auditor de Promociones Léxicas: ¿Compuerta Real o Filtro Regex Burlable?

**Análisis del script v28 (`audit-operational-term-promotions-v28.js`):**

**Fortalezas:**
- Ventana de propagación de 3 oraciones (v28, vs. 1 en v27)
- Regex expandida: `evinces?|substantiates?|corroborates?|constitutes evidence of|provides evidence for|lends credence to|verifies? the|attests? to|affirms?|vindicates?|compatible with|consistent with`
- Split de cláusulas por punto y coma y dashes (línea 92-94)
- Protección de abreviaturas, math inline y code inline (línea 64-80)
- 7 self-tests cubriendo casos de borde

**Vulnerabilidades de evasión:**

1. **Sinónimos no cubiertos:** El regex no incluye:
   - "entails" / "implies" / "necessitates"
   - "guarantees" / "ensures"
   - "is a signature of" / "is characteristic of"
   - "is indicative of" / "points to" / "suggests strongly"
   - "makes a compelling case for"
   - "it follows that" / "we conclude that" (en contextos de claim fuerte)
   - Construcciones pasivas: "is established by" / "is demonstrated"
   - Negaciones de no-claims: "is not merely internal" / "cannot be dismissed as"

2. **Evasión por reestructuración gramatical:**
   - "The data are what one would expect if consciousness were present" → no match
   - "These results leave no room for alternative explanations" → no match
   - "The framework performs exactly as predicted for a system with genuine identity" → no match
   - "No rival model can reproduce these observations" → no match (no dice "proves" pero implica soporte fuerte)

3. **Evasión por dispersión:** Una claim fuerte puede dividirse en múltiples oraciones, ninguna de las cuales individualmente matchea el regex, pero cuya conjunción es una claim de soporte:
   - "The model fits. No rival does. The p-value is negligible. This is not a synthetic result."
   → 4 oraciones, ninguna matchea, pero la conjunción es una claim de evidencia.

4. **El regex `consistent with` es over-inclusive.** "The data are consistent with the null hypothesis" es un uso legítimo y no-promocional de "consistent with", pero el regex lo marcaría si no hay boundary disclaimer adyacente.

**Veredicto: El auditor léxico es un filtro regex con ~60% de cobertura de sinónimos de promoción. Es útil como recordatorio de higiene de lenguaje pero **no es una compuerta de seguridad semántica real**. Un autor determinado puede evadirlo completamente mediante sinónimos no listados, construcciones pasivas, o dispersión de claims. Su valor principal es simbólico — demuestra que el framework piensa en la higiene del lenguaje, pero no la garantiza.**

#### C.3 Fragilidad de Scripting y Dependencia de Datos Stale

**Análisis del acoplamiento secuencial en la suite:**

El flujo de ejecución es:

```
1. calibrate-session-zero-thresholds-v27.js → escribe THRESHOLD_NULL_CALIBRATION_v27.json
   → MODIFICA el fixture inyectando umbrales calibrados (línea 147-152)
2. external-session-zero-adjudicator-v27/v28.js → lee fixture (con umbrales inyectados)
   → escribe SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27/v28.json
3. audit-v27-superior-gaps.js → lee fixture + adjudicación + calibración + promotion audit + signature test
   → escribe V27_SUPERIOR_GAP_AUDIT.json
```

**Vulnerabilidades de stale data:**

1. **El calibrador modifica el fixture in-place** (línea 147-152 del calibrador):
   ```javascript
   manifest.decision_thresholds.support_gain_aicc = supportGainAicc;
   manifest.decision_thresholds.mi_leakage_threshold = miLeakageThreshold;
   writeJson(MANIFEST, manifest);
   ```
   Esto significa que el fixture en disco es mutado como side-effect de la calibración. Si el adjudicador se ejecuta antes que el calibrador, usará umbrales stale o ausentes. Si se ejecuta después, usará umbrales derivados del mismo fixture. En ambos casos, el resultado es circular o desactualizado.

2. **No hay locking o checksum verification entre pasos.** El adjudicador v28 verifica hashes del dataset, prediction bundle, y calibration report (línea 308-313), pero el calibrador escribe el calibration report y modifica el fixture en la misma ejecución. Los hashes se calculan después de la mutación, no antes.

3. **El gap audit lee 5 archivos JSON pre-generados** (línea 43-47):
   ```javascript
   const manifest = readJson("docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
   const adjudication = readJson("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json");
   const calibration = readJson("docs/reports/THRESHOLD_NULL_CALIBRATION_v27.json");
   const promotion = readJson("docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v27.json");
   const signature = readJson("docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v27.json");
   ```
   Si cualquiera de estos archivos es stale (generado en una ejecución anterior con parámetros diferentes), el gap audit PASS/FAIL es irrelevante.

4. **No hay nonce de ejecución ni session identifier** que vincule los archivos de una misma run. Cualquier combinación de archivos de diferentes runs producirá un reporte inconsistente sin detección.

**Veredicto: El acoplamiento secuencial débil introduce riesgos de consistencia de estado. La mutación in-place del fixture por el calibrador es particularmente peligrosa — es un anti-patrón de pipeline que viola la inmutabilidad de datos de entrada. Se requiere un sistema de build con fingerprinting de sesión completa para garantizar reproducibilidad.**

---

## 4. VEREDICTO POPPERIANO Y PUNTUACIÓN DE CREDIBILIDAD

### Criterio Popperiano Central

Un framework científico es creíble en la medida en que **arriesga predicciones falsables** y **sobrevive a intentos genuinos de refutación**. El criterio no es la sofisticación formal, la cantidad de scripts, o la auto-conciencia de limitaciones — es la **exposición a refutación empírica externa**.

### Evaluación por dimensiones

| Dimensión | Condición | Estado QICN v28 |
|-----------|-----------|-----------------|
| **Falsabilidad empírica** | Predicciones testables contra datos reales | PRED-01 a PRED-11 definidos pero **0 ejecutados contra datos reales** |
| **Rivales plausibles** | Modelos competidores con base teórica | Rival es straw-man confeso |
| **Revisión matemática independiente** | Pruebas verificadas por matemáticos externos | 0 de 77 teoremas revisados por humanos externos |
| **Replicación externa** | Resultados reproducidos por grupos independientes | 0 replicaciones |
| **Datos empíricos** | EEG, fMRI, o datos fenomenológicos reales | 0 datasets externos |
| **Inferencia estadística válida** | Residuales iid, n suficiente, rivales competitivos | DW≈0.038, n=8, rival trivial |
| **Gobernanza criptográfica** | PKI con CA externa, revocación, TSA | Auto-generado, sin CA |
| **Compuerta semántica** | Cobertura completa de promociones | ~60% cobertura de sinónimos |

### PUNTUACIÓN: **8 / 100**

**Justificación:**

- **+3 puntos** por honestidad intelectual: la demotion del Bridge Theorem a Conjecture, los governance boundaries, el `external_support_certified: false`, y el nonclaim de incompletitud constructiva son extraordinariamente raros en frameworks de esta naturaleza y demuestran un compromiso genuino con la no-inflación de claims.
- **+3 puntos** por ingeniería de gobernabilidad: las compuertas v28 (AR(1)-corrected AICc, Miller-Madow MI, DW strict mode, immutable registry, replay protection) son mejoras genuinas sobre v27.
- **+2 puntos** por la arquitectura de claims/ledger/falsification matrix: la estructura de PRED-01 a PRED-11 con condiciones de soporte, debilitamiento y destrucción explícitas es metodológicamente sólida como diseño.
- **-0 puntos** por la teoría matemática: las pruebas internas (punto fijo, estabilidad aproximada, ruptura por pérdida de invariantes) son correctas como matemática, pero no conectan con datos empíricos.
- **-92 puntos** porque: cero datos empíricos, cero revisión externa, cero replicación, rival straw-man, fixture con DW≈0.038 que destruye la base inferencial, bridge conjecture sin prueba de existencia de estimadores, y un esquema criptográfico sin CA externa.

La puntuación de 8/100 refleja que el framework tiene **infraestructura de integridad** sin **contenido de verificabilidad**. Es un escudo sin espada.

---

## 5. RECOMENDACIONES DE HARDENING CIENTÍFICO

### Prioridad 1 (Sin esto, nada de lo demás importa)

1. **Obtener un dataset empírico real.** Un solo dataset EEG/fMRI con paradigma experimental pre-registrado que测试 PRED-01 (coherencia espectral residual) vale más que 30 scripts de auto-verificación. Sin datos reales, el framework es formalmente hermético y empíricamente vacío.

2. **Implementar un rival plausible.** Reemplazar el `constant_noise_floor_placeholder` por al menos uno de:
   - Un modelo de Integrated Information Theory (IIT 3.0/4.0) con parámetros ajustados
   - Un modelo de Global Workspace Theory (GWT) con métricas de broadcasting
   - Un modelo de Predictive Processing (PP) con free-energy minimization
   Si el modelo QICN no puede superar a IIT o GWT en AICc sobre datos reales, la claim de superioridad predictiva es refutada.

3. **Revisión matemática independiente.** Los 77 teoremas marcados como `proved_but_not_human_reviewed` en `theory_dependency_graph.v1.json` necesitan ser enviados a al menos un matemático profesional para verificación. Un solo contra-ejemplo de un revisor externo invalidaría todo el edificio deductivo.

### Prioridad 2 (Necesario para credibilidad estadística)

4. **Aumentar n a ≥30.** Con n=8 y k=6, cualquier inferencia estadística es especulativa. Un dataset con ≥30 puntos de medición (ej. 30 sujetos, 30 trials, o 30 ventanas temporales) reduciría la corrección AICc de 84 a ~3, haría viable el test de Ljung-Box, y permitiría estimación de MI con bins≥5.

5. **Corregir el fixture DW o descartarlo.** DW≈0.038 es patológico. Si los datos sintéticos son generados por un proceso con ρ≈0.98, el modelo de ruido iid es incorrecto por construcción. Se requiere:
   - Generar datos sintéticos con estructura de autocorrelación declarada y modelada explícitamente
   - O generar datos iid con verificación DW ∈ [1.5, 2.5]
   - O descartar el fixture sintético y usar solo datos empíricos

6. **Cerrar la prueba de existencia del Bridge Conjecture.** Sin una demostración (constructiva o por Hahn-Banach/compactness) de que los estimadores {G_i} existen para las seis invariantes QICN, el bridge es una tautología condicional. Esto es un problema de análisis funcional, no de software.

### Prioridad 3 (Necesario para gobernabilidad en producción)

7. **Implementar PKI con CA externa.** El esquema Ed25519 actual es un sistema de firma sin infraestructura de confianza. Se requiere:
   - Integración con una CA (ej. Let's Encrypt, DigiCert) o un sistema de web-of-trust
   - Revocación de claves via CRL/OCSP
   - Timestamping via TSA real (ej. DigiStamp, Surety)
   - Separación de duties: el autor del framework no debe controlar el registry de revisores

8. **Hacer el pipeline inmutable.** Eliminar la mutación in-place del fixture por el calibrador. Implementar:
   - Session IDs que vinculan todos los artefactos de una misma run
   - Content-addressable storage (cada artefacto referenciado por hash)
   - Build pipeline con Make/Snakemake que verifique dependencias antes de ejecutar

9. **Expandir el auditor léxico a análisis semántico.** El regex actual es burlable. Alternativas:
   - Clasificador de claims fuertes vs. débiles entrenado sobre el corpus del propio framework
   - Análisis de implicatura (lo que se implica sin decir explícitamente)
   - Revisión humana de claims en cada paper (complemento del filtro automático)

### Prioridad 4 (Para reputación académica)

10. **Publicar en revista con revisión por pares.** Los 10 papers existen solo como PDFs internos. Sin revisión por pares en una revista de Física Matemática, Filosofía de la Ciencia, o Neurociencia Computacional, el framework no existe para la comunidad científica internacional. Un solo paper en *Foundations of Physics* o *Journal of Mathematical Psychology* con los resultados del Bridge Conjecture (incluso como conjecture negativa) tendría más impacto que todo el corpus interno combinado.

---

**FIN DEL REPORTE DE AUDITORÍA**

*Este reporte no certifica soporte externo, consciencia, fenomenalidad, transferencia de identidad, cierre del bridge burden, ni revisión matemática humana.*
