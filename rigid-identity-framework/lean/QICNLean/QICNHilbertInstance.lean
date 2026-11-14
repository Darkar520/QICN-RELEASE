import QICNLean.QICNContraction
import Mathlib.Analysis.InnerProductSpace.Projection.Basic
import Mathlib.Analysis.Normed.Operator.NNNorm

/-!
# Non-canonical Hilbert subspace instance

This file instantiates the abstract contraction pilot for a real Hilbert space
with an affine contractive update and orthogonal projection onto a complete
linear subspace.

Boundary: this is the subspace case. It does not mechanize the full BaseCore H1
case of a nonempty closed convex subset. Mathlib v4.31.0 provides the Hilbert
projection theorem for complete convex subsets via
`exists_norm_eq_iInf_of_complete_convex`, but this pass uses the ready
continuous-linear `Submodule.starProjection` API and its norm bound.
-/

namespace QICNLean

open Filter
open Function (IsFixedPt)

/--
The affine map `x |-> K x + c` is contractive whenever the operator norm of
`K` is strictly smaller than one.
-/
theorem affine_contracting
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (K : H →L[ℝ] H) (c : H) (hK : ‖K‖ < 1) :
    ContractingWith ‖K‖₊ (fun x => K x + c) := by
  refine ⟨?_, LipschitzWith.of_dist_le_mul fun x y => ?_⟩
  · exact_mod_cast hK
  · calc
      dist (K x + c) (K y + c) = dist (K x) (K y) := by
        simp [dist_eq_norm, sub_eq_add_neg, add_comm, add_left_comm, add_assoc]
      _ ≤ ‖K‖₊ * dist x y := K.lipschitz.dist_le_mul x y

/--
Orthogonal projection onto a complete linear subspace is non-expansive.

This is the subspace specialization of BaseCore's projection condition, not the
general closed-convex-set projection from H1.
-/
theorem subspace_starProjection_nonexpansive
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (U : Submodule ℝ H) [CompleteSpace U] :
    LipschitzWith 1 (fun x => U.starProjection x) := by
  exact ContinuousLinearMap.lipschitzWith_of_opNorm_le U.starProjection_norm_le

/--
Projected affine update in the Hilbert subspace instance has a fixed point and
convergent iterates.

This combines `affine_contracting`,
`subspace_starProjection_nonexpansive`, and the abstract Banach wrapper
`projected_contraction_exists_fixed_point`.
-/
theorem hilbert_subspace_projected_affine_fixed_point
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (U : Submodule ℝ H) [CompleteSpace U]
    (K : H →L[ℝ] H) (c x0 : H) (hK : ‖K‖ < 1) :
    Exists fun y => IsFixedPt (fun x => U.starProjection (K x + c)) y /\
      Tendsto (fun n : Nat => (fun x => U.starProjection (K x + c))^[n] x0)
        atTop (nhds y) := by
  exact projected_contraction_exists_fixed_point
    (hbase := affine_contracting K c hK)
    (hproject := subspace_starProjection_nonexpansive U)
    x0

end QICNLean
