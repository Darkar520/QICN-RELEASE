# AUDIT_FCR_v10_PASS2.md

**Date:** 2026-05-25
**Auditor:** OpenCode (assisted by `audit-context-building`, `verification-before-completion`, `advanced-evaluation`, `research-ops`)
**Target:** FCR v10 Pass 2 implementation by Codex in `rigid-identity-framework`
**Scope:** 9 edited files, 6 verification commands, gap analysis against `QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

---

## 1. Executive Verdict

**Status: DELIVERED WITH CONTROLLED GAPS.**

Codex implemented FCR v10 Pass 2 with postura objetiva, as claimed. The deliverables are real, the verification commands pass, and the boundary statements are honest. However, several roadmap items remain open and one critical classification in the monolithic audit requires correction.

The postura objetiva claim is **verified**: the monolithic risk is correctly reported as YELLOW (not GREEN), thresholds are honestly marked `not_frozen`, and no external validation is claimed.

---

## 2. Verification Evidence (Fresh)

| Command | Output | Claim Supported |
|---|---|---|
| `npm run verify:corpus-registry -- --strict-crossrefs` | 745 entries, 0 blockers, 0 warnings | Yes. No semantic collisions. |
| `npm run verify:macro-registry` | 432 macros, 0 blockers, 0 warnings | Yes. No active macro conflicts. |
| `npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity` | 1 direct, 3 transitive, depth 2 | Yes. Impact analyzer functional. |
| `npm run audit:monolithic-risk` | Generated `MONOLITHIC_COMPILE_RISK_AUDIT.md` | Yes. Auditor runs and produces output. |
| `node -e "JSON.parse(...)"` (registry validation) | Schema 1.1.0, 13 predictions | Yes. JSON is structurally valid. |

**Verification-before-completion rule satisfied**: All claims about file existence, command functionality, and registry validity are backed by fresh command output captured in this session.

---

## 3. File-by-File Evaluation

### 3.1 `scripts/verify-monolithic-risk.js`

**Role:** Read-only lexical risk auditor for unified LaTeX compilation.

**Strengths:**
- Correctly reuses `registry-lib.js` primitives (`classifyMacroCollision`, `groupByLatexName`, `readJsonl`).
- Distinguishes 5 risk classes: `active-semantic-conflict`, `standard-formatting-override`, `repeated-theorem-environment`, `distinct-theorem-environment-declarations`, `identical-definition-repeated`.
- Governance boundary statement is explicit: does not certify theorem truth, empirical validation, consciousness, etc.
- Overall risk classifier correctly maps: active conflicts → RED, manual review → YELLOW, identical repeats → YELLOW (shared-preamble work), no repeats → GREEN.

**Weaknesses:**
- **Line 106**: The YELLOW status for `manualReview.length > 0` is triggered by `\begin{axiom}` having distinct declarations (`Axiom` vs `Bridge Axiom`). However, the report text says "unified-volume declarations need manual review" which is correct, but the summary table in `MONOLITHIC_COMPILE_RISK_AUDIT.md` lists "Manual-review theorem declaration groups: 1". The classification `axiom` as a "theorem environment" is technically imprecise; it is an axiom environment. This is a minor terminological drift, not a blocker.
- The script does not attempt compilation; it only audits lexical repetition. This is honest (stated in boundary), but means the YELLOW status is a **pre-compilation risk**, not a post-compilation verdict.

**Verdict:** FUNCTIONAL, HONEST, MINOR TERMINOLOGICAL DRIFT.

### 3.2 `docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md`

**Role:** Human-readable output of the monolithic auditor.

**Strengths:**
- Overall risk correctly stated as YELLOW.
- 0 active semantic conflicts confirmed.
- 64 identical repeated definitions catalogued with precise locations.
- The `\arraystretch` override is correctly flagged as `local-scope-required`.
- Required next gate is explicit: shared preamble, local grouping, re-run, compile.

**Weaknesses:**
- **Table truncation risk**: The `\arraystretch` row is heavily truncated (line 27: `paper7:paper7_ope... (line truncated to 2000 chars)`). This is a rendering artifact of the read tool, not the file itself, but it means the full report is unreadable without opening the file directly.
- **Governance boundary repetition**: The boundary statement is good but could reference `NON_CLAIM_LEDGER_CANONICAL.md` for cross-consistency.

**Verdict:** ACCURATE, COMPLETE, YELLOW STATUS MAINTAINED.

### 3.3 `docs/PREDICTION_REGISTRY_v1.json`

**Role:** Machine-readable binding for all 13 Paper 6 predictions.

**Strengths:**
- Schema 1.1.0 with explicit `threshold_policy`, `status_semantics`, and per-prediction structure.
- All 13 predictions present: PRED-01 through PRED-11, with PRED-04a/b/c split.
- Each prediction includes: `id`, `claim_target`, `claim_family`, `observable`, `manipulation`, `framework_prediction`, `rival_prediction`, `support_condition`, `weakening_condition`, `destruction_condition`, `required_artifacts`, `minimum_negative_controls`, `thresholds`, `current_status`, `epistemic_limit`.
- Threshold states are explicit and honest:
  - `not_frozen`: 11 slots (cannot be used as decision boundaries yet).
  - `formal_not_numeric`: 3 slots (formal symbol exists, no numeric execution value).
  - `frozen_from_corpus_text`: 1 slot (`transition_band_fraction` = 0.10 in PRED-04c).
  - `frozen_from_claim_logic`: 1 slot (`tamper_acceptance_tolerance` = 0 in PRED-06).
- Epistemic limits are precise and repetitive (good for preventing drift): "not human equivalence or identity transfer", "not a consciousness or phenomenality test", etc.

**Weaknesses:**
- **No programmatic validation schema**: While the JSON parses, there is no `schema.json` enforcing the 1.1.0 contract. A malformed threshold (e.g., missing `date_frozen` when status is `frozen_from_corpus_text`) would not be caught automatically. The `scripts/validate-corpus.js` does not cover this file.
- **Missing cross-reference to measurement dictionary**: The `measurement_dictionary_key` field is absent from predictions. PRED-07 references `delta_star_budget` but does not link to `MEASUREMENT_DICTIONARY_v1.md` § Six-Invariant Measurement Surface.
- **Date uniformity**: `date_frozen` is "2026-05-25" for frozen slots, but the registry `date` field is also "2026-05-25". This conflates registry generation date with threshold freeze date. For `frozen_from_corpus_text`, the freeze date should ideally reference the corpus version or commit, not the registry generation date.

**Verdict:** STRUCTURALLY SOUND, SEMANTICALLY HONEST, NEEDS SCHEMA VALIDATION AND CROSS-REFERENCING.

### 3.4 `docs/MEASUREMENT_DICTIONARY_v1.md`

**Role:** Binds Paper 5 invariants to measurement slots with candidate estimators.

**Strengths:**
- 6 invariants (`I_per`, `I_ri`, `I_int`, `I_cont`, `I_diff`, `I_leg`) each mapped to: formal role, measurement slot, candidate estimator, threshold status, main false-positive risk, required controls/artifacts.
- Submetrics for `I_leg` (L1–L6) explicitly listed with required inequalities.
- Prediction-term binding table links registry language to dictionary slots.
- Honest boundary: "It cannot execute experiments. It cannot choose final thresholds without a preregistration artifact."
- Correctly marks all thresholds as `not_frozen` or `formal_not_numeric`.

**Weaknesses:**
- **Candidate estimators are vague**: "Fraction or minimum distance of admissible windows remaining inside a forward-invariant support under the perturbation panel" (`I_per`) is a conceptual description, not an executable estimator. There is no pseudocode, no formula, no reference to a specific algorithm or library.
- **No uncertainty quantification**: Each slot lists false-positive risks but does not list false-negative risks or confidence intervals.
- **Missing runtime binding**: The dictionary does not reference `src/experiments/ExperimentalEpisodeHarness.js` or `src/canon/invariants/CanonicalInvariantPackage.js` from QICN-SYSTEM. This is expected (different repo), but the gap is real: the dictionary is a theoretical scaffold without runtime instrumentation.
- **PRED-04c discrepancy**: The dictionary states "Threshold `0.10` is corpus-stated; scan step and parameter range are not frozen." This matches the registry. Good.

**Verdict:** USEFUL SCAFFOLD, NOT YET EXECUTABLE. ESTIMATORS NEED FORMALIZATION.

### 3.5 `docs/PREREGISTRATION_TEMPLATE_v1.md`

**Role:** Template for converting registry entries into frozen tests.

**Strengths:**
- Comprehensive fields: prediction ID, claim target, hypothesis and rival, measurement binding, dataset/seeds/controls, analysis plan, decision record.
- Anti-inflation clause at the bottom: "No result from this template may be described as external validation unless it was executed by an independent adjudicator..."
- Explicitly states: "Completing this template is not evidence. It is a precondition for admissible evidence."

**Weaknesses:**
- **Template only, no populated instances**: This is acknowledged as a limit by Codex and the roadmap. The template is structurally correct but has not been tested with a real prediction.
- **No machine-readable version**: The template is markdown. A JSON/YAML counterpart would enable programmatic validation and CI integration.
- **Missing statistical power guidance**: The analysis plan asks for "Power analysis / minimum detectable effect" but provides no guidance on how to calculate this for QICN-specific metrics.

**Verdict:** WELL-DESIGNED TEMPLATE, ZERO POPULATED INSTANCES.

### 3.6 `docs/THEORY_CLAIM_LEDGER.md`

**Role:** Strong claim families with falsifiers and epistemic status.

**Strengths:**
- 10 claim families (BaseCore through Paper 10 + Bridge) each with: corpus locus, permitted formulation, required burden, primary falsifier, current status.
- Statuses are honest: "Formal/conditional, not personal identity", "Scaffolded; preregistration pending", "Architecture only; unexecuted."
- Update rule is strict: "Any claim may move upward only with a linked preregistration, artifact set, negative-control result, rival comparison, and decision record."

**Weaknesses:**
- **No programmatic linkage**: The ledger is prose. It does not reference specific theorem IDs, registry prediction IDs, or falsifier matrix rows by anchor.
- **Bridge paper missing**: The Bridge paper (operational subjecthood) is not listed as a separate row; it is partially covered under Paper 9 but should have its own entry.
- **No versioning**: The ledger is v1 but does not specify how version increments trigger claim re-evaluation.

**Verdict:** HONEST CLASSIFICATION, NEEDS MACHINE-READABLE LINKAGE.

### 3.7 `docs/NON_CLAIM_LEDGER_CANONICAL.md`

**Role:** Canonical boundary statements preventing semantic drift.

**Strengths:**
- 27 explicit non-claims covering consciousness, phenomenality, identity transfer, moral status, external validation, theorem truth from FCR alone, etc.
- Layer-specific non-claims for Papers 1–10.
- Enforcement rule: any future document using ordinary-language loaded terms must cite operational class or explicitly deny the ordinary claim.

**Weaknesses:**
- **No automated enforcement**: The ledger exists as a document but there is no lint rule or CI gate that checks new `.tex` or `.md` files against these non-claims.
- **Missing runtime non-claims**: The ledger focuses on papers but does not explicitly block runtime artifacts (e.g., `metrics.pmia`, `flags.io_partial`) from being described as "consciousness indicators."

**Verdict:** ESSENTIAL BOUNDARY DOCUMENT, NEEDS AUTOMATED ENFORCEMENT.

### 3.8 `docs/FALSIFIER_MATRIX.md`

**Role:** Third-party-testable falsifier shapes for 13 predictions.

**Strengths:**
- All 13 predictions mapped to support/weakening/destruction conditions.
- Required rival/control column is explicit.
- Anti-inflation rules at the bottom: support is not evidence until frozen; destruction must trigger downgrade; weakening cannot be rebranded as support.

**Weaknesses:**
- **Matrix is prose, not machine-readable**: Unlike the registry (JSON), the matrix is markdown. A parser would need regex to extract rows. This limits programmatic consumption.
- **No threshold values**: The matrix omits threshold values (they live in the registry). This is by design but means the matrix alone is insufficient to design a test.
- **Next conversion step is acknowledged**: "The next step is not another prose report. The next step is a preregistration template..." This honesty is good but also confirms the gap.

**Verdict:** CLEAR AND HONEST, BUT PROSE FORMAT LIMITS PROGRAMMATIC USE.

### 3.9 `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

