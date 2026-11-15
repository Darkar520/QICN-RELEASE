import QICNLean.QICNFiniteFronts
import Mathlib.Algebra.BigOperators.Fin

/-!
Finite probability laws, with actual joint masses and abstention decisions.
This is not a surrogate claim about arbitrary probability measures, data
admissibility or empirical calibration. The two leakage assumptions are kept
separate. No manuscript target is EXACT_MATCH merely from these finite results.
-/
namespace QICNLean.FiniteAdjudication

open scoped BigOperators
noncomputable section

inductive Decision where
  | human | machine | abstain
  deriving DecidableEq

def loss (γ : ℝ) (a : Decision) (humanLabel : Bool) : ℝ :=
  match a with
  | .human => if humanLabel then 0 else 1
  | .machine => if humanLabel then 1 else 0
  | .abstain => γ

def stratumRisk (γ : ℝ) (a : Decision) (ch cm lh lm : ℝ) : ℝ :=
  match a with
  | .human => cm + lm
  | .machine => ch + lh
  | .abstain => γ * (ch + cm + lh + lm)

theorem stratum_null_lower (γ ch cm lh lm : ℝ) (a : Decision)
    (hγ : 1 / 2 ≤ γ) (hch : 0 ≤ ch) (hcm : 0 ≤ cm) (hlh : 0 ≤ lh) (hlm : 0 ≤ lm)
    (hbal : ch = cm) : (ch + cm) / 2 ≤ stratumRisk γ a ch cm lh lm := by
  cases a with
  | human => dsimp [stratumRisk]; linarith
  | machine => dsimp [stratumRisk]; linarith
  | abstain =>
    have hprod := mul_nonneg (sub_nonneg.mpr hγ)
      (show 0 ≤ ch + cm + lh + lm by linarith)
    dsimp [stratumRisk]
    nlinarith

/-- Every finite observable space and every joint label/leak distribution. -/
theorem finite_clean_stratum_null {Y : Type*} [Fintype Y]
    (ch cm lh lm : Y → ℝ) (a : Y → Decision) (γ : ℝ)
    (hγ : 1 / 2 ≤ γ) (hch : ∀ y, 0 ≤ ch y) (hcm : ∀ y, 0 ≤ cm y)
    (hlh : ∀ y, 0 ≤ lh y) (hlm : ∀ y, 0 ≤ lm y) (hbal : ∀ y, ch y = cm y)
    (hmass : ∑ y : Y, (ch y + cm y + lh y + lm y) = 1) :
    (1 - (∑ y : Y, (lh y + lm y))) / 2 ≤
      ∑ y : Y, stratumRisk γ (a y) (ch y) (cm y) (lh y) (lm y) := by
  have hs := Finset.sum_le_sum (s := Finset.univ) (fun y _ =>
    stratum_null_lower γ (ch y) (cm y) (lh y) (lm y) (a y)
      hγ (hch y) (hcm y) (hlh y) (hlm y) (hbal y))
  have hsplit : (∑ y : Y, (ch y + cm y)) + (∑ y : Y, (lh y + lm y)) = 1 := by
    rw [← Finset.sum_add_distrib]
    convert hmass using 1; congr 1; ext y; ring
  simp only [div_eq_mul_inv, ← Finset.sum_mul] at hs
  linarith

theorem loss_nonnegative (γ : ℝ) (hγ : 0 ≤ γ) (a : Decision) (l : Bool) :
    0 ≤ loss γ a l := by cases a <;> cases l <;> simp [loss, hγ]

theorem loss_bounded (γ : ℝ) (hγ : γ ≤ 1) (a : Decision) (l : Bool) :
    loss γ a l ≤ 1 := by cases a <;> cases l <;> simp [loss, hγ]

/-- Coupled inputs: the reference chance condition is a separate hypothesis. -/
theorem finite_coupling_null {Ω : Type*} [Fintype Ω]
    (μ : Ω → ℝ) (hμ : ∀ ω, 0 ≤ μ ω)
    (a a₀ : Ω → Decision) (label : Ω → Bool) (E : Finset Ω)
    (γ p : ℝ) (hγ₀ : 0 ≤ γ) (hγ₁ : γ ≤ 1)
    (hagree : ∀ ω, ω ∉ E → a ω = a₀ ω)
    (hp : (∑ ω ∈ E, μ ω) ≤ p)
    (hnull : 1 / 2 ≤ ∑ ω, μ ω * loss γ (a₀ ω) (label ω)) :
    max 0 (1 / 2 - p) ≤ ∑ ω, μ ω * loss γ (a ω) (label ω) := by
  classical
  have hpoint (ω : Ω) :
      μ ω * loss γ (a₀ ω) (label ω) - μ ω * loss γ (a ω) (label ω) ≤
      if ω ∈ E then μ ω else 0 := by
    by_cases h : ω ∈ E
    · simp only [if_pos h]
      have h1 := mul_le_mul_of_nonneg_left (loss_bounded γ hγ₁ (a₀ ω) (label ω)) (hμ ω)
      have h0 := mul_nonneg (hμ ω) (loss_nonnegative γ hγ₀ (a ω) (label ω))
      linarith
    · simp [h, hagree ω h]
  have hsum := Finset.sum_le_sum (s := Finset.univ) (fun ω _ => hpoint ω)
  have hzero : 0 ≤ ∑ ω, μ ω * loss γ (a ω) (label ω) :=
    Finset.sum_nonneg (fun ω _ => mul_nonneg (hμ ω) (loss_nonnegative γ hγ₀ _ _))
  have hindicator : (∑ ω : Ω, if ω ∈ E then μ ω else 0) = ∑ ω ∈ E, μ ω := by simp
  rw [Finset.sum_sub_distrib, hindicator] at hsum
  exact max_le_iff.mpr ⟨hzero, by linarith⟩

