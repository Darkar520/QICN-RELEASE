# Etapas 0–1: BaseCore y Papers I–III

Fecha: 2026-11-14. Rama de trabajo: `codex/etapa1-base-papers1-3`.
Base identificada: `f7171e76144e95e0680a22fc40668da48561013b`.
Este bloque prepara un commit local; no autoriza ni ejecuta push.

## Alcance y evidencia de aceptación

Se intervienen BaseCore y Papers I–III, sus cuatro PDF, el registro formal,
la matriz de cobertura y sus herramientas/documentos dependientes. No se
expande Lean. Los resultados nuevos son pruebas del manuscrito con controles
internos; no equivalen a resultados mecanizados completos ni a evidencia física.

La aceptación requiere los doce controles, en el orden solicitado, con salida
cero y conservación verificada. El recibo generado `VERIFICACION_FINAL.json`
es la fuente del resultado efectivo, tiempos, comandos, directorios, hashes y
veredictos. Este informe no sustituye ese recibo. Un fallo interrumpe la cadena.

Se conserva literalmente la frontera científica:

- `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`.
- `BLOCKED_MULTIPLE_GATES`.
- `BLOCKED_FOUNDATION_FIRST_GATES`.
- `external_support_certified=false`.

## Etapa 0: estado preservado y diagnóstico

El árbol inicial estaba limpio en `codex/ruta6-lean`, `f7171e7`, tres commits
por delante de `main` (`05f8e55`). Se creó la rama dedicada desde ese estado,
sin tocar `main`. El archivo `BASELINE.json` conserva los once controles
previos aprobados. Tiempo real: **1638.39 segundos, 27 minutos 18 segundos**.
El usuario autorizó expresamente completar los controles aunque se superasen
los diez minutos iniciales. No se editó el corpus antes de completar el baseline.

Se preservaron 866 archivos versionados mediante listado explícito de Git,
sin recorrer dependencias. `lean/.lake` sigue siendo el junction ignorado a
`E:/QICN-LEAN/v4.31.0-desktop`; no se copió ni borró recursivamente.
Las comprobaciones que reescriben informes trabajan en una copia aislada en
`E:/QICN-PRESERVACION/2026-11-14-etapa1-base-papers1-3/`.

Diagnóstico WSL sólo de lectura: tres invocaciones, aproximadamente 90.94 s
de ejecución acumulada. La primera tuvo un problema de comillas y la segunda
de terminadores CRLF; la tercera recibió UTF-8/LF y terminó con código cero.
No se encontraron `lean` ni `lake` en PATH ni ejecutables en las ubicaciones
normales examinadas de `~/.elan/toolchains`. Se observó un aviso de sesión
systemd de usuario. **Ubuntu no queda confirmado listo para Etapa 3**; no se
instaló nada ni se modificó su entorno. `WSL_DIAGNOSTIC.json` contiene la salida
literal del último intento, no una afirmación de ausencia de binarios en todo Linux.

## Resultados y límites, por obligación

