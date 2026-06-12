# QICN Roadmap v3 - Phase 6.3B Discrimination Report

Date: 2026-06-11

Status: `PHASE6_3B_TOY_DISCRIMINATION_PASS_NON_CANONICAL_NO_EXTERNAL_EVIDENCE`

## Boundary

This report documents non-canonical Phase 6.3B execution machinery. The simulator demonstrates that the Phase 6.3A protocol can emit distinct outcome classes on synthetic worlds with known ground truth.

It does not validate QICN, defeat HOT, prove consciousness, prove phenomenality, establish human equivalence, certify any runtime, or provide external adjudication.

## Deliverables

| Subphase | Artifact | Status |
|---|---|---|
| 6.3B-1 | `QICN_ROADMAP_V3_PHASE6_3B1_QICN_PRIMITIVE_OPERATIONALIZATION.md` | `COMPLETE_AT_CANDIDATE_NON_CANONICAL_LEVEL` |
| 6.3B-1 | `QICN_ROADMAP_V3_PHASE6_3B1_TRACE_SCHEMA.json` | `COMPLETE_AT_AI_OUTPUT_SCHEMA_LEVEL` |
| 6.3B-2 | `docs/ai-platform-outputs/sims/qicn_phase6_3b_hot_model.js` | `MINIMAL_HOT_MODEL_IMPLEMENTED` |
| 6.3B-3 | `docs/ai-platform-outputs/sims/qicn_phase6_3b_discrimination_sim.js` | `SELF_TEST_PASS` |

## Preflight Summary

| Resource | Classification |
|---|---|
| Phase 6.3A protocol report | `FUNCTIONAL_INPUT_PENDING_EXTERNAL_AUDIT` |
| Phase 6.3A registry proposal | `FUNCTIONAL_NON_CANONICAL_PROPOSAL` |
| `paper8_first_person_subjectivity/main.tex` | `FUNCTIONAL_FORMAL_SOURCE` |
| `docs/MEASUREMENT_DICTIONARY_v1.md` | `FUNCTIONAL_SCAFFOLD_NOT_FULLY_FROZEN` |
| `docs/NEGATIVE_CONTROL_SUITE.md` | `FUNCTIONAL_STATIC_CONTROL_INVENTORY` |
| `scripts/lib/external-trace-generator.js` | `FUNCTIONAL_REFERENCE_CONTRACT` |
| `scripts/lib/adversarial-negative-controls.js` | `FUNCTIONAL_REFERENCE_WITH_KNOWN_V2_V3_GAP` |
| `scripts/negative-control-suite.js` | `FUNCTIONAL_BASELINE_SCRIPT` |
| `registry/prediction-schema.json` | `FUNCTIONAL_SCHEMA_REFERENCE` |

## First Self-Test Result

The first execution failed. This was not hidden.

Observed defects:

- `QICN_CFS` was zero in the QICN-true world because synthetic continuity candidates lacked the `self_indexed` marker needed by the trace schema.
- `HOT_HOA` failed the HOT-true case because the toy HOT features were not sufficiently tied to the awareness target and the calibration threshold was missed.
- The control-leak world did not initially expose a QICN false positive because the weak-rival loss field did not let the label-only control pass the full gate.

Corrections:

- Added `self_indexed: true|false` to continuity candidates.
- Made HOT-positive synthetic features predict the target strongly enough to pass the preregistered `AUC >= 0.75` and `ECE <= 0.10` rule.
- Aligned control-leak weak-rival losses with the intended false-positive scenario.

These corrections modify the toy-world generator, not the protocol criteria.

## Final Self-Test Command

Command:

```powershell
node docs\ai-platform-outputs\sims\qicn_phase6_3b_discrimination_sim.js --self-test
```

Working directory:

`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`

Exit code: `0`.

## World Result Table

| World | Ground truth role | Expected result | Obtained result | Pass | Key reason |
|---|---|---|---|---|---|
| `qicn_true` | QICN burdens are genuine; HOT access is weak | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | `QICN_BOUNDED_SUPPORT_FOR_TARGET` | yes | QICN thresholds pass, controls fail, and QICN adds predictive value over HOT. |
| `hot_true` | HOT access explains target; QICN burdens fail | `HOT_FAVORED_FOR_TARGET` | `HOT_FAVORED_FOR_TARGET` | yes | HOT passes with `AUC=1`, `ECE=0.0816`, while QICN continuity and irreducibility fail. |
| `control_leak` | Negative control leaks through label-only self artifact | `QICN_FALSIFIED_FOR_TARGET` | `QICN_FALSIFIED_FOR_TARGET` | yes | `CTRL_PASS_RATE=0.25`; a selected negative control passes the QICN gate, which destroys the target-level claim. |

## Key Output Values

| World | HOT AUC | HOT ECE | HOT pass | QICN SIPM | QICN OFIA | QICN CFS | QICN FPPG | QICN WRI | CTRL pass rate |
|---|---:|---:|---|---:|---:|---:|---:|---:|---:|
| `qicn_true` | 0.4523 | 0.0341 | false | 0.6506 | 27.9833 | 0.4009 | 0.3097 | 0.2019 | 0 |
| `hot_true` | 1.0000 | 0.0816 | true | 0.0865 | 1.4456 | 0 | 0.0228 | 0 | 0 |
| `control_leak` | 0.5805 | 0.0614 | false | 0.0725 | 1.1038 | 0 | 0.0264 | 0 | 0.25 |

## Interpretation

The simulator is discriminative in the narrow sense required by Phase 6.3B:

- it can emit a QICN-bounded-support class;
- it can emit a HOT-favored class;
- it can emit a QICN-falsified class when a negative control leaks through.

This is not evidence that QICN is true. The worlds are synthetic and designed with known ground truth. The value is engineering and protocol pressure: the decision surface is not locked to a single favorable outcome.

## Residual Risks

- The primitive operationalizations remain candidate-only and require human expert review.
- HOT model is intentionally minimal and does not represent the full HOT literature.
- The simulator uses synthetic worlds and does not adjudicate real data.
- The `ADVERSARIAL_HARNESS_COMPATIBILITY_GAP` remains open for production harness work.
- Phase 6.3A/6.3B still require external audit before commit/push.

## Closure Reading

Phase 6.3B closes at non-canonical AI-output level because:

- B1 gives each Paper 8 primitive a source anchor, numerical candidate rule, assumptions/deviations, and trace schema.
- B2 implements a minimal HOT arm over the shared trace schema.
- B3 runs a deterministic self-test that produces the three required result classes.
- No canonical source, registry, release, paper, production script, PDF, corpus, artifact, or monolithic source was modified.
