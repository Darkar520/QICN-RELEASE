# Cycle 2 Failure Analysis

## Phase A
- status: `PASS`
- generator/judge separation is stronger than Cycle 1 because the judge consumes frozen artifacts only.
- residual: this is still an internal codebase, not an external independent judge.

## Phase B
- overall status: `PASS`

### B1 Harder Cross-Substrate Equivalence
- decision: `PASS`
- why: the harder substrates preserved certification and identical transition signatures under normal, critical, and sham conditions
- continuous margins: `{"I_per": 0.721603, "I_ri": 2.623926, "I_int": 0.648548, "I_cont": 0.877233, "I_diff": 0.568765, "I_leg": 0.1}`
- event-sparse margins: `{"I_per": 0.827169, "I_ri": 2.443161, "I_int": 0.648524, "I_cont": 0.880658, "I_diff": 0.514729, "I_leg": 0.1}`

### B2 Near-Miss Ablations
- decision: `PASS`
- B2_NEAR_MISS_PERSISTENCE: `PASS` | near-miss system was rejected and the intended borderline invariant I_per crossed below zero
- B2_NEAR_MISS_IDENTITY: `PASS` | near-miss system was rejected and the intended borderline invariant I_ri crossed below zero
- B2_NEAR_MISS_CONTINUITY: `PASS` | near-miss system was rejected and the intended borderline invariant I_cont crossed below zero
- B2_NEAR_MISS_LEGIBILITY: `PASS` | near-miss system was rejected and the intended borderline invariant I_leg crossed below zero

### B3 Partial Degradation Curves
- decision: `PASS`
- B3_CURVE_CONTINUITY: `PASS` | I_cont showed a graded boundary: monotone margin decay with a one-way certification transition
- B3_CURVE_LEGIBILITY: `PASS` | I_leg showed a graded boundary: monotone margin decay with a one-way certification transition