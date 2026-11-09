# Continuidad del programa teórico completo

Este inventario conserva el alcance de la auditoría integral. La presente reparación local no reclasifica el resto del marco como demostrado ni retira sus propuestas. Los detalles y contraejemplos completos permanecen en los ocho informes de `analysis/AUDITORIA_INTEGRAL_CODEX_2026-11-08/`.

| Área | Obligación preservada | Resultado de esta fase / trabajo restante |
|---|---|---|
| BaseCore: dinámica | Derivar condiciones de contracción y no colapso, exhibir realizaciones | Corregido operador discreto; nueva clase conjunta no constante y prueba de independencia H5. Revisión externa de estas pruebas pendiente |
| BaseCore/Paper I: identidad y rigidez | Métrica finita/completa, transportes, no determinación finita y estabilidad cuantitativa | BC-MET y BC-RIG con corrección local verificada en [su informe de fase](BC_MET_BC_RIG.md). BC-NS probado bajo presupuesto binario declarado en [el informe siguiente](BC_NS_LECTURA_COMUN.md). Abiertos los demás hallazgos del informe 01, la formalización analítica y la revisión independiente |
| BaseCore/Paper II: regímenes | Compatibilidad E1/E2, clase no vacía y derivación de continuidad/fragmentación | E1/E2 reparadas localmente por convergencia controlada, con realización y cota minimax; lectura común realizada en dos torres transportadas y preservación de resistencia bajo sectores comparables. Realizaciones más amplias pendientes |
| BaseCore/Paper III: nulo | Propagar resultados tipados y probar las conclusiones sobre orden, positividad, testigos y ruido | Separación tipada, mínimos finitos, brechas relativas, ruido y consecuencias de anexos reparados localmente; testigo externo de nulo construido con una clase interna de masa infinita. Realización de condiciones CCR más fuertes, estabilidad temporal y positividad global siguen abiertas |
| Papers IV/VI: predicción y pruebas | Estimandos, independencia, potencia, comparadores y criterios falsables | Abierto; no se generan campañas ni se altera evidencia histórica |
| BaseCore/Paper V: criterio e integración | Cociente válido, independencia con realizaciones, separadores y soporte común | Cociente con cierre estructural, ruptura no exclusiva y tipos del certificado reparados localmente; BC-LEG, cuantificación completa, modelos testigo e integración siguen abiertos; no se afirma Cop completo |
| Papers VII/VIII | Viabilidad, métricas con rangos válidos, self-index y clases de observadores | Abierto: definiciones/estimadores, intervenciones, límites y controles del informe 03 |
| Paper IX y puente | Realización conjunta de predicados, estrictez e hipótesis de enlace | Abierto; interpretaciones conservadas con su estado, sin certificación fenomenal |
| Paper X | Adjudicación con pérdidas/cobertura no triviales, equivalencia poblacional y controles | Abierto: always-tie y demás hallazgos del informe 04 |
| Anexos v26–v31 | Centros, coercividad, codominio compacto, regla de decisión y estadística correctos | Abierto: informe 05. La reparación del puente discreto no repara estos anexos distintos |
| Lean | Reproducir las fuentes locales fijadas y precisar qué resultado mecaniza cada una | Reproducido en WSL: 19 archivos Lean y 78 teoremas públicos auditados; compilación nativa completa de Windows y cobertura de las correcciones R1–R4 pendientes |
| Procedencia y corpus | Una fuente vigente por resultado, referencias correctas, estados y PDF identificados | Sincronización local BaseCore/monolito/registro en esta fase; freezes y divergencias de otros papers conservados, pendientes |
| Fundacionales e interpretación | Formalizar ideas prometedoras y acreditar las afirmaciones empíricas históricas | Abierto: informe 07. Las metáforas y el lenguaje de personaje no constituyen demostraciones |

## Criterio de fortalecimiento

