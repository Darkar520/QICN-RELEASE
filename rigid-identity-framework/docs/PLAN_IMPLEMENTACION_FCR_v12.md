# Plan Implementacion FCR v12

Status: hybrid implementation plan and executed pre-execution hardening pass.

## 0. Boundary

FCR v12 does not claim empirical validation. It closes auditability gaps that
must be solved before internal or external campaigns can count as evidence.
No item in this pass proves consciousness, phenomenality, identity transfer,
agency, moral status, or external adjudication.

## 1. Inputs Audited

Two external analyses were treated as hypotheses, not authorities:

- OpenCode summary: prioritize shared-preamble readiness, external protocol,
  and first campaign execution.
- Antigravity audit: preserve extractor-regression evidence, test
  `resync:macro-cache`, identify the line-offset drift, and report full commit
  scope.

## 2. Objective Triage

| Claim from analyses | Repo evidence | v12 decision |
|---|---|---|
| `negative controls` are complete | `docs/NEGATIVE_CONTROL_SUITE.md` is a static inventory; no fixtures or runtime decision records exist. | Keep `[~]`, not `[x]`. |
| `rival registry` is complete | `docs/RIVAL_MODEL_REGISTRY.md` exists and `PREDICTION_REGISTRY_v1.json` has `linked_rivals`. | Keep `[x]` only as static comparator contract. |
| `audit:monolithic-risk` is YELLOW with 0 manual-review | Confirmed after `axiom` normalization and source-scoped macro cache resync. | Keep `[~]`; not a compiled unified volume. |
| Global extractor regression 745/432 -> 585/325 should be preserved | The previous temporary proof was not persisted. | Add reproducible extractor audit. |
| `resync:macro-cache` needs a test | Script existed without a self-test. | Add fixture-based self-test. |
| `line_start` drift exists in axiom entries | Registry lines were stale relative to current primary TeX. | Update source-scoped resync to refresh line offsets. |
| External replication is still `[ ]` | No clean-room protocol existed. | Add protocol and move roadmap to `[~]` only. |

## 3. Implemented v12 Scope

### Phase A: Derived Artifact Reproducibility

- Add `scripts/probe-extractor-reproducibility.js`.
- Add `npm run audit:extractor-reproducibility`.
- Generate `docs/reports/EXTRACTOR_REPRODUCIBILITY_AUDIT.md`.

Success criterion: the report records whether whole-registry extraction is safe
from current primary `.tex` files. A non-reproducible result is a valid audit
finding, not a failure to be hidden.

### Phase B: Source-Scoped Resync Testability

- Export `resyncMacroCache()`.
- Add fixture-based `scripts/test-resync-macro-cache.js`.
- Add `npm run test:resync-macro-cache`.
- Update line offsets when the primary TeX declaration line differs.

Success criterion: dry-run remains non-mutating, write mode updates only the
target cache entry, and a second run is idempotent.

### Phase C: External Replication Gateway

- Add `docs/EXTERNAL_REPLICATION_PROTOCOL.md`.
- Update `docs/PREREGISTRATION_TEMPLATE_v1.md` with external replication slots.
- Link `docs/preregistrations/PRED-04c_prereg_v1.md` to the protocol.

Success criterion: a third party can identify the baseline gates, frozen
PRED-04c inputs, report format, and current blocker (`blocked_no_runner`)
without private explanation.

### Phase D: Deterministic Claim Snapshot

- Make `scripts/extract-claim-ledger.js` deterministic by replacing timestamp
  churn with `source_sha256`.

Success criterion: repeated verification does not dirty the repo solely because
of wall-clock time.

## 4. Deferred Items

| Deferred item | Reason |
|---|---|
| Shared-preamble unified LaTeX volume | The current checkout cannot safely run whole-registry extraction from primary sources; some registry paths are not present as `.tex` files. A compile pass must start by restoring or reconstructing the missing primary sources, then designing the shared preamble. |
| PRED-04c empirical campaign | No frozen executable runner exists in this repository. A simulated runner would only be a pipeline demo and cannot count as support. |
| PRED-06 runtime campaign | Current `tamper-inject` is a self-test harness, not a runtime artifact adjudication. |

## 5. Required Gates

```powershell
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run lint:nonclaims
npm run extract:claim-ledger
npm run audit:monolithic-risk
npm run audit:extractor-reproducibility
npm run test:resync-macro-cache
npm run test:tamper-prereg
```

## 6. Roadmap Update Rule

Only static artifacts and executable gates may be marked `[x]`. Protocol
readiness, static suites, and unexecuted preregistrations remain `[~]`.
Anything requiring an empirical runner, external reviewer, or decision record
must not be promoted until that evidence exists.
