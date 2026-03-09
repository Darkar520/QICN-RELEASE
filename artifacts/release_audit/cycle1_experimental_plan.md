# Cycle 1 Experimental Plan

## Scope
Cycle 1 executes only the three highest-value tests from the frozen scientific ledger:

1. negative control against brute complexity/connectivity
2. ablation ladder over the six critical invariants
3. cross-substrate equivalence

The frozen canon is not modified. This cycle operationalizes Paper V for minimal differential testing.

## Fixed Inputs
- frozen canon: `canonical_freeze_record.md`
- claim registry: `claim_matrix.csv`
- prediction registry: `prediction_matrix.csv`
- falsification registry: `falsification_matrix.csv`
- reproducibility rule: `reproducibility_protocol.md`

## Seeds
`[11, 23, 37, 47, 59]`

## Experimental Thresholds
These are cycle-1 operational thresholds. They are not doctrine updates.

- support/collapse: support radius per system, collapse radius = `0.12`
- integration resolution floor = `0.05`
- continuity p95 jump ceiling = `0.95`
- differentiation floors:
  - class separation > `0.3`
  - mean non-null readout > `0.18`
- legibility thresholds:
  - clean decoder accuracy >= `0.9`
  - noisy decoder accuracy >= `0.75`
  - critical intervention shift rate >= `0.7`
  - sham false-positive rate <= `0.1`
  - compression accuracy >= `0.8`

## Systems Used
- positive candidate A: `positive_continuous`
- positive candidate B: `positive_discrete`
- negative control: `complexity_negative`
- ablation variants: `ablate_persistence`, `ablate_identity`, `ablate_integration`, `ablate_continuity`, `ablate_differentiation`, `ablate_legibility`

## Test 1
The control system is deliberately dense and activity-rich, but it is allowed to fail rigidity, continuity, and legibility.

## Test 2
Each ablation starts from the positive continuous candidate and degrades one target invariant while leaving the rest of the setup comparable.

## Test 3
The continuous and discrete positive systems are treated as different substrates. Cycle 1 asks whether they preserve the same operational class signature under normal, critical, and sham intervention panels.
