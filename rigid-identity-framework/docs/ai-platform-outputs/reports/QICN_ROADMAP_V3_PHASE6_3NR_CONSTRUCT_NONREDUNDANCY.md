# QICN Roadmap v3 Phase 6.3-NR Construct Non-Redundancy

Status: `PASS_WITH_REPORTED_LIMITS_AND_DEBT`
Runtime reported by script: `5.79s`
Scope: non-canonical AI-output internal construct analysis.

## Boundary

Internal synthetic construct non-redundancy analysis only. Not Phase 7, not rival comparison, not external validation, not consciousness or phenomenality evidence.

This does not validate QICN, does not compare against rivals, does not provide evidence about consciousness or phenomenality, and does not transfer outside this generator.

## Design

Phase label: `6.3-NR`.
Factorial cells: `27`. Seeds per cell: `30`. Total runs: `810`.

The three independently varied latent dimensions are:

- `self_locus_strength`: intended target of `QICN_SIPM`;
- `continuity_fracture`: intended target of `QICN_CFS`;
- `ownership_asymmetry`: intended target of `QICN_OFIA`.

Latent labels are used only to define factorial cells and analyze outputs. Extractors receive only raw views.

## Preflight

| Dependency | Classification |
| --- | --- |
| qicn_phase6_3c_selflocus_extractor_js | FUNCTIONAL |
| qicn_phase6_3d_contfield_extractor_js | FUNCTIONAL |
| qicn_phase6_3e_ofia_extractor_js | FUNCTIONAL |
| qicn_phase6_3close_coupled_gate_js | FUNCTIONAL |
| qicn_phase6_3f_calibration_sensitivity_ceiling_js | FUNCTIONAL |

## Specificity Matrix

Values are marginal eta-squared by latent dimension. `delta` is high-level mean minus low-level mean for that dimension.

| Variable | Primary dimension | eta self | delta self | eta continuity | delta continuity | eta ownership | delta ownership |
| --- | --- | --- | --- | --- | --- | --- | --- |
| QICN_SIPM | self_locus_strength | 0.9913 | 0.2529 | 0 | 0.0005 | 0 | -0.0007 |
| QICN_OFIA | ownership_asymmetry | 0 | 0.0011 | 0 | -0.0004 | 0.9989 | 1.4386 |
| QICN_CFS | continuity_fracture | 0 | -0.0001 | 0.9992 | 0.1284 | 0 | -0.0001 |

## Raw Variable Correlation

Pearson correlations are computed across all factorial worlds. Confidence intervals use block bootstrap over factorial cells.

| Pair | r | 95% block-bootstrap CI | |r| >= 0.7 |
| --- | --- | --- | --- |
| QICN_SIPM vs QICN_OFIA | -0.0016 | [-0.3611, 0.3883] | NO |
| QICN_SIPM vs QICN_CFS | 0.0005 | [-0.3685, 0.3771] | NO |
| QICN_OFIA vs QICN_CFS | -0.0003 | [-0.3725, 0.4037] | NO |

Correlation matrix order: `QICN_SIPM`, `QICN_OFIA`, `QICN_CFS`.

```json
[
  [
    1,
    -0.001638,
    0.000509
  ],
  [
    -0.001638,
    1,
    -0.000259
  ],
  [
    0.000509,
    -0.000259,
    1
  ]
]
```

## Effective Dimensionality

Participation ratio n_eff: `3`.
PC1 variance fraction: `0.3339`.
Eigenvalues: `1.0018, 0.9999, 0.9983`.

Interpretive rule: n_eff near 3 supports three distinguishable synthetic axes; n_eff near 1-2 indicates redundancy or collapse.

## Contrast With 6.3-CLOSE

| Quantity | Value |
| --- | --- |
| 6.3-CLOSE min coupled n_eff | 2.712 |
| 6.3-CLOSE min decoupled n_eff | 2.8027 |
| 6.3-CLOSE direction | COUPLED_LOWER_THAN_DECOUPLED_MIN |
| Design difference | 6.3-CLOSE swept a shared SNR ladder. 6.3-NR uses a factorial design where self-locus strength, continuity fracture sensitivity, and ownership asymmetry vary independently. |

