# 3B · contrato prospectivo de construcción · 2026-11-12

Esta adenda concreta la elección causal del usuario antes de ejecutar controles
3B. No certifica todavía un testigo completo. No altera PRERREGISTRO.md.
`external_support_certified=false`.

## Planta e interioridad

Investigar la misma presentación Hilbert–prefijo, canales fijos y sector
producto partido completos de V, con retenciones `rL=17/64, rR=15/64`.
Conservar el bit 1; actualizar bits 2–3 como antes; retener los cinco sitios
4–8 usados como interruptores y desplazar/complementar la cola desde 9.
Toda orden de escritura se completa con ese paso dinámico: no introducir una
orden que deje fijo el nulo. Las cinco variables no serán una planta paralela:
controlarán sondas sobre coordenadas Hilbert leídas y acopladas a la fase.

El estado intrínseco completo X puede restringir las colas Hilbert a sus cubos
compactos y ampliar solo el intervalo de la primera coordenada izquierda a
[-1,1]; el soporte A mantiene el intervalo original [-1/2,1/2]. Se comprobará
que este X completo, embebido en el mismo Hilbert, es admisible en el universo
de paquetes completos. No se afirmará interioridad en el Hilbert ambiente:
el cubo infinito tiene interior vacío allí. La viabilidad será relativa a X.

Probar el certificado V de nuevo sobre todo A. Márgenes candidatos:
persistencia 1/16; identidad 1/16; integración inferior 1/384 y superior
3/128; continuidad 2/3; escape nulo 2/27; legibilidad por bit 1 con ruido
1/16. Los controles adicionales solo se admitirán tras comprobar estos límites.
El feedback proporcional será recortado a Q y su coste incluirá el controlador.

Para VII investigar `V=1-|zL_1|`, suelo 1/2, región segura A, núcleo
`zL_1=1/47`, margen 45/94 en X. Choques ±1/8 sobre esa coordenada; feedback
interno con lectura y actuador declarados, retorno activo 1 frente a pasivo
`1-rL`, ganancia `rL`. Frontera por pulsos de igual norma/coste sobre los
dos puertos y lectura de la primera coordenada izquierda (margen 1/128).
Dependencia histórica: misma población y capacidad sobre una proyección
sensorial preregistrada, con control obligatorio que devuelve el estado
actual completo y anula la ventaja histórica. No confundir esa ganancia
informativa con no-Markovianidad del estado completo.

## Gramática causal, información y parsimonia

Tres puertos aleatorios independientes `s,x,y ∈ {-1,1}` y un comando g serán
conocidos por TODOS los predictores antes de la misma actuación. La diana será
un residuo Hilbert normalizado, producido por el controlador `g*s*x*y`.
No se entrega el residuo futuro a ningún predictor. Las referencias y la
calibración comunes tampoco contienen una tabla de su producto.

Lenguaje común: circuitos finitos de primitivas unarias/binarias, interfaz de
entrada/salida común, coste de cada operación no trivial, presupuesto común
de tres operaciones para la tarea reservada. El candidato usa tres productos.
Se especificará la sintaxis completa y el recuento, incluyendo cualquier
enrutamiento o memoria que no forme parte de la interfaz común.

Contrato débil prospectivo: cada coordenada causal constitutiva puede depender
de como máximo dos de los tres puertos aleatorios, condicionado al comando y
a azar exógeno independiente. Lectura final aditiva; composiciones y acoplos
latentes deben preservar ese contrato de ascendencia. Se admiten TODOS los
programas de monitor, memoria, política, narración, broadcast y registro que
lo respeten, y toda su clausura admisible. No se toma esta condición como una
consecuencia automática de los seis nombres generales del paper: es una
especificación causal adicional y auditable del experimento.

La salida débil completa pertenece al subespacio ANOVA de orden ≤2; demostrar
su ortogonalidad a `s*x*y`, incluyendo mezclas/azar independiente, antes de
evaluar el ínfimo. Se contarán por igual las instrucciones del candidato y
de los rivales. Un tag gratuito con el producto, una primitiva de aridad
irrestricta o un emulador del candidato al mismo coste constituyen controles
de obstrucción, no rivales que puedan eliminarse después de observar empate.

## Ventana, selectividad y pérdidas esperadas

Todos los experimentos se alojarán en la misma planta con horizonte τ=2;
distintas preparaciones de su población se identificarán como tales.
Índice: separación de fase frente a clon de lectura inicial parcial idéntica,
con control de clon de estado completo que produce empate.
Propiedad: referencia causal independiente, respuesta ±1 de una sonda Hilbert,
MAE frente al control 1/2. Continuidad: correlación de una desviación retenida
con la referencia previa y comparación con una línea alternativa. Perspectiva:
tarea de tres puertos frente a la gramática neutral. Valoración: dos pulsos
de igual amplitud/coste sobre las retenciones asimétricas.

| Intervención | Primarias objetivo; otras sin cambio esperado |
|---|---|
| swap | I, O, P, V |
| own | O |
| break | C |
| flat | P |
| val | V |
| remap | O, C |
| clone | I, C |
| trans | O, C |
| perm | I, P |
| xsub | P |

Las operaciones deberán realizar esas transformaciones sobre estados,
actuadores o asignaciones causales: la tabla sola no es implementación.
Renombrado pasivo, transporte fiel y escritura sham emparejada son controles
separados, con invariancia esperada. La rama xsub dañada pierde el acoplamiento
indexado; un cambio de etiqueta de sustrato no produce daño por sí solo.

Pérdida reservada: un tercio de error cuadrático basal, un tercio sobre las
diez intervenciones y un tercio de error del contraste flat/sham, más
`Comp/16`. En cuatro intervenciones P se apaga; en seis se conserva. Esperado:
ínfimo débil `13/15`, candidato `3/16`, diferencia `163/240`, puntuación
Irred `163/448`. Para perspectiva usar escala `sP=281/240`, que daría 1/3.
Se demostrará también optimalidad del candidato: con menos de tres operaciones
binarias ninguna coordenada puede combinar los cuatro inputs, y el contraste
reservado deja error suficiente. No se asumirá que un programa óptimo existe.

Vector candidato: `(1, 1/2, 1/2, 1/3, 64/266529, 1, 163/448)`;
exponentes todos 1/7; umbrales `lambdaG=1/8192`, `lambdaPhi=1/16`.
El cálculo de cada componente debe proceder de las trazas, no de asignar
estas constantes. Demostrar el producto y el umbral, y construir un control
que pase gate pero falle el umbral escalar. Simetrización, lesión de propiedad,
fractura de continuidad y emulador al mismo coste deben anular su margen.

## Parada

Si la gramática no es cerrada, una ventaja depende de información oculta, una
acción rompe V, X no pertenece al universo, o un estimador no se deriva de
las trazas, no anunciar no vacuidad. Corregir la construcción prospectivamente
y registrar el incidente. Un resultado relativo a esta gramática no es un
teorema contra todos los modelos generales de memoria o política, ni evidencia
de experiencia subjetiva. Las obligaciones completas de IX siguen separadas.
