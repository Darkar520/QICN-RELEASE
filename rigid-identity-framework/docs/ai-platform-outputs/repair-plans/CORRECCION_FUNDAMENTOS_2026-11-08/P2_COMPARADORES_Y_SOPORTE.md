# P2 · Comparadores estructurales y soporte común

## Prerregistro

Base Git `8df6a59` más la fase P1 local del Escritorio. Lecturas de control: BaseCore 04/07/11, Papers I–III y V, auditoría de Papers V–VI y decisión de clase estructural D*. Se conserva el trabajo pendiente de P1. Alcance inicial: obstrucción con el corte cero, extensión de controles sobre el mismo soporte, margen de integración relativo al sector, inventario de los seis testigos y sincronización de BaseCore/Paper V. Sin efecto sobre paquetes congelados ni adjudicación externa.

- Antes de medir se fija como respuesta objetivo la familia de tres canales de P1. El error de historia es el supremo por estado, programa de control y tiempo, en la métrica ponderada original. Se admiten todos los repartos no vacíos de estos tres canales, codificaciones producto fijas, actualizaciones locales con control exógeno común y ninguna recombinación de salidas. Se comprobará que el sector aproximado contiene un comparador explícito, y se informará el papel de la orientación y de los cambios de canales.
- Primero se prueba o refuta integración en la construcción original. Se contrasta con una familia de controles que acopla la fase al primer bit en la cola cofinal de etapas. Se preserva explícitamente la distinción entre la cola de etapas y la exigencia más fuerte que incluye el corte cero.
- Los controles incluirán corte cero, supresión del acoplamiento, cambio de orientación, reparto de los tres canales, ruido de lectura, transporte y compresión de etiquetas. Las cotas son adimensionales y deterministas. Separaremos distancia, radio de ruido, tasa de error, fidelidad y distorsión, y declararemos las poblaciones de control antes de verificar.
- Para las seis obligaciones se distinguirá prueba, refutación y evidencia parcial en el mismo soporte. Un fallo obligatorio detiene la incorporación. El criterio de salida de esta intervención es una incompatibilidad probada para la clase original o una realización conjunta verificable, con un sector de comparadores no vacío, controles negativos y obligaciones de cierre explícitas. Las demostraciones y controles son de un modelo sintético.

## Resultado

En las dos torres originales, exigir compatibilidad con el corte cero impide que los bits afecten a la fase. La continuidad, por conexidad del círculo y discreción de cada bit, impide que la fase afecte a los bits dentro de una rama. Si ambas evoluciones conmutan con el transporte que conserva los bits, los mapas binarios coinciden. La codificación producto $((s,\theta),b)$ reproduce todos los historiales y conserva las etapas, los tres canales y las operaciones declaradas. En consecuencia, la integración en el sector estructural falla sobre el soporte completo original. Esto refuta la realización conjunta de los seis testigos en ese modelo y sector, aun si los otros cinco se llegaran a demostrar.

La extensión conserva el límite inverso, el transporte y los canales. Añade controles $q=\pm1$ con fase de salida $u+q\lambda b_1$, además de $q=0$. La cola $t\ge1$ permite aplicar esos controles porque cada etapa ve $b_1$. La contracción por rama sigue siendo $1/3$ para $0<\lambda\le1/9$. Se conserva E2 sobre historias. El requisito original de conmutación en el corte cero no lo satisface la extensión. Tampoco se ha derivado una representación de todos los nuevos controles por un único operador lineal fijo de BaseCore.

Con $\beta=3^{-(k+1)}$, el error ínfimo en el sector fijo de canales está entre $\beta\lambda/2$ y $\lambda/2$. La cota inferior vale para los seis repartos ordenados de los tres canales en grupos no vacíos y para encoders producto arbitrarios dentro del sector. En error inferior a la cota, ambos factores deben recuperar el primer bit, uno por el código ternario y el otro por las respuestas de fase con signos opuestos. El producto contiene una esquina que combina factores con bits incompatibles, lo que contradice la recuperación. El comparador de fase que usa $1/2$ en lugar de $b_1$ y la dinámica binaria exacta atestigua no vacuidad. Si los readouts iniciales deben ser exactos, las dos fases pertenecen al mismo factor por la geometría de su imagen conjunta y el error minimax es exactamente $\lambda/2$.

