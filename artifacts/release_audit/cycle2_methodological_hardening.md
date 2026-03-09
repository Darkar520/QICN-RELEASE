# Cycle 2 Methodological Hardening

## Phase Order
Phase A was completed before Phase B.

## Generator / Judge Separation
- Generator role: produce candidate traces and write them to `cycle2_frozen_inputs/`.
- Judge role: read only `manifest.json`, `thresholds.json`, and the frozen case artifacts.
- The judge does not call the live simulator during scoring.

## Frozen Artifact Boundary
- threshold file: `artifacts/release_audit/cycle2_frozen_inputs/thresholds.json`
- manifest file: `artifacts/release_audit/cycle2_frozen_inputs/manifest.json`
- per-case frozen traces: `artifacts/release_audit/cycle2_frozen_inputs/*.json`

Each frozen input file is hashed in the manifest before judgment.

## Leakage Reduction
1. traces are frozen before scoring,
2. thresholds are frozen before scoring,
3. live generator-side transition logic is removed from the judge,
4. family decisions are ternary and explicit.

## Remaining Methodological Limitation
The generator and judge are separated by artifact boundary, not by a wholly independent codebase. This is stronger than Cycle 1, but it is not external replication.
