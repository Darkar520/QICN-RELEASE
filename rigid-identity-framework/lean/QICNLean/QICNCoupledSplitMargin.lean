import QICNLean.QICNRotationSpectral
import Mathlib.Analysis.Complex.Norm
import Mathlib.Tactic.FieldSimp
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Positivity
import Mathlib.Tactic.Ring

/-!
# Split-readout positive-margin kernel for the coupled carrier

This non-canonical file mechanizes only the quantitative algebraic kernel used
in `QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md`.

It proves that the two coordinate fibers are thin for the concrete coupled
scalar `rotationContractionScalar = (1/8) + (sqrt 3 / 8)i`, and packages the
corner-chain arithmetic that turns a fiber bound into the reported
`sqrt(7)/14` lower bound.

It does not quantify over all `D*` factorizations, does not choose the
canonical factorization class, and does not close `Iint` or `Crit_op`.
-/

namespace QICNLean

noncomputable section

private lemma abs_le_two_mul_sq
    {x ε : ℝ} (hε : 0 ≤ ε) (hx : |x| ≤ 2 * ε) :
    x ^ 2 ≤ (2 * ε) ^ 2 := by
  have hx_abs_nonneg : 0 ≤ |x| := abs_nonneg x
  have htwo_nonneg : 0 ≤ 2 * ε := by positivity
  have hx_sq : |x| ^ 2 ≤ (2 * ε) ^ 2 :=
    (sq_le_sq₀ hx_abs_nonneg htwo_nonneg).mpr hx
  simpa [sq_abs] using hx_sq

private lemma psi1_im_abs_bound
    {z : ℂ} {ε : ℝ} (_hε : 0 ≤ ε)
    (hre : |z.re| ≤ 2 * ε)
    (hKre : |(rotationContractionScalar * z).re| ≤ 2 * ε) :
    |z.im| ≤ (6 * Real.sqrt 3) * ε := by
  have hbpos : 0 < Real.sqrt 3 / 8 := by positivity
  have hrepr :
      (rotationContractionScalar * z).re =
        (1 / 8 : ℝ) * z.re - (Real.sqrt 3 / 8) * z.im := by
    simp [rotationContractionScalar, Complex.mul_re]
  have hlin :
      |(Real.sqrt 3 / 8) * z.im|
        ≤ |(rotationContractionScalar * z).re| + |(1 / 8 : ℝ) * z.re| := by
    calc
      |(Real.sqrt 3 / 8) * z.im|
          = |(1 / 8 : ℝ) * z.re - (rotationContractionScalar * z).re| := by
            rw [hrepr]
            ring_nf
      _ ≤ |(1 / 8 : ℝ) * z.re| + |(rotationContractionScalar * z).re| :=
            by
              simpa only [sub_zero, zero_sub, abs_neg] using
                abs_sub_le ((1 / 8 : ℝ) * z.re) (0 : ℝ)
                  ((rotationContractionScalar * z).re)
      _ = |(rotationContractionScalar * z).re| + |(1 / 8 : ℝ) * z.re| := by
            rw [add_comm]
  have hsmall : |(1 / 8 : ℝ) * z.re| ≤ (1 / 8 : ℝ) * (2 * ε) := by
    rw [abs_mul, abs_of_nonneg (by positivity : 0 ≤ (1 / 8 : ℝ))]
    exact mul_le_mul_of_nonneg_left hre (by positivity)
  have hsum :
      |(Real.sqrt 3 / 8) * z.im| ≤ (2 * ε) + ((1 / 8 : ℝ) * (2 * ε)) := by
    nlinarith
  have hscale :
      |(Real.sqrt 3 / 8) * z.im| = (Real.sqrt 3 / 8) * |z.im| := by
    rw [abs_mul, abs_of_pos hbpos]
  rw [hscale] at hsum
  have hsum' : |z.im| * (Real.sqrt 3 / 8) ≤ (2 * ε) + ((1 / 8 : ℝ) * (2 * ε)) := by
    simpa [mul_comm] using hsum
  have hdiv := (le_div_iff₀ hbpos).mpr hsum'
  calc
    |z.im| ≤ ((2 * ε) + ((1 / 8 : ℝ) * (2 * ε))) / (Real.sqrt 3 / 8) := hdiv
    _ = (6 * Real.sqrt 3) * ε := by
      field_simp [ne_of_gt (Real.sqrt_pos_of_pos (by norm_num : (0 : ℝ) < 3))]
      rw [Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 3)]
      ring

