# QICN Iint Canonical Factorization Class: Split-Readout Intermediate Class

Status: `NON_CANONICAL_SPECULATIVE_INTERNAL_ANALYSIS`

Date: 2026-06-19

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Boundary: this document does **not** close `Iint`, does **not** certify
`Crit_op`, does **not** change `FULL_COP_MEMBERSHIP: NOT_YET`, and makes **no**
external-validation claim and **no** claim about consciousness, identity,
subjectivity, phenomenality, CCR, `I_int`, or no-vacuity. It is an internal
model-conformity analysis of the canonical factorization class for the
integration invariant `Iint` against the coupled `rho * R(pi/3)` carrier. A
negative result (Iint does not close / the canonical class is not defensible)
was an admissible outcome; the result below is positive **but conditional** on a
disambiguation of the canonical definition, and that conditionality is the
honest core of the report.

---

## 0. Question and Inputs

### 0.1 What this attacks

The open modeling decision identified by
`QICN_IINT_APPROX_DICHOTOMY.md`: the dichotomy showed two **trivial extremes**.

- `D_lin` (exact real-linear product class): `delta_int^lin = sqrt(3)/4 > 0`.
- `D_approx` (finite-horizon decoder-coupled class): `delta_int^approx = 0`,
  degenerate because an unrestricted, time- and schedule-dependent decoder
  reconstructs the coupled history at decode time.

The dichotomy explicitly left the real question to the **intermediate**,
restricted class. This document defines the most defensible intermediate class,
determines whether `delta_int > 0` is provable or refutable there, gives the
bound or the refutation, and judges whether the class is referee-defensible or
ad-hoc.

### 0.2 Canonical anchor (verbatim structure)

`basecore/core/sections/07_operational_criterion_absorbed.tex`, `def:iint`:

> An admissible system satisfies causal integration, written `Iint(S)=1`, if
> there is no non-trivial factorization `A = A_1 x A_2`, `R = R_1 disjoint R_2`,
> together with decomposed dynamics and causal structure reproducing admissible
> histories within error smaller than a positive margin `delta_int(S)` while
> preserving `Id_S`.

Two textual commitments are load-bearing and are the basis of the whole
analysis:

1. The readout family **splits**: `R = R_1 \sqcup R_2`. The canonical text does
   **not** authorize an arbitrary reconstruction decoder. `D_approx` introduced
   one; that is where `D_approx` departs from the canonical text.
2. The dynamics and causal structure are **decomposed** (product/autonomous
   factors), not re-coupled at an output stage.

### 0.3 Carrier (verified against the construction docs)

From `QICN_S_INSTANCE_COUPLED_CONSTRUCTION.md` and
`QICN_IINT_APPROX_DICHOTOMY.md`:

```text
X = R^2,  d_X = Euclidean
rho = 1/4,  theta = pi/3,  K = rho * R(theta)
A = { x : 1/2 <= ||x|| <= 2 }            (compact, connected annulus)
Phi_u(x) = convexProjection_{disk(2)}(K x + Gamma(u)) = K x + Gamma(u) on A
U = { u0, u1, u2 } at 120 degrees,  Gamma(ui) = ui
R = { r_id, r_norm, r_phase },  r_id(x) = x  (full state)
```

Numeric constants used below:

```text
a := rho cos(theta) = (1/4)(1/2)   = 1/8
b := rho sin(theta) = (1/4)(sqrt3/2) = sqrt(3)/8     (the coupling term)
K = [[a, -b],[b, a]]
diam(A) = 4                                          (two radius-2 antipodes)
```

The forcing `Gamma(u)` is a fixed Cartesian offset per intervention; the convex
projection is inactive on `A`. The only structural feature used in the lower
bound below is `b != 0` (the off-diagonal rotation coupling).

---

## 1. The Canonical Intermediate Class `D*` (faithful reading)

`D*` is the literal reading of `def:iint` with the degeneracy loopholes of
`D_approx` removed by **honoring the text**, not by adding convenient extra
axioms.

A factorization `F in D*` is:

