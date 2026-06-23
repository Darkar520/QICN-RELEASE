# Andamiaje de Preregistro / Protocolo Empírico EXTERNO — Gap G1.1

Sello de gobernanza (obligatorio en todo artefacto de este paquete):

```
status_class           = NON_CANONICAL
epistemic_class        = SPECULATIVE_SCAFFOLD
evidence_class         = NOT_EXTERNAL_VALIDATION
external_support_certified = false
FULL_COP_MEMBERSHIP    = NOT_YET
claim_promotion        = NONE  (nada se eleva a NEW_CLAIM)
```

Boundary literal: este documento es **solo estructura**. No contiene datos, no
ejecuta predicciones, no simula resultados y no certifica soporte externo,
conciencia, fenomenalidad, transferencia de identidad, agencia, estatus moral ni
cierre de la carga del puente (bridge-burden). Define **qué tendría que medir un
experimentador humano independiente** y **qué tendría que congelarse antes** de
recolectar datos, con placeholders explícitos. Ningún gate cambia de estado por
la existencia de este archivo.

Placeholders permitidos (cero fabricación):
`TO_BE_MEASURED`, `TO_BE_PREREGISTERED`, `TO_BE_FROZEN_BEFORE_DATA_COLLECTION`,
`TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`, `TO_BE_FILLED_AFTER_FREEZE`.

Artefactos hermanos de este andamiaje:
- `EXTERNAL_SESSION_ZERO_MANIFEST_SCAFFOLD_G1.1.json` (copia derivada del
  template canónico, NO el template; `measurement_points: []`).

Fuentes leídas para construir el mapeo (no editadas):
- `docs/templates/EXTERNAL_SESSION_ZERO_MANIFEST.template.json` (template canónico).
- `scripts/external-session-zero-adjudicator-v30.js` (motor estadístico).
- `scripts/external-session-zero-adjudicator-v31.js` (gates foundation-first).
- `docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md` (estados de calibración).
- `registry/prediction-canon-map.json` (mapeo PRED-01..11 + PRED-EXT-01).
- `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json` (forma sintética de referencia, NO empírica).
- `docs/templates/EXTERNAL_DATASET_MANIFEST.template.json` (lineage de dataset externo).

---

## 1. Mapeo medición → schema (`measurement_points[i]`)

Cada entrada de `measurement_points` es un punto de medición independiente. El
adjudicador v30 calcula residuales `observed_delta - qicn_prediction` y
`observed_delta - rival_prediction`, los pondera por `1/measurement_sigma^2`, y
corre AICc/GLS + Durbin-Watson sobre la serie ordenada por `timestamp`. Por eso
cada campo debe corresponder a una **cantidad física/operacional real medida por
un instrumento declarado**, no a un número de conveniencia.

| Campo | Qué cantidad real lo llena | Unidades | Instrumento / condición | Cómo se obtiene |
|---|---|---|---|---|
| `id` | Identificador único e inmutable del punto (p. ej. `mNNN`). | adimensional (string) | Asignado por el protocolo de captura antes de mirar resultados. | `TO_BE_PREREGISTERED` (esquema de numeración congelado). |
| `timestamp` | Índice de orden temporal / sello de la observación. Define la secuencia para el diagnóstico de autocorrelación (DW). | s (UTC epoch) o índice entero monótono | Reloj del aparato de captura, sincronizado. | `TO_BE_MEASURED` (registrado en captura, no reordenable a posteriori). |
| `observed_delta` | La **variable observable real** bajo prueba (ver §2): el efecto medido sobre el coordinate de respuesta (p. ej. desplazamiento de distribución de estado targeted vs baseline). | unidad del observable declarado (ver §2; p. ej. distancia de variación total, adimensional 0–1) | Instrumento de medición del sistema bajo estudio. | `TO_BE_MEASURED`. |
| `qicn_prediction` | Valor predicho a-priori por QICN para `observed_delta`, **congelado antes** de la captura, derivado del modelo con parámetros preregistrados. | misma unidad que `observed_delta` | N/A (cómputo cerrado del modelo). | `TO_BE_PREREGISTERED` + `TO_BE_FROZEN_BEFORE_DATA_COLLECTION` (con hash del bundle de predicción). |
| `rival_prediction` | Valor predicho a-priori por el modelo rival no-paja (ver §2), congelado en el mismo acto. | misma unidad que `observed_delta` | N/A (cómputo cerrado del rival). | `TO_BE_PREREGISTERED` + `TO_BE_FROZEN_BEFORE_DATA_COLLECTION`. |
| `measurement_sigma` | Desviación estándar del **ruido de medición declarado** del instrumento para ese punto. | misma unidad que `observed_delta` | Caracterización metrológica del instrumento (repetibilidad, calibración del sensor). | `TO_BE_MEASURED` por caracterización de ruido **independiente de QICN** (ver regla anti-circular abajo). |
| `noise_floor` | Piso de actividad basal del observable en condición de control (usado por la estimación de efecto ponderado y por la regla de exclusión `max_noise_floor`). | misma unidad que `observed_delta` | Medición en condición baseline/sham. | `TO_BE_MEASURED`. |

