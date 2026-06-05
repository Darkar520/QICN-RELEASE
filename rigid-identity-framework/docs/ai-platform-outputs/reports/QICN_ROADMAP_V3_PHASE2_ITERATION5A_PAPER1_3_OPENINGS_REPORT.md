# QICN Roadmap v3 - Phase 2 Iteration 5A Paper 1 and Paper 3 Openings Report

Date: 2026-06-05

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`

## Purpose

Complete the low-risk opening-format targets before moving to the higher-risk
Papers 8 and 9 surfaces.

Targets:

- Paper 1 opening consistency.
- Paper 3 opening consistency and witness-relative null-regime language.

## Scope

Included:

- `paper1/main.tex`
- `paper1/main.pdf`
- `paper3/main.tex`
- `paper3/main.pdf`
- this report
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Excluded:

- Papers 8 and 9.
- BaseCore.
- Monolithic source/PDF.
- Macros, labels, theorem environments, theorem statements, bibliography, scripts, registry, and release files.

## Preflight

`git status --short --branch`:

```text
## main...origin/main
```

No uncommitted files were present before this iteration.

## Baseline Hashes

| File | SHA256 |
|---|---|
| `paper1/main.tex` | `467C89B0B9A10EE643BB9B31980F57651EABD44B93CD16FB2A4EA4224D0F2ED7` |
| `paper1/main.pdf` | `D09DFEAD0A1D3CF8B8B4F14555E95F1FBCEA645CEBD2ED9A32F5756ECA002E30` |
| `paper3/main.tex` | `E437C515B200A557950CDFA37F4A171B162A1DDB0E6A57DC04C6234BF9DB596F` |
| `paper3/main.pdf` | `5856B98441BDFEA4A7C4AEDFDCF7F1C7EB7FC122A03537AC8CD29DFEF2681A23` |

## Changes Applied

| Paper | Change | Reason |
|---|---|---|
| Paper 1 | Consolidated the four-part opening into one `Scope and admissible reading` paragraph. | Aligns Paper 1 with the Phase 2 consolidated style while preserving all boundaries about phenomenology, substrate realization, CCR certification, and runtime evidence. |
| Paper 3 | Consolidated the opening into a compact scope paragraph plus a separate `Witness-relative clarification`. | Preserves the v31 audit boundary while reducing defensive repetition. |
| Paper 3 | Rewrote the informal No-Null Regime statement to include the separated extension witness and regularity hypotheses. | Prevents reading CCR alone as implying non-nullity or empirical/phenomenological closure. |

## Formal Preservation Checks

| Check | Paper 1 | Paper 3 |
|---|---:|---:|
| Labels before | `57` | `27` |
| Labels after | `57` | `27` |
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

No parallel LaTeX compilation was used.

## Final Measurements

| File | Final SHA256 |
|---|---|
| `paper1/main.tex` | `67EA7029512511A6E09038ACAF920A769D314FC126D27E5F8EF5F8FE7DF8F1D0` |
| `paper1/main.pdf` | `93CF5E8648FE5DDE335E3186AEF6C5331315D08C88B3D3D44B9BAFA33B3FB0D3` |
| `paper3/main.tex` | `F6D7DB4EB4FD404B53C9EE1F2AB6101BB758D63EDD5A372309E212605E90AAB0` |
| `paper3/main.pdf` | `0C4E2C8AA33B4DF4ED1A2C90DDEF7CF72EF8647E8EBB152CA47C913A6E903C0F` |

| Measurement | Paper 1 | Paper 3 |
|---|---:|---:|
| PDF pages | `26` | `17` |
| PDF bytes | `464662` | `441391` |
| Hard LaTeX errors | `0` | `0` |
| Undefined refs/cites | `0` | `0` |
| Rerun warnings | `0` | `0` |
| Biber warnings/errors/fatals | `0` | `0` |
| Overfull warnings | `0` detected by final scan | `0` |
| Underfull warnings | `0` detected by final scan | `5` |

## Residual Debt

| Debt | Status |
|---|---|
| Paper 3 layout | 5 underfull warnings remain around lines 522--586. Non-blocking for this opening-format iteration. |
| Monolithic sync | Open: Papers 1 and 3 changed, so the monolithic volume needs a later synchronized rebuild after Papers 8 and 9 are handled. |
| Papers 8 and 9 | Open: high-risk vocabulary/bridge surfaces remain the next targets before moving to the next phase. |

## Closure

Phase 2 Iteration 5A is closed because:

- only two `.tex` files were edited;
- no formal identifiers or theorem structures changed;
- both touched papers were recompiled successfully;
- all hard LaTeX/Biber gates passed;
- residual debt is bounded and tracked.

Status: `PASS_WITH_TRACKED_LAYOUT_DEBT`.
