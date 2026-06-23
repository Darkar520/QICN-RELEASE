> **SUPERSEDED (2026-06-23).** Este an�lisis fue producido durante la
> exploraci�n de H5 convexo y la lectura D*/Iint. Las decisiones definitivas se
> adoptaron en:
> - QICN_H5_PARTIAL_REGIME_MODELING_DECISION.md (H5: r�gimen (a) snN=�)
> - QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md (Iint: D* adoptado)
>
> Este archivo se conserva como registro hist�rico del red-team adversarial.
> No es el estado actual del framework.

---
# QICN H5 — Convex Geometric-Exclusion Red-Team

```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION
external_support_certified = false
Layer: SPECULATIVE / NON_CANONICAL.  No NEW_CLAIM.  FULL_COP_MEMBERSHIP: NOT_YET.
```

Status: `NON_CANONICAL_SPECULATIVE_ANALYSIS`
Date: 2026-06-18
Role: internal hostile referee (red-team). Negative / STILL_OPEN results are
valid and preferred over forced closure.
Human review: `REQUIRED`
Human curated status: `not_reviewed`

This note is internal adversarial scrutiny with referee-level rigor. It is **not**
external validation, **not** peer review, and does **not** certify any QICN claim.
It does not modify canon, registry, release, monolithic, package.json, or the
pre-existing `.lean` files (other than adding the import of the new file).

---

## 0. The referee's challenge (faced, not dodged)

> "H5 is ad-hoc: it assumes the obstruction. Your linear reduction works, but
> BaseCore's real projection is convex/non-linear, and there you showed the
> forcing condition is vacuous. Either give a NON-CIRCULAR geometric condition
> that derives convex non-collapse, or admit H5 stays an unjustified axiom in the
> real convex case." And: "Any 'geometric exclusion' you propose — prove it is
> not H5 in disguise (circular)."

This is taken at face value. The verified prior state is:

- `noncollapse_from_H5` (`QICNNonCollapse.lean`): H5 ⇒ non-collapse, trivial.
- `noncollapse_from_forcing` (`QICNH5Derivation.lean`): in the **linear** subspace
  case, H5 reduces to non-circular data conditions C1 (invariance) + C2
  (projected forcing). Genuine reduction, but depends on linearity of
  `Submodule.starProjection`.
- `convex_constant_fixedpoint_reduces` (`QICNH5Convex.lean`): in the **convex**
  case, any constant fixed point `c ∈ N` must satisfy the linear projected
  equation `P_N (K c + Γ u) = c`. Variational, requires bilateral admissibility
  `hAdm : ∀ c ∈ N, ∀ n ∈ N, c + n ∈ s`.
- Vacuity obstruction: the naive universal forcing `∀ c ∈ N, P_N(Kc+Γu) ≠ c` is
  unsatisfiable, because `c ↦ P_N(Kc+Γu)` is a Banach contraction on `N`
  (`‖K‖<1`, `P_N` non-expansive) with a unique fixed point `c*`.

Open question carried in: is there a geometric exclusion on the projection set
`I`/`s` that (i) implies convex non-collapse and (ii) is non-circular (about the
static geometry of `s, N, K, Γ`, not about the fixed point)?

---

## 1. Mechanized artifact

Lean file (new):
`docs/ai-platform-outputs/formal/lean/QICNLean/QICNH5ConvexExclusion.lean`

Build: `lake build` EXIT 0 — "Build completed successfully (2291 jobs)". Only
header-style linter warnings (identical seal-header warnings as the existing
`QICNCoupledSplitMarginUniversal.lean`); no errors.

`#print axioms` for all 8 theorems: `[propext, Classical.choice, Quot.sound]`
only. No `sorry`, no extra axioms.

