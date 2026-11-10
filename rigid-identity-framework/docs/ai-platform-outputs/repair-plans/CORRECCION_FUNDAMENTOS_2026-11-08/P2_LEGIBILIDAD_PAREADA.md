# P2 · Legibilidad de respuestas pareadas

## Prerregistro

**Base:** `f87eaa9d607166976b89a3f411339021db696bac`. Alcance: Paper V, registro interno, monolito de trabajo, control racional, roadmap y ledger. Se preservan las fuentes y paquetes congelados de los otros papers. La unidad de análisis es un par ordenado de historias de un paso sobre el soporte común de siete perfiles. Los dos brazos se reinician desde el mismo estado, reciben el mismo comando de fase y sólo difieren en el signo del control. La intervención objetivo cambia el acoplamiento entre dos ensayos con la misma preparación. El decoder recibe únicamente los readouts de la respuesta, con el orden de los brazos fijo. La igualdad de la preparación y del comando se asegura mediante el diseño, antes de decodificar.

**Hipótesis y estimador.** Comparar `lambda=0` frente a `lambda∈[L,1/9]`, con `L=1/12`, en el estrato `b1=1`. Con `b1=0` ambos regímenes dan respuesta baja. Medir distancia circular en vueltas entre los canales tempranos de los brazos después de un paso. Fijar error adversarial por lectura en el máximo ponderado `eta=1/256`. Las dos clases resueltas tienen guardas inclusivas: baja hasta `L/2`, alta desde `3L/2`; en medio, abstención. Comparación primaria exacta, sin estimación poblacional externa ni intervalos de confianza. La cota determinista de incertidumbre para el estimador es `2 eta`.

**Salida esperada y controles.** L1: separación limpia exacta `L` en la métrica de pares. L2: ninguna pérdida de clase bajo el presupuesto. L3: mantener clase en trenes de al menos tres pares con reinicio y fase común variable. L4: cada ablación pareada con primer bit uno debe cambiar de alta a baja. L5: cero falsos cambios en ensayos sin ablación con bit y acoplamiento constantes; se incluye `b1=0` y fase común cambiante. Toda abstención cuenta como fallo de cobertura de su población, aun cuando no sea un falso cambio. L6: un bit y distorsión discreta cero para clases resueltas, dos bits si se almacena también la abstención.

**Falsadores.** Comprobar el punto de colisión `eta=L/2` con los cuatro canales y el tiempo cero, acoplamiento intermedio `L/2` fuera del intervalo certificado y un falso positivo al romper el emparejamiento de comandos. Enumerar todos los perfiles, tres fases, cuatro códigos ternarios, extremos del presupuesto y valores representativos de cada estrato con aritmética racional. Detener la fase si falla un control, si alguna población evaluada está vacía o si falla un verificador de conservación. Estas condiciones prueban la respuesta de este modelo y dejan abierta la pertenencia al criterio operacional general.


## Resultado matemático y controles

El Paper V define la ventana pareada y demuestra que la cota `|D_observado − D_limpio| ≤ 2 eta` vale en la métrica declarada, con errores arbitrarios en todos los canales y tiempos. Los casos racionales recorren errores de fase correlacionados dentro de cada brazo e independientes por enumeración entre brazos y pares. Son pruebas de regresión de la construcción, sin supuesto probabilístico de ruido ni de independencia entre observaciones.

| Cláusula | Resultado en la unidad pareada | Control exacto |
|---|---|---:|
| L1 · Separación | Distancia mínima limpia `1/12` vueltas. | 42 casos que alcanzan la cota |
| L2 · Robustez | A radio `1/256` vueltas la clase se conserva con cobertura completa. | 3.024 ventanas |
| L3 · Estabilidad | Clase constante a través de reinicios con comando común variable. | 244.944 trenes de tres pares |
| L4 · Intervención | Alta → baja al eliminar el acoplamiento con primer bit uno. | 0 fallos de 10.206 ablaciones |
| L5 · Control negativo | Cero cambios y cero abstenciones en ambos estratos del bit. | 0 fallos de 122.472 trenes por estrato, incluidos en L3 |
| L6 · Compresión | Un bit recupera exactamente la clase. Dos bits permiten registrar la abstención. | 3.024 conversiones de las ventanas de L2 |

