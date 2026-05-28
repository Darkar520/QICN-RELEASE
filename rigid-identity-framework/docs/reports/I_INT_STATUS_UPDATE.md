# I_int Status Update

Status: OPEN_BURDEN_REFINED / NO_CLAIM_UPGRADE  
Date: 2026-05-26

## What closed

Paper 5 contains a conditional theorem: if the operational separator family is
atomic, then every intervention-faithful exact factorization is trivial up to
admissible isomorphism.

## What did not close

The upstream derivation of atomicity from rigid identity, continuity, and
intervention fidelity is not proved. The atomic-separator lemma remains an open
burden.

## New refinement

`docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md` identifies a product-separator
counterexample candidate showing why the current assumptions do not obviously
imply atomicity.

## Public claims permitted

- `I_int` has a conditional factorization-triviality theorem under an explicit
  atomic-separator hypothesis.
- `prop:integration-transfer` remains an open burden for the unconditional
  transfer step.
- The framework has a more localized proof obligation.

## Public claims prohibited

- `I_int` is globally proved.
- Rigid identity plus continuity plus intervention fidelity has been shown to
  imply atomicity without additional assumptions.
- `I_int` provides external evidence of consciousness, phenomenality,
  subjectivity, or bridge admissibility.

## Registry dependency

```yaml
target: paper5:proposition:prop-integration-transfer
depends_on: atomic_separator_lemma
atomic_separator_lemma_status: open_burden_refined
effective_public_status: open_burden
human_curated_status: not_reviewed
```
