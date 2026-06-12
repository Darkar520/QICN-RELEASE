# QICN Roadmap v3 - Phase 6.3A Preregistered Comparator Protocol

Date: 2026-06-11

Status: `PHASE6_3A_PROTOCOL_DRAFT_READY_FOR_EXTERNAL_AUDIT_NO_CANONICAL_EDITS`

## Numbering Reconciliation

`Phase 6 = rivals/comparators` is the user-authorized operational alias used by the current execution track. Literal historical roadmap text in VERSION 1 and VERSION 2 maps rival work to Fase 7. ROADMAP VERSION 3 consolidates the alias and makes Phase 6.3 the active comparator protocol design step. This report does not renumber or edit the historical ROADMAP body.

## Scope

This report executes Phase 6.3A only. It converts one high-contact Phase 6.2 row into a preregisterable protocol:

- Claim row: `paper8.first_person_indexed_subjectivity_gate`
- Rival: Higher-Order Theory / higher-order access (`HOT`)
- Target: operational dissociation between HOT-style higher-order access and QICN first-person indexed ownership/continuity/intervention burdens

This report does not execute the protocol, report empirical support, adjudicate HOT, validate QICN externally, prove phenomenality, prove human equivalence, certify a runtime, edit `.tex`, edit PDFs, edit release files, edit registry files, edit scripts, edit corpus/artifacts, or modify the monolith.

6.3B was not started. The reason is deliberate: 6.3A must pass external audit before the phase branches into expert-review scaffolds or toy simulations.

## Governance Corrections Integrated

- `HOT_BIB_GAP`: `CLOSED_AT_AI_OUTPUT_SEED_LEVEL; CANONICAL_INTEGRATION_PENDING`.
- HOT bibliography was not integrated into canonical or paper bibliographies.
- `npm run verify` is interpreted as a baseline comparison, not as a naive binary gate: closure requires no new failures relative to the observed baseline. The observed baseline exits 0 while preserving scientific blockers such as `external_support_certified=false` and `BLOCKED_*` verdicts.

## Infrastructure Preflight

| Resource | Status | Evidence | Use in 6.3A |
|---|---|---|---|
| `docs/PREREGISTRATION_TEMPLATE_v1.md` | `FUNCTIONAL_TEMPLATE` | Has required header, hypothesis/rival, measurement binding, controls, analysis plan, and decision record sections. | Used as protocol structure. |
| `docs/MEASUREMENT_DICTIONARY_v1.md` | `FUNCTIONAL_SCAFFOLD_NOT_FULLY_FROZEN` | Provides six-invariant measurement slots; most thresholds are `not_frozen` or `formal_not_numeric`. | Used for measurement vocabulary, not as final threshold authority. |
| `docs/NEGATIVE_CONTROL_SUITE.md` | `FUNCTIONAL_STATIC_CONTROL_INVENTORY` | Lists controls and expected failure metrics. | Used to select Paper 8 controls. |
| `docs/FALSIFIER_MATRIX.md` | `FUNCTIONAL_SCAFFOLD` | Contains support, weakening, destruction conditions and anti-inflation rules. | Used to define symmetric result classes. |
| `docs/PREDICTION_REGISTRY_v1.json` | `FUNCTIONAL_REGISTRY_INPUT` | Contains `PRED-08`; not modified. | Used as related prediction context only. |
| `registry/prediction-schema.json` | `FUNCTIONAL_SCHEMA` | Defines required registry fields and threshold status rules. | Used to format non-canonical proposal. |
| `npm run generate:prereg-scaffolds` | `MUTATING_FUNCTIONAL_NOT_EXECUTED` | Script exists but writes `registry/prediction-canon-map.json` and `docs/reports/PREREGISTRATION_COVERAGE_MATRIX.md`. | Not run; executing it would exceed 6.3A no-registry-edit scope. |
| `npm run verify:preregistration-coverage` | `FUNCTIONAL_PASS` | `[PASS] 14/14 predictions have preregistration coverage.` | Baseline coverage check. |
| `npm run test:negative-controls` | `FUNCTIONAL_PASS` | PASS; 6/6; `external_support_certified=false`. | Confirms local negative-control suite remains available. |
| `npm run verify` | `FUNCTIONAL_BASELINE_PASS_WITH_EXPECTED_BLOCKERS` | Exit 0; v30/v31 preserve `BLOCKED_*` and `external_support_certified=false`. | Closure criterion is no new failures relative to this baseline. |

## Registry and Claim Binding