| Unidad e identificador conservado/nuevo | Corrección o fortalecimiento | Hipótesis y límite que permanecen |
|---|---|---|
| BC02 `thm:spectrum` | Punto fijo explícito; derivada Fréchet y espectro exacto sobre todo `C([0,1],R²)`, usando la descomposición constantes/núcleo de la media. Interior: `{0,1/2}`; exterior: `{0,(1+2u)^-1}`. | Se prueba para la proyección del disco declarada, no para cualquier proyección convexa. En `u=1/2` sólo hay derivada direccional no lineal; no se atribuye Jacobiano. Ese parámetro sí pertenece al conjunto codificado. |
| BC02 `thm:relaxation` | Convergencia global `2^-n`; tasa local para todo `r>rho` en puntos regulares y entrada eventual de toda órbita en la bola local. | Tiempo en iteraciones; no calibración física ni igualdad de todos los transitorios con `rho^n`. La esquina conserva contracción global sin espectro de Jacobiano. |
| BC04 y PII, `def:phenspace`, `hyp:H3-metric`/`hyp:h3`, `prop:unique-phi` | Tipos de espacio, hipótesis métricas y E1 ordenados antes de sus usos; unicidad después de E1. | El espacio de asignaciones no hereda por nombre metrizabilidad/Polish ni contenido fenomenológico. E2 y sus obligaciones permanecen. |
| BC04 y PII `prop:metric-compat` | Módulo uniforme `inf_n(2 A_n + omega_n(r))`, finito y tendente a cero bajo compacidad y continuidad de las lecturas. | No se supone una constante Lipschitz común que no esté demostrada. La compacidad es del dominio declarado. |
| BC05 `thm:rigidity-inheritance` | Composición de cotas inferiores con constante producto; prueba separada de herencia de resistencia por pullback de intervenciones. | El pullback de toda deformación positiva de coste finito se exige explícitamente; no se deduce de un nombre. Transportar el ancla nula requiere fijarla. |
| BC05 `thm:null-categorical-universality` | Factorización única sobre la imagen fiel y cota Lipschitz `L/C`, mediante inversa sobre la imagen. | No se afirma extensión ni unicidad fuera de esa imagen. |
| BC05 `thm:null-simulation-lower-bound` | Error minimax exacto `1/(2·3^(N+1))` para observar bits `0,...,N`; extremos de fibra y decodificador de punto medio. | Es una restricción de información/precisión. El error tiende a cero con el presupuesto; dimensión real finita sin precisión limitada es otro problema. |
| BC05 `thm:null-closure-by-non-alternatives` | Cadena demostrada de exclusión nula conjunta, testigo positivo mínimo y margen relativo al ancla. | Necesita un par definido y separado y una cota inferior de lectura. El ejemplo existente sí realiza un sector concreto; no prueba realizabilidad física ni todos los sectores. |
| BC08 `prop:integrity-first` | Regla de decisión y soporte tipada con indicador de admisibilidad; prueba de anulación por fallo. | Es una propiedad del procedimiento declarado, no validez distribucional del estadístico. |
| BC08 `prop:complexity-only-negative-control` | Cuantificadores explícitos sobre todos los soportes y negación del certificado común. | Un fracaso de búsqueda finita no prueba inexistencia global. Conectividad, actividad y entropía no sustituyen los seis predicados. |
| BC08 `prop:ablation-prediction` | Prueba de invalidación de la tupla concreta de testigos y márgenes. | No se excluye recertificación con otros testigos, incluso sobre el mismo soporte. |
| BC08 `prop:grammar-transport-prediction` | Transporte bidireccional del certificado mediante isomorfismo de los datos completos; variante aproximada condicionada a radios reales. | Igualdad de una lista de métricas no es isomorfismo. No se infieren radios globales de lecturas cercanas. |
| BC08 `prop:threshold-sensitive-boundary` | Estabilidad por márgenes firmados Lipschitz; banda de ambigüedad con pendiente transversal inferior explícita. | Un score plano es control negativo; regularidad Lipschitz sola no garantiza una banda estrecha. |
| BC08 `prop:legibility-dependence` | Separación de fallo de certificado y fallo global; cota de empaquetamiento `M<=2^B` para distorsión uniforme menor que media separación. | No se sustituye el modelo de pérdida promedio por una garantía uniforme. |
| BC08 `prop:continuity-nonnull-relevance` | Conjunción operacional, separación positiva y control de márgenes que tienden a cero sin anularse. | No se convierte pérdida asintótica de radio uniforme en colapso exacto en tiempo finito. |
| BC11 `prop:coupled-energy-phase-bridge` (nuevo) | Núcleo positivo no constante, cota dirigida con grados de entrada/salida y realimentación, error uniforme de discretización y persistencia de distancia al subespacio constante. | Perfiles auxiliares congelados durante cada iteración. No se prueba una dinámica conjunta de energía/fase variables en el tiempo. El teorema desacoplado previo queda intacto. |
| PI `Small Displacement of Coherent Transports` | Prueba explícita mediante el supremo ponderado de las distorsiones coherentes. | Se mantiene la clase de comparaciones y transportes declarada. |
| PI `Universal Property of Identity` | Construcción coordenada, existencia y unicidad; continuidad por topología producto/subespacio. | Enunciado tipado en conjuntos y espacios topológicos; no universalidad en categorías arbitrarias. La correspondencia Lean existente se conserva en ese alcance. |
| PI `def:ontmass`, `Relation to Rigidity`; PIII `def:paper3-ontmass` | Un dominio común para Hausdorff, objetos cerrados no vacíos a distancia finita del de referencia, cociente coste/distancia e ínfimo vacío infinito; cota `1/(C A)`. | Separación entre espacio de historias, espacio de objetos y dominio de lectura. Invariancia de conjunto no significa invariancia de puntos ni de lecturas. Unidades coste/distancia. |
| PI `Impossibility of Perfect Simulation` | Prueba explícita tomando `t=B+1` frente a la cota `B>=t`. | Presupuesto de bits fijo; no imposibilidad por dimensión finita sola. |
| BC04 y PII `thm:readout-loss-stability` (dos registros nuevos) | En dominio compacto común: `C Delta <= R <= omega_F(Delta)`, estabilidad de pérdida `2 eta + omega_F(zeta)` y protección normalizada dividida por `r0`. | Cota uniforme sobre el dominio completo donde se evalúan ambos transportes; no sólo sobre los puntos iniciales. Denominador positivo y unidad explícita. |
| PII `thm:fragmentation`, `thm:forced-continuity`, `thm:dichotomy`, `thm:asymmetry`, `cor:protection`, `cor:loss-possibility` | Revisión de la cadena, demostraciones de corolarios y conexión con el nuevo resultado cuantitativo. | El escalar de resistencia no proporciona por sí solo transporte, testigo, continuidad ni cota inferior. No se infiere ética ni fenomenalidad. |
| PIII `thm:compact-polish-consistency` (nuevo) | Métrica suprema con coordenadas normalizadas, producto, completitud, separabilidad y límite cerrado; compacidad/no-vacuidad por intersección finita en estadios compactos. | Para métricas crudas se exige `w_n diam(S_n)->0`: sumabilidad sola no basta. La extensión Polish no compacta no garantiza no-vacuidad sin levantamiento. Índices contables. |
| PIII `thm:channel-projection-detectability` (nuevo) | Canal inducido por cuadrados conmutativos, continuidad y coercividad global `inf_n(v_n c_n/w_n)>0`; composición con lectura posterior. | Una sola proyección certificada sólo da cota sobre ese par/nivel. No se deduce calibración ni compatibilidad del nombre del canal o de CCR. |
| PIII `cor:robust-approximation-null-separation` (nuevo) | Cola de aproximación más ruido `eta`; separación `C epsilon -2 eta` y distancia nula máxima `C epsilon/2-eta`, positivas con presupuesto estricto. | Singular mínimo sólo para lectura lineal euclídea finita inyectiva auditada, distinto del espectro dinámico. Dos bolas nulas pueden solaparse si se ignora el presupuesto. |

