# Ruta 4 · inventario y disposición editorial

Inicio 2026-11-12; ejecución y cierre 2026-11-13. Base `5535a5c`.
El inventario completo con líneas, textos y dependencias está en
[INVENTARIO.json](INVENTARIO.json); las sustituciones exactas, en
[CAMBIOS_EDITORIALES.json](CAMBIOS_EDITORIALES.json).

Se examinaron 23 fuentes primarias y 15 archivos de composición/preámbulo
(38 archivos TeX). En las fuentes primarias, los patrones detectaron
{'boundary': 129, 'path': 123, 'draft': 8, 'version': 72}. Son coincidencias orientativas, con solapamientos y falsos
positivos deliberados; no son un conteo de errores matemáticos.
Se revisaron además 104 líneas de dependencias textuales en scripts,
incluyendo el directorio legacy. No se encontró ningún párrafo completo
idéntico de fronteras científicas de más de 130 caracteres dentro de una unidad.
No se eliminaron fronteras por una supuesta equivalencia semántica automática.

| Superficie | Decisión y justificación |
|---|---|
| III, títulos v24 y referencia v31 | Títulos atemporales y referencia al dominio de testigos. Un marcador v24 se conserva en comentario porque el antiguo auditor lo exige; su advertencia completa permanece inmediatamente debajo. |
| IV, sección v4.5 | Se nombra el contenido: falsación, admisibilidad y baseline. El subíndice matemático Score_v4.5 y los nombres exactos de comandos se conservan: forman parte de fórmulas y reproducibilidad. |
| VI, “hardening pass” | Se describe el estudio de controles y el contraste entre familias/jueces. No se cambian datos, soportes internos, jueces o límites; near_identity_v3, versiones de juez y nombres de familias son identificadores necesarios, no títulos de borrador. |
| IX, anexo v30 y dos expresiones de andamiaje | Referencia por contenido al anexo histórico (intacto), especificaciones de protocolo y código no evidencial. El resto de BPF-0..6 se conserva como gramática de etapas con obligaciones diferentes. No se convierte implementación provisional en evidencia. |
| X, portada y resumen | Se eliminan tres carteles de desarrollo; fecha 2026 y resumen de artículo de protocolo. Se conservan cegamiento, cobertura, falsación, controles, ausencia de campaña y todos los límites comparativos. |
| X, rutas | 24 apariciones en exposición se sustituyen por nombres de esquema y referencias a apéndices existentes. Los 24 identificadores se conservan completos en esos apéndices; ocho referencias antes exclusivas de la exposición pasan allí. |
| X, pin de publicación | Se identifica explícitamente como snapshot histórico. Se conserva el hash original y la frontera de artefactos locales/no públicos; publicar el manuscrito no equivale a publicar esos artefactos ni a aportar resultados. |
| X, Stage3/SRT/BPF y estados codificados | Se conservan como identificadores de protocolo/procedencia; se aclara que enumerarlos no certifica ejecución o aprobación. No se visitó el repositorio del runtime. |
| Monolito | Los capítulos derivados se regeneran; el texto nuevo reside en el ensamblador. La guía apunta a etiquetas existentes, distingue TeX/Lean/controles y enumera obligaciones abiertas. |
| README del monolito | Se sustituye el estado histórico de 339 páginas/v20 por el conteo de la compilación final, el alcance real de los avisos y la regla de regeneración del documento maestro. |
| Resto de fuentes, fórmulas y fronteras | Conservación. “Not final evidence” y “synthetic-preliminary” son límites evidenciales pertinentes, no carteles editoriales eliminables. |

## Contratos textuales revisados antes de editar

Los auditores de III exigen `Ontological Mass, infimum convention`,
`supremum notation ... superseded`, la frase sobre testigo independiente y
`v24 correction of the former Step 2`. Las tres primeras expresiones permanecen
en sus contextos; la última queda como marcador de procedencia en comentario,
con el mismo cuerpo de advertencia. No se modifica ningún auditor.
Los matchers de curación por título en registry-lib corresponden a otros
resultados (“Conditional Profinite Bound”), que no se renombraron.
Los auditores de promoción v28/v30 inspeccionan sus propias reglas y anexos
históricos, no los títulos retirados de III/X. El ensamblador, su contrato
de preámbulos y el comparador conservan sus criterios de rechazo.

El control adicional v24 no se puede ejecutar sobre la base ni sobre la edición:
falta `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE.json` (ENOENT en
ambas). Es una limitación previa del control fuera de la cadena vigente,
no una regresión ni un PASS. No se reconstruyó un fixture para aparentar cierre.
La cadena oficial de release contiene seis pasos v25, v26, v27, v28, v30, v31;
se ejecuta y reporta por separado.

## Límites

Esta fase no revisa la verdad de teoremas ni resuelve deudas científicas.
La invariancia de cuerpos formales se comprueba salvo una referencia editorial
enumerada dentro de un remark y dos títulos de advertencia, sin cambiar sus
matemáticas ni sus límites. No hay resultados empíricos nuevos ni revisión
matemática humana independiente. `external_support_certified=false`.
