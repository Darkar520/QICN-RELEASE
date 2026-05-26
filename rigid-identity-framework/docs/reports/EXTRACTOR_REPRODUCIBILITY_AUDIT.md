# Extractor Reproducibility Audit v1

Status: REPRODUCIBLE

## Boundary

This audit checks whether the current global extractor can reproduce the committed FCR registries from the primary `.tex` files currently present in this checkout. It does not certify theorem truth, empirical validation, consciousness, phenomenality, or monolithic LaTeX compilation.

## Command

```powershell
npm run audit:extractor-reproducibility
```

## Count Comparison

| Surface | Committed registry | Fresh global extraction | Registry minus extraction |
| --- | --- | --- | --- |
| Formal registry entries | 696 | 696 | 0 |
| Macro registry entries | 377 | 377 | 0 |

## Macro Owner Comparison

| Owner | Committed macros | Fresh extracted macros | Delta |
| --- | --- | --- | --- |
| basecore | 58 | 58 | 0 |
| bridge | 43 | 43 | 0 |
| paper1 | 8 | 8 | 0 |
| paper10 | 9 | 9 | 0 |
| paper2 | 8 | 8 | 0 |
| paper3 | 21 | 21 | 0 |
| paper4 | 10 | 10 | 0 |
| paper5 | 35 | 35 | 0 |
| paper6 | 44 | 44 | 0 |
| paper7 | 48 | 48 | 0 |
| paper8 | 38 | 38 | 0 |
| paper9 | 55 | 55 | 0 |

## Registry Paths Missing From Current Checkout

None.

## Interpretation

The current extractor reproduces the committed registry counts from present primary sources.
