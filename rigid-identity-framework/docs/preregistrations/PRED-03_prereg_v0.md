# PRED-03 Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes PRED-03 executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: `PRED-03`
- Claim target: `P5-05`
- Claim family: Complexity-only insufficiency
- Source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Execution status: `not_executed`

## Hypothesis And Rival

- Observable: Matched complexity/control outcome.
- Manipulation: Compare a certified lower-scale system against a higher-scale baseline lacking the invariant package.
- Framework prediction: The certified invariant-preserving system passes while the matched complexity-only baseline fails or remains undefined.
- Rival prediction: A scale-only model predicts that higher complexity or activity should be sufficient for certification.
- Support condition: The complexity-matched baseline fails under frozen certification while the invariant-preserving candidate passes.
- Weakening condition: The baseline fails only because of poor implementation quality, non-matched scale, or an excluded artifact rather than missing invariants.
- Destruction condition: A scale-only or activity-only control passes certification despite missing required invariants.

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
| complexity_match_tolerance | not_frozen | null | implementation-defined complexity surrogate |

## Required Artifacts

- candidate_certificate
- complexity_matched_control_manifest
- control_certificate_attempt
- matching_report
- decision_record

## Minimum Negative Controls

- complexity_only_control
- activity_rich_no_integration_control
- report_rich_no_invariant_control

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

Internal support in the corpus must not be read as external matched-baseline validation.
