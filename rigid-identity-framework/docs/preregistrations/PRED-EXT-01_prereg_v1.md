# PRED-EXT-01 Preregistration v1

Status: frozen for internal synthetic pilot only.

## Boundary

This preregistration freezes a toy-scale internal synthetic pilot for
`PRED-EXT-01`. It is allowed to produce support, weakening, destruction, or
inconclusive status only for the finite synthetic transition-selectivity
pipeline. It does not report external adjudication, empirical support,
consciousness validation, phenomenality validation, personal identity, identity
transfer, agency, moral status, or validation of the full QICN framework.

## Frozen Parameters

The authoritative freeze artifact is
`docs/preregistrations/PRED-EXT-01_freeze_v1.json`.

| Field | Frozen value |
|---|---:|
| Trace length | `240` |
| State alphabet | `A/B/C/D` |
| Memory depth | `1` |
| Minimum trace length | `200` |
| Laplace smoothing | `1` |
| Epsilon floor | `0.001` |
| `rho_selective_threshold` | `2.0` |
| `penalized_loss_alpha` | `0.05` |
| Rival loss floor | `0.05` |

## Decision Rule

The internal synthetic support rule is conjunctive:

1. `rho_selective >= 2.0`;
2. `tv_targeted > max(tv_sham, tv_off_target, epsilon_floor)`;
3. `penalized_rival_loss >= 0.05`.

A negative control passes only when this support rule is false. If a negative
control satisfies the support rule, the result is a destruction candidate for
the selectivity claim or a harness failure requiring quarantine.

## Required Pilot Outputs

The pilot must write a decision record containing:

- the freeze artifact hash;
- trace-bundle hash;
- scenario metrics;
- positive scenario verdict;
- negative-control verdict;
- overall verdict;
- explicit claim-ledger boundary.

## Anti-Inflation Clause

Even a positive v1 result is only `internal_synthetic_support`. It is not
external evidence. The next admissible upgrade would require an independently
frozen dataset or trace generator, clean-room reviewer, and external replication
record.
