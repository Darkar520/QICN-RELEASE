# Plan Implementacion FCR v13

Status: hybrid audit-to-implementation plan.

Date: 2026-05-25

Governing posture: objective, anti-sycophancy, anti-psychofancy, evidence-before-claims.

## 0. Boundary

FCR v13 does not claim empirical validation. It does not prove consciousness,
phenomenality, personal identity, moral status, human equivalence, or external
adjudication. This plan treats the Antigravity and OpenCode audits as audit
hypotheses to corroborate against the repository, not as authorities.

The objective of v13 is to convert the strongest confirmed audit findings into
a staged hardening pass that improves falsifiability, traceability, and formal
discipline without creating a new layer of documentary inflation.

## 1. Governance Preflight Used For This Plan

Local governance was checked before forming the plan:

- `.agent` and `.agents` were not present in this checkout.
- `.kilocode/rules/RCIC.md` was present and classifies `ULTRATHINK` as an
  explicit override requiring maximum depth and multi-dimensional analysis.
- Applicable skills:
  - `audit-context-building`: used for evidence-before-claims corroboration.
  - `advanced-evaluation`: used for severity triage and plan ranking.

Repo-local governing instruction applied:

> Raise the framework toward hard-science publishable standards. Flag
> metaphorical, philosophical, speculative, non-falsifiable, or non-formalized
> claims. Translate claims toward mathematics, algorithms, control theory,
> information theory, topology, dynamical systems, and statistics. Never invent
> metrics, results, or implementations.

## 2. Audit Inputs

This plan integrates two audit families, following the user-provided ordering:

- Audit A: Antigravity formal verification audit.
- Audit B: OpenCode formal and epistemic audit.

Both audits were useful. Neither is treated as final truth. Each claim below is
classified as confirmed, partially confirmed, or corrected by local evidence.

## 3. Current Baseline

Known baseline before v13 planning:

- FCR v12 exists as `docs/PLAN_IMPLEMENTACION_FCR_v12.md`.
- The global extractor is not currently safe as a whole-registry regeneration
  gate from this checkout. `docs/reports/EXTRACTOR_REPRODUCIBILITY_AUDIT.md`
  records committed registry counts of 745 formal entries and 432 macro entries,
  but fresh extraction from the current primary `.tex` set yields 585 and 325.
- Therefore, any instruction to run `npm run extract:registry` as a blind
  registry reset is rejected for v13. Source-scoped or purpose-built
  synchronization is allowed only with explicit diffs and fresh gates.

Working-tree caution:

- Existing report artifacts and auxiliary directories were already dirty before
  this plan artifact. v13 must not revert or overwrite unrelated changes.

## 4. Corroboration Matrix

