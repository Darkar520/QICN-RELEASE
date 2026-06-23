> **SUPERSEDED (2026-06-23).** Este an�lisis fue producido durante la
> exploraci�n de H5 convexo y la lectura D*/Iint. Las decisiones definitivas se
> adoptaron en:
> - QICN_H5_PARTIAL_REGIME_MODELING_DECISION.md (H5: r�gimen (a) snN=�)
> - QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md (Iint: D* adoptado)
>
> Este archivo se conserva como registro hist�rico del red-team adversarial.
> No es el estado actual del framework.

---
# QICN Iint Global-Quantifier Red-Team (Internal Adversarial)

Seal: `INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION`

`external_support_certified = false`

Layer: `SPECULATIVE / NON_CANONICAL`

`NEW_CLAIM = none`

`FULL_COP_MEMBERSHIP: NOT_YET`

Status: `NON_CANONICAL_SPECULATIVE_INTERNAL_ANALYSIS`

Date: 2026-06-20

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Role: internal hostile referee (red-team). A negative result or `STILL_OPEN`
was an admissible, indeed preferred, outcome over a forced closure. This is
not external validation, not peer review, and does not certify `Iint`,
`Crit_op`, consciousness, identity, subjectivity, phenomenality, CCR, or
no-vacuity. It is internal scrutiny with referee rigor.

---

## 0. Target

Attack the **global quantifier** of `Iint` under the adopted canonical
structural class `D*` for the coupled carrier. The exact open question:

> Can the step "for EVERY admissible `D*` factorization → the history-reproduction
> margin is `≥ δ_int > 0`" be formalized/proved, WITHOUT smuggling the result
> into the definition (no gerrymandering of the class)?

Prior state (verified by building the repo, not assumed):

- The Lean kernel `QICNCoupledSplitMargin.lean` mechanizes only the
  *hypothesis-conditioned* fiber/corner arithmetic: `coupled_psi1_fiber_thin`,
  `coupled_psi2_fiber_thin` (each takes the `2ε` coordinate bounds as explicit
  hypotheses), and `coupled_split_readout_positive_margin` (takes the corner
  chain `diam ≤ 2·(4√7·ε)` as an explicit hypothesis) to conclude `√7/14 ≤ ε`.
- `QICNRotationSpectral.lean` mechanizes only the *exact* obstruction
  (`rotation_contraction_no_invariant_line`): no real invariant line for the
  non-real scalar.
- The universal quantifier over all `D*` factorizations was documented as a
  hypothesis-to-kernel gap, **not** mechanized.

## 1. The hostile referee challenge (faced, not dodged)

1. **Vacuity-of-quantifier.** "You only proved the bound GIVEN the fiber/corner
   hypotheses. You never proved those hypotheses hold for every `D*`
   factorization. The theorem is vacuous with respect to the real quantifier."

2. **Gerrymandering.** "How do I know `D*` is not rigged to yield `√7/14`?
   Maybe some admissible `D*` factorization — nonlinear `ψ`, or clever split
   readouts — reproduces histories with error `< √7/14`, or drives the infimum
   to `0`."

3. **Ill-posed search space.** "Is the factorization search space
   normalized/compact so the infimum is meaningful, or is it a malformed
   class?"

## 2. The attempt (Lean mechanization)

New non-canonical file:
`docs/ai-platform-outputs/formal/lean/QICNLean/QICNCoupledSplitMarginUniversal.lean`
(imported in `QICNLean.lean`; existing `.lean` files untouched).

### 2.1 Admissibility layer as a structure

`D*` is transcribed as a Lean `structure DStarFactorization` with fields:

```text
ε        : ℝ                      -- reproduction margin (the lower-bounded quantity)
hε       : 0 ≤ ε
gamma    : ℂ                      -- fixed forcing constant for the t=0→1 step
Data1,2  : Type                   -- arbitrary factor state types
data1,2  : ℂ → Data1/Data2        -- ψ₁, ψ₂ : arbitrary, possibly NONLINEAR projections
obs1,2   : ℕ → Data1/Data2 → ℝ    -- split reconstruction maps: each reads ONE factor only
reproduces : ∀ x ∈ A, ∀ t,        -- coordinate-aligned, decoder-free reproduction within ε
   |(traj t x).re - obs1 t (data1 x)| ≤ ε ∧ |(traj t x).im - obs2 t (data2 x)| ≤ ε
corner   : ∀ y z ∈ A, ∃ w ∈ A, data1 w = data1 y ∧ data2 w = data2 z
```

with the true coupled dynamics `coupledTraj`: `x₀ = x`,
`x_{t+1} = (rotationContractionScalar)·x_t + gamma`, and the support
`inAnnulus x := 1/2 ≤ ‖x‖ ≤ 2`.

Key design points for honesty:

