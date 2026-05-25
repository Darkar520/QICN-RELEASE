# QICN Measurement Dictionary v1

Status: FCR v10 Pass 2 scaffold.  
Date: 2026-05-25.  
Scope: Paper 5 invariants and Paper 6 prediction terms used by
`PREDICTION_REGISTRY_v1.json` and `FALSIFIER_MATRIX.md`.

## Governance Boundary

This dictionary binds formal terms to measurement slots. It does not report new
experiments, freeze final runtime thresholds, certify any present system as
conscious, prove phenomenality, or provide external validation.

When a metric is listed as `not_frozen`, it is not a decision boundary. It is a
slot that must be filled by a future preregistration package before execution.
No threshold may be treated as frozen unless it has value, rationale,
date_frozen, source, and modification_log.

## Six-Invariant Measurement Surface

| Invariant | Formal role | Measurement slot | Candidate estimator | Threshold status | Main false-positive risk | Required controls/artifacts |
|---|---|---|---|---|---|---|
| `I_per` | Persistent admissible support; support stays away from collapse set. | Persistence margin `delta_per(S)`. | Fraction or minimum distance of admissible windows remaining inside a forward-invariant support under the perturbation panel; see `docs/measurement_specs/I_per_spec_v1.md`. | `not_frozen` | Stable-looking traces caused by too short a horizon or weak perturbations. | support certificate, collapse-distance report, horizon sensitivity control. |
| `I_ri` | Unique rigid identity object on support. | Identity-gap margin `delta_ri(S)`. | Gap between winning identity candidate and nearest admissible rival under remapping/deformation. | `not_frozen` | Narrative or memory continuity mistaken for rigid identity; unresolved ties hidden by coarse scoring. | identity rival ranking, tie detector, remapping control. |
| `I_int` | No admissible non-trivial factorization preserving operational histories. | Non-factorization margin `delta_int(S)`. | Penalized loss gap between full model and best admissible product/factorized rival. | `not_frozen` | Complexity or activity preserved while true integration is absent; gross collapse confounded with integration loss. | factorized-rival report, complexity-preservation report, gross-collapse control. |
| `I_cont` | Continuous admissible regime evolution. | Fragmentation/continuity margin `delta_cont(S)`. | Fragmentation functional under matched disturbance and continuity trace stability. | `not_frozen` | Apparent continuity from smoothing, interpolation, or history-blind decoding. | matched disturbance manifest, history-aware vs history-blind decoder control. |
| `I_diff` | Stable exclusion of null/trivial collapse. | Non-null separation margin `delta_diff(S)`. | Minimum recoverable separation between at least two admissible histories/readout classes. | `not_frozen` | Noise, labels, or arbitrary partitions mistaken for non-null differentiation. | null-class control, label-only control, noise-only control. |
| `I_leg` | Decoder-certified recoverability under controls. | Legibility margin `delta_leg(S)`. | Joint bundle: separability, noise robustness, persistence window, intervention fidelity, negative-control false-positive rate, compression distortion; see `docs/measurement_specs/I_leg_spec_v1.md`. | `formal_not_numeric` | Decoder artifact, overfit class labels, or compression preserving labels while destroying structure. | certified decoder record, noise report, intervention fidelity report, negative-control report, compression report. |

## Paper 5 Legibility Submetrics

| Submetric | Formal source | Measurement slot | Required inequality | Threshold status |
|---|---|---|---|---|
| Separability | L1 | Minimum class separation in decoder space. | `sep(S) >= delta_leg(S)` | `not_frozen` |
| Noise robustness | L2 | Error probability under admissible noise. | `eta_noise(S) <= delta_leg(S)` | `formal_not_numeric` |
| Persistence window | L3 | Class stability over admissible window. | window-specific, not yet numeric | `not_frozen` |
| Intervention fidelity | L4 | Targeted intervention class-shift fidelity. | `alpha_int(S) >= 1 - delta_leg(S)` | `formal_not_numeric` |
| Negative controls | L5 | False-positive rate under sham/non-critical interventions. | `beta_nc(S) <= delta_leg(S)` | `formal_not_numeric` |
| Structured compressibility | L6 | Distortion under admissible compression. | `kappa_comp(S) <= delta_leg(S)` | `formal_not_numeric` |

## Prediction-Term Binding

| Prediction term | Measurement binding | Current executable status |
|---|---|---|
| `certified class exit` | Post-manipulation certification fails at least one required invariant or certificate clause under frozen decision rules. | `not_frozen`; requires certification runner and decision record. |
| `class contraction` | `Qop` geometry loses non-trivial classes or shrinks according to a frozen class-geometry metric. | `not_frozen`; geometry metric required. |
| `undefined Qop` | Certification cannot recover a stable, non-trivial operational class under declared decoder/control bundle. | `not_frozen`; decoder choice and null controls required. |
| `complexity-only control` | Candidate matched on declared complexity surrogate while missing one or more required invariants. | `not_frozen`; complexity surrogate and matching tolerance required. |
| `pass-region response` | Response remains inside a frozen tolerance envelope after micro-perturbation. | `not_frozen`; tolerance and perturbation panel required. |
| `fail-region response` | Response remains outside the same frozen tolerance envelope. | `not_frozen`; tolerance and perturbation panel required. |
| `transition-band width` | Fraction of scanned parameter space that is neither clearly pass nor clearly fail. | Threshold `0.10` is corpus-stated; scan step and parameter range are not frozen. |
| `budget violation` | Run exceeds preregistered latency, compute, contamination, or admissibility budget. | `not_frozen`; budget values required. |
| `tamper acceptance` | Corrupted/malformed run reaches evidential support surface. | Threshold `0 accepted tampered runs` is frozen by claim logic. |

## What This Dictionary Still Cannot Do

- It cannot execute experiments.
- It cannot choose final thresholds without a preregistration artifact.
- It cannot bind QICN-SYSTEM runtime fields unless those fields are present,
  versioned, and mapped in a future execution package. Current candidate
  bindings are listed in `docs/measurement_specs/RUNTIME_BINDING_GAP.md`.
- It cannot distinguish semantic dependence that is not represented in the FCR
  or in a measurement manifest.

## Next Required Artifact

`PREREGISTRATION_TEMPLATE_v1.md` must bind each measurement slot to:

- dataset or scenario source;
- random seeds;
- sample size or run count;
- frozen thresholds;
- exclusion rules;
- analysis code;
- primary and secondary metrics;
- support, weakening, and destruction decisions.
