import QICNLean.QICNBaseSufficiency
import Mathlib.MeasureTheory.Function.L2Space
import Mathlib.MeasureTheory.Function.LpOrder
import Mathlib.Analysis.SpecialFunctions.Integrals.Basic

/-!
Actual L2 on the unit interval (restricted Lebesgue measure, endpoints a.e.).
The affine equilibrium is the explicit common witness of BaseCore section 11.
No finite-dimensional ambient replacement and no assumption of non-collapse.
-/
namespace QICNLean.L2PositiveWitness

open MeasureTheory Set
open scoped ENNReal
noncomputable section

abbrev μ : Measure ℝ := volume.restrict (Icc (0 : ℝ) 1)
abbrev H := Lp ℝ 2 μ

instance finite_mu : IsFiniteMeasure μ := ⟨by simp [μ]⟩

lemma affine_memLp (a b : ℝ) : MemLp (fun s : ℝ => a * s + b) 2 μ := by
  apply MemLp.of_bound
    ((continuous_const.mul continuous_id).add continuous_const).aestronglyMeasurable
    (|a| + |b|)
  filter_upwards [ae_restrict_mem measurableSet_Icc] with s hs
  have habs : |s| ≤ 1 := abs_le.mpr ⟨by linarith [hs.1], hs.2⟩
  calc
    ‖a * s + b‖ ≤ |a * s| + |b| := abs_add_le _ _
    _ = |a| * |s| + |b| := by rw [abs_mul]
    _ ≤ |a| + |b| := by nlinarith [abs_nonneg a]

def affine (a b : ℝ) : H := (affine_memLp a b).toLp (fun s => a * s + b)

theorem affine_ae (a b : ℝ) : affine a b =ᵐ[μ] (fun s => a * s + b) :=
  (affine_memLp a b).coeFn_toLp

theorem inner_affine (a b c d : ℝ) :
    inner ℝ (affine a b) (affine c d) = a * c / 3 + (a * d + b * c) / 2 + b * d := by
  rw [L2.inner_def]
  have heq : (fun s => inner ℝ (affine a b s) (affine c d s)) =ᵐ[μ]
      (fun s : ℝ => (a * s + b) * (c * s + d)) := by
    filter_upwards [affine_ae a b, affine_ae c d] with s hs ht
    rw [hs, ht]
    simp [mul_comm]
  rw [integral_congr_ae heq]
  change (∫ s in Icc (0 : ℝ) 1, (a * s + b) * (c * s + d)) = _
  rw [integral_Icc_eq_integral_Ioc, ← intervalIntegral.integral_of_le (by norm_num : (0 : ℝ) ≤ 1)]
  have hp : (fun s : ℝ => (a * s + b) * (c * s + d)) =
      (fun s => (a * c) * s ^ 2 + (a * d + b * c) * s + b * d) := by
    funext s
    ring
  have hquad : IntervalIntegrable (fun s : ℝ => (a * c) * s ^ 2) volume 0 1 :=
    (by fun_prop : Continuous (fun s : ℝ => (a * c) * s ^ 2)).intervalIntegrable _ _
  have hlin : IntervalIntegrable (fun s : ℝ => (a * d + b * c) * s) volume 0 1 :=
    (by fun_prop : Continuous (fun s : ℝ => (a * d + b * c) * s)).intervalIntegrable _ _
  have hconst : IntervalIntegrable (fun _ : ℝ => b * d) volume 0 1 :=
    continuous_const.intervalIntegrable _ _
  rw [hp, intervalIntegral.integral_add (hquad.add hlin) hconst,
    intervalIntegral.integral_add hquad hlin,
    intervalIntegral.integral_const_mul, intervalIntegral.integral_const_mul]
  norm_num
  ring

def gap : ℝ := 1 / (4 * Real.sqrt 12)

theorem gap_pos : 0 < gap := by unfold gap; positivity

theorem gap_sq : gap ^ 2 = 1 / 192 := by
  have hs : Real.sqrt 12 ^ 2 = (12 : ℝ) := Real.sq_sqrt (by norm_num)
  have hp : 0 < Real.sqrt 12 := by positivity
  unfold gap
  field_simp
  nlinarith