private lemma psi2_re_abs_bound
    {z : ℂ} {ε : ℝ} (_hε : 0 ≤ ε)
    (him : |z.im| ≤ 2 * ε)
    (hKim : |(rotationContractionScalar * z).im| ≤ 2 * ε) :
    |z.re| ≤ (6 * Real.sqrt 3) * ε := by
  have hbpos : 0 < Real.sqrt 3 / 8 := by positivity
  have himpr :
      (rotationContractionScalar * z).im =
        (Real.sqrt 3 / 8) * z.re + (1 / 8 : ℝ) * z.im := by
    simp [rotationContractionScalar, Complex.mul_im]
    ring
  have hlin :
      |(Real.sqrt 3 / 8) * z.re|
        ≤ |(rotationContractionScalar * z).im| + |(1 / 8 : ℝ) * z.im| := by
    calc
      |(Real.sqrt 3 / 8) * z.re|
          = |(rotationContractionScalar * z).im - (1 / 8 : ℝ) * z.im| := by
            rw [himpr]
            ring_nf
      _ ≤ |(rotationContractionScalar * z).im| + |(1 / 8 : ℝ) * z.im| :=
            by
              simpa only [sub_zero, zero_sub, abs_neg] using
                abs_sub_le ((rotationContractionScalar * z).im) (0 : ℝ)
                  ((1 / 8 : ℝ) * z.im)
  have hsmall : |(1 / 8 : ℝ) * z.im| ≤ (1 / 8 : ℝ) * (2 * ε) := by
    rw [abs_mul, abs_of_nonneg (by positivity : 0 ≤ (1 / 8 : ℝ))]
    exact mul_le_mul_of_nonneg_left him (by positivity)
  have hsum :
      |(Real.sqrt 3 / 8) * z.re| ≤ (2 * ε) + ((1 / 8 : ℝ) * (2 * ε)) := by
    nlinarith
  have hscale :
      |(Real.sqrt 3 / 8) * z.re| = (Real.sqrt 3 / 8) * |z.re| := by
    rw [abs_mul, abs_of_pos hbpos]
  rw [hscale] at hsum
  have hsum' : |z.re| * (Real.sqrt 3 / 8) ≤ (2 * ε) + ((1 / 8 : ℝ) * (2 * ε)) := by
    simpa [mul_comm] using hsum
  have hdiv := (le_div_iff₀ hbpos).mpr hsum'
  calc
    |z.re| ≤ ((2 * ε) + ((1 / 8 : ℝ) * (2 * ε))) / (Real.sqrt 3 / 8) := hdiv
    _ = (6 * Real.sqrt 3) * ε := by
      field_simp [ne_of_gt (Real.sqrt_pos_of_pos (by norm_num : (0 : ℝ) < 3))]
      rw [Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 3)]
      ring

private lemma complex_norm_le_of_coordinate_bounds
    {z : ℂ} {ε : ℝ} (hε : 0 ≤ ε)
    (hre : |z.re| ≤ 2 * ε)
    (him : |z.im| ≤ (6 * Real.sqrt 3) * ε) :
    ‖z‖ ≤ (4 * Real.sqrt 7) * ε := by
  have hre_sq : z.re ^ 2 ≤ (2 * ε) ^ 2 :=
    abs_le_two_mul_sq hε hre
  have him_sq : z.im ^ 2 ≤ ((6 * Real.sqrt 3) * ε) ^ 2 := by
    have him_abs_nonneg : 0 ≤ |z.im| := abs_nonneg z.im
    have hbound_nonneg : 0 ≤ (6 * Real.sqrt 3) * ε := by positivity
    have him_sq_abs : |z.im| ^ 2 ≤ ((6 * Real.sqrt 3) * ε) ^ 2 :=
      (sq_le_sq₀ him_abs_nonneg hbound_nonneg).mpr him
    simpa [sq_abs] using him_sq_abs
  have hnorm_sq :
      ‖z‖ ^ 2 ≤ ((4 * Real.sqrt 7) * ε) ^ 2 := by
    rw [← Complex.normSq_eq_norm_sq, Complex.normSq_apply]
    have hs3 : (Real.sqrt 3) ^ 2 = (3 : ℝ) := by
      exact Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 3)
    have hs7 : (Real.sqrt 7) ^ 2 = (7 : ℝ) := by
      exact Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 7)
    nlinarith
  exact (sq_le_sq₀ (norm_nonneg z) (by positivity)).mp hnorm_sq

