# RELEASE NOTES — internal-scientific-release-final-freeze

**Release name:** `internal_scientific_release_final_freeze`  
**Branch:** `internal-scientific-release-final-freeze`  
**Freeze date:** 2026-03-08 (initial freeze); 2026-03-10 (paper7 companion added)  
**Status:** `PASS — INTERNAL COHERENT RELEASE`  
**Doctrine status:** `FROZEN_FOR_SCIENTIFIC_CYCLE`

---

## What This Release Is

This is an internal scientific release of the QICN (Quantifiable Identity of Conscious Networks) framework. It contains the full frozen theoretical corpus, companion papers, supporting audit artifacts, and experimental evidence records from the internal scientific program.

This release is **not** a claim of external validation. All empirical support is internal only. No third-party reproduction or external evaluator confirmation exists at this stage.

---

## Corpus Contents

### Canonical Core (Papers 1–5 + CANONICAL_CORE)

| Paper | Title | Status |
|---|---|---|
| `CANONICAL_CORE` | Mathematical nucleus | Frozen |
| Paper 1 | Rigid Identity | Frozen |
| Paper 2 | Phenomenological Regimes | Frozen |
| Paper 3 | Null-Regime Instability | Frozen |
| Paper 4 | Forensic Predictions | Frozen |
| Paper 5 | Operational Consciousness Criterion | Frozen, PASS (25 pages) |

### Canonical Companions

| Paper | Title | Status |
|---|---|---|
| Paper 6 | Predictions and Failure Modes | Frozen, PASS |
| Paper 7 | Operational Life, Structural Class, and Subjecthood | Frozen, PASS (28 pages) |

### Supporting Artifacts

- `release/references.bib` — Canonical bibliography
- `release/CANON_MAP.v1.json` — Claim-to-paper mapping
- `release/FREEZE_AUDIT_v1/` — Git history and tag verification
- `artifacts/release_audit/` — Full scientific audit layer

---

## Claim Status Summary

All empirical support is internal only. No external validation is claimed.

| Claim | Status | Limitation Class |
|---|---|---|
| P5-01 | ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT | INTERNAL_SUPPORT_ONLY |
| P5-02 | ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT | METRIC_OR_TOLERANCE_LIMIT |
| P5-03 | PROVISIONAL_SUPPORT_LOCALIZED | METRIC_OR_TOLERANCE_LIMIT |
| P5-04 | ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT | INTERNAL_SUPPORT_ONLY |
| P5-05 | ROBUST_INTERNAL_SUPPORT | INTERNAL_SUPPORT_ONLY |
| P5-06 | ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT | METRIC_OR_TOLERANCE_LIMIT |
| EXT-01 (external validation) | NOT CLAIMED | — |
| HUM-01 (human consciousness) | NOT CLAIMED | — |

---

## Six Invariants

The framework is structured around six critical invariants assessed by the QICN-SYSTEM runtime:

1. **I_per** — Persistence  
2. **I_ri** — Rigid Identity  
3. **I_int** — Integration  
4. **I_cont** — Continuity  
5. **I_diff** — Differentiation  
6. **I_leg** — Legibility  

Runtime binding: `canon-invariant-package.v6` in QICN-SYSTEM.

---

## Experimental Program Summary

The internal scientific program ran four falsification cycles plus residual campaigns:

| Phase | Result | Key finding |
|---|---|---|
| Cycle 1 | baseline established | Initial criterion behavior validated |
| Cycle 2 | hardened | Methodological improvements, hardened runner |
| Cycle 3 | blind/semiblind | Independent judge path confirmed stability |
| Cycle 4 | boundary | Near-miss and threshold-boundary probes |
| ResidualA | resolved | Substrate equivalence path strengthened |
| ResidualB | resolved | Boundary probe second family closed |
| High-value confirmation | PASS | Independent confirmation across probe families |

Full records: `artifacts/release_audit/`

---

## Known Gaps and Residual Blockers

1. **External validation does not exist.** This is a planned future step, not a current achievement.
2. **P5-02/P5-06** remain metric-or-tolerance-limited (localized I_ri metric-handling caveat from legacy raw pair).
3. **P5-01/P5-04** carry epistemic-level caveats despite robust internal support.
4. **Governance companion files** (`METHODS_GOVERNANCE_HUB.v1.md`, `GLOSSARY_CANONICAL.v1.md`, `STYLE_DISCLAIMER_POLICY.v1.md`, `TERM_MIGRATION_PLAN.v1.md`) reside in a nested Git repository (`release_repo_qicn_2026-03-01/`) and are not directly tracked in the outer frozen branch. A packaging decision is required to resolve this gap.
5. **Framework overview** (`framework_overview_strict`) is included as an overview companion only; it does not own theorems and its integration status is `WARN`.
6. **Strict release toolchain** carries a non-blocking MiKTeX/Biber anomaly (`WARN_BIBER_NONZERO_BUT_RESOLVED`).

---

## Correspondence with QICN-SYSTEM

This release package is the verified freeze referenced by QICN-SYSTEM's `CANON_SOURCE_OF_TRUTH.md`.  
The QICN-SYSTEM runtime depends on this corpus for claim labels and inherited claim-family naming only.  
Runtime execution in QICN-SYSTEM does not depend on any file in this package.

- QICN-SYSTEM referenced freeze commit: `2b0d0c0`
- QICN-SYSTEM canon invariant package version: `canon-invariant-package.v6`

---

## Non-Claims

This release does **not** establish or claim:
- Human phenomenal consciousness
- Human biological qualia or subjective equivalence
- That complex computation alone is sufficient for operational consciousness
- Machine moral status derived automatically from computation
- External validation or third-party confirmation
- Biological substrate is unnecessary for consciousness in general (P5-06 is a formal corollary, not an empirical claim)

---

## Reproducibility

See `artifacts/release_audit/reproducibility_protocol.md` for the full reproducibility protocol.  
Frozen inputs for each experimental cycle are available under `artifacts/release_audit/cycleN_frozen_inputs/`.  
SHA256 hashes for all canonical source files are recorded in `artifacts/release_audit/canonical_freeze_record.md`.

---

*This release is frozen for the internal scientific cycle. No doctrinal edits or claim upgrades are permitted while the falsification program is active.*
