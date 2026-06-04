# Backup Noise Recovery Manifest

Fecha: 2026-06-03.
Origen: `rigid-identity-framework-backup-noise`.
Destino: `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03`.
Estado general: recuperacion no canonica para revision.

## Governance

Estos archivos no fueron restaurados al canon teorico activo. Fueron copiados a una cuarentena trazable para comparacion, auditoria y posible integracion posterior.

Nada en este paquete constituye evidencia empirica externa, validacion de conciencia, fenomenalidad, identidad, agencia, estatus moral ni validacion completa del framework.

## I_int historical theory candidates

Ruta local:

`i-int-atomic-separator-closure/`

| Archivo | Bytes | SHA256 | Estado |
|---|---:|---|---|
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.tex` | 16520 | `C81AEC53AB745A7D3BB96012BFD5F65197B16F22B34BACC2CAC8F21663E4EAB7` | Historical theory candidate |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.pdf` | 262075 | `8977CD6DEC69CA9A0C8FA9D97A2E3E8373933A9CEB4EC9E56469E8B3BF25E1EE` | Historical compiled artifact |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.tex` | 20243 | `AAC1907B908EED3EAF285A06127DCEA2AE2FD34CBAB564FCC97420668AA6DE83` | Historical theory candidate |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.pdf` | 269892 | `F3E53DB0778048BAE6A6BA97E0EAB9293CC1D3958EE6A5CE68F73C08B2BBD0CA` | Historical compiled artifact |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex` | 22995 | `8BFA1024D63E10003174A79C852ECC9E19EC082D1A22BB7AD09B60D6DD76A352` | Historical theory candidate |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.pdf` | 312249 | `F1ED58BCF50CA3E313036147DBCE69BBA5E821E6889063989123C51727473572` | Historical compiled artifact |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.tex` | 12131 | `CE32ED4420FF823DCDE4FEB42CD8CABF22EFAE4E2580DC938E7066C5438D9F14` | Historical theory candidate |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.pdf` | 281333 | `BD74054F9EFB82320299E3B3344C5D31073DDB3FB450DF1AA3A7D53CD084F733` | Historical compiled artifact |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex` | 12992 | `15A2DA38621E96FA46AB6A83A47953DD4F9098AE496839413937DA65A1F0B0D2` | Primary review candidate |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.pdf` | 284907 | `4CB14E0754FDDC52BE3BEA593BE5DD7F6270E46EB2D48881E2C475C78E4309F8` | Historical compiled artifact |

Active related files detected:

- `docs/theory/FINITE_SEPARATOR_COMPLETE_PACKAGE_v22.json`
- `docs/theory/FINITE_SEPARATOR_COMPLETE_PACKAGE_PRODUCT_NEGATIVE_CONTROL_v22.json`
- `docs/reports/FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_REPORT.md`
- `docs/reports/FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_AUDIT.json`

Review rule: v22 is the first comparison target. Earlier v18-v21 are historical lineage only unless v22 omits an important formal transition.

## PRED-EXT-01 provenance candidates

Ruta local:

`pred-ext-01-provenance/`

| Archivo | Bytes | SHA256 | Estado |
|---|---:|---|---|
| `rehearsal_run_001_decision_record.json` | 16068 | `2FC99C7987D23C844230DA629AC14C1671E12B924BE1E66F76D55DAD33805AF0` | Provenance archive candidate |
| `v2_cleanroom_synthetic_001_decision_record.json` | 13704 | `02A16B7D91A17AA859783667724A18A66D2A352578FC7C34C524CF82B32E2E21` | Provenance archive candidate |

Active related files detected:

- `docs/reports/PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json`
- `docs/reports/PRED_EXT_01_CLEANROOM_DECISION_RECORD.json`

Review rule: rehearsal and v2 may preserve execution lineage, but they must not be promoted as external validation. They remain internal/synthetic provenance unless independently adjudicated.

## Next allowed action

The next safe action is a comparison report:

1. compare `I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex` against active finite-separator v22 artifacts;
2. compare rehearsal/v2 against active PRED-EXT-01 decision records;
3. decide whether to keep them only in recovery, archive them under provenance, or integrate summaries into a canon ledger.