## Estado de los seis testigos sobre el mismo soporte

| Testigo | Evidencia en las dos torres | Frontera |
|---|---|---|
| Persistencia | Compacto invariante, distancia uniforme a las funciones constantes y atracción uniforme hacia los bits alternantes bajo todos los controles internos. | El conjunto atrayente incluye todas las fases admisibles. Una sucesión variable de entradas puede mantener variaciones de fase. |
| Identidad rígida | La lectura identifica la historia y la rama. Entre las dos torres fijadas, la deformación de Hausdorff es $\beta a/(1+\beta)$. | Si se admite una sucesión de saltos $a'\to a$, la deformación hacia alternativas distintas tiende a cero. El par fijado no certifica el gap sobre esa familia. |
| Integración | Error cero en el P1 original. Cota positiva en el sector de la extensión cofinal, con comparador explícito y valor exacto en el subsector con lectura inicial exacta. | La cota depende de los canales, su métrica y los controles disponibles. La clase con decodificador conjunto constituye otra comparación. |
| Continuidad | El readout es Lipschitz en estado y los saltos discretos están acotados por uno. Los controles internos preservan la clase de rama. | La continuidad topológica del tiempo discreto es automática. Una interpolación continua o clases de régimen más finas requieren hipótesis. |
| Diferenciación no nula | Dos historias tienen separación ternaria uno en la ventana que incluye el inicio. Desde el segundo paso, todo historial tiene $b_2=1$ y $c\ge2/9$, excluyendo el ancla nula como atractor de esta dinámica. | El nulo y el dominio son los declarados. |
| Legibilidad | Dos etiquetas con matching por igualdad, separación limpia, radio de ruido explícito, persistencia para controles internos y código de una sola etiqueta de un bit. | El cambio de etiqueta bajo transporte es un control sintético. Hace falta un protocolo que vincule intervenciones a pérdida o preservación de invariantes para certificar L4 en el sentido completo. |

Para la persistencia, sean $p$ el primer par de fase, $q=b_1$, $w=1/8$ y $\ell=4/9$. Frente a una constante $h$, la contribución de las tres celdas al cuadrado del error es $w\|p-h\mathbf1\|^2+\ell(q-h)^2$. Cauchy--Schwarz la acota por abajo por $(2/25)\|p-q\mathbf1\|^2$. La distancia del vértice $q\mathbf1$ al círculo de fase es $(\sqrt2-1)/2$. Esto da margen uniforme $(2-\sqrt2)/10$ para todo el soporte. Para el gap de identidad, el acoplamiento de historias con la misma fase inicial y bits da distancia de Hausdorff como máximo $\beta|a-a'|$ entre variantes de salto, suficiente para demostrar el ínfimo cero en la familia continua.

### Protocolo sintético de legibilidad

En el ejemplo $k=0,a=1/4,\lambda=1/9$, las unidades se fijan antes del cálculo. La métrica de observación usa vueltas del círculo (circunferencia uno) y la coordenada ternaria de rango uno, con peso $\beta=1/3$ para la fase tardía. La etiqueta de rama se decodifica por el más cercano entre $0$ y $a$ a la diferencia de fases. La separación de observaciones limpias entre ramas es $1/16$. El radio de ruido admisible es $1/64$ en la métrica de observación. El ruido es aditivo en ambas fases, con norma máxima ponderada, y la perturbación de su diferencia es a lo sumo $a/4$. Se trata de una garantía de peor caso, sin estimador estadístico.

La duración se cuenta en pasos discretos. En las trayectorias bajo controles internos no hay primer cambio de etiqueta. El blanco sintético es el transporte entre ramas y el control sham son las actualizaciones internas y las rotaciones simultáneas. La unidad en una comprobación finita es un par estado inicial–acción declarado. En este modelo determinista todos los blancos sintéticos cambian la etiqueta y todos los shams la preservan. La fidelidad y la tasa de falsos cambios son respectivamente uno y cero en esas poblaciones. Esas tasas no se trasladan a intervenciones sobre invariantes ni a observaciones empíricas. Un bit de compresión preserva la clase con distorsión Hamming cero; el presupuesto para reconstruir el historial completo es otro problema. Ninguna de estas cantidades se agrega como radio de perturbación de las seis obligaciones.

