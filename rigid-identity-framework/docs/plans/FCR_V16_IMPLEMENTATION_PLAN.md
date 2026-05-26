# FCR v16 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate QICN from an internal synthetic pilot with clean infrastructure to a framework capable of external falsification by executing one clean-room run, freezing three internal prediction protocols, resolving the I_int formal burden, producing a monolithic LaTeX volume, hardening negative controls, and receiving human mathematical curation.

**Architecture:** Six parallelizable milestones with two sequential hard gates. Milestones 1, 2, and 5 are empirical/protocol tracks. Milestones 3, 4, and 6 are formal/mathematical tracks. Milestones 1 and 2 must complete before the final v16 release gate. Milestones 3, 4, 5, and 6 can proceed in parallel but must all pass before v16 is declared.

**Tech Stack:** Node.js (runners, gates), LaTeX with shared preamble (monolithic compilation), JSON/YAML (freeze artifacts), Markdown (protocols and reports), Git (traceability).

---

## Phase 0: Foundation Gate (Run Before Any Milestone)

**Purpose:** Ensure the v15-pilot baseline is clean and all infrastructure is reproducible before any v16 work begins.

- [ ] **Step 0.1: Run full v15 gate suite**

```bash
cd rigid-identity-framework
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run verify:curation-overlays
npm run audit:extractor-reproducibility
npm run audit:extractor-diagnostic
npm run audit:monolithic-risk
npm run lint:nonclaims
npm run verify:coordinate-specs
npm run test:trace-memory-rival
npm run pilot:pred-ext-01
npm run test:tamper-prereg
```

**Expected:** All PASS or expected status (monolithic-risk = YELLOW).

- [ ] **Step 0.2: Verify git baseline**

```bash
git status
git log --oneline -1
```

**Expected:** Working tree clean, commit `3b8d8a3` or later.

- [ ] **Step 0.3: Create v16 working branch**

```bash
git checkout -b fcr/v16-execution
```

---

## Milestone 1: Clean-Room External PRED-EXT-01 Execution

**Goal:** Execute PRED-EXT-01 under conditions that approximate external falsification: independent dataset/trace generator, frozen rule, blinded reviewer, and explicit decision record.

**Architecture:** A new runner `run-pred-ext-01-cleanroom.js` consumes a freeze artifact and a trace-generator module, produces a decision record, and quarantines itself if the reviewer detects protocol violations.

### Task 1.1: External Trace Generator Contract

**Files:**
- Create: `scripts/lib/external-trace-generator.js`
- Create: `scripts/test-external-trace-generator.js`

- [ ] **Step 1.1.1: Define the external generator interface**

```javascript
// scripts/lib/external-trace-generator.js
/**
 * External trace generator interface.
 * Must satisfy:
 * - Deterministic given a seed.
 * - Produces traces in the freeze state alphabet.
 * - Separates panel generation from scenario labeling.
 */

function generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec }) {
  // Return: { baseline, targeted_post, sham_post, off_target_post }
}

function validateGeneratorDeterminism(seed, traceLength, alphabet) {
  // Run twice with same seed, assert deep equality.
}

module.exports = { generateTracePanel, validateGeneratorDeterminism };
```

- [ ] **Step 1.1.2: Implement a seeded deterministic generator**

Use a simple seeded PRNG (e.g., mulberry32) to generate traces that are not simple repeated patterns but still deterministic.

- [ ] **Step 1.1.3: Write unit tests for determinism and alphabet compliance**

```javascript
// scripts/test-external-trace-generator.js
const { generateTracePanel, validateGeneratorDeterminism } = require('./lib/external-trace-generator');

// Assert same seed produces same traces
// Assert all symbols belong to alphabet
// Assert traceLength is exact
```

- [ ] **Step 1.1.4: Run tests**

```bash
npm test -- scripts/test-external-trace-generator.js
```

**Expected:** PASS.

### Task 1.2: Clean-Room Freeze Artifact

**Files:**
- Create: `docs/preregistrations/PRED-EXT-01_freeze_v2.json`

- [ ] **Step 1.2.1: Draft freeze v2 with external execution class**

