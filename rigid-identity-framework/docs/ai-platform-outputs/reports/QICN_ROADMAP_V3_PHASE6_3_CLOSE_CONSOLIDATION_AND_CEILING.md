# QICN Roadmap v3 Phase 6.3-CLOSE Consolidation and Synthetic Ceiling

Status: `PASS_WITH_REPORTED_LIMITS_AND_DEBT`
Runtime reported by script: `2.16s`
Scope: non-canonical AI-output closure under `docs/ai-platform-outputs/`.

## Boundary

This is an internal synthetic closure report. It is not external validation, not HOT adjudication, not consciousness or phenomenality evidence, and not a canonical threshold update.

## Coupled Trace Correction

The coupled pass uses one shared latent self index to generate:

- `selfView` for `extractSelfLocus`;
- `continuityView` for `extractContField`;
- `ownershipView` for `extractOfia`.

Latent truth is retained only for evaluation. Existing extractors receive only their raw views.

## n_eff Coupled vs Decoupled

No directional expectation was imposed. The coupled value is treated as the more realistic estimate of gate independence because all three raw views derive from one shared latent synthetic system.

| Rank | Coupled level | 6.3F decoupled level | Coupled SelfIndex acc | Decoupled SelfIndex acc | Coupled n_eff | Decoupled n_eff | Delta | Coupled discriminative raw variables |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | shared_snr_high | selfindex_snr_high | 1 | 1 | 2.712 | 2.8726 | -0.1606 | QICN_SIPM, QICN_OFIA, QICN_CFS |
| 2 | shared_snr_mid_high | selfindex_snr_mid_high | 1 | 1 | 2.8736 | 2.9943 | -0.1207 | QICN_SIPM, QICN_OFIA |
| 3 | shared_snr_mid | selfindex_snr_mid | 1 | 1 | 2.7901 | 2.9999 | -0.2097 | QICN_SIPM, QICN_OFIA |
| 4 | shared_snr_low | selfindex_snr_low | 1 | 1 | 2.8121 | 2.9909 | -0.1788 | QICN_SIPM, QICN_OFIA |
| 5 | shared_snr_fragile | selfindex_snr_fragile | 1 | 1 | 2.7713 | 2.9372 | -0.1659 | none |
| 6 | shared_snr_broken | selfindex_snr_broken | 1 | 0.3667 | 2.9886 | 2.8027 | 0.1859 | none |

Observed minimum coupled `n_eff`: `2.712`.
Observed minimum decoupled `n_eff`: `2.8027`.
Direction: `COUPLED_LOWER_THAN_DECOUPLED_MIN`.

## Coupled Details

| Level | SelfIndex acc | ContField acc | OFIA self acc | n_eff | Discriminative raw variables | SIPM+OFIA fail together |
| --- | --- | --- | --- | --- | --- | --- |
| shared_snr_high | 1 | 1 | 1 | 2.712 | QICN_SIPM, QICN_OFIA, QICN_CFS | 0 |
| shared_snr_mid_high | 1 | 1 | 1 | 2.8736 | QICN_SIPM, QICN_OFIA | 0 |
| shared_snr_mid | 1 | 1 | 1 | 2.7901 | QICN_SIPM, QICN_OFIA | 0 |
| shared_snr_low | 1 | 1 | 1 | 2.8121 | QICN_SIPM, QICN_OFIA | 0 |
| shared_snr_fragile | 1 | 1 | 1 | 2.7713 | none | 30 |
| shared_snr_broken | 1 | 1 | 1 | 2.9886 | none | 30 |

## Consolidated Achievements

- Three of five QICN gate variables are raw-extracted candidates: QICN_SIPM, QICN_OFIA, QICN_CFS.
- The 6.3A statistical harness is represented in the synthetic power sims: >=30 seeds, AR(1), effective-n, block bootstrap, Holm correction, BIC, null/borderline/noise/control-leak/insufficient-sample worlds.
- SNR curves, non-canonical threshold candidates, weight sensitivity, and coupled-vs-decoupled participation ratio have been reported.
- Information boundaries remain explicit: latent truth is evaluation-only, not extractor-visible.

## Open Debts

- QICN_FPPG and QICN_WRI remain cooked synthetic.
- Thresholds and weights are candidate, non-canonical, and not human-curated.
- ContField still assumes pre-segmented trajectories and does not solve data association.
- SelfIndex remains an upstream failure mode for SIPM and OFIA.
- Synthetic calibration values do not transfer outside this generator.
- EXTERNAL_ADJUDICATION_GAP remains open.

## What The Synthetic Testbed Cannot Resolve

- No evidence of consciousness, phenomenality, human equivalence, agency, or metaphysical identity.
- No external validation.
- No HOT defeat or rival adjudication.
- No canonical threshold or registry promotion.

## Formal Closure Declaration

Status: `SYNTHETIC_BLOCK_6_3_CLOSED_AT_INTERNAL_TESTBED_CEILING`

The Phase 6.3 block has reached its synthetic ceiling. It should not be extended into 6.3G. Additional synthetic refinement has diminishing returns unless it is tied to an external objective. The next level requires non-synthetic data or independent adjudication; `EXTERNAL_ADJUDICATION_GAP` remains open.

## Reproducibility

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3close_coupled_gate.js --self-test --write-report
```
