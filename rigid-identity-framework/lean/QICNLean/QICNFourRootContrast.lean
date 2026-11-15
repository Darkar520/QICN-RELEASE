import QICNLean.QICNFiniteFronts
import Mathlib.Tactic.FinCases
import Mathlib.Algebra.BigOperators.Fin

/-!
Fourth-order contrast over every real-valued function on the Boolean cube.
Proper ancestry is defined by a missing primitive coordinate, not by vanishing
contrast. Arbitrary finite sums are admitted. Random measures, full programme
cost semantics and physical-plant correspondence remain distinct obligations.
-/
namespace QICNLean.FourRootContrast

open scoped BigOperators
noncomputable section
abbrev Cube := Fin 4 → Bool

def spin (b : Bool) : ℝ := if b then 1 else - 1
def parity (s : Cube) : ℝ := ∏ i : Fin 4, spin (s i)
def contrast (f : Cube → ℝ) : ℝ := (∑ s : Cube, parity s * f s) / 16

def flip (i : Fin 4) : Cube ≃ Cube where
  toFun s := Function.update s i (!s i)
  invFun s := Function.update s i (!s i)
  left_inv s := by funext j; by_cases h : j = i <;> simp [h]
  right_inv s := by funext j; by_cases h : j = i <;> simp [h]

def Ignores (i : Fin 4) (f : Cube → ℝ) : Prop := ∀ s, f (flip i s) = f s

def DependsOn (J : Finset (Fin 4)) (f : Cube → ℝ) : Prop :=
  ∀ s t, (∀ j ∈ J, s j = t j) → f s = f t

theorem spin_negation (b : Bool) : spin (!b) = -spin b := by
  cases b <;> norm_num [spin]

theorem spin_square (b : Bool) : spin b ^ 2 = 1 := by
  cases b <;> norm_num [spin]

theorem parity_flip (i : Fin 4) (s : Cube) : parity (flip i s) = -parity s := by
  fin_cases i <;> simp [parity, Fin.prod_univ_four, flip, spin_negation]

theorem parity_abs (s : Cube) : |parity s| = 1 := by
  have h (b : Bool) : |spin b| = 1 := by cases b <;> norm_num [spin]
  simp only [parity, Fin.prod_univ_four, abs_mul, h, mul_one]

theorem proper_component_ignores (J : Finset (Fin 4)) (f : Cube → ℝ)
    (hJ : J ≠ Finset.univ) (hf : DependsOn J f) : ∃ i, Ignores i f := by
  have hn : ¬ ∀ i, i ∈ J := by
    intro h
    exact hJ (Finset.eq_univ_iff_forall.mpr h)
  push Not at hn
  obtain ⟨i, hi⟩ := hn
  refine ⟨i, fun s => hf _ _ ?_⟩
  intro j hj
  have hji : j ≠ i := by intro h; subst j; exact hi hj
  simp [flip, hji]

theorem ignores_depends_on_erasure (f : Cube → ℝ) (i : Fin 4) (hf : Ignores i f) :
    DependsOn (Finset.univ.erase i) f := by
  intro s t h
  by_cases hi : s i = t i
  · have heq : s = t := by
      funext j
      by_cases hj : j = i
      · simpa [hj] using hi
      · exact h j (by simp [hj])
    rw [heq]
  · have hbool : t i = !s i := by
      cases hs : s i <;> cases ht : t i <;> simp_all
    have heq : t = flip i s := by
      funext j
      by_cases hj : j = i
      · subst j
        simpa [flip] using hbool
      · simpa [flip, hj] using (h j (by simp [hj])).symm
    rw [heq]
    exact (hf s).symm

theorem ignored_coordinate_has_zero_contrast (f : Cube → ℝ) (i : Fin 4)
    (hf : Ignores i f) : contrast f = 0 := by
  have hp := (flip i).sum_comp (fun s => parity s * f s)
  have hn : (∑ s : Cube, parity s * f s) = -(∑ s : Cube, parity s * f s) := by
    calc
      _ = ∑ s : Cube, parity (flip i s) * f (flip i s) := hp.symm
      _ = ∑ s : Cube, -(parity s * f s) := by
        apply Finset.sum_congr rfl
        intro s _
        rw [parity_flip, hf]
        ring
      _ = _ := by rw [Finset.sum_neg_distrib]
  have hz : (∑ s : Cube, parity s * f s) = 0 := by linarith
  simp [contrast, hz]

theorem contrast_sum {ι : Type*} (I : Finset ι) (g : ι → Cube → ℝ) :
    contrast (fun s => ∑ i ∈ I, g i s) = ∑ i ∈ I, contrast (g i) := by
  simp only [contrast, Finset.mul_sum, div_eq_mul_inv, Finset.sum_mul]
  rw [Finset.sum_comm]

