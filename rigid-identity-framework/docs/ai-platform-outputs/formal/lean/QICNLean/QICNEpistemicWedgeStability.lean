import Mathlib.Data.Real.Basic
import Mathlib.Algebra.Order.Archimedean.Real.Basic
import Mathlib.Analysis.Real.Sqrt
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Positivity
import Mathlib.Tactic.FieldSimp
import Mathlib.Tactic.Ring

/-! Ordered, rational and inductive kernels of the metric-sector wedge bounds.
The compact Hilbert cube, the Hausdorff chains and their embeddings, the
factor-diameter witnesses and the hybrid actuator's physical admissibility
are analytic hypotheses proved or specified in TeX, not formalized here.
No theorem below certifies empirical support or full infinite topology. -/

namespace QICNLean.EpistemicWedgeStability

theorem corner_norm_gap (a b d h : ℝ) (ha : d ≤ a) (hb : d ≤ b)
    (hcorner : min a b ≤ h) : d ≤ h :=
  (le_min ha hb).trans hcorner

theorem two_arm_corner_gap (R h : ℝ) (corner : R - h ≤ h) : R / 2 ≤ h := by
  linarith

/-- Actual Euclidean norm kernel; the infinite-Hilbert Hausdorff step is TeX. -/
noncomputable def planeDistance (a b x y : ℝ) : ℝ :=
  Real.sqrt ((a-x)^2+(b-y)^2)

theorem euclidean_corner_axis_distance (a b x y d : ℝ) (hd : 0 ≤ d)
    (ha : d ≤ |a|) (hb : d ≤ |b|) (axis : x=0 ∨ y=0) :
    d ≤ planeDistance a b x y := by
  have leftSquare : d^2 ≤ a^2 := by
    have hm := mul_self_le_mul_self hd ha
    nlinarith only [hm,sq_abs a]
  have rightSquare : d^2 ≤ b^2 := by
    have hm := mul_self_le_mul_self hd hb
    nlinarith only [hm,sq_abs b]
  have bound : d^2 ≤ (a-x)^2+(b-y)^2 := by
    rcases axis with hx | hy
    · subst x
      simp only [sub_zero]
      nlinarith only [leftSquare,sq_nonneg (b-y)]
    · subst y
      simp only [sub_zero]
      nlinarith only [rightSquare,sq_nonneg (a-x)]
  have monotone := Real.sqrt_le_sqrt bound
  rw [Real.sqrt_sq hd] at monotone
  exact monotone

noncomputable def wedgeGap (d c C : ℝ) : ℝ :=
  c^2 * min (d/2) (1/(4*C)) / (2*C+4*c)

theorem wedge_gap_positive (d c C : ℝ) (hd : 0 < d) (hc : 0 < c)
    (hC : 0 < C) : 0 < wedgeGap d c C := by
  unfold wedgeGap
  apply div_pos
  · exact mul_pos (sq_pos_of_pos hc) (lt_min (by positivity) (by positivity))
  · positivity

theorem chain_obstruction_gap (d c C h : ℝ) (hc : 0 < c) (hC : 0 < C)
    (necessary : c^2 * min (d/2) (1/(4*C)) ≤ (2*C+4*c)*h) :
    wedgeGap d c C ≤ h := by
  unfold wedgeGap
  apply (div_le_iff₀ (by positivity : 0 < 2*C+4*c)).2
  nlinarith only [necessary]

theorem chain_strict_gap (d c C h : ℝ) (hc : 0 < c) (hC : 0 < C)
    (small : h < wedgeGap d c C) :
    (2*C+4*c)*h < c^2 * min (d/2) (1/(4*C)) := by
  unfold wedgeGap at small
  have := (lt_div_iff₀ (by positivity : 0 < 2*C+4*c)).1 small
  nlinarith only [this]

theorem positive_support_radius (delta e h : ℝ)
    (perturbation : e < delta/2) (triangle : delta ≤ e+h) : delta/2 < h := by
  linarith

theorem max_product_square (x y : ℝ) (hx : 0 ≤ x) (hy : 0 ≤ y) :
    (max x y)^2 ≤ x^2+y^2 ∧ x^2+y^2 ≤ 2*(max x y)^2 := by
  rcases le_total x y with h | h
  · rw [max_eq_right h]
    constructor
    · nlinarith [sq_nonneg x]
    · nlinarith
  · rw [max_eq_left h]
    constructor
    · nlinarith [sq_nonneg y]
    · nlinarith

theorem power_two_growth (n : ℕ) : n+1 ≤ 2^n := by
  induction n with
  | zero => norm_num
  | succ n ih =>
    rw [pow_succ]
    omega

theorem dyadic_tail_step (n : ℕ) : (1/2 : ℚ)^(n+1) = (1/2 : ℚ)^n / 2 := by
  rw [pow_succ]
  ring

theorem dyadic_arbitrarily_small (epsilon : ℝ) (he : 0 < epsilon) :
    ∃ n : ℕ, 4/(2 : ℝ)^n < epsilon := by
  obtain ⟨n, hn⟩ := exists_nat_gt (4/epsilon)
  refine ⟨n, ?_⟩
  have growth : (n : ℝ)+1 ≤ (2 : ℝ)^n := by
    exact_mod_cast power_two_growth n
  have budget : 4 < (n : ℝ)*epsilon := (div_lt_iff₀ he).1 hn
  apply (div_lt_iff₀ (by positivity : (0 : ℝ) < 2^n)).2
  nlinarith [mul_le_mul_of_nonneg_right growth (le_of_lt he)]

theorem corner_parameters :
    wedgeGap (1/2) 1 2 = (1/64 : ℝ) ∧ (1/128 : ℝ) > 0 := by
  norm_num [wedgeGap]

theorem protected_ratio_minimum (t R : ℝ) (ht : 0 < t) (hR : 0 < R)
    (order : t ≤ R) (small : R ≤ 1) : R + 1/R ≤ t + 1/t := by
  have prod_pos : 0 < t*R := mul_pos ht hR
  have prod_le : t*R ≤ 1 := by nlinarith
  have nonnegative := mul_nonneg (sub_nonneg.mpr order) (sub_nonneg.mpr prod_le)
  apply (mul_le_mul_iff_of_pos_right prod_pos).mp
  field_simp
  nlinarith only [nonnegative]

theorem cheap_clamp_incompatible (M K delta E Delta : ℝ)
    (hM : 0 ≤ M) (hdelta : 0 < delta) (strict : K/delta < M)
    (energy : E ≤ K) (damage : delta ≤ Delta) (mass : M*Delta ≤ E) : False := by
  have threshold := (div_lt_iff₀ hdelta).1 strict
  have monotone := mul_le_mul_of_nonneg_left damage hM
  nlinarith

theorem damage_ratio_control (R s : ℝ) (hR : 0 < R) (hs : 0 < s) :
    (s^2*R^2)/(s*R) = s*R := by
  field_simp

theorem protected_regime_rational_bounds :
    (1/3 : ℚ)/(1/2) = 2/3 ∧
    (1 : ℚ) > 1/3 ∧ (1 : ℚ) > 2/3 ∧
    (1+1/3 : ℚ) > 1/3 := by
  norm_num

end QICNLean.EpistemicWedgeStability
