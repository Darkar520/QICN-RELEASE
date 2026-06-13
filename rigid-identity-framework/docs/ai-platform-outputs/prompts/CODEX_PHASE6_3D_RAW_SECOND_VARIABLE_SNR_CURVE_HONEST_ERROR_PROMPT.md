# PROMPT ONE-SHOT — Fase 6.3D (segunda variable cruda + curva recuperación-vs-SNR + métrica de error honesta con ruido)

## INSTRUCCIONES DE USO

Este es un prompt **one-shot** para una plataforma de IA con permisos de
escritura, ejecutado dentro del repositorio:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Tu tarea es cerrar la **deuda de protocolo** documentada explícitamente al
final del reporte de Fase 6.3C:

`docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3C_POWER_AND_BORDERLINE_REPORT.md`

Esa deuda dice textualmente que la Fase 6.3D debe **o bien extraer en crudo las
primitivas restantes, o bien añadir criterios más estrictos de ruido/robustez
antes de cualquier congelamiento de protocolo canónico**, porque la condición
`noise_qicn_0_35` produjo `QICN_BOUNDED_SUPPORT_FOR_TARGET` cuando se esperaba
`INCONCLUSIVE`.

Este prompt te pide atacar exactamente **tres puntos** y nada más:

1. **Segunda variable cruda.**
2. **Curva recuperación-vs-SNR.**
3. **Métrica de error honesta que incluya ruido.**

No amplíes el alcance. No congeles ningún protocolo canónico. No declares
"readiness empírica".

---

## 0. Contexto mínimo (lee antes de tocar nada)

Estado actual de Fase 6.3C:

- Solo **`QICN_SIPM`** se extrae en crudo, vía
  `docs/ai-platform-outputs/sims/qicn_phase6_3c_selflocus_extractor.js`.
- Las variables **`QICN_OFIA`, `QICN_CFS`, `QICN_FPPG`, `QICN_WRI`** siguen
  siendo "cooked"/candidatas (toy). El reporte 6.3C reconoce que estas variables
  cocinadas "pueden seguir cargando la superficie de decisión demasiado fuerte".
- El simulador de poder es
  `docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js`.
- El barrido de ruido actual es de **4 puntos discretos** (`0.05`, `0.20`,
  `0.35`, `0.50`) y el único fallo conocido es `noise_qicn_0_35`.
- La "accuracy" agregada reportada es `0.9000` a nivel condición — pero ese
  número **esconde** el falso soporte bajo ruido moderado.

Lectura obligatoria previa (no editar):

