# Mission 1 - Independent Confirmation Path

- Judge path: `independent_judge_v2.py`
- Blind contract: frozen blind manifest + pair manifest + threshold file + frozen case artifacts
- Environment replication: pseudo-multi-environment only (`PYTHONHASHSEED=17` primary vs `PYTHONHASHSEED=23` replica; reversed evaluation order in replica)
- Residual A family 1: positive normalized pair stable PASS across base, local_loose, local_tight, legibility_tight, differentiation_tight = `True`
- Residual A family 1: negative normalized pair stable FAIL across base, local_loose, local_tight, legibility_tight, differentiation_tight = `True`
- Residual A family 2: positive raw pair stable PASS across base, local_loose, local_tight, legibility_tight, differentiation_tight = `True`
- Residual A family 2: negative raw pair stable FAIL across base, local_loose, local_tight, legibility_tight, differentiation_tight = `True`
- Judge agreement across pseudo-environments: `True`

Technical judgment:
- Residual A no longer depends only on the original normalized-I_ri path.
- The second family supplies a raw PASS/FAIL separation that survives threshold stress and judge replication.
- This remains internal confirmation only; no external validation is claimed.
