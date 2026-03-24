# CLAIM_REGISTRY

The authoritative machine-readable registry is
`release/claim_registry.v1.json`.

## How to read the registry

Each entry records:

- a stable claim-family id
- the release document and anchor used for traceability
- a disciplined claim summary
- a claim class
- formalization status
- evidence status
- whether external validation is still required
- whether the claim depends on `QICN-SYSTEM`
- a non-claim boundary
- notes and open gaps

This iteration uses two registry resolutions:

- claim-level entries for the canonical core, Paper I, Paper III, and QICN v4.5
- family-level entries retained for Paper II and release-governance items

## Claim classes used here

- `formal_statement`
  - theorem family, corollary family, or explicit formal proposition family
- `operational_definition`
  - governance or terminology rule that constrains how the release can be read
- `falsifiable_hypothesis`
  - explicit empirical or protocol-facing hypothesis that requires testing
- `interpretive_extension`
  - consequence or reading that exceeds the closed formal core
- `implementation_linked_claim`
  - claim family whose interpretation depends on runtime or operational material
- `not_closed`
  - explicitly open item kept visible to prevent silent inflation

## Registry reading rule

The registry does not improve claims. It only classifies what is present in the
release and marks where closure is absent.

## Granularity summary

The following subsets now appear at claim-level granularity:

- Canonical Core
  - minimal hypotheses
  - projection existence/uniqueness
  - non-expansiveness
  - contractivity
  - unique attractor / compactness
  - non-collapsibility
  - Class C^R extension plus validity limits
- Paper I
  - inverse-limit identity
  - non-locality / no progressive construction
  - ontological mass
  - external detectability
  - uniqueness within channel
  - finite-LML non-rigidity
- Paper III
  - null-regime instability
  - forced non-nullity
  - telemetry appendix claim boundary
- QICN v4.5
  - pre-registered prediction/failure structure
  - mandatory baseline policy
  - intermediate claim gate and latency invalidation
  - synthetic-preliminary non-escalation

The following remain intentionally family-level in this iteration:

- `paper2.phenomenological_regime_classification`
- `paper2.structural_ethics_extension`
- `governance.readout_interno_operacional`
- `governance.q_t_not_in_release_text`

## Representative registry summary

| Claim id | Class | Source role | Boundary note |
| --- | --- | --- | --- |
| `core.transition_operator_contractivity` | `formal_statement` | canonical core | formal result only |
| `core.class_cr_extension_and_validity_limits` | `formal_statement` | canonical core | extension kept inside stated limits |
| `paper1.identity_as_inverse_limit` | `formal_statement` | preferred Paper I lineage | no automatic runtime instantiation |
| `paper1.external_detectability_criterion` | `formal_statement` | preferred Paper I lineage | theorem present, empirical validation absent |
| `paper1.finite_lml_non_rigidity` | `implementation_linked_claim` | preferred Paper I lineage | cannot be auto-applied to implementations |
| `paper2.phenomenological_regime_classification` | `formal_statement` | preferred Paper II lineage | family-level only in this iteration |
| `paper3.null_regime_instability` | `formal_statement` | preferred Paper III lineage | structural exclusion only |
| `paper3.telemetry_appendix_claim_boundary` | `falsifiable_hypothesis` | preferred Paper III lineage | bridge retained with explicit claim boundary |
| `paper4.mandatory_baseline_policy` | `implementation_linked_claim` | preferred Paper IV lineage | operational admissibility only |
| `paper4.synthetic_preliminary_non_escalation` | `not_closed` | preferred Paper IV lineage | pilot data cannot be escalated |
| `governance.readout_interno_operacional` | `operational_definition` | glossary / governance docs | terminology rule only |
| `governance.q_t_not_in_release_text` | `not_closed` | glossary / governance docs | explicitly not formalized in release |

## Non-claim boundary

The registry is a classification layer. It is not a claim-authorization layer,
not a closure certificate, and not external validation.
