# QICN Patch Changelog

Date: 2026-05-26  
Patch class: conservative hardening / no claim inflation

## fixed

- Fixed the monolithic LaTeX build path without changing source-theory content.
- Repaired monolithic preamble generation by filtering malformed one-line macro extractions, replacing repeated `\newcommand` declarations with non-destructive `\providecommand` in the generated monolithic preamble, deduplicating theorem environments, adding required monolithic-only scaffolding environments, and resolving source-relative `\input{...}` paths.
- `npm run compile:monolithic` now exits successfully and generated a 425-page PDF during verification.

## updated

- Updated `docs/preregistrations/PRED-EXT-01_freeze_v3.json` to schema `3.1.0` with explicit `scenario_salt`, a frozen PRNG seed-material policy, active Markov depths `1..5`, and explicit experimental inactive entropy/frequency diagnostic rivals.
- Updated external replication documentation with current counts: 699 formal entries, 377 macros, 14 predictions, 0 blockers, 0 warnings.
- Added `docs/EXTERNAL_REPLICATION_PROTOCOL_v2.md` and marked v1 as superseded.
- Updated `docs/RIVAL_MODEL_REGISTRY.md` to reflect Markov depths `1..5`, depth-aligned target distributions, and inactive diagnostic rivals.
- Updated `docs/reports/THEOREM_ATLAS.md` for `paper5:proposition:prop-integration-transfer` from stale `proved` wording to `open_burden`.

## added

- `docs/CLAIM_STATUS_POLICY.md`.
- `docs/reports/GENERATOR_INDEPENDENCE_AUDIT.md`.
- `docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md`.
- `docs/reports/ADVERSARIAL_NEGATIVE_CONTROL_DECISION_RECORD.json`.
- `docs/reports/REGISTRY_CURATION_BATCH_003_HUMAN_REVIEW_SCAFFOLD.md`.
- `docs/reports/REGISTRY_CURATION_BATCH_003_INDEX.json`.
- `docs/reports/REGISTRY_CURATION_BATCH_002_SUPERSEDED_NOTE.md`.
- `docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md`.
- `docs/reports/I_INT_STATUS_UPDATE.md`.
- `docs/reports/FCR_V17_1_HARDENING_PATCH_REPORT.md`.
- `docs/protocols/EXTERNAL_EMPIRICAL_CAMPAIGN_MINIMAL.md`.
- `docs/templates/EXTERNAL_DATASET_MANIFEST.template.json`.
- `docs/templates/EXTERNAL_REPLICATION_DECISION_RECORD.template.json`.
- `scripts/lib/adversarial-negative-controls.js`.
- `scripts/run-adversarial-negative-controls.js`.
- npm script `test:adversarial-negative-controls`.

## methodological hardening

- PRNG seed material now uses `hash({base_seed, role, scenario_salt, generator_version})` and no longer uses `scenario.id` as implicit random seed material.
- Generator tests now verify scenario rename-invariance when `scenario_salt` is unchanged and trace change when the explicit salt changes.
- Generator independence audit now checks code-level scenario-label separation, explicit salts, and rename-invariance.
- Markov rival scoring now compares each depth against its own depth-aligned empirical target distribution.
- Active trace-memory rivals were extended from depths `1,2,3` to depths `1,2,3,4,5`.
- Adversarial negative-control search now selects the most dangerous candidate within each declared negative-control family and blocks support if any optimized control crosses the support rule.

## claim-status hygiene

- Registry extraction now emits separate status layers:
  - `source_declared_status`,
  - `machine_extracted_status`,
  - `human_curated_status`,
  - `effective_public_status`,
  - `curation_status`.
- Machine-extracted entries default to `human_curated_status = not_reviewed` and carry a `machine_extracted_disclaimer`.
- Validation now requires the status-layer fields and blocks obvious curation-status inconsistencies.
- Human curation batch 003 is explicitly marked `HUMAN_REVIEW_REQUIRED`, `NOT_SIGNED`, `NO_CLAIM_UPGRADE`, and `NO_EXTERNAL_SUPPORT`.

## mathematical status changes

- `I_int` was not upgraded.
- The conditional factorization-triviality theorem under atomic separator remains the strongest closed result.
- The attempted upstream implication

```text
rigid identity + continuity + intervention fidelity
    => atomic operational separator Theta_S
```

remains `OPEN_BURDEN_REFINED`.
- A product-separator counterexample candidate was documented to explain why the current assumptions do not yet prove atomicity.

## not done

- No external empirical campaign was executed.
- No human mathematical review was performed.
- No bridge support was claimed.
- No consciousness, phenomenality, agency, moral status, or identity-transfer claim was upgraded.
- No global proof of `I_int` was asserted.

## requires human review

- Any upgrade from machine-extracted proof status to human-curated proof status.
- Any final mathematical adjudication of the atomic-separator lemma.
- Any re-upgrade of `prop:integration-transfer`.

## requires external data

- External empirical adjudication.
- Independent replication.
- Bridge-burden support.
