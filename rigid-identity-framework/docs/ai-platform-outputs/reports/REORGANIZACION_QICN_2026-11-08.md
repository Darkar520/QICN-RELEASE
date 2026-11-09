# Reorganización conservadora del marco QICN

Fecha: 2026-11-08. Estado: reorganización aceptada tras verificación; copia vinculada activa. No se inicia reparación matemática durante esta fase.

## Alcance y referencia

- Origen preservado: `C:/Users/irisp/OneDrive/Escritorio/QICN-FRAMEWORK`.
- Copia vinculada creada con la herramienta de Codex: `C:/Users/irisp/.codex/worktrees/qicn-framework-ordenado/QICN-FRAMEWORK`.
- Rama local: `codex/qicn-framework-ordenado`; commit de partida `64ba23f0029bba73c64c0bb9f24d3c781c47a84a`.
- Respaldo: `E:/QICN-PRESERVACION/2026-11-08-reorganizacion-01`.
- Inventario único: `INVENTARIO_MIGRACION_2026-11-08.csv`, en esta carpeta.

Se conserva el programa completo, incluidos antecedentes, fuentes, propuestas abiertas, formalizaciones y la primera corrección de BaseCore pendiente de revisión externa. Runtime, publicaciones nuevas y reparación de herramientas quedan excluidos de esta fase. Los archivos del origen no se editan ni se eliminan; la creación del worktree registra los metadatos Git compartidos necesarios.

## Preservación y clasificación previas

Se examinaron 7.128 archivos fuera de dependencias/cachés identificados. Todos se guardaron en `snapshot.zip` y se verificó el SHA-256 de cada miembro contra el origen. El respaldo conserva también índices de rutas/modos, patches de cambios pendientes y `history.bundle` con ramas/etiquetas, validado mediante `git bundle verify`.

Clasificación: 737 archivos trasladados; 6.391 conservados sólo en el respaldo por ser productos regenerables, diagnósticos locales u otros materiales que no definen el marco. Cero archivos pendientes de identificar. Los árboles de dependencias/cachés excluidos se registran a nivel de directorio en el mismo inventario. Mathlib mantiene el commit fijado por su manifiesto y no presenta modificaciones locales en sus fuentes; sus objetos compilados no se copian. El fallo previo de reproducción Lean permanece abierto.

La raíz, BaseCore, los papers, scripts, bibliografías, registros y contratos congelados conservan sus rutas. Una auditoría narrativa suelta se reubica en la carpeta de auditorías existente. Diecisiete antecedentes únicos, incluidos cinco TeX y siete PDF, se conservan bajo `recovery-candidates/`, que el extractor existente excluye del registro activo. El inventario conserva su ruta histórica completa; las rutas de destino se acortan para Windows. Los dos casos JSON históricos se conservan como fixtures sintéticos históricos, sin atribuirles evidencia externa.

La copia del historial no depende de los cachés reinstalables. Los auxiliares de compilación, trazas de clientes y copias de builds se mantienen en el respaldo, sin trasladarlos a la superficie activa. El volcado textual agregado se conserva en el respaldo; sus fuentes individuales permanecen disponibles.

## Incidencias resueltas antes de verificar

El primer intento encontró una ruta histórica demasiado larga para Windows. Se aplanó su destino sin cambiar contenido ni origen; la ruta máxima de los archivos migrados es de 244 caracteres. Los restos del intento se conservaron fuera de la copia activa.

La revisión automática rechazó una operación de borrado por política de ejecución. Se completó la limpieza mediante traslado de los duplicados al respaldo, preservando sus bytes; no se usó otra vía de borrado.

Git señaló inicialmente cambios de tamaño LF/CRLF en 439 archivos cuyo contenido filtrado coincidía exactamente con el índice. Se refrescaron sólo esas rutas verificadas: cero cambios de contenido staged y ningún archivo normalizado o reescrito por esa operación. Así se conserva la igualdad binaria con el origen sin introducir ruido falso en el estado de Git.

## Prerregistro de verificación

Resultados esperados: hashes iguales para los 737 archivos antes de los cambios documentales explícitos; mismas fuentes/entornos/pruebas/labels matemáticos; 12 capítulos coincidentes con el ensamblador; registro de 763 entradas sin deriva; 64 controles de la primera corrección satisfactorios; contratos congelados idénticos; PDF reconstruidos con igual contenido textual, páginas y sin nuevas referencias indefinidas ni etiquetas duplicadas.

Se ejecutarán los tres gates de raíz, `npm run verify:release`, el validador del registro y las comprobaciones de la primera corrección en una copia aislada porque algunos reescriben fixtures e informes. Se reconstruirán BaseCore y monolito sin alterar los PDF conservados del candidato. Se guardarán comandos, tiempos, logs, hashes y resultados crudos en la caché de verificación y el respaldo.

