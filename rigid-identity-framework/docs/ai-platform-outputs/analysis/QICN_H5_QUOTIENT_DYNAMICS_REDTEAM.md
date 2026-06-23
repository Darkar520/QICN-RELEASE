# QICN H5 — Convex Non-Collapse via Quotient Dynamics (Red-Team)

```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.
```

Status: `NON_CANONICAL_ADVERSARIAL_ANALYSIS`
Date: 2026-06-18
Role: internal hostile referee (red-team). A STILL_OPEN verdict or a demonstrated
OBSTRUCTION are valid results, preferred over forced closure.
Human review: `REQUIRED`
Human curated status: `not_reviewed`

This note is internal adversarial scrutiny with referee-level rigor. It is **not**
external validation, **not** peer review, and does **not** certify any QICN claim.
It does not modify canon, registry, release, monolithic, package.json, gates, or
the pre-existing `.lean` files (other than adding the import of the new file to
the aggregator `QICNLean.lean`).

---

## 0. Carry-in state (verified previously; not re-derived)

From `QICN_H5_CONVEX_EXCLUSION_REDTEAM.md` and its Lean artifacts:

- H5 (non-collapse), convex case: closes only under the **strong** static
  exclusion (a) `s ∩ N = ∅` (`CLOSED_INTERNAL` but strong: it forbids *every*
  admissible constant).
- Candidate (b) `c*(u) ∉ s`: `REFUTED_INTERNAL` (self-defeating: `hAdm ⇒ N ⊆ s ⇒
  c*(u) ∈ s`).
- A **minimal** non-circular geometric exclusion: `STILL_OPEN`. The recommended
  next track was: attack the collapse mode directly via the quotient `H ⧸ N`.

This note executes that next track.

Reused objects (verbatim, not re-introduced): the convex update
`T_u x = convexProjection s (K x + Γ u)`; the constant subspace `N`; bilateral
admissibility `hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s`; the variational reduction
`convex_constant_fixedpoint_reduces`; and the primitive linear collapse candidate
`c*(u) = cStarConstant N K Γ hK u`, the unique fixed point of `c ↦ P_N(K c + Γ u)`
on `N`, built only from `N, K, Γ`.

---

## 1. Mechanized artifact

Lean file (new):
`docs/ai-platform-outputs/formal/lean/QICNLean/QICNH5QuotientDynamics.lean`

Build: `lake build` EXIT 0 — "Build completed successfully (2305 jobs)" (baseline
before this file: 2304 jobs). Only header-style linter warnings (same seal-header
warnings as the existing sealed files); no errors.

`#print axioms` for all 7 theorems: `[propext, Classical.choice, Quot.sound]`
only. No `sorry`, no `admit`, no extra axioms. (Verified with a scratch file that
was then deleted.)

| Theorem | Role |
|---|---|
| `mem_iff_mkQ_eq_zero` | quotient framing: `x ∈ N ↔ N.mkQ x = 0` (collapse = null class) |
| `cStarConstant_unique` | Banach uniqueness: any fixed point of `c ↦ P_N(Kc+Γu)` equals `c*(u)` |
| `convex_collapsed_fixedpoint_eq_cStar` | a convex constant fixed point, if any, equals `c*(u)` (needs `hAdm`) |
| `collapse_iff_cStar_fixed` | **centerpiece**: under `hAdm`, `(∃ c ∈ N, T_u c = c) ↔ T_u(c*(u)) = c*(u)` |
| `convex_noncollapse_of_cStar_not_fixed` | condition (c) `T_u(c*(u)) ≠ c*(u)` ⇒ no constant fixed point |
| `convex_fixedpoint_not_mem_of_cStar_not_fixed` | same, as `x* ∉ N` for any convex fixed point |
| `convex_fixedpoint_mkQ_ne_zero` | quotient language: `N.mkQ x* ≠ 0` (no collapse to null class) |

---

## 2. The quotient framing (CLOSED_INTERNAL, trivial)

Let `q = N.mkQ : H → H ⧸ N` be the canonical quotient map. A fixed point `x*` is a
*constant* iff `x* ∈ N` iff `q x* = 0` (`mem_iff_mkQ_eq_zero`). So **collapse = the
fixed point lands in the null class** of `H ⧸ N`, and non-collapse is exactly
`q x* ≠ 0` (`convex_fixedpoint_mkQ_ne_zero`).

This is the correct restatement of "collapse to a constant" in quotient language.
It is formally trivial but it fixes the target: we must keep the iterate's class
off `0`.

---

## 3. Obstruction: the convex update does NOT descend to `H ⧸ N`

The naive plan would be to build an *induced map* `T̄_u : H ⧸ N → H ⧸ N` with
`q ∘ T_u = T̄_u ∘ q`, and then show its only fixed point sits off the null class.
This plan is **obstructed**:

> A well-defined induced map requires `T_u` to respect `N`-cosets:
> `x − x' ∈ N ⟹ T_u x − T_u x' ∈ N`. The metric projection onto a general
> convex set `s` is **not** linear and **not** `N`-equivariant, so this
> implication fails in general. There is no canonical induced quotient map for
> the convex update.

This is exactly why the **linear**-subspace residual analysis in
`QICNH5Derivation.lean` (`noncollapse_from_forcing`, using `Q = id − P_N` linear)
does not transfer: it leaned on linearity of `P_N`. In the convex case the
quotient-map route is closed.

Verdict on the literal "induced map on `H ⧸ N`" object:
`OBSTRUCTED_INTERNAL` — no canonical induced convex quotient map exists; the
descent equivariance fails for nonlinear convex projection. (This is documented,
not mechanized as a concrete counterexample; constructing an explicit
non-equivariant `s` in Lean is deferred and is not needed for the positive
result below, which sidesteps descent entirely.)

---

## 4. Direct attack on the collapse mode: condition (c)

Instead of inducing a full quotient map, attack the collapse mode at its single
representative. The null class `0 ∈ H ⧸ N` has a distinguished, computable
representative: `c*(u) ∈ N`, so `q(c*(u)) = 0`. The candidate condition is

```
(c)   T_u(c*(u)) ≠ c*(u)
      i.e.  convexProjection s (K c*(u) + Γ u) ≠ c*(u)
```

"the linear collapse candidate `c*(u)` is not a fixed point of the convex
update."

### 4.1 Reduction: the collapse search collapses to one point

`collapse_iff_cStar_fixed` proves, under `hAdm`:

```
(∃ c ∈ N, T_u c = c)   ↔   T_u(c*(u)) = c*(u)
```

- **Forward** (uses `hAdm`): a convex constant fixed point `c` satisfies the
  linear projected equation `P_N(K c + Γ u) = c` (variational reduction), so by
  Banach uniqueness `c = c*(u)` (`cStarConstant_unique`), hence `T_u(c*(u)) =
  T_u(c) = c = c*(u)`.
- **Backward** (immediate, no `hAdm`): `c*(u) ∈ N` always
  (`cStarConstant_mem`), so if `T_u` fixes it, it is itself a collapsed fixed
  point.

So the infinite collapse search "is there ANY constant fixed point in `N`?"
reduces to the **single point check** "does `T_u` move `c*(u)`?". Condition (c) is
the negation of the RHS, hence forces non-collapse
(`convex_noncollapse_of_cStar_not_fixed`, `convex_fixedpoint_mkQ_ne_zero`).

### 4.2 Circularity test — PASS

`c*(u)` is defined purely from primitives `N, K, Γ` (the linear Banach wrapper,
reused verbatim); `T_u(c*(u))` evaluates the primitive convex map at that
primitive point. Condition (c) **never references the convex fixed point** nor the
non-existence of a collapsed fixed point. It is a checkable condition on
`s, N, K, Γ, u` only. It is **not H5 in disguise**.

### 4.3 Not self-defeating (contrast with (b)) — PASS

Candidate (b) `c*(u) ∉ s` was refuted because `hAdm ⇒ c*(u) ∈ s`. Condition (c)
is consistent with `hAdm`: it allows `c*(u) ∈ s` (admissible) yet asks that
`T_u` move it. Admissibility of `c*(u)` does **not** force `T_u(c*(u)) = c*(u)`
(a point of `s` need not be its own projection image of `K·+Γu`). So (c) is
non-vacuous on the very route that gives it teeth.

### 4.4 Honest strength accounting — NOT weaker than (a)

Condition (c) lives in the regime `hAdm`, which forces `N ⊆ s`. The strong static
exclusion (a) `s ∩ N = ∅` is **impossible** in that regime (`0 ∈ N`). Therefore:

> (c) is **NOT** "strictly weaker than (a)". (a) and (c) are **incompatible
> regimes**: (a) forbids the admissibility that (c) requires.

This is the central honesty point. The previously open goal was a single
non-circular condition *strictly weaker than (a)*. Condition (c) does **not**
satisfy that literal goal — it is not comparable to (a). What (c) *is*: the
non-circular criterion for the **hard regime (a) cannot touch** — the regime where
constants are admissible (`N ⊆ s`), which is precisely where collapse is a genuine
dynamical threat rather than a static impossibility.

### 4.5 Equivalence, not mere sufficiency — and why that is still useful

Under `hAdm`, (c) is **equivalent** to non-collapse (§4.1 is an iff), not merely
sufficient. A skeptic may object: "an equivalent condition is just non-collapse
relabeled — circular." The distinction that rescues (c):

- Non-collapse, as stated, **quantifies over all of `N`** and asks for
  non-existence of a fixed point — it requires solving the convex fixed-point
  problem on the whole constant subspace.
