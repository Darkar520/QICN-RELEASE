# Ruta 3 · ejecución, resultados y fronteras · 2026-11-12

## Estado

Implementación y verificación interna cerradas sobre la base limpia
`e6696344c30706f7b088e7899b29cf6edd376e62`. El resultado queda para revisión
en commits locales; esta fase no autoriza push. No se accedió al runtime.
`external_support_certified=false`.

El recibo completo es [VERIFICACION.json](VERIFICACION.json); las salidas e
incidencias están en [RECIBOS_CRUDOS.zip](RECIBOS_CRUDOS.zip). El original y
los temporales de compilación permanecen recuperables en
`E:/QICN-PRESERVACION/2026-11-12-ruta3/`.

## Prerregistro y decisiones

Prerregistro inicial previo a las fuentes: SHA-256 `05b0bbd1465e9742e2bc5f0e2eb203e3949a0bb9c90776b45b0afa6fd68bde86`.
Adenda inicial 3B: SHA-256 `129ddfc2252de4df6c62ea8144b3f2ccba043c8da23070785642b15b3fe12650`. Ambos se conservaron sin reescribir.
Es un registro interno, sin sellado independiente ni estudio confirmatorio
externo. Las revisiones de construcción siguientes se identifican como tales.

El usuario resolvió dos decisiones: conservar el umbral de resistencia como
exclusión **condicional** de una factorización que implicaría un clamp barato,
y especificar una gramática causal/computacional común con control obligatorio
de emulación irrestricta. No se postuló simultáneamente un clamp real barato
y el umbral estricto opuesto en el mismo sector.

Antes de los controles 3B se corrigió el candidato inicial: un contexto no
podía pasar por índice causal solo al renombrar una salida. El bit 9 retenido
pasó a determinar las tasas y los puertos del sistema. Un swap biyectivo
conserva unicidad y puede conservar perspectiva; por ello se corrigieron sus
objetivos antes de medirlos. Solo flat/xsub apagan la interacción reservada:
la pérdida esperada pasó de 13/15 a 14/15. No se presenta el borrador inicial
como una confirmación de las hipótesis finales.

La revisión posterior añadió controles de representación y cronología: los
cuatro inputs decodificados son comunes; un real empaquetado o un tag conjunto
gratuito cambia el contrato computacional aun sin añadir información de
Shannon. Comp cuenta nodos estáticos del circuito, incluyendo routing y
ramificación, sin regalar selección de programa por comando. Una permutación
doble puede restaurar el signo final: la continuidad se mide en ambos pasos,
con mínimo temporal. El feedback de routing usa donantes vivos y preserva la
cota global mediante Lipschitz 2/5. El núcleo de mantenimiento fija fase cero
para que el comparador pasivo sea realmente v=0, sin compensación oculta.
Son correcciones explícitas de la construcción, no criterios relajados para
convertir un fallo en aprobación. La versión final se volvió a comprobar.

## 3A · geometría, intervención y límite físico

Sobre la cuña de cubos positivos de Hilbert, con R=1/sqrt(3):

- Productos cartesianos en los ejes fijados: brecha al menos
  `max(d0/2,R/2)`; el suelo R/2 es alcanzable por Q/2 × Q/2.
- Productos embebidos con diámetro mínimo d0 y constantes 0<c≤C:
  `deltaW=c^2*min(d0/2,1/(4*C))/(2*C+4*c)>0`.
  La prueba usa cadenas y el esqueleto producto, sin asumir factores
  conexos por caminos. Un soporte a distancia menor que deltaW/2 conserva
  una brecha mayor que deltaW/2 frente a esa misma familia.
- Controles globales por inserción de cola: factores degenerados o pérdida
  de la constante inferior bi-Lipschitz dan productos a distancia ≤4*2^-n.
  Esto impide extender el resultado a homeomorfismos arbitrarios.
- Actuador ideal de desbloqueo unitario y movimiento cuadrático de duración
  unitaria: resistencia protegida 4/sqrt(3), daño sin barrera con resistencia
  cero; el clamp de daño cuesta 1/3 y deforma al menos 1/2. La versión
  protegida solo lo admite por encima de ese coste. Los cortes finitos
  conmutan con las retracciones y sus valores convergen.
- El criterio `M>K/delta` excluye productos **si** toda factorización
  admisible implica un clamp compatible con esas cotas. La prueba métrica
  de la cuña es independiente. Un sector de intercambios que preserva todo
  el soporte tiene resistencia infinita tanto en W como en Q×Q y no basta
  para inferir atomicidad.

Esa energía es un modelo operacional de un actuador ideal, no una medición
en julios. Se fijan preparación, horizonte y prohibición de reutilizar gratis
un desbloqueo. Cambiar esas reglas cambia el sector y su resistencia.

## 3B · realización conjunta y gramática

