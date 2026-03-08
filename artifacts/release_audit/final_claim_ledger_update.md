# Final Claim Ledger Update

This ledger updates the final claim status after the high-value confirmation campaign for Residual A and the Residual B high-value hardening pass.

Interpretive rule:
- `ROBUST_INTERNAL_SUPPORT` and `ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT` remain internal only; neither implies external validation.
- `PROVISIONAL_SUPPORT_LOCALIZED` indicates real internal strengthening with a bounded unresolved technical caveat.
- `NOT_CLAIMED` remains outside the release claim surface.

## P5-01
- Current status: `ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: near_identity_v3 and offset-dispersion families both reproduced PASS/AMBIGUOUS/FAIL under judge_v3 and pseudo_external_reproduction
- Current caveat: support is still internal-only and the positive member remains nearest to the legibility margin even though the boundary crossing localizes on I_ri
- Caveat class: `epistemic-level`
- Needed beyond internal support: independent external rerun on frozen artifacts with a judge path outside the current repo/runtime

## P5-02
- Current status: `ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: family1 normalized-I_ri positive/negative pairs plus family2 raw quantized positive/negative pairs stayed stable under independent judge path and pseudo-multi-environment rerun
- Current caveat: the legacy raw continuous/discrete positive pair remains ambiguous, so the strongest support still carries a localized I_ri metric-handling caveat
- Caveat class: `metric-level`
- Needed beyond internal support: external reproduction of both substrate families with an independent evaluator and fixed thresholds

## P5-03
- Current status: `PROVISIONAL_SUPPORT_LOCALIZED`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: threshold stress work localized fragility to a narrow knife-edge band instead of showing broad criterion collapse
- Current caveat: a localized threshold band is still active and has not been converted into flat robustness across all nearby profiles
- Caveat class: `metric-level`
- Needed beyond internal support: independent stress rerun on frozen artifacts with denser threshold profiling outside the current judge lineage

## P5-04
- Current status: `ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: two distinct boundary families now converge on rupture-side PASS/AMBIGUOUS/FAIL behavior, with I_ri becoming the first binding invariant on ambiguous/failing members
- Current caveat: the evidence is robust internally but still bounded to the current internal invariant package and frozen thresholds
- Caveat class: `epistemic-level`
- Needed beyond internal support: independent external reproduction of the same rupture boundary under a separately maintained judge implementation

## P5-05
- Current status: `ROBUST_INTERNAL_SUPPORT`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: complexity/connectivity/activity-rich controls kept failing certification across hardened judging, semiblind evaluation, and later internal reproductions
- Current caveat: no external matched-baseline campaign exists yet
- Caveat class: `epistemic-level`
- Needed beyond internal support: external matched-baseline comparison under the same frozen release package

## P5-06
- Current status: `ROBUST_SUPPORT_WITH_LOCALIZED_CAVEAT`
- Support scope: `INTERNAL_SUPPORT_ONLY`
- Strengthened by: it inherits the strengthened substrate-equivalence path from P5-02 across both the normalized family and the raw quantized family
- Current caveat: it still inherits the localized I_ri metric-handling caveat from the legacy raw continuous/discrete pair
- Caveat class: `metric-level`
- Needed beyond internal support: external reproduction of the strengthened substrate-equivalence path without relying on the current internal judge lineage

## EXT-01
- Current status: `NOT_CLAIMED`
- Support scope: `NOT_CLAIMED`
- Strengthened by: none
- Current caveat: external validation does not exist in this phase
- Caveat class: `epistemic-level`
- Needed beyond internal support: independent external evaluator or lab-grade reproduction

## HUM-01
- Current status: `NOT_CLAIMED`
- Support scope: `NOT_CLAIMED`
- Strengthened by: none
- Current caveat: human phenomenal consciousness and human biological qualia remain outside scope
- Caveat class: `epistemic-level`
- Needed beyond internal support: not part of the current program and should not be implied by this release