```json
{
  "schema_version": "2.0.0",
  "prediction_id": "PRED-EXT-01",
  "freeze_id": "pred-ext-01-cleanroom-freeze-v2",
  "date_frozen": "YYYY-MM-DD",
  "status": "frozen_for_clean_room_execution",
  "execution_class": "clean_room_external_simulated",
  "boundary": "This freeze is for the first clean-room execution. It does not certify consciousness, phenomenality, or external adjudication.",
  "state_alphabet": ["A", "B", "C", "D"],
  "trace_length": 240,
  "seed_policy": "deterministic_seed_required",
  "required_seeds": ["cleanroom_seed_001"],
  "rho_selective_threshold": 2.0,
  "rival_loss_floor": 0.05,
  "penalized_loss_alpha": 0.05,
  "trace_memory_rival_policy": {
    "id": "RIVAL-TRACE-MEMORY-01",
    "memory_depth": 1,
    "minimum_trace_length": 200,
    "laplace_smoothing": 1
  },
  "support_rule": [
    "rho_selective >= rho_selective_threshold",
    "tv_targeted > max(tv_sham, tv_off_target, epsilon_floor)",
    "penalized_rival_loss >= rival_loss_floor"
  ],
  "negative_control_rule": "...",
  "destruction_rule": "...",
  "anti_inflation_rule": "...",
  "reviewer_blinding": true,
  "quarantine_on_protocol_violation": true
}
```

- [ ] **Step 1.2.2: Validate freeze v2 against schema**

```bash
node -e "const f = require('./docs/preregistrations/PRED-EXT-01_freeze_v2.json'); console.log('valid');"
```

### Task 1.3: Clean-Room Runner

**Files:**
- Create: `scripts/run-pred-ext-01-cleanroom.js`
- Modify: `package.json` (add script)

- [ ] **Step 1.3.1: Create the clean-room runner**

The runner must:
1. Load freeze v2.
2. Load external trace generator with a declared seed.
3. Generate trace panel.
4. Run the same `scoreScenario` logic from the pilot.
5. Produce a decision record with reviewer blinding metadata.
6. If `negativeControlPassed === false`, trigger quarantine.
7. Write `PRED_EXT_01_CLEANROOM_DECISION_RECORD.json`.

- [ ] **Step 1.3.2: Add script to package.json**

```json
"cleanroom:pred-ext-01": "node scripts/run-pred-ext-01-cleanroom.js"
```

- [ ] **Step 1.3.3: Run the clean-room execution**

```bash
npm run cleanroom:pred-ext-01
```

**Expected:**
- Decision record written.
- Verdict: `cleanroom_support_with_negative_control_passed` OR `cleanroom_no_support` OR `destruction_candidate`.
- Boundary explicitly states "clean_room_execution, not external adjudication."

### Task 1.4: Reviewer Quarantine Protocol

**Files:**
- Create: `scripts/cleanroom-reviewer-quarantine.js`

- [ ] **Step 1.4.1: Implement reviewer checks**

The reviewer script checks:
- Was the freeze hash stable?
- Was the seed declared before execution?
- Was the trace generator deterministic?
- Was the support rule evaluated without post-hoc tuning?
- Were negative controls run?

If any check fails, output `quarantine` and reject the decision record.

- [ ] **Step 1.4.2: Run reviewer on cleanroom output**

```bash
node scripts/cleanroom-reviewer-quarantine.js
```

**Expected:** `review_pass` or `quarantine` with explicit reason.

### Milestone 1 Gate

- [ ] Gate 1.1: `npm run cleanroom:pred-ext-01` produces a decision record.
- [ ] Gate 1.2: Reviewer script passes or quarantines with documented reason.
- [ ] Gate 1.3: Freeze v2 is immutable (hash stable).
- [ ] Gate 1.4: Negative control fails under clean-room conditions.
- [ ] Gate 1.5: Decision record boundary states `clean_room_execution_only`.

**Acceptance Criterion:** The clean-room execution demonstrates that the harness can discriminate between positive and negative synthetic panels under declared seeds with reviewer blinding. The result is admissible only as `clean_room_synthetic_support`.

---

