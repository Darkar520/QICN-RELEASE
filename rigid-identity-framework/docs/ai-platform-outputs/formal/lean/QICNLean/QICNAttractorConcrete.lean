import QICNLean.QICNAttractorCompact

/-!
# Non-canonical concrete attractor compactness instance

This file closes the previously explicit continuity hypothesis for the concrete
projected-affine Hilbert family:

`T_w x = convexProjection s ... (K x + w)`.

It proves that the fixed-point selector `w |-> fixedPoint T_w` is Lipschitz, so
`u |-> fixedPoint T_(Gamma u)` is continuous when `Gamma` is continuous. The
range compactness then follows from `attractor_isCompact`.
-/

namespace QICNLean

noncomputable section

/-- Projected affine update with forcing term `w`. -/
def projectedAffineMap
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (w : H) : H -> H :=
  fun x => convexProjection s hne hcl hc (K x + w)

/-- The projected affine update is a contraction with constant `‖K‖₊`. -/
theorem projectedAffineMap_contracting
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w : H) :
    ContractingWith ‖K‖₊ (projectedAffineMap s hne hcl hc K w) :=
  show ContractingWith ‖K‖₊
      (fun x => (fun y => convexProjection s hne hcl hc y) ((fun x => K x + w) x)) from
    nonexpansive_after_contracting
      (K := ‖K‖₊)
      (base := fun x => K x + w)
      (project := fun y => convexProjection s hne hcl hc y)
      (hbase := affine_contracting K w hK)
      (hproject := convexProjection_lipschitz s hne hcl hc)

/-- Fixed point of the projected affine update as a function of the forcing term. -/
def projectedAffineFixedPoint
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w : H) : H :=
  ContractingWith.fixedPoint
    (projectedAffineMap s hne hcl hc K w)
    (projectedAffineMap_contracting s hne hcl hc K hK w)

/--
The fixed-point selector is Lipschitz in the forcing term `w`.

The constant is the standard Banach perturbation factor `(1 - ‖K‖)⁻¹`.
-/
theorem projectedAffineFixedPoint_lipschitz
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) :
    LipschitzWith (Real.toNNReal ((1 - (‖K‖₊ : ℝ))⁻¹))
      (projectedAffineFixedPoint s hne hcl hc K hK) := by
  have hKn : (‖K‖₊ : ℝ) < 1 := by
    exact_mod_cast hK
  have hden_pos : 0 < 1 - (‖K‖₊ : ℝ) := sub_pos.mpr hKn
  have hconst :
      ((Real.toNNReal ((1 - (‖K‖₊ : ℝ))⁻¹) : NNReal) : ℝ) =
        (1 - (‖K‖₊ : ℝ))⁻¹ := by
    rw [Real.coe_toNNReal]
    exact inv_nonneg.mpr (le_of_lt hden_pos)
  refine LipschitzWith.of_dist_le_mul fun w1 w2 => ?_
  have hfp :
      dist (projectedAffineFixedPoint s hne hcl hc K hK w1)
        (projectedAffineFixedPoint s hne hcl hc K hK w2) ≤
          dist w1 w2 / (1 - (‖K‖₊ : ℝ)) := by
    apply fixedPoint_perturbation_bound
    intro z
    calc
      dist (projectedAffineMap s hne hcl hc K w1 z)
          (projectedAffineMap s hne hcl hc K w2 z)
          ≤ (1 : NNReal) * dist (K z + w1) (K z + w2) :=
            (convexProjection_lipschitz s hne hcl hc).dist_le_mul _ _
      _ = dist w1 w2 := by
            simp [dist_eq_norm, sub_eq_add_neg, add_comm, add_left_comm, add_assoc]
  calc
    dist (projectedAffineFixedPoint s hne hcl hc K hK w1)
        (projectedAffineFixedPoint s hne hcl hc K hK w2)
        ≤ dist w1 w2 / (1 - (‖K‖₊ : ℝ)) := hfp
    _ = (1 - (‖K‖₊ : ℝ))⁻¹ * dist w1 w2 := by
          rw [div_eq_inv_mul]
    _ = (Real.toNNReal ((1 - (‖K‖₊ : ℝ))⁻¹) : ℝ) * dist w1 w2 := by
          rw [hconst]

/-- The concrete fixed-point selector is continuous in `w`. -/
theorem projectedAffineFixedPoint_continuous
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) :
    Continuous (projectedAffineFixedPoint s hne hcl hc K hK) :=
  (projectedAffineFixedPoint_lipschitz s hne hcl hc K hK).continuous

/--
Concrete projected-affine attractor compactness from compact parameter space and
continuous forcing `Gamma`.
-/
theorem projected_affine_attractor_isCompact
    {U H : Type*} [TopologicalSpace U] [CompactSpace U]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Gamma : U -> H) (hGamma : Continuous Gamma) :
    IsCompact (Set.range (fun u => projectedAffineFixedPoint s hne hcl hc K hK (Gamma u))) := by
  exact attractor_isCompact
    (fun u => projectedAffineFixedPoint s hne hcl hc K hK (Gamma u))
    ((projectedAffineFixedPoint_continuous s hne hcl hc K hK).comp hGamma)

end

end QICNLean
