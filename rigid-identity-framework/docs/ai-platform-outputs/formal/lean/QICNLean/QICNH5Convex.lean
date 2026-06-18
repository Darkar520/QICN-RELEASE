import QICNLean.QICNConvexProjection

/-!
# Non-canonical H5 convex variational reduction

This file proves a reduction lemma for the general convex projection case.

It does not prove non-collapse. It shows that any constant fixed point of the
convex projected-affine update must satisfy a linear projected equation on the
constant subspace. The remaining non-collapse burden is geometric exclusion of
that candidate, not a naive forcing condition.
-/

namespace QICNLean

noncomputable section

/--
Convex variational reduction for constant fixed points.

If constants are admissible and the convex target admits bilateral moves along
the constant subspace `N`, then any constant fixed point `c` of the convex
projected-affine update satisfies the linear projected equation
`P_N (K c + Gamma u) = c`.

This is a reduction lemma, not a non-collapse theorem.
-/
theorem convex_constant_fixedpoint_reduces
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H)
    (hNsubI : ∀ x ∈ N, x ∈ s)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) (c : H) (hcN : c ∈ N)
    (hfixed : convexProjection s hne hcl hc (K c + Gamma u) = c) :
    N.starProjection (K c + Gamma u) = c := by
  let y : H := K c + Gamma u
  let z : H := y - c
  have _hc_in_s : c ∈ s := hNsubI c hcN
  have hvar :
      ∀ w ∈ s, inner ℝ z (w - c) ≤ 0 := by
    intro w hw
    have hraw := convexProjection_variational hne hcl hc y w hw
    simpa [z, y, hfixed] using hraw
  have hle : ∀ n ∈ N, inner ℝ z n ≤ 0 := by
    intro n hn
    have hraw := hvar (c + n) (hAdm c hcN n hn)
    have hsub : c + n - c = n := by
      abel
    simpa [hsub] using hraw
  have horth : ∀ n ∈ N, inner ℝ z n = 0 := by
    intro n hn
    have hnonpos : inner ℝ z n ≤ 0 := hle n hn
    have hneg_nonpos : -inner ℝ z n ≤ 0 := by
      have hraw := hle (-n) (N.neg_mem hn)
      simpa [inner_neg_right] using hraw
    have hnonneg : 0 ≤ inner ℝ z n := neg_nonpos.mp hneg_nonpos
    exact le_antisymm hnonpos hnonneg
  have hproj_z : N.starProjection z = 0 := by
    exact N.eq_starProjection_of_mem_of_inner_eq_zero (zero_mem N)
      (by
        intro n hn
        simpa using horth n hn)
  have hydecomp : y = z + c := by
    simp [z]
  have hPc : N.starProjection c = c := N.starProjection_eq_self_iff.mpr hcN
  calc
    N.starProjection (K c + Gamma u) = N.starProjection y := by rfl
    _ = N.starProjection (z + c) := by rw [hydecomp]
    _ = N.starProjection z + N.starProjection c := map_add N.starProjection z c
    _ = 0 + c := by rw [hproj_z, hPc]
    _ = c := by simp

end

end QICNLean
