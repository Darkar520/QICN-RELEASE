# QICN Monolithic Typography Fix Plan — 2026-06-22

Agente: Kiro (ejecutor tipografico, sub-agente). Idioma: espanol.
Alcance UNICO: resolver o deferir con causa raiz los warnings tipograficos que
hacen FALLAR el gate `npm run audit:monolithic-build-quality` (v20). Ningun otro
objetivo. Prohibido alterar texto matematico, claims, enunciados, definiciones,
numeracion o semantica.

## 0. Como funciona el gate (no recompila)

`scripts/audit-monolithic-build-quality.js` LEE `monolithic/QICN_MONOLITHIC.log`
(no compila) y cuenta como FALLOS la suma de:

- `latex_warnings`  : lineas que casan `(?:LaTeX|Package|Class).*Warning:`
- `overfull_hbox`   : lineas `Overfull \hbox`
- `overfull_vbox`, `underfull_vbox`, `undefined_references`
- `hyperref_pdfstring` : `Package hyperref Warning: ... PDF string`
- `question_mark_tokens` : `??`
- `badness_masking` : PROHIBIDO enmascarar con `\hbadness=10000`,
  `\vbadness=10000`, `\hfuzz>=130pt` (o >=10pt de 2+ digitos), `\tolerance=4000`.

Por tanto NO se puede "pasar" el gate enmascarando badness; hay que resolver la
causa o deferir. El `failCount` real = latex_warnings + overfull_hbox + resto.

## 1. Inventario PRE (medido)

Comando: `npm run audit:monolithic-build-quality` => FAIL (EXIT 1).
- pages_detected: 335
- latex_warnings: 26
- overfull_hbox: 7
- overfull_vbox / underfull_vbox / undefined_references / question_mark / badness_masking: 0
- hyperref_pdfstring_warnings: 7  (subconjunto de los 26 latex_warnings)
- failCount total = 26 + 7 = 33

Monolitico PRE: SHA256 `967CC9152674D8C3E3AA603FFBFD5153CE702CAB94A65C81754E99DD520A3967`,
335 paginas, 2840468 bytes.

Gates canonicos PRE: `npm run verify` = EXIT 0; `verify:corpus-registry` = EXIT 0;
`verify:macro-registry` = EXIT 0.

Toolchain: MiKTeX-pdfTeX 4.18 / biber 2.21.

### Desglose de los 26 latex_warnings

| # | Tipo | Conteo | Origen | Capa de fix |
|---|------|--------|--------|-------------|
| A | `Package cmap Warning: fontenc already loaded` | 1 | `monolithic/preamble/packages.tex` (orden de carga) | WRAPPER (preambulo) |
| B | `Package hyperref Warning: Difference (2) between bookmark levels` | 13 | arbol de bookmarks del ensamblado `book` (chapter/section) | WRAPPER (preambulo) |
| C | `Package hyperref Warning: Token not allowed in a PDF string` | 7 | titulos con math crudo en fuentes por-paper | POR-PAPER (canonico) |
| D | `LaTeX Warning: 'h' float specifier changed to 'ht'` | 5 | floats `[h]` en fuentes por-paper | POR-PAPER (canonico) |

### Desglose de los 7 overfull hbox (lineas relativas a cada section file)

| # | Ancho | Linea(s) | Naturaleza | Decision preliminar |
|---|-------|----------|-----------|---------------------|
| O1 | 14.69pt | 542--553 | parrafo de texto | evaluar tras recompilar |
| O2 | 21.26pt | 1190 | palabra "Phenomenological" (celda angosta) | evaluar |
| O3 | 17.07pt | 363 (detected) | ecuacion display matematica | DEFERIR (no tocar math) |
| O4 | 22.27pt | 915 | math `$[][]$` | DEFERIR (no tocar math) |
| O5 | 0.59pt | 1048 | math (negligible) | DEFERIR (no tocar math) |
| O6 | 2.03pt | 421 | math `$...?|` | DEFERIR (no tocar math) |
| O7 | 3.23pt | 451 | `\codepath{OntologicalSingularityCore...}` (ttfamily) | evaluar |

## 2. Origen exacto (capa correcta)

El ensamblado (`build-monolithic-volume.js`) genera `monolithic/build/sections/NN-*.tex`
desde fuentes canonicas por-paper / basecore. `preamble/packages.tex` y
`preamble/setup.tex` SOLO se reescriben si no existen (preambulo congelado,
mantenido a mano). Por tanto:

- Warnings A y B => fix en `monolithic/preamble/packages.tex` (WRAPPER). No tocan
  contenido ni numeracion visible; solo orden de carga de paquetes y generacion
  de bookmarks (metadato PDF).
