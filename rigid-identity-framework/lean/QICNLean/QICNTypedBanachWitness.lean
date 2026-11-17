import QICNLean.QICNBaseSufficiency
import Mathlib.MeasureTheory.Constructions.UnitInterval
import Mathlib.MeasureTheory.Function.LpSpace.ContinuousFunctions
import Mathlib.MeasureTheory.Integral.Bochner.Basic

/-!
The source Banach space C([0,1], Euclidean R2), actual Bochner averaging,
constant embedding and radial-disk transition. This is distinct from the
L2 nonconstant witness: its equilibria are constant by construction.
-/
namespace QICNLean.TypedBanachWitness

open MeasureTheory Set
open scoped unitInterval
noncomputable section

abbrev E := EuclideanSpace ℝ (Fin 2)
abbrev B := C(unitInterval, E)

def e1 : E := EuclideanSpace.single 0 1

theorem norm_e1 : ‖e1‖ = 1 := by simp [e1, PiLp.norm_single]

theorem norm_constant (v : E) : ‖ContinuousMap.const unitInterval v‖ = ‖v‖ := by
  apply le_antisymm
  · exact (ContinuousMap.norm_le _ (norm_nonneg v)).mpr (fun _ => le_rfl)
  · exact (ContinuousMap.const unitInterval v).norm_coe_le_norm 0

def jLinear : E →ₗ[ℝ] B where
  toFun := ContinuousMap.const unitInterval
  map_add' _ _ := by ext; rfl
  map_smul' _ _ := by ext; rfl

def j : E →L[ℝ] B := jLinear.mkContinuous 1 (fun v => by
  change ‖ContinuousMap.const unitInterval v‖ ≤ 1 * ‖v‖
  rw [one_mul]
  exact (norm_constant v).le)

@[simp] theorem j_apply (v : E) (x : unitInterval) : j v x = v := rfl

theorem j_norm (v : E) : ‖j v‖ = ‖v‖ := norm_constant v

