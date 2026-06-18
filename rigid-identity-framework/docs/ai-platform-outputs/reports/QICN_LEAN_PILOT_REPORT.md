# QICN Lean Pilot Report

Status: `LEAN_MATHLIB_BUILD_GREEN__HILBERT_CONVEX_INSTANCE_GREEN__COMPACTNESS_PARTIAL__NONCOLLAPSE_GREEN`

Report class: `NON_CANONICAL_INTERNAL_FORMALIZATION_REPORT`

Date: 2026-06-18

Human review: `REQUIRED`

Human curated status: `not_reviewed`

## Scope

This report documents a Lean/mathlib toolchain probe, one small abstract
contraction pilot, a verified Hilbert-space subspace instance, the full
nonempty complete convex-subset projection instance needed for the H1
non-expansiveness step, a partial compactness endpoint, and the trivial H5 to
non-collapse implication.

It is not a BaseCore edit, not a registry entry, not a release artifact, not an
external validation, and not a certified `C_op` instance. It does not prove any
claim about consciousness, identity, subjectivity, agency, phenomenality, CCR,
`I_int`, or no-vacuity of the target class.

The verified Lean artifact lives under:

```text
docs/ai-platform-outputs/formal/lean/
```

## Toolchain

Lean and Lake are installed and usable when `ELAN_HOME` is explicit:

```text
Lean (version 4.31.0, x86_64-w64-windows-gnu, commit 68218e876d2a38b1985b8590fff244a83c321783, Release)
Lake version 5.0.0-src+68218e8 (Lean version 4.31.0)
```

The Lean project pins:

```text
lean-toolchain: leanprover/lean4:v4.31.0
mathlib inputRev: v4.31.0
mathlib rev: fabf563a7c95a166b8d7b6efca11c8b4dc9d911f
```

## Cache Step

`lake exe cache get` was retried after disk cleanup. It completed substantial
download/decompression work but returned exit code 1:

```text
Warning: some files were not found in the cache.
This usually means that your local checkout of mathlib4 has diverged from upstream.
Decompression of already-cached files failed (exit code 1)
```

Interpretation:

- This is not a clean cache pass.
- It is not treated as certification.
- It did not block the later trusted gate, because `lake build` compiled the
  local Lean project successfully from the available mathlib sources/oleans.

## Verified Lean Files

```text
docs/ai-platform-outputs/formal/lean/QICNLean/Basic.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNContraction.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNHilbertInstance.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNConvexProjection.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNAttractorCompact.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNNonCollapse.lean
docs/ai-platform-outputs/formal/lean/QICNLean.lean
```

`Basic.lean` verifies a minimal metric-space smoke theorem:

```text
mathlib_metric_smoke
```

`QICNContraction.lean` verifies two abstract metric-space statements:

```text
nonexpansive_after_contracting
projected_contraction_exists_fixed_point
```

`QICNHilbertInstance.lean` verifies the subspace Hilbert instantiation:

```text
affine_contracting
subspace_starProjection_nonexpansive
hilbert_subspace_projected_affine_fixed_point
```

`QICNConvexProjection.lean` verifies the general nonempty complete convex-subset
Hilbert instantiation:

```text
convexProjection
convexProjection_mem
convexProjection_minimizes
convexProjection_variational
convex_minimizer_unique
convexProjection_lipschitz
hilbert_convex_projected_affine_fixed_point
```

`QICNAttractorCompact.lean` verifies a partial compactness endpoint:

```text
fixedPoint_perturbation_bound
attractor_isCompact
```

`QICNNonCollapse.lean` verifies the logical H5 implication only:

```text
noncollapse_from_H5
```

Informal reading of the verified pilot:

- If `base : X -> X` is `ContractingWith K base`.
- If `project : X -> X` is non-expansive, encoded as `LipschitzWith 1 project`.
- Then the composed update `fun x => project (base x)` is still
  `ContractingWith K`.
- In a complete metric space, mathlib's Banach fixed-point API gives a fixed
  point and convergence of iterates for the composed update.

## Green Build Gate

The trusted Lean gate was:

```text
lake build
```

Earlier abstract-pilot result:

```text
Build completed successfully (1652 jobs).
```

Hilbert-subspace instance result:

```text
Build completed successfully (2290 jobs).
```

Hilbert convex-subset instance result:

