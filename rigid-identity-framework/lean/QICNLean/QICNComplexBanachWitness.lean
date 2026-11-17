import QICNLean.QICNTypedBanachWitness

/-!
The infinite-dimensional complex continuous-function space used for the
complexified spectral calculation. Establishing that the concrete maps extend
the real derivatives is a separate obligation, not assumed by these definitions.
-/
namespace QICNLean.ComplexBanachWitness

open MeasureTheory
open scoped unitInterval
noncomputable section

abbrev E := EuclideanSpace ℂ (Fin 2)
abbrev B := C(unitInterval, E)

def e1 : E := EuclideanSpace.single 0 1
def e2 : E := EuclideanSpace.single 1 1

theorem norm_e1 : ‖e1‖ = 1 := by simp [e1, PiLp.norm_single]
theorem norm_e2 : ‖e2‖ = 1 := by simp [e2, PiLp.norm_single]

def jLinear : E →ₗ[ℂ] B where
  toFun := ContinuousMap.const unitInterval
  map_add' _ _ := by ext; rfl
  map_smul' _ _ := by ext; rfl

theorem norm_constant (v : E) : ‖ContinuousMap.const unitInterval v‖ = ‖v‖ := by
  apply le_antisymm
  · exact (ContinuousMap.norm_le _ (norm_nonneg v)).mpr (fun _ => le_rfl)
  · exact (ContinuousMap.const unitInterval v).norm_coe_le_norm 0

def j : E →L[ℂ] B := jLinear.mkContinuous 1 (fun v => by
  change ‖ContinuousMap.const unitInterval v‖ ≤ 1 * ‖v‖
  rw [one_mul]
  exact (norm_constant v).le)

@[simp] theorem j_apply (v : E) (x : unitInterval) : j v x = v := rfl
theorem j_norm (v : E) : ‖j v‖ = ‖v‖ := norm_constant v

def average : B →L[ℂ] E :=
  (L1.integralCLM' ℂ).comp (ContinuousMap.toLp 1 volume ℂ)

theorem average_apply (f : B) : average f = ∫ x : unitInterval, f x := by
  change L1.integralCLM' ℂ ((ContinuousMap.toLp 1 volume ℂ) f) = _
  rw [← L1.integral_eq' ℂ, L1.integral_eq_integral]
  exact integral_congr_ae (f.coeFn_toLp (p := 1) (𝕜 := ℂ) volume)

@[simp] theorem average_j (v : E) : average (j v) = v := by
  rw [average_apply]
  simp

def meanProjection : B →L[ℂ] B := j.comp average
def perpendicular : E →L[ℂ] E := InnerProductSpace.rankOne ℂ e2 e2
def transverseProjection : B →L[ℂ] B := j.comp (perpendicular.comp average)

theorem mean_projection_idempotent : IsIdempotentElem meanProjection := by
  change meanProjection * meanProjection = meanProjection
  apply ContinuousLinearMap.ext
  intro f
  simp [meanProjection, ContinuousLinearMap.mul_apply, ContinuousLinearMap.comp_apply]

theorem perpendicular_apply (v : E) (i : Fin 2) :
    perpendicular v i = if i = 1 then v 1 else 0 := by
  simp [perpendicular, InnerProductSpace.rankOne_apply, e2,
    EuclideanSpace.inner_single_left, PiLp.single_apply]

theorem perpendicular_idempotent : IsIdempotentElem perpendicular := by
  change perpendicular * perpendicular = perpendicular
  ext v i
  simp [ContinuousLinearMap.mul_apply, perpendicular_apply]

theorem transverse_projection_idempotent : IsIdempotentElem transverseProjection := by
  change transverseProjection * transverseProjection = transverseProjection
  apply ContinuousLinearMap.ext
  intro f
  have hp (v : E) : perpendicular (perpendicular v) = perpendicular v :=
    DFunLike.congr_fun perpendicular_idempotent.eq v
  simp [transverseProjection, ContinuousLinearMap.mul_apply,
    ContinuousLinearMap.comp_apply, hp]

end
end QICNLean.ComplexBanachWitness
