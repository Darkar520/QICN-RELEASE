# Cycle 3 Threshold Stress Report

## Profiles used
- `base`
- `local_loose`
- `local_tight`
- `legibility_tight`
- `differentiation_tight`

## Decision rule
The stress test is considered robust if local perturbations do not flip the base decision.

## Result
- Threshold stress status: `AMBIGUOUS`
- Reason: at least one decision flipped under local threshold perturbation

## Fragilities
- C3_NEG_COMPLEXITY: local threshold perturbation changed the decision
