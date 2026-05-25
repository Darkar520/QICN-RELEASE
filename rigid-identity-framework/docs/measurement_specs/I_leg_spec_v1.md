# I_leg Measurement Specification v1

Status: executable specification scaffold for the six legibility clauses.  
Boundary: defines candidate estimators; it does not certify consciousness,
phenomenality, or external validation.

## Function Contract

```text
compute_delta_leg(decoder_output, noise_manifest, intervention_manifest, compression_manifest)
```

Inputs:

- `decoder_output`: matrix with rows as samples/windows and columns
  `{class_id, class_score, feature_vector, window_id}`.
- `noise_manifest`: frozen list of noise distributions and magnitudes.
- `intervention_manifest`: interventions with target, expected response cell,
  and observed response cell.
- `compression_manifest`: compression rates and distortion metrics.

Output:

- tuple `(sep, eta_noise, window_stability, alpha_int, beta_nc, kappa_comp)`;
- `delta_leg_aggregate` in `[0,1]`;
- metadata with per-submetric validity flags.

Error:

- throw if `decoder_output` lacks class ids, scores, features, or windows.

## Submetrics L1-L6

L1 separability:

```text
sep = min inter-class distance / max intra-class distance
sep_norm = min(1, sep / sep_scale)
```

L2 noise robustness:

```text
eta_noise = 1 - mean(class_flip_rate(noise_level_i))
```

L3 persistence window:

```text
window_stability = fraction of windows preserving class_id under admissible horizon
```

L4 intervention response:

```text
alpha_int = fraction of interventions whose observed response cell matches expected response cell
```

L5 non-collapse:

```text
beta_nc = 1 - fraction of samples assigned to null/trivial class under admissible decoding
```

L6 compression robustness:

```text
kappa_comp = 1 - mean(normalized distortion after structured compression)
```

## Aggregation Rule

The frozen v1 aggregation is conservative:

```text
delta_leg_aggregate = min(sep_norm, eta_noise, window_stability, alpha_int, beta_nc, kappa_comp)
```

Rationale: a single failed legibility clause must remain visible. The aggregate
cannot hide L3 failure behind high L1/L2 values.

## Minimal Numeric Example

| Submetric | Value |
|---|---:|
| `sep_norm` | 0.80 |
| `eta_noise` | 0.92 |
| `window_stability` | 0.74 |
| `alpha_int` | 0.88 |
| `beta_nc` | 0.97 |
| `kappa_comp` | 0.83 |

`delta_leg_aggregate = min(...) = 0.74`.

The failing bottleneck is L3. A falsifier can attack L3 without claiming that
L1, L2, L4, L5, or L6 failed.
