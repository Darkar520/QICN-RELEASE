import QICNLean.QICNAnalyticProjection
import QICNLean.QICNParametricContraction
import Mathlib.Analysis.InnerProductSpace.PiL2

/-!
Etapa 3A: H1--H4 on the full real Hilbert domain, radial disk projection,
and geometric iteration. The nonlinear corner expression is an algebraic
component; it does not prove the manuscript's full Frechet/spectrum theorem.
-/
namespace QICNLean.BaseSufficiency

noncomputable section
open Filter

theorem h1_h4_sufficiency
    {H U : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    [CompleteSpace H] [MetricSpace U] [CompactSpace U]
    (s : Set H) (hne : s.Nonempty) (hs : IsClosed s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Γ : U → H) (hΓ : UniformContinuous Γ) :
    (∀ x : H, ∃! y : H, y ∈ s ∧ ‖x - y‖ = ⨅ z : s, ‖x - (z : H)‖) ∧
    (∀ u, ContractingWith ‖K‖₊ (projectedAffineMap s hne hs.isComplete hc K (Γ u))) ∧
    (∀ u, ∃! x, projectedAffineMap s hne hs.isComplete hc K (Γ u) x = x) ∧
    IsCompact (Set.range (fun u =>
      projectedAffineFixedPoint s hne hs.isComplete hc K hK (Γ u))) := by
  exact ⟨AnalyticProjection.closed_convex_unique_minimizer (𝕜 := ℝ) s hne hs hc,
    fun u => projectedAffineMap_contracting s hne hs.isComplete hc K hK (Γ u),
    fun u => ParametricContraction.closed_projected_affine_unique s hne hs hc K hK (Γ u),
    ParametricContraction.closed_projected_affine_compact s hne hs hc K hK Γ hΓ⟩

/-- H1--H4 admit a genuinely collapsed fixed point: no H5 is inferred. -/
theorem zero_data_fixed_point {H U : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    [MetricSpace U] [CompactSpace U]
    (_u : U) :
    ‖(0 : H →L[ℝ] H)‖ < 1 ∧ UniformContinuous (fun _ : U => (0 : H)) ∧
    projectedAffineFixedPoint ({0} : Set H) (Set.singleton_nonempty 0)
      isClosed_singleton.isComplete (convex_singleton 0)
      (0 : H →L[ℝ] H) (by norm_num) 0 = 0 := by
  refine ⟨by norm_num, uniformContinuous_const, ?_⟩
  let f := projectedAffineMap ({0} : Set H) (Set.singleton_nonempty 0)
    isClosed_singleton.isComplete (convex_singleton 0) (0 : H →L[ℝ] H) 0
  have hz (x : H) : f x = 0 := by
    exact Set.mem_singleton_iff.mp
      (convexProjection_mem (Set.singleton_nonempty 0) isClosed_singleton.isComplete
        (convex_singleton 0) ((0 : H →L[ℝ] H) x + 0))
  have hfix := (projectedAffineMap_contracting ({0} : Set H) (Set.singleton_nonempty 0)
    isClosed_singleton.isComplete (convex_singleton 0) (0 : H →L[ℝ] H)
    (by norm_num) 0).fixedPoint_isFixedPt
  change f _ = _ at hfix
  rw [hz] at hfix
  exact hfix.symm

/-- Zero is in every declared constant subspace, so H5 fails on this family. -/
theorem zero_family_fails_noncollapse
    {H U : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    [MetricSpace U] [CompactSpace U] [Nonempty U] (N : Set H) (hN : (0 : H) ∈ N) :
    (∀ _u : U, projectedAffineFixedPoint ({0} : Set H) (Set.singleton_nonempty 0)
      isClosed_singleton.isComplete (convex_singleton 0)
      (0 : H →L[ℝ] H) (by norm_num) 0 ∈ N) ∧
    ¬ (∀ _u : U, ∀ c ∈ N,
      projectedAffineMap ({0} : Set H) (Set.singleton_nonempty 0)
        isClosed_singleton.isComplete (convex_singleton 0) (0 : H →L[ℝ] H) 0 c ≠ c) := by
  constructor
  · intro u
    rw [(zero_data_fixed_point (H := H) u).2.2]
    exact hN
  · intro h
    let u : U := Classical.choice inferInstance
    apply h u 0 hN
    exact Set.mem_singleton_iff.mp
      (convexProjection_mem (Set.singleton_nonempty 0) isClosed_singleton.isComplete
        (convex_singleton 0) ((0 : H →L[ℝ] H) 0 + 0))

variable {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]

def radialDisk (x : H) : H := if ‖x‖ ≤ 1 then x else ‖x‖⁻¹ • x

theorem radialDisk_mem (x : H) : radialDisk x ∈ Metric.closedBall (0 : H) 1 := by
  simp only [Metric.mem_closedBall, dist_zero_right]
  by_cases hx : ‖x‖ ≤ 1
  · simp [radialDisk, hx]
  · have hp : 0 < ‖x‖ := lt_trans zero_lt_one (lt_of_not_ge hx)
    simp [radialDisk, hx, norm_smul,
      inv_mul_cancel₀ (ne_of_gt hp)]

theorem radialDisk_minimizes (x : H) :
    ‖x - radialDisk x‖ = ⨅ z : Metric.closedBall (0 : H) 1, ‖x - (z : H)‖ := by
  let s := Metric.closedBall (0 : H) 1
  letI : Nonempty s := ⟨⟨0, by simp [s]⟩⟩
  have hbb : BddBelow (Set.range (fun z : s => ‖x - (z : H)‖)) :=
    ⟨0, by rintro _ ⟨z, rfl⟩; exact norm_nonneg _⟩
  apply le_antisymm
  · apply le_ciInf
    intro z
    by_cases hx : ‖x‖ ≤ 1
    · simp [radialDisk, hx]
    · have ht : 1 < ‖x‖ := lt_of_not_ge hx
      have hp : 0 < ‖x‖ := lt_trans zero_lt_one ht
      have hi : ‖x‖⁻¹ ≤ 1 := (inv_le_one₀ hp).mpr ht.le
      have hz : ‖(z : H)‖ ≤ 1 := by
        simpa only [s, Metric.mem_closedBall, dist_zero_right] using z.property
      have heq : x - ‖x‖⁻¹ • x = (1 - ‖x‖⁻¹) • x := by rw [sub_smul, one_smul]
      rw [radialDisk, if_neg hx, heq, norm_smul, Real.norm_eq_abs,
        abs_of_nonneg (sub_nonneg.mpr hi)]
      have hnorm := norm_sub_norm_le x (z : H)
      have hprod : (1 - ‖x‖⁻¹) * ‖x‖ = ‖x‖ - 1 := by
        rw [sub_mul, one_mul, inv_mul_cancel₀ (ne_of_gt hp)]
      rw [hprod]
      linarith
  · exact ciInf_le hbb ⟨radialDisk x, radialDisk_mem x⟩

theorem radialDisk_eq_projection [CompleteSpace H] (x : H) :
    radialDisk x = AnalyticProjection.projection (𝕜 := ℝ)
      (Metric.closedBall (0 : H) 1) ⟨0, by simp⟩ Metric.isClosed_closedBall
      (convex_closedBall (0 : H) 1) x := by
  exact convex_minimizer_unique (convex_closedBall (0 : H) 1)
    (radialDisk_mem x) (AnalyticProjection.projection_mem (𝕜 := ℝ) _ _ _ _ x)
    (radialDisk_minimizes x) (convexProjection_minimizes _ _ _ x)

theorem radialDisk_nonexpansive [CompleteSpace H] (x y : H) :
    ‖radialDisk x - radialDisk y‖ ≤ ‖x - y‖ := by
  rw [radialDisk_eq_projection x, radialDisk_eq_projection y]
  exact AnalyticProjection.projection_nonexpansive (𝕜 := ℝ) _ _ _ _ x y

/-- Exact Euclidean two-dimensional instance of manuscript lem:disk-projection. -/
theorem disk_projection_nonexpansive_plane (x y : EuclideanSpace ℝ (Fin 2)) :
    ‖radialDisk x - radialDisk y‖ ≤ ‖x - y‖ := radialDisk_nonexpansive x y

/-- Entire-orbit bound, not a physical-time or complete spectral assertion. -/
theorem geometric_iteration {X : Type*} [MetricSpace X]
    {F : X → X} {k : NNReal} (hF : LipschitzWith k F)
    (z : X) (hz : F z = z) (x : X) (n : ℕ) :
    dist (F^[n] x) z ≤ (k : ℝ)^n * dist x z := by
  have h := (hF.iterate n).dist_le_mul x z
  have hz' : F^[n] z = z := Function.IsFixedPt.iterate hz n
  simpa [hz'] using h

def cornerRay (h : ℝ) : ℝ := (h - max h 0) / 2

/-- The published corner expression cannot be a linear derivative. -/
theorem cornerRay_not_linear :
    ¬ ∃ L : ℝ →ₗ[ℝ] ℝ, ∀ h, L h = cornerRay h := by
  rintro ⟨L, hL⟩
  have hp := hL 1
  have hn := hL (-1)
  rw [map_neg] at hn
  norm_num [cornerRay] at hp hn
  linarith

end
end QICNLean.BaseSufficiency
