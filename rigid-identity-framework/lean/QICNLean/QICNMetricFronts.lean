import Mathlib.Topology.MetricSpace.Basic
import Mathlib.Topology.Order.Compact
import Mathlib.Tactic.Linarith

namespace QICNLean

/-- The fixed positive scale is used only when this set is nonempty. -/
def separatedPairs {α : Type*} [MetricSpace α] (r : ℝ) : Set (α × α) :=
  {z | r ≤ dist z.1 z.2}

/-- Paper I, thm:spectral-coupling. The modulus is an infimum over admissible pairs. -/
noncomputable def fixedScaleModulus {α β : Type*} [MetricSpace α] [MetricSpace β]
    (f : α → β) (r : ℝ) : ℝ :=
  sInf ((fun z : α × α => dist (f z.1) (f z.2)) '' separatedPairs r)

/-- Paper I, thm:spectral-coupling: attainability and a strictly positive minimum. -/
theorem fixed_scale_minimum {α β : Type*} [MetricSpace α] [CompactSpace α] [MetricSpace β]
    {f : α → β} (continuous_f : Continuous f) (injective_f : Function.Injective f)
    {r : ℝ} (positive_r : 0 < r) (nonempty_pairs : (separatedPairs (α := α) r).Nonempty) :
    ∃ z ∈ separatedPairs r,
      0 < dist (f z.1) (f z.2) ∧
      ∀ w ∈ separatedPairs r, dist (f z.1) (f z.2) ≤ dist (f w.1) (f w.2) := by
  have compact_pairs : IsCompact (separatedPairs (α := α) r) :=
    (isClosed_le continuous_const (continuous_fst.dist continuous_snd)).isCompact
  have continuous_distance : Continuous (fun z : α × α => dist (f z.1) (f z.2)) :=
    (continuous_f.comp continuous_fst).dist (continuous_f.comp continuous_snd)
  obtain ⟨z, member_z, minimum_z⟩ :=
    compact_pairs.exists_isMinOn nonempty_pairs continuous_distance.continuousOn
  have distinct_z : z.1 ≠ z.2 := by
    intro equal_z
    have zero_distance : dist z.1 z.2 = 0 := dist_eq_zero.mpr equal_z
    have bound : r ≤ dist z.1 z.2 := member_z
    linarith
  exact ⟨z, member_z, dist_pos.mpr (fun equal_images => distinct_z (injective_f equal_images)),
    minimum_z⟩

/-- Paper I, thm:spectral-coupling: the exact infimum is positive on its declared domain. -/
theorem fixed_scale_modulus_pos {α β : Type*} [MetricSpace α] [CompactSpace α] [MetricSpace β]
    {f : α → β} (continuous_f : Continuous f) (injective_f : Function.Injective f)
    {r : ℝ} (positive_r : 0 < r) (nonempty_pairs : (separatedPairs (α := α) r).Nonempty) :
    0 < fixedScaleModulus f r := by
  obtain ⟨z, member_z, positive_minimum, minimum_z⟩ :=
    fixed_scale_minimum continuous_f injective_f positive_r nonempty_pairs
  have least_image : IsLeast
      ((fun w : α × α => dist (f w.1) (f w.2)) '' separatedPairs r)
      (dist (f z.1) (f z.2)) := by
    refine ⟨Set.mem_image_of_mem _ member_z, ?_⟩
    intro value member_value
    obtain ⟨w, member_w, rfl⟩ := member_value
    exact minimum_z w member_w
  unfold fixedScaleModulus
  rw [least_image.csInf_eq]
  exact positive_minimum

/-- Every admissible pair is bounded below by the declared fixed-scale modulus. -/
theorem fixed_scale_modulus_le {α β : Type*} [MetricSpace α] [MetricSpace β]
    (f : α → β) (r : ℝ) (x y : α) (separated : r ≤ dist x y) :
    fixedScaleModulus f r ≤ dist (f x) (f y) := by
  unfold fixedScaleModulus
  apply csInf_le
  · refine ⟨0, ?_⟩
    rintro value ⟨pair, _, rfl⟩
    exact dist_nonneg
  · exact Set.mem_image_of_mem _ (show (x, y) ∈ separatedPairs r from separated)

/-- Paper Puente, thm:sigma-approximate-displacement.
Only the fixed-point equation and the metric contraction bound enter the inequality. -/
theorem approximate_commutation_displacement {α : Type*} [MetricSpace α]
    (sigma control : α → α) (p : α) (L : ℝ)
    (contraction : ∀ x y, dist (sigma x) (sigma y) ≤ L * dist x y)
    (fixed : sigma p = p) :
    (1 - L) * dist (control p) p ≤ dist (sigma (control p)) (control (sigma p)) := by
  have triangle := dist_triangle (control p) (sigma (control p)) p
  have bound := contraction (control p) p
  rw [fixed] at bound
  rw [fixed]
  rw [dist_comm (sigma (control p)) (control p)]
  linarith

/-- Paper Puente, thm:sigma-approximate-displacement: two controls at the same fixed point. -/
theorem approximate_commutation_pair {α : Type*} [MetricSpace α]
    (sigma first second : α → α) (p : α) (L : ℝ) (strict : L < 1)
    (contraction : ∀ x y, dist (sigma x) (sigma y) ≤ L * dist x y)
    (fixed : sigma p = p) :
    (1 - L) * dist (first p) (second p) ≤
      dist (sigma (first p)) (first (sigma p)) +
      dist (sigma (second p)) (second (sigma p)) := by
  have first_bound := approximate_commutation_displacement sigma first p L contraction fixed
  have second_bound := approximate_commutation_displacement sigma second p L contraction fixed
  have triangle := dist_triangle (first p) p (second p)
  rw [dist_comm p (second p)] at triangle
  have scaled := mul_le_mul_of_nonneg_left triangle (sub_nonneg.mpr (le_of_lt strict))
  linarith

end QICNLean
