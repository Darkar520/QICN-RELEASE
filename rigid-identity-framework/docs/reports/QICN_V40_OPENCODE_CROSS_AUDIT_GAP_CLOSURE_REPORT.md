# QICN v40 OpenCode Cross-Audit and Gap Closure Report

Date: 2026-06-04

Status: `PASS_WITH_TRACKED_FORMAL_DEBT`

Scope:

- Cross-check two OpenCode analyses of Phase 5B.
- Verify which prior PDF/monolithic hygiene gaps were actually mitigated.
- Close safe editorial/tooling gaps without inventing scientific closure.
- Focus on BaseCore 06 thinness, `I_int`, and atomic-separator burden.

## Governance and Method

No `.agents`, `.codex`, or physical root `AGENTS.md` file was present in the checkout. The active governance surface for this pass was the user-provided AGENTS instruction block plus local reports, ledger entries, source files, logs, and generated artifacts.

Used skill context:

- `audit-context-building`: used for granular source/log inspection and evidence-first audit structure.
- `advanced-evaluation`: inspected but not used as the primary method because this task is not LLM-as-judge scoring; it is artifact verification and formal-boundary repair.

## OpenCode Claims Checked

| Claim family | Verification result |
|---|---|
| Phase 5B closed hard reproducibility blockers | Confirmed for current artifact state before this closure pass. Bibliography was deduplicated, monolithic labels/refs were clean, and manual compile evidence existed. |
| Bibliography has 52 entries, 52 unique keys, SHA256 `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` | Confirmed. Root and inner release bibliographies are byte-identical. |
| Monolithic had 333 pages and SHA256 `60119DDC1E9938276737FAB20DA4F474C2D685E2CB9752233EB473F14F8AA572` before this pass | Confirmed as pre-change state from local artifact. |
| Active monolithic sections are 12, stale generated sections removed | Confirmed. |
| Monolithic labels are 401 and unique | Confirmed with exact case-sensitive parser. |
| PowerShell duplicate label claim around `mono:basecore:hyp:H3`/`mono:basecore:hyp:h3` | Rejected as a real LaTeX duplicate. It is a case-insensitive grouping artifact; exact label set has 401 unique labels and 0 exact duplicates. |
| Registry has 699 entries and all are `draft_extracted` | Partially rejected. Current registry has 699 entries: 678 `draft_extracted`, 21 `audit_overlaid`. The stronger concern remains: the registry is still mostly non-human-curated. |
| `\codestate` triple definition is confusing | Confirmed and fixed. It is now defined once in the monolithic preamble. |
| Builder dependency on `pred-ext-01-evaluator` only for `ensureDir` is odd coupling | Confirmed and fixed. `ensureDir` is now local to `build-monolithic-volume.js`. |
| BaseCore section 06 is thin | Confirmed and fixed conservatively. Section 06 grew from 40 lines to 86 lines with formal export/extension boundary material. |
| `I_int` and atomic separator remain open burden | Confirmed. This pass did not pretend to prove them; it placed them explicitly as downstream target predicates requiring carrier objects, separator class, invariance target, negative controls, and proof or reproducible adversarial protocol. |
| Bridge source path remains provenance debt | Confirmed. The recovered bridge remains preserved as generated recovery content, not as a normal canonical source path. |

## Changes Applied

1. `rigid-identity-framework/basecore/core/sections/06_structural_classes_and_dynamics.tex`
   - Added `BaseCore export object`.
   - Added `Downstream admissible extension`.
   - Added `No automatic downstream promotion`.
   - Added `Runtime-use admissibility`.
   - Added explicit open-load placement for `I_int` and atomic separators.
   - Added boundary preservation under finite implementations.

2. `rigid-identity-framework/monolithic/preamble/setup.tex`
   - Reduced `\codestate` to one effective definition.

3. `rigid-identity-framework/scripts/build-monolithic-volume.js`
   - Removed unnecessary import from `./lib/pred-ext-01-evaluator`.
   - Added local `ensureDir`.

4. `rigid-identity-framework/monolithic/QICN_MONOLITHIC.tex`
   - Regenerated from current sources.

5. `rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf`
   - Recompiled through `pdflatex/biber/pdflatex/pdflatex`.

## Post-Change Verification

Commands:

- `npm run build:monolithic`
- `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`
- `biber QICN_MONOLITHIC`
- `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`
- `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`
- Node/Powershell parsers for labels, refs, bibliography, log warnings, hashes, and registry curation status.

Final monolithic:

- Pages: 334
- Bytes: 2837340
- SHA256: `CFC27F7958585975366422BFEC994E0F3A49E2BEC0C87484D44A2016DCC634C6`
- Hard errors: 0
- Overfull boxes: 8
- Underfull boxes: 331
- Duplicate labels: 0
- Undefined refs: 0
- Undefined cites: 0
- Duplicate anchors: 0
- Rerun warnings: 0
- Biber warnings: 0

Final active monolithic section audit:

- Active generated sections: 12
- Labels: 401
- Unique exact labels: 401
- Exact duplicate labels: 0
- Refs: 284
- Missing refs: 0

Registry audit:

- Entries: 699
- `draft_extracted`: 678
- `audit_overlaid`: 21

## Mitigated Since Prior Audit

- Stale monolithic duplicate sections: mitigated.
- Bibliography duplicate keys: mitigated.
- Paper 9 missing `conjecture` environment: mitigated in Phase 5B.
- Monolithic duplicate labels/refs/anchors: mitigated in exact LaTeX sense.
- BaseCore 06 thinness: mitigated editorially/formally, not by adding new empirical results.
- Builder odd `ensureDir` dependency: mitigated.
- `\codestate` duplicate macro definitions: mitigated.

## Still Open

- `I_int`/atomic separator is not a closed theorem. It is now explicitly bounded as a downstream target predicate/open burden.
- Registry curation remains mostly draft-extracted; this is not a PDF hygiene failure, but it is a scientific release-hardening issue.
- Bridge provenance remains a tracked source-path debt.
- Layout debt remains: the monolithic still has 8 overfull and 331 underfull boxes.
- External validation remains absent by design and was not treated as the focus of this pass.

## Closure Decision

This pass closes the actionable OpenCode cross-audit gaps that could be fixed without scientific overclaim:

- false duplicate-label claim corrected by exact verification;
- BaseCore 06 formal boundary strengthened;
- `I_int`/atomic separator burden made explicit rather than hidden;
- builder/preamble hygiene cleaned;
- monolithic regenerated and recompiled without critical regressions.

Remaining status is `PASS_WITH_TRACKED_FORMAL_DEBT`, not zero-debt.

## Post-Closure Addendum

Date: 2026-06-04

This cross-audit gap report is superseded for final Phase 5 closure by:

- `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md`

The later closure pass did not change the scientific boundary decision. It repaired the
canonical monolithic compile route and produced a new final PDF through
`npm run compile:monolithic`.

Current final monolithic artifact after the canonical compile route:

- pages: 334;
- bytes: 2837340;
- SHA256: `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785`;
- hard errors: 0;
- duplicate labels: 0;
- undefined references/citations: 0;
- duplicate anchors: 0;
- biber warnings: 0.