Campos auxiliares que el adjudicador también consume (presentes en la forma de
referencia) y que deben preregistrarse como columnas del dataset, no inventarse:
`separator_id`, `response_coordinate`, y las columnas de estimador del
`bridge_certificate` (`*_estimate`). Su contenido es `TO_BE_MEASURED` o
`TO_BE_PREREGISTERED` según corresponda.

### Regla de estimación de `measurement_sigma` (anti-circular, no negociable)

`measurement_sigma` debe estimarse a partir de la **física del instrumento** o de
**réplicas técnicas/condiciones de control**, NUNCA ajustándose para que el
chi-cuadrado reducido contra QICN dé "bien". El adjudicador v30 ya bloquea fugas
estructurales (`affine_fit_qicn_prediction_from_observed_delta`,
`reduced_chi_squared_against_declared_sigma`): un `measurement_sigma` inflado
para pasar esos gates es una violación de protocolo. Procedimiento admisible:

1. Caracterizar el ruido del instrumento con réplicas técnicas o señal de control
   **antes** de exponer cualquier predicción QICN a los datos.
2. Congelar `measurement_sigma` por punto (o un modelo de ruido por canal) en el
   acto de preregistro.
3. Documentar el método de estimación en `notes` del manifest.
4. Prohibido: re-estimar `measurement_sigma` después de ver residuales QICN.

---

## 2. Predicción que se aterriza primero

**Recomendación: PRED-EXT-01 como la PRIMERA predicción a llevar a versión
empírica externa.** Justificación operacional (no es un claim de soporte):

- Es la **única semilla de predicción externa** en `registry/prediction-canon-map.json`
  (`registry_extension_not_in_latex_matrix`), diseñada explícitamente para vivir
  fuera de la matriz de Paper 6 hasta tener evidencia externa.
- Es la predicción que el **adjudicador external-session-zero consume
  directamente**: su schema (selectividad de desplazamiento de distribución de
  estado bajo perturbación targeted vs sham vs off-target) ya está mapeado al
  manifest. Aterrizarla primero minimiza el riesgo de inventar un schema nuevo.
- Ya tiene un **rival no-paja preespecificado** (suite trace-memory Markov de
  profundidad 1/2/3), evitando el gate `BLOCKED_STRAW_MAN_RIVAL_VARIANCE`.
- Su versión sintética v3 (clean-room) ya ejerció los controles negativos, así que
  el salto a empírico es de **origen de datos**, no de diseño desde cero.

> Nota de alcance: que sea la más medible **no** significa que esté más cerca de
> ser verdadera. Solo significa menor distancia de andamiaje hasta un protocolo
> ejecutable por terceros.

### Definición operacional (a preregistrar, placeholders)

- **Sistema bajo estudio:** `TO_BE_PREREGISTERED` (debe declararse el sustrato
  físico/operacional real; NO el runtime QICN auto-evaluándose — ver §4 y la
  frontera LLM-runtime de `INSTRUCCIONES.md` §6.1).
- **Variable observable (`observed_delta`):** desplazamiento de la distribución de
  estado tras una perturbación dirigida a un separador de identidad, medido como
  distancia de variación total (TV) entre la distribución post-perturbación y la
  baseline, restando piso de ruido. Unidad: TV ∈ [0,1], adimensional.
- **Condiciones (mínimo cuatro brazos):** `baseline`, `targeted_post`,
  `sham_post`, `off_target_post`. La selectividad exige
  `tv_targeted > max(tv_sham, tv_off_target, epsilon_floor)`.
- **Perturbación:** debe provenir de una **fuente independiente** del modelo
  (`perturbation_source = independent`), tipada como witness externo, no como
  ajuste interno (gate `BLOCKED_TYPE_CONFUSION` del v31).

### Modelo rival NO-paja (`rival_prediction`, a preregistrar)

- **Familia rival:** suite trace-memory Markov de profundidad 1, 2 y 3
  (`RIVAL-TRACE-MEMORY-01-depth{1,2,3}`), con suavizado de Laplace `lambda=1` y
  longitud mínima de traza preregistrada.
