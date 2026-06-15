# QICN Phase 7 Real Rival Profiles

Status: `PHASE7_REAL_RIVAL_ARM_PROFILED_NO_QICN_COMPARISON`

Date: 2026-06-15

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Scope: complete only the real-rivals arm over a neutral Boolean bank v2. This is
not a QICN instantiation, not a QICN-vs-rival comparison, not an external
validation claim, and not a consciousness claim.

## Boundary

The decisive QICN branch remains blocked by
`BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP`. The bank v2 systems carry
`qicn_instantiation_status:
NOT_INSTANTIATED_BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP`. No QICN invariant,
gate, `I_int`, `Piop`, CCR non-simulability score, or superiority metric is
computed here.

The only completed operation is rival-side profiling:

- IIT/PyPhi: exact PyPhi 1.2.0 state sweep on tractable `n=3` bank-v2 systems.
- GWT/GNW: existing minimal Boolean broadcast/ignition detector extended to bank
  v2.

## Environment

- Isolated environment: `.venv-phase7/` at repo root, ignored by `.gitignore`.
- PyPhi package: `pyphi==1.2.0`.
- PyPhi runtime issue: PyPhi 1.2.0 imports legacy ABC aliases from
  `collections`; the wrapper applies a narrow Python 3.12 compatibility shim
  before import.
- Wrapper policy: no homemade Phi proxy. If PyPhi is absent, output is
  `EXTERNAL_DEPENDENCY_PENDING`; if present, exact PyPhi is attempted.
- PyPhi configuration: single-core, progress bars off, filesystem cache under
  `.venv-phase7/pyphi_cache`, subsystem state validation disabled to sweep all
  deterministic Boolean states requested by this phase.

## Neutral Bank v2

Artifact:
`rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase7_neutral_systems_bank_v2.js`

Self-test:

- Status: `PASS`
- Digest: `C1BDCB64E29B6DC3C7CB9673918DF582E1652CDE1C48FC49DCCA48F839C5A6CF`
- Systems: 56
- Families: 14
- `n`: 3, 4, 5, 6

Families:

| family | role |
|---|---|
| `product_decoupled_copy` | product negative control |
| `chain_feedforward_copy` | feedforward control |
| `cycle_ring_copy` | local recurrent ring |
| `broadcast_star_or` | broadcast-style positive control for GWT |
| `all_to_all_majority` | dense threshold positive-control candidate for PyPhi |
| `all_to_all_and` | dense conjunctive Boolean control |
| `all_to_all_or` | dense disjunctive Boolean control |
| `all_to_all_nand` | dense NAND Boolean control |
| `threshold_2_of_n` | low-threshold dense control |
| `threshold_n_minus_1_of_n` | high-threshold dense control |
| `mixed_node_rules` | heterogeneous dense Boolean control |
| `random_density_030_parity` | seeded sparse parity control |
| `random_density_050_majority` | seeded medium-density majority control |
| `random_density_050_mixed` | seeded medium-density mixed control |

## PyPhi Results

Command:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_neutral_systems_bank_v2.js --emit-json | .\.venv-phase7\Scripts\python.exe rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_pyphi_wrapper.py --max-n 3
```

Runtime status: `PYPHI_AVAILABLE_REAL_STATE_SWEEP_ATTEMPTED`

PyPhi version: `1.2.0`

Observed exact ceiling in this phase: `n=3` full state sweep. Systems with
`n=4..6` are marked `INTRACTABLE` by declared policy, not assigned substitute
values.

Self-test sanity:

| case | result |
|---|---:|
| product decoupled n=2, all states | max Phi `0.0` |
| official PyPhi `basic_subsystem`, state `(1,0,0)` | Phi `2.3125` |

PyPhi bank-v2 distributions for `n=3`:

| family | states | min | p25 | median | p75 | max | mean | status |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `product_decoupled_copy` | 8 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `chain_feedforward_copy` | 8 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `cycle_ring_copy` | 8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `broadcast_star_or` | 8 | 0.005102 | 0.005102 | 0.04769 | 0.090278 | 0.125 | 0.05203025 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `all_to_all_majority` | 8 | 0.125 | 0.125 | 0.314732 | 0.3377155 | 0.941965 | 0.33347837 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `all_to_all_and` | 8 | 0.028061 | 0.034758 | 0.038106 | 0.041454 | 0.15625 | 0.05161838 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `all_to_all_or` | 8 | 0.028061 | 0.034758 | 0.038106 | 0.041454 | 0.15625 | 0.05161838 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `all_to_all_nand` | 8 | 0.041454 | 0.041454 | 0.051598 | 0.085369 | 0.248354 | 0.086738 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `threshold_2_of_n` | 8 | 0.125 | 0.125 | 0.314732 | 0.3377155 | 0.941965 | 0.33347837 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `threshold_n_minus_1_of_n` | 8 | 0.125 | 0.125 | 0.314732 | 0.3377155 | 0.941965 | 0.33347837 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `mixed_node_rules` | 8 | 0.034758 | 0.03978 | 0.041454 | 0.07902925 | 0.15625 | 0.06436037 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `random_density_030_parity` | 8 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `random_density_050_majority` | 8 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | `PYPHI_STATE_SWEEP_COMPUTED` |
| `random_density_050_mixed` | 8 | 0.005102 | 0.05335925 | 0.107639 | 0.1403075 | 0.214286 | 0.10255538 | `PYPHI_STATE_SWEEP_COMPUTED` |

PyPhi sanity judgment:

- Product control passes: Phi is zero over every product state.
- Dense majority candidate discriminates above product at `n=3`, with max
  Phi `0.941965` and mean Phi `0.33347837`.
- The result is still a tiny-system rival profile. It is not an IIT validation
  experiment and not a QICN comparison.

## GWT/GNW Broadcast Results

Command:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_gwt_broadcast_model.js --bank-v2
```

