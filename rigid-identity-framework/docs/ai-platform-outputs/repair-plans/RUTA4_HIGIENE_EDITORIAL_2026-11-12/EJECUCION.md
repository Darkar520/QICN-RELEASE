# Ruta 4 · higiene editorial y preparación de revisión humana

Inicio: 2026-11-12. Cierre editorial: 2026-11-13. Base local limpia:
`5535a5c0b7669ce4e7e86705334b935ec3e19618`. Carpeta activa:
`C:/Users/irisp/OneDrive/Escritorio/qicn-framework-ordenado`.

## Alcance y resultado

Esta fase prepara una edición legible para revisión externa. No demuestra
teoremas nuevos, no cambia el programa matemático y no certifica resultados
empíricos. La revisión matemática humana sigue pendiente.

Se inventariaron 38 TeX: 23 fuentes primarias y 15 superficies de composición,
preámbulo o documento derivado. Antes de editar se inspeccionaron las
dependencias textuales de los verificadores, incluidos los históricos.
El [inventario](INVENTARIO.md), su detalle JSON y el
[prerregistro congelado](PRERREGISTRO.md) registran las decisiones. No se
encontraron párrafos completos idénticos que justificaran eliminar fronteras
científicas en bloque; las restricciones locales se conservaron.

Se modificaron cinco unidades, con 22 operaciones editoriales enumeradas en
[CAMBIOS_EDITORIALES.json](CAMBIOS_EDITORIALES.json):

- Paper III: dos rótulos de iteración se sustituyen por títulos descriptivos;
  una referencia en prosa nombra el dominio del teorema en vez de su auditoría.
  Se conserva en comentario el marcador literal requerido por el auditor v24,
  seguido de la advertencia sustantiva íntegra.
- Paper IV: encabezado y frase descriptivos en lugar de la versión v4.5.
  No cambia el score versionado ni sus comandos o política de falsación.
- Paper VI: dos nombres de campaña describen los controles realizados.
  Se conserva que los resultados son internos y las limitaciones localizadas.
- Paper IX: descripciones de protocolo y procedencia en lugar de vocabulario
  de andamiaje. No cambian BPF-0/1, las obligaciones BPF-2–6 ni sus estados.
- Paper X: portada fechada 2026, sin tres carteles de borrador; abstract y
  presentación como artículo de protocolo. No se reporta una campaña ejecutada.
  Los 24 identificadores de esquemas retirados de listados principales quedan
  íntegros en apéndices existentes, con referencias descriptivas desde el texto.
  La referencia a una publicación antigua se identifica como snapshot histórico.

No se accedió al runtime ni se modificaron áreas congeladas o Lean. El único
cambio al contrato de preámbulos es el hash de Paper X por su fecha; no se
alteran paquetes, macros, personalizaciones ni criterios de control.

## Conservación y sincronización

La comparación con la instantánea anterior conserva el orden de etiquetas y
la topología de entornos en las 23 fuentes primarias. Se cotejaron 1.272 cuerpos
formales y 7.302 fragmentos matemáticos. Las únicas excepciones textuales
explicitadas son los dos encabezados y la referencia en prosa del remark de
III; enunciados, hipótesis, pruebas, fórmulas y constantes permanecen iguales.
Estas comprobaciones delimitadas no certifican coherencia semántica universal.

Se ejecutó la extracción del registro a archivos separados y se reconciliaron
las localizaciones con el registro curado: **906 IDs conservados, 0 añadidos o
retirados, 383 macros conservadas**. Cambian 64 filas de teoremas por posición,
dos títulos y la referencia editorial indicada; estados, dependencias,
procedencia histórica y metadatos curados no intervenidos se preservan.

Las 122 huellas protegidas coinciden: 76 archivos de raíz congelados, seis del
núcleo legado, 32 módulos Lean y ocho archivos de Ruta 3, incluidos sus cinco
recibos inmutables. No se recompiló Lean en esta fase: se conserva la evidencia
kernel de Ruta 3, Lean 4.31.0, 32 módulos y 250 teoremas públicos. No se atribuye
a esos núcleos la mecanización de todos los argumentos infinitos en TeX.

## Documentos compilados y guía de revisión

Se reconstruyeron III (19 páginas), IV (21), VI (27), IX (60), X (38) y el
monolito (**440 páginas**). La guía del lector ocupa una página, PDF **3**,
incorporada en el ensamblador y reproducida por éste. BaseCore empieza en PDF
25; los preliminares ocupan 24 páginas. El README del volumen se actualiza.

La [guía para el revisor](GUIA_REVISOR.md) identifica 24 resultados mediante
fuente, etiqueta, número y página impresa/PDF. Distingue prueba analítica,
núcleo Lean, control racional y obligaciones abiertas. Se comprobó el número
de cada resultado contra AUX y la página contra su encabezado en el PDF;
se inspeccionaron visualmente la guía y la portada de X. No se reclama una
inspección visual página por página.

