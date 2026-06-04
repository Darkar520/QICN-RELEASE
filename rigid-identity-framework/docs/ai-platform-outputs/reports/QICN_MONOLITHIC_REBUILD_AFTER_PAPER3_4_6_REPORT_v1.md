# QICN Monolithic Rebuild After Paper 3/4/6 Updates v1

Status: MONOLITHIC_REBUILT_COMPILED_AND_VERIFIED
Date: 2026-06-03

## Boundary

This AI-platform report records the one-shot monolithic rebuild requested after the current Paper 3, Paper 4, and Paper 6 updates. It does not certify theorem truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral status, or external adjudication.

## Actions

- Regenerated monolithic sections with `npm run build:monolithic`.
- Recompiled `QICN_MONOLITHIC.pdf` with `pdflatex`, `biber`, and two final `pdflatex` passes.
- Updated `docs/reports/MONOLITHIC_BUILD_REPORT.md` to reflect the actual completed compile rather than the extractor-only `not_run` state.

## Verification

Paper 3 stale material was absent from the regenerated monolithic Paper 3 section. The search covered the stale markers previously detected in the monolith:

- `Non-circular`;
- `non-circular`;
- `Non-overlap`;
- `non-overlap`;
- `Corpus Role`;
- `proper location`;
- `later classes`;
- `Paper 7`.

Paper 4 regenerated section contains the new forensic material:

- `Admissibility Layers`;
- `Claim Classes Produced by the Protocol`.

Paper 6 regenerated section contains the new prediction/falsation material:

- `Identifiable Discriminator`;
- `Artifact Contract for Prediction Claims`.

Final log scan found no undefined references, undefined citations, empty bibliography, rerun requests, LaTeX fatal errors, or emergency stops.

## Final Artifacts

| Artifact | Value |
|---|---|
| PDF | `monolithic/QICN_MONOLITHIC.pdf` |
| Pages | 341 |
| PDF SHA256 | `28311FF57949121C7F41E2851CFDE928A43B3B6FD4A9AAA02303521914CACCFF` |
| TEX SHA256 | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` |
| LOG SHA256 | `D528CA11E5D904F3BB06E138F4F16B701E13444464742EE073314AB8B184A30F` |

## Residual Warnings

- Duplicate bibliography keys remain in `release/references.bib`.
- Inherited duplicate labels and hyperref anchors remain in the corpus.
- Dense tables and long technical tokens still produce overfull/underfull box warnings.

These are non-blocking build-quality warnings. They should be handled in a later bibliography/anchor/layout hygiene pass, not mixed into this content-integration rebuild.

