# QICN — Inventario y Trazabilidad de Archivos

Status: `NON_CANONICAL_AI_OUTPUT` · Human review: `REQUIRED`
`external_support_certified = false` · read-only, no destructivo

Generado: 2026-06-21T02:57:01.215Z
Raiz de proyecto: `c:/Users/irisp/OneDrive/Escritorio/QICN-FRAMEWORK`

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
| Archivos inventariados | 2348 |
| Grupos duplicados (mismo hash) | 122 |
| bucket BUILD_ARTIFACT | 1542 |
| bucket REVIEW | 477 |
| bucket KEEP | 124 |
| bucket ORPHAN_CANDIDATE | 106 |
| bucket AI_OUTPUT | 99 |

## Por carpeta de primer nivel

| Carpeta | Archivos | Buckets |
|---|---|---|
| `artifacts` | 1379 | {"BUILD_ARTIFACT":1365,"REVIEW":14} |
| `rigid-identity-framework` | 661 | {"REVIEW":258,"KEEP":111,"BUILD_ARTIFACT":121,"AI_OUTPUT":99,"ORPHAN_CANDIDATE":72} |
| `photoshop-mcp` | 162 | {"KEEP":6,"REVIEW":127,"ORPHAN_CANDIDATE":29} |
| `release` | 47 | {"REVIEW":45,"KEEP":2} |
| `corpus` | 29 | {"REVIEW":4,"BUILD_ARTIFACT":25} |
| `docs` | 18 | {"REVIEW":18} |
| `phenomenological-regimes-paper` | 11 | {"BUILD_ARTIFACT":11} |
| `rigid-identity-paper` | 11 | {"BUILD_ARTIFACT":11} |
| `phenomenological-instability-paper` | 8 | {"BUILD_ARTIFACT":8} |
| `scripts` | 7 | {"ORPHAN_CANDIDATE":5,"KEEP":2} |
| `.dockerignore` | 1 | {"REVIEW":1} |
| `.gitignore` | 1 | {"KEEP":1} |
| `.gitlab-ci.yml` | 1 | {"REVIEW":1} |
| `AGENTS.md` | 1 | {"REVIEW":1} |
| `ANALISIS_GENERAL_PROYECTO.md` | 1 | {"REVIEW":1} |
| `AUDIT_FORMAL_PROFUNDO_QICN_v28.md` | 1 | {"REVIEW":1} |
| `CHANGELOG.md` | 1 | {"KEEP":1} |
| `CHANGELOG_QICN_PATCH.md` | 1 | {"REVIEW":1} |
| `Dockerfile` | 1 | {"REVIEW":1} |
| `PATCH_AUDIT_SUMMARY.md` | 1 | {"REVIEW":1} |
| `README.md` | 1 | {"KEEP":1} |
| `RELEASE_NOTES.md` | 1 | {"REVIEW":1} |
| `nul` | 1 | {"REVIEW":1} |
| `opencode.jsonc` | 1 | {"REVIEW":1} |
| `pyphi.log` | 1 | {"BUILD_ARTIFACT":1} |

## Entry-points detectados

- Raices LaTeX (.tex no incluidos por otro): 26
  - `rigid-identity-framework/basecore/BASECORE.tex`
  - `rigid-identity-framework/basecore/core/sections/11_discrete_bridge.tex`
  - `rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.tex`
  - `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.tex`
  - `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.tex`
  - `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex`
  - `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.tex`
  - `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex`
  - `rigid-identity-framework/docs/reports/I_INT_FACTORIZATION_LEMMA_DRAFT.tex`
  - `rigid-identity-framework/docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`
  - `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex`
  - `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v29.tex`
  - `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`
  - `rigid-identity-framework/docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex`
  - `rigid-identity-framework/monolithic/QICN_MONOLITHIC.tex`
  - `rigid-identity-framework/paper1/main.tex`
  - `rigid-identity-framework/paper10_external_adjudication/main.tex`
  - `rigid-identity-framework/paper2/main.tex`
  - `rigid-identity-framework/paper3/main.tex`
  - `rigid-identity-framework/paper4/main.tex`
  - `rigid-identity-framework/paper5_operational_consciousness/main.tex`
  - `rigid-identity-framework/paper6_predictions_falsation/main.tex`
  - `rigid-identity-framework/paper7_operational_life_subjecthood/main.tex`
  - `rigid-identity-framework/paper8_first_person_subjectivity/main.tex`
  - `rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex`
  - `rigid-identity-framework/paper_bridge_operational_subjecthood/main.tex`
- Raices Lean: 2
  - `rigid-identity-framework/docs/ai-platform-outputs/formal/lean/QICNLean.lean`
  - `rigid-identity-framework/docs/ai-platform-outputs/formal/lean/lakefile.toml`
- Entry-points Node (package.json): 0

## ORPHAN_CANDIDATE (fuente no alcanzable — revisar primero)

