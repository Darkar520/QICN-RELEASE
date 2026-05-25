# Extractor Reproducibility Audit v1

Status: NOT_REPRODUCIBLE_FROM_CURRENT_PRIMARY_TEX_SET

## Boundary

This audit checks whether the current global extractor can reproduce the committed FCR registries from the primary `.tex` files currently present in this checkout. It does not certify theorem truth, empirical validation, consciousness, phenomenality, or monolithic LaTeX compilation.

## Command

```powershell
npm run audit:extractor-reproducibility
```

## Count Comparison

| Surface | Committed registry | Fresh global extraction | Registry minus extraction |
| --- | --- | --- | --- |
| Formal registry entries | 745 | 585 | 160 |
| Macro registry entries | 432 | 325 | 107 |

## Macro Owner Comparison

| Owner | Committed macros | Fresh extracted macros | Delta |
| --- | --- | --- | --- |
| basecore | 58 | 58 | 0 |
| bridge | 44 | 0 | 44 |
| paper1 | 10 | 8 | 2 |
| paper10 | 10 | 0 | 10 |
| paper2 | 8 | 8 | 0 |
| paper3 | 22 | 21 | 1 |
| paper4 | 10 | 10 | 0 |
| paper5 | 35 | 35 | 0 |
| paper6 | 44 | 44 | 0 |
| paper7 | 50 | 48 | 2 |
| paper8 | 45 | 38 | 7 |
| paper9 | 56 | 55 | 1 |
| shared | 40 | 0 | 40 |

## Registry Paths Missing From Current Checkout

- basecore/core/sections/11_discrete_bridge.tex
- paper10_external_adjudication/main.tex
- paper_bridge_operational_subjecthood/main.tex
- shared/preamble_qicn.tex

## Interpretation

The current extractor is not a safe whole-registry regeneration gate in this checkout. Source-scoped derived-artifact resync is allowed only when the changed primary files are present, the intended diff is explicit, and corpus/macro gates remain clean afterward.
