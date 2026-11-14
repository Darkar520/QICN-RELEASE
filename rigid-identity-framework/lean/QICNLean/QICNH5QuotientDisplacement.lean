/-
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.

This file is an internal red-team artifact.  It is NOT external validation, NOT
peer review, and does NOT prove BaseCore H5, non-collapse, Iint, or C_op.  It
adversarially probes the THREE follow-up tracks left open by
QICNH5QuotientDynamics.lean:
  Track 1 (headline) — a QUOTIENT-DISPLACEMENT condition unifying regimes (a)/(c);
  Track 2 — the descent obstruction as an explicit ℝ² counterexample;
  Track 3 — a quantitative margin bounding the H-displacement from below.
See the companion analysis
docs/ai-platform-outputs/analysis/QICN_H5_QUOTIENT_DISPLACEMENT_REDTEAM.md.
-/

import QICNLean.QICNH5QuotientDynamics
import Mathlib.Analysis.InnerProductSpace.PiL2
import Mathlib.Analysis.Convex.Basic
import Mathlib.Analysis.Normed.Group.Quotient

/-!
# Non-canonical convex H5 quotient-DISPLACEMENT red-team

Carry-in (verified, not re-derived): the convex update
`T_u x = convexProjection s (K x + Γ u)`, the constant subspace `N`, bilateral
admissibility `hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s`, the primitive linear
collapse candidate `c*(u) = cStarConstant N K Γ hK u`, and the prior single-point
reduction `collapse_iff_cStar_fixed`. The prior note `QUOTIENT_DYNAMICS` left
three explicit tracks open; this file mechanizes what is honestly provable on
each and marks the rest `STILL_OPEN` with the exact obstruction.

## Quotient displacement `q = N.mkQ`

The candidate displacement is evaluated at the primitive collapse point `c*(u)`:
`drift(u) = ‖q(T_u(c*(u))) − q(c*(u))‖_{H/N}`. Since `c*(u) ∈ N`, `q(c*(u)) = 0`,
so `drift(u) = ‖q(T_u(c*(u)))‖`. The displacement condition is

    (Q)   drift(u) > 0      ⟺   q(T_u(c*(u))) ≠ 0   ⟺   T_u(c*(u)) ∉ N.

## Track 1 results (honest)

* `regime_a_implies_quotient_displacement` — regime (a) `s ∩ N = ∅` IMPLIES (Q)
  (no `hAdm`). So (Q) specializes downward to (a).
* `cStar_image_mem_N_iff_eq` / `quotient_displacement_iff_cStar_moved` — under
  `hAdm`, (Q) is EQUIVALENT to condition (c) `T_u(c*(u)) ≠ c*(u)`. So (Q)
  specializes to (c) in the admissible regime.
* `regimes_incompatible` — `hAdm` and `s ∩ N = ∅` are contradictory (`0 ∈ N`).
* `noncollapse_of_quotient_displacement` — (Q) + `hAdm` forces convex non-collapse.

**Honest verdict for Track 1.** (Q) is a single quotient-displacement quantity that
(i) is implied by (a) and (ii) is equivalent to (c) under `hAdm`, and forces
non-collapse in the admissible regime. It is the right unifying *object*. But (Q)
does NOT yield a single *regime-free* hypothesis implying non-collapse: the two
regimes are provably DISJOINT (`regimes_incompatible`) and the bridge from the
single-point (Q) to "no fixed point in `N`" needs `hAdm`, which (a) forbids. So a
regime-free domination theorem is `STILL_OPEN`; the obstruction is mechanized.

## Track 2 (`OBSTRUCTED_INTERNAL`, now with explicit counterexample)

`convex_projection_not_N_equivariant` exhibits a concrete `H = ℝ²`, line `N`,
closed convex half-space `s`, and `x, x'` in the same `N`-coset whose convex
projections fall in different `N`-cosets. Hence there is no canonical induced
quotient map `T̄_u : H/N → H/N`.

## Track 3 (quantitative, honest)

