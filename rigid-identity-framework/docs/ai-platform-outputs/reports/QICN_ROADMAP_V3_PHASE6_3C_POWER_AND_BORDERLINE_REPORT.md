# QICN Roadmap v3 - Phase 6.3C Power and Borderline Simulation Report

Date: 2026-06-11

Status: `PHASE6_3C_POWER_SIM_PASS_WITH_REPORTED_PROTOCOL_DEBT_NON_CANONICAL`

## Boundary

This report documents a synthetic Phase 6.3C power simulator. It is a non-canonical AI-output artifact designed to pressure the Phase 6.3A decision surface.

It does not validate QICN, defeat HOT, prove consciousness, prove phenomenality, establish human equivalence, certify a runtime, or provide external adjudication.

## Relation to 6.3B

The 6.3B simulator was useful as a plumbing smoke test, but it used cooked fields such as `loci[].weight`, `continuity_candidates[].score`, and precomputed loss fields. Phase 6.3C improves one blocking part only:

- `QICN_SIPM` is now computed by `qicn_phase6_3c_selflocus_extractor.js` from raw self-locus traces.

The remaining QICN variables are still candidate/cooked toy variables:

- `QICN_OFIA`
- `QICN_CFS`
- `QICN_FPPG`
- `QICN_WRI`

That residual limitation is real. Phase 6.3C is not a complete raw operationalization of Paper 8.

## Simulator Artifact

`docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js`

Properties:

- dependency-free CommonJS;
- consumes the 6.3C raw self-locus extractor for `QICN_SIPM`;
- consumes the 6.3B HOT arm for `HOT_HOA`;
- uses at least 30 seed-level runs per condition;
- computes Durbin-Watson, AR(1), block bootstrap, effective sample size, Holm correction across five QICN variables, and BIC comparisons;
- includes extreme, borderline, noise-sweep, null, and insufficient-effective-sample worlds.

## Self-Test Command

Working directory:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Command:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3c_power_sim.js --self-test
```

Exit code: `0`.

## Result Classes

The simulator uses the 6.3A result classes:

- `QICN_BOUNDED_SUPPORT_FOR_TARGET`
- `HOT_FAVORED_FOR_TARGET`
- `QICN_FALSIFIED_FOR_TARGET`
- `BOTH_FAIL`
- `INCONCLUSIVE`

Controls are destructive: if a negative control passes, the condition is classified as `QICN_FALSIFIED_FOR_TARGET` before support can be granted.

## Condition-Level Confusion Matrix

Each cell counts one condition-level protocol execution. Each condition execution contains at least 30 seeds.

| Expected | Obtained | Count |
|---|---|---:|
| `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 3 |
| `HOT_FAVORED_FOR_TARGET` | `HOT_FAVORED_FOR_TARGET` | 1 |
| `QICN_FALSIFIED_FOR_TARGET` | `QICN_FALSIFIED_FOR_TARGET` | 1 |
| `INCONCLUSIVE` | `INCONCLUSIVE` | 3 |
| `INCONCLUSIVE` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 1 |
| `BOTH_FAIL` | `BOTH_FAIL` | 1 |

Aggregate condition accuracy: `0.9000`.

The single mismatch is not hidden: `noise_qicn_0_35` was expected to be inconclusive but obtained QICN bounded support.

## Main Condition Summary

