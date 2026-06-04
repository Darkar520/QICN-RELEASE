# Codex v32 Implementation Prompt — Foundation-First Gap Closure + Antigravity Bug Fixes

> **For Codex:** This prompt addresses ALL unimplemented gaps from the ULTRATHINK plan PLUS the 3 bugs identified by Antigravity audit PLUS the 6 findings from the deep audit. Execute each task in order. Verify after each phase. Run `node --check` on all modified JS files before proceeding to the next task.

---

## CONTEXT

The previous Codex pass (v31) correctly:
1. Fixed the missing statistical modules (advanced-statistics.js, gls-statistics.js)
2. Created v31 adjudicator wrapper with 4 foundation-first gates
3. Restored Paper 3 .tex from backup
4. Added v31 audit clarification (witness-relative theorem) to Paper 3
5. Created CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex
6. Made all runtime tests pass

However, the following gaps remain OPEN and bugs CONFIRMED:

### Confirmed Bugs (from Antigravity + deep audit)

**BUG-2 CONFIRMED:** `correctedGaussianInformation` in `advanced-statistics.js` omits the Prais-Winsten Jacobian correction `−½ln(1−ρ²)`. The function computes `NLL = n/2·(ln(2πσ̂²)+1)` using innovations but does NOT add `−½ln(1−ρ²)`. Impact: NEGLIGIBLE on verdict (the GLS path `glsGaussianInformation` includes the full determinant correction and is used when |ρ|>0.4), but the AR(1) path is mathematically inconsistent with the v30 LaTeX Proposition 7.3.

**BUG-3 NOT CONFIRMED:** `ar1QuadraticForm` correctly computes `u^T V^{-1} u` including the `1/(1−ρ²)` scaling. The v30 LaTeX eq (6.12) shows the unscaled tridiagonal T and calls it V^{-1}, which is technically incorrect (V^{-1} = T/(1−ρ²)), but the CODE is correct.

**BUG-1 CONFIRMED (documentation):** `estimateRho` uses Yule-Walker lag-1 with known small-sample bias `E[ρ̂] ≈ ρ − (1+3ρ)/(n+1)`. Not documented. Impact: negligible for fixture verdict (bias is downward, making autocorrelation more detectable, not less).

**REGRESSION from deep audit:** The v31 conditional closure theorem proof has a category error: it assumes d_E(∅_φ, ∅_φ) = 0, but ∅_φ ∉ E so this metric is undefined. The proof needs repair.

**Other findings:** Paper 3 PDF not on disk (only .tex); GAP_CLOSURE_STATUS overstates closures; negative-control-suite lacks v31-specific positive tests.

---

## TASKS

### Task 1: Fix BUG-2 — Add Prais-Winsten Jacobian to correctedGaussianInformation

**File:** `scripts/lib/advanced-statistics.js`
**Lines:** 75-93 (function correctedGaussianInformation)

**Change:** After computing `profile = profileGaussianNll(innovations)`, add the Jacobian correction:

```javascript
function correctedGaussianInformation(points, field, k, penaltyFactor = 1) {
  const rawResiduals = residualsFor(points, field);
  const rho = estimateRho(rawResiduals, { centered: true });
  const innovations = praisWinstenInnovations(rawResiduals, rho);
  const profile = profileGaussianNll(innovations);
  const jacobianCorrection = -0.5 * Math.log(Math.max(EPSILON, 1 - rho * rho));
  const correctedNll = profile.nll + jacobianCorrection;
  const penalties = aicAiccFromNll(correctedNll, innovations.length, k, penaltyFactor);
  return {
    ...penalties,
    nll: correctedNll,
    sse: profile.sse,
    sigma2_profile: profile.sigma2,
    residuals: innovations,
    raw_residuals: rawResiduals,
    raw_sse: rawResiduals.reduce((sum, value) => sum + value ** 2, 0),
    jacobian_correction: jacobianCorrection,
    rho,
    rho_estimator: "centered_yule_walker_lag1_clamped",
    correction_method: "prais_winsten_profile_gaussian_with_jacobian",
    governance_note: "rho is centered; uncentered rho diagnostics are not used as autocorrelation evidence. Jacobian correction -½ln(1-ρ²) now included for consistency with gls-statistics.js."
  };
}
```

