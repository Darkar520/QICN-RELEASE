# QICN BaseCore Short Paper Skeleton

Status: AI_OUTPUT_SKELETON_REVIEW_REQUIRED
Date: 2026-06-14
Scope: BaseCore-only short manuscript scaffold
Canonical status: non-canonical AI output
Human review: REQUIRED

This file is a manuscript scaffold, not a finished paper and not a signed
mathematical review. Extracted statements retain their source anchors. New
connecting text is marked `[DRAFT]` or `[AUTHOR_TODO]`.

## Preflight

| Surface | Status | Notes |
|---|---|---|
| `basecore/BASECORE.tex` | FUNCTIONAL | Source-of-truth BaseCore file. |
| `basecore/core/sections/01_foundation_from_core.tex` | FUNCTIONAL | Formal setup, projection, contraction, fixed point. |
| `basecore/core/sections/02_model_and_spectral_extensions.tex` | FUNCTIONAL | Present but not central in this skeleton. |
| `basecore/core/sections/03_identity_rigidity_absorbed.tex` | FUNCTIONAL | Inverse-limit identity, rigidity, non-simulability. |
| `basecore/core/sections/07_operational_criterion_absorbed.tex` | FUNCTIONAL | Boundary grammar only; not a central result here. |
| `basecore/core/sections/08_claim_boundary_and_falsation.tex` | FUNCTIONAL | Claim-boundary and falsation grammar. |
| `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE9_BASECORE_MODEL_CARDS.md` | FUNCTIONAL | Primary source for card states and hidden assumptions. |
| `docs/CLAIM_STATUS_POLICY.md` | FUNCTIONAL | Status anti-inflation policy. |
| `docs/FALSIFIER_MATRIX.md` | FUNCTIONAL | Boundary reminder: no external validation claim. |
| `release/references.bib` | FUNCTIONAL | Bibliography source for final manuscript. |

## Manuscript Metadata

Working title:

`[DRAFT] Contractive Projection Dynamics and Conditional Inverse-Limit Stability in BaseCore`

Short title:

`[DRAFT] BaseCore: Contractive Dynamics and Conditional Rigidity`

Author block:

`[AUTHOR_TODO] Insert author name, affiliation, ORCID if applicable, and contact.`

Status statement:

`[DRAFT] This manuscript presents a short, BaseCore-only extraction of formal results under stated assumptions. It does not claim phenomenality, consciousness, human equivalence, runtime instantiation, bridge admissibility, external validation, or metaphysical identity.`

## Central Thesis Decision

Chosen thesis:

`[DRAFT] The strongest defensible short-paper thesis is the contractive projection dynamics package: metric projection, transition contractivity, and unique fixed point, with inverse-limit identity used as a structural definition and conditional weighted Hausdorff stability treated as the main conditional extension.`

Reason:

- Extracted from Phase 9 model cards: `basecore:theorem:thm-fixedpoint` is `PROVED_CONDITIONAL`.
- `basecore:definition:identity-as-inverse-limit-l19` is `DEFINITION_ONLY`; it can organize the paper but cannot be advertised as a closed theorem.
- `basecore:theorem:thm-rigidity` is the stronger conditional extension, but its proof status remains `sketch/heuristic` with `DOWNSTREAM_FORMAL_DEBT`.
- `basecore:theorem:thm-non-simulability` is not selected as the thesis because CCR target non-vacuity remains open.

## Abstract

`[DRAFT] We extract the BaseCore mathematical core of the Rigid Identity Framework into a short, assumption-explicit manuscript scaffold. The source results establish metric projection and strict contractive transition dynamics on a Hilbert-space setting, yielding a unique fixed point for each parameter under H1-H3. The paper then records identity as an inverse-limit object of a projective system and states the conditional stability result for perturbed inverse limits under RIG-1 through RIG-5. Conditional non-simulability of CCR targets by finite simulators is included only as a burdened conditional result under NS-1 through NS-3, with target non-vacuity explicitly left open. The manuscript does not claim consciousness, phenomenality, human equivalence, runtime instantiation, bridge admissibility, external validation, or metaphysical identity.`

