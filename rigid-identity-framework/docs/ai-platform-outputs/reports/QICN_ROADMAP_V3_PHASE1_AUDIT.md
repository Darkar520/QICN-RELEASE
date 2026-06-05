# QICN Roadmap v3 - Phase 1 Audit

Status: PHASE1_AUDIT_COMPLETE_NO_TEX_EDITS
Date: 2026-06-05
Agent/platform: Codex

## Objective

Map redundancy, circularity, excessive defensiveness, and risky claim language before editing any `.tex` source.

This phase is analysis-only. No paper, BaseCore, monolithic, registry, bibliography, macro, label, PDF, or script file was edited.

## Governance Boundary

Primary governing files read:

- `rigid-identity-framework/INSTRUCCIONES.md`
- `rigid-identity-framework/ROADMAP.md`
- `C:\Users\irisp\.codex\skills\audit-context-building\SKILL.md`
- `C:\Users\irisp\.codex\memories\MEMORY.md`

Local `.agent` was not present in the sandbox-visible root. A `.claude` directory exists, but the Phase 1 governance boundary was determined from `INSTRUCCIONES.md`, `ROADMAP.md`, the user-provided `AGENTS.md` instructions, and the audit-context skill.

## Scope

Audited active LaTeX surfaces:

- `basecore/BASECORE.tex`
- `basecore/core/sections/*.tex`
- `paper1/main.tex`
- `paper2/main.tex`
- `paper3/main.tex`
- `paper4/main.tex`
- `paper5_operational_consciousness/main.tex`
- `paper6_predictions_falsation/main.tex`
- `paper7_operational_life_subjecthood/main.tex`
- `paper8_first_person_subjectivity/main.tex`
- `paper9_phenomenal_bridge_organization/main.tex`
- `paper10_external_adjudication/main.tex`
- `monolithic/QICN_MONOLITHIC.tex`
- `monolithic/preamble/*.tex`

Active `.tex` count under this boundary: 25.

Excluded from primary finding counts:

- `monolithic/build/sections/*.tex`, because these are generated assembly sections and would inflate duplicate counts.
- `docs/ai-platform-outputs/recovery-candidates/**/*.tex`, because they are recovery candidates, not active paper sources.
- `canonical_core_legacy/*.tex`, because it is explicitly legacy.
- `docs/reports/*.tex` and `docs/theory/*.tex`, because they are theory/report adjuncts, not the active paper-editing surface for Phase 2.

These exclusions do not mean the files are unimportant. They mean Phase 1 is scoped to the editable paper/BaseCore/monolithic source surface named by the roadmap.

## Commands And Mechanical Evidence

| Command | Purpose | Result |
|---|---|---|
| `git status -sb` | Preflight branch/worktree state | `main...origin/main [ahead 3]`; no uncommitted files before report creation |
| `rg --files rigid-identity-framework | Select-String -Pattern '\.tex$'` | Discover all `.tex` surfaces | Found active, generated, recovery, legacy, and theory `.tex` surfaces |
| `Get-ChildItem ... -Recurse -Filter *.tex` | Build active-source audit set | 25 active `.tex` files after excluding generated monolithic sections |
| PowerShell paragraph normalizer | Detect exact repeated paragraphs over 120 chars | 37 repeated paragraph groups |
| `Select-String` risky terms | Count claim-risk vocabulary | `consciousness` 184, `runtime` 153, `phenomenal` 124, `prove` 119, `forced` 84, `validation` 66 |
| `Select-String` defensive terms | Count claim-boundary/metadiscourse terms | Highest concentrations: Paper 7, Paper 9, Paper 6, Paper 8 |
| `rg -n -i ...` | Capture line-level evidence for risky/circular/defensive patterns | Completed; representative lines recorded below |

## Quantitative Summary

### Literal Redundancy

Exact repeated paragraphs over 120 normalized characters:

- Total duplicate paragraph groups: 37.
- All 37 groups occur between:
  - `basecore/core/sections/04_regime_constraints_absorbed.tex`
  - `paper2/main.tex`

Interpretation:

This is not random repetition across the corpus. It is a concentrated source-ownership duplication between Paper 2 and BaseCore absorbed material. Because BaseCore explicitly absorbs/normalizes material from upstream papers, this may be partly intentional, but exact paragraph reuse is still a Phase 2 editorial risk: it can make the corpus read as copied rather than canonically layered.

### Risky Claim Vocabulary

Corpus-wide active-source hits:

| Term | Hits | Phase 1 Interpretation |
|---|---:|---|
| `consciousness` | 184 | Expected by topic, but needs strict operational containment |
| `runtime` | 153 | High circularity risk when paired with validation/support language |
| `phenomenal` | 124 | High interpretive risk, especially Paper 9 |
| `prove` / `proves` | 141 combined | Acceptable for formal theorems; risky near empirical/runtime language |
| `forced` | 84 | Acceptable only under explicit hypotheses; risky as ontological rhetoric |
| `validation` / `validate` / `validates` | 104 combined | Needs separation between internal conformance and external adjudication |
| `external adjudication` | 20 | Mostly protective; can be consolidated if repeated |
| `internal support` | 18 | Must not be promoted to proof or external validation |
| `unavoidable` | 2 | Low count; verify local context in Phase 2 |
| `inevitable` | 0 | No active-source hit |

