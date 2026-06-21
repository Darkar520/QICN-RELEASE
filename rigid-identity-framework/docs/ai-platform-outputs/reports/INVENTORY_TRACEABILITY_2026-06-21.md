# QICN — Inventario y Trazabilidad de Archivos

Status: `NON_CANONICAL_AI_OUTPUT` · Human review: `REQUIRED`
`external_support_certified = false` · read-only, no destructivo

Generado: 2026-06-21T02:37:13.856Z
Raiz de proyecto: `C:/Users/irisp/OneDrive/Escritorio/QICN-FRAMEWORK/rigid-identity-framework`

> Este reporte NO borra ni mueve nada. Propone buckets de decision para
> una limpieza carpeta-por-carpeta que tu apruebas manualmente. Los
> scripts versionados (v22..v35) y el registry estan protegidos por
> gobernanza: no son ruido. El ruido candidato vive sobre todo en
> `docs/ai-platform-outputs/` (bucket AI_OUTPUT).

## Leyenda de buckets

- **KEEP** — fuente alcanzable desde un entry-point, registry, o gobernanza.
- **BUILD_ARTIFACT** — artefacto de compilacion / PDF (reproducible, ruido estructural).
- **AI_OUTPUT** — salida de IA bajo `docs/ai-platform-outputs/`: revisar valor vs ruido.
- **ORPHAN_CANDIDATE** — fuente (.tex/.lean/.js/.bib) no alcanzable por ningun root.
- **REVIEW** — sin clasificar automaticamente; requiere ojo humano.
- Sufijos: `[DUPLICADO-HASH]` mismo contenido en >1 ruta; `[UNTRACKED]` no esta en git.

## Resumen global

| Metrica | Valor |
|---|---|
| Archivos inventariados | 661 |
| Grupos duplicados (mismo hash) | 5 |
| bucket REVIEW | 252 |
| bucket KEEP | 172 |
| bucket BUILD_ARTIFACT | 121 |
| bucket AI_OUTPUT | 100 |
| bucket ORPHAN_CANDIDATE | 16 |

## Por carpeta de primer nivel

| Carpeta | Archivos | Buckets |
|---|---|---|
| `docs` | 405 | {"REVIEW":232,"AI_OUTPUT":100,"KEEP":41,"BUILD_ARTIFACT":23,"ORPHAN_CANDIDATE":9} |
| `scripts` | 76 | {"KEEP":74,"ORPHAN_CANDIDATE":2} |
| `basecore` | 37 | {"BUILD_ARTIFACT":9,"KEEP":14,"REVIEW":14} |
| `monolithic` | 26 | {"BUILD_ARTIFACT":9,"KEEP":15,"ORPHAN_CANDIDATE":1,"REVIEW":1} |
| `paper9_phenomenal_bridge_organization` | 11 | {"BUILD_ARTIFACT":8,"KEEP":3} |
| `paper1` | 10 | {"BUILD_ARTIFACT":8,"KEEP":1,"ORPHAN_CANDIDATE":1} |
| `paper2` | 10 | {"BUILD_ARTIFACT":8,"KEEP":1,"ORPHAN_CANDIDATE":1} |
| `paper3` | 10 | {"BUILD_ARTIFACT":8,"KEEP":1,"ORPHAN_CANDIDATE":1} |
| `paper4` | 9 | {"BUILD_ARTIFACT":8,"KEEP":1} |
| `paper5_operational_consciousness` | 9 | {"BUILD_ARTIFACT":8,"KEEP":1} |
| `paper6_predictions_falsation` | 9 | {"BUILD_ARTIFACT":8,"KEEP":1} |
| `paper7_operational_life_subjecthood` | 9 | {"BUILD_ARTIFACT":8,"KEEP":1} |
| `paper8_first_person_subjectivity` | 9 | {"BUILD_ARTIFACT":8,"KEEP":1} |
| `canonical_core_legacy` | 6 | {"BUILD_ARTIFACT":1,"KEEP":2,"REVIEW":3} |
| `paper10_external_adjudication` | 6 | {"BUILD_ARTIFACT":5,"KEEP":1} |
| `registry` | 6 | {"KEEP":6} |
| `paper_bridge_operational_subjecthood` | 3 | {"BUILD_ARTIFACT":1,"KEEP":2} |
| `CHANGELOG_QICN_PATCH.md` | 1 | {"REVIEW":1} |
| `INSTRUCCIONES.md` | 1 | {"KEEP":1} |
| `LICENSE` | 1 | {"KEEP":1} |
| `PATCH_AUDIT_SUMMARY.md` | 1 | {"REVIEW":1} |
| `README.md` | 1 | {"KEEP":1} |
| `ROADMAP.md` | 1 | {"KEEP":1} |
| `VERSION.md` | 1 | {"KEEP":1} |
| `package.json` | 1 | {"KEEP":1} |
| `pyphi.log` | 1 | {"BUILD_ARTIFACT":1} |
| `release` | 1 | {"ORPHAN_CANDIDATE":1} |

## Entry-points detectados

