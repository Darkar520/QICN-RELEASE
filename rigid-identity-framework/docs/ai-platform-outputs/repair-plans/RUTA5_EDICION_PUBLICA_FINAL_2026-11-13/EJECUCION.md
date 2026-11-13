# Ruta 5 · edición pública final: ejecución y recepción

Base: `2d4fbcc0bf436a181cd9371d1ec3408c4f9999c5`. Fecha: 2026-11-13.
Se auditaron las 17 fuentes recibidas, preservadas antes de intervenir junto
con el prerregistro original. Trabajo y temporales en E:, con entrega selectiva
a la copia ordenada del Escritorio una vez terminada la revisión pre-push.

## Discrepancias y correcciones

La [adenda forense](ADENDA_AUDITORIA_CODEX.md) describe los hallazgos del
revisor aislado y su remediación: fórmula y macro restauradas, separación del
par testigo restituida, eliminación de atribuciones bibliográficas sin fuente,
garantías de reducción sin exageración de independencia, código ejecutable
para reproducir resultados y ámbitos normativos de B4–B6 conservados.
También se corrigieron el subtítulo duplicado de IX y una fila de VI con un
separador sobrante. La compilación descubrió un `item` fuera de una lista en
Puente: se restauró el párrafo. El escaneo de los PDF detectó un identificador
AUDIT_MASTER escapado en IX: se sustituyó por “audit coverage”. Se conservaron
los fallos y comandos previos; los verificadores no se modificaron.

La [trazabilidad exacta](TRAZABILIDAD_EDITORIAL.json) conserva los 482 bloques
antes/después, rutas e identificadores retirados de los manuscritos y sus
correspondencias públicas. Los nombres de niveles describen dependencias;
ninguno implica ejecución de una campaña. Los controles conservan su ámbito
interno, parcialmente cegado y de reproducción en el mismo equipo.

## Preservación y alcance

Se mantienen los 906 IDs y 383 macros del registro; 118 filas actualizan
localización o extracto editorial sin sustituir su curación, dependencias o
historia. Las secuencias de etiquetas/ref/eqref se conservan en 23 fuentes.
Todas las expresiones matemáticas previas permanecen en orden; se registran
aparte siete menciones nuevas de símbolos ya existentes en prosa. No se
afirma igualdad textual absoluta de cuerpos que recibieron correcciones de
gramática o procedencia. La fórmula Score_{v4.5} conserva su identificador
histórico: eliminar números a costa de alterar matemática sería una regresión.

Los 32 archivos Lean y los 82 archivos congelados/legados coinciden byte a
byte con el estado recibido. Se dejó Lean intacto para Ruta 6; no se ejecutó
un nuevo kernel ni se atribuyó mecanización nueva a esta edición. El cambio
de preámbulo de X documenta autor e información PDF, con macro sectionstatus
conservada sin usos; sólo se actualiza su hash fuente en el contrato auditado.

Las notas de autoría declaran la historia suministrada por el autor y su
responsabilidad intelectual. Cada documento independiente tiene una nota
después de la bibliografía. El ensamblador exige una por fuente, las retira
de los capítulos y añade una sola al final del volumen; la entrada del índice
no es una segunda nota sustantiva.

## Los 13 PDF

Autor PDF comprobado exactamente: Johnny Andrey Pérez Ramírez. Los títulos
completos, pdfinfo, SHA-256 y textos UTF-8 están en el recibo y archivo crudo.
Todos tienen una nota al cierre, cero hallazgos de rutas locales o archivos
internos, marcas de borrador, identificadores de iteración y muletillas
explícitas del escaneo; cero caracteres corruptos detectados. Una búsqueda
finita no certifica ausencia de todo posible defecto estilístico o semántico.

