# QICN Phase 7 Candidate Instantiation and Non-Circularity Test

Status: `NON_CIRCULARITY_EMPIRICALLY_SUPPORTED_PENDING_HUMAN_REVIEW`

Date: 2026-06-15

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Candidate id: `candidate_qicn_instantiation_non_canonical`

This report is a non-canonical AI-output artifact. It does not close the
`I_int / atomic separator` gap, does not certify non-circularity, does not
validate QICN externally, and does not make any consciousness, agency,
subjectivity, phenomenality, or superiority claim.

## Scope

The prompt requested three linked operations:

1. Reproducible Phase 7 environment.
2. GNW detector by principles rather than density.
3. Candidate QICN instantiation using finite connected incidence, plus an
   empirical no-leak/non-circularity test and a preliminary comparison only if
   the test supported proceeding.

All new material is under `docs/ai-platform-outputs/`. No canon, registry,
release artifact, paper `.tex`, monolith, production source, or `package.json`
was modified.

## Part A: Reproducible Environment

Artifacts:

- `docs/ai-platform-outputs/sims/phase7/requirements.txt`
- `docs/ai-platform-outputs/sims/phase7/REPRODUCIBILITY.md`
- `docs/ai-platform-outputs/sims/phase7/phase7_run_all.js`
- `docs/ai-platform-outputs/sims/phase7/results/latest/`

Pinned environment:

- Python tested: Codex bundled Python `3.12.13`.
- PyPhi: `pyphi==1.2.0`.
- Dependency versions are pinned in `requirements.txt`.
- `.venv-phase7/` remains ignored.
- JSON I/O is UTF-8 without BOM.
- PyPhi wrapper now reads JSON with explicit UTF-8 decoding and raises clear
  errors for decode, BOM, JSON, or I/O failures.

Deterministic runner:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --out-dir rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\results\latest
```

Reproducibility sanity:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --self-test
```

Result:

| check | value |
|---|---|
| first digest | `DAD78BABEAD54F2F4FED292B651F40BDCF235E1A1FCDE3797BD8A22CAFEEE3F5` |
| second digest | `DAD78BABEAD54F2F4FED292B651F40BDCF235E1A1FCDE3797BD8A22CAFEEE3F5` |
| status | `PASS` |

Tracked result hashes:

| artifact | SHA256 |
|---|---|
| `phase7_bank_v2.json` | `9BF1AC8B6DF9FB525179BF72225B97193EFE06B4E99DAB11487046B0494D1D48` |
| `phase7_pyphi_results.json` | `B5CE43ABA8EB0592895C5DB9F5DD0914AB6114D54D3A9ED947FAC424938368B2` |
| `phase7_gnw_principles_results.json` | `1B4D002B08BF2A51370ABACD01F410AC381E991793A2A2569D0C98D07A786DE3` |
| `phase7_qicn_candidate_noncircularity.json` | `9273BD6D1D0505929686DBEAE67BA02B49883004452AFA3C3C99793606EC48EC` |
| `phase7_run_manifest.json` | `23D16DEF510A71828A17E1569F7D1612441AA675A2D06C71DD5564E975CEBA07` |

## Part B: GNW by Principles

Artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_gnw_principles_detector.js`

Literature anchors:

- Dehaene, Kerszberg, and Changeux, 1998, PNAS: [doi:10.1073/pnas.95.24.14529](https://doi.org/10.1073/pnas.95.24.14529)
- Dehaene and Changeux, 2011, Neuron: [doi:10.1016/j.neuron.2011.03.018](https://doi.org/10.1016/j.neuron.2011.03.018)
- Mashour, Roelfsema, Changeux, and Dehaene, 2020, Neuron: [doi:10.1016/j.neuron.2020.01.026](https://doi.org/10.1016/j.neuron.2020.01.026)

Operationalization:

| GNW principle | finite Boolean proxy |
|---|---|
| non-linear ignition | one-hot perturbation produces a large activation jump |
| recurrent reverberation | wide activation persists across consecutive steps |
| sustained global broadcast | activation reaches a wide fraction and remains available |
| selectivity against density | structured hub/feedback selectivity is required; complete dense graphs do not pass by density alone |

Self-test:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\qicn_phase7_gnw_principles_detector.js --self-test
```

Result: `PASS`.

Sanity:

- `broadcast_star_or`: 4/4 detected as `GNW_PRINCIPLED_IGNITION_AVAILABLE`.
- `all_to_all_and`, `all_to_all_or`, `all_to_all_nand`: 12/12 rejected.
- random-density controls: 12/12 rejected.
- Full bank result: 4 detected, 52 not detected.

Limit:

This is a finite operational detector for GNW-like principles over toy Boolean
systems. It is not the full neuronal GNW model and is not a consciousness
detector.

## Part C: Candidate QICN Instantiation

Artifact:

- `docs/ai-platform-outputs/sims/phase7/qicn_phase7_qicn_candidate_noncircularity.js`

Operationalization:

- Source: v20 connected-incidence scaffold, used only as a finite non-canonical
  candidate over Boolean transition tables.
