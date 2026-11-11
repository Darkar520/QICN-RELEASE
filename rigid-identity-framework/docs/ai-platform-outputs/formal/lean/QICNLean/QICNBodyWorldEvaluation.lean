import Mathlib.Data.Real.Basic
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

noncomputable section

namespace QICNLean

/-! Evaluative kernels for Paper IX. The antipodal existence step and the
fundamental theorem for continuous line integrals are not asserted here.
The collision and circulation-error consequences below are exact algebraic
kernels. The additive separation, in contrast, quantifies over arbitrary
univariate rival functions without continuity assumptions. -/

def bwEvalFirst (x y : ℝ) : ℝ := (x-y)/2
def bwEvalSecond (x y : ℝ) : ℝ := (x+y)/2

theorem bw_evaluation_inverse (x y : ℝ) :
    bwEvalFirst x y + bwEvalSecond x y = x ∧
    bwEvalSecond x y - bwEvalFirst x y = y := by
  constructor <;> unfold bwEvalFirst bwEvalSecond <;> ring

theorem bw_evaluation_inverse_bound (x y : ℝ) :
    max |x| |y| ≤ 2 * max |bwEvalFirst x y| |bwEvalSecond x y| := by
  obtain ⟨hx,hy⟩ := bw_evaluation_inverse x y
  have first := le_max_left |bwEvalFirst x y| |bwEvalSecond x y|
  have second := le_max_right |bwEvalFirst x y| |bwEvalSecond x y|
  apply max_le
  · calc
      |x| = |bwEvalFirst x y + bwEvalSecond x y| := congrArg abs hx.symm
      _ ≤ |bwEvalFirst x y| + |bwEvalSecond x y| := by
        simpa only [sub_zero,sub_neg_eq_add,zero_sub,neg_neg,abs_neg,zero_add] using
          (abs_sub_le (bwEvalFirst x y) 0 (-bwEvalSecond x y))
      _ ≤ 2 * max |bwEvalFirst x y| |bwEvalSecond x y| := by linarith
  · calc
      |y| = |bwEvalSecond x y - bwEvalFirst x y| := congrArg abs hy.symm
      _ ≤ |bwEvalSecond x y| + |bwEvalFirst x y| := by
        simpa only [sub_zero,zero_sub,abs_neg] using
          (abs_sub_le (bwEvalSecond x y) 0 (bwEvalFirst x y))
      _ ≤ 2 * max |bwEvalFirst x y| |bwEvalSecond x y| := by linarith

def bwNonlinearFirst (gamma xi x y : ℝ) : ℝ :=
  gamma * bwEvalFirst x y + xi*x*y
def bwNonlinearSecond (gamma x y : ℝ) : ℝ := gamma * bwEvalSecond x y
def bwNonlinearField (gamma xi x y : ℝ) : ℝ × ℝ :=
  (bwNonlinearFirst gamma xi x y, bwNonlinearSecond gamma x y)

theorem bw_nonlinear_antipodal_difference (gamma xi x y : ℝ) :
    bwNonlinearFirst gamma xi x y - bwNonlinearFirst gamma xi (-x) (-y) =
      gamma*(x-y) ∧
    bwNonlinearSecond gamma x y - bwNonlinearSecond gamma (-x) (-y) =
      gamma*(x+y) := by
  constructor <;> dsimp [bwNonlinearFirst,bwNonlinearSecond,bwEvalFirst,bwEvalSecond] <;> ring

