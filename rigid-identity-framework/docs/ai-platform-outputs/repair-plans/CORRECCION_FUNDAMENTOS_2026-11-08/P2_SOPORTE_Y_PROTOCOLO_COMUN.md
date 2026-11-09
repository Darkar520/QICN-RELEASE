# P2 · Soporte y protocolo común

## Prerregistro

Base `8df6a59` más P1/P2 locales. Se conserva la interfaz sintética de siete perfiles: dos enlaces observables, amplitudes en octavos menores a media vuelta y perfil sin salto. Alcance: Paper V, registro, controles, Lean del argumento de estabilidad, informe, roadmap, ledger y PDFs de trabajo.

- Soporte de referencia: unión de las siete ramas con fase circular y bits de P1, dinámica cofinal de P2, mismo ruido adversarial de `1/256`, y observación de fase en los cortes 0, 1 y 2 más el código ternario. La amplitud del acoplamiento es `1/9`. No se añaden entradas de identificación a los comparadores. Se declaran todos los repartos no vacíos de los cuatro canales, con comparación de historias y controles exógenos comunes. Se contrasta el sector amplio, el subsector exacto al inicio y el caso sin acoplamiento.
- Identidad del sistema: el atlas es el conjunto de perfiles disponibles; las alternativas son catálogos no vacíos que habilitan subconjuntos de los comandos de preparación. El test usa cobertura exhaustiva de las preparaciones habilitadas. Se comprueba qué deja de poder afirmarse al perder la cobertura. Las preparaciones son parte de la adquisición, no transiciones internas que cambian el perfil.
- Se cotejan los seis testigos sobre el mismo soporte. Para una etiqueta de estado, el protocolo exige decodificación robusta de una ventana finita y estabilidad al volver a aplicar el mismo control sham desde cualquier estado admisible. Los blancos de transición son controles internos que mantienen el perfil. Se contrasta este protocolo con el diagnóstico de respuesta pareada ya demostrado. La estabilidad repetida es una hipótesis explícita del protocolo, más fuerte que comprobar una sola ventana.
- Controles exactos de geometría, cobertura, canales, factor autónomo, ruido, convergencia de ventanas, y disociación entre etiqueta persistente y respuesta al acoplamiento. Criterio de salida: construcción conjunta en esta configuración o incompatibilidad demostrada bajo sus hipótesis, sin inferir un fallo universal. Revisar el plan P0–P5 con siguiente entregable explícito. Los ensayos son sintéticos y se detiene la incorporación ante fallos obligatorios.

## Comparación con los mismos canales

En el soporte común están las siete ramas, con las fases de los cortes 0, 1 y 2 y el código ternario. Los cuatro canales son los mismos para identidad e integración. Para el sector de factorizaciones, cada uno de los 14 repartos ordenados no vacíos asigna el código a un factor y al menos una fase al otro. El código inicial separa valores del primer bit. Para el otro factor, la diferencia entre las respuestas a controles de signo opuesto cancela el perfil fijo, incluso si dos estados de una fibra pertenecen a ramas distintas. Un comparador con error inferior a la cota haría que ambos factores determinaran el primer bit. Esto contradice la existencia de la esquina que combina dos valores distintos en el producto completo.

Con $\lambda=1/9$ y peso mínimo de fase $1/9$, el ínfimo limpio queda entre $1/162$ y $1/18$. La cota inferior sigue siendo positiva si se carga como error adicional el ruido $1/256$ en la misma métrica. Queda al menos $47/20736$. Si los readouts iniciales son exactos, las fases no pueden separarse en factores: su diferencia pertenece a un conjunto finito y un producto tendría diferencias arbitrarias. El mínimo en ese subsector es $1/18$, alcanzado por el comparador que sustituye el bit en la fase por $1/2$. El mismo comparador es exacto cuando $\lambda=0$. Esto cubre todos los repartos de los cuatro canales especificados, sin extenderse a decodificación cruzada.

## Qué se puede sostener en un soporte común

| Testigo | Resultado bajo el protocolo declarado |
|---|---|
| Persistencia | La unión de ramas es compacta e invariante. El perfil Hilbert conserva distancia positiva de las funciones constantes y la dinámica atrae uniformemente hacia la secuencia alternante de bits. |
| Identidad | Con cobertura exhaustiva de comandos de preparación, se identifica el atlas frente a sus subcatálogos no vacíos. Dos subcatálogos diferentes están a distancia de Hausdorff al menos $1/80$. Observar sólo ramas compartidas deja ambigüedad sobre cuáles faltan. |
| Integración | Cota positiva con los mismos canales de identidad, comparador explícito y mínimo exacto en el subsector con observación inicial exacta. |
| Continuidad | Respuesta continua en la fase de control a signo fijo, salto discreto acotado por uno y ningún cambio de celda de perfil por los controles internos. El testigo usa esas celdas de régimen y tiempo discreto. |
| Diferenciación | Separación inicial uno entre los códigos extremos y cota $2/9$ desde el segundo paso, que excluye el nulo declarado como atractor. |
| Legibilidad | La etiqueta persistente del estado y la detección pareada de una respuesta son objetos distintos. La primera no puede cambiar bajo los blancos internos de este protocolo si satisface la estabilidad repetida y robustez exigidas. El segundo sí detecta la ablación de integración en su unidad de prueba. |

