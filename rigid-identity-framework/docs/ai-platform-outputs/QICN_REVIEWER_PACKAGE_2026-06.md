# QICN Reviewer Package 2026-06

Status: `NON_CANONICAL_HUMAN_REVIEW_PACKAGE`

Date: 2026-06-19 (refreshed 2026-06-20: added `dstar_universal_margin` and the
H5 convex-exclusion candidate analysis; build job count updated to 2304.
Refreshed 2026-06-23: added the three H5 quotient/displacement/unilateral-bridge
files to the machine-checked table; build job count updated to 2361)

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Related prior index:
`docs/ai-platform-outputs/reports/QICN_HUMAN_REVIEWER_GAP_PACKAGE_INDEX.md`

## 1. ALCANCE Y FRONTERA

This package is internal formal infrastructure plus honest reductions for a
mathematician/referee. It is not external validation, not a claim of
consciousness, identity, subjectivity, phenomenality, CCR, human equivalence,
or real-world `C_op` membership.

Current hard status:

```text
external_support_certified=false
FULL_COP_MEMBERSHIP: NOT_YET
```

The mechanized mathematics here is standard: Banach fixed-point structure,
Hilbert projection geometry, convex projection non-expansiveness, and finite
linear/metric algebra. The value is discipline: anti-self-deception,
traceability, and explicit separation between what is machine-checked, what is
documented, and what remains open.

Verification snapshot:

```text
lake build
EXIT=0
Build completed successfully (2361 jobs).

grep sorry/admit/axiom in QICNLean/*.lean
COUNT=0
```

## 2. PROBADO EN LEAN

Machine-checked statements are listed by exact Lean file and theorem name. All
paths are under:

```text
docs/ai-platform-outputs/formal/lean/QICNLean/
```

