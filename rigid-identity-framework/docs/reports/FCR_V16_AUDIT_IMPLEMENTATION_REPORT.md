# FCR v16 Audit Implementation Report

Status: IMPLEMENTED_WITH_BOUNDED_CLAIMS
Date: 2026-05-26
Base commit: `3b8d8a3`

## Boundary

This report records verification and implementation work. It does not report
empirical support, external adjudication, consciousness, phenomenality, identity
transfer, agency, moral status, biological equivalence, or proof of the full
QICN framework.

## 1. Audit Claims Checked

| Audit claim | Local verdict | Action |
|---|---|---|
| v15 negative control was too trivial because it matched baseline exactly. | True. `memory_only_negative_control` in v15 had zero TV by construction. | Replaced the pilot with six negative controls, including perturbation, stochastic noise, high-order drift, complexity-only, narrative-only, and reward-bookkeeping controls. |
| Synthetic generator and evaluator were too coupled. | Mostly true for v15. The same runner owned generation and scoring. | Added `scripts/lib/external-trace-generator.js`, clean-room synthetic freeze v2, separate runner, and reviewer quarantine. |
| PRED-EXT-01 needed stochastic/noise controls. | True. | Added clean-room stochastic/noise, memory-drift, high-entropy, narrative-only, and reward-bookkeeping panels. |
| `I_int` still lacks a formal factorization proof. | True. | Added category spec and lemma draft; kept `prop:integration-transfer` as `open_burden`. |
| Monolithic LaTeX remains uncertified. | True. | Added physical monolithic scaffold and build script; compilation remains not certified. |
| Human mathematical curation is missing. | True. | Added formal review protocol, curation batch generator, and 50-entry human review scaffold. |

## 2. Implemented Execution Tracks

### PRED-EXT-01

Artifacts:

- `docs/preregistrations/PRED-EXT-01_freeze_v2.json`
- `docs/preregistrations/PRED-EXT-01_prereg_v2.md`
- `scripts/lib/external-trace-generator.js`
- `scripts/run-pred-ext-01-cleanroom.js`
- `scripts/cleanroom-reviewer-quarantine.js`
- `docs/reports/PRED_EXT_01_CLEANROOM_DECISION_RECORD.json`

Results:

- `npm run pilot:pred-ext-01`: internal synthetic support with 6/6 controls passed.
- `npm run cleanroom:pred-ext-01`: clean-room synthetic support with 5/5 controls passed.
- `npm run review:cleanroom-pred-ext-01`: `review_pass`.

Epistemic status:

```text
clean_room_synthetic_support
```

Not:

```text
empirical_support
external_adjudication
```

### PRED-02, PRED-04c, PRED-11

Frozen internal synthetic execution artifacts were added for:

- `PRED-02`: invariant rupture by ablation.
- `PRED-04c`: cross-substrate class preservation.
- `PRED-11`: integration loss with complexity preserved.

All three write decision records under `docs/reports/`.

## 3. Formal Burden Track

The `I_int` gap is not closed as a theorem. It is better localized:

- `docs/reports/I_INT_FACTORIZATION_CATEGORY_SPEC.md`
- `docs/reports/I_INT_FACTORIZATION_LEMMA_DRAFT.tex`

The draft shows that a strong faithfulness condition is needed. Since that
condition is not yet derived from upstream assumptions, the correct status
remains:

```text
paper5:proposition:prop-integration-transfer -> open_burden
```

## 4. Monolithic Track

Added:

- `scripts/build-monolithic-volume.js`
- `monolithic/QICN_MONOLITHIC.tex`
- `monolithic/preamble/packages.tex`
- `monolithic/preamble/setup.tex`
- `monolithic/compile.ps1`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`

The scaffold extracts all 12 source surfaces. The compilation is not certified.
An elevated retry was blocked by the local execution environment after the
first compile attempt revealed package/preamble issues. Therefore the correct
status remains:

```text
monolithic_scaffold_ready_not_certified
```

## 5. Human Curation Track

Added:

- `docs/reports/FORMAL_METHODS_REVIEW_PROTOCOL.md`
- `scripts/generate-curation-batch.js`
- `docs/reports/REGISTRY_CURATION_BATCH_002_HUMAN_REVIEW.md`
- `docs/reports/REGISTRY_CURATION_BATCH_002_INDEX.json`

The batch is not signed. It is a scaffold for human review, not human curation
itself.

## 6. Remaining Gaps

| Gap | Status after v16 | Required next step |
|---|---|---|
| External evidence | Still open | Run a non-synthetic dataset under frozen rules with independent adjudication. |
| `I_int` proof | Still open | Prove faithfulness from upstream assumptions or keep `open_burden`. |
| Monolithic PDF | Still open | Complete compile iteration and only then move monolithic risk to GREEN. |
| Human curation | Scaffolded only | Obtain signed mathematical review and apply curation overlays. |
| Broader negative-control suite | Partially improved | Extend beyond PRED-EXT-01 to all relevant predictions. |

## 7. Final Assessment

The v16 pass closes the most concrete software and protocol gaps without
pretending to close the scientific ones. The framework is now stronger because
its synthetic harness is harder to fool, three additional prediction protocols
are frozen and executable, and the `I_int` proof gap is stated in a form a
mathematician can attack.

The next true scientific jump remains external: non-synthetic traces,
independent review, and a decision record that can weaken or destroy the claim.
