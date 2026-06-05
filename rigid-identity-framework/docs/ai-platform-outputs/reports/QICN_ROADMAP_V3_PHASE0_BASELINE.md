# QICN Roadmap Principal / v3 - Phase 0 Baseline

Status: PHASE_0_BASELINE_COMPLETE_NO_THEORY_EDITS
Date: 2026-06-05
Workspace: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK`
Active roadmap: `rigid-identity-framework/ROADMAP.md`

## Boundary

This report implements Phase 0 of the principal roadmap. It establishes the baseline,
inventory, hashes, scope, exclusions, and risks before any theory or paper editing.

This phase does not certify external validation, consciousness, phenomenality, identity
transfer, publication readiness, peer review, rival adjudication, or bridge-burden closure.

No theoretical content, paper source, PDF, registry, script, bibliography, or monolithic
source was edited in this phase.

## Git Baseline

Commands:

```powershell
git status --short
git status -sb
git rev-parse HEAD
git branch --show-current
```

Observed state before Phase 0 report creation:

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `19a3b75ad29377a8235a126bc3e8288c67cf3332` |
| Status short | empty |
| Remote relation | `main...origin/main [ahead 1]` |
| Interpretation | Local workspace was clean; one prior roadmap commit had not been pushed. |

The `ahead 1` state is not a dirty-worktree issue. It means the previous local roadmap
commit exists locally and is not yet on `origin/main`.

## Repository Inventory

Command:

```powershell
rg --files rigid-identity-framework
```

Observed file count under `rigid-identity-framework`: `422`.

Extension inventory:

| Extension | Count |
|---|---:|
| `.md` | 186 |
| `.json` | 84 |
| `.js` | 74 |
| `.tex` | 37 |
| `.pdf` | 24 |
| `.bib` | 7 |
| `.txt` | 2 |
| `.jsonl` | 2 |
| `.ps1` | 1 |
| `.dot` | 1 |
| no extension | 1 |
| timestamp/backup-like extensions | 3 |

## Corpus Inventory

| Path | Files | `.tex` | `.pdf` | `.md` | `.json` | Baseline status |
|---|---:|---:|---:|---:|---:|---|
| `rigid-identity-framework/basecore` | 29 | 12 | 1 | 15 | 0 | source/PDF present |
| `rigid-identity-framework/paper1` | 10 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper2` | 10 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper3` | 10 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper4` | 9 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper5_operational_consciousness` | 9 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper6_predictions_falsation` | 9 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper7_operational_life_subjecthood` | 9 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper8_first_person_subjectivity` | 9 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper9_phenomenal_bridge_organization` | 11 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/paper10_external_adjudication` | 6 | 1 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/monolithic` | 26 | 15 | 1 | 0 | 0 | source/PDF present |
| `rigid-identity-framework/registry` | 6 | 0 | 0 | 0 | 4 | registry present |
| `rigid-identity-framework/release` | 1 | 0 | 0 | 0 | 0 | references only |
| `rigid-identity-framework/docs` | 277 | 11 | 11 | 163 | 79 | documentation and reports present |
| `rigid-identity-framework/docs/reports` | 135 | 1 | 0 | 86 | 47 | report corpus present |
| `rigid-identity-framework/docs/ai-platform-outputs` | 25 | 5 | 7 | 9 | 2 | AI output trace present |

## Critical Hashes

| Path | SHA256 |
|---|---|
| `rigid-identity-framework/ROADMAP.md` | `A53C49B141D2737D772F4E91B503A278E308E3B790D5EFD374EE18321700A8F5` |
| `rigid-identity-framework/INSTRUCCIONES.md` | `00A675B60D1D6FCAC9ED3F2515E17C931AC58FD32FECC71C48FEB5F8C8E07B1C` |
| `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | `619C584ADEE164BD6DB6DFB641731B264793C6F95F765D2B061666D4FF13A34D` |
| `rigid-identity-framework/registry/theorems.jsonl` | `A1DB56DC38F40BF0C23178D8BF0FF4CBE5063C7CC08EBA72E6F2EA32156BB6A0` |
| `rigid-identity-framework/release/references.bib` | `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` |
| `release/references.bib` | `AB8059BC27032689EDC271A909681D1E39709F877961A2F3C96D8E9120BEB54A` |