- **Por qué no es paja:** un Markov de orden ≥1 puede reproducir desplazamientos
  de distribución por memoria de traza sin invocar ninguna estructura QICN; es un
  competidor genuino. El gate v31 exige además
  `var(rival) >= 0.1 * var(observed)` salvo justificación preregistrada de un
  modelo constante. Un rival de "piso de ruido constante" **solo** es admisible
  como control adicional, nunca como el único rival.
- Valores concretos del rival: `TO_BE_PREREGISTERED` (derivados del ajuste del
  Markov sobre baseline congelada, antes de ver post-perturbación).

---

## 3. Requisitos de preregistro (congelar ANTES de recolectar datos)

Para evitar `BLOCKED_CIRCULAR_CALIBRATION` y death-rules inválidas, antes de tocar
un solo dato real deben congelarse y hashearse:

| Elemento | Estado objetivo | Placeholder |
|---|---|---|
| `preregistration_hash` | SHA256 del documento de preregistro completo. | `TO_BE_FILLED_BEFORE_DATA_COLLECTION` |
| Bundle de predicción QICN (`qicn_prediction` por punto) | Congelado, con `frozen_before_outcome_analysis = true` y hash. | `TO_BE_PREREGISTERED` |
| Bundle de predicción rival (`rival_prediction` por punto) | Congelado en el mismo acto, con hash. | `TO_BE_PREREGISTERED` |
| `decision_thresholds` | `support_gain_aic`, `weakening_gain_aic`, `minimum_ci_lower`, `minimum_admissible_n` congelados ANTES y justificados por simulaciones null/rival NO ajustadas a QICN. | frozen (valores del template como punto de partida, recalibrar externamente) |
| Reglas de exclusión | `allowed_reason_codes` (solo `sensor_dropout_gt_5s`, `timestamp_corruption`, `predeclared_hardware_failure`), `max_noise_floor`, `max_exclusion_fraction`. | frozen |
| `minimum_admissible_n` | n mínimo admisible tras exclusiones (template: 8). El n real debe declararse por un análisis de potencia preregistrado. | `TO_BE_PREREGISTERED` (≥ template) |
| Modelo de `measurement_sigma` | Método de estimación de ruido independiente de QICN. | `TO_BE_PREREGISTERED` |
| Esquema de IDs / timestamps | Numeración y orden temporal fijados antes de captura. | `TO_BE_PREREGISTERED` |

Regla de oro: **ningún umbral ni parámetro puede modificarse después de ver los
datos.** Cualquier cambio post-hoc invalida la corrida y la convierte en
exploratoria (no confirmatoria).

---

## 4. Holdout externo y adjudicador independiente

Transición de calibración requerida (de `THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md`):

```
synthetic_engineering_gate  ──►  externally_calibrated_holdout
```

Para habilitarla deben cumplirse TODAS estas condiciones (alineadas con la
death-rule del protocolo y el gate `calibration_lineage` del v31):

1. `threshold_calibration_lineage.fixture_blind = true`
   (`TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`).
2. `threshold_calibration_lineage.generated_before_fixture_scoring = true`.
3. `threshold_calibration_lineage.external_holdout_used = true`: los umbrales se
   calibran sobre un holdout independiente o un ensemble null/rival **no ajustado
   a QICN**, antes del scoring final.
4. Hashes congelados: data hash, prediction bundle hash, code hash, exclusion log.
5. Al menos una familia rival no trivial ejecutada bajo los mismos datos y reglas
   de exclusión.
6. Las fixtures sintéticas quedan **excluidas** de la promoción de soporte.

### Por qué el adjudicador NO puede ser el mismo runner

- El runner que **genera/congela** predicciones QICN no puede ser quien decide si
  pasaron: eso es calibración circular (`BLOCKED_CIRCULAR_CALIBRATION`).
- El adjudicador independiente debe: (a) recibir los datos con etiquetas cegadas
  (`blinding_status = labels_blinded`), (b) no tener acceso al proceso de
  generación de predicciones, (c) ejecutar el scoring con umbrales ya congelados,
  (d) firmar el decision record (`reviewer_signature`).
- Frontera LLM-runtime (`INSTRUCCIONES.md` §6.1): el runtime QICN / cualquier LLM
  backend **no** es el sujeto ni el juez. Produce conformance interna, no
  validación externa. El adjudicador debe ser un tercero humano/proceso
  independiente del corpus.

Campos: `adjudicator = independent_adjudicator_required` →
`TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`.

---

## 5. Diagnóstico de dependencia temporal (autocorrelación / DW)

El adjudicador v30 corre Durbin-Watson y Ljung-Box sobre los residuales ordenados
por `timestamp`, y bloquea con `BLOCKED_TEMPORAL_DEPENDENCE_STRICT` si detecta
autocorrelación severa. Para no caer ahí:

