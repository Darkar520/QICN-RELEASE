# PRED-EXT-01 Holdout Blinding Protocol v22

## Governance boundary

This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, empirical validation, publication, or human mathematical review. It defines a blinding scaffold for future external campaigns only.

## Objective

PRED-EXT-01 currently has clean-room synthetic execution and adversarial negative controls. A future external campaign must prevent seed leakage, scenario-salt leakage, and post-hoc tuning of holdout traces. This protocol defines the minimal cryptographic and procedural boundary required before empirical execution.

## Threat model

The protocol blocks four failure modes:

1. experimenters learning holdout seeds before data freeze;
2. subjects or analysts inferring perturbation profiles from scenario salts;
3. replacing a failed holdout seed with a favorable one;
4. changing inclusion/exclusion rules after seeing outcome margins.

## Blinding architecture

1. A blinding officer or external service generates the holdout seed material.
2. The seed material is committed by SHA-256 before data collection.
3. The raw seed material is encrypted or sealed until all admissible data manifests are frozen.
4. Scenario salts remain fixed in the preregistration and are not tuned after rehearsal.
5. The reveal event occurs only after collection-start, collection-end, exclusion logs, and data manifests are timestamped.

## Required artifacts before reveal

- preregistration hash;
- frozen scenario manifest hash;
- holdout seed commitment hash;
- collection-start timestamp;
- collection-end timestamp;
- exclusion log hash;
- admissible dataset manifest hash;
- reviewer/adjudicator assignment log.

## Nonclaim boundary

Passing this blinding protocol would certify only procedural integrity of the holdout reveal. It would not certify empirical success, consciousness, identity transfer, bridge-burden closure, or human mathematical review.
