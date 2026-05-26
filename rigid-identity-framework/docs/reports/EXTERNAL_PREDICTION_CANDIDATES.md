# External Prediction Candidates v1

Status: FCR v13 candidate registry.

Date: 2026-05-25

## Boundary

This file identifies candidate predictions with observables that can be stated
without adopting the internal QICN certification vocabulary. It does not report
execution, support, empirical validation, consciousness, phenomenality,
identity transfer, agency, moral status, or external adjudication.

## Selection Rule

An external prediction candidate must satisfy all of the following before it can
enter `docs/PREDICTION_REGISTRY_v1.json`:

1. The observable is measurable from traces, artifacts, or instruments that do
   not require accepting QICN class labels.
2. The manipulation can be specified before execution.
3. At least one named rival makes a contrary prediction on the same observable.
4. Support, weakening, and destruction conditions are stated before execution.
5. Thresholds are either frozen or explicitly marked `not_frozen`.
6. The epistemic limit states that a positive result is not proof of
   consciousness, phenomenality, personal identity, or external validation.

## Accepted Candidate: PRED-EXT-01

### Target

Finite controlled transition system with externally observable traces.

The target is deliberately toy-scale. This is a strength for the first external
candidate: a reviewer can inspect the state alphabet, transition traces,
intervention logs, and rival outputs without accepting the broader QICN
ontology.

### Observable

The primary observable is the total-variation change in externally observed
transition distributions:

```text
TV(P_pre, P_post) = 0.5 * sum_x |P_pre(x) - P_post(x)|
```

The selectivity ratio is:

```text
rho_selective =
  TV(targeted_pre, targeted_post)
  / max(TV(sham_pre, sham_post), TV(off_target_pre, off_target_post), epsilon_floor)
```

No numeric threshold for `rho_selective` is frozen in this artifact.

### Manipulation

Apply a targeted perturbation to the declared identity-continuity channel while
preserving:

- trace length,
- state alphabet,
- gross activity budget,
- estimator family,
- entropy-matching protocol for the rival.

### Rival

`RIVAL-TRACE-MEMORY-01`: a trace-memory / entropy-only rival matched on state
count, trace length, empirical entropy, and buffer depth.

### Support Condition

The targeted intervention produces a reproducible selectivity ratio above the
frozen threshold, sham/off-target controls stay below threshold, and the
trace-memory rival has higher penalized loss on the same external observable.

### Weakening Condition

The effect appears only under favorable seeds, unstable estimator choices,
unmatched entropy, or post-hoc adjustment of the perturbation panel.

### Destruction Condition

The trace-memory rival predicts the transition-distribution observable at equal
or lower penalized loss, or the targeted intervention fails to separate from
sham/off-target controls under frozen rules.

## Deferred Candidates

| Candidate | Reason deferred |
|---|---|
| Human behavioral comparator | Too high-risk and ethically loaded before toy-scale external traces are clean. |
| Biological substrate comparison | Would invite substrate overclaim before class-preservation thresholds are frozen. |
| LLM self-report intervention | Too confounded by narrative/report channels for the first external seed. |

## Current Decision

`PRED-EXT-01` is admitted into the prediction registry only as
`external_candidate_not_executed`. FCR v13.1 adds a synthetic rehearsal runner
(`npm run rehearse:pred-ext-01`) that writes a blocked decision record for the
observable pipeline. FCR v14-core upgrades the rehearsal from a static rival
distribution to an executable order-1 finite trace-memory rival trained on the
baseline trace only. That rehearsal is still not evidence and cannot be cited
as support. The candidate remains non-executable as a scientific test until a
frozen threshold, dataset, frozen rival parameters, external protocol, and
evidential decision record exist.