| Theorem | Role |
|---|---|
| `constants_inadmissible_of_inter_empty` | `s ∩ N = ∅` ⇔ pointwise `∀ x ∈ s, x ∉ N` (static restatement) |
| `convexProjection_not_mem_of_inadmissible` | candidate (a) strength witness: projection output is never constant, for ANY input |
| `convex_noncollapse_from_constants_inadmissible` | candidate (a): inadmissibility of constants ⇒ no constant fixed point |
| `cStarConstant` (def) | the dynamically-selected constant `c*(u)`, fixed point of `c ↦ P_N(Kc+Γu)` on `N`, from primitive data only |
| `cStarConstant_fixed` | `c*(u)` solves `P_N(K c* + Γu) = c*` |
| `cStarConstant_mem` | `c*(u) ∈ N` (it is a projection output) |
| `bilateral_admissibility_forces_N_subset` | `hAdm` ⇒ `N ⊆ s` (take `c = 0`) |
| `cStar_admissible_under_reduction_hypotheses` | under `hAdm`, `c*(u) ∈ s` always |
| `candidate_b_self_defeating` | `hAdm` ∧ `c*(u) ∉ s` ⇒ `False` |

---

## 2. Candidate (a): strong static exclusion — `s ∩ N = ∅`

**Statement.** No constant is admissible: `∀ x ∈ s, x ∉ N` (equivalently
`s ∩ N = ∅`).

**Implication.** Mechanized in `convex_noncollapse_from_constants_inadmissible`:
any constant fixed point `c = convexProjection s … (K c + Γ u)` satisfies
`c ∈ s` (projection output), hence `c ∉ N`. There is no constant fixed point.

The strength witness `convexProjection_not_mem_of_inadmissible` shows something
even stronger and honest: under (a) the projection output is never a constant
**for any input `y`**, independent of `K`, `Γ`, `u`, and even of fixed-pointness.
Non-collapse here is not a dynamical fact at all; it is a static fact about the
range of the projection.

**Circularity test.** PASS (non-circular). The hypothesis `hExcl` quantifies only
over `s` and `N` — static primitive data. It does **not** mention or quantify over
the fixed point, the dynamics `T_u`, or the non-existence of a constant fixed
point. It is strictly more primitive than H5.

**Strength test.** STRONG, bordering on trivializing. (a) does not exclude the
*collapse mode*; it excludes *every constant from the admissible set*. It implies
H5, but by removing constants from the playing field entirely. Mechanically it is
incompatible with the variational reduction lemma's own hypothesis: `hAdm` forces
`N ⊆ s` while (a) forces `s ∩ N = ∅`; since `0 ∈ N`, the two cannot both hold
(`0` would be both in and out of `s`). So (a) lives in a regime where BaseCore's
convex projection set literally contains no constants.

**Honest verdict on (a):** a genuine, non-circular geometric exclusion that
closes convex non-collapse — but it is a strong condition (no admissible
constant), not a minimal one, and it sidesteps rather than explains the collapse
mode. It must not be presented as the minimal reduction.

---

## 3. Candidate (b): weaker single-point exclusion — `c*(u) ∉ s`

**Statement.** Only the dynamically-selected constant candidate is inadmissible:
`∀ u, c*(u) ∉ s`, where `c*(u)` is the unique fixed point of the linear affine
contraction `c ↦ P_N(K c + Γ u)` on `N`.

**Why it looks attractive.** It is strictly weaker as a set condition: it removes
a single point `c*(u)` from `s` instead of all of `N`. And `c*(u)` is the *only*
constant that the variational reduction can produce: by
`convex_constant_fixedpoint_reduces`, any constant fixed point `c ∈ N` of `T_u`
satisfies `P_N(K c + Γu) = c`, i.e. `c` is a fixed point of the same contraction,
so by uniqueness `c = c*(u)`. So excluding `c*(u)` *should* exclude every constant
fixed point.

**Circularity test.** PASS (non-circular) as a condition in isolation. `c*(u)` is
defined purely from `N, K, Γ` (mechanized: `cStarConstant`, reusing the linear
Banach wrapper `h5ProjectedAffineFixedPoint`). It never references `T_u` (the
convex update) nor its fixed point. So a condition on `c*(u)` is not H5 in
disguise.

**Sufficiency / vacuity test.** FAIL on the only route that gives implication.
To turn "`c` is a convex constant fixed point" into "`c = c*(u)`" you must invoke
`convex_constant_fixedpoint_reduces`, whose hypothesis `hAdm` (bilateral
admissibility along `N`) is mechanically shown to force `N ⊆ s`
(`bilateral_admissibility_forces_N_subset`, taking `c = 0`). Since `c*(u) ∈ N`
(`cStarConstant_mem`), `hAdm` gives `c*(u) ∈ s`
(`cStar_admissible_under_reduction_hypotheses`). Therefore the candidate-(b)
hypothesis `c*(u) ∉ s` is **inconsistent** with `hAdm`
(`candidate_b_self_defeating`: `hAdm ∧ c*(u) ∉ s ⇒ False`).

