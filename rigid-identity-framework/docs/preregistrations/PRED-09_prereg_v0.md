# PRED-09 Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes PRED-09 executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: `PRED-09`
- Claim target: `P4-03`
- Claim family: Budget/admissibility invalidation
- Source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Execution status: `not_executed`

## Hypothesis And Rival

- Observable: Claim survival under latency or compute-budget stress.
- Manipulation: Exceed preregistered latency, compute, or admissibility budget limits.
- Framework prediction: Strong operational claims are invalidated or downgraded.
- Rival prediction: A metric-first pipeline keeps claims active after budget violation.
- Support condition: Budget violation triggers the frozen invalidation or downgrade rule.
- Weakening condition: Budget violation is detected but downgrade behavior is inconsistent or discretionary.
- Destruction condition: Strong claims remain active after a preregistered budget violation.

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
| latency_compute_budget | not_frozen | null | runtime budget units |

## Required Artifacts

- budget_manifest
- stress_run_log
- admissibility_verdict
- claim_downgrade_record
- decision_record

## Minimum Negative Controls

- within_budget_control
- sham_stress_control
- malformed_log_control

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

This is an admissibility and governance test.