## Source/PDF Baseline

Page counts were computed with bundled Python `pypdf`, because MiKTeX `pdfinfo` failed
with an AppData permission/setup error:

```text
ERROR trace.pdfinfo.core null - Acceso denegado.
Data: path="C:\Users\irisp\AppData\Roaming\MiKTeX\2.9"
It seems that this is a fresh TeX installation.
```

| Unit | Source path | Source SHA256 | PDF path | Pages | PDF SHA256 |
|---|---|---|---|---:|---|
| BaseCore | `basecore/BASECORE.tex` | `4A8F92DC4E47272E3C3A8D502D9748FA1FA4FD50789B931B9D297C0DD417FF0D` | `basecore/BASECORE.pdf` | 40 | `4E3AE62300371F63A3D1C292CBC247946F6F68528A55224A92764DCEA91700A2` |
| Paper 1 | `paper1/main.tex` | `81F3A0CE113087A9AFD7BB02A536E8D7111EFC5CE9444FC60D58DE154CAD6714` | `paper1/main.pdf` | 26 | `312023656AB79965B63182DA60EB17A0F05E8E784AD12119ADF39DA6E1DF5620` |
| Paper 2 | `paper2/main.tex` | `26304FEA9BFBF54EA90BF56C5E386E853DD8A530A0724B23AAB1EFCC51A81871` | `paper2/main.pdf` | 17 | `8C697985B3F5131C322F58E9243C43BD50B2BB7C9A5ABFAC1E6718D4595A52F3` |
| Paper 3 | `paper3/main.tex` | `E437C515B200A557950CDFA37F4A171B162A1DDB0E6A57DC04C6234BF9DB596F` | `paper3/main.pdf` | 17 | `5856B98441BDFEA4A7C4AEDFDCF7F1C7EB7FC122A03537AC8CD29DFEF2681A23` |
| Paper 4 | `paper4/main.tex` | `2397897F84CC4589D5789AB0CBFD29BF3E9C5CB3144A96135C7209D5D93168F9` | `paper4/main.pdf` | 16 | `2578EB27783876672F28ED8E58578542154DDD2DCE9023E3069F39A531875D0D` |
| Paper 5 | `paper5_operational_consciousness/main.tex` | `C157E62D397C7D8765863490545A30F8B1C3918565D3685930BD00EBCA491E0D` | `paper5_operational_consciousness/main.pdf` | 28 | `079F7AAEAEC53763BAA73400F266B62820AFE5B50ECAF24A6C469112C53BB9A5` |
| Paper 6 | `paper6_predictions_falsation/main.tex` | `81A85213DF2D4BCC3D542434578130316B1FF14860BC7CA5C0BB891E968E5127` | `paper6_predictions_falsation/main.pdf` | 22 | `E646A7206AA66FD57BEAD17D412AE9F89779BDFF5983D4B6E3FE88E154C7E0CA` |
| Paper 7 | `paper7_operational_life_subjecthood/main.tex` | `E6641786A1BEE4023B471EE2BA524E38CD15E218788884044D3114A57E224198` | `paper7_operational_life_subjecthood/main.pdf` | 28 | `29543CDDF3431B5032B2E4C583F5F019B16D668C1F7FBC2D9EDD85EEC29BC36A` |
| Paper 8 | `paper8_first_person_subjectivity/main.tex` | `B6F40959B4D828D02DA7BA9B960546CF1BEA5538F34A93C2D71F8C4AF2C7AAF9` | `paper8_first_person_subjectivity/main.pdf` | 43 | `5E761031D3E6A5DA9C0662DAE0D90659B5FF00EBDD1AF578ECCB99C83603F7A0` |
| Paper 9 | `paper9_phenomenal_bridge_organization/main.tex` | `AB53A73FB2E758B960FBC29829B10FFE351F4E947440A511E64FEC0557F7DACB` | `paper9_phenomenal_bridge_organization/main.pdf` | 42 | `266BE4037511F2AFC803F1B825BFA0182750C2BBD456B8CF7A2F29910E32F819` |
| Paper 10 | `paper10_external_adjudication/main.tex` | `E57C031020D5362537EE196724675EF64EF9AA85DCAF7EA1F7955860BC74D7C4` | `paper10_external_adjudication/main.pdf` | 33 | `C561FDEF26F932496989E3ADF36DC199D00745805470007EA58B84AC0692FDFD` |
| Monolithic | `monolithic/QICN_MONOLITHIC.tex` | `306B3771298B9027A590F5CE88E5597A450E60F4D4264F5131090827FF78CE0F` | `monolithic/QICN_MONOLITHIC.pdf` | 334 | `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785` |

