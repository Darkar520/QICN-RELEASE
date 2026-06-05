# QICN Roadmap v3 - Phase 3 Iteration 1 Language Alias Report

Date: 2026-06-05

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`

## Purpose

Start Phase 3: language formalization versus interpretive aliases.

Objective:

- reduce semantic inflation in high-impact prose;
- preserve historical terms as aliases where compatibility requires them;
- avoid renaming macros, labels, files, registry IDs, scripts, theorem names, or technical bodies.

## Scope

Included theoretical files:

- `paper1/main.tex`
- `paper8_first_person_subjectivity/main.tex`
- `paper9_phenomenal_bridge_organization/main.tex`

Included generated artifacts:

- `paper1/main.pdf`
- `paper8_first_person_subjectivity/main.pdf`
- `paper9_phenomenal_bridge_organization/main.pdf`
- `monolithic/QICN_MONOLITHIC.pdf`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`
- this report
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Excluded:

- BaseCore.
- Paper 2, Paper 3, Paper 4, Paper 5, Paper 6, Paper 7, Paper 10.
- Registry and release files.
- Scripts.
- Macros, labels, theorem environments, theorem statements, proof bodies, bibliography entries, and technical bodies outside high-impact prose.
- Phase 3/editorial layout repair and full body-level Paper 8/9 scientific review.

## Preflight

Initial git state:

```text
## main...origin/main
```

The user requested Phase 3 immediately after Phase 2 was closed and pushed.

## Phase 3 Alias Table

| Historical / interpretive alias | Formal reading enforced in this iteration | Policy |
|---|---|---|
| `ontological mass` | scalar rigidity/deformation modulus `M_\Omega` | Preserve as historical term; clarify in Paper 1 high-impact prose. |
| `first-person indexed subjectivity` | framework-internal indexed structural class | Preserve as paper title/class alias; clarify in Paper 8 abstract/scope. |
| `subjectivity` | typed self-index/ownership/continuity/valuation/intervention burden | Preserve only under explicit formal class burden. |
| `phenomenal bridge` | bridge-organization predicate-family burden | Preserve as historical bridge alias; block phenomenality adjudication. |
| `phenomenal predicates` | phenomenal-bridge / bridge-level predicates | Use only as disciplined scientific targets, not achieved phenomenality. |

## Baseline Hashes

| File | SHA256 |
|---|---|
| `paper1/main.tex` | `67EA7029512511A6E09038ACAF920A769D314FC126D27E5F8EF5F8FE7DF8F1D0` |
| `paper1/main.pdf` | `93CF5E8648FE5DDE335E3186AEF6C5331315D08C88B3D3D44B9BAFA33B3FB0D3` |
| `paper8_first_person_subjectivity/main.tex` | `63A94FB4B77745A099EBA94BFF89847AF8CC54E35216164A89D9C9601713D957` |
| `paper8_first_person_subjectivity/main.pdf` | `96D45FFBCCBA5CA1C79FD537F0932C13F165E8B16642E9EFD434851BD74F05B1` |
| `paper9_phenomenal_bridge_organization/main.tex` | `DADF8D624F905AAD3B3AACD1257E649AC3A97202E41DFC76373C94EC299C2284` |
| `paper9_phenomenal_bridge_organization/main.pdf` | `55FD8009440E6E093C39C1D98D24F730EFC88ECF034D3FEB32DAD95E558573C0` |
| `monolithic/QICN_MONOLITHIC.pdf` | `7B0AF8954BCC01E5D95C49952D67C81C813A6670DC2E5D16A90504D0390ACCDE` |

## Audit Findings

| File | Surface | Finding | Risk | Classification | Action |
|---|---|---|---|---|---|
| `paper1/main.tex` | Abstract and scope | `ontological mass` appeared as a primary term in first-reader prose. | Could be read as physical/metaphysical ontology rather than scalar rigidity. | Alias inflation | Clarify as deformation-rigidity modulus while preserving historical term. |
| `paper8_first_person_subjectivity/main.tex` | Abstract and scope | `subjectivity` appeared as the foreground class name. | Could be read as human/metaphysical subjectivity rather than indexed class. | Alias inflation | Add formal reading as indexed structural class. |
| `paper9_phenomenal_bridge_organization/main.tex` | Abstract, scope, conclusion | `phenomenal bridge` / `phenomenal predicates` appeared as foreground bridge language. | Could be overread as phenomenality adjudication. | High-risk alias inflation | Recast as bridge-organization predicate-family burden. |

## Changes Applied

| File | Change |
|---|---|
| `paper1/main.tex` | Reframed high-impact `ontological mass` prose as deformation-rigidity invariant/modulus; preserved the historical alias and explicitly blocked physical-ontology reading in scope. |
| `paper8_first_person_subjectivity/main.tex` | Reframed `first-person indexed subjectivity` as a framework-internal indexed structural class in abstract/scope; preserved title, macro, and class terminology. |
| `paper9_phenomenal_bridge_organization/main.tex` | Reframed `phenomenal bridge` as a bridge-organization predicate-family burden; replaced high-impact `phenomenal predicates` wording with `phenomenal-bridge predicates` or bridge predicates where appropriate. |

