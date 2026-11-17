import QICNLean.QICNL2PositiveWitness

/-!
The source affine anti-collapse ball centered at sin(2*pi*s) in actual L2.
Orthogonality, nonzero norm and avoidance of the closed constant subspace are
proved from integrals, not supplied as a surrogate hypothesis.
-/
namespace QICNLean.L2SineBall

open MeasureTheory Set QICNLean.L2PositiveWitness
noncomputable section

lemma sine_memLp : MemLp (fun s : ℝ => Real.sin (2 * Real.pi * s)) 2 μ := by
  apply MemLp.of_bound (by fun_prop) 1
  exact ae_of_all _ (fun s => by simpa only [Real.norm_eq_abs] using Real.abs_sin_le_one _)

def sineProfile : H := sine_memLp.toLp (fun s => Real.sin (2 * Real.pi * s))

theorem sine_ae : sineProfile =ᵐ[μ] (fun s : ℝ => Real.sin (2 * Real.pi * s)) :=
  sine_memLp.coeFn_toLp

theorem integral_sine_zero : (∫ s : ℝ, Real.sin (2 * Real.pi * s) ∂μ) = 0 := by
  change (∫ s in Icc (0 : ℝ) 1, Real.sin (2 * Real.pi * s)) = 0
  rw [integral_Icc_eq_integral_Ioc, ← intervalIntegral.integral_of_le (by norm_num : (0 : ℝ) ≤ 1)]
  have hh := intervalIntegral.mul_integral_comp_mul_left (f := Real.sin)
    (a := (0 : ℝ)) (b := 1) (2 * Real.pi)
  simp only [mul_zero, mul_one, integral_sin, Real.cos_zero, Real.cos_two_pi, sub_self] at hh
  exact (mul_eq_zero.mp hh).resolve_left (by positivity)

theorem integral_sine_square :
    (∫ s : ℝ, Real.sin (2 * Real.pi * s) ^ 2 ∂μ) = 1 / 2 := by
  change (∫ s in Icc (0 : ℝ) 1, Real.sin (2 * Real.pi * s) ^ 2) = 1 / 2
  rw [integral_Icc_eq_integral_Ioc, ← intervalIntegral.integral_of_le (by norm_num : (0 : ℝ) ≤ 1)]
  have hh := intervalIntegral.mul_integral_comp_mul_left (f := fun t => Real.sin t ^ 2)
    (a := (0 : ℝ)) (b := 1) (2 * Real.pi)
  simp only [mul_zero, mul_one, integral_sin_sq, Real.sin_zero, Real.sin_two_pi,
    Real.cos_zero, Real.cos_two_pi, sub_zero, zero_add] at hh
  nlinarith [Real.pi_pos]

theorem orthogonal_constants (c : ℝ) : inner ℝ sineProfile (affine 0 c) = 0 := by
  rw [L2.inner_def]
  have heq : (fun s => inner ℝ (sineProfile s) (affine 0 c s)) =ᵐ[μ]
      (fun s : ℝ => c * Real.sin (2 * Real.pi * s)) := by
    filter_upwards [sine_ae, affine_ae 0 c] with s hs hc
    rw [hs, hc]
    simp
  rw [integral_congr_ae heq, integral_const_mul, integral_sine_zero, mul_zero]

theorem sine_norm_sq : ‖sineProfile‖ ^ 2 = (1 / 2 : ℝ) := by
  rw [← real_inner_self_eq_norm_sq, L2.inner_def]
  have heq : (fun s => inner ℝ (sineProfile s) (sineProfile s)) =ᵐ[μ]
      (fun s : ℝ => Real.sin (2 * Real.pi * s) ^ 2) := by
    filter_upwards [sine_ae] with s hs
    rw [hs]
    simp [pow_two]
  rw [integral_congr_ae heq, integral_sine_square]

theorem sine_norm_pos : 0 < ‖sineProfile‖ := by
  nlinarith [sine_norm_sq, norm_nonneg sineProfile]

def witnessSet (r : ℝ) : Set H := Metric.closedBall sineProfile r

theorem norm_distance_constant (c : ℝ) : ‖sineProfile‖ ≤ ‖sineProfile - affine 0 c‖ := by
  have hh := norm_sub_sq_real sineProfile (affine 0 c)
  rw [orthogonal_constants] at hh
  nlinarith [norm_nonneg sineProfile, norm_nonneg (sineProfile - affine 0 c),
    sq_nonneg ‖affine 0 c‖]

theorem witness_set_disjoint_constants (r : ℝ) (hr : r < ‖sineProfile‖) :
    Disjoint (witnessSet r) constants := by
  apply Set.disjoint_left.mpr
  rintro z hz ⟨c, rfl⟩
  have hupper : ‖sineProfile - affine 0 c‖ ≤ r := by
    simpa only [witnessSet, Metric.mem_closedBall, dist_eq_norm, norm_sub_rev] using hz
  exact (not_le_of_gt hr) ((norm_distance_constant c).trans hupper)

