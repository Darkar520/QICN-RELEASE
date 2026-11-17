import QICNLean.QICNFrechetRadialDisk

/-!
Regular equilibrium derivatives on the complete continuous-function Banach
space. The transverse projection acts on Euclidean coordinates, and is lifted
through the actual Bochner average. Spectral conclusions require the separate
complexification construction.
-/
namespace QICNLean.RegularEquilibriumDerivatives

open QICNLean.TypedBanachWitness QICNLean.FrechetRadialDisk
noncomputable section

def e2 : E := EuclideanSpace.single 1 1
def perpendicular : E →L[ℝ] E := InnerProductSpace.rankOne ℝ e2 e2

theorem norm_e2 : ‖e2‖ = 1 := by simp [e2, PiLp.norm_single]

theorem perpendicular_apply (v : E) (i : Fin 2) :
    perpendicular v i = if i = 1 then v 1 else 0 := by
  simp [perpendicular, InnerProductSpace.rankOne_apply, e2,
    EuclideanSpace.inner_single_left, PiLp.single_apply]

theorem perpendicular_eq_sub (v : E) :
    perpendicular v = v - (inner ℝ e1 v) • e1 := by
  ext i
  fin_cases i <;>
    simp [perpendicular_apply, e1, EuclideanSpace.inner_single_left, PiLp.single_apply]

theorem perpendicular_norm : ‖perpendicular‖ = 1 := by
  simp [perpendicular, InnerProductSpace.norm_rankOne, norm_e2]

theorem normalized_axis_derivative (r : ℝ) (hr : 0 < r) :
    normalizedDerivative (r • e1) = r⁻¹ • perpendicular := by
  have hn : ‖r • e1‖ = r := by
    rw [norm_smul, norm_e1, Real.norm_eq_abs, abs_of_pos hr, mul_one]
  apply ContinuousLinearMap.ext
  intro v
  ext i
  simp [normalizedDerivative, normDerivative, hn, perpendicular_eq_sub,
    inner_smul_left, PiLp.smul_apply, PiLp.sub_apply, PiLp.add_apply]
  field_simp
  <;> ring

theorem affine_equilibrium_interior (u : ℝ) (hu : u < 1 / 2) :
    affineInput u (equilibrium u) = (2 * u) • e1 := by
  unfold affineInput equilibrium
  rw [average_j, min_eq_left (by linarith), smul_smul, ← add_smul]
  congr 1
  ring

theorem affine_equilibrium_exterior (u : ℝ) (hu : 1 / 2 < u) :
    affineInput u (equilibrium u) = (u + 1 / 2) • e1 := by
  unfold affineInput equilibrium
  rw [average_j, min_eq_right (by linarith), one_smul, ← add_smul]
  congr 1
  ring

theorem equilibrium_interior_derivative (u : ℝ) (hu0 : 0 ≤ u) (hu : u < 1 / 2) :
    HasFDerivAt (transition u) ((1 / 2 : ℝ) • j.comp average) (equilibrium u) := by
  apply transition_interior_derivative
  rw [affine_equilibrium_interior u hu, norm_smul, norm_e1, Real.norm_eq_abs,
    abs_of_nonneg (by positivity), mul_one]
  linarith

theorem equilibrium_exterior_derivative (u : ℝ) (hu : 1 / 2 < u) :
    HasFDerivAt (transition u) ((1 + 2 * u)⁻¹ • j.comp (perpendicular.comp average))
      (equilibrium u) := by
  have hp : 0 < u + 1 / 2 := by linarith
  have hx : 1 < ‖affineInput u (equilibrium u)‖ := by
    rw [affine_equilibrium_exterior u hu, norm_smul, norm_e1, Real.norm_eq_abs,
      abs_of_pos hp, mul_one]
    linarith
  have hh := transition_exterior_derivative u (equilibrium u) hx
  rw [affine_equilibrium_exterior u hu, normalized_axis_derivative _ hp] at hh
  have hd : j.comp (((u + 1 / 2)⁻¹ • perpendicular).comp ((1 / 2 : ℝ) • average)) =
      (1 + 2 * u)⁻¹ • j.comp (perpendicular.comp average) := by
    have hc : (u + 1 / 2)⁻¹ * (1 / 2 : ℝ) = (1 + 2 * u)⁻¹ := by
      field_simp
      <;> ring
    apply ContinuousLinearMap.ext
    intro v
    simp only [ContinuousLinearMap.comp_apply, smul_apply,
      map_smul, smul_smul]
    rw [mul_comm (1 / 2 : ℝ), hc]
  rw [hd] at hh
  exact hh

end
end QICNLean.RegularEquilibriumDerivatives
