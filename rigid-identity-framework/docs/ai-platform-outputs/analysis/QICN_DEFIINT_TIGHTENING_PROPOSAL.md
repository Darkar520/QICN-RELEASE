# QICN def:iint Tightening Proposal

Status: `DRAFTED_NOT_APPLIED`

Layer: `NON_CANONICAL_AI_OUTPUT_FOR_HUMAN_REVIEW`

Date: 2026-06-19

Human review: `REQUIRED`

Human curated status: `not_applied_to_canon`

Canonical source not edited:
`basecore/core/sections/07_operational_criterion_absorbed.tex`

## Boundary

This is a Phase-2/4 proposal only. It records exact language that could tighten
`def:iint` if a human reviewer approves the structural `D*` reading as the
canonical factorization class.

It does not modify BaseCore, registry, release files, monolithic files, or any
paper. It does not certify `Crit_op`, does not prove external validation, and
does not change `FULL_COP_MEMBERSHIP: NOT_YET`.

## Adopted Modeling Decision To Encode

The adopted reading is structural, not behavioral:

```text
D* = non-trivial product structure psi:A -> A_1 x A_2,
     autonomous decomposed factor dynamics,
     split readouts R = R_1 sqcup R_2,
     no reconstruction decoder,
     time-homogeneous and schedule-independent.
```

Rationale: this follows the literal structure of `def:iint` requiring
`R = R_1 sqcup R_2` plus decomposed dynamics and causal structure. The broad
`D_approx` class adds an unrestricted reconstruction decoder, which is not
authorized by the text and collapses the criterion into behavioral
simulatability (`delta_int = 0` for the coupled carrier).

## Proposed Replacement / Tightening Text

Suggested text for `def:iint` or a remark immediately following it:

```latex
An admissible system satisfies causal integration, written \(I_{\mathrm{int}}(S)=1\),
on a support \(\mathcal A\), if there exists a margin
\(\delta_{\mathrm{int}}(S)>0\) such that no admissible structural product
factorization reproduces the admissible readout histories on \(\mathcal A\) with
error \(<\delta_{\mathrm{int}}(S)\).

An admissible structural product factorization consists of:

(i) a fixed, time-homogeneous, schedule-independent factorization map
\[
  \psi:\mathcal A \to \mathcal A_1 \times \mathcal A_2
\]
with both factors non-singleton;

(ii) decomposed factor dynamics
\[
  \Phi^1_u:\mathcal A_1\to\mathcal A_1,\qquad
  \Phi^2_u:\mathcal A_2\to\mathcal A_2
\]
for each admissible intervention \(u\), with no cross-factor update term;

(iii) a split readout family
\[
  R = R_1 \sqcup R_2
\]
where both \(R_1\) and \(R_2\) are non-empty and each readout in \(R_i\) is
evaluated only on factor \(i\);

(iv) no reconstruction decoder, schedule-specific decoder, or time-dependent
post-processing map from \(\mathcal A_1\times\mathcal A_2\) back into the
original state/readout space;

(v) a normalized admissible search class for factorizations, fixed independently
of the target error \(\varepsilon\), so that the infimum defining
\(\delta_{\mathrm{int}}(S)\) is mathematically meaningful.

The criterion is structural: it tests non-decomposition of the system dynamics,
causal structure, and split readout histories. It is not a behavioral
simulatability criterion with arbitrary decoders.
```

## Five Clarifications Encoded

| Clarification | Proposed constraint |
|---|---|
| Time-homogeneity / schedule independence | The factorization map and factor dynamics are fixed for the admissible class, not selected per schedule or per time step. |
| Split readouts without decoder | `R=R1 sqcup R2`; no unrestricted reconstruction decoder may re-couple factors at the output stage. |
| Non-triviality | Both factors are non-singleton and both readout groups are non-empty. |
| Normalized search space | The factorization class is fixed independently of epsilon/capacity tricks so that `inf error` has content. |
| Structural not behavioral | `Iint` is a decomposition criterion, not a claim that no arbitrary behavioral simulator can reproduce finite histories. |

## Current Mathematical Backing

- Under the adopted `D*` reading, the coupled carrier has a documented positive
  margin lower bound `delta_int(D*) >= sqrt(7)/14`.
- The Lean file `QICNCoupledSplitMargin.lean` mechanizes the quantitative
  kernel:
  `coupled_psi1_fiber_thin`, `coupled_psi2_fiber_thin`, and
  `coupled_split_readout_positive_margin`.
- The global quantifier from arbitrary admissible `D*` factorization to the
  explicit fiber/corner hypotheses consumed by the Lean kernel remains
  documented, not fully mechanized.

## Required Before Applying To Canon

1. Human mathematical review of the proposed text.
2. External audit of whether the `D*` reading is faithful to the intended
   `def:iint` burden and not merely favorable to the coupled carrier.
3. Phase-2/4 protocol for editing canonical `.tex`.
4. Re-run canonical gates and release governance checks after any approved edit.

## Non-Conclusions

- This proposal is not an applied canon edit.
- This proposal is not a proof of `Crit_op`.
- This proposal is not external validation.
- This proposal does not claim consciousness, identity, subjectivity,
  phenomenality, CCR closure, `I_int` closure, or no-vacuity.
- `FULL_COP_MEMBERSHIP` remains `NOT_YET`.
