# Prediction Canon Reconciliation v1

Status: active FCR v13.1 source-alignment artifact.

Date: 2026-05-25

## Boundary

This report reconciles the active Paper 6 LaTeX prediction matrix with the
machine-readable prediction registry. It does not validate theorem truth,
empirical truth, consciousness, phenomenality, identity transfer, agency, moral
status, or external adjudication.

## Finding

The active Paper 6 LaTeX matrix lists eleven prediction rows:

- `PRED-01`
- `PRED-02`
- `PRED-03`
- `PRED-04`
- `PRED-05`
- `PRED-06`
- `PRED-07`
- `PRED-08`
- `PRED-09`
- `PRED-10`
- `PRED-11`

The machine-readable registry lists fourteen entries:

- `PRED-01`
- `PRED-02`
- `PRED-03`
- `PRED-04a`
- `PRED-04b`
- `PRED-04c`
- `PRED-05`
- `PRED-06`
- `PRED-07`
- `PRED-08`
- `PRED-09`
- `PRED-10`
- `PRED-11`
- `PRED-EXT-01`

This is not treated as corruption, but it is treated as a drift risk. A future
reviewer must be able to tell whether a registry entry is a Paper 6 row, a
split of a Paper 6 row, or a registry-only external candidate.

## Canon Map

The active reconciliation map is:

`registry/prediction-canon-map.json`

The map declares:

- `PRED-01`, `PRED-02`, `PRED-03`, and `PRED-05` through `PRED-11` as one-to-one
  Paper 6 matrix entries.
- Paper 6 `PRED-04` as split into registry entries `PRED-04a`, `PRED-04b`, and
  `PRED-04c`.
- `PRED-EXT-01` as a registry extension not present in the active Paper 6
  matrix.

## Policy

1. Do not resolve this discrepancy by running whole-registry extraction while
   `docs/reports/EXTRACTOR_REPRODUCIBILITY_AUDIT.md` reports non-reproducible
   extraction from the current primary `.tex` set.
2. Any registry entry absent from `registry/prediction-canon-map.json` must make
   `npm run verify:prediction-registry` fail.
3. Any `latex_canonical_predictions[].registry_ids[]` value absent from
   `docs/PREDICTION_REGISTRY_v1.json` must make
   `npm run verify:prediction-registry` fail.
4. Registry extensions are allowed only when explicitly listed and marked as
   non-executed scaffold unless they are promoted into Paper 6.

## Current Status

The reconciliation is structural only. It confirms source alignment policy; it
does not make any prediction empirically executed or externally adjudicated.