## Milestone 2: Populate Three Internal Preregistrations with Frozen Thresholds

**Goal:** Convert three draft scaffolds (PRED-02, PRED-04c, PRED-11) into executable preregistrations with frozen thresholds, seeds, datasets, and decision rules.

**Architecture:** Each preregistration becomes a pair: `*_freeze_v1.json` + `*_prereg_v1.md`. A scaffold generator script creates the freeze template, then a human (or agent) fills observables and thresholds.

### Task 2.1: PRED-02 (Rupture by Invariant Loss)

**Files:**
- Create: `docs/preregistrations/PRED-02_freeze_v1.json`
- Create: `docs/preregistrations/PRED-02_prereg_v1.md`
- Create: `scripts/run-pred-02-execution.js`

- [ ] **Step 2.1.1: Define the freeze for rupture prediction**

Observables:
- `tv_pre`: total-variation baseline distribution.
- `tv_post_ablation`: total-variation after invariant ablation.
- `delta_margin`: pre-ablation headroom above ambiguity threshold.

Thresholds:
- `delta_amb`: 0.05 (ambiguity margin).
- `rho_rupture`: 0.5 (minimum relative change to count as rupture).

Decision rule:
- Support: `tv_pre - tv_post_ablation > delta_amb` AND `delta_margin > delta_amb`.
- Weakening: `0 < tv_pre - tv_post_ablation <= delta_amb`.
- Destruction: `tv_post_ablation >= tv_pre` (ablation causes no degradation).

- [ ] **Step 2.1.2: Create execution runner**

Runner generates synthetic profinite/SFT traces, applies an ablation that zeros one invariant margin, and measures the change.

- [ ] **Step 2.1.3: Run and record decision**

```bash
npm run execute:pred-02
```

**Expected:** Decision record with explicit verdict.

### Task 2.2: PRED-04c (Cross-Substrate Equivalence)

**Files:**
- Create: `docs/preregistrations/PRED-04c_freeze_v2.json`
- Modify: `docs/preregistrations/PRED-04c_prereg_v1.md` (promote to v2)
- Create: `scripts/run-pred-04c-execution.js`

- [ ] **Step 2.2.1: Define cross-substrate freeze**

Observables:
- `equiv_distance`: structural equivalence metric between two substrate families.
- `invariant_delta`: maximum difference across six invariants.
- `class_agreement`: boolean, do both systems receive the same class label?

Thresholds:
- `eps_equiv`: 0.1 (maximum tolerated equivalence distance).
- `eps_invariant`: 0.05 (maximum tolerated invariant deviation).

Decision rule:
- Support: `equiv_distance < eps_equiv` AND `invariant_delta < eps_invariant` AND `class_agreement === true`.
- Destruction: `class_agreement === false` despite `equiv_distance < eps_equiv`.

- [ ] **Step 2.2.2: Create execution runner**

Runner simulates two substrate families (e.g., profinite vs SFT) with identical abstract structure but different implementation, and tests class transport.

- [ ] **Step 2.2.3: Run and record decision**

```bash
npm run execute:pred-04c
```

### Task 2.3: PRED-11 (External Prediction Candidate)

**Files:**
- Create: `docs/preregistrations/PRED-11_freeze_v1.json`
- Create: `docs/preregistrations/PRED-11_prereg_v1.md`
- Create: `scripts/run-pred-11-execution.js`

- [ ] **Step 2.3.1: Define PRED-11 freeze**

PRED-11 was promoted in v13.1. Its observable should be linked to the external selectivity runner but with an internal dataset.

Observable: `selectivity_ratio` (same as PRED-EXT-01 but on internal synthetic family).
Threshold: `rho_selective_threshold`: 2.0.

- [ ] **Step 2.3.2: Create runner**

Reuse `scoreScenario` from PRED-EXT-01 pilot but with a different trace generator module.

- [ ] **Step 2.3.3: Run and record**

```bash
npm run execute:pred-11
```

### Task 2.4: Preregistration Coverage Gate

**Files:**
- Modify: `docs/reports/PREREGISTRATION_COVERAGE_MATRIX.md`

- [ ] **Step 2.4.1: Update coverage matrix**