| Archivo | Tipo | Tamaño | Tracked | Nota |
|---|---|---|---|---|
| `photoshop-mcp/eslint.config.js` | NODE | 855 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/bridge.js` | NODE | 8725 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/config.js` | NODE | 934 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/controller.js` | NODE | 9395 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/demo.js` | NODE | 4400 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/errors.js` | NODE | 781 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/index.js` | NODE | 953 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/mcpServer.js` | NODE | 2999 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/prompts.js` | NODE | 2575 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/rateLimit.js` | NODE | 801 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/resources.js` | NODE | 2183 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/src/toolDefinitions.js` | NODE | 4042 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/tests/bridge.test.js` | NODE | 1568 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/tests/dryRun.test.js` | NODE | 1058 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/tests/jsonRpc.test.js` | NODE | 513 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/mcp-server/dist/tests/validation.test.js` | NODE | 1397 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/photoshop-uxp-plugin/dist/main.js` | NODE | 18713 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/photoshop-uxp-plugin/scripts/copy-static.mjs` | NODE | 494 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/scripts/write-json-schema.js` | NODE | 678 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/capabilities.js` | NODE | 4102 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/compareState.js` | NODE | 1443 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/index.js` | NODE | 202 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/jsonSchema.js` | NODE | 707 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/pathAllowlist.js` | NODE | 1462 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/src/schemas.js` | NODE | 8621 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/tests/pathAllowlist.test.js` | NODE | 954 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/packages/shared/dist/tests/schemas.test.js` | NODE | 1363 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/prettier.config.cjs` | NODE | 82 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `photoshop-mcp/scripts/create-example-asset.mjs` | NODE | 799 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_2B_HOT_BIBLIOGRAPHY_SEED.bib` | BIB | 2399 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/phase7/phase7_run_all.js` | NODE | 6573 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/phase7/qicn_phase7_label_permutation_invariance.js` | NODE | 10306 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase6_3b_discrimination_sim.js` | NODE | 12641 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js` | NODE | 16019 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase6_3d_power_sim.js` | NODE | 23071 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase6_3nr_construct_nonredundancy.js` | NODE | 31196 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/qicn_phase7_gwt_broadcast_model.js` | NODE | 4995 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/docs/ai-platform-outputs/sims/retroinduction/qicn_retroinduction_toy.js` | NODE | 9698 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/monolithic/build/monolithic_references.bib` | BIB | 14654 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `rigid-identity-framework/paper1/references.bib` | BIB | 9473 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/paper2/references.bib` | BIB | 6252 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/paper3/references.bib` | BIB | 2331 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/release/references.bib` | BIB | 13691 | true | fuente no alcanzable por ningun root [DUPLICADO-HASH] |
| `rigid-identity-framework/scripts/ar1-correction-clinical-summary-v28.js` | NODE | 7439 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-finite-separator-package.js` | NODE | 6026 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-generator-independence.js` | NODE | 1663 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-monolithic-build-quality.js` | NODE | 5296 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-operational-term-promotions-v27.js` | NODE | 7465 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-operational-term-promotions.js` | NODE | 8060 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-semantic-inflation.js` | NODE | 10238 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-superior-gaps.js` | NODE | 1845 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-v23-roadmap-gates.js` | NODE | 4845 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-v24-critical-gaps.js` | NODE | 7266 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-v25-superior-gaps.js` | NODE | 7859 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-v26-superior-gaps.js` | NODE | 6007 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/audit-v27-superior-gaps.js` | NODE | 7305 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/build-monolithic-volume.js` | NODE | 25597 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/build-theory-dependency-graph.js` | NODE | 7132 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/calibrate-session-zero-thresholds-v26.js` | NODE | 4936 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/calibrate-session-zero-thresholds-v27.js` | NODE | 6680 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/cleanroom-reviewer-quarantine.js` | NODE | 3001 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/construct-finite-separator-package.js` | NODE | 11683 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/evaluate-framework-progress.js` | NODE | 12026 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/external-session-zero-adjudicator.js` | NODE | 23490 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/extract-claim-ledger.js` | NODE | 3342 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/extract-registry.js` | NODE | 4141 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/fcr-impact-analyzer.js` | NODE | 11366 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/generate-bridge-h2-h4-fixtures.js` | NODE | 5087 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/generate-curation-batch.js` | NODE | 3366 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/generate-preregistration-scaffolds.js` | NODE | 6069 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/generate-report.js` | NODE | 10164 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/generate-versioned-artifact-manifest.js` | NODE | 3664 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/inventory-traceability.js` | NODE | 25299 | false | fuente no alcanzable por ningun root [UNTRACKED] |
| `rigid-identity-framework/scripts/legacy/compare-v30-v31.js` | NODE | 3419 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/legacy/run-all-legacy-verifications.js` | NODE | 2601 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/lint-nonclaims.js` | NODE | 5675 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/negative-control-suite.js` | NODE | 6706 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/probe-extractor-reproducibility.js` | NODE | 5006 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/propose-fcr-downgrades-from-adjudication.js` | NODE | 5127 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-adversarial-negative-controls.js` | NODE | 3204 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-02-execution.js` | NODE | 4365 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-04c-execution.js` | NODE | 3776 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-11-execution.js` | NODE | 4531 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-ext-01-cleanroom.js` | NODE | 5900 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-ext-01-pilot.js` | NODE | 6112 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/run-pred-ext-01-rehearsal.js` | NODE | 6701 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/tamper-inject.js` | NODE | 3360 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/test-external-trace-generator.js` | NODE | 1955 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/test-resync-macro-cache.js` | NODE | 3068 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/test-trace-memory-rival.js` | NODE | 2687 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/validate-macros.js` | NODE | 1936 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/validate-prediction-registry.js` | NODE | 8678 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/validate-preregistration-coverage.js` | NODE | 1321 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/validate-promotion-rules.js` | NODE | 3027 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-coordinate-specs.js` | NODE | 4447 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-curation-overlays.js` | NODE | 3733 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-human-veto-signature-v27.js` | NODE | 6395 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-human-veto-signature-v28.js` | NODE | 12411 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-human-veto-signature.js` | NODE | 2763 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-monolithic-risk.js` | NODE | 7416 | true | fuente no alcanzable por ningun root |
| `rigid-identity-framework/scripts/verify-registry-reproducibility.js` | NODE | 9245 | true | fuente no alcanzable por ningun root |
| `scripts/audit-public-release-reproducibility.cjs` | NODE | 8323 | true | fuente no alcanzable por ningun root |
| `scripts/sync-public-trunk-canonicalization.cjs` | NODE | 119 | true | fuente no alcanzable por ningun root |
| `scripts/verify-canonical-integrity.cjs` | NODE | 6852 | true | fuente no alcanzable por ningun root |
| `scripts/verify-canonical-release.cjs` | NODE | 3307 | true | fuente no alcanzable por ningun root |
| `scripts/verify-claim-registry.cjs` | NODE | 3368 | true | fuente no alcanzable por ningun root |

## Duplicados por hash (mismo contenido en varias rutas)

- `f216d855989f`
  - `CHANGELOG_QICN_PATCH.md`
  - `rigid-identity-framework/CHANGELOG_QICN_PATCH.md`
- `be68c963614d`
  - `PATCH_AUDIT_SUMMARY.md`
  - `rigid-identity-framework/PATCH_AUDIT_SUMMARY.md`
- `2a13b5bdc4dc`
  - `artifacts/notebooklm_pdf_bundle_2026-02-28/logs/build_logs/CANONICAL_CORE_RECONSTRUCTED.aux`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.aux`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.aux`
- `01ba4719c80b`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_CCC_OMEGA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_CCC_OMEGA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_FORMULAS_QICN_IMPLEMENTACION.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_FORMULAS_QICN_IMPLEMENTACION.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ANALISIS_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_DIAGNOSTICO_ARQUITECTONICO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_DIAGNOSTICO_ARQUITECTONICO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_PROMPT_CONSULTA_CANON.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_PROMPT_CONSULTA_CANON.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ULTRA_ANALYSIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Analisis_ULTRA_ANALYSIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_DEFINICION_CLINICA_ESTRUCTURAL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_DEFINICION_CLINICA_ESTRUCTURAL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_ACTUALIZACION_TECNICA_MAESTRA_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_ACTUALIZACION_TECNICA_MAESTRA_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_ESTADO_MAESTRO_QICN_SISTEMA_CANON_2026-02-27_ULTRATHINK.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_ESTADO_MAESTRO_QICN_SISTEMA_CANON_2026-02-27_ULTRATHINK.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_INVENTARIO_SYNC_NOTEBOOKLM_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_INVENTARIO_SYNC_NOTEBOOKLM_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_PODCAST_NOTEBOOKLM_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_PODCAST_NOTEBOOKLM_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_NOTEBOOKLM_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_NOTEBOOKLM_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_SHORTS_TIKTOK_REELS_CYBERPUNK_CLEAN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_SHORTS_TIKTOK_REELS_CYBERPUNK_CLEAN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_YOUTUBE_12MIN_CYBERPUNK_CLEAN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_YOUTUBE_12MIN_CYBERPUNK_CLEAN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_README_rigid-identity.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_README_rigid-identity.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_predictions-v45-analysis-report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_predictions-v45-analysis-report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_predictions-v45-readme.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_predictions-v45-readme.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_test_avanzado_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Documentacion_test_avanzado_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_CANONICAL_CORE.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_CANONICAL_CORE.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_phenomenological-instability.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_phenomenological-instability.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_phenomenological-regimes.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_phenomenological-regimes.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_rigid-identity-paper.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_LaTeX_rigid-identity-paper.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_QICN_BIBLIA_ATRACTOR_FLUIDO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_QICN_BIBLIA_ATRACTOR_FLUIDO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_RECOMENDACIONES_ARQUITECTONICAS_ULTRATHINK.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_RECOMENDACIONES_ARQUITECTONICAS_ULTRATHINK.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-instability.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-instability.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-regimes.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-regimes.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_rigid-identity-paper.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_Resumenes_RESUMEN_rigid-identity-paper.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SINTESIS_QICN_ATRACTOR_Y_ESTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SINTESIS_QICN_ATRACTOR_Y_ESTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CCC_OMEGA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CCC_OMEGA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ULTRA_ANALYSIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ULTRA_ANALYSIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_README_rigid-identity.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_README_rigid-identity.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-analysis-report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-analysis-report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-readme.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-readme.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_test_avanzado_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_test_avanzado_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_CANONICAL_CORE.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_CANONICAL_CORE.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-instability.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-instability.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-regimes.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-regimes.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_rigid-identity-paper.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_rigid-identity-paper.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_README.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_README.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-instability.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-instability.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-regimes.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-regimes.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_rigid-identity-paper.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_rigid-identity-paper.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_CONFIGURATION_MATRIARCH.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_CONFIGURATION_MATRIARCH.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_OPTIMIZATION_HANDOFF.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_OPTIMIZATION_HANDOFF.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PLAN_ESTABILIZACION_V91.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PLAN_ESTABILIZACION_V91.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROFITABILITY_PARITY_MASTER_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROFITABILITY_PARITY_MASTER_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROMPT_GEMINI_EFP_UPGRADE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROMPT_GEMINI_EFP_UPGRADE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RECONSTRUCCION_V11_GFORCE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RECONSTRUCCION_V11_GFORCE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_DIAGNOSIS_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_DIAGNOSIS_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_SINGULARITY_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_SINGULARITY_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_README.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_TRADING_SYSTEM_README.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_ULTRA_ANALISIS_MAESTRO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_ULTRA_ANALISIS_MAESTRO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_campaign_v1_main.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_campaign_v1_main.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_COGNITIVE_EMERGENCE_OPERATIONAL_PLAN_v1.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_COGNITIVE_EMERGENCE_OPERATIONAL_PLAN_v1.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_LIBERADO_OVERVIEW.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_LIBERADO_OVERVIEW.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_RETROINDUCTION_QUANTUM_UPGRADE_v1.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_RETROINDUCTION_QUANTUM_UPGRADE_v1.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_ULTRATHINK_IMPLEMENTATION_AUDIT_v56.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_ULTRATHINK_IMPLEMENTATION_AUDIT_v56.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_alignment_report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_docs_alignment_report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_CONFIGURATION_MATRIARCH.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_CONFIGURATION_MATRIARCH.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_OPTIMIZATION_HANDOFF.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_OPTIMIZATION_HANDOFF.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PLAN_ESTABILIZACION_V91.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PLAN_ESTABILIZACION_V91.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PROFITABILITY_PARITY_MASTER_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PROFITABILITY_PARITY_MASTER_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PROMPT_GEMINI_EFP_UPGRADE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_PROMPT_GEMINI_EFP_UPGRADE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_RECONSTRUCCION_V11_GFORCE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_RECONSTRUCCION_V11_GFORCE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_DIAGNOSIS_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_DIAGNOSIS_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_SINGULARITY_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_SINGULARITY_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_CCC_OMEGA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_CCC_OMEGA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_FORMULAS_QICN_IMPLEMENTACION.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_FORMULAS_QICN_IMPLEMENTACION.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ANALISIS_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_DIAGNOSTICO_ARQUITECTONICO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_DIAGNOSTICO_ARQUITECTONICO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_PROMPT_CONSULTA_CANON.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_PROMPT_CONSULTA_CANON.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ULTRA_ANALYSIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Analisis_ULTRA_ANALYSIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_DEFINICION_CLINICA_ESTRUCTURAL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_DEFINICION_CLINICA_ESTRUCTURAL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_ACTUALIZACION_TECNICA_MAESTRA_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_ACTUALIZACION_TECNICA_MAESTRA_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_ESTADO_MAESTRO_QICN_SISTEMA_CANON_2026-02-27_ULTRATHINK.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_ESTADO_MAESTRO_QICN_SISTEMA_CANON_2026-02-27_ULTRATHINK.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_INVENTARIO_SYNC_NOTEBOOKLM_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_INVENTARIO_SYNC_NOTEBOOKLM_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PREGUNTAS_QICN_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_PODCAST_NOTEBOOKLM_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_PODCAST_NOTEBOOKLM_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_NOTEBOOKLM_QICN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_NOTEBOOKLM_QICN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_SHORTS_TIKTOK_REELS_CYBERPUNK_CLEAN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_SHORTS_TIKTOK_REELS_CYBERPUNK_CLEAN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_YOUTUBE_12MIN_CYBERPUNK_CLEAN_2026-02-26.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_PROMPT_VIDEO_YOUTUBE_12MIN_CYBERPUNK_CLEAN_2026-02-26.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_README_rigid-identity.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_README_rigid-identity.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_predictions-v45-analysis-report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_predictions-v45-analysis-report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_predictions-v45-readme.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_predictions-v45-readme.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_test_avanzado_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Documentacion_test_avanzado_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_CANONICAL_CORE.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_CANONICAL_CORE.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_phenomenological-instability.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_phenomenological-instability.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_phenomenological-regimes.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_phenomenological-regimes.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_rigid-identity-paper.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_LaTeX_rigid-identity-paper.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_QICN_BIBLIA_ATRACTOR_FLUIDO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_QICN_BIBLIA_ATRACTOR_FLUIDO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_RECOMENDACIONES_ARQUITECTONICAS_ULTRATHINK.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_RECOMENDACIONES_ARQUITECTONICAS_ULTRATHINK.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-instability.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-instability.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-regimes.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_phenomenological-regimes.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_rigid-identity-paper.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_Resumenes_RESUMEN_rigid-identity-paper.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SINTESIS_QICN_ATRACTOR_Y_ESTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SINTESIS_QICN_ATRACTOR_Y_ESTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CCC_OMEGA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CCC_OMEGA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ANALISIS_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ULTRA_ANALYSIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Analisis_ULTRA_ANALYSIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_CLASE_CR.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_FENOMENOLOGIA.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_RONDA3.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_PREGUNTAS_QICN_RONDA3.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_README_rigid-identity.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_README_rigid-identity.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-analysis-report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-analysis-report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-readme.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_predictions-v45-readme.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_test_avanzado_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Documentacion_test_avanzado_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_CANONICAL_CORE.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_CANONICAL_CORE.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_ONTOLOGICAL_FRAMEWORK.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-instability.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-instability.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-regimes.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_phenomenological-regimes.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_rigid-identity-paper.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_LaTeX_rigid-identity-paper.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_README.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_README.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_COMPLETO_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_GLOBAL_PARA_CHATGPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-instability.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-instability.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-regimes.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_phenomenological-regimes.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_rigid-identity-paper.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_Resumenes_RESUMEN_rigid-identity-paper.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_CONFIGURATION_MATRIARCH.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_CONFIGURATION_MATRIARCH.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_OPTIMIZATION_HANDOFF.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_OPTIMIZATION_HANDOFF.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PLAN_ESTABILIZACION_V91.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PLAN_ESTABILIZACION_V91.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROFITABILITY_PARITY_MASTER_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROFITABILITY_PARITY_MASTER_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROMPT_GEMINI_EFP_UPGRADE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_PROMPT_GEMINI_EFP_UPGRADE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RECONSTRUCCION_V11_GFORCE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_RECONSTRUCCION_V11_GFORCE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_DIAGNOSIS_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_DIAGNOSIS_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_SINGULARITY_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_Documentacion_ULTRATHINK_SINGULARITY_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_README.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_TRADING_SYSTEM_README.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_ULTRA_ANALISIS_MAESTRO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_ULTRA_ANALISIS_MAESTRO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_campaign_v1_main.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_campaign_v1_main.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.tex/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.tex/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_ANALISIS_COMPLETO_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_ANALISIS_COMPLETO_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_Analisis_Singularidad_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_Analisis_Singularidad_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_Analisis_y_Prompt_para_Integracion_API.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_Analisis_y_Prompt_para_Integracion_API.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_COGNITIVE_EMERGENCE_OPERATIONAL_PLAN_v1.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_COGNITIVE_EMERGENCE_OPERATIONAL_PLAN_v1.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_QICN_CORRECCIONES_IMPLEMENTADAS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_QICN_Ontological_Revelations_Documentation.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_QICN_Ontological_Revelations_Documentation.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_REPORTE_FINAL_ANALISIS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_REPORTE_FINAL_ANALISIS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_RESUMEN_EJECUTIVO_PDFS_QICN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_LIBERADO_OVERVIEW.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_LIBERADO_OVERVIEW.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_RETROINDUCTION_QUANTUM_UPGRADE_v1.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SANDBOX_RETROINDUCTION_QUANTUM_UPGRADE_v1.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SELF_PATCH_GIT_CONNECTED_RUNBOOK_v415.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_SISTEMA_MULTI_PROVEEDOR_IMPLEMENTADO.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_ULTRATHINK_IMPLEMENTATION_AUDIT_v56.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_ULTRATHINK_IMPLEMENTATION_AUDIT_v56.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_alignment_report.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_docs_alignment_report.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_CONFIGURATION_MATRIARCH.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_CONFIGURATION_MATRIARCH.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_OPTIMIZATION_HANDOFF.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_OPTIMIZATION_HANDOFF.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PLAN_ESTABILIZACION_V91.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PLAN_ESTABILIZACION_V91.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PROFITABILITY_PARITY_MASTER_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PROFITABILITY_PARITY_MASTER_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PROMPT_GEMINI_EFP_UPGRADE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_PROMPT_GEMINI_EFP_UPGRADE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_EMOTIONAL_FIELD_PROTOCOL_v2.0.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_V91_TECHNICAL_AUDIT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_QICN_V91_TECHNICAL_AUDIT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_RCICX_OPTIMAL_CONFIGURATIONS.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_RCICX_OPTIMAL_CONFIGURATIONS.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_RECONSTRUCCION_V11_GFORCE.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_RECONSTRUCCION_V11_GFORCE.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_DIAGNOSIS_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_DIAGNOSIS_PROMPT.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_OPTIMIZATION_PLAN_v4.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_PROFITABILITY_PLAN_v7.md/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_SINGULARITY_PROMPT.md/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/qicn-retro-causal-trading-system_docs_ULTRATHINK_SINGULARITY_PROMPT.md/stdout.log`
- `e3b0c44298fc`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_CANONICAL_CORE.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_CANONICAL_CORE.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_QICN.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_QICN.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_QICN_INTEGRATED_PAPER.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_QICN_INTEGRATED_PAPER.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_Reverse_Causality_Engineering.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_Reverse_Causality_Engineering.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_paper2-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_paper2-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_paper3-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_paper3-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_phenomenological-instability.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_phenomenological-instability.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_phenomenological-regimes.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_phenomenological-regimes.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_predictions-v45-main-v45-19p.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_predictions-v45-main-v45-19p.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_rigid-identity-paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_PDFs_rigid-identity-paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_CANONICAL_CORE.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_CANONICAL_CORE.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN_INTEGRATED_PAPER.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN_INTEGRATED_PAPER.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Reverse_Causality_Engineering.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Reverse_Causality_Engineering.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper2-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper2-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper3-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper3-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-instability.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-instability.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-regimes.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-regimes.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_predictions-v45-main-v45-19p.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_predictions-v45-main-v45-19p.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_rigid-identity-paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_rigid-identity-paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/SISTEMA_CANON_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228/build_logs/Sistema_Canon_Sandbox_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NETLIFY_DROPS_QICN_BLUEFIX_V2_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_CANONICAL_CORE.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_CANONICAL_CORE.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_QICN.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_QICN.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_QICN_INTEGRATED_PAPER.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_QICN_INTEGRATED_PAPER.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_Reverse_Causality_Engineering.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_Reverse_Causality_Engineering.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_paper2-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_paper2-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_paper3-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_paper3-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_phenomenological-instability.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_phenomenological-instability.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_phenomenological-regimes.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_phenomenological-regimes.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_predictions-v45-main-v45-19p.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_predictions-v45-main-v45-19p.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_rigid-identity-paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_PDFs_rigid-identity-paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_CANONICAL_CORE.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_CANONICAL_CORE.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Ingenier_a_de_Causalidad_Inversa.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN_INTEGRATED_PAPER.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_QICN_INTEGRATED_PAPER.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_RIGID_IDENTITY_FRAMEWORK.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Reverse_Causality_Engineering.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_Reverse_Causality_Engineering.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper2-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper2-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper3-main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_paper3-main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-instability.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-instability.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-regimes.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_phenomenological-regimes.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_predictions-v45-main-v45-19p.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_predictions-v45-main-v45-19p.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_rigid-identity-paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/NotebookLM_SISTEMA_CANON_PAPERS_PDFs_rigid-identity-paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/SISTEMA_CANON_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_main.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_paper.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_artifacts_paper_exports_roeo_batch_final_paper_v1_paper.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_3_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_3_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_4_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_4_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_7_.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_7_.pdf/stdout.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_X.pdf/stderr.log`
  - `artifacts/pdf_corpus/pdf_corpus_20260228_r2/build_logs/Sistema_Canon_Sandbox_theory_RCIC_X.pdf/stdout.log`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.out`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.toc`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.toc`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.out`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.toc`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.toc`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/1a86ec656885a998/out/main.out`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/6968859f53621468/out/main.bbl`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/9e4b83e44e669730/out/main.bbl`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/aa4d0b933892715a/out/main.out`
  - `nul`
  - `phenomenological-instability-paper/__codex_pdflatex_stderr.log`
  - `phenomenological-regimes-paper/__codex_pdflatex_stderr.log`
  - `rigid-identity-paper/__codex_pdflatex_stderr.log`
- `8126c2bcf93c`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/1a86ec656885a998/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/fail_logs/main/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/1a86ec656885a998/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/main/main.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-04/build_logs/1a86ec656885a998__main.engine.log`
- `ce48edb59610`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/44806ece96bbdae2/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/44806ece96bbdae2/main.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-04/build_logs/44806ece96bbdae2__main.engine.log`
- `0bc1bbf14c0c`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/87dc170947cc65f0/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/87dc170947cc65f0/main.log`
- `e0c4f91f6d68`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/aa4d0b933892715a/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/aa4d0b933892715a/main.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-04/build_logs/aa4d0b933892715a__main.engine.log`
- `5d54ebc41cc5`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/c3d1cc6abf9c8c70/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/c3d1cc6abf9c8c70/main.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-04/build_logs/c3d1cc6abf9c8c70__main.engine.log`
- `3861ceb74308`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/_zip_payload/build_logs/dc23c9c9345aae47/main.log`
  - `artifacts/pdf_corpus_rebuild/pdf_corpus_2026-02-28/build_logs/dc23c9c9345aae47/main.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-04/build_logs/dc23c9c9345aae47__main.engine.log`
- `d7e5a4f270fa`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/04b19f2d67504c4f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/04b40ecc9376767e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/0b013024c06a2f7d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/0bd01cc3232236a2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/0be180f774b09252.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/0c9c3eba9825034c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/0e5a54a78767245b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/12104f106a85b975.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/16e4dc04c8789b08.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/197ebf2656ecb13e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/1a86ec656885a998.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/1c52abd6a8b6a040.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/1d8aebbc14337222.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/1dcabfdeff72d706.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/215c5ef574b61aa8.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/219f506d644ad344.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/24398c7c90f6c8ed.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/25aa376a756a390e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/27b90c3919608829.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/28718797f0113ef6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/29b06b3965372d6a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/2e11438fc9a22fc3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/2ee58d26f64f2bdf.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/331508bde64b8298.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/37b7efdfcc528bc9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/37d7f501ab5851dc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3862e3b2dd966a88.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/39860a8a5035ed82.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3ad0366c7bfc6ec0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3b77e7b20616cf25.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3e026c9275c59788.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3e3ea2f756fbeef9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3f913dfb8e3eb39c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/3faf661e3bd331f3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/42974354a2612efc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/42d3b120e7cacca7.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/44806ece96bbdae2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/44b2ffbbc940e04e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/4c2b6c3e5ce221f5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/4cc75d3caad27c40.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/55200c2a5d9f6524.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/57bbdbd2d6d7023e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/58ec52428f237b82.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/5e0f6ba25420e458.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/5ed0fc6980f70ed3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/6122a8f00d628c20.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/66eda6a0a529f0bf.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/68c6e1002802d508.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/6968859f53621468.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/6c72437bee12639f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/75fe652aed4b8024.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/78ec9e6dd2a2656c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/7dcabe29c0b6bd56.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/821d3ba52c3b7b1d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/84ace50031bdb0e8.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/857c4c89149a369c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/87455126163f0eb5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/87dc170947cc65f0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/8886c81f234ecac0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/8c65213c6caabca9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/8dfa40f9296a18fe.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/90ca4737c774538d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/92248a445d128dbc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/93549a699622354f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9530b40914471131.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9a2f182793c6b344.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9aeedac74cdb370b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9cc92440c06d813b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9dab69286f9e9107.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/9e4b83e44e669730.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/a358a6b56765a121.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/a56a1b8b63c2b491.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/a7e09107308dc819.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/a8daaa558340860a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/a9a0b762ac426947.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/aa4d0b933892715a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/af671fe0352f0459.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/b44f7664d43cb699.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/b9b868af08a6065e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bb0cda8022f6c8ac.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bb5ec730afa27783.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bbe9bbb48ddf4f9c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bcb652ad278c44b6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bcf4d16e4357fa7e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bd967540feb6372a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/bd9e85be2631b00c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c147838237ff90cc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c2f0f44399b4a944.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c3d1cc6abf9c8c70.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c5925a7cfcb27142.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c6ac9be41c186f35.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/c89b9c62917100f5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/cba94f6466a88eac.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/ccca3ae2460ecfd6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/d02fc4845aba43cb.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/d4700970f71eeef7.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/d6fef01599fe39f3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/dc23c9c9345aae47.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/dc709c6841f0429b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/dfa5be0c2e7ba11b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/e12b0377bbcd6147.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/e2457b26af9ef557.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/e51133fddd53cd17.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/e765cf08a8e3e51e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/ea247e98e09de39b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/eead218e079c0ad2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f2c6f46af3ef07dd.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f4c75b66d21d0f16.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f541eed675de3c56.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f6bd20f11e44d609.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f81797747e390bb1.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/f9624341463ad568.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/_zip_payload/logs/build/faa0b3896111aab3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/04b19f2d67504c4f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/04b40ecc9376767e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/0b013024c06a2f7d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/0bd01cc3232236a2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/0be180f774b09252.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/0c9c3eba9825034c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/0e5a54a78767245b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/12104f106a85b975.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/16e4dc04c8789b08.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/197ebf2656ecb13e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/1a86ec656885a998.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/1c52abd6a8b6a040.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/1d8aebbc14337222.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/1dcabfdeff72d706.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/215c5ef574b61aa8.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/219f506d644ad344.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/24398c7c90f6c8ed.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/25aa376a756a390e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/27b90c3919608829.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/28718797f0113ef6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/29b06b3965372d6a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/2e11438fc9a22fc3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/2ee58d26f64f2bdf.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/331508bde64b8298.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/37b7efdfcc528bc9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/37d7f501ab5851dc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3862e3b2dd966a88.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/39860a8a5035ed82.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3ad0366c7bfc6ec0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3b77e7b20616cf25.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3e026c9275c59788.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3e3ea2f756fbeef9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3f913dfb8e3eb39c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/3faf661e3bd331f3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/42974354a2612efc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/42d3b120e7cacca7.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/44806ece96bbdae2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/44b2ffbbc940e04e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/4c2b6c3e5ce221f5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/4cc75d3caad27c40.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/55200c2a5d9f6524.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/57bbdbd2d6d7023e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/58ec52428f237b82.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/5e0f6ba25420e458.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/5ed0fc6980f70ed3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/6122a8f00d628c20.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/66eda6a0a529f0bf.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/68c6e1002802d508.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/6968859f53621468.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/6c72437bee12639f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/75fe652aed4b8024.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/78ec9e6dd2a2656c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/7dcabe29c0b6bd56.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/821d3ba52c3b7b1d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/84ace50031bdb0e8.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/857c4c89149a369c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/87455126163f0eb5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/87dc170947cc65f0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/8886c81f234ecac0.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/8c65213c6caabca9.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/8dfa40f9296a18fe.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/90ca4737c774538d.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/92248a445d128dbc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/93549a699622354f.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9530b40914471131.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9a2f182793c6b344.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9aeedac74cdb370b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9cc92440c06d813b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9dab69286f9e9107.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/9e4b83e44e669730.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/a358a6b56765a121.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/a56a1b8b63c2b491.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/a7e09107308dc819.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/a8daaa558340860a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/a9a0b762ac426947.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/aa4d0b933892715a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/af671fe0352f0459.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/b44f7664d43cb699.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/b9b868af08a6065e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bb0cda8022f6c8ac.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bb5ec730afa27783.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bbe9bbb48ddf4f9c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bcb652ad278c44b6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bcf4d16e4357fa7e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bd967540feb6372a.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/bd9e85be2631b00c.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c147838237ff90cc.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c2f0f44399b4a944.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c3d1cc6abf9c8c70.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c5925a7cfcb27142.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c6ac9be41c186f35.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/c89b9c62917100f5.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/cba94f6466a88eac.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/ccca3ae2460ecfd6.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/d02fc4845aba43cb.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/d4700970f71eeef7.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/d6fef01599fe39f3.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/dc23c9c9345aae47.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/dc709c6841f0429b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/dfa5be0c2e7ba11b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/e12b0377bbcd6147.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/e2457b26af9ef557.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/e51133fddd53cd17.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/e765cf08a8e3e51e.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/ea247e98e09de39b.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/eead218e079c0ad2.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f2c6f46af3ef07dd.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f4c75b66d21d0f16.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f541eed675de3c56.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f6bd20f11e44d609.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f81797747e390bb1.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/f9624341463ad568.log`
  - `artifacts/pdf_corpus_rebuild_final_2026-03-03/logs/build/faa0b3896111aab3.log`
