/-
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.

This file is an internal red-team artifact.  It is NOT external validation, NOT
peer review, and does NOT prove BaseCore H5, non-collapse, Iint, or C_op.  It
adversarially probes the QUOTIENT-DYNAMICS attack on the convex non-collapse
problem.  See the companion analysis
docs/ai-platform-outputs/analysis/QICN_H5_QUOTIENT_DYNAMICS_REDTEAM.md.
-/

import QICNLean.QICNH5Convex
import QICNLean.QICNH5ConvexExclusion
import Mathlib.LinearAlgebra.Quotient.Basic

/-!
# Non-canonical convex H5 quotient-dynamics red-team

Setup reused verbatim from the verified files: a real Hilbert space `H`, the
constant subspace `N : Submodule ℝ H`, the admissible convex set `s`, the
affine contraction data `K, Γ` (`‖K‖ < 1`), the convex update
`T_u x = convexProjection s (K x + Γ u)`, and the primitive linear collapse
candidate `c*(u) = cStarConstant N K Γ hK u` (the unique fixed point of the
linear projected map `c ↦ P_N (K c + Γ u)` on `N`, built only from `N, K, Γ`).

## Quotient framing

Let `q = N.mkQ : H → H ⧸ N` be the canonical quotient map. "Collapse" of a fixed
point `x*` means `x* ∈ N`, equivalently `q x* = 0` (the null class). So
non-collapse is exactly `q x* ≠ 0`.

## Why the convex update does NOT descend to `H ⧸ N` (obstruction, documented)

A genuine "induced map on `H ⧸ N`" would require `T_u` to respect `N`-cosets:
`x - x' ∈ N ⟹ T_u x - T_u x' ∈ N`. The metric projection onto a general convex
set is NOT linear, so this equivariance fails in general; there is no canonical
induced quotient map for the convex update. (The linear-subspace residual
analysis in `QICNH5Derivation` works precisely because `P_N` there IS linear.)
This obstruction is documented in the analysis; it is the reason this file does
NOT build a quotient map and instead attacks the collapse mode directly.

## Direct attack on the collapse mode

The collapse mode is a single, computable representative of the null class:
`c*(u) ∈ N`, so `q (c*(u)) = 0`. The candidate condition is

    (c)   `T_u (c*(u)) ≠ c*(u)`     [the linear collapse candidate is not a
                                      convex fixed point]

This is non-circular (it mentions only the primitives `s, N, K, Γ, u`, never the
convex fixed point) and it is NOT self-defeating (unlike candidate (b)): under
the bilateral-admissibility regime `hAdm` we have `c*(u) ∈ s`, yet `T_u` may
still move it.

Results mechanized here:
* `cStarConstant_unique` — any constant fixed point of the linear projected map
  equals `c*(u)` (Banach uniqueness).
* `collapse_iff_cStar_fixed` — under `hAdm`, a convex constant fixed point EXISTS
  iff `T_u` fixes the single primitive point `c*(u)`. The collapse search over
  all of `N` reduces to ONE point check.
* `convex_noncollapse_of_cStar_not_fixed` / `convex_fixedpoint_mkQ_ne_zero` —
  hence condition (c) forces convex non-collapse (`q x* ≠ 0`).

Honest scope note: condition (c) lives in the regime `N ⊆ s` forced by `hAdm`,
which is exactly the regime where the strong static exclusion (a) `s ∩ N = ∅`
is IMPOSSIBLE. So (c) is NOT "weaker than (a)"; the two are incompatible regimes.
(c) is the non-circular criterion for the hard regime where constants are
admissible. Moreover (c) is EQUIVALENT to non-collapse there, not merely
sufficient — but it is a checkable single-point primitive condition, not a
circular restatement of the fixed-point search.
-/

namespace QICNLean

open Function (IsFixedPt)

noncomputable section

/-! ## Quotient framing: collapse = null class. -/

/-- A point is a constant (lies in `N`) iff its image under the canonical
quotient map `q = N.mkQ` is the null class. Collapse of a fixed point `x*` is
thus exactly `N.mkQ x* = 0`. -/
theorem mem_iff_mkQ_eq_zero
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (N : Submodule ℝ H) (x : H) :
    x ∈ N ↔ N.mkQ x = 0 := by
  rw [Submodule.mkQ_apply, Submodule.Quotient.mk_eq_zero]

/-! ## Banach uniqueness of the linear collapse candidate. -/

/--
Any constant fixed point of the linear projected map `c ↦ P_N (K c + Γ u)`
coincides with the primitive candidate `c*(u)`.

This is just Banach uniqueness: `c*(u)` is the contracting-map fixed point and
the hypothesis says `c` is a fixed point of the same map.
-/
theorem cStarConstant_unique
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param)
    (c : H)
    (hfix : N.starProjection (K c + Gamma u) = c) :
    c = cStarConstant N K Gamma hK u := by
  have hCW :
      ContractingWith ‖K‖₊ (fun x => N.starProjection (K x + Gamma u)) :=
    nonexpansive_after_contracting
      (affine_contracting K (Gamma u) hK)
      (subspace_starProjection_nonexpansive N)
  have hIsFix : IsFixedPt (fun x => N.starProjection (K x + Gamma u)) c := hfix
  have huniq := hCW.fixedPoint_unique hIsFix
  rw [huniq]
  rfl

