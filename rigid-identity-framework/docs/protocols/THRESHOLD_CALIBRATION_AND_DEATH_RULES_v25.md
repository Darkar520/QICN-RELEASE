# Threshold Calibration and Death Rules v25

Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.

## Diagnosis

The v24 analyses correctly identify a residual risk: support thresholds such as `support_gain_aic: 5.0` are useful engineering gates, but they are not externally calibrated death rules unless frozen before an external holdout and justified by null/rival simulations not tuned to QICN.

## Calibration statuses

Every threshold must declare one of:

- `synthetic_engineering_gate`: internal plumbing only; no external support.
- `blocked_pending_external_calibration`: threshold cannot be used for support.
- `externally_calibrated_holdout`: threshold calibrated on an independent holdout or null/rival ensemble before final scoring.

## Death-rule activation

A death rule may downgrade a claim only when all of the following are true:

1. Raw data hash, prediction bundle hash, code hash, and exclusion log are frozen.
2. Threshold calibration status is `externally_calibrated_holdout`.
3. At least one nontrivial rival family is executed under the same data and exclusion rules.
4. Synthetic fixtures are excluded from support promotion.
5. A downgrade proposal is generated and then routed to the human veto traceability protocol.

## Current status

All v25 synthetic fixtures remain `synthetic_engineering_gate`. They verify software behaviour only. They do not raise external credibility scores.
