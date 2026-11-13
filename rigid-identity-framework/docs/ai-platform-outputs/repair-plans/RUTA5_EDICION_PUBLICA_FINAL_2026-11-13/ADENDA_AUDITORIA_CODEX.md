# Ruta 5: auditoría del estado recibido y controles complementarios

Base comprobada: `2d4fbcc0bf436a181cd9371d1ec3408c4f9999c5`. Se recibieron
17 TeX modificados y tres documentos de prerregistro sin confirmar. Se preservó
la totalidad de los archivos versionados y ese directorio antes de reparar,
en `E:/QICN-PRESERVACION/2026-11-13-ruta5/`. El Escritorio no se sobrescribe
durante la preparación. Baseline significa HEAD para las fuentes modificadas;
las huellas de conservación de Lean y superficies congeladas son de los bytes
de trabajo realmente recibidos. Se distingue esa representación de los blobs
Git normalizados LF. El inventario anterior de 60 archivos permanece íntegro.

## Auditoría aislada inicial

Revisor automatizado distinto del implementador, sólo lectura de las 17
fuentes y los documentos iniciales. Su dictamen inicial exige reparación y
verificación final antes de publicar; no constituye revisión humana externa.

| Hallazgo | Reparación en la copia aislada |
|---|---|
| VI: seis celdas en una fila de tabla de cinco columnas | Unificar la primera celda en “Partially blinded stress evaluation” |
| VI: cegamiento/semillas independientes no acreditados por la frase previa | Conservar evaluación interna más estricta, orden parcialmente cegado y reproducción en el mismo equipo con perfiles distintos |
| VI: “legacy” convertido en diagnóstico de falta de calibración | Sustituir por “earlier”, sin inventar causa |
| VI: “reduce” convertido en eliminación de dependencias | Restituir el alcance de reducción |
| VI: pérdida de separación del par testigo | Declarar por separado separación y calibración |
| VI: especificación en lugar de código reproducible | Exigir código ejecutable y scripts de análisis |
| III: procedencia atribuida a literatura sin fuente | Describir la convención matemática sin atribución bibliográfica |
| IV: renombrado de una fórmula protegida | Restaurar `Score_{v4.5}` como identificador histórico de la misma fórmula; no es cronología de campaña |
| X: eliminación de macro | Restaurar `sectionstatus` sin usos visibles; conservar la interfaz fuente |
| IX: subtítulo duplicado | Retirar la primera aparición, que interrumpía un argumento en tres partes |
| IX: obligaciones abiertas expresadas como ejecución actual | Restablecer formulación normativa y ámbitos de candidatos/auditoría en B5 |
| BaseCore: residuos Stage 2/3; IX: pasos de medida ambiguos | Denominar programas comparativos empíricos y pasos de medición, respectivamente |
| Notas de autoría anteriores a bibliografía | Colocar después de bibliografía, con procedencia declarada por el autor y responsabilidad intelectual explícita |
| Inventario sin congelados de raíz | Complementar con 114 huellas: 76 congelados de raíz, seis de legado y 32 Lean |

Se restauró también el dominio original de la proposición de IX sobre inclusión
en paquetes y su prueba: sustituir artefactos por registros y paquetes por
resúmenes no era una mera mejora gramatical. Se retiró una calificación nueva
de umbral sobre extensiones no convexas de BaseCore que no figuraba antes.

## Preservación comprobada antes de compilar

Las 23 fuentes primarias conservan todas las expresiones matemáticas anteriores
en el mismo orden y las secuencias de etiquetas, referencias y ecuaciones.
Hay siete menciones adicionales de símbolos existentes en prosa, no siete
fórmulas o resultados nuevos: norma de K y dominio U en el ledger de BaseCore,
tres alias Subfp en VIII, y PhiBridge/GateBridge en IX. Se identifican
expresamente en el recibo; no se anuncia igualdad textual total de los cuerpos.
Las excepciones editoriales se revisan junto con el diff y sus hashes.

Única deriva de preámbulo: Paper X, autor visible y metadatos PDF. Se conserva
la macro retirada y se actualiza sólo su hash fuente en el contrato existente,
empleando la misma normalización del ensamblador. Paquetes y personalizaciones
no cambian. Las 114 huellas protegidas coinciden tras las reparaciones.

## Ensamblado y pasos pendientes

El ensamblador extrae la nota de cada capítulo mediante los marcadores explícitos,
exigiendo exactamente una por fuente; coloca una sola al cierre del volumen.
Las fuentes independientes conservan una cada una después de la bibliografía.
La guía inicial mantiene las obligaciones científicas sin citar la ruta del
repositorio de software. No se modifican auditores para conseguir aprobaciones.

Pendiente: reconciliación curada del registro; compilación de 13 PDF y sus
escaneos completos; verificadores, comparación LF/CRLF, revisión aislada final,
informe definitivo, roadmap de Ruta 6 y publicación. No se anuncia cierre de
Ruta 5 mientras queden esos pasos. `external_support_certified=false`.


## Reparaciones detectadas en revisión final

El helper de reconciliación de macros usaba un campo inexistente definition_tex. Se corrigió para comparar definition y se restauraron los dos cuerpos originales de X; las 383 definiciones y su curación ahora coinciden, variando sólo localizaciones. Se reconstruyeron X y el monolito.

El comparador dejó un espécimen EXPECTED_07 de una comparación fallida dentro del árbol documental. El extractor lo leyó como fuente y detectó933 entradas; el control de cardinalidad detuvo la reconciliación. Se archivó ese diagnóstico fuera del árbol de descubrimiento y se repitió extracción:906 entradas/383 macros, sin entradas falsas o pérdida de IDs. No se modificó el extractor.

Se corrigió el lector de pdfinfo: campos vacíos por líneas, UTF-8 estricto y fechas ISO, preservando bytes. El problema era del recibo, sin corrupción de los PDF. Los 13 autores se comparan por igualdad completa y la nota debe estar después de referencias. El escaneo de textos UTF-8 no detecta caracteres corruptos.

Conteos explícitos:482 bloques y1.658 fragmentos, con ocurrencias antes/después en fuentes y capítulos; cero fragmentos de prosa sin propagar. Las exclusiones de preámbulo, nota reubicada y sintaxis breve están individualizadas. El checkpoint final cubre 23 fuentes y se renovó tras las reparaciones, sin atribuirle retrospectivamente el estado anterior.
