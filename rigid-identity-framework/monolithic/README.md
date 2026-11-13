# Monolithic Volume

Vista unificada de BaseCore, Papers I–X y Puente, ensamblada desde las fuentes
individuales. Edición editorial Ruta 4, compilada el **13 de noviembre de 2026**:
**440 páginas**, con la guía de lectura en la página PDF **3** (iii).
BaseCore comienza en PDF 25 (impresa 1); hay 24 páginas preliminares.

## Archivos y autoridad

- `QICN_MONOLITHIC.tex`: documento maestro **generado**. No editarlo a mano:
  `scripts/build-monolithic-volume.js` lo sobrescribe en cada ensamblado.
- `QICN_MONOLITHIC.pdf`: volumen compilado de lectura. Su SHA-256 y las páginas
  verificadas constan en el [recibo de Ruta 4](../docs/ai-platform-outputs/repair-plans/RUTA4_HIGIENE_EDITORIAL_2026-11-12/VERIFICACION.json).
- `build/sections/`: doce capítulos TeX derivados. Las correcciones de contenido
  pertenecen a BaseCore o a la fuente del paper; las de ensamblado, al script.
- `build/monolithic_references.bib`: bibliografía conjunta generada.
- `preamble/packages.tex`, `preamble/setup.tex`: personalizaciones auditadas.
  `preamble/source-contract.json` verifica los preámbulos fuente y las
  personalizaciones; no debe actualizarse para ocultar una deriva.
- `compile.ps1`: secuencia de compilación del documento ya ensamblado.

## Reconstrucción

Ejecutar desde `rigid-identity-framework/`:

```powershell
npm run build:monolithic
npm run compile:monolithic
```

El primer comando regenera el maestro, capítulos y entradas de composición;
el segundo ensambla y ejecuta `pdflatex`, `biber` y dos pases finales de
`pdflatex`. Para cambiar el prefacio o la guía de lectura se modifica
`EDITORIAL_PREFACE` en el ensamblador. Sus referencias usan los espacios de
etiquetas propios de cada unidad y se resuelven al compilar.

## Verificación de esta edición

La comparación fuente→capítulo dio **12/12** en LF y CRLF. El monolito y las
cinco unidades modificadas compilaron con **0 Overfull horizontales/verticales**,
0 errores fatales, 0 citas/referencias indefinidas y 0 etiquetas duplicadas.
En el volumen permanecen 181 avisos Underfull hbox y cuatro ajustes automáticos
de posición de figuras/tablas; no se ocultan ni se presentan como cero avisos
totales. No se atribuye una nueva aprobación al antiguo gate tipográfico v20.

La [guía para revisión humana](../docs/ai-platform-outputs/repair-plans/RUTA4_HIGIENE_EDITORIAL_2026-11-12/GUIA_REVISOR.md)
identifica 24 resultados con fuente, etiqueta, numeración y página PDF real.
El [informe](../docs/ai-platform-outputs/repair-plans/RUTA4_HIGIENE_EDITORIAL_2026-11-12/EJECUCION.md)
delimita la conservación matemática, las comprobaciones y las obligaciones.

El ensamblado conserva las fuentes individuales y su propiedad formal. Las
huellas de los 32 módulos Lean permanecen intactas; los núcleos mecanizados se
distinguen de las pruebas que siguen exclusivamente en TeX. Esta edición no
aporta una campaña externa ni revisión matemática humana independiente.
**`external_support_certified=false`**.
