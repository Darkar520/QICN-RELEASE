# Cycle 3 Independent Judge Note

## Status
The Cycle 3 judge is more independent than in Cycle 2.

## What changed
- Generator-side case production lives in `cycle3_generate_cases.py`.
- Judge-side evaluation lives in `cycle3_independent_judge.py`.
- The judge consumes only frozen artifacts:
  - `cycle3_frozen_inputs/blind_manifest.json`
  - `cycle3_frozen_inputs/blind_pairs.json`
  - `cycle3_frozen_inputs/stress_targets.json`
  - `cycle3_frozen_inputs/threshold_profiles.json`
  - frozen case JSON files
- The judge does not import generator code and does not call live step functions.
- The reveal map is excluded from the judge contract and is applied only in `cycle3_finalize.py` after blind judgments are written.

## Independence delta relative to Cycle 2
- Cycle 2 already froze artifacts before judgment.
- Cycle 3 adds a separate judge code path plus a blind contract boundary.
- Residual limitation: the judge is still maintained in the same repository and language runtime, so this is stronger internal separation, not an independent external evaluator.
