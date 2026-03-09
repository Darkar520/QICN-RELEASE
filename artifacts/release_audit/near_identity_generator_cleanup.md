# Near-Identity Generator Cleanup

## Old generator failure mode
The original `near_identity` probe collapsed multiple invariants too early. In Cycle 4, `I_diff` and `I_leg` crossed before `I_ri`, and `I_int` crossed before or at the same boundary.

## New generator design
`near_identity_clean` keeps positive dynamics unchanged and moves the perturbation into readout aliasing:
- compresses the second readout channel to target identity separation
- uses cosine-based alias channels to increase within-class overlap without directly collapsing persistence, continuity, or causal dynamics

## Old first-fail profile
{
  "I_per": 0.5,
  "I_ri": 0.8,
  "I_int": 0.68,
  "I_cont": null,
  "I_diff": 0.5,
  "I_leg": 0.5
}

## New first-fail profile
{
  "I_per": null,
  "I_ri": null,
  "I_int": 0.5,
  "I_cont": null,
  "I_diff": null,
  "I_leg": null
}

## Status
`STILL_AMBIGUOUS_BUT_LOCALIZED`

## Interpretation
the cleaned generator reduces cross-invariant leakage, but does not fully isolate I_ri before neighboring invariants