Patch scale:

```text
paper1/main.tex: 8 lines changed
paper8_first_person_subjectivity/main.tex: 8 lines changed
paper9_phenomenal_bridge_organization/main.tex: 12 lines changed
Total: 14 insertions, 14 deletions
```

## Preservation Checks

| Check | Paper 1 | Paper 8 | Paper 9 |
|---|---:|---:|---:|
| Labels before | `57` | `21` | `3` |
| Labels after | `57` | `21` | `3` |
| Label diff count | `0` | `0` | `0` |
| Macro edits | `0` | `0` | `0` |
| Theorem/proof edits | `0` | `0` | `0` |
| Registry/script edits | `0` | `0` | `0` |

`git diff --check` reported no diff-check errors. Git emitted only LF-to-CRLF
working-copy warnings for touched text files.

## Paper Recompilation

Each touched paper was rebuilt sequentially:

```text
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

| Paper | PDF pages | PDF bytes |
|---|---:|---:|
| Paper 1 | `26` | `465072` |
| Paper 8 | `43` | `545625` |
| Paper 9 | `42` | `522338` |

## Final Paper Hashes

| File | SHA256 |
|---|---|
| `paper1/main.tex` | `928E374A29A3DAB9A03AA3AEA56E6BE58FA6FA08CC5DA761527E167769F1F3DA` |
| `paper1/main.pdf` | `BB00E67D14BC10472378988122D2F85A519F0E6D90BC0A42EC65CEE7378CB290` |
| `paper8_first_person_subjectivity/main.tex` | `ACE733450CF9FC0958C4D90270419AC2B192CA2BEA388B06ECB1D2E670E518CC` |
| `paper8_first_person_subjectivity/main.pdf` | `687AEE7491A342B9A29CE0CFF7ABB50B4E7389ACFD176D5FC1AFC3C8C837DB60` |
| `paper9_phenomenal_bridge_organization/main.tex` | `9D1CFA8283C87E3257F7040B4C28AE7167457ACAA41C78344034383B07AAECFB` |
| `paper9_phenomenal_bridge_organization/main.pdf` | `98B92354FDA01404223ACC120804145920E3EBA425096655F59C2C3AE8F66029` |

## Paper Verification Gates

| Gate | Paper 1 | Paper 8 | Paper 9 |
|---|---:|---:|---:|
| `! LaTeX Error` | `0` | `0` | `0` |
| `Undefined control sequence` | `0` | `0` | `0` |
| Undefined references | `0` | `0` | `0` |
| Undefined citations | `0` | `0` | `0` |
| Biber rerun warnings | `0` | `0` | `0` |
| Cross-reference rerun warnings | `0` | `0` | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` | `0/0/0` | `0/0/0` |
| Overfull hbox warnings | `0` | `13` | `38` |
| Underfull hbox warnings | `0` | `91` | `221` |

## Monolithic Recompilation

Canonical command:

```text
npm run compile:monolithic
```

First attempt:

- Result: failed.
- Cause: operational MiKTeX AppData access failure under sandbox, not content.
- Error: `Acceso denegado` while creating `C:\Users\irisp\AppData\Roaming\MiKTeX\2.9`.

Second attempt:

- Same command.
- Executed with elevated permission.
- Result: compiled.

Final monolithic artifacts:

| File | SHA256 |
|---|---|
| `monolithic/QICN_MONOLITHIC.tex` | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` |
| `monolithic/QICN_MONOLITHIC.pdf` | `7D7A3C2B2557AEE37A5CED5C80AC238A3C0F5D8C3C894AB6D4565B1C99472257` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `FD420FB2C8BB478CD581C29BF62323ADFDE6F1560B468CFC298D7C6F1F94F92D` |

Final monolithic PDF:

```text
Output written on QICN_MONOLITHIC.pdf (335 pages, 2836613 bytes).
```

Monolithic verification:

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

Content spot-checks confirmed the alias edits are present in generated monolithic
sections:

- Paper 1 section: `deformation-rigidity`, `technical alias`.
- Paper 8 section: `indexed structural class`.
- Paper 9 section: `historical bridge alias`, `bridge-organization predicate family`, `phenomenal-bridge predicates`.

## Regressions Searched

- accidental edits outside the three Phase 3 target `.tex` files;
- macro, label, theorem, proof, registry, script, and bibliography churn;
- source/PDF desynchronization;
- undefined refs/cites or rerun warnings;
- duplicate labels/anchors;
- semantic promotion of aliases into ontology, phenomenality, human equivalence, or external validation;
- monolithic failure or loss of page count.

## Regressions Found

- No hard regression found.
- Layout debt remains: Paper 8, Paper 9, and monolithic warnings are inherited/tracked and not repaired in this alias iteration.
- The first monolithic build attempt failed due MiKTeX AppData access under sandbox; the same command succeeded with elevated permission.

## Residual Risks

- Phase 3 should continue with a second alias pass over Paper 5 and Paper 7 terminology if desired.
- Phase 3/editorial layout debt remains for Papers 8, 9, 10, and monolithic.
- Body-level scientific review of Papers 8 and 9 remains pending; this iteration targeted high-impact alias framing only.

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`.
