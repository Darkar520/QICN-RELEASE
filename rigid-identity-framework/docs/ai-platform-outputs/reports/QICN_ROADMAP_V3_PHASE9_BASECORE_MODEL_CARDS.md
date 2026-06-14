# QICN Roadmap v3 Phase 9 - BaseCore Model Cards

Status: AI_EXTRACTED_REVIEW_REQUIRED
Date: 2026-06-14
Scope: BaseCore central results only
Human review: REQUIRED
Human curated cards: 0

This report is an extraction scaffold. It does not validate, sign, canonize, or
upgrade any theorem. All cards below remain machine-extracted and
human-curated status is `not_reviewed`.

## Preflight Classification

| Surface | Status | Notes |
|---|---|---|
| `basecore/BASECORE.tex` | FUNCTIONAL | BaseCore source file present. |
| `basecore/core/sections/*.tex` | FUNCTIONAL | Section tree present and used for anchors. |
| `registry/theorems.jsonl` | FUNCTIONAL | Registry entries found for selected cards. |
| `registry/schema.json` | FUNCTIONAL | Schema present; JSON output is non-canonical. |
| `docs/CLAIM_STATUS_POLICY.md` | FUNCTIONAL | Used for non-upgrade and `not_reviewed` policy. |
| `docs/THEORY_CLAIM_LEDGER.md` | FUNCTIONAL | Present. |
| `docs/FALSIFIER_MATRIX.md` | FUNCTIONAL | Present. |
| Phase 4 BaseCore context reports | FUNCTIONAL | Phase 4 hardening reports present under `docs/ai-platform-outputs/reports/`. |

## Selection Rationale

`basecore/BASECORE.tex:117` states that BaseCore proves contractive projection
dynamics, inverse-limit identity under non-finite-determination assumptions,
conditional rigidity under admissible perturbation models, and conditional
non-simulability of CCR targets by finite simulator classes. The Phase 9 prompt
asks for 3-4 central cards. I therefore selected four cards:

1. `basecore:theorem:thm-fixedpoint` as the strong uniqueness result, with
   metric projection and contractivity listed as dependencies.
2. `basecore:definition:identity-as-inverse-limit-l19` because the text treats
   inverse-limit identity as a central BaseCore object, but it is a definition,
   not a proved theorem.
3. `basecore:theorem:thm-rigidity` for conditional rigidity/stability under
   admissible perturbation.
4. `basecore:theorem:thm-non-simulability` for conditional CCR non-simulability.

The projection theorem `basecore:theorem:thm-projection` is not omitted
semantically: it is treated as a dependency of the fixed-point uniqueness card
to keep the pass within the requested 3-4 card scope.

## Summary Table

| id | type | proof_status | estado_epistemico | deuda | human_curated_status |
|---|---|---|---|---|---|
| `basecore:theorem:thm-fixedpoint` | theorem | present | PROVED_CONDITIONAL | Standard theorem dependencies and explicit H1-H3 only | not_reviewed |
| `basecore:definition:identity-as-inverse-limit-l19` | definition | not_applicable | DEFINITION_ONLY | Category/index/object discipline must remain explicit | not_reviewed |
| `basecore:theorem:thm-rigidity` | theorem | sketch/heuristic | DOWNSTREAM_FORMAL_DEBT | RIG assumptions plus hidden compactness/Hausdorff well-definedness burden | not_reviewed |
| `basecore:theorem:thm-non-simulability` | theorem | present | DOWNSTREAM_FORMAL_DEBT | NS taxonomy, faithful simulation, and CCR target burden remain open | not_reviewed |

## Model Card 1

id: `basecore:theorem:thm-fixedpoint`
nombre: Unique Fixed Point
tipo: theorem
human_review: REQUIRED
human_curated_status: not_reviewed
machine_extracted_disclaimer: This card is AI-extracted and not a signed human curation artifact.

