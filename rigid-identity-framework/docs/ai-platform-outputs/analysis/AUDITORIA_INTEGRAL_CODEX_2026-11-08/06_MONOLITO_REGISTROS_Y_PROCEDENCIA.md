# Monolito, registros, bibliografía y procedencia

## Qué se contrastó

El inventario ampliado contiene 100 archivos PDF/TeX/Bib: 45 PDF, 45 TeX y 10 Bib. Uno de los Bib es la bibliografía de mathlib vendorizada bajo `.lake`, una dependencia ajena a la autoría del marco. Quedan **99 archivos del corpus y sus materiales documentales** en ese inventario, con roles distintos. El inventario inicial más estrecho se conserva sin sobrescribir; el ampliado añade el freeze raíz, los dos PDF fundacionales y materiales auxiliares. La capa Lean se registra separadamente.

No se confunde inventario con lectura manual: se leyeron las fuentes completas de BaseCore, Papers I–X, puente, fuente legacy, anexos y ambos PDF fundacionales; el contenido repetido del monolito se cotejó automáticamente con las mismas fuentes ya revisadas. Los 45 PDF se identificaron por hash, páginas y extracción de texto. Las variantes históricas del freeze se clasificaron y contrastaron como versiones; no se presenta esta fase como una nueva revisión línea a línea de toda demostración de cada espejo obsoleto. Las dependencias instaladas y la historia completa de prompts/reportes de otros agentes no son autoridad teórica y no se auditaron como si fueran papers nuevos.

## Monolito: sincronización TeX confirmada

`check-monolith.cjs` carga sólo las funciones puras del ensamblador, expande inputs y aplica sus transformaciones en memoria. No llama a `build()`, no limpia directorios y no recompila originales. Compara los doce capítulos completos con `monolithic/build/sections/`, normalizando únicamente saltos CRLF/LF.

**Resultado: 12/12 capítulos idénticos al ensamblado de las fuentes actuales.** Véase `MONOLITH_COMPARISON.json` con hashes por capítulo. Esto verifica fidelidad del ensamblaje, no verdad matemática: los errores de los papers también se trasladan fielmente al volumen.

Se revisaron master, paquetes y preámbulo. El ensamblador conserva texto, cambia numeración/labels y añade ajustes de tablas y cortes. Hay límites de mantenimiento: `packages.tex` y `setup.tex` sólo se generan si faltan; añadir nuevas macros a una fuente no garantiza que se propaguen a un preámbulo ya existente. El recurso bibliográfico del monolito es `rigid-identity-framework/release/references.bib`, distinto del recurso raíz usado por Papers I–VIII. No basta editar una copia al azar. Los números de teoremas escritos a mano, a diferencia de `\ref`, pueden quedar equivocados al renumerar capítulos. El fallback de fuente ausente permite reutilizar un capítulo generado: debe registrar explícitamente origen/hash y no tratarlo como fuente recuperada canónica. En este snapshot el puente tiene fuente y no necesitó fallback.

El PDF monolítico inspeccionado tiene **339 páginas**; el log preservado también informa 339. No se realizó una recompilación PDF completa ni comparación pixel a pixel en esta auditoría. La igualdad TeX de los doce capítulos está comprobada; la equivalencia binaria/visual de un nuevo PDF no se afirma.

## Freeze, PDF locales y notas de normalización

| Documento | Freeze raíz | PDF local |
|---|---:|---:|
| BaseCore | 40 páginas | 44 páginas |
| Paper I | 26 | 26 |
| Paper II | 17 | 17 |
| Paper III | 13 | 17 |
| Paper IV | 14 | 16 |
| Paper V | 25 | 28 |
| Paper VI | 19 | 22 |
| Paper VII | 28 | 28 |
| Paper VIII | 42 | 43 |
| Paper IX | 42 | 42 |
| Legacy | 64 | 64 |

