# Torre común V–VII–VIII · Prerregistro

Fecha 2026-11-10. Base pública `edca4290eca8c6d17d7613ad3a5fd418697caea0`. Explorar la torre de V–VI con los canales originales, la familia interna de VI y el mismo modelo de choque en ambos brazos. Mantener la fase como resultado exploratorio. Alcance previsto del árbol de trabajo: este informe, control exacto, suite, roadmap y ledger.

1. **Recuperación.** Usar los siete perfiles de V con `K=1, M=8`. Parámetros de VI: `lambda=1/12, a=1/2, kappa=1/8`, modelo M. Métrica de rama `max(rho, |delta c|, |delta m|/4)`, distancia uno entre ramas. Ambiente con `|m|<=1/3`. Declarar `V=1/3-|m|`, piso `1/12`, soporte admisible y región segura `|m|<=1/4`. Núcleo con fase cero, cola alternante fija y `|m|<=1/16`, en todas las ramas. Probar invariancia con comandos comunes y verificar el piso, el margen esperado `3/64` y ambos choques `(theta,m)=(±1/32,±1/8)` sobre el mismo estado previo. Comparar a un paso, con `q=0`, base `u=0`, presupuesto de ajuste de fase `1/64`, feedback interno saturado `u=clip(-kappa*m)` y pasivo `u=0`. Esperar retornos `1` y `1/2`, y ganancia `1/2`. Control negativo: acción abierta independiente de la señal balanceada y de su signo, incluidos ambos extremos de igual esfuerzo. Control de ruido en la medida interna de memoria con error absoluto máximo `1/32`, ganancia mínima esperada `3/8`.
2. **Compatibilidad.** Verificar que la restricción de memoria conserva la proyección observada, la identidad y las cotas de integración de V–VI en los sectores declarados. Comparar las bandas de memoria por desigualdades analíticas y aritmética racional. Probar el efecto de incluir `t=0` cuando se exige viabilidad a nivel del mismo piso desde todo el soporte.
3. **Cinco intervenciones.** Examinar contexto en dos perfiles y cinco posiciones iniciales en el prefijo. Medir desde la misma preparación y sólo variar comandos internos de VI. Exigir que un decodificador común de estado, a valores discretos, sea continuo en todo el soporte admisible o se obtenga por una ventana diagnóstica fija uniformemente robusta con ruido positivo. Probar si puede reproducir el sham y las cinco lesiones de VIII después de un paso. Cotejar todos los prefijos iniciales de cinco bits y tres signos en una malla racional de fases. Control negativo de alcance: una palabra asignada a fases separadas por el comando puede variar en el dominio restringido y un rival con los mismos comandos puede predecirla exactamente. Distinguir preparación, intervención interna y protocolo de respuesta.
4. **Control de historia.** Con el mismo sistema, equilibrar dos preparaciones con `m=±1/8` y aplicar los signos `0,+1,0` con fase de entrada cero y prefijo fijo. Comparar lectura actual en el paso dos con la ventana que incluye el paso uno, para predecir el signo de fase del paso tres. Esperar brecha de pérdida binaria `1/2` con signos ocultos y lectura exacta. Acotar el ruido adversarial que preserva el signo y probar empate cuando se entrega al rival la señal pasada. Este blanco predictivo no equivale al descriptor completo de vida ni al rival de VIII.

Verificación por desigualdades y fracciones exactas, sin tolerancia numérica. Usar los verificadores de raíz, publicación, suite matemática y validadores de registro en copia aislada. Detenerse ante una discrepancia y conservar salidas crudas. Declarar por separado las condiciones demostradas y las obligaciones conjuntas restantes. La inferencia se limita a construcciones sintéticas y a las hipótesis indicadas.


## Resultados matemáticos

Sea \(X=\mathcal P\times\mathbb T\times B\times[-1/3,1/3]\), con los siete perfiles de Paper V y el espacio \(B=\{0,1\}^{\mathbb N_{>0}}\). En una rama usamos el máximo de la distancia circular en vueltas, la diferencia absoluta del código ternario \(c\) y un cuarto de la diferencia absoluta de memoria. Entre ramas usamos distancia uno. Con \(\lambda=1/12,\ a=1/2,\ \kappa=1/8\), la planta M de Paper VI es

