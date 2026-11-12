import Mathlib.Analysis.Real.Sqrt
import Mathlib.MeasureTheory.Measure.Map
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

/-! Deterministic error/headroom algebra and equality of decision pushforwards.
This file does not prove Hoeffding's exponential probability bound, biological
calibration, independence, blinding, or the infinite-dimensional manuscript.
The measure result is general; probability measures are a special case. -/

namespace QICNLean.EpistemicInterface

theorem paired_error_transport (xh yh x y L e : ℝ)
    (hx : |xh-x|≤L*e) (hy : |yh-y|≤L*e) :
    |(xh-yh)-(x-y)|≤2*L*e := by
  calc
    |(xh-yh)-(x-y)|=|(xh-x)-(yh-y)| := by congr 1; ring
    _ ≤ |xh-x|+|yh-y| := by
      simpa only [sub_zero,zero_sub,abs_neg] using (abs_sub_le (xh-x) 0 (yh-y))
    _ ≤ 2*L*e := by linarith

theorem alternative_headroom (Dhat Dbar eta g tn tz L e : ℝ)
    (error : |Dhat-Dbar|≤2*L*e) (alternative : Dbar≤eta-g+tz)
    (gap : tn+tz+4*L*e<g) : Dhat<eta-tn-2*L*e := by
  have upper := (abs_le.mp error).2
  linarith

theorem sample_size_headroom (A B g L e n : ℝ)
    (positive_gap : 4*L*e<g) (positive_n : 0<n)
    (size : (A+B)^2/(g-4*L*e)^2<n) :
    (A+B)/Real.sqrt n<g-4*L*e := by
  have hp : 0<g-4*L*e := by linarith
  have hs : 0<Real.sqrt n := Real.sqrt_pos.mpr positive_n
  have squared : (A+B)^2<n*(g-4*L*e)^2 :=
    (div_lt_iff₀ (sq_pos_of_pos hp)).mp size
  have sqrt_square := Real.sq_sqrt (le_of_lt positive_n)
  have product_square : ((g-4*L*e)*Real.sqrt n)^2=n*(g-4*L*e)^2 := by
    rw [mul_pow,sqrt_square]
    ring
  apply (div_lt_iff₀ hs).mpr
  by_contra no
  have order : (g-4*L*e)*Real.sqrt n≤A+B := le_of_not_gt no
  have nonneg : 0≤(g-4*L*e)*Real.sqrt n := le_of_lt (mul_pos hp hs)
  have sum_nonneg : 0≤A+B+(g-4*L*e)*Real.sqrt n := by linarith
  have product := mul_nonneg (sub_nonneg.mpr order) sum_nonneg
  nlinarith [product_square]

open MeasureTheory

theorem decision_laws_equal {X Y Z D : Type} [MeasurableSpace X]
    [MeasurableSpace Y] [MeasurableSpace Z] [MeasurableSpace D]
    (mu : Measure X) (nu : Measure Y) (obs : X → Z) (other : Y → Z)
    (decision : Z → D) (hobs : Measurable obs) (hother : Measurable other)
    (hdecision : Measurable decision) (laws : mu.map obs=nu.map other) :
    mu.map (decision ∘ obs)=nu.map (decision ∘ other) := by
  rw [←Measure.map_map hdecision hobs,←Measure.map_map hdecision hother,laws]

theorem rejection_measures_equal {X Y Z D : Type} [MeasurableSpace X]
    [MeasurableSpace Y] [MeasurableSpace Z] [MeasurableSpace D]
    (mu : Measure X) (nu : Measure Y) (obs : X → Z) (other : Y → Z)
    (decision : Z → D) (hobs : Measurable obs) (hother : Measurable other)
    (hdecision : Measurable decision) (laws : mu.map obs=nu.map other) (reject : Set D) :
    (mu.map (decision ∘ obs)) reject=(nu.map (decision ∘ other)) reject := by
  rw [decision_laws_equal mu nu obs other decision hobs hother hdecision laws]

end QICNLean.EpistemicInterface