### Defensive / Claim-Boundary Concentration

Defensive and claim-boundary markers are not uniformly distributed.

| File | Defensive-marker hits |
|---|---:|
| `paper7_operational_life_subjecthood/main.tex` | 78 |
| `paper9_phenomenal_bridge_organization/main.tex` | 76 |
| `paper6_predictions_falsation/main.tex` | 54 |
| `paper8_first_person_subjectivity/main.tex` | 46 |
| `paper5_operational_consciousness/main.tex` | 33 |
| `paper2/main.tex` | 32 |
| `paper10_external_adjudication/main.tex` | 31 |
| `paper3/main.tex` | 26 |
| `paper1/main.tex` | 25 |
| `paper4/main.tex` | 12 |

Interpretation:

Most boundaries are scientifically useful. The problem is not their existence; the problem is repeated local restatement in adjacent paragraphs, openings, conclusions, and non-claim sections. Phase 2 can consolidate without deleting claim safety.

## Findings Matrix

| Archivo | Seccion | Hallazgo | Riesgo | Clasificacion | Accion recomendada |
|---|---|---|---|---|---|
| `paper2/main.tex` + `basecore/core/sections/04_regime_constraints_absorbed.tex` | Paper 2 sections mirrored in BaseCore absorbed section | 37 exact repeated paragraph groups over 120 chars | Reader sees duplicated theorem/narrative ownership; BaseCore and Paper 2 become hard to distinguish | Redundancia literal / source-ownership duplication | Phase 2 should preserve theorem content but convert one side into shorter canonical reference or explicit absorption note; do not delete proofs until ownership is verified |
| `paper2/main.tex:272`, `paper2/main.tex:403`, `paper2/main.tex:551` | Phenomenological axioms and compatibility setup | Repeated "not design choice" / "forced consequence" language | Strong "forced" phrasing can sound ontological rather than conditional | Claim inflado local / formal-language tightening | Replace broad force language with hypothesis-relative necessity language where the proof only establishes necessity inside stated axioms |
| `basecore/core/sections/04_regime_constraints_absorbed.tex:95`, `:226`, `:374` | Absorbed Paper 2 material | Same "forced consequence" pattern appears in BaseCore | Duplicates the same risk at BaseCore level | Redundancia literal + claim-boundary risk | Apply same Phase 2 edit after deciding whether Paper 2 or BaseCore owns the canonical prose |
| `paper1/main.tex:113`, `paper1/main.tex:886`, `paper1/main.tex:941` | Appendix/conclusion force language | "ontologically forced class", "forced to take the form", "no ontological degrees of freedom remain" | Reads stronger than mathematical uniqueness under assumptions | Claim inflado / ontology-model slippage | Replace ontological absolutes with model-relative uniqueness/necessity under persistence and observability constraints |
| `paper1/main.tex:842` | Detectability discussion | "empirical divergence ... can certify CCR behavior" next to caveat that finite estimates cannot prove infinite mass | "certify" can overstate empirical closure | Claim dangerous but fixable | Change to "supports/falsifies within declared estimator model" or "is consistent with CCR behavior under the model"; keep caveat |
| `paper4/main.tex:60-64` | Opening non-claims triplet | Three consecutive "does not" boundaries | Scientifically protective, but opening reads defensive | Defensividad excesiva / claim boundary necesario | Consolidate into one compact scope paragraph plus one formal admissibility statement |
| `paper5_operational_consciousness/main.tex:96-100` | Opening non-claims triplet | Human phenomenology, machine equivalence, runtime support, claim closure all stated in adjacent defensive units | Necessary safety, but high density slows the positive criterion | Claim boundary necesario / consolidatable | Merge the three boundaries into a single "scope and admissible reading" paragraph without weakening limits |
| `paper6_predictions_falsation/main.tex:83`, `:92-96`, `:648`, `:697`, `:726` | Internal support and prediction ledger | Internal support caveats repeat in introduction, release note, residual caveats, and close | Repetition creates defensive style and may obscure positive falsification structure | Defensividad excesiva / internal-support boundary | Keep one canonical internal/external evidence boundary; convert later repetitions into short references or table cells |
| `paper7_operational_life_subjecthood/main.tex:104`, `:113`, `:154`, `:1001`, `:1091-1092`, `:1115`, `:1130` | Runtime motivation and class closure | Runtime is said to motivate formalization and to be "claim-closing-ready" while non-certification is repeatedly restated | Highest circularity risk in active corpus: runtime may appear to justify theory maturity | Circularidad risk / not yet circular proof claim | Replace "claim-closing-ready" and broad runtime-motivation language with bounded "implementation-legible evidence surface"; keep explicit non-certification |
| `paper8_first_person_subjectivity/main.tex:98`, `:942`, `:1032`, `:1035`, `:1078`, `:1260` | Subjectivity runtime pathway | Strong formal ladder plus runtime pathway can be read as near-certification despite caveats | Interpretive overread risk around subjectivity | Claim boundary necesario / circularity-adjacent | Keep formal architecture, but reduce meta-defense and ensure runtime is only implementability/admissibility surface |
| `paper9_phenomenal_bridge_organization/main.tex:117`, `:126`, `:155`, `:173`, `:725`, `:881`, `:972`, `:1011`, `:1057` | Phenomenal bridge / BPF surfaces | Strong bridge language plus BPF implementation status plus repeated non-claims | Highest public-risk vocabulary: "phenomenal", "bridge support", "implementation already closes" | Claims peligrosos / defensividad necesaria but overlong | Phase 2 should preserve bridge burden stack while reducing implementation-status promotion language and centralizing non-claims |
| `paper9_phenomenal_bridge_organization/main.tex:972` | Runtime-corpus separation | Explicitly blocks runtime-to-corpus confirmation loops | Good boundary, but appears late after many implementation-aware claims | Claim boundary necessary | Move/echo a compact version earlier in Phase 2 if Paper 9 is edited; do not delete |
| `paper10_external_adjudication/main.tex:225-226`, `:1135` | Internal support theorem / promotion layer | Correctly states non-transitivity of internal support | Low risk; acts as canonical fix for runtime validation concerns | No tocar / canonical boundary | Use Paper 10 as canonical reference in Phase 2 instead of repeating external-validation caveats everywhere |
| `monolithic/QICN_MONOLITHIC.tex:24` | Monolithic editorial preface | Compact claim boundary states conditional/formal/operational status | Low risk; good canonical style | Claim boundary necessary / model paragraph | Use as style template for Phase 2 consolidation |
| `basecore/BASECORE.tex:117` | BaseCore summary | One dense paragraph lists what BaseCore proves and does not prove | Protective but dense; claim boundaries all in one paragraph | Defensividad moderate / summary density | Optional Phase 2 micro-edit: preserve boundaries but split into proof-domain and non-claim-domain sentences |

