# Claim Status Policy v1.1

Status: ACTIVE_INTERNAL_POLICY  
Date: 2026-05-26

## Boundary

This policy governs registry status language. It does not prove theorem truth,
empirical support, external adjudication, consciousness, phenomenality,
identity transfer, agency, moral status, or bridge confirmation.

## Layer separation

1. **Ontology formal:** registry entries are records about formal artifacts, not
   claims about real consciousness or real subjectivity.
2. **Modelo matematico:** theorem-like entries may carry a source-declared
   mathematical status under stated assumptions.
3. **Implementacion:** extraction scripts produce machine-readable records.
4. **Lenguaje/documentacion:** public wording must preserve machine-vs-human
   status boundaries.
5. **Interpretacion:** a `proved` source status is not a human-curated proof.
6. **Evidencia empirica interna:** synthetic runs may support only internal
   synthetic decision records.
7. **Evidencia empirica externa:** absent unless an external protocol is
   executed with independent data and signed review.

## Required registry fields

Every formal registry record must expose the following status layers:

```text
source_declared_status
machine_extracted_status
human_curated_status
effective_public_status
curation_status
```

Allowed `human_curated_status` values are:

```text
proved | conditional | heuristic | conjecture | hypothesis | rejected | not_reviewed
```

The default is `not_reviewed`.

## Anti-inflation rules

1. If `human_curated_status = not_reviewed`, the record must carry a
   `machine_extracted_disclaimer`.
2. A machine-extracted `proved` entry must not be described as
   `human-curated proved` without a signed curation artifact.
3. A human review scaffold marked `NOT_SIGNED` must never upgrade a claim.
4. If a signed human decision downgrades a claim, `effective_public_status`
   must not exceed the downgraded status.
5. If a claim depends on an open burden, public language must include that
   dependency.

## Public wording

Permitted:

```text
machine-extracted proved in source under stated assumptions
not human-curated
conditional under atomic-separator assumption
open burden
internal synthetic support only
```

Prohibited without further evidence:

```text
human-curated proof
externally validated
bridge support
consciousness demonstrated
phenomenality demonstrated
identity transfer demonstrated
```