**Verification:** Run `node --check scripts/lib/advanced-statistics.js` then `npm run verify:v30` and `npm run verify:v31`. The numerical results may shift slightly. The AR(1) AICc gain should change by approximately 2 × 0.5 × ln(1−ρ²) ≈ 2 × 0.5 × 0.338 ≈ 0.34 AICc units for ρ=0.375, which is small but makes the two paths (AR(1) and GLS) numerically consistent.

---

### Task 2: Add bias documentation to estimateRho

**File:** `scripts/lib/advanced-statistics.js`
**Lines:** 36-51 (function estimateRho)

**Change:** Add JSDoc comment documenting the bias:

```javascript
/**
 * Yule-Walker lag-1 autocorrelation estimator.
 *
 * Small-sample bias: E[rho_hat] ≈ rho - (1 + 3*rho)/(n + 1) (Kendall 1954).
 * For n=8, rho=0.375: bias ≈ -0.24. Not bias-corrected.
 * The centered option subtracts the mean before computing, which removes
 * bias from a nonzero residual mean but does not remove the Yule-Walker
 * small-sample bias.
 */
function estimateRho(residuals, options = {}) {
  ...
}
```

**Verification:** `node --check scripts/lib/advanced-statistics.js`

---

### Task 3: Fix v31 conditional closure theorem — Repair ∅_φ category error

**File:** `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
**Lines:** 42-59 (Theorem + Proof)

**Current defect:** The proof assumes d_E(∅_φ, ∅_φ) = 0, but ∅_φ is not a point in E. By Paper 2 Definition 4.1, |E| ≥ 2 and ∅_φ represents the absence of an admissible assignment, not a phenomenological configuration.

**Replace the theorem and proof with:**

```latex
\begin{definition}[Separated external witness]
A separated external witness for a phenomenological assignment $\Phi:\I\to\E$ is a tuple $(\tilde{\I},\epsilon,C)$ where:
\begin{enumerate}
\item $\tilde{\I}\in\mathrm{Ext}(S)$ with $d_{\I}(\I(S),\tilde{\I})=\epsilon>0$;
\item $C>0$ is a global lower Lipschitz constant for $\Phi$ on the witness domain; and
\item $\Phi$ is defined and admissible on both $\I(S)$ and $\tilde{\I}$.
\end{enumerate}
\end{definition}

\begin{theorem}[Witness-relative null exclusion]
Let $S$ be a CCR channel with $M_\Omega=+\infty$. Let $\Phi:\I(S)\to\E$ be a declared compatibility operator satisfying Hypothesis~\ref{hyp:phi-paper2} with global lower Lipschitz constant $C>0$. Suppose a separated external witness $(\tilde{\I},\epsilon,C)$ exists for $\Phi$. Then $\Phi$ cannot assign both $\I(S)$ and $\tilde{\I}$ to the null regime:
\[
\neg\bigl(\Phi(\I(S))=\varnothing_\phi \wedge \Phi(\tilde{\I})=\varnothing_\phi\bigr).
\]
\end{theorem}

\begin{proof}
Suppose for contradiction that both $\Phi(\I(S))=\varnothing_\phi$ and $\Phi(\tilde{\I})=\varnothing_\phi$. There are two cases.

\emph{Case 1: Both endpoints have admissible $\Phi$-values.} If $\Phi$ is defined on both $\I(S)$ and $\tilde{\I}$, then by Hypothesis~\ref{hyp:phi-paper2} clause (4) (global lower Lipschitz):
\[
d_{\E}(\Phi(\I(S)),\Phi(\tilde{\I})) \geq C\, d_{\I}(\I(S),\tilde{\I}) = C\epsilon > 0.
\]
But if both assignments exist, they are distinct (separated by $>0$), so they cannot both be identically null. This contradicts $\Phi(\I(S))=\varnothing_\phi$ or $\Phi(\tilde{\I})=\varnothing_\phi$ (whichever is claimed to be null). More precisely: if $\Phi(\I(S))\in\E$ and $\Phi(\tilde{\I})\in\E$ with $d_{\E}(\Phi(\I(S)),\Phi(\tilde{\I}))\geq C\epsilon > 0$, then at least one of $\Phi(\I(S))$, $\Phi(\tilde{\I})$ is a non-null element of $\E$, contradicting joint nullity.

