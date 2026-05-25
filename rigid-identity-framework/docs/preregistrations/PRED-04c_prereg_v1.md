# Preregistration PRED-04c v1

Status: frozen preregistration scaffold, not executed.  
Boundary: this document freezes a decision rule for a future synthetic
parameter-panel test. It does not report support.

| Field | Frozen value |
|---|---|
| Prediction ID | `PRED-04c` |
| Claim target | `P3-01` |
| Dataset | Synthetic parameter `theta` in `[0,1]` with step `0.01`. |
| Random seeds | `[42, 12345, 99999, 20250525]` |
| Run count | 4 independent runs, one per seed. |
| Step size | `0.01` normalized parameter units. |
| Tolerance | `0.05` response-distance boundary for pass/fail classification. |
| Primary metric | Fraction of grid points classified as transition/ambiguous. |
| Decision rule | `fraction_ambiguous > 0.10` -> destruction; `< 0.10` -> support; exact `0.10` -> inconclusive and rerun forbidden without version bump. |
| Exclusion rule | Exclude `theta_i` points with `NaN` response only if `NaN` rate is `<= 0.01`; abort if `NaN` rate is `> 0.01`. |
| Rival | `RIVAL-NULL-DYNAMICS-01` |
| Negative controls | `CTRL-NEAR-NULL-NOISE`, `CTRL-HISTORY-BLIND` |
| External replicability | `true` as protocol readiness; execution remains `blocked_no_runner` until a runner exists. |
| External protocol path | `docs/EXTERNAL_REPLICATION_PROTOCOL.md` |

## Resolution Rationale

Step size `0.01` yields 101 grid points per seed and 404 total evaluated points.
This gives at least 100 points per unit interval and enough resolution to detect
a 10 percent transition band without post-hoc grid refinement.

## Power Analysis

Approximation: one-sided binomial distinction between threshold `p0 = 0.10` and
unacceptable band `p1 = 0.15`, alpha `0.05`, power `0.80`.

```text
n ~= ((z_0.95 * sqrt(p0(1-p0)) + z_0.80 * sqrt(p1(1-p1))) / (p1-p0))^2
n ~= ((1.645 * 0.300 + 0.842 * 0.357) / 0.05)^2
n ~= 253
```

The preregistered grid gives `n = 404`, exceeding the approximate minimum. This
calculation is a planning bound, not a result.

## Required Decision Record

Future execution must write:

```json
{
  "prediction_id": "PRED-04c",
  "prereg_version": "v1",
  "decision": "support|weakening|destruction|inconclusive",
  "fraction_ambiguous": null,
  "threshold": 0.10,
  "seeds_used": [42, 12345, 99999, 20250525],
  "exclusions_applied": null,
  "external_protocol_path": "docs/EXTERNAL_REPLICATION_PROTOCOL.md",
  "external_execution_class": "blocked_no_runner|executed_support|executed_destruction|executed_inconclusive|pipeline_demo",
  "artifact_hashes": {}
}
```
