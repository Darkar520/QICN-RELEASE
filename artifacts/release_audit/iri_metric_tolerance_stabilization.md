# I_ri Metric / Tolerance Stabilization

## What changed
The raw equivalence judge was kept intact. A conservative alternative path was added that:
- preserves the same signature requirement
- preserves the same non-I_ri margin tolerance
- normalizes `I_ri` by class-separation scale before comparing the pair

## Technical justification
The Cycle 4 audit showed that the raw divergence was concentrated in `I_ri` scale, while the pair preserved the same transition signatures. This justifies scale-normalized comparison of `I_ri` without relaxing doctrine.

## Critical rerun
- prior raw status: `AMBIGUOUS`
- stabilized status: `PASS`
- decision class: `RESOLVED_PROVISIONAL`

## Why
normalized I_ri handling preserves the pair without relaxing doctrine or the non-I_ri tolerances