```text
1. A product structure on the support:
      psi : A  ->  A_1 x A_2     a bijection (homeomorphism),
   with both factors non-singleton (non-trivial factorization).
   Write psi(x) = (psi_1(x), psi_2(x)).

2. Autonomous (decomposed) factor dynamics, one map per intervention:
      Phi^1_u : A_1 -> A_1,   Phi^2_u : A_2 -> A_2,   for each u in U,
   such that the product update reproduces the system update:
      psi(Phi_u(x)) ~= ( Phi^1_u(psi_1(x)),  Phi^2_u(psi_2(x)) ).
   Key structural consequence: factor 1's trajectory depends on x only
   through psi_1(x); factor 2's only through psi_2(x). No cross-coupling.

3. Split readouts (no reconstruction decoder):
      R_1 on A_1,  R_2 on A_2,   R = R_1 \sqcup R_2,
   so that the model's observation at time t is
      ( R_1(p_t), R_2(q_t) ),  p_t = factor-1 state, q_t = factor-2 state,
   and this must reproduce the original readout history.

4. Time-homogeneous, schedule-independent psi, Phi^i, R_i (no t- or
   u_bullet-dependence). This is the single explicit restriction beyond the
   literal text; it is exactly what blocks the `D_approx` degeneracy and is
   listed as a needed hypothesis in the dichotomy doc's "Extra Hypotheses".
```

History error (same metric as the dichotomy doc), for horizon `T >= 1` and a
fixed admissible schedule `u_bullet`:

```text
error(F) = sup_{x in A} max_{0<=t<=T} || h_S(x;u_bullet)_t - h_F(x;u_bullet)_t ||
delta_int(D*) = inf_{F in D*, F non-trivial} error(F)
```

Because `r_id` reproduces the full state, reproducing the readout history is
equivalent to reproducing `x_t in R^2`. The full observation has two scalar
components; a non-trivial split `R = R_1 \sqcup R_2` (both groups non-empty)
must assign component 1 to one factor and component 2 to the other. **This
forces** (substantive reading):

```text
x^1_t reconstructed from factor 1 only :  m^1_t(x) = R_1(p_t),  p_0 = psi_1(x)
x^2_t reconstructed from factor 2 only :  m^2_t(x) = R_2(q_t),  q_0 = psi_2(x)
```

`R_1, R_2, psi_1, psi_2` may be arbitrary continuous (possibly **nonlinear**)
maps. `D*` therefore strictly contains `D_lin` (linear change of basis + linear
split readouts) and is strictly contained in `D_approx` (which additionally
allows a `t`- and `u_bullet`-dependent reconstruction decoder).

```text
D_lin  (subset)  D*  (subset)  D_approx
```

### 1.1 Why `D*` is the faithful class and `D_approx` is not

- `def:iint` says `R = R_1 \sqcup R_2`. `D*` implements exactly a split readout
  family. `D_approx` replaced this with an arbitrary continuous decoder
  `Dec_{t,u_bullet}` — an object the canonical text never authorizes. The
  decoder is what "carries the coupled transition map" and drives
  `delta_int^approx = 0`. Removing it is **restoring the text**, not
  cherry-picking.
- `def:iint` says "decomposed dynamics and causal structure". `D*` implements
  autonomous factor dynamics. `D_approx`'s schedule/time-dependent decoder is
  not decomposed dynamics; it is an output-stage re-coupling.
- The detector/decoder in `D*` is blind to construction labels (genuineness
  guard 8); the lower bound below uses only `K`'s geometry.

---

## 2. Demonstrability of `delta_int(D*) > 0`

**Result (internal, conditional on the `D*` reading): provable, with an
explicit closed-form lower bound.**

### 2.1 Structural lemma (product systems have thin readout fibers)

Let `F in D*` be any factorization with `error(F) = epsilon`. Fix the schedule
`u_bullet`. Use `t = 0` and `t = 1`.

True dynamics on `A` (forcing cancels in differences, see below):

```text
x^1_1 = a x^1_0 - b x^2_0 + c^1     (c^1 = Gamma^1(u_0), global constant)
x^2_1 = b x^1_0 + a x^2_0 + c^2     (c^2 = Gamma^2(u_0), global constant)
```