\emph{Case 2: At least one endpoint lacks an admissible assignment.} If $\Phi$ is undefined on $\I(S)$ or $\tilde{\I}$ (i.e., the null assignment applies because no admissible $\Phi$-value exists), then $\varnothing_\phi$ is the absence of an assignment, and $d_{\E}$ is undefined between $\varnothing_\phi$ and any other value. In this case, the hypothesis ``a separated external witness exists for $\Phi$'' already requires $\Phi$ to be defined on both $\I(S)$ and $\tilde{\I}$, so Case 2 is excluded by the witness hypothesis.

Therefore both endpoints cannot simultaneously be $\varnothing_\phi$. \qedhere
\end{proof}

\begin{remark}[Non-claim]
CCR alone does not produce a separated external witness, does not prove that a compatibility operator exists, and does not imply consciousness or experience. The theorem is conditional on a typed external witness and a verified lower Lipschitz bound. In particular, $\varnothing_\phi$ (null regime) is the absence of an admissible assignment, not a point in $\E$; $d_{\E}$ is undefined for null-to-null comparisons.
\end{remark}
```

**Verification:** Compile with `pdflatex CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` twice. Check 0 errors.

---

### Task 4: Add formal typed perturbation definition to Paper 1

**File:** `paper1/main.tex`
**Location:** After line 440 (Section 4.5, after Definition 4.3 on Ontological Mass)

**Add the following:**

```latex
\subsection{Internal Perturbations and External Extensions}
\label{sec:internal-external}

\begin{definition}[Internal perturbations and external extensions]\label{def:internal-external}
Let $S$ be a CCR channel with identity object $\mathcal{I}(S)$. 
\begin{enumerate}[leftmargin=*]
\item \textbf{Internal perturbations} are operators $\delta\in\Omega_{\mathrm{int}}(S)$ that act ON the identity structure of $S$: $\delta$ maps $\mathcal{I}(S)$ to a deformed identity $\widetilde{\mathcal{I}}(S)$ belonging to the same CCR class, with finite weighted energy $E_w(\delta)<\infty$. Internal perturbations test the rigidity of $\mathcal{I}(S)$ under deformation.
\item \textbf{External extensions} are operations $\eta\in\mathrm{Ext}(S)$ that produce a different channel $S'$: $\eta$ maps $S$ to $S'$ with $D_{\mathrm{ext}}(S,S')=\epsilon>0$. External extensions compare $\mathcal{I}(S)$ with an independently specified object $\mathcal{I}(S')$ not introduced as an element of $\Omega_{\mathrm{int}}(S)$.
\end{enumerate}
\textbf{Typed separation axiom:} $\Omega_{\mathrm{int}}(S)\cap\mathrm{Ext}(S)=\varnothing$.
\end{definition}

\begin{remark}[Interpretation of the typed separation]\label{rem:typed-separation}
The typed separation $\Omega_{\mathrm{int}}(S)\cap\mathrm{Ext}(S)=\varnothing$ is an axiom, not a theorem derived from CCR membership. A perturbation protocol that confuses internal perturbations with external witnesses commits a category error: it uses rigidity under internal deformation (which CCR guarantees) as evidence for phenomological non-nullity (which requires external comparison). QICN has not verified that its perturbation protocols respect this separation.
\end{remark}

\begin{nonclaim}[Empirical certification of $M_\Omega=+\infty$]\label{nonclaim:m-omega-empirical}
The detectability theorem (Theorem~\ref{thm:detectability}) establishes that $M_\Omega=+\infty$ implies $\hat{M}_\Omega\to+\infty$ for any finite family of perturbation protocols. The converse is false: a system with very large but finite $M_\Omega$ can produce arbitrarily large $\hat{M}_\Omega$ estimates. Therefore, empirical divergence of $\hat{M}_\Omega$ certifies CCR behavior but does not prove $M_\Omega=+\infty$. The framework admits falsifiability but not definitive confirmation.
\end{nonclaim}
```

**Verification:** Compile `paper1/main.tex` twice with pdflatex + biber. Check 0 errors, 0 undefined refs.

---

### Task 5: Add Non-Claim for Hϕ clause 4 to Paper 2

**File:** `paper2/main.tex`
**Location:** After line 579 (after the Remark following Hypothesis Hϕ)

**Add:**

```latex
\begin{nonclaim}[Global lower Lipschitz bound is an assumption]\label{nonclaim:hphi-lower-bound}
Hypothesis~\ref{hyp:phi-paper2} clause~(4) requires the existence of a global $C>0$ such that $d_{\mathcal{E}}(\Phi(x),\Phi(y))\geq C\cdot d_w(x,y)$ for all $x,y\in\mathcal{I}$. This is not a theorem derived from clauses~(1)--3). The map $\Phi(x)=\arctan(x)$ from $\mathbb{R}$ to $(-\pi/2,\pi/2)$ satisfies clauses~(1)--3) but has no such $C$. Therefore the Fragmentation Theorem (Theorem~\ref{thm:fragmentation}) is conditional on clause~(4). For any specific phenomenological assignment, one must independently verify that a global lower Lipschitz constant exists. QICN has not performed this verification for any assignment.
\end{nonclaim}
```

**Verification:** Compile `paper2/main.tex` twice. Check 0 errors.

---

### Task 6: Add gap documentation to Paper 3 Section 10

**File:** `paper3/main.tex`
**Location:** In Section 10 (Limitations and Open Problems), after existing content

**Add the following subsection before the Conclusion:**

```latex
\subsection{Foundation-Level Gaps and Non-Claims}\label{sec:gap-nonclaims}

