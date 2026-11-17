import QICNLean.QICNRealDerivativeNorms
import QICNLean.QICNBoundaryObstruction
import QICNLean.QICNComplexifiedDerivatives

/-! Derivative norms and complex extensions on the source Banach witness. -/
namespace QICNLean.TypedSpectrum

open QICNLean.TypedBanachWitness QICNLean.RegularEquilibriumDerivatives
noncomputable section

theorem mean_scaled_extension (r : ℝ) (f : B) :
    ((r : ℂ) • ComplexBanachWitness.meanProjection) (ComplexificationMaps.inclusion f) =
      ComplexificationMaps.inclusion ((r • meanProjection) f) := by
  simp only [smul_apply, meanProjection, ContinuousLinearMap.comp_apply,
    map_smul, ComplexifiedDerivatives.mean_projection_extension]
  exact algebraMap_smul ℝ r _

theorem transverse_scaled_extension (r : ℝ) (f : B) :
    ((r : ℂ) • ComplexBanachWitness.transverseProjection) (ComplexificationMaps.inclusion f) =
      ComplexificationMaps.inclusion ((r • transverseProjection) f) := by
  simp only [smul_apply, transverseProjection, ContinuousLinearMap.comp_apply,
    map_smul, ComplexifiedDerivatives.transverse_projection_extension]
  exact algebraMap_smul ℝ r _

theorem interior_complex_spectrum :
    spectrum ℂ ((1 / 2 : ℂ) • ComplexBanachWitness.meanProjection) = {0, 1 / 2} :=
  ComplexProjectionSpectrum.mean_scaled_spectrum (1 / 2)

theorem exterior_complex_spectrum (u : ℝ) :
    spectrum ℂ (((1 + 2 * u)⁻¹ : ℝ) • ComplexBanachWitness.transverseProjection) =
      {0, (((1 + 2 * u)⁻¹ : ℝ) : ℂ)} := by
  rw [← algebraMap_smul ℝ ((1 + 2 * u)⁻¹)]
  exact ComplexProjectionSpectrum.transverse_scaled_spectrum _

theorem complex_mean_radius_real_scalar (r : ℝ) (hr : 0 ≤ r) :
    spectralRadius ℂ ((r : ℂ) • ComplexBanachWitness.meanProjection) = ENNReal.ofReal r := by
  rw [ComplexProjectionSpectrum.mean_scaled_radius, Complex.norm_real,
    Real.norm_eq_abs, abs_of_nonneg hr]

theorem complex_transverse_radius_real_scalar (r : ℝ) (hr : 0 ≤ r) :
    spectralRadius ℂ ((r : ℂ) • ComplexBanachWitness.transverseProjection) = ENNReal.ofReal r := by
  rw [ComplexProjectionSpectrum.transverse_scaled_radius, Complex.norm_real,
    Real.norm_eq_abs, abs_of_nonneg hr]

theorem boundary_direction_source (h : B) :
    Filter.Tendsto (fun t : ℝ => t⁻¹ •
      (transition (1 / 2) (j e1 + t • h) - j e1))
      (nhdsWithin 0 (Set.Ioi 0))
      (nhds ((1 / 2 : ℝ) • j (average h - max (inner ℝ e1 (average h)) 0 • e1))) := by
  have heq : j (((1 / 2 : ℝ) • average h) -
      max (inner ℝ e1 ((1 / 2 : ℝ) • average h)) 0 • e1) =
      (1 / 2 : ℝ) • j (average h - max (inner ℝ e1 (average h)) 0 • e1) := by
    rw [← map_smul j]
    congr 1
    rw [smul_sub, smul_smul, inner_smul_right]
    have hm : (1 / 2 : ℝ) * max (inner ℝ e1 (average h)) 0 =
        max ((1 / 2 : ℝ) * inner ℝ e1 (average h)) 0 := by
      simpa using mul_max_of_nonneg (inner ℝ e1 (average h)) 0
        (by norm_num : (0 : ℝ) ≤ 1 / 2)
    rw [hm]
  rw [← heq]
  exact BoundaryRadialDerivative.transition_boundary_direction h

end
end QICNLean.TypedSpectrum