`[AUTHOR_TODO] Replace this draft abstract with author-approved prose after expert review. Do not remove the no-claim sentence unless replaced by an equally explicit boundary statement.`

## 1. Introduction

### 1.1 Problem

`[DRAFT] The short manuscript asks what BaseCore can defend as mathematics when stripped of downstream bridge language, runtime interpretation, and phenomenological vocabulary.`

`[AUTHOR_TODO] Add a concise motivation for studying contractive projection dynamics and inverse-limit stability without adding new claims.`

### 1.2 Scope

Extracted boundary from `basecore/BASECORE.tex:117`:

```text
BaseCore proves contractive projection dynamics, typed computable witnesses,
parameterwise non-collapse under explicit anti-constant assumptions,
inverse-limit identity under non-finite-determination assumptions, conditional
rigidity under admissible perturbation models, conditional non-simulability of
CCR targets by finite simulator classes, operational-criterion grammar, and
falsation / claim-boundary ledgers. It does not prove phenomenality,
metaphysical subjectivity, human equivalence, runtime instantiation, bridge
admissibility, or external adjudication.
```

For this short paper, include only:

- Hilbert-space projection setup.
- Transition operator and contraction.
- Unique fixed point.
- Identity as inverse limit.
- Conditional stability/rigidity under RIG assumptions.
- Conditional non-simulability as a caveated result, not the thesis.
- Claim boundaries and limitations.

Exclude:

- Papers 7-9 as downstream.
- Phenomenological bridge claims.
- Runtime-system evidence.
- External validation language.
- Consciousness or human-equivalence claims.

### 1.3 Main Contribution

`[DRAFT] The contribution is an austere BaseCore extraction: a compact formal sequence from metric projection to fixed point, followed by an inverse-limit identity object and a conditional perturbation-stability statement.`

`[AUTHOR_TODO] Decide whether "rigidity" should be replaced in the title/body by "conditional weighted Hausdorff stability" to avoid overstatement.`

## 2. Formal Setup

Source: `basecore/core/sections/01_foundation_from_core.tex:35-49`.

### 2.1 Minimal Base Hypotheses

```tex
\begin{hypothesis}[H1: Projection Structure]\label{hyp:H1}
Let $\Hilb$ be a real Hilbert space with inner product $\inner{\cdot}{\cdot}$ and norm $\norm{\cdot}$. Let $\I \subset \Hilb$ be non-empty, closed, and convex.
\end{hypothesis}

\begin{hypothesis}[H2: Contraction Operator]\label{hyp:H2}
Let $K:\Hilb\to\Hilb$ be a bounded linear operator with operator norm $\norm{K}<1$.
\end{hypothesis}

\begin{hypothesis}[H3: Completeness]\label{hyp:H3}
The ambient space $\Hilb$ is complete.
\end{hypothesis}

\begin{hypothesis}[H4: Parameter Compactness]\label{hyp:H4}
Let $\U$ be a compact metric space and let $\Gamma:\U\to\Hilb$ be uniformly continuous.
\end{hypothesis}
```

Author note:

`[AUTHOR_TODO] Decide whether to state H3 separately in the short paper or treat Hilbert-space completeness as already included in H1. The Phase 9 card flags this as a reviewer question.`

### 2.2 Metric Projection

Source: `basecore/core/sections/01_foundation_from_core.tex:68-81`.

```tex
\begin{definition}[Metric Projection]\label{def:projection}
For $\Psi\in\Hilb$, define the metric projection onto $\I$ by
\[
\aleph(\Psi):=\arg\min_{\Phi\in\I}\norm{\Psi-\Phi}.
\]
\end{definition}

\begin{theorem}[Existence and Uniqueness of Projection]\label{thm:projection}
Under Hypothesis~\ref{hyp:H1}, the projection $\aleph(\Psi)$ exists and is unique for every $\Psi\in\Hilb$.
\end{theorem}
```

Proof handling:

`[DRAFT] The proof is cited to BaseCore, where existence is derived from a minimizing sequence in the closed convex set and uniqueness from strict convexity of the Hilbert norm.`

Hidden assumption to keep visible:

- The local proof uses completeness and strict convexity. The short paper should not hide that burden.

### 2.3 Transition Operator