No se mide avance por número de afirmaciones etiquetadas como teorema. Se distingue: (a) demostración nueva para una afirmación existente, (b) conclusión más fuerte o menos hipótesis válidamente justificadas, (c) corrección de un enunciado refutado, y (d) propuesta conservada con obligación abierta.

La contracción discreta anterior era falsa bajo sus supuestos escritos. La nueva condición disipativa es suficiente y más restrictiva que la antigua regularidad Lipschitz; no se presenta como conservación de aquella generalidad falsa. La nueva realización y su tasa exacta aportan respaldo positivo. El resultado de puntos fijos, una vez establecidas las condiciones correctas, mejora la cota y elimina la exigencia de un margen uniforme de contracción discreta: el factor del modelo continuo basta para su denominador.

Ningún sistema independiente construido para una propiedad cierra por sí mismo la compatibilidad de todas las propiedades. El testigo común de esta fase sólo satisface las obligaciones que su teorema enumera.

## R2 — Obstrucción exacta y realización asintótica de E1/E2

Fecha: 2026-11-08, después de aceptar la reorganización. Estudio matemático local con demostraciones escritas y controles racionales; sin verificación Lean ni revisión externa. No cambia silenciosamente los axiomas de BaseCore/Paper II ni declara reparadas sus consecuencias.

### 1. La formulación exacta no admite la realización buscada

Sean `p_t:I→S_t` las proyecciones de un límite inverso no vacío y `phi_t:S_t→E` mapas totales. La condición E1 exacta escrita en el corpus es

`phi_(t+1)(p_(t+1)(x)) = phi_t(p_t(x))` para todo `x` y `t`.

Por inducción, todos los términos son `phi_0(p_0(x))`. Si `Phi(x)` se define como su límite, necesariamente

`Phi = phi_0 ∘ p_0`.

E2 excluye precisamente esa factorización por cualquier corte fijo. Por tanto, E1 exacta y E2 no tienen una realización conjunta bajo esta lectura. Si se permiten mapas parciales, el argumento vale en todo dominio común donde están definidos todos los términos, usando las proyecciones restringidas a ese dominio. No basta cambiar la palabra «total» por «parcial» sin precisar una semántica diferente de dominio/factorización.

**Consecuencia:** no existe una demostración que pueda exhibir un sistema no vacío satisfaciendo simultáneamente esas dos condiciones literales. Es necesario reformular una condición y volver a verificar sus dependencias. La siguiente construcción conserva E2 y sustituye la igualdad exacta por una condición de aproximación explícitamente distinta.

### 2. Condición asintótica suficiente, con control de error

En un codominio métrico completo `(E,d_E)`, considerar E1a:

`d_E(phi_(t+1)(p_(t+1)(x)), phi_t(p_t(x))) ≤ a_t`, con `a_t≥0` y `sum_t a_t<∞`, uniformemente en `x`.

Para `m>n`, la desigualdad triangular acota la distancia entre los términos por `sum_(t=n)^(m-1) a_t`. Las colas convergen a cero uniformemente; cada sucesión es Cauchy. Completitud da un límite único `Phi(x)` y

`d_E(Phi(x),phi_n(p_n(x))) ≤ sum_(t=n)^∞ a_t`.

Si las lecturas `phi_n ∘ p_n` son continuas, el límite es continuo: dado un error positivo, escoger una cola menor que un tercio del error, usar continuidad de la lectura finita elegida y aplicar la desigualdad triangular a los dos errores de cola y al término finito. La continuidad no se deduce aquí de una etiqueta CCR; se deriva de condiciones sobre las lecturas y sus colas.

E1 exacta es el caso particular `a_t=0`; ese caso sigue excluido por E2. E1a es una revisión del modelo, no un sinónimo de E1. La métrica/completitud es una hipótesis explícita de este resultado, no una propiedad deducida de un conjunto abstracto.

### 3. Realización conjunta no vacía y cota inferior demostrada