The following gaps remain open in the current corpus and are documented here to prevent over-reading of the instability theorem.

\begin{nontheorem}[Topology consistency gap]\label{nonthm:topology}
Papers I--II assume both compact Hausdorff and Polish structures on state spaces, but do not prove their consistency for QICN instantiation. The inverse limit $\mathcal{I}$ requires compact Hausdorff (Tychonoff), while the metric $d_w$ requires Polish. Every compact metric space is Polish, so the composition is consistent if and only if each $S_t$ is compact metric. Non-compact Polish spaces ($\mathbb{R}^n$) are excluded.
\end{nontheorem}

\begin{nontheorem}[Channel--projection composition gap]\label{nonthm:channel-projection}
The observable channel $\mathcal{C}:\mathcal{U}\to\mathcal{O}$ (Definition~5.1 of Paper~I) and the projective projections $\pi_{t+1\to t}: S_{t+1}\to S_t$ (Section~3 of Paper~I) are not connected by a formal composition law. The detectability theorem (Theorem~5.2) requires such a composition, but it is assumed, not derived.
\end{nontheorem}

\begin{nontheorem}[Null-regime exclusion requires external witness]\label{nonthm:null-external}
The instability theorem (Theorem~\ref{thm:instability}) requires a separated external witness $(\tilde{\mathcal{I}},\epsilon,C)$. CCR alone does not produce such a witness. The theorem is witness-relative: it states that if a CCR system has a typed external witness with lower Lipschitz constant $C>0$, then both endpoints cannot simultaneously be null. It does not state that CCR implies non-nullity.
\end{nontheorem}

\begin{nontheorem}[Estimator verification gap]\label{nonthm:estimator-gap}
No Lipschitz constant $K_i$, fiber oscillation $\omega_i(y)$, estimation error bound $\varepsilon_i$, or decision margin $\Delta^*$ has been computed for any QICN invariant. The projection-invariant bridge theorem (v30) is conditional on these quantities being verified, and all four hypotheses remain unverified.
\end{nontheorem}
```

**Verification:** Compile `paper3/main.tex` with pdflatex + biber + pdflatex + pdflatex. Check page count approximately 13-14 pages. Check that all Non-Theorem labels render correctly.

---

### Task 7: Fix v30 LaTeX equation for V^{-1} scaling

**File:** `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`
**Lines:** 611-621 (Definition of GLS NLL, eq 6.9)

**The issue:** The v30 LaTeX Definition 7.1 states the GLS NLL as:
```
NLL_GLS = n/2 · (ln(2πσ̂²) + 1) − 1/2 · ln(1−ρ²)
```
But the full determinant is `−(n−1)/2 · ln(1−ρ²)`, and the reconciliation in the proof (lines 688-700) claims the residual `(n−2)/2 · ln(1−ρ²)` is "absorbed into σ̂²" which is invalid after profile substitution.

**Change:** Replace the NLL definition and add a remark clarifying the two equivalent forms:

At line 609, replace the existing NLL definition with:

```latex
\begin{definition}[GLS exact NLL — two equivalent forms]\label{def:gls-nll}
For a residual vector $\bm{u}$ under AR(1) with parameter $\rho$, the exact GLS negative log-likelihood has two equivalent forms.

