import QICNLean.QICNGoldenMeanRestriction

/-! Spectral radius/norm correspondence and the source's state-gap bounds.
No state Jacobian is assigned at the non-Frechet corner. -/
namespace QICNLean.StateSpectralBounds

open QICNLean.TypedBanachWitness QICNLean.GoldenMeanParameter
noncomputable section

theorem liftedK_norm : ‖liftedK‖ = 1 / 2 := by
  change ‖(1 / 2 : ℝ) • TypedSpectrum.meanProjection‖ = _
  rw [TypedSpectrum.mean_scaled_norm]
  norm_num

theorem interior_radius_matches_norm (u : ℝ) (hu : 0 ≤ u) (hlt : u < 1 / 2) :
    spectralRadius ℂ ((1 / 2 : ℂ) • ComplexBanachWitness.meanProjection) =
      ENNReal.ofReal ‖fderiv ℝ (transition u) (equilibrium u)‖ := by
  rw [TypedSpectrum.interior_derivative_norm u hu hlt]
  simpa using TypedSpectrum.complex_mean_radius_real_scalar (1 / 2) (by norm_num)

theorem exterior_radius_matches_norm (u : ℝ) (hgt : 1 / 2 < u) :
    spectralRadius ℂ (((1 + 2 * u)⁻¹ : ℝ) • ComplexBanachWitness.transverseProjection) =
      ENNReal.ofReal ‖fderiv ℝ (transition u) (equilibrium u)‖ := by
  rw [TypedSpectrum.exterior_derivative_norm u hgt,
    ← algebraMap_smul ℝ ((1 + 2 * u)⁻¹)]
  exact TypedSpectrum.complex_transverse_radius_real_scalar _ (by positivity)

theorem source_state_gap (u : ℝ) (hu : u ∈ parameterSet) (hne : u ≠ 1 / 2) :
    (1 / 3 : ℝ) ≤ ‖fderiv ℝ (transition u) (equilibrium u)‖ ∧
      ‖fderiv ℝ (transition u) (equilibrium u)‖ ≤ ‖liftedK‖ ∧
      (1 / 2 : ℝ) ≤ 1 - ‖fderiv ℝ (transition u) (equilibrium u)‖ := by
  obtain ⟨hlo, hhi⟩ := TypedRelaxation.regular_derivative_norm_bounds u
    (parameter_mem_interval u hu).1 (parameter_mem_interval u hu).2 hne
  exact ⟨hlo, by simpa [liftedK_norm] using hhi, by linarith⟩

theorem source_radius_norm_correspondence (u : ℝ) (hu : u ∈ parameterSet)
    (hne : u ≠ 1 / 2) :
    ∃ D : ComplexBanachWitness.B →L[ℂ] ComplexBanachWitness.B,
      (∀ f : B, D (ComplexificationMaps.inclusion f) =
        ComplexificationMaps.inclusion ((fderiv ℝ (transition u) (equilibrium u)) f)) ∧
      spectralRadius ℂ D = ENNReal.ofReal ‖fderiv ℝ (transition u) (equilibrium u)‖ := by
  rcases lt_or_gt_of_ne hne with hlt | hgt
  · refine ⟨(1 / 2 : ℂ) • ComplexBanachWitness.meanProjection, ?_,
      interior_radius_matches_norm u (parameter_mem_interval u hu).1 hlt⟩
    intro f
    rw [(RegularEquilibriumDerivatives.equilibrium_interior_derivative u
      (parameter_mem_interval u hu).1 hlt).fderiv]
    exact TypedSpectrum.mean_scaled_extension (1 / 2) f
  · refine ⟨((1 + 2 * u)⁻¹ : ℝ) • ComplexBanachWitness.transverseProjection, ?_,
      exterior_radius_matches_norm u hgt⟩
    intro f
    rw [(RegularEquilibriumDerivatives.equilibrium_exterior_derivative u hgt).fderiv]
    exact TypedSpectrum.transverse_scaled_extension ((1 + 2 * u)⁻¹) f

end
end QICNLean.StateSpectralBounds
