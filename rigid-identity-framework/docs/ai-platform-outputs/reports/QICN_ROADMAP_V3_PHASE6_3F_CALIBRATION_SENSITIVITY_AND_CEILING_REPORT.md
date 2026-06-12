# QICN Roadmap v3 Phase 6.3F Calibration, Sensitivity, SPOF, and Synthetic Ceiling

Status: `PASS_WITH_REPORTED_LIMITS_AND_DEBT`
Runtime reported by script: `24.49s`
Scope: non-canonical AI-output analysis under `docs/ai-platform-outputs/`.

## Boundary

This report is an internal synthetic calibration analysis only. It is not external validation, not HOT adjudication, not evidence for consciousness or phenomenality, and not a canonical threshold update. The live gate remains a candidate synthetic protocol with `human_curated_status=not_reviewed`.

## Paso 0 - Preflight

| File | Classification | Self-test | Lines |
| --- | --- | --- | --- |
| docs/ai-platform-outputs/sims/qicn_phase6_3c_selflocus_extractor.js | FUNCTIONAL | present | 295 |
| docs/ai-platform-outputs/sims/qicn_phase6_3d_contfield_extractor.js | FUNCTIONAL | present | 288 |
| docs/ai-platform-outputs/sims/qicn_phase6_3e_ofia_extractor.js | FUNCTIONAL | present | 423 |
| docs/ai-platform-outputs/sims/qicn_phase6_3e_power_sim.js | FUNCTIONAL | present | 346 |
| docs/ai-platform-outputs/sims/qicn_phase6_3b_hot_model.js | FUNCTIONAL | not_present_smoke_dependency | 99 |

Classification rule: `FUNCTIONAL` means the dependency exists and exposes the expected module API for reuse. The HOT model has no standalone `--self-test`; it is treated as a functional smoke dependency because `computeHotHoa` is exported and exercised by the 6.3E/6.3F harness.

## Parte 0 - Fragile Effective N

The `noise_qicn_0_05` inconclusive behavior is explained by the effective-n precedence rule, not by missing metric computation or a report bug. The five metric pass states are shown below.

| Condition | Seeds | effective_n | rho | Obtained | Metric passes |
| --- | --- | --- | --- | --- | --- |
| noise_qicn_0_05 | 30 | 19.1415 | 0.221 | INCONCLUSIVE | QICN_SIPM:PASS<br>QICN_OFIA:PASS<br>QICN_CFS:PASS<br>QICN_FPPG:PASS<br>QICN_WRI:PASS |
| noise_qicn_0_05 | 50 | 40.6984 | 0.1026 | QICN_BOUNDED_SUPPORT_FOR_TARGET | QICN_SIPM:PASS<br>QICN_OFIA:PASS<br>QICN_CFS:PASS<br>QICN_FPPG:PASS<br>QICN_WRI:PASS |

Selected correction: `A_SUFFICIENT_SEEDS_50_EFFECTIVE_N_GE_25` with `seed_count=50`, `effective_n=40.6984`, `rho=0.1026`.

## Parte 1 - SNR Threshold Calibration

Criterion: Minimize honest false support over null/borderline controls while retaining >=0.75 recovery over BOUNDED_SUPPORT worlds; otherwise select max(power - false_support).

| Variable | Candidate threshold | False support | Legitimate power | Selection note |
| --- | --- | --- | --- | --- |
| QICN_SIPM | 0.35 | 0 | 1 | criterion_met |
| QICN_CFS | 0.1 | 0 | 1 | criterion_met |
| OFIA_standardized_effect | 1.4 | 0 | 1 | criterion_met |

OFIA thresholding used `standardized_effect`, not clamped `QICN_OFIA`. The legacy gate equivalent is `0.875`, but this is explicitly non-canonical.

## OFIA Scale and Clamp

- Current divisor: `1.6`
- Current clamp max: `1.8`
- Clean high-SNR p95 standardized effect: `4.9318`
- Clean high-SNR p99.5 standardized effect: `5.0231`
- Scale assessment: `CURRENT_1_6_UNDERESTIMATES_HIGH_SNR_SIGNAL`
- Clamp assessment: `CLAMP_1_8_TRUNCATES_CLEAN_VARIANCE; MOVE_TO_DEFENSIVE_PERCENTILE_OR_REPORT_UNCLAMPED_STANDARDIZED_EFFECT`

The current `/1.6` and clamp are not justified merely by saying they normalize the score. In this sweep the unclamped standardized effect should remain reported; any rescale or clamp move is a candidate, not canon.

## Noise Re-evaluation With Candidate Thresholds

| Condition | Seeds | effective_n | Obtained | Metric passes |
| --- | --- | --- | --- | --- |
| noise_qicn_0_05 | 50 | 40.6984 | QICN_BOUNDED_SUPPORT_FOR_TARGET | QICN_SIPM:PASS<br>QICN_OFIA:PASS<br>QICN_CFS:PASS<br>QICN_FPPG:PASS<br>QICN_WRI:PASS |
| noise_qicn_0_20 | 50 | 50 | QICN_BOUNDED_SUPPORT_FOR_TARGET | QICN_SIPM:PASS<br>QICN_OFIA:PASS<br>QICN_CFS:PASS<br>QICN_FPPG:PASS<br>QICN_WRI:PASS |

Interpretation: At least one noisy QICN world recovered bounded support under candidate thresholds; check false-support rates before interpreting.

## Parte 2 - Weight Sensitivity