| Audit claim | Local evidence checked | Status | v13 decision |
|---|---|---|---|
| All registered predictions are framework-internal. | `docs/PREDICTION_REGISTRY_v1.json` has 13 predictions, each `formalized_pending_preregistration`; Paper 6 remains primarily about framework classifications, gates, controls, and internal support. | Confirmed in practical sense, with nuance. | Create at least one external, non-framework-dependent prediction target. |
| Paper 6 LaTeX and prediction registry disagree. | Paper 6 matrix contains PRED-01 through PRED-10; JSON contains PRED-01, PRED-02, PRED-03, PRED-04a/b/c, PRED-05 through PRED-11. | Confirmed. | Reconcile by adding a source-of-truth mapping and a validator, not by blind extraction. |
| Paper 6 lacks explicit support/weakening/destruction language in the LaTeX matrix. | LaTeX uses `Failure / rival divergence`, `Strong refutation condition`, and `Downgrade condition`; JSON has explicit support/weakening/destruction fields. | Confirmed. | Align Paper 6 terminology with the registry schema. |
| PRED-02 has an ambiguity escape route. | Paper 6 text permits loss of certification or ambiguous boundary depending on pre-ablation margins. | Confirmed. | Freeze an ambiguity margin rule before any campaign. |
| `I_int` has weaker proof support. | Paper 5 `prop:integration-transfer` uses a verbal disjunction rather than a formal derivation. | Confirmed. | Either prove the result formally or downgrade the claim burden. |
| `prop:necessity` is definition-level. | Paper 5 proves necessity by conjunction in the definition of `\Cop`. | Confirmed, low severity. | Rename or annotate as definitional necessity, not structural discovery. |
| H5/non-collapse is theorem-valid but assumption-heavy. | BaseCore H5 excludes constant fixed points; `thm:noncollapse` proves non-collapse by contradiction against H5. | Confirmed. | Keep theorem, but label the epistemic content as assumption discharge, not discovered anti-collapse. |
| Computable witness stack is split. | Golden Mean witness explicitly does not certify H5; separate affine anti-collapse witness satisfies H1-H5. | Confirmed with nuance. | Add a unified-witness target only if it yields new value; do not pretend the gap is hidden. |
| Paper 8 has residual `Bridge Axiom` prose. | Paper 8 contains residual prose occurrences around the irreducibility and theorem sections. | Confirmed. | Clean prose normalization without touching theorem environments. |
| Paper 8 uses some loaded terms without local guards. | Several uses of `consciousness`, `qualia`, and burden language are not locally guarded in the same phrase. | Partially confirmed. | Tighten wording only where it reduces semantic drift. |
| Paper 8 coordinates are operationally underspecified. | Definitions are typed but often semantic rather than constructive. | Confirmed as a roadmap gap. | Add constructive coordinate specifications for the first three high-leverage coordinates. |
| Paper 9 has six bridge predicates on top of prior dimensions. | Paper 9 defines six bridge predicates and explicitly keeps BPF-2 through BPF-6 open. | Confirmed. | Reduce bridge risk by binding one predicate group to concrete intervention/comparator burden before adding more. |
| Paper 9 has no anti-sycophancy issue. | Paper 9 has strong non-claim grammar, but open burdens and predicate surface remain high risk. | Corrected. | Treat as disciplined but not empirically grounded. |
| Registry has no human-curated proved entries. | The registry contains draft/audit-overlaid statuses; proved entries are not human-curated. | Confirmed. | Create a curation protocol and curate a small critical batch first. |
| Monolithic compilation risk is only document-level YELLOW. | Audit reports 0 active semantic conflicts but shared preamble / unified volume are not certified. | Confirmed. | Keep `[~]` until primary sources and unified compile are actually tested. |

## 5. Corrections To The Audits

The following audit conclusions are useful but require correction before they
become implementation policy:

1. "Zero external predictions" should be read as: no externally adjudicable
   prediction currently has all of the following: non-framework observable,
   frozen dataset or target system, executable runner, rival execution, and
   decision record. The framework has scaffolds, not external evidence.

2. "Re-extract the registry from LaTeX" is unsafe in this checkout. The v12
   extractor audit shows non-reproducibility. v13 must first solve source
   presence and extractor fidelity before any whole-registry regeneration.

3. "Negative controls are complete" is too strong. Current controls are a
   static suite and harness definitions. They become complete only after
   fixtures, runner bindings, and decision records exist.

4. "Paper 9 is fully clean because it has disclaimers" is too charitable.
   Disclaimers block overclaim, but they do not solve testability. The bridge
   layer still needs executed comparator and intervention burdens.

5. "BaseCore lacks a single witness" must be stated carefully. The current
   corpus explicitly separates witness roles, and there is already a separate
   anti-collapse witness satisfying H1-H5. The improvement target is not
   honesty, but unification and exposition.

## 6. v13 Objective Ranking

| Rank | Objective | Why it matters | Success class |
|---|---|---|---|
| P0 | External prediction seed | Without one non-framework observable, falsifiability remains internal. | New PRED-EXT-01 scaffold with runner boundary. |
| P0 | Prediction source-of-truth reconciliation | JSON and Paper 6 cannot diverge silently. | Validator detects registry-vs-LaTeX drift. |
| P0 | Paper 8 semantic cleanup | Cheap, high-confidence reduction of term drift. | Local prose edits, gates clean. |
| P1 | `I_int` proof or downgrade | One of six constitutive invariants has asymmetric proof strength. | Formal lemma obligations or explicit open burden. |
| P1 | Registry curation seed | 239 proved entries with no curation is credibility debt. | First curated batch with reproducible metadata. |
| P1 | Constructive Paper 8 coordinates | Coordinates must become independently measurable. | Algorithms/toy cases for SelfIndex, Ownership, Irreducibility. |
| P2 | Bridge burden narrowing | Paper 9 surface is broad relative to testability. | One predicate group gets comparator + intervention design. |
| P2 | Unified witness target | Improves BaseCore exposition and mathematical confidence. | Optional theorem-facing construction, not required for current honesty. |

