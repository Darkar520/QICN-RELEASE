# I_int Factorization Category Specification v1

Status: FORMAL_BURDEN_SPECIFICATION
Date: 2026-05-26

## Boundary

This document specifies a candidate mathematical setting for the open
`I_int` factorization burden. It does not prove the factorization-triviality
lemma, does not re-upgrade `prop:integration-transfer`, and does not validate
consciousness, phenomenality, identity transfer, agency, moral status, or the
full QICN framework.

## 1. Objects

An admissible causal-information system is a tuple

```text
S = (X, Phi, U, H, Id, R)
```

where:

- `X` is a finite or compact measurable state space;
- `Phi` is the transition rule or transition kernel;
- `U` is the admissible intervention family;
- `H` is the operational history functor assigning finite histories to
  intervention schedules;
- `Id` is the rigid identity object or identity-channel bundle;
- `R` is the response map from interventions to observable histories.

The current corpus does not yet prove that every Paper 5 system canonically
determines such a tuple. That is a prerequisite for any re-upgrade.

## 2. Morphisms

A morphism

```text
f : S -> T
```

between admissible systems is a structure-preserving map that transports:

1. states or probability measures on states;
2. admissible interventions;
3. operational histories;
4. identity-channel maps;
5. response profiles.

The intended preservation equations are:

```text
H_T(f_U(u)) o f_X = f_H o H_S(u)
R_T(f_U(u)) = f_R(R_S(u))
f_Id(Id_S) = Id_T
```

for every admissible intervention `u` in `U_S`.

## 3. Factorizations

An admissible factorization is a morphism

```text
F : S -> S_1 x S_2
```

such that both projections preserve the declared admissibility constraints.
It is non-trivial when neither projection is an admissible isomorphism to `S`
and neither factor is a null or bookkeeping-only factor.

## 4. Triviality Target

The desired factorization-triviality lemma would state:

```text
If S satisfies rigid identity, continuity, and intervention fidelity,
then every admissible factorization F : S -> S_1 x S_2 is trivial up to
admissible isomorphism.
```

## 5. Proof Obligations

The current burden decomposes into five obligations:

1. Define admissible products `S_1 x S_2` without smuggling integration into
   the product definition.
2. Prove that admissible systems and morphisms form a category.
3. Prove that the history and response preservation equations are functorial.
4. Prove that any non-trivial factorization breaks at least one of rigid
   identity, continuity, or intervention fidelity.
5. Exhibit or rule out counterexamples where two weakly coupled factors
   jointly preserve histories while neither factor is individually trivial.

## 6. FCR v17 Conditional Closure

FCR v17 adds a conditional theorem to Paper 5:

```text
paper5:theorem:thm-iint-faithful-factorization-triviality
```

The theorem proves factorization triviality under an atomic
identity/history/response separator. This closes the internal proof step that
was previously only sketched in the lemma draft. The remaining unsolved step is
the upstream derivation:

```text
rigid identity + continuity + intervention fidelity
  => atomic operational separator Theta_S
```

That implication is the exact mathematical target for a future upgrade of
`prop:integration-transfer`.

## 7. Current Verdict

The conditional lemma is now proved under an explicit atomicity assumption.
Under weak preservation, counterexample candidates remain open. Therefore the
correct registry status for `paper5:proposition:prop-integration-transfer`
remains:

```text
epistemic_status = open_burden
```
