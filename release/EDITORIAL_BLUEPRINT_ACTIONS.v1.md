# EDITORIAL_BLUEPRINT_ACTIONS.v1

## Fuentes
- elease/CANON_MAP.v1.json
- elease/INDEX_PDFS.json
- elease/editorial_audit_v1/primary_supporting_map.json
- elease/editorial_audit_v1/methods_coverage_table.csv
- elease/editorial_audit_v1/q_t_candidate_evidence.json

## Prioridad de documentos
### Primary (prioridad alta)
- 44806ece96bbdae2_main_1c305418 (docId: 44806ece96bbdae2, status: PDF_ONLY, source_path: rigid-identity-framework/paper4/main.tex)
- 6968859f53621468_6968859f53621468_main_f973c787 (docId: 6968859f53621468, status: CANON, source_path: rigid-identity-framework/paper1/main.tex)
- 9e4b83e44e669730_9e4b83e44e669730_main_d5f7405e (docId: 9e4b83e44e669730, status: CANON, source_path: rigid-identity-framework/paper2/main.tex)
- canonical_core (docId: 3b77e7b20616cf25, status: PDF_ONLY, source_path: rigid-identity-framework/CANONICAL_CORE.tex)
- dc23c9c9345aae47_dc23c9c9345aae47_main_ddd19561 (docId: dc23c9c9345aae47, status: CANON, source_path: rigid-identity-framework/paper3/main.tex)

### Supporting (prioridad media/baja)
- 1a86ec656885a998_1a86ec656885a998_main_ac20e128 (docId: 1a86ec656885a998, status: CANON, source_path: rigid-identity-paper/main.tex)
- 857c4c89149a369c_857c4c89149a369c_main_7294ab07 (docId: 857c4c89149a369c, status: CANON, source_path: Sistema Canon Sandbox/artifacts/paper_exports/roeo_batch_campaign_v1/main.tex)
- 87dc170947cc65f0_87dc170947cc65f0_main_c7b5d93e (docId: 87dc170947cc65f0, status: CANON, source_path: Sistema Canon Sandbox/artifacts/paper_exports/roeo_batch_final_paper_v1/main.tex)
- aa4d0b933892715a_aa4d0b933892715a_main_df41c33d (docId: aa4d0b933892715a, status: CANON, source_path: phenomenological-regimes-paper/main.tex)
- c3d1cc6abf9c8c70_c3d1cc6abf9c8c70_main_93b0b0fc (docId: c3d1cc6abf9c8c70, status: CANON, source_path: phenomenological-instability-paper/main.tex)
- canonical_core_74be3e (docId: eead218e079c0ad2, status: CANON, source_path: NotebookLM/LaTeX/CANONICAL_CORE_RECONSTRUCTED.tex)
- canonical_core_957f4e (docId: bbe9bbb48ddf4f9c, status: MIRROR, source_path: NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/CANONICAL_CORE.tex)
- canonical_core_957f4e (docId: ea247e98e09de39b, status: PDF_ONLY, source_path: NotebookLM/LaTeX/CANONICAL_CORE.tex)
- phenomenological_instability (docId: 04b40ecc9376767e, status: CANON, source_path: NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-instability.tex)
- phenomenological_instability_2fe669 (docId: 0b013024c06a2f7d, status: CANON, source_path: NotebookLM/LaTeX/phenomenological-instability.tex)
- phenomenological_regimes (docId: 9dab69286f9e9107, status: CANON, source_path: NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-regimes.tex)
- phenomenological_regimes_529d6b (docId: 39860a8a5035ed82, status: CANON, source_path: NotebookLM/LaTeX/phenomenological-regimes.tex)
- rigid_identity_paper (docId: 3e026c9275c59788, status: CANON, source_path: NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/rigid-identity-paper.tex)
- rigid_identity_paper_8925ec (docId: bb0cda8022f6c8ac, status: CANON, source_path: NotebookLM/LaTeX/rigid-identity-paper.tex)

## Acciones editoriales por documento
- Primary: agregar referencia corta única al HUB y aplicar término canónico eadout interno operacional donde aplique.
- Supporting: aplicar política de términos y de disclaimer sin duplicar claims.
- En todos: evitar q_t formal hasta evidencia textual/instrumentación (FUTURO/PR-Q1, NO CONSTA).

## Dónde insertar PR6/PR7/PR8
### Opción A (default): HUB único
- Insertar PR6/PR7/PR8 en elease/METHODS_GOVERNANCE_HUB.v1.md.
- Cada paper solo referencia al HUB en una línea.

### Opción B: Paper III
- Condición: que el texto fuente de Paper III exista dentro del release.
- Estado actual: NO CONSTA texto fuente de igid-identity-framework/paper3/main.tex bajo RELEASE_ROOT (ver methods_coverage_table.csv).
- Resultado: no aplicar Opción B en este release.

## Criterio de cierre editorial (fase de plan)
- Término canónico aplicado en política.
- Disclaimers deduplicados por regla de HUB único.
- Mapa crosspaper generado con doc_key/docId trazables.
- Sin claims fuera de evidencia textual del release.
