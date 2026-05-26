# FCR v15 Internal Pilot Execution Report

Status: IMPLEMENTED_INTERNAL_SYNTHETIC_PILOT
Date: 2026-05-26
Scope: AntiGravity/OpenCode v14-final audit synthesis, PRED-EXT-01 freeze,
negative-control execution, `I_int` curation materialization, macro collision
reduction, and preregistration coverage.

## Boundary

This report records a local implementation and an internal synthetic pilot. It
does not report empirical support, external adjudication, consciousness,
phenomenality, identity transfer, agency, moral status, biological equivalence,
or proof of the full QICN framework. A positive internal synthetic pilot may
support only the claim that the current harness can apply frozen rules to a toy
finite trace panel and reject a specified negative control.

## 1. Hybrid Audit Verdict

The AntiGravity and OpenCode audits converged on five real gaps:

1. `PRED-EXT-01` needed a frozen threshold and a run that could produce a
   support or failure decision without post-hoc tuning.
2. At least one negative control needed to be executed, not merely described.
3. The `I_int` overlay needed materialization because a validated overlay alone
   left downstream registry readers exposed to a stale stronger status.
4. The six macro collision groups reported by the monolithic-risk audit needed
   direct semantic cleanup before any future unified LaTeX volume.
5. Preregistration coverage needed to move from partial coverage to a complete
   registry-wide scaffold, while preserving the distinction between populated
   freezes and draft shells.

One implementation principle controlled this pass: low risk means low
inference, not low ambition. The pass therefore executes the highest-gain
internal test that can be run without pretending to have external evidence.

## 2. Implemented Actions

| Gap | Implemented action | Result |
|---|---|---|
| No frozen PRED-EXT-01 threshold | Added `docs/preregistrations/PRED-EXT-01_freeze_v1.json` and `PRED-EXT-01_prereg_v1.md`. | Internal synthetic threshold frozen at `rho_selective_threshold = 2.0`; `alpha = 0.05`; `rival_loss_floor = 0.05`; trace length `240`; alphabet `A/B/C/D`. |
| No executed negative control | Added `scripts/run-pred-ext-01-pilot.js` and `npm run pilot:pred-ext-01`. | Positive synthetic panel satisfies support rule; `memory_only_negative_control` does not. |
| `I_int` overlay not materialized | Added a source-aware audit override in `scripts/registry-lib.js` and updated `I_INT_CURATION_OVERLAY_v1.json`. | `paper5:proposition:prop-integration-transfer` is now `epistemic_status = open_burden` after extraction. |
| Monolithic risk RED from six macro conflicts | Renamed/normalized conflicting local macros: `\Attr`, `\Class`, `\Cop`, `\MO`, `\Qop`, `\Status`. | Macro registry has 0 blockers and 0 warnings; monolithic risk reduced to YELLOW with shared-preamble work remaining. |
| Missing preregistration artifacts | Added `scripts/generate-preregistration-scaffolds.js` and generated missing scaffolds for registered predictions. | 14/14 registry predictions now have preregistration artifact paths in `registry/prediction-canon-map.json`. |

## 3. PRED-EXT-01 Internal Pilot Decision

Command:

```text
npm run pilot:pred-ext-01
```

Decision record:

```text
docs/reports/PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json
```

Frozen rule:

```text
support iff:
  rho_selective >= 2.0
  tv_targeted > max(tv_sham, tv_off_target, epsilon_floor)
  penalized_rival_loss >= 0.05
```

Positive synthetic panel:

| Metric | Value |
|---|---:|
| `tv_targeted` | `0.37037037037037035` |
| `tv_sham` | `0` |
| `tv_off_target` | `0.1234567901234568` |
| `rho_selective` | `2.9999999999999996` |
| `penalized_rival_loss` | `0.4994593160645256` |
| Verdict | `support_rule_satisfied` |

Negative control:

| Metric | Value |
|---|---:|
| Control ID | `memory_only_negative_control` |
| `tv_targeted` | `0` |
| `rho_selective` | `0` |
| `penalized_rival_loss` | `0.01678288012292354` |
| Verdict | `support_rule_not_satisfied` |
| Control result | Passed: the support rule is false. |

Artifact hashes:

| Artifact | SHA-256 |
|---|---|
| Freeze | `4593ea03ead18aac1986d6e3e3db4b710b008901724a6a19b61d604e8c6faec5` |
| Trace bundle | `4eb812c80d4d361798ad5a9eb8071884987338ff7c715d6c1b1218b5911220e3` |
| Scenario results | `67288dd2c4ec267c73e759dc1dc921f9d92860292961f398534523fa6a2d704d` |

## 4. Epistemic Status

The pilot upgrades the local implementation from `pipeline_rehearsal_not_evidence`
to `internal_synthetic_pilot_executed` for `PRED-EXT-01`. It does not upgrade
the broader theory to empirical support. The result is admissible only as:

```text
internal_synthetic_support_for_harness_specificity
```

This means:

- The harness can apply a frozen threshold.
- The trace-memory rival is executable under a fixed policy.
- A memory-only negative control can fail the support rule under the same
  freeze.
- The result is still synthetic, toy-scale, internally generated, and not an
  external adjudication.

## 5. Remaining Gaps

| Gap | Severity | Next action |
|---|---|---|
| No external or clean-room PRED-EXT-01 run | High | Freeze an external dataset/protocol and run the same decision rule under independent review. |
| `I_int` theorem burden still open | High | Prove the factorization-triviality lemma or keep `prop:integration-transfer` downgraded. |
| Monolithic compile not yet certified | Medium-high | Build a shared preamble and compile a unified LaTeX volume; current conflict blockers are closed but compile certification is not. |
| Draft preregistrations lack substantive thresholds | Medium | Populate each scaffold with observables, thresholds, seeds, exclusion rules, and decision records. |
| PRED-EXT-01 negative control is only one toy control | Medium | Expand to complexity-only, narrative-only, report-rich/no-integration, and reward-bookkeeping controls. |
| Paper 8/Paper 9 criterion and conjecture burdens remain open | Medium-high | Replace criterion surfaces with proofs, countermodels, or explicit downgrades after mathematical review. |

## 6. Final Assessment

FCR v15 closes the most actionable internal gaps without inflating the claim
surface. The framework now has a source-reproducible registry, a materialized
`I_int` downgrade, no active macro-collision warnings, full preregistration
artifact coverage, and one frozen internal synthetic pilot with a passing
negative control.

The next decisive step is not more architecture. It is the first external or
clean-room execution of a frozen rule, followed by a registry update that
accepts the result even if it weakens or destroys the associated claim.
