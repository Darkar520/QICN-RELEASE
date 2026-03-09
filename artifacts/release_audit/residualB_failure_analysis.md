# Residual B Failure Analysis

Residual B now has two convergent probe families under judge v3 and pseudo-external reproduction.

What did not improve:
- support remains internal-only
- the result still depends on the current internal invariant package and frozen thresholds
- no external lab or independent external codebase has confirmed the boundary

What did improve:
- the boundary no longer depends on `near_identity_v3` alone
- the same `PASS -> AMBIGUOUS -> FAIL` topology now appears in a distinct `offset_dispersion` family
- the first binding invariant on the negative member is `I_ri` in both families
