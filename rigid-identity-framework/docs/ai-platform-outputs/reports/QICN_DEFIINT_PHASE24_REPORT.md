# QICN def:iint Phase-2/4 Report

Date: 2026-06-20

Status: CANON_EDIT_APPLIED_CLASS_PARAMETRIC_WITH_ANTI_INFLATION_GUARD

This report records a scoped BaseCore canon edit. It does not close `Iint`
unconditionally, does not certify `Crit_op`, and does not provide external
validation.

## Scope

Edited:

- `basecore/core/sections/07_operational_criterion_absorbed.tex`
- `registry/theorems.jsonl` entry `basecore:definition:def-iint`

Regenerated:

- `basecore/BASECORE.pdf`
- `monolithic/QICN_MONOLITHIC.pdf`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`

Not changed:

- Labels/macros/IDs: `def:iint` was preserved.
- Release manifests and immutable release artifacts.
- Downstream papers and monolithic source sections except generated PDF output.

## Inventory

Direct BaseCore references found before editing:

- `basecore/core/sections/07_operational_criterion_absorbed.tex:118-124`:
  original `def:iint`.
- `basecore/core/sections/07_operational_criterion_absorbed.tex:173,177`:
  `prop:invariant-necessity` refers to rupture of integration.
- `basecore/core/sections/07_operational_criterion_absorbed.tex:212`:
  `def:cop` includes `Iint`.
- `basecore/core/sections/07_operational_criterion_absorbed.tex:242`:
  reduced criterion includes `Iint`.
- `basecore/core/sections/08_claim_boundary_and_falsation.tex:35`:
  operational certification references `Iint`.

Registry dependents found:

- `basecore:definition:def-iint`
- `basecore:proposition:prop-invariant-necessity`
- `basecore:definition:def-cop`
- `basecore:definition:reduced-criterion-l239`
- `basecore:definition:def-operational-certification`
- Bridge downstream entries including `bridge:definition:def-bridge-cop`,
  `bridge:definition:def-pi-op`, and `bridge:corollary:cor-no-independent-perspectives`.
- Paper 5 downstream entries including `paper5:theorem:thm-existence`,
  `paper5:proposition:prop-rupt-int`, `paper5:definition:def-reduced`,
  `paper5:theorem:thm-six-witness-schemas`,
  `paper5:theorem:thm-six-sufficiency`, and
  `paper5:proposition:prop-per-int-weak-ri`.

Downstream risk flag:

- The edit makes the default meaning of `Iint(S)=1` more explicit, but it does
  not make any downstream theorem easier. Every downstream use of unqualified
  `Iint(S)=1` now inherits the class-relative burden. Broader behavioral
  simulator classes remain an explicit falsation surface.

## Exact def:iint Diff

```diff
 \begin{definition}[Causal integration]\label{def:iint}
 An admissible system satisfies causal integration, written $\Iint(S)=1$, if there is no non-trivial factorization
 \[
 \Aset=A_1\times A_2,\qquad R=R_1\sqcup R_2,
 \]
 together with decomposed dynamics and causal structure reproducing admissible histories within error smaller than a positive margin $\delta_{\mathrm{int}}(S)$ while preserving $\Id_S$.
+More explicitly, this shorthand is relative to a declared admissible
+factorization class.  For such a class $\mathfrak{D}$, write
+$\Iint(S;\mathfrak{D})=1$ when no factorization in $\mathfrak{D}$
+reproduces the admissible histories below a positive margin
+$\delta_{\mathrm{int}}(S;\mathfrak{D})$ while preserving $\Id_S$.
+The unqualified notation $\Iint(S)=1$ refers to the default structural class
+$\mathfrak{D}_{\ast}$: fixed, time-homogeneous, schedule-independent,
+non-trivial product factorizations with both factors non-singleton, with
+split readouts $R=R_1\sqcup R_2$, decomposed dynamics and causal structure, a
+search space normalized independently of the target error, and no
+reconstruction decoder or time-dependent post-processing map that re-couples
+the factors at output time.  This default structural reading is the adopted
+class recorded in
+\texttt{docs/ai-platform-outputs/analysis/QICN\_IINT\_CANONICAL\_CLASS\_SPLIT\_READOUT.md}.
 \end{definition}
 
