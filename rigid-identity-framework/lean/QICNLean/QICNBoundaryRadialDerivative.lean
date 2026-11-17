import QICNLean.QICNFrechetRadialDisk
import Mathlib.Analysis.Calculus.Deriv.Slope

/-!
One-sided directional limits of the radial projection in arbitrary ambient
directions. These are genuine limits on the Euclidean disk and, after lifting,
on the complete continuous-function Banach space.
-/
namespace QICNLean.BoundaryRadialDerivative

open QICNLean.TypedBanachWitness QICNLean.FrechetRadialDisk Filter
open scoped Topology
noncomputable section

theorem radial_eq_max (x : E) :
    BaseSufficiency.radialDisk x = (max 1 ‖x‖)⁻¹ • x := by
  by_cases hx : ‖x‖ ≤ 1
  · simp [BaseSufficiency.radialDisk, hx, max_eq_left hx]
  · simp [BaseSufficiency.radialDisk, hx, max_eq_right (le_of_not_ge hx)]

theorem max_increment (n t : ℝ) (ht : 0 < t) :
    max 1 n = 1 + t * max ((n - 1) / t) 0 := by
  by_cases hn : n ≤ 1
  · have hq : (n - 1) / t ≤ 0 := div_nonpos_of_nonpos_of_nonneg (by linarith) ht.le
    simp [max_eq_left hn, max_eq_right hq]
  · have hn' : 1 ≤ n := le_of_not_ge hn
    have hq : 0 ≤ (n - 1) / t := div_nonneg (by linarith) ht.le
    rw [max_eq_right hn', max_eq_left hq]
    field_simp
    <;> ring

theorem radial_difference_quotient (v : E) (t : ℝ) (ht : 0 < t) :
    t⁻¹ • (BaseSufficiency.radialDisk (e1 + t • v) - e1) =
      (max 1 ‖e1 + t • v‖)⁻¹ •
        (v - max ((‖e1 + t • v‖ - 1) / t) 0 • e1) := by
  rw [radial_eq_max]
  have hd : max 1 ‖e1 + t • v‖ ≠ 0 := ne_of_gt (lt_of_lt_of_le zero_lt_one (le_max_left _ _))
  have hm := max_increment ‖e1 + t • v‖ t ht
  generalize max 1 ‖e1 + t • v‖ = d at *
  generalize max ((‖e1 + t • v‖ - 1) / t) 0 = q at *
  simp only [smul_add, smul_sub, smul_smul]
  have h1 : t⁻¹ * (d⁻¹ * t) = d⁻¹ := by field_simp
  have h2 : t⁻¹ * d⁻¹ - t⁻¹ = -(d⁻¹ * q) := by
    field_simp
    nlinarith [hm]
  rw [h1]
  calc
    _ = (t⁻¹ * d⁻¹ - t⁻¹) • e1 + d⁻¹ • v := by rw [sub_smul]; abel
    _ = _ := by rw [h2, neg_smul]; abel

theorem norm_axis_ray_derivative (v : E) :
    HasDerivAt (fun t : ℝ => ‖e1 + t • v‖) (inner ℝ e1 v) 0 := by
  have hne : e1 ≠ 0 := by intro h; have := norm_e1; simp [h] at this
  have hi : HasDerivAt (fun t : ℝ => e1 + t • v) v 0 := by
    simpa using (((hasDerivAt_id (0 : ℝ)).smul_const v).const_add e1)
  have hn : HasFDerivAt (fun y : E => ‖y‖) (normDerivative e1) (e1 + (0 : ℝ) • v) := by
    simpa using norm_hasFDerivAt e1 hne
  have hd := hn.comp_hasDerivAt 0 hi
  convert hd using 1 <;> first | rfl | simp [normDerivative, norm_e1, Function.comp_def]

theorem radial_boundary_direction (v : E) :
    Tendsto (fun t : ℝ => t⁻¹ • (BaseSufficiency.radialDisk (e1 + t • v) - e1))
      (𝓝[>] 0) (𝓝 (v - max (inner ℝ e1 v) 0 • e1)) := by
  have hnorm : Tendsto (fun t : ℝ => ‖e1 + t • v‖) (𝓝[>] 0) (𝓝 1) := by
    simpa [norm_e1] using (norm_axis_ray_derivative v).continuousAt.tendsto.mono_left
      nhdsWithin_le_nhds
  have hslope : Tendsto (fun t : ℝ => (‖e1 + t • v‖ - 1) / t)
      (𝓝[>] 0) (𝓝 (inner ℝ e1 v)) := by
    simpa [norm_e1, div_eq_mul_inv, mul_comm] using
      (norm_axis_ray_derivative v).tendsto_slope_zero_right
  have hmax : Tendsto (fun t : ℝ => max 1 ‖e1 + t • v‖) (𝓝[>] 0) (𝓝 (max 1 1)) :=
    tendsto_const_nhds.max hnorm
  have hi := hmax.inv₀ (by norm_num : max (1 : ℝ) 1 ≠ 0)
  have hdir : Tendsto
      (fun t : ℝ => v - max ((‖e1 + t • v‖ - 1) / t) 0 • e1)
      (𝓝[>] 0) (𝓝 (v - max (inner ℝ e1 v) 0 • e1)) :=
    tendsto_const_nhds.sub ((hslope.max tendsto_const_nhds).smul
    (tendsto_const_nhds : Tendsto (fun _ : ℝ => e1) (𝓝[>] 0) (𝓝 e1)))
  have hh := hi.smul hdir
  have heq : (fun t : ℝ => t⁻¹ • (BaseSufficiency.radialDisk (e1 + t • v) - e1)) =ᶠ[𝓝[>] 0]
      (fun t => (max 1 ‖e1 + t • v‖)⁻¹ •
        (v - max ((‖e1 + t • v‖ - 1) / t) 0 • e1)) := by
    filter_upwards [self_mem_nhdsWithin] with t ht
    exact radial_difference_quotient v t ht
  have ht : Tendsto
      (fun t : ℝ => (max 1 ‖e1 + t • v‖)⁻¹ •
        (v - max ((‖e1 + t • v‖ - 1) / t) 0 • e1))
      (𝓝[>] 0) (𝓝 (v - max (inner ℝ e1 v) 0 • e1)) := by
    simpa using hh
  exact ht.congr' heq.symm

theorem transition_boundary_ray (h : B) (t : ℝ) :
    transition (1 / 2) (j e1 + t • h) =
      j (BaseSufficiency.radialDisk (e1 + t • ((1 / 2 : ℝ) • average h))) := by
  rw [transition_formula, map_add average, map_smul average, average_j]
  congr 2
  simp only [smul_add, smul_smul]
  calc
    _ = ((1 / 2 : ℝ) + 1 / 2) • e1 + ((1 / 2 : ℝ) * t) • average h := by
      rw [add_smul]
      abel
    _ = _ := by norm_num; rw [mul_comm (1 / 2 : ℝ) t]

/-- Actual one-sided directional derivative on the full Banach space B,
including nonconstant directions h. No finite-dimensional substitute is used. -/
theorem transition_boundary_direction (h : B) :
    Tendsto (fun t : ℝ => t⁻¹ •
      (transition (1 / 2) (j e1 + t • h) - j e1)) (𝓝[>] 0)
      (𝓝 (j (((1 / 2 : ℝ) • average h) -
        max (inner ℝ e1 ((1 / 2 : ℝ) • average h)) 0 • e1))) := by
  have hr := radial_boundary_direction ((1 / 2 : ℝ) • average h)
  have hj := (j.continuous.tendsto _).comp hr
  have heq :
      (fun t : ℝ => t⁻¹ • (transition (1 / 2) (j e1 + t • h) - j e1)) =
      (fun t : ℝ => j (t⁻¹ • (BaseSufficiency.radialDisk
        (e1 + t • ((1 / 2 : ℝ) • average h)) - e1))) := by
    funext t
    rw [transition_boundary_ray, map_smul j, map_sub j]
  rw [heq]
  exact hj

end
end QICNLean.BoundaryRadialDerivative
