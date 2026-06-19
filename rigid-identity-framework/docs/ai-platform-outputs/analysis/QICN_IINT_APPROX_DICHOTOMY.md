# QICN Iint Approximate-Factorization Dichotomy

Status: `NON_CANONICAL_SPECULATIVE_INTERNAL_ANALYSIS`

Date: 2026-06-19

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Boundary: this document does not close `Iint`, does not certify `Crit_op`, and
does not make an external validation claim. It analyzes the coupled
S-instance attempt under two explicitly different admissible factorization
classes. The choice of canonical class is left to human review.

## Common Setup

Coupled carrier under analysis:

```text
X = R^2
A = { x : 1/2 <= ||x|| <= 2 }
K = (1/4) R(pi/3)
Phi_u(x) = K x + Gamma(u) on A
```

Projection is inactive on `A`, so the dynamics relevant to this analysis are
affine-linear on the support.

Write:

```text
rho = 1/4
theta = pi/3
a = rho cos(theta) = 1/8
b = rho sin(theta) = sqrt(3)/8
J = [[0,-1],[1,0]]
K = a I + b J
```

History metric for horizon `T >= 1` and fixed schedule `u_bullet`:

```text
error(F) =
  sup_{x in A} max_{0 <= t <= T}
    || h_{S,T}(x;u_bullet)_t - h_F(x;u_bullet)_t ||
```

For a factorization class `D`:

```text
delta_int(D) = inf_{F in D} error(F)
```

An `Iint` certificate requires `delta_int(D) > 0` for the admissible class `D`.

## D_lin: Exact Linear Product Class

Definition:

```text
D_lin =
  real-linear factorizations by a real direct-sum decomposition
  R^2 = L1 direct_sum L2,
  with one-dimensional real factors, block-diagonal linear dynamics in that
  decomposition, split readouts, and split causal structure.
```

Normalization:

- Dynamics are time-homogeneous.
- The factor state spaces are real one-dimensional.
- The comparison norm is the Euclidean operator norm on `R^2`.
- The affine forcing term may be matched split-wise; the obstruction is the
  linear part `K`.
- The same support `A` is used.

Equivalence:

In dimension two, `D_lin` corresponds to real-product linear parts that are
real-diagonalizable, including scalar operators such as `a I`.

### Linear Distance Computation

Every real `2x2` operator can be decomposed as:

```text
B = alpha I + S + c J
```

where `S` is symmetric traceless and `c J` is the skew part. Let
`r = ||S||_op`.

For `B` to have real eigenvalues, its discriminant must be nonnegative. In this
decomposition that condition is:

```text
r >= |c|
```

The distance from `K = a I + b J` to such a `B` is minimized by `alpha = a`.
For the remaining part:

```text
|| S + (c-b)J ||_op = r + |c-b|
```

under the minimizing orientation of `S`. Therefore:

```text
dist_op(K, D_lin linear parts)
  = inf_c ( |c| + |c-b| )
  = b
  = sqrt(3)/8.
```

The infimum is attained, for example, by the scalar product operator `B = a I`,
which preserves every real line and is block-diagonal in any real split.

### Translation to History Error on A

At `t=1`, with matched forcing, the state error is:

```text
||(K-B)x||
```

Because `A` is centrally symmetric and contains vectors with `||x||=2`, no
constant affine offset can reduce the worst-case one-step linear error below
`2 dist_op(K,D_lin)`. Thus:

```text
delta_int^lin
  = 2 * sqrt(3)/8
  = sqrt(3)/4
  approx 0.4330127019
```

Verdict under `D_lin`:

```text
delta_int^lin = sqrt(3)/4 > 0
Iint passes only as a D_lin-relative, exact-linear product obstruction.
```

This matches the Lean result
`rotation_contraction_no_invariant_line`: exact real-linear product splitting
is blocked. It does not address nonlinear or finite-horizon approximate
surrogates.

## D_approx: Finite-Horizon Decoder-Coupled Approximation Class

Definition:

```text
D_approx =
  finite-horizon product-latent surrogate factorizations with:
  - latent product state Z = Z1 x Z2, Z1=Z2=R;
  - continuous bounded encoder E : A -> Z;
  - independent scalar latent updates z1_{t+1}=f1_t(z1_t,u_t),
    z2_{t+1}=f2_t(z2_t,u_t);
  - a time- and schedule-dependent continuous decoder
    Dec_{t,u_bullet} : Z1 x Z2 -> X;
  - finite horizon T fixed before scoring.
```

Normalization:

