import QICNLean.QICNComplexBanachWitness
import QICNLean.QICNProjectionSpectrum
import Mathlib.MeasureTheory.Function.LocallyIntegrable

/-! Exact spectra on the concrete infinite-dimensional complex Banach space.
Correspondence with the real derivatives must additionally be proved. -/
namespace QICNLean.ComplexProjectionSpectrum

open QICNLean.ComplexBanachWitness QICNLean.ProjectionSpectrum
open scoped unitInterval
noncomputable section

theorem j_norm_le : ‖j‖ ≤ 1 := by
  apply j.opNorm_le_bound (by norm_num)
  intro v
  rw [one_mul, j_norm]

theorem average_norm_le : ‖average‖ ≤ 1 := by
  apply average.opNorm_le_bound (by norm_num)
  intro f
  rw [one_mul, average_apply]
  have hf : MeasureTheory.Integrable f MeasureTheory.volume :=
    f.continuous.integrable_of_hasCompactSupport (HasCompactSupport.of_compactSpace f)
  calc
    _ ≤ ∫ x : unitInterval, ‖f x‖ := MeasureTheory.norm_integral_le_integral_norm _
    _ ≤ ∫ _x : unitInterval, ‖f‖ := MeasureTheory.integral_mono hf.norm
      (MeasureTheory.integrable_const _) (fun x => f.norm_coe_le_norm x)
    _ = ‖f‖ := by simp

theorem perpendicular_norm : ‖perpendicular‖ = 1 := by
  simp [perpendicular, norm_e2]

theorem mean_projection_norm_le : ‖meanProjection‖ ≤ 1 := by
  calc
    _ ≤ ‖j‖ * ‖average‖ := ContinuousLinearMap.opNorm_comp_le _ _
    _ ≤ 1 * 1 := mul_le_mul j_norm_le average_norm_le (norm_nonneg _) (by norm_num)
    _ = 1 := by norm_num

theorem transverse_projection_norm_le : ‖transverseProjection‖ ≤ 1 := by
  have hp : ‖perpendicular.comp average‖ ≤ 1 := by
    calc
      _ ≤ ‖perpendicular‖ * ‖average‖ := ContinuousLinearMap.opNorm_comp_le _ _
      _ ≤ 1 := by rw [perpendicular_norm, one_mul]; exact average_norm_le
  calc
    _ ≤ ‖j‖ * ‖perpendicular.comp average‖ := ContinuousLinearMap.opNorm_comp_le _ _
    _ ≤ 1 * 1 := mul_le_mul j_norm_le hp (norm_nonneg _) (by norm_num)
    _ = 1 := by norm_num

def ramp : B where
  toFun x := (x : ℝ) • e1
  continuous_toFun := continuous_subtype_val.smul continuous_const

theorem mean_projection_ne_zero : meanProjection ≠ 0 := by
  intro h
  have hh := DFunLike.congr_fun h (j e1)
  have hz : j e1 = 0 := by simpa [meanProjection, ContinuousLinearMap.comp_apply] using hh
  have hn := congrArg norm hz
  rw [j_norm, norm_e1, norm_zero] at hn
  norm_num at hn

theorem mean_projection_ne_one : meanProjection ≠ 1 := by
  intro h
  have hc : (meanProjection ramp) (0 : unitInterval) = (meanProjection ramp) 1 := rfl
  rw [h] at hc
  have he : (0 : E) = e1 := by simpa [ramp] using hc
  have hn := congrArg norm he
  rw [norm_zero, norm_e1] at hn
  norm_num at hn

theorem transverse_e1 : transverseProjection (j e1) = 0 := by
  simp [transverseProjection, ContinuousLinearMap.comp_apply, perpendicular,
    InnerProductSpace.rankOne_apply, e1, e2, EuclideanSpace.inner_single_left,
    PiLp.single_apply]

theorem transverse_e2 : transverseProjection (j e2) = j e2 := by
  simp [transverseProjection, ContinuousLinearMap.comp_apply, perpendicular,
    InnerProductSpace.rankOne_apply, e2, EuclideanSpace.inner_single_left,
    PiLp.single_apply]

theorem mean_projection_norm : ‖meanProjection‖ = 1 := by
  apply le_antisymm mean_projection_norm_le
  have hh := meanProjection.le_opNorm (j e1)
  simpa [meanProjection, ContinuousLinearMap.comp_apply, average_j,
    j_norm, norm_e1] using hh

theorem transverse_projection_norm : ‖transverseProjection‖ = 1 := by
  apply le_antisymm transverse_projection_norm_le
  have hh := transverseProjection.le_opNorm (j e2)
  simpa [transverse_e2, j_norm, norm_e2] using hh

theorem mean_scaled_norm (c : ℂ) : ‖c • meanProjection‖ = ‖c‖ := by
  rw [norm_smul, mean_projection_norm, mul_one]

theorem transverse_scaled_norm (c : ℂ) : ‖c • transverseProjection‖ = ‖c‖ := by
  rw [norm_smul, transverse_projection_norm, mul_one]

theorem transverse_projection_ne_zero : transverseProjection ≠ 0 := by
  intro h
  have hh := DFunLike.congr_fun h (j e2)
  rw [transverse_e2] at hh
  have hn := congrArg norm hh
  simpa [j_norm, norm_e2] using hn

theorem transverse_projection_ne_one : transverseProjection ≠ 1 := by
  intro h
  have hh := transverse_e1
  rw [h] at hh
  have hn := congrArg norm hh
  simpa [j_norm, norm_e1] using hn

theorem mean_scaled_spectrum (c : ℂ) :
    spectrum ℂ (c • meanProjection) = {0, c} :=
  scaled_idempotent_spectrum meanProjection mean_projection_idempotent
    mean_projection_ne_zero mean_projection_ne_one c

theorem transverse_scaled_spectrum (c : ℂ) :
    spectrum ℂ (c • transverseProjection) = {0, c} :=
  scaled_idempotent_spectrum transverseProjection transverse_projection_idempotent
    transverse_projection_ne_zero transverse_projection_ne_one c

theorem mean_scaled_radius (c : ℂ) :
    spectralRadius ℂ (c • meanProjection) = ENNReal.ofReal ‖c‖ :=
  scaled_idempotent_radius meanProjection mean_projection_idempotent
    mean_projection_ne_zero mean_projection_ne_one c

theorem transverse_scaled_radius (c : ℂ) :
    spectralRadius ℂ (c • transverseProjection) = ENNReal.ofReal ‖c‖ :=
  scaled_idempotent_radius transverseProjection transverse_projection_idempotent
    transverse_projection_ne_zero transverse_projection_ne_one c

end
end QICNLean.ComplexProjectionSpectrum