- `data1/data2` and `obs1/obs2` are **arbitrary** functions over **arbitrary**
  types. Nonlinear `ψ` and arbitrary (nonlinear) split readouts are covered.
  This directly addresses challenge 2's "nonlinear / clever" worry inside the
  class.
- The autonomy + split structure is encoded by the *typing* alone: `obs1 t`
  consumes only `data1 x`, never `data2 x` (and symmetrically). No field mixes
  the two factors. There is no reconstruction-decoder field. This is the
  `D_approx` loophole being closed by construction, exactly as the adopted `D*`
  requires.
- **No field encodes "‖displacement‖ is small."** The fiber/corner thinness is
  *derived* in the proof, not assumed.

### 2.2 The universal theorem (mechanized, build green)

```text
theorem dstar_universal_margin (F : DStarFactorization) :
    Real.sqrt 7 / 14 ≤ F.ε
```

There are **no per-factorization fiber hypotheses** in the statement. The proof:

1. picks the two antipodal radius-2 support points `y = 2`, `z = -2`
   (`‖y - z‖ = 4 = diam A`);
2. obtains the corner `w` (shares factor-1 data with `y`, factor-2 data with
   `z`) from the `corner` field;
3. **derives** `|（y-w).re| ≤ 2ε` and `|(K·(y-w)).re| ≤ 2ε` from `reproduces`
   at `t=0,1` using `data1 y = data1 w` (the forcing `gamma` cancels in the
   difference), then feeds the kernel `coupled_psi1_fiber_thin` to get
   `‖y - w‖ ≤ 4√7·ε`;
4. symmetrically derives `‖w - z‖ ≤ 4√7·ε` via `coupled_psi2_fiber_thin`;
5. triangle-chains to `4 = ‖y - z‖ ≤ 8√7·ε`, then `coupled_split_readout_positive_margin`
   yields `√7/14 ≤ ε`.

Build: `lake build` → `Build completed successfully (2303 jobs)`, EXIT 0.

`#print axioms`:

```text
'QICNLean.dstar_universal_margin'              : [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_psi1_fiber_thin'             : [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_psi2_fiber_thin'             : [propext, Classical.choice, Quot.sound]
'QICNLean.coupled_split_readout_positive_margin': [propext, Classical.choice, Quot.sound]
```

No `sorry`, no extra axioms.

### 2.3 What this does and does not settle

- Challenge 1 (vacuity): **defeated within the class.** The fiber/corner
  bounds are now derived from the structural fields; the theorem is a genuine
  `∀ F : DStarFactorization`, not a conditional on fiber hypotheses.
- Challenge 2 (gerrymandering by nonlinear/clever factorizations):
  **defeated within the class.** No choice of (arbitrary, possibly nonlinear)
  `data1/data2/obs1/obs2` can beat `√7/14`; the bound is uniform over the
  entire structure.
- Challenge 3 (ill-posed search space): **sidestepped honestly.** Because the
  lower bound is *uniform* (`√7/14 ≤ F.ε` for every `F`), the infimum over the
  class is `≥ √7/14 > 0` regardless of whether the search space is
  compact/normalized. Positivity of the infimum does not depend on attainment.

## 3. The residual gerrymandering surface (the honest core)

The single load-bearing modeling commitment is the `reproduces` field: it
hard-codes the **coordinate-aligned** split — factor 1 reconstructs the real
coordinate, factor 2 the imaginary coordinate, in a fixed orthonormal frame.

Defense of this field (why it is faithful, not rigged):

- It is the adopted-`D*` reading from
  `QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md` (observation
  `= (R₁(p_t), R₂(q_t))`, decoder-free), human-decision-recorded 2026-06-19.
- It is WLOG **among orthonormal frames**: multiplication by the non-real
  scalar `c = 1/8 + (√3/8)i` is the identical block `[[a,-b],[b,a]]` in every
  orthonormal basis, so the coupling `b ≠ 0` (hence the `4√7` constant) is
  frame-independent. A rotated coordinate split gives the same bound.

Why it is nonetheless **not** a clean canonical closure:

- The choice "split a 2-D full-state readout *coordinatewise* (one scalar dof
  per factor)" is a **definitional disambiguation** of the under-specified
  canonical `def:iint`. The current canonical text says `R = R_1 ⊔ R_2` over the
  *given* readout family `{r_id, r_norm, r_phase}`, in which `r_id` is a single
  2-D readout. Two other literal-ish readings exist and give opposite verdicts:
  - **decoder-coupled** (`D_approx`): `δ_int = 0` (history reconstructed at
    decode time);
  - **literal-partition** of the given family: `r_id` cannot be assigned to one
    proper factor, so `Iint` passes *vacuously* — declared NOT defensible.
- The coordinate-split disambiguation is exactly item (i)–(v) of section 4.2 /
  section 6 ("Required canonical clarifications") of the canonical-class doc:
  it is documentation/precision debt **not yet** in the source `def:iint`.

