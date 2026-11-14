/-
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.

This file is an internal red-team artifact.  It is NOT external validation, NOT
peer review, and does NOT prove BaseCore H5, non-collapse, Iint, or C_op.  It
adversarially probes whether a NON-CIRCULAR hypothesis strictly WEAKER than
bilateral admissibility `hAdm` can carry the convex non-collapse bridge while
being COMPATIBLE with the strong static regime (a) `s ∩ N = ∅`.  See the
companion analysis
docs/ai-platform-outputs/analysis/QICN_H5_UNILATERAL_BRIDGE_REDTEAM.md.
-/

import QICNLean.QICNH5QuotientDisplacement

/-!
# Non-canonical convex H5 unilateral / dichotomy bridge red-team

Carry-in (verified, NOT re-derived): the convex update
`T_u x = convexProjection s (K x + Γ u)`, the constant subspace `N`, the
primitive linear collapse candidate `c*(u) = cStarConstant N K Γ hK u`, the
single-point reduction `collapse_iff_cStar_fixed`, the quotient-displacement
condition `(Q)  q(T_u(c*(u))) ≠ 0`, and the admissible-regime bridge
`noncollapse_of_quotient_displacement : (Q) + hAdm ⇒ non-collapse`.

## The obstacle (restated precisely)

The bridge "`(Q) ⇒ non-collapse`" reduces a convex fixed point `x* ∈ N` to the
linear candidate `c*(u)` via the variational reduction
`convex_constant_fixedpoint_reduces`.  That reduction tests both `N`-directions
`x* ± n` against `s`, so it needs `x* + N ⊆ s`, i.e. (since `x* ∈ N`) the full
`N ⊆ s`.  This is exactly `hAdm`'s consequence
(`bilateral_admissibility_forces_N_subset`), and the strong static regime
(a) `s ∩ N = ∅` PROVABLY forbids it (`regimes_incompatible`).  So the bridge and
the regime (a) closure live in disjoint regimes.

## What is provable (headline, honest)

We DO NOT weaken the regimes.  We weaken the BRIDGE HYPOTHESIS to the

    SUBSPACE DICHOTOMY   (D)   `(∃ y ∈ N ∩ s) → N ⊆ s`

i.e. "`s` does not partially truncate the constant subspace `N`: either `N`
entirely misses `s` or `N` is entirely inside `s`".  This is:

* non-circular — stated with `s, N` only (no fixed point, no `c*`, no `K, Γ`, no
  dynamics, no `(Q)`);
* strictly weaker than `hAdm` — `hAdm ⇒ (D)` (`bilateral_implies_dichotomy`);
* COMPATIBLE with regime (a) — `(a) ⇒ (D)` vacuously
  (`regime_a_implies_dichotomy`), and `(D) ∧ (a)` is SATISFIABLE with a genuine
  nonzero `N` (`dichotomy_regimeA_satisfiable`), the exact opposite of
  `regimes_incompatible` for `hAdm`.

Under `(D)` the bridge fires: `noncollapse_of_subspace_dichotomy` proves
`(Q) ⇒ non-collapse` without assuming `N ⊆ s` a priori.  The mechanism: a
collapse witness `x* ∈ N` is automatically in `s` (it is a projection output),
so `N ∩ s ≠ ∅`, so `(D)` UPGRADES it to `N ⊆ s`, recovering `hAdm` and the prior
bridge.

## Honest scope / residual obstruction (`EXTERNAL_REQUIRED` for the gap)

`(D)` does NOT introduce a new non-collapse mechanism for the genuinely PARTIAL
regime where `N ∩ s` is a proper nonempty subset of `N` (some constants
admissible, some not).  `(D)` EXCLUDES that regime by fiat
(`partial_regime_violates_dichotomy`).  In the partial regime the reduction to
`c*(u)` is unavailable and `(Q)` (a condition on `c*(u)`) does not control other
admissible constants.  Closing the partial regime is left
`EXTERNAL_REQUIRED`: it needs a modelling decision (is `s` allowed to partially
cut `N`?) or an external mathematical input, not more internal brute force.
-/

namespace QICNLean

noncomputable section

/-! ## Section A — the subspace-dichotomy hypothesis. -/

/--
**Subspace dichotomy (D).** The constant subspace `N` is not partially truncated
by the admissible convex set `s`: if any constant is admissible, then every
constant is admissible.