- The model is finite-dimensional: two scalar latent coordinates.
- Encoder, latent updates, and decoder are continuous on compact domains.
- Parameter magnitudes are bounded by the support and by the finite geometric
  bound of the contractive affine system.
- No construction labels, state IDs, or intervention IDs are used.
- The decoder is allowed to depend on `t` and on the fixed schedule
  `u_bullet`.
- This is intentionally broader than structural product dynamics.

### Zero-Error Construction

For fixed `T` and schedule `u_bullet`, define:

```text
E(x) = (x1,x2)
z1_{t+1} = z1_t
z2_{t+1} = z2_t
```

The latent product dynamics are completely decoupled. The decoder is:

```text
Dec_{t,u_bullet}(z1,z2)
  = K^t z + sum_{j=0}^{t-1} K^{t-1-j} Gamma(u_j),
  where z = (z1,z2).
```

This decoder is affine, continuous, and bounded on the compact encoded support.
It reproduces the true finite-horizon history exactly:

```text
h_F(x;u_bullet)_t = h_S(x;u_bullet)_t
```

for every `x in A` and every `0 <= t <= T`. Therefore:

```text
error(F) = 0
delta_int^approx = 0
```

Verdict under `D_approx`:

```text
delta_int^approx = 0
Iint FAILS under this broad finite-horizon approximate class.
```

This is not a numerical accident. The class allows the decoder to carry the
coupled finite-horizon transition map. That makes a product-latent surrogate
look factorized while the coupling is reintroduced at decoding time.

## Dichotomy

```text
Under D_lin:
  delta_int = sqrt(3)/4 > 0
  Iint has a positive exact-linear product margin.

Under D_approx:
  delta_int = 0
  Iint fails for this instance.
```

Overall verdict:

```text
CLASS_DEPENDENT
IINT_MARGIN_UNDER_LIN_ONLY
IINT_FAILS_UNDER_APPROX
FULL_COP_MEMBERSHIP: NOT_YET
```

No canonical class is selected here.

## Arguments For and Against Each Class

### D_lin

Arguments for:

- It captures the structural notion of product decomposition by real invariant
  one-dimensional factors.
- It aligns with the mechanized exact obstruction
  `rotation_contraction_no_invariant_line`.
- It prevents decoder-side reintroduction of coupling.
- It gives a computable positive margin.

Arguments against:

- It may be too narrow for operational non-simulability.
- It excludes nonlinear factor coordinates.
- It excludes finite-horizon surrogates that can reproduce observed histories.
- A positive `D_lin` margin does not by itself prove robust integration against
  broader admissible approximators.

### D_approx

Arguments for:

- It reflects the operational fact that finite observed histories can be
  simulated by surrogate models.
- It stress-tests whether `Iint` survives approximate mimicry rather than only
  exact algebraic splitting.
- It exposes a decoder loophole that any serious `Iint` criterion must close or
  explicitly forbid.

Arguments against:

- It is likely too permissive as a structural factorization class.
- The decoder can reintroduce all coupling, making the latent product split
  mathematically shallow.
- If accepted as canonical, it makes `Iint` fail not only here but for many
  compact finite-horizon continuous systems.

## Extra Hypotheses Needed to Close Approximate Iint

To recover a positive approximate margin, a future admissible class would need
additional restrictions such as:

- split decoders/readouts, not decoder-coupled reconstruction;
- time-homogeneous factor dynamics;
- no schedule-specific decoder;
- no finite-horizon lookup or surrogate that carries the original transition
  map in the output layer;
- uniform scoring over all horizons or an infinite-horizon criterion;
- Lipschitz/capacity bounds fixed independently of the target error epsilon;
- factor maps that preserve the causal and readout split, not merely latent
  coordinate independence;
- a compact normalized search space for admissible approximators, so that a
  positive infimum is meaningful.

Without those extra hypotheses, `delta_int^approx = 0` is the honest result.

## Non-Conclusions

- This does not certify `Iint`.
- This does not certify `Crit_op`.
- This does not change `FULL_COP_MEMBERSHIP: NOT_YET`.
- This does not validate QICN externally.
- This does not imply consciousness, identity, subjectivity, phenomenality, or
  CCR no-vacuity.
- This does not choose the canonical factorization class.

## Final Read

The coupled instance has a real exact-linear obstruction: it is not a disguised
linear product in the `D_lin` sense. But if finite-horizon decoder-coupled
surrogates are admissible, the same instance has zero approximate margin.

The next human decision is therefore not "does the rotation couple the
coordinates?" It does. The decision is whether `Iint` is meant to forbid exact
structural product decompositions only, or also broad finite-horizon
simulation-by-decoder. Under the latter, this instance fails `Iint`.
