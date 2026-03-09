# Corpus Git Hygiene Audit

## Scope
This pass classifies the dirty working tree after the paper6 freeze push. It does not broaden the scientific release, does not rewrite doctrine, and does not auto-stage historical or auxiliary material.

## Current tracked release nucleus
The tracked branch remains a narrow frozen release with 51 tracked files, centered on:
- canonical TeX/PDF outputs for `CANONICAL_CORE` and `paper1..paper6`
- `framework_overview_strict.tex/.pdf`
- final release / claim / ledger markdown and CSV/JSON artifacts
- `release/references.bib`

## Safe ignore class applied now
A minimal `.gitignore` was added for files that are local noise rather than release content:
- local/editor directories: `.agent/`, `.claude/`, `.kilocode/`, `.vscode/`
- Python cache/env: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`
- Node dependencies: `node_modules/`
- LaTeX build intermediates: `*.aux`, `*.log`, `*.out`, `*.toc`, `*.bcf`, `*.blg`, `*.bbl`, `*.run.xml`
- scratch placeholders: `nul`, `*_tmp.json`, `_search_tmp.json`, `_tmp_case.json`

These were chosen because they are reproducible build/runtime by-products or local tooling state, not part of the scientific release payload.

## Present but should remain out of the main release unless explicitly curated later
The following untracked groups are visible but should not be auto-added to the frozen branch:
- historical duplicate lineages and legacy corpora: `phenomenological-instability-paper/`, `phenomenological-regimes-paper/`, `rigid-identity-paper/`, `NotebookLM/`, `Sistema Canon Sandbox/`, `SISTEMA CANON/`
- outreach / grants / old summaries / reviewer docs outside the frozen release architecture
- bulk zip bundles and workspace snapshots: `QICN_*.zip`, `TRADING_3.0_workspace_*.zip`
- backup trees and side workspaces: `backups_y_otros/`, `release_repo_qicn_*`, `TRADING_3.0_workspace_*`, `QICN_corpus_strict_package_*`

## Present and potentially worth a later explicit curation pass
These exist but were not auto-added in this hygiene step because they need a deliberate release decision, not blind versioning:
- additional `artifacts/release_audit/*.md|*.json|*.csv|*.py|*.ps1|*.cjs` not currently tracked
- frozen-input subdirectories under `artifacts/release_audit/`
- audit helper scripts and runner scripts supporting cycle execution
- root-level research/support folders such as `analisis_y_diagnosticos/`, `research/`, `plans/`, `RCIC_SYNC/`

## Recommendation
Use a later scoped commit to curate exactly which currently-untracked audit assets should join the release branch. That curation should be explicit and narrow, centered on reproducibility-critical artifacts rather than the whole dirty tree.