- `d4bb533b660d`
  - `artifacts/precursor_overview_rewrite_v1/build_final_ov1.log`
  - `artifacts/precursor_overview_rewrite_v1/build_final_ov2.log`
  - `artifacts/precursor_overview_rewrite_v1/build_final_ov3.log`
- `947210f8c427`
  - `artifacts/precursor_overview_rewrite_v1/build_final_ov_bib.log`
  - `artifacts/precursor_overview_rewrite_v1/build_overview_biber.log`
- `85e25d9fb50d`
  - `artifacts/precursor_overview_rewrite_v1/build_hs_ov1.log`
  - `artifacts/precursor_overview_rewrite_v1/build_hs_ov2.log`
  - `artifacts/precursor_overview_rewrite_v1/build_hs_ov3.log`
- `d31611b90533`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/pass1.log`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/pass2.log`
- `c11b9095bba2`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.aux`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.aux`
- `92ca582625c7`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE.log`
- `0237c207184c`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.log`
- `0bb642c1f1e9`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.out`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.out`
- `c8cc8ed27523`
  - `artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.toc`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/build/canonical_core/eead218e079c0ad2/src/CANONICAL_CORE_RECONSTRUCTED.toc`
- `9f4fc53118ea`
  - `artifacts/release_audit/pdf_corpus_rebuild/build_logs/44806ece96bbdae2/main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/pdf_corpus_rebuild/build_logs/44806ece96bbdae2/main.log`
- `831518bfd92f`
  - `artifacts/release_audit/rebuild_pdf_corpus.stdout.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_audit/rebuild_pdf_corpus.stdout.log`
- `fbabe80c887f`
  - `artifacts/release_v2_build_2026-03-03/_smoke/out/__smoke_test.aux`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/_smoke/out/__smoke_test.aux`
  - `rigid-identity-framework/docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.aux`
- `18f3004170e1`
  - `artifacts/release_v2_build_2026-03-03/_smoke/out/__smoke_test.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/_smoke/out/__smoke_test.log`
- `557d6db6013a`
  - `artifacts/release_v2_build_2026-03-03/build_logs/12104f106a85b975__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/12104f106a85b975__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
- `bf2524696498`
  - `artifacts/release_v2_build_2026-03-03/build_logs/12104f106a85b975__QICN_ONTOLOGICAL_FRAMEWORK.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/12104f106a85b975__QICN_ONTOLOGICAL_FRAMEWORK.log`
- `4664a0addc13`
  - `artifacts/release_v2_build_2026-03-03/build_logs/197ebf2656ecb13e__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/197ebf2656ecb13e__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.engine.pass1.log`
- `fe4ee930b599`
  - `artifacts/release_v2_build_2026-03-03/build_logs/197ebf2656ecb13e__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/197ebf2656ecb13e__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.log`
- `ae69a79a5cde`
  - `artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass1.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.engine.pass3.log`
- `4546f90eba79`
  - `artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/1a86ec656885a998__main.log`
- `fda2ae3dafa3`
  - `artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass1.log`
- `5977eecd4080`
  - `artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.engine.pass3.log`
- `021cfb65144e`
  - `artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/39860a8a5035ed82__phenomenological-regimes.log`
- `cea22a51ae69`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3b77e7b20616cf25__CANONICAL_CORE.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3b77e7b20616cf25__CANONICAL_CORE.engine.pass1.log`
- `dad2eca26023`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3b77e7b20616cf25__CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3b77e7b20616cf25__CANONICAL_CORE.log`
- `d347a39b4d54`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass1.log`
- `ccde176481ff`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.engine.pass3.log`
- `b2047221f30b`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3e026c9275c59788__rigid-identity-paper.log`
- `093c03d4f474`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3f913dfb8e3eb39c__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3f913dfb8e3eb39c__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.engine.pass1.log`
- `ee50ea483645`
  - `artifacts/release_v2_build_2026-03-03/build_logs/3f913dfb8e3eb39c__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/3f913dfb8e3eb39c__QICN_SUPREME_ONTOLOGICAL_FOUNDATIONS.log`
- `9ab40cd5798f`
  - `artifacts/release_v2_build_2026-03-03/build_logs/44806ece96bbdae2__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/44806ece96bbdae2__main.engine.pass1.log`
- `0996e6de83b4`
  - `artifacts/release_v2_build_2026-03-03/build_logs/44806ece96bbdae2__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/44806ece96bbdae2__main.log`
- `acd3c818283f`
  - `artifacts/release_v2_build_2026-03-03/build_logs/44b2ffbbc940e04e__CANONICAL_CORE.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/44b2ffbbc940e04e__CANONICAL_CORE.engine.pass1.log`
- `bd986247a452`
  - `artifacts/release_v2_build_2026-03-03/build_logs/44b2ffbbc940e04e__CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/44b2ffbbc940e04e__CANONICAL_CORE.log`
- `681a07e38606`
  - `artifacts/release_v2_build_2026-03-03/build_logs/5ed0fc6980f70ed3__bad_paper.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/5ed0fc6980f70ed3__bad_paper.engine.pass1.log`
- `0b165bd3f91e`
  - `artifacts/release_v2_build_2026-03-03/build_logs/5ed0fc6980f70ed3__bad_paper.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/5ed0fc6980f70ed3__bad_paper.log`
- `9847f762cdce`
  - `artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass1.log`
- `d68cccbbae83`
  - `artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.engine.pass3.log`
- `ed68b276cb26`
  - `artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/6968859f53621468__main.log`
- `3e3cf6618836`
  - `artifacts/release_v2_build_2026-03-03/build_logs/857c4c89149a369c__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/857c4c89149a369c__main.engine.pass1.log`
- `dadc183c1ccb`
  - `artifacts/release_v2_build_2026-03-03/build_logs/857c4c89149a369c__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/857c4c89149a369c__main.log`
- `19de5316b1c1`
  - `artifacts/release_v2_build_2026-03-03/build_logs/87dc170947cc65f0__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/87dc170947cc65f0__main.engine.pass1.log`
- `beacc925fa6c`
  - `artifacts/release_v2_build_2026-03-03/build_logs/87dc170947cc65f0__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/87dc170947cc65f0__main.log`
- `8fabdcc439e0`
  - `artifacts/release_v2_build_2026-03-03/build_logs/8886c81f234ecac0__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/8886c81f234ecac0__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
- `dfc01bc5f21d`
  - `artifacts/release_v2_build_2026-03-03/build_logs/8886c81f234ecac0__QICN_ONTOLOGICAL_FRAMEWORK.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/8886c81f234ecac0__QICN_ONTOLOGICAL_FRAMEWORK.log`
- `48c751a42a38`
  - `artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass1.log`
- `7ed7178f92ad`
  - `artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.engine.pass3.log`
- `7dec13232c44`
  - `artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/9e4b83e44e669730__main.log`
- `9060ee9217fe`
  - `artifacts/release_v2_build_2026-03-03/build_logs/__smoke_test.cmd.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/__smoke_test.cmd.log`
- `10cb47b4dd51`
  - `artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass1.log`
- `29c48af8fa03`
  - `artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.engine.pass3.log`
- `c48777deaa6d`
  - `artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/aa4d0b933892715a__main.log`
- `3b140e28feb6`
  - `artifacts/release_v2_build_2026-03-03/build_logs/b44f7664d43cb699__CANONICAL_CORE.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/b44f7664d43cb699__CANONICAL_CORE.engine.pass1.log`
- `402e2d724d3e`
  - `artifacts/release_v2_build_2026-03-03/build_logs/b44f7664d43cb699__CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/b44f7664d43cb699__CANONICAL_CORE.log`
- `99c47eec770c`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass1.log`
- `e9c80320623a`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.engine.pass3.log`
- `156bfe4d8e43`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb0cda8022f6c8ac__rigid-identity-paper.log`
- `592d3137801c`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass1.log`
- `fdbd2dbc0f35`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.engine.pass3.log`
- `642a7715cd37`
  - `artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/bb5ec730afa27783__phenomenological-regimes.log`
- `7e8bab273443`
  - `artifacts/release_v2_build_2026-03-03/build_logs/c3d1cc6abf9c8c70__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/c3d1cc6abf9c8c70__main.engine.pass1.log`
- `291ffef3d637`
  - `artifacts/release_v2_build_2026-03-03/build_logs/c3d1cc6abf9c8c70__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/c3d1cc6abf9c8c70__main.log`
- `fffae2d34c1a`
  - `artifacts/release_v2_build_2026-03-03/build_logs/c6ac9be41c186f35__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/c6ac9be41c186f35__main.engine.pass1.log`
- `97553caa85b3`
  - `artifacts/release_v2_build_2026-03-03/build_logs/c6ac9be41c186f35__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/c6ac9be41c186f35__main.log`
- `b69a0fda6fe6`
  - `artifacts/release_v2_build_2026-03-03/build_logs/cba94f6466a88eac__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/cba94f6466a88eac__QICN_ONTOLOGICAL_FRAMEWORK.engine.pass1.log`
- `d21d1a548191`
  - `artifacts/release_v2_build_2026-03-03/build_logs/cba94f6466a88eac__QICN_ONTOLOGICAL_FRAMEWORK.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/cba94f6466a88eac__QICN_ONTOLOGICAL_FRAMEWORK.log`
- `a1892a12c741`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dc23c9c9345aae47__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dc23c9c9345aae47__main.engine.pass1.log`
- `5e1f1822c56c`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dc23c9c9345aae47__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dc23c9c9345aae47__main.log`
- `ab24b361712a`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass1.log`
- `c2a00d1a03d7`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass3.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass2.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.engine.pass3.log`
- `34838502bd06`
  - `artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/dfa5be0c2e7ba11b__phenomenological-regimes.log`
- `ee6c3b0954bb`
  - `artifacts/release_v2_build_2026-03-03/build_logs/e12b0377bbcd6147__main.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/e12b0377bbcd6147__main.engine.pass1.log`
- `cbbb23142c8b`
  - `artifacts/release_v2_build_2026-03-03/build_logs/e12b0377bbcd6147__main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/e12b0377bbcd6147__main.log`
- `ffbb5168dad1`
  - `artifacts/release_v2_build_2026-03-03/build_logs/ea247e98e09de39b__CANONICAL_CORE.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/ea247e98e09de39b__CANONICAL_CORE.engine.pass1.log`
- `b67ce01e9b7e`
  - `artifacts/release_v2_build_2026-03-03/build_logs/ea247e98e09de39b__CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/ea247e98e09de39b__CANONICAL_CORE.log`
- `b63b95aa2d04`
  - `artifacts/release_v2_build_2026-03-03/build_logs/eead218e079c0ad2__CANONICAL_CORE_RECONSTRUCTED.engine.pass1.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/eead218e079c0ad2__CANONICAL_CORE_RECONSTRUCTED.engine.pass1.log`
- `1afc22c0d52f`
  - `artifacts/release_v2_build_2026-03-03/build_logs/eead218e079c0ad2__CANONICAL_CORE_RECONSTRUCTED.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/build_logs/eead218e079c0ad2__CANONICAL_CORE_RECONSTRUCTED.log`
- `22a032e6704c`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/cmd.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/cmd.log`
- `ecfbf80a0bd8`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/engine.log`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/engine.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.log`
- `5695a0be4973`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.aux`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.aux`
- `6f3fd7231e5b`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.out`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/3b77e7b20616cf25/out/CANONICAL_CORE.out`
- `8e770405f1ed`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/cmd.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/cmd.log`
- `4ff590f2b9e2`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/engine.log`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/engine.log`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.log`
- `d46869e1b7fb`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.aux`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.aux`
- `fae6538b035e`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.out`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.out`
- `ce4016120480`
  - `artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.toc`
  - `artifacts/release_v2_scope_freeze_2026-03-04/evidence/artifacts/release_v2_build_2026-03-03/fix_v2f/per_doc_verify/44806ece96bbdae2/out/main.toc`
- `e4dca07b3d12`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/engine_logs/1a86ec656885a998__main.engine.final.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/1a86ec656885a998/ws/rigid-identity-paper/main.log`
- `4866d93a9452`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/engine_logs/6968859f53621468__main.engine.final.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/6968859f53621468/ws/rigid-identity-framework/paper1/main.log`
- `b7e1463334f0`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/engine_logs/9e4b83e44e669730__main.engine.final.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/9e4b83e44e669730/ws/rigid-identity-framework/paper2/main.log`
- `fb5933c7c2e6`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/engine_logs/aa4d0b933892715a__main.engine.final.log`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/aa4d0b933892715a/ws/phenomenological-regimes-paper/main.log`
- `3b108f66fffb`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/1a86ec656885a998/ws/rigid-identity-paper/main.bbl`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/6968859f53621468/ws/rigid-identity-framework/paper1/main.bbl`
  - `rigid-identity-paper/main.bbl`
- `893502a38fe4`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/1a86ec656885a998/ws/rigid-identity-paper/main.bcf`
  - `rigid-identity-paper/main.bcf`
- `3c4b9ab85101`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/1a86ec656885a998/ws/rigid-identity-paper/main.run.xml`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/aa4d0b933892715a/ws/phenomenological-regimes-paper/main.run.xml`
  - `phenomenological-regimes-paper/main.run.xml`
  - `rigid-identity-paper/main.run.xml`
- `7e3f975e378c`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/6968859f53621468/ws/rigid-identity-framework/paper1/main.bcf`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/6968859f53621468/out/main.bcf`
  - `rigid-identity-framework/paper1/main.bcf`
- `cbec67908211`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/6968859f53621468/ws/rigid-identity-framework/paper1/main.out`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/6968859f53621468/out/main.out`
- `257142a764bf`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/6968859f53621468/ws/rigid-identity-framework/paper1/main.run.xml`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/9e4b83e44e669730/ws/rigid-identity-framework/paper2/main.run.xml`
  - `rigid-identity-framework/paper1/main.run.xml`
  - `rigid-identity-framework/paper2/main.run.xml`
  - `rigid-identity-framework/paper3/main.run.xml`
  - `rigid-identity-framework/paper4/main.run.xml`
  - `rigid-identity-framework/paper5_operational_consciousness/main.run.xml`
  - `rigid-identity-framework/paper6_predictions_falsation/main.run.xml`
  - `rigid-identity-framework/paper7_operational_life_subjecthood/main.run.xml`
  - `rigid-identity-framework/paper8_first_person_subjectivity/main.run.xml`
- `6e7a2bebeab0`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/9e4b83e44e669730/ws/rigid-identity-framework/paper2/main.bbl`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/aa4d0b933892715a/ws/phenomenological-regimes-paper/main.bbl`
  - `phenomenological-regimes-paper/main.bbl`
- `82618a93ff42`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/9e4b83e44e669730/ws/rigid-identity-framework/paper2/main.bcf`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/9e4b83e44e669730/out/main.bcf`
  - `rigid-identity-framework/paper2/main.bcf`
- `3a3503edecf3`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/9e4b83e44e669730/ws/rigid-identity-framework/paper2/main.out`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/9e4b83e44e669730/out/main.out`
- `2bd6404c93be`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_2_strict/isolated/aa4d0b933892715a/ws/phenomenological-regimes-paper/main.bcf`
  - `phenomenological-regimes-paper/main.bcf`
- `a608290b2c36`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/1a86ec656885a998/out/main.aux`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/aa4d0b933892715a/out/main.aux`
- `987b4f346cde`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/1a86ec656885a998/out/main.bcf`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/aa4d0b933892715a/out/main.bcf`
- `f82e9967cd63`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/6968859f53621468/out/main.run.xml`
  - `artifacts/release_v2_scope_freeze_strict_2026-03-05/bib_audit_v2_strict/build/9e4b83e44e669730/out/main.run.xml`
- `8daa7bc93908`
  - `corpus/pdf_release/pdfs/canonical_core_legacy_package__f37b3e3e96f89b1a.pdf`
  - `rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.pdf`
- `98e29aa35cde`
  - `photoshop-mcp/packages/photoshop-uxp-plugin/dist/index.html`
  - `photoshop-mcp/packages/photoshop-uxp-plugin/src/index.html`
- `0cc5f4322b8e`
  - `photoshop-mcp/packages/photoshop-uxp-plugin/dist/styles.css`
  - `photoshop-mcp/packages/photoshop-uxp-plugin/src/styles.css`
- `ab8059bc2703`
  - `release/references.bib`
  - `rigid-identity-framework/release/references.bib`
- `a4154a1b9ab0`
  - `rigid-identity-framework/basecore/core/canonical_core_references.bib`
  - `rigid-identity-framework/paper9_phenomenal_bridge_organization/references.bib`
- `aa532add706c`
  - `rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.tex`
  - `rigid-identity-framework/canonical_core_legacy/source_snapshots/CANONICAL_CORE.tex.v2f.bak.20260305T001649Z`
- `c0186396c7cf`
  - `rigid-identity-framework/docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.md`
  - `rigid-identity-framework/docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v34.md`