Tomar `S_t={0,1}^(t+1)` y proyecciones que eliminan el último bit. Su límite inverso es el conjunto de sucesiones binarias `I={0,1}^N`, con la identificación por prefijos. Elegir `E=[0,1]` y

`phi_t(b_0,...,b_t) = sum_(j=0)^t 2 b_j / 3^(j+1)`;

`Phi(b) = sum_(j=0)^∞ 2 b_j / 3^(j+1)`.

La serie está en `[0,1]`. Sus incrementos están acotados por `a_t=2/3^(t+2)`, de suma finita, y su error uniforme después del corte `t` es como máximo `epsilon_t=3^(-(t+1))`. Así satisface E0 y E1a.

Para cualquier corte `t`, dos sucesiones pueden coincidir hasta `t` y diferir sólo en el bit `t+1`. Sus imágenes difieren en `2/3^(t+2)>0`; por tanto, ningún mapa del prefijo `p_t` determina `Phi` sobre todas las sucesiones. Se cumple E2 para todos los cortes canónicos finitos.

Si dos sucesiones difieren por primera vez en `m`, definir `d_I(x,y)=3^(-(m+1))`, y cero si son iguales. El término principal de la diferencia de sus imágenes tiene magnitud `2/3^(m+1)`; la cola restante tiene magnitud como máximo `1/3^(m+1)`. En consecuencia,

`d_I(x,y) ≤ |Phi(x)-Phi(y)| ≤ 3 d_I(x,y)`.

Se deriva una cota inferior global y una cota superior, además de inyectividad y continuidad, para esta realización concreta. No se presupone esa cota como campo de una definición. El dominio es completo: una sucesión Cauchy estabiliza cada prefijo, que define su límite. También es totalmente acotado, pues los prefijos de longitud fija forman una cobertura finita de diámetro decreciente; de ahí su compacidad. No se afirma irreducibilidad frente a todos los observadores: `Phi` mismo codifica la sucesión en un real. E2 se refiere a las proyecciones canónicas especificadas.

### 4. Error óptimo exacto para un presupuesto finito

Para cualquier decodificador `g:S_t→R`, definir

`R_t(g)=sup_(x∈I) |Phi(x)-g(p_t(x))|`.

Fijado un prefijo `s`, las continuaciones con todos los bits restantes a cero y con todos a uno pertenecen al dominio. Sus imágenes son `phi_t(s)` y `phi_t(s)+epsilon_t`. Para cualquier valor `g(s)`, al menos uno de sus errores es `≥epsilon_t/2`, por la desigualdad triangular. Esto da una cota inferior para cualquier decodificador.

El decodificador de punto medio `g*(s)=phi_t(s)+epsilon_t/2` alcanza esa cota, ya que todas las continuaciones del prefijo tienen imagen dentro del intervalo determinado por sus dos extremos. Por tanto,

`inf_g R_t(g) = 1 / (2·3^(t+1))`.

Es una cota minimax exacta para la clase y la pérdida declaradas. Es positiva para cada corte finito, pero tiende a cero al aumentar el presupuesto. No demuestra una obstrucción uniforme positiva al aumentar la resolución, ni una imposibilidad general de simulación.

### 5. Resultado y estado de integración

Se obtiene una realización que satisface simultáneamente no factorización por prefijos finitos, convergencia cuantificada y regularidad inferior/superior. Es un respaldo positivo para una posible revisión del régimen de asignación, con cambio de hipótesis visible. No satisface E1 exacta y no se presenta como realización del conjunto exacto refutado.

Los controles racionales reproducibles están en `E:/QICN-PRESERVACION/2026-11-08-reorganizacion-01/check_regime_model.py`; resultados en el respaldo y `.cache/qicn-reorganization/regime-model-checks.json`. Pasaron las cuatro familias: obstrucción de corte exacto, variación posterior al prefijo, cotas bi-Lipschitz y cotas minimax por extremos/punto medio. Los 1.155 casos finitos registrados son regresiones de estas fórmulas; no reemplazan las demostraciones universales anteriores ni constituyen evidencia empírica.

