import QICNLean.QICNInverseLimitTopology
import Mathlib.Topology.Algebra.InfiniteSum.Real
import Mathlib.Topology.Algebra.InfiniteSum.NatInt
import Mathlib.Order.ConditionallyCompleteLattice.Indexed
import Mathlib.Topology.MetricSpace.Lipschitz

/-!
All-stage channels and quantitative real suprema. The countable index is not
truncated. These are components of the weighted-history/Polish statements,
not a claim that completeness, separability or topology have been formalized.
The auxiliary SUM bound below is kept distinct from the manuscript SUPREMUM.
-/
namespace QICNLean.WeightedChannels

open QICNLean.InverseLimitTopology
noncomputable section
universe u v

def channelLift {S : ℕ → Type u} {Y : ℕ → Type v}
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (x : QICNLean.ProjectiveHistories p) : QICNLean.ProjectiveHistories q :=
  ⟨fun n => C n (x.val n), fun n => by rw [hcomm, x.property n]⟩

theorem channel_projection {S : ℕ → Type u} {Y : ℕ → Type v}
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (x : QICNLean.ProjectiveHistories p) (n : ℕ) :
    (channelLift p q C hcomm x).val n = C n (x.val n) := rfl

theorem channel_continuous {S : ℕ → Type u} {Y : ℕ → Type v}
    [∀ n, TopologicalSpace (S n)] [∀ n, TopologicalSpace (Y n)]
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (hC : ∀ n, Continuous (C n)) : Continuous (channelLift p q C hcomm) := by
  exact (continuous_pi fun n =>
    (hC n).comp ((continuous_apply n).comp continuous_subtype_val)).subtype_mk _

def weightedSup (w d : ℕ → ℝ) : ℝ := ⨆ n, w n * d n

/-- Lower coordinate bounds, with explicit finite target supremum. -/
theorem weighted_sup_coercivity (w v c d e : ℕ → ℝ) (C₀ : ℝ)
    (hC : 0 < C₀) (hv : ∀ n, 0 ≤ v n) (hd : ∀ n, 0 ≤ d n)
    (hcoord : ∀ n, c n * d n ≤ e n)
    (hweight : ∀ n, C₀ * w n ≤ v n * c n)
    (hbound : BddAbove (Set.range (fun n => v n * e n))) :
    C₀ * weightedSup w d ≤ weightedSup v e := by
  have hn (n : ℕ) : C₀ * (w n * d n) ≤ weightedSup v e := by
    calc
      C₀ * (w n * d n) = (C₀ * w n) * d n := by ring
      _ ≤ (v n * c n) * d n := mul_le_mul_of_nonneg_right (hweight n) (hd n)
      _ = v n * (c n * d n) := by ring
      _ ≤ v n * e n := mul_le_mul_of_nonneg_left (hcoord n) (hv n)
      _ ≤ weightedSup v e := le_ciSup hbound n
  have hs : weightedSup w d ≤ weightedSup v e / C₀ := by
    apply ciSup_le
    intro n
    exact (le_div_iff₀ hC).mpr (by simpa [mul_comm] using hn n)
  simpa [mul_comm] using (le_div_iff₀ hC).mp hs

/-- The coefficient really is the infimum of all stage ratios. -/
theorem infimum_weighted_coercivity (w v c d e : ℕ → ℝ)
    (hw : ∀ n, 0 < w n) (hv : ∀ n, 0 ≤ v n) (hc : ∀ n, 0 ≤ c n)
    (hd : ∀ n, 0 ≤ d n) (hcoord : ∀ n, c n * d n ≤ e n)
    (hC : 0 < ⨅ n, v n * c n / w n)
    (hbound : BddAbove (Set.range (fun n => v n * e n))) :
    (⨅ n, v n * c n / w n) * weightedSup w d ≤ weightedSup v e := by
  apply weighted_sup_coercivity w v c d e _ hC hv hd hcoord _ hbound
  intro n
  have hb : BddBelow (Set.range (fun k => v k * c k / w k)) := by
    refine ⟨0, ?_⟩
    rintro _ ⟨k, rfl⟩
    exact div_nonneg (mul_nonneg (hv k) (hc k)) (hw k).le
  exact (le_div_iff₀ (hw n)).mp (ciInf_le hb n)

