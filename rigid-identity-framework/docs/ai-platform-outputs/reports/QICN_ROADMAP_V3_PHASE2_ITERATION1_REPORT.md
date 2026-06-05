# QICN Roadmap v3 - Phase 2 Iteration 1 Report

Status: PHASE2_ITERATION1_COMPLETE_WITH_TRACKED_LAYOUT_DEBT
Date: 2026-06-05
Agent/platform: Codex

## Objective

Apply the first conservative Phase 2 edits from the Phase 1 audit:

1. Consolidate the Paper 4 opening triplet.
2. Consolidate the Paper 5 opening triplet.
3. Tighten Paper 1 model-relative "forced"/ontological language without touching theorem names, macros, labels, or formal statements.

This iteration obeyed the user constraint of editing no more than three `.tex` files.

## Scope

Files edited:

- `paper4/main.tex`
- `paper5_operational_consciousness/main.tex`
- `paper1/main.tex`

PDFs regenerated:

- `paper4/main.pdf`
- `paper5_operational_consciousness/main.pdf`
- `paper1/main.pdf`

Files intentionally not edited:

- `paper2/main.tex`
- `basecore/core/sections/04_regime_constraints_absorbed.tex`
- Papers 6, 7, 8, 9, and 10
- Any macro, label, theorem environment, registry, bibliography, script, or monolithic source

## Implementation Summary

| File | Change | Rationale |
|---|---|---|
| `paper4/main.tex` | Replaced three adjacent opening boundary paragraphs with one `Scope and admissible reading` paragraph | Preserves all non-claims while reducing defensive repetition |
| `paper5_operational_consciousness/main.tex` | Replaced three adjacent opening boundary paragraphs with one `Scope and admissible reading` paragraph | Preserves limits around human phenomenology, equivalence, moral parity, empirical instantiation, and runtime-facing support |
| `paper1/main.tex` | Replaced three broad "forced"/ontological phrases with model-relative necessity language | Reduces ontology/model slippage while preserving the mathematical claim under stated hypotheses |
| `paper1/main.tex` | Replaced `certify CCR behavior` with estimator-model support language | Prevents finite empirical divergence from sounding like external or final certification |
| `paper1/main.tex` | Replaced a remaining absolute "No ontological degrees of freedom remain" sentence with model-bounded degrees-of-freedom language | Removes an absolute ontological overclaim in prose, without touching theorem content |

## Non-Regression Constraints Checked

| Constraint | Result |
|---|---|
| No more than three `.tex` files edited | PASS: exactly three |
| No macro renames | PASS |
| No label renames | PASS |
| No theorem environment changes | PASS |
| No non-claims deleted without replacement | PASS: boundaries were consolidated, not removed |
| Recompile after touching `.tex` | PASS |
| Paper 2/BaseCore duplication deferred | PASS |
| Papers 7, 8, 9 deferred | PASS |

## Verification Commands

| Command | Purpose | Result |
|---|---|---|
| `git status -sb` | Verify preflight state | Clean before Phase 2 edits; branch ahead of origin |
| `Get-Content` targeted line reads | Inspect Phase 1 targets in Papers 1, 4, and 5 | Completed |
| `rg -n` targeted scans | Locate dangerous phrases and confirm replacements | Completed |
| `apply_patch` | Edit only three `.tex` files | Completed |
| `pdflatex -interaction=nonstopmode main.tex` | Recompile each touched paper | Exit code 0 after final sequential runs |
| `biber main` | Refresh bibliography for each touched paper | Exit code 0; no Biber warnings/errors |
| `Select-String main.log` | Search hard errors, undefined refs/cites, rerun warnings | No matches after final runs |
| `Select-String main.blg` | Search Biber WARN/ERROR/FATAL | No matches |
| `Get-FileHash -Algorithm SHA256` | Hash changed sources and PDFs | Completed |

## Recompilation Results

| Paper | Final PDF pages | Final PDF bytes | Compile status |
|---|---:|---:|---|
| Paper 1 | 26 | 465106 | PASS |
| Paper 4 | 16 | 374111 | PASS |
| Paper 5 | 28 | 507725 | PASS |

Final log scan:

- 0 hard LaTeX errors.
- 0 undefined references/citations after final sequential runs.
- 0 Biber warnings/errors.
- Residual layout warnings remain inherited in Paper 4 and Paper 5, mainly overfull/underfull boxes and float placement warnings. They were not introduced as a dedicated layout phase here and remain tracked editorial debt.
- Paper 1 retains existing hyperref PDF-string warnings around math in section/bookmark text. These are non-blocking and pre-existing in kind.

## Hashes

