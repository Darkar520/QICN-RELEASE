# PRED-02 Preregistration v1

Status: FROZEN_INTERNAL_SYNTHETIC_EXECUTION
Date frozen: 2026-05-26

## Boundary

This preregistration freezes a synthetic invariant-ablation harness. It does not
report empirical support, external adjudication, consciousness, phenomenality,
identity transfer, agency, moral status, or the full QICN framework.

## Hypothesis

If an invariant with positive pre-ablation headroom is destroyed while the
measurement panel remains admissible, certification should drop by more than
the ambiguity margin and satisfy the rupture ratio.

## Frozen Metrics

| Metric | Frozen value |
|---|---:|
| `delta_amb` | `0.05` |
| `rho_rupture` | `0.5` |

Support requires `certification_drop > delta_amb`,
`pre_ablation_headroom > delta_amb`, and
`relative_rupture >= rho_rupture`.

Weakening occurs when the drop is positive but too small, or the pre-ablation
headroom is already boundary-ambiguous. Destruction occurs when verified
invariant loss does not reduce certification.

## Required Artifact

`docs/reports/PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json`
