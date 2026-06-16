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
