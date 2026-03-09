# Residual A — Substrate Equivalence Resolution

## Result
`PROVISIONAL_SUPPORT_LOCALIZED`

## What was tested
- re-audit of the harder positive pair
- refined negative pair with deliberate invariant break on the discrete branch
- normalized-I_ri handling without relaxing non-I_ri tolerances
- local threshold stability across frozen profiles

## Positive pair outcome
- raw path: `AMBIGUOUS`
- normalized-I_ri path: `PASS` across `base, local_loose, local_tight, legibility_tight, differentiation_tight`

## Negative pair outcome
- normalized-I_ri path: `FAIL` across `base, local_loose, local_tight, legibility_tight, differentiation_tight`

## Why the residual improved
The pair distinction no longer depends on a single favorable threshold profile. The positive pair remains certified under the stabilized I_ri path across frozen local profiles, while the refined negative pair fails cleanly. The remaining caveat is that the positive result still depends on the conservative normalized-I_ri handling rather than on the raw margin comparison.

## Interpretation
- P5-02 / P5-06 improve beyond generic ambiguity.
- They do not become external validation.
- The remaining limitation is metric/tolerance-level rather than an explicit framework contradiction.
