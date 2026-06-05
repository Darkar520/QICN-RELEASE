# QICN Roadmap v3 - Phase 2 Iteration 4 Ownership Audit

Date: 2026-06-05

Status: `OWNERSHIP_DECISION_RECORDED_WITH_NO_TEX_EDITS`

## Purpose

Phase 2 Iteration 4 was opened to address the largest remaining corpus-level
editorial debt after Iteration 3: duplicated material between Paper 2 and
BaseCore.

The specific target was not ordinary repetition. It was source-ownership
duplication between:

- `paper2/main.tex`
- `basecore/core/sections/04_regime_constraints_absorbed.tex`

Because the duplicated material contains definitions, axioms, propositions,
theorems, proofs, extended proofs, and claim-boundary paragraphs, this iteration
was treated as an ownership audit before any destructive or proof-affecting edit.

## Scope

Included:

- `paper2/main.tex`
- `basecore/README.md`
- `basecore/BASECORE.tex`
- `basecore/core/sections/04_regime_constraints_absorbed.tex`
- `basecore/core_meta/editorial_architecture_plan.md`
- Prior Phase 1 and Phase 2 reports
- The implementation trace ledger

Excluded:

- All Paper 2 and BaseCore `.tex` edits
- All PDF recompilation
- Monolithic recompilation
- Macro, theorem-environment, label, and bibliography changes
- Any deletion or shortening of theorem/proof material

## Preflight State

`git status --short --branch`:

```text
## main...origin/main [ahead 3]
```

The earlier monolithic synchronization was already committed locally before this
audit began. No uncommitted files were present.

Recent local commits:

```text
58ac4ac docs: sync monolithic after phase 2 iteration 3
f7a29f3 docs: apply roadmap phase 2 iteration 3
21605e9 docs: apply roadmap phase 2 iteration 2
```

## Hashes Audited

| File | SHA256 |
|---|---|
| `paper2/main.tex` | `26304FEA9BFBF54EA90BF56C5E386E853DD8A530A0724B23AAB1EFCC51A81871` |
| `basecore/core/sections/04_regime_constraints_absorbed.tex` | `94333C38DE2385A1A00D44F37C2793201E65DEF9958D778E7262A1A0B5EA2EDF` |
| `basecore/BASECORE.tex` | `4A8F92DC4E47272E3C3A8D502D9748FA1FA4FD50789B931B9D297C0DD417FF0D` |
| `basecore/README.md` | `871B8E863849EEEBC083DDCEC3190669ABFB1A8E9314A0A5B07E8D4C6010BAAB` |

## Governance Findings

BaseCore's local README states:

- `BASECORE.tex` and `core/sections/*` are the BaseCore source of truth.
- BaseCore is the autonomous mathematical base layer.
- It selectively absorbs formal material from Papers 1--6 where theorem
  ownership belongs in the base package.
- Papers 7--9 remain downstream.

The BaseCore editorial architecture plan states the same policy in stronger
form:

- BaseCore normalization separates theorem-tight base ownership from expanded
  and downstream material.
- Papers 1--6 may be selectively absorbed.
- Papers 7--9 remain downstream.

Therefore, the fact that `04_regime_constraints_absorbed.tex` begins with:

```tex
% Absorbed from paper2/main.tex
```

does not mean BaseCore is merely a temporary copy. Under the current local
governance, it means the Paper 2 formal core was absorbed into the base layer
where BaseCore owns the dependency-facing theorem export.

## Exact Duplicate Audit

The Phase 1 report counted `37` duplicate paragraph groups using its original
filter. This Iteration 4 audit reran a paragraph normalizer over the two active
files and found a broader exact-overlap surface:

```text
TOTAL=83 exact paragraph groups over 120 normalized characters
```

This difference is not a contradiction. It is a filter-width difference. The
Phase 1 count remains useful as a conservative baseline; the Iteration 4 count
shows the full local ownership overlap when theorem/proof paragraphs, remarks,
tables, and extended proof steps are included.

Representative exact duplicate ranges:

| Group | Paper 2 range | BaseCore 04 range | Content class |
|---|---:|---:|---|
| 1 | `184-187` | `7-10` | Identity-framework setup |
| 7 | `222-228` | `45-51` | Phenomenological assignment definition |
| 13 | `256-261` | `79-84` | E1 axiom |
| 16 | `276-278` | `99-101` | E0 theorem statement |
| 22 | `316-326` | `139-149` | E2 proof body |
| 31 | `403` | `226` | forced-consequence claim sentence |
| 40 | `437-439` | `260-262` | H3 metric hypothesis |
| 63 | `622-628` | `441-447` | Forced Continuity Theorem |
| 69 | `676-688` | `495-507` | regime classification table |
| 78 | `993-994` | `561-562` | extended proof opening |

## Duplicate Distribution By BaseCore Section