theorem contrast_sub (f g : Cube → ℝ) :
    contrast (fun s => f s - g s) = contrast f - contrast g := by
  simp [contrast, mul_sub, Finset.sum_sub_distrib, sub_div]

theorem contrast_smul (a : ℝ) (f : Cube → ℝ) :
    contrast (fun s => a * f s) = a * contrast f := by
  have h : (∑ s : Cube, parity s * (a * f s)) = a * (∑ s : Cube, parity s * f s) := by
    rw [Finset.mul_sum]
    apply Finset.sum_congr rfl
    intro s _
    ring
  simp only [contrast, h]
  ring

theorem contrast_parity : contrast parity = 1 := by
  have h (s : Cube) : parity s * parity s = 1 := by
    calc
      parity s * parity s = |parity s| ^ 2 := by rw [sq_abs, pow_two]
      _ = 1 := by rw [parity_abs]; norm_num
  norm_num [contrast, h, Fintype.card_fun]

def ProperForecast (f : Cube → ℝ) : Prop :=
  ∃ k : ℕ, ∃ g : Fin k → Cube → ℝ,
    (∀ i, ∃ j, Ignores j (g i)) ∧ ∀ s, f s = ∑ i, g i s

theorem proper_forecast_zero (f : Cube → ℝ) (hf : ProperForecast f) : contrast f = 0 := by
  obtain ⟨k, g, hg, hf⟩ := hf
  rw [show f = (fun s => ∑ i, g i s) from funext hf, contrast_sum]
  apply Finset.sum_eq_zero
  intro i _
  obtain ⟨j, hj⟩ := hg i
  exact ignored_coordinate_has_zero_contrast _ _ hj

theorem contrast_abs_le (f : Cube → ℝ) (ε : ℝ) (hf : ∀ s, |f s| ≤ ε) :
    |contrast f| ≤ ε := by
  have hsum : |∑ s : Cube, parity s * f s| ≤ ∑ s : Cube, ε := by
    calc
      _ ≤ ∑ s : Cube, |parity s * f s| := Finset.abs_sum_le_sum_abs _ _
      _ ≤ _ := Finset.sum_le_sum (fun s _ => by simpa [abs_mul, parity_abs] using hf s)
  have hcard : Fintype.card Cube = 16 := by norm_num [Cube, Fintype.card_fun]
  have hs : |∑ s : Cube, parity s * f s| ≤ 16 * ε := by simpa [hcard] using hsum
  change |(∑ s : Cube, parity s * f s) / 16| ≤ ε
  rw [abs_div, abs_of_pos (by norm_num : (0 : ℝ) < 16)]
  apply (div_le_iff₀ (by norm_num : (0 : ℝ) < 16)).mpr
  nlinarith [hs]

theorem abs_contrast_le_mean (f : Cube → ℝ) :
    |contrast f| ≤ (∑ s : Cube, |f s|) / 16 := by
  have h : |∑ s : Cube, parity s * f s| ≤ ∑ s : Cube, |f s| := by
    calc
      _ ≤ ∑ s : Cube, |parity s * f s| := Finset.abs_sum_le_sum_abs _ _
      _ = _ := by apply Finset.sum_congr rfl; intro s _; simp [abs_mul, parity_abs]
  simpa [contrast, abs_div] using div_le_div_of_nonneg_right h (by norm_num : (0:ℝ) ≤ 16)

def localTerm (a b ξ₂ ξ₄ : ℝ) (i : Fin 3) (s : Cube) : ℝ :=
  if i = 0 then a * spin (s 2) + b * (spin (s 3) - spin (s 1))
    -4 * ξ₄ * spin (s 1) * spin (s 3) + 4 * ξ₄
 + ξ₂ * spin (s 2) * spin (s 3) - ξ₂ * spin (s 2) * spin (s 1)
  else if i = 1 then
    - a * spin (s 0) - 4 * ξ₄ * spin (s 0) * spin (s 2) - ξ₂ * spin (s 0) * spin (s 3)
  else ξ₂ * spin (s 0) * spin (s 1)

def background (a b ξ₂ ξ₄ : ℝ) (s : Cube) : ℝ := ∑ i : Fin 3, localTerm a b ξ₂ ξ₄ i s
def physical (a b ξ₂ ξ₄ : ℝ) (s : Cube) : ℝ :=
  a * (spin (s 2) - spin (s 0)) + b * (spin (s 3) - spin (s 1))
 + ξ₂ * (spin (s 2) - spin (s 0)) * (spin (s 3) - spin (s 1))
 + ξ₄ * (spin (s 2) - spin (s 0))^2 * (spin (s 3) - spin (s 1))^2

