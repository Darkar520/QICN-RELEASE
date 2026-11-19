import QICNLean.QICNFourRootContrast

namespace QICNLean.HybridBoundary

open scoped BigOperators
open QICNLean.FourRootContrast (Cube spin parity contrast)
noncomputable section

def lateSign {m : ℕ} (x q : Fin m → Bool) : ℝ :=
  ∏ i : Fin m, if q i then spin (x i) else 1

theorem unit_query {m : ℕ} (x : Fin m → Bool) (i : Fin m) :
    lateSign x (fun j => decide (j = i)) = spin (x i) := by
  classical
  unfold lateSign
  rw [Finset.prod_eq_single i]
  · simp
  · intro j _ h
    simp [h]
  · simp

theorem collision_forces_response_error (G b u e : ℝ) (_hG : 0 ≤ G)
    (a a' : Bool) (hne : a ≠ a')
    (h₁ : |b + G * spin a - u| ≤ e)
    (h₂ : |b + G * spin a' - u| ≤ e) : G ≤ e := by
  have h := abs_add_le (b + G * spin a - u) (-(b + G * spin a' - u))
  rw [abs_neg] at h
  cases a <;> cases a' <;> simp_all [spin, abs_le]
  all_goals linarith

theorem deadline_capacity_lower {m : ℕ} {T : Type*} [Fintype T]
    (encode : (Fin m → Bool) → T) (dec : T → (Fin m → Bool) → ℝ)
    (baseline : (Fin m → Bool) → ℝ) (G e : ℝ) (hG : 0 ≤ G)
    (hcap : Fintype.card T < 2 ^ m)
    (herr : ∀ x q, |baseline q + G * lateSign x q - dec (encode x) q| ≤ e) :
    G ≤ e := by
  classical
  have hni : ¬ Function.Injective encode := by
    intro h
    have hb := Fintype.card_le_of_injective encode h
    have hcard : Fintype.card (Fin m → Bool) = 2 ^ m := by
      simp
    rw [hcard] at hb
    omega
  unfold Function.Injective at hni
  push Not at hni
  obtain ⟨x, y, he, hxy⟩ := hni
  have hd : ¬ ∀ i, x i = y i := fun h => hxy (funext h)
  push Not at hd
  obtain ⟨i, hi⟩ := hd
  let q : Fin m → Bool := fun j => decide (j = i)
  have ux : lateSign x q = spin (x i) := unit_query x i
  have uy : lateSign y q = spin (y i) := unit_query y i
  exact collision_forces_response_error G (baseline q) (dec (encode x) q) e hG
    (x i) (y i) hi (by simpa only [ux] using herr x q)
    (by simpa only [uy, ← he] using herr y q)

theorem lateSign_abs {m : ℕ} (x q : Fin m → Bool) : |lateSign x q| = 1 := by
  have h (b : Bool) : |spin b| = 1 := by cases b <;> norm_num [spin]
  unfold lateSign
  have hprod : ∀ s : Finset (Fin m), |∏ i ∈ s, if q i then spin (x i) else 1| = 1 := by
    intro s
    classical
    induction s using Finset.induction_on with
    | empty => simp
    | @insert a s ha ih =>
      rw [Finset.prod_insert ha, abs_mul, ih, mul_one]
      split <;> simp [h]
  exact hprod Finset.univ

theorem centred_forecast_attains {m : ℕ} (x q : Fin m → Bool) (G b : ℝ)
    (hG : 0 ≤ G) : |b + G * lateSign x q - b| = G := by
  rw [add_sub_cancel_left, abs_mul, abs_of_nonneg hG, lateSign_abs, mul_one]

def contrast5 (f : Bool → Cube → ℝ) : ℝ :=
  (contrast (f true) - contrast (f false)) / 2

def proper5 (f : Bool → Cube → ℝ) : Prop :=
  ∃ n : ℕ, ∃ branch : Fin n → Bool → Cube → ℝ,
    (∀ i, branch i true = branch i false ∨
      ∃ j, ∀ r, QICNLean.FourRootContrast.Ignores j (branch i r)) ∧
    ∀ r s, f r s = ∑ i, branch i r s

theorem proper5_contrast_zero (f : Bool → Cube → ℝ) (hf : proper5 f) :
    contrast5 f = 0 := by
  obtain ⟨n,g,hg,hf⟩ := hf
  unfold contrast5
  rw [show f true = (fun s => ∑ i : Fin n, g i true s) from funext (hf true),
      show f false = (fun s => ∑ i : Fin n, g i false s) from funext (hf false)]
  rw [QICNLean.FourRootContrast.contrast_sum, QICNLean.FourRootContrast.contrast_sum]
  have hs : (∑ i : Fin n, contrast (g i true)) = ∑ i : Fin n, contrast (g i false) := by
    apply Finset.sum_congr rfl
    intro i _
    rcases hg i with h | ⟨j,h⟩
    · rw [h]
    · rw [QICNLean.FourRootContrast.ignored_coordinate_has_zero_contrast _ j (h true),
          QICNLean.FourRootContrast.ignored_coordinate_has_zero_contrast _ j (h false)]
  rw [hs, sub_self, zero_div]

def physical5 (a b u v η : ℝ) (r : Bool) (s : Cube) : ℝ :=
  QICNLean.FourRootContrast.physical a b u ((1 + η * spin r) * v) s

theorem physical5_contrast (a b u v η : ℝ) : contrast5 (physical5 a b u v η) = 4 * η * v := by
  have ht : physical5 a b u v η true = QICNLean.FourRootContrast.physical a b u ((1 + η * spin true) * v) := rfl
  have hf : physical5 a b u v η false = QICNLean.FourRootContrast.physical a b u ((1 + η * spin false) * v) := rfl
  unfold contrast5
  rw [ht, hf, QICNLean.FourRootContrast.physical_contrast, QICNLean.FourRootContrast.physical_contrast]
  norm_num [spin]
  ring

theorem fifth_contrast_error_bound (f g : Bool → Cube → ℝ) (e : ℝ)
    (hg : proper5 g) (herr : ∀ r s, |f r s - g r s| ≤ e) :
    |contrast5 f| ≤ e := by
  have h₁ := QICNLean.FourRootContrast.contrast_abs_le _ e (herr true)
  have h₂ := QICNLean.FourRootContrast.contrast_abs_le _ e (herr false)
  rw [QICNLean.FourRootContrast.contrast_sub] at h₁ h₂
  have hzero := proper5_contrast_zero g hg
  unfold contrast5 at hzero ⊢
  rw [abs_le] at h₁ h₂ ⊢
  constructor <;> linarith

theorem fifth_contrast_mean_bound (f g : Bool → Cube → ℝ) (hg : proper5 g) :
    |contrast5 f| ≤ ((∑ s : Cube, |f true s - g true s|) +
      ∑ s : Cube, |f false s - g false s|) / 32 := by
  have h₁ := QICNLean.FourRootContrast.abs_contrast_le_mean (fun s => f true s - g true s)
  have h₂ := QICNLean.FourRootContrast.abs_contrast_le_mean (fun s => f false s - g false s)
  rw [QICNLean.FourRootContrast.contrast_sub] at h₁ h₂
  have hzero := proper5_contrast_zero g hg
  unfold contrast5 at hzero ⊢
  rw [abs_le] at h₁ h₂ ⊢
  constructor <;> linarith


def background5 (a b u v η : ℝ) (r : Bool) (s : Cube) : ℝ :=
    QICNLean.FourRootContrast.physical a b u v s +
      4 * η * v * spin r * (1 - spin (s 0) * spin (s 2) - spin (s 1) * spin (s 3))

theorem five_root_decomposition (a b u v η : ℝ) (r : Bool) (s : Cube) :
    physical5 a b u v η r s - background5 a b u v η r s =
      4 * η * v * spin r * parity s := by
  simp only [physical5, background5, QICNLean.FourRootContrast.physical, parity, Fin.prod_univ_four]
  ring_nf
  simp only [QICNLean.FourRootContrast.spin_square]
  ring

theorem background5_proper (a b u v η : ℝ) : proper5 (background5 a b u v η) := by
  let terms : Fin 3 → Bool → Cube → ℝ := fun i r s =>
    if i = 0 then QICNLean.FourRootContrast.physical a b u v s
    else if i = 1 then 4 * η * v * spin r * (1 - spin (s 0) * spin (s 2))
    else -(4 * η * v * spin r * spin (s 1) * spin (s 3))
  refine ⟨3, terms, ?_, ?_⟩
  · intro i
    fin_cases i
    · left
      rfl
    · right
      exact ⟨1, fun r s => by simp [terms, QICNLean.FourRootContrast.flip]⟩
    · right
      exact ⟨0, fun r s => by simp [terms, QICNLean.FourRootContrast.flip]⟩
  · intro r s
    simp [terms, background5, Fin.sum_univ_three]
    ring

theorem fifth_gap_attained (a b u v η : ℝ) (h : 0 ≤ η * v) (r : Bool) (s : Cube) :
    |physical5 a b u v η r s - background5 a b u v η r s| = 4 * η * v := by
  rw [five_root_decomposition]
  have hs : |spin r| = 1 := by cases r <;> norm_num [spin]
  have hn : 0 ≤ 4 * η * v := by nlinarith
  simp [abs_mul, QICNLean.FourRootContrast.parity_abs, hs, abs_of_nonneg hn]

theorem manuscript_fifth_constant : 4 * (1/8 : ℝ) * (1/1048576) = 1/2097152 := by
  norm_num

theorem signed_margin_stability (r r' h h' ε : ℝ)
    (hr : |r' - r| ≤ 2 * ε) (hh : |h' - h| ≤ 2 * ε) :
    |(r' - h') - (r - h)| ≤ 4 * ε := by
  rw [abs_le] at hr hh ⊢
  constructor <;> linarith

theorem certified_separator_survives (σ ε x y u : ℝ)
    (hs : σ ≤ |x - y|) (h₁ : |x - u| ≤ ε) (h₂ : |y - u| ≤ ε) :
    σ / 2 ≤ ε := by
  have h := abs_add_le (x-u) (-(y-u))
  rw [abs_neg, show x-u + -(y-u) = x-y by ring] at h
  linarith

theorem faithful_quotient_injective {X Q A : Type*} (quotient : X → Q)
    (read : X → A) (readQuotient : Q → A)
    (hinj : Function.Injective read) (h : ∀ x, readQuotient (quotient x) = read x) :
    Function.Injective quotient := by
  intro x y hxy
  apply hinj
  rw [← h x, ← h y, hxy]

end
end QICNLean.HybridBoundary
