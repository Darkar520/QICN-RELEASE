# Reproducibility Protocol

## Scope
This protocol governs reruns of the frozen canonical corpus during the current scientific cycle. It is designed to raise internal credibility without pretending that external laboratory replication already exists.

## Frozen Inputs

- freeze record: `artifacts/release_audit/canonical_freeze_record.md`
- strict release anchors:
  - `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/summary.json`
  - `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/manifest.json`
  - `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/release/RELEASE_SCOPE.v2.strict.json`
- paper5 review anchor:
  - `artifacts/release_audit/paper5_final_hardening_summary.json`
- bibliography source of record:
  - `release/references.bib`

## Environment Reruns

1. rerun on the current workstation against frozen hashes
2. rerun on a different machine or clean environment against the same hashes
3. record:
   - OS
   - TeX distribution
   - Python / Node versions if used by the test harness
   - any runtime difference that could affect admissibility or class metrics

## Seed Policy

- If a test family uses stochastic generation, run a fixed panel of at least 5 seeds.
- The seed list must be written before outcome inspection.
- Seed changes during the run invalidate comparability.

## Generator / Judge Separation

- Generator:
  - creates candidate systems
  - creates interventions
  - emits raw traces
- Judge:
  - computes admissibility
  - computes invariant margins
  - computes class/certificate status
  - grades negative controls

The same code path should not both generate and grade without a logged separation layer.

## Agreement Conditions

- source hashes: exact match required
- admissibility verdicts: exact match required
- class membership / certification verdicts: exact match required
- continuous diagnostics:
  - relative deviation within `5%`, or
  - absolute deviation within `0.02` on normalized metrics,
  - unless a stricter preregistered threshold is defined for a specific test family

## Failure Conditions

A rerun fails reproducibility if any of the following occur:

- frozen source hashes differ
- admissibility verdict differs without a traceable environment cause
- class membership differs under the same frozen configuration
- negative controls pass in one environment and fail in another
- numerical diagnostics drift outside tolerance without a logged cause

## Minimum Audit Outputs Per Rerun

- command log
- environment report
- manifest / summary
- seed list, if applicable
- generator outputs
- judge outputs
- deviation report relative to the frozen baseline

## Overview Exclusion Note

`artifacts/precursor_overview_rewrite_v1/framework_overview_strict.tex` is excluded from this reproducibility baseline until its technical integration passes the canonical build gate.

## Interpretation Rule

Passing this protocol increases internal credibility. It does not by itself establish external validation or independent lab replication.