Con ruido de observación acotado uniformemente por $1/64$, la desigualdad triangular deja una cota de error de integración de al menos $1/54-1/64=5/1728$ en el sector amplio para este ejemplo. Es una cota contra los mismos comparadores y una métrica fija. Como control de alcance para L4, la ablación de $\lambda$ a cero cambia el margen de integración del sistema, pero preserva todas las etiquetas de rama. Por tanto ese decodificador no detecta la pérdida de integración bajo la ablación. El éxito al detectar el transporte de rama no sirve como sustituto.

### Orientación y comparadores del portador rotatorio anterior

En el ejemplo euclidiano histórico del anillo, para $K=(1/4)R_{\pi/3}$ y un cambio de marco ortonormal $Q$, la identidad $Q^\top JQ=(\det Q)J$ para el giro de un cuarto de vuelta $J$ mantiene la diagonal $1/8$ y la magnitud fuera de la diagonal $\sqrt3/8$. La prueba de fibras por tiempos cero y uno, seguida de una esquina producto, conserva la cota $\operatorname{diam}(A)/(4\sqrt{1+(9/\sqrt3)^2})=1/(2\sqrt7)$ para canales escalares alineados con cualquier marco ortonormal, incluyendo reflexiones. No se extiende por esa identidad a canales arbitrarios o no ortogonales.

El anillo admite un codificador producto polar $(x/\|x\|,\|x\|)$, con dinámica local identidad y salidas escalares locales acotadas, por ejemplo coseno del ángulo y radio menos $5/4$. Es un comparador aproximado con error finito, sin reconstrucción cruzada, para el sector que permite error inicial. Si se exige exactitud inicial de los dos canales cartesianos en factores separados, la imagen tendría que ser un producto de dos rangos $[-2,2]$, lo que es incompatible con el anillo. Ese sector exacto es vacío. La inclusión formal de una clase lineal en una comparación literal con codificación producto requiere verificar esa geometría antes de transferir una cota superior.

### Correcciones documentales

Se tiparon L1–L6 y la calibración de un radio común en BaseCore y Paper V. Se conservaron los identificadores de transferencias y rupturas, corrigiendo los supuestos que confundían ausencia de radio positivo con fallo en el objetivo. Un ínfimo cero sólo implica un comparador exacto si se alcanza. Las seis propuestas de ruptura se conservan como esquemas de investigación. En particular, el escenario sin ningún soporte admisible no conserva el testigo de identidad sobre soporte y el escenario con todas las clases colapsadas no conserva legibilidad. El criterio de pertenencia completa y la independencia de las seis cláusulas siguen siendo obligaciones separadas.

## Verificación local

