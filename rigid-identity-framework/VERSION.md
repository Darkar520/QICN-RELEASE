# QICN Framework Version

**Current operational version:** v35 centralization layer  
**Current strict verification baseline:** v31 foundation-first gates over v30 strict statistics  
**Last updated:** 2026-05-31

## Governance Boundary

This version file documents internal tooling organization only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.

## Unified Commands

```powershell
npm run verify                  # Current strict internal verification alias
npm run manifest:versioned      # Record SHA256 inventory of versioned artifacts
npm run compare:v30-v31         # Phase 0.5 v30 direct vs v31 wrapper comparison
npm run verify:all-legacy       # Run v25, v26, v27, v28 adjudication, v30, v31
```

## Legacy Version Mapping

| Legacy Surface | Current Command | Status |
|---|---|---|
| v25 | `npm run verify:v25` | Preserved in place |
| v26 | `npm run verify:v26` | Preserved in place |
| v27 | `npm run verify:v27` | Preserved in place |
| v28 | `npm run adjudicate:external-session-zero-v28` | Preserved in place |
| v30 | `npm run verify:v30` | Preserved in place |
| v31 | `npm run verify:v31` | Current strict baseline |

## Centralization Policy

The repository currently keeps versioned scripts in place to avoid regressions in a dirty working tree. The v35 layer adds canonical aliases and regression tooling before any physical archive/move.

Physical movement into `scripts/legacy/`, `docs/fixtures/legacy/`, and `docs/reports/legacy/` is permitted only after:

1. `npm run manifest:versioned` has recorded hashes.
2. `npm run compare:v30-v31` has recorded v31 wrapper behavior over v30.
3. `npm run verify:all-legacy` passes.
4. The working tree has an explicit checkpoint, commit, or user-approved archival state.

## Architecture

- Current strict adjudication remains `scripts/external-session-zero-adjudicator-v31.js`.
- Current strict statistical engine remains `scripts/external-session-zero-adjudicator-v30.js`.
- Root `scripts/external-session-zero-adjudicator.js` remains the v26-compatible base used by v25/v26 chains.
- `scripts/legacy/` currently contains orchestration and documentation, not moved legacy code.
- `scripts/audit-superior-gaps.js` is a unified entry point over existing v25-v27 gap audits.

## Non-Destructive Status

v35 intentionally centralizes command surface and verification discipline before moving code. This preserves all existing imports and historical verification commands while making the current strict path discoverable.
