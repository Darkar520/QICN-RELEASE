# QICN v35 Version Centralization Report

## Governance Boundary

This v35 pass is an internal codebase hygiene and verification-surface centralization. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.

## Executive Summary

v35 implements a non-destructive centralization layer over the current version sprawl. It adds canonical commands, SHA256 inventory, v30/v31 wrapper comparison, a legacy regression runner that starts with v25, and version documentation. It does **not** physically move versioned scripts/reports/fixtures yet because the working tree is dirty and the repo contains many untracked generated artifacts. Moving files in that state would create provenance risk and possible import regressions.

The current strict baseline is preserved as v31 over v30:

- `npm run verify` delegates to `npm run verify:v31`.
- v30 direct report and v31 wrapper report are intentionally **not** SHA-identical.
- v30 verdict: `BLOCKED_MULTIPLE_GATES`.
- v31 verdict: `BLOCKED_FOUNDATION_FIRST_GATES`.
- Legacy verification from v25 upward passes.

## Implemented Artifacts

| Artifact | Purpose |
|---|---|
| `VERSION.md` | Documents current v35 centralization layer, strict baseline, legacy mapping, and physical-move safety gates. |
| `scripts/generate-versioned-artifact-manifest.js` | Generates SHA256 inventory for versioned scripts, fixtures, reports, and theory artifacts. |
| `scripts/legacy/README.md` | Defines the legacy compatibility boundary and no-move policy until parity gates pass. |
| `scripts/legacy/compare-v30-v31.js` | Phase 0.5 check: runs v30 and v31, compares report SHA256 and verdicts. |
| `scripts/legacy/run-all-legacy-verifications.js` | Runs legacy gates starting with v25, then v26, v27, v28 adjudication, v30, and v31. |
| `scripts/audit-superior-gaps.js` | Unified gap-audit entry point over existing v25-v27 gap audits. |
| `package.json.v35-precentralization.bak` | Backup of `package.json` before v35 alias additions. |
| `package.json` | Adds canonical aliases without removing existing legacy scripts. |

## Package Aliases Added

| Alias | Target |
|---|---|
| `verify` | `npm run verify:v31` |
| `calibrate` | `npm run calibrate:session-zero-thresholds:v27` |
| `adjudicate` | `npm run adjudicate:external-session-zero-v31` |
| `audit:terms` | `node scripts/audit-operational-term-promotions-v28.js` |
| `audit:veto` | `node scripts/verify-human-veto-signature-v28.js --self-test` |
| `audit:gaps` | `node scripts/audit-superior-gaps.js` |
| `test:negative-controls` | `node scripts/negative-control-suite.js` |
| `manifest:versioned` | `node scripts/generate-versioned-artifact-manifest.js` |
| `compare:v30-v31` | `node scripts/legacy/compare-v30-v31.js` |
| `verify:legacy` | explanatory compatibility notice |
| `verify:all-legacy` | `node scripts/legacy/run-all-legacy-verifications.js` |

## Phase 0 Inventory

Generated: `docs/reports/V35_VERSIONED_ARTIFACT_MANIFEST.json`

| Kind | Count |
|---|---:|
| Versioned artifacts total | 89 |
| Scripts | 16 |
| Fixtures / fixture-like data | 9 |
| Reports | 44 |
| Theory artifacts | 20 |

This confirms the prompt's original inventory was incomplete. The centralization problem is real, but larger than assumed.

## Phase 0.5 v30/v31 Comparison

Generated: `docs/reports/V35_V30_V31_PARITY_CHECK.json`

| Check | Result |
|---|---|
| v30 direct execution | PASS |
| v31 wrapper execution | PASS |
| Report SHA256 equal | false |
| Verdict equal | false |
| v30 verdict | `BLOCKED_MULTIPLE_GATES` |
| v31 verdict | `BLOCKED_FOUNDATION_FIRST_GATES` |

Interpretation: v31 is not a byte-identical v30 alias. It adds foundation-first gates and must be treated as the current strict baseline in any future unified adjudicator.

## Phase 1 Canonical Surface

`package.json` now exposes a clean current command surface while preserving every existing versioned command. This avoids immediate regressions and lets future cleanup proceed from a known-good alias layer.

## Phase 2 Legacy Regression Layer

Generated: `docs/reports/V35_ALL_LEGACY_VERIFICATION.json`

Runner order follows the recommended safe escalation:

1. `verify:v25`
2. `verify:v26`
3. `verify:v27`
4. `adjudicate:external-session-zero-v28`
5. `verify:v30`
6. `verify:v31`

Result: `PASS`, 6/6.

## Verification Executed

| Command | Result |
|---|---:|
| `node --check` on every `.js` file under `scripts/` | PASS |
| `npm run manifest:versioned` | PASS |
| `npm run compare:v30-v31` | PASS |
| `npm run audit:gaps` | PASS |
| `npm run audit:veto` | PASS |
| `npm run audit:terms` | PASS |
| `npm run verify` | PASS |
| `npm run verify:all-legacy` | PASS |
| `npm run test:negative-controls` | PASS |
| `git diff --check` on v35 edited files | PASS, with only existing Windows line-ending warning for `package.json` |

## Why Physical Moves Were Not Performed

Physical movement to `scripts/legacy/`, `docs/fixtures/legacy/`, and `docs/reports/legacy/` remains blocked by a safety gate, not by lack of implementation intent:

- The working tree contains many modified tracked files unrelated to v35.
- Several v28/v30/v31 scripts and reports are untracked.
- Existing imports depend directly on root versioned files.
- Moving artifacts before checkpointing would blur provenance and risk breaking active verification.

The v35 central layer deliberately makes the next physical archive step safer by providing manifest hashes, parity checks, and regression runners first.

## Next Physical Archive Gate

Proceed to physical moves only after one of the following:

1. A user-approved checkpoint commit/stash records the current dirty tree.
2. The user explicitly approves moving dirty/untracked versioned artifacts.
3. A separate branch/worktree is created for the archive conversion.

Required pre-move commands:

```powershell
npm run manifest:versioned
npm run compare:v30-v31
npm run verify
npm run verify:all-legacy
```

Required post-move commands:

```powershell
npm run verify
npm run verify:all-legacy
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('package.json OK')"
```

## Verdict

v35 centralization Phase A/B is implemented without regressions. The repository now has a canonical current command surface, a versioned artifact hash manifest, a v30/v31 behavioral comparison, and a full legacy regression runner. Physical archive/move remains intentionally deferred until the dirty working tree has a safe checkpoint.
