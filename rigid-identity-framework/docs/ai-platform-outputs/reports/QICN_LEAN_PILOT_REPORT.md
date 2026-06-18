# QICN Lean Pilot Report

Status: `LEAN_MATHLIB_BUILD_GREEN__ABSTRACT_CONTRACTION_PILOT_GREEN`

Report class: `NON_CANONICAL_INTERNAL_FORMALIZATION_REPORT`

Date: 2026-06-17

Human review: `REQUIRED`

Human curated status: `not_reviewed`

## Scope

This report documents a Lean/mathlib toolchain probe and one small, verified,
non-canonical formalization pilot for the BaseCore contraction pattern.

It is not a BaseCore edit, not a registry entry, not a release artifact, not an
external validation, and not a certified `C_op` instance. It does not prove any
claim about consciousness, identity, subjectivity, agency, phenomenality, CCR,
`I_int`, or no-vacuity of the target class.

The verified Lean artifact lives under:

```text
docs/ai-platform-outputs/formal/lean/
```

## Toolchain

Lean and Lake are installed and usable when `ELAN_HOME` is explicit:

```text
Lean (version 4.31.0, x86_64-w64-windows-gnu, commit 68218e876d2a38b1985b8590fff244a83c321783, Release)
Lake version 5.0.0-src+68218e8 (Lean version 4.31.0)
```

The Lean project pins:

```text
lean-toolchain: leanprover/lean4:v4.31.0
mathlib inputRev: v4.31.0
mathlib rev: fabf563a7c95a166b8d7b6efca11c8b4dc9d911f
```

## Cache Step

`lake exe cache get` was retried after disk cleanup. It completed substantial
download/decompression work but returned exit code 1:

```text
Warning: some files were not found in the cache.
This usually means that your local checkout of mathlib4 has diverged from upstream.
Decompression of already-cached files failed (exit code 1)
```

Interpretation:

- This is not a clean cache pass.
- It is not treated as certification.
- It did not block the later trusted gate, because `lake build` compiled the
  local Lean project successfully from the available mathlib sources/oleans.

## Verified Lean Files

```text
docs/ai-platform-outputs/formal/lean/QICNLean/Basic.lean
docs/ai-platform-outputs/formal/lean/QICNLean/QICNContraction.lean
docs/ai-platform-outputs/formal/lean/QICNLean.lean
```

`Basic.lean` verifies a minimal metric-space smoke theorem:

```text
mathlib_metric_smoke
```

`QICNContraction.lean` verifies two abstract metric-space statements:

```text
nonexpansive_after_contracting
projected_contraction_exists_fixed_point
```

Informal reading of the verified pilot:

- If `base : X -> X` is `ContractingWith K base`.
- If `project : X -> X` is non-expansive, encoded as `LipschitzWith 1 project`.
- Then the composed update `fun x => project (base x)` is still
  `ContractingWith K`.
- In a complete metric space, mathlib's Banach fixed-point API gives a fixed
  point and convergence of iterates for the composed update.

## Green Build Gate

The trusted Lean gate was:

```text
lake build
```

Result:

```text
Build completed successfully (1652 jobs).
```

The build emitted only style warnings about missing mathlib-style copyright
headers in the non-canonical AI-output files:

```text
warning: QICNLean/Basic.lean:1:1: * '-/': Copyright too short!
warning: QICNLean/QICNContraction.lean:1:1: * '-/': Copyright too short!
```

No `sorry` was introduced.

## What This Proves

This proves only the abstract mathlib-level skeleton:

```text
strict contraction + non-expansive post-map => strict contraction
complete metric space + strict contraction => fixed point and iterate convergence
```

This is a real formalization result, but narrow. It is a useful pressure test for
the BaseCore contraction prose because Lean forces these obligations to be
explicit:

- the ambient space must be a metric/complete metric space;
- the update must be a strict `ContractingWith K`;
- the projection-like map must be supplied as non-expansive;
- convergence is obtained through mathlib's fixed-point API, not by prose.

## What This Does Not Prove

This does not formalize:

- the QICN state space;
- the BaseCore affine update `Kx + Gamma(u)`;
- a bounded linear operator norm proof `||K|| < 1`;
- metric projection onto a nonempty closed convex Hilbert subset;
- non-expansiveness of the concrete projection used by BaseCore;
- invariance of any `C_op` certificate;
- existence of an admissible system `S`;
- `I_int`, CCR, no-vacuity, no-simulability, identity, phenomenality, or
  consciousness claims.

The correct next formal step is not to inflate this pilot. The next step is to
exhibit the actual analytic objects and prove the missing instantiation lemmas:

```text
BaseCore object definitions
affine update is ContractingWith K
projection/correction map is LipschitzWith 1
target set is nonempty/closed/complete where needed
```

## Prior Failure Now Resolved

Earlier retries were blocked by disk pressure and by the missing canonical file:

```text
corpus/pdf_release/pdf_corpus.zip
```

That file was restored before this successful retry. The prior `DEFERRED`
decision is superseded by the green `lake build` above, but the prior root-gate
failure remains historically relevant because it prevented a clean commit before
the restoration.

## Non-Claims

- No external validation is claimed.
- No BaseCore theorem is claimed fully formalized.
- No canonical source, registry, release, `.tex`, monolithic paper, production
  code, or `package.json` was modified.
- This is an internal, non-canonical Lean pilot for human review.