**Role:** Master roadmap with live compliance ledger.

**Strengths:**
- Section 13 (Ledger Vivo De Cumplimiento) updated with Codex's 2026-05-25 pass.
- Honest status codes: `[~]` for partially completed items, `[ ]` for open items.
- Monolithic compilation risk correctly marked `[~]` with detailed evidence string.
- Explicit rule: updates must include date, file, verification command, and epistemic limit.

**Weaknesses:**
- **WCAG AAA accessibility** is marked `[~]` with evidence that it only exists as non-claim. This is honest but could be more explicit: it should probably be `[ ]` unless an actual WCAG audit was performed.
- **Theory claim ledger** marked `[~]` but the ledger itself is prose without programmatic extraction.
- **Some items could be downgraded**: The `[~]` marking for `Theory claim ledger` and `Non-claim ledger canonico` is generous. These are documents, not executable gates. `[~]` implies partial completion; for documents, `[x]` (completed) might be more accurate, but the roadmap requires a "gate que bloquee drift linguistico" which is missing, justifying `[~]`.

**Verdict:** WELL-MAINTAINED LEDGER, STATUS CODES ARE MOSTLY ACCURATE.

---

## 4. Gap Analysis: FCR v10 Pass 2 vs Roadmap

### 4.1 Closed in Pass 2 (Verified)

