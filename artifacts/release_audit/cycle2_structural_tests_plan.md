# Cycle 2 Structural Tests Plan

## B1. Harder Cross-Substrate Equivalence
- cases: `B1_EQ_CONTINUOUS`, `B1_EQ_EVENT_SPARSE`
- stricter change versus Cycle 1: event-sparse substrate with different update schedule and readout geometry
- target claims: `P5-02`, `P5-06`

## B2. Near-Miss Ablations
- `B2_NEAR_MISS_PERSISTENCE` targets `I_per`
- `B2_NEAR_MISS_IDENTITY` targets `I_ri`
- `B2_NEAR_MISS_CONTINUITY` targets `I_cont`
- `B2_NEAR_MISS_LEGIBILITY` targets `I_leg`

## B3. Partial Invariant Degradation Curves
- `B3_CURVE_CONTINUITY`
- `B3_CURVE_LEGIBILITY`

## Thresholds
- collapse radius: `0.12`
- observed integration correlation floor: `0.35`
- continuity p95 jump ceiling: `0.95`
- differentiation separation floor: `0.3`
- non-null floor: `0.18`
- legibility thresholds: `{"clean_acc": 0.9, "noisy_acc": 0.75, "critical_shift": 0.7, "sham_fpr": 0.1, "compression_acc": 0.8}`
- seeds: `[11, 23, 37, 47, 59, 71, 83]`
