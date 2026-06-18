# QICN S-Instance Construction Attempt

Status: `NON_CANONICAL_SPECULATIVE_INTERNAL_CONSTRUCTION`

Date: 2026-06-18

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Boundary: this is an internal model-conformity attempt against
`QICN_S_INSTANCE_GENUINENESS_CRITERIA.md`. It is not external validation, not a
real-world `C_op` claim, and not a claim about consciousness, identity,
subjectivity, phenomenality, CCR, `I_int`, or no-vacuity.

## Criteria Document Used

Precondition document:

- `docs/ai-platform-outputs/analysis/QICN_S_INSTANCE_GENUINENESS_CRITERIA.md`

This construction is scored against its `PASS_*` conditions and prohibited toy
patterns. No criterion is relaxed.

## Concrete Carrier

Define the internal state space:

```text
X := R^2
d_X := Euclidean norm metric
```

Use coordinates `(q,z)`.

Define the intervention set:

```text
U := { -, + }
```

with the discrete topology. It is compact and non-singleton.

Choose contraction:

```text
lambda := 1/4
K(q,z) := (lambda q, lambda z)
||K|| = 1/4 < 1
```

Choose forcing:

```text
Gamma(+) := (3/4, 0)
Gamma(-) := (-3/4, 0)
```

Choose convex projection carrier:

```text
s := X
Phi_u(x) := convexProjection s (K x + Gamma(u))
```

Because `s=X`, the convex projection is inactive extensionally and the update is
the affine contraction:

```text
Phi_+(q,z) = (q/4 + 3/4, z/4)
Phi_-(q,z) = (q/4 - 3/4, z/4)
```

This still uses the projected-affine Lean carrier; it is the full-space convex
case, not a nonconvex or hand-patched update.

Readouts:

```text
R = { r_q, r_z }
r_q(q,z) = q
r_z(q,z) = z
```

Causal structure:

```text
C := directed intervention-response structure induced by Phi_+, Phi_- and the
     coordinate readouts r_q, r_z.
```

Admissibility bundle:

```text
Gamma_constraints: z = 0 and |q| in [1/2, 1] on the support.
```

The support is:

```text
A := ([-1,-1/2] x {0}) union ([1/2,1] x {0})
```

This is compact, nonempty, non-singleton, and common to all invariant checks.

Collapse set for this internal construction:

```text
Collapse := { (q,z) : |q| <= 1/4 }
```

Then:

```text
dist(A, Collapse) >= 1/4.
```

Fixed points:

```text
f_+ = (1,0)
f_- = (-1,0)
```

They satisfy `Phi_+(f_+)=f_+` and `Phi_-(f_-)=f_-`.

## Lean Mechanization Surface

Lean file:

- `docs/ai-platform-outputs/formal/lean/QICNLean/QICNSInstance.lean`

Mechanized facts:

```text
sInstance_fixedPoint_isFixedPt
sInstance_fixedPoint_unique
sInstance_common_support_forward_invariant
sInstance_attractor_family_isCompact
sInstance_fixedPoint_selector_continuous
```

These facts reuse:

- `projectedAffineMap`
- `projectedAffineFixedPoint`
- `projectedAffineFixedPoint_continuous`
- `projected_affine_attractor_isCompact`
- `ContractingWith.fixedPoint`

Lean does not certify the full six-invariant certificate. It mechanizes the
projected-affine carrier facts that support the internal scoring below.

Build result:

```text
lake build: EXIT=0
Build completed successfully (2297 jobs).
sorry/admit/axiom grep: COUNT=0
```

`#print axioms`:

```text
'QICNLean.sInstance_fixedPoint_unique' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.sInstance_attractor_family_isCompact' depends on axioms: [propext, Classical.choice, Quot.sound]
'QICNLean.sInstance_fixedPoint_selector_continuous' depends on axioms: [propext, Classical.choice, Quot.sound]
```

## Invariant Scoring Against PASS_* Criteria

### Iper - CERTIFIED_INTERNAL

Margin:

```text
delta_per = 1/4
```

Reason:

- `A` is nonempty and compact.
- `A` is not a singleton.
- For every `x in A`, `Phi_+(x) in [1/2,1] x {0}` and
  `Phi_-(x) in [-1,-1/2] x {0}`.
- Thus `Phi_u(A) subset A` for all `u in U`.
- `A` contains the fixed points `f_+` and `f_-`.
- `A` stays at least `1/4` away from the collapse strip `|q| <= 1/4`.

Toy patterns avoided:

- Pattern 2: dynamics is not globally constant on `A` because `q/4` changes
  with input state.
- Pattern 3: dynamics is not identity-only.
- Pattern 4: support is not singleton.
- Pattern 11: `U` is not singleton.
- Pattern 12: collapse is separated by an explicit distance margin.

### Iri - CERTIFIED_INTERNAL, LIMITED ALTERNATIVE FAMILY

Margin:

```text
delta_ri = 2
```

Identity object:

```text
Id_S := { (+ -> f_+), (- -> f_-) }
```

Reason:

- For each `u`, `Phi_u` is a strict contraction; Banach uniqueness gives a
  unique fixed point for that `u`.
- The pre-registered nonempty alternative identity family contains at least the
  swapped assignment `{(+ -> f_-), (- -> f_+)}`.
- The fixed points are separated by Euclidean distance `2`.

Restriction:

- This certifies uniqueness against the explicit two-mode alternative family.
  It does not claim a universal identity theorem over every imaginable
  alternative semantics.

Toy patterns avoided:

- Pattern 5: the alternative family is not empty.
- Pattern 8: readouts are not all-zero; `r_q` separates the two fixed points.
- Pattern 10: the gap is explicit (`2`), not an arbitrary epsilon.

### Iint - DEFERRED

Reason:

- The continuous carrier has an evident coordinate decomposition:
  `q` carries class dynamics and `z` is contractive to zero.
- The support lies in `z=0`, making the second coordinate dynamically
  nonessential on `A`.
- Therefore claiming integration would risk toy pattern 1: product system
  relabeled as integrated.
- A valid continuous factorization class must be defined before scoring.
- The Phase 7 brute-force atomicity truth source applies to finite transition
  tables from `n` and `transition_table`; it does not automatically certify
  this continuous carrier.

Required future work:

```text
Define admissible continuous factorizations for this carrier and prove that no
nontrivial factorization reproduces admissible histories below delta_int>0.
```

Toy patterns not neutralized:

- Pattern 1: product/relabeling risk remains.
- Pattern 6: cannot pass by leaving the factorization class empty.
- Pattern 10: no positive `delta_int` lower bound is established.

### Icont - CERTIFIED_INTERNAL

Margin:

```text
delta_cont = 1
```

Regime space:

```text
E := {Left, Right}
d_E(Left,Right)=1
```

Assignment:

```text
Pi_S(q,0) = Left  if q <= -1/2
Pi_S(q,0) = Right if q >=  1/2
```

Reason:

- `E` is a finite complete metric space.
- `Pi_S` is nonconstant.
- In the subspace topology on `A`, the two components are clopen, so the
  component assignment is continuous.
- Discrete-time admissible trajectories induce regime paths in the complete
  metric space.
- The two regimes are separated by `delta_cont=1`.

Restriction:

- This is discrete-time internal regime continuity, not a continuous-time flow
  theorem.

Toy patterns avoided:

- Pattern 7: `Pi_S` is not constant.
- Pattern 10: the margin is explicit (`1`).
- Pattern 15: the same support `A` is used.

### Idiff - CERTIFIED_INTERNAL

Margin:

```text
delta_diff = 1/2
```

Witness:

```text
x := (-1,0)
y := (1,0)
Read* := { r_q }
schedule := [+]
T := 1
```

Readout histories:

```text
r_q(x) = -1
r_q(y) = 1
r_q(Phi_+(x)) = 1/2
r_q(Phi_+(y)) = 1
```

Thus even after one common intervention, the readout separation is at least
`1/2`.

Toy patterns avoided:

- Pattern 8: readout is nondegenerate.
- Pattern 13: separation comes from deterministic state/readout structure, not
  uncalibrated noise.
- Pattern 4: the support has distinct states.

### Ileg - CERTIFIED_INTERNAL

Margin:

```text
delta_leg = 1/4
```

Decoder:

```text
Dec_S(history window) := sign of the latest r_q value
```

Classes:

```text
Class_S = {Left, Right}
```

Reason:

- Separability: the support components are separated from the decision boundary
  `q=0` by at least `1/2`.
- Noise robustness: readout noise of size at most `1/4` cannot flip class.
- Persistence window: with `tau_min=1`, the latest controlled readout suffices.
- Intervention fidelity: `Phi_+` maps all support states into the Right class;
  `Phi_-` maps all support states into the Left class, with fidelity `1`.
- Negative controls: for a claimed Right transition, the off-target `Phi_-`
  does not produce the Right signature; for a claimed Left transition,
  the off-target `Phi_+` does not produce the Left signature.
- Structured compressibility: compression to the sign of `r_q` preserves the
  two-class partition.
- The decoder reads `r_q`, not construction IDs or family labels.

Toy patterns avoided:

- Pattern 8: readouts are not identical/all-zero.
- Pattern 9: decoder does not memorize labels or state IDs.
- Pattern 10: margin is explicit (`1/4`).
- Pattern 14: partition is auditable and compressible to sign.

## Summary Table

| Invariant | Status | Margin | Anti-toy verdict |
|---|---|---:|---|
| `Iper` | `CERTIFIED_INTERNAL` | `delta_per=1/4` | Non-singleton, invariant, nonconstant dynamics, separated collapse strip. |
| `Iri` | `CERTIFIED_INTERNAL_LIMITED_ALTERNATIVES` | `delta_ri=2` | Nonempty swapped alternative family; not universal over all semantics. |
| `Iint` | `DEFERRED` | none | Product/factorization risk not closed. |
| `Icont` | `CERTIFIED_INTERNAL` | `delta_cont=1` | Nonconstant map to complete finite metric space. |
| `Idiff` | `CERTIFIED_INTERNAL` | `delta_diff=1/2` | Deterministic readout-history separation. |
| `Ileg` | `CERTIFIED_INTERNAL` | `delta_leg=1/4` | Sign decoder, controls, off-target checks, compression. |

## Required Deferral

```text
S_INSTANCE_INVARIANTS_CERTIFIED_INTERNAL:
  Iper(delta=1/4), Iri(delta=2; limited alternatives),
  Icont(delta=1), Idiff(delta=1/2), Ileg(delta=1/4)

S_INSTANCE_INVARIANTS_DEFERRED:
  Iint -- continuous admissible factorization class and nonfactorization proof
  are not established.

FULL_COP_MEMBERSHIP:
  NOT_YET
```

## Final Boundary

This construction is useful as an internal stress test of the criteria document.
It is not a certified `Crit_op` member because `Iint` is deferred. It is not a
real-world `C_op` instance. It is not external validation. It introduces no
claim about consciousness, identity, subjectivity, phenomenality, CCR, `I_int`,
or no-vacuity.