| PDF | Páginas | Nota al cierre | Escaneo / log |
|---|---:|---:|---|
| `basecore/BASECORE.pdf` | 55 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper1/main.pdf` | 32 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper10_external_adjudication/main.pdf` | 35 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper2/main.pdf` | 20 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper3/main.pdf` | 19 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper4/main.pdf` | 21 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper5_operational_consciousness/main.pdf` | 46 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper6_predictions_falsation/main.pdf` | 29 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper7_operational_life_subjecthood/main.pdf` | 37 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper8_first_person_subjectivity/main.pdf` | 57 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper9_phenomenal_bridge_organization/main.pdf` | 61 | 1 | 0 hallazgos / 0 errores o Overfull |
| `paper_bridge_operational_subjecthood/main.pdf` | 27 | 1 | 0 hallazgos / 0 errores o Overfull |
| `monolithic/QICN_MONOLITHIC.pdf` | 438 | 1 | 0 hallazgos / 0 errores o Overfull |

Los 13 PDF se compilaron con pdflatex y biber donde corresponde, seguido de
dos pases finales de pdflatex. X no usa biblatex. VI, IX y Puente tuvieron
reconstrucciones selectivas después de correcciones, junto con el monolito.
No se anuncia cero advertencias totales: los Underfull y ajustes normales
de colocación permanecen documentados en los logs.

## Verificación y fronteras científicas

Raíz 3/3, release 6/6, suites matemáticas 32/32, corpus y macros sin bloqueos,
prosa sin errores, nonclaims sin infracciones y capítulos 12/12 LF/CRLF.
El primer comparador encontró un capítulo VI anterior a la última edición:
se regeneró desde fuentes, sin modificar su criterio, y volvió a 12/12.
Las salidas literales de los tres verificadores y de los seis pasos release
se preservan en VERIFICACION.json y RECIBOS_CRUDOS.zip.

Veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`;
v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`.
**external_support_certified=false**. No se accedió al runtime.

Siguen abiertos el acoplamiento dinámico de los auxiliares energéticos/fase,
las brechas de estimadores y calibración física de III, los emuladores
irrestrictos, la clase BPF completa, revisión humana e investigación empírica.
El ensamblado y la auditoría automatizada no resuelven esas obligaciones.

## Revisión y publicación

La revisión aislada inicial y la segunda pasada de fuentes exigieron y
comprobaron reparaciones. La aprobación final pre-push debe cotejar estos
artefactos y recibos con la edición a publicar. No se realizará push antes
de ese dictamen. Ruta 6 queda como programa separado posterior, con 419
entradas theorem/proposition/lemma/corollary por clasificar y mecanizar sin
redefiniciones silenciosas; no se presentan como 419 pruebas Lean actuales.


## Reparaciones detectadas en revisión final

El helper de reconciliación de macros usaba un campo inexistente definition_tex. Se corrigió para comparar definition y se restauraron los dos cuerpos originales de X; las 383 definiciones y su curación ahora coinciden, variando sólo localizaciones. Se reconstruyeron X y el monolito.

El comparador dejó un espécimen EXPECTED_07 de una comparación fallida dentro del árbol documental. El extractor lo leyó como fuente y detectó933 entradas; el control de cardinalidad detuvo la reconciliación. Se archivó ese diagnóstico fuera del árbol de descubrimiento y se repitió extracción:906 entradas/383 macros, sin entradas falsas o pérdida de IDs. No se modificó el extractor.

Se corrigió el lector de pdfinfo: campos vacíos por líneas, UTF-8 estricto y fechas ISO, preservando bytes. El problema era del recibo, sin corrupción de los PDF. Los 13 autores se comparan por igualdad completa y la nota debe estar después de referencias. El escaneo de textos UTF-8 no detecta caracteres corruptos.

Conteos explícitos:482 bloques y1.658 fragmentos, con ocurrencias antes/después en fuentes y capítulos; cero fragmentos de prosa sin propagar. Las exclusiones de preámbulo, nota reubicada y sintaxis breve están individualizadas. El checkpoint final cubre 23 fuentes y se renovó tras las reparaciones, sin atribuirle retrospectivamente el estado anterior.


Dictamen final recibido: APROBADO_PARA_COMMIT_Y_PUSH — AUDITORÍA AUTOMATIZADA AISLADA. La constancia identifica el recibo y las huellas revisadas. Autoriza esta edición y constancias posteriores sin cambios de fuentes, registro o PDF. Revisión humana y evidencia externa siguen pendientes.