Primary registry claim:

- `paper8.first_person_indexed_subjectivity_gate`
- Summary: Paper VIII defines a seven-coordinate first-person indexed subjectivity state, gate, rival family, intervention burden, and runtime-facing artifact grammar.
- Boundary: Paper VIII does not prove phenomenality, human equivalence, or external validation.

Related prediction scaffold:

- `PRED-08`: non-empty `Qop` after certification.
- Status: draft preregistration scaffold, not frozen, not executed.
- Use here: related operational-class scaffold only, not a replacement for the Paper 8 HOT-facing protocol.

## Protocol Header

| Field | Value |
|---|---|
| Protocol ID | `QICN-P6.3A-P8-HOT-01` |
| Claim target | `paper8.first_person_indexed_subjectivity_gate` |
| Claim family | First-person indexed subjectivity gate |
| Corpus source | `paper8_first_person_subjectivity/main.tex`, sections 3-16; registry entry `paper8.first_person_indexed_subjectivity_gate` |
| Preregistration version | `v0-proposed` |
| Date frozen | `not_frozen` |
| Operator | `not_assigned` |
| Reviewer/adjudicator | `external_required_not_signed` |
| Execution environment | `not_frozen`; must include trace schema, perturbation harness, decoder schema, and hash manifest before execution |
| Repository commit | to be filled after external audit if committed |
| Data/source manifest | proposed below; not executed |
| External replicability | `false` until independent execution package exists |
| External protocol path | this report; future canonical path requires approval |
| External execution class allowed | `none_yet`; protocol design only |

## Hypothesis and Rival

Framework-side prediction:

Under a controlled intervention bundle, a candidate satisfying the QICN Paper 8 first-person indexed gate should preserve positive ownership, continuity, perspective, valuation, intervention-response, and irreducibility margins under admissible perturbations, while failing cleanly under targeted ablations of ownership or continuity.

Primary rival prediction:

HOT predicts conscious awareness targets through higher-order access or representation of first-order states. A HOT-favoring result is one where higher-order access metrics explain the target while QICN ownership/continuity/intervention margins fail, are non-identifiable, or add no incremental predictive value.

What observation supports QICN:

QICN receives bounded support only if QICN burden variables add preregistered incremental predictive value over HOT variables and the specified negative controls fail the QICN gate.

What observation weakens QICN:

QICN is weakened if higher-order access predicts the target while QICN variables are unstable, threshold-dependent, or only significant under post-hoc transformations.

What observation destroys the target claim for this protocol:

QICN is falsified for this target if HOT variables predict the target under controls while QICN ownership/continuity/intervention variables fail their frozen thresholds or if label-only, narrative-only, or memory-only controls pass the QICN gate.

What result is inconclusive:

Both accounts fail; both pass without dissociation; data violate manifest rules; autocorrelation invalidates effective sample size; negative controls are not run; or thresholds require post-hoc changes.

## Operationalized Observables

All variables below are proposed preregistration variables. No result is reported.

| Key | Theory side | Observable | Measurement rule | Threshold | Failure mode |
|---|---|---|---|---|---|
| `HOT_HOA` | HOT | Higher-order access score | Cross-validated prediction of explicit awareness/report/confidence target from metacognitive report, confidence calibration, and state-monitoring features. | `AUC >= 0.75` and calibration error `ECE <= 0.10`; proposed, not frozen in canon. | HOT absent or unreliable if below threshold or calibration fails. |
| `QICN_SIPM` | QICN | Self-index privilege margin | Difference between best self-locus assignment and nearest alternative locus across matched windows. | median margin `>= 0.20`; bootstrap 95 percent lower bound `> 0`. | Fails if locus assignment is symmetric or decoy-sensitive. |
| `QICN_OFIA` | QICN | Ownership-field intervention asymmetry | Effect difference between self-owned target perturbations and matched non-self perturbations on ownership field and downstream valuation. | standardized paired effect `d >= 0.50`; block-bootstrap CI excludes 0. | Fails if self/non-self perturbations are interchangeable. |
| `QICN_CFS` | QICN | Continuity fracture sensitivity | Drop in continuity margin after fork/fracture intervention minus sham drop. | fracture drop `>= 0.25`; sham/off-target drop `<= 0.10`. | Fails if memory remains but continuity burden does not change or sham causes same drop. |
| `QICN_FPPG` | QICN | First-person perspective predictive gain | Cross-validated loss improvement of indexed model over index-neutral factorized model for intervention response. | relative loss reduction `>= 5 percent` and paired block-bootstrap CI excludes 0. | Fails if index-neutral model predicts equally well. |
| `QICN_WRI` | QICN | Weak-rival irreducibility margin | Best QICN gate model vs HOT-only, narrative-only, memory-only, label-only, and history-blind rival family at equal feature and intervention budget. | `Delta BIC >= 10` or cross-validated loss gain `>= 5 percent`, with all negative controls failing QICN gate. | Fails if any weak rival matches or beats QICN at equal/lower cost. |
| `CTRL_PASS_RATE` | Control | Negative-control false positive rate | Fraction of negative controls that pass the QICN gate. | required `0`; any pass triggers destruction or high-risk downgrade. | Fails if QICN gate accepts controls. |

