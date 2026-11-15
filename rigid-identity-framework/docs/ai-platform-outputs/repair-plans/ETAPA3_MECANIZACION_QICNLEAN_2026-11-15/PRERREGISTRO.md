# Etapa 3A — primer bloque Lean 4.31.0

Fecha 2026-11-15. Base main publicado 5aa5da2, rama codex/etapa3-lean.
Fase I cerrada con 13 puertas y ambos remotos verificados; recibo literal
PUBLICACION.json. Esta fase termina en commit local limpio, sin push.

## Objetivos congelados y fidelidad

A. Empaquetar H1–H4 en un teorema sobre Hilbert real completo, conjunto
no vacío cerrado convexo, operador lineal continuo de norma <1 y parámetros
métricos compactos con acoplamiento uniformemente continuo. Cubrir las
cuatro conclusiones de prop:minimal, sin deducir H5; control cero explícito.
Identificar la proyección radial del disco con la métrica, demostrar su
no-expansividad y especializar a EuclideanSpace R (Fin 2), no al producto
con norma máximo. Aportar el núcleo geométrico de relajación por iteración
y la no-linealidad de la expresión direccional en la esquina u=1/2.

B. Canales entre torres infinitas de etapas Nat: construcción conmutativa,
continuidad en la topología producto y transferencia de coercividad por
supremos ponderados y lectura posterior. Cubrir cotas de truncación/colas
en su dominio real. Revisar por separado la suma ponderada acotada: los
targets activos prop:weighted-history y compact-polish-consistency usan
SUPREMO, y no se cambiará esa métrica por suma para reclamar equivalencia.

C. Sistemas de Moore controlados tipados, morfismos/recorridos de palabras,
predictores de producto sobreyectivos sin mensaje y cota sigma/2 para todo
predictor del sector, con exclusión exacta y restricción a subfamilias.
Contraste de cuarto orden en las 16 preparaciones, para funciones arbitrarias
de subconjuntos propios y sus sumas, no sólo una lista de rivales. Construir
el óptimo y el control de interacción conjunta. Probabilidad finita con
pérdida real de abstención, estrato limpio equilibrado y control de fuga;
no promover ese dominio finito a un teorema probabilístico general.

## EXACT_MATCH y límites de Etapa 3B

Un target sólo se eleva si sus objetos, hipótesis y TODAS sus conclusiones
coinciden 1:1 con símbolos públicos compilados. Se documenta traducción por
target y se mantienen los diez exactos anteriores. Una prueba de componente,
un caso finito de un resultado general, una cota sin optimalidad o una
expresión espectral sin su derivada permanecen parciales.

Etapa 3B retiene, salvo cierre genuino aquí: cálculo Fréchet y espectro del
operador Banach complejo/infinito, calibración logarítmica completa de
relajación, métrica/completitud/separabilidad/Polish y FIP sin sobreyectividad,
equivalencia topológica de las métricas ponderadas, medidas/esperanzas no
finitas, optimalidad y aleatorización general, y semántica completa de
coste/ruido/procedencia de los teoremas de IX. No se inventa un puente.

## Protocolo

No sorry/admit/axiom añadido. Sólo propext, Classical.choice y Quot.sound.
Un namespace por módulo, agregados exportados y los 35 archivos previos
preservados salvo el agregado que importa los nuevos. No cambios TeX/PDF,
registro 921 ni macros 383, áreas congeladas o WSL. Desarrollo serial con
objetos previos verificados por hash; la puerta final recompila desde cero
TODOS los módulos y audita cada declaración pública con paquetes fijados.

Controles: datos cero/no H5; frontera no lineal; canal sin coercividad;
producto hold frente a swap; réplica de cuarto orden; abstención gratuita,
fuga selectiva y condiciones de balance distintas. Se preservan las 34
suites matemáticas sin relajar sus criterios.

Final: catorce controles ordenados sobre copia congelada en E:, Lean serial
fresco autorizado >10 min, matriz 436 sincronizada, documentación/ledger,
recibos crudos y commit local. Cualquier fallo real se diagnostica; ninguna
admisión ni afirmación falsa para obtener PASS. external_support_certified=false.
