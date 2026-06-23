# Monolithic Volume

Volumen unificado del corpus QICN ensamblado a partir de los papers individuales.

## Archivos

- `QICN_MONOLITHIC.tex` — documento master generado por el ensamblador.
- `QICN_MONOLITHIC.pdf` — PDF compilado (339 págs, SHA256 ver fixplan).
- `build/sections/` — chapters `.tex` generados (no editar a mano; se regeneran).
- `build/monolithic_references.bib` — bibliografía unificada (generada).
- `preamble/packages.tex`, `preamble/setup.tex` — preámbulo congelado (editar solo
  para fixes tipográficos del ensamblado, no para cambios semánticos).
- `compile.ps1` — script de compilación PowerShell.

## Comandos

```powershell
npm run build:monolithic    # ensamblar (regenera build/ sin compilar)
npm run compile:monolithic  # ensamblar + compilar PDF in situ
```

## Estado del gate tipográfico (v20)

```text
npm run audit:monolithic-build-quality
overfull_hbox: 3 (ecuaciones display O3/O4/O5 — deuda math, no resolubles sin
reescribir matemática). latex_warnings: 0. badness_masking: 0.
Gate EXIT 1 (FAIL esperado por deuda de layout math).
```

Las 4 tablas overfull (O1/O2/O6/O7) fueron resueltas render-neutral en
`scripts/build-monolithic-volume.js` (`fitWideTablesForMonolithic`).

## Nota

El ensamblado **no** modifica los papers standalone. Cada `paper*/main.pdf` se
compila por separado y es canónico. El monolítico es una vista unificada para
lectura, no la fuente de verdad.
