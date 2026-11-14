import QICNLean.QICNAttractorConcrete

/-!
# Uniformly contractive families on arbitrary complete metric spaces

The parameter continuity assumption is pointwise in the state; joint continuity
is not required. The contraction constant is uniform in the parameter. Compact
attractor range requires a compact parameter space. Non-collapse is NOT inferred
from contraction: the existing explicit H5 theorem remains separate.
Registry anchors: basecore:theorem:thm-fixedpoint, thm-compactness,
thm-contraction, thm-noncollapse (last only as a separate conditional component).
-/
namespace QICNLean.ParametricContraction

open Filter Function
noncomputable section

variable {U X : Type*} [MetricSpace X] [CompleteSpace X] [Nonempty X]
  {k : NNReal} (F : U → X → X) (hF : ∀ u, ContractingWith k (F u))

def equilibrium (u : U) : X := (hF u).fixedPoint (F u)

theorem equilibrium_fixed (u : U) : F u (equilibrium F hF u) = equilibrium F hF u :=
  (hF u).fixedPoint_isFixedPt

include hF in
theorem equilibrium_unique (u : U) : ∃! x, F u x = x := by
  refine ⟨equilibrium F hF u, equilibrium_fixed F hF u, ?_⟩
  intro y hy
  exact (hF u).fixedPoint_unique hy

theorem equilibrium_convergence (u : U) (x : X) :
    Tendsto (fun n : ℕ => (F u)^[n] x) atTop (nhds (equilibrium F hF u)) :=
  (hF u).tendsto_iterate_fixedPoint x

/-- Perturbation is measured at the reference equilibrium, not at every state. -/
theorem equilibrium_perturbation (u v : U) :
    dist (equilibrium F hF u) (equilibrium F hF v) ≤
      dist (F u (equilibrium F hF u)) (F v (equilibrium F hF u)) / (1 - (k : ℝ)) := by
  rw [equilibrium_fixed F hF u]
  exact (hF v).dist_fixedPoint_le (equilibrium F hF u)

theorem equilibrium_continuous [MetricSpace U]
    (hparam : ∀ x, Continuous (fun u => F u x)) : Continuous (equilibrium F hF) := by
  apply Metric.continuous_iff.mpr
  intro u ε hε
  have hden : 0 < 1 - (k : ℝ) := (hF u).one_sub_K_pos
  obtain ⟨δ, hδ, hclose⟩ := Metric.continuous_iff.mp (hparam (equilibrium F hF u))
    u (ε * (1 - (k : ℝ))) (mul_pos hε hden)
  refine ⟨δ, hδ, fun v hv => ?_⟩
  have hsmall := hclose v hv
  have hbound := equilibrium_perturbation F hF u v
  rw [dist_comm] at hsmall
  rw [dist_comm (equilibrium F hF v)]
  exact lt_of_le_of_lt hbound ((div_lt_iff₀ hden).mpr hsmall)

theorem equilibrium_compact_range [MetricSpace U] [CompactSpace U]
    (hparam : ∀ x, Continuous (fun u => F u x)) :
    IsCompact (Set.range (equilibrium F hF)) :=
  isCompact_range (equilibrium_continuous F hF hparam)

/-- Manuscript H1-H3, with closedness/completeness and uniqueness explicit. -/
theorem closed_projected_affine_unique
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hs : IsClosed s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w : H) :
    ∃! x, QICNLean.projectedAffineMap s hne hs.isComplete hc K w x = x := by
  exact equilibrium_unique (fun v => QICNLean.projectedAffineMap s hne hs.isComplete hc K v)
    (QICNLean.projectedAffineMap_contracting s hne hs.isComplete hc K hK) w

theorem closed_projected_affine_contraction
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    [CompleteSpace H] (s : Set H) (hne : s.Nonempty) (hs : IsClosed s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w x y : H) :
    ‖QICNLean.projectedAffineMap s hne hs.isComplete hc K w x -
      QICNLean.projectedAffineMap s hne hs.isComplete hc K w y‖ ≤ ‖K‖ * ‖x-y‖ := by
  simpa only [dist_eq_norm, coe_nnnorm] using
    (QICNLean.projectedAffineMap_contracting s hne hs.isComplete hc K hK w).dist_le_mul x y

theorem closed_projected_affine_compact
    {V H : Type*} [PseudoMetricSpace V] [CompactSpace V]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hs : IsClosed s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Γ : V → H) (hΓ : UniformContinuous Γ) :
    IsCompact (Set.range (fun u =>
      QICNLean.projectedAffineFixedPoint s hne hs.isComplete hc K hK (Γ u))) :=
  QICNLean.projected_affine_attractor_isCompact s hne hs.isComplete hc K hK Γ hΓ.continuous

end
end QICNLean.ParametricContraction
