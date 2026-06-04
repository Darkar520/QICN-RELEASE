# CODEX v35 IMPLEMENTATION PROMPT — VERSION CENTRALIZATION & PROFESSIONAL CLEANUP

> **Status:** ULTRATHINK ACTIVE. Maximum depth reasoning required. No surface-level logic.
> **For:** Codex with complex reasoning capabilities.
> **Scope:** Consolidate the fragmented v25-v33 version sprawl into a single professional, clean, unified version (v34) with zero regressions, full backward compatibility, and a pristine codebase.

---

## 0. GOVERNANCE BOUNDARY

This prompt addresses internal codebase hygiene and architectural consolidation only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review. All existing adjudication logic, statistical corrections, mathematical formalizations, and epistemic boundaries from v25-v33 must be preserved exactly.

---

## 1. THE CENTRAL PROBLEM: VERSION SPRAWL

### 1.1 Current State (Chaos)

The QICN framework currently has **9 active version numbers** (v25, v26, v27, v28, v29, v30, v31, v32, v33) with the following artifacts:

**Adjudicators (5 versions + 1 base):**
- `scripts/external-session-zero-adjudicator.js` (23,490 bytes) — v26 base
- `scripts/external-session-zero-adjudicator-v27.js` (23,413 bytes) — v27
- `scripts/external-session-zero-adjudicator-v28.js` (26,827 bytes) — v28
- `scripts/external-session-zero-adjudicator-v30.js` (28,924 bytes) — v30
- `scripts/external-session-zero-adjudicator-v31.js` (9,982 bytes) — v31 wrapper

**Calibrators (2 versions):**
- `scripts/calibrate-session-zero-thresholds-v26.js` (4,936 bytes)
- `scripts/calibrate-session-zero-thresholds-v27.js` (6,680 bytes)

**Lexical Auditors (3 versions):**
- `scripts/audit-operational-term-promotions.js` (8,060 bytes) — base
- `scripts/audit-operational-term-promotions-v27.js` (7,465 bytes)
- `scripts/audit-operational-term-promotions-v28.js` (13,325 bytes)

**Veto Verifiers (3 versions):**
- `scripts/verify-human-veto-signature.js` (2,763 bytes) — base
- `scripts/verify-human-veto-signature-v27.js` (6,395 bytes)
- `scripts/verify-human-veto-signature-v28.js` (12,411 bytes)

**Gap Audits (5 versions):**
- `scripts/audit-v23-roadmap-gates.js`
- `scripts/audit-v24-critical-gaps.js`
- `scripts/audit-v25-superior-gaps.js`
- `scripts/audit-v26-superior-gaps.js`
- `scripts/audit-v27-superior-gaps.js`

**AR1 Summaries (1 version):**
- `scripts/ar1-correction-clinical-summary-v28.js` (7,439 bytes)

**Fixtures (3 versions):**
- `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v25.json`
- `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json`
- `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json`

**Reports (9 versions):**
- `docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json` through v31
- Plus gap audits, threshold calibrations, veto signatures, etc.

