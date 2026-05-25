# External Replication Protocol v1

Status: FCR v12 clean-room execution gateway, not executed.

## Boundary

This protocol enables an independent reviewer to attempt a preregistered QICN
test from public repository artifacts. It is not empirical support, external
validation, proof of consciousness, proof of phenomenality, identity transfer,
agency, moral status, or bridge confirmation.

## Scope

The first supported replication target is `PRED-04c`, using:

- preregistration: `docs/preregistrations/PRED-04c_prereg_v1.md`;
- prediction registry: `docs/PREDICTION_REGISTRY_v1.json`;
- measurement dictionary: `docs/MEASUREMENT_DICTIONARY_v1.md`;
- rival registry: `docs/RIVAL_MODEL_REGISTRY.md`;
- negative controls: `docs/NEGATIVE_CONTROL_SUITE.md`;
- claim ledger: `docs/THEORY_CLAIM_LEDGER.md`.

`PRED-06` may be rehearsed with `npm run test:tamper-prereg`, but that script
is a harness self-test until it is connected to frozen runtime artifacts.

## Reviewer Preconditions

The reviewer must have:

1. A fresh clone of the public repository.
2. Node.js compatible with the repository scripts.
3. No private explanation from the authors.
4. The exact commit hash being adjudicated.
5. A local copy of this protocol and the target preregistration.

## Repository Setup

```powershell
cd rigid-identity-framework
npm install
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run lint:nonclaims
```

Required baseline before any execution:

- `verify:corpus-registry`: 745 formal entries, 432 macros, 0 blockers,
  0 warnings.
- `verify:macro-registry`: 432 macros, 0 blockers, 0 warnings.
- `verify:prediction-registry`: 13 predictions, 0 errors.
- `lint:nonclaims`: 0 violations.

If any baseline gate fails, the reviewer must stop and record the failure as an
environment or repository integrity issue, not as a prediction result.

## PRED-04c Frozen Inputs

The reviewer must not change these values without creating a new preregistered
version:

| Slot | Frozen value |
|---|---|
| Parameter grid | `theta = 0.00, 0.01, ..., 1.00` |
| Seeds | `[42, 12345, 99999, 20250525]` |
| Tolerance | `0.05` response-distance boundary |
| Primary metric | `fraction_ambiguous` |
| Destruction threshold | `fraction_ambiguous > 0.10` |
| Support threshold | `fraction_ambiguous < 0.10` |
| Inconclusive boundary | `fraction_ambiguous == 0.10` |
| Abort rule | `NaN` rate `> 0.01` |
| Primary rival | `RIVAL-NULL-DYNAMICS-01` |
| Negative controls | `CTRL-NEAR-NULL-NOISE`, `CTRL-HISTORY-BLIND` |

## Execution Requirement

This repository currently defines the preregistration and static comparators.
It does not yet include an empirical runtime runner for `PRED-04c`. Therefore,
an external reviewer may only produce one of the following report classes:

1. `blocked_no_runner`: the repository lacks an executable PRED-04c runner.
2. `environment_failure`: baseline gates fail before execution.
3. `executed_support`: future runner executes and meets support criteria.
4. `executed_destruction`: future runner executes and violates destruction
   criteria.
5. `executed_inconclusive`: future runner executes and hits the frozen
   inconclusive boundary or abort rule.

Any simulated demonstration must be labelled `pipeline_demo` and cannot be
entered into the claim ledger as support.

## Required Adjudication Report

The reviewer must write `adjudication_report.md` with:

```yaml
protocol_version: external-replication-v1
prediction_id: PRED-04c
repository_commit: <hash>
reviewer: <name-or-anonymous-id>
date_executed: <YYYY-MM-DD>
baseline_gates:
  corpus_registry: pass|fail
  macro_registry: pass|fail
  prediction_registry: pass|fail
  nonclaim_lint: pass|fail
execution_class: blocked_no_runner|environment_failure|executed_support|executed_destruction|executed_inconclusive|pipeline_demo
seeds_used: [42, 12345, 99999, 20250525]
thresholds_modified: false
post_hoc_exclusions: false
primary_artifacts:
  - <path-or-hash>
claim_ledger_action_required: none|downgrade|promote_to_internal_support|external_adjudication_candidate
```

The narrative section must state whether the report is external adjudication,
internal support, blocked execution, or a pipeline demonstration. Only
independently executed results against a frozen runner can be considered for
external-adjudication status.

## Anti-Inflation Rule

External replication readiness is not replication. A clean baseline plus this
protocol means a third party can identify the execution gap. It does not mean
QICN has defeated rival models or validated any consciousness, subjectivity, or
phenomenality claim.
