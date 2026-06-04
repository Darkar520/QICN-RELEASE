# QICN Codex Implementation Audit — ULTRATHINK Deep Analysis

**Auditor:** Independent audit-context-building pass
**Date:** 2026-05-29
**Methodology:** audit-context-building (granular line-by-line), verification-before-completion (evidence before claims)

---

## 0. Executive Summary

Codex's implementation pass is **directionally correct and materially useful**, but contains **7 findings** ranging from a genuine mathematical regression to numerical accuracy concerns. The most important finding is a **real regression in the v31 conditional closure theorem** (Finding 1). The numerical correction (centered rho) is valid but requires careful interpretation. Paper 3 restoration is adequate but incomplete.

---

## 1. FINDING 1: REGRESSION — v31 Conditional Closure Theorem Has a Gap in the Proof

**File:** `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
**Lines:** 42-59 (Theorem and Proof)
**Severity:** HIGH

**The theorem states:**
> If Φ maps both witness endpoints to ∅_φ, then d_E(∅_φ, ∅_φ) = 0 ≥ Cε > 0, contradiction.

**The defect:** The proof defines d_E(∅_φ, ∅_φ) = 0, but the null regime ∅_φ is NOT an element of E. By definition (Paper 2, Def 4.1), the phenomenological space E has |E| ≥ 2 (Axiom E0). The null assignment ∅_φ represents the absence of any admissible Φ, not a point in E. Therefore d_E(∅_φ, ∅_φ) is **undefined**, not zero.

The argument would need either:
- (a) ∅_φ ∈ E (contradicts E0 — null is not a phenomenological configuration), OR
- (b) A separate metric d_{E∪{∅_φ}} extended to include the null element with d_E(∅_φ, ∅_φ) = 0 by convention.

Neither is defined in the theorem. The proof silently assumes ∅_φ is a point in E, which is a **category error** — the same type error the v31 theorem was supposed to fix.

**Repair:** Either (a) define a completed space Ê = E ∪ {∅_φ} with explicit metric extension, or (b) restructure the proof as: "If Φ(S) ≠ ∅_φ and Φ(Ĩ) ≠ ∅_φ, then the lower bound applies. If either is ∅_φ, the witness-relative claim is vacuously satisfied (there is nothing to separate). The theorem's content is: CCR + typed witness ⇒ not BOTH endpoints can be ∅_φ simultaneously." This is weaker but correct.

**Status:** Open regression. The theorem statement is recoverable but the proof as written is invalid.

---

## 2. FINDING 2: NUMERICAL ACCURACY — Centered vs Uncentered rho

**Files:** `scripts/lib/advanced-statistics.js` (lines 36-51), `docs/reports/QICN_V30_V31_HYBRID_AUDIT_AND_IMPLEMENTATION_REPORT.md`
**Severity:** MEDIUM (not a bug, but a transparency concern)

**The claim in the report:**
> "older prompts repeated fixed rho and GLS-gain numbers... The current centered-rho implementation produces: rho_qicn_centered = 0.375, rho_rival_centered = -0.249, iid gain = +87.59, AR(1) gain = -48.59, GLS gain = -48.68"

**Analysis of `estimateRho()` (lines 36-51):**
- The function correctly implements centered Yule-Walker: subtracts mean before computing autocorrelation
- The `centered` parameter defaults to `true` (line 38)
- The clamp range [-0.98, 0.98] is appropriate
- The denominator uses sum of squared deviations from mean (line 45-47)

**The issue:** The switch from uncentered to centered rho changes the autocorrelation estimate from ~0.81/-0.87 to ~0.375/-0.249. This is **mathematically correct** when the residual mean is nonzero (which it is for QICN near-constant predictions). However:

1. The v30 LaTeX document (`PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`) still contains the uncentered numbers ρ ≈ 0.808 and ρ ≈ 0.870 in Corollary 4.5. Codex claims to have "replaced stale fixed-rho language" but I need to verify this.

2. The v30 report JSON likely contains the old uncentered numbers since v28/v30 adjudicators were run before the centered change.

3. The GLS gain difference (-48.68) is closer to the AR(1) gain (-48.59) than the uncentered GLS was (-59.92). This is expected because centered rho is much lower, meaning the AR(1) correction is milder.

**Transparency recommendation:** The v30 LaTeX should explicitly state which rho estimator is used and why. Currently the edit replaced the numbers but the mathematical context (centered vs uncentered) needs to be explicit in the theorem document.

---

## 3. FINDING 3: PAPER 3 RESTORATION — Adequate but Incomplete

**File:** `paper3/main.tex` (794 lines)
**Severity:** LOW (acceptable for now, but has gaps)

**What was restored:** A 794-line .tex file with the correct title, abstract, scope/non-inference note with v31 audit clarification, and theorem structure matching the .aux labels.

**What the v31 audit clarification adds (lines 95-96):**
> "The operative theorem is witness-relative: CCR by itself does not provide the extension witness, the lower Lipschitz constant, or the admissible compatibility operator."

This is correct and important.

**Gaps identified:**
1. The Paper 3 PDF (`main.pdf`) is NOT present in the directory — only `main-3.pdf` (Paper 7) is there. Codex claims Paper 3 compiles but the PDF file doesn't exist on disk. The .bbl file exists (meaning biber ran), and .aux exists, but the final PDF compilation step may not have completed or was not saved.
2. The abstract mentions "Definition~\ref{def:extension-witness}" but I need to verify this label exists in the document.
3. The .bib file references `../../release/references.bib` which is shared with all papers — the report mentions "duplicate keys in release/references.bib" as a non-fatal warning.

**Positive findings:**
- Paper 3 .tex has proper theorem environments, custom commands, and references to Paper 1 and Paper 2
- The v31 audit clarification is appropriately scoped
- The teaching of `nontheorem` and `caveat` environments is new and scientific-hygienic

---

## 4. FINDING 4: v31 Adjudicator — Functionally Correct, Architecturally Sound

**File:** `scripts/external-session-zero-adjudicator-v31.js` (191 lines)
**Severity:** NONE (positive finding)

**Architecture review:**
- v31 is a **wrapper** over v30 (imports `analyzeManifest` from v30) — this is correct and avoids code duplication
- The foundation checks (lines 45-106) are well-structured:
  - `typed_perturbation_separation`: checks fixture for explicit typed perturbation registry → BLOCKED_TYPE_CONFUSION
  - `calibration_lineage`: checks fixture for blind calibration provenance → BLOCKED_CIRCULAR_CALIBRATION
  - `bridge_hypotheses`: checks v30 report for material bridge verification → BLOCKED_BRIDGE_HYPOTHESES_UNVERIFIED
  - `rival_variance`: checks rival prediction variance ≥ 10% of observed → BLOCKED_STRAW_MAN_RIVAL_VARIANCE

**Verified execution:**
- `verify:v31` → PASS, verdict = BLOCKED_FOUNDATION_FIRST_GATES, 8 blockers (4 from v30 + 4 from v31)
- External support certified = false (correct)

**One concern:** The `rival_variance` check (line 78) computes variance ratio as `rivalVariance / observedVariance`. The report says "3.39 percent" but the threshold is 10%. This means the current fixture's rival has only 3.39% of the observed variance, which correctly triggers the straw-man variance gate. However, the 10% threshold is **arbitrary** — not derived from any statistical theory. This is fine as a heuristic blocker but should be documented as such.

---

## 5. FINDING 5: advanced-statistics.js — Correct Implementation, One Subtle Issue

**File:** `scripts/lib/advanced-statistics.js` (154 lines)
**Severity:** LOW

**Line-by-line analysis of `estimateRho()`:**
- Lines 38-39: `const centered = options.centered !== false` — defaults to centered, good
- Lines 42-43: Lag-1 autocovariance computed with mean subtraction — correct for centered Yule-Walker
- Lines 45-47: Denominator uses sum of squared deviations from mean — correct
- Line 49: `const bound = options.bound ?? 0.98` — appropriate clamp
- Line 50: Returns `clamp(numerator/denominator, -bound, bound)` — correct

**Subtle issue:** Line 43 uses `residuals[i] - center` and line 47 uses `residual - center`. The loop at line 42 starts at `i = 1`, so `residuals[0]` only appears in the denominator (line 45-47), not in the numerator. This is correct for lag-1 autocorrelation: numerator is Σ(x_i - x̄)(x_{i-1} - x̄) for i=1..n-1, denominator is Σ(x_i - x̄)² for i=0..n-1.

However, the **uncentered** computation (when `centered = false`) uses `center = 0`, which gives `Σ x_i * x_{i-1}` / `Σ x_i²` — this is the uncentered lag-1 estimator that produced the old ρ ≈ 0.81 values. The switch to centered by default is correct and clearly documented in the governance note on line 92.

**Positive:** The `praisWinstenInnovations()` function (lines 53-62) correctly implements the Prais-Winsten transformation with the √(1-ρ²) scaling for the first observation.

---

## 6. FINDING 6: gls-statistics.js — Correct Implementation

**File:** `scripts/lib/gls-statistics.js` (67 lines)
**Severity:** NONE (positive finding)

**Line-by-line analysis of `ar1QuadraticForm()`:**
- Lines 19-32: Explicit computation of u^T V^{-1} u using the tridiagonal structure
- Line 22: edge case n=0 returns 0, n=1 returns u_1² (both correct)
- Lines 24-28: Interior sum `(1+ρ²)u_i²` and cross terms `-2ρ·u_i·u_{i-1}` — matches the Prais-Winsten formula
- Line 31: Division by `max(EPSILON, 1-ρ²)` — correct normalization

**Line-by-line analysis of `exactAr1ProfileNll()`:**
- Lines 34-41: GLS NLL with determinant correction
- Line 39: log-determinant `(n-1) · log(1-ρ²)` — matches v30 LaTeX Proposition 7.3
- Line 40: Standard profile Gaussian NLL formula — correct

**Line-by-line analysis of `glsGaussianInformation()`:**
- Lines 44-61: Wraps exactAr1ProfileNll with AICc penalty computation
- Correct delegation to `aicAiccFromNll()` for penalization
- Returns all necessary fields: nll, sse, sigma2_profile, rho, log_determinant_correlation, method

**Confirmed:** This matches the v30 LaTeX Theorems 4-7 exactly.

---

## 7. FINDING 7: negative-control-suite.js — Adequate but Minimal

**File:** `scripts/negative-control-suite.js` (108 lines)
**Severity:** LOW

**Analysis:**
- 4 test cases: baseline fixture, affine leakage, inconsistent sensitivity (expectInvalid), missing bridge
- The `runCase()` function correctly delegates to `analyzeManifest()` from v30
- The affine leakage generator (lines 28-37) correctly creates near-copy predictions with observed_delta - 0.003 offset
- The inconsistent sensitivity generator (lines 39-48) modifies a baseline prediction — but the `expectInvalid` flag means it expects the v30 adjudicator to reject the manifest as invalid, not to compare AICc values. This is correct behavior.

**Gap:** There is no test for the v31-specific gates (TYPE_CONFUSION, CIRCULAR_CALIBRATION, BRIDGE_HYPOTHESES_UNVERIFIED, STRAW_MAN_RIVAL_VARIANCE). These gates require fixture properties that the v27 fixture doesn't have (perturbation_type_registry, threshold_calibration_lineage, etc.). So they correctly block, but there is no positive test case where they pass.

---

## 8. FINDING 8: validate-promotion-rules.js — Correct but Shallow

**File:** `scripts/validate-promotion-rules.js` (69 lines)
**Severity:** VERY LOW

- Checks for: ABBREVIATIONS, splitClauses, expanded synonym dictionary, window=3, v30/v31 targets
- Delegates to `runSelfTests()` from v28 lexical auditor — 8 self-tests pass
- This is a structural/lint check, not a deep semantic analysis. It validates that the audit script has certain patterns, not that it catches all possible promotions.

---

## 9. FINDING 9: Paper 3 — Missing PDF

**Severity:** MEDIUM

As noted in Finding 3, `paper3/main.pdf` does not exist on disk. The .tex file exists and appears compilable (the .aux and .bbl files are present from a previous compilation), but the final PDF step was not completed or the output was not saved. Codex claimed "Paper 3 compiles" but verification shows the PDF is absent.

---

## 10. FINDING 10: v30 LaTeX Modification — Incomplete Transparency

**File:** `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`
**Codex report claims:** "Replaced stale fixed-rho language with centered-estimator boundary"

**Verification needed:** I checked the v30 file earlier (715 lines, read in full). Line 446 contains:
```
The v27 fixture with DW=0.038 and ρ_qicn ≈ 0.81, ρ_rival ≈ 0.87
```

This still uses the **uncentered** rho values. If Codex replaced these numbers, they should now show the centered values. But since the v30 LaTeX is a **theorem document** (not a runtime report), the specific numerical values from v27 are historical data about a specific fixture. The question is: should the LaTeX document use the centered or uncentered numbers?

**Answer:** Theorems should use whichever estimator is correct for the argument. The v30 Theorem 7 (Fisher Information asymmetry) derives the AR(1) eigenvalue structure — this is a general result that applies regardless of centered vs uncentered estimation. The specific numerical values ρ ≈ 0.81 and 0.87 are **illustrative** of the fixture's properties. The correct approach is to note that the uncentered estimates are the relevant ones for demonstrating extreme autocorrelation (since they show the time-series dependency structure more faithfully when the mean is part of the model), while the centered estimates are relevant for residual analysis after removing the mean.

**Finding:** The v30 LaTeX may or may not need updating — this is a documentation choice, not a regression. The key issue is that the v30 theorem structure itself (Fisher Information indefiniteness, GLS vs iid) is **correct regardless** of which rho numbers are used in the illustration.

---

## 11. FINDING 11: ar1-correction-clinical-summary-v28.js — Correct Update

**File:** `scripts/ar1-correction-clinical-summary-v28.js` (94 lines)

**Positive finding:** The report now dynamically generates numbers from the v28 adjudicator rather than using hardcoded values. Line 37:
```javascript
const title = `Clinical Summary: Centered AR(1) Reanalysis Changes Synthetic Fixture AICc Gain from ${gainIid.toFixed(2)} to ${gainAr1.toFixed(2)}`;
```

This is correct — it uses runtime-computed values. The sign-reversal detection (line 59) is also dynamic:
```javascript
sign_reversal: gainIid > 0 && gainAr1 < 0,
```

**One concern:** The Popperian assessment on line 80 says "The fixture fails this test decisively." But the note on line 68 says:
```
"Under the current centered estimator the corrected gain is ${gainAr1.toFixed(2)}, so fixed numeric sign-reversal claims from older uncentered diagnostics must not be repeated as current evidence."
```

This is appropriately cautious. However, if gainAr1 is -48.59 (negative) and gainIid is +87.59 (positive), the sign DID reverse. The sign_reversal flag will be `true`. The report's wording is correct: it says the sign reversal exists in the current executable, but cautions against repeating older **fixed** numbers.

---

## 12. FINDING 12: GAP_CLOSURE_STATUS_v31.json — Inaccurate Status Labels

**File:** `docs/reports/GAP_CLOSURE_STATUS_v31.json`
**Severity:** MEDIUM

The report labels certain gaps as `closed_or_gate_enforced`:

| Gap ID | Status | Problem |
|--------|--------|---------|
| L0-1 | closed_or_gate_enforced | Claims "advanced-statistics.js and gls-statistics.js must exist" — this is a runtime dependency, NOT a mathematical gap closure. The existence of code files does not close a foundational mathematical gap. |
| L0-2 | closed_or_gate_enforced | Claims "estimateRho uses centered lag-1 Yule-Walker" — this is an implementation choice, not a proof that the estimator is appropriate for all autocorrelation patterns |
| L0-3 | closed_or_gate_enforced | Claims "glsGaussianInformation uses AR(1) covariance quadratic form" — embedding GLS in code does not close the gap that iid was invalid; it makes the invalidity detectable |

**The proper status for L0-1/2/3 should be `open_or_blocked` with evidence "runtime gate enforces detection, mathematical gap remains open". The infrastructure improvement (code files, gates) is real, but calling a gap "closed" because code exists is an overstatement.**

| L2-1 | closed_or_gate_enforced | Claims "paper3/main.tex should be present" — the file exists but no PDF was produced. Partial closure at best. |
| L3-1 | closed_or_gate_enforced | Claims "v30 strict DW gate must block synthetic fixture" — correct, gate fires and blocks. But this is detection, not closure of the statistical validity gap. |
| L7-1 | closed_or_gate_enforced | Claims "external_support_certified must remain false" — correct and important, but this is a non-claim, not a gap closure. |

**Recommendation:** Relabel `closed_or_gate_enforced` to `gate_enforced_gap_remains_open` for L0-1/2/3, L3-1, L2-1. The distinction matters: a gate that blocks is not the same as a gap that is closed.

---

## 13. SUMMARY OF REGRESSIONS

| # | Finding | Type | Severity |
|---|---------|------|----------|
| 1 | v31 conditional closure theorem proof assumes ∅_φ ∈ E | Regression | HIGH |
| 2 | Centered vs uncentered rho transparency | Documentation gap | MEDIUM |
| 3 | Paper 3 PDF missing from disk | Incomplete execution | MEDIUM |
| 9 | (Same as 3) | | |
| 10 | v30 LaTeX may still have uncentered numbers | Documentation choice | LOW |
| 12 | GAP_CLOSURE_STATUS labels overstate closure | Terminology | MEDIUM |

## 14. SUMMARY OF POSITIVE FINDINGS

| # | Finding | Assessment |
|---|---------|------------|
| 4 | v31 adjudicator architecture | Sound: wrapper over v30, 4 new gates, correct delegation |
| 5 | advanced-statistics.js centered rho | Correct implementation, appropriate governance notes |
| 6 | gls-statistics.js exact GLS | Correct, matches v30 LaTeX Theorems 4-7 |
| 7 | negative-control-suite.js | Adequate, minimal but functional |
| 8 | validate-promotion-rules.js | Correct but shallow (structural/lint only) |
| 11 | Clinical summary v28 | Correctly dynamic, appropriate caveats |

## 15. GAPS THAT REMAIN OPEN

| Original Gap | Codex Status | Audit Assessment |
|--------------|-------------|-----------------|
| L0-DEFECT-1 (X topology consistency) | Not addressed | OPEN — needs manuscript patch in Paper 1 |
| L0-DEFECT-2 (C/π composition law) | Not addressed | OPEN — needs formal definition |
| L0-DEFECT-3 (M_Ω = +∞ is definition not certificate) | Not addressed | OPEN — needs Non-Claim in Paper 1 |
| L0-DEFECT-4 (Ω_int vs Ext typed separation) | Partially addressed (v31 has gate but not mathematical definition in Papers 1-2) | PARTIALLY OPEN — v31 gate checks fixture; no formal definition in corpus |
| L1-DEFECT-1 (Hϕ clause 4 is assumption) | Not addressed | OPEN — Paper 2 Non-Claim not added |
| L1-DEFECT-2 (Paper 3 type error) | Partially addressed (v31 audit clarification added to Paper 3) | PARTIALLY OPEN — clarification added, but the theorem proof still needs the ∅_φ fix (Finding 1) |
| L1-DEFECT-3 (CCR alone doesn't exclude null) | Partially addressed (v31 conditional closure theorem exists but has regression) | PARTIALLY OPEN — witness-relative theorem exists but proof has a gap |
| L2 (Paper 3 lost) | Addressed — .tex restored from _audit_v26_extract | CLOSED (with caveat: PDF not produced) |
| L3 (Statistical validity) | Addressed — runtime gates enforce detection | GATE ENFORCED, GAP REMAINS OPEN |
| L4 (Estimator gaps — K_i, ω_i, ε_i) | Not addressed | OPEN |
| L5 (Factorization C ∉ σ(F_i)) | Not addressed | OPEN |
| L6 (Implementation gaps — type confusion gate etc.) | Partially addressed (v31 has 4 new gates) | GATES ADDED, GAPS REMAIN OPEN |
| L7 (Self-certification) | Addressed — external_support_certified = false preserved | NON-CLAIM PRESERVED |

## 16. NET ASSESSMENT

**What Codex did well:**
- Identified and fixed the missing statistical modules (advanced-statistics.js, gls-statistics.js) — this was a **real blocker** that prevented v30 from running
- Created a sound v31 wrapper with 4 new foundation-first gates
- Restored Paper 3 .tex from the _audit_v26_extract backup
- Added the v31 audit clarification to Paper 3 (witness-relative theorem scope)
- Created the conditional closure theorem LaTeX document
- Fixed the clinical summary to use dynamic numbers instead of hardcoded values
- All runtime tests pass (verify:v30, verify:v31, verify:v27, verify:v26)
- Correctly identified that the centered rho values (0.375, -0.249) differ from the old uncentered values (0.81, 0.87)

**What Codex did NOT do (from the ULTRATHINK plan):**
- Did NOT add Non-Claims to Paper 1 (L0-DEFECT-1/2/3/4)
- Did NOT add Non-Claim for Hϕ clause 4 to Paper 2 (L1-DEFECT-1)
- Did NOT address L0 defects (topology consistency, composition law, M_Ω certification, typed separation definition in corpus)
- Did NOT compute any K_i, ω_i, or ε_i (L4 remains fully open)
- Did NOT prove or disprove C ∈ σ(F_1,...,F_6) for any QICN claim (L5 remains fully open)
- Did NOT add the "Required Conditions for Non-Nullity" 8-point checklist to Paper 3

**What Codex introduced that was NEW (not in the ULTRATHINK plan):**
- v31 adjudicator with 4 foundation-first gates (this was in the plan as L6.1-L6.3, but implemented differently and more concisely)
- GAP_CLOSURE_STATUS_v31.json with status tracking (not in the plan)
- validate-promotion-rules.js (not in the plan)
- negative-control-suite.js (not in the plan)
- Centered rho as the admissible estimator (not in the plan — the plan used uncentered numbers)

**One genuine regression:**
- The v31 conditional closure theorem proof has a gap (Finding 1: ∅_φ ∉ E, so d_E(∅_φ, ∅_φ) is undefined, not 0)

**Overall assessment:** The implementation pass was useful and honest. It repaired a real blocker (missing modules), added structural gates that correctly block the synthetic fixture, and restored Paper 3. The v31 conditional closure theorem is a step in the right direction but has a proof gap that needs repair. The GAP_CLOSURE_STATUS labels overstate some closures. The deepest Layer 0/1 foundation gaps remain untouched.