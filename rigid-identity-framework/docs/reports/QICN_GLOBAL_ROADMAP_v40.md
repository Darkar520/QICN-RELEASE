# QICN v40 Global Roadmap

Status: RETROACTIVE_ROADMAP
Record state: created_post_hoc
Scope: v40 roadmap for the `PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex` hardening sequence

## Governance boundary

This roadmap is a planning and traceability artifact only. It does not declare completion
of earlier phases unless a phase-specific report and verification record exists. It does
not authorize claims of external validation, phenomenality, identity transfer, human
equivalence, or bridge-burden closure.

## Eight-phase map

| Phase | Name | Current v40 status | Completion rule |
|---|---|---|---|
| 0 | Baseline and provenance | RETROACTIVE_PHASE_0 record created post-hoc | Hashes, HEAD, and dirty-tree boundary recorded |
| 1 | Inferior instrument corrections | Completed by `QICN_V40_PHASE1_INFERIOR_INSTRUMENT_REPORT.md` | Inferior-instrument lemmas bounded; non-linear observer overclaim blocked |
| 2 | Bridge hypothesis ledger alignment | Completed by `QICN_V40_PHASE2_BRIDGE_HYPOTHESIS_REPORT.md` | H1-H4 ledger closed as current non-applicability/stalemate, without claim promotion |
| 3 | Statistical rigor non-claims | Completed by `QICN_V40_PHASE3_STATISTICAL_NONCLAIMS_REPORT.md` | Five statistical non-claims present, regressions pass, PDF compiles clean |
| 4 | Semantic inflation audit | Completed by `rigid-identity-framework/docs/SEMANTIC_INFLATION_AUDIT_v40.md` | Script executed; I(T) quantified; glossary and ledger mitigations pass |
| 5 | PDF reproducibility, source-PDF synchronization, editorial PDF repair, and monolithic rebuild | CLOSED_BY `QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md` | Active source/PDF pairs, monolithic canonical compile route, bibliography hygiene, label/anchor hygiene, and residual release/layout debts are formally bounded |
| 6 | Serious rivals and negative controls | READY_TO_START_AFTER_PHASE_5 | Must begin from bounded operational claims; may not treat Phase 5 as external validation |
| 7 | Publication / review readiness packet | BLOCKED_BY_PHASE_6 | Requires Phase 5 PDF reproducibility closure and Phase 6 rival/negative-control execution |

## Current phase position

The active next phase is **Phase 6**. Phases 0-5 have phase-specific closure artifacts or
audit artifacts. Phase 5 is closed for active PDF/LaTeX reproducibility, with tracked
non-blocking debts explicitly carried forward.

Phase 5 work already performed after the original v40 prompt:

- Paper 3 was edited and recompiled from `paper3/main.tex`.
- Paper 4 was edited and recompiled from `paper4/main.tex`.
- Paper 6 was edited and recompiled from `paper6_predictions_falsation/main.tex`.
- `monolithic/QICN_MONOLITHIC.pdf` was regenerated from the current paper sources; the
  final Phase 5 closure artifact is 334 pages after the canonical compile route.
- Monolithic stale Paper 3 markers were checked and absent.
- Paper 4 and Paper 6 update markers were verified inside generated monolithic sections.
- Phase 5A was formalized in
  `rigid-identity-framework/docs/reports/QICN_V40_PHASE5A_AUDIT_AND_INVENTORY_REPORT.md`.
- The current Phase 5 status was reconciled in
  `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_PDF_REPRODUCIBILITY_STATUS.md`.

## Phase 5A closure record

Phase 5A completed the audit/inventory portion of Phase 5 for the current snapshot:

- confirmed that `docs/reports/PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md` exists at
  repository root;
- re-executed `node scripts\audit-public-release-reproducibility.cjs`;
- recorded fresh status `PASS_WITH_TRACKED_GAPS`;
- listed exact `PASS_PDF_ONLY` and `DROP` IDs;
- produced a source-PDF inventory for BaseCore, Papers 1-10, Bridge Paper, and monolithic;
- inventoried duplicate bibliography keys, duplicate labels, duplicate anchors, and layout
  warnings.

Phase 5A did not mutate public manifests, paper content, or frozen release artifacts.

## Phase 5 closure record

Final closure report:

- `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md`

Phase 5 closure state:

- Active papers and BaseCore have source/PDF pairs or explicitly tracked recovery status.
- Papers 5, 7, 8, 9, and 10 were audited and recompiled where required.
- Bibliography duplicate-key warnings were removed from active release bibliography use.
- Monolithic labels, references, citations, and hyperref anchors compile without critical
  duplicate or missing-reference warnings.
- `npm run compile:monolithic` is now the canonical four-step compile route:
  `pdflatex`, `biber`, `pdflatex`, `pdflatex`.
- `MONOLITHIC_BUILD_REPORT.md` records a compiled monolithic build rather than `not_run`.

Tracked non-blocking debts carried forward:

- public release audit remains `PASS_WITH_TRACKED_GAPS` for preserved/frozen release-manifest
  provenance and PDF-only legacy rows;
- Bridge recovery remains preserved generated content until a canonical source path is created;
- monolithic layout debt remains quantified as 8 overfull and 331 underfull boxes;
- `I_int` / atomic-separator burden is formal downstream work, not a Phase 5 PDF blocker;
- registry curation remains a release-hardening/publication-readiness issue.

These carried items are not treated as external validation, theorem closure, or publication
readiness.

## Phase handoff rule

Phase 6 may now start, but it may not use Phase 5 as evidence of external validation,
phenomenality, consciousness, identity transfer, or bridge-burden closure. Phase 7 may not
start until Phase 6 has produced a rival/negative-control ledger and a publication-readiness
audit can honestly distinguish proved, conditional, blocked, tracked-debt, and out-of-scope
claims.
