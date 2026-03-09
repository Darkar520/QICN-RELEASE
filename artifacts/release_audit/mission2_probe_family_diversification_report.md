# Mission 2 - Probe-Family Diversification Path

Residual A:
- Family 1 still supports substrate-equivalence only through normalized-I_ri handling.
- Family 2 adds a distinct substrate family (`continuous_dense_cycle2` vs `quantized`) that passes raw equivalence, while the matched broken quantized family fails raw equivalence.
- Family-2 threshold stability holds across base, local_loose, local_tight, legibility_tight, differentiation_tight.

Residual B:
- Family 1 (`near_identity_v3`) retains the localized transition `PASS -> AMBIGUOUS -> FAIL` across base, local_loose, local_tight.
- Family 1 first failed invariant on the negative member by profile: `['I_ri', 'I_ri', 'I_ri']`.
- Family 2 (`near_legibility`) is genuinely different in construction but does not reproduce the same boundary topology.
- Family 2 profile patterns: `{'base': ['PASS', 'PASS', 'FAIL'], 'local_loose': ['PASS', 'PASS', 'FAIL'], 'local_tight': ['PASS', 'PASS', 'FAIL']}`.
- Family 2 first-fail map: `{'base': ['', '', 'I_leg'], 'local_loose': ['', '', 'I_leg'], 'local_tight': ['', '', 'I_leg']}`.

Technical judgment:
- Residual A gains convergent support from a second family.
- Residual B does not gain family convergence; it keeps one localized internal boundary family plus one distinct non-convergent family.
