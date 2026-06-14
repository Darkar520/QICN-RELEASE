# Manuscript Decisions - BaseCore Short Paper Skeleton

Status: AI_OUTPUT_REVIEW_REQUIRED
Date: 2026-06-14
Canonical status: non-canonical AI output
Human review: REQUIRED

## Central Thesis Selected

Selected thesis:

`Contractive projection dynamics plus unique fixed point, with inverse-limit identity as structural definition and conditional weighted Hausdorff stability as the main conditional extension.`

Why this is the strongest defensible thesis:

- The fixed-point package has the most stable card status: `PROVED_CONDITIONAL`.
- It rests on standard mathematical dependencies: metric projection, non-expansiveness, contraction, and Banach fixed point.
- The inverse-limit identity object is central but is explicitly `DEFINITION_ONLY`, so it can organize the paper but cannot be marketed as a closed theorem.
- The rigidity theorem is important but remains `DOWNSTREAM_FORMAL_DEBT` because the proof is a sketch and hidden compactness/Hausdorff well-definedness burdens remain.

## What Was Not Selected as Thesis

Conditional non-simulability was not selected as the central thesis.

Reason:

- It depends on NS-1 through NS-3.
- NS-1 includes strong CCR target conditions.
- The non-vacuity of the CCR target class remains open.
- The simulator taxonomy remains open.
- Therefore it belongs as a conditional, caveated section, not as the paper's central claim.

## Exclusions

Excluded from the short paper skeleton:

- Phenomenological bridge claims.
- Consciousness claims.
- Human-equivalence claims.
- Runtime-system evidence.
- Papers 7-9 as downstream sources.
- External validation language.
- Monolithic consolidation.
- New theorem statements.
- New proof derivations.

Reason:

BaseCore can support a short mathematical manuscript only if the scope remains austerely inside the formal assumptions. Downstream bridge or runtime material would weaken the paper by reopening burdens that are not closed in BaseCore.

## Source Basis

Primary source:

- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE9_BASECORE_MODEL_CARDS.md`

Direct source anchors used:

- `basecore/BASECORE.tex:117`
- `basecore/core/sections/01_foundation_from_core.tex:35-49`
- `basecore/core/sections/01_foundation_from_core.tex:68-81`
- `basecore/core/sections/01_foundation_from_core.tex:112-136`
- `basecore/core/sections/01_foundation_from_core.tex:140-153`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:6-38`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:91-116`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:125-153`
- `basecore/core/sections/03_identity_rigidity_absorbed.tex:156-223`
- `basecore/core/sections/07_operational_criterion_absorbed.tex:216-218`
- `basecore/core/sections/07_operational_criterion_absorbed.tex:334-335`
- `basecore/core/sections/08_claim_boundary_and_falsation.tex:89-90`

## Author TODO List

- Replace the draft abstract with author-approved prose.
- Add a concise motivation for contractive projection dynamics and inverse-limit stability without adding claims.
- Decide whether to use "rigidity" or "conditional weighted Hausdorff stability" in the title/body.
- Decide whether H3 must be restated beside the projection theorem.
- Decide whether `f_u^\ast` should be stated as lying in `\I`.
- Add standard mathematical references from `release/references.bib`.
- Tighten the inverse-limit category/morphism/equivalence discipline.
- Expand or formally close the RIG proof sketch: compactness, Hausdorff well-definedness, non-emptiness, coherent embeddings, and `C_{\mathrm{rig}}`.
- Decide whether to keep non-simulability in the main body or move it to an appendix until CCR non-vacuity is closed.
- Provide or explicitly defer a non-empty CCR target model.
- Keep the no-conclusion list visible in the final manuscript.

## Gap Status

- Manuscript status: skeleton only.
- Human prose: pending.
- Expert mathematical review: pending.
- Human-curated theorem cards: 0.
- External adjudication: open.
- Push status: blocked until external audit approval.
