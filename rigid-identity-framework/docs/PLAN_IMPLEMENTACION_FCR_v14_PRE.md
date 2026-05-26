# Plan de Implementacion FCR v14-pre

Status: hybrid execution plan after FCR v13 audits.

Date: 2026-05-26

## Boundary

This plan is an implementation and governance artifact. It does not report
empirical validation, external adjudication, consciousness, phenomenality,
identity transfer, agency, moral status, or proof that the framework is a
completed scientific theory.

The objective is narrower and testable: convert the strongest valid audit
findings from the AntiGravity and OpenCode reviews into source-level,
machine-checkable, or rehearsal-level improvements without inflating claim
status.

## Audit Synthesis

### Findings Accepted As Real

| Finding | Evidence | Action |
|---|---|---|
| Paper 8 retained one risky `access-consciousness-style` phrase. | Local search found the phrase in `paper8_first_person_subjectivity/main.tex`. | Replace with `broadcast-access-style operational organization`. |
| `PRED-11` existed in the registry but not in the Paper 6 LaTeX matrix. | `prediction-canon-map.json` listed `PRED-11` as a registry extension. | Promote `PRED-11` into the Paper 6 matrix and make it `latex_canonical`. |
| The prediction canon map should prevent drift rather than relying on global extraction. | `audit:extractor-reproducibility` remains non-reproducible in the current checkout. | Keep the canon map as the source-alignment gate and do not run global extraction as a repair. |
| Paper 8 constructive coordinate specs need a gate. | `PAPER8_COORDINATE_CONSTRUCTIVE_SPEC.md` existed as prose scaffold. | Add/strengthen `verify:coordinate-specs`. |
| PRED-EXT-01 needs a runner interface before it can become executable. | PRED-EXT-01 was `external_candidate_not_executed`. | Add a synthetic rehearsal runner that emits a blocked decision record. |
| Self-index and irreducibility have edge cases not captured by the first spec. | Audit identified high-entropy collapse and alpha instability. | Add edge-case mitigation requirements to the coordinate spec. |

### Findings Kept As Open Burdens

| Finding | Reason it remains open |
|---|---|
| No frozen external dataset or threshold exists. | A rehearsal runner cannot substitute for a preregistered evidential run. |
| `I_int` still lacks a standalone factorization theorem. | FCR v13 correctly framed the burden; v14 must prove or downgrade. |
| Extractor reproducibility is unresolved. | The discrepancy is infrastructural and should not be hidden by editing JSONL manually. |
| Monolithic compilation remains YELLOW. | There are no active semantic conflicts, but no unified preamble compilation proof yet. |
| BPF-2/BPF-3 for `Pi_D` are not executed. | Paper 9 narrowing gives a spec, not a completed intervention campaign. |

## Implemented v14-pre Actions

1. Paper 8 rhetorical guard
   - Removed the remaining `access-consciousness-style` phrase.
   - Replacement avoids bare `consciousness` while preserving the intended
     broadcast-access analogy.

2. Paper 6 canon alignment
   - Added `PRED-11` to the Paper 6 prediction matrix.
   - Converted `PRED-11` from registry-only extension to `latex_canonical`.
   - Left `PRED-EXT-01` as the only registry extension.

3. Prediction governance
   - `verify:prediction-registry` now validates 14 predictions, 11 LaTeX rows,
     and 1 registry extension.
   - The global extractor remains explicitly non-authoritative until
     reproducibility is repaired.

4. Coordinate admissibility gate
   - `verify:coordinate-specs` checks global sections and per-coordinate
     sections for estimator, failure case, positive toy case, rival, and
     epistemic limit.
   - The gate is structural, not empirical.

5. PRED-EXT-01 rehearsal runner
   - `rehearse:pred-ext-01` writes a deterministic synthetic decision record.
   - The record is intentionally blocked with
     `verdict = blocked_threshold_not_frozen`.
   - It validates pipeline mechanics only.

6. FCR v14-core extractor diagnostic
   - `audit:extractor-diagnostic` separates total extractor delta,
     missing-source delta, backup-branch evidence, and residual unexplained
     delta.
   - It does not claim that missing files explain the entire mismatch unless
     the arithmetic closes.

7. PRED-11 preregistration scaffold
   - `docs/preregistrations/PRED-11_prereg_v0.md` records the integration-loss
     complexity-only test without freezing thresholds or claiming execution.
   - The canon map links the scaffold as not frozen.

8. Trace-memory rival executable rehearsal
   - `scripts/lib/trace-memory-rival.js` implements an order-1 finite
     trace-memory rival for rehearsal.
   - `rehearse:pred-ext-01` now uses the executable rival instead of a static
     hard-coded rival distribution.

9. I_int curation overlay
   - `docs/reports/I_INT_CURATION_OVERLAY_v1.json` records the recommended
     downgrade/open-burden treatment for `prop:integration-transfer`.
   - `verify:curation-overlays` checks that the overlay target exists and
     matches the current registry status.

10. Coordinate gate v2
    - `verify:coordinate-specs` now rejects thin coordinate sections and
      requires estimator sections to contain a formula, inequality, or code
      block.

## Next v14 Actions

### Phase A: Freeze One Executable External Candidate

Target: `PRED-EXT-01`

Minimum required before evidential execution:

- freeze `rho_selective` threshold;
- freeze `penalized_loss_alpha`;
- freeze trace-generation or dataset manifest;
- implement `RIVAL-TRACE-MEMORY-01` as executable baseline;
- define exclusion rules;
- assign clean-room reviewer or external adjudicator.

Success condition: an evidential decision record can be produced without
post-hoc threshold edits.

### Phase B: Resolve `I_int`

Two acceptable outcomes:

- prove a standalone non-factorization / factorization-triviality lemma; or
- downgrade the relevant proposition through a registry curation overlay.

No intermediate prose strengthening is acceptable.

### Phase C: Repair Extractor Reproducibility

The extractor must reproduce the committed registry counts from the current
primary TeX source set or produce a report explaining every missing entry.

Success condition:

- committed registry count and fresh extraction count match; or
- every delta is classified as intentionally curated, source-missing, or
  extractor defect.

### Phase D: Execute One Negative-Control Fixture

Target a small control first:

- `control_complexity_only`, or
- `RIVAL-TRACE-MEMORY-01` against PRED-EXT-01.

Success condition: a fixture produces a decision record with support,
weakening, destruction, or blocked status under frozen rules.

## Non-Negotiable Epistemic Rule

No v14 artifact may be cited as empirical support unless it uses frozen
thresholds, frozen data or trace generation, executable rivals, negative
controls, exclusion rules, and a decision record produced after the freeze.
