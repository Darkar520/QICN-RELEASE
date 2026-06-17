# QICN Human Reviewer Gap Package Index

Status: `NON_CANONICAL_AI_OUTPUT_FOR_HUMAN_REVIEW`

Date: 2026-06-16

## Purpose

This is a delivery package for a human reviewer, especially a mathematician and/or philosopher of consciousness. No AI artifact in this package closes the listed gaps. The package only presents verified surfaces, open burdens, and non-canonical empirical probes in one place.

## Documents in this package

| Document | Path | What it contributes |
|---|---|---|
| `QICN_GAP_I_INT_ATOMIC_SEPARATOR_MODEL_CARD.md` | `docs/ai-platform-outputs/reports/QICN_GAP_I_INT_ATOMIC_SEPARATOR_MODEL_CARD.md` | The central `I_int / atomic separator` gap: conditional theorem valid under atomicity, atomicity not proved in general, plus the negative Phase 7 empirical probe. |
| `QICN_EVIDENCE_SURFACE_AND_OPEN_GAPS.md` | `docs/ai-platform-outputs/reports/QICN_EVIDENCE_SURFACE_AND_OPEN_GAPS.md` | Verified inventory of what the corpus has and does not have, checked against `.tex` and report surfaces. |
| `QICN_LITERATURE_CONFRONTATION_GAP.md` | `docs/ai-platform-outputs/reports/QICN_LITERATURE_CONFRONTATION_GAP.md` | Literature confrontation gap against IIT, GWT/GNW, HOT, FEP/Friston, predictive processing, operationalist theories, and personal-identity literature. |
| `QICN_PHASE7_QICN_INSTANTIATION_AND_NONCIRCULARITY.md` | `docs/ai-platform-outputs/reports/QICN_PHASE7_QICN_INSTANTIATION_AND_NONCIRCULARITY.md` | Phase 7 empirical probe and its negative result: connected incidence does not recover computed atomicity on the finite bank; includes the out-of-sample balanced hold-out. |
| `QICN_PHASE7_REAL_RIVAL_PROFILES.md` | `docs/ai-platform-outputs/reports/QICN_PHASE7_REAL_RIVAL_PROFILES.md` | PyPhi/GNW rival profiles on the finite bank, plus the programmatic Phi-degeneracy detector and the explicit "no clean positive Phi control" limitation. |

## Latest empirical evidence (non-canonical, internal-only)

These results refine, but do not change, the central status. All are internal local measurements over tiny Boolean systems, not external validation.

- Atomicity truth is computed by brute-force dynamic non-factorization from `n` and `transition_table` only, independent of any construction label (`docs/ai-platform-outputs/sims/phase7/qicn_phase7_atomicity_ground_truth.js`).
- In-sample (14-family bank v2): connected incidence does not recover computed atomicity. Accuracy `0.8929`, sensitivity `0.875`, specificity `1.0`. Status `CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`.
- Out-of-sample balanced hold-out, 46 systems from generators disjoint from the 14 families (random deterministic TPMs + hand-constructed rules + block-product factorizable systems), with truth computed before the classifier (`docs/ai-platform-outputs/sims/phase7/qicn_phase7_holdout_bank.js`). Confusion `TP 30, TN 15, FP 0, FN 1`; accuracy `0.9783`, sensitivity `0.9677`, specificity `1.0` over `15` truth-confirmed factorizable negatives (no longer a single-negative artifact). Status `OUT_OF_SAMPLE_GENERALIZATION_MEASURED`.
- IIT/PyPhi: `cycle_ring_copy` n=3 gives Phi=1.0 by degenerate permutation dynamics, flagged `PHI_DEGENERATE_PERMUTATION_DYNAMICS` by a detector computed from `n`+`transition_table`. A self-loop variant removes the specific degeneracy (Phi in `[0.069, 0.1875]`) but is not a strong positive Phi control. The bank has no clean positive Phi control.
- The preliminary QICN-vs-rivals comparison remains `NOT_RUN`; none of the above is used to assert convergence, superiority, or validation.

Reviewer reading: the classifier is conservative (no false positives in- or out-of-sample) but does not recover atomicity in general. This is evidence about an observable candidate condition, not a closure of the `I_int` gap.

## The three human burdens (verified, not closed)

1. Prove atomicity in general, or state the missing hypothesis precisely. Paper 5 says the theorem is conditionally closed once atomicity is established, but it does not prove that every upstream-satisfying system has an atomic separator; that implication remains the exact remaining mathematical burden (`paper5_operational_consciousness/main.tex:361-366`).
2. Exhibit a certified concrete instance of `S`. Paper 5 defines `S \in \Cop` by the six-invariant conjunction (`paper5_operational_consciousness/main.tex:484-488`) and gives the candidate certification rule (`paper5_operational_consciousness/main.tex:1120-1155`). The package does not exhibit a concrete certified member satisfying that rule.
3. Obtain external validation. The current verification chain explicitly preserves `external_support_certified=false`; see the raw v30/v31 adjudicator lines below.

Additional exposition burden: write the related-work/confrontation section. The literature gap report records that positioning against IIT/Tononi-Koch, GWT/GNW/Dehaene-Mashour, HOT, FEP/Friston, predictive processing, operationalism, and personal-identity literature remains incomplete.

## What this package does NOT claim

- It does not close the `I_int / atomic separator` gap.
- It does not prove atomicity.
- It does not instantiate a certified concrete `S`.
- It does not validate QICN externally.
- It does not certify non-circularity.
- It does not claim consciousness, identity, subjectivity, phenomenality, superiority, human equivalence, moral status, or bridge confirmation.

## Verification provenance

Command run from cwd `rigid-identity-framework/`:

```powershell
npm run verify
```

Raw adjudicator lines:

```text
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Interpretation: exit code 0 means the gates ran. It does not mean the corpus is certified, externally validated, or bridge-confirmed.
