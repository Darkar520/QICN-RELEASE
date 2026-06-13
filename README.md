# QICN-FRAMEWORK

Audit-first mathematical framework for the QICN / Rigid Identity paper family.
The active base layer is **BaseCore**; downstream papers derive from it and do
not automatically promote runtime, synthetic, or interpretive claims into public
theory closure.

## Quick Verification

Run from the repository root:

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

Expected scientific blockers such as `external_support_certified=false` are not
repository failures. They are explicit claim-boundary safeguards.

## Compile A Paper

Compile the paper's `main.tex` from its own directory with LaTeX plus `biber`.
Typical sequence:

```bash
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

For BaseCore, use `basecore/BASECORE.tex` and the corresponding job name:

```bash
pdflatex -interaction=nonstopmode BASECORE.tex
biber BASECORE
pdflatex -interaction=nonstopmode BASECORE.tex
pdflatex -interaction=nonstopmode BASECORE.tex
```

## Structure

- `rigid-identity-framework/basecore/` - foundational source of truth.
- `rigid-identity-framework/paper1..paper10/` - downstream papers.
- `rigid-identity-framework/monolithic/` - assembled volume.
- `rigid-identity-framework/registry/` - machine-readable theorem and macro corpus.
- `rigid-identity-framework/scripts/` - verification and audit tooling.
- `rigid-identity-framework/docs/` - policies, ledgers, reports, and process logs.
- `rigid-identity-framework/canonical_core_legacy/` - preserved historical package, not disorder.
- `release/` - root-level canonical release metadata and boundary manifests.
- `corpus/` - frozen PDF corpus material.

## Governance

Operational rules live in:

- `rigid-identity-framework/INSTRUCCIONES.md`
- `rigid-identity-framework/ROADMAP.md`
- `AGENTS.md`

Core constraints:

- work by phases;
- keep claim boundaries explicit;
- do not inflate internal synthetic support into external validation;
- keep ontology, mathematical model, implementation, language, and interpretation separate;
- record process-relevant work in `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`;
- do not mutate `release/`, `corpus/`, or `artifacts/` without explicit approval.

## Source Of Truth

- `docs/CANON_SOURCE_OF_TRUTH.md`
- `docs/CANON_MANIFEST.md`
- `docs/CLAIM_REGISTRY.md`
- `docs/LAYER_BOUNDARIES.md`
- `docs/THEORY_SYSTEM_INTERFACE.md`
- `docs/CANONICAL_RELEASE_NOTES.md`

Machine-readable counterparts:

- `release/release_freeze_manifest.json`
- `release/canon_manifest.v1.json`
- `release/claim_registry.v1.json`
- `release/layer_boundaries.v1.json`
- `release/system_interface_boundary.v1.json`

## Reviewer Feedback Requested

Please prioritize technical criticism over general encouragement. The most useful
feedback is:

- whether the central theorem assumptions are explicit, necessary, and not
  smuggling the desired conclusion;
- whether any claim boundary is still too strong relative to the proved or
  implemented content;
- whether there is circularity between primitives, estimators, gates, and
  interpretation;
- whether BaseCore dependencies are cleanly separated from downstream papers;
- which open gaps should be resolved before external validation;
- which parts are publishable as formal mathematics now, and which should remain
  internal scaffolding or speculative interpretation.

Do not treat internal simulations, AI-output reports, runtime demos, packaging,
or synthetic gates as external validation.

## Non-Goals

- no blind collapse of legacy or mirror material into the active base;
- no external validation claims unless independently sourced;
- no automatic bridge from runtime work to public theory closure;
- no consciousness, phenomenality, human-equivalence, or adjudication claims from
  packaging alone.

---

Copyright (c) 2026 Johnny Andrey Perez Ramirez. All rights reserved.
Private repository for read-only review unless explicit permission is granted.