def covered (a : Decision) : ℝ :=
  match a with
  | .human | .machine => 1
  | .abstain => 0

def wrong (a : Decision) (label : Bool) : ℝ :=
  match a with
  | .abstain => 0
  | .human => if label then 0 else 1
  | .machine => if label then 1 else 0

theorem loss_coverage_decomposition (γ : ℝ) (a : Decision) (label : Bool) :
    loss γ a label = wrong a label + γ * (1 - covered a) := by
  cases a <;> cases label <;> norm_num [loss, covered, wrong]

def stratumCoverage (a : Decision) (ch cm lh lm : ℝ) : ℝ :=
  covered a * (ch + cm + lh + lm)

def stratumWrong (a : Decision) (ch cm lh lm : ℝ) : ℝ :=
  match a with
  | .human => cm + lm
  | .machine => ch + lh
  | .abstain => 0

theorem stratum_coverage_bounds (ch cm lh lm : ℝ) (a : Decision)
    (hch : 0 ≤ ch) (hcm : 0 ≤ cm) (hlh : 0 ≤ lh) (hlm : 0 ≤ lm)
    (hbal : ch = cm) :
    0 ≤ stratumWrong a ch cm lh lm ∧
    (stratumCoverage a ch cm lh lm - (lh + lm)) / 2 ≤ stratumWrong a ch cm lh lm := by
  cases a <;> constructor <;> dsimp [stratumWrong, stratumCoverage, covered] <;> linarith

theorem finite_clean_coverage {Y : Type*} [Fintype Y]
    (ch cm lh lm : Y → ℝ) (a : Y → Decision) (γ : ℝ)
    (hch : ∀ y, 0 ≤ ch y) (hcm : ∀ y, 0 ≤ cm y)
    (hlh : ∀ y, 0 ≤ lh y) (hlm : ∀ y, 0 ≤ lm y) (hbal : ∀ y, ch y = cm y)
    (hmass : ∑ y : Y, (ch y + cm y + lh y + lm y) = 1) :
    γ * (1 - ∑ y : Y, stratumCoverage (a y) (ch y) (cm y) (lh y) (lm y)) +
      max 0 (((∑ y : Y, stratumCoverage (a y) (ch y) (cm y) (lh y) (lm y)) -
        (∑ y : Y, (lh y + lm y))) / 2) ≤
      ∑ y : Y, stratumRisk γ (a y) (ch y) (cm y) (lh y) (lm y) := by
  have hb := fun y => stratum_coverage_bounds (ch y) (cm y) (lh y) (lm y) (a y)
    (hch y) (hcm y) (hlh y) (hlm y) (hbal y)
  have hn := Finset.sum_nonneg (s := Finset.univ) (fun y _ => (hb y).1)
  have hl := Finset.sum_le_sum (s := Finset.univ) (fun y _ => (hb y).2)
  simp only [div_eq_mul_inv, sub_mul, Finset.sum_sub_distrib, ← Finset.sum_mul] at hl
  have hd : (∑ y : Y, stratumRisk γ (a y) (ch y) (cm y) (lh y) (lm y)) =
      (∑ y : Y, stratumWrong (a y) (ch y) (cm y) (lh y) (lm y)) +
        γ * (1 - ∑ y : Y, stratumCoverage (a y) (ch y) (cm y) (lh y) (lm y)) := by
    rw [← hmass, mul_sub, Finset.mul_sum, Finset.mul_sum, ← Finset.sum_sub_distrib,
      ← Finset.sum_add_distrib]
    apply Finset.sum_congr rfl
    intro y _
    cases a y <;> simp [stratumRisk, stratumWrong, stratumCoverage, covered]
  rw [hd]
  have hm := max_le (show (0 : ℝ) ≤ ∑ y : Y, stratumWrong (a y) (ch y) (cm y) (lh y) (lm y)
    from hn) (show (((∑ y : Y, stratumCoverage (a y) (ch y) (cm y) (lh y) (lm y)) -
      (∑ y : Y, (lh y + lm y))) / 2) ≤ _ from by linarith)
  linarith

