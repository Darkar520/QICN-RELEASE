# Environment Replication Report

Type: pseudo-multi-environment only.

Profiles:
- primary: `PYTHONHASHSEED=17`
- replica: `PYTHONHASHSEED=23` with reversed blind-entry order

Agreement on Residual A pair decisions: `True`.
Agreement on Residual B case decisions:
- family1: `True`
- family2: `True`

This is stronger internal reproducibility, not external replication.
