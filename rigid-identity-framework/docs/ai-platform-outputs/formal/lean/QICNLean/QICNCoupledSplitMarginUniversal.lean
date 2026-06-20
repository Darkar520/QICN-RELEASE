/-
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: SPECULATIVE / NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.

This file is an internal red-team artifact.  It is NOT external validation, NOT
peer review, and does NOT certify Iint or Crit_op.  See the companion analysis
docs/ai-platform-outputs/analysis/QICN_IINT_GLOBAL_QUANTIFIER_REDTEAM.md.
-/

import QICNLean.QICNCoupledSplitMargin
import Mathlib.Analysis.Complex.Norm
import Mathlib.Tactic.Linarith

/-!
# Universal-quantifier layer for the split-readout margin (coupled carrier)

The kernel file `QICNCoupledSplitMargin.lean` proves the fiber-thinness and
corner-chain arithmetic **given explicit fiber/corner hypotheses**.  A hostile
referee correctly objects that this leaves the *global quantifier* unproven:
"you only bounded the error GIVEN the fiber hypotheses; you never showed those
hypotheses hold for every admissible factorization".

This file closes that gap **relative to an explicitly specified structure**
`DStarFactorization`, which is a faithful transcription of the adopted `D*`
class (split, decoder-free, autonomous, time-homogeneous factorizations) from
`QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md`.  We then prove a genuine `∀`:

  for EVERY `F : DStarFactorization`, the error margin `F.ε` satisfies
  `Real.sqrt 7 / 14 ≤ F.ε`.

There are **no per-factorization fiber hypotheses** in the theorem statement:
the fiber bounds are *derived* inside the proof from the structural fields
(`reproduces`, `corner`) plus the true coupled dynamics.  The `data1/data2`
projections and the `obs1/obs2` reconstruction maps are arbitrary functions over
arbitrary types, so nonlinear `ψ` and arbitrary (nonlinear) split readouts are
all covered.

## Honest caveat (anti-gerrymandering)

The single load-bearing modeling commitment lives in the `reproduces` field: it
hard-codes the **coordinate-aligned** split, i.e. that the factor-1 observable
reconstructs the real coordinate and the factor-2 observable reconstructs the
imaginary coordinate (in a fixed orthonormal frame).  This is the adopted-`D*`
reading (observation `= (R₁(p_t), R₂(q_t))`, decoder-free), and it is WLOG among
orthonormal frames because multiplication by the non-real scalar is the same
`[[a,-b],[b,a]]` block in every orthonormal basis.  It is, however, a
**definitional disambiguation** of the under-specified canonical `def:iint`
(the "split a 2-D readout coordinatewise" choice), not a fact uniquely forced by
the current canonical text.  Therefore this file is `CLOSED_INTERNAL` only
*relative to the adopted `D*` structure*; the canonical-level question stays
`STILL_OPEN` until `def:iint` is tightened in the source.  This file does not
strengthen any claim and does not change `FULL_COP_MEMBERSHIP: NOT_YET`.
-/

namespace QICNLean

noncomputable section

/-- The compact admissible support: the annulus `{ 1/2 ≤ ‖x‖ ≤ 2 }` in `ℂ ≅ ℝ²`. -/
def inAnnulus (x : ℂ) : Prop := (1 / 2 : ℝ) ≤ ‖x‖ ∧ ‖x‖ ≤ 2

/-- The coupled affine trajectory `x₀ = x`, `x_{t+1} = K x_t + γ`, with
`K = ` multiplication by `rotationContractionScalar` and a fixed forcing
constant `γ` (the schedule is fixed, so `γ` is a single constant for the
`t = 0 → t = 1` step used below). -/
def coupledTraj (gamma : ℂ) : ℕ → ℂ → ℂ
  | 0, x => x
  | (n + 1), x => rotationContractionScalar * coupledTraj gamma n x + gamma

@[simp] lemma coupledTraj_zero (gamma x : ℂ) : coupledTraj gamma 0 x = x := rfl

@[simp] lemma coupledTraj_one (gamma x : ℂ) :
    coupledTraj gamma 1 x = rotationContractionScalar * x + gamma := rfl

/--
A `D*` factorization of the coupled carrier, as a structure.

This is the faithful transcription of the adopted class:

* `data1 : ℂ → Data1`, `data2 : ℂ → Data2` are the two (possibly nonlinear)
  factor-coordinate projections `ψ₁, ψ₂` onto arbitrary factor types;
