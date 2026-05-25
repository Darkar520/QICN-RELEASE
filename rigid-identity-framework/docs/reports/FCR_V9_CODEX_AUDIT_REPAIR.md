# FCR v9 Codex Audit Repair

Status: post-handoff audit and corrective patch, 2026-05-25.

## Scope

This report audits the implemented FCR v9 handoff at `HEAD=f48e42c`. It records only internal structural validation and manuscript-governance repairs. It does not claim external validation, theorem truth, consciousness, phenomenality, identity, agency, or moral status.

## Findings Corrected

| Finding | Risk | Repair |
|---|---|---|
| Macro validators and macro reports used different collision policies. `validate-macros.js` and `validate-corpus.js` reported 0 warnings, while `MACRO_COLLISION_REPORT.md` still listed repeated identical declarations and exempt declarations as active risk. | Report/validator divergence could hide real future regressions or make clean gates look cosmetic. | Centralized macro collision classification in `scripts/registry-lib.js` and reused it from the corpus validator, macro validator, and report generator. |
| `registry-lib.js` skipped any macro group containing a `newtheorem` entry. | Too broad: a mixed group containing a theorem declaration plus a real macro definition could be silently exempted. | Exempted theorem declarations only when every entry in the group is a `newtheorem` declaration. |
| Bridge observations were relabeled correctly in LaTeX but extracted as `conditional|unknown`. | The FCR did not match the handoff's epistemic intent; non-theorem observations could remain conditionally theorem-like in the registry. | Added `observation`, `prediction`, `protocol`, and `openproblem` to non-proof environments and heuristic formal environments. |
| Corpus-health metrics still reported raw high-risk macro entries after v9 claimed 0 macro collision warnings. | The dashboard mixed raw extractor risk with active validation risk. | Replaced the metric with active macro-collision entries/groups after policy filtering. |
| Paper 5 decoder surgery still contained a definitional flaw: `def:decoder` referenced `def:ileg`, and the transitivity proof cited decoder composition not defined in `def:decoder`. | The original circularity was reduced but not eliminated; the proof relied on an unsupported closure property. | Rewrote `def:decoder` as decoder-family structural closure and rewrote the transitivity proof using a fixed arbitrary certified decoder and response-cell transitivity. |

## Current Gate

Final validation after repair:

- Formal entries: 745
- Macro entries: 432
- Theorem entries: 97
- Hypothesis entries: 21
- Conjecture entries: 9
- Audit overlays: 20
- Proved-status entries: 239
- Conditional-status entries: 346
- Heuristic-status entries: 148
- Active macro-collision entries: 0
- Active macro-collision groups: 0
- Corpus blockers: 0
- Corpus warnings: 0
- Macro-validation blockers: 0
- Macro-validation warnings: 0

## Report Alignment

`docs/reports/MACRO_COLLISION_REPORT.md` now reports active semantic collisions only:

- Active semantic collisions: none.
- Policy-exempt declaration groups:
  - identical repeated definitions: 124
  - standard formatting macro groups: 1
  - theorem-environment declaration groups: 18

This makes the report consistent with the validator while still preserving visibility into repeated declarations.

## Manual Surgical Checks

- Paper 5: `def:decoder` appears before `def:ileg`, no longer depends on undefined composition, and `rem:subdet` is present.
- Paper 6: `PRED-04a`, `PRED-04b`, `PRED-04c`, and `PRED-11` are present; `leave it undefined` has 0 matches.
- Bridge: `Layer preservation` and `Strictness of the bridge ladder` are remarks; `\Cop` entailments are observations; the Phi-regularity footnote states it is not a proved theorem.
- Non-claim boundaries exist across active papers, though not always under the identical title `What This Paper Does Not Claim`.

## Remaining Non-Blocking Debt

- Full migration to `shared/preamble_qicn.tex` remains deferred.
- LaTeX PDF compilation remains a separate gate from FCR structural validation.
- Policy-exempt repeated definitions are intentionally visible as counts, not active warnings.