theorem post_readout_coercivity (D E L C₀ ell : ℝ)
    (hell : 0 ≤ ell) (hchannel : C₀ * D ≤ E) (hread : ell * E ≤ L) :
    (ell * C₀) * D ≤ L := by nlinarith [mul_le_mul_of_nonneg_left hchannel hell]

theorem channel_weighted_distance_lower {S : ℕ → Type u} {Y : ℕ → Type v}
    [∀ n, MetricSpace (S n)] [∀ n, MetricSpace (Y n)]
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (w v c : ℕ → ℝ) (hw : ∀ n, 0 < w n) (hv : ∀ n, 0 ≤ v n)
    (hc : ∀ n, 0 ≤ c n)
    (hcoord : ∀ n a b, c n * dist a b ≤ dist (C n a) (C n b))
    (hC : 0 < ⨅ n, v n * c n / w n)
    (x y : QICNLean.ProjectiveHistories p)
    (hb : BddAbove (Set.range (fun n => v n * dist (C n (x.val n)) (C n (y.val n))))) :
    (⨅ n, v n * c n / w n) * weightedSup w (fun n => dist (x.val n) (y.val n)) ≤
      weightedSup v (fun n => dist ((channelLift p q C hcomm x).val n)
        ((channelLift p q C hcomm y).val n)) := by
  exact infimum_weighted_coercivity w v c _ _ hw hv hc (fun _ => dist_nonneg)
    (fun n => hcoord n _ _) hC hb

theorem post_channel_detectability {S : ℕ → Type u} {Y : ℕ → Type v} {E : Type*}
    [∀ n, MetricSpace (S n)] [∀ n, MetricSpace (Y n)] [MetricSpace E]
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (w v c : ℕ → ℝ) (hw : ∀ n, 0 < w n) (hv : ∀ n, 0 ≤ v n)
    (hc : ∀ n, 0 ≤ c n)
    (hcoord : ∀ n a b, c n * dist a b ≤ dist (C n a) (C n b))
    (hC : 0 < ⨅ n, v n * c n / w n)
    (L : QICNLean.ProjectiveHistories q → E) (ell : ℝ) (hell : 0 ≤ ell)
    (x y : QICNLean.ProjectiveHistories p)
    (hL : ell * weightedSup v (fun n => dist (C n (x.val n)) (C n (y.val n))) ≤
      dist (L (channelLift p q C hcomm x)) (L (channelLift p q C hcomm y)))
    (hb : BddAbove (Set.range (fun n => v n * dist (C n (x.val n)) (C n (y.val n))))) :
    (ell * (⨅ n, v n * c n / w n)) * weightedSup w (fun n => dist (x.val n) (y.val n)) ≤
      dist (L (channelLift p q C hcomm x)) (L (channelLift p q C hcomm y)) := by
  exact post_readout_coercivity _ _ _ _ ell hell
    (channel_weighted_distance_lower p q C hcomm w v c hw hv hc hcoord hC x y hb)
    hL

