import QICNLean.QICNAttractorConcrete

/-!
# Non-canonical projected-affine S-instance carrier facts

This file mechanizes only the reusable projected-affine carrier obligations
for the speculative S-instance construction report. It does not certify
`Crit_op`, does not prove `Iint`, and does not construct an external system.
-/

namespace QICNLean

open Function (IsFixedPt)

noncomputable section

/-- The projected-affine fixed point is indeed a fixed point of its update. -/
theorem sInstance_fixedPoint_isFixedPt
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w : H) :
    IsFixedPt (projectedAffineMap s hne hcl hc K w)
      (projectedAffineFixedPoint s hne hcl hc K hK w) := by
  unfold projectedAffineFixedPoint
  exact ContractingWith.fixedPoint_isFixedPt
    (projectedAffineMap_contracting s hne hcl hc K hK w)

/-- Any fixed point of the projected-affine update equals the Banach fixed point. -/
theorem sInstance_fixedPoint_unique
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w y : H)
    (hy : IsFixedPt (projectedAffineMap s hne hcl hc K w) y) :
    y = projectedAffineFixedPoint s hne hcl hc K hK w := by
  exact (projectedAffineMap_contracting s hne hcl hc K hK w).fixedPoint_unique'
    hy
    (sInstance_fixedPoint_isFixedPt s hne hcl hc K hK w)

/--
If a common support `A` is invariant under every projected-affine update, then
the carrier has a common forward-invariant support for all admissible
interventions.
-/
theorem sInstance_common_support_forward_invariant
    {U H : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (Gamma : U → H) (A : Set H)
    (hA : ∀ u x, x ∈ A → projectedAffineMap s hne hcl hc K (Gamma u) x ∈ A) :
    ∀ u, Set.MapsTo (projectedAffineMap s hne hcl hc K (Gamma u)) A A := by
  intro u x hx
  exact hA u x hx

/--
Compactness of the projected-affine fixed-point range for compact parameter
space and continuous forcing. This is a named S-instance-facing wrapper around
the previously verified concrete attractor theorem.
-/
theorem sInstance_attractor_family_isCompact
    {U H : Type*} [TopologicalSpace U] [CompactSpace U]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Gamma : U → H) (hGamma : Continuous Gamma) :
    IsCompact (Set.range (fun u =>
      projectedAffineFixedPoint s hne hcl hc K hK (Gamma u))) := by
  exact projected_affine_attractor_isCompact s hne hcl hc K hK Gamma hGamma

/--
Continuity of the projected-affine fixed-point selector along a continuous
forcing map.
-/
theorem sInstance_fixedPoint_selector_continuous
    {U H : Type*} [TopologicalSpace U]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Gamma : U → H) (hGamma : Continuous Gamma) :
    Continuous (fun u => projectedAffineFixedPoint s hne hcl hc K hK (Gamma u)) := by
  exact (projectedAffineFixedPoint_continuous s hne hcl hc K hK).comp hGamma

end

end QICNLean
