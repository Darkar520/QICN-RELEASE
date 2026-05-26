# Extractor Reproducibility Diagnostic

Status: ACTIVE_DIAGNOSTIC_COMPLETED
Date: 2026-05-26

## Boundary

This diagnostic explains registry reproducibility drift. It does not edit
`registry/theorems.jsonl`, does not edit `registry/macros.jsonl`, does not
certify theorem truth, and does not validate consciousness, phenomenality,
identity transfer, agency, moral status, or external adjudication.

## Delta Accounting

| Quantity | Count |
|---|---:|
| Registry formal entries | 745 |
| Registry macro entries | 432 |
| Formal entries whose source file is missing | 107 |
| Macro entries whose source file is missing | 94 |
| Fresh-extraction formal delta | 160 |
| Fresh-extraction macro delta | 107 |
| Residual formal delta not explained by missing source files | 53 |
| Residual macro delta not explained by missing source files | 13 |

## Missing Source Inventory

| Missing source file | Formal entries | Macro entries | Exists in backup ref |
|---|---:|---:|---|
| `basecore/core/sections/11_discrete_bridge.tex` | 12 | 0 | not_verified |
| `paper_bridge_operational_subjecthood/main.tex` | 80 | 44 | yes |
| `paper10_external_adjudication/main.tex` | 15 | 10 | yes |
| `shared/preamble_qicn.tex` | 0 | 40 | not_verified |

## Interpretation

The missing-source files explain a large part of the extractor mismatch, but
they do not explain the entire mismatch when compared with the latest
`audit:extractor-reproducibility` counts. The residual delta must remain an
open infrastructure burden until it is traced to extractor behavior, source
changes, intentionally curated registry entries, or another documented cause.

## Required v14 Action

1. Restore or formally retire each missing source file.
2. Re-run `npm run audit:extractor-reproducibility`.
3. Re-run this diagnostic.
4. Treat the extractor as authoritative only when both missing-source and
   residual deltas are zero, or every residual entry has a curated reason.