theorem distance_to_constant_sq (b c : ℝ) :
    ‖affine (1 / 4) b - affine 0 c‖ ^ 2 = 1 / 192 + (b + 1 / 8 - c) ^ 2 := by
  rw [← real_inner_self_eq_norm_sq]
  simp only [inner_sub_left, inner_sub_right, inner_affine]
  ring

theorem positive_separation (b c : ℝ) : gap ≤ ‖affine (1 / 4) b - affine 0 c‖ := by
  have h := distance_to_constant_sq b c
  have hg := gap_sq
  have hp := gap_pos
  have hn := norm_nonneg (affine (1 / 4) b - affine 0 c)
  nlinarith [sq_nonneg (b + 1 / 8 - c)]

theorem optimal_constant (b : ℝ) :
    ‖affine (1 / 4) b - affine 0 (b + 1 / 8)‖ = gap := by
  have h := distance_to_constant_sq b (b + 1 / 8)
  have hg := gap_sq
  have hp := gap_pos
  have hn := norm_nonneg (affine (1 / 4) b - affine 0 (b + 1 / 8))
  nlinarith

theorem nonconstant (b c : ℝ) : affine (1 / 4) b ≠ affine 0 c := by
  intro h
  have hh := positive_separation b c
  rw [h, sub_self, norm_zero] at hh
  linarith [gap_pos]

theorem affine_add (a b c d : ℝ) : affine a b + affine c d = affine (a + c) (b + d) := by
  apply Lp.ext
  filter_upwards [Lp.coeFn_add (affine a b) (affine c d), affine_ae a b,
    affine_ae c d, affine_ae (a + c) (b + d)] with x hx ha hb hc
  rw [hx, hc]
  simp only [Pi.add_apply, ha, hb]
  ring

theorem affine_smul (r a b : ℝ) : r • affine a b = affine (r * a) (r * b) := by
  apply Lp.ext
  filter_upwards [Lp.coeFn_smul r (affine a b), affine_ae a b,
    affine_ae (r * a) (r * b)] with x hx ha hb
  rw [hx, hb]
  simp only [Pi.smul_apply, smul_eq_mul, ha]
  ring

def one : H := affine 0 1

theorem norm_one : ‖one‖ = 1 := by
  have hi : ‖one‖ ^ 2 = 1 := by
    rw [← real_inner_self_eq_norm_sq]
    change inner ℝ (affine 0 1) (affine 0 1) = 1
    rw [inner_affine]
    norm_num
  nlinarith [norm_nonneg one]

theorem mean_is_integral (f : H) : inner ℝ one f = ∫ s, f s ∂μ := by
  rw [L2.inner_def]
  apply integral_congr_ae
  filter_upwards [affine_ae 0 1] with x hx
  simp [one, hx]

def meanOperator : H →L[ℝ] H :=
  (1 / 4 : ℝ) • InnerProductSpace.rankOne ℝ one one

theorem mean_operator_norm : ‖meanOperator‖ = (1 / 4 : ℝ) := by
  unfold meanOperator
  rw [norm_smul, InnerProductSpace.norm_rankOne]
  simp only [norm_one]
  norm_num

theorem mean_operator_formula (f : H) :
    meanOperator f = (1 / 4 : ℝ) • ((∫ s, f s ∂μ) • one) := by
  simp [meanOperator, InnerProductSpace.rankOne_apply, mean_is_integral]

def box : Set H := Icc 0 one

theorem affine_in_box (a b : ℝ) (ha : 0 ≤ a) (hb : 0 ≤ b) (hab : a + b ≤ 1) :
    affine a b ∈ box := by
  constructor
  · apply (Lp.coeFn_nonneg _).mp
    filter_upwards [affine_ae a b, ae_restrict_mem measurableSet_Icc] with x hx hxI
    rw [hx]
    dsimp
    nlinarith [hxI.1]
  · apply (Lp.coeFn_le _ _).mp
    filter_upwards [affine_ae a b, affine_ae 0 1, ae_restrict_mem measurableSet_Icc]
      with x hx hone hxI
    change affine a b x ≤ affine 0 1 x
    rw [hx, hone]
    nlinarith [hxI.2]