`quotient_le_collapse_displacement` proves
`‖q(T_u(c*(u)))‖ ≤ ‖T_u(c*(u)) − c*(u)‖`: the H-displacement margin is at least the
quotient drift. `noncollapse_of_positive_margin` turns a positive margin into
non-collapse. The margin `δ := ‖q(T_u(c*(u)))‖` is primitive-derived (a norm of a
primitive-defined quotient image), NOT an assumed constant. There is NO universal
positive `δ`: its positivity is exactly the exclusion condition (Q). No numeric
universal lower bound is claimed.
-/

namespace QICNLean

open Function (IsFixedPt)

noncomputable section

/-! ## Section A — convex projection helpers (general). -/

/--
The metric projection is determined by the variational inequality: if `v ∈ s`
and `⟨p − v, w − v⟩ ≤ 0` for all `w ∈ s`, then `convexProjection s p = v`.

Pure consequence of `norm_eq_iInf_iff_real_inner_le_zero` + minimizer uniqueness.
-/
theorem convexProjection_eq_of_variational
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    {p v : H} (hv : v ∈ s)
    (hvar : ∀ w ∈ s, inner ℝ (p - v) (w - v) ≤ 0) :
    convexProjection s hne hcl hc p = v := by
  have hmin : ‖p - v‖ = ⨅ w : s, ‖p - (w : H)‖ :=
    (norm_eq_iInf_iff_real_inner_le_zero hc hv).2 hvar
  exact convex_minimizer_unique hc (convexProjection_mem hne hcl hc p) hv
    (convexProjection_minimizes hne hcl hc p) hmin

/-- The projection of an admissible point is itself. -/
theorem convexProjection_of_mem
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    {p : H} (hp : p ∈ s) :
    convexProjection s hne hcl hc p = p := by
  refine convexProjection_eq_of_variational hne hcl hc hp ?_
  intro w _
  simp

/-! ## Section B — Track 1: quotient displacement at the collapse candidate. -/

/--
**Membership reduction (new).** If the convex projection of `a` lands in the
constant subspace `N` and bilateral admissibility holds, then it equals the
linear projection `P_N a`.

This generalizes the fixed-point variational reduction
`convex_constant_fixedpoint_reduces`: here the hypothesis is only
`convexProjection s a ∈ N`, NOT that it is a fixed point.
-/
theorem convexProjection_mem_N_implies_starProjection_eq
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (a : H) (hmem : convexProjection s hne hcl hc a ∈ N) :
    N.starProjection a = convexProjection s hne hcl hc a := by
  set y := convexProjection s hne hcl hc a with hy
  have hvar : ∀ w ∈ s, inner ℝ (a - y) (w - y) ≤ 0 := by
    intro w hw
    exact convexProjection_variational hne hcl hc a w hw
  have hle : ∀ nn ∈ N, inner ℝ (a - y) nn ≤ 0 := by
    intro nn hnn
    have hws : y + nn ∈ s := hAdm y hmem nn hnn
    have hraw := hvar (y + nn) hws
    have hsub : y + nn - y = nn := by abel
    rwa [hsub] at hraw
  have horth : ∀ nn ∈ N, inner ℝ (a - y) nn = 0 := by
    intro nn hnn
    have h1 : inner ℝ (a - y) nn ≤ 0 := hle nn hnn
    have h2 : -inner ℝ (a - y) nn ≤ 0 := by
      have hraw := hle (-nn) (N.neg_mem hnn)
      simpa [inner_neg_right] using hraw
    exact le_antisymm h1 (neg_nonpos.mp h2)
  have hproj_z : N.starProjection (a - y) = 0 := by
    exact N.eq_starProjection_of_mem_of_inner_eq_zero (zero_mem N)
      (by intro nn hnn; simpa using horth nn hnn)
  have hPy : N.starProjection y = y := N.starProjection_eq_self_iff.mpr hmem
  have hdecomp : a = (a - y) + y := by abel
  calc
    N.starProjection a = N.starProjection ((a - y) + y) := by rw [← hdecomp]
    _ = N.starProjection (a - y) + N.starProjection y := map_add N.starProjection _ _
    _ = 0 + y := by rw [hproj_z, hPy]
    _ = y := by simp

