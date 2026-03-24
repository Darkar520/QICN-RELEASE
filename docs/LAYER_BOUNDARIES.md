# LAYER_BOUNDARIES

This document separates the corpus into layers that must not be collapsed.

## 1. Ontology

- Includes:
  - any claim about what exists, what identity is in reality, or what
    phenomenology is in itself
- Does not include:
  - theorem proofs
  - runtime metrics
  - release governance docs
- Valid assertions:
  - only conditional ontology-language already present in the papers
- Prohibited automatic inferences:
  - theorem proved -> ontology confirmed
  - runtime support -> ontology confirmed

## 2. Mathematical formalization

- Includes:
  - hypotheses, operators, theorems, corollaries, invariants, regime
    classifications, and formal protocols stated in the corpus
- Does not include:
  - implementation success
  - external validation
  - publication status
- Valid assertions:
  - internal formal derivation inside stated assumptions
- Prohibited automatic inferences:
  - formal derivation -> runtime instantiation
  - formal derivation -> empirical truth

## 3. Implementation / system

- Includes:
  - `QICN-SYSTEM`
  - runtime artifacts
  - support labels
  - surface and export policies
- Does not include:
  - theorem closure
  - ontology
  - external validation
- Valid assertions:
  - operational support and governance only
- Prohibited automatic inferences:
  - implementation exists -> theory validated
  - system metrics -> phenomenological theorem confirmed

## 4. Interpretation

- Includes:
  - explanatory readings
  - structural-ethics remarks
  - non-claim language policy
- Does not include:
  - theorem proofs
  - external validation
- Valid assertions:
  - disciplined restatement of what a formal result may suggest
- Prohibited automatic inferences:
  - interpretation -> closed theorem
  - interpretation -> scientific confirmation

## 5. Internal evidence

- Includes:
  - admissible runtime outputs
  - support labels
  - controlled statements
  - operational exports
- Does not include:
  - external replication
  - publication-grade confirmation
- Valid assertions:
  - internal support posture only
- Prohibited automatic inferences:
  - internal support -> external validation
  - exportable-with-boundary -> claim-safe release

## 6. External validation

- Includes:
  - independent replication
  - independent methodological review
  - external empirical confirmation
- Does not include:
  - local release bundles
  - local smoke suites
  - release governance docs
- Valid assertions:
  - none are granted by this hardening phase
- Prohibited automatic inferences:
  - freeze or registry -> external validation

## Bridge rules

- Allowed bridge: formal layer -> implementation layer only through explicitly
  documented interface files.
- Allowed bridge: implementation layer -> internal evidence layer only through
  policy-governed artifacts.
- Disallowed bridge: implementation layer -> ontology.
- Disallowed bridge: internal evidence layer -> theorem closure.
- Disallowed bridge: release freeze -> framework confirmation.