\textbf{Form A} (Prais-Winsten form). Using the whitened innovations $v_t$ from Proposition~\ref{prop:co-pw}:
\begin{equation}\label{eq:gls-nll-pw}
\mathrm{NLL}_{\mathrm{GLS}}^{(\mathrm{PW})}\;=\;\frac{n}{2}\bigl(\ln(2\pi\hat{\sigma}_\varepsilon^2)+1\bigr)\;-\;\frac{1}{2}\ln(1-\rho^2)
\end{equation}
where $\hat{\sigma}_\varepsilon^2=\bm{v}^T\bm{v}/n$ is the innovation variance and $-\frac{1}{2}\ln(1-\rho^2)$ is the Prais-Winsten Jacobian correction for the first observation.

\textbf{Form B} (Full determinant form). Using the full AR(1) covariance structure:
\begin{equation}\label{eq:gls-nll-det}
\mathrm{NLL}_{\mathrm{GLS}}^{(\mathrm{det})}\;=\;\frac{n}{2}\bigl(\ln(2\pi\hat{\sigma}^2)+1\bigr)\;+\;\frac{n-1}{2}\ln(1-\rho^2)
\end{equation}
where $\hat{\sigma}^2=\bm{u}^T\bm{V}^{-1}\bm{u}/n$ is the GLS scale estimator and $\frac{n-1}{2}\ln(1-\rho^2)$ is the full determinant correction $\frac{1}{2}\ln|\bm{V}|$.

Forms A and B produce identical AICc values because the profile likelihood absorbs the difference in scale definition: $\hat{\sigma}^2 = \hat{\sigma}_\varepsilon^2$ when both are computed from the same quadratic form.
\end{definition}
```

**Verification:** Compile v30 twice. Check 0 errors.

---

### Task 8: Remove duplicate `autocorrelation` function from v30

**File:** `scripts/external-session-zero-adjudicator-v30.js`
**Lines:** 185-198 (approximately)

There is a private `function autocorrelation(residuals, lag)` in v30 that duplicates the functionality of `estimateRho` from `advanced-statistics.js`. When `estimateRho` is called with `lag=1` and `centered=true`, it computes the same thing.

**Change:** Remove the duplicate `autocorrelation` function from v30 and replace its uses with `estimateRho`. Verify that the import at line 24 already includes `estimateRho`. If the `autocorrelation` function is used for lag>1 (which it might be for DW computation), keep it but rename it to make the distinction clear, or add a comment explaining why it's separate.

**Verification:** `node --check scripts/external-session-zero-adjudicator-v30.js` then `npm run verify:v30`.

---

### Task 9: Fix GAP_CLOSURE_STATUS labeling

**File:** `scripts/external-session-zero-adjudicator-v31.js`
**Lines:** 110-121 (statusFromChecks function)

**Change:** Replace `"closed_or_gate_enforced"` with `"gate_enforced_gap_remains_open"` for items L0-1, L0-2, L0-3, L2-1, and L3-1:

```javascript
["L0-1", "v30 missing statistical helper modules", true, "gate_enforced: advanced-statistics.js and gls-statistics.js are required and present; mathematical gap (compact Hausdorff + Polish consistency) remains open"],
["L0-2", "centered rho separates serial dependence from nonzero residual mean", true, "gate_enforced: estimateRho uses centered lag-1 Yule-Walker; bias documentation pending"],
["L0-3", "exact GLS profile likelihood available", true, "gate_enforced: glsGaussianInformation uses AR(1) covariance quadratic form; AICc sign reversal detection operational, statistical validity gap remains open"],
...
["L2-1", "Paper 3 restored from local recovery artifact", fs.existsSync(path.join(ROOT, "paper3", "main.tex")), "gate_enforced: paper3/main.tex present; PDF compilation pending"],
["L3-1", "iid-only AICc blocked by temporal dependence", (v30Report.blocking_reasons || []).includes("BLOCKED_TEMPORAL_DEPENDENCE_STRICT"), "gate_enforced: v30 strict DW gate blocks the synthetic fixture; statistical validity gap (fixture is synthetic, no external dataset) remains open"],
```

**Verification:** `node --check scripts/external-session-zero-adjudicator-v31.js` then `npm run verify:v31`.

---

### Task 10: Add v31 positive test cases to negative-control-suite

**File:** `scripts/negative-control-suite.js`

**Add two new test cases after the existing 4:**

```javascript
{
  name: "v31_type_confusion_positive",
  manifest: (() => {
    const m = clone(base);
    m.perturbation_type_registry = {
      internal_perturbations: [{ id: "p1", type: "internal", description: "finite-energy deformation of identity" }],
      external_witnesses: [{ id: "w1", type: "external_extension", description: "independent channel comparison", d_ext: 0.05 }]
    };
    m.manifest_id = `${base.manifest_id || "fixture"}-positive-type-separation`;
    return m;
  })(),
  expectedBlockers: [] // Should NOT trigger BLOCKED_TYPE_CONFUSION since registry exists
},
{
  name: "v31_circular_calibration_positive",
  manifest: (() => {
    const m = clone(base);
    m.decision_thresholds = m.decision_thresholds || {};
    m.decision_thresholds.threshold_calibration_lineage = {
      fixture_blind: true,
      generated_before_fixture_scoring: true,
      external_holdout_used: true
    };
    m.manifest_id = `${base.manifest_id || "fixture"}-positive-calibration-lineage`;
    return m;
  })(),
  expectedBlockers: [] // Should NOT trigger BLOCKED_CIRCULAR_CALIBRATION since lineage exists
}
```

Note: These positive tests set up the fixture fields that v31 checks for. They verify that the gate passes when the required data is present. They will still be blocked by other v30/v31 gates (AFFINE_LEAKAGE, etc.) since we're using the adversarial fixture.

**Verification:** `node scripts/negative-control-suite.js` — all 6 cases should pass.

---

### Task 11: Compile Paper 3 to PDF

**Run:**
```powershell
cd paper3
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Verify that `paper3/main.pdf` exists and has approximately 13-14 pages (from the .aux, `\@abspage@last{13}`).

