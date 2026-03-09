# Residual A: I_ri Refined Pair Audit

## Positive refined pair
- pair: `positive_continuous` vs `positive_discrete`
- base raw decision: `AMBIGUOUS`
- base normalized-I_ri decision: `PASS`
- left invariants: `{"I_per": 0.721603, "I_ri": 2.623922, "I_int": 0.648394, "I_cont": 0.873566, "I_diff": 0.568764, "I_leg": 0.1}`
- right invariants: `{"I_per": 0.25, "I_ri": 3.464102, "I_int": 0.64955, "I_cont": 0.95, "I_diff": 0.82, "I_leg": 0.1}`

## Negative refined pair
- pair: `positive_continuous` vs `positive_discrete_broken`
- decision under normalized-I_ri path: `FAIL` across all tested frozen profiles

## Diagnosis
Raw ambiguity remains a scale-sensitive I_ri issue. Under normalized I_ri handling, the positive pair stays PASS across frozen local threshold profiles, while the refined negative pair stays FAIL.
