# Extensión cuerpo–mundo de la torre · Prerregistro

Fecha: 2026-11-11. Base: `ceb7b91bed4ea00da314a6a8737bd855cb3cb467`, commit local del Frente 5 con árbol limpio. Carpeta de ejecución: `E:/QICN-PRESERVACION/2026-11-11-cuerpo-mundo-bridge`.

## Alcance y orden

1. Auditar la obstrucción de trazas de IX y los dominios originales de los certificados de V–VIII. Conservar `prefix_tower.py` y todos sus controles. Las áreas `release/`, `corpus/`, `artifacts/`, el legado y el runtime quedan fuera de modificación.
2. Diseñar y demostrar la extensión, las tres cargas nuevas, la conjunción local de seis ensayos y las obstrucciones a una extrapolación de clase. Congelar este archivo y su SHA-256 antes de ejecutar los controles nuevos.
3. Implementar la planta matemática y el control racional en el paquete existente de reparación. Integrar los enunciados en IX, el registro, el monolito, roadmap y ledger único. Verificar antes de trasladar al Escritorio. No hacer push.

## Sistema propuesto y frontera causal

Estado `s=(x,b,w)`, con `x` exactamente el estado de `prefix_tower.py` y `b,w ∈ [-1,1]^2`. La proyección es `pi(s)=x`. El marco corporal `P(p)` es I en el perfil de rol 0 y la permutación de los dos ejes S en el perfil de rol 1; en los restantes perfiles del catálogo se fija I. El índice procede de la preparación nativa, no del resultado de los ensayos.

Fijar `alpha=beta=1/4`, `k=1/8`, `h=1/4`. Sean Q la identidad o la proyección de mundo sobre el modo común, L un mapa evaluativo de norma infinito a lo sumo uno, epsilon un conmutador de evaluación y mu una ganancia motora en `[-1,1]`. Las entradas primitivas son el comando nativo c, el impulso corporal p y el impulso de mundo d, con normas infinito a lo sumo `1/4`. Actualización:

```
x_next = F_c(x)
sensor = P Q w
force = k L (sensor - b)
b_next = alpha b + beta sensor + epsilon force + p
w_next = alpha Q w + beta mu Q P^{-1} b + Q d
```

El grafo temporal contiene `b -> b_next`, `w -> b_next`, `b -> w_next`, `w -> w_next`, las entradas tipadas y el perfil hacia P. No hay arista de b o w hacia `x_next`. Mu pertenece a la arista motora; su etiqueta no se entrega como entrada a otros mecanismos de los rivales desacoplados. Todas las inferencias causales se condicionan a esta modularidad y a inicialización, entradas y aleatorización emparejadas.

El modo nativo usa Q=L=I, epsilon=0, mu=1, p=d=0. La lectura nativa sigue siendo R(pi(s)); las lecturas corporales y de mundo son canales adicionales tipados. Los certificados heredados conservan sus instrumentos, clases de comparación y presupuestos originales. No se afirma que añadir canales autorice ampliar gratuitamente las clases rivales upstream. La sección `x -> (x,0,0)` es invariante bajo los controles nativos. En la métrica `max(d_core, ||db||_inf/4, ||dw||_inf/4)` se esperan la misma contracción nativa `9/16` y la misma seguridad en los protocolos publicados. La familia intervenida tiene cota uniforme `3/4` en la fibra y soporte compacto invariante. Los impulsos de los ensayos parten de fibra cero, alcanzan norma a lo sumo h y luego permanecen dentro del núcleo de radio `1/2`.

## Predicciones matemáticas y rivales

### V · Evaluación vectorial causal

En ambos roles iniciar la fibra en cero. Aplicar en el primer paso el impulso `d=h P_ref^{-1} v`, con `v∈[-1,1]^2`; en el segundo activar la evaluación, y en el tercero leer el mundo. Restar el brazo con evaluación inactiva. La respuesta en el marco de referencia es `P_ref Delta w_3 = gamma mu L v`, donde `gamma=beta k h=1/128` en el modelo no comprimido. La fuerza evaluativa actúa en el cuerpo y su consecuencia reservada se mide en otro nodo y otro instante.

