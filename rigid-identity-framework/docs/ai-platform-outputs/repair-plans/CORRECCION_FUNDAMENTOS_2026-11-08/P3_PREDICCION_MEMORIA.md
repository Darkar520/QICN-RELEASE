# P3 · Predicción diferencial de memoria bajo sondeo

## Prerregistro local

**Punto de partida.** P2 aporta un diagnóstico válido sobre pares reiniciados y una obstrucción para etiquetas de estado persistentes bajo el sham declarado. El certificado de trayectoria única y el certificado conjunto quedan abiertos. Alcance P3: Paper VI, su registro y compilaciones, un control racional, roadmap y ledger. La extensión es un modelo matemático sintético. La proyección sobre los observables anteriores conserva la dinámica de P2 y su certificado pareado en ese dominio.

**Control negativo.** Preparar copias con el mismo perfil, fase y bits. Aplicar `q0=+1` y `q0=-1` con el mismo `u0`, y después la misma secuencia de controles en ambos brazos. La regla original inserta un cero en la primera posición del código. Desde la segunda transición, las fases y los códigos coinciden en ambos brazos. Comprobarlo en los cuatro canales originales, incluso con pulsos tardíos y con primer bit cero.

**Extensión y rival.** Mantener la dinámica original y añadir una sola coordenada real `m`, medida en unidades de amplitud de fase (vueltas en escala lineal). Reiniciar `m0=0`. Para `lambda∈[1/12,1/9]` y `a∈[1/2,3/4]`, definir `s(q)=-1` para `q=-1` y `s(q)=+1` en otro caso. Comparar:

- M, memoria cuyo signo cambia bajo la sonda negativa: `m[t+1]=a*s(q[t])*m[t]+lambda*q[t]*b1[t]`.
- A, memoria de decaimiento fijo con la misma carga inicial: `m[t+1]=a*m[t]+lambda*q[t]*b1[t]`. Como control adicional, permitir una respuesta aditiva tardía `lambda*q[t]` común a ambos brazos. Se cancela en la diferencia. La conclusión sobre el contraste se extiende a cualquier carga tardía aditiva común a los brazos con retención fija.

Ambos reciben la misma información (`u,q`, el bit de preparación y `lambda` fijado), el mismo canal posterior `Y=m+e`, una coordenada dinámica y un escalar ajustable en el mismo intervalo. La preparación y la secuencia de controles están fijadas desde fuera, con el primer pulso opuesto, todas las órdenes de fase emparejadas y el sondeo tardío común a ambos brazos. El canal temprano de P2 se conserva separado. El supuesto causal es que la sonda actúa solo por las actualizaciones escritas y que el error no realimenta la dinámica. La lectura posterior no se usa en la selección de la clase pareada ni se obtiene de los cuatro canales originales, que son idénticos entre M y A para el mismo brazo y comando.

**Ajuste y reserva.** Usar solo el contraste orientado `C2=Y2(+1)-Y2(-1)` en el bloque de calibración con primer bit uno y `q1=0`. Calcular `a_hat=clip(C2/(2*lambda),1/2,3/4)` una sola vez para cada condición. Reservar horizontes `T=4,5`, fase y perfiles distintos, y un sondeo en el paso `j∈{1,T-1}` con `qj∈{-1,+1}`; en los demás pasos posteriores usar cero. Ambos brazos reciben el mismo `qj` dentro de cada condición. Usar `qj=0` como sham. Con `k=T-1`, M predice `C_T(qj)=2*lambda*a_hat^k*s(qj)` y A predice `C_T(qj)=2*lambda*a_hat^k`. El contraste de interacción `C_T(+1)-C_T(-1)` es positivo para M y cero para A. Dos sondeos negativos deben cancelar la inversión en M.

**Decisión congelada.** Admitir error adversarial `|e|≤1/4096` por observación en calibración y reserva. Tolerancia por contraste `1/256` vueltas. Para cada par de sondas opuestas en reserva, un modelo pasa si ambos contrastes quedan en tolerancia. Seleccionar solo si pasa exactamente uno; reportar empate si ambos pasan y rechazo si ninguno pasa. El sham se controla aparte. El contraste limpio por brazo diferencial tiene magnitud mínima `1/96` y la interacción limpia mínima en M es `1/48`. Con `a=0` tras la carga, la memoria desaparece aunque la lectura temprana conserve su contraste. Simular también primer bit cero, acoplamiento cero, error extremo, comandos de fase desemparejados y un control con dos predicciones idénticas para impedir una selección espuria.

