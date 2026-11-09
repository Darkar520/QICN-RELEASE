# P1 · Dinámica disipativa en la torre circular binaria

## Prerregistro

Base `8df6a59`. Alcance: BaseCore 11, enlace en Papers I–III, registro interno, monolito, PDFs de trabajo, controles racionales y una prueba Lean del núcleo combinatorio. Modelo de partida: las dos torres con salto de fase de BC-RIG/BC-NS, con la misma métrica, intervención y lectura. Usamos tiempo de evolución independiente de la profundidad de observación.

1. Construir mapas por etapa con el mismo prefijo observable y probar todos los cuadrados de proyección y de transporte. Buscar factor uniforme y exacto de contracción por rama.
2. Realizar los mapas mediante la transición proyectada de BaseCore en un subdominio invariante de perfiles y mediante su versión finita de incrementos. Derivar una cota uniforme del error de truncación y comprobar el transporte de equilibrios.
3. Derivar H5 en el espacio de perfiles de BaseCore, comprobar E1/E2 sobre el dominio de historias y distinguir ambos de la separación relativa al nulo.

Controles previstos: conservar los bits inmóviles, quitar el complemento en el desplazamiento, omitir el cambio de fase del transporte en el enlace perturbado, retirar el salto, comparar ramas conjuntamente y distinguir nulo anclado de equilibrio. Los controles finitos usarán aritmética racional exacta. Las cantidades del modelo son adimensionales y las cotas son deterministas. Criterio de salida: pruebas universales para el dominio declarado, negativos reproducibles, fuentes, registro y volumen alineados, gates obligatorios sin fallos. Un fallo de compatibilidad, una inferencia de contracción sobre la unión o un fallo obligatorio detienen el cierre. El modelo es matemático y sintético.

## Resultado matemático

La evolución fija la fase inicial en el parámetro $u$, inserta un cero y desplaza los bits con complemento. Un desacuerdo en el bit $m$ se mueve al $m+1$. En la métrica con pesos $3^{-t}$ esto da factor exacto $1/3$ en cada rama. Los cuadrados de proyección y de transporte conmutan, también en el enlace con salto. El equilibrio $0101\ldots$ se transporta al equilibrio de la otra rama y conserva la separación de lectura $3^{-(k+1)}a$. El dominio completo conserva la cola de E1 y la no factorización E2. A parámetro fijo, un solo equilibrio se determina desde cualquier corte.

El perfil de $L^2$ codifica ambas fases y los mismos bits en celdas de longitudes explícitas. La transición de BaseCore tiene norma $1/3$, realiza exactamente la evolución en las torres y deja invariante el cubo funcional. Las dos primeras celdas binarias valen cero y uno en todo equilibrio. Dan el margen uniforme de H5 $\sqrt{2/45}$ a las funciones constantes. La truncación a profundidad $t$ conmuta con la evolución retenida. Su error de un paso, de equilibrio y de órbita con inicio proyectado está acotado por $3^{-t}/\sqrt2$. La malla de $8\cdot9^t$ es una realización explícita del esquema de incrementos, con coste exponencial en profundidad.

En el control sin complemento se mantiene la contracción y el código binario de equilibrio vale cero. Con complemento vale $1/4$, de modo que los equilibrios quedan al menos a esa distancia del nulo anclado. Esta distancia de lectura es distinta del margen de H5. Congelar los bits impide la contracción global por rama. La unión de ramas mantiene dos equilibrios para el mismo $u$, por lo que no admite una contracción estricta de la evolución que preserva ambas. La fase se reinicia en un paso y cada bit de entrada se vuelve progresivamente menos visible.

## Verificación de la matemática

Pasaron las siete suites de regresión. El control nuevo ejecutó 23.242 comparaciones exactas. Lean 4.31.0 verificó el cuadrado de prefijos, el avance del primer bit discordante, la caracterización del equilibrio alternante y el transporte de un punto fijo bajo un mapa que conmuta. Sólo la caracterización del equilibrio usa `Quot.sound`. Las cotas de Hilbert, malla y no colapso constan como demostraciones analíticas en BaseCore.

El registro conserva los 798 identificadores y metadatos previos y añade tres entradas. Las cuatro fuentes preservan sus etiquetas anteriores. Pasaron los validadores de 801 entradas y 383 macros, sin bloqueos ni avisos. Los verificadores de raíz y la cadena de release 6/6 pasaron en copia aislada. Veredictos v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES` y v31 `BLOCKED_FOUNDATION_FIRST_GATES`, todos con `external_support_certified=false`.

## Compilación y trazabilidad

Se copiaron 721 archivos y se cotejaron byte por byte en `E:\QICN-PRESERVACION\2026-11-09-p1-dinamica-q2dj4c` para aislar los verificadores que generan fixtures y los auxiliares de compilación. Los cuatro documentos individuales y el monolito pasaron `pdflatex`, `biber` y dos pasadas finales de `pdflatex`. `npm run compile:monolithic` y la comparación de los doce capítulos confirmaron la propagación. `pdfinfo` y `pdftotext` confirmaron las páginas y la presencia de los pasajes nuevos. Las advertencias de cajas conservaron sus conteos previos y no hubo referencias o citas indefinidas ni etiquetas duplicadas. La primera compilación concurrente falló al compartir una caché fría de Biber. La repetición en serie con la caché estable resolvió el fallo sin cambios en las fuentes.

| PDF de trabajo | Páginas | SHA-256 |
|---|---:|---|
| `basecore/BASECORE.pdf` | 53 | `e4f0793d12b54250ee030a077ae9c615267a3fc7717d47b2bcbbbd74dd4ef47f` |
| `paper1/main.pdf` | 27 | `c95266247ef045a5106c5e9f71a2856695c57c2a195f48012acfbc47e33bf90e` |
| `paper2/main.pdf` | 18 | `4a9144a58dbb9f2e296a31227ad21966cea06dd3543b3bd115f4aa4f0930d542` |
| `paper3/main.pdf` | 19 | `600794a4309e6039a55baaeaa9f6421e7be9a3b71f94fe3bd61bcec67b53f09c` |
| `monolithic/QICN_MONOLITHIC.pdf` | 353 | `6cc27bf2d5be10574334c9137534f4e8154a3786d84306b8cd3e39e6a8b97ccc` |

La ejecución completa de Lean en WSL verificó la versión y las ocho revisiones de dependencias. Al registrar esta fase continuaba en la elaboración de `QICNLean.Basic`, sin resultado del agregado. La verificación de los cuatro teoremas del módulo P1 se completó con el ejecutable fijado de Windows.

Una consulta de versión al iniciador de Lean en Windows empezó una descarga ajena al pin 4.31.0. Se detuvo el proceso identificado. La política de ejecución rechazó la limpieza de los temporales creados por esa descarga. Los ensayos posteriores invocaron el compilador 4.31.0 por ruta explícita.

El alcance verificado es la construcción disipativa de P1 en dos ramas y su realización de BaseCore. Quedan para revisión independiente las demostraciones analíticas y su conexión con los requisitos más fuertes de CCR. La siguiente tarea de P2 es especificar las factorizaciones y comparadores admisibles para determinar qué testigos se pueden realizar sobre este soporte.
