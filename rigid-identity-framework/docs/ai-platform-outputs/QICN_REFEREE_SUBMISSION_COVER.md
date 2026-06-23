# QICN — Referee Submission Cover

Status: `NON_CANONICAL_REFEREE_ENTRY_POINT`
Date: 2026-06-23
Human review: `REQUIRED`  ·  Human curated status: `not_reviewed`
`external_support_certified = false`  ·  `FULL_COP_MEMBERSHIP: NOT_YET`

> This is the single entry point for an external mathematician/referee. It is a
> honest map, not a claim of validation. Everything below is **internal**
> machine-checked or documented work; none of it constitutes external
> validation, peer review, or any claim about consciousness, phenomenality, or
> human equivalence. A negative referee verdict is a fully acceptable outcome.

---

## 1. What this is (and is not), in one paragraph

QICN is a research corpus with two separable layers. **(L1) An applied-math
core** (`BaseCore`): Hilbert-space metric projection, strict contraction, Banach
fixed points, compact attractor families, and a six-invariant *operational
criterion grammar* (`C_op`). **(L2) A speculative interpretive program** that
*names* these structures with identity/subjectivity/consciousness vocabulary.
**The submission we ask you to evaluate is L1 only.** L2 is flagged throughout
as a research program with explicit open debts; it is **not** claimed proven.

The mathematics in L1 that is machine-checked is **standard** (Banach + Hilbert).
The contribution we put forward is not novelty of those theorems but: (i) a
**machine-checked** foundational kernel, (ii) an explicit operational-criterion
grammar with a minimality theorem, and (iii) honest, mechanized **reductions**
of the framework's load-bearing assumptions to more primitive conditions, with
the residual gaps stated precisely.

---

## 2. What we are asking you (the questions only a referee can settle)

1. **Canonical reading of integration (`Iint`).** Integration is defined
   relative to an admissible factorization class. We adopted the **structural,
   split-readout, decoder-free** class `D*` (under which the worked example has a
   positive, machine-checked margin `≥ √7/14`). Under a **behavioral
   simulability** class `D_approx` (arbitrary reconstruction decoder), the margin
   is `0`. **Which reading is the standard the field expects?** This is a
   modeling decision we deliberately did **not** finalize in the canonical
   source, to avoid defining the result into existence. (See
   `analysis/QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md`,
   `analysis/QICN_IINT_APPROX_DICHOTOMY.md`.)

2. **Is L1 publishable as applied math** (operational-criterion grammar +
   fixed-point/compactness theory + machine-checked kernel), **independent of**
   the consciousness vocabulary?

3. **Do the mechanized reductions** (H5 → forcing/invariance in the linear case;
   the `D*` integration margin) count as meaningful contributions, or as routine
   exercises?

4. **Are the open gaps in §5 the right ones**, and is any of them mis-stated as
   closed?

---

## 3. Machine-checked results (the asset) — and how to verify in ~10 minutes

All Lean files are under
`docs/ai-platform-outputs/formal/lean/QICNLean/`. Toolchain: Lean 4.31.0 +
mathlib v4.31.0.

```powershell
cd .../rigid-identity-framework/docs/ai-platform-outputs/formal/lean
$env:ELAN_HOME="$env:USERPROFILE\.elan"
& "$env:USERPROFILE\.elan\bin\lake.exe" build      # expect EXIT 0, "Build completed successfully (2361 jobs)"
```
Then `#print axioms <thm>` for any theorem below should show only
`[propext, Classical.choice, Quot.sound]` (and `noncollapse_from_H5`: no axioms).
A grep for `sorry|admit|axiom` over `QICNLean/*.lean` returns `0`.

