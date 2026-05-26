# PRED-EXT-01 Preregistration v2

Status: FROZEN_CLEAN_ROOM_SYNTHETIC_EXECUTION
Date frozen: 2026-05-26

## Boundary

This preregistration freezes a clean-room synthetic execution using a seeded
trace generator separated from the evaluator. It does not report empirical
support, external adjudication, consciousness, phenomenality, identity transfer,
agency, moral status, or the full QICN framework.

## Freeze Binding

| Parameter | Frozen value |
|---|---|
| Trace length | `240` |
| State alphabet | `A/B/C/D` |
| Required seed | `cleanroom_seed_001` |
| `rho_selective_threshold` | `2.0` |
| `penalized_loss_alpha` | `0.05` |
| Rival loss floor | `0.05` |
| Rival memory depth | `1` |
| Minimum trace length | `200` |
| Laplace smoothing | `1` |

## Scenario Manifest

The runner must evaluate one positive synthetic panel and five negative
controls: stochastic noise, memory drift, high entropy, narrative-only, and
reward-bookkeeping. Every negative control must fail the same support rule.

## Decision Rule

Support requires:

1. `rho_selective >= 2.0`;
2. `tv_targeted > max(tv_sham, tv_off_target, epsilon_floor)`;
3. `penalized_rival_loss >= 0.05`;
4. all negative controls fail the support rule.

If any valid negative control satisfies the support rule, the result becomes a
destruction candidate or a reviewer quarantine candidate.

## Required Artifacts

- `docs/preregistrations/PRED-EXT-01_freeze_v2.json`
- `docs/reports/PRED_EXT_01_CLEANROOM_DECISION_RECORD.json`
- `npm run review:cleanroom-pred-ext-01`
