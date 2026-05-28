# Monolithic PDF Polish Report v2

Status: PDF_MONOLITHIC_POLISHED_WITH_VERIFIED_CLEAN_WARNINGS
Date: 2026-05-26

## Scope

This pass edits the monolithic PDF build system and generated monolithic artifact only. It does not alter theorem status, empirical status, registry semantics, claim authority, external adjudication status, or any unexecuted protocol. In particular, E2 remains a protocol/template boundary and `I_int` is not elevated to a global proof.

## Implemented editorial/build changes

- Switched monolithic sections from unnumbered `\chapter*` blocks to numbered `\chapter` blocks, eliminating chapterless section numbers such as `.90`.
- Added a title page and explicit editorial-status front matter.
- Rebuilt the table of contents through a multi-pass `latexmk` flow.
- Added merged monolithic bibliography generation from available local `.bib` sources.
- Added Biber-backed bibliography compilation through `latexmk`.
- Namespaced source-local LaTeX labels and same-source references to prevent cross-paper duplicate-label collisions.
- Neutralized source-local `\appendix` state changes so one paper's appendix mode cannot contaminate later chapters.
- Normalized float placement from `[h]`, `[h!]`, and `[!h]` forms to safer `[!htbp]` forms.
- Wrapped dense `tabular`, `tabularx`, and long standalone tables with monolithic-specific sizing/layout guards.
- Added margin, header/footer, caption, microtype, tabular spacing, and badness controls suitable for a technical monolithic volume.
- Disabled PDF bookmarks at package-load time to avoid invalid PDF-string bookmark warnings from mathematical section titles while preserving the printed/clickable table of contents.
- Added clean rebuild behavior by deleting stale LaTeX auxiliary files before `latexmk` compilation.

## Verification results

| Check | Result |
|---|---:|
| `latexmk` monolithic compile | PASS |
| PDF page count | 313 |
| `??` tokens in extracted PDF text | 0 |
| Undefined LaTeX references | 0 |
| Undefined citations | 0 |
| Multiply-defined labels | 0 |
| Hyperref warnings | 0 |
| Biblatex warnings | 0 |
| Package warnings | 0 |
| LaTeX warnings | 0 |
| Font warnings | 0 |
| Float-placement warnings | 0 |
| Overfull vboxes | 0 |
| Underfull boxes | 0 |
| Overfull hbox diagnostics | 4 |

## Residuals

There are 4 residual `Overfull \hbox` diagnostics. These are TeX bad-box diagnostics, not LaTeX warnings. They are concentrated in very dense tables and compact status rows. I did not erase them by falsifying content or hiding unresolved references. The sampled renders show no obvious clipping on the inspected pages, but a human page-by-page typesetting pass could still improve those dense tables further.

## SHA-256

- `monolithic/QICN_MONOLITHIC.pdf`: `344070c587af9b64145b32421586aea496420d536e587014fec41ae00dcc1cfc`
- `scripts/build-monolithic-volume.js`: `c4b86ff861b5a453cf144e26a2ffeeefc3e53731ff0de8918ab11d8298d6b7dd`

## Boundary statement

This is an editorial and build-system improvement. It is not mathematical validation, empirical validation, external adjudication, human-curation certification, or claim-status elevation.
