# Cycle 4 Threshold Boundary Cleanup

## Decision
`STILL_AMBIGUOUS_BUT_LOCALIZED`

## What was swept
- `integration_correlation_floor` around the Cycle 3 negative-control ambiguity
- `legibility.clean_acc` on the positive continuous case as a robustness cross-check

## Stable zones
- negative control: stable FAIL below the ambiguity band and again after the band is crossed
- positive continuous case: stable PASS across the tested legibility sweep

## Ambiguous band
- integration floor values entering ambiguity: 0.28 to 0.335

## Diagnosis
the Cycle 3 ambiguity is driven primarily by one threshold plus the ambiguity-band classifier, not by a broad collapse of the criterion

## Implication
Current thresholds remain scientifically usable, but the negative-control ambiguity should be treated as a local knife-edge classification effect, not as broad criterion collapse.