- `0c4c28edff1e`
  - `rigid-identity-framework/paper6_predictions_falsation/main.bbl`
  - `rigid-identity-framework/paper7_operational_life_subjecthood/main.bbl`
  - `rigid-identity-framework/paper8_first_person_subjectivity/main.bbl`

## AI_OUTPUT (candidatos a ruido — decision carpeta-por-carpeta)

Total AI_OUTPUT: 99. Detalle completo en el JSON adjunto.

Subcarpetas bajo `docs/ai-platform-outputs/`:

| Subcarpeta | Archivos |
|---|---|
| `rigid-identity-framework/docs/ai-platform-outputs/reports` | 61 |
| `rigid-identity-framework/docs/ai-platform-outputs/sims` | 11 |
| `rigid-identity-framework/docs/ai-platform-outputs/analysis` | 9 |
| `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates` | 5 |
| `rigid-identity-framework/docs/ai-platform-outputs/formal` | 3 |
| `rigid-identity-framework/docs/ai-platform-outputs/audits` | 2 |
| `rigid-identity-framework/docs/ai-platform-outputs/manuscript` | 2 |
| `rigid-identity-framework/docs/ai-platform-outputs/prompts` | 2 |
| `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` | 1 |
| `rigid-identity-framework/docs/ai-platform-outputs/QICN_REFEREE_SUBMISSION_COVER.md` | 1 |
| `rigid-identity-framework/docs/ai-platform-outputs/QICN_REVIEWER_PACKAGE_2026-06.md` | 1 |
| `rigid-identity-framework/docs/ai-platform-outputs/extractions` | 1 |

## Detalle por carpeta (no-artefactos, con sinopsis)

Excluye BUILD_ARTIFACT/PDF para reducir ruido. Sinopsis = titulo/
primer encabezado/docstring extraido automaticamente.

### `(raiz)/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `.dockerignore` | REVIEW | no |  |
| `.gitignore` | KEEP | no |  |
| `.gitlab-ci.yml` | REVIEW | no | stages: |
| `AGENTS.md` | REVIEW | no | QICN-FRAMEWORK — Agent Instructions |
| `ANALISIS_GENERAL_PROYECTO.md` [UNTRACKED] | REVIEW | no | ANÁLISIS GENERAL DEL PROYECTO QICN-FRAMEWORK |
| `AUDIT_FORMAL_PROFUNDO_QICN_v28.md` | REVIEW | no | AUDITORÍA FORMAL PROFUNDA: QICN FRAMEWORK v28 CONSOLIDADO |
| `CHANGELOG_QICN_PATCH.md` [DUP] | REVIEW | no | QICN Patch Changelog |
| `CHANGELOG.md` | KEEP | no | CHANGELOG |
| `Dockerfile` | REVIEW | no |  |
| `nul` [DUP] [UNTRACKED] | REVIEW | no |  |
| `opencode.jsonc` [UNTRACKED] | REVIEW | no |  |
| `PATCH_AUDIT_SUMMARY.md` [DUP] | REVIEW | no | QICN Patch Audit Summary |
| `README.md` | KEEP | no | QICN-FRAMEWORK |
| `RELEASE_NOTES.md` | REVIEW | no | RELEASE_NOTES |

### `artifacts/release_audit/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `_search_tmp.json` [UNTRACKED] | REVIEW | no | keys: case_id, blind_id, family, generator_family, substrate, support_radius, target_invariant, severity |
| `_tmp_case.json` [UNTRACKED] | REVIEW | no | keys: case_id, family, generator, substrate, target_invariant, severity, generator_metadata, modes |

### `artifacts/release_audit/__pycache__/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `cycle1_minimum_runner.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `cycle2_hardened_runner.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `cycle3_finalize.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `cycle3_generate_cases.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `cycle3_independent_judge.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `cycle4_boundary_runner.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `high_value_confirmation_campaign.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `independent_judge_v2.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `independent_judge_v3.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `mini_resolution_pass.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `post_cycle4_cleanup.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |
| `residualB_high_value_hardening.cpython-311.pyc` [UNTRACKED] | REVIEW | no |  |

### `corpus/pdf_release/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `manifest.json` | REVIEW | no | keys: generated_at, run_metadata, canonical_picks, toolchain, counts, entries |
| `manifest.sha256.txt` | REVIEW | no | 85e6bf6af301b6a5b5b02b870ce60dfe2d49f7eb22a7159c6167f61651f5a70d manifest.json |
| `pdf_corpus.zip` | REVIEW | no |  |
| `pdf_corpus.zip.sha256.txt` | REVIEW | no | f5a826a7739037ae1f68d3dbba7b93c190cfe37f5f49e2bb64f8d59c913523ae pdf_corpus.zip |

### `docs/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `AUDIT_FCR_v10_IMPLEMENTATION.md` | REVIEW | no | Auditoria Profunda: Implementacion FCR v10 por Codex |
| `AUDIT_HANDOFF_FCR_v9.md` | REVIEW | no | FCR v9 — Complete Execution Handoff & Audit Package |
| `CANON_MANIFEST.md` | REVIEW | no | CANON_MANIFEST |
| `CANON_SOURCE_OF_TRUTH.md` | REVIEW | no | CANON_SOURCE_OF_TRUTH |
| `CANONICAL_RELEASE_NOTES.md` | REVIEW | no | CANONICAL_RELEASE_NOTES |
| `CLAIM_REGISTRY.md` | REVIEW | no | CLAIM_REGISTRY |
| `CODEX_PROMPT_FCR_v10.md` | REVIEW | no | CODEX PROMPT: FCR v10 - Falsifiability Roadmap Integration + Deductive Impact |
| `GITLAB_DUO_AUDIT_TRIAGE_v1.md` | REVIEW | no | GitLab Duo Audit Triage v1 |
| `LAYER_BOUNDARIES.md` | REVIEW | no | LAYER_BOUNDARIES |
| `THEORY_SYSTEM_INTERFACE.md` | REVIEW | no | THEORY_SYSTEM_INTERFACE |

### `docs/reports/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `AUDIT_FORMAL_VERIFICATION_QICN_v1.md` | REVIEW | no | INFORME DE AUDITORÍA FORMAL Y EPISTÉMICA DEL MARCO QICN v1.0 |
| `GITLAB_DUO_AUDIT_IMPLEMENTATION_v1.md` | REVIEW | no | GitLab Duo Audit Implementation v1 |
| `PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md` | REVIEW | no | PDF Release Reproducibility Repair Plan |
| `QICN_BASELINE_v40.md` | REVIEW | no | Fase 0 Report - Baseline Canonico Consolidado |
| `QICN_CRITICAL_GAP_RESOLUTION_ROADMAP_v1.md` | REVIEW | no | QICN Critical Gap Resolution Roadmap v1 |
| `QICN_GLOBAL_ROADMAP_v40.md` | REVIEW | no | QICN Global Roadmap v40 |
| `QICN_V40_PHASE1_INFERIOR_INSTRUMENT_REPORT.md` | REVIEW | no | Fase 1 Report - Inferior Instrument Lemma Corrections |
| `QICN_V40_PHASE2_BRIDGE_HYPOTHESIS_REPORT.md` | REVIEW | no | Fase 2 Report - Bridge H1/H3/H4 Invalidation Attempt |

### `photoshop-mcp/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `.gitignore` [UNTRACKED] | KEEP | no |  |
| `eslint.config.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | import js from "@eslint/js"; |
| `package.json` [UNTRACKED] | KEEP | no | photoshop-mcp |
| `pnpm-lock.yaml` [UNTRACKED] | REVIEW | no | lockfileVersion: '9.0' |
| `pnpm-workspace.yaml` [UNTRACKED] | REVIEW | no | packages: |
| `prettier.config.cjs` [UNTRACKED] | ORPHAN_CANDIDATE | no | module.exports = { |
| `README.md` [UNTRACKED] | KEEP | no | photoshop-mcp |
| `tsconfig.base.json` [UNTRACKED] | REVIEW | no | keys: compilerOptions |

### `photoshop-mcp/docs/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `antigravity.md` [UNTRACKED] | REVIEW | no | Antigravity Configuration |
| `architecture.md` [UNTRACKED] | REVIEW | no | Architecture |
| `codex.md` [UNTRACKED] | REVIEW | no | Codex Configuration |
| `examples.md` [UNTRACKED] | REVIEW | no | Examples |
| `opencode.md` [UNTRACKED] | REVIEW | no | OpenCode / OpenCoda Configuration |
| `photoshop-uxp-setup.md` [UNTRACKED] | REVIEW | no | Photoshop UXP Setup |
| `security.md` [UNTRACKED] | REVIEW | no | Security |
| `tool-reference.md` [UNTRACKED] | REVIEW | no | Tool Reference |
| `troubleshooting.md` [UNTRACKED] | REVIEW | no | Troubleshooting |

### `photoshop-mcp/examples/assets/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `reference.png` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/examples/expected/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `demo-snapshot.expected.json` [UNTRACKED] | REVIEW | no | keys: document, requiredLayerNames |

### `photoshop-mcp/examples/plans/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `demo-composition.json` [UNTRACKED] | REVIEW | no | keys: dryRun, stopOnError, operations |

### `photoshop-mcp/examples/prompts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `create-layered-composition.md` [UNTRACKED] | REVIEW | no | Create a `CompositionPlan` before executing anything. |
| `debug_photoshop_plan.md` [UNTRACKED] | REVIEW | no | Validate the plan with `photoshop.batch_plan` using `dryRun=true`. |

### `photoshop-mcp/packages/mcp-server/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `package.json` [UNTRACKED] | KEEP | no | @photoshop-mcp/mcp-server |
| `tsconfig.json` [UNTRACKED] | REVIEW | no | keys: extends, compilerOptions, references, include |

### `photoshop-mcp/packages/mcp-server/dist/src/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `bridge.d.ts` [UNTRACKED] | REVIEW | no |  |
| `bridge.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `bridge.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | import { randomUUID } from "node:crypto"; |
| `bridge.js.map` [UNTRACKED] | REVIEW | no |  |
| `config.d.ts` [UNTRACKED] | REVIEW | no |  |
| `config.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `config.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=config.js.map |
| `config.js.map` [UNTRACKED] | REVIEW | no |  |
| `controller.d.ts` [UNTRACKED] | REVIEW | no |  |
| `controller.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `controller.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | import fs from "node:fs"; |
| `controller.js.map` [UNTRACKED] | REVIEW | no |  |
| `demo.d.ts` [UNTRACKED] | REVIEW | no |  |
| `demo.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `demo.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | import path from "node:path"; |
| `demo.js.map` [UNTRACKED] | REVIEW | no |  |
| `errors.d.ts` [UNTRACKED] | REVIEW | no |  |
| `errors.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `errors.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=errors.js.map |
| `errors.js.map` [UNTRACKED] | REVIEW | no |  |
| `index.d.ts` [UNTRACKED] | REVIEW | no |  |
| `index.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `index.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `index.js.map` [UNTRACKED] | REVIEW | no |  |
| `mcpServer.d.ts` [UNTRACKED] | REVIEW | no |  |
| `mcpServer.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `mcpServer.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=mcpServer.js.map |
| `mcpServer.js.map` [UNTRACKED] | REVIEW | no |  |
| `prompts.d.ts` [UNTRACKED] | REVIEW | no |  |
| `prompts.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `prompts.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=prompts.js.map |
| `prompts.js.map` [UNTRACKED] | REVIEW | no |  |
| `rateLimit.d.ts` [UNTRACKED] | REVIEW | no |  |
| `rateLimit.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `rateLimit.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=rateLimit.js.map |
| `rateLimit.js.map` [UNTRACKED] | REVIEW | no |  |
| `resources.d.ts` [UNTRACKED] | REVIEW | no |  |
| `resources.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `resources.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=resources.js.map |
| `resources.js.map` [UNTRACKED] | REVIEW | no |  |
| `toolDefinitions.d.ts` [UNTRACKED] | REVIEW | no |  |
| `toolDefinitions.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `toolDefinitions.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=toolDefinitions.js.map |
| `toolDefinitions.js.map` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/mcp-server/dist/tests/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `bridge.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `bridge.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `bridge.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=bridge.test.js.map |
| `bridge.test.js.map` [UNTRACKED] | REVIEW | no |  |
| `dryRun.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `dryRun.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `dryRun.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=dryRun.test.js.map |
| `dryRun.test.js.map` [UNTRACKED] | REVIEW | no |  |
| `jsonRpc.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `jsonRpc.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `jsonRpc.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=jsonRpc.test.js.map |
| `jsonRpc.test.js.map` [UNTRACKED] | REVIEW | no |  |
| `validation.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `validation.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `validation.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=validation.test.js.map |
| `validation.test.js.map` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/mcp-server/src/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `bridge.ts` [UNTRACKED] | REVIEW | no |  |
| `config.ts` [UNTRACKED] | REVIEW | no |  |
| `controller.ts` [UNTRACKED] | REVIEW | no |  |
| `demo.ts` [UNTRACKED] | REVIEW | no |  |
| `errors.ts` [UNTRACKED] | REVIEW | no |  |
| `index.ts` [UNTRACKED] | REVIEW | no |  |
| `mcpServer.ts` [UNTRACKED] | REVIEW | no |  |
| `prompts.ts` [UNTRACKED] | REVIEW | no |  |
| `rateLimit.ts` [UNTRACKED] | REVIEW | no |  |
| `resources.ts` [UNTRACKED] | REVIEW | no |  |
| `toolDefinitions.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/mcp-server/tests/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `bridge.test.ts` [UNTRACKED] | REVIEW | no |  |
| `dryRun.test.ts` [UNTRACKED] | REVIEW | no |  |
| `jsonRpc.test.ts` [UNTRACKED] | REVIEW | no |  |
| `validation.test.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/photoshop-uxp-plugin/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `manifest.json` [UNTRACKED] | REVIEW | no | Photoshop MCP |
| `package.json` [UNTRACKED] | KEEP | no | @photoshop-mcp/photoshop-uxp-plugin |
| `tsconfig.json` [UNTRACKED] | REVIEW | no | keys: extends, compilerOptions, include |

### `photoshop-mcp/packages/photoshop-uxp-plugin/dist/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `index.html` [DUP] [UNTRACKED] | REVIEW | no |  |
| `main.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | "use strict"; |
| `styles.css` [DUP] [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/photoshop-uxp-plugin/scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `copy-static.mjs` [UNTRACKED] | ORPHAN_CANDIDATE | no | import fs from "node:fs/promises"; |

### `photoshop-mcp/packages/photoshop-uxp-plugin/src/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `index.html` [DUP] [UNTRACKED] | REVIEW | no |  |
| `main.ts` [UNTRACKED] | REVIEW | no |  |
| `styles.css` [DUP] [UNTRACKED] | REVIEW | no |  |
| `types.d.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `package.json` [UNTRACKED] | KEEP | no | @photoshop-mcp/shared |
| `tsconfig.json` [UNTRACKED] | REVIEW | no | keys: extends, compilerOptions, include |

### `photoshop-mcp/packages/shared/dist/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `.tsbuildinfo` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/dist/scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `write-json-schema.d.ts` [UNTRACKED] | REVIEW | no |  |
| `write-json-schema.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `write-json-schema.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=write-json-schema.js.map |
| `write-json-schema.js.map` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/dist/src/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `capabilities.d.ts` [UNTRACKED] | REVIEW | no |  |
| `capabilities.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `capabilities.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=capabilities. |
| `capabilities.js.map` [UNTRACKED] | REVIEW | no |  |
| `compareState.d.ts` [UNTRACKED] | REVIEW | no |  |
| `compareState.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `compareState.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=compareState.js.map |
| `compareState.js.map` [UNTRACKED] | REVIEW | no |  |
| `index.d.ts` [UNTRACKED] | REVIEW | no |  |
| `index.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `index.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=index.js.map |
| `index.js.map` [UNTRACKED] | REVIEW | no |  |
| `jsonSchema.d.ts` [UNTRACKED] | REVIEW | no |  |
| `jsonSchema.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `jsonSchema.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=jsonSchema.js.map |
| `jsonSchema.js.map` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.d.ts` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=pathAllowlist.js.map |
| `pathAllowlist.js.map` [UNTRACKED] | REVIEW | no |  |
| `schemas.d.ts` [UNTRACKED] | REVIEW | no |  |
| `schemas.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `schemas.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | import { z } from "zod"; |
| `schemas.js.map` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/dist/tests/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `pathAllowlist.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=pathAllowlist.test.js.map |
| `pathAllowlist.test.js.map` [UNTRACKED] | REVIEW | no |  |
| `schemas.test.d.ts` [UNTRACKED] | REVIEW | no |  |
| `schemas.test.d.ts.map` [UNTRACKED] | REVIEW | no |  |
| `schemas.test.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | # sourceMappingURL=schemas.test.js.map |
| `schemas.test.js.map` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/schema/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `batch-plan.schema.json` [UNTRACKED] | REVIEW | no | keys: $ref, definitions, $schema |
| `photoshop-operation.schema.json` [UNTRACKED] | REVIEW | no | keys: $ref, definitions, $schema |
| `tool-inputs.schema.json` [UNTRACKED] | REVIEW | no | keys: health, get_state, create_document, open_document, save_document, export, create_layer, update_layer |

### `photoshop-mcp/packages/shared/scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `write-json-schema.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/src/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `capabilities.ts` [UNTRACKED] | REVIEW | no |  |
| `compareState.ts` [UNTRACKED] | REVIEW | no |  |
| `index.ts` [UNTRACKED] | REVIEW | no |  |
| `jsonSchema.ts` [UNTRACKED] | REVIEW | no |  |
| `pathAllowlist.ts` [UNTRACKED] | REVIEW | no |  |
| `schemas.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/packages/shared/tests/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `pathAllowlist.test.ts` [UNTRACKED] | REVIEW | no |  |
| `schemas.test.ts` [UNTRACKED] | REVIEW | no |  |

### `photoshop-mcp/scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `create-example-asset.mjs` [UNTRACKED] | ORPHAN_CANDIDATE | no | import { mkdir, writeFile } from "node:fs/promises"; |