| Theorem / definition | File | One-line content | Canon mapping | Axioms |
|---|---|---|---|---|
| `convexProjection`, `convexProjection_mem`, `convexProjection_minimizes`, `convexProjection_variational`, `convex_minimizer_unique`, `convexProjection_lipschitz` | `QICNConvexProjection.lean` | Metric projection onto a nonempty complete convex set exists, satisfies the variational inequality, has uniqueness, and is `1`-Lipschitz. | BaseCore 01: `thm:projection`, `lem:nonexp`; supports projected H1/H2. | `convexProjection_lipschitz`: `[propext, Classical.choice, Quot.sound]` |
| `nonexpansive_after_contracting`, `projected_contraction_exists_fixed_point` | `QICNContraction.lean` | Composition of a contraction with a non-expansive map remains contractive; Banach fixed point and convergence wrapper. | BaseCore 01: `thm:contraction`, `thm:fixedpoint`. | `projected_contraction_exists_fixed_point`: `[propext, Classical.choice, Quot.sound]` |
| `affine_contracting`, `hilbert_subspace_projected_affine_fixed_point` | `QICNHilbertInstance.lean` | Affine contractive map `x -> Kx+c` is contractive when `||K||<1`; subspace-projection instance. | BaseCore 01 H2/H3 affine contraction special case. | `affine_contracting`: `[propext, Classical.choice, Quot.sound]` |
| `projectedAffineMap_contracting`, `projectedAffineFixedPoint_lipschitz`, `projectedAffineFixedPoint_continuous`, `projected_affine_attractor_isCompact` | `QICNAttractorConcrete.lean` | Concrete projected-affine fixed-point selector is Lipschitz/continuous and has compact range over compact `U`. | BaseCore 01: `thm:compactness`; continuity hypothesis discharged for this concrete family. | `projected_affine_attractor_isCompact`: `[propext, Classical.choice, Quot.sound]` |
| `noncollapse_from_H5` | `QICNNonCollapse.lean` | Pure implication from assumed H5 anti-constant fixed-point condition to non-collapse. | BaseCore H5 implication only; does not justify H5. | no axioms |
| `noncollapse_from_forcing` | `QICNH5Derivation.lean` | Linear-subspace reduction of non-collapse to forcing plus invariance data conditions C1/C2. | H5 reduction in the linear/subspace case, not the general convex case. | `[propext, Classical.choice, Quot.sound]` |
| `convex_constant_fixedpoint_reduces` | `QICNH5Convex.lean` | Convex variational reduction showing fixed-point/collapse tension under constant fixed-point hypothesis. | Convex H5 reduction fragment; not full H5 general closure. | `[propext, Classical.choice, Quot.sound]` |
| `rotation_contraction_no_invariant_line` | `QICNRotationSpectral.lean` | Multiplication by the concrete non-real rotation-contraction scalar has no nontrivial invariant real subspace. | Exact linear-factorization block for the coupled S-instance; not approximate/global `Iint`. | `[propext, Classical.choice, Quot.sound]` |
| `coupled_psi1_fiber_thin`, `coupled_psi2_fiber_thin`, `coupled_split_readout_positive_margin` | `QICNCoupledSplitMargin.lean` | Quantitative split-readout margin kernel: fiber-thinness plus corner-chain arithmetic gives `sqrt(7)/14` from explicit fiber hypotheses. | Supports the adopted structural D* reading of `Iint`; does not mechanize the global quantifier over all admissible D* factorizations. | each: `[propext, Classical.choice, Quot.sound]` |
| `dstar_universal_margin` | `QICNCoupledSplitMarginUniversal.lean` | **Universal** `∀`-quantifier over the explicitly specified `D*` factorization structure: every `DStarFactorization` has margin `≥ sqrt(7)/14`. | `Iint` global **class-relative**: genuine universal over the adopted `D*` class, but the coordinate-aligned/decoder-free modeling commitment is a disambiguation of the canonical text, not forced by it. `CLOSED_INTERNAL_UNDER_ADOPTED_D*`, `STILL_OPEN` canonically. | `[propext, Classical.choice, Quot.sound]` |
| `constants_inadmissible_of_inter_empty`, `convexProjection_not_mem_of_inadmissible`, `convex_noncollapse_from_constants_inadmissible`, `cStarConstant` (def), `cStarConstant_fixed`, `cStarConstant_mem`, `bilateral_admissibility_forces_N_subset`, `cStar_admissible_under_reduction_hypotheses`, `candidate_b_self_defeating` | `QICNH5ConvexExclusion.lean` | H5 convex-case candidate analysis. **(a)** `s ∩ N = ∅ ⇒ convex non-collapse`: non-circular but **strong** (excludes all admissible constants) — `CLOSED_INTERNAL`. **(b)** exclude only the dynamically-selected `c*(u)`: `REFUTED_INTERNAL` — the reduction's admissibility hypothesis forces `N ⊆ s`, hence `c*(u) ∈ s`, making the exclusion vacuous (self-defeating). Minimal non-circular exclusion: `STILL_OPEN`. | H5 (convex carrier) candidate boundary; full general H5 `NOT_PROVED`. | each: `[propext, Classical.choice, Quot.sound]` |
| `collapse_iff_cStar_fixed`, `convex_collapsed_fixedpoint_eq_cStar`, `cStarConstant_unique`, `convex_noncollapse_of_cStar_not_fixed`, `convex_fixedpoint_not_mem_of_cStar_not_fixed` | `QICNH5QuotientDynamics.lean` | Quotient `H/N` framework: under admissibility `hAdm`, collapse over the whole constant subspace `N` reduces to a single-point check on `c*(u)` (`collapse_iff_cStar_fixed`). | H5 convex reduction (single-point), not general closure. `CLOSED_INTERNAL`. | each: `[propext, Classical.choice, Quot.sound]` |
| `quotientDriftAtCStar` (def), `regime_a_implies_quotient_displacement`, `regimes_incompatible`, `noncollapse_of_quotient_displacement`, `noncollapse_of_positive_margin`, `convex_projection_not_N_equivariant` | `QICNH5QuotientDisplacement.lean` | `(Q)=‖q(T_u(c*))‖` as unifying quantity: `(a)⇒(Q)`, `(Q)⟺(c)` under `hAdm`; `regimes_incompatible` (regime-free obstruction); explicit ℝ² non-equivariance counterexample; margin bound. | H5 convex regime-free domination `STILL_OPEN`; obstruction `OBSTRUCTED_INTERNAL`. | each: `[propext, Classical.choice, Quot.sound]` |
| `SubspaceDichotomy` (def), `regime_a_implies_dichotomy`, `bilateral_implies_dichotomy`, `noncollapse_of_subspace_dichotomy`, `dichotomy_regimeA_satisfiable`, `partial_regime_violates_dichotomy` | `QICNH5UnilateralBridge.lean` | `SubspaceDichotomy (D)`: `(∃y∈N∩s)→N⊆s`. Non-circular, strictly weaker than `hAdm`, compatible with regime (a) (`dichotomy_regimeA_satisfiable`, `N≠⊥`). `(D)+(Q)⇒non-collapse`. Partial regime excluded by decree (`partial_regime_violates_dichotomy`). | H5 convex **conditional** under `(D)`; general H5 `NOT_PROVED`. `CLOSED_INTERNAL` (conditional). | each: `[propext, Classical.choice, Quot.sound]` |