---

### Task 12: Run full verification suite

**Run:**
```powershell
cd C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework
npm run verify:v30
npm run verify:v31
npm run verify:v27
npm run verify:v26
node scripts/negative-control-suite.js
node scripts/validate-promotion-rules.js
node scripts/audit-operational-term-promotions-v28.js
node --check scripts/lib/advanced-statistics.js
node --check scripts/lib/gls-statistics.js
node --check scripts/external-session-zero-adjudicator-v31.js
node --check scripts/external-session-zero-adjudicator-v30.js
node --check scripts/ar1-correction-clinical-summary-v28.js
node --check scripts/negative-control-suite.js
node --check scripts/validate-promotion-rules.js
```

All must pass or exit with expected blocked verdicts.

---

## PRIORITY ORDER

Execute in this exact order:
1. Task 1 (BUG-2 fix) — foundation for statistical correctness
2. Task 2 (bias documentation) — companion to Task 1
3. Task 3 (v31 theorem repair) — mathematical regression fix
4. Task 4 (Paper 1 typed separation) — L0-DEFECT-4
5. Task 5 (Paper 2 Hϕ Non-Claim) — L1-DEFECT-1
6. Task 6 (Paper 3 gap Non-Theorems) — L1 documentation
7. Task 7 (v30 LaTeX equation fix) — mathematical correctness
8. Task 8 (duplicate autocorrelation) — code hygiene
9. Task 9 (GAP_CLOSURE_STATUS labels) — labeling accuracy
10. Task 10 (v31 positive tests) — test coverage
11. Task 11 (Paper 3 PDF) — artifact production
12. Task 12 (full verification) — final gate

## GAPS NOT ADDRESSED IN THIS PROMPT (require separate prompts)

The following gaps from the ULTRATHINK plan remain OPEN and are NOT addressed here because they require deeper mathematical work or separate implementation sessions:

- **L0-DEFECT-1:** Compact Hausdorff + Polish consistency axiom for Paper 1 (requires deciding whether to restrict to compact metric spaces or add an explicit assumption)
- **L0-DEFECT-2:** Channel-projection composition law for Paper 1 (requires defining the composition C = R ∘ π)
- **L0-DEFECT-3:** M̂_Ω → ∞ ≠ M_Ω = ∞ Non-Claim (partially addressed by Task 4, but the detectability theorem itself needs strengthening)
- **L4 (Estimator gaps):** No K_i, ω_i, or ε_i computed for any invariant (requires mapping the 6 invariants to metric spaces)
- **L5 (Factorization):** No proof or counterexample for C ∈ σ(F_1,...,F_6) (requires defining the claim algebra)
- **D_ext,N implementation or commutativity gate** (from Antigravity audit) — requires defining external distance computation in the adjudicator
- **OCC-class negative controls** (from Antigravity audit) — requires defining orthogonal complement class test fixtures