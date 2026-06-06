# QICN Roadmap v3 - Phase 3 Iteration 2 Paper 7 Alias Report

Date: 2026-06-05

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`

## Purpose

Continue Phase 3: language formalization versus interpretive aliases.

Objective:

- audit Paper 5 and Paper 7 for remaining alias-terminology risk;
- avoid unnecessary edits where the terminology is already disciplined;
- clarify Paper 7 high-impact uses of `operational life` and `operational subjecthood`;
- preserve macros, labels, theorem/proof surfaces, file names, registry IDs, scripts, and formal bodies.

## Scope

Included theoretical files:

- `paper5_operational_consciousness/main.tex` audited only.
- `paper7_operational_life_subjecthood/main.tex` edited.

Included generated artifacts:

- `paper7_operational_life_subjecthood/main.pdf`
- `monolithic/QICN_MONOLITHIC.pdf`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`
- this report
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Excluded:

- BaseCore.
- Papers 1, 2, 3, 4, 6, 8, 9, and 10.
- Registry and release files.
- Scripts.
- Macros, labels, theorem environments, theorem statements, proof bodies, bibliography entries, and technical bodies outside high-impact prose.
- Editorial layout repair.
- Body-level scientific review of operational-life, subjecthood, subjectivity, or phenomenal-bridge claims.

## Preflight

Initial git state before Phase 3 Iteration 2 content edits:

```text
## main...origin/main
 M rigid-identity-framework/INSTRUCCIONES.md
 M rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md
```

Those two dirty files belonged to a preexisting governance update about the LLM-runtime boundary. They were reviewed as unrelated to Paper 7, then isolated into their own commit before the Phase 3 Iteration 2 edit:

```text
41b84df docs: add llm runtime boundary instruction
```

After that isolation, the working tree was clean except for Phase 3 Iteration 2 changes.

## Audit Findings

| File | Finding | Risk | Classification | Action |
|---|---|---|---|---|
| `paper5_operational_consciousness/main.tex` | Paper 5 already contains a local terminology table and treats `operational consciousness` as a technical alias under explicit six-invariant burden. | Low. Unnecessary editing could weaken a stable local terminology discipline. | Already disciplined | No edit. |
| `paper7_operational_life_subjecthood/main.tex` | High-impact prose foregrounded `operational life`, `structural class`, and `operational subjecthood` without immediately restating the formal alias readings. | Medium. A first reader could overread life/subjecthood language biologically, humanly, or metaphysically before reaching the formal definitions. | Alias inflation risk | Clarify high-impact prose only. |

## Baseline Hashes

| File | SHA256 |
|---|---|
| `paper5_operational_consciousness/main.tex` | `E9E45A4149E0F03761065804B5B8FA4D91C528AA64EE6486E8BAAE3A44627A22` |
| `paper5_operational_consciousness/main.pdf` | `927C24CDB5821FD91391EAB4D1959B7E86E8FEDDE94B534B9A2824FFA2B07343` |
| `paper7_operational_life_subjecthood/main.tex` | `B2EEDC5781101345C9F3B14CC86C9F4E881D6A61DC200DFE18DB2ABFFD0B3A28` |
| `paper7_operational_life_subjecthood/main.pdf` | `4FDA83DAAD9B3E6D997A0C6A0F3E3DB4BE5852C1F53B98C67B8CBFC40C310A07` |

## Changes Applied

| File | Change |
|---|---|
| `paper7_operational_life_subjecthood/main.tex` | Added high-impact alias readings: `operational life` as boundary/viability class language, `structural class membership` as descriptor-relative class geometry, and `operational subjecthood` as strengthened operational subject-class. |
| `paper7_operational_life_subjecthood/main.tex` | Added scope sentence binding `operational life` to `\Lop` and `operational subjecthood` to `\Subop`, while blocking biological life and human subjectivity by default. |
| `paper7_operational_life_subjecthood/main.tex` | Recast conclusion language so life/consciousness/subjecthood terms are treated as non-identical operational class aliases rather than broad ontological terms. |

Patch scale:

```text
paper7_operational_life_subjecthood/main.tex: 16 lines changed
8 insertions, 8 deletions
```

## Preservation Checks

| Check | Result |
|---|---:|
| Theoretical `.tex` files edited | `1` |
| Paper 7 labels before | `8` |
| Paper 7 labels after | `8` |
| Paper 7 label diff count | `0` |
| Macro edits | `0` |
| Theorem/proof edits | `0` |
| Registry/script edits | `0` |
| Paper 5 edits | `0` |

