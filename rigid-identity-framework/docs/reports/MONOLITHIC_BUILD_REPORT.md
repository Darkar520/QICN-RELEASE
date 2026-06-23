# Monolithic Build Report v2

Status: MONOLITHIC_COMPILED
Date: 2026-06-23

## Boundary

This report records a physical LaTeX monolith build attempt. It does not certify theorem truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral status, or external adjudication.

Editorial policy: BaseCore is treated as the foundational layer rather than Paper 0; paper chapters are projected by direct research title rather than internal paper labels; recovered generated sections are reused when their source path is absent so the build does not delete existing monolith content.

## Source Extraction

| Source | Status |
|---|---|
| basecore/BASECORE.tex | extracted |
| paper1/main.tex | extracted |
| paper2/main.tex | extracted |
| paper3/main.tex | extracted |
| paper4/main.tex | extracted |
| paper5_operational_consciousness/main.tex | extracted |
| paper6_predictions_falsation/main.tex | extracted |
| paper7_operational_life_subjecthood/main.tex | extracted |
| paper8_first_person_subjectivity/main.tex | extracted |
| paper9_phenomenal_bridge_organization/main.tex | extracted |
| paper10_external_adjudication/main.tex | extracted |
| paper_bridge_operational_subjecthood/main.tex | extracted |

## Compile Result

- Status: compiled
- Exit code: 0
- PDF exists: true

## Compile Steps

| Step | Command | Exit code |
|---|---|---:|
| pdflatex pass 1 | `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex` | 0 |
| biber | `biber QICN_MONOLITHIC` | 0 |
| pdflatex pass 2 | `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex` | 0 |
| pdflatex pass 3 | `pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex` | 0 |

## Stdout Tail

```text
INFO - Writing 'QICN_MONOLITHIC.bbl' with encoding 'UTF-8'
INFO - Output to QICN_MONOLITHIC.bbl

[pdflatex pass 2]
/fonts/type1/public/lm/lmr8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lm
r9.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmri10.pfb><C:/Users/irisp/
MiKTeX/fonts/type1/public/lm/lmri8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/publi
c/lm/lmss10.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmsy10.pfb><C:/Use
rs/irisp/MiKTeX/fonts/type1/public/lm/lmsy6.pfb><C:/Users/irisp/MiKTeX/fonts/ty
pe1/public/lm/lmsy8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtk10.pfb
><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtt10.pfb><C:/Users/irisp/MiKTeX
/fonts/type1/public/lm/lmtt8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/l
mtt9.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtti10.pfb><C:/Users/iri
sp/MiKTeX/fonts/type1/public/amsfonts/symbols/msam10.pfb><C:/Users/irisp/MiKTeX
/fonts/type1/public/amsfonts/symbols/msbm10.pfb><C:/Users/irisp/MiKTeX/fonts/ty
pe1/public/rsfs/rsfs10.pfb>
Output written on QICN_MONOLITHIC.pdf (339 pages, 2860538 bytes).
Transcript written on QICN_MONOLITHIC.log.

[pdflatex pass 3]
/fonts/type1/public/lm/lmr8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lm
r9.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmri10.pfb><C:/Users/irisp/
MiKTeX/fonts/type1/public/lm/lmri8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/publi
c/lm/lmss10.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmsy10.pfb><C:/Use
rs/irisp/MiKTeX/fonts/type1/public/lm/lmsy6.pfb><C:/Users/irisp/MiKTeX/fonts/ty
pe1/public/lm/lmsy8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtk10.pfb
><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtt10.pfb><C:/Users/irisp/MiKTeX
/fonts/type1/public/lm/lmtt8.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/l
mtt9.pfb><C:/Users/irisp/MiKTeX/fonts/type1/public/lm/lmtti10.pfb><C:/Users/iri
sp/MiKTeX/fonts/type1/public/amsfonts/symbols/msam10.pfb><C:/Users/irisp/MiKTeX
/fonts/type1/public/amsfonts/symbols/msbm10.pfb><C:/Users/irisp/MiKTeX/fonts/ty
pe1/public/rsfs/rsfs10.pfb>
Output written on QICN_MONOLITHIC.pdf (339 pages, 2860538 bytes).
Transcript written on QICN_MONOLITHIC.log.

```

## Stderr Tail

```text
[pdflatex pass 1]
pdflatex: critical issue: You are running MiKTeX on an unsupported version of Windows.

[biber]
biber: critical issue: You are running MiKTeX on an unsupported version of Windows.

[pdflatex pass 2]
pdflatex: critical issue: You are running MiKTeX on an unsupported version of Windows.

[pdflatex pass 3]
pdflatex: critical issue: You are running MiKTeX on an unsupported version of Windows.

```
