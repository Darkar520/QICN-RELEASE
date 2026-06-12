# QICN Roadmap v3 - Phase 6.3C Self-Locus Extractor

Date: 2026-06-11

Status: `PHASE6_3C_SELFLOCUS_EXTRACTOR_PASS_NON_CANONICAL_HUMAN_REVIEW_REQUIRED`

## Boundary

This report documents a candidate `SelfIndex` / self-locus privilege extractor for Phase 6.3C. It is non-canonical AI-output machinery.

It does not validate QICN, defeat HOT, prove consciousness, prove phenomenality, establish human equivalence, certify a runtime, or provide external adjudication.

Every artifact in this pass remains:

- `status: candidate_extractor_non_canonical`
- `human_review: REQUIRED`
- `human_curated_status: not_reviewed`

## Preflight Classification

| Resource | Classification | Use |
|---|---|---|
| `QICN_ROADMAP_V3_PHASE6_3A_PREREGISTERED_PROTOCOL.md` | `FUNCTIONAL_PROTOCOL_DRAFT` | Supplies thresholds, controls, AR(1), Holm, BIC, and result classes. |
| `QICN_ROADMAP_V3_PHASE6_3B1_QICN_PRIMITIVE_OPERATIONALIZATION.md` | `FUNCTIONAL_CANDIDATE_INPUT_WITH_CIRCULARITY_RISK` | Supplies primitive mapping; 6.3C replaces the cooked `SelfIndex` input. |
| `QICN_ROADMAP_V3_PHASE6_3B1_TRACE_SCHEMA.json` | `FUNCTIONAL_COOKED_SCHEMA` | Used as contrast only; not used as raw extractor input. |
| `qicn_phase6_3b_discrimination_sim.js` | `FUNCTIONAL_SMOKE_TEST_REFERENCE` | Consumed conceptually as predecessor; not overwritten. |
| `qicn_phase6_3b_hot_model.js` | `FUNCTIONAL_MINIMAL_HOT_ARM` | Reused by the 6.3C power simulator. |
| `paper8_first_person_subjectivity/main.tex` | `FUNCTIONAL_FORMAL_SOURCE` | Source anchors for `SelfIndex`. |

## Paper 8 Source Anchors

Paper 8 defines `SelfIndex` at lines 173-179 as a map from the admissible latent-state family to `[0,1]` assigning privileged weight to the system's continuing locus, with non-triviality, relabeling stability, and readout transportability.

The estimator family at lines 1274-1283 defines the self-index estimator as a positive top-vs-rival margin multiplied by relabeling robustness.

The 6.3C extractor implements that structure operationally without receiving `loci[].weight`, `true_self_locus_id`, `world_id`, or any cooked QICN score.

## Information Boundary

The extractor receives only `raw_trace` fields:

- time window and condition;
- candidate locus id;
- activation;
- prediction error;
- control coupling;
- event binding;
- two readout channels;
- perturbation response;
- label and narrative channels included only as negative-control distractors.

The extractor does not receive:

- latent truth;
- true self-locus id;
- genuine-self flag;
- world id;
- expected ownership;
- cooked continuity candidates;
- `self_indexed`;
- `loci[].weight`;
- precomputed QICN variables;
- expected result class.

The evaluation harness stores `latent_truth` separately and uses it only after extraction for accuracy and false-positive reporting.

## Mechanism

For each candidate locus, the extractor computes a local raw score from:

- control coupling;
- event binding;
- readout agreement between two observable readout families;
- perturbation response;
- low prediction error.

It then aggregates across windows with:

- mean local score;
- temporal rank fraction;
- activation continuity;
- within-locus dispersion penalty.

The selected locus is the top aggregate score. `QICN_SIPM` is the top-vs-runner-up margin multiplied by robustness from temporal rank and readout agreement. The support threshold remains the 6.3A candidate threshold `0.20`.

The extractor intentionally ignores `symbolic_label_intensity` and `narrative_coherence`; those channels exist to pressure label-only and narrative-only controls.

## Deliverables

| Artifact | Role |
|---|---|
| `QICN_ROADMAP_V3_PHASE6_3C_RAW_SELFLOCUS_TRACE_SCHEMA.json` | Raw trace schema with explicit information boundary. |
| `qicn_phase6_3c_selflocus_extractor.js` | Dependency-free CommonJS extractor and self-test harness. |

## Self-Test Command

Working directory:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Command:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3c_selflocus_extractor.js --self-test
```

Exit code: `0`.

## Identifiability Results

| Test | Result |
|---|---:|
| Genuine-self seeds | 60 |
| Chance accuracy | 0.25 |
| Recovery accuracy | 1.0000 |
| Recovery accuracy 95 percent bootstrap CI | `[1.0000, 1.0000]` |
| True-locus vs non-self-locus AUC | 1.0000 |

## Null-Control Results

| Control | False-self rate | Mean `QICN_SIPM` |
|---|---:|---:|
| `label_only` | 0.0000 | 0.0075 |
| `narrative_only` | 0.0000 | 0.0080 |
| `symmetric_decoy` | 0.0000 | 0.0066 |
| Aggregate | 0.0000 | 0.0074 |

False-self 95 percent bootstrap CI: `[0.0000, 0.0000]`.

## Ablation Results

The ablation replaces control coupling, event binding, readout agreement, and perturbation response with symmetric/non-informative values while preserving trace shape.

| Metric | Result |
|---|---:|
| Ablation runs | 40 |
| Mean `QICN_SIPM` before ablation | 0.4362 |
| Mean `QICN_SIPM` after ablation | 0.1936 |
| Mean drop | 0.2427 |
| Drop 95 percent bootstrap CI | `[0.2421, 0.2431]` |

The post-ablation mean falls below the candidate support threshold `0.20`.

## Residual Risks

- The synthetic genuine-self worlds are deliberately clean; recovery accuracy of 1.0 is a sanity check, not evidence of real-world identifiability.
- Only `SelfIndex` was made raw-extractor based. The remaining 6.3A QICN variables still require equivalent raw extractors.
- Threshold `0.20` is inherited from the non-canonical 6.3A protocol draft and is not canonically frozen.
- Human review is required to decide whether the raw fields faithfully instantiate Paper 8's latent-state family rather than an overly convenient toy proxy.

Status: `PHASE6_3C_SELFLOCUS_EXTRACTOR_PASS_NON_CANONICAL_HUMAN_REVIEW_REQUIRED`.