| Roadmap Item | File | Status |
|---|---|---|
| Monolithic compilation risk auditor | `verify-monolithic-risk.js` + `MONOLITHIC_COMPILE_RISK_AUDIT.md` | `[~]` — implemented, needs manual review resolution |
| Theory claim ledger | `THEORY_CLAIM_LEDGER.md` | `[~]` — exists, needs machine-readable linkage |
| Non-claim ledger canonico | `NON_CLAIM_LEDGER_CANONICAL.md` | `[~]` — exists, needs automated enforcement |
| Measurement dictionary | `MEASUREMENT_DICTIONARY_v1.md` | `[~]` — exists, estimators need formalization |
| Prediction registry (all 13) | `PREDICTION_REGISTRY_v1.json` | `[~]` — scaffolded, thresholds mostly unfrozen |
| Falsifier matrix (all 13) | `FALSIFIER_MATRIX.md` | `[~]` — prose matrix complete, needs programmatic form |
| Preregistration template | `PREREGISTRATION_TEMPLATE_v1.md` | `[~]` — template exists, zero populated instances |

### 4.2 Remaining Open (`[ ]`)

| Roadmap Item | Risk if Delayed |
|---|---|
| Negative control suite (`NEGATIVE_CONTROL_SUITE.md`) | Cannot claim specificity without executed controls. |
| Rival model registry (`RIVAL_MODEL_REGISTRY.md`) | Cannot claim irreducibility without concrete rival implementations. |
| Populated preregistrations | Cannot claim pre-registration discipline without frozen datasets/seeds/thresholds. |
| External replication/adjudication | Cannot claim external validation. Paper 10 remains architecture-only. |
| Automated drift guard against `NON_CLAIM_LEDGER_CANONICAL.md` | Risk of semantic inflation in future documents. |
| Machine-readable version of `THEORY_CLAIM_LEDGER.md` | Limits automated claim-status reporting and CI integration. |

