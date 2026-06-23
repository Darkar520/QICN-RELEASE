# QICN H5 — Convex Non-Collapse via Quotient DISPLACEMENT (Red-Team)

```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.
```

Status: `NON_CANONICAL_ADVERSARIAL_ANALYSIS`
Date: 2026-06-22
Role: internal hostile referee (red-team). A `STILL_OPEN` verdict or a demonstrated
`OBSTRUCTION` are valid results, preferred over forced closure. No theorem was
forced; no strong unifier was fabricated.
Human review: `REQUIRED`
Human curated status: `not_reviewed`

This note is internal adversarial scrutiny with referee-level rigor. It is **not**
external validation, **not** peer review, and does **not** certify any QICN claim.
It does not modify canon, registry, release, monolithic, package.json, gates, or
the pre-existing `.lean` files (other than adding one additive import to the
aggregator `QICNLean.lean`).

---

## 0. Carry-in state (verified previously; not re-derived)

From `QICN_H5_QUOTIENT_DYNAMICS_REDTEAM.md` and its Lean artifacts
(`QICNH5QuotientDynamics.lean`), reused verbatim:

- Quotient framing: collapse of a fixed point `x*` is `x* ∈ N` ⟺ `q x* = 0`
  (`q = N.mkQ`), via `mem_iff_mkQ_eq_zero`.
- Single-point reduction `collapse_iff_cStar_fixed`: under bilateral admissibility
  `hAdm`, a convex constant fixed point exists iff `T_u(c*(u)) = c*(u)`, where
  `c*(u) = cStarConstant N K Γ hK u` is the primitive linear collapse candidate
  (the unique fixed point of `c ↦ P_N(K c + Γ u)` on `N`, built only from
  `N, K, Γ`).
- Condition (c) `T_u(c*(u)) ≠ c*(u)`: `CLOSED_INTERNAL`, non-circular, non-vacuous,
  but lives in the regime `N ⊆ s` (forced by `hAdm`), **incompatible** with the
  strong static regime (a) `s ∩ N = ∅` (since `0 ∈ N`).
- The convex update does **not** descend to `H ⧸ N` (nonlinearity of metric
  projection): `OBSTRUCTED`, previously documented but **not** mechanized.

The prior note's §7 listed three follow-up tracks. This note executes all three.

Reused objects (verbatim): `convexProjection`, `convexProjection_variational`,
`convex_minimizer_unique`, `cStarConstant`, `cStarConstant_fixed`,
`cStarConstant_mem`, `convex_constant_fixedpoint_reduces`,
`bilateral_admissibility_forces_N_subset`, `convexProjection_not_mem_of_inadmissible`,
`convex_fixedpoint_mkQ_ne_zero`, `mem_iff_mkQ_eq_zero`.

---

## 1. Mechanized artifact

Lean file (new):
`docs/ai-platform-outputs/formal/lean/QICNLean/QICNH5QuotientDisplacement.lean`

Build: `lake build` EXIT 0 — "Build completed successfully (2360 jobs)" (baseline
before this file: 2305 jobs; +55 jobs). Only header-style seal-linter warnings
(same as the existing sealed files); no errors.

`#print axioms` for all 13 declarations: `[propext, Classical.choice, Quot.sound]`
only. No `sorry`, no `admit`, no extra axioms. (Verified with a scratch file that
was then deleted.)

| Declaration | Track | Role |
|---|---|---|
| `convexProjection_eq_of_variational` | helper | projection pinned by its variational inequality |
| `convexProjection_of_mem` | helper | projection of an admissible point is itself |
| `convexProjection_mem_N_implies_starProjection_eq` | 1 | **new reduction**: convex image in `N` ⇒ equals `P_N` |
| `cStar_image_mem_N_iff_eq` | 1 | under `hAdm`: `T_u(c*(u)) ∈ N ↔ T_u(c*(u)) = c*(u)` |
| `quotientDriftAtCStar` (+ `_eq`) | 1 | drift value `‖q(T_u(c*))−q(c*)‖ = ‖q(T_u(c*))‖` |
| `regime_a_implies_quotient_displacement` | 1 | **(a) ⇒ (Q)** (no `hAdm`) |
| `quotient_displacement_iff_cStar_moved` | 1 | **(Q) ⟺ (c)** under `hAdm` |
| `regimes_incompatible` | 1 | obstruction: `hAdm ∧ s∩N=∅ ⇒ False` |
| `noncollapse_of_quotient_displacement` | 1 | (Q) + `hAdm` ⇒ `q x* ≠ 0` |
| `quotient_le_collapse_displacement` | 3 | `‖q(T_u(c*))‖ ≤ ‖T_u(c*) − c*‖` |
| `noncollapse_of_positive_margin` | 3 | `0 < ‖q(T_u(c*))‖` + `hAdm` ⇒ non-collapse |
| `halfspace_projection` | 2 | closed-form half-space projection |
| `convex_projection_not_N_equivariant` | 2 | **explicit ℝ² counterexample** to coset descent |