\[
(p,\theta,b,m)\ \longmapsto\
\bigl(p,\ u+q\lambda b_1+\kappa{\bf1}_{q=0}m\bmod 1,\ Rb,\ a s(q)m+\lambda q b_1\bigr),
\qquad Rb=(0,1-b_1,1-b_2,\ldots).
\]

El signo \(s(q)\) es negativo sólo para \(q=-1\). La lectura fija es \((\theta+p_0,\theta+p_1,\theta+p_2,c(b))\). La escala de memoria de la métrica es parte del protocolo.

### Proposición 1. Viabilidad y reparación activa en la misma torre

Sea \(V(x)=1/3-|m|\), con piso \(\eta=1/12\). Tomamos como soporte admisible \(A_S=W_S=\{|m|\le1/4\}\) dentro de \(X\). Sea \(b^\star=(0,1,0,1,\ldots)\) y

\[
K_S=\mathcal P\times\{0\}\times\{b^\star\}\times[-1/16,1/16].
\]

Entonces \(W_S\) es invariante bajo todos los comandos, el núcleo es compacto e invariante bajo los comandos nominales \(u=0,\ q=\pm1\), y la distancia del núcleo al complemento de \(W_S\) es \(3/64\) en la métrica declarada. Con los dos choques y el presupuesto del prerregistro, el margen de mantenimiento a un paso es \(1/2\) con medida exacta y al menos \(3/8\) con error absoluto de memoria hasta \(1/32\).

