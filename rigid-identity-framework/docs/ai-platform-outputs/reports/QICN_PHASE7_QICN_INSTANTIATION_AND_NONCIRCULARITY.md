# QICN Phase 7 Atomicity Truth and Connected-Incidence Audit

Status: `CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`

Date: 2026-06-15

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

## Deterministic Runner

Command:

```powershell
node docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --self-test
```

Result: `PASS`.

The digest changed, as expected, because the QICN candidate result changed.

| run | digest |
|---|---|
| first | `01D8B037D35EF6BEC70C2AD046D4033E7AB229A439193C0BC69F49AC11CDF1E4` |
| second | `01D8B037D35EF6BEC70C2AD046D4033E7AB229A439193C0BC69F49AC11CDF1E4` |

Latest tracked result hashes:

| artifact | SHA256 |
|---|---|
| `phase7_bank_v2.json` | `9BF1AC8B6DF9FB525179BF72225B97193EFE06B4E99DAB11487046B0494D1D48` |
| `phase7_pyphi_results.json` | `B5CE43ABA8EB0592895C5DB9F5DD0914AB6114D54D3A9ED947FAC424938368B2` |
| `phase7_gnw_principles_results.json` | `1B4D002B08BF2A51370ABACD01F410AC381E991793A2A2569D0C98D07A786DE3` |
| `phase7_qicn_candidate_noncircularity.json` | `6CC5C822D6219C6A51DCE22D88E020D79C5C19AAA52546378513F4A9FDA9B37E` |
| `phase7_run_manifest.json` | `52148B0F062C479D38F742628C00C7E9DA0EC3056E97D787A4DE78C2C096E4FC` |

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