source_anchor:
- Statement: `basecore/core/sections/01_foundation_from_core.tex:140-149`
- Proof: `basecore/core/sections/01_foundation_from_core.tex:151-153`
- Dependency anchors:
  - H1: `basecore/core/sections/01_foundation_from_core.tex:35-37`
  - H2: `basecore/core/sections/01_foundation_from_core.tex:39-41`
  - H3: `basecore/core/sections/01_foundation_from_core.tex:43-45`
  - Metric projection theorem: `basecore/core/sections/01_foundation_from_core.tex:75-81`
  - Contractivity theorem: `basecore/core/sections/01_foundation_from_core.tex:119-136`

statement_exacto:

```tex
\begin{theorem}[Unique Fixed Point]\label{thm:fixedpoint}
Under Hypotheses~\ref{hyp:H1}--\ref{hyp:H3}, for each $u\in\U$ there exists a unique $f_u^\ast\in\Hilb$ such that
\[
T_u(f_u^\ast)=f_u^\ast.
\]
Moreover, for every $\Psi_0\in\Hilb$,
\[
\lim_{n\to\infty}T_u^n(\Psi_0)=f_u^\ast.
\]
\end{theorem}
```

hipotesis_declaradas:
- H1: `\Hilb` is a real Hilbert space and `\I` is non-empty, closed, and convex.
- H2: `K:\Hilb\to\Hilb` is bounded linear with `\|K\|<1`.
- H3: the ambient space `\Hilb` is complete.
- Fixed parameter `u\in\U`; H4 is not declared for this theorem.

hipotesis_usadas_en_prueba:
- The proof invokes Theorem `thm:contraction`, so it uses non-expansiveness of the metric projection plus `\|K\|<1`.
- It uses the Banach fixed-point theorem on the complete metric space `(\Hilb,\|\cdot\|)`.
- It uses that `T_u` is well-defined from the transition definition `T_u(\Psi)=\aleph(K\Psi+\Gamma(u))`.
- HIDDEN_ASSUMPTION: the proof relies on the standard external Banach fixed-point theorem; this theorem is invoked, not reproved in BaseCore.
- HIDDEN_ASSUMPTION: the projection theorem proof uses Hilbert-space completeness and strict convexity of the Hilbert norm. Completeness is encoded by "Hilbert space" and repeated as H3, but the dependency should remain explicit in reviewer notes.

dominio_de_validez:
- Applies to the Hilbert-space dynamical setting of H1-H3 with a strict contraction operator.
- Applies pointwise in `u`; compactness of the parameter space is not needed for this theorem.
- Does not apply to non-complete metric spaces, non-convex or non-closed target sets, non-strict contractions, or maps not matching the declared transition operator.

proof_status:
- present, conditional on standard fixed-point/projection results.

dependencias_de_deuda:
- No downstream empirical or runtime debt is needed for the formal fixed-point claim.
- Reviewer should decide whether the projection theorem should separately declare H3 or whether "Hilbert space" is sufficient as a completeness carrier.

no_conclusiones:
- Does not imply consciousness, phenomenality, agency, biological identity, subjecthood, external validation, runtime instantiation, or human equivalence.
- Does not imply parameterwise non-collapse; the BaseCore text states H1-H4 do not imply it without an additional anti-constant hypothesis.
- Does not imply any public theory closure beyond conditional mathematical existence, uniqueness, and convergence.

estado_epistemico: PROVED_CONDITIONAL

preguntas_para_el_revisor:
- Should `f_u^\ast` be stated as lying in `\I` rather than only in `\Hilb`, given that `T_u` maps through the projection?
- Is the projection theorem's dependence on completeness sufficiently explicit under H1, or should H3 be listed there too for audit clarity?
- Is invoking Banach fixed point acceptable as an external standard theorem without citation in the local proof corpus?

## Model Card 2

id: `basecore:definition:identity-as-inverse-limit-l19`
nombre: Identity as Inverse Limit
tipo: definition
human_review: REQUIRED
human_curated_status: not_reviewed
machine_extracted_disclaimer: This card is AI-extracted and not a signed human curation artifact.

