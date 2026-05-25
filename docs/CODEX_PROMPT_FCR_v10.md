# CODEX PROMPT: FCR v10 - Falsifiability Roadmap Integration + Deductive Impact

> Required posture: objective, anti-sycophancy, anti-psychofancy. The goal is
> not to defend QICN. The goal is to expose the framework to stronger failure
> modes while preserving every valid formal gain from v9.

## 0. Governing Document

The governing document for FCR v10 is:

`rigid-identity-framework/docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

That file is now the live falsifiability ledger. Every FCR v10 phase must update
it only when a point is actually completed, partially completed, blocked, or
degraded. No point may be marked complete by intention, elegance, optimism,
internal enthusiasm, or rhetorical strength.

## 1. Objective

FCR v10 is not a new theorem wave and not an external validation wave. It is a
traceability, sensitivity, and anti-overclaim wave.

Mission:

1. Treat the falsifiability roadmap as the canonical progress ledger.
2. Convert the useful parts of the Anti-Gravity analysis into verifiable FCR
   tasks.
3. Reject or downgrade Anti-Gravity claims that overstate the evidence.
4. Add a read-only deductive impact analyzer so changes to hypotheses,
   definitions, or audit-overlaid entries reveal downstream dependency risk.
5. Clarify the difference between active FCR cleanliness, raw macro/preamble
   risk, LaTeX compilation readiness, accessibility readiness, and external
   validation.

## 2. Anti-Gravity Analysis Triage

| Anti-Gravity point | FCR v10 verdict | Action |
|---|---|---|
| v9 reduced psychofancy and terminological reification | Accept with caution | Preserve as a direction, not as "definitive emancipation". Add objective anti-overclaim checks. |
| Paper 5 subdetermination remark improves honesty | Accept | Track `rem:subdet` as a model-boundary gain and use it in future claim grammar. |
| Paper 6 PRED-04 split improves falsifiability | Accept | Seed prediction-registry work from PRED-04a/b/c and PRED-11, but do not claim empirical validation. |
| Bridge no-theorem downgrades increase credibility | Accept | Add no-theorem inflation audit to v10 documentation checks. |
| FCR as unified static compiler | Accept with boundary | FCR is a static hygiene compiler, not a proof assistant and not a theorem-truth verifier. |
| Macro collision policy reached 0 active warnings | Accept with boundary | Active semantic warnings are 0; raw repeated definitions remain visible and matter for monolithic compilation. |
| Dependency graph is a DAG | Accept only as validation result | Cycle detection passes locally; this does not prove mathematical independence or semantic correctness. |
| THEOREM_ATLAS/CORPUS_HEALTH meet WCAG AAA | Reject as unsupported | Reword to accessibility-readiness unless a real WCAG audit is performed. |
| AUDIT_OVERRIDES protect prior corrections | Accept | Extend with impact/sensitivity reporting over audit-overlaid nodes. |
| Framework is structurally definitive, inexpugnable, ready for external adjudication | Reject | Replace with: v9 is structurally cleaner and ready for a controlled v10 hardening pass. External adjudication remains unexecuted. |

## 2.1 OpenCode Review Integration

OpenCode's review adds three constraints that FCR v10 must obey:

1. The impact analyzer is a maintenance tool, not an empirical-strengthening
   tool. It helps answer "what must be rechecked if H changes?" It does not
   answer "is QICN empirically supported?"
2. Documentary artifacts are dangerous if they create satisfaction without
   experimental load. A new ledger, matrix, or template counts only when it
   makes a third-party experiment easier to design, execute, falsify, or audit.
3. Monolithic LaTeX compilation is lower priority than epistemic traceability.
   It should be audited as risk, but not allowed to consume the v10 cycle unless
   it blocks a concrete publication or review target.

Additional success metric:

> FCR v10 succeeds only if a third party can read the resulting artifacts and
> design at least one concrete experiment or falsification attempt without
> private explanation from the authors.

This criterion is stricter than "the docs are cleaner" and weaker than
"external validation has been achieved." It is the correct intermediate target.

## 3. Scope

In scope for v10:

- Roadmap ledger update discipline.
- FCR impact analyzer MVP.
- FCR documentation hardening.
- Overclaim and accessibility language hardening.
- Monolithic-compilation risk audit.
- First machine-readable scaffolding for prediction/falsifier traceability.
- Actionability review: every new artifact must state what experiment,
  falsifier, audit, or maintenance operation it enables.

Out of scope for v10:

- Claiming external validation.
- Claiming consciousness, phenomenality, subjectivity, identity transfer, or
  moral status.
- Full BPF-2/BPF-3 implementation.
- Full external adjudication execution.
- Rewriting all papers at once.
- Treating this prompt as permission to change theorem status without evidence.
- Counting documentary volume as theoretical progress.

## 4. Phase 0 - Preflight And Baseline

Read before editing:

- `rigid-identity-framework/docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`
- `docs/AUDIT_HANDOFF_FCR_v9.md`
- `rigid-identity-framework/docs/reports/FCR_V9_CODEX_AUDIT_REPAIR.md`
- `rigid-identity-framework/docs/FCR_SPEC.md`
- `rigid-identity-framework/scripts/registry-lib.js`
- `rigid-identity-framework/registry/theorems.jsonl`
- `rigid-identity-framework/registry/macros.jsonl`

Commands:

```powershell
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK"
git status --short

cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework"
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
```

Expected baseline from current v9 repair state:

- 745 formal entries.
- 432 macro entries.
- 20 audit-overlaid entries.
- 0 false-status entries.
- 0 active macro-collision entries/groups.
- 0 blockers.
- 0 warnings.

If these change, record the difference before proceeding.

## 5. Phase 1 - Roadmap Ledger Integration

Objective: make the falsifiability roadmap a living control surface.

Tasks:

1. Keep Section 13 of the roadmap as the canonical progress table.
2. Do not mark a task `[x]` without a file path and a verification command.
3. When a task is only internal support, mark `[~]`, not `[x]`.
4. If a task fails, mark `[!]` and record the falsifier or blocker.

Verification:

```powershell
rg -n "Ledger Vivo|Analizador de impacto deductivo|WCAG|PREDICTION_REGISTRY" rigid-identity-framework/docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md
```

## 6. Phase 2 - Deductive Impact Analyzer MVP

Objective: implement a read-only sensitivity analyzer over
`registry/theorems.jsonl`.

New file:

`rigid-identity-framework/scripts/fcr-impact-analyzer.js`

Minimum CLI:

```powershell
node scripts/fcr-impact-analyzer.js --target basecore:hypothesis:hyp-phi-regularity
node scripts/fcr-impact-analyzer.js --target basecore:hypothesis:hyp-phi-regularity --json
node scripts/fcr-impact-analyzer.js --audit-overlays
```

Minimum output:

- Target id, type, paper, epistemic status, location.
- Direct dependents.
- Transitive dependents.
- Impact by paper.
- Impact by type.
- Impact by epistemic status.
- Maximum dependency depth from the target.
- Whether any impacted entry is `proved`, `conditional`, `heuristic`,
  `conjectural`, or audit-overlaid.
- Warning that impact is syntactic/FCR-explicit only, not full semantic
  dependency.

Implementation constraints:

- Read-only. It must not edit registry files.
- No swallowed JSON parse failures without reporting line numbers.
- Missing dependency ids must be reported.
- Cycles, if encountered, must fail clearly even though the validator should
  already block them.
- Sorting must be deterministic.

Recommended npm script:

```json
"analyze:impact": "node scripts/fcr-impact-analyzer.js"
```

Verification:

```powershell
npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity
npm run analyze:impact -- --audit-overlays
npm run verify:corpus-registry -- --strict-crossrefs
```

Roadmap update rule:

- Mark `Analizador de impacto deductivo` as `[x]` only after the script exists,
  runs against `hyp-phi-regularity`, and reports deterministic direct and
  transitive impact.

## 7. Phase 3 - FCR Documentation Boundary Hardening

Objective: remove or prevent overclaims about what FCR validates.

Tasks:

1. Update `rigid-identity-framework/docs/FCR_SPEC.md` status from stale
   `v8-FCR hardening` to a current v10-aware status.
2. Add a boundary paragraph:
   - FCR proves registry hygiene, not theorem truth.
   - DAG validation proves no explicit registry cycles, not semantic
     independence.
   - 0 active macro warnings does not prove monolithic LaTeX compilation.
   - Internal support does not imply external validation.
3. Add a short subsection for impact analysis and sensitivity reporting.

Verification:

```powershell
rg -n "theorem truth|monolithic|impact|sensitivity|external validation" rigid-identity-framework/docs/FCR_SPEC.md
```

## 8. Phase 4 - Monolithic Compilation Risk Audit

Objective: preserve v9's useful macro policy while documenting the remaining
raw preamble risk objectively.

Tasks:

1. Create `rigid-identity-framework/docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md`.
2. Use `registry/macros.jsonl` to list policy-exempt repeated macros and theorem
   declarations.
3. Separate:
   - active semantic collision risk,
   - local typographic redefinition risk,
   - theorem environment declaration risk,
   - unified-volume compile risk.
4. Do not force a unified preamble surgery in this phase unless the audit shows
   a blocker.

Verification:

```powershell
rg -n "arraystretch|newtheorem|monolithic|active semantic" rigid-identity-framework/docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md
```

Roadmap update rule:

- Mark `Riesgo de compilacion monolitica por macros locales` as `[~]` after the
  audit exists.
- Mark `[x]` only after an actual monolithic compile strategy is implemented and
  tested.

## 9. Phase 5 - Accessibility And Report-Language Hardening

Objective: prevent unsupported WCAG claims.

Tasks:

1. Search docs for `WCAG AAA`.
2. Replace unsupported AAA claims with `accessibility-readiness` unless a real
   WCAG audit artifact exists.
3. Document what is actually true:
   - Markdown tables are sequentially readable.
   - Headings are hierarchical.
   - Mermaid diagrams are supplementary, not sole source of information.
   - No formal screen-reader or contrast audit has been run.

Verification:

```powershell
rg -n "WCAG AAA|accessibility-readiness|screen-reader|Mermaid" docs rigid-identity-framework/docs
```

Roadmap update rule:

- Keep `Claims de accesibilidad tipo WCAG AAA` as `[!]` until unsupported
  claims are removed.
- Mark `[~]` after language is corrected to accessibility-readiness.
- Mark `[x]` only after a real accessibility audit.

## 10. Phase 6 - Prediction/Falsifier Scaffold

Objective: begin moving from roadmap prose to machine-readable falsifiability.

New files:

- `rigid-identity-framework/docs/PREDICTION_REGISTRY_v1.json`
- `rigid-identity-framework/docs/FALSIFIER_MATRIX.md`

Initial prediction families:

- PRED-02: invariant-loss rupture.
- PRED-03/PRED-11: complexity-only failure.
- PRED-04a/b/c: boundary behavior.
- PRED-05: continuity/fragmentation differential.
- PRED-09: budget/admissibility invalidation.

Each prediction record must include:

- id.
- owning paper.
- claim target.
- observable.
- manipulation.
- rival prediction.
- support condition.
- weakening condition.
- destruction condition.
- required artifacts.
- current status: `formal`, `internal-support-only`, `planned`,
  `blocked`, or `externally-adjudicated`.

Roadmap update rule:

- Mark `Registro de predicciones pre-registrables` as `[~]` after initial
  scaffold exists.
- Mark `[x]` only after predictions are pre-registered with fixed thresholds
  and execution protocol.

## 11. Phase 7 - Final Verification

Required commands:

```powershell
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework"
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity
```

Required manual checks:

- Roadmap Section 13 updated only for tasks actually completed.
- No external-validation language introduced.
- No `WCAG AAA` claim remains unless a true audit artifact exists.
- The impact analyzer report states its syntactic-dependency limitation.
- New reports distinguish raw risk from active FCR blockers.

## 12. Success Criteria

- [ ] Roadmap remains the canonical falsifiability ledger.
- [ ] FCR v10 plan does not promote QICN from program to validated theory.
- [ ] Impact analyzer exists and reports direct/transitive impact.
- [ ] FCR_SPEC clarifies static compiler boundaries.
- [ ] Monolithic compile risk is audited separately from active macro warnings.
- [ ] Unsupported WCAG AAA language is removed or downgraded.
- [ ] Initial prediction/falsifier scaffolds exist, if Phase 6 is executed.
- [ ] `verify:corpus-registry -- --strict-crossrefs` exits 0.
- [ ] `verify:macro-registry` exits 0.

## 13. First Granular Execution Recommendation

Do not run all v10 phases at once.

Recommended first implementation slice:

1. Phase 2 only: implement `fcr-impact-analyzer.js`.
2. Add the npm script `analyze:impact`.
3. Generate or document one impact run for
   `basecore:hypothesis:hyp-phi-regularity`.
4. Update the roadmap ledger for only that point.

This gives the framework a concrete new capability without touching theorem
claims, paper prose, or external-validation language.