| Condition | Expected | Obtained | Seeds | HOT AUC | HOT ECE | Primary gain | Effective n | Control pass | Notes |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| `qicn_true` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 30 | 0.3855 | 0.0179 | 0.2509 | 30.0000 | 0.0000 | QICN support in clean synthetic world. |
| `hot_true` | `HOT_FAVORED_FOR_TARGET` | `HOT_FAVORED_FOR_TARGET` | 30 | 0.8305 | 0.0998 | -0.3526 | 30.0000 | 0.0000 | HOT passes AUC/ECE; QICN fails. |
| `control_leak` | `QICN_FALSIFIED_FOR_TARGET` | `QICN_FALSIFIED_FOR_TARGET` | 30 | 0.4021 | 0.0187 | 0.2544 | 10.7665 | 0.2500 | Negative-control leak destroys target before support. |
| `borderline_qicn` | `INCONCLUSIVE` | `INCONCLUSIVE` | 30 | 0.3933 | 0.0225 | 0.0443 | 30.0000 | 0.0000 | Near-threshold case remains inconclusive. |
| `null_world` | `BOTH_FAIL` | `BOTH_FAIL` | 30 | 0.3985 | 0.0307 | -0.0262 | 30.0000 | 0.0000 | Neither side passes. |
| `insufficient_sample` | `INCONCLUSIVE` | `INCONCLUSIVE` | 30 | 0.4099 | 0.0208 | 0.1849 | 1.3285 | 0.0000 | AR(1) effective-n collapse blocks support. |

## Noise Sweep

| Noise condition | Expected | Obtained | Mean `QICN_SIPM` | Correct |
|---|---|---|---:|---|
| `noise_qicn_0_05` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 0.4687 | yes |
| `noise_qicn_0_20` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 0.3893 | yes |
| `noise_qicn_0_35` | `INCONCLUSIVE` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | 0.3335 | no |
| `noise_qicn_0_50` | `INCONCLUSIVE` | `INCONCLUSIVE` | 0.2954 | yes |

## Error Rates

| Metric | Value |
|---|---:|
| False QICN support under `hot_true` / `null_world` / `control_leak` | 0.0000 |
| Correct falsification under `control_leak` | true |
| Condition-level accuracy | 0.9000 |

## Statistical Checks Implemented

| 6.3A requirement | 6.3C implementation |
|---|---|
| At least 30 independent seeds per condition | Implemented for all conditions. |
| Durbin-Watson + AR(1) | Implemented per condition on the primary gain series. |
| Block bootstrap if `rho > 0.30` | Implemented with block length `ceil(2/(1-rho))`. |
| Effective sample size | Implemented; support blocked if `< 20`. |
| Delta BIC against HOT-only and weak-rival | Implemented using synthetic RSS and model-size penalties. |
| Holm correction across five QICN variables | Implemented for `QICN_SIPM`, `QICN_OFIA`, `QICN_CFS`, `QICN_FPPG`, `QICN_WRI`. |
| Negative controls not multiplicity-adjusted | Implemented; any pass is destructive. |
| Borderline worlds | Implemented: `borderline_qicn`, `noise_qicn_0_35`, `noise_qicn_0_50`. |
| Null world | Implemented: `null_world`. |
| Insufficient sample world | Implemented by AR(1) effective-n collapse while preserving 30 seeds. |

## Protocol Debt Found

`noise_qicn_0_35` is the important negative finding. The simulator produced `QICN_BOUNDED_SUPPORT_FOR_TARGET` even though the condition was intended to be borderline/inconclusive.

Interpretation:

- the 6.3A candidate thresholds may be too permissive under moderate noise;
- `QICN_SIPM` remains high under `rawNoise=0.35`;
- cooked `QICN_OFIA`, `QICN_CFS`, `QICN_FPPG`, and `QICN_WRI` can still carry the decision surface too strongly;
- Phase 6.3D should either raw-extract the remaining primitives or add stricter noise/robustness criteria before any canonical protocol freeze.

This is not a failure to be hidden. It is the main reason this phase closes as `PASS_WITH_REPORTED_PROTOCOL_DEBT`, not as clean empirical readiness.

## Residual Risks

- Only `QICN_SIPM` is raw-extracted. Other QICN variables remain synthetic/cooked.
- HOT arm remains minimal and is not a full HOT literature implementation.
- BIC comparisons use synthetic RSS, not external data.
- Condition-level confusion matrix uses protocol executions as units; it is not a real-world empirical benchmark.
- No registry, release, paper, PDF, monolith, artifact, corpus, or production script was modified.

Status: `PHASE6_3C_POWER_SIM_PASS_WITH_REPORTED_PROTOCOL_DEBT_NON_CANONICAL`.
