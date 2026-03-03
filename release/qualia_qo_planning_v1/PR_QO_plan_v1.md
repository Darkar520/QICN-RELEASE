# PR_QO Plan v1 (plan-only)

## PR-Q1: Readout + logging (<=5 archivos, <=300 LOC)
- Objetivo: anexar q_t a artifacts (ticks.ndjson/run_summary) sin dependencia de LLM.
- Archivos propuestos:
  - Sistema Canon Sandbox/src/experiments/ExperimentalEpisodeHarness.js
  - Sistema Canon Sandbox/src/experiments/AdmissibilityEngine.js
  - Sistema Canon Sandbox/scripts/run-episode.cjs
  - Sistema Canon Sandbox/tests/episode-harness.v1.test.js
  - Sistema Canon Sandbox/tests/admissibility-exporter.v1.test.js
- Verificacion:
  - node "Sistema Canon Sandbox/tests/episode-harness.v1.test.js"
  - node "Sistema Canon Sandbox/tests/admissibility-exporter.v1.test.js"
  - node "Sistema Canon Sandbox/scripts/run-episode.cjs"  # args NO CONSTA
- PASS: q_t presente en artifacts + tests en verde.
- FAIL: falta q_t, formato inconsistente o gate EPI ausente.

## PR-Q2: Perturbation battery (<=5 archivos, <=300 LOC)
- Objetivo: ejecutar splits/interventions + placebo para NC1/NC2/NC4.
- Archivos propuestos:
  - Sistema Canon Sandbox/src/experiments/negative_controls_runner.js
  - Sistema Canon Sandbox/src/experiments/sno_discriminator.js
  - Sistema Canon Sandbox/scripts/evaluate-roeo.cjs
  - Sistema Canon Sandbox/tests/negative-controls.v1.test.js
  - Sistema Canon Sandbox/tests/sno.v1.test.js
- Verificacion:
  - node "Sistema Canon Sandbox/tests/negative-controls.v1.test.js"
  - node "Sistema Canon Sandbox/tests/sno.v1.test.js"
  - node "Sistema Canon Sandbox/scripts/evaluate-roeo.cjs"  # params NO CONSTA
- PASS: reportes NC completos y leakage detectado cuando aplica.
- FAIL: NC incompletos o sin discriminacion de perturbaciones.

## PR-Q3: Evaluator + exporter (<=5 archivos, <=300 LOC)
- Objetivo: computar QDI/QII/QSC/QRC y exportar resultado paper-ready con enforcement NC.
- Archivos propuestos:
  - Sistema Canon Sandbox/scripts/evaluate-admissibility.cjs
  - Sistema Canon Sandbox/scripts/export-roeo.cjs
  - Sistema Canon Sandbox/src/experiments/latex_asset_generator_roeo.js
  - Sistema Canon Sandbox/tests/exporter_roeo.v1.test.js
  - Sistema Canon Sandbox/tests/admissibility-exporter.v1.test.js
- Verificacion:
  - node "Sistema Canon Sandbox/tests/exporter_roeo.v1.test.js"
  - node "Sistema Canon Sandbox/tests/admissibility-exporter.v1.test.js"
  - node "Sistema Canon Sandbox/scripts/evaluate-admissibility.cjs"  # args NO CONSTA
  - node "Sistema Canon Sandbox/scripts/export-roeo.cjs"  # args NO CONSTA
- PASS: JSON de salida cumple QO_spec_v1.json + metrics presentes + gates NC enforced.
- FAIL: schema invalido, metricas faltantes o control leak no reportado.