---

## 2. Track 1 (headline) — the quotient-displacement condition

Define the candidate displacement at the primitive collapse point `c*(u)`:

```
drift(u) = ‖q(T_u(c*(u))) − q(c*(u))‖_{H/N}      (quotientDriftAtCStar)
         = ‖q(T_u(c*(u)))‖                        (quotientDriftAtCStar_eq, since q(c*)=0)

(Q)  drift(u) > 0   ⟺   q(T_u(c*(u))) ≠ 0   ⟺   T_u(c*(u)) ∉ N.
```

`(Q)` is non-circular: it mentions only the primitives `s, N, K, Γ, u` (and `c*(u)`,
itself built from `N, K, Γ`). It never references the convex fixed point.

### 2.1 Specialization (i): regime (a) ⇒ (Q)

`regime_a_implies_quotient_displacement`: if `∀ x ∈ s, x ∉ N` (the `s ∩ N = ∅`
form), then `q(T_u(c*(u))) ≠ 0`. Proof: `T_u(c*(u)) ∈ s ⇒ ∉ N`. **No `hAdm`
required.** So (Q) is a downward specialization of the strong static regime.

### 2.2 Specialization (ii): regime (c) ⟺ (Q)

The new lemma `convexProjection_mem_N_implies_starProjection_eq` strengthens the
prior variational reduction: it drops the fixed-point hypothesis and shows that
**any** convex image landing in `N` must equal `P_N` of its argument (same
bilateral variational argument: for `n ∈ N`, `y + n ∈ s` by `hAdm`, so the residual
is `N`-orthogonal). Applying it at `a = K c*(u) + Γ u` and using
`cStarConstant_fixed` gives

```
cStar_image_mem_N_iff_eq :  T_u(c*(u)) ∈ N  ↔  T_u(c*(u)) = c*(u)     [needs hAdm]
```

i.e. the only way the collapse image is a constant is by being the **fixed**
constant `c*(u)`. Negating both sides:

```
quotient_displacement_iff_cStar_moved :  (Q)  ⟺  (c)                  [needs hAdm]
```

So in the admissible regime the quotient-displacement condition is **exactly**
condition (c) — not stronger, not weaker. This is the genuinely new content: it
identifies `‖q(T_u(c*(u)))‖` as the correct quantitative carrier of (c).

### 2.3 (Q) forces non-collapse in the admissible regime

`noncollapse_of_quotient_displacement`: `(Q) + hAdm ⇒ q x* ≠ 0` for every convex
fixed point (via the iff + the prior `convex_fixedpoint_mkQ_ne_zero`).

### 2.4 Why this is NOT a regime-free "domination" — the obstruction (HONEST)

The literal Track-1 goal was a **single** condition specializing to both (a) and (c)
and thereby **dominating both regimes**. The honest result:

- (Q) **is** the right unifying *quantity*: implied by (a) (§2.1), equivalent to
  (c) under `hAdm` (§2.2).
- (Q) is **not** a single *regime-free hypothesis* that implies non-collapse on its
  own. The bridge "(Q) ⇒ no fixed point in `N`" uses the bilateral reduction, which
  needs `hAdm`. And `regimes_incompatible` mechanizes that `hAdm` and `s ∩ N = ∅`
  are **contradictory** (`0 ∈ N` forces `0 ∈ s` under `hAdm`, which (a) forbids).

So the two specialization routes live in **disjoint** regimes; there is no single
regime where both mechanisms are simultaneously available, hence no merge into one
unconditional domination theorem. This is a **demonstrated obstruction**, not a
gap left unexamined.

