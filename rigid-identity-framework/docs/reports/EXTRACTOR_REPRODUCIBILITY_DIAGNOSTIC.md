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
| Registry formal entries | 696 |
| Registry macro entries | 377 |
| Formal entries whose source file is missing | 0 |
| Macro entries whose source file is missing | 0 |
| Fresh-extraction formal delta | 0 |
| Fresh-extraction macro delta | 0 |
| Residual formal delta not explained by missing source files | 0 |
| Residual macro delta not explained by missing source files | 0 |

## Missing Source Inventory

| Missing source file | Formal entries | Macro entries | Exists in backup ref |
|---|---:|---:|---|

## Interpretation

The active checkout has no missing-source delta and no residual extractor
delta. The current FCR registry is reproducible from the primary `.tex`
files present in this tree.

This closes the infrastructure mismatch identified by the v14-final-prep
audits, but it does not certify theorem truth, external adjudication,
monolithic LaTeX compilation, or human mathematical curation. It only
establishes that the current registry is synchronized with the current
source corpus under the current extractor.

## Required v14 Action

1. Keep `npm run audit:extractor-reproducibility` in the release gate.
2. Do not treat registry reproducibility as proof correctness.
3. Track restored or retired sources through explicit decision records.
4. Keep macro-collision and monolithic-compile risk separate from extractor
   reproducibility.