- **Muestreo preferente:** puntos de medición **independientes** (sujetos/sesiones
  distintos, o intervalos separados más allá del tiempo de autocorrelación del
  sistema) de modo que los residuales se aproximen a iid.
- Declarar el **intervalo de des-correlación** estimado y espaciar las capturas al
  menos ese intervalo. Valor: `TO_BE_MEASURED`.
- Si la dependencia temporal es inevitable (serie continua de un mismo sistema),
  declarar `temporal_dependence_policy` explícita:
  - `method`: p. ej. `durbin_watson_residual_diagnostic` + modelo AR(1)/GLS.
  - `acceptable_range`: rango DW preregistrado (la forma sintética usa `[0.5, 3.5]`
    como diagnóstico, NO como pase de soporte).
  - `action_on_violation`: bloquear soporte externo hasta modelar la dependencia
    (GLS/AR(1)) con parámetros preregistrados.
- Prohibido: reordenar puntos o elegir el subconjunto que minimiza DW después de
  ver los datos.

---

## 6. Checklist de admisibilidad (de "rechazado por sintético" a "evaluable")

Un dataset real solo pasa de rechazo-por-sintético a **evaluable** cuando TODAS
estas condiciones se cumplen (placeholders hasta que un tercero las llene):

- [ ] `status = external_dataset` (no `synthetic_fixture`, no
      `external_dataset_required`). → `TO_BE_FILLED_AFTER_FREEZE`
- [ ] `dataset_origin` NO sintético (p. ej. `non_synthetic_required` satisfecho
      con procedencia real). → `TO_BE_FILLED_AFTER_FREEZE`
- [ ] `dataset_sha256` congelado tras el freeze del dataset. → `TO_BE_FILLED_AFTER_FREEZE`
- [ ] `dataset_provenance` y `third_party_owner_or_custodian` declarados
      (template de dataset externo). → `TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`
- [ ] `blinding_status = labels_blinded`. → `TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`
- [ ] `perturbation_source = independent`. → `TO_BE_PREREGISTERED`
- [ ] Lineage de calibración fixture-blind: `fixture_blind = true`,
      `generated_before_fixture_scoring = true`, `external_holdout_used = true`.
      → `TO_BE_FILLED_BY_INDEPENDENT_ADJUDICATOR`
- [ ] `measurement_points` no vacío con n ≥ `minimum_admissible_n` tras
      exclusiones. → `TO_BE_MEASURED`
- [ ] `measurement_sigma` estimado por ruido declarado, no ajustado a QICN. → §1
- [ ] Al menos un rival no-paja con `var(rival) ≥ 0.1·var(observed)`. → §2
- [ ] Diagnóstico de dependencia temporal documentado (§5).
- [ ] `external_support_certified` permanece `false` hasta que un adjudicador
      independiente firme el decision record. (Por diseño del runner, este flag
      es siempre `false` en el código actual.)

Mientras cualquier casilla siga en placeholder, el dataset **no es evaluable** y
ningún resultado puede presentarse como soporte externo.

---

## 7. Veredicto honesto

Esto es **solo estructura (andamiaje)**. Conclusiones explícitas:

1. **No acerca el corpus a validación externa.** Define qué medir y qué congelar,
   pero no contiene datos, no ejecuta predicciones y no simula resultados.
2. **Ningún gate cambió de estado.** `external_support_certified` sigue `false`;
   la calibración sigue `synthetic_engineering_gate`; PRED-EXT-01 sigue siendo una
   semilla externa con corrida solo clean-room sintética.
3. **El siguiente paso es humano/tercero, no de IA.** Hace falta que un
   experimentador recolecte datos reales de un sistema declarado, preregistre y
   congele predicciones y umbrales, y que un adjudicador independiente (distinto
   del runner) ejecute el scoring con etiquetas cegadas y firme un decision
   record. Solo entonces tendría sentido hablar de holdout externamente calibrado.
4. **Riesgo residual principal:** que este andamiaje se lea como evidencia. No lo
   es. Cualquier uso de estos placeholders como si fueran mediciones es una
   violación de la regla científica (`INSTRUCCIONES.md` §6) y de la frontera
   interno/externo (`product.md`).

Deuda explícita que queda abierta tras este andamiaje:
- Población real de `measurement_points` por un tercero (no IA).
- Calibración externa de umbrales (null/rival no ajustado a QICN).
- Identificación del adjudicador independiente y firma del decision record.
- Declaración del sistema físico/operacional bajo estudio (sin auto-evaluación del
  runtime).
