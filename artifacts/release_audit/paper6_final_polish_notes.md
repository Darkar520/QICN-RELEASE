# Paper6 Final Polish Notes

## Scope
This pass was strictly limited to `paper6_predictions_falsation` and its release-audit traces. No canonical doctrinal `.tex` source outside Paper VI was modified.

## Changes applied
1. Metadata author unification:
   - visible author now uses the accented canonical form via macros;
   - PDF metadata author uses the same accented TeX form;
   - extracted first-page text preserves `Johnny Andrey Pérez Ramírez` correctly.
2. Density lift without doctrinal padding:
   - expanded the discriminators section with a compact rival-structure compression table;
   - added a final claim freeze table with `Claim / Status / Current blocker / Next step`;
   - final PDF length moved from 17 pages to 19 pages.
3. Freeze readiness:
   - the paper remains non-doctrinal and prediction/falsification-centered;
   - explicit status categories remain visible;
   - no new claims were promoted beyond current internal support.

## Verification
- Compile: PASS
- Final PDF: `rigid-identity-framework/paper6_predictions_falsation/main.pdf`
- Page count: 19
- Bibliography: canonical `release/references.bib`
- Undefined references/citations in final log: none detected
- Regression signal: `paper1..paper5` doctrinal sources were not edited in this pass

## Residual note
`pdfinfo` on Windows still renders the accented metadata string as mojibake (`PAŠrez`). The visible PDF title block and `pdftotext` extraction both preserve the accented author name correctly. The remaining mismatch is treated as a metadata-decoding/toolchain-display limitation rather than a visible-PDF or text-layer failure.
