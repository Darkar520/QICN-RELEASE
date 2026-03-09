# Cycle 4 Near-Miss Resolution

## Decision
`UNRESOLVED_IMPLEMENTATION_LIMIT`

## Ladder
Severities tested: 0.6, 0.68, 0.72, 0.76, 0.8, 0.84

## First failing invariant by severity
{
  "I_per": null,
  "I_ri": 0.8,
  "I_int": 0.68,
  "I_cont": null,
  "I_diff": 0.6,
  "I_leg": 0.6
}

## Ambiguous original case
{
  "severity": 0.8,
  "decision": "AMBIGUOUS",
  "I_per": 0.449855,
  "I_ri": 0.0,
  "I_int": -0.18371,
  "I_cont": 0.921568,
  "I_diff": -0.3,
  "I_leg": -0.4
}

## Interpretation
the ambiguous near-miss remains boundary-like, but not as a clean rigid-identity-only boundary.
Primary driver: the generator entangles I_ri with I_int, I_diff and I_leg degradation.
Meaning for P5-01 / P5-04: the ambiguity is more about case placement than criterion collapse.
