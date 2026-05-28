# Generator Independence Audit

Date: 2026-05-27T20:29:33.164Z

Status: generator_independence_pass

## Boundary

This audit checks code-level scenario-label separation and rename invariance for the synthetic generator. It does not prove epistemic blinding, empirical independence, third-party data independence, consciousness, phenomenality, or external adjudication.

## Layers

- Ontology: synthetic scenario ids are metadata, not model-defining entities.
- Mathematical model: seeded finite-state weighted traces under declared role weights.
- Implementation: PRNG material is `hash({base_seed, role, scenario_salt, generator_version})`.
- Language/documentation: scenario labels must not be used as implicit random seeds.
- Interpretation: passing this audit is internal hygiene only.
- Internal evidence: rename-invariance tests passed or failed as recorded below.
- External evidence: none.

## Checks

- Scenario ids checked: 6
- Leaked scenario ids in generator source: 0
- Missing role models: 0
- Missing explicit scenario_salt: 0
- Rename-invariance failures: 0

```json
{
  "status": "generator_independence_pass",
  "freeze": "docs/preregistrations/PRED-EXT-01_freeze_v3.json",
  "generator": "scripts/lib/external-trace-generator.js",
  "seed_material_policy": {
    "status": "frozen_explicit_salt_policy",
    "material": "hash({base_seed, role, scenario_salt, generator_version})",
    "scenario_id_policy": "scenario id is metadata only and must not affect PRNG material",
    "rename_invariance_required": true
  },
  "checked_scenario_ids": 6,
  "leaked_scenario_ids": [],
  "missing_role_models": [],
  "missing_scenario_salts": [],
  "rename_invariance_failures": [],
  "boundary": "This audit checks code-level scenario-label separation and rename invariance only. It does not prove epistemic blinding or empirical independence."
}
```
