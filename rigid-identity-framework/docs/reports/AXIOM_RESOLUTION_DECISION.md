# Axiom Environment Resolution Decision v1

Date: 2026-05-25  
Scope: FCR v11 monolithic lexical-risk closure.

## Decision

Use option A from the v11 plan: normalize the displayed theorem environment
name for the shared `axiom` environment to `Axiom` in Papers 8 and 9.

## Rationale

The monolithic-risk auditor reported one manual-review group:

```text
\begin{axiom}: Axiom / Bridge Axiom
```

The semantic role of the affected statements remains visible through optional
titles such as `B1: ...` and through surrounding bridge sections. Keeping a
single `axiom` environment display name avoids duplicate `\newtheorem{axiom}`
display-label divergence during possible unified-volume compilation.

## Boundary

This resolves a lexical/theorem-environment risk only. It does not certify
monolithic compilation, theorem truth, external validation, consciousness,
phenomenality, or bridge admissibility.

## Verification

Required command:

```powershell
npm run audit:monolithic-risk
```

Expected status for this decision:

```text
Manual-review theorem declaration groups: 0
```
