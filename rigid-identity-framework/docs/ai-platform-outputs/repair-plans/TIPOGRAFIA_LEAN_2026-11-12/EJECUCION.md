# Tipografía y núcleos Lean A–C · 2026-11-12

Base auditada indicada por el usuario: `f792707`. Se ejecuta Ruta 2 y se prepara la publicación autorizada en las dos ramas GitHub; no se inicia Ruta 3. El runtime no se leyó, compiló, enlazó ni modificó.

## Conservación y tipografía

Las quince fuentes TeX intervenidas coinciden con su base al normalizar exclusivamente las operaciones de presentación registradas: cortes de línea, tamaños de delimitadores, alineación, anchos y espaciado de columnas, partición de tablas y expansión equivalente de llamadas de código. La cuadrícula de IV conserva exactamente sus sesenta filas; solo se repite su cabecera en seis bloques paginables. Esta comparación no sustituye una prueba de coherencia semántica universal.

Se preservaron los 889 IDs y todos los campos del registro salvo 211 localizaciones de línea. Las 383 macros y los 26 módulos Lean anteriores permanecen intactos. Se verificaron los hashes de los 76 archivos congelados. No se añadieron IDs por los núcleos Lean.

| PDF | Overfull h: antes → después | Underfull h: antes → después |
|---|---:|---:|
| basecore | 6 → 0 | 0 → 0 |
| paper1 | 3 → 0 | 0 → 1 |
| paper10_external_adjudication | 57 → 0 | 0 → 13 |
| paper2 | 2 → 0 | 0 → 0 |
| paper3 | 1 → 0 | 8 → 8 |
| paper4 | 12 → 0 | 12 → 13 |
| paper5_operational_consciousness | 3 → 0 | 10 → 10 |
| paper6_predictions_falsation | 3 → 0 | 38 → 37 |
| paper7_operational_life_subjecthood | 1 → 0 | 29 → 29 |
| paper8_first_person_subjectivity | 13 → 0 | 90 → 103 |
| paper9_phenomenal_bridge_organization | 38 → 0 | 221 → 15 |
| paper_bridge_operational_subjecthood | 1 → 0 | 0 → 0 |
| monolithic | 1 → 0 | 334 → 183 |

Todos los desbordamientos verticales también quedaron en cero. El monolito final tiene 422 páginas. No hay errores fatales, citas o referencias indefinidas ni etiquetas duplicadas en los registros finales. Persisten avisos de espaciado `Underfull`: aumentan en I, IV, VIII y X por la recomposición de párrafos y las columnas que ahora permiten cortes; no se ocultaron con tolerancias de diagnóstico. Se revisaron visualmente muestras de las tablas de IV, VIII, IX y X. No se afirma una inspección visual manual de todas las páginas.

## Alcance mecanizado

- `QICNEpistemicAtomicity`: ocho teoremas sobre umbral de coste/deformación, testigo numérico de igualdad, involución XOR y biyección par/impar. La topología completa de Cantor y la geometría del cuadrado no se declaran mecanizadas por estos núcleos algebraicos.
- `QICNEpistemicWitness`: dieciséis teoremas sobre el funcional finito condicionado por su mayorante, la caja, márgenes racionales y raíces reales, escape del nulo, trayectorias apareadas por inducción, igualdad de respuestas, valoración nula, puertas finitas min/producto y fases fijas incompatibles.
- `QICNEpistemicInterface`: cinco teoremas sobre error calibrado, headroom, tamaño muestral y leyes de decisión pushforward iguales.

Se añadieron 29 teoremas; la comprobación se hizo con elaboración fresca y secuencial del kernel, no mediante objetos antiguos del proyecto ni el backend C de Lake. Las dependencias de Mathlib se reutilizaron desde la caché fijada y se comprobó cada revisión Git. Los objetos del proyecto fueron reconstruidos. Todos los teoremas públicos se auditaron con `#print axioms`. No hay `sorryAx` ni axiomas fuera de `propext`, `Classical.choice` y `Quot.sound`.

Compacidad en ℓ², conectividad de los cubos de Hilbert infinitos y su punto de corte, límites inversos continuos, las sumas infinitas del funcional y Hoeffding siguen en TeX. Tampoco se mecaniza calibración biológica, independencia experimental, evidencia externa ni pertenencia a la clase fuerte completa.

## Verificación y procedencia

Lean: 30 módulos compilados incluido el agregador; 29 módulos de contenido; 215 teoremas públicos auditados. Versión 4.31.0. Raíz 3/3; release 6/6; corpus 889 y macros 383 sin bloqueos ni avisos; matemáticas 30/30; prosa sin errores; capítulos 12/12 iguales. Comandos y salidas crudas: [recibo](VERIFICACION.json), [Lean](LEAN.json) y [salidas crudas](RECIBOS_CRUDOS.zip).

Incidencias conservadas fuera del árbol activo: la tabla larga de IV falló dos veces con `Infinite glue shrinkage`; se sustituyó por bloques que preservan las filas. El primer ensayo Lean señaló una división natural pendiente y una definición real que requería `noncomputable`; se corrigieron antes del cierre. Se interrumpió un ensayo duplicado por presión de memoria y una pasada previa al congelar la última edición Lean; no se contabilizan como verificaciones finales. Una invocación preliminar del lanzador global de Lean se detuvo al intentar otra versión; todas las comprobaciones válidas usaron el binario 4.31.0 explícito. MiKTeX conserva su aviso ambiental de Windows, presente en la base.

## Veredictos científicos crudos

- v25: `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; `external_support_certified=false`.
- v26: `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; `external_support_certified=false`.
- v27: `BLOCKED_MULTIPLE_GATES`; `external_support_certified=false`.
- v28: `BLOCKED_MULTIPLE_GATES`; `external_support_certified=false`.
- v30: `BLOCKED_MULTIPLE_GATES`; `external_support_certified=false`.
- v31: `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`.

El PASS del software no cambia esos veredictos. Los problemas de investigación reservados a Ruta 3, la identificación empírica y la revisión científica independiente no se anuncian resueltos. La autorización de publicación de esta fase procede de la instrucción explícita del usuario; no constituye apoyo científico externo.


Se corrigió además la portabilidad del ensamblador: normaliza CRLF antes de transformar la composición. El comparador devuelve fallo ante discrepancias. Controles: versión anterior 11/12 con salida 0; versión corregida 12/12 en copia activa, LF y CRLF; capítulo alterado en memoria 11/12 con salida 1. Es una comprobación técnica exploratoria, no un nuevo experimento científico prerregistrado.

Commits de contenido: typography `6007af18e55a8bef136366386808600566b5005e`; lean `95ed4f5840bf3e12bd810a6eba8d0881163ca462`; portable_assembly `902a623ac23e8e751fb364f8e1d10610edf9153a`; monolith_pdf `88d56863878ec515745c4d3de0629e63abdab901`.

La cadena heredada v25 invoca el adjudicador v26; RELEASE.json y VERIFICACION.json conservan explícitamente esa procedencia.
