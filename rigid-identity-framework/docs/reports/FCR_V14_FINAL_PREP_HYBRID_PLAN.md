# FCR v14 Final Prep Hybrid Implementation Report

Status: implemented static hardening, no evidential execution.
Date: 2026-05-26

## Boundary

This report compares the AntiGravity and OpenCode audits as decision inputs. It
does not treat either audit as canonical truth, does not report empirical
support, does not validate consciousness, phenomenality, identity transfer,
agency, moral status, or external adjudication, and does not close any claim
whose threshold, dataset, or external reviewer remains unfrozen.

## Audit Claims Corroborated Locally

| Claim family | Local finding | Decision |
|---|---|---|
| v14-core trace-memory rival exists | `scripts/lib/trace-memory-rival.js` implements an executable order-1 trace-memory rival. | Accepted as real. |
| PRED-EXT-01 runner uses the rival | `scripts/run-pred-ext-01-rehearsal.js` calls `fitTraceMemoryRival`. | Accepted as real. |
| Runner remains non-evidential | Rehearsal decision record reports `pipeline_rehearsal_not_evidence` and `blocked_threshold_not_frozen`. | Accepted and preserved. |
| Short-trace variance risk | The v14-core rival had no minimum trace-length guard or smoothing policy. | Accepted as a genuine technical gap. |
| Unit-test gap for the rival | No dedicated trace-memory rival unit test existed before this pass. | Accepted as a genuine engineering gap. |
| Git tree clean claim | Local status showed one untracked audit report before this pass. | Rejected as stale or false in the active checkout. |
| Remote branch cleanup recommendation | `origin/copilot/*` branches are present. | Accepted as a hygiene observation, not executed without explicit approval. |
| Threshold freeze gap | No numeric `rho_selective_threshold`, `alpha`, dataset manifest, or external adjudicator is frozen. | Accepted as the main epistemic gap. |
| Extractor residual gap | Diagnostic reports 53 formal and 13 macro residual deltas after missing-source accounting. | Accepted as unresolved infrastructure debt. |

## Implemented Hybrid Actions

1. Hardened `RIVAL-TRACE-MEMORY-01` with:
   - fixed alphabet validation,
   - minimum trace-length guard,
   - Laplace smoothing,
   - explicit short-trace failure,
   - normalized aggregate prediction checks.

2. Updated PRED-EXT-01 rehearsal to use:
   - trace length `240`,
   - `N_min = 200`,
   - Laplace smoothing `lambda = 1`,
   - state alphabet `A/B/C/D`,
   - decision record fields for minimum trace length and smoothing.

3. Added `npm run test:trace-memory-rival` as a local gate for:
   - total variation,
   - smoothing behavior,
   - transition distribution with explicit alphabet,
   - short-trace rejection,
   - normalized rival predictions.

4. Updated the PRED-EXT-01 preregistration draft and external candidate report
   to state that `N_min = 200` and `lambda = 1` are rehearsal safeguards only,
   not frozen evidential parameters.

5. Updated the rival registry so `RIVAL-TRACE-MEMORY-01` lists minimum trace
   length and Laplace smoothing among parameters that must be frozen before
   evidential execution.

6. Added a Git hygiene audit documenting that branch deletion is deliberately
   not performed without explicit approval.

## Verification Commands

Fresh commands run in this pass:

```text
npm run test:trace-memory-rival
npm run rehearse:pred-ext-01
npm run verify:prediction-registry
npm run verify:coordinate-specs
npm run verify:curation-overlays
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run lint:nonclaims
npm run audit:extractor-reproducibility
npm run audit:extractor-diagnostic
npm run audit:monolithic-risk
npm run test:tamper-prereg
```

The runner still returns the correct blocked status. This is a success
condition: the pass improved pipeline mechanics without promoting rehearsal
output to evidence. The extractor audit remains `NOT_REPRODUCIBLE` with a
residual 53 formal / 13 macro delta, and monolithic compilation risk remains
YELLOW; both are preserved as open burdens rather than normalized away.

## Remaining v14-final / v15 Burdens

| Burden | Status | Required next action |
|---|---|---|
| PRED-EXT-01 threshold | Open | Freeze `rho_selective_threshold` before any evidential trace generation. |
| Rival penalty `alpha` | Open | Freeze complexity penalty and selection rationale before execution. |
| Dataset manifest | Open | Freeze trace generation, seeds, inclusion/exclusion rules, and artifact hashes. |
| External adjudicator | Open | Assign a clean-room reviewer before external-validation claims. |
| Extractor reproducibility | Open | Resolve missing sources and residual 53/13 delta. |
| `I_int` proof burden | Open | Prove factorization triviality lemma or materialize downgrade overlay. |
| BPF-2/BPF-3 for `Pi_D` | Open | Build runner and rival execution bundle after PRED-EXT-01 freeze. |

## Current Scientific Status

QICN v14-final-prep is stronger as a falsification architecture, but it remains
below evidential theory status. The next true scientific step is not more prose:
freeze one threshold, run one negative control, and let the result update the
claim ledger even if it destroys a preferred claim.