En 42 casos por control, la colisión a `eta=L/2` y el acoplamiento intermedio `L/2` dieron abstención. En otros 42, separar los comandos de los brazos produjo una respuesta alta falsa con acoplamiento cero e idénticos readouts a una respuesta alta válida. Este último caso identifica una condición causal de adquisición: el mismo comando en ambos brazos. La preparación con primer bit cero da una lectura baja en ambos regímenes. Por tanto, inferir de ella una arquitectura desacoplada quedaría sin identificar. Los conteos se solapan como indica la tabla y describen enumeraciones, sin inferencia de error poblacional externo.

## Repaso del plan

| Fase | Estado y siguiente obligación |
|---|---|
| P0 · Base reproducible | Copia ordenada, verificación documental y punto de trabajo sincronizado. Queda reproducir el agregado Lean completo. |
| P1 · Fundamentos | Modelo no vacío y resultados acotados de métrica, transporte, lectura y dinámica. Quedan formalización analítica integral y revisión independiente. |
| P2 · Soporte común | Cinco testigos estructurales en el mismo soporte, una obstrucción explícita para etiquetas de estado bajo el sham y seis cláusulas comprobadas para respuestas pareadas. El sexto testigo estructural, el certificado conjunto y la independencia siguen abiertos. |
| P3 · Predicción diferencial | Siguiente fase. Fijar una variable de resultado que no se use en la clasificación, un rival con el mismo presupuesto de observación, controles y un criterio previo por el que cualquiera de los dos modelos pueda perder. Si el modelo actual carece de una predicción diferencial sobre ese resultado, registrar el límite antes de ampliarlo. |
| P4 · Puente y adjudicación | Mantener las hipótesis de puente y las correcciones de abstención y cobertura como obligaciones explícitas. Su evaluación depende de los resultados de P3. |
| P5 · Revisión y contraste | Revisar de forma independiente la demostración, el alcance causal y la reproducción. La sincronización de trabajo y la certificación externa son estados distintos. |


## Verificación de esta fase

- Tres verificadores de raíz aprobados en orden, `npm run verify:release` 6/6 y `npm run verify:math` 12/12. Registro de 812 entradas y 383 macros, sin bloqueos ni avisos. Comparación con el commit base: 810 entradas previas conservadas con sus metadatos, un teorema, una definición y una prueba nuevos, y el resto del texto de Paper V intacto.
- Veredictos crudos v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`. Todos con `external_support_certified=false`.
- `pdflatex`, `biber` y `npm run compile:monolithic` completados. `check-monolith.cjs` cotejó 12/12 capítulos. Los tres títulos nuevos están ausentes de la versión anterior y aparecen una vez en la fuente y en su sección generada. `pdftotext` los comprobó en ambos PDF. Cero referencias o citas indefinidas y cero etiquetas duplicadas. Los avisos de caja conservaron sus conteos anteriores (4/10 en Paper V, 3/334 en el monolito).
- Copia byte a byte de 730 archivos. Logs en `E:/QICN-PRESERVACION/2026-11-09-p2-legibilidad-f87eaa9/p2l-logs`. Se copiaron de vuelta los dos PDF y las doce secciones generadas con huellas verificadas. La entrada LaTeX del monolito conserva la misma huella.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| `paper5_operational_consciousness/main.pdf` | 37 | `c7887ad109316c7d811737cccdedaae5d8dd670eef7292ef789c27c51cc4782c` |
| `monolithic/QICN_MONOLITHIC.pdf` | 362 | `464800e50745d1d12c84ffc3a08d2f0136c7647d9a6a644ac692d4e87de211ee` |

El resultado nuevo queda como fase local separada, con demostración matemática escrita y controles racionales. La mecanización de este resultado, el agregado Lean y la revisión independiente quedan pendientes.