Sensitivity criterion: |delta recovery| >= 0.10 OR |delta AUC| >= 0.05 OR |delta false_rate| >= 0.05 OR |delta mean variable| >= 0.05

| Extractor | Parameter | Delta | dRecovery | dAUC | dFalse | dMean |
| --- | --- | --- | --- | --- | --- | --- |
| SelfIndex.localScore | control_coupling | -0.05 | 0 | 0 | 0 | -0.0002 |
| SelfIndex.localScore | control_coupling | 0.05 | 0 | 0 | 0 | 0.0005 |
| SelfIndex.localScore | event_binding | -0.05 | 0 | 0 | 0 | -0.0008 |
| SelfIndex.localScore | event_binding | 0.05 | 0 | 0 | 0 | 0.0012 |
| SelfIndex.localScore | readout_agreement | -0.05 | 0 | 0 | 0 | 0.0032 |
| SelfIndex.localScore | readout_agreement | 0.05 | 0 | 0 | 0 | -0.0024 |
| SelfIndex.localScore | perturbation_response | -0.05 | 0 | 0 | 0 | -0.0015 |
| SelfIndex.localScore | perturbation_response | 0.05 | 0 | 0 | 0 | 0.0016 |
| SelfIndex.localScore | prediction_error_inverse | -0.05 | 0 | 0 | 0 | 0 |
| SelfIndex.localScore | prediction_error_inverse | 0.05 | 0 | 0 | 0 | 0.0004 |
| ContField.obsScore | readout_agreement | -0.05 | 0 | 0 | 0 | 0.0059 |
| ContField.obsScore | readout_agreement | 0.05 | 0 | 0 | 0 | -0.0053 |
| ContField.obsScore | temporal_binding | -0.05 | 0 | 0 | 0 | 0.0002 |
| ContField.obsScore | temporal_binding | 0.05 | 0 | 0 | 0 | -0.0002 |
| ContField.obsScore | remap_coherence | -0.05 | 0 | 0 | 0 | 0.0002 |
| ContField.obsScore | remap_coherence | 0.05 | 0 | 0 | 0 | -0.0002 |
| ContField.obsScore | recovery_signal | -0.05 | 0 | 0 | 0 | 0.001 |
| ContField.obsScore | recovery_signal | 0.05 | 0 | 0 | 0 | -0.001 |
| ContField.obsScore | fork_inverse | -0.05 | 0 | 0 | 0 | -0.0091 |
| ContField.obsScore | fork_inverse | 0.05 | 0 | 0 | 0 | 0.0084 |
| ContField.obsScore | residual_inverse | -0.05 | 0 | 0 | 0 | -0.0079 |
| ContField.obsScore | residual_inverse | 0.05 | 0 | 0 | 0 | 0.0072 |
| OFIA.standardized_effect_scale | divisor_1_6 | -0.05 | 0 | 0 | 0 | 0.025 |
| OFIA.standardized_effect_scale | divisor_1_6 | 0.05 | 0 | 0 | 0 | -0.0235 |

Conclusion: `NO_MATERIAL_WEIGHT_SENSITIVITY_DETECTED_IN_THIS_SYNTHETIC_SWEEP`

## Parte 3 - SelfIndex Single Point of Failure

| SelfIndex level | Observed accuracy | participation_ratio_n_eff | Discriminative raw variables | SIPM+OFIA fail together |
| --- | --- | --- | --- | --- |
| selfindex_snr_high | 1 | 2.8726 | QICN_SIPM, QICN_OFIA, QICN_CFS | 0 |
| selfindex_snr_mid_high | 1 | 2.9943 | QICN_SIPM, QICN_OFIA, QICN_CFS | 0 |
| selfindex_snr_mid | 1 | 2.9999 | QICN_SIPM, QICN_OFIA, QICN_CFS | 0 |
| selfindex_snr_low | 1 | 2.9909 | QICN_SIPM, QICN_OFIA, QICN_CFS | 0 |
| selfindex_snr_fragile | 1 | 2.9372 | QICN_OFIA, QICN_CFS | 0 |
| selfindex_snr_broken | 0.3667 | 2.8027 | QICN_OFIA, QICN_CFS | 19 |

Participation ratio uses the eigenvalues of the Pearson correlation matrix over `QICN_SIPM`, `QICN_CFS`, and `QICN_OFIA`: `n_eff = (sum(lambda_i))^2 / sum(lambda_i^2)`. Low values mean the apparent 3 raw votes behave closer to a smaller number of effective votes.

## Parte 4 - Synthetic Ceiling

Status: `SYNTHETIC_CEILING_DECLARED`

What this phase does not resolve:

- EXTERNAL_ADJUDICATION_GAP remains open.
- FPPG and WRI remain cooked synthetic variables.
- ContField still assumes pre-segmented trajectories.
- HOT comparator remains operational-minimal rather than literature-complete.
- OFIA and SIPM share SelfIndex and therefore do not provide independent votes under SelfIndex collapse.

Non-claims:

- Synthetic discriminability is not external validation.
- Synthetic discriminability is not evidence of consciousness, phenomenality, human equivalence, agency, or metaphysical identity.
- Packaging a 3/5 raw gate does not close bridge admissibility.
- Threshold candidates are non-canonical and not human-curated.

SPOF summary: Participation ratio did not collapse to one in this sweep, but SelfIndex remains a common upstream failure mode for SIPM and OFIA.

## Machine-readable Details

The full JSON output is reproducible with:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3f_calibration_sensitivity_ceiling.js --self-test
```