```
QUOTIENT_DISPLACEMENT_UNIFYING_QUANTITY (Q):              CLOSED_INTERNAL
  (a) ⇒ (Q)        regime_a_implies_quotient_displacement  (no hAdm)
  (Q) ⟺ (c)        quotient_displacement_iff_cStar_moved   (under hAdm)
  (Q) ⇒ noncollapse  noncollapse_of_quotient_displacement  (under hAdm)

SINGLE_REGIME_FREE_HYPOTHESIS_DOMINATING_BOTH_REGIMES:    STILL_OPEN
  Obstruction MECHANIZED: regimes_incompatible (hAdm ∧ s∩N=∅ ⇒ False).
  The (Q)⇒noncollapse bridge requires hAdm; regime (a) forbids hAdm.
  No regime-free single hypothesis is available on this route.
```

**Track 1 verdict: PARTIAL ADVANCE.** A single quotient-displacement quantity `(Q)`
is mechanized that specializes to (a) and is equivalent to (c); the literal
"domination by one regime-free condition" is `STILL_OPEN`, with the exact
obstruction (regime disjointness + `hAdm`-dependence of the reduction) mechanized.
No domination theorem is claimed.

---

## 3. Track 2 — descent obstruction as explicit counterexample (`OBSTRUCTED_INTERNAL`)

`convex_projection_not_N_equivariant` upgrades §3 of the prior note from
*documented* to a *mechanized counterexample*. In `H = ℝ²` (`EuclideanSpace ℝ
(Fin 2)`):

- `N = ker⟨e₁, ·⟩` — the first coordinate axis (a line);
- `s = {w | 0 ≤ ⟨(1,1), w⟩}` — a nonempty closed convex half-space (closedness via
  continuity of `⟨n,·⟩`; convexity via `convex_halfSpace_ge`);
- `x = (0,−2)`, `x' = (3,−2)`.

Then `x − x' = (−3,0) ∈ N` (same coset: `q x = q x'`), but the metric projections
are `proj x = (1,−1)` (computed by `halfspace_projection`) and `proj x' = (3,−2)`
(`convexProjection_of_mem`, as `x' ∈ s`), whose difference `(−2,1)` has nonzero
`e₁`-component, hence `∉ N`: `q(proj x) ≠ q(proj x')`.

Therefore the convex update does **not** respect `N`-cosets and there is **no**
canonical induced quotient map `T̄_u : H/N → H/N`. The data is honest (genuine
closed convex half-space, genuine line); it is tuned only to break
coset-equivariance, **not** to assist Track 1 (it uses no `K, Γ, c*`).

```
INDUCED_CONVEX_QUOTIENT_MAP on H/N:  OBSTRUCTED_INTERNAL (explicit counterexample)
  convex_projection_not_N_equivariant  (concrete ℝ², line N, half-space s)
```

---

## 4. Track 3 — quantitative margin (HONEST)

`quotient_le_collapse_displacement`:

```
‖q(T_u(c*(u)))‖  ≤  ‖T_u(c*(u)) − c*(u)‖.
```

The H-displacement margin is at least the quotient drift `δ := ‖q(T_u(c*(u)))‖`
(proof: `q(c*) = 0`, then the quotient seminorm bound `‖q y‖ ≤ ‖y‖`).
`noncollapse_of_positive_margin` turns `0 < δ` into non-collapse under `hAdm`.

**Honesty on δ.** `δ` is **primitive-derived** — a seminorm of the
primitive-defined quotient image of `T_u(c*(u))` — not an assumed constant. But:

- `δ ≥ 0` always; `δ > 0` is **equivalent to the exclusion (Q)** itself (and hence
  to (c) under `hAdm`). So the margin's *positivity* is not free: it **is** the open
  condition.
- There is **no universal positive lower bound** `δ ≥ δ₀ > 0` derivable from the
  abstract primitives. The reported margins like `√7/14` elsewhere
  (`QICNCoupledSplitMargin`) come from a **concrete** instance (the coupled rotation
  carrier), not from the abstract convex skeleton. Fabricating a universal numeric
  `δ₀` here would be dishonest, so none is claimed.

```
MARGIN_LOWER_BOUND  ‖q(T_u(c*))‖ ≤ ‖T_u(c*) − c*‖:        CLOSED_INTERNAL
POSITIVE_MARGIN ⇒ NONCOLLAPSE (under hAdm):              CLOSED_INTERNAL
UNIVERSAL_POSITIVE_CONSTANT δ₀ > 0 FROM PRIMITIVES:       NOT_AVAILABLE (declined)
  δ>0 ⟺ exclusion (Q); no free universal margin exists abstractly.
```