theorem box_nonempty : box.Nonempty := by
  have h := affine_in_box 0 0 (by norm_num) (by norm_num) (by norm_num)
  exact ⟨affine 0 0, h⟩

theorem box_closed : IsClosed box := isClosed_Icc

theorem box_convex : Convex ℝ box := by
  intro x hx y hy a b ha hb hab
  constructor
  · apply (Lp.coeFn_nonneg _).mp
    filter_upwards [Lp.coeFn_add (a • x) (b • y), Lp.coeFn_smul a x,
      Lp.coeFn_smul b y, (Lp.coeFn_nonneg x).mpr hx.1,
      (Lp.coeFn_nonneg y).mpr hy.1] with t ht hax hby hxt hyt
    simp only [ht, Pi.add_apply, hax, hby, Pi.smul_apply, smul_eq_mul]
    exact add_nonneg (mul_nonneg ha hxt) (mul_nonneg hb hyt)
  · apply (Lp.coeFn_le _ _).mp
    filter_upwards [Lp.coeFn_add (a • x) (b • y), Lp.coeFn_smul a x,
      Lp.coeFn_smul b y, (Lp.coeFn_le x one).mpr hx.2,
      (Lp.coeFn_le y one).mpr hy.2] with t ht hax hby hxt hyt
    simp only [ht, Pi.add_apply, hax, hby, Pi.smul_apply, smul_eq_mul]
    calc
      _ ≤ a * one t + b * one t := add_le_add
        (mul_le_mul_of_nonneg_left hxt ha) (mul_le_mul_of_nonneg_left hyt hb)
      _ = one t := by rw [← add_mul, hab, one_mul]

theorem projection_eq_self {x : H} (hx : x ∈ box) :
    convexProjection box box_nonempty box_closed.isComplete box_convex x = x := by
  letI : Nonempty box := ⟨⟨x, hx⟩⟩
  apply convex_minimizer_unique box_convex
    (convexProjection_mem box_nonempty box_closed.isComplete box_convex x) hx
    (convexProjection_minimizes box_nonempty box_closed.isComplete box_convex x)
  rw [sub_self, norm_zero]
  apply le_antisymm
  · exact le_ciInf (fun _ => norm_nonneg _)
  · simpa using ciInf_le
      (show BddBelow (Set.range (fun z : box => ‖x - (z : H)‖)) from
        ⟨0, by rintro _ ⟨z, rfl⟩; exact norm_nonneg _⟩) ⟨x, hx⟩

def forcing (u : ℝ) : H := affine (1 / 4) u
def equilibrium (u : ℝ) : H := affine (1 / 4) (1 / 24 + 4 * u / 3)
def transition (u : ℝ) : H → H :=
  projectedAffineMap box box_nonempty box_closed.isComplete box_convex meanOperator (forcing u)

theorem affine_equilibrium_equation (u : ℝ) :
    meanOperator (equilibrium u) + forcing u = equilibrium u := by
  simp only [meanOperator, smul_apply, InnerProductSpace.rankOne_apply,
    equilibrium, forcing, one, inner_affine, affine_smul, affine_add]
  congr 1 <;> ring

theorem equilibrium_in_box (u : ℝ) (hu : u ∈ Icc (0 : ℝ) (1 / 4)) : equilibrium u ∈ box := by
  apply affine_in_box <;> linarith [hu.1, hu.2]

theorem equilibrium_fixed (u : ℝ) (hu : u ∈ Icc (0 : ℝ) (1 / 4)) :
    transition u (equilibrium u) = equilibrium u := by
  unfold transition projectedAffineMap
  rw [affine_equilibrium_equation]
  exact projection_eq_self (equilibrium_in_box u hu)

