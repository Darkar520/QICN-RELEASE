# Ejecución del estudio de comunicación y consulta tardía

Rama codex/desempate-hibrido desde 361f792. Estado de aceptación pendiente de Lean y commit. El prerregistro y su precisión previa a ejecución se conservan junto al inventario de hashes. El runtime se consultó en 1a1c94e en modo de lectura. Se cotejaron las reglas y el historial de ambos repositorios, los contratos de Paper V, IX y X, el ledger H1–H4, los prerrequisitos y la ejecución 361f792. En el runtime se revisaron runner, intervenciones, catálogo, preregistro histórico y abstracciones de adjudicación.

## Resultados y verificaciones

- V delimita la extensión al cociente finito medido a través de un transcript y la imposibilidad de la hipótesis de separación uniforme de todo par en un soporte compacto infinito con un vector finito de lecturas continuas. Se conserva la obstrucción al corte cero y el margen cofinal previo.
- IX conserva el quinto contraste y la réplica total. El teorema nuevo prueba el error uniforme exacto G bajo B<m para un transcript sellado, cero con B>=m, y cota media G(1-sqrt(2^(B-m))) incluso condicionando en semillas independientes. La proposición de margen deriva la perturbación 4eps y conserva R<=0 frente a la réplica total en la familia. Esta conclusión pertenece al calendario de observación declarado.
- X separa distinguir procedencia a ciegas de predecir mejor las respuestas. El diseño de campaña compara un híbrido recurrente con estado compartido y una réplica total. Incluye las seis cargas más ancestría completa, brazos P/H/E y adjudicación por bloques. No hay homologación completa del runtime, corte cuártico nativo ni trasplante sellado implementado en 1a1c94e. La campaña nodal y la extensión con Z_op permanecen futuras.
- Aritmética exacta: 27 configuraciones de m y B, reconstrucción del readout desde el modelo físico de la fase anterior, comparación de control con diferentes rutas y contraejemplo de réplica total, más controles de pérdida, trasplante, borrado, corte y fuga. La primera aserción exploratoria de mínimo medio para m=2,B=1 falló: G/2 sólo era el resultado del prefijo. La enumeración completa da 3G/8 con celdas de uno y tres estados. Se preserva el recibo y la cota previa.
- Registro conciliado por identidad de enunciado, tipo y papel, conservando los 927 IDs y todos sus enunciados. Se incluyen dos entradas nuevas, registro 929, macros 383. El denominador de cobertura es 444. Revisión final de enlaces Lean pendiente.
- Las tres unidades se recompilaron en E:. V50, IX76, X33 y monolito 444. El script inicialmente intentó biber en X, que carece de fichero bcf y no contiene bibliografía automatizada. Se conservaron el error y la continuación correcta con pdflatex hasta estabilizar referencias. Las comprobaciones finales del monolito y unidades no muestran overfull, referencias indefinidas ni duplicados.
- Copia aislada y logs ejecutables: E:/QICN-PRESERVACION/2026-11-18-desempate-hibrido/. Se conservan los hashes de 88 activos congelados y 202 superficies del runtime. No se tocaron main 5769ecf ni el checkpoint 5fd9d01.

Los márgenes del banco se refieren sólo a las condiciones matemáticas instrumentadas. A igual coste y grafo, R=0 para la réplica. La inversión incorrecta de respuesta tiene R=-2G=-1/1048576 frente a la réplica exacta. La política historica cn3_erased_history permanece false. La constatación documental no genera nuevos datos. H1-H4 y evidencia externa siguen pendientes. external_support_certified=false.

La comprobación incremental serial con las dependencias de 4.31.0 y objetos previos de 361f792 llegó a 521457664 bytes de RAM física disponible y se detuvo tras 33.62 s por el umbral de 500 MiB. Se conservan ambas fuentes en lean-draft, con hashes y sin importarlas al agregado. No se obtuvieron resultados del compilador ni de axiomas para ellas. La reproducción fresca queda pendiente. El paquete Lean activo conserva sus 40 fuentes y 348 declaraciones previas.

Raíz 3/3, release 6/6, matemáticas 36/36, prosa, corpus, macros, nonclaims, inflación semántica y cobertura aprobados; 444 objetivos, 14 coincidentes, 56 parciales, 358 pendientes y 16 de protocolo. Ver VERIFICACION_PARCIAL.json, EXACT_CONTROLS.json y LEAN_RESOURCE_STOP.json. La rama se conserva con cambios locales y sin commit de fase hasta resolver la puerta Lean.


## Reanudación Lean 4.31.0, integración del paquete activo y cierre técnico local (`2026-11-18`)

Con autorización del usuario para liberar memoria física y commit virtual (`Mem Reduct` y cierre de procesos externos pesados), se reanudó la verificación de Lean 4.31.0 en la copia aislada `E:/QICN-PRESERVACION/2026-11-18-desempate-hibrido/`, conservando `LEAN_RESOURCE_STOP.json` y `VERIFICACION_PARCIAL.json` como antecedente histórico intacto.

### 1. Depuración y verificación en el kernel de Lean 4.31.0
- **`QICNHybridBoundary.lean`** (`rigid-identity-framework/lean/QICNLean/QICNHybridBoundary.lean`, `16` teoremas/lemas públicos + `5` definiciones):
  - Se eliminó `import QICNLean.QICNMooreFactorization` no utilizado.
  - Se renombró la hipótesis no utilizada `_hG` en `collision_forces_response_error` y se limpió el argumento `simp` redundante en `deadline_capacity_lower`.
  - En `lateSign_abs`, se reemplazó `Finset.abs_prod` por una inducción explícita sobre `Finset.induction_on` usando `Finset.prod_insert` y `abs_mul`.
  - En `physical5_contrast`, se añadieron las reducciones `rfl` en `true` y `false` antes de reescribir con `QICNLean.FourRootContrast.physical_contrast`.
  - Resultado de compilación serial: `EXIT=0`, `0` warnings/errores (`40.64 s`).