```text
EXIT=0
Build completed successfully (2291 jobs).
```

Compactness partial result:

```text
EXIT=0
Build completed successfully (2292 jobs).
```

Non-collapse result:

```text
EXIT=0
Build completed successfully (2293 jobs).
```

The build emitted only style warnings about missing mathlib-style copyright
headers in the non-canonical AI-output files:

```text
warning: QICNLean/Basic.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNContraction.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNHilbertInstance.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNConvexProjection.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNAttractorCompact.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNNonCollapse.lean:1:1: * '-/': Copyright too short!
```

No `sorry` was introduced.

The explicit grep gate over `QICNLean.lean` and `QICNLean/**/*.lean` returned:

```text
COUNT=0
```

## What This Proves

This proves only the abstract mathlib-level skeleton:

```text
strict contraction + non-expansive post-map => strict contraction
complete metric space + strict contraction => fixed point and iterate convergence
```

The Hilbert-subspace instance additionally proves:

```text
bounded linear K with ||K|| < 1 => x |-> K x + c is ContractingWith ||K||_+
orthogonal projection onto a complete linear subspace is LipschitzWith 1
projected affine update has a fixed point and convergent iterates
```

The Hilbert convex-subset instance additionally proves:

```text
nonempty complete convex s => metric projection P_s exists by choice
P_s satisfies the variational inequality from mathlib's minimizer theorem
minimizers are unique by the two crossed variational inequalities
P_s is LipschitzWith 1
x |-> P_s (K x + c) has a fixed point and convergent iterates when ||K|| < 1
```

The compactness partial additionally proves:

```text
fixedPoint_perturbation_bound:
  same-K contractions with a uniform pointwise perturbation bound have fixed
  points within C / (1 - K)

attractor_isCompact:
  if F : U -> H is continuous and U is compact, then Set.range F is compact
```

It deliberately does not prove `Continuous Gamma -> Continuous (fun u => f_u*)`
for the concrete projected affine Hilbert family in this pass.

The non-collapse file proves only:

```text
fixedPoint(u) in N + T_u(fixedPoint(u)) = fixedPoint(u) contradicts H5
```

It does not justify H5.

This is a real formalization result, but still narrow. It is a useful pressure
test for the BaseCore contraction prose because Lean forces these obligations to
be explicit:

- the ambient space must be a metric/complete metric space;
- the update must be a strict `ContractingWith K`;
- the projection-like map must be supplied as non-expansive;
- convergence is obtained through mathlib's fixed-point API, not by prose.

## Mathlib Lemmas Discharged

Affine contraction:

- `ContinuousLinearMap.lipschitz` supplies `LipschitzWith ||K||_+ K`.
- `LipschitzWith.of_dist_le_mul` packages the translated affine map as a
  Lipschitz map after the distance simplification
  `dist (K x + c) (K y + c) = dist (K x) (K y)`.
- `exact_mod_cast` discharges `||K||_+ < 1` from the real hypothesis
  `||K|| < 1`.

Projection non-expansiveness, subspace case:

- `Submodule.starProjection` provides the orthogonal projection as
  `H ->L[R] H` for a complete linear subspace.
- `Submodule.starProjection_norm_le` gives `||U.starProjection|| <= 1`.
- `ContinuousLinearMap.lipschitzWith_of_opNorm_le` converts that operator-norm
  bound into `LipschitzWith 1 (fun x => U.starProjection x)`.

Projection existence/non-expansiveness, complete convex case:

- `exists_norm_eq_iInf_of_complete_convex` supplies existence of a minimizer for
  each `u` over a nonempty complete convex subset.
- `norm_eq_iInf_iff_real_inner_le_zero` supplies the variational inequality
  characterization of minimizers.
- `inner_neg_right`, `inner_neg_left`, `inner_sub_left`, `inner_add_left`,
  `real_inner_self_eq_norm_sq`, `real_inner_le_norm`, and
  `le_of_mul_le_mul_right` discharge the standard uniqueness and
  non-expansiveness proof from the crossed variational inequalities and
  Cauchy-Schwarz.

Assembly:

- `QICNLean.nonexpansive_after_contracting` composes the affine contraction with
  the non-expansive projection.
- `QICNLean.projected_contraction_exists_fixed_point` applies mathlib's Banach
  fixed-point API to obtain fixed point plus convergence of iterates.