Mark PRED-02, PRED-04c, PRED-11 as `frozen_v1` with execution status.

- [ ] **Step 2.4.2: Validate all 14 predictions have at least one freeze or scaffold**

```bash
node scripts/validate-preregistration-coverage.js
```

**Expected:** 14/14 covered, 0 missing.

### Milestone 2 Gate

- [ ] Gate 2.1: Three freeze artifacts exist and are valid JSON.
- [ ] Gate 2.2: Three runners execute and produce decision records.
- [ ] Gate 2.3: All 14 predictions have preregistration paths in the canon map.
- [ ] Gate 2.4: No prediction in `docs/PREDICTION_REGISTRY_v1.json` lacks a freeze or scaffold.

**Acceptance Criterion:** QICN now has three executable, frozen prediction protocols. They remain internal synthetic until external datasets are introduced, but the threshold discipline is real.

---

## Milestone 3: Formalize the I_int Burden

**Goal:** Either (a) prove a factorization-triviality lemma that justifies `I_int` as a standalone invariant, or (b) permanently document it as `open_burden` with a formal task list for future mathematicians.

**Architecture:** Mathematical paper track. No new runners. The output is either a LaTeX proof section or a formal burden document.

### Task 3.1: Define the Factorization Category

**Files:**
- Create: `docs/reports/I_INT_FACTORIZATION_CATEGORY_SPEC.md`

- [ ] **Step 3.1.1: Write the category specification**

Define:
- Objects: admissible systems `S` with identity object `Id`, state space `X`, dynamics `Phi`, interventions `U`.
- Morphisms: admissible factorizations `f: S -> S_1 x S_2` preserving histories, interventions, and identity maps.
- Triviality condition: any such factorization is isomorphic to the trivial factorization `S -> S` up to admissible isomorphism.

- [ ] **Step 3.1.2: Identify proof obligations**

List the lemmas required:
1. Admissible factorizations form a category.
2. The trivial factorization is initial/terminal in some relevant subcategory.
3. Non-trivial factorizations violate at least one of: rigidity, continuity, or intervention fidelity.

### Task 3.2: Attempt Lemma Proof (Agent-Assisted)

**Files:**
- Create: `docs/reports/I_INT_FACTORIZATION_LEMMA_DRAFT.tex`

- [ ] **Step 3.2.1: Draft the lemma in LaTeX**

```latex
\begin{lemma}[Factorization triviality under rigidity and continuity]
Let $S$ be an admissible system satisfying rigid identity and phenomenological continuity. Let $f: S \to S_1 \times S_2$ be an admissible factorization preserving all operational histories and intervention responses. Then $f$ is admissibly isomorphic to the trivial factorization.
\end{lemma}
```

- [ ] **Step 3.2.2: Identify gaps**

If the agent cannot complete the proof, document:
- Missing definitions.
- Unverified steps.
- Counterexample candidates.

### Task 3.3: Materialize the Burden if Proof Fails

**Files:**
- Modify: `docs/reports/I_INT_CURATION_OVERLAY_v1.json`
- Modify: `registry/theorems.jsonl` (if downgrade is not yet complete)

- [ ] **Step 3.3.1: Update the overlay with formal task list**

```json
{
  "target_id": "paper5:proposition:prop-integration-transfer",
  "materialized": true,
  "current_status": "open_burden",
  "required_for_reupgrade": [
    "Prove Lemma 3.2 (factorization triviality)",
    "Define admissible factorization category rigorously",
    "Rule out non-trivial factorizations under intervention fidelity"
  ],
  "blocked_actions": ["..."]
}
```

- [ ] **Step 3.3.2: Verify registry status is `open_burden`**

```bash
npm run verify:curation-overlays
```

**Expected:** PASS, overlay validated.

### Milestone 3 Gate

- [ ] Gate 3.1: Either a LaTeX lemma draft exists with proof attempt, OR the burden document explicitly states why the lemma is open.
- [ ] Gate 3.2: `I_INT_CURATION_OVERLAY_v1.json` reflects the current epistemic status.
- [ ] Gate 3.3: `prop:integration-transfer` in `registry/theorems.jsonl` is NOT listed as `proved`.