Igual número de páginas tampoco implica igualdad de contenido: los hashes y textos locales de varios documentos difieren. Es legítimo conservar un freeze histórico; el defecto sería citar una corrección local como si estuviera ya en ese freeze. Cada afirmación necesita versión de fuente y versión de PDF.

Los catorce documentos de `basecore/core_meta/` se revisaron. Algunos anuncian sincronización a 40 páginas y diez secciones; el estado local tiene 44 páginas y once módulos (incluido puente discreto). Otra nota residual conserva 64 páginas, de la fase anterior. Son snapshots desactualizados si se usan para describir el estado local actual. La nota que anuncia “listo para release” no revisa los fallos matemáticos descritos en esta auditoría. Reparación posterior: metadatos fechados, hash de fuente/artefacto y estado `historical`/`superseded`, sin reescribir silenciosamente la historia.

La fuente legacy preservada tiene título de dinámica contractiva y 995 líneas; el PDF legacy de 64 páginas es una versión ampliada titulada Canonical Core of the Rigid Identity Framework. No se debe dar por probada la correspondencia exacta entre ambos sólo porque comparten carpeta. Recuperar la fuente exacta o registrar esa relación como pendiente. No modificar el archivo histórico para hacer desaparecer la discrepancia.

Los dos anexos ROEO del freeze son tablas de dos páginas con equivalencias, discriminador, controles y hashes. Registran 15 parejas, epsilon 0.08, exactitud limpia 0.30 frente a chance 0.25 y umbral 0.35. Eso no demuestra no observabilidad universal de sustrato: faltan incertidumbre, potencia, familia de clasificadores y acceso al registro primario de la campaña para inferencia nueva. Son exports derivados; sus checksums no convierten sus tablas en datos primarios ni validación externa.

## Registro formal y registro de claims

`registry/theorems.jsonl` contiene **755 entradas**. Se comprobó para cada una que su bloque TeX y rango de líneas coinciden con la fuente actual, sin diferencia tras normalización de espacios. Las 220 dependencias explícitas apuntan a IDs presentes. Esto es una buena propiedad de trazabilidad.

| Campo | Conteos observados |
|---|---|
| Curación principal | 734 `draft_extracted`, 21 `audit_overlaid` |
| Estado epistémico | 362 `conditional`, 244 `proved`, 138 `heuristic`, 8 `conjectural`, 2 `tautology`, 1 `open_burden` |
| Estado de prueba | 249 `present`, 36 `missing`, 13 `heuristic`, 1 `invalid`, 1 `sketch`, 7 `not_expected`, 448 `not_applicable` |

**El 97.2% sigue extraído en borrador.** `proof=proof_block_present_in_source` detecta presencia de un bloque, no corrección. No hay entradas con `curation_status=human_curated`; esto significa ausencia de esa acreditación en el registro, no prueba de que nunca haya existido lectura humana. Sólo 136 entradas tienen dependencias explícitas y 140 refs: el grafo no representa todas las dependencias conceptuales usadas en la prosa. No se afirma aquí que se haya completado una prueba automatizada de ausencia de circularidad de todas las inferencias.

**Desfase semántico concreto.** La entrada de `paper10:theorem:thm-null-forced` conserva el contraejemplo de “always tie” y a la vez el estado `corrected_forced_choice_variant`. La fuente y la definición de pérdida aún permiten empate gratis. El problema ya estaba detectado en auditorías anteriores: esta auditoría lo reproduce independientemente y confirma que la corrección no llegó a esa superficie. Cambiar una etiqueta de registro no corrige el teorema. Debe resolverse en una futura fase, sincronizando fuente, prueba y estado.

**Esquema y validación.** `registry/schema.json` no enumera `open_burden` ni `curated_open_burden`, que sí aparecen en una entrada y en los overrides de `registry-lib.js`. El validador usa comprobaciones propias y no basta su PASS para afirmar conformidad íntegra con ese JSON Schema. Alinear esquema, overrides y política de estados. En sentido inverso, se reconoce el avance de degradar las cargas de independencia de Paper IX a conjeturas y el no vaciado bridge a criterio: la fuente y la entrada actual sí coinciden ahí.

