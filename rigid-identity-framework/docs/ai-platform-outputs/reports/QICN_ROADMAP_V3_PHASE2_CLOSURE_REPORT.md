# QICN Roadmap v3 - Phase 2 Closure Report

Date: 2026-06-05

Status: `PHASE2_CLOSED_WITH_TRACKED_PHASE3_DEBT`

## Purpose

Close Phase 2 after synchronizing the monolithic volume with all Phase 2 paper
boundary-normalization work.

Phase 2 scope:

- Claim-boundary consolidation and defensive-style reduction.
- Paper opening normalization across the selected corpus targets.
- Paper 2/BaseCore ownership clarification.
- Monolithic synchronization after Papers 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10 were in their Phase 2 state.

Explicitly out of scope for this closure:

- Full body-level scientific review of Papers 8 and 9.
- Layout repair for dense tables and long machine-readable artifact names.
- Rewriting theorem/proof overlap between Paper 2 and BaseCore.

Those items are tracked as Phase 3/editorial debt rather than mixed into the
Phase 2 closure.

## Push Synchronization

The user explicitly approved:

```text
Apruebo git push origin main para los commits f52c792 y 2047cfc.
```

Command executed:

```text
git push origin main
```

Result:

```text
4ff17f6..2047cfc  main -> main
```

Pushed commits:

| Commit | Message |
|---|---|
| `f52c792` | `docs: normalize paper 1 and 3 openings` |
| `2047cfc` | `docs: normalize paper 8 and 9 boundaries` |

Pre-monolithic-sync git state after push:

```text
## main...origin/main
```

## Monolithic Baseline

Before the Phase 2 closure build:

| File | SHA256 |
|---|---|
| `monolithic/QICN_MONOLITHIC.tex` | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` |
| `monolithic/QICN_MONOLITHIC.pdf` | `39E6E570B1C588972000632FCE576765E3EFA982B0E7777374FEEB3669E97B33` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `1CB3966A6A7EC6750B1DD9D8E67ACD373C5F0012CA1C5BC477FA3BAB866994EA` |

Baseline PDF:

```text
Output written on QICN_MONOLITHIC.pdf (335 pages, 2836467 bytes).
```

## Monolithic Build

Canonical command:

```text
npm run compile:monolithic
```

First attempt:

- Result: failed.
- Cause: operational MiKTeX setup/access failure, not a LaTeX content error.
- Reported failure: `Acceso denegado` while MiKTeX attempted to create
  `C:\Users\irisp\AppData\Roaming\MiKTeX\2.9` inside the restricted sandbox.

Second attempt:

- Same command.
- Executed with elevated permissions because the first failure was an external
  MiKTeX filesystem-access issue.
- Result: compiled.

`docs/reports/MONOLITHIC_BUILD_REPORT.md` records:

| Step | Exit code |
|---|---:|
| `pdflatex` pass 1 | `0` |
| `biber` | `0` |
| `pdflatex` pass 2 | `0` |
| `pdflatex` pass 3 | `0` |

## Source Synchronization Evidence

The monolithic extraction report lists all expected sources as extracted:

| Source | Status |
|---|---|
| `basecore/BASECORE.tex` | extracted |
| `paper1/main.tex` | extracted |
| `paper2/main.tex` | extracted |
| `paper3/main.tex` | extracted |
| `paper4/main.tex` | extracted |
| `paper5_operational_consciousness/main.tex` | extracted |
| `paper6_predictions_falsation/main.tex` | extracted |
| `paper7_operational_life_subjecthood/main.tex` | extracted |
| `paper8_first_person_subjectivity/main.tex` | extracted |
| `paper9_phenomenal_bridge_organization/main.tex` | extracted |
| `paper10_external_adjudication/main.tex` | extracted |
| `paper_bridge_operational_subjecthood/main.tex` | reused_existing_section |

Content spot-checks in `monolithic/build/sections` confirmed the Phase 2
openings and ownership boundaries were present:

- Paper 1: `Scope and admissible reading`.
- Paper 2: `Scope and admissible reading`; `Relation to BaseCore`.
- Paper 3: `Scope and admissible reading`; `Witness-relative clarification`.
- Paper 8: `Scope and admissible reading`.
- Paper 9: `Scope and admissible reading`; `Formal bridge closure boundary`.

## Final Monolithic Artifacts

| File | SHA256 |
|---|---|
| `monolithic/QICN_MONOLITHIC.tex` | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` |
| `monolithic/QICN_MONOLITHIC.pdf` | `7B0AF8954BCC01E5D95C49952D67C81C813A6670DC2E5D16A90504D0390ACCDE` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `8486912AC5A11BAE5B48FFC38320706B02233D2F86BB01133D3C367A64A88986` |

Final PDF:

```text
Output written on QICN_MONOLITHIC.pdf (335 pages, 2836592 bytes).
```

Observed change:

- Page count: `335 -> 335`.
- PDF byte size: `2836467 -> 2836592`.
- `QICN_MONOLITHIC.tex` hash unchanged because the root monolithic driver file
  remained structurally identical; the generated section content and compiled
  PDF reflect the current paper sources.

## Verification Gates

| Gate | Result |
|---|---:|
| `! LaTeX Error` | `0` |
| `Undefined control sequence` | `0` |
| Undefined references | `0` |
| Undefined citations | `0` |
| Biber rerun warnings | `0` |
| Cross-reference rerun warnings | `0` |
| Duplicate hyperref destination warnings | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` |
| Source labels | `401` |
| Exact unique source labels | `401` |
| Exact duplicate source labels | `0` |
| Source refs | `286` |
| Missing source refs | `0` |
| Aux newlabels | `401` |
| Exact unique aux newlabels | `401` |
| Exact duplicate aux newlabels | `0` |
| Overfull hbox warnings | `7` |
| Underfull hbox warnings | `331` |

Label note:

- A case-insensitive grouping pass misleadingly grouped
  `mono:basecore:hyp:H3` and `mono:basecore:hyp:h3`.
- The valid case-sensitive ordinal check returned `0` exact duplicates.

## Files Modified by Closure

- `monolithic/QICN_MONOLITHIC.pdf`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_CLOSURE_REPORT.md`
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

## Residual Debt Carried Forward

Phase 3/editorial debt:

- Paper 8 layout: `13` overfull, `91` underfull warnings.
- Paper 9 layout: `38` overfull, `221` underfull warnings.
- Paper 10 layout: previously tracked as `57` overfull warnings.
- Monolithic layout: `7` overfull, `331` underfull warnings.
- Paper 8 and Paper 9 body-level scientific review remains pending.

Accepted Phase 2 residual:

- Paper 2/BaseCore residual exact overlap remains by design where theorem/proof
  material is intentionally preserved under ownership separation.

## Closure Decision

Phase 2 can be closed because:

- the pending Paper 1/3/8/9 commits were pushed;
- the monolithic PDF was regenerated from current Phase 2 sources;
- hard LaTeX/Biber/ref/cite/label/anchor gates passed;
- the remaining issues are either accepted ownership overlap or explicitly
  deferred Phase 3/editorial debt.

Status: `PHASE2_CLOSED_WITH_TRACKED_PHASE3_DEBT`.