**LaTeX Documents (6 versions):**
- `PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex`
- `PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v29.tex`
- `PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`
- `PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`
- `CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
- Papers 1-10

**package.json scripts (74 lines):**
- `verify:v22` through `verify:v31` (10 different verify chains)
- `calibrate:session-zero-thresholds` and `:v27`
- `adjudicate:external-session-zero-v27` through `-v31`
- `audit:operational-term-promotions` and `:v27`, `:v28`
- `verify:human-veto-signature` and `:v27`, `:v28`

### 1.2 Why This Is a Problem

1. **Cognitive overload:** Developers must know which version of which script to run. The `package.json` has 74 lines of scripts, most of which are version-specific.
2. **Code duplication:** v27, v28, and v30 adjudicators are largely copies with incremental changes. v31 is a wrapper over v30. The calibrators v26 and v27 share 80% of their code.
3. **Maintenance burden:** A bug fix in the core logic must be applied to v27, v28, v30, AND v31 separately. In practice, only the "latest" gets fixed (as seen in v32/v33).
4. **Test confusion:** `npm run verify:v27` runs a different adjudicator than `npm run verify:v30` with a different fixture. This is not "testing different features" — it's "testing different snapshots of the same system at different points in time."
5. **Legacy dependency:** `calibrate-session-zero-thresholds-v27.js` imports functions from `external-session-zero-adjudicator-v27.js`. If v27 is deprecated, the calibrator breaks.
6. **Professional credibility:** A codebase with 5 versions of the same adjudicator looks like prototype code, not a hardened framework.

### 1.3 What Should Exist Instead

A single, unified codebase with:
- **ONE adjudicator** containing all logic from v25-v33
- **ONE calibrator** for threshold generation
- **ONE lexical auditor** for term promotion checks
- **ONE veto verifier** for signature validation
- **ONE fixture** (the current canonical one, v27-based)
- **Legacy scripts** preserved in `scripts/legacy/` as thin wrappers
- **Legacy fixtures/reports** preserved in `docs/legacy/` for historical reference
- **A clean `package.json`** with at most 10 scripts, not 74

---

## 2. RESOLUTION APPROACH: THREE OPTIONS ANALYZED

### Option A: Keep Everything, Add More Versioning (Status Quo)

**Strategy:** Continue adding v34, v35, etc. as new files. Never delete or consolidate.

**Pros:**
- Zero risk of breaking existing scripts
- Full historical traceability

**Cons:**
- The codebase will have 15+ versions within a year
- package.json will exceed 100 lines
- Maintenance becomes impossible
- No professional credibility

**Verdict:** UNACCEPTABLE. This is the current trajectory and it must be stopped.

---

### Option B: Hard Delete Old Versions (Destructive)

**Strategy:** Delete all v25-v30 scripts, fixtures, and reports. Keep only v31/v32/v33.

**Pros:**
- Clean, minimal codebase
- Easy to understand

**Cons:**
- **BREAKS** `npm run verify:v25` through `verify:v30` — which may be referenced in CI/CD, documentation, or user workflows
- **BREAKS** scripts that import from old versions (e.g., `calibrate-session-zero-thresholds-v27.js` imports from v27 adjudicator)
- **BREAKS** historical reproducibility — old reports can't be regenerated
- **DATA LOSS** — old fixtures and reports are deleted

**Verdict:** UNACCEPTABLE. Destructive deletion is unacceptable for a hardened framework.

---

### Option C: Consolidate Current, Archive Legacy with Thin Wrappers (RECOMMENDED)

**Strategy:**

1. **Identify the canonical current version:** v31 is the wrapper over v30, which contains all v28/v27/v26 logic via `--legacy` flags. The "current" adjudicator should be a unified version that:
   - Contains ALL logic from v26 through v33
   - Uses `--legacy-v27`, `--legacy-iid` flags for backward compat
   - Defaults to the strictest behavior (v31 foundation-first gates + v30 GLS exact)

2. **Move all old scripts** to `scripts/legacy/` but keep them as **thin wrappers** that:
   - Import the unified adjudicator
   - Apply the appropriate legacy flags
   - Delegate 100% of logic — they contain NO independent code

3. **Move old fixtures** to `docs/fixtures/legacy/`

4. **Move old reports** to `docs/reports/legacy/`

5. **Simplify package.json** to:
   - `npm run verify` — runs the unified current adjudicator
   - `npm run verify -- --legacy-v27` — runs with v27 compat
   - `npm run calibrate` — unified calibrator
   - `npm run audit:terms` — unified lexical auditor
   - `npm run audit:human-veto` — unified veto verifier
   - `npm run test:negative-controls` — negative control suite
   - `npm run compile` — compile LaTeX documents

6. **Create a VERSION file** `VERSION.md` at the root that documents:
   - Current unified version: v34
   - Legacy version mapping: v25→v34 --legacy-v25, v26→v34 --legacy-v26, etc.
   - Deprecation notice: "v25-v30 scripts are preserved as wrappers in scripts/legacy/"

**Pros:**
- **Single source of truth:** All logic lives in one adjudicator
- **Zero regressions:** `npm run verify:v27` still works (via wrapper)
- **Historical preservation:** Old fixtures and reports are archived, not deleted
- **Professional codebase:** 5 adjudicators → 1 adjudicator + 5 thin wrappers
- **Maintenable:** Bug fixes apply once
- **Clean package.json:** 10 scripts instead of 74

**Cons:**
- Requires careful wrapper construction to ensure behavioral equivalence
- Must verify that every legacy flag produces EXACTLY the same output as before
- Initial effort to consolidate is non-trivial

**RECOMMENDATION:** Option C. It is the only approach that achieves consolidation without destruction.

---

## 3. DETAILED TASK LIST (Option C Implementation)

Execute in this exact order. Each task must be verified before proceeding.

---

### Task 0: Pre-Implementation Verification Gate

**Before touching any file, Codex must:**

1. List ALL versioned scripts:
   - Adjudicators: v26, v27, v28, v30, v31 (5 files)
   - Calibrators: v26, v27 (2 files)
   - Auditors: v27, v28 (2 files, plus base)
   - Veto verifiers: v27, v28 (2 files, plus base)
   - Gap audits: v23-v27 (5 files)
   - AR1 summaries: v28 (1 file)

2. Confirm: v31 adjudicator imports `analyzeManifest` from v30 (line 13)
3. Confirm: negative-control-suite.js imports from v30 AND v31 (lines 12-13)
4. Confirm: `package.json` has 74 script lines, most version-specific
5. Report back: "Confirmed version sprawl. 17 versioned scripts + 3 versioned fixtures + 9 versioned reports. Proceeding with Option C: consolidate current, archive legacy with wrappers."

**Do NOT proceed to Task 1 until this gate is passed.**

---

### Task 1: Create `scripts/legacy/` Directory and Move Versioned Scripts

**Step 1a:** Create directory structure:
```bash
mkdir scripts/legacy
mkdir docs/fixtures/legacy
mkdir docs/reports/legacy
```

**Step 1b:** Move ALL versioned scripts (anything with `-vNN` in the filename) to `scripts/legacy/`:
```bash
# Adjudicators
mv scripts/external-session-zero-adjudicator-v27.js scripts/legacy/
mv scripts/external-session-zero-adjudicator-v28.js scripts/legacy/
mv scripts/external-session-zero-adjudicator-v30.js scripts/legacy/
mv scripts/external-session-zero-adjudicator-v31.js scripts/legacy/

