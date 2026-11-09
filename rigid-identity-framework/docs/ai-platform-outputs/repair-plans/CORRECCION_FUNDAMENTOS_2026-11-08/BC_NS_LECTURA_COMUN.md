# P1 · BC-NS y lectura común

Prerregistro local del 2026-11-09 sobre la corrección BC-MET y BC-RIG en la copia del Escritorio. Orden de trabajo: presupuesto, cota, control de precisión, realización conjunta y verificación.

- Se contrasta la separación de respuestas con un presupuesto binario determinista que cuenta el estado completo accesible al decodificador. Se distingue la cardinalidad de la dimensión, y el coste de intervención de ambos.
- Se busca una cota exacta para el readout ternario con cualquier codificador de B bits, seguida de una realización con transporte, E0–E2 y una extensión separada que dé un testigo de nulo.
- Controles previstos: presupuesto cero, decodificador con salida fuera de la imagen, codificación por un real exacto, intervención sin deformación de conjuntos, transporte de un punto frente a la incorporación de otro, lecturas que ignoran la coordenada perturbada y empate de respuestas bajo cuantización.
- El ámbito de revisión es BaseCore 03–05, Papers I–III y sus artefactos locales. Las pruebas formales y las comprobaciones finitas se registran por separado. Para cerrar esta intervención se exige sincronía de fuentes, registro y monolito, además de las verificaciones obligatorias.

## Resultados matemáticos

**BC-NS.** Un código determinista de $B$ bits distingue como máximo $2^B$ estados, contando toda información de la historia disponible al decodificador. Las consultas pueden indexar observables, tiempos o intervenciones declaradas. Si dos historias reciben el mismo código, sus respuestas a una misma consulta deben quedar a distancia a lo sumo $2\eta$ para que la respuesta decodificada tenga error uniforme $\eta$ en ambas. Esto da la obstrucción por empaquetamiento. Para error cero, el número de clases de respuestas debe caber en el presupuesto, y asignarles un código construye el decodificador. La conclusión se refiere a un solo código común a toda la familia de consultas.

En la distancia de historias binarias con pesos $2^{-t}$, codificar el prefijo de $B$ bits y rellenar con ceros alcanza error $2^{-(B+1)}$. Para mejorar ese error, habría que distinguir $2^{B+1}$ prefijos con $2^B$ códigos. En el readout ternario con error absoluto, los $2^{B+1}$ extremos de los cilindros de profundidad $B$ están separados por al menos $3^{-B}$. Dos extremos necesariamente comparten código, de modo que el mínimo error máximo es $1/(2\cdot3^B)$, incluso para codificadores arbitrarios y valores decodificados fuera de la imagen. Guardar el prefijo y devolver el punto medio alcanza la cota. El caso $B=0$ da $1/2$. El escalar real exacto recupera todos los prefijos a precisión no acotada y separa dimensión de presupuesto en bits. Un sistema contractivo que ignora sus entradas separa dimensión y coste del testigo de resistencia.

**Lectura común.** Para el ejemplo combinado se eligieron pesos $3^{-t}$ con el fin de usar la misma escala que el código ternario. La lectura de $(\theta_0,\theta_{k+1},\mathrm{code}(b))$ mide las dos fases con sus pesos y preserva distancias entre constantes 1 y 3. El dominio es la unión de las dos torres embebidas en el producto ponderado. En cada torre, el conocimiento de la familia de proyecciones permite reconstruir ambas fases a partir de cada estado observado. Conservar $t$ bits da una cola uniforme $3^{-t}$, y cambiar un bit posterior prueba E2. El resultado de error óptimo escalar se aplica en una fibra de fase fija, mientras la lectura conjunta incluye las fases.

**Coste y extensión.** En el sector de rotaciones simultáneas internas, el conjunto de historias se conserva y la resistencia es infinita por la convención de Hausdorff. Hay rotaciones de coste finito que sí mueven un punto y su lectura. Para un salto de fase en $k$, escribir $\beta=3^{-(k+1)}$ da desplazamiento puntual y de lectura $\beta a$, distancia entre límites $\beta a/(1+\beta)$, y coste declarado $3^{-k}a$. La extensión añade la torre con salto como segunda rama. Su inclusión conserva la lectura del punto original, y un punto de la nueva rama con fase inicial y bits iguales constituye el testigo separado. Con nulo anclado en la historia cero, el segundo punto queda a distancia $\beta a$ del nulo. El readout escalar que descarta las fases falla en ese par. Los sectores de rotación, salto y extensión están declarados por separado. La construcción satisface el transporte y el testigo tipados, y queda abierta la realización de todas las exigencias de la clase CCR.