theorem single_stage_detectability {S : ℕ → Type u} {Y : ℕ → Type v} {E : Type*}
    [∀ n, MetricSpace (S n)] [∀ n, MetricSpace (Y n)] [MetricSpace E]
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (v c : ℕ → ℝ) (hv : ∀ n, 0 ≤ v n) (hc : ∀ n, 0 ≤ c n)
    (hcoord : ∀ n a b, c n * dist a b ≤ dist (C n a) (C n b))
    (L : QICNLean.ProjectiveHistories q → E) (ell : ℝ) (hell : 0 ≤ ell)
    (x y : QICNLean.ProjectiveHistories p) (n : ℕ) (ε : ℝ)
    (hL : ell * weightedSup v (fun k => dist (C k (x.val k)) (C k (y.val k))) ≤
      dist (L (channelLift p q C hcomm x)) (L (channelLift p q C hcomm y)))
    (hε : ε ≤ dist (x.val n) (y.val n))
    (hb : BddAbove (Set.range (fun k => v k * dist (C k (x.val k)) (C k (y.val k))))) :
    ell * v n * c n * ε ≤ dist (L (channelLift p q C hcomm x)) (L (channelLift p q C hcomm y)) := by
  calc
    _ ≤ ell * v n * c n * dist (x.val n) (y.val n) :=
      mul_le_mul_of_nonneg_left hε (mul_nonneg (mul_nonneg hell (hv n)) (hc n))
    _ = ell * (v n * (c n * dist (x.val n) (y.val n))) := by ring
    _ ≤ ell * (v n * dist (C n (x.val n)) (C n (y.val n))) :=
      mul_le_mul_of_nonneg_left (mul_le_mul_of_nonneg_left (hcoord n _ _) (hv n)) hell
    _ ≤ ell * weightedSup v (fun k => dist (C k (x.val k)) (C k (y.val k))) :=
      mul_le_mul_of_nonneg_left (le_ciSup hb n) hell
    _ ≤ _ := hL

theorem post_channel_continuous {S : ℕ → Type u} {Y : ℕ → Type v} {E : Type*}
    [∀ n, TopologicalSpace (S n)] [∀ n, TopologicalSpace (Y n)] [TopologicalSpace E]
    (p : (n : ℕ) → S (n + 1) → S n) (q : (n : ℕ) → Y (n + 1) → Y n)
    (C : (n : ℕ) → S n → Y n)
    (hcomm : ∀ n z, q n (C (n + 1) z) = C n (p n z))
    (hC : ∀ n, Continuous (C n)) (L : QICNLean.ProjectiveHistories q → E)
    (hL : Continuous L) : Continuous (fun x => L (channelLift p q C hcomm x)) :=
  hL.comp (channel_continuous p q C hcomm hC)

theorem upper_lipschitz_is_not_coercivity :
    ∃ f : ℝ → ℝ, LipschitzWith 1 f ∧ f 0 = f 1 := by
  refine ⟨fun _ => 0, ?_, rfl⟩
  exact LipschitzWith.of_dist_le_mul fun _ _ => by simp

theorem constant_has_no_positive_coercivity (c : ℝ) (hc : 0 < c) :
    ¬ ∀ x y : ℝ, c * dist x y ≤ dist (0 : ℝ) 0 := by
  intro h
  have hh := h 0 1
  norm_num [Real.dist_eq] at hh
  linarith

def prefixMax (f : ℕ → ℝ) (N : ℕ) : ℝ :=
  (Finset.range (N + 1)).sup' ⟨0, by simp⟩ f