### Reproduction Recipe

From:

```powershell
cd C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework\docs\ai-platform-outputs\formal\lean
$env:ELAN_HOME="$env:USERPROFILE\.elan"
& "$env:USERPROFILE\.elan\bin\lake.exe" build
```

Expected current result:

```text
EXIT=0
Build completed successfully (2361 jobs).
```

Grep:

```powershell
Select-String -Path 'QICNLean\*.lean' -Pattern '\b(sorry|admit|axiom)\b'
```

Expected current result:

```text
COUNT=0
```

Representative `#print axioms` script:

```lean
import QICNLean

#print axioms QICNLean.convexProjection_lipschitz
#print axioms QICNLean.projected_contraction_exists_fixed_point
#print axioms QICNLean.affine_contracting
#print axioms QICNLean.projected_affine_attractor_isCompact
#print axioms QICNLean.noncollapse_from_H5
#print axioms QICNLean.noncollapse_from_forcing
#print axioms QICNLean.convex_constant_fixedpoint_reduces
#print axioms QICNLean.rotation_contraction_no_invariant_line
#print axioms QICNLean.coupled_psi1_fiber_thin
#print axioms QICNLean.coupled_psi2_fiber_thin
#print axioms QICNLean.coupled_split_readout_positive_margin
```

Observed current outputs:

```text
'QICNLean.convexProjection_lipschitz' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.projected_contraction_exists_fixed_point' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.affine_contracting' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.projected_affine_attractor_isCompact' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.noncollapse_from_H5' does not depend on any axioms
'QICNLean.noncollapse_from_forcing' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.convex_constant_fixedpoint_reduces' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.rotation_contraction_no_invariant_line' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_psi1_fiber_thin' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_psi2_fiber_thin' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_split_readout_positive_margin' depends on axioms: [propext, Classical.choice, Quot.sound]
```

## 3. SOLO DOCUMENTADO

These items are analyzed or scored in documents. They are not mechanically
proved unless explicitly mapped to a Lean theorem above.