La obstrucción de legibilidad tiene tres hipótesis. El decodificador toma una ventana finita bajo un mismo control sham, tolera un radio positivo de ruido y su etiqueta permanece al avanzar un paso del sham desde cualquier estado. El código se actualiza como $c\mapsto(1-c)/3$, así que las ventanas futuras de cualesquiera dos estados de una rama se acercan hasta quedar dentro del ruido tolerado. Entonces el decodificador tiene que asignarles la misma etiqueta. Repetir la estabilidad transporta esa igualdad hasta el inicio. Cualquier control interno mantiene la rama y, por tanto, mantiene la etiqueta. Un criterio que exija un cambio de esa etiqueta ante un control interno no puede cumplir L4. La hipótesis de estabilidad repetida es más fuerte que comprobar una única ventana finita, y no implica que todas las formas de legibilidad sean imposibles.

El diagnóstico pareado usa dos copias preparadas y dos controles. Su salida es una clase de respuesta bajo intervención. El resultado anterior bloquea combinar ese diagnóstico con la etiqueta de estado persistente como si fueran el mismo testigo. No cierra la conjunción de seis predicados en el sentido general de Paper V.

## Repaso del plan y siguiente decisión

| Fase | Estado comprobado | Siguiente obligación |
|---|---|---|
| P0 · Base reproducible | Copia local, controles de integridad, registro y compilaciones reproducibles. | Mantener trazabilidad y completar la reproducción del agregado Lean de la versión actual. |
| P1 · Fundamentos | Realizaciones acotadas de métrica, rigidez, lectura, nulo y disipación, con un modelo explícito. | Revisión independiente y mecanización analítica restante. Las realizaciones no cierran las generalizaciones fuera de sus dominios. |
| P2 · Soporte común | Sector de comparadores no vacío, seis rupturas ensayadas, alternativas calibradas y cinco testigos en un soporte común bajo el protocolo. | Resolver qué objeto certifica la legibilidad. La prueba descarta la etiqueta persistente con blancos que mantienen la rama. La independencia y el certificado general siguen abiertos. |
| P3 · Predicción | El modelo ofrece comparadores y una intervención calibrada. | Prerregistrar una predicción diferencial con variable de resultado independiente, un rival con presupuesto comparable y un criterio que permita que cualquiera pierda. |
| P4 · Puente y adjudicación | El roadmap conserva obligaciones y contraejemplos previos. | Revisar el puente y la adjudicación cuando existan resultados independientes pertinentes. |
| P5 · Revisión y contraste externo | Las fuentes, el registro y los PDF de trabajo pueden auditarse juntos. | Revisión matemática independiente, evaluación de antecedentes y contrastación externa cuando aplique. |

La siguiente decisión recomendada es conservar la etiqueta persistente como una propiedad de estado y definir explícitamente un protocolo de legibilidad de respuesta por ensayos pareados, con blancos, shams, abstención, compresión y unidad de análisis declarados. Antes de incorporarlo al criterio, hay que comprobar qué cláusulas L1–L6 satisface en su propio dominio. Si se exige una transición de etiqueta de estado, se necesita un blanco que modifique una variable persistente del sistema y un control que pruebe que la etiqueta mide ese efecto. La obstrucción muestra por qué otro umbral o más casos del mismo experimento no resuelven ese requisito. La revisión independiente del resultado puede preparar P3 sin presentar la comparación sintética como evidencia externa.

## Verificación

- `npm run verify:math` pasó 11/11 con 20.271 casos exactos nuevos. Incluye los 14 repartos de canales, las 8.001 comparaciones entre subcatálogos, el control de cobertura parcial, la realización del comparador, las ventanas del sham y la prueba de respuesta pareada.
- Lean 4.31.0 verificó `stable_labels_agree_before_merge` sin axiomas. El lema formaliza el transporte de la igualdad de etiquetas hasta el inicio. La parte métrica y los cuantificadores de la obstrucción están en la demostración de Paper V.
- Copia cotejada de 728 archivos en `E:\QICN-PRESERVACION\2026-11-09-p2-soporte-17dfm3`. Pasaron los tres verificadores raíz, release 6/6 y los validadores de 810 entradas y 383 macros sin bloqueos ni avisos. Las 808 entradas previas conservaron enunciados, identificadores y metadatos, con actualización de ubicaciones cuando correspondía.
- Veredictos v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`. Todos con `external_support_certified=false`.
- `pdflatex`, `biber`, `npm run compile:monolithic` y `check-monolith.cjs` reconstruyeron los documentos y cotejaron los doce capítulos. `pdfinfo` y `pdftotext` confirmaron las páginas y los dos resultados en ambos PDF. Sin referencias o citas indefinidas, etiquetas duplicadas ni incremento de avisos de cajas.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| `paper5_operational_consciousness/main.pdf` | 36 | `55fff523e43c659b16c8285fdae34a2a2932d0dc0a2b57c3e163f8d1703aabd3` |
| `monolithic/QICN_MONOLITHIC.pdf` | 361 | `8a7ea876b3a8808c16023659218a19db12eebfd3f3594ee80f2d0a032e42b053` |

Quedan pendientes el agregado Lean completo y la revisión matemática independiente. Los resultados son locales y su alcance es el protocolo declarado.
