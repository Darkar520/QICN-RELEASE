# QICN Roadmap v3 - Phase 2 Iteration 5B Paper 8 and Paper 9 High-Risk Openings Report

Date: 2026-06-05

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`

## Purpose

Complete the remaining high-risk Phase 2 opening-format targets before moving to
the next roadmap phase.

Targets:

- Paper 8 opening consistency and first-person subjectivity boundary.
- Paper 9 opening consistency and phenomenal bridge boundary.

## Scope

Included:

- `paper8_first_person_subjectivity/main.tex`
- `paper8_first_person_subjectivity/main.pdf`
- `paper9_phenomenal_bridge_organization/main.tex`
- `paper9_phenomenal_bridge_organization/main.pdf`
- this report
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Excluded:

- Paper 1 and Paper 3, already closed in Iteration 5A.
- Paper 2/BaseCore ownership work, already closed in Iteration 4B with residual tracked overlap debt.
- Monolithic source/PDF, intentionally deferred until this iteration is committed.
- Macros, labels, theorem environments, theorem statements, proof bodies, bibliography, scripts, registry, and release files.

## Preflight

`git status --short --branch` before 5B edits:

```text
## main...origin/main [ahead 1]
```

The branch was ahead by the previously committed Iteration 5A commit:

```text
f52c792 docs: normalize paper 1 and 3 openings
```

## Baseline Hashes

| File | SHA256 |
|---|---|
| `paper8_first_person_subjectivity/main.tex` | `B6F40959B4D828D02DA7BA9B960546CF1BEA5538F34A93C2D71F8C4AF2C7AAF9` |
| `paper8_first_person_subjectivity/main.pdf` | `5E761031D3E6A5DA9C0662DAE0D90659B5FF00EBDD1AF578ECCB99C83603F7A0` |
| `paper9_phenomenal_bridge_organization/main.tex` | `AB53A73FB2E758B960FBC29829B10FFE351F4E947440A511E64FEC0557F7DACB` |
| `paper9_phenomenal_bridge_organization/main.pdf` | `266BE4037511F2AFC803F1B825BFA0182750C2BBD456B8CF7A2F29910E32F819` |

## Changes Applied

| Paper | Change | Reason |
|---|---|---|
| Paper 8 | Consolidated the four-part opening into one `Scope and admissible reading` paragraph. | Aligns Paper 8 with the consolidated Phase 2 style while preserving the first-person subjectivity boundary. |
| Paper 8 | Preserved explicit limits around metaphysical subjectivity, human phenomenal equivalence, moral parity, empirical instantiation, present-system certification, upstream theorem ownership, and external validation. | Keeps high-risk subjectivity language model-relative and operational. |
| Paper 9 | Consolidated the four-part opening into `Scope and admissible reading` plus `Formal bridge closure boundary`. | Reduces repetitive defensiveness while preserving bridge-specific claim gates. |
| Paper 9 | Strengthened the distinction between formal bridge closure, runtime closure, empirical closure, and phenomenality adjudication. | Prevents BPF-1 surfaces, audit packages, runtime cleanliness, or Paper 8 inclusion from being read as bridge confirmation. |

## Formal Preservation Checks

| Check | Paper 8 | Paper 9 |
|---|---:|---:|
| Labels before | `21` | `3` |
| Labels after | `21` | `3` |
| Label diff count | `0` | `0` |
| Macro/theorem environment edits | `0` | `0` |
| Theorem/proof edits | `0` | `0` |

## Recompilation

Both papers were rebuilt sequentially with:

```text
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Outputs from final logs:

| Paper | PDF pages | PDF bytes |
|---|---:|---:|
| Paper 8 | `43` | `545608` |
| Paper 9 | `42` | `522251` |

## Final Hashes

| File | SHA256 |
|---|---|
| `paper8_first_person_subjectivity/main.tex` | `63A94FB4B77745A099EBA94BFF89847AF8CC54E35216164A89D9C9601713D957` |
| `paper8_first_person_subjectivity/main.pdf` | `96D45FFBCCBA5CA1C79FD537F0932C13F165E8B16642E9EFD434851BD74F05B1` |
| `paper9_phenomenal_bridge_organization/main.tex` | `DADF8D624F905AAD3B3AACD1257E649AC3A97202E41DFC76373C94EC299C2284` |
| `paper9_phenomenal_bridge_organization/main.pdf` | `55FD8009440E6E093C39C1D98D24F730EFC88ECF034D3FEB32DAD95E558573C0` |

## Verification Gates

| Gate | Paper 8 | Paper 9 |
|---|---:|---:|
| `! LaTeX Error` | `0` | `0` |
| `Undefined control sequence` | `0` | `0` |
| Undefined references | `0` | `0` |
| Undefined citations | `0` | `0` |
| Biber rerun warnings | `0` | `0` |
| Cross-reference rerun warnings | `0` | `0` |
| Biber WARN/ERROR/FATAL | `0/0/0` | `0/0/0` |
| Overfull hbox warnings | `13` | `38` |
| Underfull hbox warnings | `91` | `221` |

`git diff --check` reported no diff-check errors. Git emitted LF-to-CRLF
working-copy warnings for the two touched `.tex` files only.

## Command Notes

- An initial label comparison used an incorrect `HEAD:path` rooted inside
  `rigid-identity-framework`; it failed because the Git root is the parent
  workspace. That result was discarded.
- The valid label comparison used
  `HEAD:rigid-identity-framework/<paper>/main.tex` and returned zero label
  differences.
- `pdfinfo main.pdf` was attempted as a non-blocking page-count check, but the
  local MiKTeX setup reported that setup was incomplete. Page and byte counts
  were therefore taken from the final LaTeX logs.

## Regressions Searched

- accidental edits outside Papers 8 and 9;
- label, macro, theorem-environment, theorem-statement, proof, and bibliography churn;
- undefined refs/cites, rerun warnings, or Biber warnings;
- deletion of boundary language without replacement;
- semantic promotion from formal bridge architecture to runtime, empirical, or phenomenality closure;
- source/PDF desynchronization for touched papers.

## Regressions Found

- No hard regression found.
- Layout debt remains significant, especially in Paper 9 dense tables and long machine-readable artifact names.
- Monolithic synchronization remains open after Iterations 5A and 5B.

## Residual Risks

- The monolithic PDF should be rebuilt in a dedicated synchronization pass after this commit.
- Paper 8 and Paper 9 still contain high-risk vocabulary by design; the present iteration normalized boundary framing, not the full body-level scientific review.
- Paper 9 layout debt should be handled in a later editorial/layout pass before publication readiness.

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`.