- Classifier input: `n`, `transition_table`.
- Excluded from classifier input: `id`, `family`, `edges`,
  `qicn_instantiation_status`, construction truth labels, factorization labels.
- Rule: for each state and each single-node flip, compare unperturbed and
  perturbed trajectories for up to `n` steps; build a separator-response
  incidence graph; require separator completeness, response completeness, and
  connected bipartite incidence.

Self-test:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\qicn_phase7_qicn_candidate_noncircularity.js --self-test
```

Result: `PASS`.

Leakage audit:

| item | result |
|---|---|
| classifier input contract | `["n","transition_table"]` |
| forbidden token scan | no hits |
| leakage status | `PASS` |

Atomicity recovery:

| metric | value |
|---|---:|
| scored systems | 44 |
| unscored random systems | 12 |
| TP | 36 |
| TN | 8 |
| FP | 0 |
| FN | 0 |
| accuracy | 1.0 |
| sensitivity | 1.0 |
| specificity | 1.0 |

Important limitation:

The 12 random-density systems are not scored for atomicity recovery because
their family label does not guarantee non-factorizability. They remain stress
tests, not truth-labeled atomicity controls. This prevents an inflated accuracy
claim over unlabeled random seeds.

Verdict:

`NON_CIRCULARITY_EMPIRICALLY_SUPPORTED_PENDING_HUMAN_REVIEW`

Reviewer burden:

The human reviewer must decide whether finite separator-complete connected
incidence is a natural, non-circular observable condition, or whether it merely
redefines atomicity in operational disguise. The IA result is evidence, not
certification.

## Conditional Preliminary Comparison

Because the no-leak/non-circularity test returned empirical support pending
human review, the runner attached a preliminary n=3 toy comparison. Label:

`PRELIMINARY_SUBJECT_TO_HUMAN_APPROVAL_OF_QICN_INSTANTIATION`

Thresholds used:

- IIT/PyPhi high toy Phi: PyPhi state sweep available with max Phi `>= 0.5`
  and mean Phi `>= 0.1`.
- GNW available: `GNW_PRINCIPLED_IGNITION_AVAILABLE`.
- QICN candidate present: connected incidence present.

Outcome counts over n=3:

| outcome class | count |
|---|---:|
| `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` | 5 |
| `PRELIM_TOY_FAVORS_QICN_CANDIDATE` | 5 |
| `PRELIM_TOY_ALL_FAIL_OR_NEGATIVE` | 4 |
| `PRELIM_TOY_FAVORS_IIT` | 0 |
| `PRELIM_TOY_FAVORS_GNW` | 0 |

Rows:

| family | QICN candidate | IIT/PyPhi | GNW principles | outcome |
|---|---|---|---|---|
| `product_decoupled_copy` | absent | low | not detected | `PRELIM_TOY_ALL_FAIL_OR_NEGATIVE` |
| `chain_feedforward_copy` | absent | low | not detected | `PRELIM_TOY_ALL_FAIL_OR_NEGATIVE` |
| `cycle_ring_copy` | present | high | not detected | `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` |
| `broadcast_star_or` | present | low | available | `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` |
| `all_to_all_majority` | present | high | not detected | `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` |
| `all_to_all_and` | present | low | not detected | `PRELIM_TOY_FAVORS_QICN_CANDIDATE` |
| `all_to_all_or` | present | low | not detected | `PRELIM_TOY_FAVORS_QICN_CANDIDATE` |
| `all_to_all_nand` | present | low | not detected | `PRELIM_TOY_FAVORS_QICN_CANDIDATE` |
| `threshold_2_of_n` | present | high | not detected | `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` |
| `threshold_n_minus_1_of_n` | present | high | not detected | `PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT` |
| `mixed_node_rules` | present | low | not detected | `PRELIM_TOY_FAVORS_QICN_CANDIDATE` |
| `random_density_030_parity` | absent | low | not detected | `PRELIM_TOY_ALL_FAIL_OR_NEGATIVE` |
| `random_density_050_majority` | absent | low | not detected | `PRELIM_TOY_ALL_FAIL_OR_NEGATIVE` |
| `random_density_050_mixed` | present | low | not detected | `PRELIM_TOY_FAVORS_QICN_CANDIDATE` |

Interpretation:

The comparison shows distinguishability patterns over toy Boolean systems. It
does not show that QICN is superior to IIT or GNW, does not validate QICN, and
does not decide the open formal gap.

## No-Conclusions

- No `I_int / atomic separator` gap closure is certified.
- No non-circularity proof is claimed.
- No external validation is claimed.
- No consciousness, phenomenality, agency, human equivalence, or subjectivity
  claim follows.
- No rival is defeated.
- No QICN superiority claim is permitted.
- The v20 connected-incidence scaffold is not canonized.

## Residual Risks

- The finite connected-incidence condition may still be circular in a deeper
  formal sense even though this implementation did not leak construction labels.
- Accuracy is perfect only over scored designed controls; random-density seeds
  are reported but not truth-scored.
- The GNW detector is principle-based but still a toy finite Boolean
  operationalization, not full GNW.
- PyPhi exact computation remains tractable here only for `n=3`; `n=4..6`
  remain `INTRACTABLE`.

