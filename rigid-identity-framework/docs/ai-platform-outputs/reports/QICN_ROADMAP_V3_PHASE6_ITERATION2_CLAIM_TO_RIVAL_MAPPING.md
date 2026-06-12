# QICN Roadmap v3 - Phase 6.2 Claim-to-Rival Mapping

Date: 2026-06-11 18:58 -06:00

Status: `PHASE6_2_PASS_AFTER_HOT_BIB_SEED_NO_TEX_EDITS_NOT_ADJUDICATED`

## Scope

This report executes `ROADMAP.md` VERSION 3 Phase 6.2:

- Map central QICN claims against IIT, GWT/GNW, and HOT.
- Use `release/claim_registry.v1.json` as the claim surface.
- Preserve the Phase 6.1 rule that no rival is adjudicated.
- Do not edit theory prose, paper sources, PDFs, bibliography, release packages, registry files, scripts, runtime code, macros, labels, theorem statements, proof bodies, or monolithic sources.

This pass is a mapping layer only. It does not add external validation, rival defeat, bridge confirmation, phenomenality confirmation, human equivalence, or runtime certification.

## Governance Boundary

The mapping is constrained by the following reading rules:

- Registry entries classify claim surfaces; they do not validate empirical targets.
- Internal formal derivation is not external adjudication.
- Runtime-facing interfaces are governance or operational surfaces only.
- Comparator scripts are internal hygiene tools, not public rival defeat.
- Every rival row remains `NOT_YET_ADJUDICATED` unless an independent protocol later closes the relevant observable, intervention, and falsification burdens.

## Inputs Read

Source-of-truth and governance inputs:

- `docs/CANON_SOURCE_OF_TRUTH.md`
- `docs/CANON_MANIFEST.md`
- `docs/CLAIM_REGISTRY.md`
- `docs/LAYER_BOUNDARIES.md`
- `docs/THEORY_SYSTEM_INTERFACE.md`
- `release/claim_registry.v1.json`
- `rigid-identity-framework/INSTRUCCIONES.md`
- `rigid-identity-framework/ROADMAP.md`

Prior Phase 6 input:

