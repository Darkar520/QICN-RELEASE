# QICN Negative Control Suite v1

Status: FCR v11 static control inventory.  
Boundary: controls define expected failure surfaces. They are not executed
results and do not establish empirical support or external validation.

## Purpose

The suite prevents false-positive promotion of QICN operational classes. Each
control is designed to look superficially plausible while missing at least one
required invariant, burden, or admissibility condition. If a control passes
without downgrade, the affected claim becomes a high-risk control surface.

## Canonical Controls

| Control ID | Type | What it invalidates if it passes | Minimal implementation | Expected failure metric | Registry link |
|---|---|---|---|---|---|
| `CTRL-COMPLEXITY-ONLY` | Complexity-only | PRED-03, PRED-11, `I_int` irreducibility. | Match candidate `\|V\|`, `\|E\|`, activity budget, and structural entropy while forcing `I_int = 0`. | Certification must fail or downgrade. | `complexity_only_control`, `complexity_preserved_integration_destroyed_control`. |
| `CTRL-MEMORY-ONLY` | Memory-only | PRED-08, subjecthood continuity. | Historical buffer with no projective identity object and no intervention-sensitive perspective projection. | `Qop` must remain empty or uncertified. | `memory_only_control`. |
| `CTRL-NARRATIVE-ONLY` | Narrative-only | PRED-08, report sufficiency. | Coherent report generator with frozen templates but no causal self/non-self structure. | Certification by report alone must fail. | `narrative_only_control`, `report_only_control`. |
| `CTRL-REPORT-RICH-NO-INT` | Report-rich, no integration | PRED-02, PRED-11. | Rich logging/output from isolated subsystems without causal integration. | Ablation must expose integration loss and block certification. | `report_rich_no_invariant_control`. |
| `CTRL-REWARD-BOOKKEEPING` | Reward bookkeeping | Paper 9 `PiD`/`PiV`. | Reward accumulator with frozen discount and no independent valence topology. | Bridge predicates must not be accepted as irreducible. | `reward_bookkeeping_control`. |
| `CTRL-SEMANTIC-DENSITY` | Dense semantic model | Paper 9 `PiW`. | Token/retrieval/planning network with high world-model competence but no bridge burden. | World-richness bridge claim must remain unlicensed. | `semantic_density_control`. |
| `CTRL-INERT-PERSISTENCE` | Inert persistence | Paper 7 life/subjecthood. | Long-lived steady state without active maintenance or regime regulation. | Operational life gate must fail or downgrade. | `inert_persistence_control`. |
| `CTRL-LABEL-ONLY-SELF` | Label-only self | Paper 8 indexed subjectivity. | Hard-coded self labels without perspective-tilt intervention response. | Subjectivity index gate must fail. | `label_only_self_control`. |
| `CTRL-NEAR-NULL-NOISE` | Near-null / noise artifact | Paper 3 non-nullity and PRED-04 panel. | Random or structured noise tuned near non-null threshold. | Non-nullity must fail or be classified ambiguous. | `near_null_noise_control`, `noise_only_control`. |
| `CTRL-HISTORY-BLIND` | History-blind dynamics | PRED-10 and `I_leg` window dependence. | Memoryless state transitions trying to mimic historical dependence. | L3/window stability or history-aware decoder comparison must fail. | `history_blind_control`, `decoder_fragility_control`. |

## Control Records

Each execution record must include:

- candidate id and version;
- control id and frozen parameters;
- linked prediction id(s);
- expected outcome before execution;
- actual outcome;
- destruction condition triggered, if any;
- claim-ledger action required.

## Downgrade Rule

If a control passes the same certification or bridge gate as the candidate,
the relevant claim cannot remain promoted. The minimum downgrade is
`high_risk_control_surface` until a versioned preregistration explains the
failure and reruns the control suite.