Source: `basecore/core/sections/01_foundation_from_core.tex:112-136`.

```tex
\begin{definition}[Transition Operator]\label{def:transition}
For each $u\in\U$, define
\[
T_u(\Psi):=\aleph(K\Psi+\Gamma(u)).
\]
\end{definition}

\begin{theorem}[Contractivity]\label{thm:contraction}
Under Hypotheses~\ref{hyp:H1} and \ref{hyp:H2}, each $T_u$ is a strict contraction with Lipschitz constant at most $\norm{K}$:
\[
\norm{T_u(\Psi_1)-T_u(\Psi_2)}\le \norm{K}\,\norm{\Psi_1-\Psi_2}.
\]
\end{theorem}
```

Proof handling:

`[DRAFT] The proof is cited to BaseCore and uses non-expansiveness of the projection plus $\norm{K}<1$.`

## 3. Main Formal Result: Unique Fixed Point

Source: `basecore/core/sections/01_foundation_from_core.tex:140-153`.
Model card: `basecore:theorem:thm-fixedpoint`.
Epistemic state: `PROVED_CONDITIONAL`.
Human-curated status: `not_reviewed`.

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

Proof reference:

```tex
\begin{proof}
By Theorem~\ref{thm:contraction}, each $T_u$ is a strict contraction on the complete metric space $(\Hilb,\norm{\cdot})$. The Banach fixed-point theorem yields existence, uniqueness, and convergence of iterates.
\end{proof}
```

Declared hypotheses:

- H1 projection structure.
- H2 strict contraction operator.
- H3 completeness.
- Fixed `u`.

Hidden or reviewer-visible assumptions:

- Banach fixed-point theorem is invoked, not reproved.
- Projection dependency uses Hilbert completeness and strict convexity.
- Reviewer should decide whether the fixed point should be stated as lying in `\I`, since `T_u` maps through `\aleph`.

No-conclusions:

- No consciousness, phenomenality, human equivalence, runtime instantiation, bridge admissibility, external validation, or metaphysical identity.
- No parameterwise non-collapse from H1-H3.

## 4. Identity as Inverse-Limit Object

Source: `basecore/core/sections/03_identity_rigidity_absorbed.tex:6-38`.
Model card: `basecore:definition:identity-as-inverse-limit-l19`.
Epistemic state: `DEFINITION_ONLY`.
Human-curated status: `not_reviewed`.

### 4.1 Projective System

```tex
\begin{definition}[Projective System of State Spaces]
Let $\{S_t\}_{t\in\mathbb{N}}$ be a family of non-empty state spaces together with projection maps
\[
\pi_{t+1\to t}:S_{t+1}\to S_t
\]
satisfying the compatibility rule
\[
\pi_{t+1\to t}\circ \pi_{t+2\to t+1}=\pi_{t+2\to t}
\qquad
\forall t\in\mathbb{N}.
\]
\end{definition}
```

### 4.2 Identity Object

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

Boundary remark:

```tex
\begin{remark}[Identity neutrality]
In BaseCore, $\Id$ is a structural inverse-limit object only. It carries no automatic phenomenological, biological, or metaphysical interpretation.
\end{remark}
```

Reviewer-visible assumptions:

- The index category is fixed to `\mathbb{N}`.
- Category, morphisms, equivalence notion, topology, and non-emptiness of the inverse limit require explicit handling.
- Topological regularity appears separately: each `S_t` is compact Hausdorff and each projection is continuous and surjective.

`[AUTHOR_TODO] Decide whether to include a short standard reference paragraph for inverse limits using `release/references.bib` keys such as `maclane1998`, `adamek1990`, or `maclane`.`

## 5. Conditional Stability Under Admissible Perturbations

Source: `basecore/core/sections/03_identity_rigidity_absorbed.tex:91-146`.
Model card: `basecore:theorem:thm-rigidity`.
Epistemic state: `DOWNSTREAM_FORMAL_DEBT`.
Human-curated status: `not_reviewed`.

### 5.1 RIG Assumptions