- (c) is a **single-point primitive check** on a computable point `c*(u)` that is
  obtained from `N, K, Γ` by a Banach iteration *without reference to the convex
  dynamics' fixed point*.

So (c) is a genuine **reduction of the decision problem**: from "search all of `N`"
to "evaluate `T_u` once at `c*(u)`". It is equivalent in truth-value but strictly
simpler to check, and non-circular in construction. That is the advance.

---

## 5. Anti-gerrymandering statement

No object was tuned to force the result. `c*(u)` is the same linear fixed point
used in verified `QICNH5Derivation.lean`; `hAdm` is the same hypothesis of the
verified `QICNH5Convex.lean` reduction; `cStarConstant_unique` is plain Banach
uniqueness (`ContractingWith.fixedPoint_unique`); `N ⊆ s` is forced by `c = 0`,
not chosen. No ad-hoc hypothesis was introduced to smuggle the conclusion. The
honest limitations (no descent map; (c) not weaker than (a); (c) equivalent to
non-collapse) are stated plainly rather than hidden.

---

## 6. Internal verdict (composite, honest)

```
QUOTIENT_FRAMING (collapse = null class of H/N): CLOSED_INTERNAL (trivial)
  mem_iff_mkQ_eq_zero; convex_fixedpoint_mkQ_ne_zero

INDUCED_CONVEX_QUOTIENT_MAP on H/N: OBSTRUCTED_INTERNAL
  convex projection is not N-equivariant ⇒ no canonical T̄_u : H/N → H/N
  (documented; explicit Lean counterexample deferred, not needed)

SINGLE_POINT_COLLAPSE_REDUCTION (c)  T_u(c*(u)) ≠ c*(u): CLOSED_INTERNAL
  collapse_iff_cStar_fixed : (∃ c∈N, T_u c = c) ↔ T_u(c*(u)) = c*(u)  [needs hAdm]
  circularity: NON_CIRCULAR (c* from primitives N,K,Γ; never the convex fixed pt)
  vacuity:     NON_VACUOUS under hAdm (unlike candidate (b))
  strength:    NOT comparable to (a) — incompatible regimes (a: s∩N=∅ vs hAdm: N⊆s)
  nature:      EQUIVALENT to non-collapse, but a checkable single-point primitive
               criterion — a reduction of the decision problem, not a circular alias

MINIMAL_NONCIRCULAR_EXCLUSION_STRICTLY_WEAKER_THAN_(a): STILL_OPEN
  Not achieved. (c) is non-circular and minimal-in-checking-cost but lives in the
  COMPLEMENTARY regime to (a), so it does not answer the literal "weaker than (a)"
  question. Whether a single condition dominates BOTH regimes remains open.

FULL_BASECORE_H5_DERIVED_NONCIRCULARLY (convex, general s): NOT_PROVED
```

**Composite verdict: PARTIAL ADVANCE.** The quotient framing is mechanized; the
literal induced-quotient-map route is obstructed (nonlinearity); and the
collapse mode is attacked directly with a non-circular, non-vacuous, single-point
criterion (c) that — in the admissible regime `N ⊆ s` where collapse is a real
threat — is provably equivalent to convex non-collapse and reduces the whole-`N`
search to one point check. This is a real reduction, but it is **not** the
strictly-weaker-than-(a) minimal exclusion that remains the open target, and it
does **not** derive general BaseCore H5.

---

## 7. Recommended next track (if still open)

1. **Unify regimes.** Seek a condition phrased on the quotient drift that
   specializes to (a) when `s ∩ N = ∅` and to (c) when `N ⊆ s`, i.e. dominates
   both regimes. Likely object: a lower bound on `‖q(T_u x) − q(x)‖` (quotient
   displacement) at the candidate, rather than a coset-equivariant induced map.
2. **Mechanize the descent obstruction** as an explicit finite-dimensional
   counterexample (e.g. `H = ℝ²`, `N` a line, `s` a half-plane/ball) to upgrade
   §3 from documented to `REFUTED_INTERNAL`.
3. **Quantitative (c).** Replace the qualitative `T_u(c*(u)) ≠ c*(u)` by a margin
   `‖T_u(c*(u)) − c*(u)‖ ≥ δ > 0` to connect to a robustness/identifiability
   bound (Phase 5 evidence-matrix style), still strictly internal.

---

## 8. Non-claims

- No new claim is introduced. No `C_op`, `I_int`, CCR, no-vacuity, identity,
  subjectivity, phenomenality, or consciousness claim is supported.
- Internal conformance only; not external validation, not peer review,
  `external_support_certified = false`.
- The Lean theorems prove: the quotient framing of collapse; the obstruction is
  argued (not mechanized); and the single-point reduction/equivalence (c) under
  bilateral admissibility. They do **not** prove BaseCore H5 in general `s`, nor a
  condition strictly weaker than (a).
- `FULL_COP_MEMBERSHIP: NOT_YET`.

```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION ; external_support_certified=false
```
