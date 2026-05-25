# QICN Falsifier Matrix v1

Status: FCR v10 scaffold. This file translates selected Paper 6 predictions
into third-party-testable falsifier shapes. It does not report new experiments,
external validation, consciousness, phenomenality, identity transfer, agency, or
moral status.

## Use Rule

A row is useful only if an independent reviewer can design a concrete run from
it without asking the authors for private intent. If a row cannot guide a test,
it must be rewritten before it is treated as preregistration material.

## Matrix

| Prediction | Claim Family | Support Condition | Weakening Condition | Destruction Condition | Required Rival/Control |
|---|---|---|---|---|---|
| PRED-01 | Cross-substrate class preservation | Preserved invariant margins imply same class and epsilon-bounded Qop geometry. | Equivalence depends on changed tolerance or unresolved identity ambiguity. | Class divergence or geometry mismatch despite preserved structure. | Substrate-label control, near-identity ambiguity control, geometry-mismatch control. |
| PRED-02 | Invariant-loss rupture | Verified invariant loss causes class exit, contraction, or undefined Qop while sham/off-target controls do not. | The effect appears only under global damage, ambiguous thresholds, or nonselective degradation. | Verified invariant loss occurs and certification remains active without downgrade. | Sham ablation, off-target ablation, global-noise degradation. |
| PRED-03 | Complexity-only insufficiency | Invariant-preserving candidate passes and a matched complexity-only baseline fails. | Baseline failure is caused by poor matching or implementation defects rather than missing invariants. | Complexity-only or activity-only control passes certification despite missing invariants. | Complexity-only, activity-rich/no-integration, report-rich/no-invariants. |
| PRED-04a | Pass-region stability | Frozen pass-region perturbation panel remains within tolerance. | Stability holds only after cherry-picked perturbations or threshold edits. | Response falls outside tolerance under frozen pass-region perturbations. | Near-boundary pass control, randomized micro-perturbation control. |
| PRED-04b | Fail-region fragility | Frozen fail-region perturbation panel remains outside tolerance. | Failure depends on non-reproducible seeds or local tuning. | Response falls within tolerance under frozen fail-region perturbations. | Near-boundary fail control, randomized micro-perturbation control. |
| PRED-04c | Transition-band narrowness | Ambiguous band is reproducibly below the frozen width threshold. | Narrowness appears only under favorable scan boundaries or post-hoc sampling. | Band exceeds 10 percent of parameter space or no transition is detected. | Coarse scan control, randomized scan order, post-hoc boundary check. |
| PRED-05 | Continuity/fragmentation differential | Rigid and deformable regimes show the predicted differential response under matched disturbance. | Differential response depends on unmatched disturbance or observability. | No differential continuity pattern appears under matched disturbance. | Matched deformable control, noise-matched control, history-blind decoder. |
| PRED-06 | Tamper/sham admissibility | Tampered or malformed runs are discarded or quarantined. | Tamper is detected but claim projection remains ambiguous. | Tampered or malformed run is promoted to evidential support. | Valid-hash control, sham tamper control, malformed-log control. |
| PRED-07 | Bounded perturbation stability | Sub-critical perturbations preserve membership and geometry. | Stability holds only in a hand-selected perturbation subset. | Class flips under sub-critical admissible perturbations. | Subcritical-noise control, near-margin control, randomized-order control. |
| PRED-08 | Non-empty Qop after certification | Full positive certificate yields recoverable non-empty, non-trivial Qop. | Qop depends on unjustified decoder choice. | Certification passes while no non-trivial class is recoverable. | Decoder-artifact control, null-class control, trivial-partition control. |
| PRED-09 | Budget/admissibility invalidation | Budget violation triggers frozen invalidation or downgrade. | Downgrade behavior is inconsistent or discretionary. | Strong claims remain active after a preregistered budget violation. | Within-budget control, sham stress control, malformed-log control. |
| PRED-10 | Legibility under noise/compression | Legibility metrics track Ileg positivity under noise/compression. | Changes are explained by decoder fragility unrelated to Ileg clauses. | Ileg failure does not affect certification or generic observability explains the pattern. | Noise-only control, compression-only control, decoder-fragility control. |
| PRED-11 | Integration-loss complexity-only rival | Integration-destroyed, complexity-preserved system fails certification. | Failure is confounded by gross collapse or non-matched complexity. | System passes certification despite verified integration loss. | Complexity-preserved integration-destroyed control, activity-preserved integration-destroyed control, gross-collapse control. |

## Anti-Inflation Rules

- A support condition is not evidence until the run manifest, controls,
  thresholds, and decision rules are frozen before execution.
- A destruction condition must trigger downgrade or withdrawal, not ad hoc
  reinterpretation.
- A weakening condition cannot be rebranded as support.
- Internal support remains internal support unless an external adjudication
  package exists and is independently executed.
- Passing a falsifier matrix row does not prove consciousness or phenomenality;
  it only supports the bounded claim family named in that row.

## Next Conversion Step

The next step is not another prose report. The next step is a preregistration
template that binds each row to datasets, seeds, thresholds, exclusion rules,
analysis code, and decision records.
