# External Prediction Candidates v1

Status: FCR v15 candidate registry with internal synthetic pilot.

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
   consciousness, phenomenality, personal identity, or external adjudication.

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

For the v15 internal synthetic pilot only, `rho_selective_threshold = 2.0`
is frozen in `docs/preregistrations/PRED-EXT-01_freeze_v1.json`. This value
does not freeze an external adjudication threshold. It is a low-inference
internal harness threshold used to test whether the pipeline can produce a
clean support/destruction decision under fixed rules.

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

FCR v14-final-prep hardens the rehearsal version of this rival with a minimum
trace-length guard (`N_min = 200`) and Laplace smoothing (`lambda = 1`) so that
the toy runner does not treat short-trace variance or unseen states as
evidential defeat. FCR v15 freezes those same values for the internal synthetic
pilot, together with trace length `240`, state alphabet `A/B/C/D`,
`penalized_loss_alpha = 0.05`, and `rival_loss_floor = 0.05`. They remain
internal synthetic pilot parameters, not external adjudication parameters. FCR
v17 adds a stronger internal clean-room synthetic criterion: scenario models are
declared in `PRED-EXT-01_freeze_v3.json`, the generator is generic over those
models, a holdout seed is required, and the rival suite tests Markov depths
`1`, `2`, and `3`.

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

`PRED-EXT-01` is admitted into the prediction registry as an external candidate
with one executed internal synthetic pilot. FCR v13.1 adds a synthetic rehearsal
runner (`npm run rehearse:pred-ext-01`) that writes a blocked decision record
for the observable pipeline. FCR v14-core upgrades the rehearsal from a static
rival distribution to an executable order-1 finite trace-memory rival trained
on the baseline trace only. FCR v14-final-prep adds the short-trace guard,
smoothing policy, and a unit test gate for that rival.

FCR v15 adds a frozen internal synthetic pilot (`npm run pilot:pred-ext-01`).
The pilot satisfies the support rule on the positive synthetic panel
(`rho_selective = 3.0`, threshold `2.0`) and the memory-only negative control
does not satisfy the support rule (`rho_selective = 0.0`). This is useful
internal evidence that the harness can apply frozen rules and reject a negative
control. It is not empirical support, not external adjudication, and not
support for consciousness, phenomenality, personal identity, agency, moral
status, or the full QICN framework.

FCR v16 adds a seeded clean-room synthetic run
(`npm run cleanroom:pred-ext-01`) with a generator separated from the evaluator
and a reviewer quarantine gate (`npm run review:cleanroom-pred-ext-01`). The
clean-room synthetic run passes the positive panel and five negative controls.
This closes the v15 trivial-control objection at the harness level, but still
does not count as empirical support or external adjudication. The candidate
remains blocked for external adjudication until a non-synthetic dataset,
external threshold freeze, exclusion rules, independent adjudicator, and
clean-room decision record exist.

FCR v17 hardens that result against two adversarial objections. First, the
generator no longer stores scenario-specific distribution branches; it reads
generic role models from the freeze, and `npm run audit:generator-independence`
checks that frozen scenario IDs do not leak into generator source. Second, the
support rule is evaluated against trace-memory rivals with memory depth `1`,
`2`, and `3`, and must pass both the primary seed and the holdout seed. This is
stronger synthetic support, not empirical support.