Ante la identidad L y mu=1, el rival sólo puede retener un resumen real continuo de v y decodificarlo después, sin volver a leer v o el mundo. Su error uniforme óptimo en norma infinito es exactamente gamma: un argumento antipodal en la frontera del cuadrado obliga a una colisión, y el predictor cero alcanza la cota. El coste nativo y la norma del impulso son constantes sobre esa frontera. Dos resúmenes reales, acceso posterior al estado o codificación discontinua invalidan esa separación; no se les atribuirá un margen positivo. Un gradiente de potencial escalar con acceso al vector completo también puede reproducir el controlador.

L=Q_comun aplana un modo y conserva el común; los proyectores de coordenadas suprimen selectivamente una componente. L=S es un control de igual norma que conserva rango dos. Se comprobará un interpolador escalar que ajusta exactamente una rejilla finita y falla en un par antipodal racional, para no presentar la rejilla como prueba no paramétrica de la obstrucción continua.

### W · Mundo dinámico indexado y realización mínima

Con evaluación inactiva, aplicar uno de los dos impulsos `h e_i` y observar el cuerpo durante cuatro pasos. Las matrices de respuesta en los tres primeros pasos son `M0=0`, `M1=t P`, `M2=2 alpha t P`, con `t=beta h=1/16`. La matriz de Hankel `H=[[M0,M1],[M1,M2]]` tiene rango cuatro, determinante `t^4` y norma infinito de su inversa 24. Esto exige cuatro estados en toda realización lineal exacta, con independencia del nombre que reciban sus coordenadas. La extensión propuesta alcanza ese mínimo dentro de la clase lineal y los puertos declarados; no se afirma minimalidad entre sistemas no lineales con codificaciones arbitrarias.

El rival de mundo reducido admite cuatro registros físicos pero su realización mínima mundo–cuerpo tiene grado a lo sumo dos: incluye todos los modelos lineales con dos estados activos y los demás registros desacoplados, y el mundo comprimido a un solo modo. Su Hankel tiene rango a lo sumo dos. Una cota racional mediante la inversa da error uniforme por entrada al menos `1/96`, o `1/6` en unidades de t. Un rival de índice ciego puede tener orden mayor, pero utiliza el mismo operador en ambos roles: ante I y S su error es al menos `t/2`. Se dan los mismos vectores de entrada, números de pasos, índices y límites de comando; la restricción del rival es estructural y declarada.

Q=Q_comun reduce la estructura indexada y el rango mientras deja intacta la respuesta del modo común, como control de competencia genérica. Un modelo de cuatro estados informado puede empatar. Un predictor arbitrario de historia también puede emular las ecuaciones: ese límite se registrará y no se esconderá bajo el nombre «sin modelo de mundo».

### E · Retorno motor y cirugía de arista

Con el impulso de mundo `h(1,1)` y evaluación inactiva, usar las ganancias motoras `mu=+1,-1` a igual magnitud y coste de entrada. Las respuestas corporales de los pasos dos y tres coinciden; en el cuarto, el coeficiente es `h(3 alpha^2 beta + mu beta^3)`. El residuo al restar `3 alpha/2` veces la respuesta del tercer paso es `mu s`, con `s=h beta^3=1/256`. La brecha entre signos es `2s`. Cortar el motor da residuo cero preservando la respuesta temprana, y comprimir sólo el modo diferencial del mundo conserva este control común.

Todo rival sin arista motora, con modularidad quirúrgica y sin acceso lateral a la etiqueta de intervención, produce la misma ley en ambos signos. Su error uniforme óptimo es al menos s. Se permiten memoria interna, no linealidad y aleatorización independientes; la invariancia causal es la restricción. Un rival que recibe la etiqueta puede ajustar artificialmente los dos resultados: se incluirá como control negativo de fuga, no como evidencia de cierre. La firma concierne constitución del retorno cuerpo–mundo definido, no experiencia corporal.

## Conjunción local y selectividad

La misma planta, parámetros, soporte y ventana de cuatro pasos soportan las seis tareas, en réplicas con preparaciones declaradas. D, A y T reutilizan las respuestas nativas de IX. T usa h=0 para el contraste de cuatro pasos, sin suprimir la comprobación de los doce horizontes ni la frontera h=8/9 anterior. La elección procede del horizonte común, no de resultados observados.

