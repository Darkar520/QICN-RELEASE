# QICN Lean Pilot Report

Status: `LEAN_TOOLCHAIN_UNAVAILABLE_DEFERRED`

Report class: `NON_CANONICAL_INTERNAL_FORMALIZATION_REPORT`

Date: 2026-06-17

Human review: `REQUIRED`

Human curated status: `not_reviewed`

## Scope

This report documents a Lean/mathlib toolchain probe for a future BaseCore contraction formalization. It is not a formalization artifact, not a proof, not a BaseCore edit, not a registry entry, and not external validation.

No `QICNContraction.lean` file is delivered in this pass. No `.lean` file is committed, because the required `lake build` gate did not complete successfully in this environment.

## Toolchain Probe

Initial probe:

```text
elan --version -> command not found
lake --version -> command not found
lean --version -> command not found
```

Installation attempt:

```text
Invoke-WebRequest -Uri https://raw.githubusercontent.com/leanprover/elan/master/elan-init.ps1 -OutFile C:\tmp\elan-init.ps1
powershell -ExecutionPolicy Bypass -File C:\tmp\elan-init.ps1 -y
```

The first installer invocation failed because the PowerShell script did not accept `-y` as its own non-interactive parameter:

```text
error: unable to read from stdin for confirmation
```

Correct non-interactive installation command:

```text
& C:\tmp\elan-init.ps1 -NoPrompt $true -DefaultToolchain stable
```

Observed result:

```text
info: default toolchain set to 'stable'
```

Lean download/version check required explicit `ELAN_HOME`:

```text
$env:ELAN_HOME="$env:USERPROFILE\.elan"
lean --version
```

Observed result:

```text
Lean (version 4.31.0, x86_64-w64-windows-gnu, commit 68218e876d2a38b1985b8590fff244a83c321783, Release)
info: downloading https://releases.lean-lang.org/lean4/v4.31.0/lean-4.31.0-windows.tar.zst
info: installing C:\Users\irisp\.elan\toolchains\leanprover--lean4---v4.31.0
```

Lake version after installation:

```text
Lake version 5.0.0-src+68218e8 (Lean version 4.31.0)
```

## Mathlib Project Probe

A temporary Lean project was initialized under:

```text
docs/ai-platform-outputs/formal/lean/
```

The generated manifest pinned:

```text
lean-toolchain: leanprover/lean4:v4.31.0
mathlib inputRev: v4.31.0
mathlib rev: fabf563a7c95a166b8d7b6efca11c8b4dc9d911f
```

The required mathlib cache step did not complete:

```text
lake exe cache get
command timed out after 604062 milliseconds
```

After the timeout, the environment reported:

```text
windows sandbox: helper_log_failed: failed to write setup log line: Espacio en disco insuficiente. (os error 112)
```

The generated `.lake/` cache was removed as a regenerable artifact. Because the trivial mathlib build gate did not complete, the temporary Lean project was also removed. This enforces the rule that no unverified `.lean` file is delivered or presented as a formalization.

## Gate Decision

Gate result: `DEFERRED`

Reason:

```text
Lean executable installed, but mathlib cache/build did not complete in this environment due timeout and disk exhaustion.
```

Required green gate not achieved:

```text
lake build
```

was not accepted as green because `lake exe cache get` did not complete and the environment hit disk exhaustion before the build could be trusted.

## BaseCore Contraction Formalization

Not attempted in this pass.

No `QICNContraction.lean` is delivered.

No theorem named `contraction` or `fixedpoint` is claimed as Lean-verified.

No `sorry` is introduced.

## Expected Hypotheses for a Future Attempt

The prompt-level target remains:

- Hilbert or complete metric structure for the ambient space.
- Nonempty closed convex set for the projection target.
- Non-expansiveness of the metric projection onto that set.
- Bounded linear operator `K` with strict norm bound `||K|| < 1`.
- Affine perturbation term `Gamma(u)`.
- Composition of a non-expansive projection with a strict affine contraction.
- Banach fixed-point theorem or mathlib `ContractingWith` fixed-point API for uniqueness and convergence.

Comparison with BaseCore H1-H3 should be done only after a verified Lean proof attempt exists. The expected pressure point is that Lean/mathlib may require explicit completeness, nonemptiness, closedness, convexity, and projection non-expansiveness assumptions that prose BaseCore may leave implicit or distribute across hypotheses.

## Reproduction Procedure for Another Machine

Use a machine with enough disk space for mathlib cache artifacts.

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/leanprover/elan/master/elan-init.ps1" -OutFile "C:\tmp\elan-init.ps1"
& "C:\tmp\elan-init.ps1" -NoPrompt $true -DefaultToolchain stable
$env:ELAN_HOME="$env:USERPROFILE\.elan"
lean --version
lake --version
```

Then create the project and run:

```powershell
lake init QICNLean math
lake exe cache get
lake build
```

Only after `lake build` is green should a `QICNContraction.lean` file be written and reported.

## Non-Claims

- This report does not prove any BaseCore theorem.
- This report does not formalize consciousness, `C_op`, `I_int`, CCR, invariants, identity, subjectivity, agency, or phenomenality.
- This report does not claim external validation.
- This report does not treat an installed executable as a verified formal proof environment for QICN.