source_anchor:
- Definition: `basecore/core/sections/03_identity_rigidity_absorbed.tex:19-30`
- Projective setup: `basecore/core/sections/03_identity_rigidity_absorbed.tex:6-17`
- Boundary remark: `basecore/core/sections/03_identity_rigidity_absorbed.tex:32-34`

statement_exacto:

```tex
\begin{definition}[Identity as Inverse Limit]
The identity object associated with the projective system is
\[
\Id:=\varprojlim S_t
:=
\left\{
(x_t)_{t\in\mathbb{N}}\in \prod_{t\in\mathbb{N}} S_t
:\;\middle|\;
\pi_{t+1\to t}(x_{t+1})=x_t\ \forall t
\right\}.
\]
\end{definition}
```

hipotesis_declaradas:
- A family of non-empty state spaces `{S_t}_{t\in\mathbb{N}}`.
- Projection maps `\pi_{t+1\to t}:S_{t+1}\to S_t`.
- Compatibility: `\pi_{t+1\to t}\circ \pi_{t+2\to t+1}=\pi_{t+2\to t}` for all `t`.

hipotesis_usadas_en_prueba:
- No proof is attached because this is a definition.
- HIDDEN_ASSUMPTION: the index category is fixed to `\mathbb{N}` with adjacent projection maps.
- HIDDEN_ASSUMPTION: the product `\prod_t S_t` is treated as a set-level object.
- HIDDEN_ASSUMPTION: category, morphisms, equivalence notion, and topology are not all part of this definition unless added by later hypotheses such as topological regularity.

dominio_de_validez:
- Applies only to the declared projective-system setting.
- Does not by itself provide topology, metric structure, uniqueness up to categorical isomorphism, non-finite determination, or physical interpretation.
- Later topological and NFD claims require their own assumptions.

proof_status:
- not_applicable.

dependencias_de_deuda:
- Roadmap debt `MATH-ID`: inverse-limit identity requires fixed category/system discipline.
- Reviewer must decide which categorical uniqueness statement, if any, should accompany the definition.

no_conclusiones:
- Does not imply metaphysical identity, personal identity, consciousness, phenomenality, subject continuity, biological identity, moral status, or identity transfer.
- Does not imply empirical recoverability or operational certification.
- Does not imply NFD unless Hypothesis `hyp:nfd` is separately assumed.

estado_epistemico: DEFINITION_ONLY

preguntas_para_el_revisor:
- Is the category of objects and morphisms sufficiently fixed for public mathematical review?
- Should the definition state non-emptiness of the inverse limit as an assumption or derive it only under compact-Hausdorff/surjectivity conditions?
- Should "identity" be renamed or consistently glossed as "inverse-limit identity object" to avoid ontological overread?

## Model Card 3

id: `basecore:theorem:thm-rigidity`
nombre: Conditional Stability of Inverse-Limit Identity
tipo: theorem
human_review: REQUIRED
human_curated_status: not_reviewed
machine_extracted_disclaimer: This card is AI-extracted and not a signed human curation artifact.

source_anchor:
- Statement: `basecore/core/sections/03_identity_rigidity_absorbed.tex:132-142`
- Proof sketch: `basecore/core/sections/03_identity_rigidity_absorbed.tex:144-146`
- Assumptions RIG-1 through RIG-5: `basecore/core/sections/03_identity_rigidity_absorbed.tex:91-116`
- Weighted product metric: `basecore/core/sections/03_identity_rigidity_absorbed.tex:125-130`

statement_exacto:

```tex
\begin{theorem}[Conditional Stability of Inverse-Limit Identity]\label{thm:rigidity}
Assume RIG-1 through RIG-5. Then the perturbed inverse limit
\[
\widetilde{\Id}:=\varprojlim \widetilde S_t
\]
exists, and there is a constant $C_{\mathrm{rig}}>0$ depending only on the projection, lifting, and weight controls such that
\[
d_H(\Id,\widetilde{\Id})\le C_{\mathrm{rig}}\|\eps_\bullet\|_w
\]
in the weighted product metric.
\end{theorem}
```