Geometrically interpretable, and stated with `s, N` only — no fixed point, no
`c*(u)`, no dynamics. Hence non-circular with respect to H5/non-collapse.
-/
def SubspaceDichotomy
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    (N : Submodule ℝ H) (s : Set H) : Prop :=
  (∃ y, y ∈ N ∧ y ∈ s) → ∀ z ∈ N, z ∈ s

/--
**Regime (a) ⟹ (D).** If no admissible point is a constant (`s ∩ N = ∅` form),
the dichotomy holds VACUOUSLY (its premise is unsatisfiable). So (D) is
compatible with the strong static regime.
-/
theorem regime_a_implies_dichotomy
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} {N : Submodule ℝ H}
    (hExcl : ∀ x ∈ s, x ∉ N) :
    SubspaceDichotomy N s := by
  rintro ⟨y, hyN, hys⟩
  exact absurd hyN (hExcl y hys)

/--
**Bilateral admissibility ⟹ (D).** `hAdm` forces `N ⊆ s`, so the dichotomy holds
with its conclusion true. Hence (D) is strictly weaker than `hAdm`.
-/
theorem bilateral_implies_dichotomy
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} {N : Submodule ℝ H}
    (hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s) :
    SubspaceDichotomy N s := by
  intro _ z hz
  exact bilateral_admissibility_forces_N_subset hAdm z hz

/--
**(D) excludes the partial regime (honest limitation).** If some constant is
admissible (`y ∈ N ∩ s`) but some other constant is NOT (`z ∈ N`, `z ∉ s`), then
the dichotomy FAILS. This mechanizes that (D) assumes the hard partial regime
away rather than solving it.
-/
theorem partial_regime_violates_dichotomy
    {H : Type*} [NormedAddCommGroup H] [InnerProductSpace ℝ H]
    {s : Set H} {N : Submodule ℝ H}
    (y : H) (hyN : y ∈ N) (hys : y ∈ s)
    (z : H) (hzN : z ∈ N) (hzs : z ∉ s) :
    ¬ SubspaceDichotomy N s := by
  intro hD
  exact hzs (hD ⟨y, hyN, hys⟩ z hzN)

/-! ## Section B — the dichotomy bridge to non-collapse. -/

/--
**(D) + (Q) ⟹ non-collapse (headline).** Under the subspace dichotomy and the
quotient-displacement condition `(Q)`, every convex fixed point projects to a
non-null class: `q x* ≠ 0`. No `N ⊆ s` is assumed a priori — it is recovered
from the collapse witness via `(D)`.

This is the unification target: a SINGLE non-circular hypothesis `(D)`, weaker
than `hAdm` and compatible with regime (a), under which `(Q) ⇒ non-collapse`.
-/
theorem noncollapse_of_subspace_dichotomy
    {H U_param : Type*}
    [NormedAddCommGroup H] [InnerProductSpace ℝ H] [CompleteSpace H]
    (s : Set H) (hne : s.Nonempty) (hcl : IsComplete s) (hc : Convex ℝ s)
    (N : Submodule ℝ H) [CompleteSpace N]
    (K : H →L[ℝ] H) (Gamma : U_param → H) (hK : ‖K‖ < 1)
    (hDich : SubspaceDichotomy N s)
    (u : U_param)
    (hQ : N.mkQ (convexProjection s hne hcl hc
            (K (cStarConstant N K Gamma hK u) + Gamma u)) ≠ 0)
    (x : H)
    (hfixed : convexProjection s hne hcl hc (K x + Gamma u) = x) :
    N.mkQ x ≠ 0 := by
  intro hx0
  -- A collapse witness lies in N ...
  have hxN : x ∈ N := (mem_iff_mkQ_eq_zero N x).mpr hx0
  -- ... and is automatically admissible (it is a projection output).
  have hxs : x ∈ s := by
    rw [← hfixed]
    exact convexProjection_mem hne hcl hc _
  -- The dichotomy upgrades "N meets s" to the full N ⊆ s.
  have hNsub : ∀ z ∈ N, z ∈ s := hDich ⟨x, hxN, hxs⟩
  -- Recover bilateral admissibility and fire the prior bridge.
  have hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s := fun c hcN n hnN =>
    hNsub (c + n) (N.add_mem hcN hnN)
  exact noncollapse_of_quotient_displacement
    s hne hcl hc N K Gamma hK hAdm u hQ x hfixed hx0

