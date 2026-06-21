/-
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: SPECULATIVE / NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.

This file is an internal red-team artifact.  It is NOT external validation, NOT
peer review, and does NOT prove BaseCore H5, non-collapse, Iint, or C_op.  It
adversarially tests geometric-exclusion candidates that might replace H5 in the
general convex projection case.  See the companion analysis
docs/ai-platform-outputs/analysis/QICN_H5_CONVEX_EXCLUSION_REDTEAM.md.
-/

import QICNLean.QICNH5Convex
import QICNLean.QICNH5Derivation

/-!
# Non-canonical convex H5 exclusion red-team

The convex variational reduction (`convex_constant_fixedpoint_reduces`) plus the
vacuity of the naive projected-forcing condition left one open question: does a
NON-CIRCULAR geometric exclusion on the admissible/projection set imply convex
non-collapse?

This file mechanizes the adversarial evaluation of two candidates.

## Candidate (a) — strong static exclusion: no constant is admissible.

If `s ∩ N = ∅` (equivalently `∀ x ∈ s, x ∉ N`), then the convex projection
output is never a constant, for ANY input. Non-collapse follows immediately and
input-independently. The condition is purely static (only `s` and `N`), hence
non-circular, but it is STRONG: it forbids every admissible constant, not merely
the dynamically-selected one.

## Candidate (b) — weaker single-point exclusion: only `c*(u)` is inadmissible.

`c*(u)` is the unique fixed point of the linear affine contraction
`c ↦ P_N (K c + Γ u)` on `N`, determined by the primitive data `K, Γ, N` (NOT by
the convex dynamics `T_u` nor its fixed point). Excluding only this point is a
strictly weaker, still non-circular set condition. But to turn a constant fixed
point of `T_u` into `c*(u)` one must invoke the variational reduction lemma,
whose bilateral admissibility hypothesis `hAdm` forces `N ⊆ s`, hence
`c*(u) ∈ s`. So the candidate-(b) hypothesis `c*(u) ∉ s` is INCONSISTENT with the
very hypotheses that make the reduction usable: it is vacuous on that route.

Net result mechanized here: (a) closes convex non-collapse but is strong; (b) is
non-circular but self-defeating as a usable reduction.
-/

namespace QICNLean

noncomputable section

/-! ## Candidate (a): strong static exclusion of all admissible constants. -/

/-- The empty-intersection form `s ∩ N = ∅` is exactly the pointwise statement
that no admissible point is a constant. Purely static (no fixed point, no
dynamics). -/
theorem constants_inadmissible_of_inter_empty
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} {N : Submodule ℝ H}
    (hEmpty : s ∩ (N : Set H) = ∅) :
    ∀ x ∈ s, x ∉ N := by
  intro x hx hxN
  have hmem : x ∈ s ∩ (N : Set H) := ⟨hx, hxN⟩
  rw [hEmpty] at hmem
  exact hmem.elim

/--
Strength witness for candidate (a): if no admissible point is a constant, then
the convex projection output is never a constant, for ANY input `y`. Non-collapse
is here independent of `K`, `Γ`, the parameter `u`, and even of fixed-pointness.

This documents honestly that (a) is a very strong condition: it removes constants
from the entire range of the projection, not just from the dynamically selected
fixed point.
-/
theorem convexProjection_not_mem_of_inadmissible
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    {N : Submodule ℝ H}
    (hExcl : ∀ x ∈ s, x ∉ N) (y : H) :
    convexProjection s hne hcl hc y ∉ N :=
  hExcl _ (convexProjection_mem hne hcl hc y)

/--
Candidate (a) closes convex non-collapse.

If constants are inadmissible (`∀ x ∈ s, x ∉ N`), then every constant fixed point
of the convex projected-affine update fails to be a constant — i.e. there is no
constant fixed point. Non-circular: `hExcl` mentions only `s` and `N`, never the
fixed point.
-/
theorem convex_noncollapse_from_constants_inadmissible
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H)
    (K : H →L[ℝ] H) (Gamma : U_param → H)
    (hExcl : ∀ x ∈ s, x ∉ N)
    (u : U_param) (c : H)
    (hfixed : convexProjection s hne hcl hc (K c + Gamma u) = c) :
    c ∉ N := by
  rw [← hfixed]
  exact hExcl _ (convexProjection_mem hne hcl hc (K c + Gamma u))

/-! ## Candidate (b): weaker single-point exclusion `c*(u) ∉ s`. -/

/--
The dynamically-selected constant candidate `c*(u)`: the unique fixed point of
the linear affine contraction `c ↦ P_N (K c + Γ u)` on the constant subspace `N`.

Defined purely from the primitive data `N, K, Γ` via the already-verified Banach
wrapper. It does NOT reference the convex update `T_u` nor its fixed point, so a
condition on `c*(u)` is non-circular with respect to H5.
-/
def cStarConstant
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) : H :=
  h5ProjectedAffineFixedPoint N K (Gamma u) hK

/-- `c*(u)` solves the linear projected equation on `N`. -/
theorem cStarConstant_fixed
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) :
    N.starProjection (K (cStarConstant N K Gamma hK u) + Gamma u)
      = cStarConstant N K Gamma hK u :=
  h5ProjectedAffineFixedPoint_isFixedPt N K (Gamma u) hK

/-- `c*(u)` is itself a constant, i.e. it lies in `N` (it is a projection output). -/
theorem cStarConstant_mem
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) :
    cStarConstant N K Gamma hK u ∈ N := by
  have h := cStarConstant_fixed N K Gamma hK u
  rw [← h]
  exact N.starProjection_apply_mem _

/--
Bilateral admissibility along `N` (the hypothesis `hAdm` of the variational
reduction lemma `convex_constant_fixedpoint_reduces`) already forces the entire
constant subspace into the admissible set: `N ⊆ s`.

Take `c = 0 ∈ N`; then `0 + n = n ∈ s` for every `n ∈ N`.
-/
theorem bilateral_admissibility_forces_N_subset
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} {N : Submodule ℝ H}
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s) :
    ∀ n ∈ N, n ∈ s := by
  intro n hn
  have h := hAdm 0 N.zero_mem n hn
  simpa using h

/--
Consequence: under the reduction lemma's admissibility hypothesis, `c*(u)` is
ALWAYS admissible. Hence the candidate-(b) exclusion `c*(u) ∉ s` cannot hold on
the route that makes (b) imply non-collapse.
-/
theorem cStar_admissible_under_reduction_hypotheses
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) :
    cStarConstant N K Gamma hK u ∈ s :=
  bilateral_admissibility_forces_N_subset hAdm _ (cStarConstant_mem N K Gamma hK u)

/--
Candidate (b) is self-defeating as a usable reduction.

The hypotheses are: (i) bilateral admissibility `hAdm` — required to even derive
the variational reduction `P_N (K c + Γ u) = c` that connects a convex constant
fixed point to `c*(u)`; and (ii) the candidate-(b) exclusion `c*(u) ∉ s`. These
are contradictory. So (b) cannot be combined with the only machinery that turns
it into a non-collapse statement: it is vacuous on that route.
-/
theorem candidate_b_self_defeating
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hExcl_cStar : cStarConstant N K Gamma hK u ∉ s) :
    False :=
  hExcl_cStar (cStar_admissible_under_reduction_hypotheses s N K Gamma hK hAdm u)

end

end QICNLean