private lemma complex_norm_le_of_coordinate_bounds_swapped
    {z : ℂ} {ε : ℝ} (hε : 0 ≤ ε)
    (hre : |z.re| ≤ (6 * Real.sqrt 3) * ε)
    (him : |z.im| ≤ 2 * ε) :
    ‖z‖ ≤ (4 * Real.sqrt 7) * ε := by
  have hre_sq : z.re ^ 2 ≤ ((6 * Real.sqrt 3) * ε) ^ 2 := by
    have hre_abs_nonneg : 0 ≤ |z.re| := abs_nonneg z.re
    have hbound_nonneg : 0 ≤ (6 * Real.sqrt 3) * ε := by positivity
    have hre_sq_abs : |z.re| ^ 2 ≤ ((6 * Real.sqrt 3) * ε) ^ 2 :=
      (sq_le_sq₀ hre_abs_nonneg hbound_nonneg).mpr hre
    simpa [sq_abs] using hre_sq_abs
  have him_sq : z.im ^ 2 ≤ (2 * ε) ^ 2 :=
    abs_le_two_mul_sq hε him
  have hnorm_sq :
      ‖z‖ ^ 2 ≤ ((4 * Real.sqrt 7) * ε) ^ 2 := by
    rw [← Complex.normSq_eq_norm_sq, Complex.normSq_apply]
    have hs3 : (Real.sqrt 3) ^ 2 = (3 : ℝ) := by
      exact Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 3)
    have hs7 : (Real.sqrt 7) ^ 2 = (7 : ℝ) := by
      exact Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 7)
    nlinarith
  exact (sq_le_sq₀ (norm_nonneg z) (by positivity)).mp hnorm_sq

/--
The `psi_1` fiber-thinness kernel: if both the real coordinate and the real
coordinate after applying the coupled scalar are observed within `2ε`, then
the full complex displacement is bounded by `4 sqrt(7) ε`.
-/
theorem coupled_psi1_fiber_thin
    (z : ℂ) (ε : ℝ) (hε : 0 ≤ ε)
    (hre : |z.re| ≤ 2 * ε)
    (hKre : |(rotationContractionScalar * z).re| ≤ 2 * ε) :
    ‖z‖ ≤ (4 * Real.sqrt 7) * ε := by
  exact complex_norm_le_of_coordinate_bounds hε hre
    (psi1_im_abs_bound hε hre hKre)

/--
The `psi_2` fiber-thinness kernel: if both the imaginary coordinate and the
imaginary coordinate after applying the coupled scalar are observed within
`2ε`, then the full complex displacement is bounded by `4 sqrt(7) ε`.
-/
theorem coupled_psi2_fiber_thin
    (z : ℂ) (ε : ℝ) (hε : 0 ≤ ε)
    (him : |z.im| ≤ 2 * ε)
    (hKim : |(rotationContractionScalar * z).im| ≤ 2 * ε) :
    ‖z‖ ≤ (4 * Real.sqrt 7) * ε := by
  exact complex_norm_le_of_coordinate_bounds_swapped hε
    (psi2_re_abs_bound hε him hKim) him

/--
Corner-chain arithmetic for the split-readout margin.

The hypotheses encode the already-documented product/fiber consequences:
diameter is bounded by two fiber hops, each at most `4 sqrt(7) ε`. The theorem
then instantiates `diam = 4` and concludes the reported lower bound
`sqrt(7)/14 ≤ ε`.
-/
theorem coupled_split_readout_positive_margin
    (ε diam : ℝ) (_hε : 0 ≤ ε)
    (hdiam : diam = 4)
    (hchain : diam ≤ 2 * ((4 * Real.sqrt 7) * ε)) :
    Real.sqrt 7 / 14 ≤ ε := by
  have hsqrt7_pos : 0 < Real.sqrt 7 := by positivity
  have hmain : 4 ≤ (8 * Real.sqrt 7) * ε := by
    nlinarith
  have hmain' : 4 ≤ ε * (8 * Real.sqrt 7) := by
    simpa [mul_comm] using hmain
  have hdiv := (div_le_iff₀ (show 0 < 8 * Real.sqrt 7 by positivity)).mpr hmain'
  calc
    Real.sqrt 7 / 14 = 4 / (8 * Real.sqrt 7) := by
      field_simp [ne_of_gt (Real.sqrt_pos_of_pos (by norm_num : (0 : ℝ) < 7))]
      rw [Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 7)]
      ring
    _ ≤ ε := hdiv

end

end QICNLean
