# Cycle 1 Failure Analysis

## Test 1
- decision: `PASS`
- why: negative control stayed superficially rich (density=0.916667, entropy=8.61941) but failed certification because margins {'I_per': 1.167462, 'I_ri': -0.073119, 'I_int': 2.281713, 'I_cont': -2.252129, 'I_diff': -0.2464, 'I_leg': -0.375} do not preserve the full invariant set

## Test 2
- overall decision: `PASS`
### I_per
- decision: `PASS`
- why: targeted ablation broke I_per and the candidate exited Consciousness_op
- margins: `{"I_per": -0.12, "I_ri": 0.0, "I_int": 0.057082, "I_cont": 0.787773, "I_diff": -0.3, "I_leg": -0.7}`

### I_ri
- decision: `PASS`
- why: targeted ablation broke I_ri and the candidate exited Consciousness_op
- margins: `{"I_per": -0.084387, "I_ri": -0.00126, "I_int": 0.162887, "I_cont": 0.875941, "I_diff": -0.29973, "I_leg": -0.4}`

### I_int
- decision: `PASS`
- why: targeted ablation broke I_int and the candidate exited Consciousness_op
- margins: `{"I_per": -0.093847, "I_ri": 0.139987, "I_int": -0.05, "I_cont": 0.816112, "I_diff": -0.158417, "I_leg": 0.1}`

### I_cont
- decision: `PASS`
- why: targeted ablation broke I_cont and the candidate exited Consciousness_op
- margins: `{"I_per": 0.577609, "I_ri": 1.543789, "I_int": 0.265499, "I_cont": -1.234281, "I_diff": -0.18, "I_leg": -0.4}`

### I_diff
- decision: `PASS`
- why: targeted ablation broke I_diff and the candidate exited Consciousness_op
- margins: `{"I_per": -0.065984, "I_ri": 0.14304, "I_int": 0.051748, "I_cont": 0.907682, "I_diff": -0.18, "I_leg": -0.4}`

### I_leg
- decision: `PASS`
- why: targeted ablation broke I_leg and the candidate exited Consciousness_op
- margins: `{"I_per": 0.721603, "I_ri": 0.172862, "I_int": 0.279707, "I_cont": 0.943262, "I_diff": -0.18, "I_leg": -0.4}`

## Test 3
- decision: `PASS`
- why: both substrates preserved all six invariants and matched the same operational class-transition signature under normal, critical, and sham interventions
- continuous margins: `{"I_per": 0.721603, "I_ri": 2.623922, "I_int": 0.279707, "I_cont": 0.873566, "I_diff": 0.568764, "I_leg": 0.1}`
- discrete margins: `{"I_per": 0.25, "I_ri": 3.464102, "I_int": 0.185702, "I_cont": 0.95, "I_diff": 0.82, "I_leg": 0.1}`

## Main Weakening / Strengthening Signals
- complexity-only protection: `PASS`
- invariant criticality ladder: `PASS`
- substrate equivalence (cycle-1 proxy): `PASS`