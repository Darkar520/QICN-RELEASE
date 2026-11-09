# Corrección de fundamentos: dinámica discreta y realización conjunta

Fecha: 2026-11-08. Estado: primera fase local terminada y verificada, pendiente de revisión matemática externa. No es cierre global del marco ni validación externa.

## Intención preservada

La solicitud es mantener íntegro el programa teórico, corregir afirmaciones incorrectas y buscar respaldo para sus propuestas. QICN-SYSTEM queda fuera. Esta fase aporta una realización matemática común para un conjunto de obligaciones fundacionales; no reemplaza el programa completo por esa familia particular.

La auditoría de partida describe el snapshot previo a estas correcciones. Sus informes y contraejemplos no se reescriben. El plan previo, alcance, controles y condiciones de parada constan en `PLAN_DE_FASE.md`. La continuidad del resto del programa consta en `CONTINUIDAD_DEL_PROGRAMA.md`.

## Qué se corrigió y por qué

### 1. Contracción del operador discreto

La transición anterior era `clamp(x + eta R(x) + alpha B(x) + Gamma(u))`, pero la prueba omitía `x`. El control `R=B=Gamma=0` daba un mapa identidad que la cota clasificaba como contractivo con factor cero.

Se conserva la transición y se especifica su dominio real, el cubo `[0,1]^N`. Las intensidades no estaban definidas fuera de ese dominio. Se introduce una condición estructural suficiente de realimentación: `B(x)=-beta x+D(x)`. Al reagrupar la transición, el factor identidad aparece como `|1-alpha beta|`. La cota completa es

`rho_N = |1-alpha beta| + eta L_R + alpha L_D < 1`.

Para el grafo dirigido se demuestra `L_R <= L_I sqrt(d_in d_out)/(theta c_phi)`. La cota anterior usaba sólo grado de entrada, insuficiente en norma euclídea. El exponente de Boltzmann, sobre el dominio y signos declarados, es como máximo uno; no requiere la anterior sobreestimación exponencial positiva.

La regularidad Lipschitz de incrementos no basta para la conclusión antigua. La condición disipativa es una restricción suficiente añadida: no se disfraza de demostración de la antigua generalidad refutada. El objetivo de derivar condiciones más generales queda disponible.

### 2. Puente discreto-continuo

Se sustituye la ambigua norma de operador de mapas con clamp por una discrepancia uniforme en el conjunto declarado `C={f en L2: 0<=f<=1 casi en todas partes}`. Se exige y utiliza su invariancia.

El puente ahora demuestra una consecuencia dinámica, en vez de repetir la hipótesis de consistencia: el error de trayectorias está acotado por el error inicial amortiguado más una suma geométrica de errores de un paso. La prueba cubre todos los tiempos discretos y trata el caso de contracción cero mediante la convención indicada.

La cota de puntos fijos mejora a `epsilon_N/(1-kappa)`, usando el factor `kappa=||K||` del modelo continuo. Para convergencia de puntos fijos no hace falta exigir además un margen uniforme de los factores discretos respecto de uno; basta la existencia de cada punto fijo discreto y que la discrepancia tienda a cero.

Una hipótesis genérica de consistencia sigue siendo una hipótesis. Por ello se añade una clase para la cual se deriva de verdad su tasa.

### 3. Realización común con no colapso derivado

Nuevo teorema `thm:realized-nonconstant-bridge`: perfil Lipschitz no constante `a`, proyección sobre `C`, operador `Kf=kappa integral(f)` y entrada `Gamma(u)=a+u`, con un rango declarado que mantiene inactivo el clamp. Se especifica también un grafo y una realimentación finitos que realizan exactamente la transición propuesta.

Se obtienen simultáneamente:

- H1–H4 y contracción en ambos modelos.
- Fórmula explícita del equilibrio para cada parámetro.
- H5 como consecuencia de la forma del equilibrio, sin suponer H5 para derivarla en esta clase.
- Distancia positiva y uniforme de los equilibrios al subespacio de constantes.
- Discrepancia uniforme y error de puntos fijos iguales a `||P_N a-a||`.
- Cota de aproximación `L_a/(sqrt(12) N)`, con demostración por la identidad de varianza de cada celda.

Testigo enteramente explícito: `kappa=1/4`, `a(s)=s/4`, `u en [0,1/4]`. Su equilibrio es

`f*_u(s)=s/4 + 1/24 + 4u/3`.

Su distancia a las constantes es `1/(4 sqrt(12))`; el error exacto del equilibrio discreto embebido es `1/(4 sqrt(12) N)`. Son cantidades derivadas de este ejemplo matemático, no métricas medidas en un runtime, y no se les atribuye novedad mundial.

El ejemplo no cumple por declaración toda la estructura CCR, NFD, Cop, integración ni el puente fenomenal. Esas obligaciones permanecen abiertas. El no colapso aquí significa exclusivamente equilibrio no constante según la definición de BaseCore.

### 4. Independencia de H5 y contraejemplos elementales

Se incorpora una proposición con dos realizaciones: H1–H4 con equilibrio constante y H1–H4 con distancia positiva a constantes. Así queda explícito qué hipótesis no seleccionan por sí mismas el régimen buscado.

