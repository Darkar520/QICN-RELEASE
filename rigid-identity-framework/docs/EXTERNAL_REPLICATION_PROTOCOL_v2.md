# External Replication Protocol v2

Status: CURRENT_REPLICATION_GATEWAY / NOT_EXECUTED_EXTERNALLY  
Date: 2026-05-26

## Boundary

This protocol aligns the public replication instructions with freeze v3.1 and
the current registries. It does not report empirical support, external
validation, proof of consciousness, proof of phenomenality, identity transfer,
agency, moral status, or bridge confirmation.

## Current registry baseline

Canonical source for counts: `npm run verify:corpus-registry -- --strict-crossrefs`
and `npm run verify:prediction-registry` in `rigid-identity-framework`.

Required current baseline:

| Gate | Expected current value |
|---|---:|
| Formal entries | 699 |
| Macro entries | 377 |
| Theorem entries | 99 |
| Hypothesis entries | 20 |
| Conjecture entries | 2 |
| Proved-status entries | 232 |
| Conditional-status entries | 334 |
| Heuristic-status entries | 122 |
| Prediction registry entries | 14 |
| Blockers | 0 |
| Warnings | 0 |

Older counts such as `745 formal entries`, `432 macros`, or `13 predictions`
are superseded by the current registry and must not be used as acceptance
criteria for this release.

## Execution classes

### 1. Internal synthetic runner

Examples:

```bash
npm run execute:pred-02
npm run execute:pred-04c
npm run execute:pred-11
```

Interpretation: internal synthetic support only. It is not empirical support and
not external adjudication.

### 2. Clean-room synthetic runner

Example:

```bash
npm run cleanroom:pred-ext-01
npm run review:cleanroom-pred-ext-01
npm run test:adversarial-negative-controls
```

Current freeze: `docs/preregistrations/PRED-EXT-01_freeze_v3.json` with
schema version `3.1.0`, explicit `scenario_salt`, rename-invariant PRNG policy,
active Markov trace-memory depths `1..5`, and synthetic negative controls.

Interpretation: clean-room synthetic support only if the decision record says so.
It is not empirical support, not bridge admissibility, and not consciousness
validation.

### 3. External empirical runner

Status: NOT_EXECUTED. Requires independent data, frozen external manifest,
blinded labels, third-party perturbation source, and a signed decision record.
No such dataset is included in this release.

### 4. Independent external replication

Status: NOT_EXECUTED. Requires a third party to run the protocol without private
author explanation, preserve artifacts and hashes, and report failures as well
as support.

## Required setup

```bash
cd rigid-identity-framework
npm install
npm run extract:registry
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run verify:curation-overlays
npm run verify:preregistration-coverage
npm run lint:nonclaims
```

If any baseline gate fails, stop and record `environment_failure` or
`repository_integrity_failure`.

## Anti-inflation rules

- Synthetic support does not imply empirical support.
- Clean-room synthetic support does not imply bridge admissibility.
- Preregistration coverage does not imply validation.
- Human review scaffolds do not imply human review.
- No external consciousness, phenomenality, subjectivity, agency, or identity
  transfer claim is supported by this protocol alone.

## External report classes

```yaml
protocol_version: external-replication-v2
prediction_id: <PRED-ID>
repository_commit_or_archive_hash: <hash>
reviewer: <name-or-anonymous-id>
date_executed: <YYYY-MM-DD>
execution_class: internal_synthetic|clean_room_synthetic|external_empirical|independent_external_replication|blocked_no_data|environment_failure
thresholds_modified: false
post_hoc_exclusions: false
primary_artifacts:
  - <path-or-hash>
claim_ledger_action_required: none|downgrade|block_support|internal_support_only|external_adjudication_candidate
anti_inflation_statement_present: true
```

Only independently executed external empirical results with frozen manifests can
be considered for external-adjudication status.