/--
**The collapse image is in `N` iff it is fixed (under `hAdm`).** `T_u(c*(u)) ∈ N`
is equivalent to `T_u(c*(u)) = c*(u)`. Forward uses the membership reduction +
`cStarConstant_fixed`; backward is immediate (`c*(u) ∈ N`).
-/
theorem cStar_image_mem_N_iff_eq
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) :
    convexProjection s hne hcl hc (K (cStarConstant N K Gamma hK u) + Gamma u) ∈ N
      ↔ convexProjection s hne hcl hc (K (cStarConstant N K Gamma hK u) + Gamma u)
          = cStarConstant N K Gamma hK u := by
  constructor
  · intro hmem
    have hsp := convexProjection_mem_N_implies_starProjection_eq s hne hcl hc N hAdm
      (K (cStarConstant N K Gamma hK u) + Gamma u) hmem
    rw [cStarConstant_fixed] at hsp
    exact hsp.symm
  · intro heq
    rw [heq]
    exact cStarConstant_mem N K Gamma hK u

/--
**Quotient-displacement value** at the collapse candidate:
`drift(u) = ‖q(T_u(c*(u))) − q(c*(u))‖_{H/N}`.
-/
def quotientDriftAtCStar
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) : ℝ :=
  ‖N.mkQ (convexProjection s hne hcl hc (K (cStarConstant N K Gamma hK u) + Gamma u))
      - N.mkQ (cStarConstant N K Gamma hK u)‖

/-- Since `q(c*(u)) = 0`, the drift collapses to `‖q(T_u(c*(u)))‖`. -/
theorem quotientDriftAtCStar_eq
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) :
    quotientDriftAtCStar s hne hcl hc N K Gamma hK u
      = ‖N.mkQ (convexProjection s hne hcl hc
          (K (cStarConstant N K Gamma hK u) + Gamma u))‖ := by
  unfold quotientDriftAtCStar
  rw [(mem_iff_mkQ_eq_zero N _).mp (cStarConstant_mem N K Gamma hK u), sub_zero]

/--
**(a) ⟹ (Q).** If no admissible point is a constant (`s ∩ N = ∅` form), then the
quotient displacement of the collapse image is nonzero. No `hAdm` needed; this is
the downward specialization of (Q) to the strong static regime (a).
-/
theorem regime_a_implies_quotient_displacement
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H)
    (K : H →L[ℝ] H) (Gamma : U_param → H)
    (hExcl : ∀ x ∈ s, x ∉ N)
    (u : U_param) (c : H) :
    N.mkQ (convexProjection s hne hcl hc (K c + Gamma u)) ≠ 0 := by
  intro hzero
  exact (convexProjection_not_mem_of_inadmissible hne hcl hc hExcl (K c + Gamma u))
    ((mem_iff_mkQ_eq_zero N _).mpr hzero)

/--
**(Q) ⟺ (c) under `hAdm`.** The quotient-displacement condition
`q(T_u(c*(u))) ≠ 0` is equivalent to condition (c) `T_u(c*(u)) ≠ c*(u)`. This is
the downward specialization of (Q) to the admissible regime (c).
-/
theorem quotient_displacement_iff_cStar_moved
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param) :
    N.mkQ (convexProjection s hne hcl hc
        (K (cStarConstant N K Gamma hK u) + Gamma u)) ≠ 0
      ↔ convexProjection s hne hcl hc
          (K (cStarConstant N K Gamma hK u) + Gamma u)
          ≠ cStarConstant N K Gamma hK u := by
  rw [ne_eq, ne_eq, not_iff_not, ← mem_iff_mkQ_eq_zero]
  exact cStar_image_mem_N_iff_eq s hne hcl hc N K Gamma hK hAdm u

