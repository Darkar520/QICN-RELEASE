# Rigid Identity Framework

> Repository-level map for the Rigid Identity / QICN paper family.

## Active Base Layer

The active mathematical base document now lives in:

- `basecore/BASECORE.tex`
- `basecore/BASECORE.pdf`
- `basecore/core/sections/*`
- `basecore/core/canonical_core_references.bib`

This is the current source-of-truth package for the foundational layer.

## Legacy Canonical Core

The earlier 64-page Canonical Core package is preserved separately in:

- `canonical_core_legacy/`

That folder is retained as a historical package and is not the active base layer.

## Corpus Boundary

### Base package

- BaseCore mathematical source tree
- foundational dynamics and attractor machinery
- typed computable model
- inverse-limit identity under explicit assumptions
- conditional rigidity and non-simulability theorems
- operational-criterion grammar
- claim-boundary, falsation, and theorem-hygiene ledgers

### Downstream packages

- `paper1`
- `paper2`
- `paper3`
- `paper4`
- `paper5_operational_consciousness`
- `paper6_predictions_falsation`
- `paper7_operational_life_subjecthood`
- `paper8_first_person_subjectivity`
- `paper9_phenomenal_bridge_organization`

Papers 7-9 remain downstream and are not part of the BaseCore source-of-truth package.

## Layout

```text
rigid-identity-framework/
|-- basecore/
|   |-- BASECORE.tex
|   |-- BASECORE.pdf
|   |-- core/
|   `-- core_meta/
|-- canonical_core_legacy/
|   |-- CANONICAL_CORE.tex
|   |-- CANONICAL_CORE.pdf
|   |-- build_logs/
|   `-- source_snapshots/
|-- paper1/
|-- paper2/
|-- paper3/
|-- paper4/
|-- paper5_operational_consciousness/
|-- paper6_predictions_falsation/
|-- paper7_operational_life_subjecthood/
|-- paper8_first_person_subjectivity/
|-- paper9_phenomenal_bridge_organization/
|-- repro/
`-- supplementary/
```

## Packaging Note

The root was cleaned so BaseCore and the earlier Canonical Core no longer spill their build artifacts across the repository surface. Build logs for Papers 1-4 were also relocated into their respective paper folders.