## 7. FCR v13 Implementation Phases

### Phase 0: Safe Baseline And Drift Guards

Objective: prevent v13 from corrupting derived artifacts or masking existing
dirty changes.

Actions:

1. Record `git status --short` before edits.
2. Run read-only corroboration commands for the target files before touching
   them.
3. Do not run `npm run extract:registry` as a whole-registry reset.
4. Preserve existing dirty report artifacts unless the phase explicitly owns
   them.

Verification:

```powershell
git status --short
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run verify:prediction-registry
npm run audit:extractor-reproducibility
```

Exit criteria:

- Corpus and macro gates remain clean.
- Extractor audit remains documented; if it still reports 585/325 fresh
  extraction, whole-registry extraction remains blocked.

### Phase 1: Paper 8 Local Semantic Cleanup

Objective: remove confirmed low-risk semantic drift in Paper 8.

Actions:

1. Replace residual prose `Bridge Axiom` references with `Axiom`.
2. Tighten unguarded or weakly guarded loaded terms:
   - `qualia` in abstract becomes a non-claim guarded phrase or `operational
     qualia` only if locally defined.
   - `consciousness burden` becomes `operational-consciousness burden` or
     `\Cop` burden where mathematically intended.
   - `life or consciousness burdens` becomes `operational life and
     operational-consciousness burdens`.
3. Do not alter theorem labels, axiom labels, or registry IDs in this phase.

Verification:

```powershell
Select-String -Path paper8_first_person_subjectivity\main.tex -Pattern 'Bridge Axiom|qualia|consciousness'
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
npm run lint:nonclaims
```

Exit criteria:

- No residual `Bridge Axiom` prose remains in Paper 8.
- Loaded terms are either guarded or intentionally present in non-claim
  contexts.
- No registry or macro regression.

### Phase 2: Prediction Canon Reconciliation

Objective: make Paper 6, `PREDICTION_REGISTRY_v1.json`, and the roadmap agree
about what predictions exist and what status they have.

Actions:

1. Create `docs/reports/PREDICTION_CANON_RECONCILIATION.md`.
2. List every prediction in:
   - Paper 6 LaTeX.
   - `docs/PREDICTION_REGISTRY_v1.json`.
   - preregistration files under `docs/preregistrations/`.
3. Classify each entry:
   - `latex_canonical`
   - `registry_extension`
   - `deprecated_or_split`
   - `missing_source`
4. Add or update a validator, preferably `scripts/validate-prediction-registry.js`,
   so it warns when registry IDs are absent from the declared canon map.
5. Avoid global extraction. If Paper 6 needs text edits, edit Paper 6 directly
   and update only dependent hand-authored docs.

Verification:

```powershell
npm run verify:prediction-registry
npm run lint:nonclaims
npm run verify:corpus-registry -- --strict-crossrefs
```

Exit criteria:

- PRED-04a/b/c and PRED-11 are no longer silent registry-only surprises; they
  are either formally documented as registry extensions or reconciled into the
  LaTeX.
- The prediction validator detects future drift.

### Phase 3: Paper 6 Falsification Grammar Hardening

Objective: close the strongest semantic escape routes in the prediction layer.

Actions:

1. Rename or augment Paper 6 matrix language:
   - `Failure / rival divergence` -> `Destruction condition / rival divergence`.
   - `Downgrade condition` -> `Weakening condition`.
   - Add explicit `Support condition` where absent.
2. Rewrite PRED-02 ambiguity logic:
   - Define a pre-ablation margin threshold slot `delta_amb`.
   - If pre-ablation margin exceeds `delta_amb`, failure to exit class is a
     destruction condition.
   - If pre-ablation margin is at or below `delta_amb`, the result is an
     explicit weakening or ambiguous decision state, not post-hoc support.