| Document | Claim / contribution | Honest status |
|---|---|---|
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_GENUINENESS_CRITERIA.md` | Defines the anti-toy bar for a genuine S-instance: anti-vacuity per invariant plus global disqualification patterns. | Documented criterion. Not a proof that any instance passes. |
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_CONSTRUCTION.md` | Product/simple projected-affine instance attempt scored as `5/6` on documented criteria. | Product structure remains; `Iint` absent/deferred. No integration certified. |
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md` | Coupled rotation-contraction instance attempt scored at document level, with exact linear split obstruction supported by Lean. | Five invariants are document-level/internal. `Iint` requires the D* reading and the global factorization step; no full `C_op` proof. |
| `docs/ai-platform-outputs/analysis/QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md` | Records the human decision adopting the structural D* reading and the conditional `sqrt(7)/14` margin argument. | D* decision recorded; quantitative kernel machine-checked; global D* quantifier documented, not fully mechanized. |
| `docs/ai-platform-outputs/analysis/QICN_DEFIINT_TIGHTENING_PROPOSAL.md` | Draft text to tighten `def:iint` around the D* structural reading. | `DRAFTED_NOT_APPLIED`; no `.tex` touched. Requires Phase-2/4 protocol and external audit before canon edit. |
| `docs/ai-platform-outputs/analysis/QICN_H5_NONCOLLAPSE_CRITIQUE.md` | Critiques H5 circularity and separates the trivial H5 implication from later linear/convex reductions. | H5 general convex case remains open. |
| `docs/ai-platform-outputs/analysis/QICN_IINT_APPROX_DICHOTOMY.md` | Shows `delta_int^lin=sqrt(3)/4>0` under exact linear product class, but `delta_int^approx=0` under broad finite-horizon decoder-coupled surrogates. | Class-dependent result; explains why the adopted D* class is structural rather than behavioral. |
| `docs/ai-platform-outputs/reports/QICN_HUMAN_REVIEWER_GAP_PACKAGE_INDEX.md` | Earlier package index for human review, with `I_int / atomic separator`, evidence surface, literature confrontation, and Phase 7 empirical probes. | Still valid as prior index; this package links to it rather than duplicating it. |

Important negative included deliberately:

```text
The "5/6 certified" language in S-instance documents is document-level
internal scoring only. Under the adopted D* reading the coupled instance has a
machine-checked margin kernel, but the global D* quantifier and canonical
def:iint tightening are not machine-closed here. Therefore no full Crit_op
membership is proved.
```

## 4. ABIERTO Y POR QUE IMPORTA

| Open item | Why it matters | What would close it |
|---|---|---|
| Global `Iint` quantifier over all D* factorizations | `dstar_universal_margin` now mechanizes a genuine `∀` over the explicitly specified `DStarFactorization` structure (margin `≥ sqrt(7)/14`). The residual gap is **not** the quantifier itself but the **class-relativity**: the `D*` structure encodes the coordinate-aligned / decoder-free disambiguation, which is a modeling commitment not forced by the canonical text. | Referee adjudication that the adopted `D*` class is the correct canonical reading (question 1), or a canonical `def:iint` tightening under governance — not more Lean. |
| Canonical `def:iint` precision | The D* reading is adopted in this non-canonical layer, but BaseCore `.tex` has not been tightened. | Apply `QICN_DEFIINT_TIGHTENING_PROPOSAL.md` only after Phase-2/4 governance, external audit, and human approval. |
| Certified complete S-instance | Existing attempts score several invariants internally. The coupled instance is strongest under D*, but full proof is still not complete. | One concrete `S=(X,Phi,C,R,Gamma,U)` passing all six anti-vacuity criteria with explicit margins and a closed global `Iint` argument. |
| CCR no-vacuity | Downstream CCR/no-simulability claims cannot outrun the missing full `C_op`/integration/no-vacuity burden. | A non-vacuous certified instance plus proof that the relevant CCR conditions are satisfied without circular assumptions. |
| H5 general convex non-collapse | Linear/subspace and convex fragments are mechanized, but full geometric exclusion for the general convex carrier is not closed. | A general theorem or counterexample for H5 over closed convex supports and projected affine dynamics. |
| Empirical bridge | Internal Boolean probes and Lean formalization do not establish external bridge support. | Independent empirical protocol, preregistered comparators, external replication, and bridge-specific acceptance criteria. |
| Rival/literature confrontation | Related-work positioning remains incomplete relative to IIT, GWT/GNW, HOT, FEP, predictive processing, operationalism, and personal identity. | Human-written related-work section that states overlaps, conflicts, and differentiators without superiority claims. |
| External validation | Current package has no external certification. | Independent expert review/replication. Current state remains `external_support_certified=false`. |

## 5. ESTATUS C_op - BLINDAJE ANTI-INFLACION

```text
Bajo la lectura adoptada D*, la instancia acoplada satisface los 6 invariantes
a nivel INTERNO/documentado (5 documentados + Iint con margen-kernel
mecanizado y cuantificador global asumido). Esto es CONFORMIDAD INTERNA
CONDICIONAL, NO prueba de C_op, NO validacion externa.

FULL_COP_MEMBERSHIP: NOT_YET