- Raices LaTeX (.tex no incluidos por otro): 26
  - `basecore/BASECORE.tex`
  - `basecore/core/sections/11_discrete_bridge.tex`
  - `canonical_core_legacy/CANONICAL_CORE.tex`
  - `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.tex`
  - `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.tex`
  - `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex`
  - `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.tex`
  - `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex`
  - `docs/reports/I_INT_FACTORIZATION_LEMMA_DRAFT.tex`
  - `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
  - `docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex`
  - `docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v29.tex`
  - `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`
  - `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`
  - `monolithic/QICN_MONOLITHIC.tex`
  - `paper1/main.tex`
  - `paper10_external_adjudication/main.tex`
  - `paper2/main.tex`
  - `paper3/main.tex`
  - `paper4/main.tex`
  - `paper5_operational_consciousness/main.tex`
  - `paper6_predictions_falsation/main.tex`
  - `paper7_operational_life_subjecthood/main.tex`
  - `paper8_first_person_subjectivity/main.tex`
  - `paper9_phenomenal_bridge_organization/main.tex`
  - `paper_bridge_operational_subjecthood/main.tex`
- Raices Lean: 2
  - `docs/ai-platform-outputs/formal/lean/QICNLean.lean`
  - `docs/ai-platform-outputs/formal/lean/lakefile.toml`
- Entry-points Node (package.json): 63

## ORPHAN_CANDIDATE (fuente no alcanzable — revisar primero)

| Archivo | Tipo | Tamaño | Tracked | Nota |
|---|---|---|---|---|
| `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_2B_HOT_BIBLIOGRAPHY_SEED.bib` | BIB | 2399 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/phase7/phase7_run_all.js` | NODE | 6573 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/phase7/qicn_phase7_label_permutation_invariance.js` | NODE | 10306 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/qicn_phase6_3b_discrimination_sim.js` | NODE | 12641 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js` | NODE | 16019 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/qicn_phase6_3d_power_sim.js` | NODE | 23071 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/qicn_phase6_3nr_construct_nonredundancy.js` | NODE | 31196 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/qicn_phase7_gwt_broadcast_model.js` | NODE | 4995 | true | fuente no alcanzable por ningun root |
| `docs/ai-platform-outputs/sims/retroinduction/qicn_retroinduction_toy.js` | NODE | 9698 | true | fuente no alcanzable por ningun root |
| `monolithic/build/monolithic_references.bib` | BIB | 14654 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `paper1/references.bib` | BIB | 9473 | true | fuente no alcanzable por ningun root |
| `paper2/references.bib` | BIB | 6252 | true | fuente no alcanzable por ningun root |
| `paper3/references.bib` | BIB | 2331 | true | fuente no alcanzable por ningun root |
| `release/references.bib` | BIB | 13691 | true | fuente no alcanzable por ningun root |
| `scripts/generate-bridge-h2-h4-fixtures.js` | NODE | 5087 | true | fuente no alcanzable por ningun root |
| `scripts/inventory-traceability.js` | NODE | 21698 | false | fuente no alcanzable por ningun root [UNTRACKED] |

## Duplicados por hash (mismo contenido en varias rutas)

- `a4154a1b9ab0`
  - `basecore/core/canonical_core_references.bib`
  - `paper9_phenomenal_bridge_organization/references.bib`
- `aa532add706c`
  - `canonical_core_legacy/CANONICAL_CORE.tex`
  - `canonical_core_legacy/source_snapshots/CANONICAL_CORE.tex.v2f.bak.20260305T001649Z`
- `c0186396c7cf`
  - `docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.md`
  - `docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v34.md`
- `257142a764bf`
  - `paper1/main.run.xml`
  - `paper2/main.run.xml`
  - `paper3/main.run.xml`
  - `paper4/main.run.xml`
  - `paper5_operational_consciousness/main.run.xml`
  - `paper6_predictions_falsation/main.run.xml`
  - `paper7_operational_life_subjecthood/main.run.xml`
  - `paper8_first_person_subjectivity/main.run.xml`
- `0c4c28edff1e`
  - `paper6_predictions_falsation/main.bbl`
  - `paper7_operational_life_subjecthood/main.bbl`
  - `paper8_first_person_subjectivity/main.bbl`

## AI_OUTPUT (candidatos a ruido — decision carpeta-por-carpeta)

Total AI_OUTPUT: 100. Detalle completo en el JSON adjunto.

Subcarpetas bajo `docs/ai-platform-outputs/`:

| Subcarpeta | Archivos |
|---|---|
| `docs/ai-platform-outputs/reports` | 61 |
| `docs/ai-platform-outputs/sims` | 11 |
| `docs/ai-platform-outputs/analysis` | 9 |
| `docs/ai-platform-outputs/recovery-candidates` | 5 |
| `docs/ai-platform-outputs/formal` | 4 |
| `docs/ai-platform-outputs/audits` | 2 |
| `docs/ai-platform-outputs/manuscript` | 2 |
| `docs/ai-platform-outputs/prompts` | 2 |
| `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | 1 |
| `docs/ai-platform-outputs/QICN_REFEREE_SUBMISSION_COVER.md` | 1 |
| `docs/ai-platform-outputs/QICN_REVIEWER_PACKAGE_2026-06.md` | 1 |
| `docs/ai-platform-outputs/extractions` | 1 |

---

Reporte machine-readable completo (todos los campos por archivo) en el
`.json` adjunto del mismo nombre. Decision de remover/archivar: humana,
con inventario + hashes previos, sin `git add -A`.