La planta es una única realización Hilbert–prefijo infinita y globalmente
acoplada. El índice nativo sigma=2*b9-1 selecciona el puerto de retención
17/64; el otro tiene 15/64. Todos los modos Hilbert participan en la fase y
reciben su realimentación. Los sitios 4–8 contienen los interruptores. R
retiene 4–9, preserva el mecanismo de escape nulo en 2–3 y desplaza la cola
desde 10. Los canales globales y el **sector completo** de productos partidos
se mantienen: no se reducen a un producto coordenado elegido.

El argumento global de V prueba los seis predicados sobre todo el soporte,
incluida la cota `1/384 <= e* <= 3/128`. Para el nuevo routing, el error
Hilbert satisface `e[t+1] <= (2/5)e[t]+1/8`, y el error observado es
`<=5/384<3/128`. Los controles de ventana no sustituyen esta prueba.

En VII, X es el estado intrínseco completo, con solo dos intervalos de alarma
ampliados y separación unitaria del índice. No se afirma interioridad de un
cubo infinito en el Hilbert ambiente. La región segura es A; el núcleo
compacto tiene fase cero y primeras coordenadas en sus referencias. Las
cinco magnitudes de vida son `(1/128,45/94,17/64,1/2,1/2)`, con diferenciación
≥1/3 e Idiff global. El retorno activo es 1 frente al retorno pasivo
`1-17/64`. Se especifican además los cuatro descriptores, sus comparadores
y umbrales; un clon de lectura parcial no se confunde con uno de estado
completo. La dependencia histórica es relativa al canal: dar el estado
actual informativo a ambos predictores elimina su ventaja.

La clausura `W^(2,L,3)` incluye **todos** los programas y composiciones
admisibles de los seis generadores, con igual adquisición, tres operaciones,
un registro y penalización Comp/16. Cada coordenada constitutiva débil depende
de como máximo dos puertos aleatorios; las composiciones y semillas deben
respetarlo. El espacio completo de predicciones pertenece al ANOVA de orden
dos, ortogonal a sigma*x*y. El modelo indexado paga sus tres operaciones.

Esto es una hipótesis causal adicional y explícita; no se deriva de los
nombres memoria, política o workspace ni de negar fenomenalidad. El resultado
**no** derrota todos los modelos generales de esas familias. Admitir un
emulador al mismo coste hace el margen ≤0; regalar una coordenada conjunta
o cambiar la representación gratuita también exige una comparación nueva.
El presupuesto compara pronósticos de la tarea reservada, no el coste de
simular todo el universo infinito. La adquisición/calibración común se declara
como interfaz idéntica y no contiene el producto objetivo.

Los protocolos P/R usan poblaciones separadas de signos equilibrados sobre
coordenadas nativas, sin fuga del resultado. Pérdida débil exacta 14/15,
candidata 3/16, margen 179/240. La optimalidad y el ínfimo son sobre clases
completas del contrato, no seis rivales puntuales. Las siete lecturas son:

| Coordenada | Valor |
|---|---:|
| Índice | 1 |
| Atribución por referencia independiente | 1/2 |
| Continuidad de ambos pasos | 1/2 |
| Ganancia de perspectiva | 1/3 |
| Asimetría de respuesta | 64/266529 |
| Perfil selectivo | 1 |
| Irreducibilidad normalizada | 179/464 |

Gate =64/266529>1/8192. Con exponentes 1/7, el escalar es mayor que 1/8,
y supera lambdaPhi=1/16>lambdaG. Otra calibración completa, fijada explícitamente,
da e=1/4096 en seis coordenadas y perfil uno: pasa el gate y los otros
requisitos, pero su producto e^6 falla el umbral escalar. Así este requisito
es una carga adicional efectiva.

Las diez intervenciones tienen objetivos no vacíos y shams emparejados.
Incluyen daños reales en acoplos, retención, actuadores o candidatos; no
solo cambios de palabras. La continuidad usa mínimo temporal para detectar
la doble permutación pese a su recuperación terminal. Se conservan los
contrastes de propiedad negativos antes del recorte, los empates válidos y
la insuficiencia de evidencia como estados distintos.

Se obtiene una clase indexada no vacía y propia dentro de Cop∩M_infty bajo
estos datos completos. Además del antiguo testigo simétrico, la misma familia
con mu=0 da un contramodelo completo con valoración cero. No hay inferencia
de experiencia subjetiva, agencia humana ni identidad metafísica.

## Puente e IX

El certificado completo puede copiarse a las tres ventanas del ejemplo XOR:
(0,1,1) tiene sección coherente y (0,0,1) no. El dominio local ya incluye V,
VII y VIII juntos, no solo un vector sintético. Esto prueba una condición
adicional propia para las extensiones de esos certificados. **No** prueba
la no vacuidad de la clase BPF completa: faltan los otros predicados
organizacionales, su propia clausura rival, identificación entre modos,
intervenciones, deriva, artefactos y gobierno. La contracción global exactamente
conmutante sigue obstruida incluso en el miembro indexado, por los dos
controles de fase sin punto fijo común. No se cambió ese requisito por su
variante por fibras de forma silenciosa.

## Verificación y conservación

