# P1 · BC-MET y BC-RIG

Registro previo a la edición, 2026-11-08. Punto de partida `71085c7`. Subfases en orden: tipar la métrica y las hipótesis de levantamiento, corregir fuentes, construir una realización, contrastar con controles y sincronizar registro y PDFs de trabajo.

- Alcance: sección 03 de BaseCore, las afirmaciones dependientes directamente de métrica y rigidez en Paper I, el registro interno y los artefactos derivados de trabajo. Papers II y III se cotejan por sus interfaces de transporte, comparación y lectura. Las capas congeladas y el runtime quedan fuera de esta fase.
- Resultados esperados: condición exacta de finitud en el producto, dominio completo con métrica finita, condiciones para la topología producto y compacidad. En una clase tipada de perturbaciones, obtener un levantamiento exacto en ambos sentidos y una cota explícita con productos de amplificación. Exhibir mapas inversos coherentes en una torre ramificada y calcular su coste y deformación positiva.
- Controles previos a la ejecución: pesos sumables con diámetros crecientes que producen infinito, distancia acotada sin colas uniformes, torres arbitrariamente cercanas con tipos topológicos distintos, intervención cero, intervención a nivel variable y diferencia entre el desplazamiento puntual y la distancia entre conjuntos.
- Criterio de cierre: derivaciones completas para las hipótesis escritas, controles reproducibles, registro alineado sin pérdida de IDs vigentes, compilación y verificación de release en el ámbito local. Cualquier fallo obligatorio detiene el cierre. Los pasos restantes de P1 y la revisión independiente se conservan como obligaciones separadas.

## Derivaciones y alcance

BC-MET distingue tres condiciones. En el producto, la distancia entre todos los pares es finita exactamente cuando los diámetros ponderados están acotados fuera de un conjunto finito de niveles. La cota global de diámetros caracteriza que la métrica sea acotada. En un límite inverso no vacío basta que todas las historias estén a distancia finita de una historia de referencia. La completitud se obtiene por convergencia coordenada con la misma cota de Cauchy uniforme. Las ecuaciones de compatibilidad son cerradas por continuidad de los mapas.