- **`QICNIrreducibleObservation.lean`** (`rigid-identity-framework/lean/QICNLean/QICNIrreducibleObservation.lean`, `3` teoremas públicos):
  - En `irreducible_observation_injective`, se añadió `dsimp only` antes de `rw [map_sub, map_sub, sub_eq_zero]` en el paso generador de `Submodule.span_induction`.
  - En `irreducible_product_bound`, se anotó explícitamente `(i : Fin (minpoly K A).natDegree)` en la hipótesis `herr`.
  - Resultado de compilación serial: `EXIT=0`, `0` warnings/errores (`106.20 s`).
- **Agregado `QICNLean.lean` y auditoría de axiomas (`RESUMPTION/LEAN_REPRODUCTION.json`)**:
  - Se añadieron `import QICNLean.QICNHybridBoundary` e `import QICNLean.QICNIrreducibleObservation` a `rigid-identity-framework/lean/QICNLean.lean`.
  - El paquete activo pasa de `40` a **`42` módulos fuente** (incluido el agregado `QICNLean.lean`, compilado con `EXIT=0` en `192.72 s`) y de `348` a **`367` teoremas/lemas públicos auditados** (`19` nuevos).
  - La auditoría `#print axioms` sobre los `367` teoremas/lemas públicos terminó con `EXIT=0` (`29.27 s`), verificando dependencias exclusivamente en `{Classical.choice, Quot.sound, propext}` (`faithful_quotient_injective` no depende de ningún axioma) y `0` ocurrencias de `sorry`, `admit`, `axiom`, `unsafe` o `partial`.

### 2. Sincronización de matriz de cobertura (`COVERAGE_MATRIX_419.json` / `.md`)
Sin sobre-promover ningún resultado a `EXACT_MATCH`, se vincularon los testigos verificados de `QICNHybridBoundary` y `QICNIrreducibleObservation` como **`FINITE_OR_PARTIAL_KERNEL`** (`GENERAL_OR_FINITE_COMPONENTS_EXPLICIT_SCOPE`) en cinco de los ocho objetivos recientes, declarando explícitamente sus obligaciones pendientes:
1. `basecore:theorem:thm-basecore-irreducible-observation` (`cyclic_independent`, `irreducible_observation_injective`, `faithful_quotient_injective`; pendiente recíproco por polinomio característico y métrica explícita $1/(p-1)$).
2. `paper5:theorem:thm-iint-irreducible-derivation` (`irreducible_observation_injective`, `irreducible_product_bound`, `certified_separator_survives`, `faithful_quotient_injective`; pendiente gramática completa de palabras `hold`/`A` y normalización $\delta_{\rm int}=1/[4(p-1)]$).
3. `paper9:theorem:thm-bridge-expanded-identification` (`proper5_contrast_zero`, `physical5_contrast`, `fifth_contrast_error_bound`, `fifth_contrast_mean_bound`, `five_root_decomposition`, `background5_proper`, `fifth_gap_attained`, `manuscript_fifth_constant`; pendiente pronósticos aleatorios condicionales y peso de grafo $w_c=G/(128B)$).
4. `paper9:theorem:thm-late-parity-transcript` (`unit_query`, `collision_forces_response_error`, `deadline_capacity_lower`, `lateSign_abs`, `centred_forecast_attains`; pendiente cota inferior media aleatoria $G(1-\sqrt{2^{B-m}})$ y cota superior por prefijo $G(1-2^{B-m})$).
5. `paper9:proposition:prop-late-transcript-noise-margin` (`signed_margin_stability`; pendiente paso al ínfimo sobre clase rival e invariancia intervencional de réplica total $R\le 0$).

Conteo actualizado en `verify-lean-coverage.py` (`passed=true`, `444` objetivos):
- `EXACT_MATCH`: `14`
- `FINITE_OR_PARTIAL_KERNEL`: `61` (antes `56`)
- `PENDING_MATHLIB`: `353` (antes `358`)
- `EMPIRICAL_OR_PROTOCOL_BOUNDED`: `16`
- `public_lean_declarations`: `367`

### 3. Batería final de puertas y fronteras científicas (`RESUMPTION/VERIFICACION_FINAL.json`)
- Todas las puertas raíz (`3/3`), validación de corpus (`929` entradas, `0` bloqueos), macros (`383`), sincronización de prosa, cobertura Lean (`444` objetivos / `367` declaraciones), `lint:nonclaims`, `audit:semantic-inflation`, `check_late_transcript.py`, `verify-math-regressions.py` (`36/36`) y `verify:release` (`6/6` en copia aislada `E:`) pasaron con `EXIT=0`.
- Conservación SHA-256 verificada sobre los `88` activos protegidos del marco y los `202` activos de `QICN-SYSTEM` (`1a1c94e`), así como las referencias `main` (`5769ecf`), `codex/etapa3b-lean` (`5fd9d01`) y `codex/fase-cientifica-atomic-puente` (`361f792`).
- Veredictos crudos intactos: `26: INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, `27/28/30: BLOCKED_MULTIPLE_GATES`, `31: BLOCKED_FOUNDATION_FIRST_GATES`.
- `cn3_erased_history=false` y `external_support_certified=false`.