## Alcance Lean

El módulo `QICNObservationBudget.lean` formaliza que una función de `Fin (n+1)` a `Fin n` no puede ser inyectiva, la colisión bajo presupuesto de $B$ bits y la obstrucción de respuesta exacta para consultas con codominios dependientes. Lean 4.31.0 comprobó los tres teoremas con `-DrelaxedAutoImplicit=false`. La auditoría `#print axioms` devuelve `propext` y `Quot.sound` en los tres. Se añadió el módulo al agregador. Quedan para la capa Lean analítica la cota real de error, la geometría de Hausdorff y la verificación del agregado con todos los módulos.

## Preservación de resistencia y dependencias

Paper I ahora exige un transporte ambiente bi-Lipschitz y una biyección entre los sectores de intervención, con costes comparables y correspondencia de conjuntos deformados. Si los factores métricos son $c,C$ y los de coste son $a,b$, las resistencias satisfacen $(a/C)M_\Omega\leq M'_\Omega\leq (b/c)M_\Omega$. Los factores multiplican al componer transportes. El contraejemplo de dos sectores sobre la misma torre delimita esta hipótesis: un isomorfismo de torres por sí solo no hace corresponder los testigos de deformación. Esta corrección reemplaza la inferencia anterior de no transferencia a partir de cualquier morfismo.

Se extendió la propagación editorial al resumen, la envolvente y el ledger de BaseCore porque repetían la conclusión anterior de no simulabilidad. En Paper III la torre base cumple la definición de CCR de ese paper bajo el sector de rotaciones declarado. La realización de un objetivo más fuerte exige especificar y probar las condiciones adicionales de preservación. La interpretación topológica de un límite de etapas finitas se apoya en la definición clásica de [espacio profinito](https://stacks.math.columbia.edu/tag/08ZX), mientras que la cota y los ejemplos aquí se derivan directamente.

## Verificación local

Pasaron los tres verificadores raíz y las seis cadenas de release. El veredicto crudo fue BLOCKED_FOUNDATION_FIRST_GATES con external_support_certified=false. La orden npm run verify:math pasó R1–R4, BC-MET/BC-RIG y los 26.985 controles racionales de esta fase. Incluyen extremos de cilindros, fase circular, transporte inverso, estimación de colas, coste, incorporación de una rama y pérdida de distinción al ocultar la fase. Son comprobaciones finitas de las fórmulas demostradas en las fuentes.

La extracción del registro en un destino temporal conservó los 791 IDs previos, actualizó 14 declaraciones y añadió siete, para 798 entradas y 383 macros. Los validadores de corpus y macros pasaron. El constructor del monolito y la comparación de fuentes produjeron 12 capítulos concordantes. Se ejecutaron pdflatex, biber y otras dos pasadas de pdflatex por publicación en una copia aislada, sin referencias o citas indefinidas ni etiquetas duplicadas. Las huellas corresponden a los PDF sincronizados en la copia de trabajo.

| PDF | Páginas | SHA-256 |
|---|---:|---|
| basecore | 51 | bc721c82914d372c1a41249b92f6b9eefc81f728a672db1b2631f5c5d52853fd |
| paper1 | 27 | bff1c659e156230ef0dac223adc8c154301102af57095e71f2ae0bb62a96c7d0 |
| paper2 | 18 | afbace781d78fbb24b5089769027412cb5d4bf0f5615525b94d79ca200ae00f2 |
| paper3 | 19 | 01ad495793d25cf109641a363d06d1954d85f191a037c4e012f9c872cc3097ab |
| monolithic | 351 | 73ec021566522356aa600510535ba9ace9d111e3a6f64631ec422a0f0d0c3a6e |

Las pruebas Lean por módulo incluyeron la compilación de los dos objetos nuevos y su importación conjunta. Este control abarca transporte, recursión y ramificación de BC-RIG, y la obstrucción binaria de BC-NS. Los logs de compilación, corpus y release están en .cache/bc-ns/build/ relativo a la raíz de trabajo.

P1 conserva pendiente el enlace de estos testigos con la familia disipativa y su no colapso, la mecanización analítica y la revisión independiente. La siguiente construcción a contrastar es una dinámica compatible con las proyecciones, con contracción uniforme y transporte conjugado. La estabilidad temporal tiene una carga propia, separada de la resistencia del conjunto de historias.
