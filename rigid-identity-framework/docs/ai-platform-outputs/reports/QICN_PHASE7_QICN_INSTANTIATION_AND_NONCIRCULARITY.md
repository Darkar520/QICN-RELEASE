# QICN Phase 7 Atomicity Truth and Connected-Incidence Audit

Status: `CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`

Date: 2026-06-15

Out-of-sample/control addendum: 2026-06-16

Balanced hold-out addendum: 2026-06-16

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

The hold-out is separate from the 14 bank-v2 families. It now contains 46
systems over `n=3..4`: 24 deterministic pseudo-random TPMs from seed `917503`,
8 hand-constructed transition systems that are not instances of the bank-v2
templates, and 14 confirmed factorizable block-product systems. The
factorizable systems are not derived from `product_decoupled_copy`: they use
independent node blocks with non-identity intra-block rules such as AND, OR,
XOR, NAND, mux-style and parity-style updates. Each candidate negative is
retained only if `computeAtomicityTruth` returns
`FACTORIZABLE_NON_ATOMIC` from `n + transition_table`.

The generator is deterministic and records bank digest
`DA6FF03047B77008F5A885D1F7ED47D0AE7355EDFF9661848E9792F42DC02E4D`.

Evaluation order is fixed in the artifact:

1. build the hold-out transition tables deterministically;
2. compute atomicity truth first from `n + transition_table`;
3. then evaluate the connected-incidence classifier from the same
   `n + transition_table`;
4. report the matrix without threshold tuning or narrative upgrade.

Hold-out confusion against brute-force dynamic-factorization truth:

| metric | value |
|---|---:|
| scored systems | 46 |
| unscored systems | 0 |
| computed `NON_FACTORIZABLE_ATOMIC` systems | 31 |
| computed `FACTORIZABLE_NON_ATOMIC` systems | 15 |
| TP | 30 |
| TN | 15 |
| FP | 0 |
| FN | 1 |
| accuracy | 0.9783 |
| sensitivity | 0.9677 |
| specificity | 1.0 |

Specificity is now supported by 15 truth-confirmed negative systems
(`TN + FP = 15`), including 14 purpose-built factorizable block products plus
one pre-existing factorizable hold-out system. Connected incidence produced no
false positives on this balanced negative slice (`FP = 0`). This remains a
finite local toy hold-out, not external validation.

The single hold-out false negative is:

| system | n | source | computed truth | connected-incidence prediction |
|---|---:|---|---|---|
| `holdout_manual_conditional_rotate_or_complement_n4_seed967509` | 4 | hand-constructed TPM | `NON_FACTORIZABLE_ATOMIC` | absent |

Comparison to in-sample bank v2: hold-out accuracy and sensitivity are higher
than the in-sample values (`0.9783` vs `0.8929`; `0.9677` vs `0.875`), while
specificity remains `1.0` on a larger negative base (`15` negatives here vs
`8` in-sample negatives). This is a finite deterministic toy hold-out
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
| first | `15473E145933F0A54E30A0005C44683CFCF0D64EC62B15DD9B31829169DEC6F1` |
| second | `15473E145933F0A54E30A0005C44683CFCF0D64EC62B15DD9B31829169DEC6F1` |

Latest tracked result hashes:

| artifact | SHA256 |
|---|---|
| `phase7_bank_v2.json` | `9BF1AC8B6DF9FB525179BF72225B97193EFE06B4E99DAB11487046B0494D1D48` |
| `phase7_pyphi_results.json` | `03417C3BB3F8120DC0517848DAEEF92E383744D3F337B0A134552C890FEAA0A5` |
| `phase7_phi_positive_control_bank.json` | `5777FBE03C6B8183DC08CA1839AAD16E8EF7E4A0161A7E4EEE3898023A9CDDAD` |
| `phase7_phi_positive_control_pyphi_results.json` | `4728F86DFE61C4095BCF3A99F15069DABAC7E9BC558F9A4C6B247DF278E9B71E` |
| `phase7_gnw_principles_results.json` | `1B4D002B08BF2A51370ABACD01F410AC381E991793A2A2569D0C98D07A786DE3` |
| `phase7_qicn_candidate_noncircularity.json` | `6CC5C822D6219C6A51DCE22D88E020D79C5C19AAA52546378513F4A9FDA9B37E` |
| `phase7_holdout_generalization.json` | `25A31B6F666B921C888C73A056F67140CCBE7291E4961CB6B1B054895D8F25F3` |
| `phase7_run_manifest.json` | `ECA1F5D07045869EBADCC4E911046BF58C2761013942AA9A13294985E5CD5880` |

## Label-Permutation Invariance

New artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_label_permutation_invariance.js`

Command:

```powershell
node docs\ai-platform-outputs\sims\phase7\qicn_phase7_label_permutation_invariance.js --self-test
```

Result: `PASS`.

Observed status: `LABEL_INVARIANCE_CONFIRMED`.

The test permutes only the `family` field over bank v2 while leaving `n` and
`transition_table` unchanged. It includes five known cross-label mutations
(`majority<->product`, `cycle<->product`, `broadcast<->product`,
`threshold<->product`, and `random-majority<->product`) plus systematic
rotations/cycles over the family labels.

| metric | value |
|---|---:|
| permutations tested | 10 |
| known cross-label mutations tested | 5 |
| system evaluations | 560 |
| family-field mutations | 248 |
| transition-table changes | 0 |
| observable-input changes | 0 |
| classification changes | 0 |

Invariancia a la etiqueta es necesaria, no suficiente, para no-circularidad;
la suficiencia la da la verdad computada + hold-out. This result closes only
the narrow empirical label-leakage check over bank v2; it does not prove that
connected incidence is a non-circular formal substitute for atomicity.

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
- La evidencia calibratoria de Fase 7 (PyPhi/GNW sobre sistemas Booleanos
  pequeños) NO constituye el bridge condicional al CCR target de paper5 §11;
  es medición interna, no certificación del approximation theorem. The relevant
  Paper 5 anchor is the approximate-stability theorem and its bounded-margin
  condition (`paper5_operational_consciousness/main.tex:711-733`), especially
  the warning that approximation is bounded by positive witness margins rather
  than by arbitrary continuity (`paper5_operational_consciousness/main.tex:733`).
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