| BaseCore section heading | Duplicate groups |
|---|---:|
| `Review of Identity Framework` | 2 |
| `Abstract Phenomenological Space` | 2 |
| `Why a Separate Space?` | 2 |
| `Phenomenological Assignment` | 2 |
| `Uniqueness of the Limit Assignment` | 2 |
| `Axioms for Phenomenological Coherence` | 4 |
| `Inevitability of the Axioms` | 1 |
| `Inevitability of E0` | 2 |
| `Inevitability of E1` | 3 |
| `Inevitability of E2` | 3 |
| `Minimality Theorem` | 2 |
| `Rejected Alternatives` subitems | 3 |
| `Structural Interpretation` | 1 |
| `Closure of Section 2` | 2 |
| `Phenomenological Neutrality Clause` | 4 |
| `Induced Constraints from Identity Rigidity` | 3 |
| `Necessity of Metric Structure on Phenomenological Space` | 2 |
| `Why H3 is Necessary` | 4 |
| `Why Completeness is Necessary` | 3 |
| `Alternatives Considered and Rejected` | 2 |
| `Phenomenological Continuity` | 2 |
| `Phenomenological Fragmentation` | 2 |
| `Relationship Between Metrics` | 2 |
| `Closure of Section 3` | 3 |
| `Fragmentation Theorem` | 4 |
| `Forced Continuity Theorem` | 5 |
| `Dichotomy Theorem` | 1 |
| `Complete Classification` | 1 |
| `Structural Implications` | 3 |
| `Proof of Fragmentation Theorem (Extended)` | 5 |
| `Proof of Forced Continuity Theorem (Extended)` | 4 |
| `Structural Necessity Lemma` | 2 |

## Ownership Decision

The current corpus should treat the overlapping material as follows:

| Surface | Ownership role | Consequence |
|---|---|---|
| BaseCore section 04 | Canonical dependency-facing theorem export for the absorbed Paper 2 formal core | Do not delete, compress, or externalize theorem/proof material from BaseCore unless BaseCore autonomy is deliberately revised. |
| Paper 2 | Standalone expository paper and historical/narrative source for the regime-structure development | Do not gut the paper into a pointer-only document; preserve its standalone scientific readability. |
| Monolithic | Assembly surface | Do not use the monolith to decide ownership; it should reflect the source-tree decision. |

This resolves the ownership question but not the literal prose-overlap debt.

## Why No `.tex` Edit Was Applied In This Iteration

Three possible edits were considered:

| Option | Rejected / accepted | Reason |
|---|---|---|
| Delete or greatly compact BaseCore 04 and refer to Paper 2 | Rejected | Breaks BaseCore's stated autonomous mathematical base-layer role. |
| Delete or greatly compact Paper 2 and refer to BaseCore | Rejected for this iteration | Risks turning Paper 2 into an incomplete pointer document, contrary to the paper-preservation rule. |
| Rewrite/normalize Paper 2 prose while preserving all theorem content and labels | Accepted as next safe implementation unit | It reduces exact duplicated prose without weakening BaseCore, but it is too broad to mix into an ownership-audit commit. |

No `.tex` edits were therefore applied in this iteration. No recompilation was
required.

## Safe Next Implementation Unit

Recommended next unit: `Phase 2 Iteration 4B - Paper 2 Normalization Pass`.

Constraints:

- edit only `paper2/main.tex` plus report/ledger files;
- preserve all theorem, proposition, axiom, hypothesis, and label identifiers;
- do not remove non-claims without equivalent replacement;
- avoid shortening Paper 2 into a mere BaseCore pointer;
- neutralize remaining broad `forced`/`inevitable` prose where it is rhetorical
  rather than theorem-local;
- add a compact Paper 2/BaseCore provenance paragraph in the Paper 2 opening
  or near the start of the formal setup;
- recompile Paper 2 after edits;
- do not recompile the monolith until Paper 2 normalization is closed and
  verified.

## Residual Risks

| Risk | Status | Handling |
|---|---|---|
| Literal Paper 2/BaseCore paragraph duplication | Open | Address in Iteration 4B through Paper 2 normalization, not deletion. |
| BaseCore autonomy regression | Avoided | No BaseCore `.tex` edit was made. |
| Paper 2 standalone-readability regression | Avoided | No Paper 2 `.tex` edit was made. |
| Hidden macro/label regression | Avoided | No macros or labels were touched. |
| PDF/source desynchronization | Avoided | No `.tex` or PDF was touched. |
| Monolithic sync debt | Not introduced | No source edit occurred. |

## Verification

| Check | Result |
|---|---|
| Preflight `git status --short --branch` | Clean, branch ahead 3 |
| `.agent/.agents/.codex` root folders | Not present in this workspace root |
| Local instructions inspected | `INSTRUCCIONES.md`, `basecore/README.md`, `basecore/core_meta/editorial_architecture_plan.md` |
| Exact duplicate paragraph map | 83 groups over 120 normalized characters |
| `.tex` files modified | 0 |
| PDF files modified | 0 |
| Recompilation required | No |

## Closure

Phase 2 Iteration 4 closes the ownership-decision layer:

- BaseCore owns the canonical theorem-export version of the absorbed Paper 2
  formal core.
- Paper 2 remains the standalone expository paper and should not be collapsed
  into a pointer-only document.
- The remaining work is no longer an ownership ambiguity; it is a controlled
  Paper 2 normalization pass.

Status: `OWNERSHIP_DECISION_RECORDED_WITH_LITERAL_OVERLAP_DEBT_TRACKED`.
