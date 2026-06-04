# QICN v30/v31 Hybrid Executed Plan

Governance boundary: this plan records an internal hardening pass. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.

## 1. Evidence Preflight

Local governance was treated as binding before implementation:

- `.agent/` was not present in the workspace.
- `.kilocode/rules/RCIC.md` supplied the local ULTRATHINK depth rule.
- `docs/CANON_SOURCE_OF_TRUTH.md`, `docs/LAYER_BOUNDARIES.md`, `docs/THEORY_SYSTEM_INTERFACE.md`, and `docs/CLAIM_REGISTRY.md` require strict separation between theory, implementation, interpretation, and external validation.
- The two prompts were treated as hypotheses to verify, not as ground truth.

## 2. Prompt Claims Verified Against Disk

| Claim | Verdict | Evidence |
|---|---:|---|
| v30 adjudicator exists | True but broken before this pass | `scripts/external-session-zero-adjudicator-v30.js` existed and imported missing modules. |
| v30 is operational with exact GLS | False before this pass | `scripts/lib/advanced-statistics.js` and `scripts/lib/gls-statistics.js` were absent. |
| Paper 3 live tree is incomplete | True | `paper3/` contained only `main-3.pdf` before recovery. |
| `paper3/main-3.pdf` is Paper 7 | True | PDF first page title: `Operational Life, Structural Class, and Subjecthood...`. |
| Paper 3 source is lost | Partially false | Live tree lacked it, but `_audit_v26_extract/rigid-identity-framework/paper3/` contained `main.tex`, `main.pdf`, and `references.bib`. |
| v27 fixture has DW near 0.038 | True | v30 report now emits `durbin_watson = 0.03846153846153865`. |
| rho values are 0.808 and 0.870 | Stale under centered estimator | Current centered lag-1 rho values are `0.3750` and `-0.2493`. Older uncentered values are not current evidence. |
| AICc support reverses under corrected dependence model | True in current executable, numeric values changed | iid gain `+87.59`; AR(1) gain `-48.59`; exact GLS gain `-48.68`. |
| Bridge theorem H1-H4 are not materially verified | True | v30 theorem itself declares H1-H4 open or failed; v31 now blocks this explicitly. |
| Negative control and promotion scripts exist | False before this pass | `negative-control-suite.js` and `validate-promotion-rules.js` were absent; both now exist and pass. |

## 3. Hybrid Implementation

### 3.1 Statistical Runtime Base

Implemented:

- `scripts/lib/advanced-statistics.js`
  - centered lag-1 rho estimator
  - Prais-Winsten profile Gaussian quasi-likelihood
  - Miller-Madow mutual information
  - shared AIC/AICc helper
- `scripts/lib/gls-statistics.js`
  - exact AR(1) covariance quadratic form
  - exact GLS profile likelihood

Design decision: centered rho is now the admissible autocorrelation estimator. This prevents treating a nonzero residual mean as serial memory.

### 3.2 v30 Verification Layer

Implemented:

- `scripts/negative-control-suite.js`
- `scripts/validate-promotion-rules.js`
- package scripts:
  - `verify:v30`
  - `test:negative-control-suite`
  - `validate:promotion-rules`

Outcome:

- `verify:v30` passes.
- The synthetic fixture is blocked by four gates:
  - `BLOCKED_AFFINE_LEAKAGE`
  - `BLOCKED_MI_LEAKAGE_MILLER_MADOW`
  - `BLOCKED_STRAW_MAN_RIVAL`
  - `BLOCKED_TEMPORAL_DEPENDENCE_STRICT`

### 3.3 Foundation-First v31 Wrapper

Implemented:

- `scripts/external-session-zero-adjudicator-v31.js`
- `docs/reports/GAP_CLOSURE_STATUS_v31.json`
- package scripts:
  - `adjudicate:external-session-zero-v31`
  - `verify:v31`

v31 adds blockers that statistics alone cannot close:

- `BLOCKED_TYPE_CONFUSION`
- `BLOCKED_CIRCULAR_CALIBRATION`
- `BLOCKED_BRIDGE_HYPOTHESES_UNVERIFIED`
- `BLOCKED_STRAW_MAN_RIVAL_VARIANCE`

Current v31 verdict is intentionally blocked:

`BLOCKED_FOUNDATION_FIRST_GATES`

### 3.4 Paper 3 Recovery

Implemented:

- restored `paper3/main.tex`
- restored `paper3/references.bib`
- restored `paper3/main.pdf`
- preserved `paper3/main-3.pdf` instead of deleting it
- added a v31 audit clarification that the null-regime theorem is witness-relative

Verification:

- `pdflatex`
- `biber`
- `pdflatex`
- `pdflatex`

Result:

- Paper 3 compiles to 13 pages.
- Remaining compile issues are non-fatal overfull boxes and duplicate bibliography-key warnings inherited from `release/references.bib`.

### 3.5 Theory Boundary Artifact

Implemented:

- `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
- compiled `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.pdf`

Scope:

- separates internal perturbations from external extension witnesses
- proves only witness-relative null separation
- explicitly denies consciousness, phenomenality, identity transfer, and empirical closure

## 4. Before/After

| Surface | Before | After |
|---|---|---|
| v30 runtime | Failed with missing `./lib/advanced-statistics` | Executes and writes v30 report |
| v30 prompt commands | `negative-control-suite.js` and `validate-promotion-rules.js` absent | Both implemented and passing |
| v27/v26 compatibility | Unknown after v30 edits | `verify:v27` and `verify:v26` pass |
| Paper 3 | live tree had only mislocated Paper 7 PDF | Paper 3 source/PDF/reference file restored from local extract |
| Null-regime claim boundary | wording could still read too globally | v31 clarification makes theorem witness-relative |
| Bridge H1-H4 | nonclaims existed but no runtime gate | v31 blocks unverified material bridge hypotheses |

## 5. Residual Gaps

| Gap | Severity | Status |
|---|---:|---|
| No empirical external dataset | Critical | Open |
| No independent human review or external key infrastructure | Critical | Open |
| Paper 1 compact Hausdorff versus Polish composition still needs a manuscript patch | High | Open |
| Bridge H1 topology, H2 constants, H3 factorization, H4 margin not computed | High | Blocked by v31 |
| Threshold calibration remains internal synthetic machinery | High | Blocked by v31 unless fixture-blind external holdout exists |
| Rival remains too weak for scientific comparison | High | Blocked by v30 and v31 |
| Paper 3 bibliography has duplicate keys in shared release bibliography | Medium | Non-fatal compile warning |

## 6. Verification Commands Executed

```powershell
node --check scripts\lib\advanced-statistics.js
node --check scripts\lib\gls-statistics.js
node --check scripts\negative-control-suite.js
node --check scripts\validate-promotion-rules.js
node --check scripts\external-session-zero-adjudicator-v31.js
node --check scripts\ar1-correction-clinical-summary-v28.js
npm run verify:v30
npm run verify:v31
npm run verify:v27
npm run verify:v26
node scripts\audit-operational-term-promotions-v28.js
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex
```

## 7. Final Operational Verdict

The project is materially harder after this pass because the broken v30 runtime now executes, the synthetic fixture is blocked by explicit statistical and foundation gates, Paper 3 has been restored from local evidence, and the new v31 layer refuses to convert synthetic internal diagnostics into external support. Scientific credibility remains bounded by the absence of empirical data, independent review, and verified bridge hypotheses.