### Familia acoplada explícita

`nu=1`, `kappa=1/4`, `a(s)=s/4`, `u in [0,1/4]`,
`e(s)=phi(s)=s/64`, con fases en radianes. Las diferencias no nulas cambian
efectivamente los pesos fuera de la diagonal. Se prueba
`q<=2048/8191<1`, desplazamiento de equilibrio como máximo
`8191/(256·6143)` y, para todo `N>=2`, margen de no-colapso
`gamma=90097/1572608>0`. El error uniforme de discretización es
`(kappa L_w + L_a/sqrt(12))/N`, y el error de equilibrio se divide por `1-q`.
El caso `N=1` es un control negativo para el no-colapso espacial.

Los controles ejecutables usan fracciones exactas y encierros racionales de
Taylor para exponencial/coseno, resoluciones racionales en `N=2,4,8`, varios
controles de entrada, residuales y cotas de incertidumbre. No se presenta
una cuadrícula finita como demostración del resultado para todo `N`.

## Registro, cobertura, procedencia y conservación

La actualización es por ID, sin extractor overwrite. `FCR_SYNC.json` enumera
los cambios: **906 IDs conservados, seis añadidos, 912 entradas**, con 299
entradas anteriores actualizadas (muchas sólo por desplazamiento de líneas).
Los nuevos objetivos son cuatro teoremas, una proposición y un corolario:
**425**, desde 419. Los **383 registros de macros quedan idénticos**.

