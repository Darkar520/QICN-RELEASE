# Residual B — Boundary Probe Resolution

## Result
`PROVISIONAL_SUPPORT_LOCALIZED`

## near_identity v3 design
The new probe preserves the positive continuous dynamics and places the perturbation in a smooth shared-alias readout channel with small coupling into the decision channel. The target is to widen within-class overlap while keeping persistence, integration, continuity, differentiation, and legibility positive as long as possible.

## Base ladder
[
  {
    "severity": 0.05,
    "decision": "PASS",
    "I_per": 0.721603,
    "I_ri": 0.334861,
    "I_int": 0.115223,
    "I_cont": 0.902204,
    "I_diff": 0.568449,
    "I_leg": 0.1
  },
  {
    "severity": 0.08,
    "decision": "PASS",
    "I_per": 0.721603,
    "I_ri": 0.137976,
    "I_int": 0.108485,
    "I_cont": 0.877729,
    "I_diff": 0.56826,
    "I_leg": 0.1
  },
  {
    "severity": 0.1,
    "decision": "AMBIGUOUS",
    "I_per": 0.721603,
    "I_ri": 0.006736,
    "I_int": 0.104192,
    "I_cont": 0.862511,
    "I_diff": 0.568134,
    "I_leg": 0.1
  },
  {
    "severity": 0.12,
    "decision": "FAIL",
    "I_per": 0.721603,
    "I_ri": -0.124492,
    "I_int": 0.100342,
    "I_cont": 0.846538,
    "I_diff": 0.568007,
    "I_leg": 0.1
  },
  {
    "severity": 0.15,
    "decision": "FAIL",
    "I_per": 0.721603,
    "I_ri": -0.32131,
    "I_int": 0.095662,
    "I_cont": 0.821206,
    "I_diff": 0.567818,
    "I_leg": 0.1
  }
]

## First-fail profile
{
  "I_per": null,
  "I_ri": 0.12,
  "I_int": null,
  "I_cont": null,
  "I_diff": null,
  "I_leg": null
}

## Boundary interpretation
- `0.08` remains `PASS` across the tested frozen profiles
- `0.10` is `AMBIGUOUS` across the tested frozen profiles
- `0.12` is `FAIL` across the tested frozen profiles
- the first invariant to cross is `I_ri`

This means the probe is no longer failing because `I_diff`, `I_leg`, or `I_int` collapse first. The residual has moved from a dirty multi-invariant generator failure to a localized boundary instrument with a narrow ambiguity band.

## Interpretation
- P5-01 / P5-04 improve from broad ambiguity to localized boundary support
- the result remains internal-only
- the residual is no longer best described as generic implementation contamination