**psi_1-fiber thinness.** Take `x, x'` with `psi_1(x) = psi_1(x')` (same
factor-1 data). Then `m^1_0(x) = m^1_0(x')` and `m^1_1(x) = m^1_1(x')` (factor 1
is autonomous, identical initial factor-1 state). Hence:

```text
|x^1_0 - x'^1_0| <= 2 epsilon          (both within epsilon of the same m^1_0)
|x^1_1 - x'^1_1| <= 2 epsilon          (both within epsilon of the same m^1_1)
```

Subtracting the `x^1_1` relations (the constant `c^1` cancels):

```text
x^1_1 - x'^1_1 = a (x^1_0 - x'^1_0) - b (x^2_0 - x'^2_0)
=> b |x^2_0 - x'^2_0| <= |x^1_1 - x'^1_1| + a |x^1_0 - x'^1_0|
                      <= 2 epsilon + a (2 epsilon) = 2 epsilon (1 + a)
=> |x^2_0 - x'^2_0| <= 2 epsilon (1 + a) / b
```

Therefore any two points sharing a `psi_1`-fiber satisfy:

```text
||x - x'|| <= 2 epsilon * sqrt( 1 + ((1+a)/b)^2 ) =: C epsilon.
```

**psi_2-fiber thinness.** Symmetric, using `x^2_1 = b x^1_0 + a x^2_0 + c^2`:
points sharing a `psi_2`-fiber satisfy `||x - x'|| <= C epsilon` with the **same
constant** `C` (the coupling `b` and `a` enter identically).

### 2.2 Chaining lemma (a product of thin fibers is small)

`psi` is a bijection onto `A_1 x A_2`. For arbitrary `y, z in A` write
`psi(y) = (p, q)`, `psi(z) = (p', q')`, and form the **corner**
`w = psi^{-1}(p, q') in A`.

```text
y, w share psi_1-fiber (both have factor-1 = p)  => ||y - w|| <= C epsilon
w, z share psi_2-fiber (both have factor-2 = q') => ||w - z|| <= C epsilon
=> ||y - z|| <= 2 C epsilon   for all y, z in A
=> diam(A) <= 2 C epsilon.
```

### 2.3 Lower bound

```text
epsilon = error(F) >= diam(A) / (2C)
        = diam(A) / ( 4 sqrt( 1 + ((1+a)/b)^2 ) ).
```

Plugging `a = 1/8`, `b = sqrt(3)/8`, `diam(A) = 4`:

```text
(1+a)/b = (9/8)/(sqrt3/8) = 9/sqrt3 = 3 sqrt3
1 + (3 sqrt3)^2 = 1 + 27 = 28
C = 2 sqrt(28) = 4 sqrt(7)
delta_int(D*) >= 4 / (2 * 4 sqrt7) = 1 / (2 sqrt7) = sqrt(7)/14 ~= 0.18898.
```

### 2.4 Consistency check against the dichotomy extremes

```text
D_lin (subset) D* (subset) D_approx
=> delta_int^approx (0)  <=  delta_int(D*)  <=  delta_int^lin (sqrt3/4 ~= 0.433)
```

The proven interval is:

```text
sqrt(7)/14 ~= 0.189   <=   delta_int(D*)   <=   sqrt(3)/4 ~= 0.433.
```

Both endpoints are strictly positive. The nonlinear freedom allowed by `D*`
(over `D_lin`) can at most shrink the achievable margin by roughly a factor 2.3;
**it cannot drive it to zero.** The lower bound is **not claimed tight**;
`sqrt(7)/14` is a conservative, label-free, analytic lower bound obtained from
only `t in {0,1}`.

### 2.5 Exact-reproduction corollary (sanity)

Setting `epsilon = 0` in 2.1 forces both `x^1` and `x^2` constant on every
`psi_1`-fiber, so every `psi_1`-fiber is a single point, so `A_2` is a singleton
— the factorization is **trivial**. Equivalent restatement: **no non-trivial
`D*` factorization reproduces the coupled history exactly.** This is the
finite-`epsilon` quantitative strengthening of the exact obstruction mechanized
in Lean as `rotation_contraction_no_invariant_line`
(`QICNRotationSpectral.lean`): the Lean theorem blocks exact real-line-invariant
linear splits; section 2.1-2.3 upgrade this to a uniform positive margin against
**all** continuous (incl. nonlinear) split-readout product surrogates.

