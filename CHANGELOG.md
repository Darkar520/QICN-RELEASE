# CHANGELOG — QUICN-RELEASE

All notable changes to this release repository are documented here.
This log covers the internal scientific release cycle only.
No external validation is claimed. All empirical support is internal.

---

## [paper7-freeze] — 2026-03-10

### Added
- `rigid-identity-framework/paper7_operational_life_subjecthood/main.tex` — Paper 7 canonical source
- `rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf` — Compiled PDF (28 pages, PASS)
- `artifacts/release_audit/paper7_build_summary.json` — Build verification record
- `artifacts/release_audit/paper7_final_hardening_summary.json` — Final hardening audit
- `artifacts/release_audit/paper7_final_hardening_summary.md`
- `artifacts/release_audit/paper7_formal_closure_note.md` — Formal closure statement
- `artifacts/release_audit/paper7_scope_and_nonclaims_note.md` — Scope and non-claims
- `artifacts/release_audit/paper7_nonredundancy_check.md` — Non-redundancy audit vs papers 5 and 6
- `artifacts/release_audit/paper7_class_separation_note.md`
- `artifacts/release_audit/paper7_failure_misclassification_note.md`
- `artifacts/release_audit/paper7_mapping_note.md` — Corpus inheritance map
- `artifacts/release_audit/paper7_runtime_binding_map.md` — Runtime binding ledger

### Status
- Paper 7 build: `PASS`, 28 pages, 0 undefined references, 0 rerun warnings
- Non-redundancy with Paper 5 and Paper 6: `PASS`
- Role: `CANONICAL_COMPANION` (higher-order classificatory layer above Paper 5)
- Commit: `017a0cd62ad2eea1406a54b45883e574aee9f2a7`

---

## [completeness-gap-documented] — 2026-03-09

### Added
- `artifacts/release_audit/final_release_completeness_check.json` — Completeness audit
- `artifacts/release_audit/final_release_completeness_check.md`

### Status
- Outer frozen branch core: complete
- Governance companion gap identified: four documents live under `release_repo_qicn_2026-03-01/` (nested git repo, not auto-tracked)
- Requires future packaging decision for nested repo governance files

---

## [scientific-audit-curation] — 2026-03-09

### Added
- Full scientific audit artifact layer under `artifacts/release_audit/`
- Cycle 1–4 experimental ledgers, decision summaries, raw metrics, runner scripts
- ResidualA and ResidualB campaign summaries and hardening artifacts
- High-value confirmation campaign summary
- Mission 1 and Mission 2 independent confirmation reports
- Final claim status ledger (`final_claim_status_ledger.csv`)
- Post-ResidualB assessment
- Final program publication assessment
- Final release architecture and component map
- Canonical freeze record with SHA256 hashes
- Reproducibility protocol

---

## [git-hygiene-baseline] — 2026-03-09

### Added
- `artifacts/release_audit/corpus_git_hygiene_audit.json` — Git hygiene audit
- `artifacts/release_audit/corpus_git_hygiene_audit.md`
- `artifacts/release_audit/clean_clone_setup_note.md`

---

## [paper6-companion-freeze] — 2026-03-09

### Added
- `rigid-identity-framework/paper6_predictions_falsation/main.tex`
- `rigid-identity-framework/paper6_predictions_falsation/main.pdf`
- `artifacts/release_audit/paper6_freeze_note.md`
- `artifacts/release_audit/paper6_final_polish_summary.json`
- Paper 6 build sync and clean reproduction notes

### Status
- Paper 6 role: `CANONICAL_COMPANION`
- Clean reproduction: confirmed
- Commit: `b374338243c5aeee8c39eec22db8db460bbddc3f`

---

## [initial-scientific-release-freeze] — 2026-03-08

### Added
- `rigid-identity-framework/CANONICAL_CORE.tex/.pdf`
- `rigid-identity-framework/paper1/main.tex/.pdf` — Rigid Identity
- `rigid-identity-framework/paper2/main.tex/.pdf` — Phenomenological Regimes
- `rigid-identity-framework/paper3/main.tex/.pdf` — Null-Regime Instability
- `rigid-identity-framework/paper4/main.tex/.pdf` — Forensic Predictions
- `rigid-identity-framework/paper5_operational_consciousness/main.tex/.pdf` — Operational Consciousness Criterion
- `artifacts/precursor_overview_rewrite_v1/framework_overview_strict.tex/.pdf`
- `release/references.bib` — Canonical bibliography
- Initial release audit artifacts

### Status
- Freeze name: `internal_scientific_release_final_freeze`
- Branch: `internal-scientific-release-final-freeze`
- Commit: `6ae6f003efa9022bd061071e9f8dd07a8e1ddded`
- Doctrine: `FROZEN_FOR_SCIENTIFIC_CYCLE`
- Ready for internal scientific release: `true`
- External validation: none claimed

---

*This CHANGELOG documents only substantive release events. Audit and planning commits are tracked in `artifacts/release_audit/commands_run.txt`.*