theorem background_proper (a b ξ₂ ξ₄ : ℝ) : ProperForecast (background a b ξ₂ ξ₄) := by
  refine ⟨3, localTerm a b ξ₂ ξ₄, ?_, fun _ => rfl⟩
  intro i
  fin_cases i
  · exact ⟨0, fun s => by simp [localTerm, flip]⟩
  · exact ⟨1, fun s => by simp [localTerm, flip]⟩
  · exact ⟨2, fun s => by simp [localTerm, flip]⟩

theorem physical_decomposition (a b ξ₂ ξ₄ : ℝ) (s : Cube) :
    physical a b ξ₂ ξ₄ s = background a b ξ₂ ξ₄ s + 4 * ξ₄ * parity s := by
  simp [physical, background, localTerm, Fin.sum_univ_three, parity, Fin.prod_univ_four]
  ring_nf
  simp only [spin_square]
  ring

theorem physical_contrast (a b ξ₂ ξ₄ : ℝ) : contrast (physical a b ξ₂ ξ₄) = 4 * ξ₄ := by
  have hb := proper_forecast_zero _ (background_proper a b ξ₂ ξ₄)
  have h := contrast_sub (physical a b ξ₂ ξ₄) (background a b ξ₂ ξ₄)
  have heq : (fun s => physical a b ξ₂ ξ₄ s - background a b ξ₂ ξ₄ s) =
      (fun s => (4 * ξ₄) * parity s) := by
    funext s
    rw [physical_decomposition]
    ring
  rw [heq, contrast_smul, contrast_parity, hb] at h
  linarith

theorem all_proper_forecasts_error_lower (a b ξ₂ ξ₄ ε : ℝ) (hξ : 0 ≤ ξ₄)
    (f : Cube → ℝ) (hf : ProperForecast f)
    (herr : ∀ s, |physical a b ξ₂ ξ₄ s - f s| ≤ ε) : 4 * ξ₄ ≤ ε := by
  have h := contrast_abs_le _ ε herr
  rw [contrast_sub, physical_contrast, proper_forecast_zero f hf, sub_zero,
    abs_of_nonneg (by positivity : 0 ≤ 4 * ξ₄)] at h
  exact h

theorem proper_optimum_attained (a b ξ₂ ξ₄ : ℝ) (hξ : 0 ≤ ξ₄) :
    ProperForecast (background a b ξ₂ ξ₄) ∧
    ∀ s, |physical a b ξ₂ ξ₄ s - background a b ξ₂ ξ₄ s| = 4 * ξ₄ := by
  refine ⟨background_proper a b ξ₂ ξ₄, fun s => ?_⟩
  rw [physical_decomposition]
  simp [abs_mul, parity_abs, abs_of_nonneg (by positivity : 0 ≤ 4 * ξ₄)]

theorem all_proper_forecasts_mean_lower (a b ξ₂ ξ₄ : ℝ) (hξ : 0 ≤ ξ₄)
    (f : Cube → ℝ) (hf : ProperForecast f) :
    4 * ξ₄ ≤ (∑ s : Cube, |physical a b ξ₂ ξ₄ s - f s|) / 16 := by
  have h := abs_contrast_le_mean (fun s => physical a b ξ₂ ξ₄ s - f s)
  rw [contrast_sub, physical_contrast, proper_forecast_zero f hf, sub_zero,
    abs_of_nonneg (by positivity : 0 ≤ 4 * ξ₄)] at h
  exact h

theorem manuscript_quartic_constant : 4 * (1 / 1048576 : ℝ) = 1 / 262144 := by norm_num

theorem noise_cost_margin (ξ₄ ε cost : ℝ) (hξ : 0 < ξ₄)
    (he : ε ≤ ξ₄ / 1024) (hc : cost ≤ ξ₄ / 64) :
    1019 * ξ₄ / 256 ≤ 4 * ξ₄ - 4 * ε - cost ∧ 3 * ξ₄ < 4 * ξ₄ - 4 * ε - cost := by
  constructor <;> linarith

theorem equal_cost_replica_margin (candidateLoss replicaLoss candidateCost replicaCost : ℝ)
    (hl : replicaLoss = candidateLoss) (hc : replicaCost = candidateCost) :
    (replicaLoss + replicaCost) - (candidateLoss + candidateCost) = 0 := by rw [hl, hc]; ring

end
end QICNLean.FourRootContrast
