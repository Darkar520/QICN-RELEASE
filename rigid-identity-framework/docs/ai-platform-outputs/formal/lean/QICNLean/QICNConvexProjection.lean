import QICNLean.QICNHilbertInstance
import Mathlib.Analysis.InnerProductSpace.Projection.Basic

/-!
# Non-canonical convex projection instance

This file attempts the full closed-convex Hilbert projection instance for the
BaseCore contraction skeleton. It defines the metric projection onto a nonempty
complete convex subset by choice from mathlib's Hilbert projection theorem,
derives the variational inequality, uniqueness of minimizers, non-expansiveness,
and the projected affine fixed-point/convergence statement.
-/

namespace QICNLean

open Filter
open Function (IsFixedPt)

noncomputable section

/-- Metric projection onto a nonempty complete convex subset of a real Hilbert space. -/
def convexProjection
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s) (u : H) : H :=
  Classical.choose (exists_norm_eq_iInf_of_complete_convex hne hcl hc u)

theorem convexProjection_mem
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s) (u : H) :
    convexProjection s hne hcl hc u ∈ s :=
  (Classical.choose_spec (exists_norm_eq_iInf_of_complete_convex hne hcl hc u)).1

theorem convexProjection_minimizes
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s) (u : H) :
    ‖u - convexProjection s hne hcl hc u‖ =
      ⨅ w : s, ‖u - (w : H)‖ :=
  (Classical.choose_spec (exists_norm_eq_iInf_of_complete_convex hne hcl hc u)).2

theorem convexProjection_variational
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s) (u : H) :
    ∀ w ∈ s,
      inner ℝ (u - convexProjection s hne hcl hc u)
        (w - convexProjection s hne hcl hc u) ≤ 0 := by
  exact (norm_eq_iInf_iff_real_inner_le_zero hc
    (convexProjection_mem hne hcl hc u)).1
    (convexProjection_minimizes hne hcl hc u)

