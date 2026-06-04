# Legacy Compatibility Layer

This directory is the compatibility boundary for the v35 centralization plan.

Current status: non-destructive pre-archive layer.

- Versioned root scripts remain in place until all wrapper parity checks pass.
- New legacy orchestration scripts live here and call the existing commands.
- No mathematical, statistical, or epistemic adjudication logic is changed here.
- Future physical archive work must first regenerate `docs/reports/V35_VERSIONED_ARTIFACT_MANIFEST.json` and compare hashes.

Do not move or delete versioned scripts until the full legacy runner passes and a clean checkpoint exists.