hipotesis_declaradas:
- RIG-1: each `S_t` has a complete metric `d_t`.
- RIG-2: each projection is Lipschitz with constant `L_t`; the weighted control sequence is finite.
- RIG-3: admissible perturbations have compatible approximate lifting maps with uniformly bounded finite lifting constant.
- RIG-4: perturbations are typed as maps between common ambient Banach embeddings or map-space distances bounded by `\eps_t`.
- RIG-5: weighted deformation is summable, `\sum_t w_t\eps_t<\infty`.

hipotesis_usadas_en_prueba:
- The proof sketch uses compatible approximate lifts.
- It uses weighted Lipschitz control to propagate local deformation bounds.
- It uses summability to keep cumulative compatibility defect finite.
- It uses diagonal compactness arguments to produce a perturbed inverse-limit object.
- HIDDEN_ASSUMPTION: diagonal compactness is invoked, but compactness/sequential compactness is not explicit in RIG-1 through RIG-5 as extracted here.
- HIDDEN_ASSUMPTION: Hausdorff distance `d_H(\Id,\widetilde{\Id})` must be well-defined and finite in the weighted product metric.
- HIDDEN_ASSUMPTION: non-emptiness of both inverse limits and coherence of ambient embeddings are needed for the estimate to be meaningful.
- HIDDEN_ASSUMPTION: the constant `C_{\mathrm{rig}}` needs a constructive dependency statement or proof of existence.

dominio_de_validez:
- Applies only to typed admissible perturbation families satisfying RIG-1 through RIG-5 plus the implicit compactness/well-definedness burden.
- It is a metric stability estimate, not categorical isomorphism. The following corollary says isomorphism needs additional structure.
- Does not apply to arbitrary perturbations, non-summable deformation, untyped map addition, or systems lacking coherent lifts.

proof_status:
- sketch/heuristic, because the source labels the proof block as `Proof sketch` and the registry records this theorem as heuristic.

dependencias_de_deuda:
- Roadmap debt `MATH-RIG`: rigidity should be read as typed Hausdorff stability under strong admissibility assumptions.
- Hidden compactness and Hausdorff well-definedness must be formalized before public proof status can be strengthened.
- Any estimator or physical interpretation of deformation resistance remains outside this theorem.

no_conclusiones:
- Does not imply absolute metaphysical rigidity, physical identity preservation, consciousness preservation, identity transfer, subject continuity, or bridge support.
- Does not imply that `\Id` and `\widetilde{\Id}` are isomorphic.
- Does not validate any runtime perturbation model unless that model is shown to satisfy RIG-1 through RIG-5.

estado_epistemico: DOWNSTREAM_FORMAL_DEBT

preguntas_para_el_revisor:
- Does the proof require compactness of the `S_t` or compactness of compatible-sequence sets, beyond complete metrics?
- Is `d_H` well-defined on the chosen weighted product metric for all systems admitted by RIG-1 through RIG-5?
- Can `C_{\mathrm{rig}}` be constructed explicitly from the stated constants?
- Should the theorem be renamed from "rigidity" to "conditional weighted Hausdorff stability" in public-facing text?

## Model Card 4

id: `basecore:theorem:thm-non-simulability`
nombre: Conditional Non-Simulability of CCR by Finite Simulators
tipo: theorem
human_review: REQUIRED
human_curated_status: not_reviewed
machine_extracted_disclaimer: This card is AI-extracted and not a signed human curation artifact.

source_anchor:
- Statement: `basecore/core/sections/03_identity_rigidity_absorbed.tex:205-207`
- Proof: `basecore/core/sections/03_identity_rigidity_absorbed.tex:209-211`
- NS-1 through NS-3: `basecore/core/sections/03_identity_rigidity_absorbed.tex:174-202`
- Deformation-resistance scalar definition: `basecore/core/sections/03_identity_rigidity_absorbed.tex:156-166`
- Boundary remark: `basecore/core/sections/03_identity_rigidity_absorbed.tex:221-223`