3. Mirror the same logic in `docs/PREDICTION_REGISTRY_v1.json`.
4. Update any preregistration template references so ambiguity is handled as a
   decision rule, not a rhetorical escape route.

Verification:

```powershell
npm run verify:prediction-registry
npm run lint:nonclaims
npm run verify:corpus-registry -- --strict-crossrefs
```

Exit criteria:

- Every prediction has support, weakening, and destruction semantics.
- PRED-02 cannot preserve itself by ambiguous-boundary reinterpretation after
  seeing a result.

### Phase 4: First External Prediction Seed

Objective: add one prediction that can be tested without adopting QICN's
internal vocabulary.

Minimum standard:

The prediction must have this shape:

```text
Given target system S of concrete type X, measured by independent instrument Y,
under intervention I, QICN predicts observable Z in interval [a,b] or with
effect direction d, while named rival R predicts Z' or no selective effect.
```

Candidate `PRED-EXT-01`:

- Target system: a small, fully specified computational system with externally
  observable transition traces and intervention hooks.
- External observable: perturbation-response selectivity measured as a
  pre-registered effect size on transition traces, not as `Cert(S)`.
- Intervention: targeted removal or perturbation of an identity-continuity
  channel.
- Rival: memory-only or complexity-only model matched on trace length and
  entropy.
- Destruction condition: rival predicts the external observable at equal or
  lower penalized loss, or QICN fails to predict the selective response.

Actions:

1. Create `docs/reports/EXTERNAL_PREDICTION_CANDIDATES.md`.
2. Select one candidate for `PRED-EXT-01`.
3. Add a draft registry entry marked `external_candidate_not_executed`.
4. Create `docs/preregistrations/PRED-EXT-01_prereg_v0.md`.
5. Define independent observables, rival predictions, and falsifiers.
6. Do not mark it as support or evidence.

Verification:

```powershell
npm run verify:prediction-registry
npm run lint:nonclaims
```

Exit criteria:

- A reviewer can identify what is measured without accepting QICN terms.
- The prediction can fail in a way that forces downgrade or abandonment of the
  relevant claim family.

### Phase 5: `I_int` Formal Hardening

Objective: resolve the asymmetric proof status of causal integration.

Two acceptable outcomes:

Outcome A: Formal proof path.

1. Define exact factorization as a typed product decomposition.
2. Define intervention-response preservation across factors.
3. Prove a lemma of the form:

```text
If exact factorization preserves identity object, continuity, and legibility
under matched interventions, then the factorization is trivial.
```

4. Use the lemma to strengthen `prop:integration-transfer`.

Outcome B: Downgrade path.

1. Reclassify `prop:integration-transfer` as conditional/open-burden if no
   formal proof can be produced cleanly.
2. Update registry status and claim ledger.
3. State explicitly that `I_int` is a constitutive invariant with an independent
   proof burden.

Verification:

```powershell
npm run verify:corpus-registry -- --strict-crossrefs
npm run extract:claim-ledger
npm run lint:nonclaims
```

Exit criteria:

- The framework no longer presents a verbal disjunction as a closed formal
  proof.

### Phase 6: Registry Curation Seed

Objective: move registry credibility from "machine extracted" toward curated
mathematical accountability.

Scope:

Do not attempt all 745 entries in one pass. Curate a first batch of 25 high
impact entries:

- BaseCore H1-H5 and core theorems.
- Paper 5 six invariant definitions and core propositions.
- Paper 6 prediction records.
- Paper 8 self-index, ownership, irreducibility.
- Paper 9 predicate definitions and BPF status declarations.

Actions:

1. Create `docs/reports/REGISTRY_CURATION_PROTOCOL.md`.
2. Define curation statuses:
   - `draft_extracted`
   - `audit_overlaid`
   - `human_reviewed_formal`
   - `human_reviewed_dependency_complete`
   - `rejected_or_downgraded`
3. Add a curation snapshot artifact, not manual ad-hoc edits to the full
   registry unless the schema and validator support it.
