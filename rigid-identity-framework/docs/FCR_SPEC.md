# QICN Formal Corpus Registry Specification

Status: executable implementation, v12 reproducibility hardening.

This document specifies the Formal Corpus Registry (FCR) added to the Rigid
Identity Framework. The FCR is not a mathematical proof assistant and does not
certify theorem truth. It is an executable inventory and hygiene layer that
prevents known false, heuristic, speculative, or unproved claims from remaining
invisible inside the LaTeX corpus.

## Scope Boundary

The active scope is `rigid-identity-framework/` excluding historical material
under `canonical_core_legacy/`.

The active source-of-truth base layer remains:

- `basecore/BASECORE.tex`
- `basecore/core/sections/*.tex`

Downstream papers remain separate surfaces. A registry entry may identify a
downstream theorem as false, heuristic, conditional, or conjectural, but that
metadata is not itself a LaTeX correction. The FCR deliberately keeps registry
work separate from the manual repair protocol.

## Why This Is Superior To Manual Repair Alone

The v6 repair protocol is necessary but reactive: it tells an editor which
LaTeX statements to fix. The FCR adds a preventive executable layer:

- It extracts formal environments from the current corpus.
- It records epistemic status, proof status, labels, references, and locations.
- It resolves LaTeX references into explicit `depends_on` registry IDs,
  including references found in immediate proof blocks.
- It overlays known `../docs/AUDIT_MASTER_v5.md` critical findings with
  counterexample metadata.
- It validates that false-status entries include explicit counterexamples.
- It detects macro drift and arity/definition collisions from the actual
  source tree.
- It fails validation if critical audit findings disappear from the registry.

This last point is an intentional improvement beyond the prompt: the original
plan proposed a registry and validators, but it did not require coverage of the
known audit findings as a blocking gate. Without that gate, a broken extractor
could silently omit the very theorems the registry was supposed to track.

## FCR As Static Compiler

The FCR is not a text extractor. It is a static compiler and semantic validator:

- Pass 1 (indexation): tokenize formal environments, extract labels, and
  generate deterministic disambiguated IDs.
- Pass 2 (resolution): resolve `\ref`, `\eqref`, `\autoref`, `\cref`, and
  `\Cref` commands against the indexed symbol table to build the deductive
  dependency graph in `depends_on`.
- Validation: run cycle detection, audit-overlay coverage gates,
  counterexample checks, and macro collision detection.

This two-pass architecture makes the registry reflect the theory's explicit
dependency structure rather than a shallow text scan.

## Boundary of the Static Compiler Claim

The FCR validates registry hygiene, explicit dependency resolution, audit
coverage, macro policy, and cross-reference consistency. It does not certify
theorem truth, semantic independence, empirical support, consciousness,
phenomenality, identity, agency, moral status, or external validation.

Cycle detection means the explicit `depends_on` graph is acyclic under the
current extractor. It does not prove that the mathematical argument is
non-circular in every semantic sense, and it does not detect unstated
dependencies that are not represented by labels, references, or audit overlays.

Macro collision filtering distinguishes active semantic collisions from
policy-exempt repeated declarations. Zero active macro warnings does not by
itself prove that the whole corpus can be compiled as one monolithic LaTeX
volume without preamble work. Local formatting declarations, theorem
environment declarations, and paper-local preambles still require a separate
monolithic-compilation audit before any unified-volume claim.

Whole-registry extraction is also a distinct reproducibility claim. The
committed registry can be cleaner than a fresh extraction when primary `.tex`
files referenced by the registry are absent from the checkout. FCR v12 therefore
adds `npm run audit:extractor-reproducibility` to report whether
`extract-registry.js` can safely reproduce the committed registry from the
currently present primary sources. If that audit is not reproducible,
source-scoped derived-artifact resync is allowed only when the changed primary
files are present, the intended diff is explicit, and validation gates remain
clean afterward.

Accessibility-related report structure is likewise limited. Markdown tables,
headings, and text-first reports improve sequential reviewability, but they are
not a WCAG AAA certification unless a dedicated accessibility audit is run and
recorded.

## Deductive Impact Analysis

FCR v10 adds a read-only impact-analysis surface:

- `scripts/fcr-impact-analyzer.js`
- `npm run analyze:impact -- --target <registry-id>`
- `npm run analyze:impact -- --audit-overlays`

