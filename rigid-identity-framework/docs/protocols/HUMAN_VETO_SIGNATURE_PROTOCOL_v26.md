# Human Veto Signature Protocol v26

Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically checked before it can affect FCR status.

## Required signed record

A human veto record MUST be a JSON object with:

- `schema_version`: `1.0.0`
- `review_record_id`
- `reviewer_role`
- `conflict_of_interest_statement`
- `claim_ids`
- `artifact_hashes`
- `decision`: one of `approve`, `veto`, `request_revision`
- `decision_rationale`
- `timestamp_utc`
- `public_key_pem`
- `signature_base64`

The signature payload is the stable JSON serialization of the record after removing `signature_base64`. The required algorithm is Ed25519.

## Operational rule

Unsigned records, test vectors, LLM-generated reports, and self-attestations by the author MUST NOT update `human_curated_status`. A passing cryptographic signature is necessary but not sufficient; conflict-of-interest and domain expertise checks remain human-governed.