4. Create `docs/reports/REGISTRY_CURATION_BATCH_001.md`.
5. Record proof presence, dependency completeness, and open concerns.

Verification:

```powershell
npm run verify:corpus-registry -- --strict-crossrefs
npm run analyze:impact -- --audit-overlays
```

Exit criteria:

- At least 25 high-impact entries have traceable curation notes.
- No registry status is upgraded without line-level evidence.

### Phase 7: Constructive Paper 8 Coordinate Specifications

Objective: convert the most important Paper 8 coordinates from semantic
definitions into computable procedures.

Initial coordinate batch:

1. Self-index.
2. Ownership field.
3. Irreducibility margin.

For each coordinate, add:

- Domain and codomain.
- Required input trace or artifact.
- Estimator.
- Failure case where value is zero or below threshold.
- Positive toy case where value is non-zero.
- Rival that could mimic the coordinate.
- Why the estimator is not evidence of phenomenality.

Artifacts:

- `docs/reports/PAPER8_COORDINATE_CONSTRUCTIVE_SPEC.md`
- Optional toy fixture under `artifacts/coordinate_specs/` only if it is
  reproducible and small.

Verification:

```powershell
npm run lint:nonclaims
npm run verify:corpus-registry -- --strict-crossrefs
```

Exit criteria:

- A third party can compute at least the first three coordinate estimates on a
  toy trace without private explanation.

### Phase 8: Paper 9 Bridge Surface Narrowing

Objective: reduce the 24-dimensional tower risk by binding one bridge predicate
group to a concrete comparator and intervention design before expanding further.

Recommended first group:

- `Pi_D` / phenomenal differentiation predicate, because it can be attacked by
  semantic-density and report-richness rivals without requiring embodied closure.

Actions:

1. Create `docs/reports/PAPER9_BRIDGE_BURDEN_NARROWING.md`.
2. Select one predicate group.
3. Define:
   - bridge observable family,
   - matched intervention,
   - strongest rival,
   - penalized loss,
   - destruction condition,
   - open thresholds.
4. Reclassify any broad bridge claims that outrun this selected burden as
   formal-program claims only.
5. Do not attempt BPF-2 through BPF-6 in one pass.

Verification:

```powershell
npm run lint:nonclaims
npm run verify:prediction-registry
```

Exit criteria:

- The bridge layer becomes narrower and more falsifiable, not broader and more
  rhetorical.

### Phase 9: BaseCore Witness Exposition

Objective: improve the witness story without erasing the current honest split.

Actions:

1. Create a short note or remark clarifying:
   - Golden Mean witness certifies typed transition grammar and contraction.
   - Affine anti-collapse witness certifies H1-H5.
   - The theorem stack is consistent, but H5 remains a substantive assumption.
2. Optional theorem-facing target: construct a single model that simultaneously
   carries the symbolic/typed richness of the Golden Mean example and the
   anti-collapse property of the affine witness.
3. If no elegant model is found, do not force one.

Verification:

```powershell
npm run verify:corpus-registry -- --strict-crossrefs
```

Exit criteria:

- Readers cannot mistake H5 discharge for an empirical discovery or hidden
  proof of anti-collapse from H1-H4.

### Phase 10: Roadmap Synchronization

Objective: keep the living falsifiability roadmap honest.

Actions:

1. Update only Section 13 of
   `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`.
2. For each touched item, record:
   - state `[ ]`, `[~]`, or `[x]`,
   - date `2026-05-25` or actual execution date,
   - command used,
   - evidence artifact,
   - epistemic limit.
3. Do not mark external validation as `[x]` unless independent adjudication
   exists.
4. Do not mark negative controls as `[x]` unless fixtures/runners/decision
   records exist.

Verification:

```powershell
npm run lint:nonclaims
npm run verify:prediction-registry
npm run verify:corpus-registry -- --strict-crossrefs
npm run verify:macro-registry
```

Exit criteria:

- Roadmap states match artifacts on disk and command outputs.

## 8. Proposed New Gates

These gates should be added only when their underlying artifacts exist.