| File | SHA256 |
|---|---|
| `paper1/main.tex` | `C9074ED9F3915405BA9672631D42C7887AC4078D0FB3130D0E147F821502E193` |
| `paper1/main.pdf` | `9ADC181096DAB65F1C7395C89DE940A230B0CE85A12932B645E36A6E4CE9D0ED` |
| `paper4/main.tex` | `B36287FD5788932E0CB3A5AE5C9CD3273BCB32E5910079382C07DF06F59BD943` |
| `paper4/main.pdf` | `C91A6C08EB381DEAACBE67533422CD1208B9A1C7948A766A869EF6B920BC42C5` |
| `paper5_operational_consciousness/main.tex` | `E9E45A4149E0F03761065804B5B8FA4D91C528AA64EE6486E8BAAE3A44627A22` |
| `paper5_operational_consciousness/main.pdf` | `927C24CDB5821FD91391EAB4D1959B7E86E8FEDDE94B534B9A2824FFA2B07343` |

## Incident Note

During Paper 1 recompilation, two `pdflatex` commands were mistakenly launched in parallel against the same directory. This temporarily appended a stray `6}` line to `paper1/main.aux` and caused one non-final compile attempt to report an auxiliary-file error. The auxiliary artifact was repaired, and Paper 1 was then recompiled sequentially with `pdflatex`, `biber`, `pdflatex`, and `pdflatex`. Final verification shows no hard errors, no undefined references/citations, and no rerun warnings.

No final `main.aux` change remains in `git status`.

## Residual Risks And Deferred Work

- Paper 2/BaseCore exact duplication remains deferred to a dedicated ownership subphase.
- Papers 7, 8, and 9 remain deferred because runtime/subjectivity/phenomenal bridge language is more complex and higher risk.
- Paper 1 still contains theorem/proof-local uses of `forced` where the Phase 1 audit did not authorize broad theorem-level rewriting.
- Paper 4 and Paper 5 retain inherited layout debt; this iteration was a claim-boundary prose pass, not a layout-polish phase.
- The local branch remains ahead of `origin/main`; remote push requires explicit approval for `git push origin main`.

## Post-Iteration Review Addendum

Date: 2026-06-05

This addendum records a post-iteration review of style consistency and synchronization debt. It does not change the Phase 2 Iteration 1 implementation result.

### A. Structural Consistency Debt

Papers 4 and 5 now use a consolidated `Scope and admissible reading` paragraph instead of the earlier four-part opening pattern:

- `What this paper does.`
- `What this paper does not do.`
- `What the related system implements and does not implement.`
- `What should not be inferred.`

This improves readability and reduces defensive repetition, but it creates a style-consistency debt because Papers 6, 7, 8, and 9 still retain the four-part pattern. This is not a scientific regression, but it should be handled deliberately in later Phase 2 sub-iterations.

Recommended decision for later Phase 2 work:

- Either apply the same consolidation style to Papers 6, 7, 8, and 9 as each paper is edited; or
- Keep Papers 4 and 5 as intentional methodological/criterion-paper exceptions if the more interpretive papers need the four-part pattern for reader safety.

No immediate `.tex` change is required by this addendum.

### B. Monolithic Synchronization Debt

Paper 1 was edited and recompiled, but the monolithic volume was not rebuilt in Iteration 1. This was correct for the iteration scope, because `monolithic` was explicitly excluded. However, if the monolithic volume assembles Paper 1 source content, the monolithic PDF is now a synchronization target.

Required later action:

- Rebuild the monolithic volume in a dedicated synchronization iteration after the relevant Phase 2 paper edits are stable.
- Verify that Paper 1, Paper 4, and Paper 5 prose changes propagate into the monolithic PDF.
- Record monolithic page count, compile status, warnings, and SHA256 after rebuild.

### C. Paper 1 Appendix Title / Theorem-Local Language

Iteration 1 intentionally avoided theorem/proof-local rewrites and did not rename the appendix title `Ontological No--Alternative Theorems`. The report already notes that some local uses of `forced` remain where mathematical or theorem-local context may justify them.

Reviewer-facing risk:

- A reviewer may still object to the appendix title or theorem-local "forced" language if it appears ontological rather than model-relative.

Recommended later action:

- Revisit the Paper 1 appendix title and proof-local `forced` wording only in a dedicated sub-iteration, and only if the roadmap explicitly authorizes title/theorem-prose neutralization.
- Do not rename labels, theorem environments, macros, or references as part of that review.

### D. Updated Phase 2 Iteration 2 Recommendation

Recommended next iteration order:

1. Paper 6 opening boundary consolidation, because it is structurally closest to Papers 4 and 5.
2. Paper 1 appendix/title and theorem-local `forced` review, only if authorized as prose/title neutralization without label or theorem-environment changes.
3. Paper 2/BaseCore duplication ownership subphase, because it requires a dedicated canonical-source decision.

## Phase 2 Iteration 1 Closure

This iteration is closed because it implemented the three lowest-risk Phase 2 targets, preserved all claim boundaries in condensed form, avoided macro/label/theorem changes, recompiled every touched paper, and left a bounded list of deferred higher-risk work.
