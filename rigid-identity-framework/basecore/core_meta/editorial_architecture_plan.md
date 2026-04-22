# Editorial Architecture Plan

## Decision

Use a modular master-source architecture with `BASECORE.tex` as the sole active entry point and `core/sections/*.tex` as the owned body modules.

`CANONICAL_CORE.tex` remains only as a deprecated compatibility wrapper.

## Rationale

- the old release surface still described the source tree as `CANONICAL_CORE`;
- the BaseCore normalization pass separates theorem-tight base ownership from expanded and downstream material;
- the approved strategy keeps Papers 1-6 selectively absorbed while freezing Papers 7-9 downstream.

## Part Structure

1. Foundational dynamics
2. Typed computable model and state spectral gap
3. Identity, rigidity, and conditional non-simulability
4. Regime structure and continuity constraints
5. Null-regime structural exclusion
6. BaseCore boundary and expansion interface
7. Operational-criterion grammar and certification
8. Claim boundary and falsation grammar
9. Claim / hygiene / dependency ledgers
10. Appendix counterexamples

## Bibliography Policy

The active base document owns a local bibliography file:

- `core/canonical_core_references.bib`

## Label / Macro Policy

- theorem environments and macros are centralized in `BASECORE.tex`;
- section files own body content only;
- BaseCore-neutral notation replaces earlier label-heavy or downstream-loaded wording where needed.