## Classification Summary

| Classification | Count In Matrix | Meaning |
|---|---:|---|
| Redundancia literal / source-ownership duplication | 2 | Exact or near-exact content duplicated across active source surfaces |
| Defensividad excesiva / consolidatable | 4 | Protective language is valid but repeated too often or too densely |
| Claim boundary necessary | 5 | Boundary should stay, but can be centralized or shortened |
| Claim inflado / ontology-model slippage | 3 | Wording exceeds the strict model-relative result |
| Circularity risk | 3 | Runtime/theory relation can be read as mutual validation if not tightened |
| No tocar / canonical boundary | 2 | Serves as a useful guardrail and should be reused rather than weakened |

## Prioritized Safe Changes For Phase 2

1. Consolidate the repeated opening triplets in Papers 4, 5, 6, 7, 8, and 9 into one compact scope-and-reading paragraph per paper.
2. Use `paper10_external_adjudication` and the monolithic preface as canonical reference style for internal-support versus external-validation boundaries.
3. Resolve Paper 2/BaseCore exact duplication by preserving theorem content while making ownership explicit: either BaseCore keeps the absorbed formal core and Paper 2 points to it, or Paper 2 remains the narrative source and BaseCore uses a shorter normalized theorem statement.
4. Replace "forced", "ontologically forced", "no ontological degrees of freedom", and similar phrases with hypothesis-relative mathematical necessity where the result is conditional.
5. Replace "certify CCR behavior" language in Paper 1 with falsification/support language tied to the estimator and declared model.
6. Tighten Paper 7 runtime language, especially `claim-closing-ready`, so runtime evidence remains an implementation-legible surface rather than a near-promotion claim.
7. Tighten Paper 9 implementation-status language: BPF-0/BPF-1 existence should remain scaffold/provisional surface status, not bridge support.
8. Do not remove all non-claims. Keep local boundaries where a reader could otherwise infer consciousness, phenomenality, human equivalence, moral status, metaphysical subjecthood, empirical instantiation, or external validation.

## Items Not Safe For Automatic Phase 2 Editing

- Removing Paper 2/BaseCore duplicated theorem/proof material without deciding canonical theorem ownership.
- Renaming macros, labels, theorem environments, paper IDs, registry keys, or monolithic build paths.
- Downgrading mathematical theorem names solely because words like "forced" appear in theorem titles.
- Deleting non-claims in Papers 8 and 9 without replacing them with an equivalent canonical boundary.
- Treating runtime artifacts as external validation, independent evidence, or theorem closure.

## Phase 1 Closure

Phase 1 is complete because:

- The active `.tex` source boundary was inventoried.
- Literal redundancy was quantified.
- Risky claim terms were counted.
- Circularity-adjacent runtime/theory language was located.
- Excessive defensiveness was separated from necessary claim boundaries.
- No `.tex` file was modified.
- Phase 2 now has a prioritized safe-change list.

Recommended next phase: Phase 2 should be a conservative editing phase limited to prose-level claim-boundary consolidation and model-relative wording repairs, with no macro/label/script/PDF regeneration until after the `.tex` edits are reviewed.
