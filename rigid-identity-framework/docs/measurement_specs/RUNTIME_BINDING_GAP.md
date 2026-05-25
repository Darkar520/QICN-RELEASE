# Runtime Binding Gap Map v1

Status: gap map between QICN-FRAMEWORK measurement slots and QICN-SYSTEM-style
runtime fields.  
Boundary: candidate runtime bindings are not validation. They are routing hints
for future engineering work.

| Runtime field | Classification | Measurement slot | Binding status |
|---|---|---|---|
| `metrics.pmia` | `derived_proxy` | `delta_per(S)` candidate | Partial: usable only after trace/support semantics are mapped to `I_per_spec_v1.md`. |
| `metrics.stasis_index` | `direct_signal` | `delta_cont(S)` candidate | Not bound: continuity spec still missing. |
| `ticks.tick` | `direct_signal` | perturbation-panel window index | Partial: tick semantics must be frozen per preregistration. |
| `flags.io_partial` | `direct_signal` | `I_leg` noise robustness candidate | Not bound: needs noise manifest and decoder-output schema. |
| `summary.metrics.cog` | `derived_proxy` | none | Explicitly excluded as direct evidence. |
| `summary.metrics.phen` | `derived_proxy` | none | Explicitly excluded as direct evidence. |
| `summary.metrics.subj` | `derived_proxy` | none | Explicitly excluded as direct evidence. |

## Minimum Runtime Version For Valid Binding

A runtime can feed this dictionary only if it exposes:

1. versioned trace schema;
2. perturbation panel manifest;
3. frozen decoder output schema;
4. negative-control manifest;
5. run verdict and hash manifest;
6. explicit claim-boundary text stating internal support is not external validation.

Until those conditions are met, runtime fields remain candidate inputs, not
evidence-bearing measurements.