- Raíz 3/3; release 6/6; matemáticas 32/32.
- Corpus/macros: cero bloqueos y cero avisos. Registro 906, con los 889 IDs
  anteriores íntegros salvo localizaciones; 17 entradas nuevas curadas con
  fecha local 2026-11-12. Las 383 definiciones y su metadato no intervenido
  permanecen iguales.
- Prosa y referencias: sin errores; 12/12 capítulos idénticos a sus fuentes.
- Nueve unidades reconstruidas con pdflatex/biber/2 pdflatex, más monolito de
  438 páginas. Diez PDF: cero Overfull hbox/vbox, referencias/citas
  indefinidas o etiquetas duplicadas detectadas. No equivale a revisión
  visual universal de cada página.
- Lean 4.31.0 fresco y serial: 32 módulos incluyendo agregador, 250 teoremas
  públicos, cero sorryAx; solo propext, Classical.choice y Quot.sound.
  Las 29 fuentes anteriores están intactas; se añadieron dos módulos y dos
  imports. Lean cubre núcleos finitos/ordenados, la norma euclídea de esquina,
  escalas diádicas, umbrales, funciones de pares y presupuestos algebraicos;
  la compacidad infinita, las cadenas Hausdorff, la clausura causal y la
  pertenencia global completa siguen como demostraciones TeX.
- Python: 605 controles racionales registrados de cuña y 752 de planta nativa,
  además de las treinta suites anteriores. La sección ejecutable conserva
  simbólicamente toda la cola de referencia infinita; no convierte una
  truncación en prueba del soporte global.
- 76 archivos congelados, seis archivos legacy y 29 módulos previos
  conservados byte por byte. No se leyó ni modificó el runtime.

Veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`;
v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`.
`external_support_certified=false` en los seis. Un exit 0 de ingeniería
no cambia esos veredictos científicos.

## Incidencias conservadas y revisión pendiente

Se preservó el primer release `INVALID_MANIFEST`: la extracción del archivo
Git había cambiado finales de línea. Se restauraron los bytes originales en
526 archivos cuya única diferencia eran esos finales; no se cambió ningún
verificador ni hash esperado. El release se reprodujo correctamente.

El primer módulo Lean requirió `noncomputable`; un reemplazo de olean falló
con código Windows 87 y se repitió con salida fresca. Una pasada completa se
interrumpió deliberadamente para añadir la norma euclídea explícita; la final
de 32 módulos se terminó después. Cuatro dependencias nuevas del extractor
apuntaban a IDs históricos regenerados; se resolvieron contra sus IDs estables,
sin cambiar los 889 anteriores ni relajar validadores. Se corrigieron dos
fórmulas demasiado anchas y se recompilaron sus unidades. Los avisos de
locale/Windows de Biber se conservan como incidencias ambientales.

La revisión matemática independiente sigue pendiente. También la calibración
física, la pertinencia empírica de esta gramática y población, familias más
amplias de rivales/loci, y el paquete completo de IX. Los homeomorfismos
arbitrarios sin distorsión acotada y el emulador al mismo coste tienen
obstrucciones demostradas; no son cierres positivos pendientes de maquillar.

Fuentes leídas: autoridades CANON_SOURCE_OF_TRUTH, CANON_MANIFEST,
CLAIM_REGISTRY, LAYER_BOUNDARIES, THEORY_SYSTEM_INTERFACE; AGENTS,
INSTRUCCIONES, ROADMAP y ejecución A–C; propietarios I, V, VII, VIII, Puente,
IX, VI, X y secciones 03/07 de BaseCore; registros y herramientas de
extracción, validación, ensamblado, regresión y Lean. Las 23 fuentes activas
finales, comandos, hashes, salidas y dominios están en el recibo.

Cambios: pruebas propietarias 3A/3B, dos módulos y controles, propagación a
BaseCore/VI/Puente/IX/X, registro/monolito/PDF y trazabilidad. Sin formatos,
interfaces de producto, publicación ni modificaciones en los paquetes
históricos congelados. Los commits se clasifican por ese alcance; la cadena
de aceptación corresponde al árbol final integrado.


## Commits locales de contenido

- 3A: `fcce98322e0340eafdbcb3da4a0ce77b85216bba` — math: bound Hilbert wedge product gaps and conditional clamp resistance
- 3B: `40bc3eac82b3bd0b53763b0bb8ce47141ca04fd4` — math: realize indexed certificates on an infinite native plant
- formal: `f7f708638c8909e095ca8c9b02a56395c7fbb34e` — formal: check Route 3 kernels and exact intervention controls
- propagation: `383159a0db5c7ee5c0eef6215b1500d0ce1b5b67` — docs: synchronize native certificates, registry and compiled volume

El último commit de trazabilidad registra estas referencias. La aceptación corresponde al árbol integrado; no se hizo push.

Incidencia del asiento final: una lectura de JSON UTF-8 con el valor predeterminado cp1252 falló. Se completó con UTF-8 explícito, sin repetir asientos ni alterar fuentes, resultados o recibos anteriores.
