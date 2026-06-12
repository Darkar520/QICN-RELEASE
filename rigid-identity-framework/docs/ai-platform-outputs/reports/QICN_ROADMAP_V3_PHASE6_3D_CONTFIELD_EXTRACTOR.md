# QICN Roadmap v3 - Phase 6.3D ContField Extractor

Date: 2026-06-11

Status: `PHASE6_3D_CONTFIELD_EXTRACTOR_PASS_NON_CANONICAL_HUMAN_REVIEW_REQUIRED`

## Boundary

This report documents a candidate raw-trace extractor for `ContField` / autobiographical continuity margin. It is non-canonical AI-output machinery.

It does not validate QICN, defeat HOT, prove consciousness, prove phenomenality, establish human equivalence, certify a runtime, or provide external adjudication.

Every artifact in this pass remains:

- `status: candidate_extractor_non_canonical`
- `human_review: REQUIRED`
- `human_curated_status: not_reviewed`

## Abstraction Boundary

`ContField` is harder than `SelfIndex` because it normally requires trajectory association across time. Phase 6.3D does not solve data association.

The input is a list of pre-segmented candidate trajectories. The extractor ranks those candidate trajectories and computes baseline-vs-fracture continuity drop net of sham. This is a useful intermediate step, not a full solution to the Paper 8 trajectory problem.

## Paper 8 Source Anchors

Paper 8 defines autobiographical continuity at lines 189-191 as the gap by which the trajectory class anchored by `SelfIndex` remains privileged over the nearest rival class under remappings, temporal insertions/deletions, and continuity-preserving controls.

The estimator at lines 1301-1309 is explicitly gap-based:

- candidate trajectory family `T_tau`;
- designated self-indexed line `kappa*`;
- score gap against the best rival;
- score may combine trajectory compatibility, remap robustness, and fork penalties.

Phase 6.3D operationalizes that estimator at candidate level using raw temporal trajectory fields rather than `continuity_candidates[].score`.

## Information Boundary

The extractor receives:

- pre-segmented trajectory ids;
- window condition;
- readout channels;
- temporal binding;
- remap coherence;
- recovery signal;
- fork divergence;
- perturbation residual;
- memory/history distractor channels.

The extractor does not receive:

- latent truth;
- true self-trajectory id;
- genuine-continuity flag;
- world id;
- `continuity_candidates[].score`;
- `self_indexed`;
- precomputed continuity margin;
- precomputed `QICN_CFS`;
- expected result class.

The evaluation harness stores `latent_truth` separately and uses it only after extraction.

## Mechanism

For each pre-segmented trajectory and condition, the extractor computes a trajectory score from:

- readout agreement;
- temporal binding;
- remap coherence;
- recovery signal;
- low fork divergence;
- low perturbation residual.

Smoothness and low dispersion only modulate the raw continuity score. They do not substitute for it. This avoids treating a flat but stable rival as a high-continuity self trajectory.

The selected trajectory is the top baseline trajectory. The extractor computes:

- `QICN_CONT_BASELINE`;
- `QICN_CONT_SHAM`;
- `QICN_CONT_FRACTURE`;
- `QICN_CFS = max(0, baseline_drop_under_fracture - baseline_drop_under_sham)`.

The candidate 6.3A threshold remains `QICN_CFS >= 0.25`.

## Deliverables

| Artifact | Role |
|---|---|
| `QICN_ROADMAP_V3_PHASE6_3D_RAW_CONTFIELD_TRACE_SCHEMA.json` | Raw pre-segmented continuity trace schema. |
| `qicn_phase6_3d_contfield_extractor.js` | Dependency-free CommonJS extractor and self-test harness. |

## Self-Test Command

Working directory:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Command:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3d_contfield_extractor.js --self-test
```

Exit code: `0`.

## Identifiability Results

| Test | Result |
|---|---:|
| Genuine-continuity seeds | 60 |
| Chance accuracy | 0.25 |
| Recovery accuracy | 1.0000 |
| Recovery accuracy 95 percent bootstrap CI | `[1.0000, 1.0000]` |
| True trajectory vs rival trajectory AUC | 1.0000 |
| Mean `QICN_CFS` | 0.2735 |

## Null-Control Results

| Control | False-continuity rate | Mean `QICN_CFS` | Mean continuity margin |
|---|---:|---:|---:|
| `memory_only` | 0.0000 | 0.0057 | 0.0088 |
| `history_blind` | 0.0000 | 0.0043 | 0.0081 |
| `symmetric_trajectory` | 0.0000 | 0.0009 | 0.0037 |
| Aggregate | 0.0000 | 0.0036 | - |

False-continuity 95 percent bootstrap CI: `[0.0000, 0.0000]`.

## Ablation Results

The ablation removes the temporal signal family by replacing readout, temporal binding, remap coherence, recovery, fork, and perturbation fields with symmetric values.

| Metric | Result |
|---|---:|
| Ablation runs | 40 |
| Mean `QICN_CFS` before ablation | 0.2738 |
| Mean `QICN_CFS` after ablation | 0.0000 |
| Mean drop | 0.2738 |
| Drop 95 percent bootstrap CI | `[0.2725, 0.2753]` |

## SelfIndex-ContField Dissociation

The guard condition required a world where self-locus remains identifiable while continuity fractures.

| Metric | Result |
|---|---:|
| Runs | 40 |
| Mean `QICN_SIPM` | 0.4645 |
| Mean baseline continuity margin | 0.2936 |
| Mean fracture continuity margin | 0.0000 |
| Mean `QICN_CFS` | 0.2890 |
| `SIPM` high rate | 1.0000 |
| Fracture drop visible rate | 1.0000 |

This is the main anti-triviality result: `ContField` is not merely `SelfIndex` renamed. The self-locus can stay clear while the trajectory continuity margin collapses under fracture.

## Residual Risks

- Trajectories are pre-segmented. Data association remains unsolved.
- The synthetic worlds are still clean and controlled.
- The extractor tests raw continuity in toy traces, not external data.
- The threshold `QICN_CFS >= 0.25` is inherited from the non-canonical 6.3A protocol draft and remains human-review-required.
- `OFIA`, `FPPG`, and `WRI` remain cooked in the 6.3D power sim.

Status: `PHASE6_3D_CONTFIELD_EXTRACTOR_PASS_NON_CANONICAL_HUMAN_REVIEW_REQUIRED`.