Anti-gerrymandering ruling: pinning `reproduces` to the coordinate-aligned
split to make the universal go through is a **definitional commitment beyond the
current canonical text**. Per the red-team guard, adopting it unilaterally as a
canonical CLOSED would be smuggling the result into the definition. Therefore
the canonical-level verdict must not be CLOSED. The mechanized universal is
honest **only relative to the explicitly stated `DStarFactorization`
structure**, whose disambiguating field is exposed in plain sight rather than
hidden in ad-hoc hypotheses.

## 4. Verdict

```text
PER-LAYER VERDICT:

  Relative to the explicitly specified structure DStarFactorization
  (the adopted, human-recorded D* reading):
      CLOSED_INTERNAL_UNDER_ADOPTED_D*
      - genuine ∀-quantifier mechanized (dstar_universal_margin)
      - no per-factorization fiber hypotheses
      - covers arbitrary nonlinear ψ and arbitrary nonlinear split readouts
      - uniform bound √7/14 ≤ ε ⇒ class infimum ≥ √7/14 > 0
      - build green, #print axioms = [propext, Classical.choice, Quot.sound]

  Relative to the canonical (un-tightened) def:iint:
      STILL_OPEN
      Exactly-missing structure: a non-gerrymandered derivation that EVERY
      admissible factorization under the *canonical text* induces the
      coordinate-aligned reproduction field `reproduces`. This requires
      disambiguating "R = R_1 ⊔ R_2 reproducing a 2-D full-state readout" into
      the coordinatewise, decoder-free reading. That disambiguation is the
      pre-existing def:iint precision debt (canonical-class doc §4.2/§6), not a
      fact tooling can settle. Adopting it to force closure would be
      gerrymandering.

OVERALL INTERNAL VERDICT: STILL_OPEN at the canonical level.
  The global quantifier is mechanized and non-vacuous over the adopted D*
  structure, but canonical closure is gated on a source-level disambiguation of
  def:iint that is out of scope here (Phase-2/Phase-4 governance action on
  canonical .tex, with audit-before-push and human approval).

NOT REFUTED: no admissible D*-structure factorization beating √7/14 was found;
  on the contrary, none can exist within the structure (uniform lower bound).
  The refutation route therefore fails — the carrier is NOT shown to fail Iint
  under the adopted structural reading.

NOT EXTERNAL_REQUIRED: the open step is an internal modeling/precision decision
  on def:iint, not an externally-undecidable question. It is closable
  internally by a scoped canonical edit under the phase protocol.
```

## 5. Exactly what is still missing (for a future canonical closure)

To upgrade `CLOSED_INTERNAL_UNDER_ADOPTED_D*` to a canonical closure WITHOUT
gerrymandering, the source `def:iint` would need (precision debt, NOT a
strengthening):

1. State that the factorization is fixed, time-homogeneous,
   schedule-independent (already in `D*`, not yet in source).
2. State that `R = R_1 ⊔ R_2` reconstructs the full-state readout
   **coordinatewise and decoder-free** (each ambient coordinate from exactly one
   factor), in a fixed orthonormal frame.
3. Fix the nontriviality convention (both factors non-singleton, both readout
   groups non-empty).
4. Define the admissible search space so the infimum is well-posed (the uniform
   bound makes this optional for positivity, but it remains good hygiene).
5. State explicitly that `Iint` is a **structural** criterion, distinct from
   behavioral simulability; a positive `δ_int` is class-relative.

Only item 2 is the genuinely load-bearing one for the quantifier. Until it is in
the source, the universal stays a conditional theorem about `D*`, mechanized
here, not a certification of canonical `Iint`.

## 6. Non-conclusions

- This does not certify `Iint` for the canonical (un-tightened) definition.
- This does not certify `Crit_op` and does not change `FULL_COP_MEMBERSHIP:
  NOT_YET`.
- This is internal adversarial analysis, not external validation or peer
  review.
- This implies nothing about consciousness, identity, subjectivity,
  phenomenality, CCR, or no-vacuity.
- The lower bound `√7/14` is conservative and not claimed tight.
- The mechanized universal is genuine but class-relative; its faithfulness to
  the canonical text rests on a disambiguation that is still source-level debt.

## 7. Artifacts

- Lean: `docs/ai-platform-outputs/formal/lean/QICNLean/QICNCoupledSplitMarginUniversal.lean`
  (new; imported in `QICNLean.lean`).
- Reused kernel (unchanged): `QICNCoupledSplitMargin.lean`,
  `QICNRotationSpectral.lean`.
- Build: `lake build` EXIT 0, `Build completed successfully (2303 jobs)`.
- Axioms: `[propext, Classical.choice, Quot.sound]` for all four named theorems.
