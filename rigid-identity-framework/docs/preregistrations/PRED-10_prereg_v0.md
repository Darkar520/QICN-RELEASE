# PRED-10 Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes PRED-10 executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: `PRED-10`
- Claim target: `P5-05`
- Claim family: Legibility under noise and structured compression
- Source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Execution status: `not_executed`

## Hypothesis And Rival

- Observable: Separability and intervention fidelity as admissible noise/compression rises.
- Manipulation: Raise admissible noise or structured compression while preserving or breaking Ileg.
- Framework prediction: Separability and intervention fidelity survive only while Ileg remains positive.
- Rival prediction: A generic observability model predicts no specific dependence on Ileg.
- Support condition: Legibility metrics remain within frozen bounds when Ileg is positive and fail/degrade when Ileg crosses its frozen boundary.
- Weakening condition: Legibility changes are explained by decoder fragility unrelated to the registered Ileg clauses.
- Destruction condition: Generic observability remains stable with no specific dependence on Ileg, or Ileg failure does not affect certification.

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
| legibility_margin_delta_leg | formal_not_numeric | delta_leg(S) | legibility witness margin |

## Required Artifacts

- noise_manifest
- compression_manifest
- legibility_metric_report
- intervention_fidelity_report
- decision_record

## Minimum Negative Controls

- noise_only_control
- compression_only_control
- decoder_fragility_control

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

Legibility is an operational audit condition, not semantic transparency or phenomenality.
