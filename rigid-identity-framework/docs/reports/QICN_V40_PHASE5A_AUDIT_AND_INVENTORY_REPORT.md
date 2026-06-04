# QICN v40 Phase 5A Audit and Inventory Report

Status: COMPLETED_AS_AUDIT / REPAIR_PENDING
Date: 2026-06-04

## Boundary

This report closes only the audit and inventory subphase of Phase 5. It does not close
Phase 5, does not certify public release readiness, and does not promote any theoretical,
phenomenological, consciousness, identity, agency, or empirical validation claim.

Phase 5A is an evidence-gathering and synchronization pass. It records what exists, what
is inconsistent, and what must be repaired in Phase 5B.

## Subphase Definition

| Subphase | Purpose | Status |
|---|---|---|
| Phase 5A | Audit public release reproducibility, source-PDF inventory, hashes, pages, and residual warnings | COMPLETED_FOR_CURRENT_SNAPSHOT |
| Phase 5B | Repair public release gaps, bibliography duplicates, label/anchor collisions, layout warnings, rebuild affected PDFs, and close Phase 5 | PENDING |

## Commands and Tools

| Tool / command | Result |
|---|---|
| `Get-Content rigid-identity-framework\INSTRUCCIONES.md` | Read current governance instructions before editing |
| `Get-Content rigid-identity-framework\docs\reports\QICN_GLOBAL_ROADMAP_v40.md` | Read current roadmap status |
| `Get-Content rigid-identity-framework\docs\reports\QICN_V40_PHASE5_PDF_REPRODUCIBILITY_STATUS.md` | Read current Phase 5 status |
| `Get-Content docs\reports\PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md` | Confirmed root repair plan exists |
| `rg --files \| rg "PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN|QICN_V40_PHASE5"` | Located root and rigid-local Phase 5 artifacts |
| `node scripts\audit-public-release-reproducibility.cjs` | Exit 0; status `PASS_WITH_TRACKED_GAPS` |
| Python `pypdf` inventory script | Produced page counts and SHA256 hashes for BaseCore, Papers 1-10, Bridge Paper, and monolithic |
| `rg -n "Duplicate entry key\|Warning--\|ERROR\|WARN" monolithic.blg paper4.blg paper6.blg` | Found duplicate bibliography warnings; inspected logs end with `INFO - WARNINGS: 54` |
| `rg -n "Label `.* multiply defined\|destination with the same identifier\|Overfull\|Underfull\|LaTeX Warning: There were multiply-defined labels" monolithic.log` | Found duplicate labels, duplicate anchors, and layout warnings |
| `apply_patch` | Updated instructions/status/reporting files |

## Public Release Reproducibility Audit

Fresh audit command:

```powershell
node scripts\audit-public-release-reproducibility.cjs
```

Result:

```json
{
  "status": "PASS_WITH_TRACKED_GAPS",
  "output_json": "_build\\canonical_hardening\\public_release_reproducibility_audit.json",
  "output_markdown": "_build\\canonical_hardening\\public_release_reproducibility_audit.md"
}
```

Fresh audit findings:

- `canon_manifest_has_pdf_only_sources`;
- `pdf_release_manifest_has_pdf_only_entries`;
- `pdf_release_manifest_has_dropped_entries`;
- `pdf_release_manifest_contains_local_build_paths`;
- `freeze_manifest_records_dirty_worktree_at_hardening_start`.

Fresh audit counts:

| Counter | Value |
|---|---:|
| `SOURCE_OK` | 19 |
| `PASS_PDF_ONLY` source statuses | 2 |
| `PRESERVED_VARIANT` | 12 |
| `UNKNOWN` | 2 |
| PDF manifest `PASS` | 22 |
| PDF manifest `PASS_PDF_ONLY` | 4 |
| PDF manifest `DROP` | 5 |
| PDF manifest `SKIP_DUPLICATE_CANONICAL` | 2 |
| PDF manifest total | 33 |

Exact IDs:

| Class | IDs |
|---|---|
| `pdf_manifest_PASS_PDF_ONLY_docIds` | `ea247e98e09de39b`, `bbe9bbb48ddf4f9c`, `3b77e7b20616cf25`, `44806ece96bbdae2` |
| `pdf_manifest_DROP_docIds` | `5ed0fc6980f70ed3`, `e51133fddd53cd17`, `12104f106a85b975`, `197ebf2656ecb13e`, `8dfa40f9296a18fe` |
| `canon_manifest_PASS_PDF_ONLY_doc_family_ids` | `paper4.qicn_v45_protocol`, `paper4.qicn_v45_protocol` |

## Public Release Decisions Inherited From Root Repair Plan

The repository-root report `docs/reports/PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md`
already records repair/degrade/remove decisions for the public-release audit. Phase 5A
does not mutate those decisions. It verifies that the current audit still exposes the
same key classes.

Important correction to prior local status:

- the root repair plan exists;
- the missing item was not the plan itself, but a rigid-local Phase 5 status/report that
  reconciled the root plan with the current paper and monolithic rebuild state.

## Source-PDF Inventory

