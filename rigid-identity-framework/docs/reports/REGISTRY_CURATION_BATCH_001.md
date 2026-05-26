# Registry Curation Batch 001

Status: FCR v13 curation seed, report-only.

Date: 2026-05-25

## Boundary

This batch is not a registry mutation and does not certify theorem truth. It is
a line-of-review seed for high-impact entries whose current JSONL status remains
machine-extracted or audit-overlaid until a safe curation overlay is added.

## Batch Summary

| Metric | Value |
|---|---|
| Entries reviewed | 25 |
| Machine registry edited | No |
| Full mathematical curation complete | No |
| Primary purpose | Identify status recommendations and dependency risks |

## Reviewed Entries

| Registry ID | Source locus | Review status | Recommendation | Notes |
|---|---|---|---|---|
| `basecore:hypothesis:hyp-h1` | BaseCore H1 | statement-level reviewed | keep conditional | Foundational assumption, not a theorem. |
| `basecore:hypothesis:hyp-h2` | BaseCore H2 | statement-level reviewed | keep conditional | Strict contraction is an assumption burden. |
| `basecore:hypothesis:hyp-h3-basecorecoresections01-foundation-from-core-l43` | BaseCore H3 | statement-level reviewed | keep conditional | Compactness/completeness burden as extracted. |
| `basecore:hypothesis:hyp-h4` | BaseCore H4 | statement-level reviewed | keep conditional | Regularity/continuity burden. |
| `basecore:hypothesis:hyp-h5` | BaseCore H5 | statement-level reviewed | keep conditional | Anti-constant hypothesis; not derived from H1-H4. |
| `basecore:theorem:thm-projection` | BaseCore projection theorem | proof-presence reviewed | candidate for formal curation | Standard Hilbert projection theorem; dependencies should be explicit. |
| `basecore:theorem:thm-contraction` | BaseCore contraction theorem | proof-presence reviewed | candidate for formal curation | Composition of projection and bounded operator. |
| `basecore:theorem:thm-fixedpoint` | BaseCore fixed point theorem | proof-presence reviewed | candidate for formal curation | Banach fixed-point dependency. |
| `basecore:theorem:thm-compactness` | BaseCore compactness theorem | proof-presence reviewed | candidate for formal curation | Depends on compact parameter image. |
| `basecore:theorem:thm-noncollapse` | BaseCore non-collapse theorem | proof-presence reviewed | keep proved but annotate assumption-discharge | Theorem is valid under H5; epistemic content is H5 discharge. |
| `paper5:definition:def-iper` | Paper 5 persistence invariant | statement-level reviewed | keep conditional | Constitutive definition. |
| `paper5:definition:def-iri` | Paper 5 rigid identity invariant | statement-level reviewed | keep conditional | Constitutive definition. |
| `paper5:definition:def-iint` | Paper 5 causal integration invariant | statement-level reviewed | keep conditional with open proof burden | Definition is clear; independent proof support remains weaker. |
| `paper5:definition:def-icont` | Paper 5 continuity invariant | statement-level reviewed | keep conditional | Constitutive definition. |
| `paper5:definition:def-idiff` | Paper 5 non-null differentiation invariant | statement-level reviewed | keep conditional | Constitutive definition. |
| `paper5:definition:def-ileg` | Paper 5 legibility invariant | statement-level reviewed | keep conditional | Constitutive definition with operational clauses. |
| `paper5:proposition:prop-necessity` | Paper 5 necessity proposition | proof-burden reviewed | annotate as definitional necessity | True by conjunction; not structural discovery. |
| `paper5:proposition:prop-integration-transfer` | Paper 5 integration transfer | proof-burden reviewed | downgrade candidate unless formal lemma is added | See `I_INT_FORMAL_BURDEN_REVIEW.md`. |
| `paper6:definition:operational-certification-l163` | Paper 6 certification definition | statement-level reviewed | keep conditional | Internal certification, not external validation. |
| `paper8:definition:def-selfindex` | Paper 8 self-index coordinate | statement-level reviewed | needs constructive spec | See Paper 8 coordinate constructive spec. |
| `paper8:definition:def-ownership` | Paper 8 ownership field | statement-level reviewed | needs constructive spec | Needs estimator and controls. |
| `paper8:definition:def-irred` | Paper 8 irreducibility margin | statement-level reviewed | needs rival-closure curation | Depends on rival family strength. |
| `paper9:definition:phenomenal-differentiation-predicate-l267` | Paper 9 `Pi_D` | statement-level reviewed | keep formal-program only | Must not be cited as bridge support until BPF-2/3. |
| `paper9:criterion:necessary-condition-for-bridge-admissibility-l663` | Paper 9 bridge gate threshold burden | statement-level reviewed | keep open-burden | Gate is symbolic until thresholds/interventions/rivals are bound. |
| `paper10:theorem:non-transitivity-of-internal-support-l228` | Paper 10 no-transitivity | proof-presence reviewed | candidate for formal curation | Strong firewall: internal support does not imply external validation. |

## Immediate Curation Conclusions

1. The registry infrastructure is structurally useful but not yet a human-curated
   mathematical registry.
2. `prop:integration-transfer` and `prop:necessity` should not be used as
   high-value proof claims without caveats.
3. Paper 8 and Paper 9 entries need constructive and comparator/intervention
   bindings before external-facing claims are possible.

## Next Machine Step

Add a curation overlay format and validator before mutating
`registry/theorems.jsonl`. This avoids manual JSONL edits while the global
extractor remains non-reproducible.
