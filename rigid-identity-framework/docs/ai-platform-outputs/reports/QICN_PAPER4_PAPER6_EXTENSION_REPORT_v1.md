# QICN Paper 4 and Paper 6 Extension Report v1

Status: PAPER4_PAPER6_EXTENDED_AND_RECOMPILED
Date: 2026-06-03

## Boundary

This report records source-preserving manuscript edits and recompilation for Paper 4 and Paper 6. It does not certify theorem truth, external empirical validation, consciousness, phenomenality, identity transfer, agency, moral status, or publication acceptance.

The edits were made directly on the existing LaTeX sources:

- `paper4/main.tex`
- `paper6_predictions_falsation/main.tex`

No PDF was regenerated from scratch without source. No existing paper PDF was deleted.

## Local Rules Applied

- Reports and AI-generated documentation are stored under `docs/ai-platform-outputs/`.
- Paper edits iterate over the existing canonical LaTeX sources.
- Added material must provide definitions, criteria, protocols, failure conditions, reproducibility structure, or claim-boundary discipline.
- Paper text must not contain self-defensive editorial language about avoiding circularity or non-overlap. The manuscript must enforce those constraints through technical structure rather than meta-commentary.

## Paper 4 Changes

Target: `paper4/main.tex`

Added technical material:

- admissibility layers for physical, protocol, and inferential integrity;
- definition of admissible evidence cells;
- no-rescue rule for favorable metrics from failed forensic packets;
- tamper and sham controls;
- evaluator specificity proposition and proof;
- audit-trail / chain-of-custody contract;
- comparator coverage vector and comparator adequacy criterion;
- negative-control pass definition;
- hierarchical decision rule;
- practical irrelevance band;
- missingness and exclusion accounting;
- escalation block criterion;
- claim classes produced by the protocol.

Editorial correction:

- renamed the existing `Metric Circularity Risk` threat heading to `Endpoint Contamination Risk`.

## Paper 6 Changes

Target: `paper6_predictions_falsation/main.tex`

Added technical material:

- identifiable discriminator definition;
- discriminator usefulness criterion;
- near-miss value proposition and proof;
- prediction severity table;
- doctrinal refutation candidate definition;
- methodological defeat definition;
- artifact failure definition;
- specificity-of-failure criterion;
- failure-class consequence table;
- boundary geometry section;
- boundary adequacy criterion;
- localized transition proposition and proof;
- artifact bundle contract;
- bundle sufficiency criterion;
- externalization readiness criterion.

Editorial correction:

- replaced explicit circularity language in the methodological status and priority discriminator tables with same-lineage measurement-dependence language.

## Recompilation

Commands executed for both papers:

```text
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

`pdflatex` completed with exit code 0 for both papers. `biber` completed with exit code 0 for both papers.

Residual `biber` warnings are duplicate bibliography keys in `release/references.bib`. These warnings are inherited from the shared bibliography and do not block PDF generation.

Final log scan found no:

- undefined references;
- empty bibliography;
- LaTeX fatal errors;
- emergency stops;
- rerun requests.

## Page Counts

| Paper | Previous pages | Final pages |
|---|---:|---:|
| Paper 4 | 14 | 16 |
| Paper 6 | 19 | 22 |

## Hashes

### Before edit

| File | SHA256 |
|---|---|
| `paper4/main.tex` | `9DA8A690470E55901D778A9FAAE454229137B482A8C4E7CC5B24BE790C26B1DD` |
| `paper4/main.pdf` | `97A724DF0AB8AFA7F4CF0400AD3BB005152CD427753C0AAC59CD86B9807E18A2` |
| `paper6_predictions_falsation/main.tex` | `C096849F10CFAD63D4EAF1E7C5341807ABAD48BDEDDDB73EB8A9307B2F73B359` |
| `paper6_predictions_falsation/main.pdf` | `20CF3C1EB76B85926E3D333B98558F7D0C751D8ACA5050C9120A499FFE728EFD` |

### After edit

| File | SHA256 |
|---|---|
| `paper4/main.tex` | `2397897F84CC4589D5789AB0CBFD29BF3E9C5CB3144A96135C7209D5D93168F9` |
| `paper4/main.pdf` | `2578EB27783876672F28ED8E58578542154DDD2DCE9023E3069F39A531875D0D` |
| `paper6_predictions_falsation/main.tex` | `81A85213DF2D4BCC3D542434578130316B1FF14860BC7CA5C0BB891E968E5127` |
| `paper6_predictions_falsation/main.pdf` | `E646A7206AA66FD57BEAD17D412AE9F89779BDFF5983D4B6E3FE88E154C7E0CA` |

## Residual Risks

- Some overfull/underfull box warnings remain, mainly from dense tables and long technical tokens. They are layout-quality issues, not compilation failures.
- The shared bibliography still contains duplicate keys and should be cleaned in a separate bibliography hygiene pass.
- The monolithic volume has not yet been rebuilt from these final Paper 4 and Paper 6 sources.

