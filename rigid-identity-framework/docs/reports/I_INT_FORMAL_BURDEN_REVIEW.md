# I_int Formal Burden Review v1

Status: FCR v13 formal-burden hardening note.

Date: 2026-05-25

## Boundary

This review does not prove `I_int`, does not downgrade the derived registry by
manual edit, and does not report empirical validation. It identifies the exact
formal burden required before causal integration can be treated as independently
proved rather than as a consolidation invariant.

## Finding

Paper 5 defines causal integration as absence of an admissible non-trivial
factorization preserving histories, readouts, causal structure, and the identity
object. This definition is formally meaningful.

The vulnerable step is `prop:integration-transfer`: the proof argues verbally
that an exact factorization would force failure of rigid identity, continuity,
or intervention fidelity. That argument is plausible, but it is not yet a
standalone factorization theorem because the following objects are not fully
typed inside the proposition:

- the category or class of admissible factorizations;
- the preservation relation for histories and interventions;
- the exact sense in which identity preservation across a product split implies
  triviality;
- the disjunction-elimination step showing that all exact non-trivial
  factorizations violate at least one named upstream antecedent.

## Required Formal Lemma

A sufficient hardening target is:

```text
Lemma (factorization-triviality under identity and intervention preservation).
Let S be admissible on support A. Suppose A = A1 x A2 is an admissible
factorization with decomposed dynamics, decomposed readouts, and decomposed
causal structure. If the factorization preserves:
  1. the rigid identity object Id_S,
  2. admissible history equivalence,
  3. regime-continuity transport,
  4. intervention-response cells used by the decoder,
then either the factorization is trivial up to admissible isomorphism or at
least one of the upstream antecedents fails.
```

This lemma must define `trivial up to admissible isomorphism` and must state
which antecedent fails in each non-trivial case.

## Acceptable v14 Outcomes

Outcome A: proof closure.

- Add the factorization-triviality lemma to Paper 5 or BaseCore.
- Refactor `prop:integration-transfer` to cite it.
- Update the registry through a safe source-aware extraction or curated overlay.

Outcome B: honest downgrade.

- Keep `I_int` as a constitutive invariant.
- Reclassify `prop:integration-transfer` as conditional or open-burden in the
  curation layer.
- Update the claim ledger to state that `I_int` requires independent proof or
  executed non-factorization controls before it supports stronger readings.

## FCR v14-core Curation Overlay

FCR v14-core adds:

`docs/reports/I_INT_CURATION_OVERLAY_v1.json`

The overlay recommends reclassifying
`paper5:proposition:prop-integration-transfer` from the current registry status
`proved` to `open_burden` unless the factorization-triviality lemma is supplied.
It is deliberately not applied directly to `registry/theorems.jsonl`, because
manual JSONL edits would hide the source/curation boundary. The overlay is
validated by:

```text
npm run verify:curation-overlays
```

## Current v14-core Decision

No proof is invented in this pass. No JSONL registry row is manually edited.
Until Outcome A is completed, `I_int` should be cited as a meaningful
non-factorization burden with an unresolved independent proof obligation.