El registro raíz tiene 17 familias de claims y clasifica política de release, no las 755 entradas matemáticas individuales. Sus `formal_statement` significan que el texto enuncia la familia; no que esta auditoría la haya validado. El registro del runtime es una tercera superficie con otra función. Ninguno debe redefinir silenciosamente a los otros.

## Bibliografía

Se inventariaron las bibliografías, se resolvieron las rutas reales y se comprobaron todas las claves citadas mediante los comandos detectados en los masters: **no aparecen claves faltantes en esos enlaces**. Véase `BIBLIOGRAPHY_INSPECTION.json`. Eso no acredita exactitud de cada metadato ni pertinencia de cada cita.

Hallazgos:

- Papers I–VIII enlazan al `release/references.bib` de la **raíz**, no al del directorio interior. El monolito enlaza a la copia interior. Paper IX añade una bibliografía local con Papers VI–VIII. El puente usa otra copia local. Mantener una política de sincronización por claves y contenido, con diferencias justificadas.
- Varias autocitas dicen `arXiv preprint` sin identificador arXiv, DOI ni URL verificable. No se verificó depósito público de esos trabajos; una búsqueda sin resultado tampoco demostraría inexistencia. Registrar manuscrito local/versionado hasta disponer del identificador, y no equiparar preprint con revisión por pares.
- Banach 1922 está codificado como libro en algunas copias, pero es artículo de Fundamenta Mathematicae 3, 133–181: [registro editorial primario](https://www.impan.pl/pl/wydawnictwa/czasopisma-i-serie-wydawnicze/fundamenta-mathematicae/all/3/0/92453/sur-les-operations-dans-les-ensembles-abstraits-et-leur-application-aux-equations-integrales). Corregir tipo y DOI en una fase autorizada.
- La entrada `mittag1900` corresponde a un trabajo de 1884 sobre funciones monógenas, no justifica por su mera nota la condición de Mittag–Leffler para sistemas inversos. La [fuente original](https://archive.ymsc.tsinghua.edu.cn/pacm_download/117/4767-11511_2006_Article_BF02418410.pdf) permite verificar tema y fecha; para el teorema de límites hace falta una referencia que enuncie exactamente la condición usada.
- Los comparadores se apoyan repetidamente en IIT 2004 y Baars 1988, mientras la formalización de rival se reduce a familias locales mucho más estrechas. [IIT 4.0, artículo de sus autores](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1011465), contiene compromisos y estructura causal específicos; vencer un “broadcast model” o una fórmula llamada integración no equivale a vencer esa teoría. Congelar versión del rival, ecuaciones y observable común. La semilla HOT existe en outputs pero no está integrada en las bibliografías activas; eso es avance documental, no comparación ejecutada.
- Paper X y varios argumentos estadísticos de anexos tienen escasa bibliografía técnica incrustada. La fórmula gaussiana y el determinante pueden contrastarse con una [implementación primaria documentada de GLS](https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.GLS.loglike.html); la resta de signos y la equivalencia PW/GLS de esta auditoría se derivaron directamente y tienen comprobación independiente adjunta.

La verificación externa fue selectiva y dirigida a referencias relevantes para los hallazgos. No se afirma una certificación bibliométrica exhaustiva de toda edición, autor y página de cada libro del archivo. Las fuentes externas se usaron como comparación; no validan QICN.

## Frontera de esta auditoría

No se examinó de nuevo el runtime de QICN-SYSTEM, no se usó una API de Gemini, no se interrogó a un LLM para validar matemáticas, no se desplegó y no se alteró ningún paper, registro ni freeze. Los reportes de gate y la comprobación Lean se detallan en el informe principal con su resultado crudo, no como certificados de verdad científica.
