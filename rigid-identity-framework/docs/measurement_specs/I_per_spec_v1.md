# I_per Measurement Specification v1

Status: executable specification scaffold.  
Boundary: defines a computable estimator for persistence. It does not freeze a
final empirical threshold and does not validate a system externally.

## Function Contract

```text
compute_delta_per(support_certificate, perturbation_panel, horizon, collapse_set_definition)
```

Inputs:

- `support_certificate`: admissible traces, each trace containing ordered states
  `x_0 ... x_h`, support-membership flags, and a normalized feature vector.
- `perturbation_panel`: non-empty list of admissible perturbations with frozen
  id, magnitude, target, and application rule.
- `horizon`: positive integer number of evaluated windows.
- `collapse_set_definition`: function returning distance to collapse under one
  of the definitions below.

Output:

- `delta_per(S)`: normalized minimum distance to collapse in `[0,1]`.
- `metadata`: `{num_windows_evaluated, num_perturbations, min_distance, max_distance}`.

Errors:

- throw if no admissible traces exist;
- throw if `perturbation_panel` is empty;
- throw if `horizon <= 0`.

## Collapse Definitions

Threshold-based collapse:

```text
collapse_threshold(x) = 1 if activity(x) < theta_activity
                         or support_margin(x) < theta_support
                       else 0
distance_threshold(x) = min(
  normalized(activity(x) - theta_activity),
  normalized(support_margin(x) - theta_support)
)
```

Topology-based collapse:

```text
collapse_topology(x) = 1 if component_count(support_graph(x)) = 0
                         or persistent_support_class(x) is empty
distance_topology(x) = normalized bottleneck distance from x to nearest empty-support diagram
```

## Normalization

For raw distance `d_raw >= 0` and frozen scale `d_scale > 0`:

```text
d_norm = min(1, d_raw / d_scale)
```

The estimator is conservative:

```text
delta_per(S) = min_{trace, perturbation, window} d_norm(apply(perturbation, trace_window))
```

## Pseudocode

```text
if support_certificate.traces is empty: throw
if perturbation_panel is empty: throw
if horizon <= 0: throw

distances = []
for trace in admissible traces:
  for window in rolling_windows(trace, horizon):
    for perturbation in perturbation_panel:
      perturbed = apply(perturbation, window)
      raw = collapse_set_definition.distance(perturbed)
      distances.append(min(1, raw / collapse_set_definition.scale))

return {
  delta_per: min(distances),
  metadata: {
    num_windows_evaluated: count(windows),
    num_perturbations: count(perturbation_panel),
    min_distance: min(distances),
    max_distance: max(distances)
  }
}
```

## Complexity

Let `T` be traces, `W` windows per trace, `P` perturbations, and `C_d` cost of
the collapse-distance function.

- Time: `O(T * W * P * C_d)`.
- Space: `O(T * W * P)` if all distances are retained; `O(1)` if streaming only
  min/max metadata.

## Minimal Numeric Example

Three windows and two perturbations produce normalized distances:

| Window | Perturbation A | Perturbation B |
|---|---:|---:|
| `w1` | 0.82 | 0.77 |
| `w2` | 0.65 | 0.71 |
| `w3` | 0.91 | 0.69 |

`delta_per(S) = min(0.82, 0.77, 0.65, 0.71, 0.91, 0.69) = 0.65`.

The value is a persistence margin candidate, not a pass/fail threshold until a
preregistration freezes the decision boundary.
