# QICN-FRAMEWORK Repository Hygiene Audit

Date: 2026-06-13
Scope: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK`
Status: `PASS_WITH_TRACKED_HYGIENE_DEBT`

## Executive Verdict

The repository is structurally usable and can be pushed after the Phase 6.3 commits, but it should not absorb local agent tooling, adjacent projects, or broad generated dependency trees.

The main hygiene risk is not the tracked QICN framework. The main risk is workspace contamination from local tools and adjacent experiments.

## Versioned Surface

- Current branch before this audit: `main`.
- State before this audit: seven local Phase 6.3 commits ahead of `origin/main`.
- Tracked file count observed during audit: 579.
- No tracked `node_modules`, `.kiro`, `photoshop-mcp`, `opencode.jsonc`, root `AGENTS.md`, or root `ANALISIS_GENERAL_PROYECTO.md` entries were present before this audit.

## Files Classified For Versioning

These files are repository-relevant and should be versioned:

- `AGENTS.md`
  - Reason: root governance instructions for future agents.
  - Risk: contains operational constraints; this is useful, not noise.

- `rigid-identity-framework/docs/ai-platform-outputs/audits/AUDIT_EXTERNAL_2026-06-10.md`
  - Reason: external audit evidence; explicitly non-canonical and under AI-output boundary.

- `rigid-identity-framework/docs/ai-platform-outputs/prompts/CODEX_CONSOLIDATE_ROADMAP_VIVO_PROMPT.md`
  - Reason: prompt provenance for roadmap consolidation.

- `rigid-identity-framework/docs/ai-platform-outputs/prompts/CODEX_PHASE6_3D_RAW_SECOND_VARIABLE_SNR_CURVE_HONEST_ERROR_PROMPT.md`
  - Reason: prompt provenance for Phase 6.3D.

## Files Classified As Noise Or Local-Only

These should not be pushed into the QICN release repository:

- `photoshop-mcp/`
  - Classification: adjacent local project.
  - Observed risk: more than 7,700 files including `node_modules`.
  - Reason to exclude: unrelated MCP/Photoshop project; would corrupt repository focus and inflate clone size.

- `opencode.jsonc`
  - Classification: local agent/client config.
  - Observed risk: binds server to `0.0.0.0` and grants broad local permissions.
  - Reason to exclude: machine-local operational policy, not public QICN source.

- `rigid-identity-framework/.kiro/`
  - Classification: local agent steering/config.
  - Reason to exclude: tool-local guidance, not canonical project source.

- `ANALISIS_GENERAL_PROYECTO.md`
  - Classification: one-off external analysis snapshot.
  - Reason to exclude: contains broad claims and workspace assumptions; any useful content should be curated into formal AI-output audits before publication.

- `rigid-identity-framework/docs/ai-platform-outputs/extractions/QICN_MONOLITHIC_2026-06-10.txt`
  - Classification: raw PDF text dump.
  - Observed risk: about 22,771 lines and fails `git diff --check` with massive layout-preserved trailing whitespace.
  - Reason to exclude: useful as local evidence, but too noisy for a professional public repo unless compressed, hashed, or curated into a smaller extraction report.

## Known Stale Or Debt-Bearing Surfaces

These are not fixed in this hygiene pass because doing so would require a separate scientific or release-governance task:

- PDF hash freshness debt remains open in older Phase 5B-style reports.
  - Reason: touching PDFs, `release/`, `corpus/`, or canonical manifests requires explicit approval.
  - Correct handling: treat old hash reports as snapshots unless re-emitted.

- `QICN_FPPG` and `QICN_WRI` remain cooked synthetic in Phase 6.3.
  - Reason: accepted Phase 6.3-CLOSE debt, not a repository hygiene issue.

- Phase 6.3-CLOSE did not induce a SelfIndex identification failure in the coupled generator.
  - Reason: accepted scientific limitation; not a Git hygiene blocker.

## Actions Taken

- Hardened `.gitignore` against local agent configs, adjacent projects, nested `node_modules`, and one-off local analysis snapshots.
- Preserved QICN-relevant external audit and prompt artifacts under `docs/ai-platform-outputs/`.
- Excluded raw PDF text dumps from versioning unless curated into a smaller report or manifest.
- Preserved root governance instructions as `AGENTS.md`.
- Did not move, delete, or mutate `release/`, `corpus/`, `artifacts/`, PDFs, `.tex` sources, or canonical registries.

## Push Readiness

Push is acceptable if and only if the following pass:

1. `npm run verify` from `rigid-identity-framework/`.
2. `npm run test:negative-controls` from `rigid-identity-framework/`.
3. `npm run verify:preregistration-coverage` from `rigid-identity-framework/`.
4. `node scripts\verify-canonical-integrity.cjs` from repo root.
5. `node scripts\verify-claim-registry.cjs` from repo root.
6. `node scripts\verify-canonical-release.cjs` from repo root.

Expected scientific blockers such as `external_support_certified=false` are not push blockers; they are required honesty boundaries.
