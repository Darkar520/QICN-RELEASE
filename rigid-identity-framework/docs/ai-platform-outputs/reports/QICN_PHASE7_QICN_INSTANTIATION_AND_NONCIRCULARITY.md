# QICN Phase 7 Atomicity Truth and Connected-Incidence Audit

Status: `CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`

Date: 2026-06-15

Out-of-sample/control addendum: 2026-06-16

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Candidate id: `candidate_qicn_instantiation_non_canonical`

This report supersedes the earlier family-label-based recovery result. The
previous result was circular because atomicity truth was assigned from
`system.family`. This pass replaces that truth with brute-force dynamic
factorization computed only from `{n, transition_table}`.

No `I_int / atomic separator` gap closure is certified. No non-circularity proof
is claimed. No superiority, validation, external adjudication, consciousness,
agency, subjectivity, phenomenality, or human-equivalence claim is made.

## What Changed

New artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_atomicity_ground_truth.js`

Updated artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_qicn_candidate_noncircularity.js`

The new truth module defines a system as `FACTORIZABLE_NON_ATOMIC` iff there is
a nontrivial bipartition `{A,B}` of nodes such that:

- the next state of block `A` is determined only by the current projection on
  `A`;
- the next state of block `B` is determined only by the current projection on
  `B`.

If no such bipartition exists, the system is `NON_FACTORIZABLE_ATOMIC`.

The truth computation reads only:

```text
n
transition_table
```

It does not read `family`, `edges`, `id`, `qicn_instantiation_status`, or any
construction label.

## Atomicity Truth Self-Test

Command:

```powershell
node docs\ai-platform-outputs\sims\phase7\qicn_phase7_atomicity_ground_truth.js --self-test
```

Result: `PASS`.

Checks:

| case | expected | observed |
|---|---|---|
| `product_decoupled_copy_n3` | `FACTORIZABLE_NON_ATOMIC` | `FACTORIZABLE_NON_ATOMIC` |
| `all_to_all_majority_n3` | `NON_FACTORIZABLE_ATOMIC` | `NON_FACTORIZABLE_ATOMIC` |
| `cycle_ring_copy_n3` | `NON_FACTORIZABLE_ATOMIC` | `NON_FACTORIZABLE_ATOMIC` |

Truth-source contract audit:

| item | value |
|---|---|
| allowed input | `["n","transition_table"]` |
| forbidden labels checked | `family`, `edges`, `id`, `qicn_instantiation_status`, `true_atomicity`, `groundTruth` |
| forbidden hits | none |
| status | `PASS` |

## Connected-Incidence Classifier

The candidate classifier still builds a perturbation-response incidence graph
from the observable transition table:

1. for each state;
2. for each single-node flip;
3. compare unperturbed and perturbed trajectories for up to `n` steps;
4. record which response coordinates diverge;
5. require separator completeness, response completeness, and connected
   bipartite incidence.

The classifier input contract remains:

```text
["n","transition_table"]
```

The input-contract field is named `input_contract_audit`. This is deliberate:
the scan only checks whether forbidden inputs are read by the observable
classifier. It does not prove non-circularity.

## Recalculated Confusion Matrix

Command:

```powershell
node docs\ai-platform-outputs\sims\phase7\qicn_phase7_qicn_candidate_noncircularity.js --self-test
```

Result: `PASS` as an operational self-test, with a negative scientific result.

Verdict:

`CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`

Confusion against computed dynamic-factorization truth:

| metric | value |
|---|---:|
| scored systems | 56 |
| unscored systems | 0 |
| computed `NON_FACTORIZABLE_ATOMIC` systems | 48 |
| computed `FACTORIZABLE_NON_ATOMIC` systems | 8 |
| TP | 42 |
| TN | 8 |
| FP | 0 |
| FN | 6 |
| accuracy | 0.8929 |
| sensitivity | 0.875 |
| specificity | 1.0 |

False negatives:

| family | n | computed truth | connected-incidence prediction |
|---|---:|---|---|
| `chain_feedforward_copy` | 3 | `NON_FACTORIZABLE_ATOMIC` | absent |
| `chain_feedforward_copy` | 4 | `NON_FACTORIZABLE_ATOMIC` | absent |
| `random_density_030_parity` | 4 | `NON_FACTORIZABLE_ATOMIC` | absent |
| `chain_feedforward_copy` | 5 | `NON_FACTORIZABLE_ATOMIC` | absent |
| `chain_feedforward_copy` | 6 | `NON_FACTORIZABLE_ATOMIC` | absent |
| `random_density_030_parity` | 6 | `NON_FACTORIZABLE_ATOMIC` | absent |

Interpretation:

Connected incidence is conservative with no false positives here, but it misses
six systems that are non-factorizable by brute-force dynamic factorization.
Therefore it does not recover computed atomicity at the declared high-accuracy
threshold. This is the honest result, not an implementation failure to hide.

## Out-of-Sample Hold-Out

New artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_holdout_bank.js`

Status:

`OUT_OF_SAMPLE_GENERALIZATION_MEASURED`

The hold-out is separate from the 14 bank-v2 families. It contains 32 systems
over `n=3..4`: 24 deterministic pseudo-random TPMs from seed `917503`, plus 8
hand-constructed transition systems that are not instances of the bank-v2
templates. The generator is deterministic and records bank digest
`FB2468F998A2FA0DE6C09DA566045F7B457E64048B1A28B4F3566D2867DB139D`.

Evaluation order is fixed in the artifact:

1. build the hold-out transition tables deterministically;
2. compute atomicity truth first from `n + transition_table`;
3. then evaluate the connected-incidence classifier from the same
   `n + transition_table`;
4. report the matrix without threshold tuning or narrative upgrade.

Hold-out confusion against brute-force dynamic-factorization truth:

| metric | value |
|---|---:|
| scored systems | 32 |
| unscored systems | 0 |
| TP | 30 |
| TN | 1 |
| FP | 0 |
| FN | 1 |
| accuracy | 0.9688 |
| sensitivity | 0.9677 |
| specificity | 1.0 |

The single hold-out false negative is:

| system | n | source | computed truth | connected-incidence prediction |
|---|---:|---|---|---|
| `holdout_manual_conditional_rotate_or_complement_n4_seed967509` | 4 | hand-constructed TPM | `NON_FACTORIZABLE_ATOMIC` | absent |

Comparison to in-sample bank v2: hold-out accuracy and sensitivity are higher
than the in-sample values (`0.9688` vs `0.8929`; `0.9677` vs `0.875`), while
specificity remains `1.0`. This is a finite deterministic toy hold-out
measurement only. It does not reverse the in-sample verdict, does not prove
non-circularity, and does not close the `I_int / atomic separator` gap.

## Deterministic Runner

Command:

```powershell
node docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --self-test
```

Result: `PASS`.

The digest changed, as expected, because the runner now emits separate
hold-out and Phi positive-control-candidate artifacts. The in-sample QICN
candidate result hash did not change.

| run | digest |
|---|---|
| first | `2380DC149E25DBFEFB39F6189D2E686DA55EAF387C93356BD11D4CF853A8B050` |
| second | `2380DC149E25DBFEFB39F6189D2E686DA55EAF387C93356BD11D4CF853A8B050` |

Latest tracked result hashes:

| artifact | SHA256 |
|---|---|
| `phase7_bank_v2.json` | `9BF1AC8B6DF9FB525179BF72225B97193EFE06B4E99DAB11487046B0494D1D48` |
| `phase7_pyphi_results.json` | `03417C3BB3F8120DC0517848DAEEF92E383744D3F337B0A134552C890FEAA0A5` |
| `phase7_phi_positive_control_bank.json` | `5777FBE03C6B8183DC08CA1839AAD16E8EF7E4A0161A7E4EEE3898023A9CDDAD` |
| `phase7_phi_positive_control_pyphi_results.json` | `4728F86DFE61C4095BCF3A99F15069DABAC7E9BC558F9A4C6B247DF278E9B71E` |
| `phase7_gnw_principles_results.json` | `1B4D002B08BF2A51370ABACD01F410AC381E991793A2A2569D0C98D07A786DE3` |
| `phase7_qicn_candidate_noncircularity.json` | `6CC5C822D6219C6A51DCE22D88E020D79C5C19AAA52546378513F4A9FDA9B37E` |
| `phase7_holdout_generalization.json` | `A47DE9E011CCBEC755A51729F922B101708E925B2F9421C78E642B48825AF89A` |
| `phase7_run_manifest.json` | `E97BD25B098E50D11502DF5F646D1B5D61BCAE51C3C652670644EA04E902A205` |

Because the recovery test failed the high-accuracy threshold, the preliminary
QICN/IIT/GNW comparison is not run:

```text
status: NOT_RUN
reason: Connected incidence did not recover computed atomicity at the preregistered threshold.
```

## Raw Verify Verdict

Command from `rigid-identity-framework/`:

```powershell
npm run verify
```

Exit code: `0`.

Raw adjudicator lines:

```text
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Interpretation:

`exit code 0 = los gates corrieron; NO = corpus certificado.
external_support_certified=false.`

The package verification ran successfully as a gate process, but the scientific
status remains blocked.

## No-Conclusions

- No non-circularity is certified.
- No `I_int / atomic separator` gap is closed.
- No comparison is run after the computed-truth recovery failure.
- The hold-out result is not an external validation result and does not
  override the in-sample negative verdict.
- No external validation is claimed.
- No consciousness, phenomenality, agency, subjectivity, or human-equivalence
  claim follows.
- The v20 connected-incidence scaffold is not canonized.

## Residual Risks

- Connected incidence may still be useful as a sufficient condition, but it is
  not an empirical recovery of dynamic non-factorization over this bank.
- The independent truth definition is finite and exact for these Boolean
  systems; it is not a theorem for arbitrary systems.
- PyPhi exact computation remains tractable here only for `n=3`; `n=4..6`
  remain `INTRACTABLE`.