Parada: cualquier gate fallido o discrepancia nueva no explicada impide aceptar la transición. No se cambia un verificador para obtener aprobación. Los estados científicos bloqueados y `external_support_certified=false` deben preservarse. No se afirma revisión matemática externa ni comprobación nueva de Lean.

## Aceptación y continuidad

Aceptada: 737 archivos migrados verificados, cero pérdidas detectadas y cero discrepancias nuevas pendientes dentro del alcance. Los 7.128 archivos del origen conservan sus hashes. Las fuentes matemáticas y los contratos congelados permanecen idénticos. Esta copia vinculada es la ubicación activa; la original permanece como referencia y almacén Git compartido.

Resultados: tres gates de raíz satisfactorios; `npm run verify:release`, seis cadenas satisfactorias; registro de 763 entradas sin blockers ni warnings; controles de la primera corrección 64/64; capítulos del monolito 12/12 coincidentes. Veredicto regenerado v31: `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`.

BaseCore se reconstruyó con 46 páginas y el monolito con 342. El texto extraído de ambos PDF reconstruidos coincide con el de los PDF preservados. No hay referencias/citas indefinidas ni etiquetas duplicadas al final. Avisos overfull: 6 y 3 respectivamente, iguales a la referencia anterior; subsisten advertencias underfull y la advertencia de MiKTeX sobre la versión de Windows. No se afirma auditoría visual integral ni identidad binaria de PDF recompilados.

Los comandos, tiempos, logs, comparaciones y hashes están en `.cache/qicn-reorganization/` de esta copia y en `verification-evidence.zip` del respaldo externo. Los verificadores y compiladores sólo escribieron en la copia aislada indicada por esos registros; no se sustituyeron los PDF ni los fixtures preservados de la ubicación activa.

README, roadmap y ledger son las únicas superficies documentales existentes actualizadas por esta fase; se añadieron sólo este informe y el inventario. No hubo commit, push, merge ni modificación del runtime. No se verifica de nuevo Lean: su deuda de reproducción permanece abierta y sus fuentes/manifiesto se conservan.

La fase matemática es independiente: E1/E2 y las demás obligaciones siguen abiertas hasta disponer de demostraciones y propagación verificadas. La reorganización no cierra esas propuestas ni convierte la primera corrección en resultado revisado externamente.

Después de aceptar la reorganización se ejecutó R2 en una fase matemática separada. Los hashes y páginas indicados arriba describen la aceptación del traslado; las revisiones posteriores se registran en el ledger y en el addendum R2 del documento de continuidad.

R3 se ejecutó después de la reorganización en una fase separada: BaseCore y monolito actuales son de 48/344 páginas; evidencia de esta corrección en el ledger y el documento de continuidad.

R4 posterior: conciliación local del régimen nulo y dependencia de tipos de soporte. PDF actuales: BaseCore 49, Paper III 18, monolito 346; Paper II 17 páginas conserva R2. La aceptación del traslado sigue identificada por sus propios hashes previos. Fortalecimiento global pendiente según el documento de continuidad.


### Cierre recuperable del estado local

Comprobación final: los 7.128 archivos inventariados del origen mantienen sus hashes; materiales congelados y legado de la copia activa coinciden con el inventario. Todos los cambios posteriores al traslado pertenecen a las fases matemáticas/documentales registradas. Las fuentes TeX, bibliografías y registros activos coinciden por hash con la última copia compilada; Paper II conserva su estado verificado en R2. Git no contiene cambios staged ni commits nuevos.

El respaldo final de la copia activa se identifica mediante FINAL_INTEGRITY.json, FINAL_STATE_MANIFEST.json, final-state.zip y final-working-tree.patch en E:/QICN-PRESERVACION/2026-11-08-reorganizacion-01. El archivo history.bundle conserva el historial; snapshot.zip es la instantánea inicial completa. El directorio externo snapshot/ procede de un intento inicial parcial y no es la instantánea autorizada para recuperación. La verificación de cada miembro del ZIP final queda registrada en FINAL_INTEGRITY.json.

Incidencia del cierre: el primer comprobador leyó los destinos de un CSV externo anterior al acortamiento de rutas y señaló 17 destinos ausentes. Se contrastaron con el inventario vigente: los 17 antecedentes aplanados existen y sus SHA-256 coinciden. Se corrigió la referencia a destinos, manteniendo la igualdad de hashes/decisiones con el inventario inicial, y se repitió el control completo sin excluir archivos.

