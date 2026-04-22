# EDITORIAL_BLUEPRINT_ACTIONS.v1

## Active base layer

- BaseCore is the only active mathematical source package in the release.

## Downstream public packages

- paper1.rigid_identity -> rigid-identity-framework/paper1/main.tex
- paper2.phenomenological_regimes -> rigid-identity-framework/paper2/main.tex
- paper3.null_regime_instability -> rigid-identity-framework/paper3/main.tex
- paper4.qicn_v45_protocol -> rigid-identity-framework/paper4/main.tex
- paper5.operational_consciousness_criterion -> rigid-identity-framework/paper5_operational_consciousness/main.tex
- paper6.predictions_and_failure_modes -> rigid-identity-framework/paper6_predictions_falsation/main.tex
- paper7.operational_life_subjecthood -> rigid-identity-framework/paper7_operational_life_subjecthood/main.tex
- paper8.first_person_subjectivity -> rigid-identity-framework/paper8_first_person_subjectivity/main.tex
- paper9.phenomenal_bridge_organization -> rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex

## Preserved lineage material

- canonical_core.legacy_package -> rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.tex (supporting_legacy_package)
- canonical_core.historical_frozen_pdf -> historical_release_surface_only (historical_frozen_variant)
- paper1.parallel_lineage -> rigid-identity-paper/main.tex (supporting_parallel_lineage)
- paper2.supporting_lineage -> phenomenological-regimes-paper/main.tex (supporting_formal_lineage)
- paper3.supporting_lineage -> phenomenological-instability-paper/main.tex (supporting_formal_lineage)
- core.reconstructed_lineage -> NotebookLM/LaTeX/CANONICAL_CORE_RECONSTRUCTED.tex (reconstructed_lineage)
- core.notebooklm_lineage -> NotebookLM/LaTeX/CANONICAL_CORE.tex (mirror_lineage)
- instability.notebooklm_mirror_a -> NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-instability.tex (mirror_lineage)
- instability.notebooklm_mirror_b -> NotebookLM/LaTeX/phenomenological-instability.tex (mirror_lineage)
- regimes.notebooklm_mirror_a -> NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-regimes.tex (mirror_lineage)
- regimes.notebooklm_mirror_b -> NotebookLM/LaTeX/phenomenological-regimes.tex (mirror_lineage)
- paper1.notebooklm_mirror_a -> NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/rigid-identity-paper.tex (mirror_lineage)
- paper1.notebooklm_mirror_b -> NotebookLM/LaTeX/rigid-identity-paper.tex (mirror_lineage)

## Actions

- keep one active public base layer
- keep downstream packages visible but non-collapsed into the base
- keep legacy and mirror material explicitly tagged
- prevent runtime-facing wording from being misread as validation, bridge support, or phenomenality closure
