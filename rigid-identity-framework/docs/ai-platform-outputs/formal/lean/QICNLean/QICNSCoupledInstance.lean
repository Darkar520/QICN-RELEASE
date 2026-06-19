import QICNLean.QICNAttractorConcrete

/-!
# Non-canonical coupled S-instance carrier facts

This file records reusable Lean facts for a projected-affine carrier intended
for the coupled S-instance construction attempt.

It deliberately does not prove the concrete `R^2` rotation matrix is
irreducible, and it does not certify `Iint` or `Crit_op`.
-/

namespace QICNLean

open Function (IsFixedPt)

noncomputable section

/--
No nontrivial invariant real subspace for the linear part.

For the concrete report this is the intended exact-factorization obstruction
for `K = rho * R(theta)` with non-real eigenvalues, but that concrete matrix
fact is not mechanized here.
-/
def NoNontrivialInvariantRealSubspace
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (K : H →L[ℝ] H) : Prop :=
  ∀ L : Submodule ℝ H, L ≠ ⊥ → L ≠ ⊤ → ¬ (∀ x ∈ L, K x ∈ L)

/-- The coupled projected-affine fixed point is a fixed point of its update. -/
theorem coupled_fixedPoint_isFixedPt
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w : H) :
    IsFixedPt (projectedAffineMap s hne hcl hc K w)
      (projectedAffineFixedPoint s hne hcl hc K hK w) := by
  unfold projectedAffineFixedPoint
  exact ContractingWith.fixedPoint_isFixedPt
    (projectedAffineMap_contracting s hne hcl hc K hK w)

/-- Any fixed point of the coupled projected-affine update is the Banach fixed point. -/
theorem coupled_fixedPoint_unique
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (w y : H)
    (hy : IsFixedPt (projectedAffineMap s hne hcl hc K w) y) :
    y = projectedAffineFixedPoint s hne hcl hc K hK w := by
  exact (projectedAffineMap_contracting s hne hcl hc K hK w).fixedPoint_unique'
    hy
    (coupled_fixedPoint_isFixedPt s hne hcl hc K hK w)

/-- Compactness of the coupled projected-affine fixed-point family. -/
theorem coupled_attractor_family_isCompact
    {U H : Type*} [TopologicalSpace U] [CompactSpace U]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Gamma : U → H) (hGamma : Continuous Gamma) :
    IsCompact (Set.range (fun u =>
      projectedAffineFixedPoint s hne hcl hc K hK (Gamma u))) := by
  exact projected_affine_attractor_isCompact s hne hcl hc K hK Gamma hGamma

/-- Continuity of the coupled projected-affine fixed-point selector. -/
theorem coupled_fixedPoint_selector_continuous
    {U H : Type*} [TopologicalSpace U]
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (hK : ‖K‖ < 1) (Gamma : U → H) (hGamma : Continuous Gamma) :
    Continuous (fun u => projectedAffineFixedPoint s hne hcl hc K hK (Gamma u)) := by
  exact (projectedAffineFixedPoint_continuous s hne hcl hc K hK).comp hGamma

/--
If an exact linear factorization requires a nontrivial invariant subspace, then
`NoNontrivialInvariantRealSubspace K` blocks that exact factorization.
-/
theorem coupled_blocks_exact_linear_factorization
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (K : H →L[ℝ] H) (hNo : NoNontrivialInvariantRealSubspace K)
    (L : Submodule ℝ H) (hbot : L ≠ ⊥) (htop : L ≠ ⊤) :
    ¬ (∀ x ∈ L, K x ∈ L) :=
  hNo L hbot htop

end

end QICNLean