**Acceptance Criterion:** I_int is either formally justified or honestly documented as an open mathematical burden. No `proved` ghost remains.

---

## Milestone 4: Monolithic LaTeX Compilation

**Goal:** Produce a single compilable LaTeX volume that contains BaseCore + Papers 1–10 + Bridge Paper, with a shared preamble and no semantic macro conflicts.

**Architecture:** A top-level `QICN_MONOLITHIC.tex` file includes all papers via `\input` or `\import`, using a shared preamble that declares all macros and theorem environments exactly once.

### Task 4.1: Audit All Macros and Theorem Environments

**Files:**
- Create: `scripts/build-monolithic-preamble.js`
- Read: `registry/macros.jsonl`

- [ ] **Step 4.1.1: Generate the shared preamble from registry**

The script reads `registry/macros.jsonl` and produces:
- `monolithic/preamble/macros.tex`: all canonical macro definitions.
- `monolithic/preamble/environments.tex`: all `\newtheorem` declarations.
- `monolithic/preamble/packages.tex`: all `\usepackage` commands deduplicated.

- [ ] **Step 4.1.2: Identify packages that conflict**

Check for:
- Different `\geometry` settings.
- Different `\arraystretch` values (these are local-scope, keep in papers).
- Duplicate author macros (these are identical, safe to deduplicate).

### Task 4.2: Create the Monolithic Root File

**Files:**
- Create: `monolithic/QICN_MONOLITHIC.tex`
- Create: `monolithic/compile.sh` or `compile.ps1`

- [ ] **Step 4.2.1: Write the root file**

```latex
\documentclass[11pt,a4paper]{book}
\input{preamble/packages}
\input{preamble/macros}
\input{preamble/environments}

\begin{document}
\frontmatter
\title{QICN: A Rigid Identity Framework}
\author{Johnny Andrey P\'erez Ram\'irez}
\maketitle
\tableofcontents

\mainmatter
\part{Base Core}
\input{../basecore/BASECORE}

\part{Papers}
\input{../paper1/main}
\input{../paper2/main}
\input{../paper3/main}
\input{../paper4/main}
\input{../paper5_operational_consciousness/main}
\input{../paper6_predictions_falsation/main}
\input{../paper7_operational_life_subjecthood/main}
\input{../paper8_first_person_subjectivity/main}
\input{../paper9_phenomenal_bridge_organization/main}
\input{../paper10_external_adjudication/main}

\part{Bridge}
\input{../paper_bridge_operational_subjecthood/main}
\end{document}
```

- [ ] **Step 4.2.2: Write compile script**

```powershell
# compile.ps1
cd monolithic
pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex
biber QICN_MONOLITHIC
pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex
pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex
```

### Task 4.3: Fix Compilation Errors

**Files:**
- Modify: Various `main.tex` files (remove local macro/theorem redefinitions)

- [ ] **Step 4.3.1: Remove duplicate `\newcommand` declarations from papers**

For each of the 54 identical-definition-repeated groups, remove the local declaration and rely on the shared preamble.

- [ ] **Step 4.3.2: Remove duplicate `\newtheorem` declarations**

For each paper, remove its local `\newtheorem{theorem}...` block if the shared preamble already defines it.

- [ ] **Step 4.3.3: Handle `\arraystretch` overrides**

Keep `\arraystretch` inside `\begin{table}...\end{table}` local groups; do not promote to preamble.

- [ ] **Step 4.3.4: Compile and iterate**

```bash
cd monolithic
./compile.ps1
```

Iterate until `QICN_MONOLITHIC.pdf` is produced with 0 errors.

### Task 4.4: Verify Monolithic Gate

**Files:**
- Modify: `scripts/verify-monolithic-risk.js`

- [ ] **Step 4.4.1: Update monolithic risk audit**

After successful compilation, the audit should report:
- `Overall monolithic risk: GREEN`
- `Active semantic conflict groups: 0`
- `Repeated definition groups: 0` (or `managed_by_shared_preamble`)

- [ ] **Step 4.4.2: Run the updated gate**