/--
**Obstruction to a single regime-free hypothesis.** The admissible regime `hAdm`
and the strong static regime (a) `s ∩ N = ∅` are contradictory: `0 ∈ N` forces
`0 ∈ s` under `hAdm`, which (a) forbids. So (Q)'s two specialization routes live
in disjoint regimes; there is no regime where both mechanisms are simultaneously
available, hence no merging into one regime-free domination theorem here.
-/
theorem regimes_incompatible
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (s : Set H) (N : Submodule ℝ H)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (hExcl : ∀ x ∈ s, x ∉ N) :
    False := by
  have h0s : (0 : H) ∈ s := bilateral_admissibility_forces_N_subset hAdm 0 N.zero_mem
  exact hExcl 0 h0s N.zero_mem

/--
**(Q) ⟹ non-collapse (admissible regime).** If the quotient displacement of the
collapse image is nonzero and `hAdm` holds, then every convex fixed point projects
to a non-null class: `q x* ≠ 0`.
-/
theorem noncollapse_of_quotient_displacement
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hQ : N.mkQ (convexProjection s hne hcl hc
            (K (cStarConstant N K Gamma hK u) + Gamma u)) ≠ 0)
    (x : H)
    (hfixed : convexProjection s hne hcl hc (K x + Gamma u) = x) :
    N.mkQ x ≠ 0 := by
  have hMove :=
    (quotient_displacement_iff_cStar_moved s hne hcl hc N K Gamma hK hAdm u).mp hQ
  exact convex_fixedpoint_mkQ_ne_zero s hne hcl hc N K Gamma hK hAdm u hMove x hfixed

end

end QICNLean

namespace QICNLean

noncomputable section

/-! ## Section C — Track 3: quantitative margin. -/

/--
**Margin lower bound.** The H-displacement of the collapse candidate is at least
its quotient drift: `‖q(T_u(c*(u)))‖ ≤ ‖T_u(c*(u)) − c*(u)‖`.

Uses only `q(c*(u)) = 0` and the quotient seminorm bound `‖q y‖ ≤ ‖y‖`. The margin
`δ := ‖q(T_u(c*(u)))‖` is primitive-derived; no universal positive value is
asserted.
-/
theorem quotient_le_collapse_displacement
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1) (u : U_param) :
    ‖N.mkQ (convexProjection s hne hcl hc
        (K (cStarConstant N K Gamma hK u) + Gamma u))‖
      ≤ ‖convexProjection s hne hcl hc
          (K (cStarConstant N K Gamma hK u) + Gamma u)
        - cStarConstant N K Gamma hK u‖ := by
  set T := convexProjection s hne hcl hc
    (K (cStarConstant N K Gamma hK u) + Gamma u) with hT
  have hc0 : N.mkQ (cStarConstant N K Gamma hK u) = 0 :=
    (mem_iff_mkQ_eq_zero N _).mp (cStarConstant_mem N K Gamma hK u)
  have heq : N.mkQ T = N.mkQ (T - cStarConstant N K Gamma hK u) := by
    rw [map_sub, hc0, sub_zero]
  rw [heq, Submodule.mkQ_apply]
  exact Submodule.Quotient.norm_mk_le N _

/--
**Positive margin ⟹ non-collapse.** A strictly positive quotient margin
`0 < ‖q(T_u(c*(u)))‖` (equivalently a strictly positive drift, see
`quotientDriftAtCStar_eq`) forces convex non-collapse under `hAdm`.

Note: `0 < ‖q(T_u(c*(u)))‖ ⟹ q(T_u(c*(u))) ≠ 0` holds for the seminorm; the
converse needs `N` closed and is not used.
-/
theorem noncollapse_of_positive_margin
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s)
    (u : U_param)
    (hpos : 0 < ‖N.mkQ (convexProjection s hne hcl hc
              (K (cStarConstant N K Gamma hK u) + Gamma u))‖)
    (x : H)
    (hfixed : convexProjection s hne hcl hc (K x + Gamma u) = x) :
    N.mkQ x ≠ 0 := by
  have hQ : N.mkQ (convexProjection s hne hcl hc
      (K (cStarConstant N K Gamma hK u) + Gamma u)) ≠ 0 := by
    intro h
    rw [h, norm_zero] at hpos
    exact lt_irrefl 0 hpos
  exact noncollapse_of_quotient_displacement s hne hcl hc N K Gamma hK hAdm u hQ x hfixed

