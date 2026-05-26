# FCR v17 Adversarial Hardening Report

Status: IMPLEMENTED_WITH_BOUNDED_SYNTHETIC_CLAIMS
Date: 2026-05-26
Base commit audited: `fa1ce1a`

## Boundary

This report records adversarial verification and implementation work. It does
not report empirical support, external adjudication, consciousness,
phenomenality, identity transfer, agency, moral status, biological equivalence,
or proof of the full QICN framework.

## 1. Audit Truth Matrix

| Audit claim | Local verdict | v17 action |
|---|---|---|
| The clean-room generator still had code-level scenario-specific distributions. | True. `external-trace-generator.js` encoded scenario names and their weights. | Moved scenario distributions into `PRED-EXT-01_freeze_v3.json`; the generator now interprets generic freeze-declared role models and the reviewer checks that scenario IDs do not appear in generator source. |
| PRED-EXT-01 defeated only a depth-1 trace-memory rival. | True for v16. | Added a rival suite over Markov depths 1, 2, and 3; support now requires the best penalized rival in the suite to remain above the loss floor. |
| PRED-02, PRED-04c, and PRED-11 used hardcoded panels. | True. | Replaced fixed panels with seeded synthetic simulators and added negative controls for each executed prediction. |
| `I_int` factorization proof was still circular/open. | True. | Added a conditional theorem in Paper 5 proving factorization triviality under an explicit atomic operational separator. The unconditional transfer proposition remains `open_burden` until atomicity is derived from upstream assumptions. |
| Human curation remains scaffold-only. | True. | Not closed in v17; remains a human-review dependency. |
| Monolithic volume remains scaffold-only. | True. | Not closed in v17; remains engineering work. |

## 2. PRED-EXT-01 Hardening

Artifacts:

- `docs/preregistrations/PRED-EXT-01_freeze_v3.json`
- `docs/preregistrations/PRED-EXT-01_prereg_v3.md`
- `scripts/audit-generator-independence.js`
- `scripts/lib/external-trace-generator.js`
- `scripts/lib/pred-ext-01-evaluator.js`

Changes:

1. Scenario models are freeze-declared, not encoded in the generator.
2. The clean-room run uses primary and holdout seeds.
3. The evaluator tests trace-memory rivals at depths 1, 2, and 3.
4. Reviewer quarantine now checks generator determinism for every declared
   scenario and rejects generator source that leaks scenario IDs.

Interpretation:

This reduces code-level circularity but does not produce true epistemic
blinding. The same project still authored the freeze, generator, and evaluator.
The correct status remains synthetic.

## 3. Internal Prediction Hardening

PRED-02, PRED-04c, and PRED-11 now use seeded simulators instead of fixed
numeric panels.

| Prediction | v17 freeze | Added controls |
|---|---|---|
| PRED-02 | `PRED-02_freeze_v2.json` | boundary ambiguous, sham ablation, noise-only |
| PRED-04c | `PRED-04c_freeze_v3.json` | substrate-label-only, non-equivalent, invariant drift |
| PRED-11 | `PRED-11_freeze_v2.json` | complexity loss, weak integration loss, preserved-complexity/no-integration-loss |

These are still internal synthetic simulations. They are stronger than v16
calculator panels because measurements are computed from seeded latent profiles,
but they are not measurements of an external system.

## 4. I_int Proof Track

Paper 5 now contains:

```text
paper5:definition:def-intervention-faithful-factorization
paper5:theorem:thm-iint-faithful-factorization-triviality
paper5:remark:rem-iint-atomicity-burden
```

The theorem proves that an intervention-faithful exact factorization is trivial
under an atomic identity/history/response separator. This is a real conditional
proof. It does not prove the original transfer proposition unless the corpus
also proves:

```text
rigid identity + continuity + intervention fidelity
  => atomic operational separator Theta_S
```

That implication is now the sharply localized remaining mathematical burden.

## 5. Remaining External-Review Attacks

| Attack | Status after v17 |
|---|---|
| Synthetic support is still author-designed. | Still true, but less code-circular. |
| No non-synthetic traces. | Still true. |
| No signed human mathematical review. | Still true. |
| Monolithic LaTeX not compiled. | Still true. |
| `I_int` unconditional transfer not proved. | Still true; conditional theorem proved under atomicity. |

## 6. Verification Snapshot

Commands executed locally after implementation:

| Command | Result |
|---|---|
| `npm run extract:registry` | PASS; 699 formal entries and 377 macros extracted. |
| `npm run verify:corpus-registry -- --strict-crossrefs` | PASS; 0 blockers and 0 warnings. |
| `npm run verify:macro-registry` | PASS; 0 blockers and 0 warnings. |
| `npm run audit:extractor-reproducibility` | PASS; `REPRODUCIBLE`, 699/699 formal and 377/377 macro. |
| `npm run verify:prediction-registry` | PASS; 14 predictions, 0 errors. |
| `npm run verify:curation-overlays` | PASS; 1 overlay validated. |
| `npm run test:trace-memory-rival` | PASS. |
| `npm run test:external-trace-generator` | PASS. |
| `npm run audit:generator-independence` | PASS; 0 leaked scenario IDs. |
| `npm run cleanroom:pred-ext-01` | PASS; `clean_room_synthetic_support_with_holdout_controls_passed`. |
| `npm run review:cleanroom-pred-ext-01` | PASS; primary and holdout seeds reviewed. |
| `npm run execute:pred-02` | PASS; `internal_synthetic_support_with_negative_controls_passed`. |
| `npm run execute:pred-04c` | PASS; `internal_synthetic_support_with_negative_controls_passed`. |
| `npm run execute:pred-11` | PASS; `internal_synthetic_support_with_negative_controls_passed`. |
| `npm run test:tamper-prereg` | PASS; 90/90 tamper rejected or quarantined. |

## 7. Verdict

FCR v17 does not claim empirical evidence. It makes the internal synthetic
harness harder to fool, gives PRED-02/PRED-04c/PRED-11 nontrivial controls, and
turns the `I_int` proof problem from a vague proof sketch into a proved
conditional theorem plus one explicit upstream derivation target.