In other words: (b)'s exclusion is satisfiable only when the reduction machinery
that gives (b) its teeth is unavailable. Drop `hAdm` and the reduction fails — a
convex constant fixed point `c` with `convexProjection(Kc+Γu)=c` need **not**
satisfy `P_N(Kc+Γu)=c`, so `c` need not equal `c*(u)`, so excluding `c*(u)` alone
does not exclude `c`. Keep `hAdm` and (b)'s hypothesis is vacuous. Either way (b)
is not a usable non-circular reduction.

This mirrors, at the single-point level, the vacuity obstruction already found
for the naive universal forcing condition: the same contraction structure on `N`
that always produces a `c*` is what makes any "exclude the projected constant"
condition collapse once the admissibility needed for the reduction is in place.

**Honest verdict on (b):** non-circular but self-defeating / insufficient. Refuted
as a usable weaker replacement for H5 in the convex case.

---

## 4. Anti-gerrymandering statement

No definition was tuned to force closure. `cStarConstant` is exactly the linear
fixed point already used in the verified `QICNH5Derivation.lean`; `hAdm` is
exactly the hypothesis of the verified `QICNH5Convex.lean` reduction lemma; the
`N ⊆ s` collapse is forced by instantiating `c = 0`, not by a chosen variant.
Candidate (a) closes the problem but is **strong**, and this note states so
plainly rather than dressing it as the minimal condition. No minimal non-circular
geometric exclusion was found.

---

## 5. Internal verdict

```
CONVEX_NONCOLLAPSE_FROM_STRONG_STATIC_EXCLUSION (a): CLOSED_INTERNAL
  condition: s ∩ N = ∅  (no admissible constant)
  circularity: NON_CIRCULAR (static; only s, N)
  strength: STRONG (excludes all constants; input-independent; not minimal)
  incompatibility: mutually exclusive with the reduction lemma's hAdm

CONVEX_NONCOLLAPSE_FROM_WEAK_SINGLE_POINT_EXCLUSION (b): REFUTED_INTERNAL
  condition: c*(u) ∉ s
  circularity: NON_CIRCULAR (c* from primitive data N,K,Γ)
  usability: SELF_DEFEATING (hAdm ⇒ c* ∈ s) / INSUFFICIENT (no hAdm ⇒ no reduction)

MINIMAL_NONCIRCULAR_GEOMETRIC_EXCLUSION_FOR_CONVEX_NONCOLLAPSE: STILL_OPEN
  No condition strictly weaker than (a) was found that both implies convex
  non-collapse and is non-circular. The collapse mode itself is not addressed by
  (a); a condition targeting the quotient H/N drift (cf. prior critique table)
  remains unformalized and is the recommended next track.

FULL_BASECORE_H5_DERIVED_NONCIRCULARLY (convex): NOT_PROVED
```

**Composite verdict: PARTIAL — CLOSED_INTERNAL under a strong condition (a),
REFUTED_INTERNAL for the weaker single-point route (b), STILL_OPEN for a minimal
non-circular exclusion.** The referee's demand is answered honestly: a
non-circular geometric exclusion that derives convex non-collapse *does* exist,
but the only one mechanized that closes the case is strong (no admissible
constant); every attempt at a strictly weaker non-circular condition either
becomes vacuous under the reduction's admissibility hypothesis or is insufficient
without it. H5 in the general convex case is therefore reducible to a strong
static geometric exclusion, not yet to a minimal one.

---

## 6. Non-claims

- No new claim is introduced. No `C_op`, `I_int`, CCR, no-vacuity, identity,
  subjectivity, phenomenality, or consciousness claim is supported.
- Internal conformance only; not external validation, not peer review.
- The Lean theorems prove: (a) a strong-exclusion non-collapse implication and a
  range-level strength witness; (b) the self-defeating/vacuity of the
  single-point exclusion under the reduction hypotheses. They do **not** prove
  BaseCore H5 in general, nor a minimal non-circular convex reduction.
- `FULL_COP_MEMBERSHIP: NOT_YET`.
```
INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION ; external_support_certified=false
```