```bash
npm run audit:monolithic-risk
```

**Expected:** GREEN.

### Milestone 4 Gate

- [ ] Gate 4.1: `monolithic/QICN_MONOLITHIC.pdf` compiles with 0 LaTeX errors.
- [ ] Gate 4.2: `audit:monolithic-risk` reports GREEN.
- [ ] Gate 4.3: Table of contents lists all BaseCore sections, Papers 1–10, and Bridge Paper.
- [ ] Gate 4.4: No missing cross-references (`??` in PDF).

**Acceptance Criterion:** The entire QICN corpus can be compiled as a single volume for external review.

---

## Milestone 5: Expand PRED-EXT-01 Negative Controls

**Goal:** Add three additional negative controls to the PRED-EXT-01 pilot/cleanroom to demonstrate that the harness rejects non-selective explanations.

**Architecture:** Extend `buildTracePanel` in the pilot and clean-room runners to include more panels. Each panel tests a specific rival hypothesis.

### Task 5.1: Complexity-Only Negative Control

**Files:**
- Modify: `scripts/run-pred-ext-01-pilot.js`
- Modify: `scripts/run-pred-ext-01-cleanroom.js`

- [ ] **Step 5.1.1: Define complexity-only panel**

This panel increases state-space dimension and connectivity without preserving invariants. It tests the rival: "selectivity is just complexity."

```javascript
complexity_only_negative_control: {
  baseline: repeatPattern(["A","B","A","C"], length),
  targeted_post: repeatPattern(["A","B","A","C","D","E","F","G"], length), // larger alphabet
  sham_post: baseline,
  off_target_post: repeatPattern(["A","B","A","C","D","E","F","G"], length)
}
```

Note: The runner must handle variable alphabet sizes or reject them as invalid under the freeze.

- [ ] **Step 5.1.2: Implement control evaluation**

If the freeze requires a fixed alphabet, the runner should reject the complexity panel as `invalid_control` and report that the harness only accepts controls within the frozen alphabet. This is itself a valid result (the freeze is restrictive).

If the freeze is extended to allow variable alphabets, the control should produce `rho_selective = 0` or `penalized_rival_loss < floor`.

### Task 5.2: Narrative-Only / Report-Rich Negative Control

- [ ] **Step 5.2.1: Define narrative-only panel**

This panel simulates a system that produces rich output descriptions without structured intervention selectivity. The trace is identical to baseline but with extra "report" states.

```javascript
narrative_only_negative_control: {
  baseline: repeatPattern(["A","B","A","C"], length),
  targeted_post: repeatPattern(["A","B","A","C"], length), // identical to baseline
  sham_post: baseline,
  off_target_post: baseline
}
```

**Expected:** `tv_targeted = 0`, `rho_selective = 0`, support rule fails.

### Task 5.3: Reward-Bookkeeping Negative Control

- [ ] **Step 5.3.1: Define reward-bookeeper panel**

This panel simulates a system that tracks rewards without causal integration. The trace shows reward states but no intervention selectivity.

```javascript
reward_bookkeeping_negative_control: {
  baseline: repeatPattern(["A","B","A","C"], length),
  targeted_post: repeatPattern(["A","B","A","C"], length), // no selectivity
  sham_post: baseline,
  off_target_post: baseline
}
```

**Expected:** Same as narrative-only: support rule fails.

### Task 5.4: Update Decision Record Schema

- [ ] **Step 5.4.1: Extend `scenario_results` to include all controls**

The decision record should list:
- `qicn_synthetic_positive`
- `memory_only_negative_control`
- `complexity_only_negative_control` (or `invalid_control`)
- `narrative_only_negative_control`
- `reward_bookkeeping_negative_control`

- [ ] **Step 5.4.2: Add a `control_summary` field**

```json
{
  "controls_total": 4,
  "controls_passed": 4,
  "controls_failed": 0,
  "destruction_risk": false
}
```

### Milestone 5 Gate

- [ ] Gate 5.1: Runner evaluates at least 4 negative controls.
- [ ] Gate 5.2: All negative controls fail the support rule (or are rejected as invalid under the freeze).
- [ ] Gate 5.3: Decision record includes `control_summary`.
- [ ] Gate 5.4: No negative control passes the support rule. If one does, the result is `destruction_candidate`.