# Calibrators
mv scripts/calibrate-session-zero-thresholds-v26.js scripts/legacy/
mv scripts/calibrate-session-zero-thresholds-v27.js scripts/legacy/

# Auditors
mv scripts/audit-operational-term-promotions-v27.js scripts/legacy/
mv scripts/audit-operational-term-promotions-v28.js scripts/legacy/

# Veto verifiers
mv scripts/verify-human-veto-signature-v27.js scripts/legacy/
mv scripts/verify-human-veto-signature-v28.js scripts/legacy/

# Gap audits
mv scripts/audit-v23-roadmap-gates.js scripts/legacy/
mv scripts/audit-v24-critical-gaps.js scripts/legacy/
mv scripts/audit-v25-superior-gaps.js scripts/legacy/
mv scripts/audit-v26-superior-gaps.js scripts/legacy/
mv scripts/audit-v27-superior-gaps.js scripts/legacy/

# AR1 summary
mv scripts/ar1-correction-clinical-summary-v28.js scripts/legacy/
```

**Step 1c:** Move old fixtures to `docs/fixtures/legacy/`:
```bash
mv docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v25.json docs/fixtures/legacy/
mv docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json docs/fixtures/legacy/
```

Note: KEEP v27 fixture at root level — it's the current canonical fixture.

**Step 1d:** Move old reports to `docs/reports/legacy/`:
```bash
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json docs/reports/legacy/
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json docs/reports/legacy/
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json docs/reports/legacy/
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v28.json docs/reports/legacy/
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.json docs/reports/legacy/
mv docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json docs/reports/legacy/
# And all other v25-v30 reports
```

**Step 1e:** Verify: `ls scripts/legacy/` shows all moved scripts. No versioned scripts remain in `scripts/` root.

**IMPORTANT:** The scripts moved to `legacy/` must still be **runnable** because other scripts may import from them. Do NOT break require paths.

---

### Task 2: Create the Unified Adjudicator `scripts/external-session-zero-adjudicator.js`

**Step 2a:** The unified adjudicator must contain ALL logic from v25-v33:
- v26: basic adjudication, hash binding, outcome copy detection, Gaussian AIC
- v27: stricter thresholds, bridge certificate checks, veto protocol
- v28: AR(1)-corrected AICc mandatory when |ρ|>0.4, Miller-Madow MI, DW block, `--legacy-v27`
- v30: GLS exact AICc sole decision metric, schema 7.0.0, 6 gates
- v31: foundation-first wrapper with 4 gates (type confusion, circular calibration, unverified bridge, straw-man variance)
- v32: Jacobian correction, bias documentation, ∅_φ/⊥ distinction
- v33: consistency between Paper 3 and v31, H2–H4 operational formalization (if v34 was implemented)

**Step 2b:** The unified adjudicator must support these flags:
- `--legacy-v25` — runs v25 logic (minimal checks)
- `--legacy-v26` — runs v26 logic (basic AIC, outcome copy detection)
- `--legacy-v27` — runs v27 logic (stricter thresholds, bridge cert)
- `--legacy-v28` — runs v28 logic (AR1 AICc, MI Miller-Madow, DW block)
- `--legacy-v30` — runs v30 logic (GLS exact, 6 gates)
- `--legacy-iid` — forces iid-only mode (for comparison)
- Default (no flag) — runs v31+ logic (strictest: foundation-first gates + GLS exact)

**Step 2c:** Implementation approach — the unified adjudicator should:
1. Import `advanced-statistics.js` and `gls-statistics.js` (shared libs)
2. Define `analyzeManifest(manifest, options)` where `options.legacyVersion` controls behavior
3. Use feature flags, not copy-paste of old code:
   ```javascript
   if (options.legacyVersion === 'v27') {
     // Apply v27-specific thresholds
   }
   if (!options.legacyVersion || options.legacyVersion >= 'v30') {
     // Apply GLS exact logic
   }
   if (!options.legacyVersion || options.legacyVersion >= 'v31') {
     // Apply foundation-first gates
   }
   ```

**Step 2d:** The file should be approximately 35-40KB (combining v30's 29KB + v31's 10KB, deduplicated). It should NOT be a concatenation — it should be a unified implementation with feature flags.

**Step 2e:** Export `analyzeManifest`, `foundationChecks`, `stableJson`, `sha256`, `fileSha256` for use by other scripts.

**Step 2f:** Run `node --check scripts/external-session-zero-adjudicator.js`

---

### Task 3: Create Thin Wrapper Scripts in `scripts/legacy/`

Each legacy script must become a **thin wrapper** (max 30 lines) that:
1. Parses legacy-specific CLI args
2. Imports from the unified adjudicator
3. Calls with the appropriate `legacyVersion` flag
4. Writes output to the legacy report path

**Example: `scripts/legacy/external-session-zero-adjudicator-v27.js`**
```javascript
#!/usr/bin/env node
/* Legacy wrapper: v27 adjudicator behavior.
 * This script delegates 100% of logic to the unified adjudicator.
 * Do not modify — it is a compatibility wrapper only.
 */
