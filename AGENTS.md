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

## Verification before any "done" claim

Run, in order, and confirm clean output:

```bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
```

If any fails, **stop** and report. Do not patch around the failure.

Verifier reporting convention: verifier exit code 0 ≠ verdict approved. Always report the adjudicator verdict string verbatim (e.g. BLOCKED_FOUNDATION_FIRST_GATES) and external_support_certified together with any 'PASS'.

## Agent behavior

- Default agent: **build**. Use **plan** for non-trivial design decisions.
- Subagents (`explore`, etc.) inherit provider timeouts (10 min hard). If a subagent runs >10 min, it is hung — report and abort.
- Prefer `read` / `glob` / `grep` over `bash` for file discovery. Bash is for execution only.
- When in doubt about a claim, cross-check with `release/claim_registry.v1.json` before stating it.

## Forbidden operations

- `rm -rf` outside `node_modules/`, `_build/`, and explicitly listed build artifacts.
- Force-push (`git push --force`).
- Direct edits under `release/canon_manifest.v1.json` or `release/claim_registry.v1.json` — those are versioned and audited.
