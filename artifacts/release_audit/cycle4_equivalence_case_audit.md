# Cycle 4 Equivalence Case Audit

## Ambiguous pair
- continuous vs discrete
- decision: `AMBIGUOUS`
- reason: matching signatures but tolerance exceeded by invariant-margin divergence
- invariant deltas: {"I_per": 0.471603, "I_ri": 0.84018, "I_int": 0.001156, "I_cont": 0.076434, "I_diff": 0.251236, "I_leg": 0.0}
- binding invariant: `I_ri`

## Refined positive pair
- continuous vs event_sparse
- decision: `AMBIGUOUS`
- reason: both cases certify but signatures diverge

## Refined negative pair
- continuous vs near_legibility
- decision: `FAIL`
- reason: at least one member of the pair failed certification