const path = require("path");
const { adjudicateFile } = require("../external-session-zero-adjudicator");

const ROOT = path.resolve(__dirname, "../..");
const FIXTURE = path.join(ROOT, "docs", "fixtures", "legacy", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const REPORT = path.join(ROOT, "docs", "reports", "legacy", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json");

const report = adjudicateFile(FIXTURE, REPORT, { legacyVersion: "v27" });
console.log(`Legacy v27 adjudicator (wrapper): ${report.result}; verdict=${report.verdict}`);
```

**Wrappers needed:**
- `legacy/external-session-zero-adjudicator-v26.js` → `--legacy-v26`
- `legacy/external-session-zero-adjudicator-v27.js` → `--legacy-v27`
- `legacy/external-session-zero-adjudicator-v28.js` → `--legacy-v28`
- `legacy/external-session-zero-adjudicator-v30.js` → `--legacy-v30`
- `legacy/external-session-zero-adjudicator-v31.js` → `--legacy-v31`
- `legacy/calibrate-session-zero-thresholds-v26.js` → calls unified calibrator with v26 mode
- `legacy/calibrate-session-zero-thresholds-v27.js` → calls unified calibrator with v27 mode
- `legacy/audit-operational-term-promotions-v27.js` → calls unified auditor with v27 mode
- `legacy/audit-operational-term-promotions-v28.js` → calls unified auditor with v28 mode
- `legacy/verify-human-veto-signature-v27.js` → calls unified verifier with v27 mode
- `legacy/verify-human-veto-signature-v28.js` → calls unified verifier with v28 mode
- `legacy/ar1-correction-clinical-summary-v28.js` → calls unified with v28 mode

**Step 3a:** Implement all wrappers.

**Step 3b:** Verify each wrapper runs without error:
```bash
node scripts/legacy/external-session-zero-adjudicator-v27.js
node scripts/legacy/external-session-zero-adjudicator-v28.js
node scripts/legacy/external-session-zero-adjudicator-v30.js
node scripts/legacy/external-session-zero-adjudicator-v31.js
```

---

### Task 4: Create Unified Supporting Scripts

**File:** `scripts/calibrate-session-zero-thresholds.js` (unified)
- Merge v26 and v27 calibrators
- Support `--legacy-v26` and `--legacy-v27` flags
- Default: use v27 thresholds (stricter)

**File:** `scripts/audit-operational-term-promotions.js` (unified)
- Merge base, v27, and v28 auditors
- v28 has the most expanded lexicon (13,325 bytes vs 8,060 bytes)
- Default: use v28 lexicon + checks
- `--legacy-v27`: use v27 lexicon

**File:** `scripts/verify-human-veto-signature.js` (unified)
- Merge base, v27, and v28 verifiers
- v28 has the most features (12,411 bytes)
- Default: use v28 logic
- `--legacy-v27`: use v27 logic

**File:** `scripts/audit-superior-gaps.js` (unified)
- Merge v23-v27 gap audits into one script with `--legacy-v23` through `--legacy-v27`
- Each legacy mode runs the checks appropriate to that version

**Step 4a:** Implement unified supporting scripts.

**Step 4b:** Run `node --check` on each.

---

### Task 5: Rewrite `package.json` Scripts Section

**Goal:** Replace 74 lines of version-specific scripts with ~15 clean, unified scripts.

**Before (current):**
```json
"verify:v22": "npm run construct:finite-separator-package && ...",
"verify:v23": "npm run verify:v22 && npm run audit:operational-term-promotions && ...",
"verify:v24": "npm run verify:v22 && npm run audit:operational-term-promotions && ...",
"verify:v25": "npm run adjudicate:external-session-zero-self-test && ...",
"verify:v26": "npm run calibrate:session-zero-thresholds && ...",
"verify:v27": "npm run calibrate:session-zero-thresholds:v27 && npm run adjudicate:external-session-zero-v27 && ...",
"verify:v30": "npm run adjudicate:external-session-zero-v30 && ...",
"verify:v31": "npm run verify:v30 && npm run adjudicate:external-session-zero-v31",
// ... 66 more lines
```

**After (clean):**
```json
"scripts": {
  "verify": "npm run calibrate && npm run adjudicate && npm run audit:terms && npm run audit:veto && npm run audit:gaps && npm run test:negative-controls && npm run validate:promotion-rules",
  "calibrate": "node scripts/calibrate-session-zero-thresholds.js",
  "adjudicate": "node scripts/external-session-zero-adjudicator.js",
  "audit:terms": "node scripts/audit-operational-term-promotions.js",
  "audit:veto": "node scripts/verify-human-veto-signature.js --self-test",
  "audit:gaps": "node scripts/audit-superior-gaps.js",
  "test:negative-controls": "node scripts/negative-control-suite.js",
  "validate:promotion-rules": "node scripts/validate-promotion-rules.js",
  "compile": "node scripts/build-monolithic-volume.js --compile",
  "lint:nonclaims": "node scripts/lint-nonclaims.js",
  "build:theory-graph": "node scripts/build-theory-dependency-graph.js",
  "audit:monolithic": "node scripts/audit-monolithic-build-quality.js",
  "evaluate:progress": "node scripts/evaluate-framework-progress.js",
  
  "verify:legacy": "echo 'Use npm run verify -- --legacy-v27 (or v26, v28, v30, v31)'",
  "verify:all-legacy": "node scripts/legacy/run-all-legacy-verifications.js",
  
  "extract:registry": "node scripts/extract-registry.js",
  "verify:corpus-registry": "node scripts/validate-corpus.js",
  "verify:macro-registry": "node scripts/validate-macros.js",
  "generate:prereg-scaffolds": "node scripts/generate-preregistration-scaffolds.js",
  "report:corpus-health": "node scripts/generate-report.js"
}
```

**Key principles:**
- `npm run verify` = current unified verification (replaces v31)
- `npm run verify -- --legacy-v27` = runs with v27 compat (flag forwarded)
- Legacy scripts in `scripts/legacy/` still have their own npm scripts if needed, but they are NOT in the main package.json
- Create `scripts/legacy/run-all-legacy-verifications.js` that runs v25-v31 sequentially for regression testing

**Step 5a:** Rewrite `package.json` scripts section.

**Step 5b:** Run `npm run verify` and confirm it works.

**Step 5c:** Run `node scripts/legacy/external-session-zero-adjudicator-v27.js` and confirm it produces the same verdict as before.

---

### Task 6: Update Cross-Script Imports

**Step 6a:** Fix imports in scripts that require from versioned files:

**`scripts/negative-control-suite.js`** (currently imports from v30 and v31):
```javascript
// BEFORE:
const { analyzeManifest } = require("./external-session-zero-adjudicator-v30");
const { foundationChecks } = require("./external-session-zero-adjudicator-v31");

// AFTER:
const { analyzeManifest, foundationChecks } = require("./external-session-zero-adjudicator");
```

**`scripts/ar1-correction-clinical-summary-v28.js`** (currently imports from v28):
```javascript
// BEFORE:
const { analyzeManifest } = require("./external-session-zero-adjudicator-v28");

// AFTER:
const { analyzeManifest } = require("./external-session-zero-adjudicator");
// Pass { legacyVersion: 'v28' } when calling analyzeManifest
```

**`scripts/validate-promotion-rules.js`** (currently imports from v28 auditor):
```javascript
// BEFORE:
const { runSelfTests } = require("./audit-operational-term-promotions-v28");

// AFTER:
const { runSelfTests } = require("./audit-operational-term-promotions");
```

**`scripts/calibrate-session-zero-thresholds-v27.js`** (currently imports from v27 adjudicator):
```javascript
// BEFORE:
const { gaussianInformation, mutualInformationBinned, stableJson } = require("./external-session-zero-adjudicator-v27");

// AFTER:
const { gaussianInformation, mutualInformationBinned, stableJson } = require("./external-session-zero-adjudicator");
```

**`scripts/audit-v27-superior-gaps.js`** (currently imports from v27):
```javascript
// BEFORE:
const { analyzeManifest } = require("./external-session-zero-adjudicator-v27");

// AFTER:
const { analyzeManifest } = require("./external-session-zero-adjudicator");
```

**Step 6b:** Run `node --check` on every script that was modified.

---

### Task 7: Create `VERSION.md` and Legacy Mapping Documentation

**File:** `VERSION.md`

```markdown
# QICN Framework Version

**Current unified version:** v34
**Last updated:** 2026-05-31

## Unified Commands

```bash
npm run verify              # Current strictest verification (v34)
npm run verify -- --help   # Show all legacy flags
```

## Legacy Version Mapping

| Legacy Version | Equivalent Command | Status |
|----------------|-------------------|--------|
| v25 | `npm run verify -- --legacy-v25` | Preserved as wrapper |
| v26 | `npm run verify -- --legacy-v26` | Preserved as wrapper |
| v27 | `npm run verify -- --legacy-v27` | Preserved as wrapper |
| v28 | `npm run verify -- --legacy-v28` | Preserved as wrapper |
| v29 | `npm run verify -- --legacy-v29` | Preserved as wrapper |
| v30 | `npm run verify -- --legacy-v30` | Preserved as wrapper |
| v31 | `npm run verify -- --legacy-v31` | Preserved as wrapper |
| v32 | `npm run verify -- --legacy-v32` | Preserved as wrapper |
| v33 | `npm run verify -- --legacy-v33` | Preserved as wrapper |

## Architecture

- **Unified adjudicator:** `scripts/external-session-zero-adjudicator.js` (all logic v25-v34)
- **Legacy wrappers:** `scripts/legacy/external-session-zero-adjudicator-v*.js` (thin delegates)
- **Legacy fixtures:** `docs/fixtures/legacy/`
- **Legacy reports:** `docs/reports/legacy/`

## Deprecation Notice

Versioned scripts (v25-v33) are preserved for historical reproducibility but are no longer maintained independently. All bug fixes and enhancements apply to the unified adjudicator only.
```

**File:** `scripts/legacy/README.md`

```markdown
# Legacy Scripts

These scripts are **thin wrappers** that delegate 100% of logic to the unified adjudicator in `scripts/external-session-zero-adjudicator.js`. They exist solely for backward compatibility and historical reproducibility.

Do not modify these wrappers. If you need to change adjudication logic, modify the unified adjudicator.
```

---

### Task 8: Regression Testing

**Step 8a:** Run the unified current verification:
```bash
npm run verify
```
Expect: PASS with `BLOCKED_FOUNDATION_FIRST_GATES` (or whatever the current v34 verdict is)

**Step 8b:** Run each legacy verification via wrapper:
```bash
node scripts/legacy/external-session-zero-adjudicator-v27.js
node scripts/legacy/external-session-zero-adjudicator-v28.js
node scripts/legacy/external-session-zero-adjudicator-v30.js
node scripts/legacy/external-session-zero-adjudicator-v31.js
```

Compare outputs with archived reports in `docs/reports/legacy/`. Verdicts must match exactly.

**Step 8c:** Run supporting scripts:
```bash
node scripts/calibrate-session-zero-thresholds.js
node scripts/audit-operational-term-promotions.js
node scripts/verify-human-veto-signature.js --self-test
node scripts/negative-control-suite.js
node scripts/validate-promotion-rules.js
```

All must PASS.

**Step 8d:** Run `node --check` on every .js file in `scripts/` and `scripts/legacy/`.

---

## 4. VERIFICATION GATES

Before ANY file move or deletion, Codex MUST:

1. **Confirm the file is versioned** (contains `-vNN` in name or is explicitly listed as versioned)
2. **Verify no unversioned script imports from it** (use Grep for `require` paths)
3. **Create a backup** by copying to `scripts/legacy/` BEFORE moving
4. **Test the wrapper** immediately after creating it

Before modifying `package.json`, Codex MUST:

1. **Save a backup** of the original `package.json`
2. **Verify `npm run verify` works** after each change
3. **Verify legacy commands still work** (via wrappers)

---

## 5. EXPLICITLY OUT OF SCOPE

1. **Do NOT delete any fixtures or reports** — move them to `legacy/` subdirectories
2. **Do NOT modify LaTeX documents** — version centralization is for code only
3. **Do NOT change the mathematical logic** — this is structural refactoring, not logic changes
4. **Do NOT remove `scripts/lib/`** — shared libraries stay where they are
5. **Do NOT modify infrastructure scripts** (registry, macros, monolithic builder, etc.)
6. **Do NOT implement new features** — this is cleanup, not enhancement

---

## 6. EXPECTED DELIVERABLES

1. `scripts/external-session-zero-adjudicator.js` — unified adjudicator (all v25-v34 logic)
2. `scripts/calibrate-session-zero-thresholds.js` — unified calibrator
3. `scripts/audit-operational-term-promotions.js` — unified auditor
4. `scripts/verify-human-veto-signature.js` — unified verifier
5. `scripts/legacy/` — 17 thin wrapper scripts + README
6. `docs/fixtures/legacy/` — archived v25-v26 fixtures
7. `docs/reports/legacy/` — archived v25-v31 reports
8. `package.json` — ~20 clean scripts instead of 74
9. `VERSION.md` — version mapping documentation
10. All `node --check` pass on all .js files
11. All legacy wrappers produce identical output to archived reports

---

## 7. FAILURE MODES TO AVOID

1. **Do NOT delete files before verifying wrappers work.** Always move, never delete.
2. **Do NOT break require paths.** Check every import before and after.
3. **Do NOT lose the v27 fixture.** It is the current canonical fixture and stays at root.
4. **Do NOT change adjudication logic during consolidation.** This is a move-and-wrap operation, not a rewrite.
5. **Do NOT forget to update negative-control-suite.js imports.** It imports from both v30 and v31.
6. **Do NOT forget calibrate-session-zero-thresholds-v27.js imports.** It imports from v27 adjudicator.
7. **Do NOT create new LaTeX versions** as part of this cleanup.

---

## 8. PROFESSIONAL CLEANUP CHECKLIST

After consolidation, the codebase should look like this:

```
rigid-identity-framework/
├── VERSION.md                          # NEW: version documentation
├── package.json                        # MODIFIED: ~20 scripts, not 74
├── scripts/
│   ├── external-session-zero-adjudicator.js      # MODIFIED: unified
│   ├── calibrate-session-zero-thresholds.js      # MODIFIED: unified
│   ├── audit-operational-term-promotions.js      # MODIFIED: unified
│   ├── verify-human-veto-signature.js            # MODIFIED: unified
│   ├── audit-superior-gaps.js                    # NEW: unified
│   ├── negative-control-suite.js                 # MODIFIED: updated imports
│   ├── validate-promotion-rules.js                 # MODIFIED: updated imports
│   ├── ar1-correction-clinical-summary.js        # MODIFIED: updated imports (renamed from v28)
│   ├── lib/
│   │   ├── advanced-statistics.js                # UNCHANGED
│   │   ├── gls-statistics.js                     # UNCHANGED
│   │   └── ...                                   # UNCHANGED
│   ├── legacy/                                   # NEW: directory
│   │   ├── README.md                             # NEW
│   │   ├── external-session-zero-adjudicator-v26.js    # MOVED + thin wrapper
│   │   ├── external-session-zero-adjudicator-v27.js    # MOVED + thin wrapper
│   │   ├── external-session-zero-adjudicator-v28.js    # MOVED + thin wrapper
│   │   ├── external-session-zero-adjudicator-v30.js    # MOVED + thin wrapper
│   │   ├── external-session-zero-adjudicator-v31.js    # MOVED + thin wrapper
│   │   ├── calibrate-session-zero-thresholds-v26.js    # MOVED + thin wrapper
│   │   ├── calibrate-session-zero-thresholds-v27.js    # MOVED + thin wrapper
│   │   ├── audit-operational-term-promotions-v27.js      # MOVED + thin wrapper
│   │   ├── audit-operational-term-promotions-v28.js      # MOVED + thin wrapper
│   │   ├── verify-human-veto-signature-v27.js          # MOVED + thin wrapper
│   │   ├── verify-human-veto-signature-v28.js          # MOVED + thin wrapper
│   │   ├── audit-v23-roadmap-gaps.js                     # MOVED
│   │   ├── audit-v24-critical-gaps.js                    # MOVED
│   │   ├── audit-v25-superior-gaps.js                    # MOVED
│   │   ├── audit-v26-superior-gaps.js                    # MOVED
│   │   ├── audit-v27-superior-gaps.js                    # MOVED
│   │   └── ar1-correction-clinical-summary-v28.js        # MOVED
│   └── ... (infrastructure scripts unchanged)
├── docs/
│   ├── fixtures/
│   │   ├── EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json    # UNCHANGED (current)
│   │   └── legacy/                                             # NEW: directory
│   │       ├── EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v25.json  # MOVED
│   │       └── EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json  # MOVED
│   └── reports/
│       └── legacy/                                             # NEW: directory
│           ├── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json  # MOVED
│           ├── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json  # MOVED
│           ├── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json  # MOVED
│           ├── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v28.json  # MOVED
│           ├── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.json  # MOVED
│           └── SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json  # MOVED
```

---

*End of ULTRATHINK v35 Prompt for Version Centralization.*