Las colas de diámetros ponderados que tienden a cero dan la topología producto y un certificado para truncar la distancia. En el producto completo también son necesarias para esa topología. En un subconjunto de historias compatibles la necesidad puede fallar. Con etapas compactas se aplica el argumento de grafos cerrados en el producto compacto. Como referencia del resultado clásico, [Stacks, lema 5.14.5](https://stacks.math.columbia.edu/tag/08ZV) y [lema 5.14.6](https://stacks.math.columbia.edu/tag/0A2R). El ejemplo de prefijos discretos con escala creciente separa finitud de compacidad. El de historias constantes sobre el intervalo separa sumabilidad de pesos de finitud.

BC-RIG usa las mismas etapas métricas para las dos torres. El defecto local se mide por la distancia suprema entre mapas de enlace. Un levantamiento exacto en cada fibra de ambos mapas, con constante $K_t$, da la recurrencia $a_{t+1}\le q_t(a_t+w_t\epsilon_t)$, con $q_t=w_{t+1}K_t/w_t$. El supremo $C$ de los productos de amplificación sobre intervalos finitos da $d_H\le C E_w$. El argumento recursivo produce historias compatibles en ambos sentidos. Para el isomorfismo se requieren además homeomorfismos coordenados que conmutan con ambos sistemas de proyección. El ejemplo de etapas finitas con una historia aislada muestra el fallo de inferir el isomorfismo aun bajo las hipótesis de la cota.

La realización emplea un círculo de circunferencia uno y un prefijo binario de longitud $t$ en cada etapa. En el nivel $k$, la proyección cambia por una rotación de amplitud $0<a<1/2$. Desplazar todas las coordenadas posteriores por $a$ y deshacer ese desplazamiento por $-a$ da transportes inversos. Las historias con el mismo prefijo todavía pueden bifurcarse. Con $b=2^{-(k+1)}$, el coste es $E_w=2ba$, el desplazamiento del transporte es $ba$ y la distancia de Hausdorff es $ba/(1+b)$. Para la clase de saltos declarada, el ínfimo de coste por unidad de deformación es 2. El coste y la distancia se han definido en unidades adimensionales del modelo. La comparación con costes de entropía queda como obligación separada.

Paper I ahora separa la suma ponderada de la métrica suprema, el conjunto de minimizadores de su selección y la finitud de la masa de una garantía de observabilidad. La comparación exacta de un sector finito da una cota superior al ínfimo del sector completo, con certificado de finitud solo si se obtiene un testigo positivo de coste finito. Se condicionó la obstrucción por resistencia a que exista ese testigo y se exija conservar la clase de resistencia. La selección por distancia no es condición de existencia del límite. El empate de dos historias comprueba que la compacidad por sí sola no fuerza unicidad.

Papers II y III ya requieren dominio común y transporte declarado. El modelo suministra un dominio de comparación y un transporte con desplazamiento positivo. Un readout que ignore el ángulo puede permanecer invariante, así que el desplazamiento por sí solo no certifica la separación del readout ni la realización conjunta de los invariantes. Las obligaciones BC-NS sobre presupuestos y observables, los resultados dinámicos sobre atracción y el puente conjunto con los sectores de nulo y E1/E2 siguen abiertos.

## Cobertura Lean

Lean 4.31.0 verificó el módulo `QICNProjectiveTransport.lean` con `-DrelaxedAutoImplicit=false`. Se auditó `#print axioms` sobre los cuatro resultados. El cuadrado inverso y el levantamiento exacto no dependen de axiomas. La inversión depende de `Quot.sound`. La ramificación depende de `propext` y `Quot.sound`. Esta capa mecaniza compatibilidad, inversión, recursión y ramificación. La topología métrica, la cota real y el cálculo exacto de Hausdorff quedan demostrados en LaTeX y contrastados con aritmética racional finita, pendientes de formalización Lean integral.

## Verificación local final

- Los tres verificadores raíz y `npm run verify:release` salieron con código 0. Las seis verificaciones de release pasaron. Veredicto crudo `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`.
- `npm run verify:math` pasó R1–R4 y 6.812 comprobaciones exactas nuevas sobre colas, propagación, conmutación, aislamiento de una rama y valores de coste y deformación. Las pruebas universales están en las fuentes.
- `extract-registry.js` se usó con destino temporal y se sincronizaron los dos archivos revisados. `validate-corpus.js` y `validate-macros.js` pasaron. Se conservaron los 781 IDs y se añadieron diez, con 383 macros. Se conservaron los 15 labels de la sección de BaseCore y los 57 de Paper I. Ahora hay 21 y 62 respectivamente. Se mantuvo el número de teoremas y se añadieron dos bloques de prueba en cada archivo.
- `build-monolithic-volume.js` y `check-monolith.cjs` produjeron 12 capítulos coincidentes. `pdflatex`, `biber` y dos pasadas de `pdflatex` comprobaron los PDF de trabajo sin referencias o citas indefinidas ni etiquetas duplicadas.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| BaseCore | 50 | `d7ebf0a2dd7711a4de6e70a12fc669701e5cd564d4f49c296222fb9ea0f0836c` |
| Paper I | 28 | `f6c22b7bbfa26a681dfa216a7e24871c39f38949e6e94d8767cb95bac397612a` |
| Monolito | 348 | `de0b1472dd50782eacea93c678978988c72651ee601a1e2cedc9dd1ade840635` |

Se verificó el módulo Lean nuevo de forma aislada y se registró su importación en el agregador. El estado de 19 archivos y 78 teoremas es la línea base anterior. Esta ejecución cubre el módulo nuevo. Queda pendiente revalidar el agregado completo. Los logs de la fase están en `.cache/bc-met-rig/build/`.

Resultado local: condiciones métricas, cota, transporte y realización demostrados para la clase especificada. Siguen pendientes la formalización analítica integral y la revisión independiente. Entre las dependencias de P1 quedan BC-NS, el acoplamiento con los readouts de Papers II y III y las hipótesis dinámicas de atracción. Las afirmaciones heredadas de Paper I sobre atracción, observabilidad y simulación requieren revisión con presupuestos y controles declarados.