## Registry And Release Baseline

Registry files present:

| File | Bytes |
|---|---:|
| `macros.jsonl` | 158606 |
| `prediction-canon-map.json` | 5845 |
| `prediction-schema.json` | 1977 |
| `schema.json` | 6428 |
| `theorems.delta.json` | 55 |
| `theorems.jsonl` | 999983 |

Release boundary:

- `rigid-identity-framework/release/references.bib` is present and hash-identical to root `release/references.bib`.
- Root `release/` contains public/canonical release maps and manifests. It is a reference/release surface, not an edit target for Phase 1 unless a later phase explicitly scopes it.

## Intocables For Iteration 1

Until Phase 1 produces an audit matrix, the following are read-only:

- all `.tex` sources under BaseCore, Papers 1-10, and monolithic;
- all `.pdf` artifacts;
- `registry/`;
- `release/`;
- `scripts/`;
- bibliography files;
- labels, macros, route names, paper names, registry IDs, and `\MO`;
- prior roadmaps under `docs/reports/`;
- generated monolithic build sections;
- AI recovery candidates under `docs/ai-platform-outputs/recovery-candidates/`.

## Allowed Scope For Next Phase

Phase 1 is audit-only. Allowed actions:

- read corpus files;
- compute exact paragraph hashes or block fingerprints;
- search for no-claims, defensive language, circularity, runtime-validation language, and high-risk terms;
- create `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE1_AUDIT.md`;
- update the ledger.

Phase 1 must not edit theory content, paper content, macros, labels, registry, scripts, PDFs, or bibliography.

## Risks Detected

| Risk | Baseline classification | Required handling |
|---|---|---|
| Local branch is `ahead 1` | push-state issue, not dirty worktree | Push only with explicit approval |
| `pdfinfo` blocked by MiKTeX AppData permission/setup | tooling limitation | Use bundled `pypdf` for page counts or fix MiKTeX separately |
| Principal roadmap contains two literal versions with formatting inherited from pasted text | intentional preservation | Do not normalize unless explicitly requested |
| Prior roadmaps contain details not repeated in `ROADMAP.md` | reference dependency | Preserve prior roadmaps as references |
| Phase 1 can become too broad | roadmap scope risk | Keep Phase 1 audit-only and split if the matrix grows too large |
| Runtime/internal support language may still be distributed across papers | expected audit target | Detect in Phase 1, do not edit yet |

## Phase 0 Closure Criteria

| Criterion | Status |
|---|---|
| No theoretical content edited | PASS |
| Git state recorded | PASS |
| Source/PDF inventory recorded | PASS |
| Hashes recorded | PASS |
| Page counts recorded | PASS, using bundled `pypdf` |
| Intocables identified | PASS |
| Allowed scope for next phase defined | PASS |
| Risks documented | PASS |
| Ledger updated | PASS, updated after report creation |

## Next Step

Proceed to Phase 1 only as an audit pass:

`QICN_ROADMAP_V3_PHASE1_AUDIT.md`

No content edits are allowed until Phase 1 produces a classified matrix of findings and the
user approves the next edit scope.

---

## Addendum 2026-06-05 - Baseline Corrections And Clarifications

Status: ADDENDUM_NO_REWRITE

This addendum corrects and clarifies the Phase 0 baseline without rewriting the original
report body.

### A. File Count Boundary: 422 vs Full-Repository Counts

The original `422` count was scoped to:

```powershell
rg --files rigid-identity-framework
```

That command intentionally counted only files under `rigid-identity-framework/`. It excluded
root-level and sibling project surfaces such as:

