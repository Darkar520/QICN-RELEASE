# Residual B Second Family Report

Second family: `offset_dispersion`.

Design:
- start from the same positive continuous backbone
- apply replica-constant opposite offsets to peripheral channels
- leave the central decision channel structurally readable
- target `I_ri` by widening within-class geometry rather than by phase aliasing

Primary patterns by profile:
- family1: `{'base': ['PASS', 'AMBIGUOUS', 'FAIL'], 'local_loose': ['PASS', 'AMBIGUOUS', 'FAIL'], 'local_tight': ['PASS', 'AMBIGUOUS', 'FAIL']}`
- family2: `{'base': ['PASS', 'AMBIGUOUS', 'FAIL'], 'local_loose': ['PASS', 'AMBIGUOUS', 'FAIL'], 'local_tight': ['PASS', 'AMBIGUOUS', 'FAIL']}`

First-binding invariant by profile:
- family1: `{'base': ['I_leg', 'I_ri', 'I_ri'], 'local_loose': ['I_leg', 'I_ri', 'I_ri'], 'local_tight': ['I_leg', 'I_ri', 'I_ri']}`
- family2: `{'base': ['I_leg', 'I_ri', 'I_ri'], 'local_loose': ['I_leg', 'I_ri', 'I_ri'], 'local_tight': ['I_leg', 'I_ri', 'I_ri']}`

Judgment:
- family2 is genuinely distinct from `near_identity_v3`
- family2 converges with family1 on `PASS -> AMBIGUOUS -> FAIL`
- family2 also localizes `I_ri` as the first binding invariant on the negative member