* `obs1 t`, `obs2 t` are the (possibly nonlinear) split reconstruction maps that
  read each factor's state at time `t` — crucially each depends on **only one**
  factor's data, encoding decomposed/autonomous dynamics + split readouts with
  **no reconstruction decoder**;
* `reproduces` says the split reconstruction matches the true coupled history
  within `ε`, coordinate-aligned (factor 1 ↔ real coord, factor 2 ↔ imag coord);
* `corner` is the product/bijection consequence: the factor-1 data of one point
  and the factor-2 data of another are jointly realizable by an admissible
  point.

No field encodes "‖displacement‖ is small"; that is derived in
`dstar_universal_margin`.
-/
structure DStarFactorization where
  /-- reproduction error margin (the quantity being lower-bounded). -/
  ε : ℝ
  hε : 0 ≤ ε
  /-- fixed forcing constant for the schedule step `t = 0 → 1`. -/
  gamma : ℂ
  Data1 : Type
  Data2 : Type
  /-- factor-1 projection `ψ₁` (arbitrary, possibly nonlinear). -/
  data1 : ℂ → Data1
  /-- factor-2 projection `ψ₂` (arbitrary, possibly nonlinear). -/
  data2 : ℂ → Data2
  /-- factor-1 split reconstruction at each time (arbitrary, possibly nonlinear). -/
  obs1 : ℕ → Data1 → ℝ
  /-- factor-2 split reconstruction at each time (arbitrary, possibly nonlinear). -/
  obs2 : ℕ → Data2 → ℝ
  /-- coordinate-aligned, decoder-free reproduction of the coupled history within `ε`. -/
  reproduces : ∀ x : ℂ, inAnnulus x → ∀ t : ℕ,
      |(coupledTraj gamma t x).re - obs1 t (data1 x)| ≤ ε ∧
      |(coupledTraj gamma t x).im - obs2 t (data2 x)| ≤ ε
  /-- product/bijection corner property of `ψ = (ψ₁, ψ₂)` on the support. -/
  corner : ∀ y z : ℂ, inAnnulus y → inAnnulus z →
      ∃ w : ℂ, inAnnulus w ∧ data1 w = data1 y ∧ data2 w = data2 z

/-- `|A - B| ≤ 2ε` from two `ε`-reconstruction bounds to a common value `M`. -/
private lemma two_eps_bound {A B M ε : ℝ}
    (h1 : |A - M| ≤ ε) (h2 : |B - M| ≤ ε) : |A - B| ≤ 2 * ε := by
  have h := abs_sub_le A M B
  rw [abs_sub_comm M B] at h
  linarith

/-- Norm of a real cast in `ℂ`. -/
private lemma norm_ofReal_eq (r : ℝ) : ‖(Complex.ofReal r)‖ = |r| := by
  rw [Complex.norm_real, Real.norm_eq_abs]

/-- The two antipodal radius-2 points realize the annulus diameter `4`. -/
private lemma annulus_two : inAnnulus (Complex.ofReal 2) := by
  unfold inAnnulus
  rw [norm_ofReal_eq]
  norm_num

private lemma annulus_neg_two : inAnnulus (Complex.ofReal (-2)) := by
  unfold inAnnulus
  rw [norm_ofReal_eq]
  norm_num

/--
**Global quantifier over the adopted `D*` class.**

For every `D*` factorization of the coupled carrier, the reproduction error is
at least `sqrt(7)/14`.  The fiber/corner hypotheses consumed by the kernel are
not assumed here; they are derived from the structural fields plus the true
coupled dynamics.  This defeats the referee objections "you only proved it given
the fiber hypotheses" and "maybe some clever (nonlinear) factorization beats the
bound" — *within the adopted, explicitly specified class* `DStarFactorization`.

