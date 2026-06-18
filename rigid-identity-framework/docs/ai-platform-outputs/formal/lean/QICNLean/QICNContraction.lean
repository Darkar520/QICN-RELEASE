import Mathlib.Topology.MetricSpace.Contracting

/-!
# Non-canonical BaseCore contraction pilot

This file formalizes only an abstract metric-space kernel relevant to the
BaseCore contraction pattern: a contraction followed by a non-expansive map is
still a contraction, and mathlib's Banach fixed-point API then supplies a fixed
point and convergence of iterates.

It does not formalize the QICN state space, the affine update, the projection
operator, any Hilbert-space theorem, or any certified `C_op` instance.
-/

namespace QICNLean

open Filter
open Function (IsFixedPt)

/--
If `base` is a contraction and `project` is non-expansive, then the composed
update `project` after `base` remains a contraction with the same constant.
-/
theorem nonexpansive_after_contracting
    {X : Type*} [MetricSpace X] {K : NNReal} {base project : X -> X}
    (hbase : ContractingWith K base)
    (hproject : LipschitzWith 1 project) :
    ContractingWith K (fun x => project (base x)) := by
  refine ⟨hbase.1, LipschitzWith.of_dist_le_mul fun x y => ?_⟩
  calc
    dist (project (base x)) (project (base y))
        <= (1 : NNReal) * dist (base x) (base y) := hproject.dist_le_mul _ _
    _ = dist (base x) (base y) := by simp
    _ <= K * dist x y := hbase.dist_le_mul _ _

/--
Abstract fixed-point/convergence consequence for the projected update.

This is a mathlib/Banach consequence of the previous theorem. It deliberately
keeps all QICN-specific analytic obligations as hypotheses.
-/
theorem projected_contraction_exists_fixed_point
    {X : Type*} [MetricSpace X] [CompleteSpace X] {K : NNReal}
    {base project : X -> X}
    (hbase : ContractingWith K base)
    (hproject : LipschitzWith 1 project)
    (x0 : X) :
    Exists fun y => IsFixedPt (fun x => project (base x)) y /\
      Tendsto (fun n : Nat => (fun x => project (base x))^[n] x0) atTop (nhds y) := by
  have hcomp : ContractingWith K (fun x => project (base x)) :=
    nonexpansive_after_contracting hbase hproject
  rcases hcomp.exists_fixedPoint x0 (edist_ne_top x0 _) with ⟨y, hy, hlim, _⟩
  exact ⟨y, hy, hlim⟩

end QICNLean
