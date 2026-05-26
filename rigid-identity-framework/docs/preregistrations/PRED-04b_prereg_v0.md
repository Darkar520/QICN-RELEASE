# PRED-04b Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes PRED-04b executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: `PRED-04b`
- Claim target: `P3-01`
- Claim family: Fail-region fragility
- Source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Execution status: `not_executed`

## Hypothesis And Rival

- Observable: Fail-region response under micro-perturbation.
- Manipulation: Place the system in a fail region and apply micro-perturbations inside the frozen tolerance.
- Framework prediction: Response remains outside predicted tolerance.
- Rival prediction: A tuning artifact may predict accidental recovery or pass behavior in fail-region cases.
- Support condition: The run remains outside tolerance under the preregistered fail-region panel.
- Weakening condition: Fail behavior depends on non-reproducible seeds or untracked local tuning.
- Destruction condition: Response falls within tolerance in the frozen fail-region panel.

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
| fail_region_tolerance | not_frozen | null | response-distance tolerance |

## Required Artifacts

- fail_region_manifest
- tolerance_manifest
- perturbation_panel
- response_trace
- decision_record

## Minimum Negative Controls

- near_boundary_fail_control
- random_micro_perturbation_control

## Decision Record Slots

| Slot | Required before execution |
|---|---|
| Dataset or trace manifest | yes |
| Frozen thresholds | yes |
| Frozen seeds or deterministic generator | yes |
| Rival output | yes |
| Negative-control output | yes |
| Support / weakening / destruction / inconclusive verdict | yes |
| Claim-ledger update | yes |

## Epistemic Limit

This tests boundary classification only.