**Prueba.** La memoria siguiente satisface \(|m'|\le(1/2)(1/4)+1/12=5/24<1/4\). Como \(t=0\) forma parte de la definición, el ínfimo de viabilidad sobre \(A_S\) es exactamente \(1/12\). Para \(K_S\), el bit inicial vale cero, \(Rb^\star=b^\star\), y con los comandos nominales la fase es cero y la memoria se contrae en magnitud por un factor \(1/2\). El complemento más cercano se aproxima por la misma rama, fase y prefijo, llevando la memoria desde un extremo de \(K_S\) hasta justo fuera de \(W_S\). Eso da la distancia \((1/4-1/16)/4=3/64\).

Definimos los dos impulsos \(J_\pm:K_S\to W_S\) por \(J_\pm(p,0,b^\star,m)=(p,\pm1/32,b^\star,\pm1/8)\), con fases módulo uno. Ambos brazos reciben el mismo estado dañado, a distancia \(d_0=\max(1/32,(1/8-1/16)/4)=1/32\). La base exógena es cero y \(q=0\) en ambos brazos. La acción de fase se limita a \(|u|\le1/64\). El brazo activo usa \(u=\operatorname{clip}_{[-1/64,1/64]}(-\kappa\widehat m)\), donde \(\widehat m\) es la medida interna, y el pasivo usa cero. El flujo causal declarado es choque hacia memoria, memoria hacia fase siguiente, y medida de memoria hacia acción y fase siguiente sólo en el brazo activo. La memoria terminal es \(\pm1/16\) en ambos. Con medida exacta, la fase activa es cero y la pasiva es \(\pm1/64\). Las distancias finales son \(0\) y \(1/64\), así que \(R_{\rm act}=1\), \(R_{\rm pass}=1/2\), y el margen uniforme es \(1/2\). Saturar es una operación 1-Lipschitz y la acción exacta está en el intervalo. Por tanto la fase activa residual vale a lo sumo \(\kappa|\widehat m-m|\le1/256\), de donde \(R_{\rm act}\ge7/8\) y \(R_{\rm act}-R_{\rm pass}\ge3/8\). Todas las trayectorias permanecen seguras. \(\square\)

Con choques balanceados, cualquier acción abierta \(v\in[-1/64,1/64]\) asignada sin información del signo deja distancia media \((|v+1/64|+|v-1/64|)/2=1/64\). Su retorno medio es \(1/2\), incluso si se fija el mismo esfuerzo absoluto que usa el feedback exacto, o se aleatoriza independientemente del choque. Si ambos brazos desactivan el feedback, la diferencia es cero. Se mide reparación de fase. La contracción de memoria es pasiva e idéntica en los dos brazos.

**Compatibilidad con V–VI.** La banda admisible conserva todos los pares fase-prefijo de cada perfil e incluye \(m=0\). La proyección de cuatro canales y la separación de identidad \(g=1/80\) se conservan. El argumento inferior de integración de V–VI usa el tiempo cero y los signos no nulos, donde la fase no depende de \(m\). Sigue dando \(w_2\lambda/2=1/216\) como cota inferior. El comparador de fases \(u+q\lambda/2\) incurre en error a lo sumo \(\lambda/2\) para \(q\ne0\) y \(1/32<\lambda/2\) para \(q=0\). La cota óptima con observaciones iniciales exactas sigue siendo \(\lambda/2=1/24\). La contracción por rama se hereda al restringir a un conjunto invariante. La restricción de soporte es una decisión del modelo. Si se exige el mismo piso desde todo \(X\), la definición falla ya en \(t=0\) en \(|m|=1/3\), donde \(V=0\). En general, con la misma \(V,\eta\) para el piso uniforme y \(W_S=\{x\in A_S:V(x)\ge\eta\}\), la condición a tiempo cero obliga a \(A_S=W_S\).

### Teorema 2. Obstrucción a las lesiones nativas con un decodificador discreto uniforme

Sobre la torre de VI, supóngase que las lesiones y el sham sólo pueden variar los comandos internos \((u,q)\), comparten preparación y tiempo de lectura, y se leen con un único mapa continuo de estado a una palabra discreta. El mapa puede ser un decodificador de una ventana de lectura futura bajo un protocolo diagnóstico común, con robustez uniforme de radio positivo en todo el soporte. En estas condiciones, ningún comando interno puede cambiar la palabra respecto al sham. En particular, no se puede realizar el protocolo de las cinco lesiones discretas de Paper VIII con esas hipótesis.

**Prueba.** Para \(p,b\) fijos, la fibra \(\{p\}\times\mathbb T\times\{b\}\times[-1/4,1/4]\) es conexa. Una palabra discreta continua es constante en esa fibra. Para la segunda formulación, la lectura limpia de la ventana diagnóstica común es continua como función del estado, bajo un calendario fijo de controles. Dos lecturas limpias suficientemente cercanas caen dentro del radio garantizado de una de ellas y deben recibir la misma palabra. Por tanto el mapa inducido es localmente constante y es continuo hacia el espacio discreto. Para una preparación \((p,\theta,b,m)\), tras cualquier calendario de longitud \(n\) los dos primeros invariantes de fibra son \(p\) y \(R^n b\), independientemente de los comandos, incluso si los comandos se eligen por feedback. Todas las ramas del experimento caen en la misma fibra. En cambio, el protocolo de Paper VIII exige que desde la palabra inicial activa un sham y una lesión den palabras distintas después de un paso. \(\square\)

El contexto binario puede asociarse a dos perfiles preseleccionados. Se distingue con error menor que \(g/2\) en las unidades del readout, y los controles internos lo conservan. Las cinco posiciones iniciales del prefijo son distinguibles y se desplazan juntas a las posiciones 2–6 con complemento. Sólo suministran contrastes de preparación. Alterarlas selectivamente desde una preparación común exige un actuador sobre el prefijo o una clase distinta de intervenciones. Pasar a fases o memorias permite diferenciar respuestas en subconjuntos separados y en medidas continuas. La obstrucción delimita la codificación discreta uniforme, no todos los protocolos finitos de VIII. Como control de alcance, en seis fases codificadas por \(u=w/32\), con \(m=0,q=0\), se pueden reproducir etiquetas de sham y lesión. Un rival que recibe \(u\) predice esas etiquetas exactamente, pues \(\theta'=u\). Ese contraejemplo evita extender el teorema al dominio de lectura restringido y detecta que ese resultado no demuestra selectividad de un estado latente.

### Control de historial sobre la misma planta

Mantener perfil, fase inicial cero y prefijo \(b^\star\), y equilibrar \(m_0=\pm1/8\). Con base \(u=0\) y signos \(0,+1,0\), las fases son sucesivamente \(\pm1/64,0,\pm1/256\). Los cuatro canales del paso dos coinciden en ambas preparaciones. La fase pasada separa los signos, y el signo objetivo se verifica al paso tres con la lectura neutra. Con pérdida cero-uno, los mejores riesgos actual e histórico son \(1/2\) y \(0\) para ese blanco. Con error de fase menor que \(1/256\) en vueltas, la decisión del historial y la verificación del blanco conservan su signo. Un rival que recibe la fase pasada empata. Esto aísla un efecto de la información temporal en un blanco físico del modelo. Queda por demostrar su papel en una etiqueta de clase del Paper VII.

### Obligaciones conjuntas

Quedan verificados el margen de persistencia, la viabilidad al piso declarado y la reparación de fase de VII, sobre la misma planta que conserva las cotas de identidad e integración de V–VI. Quedan abiertos el certificado de legibilidad de trayectoria única de V, el uso de una etiqueta de clase con dependencia histórica y la frontera operacional de VII, sus descriptores de sujeto, y las cinco intervenciones y el margen contra la familia débil completa de VIII. Un ensayo con edición del prefijo debe declarar un nuevo actuador y volver a verificar las cotas y los controles causales. Un ensayo con ventanas finitas debe declarar de antemano la preparación, la región de lectura y las abstenciones, y usar un rival con los mismos comandos y observaciones. Ninguno de estos resultados atribuye propiedades biológicas ni experiencia subjetiva.

## Verificación y trazabilidad

El prerregistro se congeló antes de ejecutar los controles. SHA-256 `4af512888944f39f107615f6ab403d331bbeac3a8f498ece2720a5c3f401cb0d`. La copia inalterada y los logs están en `E:/QICN-PRESERVACION/2026-11-10-unificacion-torre-edca429`.

`python -B check_unified_tower.py` comprobó 70 choques emparejados, 17 acciones abiertas, 10 medidas perturbadas, 129.024 transiciones con prefijo y perfil independientes del comando, seis etiquetas codificadas por el comando y la colisión del control de historial. Las desigualdades y el teorema cubren sus dominios declarados. La enumeración racional finita comprueba casos de esos resultados.

La copia byte por byte de 741 archivos pasó los tres verificadores raíz, `npm run verify:release` 6/6, `npm run verify:math` 17/17 y las validaciones del registro de 827 entradas y de 383 macros. La prueba nueva se ejecuta desde la suite matemática. El monolito de 370 páginas corresponde al punto de restauración público y la exploración se conserva en este informe.

Veredictos crudos del bloque v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, y v31 `BLOCKED_FOUNDATION_FIRST_GATES`. El valor de `external_support_certified` sigue siendo `false`.

## Incorporación en las fuentes · 2026-11-10

La proposición `prop:common-tower-phase-repair` queda en la sección de cierre formal de Paper VII. El teorema `thm:tower-native-lesion-obstruction` queda inmediatamente después de la ventana racional en Paper VIII. Sus hipótesis conservan el protocolo exploratorio congelado. El plan de integración, con SHA-256 `76952ccff1056bcc6849b72c52933c04f7f36306a412a9de5bc313ea563191dc`, se archivó antes de editar en `E:/QICN-PRESERVACION/2026-11-10-integracion-torre-edca429/PRERREGISTRO.md`.

La inspección de las fuentes verificó que, retirando las dos inserciones, se recuperan exactamente los manuscritos previos. El registro pasa de 827 a 829 entradas y conserva íntegros los 827 registros anteriores. La comparación fuente/monolito da 12 de 12 secciones. Cambian sólo los capítulos de VII y VIII. Cada título nuevo aparece en la fuente y sección ensamblada correspondientes y se comprobó su presencia en el PDF respectivo y en el monolito.

| Documento | Páginas | SHA-256 |
|---|---:|---|
| Paper VII | 30 | `b8231901a30bc79d161ecf6d50585e09be95e4952bd937d2547691ad2ed5ab9c` |
| Paper VIII | 45 | `0706d0de8e082d2652f60dedbbc30875429d9d7ce3017b09f81f06c25d00ab89` |
| Monolito | 372 | `87306e7f94abc7acee5483af49695862b3a4ab6876e63b25cd3cae431537a953` |

Los logs finales carecen de citas o referencias indefinidas, etiquetas duplicadas y nuevos avisos de caja. Se ejecutaron los tres verificadores de raíz, publicación 6/6, matemáticas 17/17, validación de 829 registros y de 383 macros. Los veredictos crudos son `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY` en el bloque v25/v26, `BLOCKED_MULTIPLE_GATES` en v27/v28/v30 y `BLOCKED_FOUNDATION_FIRST_GATES` en v31. El valor de `external_support_certified` es `false`. Copia de insumos, logs y cotejos en `E:/QICN-PRESERVACION/2026-11-10-integracion-torre-edca429`. La revisión independiente y la pertenencia conjunta de V–VII–VIII permanecen abiertas.