### `release/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `BLUEPRINT_EDITORIAL.md` | REVIEW | no | BLUEPRINT_EDITORIAL |
| `canon_manifest.v1.json` | REVIEW | no | keys: artifact_role, schema_version, release_id, canonical_pdf_count, source_of_truth_refs, preferred_lineage_rules, active_base_layer, primary_formal_spine |
| `CANON_MAP.v1.json` | REVIEW | no | keys: artifact_role, schema_version, generated_at, release_id, active_base_layer, downstream_public_packages, preserved_legacy_and_lineage_material, operational |
| `claim_registry.v1.json` | REVIEW | no | keys: artifact_role, schema_version, release_id, registry_scope, claim_classes, entries, non_claim_boundary |
| `commands_run.txt` | REVIEW | no | CMD: where powershell \| CWD: C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0 |
| `CROSSPAPER_LINKMAP.v1.json` | REVIEW | no | keys: artifact_role, schema_version, active_base_layer, downstream_dependencies, non_claim_boundary |
| `EDITORIAL_BLUEPRINT_ACTIONS.v1.md` | REVIEW | no | EDITORIAL_BLUEPRINT_ACTIONS.v1 |
| `GLOSSARY_CANONICAL.v1.md` | REVIEW | no | GLOSSARY_CANONICAL.v1 |
| `INDEX_PDFS.json` | REVIEW | no | keys: generated_at, count, entries |
| `layer_boundaries.v1.json` | REVIEW | no | keys: artifact_role, schema_version, layers, allowed_bridges, blocked_automatic_bridges, non_claim_boundary |
| `METHODS_GOVERNANCE_HUB.v1.md` | REVIEW | no | METHODS_GOVERNANCE_HUB.v1 |
| `references.bib` [DUP] | KEEP | si | % REFERENCES.BIB - deduplicated canonical release bibliography |
| `release_freeze_manifest.json` | REVIEW | no | keys: artifact_role, schema_version, release_id, freeze_reference, observed_repo_state_at_hardening_start, current_non_canonical_separation, pin_status, non_cla |
| `RELEASE_MAP.md` | REVIEW | no | RELEASE_MAP |
| `STYLE_DISCLAIMER_POLICY.v1.md` | REVIEW | no | Objetivo |
| `SUMMARY.json` | REVIEW | no | keys: generated_at, release_id, active_base_layer, downstream_public_package_count, preserved_legacy_package_count, variant_cluster_count, zip_sha256, manifest_ |
| `system_interface_boundary.v1.json` | REVIEW | no | keys: artifact_role, schema_version, external_repository, interfaces, prohibited_inferences, non_claim_boundary |
| `TERM_MIGRATION_PLAN.v1.md` | REVIEW | no | TERM_MIGRATION_PLAN.v1 |

