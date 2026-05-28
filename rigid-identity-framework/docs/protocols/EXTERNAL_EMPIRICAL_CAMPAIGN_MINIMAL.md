# External Empirical Campaign Minimal Protocol

Status: NOT_EXECUTED / REQUIRES_EXTERNAL_DATA / REQUIRES_HUMAN_OR_THIRD_PARTY_REVIEW / NO_EXTERNAL_SUPPORT_CLAIM  
Date: 2026-05-26

## Boundary

This is a protocol scaffold only. It does not create or simulate external data,
does not execute an empirical campaign, and does not validate consciousness,
phenomenality, subjectivity, identity transfer, agency, moral status, bridge
admissibility, or the QICN framework.

## Required external artifacts

1. External dataset manifest with independent provenance.
2. Perturbation source independent of QICN authors and synthetic generators.
3. Frozen evaluator version and hash.
4. Blinded labels and documented unblinding rule.
5. External rival suite not authored solely by QICN maintainers.
6. Preregistered decision rule with support, weakening, destruction,
   inconclusive, and abort outcomes.
7. Negative controls generated outside QICN.
8. Signed reviewer/adjudicator report.

## Minimal campaign design

```text
input: external finite-state or measured transition traces
precondition: labels blinded, thresholds frozen, evaluator hash frozen
primary observable: preregistered transition/selectivity observable
rivals: trace-memory, entropy/frequency diagnostics, third-party comparator
controls: complexity-only, memory-only, narrative/report-only, role-shuffled,
          perturbation-shuffled, externally generated sham
output: signed decision record
```

## Failure conditions

- Any negative control satisfies the support rule.
- Any rival meets or beats QICN under preregistered penalized loss.
- Labels are unblinded before frozen scoring.
- Thresholds or exclusions change after execution starts.
- Dataset provenance cannot be verified.
- Required artifacts are missing or hashes mismatch.

## No-support outcomes

A clean failure, inconclusive result, or rival win must be recorded as such and
must not be reinterpreted as support. The permitted outcomes are:

```text
external_support_candidate
external_no_support
external_weakening_candidate
external_destruction_candidate
external_inconclusive
protocol_violation_quarantine
```
