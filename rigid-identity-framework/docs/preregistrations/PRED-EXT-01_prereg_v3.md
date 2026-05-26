# PRED-EXT-01 Preregistration v3

Status: frozen for clean-room synthetic execution with generic generator

## Boundary

This preregistration records a clean-room synthetic protocol only. It does not
report empirical support, external adjudication, consciousness validation,
phenomenality validation, identity transfer, agency, moral status, biological
equivalence, or proof of the full QICN framework.

## Anti-Circularity Upgrade Over v2

FCR v16 used a separate generator file, but the generator still encoded
scenario-specific distributions. Version 3 moves those scenario models into
the freeze artifact and reduces the generator to a generic interpreter of
declared weighted panels. This is still synthetic and author-designed, but it
removes the code-level coupling in which a generator function knew which
scenario should pass.

## Frozen Parameters

- Freeze artifact: `docs/preregistrations/PRED-EXT-01_freeze_v3.json`
- Trace length: `240`
- State alphabet: `A/B/C/D`
- Primary seed: `cleanroom_seed_001`
- Holdout seed: `cleanroom_holdout_002`
- Selectivity threshold: `rho_selective_threshold = 2.0`
- Rival loss floor: `0.05`
- Complexity penalty: `penalized_loss_alpha = 0.05`
- Rival suite: trace-memory Markov depths `1`, `2`, and `3`
- Laplace smoothing: `lambda = 1`
- Minimum trace length: `200`

## Decision Rule

Support is allowed only if the positive panel satisfies all support clauses and
every negative control fails the same support rule on both the primary and
holdout seed. If any negative control passes, the result becomes a destruction
candidate or quarantine candidate.

## Interpretation

A positive v3 run may be recorded only as
`clean_room_synthetic_support_with_holdout_controls_passed`. It is a stronger
synthetic harness result than v2 because it tests a stronger rival suite and a
holdout seed, but it remains below empirical support.