theorem convex_minimizer_unique
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hc : Convex ℝ s) {u v1 v2 : H}
    (hv1 : v1 ∈ s) (hv2 : v2 ∈ s)
    (hmin1 : ‖u - v1‖ = ⨅ w : s, ‖u - (w : H)‖)
    (hmin2 : ‖u - v2‖ = ⨅ w : s, ‖u - (w : H)‖) :
    v1 = v2 := by
  have hvar1 := (norm_eq_iInf_iff_real_inner_le_zero hc hv1).1 hmin1
  have hvar2 := (norm_eq_iInf_iff_real_inner_le_zero hc hv2).1 hmin2
  have h12 : inner ℝ (u - v1) (v2 - v1) ≤ 0 := hvar1 v2 hv2
  have h21 : inner ℝ (u - v2) (v1 - v2) ≤ 0 := hvar2 v1 hv1
  have h12neg :
      inner ℝ (u - v1) (v1 - v2) = -inner ℝ (u - v1) (v2 - v1) := by
    rw [← neg_sub v2 v1, inner_neg_right]
  have h12' : 0 ≤ inner ℝ (u - v1) (v1 - v2) := by
    rw [h12neg]
    exact neg_nonneg.mpr h12
  have hdiff :
      inner ℝ (u - v1) (v1 - v2) - inner ℝ (u - v2) (v1 - v2) =
        - ‖v1 - v2‖ ^ 2 := by
    have hsub : (u - v1) - (u - v2) = -(v1 - v2) := by
      abel
    calc
      inner ℝ (u - v1) (v1 - v2) - inner ℝ (u - v2) (v1 - v2)
          = inner ℝ ((u - v1) - (u - v2)) (v1 - v2) := by
              exact (inner_sub_left (u - v1) (u - v2) (v1 - v2)).symm
      _ = inner ℝ (-(v1 - v2)) (v1 - v2) := by
              rw [hsub]
      _ = -inner ℝ (v1 - v2) (v1 - v2) := by
              rw [inner_neg_left]
      _ = - ‖v1 - v2‖ ^ 2 := by
              rw [real_inner_self_eq_norm_sq]
  have hnonneg :
      0 ≤ inner ℝ (u - v1) (v1 - v2) - inner ℝ (u - v2) (v1 - v2) :=
    sub_nonneg.mpr (h21.trans h12')
  have hle : ‖v1 - v2‖ ^ 2 ≤ 0 := by
    nlinarith [hdiff, hnonneg]
  have hnorm : ‖v1 - v2‖ = 0 := sq_eq_zero_iff.mp (le_antisymm hle (sq_nonneg _))
  exact sub_eq_zero.mp (norm_eq_zero.mp hnorm)

theorem convexProjection_lipschitz
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s) :
    LipschitzWith 1 (fun u => convexProjection s hne hcl hc u) := by
  refine LipschitzWith.of_dist_le_mul fun x y => ?_
  let px := convexProjection s hne hcl hc x
  let py := convexProjection s hne hcl hc y
  have hpx : px ∈ s := convexProjection_mem hne hcl hc x
  have hpy : py ∈ s := convexProjection_mem hne hcl hc y
  have hxvar := convexProjection_variational hne hcl hc x
  have hyvary := convexProjection_variational hne hcl hc y
  have hx : inner ℝ (x - px) (py - px) ≤ 0 := hxvar py hpy
  have hy : inner ℝ (y - py) (px - py) ≤ 0 := hyvary px hpx
  have hxneg :
      inner ℝ (x - px) (px - py) = -inner ℝ (x - px) (py - px) := by
    rw [← neg_sub py px, inner_neg_right]
  have hx' : 0 ≤ inner ℝ (x - px) (px - py) := by
    rw [hxneg]
    exact neg_nonneg.mpr hx
  have hcore :
      ‖px - py‖ ^ 2 ≤ inner ℝ (x - y) (px - py) := by
    have hiden :
        inner ℝ (x - y) (px - py) =
          inner ℝ (x - px) (px - py) + ‖px - py‖ ^ 2 -
            inner ℝ (y - py) (px - py) := by
      have hdecomp : x - y = (x - px) + (px - py) - (y - py) := by
        abel
      calc
        inner ℝ (x - y) (px - py)
            = inner ℝ ((x - px) + (px - py) - (y - py)) (px - py) := by
                rw [hdecomp]
        _ = inner ℝ ((x - px) + (px - py)) (px - py) -
              inner ℝ (y - py) (px - py) := by
                rw [inner_sub_left]
        _ = (inner ℝ (x - px) (px - py) + inner ℝ (px - py) (px - py)) -
              inner ℝ (y - py) (px - py) := by
                rw [inner_add_left]
        _ = inner ℝ (x - px) (px - py) + ‖px - py‖ ^ 2 -
              inner ℝ (y - py) (px - py) := by
                rw [real_inner_self_eq_norm_sq]
    have hnonneg :
        0 ≤ inner ℝ (x - px) (px - py) - inner ℝ (y - py) (px - py) :=
      sub_nonneg.mpr (hy.trans hx')
    nlinarith [hiden, hnonneg]
  have hcs : inner ℝ (x - y) (px - py) ≤ ‖x - y‖ * ‖px - py‖ := real_inner_le_norm _ _
  have hsquare : ‖px - py‖ ^ 2 ≤ ‖x - y‖ * ‖px - py‖ := hcore.trans hcs
  by_cases hzero : ‖px - py‖ = 0
  · simp [dist_eq_norm, px, py, hzero]
  · have hpos : 0 < ‖px - py‖ := lt_of_le_of_ne (norm_nonneg _) (Ne.symm hzero)
    have hle : ‖px - py‖ ≤ ‖x - y‖ := by
      have hmul : ‖px - py‖ * ‖px - py‖ ≤ ‖x - y‖ * ‖px - py‖ := by
        simpa [pow_two] using hsquare
      exact le_of_mul_le_mul_right hmul hpos
    simpa [dist_eq_norm, px, py] using hle

/--
Projected affine update for a nonempty complete convex subset has a fixed point
and convergent iterates.
-/
theorem hilbert_convex_projected_affine_fixed_point
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (K : H →L[ℝ] H) (c x0 : H) (hK : ‖K‖ < 1) :
    Exists fun y => IsFixedPt (fun x => convexProjection s hne hcl hc (K x + c)) y /\
      Tendsto (fun n : Nat => (fun x => convexProjection s hne hcl hc (K x + c))^[n] x0)
        atTop (nhds y) := by
  exact projected_contraction_exists_fixed_point
    (hbase := affine_contracting K c hK)
    (hproject := convexProjection_lipschitz s hne hcl hc)
    x0

end

end QICNLean
