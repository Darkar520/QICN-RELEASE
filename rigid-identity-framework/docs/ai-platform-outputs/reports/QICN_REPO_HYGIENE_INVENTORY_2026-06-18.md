# QICN Repo Hygiene Inventory (2026-06-18)

Status: `NON_DESTRUCTIVE_REPO_HYGIENE_INVENTORY`

Scope: root `QICN-FRAMEWORK/`, structural/provenance pass only.

Non-actions: no files moved, no files deleted, no mathematical/canonical claims changed.

## Top-Level Folder Inventory

Counts and sizes are approximate, measured recursively from the repository root.

| Folder | Files | Approx. size MB | LastWriteTime | Duplication / independence assessment |
|---|---:|---:|---|---|
| `.claude` | 2 | 0.01 | 2026-01-08 12:51:30 | Local/tooling metadata; not a QICN canonical source. |
| `.kilocode` | 1 | 0.00 | 2026-05-04 20:51:51 | Local/tooling metadata; keep separate from theory corpus. |
| `.playwright-mcp` | 10 | 56.23 | 2026-05-25 13:14:52 | Tool/runtime support; independent from QICN mathematical corpus. |
| `.pnpm-store` | 0 | 0.00 | 2026-06-07 22:06:41 | Package-store/cache surface; generated or environment-like. |
| `.venv-phase7` | 6244 | 219.02 | 2026-06-14 20:59:20 | Python environment for Phase 7 tooling; generated environment, not source. |
| `.vscode` | 2 | 0.00 | 2026-02-22 23:11:12 | Editor metadata; independent. |
| `__pyphi_cache__` | 1 | 0.00 | 2026-06-14 18:23:53 | PyPhi cache; generated artifact. |
| `_build` | 2026 | 59.11 | 2026-06-18 11:09:59 | Build artifacts; generated, not source. |
| `artifacts` | 2833 | 23.66 | 2026-05-22 22:26:06 | Output/artifact surface; review provenance before pruning. |
| `corpus` | 29 | 18.00 | 2026-05-25 13:14:53 | Root corpus surface; governance-sensitive, no automatic cleanup. |
| `docs` | 18 | 0.15 | 2026-06-17 22:54:39 | Root documentation surface; not automatically duplicate of inner docs. |
| `phenomenological-instability-paper` | 8 | 0.10 | 2026-05-25 13:14:52 | Parallel paper directory; likely historical/independent package, review before archiving. |
| `phenomenological-regimes-paper` | 11 | 0.19 | 2026-05-25 13:14:52 | Parallel paper directory; likely historical/independent package, review before archiving. |
| `photoshop-mcp` | 7723 | 100.63 | 2026-06-07 22:19:10 | Independent project inside same workspace; not duplicate QICN material. |
| `QICN GPT5.5` | 380 | 43.68 | 2026-05-25 13:14:52 | Historical/parallel QICN package candidate; needs human diff before any archive decision. |
| `release` | 47 | 0.34 | 2026-05-26 13:41:04 | Governance/release surface; immutable by convention, no cleanup here. |
| `rigid-identity-framework` | 122426 | 7065.90 | 2026-06-17 20:25:22 | Active framework worktree and primary source-of-truth surface. |
| `rigid-identity-paper` | 11 | 0.19 | 2026-05-25 13:14:53 | Parallel paper directory; likely historical/independent package, review before archiving. |
| `scripts` | 7 | 0.10 | 2026-06-02 12:37:44 | Root verification/tooling scripts; active governance support. |

## Suspicious Stale / Noise Surfaces

These entries are flagged for provenance review only. A flag does not imply deletion or invalidity.

| Path | SHA256 | LastWriteTime | Reason flagged |
|---|---|---|---|
| `ANALISIS_GENERAL_PROYECTO.md` | `D49E9D93AB4A1408AECE84014FB65DCB02651E5E842CC0F110E1000113DEE78A` | 2026-06-18 11:51:37 | Root analysis now marked `SUPERSEDED / STALE`; describes a runtime tree not present in current `QICN-FRAMEWORK`. |
| `rigid-identity-framework/docs/ai-platform-outputs/audits/AUDIT_EXTERNAL_2026-06-10.md` | `2FABF713A9F97BFA6808FE0E9C60F303B31EF4C0EBAC3EDA2CC6883CCE977F5D` | 2026-06-10 20:22:11 | Contains explicit stale-hash/reemit warnings; useful as audit history, not current verdict by itself. |
| `rigid-identity-framework/docs/ai-platform-outputs/audits/REPO_HYGIENE_AUDIT_2026-06-13.md` | `A67704ECA24C967973D782D00843CC26D117BC23965603C644F23FA766C1B4E0` | 2026-06-12 19:11:59 | Already identifies known stale/debt-bearing surfaces; should be cross-checked before acting. |
| `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_MONOLITHIC_REBUILD_AFTER_PAPER3_4_6_REPORT_v1.md` | `3C5B11B37067B5ED628D5E32EF3D87A45F591CDA2C59EF56DD2B1C8AB49E7EC0` | 2026-06-03 22:14:05 | Mentions stale material absent from monolithic; historical build report. |
| `rigid-identity-framework/docs/ai-platform-outputs/extractions/QICN_MONOLITHIC_2026-06-10.txt` | `CF408DF27DE74DEC13AF0FE7FF453ACE89492244866517AB0761F36FB1EC7851` | 2026-06-10 22:14:25 | Large extraction artifact with repeated stale/superseded text hits; keep as generated evidence unless reviewed. |

Age note: no action was taken based solely on file age. The flags above came from explicit stale/superseded/provenance text or known mismatch with the present tree.

## PROPUESTA (requiere aprobacion humana, NO ejecutada)

1. Keep `rigid-identity-framework/` as the active source-of-truth workspace for QICN work.
2. Review `QICN GPT5.5/` with a human diff against active framework material; if it is historical only, mark with a superseded README before any archive or move.
3. Review `rigid-identity-paper/`, `phenomenological-instability-paper/`, and `phenomenological-regimes-paper/` against active paper surfaces; if they are historical copies, mark provenance before changing layout.
4. Treat `.venv-phase7/`, `_build/`, `__pyphi_cache__/`, and `.pnpm-store/` as generated/environment surfaces; prefer `.gitignore` policy or regeneration notes before cleanup.
5. Keep `release/`, `corpus/`, and root `scripts/` untouched unless a separate governance-approved task explicitly targets them.
6. Preserve `photoshop-mcp/` as an independent project or move it outside the QICN workspace only after explicit human approval.
7. Reemit or mark stale audit/build reports only after a human decides which report is meant to be current; do not delete historical audit evidence automatically.

## Verification Notes

- No destructive command was run.
- No Lean build or `.lean` file was touched in this pass.
- `ANALISIS_GENERAL_PROYECTO.md` is ignored by `.gitignore`; adding the requested banner to version control requires explicit forced staging.