The analyzer builds the inverse dependency graph from `registry/theorems.jsonl`
and reports which entries directly or transitively depend on a target entry.
It summarizes impact by paper, formal-environment type, epistemic status, audit
overlay status, and maximum dependency depth.

This is a maintenance and sensitivity tool, not a validation tool. If a
foundational hypothesis changes, the analyzer identifies which FCR-explicit
entries deserve review. It does not decide whether those entries are actually
mathematically false, empirically supported, or externally validated.

## Files

- `registry/schema.json`: JSON Schema for formal and macro entries.
- `registry/theorems.jsonl`: JSON Lines inventory of formal environments.
- `registry/macros.jsonl`: JSON Lines inventory of macro definitions.
- `scripts/registry-lib.js`: Shared extraction, validation, and reporting logic.
- `scripts/extract-registry.js`: Overwrites registry JSONL files from active
  `.tex` sources and can compare a new extraction against a previous registry
  snapshot.
- `scripts/validate-corpus.js`: Validates theorem hygiene, dependencies,
  audit coverage, macro hygiene, and cross-reference warnings.
- `scripts/validate-macros.js`: Focused macro registry validator.
- `scripts/generate-report.js`: Writes report artifacts under `docs/reports/`.
- `scripts/fcr-impact-analyzer.js`: Read-only impact analyzer for explicit
  downstream dependency sensitivity.
- `scripts/resync-macro-cache.js`: Source-scoped derived macro-cache resync for
  explicitly targeted primary `.tex` changes.
- `scripts/probe-extractor-reproducibility.js`: Read-only audit of whether the
  global extractor can reproduce committed registry counts from present primary
  sources.

## Registry Entry Contract

Each line of `registry/theorems.jsonl` is one JSON object with at least:

- `id`: stable-ish registry id of the form `<paper>:<type>:<slug>`.
- `type`: formal environment type such as theorem, hypothesis, lemma,
  proposition, corollary, definition, remark, caveat, assumption, axiom,
  example, criterion, or conjecture.
- `paper`: owning surface such as `basecore`, `paper1`, ..., `paper10`, or
  `bridge`.
- `label`: first LaTeX label inside the environment when present.
- `statement_tex`: raw extracted environment block.
- `proof_status`: `present`, `missing`, `sketch`, `heuristic`, `invalid`,
  `unknown`, `not_expected`, or `not_applicable`.
- `epistemic_status`: `canonical`, `conditional`, `conjectural`,
  `deprecated`, `false`, `proved`, `tautology`, or `heuristic`.
- `counterexample`: required when `epistemic_status` is `false`.
- `depends_on`: resolved registry IDs for labels referenced by the environment
  or its immediate proof block.
- `registry_version`: extraction version supplied by `extract-registry.js`.
- `curation`: structured review metadata with status, reviewer, date, and
  reason.
- `location`: source file and line range.
- `curation_status`: extraction/curation state.

The extractor marks all entries as draft. Audit overlays can mark known entries
as false, invalid, tautological, conditional, or conjectural based on
`../docs/AUDIT_MASTER_v5.md`.

Hypotheses, assumptions, axioms, definitions, remarks, caveats, examples,
criteria, principles, and non-theorems do not require proof blocks. The registry
therefore treats them as `not_applicable` rather than as missing proofs.

## Macro Entry Contract

Each line of `registry/macros.jsonl` is one JSON object with at least:

- `latex_name`: macro token such as `\Class`.
- `definition`: extracted expansion.
- `arity`: number of arguments.
- `owner`: surface where the macro is defined.
- `canonical`: true only for active BaseCore definitions extracted from
  `basecore/BASECORE.tex`.
- `collision_risk`: `low`, `medium`, or `high`.
- `command`: extraction form such as `newcommand`, `renewcommand`,
  `providecommand`, `def`, `DeclareMathOperator`, `newenvironment`, or
  `newtheorem`.
- `location`: source file and line range.

Multiple definitions for the same macro name produce non-blocking warnings.
They remain warnings rather than blockers because the current corpus compiles
papers separately; however, they are high-risk for unified compilation and
manual repair should resolve them.

## Validation Rules

Blocking rules:

- JSONL files must parse.
- Registry IDs must be unique.
- Required fields must be present.
- Any entry marked `epistemic_status: "false"` must contain
  `counterexample.description`.
- A `canonical` theorem may not have missing, sketch, heuristic, or invalid
  proof status.
- Every `depends_on` id must exist.
- The explicit dependency graph must be acyclic.
- Every critical `AUDIT_MASTER_v5` coverage target must be present and overlaid.
- The `REQUIRED_AUDIT_COVERAGE` array acts as a logical integration test: if an
  edit removes or alters a critical theorem without proper degradation, the FCR
  blocks validation and prevents silent regression of known audit findings.
- There cannot be two canonical macro entries with the same `latex_name`.

Warning rules:

- LaTeX references to missing labels are warnings by default.
- Formal labels referenced in `.tex` but absent from the FCR are warnings.
- Macro definitions with the same `latex_name` but different expansions are
  warnings and marked `collision_risk: high`.

Macro collision warnings are policy-filtered before reporting. Standard
formatting parameters such as `\arraystretch`, repeated identical definitions,
and groups composed entirely of `\newtheorem` declarations are tracked as
policy-exempt declarations, not active semantic collisions. This policy is
centralized in `scripts/registry-lib.js` and reused by the corpus validator,
macro validator, and report generator so that validation output and report
artifacts cannot silently diverge.

Cross-reference warnings can be made blocking by running:

```powershell
node scripts/validate-corpus.js --strict-crossrefs
```

## Commands

From `rigid-identity-framework/`:

```powershell
npm run extract:registry
npm run verify:corpus-registry
npm run verify:macro-registry
npm run analyze:impact -- --target basecore:hypothesis:hyp-phi-regularity
npm run report:corpus-health
```

The extraction command overwrites `registry/theorems.jsonl` and
`registry/macros.jsonl`. It is deterministic over the active source tree and
should be re-run after LaTeX edits.

To compare a new extraction against the previous registry snapshot:

```powershell
node scripts/extract-registry.js --compare registry/theorems.jsonl
```

The script reads the comparison target before overwriting the registry, then
writes `registry/theorems.delta.json`. This ordering is intentional: comparing
after overwrite would produce a false zero-delta report.

## BaseCore Surgery Gate

The v7 repair pass uses the FCR as a gate before and after LaTeX surgery:

- `basecore` no longer treats $\Phi$-regularity as a theorem. The global lower
  Lipschitz clause is an explicit hypothesis, and the arctan counterexample is
  recorded in the appendix and registry overlay.
- Downstream BaseCore results depending on that clause must reference
  `hyp:phi-regularity` and remain conditional.
- Null-regime closure now exposes its order-completeness and deformation-witness
  assumptions instead of deriving existence or uniqueness for free.
- Unproved closure principles in BaseCore Section 05 are retained as
  conjectures.
- The Hilbert--Discrete bridge is labeled as conditional and depends explicitly
  on the finite-rank consistency assumption.

## Terminological Debt Ledger

All macro renames, environment status changes, and collision resolutions are recorded in:

- `docs/TERMINOLOGICAL_DEBT_LEDGER.md`

Before defining new macros in a downstream paper, consult this ledger to avoid reintroducing collisions or reusing deprecated names.

## Editor Workflow

1. Before editing a theorem, run `npm run extract:registry` and
   `npm run verify:corpus-registry`.
2. Make the LaTeX correction in the relevant paper or BaseCore section.
3. Re-run extraction.
4. Re-run validation.
5. Inspect `docs/reports/CORPUS_HEALTH_REPORT.md` and
   `docs/reports/EPISTEMIC_RISK_HEATMAP.md`.
6. Only then update status documents or commit.

## Interpretation Discipline

The FCR separates five layers:

- Ontology: what entities the corpus says exist or are admitted.
- Mathematical model: definitions, hypotheses, propositions, theorems, and
  counterexamples.
- Implementation: scripts, runtime artifacts, registry extraction, validators.
- Language: loaded terms such as phenomenological, subjecthood, bridge, or
  consciousness.
- Interpretation: what, if anything, those terms license outside the formal
  model.

No FCR report licenses claims of consciousness, agency, identity, subjective
experience, external validation, or publication readiness. It only reports the
state of the registered formal corpus and its local evidence metadata.
