# PRED-EXT-01 Preregistration v0

Status: draft external-candidate preregistration, not frozen, not executable.

## Boundary

This preregistration draft defines an external-facing test candidate. It is not
a result, not internal support, not external validation, and not evidence of
consciousness, phenomenality, personal identity, identity transfer, agency, or
moral status.

## Required Header

- Prediction ID: `PRED-EXT-01`
- Claim target: `external_trace_selectivity`
- Claim family: External finite-trace intervention selectivity
- Corpus source: `docs/reports/EXTERNAL_PREDICTION_CANDIDATES.md`
- Preregistration version: `v0`
- Date frozen: `not_frozen`
- Operator: `not_assigned`
- Reviewer/adjudicator: `not_assigned`
- Execution environment: `rehearsal_runner_with_trace_memory_rival_only`
- Repository commit: `not_frozen`
- Data/source manifest: `not_created`
- External replicability: `false`
- External protocol path: `docs/EXTERNAL_REPLICATION_PROTOCOL.md`
- External execution class allowed: `none_until_v1_frozen`

## Hypothesis And Rival

- Framework-side prediction: a targeted perturbation to the declared
  identity-continuity channel produces a selective transition-distribution
  shift larger than sham and off-target controls under frozen rules.
- Primary rival prediction: `RIVAL-TRACE-MEMORY-01` predicts that trace length,
  entropy, and memory-buffer continuity explain the transition-distribution
  shifts at equal or lower penalized loss.
- Secondary rivals: state-alphabet matched random control; trivial saturation
  control.
- What observation supports QICN: targeted shift exceeds the frozen selectivity
  ratio, controls remain below threshold, and the rival loses under frozen
  penalized loss.
- What observation weakens QICN: effect depends on seed choice, estimator
  instability, unmatched entropy, or nonselective degradation.
- What observation destroys the claim: the rival predicts the same external
  observable at equal or lower penalized loss, or targeted intervention fails
  to separate from sham/off-target controls.
- What result is inconclusive: missing trace manifest, non-frozen threshold,
  broken runner, or failed admissibility budget.

## Measurement Binding

| Field | Value |
|---|---|
| Measurement dictionary key | `external_trace_transition_selectivity` |
| Observable | Total-variation shift in externally observed transition distributions |
| Estimator | `TV(P_pre, P_post) = 0.5 * sum_x abs(P_pre(x)-P_post(x))` |
| Unit | distribution distance |
| Frozen threshold | `not_frozen` |
| Threshold rationale | Must be frozen before execution to prevent post-hoc selectivity tuning |
| Date frozen | `null` |
| Rehearsal trace length | `240` synthetic states per trace in `run-pred-ext-01-rehearsal.js` |
| Rehearsal minimum trace length | `N_min = 200` for the synthetic rehearsal only |
| Rehearsal rival smoothing | Laplace smoothing `lambda = 1` for `RIVAL-TRACE-MEMORY-01` rehearsal only |
| Allowed transformation | pre-declared smoothing or binning only |
| Disallowed post-hoc transformation | changing state bins, trace windows, epsilon floor, or rival matching after inspecting results |

## Dataset, Seeds, And Controls

- Dataset/scenario source: `not_created`
- Inclusion rules: finite transition traces with fixed state alphabet and
  declared intervention labels.
- Exclusion rules: corrupted traces, missing intervention labels, changed state
  alphabet after baseline, or altered trace length budget.
- Random seeds: `not_frozen`
- Run count / sample size: `not_frozen`
- Trace length and minimum trace length: `not_frozen` for evidential execution;
  the rehearsal runner uses trace length `240` and `N_min = 200` only to block
  short-trace variance artifacts.
- Primary negative controls: sham intervention; off-target channel
  intervention; entropy-matched memory control; state-alphabet matched random
  control.
- Sham controls: no-op perturbation with identical logging path.
- Off-target controls: perturb non-identity channel under matched budget.
- Rival model/control implementation: `RIVAL-TRACE-MEMORY-01` rehearsal
  implementation exists as an order-1 finite trace-memory baseline; parameters
  are not frozen for evidential execution. Rehearsal mode uses memory depth
  `1`, minimum trace length `200`, fixed state alphabet `A/B/C/D`, and Laplace
  smoothing `lambda = 1` to avoid zero-probability artifacts in short synthetic
  traces.
- Matching criteria for rivals: state count, trace length, empirical entropy,
  buffer depth, estimator family, and complexity penalty coefficient `alpha`.

## Analysis Plan

- Primary metric: `rho_selective`
- Secondary metrics: raw targeted total variation; sham total variation;
  off-target total variation; rival penalized loss.
- Multiplicity correction: not frozen.
- Alpha or decision threshold: not frozen.
- Power analysis / minimum detectable effect: not available in v0.
- Missing-data rule: any missing primary trace artifact blocks execution.
- Outlier rule: not frozen.
- Runtime/admissibility budget: synthetic rehearsal runner exists with an
  executable trace-memory rival; evidential runtime remains blocked until
  threshold, dataset, rival parameters, alpha, minimum trace length, smoothing
  policy, and exclusions are frozen.
- Contamination checks: verify no intervention labels leak into rival training
  or estimator selection.
- Abort conditions: changed threshold after traces are generated; missing rival
  result; non-matched entropy; untracked seed change; trace length below the
  frozen admissibility budget; smoothing policy changed after observing traces.

## Decision Record

No evidential decision record exists. The rehearsal runner
`npm run rehearse:pred-ext-01` may write
`artifacts/pred-ext-01/rehearsal_run_001/decision_record.json`, but that record
is explicitly `pipeline_rehearsal_not_evidence` and cannot support or destroy
the claim. Required future evidential fields:

| Decision Slot | Required Entry |
|---|---|
| Support / weakening / destruction / inconclusive | |
| Primary evidence artifact | |
| Negative-control result | |
| Rival result | |
| Threshold deviations | |
| Exclusions applied | |
| Reproducibility status | |
| External replication status | |
| Claim ledger update required | |
| FCR update required | |

## Anti-Inflation Clause

Even a future positive result would only support a finite trace-selectivity
claim under a frozen toy-scale protocol. It would not validate the full QICN
framework and would not prove consciousness, phenomenality, personal identity,
identity transfer, agency, moral status, or human equivalence.