```tex
\begin{assumption}[RIG-1: Metric Projective System]\label{ass:rig1}
Each $S_t$ is equipped with a complete metric $d_t$.
\end{assumption}

\begin{assumption}[RIG-2: Uniform Lipschitz Projections]\label{ass:rig2}
Each projection $\pi_{t+1\to t}:S_{t+1}\to S_t$ is Lipschitz with constant $L_t$, and the weighted control sequence used below is finite.
\end{assumption}

\begin{assumption}[RIG-3: Stable Lifting]\label{ass:rig3}
For each admissible perturbed projection family there exist compatible approximate lifting maps with constants bounded uniformly by a finite lifting constant $L_{\mathrm{lift}}$.
\end{assumption}

\begin{assumption}[RIG-4: Typed Perturbation Model]\label{ass:rig4}
Perturbations are represented either by maps between common ambient Banach embeddings or by map-space distances
\[
d_{\mathrm{map}}^{(t)}(\pi_{t+1\to t},\widetilde\pi_{t+1\to t})\le \eps_t.
\]
Literal expressions of the form $\widetilde\pi=\pi+\eps$ are used only when a common ambient linear model has been specified.
\end{assumption}

\begin{assumption}[RIG-5: Summable Deformation]\label{ass:rig5}
There exists a positive weight sequence $\{w_t\}_{t\ge 0}$ such that
\[
\sum_{t=0}^\infty w_t\eps_t<\infty.
\]
\end{assumption}
```

### 5.2 Weighted Product Metric

Source: `basecore/core/sections/03_identity_rigidity_absorbed.tex:125-130`.

```tex
\begin{definition}[Weighted Product Metric]
For compatible sequences $x=(x_t)$ and $y=(y_t)$ define
\[
\dw(x,y):=\sup_{t\ge 0} w_t\, d_t(x_t,y_t).
\]
\end{definition}
```

### 5.3 Conditional Stability Theorem

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

Proof reference:

```tex
\begin{proof}[Proof sketch]
The lifting assumption gives compatible approximate lifts at each level. Weighted Lipschitz control propagates local deformation bounds through the projective tower. Summability ensures that the cumulative compatibility defect remains finite, so diagonal compactness arguments produce a perturbed inverse-limit object. The same bounds control the Hausdorff distance between the original and perturbed compatible-sequence sets.
\end{proof}
```

Required caveat in body:

`[DRAFT] This is the strongest conditional extension, but not a closed public theorem without further review: the proof is a sketch, diagonal compactness is invoked, and Hausdorff well-definedness plus inverse-limit non-emptiness must be made explicit.`

Related no-isomorphism boundary from `basecore/core/sections/03_identity_rigidity_absorbed.tex:148-153`:

```tex
\begin{corollary}[Conditional Isomorphism Requires Extra Structure]
The metric estimate of Theorem~\ref{thm:rigidity} does not by itself imply that $\Id$ and $\widetilde{\Id}$ are isomorphic. Isomorphism or shape-equivalence requires additional bi-lifting, coherence, or ambient-embedding assumptions.
\end{corollary}
```

## 6. Conditional Non-Simulability Result

Source: `basecore/core/sections/03_identity_rigidity_absorbed.tex:156-223`.
Model card: `basecore:theorem:thm-non-simulability`.
Epistemic state: `DOWNSTREAM_FORMAL_DEBT`.
Human-curated status: `not_reviewed`.

Placement:

`[DRAFT] This result appears after the main formal core and must not be used as the thesis of the short paper while CCR target non-vacuity remains open.`

### 6.1 Deformation-Resistance Scalar

```tex
\begin{definition}[Ontological Mass]\label{def:ontmass}
Let $E_w(\delta)$ denote the weighted energy of an admissible perturbation family $\delta$. Define
\[
\MO:=\inf\left\{
\frac{E_w(\delta)}{d_H(\Id,\widetilde{\Id}_\delta)}
\;\middle|\;
\delta \text{ admissible},\ d_H(\Id,\widetilde{\Id}_\delta)>0
\right\},
\]
with the convention $\MO=+\infty$ if no admissible finite-energy perturbation yields positive deformation of the identity object.
\end{definition}
```

Terminology caveat:

`[DRAFT] The term `ontological mass` must be treated as a deformation-resistance scalar, not as a metaphysical substance.`