---

## 3. Why the result depends on the reading (the honest caveat)

The positive bound is **class-conditional**. Three loopholes in the literal
canonical text, if left open, change the verdict:

1. **Reconstruction decoder (the `D_approx` loophole).** If an arbitrary
   continuous decoder `Dec(R_1(p_t), R_2(q_t))` is admitted between the split
   readouts and the reproduced history, the coupling can be reintroduced at
   decode time and `delta_int = 0` (dichotomy doc, `D_approx`). `D*` forbids
   this by reading `R = R_1 \sqcup R_2` as split observations that **directly**
   tile the reproduced history.

2. **Schedule/time-dependent factorization.** If `psi`, `Phi^i`, or `R_i` may
   depend on `t` or on `u_bullet`, the factorization degenerates toward a lookup
   table and the margin collapses. `D*` requires time-homogeneous,
   schedule-independent maps.

3. **Literal-partition cheap pass (`r_id` liability).** Under a *different*
   reading where one merely partitions the **given** family
   `{r_id, r_norm, r_phase}` into two groups, the full-state readout `r_id`
   cannot be assigned to a single proper factor, so **no** non-trivial split
   exists and `Iint` passes **vacuously**. This pass is **not defensible** (it
   is "pass by rigged unsplittable readout", adjacent to genuineness toy
   pattern 14 and the "R chosen to hide separable components" failure). The
   defensible certification is the substantive reproduction reading of section
   2, which does **not** rely on `r_id` being unsplittable.

The honest meta-status of `Iint` for this carrier is therefore
**class-determined**:

```text
under D* (faithful, restricted)   : delta_int >= sqrt(7)/14 > 0   (PASSES)
under D_approx (decoder-coupled)  : delta_int = 0                 (FAILS)
under literal-partition + r_id    : passes vacuously              (NOT DEFENSIBLE)
```

---

## 4. Is `D*` referee-defensible or ad-hoc?

### 4.1 Defensible aspects

- `D*` is the **literal** reading of `def:iint` (`R = R_1 \sqcup R_2` +
  decomposed dynamics). It removes the `D_approx` decoder, which the canonical
  text never authorized. Restoring the text is not cherry-picking.
- The single restriction beyond the literal text (time-homogeneity /
  schedule-independence) is standard for a *structural* notion of factorization
  and is independently motivated (a factorization that may change every step or
  per schedule is a lookup table, not a decomposition).
- The bound is **label-free** (uses only `K`), analytic, with explicit closed
  form, and **robust to nonlinear** factorizations — it is not a knife-edge.
- The result degrades gracefully across the class lattice
  (`0 <= sqrt7/14 <= delta_int(D*) <= sqrt3/4`), which is the signature of a
  well-posed (not rigged) criterion.

### 4.2 Where a referee can still push

- **Structural vs behavioral integration.** A skeptic of operational
  non-simulability will argue that if the observable history can be reproduced
  by *some* product-latent model plus a fixed decoder, the system is
  "effectively simulable". That is the `D_approx` intuition. `Iint` as written
  is a **structural** (no decomposition reproduces histories with split
  readouts) criterion, not a **behavioral simulability** criterion. This is a
  legitimate modeling choice but a referee may call it narrow. The corpus must
  own this choice explicitly rather than let it ride on definitional ambiguity.
- **Under-specified canonical text.** `def:iint` does not currently state
  (i) whether `psi` may be a nonlinear homeomorphism, (ii) that the
  factorization must be time-homogeneous and schedule-independent, (iii) that no
  reconstruction decoder is admitted, (iv) the nontriviality convention
  (both factors non-singleton, both readout groups non-empty), or (v) the
  search-space normalization that makes the infimum meaningful. Until these are
  fixed in the source, the positive result is a **conditional theorem about
  `D*`**, not a certification of the canonical `Iint`.

### 4.3 Verdict on defensibility

```text
D* IS DEFENSIBLE AS THE FAITHFUL READING, NOT AD-HOC,
BUT THE CLOSURE IS CONDITIONAL ON TIGHTENING def:iint.
```