theorem transition_unique (u : ℝ) (hu : u ∈ Icc (0 : ℝ) (1 / 4)) :
    ∃! f : H, transition u f = f := by
  have hc := projectedAffineMap_contracting box box_nonempty box_closed.isComplete box_convex
    meanOperator (by rw [mean_operator_norm]; norm_num) (forcing u)
  refine ⟨equilibrium u, equilibrium_fixed u hu, ?_⟩
  intro f hf
  have he : equilibrium u = hc.fixedPoint (transition u) :=
    hc.fixedPoint_unique (equilibrium_fixed u hu)
  exact (hc.fixedPoint_unique hf).trans he.symm

def constantsEmbedding : ℝ →ₗᵢ[ℝ] H where
  toFun r := r • one
  map_add' a b := add_smul a b one
  map_smul' a b := by simp [smul_smul]
  norm_map' r := by
    change ‖r • one‖ = ‖r‖
    rw [norm_smul, norm_one, mul_one]

theorem constants_embedding_eq (r : ℝ) : constantsEmbedding r = affine 0 r := by
  change r • affine 0 1 = affine 0 r
  simpa only [mul_zero, mul_one] using affine_smul r 0 1

def constants : Set H := Set.range (affine 0)

theorem constants_closed : IsClosed constants := by
  have heq : constants = Set.range constantsEmbedding := by
    ext f
    simp only [constants, mem_range, constants_embedding_eq]
  rw [heq]
  exact constantsEmbedding.isometry.isClosedEmbedding.isClosed_range

theorem equilibrium_distance (u : ℝ) : Metric.infDist (equilibrium u) constants = gap := by
  have hn : constants.Nonempty := ⟨affine 0 0, 0, rfl⟩
  apply le_antisymm
  · calc
      _ ≤ dist (equilibrium u) (affine 0 (1 / 24 + 4 * u / 3 + 1 / 8)) :=
        Metric.infDist_le_dist_of_mem
          (show affine 0 (1 / 24 + 4 * u / 3 + 1 / 8) ∈ constants from ⟨_, rfl⟩)
      _ = gap := by rw [dist_eq_norm]; exact optimal_constant _
  · apply (Metric.le_infDist hn).mpr
    rintro f ⟨c, rfl⟩
    simpa only [equilibrium, dist_eq_norm] using positive_separation (1 / 24 + 4 * u / 3) c

theorem forcing_uniformContinuous : UniformContinuous forcing := by
  have heq : forcing = (fun u : ℝ => affine (1 / 4) 0 + constantsEmbedding u) := by
    funext u
    rw [constants_embedding_eq, affine_add]
    simp [forcing]
  rw [heq]
  exact uniformContinuous_const.add constantsEmbedding.isometry.uniformContinuous

theorem h5_positive_family (u : ℝ) (hu : u ∈ Icc (0 : ℝ) (1 / 4)) (c : ℝ) :
    transition u (affine 0 c) ≠ affine 0 c := by
  intro hf
  have heq : affine 0 c = equilibrium u :=
    (transition_unique u hu).unique hf (equilibrium_fixed u hu)
  exact nonconstant (1 / 24 + 4 * u / 3) c heq.symm

/-- The positive side of prop:h5-not-derived on the source L2 domain. -/
theorem positive_family_certificate :
    CompleteSpace H ∧ box.Nonempty ∧ IsClosed box ∧ Convex ℝ box ∧
    ‖meanOperator‖ < 1 ∧ UniformContinuous forcing ∧
    IsCompact (Icc (0 : ℝ) (1 / 4)) ∧ (Icc (0 : ℝ) (1 / 4)).Nonempty ∧
    ∀ u ∈ Icc (0 : ℝ) (1 / 4),
      (∃! f : H, transition u f = f) ∧
      (∀ c : ℝ, transition u (affine 0 c) ≠ affine 0 c) ∧
      Metric.infDist (equilibrium u) constants = 1 / (4 * Real.sqrt 12) := by
  refine ⟨inferInstance, box_nonempty, box_closed, box_convex, ?_,
    forcing_uniformContinuous, isCompact_Icc, ⟨0, by norm_num⟩, ?_⟩
  · rw [mean_operator_norm]; norm_num
  · intro u hu
    exact ⟨transition_unique u hu, h5_positive_family u hu, equilibrium_distance u⟩

end
end QICNLean.L2PositiveWitness
