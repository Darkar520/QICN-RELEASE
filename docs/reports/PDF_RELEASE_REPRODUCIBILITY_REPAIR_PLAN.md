# PDF Release Reproducibility Repair Plan

Status: PHASE_5_COMPLETED_AS_REPAIR_PLAN
Generated at: 2026-06-03
Scope: public PDF release reproducibility for `corpus/pdf_release/manifest.json`,
`release/canon_manifest.v1.json`, and `release/INDEX_PDFS.json`.

## Governance boundary

This plan addresses release reproducibility, source provenance, and path hygiene only.
It does not certify external support, consciousness, phenomenality, identity transfer,
bridge closure, peer review, empirical validation, or theorem truth.

No frozen manifest was edited in this phase. Regeneration is deferred to a future intentional
release pass with new hashes and sidecars.

## Executed audit

Command:

```powershell
node scripts\audit-public-release-reproducibility.cjs
```

Result:

- status: `PASS_WITH_TRACKED_GAPS`
- output JSON: `_build/canonical_hardening/public_release_reproducibility_audit.json`
- output Markdown: `_build/canonical_hardening/public_release_reproducibility_audit.md`

The audit script was extended in Phase 5 to expose exact status IDs for
`PASS_PDF_ONLY` and `DROP`.

## Exact status IDs

### PDF manifest PASS_PDF_ONLY

| docId | Source path | Current source exists | Decision |
|---|---|---:|---|
| `ea247e98e09de39b` | `NotebookLM/LaTeX/CANONICAL_CORE.tex` | no | Preserve as `preserved_pdf_only_nonreproducible`; do not promote as source-reproducible. |
| `bbe9bbb48ddf4f9c` | `NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/CANONICAL_CORE.tex` | no | Preserve as duplicate NotebookLM PDF-only lineage; collapse or remove in a regenerated release if active BaseCore supersedes it. |
| `3b77e7b20616cf25` | `rigid-identity-framework/CANONICAL_CORE.tex` | no | Preserve as legacy PDF-only only if needed for provenance; active source is `rigid-identity-framework/basecore/BASECORE.tex`. |
| `44806ece96bbdae2` | `rigid-identity-framework/paper4/main.tex` | yes | Repair candidate: compile source and replace PDF-only status only after source-to-PDF parity is verified. |

### Canon manifest PASS_PDF_ONLY

| doc_family_id | Source path | Current source exists | Decision |
|---|---|---:|---|
| `paper4.qicn_v45_protocol` | `rigid-identity-framework/paper4/main.tex` | yes | Repair candidate; remove duplicated canon rows during a regenerated manifest pass. |

## DROP inventory and decisions

| docId | Source path | Current source exists | Failure class | Decision | Justification |
|---|---|---:|---|---|---|
| `5ed0fc6980f70ed3` | `artifacts/hygiene_test_corpus/bad_paper.tex` | no | `LATEX_BUILD_FAILED`; out-of-scope/incomplete | Remove from regenerated public release | Hygiene test corpus is not canonical release material; source absent in current checkout. |
| `e51133fddd53cd17` | `formalizacion_latex/QICN_ONTOLOGICAL_FRAMEWORK.tex` | no | `LATEX_BUILD_FAILED`; `\beth` redefinition | Degrade to non-release mirror until recovered | Source absent and appears to be an older formalization lineage, not active canon. |
| `12104f106a85b975` | `NotebookLM/LaTeX/QICN_ONTOLOGICAL_FRAMEWORK.tex` | no | `LATEX_BUILD_FAILED`; `\beth` redefinition | Degrade to non-release mirror until recovered | Duplicate NotebookLM lineage; source absent in current checkout. |
| `197ebf2656ecb13e` | `NotebookLM/LaTeX/QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex` | no | `LATEX_BUILD_FAILED`; title-line `\\[1.5em]` fatal; no PDF and fix deferred | Remove from regenerated release until source is recovered | There is no current source or validated PDF in this checkout; repair requires source recovery first. |
| `8dfa40f9296a18fe` | `NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/QICN_ONTOLOGICAL_FRAMEWORK.tex` | no | `LATEX_BUILD_FAILED`; `\beth` redefinition | Degrade to non-release mirror until recovered | Duplicate NotebookLM lineage; source absent in current checkout. |

## Local path hygiene

The current frozen PDF manifest still records local build paths inside diagnostic fields such as
fatal snippets. This phase does not hand-edit the manifest. The next regeneration pass must either:

1. sanitize diagnostic snippets before serializing the public manifest, or
2. keep diagnostics in a separate non-public build audit artifact while the public manifest stores
   only repo-relative paths and portable placeholders.

Closure criterion for a regenerated release: zero `C:\Users\...`, `OneDrive\...`, `MiKTeX`, or
other local workstation paths in public manifests.

## Repair order for future regeneration

1. Repair `paper4.qicn_v45_protocol` first because its source exists and canon currently marks it
   `PASS_PDF_ONLY`.
2. Treat the three `QICN_ONTOLOGICAL_FRAMEWORK` DROP entries as one lineage family; recover one
   authoritative source, fix the `\beth` macro collision, then decide whether the lineage belongs
   in public release or archive-only material.
3. Remove `bad_paper.tex` from public release candidates; keep only as a local hygiene-test fixture
   if the source is intentionally restored.
4. Recover `QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex` before attempting repair; if not recovered,
   keep it out of regenerated public release.
5. Regenerate the PDF manifest in one intentional pass, then write new sidecar hashes. Do not edit
   frozen manifests in place.

## Phase 5 verification

| Check | Result |
|---|---|
| Auditor lists exact PASS_PDF_ONLY IDs | PASS |
| Auditor lists exact DROP IDs | PASS |
| Five DROP entries have decisions | PASS |
| PDF-only entries have repair/degrade policy | PASS |
| Frozen manifests hand-edited | NO |
| Regenerated public manifests contain zero local paths | Not applicable; regeneration deferred |

## Verdict

PHASE_5_COMPLETED_AS_REPAIR_PLAN. Public release reproducibility remains
`PASS_WITH_TRACKED_GAPS` until a future regeneration pass repairs, degrades, or removes the
document families listed above and writes new manifest hashes.