+\begin{remark}[Class-relative integration margin]
+The integration criterion is class-relative.  Adopting
+$\mathfrak{D}_{\ast}$ does not assert that $S$ resists every broader
+behavioral simulator.  In particular, under decoder-coupled or
+schedule-dependent behavioral classes such as
+$\mathfrak{D}_{\mathrm{approx}}$, the corresponding margin
+$\delta_{\mathrm{int}}(S;\mathfrak{D}_{\mathrm{approx}})$ may vanish, i.e. may
+be equal to $0$; the
+current coupled-carrier analysis records precisely this failure mode.  Thus
+the default structural reading preserves a falsation surface and must not be
+read as an unconditional closure of integration, nor as a strengthening of any
+downstream theorem that assumes $\Iint(S)=1$.
+\end{remark}
```

Post-edit anchor:

- `basecore/core/sections/07_operational_criterion_absorbed.tex:118-138`:
  class-parametric definition.
- `basecore/core/sections/07_operational_criterion_absorbed.tex:140-152`:
  anti-inflation remark naming `D_approx` and possible zero margin.

## Anti-Inflation Justification

The edit is a restriction/clarification of admissibility, not a strengthening
of any result:

- `Iint(S;D)=1` is explicitly relative to an admissible factorization class.
- The default `D_star` is structural: split readouts, no reconstruction decoder,
  time-homogeneous, schedule-independent, non-trivial, and normalized
  independently of the target error.
- `D_approx` is explicitly named as a broader behavioral class under which
  `delta_int(S;D_approx)` may vanish.
- Therefore `Iint(S)=1` is not presented as unconditional integration.
- No downstream theorem was edited to claim a stronger conclusion.

## Verification

BaseCore LaTeX:

| Step | Result |
|---|---|
| `pdflatex -interaction=nonstopmode BASECORE.tex` | `EXIT=0` |
| `biber BASECORE` | `EXIT=0` |
| `pdflatex -interaction=nonstopmode BASECORE.tex` | `EXIT=0` |
| `pdflatex -interaction=nonstopmode BASECORE.tex` | `EXIT=0` |

BaseCore checks:

- `BASECORE.log`: `Output written on BASECORE.pdf (41 pages, 674674 bytes).`
- `BASECORE.aux`: `def:iint` label intact as `25.3` on page `32`.
- Log scan for LaTeX errors, undefined references/citations, duplicate labels:
  no matches.

Monolithic:

| Command | Result |
|---|---|
| `npm run build:monolithic` | `EXIT=0` |
| `npm run compile:monolithic` | `EXIT=0` |

Monolithic report:

- `Status: MONOLITHIC_COMPILED`
- Final PDF: `335 pages, 2840468 bytes`
- Log scan for LaTeX errors, undefined references/citations, duplicate labels:
  no matches.

Package verification:

```text
NPM_RUN_VERIFY_EXIT=0
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Registry:

| Command | Result |
|---|---|
| `npm run extract:registry` | `EXIT=0`, but generated an expanded FCR with a blocker |
| generated `npm run verify:corpus-registry` | `EXIT=1`; blocker: `Required AUDIT_MASTER_v5 coverage missing from FCR: Paper 3 profinite coupling` |
| generated `npm run verify:macro-registry` | `EXIT=0`; warnings: 4 macro collision groups |
| minimal structured update of `basecore:definition:def-iint` | updated 1 JSONL entry |
| final `npm run verify:corpus-registry` | `EXIT=0`; blockers: none |
| final `npm run verify:macro-registry` | `EXIT=0`; blockers: none; warnings: none |

The full extractor output was not versioned because it would introduce a
registry blocker unrelated to `def:iint`. The committed registry change is the
single `basecore:definition:def-iint` entry needed to keep the machine-readable
corpus aligned with the canon edit.

Root gates:

| Command | Status |
|---|---|
| `node scripts\verify-canonical-integrity.cjs` | `PASS` |
| `node scripts\verify-claim-registry.cjs` | `PASS` |
| `node scripts\verify-canonical-release.cjs` | `PASS` |

## Hashes

Before edit:

| File | SHA256 |
|---|---|
| `basecore/core/sections/07_operational_criterion_absorbed.tex` | `89831B7D8CDC47594E6DD69AE7F6A1469F6EC842F5AFCEFECF8B41DA2AA31FC1` |
| `basecore/BASECORE.tex` | `4A8F92DC4E47272E3C3A8D502D9748FA1FA4FD50789B931B9D297C0DD417FF0D` |
| `basecore/BASECORE.pdf` | `4E3AE62300371F63A3D1C292CBC247946F6F68528A55224A92764DCEA91700A2` |
| `registry/theorems.jsonl` | `A1DB56DC38F40BF0C23178D8BF0FF4CBE5063C7CC08EBA72E6F2EA32156BB6A0` |

After edit:

| File | SHA256 |
|---|---|
| `basecore/core/sections/07_operational_criterion_absorbed.tex` | `7999FF6DA9474B98F860F2162BFAED9FF18EBE9779687585E47910CD571D668A` |
| `basecore/BASECORE.tex` | `4A8F92DC4E47272E3C3A8D502D9748FA1FA4FD50789B931B9D297C0DD417FF0D` |
| `basecore/BASECORE.pdf` | `82349C7D68D53BF653D7AB58171099380576D61FE4970B4192DC080BAE54BB70` |
| `registry/theorems.jsonl` | `759A88658D7A7CBAE94AAD2C5886E12C8DB8F3E8399B31A74B96E28AD9570B35` |
| `registry/macros.jsonl` | `7D97EFA2C5629BC4114D672EC4FDB8B02470299678383ABDF85FDE9A5AE19BFF` |
| `monolithic/QICN_MONOLITHIC.pdf` | `C91E60D468F5359E01B6E509F82A43C8D2ADDF34FE8CBB1EF4A990F111C99FAB` |
| `docs/reports/MONOLITHIC_BUILD_REPORT.md` | `0545A8D4F86F6E978149AB25AAEEBCD74ED0A49473BA49F7F6E822E60E373EDD` |

## Residual Risks

- Paper 5 still contains its own local `def:iint` wording. It was inventoried
  but not edited because this phase was scoped to BaseCore canon.
- The full global `extract:registry` command currently exposes an unrelated FCR
  coverage blocker for Paper 3 profinite coupling. The final registry was kept
  valid by a minimal structured update of the `def:iint` entry.
- Choosing `D_star` as default is a canon/documentation decision, not a proof
  that broader behavioral simulators fail.
- `D_approx` remains explicitly available as a failure mode with possible
  zero margin.

## Closure Statements

- The criterion is now class-parametric.
- `D_approx` is named with possible `delta_int=0`.
- No downstream claim was strengthened.
- No push was performed after this Phase-2/4 canon edit.