### `release/FREEZE_AUDIT_v1/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `commands_run.txt` | REVIEW | no | Get-FileHash -Algorithm SHA256 corpus\\pdf_release\\pdf_corpus.zip |
| `git_log_1.txt` | REVIEW | no | 2b0d0c0 (HEAD -> main, tag: release-2026-03-01) release: QICN package v1 (canon map + pdf corpus + integrity hashes) |
| `git_status.txt` | REVIEW | no | ## main...origin/main [ahead 1] |
| `git_tags.txt` | REVIEW | no | release-2026-03-01 |
| `integrity_check.json` | REVIEW | no | { |

### `release/_non_canonical/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `README.md` | KEEP | no | NON-CANONICAL EXCLUDED TREE |

### `release/editorial_audit_v1/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `anthropomorphic_terms_report.json` | REVIEW | no | { |
| `anthropomorphic_terms_report.md` | REVIEW | no | # Anthropomorphic Terms Report |
| `doc_inventory.json` | REVIEW | no | [ |
| `doc_inventory.md` | REVIEW | no | # Document Inventory |
| `EXEC_SUMMARY.md` | REVIEW | no | Counts |
| `methods_coverage_table.csv` | REVIEW | no |  |
| `methods_coverage_table.md` | REVIEW | no | # Methods Coverage Table (Primary Docs) |
| `methods_mentions_index.json` | REVIEW | no | [ |
| `methods_mentions_index.md` | REVIEW | no | # Methods Mentions Index |
| `primary_supporting_map.json` | REVIEW | no | [ |
| `primary_supporting_map.md` | REVIEW | no | # Primary vs Supporting Map |
| `q_t_candidate_evidence.json` | REVIEW | no | [ |
| `q_t_candidate_evidence.md` | REVIEW | no | Context hits (<=200 chars) |

### `release/qualia_qo_planning_v1/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `editorial_insertion_plan.md` | REVIEW | no | Objetivo editorial |
| `methods_mapping_table.csv` | REVIEW | no |  |
| `methods_mapping_table.md` | REVIEW | no | # Minimal Methods Mapping Table |
| `papers_inventory.json` | REVIEW | no | { |
| `papers_inventory.md` | REVIEW | no | Sources Read |
| `PR_QO_plan_v1.md` | REVIEW | no | PR-Q1: Readout + logging (<=5 archivos, <=300 LOC) |
| `QO_claim_registry.md` | REVIEW | no | Forbidden claims |
| `QO_spec_v1.json` | REVIEW | no | { |
| `QO_spec_v1.md` | REVIEW | no | Typed definitions |
| `summary.md` | REVIEW | no | Donde estan los papers hoy (keys + docId) |

### `rigid-identity-framework/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CHANGELOG_QICN_PATCH.md` [DUP] | REVIEW | no | QICN Patch Changelog |
| `INSTRUCCIONES.md` | KEEP | no | INSTRUCCIONES OPERATIVAS DEL MARCO QICN |
| `LICENSE` | KEEP | no |  |
| `package.json` | KEEP | no | Local validation tooling for the QICN Rigid Identity Framework Formal Corpus Registry. |
| `PATCH_AUDIT_SUMMARY.md` [DUP] | REVIEW | no | QICN Patch Audit Summary |
| `README.md` | KEEP | no | Rigid Identity Framework |
| `ROADMAP.md` | KEEP | no | Nota de gobierno |
| `VERSION.md` | KEEP | no | QICN Framework Version |

### `rigid-identity-framework/basecore/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `BASECORE.tex` | KEEP | si | \input{glyphtounicode} |
| `README.md` | KEEP | no | BaseCore Package |

### `rigid-identity-framework/basecore/core/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `canonical_core_references.bib` [DUP] | KEEP | si | @book{adamek1990, |

### `rigid-identity-framework/basecore/core/sections/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `01_foundation_from_core.tex` | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `02_model_and_spectral_extensions.tex` | KEEP | si | Typed Computable Model: Embedded Constant-Disk Witness |
| `03_identity_rigidity_absorbed.tex` | KEEP | si | Projective Systems and Inverse-Limit Identity |
| `04_regime_constraints_absorbed.tex` | KEEP | si | Formal Setup |
| `05_null_regime_absorbed.tex` | KEEP | si | Compatibility, Instability, and Forced Non-Nullity |
| `06_structural_classes_and_dynamics.tex` | KEEP | si | BaseCore Ownership and Downstream Boundary |
| `07_operational_criterion_absorbed.tex` | KEEP | si | Admissible Systems, Supports, and Histories |
| `08_claim_boundary_and_falsation.tex` | KEEP | si | Forensic Admissibility and Integrity Grammar |
| `09_canonical_ledgers.tex` | KEEP | si | Claim Boundary Ledger |
| `10_appendix_counterexamples.tex` | KEEP | si | Counterexamples for Necessity |
| `11_discrete_bridge.tex` | KEEP | si | From Node Networks to Hilbert Space Dynamics |

### `rigid-identity-framework/basecore/core_meta/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `basecore_formal_normalization_report.md` | REVIEW | no | BaseCore Formal Normalization Report |
| `claim_boundary_verification.md` | REVIEW | no | Claim Boundary Verification |
| `completion_decision.md` | REVIEW | no | Completion Decision |
| `deprecated_archived_file_ledger.md` | REVIEW | no | Replaced Active Structure |
| `deprecation_archive_plan.md` | REVIEW | no | Deprecated or superseded descriptions |
| `editorial_architecture_plan.md` | REVIEW | no | Editorial Architecture Plan |
| `file_consistency_audit.md` | REVIEW | no | File Consistency Audit |
| `file_tree_plan.md` | REVIEW | no | File Tree Plan |
| `final_residual_risk_list.md` | REVIEW | no | Final Residual Risk List |
| `final_verification_report.md` | REVIEW | no | Final Verification Report |
| `migration_and_merge_plan.md` | REVIEW | no | Absorb |
| `non_redundancy_audit.md` | REVIEW | no | Non-Redundancy Audit |
| `source_to_pdf_synchronization_note.md` | REVIEW | no | Source-to-PDF Synchronization Note |
| `target_table_of_contents.md` | REVIEW | no | # Target Table of Contents |

### `rigid-identity-framework/canonical_core_legacy/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CANONICAL_CORE.tex` [DUP] | KEEP | si | ============================================================================= |
| `README.md` | KEEP | no | Canonical Core Legacy Package |

### `rigid-identity-framework/canonical_core_legacy/source_snapshots/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CANONICAL_CORE.tex.v2f.bak.20260305T000625Z` | REVIEW | no |  |
| `CANONICAL_CORE.tex.v2f.bak.20260305T001422Z` | REVIEW | no |  |
| `CANONICAL_CORE.tex.v2f.bak.20260305T001649Z` [DUP] | REVIEW | no |  |

### `rigid-identity-framework/docs/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `ABLATION_MATRIX.md` | REVIEW | no | Ablation Matrix v1 |
| `ablation_matrix.v1.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, entries, v24_upgrade |
| `BRIDGE_HYPOTHESIS_LEDGER.md` | REVIEW | no | Bridge Hypothesis Ledger v40 |
| `CLAIM_STATUS_POLICY.md` | REVIEW | no | Claim Status Policy v1.1 |
| `EXTERNAL_REPLICATION_PROTOCOL_v2.md` | REVIEW | no | External Replication Protocol v2 |
| `FALSIFIER_MATRIX.md` | REVIEW | no | QICN Falsifier Matrix v1 |
| `FCR_SPEC.md` | REVIEW | no | QICN Formal Corpus Registry Specification |
| `MEASUREMENT_DICTIONARY_v1.md` | REVIEW | no | QICN Measurement Dictionary v1 |
| `NEGATIVE_CONTROL_SUITE.md` | REVIEW | no | QICN Negative Control Suite v1 |
| `NON_CLAIM_LEDGER_CANONICAL.md` | REVIEW | no | QICN Canonical Non-Claim Ledger v1 |
| `OPERATIONAL_TERM_PROMOTION_RULES.md` | REVIEW | no | Operational Term Promotion Rules v1 |
| `operational_term_promotion_rules.v1.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, promotion_levels, blocked_promotions, required_death_rule_fields, machine_audit_targets |
| `PREDICTION_REGISTRY_v1.json` | REVIEW | no | keys: schema_version, generated_for, date, scope, status_boundary, success_metric, threshold_policy, status_semantics |
| `PREREGISTRATION_TEMPLATE_v1.md` | REVIEW | no | QICN Preregistration Template v1 |
| `QICN_GLOSSARY.md` | REVIEW | no | QICN Glossary |
| `RALSI_REFERENCE.md` | REVIEW | no | RALSI.md Reference Stub |
| `RIVAL_MODEL_REGISTRY.md` | REVIEW | no | QICN Rival Model Registry v1 |
| `SEMANTIC_INFLATION_AUDIT_v40.md` | REVIEW | no | Semantic Inflation Audit v40 |
| `THEORY_CLAIM_LEDGER.md` | REVIEW | no | QICN Theory Claim Ledger v1 |
| `theory_dependency_graph.v1.json` | REVIEW | no | keys: schema_version, generated_at, boundary, registry_source, node_filter, summary, nodes, edges |

### `rigid-identity-framework/docs/ai-platform-outputs/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `IMPLEMENTATION_TRACE_LEDGER.md` | AI_OUTPUT | no | QICN Implementation Trace Ledger |
| `QICN_REFEREE_SUBMISSION_COVER.md` [UNTRACKED] | AI_OUTPUT | no | QICN — Referee Submission Cover |
| `QICN_REVIEWER_PACKAGE_2026-06.md` | AI_OUTPUT | no | QICN Reviewer Package 2026-06 |

### `rigid-identity-framework/docs/ai-platform-outputs/analysis/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `QICN_DEFIINT_TIGHTENING_PROPOSAL.md` | AI_OUTPUT | no | QICN def:iint Tightening Proposal |
| `QICN_H5_CONVEX_EXCLUSION_REDTEAM.md` | AI_OUTPUT | no | QICN H5 — Convex Geometric-Exclusion Red-Team |
| `QICN_H5_NONCOLLAPSE_CRITIQUE.md` | AI_OUTPUT | no | QICN H5 Noncollapse Critique |
| `QICN_IINT_APPROX_DICHOTOMY.md` | AI_OUTPUT | no | QICN Iint Approximate-Factorization Dichotomy |
| `QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md` | AI_OUTPUT | no | QICN Iint Canonical Factorization Class: Split-Readout Intermediate Class |
| `QICN_IINT_GLOBAL_QUANTIFIER_REDTEAM.md` | AI_OUTPUT | no | QICN Iint Global-Quantifier Red-Team (Internal Adversarial) |
| `QICN_S_INSTANCE_CONSTRUCTION.md` | AI_OUTPUT | no | QICN S-Instance Construction Attempt |
| `QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md` | AI_OUTPUT | no | QICN Coupled S-Instance Construction Attempt |
| `QICN_S_INSTANCE_GENUINENESS_CRITERIA.md` | AI_OUTPUT | no | QICN S-Instance Genuineness Criteria |

### `rigid-identity-framework/docs/ai-platform-outputs/audits/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `AUDIT_EXTERNAL_2026-06-10.md` | AI_OUTPUT | no | Auditoría Externa Profunda — QICN-FRAMEWORK |
| `REPO_HYGIENE_AUDIT_2026-06-13.md` | AI_OUTPUT | no | QICN-FRAMEWORK Repository Hygiene Audit |

### `rigid-identity-framework/docs/ai-platform-outputs/extractions/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `QICN_MONOLITHIC_2026-06-10.txt` [UNTRACKED] | AI_OUTPUT | no | ===== PAGE 1 ===== |

### `rigid-identity-framework/docs/ai-platform-outputs/formal/lean/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `.gitignore` | KEEP | no |  |
| `lake-manifest.json` | AI_OUTPUT | no | QICNLean |
| `lakefile.toml` | AI_OUTPUT | si | name = "QICNLean" |
| `lean-toolchain` | AI_OUTPUT | no |  |
| `QICNLean.lean` | KEEP | si |  |

### `rigid-identity-framework/docs/ai-platform-outputs/formal/lean/QICNLean/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `Basic.lean` | KEEP | si |  |
| `QICNAttractorCompact.lean` | KEEP | si |  |
| `QICNAttractorConcrete.lean` | KEEP | si |  |
| `QICNContraction.lean` | KEEP | si |  |
| `QICNConvexProjection.lean` | KEEP | si |  |
| `QICNCoupledSplitMargin.lean` | KEEP | si |  |
| `QICNCoupledSplitMarginUniversal.lean` | KEEP | si |  |
| `QICNH5Convex.lean` | KEEP | si |  |
| `QICNH5ConvexExclusion.lean` | KEEP | si |  |
| `QICNH5Derivation.lean` | KEEP | si |  |
| `QICNHilbertInstance.lean` | KEEP | si |  |
| `QICNNonCollapse.lean` | KEEP | si |  |
| `QICNRotationSpectral.lean` | KEEP | si |  |
| `QICNSCoupledInstance.lean` | KEEP | si |  |
| `QICNSInstance.lean` | KEEP | si |  |

### `rigid-identity-framework/docs/ai-platform-outputs/manuscript/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `MANUSCRIPT_DECISIONS.md` | AI_OUTPUT | no | Manuscript Decisions - BaseCore Short Paper Skeleton |
| `QICN_BASECORE_SHORT_PAPER_SKELETON.md` | AI_OUTPUT | no | QICN BaseCore Short Paper Skeleton |

### `rigid-identity-framework/docs/ai-platform-outputs/prompts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CODEX_CONSOLIDATE_ROADMAP_VIVO_PROMPT.md` | AI_OUTPUT | no | PROMPT CODEX — Iteración sobre ROADMAP.md existente (consolidación post-auditorías) |
| `CODEX_PHASE6_3D_RAW_SECOND_VARIABLE_SNR_CURVE_HONEST_ERROR_PROMPT.md` | AI_OUTPUT | no | PROMPT ONE-SHOT — Fase 6.3D (segunda variable cruda + curva recuperación-vs-SNR + métrica de error honesta con ruido) |

### `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `RECOVERY_MANIFEST.md` | AI_OUTPUT | no | Backup Noise Recovery Manifest |

### `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v18.tex` | KEEP | si | QICN v18 Internal Note: Product-Separator Counterexample and Conditional Closure of $I_{\mathrm{int |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v19.tex` | KEEP | si | QICN v19 Internal Note: Product-Separator Counterexample and Conditional Closure of \texorpdfstring{$I_{\mathrm{int |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex` | KEEP | si | QICN v20 Internal Note: Product-Separator Counterexample and Conditional Closure of \texorpdfstring{$I_{\mathrm{int |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v21.tex` | KEEP | si | QICN v21 Internal Note: Independent Finite Separator-Complete Incidence Package and Conditional Closure of \texorpdfstring{$I_{\mathrm{int |
| `I_INT_ATOMIC_SEPARATOR_CLOSURE_v22.tex` | KEEP | si | QICN v22 Internal Note: Independent Finite Separator-Complete Incidence Package and Conditional Closure of \texorpdfstring{$I_{\mathrm{int |

### `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/pred-ext-01-provenance/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `rehearsal_run_001_decision_record.json` | AI_OUTPUT | no | keys: schema_version, prediction_id, run_id, date_executed, status, verdict, boundary, observable |
| `v2_cleanroom_synthetic_001_decision_record.json` | AI_OUTPUT | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |

### `rigid-identity-framework/docs/ai-platform-outputs/recovery-candidates/paper3-bifurcation-2026-06-03/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main-3.extracted.txt` | AI_OUTPUT | no | ===== PAGE 1 ===== |
| `main.extracted.txt` | AI_OUTPUT | no | ===== PAGE 1 ===== |

### `rigid-identity-framework/docs/ai-platform-outputs/reports/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `AUDITORIA_GENERAL_MONOLITICO_CORPUS_v1.md` | AI_OUTPUT | no | Auditoria General del Corpus QICN con Enfasis en el Monolito |
| `INVENTORY_TRACEABILITY_2026-06-21.json` [UNTRACKED] | AI_OUTPUT | no | keys: projectRoot, generatedAt, totalFiles, bucketCount, duplicateGroups, texRoots, leanRoots, nodeRoots |
| `INVENTORY_TRACEABILITY_2026-06-21.md` [UNTRACKED] | AI_OUTPUT | no | QICN — Inventario y Trazabilidad de Archivos |
| `model_cards.basecore.json` | AI_OUTPUT | no | keys: artifact_type, schema_status, canonical, date, scope, human_review, human_curated_cards, allowed_epistemic_states |
| `QICN_BACKUP_NOISE_RECOVERY_AUDIT_v1.md` | AI_OUTPUT | no | QICN Backup Noise Recovery Audit v1 |
| `QICN_BIFURCATION_CLOSURE_REPORT_v1.md` | AI_OUTPUT | no | QICN Bifurcation Closure Report v1 |
| `QICN_BRIDGE_SOURCE_RECOVERY.md` | AI_OUTPUT | no | QICN Bridge Source Recovery |
| `QICN_DEFIINT_PHASE24_REPORT.md` | AI_OUTPUT | no | QICN def:iint Phase-2/4 Report |
| `QICN_EVIDENCE_SURFACE_AND_OPEN_GAPS.md` | AI_OUTPUT | no | QICN Evidence Surface and Open Gaps |
| `QICN_FOLDER_HYGIENE_AUDIT_v1.md` | AI_OUTPUT | no | QICN Folder Hygiene Audit v1 |
| `QICN_GAP_I_INT_ATOMIC_SEPARATOR_MODEL_CARD.md` | AI_OUTPUT | no | QICN Gap Model Card: I_int / Atomic Separator |
| `QICN_HUMAN_REVIEWER_GAP_PACKAGE_INDEX.md` | AI_OUTPUT | no | QICN Human Reviewer Gap Package Index |
| `QICN_LEAN_PILOT_REPORT.md` | AI_OUTPUT | no | QICN Lean Pilot Report |
| `QICN_LITERATURE_CONFRONTATION_GAP.md` | AI_OUTPUT | no | QICN Literature Confrontation Gap |
| `QICN_MONOLITHIC_REBUILD_AFTER_PAPER3_4_6_REPORT_v1.md` | AI_OUTPUT | no | QICN Monolithic Rebuild After Paper 3/4/6 Updates v1 |
| `QICN_PAPER3_EXTENSION_AND_SOURCE_STATUS_v1.md` | AI_OUTPUT | no | QICN Paper 3 Extension and Source Status v1 |
| `QICN_PAPER4_PAPER6_EXTENSION_REPORT_v1.md` | AI_OUTPUT | no | QICN Paper 4 and Paper 6 Extension Report v1 |
| `QICN_PASADA_A_FLOATING_FILES_AND_PUSH_AUDIT.md` | AI_OUTPUT | no | QICN Pasada A - Floating Files and Push Audit |
| `QICN_PHASE7_QICN_INSTANTIATION_AND_NONCIRCULARITY.md` | AI_OUTPUT | no | QICN Phase 7 Atomicity Truth and Connected-Incidence Audit |
| `QICN_PHASE7_REAL_RIVAL_PROFILES.md` | AI_OUTPUT | no | QICN Phase 7 Real Rival Profiles |
| `QICN_RELATED_WORK_DRAFT.md` | AI_OUTPUT | no | QICN Related-Work Draft |
| `QICN_REPO_HYGIENE_INVENTORY_2026-06-18.md` | AI_OUTPUT | no | QICN Repo Hygiene Inventory (2026-06-18) |
| `QICN_RETROINDUCTION_OPTIMAL_CONTROL_DRAFT.md` | AI_OUTPUT | no | QICN Retro-Induction as Optimal Control Draft |
| `QICN_ROADMAP_PHASE7_GENUINE_PLAN.md` | AI_OUTPUT | no | QICN Roadmap Phase 7 Genuine Rival Plan |
| `QICN_ROADMAP_V3_PHASE0_BASELINE.md` | AI_OUTPUT | no | QICN Roadmap Principal / v3 - Phase 0 Baseline |
| `QICN_ROADMAP_V3_PHASE1_AUDIT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 1 Audit |
| `QICN_ROADMAP_V3_PHASE2_CLOSURE_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Closure Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION1_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 1 Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION2_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 2 Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION3_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 3 Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION4_OWNERSHIP_AUDIT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 4 Ownership Audit |
| `QICN_ROADMAP_V3_PHASE2_ITERATION4B_PAPER2_NORMALIZATION_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 4B Paper 2 Normalization Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION5A_PAPER1_3_OPENINGS_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 5A Paper 1 and Paper 3 Openings Report |
| `QICN_ROADMAP_V3_PHASE2_ITERATION5B_PAPER8_9_HIGH_RISK_OPENINGS_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 2 Iteration 5B Paper 8 and Paper 9 High-Risk Openings Report |
| `QICN_ROADMAP_V3_PHASE3_ITERATION1_LANGUAGE_ALIAS_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 3 Iteration 1 Language Alias Report |
| `QICN_ROADMAP_V3_PHASE3_ITERATION2_PAPER7_ALIAS_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 3 Iteration 2 Paper 7 Alias Report |
| `QICN_ROADMAP_V3_PHASE4_ITERATION1_MATH_HARDENING_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 4 Iteration 1 Mathematical Hardening Report |
| `QICN_ROADMAP_V3_PHASE4_ITERATION2_PAPER2_MATH_HARDENING_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 4 Iteration 2 Paper 2 Mathematical Hardening Report |
| `QICN_ROADMAP_V3_PHASE4_ITERATION3_PAPER5_IMPORT_LANGUAGE_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 4 Iteration 3 Paper 5 Import-Language Hardening Report |
| `QICN_ROADMAP_V3_PHASE4_ITERATION4_PAPER8_9_HIGH_RISK_SEMANTIC_AUDIT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 4 Iteration 4 |
| `QICN_ROADMAP_V3_PHASE4_ITERATION5_ONE_SHOT_PAPER8_9_HARDENING_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 4 Iteration 5 |
| `QICN_ROADMAP_V3_PHASE6_2B_HOT_BIBLIOGRAPHY_SEED.bib` | ORPHAN_CANDIDATE | no | % QICN Roadmap v3 - Phase 6.2B HOT Minimal Bibliography Seed |
| `QICN_ROADMAP_V3_PHASE6_3_CLOSE_CONSOLIDATION_AND_CEILING.md` | AI_OUTPUT | no | QICN Roadmap v3 Phase 6.3-CLOSE Consolidation and Synthetic Ceiling |
| `QICN_ROADMAP_V3_PHASE6_3A_PREDICTION_REGISTRY_PROPOSAL.json` | AI_OUTPUT | no | keys: proposal_status, integration_status, protocol_id, registry_target, proposed_prediction |
| `QICN_ROADMAP_V3_PHASE6_3A_PREREGISTERED_PROTOCOL.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3A Preregistered Comparator Protocol |
| `QICN_ROADMAP_V3_PHASE6_3B_DISCRIMINATION_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3B Discrimination Report |
| `QICN_ROADMAP_V3_PHASE6_3B1_QICN_PRIMITIVE_OPERATIONALIZATION.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3B-1 Candidate Operationalization of Paper 8 Primitives |
| `QICN_ROADMAP_V3_PHASE6_3B1_TRACE_SCHEMA.json` | AI_OUTPUT | no | keys: $schema, title, schema_version, status, human_review, human_curated_status, boundary, required_top_level |
| `QICN_ROADMAP_V3_PHASE6_3C_POWER_AND_BORDERLINE_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3C Power and Borderline Simulation Report |
| `QICN_ROADMAP_V3_PHASE6_3C_RAW_SELFLOCUS_TRACE_SCHEMA.json` | AI_OUTPUT | no | keys: $schema, title, schema_version, status, human_review, human_curated_status, boundary, information_boundary |
| `QICN_ROADMAP_V3_PHASE6_3C_SELFLOCUS_EXTRACTOR.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3C Self-Locus Extractor |
| `QICN_ROADMAP_V3_PHASE6_3D_CONTFIELD_EXTRACTOR.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3D ContField Extractor |
| `QICN_ROADMAP_V3_PHASE6_3D_RAW_CONTFIELD_TRACE_SCHEMA.json` | AI_OUTPUT | no | keys: $schema, title, schema_version, status, human_review, human_curated_status, boundary, abstraction_boundary |
| `QICN_ROADMAP_V3_PHASE6_3D_SNR_AND_HONEST_ERROR_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3D SNR and Honest Error Report |
| `QICN_ROADMAP_V3_PHASE6_3E_OFIA_EXTRACTOR.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.3E OFIA Raw Extractor |
| `QICN_ROADMAP_V3_PHASE6_3E_RAW_OFIA_TRACE_SCHEMA.json` | AI_OUTPUT | no | keys: $schema, $id, title, type, additionalProperties, required, properties |
| `QICN_ROADMAP_V3_PHASE6_3F_CALIBRATION_SENSITIVITY_AND_CEILING_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 Phase 6.3F Calibration, Sensitivity, SPOF, and Synthetic Ceiling |
| `QICN_ROADMAP_V3_PHASE6_3NR_CONSTRUCT_NONREDUNDANCY.md` | AI_OUTPUT | no | QICN Roadmap v3 Phase 6.3-NR Construct Non-Redundancy |
| `QICN_ROADMAP_V3_PHASE6_ITERATION2_CLAIM_TO_RIVAL_MAPPING.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6.2 Claim-to-Rival Mapping |
| `QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md` | AI_OUTPUT | no | QICN Roadmap v3 - Phase 6 Rival/Comparator Limited Inventory |
| `QICN_ROADMAP_V3_PHASE9_BASECORE_MODEL_CARDS.md` | AI_OUTPUT | no | QICN Roadmap v3 Phase 9 - BaseCore Model Cards |
| `QICN_ROADMAP_V3_POST_ITERATION3_MONOLITHIC_SYNC_REPORT.md` | AI_OUTPUT | no | QICN Roadmap v3 - Post-Iteration 3 Monolithic Sync Report |

### `rigid-identity-framework/docs/ai-platform-outputs/sims/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `qicn_phase6_3b_discrimination_sim.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase6_3b_hot_model.js` | KEEP | si | "use strict"; |
| `qicn_phase6_3c_power_sim.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase6_3c_selflocus_extractor.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase6_3close_coupled_gate.js` | KEEP | si | "use strict"; |
| `qicn_phase6_3d_contfield_extractor.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase6_3d_power_sim.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase6_3e_ofia_extractor.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase6_3e_power_sim.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase6_3f_calibration_sensitivity_ceiling.js` | KEEP | si | "use strict"; |
| `qicn_phase6_3nr_construct_nonredundancy.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase7_gwt_broadcast_model.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase7_neutral_systems_bank_v2.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_neutral_systems_bank.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_pyphi_wrapper.py` | AI_OUTPUT | no | !/usr/bin/env python |

### `rigid-identity-framework/docs/ai-platform-outputs/sims/phase7/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `phase7_run_all.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase7_atomicity_ground_truth.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_gnw_principles_detector.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_holdout_bank.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_label_permutation_invariance.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `qicn_phase7_phi_positive_control_bank.js` | KEEP | si | !/usr/bin/env node |
| `qicn_phase7_qicn_candidate_noncircularity.js` | KEEP | si | !/usr/bin/env node |
| `REPRODUCIBILITY.md` | AI_OUTPUT | no | Phase 7 Reproducibility |
| `requirements.txt` | AI_OUTPUT | no | colorama==0.4.6 |

### `rigid-identity-framework/docs/ai-platform-outputs/sims/phase7/results/latest/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `phase7_bank_v2.json` | AI_OUTPUT | no | keys: artifact, status, version, seed, n_range, families, v1_preservation_note, limits |
| `phase7_gnw_principles_results.json` | AI_OUTPUT | no | keys: artifact, status, model_id, bank_version, literature_anchors, results |
| `phase7_holdout_generalization.json` | AI_OUTPUT | no | keys: artifact, status, model_id, human_review, human_curated_status, bank_digest, seed, system_count |
| `phase7_phi_positive_control_bank.json` | AI_OUTPUT | no | keys: artifact, status, model_id, version, seed, additive_policy, systems, no_claims |
| `phase7_phi_positive_control_pyphi_results.json` | AI_OUTPUT | no | keys: artifact, max_n, model_id, pyphi_available, pyphi_version, results, status |
| `phase7_pyphi_results.json` | AI_OUTPUT | no | keys: artifact, max_n, model_id, pyphi_available, pyphi_version, results, status |
| `phase7_qicn_candidate_noncircularity.json` | AI_OUTPUT | no | keys: artifact, status, model_id, candidate_id, human_review, human_curated_status, reviewer_burden, operationalization |
| `phase7_run_manifest.json` | AI_OUTPUT | no | keys: artifact, status, runner_id, deterministic_run_digest, cwd, python, output_dir_policy, artifacts |

### `rigid-identity-framework/docs/ai-platform-outputs/sims/retroinduction/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `qicn_retroinduction_toy.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |

### `rigid-identity-framework/docs/fixtures/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v25.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_sha256, dataset_origin, adjudicator |
| `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_path, dataset_sha256, dataset_origin |
| `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27_BRIDGE_H2_H4_COMPLETION.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_path, dataset_sha256, dataset_origin |
| `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_path, dataset_sha256, dataset_origin |
| `EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v34.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_path, dataset_sha256, dataset_origin |
| `SESSION_ZERO_SYNTHETIC_DATASET_v26.json` | REVIEW | no | keys: schema_version, dataset_id, status, governance_boundary, measurement_points, exclusion_log |
| `SESSION_ZERO_SYNTHETIC_DATASET_v27.json` | REVIEW | no | keys: schema_version, dataset_id, status, governance_boundary, measurement_points, exclusion_log |
| `SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json` | REVIEW | no | keys: schema_version, bundle_id, status, governance_boundary, frozen_timestamp_utc, generation_protocol, frozen_before_outcome_analysis, predictions |
| `SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v27.json` | REVIEW | no | keys: schema_version, bundle_id, status, governance_boundary, frozen_timestamp_utc, generation_protocol, frozen_before_outcome_analysis, predictions |
| `TRUSTED_KEYS_REGISTRY_v27.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, trusted_keys, production_note |
| `TRUSTED_KEYS_REGISTRY_v28_selftest.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, trusted_keys, used_replay_protection_entries, production_note |

### `rigid-identity-framework/docs/measurement_specs/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `I_leg_spec_v1.md` | REVIEW | no | I_leg Measurement Specification v1 |
| `I_per_spec_v1.md` | REVIEW | no | I_per Measurement Specification v1 |
| `RUNTIME_BINDING_GAP.md` | REVIEW | no | Runtime Binding Gap Map v1 |

### `rigid-identity-framework/docs/preregistrations/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `PRED-01_prereg_v0.md` | REVIEW | no | PRED-01 Preregistration v0 |
| `PRED-02_freeze_v1.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, delta_amb |
| `PRED-02_freeze_v2.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, seed |
| `PRED-02_prereg_v0.md` | REVIEW | no | PRED-02 Preregistration v0 |
| `PRED-02_prereg_v1.md` | REVIEW | no | PRED-02 Preregistration v1 |
| `PRED-02_prereg_v2.md` | REVIEW | no | PRED-02 Preregistration v2 |
| `PRED-03_prereg_v0.md` | REVIEW | no | PRED-03 Preregistration v0 |
| `PRED-04a_prereg_v0.md` | REVIEW | no | PRED-04a Preregistration v0 |
| `PRED-04b_prereg_v0.md` | REVIEW | no | PRED-04b Preregistration v0 |
| `PRED-04c_freeze_v2.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, eps_equiv |
| `PRED-04c_freeze_v3.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, seed |
| `PRED-04c_prereg_v1.md` | REVIEW | no | Preregistration PRED-04c v1 |
| `PRED-04c_prereg_v2.md` | REVIEW | no | PRED-04c Preregistration v2 |
| `PRED-04c_prereg_v3.md` | REVIEW | no | PRED-04c Preregistration v3 |
| `PRED-05_prereg_v0.md` | REVIEW | no | PRED-05 Preregistration v0 |
| `PRED-06_prereg_v1.md` | REVIEW | no | Preregistration PRED-06 v1 |
| `PRED-07_prereg_v0.md` | REVIEW | no | PRED-07 Preregistration v0 |
| `PRED-08_prereg_v0.md` | REVIEW | no | PRED-08 Preregistration v0 |
| `PRED-09_prereg_v0.md` | REVIEW | no | PRED-09 Preregistration v0 |
| `PRED-10_prereg_v0.md` | REVIEW | no | PRED-10 Preregistration v0 |
| `PRED-11_freeze_v1.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, integration_loss_boundary |
| `PRED-11_freeze_v2.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, seed |
| `PRED-11_prereg_v0.md` | REVIEW | no | Preregistration PRED-11 v0 |
| `PRED-11_prereg_v1.md` | REVIEW | no | PRED-11 Preregistration v1 |
| `PRED-11_prereg_v2.md` | REVIEW | no | PRED-11 Preregistration v2 |
| `PRED-EXT-01_freeze_v1.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, state_alphabet |
| `PRED-EXT-01_freeze_v2.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, state_alphabet |
| `PRED-EXT-01_freeze_v3.json` | REVIEW | no | keys: schema_version, prediction_id, freeze_id, date_frozen, status, execution_class, boundary, state_alphabet |
| `PRED-EXT-01_prereg_v0.md` | REVIEW | no | PRED-EXT-01 Preregistration v0 |
| `PRED-EXT-01_prereg_v1.md` | REVIEW | no | PRED-EXT-01 Preregistration v1 |
| `PRED-EXT-01_prereg_v2.md` | REVIEW | no | PRED-EXT-01 Preregistration v2 |
| `PRED-EXT-01_prereg_v3.md` | REVIEW | no | PRED-EXT-01 Preregistration v3 |

### `rigid-identity-framework/docs/prompts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CODEX_v39_SEPARATION_PROMPT.md` | REVIEW | no | CODEX v39 MEGA-PROMPT |
| `CODEX_v40_AUDITORIA_FRIA_MARCO_Y_RUNTIME.md` | REVIEW | no | CODEX PROMPT — AUDITORÍA EN FRÍO: MARCO TEÓRICO + RUNTIME (v40) |
| `CODEX_v40_GLOBAL_ROADMAP_PROMPT.md` | REVIEW | no | CODEX v40 MEGA-PROMPT |
| `QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md` | REVIEW | no | QICN-SYSTEM META-PROMPT v36 |

### `rigid-identity-framework/docs/protocols/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md` | REVIEW | no | AIC Parameter Derivation Protocol v25 |
| `CONTINUOUS_TO_DISCRETE_BRIDGE_BURDEN_v24.md` | REVIEW | no | Continuous-to-Discrete Bridge Burden v24 |
| `EXTERNAL_ABLATION_EXECUTION_PROTOCOL_v25.md` | REVIEW | no | External Ablation Execution Protocol v25 |
| `EXTERNAL_EMPIRICAL_CAMPAIGN_MINIMAL.md` | REVIEW | no | External Empirical Campaign Minimal Protocol |
| `EXTERNAL_SESSION_ZERO_ADJUDICATION_PROTOCOL_v23.md` | REVIEW | no | External Session Zero Adjudication Protocol v23 |
| `HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md` | REVIEW | no | Human Veto Signature Protocol v26 |
| `HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md` | REVIEW | no | Human Veto Traceability Protocol v25 |
| `INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md` | REVIEW | no | Independent Separator Catalog Construction Protocol v22 |
| `PRED_EXT_01_HOLDOUT_BLINDING_PROTOCOL_v22.md` | REVIEW | no | PRED-EXT-01 Holdout Blinding Protocol v22 |
| `PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md` | REVIEW | no | Projection-Invariant Bridge Theorem v25 |
| `REAL_RIVAL_ENGAGEMENT_PROTOCOL_v24.md` | REVIEW | no | Real Rival Engagement Protocol v24 |
| `REAL_RIVAL_EXECUTION_REQUIREMENTS_v25.md` | REVIEW | no | Real Rival Execution Requirements v25 |
| `STAGE_3_7_OPENING_CRITERIA.v1.md` | REVIEW | no | Stage 3-7 Opening Criteria v1 |
| `THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md` | REVIEW | no | Threshold Calibration and Death Rules v25 |

### `rigid-identity-framework/docs/reports/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `ADVERSARIAL_NEGATIVE_CONTROL_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, execution_class, status, support_blocked, freeze_id, seeds, seed_results |
| `ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md` | REVIEW | no | Adversarial Negative Control Report |
| `AR1_CORRECTION_CLINICAL_SUMMARY_v28.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, title, executive_summary, quantitative_comparison, root_cause_analysis, mutual_information_comparison |
| `AR1_CORRECTION_CLINICAL_SUMMARY_v28.md` | REVIEW | no | AR(1) Correction Clinical Summary v28 |
| `ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md` | REVIEW | no | Atomic Separator Lemma Attempt |
| `AUDIT_DEPLOYMENT_v26.json` | REVIEW | no | keys: phase, generated_at, npm_verify_v26, reports_generated, hash_cross_verification, governance_boundaries_ok, external_support_blocked, issues_found |
| `AUDIT_v27.json` | REVIEW | no | keys: phase, generated_at, gap_verification, npm_verify_v27, npm_verify_v26_still_passes, adjudication_v27, regressions, score |
| `AXIOM_RESOLUTION_DECISION.md` | REVIEW | no | Axiom Environment Resolution Decision v1 |
| `CLAIM_LEDGER_SNAPSHOT.json` | REVIEW | no | keys: schema_version, generated_at, source, source_sha256, status_boundary, entries |
| `CODEX_IMPLEMENTATION_AUDIT_DEEP.md` | REVIEW | no | QICN Codex Implementation Audit — ULTRATHINK Deep Analysis |
| `CODEX_V37_IMPLEMENTATION_REPORT.md` | REVIEW | no | CODEX v37 IMPLEMENTATION REPORT |
| `CODEX_V39_QUARANTINE_IMPORT_REPORT.md` | REVIEW | no | CODEX v39 QUARANTINE IMPORT REPORT |
| `CODEX_V39_SEPARATION_PREFLIGHT_REPORT.md` | REVIEW | no | CODEX v39 SEPARATION PREFLIGHT REPORT |
| `CORPUS_HEALTH_REPORT.md` | REVIEW | no | Corpus Health Report |
| `DEPENDENCY_GRAPH.dot` | REVIEW | no |  |
| `DEPLOYMENT_LOG_v26.json` | REVIEW | no | keys: phase, generated_at, files_deployed, package_json_updated, total_files, successful, failed, repair_notes |
| `EPISTEMIC_RISK_HEATMAP.md` | REVIEW | no | Epistemic Risk Heatmap |
| `EXTERNAL_PREDICTION_CANDIDATES.md` | REVIEW | no | External Prediction Candidates v1 |
| `EXTRACTOR_REPRODUCIBILITY_AUDIT.md` | REVIEW | no | Extractor Reproducibility Audit v1 |
| `EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md` | REVIEW | no | Extractor Reproducibility Diagnostic |
| `FCR_DOWNGRADE_DRY_RUN_v26.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, input_report, report_hash_verification, provenance_verification, verdict, registry_modified |
| `FCR_DOWNGRADE_DRY_RUN_v26.md` | REVIEW | no | FCR Downgrade Dry Run v26 |
| `FINAL_EXECUTIVE_REPORT_v27.md` | REVIEW | no | QICN v27 - Final Executive Report |
| `FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_AUDIT.json` | REVIEW | no | keys: schema_version, generated_at, gate, governance_boundary, verified_v21_gaps_closed, positive_package_path, negative_control_path, positive |
| `FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_REPORT.md` | REVIEW | no | Finite Separator-Complete Incidence Package v22 Audit Report |
| `FORMAL_METHODS_REVIEW_PROTOCOL.md` | REVIEW | no | Formal Methods Review Protocol v1 |
| `FULL_MODIFIED_TEXT_FILE_CONTENTS_v26.md` | REVIEW | no | Full Modified Text File Contents v26 |
| `GAP_CLOSURE_STATUS_v31.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, gaps, result, external_support_certified |
| `GENERATOR_INDEPENDENCE_AUDIT.md` | REVIEW | no | Generator Independence Audit |
| `GIT_BRANCH_HYGIENE_AUDIT.md` | REVIEW | no | Git Branch Hygiene Audit |
| `HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json` | REVIEW | no | keys: schema_version, governance_boundary, test_vector_not_human_review, result, verification |
| `HUMAN_VETO_SIGNATURE_SELF_TEST_v27.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, trusted_keys_registry_path, trusted_keys_registry_sha256, registered_key_verification, unregistered_key |
| `HUMAN_VETO_SIGNATURE_SELF_TEST_v27.md` | REVIEW | no | Human Veto Signature Self-Test v27 |
| `HUMAN_VETO_SIGNATURE_SELF_TEST_v28.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, immutable_registry, temp_registry_path, temp_registry_sha256, registered_key_verification |
| `HUMAN_VETO_SIGNATURE_SELF_TEST_v28.md` | REVIEW | no | Human Veto Signature Self-Test v28 |
| `HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md` | REVIEW | no | HYBRID V26 AUDIT IMPLEMENTATION REPORT |
| `HYBRID_V26_V27_ULTRATHINK_PLAN.md` | REVIEW | no | QICN v26/v27 Hybrid ULTRATHINK Plan |
| `HYBRID_V26_VERIFICATION.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, commands, v26_session_zero_summary, v26_gap_audit_result, v26_promotion_audit_result, v26_threshold_cal |
| `I_INT_CURATION_OVERLAY_v1.json` | REVIEW | no | keys: schema_version, date, status, boundary, overlays |
| `I_INT_FACTORIZATION_CATEGORY_SPEC.md` | REVIEW | no | I_int Factorization Category Specification v1 |
| `I_INT_FACTORIZATION_LEMMA_DRAFT.tex` | KEEP | si | \section*{Draft Lemma: Factorization Triviality for \(I_{\mathrm{int}}\)} |
| `I_INT_FORMAL_BURDEN_REVIEW.md` | REVIEW | no | I_int Formal Burden Review v1 |
| `I_INT_STATUS_UPDATE.md` | REVIEW | no | I_int Status Update |
| `IMPLEMENTATION_LOG_v27.json` | REVIEW | no | keys: phase, generated_at, gaps_addressed, new_files_created, npm_verify_v27, score, implementation_boundary |
| `INITIAL_STATE_AUDIT_v26_v27.json` | REVIEW | no | keys: phase, generated_at, governance_boundary, predeployment_findings, directories_created_or_confirmed, initial_status |
| `MACRO_COLLISION_REPORT.md` | REVIEW | no | Macro Collision Report |
| `MONOLITHIC_BUILD_QUALITY_GATE_v20.json` | REVIEW | no | keys: schema_version, generated_at, gate, governance_boundary, log_path, checks, detail, result |
| `MONOLITHIC_BUILD_REPORT.md` | REVIEW | no | Monolithic Build Report v2 |
| `MONOLITHIC_COMPILE_RISK_AUDIT.md` | REVIEW | no | Monolithic Compilation Risk Audit v1 |
| `MONOLITHIC_PDF_POLISH_EVIDENCE.json` | REVIEW | no | keys: artifact, timestamp_utc, pdf_pages, pdf_sha256, build_script_sha256, question_mark_reference_tokens, warning_counts, commands_verified |
| `MONOLITHIC_PDF_POLISH_REPORT.md` | REVIEW | no | Monolithic PDF Polish Report v2 |
| `NEGATIVE_CONTROL_SUITE_v30.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, fixture, cases, result, external_support_certified |
| `NEGATIVE_CONTROL_SUITE_v30.md` | REVIEW | no | Negative Control Suite v30/v31 |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, rules_file, semantic_gate, scanned_files, findings, failures |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v26.md` | REVIEW | no | Operational Term Promotion Audit v26 |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v27.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, sentence_segmentation_method, disclaimer_propagation_window, target_count, scans, self_tests |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v27.md` | REVIEW | no | Operational Term Promotion Audit v27 |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v28.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, sentence_segmentation_method, disclaimer_propagation_window, promotion_regex_version, targ |
| `OPERATIONAL_TERM_PROMOTION_AUDIT_v28.md` | REVIEW | no | Operational Term Promotion Audit v28 |
| `PAPER8_COORDINATE_CONSTRUCTIVE_SPEC.md` | REVIEW | no | Paper 8 Coordinate Constructive Specification v1 |
| `PAPER9_BRIDGE_BURDEN_NARROWING.md` | REVIEW | no | Paper 9 Bridge Burden Narrowing v1 |
| `POST_PATCH_BASELINE_REPORT.md` | REVIEW | no | Post-Patch Baseline Report (pre-modification snapshot) |
| `POST_PATCH_VERIFICATION_REPORT.md` | REVIEW | no | Post-Patch Verification Report |
| `PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |
| `PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |
| `PRED_11_INTERNAL_EXECUTION_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |
| `PRED_EXT_01_CLEANROOM_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |
| `PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json` | REVIEW | no | keys: schema_version, prediction_id, run_id, date_executed, execution_class, status, verdict, boundary |
| `PREDICTION_CANON_RECONCILIATION.md` | REVIEW | no | Prediction Canon Reconciliation v1 |
| `PREREGISTRATION_COVERAGE_MATRIX.md` | REVIEW | no | Preregistration Coverage Matrix v4 |
| `PROMOTION_RULE_VALIDATION_v30.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, audit_script, source_checks, self_tests, result, external_support_certified |
| `PROMOTION_RULE_VALIDATION_v30.md` | REVIEW | no | Promotion Rule Validation v30 |
| `QICN_BASELINE_v40.md` | REVIEW | no | QICN v40 Baseline |
| `QICN_CRITICAL_GAPS_AUDIT.md` | REVIEW | no | Auditoría de Gaps Críticos y Desafíos Pendientes - QICN Framework |
| `QICN_GLOBAL_ROADMAP_v40.md` | REVIEW | no | QICN v40 Global Roadmap |
| `QICN_HARDENING_PROMPT_v30.md` | REVIEW | no | QICN v30 Hardened Theory: Bottom-Up Engineering Prompt & Hardening Roadmap |
| `QICN_THEORY_FALSIFIABILITY_ROADMAP.md` | REVIEW | no | QICN Theory Falsifiability Roadmap |
| `QICN_V30_V31_HYBRID_AUDIT_AND_IMPLEMENTATION_REPORT.md` | REVIEW | no | QICN v30/v31 Hybrid Audit and Implementation Report |
| `QICN_V32_IMPLEMENTATION_REPORT.md` | REVIEW | no | QICN v32 - Implementation and Audit Report |
| `QICN_V32_REPORTE_DE_IMPLEMENTACION_Y_AUDITORIA.md` | REVIEW | no | QICN v32 - Reporte de Implementación y Auditoría |
| `QICN_V33_AUDITORIA_DE_INTEGRACION_CODEX.md` | REVIEW | no | Reporte de Auditoría y Análisis de Integración - QICN v33 |
| `QICN_V33_IMPLEMENTATION_REPORT.md` | REVIEW | no | QICN v33 Implementation Report |
| `QICN_V34_L4_ESTIMATOR_GAP_CLOSURE_REPORT.md` | REVIEW | no | QICN v34 - L4 Estimator Gap Closure Report |
| `QICN_V35_VERSION_CENTRALIZATION_PREFLIGHT.md` | REVIEW | no | QICN v35 Version Centralization Preflight |
| `QICN_V35_VERSION_CENTRALIZATION_REPORT.md` | REVIEW | no | QICN v35 Version Centralization Report |
| `QICN_V40_AUDITORIA_FRIA_MARCO_Y_RUNTIME.md` | REVIEW | no | 1. Resumen ejecutivo (10 líneas) |
| `QICN_V40_OPENCODE_CROSS_AUDIT_GAP_CLOSURE_REPORT.md` | REVIEW | no | QICN v40 OpenCode Cross-Audit and Gap Closure Report |
| `QICN_V40_PHASE1_INFERIOR_INSTRUMENT_REPORT.md` | REVIEW | no | QICN v40 Phase 1 Inferior Instrument Report |
| `QICN_V40_PHASE2_BRIDGE_HYPOTHESIS_REPORT.md` | REVIEW | no | QICN v40 Phase 2 Bridge Hypothesis Report |
| `QICN_V40_PHASE3_STATISTICAL_NONCLAIMS_REPORT.md` | REVIEW | no | QICN v40 Phase 3 Statistical Non-Claims Report |
| `QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md` | REVIEW | no | QICN v40 Phase 5 Final Closure Report |
| `QICN_V40_PHASE5_PDF_REPRODUCIBILITY_STATUS.md` | REVIEW | no | QICN v40 Phase 5 PDF Reproducibility Status |
| `QICN_V40_PHASE5A_AUDIT_AND_INVENTORY_REPORT.md` | REVIEW | no | QICN v40 Phase 5A Audit and Inventory Report |
| `QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md` | REVIEW | no | QICN v40 Phase 5B PDF Hygiene and Transversal Audit Report |
| `QICN_V40_PHASE5D_WORKSPACE_CHANGE_CLASSIFICATION_REPORT.md` | REVIEW | no | QICN v40 Phase 5D Workspace Change Classification Report |
| `REGISTRY_CURATION_BATCH_001.md` | REVIEW | no | Registry Curation Batch 001 |
| `REGISTRY_CURATION_BATCH_002_HUMAN_REVIEW.md` | REVIEW | no | Registry Curation Batch 002: Human Mathematical Review |
| `REGISTRY_CURATION_BATCH_002_INDEX.json` | REVIEW | no | keys: schema_version, batch_id, status, date, selected_count, selected_ids |
| `REGISTRY_CURATION_BATCH_002_SUPERSEDED_NOTE.md` | REVIEW | no | Registry Curation Batch 002 Superseded Note |
| `REGISTRY_CURATION_BATCH_003_HUMAN_REVIEW_SCAFFOLD.md` | REVIEW | no | Registry Curation Batch 003: Human Review Scaffold |
| `REGISTRY_CURATION_BATCH_003_INDEX.json` | REVIEW | no | keys: schema_version, batch_id, status, date, selected_count, selected_ids, source_registry, boundary |
| `REGISTRY_CURATION_PROTOCOL.md` | REVIEW | no | Registry Curation Protocol v1 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json` | REVIEW | no | keys: schema_version, generated_at, runner, runner_version, manifest_id, manifest_status, governance_boundary, external_support_certified |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md` | REVIEW | no | External Session Zero Adjudication v25 Report |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, input_manifest, validation_summary, provenance, counts, effect_estimate |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md` | REVIEW | no | Session Zero Adjudication v26 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, validation_summary, counts, effect_estimate, model_comparison, leakage_adjudication |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.md` | REVIEW | no | Session Zero Adjudication v27 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v28.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, validation_summary, counts, effect_estimate, model_comparison |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v28.md` | REVIEW | no | Session Zero Adjudication v28 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, legacy_v27_mode, validation_summary, counts, effect_estimate |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.md` | REVIEW | no | Session Zero Adjudication v30 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, input_manifest, v30_verdict, v30_blocking_reasons, foundation_checks |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.md` [DUP] | REVIEW | no | Session Zero Adjudication v31 |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v34.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, strict_mode, input_manifest, v30_verdict, v30_blocking_reasons, foundation_checks |
| `SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v34.md` [DUP] | REVIEW | no | Session Zero Adjudication v31 |
| `SUPERIOR_GAP_AUDIT_CURRENT.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, checks, result, external_support_certified |
| `THEOREM_ATLAS.md` | REVIEW | no | QICN Theorem Atlas |
| `THEORY_DEPENDENCY_GRAPH_v1_REPORT.md` | REVIEW | no | Theory Dependency Graph v1 Report |
| `THRESHOLD_NULL_CALIBRATION_v26.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, manifest, manifest_canonical_sha256_excluding_threshold_report_hash, null_model, iterations, seed |
| `THRESHOLD_NULL_CALIBRATION_v26.md` | REVIEW | no | Threshold Null Calibration v26 |
| `THRESHOLD_NULL_CALIBRATION_v27.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, manifest, null_models, recommended_support_gain_aicc, recommended_mi_leakage_threshold, seed |
| `THRESHOLD_NULL_CALIBRATION_v27.md` | REVIEW | no | Threshold Null Calibration v27 |
| `V25_SUPERIOR_GAP_AUDIT.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, audited_baseline, v25_result, checks, failures |
| `V25_SUPERIOR_GAP_AUDIT.md` | REVIEW | no | V25 Superior Gap Audit |
| `V26_FORMAL_SCORE.json` | REVIEW | no | keys: phase, generated_at, v26_score, verdict, proceed_to_v27, scientific_boundary |
| `V26_SUPERIOR_GAP_AUDIT.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, checks, result |
| `V26_SUPERIOR_GAP_AUDIT.md` | REVIEW | no | V26 Superior Gap Audit |
| `V27_SUPERIOR_GAP_AUDIT.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, checks, result, external_support_certified |
| `V27_SUPERIOR_GAP_AUDIT.md` | REVIEW | no | V27 Superior Gap Audit |
| `V32_INDEPENDENT_AUDIT_OPENCODE.md` | REVIEW | no | Auditoría Profunda: Implementación Codex v32 del Framework QICN |
| `V33_INDEPENDENT_AUDIT_OPENCODE.md` | REVIEW | no | Auditoría Independiente: Implementación Codex v33 |
| `V35_ALL_LEGACY_VERIFICATION.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, steps, result, external_support_certified |
| `V35_V30_V31_PARITY_CHECK.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, runs, v30, v31, sha256_equal, verdict_equal |
| `V35_VERSIONED_ARTIFACT_MANIFEST.json` | REVIEW | no | keys: schema_version, generated_at, governance_boundary, source_roots, artifact_count, by_kind, git_status, artifacts |

### `rigid-identity-framework/docs/superpowers/plans/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `2026-05-29-CODEX-v32-IMPLEMENTATION-PROMPT.md` | REVIEW | no | Codex v32 Implementation Prompt — Foundation-First Gap Closure + Antigravity Bug Fixes |
| `2026-05-29-qicn-gap-closure-foundation-first.md` | REVIEW | no | QICN Foundation-First Gap Closure — Implementation Plan |
| `2026-05-29-ULTRATHINK-foundation-first-gap-closure.md` | REVIEW | no | QICN Foundation-First Gap Closure — ULTRATHINK Plan |
| `2026-05-29-ULTRATHINK-v30-v31-hybrid-executed-plan.md` | REVIEW | no | QICN v30/v31 Hybrid Executed Plan |
| `2026-05-31-CODEX-v33-PHI-CONSISTENCY-FOUNDATION-CLOSURE.md` | REVIEW | no | CODEX v33 IMPLEMENTATION PROMPT — ∅_φ CONSISTENCY & FOUNDATION CLOSURE |
| `2026-05-31-CODEX-v34-L4-ESTIMATOR-CLOSURE.md` | REVIEW | no | CODEX v34 IMPLEMENTATION PROMPT — L4 Estimator Gap Closure |
| `2026-05-31-CODEX-v35-VERSION-CENTRALIZATION.md` | REVIEW | no | CODEX v35 IMPLEMENTATION PROMPT — VERSION CENTRALIZATION & PROFESSIONAL CLEANUP |

### `rigid-identity-framework/docs/templates/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `EXTERNAL_DATASET_MANIFEST.template.json` | REVIEW | no | keys: schema_version, status, dataset_id, dataset_provenance, third_party_owner_or_custodian, collection_start_date, collection_end_date, blinding_status |
| `EXTERNAL_REPLICATION_DECISION_RECORD.template.json` | REVIEW | no | keys: schema_version, status, protocol_version, prediction_id, execution_class, repository_commit_or_archive_hash, dataset_manifest_hash, evaluator_hash |
| `EXTERNAL_SESSION_ZERO_MANIFEST.template.json` | REVIEW | no | keys: schema_version, manifest_id, status, governance_boundary, preregistration_hash, dataset_sha256, dataset_origin, adjudicator |
| `FCR_DOWNGRADE_DECISION_RECORD.template.json` | REVIEW | no | keys: schema_version, decision_record_id, governance_boundary, source_adjudication_report_sha256, claim_id, prediction_id, trigger, required_registry_action |

### `rigid-identity-framework/docs/theory/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` | KEEP | si | CCR Null-Regime Conditional Closure v31 |
| `FINITE_SEPARATOR_COMPLETE_PACKAGE_PRODUCT_NEGATIVE_CONTROL_v22.json` | REVIEW | no | keys: schema_version, package_id, generated_at, status, governance_boundary, independence_boundary, construction_protocol_reference, intended_theorem_use |
| `FINITE_SEPARATOR_COMPLETE_PACKAGE_v22.json` | REVIEW | no | keys: schema_version, package_id, generated_at, status, governance_boundary, independence_boundary, construction_protocol_reference, intended_theorem_use |
| `PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex` | KEEP | si | QICN v28 Projection-Invariant Finite Bridge Conjecture\\\large Degrading from Theorem to Conjecture with Constructive Incompleteness Criterion |
| `PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v29.tex` | KEEP | si | Projection-Invariant Bridge Theorem:\\\large Estimator Existence, Claim Factorization, Lipschitz Stability, and Generalized Least-Squares Likelihood |
| `PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md` | REVIEW | no | Projection-Invariant Finite Bridge Theorem v26 |
| `PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex` | KEEP | si | QICN v26 Projection-Invariant Finite Bridge Theorem\\\large Formal Conditional Appendix |
| `PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex` | KEEP | si | Projection-Invariant Bridge Theorem:\\\large Lipschitz Fiber Admissibility, iid Invalidity, and Adjudication Stability |

### `rigid-identity-framework/monolithic/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `compile.ps1` | REVIEW | no | pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex |
| `QICN_MONOLITHIC.tex` | KEEP | si | --- Document metadata --- |

### `rigid-identity-framework/monolithic/build/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `monolithic_references.bib` [UNTRACKED] | ORPHAN_CANDIDATE | no | % source: basecore/core/canonical_core_references.bib |

### `rigid-identity-framework/monolithic/build/sections/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `01-basecore.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `02-rigid-identity-as-an-inverse-limit-in-observable-channels.tex` [UNTRACKED] | KEEP | si | ============================================================================ |
| `03-phenomenological-regimes-induced-by-structural-identity.tex` [UNTRACKED] | KEEP | si | ============================================================================ |
| `04-structural-instability-of-the-phenomenological-null-regime.tex` [UNTRACKED] | KEEP | si | ============================================================================= |
| `05-falsifiable-predictions-under-forensic-constraints.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `06-structural-criterion-for-substrate-invariant-operational-consciousness.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `07-predictions-discriminators-and-failure-modes.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `08-operational-life-structural-class-and-subjecthood.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `09-first-person-indexed-subjectivity.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |
| `10-phenomenal-bridge-organization.tex` [UNTRACKED] | KEEP | si | \clearpage |
| `11-external-adjudication-of-bridge-formalized-machine-subjectivity.tex` [UNTRACKED] | KEEP | si | Scope and Non-Claims |
| `12-operational-consciousness-to-operational-subjecthood-bridge.tex` [UNTRACKED] | KEEP | si | Scope, System Boundary, and Non-Inference Note |

### `rigid-identity-framework/monolithic/preamble/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `packages.tex` | KEEP | si | \usepackage[utf8]{inputenc} |
| `setup.tex` | KEEP | si | \geometry{a4paper, margin=1in} |

### `rigid-identity-framework/paper1/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | ============================================================================ |
| `references.bib` | ORPHAN_CANDIDATE | no | % ============================================================================ |

### `rigid-identity-framework/paper10_external_adjudication/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | External Adjudication of Bridge-Formalized Machine Subjectivity:\\Human Comparator Protocols, Runtime Health, Clean-Room Reproducibility, and First-Collection O |

### `rigid-identity-framework/paper2/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | ============================================================================ |
| `references.bib` | ORPHAN_CANDIDATE | no | % ============================================================================ |

### `rigid-identity-framework/paper3/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | ============================================================================= |
| `references.bib` | ORPHAN_CANDIDATE | no | % ============================================================================= |

### `rigid-identity-framework/paper4/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{Falsifiable Predictions Under Forensic Constraints |

### `rigid-identity-framework/paper5_operational_consciousness/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{A Structural Criterion for Substrate-Invariant Operational Consciousness |

### `rigid-identity-framework/paper6_predictions_falsation/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{Predictions, Discriminators, and Failure Modes for the Causally Rigid Operational Consciousness Framework |

### `rigid-identity-framework/paper7_operational_life_subjecthood/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{Operational Life, Structural Class, and Subjecthood in a Causally Rigid Framework |

### `rigid-identity-framework/paper8_first_person_subjectivity/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{First-Person Indexed Subjectivity: Self-Binding, Ownership, Continuity, Irreducibility, and Cross-Substrate Consequence in a Causally Rigid Framework |

### `rigid-identity-framework/paper9_phenomenal_bridge_organization/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{From First-Person Indexed Subjectivity to Phenomenal Bridge Organization: Formal Predicates, Rival Defeat, Intervention Logic, and Internal Admissibilit |
| `paper9_local_references.bib` | KEEP | si | @article{paper6, |
| `references.bib` [DUP] | KEEP | si | @book{adamek1990, |

### `rigid-identity-framework/paper_bridge_operational_subjecthood/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `main.tex` | KEEP | si | \textbf{From Structural Invariants to Operational Subjecthood: A Constructive Bridge |
| `references.bib` | KEEP | si | @book{adamek1990, |

### `rigid-identity-framework/registry/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `macros.jsonl` | REVIEW | no | {"name":"A","latex_name":"\\A","definition":"\\mathcal{A}","arity":0,"owner":"basecore","command":"newcommand","canonical":true,"aliases":[],"collision_risk":"l |
| `prediction-canon-map.json` | REVIEW | no | keys: schema_version, policy_version, date, status, boundary, policy, latex_canonical_predictions, registry_extensions |
| `prediction-schema.json` | REVIEW | no | keys: $schema, title, schema_version, status, required_top_level, patterns, threshold_status_enum, prediction_required_fields |
| `schema.json` | REVIEW | no | keys: $schema, $id, title, type, additionalProperties, properties, $defs |
| `theorems.delta.json` | REVIEW | no | keys: added, removed, changed |
| `theorems.jsonl` | REVIEW | no | {"id":"basecore:hypothesis:hyp-h1","type":"hypothesis","paper":"basecore","section":null,"title":"H1: Projection Structure","label":"hyp:H1","statement":"[H1: P |

### `rigid-identity-framework/release/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `references.bib` [DUP] | ORPHAN_CANDIDATE | no | % REFERENCES.BIB - deduplicated canonical release bibliography |

### `rigid-identity-framework/scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `ar1-correction-clinical-summary-v28.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-finite-separator-package.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-generator-independence.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `audit-monolithic-build-quality.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-operational-term-promotions-v27.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-operational-term-promotions-v28.js` | KEEP | si | !/usr/bin/env node |
| `audit-operational-term-promotions.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-semantic-inflation.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-superior-gaps.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-v23-roadmap-gates.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-v24-critical-gaps.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-v25-superior-gaps.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-v26-superior-gaps.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `audit-v27-superior-gaps.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `build-monolithic-volume.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `build-theory-dependency-graph.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `calibrate-session-zero-thresholds-v26.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `calibrate-session-zero-thresholds-v27.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `cleanroom-reviewer-quarantine.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `construct-finite-separator-package.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `evaluate-framework-progress.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `external-session-zero-adjudicator-v27.js` | KEEP | si | !/usr/bin/env node |
| `external-session-zero-adjudicator-v28.js` | KEEP | si | !/usr/bin/env node |
| `external-session-zero-adjudicator-v30.js` | KEEP | si | !/usr/bin/env node |
| `external-session-zero-adjudicator-v31.js` | KEEP | si | !/usr/bin/env node |
| `external-session-zero-adjudicator.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `extract-claim-ledger.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `extract-registry.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `fcr-impact-analyzer.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `generate-bridge-h2-h4-fixtures.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `generate-curation-batch.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `generate-preregistration-scaffolds.js` | ORPHAN_CANDIDATE | no | # Boundary |
| `generate-report.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `generate-versioned-artifact-manifest.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `inventory-traceability.js` [UNTRACKED] | ORPHAN_CANDIDATE | no | inventory-traceability.js (READ-ONLY) |
| `lint-nonclaims.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `negative-control-suite.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `probe-extractor-reproducibility.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `propose-fcr-downgrades-from-adjudication.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `registry-lib.js` | KEEP | si | const fs = require("fs"); |
| `resync-macro-cache.js` | KEEP | si | !/usr/bin/env node |
| `run-adversarial-negative-controls.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-02-execution.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-04c-execution.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-11-execution.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-ext-01-cleanroom.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-ext-01-pilot.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `run-pred-ext-01-rehearsal.js` | ORPHAN_CANDIDATE | no | const crypto = require("crypto"); |
| `tamper-inject.js` | ORPHAN_CANDIDATE | no | const crypto = require("crypto"); |
| `test-external-trace-generator.js` | ORPHAN_CANDIDATE | no | const assert = require("assert"); |
| `test-resync-macro-cache.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `test-trace-memory-rival.js` | ORPHAN_CANDIDATE | no | const assert = require("assert"); |
| `validate-corpus.js` | KEEP | si | !/usr/bin/env node |
| `validate-macros.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `validate-prediction-registry.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `validate-preregistration-coverage.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `validate-promotion-rules.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `verify-coordinate-specs.js` | ORPHAN_CANDIDATE | no | Find all Coordinate headers, e.g., "## Coordinate 1: Self-Index" |
| `verify-curation-overlays.js` | ORPHAN_CANDIDATE | no | const fs = require("fs"); |
| `verify-human-veto-signature-v27.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `verify-human-veto-signature-v28.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `verify-human-veto-signature.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `verify-monolithic-risk.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `verify-registry-reproducibility.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |

### `rigid-identity-framework/scripts/legacy/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `compare-v30-v31.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |
| `README.md` | KEEP | no | Legacy Compatibility Layer |
| `run-all-legacy-verifications.js` | ORPHAN_CANDIDATE | no | !/usr/bin/env node |

### `rigid-identity-framework/scripts/lib/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `advanced-statistics.js` | KEEP | si | Shared small-n statistical diagnostics for QICN synthetic adjudicators. |
| `adversarial-negative-controls.js` | KEEP | si | const { generateTracePanel } = require("./external-trace-generator"); |
| `bridge-estimator-verification.js` | KEEP | si | Operational bridge hypothesis verification for QICN synthetic fixtures. |
| `external-trace-generator.js` | KEEP | si | function seedToUint32(seed) { |
| `finite-separator-incidence.js` | KEEP | si | const fs = require("fs"); |
| `gls-statistics.js` | KEEP | si | Exact AR(1) GLS profile-likelihood helper. |
| `pred-ext-01-evaluator.js` | KEEP | si | const crypto = require("crypto"); |
| `synthetic-prediction-simulators.js` | KEEP | si | const { mulberry32, seedToUint32 } = require("./external-trace-generator"); |
| `trace-memory-rival.js` | KEEP | si | function normalizeAlphabet(values) { |

### `scripts/`

| Archivo | Bucket | Ref | Sinopsis |
|---|---|---|---|
| `audit-public-release-reproducibility.cjs` | ORPHAN_CANDIDATE | no | const fs = require('fs'); |
| `build-canonical-release-bundle.cjs` | KEEP | si | const fs = require('fs'); |
| `sync-public-trunk-basecore-release.cjs` | KEEP | si | const fs = require('fs'); |
| `sync-public-trunk-canonicalization.cjs` | ORPHAN_CANDIDATE | no | const { main } = require('./sync-public-trunk-basecore-release.cjs'); |
| `verify-canonical-integrity.cjs` | ORPHAN_CANDIDATE | no | const fs = require('fs'); |
| `verify-canonical-release.cjs` | ORPHAN_CANDIDATE | no | const fs = require('fs'); |
| `verify-claim-registry.cjs` | ORPHAN_CANDIDATE | no | const fs = require('fs'); |

---

Reporte machine-readable completo (todos los campos por archivo) en el
`.json` adjunto del mismo nombre. Decision de remover/archivar: humana,
con inventario + hashes previos, sin `git add -A`.