/-! ## Section D — Track 2: explicit descent obstruction in ℝ². -/

/--
Metric projection onto the closed convex half-space `{w | 0 ≤ ⟨n, w⟩}` of a point
`p` with `⟨n, p⟩ < 0`: the closed-form drop along the normal `n`.
-/
theorem halfspace_projection
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (n : H) (hn : (0 : ℝ) < ‖n‖) (p : H) (hp : inner ℝ n p < 0)
    (hne : ({w : H | (0 : ℝ) ≤ inner ℝ n w}).Nonempty)
    (hcl : IsComplete {w : H | (0 : ℝ) ≤ inner ℝ n w})
    (hc : Convex ℝ {w : H | (0 : ℝ) ≤ inner ℝ n w}) :
    convexProjection {w : H | (0 : ℝ) ≤ inner ℝ n w} hne hcl hc p
      = p - (inner ℝ n p / ‖n‖^2) • n := by
  set c : ℝ := inner ℝ n p / ‖n‖^2 with hcdef
  set v : H := p - c • n with hvdef
  have hnn : (inner ℝ n n : ℝ) = ‖n‖^2 := by rw [real_inner_self_eq_norm_sq]
  have hns : ‖n‖^2 ≠ 0 := pow_ne_zero 2 (ne_of_gt hn)
  have hinv : (inner ℝ n v : ℝ) = 0 := by
    rw [hvdef, inner_sub_right, inner_smul_right, hnn, hcdef, div_mul_cancel₀ _ hns,
      sub_self]
  have hvmem : v ∈ {w : H | (0:ℝ) ≤ inner ℝ n w} := by
    simp only [Set.mem_setOf_eq, hinv, le_refl]
  refine convexProjection_eq_of_variational hne hcl hc hvmem ?_
  intro w hw
  have hpv : p - v = c • n := by rw [hvdef]; abel
  rw [hpv, real_inner_smul_left]
  have hcneg : c < 0 := by
    rw [hcdef]; exact div_neg_of_neg_of_pos hp (pow_pos hn 2)
  have hnw : (0:ℝ) ≤ inner ℝ n (w - v) := by
    rw [inner_sub_right, hinv, sub_zero]
    exact hw
  exact mul_nonpos_of_nonpos_of_nonneg (le_of_lt hcneg) hnw

private theorem inner_pt2 (a b c d : ℝ) :
    (inner ℝ (!₂[a, b] : EuclideanSpace ℝ (Fin 2)) (!₂[c, d] : EuclideanSpace ℝ (Fin 2)))
      = a * c + b * d := by
  simp [PiLp.inner_apply, Fin.sum_univ_two, RCLike.inner_apply, mul_comm]

/--
**Descent obstruction, explicit (`OBSTRUCTED_INTERNAL`).** In `H = ℝ²` there exist
a line `N`, a nonempty closed convex half-space `s`, and points `x, x'` in the same
`N`-coset (`q x = q x'`) whose convex projections fall in DIFFERENT `N`-cosets
(`q (proj x) ≠ q (proj x')`).

Hence the convex update does NOT respect `N`-cosets and there is no canonical
induced quotient map `T̄_u : H/N → H/N`. Concretely: `N = ker⟨e₁, ·⟩` (the first
axis), `s = {w | 0 ≤ ⟨(1,1), w⟩}`, `x = (0,−2)`, `x' = (3,−2)`. The points differ
by `(−3,0) ∈ N`, yet `proj x = (1,−1)` and `proj x' = (3,−2)` differ by
`(−2,1) ∉ N`.

