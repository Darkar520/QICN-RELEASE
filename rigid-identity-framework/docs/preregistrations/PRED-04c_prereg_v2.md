# PRED-04c Preregistration v2

Status: FROZEN_INTERNAL_SYNTHETIC_EXECUTION
Date frozen: 2026-05-26

## Boundary

This preregistration freezes a synthetic cross-substrate equivalence harness.
It does not report empirical support, external adjudication, consciousness,
phenomenality, identity transfer, agency, moral status, or the full QICN
framework.

## Hypothesis

If two substrate presentations preserve the same abstract transition structure
and invariant bundle within frozen tolerances, the class assignment should
agree. A substrate-label rival predicts divergence by substrate label.

## Frozen Metrics

| Metric | Frozen value |
|---|---:|
| `eps_equiv` | `0.1` |
| `eps_invariant` | `0.05` |

Support requires `equiv_distance < eps_equiv`,
`invariant_delta < eps_invariant`, and `class_agreement === true`.
Destruction occurs when class agreement fails despite frozen equivalence and
invariant preservation.

## Required Artifact

`docs/reports/PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json`