## Cooked Variables: Secondary Only

QICN_FPPG and QICN_WRI are cooked synthetic variables in this harness. Their correlations reflect generator design, not construct validity.

| Variable | eta self | eta continuity | eta ownership | mean |
| --- | --- | --- | --- | --- |
| QICN_FPPG | 0.324 | 0.3306 | 0.3272 | 0.5406 |
| QICN_WRI | 0.3531 | 0.4127 | 0.2201 | 0.5598 |

Cooked correlation matrix order: `QICN_FPPG`, `QICN_WRI`.

```json
[
  [
    1,
    0.976013
  ],
  [
    0.976013,
    1
  ]
]
```

## Finding

Status: `NO_STRONG_REDUNDANCY_DETECTED_IN_THIS_SYNTHETIC_FACTORIAL`

The three raw variables behave as distinguishable synthetic axes in this factorial generator, but this does not transfer outside the generator.

No raw pair crossed the |r| >= 0.7 redundancy threshold.

Each raw variable's strongest marginal sensitivity matched its intended latent dimension.

The effective dimensionality criterion did not flag collapse below the synthetic 3-axis target.

## Residual Limits

- SelfIndex accuracy remained 1.0 across the factorial cells, so this pass does not resolve the previously documented low-SNR SelfIndex single-point-of-failure.
- The factorial generator deliberately separates self-locus strength, continuity fracture sensitivity, and ownership asymmetry; clean separation here is a property of this generator design, not external construct validity.
- QICN_CFS varies with the intended continuity dimension, but its synthetic means remain below the historical 0.25 support threshold in this run; specificity is not the same as gate pass.
- OFIA saturates at 1.8 for mid/high ownership-asymmetry cells, so its dimensional specificity should be read as separability, not as a calibrated scale.
- FPPG and WRI remain cooked and are excluded from the primary n_eff verdict.

## Cell Summary Sample

First 10 of 27 cells shown for compactness.

| Cell | n | mean SIPM | mean OFIA | mean CFS | Self acc | Cont acc | OFIA self acc |
| --- | --- | --- | --- | --- | --- | --- | --- |
| self_low__cont_low__own_low | 30 | 0.2399 | 0.3648 | 0.0346 | 1 | 1 | 1 |
| self_low__cont_low__own_mid | 30 | 0.2393 | 1.7788 | 0.0343 | 1 | 1 | 1 |
| self_low__cont_low__own_high | 30 | 0.2366 | 1.8 | 0.0343 | 1 | 1 | 1 |
| self_low__cont_mid__own_low | 30 | 0.2389 | 0.3542 | 0.0761 | 1 | 1 | 1 |
| self_low__cont_mid__own_mid | 30 | 0.2374 | 1.7857 | 0.0764 | 1 | 1 | 1 |
| self_low__cont_mid__own_high | 30 | 0.2374 | 1.8 | 0.0758 | 1 | 1 | 1 |
| self_low__cont_high__own_low | 30 | 0.2374 | 0.363 | 0.1624 | 1 | 1 | 1 |
| self_low__cont_high__own_mid | 30 | 0.2374 | 1.7906 | 0.1631 | 1 | 1 | 1 |
| self_low__cont_high__own_high | 30 | 0.2373 | 1.8 | 0.1626 | 1 | 1 | 1 |
| self_mid__cont_low__own_low | 30 | 0.333 | 0.361 | 0.0345 | 1 | 1 | 1 |

## Non-Claims

- No external validation.
- No rival comparison.
- No evidence of consciousness, phenomenality, agency, human equivalence, or metaphysical identity.
- Results are generator-specific and do not transfer outside this synthetic factorial testbed.
- FPPG and WRI remain cooked synthetic and are not part of the primary dimensionality verdict.

## Reproducibility

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3nr_construct_nonredundancy.js --self-test --write-report
```
