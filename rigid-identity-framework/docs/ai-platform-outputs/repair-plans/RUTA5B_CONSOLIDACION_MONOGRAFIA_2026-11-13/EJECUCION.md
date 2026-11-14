# Ruta 5B — ejecución y entrega local

Base limpia: `7b4b223`. Trabajo y compilaciones aislados en E:. Se conserva el
prerregistro original con su SHA-256. La excepción bibliográfica HOT fue
confirmada expresamente por el usuario; ningún `release/` fue modificado.

## Resultado de los cinco bloques

1. **Ensamblaje.** Tres partes reales por dependencia. Las nueve divisiones
   internas de BaseCore se presentan como encabezados locales en el libro,
   conservando su estructura en el artículo independiente. Puente es capítulo 8,
   con contadores/anclas propios; por ejemplo, su obstrucción se numera 8.8.
   Paper X ocupa el capítulo 11 en este orden de lectura; los handles originales
   de los papers y namespaces de etiquetas se conservan. Se eliminaron las cinco
   entradas huérfanas Appendix. II/III usan referencias dinámicas a sus anexos.
2. **Apéndices y formato.** Las 31 tarjetas de X se conservaron en tres tablas
   (9/11/11 registros), con mapa de origen y títulos actuales. Cada apéndice
   empieza en página propia; columnas legibles y espaciado local explícito.
   X pasa de Letter a A4 con subject/keywords completos. Los 13 PDF son A4.
3. **Prosa.** Se retiraron los niveles Tier B/P visibles y los títulos de deuda
   o bloqueo. Los nombres de etapas describen sus requisitos. Las macros
   históricas siguen definidas pero sus avisos repetidos ya no se imprimen.
   La notación autorizada `S_comp` conserva fórmula, pesos y restricciones.
   Un alcance metodológico global sustituye las 12 notas duplicadas en el
   libro; cada artículo conserva una nota breve y un cierre interpretativo.
   Se preservaron negativas matemáticas necesarias y controles negativos.
4. **Concordancia.** III distingue su fundamento geométrico I–III de los
   contratos IV/VI/X y de la organización indexada VII/VIII/Puente. Se aclararon
   la realización nativa bajo gramática declarada y las obligaciones de nuevos
   candidatos/puentes completos. La asociación con experiencia permanece
   abierta como hipótesis puente independiente, sin afirmarla ni descartarla.
5. **Mapa externo.** Prefacio, BaseCore, I, III y V distinguen ingredientes
   clásicos y contribuciones conjuntas bajo hipótesis. IIT se acota a Tononi
   2004, GWT a Baars y HOT a Rosenthal: no se presume equivalencia, prioridad
   universal, superioridad empírica ni derrota de familias no especificadas.
   Se añadió `rosenthal1986` en una bibliografía activa compartida, citando el
   artículo primario Two Concepts of Consciousness (1986), DOI
   10.1007/BF00355521, https://davidrosenthal.org/DR-TCC.pdf.

## Comparativa comprobada

| Superficie | 7b4b223 | Ruta 5B |
|---|---:|---:|
| Páginas del monolito | 438 | 410 |
| Páginas del índice | 21 | 8 |
| Partes globales | interferencia de divisiones internas | 3 |
| Tarjetas/apéndices de X | 31 microsecciones | 31 registros en 3 apéndices |
| Entradas Appendix huérfanas | 5 | 0 |
| Menciones Tier B/P en PDF | 164 | 0 |
| Cláusulas negativas interpretativas, patrón fijo | 104 | 53 |
| Palabra governance en PDF | 68 | 11 |
| FCR/macros | 906/383 | 906/383 |

Los conteos son léxicos y reproducibles, no una certificación semántica. Las
menciones residuales de governance pertenecen a términos formales o contratos;
no se alteraron sus identificadores. Las negativas residuales incluyen
restricciones formales y controles cuya eliminación cambiaría el contenido.

## Conservación y equivalencias delimitadas

