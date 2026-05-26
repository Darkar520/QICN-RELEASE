# Preregistration PRED-11 v0

Status: draft preregistration scaffold, not frozen, not executed.

## Boundary

This document prepares the integration-loss / complexity-preservation test for
future execution. It does not report support, empirical validation,
consciousness, phenomenality, identity transfer, agency, moral status, or
external adjudication.

## Required Header

- Prediction ID: `PRED-11`
- Claim target: `P5-01`
- Claim family: Integration-loss complexity-only rival
- Corpus source: `paper6_predictions_falsation/main.tex`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Operator: `not_assigned`
- Reviewer/adjudicator: `not_assigned`
- Execution environment: `blocked_no_runner`
- Repository commit: `not_frozen`
- Data/source manifest: `not_created`
- External replicability: `false`
- External execution class allowed: `none_until_v1_frozen`

## Hypothesis And Rival

- Framework-side prediction: if causal integration is destroyed while gross
  complexity and activity are preserved within a frozen matching tolerance, the
  candidate must fail operational certification.
- Primary rival prediction: `RIVAL-COMPLEXITY-01` predicts that preserved
  complexity, connectivity, or gross activity remains sufficient for
  certification.
- What observation supports QICN: the integration-destroyed,
  complexity-preserved control fails certification under frozen rules.
- What observation weakens QICN: the integration intervention causes gross
  collapse, unmatched activity, measurement loss, or ambiguity not attributable
  to integration loss.
- What observation destroys the claim: the system passes certification despite
  verified integration loss and preserved complexity/activity under the frozen
  matching rule.
- What result is inconclusive: missing integration-loss manifest, missing
  complexity-preservation report, unfrozen tolerance, or broken certification
  runner.

## Measurement Binding

| Field | Value |
|---|---|
| Measurement dictionary key | `integration_loss_complexity_preservation` |
| Primary observable | Certification verdict after verified `I_int` loss |
| Secondary observable | Complexity/activity preservation under matched tolerance |
| Integration boundary | `not_frozen` |
| Complexity matching tolerance | `not_frozen` |
| Gross activity tolerance | `not_frozen` |
| Alpha / complexity penalty | `not_frozen` |
| Date frozen | `null` |
| Disallowed post-hoc transformation | changing the matching tolerance or certification gate after observing run results |

## Dataset, Seeds, And Controls

- Dataset/scenario source: `not_created`
- Inclusion rules: candidate must have a baseline certification attempt, an
  integration-loss manifest, and a matched complexity/activity report.
- Exclusion rules: abort if the integration intervention changes state alphabet,
  trace length, gross activity budget, or measurement availability outside the
  frozen tolerance.
- Random seeds: `not_frozen`
- Run count / sample size: `not_frozen`
- Primary negative controls:
  - complexity-preserved integration-destroyed control;
  - activity-preserved integration-destroyed control;
  - gross-collapse control.
- Rival implementation: `RIVAL-COMPLEXITY-01`
- Matching criteria for rival: node/state count, edge/transition count, gross
  activity, entropy surrogate, degree/transition histogram, and complexity
  penalty coefficient `alpha`.

## Decision Record

No decision record exists. Required future fields:

```json
{
  "prediction_id": "PRED-11",
  "prereg_version": "v0",
  "decision": "support|weakening|destruction|inconclusive",
  "integration_loss_verified": null,
  "complexity_preservation_report": null,
  "certification_after_integration_loss": null,
  "rival_result": null,
  "threshold_deviations": null,
  "exclusions_applied": null,
  "artifact_hashes": {}
}
```

## Anti-Inflation Clause

Even a future positive result would only support the claim that a
complexity-only rival fails under a frozen integration-loss test. It would not
prove consciousness, phenomenality, personal identity, identity transfer,
agency, moral status, or human equivalence.