The data is honest: `s` is a genuine closed convex set, `N` a genuine line, and the
points are not tuned to any other track — only to break coset-equivariance.
-/
theorem convex_projection_not_N_equivariant :
    ∃ (s : Set (EuclideanSpace ℝ (Fin 2))) (hne : s.Nonempty) (hcl : IsComplete s)
      (hc : Convex ℝ s) (N : Submodule ℝ (EuclideanSpace ℝ (Fin 2)))
      (x x' : EuclideanSpace ℝ (Fin 2)),
      N.mkQ x = N.mkQ x' ∧
      N.mkQ (convexProjection s hne hcl hc x)
        ≠ N.mkQ (convexProjection s hne hcl hc x') := by
  set n : EuclideanSpace ℝ (Fin 2) := !₂[(1:ℝ), 1] with hn
  set e1 : EuclideanSpace ℝ (Fin 2) := !₂[(0:ℝ), 1] with he1
  set x : EuclideanSpace ℝ (Fin 2) := !₂[(0:ℝ), -2] with hx
  set x' : EuclideanSpace ℝ (Fin 2) := !₂[(3:ℝ), -2] with hx'
  have hnx : (inner ℝ n x : ℝ) = -2 := by rw [hn, hx, inner_pt2]; norm_num
  have hnx' : (inner ℝ n x' : ℝ) = 1 := by rw [hn, hx', inner_pt2]; norm_num
  have he1x : (inner ℝ e1 x : ℝ) = -2 := by rw [he1, hx, inner_pt2]; norm_num
  have he1x' : (inner ℝ e1 x' : ℝ) = -2 := by rw [he1, hx', inner_pt2]; norm_num
  have he1n : (inner ℝ e1 n : ℝ) = 1 := by rw [he1, hn, inner_pt2]; norm_num
  have hnpos : (0:ℝ) < ‖n‖ := by
    rw [norm_pos_iff, hn]; intro h
    have hco : (!₂[(1:ℝ), 1] : EuclideanSpace ℝ (Fin 2)) 0 = (0 : EuclideanSpace ℝ (Fin 2)) 0 := by
      rw [h]
    simp at hco
  have hn2 : ‖n‖^2 = 2 := by
    rw [hn, EuclideanSpace.norm_eq, Real.sq_sqrt (Finset.sum_nonneg fun i _ => sq_nonneg _)]
    norm_num [Fin.sum_univ_two]
  set s : Set (EuclideanSpace ℝ (Fin 2)) := { w | (0:ℝ) ≤ inner ℝ n w } with hs
  have hsne : s.Nonempty := ⟨0, by simp [hs]⟩
  have hscl : IsComplete s := by
    apply IsClosed.isComplete
    have hcont : Continuous (fun w : EuclideanSpace ℝ (Fin 2) => inner ℝ n w) :=
      (innerSL ℝ n).continuous
    exact isClosed_le continuous_const hcont
  have hsc : Convex ℝ s := convex_halfSpace_ge
    ⟨fun a b => inner_add_right n a b, fun r a => real_inner_smul_right n a r⟩ 0
  have hpx : convexProjection s hsne hscl hsc x = x - (inner ℝ n x / ‖n‖^2) • n :=
    halfspace_projection n hnpos x (by rw [hnx]; norm_num) hsne hscl hsc
  have hx'mem : x' ∈ s := by rw [hs]; simp only [Set.mem_setOf_eq, hnx']; norm_num
  have hpx' : convexProjection s hsne hscl hsc x' = x' :=
    convexProjection_of_mem hsne hscl hsc hx'mem
  set N : Submodule ℝ (EuclideanSpace ℝ (Fin 2)) :=
    LinearMap.ker (innerSL ℝ e1).toLinearMap with hN
  refine ⟨s, hsne, hscl, hsc, N, x, x', ?_, ?_⟩
  · rw [Submodule.mkQ_apply, Submodule.mkQ_apply, Submodule.Quotient.eq, hN,
      LinearMap.mem_ker]
    change (inner ℝ e1 (x - x') : ℝ) = 0
    rw [inner_sub_right, he1x, he1x']; norm_num
  · rw [Ne, Submodule.mkQ_apply, Submodule.mkQ_apply, Submodule.Quotient.eq, hN,
      LinearMap.mem_ker]
    change (inner ℝ e1 (convexProjection s hsne hscl hsc x
            - convexProjection s hsne hscl hsc x') : ℝ) ≠ 0
    rw [hpx, hpx', inner_sub_right, inner_sub_right, inner_smul_right,
      he1x, he1x', he1n, hnx, hn2]
    norm_num

end

end QICNLean