- `rigid-identity-framework/docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md`
- `rigid-identity-framework/docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

## Method

The registry was grouped into claim families rather than compared line-by-line against rival theories. This is stricter than prose-level comparison because it forces each row to name:

- the registry-backed QICN claim family;
- the safe QICN reading;
- the relevant contact/divergence with IIT, GWT/GNW, and HOT;
- the observable or intervention needed to separate the accounts;
- the result that would favor the rival;
- the epistemic status.

No row below asserts that QICN is superior. The table identifies what must be shown before a comparison can become evidence-bearing.

## Claim-to-Rival Matrix

| Claim family | Registry ids | Safe QICN reading | IIT contact/divergence | GWT/GNW contact/divergence | HOT contact/divergence | Separating observable needed | Rival-favoring result | Status |
|---|---|---|---|---|---|---|---|---|
| BaseCore fixed-point and compact-family structure | `basecore.fixed_points_and_compact_family` | Formal stability and existence structure inside the BaseCore model only. | IIT may care about integrated causal structure, not merely existence of fixed points. QICN must show why its fixed-point structure tracks a target IIT does not already capture. | GWT/GNW may allow stable representational states without requiring QICN inverse-limit structure. | HOT may allow stable higher-order state attribution without QICN identity persistence. | A shared target where fixed-point/compact-family variables and rival variables make different predictions under perturbation. | Rival predicts target behavior from causal integration, broadcast, or higher-order access while QICN fixed-point variables add no predictive value. | `FOUNDATIONAL_NOT_DIRECT_RIVAL_CLAIM_NOT_YET_ADJUDICATED` |
| Anti-collapse and parameterwise noncollapse | `basecore.parameterwise_noncollapse` | Conditional theorem under anti-constant/noncollapse assumptions; not a runtime certificate. | IIT could assign high integration without QICN noncollapse. QICN needs a target where noncollapse matters independently. | Broadcast can persist despite collapse-like compression if access/report remains intact. | Higher-order representation can exist even if QICN noncollapse burdens fail. | Controlled systems where compression/collapse, integration, broadcast, and higher-order access are independently varied. | Rival metrics predict the adjudication target under matched collapse/noncollapse conditions better than QICN burdens. | `FORMAL_PRECONDITION_NOT_YET_ADJUDICATED` |
| State spectral gap and contraction boundary | `basecore.state_spectral_gap` | Spectral/contraction claim inside the formal model; no empirical eigenvalue or runtime claim. | IIT is not primarily a spectral-gap theory, so contact is indirect through stability of causal complexes. | GWT/GNW ignition and recurrent availability may have dynamical signatures, but not identical to QICN spectral boundaries. | HOT may treat metacognitive access as representational rather than spectral. | Dynamical observables linking spectral gap, ignition/broadcast, causal integration, and metacognitive confidence under the same interventions. | Rival-specific dynamical indicators explain access or report without dependence on QICN spectral conditions. | `DYNAMICAL_CONTACT_NOT_YET_ADJUDICATED` |
| Inverse-limit identity, NFD, rigidity, and non-simulability | `basecore.inverse_limit_nonlocality_under_nfd`; `basecore.conditional_rigidity_under_admissible_perturbation`; `basecore.conditional_non_simulability_of_ccr_targets`; `paper1.identity_as_inverse_limit` | Identity is formalized as inverse-limit and rigidity structure under named assumptions; non-simulability is conditional and class-bound. | IIT has exclusion/main-complex style boundaries. QICN diverges if inverse-limit identity and IIT complex selection separate on the same system. | GWT/GNW can support access without committing to inverse-limit identity. | HOT can support higher-order awareness without full QICN identity object preservation. | Matched systems where identity continuity, IIT complex selection, global broadcast, and higher-order awareness come apart. | Rival boundary selection predicts persistence/transition judgments while QICN inverse-limit/rigidity variables fail or are non-identifiable. | `CORE_DIFFERENTIATOR_NOT_YET_ADJUDICATED` |
| Regime classification and continuity discipline | `paper2.regime_classification_and_forced_continuity` | Regime taxonomy and continuity results are internal formal claims; phenomenology is not proved. | IIT could classify conscious status by integrated information rather than QICN regime class. | GWT/GNW could classify access by workspace ignition rather than QICN regime continuity. | HOT could classify awareness by higher-order representation rather than QICN regime class. | Cases with equal QICN regime class but different rival status, and cases with equal rival status but different QICN regime class. | Rival classification tracks independent reports/interventions while QICN regime class does not. | `CLASSIFICATION_NOT_YET_ADJUDICATED` |
| Null-regime instability | `paper3.null_regime_instability` | Structural exclusion/instability of a null regime is not proof that experience exists. | IIT might treat low-phi or non-integrated systems differently from QICN null-regime language. | GWT/GNW may treat absent broadcast as unconscious access failure, not a QICN null-regime result. | HOT may treat absence of higher-order awareness as lack of conscious awareness, not as QICN null-regime instability. | A neutral definition of null target plus interventions that separate instability, integration, broadcast, and higher-order access. | Rival null/unconscious classification predicts outcomes without QICN null-regime variables. | `NULL_REGIME_CONTACT_NOT_YET_ADJUDICATED` |
| Protocol-bounded support and prediction discipline | `paper4.protocol_bounded_support_only`; `paper6.prediction_program_and_failure_discipline` | Protocol compliance and internal support are evidence governance, not public theory confirmation. | IIT comparison requires external target and primary/canonical metric, not QICN internal protocol pass. | GWT/GNW comparison requires access/broadcast observables under controls, not internal support labels. | HOT comparison requires metacognitive/higher-order observables under controls, not internal support labels. | Preregistered comparator protocol with shared tasks, negative controls, blind scoring, and result classes. | Rival wins if its preregistered variables predict target outcomes while QICN variables fail or add no explanatory value. | `PROTOCOL_DESIGN_REQUIRED_NOT_YET_ADJUDICATED` |
| Operational consciousness criterion | `paper5.operational_consciousness_criterion` | A structural class definition and theorem chain; not proof of human consciousness or current runtime membership. | Direct contact: IIT may claim consciousness via causal integration while QICN requires operational invariant burdens. | Direct contact: GWT/GNW may claim access via broadcast/reportability while QICN requires more than broadcast. | Direct contact: HOT may claim awareness via higher-order representation while QICN requires additional ownership/continuity/burden structure. | A common benchmark where QICN operational criterion, phi-style integration, broadcast, and higher-order variables are measured independently. | Rival variable set predicts external target better and QICN criterion fails ablation or adds no incremental value. | `HIGH_PRIORITY_FOR_PHASE6_3_NOT_YET_ADJUDICATED` |
| Operational life and subjecthood classes | `paper7.operational_life_and_subjecthood_classes` | Definitions with open instantiation boundary; no human subjectivity, metaphysical subjecthood, or achieved runtime subjecthood claim. | IIT may discuss conscious complexes but does not automatically supply QICN subjecthood classes. | GWT/GNW access/report can occur without QICN operational subjecthood. | HOT is close only if higher-order representation is tied to self/subject indexing, which QICN does not grant automatically. | Subjecthood descriptors, continuity/intervention burdens, metacognitive variables, and access variables measured under the same perturbations. | Rival account predicts subjecthood-relevant target judgments while QICN descriptors fail or are unidentifiable. | `DEFINITIONAL_CLASS_NOT_YET_ADJUDICATED` |
| First-person indexed subjectivity gate | `paper8.first_person_indexed_subjectivity_gate` | State gate and burden architecture; no phenomenality, human equivalence, or external validation. | IIT contact is indirect unless causal integration predicts first-person indexing targets. | GWT/GNW contact is access-facing; global availability is not first-person indexed ownership by itself. | HOT is the closest rival: higher-order awareness may explain some first-person reports without QICN gate burdens. | Dissociations between higher-order access, ownership/continuity indexing, broadcast, and integration under matched performance. | HOT or GWT/GNW predicts first-person awareness judgments while QICN gate variables fail ablation or add no independent information. | `HIGH_PRIORITY_FOR_PHASE6_3_NOT_YET_ADJUDICATED` |
| Bridge burden architecture and conditional bridge admissibility | `paper9.bridge_burden_architecture`; `paper9.conditional_bridge_admissibility_only` | Bridge grammar and burden stack only; no phenomenal predicates are empirically licensed. | IIT may offer a stronger consciousness interpretation, but QICN cannot answer it without bridge evidence. | GWT/GNW can explain access/report without closing QICN bridge burdens. | HOT can explain awareness reports without QICN bridge admissibility. | External bridge protocol with rival variables, QICN burdens, blinded interpretation, negative controls, and explicit failure states. | Any rival explains target bridge-facing observables under preregistered controls while QICN bridge burdens fail or remain non-identifiable. | `BRIDGE_NOT_YET_ADJUDICATED_HIGH_RISK` |
| Governance boundary | `governance.basecore_active_boundary` | Packaging and reading rule only; not a theorem. | Not a rival-theory claim. | Not a rival-theory claim. | Not a rival-theory claim. | None for consciousness comparison; only provenance/audit verification. | Not applicable. | `GOVERNANCE_ONLY_NOT_RIVAL_CLAIM` |

## Claims That Cannot Yet Be Compared

The following claim classes are not ready for evidence-bearing comparison:

1. Concrete runtime instantiation claims. The registry repeatedly marks system dependency as absent, possible, or future-facing, not closed.
2. Phenomenality or human-equivalence claims. Paper VIII and Paper IX boundaries explicitly block these.
3. External validation claims. No rival row has independent data, blind benchmark, or expert adjudication in this phase.
4. General non-simulability. The registry permits only conditional, class-bound readings.
5. HOT-local bibliography claims. Phase 6.1 found an external seed, but local bibliography remains incomplete for HOT.

## Phase 6.3 Priorities

The next phase should not widen the rival set yet. The serious next move is to convert three high-contact rows into preregisterable protocols:

1. `paper5.operational_consciousness_criterion`
   - Define invariant measurements, ablations, and rival variables.
   - Include result classes favoring IIT, GWT/GNW, HOT, QICN, and no-theory.
2. `paper8.first_person_indexed_subjectivity_gate`
   - Build a HOT-facing dissociation protocol: higher-order access present while QICN ownership/continuity burdens fail, and the converse if definable.
   - Keep every output as awareness/report/ownership-targeted, not phenomenality-confirming.
3. `paper9.bridge_burden_architecture`
   - Define a bridge-facing protocol that can fail cleanly.
   - Treat failure to identify bridge variables as evidence against QICN's bridge program for that target, not as pending success.

## Residual Debts

| Debt | Status | Owner phase |
|---|---|---|
| `HOT_BIB_GAP` | Closed at AI-output bibliography-seed level by Phase 6.2B addendum. Not yet integrated into canonical release or paper bibliographies. | Later bibliography integration only if explicitly approved |
| `OBSERVABLE_MAPPING_GAP` | Partially reduced by this matrix, not closed. Each high-priority row still needs measurement definitions. | Phase 6.3 |
| `EXTERNAL_ADJUDICATION_GAP` | Open. No rival has been adjudicated. | Later empirical/expert review phase |
| `ADVERSARIAL_HARNESS_COMPATIBILITY_GAP` | Open and intentionally untouched. | Phase 6.4 |
| `PROTOCOL_PREREGISTRATION_GAP` | Open. No protocol is preregistered. | Phase 6.3 |
| `BODY_PROSE_INTEGRATION_GAP` | Open. No paper text was edited. | Phase 6.5 only if 6.2-6.4 pass |

## Commands Executed

| Command/tool | Purpose | Result |
|---|---|---|
| `git status --short --branch` | Preflight worktree check | `main...origin/main`; only preexisting untracked workspace files before this pass. |
| `Get-Content audit-context-building/SKILL.md` | Apply audit-first workflow | Completed. |
| Memory lookup | Recover prior Phase 6 governance cautions | Found guidance to keep comparator work bounded and `NOT_YET_ADJUDICATED`. |
| `Get-Content rigid-identity-framework/INSTRUCCIONES.md` | Apply local AI-output and phase governance | Completed. |
| `Select-String ROADMAP.md` | Locate VERSION 3 Phase 6.2 requirements | Confirmed registry-backed mapping, `NOT_YET_ADJUDICATED`, no harness repair. |
| `ConvertFrom-Json release/claim_registry.v1.json` | Extract registry claim surface | 17 claim entries inspected. |
| `Get-Content` on source-of-truth docs | Confirm canon, layer, and theory-system boundaries | Completed. |
| `Get-Content QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md` | Use Phase 6.1 as input | Completed. |
| `apply_patch` | Create this report and append ledger entry | Completed. |

Verification commands are recorded in the ledger after execution so the final result is not self-referential.

## No-Regression Statement

No `.tex`, PDF, bibliography, registry, release, corpus, artifact, script, runtime, macro, label, theorem, proof, or monolithic source was modified. The only intended changes are this report and the ledger entry.

## Closure Criteria

Phase 6.2 is closed if:

- the matrix maps registry-backed claims against IIT, GWT/GNW, and HOT;
- every rival row remains non-adjudicative;
- claims that cannot yet be compared are listed;
- Phase 6.3 priorities are derived from the matrix;
- root canonical gates still pass;
- `git status` shows no unintended tracked modifications.

Final status after verification: `PASS_WITH_TRACKED_RIVAL_PROTOCOL_DEBT_AFTER_6_2B_HOT_BIB_SEED`.

## Phase 6.2B Addendum - HOT Bibliography Gap Closure

External audit correctly identified that the first Phase 6.2 pass documented `HOT_BIB_GAP` but did not satisfy the ROADMAP deliverable "Bibliografia minima completada para HOT."

Correction applied:

- Added `QICN_ROADMAP_V3_PHASE6_2B_HOT_BIBLIOGRAPHY_SEED.bib` under AI-platform reports.
- Kept the seed non-canonical: no `release/`, paper bibliography, `.tex`, PDF, script, registry, corpus, artifact, runtime, macro, label, theorem, proof, or monolithic source was modified.
- Used the seed only to make HOT comparison bibliographically grounded enough for Phase 6.3 protocol design.

Minimal HOT seed entries:

1. Lau and Rosenthal 2011, `Trends in Cognitive Sciences`, DOI `10.1016/j.tics.2011.05.009`.
2. Rosenthal and Weisberg 2008, `Scholarpedia`, DOI `10.4249/scholarpedia.4407`.
3. Rosenthal 2004, "Varieties of Higher-Order Theory."
4. Rosenthal 2005, `Consciousness and Mind`, DOI `10.1093/oso/9780198236979.001.0001`.
5. Carruthers and Gennaro, Stanford Encyclopedia of Philosophy entry on higher-order theories.

Revised closure reading:

- Phase 6.2 is now closed at report/AI-output level.
- HOT remains not adjudicated.
- Canonical bibliography integration remains a later, explicitly approved bibliography phase if needed.
- Phase 6.3 must still desegregate the grouped high-priority rows into measurable observables, metrics, thresholds, negative controls, and rival-favoring result classes.