**Track 3 verdict: CLOSED_INTERNAL for the bound + positive-margin implication;
the "explicit universal δ₀" is declined as not honestly derivable** (it would be
either instance-specific or a relabeling of the open exclusion).

---

## 5. Anti-gerrymandering statement

No object was tuned to force a result. `c*(u)`, `hAdm`, `cStarConstant_fixed`,
`convex_fixedpoint_mkQ_ne_zero`, `convexProjection_not_mem_of_inadmissible`,
`bilateral_admissibility_forces_N_subset` are all reused verbatim from verified
files. The new reduction `convexProjection_mem_N_implies_starProjection_eq`
generalizes the existing `convex_constant_fixedpoint_reduces` by the same
variational argument (no new admissibility smuggled). The Track-2 counterexample
uses a generic closed convex half-space and a generic line; its points are chosen
**only** to violate coset-equivariance and are unrelated to the Track-1 `K, Γ, c*`
machinery. The honest limitations (no regime-free domination; δ-positivity ⟺
exclusion; no universal numeric margin) are stated plainly.

---

## 6. Internal verdict (composite, honest)

```
TRACK 1 (quotient displacement unifier):
  (Q) as unifying QUANTITY:                CLOSED_INTERNAL
     (a) ⇒ (Q);  (Q) ⟺ (c) under hAdm;  (Q) ⇒ noncollapse under hAdm
  single regime-free DOMINATION condition: STILL_OPEN
     obstruction MECHANIZED (regimes_incompatible; hAdm-dependence of reduction)

TRACK 2 (induced quotient map / descent):  OBSTRUCTED_INTERNAL
     explicit ℝ² counterexample convex_projection_not_N_equivariant

TRACK 3 (quantitative margin):
  margin bound + positive-margin ⇒ noncollapse: CLOSED_INTERNAL
  universal positive constant δ₀ from primitives: NOT_AVAILABLE (declined, honest)

FULL_BASECORE_H5_DERIVED_NONCIRCULARLY (convex, general s): NOT_PROVED
```

**Composite verdict: PARTIAL ADVANCE + one OBSTRUCTION mechanized.** The
quotient-displacement quantity `(Q)` is identified and proven to specialize to both
regimes (implied by (a); equivalent to (c) under `hAdm`); a single regime-free
dominating condition remains `STILL_OPEN` with the obstruction now mechanized; the
descent obstruction is upgraded to an explicit counterexample; and the quantitative
margin is bounded honestly without inventing a universal constant. This is **not**
a derivation of general BaseCore H5 and **not** external validation.

---

## 7. Recommended next track (if still open)

1. **Weaken the bridge, not the regime.** Seek a non-circular condition that implies
   non-collapse **without** full bilateral `hAdm` — e.g. one-sided admissibility or
   a cone condition — so that a single hypothesis could straddle the regime gap that
   `regimes_incompatible` exposes. This is the live open target.
2. **Closed `N` refinement.** With `IsClosed (N : Set H)` the quotient seminorm is a
   genuine norm; then `δ = 0 ⟺ q(T_u(c*)) = 0` becomes an iff, sharpening Track 3 to
   `δ > 0 ⟺ (Q)`.
3. **Instance-level numeric margin.** Build a concrete `K, Γ, s` (e.g. extending the
   Track-2 half-space) where `c*(u)` and `T_u(c*(u))` are computable, to exhibit an
   explicit numeric `δ` — clearly labelled instance-specific, never universal.

---

## 8. Non-claims

- No new claim is introduced. No `C_op`, `I_int`, CCR, no-vacuity, identity,
  subjectivity, phenomenality, or consciousness claim is supported.
- Internal conformance only; not external validation, not peer review,
  `external_support_certified = false`.
- The Lean theorems prove: the quotient-displacement specializations and their
  obstruction (Track 1); an explicit descent counterexample (Track 2); a margin
  lower bound and positive-margin non-collapse (Track 3). They do **not** prove
  BaseCore H5 in general `s`, a single regime-free dominating exclusion, or a
  universal positive margin.
- `FULL_COP_MEMBERSHIP: NOT_YET`.

```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION ; external_support_certified=false
```