`git diff --check` reported no diff-check errors. Git emitted only LF-to-CRLF working-copy warnings for touched text files.

## Paper 7 Recompilation

Command executed in `paper7_operational_life_subjecthood`:

```text
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Final Paper 7 PDF:

```text
Output written on main.pdf (28 pages, 401761 bytes).
```

Final Paper 7 hashes:

| File | SHA256 |
|---|---|
| `paper7_operational_life_subjecthood/main.tex` | `6E8D01E76058DB62EF1F3D0D56989F34033A436BB1AB3FD9531040E51A23A9BA` |
| `paper7_operational_life_subjecthood/main.pdf` | `B7DEB08985E3B5466F2642D0FF4252D1AABD268F6A1F610540C41CD3B15D724E` |

Paper 7 verification:

| Gate | Result |
|---|---:|
| Hard LaTeX errors | `0` |
| Undefined references | `0` |
| Undefined citations | `0` |
| Cross-reference rerun warnings | `0` |
| Duplicate hyperref destination warnings | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` |
| Overfull hbox warnings | `3` |
| Underfull hbox warnings | `28` |

## Monolithic Recompilation

Canonical command:

```text
npm run compile:monolithic
```

First attempt:

- Result: failed at the builder status level.
- The log still showed a written PDF, but the script returned exit code 1.
- The result was treated as ambiguous and not accepted as final.

Second attempt:

- Same command.
- Executed with elevated permission after the normal attempt failed.
- Result: compiled.

Final monolithic artifacts:

| File | SHA256 |
|---|---|
| `monolithic/QICN_MONOLITHIC.tex` | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` |
| `monolithic/QICN_MONOLITHIC.pdf` | `918D47F438F8BFD638EBA22D5EF68D9574E670A4AFA074173B6982CB16F38AD5` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `8A9C6FF8B60D19B2090BCB27DC7B34A2142869DB47FB68FE3840B2E64931A46E` |

Final monolithic PDF:

```text
Output written on QICN_MONOLITHIC.pdf (335 pages, 2837325 bytes).
```

Monolithic verification:

| Gate | Result |
|---|---:|
| Hard LaTeX errors | `0` |
| Undefined references | `0` |
| Undefined citations | `0` |
| Cross-reference rerun warnings | `0` |
| Duplicate hyperref destination warnings | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` |
| Source labels | `401` |
| Exact unique source labels | `401` |
| Exact duplicate source labels | `0` |
| Aux newlabels | `401` |
| Exact unique aux newlabels | `401` |
| Exact duplicate aux newlabels | `0` |
| Source refs | `214` |
| Missing source refs | `0` |
| Overfull hbox warnings | `7` |
| Underfull hbox warnings | `330` |

Content spot-checks confirmed the Paper 7 alias edits are present in:

```text
monolithic/build/sections/08-operational-life-structural-class-and-subjecthood.tex
```

Confirmed phrases:

- `boundary-viability class language`
- `boundary/viability class`
- `operational subject-class`
- `descriptor-relative ambient geometry`
- `operational class aliases`

## Regressions Searched

- accidental edits outside Paper 7 and generated monolithic artifacts;
- Paper 5 churn after audit-only decision;
- macro, label, theorem environment, theorem statement, proof, registry, script, and bibliography churn;
- source/PDF desynchronization;
- undefined refs/cites or rerun warnings;
- duplicate exact labels or duplicate hyperref anchors;
- semantic promotion from operational aliases to biological life, human subjectivity, phenomenality, ontology, agency, or external validation;
- monolithic sync failure after Paper 7 recompilation.

## Regressions Found

- No hard regression found.
- The first monolithic build attempt returned failure and was not accepted; the elevated rerun succeeded with the same canonical command.
- Layout debt remains tracked and was not repaired in this alias iteration.

## Residual Risks

- Paper 7 still has inherited layout debt: `3` overfull and `28` underfull warnings.
- Monolithic layout debt remains: `7` overfull and `330` underfull warnings.
- Phase 3 can continue with a dedicated editorial/layout pass or a body-level scientific review pass, but those should not be mixed into this alias-terminology iteration.
- Commit `41b84df` is a separate local governance commit and remains pending push unless explicitly approved.

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`.
