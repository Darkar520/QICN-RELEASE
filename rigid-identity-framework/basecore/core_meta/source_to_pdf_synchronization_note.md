# Source-to-PDF Synchronization Note

## Decision

The active BaseCore source tree and the compiled PDF are synchronized.

## Active source of truth

- `BASECORE.tex`
- `core/sections/*.tex`
- `core/canonical_core_references.bib`

`CANONICAL_CORE.tex` is a deprecated wrapper and not the active source-of-truth entry point.

## Build chain executed

1. `pdflatex BASECORE.tex`
2. `biber BASECORE`
3. `pdflatex BASECORE.tex`
4. `pdflatex BASECORE.tex`

## Verified state

- output file: `BASECORE.pdf`
- final page count: `40`
- bibliography source: local `core/canonical_core_references.bib`
- undefined references: none in the final log
- undefined citations: none in the final log
- rerun-required warnings: none in the final log

## Important honesty note

This normalization pass was a tightening pass, not a length-maximization pass. The resulting BaseCore stabilized at 40 pages because downstream material and unsupported expansions were intentionally removed from base ownership.