Las cuatro antiguas demociones de BC05 se conservan en historia/procedencia,
pero su estado activo es `corrected_conditional_proof`, prueba presente y
estado epistemológico condicional. La revisión interna está marcada como tal;
no se declara certificación externa. Se corrige también el overlay que de otro
modo restauraría el estado antiguo al extraer. Los demás overlays obligatorios
se conservan. `docs/AUDIT_MASTER_v5.md` no existe en este checkout: se registra
esa ausencia, sin inventar su contenido ni borrar las referencias históricas.

Hay siete diferencias previas de presentación entre fuentes fuera del alcance
y sus registros curados: cortes de línea `allowbreak`, `detokenize`, guiones
discrecionales y escapes. La comparación normalizada comprueba igualdad de
texto. No se editan esos manuscritos ni sus registros.

Cobertura activa: **10 EXACT_MATCH / 51 FINITE_OR_PARTIAL_KERNEL /
348 PENDING_MATHLIB / 16 EMPIRICAL_OR_PROTOCOL_BOUNDED = 425**.
Los nombres históricos `COVERAGE_MATRIX_419.*` se conservan y declaran ambos
conteos. `COVERAGE_REVIEW.json` explica la revisión de la propiedad universal
ya exacta y el apoyo parcial de dos resultados nuevos. Todos los hashes,
ubicaciones, firmas y símbolos se sincronizan. Los 35 archivos Lean y las
271 declaraciones públicas no se modifican. La métrica ponderada completa,
los márgenes analíticos nuevos y sus alcances aún requieren mecanización.

`CONSERVACION.json` verifica las áreas congeladas, Papers IV–X/Puente,
fuentes Lean y macros; conserva el teorema desacoplado y los marcadores de
procedencia requeridos. Ningún fichero se elimina.

## Compilación y controles

Los cuatro PDF se reconstruyen con `pdflatex`, `biber`, `pdflatex`, `pdflatex`
en copia aislada. `COMPILACION.json` guarda resultados, hashes e información
de los PDF. Las pasadas finales no presentan errores fatales, referencias
indefinidas, etiquetas duplicadas ni `Overfull`. Persisten avisos de espaciado
`Underfull hbox`: PI 1, PIII 12, BC y PII 0; no son referencias rotas.
MiKTeX emite su aviso de compatibilidad de Windows; no se reconfigura el entorno.

Se corrigieron dos cierres de fórmula durante compilación y la colocación de
la nueva proposición para mantener cada prueba junto a su enunciado. Los
primeros fallos se conservan en los logs externos, no se ocultan ni se cuentan
como compilaciones aprobadas. Se recompilaron las unidades afectadas.

Conforme a la autorización de esta etapa, **no se reconstruye el monolito**:
su PDF y fuentes ensambladas siguen siendo la edición previa de 410 páginas,
no una publicación de estos nuevos resultados. La edición de conjunto se
sincronizará al propagar las dependencias en la etapa posterior; los cuatro
PDF unitarios son los actualizados. No se anuncia que el monolito esté al día.

La suite añade un control de etapa con **32 comprobaciones**, además de las
32 suites preexistentes, conservadas sin relajar criterios. La puerta solicita
por tanto **33 suites matemáticas**. Los informes de salud/atlas/grafo/riesgo
se regeneran desde el registro actual sin modificar áreas congeladas.

Orden exacto de la puerta final:

