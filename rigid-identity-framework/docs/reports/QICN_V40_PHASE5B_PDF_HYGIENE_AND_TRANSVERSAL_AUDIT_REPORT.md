# QICN v40 Phase 5B PDF Hygiene and Transversal Audit Report

Status: PASS_WITH_TRACKED_LAYOUT_DEBT
Date: 2026-06-04
Workspace: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK`

## Boundary

This report records the Phase 5B repair and verification pass for PDF reproducibility, bibliography hygiene, label/anchor hygiene, selected paper recompilation, monolithic recompilation, and transversal claim-surface review.

It does not certify theorem truth, external empirical validation, consciousness, phenomenality, agency, identity transfer, moral status, or biological equivalence. Runtime/internal artifacts remain implementation evidence only when explicitly marked as such.

## Requested Protocol

The user requested Phase B execution in order and with every major action checked twice. The operational interpretation used here was:

1. Run before/after audits.
2. Repair only concrete reproducibility or hygiene gaps.
3. Recompile affected papers and monolithic artifacts.
4. Verify critical gates twice when possible.
5. Record commands, tools, files, hashes, regressions, and residual risks.

## Files Modified

| File | Change |
|---|---|
| `release/references.bib` | Synchronized to the deduplicated canonical release bibliography. |
| `rigid-identity-framework/release/references.bib` | Deduplicated canonical release bibliography retained as the source used for synchronization. |
| `rigid-identity-framework/scripts/build-monolithic-volume.js` | Added monolithic label/ref namespacing, layout transforms, safe generated-section cleanup, and reusable Bridge section preservation. |
| `rigid-identity-framework/monolithic/preamble/setup.tex` | Added monolithic layout support for ToC widths, URL breaks, and `\codepath`. |
| `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex` | Added the missing theorem environment `conjecture`, required by two existing conjecture blocks. |
| `rigid-identity-framework/paper5_operational_consciousness/main.pdf` | Recompiled from existing `main.tex`. |
| `rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf` | Recompiled from existing `main.tex`. |
| `rigid-identity-framework/paper8_first_person_subjectivity/main.pdf` | Recompiled from existing `main.tex`. |
| `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.pdf` | Recompiled after the one-line preamble repair. |
| `rigid-identity-framework/paper10_external_adjudication/main.pdf` | Recompiled from existing `main.tex`. |
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC.tex` | Regenerated from current source papers. |
| `rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf` | Recompiled as the current monolithic candidate. |
| `rigid-identity-framework/docs/reports/QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` | Created this formal Phase 5B report. |
| `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | Appended the Phase 5B trace entry. |

## Bibliography Hygiene

Before repair, the active root bibliography used by several papers through `../../release/references.bib` contained duplicate keys.

| Path | Before | After |
|---|---:|---:|
| `release/references.bib` | 106 entries, 52 unique keys, 29 duplicated keys | 52 entries, 52 unique keys, 0 duplicated keys |
| `rigid-identity-framework/release/references.bib` | deduplicated during this Phase 5B pass | 52 entries, 52 unique keys, 0 duplicated keys |

Final verification:

| Check | Result |
|---|---|
| Root bibliography SHA256 | `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` |
| Inner bibliography SHA256 | `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` |
| Byte comparison | `fc.exe /b` reported no differences |
| Monolithic biber warnings | 0 |
| Duplicate entry key warnings | 0 |

## Paper Recompilation Audit

| Paper | Pages | TEX SHA256 | PDF SHA256 | PDF bytes | Hard errors | Overfull | Underfull | Duplicated labels | Undefined refs/cites | Biber warnings |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| Paper 5 | 28 | `C157E62D397C7D8765863490545A30F8B1C3918565D3685930BD00EBCA491E0D` | `079F7AAEAEC53763BAA73400F266B62820AFE5B50ECAF24A6C469112C53BB9A5` | 508053 | 0 | 4 | 10 | 0 | 0 | 0 |
| Paper 7 | 28 | `E6641786A1BEE4023B471EE2BA524E38CD15E218788884044D3114A57E224198` | `29543CDDF3431B5032B2E4C583F5F019B16D668C1F7FBC2D9EDD85EEC29BC36A` | 401196 | 0 | 3 | 29 | 0 | 0 | 0 |
| Paper 8 | 43 | `B6F40959B4D828D02DA7BA9B960546CF1BEA5538F34A93C2D71F8C4AF2C7AAF9` | `5E761031D3E6A5DA9C0662DAE0D90659B5FF00EBDD1AF578ECCB99C83603F7A0` | 545993 | 0 | 13 | 91 | 0 | 0 | 0 |
| Paper 9 | 42 | `AB53A73FB2E758B960FBC29829B10FFE351F4E947440A511E64FEC0557F7DACB` | `266BE4037511F2AFC803F1B825BFA0182750C2BBD456B8CF7A2F29910E32F819` | 522533 | 0 | 38 | 221 | 0 | 0 | 0 |
| Paper 10 | 33 | `E57C031020D5362537EE196724675EF64EF9AA85DCAF7EA1F7955860BC74D7C4` | `C561FDEF26F932496989E3ADF36DC199D00745805470007EA58B84AC0692FDFD` | 455777 | 0 | 57 | 0 | 0 | 0 | NA |

Interpretation:

- Papers 5, 7, 8, 9, and 10 now have source/PDF pairs that compile without hard errors.
- Paper 9 had a real LaTeX source gap: `conjecture` was used but not defined. The repair only declared the theorem environment and did not alter theorem content.
- Layout warnings remain especially high in Papers 8, 9, and 10. They are editorial debt, not compilation blockers.

## Monolithic Generator Repair

The monolithic builder had two classes of reproducibility risk:

1. Active generated sections needed label/ref namespacing to avoid cross-paper anchor collisions.
2. Old generated `.tex` sections remained in `monolithic/build/sections`, producing false-positive duplicate-label audits and structural noise.

Implemented repairs:

- Added source-specific label prefixes:
  - BaseCore: `mono:basecore:`
  - Papers: `mono:p01:` through `mono:p10:`
  - Bridge recovery section: `mono:bridge:`
- Rewrote local refs/eqrefs/pagerefs/autorefs/namerefs/crefs/Crefs/hyperrefs only when the referenced label belongs to the same source body.
- Added monolithic-only hyper anchor prefixes through `\theH...` overrides.
- Added generated-section cleanup restricted to `monolithic/build/sections/*.tex`.
- Preserved the recovered Bridge section before cleanup because its declared source path is still absent.
- Added layout transforms for dense tables, long inline code paths, long display math, and known long aligned chains.

Double verification:

| Audit | Result |
|---|---|
| First active-section static audit | 12 sections, 401 labels, 401 unique labels, 0 duplicated labels, 284 refs, 0 missing refs |
| Second active-section static audit | 12 sections, 401 labels, 401 unique labels, 0 duplicated labels, 284 refs, 0 missing refs |
| Nested `\codepath{\codepath...}` search | 0 matches |
| Stale `\chapter{Bridge Paper}` search in generated sections | 0 active matches |

## Monolithic Compilation

Physical sequence executed:

1. `npm run build:monolithic`
2. `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`
3. `biber QICN_MONOLITHIC`
4. `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`
5. `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex`

Final monolithic result:

| Metric | Value |
|---|---:|
| PDF pages | 333 |
| PDF bytes | 2830688 |
| PDF SHA256 | `60119DDC1E9938276737FAB20DA4F474C2D685E2CB9752233EB473F14F8AA572` |
| Hard LaTeX errors | 0 |
| Overfull boxes | 8 |
| Underfull boxes | 331 |
| Duplicated labels | 0 |
| Undefined references | 0 |
| Undefined citations | 0 |
| Duplicated anchors | 0 |
| Missing destinations | 0 |
| Rerun warnings | 0 |
| Biber warnings | 0 |
| Duplicate bibliography warnings | 0 |

The command `npm run compile:monolithic` was attempted only to update the repo-generated `MONOLITHIC_BUILD_REPORT.md` compile status, but the environment rejected the escalation because of usage limits. The formal evidence for this phase is therefore the manual physical sequence above plus this report, not the generated `MONOLITHIC_BUILD_REPORT.md` status line.

## Transversal Scientific Review

Scope reviewed:

- `paper5_operational_consciousness/main.tex`
- `paper7_operational_life_subjecthood/main.tex`
- `paper8_first_person_subjectivity/main.tex`
- `paper9_phenomenal_bridge_organization/main.tex`
- `paper10_external_adjudication/main.tex`

Searches covered:

- explicit circularity language;
- self-validation/judge language;
- strong consciousness/subjectivity/phenomenality claims;
- external validation and equivalence claims;
- boundary and non-claim language.

Findings:

- No explicit paper text of the form "this paper is not circular" was found in Papers 5, 7, 8, 9, or 10.
- No direct unbounded claim requiring immediate content deletion was found in this pass.
- The audited papers repeatedly bind claims as operational, conditional, internal, structural, or externally unvalidated.
- Paper 10 remains the correct location for external adjudication language; Papers 5, 7, 8, and 9 preserve narrower operational/formal boundaries.

Scientific residual risks:

- Internal runtime support must not be treated as external validation.
- Operational consciousness, operational subjecthood, and phenomenal bridge predicates remain formal/operational constructs unless later external protocols adjudicate them.
- Phase 6 must introduce rival/comparator pressure without retroactively inflating Phase 5 outputs.
- Layout warnings in dense tables may still reduce editorial polish even when scientific claim boundaries are correct.

## Commands and Tools

| Tool or command | Purpose | Result |
|---|---|---|
| `rg` | Search circularity, claim-surface, duplicate keys, labels, and critical LaTeX warnings | Completed; critical post-build warnings absent |
| `Get-FileHash` | Compute SHA256 for bibliographies, paper PDFs/TEX, and monolithic PDF | Completed |
| `fc.exe /b` | Byte-compare root and inner bibliography files | No differences |
| `Copy-Item` | Synchronize deduplicated bibliography to the root release bibliography | Completed |
| `pdflatex -interaction=nonstopmode main.tex` | Recompile Papers 5, 7, 8, 9, and 10 | Exit 0 after repairs |
| `biber main` | Rebuild bibliography for Papers 5, 7, 8, and 9 | Exit 0, 0 warnings |
| `npm run build:monolithic` | Regenerate monolithic source and generated sections | Exit 0 |
| `pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex` | Compile monolithic PDF | Exit 0 across three physical passes |
| `biber QICN_MONOLITHIC` | Compile monolithic bibliography | Exit 0, 0 warnings |
| `apply_patch` | Edit source files and create this report/ledger entry | Completed |

## Regressions Found and Resolved

| Regression or gap | Resolution |
|---|---|
| Root bibliography path still contained duplicate keys after the inner bibliography was deduplicated. | Synchronized root `release/references.bib` to the inner deduplicated bibliography and verified byte identity. |
| Paper 9 used `conjecture` without defining the environment. | Added `\newtheorem{conjecture}[theorem]{Conjecture}`. |
| Monolithic generated-section directory contained stale old section files. | Added safe cleanup of generated `.tex` sections before writing the active section set. |
| Bridge source path is absent, but generated recovered Bridge content exists. | Builder now snapshots and preserves the reusable Bridge section before cleanup. |
| Early static label audit accidentally included stale generated files. | Re-ran audit after cleanup over the active generated section set. |
| A broad layout transform previously risked nested `\codepath`. | Verified post-build search has 0 nested `\codepath{\codepath...}` matches. |
| `npm run compile:monolithic` escalation rejected by environment usage limits. | Did not force it; used the already successful physical `pdflatex/biber/pdflatex/pdflatex` sequence as formal evidence. |

## Residual Debt

This phase closes hard reproducibility blockers but does not claim perfect typographic cleanliness.

Residual layout debt:

- Monolithic: 8 overfull boxes and 331 underfull boxes.
- Paper 8: 13 overfull and 91 underfull boxes.
- Paper 9: 38 overfull and 221 underfull boxes.
- Paper 10: 57 overfull boxes.

Residual source debt:

- The recovered Bridge section still needs a canonical source path if it is to become a normal paper source rather than a preserved generated recovery section.

Residual scientific debt:

- Rival/comparator adjudication remains pending and belongs to Phase 6.
- External validation remains absent unless and until separately reproduced protocols provide it.

## Phase 5B Closure Decision

Phase 5B is closed as `PASS_WITH_TRACKED_LAYOUT_DEBT`.

Closed:

- Bibliography duplicate-key hygiene.
- Individual recompilation of Papers 5, 7, 8, 9, and 10.
- Paper 9 missing environment bug.
- Monolithic label/anchor duplicate hygiene.
- Monolithic stale generated-section cleanup.
- Monolithic final recompilation.
- Double post-verification of critical gates.

Not closed as zero-debt:

- Layout polish is still not at zero warnings.
- Bridge source recovery remains a tracked source provenance issue.
- Rival/comparator scientific pressure remains Phase 6 work.

## Post-Closure Addendum

Date: 2026-06-04

This Phase 5B report is superseded for final monolithic closure by:

- `rigid-identity-framework/docs/reports/QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md`

The later closure pass repaired the canonical compile route so that
`npm run compile:monolithic` now executes `pdflatex`, `biber`, `pdflatex`, `pdflatex`
and records `Status: compiled` in `MONOLITHIC_BUILD_REPORT.md`.

Current final monolithic artifact after the canonical compile route:

- pages: 334;
- bytes: 2837340;
- SHA256: `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785`;
- hard errors: 0;
- duplicate labels: 0;
- undefined references/citations: 0;
- duplicate anchors: 0;
- biber warnings: 0.