**Ejecución y parada.** Simular ambas dinámicas con aritmética racional, verificar las ecuaciones cerradas y evaluar las dos direcciones de discriminación. Calibrar en el perfil sin salto, fase cero y código `2/3`. Reservar los seis perfiles con salto, fases `1/7,13/14` y códigos `2/3,1` para las comprobaciones de trayectoria. Enumerar `a∈{1/2,5/8,3/4}`, `lambda∈{1/12,7/72,1/9}`, ambos horizontes y posiciones de sonda. En los contrastes, cruzar errores de calibración y de evaluación en `{-1/4096,0,1/4096}` por lectura. La garantía para errores intermedios se deriva con desigualdades, y el barrido es un control finito. Detener la fase ante un fallo del control, una fuga de datos reservados al ajuste o un cambio de las reglas después de observar resultados. Estas ejecuciones verifican la capacidad de distinguir los dos generadores declarados. Una aplicación a datos independientes exige medir el canal posterior sin reconstruirlo a partir de la ecuación de M y contrastar rivales que también puedan reproducir una interacción.



## Resultado local

Las actualizaciones se ejecutaron paso a paso, y las predicciones se calcularon aparte con las fórmulas cerradas. La estimación de retención recibió solo la pareja de calibración. Las etiquetas de los generadores se usaron para comprobar las decisiones, después de aplicar la regla de pérdida a las lecturas de reserva.

| Control | Resultado |
|---|---:|
| Apagado en los cuatro canales originales, con distintas preparaciones y órdenes posteriores | 1.152 comparaciones exactas |
| Conservación de la proyección y contraste predicho en las extensiones | 2.304 comprobaciones |
| Datos de M evaluados frente a ambos modelos | 26.244 selecciones correctas |
| Datos de A evaluados frente a ambos modelos | 26.244 selecciones correctas |
| Carga aditiva común y sham sin sonda, y cancelación con dos sondas negativas | 36 casos por control |
| Ablación de la retención y controles de preparación o acoplamiento nulos | 72 conjuntos de controles |
| Empate, rechazo y comandos de fase desemparejados | 36 conjuntos por control |

En M, la mínima interacción observada fue `61/3072` vueltas, que alcanza `1/48 − 4/4096`. El mayor residuo aceptado fue `45005905/34359738368`, menor que `1/256`. El menor residuo del modelo descartado fue `125/6144`, mayor que `1/256`. Los conteos enumeran condiciones y combinaciones de error de forma determinista. No representan observaciones independientes ni estimaciones de desempeño poblacional.

La comparación distingue cambio de signo dependiente de la sonda frente a retención fija con cargas tardías comunes. Ambos modelos incorporan memoria y ajustan un parámetro; la prueba discrimina la **forma de actualización**. Un rival con memoria modulada por la sonda y la misma ley observable puede empatar. La presión experimental siguiente consiste en medir el resultado posterior con un canal independiente de la construcción sintética y especificar rivales que también permitan interacciones. La conclusión queda dentro del dominio del modelo y el presupuesto declarado. El certificado de trayectoria única y el certificado conjunto de P2 siguen abiertos.

La elección de clases de entrada como condición de identificabilidad tiene antecedentes en sistemas bilineales. El resultado de este paper corresponde a estos dos modelos y a este protocolo, sin pretensión de identificación general. [Sontag, Wang y Megretski, *Input Classes for Identifiability of Bilinear Systems*](https://dspace.mit.edu/entities/publication/eaa6dc67-f6a6-4ccd-9424-cc01a584148b)



## Verificación documental

- Se cotejaron en P2 las entradas del registro con la fuente, las huellas de ambos PDF de partida y el texto de la prueba. El control racional volvió a pasar con 10.206 ablaciones y 244.944 trenes de control. Se preservaron la fuente y el PDF propio de Paper V, y su capítulo dentro del monolito.
- Se conservaron los 812 registros previos, con actualización de posiciones de línea donde correspondía. Se incorporaron dos proposiciones de Paper VI, ambas con demostración. Se comprobó la propagación de los tres títulos nuevos, antes y después, en fuente, sección generada y ambos PDF. Las otras once secciones del monolito coincidieron después de normalizar finales de línea.
- Pasaron tres verificadores de raíz, `npm run verify:release` 6/6, `npm run verify:math` 13/13 y los validadores de 814 entradas y 383 macros. Los veredictos crudos fueron v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES` y v31 `BLOCKED_FOUNDATION_FIRST_GATES`, todos con `external_support_certified=false`.
- `pdflatex`, `biber` y `npm run compile:monolithic` reconstruyeron Paper VI y el monolito. Sin referencias o citas indefinidas ni etiquetas duplicadas. Los conteos de avisos de caja permanecieron en 3/38 para Paper VI y 3/334 para el monolito.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| Paper VI | 23 | `c04a56b23870c007ddf354ad469b0b6ccd320274eee5ccb798e29a165b4ce878` |
| Monolito | 363 | `609edfb6ead627b0be21afde5d0c72eb02eb09265837369df71cfe49ddcd8398` |

Prerregistro congelado antes de ejecutar, SHA-256 `42665c9024d99a7e9f0a22a76472aa1f1ce8b449624fb4b72a2b179add5b1f8a`. Logs y prerregistro en `E:/QICN-PRESERVACION/2026-11-09-p3-memoria-f87eaa9`. Quedan pendientes la mecanización de los dos resultados, la revisión independiente y una prueba con un resultado posterior medido de forma independiente.
