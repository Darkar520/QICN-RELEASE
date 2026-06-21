# QICN-FRAMEWORK — Agent Instructions

Audit-first mathematical framework. Active base layer is **BaseCore**; downstream papers (I-IX) derive from it. Legacy `canonical_core_legacy/` is preserved, not modified.

## Source of truth (read first)

Before any change, read these in order:

1. `docs/CANON_SOURCE_OF_TRUTH.md`
2. `docs/CANON_MANIFEST.md`
3. `docs/CLAIM_REGISTRY.md`
4. `docs/LAYER_BOUNDARIES.md`
5. `docs/THEORY_SYSTEM_INTERFACE.md`

Machine-readable equivalents in `release/`.

## Hard rules

- **Never collapse legacy or mirror material into the active base.** Boundary is enforced by `release/layer_boundaries.v1.json`.
- **No external validation claims** unless explicitly sourced.
- **No automatic bridge** from internal runtime work to public theory closure.
- **No phenomenality / human-equivalence / adjudication claims** from packaging alone.
- **Modifications to `release/`, `corpus/`, `artifacts/` require explicit user approval** — these are immutable by convention.

## Scientific evidence rules (dominant over implementation rules)

- Minimal code is acceptable; minimal evidence is not.
- Claims need the minimum sufficient evidence surface: operational definition, metric, prediction, negative control, and reproducible experiment.
- Metrics must state unit, domain, estimator, uncertainty, and decision criterion.
- Keep ontology, mathematical model, implementation, language, and interpretation separate.
- Software verification is not scientific support: exit code 0 does not validate a claim.
- Always report raw adjudicator verdicts and `external_support_certified`, not just PASS.
- No causal claim without an explicit causal graph or explicit causal assumptions.
- No claim survives without a negative control or a documented reason it is impossible.
- Preregister phase scope, expected outcomes, controls, and stopping rules when evidence is generated.
- Ledger every phase with files read, files changed, commands, raw outputs, debt, and residual risks.
- Mark simplifications, proxies, toy margins, and synthetic fixtures as such.
- Internal evidence remains internal until independent data, method review, and replication exist.
- AI cross-audit reduces error; it is not certification.
- Implementation minimalism does not apply to evidence, formalization, hypotheses, or claims.

## Layout (don't guess)

The repo has two cooperating tiers. Confusing them is the #1 source of wasted cycles (see VERSION 3 / `TOOL-CWD` in `rigid-identity-framework/ROADMAP.md`):

- **Root** (`QICN-FRAMEWORK/`): release governance, doc canon, machine-readable manifests under `release/`, PDF corpus under `corpus/`, root verifiers under `scripts/`. Active math source and papers live one level down, **not here**.
- **Inner** (`rigid-identity-framework/`): `basecore/` is the active base layer; `paper1..paper10*/` are downstream packages; `monolithic/` is the assembled volume; `registry/` is the machine-readable theorem/macro corpus; `scripts/` is the audit/adjudication tooling with its own `package.json`. Legacy `canonical_core_legacy/` is preserved, not modified.

## Verification before any "done" claim

Run from the **repo root**:

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

Then run the inner framework gate from `rigid-identity-framework/`:

```bash
cd rigid-identity-framework && npm run verify:release
```

If any fails, **stop** and report. Do not patch around the failure.

Verifier reporting convention: exit code 0 ≠ verdict approved. Always report the adjudicator verdict string verbatim (e.g. `BLOCKED_FOUNDATION_FIRST_GATES`) and `external_support_certified` together with any 'PASS'. `external_support_certified=false` is a deliberate scientific boundary, not a repo failure.

## Compile a paper

Each paper has its own folder under `rigid-identity-framework/`; compile from inside that folder. For BaseCore use `basecore/BASECORE.tex`:

```bash
cd rigid-identity-framework/basecore
pdflatex -interaction=nonstopmode BASECORE.tex
biber BASECORE
pdflatex -interaction=nonstopmode BASECORE.tex
pdflatex -interaction=nonstopmode BASECORE.tex
```

Build the full assembled volume with `npm run compile:monolithic` (from `rigid-identity-framework/`). `*.aux/.log/.out/.toc/.bbl/.blg/.bcf/.run.xml` are build artifacts — keep them out of commits when feasible.

## Container reproducibility

The `Dockerfile` at the root runs the full gate chain (root verifiers + `npm run verify:release`) with `QICN_GOVERNANCE_BLINDED=true`. Use it when reproducing CI locally. CI itself is `.gitlab-ci.yml` (stages: verify, audit).

## Agent behavior

- Default agent: **build**. Use **plan** for non-trivial design decisions.
- Subagents (`explore`, etc.) inherit provider timeouts (10 min hard). If a subagent runs >10 min, it is hung — report and abort.
- Prefer `read` / `glob` / `grep` over `bash` for file discovery. Bash is for execution only.
- When in doubt about a claim, cross-check with `release/claim_registry.v1.json` before stating it.
- AI platform outputs (reports, audits, prompts, repair plans) go under `rigid-identity-framework/docs/ai-platform-outputs/`. Every phase that touches the framework also writes a row to `IMPLEMENTATION_TRACE_LEDGER.md` there. See `rigid-identity-framework/INSTRUCCIONES.md` for the full phase protocol and audit-before-push rules.
- Active roadmap is `rigid-identity-framework/ROADMAP.md` (preserves VERSION 1, 2, 3 as literal user text). Read it together with `INSTRUCCIONES.md` before any non-trivial change.

## Forbidden operations

- `rm -rf` outside `node_modules/`, `_build/`, and explicitly listed build artifacts.
- Force-push (`git push --force`).
- Direct edits under `release/canon_manifest.v1.json` or `release/claim_registry.v1.json` — those are versioned and audited.
