# Canonical Freeze Record

- Generated at: `2026-03-07`
- Freeze status: `PASS_FROZEN_CANON_V3_PLUS_PAPER5`
- Doctrine status: `FROZEN_FOR_SCIENTIFIC_CYCLE`
- Bibliography source of record: `release/references.bib`
- Overview status for this cycle: `excluded_from_canonical_freeze_pending_technical_integration`

## Freeze Statement
The doctrine of the canonical QICN corpus is frozen for the current scientific cycle. No doctrinal edits, ownership shifts, or claim upgrades should be made while the falsification and differential-testing program defined in `scientific_program_ledger.*` is active.

## Included Canonical Sources

| Path | Role | SHA256 | Note |
|---|---|---|---|
| `rigid-identity-framework/CANONICAL_CORE.tex` | `core` | `620b7be40e1e19b35ccc694981d440f37fc691bbf8f59ea0a00794f7c0e3632c` | inherited from strict v3 scope |
| `rigid-identity-framework/paper1/main.tex` | `paper1` | `4195fda9ea7cbd26e206ed4162927e30ddadb9229caa3ad655fbf4caec895fc2` | inherited from strict v3 scope |
| `rigid-identity-framework/paper2/main.tex` | `paper2` | `2e31cb488e476244a8395f1c291af48514fa86a0ee88b7f7a6483ff381cf87f6` | inherited from strict v3 scope |
| `rigid-identity-framework/paper3/main.tex` | `paper3` | `2568f092ab1a1dbffa96499ca211f5354de0f0661e86b2a462f21a8e71ad2a02` | inherited from strict v3 scope |
| `rigid-identity-framework/paper4/main.tex` | `paper4` | `220f05e3d805075ed219662d3b05390fbaa5d565f692db5b3c102145f983ecda` | inherited from strict v3 scope |
| `rigid-identity-framework/paper5_operational_consciousness/main.tex` | `paper5` | `9FAAFECB58ED6E22A25F0DC7C3BE32CC3E3E346A128668A9FE5567CBFA3498FD` | canonical addendum anchored by release audit |
| `rigid-identity-framework/paper5_operational_consciousness/main.pdf` | `paper5_pdf` | `929FC3C7788E7246EC31D49E85B9CF8E55D5D2BB57C2C12267D20398CDF8DB6E` | compiled review artifact |
| `rigid-identity-framework/paper6_predictions_falsation/main.tex` | `paper6` | inherited from paper6 companion freeze | canonical companion anchored by release audit |
| `rigid-identity-framework/paper7_operational_life_subjecthood/main.tex` | `paper7` | `70c3cedf6cb1a3670f1fb5c4fc9b89b65fe77e7fa5b541567c7e434a8fb4a4e0` | canonical companion anchored by paper7 freeze commit |
| `rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf` | `paper7_pdf` | `800b1cb1d7b8d36ab51bb535d5176613f52782d63d9fa75ae8529b919c6d8f77` | compiled review artifact |
| `release/references.bib` | `bibliography` | `D847E87D315DD20B10301D8E11A3FB89F359F22CCE0105FB8ADCE55C144A514F` | canonical bibliography |
| `release_repo_qicn_2026-03-01/release/METHODS_GOVERNANCE_HUB.v1.md` | `annex_governance` | `7BBC4CFFDB20295C8DBEF690306CDA95E4D0F687CB99EF8C9EAE957C97EB3D92` | governance annex |
| `release_repo_qicn_2026-03-01/release/GLOSSARY_CANONICAL.v1.md` | `annex_glossary` | `A6C409B4DB2578AE6CAAC34515F11DE092434C1717889BEF627E2E4FA5331A37` | terminology annex |
| `release_repo_qicn_2026-03-01/release/TERM_MIGRATION_PLAN.v1.md` | `annex_term_migration` | `F1895AFEB9E91C2D2637A2EF219BDD885C8FA8A79A4B866FFE42C72AF04242D1` | migration annex |
| `release_repo_qicn_2026-03-01/release/STYLE_DISCLAIMER_POLICY.v1.md` | `annex_style_policy` | `4CADC573071533E497DE714D718191EE64F8673F10D9176B6BEBB85AD1FB1526` | policy annex |

## Excluded Historical Lineage

- `rigid-identity-paper/main.tex`
- `phenomenological-regimes-paper/main.tex`
- `phenomenological-instability-paper/main.tex`

These paths remain outside the source-of-record set for the current cycle.

## Strict Release Anchors Reused

- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/summary.json`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/manifest.json`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/release/RELEASE_SCOPE.v2.strict.json`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/release/RELEASE_SCOPE.v2.strict.sha256.txt`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/manifest.sha256.txt`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/pdf_corpus.zip.sha256.txt`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/editorial_changes.md`
- `artifacts/release_v2_scope_freeze_strict_v3_2026-03-06/editorial_changes.json`

## Strict Baseline Status Reused

- `status = WARN`
- `reason = non_blocking_biber_toolchain_warning`
- `counts_by_status = {"WARN_BIBER_NONZERO_BUT_RESOLVED": 5}`
- `policy_bibliography = biblatex + biber + release/references.bib`

## Paper V Canonical Addendum Anchor

- `artifacts/release_audit/paper5_operational_consciousness_build_summary.json`
- `artifacts/release_audit/paper5_final_hardening_summary.json`
- `artifacts/release_audit/paper5_corpus_alignment_check.md`

Paper V is treated as canonically frozen for the scientific cycle because:

- `status = PASS`
- `ready_for_serious_review = true`
- `page_count = 25`
- no corpus collision was detected with Core or Papers I--IV

## Overview Exclusion Decision

`artifacts/precursor_overview_rewrite_v1/framework_overview_strict.tex` is not part of this freeze.

Reason:

- overview rewrite summary: `status = WARN`, `ready_for_corpus_integration = false`
- integration audit: `status = BLOCKED_TECHNICAL`

The overview may remain a release companion, but it is not part of the frozen canonical doctrine for this experimental cycle.

## Freeze Consequence

Prediction work, falsification work, and reproducibility work must now target the frozen canon above. They must not mutate doctrine while tests are being run.
