# PRED-04a Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes PRED-04a executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: `PRED-04a`
- Claim target: `P3-01`
- Claim family: Pass-region stability
- Source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Execution status: `not_executed`

## Hypothesis And Rival

- Observable: Pass-region response stability under micro-perturbation.
- Manipulation: Place the system in a pass region and apply micro-perturbations inside the frozen tolerance.
- Framework prediction: Response remains stable within predicted tolerance.
- Rival prediction: A fragile-threshold rival predicts uncontrolled flips even inside the claimed pass region.
- Support condition: The run remains inside tolerance across the preregistered perturbation panel.
- Weakening condition: Stability holds only for cherry-picked perturbations or after threshold changes.
- Destruction condition: Response falls outside tolerance in the frozen pass-region panel.

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
| pass_region_tolerance | not_frozen | null | response-distance tolerance |

## Required Artifacts

- pass_region_manifest
- tolerance_manifest
- perturbation_panel
- response_trace
- decision_record

## Minimum Negative Controls

- near_boundary_pass_control
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

This is a boundary-behavior test, not a consciousness or phenomenality test.