- Warnings C y D => fix en la fuente canonica por-paper; el rebuild regenera la
  section. Editar el section generado seria descartado en el proximo build.

### C — titulos con math (7 pdfstring warnings)

Mapeo (cada `$` => 1 "math shift"; `\Cop` expande con `_` => 1 "subscript"):
- `paper1/main.tex` `\subsection{The $\aleph$--Operator as Condition of Existence}` (2)
- `paper1/main.tex` `\subsubsection{Existence and Uniqueness of $\aleph$}` (2)
- `paper2/main.tex` `\subsection{$\Phi$-Regularity Hypothesis}` (2)
- `paper_bridge_operational_subjecthood/main.tex` `\section{$\Cop$ Component Implication Matrix}` (3: shift+subscript+shift)
- `paper5_operational_consciousness/main.tex` ya usa `\texorpdfstring` (no warning).

Los `\paragraph{...$...$...}` (nivel 4) NO generan bookmarks (no warnings) y NO se
tocan. Fix: envolver SOLO los titulos bookmarkeados con
`\texorpdfstring{<latex visible>}{<texto plano>}`. El primer argumento se usa en
el render normal => texto visible IDENTICO; solo cambia el bookmark PDF.

### D — floats `[h]` (5 float warnings, paginas 275-303)

Paginas 275-303 = section 11 (paper10) y section 12 (bridge). Fix mecanico
`[h]` -> `[ht]`. LaTeX YA cambia `h`->`ht` para los que avisan; hacerlo explicito
es no-op en el render (h se intenta primero). Cosmetico.

## 3. Plan de fixes (capa correcta, minimo invasivo)

WRAPPER (`monolithic/preamble/packages.tex`):
1. Reordenar: cargar `\usepackage{cmap}` ANTES de `\usepackage[T1]{fontenc}`
   (fix documentado del warning A).
2. Anadir `\usepackage{bookmark}` despues de `hyperref`. El paquete `bookmark`
   reescribe la generacion de bookmarks e inserta niveles fantasma
   automaticamente, eliminando los "Difference between bookmark levels" SIN tocar
   numeracion visible ni estructura de headings (solo metadato del outline PDF).

POR-PAPER (canonico):
3. `\texorpdfstring` en los 4 titulos-math (paper1 x2, paper2 x1, bridge x1).
4. `[h]` -> `[ht]` en floats de `paper10_external_adjudication/main.tex` y
   `paper_bridge_operational_subjecthood/main.tex` (paginas 275-303).

OVERFULL: evaluar tras recompilar. Los de naturaleza matematica (O3-O6) se
DEFIEREN por regla (no reescribir math display). O1/O2/O7 se evaluan caso a caso;
si el fix arriesga reflow semantico o tocar math/codigo canonico, se DEFIEREN.

## 4. Verificacion
Tras cada bloque: `compile:monolithic` (regenera sections + compila in situ) y
re-correr el gate v20. Al cierre: gate v20 + `verify` + `verify:corpus-registry`
+ `verify:macro-registry`. Registrar SHA256 + paginas POST. No commitear build
artifacts. No push.

## 5. Resultados (cierre)

### Conteos gate v20: PRE -> POST
| Metrica | PRE | POST |
|---|---|---|
| result | FAIL | FAIL |
| latex_warnings | 26 | 0 |
| hyperref_pdfstring_warnings | 7 | 0 |
| overfull_hbox | 7 | 7 |
| pages_detected | 335 | 339 |
| failCount total | 33 | 7 |

Resueltos: 26 de 33 (todos los "warnings": cmap 1 + bookmark 13 + pdfstring 7 +
float 5). Deferidos: 7 overfull hbox. EXIT gate v20: 1 (FAIL) PRE y POST.

### Por que el gate NO puede llegar a EXIT 0 dentro del alcance
De los 7 overfull residuales, 3 son ECUACIONES/MATH DISPLAY (O3 implicacion
`\Subop=1 => ...`, O4 `$[][]$`, O5 math en 8pt). La regla del proyecto prohibe
reescribir math display para forzar el ajuste de caja. Como esos 3 son
irreducibles sin tocar matematica, el gate NO PUEDE pasar a PASS sin violar la
regla anti-inflacion/anti-semantica. Por tanto el maximo alcanzable es resolver
los 26 warnings y deferir los overfull. Esto coincide con la deuda de layout ya
documentada en el ledger ("layout debt 7 overfull").

### Fixes aplicados (por capa)
WRAPPER `monolithic/preamble/packages.tex`:
- `cmap` movido ANTES de `fontenc` => elimina el warning A (cmap fontenc already
  loaded).