| Gate | Purpose |
|---|---|
| `verify:prediction-canon` | Detect drift between Paper 6, registry JSON, and preregistration files. |
| `lint:loaded-terms` | Detect unguarded uses of consciousness, qualia, phenomenality, identity transfer, moral status, and human equivalence outside allowed contexts. |
| `verify:curation-coverage` | Report curation coverage by status and by high-impact entry family. |
| `verify:external-prediction` | Require non-framework observable, target system, intervention, rival prediction, and destruction condition for any `PRED-EXT-*`. |
| `verify:coordinate-specs` | Ensure Paper 8 coordinate specs include estimator, failure case, positive case, and rival. |

## 9. Severity Reconciliation

| Finding | Severity after corroboration | Reason |
|---|---|---|
| No externally adjudicable prediction | Critical | Blocks Popper-style external falsifiability. |
| Paper 6 registry-vs-LaTeX mismatch | Critical | Can corrupt preregistration and reviewer trust. |
| `I_int` proof weakness | High | Constitutive invariant with asymmetric proof burden. |
| Zero human-curated proved registry entries | High | Static validation is not mathematical review. |
| Paper 8 coordinate constructiveness | High | Independent measurement depends on constructive definitions. |
| Paper 9 bridge surface breadth | High | Guards are strong, but testability falls as dimensions stack. |
| PRED-02 ambiguity escape | High | Weakens falsification unless thresholded before execution. |
| Paper 8 residual Bridge Axiom prose | Low | Easy cleanup; not structurally dangerous. |
| Paper 5 definitional necessity | Low | True but should not be sold as structural discovery. |
| BaseCore H5 tautology framing | Moderate | The theorem is valid; the interpretation needs discipline. |

## 10. What v13 Must Not Do

- Do not claim external validation.
- Do not treat internal gates as empirical evidence.
- Do not run a simulated campaign and label it support.
- Do not execute blind whole-registry extraction while the extractor audit is
  non-reproducible.
- Do not mark a roadmap item `[x]` because a document exists. `[x]` requires
  the artifact, the gate, and the stated epistemic standard.
- Do not broaden Paper 9 with new predicates before narrowing one predicate
  into a testable burden.

## 11. Recommended Execution Order

1. Phase 0: baseline and drift guards.
2. Phase 1: Paper 8 local semantic cleanup.
3. Phase 2: prediction canon reconciliation.
4. Phase 3: Paper 6 falsification grammar hardening.
5. Phase 4: first external prediction seed.
6. Phase 5: `I_int` proof or downgrade decision.
7. Phase 6: registry curation seed.
8. Phase 7: Paper 8 constructive coordinate specs.
9. Phase 8: Paper 9 bridge surface narrowing.
10. Phase 10: roadmap synchronization.

Phase 9 may be executed whenever a clean BaseCore witness construction is
available. It is valuable, but less urgent than external prediction and
prediction-canon reconciliation.

## 12. Commit Discipline

Use one commit per phase:

```text
fcr(v13): paper8 semantic cleanup
fcr(v13): reconcile prediction canon
fcr(v13): harden paper6 falsification grammar
fcr(v13): add external prediction seed
fcr(v13): formalize i_int burden
fcr(v13): seed registry curation protocol
fcr(v13): add constructive paper8 coordinate specs
fcr(v13): narrow paper9 bridge burden
fcr(v13): sync falsifiability roadmap
```

Do not squash phases that have different epistemic status. A cleanup commit,
a registry-governance commit, and an external-prediction commit should remain
separately auditable.

## 13. Definition Of Done For v13

v13 is complete only when:

- Paper 8 residual semantic issues are cleaned without registry regressions.
- Prediction canon drift is documented and mechanically detectable.
- Paper 6 uses explicit support, weakening, and destruction semantics.
- PRED-02 ambiguity is thresholded before execution.
- At least one external prediction candidate is specified with a non-framework
  observable and named rival.
- `I_int` is either formally strengthened or honestly downgraded.
- A first registry curation batch exists with line-level evidence.
- Roadmap Section 13 reflects exactly what was completed and what remains
  partial.

Even then, v13 still does not make QICN empirically confirmed. It makes the
next empirical step cleaner, more falsifiable, and harder to inflate.
