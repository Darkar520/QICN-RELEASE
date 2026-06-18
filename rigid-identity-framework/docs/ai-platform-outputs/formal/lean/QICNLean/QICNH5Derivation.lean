import QICNLean.QICNHilbertInstance

/-!
# Non-canonical H5 linear-subspace reduction

This file proves a narrow, non-canonical replacement for the H5
anti-collapse assumption in the linear subspace case.

It does not address the general closed-convex projection case: the proof uses
linearity of `Submodule.starProjection`, which is unavailable for general
metric projection onto a convex set.
-/

namespace QICNLean

open Function (IsFixedPt)

noncomputable section

/-- The residual after orthogonal projection onto the constant subspace `N`. -/
def quotientResidual
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (N : Submodule ℝ H) [CompleteSpace N] : H →L[ℝ] H :=
  ContinuousLinearMap.id ℝ H - N.starProjection

/-- Membership in `N` implies zero residual under `id - P_N`. -/
theorem quotientResidual_eq_zero_of_mem
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (N : Submodule ℝ H) [CompleteSpace N] {x : H} (hx : x ∈ N) :
    quotientResidual N x = 0 := by
  unfold quotientResidual
  rw [sub_apply, ContinuousLinearMap.id_apply]
  rw [N.starProjection_eq_self_iff.mpr hx]
  simp

/--
The fixed point of the projected affine update for a fixed forcing vector.

This is only a convenience wrapper around mathlib's Banach fixed point API
applied through the already verified QICN pilot lemmas.
-/
def h5ProjectedAffineFixedPoint
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (I : Submodule ℝ H) [CompleteSpace I]
    (K : H →L[ℝ] H) (gamma : H) (hK : ‖K‖ < 1) : H :=
  let T : H → H := fun x => I.starProjection (K x + gamma)
  ContractingWith.fixedPoint T
    (nonexpansive_after_contracting
      (affine_contracting K gamma hK)
      (subspace_starProjection_nonexpansive I))

/--
For a fixed forcing vector, the projected-affine fixed point is a fixed point
of the projected-affine update.
-/
theorem h5ProjectedAffineFixedPoint_isFixedPt
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (I : Submodule ℝ H) [CompleteSpace I]
    (K : H →L[ℝ] H) (gamma : H) (hK : ‖K‖ < 1) :
    IsFixedPt (fun x => I.starProjection (K x + gamma))
      (h5ProjectedAffineFixedPoint I K gamma hK) := by
  unfold h5ProjectedAffineFixedPoint
  exact ContractingWith.fixedPoint_isFixedPt
    (nonexpansive_after_contracting
      (affine_contracting K gamma hK)
      (subspace_starProjection_nonexpansive I))

/--
Linear subspace H5 reduction.

If the constant subspace `N` is invariant under `P_I ∘ K`, and the projected
forcing always has nonzero residual modulo `N`, then the projected-affine fixed
point cannot lie in `N`.

This is a genuine reduction only for the linear subspace case. The proof uses
`Submodule.starProjection` as a continuous linear map.
-/
theorem noncollapse_from_forcing
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (I N : Submodule ℝ H) [CompleteSpace I] [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hInvariant : ∀ x ∈ N, I.starProjection (K x) ∈ N)
    (hForcing : ∀ u, quotientResidual N (I.starProjection (Gamma u)) ≠ 0)
    (u : U_param) :
    h5ProjectedAffineFixedPoint I K (Gamma u) hK ∉ N := by
  intro hmem
  let fp : H := h5ProjectedAffineFixedPoint I K (Gamma u) hK
  let Q : H →L[ℝ] H := quotientResidual N
  have hfp_mem : fp ∈ N := hmem
  have hQ_fp : Q fp = 0 := quotientResidual_eq_zero_of_mem N hfp_mem
  have hfixed :
      I.starProjection (K fp + Gamma u) = fp := by
    exact h5ProjectedAffineFixedPoint_isFixedPt I K (Gamma u) hK
  have hQ_fixed : Q (I.starProjection (K fp + Gamma u)) = 0 := by
    rw [hfixed]
    exact hQ_fp
  have hproj_add :
      I.starProjection (K fp + Gamma u) =
        I.starProjection (K fp) + I.starProjection (Gamma u) := by
    exact map_add I.starProjection (K fp) (Gamma u)
  have hQ_sum :
      Q (I.starProjection (K fp) + I.starProjection (Gamma u)) = 0 := by
    rw [hproj_add] at hQ_fixed
    exact hQ_fixed
  have hQ_K : Q (I.starProjection (K fp)) = 0 :=
    quotientResidual_eq_zero_of_mem N (hInvariant fp hfp_mem)
  have hQ_gamma : Q (I.starProjection (Gamma u)) = 0 := by
    have hQ_add :
        Q (I.starProjection (K fp) + I.starProjection (Gamma u)) =
          Q (I.starProjection (K fp)) + Q (I.starProjection (Gamma u)) := by
      exact map_add Q (I.starProjection (K fp)) (I.starProjection (Gamma u))
    rw [hQ_add, hQ_K, zero_add] at hQ_sum
    exact hQ_sum
  exact hForcing u hQ_gamma

end

end QICNLean
