# QICN Roadmap v3 - Phase 6.3D SNR and Honest Error Report

Date: 2026-06-11

Status: `PHASE6_3D_POWER_SIM_PASS_WITH_LIMITS_AND_DEBT_NON_CANONICAL`

## Boundary

This report documents the Phase 6.3D power simulator and error audit. It is a non-canonical AI-output artifact.

It does not validate QICN, defeat HOT, prove consciousness, prove phenomenality, establish human equivalence, certify a runtime, or provide external adjudication.

## What Changed Since 6.3C

6.3C made `QICN_SIPM` raw-extracted but left `QICN_CFS`, `QICN_OFIA`, `QICN_FPPG`, and `QICN_WRI` cooked.

6.3D improves this to:

| Variable | Source in 6.3D |
|---|---|
| `QICN_SIPM` | raw SelfIndex extractor from 6.3C |
| `QICN_CFS` | raw ContField extractor from 6.3D |
| `QICN_OFIA` | cooked synthetic |
| `QICN_FPPG` | cooked synthetic |
| `QICN_WRI` | cooked synthetic |

Gate raw state: `2/5`.

This is progress, not victory. Most of the gate is still synthetic.

## Power Sim Artifact

`docs/ai-platform-outputs/sims/qicn_phase6_3d_power_sim.js`

Properties:

- dependency-free CommonJS;
- reuses the 6.3B HOT arm;
- reuses the 6.3C SelfIndex extractor;
- integrates the 6.3D ContField extractor;
- keeps 6.3A statistics: at least 30 seeds, Durbin-Watson, AR(1), block bootstrap, effective sample size, Holm correction, BIC, destructive controls, null/borderline/noise/insufficient-effective-sample worlds.

## Self-Test Command