**Abierto:** adoptar una versión del axioma exige actualizar las demostraciones dependientes de BaseCore/Paper II. En particular, E1a por sí sola no establece naturalidad entre sistemas perturbados, no deriva invariancia desde CCR y no convierte fragmentabilidad en discontinuidad topológica. No se propaga una sustitución textual que deje esos pasos incorrectos. Las propuestas sobre rigidez, régimen nulo e integración se conservan, con sus obligaciones pendientes. Este estudio no cierra el marco completo.


### R2 — Adopción posterior autorizada y verificada

El usuario eligió conservar E2 y reformular E1 con convergencia controlada. Las secciones anteriores describen el estudio previo; esa revisión ya se adoptó explícitamente en BaseCore 04 y Paper II, con propagación al monolito y al registro. No se sustituyó sólo una frase: se corrigieron existencia, necesidad/minimalidad, continuidad, comparaciones entre sistemas, clasificación condicional y las consecuencias sobre pérdida/protección. La protección usa ahora una distancia de referencia para evitar sumar unidades incompatibles.

Se conserva el programa completo. Las antiguas conclusiones sin soporte suficiente se repararon mediante condiciones explícitas y controles; no se presenta su generalidad anterior como demostrada. La continuidad tiene ahora una prueba por aproximación uniforme; no depende de etiquetar el sistema como CCR. La fragmentación compara puntos y lecturas de un mismo dominio declarado, y no se confunde con discontinuidad topológica. La realización ternaria demuestra la cota inferior, en lugar de suponer que toda asignación la cumple.

Se preservaron todos los labels anteriores. Se añadieron 14 entradas formales en las dos superficies; el registro pasó de 763 a 777 entradas, con cero deriva o dependencias sin resolver. El número de demostraciones escritas aumentó en ambas fuentes. Se retiraron inferencias refutadas y resúmenes repetidos; no se retiró ninguna propuesta por su dificultad. La fuente previa completa está en el respaldo de fase, y la comparación estructural en `REGIME_STRUCTURE_REVIEW.json` del respaldo.

Verificación: gates de raíz y `verify:release` satisfactorios, seis cadenas; validador de registro sin blockers/warnings; controles iniciales 64/64, controles racionales y de enlace de R2 1.168/1.168; monolito 12/12 coincidente. Las pruebas universales están en los textos, no en ese número de casos. Veredicto científico v31: `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`.

Compilaciones completas: BaseCore 47 páginas, Paper II 17 y monolito 344. Una primera pasada detectó dos referencias introducidas con el nombre de la hipótesis métrica de BaseCore en Paper II; se corrigieron usando su label existente y se repitió la cadena sin debilitar el verificador. La pasada fallida queda preservada. El resultado final no tiene referencias indefinidas ni labels duplicados. Overfull: 6/2/3; el monolito tiene 332 underfull frente a 331 en la referencia de reorganización. Se registra ese aviso adicional de maquetación; no se declara una edición tipográfica final.

Fuente, hashes, logs, estados anterior/verificado y comandos están en `.cache/qicn-regimes/` y `E:/QICN-PRESERVACION/2026-11-08-reorganizacion-01/`. No se efectuó revisión externa ni mecanización Lean. El vínculo general de la masa con las condiciones de transporte y las demás obligaciones del programa permanecen abiertos.

## R3 — Cociente, ruptura y certificado: cierre local

Fecha: 2026-11-08. Se incorporó a BaseCore 07 el cierre estructural de las relaciones de respuesta que Paper V ya exigía. El cociente se demuestra como intersección de equivalencias. El control 0,3/4,3/2 muestra el fallo de transitividad por distancia; la igualdad de celdas proporciona un modelo de cierre, sin afirmar los seis invariantes.

