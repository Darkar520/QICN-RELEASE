# File Consistency Audit

## Active files

- `BASECORE.tex`
- `CANONICAL_CORE.tex` (deprecated wrapper only)
- `core/sections/01_foundation_from_core.tex`
- `core/sections/02_model_and_spectral_extensions.tex`
- `core/sections/03_identity_rigidity_absorbed.tex`
- `core/sections/04_regime_constraints_absorbed.tex`
- `core/sections/05_null_regime_absorbed.tex`
- `core/sections/06_structural_classes_and_dynamics.tex`
- `core/sections/07_operational_criterion_absorbed.tex`
- `core/sections/08_claim_boundary_and_falsation.tex`
- `core/sections/09_canonical_ledgers.tex`
- `core/sections/10_appendix_counterexamples.tex`
- `core/canonical_core_references.bib`

## Consistency checks

1. Active bibliography path is local:
   - `\addbibresource{core/canonical_core_references.bib}`
2. `BASECORE.tex` owns the only active `\printbibliography`.
3. Section file count matches the planned modular layout: `10`.
4. README reflects the BaseCore source-of-truth policy.
5. `CANONICAL_CORE.tex` no longer acts as the primary source; it is an explicit wrapper.

## Documentation drift check

The active release-facing files now point to `BASECORE.tex` / `BASECORE.pdf` as the current base artifact. Older `CANONICAL_CORE` references survive only in deprecated or historical contexts.