theorem witness_inter_constants_empty (r : ℝ) (hr : r < ‖sineProfile‖) :
    witnessSet r ∩ constants = ∅ :=
  Set.disjoint_iff_inter_eq_empty.mp (witness_set_disjoint_constants r hr)

theorem witness_set_eq_translate (r : ℝ) :
    witnessSet r = {z | ∃ g : H, ‖g‖ ≤ r ∧ z = sineProfile + g} := by
  ext z
  constructor
  · intro hz
    refine ⟨z - sineProfile, ?_, ?_⟩
    · simpa only [witnessSet, Metric.mem_closedBall, dist_eq_norm] using hz
    · abel
  · rintro ⟨g, hg, rfl⟩
    simpa [witnessSet, Metric.mem_closedBall, dist_eq_norm] using hg

theorem witness_nonempty (r : ℝ) (hr : 0 ≤ r) : (witnessSet r).Nonempty :=
  ⟨sineProfile, by simpa [witnessSet] using hr⟩

theorem witness_closed (r : ℝ) : IsClosed (witnessSet r) := Metric.isClosed_closedBall

theorem witness_convex (r : ℝ) : Convex ℝ (witnessSet r) := convex_closedBall _ _

def ballK (β : ℝ) : H →L[ℝ] H := β • ContinuousLinearMap.id ℝ H

theorem ballK_norm_le (β : ℝ) (hβ : 0 ≤ β) : ‖ballK β‖ ≤ β := by
  unfold ballK
  rw [norm_smul, Real.norm_eq_abs, abs_of_nonneg hβ]
  exact (mul_le_mul_of_nonneg_left (ContinuousLinearMap.norm_id_le (𝕜 := ℝ) (E := H)) hβ).trans_eq
    (mul_one β)

def ballForcing (u : ℝ) : H := (u / 4) • sineProfile

theorem ball_forcing_uniformContinuous : UniformContinuous ballForcing := by
  let L : ℝ →L[ℝ] H := (1 / 4 : ℝ) • (ContinuousLinearMap.id ℝ ℝ).smulRight sineProfile
  have heq : ballForcing = (fun u => L u) := by
    funext u
    simp only [ballForcing, L, smul_apply, ContinuousLinearMap.smulRight_apply,
      ContinuousLinearMap.id_apply, smul_smul]
    congr 1
    ring
  rw [heq]
  exact L.uniformContinuous

def ballTransition (r : ℝ) (hr : 0 ≤ r) (β u : ℝ) : H → H :=
  projectedAffineMap (witnessSet r) (witness_nonempty r hr) (witness_closed r).isComplete
    (witness_convex r) (ballK β) (ballForcing u)

theorem ball_h5 (r : ℝ) (hr : 0 ≤ r) (hgap : r < ‖sineProfile‖)
    (β u c : ℝ) : ballTransition r hr β u (affine 0 c) ≠ affine 0 c := by
  intro hfix
  have hmem := convexProjection_mem (witness_nonempty r hr) (witness_closed r).isComplete
    (witness_convex r) (ballK β (affine 0 c) + ballForcing u)
  change ballTransition r hr β u (affine 0 c) ∈ witnessSet r at hmem
  rw [hfix] at hmem
  exact Set.disjoint_left.mp (witness_set_disjoint_constants r hgap) hmem ⟨c, rfl⟩

theorem separate_h5_witness (r β : ℝ) (hr : 0 < r) (hgap : r < ‖sineProfile‖)
    (hβ : 0 < β) (hβhalf : β < 1 / 2) :
    CompleteSpace H ∧ (witnessSet r).Nonempty ∧ IsClosed (witnessSet r) ∧
    Convex ℝ (witnessSet r) ∧ ‖ballK β‖ < 1 ∧ UniformContinuous ballForcing ∧
    IsCompact (Icc (0 : ℝ) 1) ∧ (Icc (0 : ℝ) 1).Nonempty ∧
    ∀ u ∈ Icc (0 : ℝ) 1,
      (∃! f : H, ballTransition r hr.le β u f = f) ∧
      ∀ c : ℝ, ballTransition r hr.le β u (affine 0 c) ≠ affine 0 c := by
  have hnorm : ‖ballK β‖ < 1 := (ballK_norm_le β hβ.le).trans_lt (by linarith)
  refine ⟨inferInstance, witness_nonempty r hr.le, witness_closed r, witness_convex r,
    hnorm, ball_forcing_uniformContinuous, isCompact_Icc, ⟨0, by norm_num⟩, ?_⟩
  intro u _
  exact ⟨ParametricContraction.closed_projected_affine_unique (witnessSet r)
    (witness_nonempty r hr.le) (witness_closed r) (witness_convex r) (ballK β) hnorm
    (ballForcing u), ball_h5 r hr.le hgap β u⟩

end
end QICNLean.L2SineBall
