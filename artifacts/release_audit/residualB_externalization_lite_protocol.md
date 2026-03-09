# Residual B Externalization-Lite Protocol

Mode: `pseudo_external_reproduction`

Package location:
- `C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\artifacts\release_audit\residualB_externalization_lite`

Contents:
- frozen case JSONs only
- frozen threshold file only
- independent_judge_v3.py only
- no generator imports
- no access to reveal map during judgment

Execution profile:
- workspace primary: `PYTHONHASHSEED=31`
- workspace replica: `PYTHONHASHSEED=53` with reversed blind ordering
- externalization-lite rerun: `PYTHONHASHSEED=71` from clean directory `C:\Users\irisp\OneDrive\Escritorio\TRADING 3.0\artifacts\release_audit\residualB_externalization_lite`

This is not external validation. It is a stronger reproduction path outside the usual workspace flow.