Motivos estrictos:
- falta mecanizacion del cuantificador global sobre toda factorizacion D*;
- falta precision canonica aplicada de def:iint;
- falta validacion externa.
```

Forbidden reading:

```text
Do not read this as "C_op proved", "Crit_op certified", "CCR closed", or
external validation. No item in this package licenses consciousness, identity,
subjectivity, phenomenality, superiority, human equivalence, or bridge
confirmation.
```

## 6. COMO LEER ESTE PAQUETE

Suggested route for a referee:

1. Start with BaseCore 01 and 07 in the canonical corpus to understand the
   formal target: projection/contractive dynamics and the six-invariant
   operational criterion.
2. Read the Lean files in this order:
   `QICNConvexProjection.lean`, `QICNContraction.lean`,
   `QICNHilbertInstance.lean`, `QICNAttractorConcrete.lean`,
   `QICNRotationSpectral.lean`, `QICNCoupledSplitMargin.lean`,
   `QICNCoupledSplitMarginUniversal.lean` (the universal `D*` margin, read with
   its class-relative qualifier).
3. Read H5 materials:
   `QICNNonCollapse.lean`, `QICNH5Derivation.lean`,
   `QICNH5Convex.lean`, `QICNH5ConvexExclusion.lean` (convex candidate
   analysis: (a) strong / closed, (b) refuted), then the quotient-reduction
   trilogy `QICNH5QuotientDynamics.lean` (single-point reduction
   `collapse_iff_cStar_fixed`), `QICNH5QuotientDisplacement.lean`
   (`(Q)` unifying quantity, `regimes_incompatible`),
   `QICNH5UnilateralBridge.lean` (`SubspaceDichotomy (D)` ⇒ conditional
   non-collapse), then
   `docs/ai-platform-outputs/analysis/QICN_H5_NONCOLLAPSE_CRITIQUE.md` and
   `docs/ai-platform-outputs/analysis/QICN_H5_CONVEX_EXCLUSION_REDTEAM.md`.
4. Read the coupled S-instance and Iint materials:
   `QICN_S_INSTANCE_GENUINENESS_CRITERIA.md`,
   `QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md`,
   `QICN_IINT_APPROX_DICHOTOMY.md`,
   `QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md`, and
   `QICN_DEFIINT_TIGHTENING_PROPOSAL.md`.

The central reviewer question is now sharper, not solved away:

```text
Is the adopted D* structural reading the correct canonical reading of def:iint,
and can the global D* quantifier be formalized without smuggling the desired
integration result into the definition?
```


## 7. H5 CONVEXO — CIERRE DE LA LÍNEA (2026-06-22)

`external_support_certified=false` · `FULL_COP_MEMBERSHIP: NOT_YET` · machine-checked, NON_CANONICAL

Tres fases Lean adversariales (todas EXIT 0, axiomas `[propext, Classical.choice, Quot.sound]`, sin sorry):

| Archivo Lean | Resultado | Estatus |
|---|---|---|
| `QICNH5QuotientDynamics.lean` | Marco de cociente H/N; `collapse_iff_cStar_fixed` (↔ bajo `hAdm`): el colapso sobre todo `N` se reduce a un chequeo de un punto `c*(u)`. | CLOSED_INTERNAL (reducción no circular) |
| `QICNH5QuotientDisplacement.lean` | `(Q)=‖q(T_u(c*))‖` cantidad unificadora: `(a)⇒(Q)`, `(Q)⟺(c)` bajo `hAdm`; `regimes_incompatible` (obstrucción regime-free); contraejemplo ℝ² de no-equivarianza; cota de margen. | CLOSED_INTERNAL + OBSTRUCTED_INTERNAL |
| `QICNH5UnilateralBridge.lean` | `SubspaceDichotomy (D)`: `(∃y∈N∩s)→N⊆s`. No circular, estrictamente más débil que `hAdm`, compatible con régimen (a) (`dichotomy_regimeA_satisfiable`, `N≠⊥`). `(D)+(Q)⇒no-colapso`. | CLOSED_INTERNAL (condicional bajo `(D)`) |

### Resultado neto (honesto)
**El no-colapso convexo (H5) está mecanizado como teorema CONDICIONAL bajo la
hipótesis `(D)` (dicotomía de subespacio).** `(D)` unifica los dos regímenes
conocidos (estático `s∩N=∅` y bilateral `N⊆s`) bajo una sola hipótesis no
circular. **H5 BaseCore general (s convexo arbitrario) sigue `NOT_PROVED`.**

### Decisión de modelado pendiente (pregunta para referee)
`(D)` excluye por decreto el **régimen parcial** (donde `s` corta parcialmente el
subespacio de constantes `N`: algunas constantes admisibles, otras no), mecanizado
en `partial_regime_violates_dichotomy`. La pregunta abierta, que es de **modelado /
matemático externo**, no de tooling:

> **¿El conjunto admisible `s` de BaseCore puede cortar parcialmente el subespacio
> de constantes `N`?**
> - **Si NO** → `(D)` es la hipótesis canónica y H5 convexo queda cerrado en su
>   dominio (condicional bajo `(D)`, con `(D)` siempre válida en BaseCore).
> - **Si SÍ** → el régimen parcial es `EXTERNAL_REQUIRED`: necesita input
>   matemático externo (regularidad/tangencia de `∂s` a lo largo de `N`).

Postura adoptada (anti-inflación): **NO se declara "no puede pasar"** (sería definir
el resultado a conveniencia). H5 convexo se presenta como **condicional bajo `(D)`**;
la aplicabilidad de `(D)` al `s` real de BaseCore se difiere a revisión humana.