Runtime status: `GWT_MODEL_EXECUTED_NO_QICN_COMPARISON`

Self-test sanity:

| case | score | classification |
|---|---:|---|
| v1 product decoupled n=4 | 0.175 | `GWT_BROADCAST_NOT_DETECTED` |
| v1 broadcast star n=4 | 0.925 | `GWT_BROADCAST_AVAILABLE` |

Bank-v2 compact scores:

| family | n=3 | n=4 | n=5 | n=6 |
|---|---|---|---|---|
| `product_decoupled_copy` | 0.2333 NOT | 0.175 NOT | 0.14 NOT | 0.1167 NOT |
| `chain_feedforward_copy` | 0.3889 NOT | 0.3063 NOT | 0.252 NOT | 0.2139 NOT |
| `cycle_ring_copy` | 0.4667 NOT | 0.35 NOT | 0.28 NOT | 0.2333 NOT |
| `broadcast_star_or` | 1.0 AVAILABLE | 0.925 AVAILABLE | 0.92 AVAILABLE | 0.9167 AVAILABLE |
| `all_to_all_majority` | 0.4667 NOT | 0.4375 NOT | 0.42 NOT | 0.4083 NOT |
| `all_to_all_and` | 0.4667 NOT | 0.4375 NOT | 0.42 NOT | 0.4083 NOT |
| `all_to_all_or` | 1.0 AVAILABLE | 1.0 AVAILABLE | 1.0 AVAILABLE | 1.0 AVAILABLE |
| `all_to_all_nand` | 0.9 AVAILABLE | 0.9 AVAILABLE | 0.9 AVAILABLE | 0.9 AVAILABLE |
| `threshold_2_of_n` | 0.4667 NOT | 0.4375 NOT | 0.42 NOT | 0.4083 NOT |
| `threshold_n_minus_1_of_n` | 0.4667 NOT | 0.4375 NOT | 0.42 NOT | 0.4083 NOT |
| `mixed_node_rules` | 0.5833 NOT | 0.9125 AVAILABLE | 0.93 AVAILABLE | 0.7917 AVAILABLE |
| `random_density_030_parity` | 0.2722 NOT | 0.4594 NOT | 0.196 NOT | 0.6444 NOT |
| `random_density_050_majority` | 0.4667 NOT | 0.4156 NOT | 0.406 NOT | 0.3889 NOT |
| `random_density_050_mixed` | 0.5833 NOT | 0.7625 AVAILABLE | 0.378 NOT | 0.7819 AVAILABLE |

GWT sanity judgment:

- Product controls remain low and not detected for all `n`.
- Broadcast-star controls remain high and detected for all `n`.
- The detector also classifies dense OR, NAND, and some mixed networks as
  broadcast-available. That is expected for this deliberately minimal Boolean
  broadcast detector, but it is also a warning: this arm measures broadcast-like
  ignition in tiny systems, not full GNW theory.

## Downstream Preconditions

Before any QICN-vs-rival comparison, the following must be true:

1. Human review decides whether the `I_int / atomic separator` gap has a
   non-circular closure or must remain an irreducible assumption.
2. QICN observables are instantiated without using rival labels or post-hoc
   outcome leakage.
3. The same neutral bank states are swept symmetrically for QICN and rivals.
4. Predictions from the existing claim-to-rival matrix are preregistered before
   seeing QICN outputs.
5. Rival-favoring and QICN-favoring result classes are accepted symmetrically.

## No-Conclusions

- No QICN result was computed.
- No QICN-vs-IIT/GWT/HOT comparison was run.
- No rival was defeated.
- No QICN claim was validated externally.
- No phenomenality, consciousness, agency, or human-equivalence claim follows
  from this artifact.
- No canon, registry, release artifact, paper `.tex`, monolith, or production
  package manifest was modified.

## Residual Debt

- PyPhi exact state sweeps are only observed here for `n=3`; `n=4..6` remain
  marked `INTRACTABLE`.
- GWT/GNW remains a minimal broadcast detector, not a full rival model.
- HOT remains unimplemented in this continuation.
- The QICN side remains blocked by human review of the `I_int / atomic
  separator` gap.

