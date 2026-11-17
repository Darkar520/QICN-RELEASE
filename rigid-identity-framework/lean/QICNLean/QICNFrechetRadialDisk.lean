import QICNLean.QICNTypedBanachWitness
import Mathlib.Analysis.InnerProductSpace.Calculus
import Mathlib.Analysis.Calculus.Deriv.Inv

/-!
Frechet derivatives of the actual radial Euclidean-disk projection, at regular
points. The boundary directional derivative is a separate proof obligation.
-/
namespace QICNLean.FrechetRadialDisk

open QICNLean.TypedBanachWitness Filter
open scoped Topology
noncomputable section

def normDerivative (x : E) : E →L[ℝ] ℝ := ‖x‖⁻¹ • innerSL ℝ x

theorem norm_hasFDerivAt (x : E) (hx : x ≠ 0) :
    HasFDerivAt (fun y : E => ‖y‖) (normDerivative x) x := by
  have hnorm : ‖x‖ ≠ 0 := norm_ne_zero_iff.mpr hx
  have hh := (hasStrictFDerivAt_norm_sq x).hasFDerivAt.sqrt (pow_ne_zero 2 hnorm)
  have hs : (fun y : E => Real.sqrt (‖y‖ ^ 2)) = (fun y : E => ‖y‖) := by
    funext y
    exact Real.sqrt_sq (norm_nonneg y)
  rw [hs] at hh
  have hd : (1 / (2 * Real.sqrt (‖x‖ ^ 2))) • (2 • innerSL ℝ x) = normDerivative x := by
    rw [Real.sqrt_sq (norm_nonneg x)]
    unfold normDerivative
    ext v
    simp only [two_smul, smul_apply, add_apply]
    change (1 / (2 * ‖x‖)) * (inner ℝ x v + inner ℝ x v) = ‖x‖⁻¹ * inner ℝ x v
    field_simp
    ring
  rw [hd] at hh
  exact hh

def normalizedDerivative (x : E) : E →L[ℝ] E :=
  ‖x‖⁻¹ • ContinuousLinearMap.id ℝ E +
    (-(‖x‖ ^ 2)⁻¹ • normDerivative x).smulRight x

theorem normalized_hasFDerivAt (x : E) (hx : x ≠ 0) :
    HasFDerivAt (fun y : E => ‖y‖⁻¹ • y) (normalizedDerivative x) x := by
  have hi := (hasDerivAt_inv (norm_ne_zero_iff.mpr hx)).comp_hasFDerivAt x
    (norm_hasFDerivAt x hx)
  exact hi.smul (hasFDerivAt_id x)

theorem radial_interior_derivative (x : E) (hx : ‖x‖ < 1) :
    HasFDerivAt BaseSufficiency.radialDisk (ContinuousLinearMap.id ℝ E) x := by
  have heq : BaseSufficiency.radialDisk =ᶠ[𝓝 x] (fun y : E => y) := by
    filter_upwards [(isOpen_lt continuous_norm continuous_const).mem_nhds hx] with y hy
    simp [BaseSufficiency.radialDisk, hy.le]
  exact (hasFDerivAt_id x).congr_of_eventuallyEq heq

theorem radial_exterior_derivative (x : E) (hx : 1 < ‖x‖) :
    HasFDerivAt BaseSufficiency.radialDisk (normalizedDerivative x) x := by
  have heq : BaseSufficiency.radialDisk =ᶠ[𝓝 x] (fun y : E => ‖y‖⁻¹ • y) := by
    filter_upwards [(isOpen_lt continuous_const continuous_norm).mem_nhds hx] with y hy
    simp [BaseSufficiency.radialDisk, not_le_of_gt hy]
  exact (normalized_hasFDerivAt x (by intro h; norm_num [h] at hx)).congr_of_eventuallyEq heq

def affineInput (u : ℝ) (f : B) : E := (1 / 2 : ℝ) • average f + u • e1

theorem affine_input_derivative (u : ℝ) (f : B) :
    HasFDerivAt (affineInput u) ((1 / 2 : ℝ) • average) f :=
  (average.hasFDerivAt.const_smul (1 / 2 : ℝ)).add_const (u • e1)

theorem transition_interior_derivative (u : ℝ) (f : B) (hx : ‖affineInput u f‖ < 1) :
    HasFDerivAt (transition u) ((1 / 2 : ℝ) • j.comp average) f := by
  have hp := (radial_interior_derivative (affineInput u f) hx).comp f
    (affine_input_derivative u f)
  have hh := j.hasFDerivAt.comp f hp
  have heq : transition u =ᶠ[𝓝 f] (fun g => j (BaseSufficiency.radialDisk (affineInput u g))) :=
    Filter.Eventually.of_forall (fun g => transition_formula u g)
  have hr := hh.congr_of_eventuallyEq heq
  have hd : j.comp ((ContinuousLinearMap.id ℝ E).comp ((1 / 2 : ℝ) • average)) =
      (1 / 2 : ℝ) • j.comp average := by
    ext v
    simp [ContinuousLinearMap.comp_apply, map_smul]
  rw [hd] at hr
  exact hr

theorem transition_exterior_derivative (u : ℝ) (f : B) (hx : 1 < ‖affineInput u f‖) :
    HasFDerivAt (transition u)
      (j.comp ((normalizedDerivative (affineInput u f)).comp ((1 / 2 : ℝ) • average))) f := by
  have hp := (radial_exterior_derivative (affineInput u f) hx).comp f
    (affine_input_derivative u f)
  have hh := j.hasFDerivAt.comp f hp
  exact hh.congr_of_eventuallyEq (Filter.Eventually.of_forall (fun g => transition_formula u g))

end
end QICNLean.FrechetRadialDisk
