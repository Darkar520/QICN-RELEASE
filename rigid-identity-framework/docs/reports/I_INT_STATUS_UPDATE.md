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

## 2026-11-17: structural finite-field derivation

The previous open burden is now supplemented by thm:basecore-irreducible-observation and thm:iint-irreducible-derivation. An irreducible degree-d minimal polynomial derives every nonzero linear response separator on F_p^d, and gives independent-product error >=1/[2(p-1)], with strict delta_int=1/[4(p-1)]. Faithful response quotients are injective. The identity-transition control factors exactly. This is a class-level algebraic proof, not enumeration alone.

The general gap gap:basecore:i_int_atomic_separator is not universally closed: irreducibility is an additional structural hypothesis on a finite discrete carrier, not a consequence of rigid identity and continuity. Communicating factors and full replicas remain outside the positive comparison category or tie when admitted. Independent mathematical review is required; external_support_certified=false.