def average : B →L[ℝ] E :=
  (L1.integralCLM' ℝ).comp (ContinuousMap.toLp 1 volume ℝ)

theorem average_apply (f : B) : average f = ∫ x : unitInterval, f x := by
  change L1.integralCLM' ℝ ((ContinuousMap.toLp 1 volume ℝ) f) = _
  rw [← L1.integral_eq' ℝ, L1.integral_eq_integral]
  exact integral_congr_ae (f.coeFn_toLp (p := 1) (𝕜 := ℝ) volume)

@[simp] theorem average_j (v : E) : average (j v) = v := by
  rw [average_apply]
  simp

theorem average_norm_le : ‖average‖ ≤ 1 := by
  have hmap :
      ‖(ContinuousMap.toLp 1 volume ℝ : B →L[ℝ] Lp E 1 (volume : Measure unitInterval))‖ ≤ 1 := by
    simpa [measureUnivNNReal] using (ContinuousMap.toLp_norm_le (α := unitInterval) (E := E)
      (p := 1) (μ := volume) (𝕜 := ℝ))
  have hint : ‖(L1.integralCLM' ℝ : Lp E 1 (volume : Measure unitInterval) →L[ℝ] E)‖ ≤ 1 :=
    L1.norm_Integral_le_one
  unfold average
  calc
    _ ≤ ‖(L1.integralCLM' ℝ : Lp E 1 (volume : Measure unitInterval) →L[ℝ] E)‖ *
        ‖(ContinuousMap.toLp 1 volume ℝ : B →L[ℝ] Lp E 1 (volume : Measure unitInterval))‖ :=
      ContinuousLinearMap.opNorm_comp_le _ _
    _ ≤ 1 * 1 := mul_le_mul hint hmap (norm_nonneg _) (by norm_num)
    _ = 1 := by norm_num

def liftedK : B →L[ℝ] B := (1 / 2 : ℝ) • (j.comp average)
def projection (f : B) : B := j (BaseSufficiency.radialDisk (average f))
def transition (u : ℝ) (f : B) : B := projection (liftedK f + j (u • e1))

theorem transition_formula (u : ℝ) (f : B) :
    transition u f = j (BaseSufficiency.radialDisk ((1 / 2 : ℝ) • average f + u • e1)) := by
  unfold transition projection
  have hk : liftedK f = (1 / 2 : ℝ) • j (average f) := rfl
  rw [hk, map_add average, map_smul average, average_j, average_j]

theorem j_norm_le : ‖j‖ ≤ 1 := by
  apply j.opNorm_le_bound (by norm_num)
  intro v
  rw [one_mul, j_norm]

theorem radial_axis (r : ℝ) (hr : 0 ≤ r) :
    BaseSufficiency.radialDisk (r • e1) = min r 1 • e1 := by
  by_cases h : r ≤ 1
  · simp [BaseSufficiency.radialDisk, norm_smul, norm_e1, Real.norm_eq_abs,
      abs_of_nonneg hr, h]
  · have hp : 0 < r := by linarith
    simp [BaseSufficiency.radialDisk, norm_smul, norm_e1, Real.norm_eq_abs,
      abs_of_nonneg hr, h, min_eq_right (le_of_not_ge h), smul_smul, ne_of_gt hp]

def equilibrium (u : ℝ) : B := j (min (2 * u) 1 • e1)

theorem equilibrium_fixed (u : ℝ) (hu : 0 ≤ u) : transition u (equilibrium u) = equilibrium u := by
  unfold equilibrium
  rw [transition_formula, average_j, smul_smul, ← add_smul]
  by_cases h : u ≤ 1 / 2
  · have hm : min (2 * u) 1 = 2 * u := min_eq_left (by linarith)
    rw [hm]
    have hc : (1 / 2 : ℝ) * (2 * u) + u = 2 * u := by ring
    rw [hc, radial_axis _ (by linarith), hm]
  · have hm : min (2 * u) 1 = 1 := min_eq_right (by linarith)
    rw [hm]
    have hp : 0 ≤ (1 / 2 : ℝ) * 1 + u := by linarith
    rw [radial_axis _ hp, min_eq_right (by linarith)]

theorem transition_norm_bound (u : ℝ) (f g : B) :
    ‖transition u f - transition u g‖ ≤ (1 / 2 : ℝ) * ‖f - g‖ := by
  rw [transition_formula, transition_formula, ← map_sub j, j_norm]
  calc
    _ ≤ ‖((1 / 2 : ℝ) • average f + u • e1) -
        ((1 / 2 : ℝ) • average g + u • e1)‖ :=
      BaseSufficiency.radialDisk_nonexpansive _ _
    _ = (1 / 2 : ℝ) * ‖average (f - g)‖ := by
      rw [add_sub_add_right_eq_sub, ← smul_sub, ← map_sub average, norm_smul]
      norm_num
    _ ≤ (1 / 2 : ℝ) * (‖average‖ * ‖f - g‖) :=
      mul_le_mul_of_nonneg_left (average.le_opNorm (f - g)) (by norm_num)
    _ ≤ (1 / 2 : ℝ) * (1 * ‖f - g‖) :=
      mul_le_mul_of_nonneg_left
        (mul_le_mul_of_nonneg_right average_norm_le (norm_nonneg _)) (by norm_num)
    _ = (1 / 2 : ℝ) * ‖f - g‖ := by rw [one_mul]

theorem transition_lipschitz (u : ℝ) : LipschitzWith (1 / 2) (transition u) := by
  apply LipschitzWith.of_dist_le_mul
  intro f g
  simpa only [dist_eq_norm, NNReal.coe_div, NNReal.coe_one, NNReal.coe_ofNat] using
    transition_norm_bound u f g

theorem transition_contracting (u : ℝ) : ContractingWith (1 / 2) (transition u) :=
  ⟨by norm_num, transition_lipschitz u⟩

theorem unique_equilibrium (u : ℝ) (hu : 0 ≤ u) : ∃! f : B, transition u f = f := by
  refine ⟨equilibrium u, equilibrium_fixed u hu, ?_⟩
  intro f hf
  exact (transition_contracting u).fixedPoint_unique' hf (equilibrium_fixed u hu)

theorem global_geometric_bound (u : ℝ) (hu : 0 ≤ u) (f : B) (n : ℕ) :
    ‖(transition u)^[n] f - equilibrium u‖ ≤ (1 / 2 : ℝ) ^ n * ‖f - equilibrium u‖ := by
  simpa only [dist_eq_norm, NNReal.coe_div, NNReal.coe_one, NNReal.coe_ofNat] using
    BaseSufficiency.geometric_iteration (transition_lipschitz u) (equilibrium u)
      (equilibrium_fixed u hu) f n

end
end QICNLean.TypedBanachWitness