/-! ## Collapse reduces to a single primitive point check. -/

/--
A convex constant fixed point, if it exists, is exactly `c*(u)`.

Combines the verified convex variational reduction
(`convex_constant_fixedpoint_reduces`) with Banach uniqueness. Requires the
bilateral-admissibility regime `hAdm` (which also yields `N ⊆ s`).
-/
theorem convex_collapsed_fixedpoint_eq_cStar
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) (c : H) (hcN : c ∈ N)
    (hfixed : convexProjection s hne hcl hc (K c + Gamma u) = c) :
    c = cStarConstant N K Gamma hK u := by
  have hNsub : ∀ x ∈ N, x ∈ s := bilateral_admissibility_forces_N_subset hAdm
  have hredux : N.starProjection (K c + Gamma u) = c :=
    convex_constant_fixedpoint_reduces s hne hcl hc N K Gamma hNsub hAdm u c hcN hfixed
  exact cStarConstant_unique N K Gamma hK u c hredux

/--
**Single-point collapse equivalence.**

Under bilateral admissibility, a convex constant fixed point EXISTS iff the
convex update `T_u` fixes the single primitive point `c*(u)`. The collapse
problem over the whole constant subspace `N` reduces to one point check on a
point determined only by `N, K, Γ`.

Forward direction uses the variational reduction + uniqueness (needs `hAdm`);
backward direction is immediate (`c*(u) ∈ N` always).
-/
theorem collapse_iff_cStar_fixed
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) :
    (∃ c ∈ N, convexProjection s hne hcl hc (K c + Gamma u) = c)
      ↔ convexProjection s hne hcl hc
            (K (cStarConstant N K Gamma hK u) + Gamma u)
          = cStarConstant N K Gamma hK u := by
  constructor
  · rintro ⟨c, hcN, hfixed⟩
    have hceq :=
      convex_collapsed_fixedpoint_eq_cStar s hne hcl hc N K Gamma hK hAdm u c hcN hfixed
    rw [← hceq]
    exact hfixed
  · intro hFix
    exact ⟨cStarConstant N K Gamma hK u, cStarConstant_mem N K Gamma hK u, hFix⟩

/-! ## Condition (c) forces convex non-collapse. -/

/--
If the convex update does NOT fix the primitive collapse candidate `c*(u)`
(condition (c)) and bilateral admissibility holds, then NO constant fixed point
exists: any `c ∈ N` with `T_u c = c` yields a contradiction.

Non-circular: `hMove` mentions only `s, N, K, Γ, u`, never the convex fixed
point.
-/
theorem convex_noncollapse_of_cStar_not_fixed
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hMove : convexProjection s hne hcl hc
                (K (cStarConstant N K Gamma hK u) + Gamma u)
              ≠ cStarConstant N K Gamma hK u)
    (c : H) (hcN : c ∈ N)
    (hfixed : convexProjection s hne hcl hc (K c + Gamma u) = c) :
    False := by
  have hceq :=
    convex_collapsed_fixedpoint_eq_cStar s hne hcl hc N K Gamma hK hAdm u c hcN hfixed
  rw [hceq] at hfixed
  exact hMove hfixed

/--
Same conclusion in the form a downstream non-collapse statement wants: any
convex fixed point lies OUTSIDE the constant subspace `N`.
-/
theorem convex_fixedpoint_not_mem_of_cStar_not_fixed
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hMove : convexProjection s hne hcl hc
                (K (cStarConstant N K Gamma hK u) + Gamma u)
              ≠ cStarConstant N K Gamma hK u)
    (x : H)
    (hfixed : convexProjection s hne hcl hc (K x + Gamma u) = x) :
    x ∉ N := fun hxN =>
  convex_noncollapse_of_cStar_not_fixed s hne hcl hc N K Gamma hK hAdm u hMove x hxN hfixed

/--
Quotient-language form: under condition (c), every convex fixed point projects
to a NON-null class in `H ⧸ N`. This is exactly "no collapse to the null class".
-/
theorem convex_fixedpoint_mkQ_ne_zero
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hMove : convexProjection s hne hcl hc
                (K (cStarConstant N K Gamma hK u) + Gamma u)
              ≠ cStarConstant N K Gamma hK u)
    (x : H)
    (hfixed : convexProjection s hne hcl hc (K x + Gamma u) = x) :
    N.mkQ x ≠ 0 := by
  intro hzero
  exact convex_fixedpoint_not_mem_of_cStar_not_fixed
    s hne hcl hc N K Gamma hK hAdm u hMove x hfixed
    ((mem_iff_mkQ_eq_zero N x).mpr hzero)

end

end QICNLean
