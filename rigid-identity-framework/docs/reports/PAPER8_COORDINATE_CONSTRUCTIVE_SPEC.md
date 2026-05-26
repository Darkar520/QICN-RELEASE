# Paper 8 Coordinate Constructive Specification v1

Status: FCR v13 constructive-spec scaffold.

Date: 2026-05-25

## Boundary

This specification proposes computable estimators for three Paper 8 coordinates.
It does not execute those estimators, freeze thresholds, validate subjectivity,
prove consciousness, prove phenomenality, or certify any concrete system.

## Shared Input Contract

A toy or runtime system must provide a trace bundle:

```text
TraceBundle = {
  states: z_t,
  event_set: E_t,
  declared_self_channel: c_self,
  intervention_labels: u_t,
  readout_windows: h_t,
  rival_predictions: M_rival,
  candidate_predictions: M_subj
}
```

The bundle is admissible only if state alphabet, trace length, intervention
labels, and rival definitions are frozen before computing coordinate values.

## Coordinate 1: Self-Index

Registry target: `paper8:definition:def-selfindex`

### Constructive Estimator

Let `C` be the declared family of candidate loci. For each locus `c in C`,
compute a continuity score from externally visible trace windows:

```text
cont(c) = 1 - normalized_prediction_error(h_{t+1}(c) | h_t(c), u_t)
```

Define:

```text
SelfIndex_hat(c_self) =
  softmax_beta(cont(c_self) - max_{c != c_self} cont(c))
```

### Failure Case

`SelfIndex_hat` should fail or remain near baseline when relabeling candidate
loci changes the preferred locus without changing transition evidence.

### Positive Toy Case

A finite transition system with one channel whose future trace is selectively
disrupted by self-channel perturbation while matched non-self channels remain
stable should yield a positive self-index estimate.

### Rival

Label-only self model: a system with a hard-coded self label but no selective
transition or intervention response.

### Limit

This estimator measures privileged trace continuity, not metaphysical selfhood.

## Coordinate 2: Ownership Field

Registry target: `paper8:definition:def-ownership`

### Constructive Estimator

For each event `e in E_t`, compare the effect of perturbing `e` when it is
attached to the declared self channel versus a matched non-self channel:

```text
OwnField_hat(e) =
  sigmoid_beta(
    Delta_self(e) - Delta_nonself_matched(e)
  )
```

where `Delta` is the total-variation shift in the next-window transition
distribution under a frozen intervention budget.

### Failure Case

Ownership fails when event labels change reports but do not change selective
transition response under matched perturbations.

### Positive Toy Case

An event that selectively changes the future transition distribution only when
attached to `c_self`, while a matched non-self copy does not, should score
positive.

### Rival

Static bookkeeping model: ownership is represented as a label table with no
intervention-sensitive dynamics.

### Limit

This estimator measures selective ownership-like coupling in traces, not
ordinary subjective ownership.

## Coordinate 3: Irreducibility Margin

Registry target: `paper8:definition:def-irred`

### Constructive Estimator

Let `M_subj` be the full Paper 8 model and `WeakClosure` the frozen rival
family. Define:

```text
Irred_hat(S, tau) =
  (min_{M in WeakClosure} Loss(M, tau) - Loss(M_subj, tau))
  / (1 + min_{M in WeakClosure} Loss(M, tau))
```

Loss must include:

- baseline prediction error;
- intervention prediction error;
- selective-pattern error;
- complexity penalty.

### Failure Case

Irreducibility fails when a weak rival reaches equal or lower penalized loss on
the same frozen baseline and intervention tasks.

### Positive Toy Case

A finite transition system whose targeted intervention profile cannot be
matched by memory-only, report-only, or label-only rivals under the same
complexity penalty may yield a positive irreducibility estimate.

### Rival

Best member of the frozen weak closure. If the weak closure is not frozen, the
irreducibility estimate is inadmissible.

### Limit

This estimator is abductive and model-relative. It does not prove metaphysical
irreducibility.

## Known Edge Cases

### High-Entropy Self-Index Collapse

If all candidate loci have high intrinsic entropy or uniformly poor
predictability, then `cont(c_self) - max_{c != c_self} cont(c)` can collapse
toward zero even when a declared self channel exists in the implementation. In
that case `SelfIndex_hat` must abstain or remain weakening-only unless a frozen
variance/entropy guard shows that channel predictability is admissible.

Required mitigation before execution:

- freeze the entropy or variance admissibility guard before observing target
  traces;
- report an abstention, not support, when all channels are prediction-noise
  dominated;
- run matched high-entropy negative controls.

### Irreducibility Alpha Instability

`Irred_hat` depends on the complexity penalty coefficient used inside
`Loss(M, tau)`. If the coefficient is too low, over-parameterized weak rivals
can overfit the traces. If it is too high, the full model can win by penalty
choice rather than by explanatory advantage.

Required mitigation before execution:

- freeze the complexity penalty coefficient or the cross-validation rule before
  touching the adjudication traces;
- record the frozen value in the relevant preregistration;
- classify any post-hoc alpha adjustment as invalidating the run.

## Required Gate

The `verify:coordinate-specs` gate must reject any coordinate spec that lacks:

- estimator;
- input contract;
- failure case;
- positive toy case;
- rival;
- epistemic limit.
