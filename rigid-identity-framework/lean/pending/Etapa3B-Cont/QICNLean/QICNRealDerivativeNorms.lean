import QICNLean.QICNRegularEquilibriumDerivatives

/-! Real derivative norms, independent of complex spectral theory. -/
namespace QICNLean.TypedSpectrum
open QICNLean.TypedBanachWitness QICNLean.RegularEquilibriumDerivatives
noncomputable section

def meanProjection : B →L[ℝ] B := j.comp average
def transverseProjection : B →L[ℝ] B := j.comp (perpendicular.comp average)

theorem mean_norm : ‖meanProjection‖ = 1 := by
  apply le_antisymm
  · calc
      _ ≤ ‖j‖ * ‖average‖ := ContinuousLinearMap.opNorm_comp_le _ _
      _ ≤ 1 * 1 := mul_le_mul j_norm_le average_norm_le (norm_nonneg _) (by norm_num)
      _ = 1 := by norm_num
  · have hh := meanProjection.le_opNorm (j e1)
    simpa [meanProjection, ContinuousLinearMap.comp_apply, j_norm, norm_e1] using hh

theorem perpendicular_e2 : perpendicular e2 = e2 := by
  ext i
  fin_cases i <;> simp [perpendicular_apply, e2, PiLp.single_apply]

theorem transverse_norm : ‖transverseProjection‖ = 1 := by
  apply le_antisymm
  · have hp : ‖perpendicular.comp average‖ ≤ 1 := by
      calc
        _ ≤ ‖perpendicular‖ * ‖average‖ := ContinuousLinearMap.opNorm_comp_le _ _
        _ ≤ 1 := by rw [perpendicular_norm, one_mul]; exact average_norm_le
    calc
      _ ≤ ‖j‖ * ‖perpendicular.comp average‖ := ContinuousLinearMap.opNorm_comp_le _ _
      _ ≤ 1 * 1 := mul_le_mul j_norm_le hp (norm_nonneg _) (by norm_num)
      _ = 1 := by norm_num
  · have hh := transverseProjection.le_opNorm (j e2)
    simpa [transverseProjection, ContinuousLinearMap.comp_apply,
      perpendicular_e2, j_norm, norm_e2] using hh

theorem mean_scaled_norm (r : ℝ) : ‖r • meanProjection‖ = |r| := by
  rw [norm_smul, mean_norm, mul_one, Real.norm_eq_abs]

theorem transverse_scaled_norm (r : ℝ) : ‖r • transverseProjection‖ = |r| := by
  rw [norm_smul, transverse_norm, mul_one, Real.norm_eq_abs]

theorem interior_derivative_norm (u : ℝ) (hu0 : 0 ≤ u) (hu : u < 1 / 2) :
    ‖fderiv ℝ (transition u) (equilibrium u)‖ = 1 / 2 := by
  rw [(equilibrium_interior_derivative u hu0 hu).fderiv]
  change ‖(1 / 2 : ℝ) • meanProjection‖ = _
  rw [mean_scaled_norm]
  norm_num

theorem exterior_derivative_norm (u : ℝ) (hu : 1 / 2 < u) :
    ‖fderiv ℝ (transition u) (equilibrium u)‖ = (1 + 2 * u)⁻¹ := by
  rw [(equilibrium_exterior_derivative u hu).fderiv]
  change ‖(1 + 2 * u)⁻¹ • transverseProjection‖ = _
  rw [transverse_scaled_norm, abs_of_pos (inv_pos.mpr (by linarith))]

theorem exterior_coefficient_bounds (u : ℝ) (hu : 1 / 2 < u) (hu1 : u ≤ 1) :
    (1 / 3 : ℝ) ≤ (1 + 2 * u)⁻¹ ∧ (1 + 2 * u)⁻¹ ≤ 1 / 2 := by
  have hp : 0 < 1 + 2 * u := by linarith
  constructor
  · rw [inv_eq_one_div]
    apply (div_le_div_iff₀ (by norm_num : (0 : ℝ) < 3) hp).mpr
    linarith
  · rw [inv_eq_one_div]
    apply (div_le_div_iff₀ hp (by norm_num : (0 : ℝ) < 2)).mpr
    linarith


end
end QICNLean.TypedSpectrum
