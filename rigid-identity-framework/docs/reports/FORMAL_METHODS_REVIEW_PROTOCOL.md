# Formal Methods Review Protocol v1

Status: HUMAN_CURATION_PROTOCOL
Date: 2026-05-26

## Boundary

This protocol prepares human mathematical curation. It does not itself confirm
any theorem, prove any open burden, or provide empirical support, external
adjudication, consciousness validation, phenomenality validation, identity
transfer, agency, moral status, or biological equivalence.

## Reviewer Qualification

An admissible reviewer should have documented expertise in at least one of:

- mathematics;
- mathematical logic;
- category theory;
- theoretical computer science;
- formal methods;
- dynamical systems;
- statistics or causal inference for measurement claims.

The reviewer must be independent from the original drafting of the specific
claim being reviewed.

## Review Categories

| Category | Meaning |
|---|---|
| `confirmed_proved` | The proof is present, well-typed, and the conclusion follows under stated assumptions. |
| `downgrade_to_conditional` | The claim is plausible only under assumptions not fully discharged. |
| `downgrade_to_heuristic` | The argument is interpretive, prosaic, or lacks formal proof structure. |
| `open_burden` | A precise proof obligation or countermodel search remains. |
| `false_claim` | The statement is contradicted by a counterexample or invalid inference. |

## Review Checklist

1. Does the source contain a proof block or only a statement?
2. Are all dependencies and assumptions explicit?
3. Are labels stable and unique?
4. Does the proof rely on a definition that already contains the conclusion?
5. Are there counterexample candidates?
6. Does the claim cross from formal model to interpretation without an
   additional measurement or adjudication burden?

## Registry Integration Rule

Human review must be recorded as a separate curation overlay or batch artifact.
No entry may be upgraded to `confirmed_proved` without reviewer identity,
review date, reviewed source location, and reason.

