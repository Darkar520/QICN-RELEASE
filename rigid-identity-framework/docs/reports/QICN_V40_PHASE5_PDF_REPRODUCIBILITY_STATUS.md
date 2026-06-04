# QICN v40 Phase 5 PDF Reproducibility Status

Status: PHASE_5_CLOSED_WITH_TRACKED_NONBLOCKING_DEBT
Date: 2026-06-04

## Boundary

This status file records the current Phase 5 closure state. It does not certify theorem
truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral
status, rival-model adequacy, peer review, external validation, or publication readiness.

Phase 5 is closed only for active PDF/LaTeX reproducibility, source-PDF synchronization,
monolithic rebuild hygiene, and documented residual-risk routing.

## Closure Artifacts

| Artifact | Role |
|---|---|
| `QICN_V40_PHASE5A_AUDIT_AND_INVENTORY_REPORT.md` | Audit/inventory baseline |
| `QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` | PDF hygiene, paper recompilation, bibliography, labels, anchors, layout audit |
| `QICN_V40_OPENCODE_CROSS_AUDIT_GAP_CLOSURE_REPORT.md` | Cross-audit gap closure and BaseCore 06 formal-boundary repair |
| `QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md` | Final closure decision and handoff to Phase 6 |
| `MONOLITHIC_BUILD_REPORT.md` | Generated monolithic build report from the canonical compile route |

## Phase 5 Work Completed

| Unit | Current status |
|---|---|
| AI-output routing and implementation ledger | Done |
| Paper source preservation instructions | Done |
| Phase 5A source/PDF inventory | Done |
| Papers 3, 4, and 6 expansion/recompilation from active sources | Done |
| Papers 5, 7, 8, 9, and 10 recompilation/audit | Done |
| Paper 9 missing `conjecture` environment | Fixed |
| Bibliography duplicate-key hygiene | Done for active root and inner release bibliographies |
| Monolithic stale generated sections | Fixed |
| Monolithic label/ref namespacing | Done |
| Monolithic duplicate labels/anchors | 0 exact duplicate labels; 0 duplicate anchors |
| Monolithic canonical compile route | Done through `npm run compile:monolithic` |
| BaseCore 06 downstream boundary for `I_int` / atomic separator | Strengthened without promoting claims |
| Public release reproducibility audit | Re-executed; classified as tracked release/publication debt |

## Canonical Monolithic Compile Route

The canonical command is now:

```powershell
npm run compile:monolithic
```

The command runs:

1. `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex`
2. `biber QICN_MONOLITHIC`
3. `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex`
4. `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex`

`monolithic/compile.ps1` records the same four-step sequence.

## Final Monolithic Verification

| Metric | Value |
|---|---:|
| Pages | 334 |
| Bytes | 2837340 |
| SHA256 | `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785` |
| Hard LaTeX errors | 0 |
| Overfull boxes | 8 |
| Underfull boxes | 331 |
| Duplicate labels | 0 |
| Undefined references | 0 |
| Undefined citations | 0 |
| Duplicate anchors | 0 |
| Missing destinations | 0 |
| Rerun warnings | 0 |
| Biber warnings | 0 |
| Duplicate bibliography warnings | 0 |

Generated-section audit:

| Metric | Value |
|---|---:|
| Active generated sections | 12 |
| Labels | 401 |
| Unique exact labels | 401 |
| Exact duplicate labels | 0 |
| References | 284 |
| Missing references | 0 |

## Public Release Audit Decision

Fresh command:

```powershell
node scripts\audit-public-release-reproducibility.cjs
```

Fresh result:

- status: `PASS_WITH_TRACKED_GAPS`;
- checked_at: `2026-06-04T21:10:39.474Z`;
- `SOURCE_OK`: 19;
- `PASS_PDF_ONLY`: 2 source rows;
- `PRESERVED_VARIANT`: 12;
- `UNKNOWN`: 2;
- PDF manifest counts: `PASS` 22, `PASS_PDF_ONLY` 4, `DROP` 5, `SKIP_DUPLICATE_CANONICAL` 2.

Decision:

- The public release audit is not converted into a clean publication-readiness certificate.
- The remaining `PASS_WITH_TRACKED_GAPS` items are tracked release/provenance/publication-readiness debt, not active PDF/LaTeX reproducibility blockers.
- Frozen/public manifests were not hand-edited in this Phase 5 closure pass.
- Paper 4 active source/PDF exists and compiles in the active framework line; its public-release manifest classification remains a release-manifest reconciliation item.

## Tracked Non-Blocking Debt

These items remain visible but do not block Phase 6:

- Monolithic layout debt: 8 overfull and 331 underfull boxes.
- Paper-level layout debt remains documented for dense tables and long tokens.
- Bridge recovery content is preserved, but a canonical source path should be created before publication readiness.
- The public release audit remains `PASS_WITH_TRACKED_GAPS`.
- The theorem registry remains mostly draft-extracted and needs later curation.
- `I_int` / atomic-separator closure remains downstream formal work, not a Phase 5 PDF task.

## Closure Decision

Phase 5 is closed as `PHASE_5_CLOSED_WITH_TRACKED_NONBLOCKING_DEBT`.

Phase 6 may start from this state, but only as rival/comparator/negative-control work over
bounded operational claims. It must not treat this PDF reproducibility closure as evidence
of external validation, phenomenality, consciousness, identity transfer, or bridge-burden
closure.
