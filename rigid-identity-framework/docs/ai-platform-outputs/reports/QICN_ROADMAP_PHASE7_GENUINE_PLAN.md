# QICN Roadmap Phase 7 Genuine Rival Plan

Date: 2026-06-14

Status: `PHASE7_GENUINE_PLAN_AND_RIVAL_INFRA_READY_NO_QICN_COMPARISON_NO_PUSH`

## Executive Boundary

This is a preregistered technical plan plus non-canonical AI-output infrastructure for genuine rival comparison. It does not execute QICN-vs-rival adjudication.

Allowed result class for this phase: `STRUCTURAL_DISTINGUISHABILITY_PREPARED_ON_TINY_NEUTRAL_SYSTEMS`.

Forbidden result classes:

- QICN superiority.
- External validation.
- Neurobiological validation.
- Consciousness, phenomenality, subjecthood, human-equivalence, identity-transfer, or bridge closure.
- Any QICN instantiation while the `I_int / atomic separator` gap remains under human review.

The QICN branch is explicitly blocked as:

`BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP`

## Inputs Read

Governance and source-of-truth:

- `docs/CANON_SOURCE_OF_TRUTH.md`
- `docs/CANON_MANIFEST.md`
- `docs/CLAIM_REGISTRY.md`
- `docs/LAYER_BOUNDARIES.md`
- `docs/THEORY_SYSTEM_INTERFACE.md`
- `rigid-identity-framework/INSTRUCCIONES.md`
- `rigid-identity-framework/ROADMAP.md`
- `rigid-identity-framework/docs/CLAIM_STATUS_POLICY.md`

Rival and preregistration context:

- `rigid-identity-framework/docs/RIVAL_MODEL_REGISTRY.md`
- `rigid-identity-framework/docs/protocols/REAL_RIVAL_ENGAGEMENT_PROTOCOL_v24.md`
- `rigid-identity-framework/docs/protocols/REAL_RIVAL_EXECUTION_REQUIREMENTS_v25.md`
- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_ITERATION2_CLAIM_TO_RIVAL_MAPPING.md`
- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3A_PREREGISTERED_PROTOCOL.md`
- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3A_PREDICTION_REGISTRY_PROPOSAL.json`
- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_2B_HOT_BIBLIOGRAPHY_SEED.bib`

Gap context:

- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_GAP_I_INT_ATOMIC_SEPARATOR_MODEL_CARD.md`
- `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex`

External literature/source anchors consulted:

- PyPhi paper: Mayner et al., "PyPhi: A toolbox for integrated information theory", arXiv/PLOS Computational Biology source surface: https://arxiv.org/abs/1712.09644
- GNW model anchor: Dehaene, Kerszberg, and Changeux, "A neuronal model of a global workspace in effortful cognitive tasks", PNAS 1998, DOI route: https://doi.org/10.1073/pnas.95.24.14529
- GNW review anchor: Dehaene and Changeux, "Experimental and theoretical approaches to conscious processing", Neuron 2011, DOI route: https://doi.org/10.1016/j.neuron.2011.03.018

## Preflight Results

| Check | Result |
|---|---|
| Default `python --version` | `Python 3.11.9`; path is a Hermes agent venv. |
| Default `python -m pip --version` | FAIL: no `pip` in the Hermes venv. |
| Bundled Codex Python | `Python 3.12.13`; `pip 26.0.1` available. |
| PyPhi import | `PYPHI_NOT_INSTALLED` in both observed Python surfaces. |
| PyPhi installability dry-run | First sandboxed run failed with socket permission denial; rerun with approved escalation and `--dry-run` resolved `pyphi-1.2.0` plus dependencies. No package was installed. |
| IIT execution status | `EXTERNAL_DEPENDENCY_PENDING`: exact PyPhi not installed; no Phi proxy computed. |
| GWT execution status | Minimal GNW broadcast/ignition detector implemented and self-tested. |
| HOT status | Bibliography seed exists; no HOT executable model in this phase. Status remains `LITERATURE_AND_MODEL_DEBT`. |

## Deliverables Created

| Artifact | Role | Status |
|---|---|---|
| `docs/ai-platform-outputs/sims/qicn_phase7_neutral_systems_bank.js` | Deterministic neutral Boolean-system bank, n=3..6. | `PASS_SELF_TEST` |
| `docs/ai-platform-outputs/sims/qicn_phase7_pyphi_wrapper.py` | PyPhi real-rival wrapper/interface. Refuses proxy if PyPhi absent. | `PASS_WITH_EXTERNAL_DEPENDENCY_PENDING` |
| `docs/ai-platform-outputs/sims/qicn_phase7_gwt_broadcast_model.js` | Minimal GNW/GWT broadcast-ignition detector on the neutral bank. | `PASS_SELF_TEST` |
| `docs/ai-platform-outputs/reports/QICN_ROADMAP_PHASE7_GENUINE_PLAN.md` | This preregistered plan. | `READY_FOR_HUMAN_REVIEW` |

## Neutral System Bank

The bank contains 28 deterministic Boolean networks: 7 families for each `n=3,4,5,6`.

Families:

| Family | Neutral rationale | Expected use |
|---|---|---|
| `product_decoupled` | Standard product/decoupled negative control; no cross-node causal coupling. | Should be low for IIT and GWT sanity; QICN remains uncomputed. |
| `chain_feedforward` | Standard directed chain; ordered propagation without workspace broadcast by construction. | Control for feedforward propagation. |
| `cycle_ring` | Standard recurrent ring; recurrent but locally distributed. | Control for recurrence without global hub. |
| `all_to_all_majority` | Standard dense threshold network; high coupling but not built from QICN predicates. | Candidate high-integration IIT sanity case once PyPhi is installed. |
| `broadcast_star` | Standard hub-and-spoke graph; explicit global-availability sanity case. | GWT sanity positive. |
| `random_density_030` | Seeded directed random graph at sparse density. | Neutral exploration case. |
| `random_density_050` | Seeded directed random graph at medium density. | Neutral exploration case. |

Neutrality claim is limited: these systems are standard graph/dynamics families, not neuroscience data, not QICN-designed worlds, and not built to favor one theory. They are still toy-scale by necessity because exact IIT/Phi is computationally expensive.

Bank self-test:

```text
status: PASS
system_count: 28
bank_digest: 03D9E72888C891E2EFC763C69D48B5D75D038FC0F7F531E6358204452890265B
```

## IIT / PyPhi Status

Target: exact PyPhi, not a homemade `Phi` surrogate.

Current status:

`EXTERNAL_DEPENDENCY_PENDING`

Reason:

- PyPhi is not installed.
- Dry-run metadata resolution indicates `pyphi-1.2.0` is installable with network access, but this phase did not install it.
- The wrapper exposes an expected input/output interface and refuses to compute any Phi-like proxy when PyPhi is absent.

Expected interface:

```text
input: JSON emitted by qicn_phase7_neutral_systems_bank.js --emit-json
required fields: id, n, transition_table
transition row: state -> next, both binary strings of length n
output fields: system_id, n, state, phi, status
intractable policy: n > 4 or PyPhi runtime errors are INTRACTABLE_OR_INTERFACE_ERROR
```

PyPhi wrapper self-test:

```text
status: PASS_WITH_EXTERNAL_DEPENDENCY_PENDING
pyphi_available: false
no_phi_proxy_computed: true
```

## GWT / GNW Broadcast Model

Implemented model:

`phase7-gwt-broadcast-ignition-detector-v1`

Literature anchor:

- Dehaene, Kerszberg, and Changeux 1998 global neuronal workspace model.
- Dehaene and Changeux 2011 GNW review.

Operational reading:

The detector asks whether a tiny Boolean system has a source/cue capable of producing broad, sustained activation through globally available paths. It measures:

- `global_availability`: average fraction of nodes reachable within two directed graph steps.
- `ignition_score`: best one-hot cue's maximum activation fraction after simulated updates.
- `persistence_score`: best one-hot cue's sustained wide activation fraction.
- `broadcast_source_fraction`: fraction of one-hot cues that reach wide activation.

Classification:

`GWT_BROADCAST_AVAILABLE` only if the combined score, reach, and ignition thresholds pass.

Boundary:

This is one executable formalization of the GNW broadcast/ignition mechanism on tiny Boolean systems. It is not the full Dehaene-Changeux neuronal model, not all of GWT, not GNW empirical validation, and not a consciousness detector.

GWT self-test:

```text
status: PASS
product_decoupled: GWT_BROADCAST_NOT_DETECTED
broadcast_star: GWT_BROADCAST_AVAILABLE
```

Observed n=4 sanity highlights:

| Family | Classification | Broadcast score |
|---|---|---:|
| `product_decoupled` | `GWT_BROADCAST_NOT_DETECTED` | 0.1750 |
| `chain_feedforward` | `GWT_BROADCAST_NOT_DETECTED` | 0.2844 |
| `cycle_ring` | `GWT_BROADCAST_NOT_DETECTED` | 0.3500 |
| `all_to_all_majority` | `GWT_BROADCAST_NOT_DETECTED` | 0.4375 |
| `broadcast_star` | `GWT_BROADCAST_AVAILABLE` | 0.9250 |
| `random_density_030` | `GWT_BROADCAST_NOT_DETECTED` | 0.5813 |
| `random_density_050` | `GWT_BROADCAST_NOT_DETECTED` | 0.4156 |

Interpretation: the GWT detector separates explicit hub broadcast from product/distributed controls. It does not claim that all dense coupling is GNW ignition.

## HOT Status

HOT is not executed in Phase 7.

Reason:

- Phase 6.2B created a minimal HOT bibliography seed.
- Phase 6.3A created a HOT-facing preregistration draft for first-person indexed subjectivity.
- This prompt asks for PyPhi/GWT infrastructure now; HOT remains a later model-selection and implementation debt.

Status:

`HOT_MODEL_DEBT_NOT_EXECUTED`

## QICN Instantiation Requirement

No QICN invariant is computed in this phase.

To instantiate QICN on a Boolean network without ad hoc shortcuts, a later human-approved protocol must define:

| QICN burden | Required Boolean-network instantiation | Status |
|---|---|---|
| SIPM | A typed self-index object, admissible alternatives, and a margin separating privileged self-locus from decoys. | `BLOCKED` |
| CFS | A continuity/fracture intervention family over state histories, not merely Hamming distance. | `BLOCKED` |
| OFIA | Ownership-field intervention asymmetry with self/non-self perturbations defined before outcomes. | `BLOCKED` |
| FPPG | Indexed-model predictive gain over index-neutral/factorized models with equal complexity budget. | `BLOCKED` |
| WRI | Weak-rival irreducibility against memory, narrative, label, history-blind, broadcast, and integration-only rivals. | `BLOCKED` |
| `I_int` | Factorization gap using history, identity, response, separator, and gauge preservation. | `BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP` |
| Atomic separator | Candidate finite connected-incidence package: vertices for separator tests and response coordinates; edges from admissible perturbation-response changes. Must be constructed before asserting atomicity. | `BLOCKED_ON_REVIEWER_BURDEN` |

The v20 connected-incidence note matters because Boolean networks are finite. But the model card makes the crucial burden explicit: the incidence graph must be constructible without already knowing there is no factor-local separator partition. If the construction of `G_S` presupposes atomicity, it is circular and must be rejected.

## Preregistered Separating Predictions

These are preregistered as future hypotheses only. They are not evaluated here because QICN is not instantiated and PyPhi is not installed.

### QICN vs IIT

| Hypothesis ID | Bank systems | Pre-outcome prediction | Result classes |
|---|---|---|---|
| `P7-IIT-01` | `all_to_all_majority` vs `product_decoupled` | PyPhi should distinguish dense coupling from product decoupling if exact Phi is computable. QICN may not classify either until identity, continuity, and `I_int` are instantiated. | `IIT_SANITY_PASS`, `IIT_SANITY_FAIL`, `INTRACTABLE`, `QICN_BLOCKED` |
| `P7-IIT-02` | `cycle_ring` vs `broadcast_star` | IIT may treat recurrent/dense causal structure differently from broadcast availability; QICN must not inherit either classification without the approved invariant map. | `IIT_FAVORED`, `GWT_FAVORED`, `QICN_INCONCLUSIVE_BLOCKED`, `BOTH_FAIL` |
| `P7-IIT-03` | Random density sweep | A genuine comparison requires predeclared monotonic/nonmonotonic expectations for Phi across density; QICN comparison waits on human-approved `I_int`. | `IIT_STRUCTURAL_GRADIENT`, `NO_IIT_GRADIENT`, `INTRACTABLE`, `QICN_BLOCKED` |

### QICN vs GWT/GNW

| Hypothesis ID | Bank systems | Pre-outcome prediction | Result classes |
|---|---|---|---|
| `P7-GWT-01` | `broadcast_star` vs `product_decoupled` | GWT detector should pass hub broadcast and fail product decoupling. QICN must not pass solely because broadcast exists. | `GWT_SANITY_PASS`, `GWT_SANITY_FAIL`, `QICN_BLOCKED` |
| `P7-GWT-02` | `broadcast_star` vs `cycle_ring` | Broadcast-star should favor GWT availability over ring recurrence. If future QICN passes ring but not broadcast, that would be a structural dissociation, not a consciousness result. | `GWT_FAVORED`, `QICN_FAVORED_CONDITIONAL`, `COINCIDE`, `BOTH_FAIL`, `QICN_BLOCKED` |
| `P7-GWT-03` | `chain_feedforward` vs `broadcast_star` | Feedforward propagation without global workspace should not count as GWT ignition. Any future QICN result must be tested against this dissociation. | `GWT_DISSOCIATION_PASS`, `GWT_DISSOCIATION_FAIL`, `QICN_BLOCKED` |

### QICN vs HOT

HOT remains a preregistered model debt, not an executed rival.

| Hypothesis ID | Required future system fields | Pre-outcome prediction | Status |
|---|---|---|---|
| `P7-HOT-01` | Higher-order/meta-state labels, confidence/report fields, or metacognitive access proxies added to a neutral bank extension. | HOT may classify higher-order access where QICN ownership/continuity/intervention burdens fail. | `MODEL_DEBT` |
| `P7-HOT-02` | QICN-approved structural ownership/continuity burden plus HOT variables on the same systems. | A double dissociation is meaningful only if both HOT and QICN variables are frozen before outcome inspection. | `MODEL_DEBT_BLOCKED_BY_QICN_AND_HOT_INSTANTIATION` |

## Symmetric Result Classes

| Class | Meaning |
|---|---|
| `QICN_FAVORED_CONDITIONAL` | Future approved QICN variables distinguish a target while rival variables fail, under frozen controls. No consciousness or validation claim. |
| `RIVAL_FAVORED` | IIT/GWT/HOT variable predicts the preregistered target while QICN variables fail, are unidentifiable, or add no incremental value. |
| `COINCIDE_POSITIVE` | QICN and rival both classify the system positive under their own frozen rules. No adjudication unless an independent target separates them. |
| `COINCIDE_NEGATIVE` | Both classify negative. Useful sanity, not support. |
| `BOTH_FAIL` | Neither model discriminates its own sanity cases or target. |
| `INCONCLUSIVE_DEPENDENCY` | PyPhi unavailable, QICN gap unresolved, HOT model absent, thresholds changed post hoc, or system exceeds tractability. |
| `RIVAL_BROKEN` | Rival fails its own sanity cases, e.g. GWT fails broadcast-star or accepts product-decoupled. |
| `QICN_BLOCKED` | QICN branch not executed because `I_int / atomic separator` is not human-approved. |

Double dissociation criterion:

A meaningful future QICN-vs-rival comparison requires at least one preregistered system where rival positive / QICN negative and one where QICN positive / rival negative, or a predeclared reason why only one directional dissociation is admissible for the target. Both directions must be frozen before outcome inspection.

## Deferred Execution Protocol

Run only after all preconditions are satisfied.

1. Freeze bank version, seed, system list, and hash.
2. Install and pin PyPhi or document exact environment where PyPhi is available.
3. Run PyPhi on tractable systems only; mark all exceeded systems `INTRACTABLE`.
4. Run GWT broadcast detector with frozen thresholds.
5. Obtain human approval for Boolean-network QICN instantiation, especially `I_int` and atomic separator via non-circular finite connected incidence.
6. Freeze QICN thresholds, negative controls, and weak-rival set before looking at outcomes.
7. Execute QICN invariants once, without tuning.
8. Build distinguishability matrix with symmetric result classes.
9. Produce report with all failures, intractable cases, and non-conclusions.

Human/external preconditions:

- Human mathematical review of `I_int / atomic separator` model card.
- Decision on whether finite connected-incidence is non-circular for Boolean networks.
- PyPhi installation or approved external execution environment.
- Approval of HOT executable model if HOT is included.
- External audit before any push or public-facing integration.

## Verification Summary

Commands run from `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK` unless noted:

| Command | Result |
|---|---|
| `node rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_neutral_systems_bank.js --self-test` | PASS |
| `node rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_gwt_broadcast_model.js --self-test` | PASS |
| Bundled Python `qicn_phase7_pyphi_wrapper.py --self-test` | PASS with `EXTERNAL_DEPENDENCY_PENDING` |
| PyPhi import check | `PYPHI_NOT_INSTALLED` |
| PyPhi `pip install --dry-run pyphi` | First sandboxed attempt blocked by socket permissions; escalated dry-run resolved install candidates; no install performed. |

Root/package gates are recorded in the ledger after execution.

## Non-Conclusions

- No QICN invariant was computed.
- No IIT/Phi value was computed.
- No QICN-vs-IIT/GWT/HOT comparison was run.
- No rival was defeated.
- No neuroscience dataset was used.
- No external validation, consciousness, phenomenality, subjecthood, or bridge claim is made.
- No canonical file, registry, release, paper source, monolith, corpus, or production package was edited.

## Closure State

This phase is closed only as:

`PHASE7_GENUINE_PLAN_AND_RIVAL_INFRA_READY_FOR_HUMAN_REVIEW`

The next scientifically honest move is not to tune the bank or add QICN code. It is human review of the `I_int / atomic separator` instantiation burden and a decision on PyPhi installation/external execution.