Errores por lectura: los originales `delta/16` para D/A y `3^-10/4` para T; en los puertos nuevos `gamma/64` para V, `t/64` para W y `s/64` para E. Los márgenes normalizados garantizados esperados son, en orden D,V,W,A,E,T:

```
(1/4, 15/16, 13/96, 1/4, 31/32, 1/2 - 64/19683)
```

El mínimo es `13/96 > 1/16`. La clase conjunta que conserve al menos una de las carencias estructurales anteriores tiene brecha de pérdida máxima normalizada al menos `5/192`, contando también el error del candidato. Una penalización de complejidad sólo conserva ese resultado cuando su diferencia declarada es menor que la brecha: no se fijará una penalización favorable después de ver los controles.

Intervenciones: D aplana el perfil después de fijar la referencia de preparación; V pone L=Q_comun; W pone Q=Q_comun; A sobrescribe el sitio nativo 5 después del primer avance; E corta el motor; T borra la memoria nativa después del tercer avance. D/A/T son perturbaciones explícitas del núcleo, no levantamientos nativos que se pretendan invisibles. La pérdida esperada de certificados locales es:

```
I_D : D,W       I_V : V       I_W : V,W
I_A : A         I_E : V,E     I_T : T
```

La matriz correspondiente tiene rango seis. Los efectos cruzados siguen los mecanismos compartidos; no se exige diagonalidad incompatible con esa causalidad. Se preservarán controles de igual norma, modo común, renombrados de cuerpo/mundo con referencias transportadas, supresión de señal, ruido acotado y reejecución determinista.

## Obstrucción de cierre por híbridos y estados de evidencia

No se asumirá que las seis victorias locales dan margen positivo frente a toda la clausura débil de IX. Dos evaluadores escalares de coordenadas, con estado cuerpo–mundo compartido, pueden sumar sus fuerzas y reconstruir L=I exactamente. Se espera demostrar igualdad de todas las trayectorias del híbrido fusionado y del candidato, con los mismos cuatro registros dinámicos y el mismo grafo normalizado. Con penalización invariante por esa equivalencia, la brecha conjunta es cero. Si se prohíbe compartir estado o se penaliza la sintaxis del híbrido, hay que declarar esa hipótesis adicional; no se presentará como separación dinámica.

La conjunción local y la obstrucción de clausura amplia se reportarán juntas. No se convertirá el certificado local en pertenencia a las clases completas de VIII/IX, ni en cierre de GateBridge, fenomenalidad o evidencia externa.

## Controles exactos, criterios de parada y entrega