La ruptura distingue fallo del certificado en un soporte y ausencia de testigos en todos los soportes. Sus etiquetas no son excluyentes. BaseCore 08 conserva Cert(S) como objeto y usa CertFlag(S) como indicador matemático distinto; un resultado empírico desconocido no se identifica con un cero demostrado.

Registro 777→779 entradas, todos los identificadores previos conservados, macros 383 sin cambios, 12/12 capítulos concordantes. Controles 9/9; gates de raíz y release interno 6/6 satisfactorios, registro sin blockers/warnings, controles R1 64/64. Los controles booleanos sólo prueban distinciones de cuantificadores. Las demostraciones universales están escritas en la fuente.

BaseCore 48 y monolito 344 páginas reconstruidos sin referencias indefinidas ni labels duplicados; overfull 6/3, underfull 0/332, sin incremento respecto a R2. Paper II no fue modificado en R3. Se añadió .gitattributes para preservar los PDF como binarios: Git había interpretado un PDF como texto al no encontrar bytes nulos al principio. La regla evita normalización de bytes y comprobaciones de texto sobre PDF; no modifica los validadores científicos. Véase la [documentación oficial de Git](https://git-scm.com/docs/gitattributes).

Resultado científico conservado: BLOCKED_FOUNDATION_FIRST_GATES; external_support_certified=false. No se afirma realización conjunta de todos los invariantes, independencia, normalización de márgenes ni cierre de Cop. Evidencia y estados anterior/verificado en el respaldo externo y .cache/qicn-partitions. Revisión matemática externa y Lean pendientes; sin commit/push.

## R4 — Régimen nulo: conciliación y reparación local

Fecha: 2026-11-08. Fuentes: BaseCore 05, Paper III y dependencia de tipos en BaseCore 07. Se conservaron todos los labels/IDs previos y los enunciados del programa con hipótesis o cargas explícitas; las versiones anteriores completas están en el respaldo. No se sostiene la generalidad de afirmaciones refutadas.

1. La comparación usa puntos en un dominio métrico declarado, o un transporte explícito hacia él. Se retiró la evaluación de un conjunto I como si fuera un punto de su propio dominio. C1/C2 son diagramas de transporte; una copia transportada exactamente no se presenta como un testigo nuevo separado. La clase CCR no construye automáticamente el testigo o la constante inferior.
2. Se demuestra la cota nueva no anclada max_i d(Phi(z_i),nulo) ≥ C epsilon/2. El factor 1/2 se alcanza en el cuadrante positivo con métrica l1. No requiere CCR. Si un extremo es nulo, el otro cumple la cota C epsilon. La exclusión conjunta exacta no implica inestabilidad temporal ni excluye un nulo individual estable.
3. Una imagen positiva finita no vacía tiene un elemento minimal sin exigir un ínfimo o completitud de orden. Si sus dos valores son comparables, tiene un menor único. El diamante completo muestra por qué el ínfimo puede ser nulo y la unicidad fallar. Se distinguen distancia al nulo, brecha global y brecha relativa al conjunto auditado. La prueba de positividad relativa ya no cambia el dominio de un ínfimo global a mitad de argumento.
4. Se separan errores de estimación eta_0,eta_1 y radios de aceptación nula r_0,r_1. La separación estimada requiere margen > eta_0+eta_1; excluir dos aceptaciones nulas requiere > eta_0+eta_1+r_0+r_1. Con todos los radios iguales, 4 eta es una condición suficiente; 2 eta sólo garantiza separación estimada. Se conserva un contraejemplo explícito de la inferencia antigua.
5. Los anexos conservan sus propuestas con pruebas y condiciones correctas: pesos sumables no fuerzan cambios de soporte finito; factorización única en la imagen fiel, sin inventar inversa fuera de ella; herencia con transportes y sector de intervenciones declarados; reconstrucción con presupuesto de prefijo y error óptimo 1/(2·3^(N+1)), que tiende a cero. Una dimensión real finita no equivale a memoria finita en bits. La realización ternaria aporta un modelo conjunto de lectura/no determinación finita, sin atribuirle una masa infinita no calculada.
6. El atractor de estados Attr_X(S) se define en X mediante transiciones y una cuenca declarada; Attr(S), de lecturas estables, permanece en E. BaseCore 07 ya no intersecta esos tipos. La definición exige un certificado de existencia; no se deduce ese certificado de la separación de un par.

Las propuestas generales sobre rigidez, masa infinita, estabilidad temporal, realización de todos los invariantes y cierre fenomenal permanecen sujetas a sus obligaciones. No se ha construido un sistema físico CCR ni se declara una teoría empíricamente validada. El resultado finito de orden y la cota no anclada son mejoras matemáticas reales en el dominio escrito, sin afirmación de novedad frente a literatura.

Comparación estructural en NULL_STRUCTURE_REVIEW.json: ningún label retirado; BaseCore 05 conserva 8 teoremas, 1 lema, 2 proposiciones, 1 corolario y 5 definiciones, y pasa de 6 a 12 pruebas escritas. Paper III conserva 13 teoremas, 3 lemas, 11 proposiciones, 4 corolarios y 15 definiciones; pruebas 25→30, ejemplos 3→4. BaseCore 07 añade una definición de atractor de estados. Registro 779→781, macros 383, cero deriva/dependencias irresueltas. La reducción de líneas refleja retirada de inferencias refutadas y una prueba duplicada, no exclusión de propuestas por dificultad.

Controles racionales y negativos: 298 comprobaciones registradas en 22 familias, además de 6.561 configuraciones racionales de ruido dentro de una familia; las demostraciones universales están en las fuentes. Pasaron R1 64/64, R2 1.168/1.168, R3 9/9, tres gates de raíz, release 6/6, validador y comparación íntegra 12/12. La primera compilación precedió a la desambiguación de Attr_X y a precisar la dimensión positiva del dominio lineal; se preservó y se repitió la cadena completa tras esas revisiones. No se alteró un verificador.

PDF finales R4: BaseCore 49, Paper III 18, monolito 346 páginas; sin referencias indefinidas o labels duplicados. Avisos overfull/underfull: basecore 6/0, paper3 1/7, monolithic 3/334. Son deuda tipográfica; no se afirma acabado visual integral. Paper II conserva su fuente/PDF verificados en R2.

Raw v31: BLOCKED_FOUNDATION_FIRST_GATES; external_support_certified=false. Sin nueva verificación Lean, revisión matemática externa, commit, push o publicación. Estado anterior, estados verificados, comandos, hashes y logs en el respaldo externo y .cache/qicn-null. El fortalecimiento del marco completo no está concluido; las obligaciones de la tabla inicial conservan prioridad y alcance.


## R5 — Reproducción formal y punto de partida del plan completo

La reproducción quedó cerrada en Lean 4.31.0 sobre Ubuntu/WSL con los mismos pins. Se elaboraron desde fuente 19 archivos Lean y se auditaron 78 teoremas públicos. La edición activa en el Escritorio conserva los 115 hashes de TeX, bibliografías, PDF y registros comprobados contra R4; no hubo sustitución de enunciados de los papers durante el traslado.

La capa Lean existente se reprodujo sin alterar sus enunciados. Las obligaciones de mecanización de R1–R4 siguen abiertas: perturbación y puente disipativo (R1), obstrucción exacta y realización asintótica E1/E2 (R2), cocientes y cuantificadores (R3), separación del régimen nulo, ruido y estabilidad temporal (R4). El roadmap las ordena según las dependencias de las pruebas.

R1–R4 se repiten además con `npm run verify:math`. Son controles finitos y vínculos de fuentes, distintos de las demostraciones universales. El orden de fortalecimiento restante está en el roadmap. No se presenta como cerrada una hipótesis sólo porque un teorema Lean la acepte como premisa.