### 6.2 NS Assumptions

```tex
\begin{assumption}[NS-1: CCR Target]\label{ass:ns1}
A CCR target is an inverse-limit identity object satisfying:
\begin{enumerate}[leftmargin=*]
\item non-finite determination (Hypothesis~\ref{hyp:nfd});
\item infinite deformation resistance $\MO=+\infty$;
\item absence of a finite sufficient statistic for faithful identity recovery;
\item absence of a finite-dimensional faithful embedding preserving projective compatibility.
\end{enumerate}
\end{assumption}

\begin{assumption}[NS-2: Finite Simulator Class]\label{ass:ns2}
A simulator $C$ belongs to $\mathbf{Comp}_{\mathrm{finite}}$ if it has at least one of the following boundedness features:
\begin{enumerate}[leftmargin=*]
\item finite-dimensional latent state or finite context;
\item bounded memory horizon or finite sufficient statistic;
\item finite perturbation-energy budget;
\item finite-rank projective representation.
\end{enumerate}
\end{assumption}

\begin{assumption}[NS-3: Faithful Simulation Requirement]\label{ass:ns3}
A simulation is faithful only if it preserves, at the stated tolerance level, all of:
\begin{enumerate}[leftmargin=*]
\item projective compatibility;
\item non-finite determination;
\item deformation-resistance class;
\item relevant observables in the weighted metric;
\item admissible intervention responses.
\end{enumerate}
\end{assumption}
```

### 6.3 Conditional Theorem

```tex
\begin{theorem}[Conditional Non-Simulability of CCR by Finite Simulators]\label{thm:non-simulability}
Assume NS-1 through NS-3. Then no simulator in $\mathbf{Comp}_{\mathrm{finite}}$ faithfully realizes a CCR target.
\end{theorem}
```

Required open problem:

`[DRAFT] Open problem: exhibit or independently justify a non-empty class of CCR targets satisfying NS-1. Until this is done, the theorem remains a conditional non-factorization/non-realization result for a strongly defined target class.`

Boundary remark from `basecore/core/sections/03_identity_rigidity_absorbed.tex:221-223`:

```tex
\begin{remark}[What has been removed]
BaseCore no longer claims that finite simulators ``cannot approximate at all.'' The correct statement is conditional and finer-grained: finite-horizon approximation may exist, but faithful full inverse-limit realization of CCR targets is blocked under NS-1 through NS-3.
\end{remark}
```

## 7. Claim Boundaries and No-Conclusions

Source boundaries:

