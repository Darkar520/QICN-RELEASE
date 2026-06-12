# QICN Roadmap v3 - Phase 6.3B-1 Candidate Operationalization of Paper 8 Primitives

Date: 2026-06-11

Status: `PHASE6_3B1_CANDIDATE_OPERATIONALIZATION_NON_CANONICAL_HUMAN_REVIEW_REQUIRED`

## Boundary

This document closes the Phase 6.3B-1 bottleneck at AI-output level only. It proposes candidate numerical operationalizations for Paper 8 primitives so the Phase 6.3A protocol can become executable in toy and future preregistration settings.

It does not canonize primitives, edit Paper 8, edit registry/release files, validate consciousness, validate phenomenality, certify any runtime, or claim human equivalence.

Every primitive below carries:

- `status: candidate_operationalization_non_canonical`
- `human_review: REQUIRED`
- `human_curated_status: not_reviewed`

## Source Anchors

Paper 8 source: `paper8_first_person_subjectivity/main.tex`.

Key anchors:

- Lines 173-211: formal definitions of self-index, ownership field, continuity margin, perspective organization, asymmetric valuation, intervention profile, and irreducibility margin.
- Lines 232-252: typing discipline and normalized horizon-level coordinates.
- Lines 1271-1357: canonical estimator family for subjectivity coordinates and composite gate design.
- Lines 1436-1472: ablation matrix and causal discrimination ordering.

## Common Trace Schema

The shared trace schema is:

`docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3B1_TRACE_SCHEMA.json`

It is intentionally aligned with the style of `scripts/lib/external-trace-generator.js`:

- deterministic seed;
- declared trace length/windows;
- named conditions and roles;
- explicit intervention families;
- no hidden access to private runtime state.

It does not reuse the production trace generator because Phase 6.3B is non-canonical AI-output machinery and must not repair or modify production scripts.

## Candidate Primitive Rules

| Primitive | Paper 8 formal anchor | Candidate numerical rule | Input fields | Output | Assumptions and deviations |
|---|---|---|---|---|---|
| `SelfIndex` / self-locus privilege | Definition lines 173-179; estimator lines 1274-1283 | For each window, sort `loci.weight`; compute `(top - second)_+ * (1 - relabeling_distance)_+`; average over windows. | `windows[].loci`, `windows[].relabeling_distance` | `QICN_SIPM` in `[0,1]` | Assumes latent candidates are already enumerated and normalized. Does not solve latent-state discovery. |
| `OwnField` / ownership coherence | Definition lines 181-187; estimator lines 1285-1299 | Per event, compute closeness to expected ownership and distance from control ownership: `1 - MAE(ownership, expected) - lambda * (1 - MAE(ownership, control))`, clamped to `[0,1]`; average over windows. | `windows[].events[].ownership`, `expected_ownership`, `control_ownership` | `QICN_OWN` in `[0,1]` | Uses a control-distance correction to match the prose intent that bookkeeping-like controls not score high. This is a candidate implementation of the estimator, not a canonical restatement. |
| `ContField` / autobiographical continuity gap | Definition lines 189-191; estimator lines 1301-1309 | For each window, identify the self-indexed trajectory candidate and best rival; compute `(self_score - best_rival_score)/(1 + self_score)`, clamped to `[0,1]`; average over windows. | `windows[].continuity_candidates` | `QICN_CONT` in `[0,1]` | Assumes trajectory candidates and scores are supplied by a prior extractor. Does not define that extractor. |
| `Persp` / first-person perspective gain | Definition lines 193-195; estimator lines 1311-1319 | Compute `(loss_third_person - loss_first_person)/(1 + loss_third_person)`, clamped to `[0,1]`; average over windows. | `windows[].losses.first_person`, `windows[].losses.third_person` | `QICN_FPPG` in `[0,1]` | Treats loss fields as precomputed by matched factorization models. Does not choose the models. |
| `ValAsym` / asymmetric valuation | Definition lines 197-199; estimator lines 1321-1330 | Compute `(mean(self_response) - mean(nonself_response))/(1 + mean(self_response))`, clamped to `[0,1]`. | `windows[].valuation.self_response`, `windows[].valuation.nonself_response` | `QICN_VAL` in `[0,1]` | Assumes matched self/non-self perturbation families. Negative asymmetry collapses to zero in the gate. |
| `IntervProf` / intervention selectivity | Definition lines 201-207; estimator lines 1332-1346 | Fraction of interventions where every intended coordinate drop is at least `theta_u=0.25` and `off_target_max <= eta_u=0.10`. | `interventions[].intended_coordinates`, `coordinate_drops`, `off_target_max` | `QICN_INTERV` in `[0,1]` | Fixes candidate thresholds from 6.3A. Thresholds are not canonical and require external preregistration. |
| `Irred` / weak-rival irreducibility | Definition lines 209-211; estimator note lines 1348-1349 | Compute `(best_weak_rival_loss - qicn_full_loss)/(1 + best_weak_rival_loss) - complexity_penalty`, clamped to `[0,1]`; default penalty `0.02`. | `windows[].losses.qicn_full`, `windows[].losses.best_weak_rival` | `QICN_WRI` in `[0,1]` | Uses a fixed toy complexity penalty. Real use must freeze model class and penalty before execution. |
| Composite gate | Lines 1351-1357 | Strict gate is `min(SelfIndex, OwnField, ContField, Persp, ValAsym, IntervProf, Irred)`; scalar score is geometric mean. | seven primitive scores | `QICN_GATE_MIN`, `QICN_GATE_SOFT` in `[0,1]` | Follows Paper 8 preference for strict minimum as membership gate and geometric mean as scalar ordering. |

## Relation to 6.3A Variables

| 6.3A variable | Source primitive(s) | Candidate implementation |
|---|---|---|
| `QICN_SIPM` | `SelfIndex` | self-locus privilege margin above. |
| `QICN_OFIA` | `OwnField` + `ValAsym` | minimum of ownership coherence and valuation asymmetry, plus intervention records for self/non-self targeting. |
| `QICN_CFS` | `ContField` under continuity fracture vs sham | baseline continuity minus fracture continuity, net of sham drop. |
| `QICN_FPPG` | `Persp` | first-person predictive loss gain. |
| `QICN_WRI` | `Irred` | weak-rival loss margin. |
| `CTRL_PASS_RATE` | Composite gate over negative-control traces | fraction of selected negative controls whose `QICN_GATE_MIN >= 0.20`. |

## Required Human Review Questions

1. Are the supplied trace fields sufficient to represent Paper 8's latent families without smuggling in the conclusion?
2. Is the ownership-control correction faithful to the formal estimator, or should the paper's formula be used literally despite the bookkeeping risk?
3. Are `theta_u=0.25`, `eta_u=0.10`, and gate threshold `0.20` defensible as preregistration candidates?
4. Is the irreducibility penalty class complete enough to compare HOT-only, narrative-only, memory-only, label-only, and history-blind rivals?
5. Does the toy trace schema omit any coordinate needed by Paper 8's bridge axioms or intervention family?

## Closure Reading

6.3B-1 is closed at candidate-operationalization level because each primitive has:

- formal source anchor;
- numerical candidate rule;
- input/output specification;
- explicit assumptions and deviations;
- common executable trace schema;
- non-canonical and human-review status.