| Result | File · theorem | Maps to BaseCore |
|---|---|---|
| Convex metric projection: existence, variational ineq., uniqueness, 1-Lipschitz; projected-affine fixed point | `QICNConvexProjection.lean` | `thm:projection`, `lem:nonexp`, `thm:contraction`, `thm:fixedpoint` |
| Concrete attractor compactness from H1–H4 (continuity discharged) | `QICNAttractorConcrete.lean · projected_affine_attractor_isCompact` | `thm:compactness` |
| H5 ⇒ non-collapse (logical step only) | `QICNNonCollapse.lean · noncollapse_from_H5` | `thm:noncollapse` (implication) |
| H5 reduced to data conditions C1/C2 (**linear case**) | `QICNH5Derivation.lean · noncollapse_from_forcing` | H5 reduction (linear) |
| Convex constant-fixed-point variational reduction | `QICNH5Convex.lean · convex_constant_fixedpoint_reduces` | H5 (convex fragment) |
| H5 convex geometric exclusion: (a) `s∩N=∅ ⇒ non-collapse`; (b) weaker exclusion refuted | `QICNH5ConvexExclusion.lean` | H5 (convex, candidate analysis) |
| H5 convex non-collapse **conditional** under subspace dichotomy `(D)` (unifies static `s∩N=∅` and bilateral `N⊆s`); partial regime `EXTERNAL_REQUIRED` | `QICNH5QuotientDynamics.lean`, `QICNH5QuotientDisplacement.lean`, `QICNH5UnilateralBridge.lean` | H5 (convex, conditional); general H5 `NOT_PROVED` |
| Rotation-contraction has no real invariant line (exact factorization block) | `QICNRotationSpectral.lean · rotation_contraction_no_invariant_line` | `Iint` exact obstruction |
| Integration margin kernel `√7/14` (fiber-thinness + corner chain) | `QICNCoupledSplitMargin.lean` | `Iint` quantitative |
| **Universal** integration margin over the adopted `D*` class | `QICNCoupledSplitMarginUniversal.lean · dstar_universal_margin` | `Iint` global, class-relative |

Honest qualifier on the strongest items:
- `dstar_universal_margin` is a genuine `∀`-quantifier over an explicitly
  specified `D*` structure, but it is **class-relative**: its load-bearing
  modeling commitment (coordinate-aligned, decoder-free reproduction) is a
  disambiguation of the canonical text, not forced by it. Hence `Iint` is
  **`CLOSED_INTERNAL_UNDER_ADOPTED_D*`** but **`STILL_OPEN` canonically** (this
  is exactly question 1).
- The H5 convex exclusion (a) is non-circular but **strong** (excludes all
  admissible constants); the minimal non-circular exclusion is open.

---

## 4. Conditional / documented results (not machine-closed)

Operational-criterion grammar, minimality of the six invariants, the genuineness
criteria for a candidate system `S`, and two worked instance attempts (a product
example and a coupled rotation example) are in the canonical `.tex` and in
`docs/ai-platform-outputs/analysis/`. The coupled instance scores 5/6 invariants
at the documented level; `Iint` is the contested one (question 1).

---

## 5. Open gaps (stated precisely; none claimed closed)

| Gap | Type of resolution it needs |
|---|---|
| Canonical reading of `Iint` (`D*` vs behavioral) | **Referee / community decision** (question 1); editing the definition unilaterally would be moving the goalposts |
| Minimal non-circular H5 exclusion (convex) | Open mathematics |
| A certified complete `C_op` instance (all six invariants, positive margins) | Open mathematics / construction |
| No-vacuity of the criterion class (CCR) | Open mathematics; gated on the instance above |
| Empirical bridge (discrete computational probes ↔ continuous theory) | **External empirical data + protocol** |
| Confrontation with IIT / GWT-GNW / HOT / FEP / personal-identity literature | Human-written related work (no superiority claims) |
| External validation | **This review.** `external_support_certified` stays `false` until then |

---

## 6. Suggested reading order

1. `basecore/core/sections/01_foundation_from_core.tex` (H1–H5, the dynamics).
2. `basecore/core/sections/07_operational_criterion_absorbed.tex` (the six
   invariants, `C_op`, minimality; note `def:iint` is class-parametric and names
   the `D_approx` failure mode explicitly).
3. The Lean files in §3, in listed order; verify with the recipe.
4. `docs/ai-platform-outputs/QICN_REVIEWER_PACKAGE_2026-06.md` (fuller index:
   proved / documented / open buckets).
5. The `Iint` analysis trio:
   `QICN_IINT_APPROX_DICHOTOMY.md`, `QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md`,
   `QICN_IINT_GLOBAL_QUANTIFIER_REDTEAM.md`.

---

## 7. Boundary (read before forming a verdict)

Passing any internal check here certifies **internal model conformity only**. It
does **not** imply external validation, membership of any real system in `C_op`,
or any claim about consciousness, identity, subjectivity, phenomenality, CCR,
no-vacuity, or human equivalence. Where a result is class-relative or conditional,
that is stated. The corpus's own governance forbids presenting internal
conformance as external validation; this cover follows that rule.