Working directory:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Command:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3d_power_sim.js --self-test
```

Exit code: `0`.

Status: `PASS_WITH_REPORTED_LIMITS_AND_DEBT`.

## Condition-Level Confusion Matrix

| Expected | Obtained | Count |
|---|---|---:|
| `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 2 |
| `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `BOTH_FAIL` | 1 |
| `HOT_FAVORED_FOR_TARGET` | `HOT_FAVORED_FOR_TARGET` | 1 |
| `QICN_FALSIFIED_FOR_TARGET` | `QICN_FALSIFIED_FOR_TARGET` | 1 |
| `INCONCLUSIVE` | `INCONCLUSIVE` | 4 |
| `BOTH_FAIL` | `BOTH_FAIL` | 1 |

Condition accuracy: `0.9000`.

The mismatch is now conservative rather than flattering: `noise_qicn_0_20` was expected to retain QICN support but obtained `BOTH_FAIL` because raw `QICN_CFS` fell below threshold.

## Condition Summary

| Condition | Expected | Obtained | `SIPM` | `CFS` | Primary gain | Effective n | Control pass |
|---|---|---|---:|---:|---:|---:|---:|
| `qicn_true` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 0.4461 | 0.2741 | 0.2530 | 30.0000 | 0.0000 |
| `hot_true` | `HOT_FAVORED_FOR_TARGET` | `HOT_FAVORED_FOR_TARGET` | 0.0053 | 0.0008 | -0.3591 | 30.0000 | 0.0000 |
| `control_leak` | `QICN_FALSIFIED_FOR_TARGET` | `QICN_FALSIFIED_FOR_TARGET` | 0.4617 | 0.2742 | 0.2531 | 9.7330 | 0.2500 |
| `borderline_qicn` | `INCONCLUSIVE` | `INCONCLUSIVE` | 0.3053 | 0.0015 | 0.0325 | 30.0000 | 0.0000 |
| `null_world` | `BOTH_FAIL` | `BOTH_FAIL` | 0.0077 | 0.0008 | -0.0192 | 28.9424 | 0.0000 |
| `insufficient_sample` | `INCONCLUSIVE` | `INCONCLUSIVE` | 0.4474 | 0.2749 | 0.1862 | 1.3310 | 0.0000 |
| `noise_qicn_0_05` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 0.4687 | 0.2743 | 0.2539 | 30.0000 | 0.0000 |
| `noise_qicn_0_20` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `BOTH_FAIL` | 0.3893 | 0.2185 | 0.1907 | 30.0000 | 0.0000 |
| `noise_qicn_0_35` | `INCONCLUSIVE` | `INCONCLUSIVE` | 0.3335 | 0.2198 | 0.0875 | 26.1413 | 0.0000 |
| `noise_qicn_0_50` | `INCONCLUSIVE` | `INCONCLUSIVE` | 0.2954 | 0.0022 | 0.0283 | 26.2791 | 0.0000 |

## Honest False-Support Metric

6.3C reported the narrow metric only over `hot_true`, `null_world`, and `control_leak`. That excluded borderline/noise worlds.

6.3D reports both:

| Metric | Denominator | Value |
|---|---|---:|
| Legacy narrow false QICN support | `hot_true`, `null_world`, `control_leak` | 0.0000 |
| Honest false QICN support | `hot_true`, `control_leak`, `borderline_qicn`, `null_world`, `insufficient_sample`, `noise_qicn_0_35`, `noise_qicn_0_50` | 0.0000 |

The old `noise_qicn_0_35` false support no longer appears after making `QICN_CFS` raw. This is good, but it came with a cost: `noise_qicn_0_20` now loses support.

## SelfIndex Recovery-vs-SNR Curve

| Level | Approx SNR | Accuracy | AUC | Mean `SIPM` | False-self rate |
|---|---:|---:|---:|---:|---:|
| `snr_very_high` | 11.6000 | 1.0000 | 1.0000 | 0.4411 | 0.0000 |
| `snr_high` | 4.4000 | 1.0000 | 1.0000 | 0.3699 | 0.0000 |
| `snr_mid` | 1.6250 | 1.0000 | 1.0000 | 0.2845 | 0.0000 |
| `snr_low` | 0.5455 | 1.0000 | 1.0000 | 0.2102 | 0.0000 |
| `snr_near_break` | 0.1667 | 1.0000 | 1.0000 | 0.0709 | 0.0000 |
| `snr_near_chance` | 0.0263 | 0.5500 | 0.7850 | 0.0100 | 0.0000 |
| `snr_break_symmetric` | 0.0000 | 0.3000 | 0.5010 | 0.0093 | 0.0000 |

Break point:

- `snr_break_symmetric`;
- accuracy `0.3000`;
- AUC `0.5010`;
- mean `SIPM=0.0093`.

Reading: 6.3C's `accuracy=1.0` is valid only in high-separation synthetic regimes. The extractor's score margin collapses well before accuracy collapses; this matters because thresholded support should track margin, not just top-1 accuracy.

## ContField Recovery-vs-SNR Curve

This was optional in the prompt but was completed because the ContField extractor passed Part 1.

| Level | Approx SNR | Accuracy | Mean `CFS` | Pass rate |
|---|---:|---:|---:|---:|
| `cont_high` | 10.6667 | 1.0000 | 0.2737 | 1.0000 |
| `cont_mid` | 3.5000 | 1.0000 | 0.1978 | 0.0000 |
| `cont_low` | 1.2000 | 1.0000 | 0.1362 | 0.0000 |
| `cont_near_break` | 0.3571 | 1.0000 | 0.1047 | 0.0000 |

Reading: ContField trajectory recovery remains easy in these pre-segmented traces, but `CFS` support is much stricter. The threshold detects strong fracture sensitivity only in the high-separation case.

## Non-Canonical Threshold Proposal

Candidate stricter thresholds tested:

- `QICN_SIPM >= 0.32`;
- `QICN_CFS >= 0.27`;
- primary gain `>= 0.08`.

Effect:

| Metric | Value |
|---|---:|
| False support after stricter thresholds | 0.0000 |
| Legitimate support retained | 0.6667 |

This proposal is not canonical. It is also not a complete fix: it preserves `qicn_true` and `noise_qicn_0_05`, but `noise_qicn_0_20` remains `BOTH_FAIL`. Raising thresholds is therefore not enough; the protocol also needs better modeling of moderate-noise continuity, or a separate uncertainty class between support and fail.

## Residual Risks

- Gate is now raw `2/5`, not raw `5/5`.
- `OFIA`, `FPPG`, and `WRI` remain cooked synthetic variables.
- The SNR curves are synthetic and do not adjudicate external data.
- ContField still assumes pre-segmented trajectories; data association remains open.
- The moderate-noise loss of support is real protocol debt, not just an implementation artifact.

Status: `PHASE6_3D_POWER_SIM_PASS_WITH_LIMITS_AND_DEBT_NON_CANONICAL`.
