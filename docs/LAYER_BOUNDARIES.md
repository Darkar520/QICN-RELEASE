# LAYER_BOUNDARIES

This document separates the release into layers that must not be collapsed.

## 1. Active base layer

- Includes:
  - `BaseCore`
  - typed dynamics, rigidity, inverse-limit identity, operational-criterion grammar
- Does not include:
  - bridge confirmation
  - runtime validation
  - human comparators
- Valid assertions:
  - internal formal derivation inside stated assumptions
- Prohibited automatic inferences:
  - BaseCore in release -> runtime instantiation
  - BaseCore -> external validation

## 2. Downstream formal packages

- Includes:
  - Papers I-IX
  - downstream formal extensions, bridges, protocols, and burden stacks
- Does not include:
  - active base ownership
  - public empirical closure
- Valid assertions:
  - downstream formal extension under explicit dependence
- Prohibited automatic inferences:
  - downstream package -> active base layer
  - Paper IX -> bridge completion

## 3. Legacy and lineage material

- Includes:
  - canonical_core_legacy
  - historical frozen core PDFs
  - parallel lineages
  - NotebookLM mirrors and reconstructions
- Does not include:
  - active source-of-truth authority
- Valid assertions:
  - archival provenance and editorial traceability only
- Prohibited automatic inferences:
  - legacy or mirror -> current spine

## 4. Implementation / system

- Includes:
  - `QICN-SYSTEM`
  - runtime artifacts
  - support labels
  - export policies
- Does not include:
  - theorem closure
  - ontology
  - external validation
- Valid assertions:
  - operational support and governance only
- Prohibited automatic inferences:
  - implementation exists -> theory validated
  - runtime metrics -> phenomenological theorem confirmed

## 5. Interpretation / language

- Includes:
  - explanatory readings
  - controlled terminology
  - non-claim language policy
- Does not include:
  - theorem proofs
  - public validation
- Valid assertions:
  - disciplined restatement of what the formal layers may suggest
- Prohibited automatic inferences:
  - interpretation -> closed theorem
  - bridge language -> bridge support

## 6. External validation

- Includes:
  - independent replication
  - independent methodological review
  - external empirical confirmation
- Does not include:
  - local release bundles
  - local smoke suites
  - governance docs
- Valid assertions:
  - none are granted by this reconstruction alone
- Prohibited automatic inferences:
  - release sync -> external validation

## Bridge rules

- Allowed bridge: base layer -> downstream packages only through explicit dependency.
- Allowed bridge: corpus -> system only through explicit interface docs.
- Allowed bridge: implementation -> internal evidence only through policy-governed artifacts.
- Disallowed bridge: legacy -> active base.
- Disallowed bridge: mirror lineage -> source-of-truth.
- Disallowed bridge: internal evidence -> public claim closure.
