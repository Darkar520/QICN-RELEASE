# QO Planning Summary (plan-only)

## Donde estan los papers hoy (keys + docId)
- 1a86ec656885a998_1a86ec656885a998_main_ac20e128 -> 1a86ec656885a998
- 44806ece96bbdae2_main_1c305418 -> 44806ece96bbdae2
- 6968859f53621468_6968859f53621468_main_f973c787 -> 6968859f53621468
- 857c4c89149a369c_857c4c89149a369c_main_7294ab07 -> 857c4c89149a369c
- 87dc170947cc65f0_87dc170947cc65f0_main_c7b5d93e -> 87dc170947cc65f0
- 9e4b83e44e669730_9e4b83e44e669730_main_d5f7405e -> 9e4b83e44e669730
- aa4d0b933892715a_aa4d0b933892715a_main_df41c33d -> aa4d0b933892715a
- c3d1cc6abf9c8c70_c3d1cc6abf9c8c70_main_93b0b0fc -> c3d1cc6abf9c8c70
- canonical_core -> 3b77e7b20616cf25
- canonical_core_74be3e -> eead218e079c0ad2
- canonical_core_957f4e -> ea247e98e09de39b
- dc23c9c9345aae47_dc23c9c9345aae47_main_ddd19561 -> dc23c9c9345aae47
- phenomenological_instability -> 04b40ecc9376767e
- phenomenological_instability_2fe669 -> 0b013024c06a2f7d
- phenomenological_regimes -> 9dab69286f9e9107
- phenomenological_regimes_529d6b -> 39860a8a5035ed82
- rigid_identity_paper -> 3e026c9275c59788
- rigid_identity_paper_8925ec -> bb0cda8022f6c8ac

## Recomendacion editorial
- Recomendada: Opcion A (Addendum/Appendix en hub Methods/Admissibility).
- Opcion B (Paper V) solo si alcance editorial excede addendum.

## PRs QO y orden
1. PR-Q1 (Readout + logging)
2. PR-Q2 (Perturbation battery)
3. PR-Q3 (Evaluator + exporter)

## Riesgos principales
- Redundancia editorial entre papers por definiciones repetidas.
- Leakage en controles negativos (NC4) si no se enforcea gate.
- Falta de readout q_t consistente en artifacts.

## Proximos comandos (PLAN-ONLY, no ejecutar aqui)
```powershell
Set-Location 'C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\\Sistema Canon Sandbox'
node tests/episode-harness.v1.test.js
node tests/negative-controls.v1.test.js
node tests/admissibility-exporter.v1.test.js
```

Confirmacion requerida para implementar: APPLY:PR-Q1