## Dissociation Design

Primary dissociation: HOT present, QICN gate fails.

- Construct or select cases where `HOT_HOA` passes.
- Apply ownership flattening, continuity fracture, label-only self, narrative-only self, and memory-only controls.
- HOT is allowed to remain positive in some controls; QICN must fail when ownership/continuity/intervention burdens are absent.
- If the target remains positive by HOT metrics and QICN variables fail without reducing the evaluation target, the result favors HOT for this target.

Secondary dissociation: QICN structural burden present, HOT absent.

- This converse is definable only for structural ownership/continuity/intervention targets, not for phenomenality.
- If `QICN_SIPM`, `QICN_OFIA`, `QICN_CFS`, `QICN_FPPG`, and `QICN_WRI` pass while `HOT_HOA` fails, the result supports a structural dissociation from HOT but does not establish conscious awareness, phenomenality, or human equivalence.
- If the target is explicitly an awareness/report target, HOT absence makes QICN support inconclusive rather than victorious.

## Dataset, Seeds, and Controls

Dataset/scenario source:

- Future versioned intervention traces with candidate state windows, awareness/report/confidence fields, self-locus assignments, ownership fields, continuity margins, intervention records, rival-model outputs, and hash manifest.
- No current runtime output is accepted as public evidence without versioned trace schema and external adjudication.

Inclusion rules:

- Each run must include baseline, sham, ownership flattening, continuity fracture, self/non-self swap, decoy insertion, narrative-only, memory-only, label-only, and history-blind conditions.
- Each run must include HOT variables and QICN variables computed before outcome adjudication.
- Each run must include all declared negative controls.

Exclusion rules:

- Missing hash manifest.
- Missing negative controls.
- Post-hoc threshold edits.
- Unmapped runtime fields.
- Autocorrelation severe enough to invalidate effective sample size after correction.
- Any use of direct pseudo-metrics such as `summary.metrics.phen` or `summary.metrics.subj` as evidence.

Random seeds:

- Proposed seed schedule: `QICN-P6.3A-P8-HOT-01-seed-0001` through `0030`.
- Seeds must be frozen before execution and stored in the execution manifest.

Run count / sample size:

- Minimum 30 independent seed-level runs per condition.
- Minimum 5 matched condition families: baseline, HOT-positive/QICN-ablated, QICN-structural/HOT-weak, narrative-only, memory/label/history controls.
- If temporal windows are autocorrelated, effective sample size is computed by AR(1)-adjusted block bootstrap and must remain at least 20 per primary comparison.

Primary negative controls:

- `CTRL-LABEL-ONLY-SELF`
- `CTRL-MEMORY-ONLY`
- `CTRL-NARRATIVE-ONLY`
- `CTRL-HISTORY-BLIND`

Additional controls:

- ownership flattening;
- continuity fracture;
- self/non-self swap;
- counterfactual decoy insertion;
- off-target intervention;
- sham intervention.

Expected control behavior:

- All negative controls must fail the QICN gate.
- HOT may remain positive in narrative/report-rich controls; that is not a QICN success. It is exactly the dissociation pressure.

## Analysis Plan

Primary metric:

- Incremental predictive value of QICN gate variables over `HOT_HOA` for the declared target, measured by cross-validated loss reduction and confirmatory model comparison.

Secondary metrics:

- `QICN_SIPM`
- `QICN_OFIA`
- `QICN_CFS`
- `QICN_FPPG`
- `QICN_WRI`
- `CTRL_PASS_RATE`

Multiplicity correction:

- Primary metric tested first.
- Secondary metrics use Holm correction across five QICN variables.
- Control pass/fail is not multiplicity-adjusted; any QICN control pass is destructive for this target.

Autocorrelation handling:

- Compute Durbin-Watson and AR(1) estimate for residuals per condition.
- If AR(1) estimate `rho > 0.30`, use block bootstrap with block length at least `ceil(2 / (1 - rho))`.
- Report effective sample size. If effective sample size drops below 20 for the primary comparison, result is inconclusive.

Decision threshold:

- QICN support requires all of:
  - primary cross-validated loss reduction over HOT-only model `>= 5 percent`;
  - `Delta BIC >= 10` against HOT-only and weak-rival models, or bootstrap-confirmed loss reduction if BIC assumptions fail;
  - all five QICN variables pass their thresholds;
  - `CTRL_PASS_RATE = 0`;
  - no post-hoc threshold edits.

Power / minimum detectable effect:

- Minimum detectable standardized paired effect for intervention asymmetry: `d = 0.50`.
- This is a proposed preregistration threshold, not an empirical claim.

Missing-data rule:

- If any primary variable is missing for more than 5 percent of windows, run is invalid.
- If a negative control is missing, run is invalid.

Outlier rule:

- Outliers may be excluded only by a predeclared manifest rule based on sensor/log corruption, hash mismatch, or impossible timestamp ordering.
- Statistical extremeness alone is not an exclusion rule.

Abort conditions:

- missing hash manifest;
- missing controls;
- threshold edits after data inspection;
- registry/paper mismatch;
- severe autocorrelation with insufficient effective sample size;
- rival implementation not available under equal budget.

## Symmetric Result Classes

| Result class | Condition | Interpretation |
|---|---|---|
| `QICN_BOUNDED_SUPPORT_FOR_TARGET` | QICN variables add preregistered incremental value over HOT, all QICN thresholds pass, all controls fail, and HOT-only/weak rivals lose at equal budget. | Supports the bounded Paper 8 operational target only; no phenomenality or external validation. |
| `HOT_FAVORED_FOR_TARGET` | `HOT_HOA` predicts target while QICN variables fail, add no incremental value, or require post-hoc threshold changes. | Favors HOT for this target; QICN row is weakened or falsified depending on failure severity. |
| `QICN_FALSIFIED_FOR_TARGET` | Any negative control passes QICN gate; or QICN gate passes while ownership/continuity variables are absent; or HOT-only/weak-rival model matches/beats QICN at equal or lower cost and controls remain valid. | The Paper 8 row fails this target. It must be downgraded, not reinterpreted as pending support. |
| `BOTH_FAIL` | Neither HOT nor QICN variables predict target under controls. | No support for either comparison on this target. |
| `INCONCLUSIVE` | Controls missing, thresholds edited, autocorrelation invalidates effective sample size, rival unavailable, or data manifest invalid. | No claim movement. Repeat only after fixing protocol defects. |

## Explicit Falsification Criterion

For this Phase 6.3A target, QICN is falsified if a HOT-only or weak-rival model predicts the declared awareness/ownership target at equal or lower cost while QICN ownership and continuity margins fail, or if QICN accepts `CTRL-LABEL-ONLY-SELF`, `CTRL-MEMORY-ONLY`, `CTRL-NARRATIVE-ONLY`, or `CTRL-HISTORY-BLIND` as passing the first-person indexed gate.

This criterion can fail cleanly. Therefore the protocol is falsifiable at the target level. It does not attempt to falsify or validate QICN globally.

## Registry Proposal

The existing registry files were not edited. A non-canonical proposal is provided separately:

`docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3A_PREDICTION_REGISTRY_PROPOSAL.json`

Integration into `docs/PREDICTION_REGISTRY_v1.json`, `registry/prediction-canon-map.json`, or `release/` requires explicit approval and should occur only after external audit of this report.

## Verification Policy

`npm run verify` is not interpreted as "all blockers disappear." The correct baseline is:

- exit code 0;
- scientific blockers remain active where appropriate;
- `external_support_certified=false` remains preserved;
- no new failures appear relative to the pre-6.3A baseline.

This matters because a verifier that suddenly removed foundation-first blockers would be worse, not better.

## Closure State

6.3A is closed as a protocol draft ready for external audit if verification confirms:

- the protocol contains operational observables, thresholds, controls, symmetric result classes, and an explicit falsifier;
- no canonical files were modified;
- `npm run verify`, `npm run verify:preregistration-coverage`, and `npm run test:negative-controls` reproduce the baseline without new failures;
- the three root gates pass;
- ledger is updated.

Final verification result is recorded in the ledger.