| Unit | Source exists | PDF exists | Pages | TEX SHA256 | PDF SHA256 |
|---|---:|---:|---:|---|---|
| BaseCore | yes | yes | 40 | `4A8F92DC4E47272E3C3A8D502D9748FA1FA4FD50789B931B9D297C0DD417FF0D` | `4E3AE62300371F63A3D1C292CBC247946F6F68528A55224A92764DCEA91700A2` |
| Paper 1 | yes | yes | 26 | `81F3A0CE113087A9AFD7BB02A536E8D7111EFC5CE9444FC60D58DE154CAD6714` | `312023656AB79965B63182DA60EB17A0F05E8E784AD12119ADF39DA6E1DF5620` |
| Paper 2 | yes | yes | 17 | `26304FEA9BFBF54EA90BF56C5E386E853DD8A530A0724B23AAB1EFCC51A81871` | `8C697985B3F5131C322F58E9243C43BD50B2BB7C9A5ABFAC1E6718D4595A52F3` |
| Paper 3 | yes | yes | 17 | `E437C515B200A557950CDFA37F4A171B162A1DDB0E6A57DC04C6234BF9DB596F` | `5856B98441BDFEA4A7C4AEDFDCF7F1C7EB7FC122A03537AC8CD29DFEF2681A23` |
| Paper 4 | yes | yes | 16 | `2397897F84CC4589D5789AB0CBFD29BF3E9C5CB3144A96135C7209D5D93168F9` | `2578EB27783876672F28ED8E58578542154DDD2DCE9023E3069F39A531875D0D` |
| Paper 5 | yes | yes | 25 | `C157E62D397C7D8765863490545A30F8B1C3918565D3685930BD00EBCA491E0D` | `97769050EB1F180804E9F202EC9A4E6F9A8FECDEED4CBD5F319A89C7EE015076` |
| Paper 6 | yes | yes | 22 | `81A85213DF2D4BCC3D542434578130316B1FF14860BC7CA5C0BB891E968E5127` | `E646A7206AA66FD57BEAD17D412AE9F89779BDFF5983D4B6E3FE88E154C7E0CA` |
| Paper 7 | yes | yes | 28 | `E6641786A1BEE4023B471EE2BA524E38CD15E218788884044D3114A57E224198` | `B4FAD95E7A43611556BA89ADA8AD31E6D4258412AAA8CC8DA6B7CE9C5D8B706F` |
| Paper 8 | yes | yes | 42 | `B6F40959B4D828D02DA7BA9B960546CF1BEA5538F34A93C2D71F8C4AF2C7AAF9` | `754E421C96CB30F40FC74F07FFBBFC265B98F71F27A07A40026F094A5141835F` |
| Paper 9 | yes | yes | 42 | `4CB2C17CC94F9931D0589EE3B3DDCB3252E2A308195E477CED11F8340E825192` | `EFC3A8FFB6620AF5FFD7BBD13BECDC3EB2848A2B49F1DBB3B8028D25FC9713E6` |
| Paper 10 | yes | yes | 30 | `E57C031020D5362537EE196724675EF64EF9AA85DCAF7EA1F7955860BC74D7C4` | `3E0EA9EACFB1F6F2E42A1BE62708F6426C2929DA87C8337753B6DD397DCA119C` |
| Bridge Paper | no | no | missing | missing | missing |
| Monolithic | yes | yes | 341 | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` | `28311FF57949121C7F41E2851CFDE928A43B3B6FD4A9AAA02303521914CACCFF` |

## Findings

### F5A-01 - Paper 4 public-release mismatch

The active source and PDF for Paper 4 exist, but the public release audit still reports
`paper4.qicn_v45_protocol` as `PASS_PDF_ONLY`. This means the release metadata or
audit mapping remains stale relative to the active paper source.

Required Phase 5B action:

- repair the release mapping or regenerate the affected release manifest through the
  approved release pipeline;
- do not hand-edit frozen manifests.

### F5A-02 - Bridge Paper declared path is not reproducible

The declared Bridge Paper path does not contain a direct `main.tex` / `main.pdf` pair.
The monolithic build preserves Bridge content through a recovered section path, but that
does not make the declared Bridge Paper path reproducible.

Required Phase 5B action:

- either recover a canonical Bridge Paper source/PDF pair, or formally mark the declared
  path as `SOURCE_RECOVERY_REQUIRED_FOR_DECLARED_PATH`.

### F5A-03 - Bibliography duplicate keys remain

`biber` logs for active recent builds still report duplicate bibliography keys. These are
non-fatal but they weaken release cleanliness and can cause unstable citation resolution.

Required Phase 5B action:

- deduplicate canonical bibliography entries while preserving differing fields;
- rerun affected builds.

### F5A-04 - Monolithic labels and anchors remain duplicated

The monolithic build still inherits duplicate labels and duplicate `hyperref` anchors from
paper-level sources. The PDF compiles, but cross-reference and anchor quality remain
unclean.

Required Phase 5B action:

- namespace paper-level labels in the monolithic build process or repair labels at source
  level where safe;
- rerun monolithic build and log scan.

### F5A-05 - Layout warnings remain

The monolithic log includes overfull/underfull warnings. These are non-fatal, but Phase 5B
must classify them before closure.

Required Phase 5B action:

- classify each relevant warning as harmless, table-width, long-token, or structural;
- repair warnings that impair readability.

## Regression Check

Phase 5A did not edit paper content, public manifests, or frozen release manifests. The
only modifications in this pass are governance/status/reporting artifacts.

No Phase 6 work was started.

## Phase 5B Handoff

Proceed to Phase 5B only after accepting this audit inventory as the current baseline.
Phase 5B must implement repairs against the current sources and must finish with a final
Phase 5 report containing commands, hashes, pages, warnings, and residual risks.

## Non-Claim

This report is an audit artifact. It does not validate external behavior, does not prove
theoretical claims, and does not certify release or publication readiness.
