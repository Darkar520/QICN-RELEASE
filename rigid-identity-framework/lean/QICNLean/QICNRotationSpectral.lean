import QICNLean.QICNSCoupledInstance
import Mathlib.Analysis.Complex.Basic
import Mathlib.Tactic.FieldSimp
import Mathlib.Tactic.Ring

/-!
# Exact spectral obstruction for the coupled carrier

This non-canonical file proves the exact linear obstruction used by the coupled
S-instance report: multiplication on the real plane `C` by a non-real complex
scalar has no nontrivial invariant real line.

It does not prove a positive approximate-factorization margin, so it does not
close `Iint` or `Crit_op`.
-/

namespace QICNLean

noncomputable section

/-- Multiplication by a complex scalar, viewed as a real continuous linear map. -/
def complexMulCLM (c : ℂ) : ℂ →L[ℝ] ℂ :=
  (LinearMap.mulLeft ℝ c).toContinuousLinearMap

/-- The concrete rotation-contraction scalar: `(1/4) * (cos(pi/3)+i sin(pi/3))`. -/
def rotationContractionScalar : ℂ :=
  ⟨(1 / 8 : ℝ), Real.sqrt 3 / 8⟩

/-- The concrete rotation-contraction linear part on `C` as a real plane. -/
def rotationContractionK : ℂ →L[ℝ] ℂ :=
  complexMulCLM rotationContractionScalar

lemma rotationContractionScalar_im_ne_zero : rotationContractionScalar.im ≠ 0 := by
  simp [rotationContractionScalar]

lemma complex_mul_mem_of_invariant
    (c : ℂ) (L : Submodule ℝ ℂ)
    (hInv : ∀ x ∈ L, complexMulCLM c x ∈ L) :
    ∀ x ∈ L, c * x ∈ L := by
  intro x hx
  simpa [complexMulCLM] using hInv x hx

lemma I_mul_mem_of_nonreal_invariant
    (c : ℂ) (hc : c.im ≠ 0) (L : Submodule ℝ ℂ)
    (hInv : ∀ x ∈ L, complexMulCLM c x ∈ L) :
    ∀ x ∈ L, Complex.I * x ∈ L := by
  intro x hx
  have hcx : c * x ∈ L := complex_mul_mem_of_invariant c L hInv x hx
  have hrex : ((c.re : ℝ) • x : ℂ) ∈ L := L.smul_mem (c.re : ℝ) hx
  have hdiff : c * x - (c.re : ℝ) • x ∈ L := L.sub_mem hcx hrex
  have hscale : ((c.im : ℝ) • (Complex.I * x) : ℂ) = c * x - (c.re : ℝ) • x := by
    apply Complex.ext <;> simp [Complex.mul_re, Complex.mul_im, sub_eq_add_neg, mul_comm,
      mul_left_comm]
  have him : (c.im : ℝ) ≠ 0 := hc
  have hmem : ((c.im : ℝ) • (Complex.I * x) : ℂ) ∈ L := by
    simpa [hscale] using hdiff
  have hrescaled := L.smul_mem (c.im)⁻¹ hmem
  rw [smul_smul, inv_mul_cancel₀ him, one_smul] at hrescaled
  exact hrescaled

lemma submodule_eq_top_of_nonzero_and_I_invariant
    (L : Submodule ℝ ℂ) (w : ℂ) (hwL : w ∈ L) (hw : w ≠ 0)
    (hI : ∀ x ∈ L, Complex.I * x ∈ L) :
    L = ⊤ := by
  classical
  have hwI : Complex.I * w ∈ L := hI w hwL
  have hnorm_ne : Complex.normSq w ≠ 0 := by
    exact mt Complex.normSq_eq_zero.mp hw
  have hone : (1 : ℂ) ∈ L := by
    have hcomb :
        ((w.re / Complex.normSq w : ℝ) • w
          + ((-w.im) / Complex.normSq w : ℝ) • (Complex.I * w) : ℂ) = 1 := by
      apply Complex.ext
      · simp [Complex.add_re, Complex.one_re]
        field_simp [Complex.normSq, hnorm_ne]
        rw [Complex.normSq_apply]
        ring_nf
      · simp [Complex.add_im, Complex.one_im]
        field_simp [Complex.normSq, hnorm_ne]
        ring_nf
    rw [← hcomb]
    exact L.add_mem
      (L.smul_mem (w.re / Complex.normSq w : ℝ) hwL)
      (L.smul_mem ((-w.im) / Complex.normSq w : ℝ) hwI)
  have hI_mem : (Complex.I : ℂ) ∈ L := by
    have hcomb :
        ((w.im / Complex.normSq w : ℝ) • w
          + (w.re / Complex.normSq w : ℝ) • (Complex.I * w) : ℂ) = Complex.I := by
      apply Complex.ext
      · simp [Complex.add_re, Complex.I_re]
        field_simp [Complex.normSq, hnorm_ne]
        ring_nf
      · simp [Complex.add_im, Complex.I_im]
        field_simp [Complex.normSq, hnorm_ne]
        rw [Complex.normSq_apply]
        ring_nf
    rw [← hcomb]
    exact L.add_mem
      (L.smul_mem (w.im / Complex.normSq w : ℝ) hwL)
      (L.smul_mem (w.re / Complex.normSq w : ℝ) hwI)
  refine eq_top_iff.mpr ?_
  intro z _hz
  have hzdecomp : z = (z.re : ℝ) • (1 : ℂ) + (z.im : ℝ) • Complex.I := by
    apply Complex.ext <;> simp
  rw [hzdecomp]
  exact L.add_mem (L.smul_mem z.re hone) (L.smul_mem z.im hI_mem)

/--
Multiplication by any non-real complex scalar has no nontrivial invariant real
subspace in the real two-plane `C`.
-/
theorem complex_mul_no_nontrivial_invariant_real_subspace
    (c : ℂ) (hc : c.im ≠ 0) :
    NoNontrivialInvariantRealSubspace (complexMulCLM c) := by
  intro L hbot htop hInv
  have hNonempty : ∃ w : ℂ, w ∈ L ∧ w ≠ 0 := by
    by_contra h
    apply hbot
    ext z
    constructor
    · intro hz
      by_contra hz0
      exact h ⟨z, hz, hz0⟩
    · intro hz
      rw [Submodule.mem_bot] at hz
      rw [hz]
      exact L.zero_mem
  rcases hNonempty with ⟨w, hwL, hw⟩
  have hI : ∀ x ∈ L, Complex.I * x ∈ L :=
    I_mul_mem_of_nonreal_invariant c hc L hInv
  exact htop (submodule_eq_top_of_nonzero_and_I_invariant L w hwL hw hI)

/--
The concrete rotation-contraction block has no nontrivial invariant real line.
This blocks exact real-linear product splittings of the linear part only; it
does not establish the positive approximate margin required for `Iint`.
-/
theorem rotation_contraction_no_invariant_line :
    NoNontrivialInvariantRealSubspace rotationContractionK := by
  simpa [rotationContractionK] using
    complex_mul_no_nontrivial_invariant_real_subspace
      rotationContractionScalar rotationContractionScalar_im_ne_zero

end

end QICNLean