/-- A common scalar-summary prediction cannot approximate an antipodal
boundary pair more closely than gamma/2. The topological theorem producing
such a collision is deliberately outside this algebraic kernel. -/
theorem bw_antipodal_collision_radius (gamma xi x y px py err : ℝ)
    (positive : 0 ≤ gamma) (boundary : max |x| |y| = 1)
    (first : |bwNonlinearFirst gamma xi x y-px| ≤ err)
    (opposite_first : |bwNonlinearFirst gamma xi (-x) (-y)-px| ≤ err)
    (second : |bwNonlinearSecond gamma x y-py| ≤ err)
    (opposite_second : |bwNonlinearSecond gamma (-x) (-y)-py| ≤ err) :
    gamma/2 ≤ err := by
  obtain ⟨difference_first,difference_second⟩ :=
    bw_nonlinear_antipodal_difference gamma xi x y
  have gap_first := abs_sub_le (bwNonlinearFirst gamma xi x y) px
    (bwNonlinearFirst gamma xi (-x) (-y))
  rw [difference_first,abs_sub_comm px] at gap_first
  have gap_second := abs_sub_le (bwNonlinearSecond gamma x y) py
    (bwNonlinearSecond gamma (-x) (-y))
  rw [difference_second,abs_sub_comm py] at gap_second
  have bound_first : |bwEvalFirst (gamma*x) (gamma*y)| ≤ err := by
    apply abs_le.mpr
    have h := abs_le.mp (show |gamma*(x-y)| ≤ 2*err by linarith)
    unfold bwEvalFirst
    constructor <;> nlinarith [h.1,h.2]
  have bound_second : |bwEvalSecond (gamma*x) (gamma*y)| ≤ err := by
    apply abs_le.mpr
    have h := abs_le.mp (show |gamma*(x+y)| ≤ 2*err by linarith)
    unfold bwEvalSecond
    constructor <;> nlinarith [h.1,h.2]
  have reconstructed := bw_evaluation_inverse_bound (gamma*x) (gamma*y)
  have upper := max_le bound_first bound_second
  have small : max |gamma*x| |gamma*y| ≤ 2*err :=
    reconstructed.trans (mul_le_mul_of_nonneg_left upper (by norm_num))
  have scaled_x : |gamma*x| = gamma*|x| := by rw [abs_mul,abs_of_nonneg positive]
  have scaled_y : |gamma*y| = gamma*|y| := by rw [abs_mul,abs_of_nonneg positive]
  by_cases order : |y| ≤ |x|
  · rw [max_eq_left order] at boundary
    have component := (le_max_left |gamma*x| |gamma*y|).trans small
    rw [scaled_x,boundary] at component
    nlinarith
  · have order' : |x| ≤ |y| := le_of_lt (lt_of_not_ge order)
    rw [max_eq_right order'] at boundary
    have component := (le_max_right |gamma*x| |gamma*y|).trans small
    rw [scaled_y,boundary] at component
    nlinarith

def bwRectangleDifference (f : ℝ → ℝ → ℝ) (a b c d : ℝ) : ℝ :=
  f a c - f a d - f b c + f b d

theorem bw_additive_rectangle_zero (g h : ℝ → ℝ) (a b c d : ℝ) :
    bwRectangleDifference (fun x y => g x+h y) a b c d = 0 := by
  unfold bwRectangleDifference
  ring

/-- No regularity assumption is needed: all rectangular differences vanish
exactly when the function admits a sum of coordinate functions. -/
theorem bw_rectangle_zero_iff_additive (f : ℝ → ℝ → ℝ) :
    (∀ a b c d, bwRectangleDifference f a b c d = 0) ↔
    ∃ g h : ℝ → ℝ, ∀ x y, f x y = g x+h y := by
  constructor
  · intro rectangles
    refine ⟨fun x => f x 0,fun y => f 0 y-f 0 0,?_⟩
    intro x y
    have identity := rectangles x 0 y 0
    unfold bwRectangleDifference at identity
    linarith
  · rintro ⟨g,h,representation⟩ a b c d
    unfold bwRectangleDifference
    rw [representation,representation,representation,representation]
    ring

theorem bw_nonlinear_rectangle (gamma xi a b c d : ℝ) :
    bwRectangleDifference (bwNonlinearFirst gamma xi) a b c d =
      xi*(a-b)*(c-d) := by
  unfold bwRectangleDifference bwNonlinearFirst bwEvalFirst
  ring

theorem bw_nonlinear_additive_iff (gamma xi : ℝ) :
    (∃ g h : ℝ → ℝ, ∀ x y, bwNonlinearFirst gamma xi x y = g x+h y) ↔ xi=0 := by
  constructor
  · rintro ⟨g,h,representation⟩
    have zero : bwRectangleDifference (bwNonlinearFirst gamma xi) 1 (-1) 1 (-1)=0 := by
      unfold bwRectangleDifference
      rw [representation,representation,representation,representation]
      ring
    rw [bw_nonlinear_rectangle] at zero
    linarith
  · intro zero
    refine ⟨fun x => gamma*x/2,fun y => -gamma*y/2,?_⟩
    intro x y
    unfold bwNonlinearFirst bwEvalFirst
    rw [zero]
    ring

theorem bw_additive_error_rectangle (gamma xi : ℝ) (g h : ℝ → ℝ) :
    bwRectangleDifference
      (fun x y => bwNonlinearFirst gamma xi x y-(g x+h y)) 1 (-1) 1 (-1) = 4*xi := by
  unfold bwRectangleDifference bwNonlinearFirst bwEvalFirst
  ring

/-- Four corners already force the exact lower bound for arbitrary scalar
coordinate functions. Both signs of each error are used, not a fitted rival. -/
theorem bw_additive_corner_lower_bound (gamma xi err : ℝ) (g h : ℝ → ℝ)
    (pp : |bwNonlinearFirst gamma xi 1 1-(g 1+h 1)| ≤ err)
    (pn : |bwNonlinearFirst gamma xi 1 (-1)-(g 1+h (-1))| ≤ err)
    (np : |bwNonlinearFirst gamma xi (-1) 1-(g (-1)+h 1)| ≤ err)
    (nn : |bwNonlinearFirst gamma xi (-1) (-1)-(g (-1)+h (-1))| ≤ err) :
    xi ≤ err := by
  have identity := bw_additive_error_rectangle gamma xi g h
  unfold bwRectangleDifference at identity
  have a := abs_le.mp pp
  have b := abs_le.mp pn
  have c := abs_le.mp np
  have d := abs_le.mp nn
  linarith [a.2,b.1,c.1,d.2]

theorem bw_additive_uniform_lower_bound (gamma xi err : ℝ) (g h : ℝ → ℝ)
    (uniform : ∀ x y : ℝ, |x| ≤ 1 → |y| ≤ 1 →
      |bwNonlinearFirst gamma xi x y-(g x+h y)| ≤ err) : xi ≤ err := by
  apply bw_additive_corner_lower_bound gamma xi err g h
  all_goals apply uniform <;> norm_num

/-- This covers arbitrary vector-valued univariate channels: projection to
the first output already forces the lower bound. -/
theorem bw_vector_additive_uniform_lower_bound (gamma xi err : ℝ)
    (g h : ℝ → ℝ × ℝ)
    (uniform : ∀ x y : ℝ, |x| ≤ 1 → |y| ≤ 1 →
      max |(bwNonlinearField gamma xi x y).1-((g x).1+(h y).1)|
          |(bwNonlinearField gamma xi x y).2-((g x).2+(h y).2)| ≤ err) :
    xi ≤ err := by
  apply bw_additive_uniform_lower_bound gamma xi err (fun x => (g x).1) (fun y => (h y).1)
  intro x y hx hy
  exact (le_max_left _ _).trans (uniform x y hx hy)

theorem bw_preregistered_additive_separation (err : ℝ) (g h : ℝ → ℝ × ℝ)
    (uniform : ∀ x y : ℝ, |x| ≤ 1 → |y| ≤ 1 →
      max |(bwNonlinearField (1/128) (1/4096) x y).1-((g x).1+(h y).1)|
          |(bwNonlinearField (1/128) (1/4096) x y).2-((g x).2+(h y).2)| ≤ err) :
    (1/4096:ℝ) ≤ err :=
  bw_vector_additive_uniform_lower_bound (1/128) (1/4096) err g h uniform

/-- The linear evaluator attains the bound, so the minimax value is exact. -/
theorem bw_additive_matching_upper_bound (gamma xi x y : ℝ) (nonneg : 0 ≤ xi)
    (hx : |x| ≤ 1) (hy : |y| ≤ 1) :
    max |bwNonlinearFirst gamma xi x y-(gamma*x/2-gamma*y/2)|
        |bwNonlinearSecond gamma x y-(gamma*x/2+gamma*y/2)| ≤ xi := by
  have first : bwNonlinearFirst gamma xi x y-(gamma*x/2-gamma*y/2) = xi*x*y := by
    unfold bwNonlinearFirst bwEvalFirst
    ring
  have second : bwNonlinearSecond gamma x y-(gamma*x/2+gamma*y/2) = 0 := by
    unfold bwNonlinearSecond bwEvalSecond
    ring
  rw [first,second,abs_zero]
  apply max_le
  · rw [abs_mul,abs_mul,abs_of_nonneg nonneg]
    have product : |x| * |y| ≤ 1 := by
      calc
        |x| * |y| ≤ 1*1 := mul_le_mul hx hy (abs_nonneg y) (by norm_num)
        _ = 1 := by norm_num
    simpa only [mul_one,mul_assoc] using mul_le_mul_of_nonneg_left product nonneg
  · exact nonneg

def bwChannelsWithCross (gamma xi x y cross : ℝ) : ℝ × ℝ :=
  (gamma*x/2-gamma*y/2+xi*cross,gamma*x/2+gamma*y/2)

theorem bw_cross_term_restores_exact_tie (gamma xi x y : ℝ) :
    bwChannelsWithCross gamma xi x y (x*y) = bwNonlinearField gamma xi x y := by
  apply Prod.ext <;> dsimp [bwChannelsWithCross,bwNonlinearField,
    bwNonlinearFirst,bwNonlinearSecond,bwEvalFirst,bwEvalSecond] <;> ring

/-- Trapezoidal boundary rule; exact for the present polynomial field on
each square edge. This is not a theorem that arbitrary finite gradient
tables have zero circulation (they need not). -/
def bwSquareBoundaryRule (field : ℝ → ℝ → ℝ × ℝ) (r : ℝ) : ℝ :=
  r*((field (-r) (-r)).1+(field r (-r)).1) +
  r*((field r (-r)).2+(field r r).2) -
  r*((field r r).1+(field (-r) r).1) -
  r*((field (-r) r).2+(field (-r) (-r)).2)

theorem bw_evaluation_square_circulation (gamma xi r : ℝ) :
    bwSquareBoundaryRule (bwNonlinearField gamma xi) r = 4*gamma*r^2 := by
  unfold bwSquareBoundaryRule bwNonlinearField bwNonlinearFirst bwNonlinearSecond
    bwEvalFirst bwEvalSecond
  ring

/-- Analytic circulation lower-bound kernel, after the actual integral
comparison supplies the perimeter bound. No finite sampling premise is used. -/
theorem bw_circulation_error_radius (gamma err loop : ℝ)
    (nonneg : 0 ≤ gamma) (candidate_loop : loop=4*gamma)
    (loop_error : |loop| ≤ 8*err) : gamma/2 ≤ err := by
  rw [candidate_loop,abs_of_nonneg (by linarith)] at loop_error
  linarith

theorem bw_exact_nonlinear_scales :
    (1/4:ℝ)*(1/8)*(1/8)*(1/4)^2 = 1/4096 ∧
    (1/4:ℝ)*(1/8)*(1/4) = 1/128 := by norm_num

end QICNLean