theorem centered_loss_difference (a b : Decision) (label : Bool) :
    (wrong b label - covered b / 2) - (wrong a label - covered a / 2) ≤ 1 := by
  cases a <;> cases b <;> cases label <;> norm_num [wrong, loss, covered]

theorem finite_coupling_coverage {Ω : Type*} [Fintype Ω]
    (μ : Ω → ℝ) (hμ : ∀ ω, 0 ≤ μ ω) (hmass : ∑ ω, μ ω = 1)
    (a a₀ : Ω → Decision) (label : Ω → Bool) (E : Finset Ω) (γ p : ℝ)
    (hagree : ∀ ω, ω ∉ E → a ω = a₀ ω)
    (hp : (∑ ω ∈ E, μ ω) ≤ p)
    (hnull : ∑ ω, μ ω * (wrong (a₀ ω) (label ω) - covered (a₀ ω) / 2) = 0) :
    γ * (1 - ∑ ω, μ ω * covered (a ω)) +
      max 0 ((∑ ω, μ ω * covered (a ω)) / 2 - p) ≤
        ∑ ω, μ ω * loss γ (a ω) (label ω) := by
  classical
  have hpoint (ω : Ω) :
      μ ω * (wrong (a₀ ω) (label ω) - covered (a₀ ω) / 2) -
        μ ω * (wrong (a ω) (label ω) - covered (a ω) / 2) ≤
        if ω ∈ E then μ ω else 0 := by
    by_cases he : ω ∈ E
    · simp only [if_pos he]
      have h := mul_le_mul_of_nonneg_left (centered_loss_difference (a ω) (a₀ ω) (label ω))
        (hμ ω)
      nlinarith
    · simp [he, hagree ω he]
  have hs := Finset.sum_le_sum (s := Finset.univ) (fun ω _ => hpoint ω)
  have hi : (∑ ω : Ω, if ω ∈ E then μ ω else 0) = ∑ ω ∈ E, μ ω := by simp
  rw [Finset.sum_sub_distrib, hnull, hi] at hs
  have hn : 0 ≤ ∑ ω, μ ω * wrong (a ω) (label ω) := by
    apply Finset.sum_nonneg
    intro ω _
    apply mul_nonneg (hμ ω)
    cases a ω <;> cases label ω <;> norm_num [wrong, loss]
  have hcenter : (∑ ω, μ ω * (wrong (a ω) (label ω) - covered (a ω) / 2)) =
      (∑ ω, μ ω * wrong (a ω) (label ω)) - (∑ ω, μ ω * covered (a ω)) / 2 := by
    simp only [mul_sub, div_eq_mul_inv, ← mul_assoc, Finset.sum_sub_distrib, Finset.sum_mul]
  rw [hcenter] at hs
  have hd : (∑ ω, μ ω * loss γ (a ω) (label ω)) =
      (∑ ω, μ ω * wrong (a ω) (label ω)) + γ * (1 - ∑ ω, μ ω * covered (a ω)) := by
    calc
      _ = ∑ ω, (μ ω * wrong (a ω) (label ω) + γ * (μ ω - μ ω * covered (a ω))) := by
        apply Finset.sum_congr rfl
        intro ω _
        rw [loss_coverage_decomposition]
        ring
      _ = _ := by
        rw [Finset.sum_add_distrib, ← Finset.mul_sum, Finset.sum_sub_distrib, hmass]
  rw [hd]
  have hm := max_le hn (show ((∑ ω, μ ω * covered (a ω)) / 2 - p) ≤
    ∑ ω, μ ω * wrong (a ω) (label ω) from by linarith)
  linarith

theorem always_abstain_not_zero (γ : ℝ) (hγ : 1 / 2 ≤ γ) (l : Bool) :
    1 / 2 ≤ loss γ .abstain l := hγ

theorem free_abstention_negative (l : Bool) : loss 0 .abstain l = 0 := rfl

/-- Balanced reference labels; one selected wrong observation is leaked. -/
theorem selective_leak_separates_nulls :
    (∑ i : Fin 4, (1 / 4:ℝ) * loss (1 / 2) .human (decide (i.val<2))) = 1 / 2 ∧
    (∑ i : Fin 4, (1 / 4:ℝ) * loss (1 / 2)
      (if i.val = 2 then .machine else .human) (decide (i.val<2))) = 1 / 4 ∧
    (1 / 4:ℝ)<(1 - 1 / 4) / 2 := by
  norm_num [Fin.sum_univ_four, loss]

end
end QICNLean.FiniteAdjudication
