# QICN Patch Audit Summary

Date: 2026-05-26  
Status: PATCH_APPLIED_AND_VERIFIED

## what changed

The repository was patched for reproducibility, falsifiability, and claim-status
hygiene. The main changes were monolithic compilation repair, freeze v3.1
alignment, PRNG hardening, depth-aligned Markov rival scoring, active Markov
rivals through depth 5, adversarial negative-control search, curation scaffold
regeneration, and explicit separation of machine-extracted versus human-curated
claim statuses.

## what did not change

No theory was changed to force support. No empirical data were invented. No
human review was simulated. No external support, bridge admissibility,
consciousness, phenomenality, subjectivity, agency, moral status, or identity
transfer claim was upgraded.

## claims strengthened

Only implementation-level and governance-level claims were strengthened:

- the monolithic build is now compile-capable;
- the synthetic generator has explicit salt-based PRNG material;
- Markov rival evaluation is methodologically cleaner;
- negative controls are now adversarially searched within declared families;
- claim-status layers are less inflationary.

## claims degraded or blocked

No new degradation was needed beyond the existing `I_int` open burden. The patch
reinforces that `paper5:proposition:prop-integration-transfer` remains
`open_burden` and not a global proof.

## still open

- Atomic separator lemma.
- Human mathematical curation.
- External empirical campaign.
- Independent external replication.
- Bridge-burden adjudication.

## verification results

All final verification commands recorded in
`docs/reports/POST_PATCH_VERIFICATION_REPORT.md` exited with code 0, including:

- canonical integrity;
- claim registry verification;
- canonical release verification;
- registry extraction;
- strict corpus registry validation;
- macro registry validation;
- prediction registry validation;
- curation overlay validation;
- preregistration coverage;
- nonclaim lint;
- trace-memory rival tests;
- external trace generator tests;
- generator independence audit;
- PRED-EXT-01 clean-room synthetic execution;
- clean-room review;
- adversarial negative-control search;
- PRED-02/PRED-04c/PRED-11 internal executions;
- tamper preregistration self-test;
- monolithic build;
- monolithic compile.

## key outcomes

```text
PRED-EXT-01 clean-room synthetic verdict:
  clean_room_synthetic_support_with_holdout_controls_passed

Adversarial negative-control status:
  adversarial_negative_controls_pass

Monolithic compile:
  compiled
```

These are internal/synthetic/repository-health outcomes only. They do not imply
external empirical validation.