statement_exacto:

```tex
\begin{theorem}[Conditional Non-Simulability of CCR by Finite Simulators]\label{thm:non-simulability}
Assume NS-1 through NS-3. Then no simulator in $\mathbf{Comp}_{\mathrm{finite}}$ faithfully realizes a CCR target.
\end{theorem}
```

hipotesis_declaradas:
- NS-1: a CCR target is an inverse-limit identity object satisfying NFD, `\MO=+\infty`, absence of a finite sufficient statistic for faithful identity recovery, and absence of a finite-dimensional faithful embedding preserving projective compatibility.
- NS-2: a finite simulator has at least one boundedness feature: finite-dimensional latent state/context, bounded memory horizon/finite sufficient statistic, finite perturbation-energy budget, or finite-rank projective representation.
- NS-3: faithful simulation must preserve projective compatibility, NFD, deformation-resistance class, relevant observables in the weighted metric, and admissible intervention responses.

hipotesis_usadas_en_prueba:
- The proof uses the NS-2 boundedness features to infer compression into finite latent/memory/rank/statistic structure.
- It uses NS-1 to say that such compression destroys NFD, faithful projective structure, or the infinite deformation-resistance class.
- It uses NS-3 as the definition of faithful realization.
- HIDDEN_ASSUMPTION: each NS-2 boundedness feature actually forces loss of at least one NS-1 component; the source proof states this as a single argument rather than separate lemmas by simulator subtype.
- HIDDEN_ASSUMPTION: "faithfully realizes" is only as strong as the NS-3 preservation clauses; weaker input-output emulation is outside the theorem.
- HIDDEN_ASSUMPTION: the CCR target itself contains strong exclusion clauses, so the theorem's non-triviality depends on whether those clauses are independently satisfiable for a non-empty target class.

dominio_de_validez:
- Applies only to CCR targets satisfying NS-1 and simulators in the declared finite class `\mathbf{Comp}_{\mathrm{finite}}`.
- Applies only to faithful realization in the NS-3 sense.
- Does not rule out finite-horizon approximation, bounded projection approximation, input-output mimicry, or simulators with resources growing without bound.

proof_status:
- present, but heavily conditional on NS-1 through NS-3.

dependencias_de_deuda:
- Roadmap debt `MATH-SIM`: non-simulability is conditional and needs a simulator taxonomy.
- The target class needs non-vacuity review: at least one CCR target satisfying NS-1 should be exhibited or externally justified.
- The proof would be stronger with sublemmas separating finite latent state, finite horizon, finite energy, and finite-rank projective representation.

no_conclusiones:
- Does not prove universal impossibility of simulation.
- Does not prove that finite simulators cannot approximate finite projections.
- Does not prove consciousness, phenomenality, biological identity, agency, human equivalence, or external adjudication.
- Does not settle whether physical systems instantiate CCR targets.

estado_epistemico: DOWNSTREAM_FORMAL_DEBT

preguntas_para_el_revisor:
- Is the theorem non-trivial once NS-1 defines CCR targets partly by absence of finite sufficient statistics and finite-dimensional faithful embeddings?
- Is `\mathbf{Comp}_{\mathrm{finite}}` too narrow, or does it capture the relevant simulator classes for the intended public claim?
- Can the compression-loss step be decomposed into formal lemmas for each finite-simulator subtype?
- Is there an explicit non-empty model of NS-1 satisfying all CCR target clauses?

## Gaps And Closure State

- All source anchors listed above resolve to real `.tex` line ranges in the local tree.
- The cards are ready for human mathematical review, not for publication as signed proof status.
- Human-curated cards: 0.
- `EXTERNAL_ADJUDICATION_GAP`: open.
- No `.tex`, PDF, registry, release, script, corpus, monolith, or package manifest files were edited by this phase.
- The registry currently contains machine-extracted statuses such as `proved`, but this report does not convert them into human-curated proof claims.
