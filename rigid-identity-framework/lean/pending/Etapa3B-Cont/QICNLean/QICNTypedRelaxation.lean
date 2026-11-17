import QICNLean.QICNRealDerivativeNorms
import QICNLean.QICNBoundaryObstruction
import Mathlib.Analysis.SpecialFunctions.Log.Basic

/-! Local error contraction and eventual entry for the actual Banach witness.
All times below count iterations; no physical-time calibration is introduced. -/
namespace QICNLean.TypedRelaxation

open QICNLean.TypedBanachWitness Filter
open scoped Topology
noncomputable section

theorem frechet_centered_bound {X : Type*} [NormedAddCommGroup X] [NormedSpace ℝ X]
    (F : X → X) (x : X) (L : X →L[ℝ] X) (hF : HasFDerivAt F L x)
    (r : ℝ) (hr : ‖L‖ < r) :
    ∃ δ > 0, ∀ y : X, ‖y - x‖ < δ → ‖F y - F x‖ ≤ r * ‖y - x‖ := by
  have ho := (hasFDerivAt_iff_isLittleO.mp hF).bound (sub_pos.mpr hr)
  have hb : ∀ᶠ y in 𝓝 x, ‖F y - F x‖ ≤ r * ‖y - x‖ := by
    filter_upwards [ho] with y hy
    calc
      _ = ‖(F y - F x - L (y - x)) + L (y - x)‖ := by rw [sub_add_cancel]
      _ ≤ ‖F y - F x - L (y - x)‖ + ‖L (y - x)‖ := norm_add_le _ _
      _ ≤ (r - ‖L‖) * ‖y - x‖ + ‖L‖ * ‖y - x‖ :=
        add_le_add hy (L.le_opNorm (y - x))
      _ = _ := by ring
  obtain ⟨δ, hδ, hbδ⟩ := Metric.eventually_nhds_iff.mp hb
  exact ⟨δ, hδ, fun y hy => hbδ (by simpa [dist_eq_norm] using hy)⟩

theorem orbit_tendsto_equilibrium (u : ℝ) (hu : 0 ≤ u) (f : B) :
    Tendsto (fun n : ℕ => (transition u)^[n] f) atTop (𝓝 (equilibrium u)) := by
  have hc := transition_contracting u
  have ht := hc.tendsto_iterate_fixedPoint f
  rw [← hc.fixedPoint_unique (equilibrium_fixed u hu)] at ht
  exact ht

theorem eventual_entry (u : ℝ) (hu : 0 ≤ u) (f : B) (δ : ℝ) (hδ : 0 < δ) :
    ∃ N : ℕ, ∀ n ≥ N, ‖(transition u)^[n] f - equilibrium u‖ < δ := by
  simpa only [dist_eq_norm] using
    Metric.tendsto_atTop.mp (orbit_tendsto_equilibrium u hu f) δ hδ

theorem local_ball_and_entry (u : ℝ) (hu : 0 ≤ u) (hne : u ≠ 1 / 2)
    (r : ℝ) (hr : ‖fderiv ℝ (transition u) (equilibrium u)‖ < r) (hr1 : r < 1) :
    ∃ δ > 0,
      (∀ f : B, ‖f - equilibrium u‖ < δ →
        ‖transition u f - equilibrium u‖ ≤ r * ‖f - equilibrium u‖) ∧
      (∀ f : B, ‖f - equilibrium u‖ < δ → ‖transition u f - equilibrium u‖ < δ) ∧
      (∀ f : B, ∃ N : ℕ, ∀ n ≥ N, ‖(transition u)^[n] f - equilibrium u‖ < δ) := by
  have hd := ((BoundaryObstruction.differentiable_iff_regular u hu).mpr hne).hasFDerivAt
  obtain ⟨δ, hδ, hb⟩ := frechet_centered_bound (transition u) (equilibrium u)
    (fderiv ℝ (transition u) (equilibrium u)) hd r hr
  have hcenter : ∀ f : B, ‖f - equilibrium u‖ < δ →
      ‖transition u f - equilibrium u‖ ≤ r * ‖f - equilibrium u‖ := by
    intro f hf
    simpa [equilibrium_fixed u hu] using hb f hf
  refine ⟨δ, hδ, hcenter, ?_, fun f => eventual_entry u hu f δ hδ⟩
  intro f hf
  calc
    _ ≤ r * ‖f - equilibrium u‖ := hcenter f hf
    _ ≤ ‖f - equilibrium u‖ := mul_le_of_le_one_left (norm_nonneg _) hr1.le
    _ < δ := hf

theorem spectral_efolding_formula (a : ℝ) :
    -1 / Real.log a⁻¹ = 1 / Real.log a := by rw [Real.log_inv]; ring

theorem efolding_bounds (u : ℝ) (hu : 1 / 2 < u) (hu1 : u ≤ 1) :
    1 / Real.log 3 ≤ 1 / Real.log (1 + 2 * u) ∧
      1 / Real.log (1 + 2 * u) ≤ 1 / Real.log 2 := by
  have h2 : 0 < Real.log 2 := Real.log_pos (by norm_num)
  have h3 : 0 < Real.log 3 := Real.log_pos (by norm_num)
  have ha : 0 < 1 + 2 * u := by linarith
  have hlo : Real.log 2 ≤ Real.log (1 + 2 * u) :=
    Real.log_le_log (by norm_num) (by linarith)
  have hhi : Real.log (1 + 2 * u) ≤ Real.log 3 := Real.log_le_log ha (by linarith)
  have hp : 0 < Real.log (1 + 2 * u) := h2.trans_le hlo
  constructor
  · exact one_div_le_one_div_of_le hp hhi
  · exact one_div_le_one_div_of_le h2 hlo

theorem regular_derivative_norm_bounds (u : ℝ) (hu : 0 ≤ u) (hu1 : u ≤ 1)
    (hne : u ≠ 1 / 2) :
    (1 / 3 : ℝ) ≤ ‖fderiv ℝ (transition u) (equilibrium u)‖ ∧
      ‖fderiv ℝ (transition u) (equilibrium u)‖ ≤ 1 / 2 := by
  rcases lt_or_gt_of_ne hne with hlt | hgt
  · rw [TypedSpectrum.interior_derivative_norm u hu hlt]
    norm_num
  · rw [TypedSpectrum.exterior_derivative_norm u hgt]
    exact TypedSpectrum.exterior_coefficient_bounds u hgt hu1

theorem regular_efolding_bounds (u : ℝ) (hu : 0 ≤ u) (hu1 : u ≤ 1)
    (hne : u ≠ 1 / 2) :
    1 / Real.log 3 ≤ -1 / Real.log ‖fderiv ℝ (transition u) (equilibrium u)‖ ∧
      -1 / Real.log ‖fderiv ℝ (transition u) (equilibrium u)‖ ≤ 1 / Real.log 2 := by
  rcases lt_or_gt_of_ne hne with hlt | hgt
  · rw [TypedSpectrum.interior_derivative_norm u hu hlt]
    have ht : -1 / Real.log (1 / 2 : ℝ) = 1 / Real.log 2 := by
      simpa [one_div] using spectral_efolding_formula 2
    rw [ht]
    refine ⟨?_, le_rfl⟩
    exact one_div_le_one_div_of_le (Real.log_pos (by norm_num : (1 : ℝ) < 2))
      (Real.log_le_log (by norm_num : (0 : ℝ) < 2) (by norm_num))
  · rw [TypedSpectrum.exterior_derivative_norm u hgt, spectral_efolding_formula]
    exact efolding_bounds u hgt hu1

end
end QICNLean.TypedRelaxation