Compactness/non-collapse:

- `ContractingWith.fixedPoint_lipschitz_in_map` supplies the fixed-point
  perturbation estimate.
- `isCompact_range` supplies compactness of the range of a continuous selector
  over a compact domain.
- `QICNLean.noncollapse_from_H5` uses no analytic lemma; it is a direct
  contradiction from fixed-pointness plus H5.

## Projection Status

Status: `INSTANCIA_CONVEXA_COMPLETA`

Mathlib v4.31.0 has the Hilbert projection theorem for complete convex subsets:

```text
exists_norm_eq_iInf_of_complete_convex
norm_eq_iInf_iff_real_inner_le_zero
```

This pass defines the metric projection by `Classical.choose` over
`exists_norm_eq_iInf_of_complete_convex`, extracts membership/minimality and the
variational inequality via `norm_eq_iInf_iff_real_inner_le_zero`, proves
uniqueness of minimizers from the two crossed variational inequalities, and
proves `LipschitzWith 1` for the resulting projection map.

```text
convexProjection_lipschitz :
  LipschitzWith 1 (fun u => convexProjection s hne hcl hc u)

hilbert_convex_projected_affine_fixed_point :
  fixed point + iterate convergence for fun x => convexProjection s hne hcl hc (K x + c)
```

This discharges the H1 convex projection non-expansiveness obligation at the
Hilbert/mathlib level. It still does not define the full QICN/BaseCore state
space or certify a `C_op` instance.

`#print axioms` for the final convex theorem:

```text
'QICNLean.hilbert_convex_projected_affine_fixed_point' depends on axioms: [propext, Classical.choice, Quot.sound]
```

## Attractor Compactness Status

Status: `PARCIAL_DEFERRAL_CONTINUITY_FROM_GAMMA`

The file `QICNAttractorCompact.lean` mechanizes two pieces:

```text
fixedPoint_perturbation_bound
attractor_isCompact
```

The concrete continuity bridge from H4,

```text
Continuous Gamma -> Continuous (fun u => f_u*)
```

is not discharged in this pass. The theorem `attractor_isCompact` therefore
takes the continuity of the fixed-point selector as an explicit hypothesis.
This is a deliberate deferral, not an implicit claim.

`#print axioms` for the compactness theorem:

```text
'QICNLean.attractor_isCompact' depends on axioms: [propext, Classical.choice, Quot.sound]
```

## Noncollapse Status

Status: `H5_IMPLIES_NONCOLLAPSE_MECHANIZED_TRIVIAL`

The file `QICNNonCollapse.lean` proves:

```text
noncollapse_from_H5
```

This is only the logical step from H5 to no-collapse. It does not justify H5 or
derive H5 from `K`, `Gamma`, projection geometry, quotient dynamics, or any
nonconstant forcing condition.

`#print axioms` for the non-collapse theorem:

```text
'QICNLean.noncollapse_from_H5' does not depend on any axioms
```

## What This Does Not Prove

This does not formalize:

- the QICN state space;
- the full BaseCore state space;
- the concrete H4 bridge `Continuous Gamma -> Continuous (fun u => f_u*)`;
- any non-circular derivation of H5;
- invariance of any `C_op` certificate;
- existence of an admissible system `S`;
- `I_int`, CCR, no-vacuity, no-simulability, identity, phenomenality, or
  consciousness claims.

The correct next formal step is not to inflate this pilot. The next step is to
exhibit the actual analytic objects and connect this Hilbert/mathlib theorem to
the intended BaseCore objects:

```text
BaseCore object definitions
target set is nonempty/closed/complete where needed
the affine operator and intervention term are the intended BaseCore objects
```

## Prior Failure Now Resolved

Earlier retries were blocked by disk pressure and by the missing canonical file:

```text
corpus/pdf_release/pdf_corpus.zip
```

That file was restored before this successful retry. The prior `DEFERRED`
decision is superseded by the green `lake build` above, but the prior root-gate
failure remains historically relevant because it prevented a clean commit before
the restoration.

## Non-Claims

- No external validation is claimed.
- No full BaseCore/QICN system theorem or `C_op` instance is claimed formalized.
- No canonical source, registry, release, `.tex`, monolithic paper, production
  code, or `package.json` was modified.
- This is an internal, non-canonical Lean pilot for human review.