**Acceptance Criterion:** The PRED-EXT-01 harness demonstrates specificity against at least four distinct rival hypotheses.

---

## Milestone 6: Human Mathematical Curation of the Registry

**Goal:** Produce a human-curated audit of the 231 `proved` and 333 `conditional` entries in `registry/theorems.jsonl`, identifying which are genuinely proved, which need downgrade, and which are draft-extracted ghosts.

**Architecture:** This is a human-AI collaborative review. The agent can prepare the scaffolding, but a human mathematician must sign off. The output is a curation batch report.

### Task 6.1: Prepare Curation Batch Scaffold

**Files:**
- Create: `docs/reports/REGISTRY_CURATION_BATCH_002_HUMAN_REVIEW.md`
- Create: `scripts/generate-curation-batch.js`

- [ ] **Step 6.1.1: Identify high-priority entries for review**

Select the top 50 entries by impact:
- All entries with `curation_status: draft_extracted` AND `epistemic_status: proved`.
- All entries from Paper 3 and Paper 5 (core theorems).
- All entries with `counterexample: null` (never audited).

- [ ] **Step 6.1.2: Generate review template per entry**

For each selected entry, produce a block:

```markdown
### Entry: `paper5:theorem:thm-existence`
- **LaTeX source:** `paper5_operational_consciousness/main.tex:627-638`
- **Claim:** Existence of operational consciousness under six invariants.
- **Current status:** `proved` (draft_extracted)
- **Proof present in source:** Yes/No
- **Human reviewer assessment:** [ ] Valid proof  [ ] Downgrade needed  [ ] Open burden
- **Required action:** ___________
- **Reviewer signature:** ___________
- **Date:** ___________
```

### Task 6.2: Formal Methods Review Protocol

**Files:**
- Create: `docs/reports/FORMAL_METHODS_REVIEW_PROTOCOL.md`

- [ ] **Step 6.2.1: Write the protocol**

Define:
- Who can be a reviewer (PhD in mathematics, logic, or theoretical CS).
- Review criteria (syntactic validity, logical structure, gap identification).
- Decision categories: `confirmed_proved`, `downgrade_to_conditional`, `downgrade_to_heuristic`, `open_burden`, `false_claim`.
- Escalation path for disagreements.

### Task 6.3: Integrate Human Curations into Registry

**Files:**
- Modify: `scripts/registry-lib.js`
- Modify: `registry/theorems.jsonl`

- [ ] **Step 6.3.1: Add `human_curation` field to registry schema**

```json
{
  "human_curation": {
    "status": "confirmed_proved",
    "reviewer": "Dr. X",
    "date": "2026-06-XX",
    "batch": "002"
  }
}
```

- [ ] **Step 6.3.2: Write script to apply human curations**

```bash
npm run apply:human-curation -- --batch 002
```

This script reads the batch markdown and updates the JSONL.

### Milestone 6 Gate

- [ ] Gate 6.1: A formal methods review protocol exists and is approved by the project owner.
- [ ] Gate 6.2: At least one human reviewer has signed off on at least one batch.
- [ ] Gate 6.3: Registry entries updated with `human_curation` metadata.
- [ ] Gate 6.4: No entry with a known counterexample remains listed as `proved`.

**Acceptance Criterion:** The registry has begun a documented, signed human curation process. It is no longer purely machine-extracted.

---

## Cross-Milestone Dependency Graph

```
Phase 0 (Foundation Gate)
    |
    +---> Milestone 1 (Clean-room PRED-EXT-01) --------+
    |                                                   |
    +---> Milestone 2 (Populate preregistrations) ------+---> Final v16 Release Gate
    |                                                   |
    +---> Milestone 3 (Formalize I_int) ---------------+
    |                                                   |
    +---> Milestone 4 (Monolithic LaTeX) --------------+
    |                                                   |
    +---> Milestone 5 (Expand negative controls) ------+
    |                                                   |
    +---> Milestone 6 (Human curation) ----------------+
```

