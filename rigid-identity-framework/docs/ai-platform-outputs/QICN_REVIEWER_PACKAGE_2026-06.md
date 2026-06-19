# QICN Reviewer Package 2026-06

Status: `NON_CANONICAL_HUMAN_REVIEW_PACKAGE`

Date: 2026-06-19

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
linear algebra. The value of this package is not originality of those
mathematical ingredients. The value is discipline: anti-self-deception,
traceability, and explicit separation between what is proved, what is merely
documented, and what remains open.

Verification snapshot:

```text
lake build
EXIT=0
Build completed successfully (2299 jobs).

grep sorry/admit/axiom in QICNLean/*.lean
COUNT=0
```

## 2. PROBADO EN LEAN

Machine-checked statements are listed by exact Lean file and theorem name.
All paths are under:

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
| `rotation_contraction_no_invariant_line` | `QICNRotationSpectral.lean` | Multiplication by the concrete non-real rotation-contraction scalar has no nontrivial invariant real subspace. | Exact linear-factorization block for the coupled S-instance; not approximate `Iint`. | `[propext, Classical.choice, Quot.sound]` |

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
Build completed successfully (2299 jobs).
```

Grep:

```powershell
Select-String -Path 'QICNLean\*.lean' -Pattern '\bsorry\b|\badmit\b|\baxiom\b' -CaseSensitive
```

Expected current result:

```text
COUNT=0
```

Representative `#print axioms` script:

```lean
import QICNLean.QICNConvexProjection
import QICNLean.QICNContraction
import QICNLean.QICNHilbertInstance
import QICNLean.QICNAttractorConcrete
import QICNLean.QICNNonCollapse
import QICNLean.QICNH5Derivation
import QICNLean.QICNH5Convex
import QICNLean.QICNRotationSpectral

#print axioms QICNLean.convexProjection_lipschitz
#print axioms QICNLean.projected_contraction_exists_fixed_point
#print axioms QICNLean.affine_contracting
#print axioms QICNLean.projected_affine_attractor_isCompact
#print axioms QICNLean.noncollapse_from_H5
#print axioms QICNLean.noncollapse_from_forcing
#print axioms QICNLean.convex_constant_fixedpoint_reduces
#print axioms QICNLean.rotation_contraction_no_invariant_line
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
```

## 3. SOLO DOCUMENTADO

These items are analyzed or scored in documents. They are not mechanically
proved unless explicitly mapped to a Lean theorem above.

| Document | Claim / contribution | Honest status |
|---|---|---|
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_GENUINENESS_CRITERIA.md` | Defines the anti-toy bar for a genuine S-instance: anti-vacuity per invariant plus global disqualification patterns. | Documented criterion. Not a proof that any instance passes. |
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_CONSTRUCTION.md` | Product/simple projected-affine instance attempt scored as `5/6` on documented criteria. | Product structure remains; `Iint` absent/deferred. No integration certified. |
| `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md` | Coupled rotation-contraction instance attempt scored as `5/6`, with exact linear split obstruction supported by Lean. | `Iint` still deferred; exact split block is weaker than approximate integration. |
| `docs/ai-platform-outputs/analysis/QICN_H5_NONCOLLAPSE_CRITIQUE.md` | Critiques H5 circularity and separates the trivial H5 implication from later linear/convex reductions. | H5 general convex case remains open. |
| `docs/ai-platform-outputs/analysis/QICN_IINT_APPROX_DICHOTOMY.md` | Shows `delta_int^lin=sqrt(3)/4>0` under exact linear product class, but `delta_int^approx=0` under broad finite-horizon decoder-coupled surrogates. | Class-dependent result; `Iint` not certified. |
| `docs/ai-platform-outputs/reports/QICN_HUMAN_REVIEWER_GAP_PACKAGE_INDEX.md` | Earlier package index for human review, with `I_int / atomic separator`, evidence surface, literature confrontation, and Phase 7 empirical probes. | Still valid as prior index; this package extends it with Lean/reduction consolidation. |