It is not ad-hoc because it is the literal text minus an unauthorized decoder.
It is conditional because the literal text is under-specified on points (i)-(v),
and a different (also literal-ish) reading (`D_approx`) yields the opposite
verdict. The choice between them is a genuine modeling decision the corpus must
make **in the source**, not a fact this analysis can settle unilaterally.

---

## 5. Verdict

```text
IINT_CANONICAL_CLASS_CANDIDATE:
  D* = non-trivial product structure psi:A->A_1xA_2 (poss. nonlinear),
       autonomous decomposed factor dynamics,
       split readouts R = R_1 \sqcup R_2 (NO reconstruction decoder),
       time-homogeneous and schedule-independent.

DELTA_INT_VERDICT:
  CLOSED_INTERNAL_UNDER_D*
  delta_int(D*) >= sqrt(7)/14 ~= 0.18898   (analytic, label-free lower bound)
  sqrt(7)/14 <= delta_int(D*) <= sqrt(3)/4  (proven enclosing interval)
  exact reproduction by a non-trivial D* factorization is impossible.

CONDITIONALITY:
  Positive only under the faithful split-readout, decoder-free, time-homogeneous
  reading. Under D_approx (decoder-coupled) the same carrier gives delta_int = 0.
  The verdict is therefore CLASS-DETERMINED, not absolute.

REFEREE DEFENSIBILITY:
  DEFENSIBLE (faithful reading of def:iint, not ad-hoc),
  CONDITIONAL on tightening def:iint to fix points (i)-(v) of section 4.2.

FULL_COP_MEMBERSHIP: NOT_YET   (unchanged)
```

---

## 6. Required canonical clarifications (debt, not strengthening)

To make the `D*` closure unconditional and referee-proof, `def:iint` in
`basecore/core/sections/07_operational_criterion_absorbed.tex` would need (this
is a **documentation/precision** debt, it does not strengthen any claim):

1. State that the factorization map is fixed, time-homogeneous, and
   schedule-independent.
2. State that `R = R_1 \sqcup R_2` are split readouts reproducing the original
   readout histories, with **no** reconstruction decoder between latent factors
   and reproduced histories.
3. Fix the nontriviality convention: both factors non-singleton and both readout
   groups non-empty.
4. Define the admissible factorization search space (compact/normalized) so the
   infimum `delta_int` is meaningful.
5. State explicitly that `Iint` is a **structural** (decomposition) criterion,
   distinct from behavioral simulability, and that a positive `delta_int` is
   class-relative.

Any such edit is a Phase-2/Phase-4 governance action on canonical `.tex` and is
**out of scope here** (not performed): it must go through the phase protocol,
external audit, and human approval. This document only records the analysis and
the recommendation.

---

## 7. Non-Conclusions

- This does not certify `Iint` for the canonical (un-tightened) definition.
- This does not certify `Crit_op` or change `FULL_COP_MEMBERSHIP: NOT_YET`.
- This is internal model-conformity analysis, not external validation.
- This implies nothing about consciousness, identity, subjectivity,
  phenomenality, CCR, `I_int`, or no-vacuity.
- The lower bound `sqrt(7)/14` is conservative and not claimed tight.
- The Lean status is now split:
  `QICNRotationSpectral.lean` mechanizes the exact real-line-invariant split
  obstruction, and `QICNCoupledSplitMargin.lean` mechanizes the quantitative
  fiber-thinness plus corner-chain kernel yielding `sqrt(7)/14` from explicit
  fiber hypotheses. The global quantifier over all admissible `D*`
  factorizations remains documented, not mechanized.

## 8. Recommended next steps

1. Human decision on the canonical reading (`D*` vs `D_approx` vs behavioral
   simulability). This is the real open modeling decision and is not delegable
   to tooling.
2. If `D*` is adopted: open a scoped Phase-2/4 ticket to add clarifications
   (section 6) to `def:iint` under the audit-before-push protocol.
3. Optional formalization: mechanize the remaining global step from an
   arbitrary admissible `D*` factorization to the explicit fiber/corner
   hypotheses consumed by `coupled_split_readout_positive_margin`. This is the
   remaining formal gap; do not present the current Lean kernel as a full
   canonical `Iint` closure.