1. Raíz: `node scripts/verify-canonical-integrity.cjs`.
2. Raíz: `node scripts/verify-claim-registry.cjs`.
3. Raíz: `node scripts/verify-canonical-release.cjs`.
4. Interior: `npm run verify:prose`.
5. Interior: `npm run verify:corpus-registry`.
6. Interior: `npm run verify:macro-registry`.
7. Interior: `npm run lint:nonclaims`.
8. Interior: `npm run verify:curation-overlays`.
9. Interior: `npm run verify:math`.
10. Interior: `python scripts/verify-lean.py --kernel-only --packages-dir E:/QICN-LEAN/v4.31.0-desktop/packages`.
11. Interior: `python scripts/verify-lean-coverage.py`.
12. Interior: `npm run verify:release`.

Los comandos se ejecutan secuencialmente. La copia aislada tiene hashes de
entrada idénticos al árbol de trabajo; Lean se ejecuta sobre las fuentes
idénticas del directorio activo para escribir sus objetos efímeros en el disco
interno y reutilizar sólo las dependencias fijadas de E:. Esa ejecución vuelve
a elaborar las 35 fuentes y audita todos los axiomas; no usa un resultado viejo
como sustituto. Sólo escribe su caché ignorada. Un único proceso Lean.

## Archivos examinados, cambios y evidencia reproducible

Leídos: AGENTS, las cinco fuentes de verdad en orden, INSTRUCCIONES, roadmap,
fuentes y bibliografías del corpus activo para tipos/dependencias, las cinco
secciones BC intervenidas, PI–III completos en los bloques afectados, registro,
overlays, herramientas FCR/cobertura/compilación, matriz y módulos Lean citados.
Se inspeccionaron los controles matemáticos previos relevantes, las cuatro
pruebas del régimen nulo y los siete bloques de predicción.

La lista exacta de ficheros leídos durante la auditoría está acotada por los
orígenes citados en `AUDITORIA_PREVIA.md`; el recibo de conservación lista los
archivos versionados preservados. La lista exacta de cambios se obtiene con
`git diff --name-status f7171e7..HEAD` después del commit de esta rama.
No se atribuye una lectura humana integral de todas las líneas de cada área
congelada por haber calculado sus hashes.

Evidencia de trabajo externa: `E:/QICN-PRESERVACION/2026-11-14-etapa1-base-papers1-3/`:
instantánea `baseline/`, hashes iniciales, extracción temporal `extracted-*.json`,
logs de baseline y compilación, scripts de fusión y sincronización y copia
`compile/`. Los scripts temporales no son una nueva interfaz del proyecto.
Prerregistro inmutable en `PRERREGISTRO.md`, con SHA-256 en la conservación.
Los recibos versionados permiten revisar los resultados sin depender del chat;
los logs completos de los comandos se conservan en E:.

## Deuda ordenada para Etapas 2–5

1. **Etapa 2:** propagar a Papers IV–X/Puente las consecuencias efectivas de las
   firmas estabilizadas, comparar los contratos y reconstruir el monolito.
   No cambiar sus hipótesis por arrastre ni promover controles a evidencia externa.
2. **Etapa 3:** preparar Lean/lake en Linux si se elige WSL y mecanizar primero
   métrica ponderada, colas, no-vacuidad, coercividad de canales y límites
   analíticos nuevos; revisar fidelidad semántica de cada traducción.
3. **Etapa 4:** ampliar realizaciones y familias rivales bajo contratos comunes
   de información/coste, calibración y ablaciones; la congelación espacial de
   energía/fase no prueba su evolución conjunta.
4. **Etapa 5:** revisión matemática humana independiente y replicación/evidencia
   donde la afirmación sea experimental, antes de publicación científica o
   promoción de clases completas. Ningún control de software las reemplaza.

No se declara cerrado el programa completo. El avance concreto es una cadena
de objetos tipados, pruebas y constantes auditables con negativos explícitos;
la interpretación permanece separada de lo que esas pruebas establecen.