It does **not** close the canonical `Iint`, because the `reproduces` field
encodes the coordinate-aligned split disambiguation (see the file docstring).
-/
theorem dstar_universal_margin (F : DStarFactorization) :
    Real.sqrt 7 / 14 ≤ F.ε := by
  classical
  set c := rotationContractionScalar
  -- Two antipodal support points at Euclidean distance 4.
  set y : ℂ := Complex.ofReal 2 with hy
  set z : ℂ := Complex.ofReal (-2) with hz
  have hyA : inAnnulus y := annulus_two
  have hzA : inAnnulus z := annulus_neg_two
  -- Corner point sharing factor-1 data with `y` and factor-2 data with `z`.
  obtain ⟨w, hwA, hw1, hw2⟩ := F.corner y z hyA hzA
  ------------------------------------------------------------------
  -- Fiber-1 bound: `y` and `w` share factor-1 data ⇒ ‖y - w‖ ≤ 4√7 ε.
  ------------------------------------------------------------------
  -- time 0 (real coordinate)
  have hy0 := (F.reproduces y hyA 0).1
  have hw0 := (F.reproduces w hwA 0).1
  rw [coupledTraj_zero] at hy0 hw0
  rw [hw1] at hw0
  have hre0 : |y.re - w.re| ≤ 2 * F.ε := two_eps_bound hy0 hw0
  have hre0' : |(y - w).re| ≤ 2 * F.ε := by
    rwa [Complex.sub_re]
  -- time 1 (real coordinate)
  have hy1 := (F.reproduces y hyA 1).1
  have hw1' := (F.reproduces w hwA 1).1
  rw [coupledTraj_one] at hy1 hw1'
  rw [hw1] at hw1'
  have hreK0 : |(c * y + F.gamma).re - (c * w + F.gamma).re| ≤ 2 * F.ε :=
    two_eps_bound hy1 hw1'
  have hKre_eq : (c * y + F.gamma).re - (c * w + F.gamma).re = (c * (y - w)).re := by
    have : c * (y - w) = c * y - c * w := by ring
    rw [this, Complex.sub_re, Complex.add_re, Complex.add_re]; ring
  have hreK0' : |(c * (y - w)).re| ≤ 2 * F.ε := by rwa [hKre_eq] at hreK0
  have hyw : ‖y - w‖ ≤ (4 * Real.sqrt 7) * F.ε :=
    coupled_psi1_fiber_thin (y - w) F.ε F.hε hre0' hreK0'
  ------------------------------------------------------------------
  -- Fiber-2 bound: `w` and `z` share factor-2 data ⇒ ‖w - z‖ ≤ 4√7 ε.
  ------------------------------------------------------------------
  -- time 0 (imag coordinate)
  have hzw0 := (F.reproduces w hwA 0).2
  have hzz0 := (F.reproduces z hzA 0).2
  rw [coupledTraj_zero] at hzw0 hzz0
  rw [hw2] at hzw0
  have him0 : |w.im - z.im| ≤ 2 * F.ε := two_eps_bound hzw0 hzz0
  have him0' : |(w - z).im| ≤ 2 * F.ε := by
    rwa [Complex.sub_im]
  -- time 1 (imag coordinate)
  have hzw1 := (F.reproduces w hwA 1).2
  have hzz1 := (F.reproduces z hzA 1).2
  rw [coupledTraj_one] at hzw1 hzz1
  rw [hw2] at hzw1
  have himK0 : |(c * w + F.gamma).im - (c * z + F.gamma).im| ≤ 2 * F.ε :=
    two_eps_bound hzw1 hzz1
  have hKim_eq : (c * w + F.gamma).im - (c * z + F.gamma).im = (c * (w - z)).im := by
    have : c * (w - z) = c * w - c * z := by ring
    rw [this, Complex.sub_im, Complex.add_im, Complex.add_im]; ring
  have himK0' : |(c * (w - z)).im| ≤ 2 * F.ε := by rwa [hKim_eq] at himK0
  have hwz : ‖w - z‖ ≤ (4 * Real.sqrt 7) * F.ε :=
    coupled_psi2_fiber_thin (w - z) F.ε F.hε him0' himK0'
  ------------------------------------------------------------------
  -- Corner chain: ‖y - z‖ ≤ 8√7 ε, and ‖y - z‖ = 4.
  ------------------------------------------------------------------
  have htri : ‖y - z‖ ≤ ‖y - w‖ + ‖w - z‖ := by
    have := norm_add_le (y - w) (w - z)
    simpa [sub_add_sub_cancel] using this
  have hyz_norm : ‖y - z‖ = 4 := by
    have hsub : y - z = Complex.ofReal 4 := by
      rw [hy, hz, ← Complex.ofReal_sub]; norm_num
    rw [hsub, norm_ofReal_eq]; norm_num
  have hchain : (4 : ℝ) ≤ 2 * ((4 * Real.sqrt 7) * F.ε) := by
    have : ‖y - z‖ ≤ 2 * ((4 * Real.sqrt 7) * F.ε) := by
      calc ‖y - z‖ ≤ ‖y - w‖ + ‖w - z‖ := htri
        _ ≤ (4 * Real.sqrt 7) * F.ε + (4 * Real.sqrt 7) * F.ε := by
              linarith [hyw, hwz]
        _ = 2 * ((4 * Real.sqrt 7) * F.ε) := by ring
    rwa [hyz_norm] at this
  exact coupled_split_readout_positive_margin F.ε 4 F.hε rfl hchain

end

end QICNLean
