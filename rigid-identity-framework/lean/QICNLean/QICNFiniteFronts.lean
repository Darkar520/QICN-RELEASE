import Mathlib.Data.Real.Basic
import Mathlib.Algebra.Order.BigOperators.Group.Finset
import Mathlib.Algebra.BigOperators.Ring.Finset
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Positivity
import Mathlib.Tactic.Ring
import Mathlib.Tactic.FieldSimp

open scoped BigOperators

noncomputable section

namespace QICNLean

/-! Kernels for Paper V prop:writable-tower-legibility-horizon and
Paper VIII thm:writable-tower-public-return-tie /
thm:writable-tower-private-return-separation. -/

def neutralCode (c : ℝ) : ℝ := (1 - c) / 3

def neutralCodeIter : ℕ → ℝ → ℝ
  | 0, c => c
  | t + 1, c => neutralCode (neutralCodeIter t c)

theorem neutral_code_gap (a b : ℝ) :
    |neutralCode a - neutralCode b| = |a - b| / 3 := by
  have h : neutralCode a - neutralCode b = -(a - b) / 3 := by
    unfold neutralCode
    ring
  rw [h, abs_div, abs_neg]
  norm_num

theorem neutral_code_iter_gap (t : ℕ) (a b : ℝ) :
    |neutralCodeIter t a - neutralCodeIter t b| = |a - b| / (3 : ℝ)^t := by
  induction t with
  | zero => simp [neutralCodeIter]
  | succ t ih =>
      rw [neutralCodeIter, neutralCodeIter, neutral_code_gap, ih, pow_succ,
        div_mul_eq_div_div]

/-- Paper V prop:writable-tower-legibility-horizon, exact scalar sham dynamics. -/
theorem tower_lesion_gap (j t : ℕ) (a b : ℝ)
    (initial : |a - b| = 2 / (3 : ℝ)^j) :
    |neutralCodeIter t a - neutralCodeIter t b| = 2 / (3 : ℝ)^(j+t) := by
  rw [neutral_code_iter_gap, initial, div_div, ← pow_add]

/-- Two closed error intervals collide precisely when the gap is at most twice the radius. -/
theorem closed_error_collision_iff (a b eta : ℝ) :
    (∃ z : ℝ, |z-a| ≤ eta ∧ |z-b| ≤ eta) ↔ |a-b| ≤ 2*eta := by
  constructor
  · rintro ⟨z, ha, hb⟩
    have tri := abs_sub_le a z b
    rw [abs_sub_comm a z] at tri
    linarith
  · intro h
    have bounds := abs_le.mp h
    refine ⟨(a+b)/2, ?_, ?_⟩
    · exact abs_le.mpr ⟨by linarith [bounds.2], by linarith [bounds.1]⟩
    · exact abs_le.mpr ⟨by linarith [bounds.1], by linarith [bounds.2]⟩

theorem tower_resolution_iff (k N : ℕ) :
    1 / (3 : ℝ)^N ≤ 2 / (3 : ℝ)^k ↔ k ≤ N := by
  have hk : 0 < (3 : ℝ)^k := by positivity
  have hN : 0 < (3 : ℝ)^N := by positivity
  rw [div_le_div_iff₀ hN hk]
  constructor
  · intro bound
    by_contra no
    have next : N+1 ≤ k := Nat.succ_le_iff.mpr (Nat.lt_of_not_ge no)
    have powers := pow_le_pow_right₀ (by norm_num : (1 : ℝ) ≤ 3) next
    rw [pow_succ] at powers
    nlinarith
  · intro le
    have powers := pow_le_pow_right₀ (by norm_num : (1 : ℝ) ≤ 3) le
    nlinarith

/-- Paper V: fixed-depth resolution ends exactly when the shifted address passes N. -/
theorem tower_lesion_resolution_iff (j t N : ℕ) (a b : ℝ)
    (initial : |a-b| = 2 / (3 : ℝ)^j) :
    1 / (3 : ℝ)^N ≤ |neutralCodeIter t a - neutralCodeIter t b| ↔ j+t ≤ N := by
  rw [tower_lesion_gap j t a b initial, tower_resolution_iff]

theorem tower_noise_collision_iff (j t : ℕ) (a b eta : ℝ)
    (initial : |a-b| = 2 / (3 : ℝ)^j) :
    (∃ z : ℝ, |z-neutralCodeIter t a| ≤ eta ∧
      |z-neutralCodeIter t b| ≤ eta) ↔ 1/(3 : ℝ)^(j+t) ≤ eta := by
  rw [closed_error_collision_iff, tower_lesion_gap j t a b initial]
  simp only [div_eq_mul_inv, one_mul]
  constructor <;> intro h <;> linarith

section FiniteDecision

variable {Z : Type*} [Fintype Z]

def balancedBinaryRisk (p q accept : Z → ℝ) : ℝ :=
  (∑ z, ((1-accept z)*p z + accept z*q z))/2

def totalVariation (p q : Z → ℝ) : ℝ :=
  (∑ z, |p z-q z|)/2

def likelihoodDecision (p q : Z → ℝ) (z : Z) : ℝ :=
  if q z ≤ p z then 1 else 0

theorem binary_pointwise_lower (p q a : ℝ) (lo : 0 ≤ a) (hi : a ≤ 1) :
    min p q ≤ (1-a)*p+a*q := by
  rcases le_total p q with h | h
  · rw [min_eq_left h]
    nlinarith
  · rw [min_eq_right h]
    nlinarith