/-! ## Section C — regime compatibility certificate (anti-`regimes_incompatible`).

`regimes_incompatible` proved `hAdm ∧ (s ∩ N = ∅) ⇒ False`. The dichotomy is
designed to remove exactly that incompatibility: `(D) ∧ (s ∩ N = ∅)` is
SATISFIABLE, and with a genuine nonzero `N` (not trivial isolation `N = ⊥`). -/

private theorem inner_pt2 (a b c d : ℝ) :
    (inner ℝ (!₂[a, b] : EuclideanSpace ℝ (Fin 2)) (!₂[c, d] : EuclideanSpace ℝ (Fin 2)))
      = a * c + b * d := by
  simp [PiLp.inner_apply, Fin.sum_univ_two, RCLike.inner_apply, mul_comm]

/--
**Compatibility certificate (`(D) ∧ regime (a)` is satisfiable).** There exist a
GENUINE nonzero constant subspace `N ≠ ⊥` and a nonempty admissible set `s` in
`ℝ²` such that simultaneously:
* regime (a) holds — `∀ x ∈ s, x ∉ N` (so `s ∩ N = ∅`); and
* the subspace dichotomy `(D)` holds.

Witness: `N` = first axis `ker⟨e₂, ·⟩` (`e₁ ∈ N`, so `N ≠ ⊥`), and the affine
hyperplane `s = {w | ⟨e₂, w⟩ = 1}` (`e₂ ∈ s`). Every point of `s` has second
inner-coordinate `1 ≠ 0`, hence is not a constant; the dichotomy then holds
vacuously. This is the explicit opposite of `regimes_incompatible`: the
incompatibility was a feature of `hAdm`, not of `(D)`.
-/
theorem dichotomy_regimeA_satisfiable :
    ∃ (N : Submodule ℝ (EuclideanSpace ℝ (Fin 2)))
      (s : Set (EuclideanSpace ℝ (Fin 2))),
      N ≠ ⊥ ∧ s.Nonempty ∧ (∀ x ∈ s, x ∉ N) ∧ SubspaceDichotomy N s := by
  set e2 : EuclideanSpace ℝ (Fin 2) := !₂[(0:ℝ), 1] with he2
  set e1 : EuclideanSpace ℝ (Fin 2) := !₂[(1:ℝ), 0] with he1
  set N : Submodule ℝ (EuclideanSpace ℝ (Fin 2)) :=
    LinearMap.ker (innerSL ℝ e2).toLinearMap with hN
  set s : Set (EuclideanSpace ℝ (Fin 2)) := { w | (inner ℝ e2 w : ℝ) = 1 } with hs
  -- e1 ∈ N
  have he1N : e1 ∈ N := by
    rw [hN, LinearMap.mem_ker]
    change (inner ℝ e2 e1 : ℝ) = 0
    rw [he2, he1, inner_pt2]; norm_num
  -- e1 ≠ 0, hence N ≠ ⊥
  have he1ne : e1 ≠ 0 := by
    intro h
    have hco : (e1 : EuclideanSpace ℝ (Fin 2)) 0 = (0 : EuclideanSpace ℝ (Fin 2)) 0 := by
      rw [h]
    rw [he1] at hco
    simp at hco
  have hNbot : N ≠ ⊥ := (Submodule.ne_bot_iff N).mpr ⟨e1, he1N, he1ne⟩
  -- s nonempty (e2 ∈ s)
  have hsne : s.Nonempty := by
    refine ⟨e2, ?_⟩
    rw [hs, Set.mem_setOf_eq, he2, inner_pt2]; norm_num
  -- regime (a): every admissible point has ⟨e2, ·⟩ = 1 ≠ 0, hence is not in N
  have hExcl : ∀ x ∈ s, x ∉ N := by
    intro x hx hxN
    rw [hs, Set.mem_setOf_eq] at hx
    rw [hN, LinearMap.mem_ker] at hxN
    have hxN' : (inner ℝ e2 x : ℝ) = 0 := hxN
    rw [hxN'] at hx
    norm_num at hx
  exact ⟨N, s, hNbot, hsne, hExcl, regime_a_implies_dichotomy hExcl⟩

end

end QICNLean
