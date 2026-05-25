# Preregistration PRED-06 v1

Status: frozen tamper/admissibility preregistration scaffold.  
Boundary: the included self-test validates harness logic only; it is not
external validation or theory support.

| Field | Frozen value |
|---|---|
| Prediction ID | `PRED-06` |
| Tamper types | `hash_corruption`, `malformed_json`, `protocol_violation_missing_field` |
| Injection harness | `scripts/tamper-inject.js` |
| Injected N | 30 runs per tamper type, 90 tampered runs total. |
| Sham control | 30 runs with non-semantic note/whitespace change. |
| Expected outcome | 90/90 tampered runs rejected or quarantined; 30/30 sham runs accepted. |
| Budget | Maximum 120 evaluated runs. |
| Decision rule | Tamper rejection rate `< 1.0` -> destruction; sham rejection `> 0` -> weakening; both exact -> support for admissibility harness only. |
| Rival | `RIVAL-ADMISSIBILITY-NAIVE-01` |
| Negative controls | `hash_corruption_control`, `malformed_json_control`, `protocol_violation_control`, `sham_control` |

## Harness Interface

```text
node scripts/tamper-inject.js --self-test
```

Expected output is JSON with:

- `tamper_runs = 90`;
- `tamper_rejected_or_quarantined = 90`;
- `sham_runs = 30`;
- `sham_accepted = 30`;
- `decision = self_test_pass`.

## Required Decision Record

Future execution against real run artifacts must write:

```json
{
  "prediction_id": "PRED-06",
  "prereg_version": "v1",
  "decision": "support|weakening|destruction|inconclusive",
  "tamper_runs": 90,
  "tamper_rejected_or_quarantined": null,
  "sham_runs": 30,
  "sham_accepted": null,
  "artifact_hashes": {}
}
```