902/906 bloques formales permanecen literalmente iguales. Hay cuatro cambios
editoriales explícitos: el remark de variación paramétrica de BaseCore; una
referencia de III a Appendix C sustituida por su etiqueta; la denominación de
calibración B4 en IX; y un remark interpretativo de Iota en Puente, expresado
como obligación abierta. Se conservaron entornos, títulos y etiquetas.
Ninguna hipótesis, constante, definición matemática o argumento fue cambiado.
Las 404 pruebas se conservan, salvo dos equivalencias referenciales:
Appendices C–E en III y el nombre de la etapa provisional en IX. Los detalles
antes/después están en VERIFICACION.json.

Todos los IDs y metadatos curados y las 383 definiciones de macros se conservaron.
No se eliminó ninguna etiqueta previa; se añadieron siete etiquetas de anexos.
115 archivos protegidos, incluidos ambos release, legado y 32 Lean, conservaron
sus hashes. Lean no se volvió a ejecutar porque sus fuentes no cambiaron.

## Ejecución y evidencia

La secuencia completa y salidas crudas están en VERIFICACION.json y en los logs
de E:/QICN-PRESERVACION/2026-11-13-ruta5b/logs. Incluye raíz3, release6,
corpus/macros, extractor, nonclaims, prosa, semántica y matemáticas32.
Se compiló cada artículo con pdflatex/biber según su bibliografía y el monolito
con `npm run compile:monolithic`. Las recompilaciones posteriores se limitaron
a fuentes afectadas y al volumen. Se comprobó extracción PDF UTF-8, autoría,
título, subject, keywords, A4, notas únicas, referencias, numeración, tablas e
índice; revisión visual del índice y de los apéndices A/C de X.
La proyección de las 12 unidades coincide con sus fuentes para LF y CRLF.

No se modificaron los criterios de los verificadores. El monolito tiene cero
warnings LaTeX/package, Overfull h/v, Underfull v, referencias indefinidas y
máscaras de badness. El warning previo del primitivo binomial de IV se evita
sólo mediante tipografía equivalente en el ensamblaje, sin modificar la
fórmula fuente. El artículo IV conserva ese aviso previo, no bloqueante de los
gates solicitados; las advertencias del anfitrión MiKTeX/Windows se registran
separadamente y no se presentan como avisos científicos o del manuscrito.

## Incidencias corregidas y frontera de entrega

- Un primer borrado de prosa dejó una frase multilineal cortada en X; se
  corrigió el párrafo completo antes de aceptar la compilación.
- Un intento inicial de alias demasiado amplio se descartó y reconstruyó;
  las sustituciones finales preservan los axiomas B1–B10 y nombres matemáticos.
- Longtable falló al dividir las tablas nuevas: se reprodujo aisladamente,
  iniciando cada apéndice en página propia y conservando su espaciado de filas
  en el monolito. No se ocultaron avisos ni redujo el contenido de las tarjetas.
- Las columnas de las antiguas etiquetas cortas se ensancharon para admitir
  sus nombres descriptivos sin desbordamiento.
- Una lectura de PDF durante compilación se descartó; sólo los 13 PDF finales
  cerrados y sus hashes forman la evidencia aceptada.
- Las pruebas de firma reescriben claves/fixtures en la copia aislada. Se
  excluyen ambas mutaciones aleatorias de la entrega; no se publican claves.

Los resultados son verificaciones internas y una edición local. La revisión
matemática humana, la evaluación de novedad exhaustiva y la evidencia empírica
independiente siguen pendientes. No se ejecutó push. La publicación requiere
que el usuario revise el PDF y confirme posteriormente.
`external_support_certified=false`.

Cachés de Python: dos directorios (once pyc) archivados de forma recuperable fuera
del workspace; cero __pycache__ en la copia verificada y ninguno en la entrega.

Contenido local congelado en `2a02857a25d99a960b89d0ebfb687adabafb1627`. Lectura remota confirmó main en
`7b4b223`; no se ejecutó push. El segundo commit conserva la evidencia de fase.
