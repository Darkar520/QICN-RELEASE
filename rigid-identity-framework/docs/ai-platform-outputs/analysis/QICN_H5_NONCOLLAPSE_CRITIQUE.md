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

## Linear Quotient Derivation (Verified)

Lean file:

- `docs/ai-platform-outputs/formal/lean/QICNLean/QICNH5Derivation.lean`

Status:

```text
H5_LINEAR_SUBSPACE_REDUCED_TO_FORCING_CONDITIONS
H5_GENERAL_CONVEX: OPEN
```

Setup, restricted to the linear subspace case:

- `I` is the projection subspace.
- `N` is the constant/collapse subspace.
- `P_I := I.starProjection`.
- `P_N := N.starProjection`.
- `Q := id - P_N`, implemented as `quotientResidual N`.
- `K : H ->L[Real] H` with `||K|| < 1`.
- `Gamma : U_param -> H`.
- `f(u)` is the Banach fixed point of `x |-> P_I (K x + Gamma u)`.

Data conditions:

```text
C1 invariance:
  forall x in N, P_I (K x) in N

C2 projected forcing:
  forall u, Q (P_I (Gamma u)) != 0
```

Verified theorem:

```text
noncollapse_from_forcing :
  C1 -> C2 -> forall u, f(u) notin N
```

Proof idea:

If `f(u) in N`, then `Q f(u) = 0`. Since `f(u)` is a fixed point,
`f(u) = P_I (K f(u) + Gamma u)`. In the subspace case, `P_I` is linear, so

```text
Q f(u) = Q (P_I (K f(u))) + Q (P_I (Gamma u)).
```

By C1, `P_I (K f(u)) in N`, hence its `Q` residual is zero. Therefore
`Q (P_I (Gamma u)) = 0`, contradicting C2.

Circularity verdict:

This is a genuine reduction in the linear subspace case, not merely a
re-enunciation of H5. C2 is a condition on the primitive data
`Gamma`, `P_I`, and the decomposition induced by `N`; it does not quantify over
or mention the fixed point. C1 is an invariance condition on `P_I o K` over the
collapse subspace. Together they imply non-collapse without assuming the
anti-fixed-point form of H5.

The reduction is narrow. It depends on the linearity of `Submodule.starProjection`.
For the general closed-convex BaseCore projection, `P_I` is non-expansive but not
linear, so the additive decomposition step is unavailable. The convex case
remains open and must not be reported as solved.

## Verdict

No candidate currently discharges the full BaseCore H5 for the general convex
projection case from existing hypotheses alone. The linear subspace route now
does reduce H5 to primitive forcing and invariance conditions, but those
conditions are additional structure and the proof depends on linear projection.

Current honest status:

```text
H5_IMPLIES_NONCOLLAPSE: MECHANIZED_TRIVIAL
H5_LINEAR_SUBSPACE_REDUCED_TO_FORCING_CONDITIONS: VERIFIED_IN_LEAN
H5_GENERAL_CONVEX: OPEN
FULL_BASECORE_H5_DERIVED_NONCIRCULARLY: NOT_PROVED
```

## Non-Claims

- No new claim is introduced.
- No `C_op`, `I_int`, CCR, no-vacuity, identity, subjectivity, phenomenality, or
  consciousness claim is supported by this note.
- The Lean file proves only the one-step implication from assumed H5 to
  non-collapse.