1. `INSTRUCCIONES.md`
2. `ROADMAP.md`
3. `docs/CLAIM_STATUS_POLICY.md`
4. `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3C_POWER_AND_BORDERLINE_REPORT.md`
5. `docs/ai-platform-outputs/sims/qicn_phase6_3c_selflocus_extractor.js`
6. `docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js`
7. `docs/ai-platform-outputs/sims/qicn_phase6_3b_hot_model.js`
8. `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

---

## 1. Reglas de gobernanza (NO NEGOCIABLES)

- **No inflación de claims.** Nada de esto valida QICN, derrota HOT, prueba
  conciencia, prueba fenomenalidad, establece equivalencia humana, certifica un
  runtime, ni provee adjudicación externa. Todo artefacto debe llevar ese
  *boundary* explícito.
- **Interno ≠ externo.** Esto es conformidad/simulación interna sintética. No es
  validación externa ni curación humana. Mantén `human_review: REQUIRED` y
  `status: *_NON_CANONICAL`.
- **Itera, no regeneres.** Reutiliza el extractor 6.3C de `QICN_SIPM` y el brazo
  HOT 6.3B tal como están. No los reescribas ni los reemplaces.
- **No destructivo.** Crea archivos **nuevos**; no borres, muevas ni
  sobrescribas nada existente.
- **PROHIBIDO TOCAR:** `.tex`, PDFs, `release/`, `registry/`, `corpus/`,
  `artifacts/`, `monolithic/`, `basecore/`, `scripts/` de producción, macros,
  labels, IDs de registry. **NO** `git add -A`, **NO** commits amplios, **NO**
  push.
- **Separación de capas.** Los datos crudos sintéticos jamás deben filtrar
  `latent_truth`, `world_id`, `true_self_locus_id`, etiquetas esperadas, pesos
  cocinados ni variables QICN precomputadas hacia el extractor. Replica el patrón
  `information_boundary` del extractor 6.3C.
- **Dependency-free CommonJS.** Igual que el resto de `sims/`: `node` directo,
  sin dependencias, con `--self-test`.

---

## 2. Punto 1 — Segunda variable cruda

**Objetivo:** dejar de cocinar al menos **una** de las cuatro variables
restantes y extraerla en crudo, exactamente con la misma disciplina que
`QICN_SIPM`.

Requisitos:

1. Elige **`QICN_OFIA`** como segunda variable cruda (es la candidata
   recomendada por su peso en la superficie de decisión). Si justificas
   técnicamente otra de `{QICN_CFS, QICN_FPPG, QICN_WRI}`, documenta el porqué en
   el reporte, pero entrega **al menos una** variable cruda nueva.
2. Crea un nuevo extractor:
   `docs/ai-platform-outputs/sims/qicn_phase6_3d_<variable>_extractor.js`
   (p. ej. `qicn_phase6_3d_ofia_extractor.js`), espejando el contrato de
   `qicn_phase6_3c_selflocus_extractor.js`:
   - función `extract<Variable>(raw_trace)` que recibe **solo** `raw_trace`;
   - campos de salida: `schema_version`, `status:
     "candidate_extractor_non_canonical"`, `human_review: "REQUIRED"`,
     `human_curated_status: "not_reviewed"`, la variable cruda calculada,
     `support_threshold`, `passes_*`, y un campo `information_boundary` literal;
   - un `evaluateExtractor()` con `recovery` (≥60 seeds), `null_controls`
     (al menos 3 mundos nulos destructivos), y `ablation` (la señal cruda debe
     colapsar la variable al ablacionar las features que la sostienen);
   - criterio de PASS análogo: `accuracy > chance + 0.20`, `auc > 0.70`,
     `false_rate <= 0.10`, `mean_drop` de ablación `> 0.12`.
3. Genera las features crudas necesarias en el generador de trazas
   (`makeRaw*Case`) **sin** introducir el valor objetivo directamente: la
   variable debe emerger del cómputo sobre features de bajo nivel + ruido, nunca
   de un campo precocido.
4. Integra el nuevo extractor en el simulador de poder 6.3D (ver Punto 2): la
   superficie de decisión de QICN debe usar **dos** variables crudas
   (`QICN_SIPM` + la nueva) y las **cocinadas restantes** deben quedar
   claramente marcadas como cocinadas en el reporte.

---

## 3. Punto 2 — Curva recuperación-vs-SNR

**Objetivo:** reemplazar los 4 puntos de ruido discretos por una **curva
paramétrica** que muestre cómo se degrada la recuperación a medida que cae la
SNR.

Requisitos:

1. Crea el simulador
   `docs/ai-platform-outputs/sims/qicn_phase6_3d_snr_power_sim.js` (reutiliza
   el extractor 6.3C de `QICN_SIPM`, el nuevo extractor del Punto 1 y el brazo
   HOT 6.3B; no los dupliques, requiérelos con `require`).
2. Define **SNR explícitamente** y documéntalo en código y reporte. Sugerencia
   operacional: `SNR = strength / rawNoise` (o `20*log10(strength/rawNoise)` en
   dB; elige una y decláralo). No dejes la definición implícita.
3. Barre una **rejilla de SNR** de al menos **8 niveles** que cubra desde
   régimen claro hasta régimen de colapso (p. ej. variando `rawNoise` en
   `{0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.45, 0.60}` con `strength`
   fija, o variando `strength` con ruido fijo). Usa **≥30 seeds por nivel de
   SNR**.
4. Para cada nivel de SNR reporta, como mínimo:
   - SNR (valor numérico y unidad);
   - `mean QICN_SIPM` y `mean` de la nueva variable cruda, con IC95 bootstrap;
   - tasa de **recuperación correcta** (accuracy de identificación);
   - tasa de **falso soporte** (false-support rate);
   - AUC del brazo HOT y `ECE`;
   - clase de resultado obtenida (las 6.3A: `QICN_BOUNDED_SUPPORT_FOR_TARGET`,
     `HOT_FAVORED_FOR_TARGET`, `QICN_FALSIFIED_FOR_TARGET`, `BOTH_FAIL`,
     `INCONCLUSIVE`).
5. Emite la curva en forma **machine-readable** (array de puntos
   `{snr, recovery, false_support, mean_sipm, ...}`) dentro del JSON del
   `--self-test`, y en forma de **tabla** en el reporte. Marca el/los punto(s)
   donde la recuperación cruza el umbral de soporte y donde el falso soporte
   supera el límite tolerado.
6. La curva debe **reproducir y localizar** el fallo `noise_qicn_0_35`: muestra
   si con dos variables crudas + criterios más estrictos el falso soporte a esa
   SNR baja por debajo del límite, o si persiste. No ocultes el resultado en
   ninguno de los dos casos.

---

## 4. Punto 3 — Métrica de error honesta que incluya ruido

**Objetivo:** sustituir la "accuracy = 0.9000" agregada (que promedia y esconde
el escape bajo ruido) por una métrica que **penalice explícitamente** el falso
soporte bajo ruido moderado.

Requisitos:

1. Define en código una métrica compuesta **noise-honest** que NO promedie el
   falso soporte hasta desaparecerlo. Como mínimo debe incluir:
   - **falso-soporte ponderado por SNR**: el falso soporte en SNR moderada/alta
     pesa más que en SNR de colapso (un falso positivo con ruido bajo es más
     grave que con ruido extremo);
   - el **área bajo la curva de falso-soporte vs SNR** (cuanto mayor, peor);
   - la **peor** SNR a la que ocurre falso soporte (worst-case, no promedio);
   - la **brecha de recuperación**: SNR mínima a la que aún hay recuperación
     correcta por encima del azar con control destructivo en cero.
2. Reporta **ambas** cifras lado a lado: la accuracy agregada "ingenua" (como
   en 6.3C) y la métrica honesta nueva, dejando ver la diferencia. La métrica
   honesta debe penalizar el caso `noise_qicn_0_35` aunque la accuracy ingenua
   lo disimule.
3. Mantén el principio de **controles destructivos**: si un control negativo
   pasa a cualquier SNR, esa SNR se clasifica como
   `QICN_FALSIFIED_FOR_TARGET` antes de poder otorgar soporte; la métrica honesta
   debe reflejarlo.
4. Define un **criterio de aprobación explícito y más estricto** para la fase:
   p. ej. "no se otorga soporte agregado si existe falso soporte por encima del
   límite a cualquier SNR con ruido ≤ 0.35". Declara el umbral en código y
   justifícalo en el reporte. El `--self-test` debe salir con código `0` solo si
   se cumple ese criterio; en caso contrario, código distinto de cero con la
   razón.

---

## 5. Self-test obligatorio

Ambos archivos nuevos deben soportar `--self-test` y ejecutarse sin
dependencias:

```powershell
cd C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework
node docs\ai-platform-outputs\sims\qicn_phase6_3d_<variable>_extractor.js --self-test
node docs\ai-platform-outputs\sims\qicn_phase6_3d_snr_power_sim.js --self-test
```

Reporta los **exit codes** reales obtenidos. No los inventes.

---

## 6. Entregables (y solo estos)

1. `docs/ai-platform-outputs/sims/qicn_phase6_3d_<variable>_extractor.js`
   (nuevo extractor crudo, Punto 1).
2. `docs/ai-platform-outputs/sims/qicn_phase6_3d_snr_power_sim.js`
   (simulador con curva recuperación-vs-SNR + métrica honesta, Puntos 2 y 3).
3. `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3D_RAW_SECOND_VARIABLE_AND_SNR_REPORT.md`
   con:
   - boundary de no-inflación;
   - qué segunda variable se extrajo en crudo y qué variables siguen cocinadas;
   - tabla de la curva recuperación-vs-SNR;
   - comparación métrica ingenua vs métrica honesta;
   - resolución explícita del caso `noise_qicn_0_35` (corregido o persistente);
   - comandos `--self-test` y exit codes reales;
   - riesgos residuales;
   - status final: `PHASE6_3D_*_NON_CANONICAL` (PASS o
     PASS_WITH_REPORTED_PROTOCOL_DEBT según el criterio del Punto 3.4).
4. Entrada nueva en `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`
   (fecha, plataforma, request, archivos leídos/creados, comandos + resultados,
   hashes SHA256 de los archivos nuevos, riesgos residuales, próximo paso).

NO crees ningún otro archivo. NO modifiques los simuladores/extractores 6.3B/6.3C.
NO hagas commit ni push.

---

## 7. Criterios de éxito

1. ✅ Existe al menos **una segunda variable cruda** con extractor propio,
   contrato espejo del de `QICN_SIPM` e `information_boundary` intacto.
2. ✅ El simulador produce una **curva recuperación-vs-SNR** con ≥8 niveles,
   ≥30 seeds/nivel, SNR definida explícitamente, salida machine-readable + tabla.
3. ✅ La **métrica de error honesta** penaliza el falso soporte bajo ruido y se
   reporta junto a la accuracy ingenua; el caso `noise_qicn_0_35` queda resuelto
   o reportado sin esconderse.
4. ✅ Ambos `--self-test` corren dependency-free; exit codes reportados tal cual.
5. ✅ Reporte + entrada de ledger creados; boundaries de no-inflación e
   interno≠externo presentes.
6. ✅ Cero archivos prohibidos tocados; sin commit/push.

---

## 8. Frase de cierre

> Tres puntos, nada más: una segunda variable **cruda**, una **curva
> recuperación-vs-SNR**, y una **métrica de error que sea honesta sobre el
> ruido**. Si el falso soporte a ruido moderado persiste, repórtalo como deuda
> de protocolo abierta — nunca lo promedies hasta hacerlo desaparecer. Si dudas,
> prefiere la formulación más débil y defendible, y detente a preguntar.

---

FIN DEL PROMPT
