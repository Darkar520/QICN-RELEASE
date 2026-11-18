# Ejecución: separador estructural y puente ampliado

Estado: VERIFICACION_TECNICA_LOCAL_COMPLETADA; COMMIT_LOCAL_A_CONTINUACION. No publicación ni cierre científico.
Base: main 5769ecf. Rama: codex/fase-cientifica-atomic-puente.
Checkpoint A separado: codex/etapa3b-lean, 5fd9d01. Su reproducción Lean completa sigue pendiente por recursos; no se incorpora su código experimental aquí.

## Lecturas y frontera
Cinco fuentes canónicas, INSTRUCCIONES y ROADMAP; BaseCore sección 06; Paper I (Cantor, clamp, punto de corte e indivisibilidad); Paper V (I_int, categoría fiel, separador, hold/swap y planta nativa asimétrica); Paper IX (cuatro raíces, híbrido compartido, planta cuártica y geometría activa); ledger H1–H4 y fuente histórica v30; verificadores, extractor, matriz y constructor del monolito; planta ejecutable body_world_tower.py y prefix_tower.py.
Fuentes históricas y Paper I se leen, sin modificarse. No se escribe QICN-SYSTEM. Main y remotos se preservan.

## Resultados y límites
BaseCore deriva observabilidad de todo funcional lineal no nulo desde irreducibilidad del polinomio mínimo de grado d en F_p^d. La prueba usa subespacios invariantes; no presupone el separador. Paper V deriva error de producto >=1/[2(p-1)], delta_int=1/[4(p-1)] y fidelidad inyectiva de cocientes. La condición es necesaria para la garantía sobre TODOS los funcionales; no es necesaria para toda familia de puertos particular. Se conserva hold/swap. El control identidad factoriza exactamente. Es una aplicación de observabilidad algebraica clásica, sin afirmación de novedad histórica.

El gap general gap:basecore:i_int_atomic_separator no se declara universalmente cerrado: no se deriva irreducibilidad sobre un cuerpo finito de las hipótesis hilbertianas o de continuidad. Lo nuevo es un teorema de derivación en una clase estructural explícita y no vacía.

Paper IX añade una flecha física del bit nativo retenido b8, leído por T_d (d>=9), a la fuerza cuártica y a su consecuencia en el canal mundo. Se prueba invariancia y contracción por fibra 105/128; no contracción global entre bits distintos. El contraste de cinco raíces vale G=1/2097152, con margen ruidoso penalizado >=253G/256 en el contrato declarado. Híbridos de estado compartido sólo quedan separados si su respuesta desenrollada pertenece a la clausura de ancestría propia. Una restricción de presupuesto por sí sola no excluye una réplica total: ésta empata con el mismo grafo y coste. No se hereda automáticamente una nueva ventana completa de siete coordenadas bajo las 32 preparaciones.

El documento de prerrequisitos distingue postulados puente, objetivos externos, comparadores y H1–H4. Se corrige el ledger: sobreyección compacta a todo R^n no tiene instancia (n>=1); diámetro no basta para radio de Chebyshev; constancia conjuntista requiere hipótesis adicionales para factorización medible. El déficit H4 -0.45 se conserva. No se modifica el anexo histórico v30.

## Trazabilidad y pruebas
PRERREGISTRO.md se congeló antes de TeX/código; CONSERVACION.json registra 922 hashes iniciales. Los controles exactos están en check_atomic_coupled.py, integrado en verify-math-regressions.py. Las 48 codificaciones del ejemplo binario dan error mínimo 1/2; 32 preparaciones del sistema acoplado dan G; sham/corte dan cero y réplica total cero error. Las demostraciones generales siguen en los manuscritos, no se sustituyen por esas enumeraciones.

Se usó el extractor en salida temporal y se conciliaron los resultados preservando los 921 IDs y metadatos curados anteriores. Se añaden seis entradas, total 927; las 383 macros se conservan. Se sincroniza deriva tipográfica previa en cuatro objetivos de cobertura, comprobando equivalencia tras retirar únicamente allowbreak/detokenize/guiones discrecionales. Ninguna promoción matemática por esa limpieza. La matriz conserva sus filas previas y añade seis PENDING_MATHLIB: 442 objetivos, 14 EXACT_MATCH, 56 parciales, 356 pendientes, 16 de protocolo. Las nuevas dependencias explícitas forman un grafo sin ciclos.

Una operación auxiliar de conciliación supuso incorrectamente que el registro de macros tiene campo id: falló antes de tocar macros y se corrigió usando nombre/propietario/definición/aridad. Otro assert detectó deriva tipográfica previa y se resolvió por cotejo explícito, sin relajar verificadores.

## Recibos y reglas de aceptación
Todas las compilaciones y puertas se ejecutan en E:/QICN-PRESERVACION/2026-11-17-fase-cientifica-atomico-puente/. BUILD.json contiene comandos y tiempos reales; GATES.json conserva salidas literales. PDF_QUALITY.json y PROTECTED_HASHES.json delimitan reconstrucción y conservación. Las copias aisladas no se convierten en fuentes activas por sí mismas.

