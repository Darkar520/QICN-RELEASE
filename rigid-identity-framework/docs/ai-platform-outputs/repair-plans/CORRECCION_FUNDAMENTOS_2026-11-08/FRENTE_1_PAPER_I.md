# Frente 1 · Separación, causalidad y observación en Paper I

## Prerregistro · 2026-11-10

Base científica `4941308`. Conservar el informe de auditoría y su ledger previo. Intervenir Paper I, sus entradas de registro, PDF y monolito. Cotejar BaseCore 03 y Papers II–III como dependencias. Mantener 834 IDs, sin cambios de enunciado fuera de los bloques corregidos.

1. En compacto no vacío con aplicación continua e inyectiva, minimizar sobre pares a distancia al menos r>0 sólo si existen. Distinguir separación a escala fija de coercividad. Controles: cuadrado en [0,1], escala superior al diámetro y código ternario con cota lineal explícita.
2. Separar información observacional de deformación interventional. Contrastar X=Y XOR Z con input observacional constante y ruido sesgado; comparar un mecanismo de referencia que ignora Y. La resistencia infinita requiere igualdad de los objetos comparados bajo todos los controles pertinentes, no una inferencia de entropía.
3. Para prefijos, distinguir recuperación exacta, elección de extensión y mutual information con una ley fijada. Para observables, distinguir límite de conjuntos finitos discretos de límite de distribuciones compatibles. Control de dos puntos y mezcla afín. Corregir corolarios y paráfrasis inmediatas.
4. Detenerse ante gates obligatorios fallidos. Ejecutar raíz, release, matemáticas, registro, reconstruir Paper I y monolito en disco externo y cotejar citas, etiquetas y los 834 IDs. Mantener veredictos crudos con external_support_certified=false.


## Resultado del Frente 1

El prerregistro se congeló antes de los controles. Su copia preservada tiene SHA-256 `43c93b941c5b877819fa1f2b08e814dc0443bc05ce2d565c83af5277c4c7cf84`. Los insumos y salidas reproducibles están en `E:/QICN-PRESERVACION/2026-11-10-frente1-paper1-4941308`.

- **Separación y coercividad.** En Paper I, `thm:spectral-coupling` usa el mínimo positivo sobre pares a distancia al menos (r>0) cuando ese conjunto existe. Con error a lo sumo η por lectura, el margen es ω_T(r)−2η. El cuadrado en [0,1] da ω_T(r)=r² y refuta la cota lineal general. En el código ternario, el primer desacuerdo en m da una cota inferior 3⁻ᵐ y superior 3·3⁻ᵐ.
- **Observación e intervención.** `prop:causal-rigid` exhibe dos modelos con la misma ley observada y respuestas 1/4 y 3/4 a la misma intervención. Las leyes intervenidas se comparan por sus pushforwards. La deformación Hausdorff del objeto de identidad es una obligación distinta. La revisión del estimador explicita que el ínfimo de una familia finita de comparaciones exactas es una cota superior y que su valor infinito no decide el sector completo.
- **Prefijos y leyes.** `thm:info-isolation` separa recuperación exacta, sección y la identidad I(P;X)=H(P) para un prefijo finito bajo una ley fijada. `thm:stone-classification` distingue el límite de puntos, con base de abiertos cerrados, del límite convexo de leyes, conexo por caminos y no Stone si tiene más de un punto. El ejemplo constante de dos puntos da [0,1] y la inclusión de Dirac es una inmersión topológica cerrada.
- **Dependencias.** BaseCore §03 controla el transporte con levantamientos y productos de pesos. §04 exige la cota inferior donde la usa sobre un dominio común y la prueba para la lectura ternaria. Los resultados de II–III conservan sus propias hipótesis de comparación, coercividad o testigos. El rastreo de las etiquetas corregidas no encontró usos activos fuera de Paper I. BaseCore, II y III se cotejaron sin intervención de sus fuentes.

## Verificación

- `node scripts/verify-canonical-integrity.cjs`, `node scripts/verify-claim-registry.cjs` y `node scripts/verify-canonical-release.cjs` pasaron. `npm run verify:release` dio 6/6 y `npm run verify:math` dio 19/19, incluido el control exacto de 4032 pares ternarios y los controles causales, de prefijos y de mezclas.
- `npm run verify:corpus-registry` y `npm run verify:macro-registry` registraron 834 entradas formales y 383 macros sin bloqueos ni advertencias. El cotejo conservó los 834 identificadores y todas las referencias de dependencia. Detectó 15 cambios de contenido en Paper I, además de actualizaciones de localización.
- Paper I compiló con tres pases de `pdflatex` y uno de `biber`. `npm run compile:monolithic` y `check-monolith.cjs` verificaron 12/12 capítulos, con cambio de contenido generado sólo en el capítulo de Paper I. Los cuatro enunciados revisados aparecen en ambos PDF. Los logs finales no registraron citas o referencias indefinidas ni etiquetas duplicadas. El primer cotejo de texto detectó que la extracción de Paper I representa la ligadura «fi» con un carácter de control. La comprobación normalizó esa ligadura y pasó en ambos PDF. MiKTeX emitió un aviso de compatibilidad de Windows y los logs conservan avisos tipográficos de cajas. La compilación terminó con código cero.
- PDF de Paper I, 27 páginas. SHA-256 `716783d8ddf4b7e71d8ef608be01025e0d1f044e513ddff35f9afd802498266c`.
- PDF monolítico, 376 páginas. SHA-256 `f2c4495a8e5062c5de0a8657ef60a1d046a44693eca409e2a863fcc5af9c5570`.
- Veredictos crudos v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES` y v31 `BLOCKED_FOUNDATION_FIRST_GATES`. Todos conservan `external_support_certified=false`.

El resultado cierra el alcance local de las cuatro correcciones y sus dependencias inmediatas. Quedan la revisión matemática independiente exigida antes de publicación y las obligaciones posteriores del plan, entre ellas la comparación con presupuesto explícito en II–III y el certificado conjunto V–VII.