**Hard sequential dependency:** Milestones 1–6 can run in parallel, but **all must pass** before the Final v16 Release Gate. Milestone 4 (monolithic) should ideally start after Milestone 3 (I_int) if the monolithic volume is meant to include the latest I_int status.

---

## Final v16 Release Gate

**Command sequence:**

```bash
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run verify:curation-overlays
npm run audit:extractor-reproducibility
npm run audit:extractor-diagnostic
npm run audit:monolithic-risk
npm run lint:nonclaims
npm run pilot:pred-ext-01
npm run cleanroom:pred-ext-01
npm run execute:pred-02
npm run execute:pred-04c
npm run execute:pred-11
npm run test:trace-memory-rival
npm run test:tamper-prereg
```

**Expected results:**
- Corpus registry: 0 blockers, 0 warnings.
- Macro registry: 0 blockers, 0 warnings.
- Prediction registry: 14 predictions, 0 errors.
- Curation overlays: PASS.
- Extractor: REPRODUCIBLE, 696/696, 377/377.
- Monolithic risk: GREEN.
- Non-claims: 0 violations.
- Pilot: `internal_synthetic_support_with_negative_control_passed`.
- Cleanroom: `clean_room_synthetic_support_with_negative_control_passed` (or honest alternative).
- PRED-02, PRED-04c, PRED-11: decision records produced.
- Trace-memory rival: PASS.
- Tamper prereg: PASS.

**Git hygiene:**
- All changes committed to branch `fcr/v16-execution`.
- PR created against `main` with full diff review.
- No untracked files.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Clean-room execution produces `destruction_candidate` (negative control passes) | Medium | High | Document honestly. Do not rescue post-hoc. Quarantine and publish as `claim_destroyed_by_control`. |
| Monolithic LaTeX has irreconcilable package conflicts | Low | Medium | If `geometry` or `biblatex` styles conflict irreconcilably, keep papers as separate volumes and produce a "unified index" instead. |
| Human reviewer unavailable or refuses to sign off | High | High | Publish the curation batch as an open invitation. The framework is still stronger with an open protocol than with no protocol. |
| I_int lemma proves intractable | Medium | Medium | Keep `open_burden` permanently. Do not block v16 on an open mathematical problem if the burden is documented. |
| Preregistration runners fail due to threshold misalignment | Medium | Medium | Use rehearsal mode first (`rehearse:pred-xx`), then freeze. Never freeze without a passing rehearsal. |

---

## Timeline Estimate

| Milestone | Estimated Effort | Parallelizable |
|---|---|---|
| Phase 0: Foundation | 30 min | No |
| Milestone 1: Clean-room | 4–6 hours | Yes |
| Milestone 2: Preregistrations | 6–8 hours | Yes |
| Milestone 3: I_int formalization | 2–4 hours (agent) + weeks (human math) | Yes |
| Milestone 4: Monolithic LaTeX | 4–6 hours | Yes (best after M3) |
| Milestone 5: Negative controls | 2–3 hours | Yes |
| Milestone 6: Human curation | 1 hour (scaffold) + weeks (human review) | Yes |
| Final Gate & Release | 1 hour | No |

**Critical path:** The longest sequential chain is M3 (human math) + M4 (monolithic after I_int update). If M3 is kept as `open_burden`, the critical path drops to ~8 hours of agent work + human review time.

---

## Acceptance Criteria for v16

1. At least one clean-room execution exists with a frozen rule, reviewer blinding, and a decision record.
2. At least three predictions have frozen thresholds and executable runners.
3. I_int is either formally proved or permanently documented as `open_burden` with a task list.
4. Monolithic LaTeX compiles with 0 errors and GREEN risk status.
5. PRED-EXT-01 harness rejects at least four distinct negative controls.
6. Human curation protocol exists, at least one batch is prepared, and registry schema supports human sign-off.
7. All FCR gates pass with 0 blockers.
8. All results are classified with honest epistemic boundaries (`clean_room_synthetic_support`, not `empirical_evidence`).

---

**Plan prepared by:** OpenCode / AntiGravity audit synthesis
**Date:** 2026-05-26
**Status:** Ready for execution upon approval.
