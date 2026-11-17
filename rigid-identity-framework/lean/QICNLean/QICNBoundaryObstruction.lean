import QICNLean.QICNBoundaryRadialDerivative
import QICNLean.QICNRegularEquilibriumDerivatives

/-! Non-differentiability at the actual Banach-space boundary equilibrium. -/
namespace QICNLean.BoundaryObstruction

open QICNLean.TypedBanachWitness QICNLean.BoundaryRadialDerivative
open Filter
open scoped Topology
noncomputable section

theorem corner_fixed : transition (1 / 2) (j e1) = j e1 := by
  simpa [equilibrium] using equilibrium_fixed (1 / 2) (by norm_num)

theorem derivative_must_match_direction (L : B →L[ℝ] B)
    (hL : HasFDerivAt (transition (1 / 2)) L (j e1)) (h : B) :
    L h = j (((1 / 2 : ℝ) • average h) -
      max (inner ℝ e1 ((1 / 2 : ℝ) • average h)) 0 • e1) := by
  have hi : HasDerivAt (fun t : ℝ => j e1 + t • h) h 0 := by
    simpa using (((hasDerivAt_id (0 : ℝ)).smul_const h).const_add (j e1))
  have hd := hL.comp_hasDerivAt_of_eq 0 hi (by simp)
  have ht := hd.tendsto_slope_zero_right
  simp only [Function.comp_def, zero_add, zero_smul, add_zero, corner_fixed] at ht
  exact tendsto_nhds_unique ht (transition_boundary_direction h)

theorem corner_no_frechet_derivative :
    ¬ ∃ L : B →L[ℝ] B, HasFDerivAt (transition (1 / 2)) L (j e1) := by
  rintro ⟨L, hL⟩
  have hp := derivative_must_match_direction L hL (j e1)
  have hn := derivative_must_match_direction L hL (-j e1)
  have hself : inner ℝ e1 e1 = 1 := by rw [real_inner_self_eq_norm_sq, norm_e1]; norm_num
  have hp0 : L (j e1) = 0 := by
    simpa [average_j, inner_smul_right, hself, norm_e1] using hp
  have hn0 : L (-j e1) = j ((-(1 / 2 : ℝ)) • e1) := by
    simpa [map_neg, average_j, inner_smul_right, hself, norm_e1] using hn
  rw [map_neg, hp0, neg_zero] at hn0
  have hh := congrArg norm hn0
  rw [norm_zero, j_norm, norm_smul, norm_e1] at hh
  norm_num at hh

theorem differentiable_iff_regular (u : ℝ) (hu : 0 ≤ u) :
    DifferentiableAt ℝ (transition u) (equilibrium u) ↔ u ≠ 1 / 2 := by
  constructor
  · intro hd heq
    subst u
    have hh : equilibrium (1 / 2) = j e1 := by simp [equilibrium]
    rw [hh] at hd
    exact corner_no_frechet_derivative ⟨fderiv ℝ (transition (1 / 2)) (j e1), hd.hasFDerivAt⟩
  · intro hne
    rcases lt_or_gt_of_ne hne with hlt | hgt
    · exact (RegularEquilibriumDerivatives.equilibrium_interior_derivative
        u hu hlt).differentiableAt
    · exact (RegularEquilibriumDerivatives.equilibrium_exterior_derivative u hgt).differentiableAt

end
end QICNLean.BoundaryObstruction