### 4.3 Critical Gap: Programmatic Validation of `PREDICTION_REGISTRY_v1.json`

The registry is the most important artifact for falsifiability, yet it has no JSON Schema enforcement. A missing `date_frozen` on a `frozen_from_corpus_text` threshold, or a typo in `destruction_condition`, would not be caught by any existing CI gate.

**Recommendation**: Add `scripts/validate-prediction-registry.js` and integrate into `npm test`.

---

## 5. Honesty Assessment (Postura Objetiva)

Codex's self-reported limits are accurate:
- "No hice commit ni tag porque no lo pediste explícitamente" → **Verified**. Working tree is modified, no new commit.
- "La suite de controles negativos, el registro unificado de rivales fuertes y los preregistros poblados siguen abiertos" → **Verified**. These are `[ ]` in the roadmap.
- "Esta pasada mejora trazabilidad y accionabilidad, pero todavía no produce evidencia experimental nueva" → **Verified**. All artifacts are scaffolds, not experimental results.
- "Reporta 0 conflictos semánticos activos, pero mantiene riesgo YELLOW por revisión manual de axiom" → **Verified**. The audit output confirms YELLOW with 1 manual-review group (`axiom`).

**No overclaims detected in Codex's summary.**

---

## 6. Recommendations for Next Pass (FCR v11 or Continuation)