Se corrige el ejemplo de rotación: cero sí es un punto fijo; lo que puede fallar es la convergencia de otras órbitas. Un segundo ejemplo, traslación, muestra fallo de existencia. Se sustituye el ejemplo incorrectamente tipado de funciones racionales por `c_00` real con norma l2 y una contracción cuyo punto fijo formal no pertenece al espacio incompleto. Se aclara que H3 ya está contenida en H1 tal como se escribe.

El ejemplo sin compacidad ahora conserva la continuidad uniforme de la entrada. Se añade `Phi(x)=x^3` como contraejemplo de cota inferior Lipschitz con dominio y codominio completos, conservando también el ejemplo `arctan` y su alcance.

## Sincronización y estructura

- Tres fuentes BaseCore modificadas; ningún paper reemplazado o acortado.
- Todos los labels formales anteriores se conservan. Se añaden siete labels y ocho entradas formales (incluido el remark sobre completitud).
- Se mantienen todos los entornos theorem/proof anteriores y se añaden demostraciones para los resultados nuevos. El número de pruebas en las tres fuentes pasa de 10 a 14. El contenido de las pruebas afectadas sí se corrige; no se afirma que su semántica permanezca intacta.
- Monolito: capítulo BaseCore generado con las funciones puras del ensamblador existente; comparación completa posterior de los doce capítulos, 12/12 coincidentes. No se ejecuta una limpieza general del directorio de secciones.
- Registro: 755 a 763 entradas. Se conservan IDs anteriores y la curación de las entradas ajenas; se actualizan texto, localización y dependencias de las fuentes afectadas. Cero discrepancias de fuente o dependencias sin resolver en la comprobación completa.
- Conteos completos de propagación de los nuevos títulos: cero antes, uno después, tanto en fuentes como en monolito. Evidencia: `SYNCHRONIZATION.json`.
- Los estados automáticos `proved` y `proof_block_present_in_source` del extractor son clasificación documental. No constituyen comprobación de kernel ni revisión matemática independiente.

## Verificación y límites

`python check_math.py`: 64/64 controles finitos y sintéticos. Incluyen cálculos racionales de equilibrios y errores, parámetros extremos, varios tamaños N, el mapa identidad, expansión sin disipación, estrella dirigida, perturbación de entrada y un contraejemplo a la aproximación uniforme general. Las demostraciones universales están escritas en LaTeX; estos checks no las sustituyen.

`node synchronize.cjs`: 12/12 capítulos coincidentes, 763 entradas con cero discrepancias de fuente/dependencias. `git diff --check`: sin errores de espacios; Git advierte conversión futura LF/CRLF según la configuración local.

Los gates que escriben reportes y fixtures se ejecutan en una copia aislada. `VERIFICATION_COPY.json` enumera la copia y exclusiones; `VERIFICATION.json` conserva comandos, cwd, exit y tiempos. Los originales de release/corpus/fixtures no se reescriben.

Gates de raíz: integridad, claim registry y canonical release, exit 0. Gate interior `npm run verify:release`: exit 0, 6/6 cadenas; `validate-corpus.js --json`: exit 0, sin blockers ni warnings. Veredicto regenerado v31: **BLOCKED_FOUNDATION_FIRST_GATES**, **external_support_certified=false**. El reporte v34 presente en la copia es histórico y no se presenta como regenerado por esta ejecución.

No se reintenta Lean en esta fase. Las pruebas nuevas son argumentos matemáticos escritos y comprobaciones finitas, sin certificado nuevo de un asistente de pruebas. Revisión externa y evaluación de novedad siguen pendientes.

## Compilación y conservación

Ambas cadenas completas (pdflatex, biber, pdflatex, pdflatex) terminaron con exit 0. BaseCore: 46 páginas; monolito: 342 páginas. No hay advertencias de referencias/citas indefinidas ni labels multiplicados en los logs finales. Los PDF derivados locales se actualizaron con esas compilaciones. Hashes y logs: `basecore-pdf.json`, `monolithic-pdf.json`, `COMPILED_SOURCE_HASHES.json` y archivos de log. El freeze histórico no se modificó.

BaseCore conserva 6 avisos overfull (el log anterior tenía 6); el monolito registra 3 (el anterior tenía 3). Son deuda tipográfica explícita, no errores de las demostraciones. MiKTeX también advierte sobre la versión de Windows del entorno. No se afirma una reconstrucción binaria idéntica entre máquinas. Los auxiliares antiguos de la carpeta original no se usaron como evidencia: los logs de esta compilación están aquí.

El log del monolito también registra 331 avisos underfull; BaseCore, cero. La presente fase no es una auditoría visual completa ni una declaración de maquetación lista para publicación.

Conservación: 64/70 archivos del inventario teórico auditado permanecen idénticos; los cambios restantes pertenecen al alcance declarado y están enumerados en `PRESERVATION.json`. Registro de macros intacto. Fuentes compiladas idénticas a las fuentes locales, comprobadas por hash/contenido. Los temporales de verificación quedan identificados en `VERIFICATION_COPY.json`; no son una segunda fuente activa.

No se hizo commit, push, merge, despliegue, reorganización ni edición del runtime. El resto de la auditoría conserva sus obligaciones abiertas en `CONTINUIDAD_DEL_PROGRAMA.md`. Una fase local con respaldo concreto no equivale a consistencia global del corpus.
