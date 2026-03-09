# Near Identity Generator V2

## Old failure mode
The previous probe degraded multiple invariants before `I_ri`, so it was not a clean enough identity boundary test.

## V2 design
`near_identity_v2` preserves the positive dynamics and moves the perturbation entirely into readout aliasing:
- channel 1 remains the original `q` signal to preserve class readout and legibility pressure
- channels 0 and 2 are reconstructed from a shared even alias term to expand within-class radius without directly collapsing persistence or continuity

## Invariant-targeting rationale
This design targets `I_ri = inter - within` by increasing within-class overlap while keeping the core dynamics and non-null signal package intact.

## First-fail profile
{
  "I_per": null,
  "I_ri": null,
  "I_int": null,
  "I_cont": null,
  "I_diff": null,
  "I_leg": null
}

## Critical rerun
- prior status at the old critical case: `AMBIGUOUS`
- new status at severity 0.80: `PASS`
- decision class: `UNRESOLVED_IMPLEMENTATION_LIMIT`

## Residual leakage / residual limit
the v2 probe no longer triggers a meaningful boundary crossing in the tested severity band, so it is still too weak to function as a clean I_ri probe