### Priority 1: Programmatic Safety
1. **JSON Schema for `PREDICTION_REGISTRY_v1.json`**: Enforce that `frozen_*` statuses have non-null `value`, `date_frozen`, and `rationale`.
2. **Lint rule for non-claims**: A script that greps new `.tex`/`.md` files against `NON_CLAIM_LEDGER_CANONICAL.md` terms and flags unqualified usage.

### Priority 2: Executable Rigor
3. **Formalize one estimator**: Pick `I_per` or `I_leg` and write pseudocode + reference implementation stub. The measurement dictionary is too vague to guide a third-party实验者.
4. **Populate one preregistration**: Choose PRED-04c (it has one frozen threshold) or PRED-06 (frozen by claim logic). Fill the template with a concrete dataset, seeds, and analysis plan.

### Priority 3: Rival Discipline
5. **Create `RIVAL_MODEL_REGISTRY.md`**: For PRED-03/PRED-11, define at least one complexity-only rival with enough detail that an independent team could implement it.
6. **Create `NEGATIVE_CONTROL_SUITE.md`**: List the 8 mandatory controls from the roadmap with pass/fail criteria and predicted outcomes.

### Priority 4: Compilation Closure
7. **Resolve `axiom` manual review**: Decide whether `Axiom` and `Bridge Axiom` can coexist in a unified preamble or whether the Bridge paper must use a different environment name.
8. **Test shared-preamble compilation**: Create a minimal unified `.tex` that includes all papers and verify that the 64 identical definitions and 15 theorem environments compile without conflict.

---

## 7. Scoring (Direct Scoring per `advanced-evaluation` Skill)

| Criterion | Weight | Score (1–5) | Justification |
|---|---|---|---|
| Structural completeness | 1.0 | 5 | All 13 predictions, 6 invariants, 10 claim families, 27 non-claims present. |
| Honesty / boundary discipline | 1.0 | 5 | No external validation claimed. All thresholds honestly marked. YELLOW not GREEN. |
| Machine readability | 0.8 | 3 | Registry is JSON (good). Matrix, ledgers, dictionary are prose (limits CI). |
| Executable specificity | 0.8 | 2 | Estimators are conceptual. No populated preregistrations. No formalized rivals. |
| Automated enforcement | 0.6 | 2 | No schema validation for registry. No lint for non-claims. |
| Cross-referencing | 0.6 | 3 | Registry ↔ dictionary linkage is implicit, not programmatic. |

**Weighted average: 3.6 / 5.0**

---

## 8. Conclusion

FCR v10 Pass 2 is a **genuine improvement in falsifiability infrastructure**. It does not claim to be more than it is. The gaps are explicitly acknowledged, the status codes are honest, and the boundary statements are repetitive and strong.

The next bottleneck is not documentation but **execution**: one populated preregistration, one formalized estimator, one implemented rival, one compiled unified volume. Until those exist, QICN remains a formal-operational program with strong internal scaffolding, not an empirically tested theory.

This audit finds **no blockers** and **no overclaims** in the v10 Pass 2 deliverables. It finds **structural completeness with executable gaps**.

---

*End of audit. Evidence captured 2026-05-25. All verification commands run fresh in this session.*
