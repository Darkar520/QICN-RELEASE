# QICN Roadmap v3 - Phase 2 Iteration 4B Paper 2 Normalization Report

Date: 2026-06-05

Status: `PASS_WITH_TRACKED_FORMAL_OVERLAP_DEBT`

## Purpose

Execute the safe next unit identified by Phase 2 Iteration 4:

- edit only `paper2/main.tex` plus trace documentation;
- preserve all labels, macros, theorem environments, axioms, propositions, and theorem statements;
- keep Paper 2 as a standalone paper rather than converting it into a pointer to BaseCore;
- add a compact Paper 2/BaseCore provenance paragraph;
- neutralize broad rhetorical `forced` / `inevitability` language outside theorem names and theorem-local references;
- recompile Paper 2 and verify no LaTeX/Biber regression.

## Scope

Included:

- `paper2/main.tex`
- `paper2/main.pdf`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION4B_PAPER2_NORMALIZATION_REPORT.md`
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Excluded:

- BaseCore `.tex` and PDF files
- Monolithic source/PDF
- Papers 1, 3--10
- Macros, labels, bibliography, registry, scripts, and release files

## Preflight

`git status --short --branch`:

```text
## main...origin/main
```

No uncommitted files were present before the iteration.

## Baseline Measurements

| Measurement | Baseline |
|---|---:|
| Paper 2 `.tex` SHA256 | `26304FEA9BFBF54EA90BF56C5E386E853DD8A530A0724B23AAB1EFCC51A81871` |
| Paper 2 PDF SHA256 | `8C697985B3F5131C322F58E9243C43BD50B2BB7C9A5ABFAC1E6718D4595A52F3` |
| Exact Paper 2/BaseCore duplicate groups over 120 normalized characters | `83` |
| Paper 2 label count | `34` |

## Changes Applied

| Area | Change | Reason |
|---|---|---|
| Opening boundary | Consolidated four defensive scope paragraphs into one `Scope and admissible reading` paragraph | Preserve claim boundaries while reducing defensive repetition and aligning with the newer Phase 2 style used in Papers 4--7. |
| Paper 2/BaseCore provenance | Added `Relation to BaseCore` subsection | Make ownership explicit: Paper 2 is standalone exposition; BaseCore is the dependency-facing theorem-export surface. |
| Axiom-introduction prose | Replaced broad `forced` / `not design choices` wording with structural-necessity language | Keep the mathematical burden conditional and model-relative. |
| Section titles | Changed `Inevitability of...` headings to `Structural Necessity of...` | Reduce rhetorically absolute wording without touching labels or theorem names. |
| Formal setup closure | Replaced `forced consequence` phrasing with compatibility-requirement phrasing | Avoid overclaiming while preserving the logical role of the setup. |
| Metric-structure transition | Reframed the paragraph as minimal metric assumptions for classification | Reduce exact duplication and improve mathematical clarity. |
| Continuity/fragmentation remarks | Reworded remarks around derived continuity and perturbation sensitivity | Reduce exact overlap with BaseCore while preserving non-claim boundaries. |
| Fragmentation proof prose | Rephrased trajectory-level comparison paragraphs | Avoid implying more than the stated `\Phi`-regularity hypothesis proves. |
| Conclusion section | Changed `What This Work Forces` to `Entailment Under Stated Assumptions` | Replace absolute language with conditional entailment language. |
| Extended proof Step 4 | Rephrased the comparison of deformed projections | Reduce overbroad causal phrasing. |

## Verification Commands

| Command | Purpose | Result |
|---|---|---|
| `git status --short --branch` | Preflight cleanliness | Clean, synchronized with `origin/main`. |
| `Get-FileHash ... paper2/main.tex paper2/main.pdf` | Baseline hashes | Completed. |
| `rg -n "forced|Forced|inevitable|..." paper2/main.tex` | Audit risky wording | Identified theorem-name and rhetorical uses. |
| PowerShell exact paragraph normalizer | Baseline and final duplicate count against BaseCore 04 | `83 -> 72`. |
| Label comparison against `HEAD` | Confirm labels unchanged | `34 -> 34`, no differences. |
| `git diff --check -- paper2/main.tex` | Whitespace/diff sanity | No diff-check errors; Git reported LF-to-CRLF warning only. |
| `pdflatex -interaction=nonstopmode main.tex` | First Paper 2 compile | Exit code 0; rerun expected. |
| `biber main` | Bibliography rebuild | Exit code 0; no warnings/errors/fatals. |
| `pdflatex -interaction=nonstopmode main.tex` | Second Paper 2 compile | Exit code 0. |
| `pdflatex -interaction=nonstopmode main.tex` | Final Paper 2 compile | Exit code 0; no rerun warnings. |
| `Select-String main.log/main.blg` | Hard warning scan | 0 hard errors, 0 undefined refs/cites, 0 rerun warnings, 0 biber warnings. |

## Final Measurements

| Measurement | Final |
|---|---:|
| Paper 2 `.tex` SHA256 | `BB795D5D72AEC88FCA7F388F3C78C9EBED54C38F37FB2581D5EC45DCE120C363` |
| Paper 2 PDF SHA256 | `449384E4E2EEFBA1F481880D07B42FC3C5AB6BD6F6EC10FBB86C541BCB5CAF30` |
| Paper 2 PDF pages | `17` |
| Paper 2 PDF bytes | `381899` |
| Exact Paper 2/BaseCore duplicate groups over 120 normalized characters | `72` |
| Paper 2 label count | `34` |
| Hard LaTeX errors | `0` |
| Undefined references/citations | `0` |
| Rerun warnings | `0` |
| Biber warnings/errors/fatals | `0` |
| Overfull warnings | `1` |
| Underfull warnings | `0` |

## What Was Deliberately Not Changed

- No theorem, axiom, proposition, hypothesis, label, macro, bibliography, or theorem environment was renamed.
- No BaseCore source was edited.
- No theorem/proof material was deleted from either Paper 2 or BaseCore.
- No monolithic rebuild was performed in this iteration.

## Residual Debt

| Debt | Status | Reason |
|---|---|---|
| Paper 2/BaseCore exact overlap | Reduced but open: `83 -> 72` | Remaining overlap is mostly theorem/proof-level formal material. Rewriting it would require a higher-risk theorem-prose normalization phase. |
| Paper 2 layout | Minor open debt: 1 overfull warning | The warning is 1.0272pt wide around lines 739--740; non-blocking for this iteration. |
| Monolithic synchronization | Open | Paper 2 changed, so the monolithic PDF should be rebuilt in a later sync iteration after Paper 2 normalization is accepted. |
| Papers 8 and 9 | Open | Still require dedicated high-risk Phase 2 passes. |
| Paper 1 opening style | Open lower-priority consistency debt | Still less urgent than Papers 8/9 and monolithic sync. |

## Closure

Phase 2 Iteration 4B is closed because it:

- edited only the authorized Paper 2 source;
- preserved all formal identifiers and theorem inventory;
- added explicit Paper 2/BaseCore provenance;
- reduced exact Paper 2/BaseCore duplicate groups from `83` to `72`;
- compiled Paper 2 successfully to a synchronized PDF;
- left remaining theorem/proof overlap as tracked formal debt rather than hiding it through unsafe rewriting.

Status: `PASS_WITH_TRACKED_FORMAL_OVERLAP_DEBT`.
