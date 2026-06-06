# QICN Roadmap v3 - Phase 4 Iteration 3 Paper 5 Import-Language Hardening Report

Date: 2026-06-06

Status: `PASS_WITH_TRACKED_SCOPE_AND_LAYOUT_DEBT`

## Purpose

Continue Phase 4 with a local import-language hardening pass.

Objective:

- audit remaining Phase 4 candidates after Paper 1 and Paper 2 hardening;
- avoid broad edits to high-risk Papers 8 and 9;
- preserve Paper 3 because its witness-relative boundary is already explicit;
- align Paper 5 import prose with the hardened Paper 2 and Paper 3 claim boundaries;
- preserve mathematical strength, theorem ownership, labels, macros, proof topology, and source/PDF synchronization.

This is a local Phase 4 iteration over Paper 5. It is not a global Phase 4 closure.

## Governance Preflight

Initial local state:

```text
## main...origin/main [ahead 3]
```

Local commits already ahead of `origin/main`:

```text
d4a960d docs: apply roadmap phase 4 paper 2 hardening
60b86de docs: integrate external audit push rule
a9c28b5 docs: apply roadmap phase 4 math hardening
```

Active governance:

- `INSTRUCCIONES.md` section `1.3. Auditoria obligatoria antes de push`.
- `ROADMAP.md` Phase 4 mathematical hardening.
- `AGENTS.md` hard-science rigor rules.

No push is authorized by this report. Push remains blocked until external audit approval under `INSTRUCCIONES.md` section `1.3`.

## Scope

Included theoretical file:

- `paper5_operational_consciousness/main.tex`

Included generated artifacts:

- `paper5_operational_consciousness/main.pdf`
- `monolithic/QICN_MONOLITHIC.pdf`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`
- this report
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Audited but not edited:

- `paper3/main.tex`
- `paper8_first_person_subjectivity/main.tex`
- `paper9_phenomenal_bridge_organization/main.tex`

Excluded:

- BaseCore.
- Papers 1--4 and 6--10 as editable sources.
- The monolithic builder source.
- Bibliography.
- Registry and release files.
- Macros, labels, theorem environments, theorem titles, theorem statements, and proof bodies.
- Layout cleanup.
- Phase 5 runtime/estimator claims.

## Baseline Hashes

| File | SHA256 |
|---|---|
| `paper5_operational_consciousness/main.tex` | `E9E45A4149E0F03761065804B5B8FA4D91C528AA64EE6486E8BAAE3A44627A22` |
| `paper5_operational_consciousness/main.pdf` | `927C24CDB5821FD91391EAB4D1959B7E86E8FEDDE94B534B9A2824FFA2B07343` |
| `monolithic/QICN_MONOLITHIC.pdf` | `49EA6055D09047A138CF52BE7AABF857F1CA973BB3FAF2046EE5F2A3B88B3C34` |

## Candidate Audit

| Candidate | Finding | Risk | Decision |
|---|---|---|---|
| Paper 3 | Contains `forced non-nullity`, but the opening scope and witness-relative clarification already bind the result to extension-witness and regularity hypotheses. | Medium | Audit only in this iteration. |
| Paper 5 | Imports Paper 2 and Paper 3 using older strong phrases such as `continuity is forced`, `forced non-nullity`, and `proves the existence of positive non-null structure`. | Medium | Edit import-language only. |
| Paper 8 | High density of subjectivity and first-person terminology; broad keyword edits could damage local theory. | High | Defer to dedicated semantic/body audit. |
| Paper 9 | High density of bridge and phenomenality terminology; already contains extensive non-claims but remains high-risk. | High | Defer to dedicated bridge-specific audit. |

## Changes Applied

Patch scale:

```text
paper5_operational_consciousness/main.tex: 10 insertions, 10 deletions
```

| Before | After | Purpose |
|---|---|---|
| `proves four new results: existence of operational consciousness...` | `proves four framework-internal results: non-empty membership of the operational class...` | Keeps local theorem role while reducing ordinary-language consciousness overread in abstract prose. |
| `showing that continuity and anti-fragmentation are not optional decorations...` | `classifying continuity and anti-fragmentation within the stated assignment model` | Aligns import language with Paper 2's assignment-class reading. |
| `proves forced non-nullity under causally rigid conditions` | `establishes witness-relative non-null separation under its stated extension-witness and regularity hypotheses` | Aligns Paper 3 import with witness-relative boundary. |
| `forced non-nullity` | `conditional non-nullity` | Removes unqualified imported force language. |
| `continuity is forced` | `admissible CCR assignments as continuous` | Preserves Paper 2 theorem import without globalized wording. |
| `proves the existence of positive non-null structure` | `establishes positive non-null separation under its stated witness and regularity hypotheses` | Preserves result while binding it to Paper 3 hypotheses. |
| `One invariant margin forced to zero` | `One invariant margin driven to zero` | Removes unnecessary force language from prediction table. |
| `The paper proves a narrower claim...` | `The paper establishes a narrower framework-internal claim...` | Clarifies scope in conclusion. |
| `belongs to an operational class of consciousness and operational qualia` | `belongs to the operational class discussed here` | Avoids ordinary-language class inflation in the closing sentence. |

## Mathematical-Strength Preservation

Paper 5 structural count before and after:

| Structure | Before | After | Diff |
|---|---:|---:|---:|
| `\begin{theorem}` | `9` | `9` | `0` |
| `\begin{lemma}` | `2` | `2` | `0` |
| `\begin{proposition}` | `34` | `34` | `0` |
| `\begin{corollary}` | `4` | `4` | `0` |
| `\begin{definition}` | `27` | `27` | `0` |
| `\begin{proof}` | `49` | `49` | `0` |
| `\label{...}` | `87` | `87` | `0` |

Preserved:

- theorem/proof topology;
- theorem titles and theorem statements;
- proof bodies;
- labels;
- macros;
- bibliography;
- registry, release files, and scripts.

## Phrase Propagation Verification

New phrases were absent from `HEAD` and present after edit in both Paper 5 and the generated monolithic Paper 5 section.

| New phrase | `HEAD` source count | Current Paper 5 count | Current monolithic section count |
|---|---:|---:|---:|
| `four framework-internal results` | `0` | `1` | `1` |
| `non-empty membership of the operational class on admissible support` | `0` | `1` | `1` |
| `classifying continuity and anti-fragmentation within the stated assignment model` | `0` | `1` | `1` |
| `witness-relative non-null separation under its stated extension-witness and regularity hypotheses` | `0` | `1` | `1` |
| `witness-relative null-regime instability and conditional non-nullity` | `0` | `1` | `1` |
| `witness-relative null-instability and conditional non-nullity` | `0` | `2` | `2` |
| `classifies admissible CCR assignments as continuous` | `0` | `1` | `1` |
| `establishes positive non-null separation under its stated witness and regularity hypotheses` | `0` | `1` | `1` |
| `Witness-relative null-instability, conditional non-nullity` | `0` | `1` | `1` |
| `One invariant margin driven to zero` | `0` | `1` | `1` |
| `establishes a narrower framework-internal claim` | `0` | `1` | `1` |
| `belongs to the operational class discussed here` | `0` | `1` | `1` |

Old target phrases are absent after edit in both Paper 5 and the generated monolithic Paper 5 section:

| Old phrase | `HEAD` source count | Current Paper 5 count | Current monolithic section count |
|---|---:|---:|---:|
| `proves four new results` | `1` | `0` | `0` |
| `existence of operational consciousness on non-empty admissible support` | `1` | `0` | `0` |
| `showing that continuity and anti-fragmentation are not optional decorations` | `1` | `0` | `0` |
| `proves forced non-nullity under causally rigid conditions` | `1` | `0` | `0` |
| `supplies null-regime instability and forced non-nullity` | `1` | `0` | `0` |
| `through null-regime instability and forced non-nullity` | `1` | `0` | `0` |
| `proves that continuity is forced` | `1` | `0` | `0` |
| `satisfying the null-instability and forced non-nullity results` | `1` | `0` | `0` |
| `proves the existence of positive non-null structure` | `1` | `0` | `0` |
| `Null-instability, forced non-nullity` | `1` | `0` | `0` |
| `One invariant margin forced to zero` | `1` | `0` | `0` |
| `The paper proves a narrower claim` | `1` | `0` | `0` |
| `belongs to an operational class of consciousness and operational qualia` | `1` | `0` | `0` |

Generated monolithic section verified:

```text
monolithic/build/sections/06-structural-criterion-for-substrate-invariant-operational-consciousness.tex
```

## Paper 5 Recompilation

Commands executed in `paper5_operational_consciousness`:

```text
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Final Paper 5 PDF:

```text
Output written on main.pdf (28 pages, 507843 bytes).
```

Final Paper 5 hashes:

| File | SHA256 |
|---|---|
| `paper5_operational_consciousness/main.tex` | `A34AF5FE86BE5B6FC989F99BE0055DF829DF1A0C05E948196D106FDB0C0F00F7` |
| `paper5_operational_consciousness/main.pdf` | `CA1520FAB347EA0BDF687A4B74257847CFAFF5BE0867ECE4891F37E8172193C9` |

Paper 5 verification:

| Gate | Result |
|---|---:|
| Hard LaTeX errors | `0` |
| Undefined control sequences | `0` |
| Undefined references | `0` |
| Undefined citations | `0` |
| Cross-reference rerun warnings | `0` |
| Duplicate hyperref destinations | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` |
| Overfull hbox warnings | `4` |
| Underfull hbox warnings | `10` |

## Monolithic Recompilation

Canonical command:

```text
npm run compile:monolithic
```

First attempt:

- Result: builder returned failed.
- The build report showed MiKTeX `Acceso denegado` while creating `C:\Users\irisp\AppData\Roaming\MiKTeX\2.9`.
- This was treated as environment/permission failure.

Second attempt:

- Same command.
- Executed with elevated permission.
- Result: compiled.

Final monolithic artifacts:

| File | SHA256 |
|---|---|
| `monolithic/build/sections/06-structural-criterion-for-substrate-invariant-operational-consciousness.tex` | `62964B377AD9CB2A6AF79849B2A71D16F7CC5275BC5C82887DD7EB52474C68DA` |
| `monolithic/QICN_MONOLITHIC.pdf` | `FA59ED167745B826EE5238FEC221B8FA273A33CBDB107DBD6B459AD39FE26E25` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `9D3EFD364031F436377C83044A5859F70FFB1B5DA915F7BEAF93E61148746F90` |

Final monolithic PDF:

```text
Output written on QICN_MONOLITHIC.pdf (335 pages, 2837732 bytes).
```

Monolithic verification:

| Gate | Result |
|---|---:|
| Hard LaTeX errors | `0` |
| Undefined control sequences | `0` |
| Undefined references | `0` |
| Undefined citations | `0` |
| Cross-reference rerun warnings | `0` |
| Duplicate hyperref destination warnings | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` |
| Source labels | `401` |
| Exact duplicate source label groups | `0` |
| Source refs | `134` |
| Missing source refs | `0` |
| Aux labels | `401` |
| Aux duplicate exact label groups | `0` |
| Overfull hbox warnings | `7` |
| Underfull hbox warnings | `330` |

## Repository Verification

Command:

```text
npm run verify
```

Result:

```text
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
Clinical summary v28: gain_iid=87.59 -> gain_ar1=-48.68; sign_reversal=true; verdict_v27=BLOCKED_MULTIPLE_GATES; verdict_v28=BLOCKED_MULTIPLE_GATES
Negative-control suite v30: PASS; cases=6/6; external_support_certified=false
Promotion-rule validation v30: PASS; source_checks=5/5; self_tests=8/8
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Interpretation:

- The verification chain passed.
- The scientifically appropriate blockers remain active.
- `external_support_certified=false` is preserved.
- No runtime/internal result is promoted to external validation.

## Regression Search

Searched for:

- accidental edits outside Paper 5 and generated artifacts;
- theorem/proof/label/macro churn;
- theorem statement or proof weakening;
- old target phrases remaining in source or monolithic section;
- new phrases missing from monolithic section;
- undefined refs/cites;
- duplicate labels or anchors;
- accidental external-validation promotion.

Regressions found:

- No hard regression found.
- Layout debt remains tracked: Paper 5 has 4 overfull and 10 underfull hbox warnings; monolithic has 7 overfull and 330 underfull hbox warnings.
- The first monolithic build attempt failed due MiKTeX permission setup; elevated rerun using the same command compiled.

## Residual Phase 4 Scope

This iteration does not close Phase 4 globally. Remaining candidates:

| Candidate | Risk | Recommended action |
|---|---|---|
| Paper 3 | Medium | Optional later audit-only closure or very small intro wording pass if external audit requests it. |
| Paper 8 | High | Dedicated body-level semantic audit before edits; no broad keyword replacement. |
| Paper 9 | High | Dedicated bridge-specific audit separating formal bridge burden from phenomenality interpretation. |
| Layout debt | Editorial | Separate layout phase after claim-language hardening. |

## Commit/Push Boundary

This report authorizes a local scoped commit after review of staged files.

Push to `origin/main` is not authorized by this report. Under `INSTRUCCIONES.md` section `1.3`, push requires external audit approval.

Final status:

```text
PASS_WITH_TRACKED_SCOPE_AND_LAYOUT_DEBT
```