- `basecore/BASECORE.tex:117`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:32-34`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:148-153`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:221-223`
- `basecore/core/sections/07_operational_criterion_absorbed.tex:216-218`
- `basecore/core/sections/07_operational_criterion_absorbed.tex:334-335`
- `basecore/core/sections/08_claim_boundary_and_falsation.tex:89-90`
- `docs/CLAIM_STATUS_POLICY.md`

No-conclusions to state explicitly:

- No phenomenality.
- No consciousness.
- No human equivalence.
- No runtime instantiation.
- No bridge admissibility.
- No external adjudication or external validation.
- No metaphysical identity.
- No categorical isomorphism from metric closeness alone.
- No universal simulation impossibility.

Extracted operational boundary from `basecore/core/sections/07_operational_criterion_absorbed.tex:216-218`:

```tex
\begin{remark}[Neutrality of the class symbol]
The symbol $\Critop$ is a shorthand for a conjunctive operational criterion. It is not a theorem of phenomenality, metaphysical subjectivity, or human equivalence.
\end{remark}
```

Extracted downstream boundary from `basecore/core/sections/08_claim_boundary_and_falsation.tex:89-90`:

```tex
\begin{remark}[What stays outside BaseCore]
Runtime status classes, Stage 2 / Stage 3 comparative programs, human comparator campaigns, Papers 7--9, and bridge-facing burden architectures remain downstream artifacts. BaseCore absorbs only the falsation grammar and claim-boundary semantics needed to keep theorem ownership honest.
\end{remark}
```

`[AUTHOR_TODO] Convert this section into concise manuscript prose after mathematical review. Keep the no-conclusion list visible.`

## 8. Limitations and Future Work

Formal debt:

- H3/projection dependence: reviewer should decide whether completeness is sufficiently explicit in the projection theorem.
- Inverse-limit identity: category, morphisms, equivalence notion, and inverse-limit non-emptiness need clean public discipline.
- RIG theorem: compactness, Hausdorff well-definedness, non-emptiness, coherent embeddings, and explicit `C_{\mathrm{rig}}` construction remain review burdens.
- Non-simulability: CCR target non-vacuity and simulator taxonomy remain open.
- `I_int` and atomic separator burdens remain downstream and are not resolved here.

Empirical and curation debt:

- No external validation is claimed.
- No human-curated theorem card exists yet for these cards.
- No runtime evidence is used as theorem evidence.

`[AUTHOR_TODO] Prioritize the future-work paragraph in this order: fixed-point/projection clarity, inverse-limit category discipline, RIG compactness/Hausdorff proof, CCR non-vacuity, simulator taxonomy.`

## 9. Appendix A: Transparency Table from Phase 9 Cards

| id | type | proof_status | epistemic state | debt | human_curated_status |
|---|---|---|---|---|---|
| `basecore:theorem:thm-fixedpoint` | theorem | present | PROVED_CONDITIONAL | Standard theorem dependencies and explicit H1-H3 only | not_reviewed |
| `basecore:definition:identity-as-inverse-limit-l19` | definition | not_applicable | DEFINITION_ONLY | Category/index/object discipline must remain explicit | not_reviewed |
| `basecore:theorem:thm-rigidity` | theorem | sketch/heuristic | DOWNSTREAM_FORMAL_DEBT | RIG assumptions plus hidden compactness/Hausdorff well-definedness burden | not_reviewed |
| `basecore:theorem:thm-non-simulability` | theorem | present | DOWNSTREAM_FORMAL_DEBT | NS taxonomy, faithful simulation, and CCR target burden remain open | not_reviewed |

## 10. Appendix B: Source Anchor Checklist

| Manuscript element | Anchor | Resolved |
|---|---|---|
| BaseCore boundary abstract | `basecore/BASECORE.tex:117` | yes |
| H1-H4 | `basecore/core/sections/01_foundation_from_core.tex:35-49` | yes |
| Metric projection | `basecore/core/sections/01_foundation_from_core.tex:68-81` | yes |
| Transition and contractivity | `basecore/core/sections/01_foundation_from_core.tex:112-136` | yes |
| Unique fixed point | `basecore/core/sections/01_foundation_from_core.tex:140-153` | yes |
| Projective system and inverse-limit identity | `basecore/core/sections/03_identity_rigidity_absorbed.tex:6-38` | yes |
| RIG assumptions | `basecore/core/sections/03_identity_rigidity_absorbed.tex:91-116` | yes |
| Weighted metric and rigidity | `basecore/core/sections/03_identity_rigidity_absorbed.tex:125-146` | yes |
| No-isomorphism caveat | `basecore/core/sections/03_identity_rigidity_absorbed.tex:148-153` | yes |
| `\MO` definition | `basecore/core/sections/03_identity_rigidity_absorbed.tex:156-166` | yes |
| NS assumptions and theorem | `basecore/core/sections/03_identity_rigidity_absorbed.tex:174-211` | yes |
| Finite approximation caveat | `basecore/core/sections/03_identity_rigidity_absorbed.tex:221-223` | yes |
| Operational criterion no-claim | `basecore/core/sections/07_operational_criterion_absorbed.tex:216-218` | yes |
| Boundary discipline | `basecore/core/sections/07_operational_criterion_absorbed.tex:334-335` | yes |
| Downstream exclusion | `basecore/core/sections/08_claim_boundary_and_falsation.tex:89-90` | yes |

## 11. References

Bibliography source: `release/references.bib`.

Candidate keys observed in the package bibliography:

- `banach`
- `kreyszig`
- `brezis`
- `rudin`
- `maclane1998`
- `maclane`
- `adamek1990`
- `katok1995`
- `munkres2000`
- `engelking1989`

`[AUTHOR_TODO] Select final references from release/references.bib; do not add new references here without updating the bibliography source through the normal review path.`