Important negative included deliberately:

```text
The "5/6 certified" language in the S-instance documents is document-level
internal scoring only. The product and coupled attempts do not certify Iint.
Therefore neither is a full Crit_op member.
```

## 4. ABIERTO Y POR QUE IMPORTA

| Open item | Why it matters | What would close it |
|---|---|---|
| `Iint` / canonical factorization class | This is the only current route that could move `FULL_COP_MEMBERSHIP` away from `NOT_YET`. The dichotomy brackets two extremes: `D_lin` gives a positive margin but is narrow; `D_approx` gives zero margin but is too permissive and decoder-degenerate. | Human modeling decision defining an admissible intermediate class: split decoder/readouts, no schedule-specific decoder, time-homogeneous factor dynamics, capacity bounds independent of epsilon, and a proof of positive margin or explicit failure. |
| H5 general convex non-collapse | Linear/subspace and convex fragments are mechanized, but full geometric exclusion for the general convex carrier is not closed. | A general theorem or counterexample for H5 over closed convex supports and projected affine dynamics. |
| Certified complete S-instance | Existing attempts score several invariants internally, but `Iint` remains absent/deferred. | One concrete `S=(X,Phi,C,R,Gamma,U)` passing all six anti-vacuity criteria with explicit margins, including `Iint`. |
| CCR no-vacuity | Downstream CCR/no-simulability claims cannot outrun the missing integration/no-vacuity burden. | A non-vacuous certified instance plus proof that the relevant CCR conditions are satisfied without circular assumptions. |
| Empirical bridge | Internal Boolean probes and Lean formalization do not establish external bridge support. | Independent empirical protocol, preregistered comparators, external replication, and bridge-specific acceptance criteria. |
| Literature confrontation | Related-work positioning remains incomplete relative to IIT, GWT/GNW, HOT, FEP, predictive processing, operationalism, and personal identity. | Human-written related-work section that states overlaps, conflicts, and differentiators without superiority claims. |
| External validation | Current package has no external certification. | Independent expert review/replication. Current state remains `external_support_certified=false`. |

## 5. COMO LEER ESTE PAQUETE

Suggested route for a referee:

1. Start with BaseCore 01 and 07 in the canonical corpus to understand the
   formal target: projection/contractive dynamics and the six-invariant
   operational criterion.
2. Read the Lean files in this order:
   `QICNConvexProjection.lean`, `QICNContraction.lean`,
   `QICNHilbertInstance.lean`, `QICNAttractorConcrete.lean`.
   This gives the standard Hilbert/Banach machinery.
3. Read H5 materials:
   `QICNNonCollapse.lean`, `QICNH5Derivation.lean`,
   `QICNH5Convex.lean`, then
   `docs/ai-platform-outputs/analysis/QICN_H5_NONCOLLAPSE_CRITIQUE.md`.
   Separate the trivial H5 implication from the stronger data-condition
   reductions.
4. Read the S-instance documents:
   `QICN_S_INSTANCE_GENUINENESS_CRITERIA.md`,
   `QICN_S_INSTANCE_CONSTRUCTION.md`,
   `QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md`.
   Keep `5/6` in its bucket: document-level internal scoring, not `Crit_op`.
5. Read `QICN_IINT_APPROX_DICHOTOMY.md` last. This is the current live
   mathematical decision point: what factorization class is admissible for
   `Iint`?
6. Use the earlier package index
   `docs/ai-platform-outputs/reports/QICN_HUMAN_REVIEWER_GAP_PACKAGE_INDEX.md`
   for the broader gap/evidence/literature context.

## Final Boundary

This package is useful because it says where the floor is solid and where it is
not. The Lean-proved layer is real but standard. The S-instance layer is
partially scored but not integrated. The `Iint` layer is class-dependent. The
external-support layer is absent.

No item in this package upgrades QICN to external validation, real-world
`C_op`, bridge confirmation, consciousness, identity, subjectivity, or
phenomenality.