BaseCore (64 páginas), Paper V (49), Paper IX (73) y monolito (439) compilaron con pdflatex/biber y cero referencias indefinidas, etiquetas duplicadas y overfull en sus logs finales. Las tres puertas raíz y release 6/6 pasaron. El estado definitivo de las restantes puertas y Lean se añadirá desde sus recibos; no se declara PASS anticipado.

Deuda científica: mecanizar los seis resultados nuevos; conectar el criterio finito con clases continuas si es posible; ampliar rivales sin borrar empates; identificar el objetivo externo y cerrar H1–H4 mediante hipótesis/pruebas y datos independientes. external_support_certified=false.

## Primer intento: parada por memoria (histórico)

Pasaron 14 puertas no-Lean: raíz 3/3, release 6/6, nonclaims, gaps, semantic inflation, negativos, math 35/35, prose, corpus, macros, cobertura y calidad del monolito. Los comandos y salidas literales están en GATES.json y logs/ en la ruta E: indicada. VERIFICACION_FINAL.json conserva el resumen sin reemplazar la salida cruda.

Lean 4.31.0 verificó versión, biblioteca incorporada y los nueve pins. La protección detuvo el primer módulo de la reproducción fresca al alcanzar 522334208 bytes de memoria virtual disponible (<500 MiB), con 2696990720 bytes de RAM física libre. Duración 25.95 s; exit=1; stop_reason=RESOURCE_LIMIT_BELOW_500_MB. No se ejecutaron reintentos y no se convierte este resultado en PASS. Los módulos Lean fuente de main no se han modificado. La cobertura contable sí pasó: 442 objetivos y 348 declaraciones públicas; no certifica reproducción fresca.

Se preservaron los cuatro PDFs compilados y el TeX/report del monolito. No se crea el commit científico ni se declara cierre mientras falte la puerta Lean. Main permanece 5769ecf; la rama A conserva su checkpoint 5fd9d01. Sin push ni merge. Liberar RAM física no elimina automáticamente el límite de memoria virtual/compromiso de Windows; más almacenamiento en E: tampoco lo cambia por sí solo.

Diagnóstico de recursos de sólo lectura: Windows tiene paginación fija de 8192 MiB en C:/pagefile.sys y AutomaticManagedPagefile=False. Al consultar después de la parada, CurrentUsage=6312 MiB y PeakUsage=7894 MiB. No se cambió la configuración de Windows ni se cerraron aplicaciones del usuario. La parada ocurrió en kernel-QICNLean.Basic.log.

## Auditoría de cierre posterior

COMPLETION_AUDIT.json coteja cada requisito con sus recibos. La especificación de cinco prerrequisitos no está completa: CN-3 carece de protocolo previo localizado. Se corrigió la mención que presuponía su existencia y se pidió aclaración. Esto corrige el reporte previo que situaba todo lo restante sólo en Lean. La reproducción Lean y el commit científico siguen pendientes; no hubo nueva compilación tras la parada.

## Reanudación y cierre técnico local

Tras la aclaración del usuario se cerró CN3_ADDENDUM: historical_v1 del runtime, su false (3/5 y 3/5) y la regla conjunta se conservan; se distingue la política paired con aprendizaje posterior. La extensión al puente queda especificada prospectivamente con medición conjunta F/Z_op y campos externos por calibrar/congelar antes de ejecutar. No se ejecutó la campaña del runtime ni se modificó QICN-SYSTEM.

La memoria virtual disponible aumentó materialmente respecto al intento detenido. RESUMPTION/VERIFICACION.json conserva la comparación previa/actual, los comandos, tiempos reales y salidas literales. La nueva ejecución terminó EXIT=0: Lean 4.31.0, nueve pins, 40 módulos (incluido agregado), 348 declaraciones públicas auditadas; sólo propext, Classical.choice, Quot.sound. No se reutilizó el resultado de la ejecución abortada como aprobación. No se importó Lean experimental de la rama A.

Los controles matemáticos volvieron a pasar 35/35; también gaps, semantic inflation y negativos. El addendum pasó raíz3, release6, prosa, corpus, macros, cobertura y calidad monolítica. Paper IX tiene 75 páginas y monolito 440, con cero referencias indefinidas, duplicados y overfull finales. Los seis resultados nuevos siguen manuscritos pendientes de Lean: 442 objetivos, 14 exactos/56 parciales/356 pendientes/16 de protocolo.

La auditoría final encontró etiquetas de cobertura activa obsoletas en tres README y las actualizó a 442, preservando las cifras históricas de Etapa 3A. README_CONCORDANCE.json registra sus hashes previos. Se conservan 129 hashes de activos matemáticos, congelados y de toolchain; el único cambio entre los 130 inicialmente protegidos es lean/README.md, una actualización documental de cobertura registrada con hash previo/posterior. Las fuentes compiladas coinciden con las activas.

Esta aceptación es técnica y local. El commit se realiza después de revisar el staged; su SHA y estado limpio quedan en el recibo externo post-commit para evitar una autorreferencia de hash. Main se conserva en 5769ecf; checkpoint A 5fd9d01; sin merge ni push. El gap atómico general, mecanización de seis resultados, obligaciones externas H1–H4 y Etapa3B-Cont siguen con su alcance explícito. external_support_certified=false.