Estado: reorganización aceptada, R1 preservada y R2–R4 corregidas/verificadas localmente. Fortalecimiento de todo el marco aún abierto conforme a la tabla de continuidad. Revisión matemática externa, Lean y obligaciones científicas no se convierten en aprobadas por estas comprobaciones de conservación.


## Reubicación al Escritorio y reproducción Lean

La copia activa pasó a `Escritorio/qicn-framework-ordenado`. Se verificaron 844 hashes al copiar el contenido íntegro. El movimiento directo quedó bloqueado por Windows y el registro de Codex rechazó el destino no administrado; el checkout del Escritorio tiene un almacén Git independiente con el mismo historial y remotos. El adjunto previo de Codex y la carpeta original se conservan como respaldo. Se comprobaron también 115 hashes de fuentes/PDF/registros y 83 materiales congelados/legado.

El resultado anterior de Lean quedó pendiente porque falló la lectura de `LibraryRewrite.olean` al reutilizar la caché; no se llegó a comprobar las pruebas. En esta fase se detectó y restauró `libLean.a` faltante desde la distribución oficial 4.31.0 (329.926.252 bytes; SHA-256 `904c624f0fe8db80190e5dc4306aaaa7d8991491d0dfd4d4c43575e34ff49f8f`). Mathlib y sus nueve pins se repusieron en E: mediante 2.326 entradas de caché. El `lake build` nativo volvió a fallar al leer objetos privados de la biblioteca estándar, aunque sus bytes coinciden con el ZIP oficial; una prueba de un módulo sin Lake agotó 300 s. No se atribuye ese fallo a un error de demostración ni se da por cerrada la compilación completa nativa en Windows.

La reproducción que pasó se ejecutó con Lean 4.31.0 en Ubuntu/WSL, cuyo disco virtual está en E:. Un intento anterior se interrumpió tras el evento Windows 2004 de memoria virtual insuficiente y dejó objetos incompletos; la extracción serial de los 2.326 archivos de caché verificados por SHA-256 se rehizo por lotes, con escritura confirmada en disco antes de volver a ejecutar Lean. Se compilaron de nuevo 19 archivos Lean y se auditaron 78 teoremas públicos, con axiomas estándar `Classical.choice, Quot.sound, propext`. Se compilaron 18 módulos desde fuente. Tras una interrupción de WSL se terminó el agregador y la auditoría contra esos mismos objetos compilados. La sección siguiente explica la ejecución. `npm run verify:math` reúne las cuatro baterías anteriores. Los gates obligatorios, registro, macros y monolito se verificaron aislando las escrituras de fixtures. También se recompilaron BaseCore, Papers II–III y monolito en una copia aislada: 49, 17, 18 y 346 páginas, sin referencias indefinidas ni etiquetas duplicadas. Se conservaron los PDF activos y la deuda tipográfica ya registrada.

Veredicto científico: `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`. La cobertura formal existente es parcial; las correcciones R1–R4 conservan su estado de prueba escrita y controles finitos. El plan completo quedó añadido al roadmap existente.

### Repetir Lean

Este proyecto fija Lean 4.31.0 y Mathlib en `fabf563a7c95a166b8d7b6efca11c8b4dc9d911f`. Las revisiones transitivas están en `lake-manifest.json`. La fuente matemática activa sigue siendo BaseCore y sus papers; estos archivos formalizan enunciados identificados bajo sus hipótesis.

Desde `rigid-identity-framework/`, con Python 3.11+ y el toolchain fijado:

```sh
npm run verify:math
npm run verify:lean -- --fetch-cache
```

La segunda orden obtiene las dependencias usadas, construye los módulos con Lake y audita las dependencias axiomáticas de los teoremas públicos. Con la caché ya preparada puede omitirse `--fetch-cache`. Para una máquina con memoria limitada se puede ejecutar una elaboración serial desde las fuentes, con los mismos parámetros de prueba y sin generar C:

```sh
npm run verify:lean -- --kernel-only
```

La vía reproducida en este equipo fue Ubuntu en WSL, con su disco virtual en E:. El comprobador toma un compilador y una caché ya instalados, valida la versión y los nueve pins, y crea nuevos objetos de QICN en `.cache/qicn-lean/`. El directorio de paquetes debe contener las revisiones fijadas y los objetos de sus imports:

```sh
QICN_LEAN_EXE=/ruta/a/lean-4.31.0/bin/lean python3 scripts/verify-lean.py \
  --kernel-only --packages-dir /ruta/a/paquetes-fijados
```

Los módulos reproducidos incluyen contracción, construcciones de Hilbert y atractores, resultados condicionados de H5, puentes unilaterales e instancias discretas. Esta ejecución reproduce los enunciados existentes; la mecanización de las correcciones R1–R4 queda como trabajo del roadmap. Sus pruebas escritas y regresiones finitas se comprueban por separado.