- root `docs/`;
- root `release/`;
- root `scripts/`;
- root `corpus/`;
- root changelog/readme/release-note files;
- root Docker/GitLab files;
- root audit reports.

Fresh verification after Phase 0 report creation produced:

| Count command | Current count | Interpretation |
|---|---:|---|
| `rg --files rigid-identity-framework` | 423 | Current framework-subtree count; it is 1 higher than the original baseline because this Phase 0 report now exists. |
| `rg --files` | 531 | Current full repository count, including root-level docs, release, corpus, scripts, and repository metadata files tracked as ordinary files. |
| `rg --files -g '!rigid-identity-framework/**'` | 108 | Current count of files outside `rigid-identity-framework/`. |

If a `521` count is observed from another run, it should be treated as a full-repository or
different-scope count rather than the framework-subtree count used by this Phase 0 report.
The baseline's `422` was not a whole-repository claim.

### B. HEAD Correction

The original Git Baseline table captured the state before Phase 0 report creation:

- pre-Phase-0-report HEAD: `19a3b75ad29377a8235a126bc3e8288c67cf3332`;
- pre-Phase-0-report relation: `main...origin/main [ahead 1]`.

The correct Phase 0 closure commit is:

- Phase 0 closure commit: `78f4bdc`;
- full Phase 0 closure HEAD: `78f4bdcc79a580c1a29f7276d1e8fb433b786ca8`.

Therefore, any later reference to "the Phase 0 baseline commit" should use `78f4bdc`, not
the pre-report HEAD.

### C. Ledger Hash Boundary

The ledger hash listed in the original Critical Hashes table:

`619C584ADEE164BD6DB6DFB641731B264793C6F95F765D2B061666D4FF13A34D`

was computed before the Phase 0 ledger entry was appended. It is a pre-entry digest, not the
final post-entry ledger digest. Because the ledger records its own updates, a final ledger
hash must always be computed after the entry is closed and should not be interpreted as a
self-anchored immutable digest inside the same entry.

The post-Phase-0-report/pre-addendum ledger hash observed during this correction pass was:

`3402B4A10A65B218A168E5216E4296ABD4FCFAF0D0AC4099BFB4863DAFDF0E8A`

This addendum and its ledger entry will necessarily change that hash again.

### D. Bridge Paper Risk Added To Phase 0

Bridge-related files exist, including:

- `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex`;
- `rigid-identity-framework/docs/BRIDGE_HYPOTHESIS_LEDGER.md`;
- `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`;
- `rigid-identity-framework/basecore/core/sections/11_discrete_bridge.tex`;
- `rigid-identity-framework/docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md`;
- `rigid-identity-framework/docs/reports/PAPER9_BRIDGE_BURDEN_NARROWING.md`;
- `rigid-identity-framework/docs/reports/QICN_V40_PHASE2_BRIDGE_HYPOTHESIS_REPORT.md`.

The monolithic build also contains:

- `rigid-identity-framework/monolithic/build/sections/12-operational-consciousness-to-operational-subjecthood-bridge.tex`.

However, no independent `paper_bridge_operational_subjecthood/` source directory is present
in the active framework tree. This must be carried as a Phase 0 risk:

| Risk | Baseline classification | Required handling |
|---|---|---|
| Bridge Paper source/canonical-folder ambiguity | SOURCE_PROVENANCE_RISK | Do not treat monolithic recovered/generated bridge content as an independently maintained paper source until a dedicated source-recovery or source-canonicalization phase resolves it. |

### E. Optional Additional Hashes

| Path | SHA256 |
|---|---|
| `rigid-identity-framework/CHANGELOG_QICN_PATCH.md` | `F216D855989FD28ED47867B97AD5487DF27F8C091982D0C83B14F8273020F685` |
| `rigid-identity-framework/scripts/build-monolithic-volume.js` | `ACABA44C2E5AC652D5735380745C6214D7739E3A0A55537D441AE862CDF1799C` |

### F. Addendum Closure

This addendum does not alter Phase 0's substantive conclusion:

- no theoretical content was edited;
- Phase 1 remains audit-only;
- no paper, PDF, registry, release artifact, bibliography, script, or macro should be edited
  until Phase 1 produces a classified audit matrix and the user approves the next edit scope.
