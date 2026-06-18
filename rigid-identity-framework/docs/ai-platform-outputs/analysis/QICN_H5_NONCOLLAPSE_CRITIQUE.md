# QICN H5 Noncollapse Critique

Status: `NON_CANONICAL_SPECULATIVE_ANALYSIS`

Date: 2026-06-18

Human review: `REQUIRED`

Human curated status: `not_reviewed`

## Scope

This note analyzes the role of H5 in BaseCore's parameterwise non-collapse
argument. It does not modify canon, does not prove H5, and does not introduce a
new theorem. The Lean companion file mechanizes only the logical implication
from H5 to non-collapse.

## Verified Corpus Anchors

H5 is stated as an explicit anti-constant fixed-point hypothesis:

- `basecore/core/sections/01_foundation_from_core.tex:185-190` defines H5:
  for every parameter `u` and every constant element `c in N`, `T_u(c) != c`.

The proof of structural non-collapse is a contradiction argument:

- `basecore/core/sections/01_foundation_from_core.tex:201-206` assumes
  `f_u* in N`, uses fixed-pointness to get `T_u(f_u*) = f_u*`, and contradicts
  H5.

The decisive remark is:

- `basecore/core/sections/01_foundation_from_core.tex:209-210` says H5 is
  parameterwise, not merely existential, and that this is exactly the quantifier
  strength needed for `thm:noncollapse`.

## Critical Reading

H5 is mathematically valid as an assumption block, but it is not explanatory by
itself. It assumes precisely the obstruction needed to conclude non-collapse:
there are no constant fixed points for any parameter. The theorem downstream is
therefore logically correct but scientifically thin unless H5 is derived from
more primitive structure.

This is not a Lean problem. The Lean theorem is expected to be trivial:

```text
fixedPoint(u) in N
T_u(fixedPoint(u)) = fixedPoint(u)
H5: every c in N satisfies T_u(c) != c
contradiction
```

The unresolved burden is upstream: why should H5 hold for the intended class of
systems without simply restating non-collapse in anti-fixed-point language?

## Replacement Candidates For H5

| Candidate | Sketch | Does it derive H5 now? | Assessment |
|---|---|---:|---|
| `Gamma(u) notin N` plus an operator bound on `K` | If constants are stable under `K` and projection does not erase the nonconstant component, a nonconstant forcing term could prevent a constant fixed point. | No | Promising but currently incomplete. It needs a decomposition of `H` into constant/nonconstant components and a lower bound showing projection preserves enough nonconstant mass. Without that, `Gamma(u) notin N` can be killed by projection or cancellation. |
| `N` is not invariant under `T_u` | If every constant input is mapped outside `N`, then no constant can be a fixed point. | Yes, if assumed; not derived | This is cleaner than H5 but still an assumption unless proved from `K`, `Gamma`, and projection. It is close to H5, just phrased dynamically. |
| Quotient-space drift on `H / N` | Prove the induced quotient map sends every zero class to a nonzero class, or has no zero fixed point. | No | Structurally better because it targets the collapse mode directly. But it requires formal quotient dynamics and a nonzero lower bound in the quotient. Not present in BaseCore. |
| Uniform separation `dist(T_u(c), c) >= epsilon(u) > 0` for constants | Strengthens H5 by giving a quantitative margin. | No | Useful for robustness and numerical testing, but stronger than H5 and not currently supported. Without an exhibited margin it is just a stricter assumption. |
| Projection-compatible forcing condition | Require `convexProjection(K c + Gamma(u)) != c` for all constants `c`. | Yes by assumption; not explanatory | This is almost H5 specialized to the projected affine form. It is operationally checkable in concrete instances, but it does not reduce circularity unless derived from primitive geometry. |

## Verdict

No candidate currently discharges H5 from existing BaseCore hypotheses without
adding a new structural assumption. The best direction is the quotient-space or
component-decomposition route, because it could replace H5 with a falsifiable
condition on `K`, `Gamma`, projection, and the constant subspace.

Current honest status:

```text
H5_IMPLIES_NONCOLLAPSE: MECHANIZED_TRIVIAL
H5_DERIVED_NONCIRCULARLY: NOT_PROVED
ALL_REPLACEMENT_CANDIDATES: STILL_ASSUMPTION_OR_REQUIRE_NEW_STRUCTURE
```

## Non-Claims

- No new claim is introduced.
- No `C_op`, `I_int`, CCR, no-vacuity, identity, subjectivity, phenomenality, or
  consciousness claim is supported by this note.
- The Lean file proves only the one-step implication from assumed H5 to
  non-collapse.
