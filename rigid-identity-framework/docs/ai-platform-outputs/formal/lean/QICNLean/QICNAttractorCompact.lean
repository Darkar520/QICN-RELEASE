import QICNLean.QICNConvexProjection

/-!
# Non-canonical attractor compactness pilot

This file mechanizes the compact-image endpoint of BaseCore `thm:compactness`
in a non-canonical Lean layer.

What is discharged here:

* mathlib's standard perturbation estimate for fixed points of two contractions
  with the same contraction constant;
* compactness of the attractor range from an explicitly supplied continuous
  fixed-point selector.

Deferral boundary:

This pass does not discharge `Continuous Gamma -> Continuous fixedPointFamily`
for the concrete projected affine Hilbert family. That bridge is left as an
explicit continuity hypothesis rather than being smuggled in as a proved fact.
-/

namespace QICNLean

noncomputable section

/--
For two contractions with the same contraction constant, mathlib's Banach API
bounds the distance between their fixed points by a uniform pointwise
perturbation bound divided by `1 - K`.
-/
theorem fixedPoint_perturbation_bound
    {X : Type*} [MetricSpace X] [CompleteSpace X] [Nonempty X]
    {K : NNReal} {f g : X -> X} (hf : ContractingWith K f) (hg : ContractingWith K g)
    {C : ℝ} (hfg : ∀ z, dist (f z) (g z) ≤ C) :
    dist (ContractingWith.fixedPoint f hf) (ContractingWith.fixedPoint g hg) ≤
      C / (1 - (K : ℝ)) := by
  exact hf.fixedPoint_lipschitz_in_map hg hfg

/--
Compactness of an attractor family once the fixed-point selector is continuous.

This is intentionally stated for an arbitrary selector `F : U -> H`. In the
BaseCore reading, `F u` is `f_u*`. The concrete proof that the projected affine
fixed-point selector is continuous from H4 is not claimed in this pilot.
-/
theorem attractor_isCompact
    {U H : Type*} [TopologicalSpace U] [CompactSpace U] [TopologicalSpace H]
    (F : U -> H) (hF : Continuous F) :
    IsCompact (Set.range F) := by
  exact isCompact_range hF

end

end QICNLean