El lema 8.41 conserva una diferencia de un paso entre el contador de página
del AUX y el encabezado impreso tras el salto tipográfico. El mapa usa su
página real: PDF 315, impresa 291. El destino del enlace ya estaba en PDF 313
en la edición anterior y está en PDF 315 en ésta, coherente con los dos
preliminares añadidos. No se cambió ninguna etiqueta para ocultar la diferencia.

## Verificación reproducida

Comprobaciones y salidas completas: [VERIFICACION.json](VERIFICACION.json) y
[RECIBOS_CRUDOS.zip](RECIBOS_CRUDOS.zip). Temporales, instantánea recuperable y
auxiliares se aislaron en `E:/QICN-PRESERVACION/2026-11-12-ruta4/`.

| Comprobación | Resultado |
|---|---|
| Verificadores de integridad, claims y release de raíz | 3/3, salida 0 |
| `npm run verify:release` | 6/6, salida 0; veredictos científicos debajo |
| `python scripts/verify-math-regressions.py` | 32/32 |
| Corpus, incluido `--json`, y macros | 906 entradas / 383 macros; 0 bloqueos y avisos |
| `python scripts/verify-prose-sync.py` | sin errores; una sección interpretativa por unidad |
| Comparador de capítulos y control adicional LF/CRLF | 12/12 en ambas representaciones |
| Compilación de cinco papers y monolito | 6/6; 0 fatales, citas/referencias indefinidas o etiquetas duplicadas |
| Desbordamientos horizontales y verticales | 0 en los seis PDF |
| Fuentes Lean y superficies protegidas | 32 y 122 huellas iguales, respectivamente |

Se ejecutaron `pdflatex`, `biber` cuando la unidad usa biblatex, y dos pases
finales de `pdflatex`; Paper X no tiene bibliografía biblatex y usa tres pases
de `pdflatex`. El monolito se construye con `npm run compile:monolithic`.
La extracción se ejecutó con `npm run extract:registry`, hacia archivos
separados para conservar la curación. Los comandos exactos, directorios,
duraciones y salidas están en el archivo comprimido.

No se presentan todos los avisos como resueltos: permanecen 181 Underfull hbox
y cuatro ajustes automáticos de posición de figuras/tablas en el monolito.
Son distintos de un Overfull. No se reclama una aprobación nueva del gate v20.

Como control histórico adicional, fuera de la cadena activa de seis gates,
`audit-v24-critical-gaps.js` no puede ejecutarse completo: falta el fixture
`docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE.json`. El mismo error
ENOENT se reproduce en la instantánea anterior y en la edición nueva. Se
conservan ambas salidas; no se inventa el fixture ni se modifica el auditor.
Esta indisponibilidad anterior no se contabiliza como PASS.

## Veredictos científicos crudos y trabajo pendiente

- v25/v26: `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`.
- v27, v28 y v30: `BLOCKED_MULTIPLE_GATES`.
- v31: `BLOCKED_FOUNDATION_FIRST_GATES`.
- **`external_support_certified=false`** en todos ellos.

La siguiente acción es revisión matemática humana de las pruebas infinitas,
de la gramática causal y de sus comparadores, siguiendo el mapa de resultados.
También quedan abiertos el acoplamiento dinámico de los auxiliares discretos
de energía/fase, la clase BPF completa, la calibración física y los experimentos
independientes. No son tareas cerradas por la compilación o por estos controles.
Las interpretaciones filosóficas y subjetivas siguen siendo interpretaciones,
separadas de los resultados formales y de la evidencia empírica.

## Entrega y publicación

La copia activa recibe únicamente fuentes, PDF, registro, ensamblador y
trazabilidad clasificados, cotejados byte a byte con la copia verificada.
Los informes reescritos por gates históricos y los auxiliares de compilación
permanecen en aislamiento. El archivo comprimido conserva sus salidas crudas.

En la carpeta activa se repitieron los tres verificadores de raíz, corpus
JSON, macros, prosa, comparación de capítulos y control de whitespace: todos
con salida 0. Se cotejaron los bytes de los archivos entregados y las 122
superficies protegidas. El comparador reescribe su informe histórico; se
preservó esa salida como recibo de esta fase y se restituyó el informe anterior
desde la instantánea, evitando incluir una regeneración lateral en el commit.

La opción B de la solicitud autoriza expresamente publicar ambas ramas si
pasan estas comprobaciones. Esa autorización específica permite la publicación
editorial sin afirmar que hubo revisión humana. La sincronización se hace
únicamente por avance rápido y push normal; el cierre remoto exige igualdad
de HEAD, main y ambas referencias remotas, además de árbol limpio.


Publicación de contenido comprobada el 2026-11-13: commit
`c90ef6b701ca7c009a42b59550d914f91d302f76`. HEAD, main, origin/main y
origin/codex/qicn-framework-ordenado coincidían; `git ls-remote` confirmó ambas
ramas y el árbol estaba limpio. Se conservaron las 122 huellas protegidas.
El recibo registra ese punto comprobado. Un commit posterior contiene sólo
esta constancia y su propagación documental; las referencias se cotejan otra
vez al terminar, sin modificar fuentes, PDF, registro, Lean o pruebas.