- Pruebas analíticas universales de proyección, estabilidad, topología escalar, rango de Hankel, cirugía causal y composición de rivales. Fracciones exactas en toda la implementación y en los controles finitos.
- Enumerar interfaces nativas, trayectorias adaptativas, esquinas de seguridad para la familia discreta, roles y bases de impulso, matrices de lesión y control, ruido de valencia y retorno, renombrados, interpolador escalar y emulador híbrido. Reutilizar los controles nativos sin modificarlos.
- Si una fórmula, cota o selectividad falla, detener su promoción, conservar el contraejemplo y corregir mediante adenda congelada antes de nuevos controles. No ajustar umbrales para obtener éxito. Un empate previsto es un resultado admisible, no un fallo de software que deba ocultarse.
- Ejecutar raíz 3/3, release, suite matemática ampliada, registro y macros; recompilar IX y monolito; cotejar doce capítulos, preservación de IDs y fuentes, PDF y hashes. Los paquetes congelados se contrastan con sus hashes físicos previos de Escritorio.
- Registrar las salidas crudas v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`, y `external_support_certified=false`.


## Ejecución, resultados y frontera de interpretación · 2026-11-11

### Punto de restauración y orden de evidencia

El Frente 5 quedó en el commit local `ceb7b91bed4ea00da314a6a8737bd855cb3cb467`, con el mensaje solicitado y árbol limpio, sobre la rama `codex/qicn-framework-ordenado`. No se hizo push. Esta fase parte de ese punto y deja sus propios cambios para revisión local.

Prerregistro original SHA-256 `6f884a6fa4db81a70866b7c99833fbbaa9fe4958bd280c8d219acdea03d7b702`. La adenda prospectiva [EXTENSION_CUERPO_MUNDO_ADENDA.md](EXTENSION_CUERPO_MUNDO_ADENDA.md), SHA-256 `85361aeae03b4a4dd280e65e3cf0fc3f2d622868b36adf5a7c3a220ecea4192a`, fija antes de los controles la evaluación normal `L0=(I+J)/2`, el rival de potencial escalar, su circulación y el control de interpolación finita. El texto anterior a esta sección conserva exactamente los bytes del prerregistro. La adenda permanece separada y sin reescritura retrospectiva. No se ajustaron umbrales después de observar resultados.

Se consultaron las cinco autoridades documentales de raíz, AGENTS, INSTRUCCIONES, ROADMAP, auditoría post-torre, los Frentes 2–5, las fuentes V–IX, la planta, los controles previos, el registro y el ensamblador. La evidencia y los temporales están en `E:/QICN-PRESERVACION/2026-11-11-cuerpo-mundo-bridge`. El checkout del Escritorio y las áreas congeladas se conservan como referencia hasta completar los controles.

### Construcción y minimalidad con dominio explícito

`body_world_tower.py` implementa un producto fibrado dirigido sobre la planta existente, con dos coordenadas corporales y dos de mundo. La proyección elimina las cuatro coordenadas añadidas y conmuta exactamente con toda actualización. La sección de fibra cero conserva cada protocolo nativo y su readout; no se cambia `prefix_tower.py` ni se amplía silenciosamente la clase de comparación de sus certificados.

Los parámetros racionales son `alpha=beta=h=1/4`, `chi=1/8`, con matriz evaluativa `L0=(I+J)/2`. La fibra nativa contrae por `1/2`; la contracción nativa conjunta conserva `9/16`. La familia de intervenciones contrae la fibra por `3/4`, conserva el cubo seguro y mantiene los pulsos experimentales en un núcleo compacto de radio `1/2`.

La minimalidad de cuatro coordenadas es relativa al puerto declarado. El Hankel tiene rango cuatro, determinante `1/65536` e inversa de norma infinito `24`. Además, el Jacobiano de dos impulsos independientes hacia las lecturas corporales segunda y tercera tiene determinante `beta^4`, no nulo. Toda realización exacta con transiciones y lecturas C1, núcleo proyectado fijo y sin oráculo externo de historial necesita al menos cuatro coordenadas de fibra. No se afirma unicidad canónica ni minimalidad entre codificaciones discontinuas arbitrarias. Esta ampliación analítica del argumento lineal no cambia ganancias, tareas ni umbrales preregistrados.

La exactitud de la proyección exige que los nuevos puertos no modifiquen la trayectoria original del núcleo. La realimentación cuerpo–mundo ocurre en las variables añadidas. Pedir simultáneamente esa proyección exacta y que el mundo altere las mismas coordenadas nativas exigiría cambiar el contrato. Se demuestra conservación de certificados con instrumentos originales, no pertenencia automática de todo el estado ampliado a las clases completas de VIII o IX.

### Tres nuevas cargas locales y clases rivales

| Carga | Definición y métrica | Rival declarado | Resultado y control negativo |
| --- | --- | --- | --- |
| V | Diferencia causal reservada en mundo al activar evaluación en el segundo paso: `V(v)=gamma L0 v`, `gamma=1/128`, sobre todo el cuadrado `[-1,1]^2`; pérdida uniforme en norma máximo | Resumen escalar continuo con decodificador arbitrario, o gradiente de potencial C1 en las coordenadas euclídeas declaradas | Error óptimo `gamma/2` para ambas familias. Pruebas por colisión antipodal y circulación `4 gamma`. Aplanar evaluación permite resumen escalar exacto; `L=I` conserva rango y admite gradiente exacto. Invertir circulación conserva magnitud. |
| W | Matrices de respuesta corporal al impulso de mundo, indexadas por perfil; pérdida máxima de entradas en dos roles, normalizada por `t=1/16` | Transferencia relay con Hankel de rango como máximo dos, o predictor independiente del índice de rol | Error mínimo al menos `1/96`, normalizado `1/6`. `Q+` elimina índice y rango adicional conservando exactamente el modo común. Un rival informado de cuatro estados empata. |
| E | Diferencia en lectura corporal cuarta al invertir solo la arista motora; escala `sE=1/256`; residuo `y4-(3 alpha/2)y3` | Rival sin arista motora, con memoria y no linealidad arbitrarias, bajo modularidad quirúrgica y sin etiqueta de intervención como entrada lateral | Residuo `+sE/-sE`, error uniforme mínimo `sE`. Cortar arista conserva lecturas segunda y tercera y elimina retorno. La compresión de mundo conserva el control común. Un predictor que recibe la etiqueta reproduce los datos: se detecta como fuga por el control de arista cortada. |

Los roles, vectores de entrada de dos ranuras, cotas de amplitud y longitudes de cuatro pasos son comunes. W excluye por hipótesis un grado dinámico observable; asignar cuatro registros a un rival de rango dos no convierte este contraste en superioridad frente a cualquier rival de cuatro estados. E depende de un grafo causal explícito y de modularidad: no hay identificación del mecanismo frente a un predictor que recibe libremente la etiqueta quirúrgica. V no se reduce al coste nativo de retorno, pero su significado es evaluación operacional tipada, no valencia sentida.

La separación V es un teorema uniforme del modelo exacto sobre el dominio continuo, no una inferencia no paramétrica a partir de una tabla finita. Se demuestra el obstáculo complementario: cualquier tabla vectorial finita admite codificador escalar continuo con decodificador polinómico y admite un potencial polinómico con gradientes prescritos. Los controles racionales exhiben ambos sobre nueve puntos; por sí solos no excluyen esas familias universales. Un potencial escalar con movilidad no simétrica y acceso al vector completo también reproduce exactamente el sistema normal. Esa descripción es un comparador amplio vigente.

### Conjunción local, ruido y selectividad

Las seis tareas se realizan sobre la misma planta, ganancias, soporte y ventanas de cuatro pasos, en cohortes de preparación emparejadas. No se afirma que una sola trayectoria sea simultáneamente todas las preparaciones incompatibles. D/A/T conservan sus clases e instrumentos nativos; V/W/E usan los puertos nuevos. El valor de T no sustituye su estudio anterior de horizonte temporal.

| Tarea | Escala de pérdida | Error por lectura | Cota inferior del margen rival menos candidato |
| --- | --- | --- | --- |
| D | `delta=1/34992`, contraste pareado | `delta/16` | `1/4` |
| V | `gamma=1/128`, contraste pareado uniforme | `gamma/64` | `7/16` |
| W | `t=1/16`, error máximo de matrices | `t/64` | `13/96` |
| A | Riesgo binario | `delta/16` en fase | `1/4` |
| E | `sE=1/256`, lectura cuarta | `sE/64` | `31/32` |
| T | `D0=1/384`, pérdida circular balanceada | `3^(-10)/4` | `1/2-64/19683` |

Son cotas deterministas de perturbación de lecturas, no intervalos de confianza empíricos. El mínimo conjunto es `13/96 > 1/16`. Las lesiones físicas D/V/W/A/E/T producen respectivamente las presencias `010111`, `101111`, `100111`, `111011`, `101101`, `111110`, frente a `111111` intacto. La matriz de pérdidas tiene rango seis. No es diagonal: las mediaciones compartidas están explícitas, especialmente la consecuencia evaluativa que requiere retorno motor.

Si un agregado de rivales conserva al menos una deficiencia declarada, la pérdida máxima normalizada deja margen al menos `5/192`; una penalización de complejidad conserva positividad solo si su coste adicional para el candidato es inferior a esa cota. No se elige una penalización después de conocer el ganador.

### Obstrucción exacta al cierre híbrido amplio

Dos canales escalares de evaluación pueden compartir los cuatro estados y sumar sus fuerzas antes de actualizar: `chi L0 E11 e + chi L0 E22 e = chi L0 e`. No se duplican plantas ni se promedian trayectorias. El mecanismo fusionado coincide exactamente con el candidato para todo comando nativo y de puerto, también adaptativo. Su margen limpio es `0`; con complejidad invariante por mecanismo normalizado, el margen penalizado también es `0`.

Por tanto se demuestra una realización simultánea de seis testigos locales y una obstrucción explícita a promoverla al cierre débil amplio B9. Prohibir estado compartido o cobrar por sintaxis sería una hipótesis adicional, no una separación observada. Esta fase no emite un artefacto oficial de GateBridge ni promueve pertenencia íntegra a las clases VIII/IX. El resultado útil incluye identificar exactamente dónde un rival equivalente impide la conclusión fuerte.

### Fuentes, controles y reproducción

Paper IX añade una definición, cuatro teoremas y cuatro proposiciones con ocho demostraciones, sin sustituir el texto anterior. Se añaden nueve entradas al registro, que pasa de 854 a 863; se preservan identificadores y campos semánticos anteriores, actualizando únicamente las localizaciones desplazadas. Las 383 macros no cambian.

`check_body_world.py` integra la suite 25. La pasada completa confirma 36036 verificaciones de proyección, secciones cero y siete pares adaptativos; 24576 vértices de seguridad; cotas V, interpolaciones finitas y controles conservativos; rango Hankel/Jacobiano y 729 realizaciones lineales reducidas; corte/inversión y fuga de etiqueta; conjunción y matriz de selectividad; 1536 conjugaciones de marcos y trayectorias del híbrido compartido. Las pruebas universales son las demostraciones de Paper IX; la enumeración finita verifica su realización y controles.

Comandos de reproducción desde la raíz: `node scripts/verify-canonical-integrity.cjs`, `node scripts/verify-claim-registry.cjs`, `node scripts/verify-canonical-release.cjs`; desde el paquete interior: `npm run verify:release`, `npm run verify:math`, `node scripts/validate-corpus.js`, `node scripts/validate-macros.js`; desde Paper IX: `pdflatex`, `biber`, dos pasadas de `pdflatex`; desde el paquete: `npm run compile:monolithic`. La comparación `check-monolith.cjs`, `pdfinfo` y `pdftotext` coteja ensamblaje, páginas, títulos, referencias y huellas.

Verificación: raíz 3/3, release 6/6, matemáticas 25/25, registro 863, macros 383, capítulos 12/12. Paper IX tiene 54 páginas y el monolito 396. No hay referencias/citas indefinidas ni etiquetas duplicadas. La sección nueva no introduce cajas desbordadas; el monolito conserva los conteos tipográficos anteriores de 4 overfull y 334 underfull, registrados sin confundirlos con calidad editorial final. Todas las fuentes Lean anteriores se conservan; se reutiliza la reproducción de 24 módulos y 126 teoremas de Frente 5, sin afirmar una nueva mecanización de estas nueve entradas.

### Incidencias conservadas y obligaciones

La primera ejecución falló al exigir saturación `worst==1` en una lista que no incluía la matriz permitida que la alcanza. Las desigualdades de seguridad no fallaron. Se añadió el control normativamente admisible `SWAP`, se mantuvieron ganancias y cotas y se verificó la saturación exacta. El fallo inicial permanece en `logs/control-first.log` y la repetición exitosa en `control-second.log`; la suite final incorpora además el control del Jacobiano C1.

La primera exportación Git convirtió LF a CRLF, rompiendo hashes de manifiesto y fixtures. Se detuvo cada cadena fallida. Se conservaron los informes fallidos, se comprobaron las identidades de contenido y se restauraron únicamente los bytes fiables en la copia aislada: primero 19 copias congeladas desde el checkout verificado y después 653 archivos con diferencia exclusiva de saltos de línea mediante una exportación Git sin conversión; se repusieron tres informes generados a su base. No se modificaron expectativas, fixtures fuente, verificadores ni originales para forzar aprobación. Las 76 áreas congeladas conservan los hashes físicos previos del Escritorio.

Veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`. Los PASS de software no constituyen apoyo científico externo. Permanecen abiertas la revisión matemática independiente, la mecanización de los nuevos resultados, la identificación experimental de supuestos de dominio/regularidad y modularidad, las clases completas de VIII/IX y la definición defendible de un comparador amplio que no admita un mecanismo equivalente. No se atribuye conciencia, experiencia, identidad fenomenal ni equivalencia humana.