theorem binary_minimum_identity (p q : ℝ) :
    2*min p q = p+q-|p-q| := by
  rcases le_total p q with h | h
  · rw [min_eq_left h, abs_of_nonpos (sub_nonpos.mpr h)]
    ring
  · rw [min_eq_right h, abs_of_nonneg (sub_nonneg.mpr h)]
    ring

theorem finite_binary_lower (p q accept : Z → ℝ)
    (bounds : ∀ z, 0 ≤ accept z ∧ accept z ≤ 1) :
    (∑ z, min (p z) (q z))/2 ≤ balancedBinaryRisk p q accept := by
  unfold balancedBinaryRisk
  apply div_le_div_of_nonneg_right _ (by norm_num)
  exact Finset.sum_le_sum fun z _ => binary_pointwise_lower (p z) (q z)
    (accept z) (bounds z).1 (bounds z).2

omit [Fintype Z] in
theorem likelihood_decision_bounds (p q : Z → ℝ) :
    ∀ z, 0 ≤ likelihoodDecision p q z ∧ likelihoodDecision p q z ≤ 1 := by
  intro z
  unfold likelihoodDecision
  split_ifs <;> norm_num

theorem likelihood_decision_attains (p q : Z → ℝ) :
    balancedBinaryRisk p q (likelihoodDecision p q) =
    (∑ z, min (p z) (q z))/2 := by
  unfold balancedBinaryRisk
  congr 1
  apply Finset.sum_congr rfl
  intro z _
  unfold likelihoodDecision
  split_ifs with h
  · simp [min_eq_right h]
  · simp [min_eq_left (le_of_lt (lt_of_not_ge h))]

theorem finite_binary_tv_identity (p q : Z → ℝ)
    (psum : ∑ z, p z = 1) (qsum : ∑ z, q z = 1) :
    (∑ z, min (p z) (q z))/2 = (1-totalVariation p q)/2 := by
  have identity : 2*(∑ z, min (p z) (q z)) =
      (∑ z, p z)+(∑ z, q z)-(∑ z, |p z-q z|) := by
    rw [Finset.mul_sum]
    simp_rw [binary_minimum_identity]
    rw [Finset.sum_sub_distrib, Finset.sum_add_distrib]
  unfold totalVariation
  rw [psum, qsum] at identity
  linarith

/-- Paper VIII: lower bound for every randomized binary rule on a finite signal. -/
theorem finite_binary_tv_lower (p q accept : Z → ℝ)
    (psum : ∑ z, p z = 1) (qsum : ∑ z, q z = 1)
    (bounds : ∀ z, 0 ≤ accept z ∧ accept z ≤ 1) :
    (1-totalVariation p q)/2 ≤ balancedBinaryRisk p q accept := by
  rw [← finite_binary_tv_identity p q psum qsum]
  exact finite_binary_lower p q accept bounds

/-- Paper VIII: the likelihood rule attains the bound over the whole randomized class. -/
theorem finite_binary_tv_attained (p q : Z → ℝ)
    (psum : ∑ z, p z = 1) (qsum : ∑ z, q z = 1) :
    balancedBinaryRisk p q (likelihoodDecision p q) = (1-totalVariation p q)/2 := by
  rw [likelihood_decision_attains, finite_binary_tv_identity p q psum qsum]

/-- Paper VIII public tie: identical conditional signal laws force risk one half for every rule. -/
theorem identical_public_laws_tie (p accept : Z → ℝ) (psum : ∑ z, p z = 1) :
    balancedBinaryRisk p p accept = 1/2 := by
  unfold balancedBinaryRisk
  have pointwise : ∀ z, (1-accept z)*p z+accept z*p z=p z := by
    intro z
    ring
  simp_rw [pointwise]
  rw [psum]

theorem public_abstention_risk (coverage : ℝ) :
    coverage/2 + (1-coverage)*(3/4) = 1/2+(1-coverage)/4 := by ring

theorem public_abstention_lower (coverage : ℝ) (upper : coverage ≤ 1) :
    (1:ℝ)/2 ≤ coverage/2+(1-coverage)*(3/4) := by nlinarith


theorem total_variation_nonneg (p q : Z → ℝ) :
    0 ≤ totalVariation p q := by
  unfold totalVariation
  exact div_nonneg (Finset.sum_nonneg fun z _ => abs_nonneg (p z-q z)) (by norm_num)

theorem total_variation_le_one (p q : Z → ℝ)
    (pnonneg : ∀ z, 0 ≤ p z) (qnonneg : ∀ z, 0 ≤ q z)
    (psum : ∑ z, p z = 1) (qsum : ∑ z, q z = 1) :
    totalVariation p q ≤ 1 := by
  have bound : (∑ z, |p z-q z|) ≤ (∑ z, (p z+q z)) := by
    apply Finset.sum_le_sum
    intro z _
    exact abs_le.mpr ⟨by linarith [pnonneg z], by linarith [qnonneg z]⟩
  rw [Finset.sum_add_distrib, psum, qsum] at bound
  unfold totalVariation
  linarith

theorem private_signal_margin_exact (p q : Z → ℝ)
    (psum : ∑ z, p z = 1) (qsum : ∑ z, q z = 1) :
    1/2-balancedBinaryRisk p q (likelihoodDecision p q) = totalVariation p q/2 := by
  rw [finite_binary_tv_attained p q psum qsum]
  ring

end FiniteDecision

end QICNLean