- `\usepackage{bookmark}` tras hyperref => elimina los 13 warnings B
  ("Difference between bookmark levels"). El paquete inserta niveles de bookmark
  fantasma; cambia SOLO el outline PDF (metadato), no numeracion ni headings.

POR-PAPER (canonico):
- `paper1/main.tex`: 2 titulos con `\texorpdfstring` (`$\aleph$`).
- `paper2/main.tex`: 1 titulo con `\texorpdfstring` (`$\Phi$`).
- `paper_bridge_operational_subjecthood/main.tex`: 1 titulo `\texorpdfstring`
  (`$\Cop$`) + 12 floats `[h]`->`[ht]`.
- `paper10_external_adjudication/main.tex`: 5 floats `[h]`->`[ht]`.
- `paper5_*`: ya tenia `\texorpdfstring`, sin cambios.

Verificacion render-neutral de papers editados (recompilados in situ):
| Paper | Paginas PRE->POST | undefined refs | bytes |
|---|---|---|---|
| paper1 | 26 -> 26 | 0 | 465108 -> 465155 (+47, cadena de bookmark plana) |
| paper2 | 17 -> 17 | 0 | 382103 -> 382103 (identico) |
| paper10 | 33 -> 33 | 0 | 455843 -> 455843 (identico) |
| paper_bridge | 25 -> 25 | 0 | 426143 -> 426143 (identico) |

Misma paginacion en los 4 => contenido visible sin cambios; solo metadato de
bookmark. Cero referencias indefinidas.

### Deferrals (7 overfull hbox) con causa raiz
| # | Pag | Capitulo | Ancho | Naturaleza | Causa raiz / por que se defiere |
|---|-----|----------|-------|-----------|---------------------------------|
| O1 | 114 | Paper4 (sec 05) | 14.69pt | tabla `tabular lcccc` "Variability Structure" | tabla de datos demasiado ancha en geometria a4/1in del monolitico; estrechar columnas/fuente o `\resizebox` arriesga el PDF standalone de Paper4 o exige cambiar el transform de ensamblado (blast radius amplio). Fuera de "edit tipografico minimo". |
| O2 | 142 | Paper5 (sec 06) | 21.26pt | palabra "Phenomenological" en celda 8pt | overflow de celda de tabla en geometria monolitica; mismo riesgo de capa que O1. |
| O3 | 172 | Paper7 (sec 08) | 17.07pt | ECUACION DISPLAY (`\Subop=1 \Longrightarrow ...`) | regla: prohibido reescribir math display. |
| O4 | 185 | Paper7 (sec 08) | 22.27pt | math `$[][]$` | regla: prohibido reescribir math. |
| O5 | ~248 | Paper8/9 | 0.59pt | math en 8pt (negligible) | regla: prohibido reescribir math; 0.59pt es ruido tipografico. |
| O6 | 302 | Bridge (sec 12) | 2.03pt | math en celda `tabularx` | regla: math + celda de tabla. |
| O7 | 302 | Bridge (sec 12) | 3.23pt | `\codepath{OntologicalSingularityCore.selfModelSigma}` (mathtt en celda `tabularx`) | token de codigo largo sin punto de corte dentro de celda; en modo math (`\mathtt`) no rompe; fix exige tocar la macro/transform (blast radius) o el contenido de la celda. |

Recomendacion para fase futura dedicada (fuera de este alcance): tratar O1, O2,
O6, O7 como deuda de layout de TABLAS del ensamblado monolitico (posible fix en
`build-monolithic-volume.js` con `\resizebox`/anchos de columna especificos por
tabla, validado por auditoria externa). O3, O4, O5 permanecen como deuda de
layout de math display, no resolubles sin reescritura de ecuaciones.

### Gates canonicos POST (sin regresion)
- `npm run verify` = EXIT 0 (verify:v31; `external_support_certified=false`,
  `BLOCKED_FOUNDATION_FIRST_GATES` preservados).
- `npm run verify:corpus-registry` = EXIT 0.
- `npm run verify:macro-registry` = EXIT 0.

### Monolitico POST
SHA256 `49E978A4680283844718EE20A0987BC0113A52FAB07BA71EFA0089F2E2CE7A0F`,
339 paginas, 2860801 bytes.

### Bloqueos cientificos
Sin tocar `registry/`, ni gates v22..v35, ni `package.json`. Nada promovido a
NEW_CLAIM ni a C_op. `external_support_certified=false` y
`FULL_COP_MEMBERSHIP: NOT_YET` intactos.