- `npm run verify:math` pasó 8/8 suites. El control nuevo ejecutó 7.277 comparaciones racionales, con controles de desacoplamiento, ruido, orientación y transporte. La desigualdad universal y el resultado minimax se probaron en Paper V. El kernel fijado de Lean 4.31.0 verificó `QICNLean.two_factor_fibers_force_constant`; `#print axioms` no registra dependencias axiomáticas para ese teorema.
- Verificadores raíz y `npm run verify:release` 6/6 pasaron sobre una copia aislada de 723 archivos en `E:\QICN-PRESERVACION\2026-11-09-p2-comparadores-21bucv`. Los validadores de registro y macros pasaron con 804 entradas, 383 macros y cero bloqueos o advertencias. Los 801 IDs de la línea base P1 se conservan. Se revisaron 21 declaraciones y se añadieron tres. Ninguna etiqueta anterior se eliminó. Se añadieron dos teoremas, un lema y tres pruebas.
- Veredictos de adjudicación: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES` y v31 `BLOCKED_FOUNDATION_FIRST_GATES`. En todos, `external_support_certified=false`.
- `pdflatex`, `biber`, las dos pasadas finales de `pdflatex` y `npm run compile:monolithic` completaron los documentos. `check-monolith.cjs` cotejó los doce capítulos. `pdfinfo` y `pdftotext` confirmaron paginación y propagación de los pasajes nuevos. Sin referencias o citas indefinidas ni etiquetas duplicadas. Las advertencias de cajas conservaron sus conteos: BaseCore 6/0, Paper V 4/10, monolito 3/334 (overfull/underfull). Se recompiló la línea base de Paper V con la misma cadena para cotejar.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| `basecore/BASECORE.pdf` | 54 | `525a25dcdcc022aeba1bce12197de9cabc58b5695f9e23439c26c2c1950ceb3c` |
| `paper5_operational_consciousness/main.pdf` | 31 | `bf0473481193f7b7094f01361cc0ad8f5e357d03e2b53780617c97320d370767` |
| `monolithic/QICN_MONOLITHIC.pdf` | 356 | `812ecb8525acd4b403d9c4653d923ce966ce7efff88221d46114d1a032ad1907` |

La reproducción completa de Lean que se lanzó en P1 terminó con código 1 tras registrar `Basic` y `QICNContraction` como aprobados. El log de `QICNHilbertInstance` quedó vacío, por lo que no se puede atribuir la interrupción a una causa concreta. La comprobación local del módulo P2 es una ejecución distinta. Quedan pendientes el agregado completo, la revisión independiente y la mecanización de las cotas analíticas. La próxima intervención debe justificar una familia de alternativas con separación positiva y construir un control de legibilidad que detecte una pérdida real de invariantes.

## Prerregistro de la prueba de ruptura y resolución de identidad

Se conserva la comparación anterior y se trabaja sobre el mismo modelo de P2. Alcance: dos resultados en Paper V, registro, control racional reproducible, compilación de Paper V y monolito, y trazabilidad. Se fijan los siguientes protocolos antes de evaluar sus resultados.

- Ruptura. Hipótesis nula `lambda=0` frente a `lambda` en `[1/12,1/9]`. Preparar dos copias del mismo estado, con `b1=1` y el mismo `u`, para aplicar `q=+1` y `q=-1` por separado. Medir la distancia circular entre las dos fases iniciales observadas después de un paso. Fijar umbral `1/12` y radio de error `1/64` por lectura en la métrica ponderada, con ruido adversarial independiente por lectura. Repetir con `b1=0` como control negativo y construir una observación ambigua en la frontera de ruido. Unidad de comparación: un par de observaciones desde dos copias del estado inicial.
- Identidad. Fijar la profundidad del salto `k`, comparar la rama con salto conocido como rama de ensayo y usar una observación de fase inicial, fase tardía y código ternario. La fase inicial real no se conoce por adelantado. Usar el mismo radio de observación. Probar una condición necesaria y suficiente de separación uniforme, incluido el punto frontera. Verificar tanto las alternativas continuas como un ejemplo de dos alternativas previamente declaradas `a=1/16` y `a=1/4` para `k=0`. El ejemplo es una calibración sintética, sin excluir por definición otras alternativas.
- Criterio de salida. Una regla con garantía para todos los errores del modelo, un contraejemplo donde se pierde esa garantía, controles finitos con aritmética exacta, preservación de registros y verificación de los documentos. Las tasas de fallo, si se informan, corresponden a la población finita especificada, no a observaciones externas. Los fallos obligatorios detienen la incorporación.

### Resultado de la ruptura

Con $b_1=1$, la diferencia circular limpia entre los dos controles es $2\lambda$. Con $\lambda=0$ o $b_1=0$ es cero. La puntuación usa la fase temprana y su error máximo es $2\eta$ por par. Para $L=1/12$ y $\eta=1/64$, la clase nula y los shams puntúan como máximo $1/32$. La clase acoplada puntúa al menos $13/96$. El umbral $1/12$ deja holgura $5/96$ a ambos lados. A radio $\eta=L/2$, las observaciones completas de la ablación y del modelo con $\lambda=L$ pueden coincidir. El límite es exacto para ruido adversarial dentro del protocolo.

La etiqueta se refiere a la ruptura controlada de integración en esta familia. El caso intermedio $0<\lambda<L$ está fuera de la comparación y no se interpreta como prueba de acoplamiento cero. Cada control parte de su propia copia del estado; después de un paso el bit de entrada ya fue reemplazado. Los dos controles comparten fase exógena y configuración, con el acoplamiento como única variación causal del blanco. El control negativo conserva el modelo acoplado y prepara $b_1=0$. La lectura de ramas se conserva como un canal de diagnóstico separado.

### Resultado de la resolución de identidad

La distancia de Hausdorff entre ramas con saltos $a,a'$ a la misma profundidad es $\beta\,\rho(a,a')/(1+\beta)$. La misma fórmula da la distancia entre sus conjuntos de observaciones. Los radios de ruido $\eta$ se solapan exactamente cuando esa distancia es menor o igual que $2\eta$. A igualdad hay una observación compatible con ambas alternativas. El decodificador conserva todas las alternativas compatibles y sólo emite una identidad inequívoca cuando queda una.

Para $k=0$, $\beta=1/3$ y $\eta=1/64$, la separación de saltos debe exceder $1/8$ de vuelta. El par $1/16,1/4$ tiene separación $3/16$ y distancia de Hausdorff $3/64$. El par $1/4,3/8$ está justo en la frontera y no admite garantía. Una familia continua conserva ínfimo cero sobre alternativas distintas. La garantía obtenida es de identificación a resolución finita bajo la métrica y el protocolo fijados, con fase inicial desconocida y rama de ensayo declarada. Un conjunto de saltos separado por otra hipótesis podría tener margen positivo. La evidencia de este ejemplo no acredita tal hipótesis para el marco en general.

### Controles exactos

El script reproducible enumeró 648 pares positivos, 432 nulos, 648 controles sham, 16 fronteras ambiguas de ruptura, 4.968 identificaciones resueltas, 444 ambigüedades de identidad y 240 comprobaciones de geometría. Total 7.396 casos, cero desacuerdos con los resultados analíticos. La tasa de error de esta enumeración es una cantidad de la población sintética fijada; la garantía de peor caso proviene de las demostraciones.

### Verificación de esta intervención

- `npm run verify:math` aprobó las nueve suites. Lean 4.31.0 verificó `paired_score_separates` para la separación de intervalos en escala entera. Su auditoría de axiomas devolvió `propext`, `Classical.choice` y `Quot.sound`. Las desigualdades de la métrica circular y los casos de indistinguibilidad están demostrados en Paper V.
- Copia aislada y cotejada de 724 archivos en `E:\QICN-PRESERVACION\2026-11-09-p2-diagnosticos-y8758d`. Pasaron los tres verificadores raíz, release 6/6 y los validadores de 806 entradas y 383 macros. Las 804 entradas anteriores conservaron sus identificadores y metadatos, con actualización de localizaciones cuando correspondía.
- Veredictos regenerados: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`. En todos, `external_support_certified=false`.
- `pdflatex`, `biber`, `npm run compile:monolithic` y `check-monolith.cjs` reconstruyeron y cotejaron los doce capítulos. `pdfinfo` y `pdftotext` verificaron las páginas y la presencia de los dos resultados. No hubo citas o referencias indefinidas ni etiquetas duplicadas. Las cajas conservaron los conteos de la fase anterior en Paper V (4/10) y en el monolito (3/334).

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| `paper5_operational_consciousness/main.pdf` | 32 | `52d62fc9e79f10da7643138f91389818c9aaa5da99179c4068b9c849b42ef41d` |
| `monolithic/QICN_MONOLITHIC.pdf` | 357 | `78e309a5249677684793c0dd172e1038286291ec0e1ea51fae0ce0a355a3c77c` |

Resultado local para el sector y los dos protocolos declarados. La revisión matemática independiente y el agregado completo de Lean siguen pendientes. El gap continuo de identidad sigue siendo cero. Para avanzar al certificado conjunto falta justificar una familia de alternativas con margen positivo y comprobar las demás rupturas bajo un protocolo común.