theorem supremum_prefix_tail (f : ℕ → ℝ) (N : ℕ) (ε : ℝ)
    (hf : ∀ n, 0 ≤ f n) (he : 0 ≤ ε)
    (htail : ∀ n, N < n → f n ≤ ε)
    (hb : BddAbove (Set.range f)) :
    0 ≤ (⨆ n, f n) - prefixMax f N ∧
    (⨆ n, f n) - prefixMax f N ≤ ε := by
  have hp : prefixMax f N ≤ ⨆ n, f n := by
    exact Finset.sup'_le _ _ (fun n _ => le_ciSup hb n)
  have hp0 : 0 ≤ prefixMax f N :=
    (hf 0).trans (Finset.le_sup' f (by simp : 0 ∈ Finset.range (N + 1)))
  have hu : (⨆ n, f n) ≤ prefixMax f N + ε := by
    apply ciSup_le
    intro n
    by_cases h : n ≤ N
    · exact (Finset.le_sup' f (Finset.mem_range.mpr (Nat.lt_succ_iff.mpr h))).trans
        (le_add_of_nonneg_right he)
    · exact (htail n (Nat.lt_of_not_ge h)).trans (le_add_of_nonneg_left hp0)
  exact ⟨sub_nonneg.mpr hp, by linarith⟩

/-- A separate bounded SUM construction; never substituted for weightedSup. -/
theorem bounded_weighted_series (w d : ℕ → ℝ)
    (hw : Summable w) (hw0 : ∀ n, 0 ≤ w n)
    (hd0 : ∀ n, 0 ≤ d n) (hd1 : ∀ n, d n ≤ 1) :
    Summable (fun n => w n * d n) ∧
    0 ≤ ∑' n, w n * d n ∧ (∑' n, w n * d n) ≤ ∑' n, w n := by
  have hn : ∀ n, 0 ≤ w n * d n := fun n => mul_nonneg (hw0 n) (hd0 n)
  have hl : ∀ n, w n * d n ≤ w n := fun n => by
    simpa using mul_le_mul_of_nonneg_left (hd1 n) (hw0 n)
  have hs : Summable (fun n => w n * d n) := Summable.of_nonneg_of_le hn hl hw
  exact ⟨hs, tsum_nonneg hn, hs.tsum_le_tsum hl hw⟩

theorem capped_distance_triangle (a b c : ℝ) (hb : 0 ≤ b) (hc : 0 ≤ c)
    (ha : a ≤ b + c) : min 1 a ≤ min 1 b + min 1 c := by
  by_cases hb1 : b ≤ 1
  · rw [min_eq_right hb1]
    by_cases hc1 : c ≤ 1
    · rw [min_eq_right hc1]
      exact (min_le_right _ _).trans ha
    · rw [min_eq_left (le_of_not_ge hc1)]
      exact (min_le_left _ _).trans (by linarith)
  · rw [min_eq_left (le_of_not_ge hb1)]
    exact (min_le_left _ _).trans (le_add_of_nonneg_right (le_min (by norm_num) hc))

theorem bounded_metric_history_series {S : ℕ → Type u} [∀ n, MetricSpace (S n)]
    (w : ℕ → ℝ) (hw : Summable w) (hw0 : ∀ n, 0 ≤ w n)
    (x y : (n : ℕ) → S n) :
    Summable (fun n => w n * min 1 (dist (x n) (y n))) ∧
    0 ≤ ∑' n, w n * min 1 (dist (x n) (y n)) ∧
    (∑' n, w n * min 1 (dist (x n) (y n))) ≤ ∑' n, w n := by
  exact bounded_weighted_series w _ hw hw0
    (fun _ => le_min (by norm_num) dist_nonneg) (fun _ => min_le_left _ _)

theorem capped_weighted_sup_tail {S : ℕ → Type u} [∀ n, MetricSpace (S n)]
    (w : ℕ → ℝ) (hw0 : ∀ n, 0 ≤ w n) (x y : (n : ℕ) → S n)
    (N : ℕ) (ε : ℝ) (he : 0 ≤ ε) (htail : ∀ n, N < n → w n ≤ ε)
    (hb : BddAbove (Set.range (fun n => w n * min 1 (dist (x n) (y n))))) :
    0 ≤ weightedSup w (fun n => min 1 (dist (x n) (y n))) -
      prefixMax (fun n => w n * min 1 (dist (x n) (y n))) N ∧
    weightedSup w (fun n => min 1 (dist (x n) (y n))) -
      prefixMax (fun n => w n * min 1 (dist (x n) (y n))) N ≤ ε := by
  apply supremum_prefix_tail _ N ε _ he _ hb
  · intro n
    exact mul_nonneg (hw0 n) (le_min (by norm_num) dist_nonneg)
  · intro n hn
    exact (mul_le_of_le_one_right (hw0 n) (min_le_left _ _)).trans (htail n hn)

end
end QICNLean.WeightedChannels
