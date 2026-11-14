# QICNLean — formal companion to BaseCore and Papers I–X

This is the only active Lean package. Its mathematical sources are independent
of the runtime and of AI-platform reports. The manuscript remains the source of
the statements being compared; a formal companion does not replace it.

## Reproduction

The package pins **Lean 4.31.0** in `lean-toolchain` and Mathlib to commit
`fabf563a7c95a166b8d7b6efca11c8b4dc9d911f` in `lake-manifest.json`.
Nine dependency revisions are checked by the serial verifier. Install the pinned
toolchain with elan; invoke commands from this package or from the inner framework
as indicated, so a global default toolchain cannot silently replace it.

Native Lake, from this directory:

```sh
lake exe cache get
lake build
```

Full theorem/axiom audit, from `rigid-identity-framework/`:

```sh
python scripts/verify-lean.py
python scripts/verify-lean-coverage.py
```

The verifier rejects admissions, unexpected toolchain revisions, unreachable
modules and axiom dependencies outside `propext`, `Classical.choice`, `Quot.sound`.
It compiles all sources and runs `#print axioms` for every public theorem/lemma.
Successful dependency-cache acquisition alone is not a project proof check.

### Windows reproduction using existing pinned dependencies

The local `.lake` is an ignored NTFS junction to
`E:/QICN-LEAN/v4.31.0-desktop`. It is storage, not a second source package.
Never recursively copy/delete it. A fresh installation may use an ordinary
`.lake` directory instead; dependency storage is not part of the Git source.

From the inner framework, with Lean 4.31.0 on PATH:

```powershell
python scripts/verify-lean.py --kernel-only --packages-dir E:/QICN-LEAN/v4.31.0-desktop/packages
```

This performs fresh serial elaboration, including imported project modules and
the aggregate, without Lake's native/C build graph. Output and object hashes are
recorded in the ignored repository `.cache/qicn-lean/`. It still uses the Lean
kernel and the checked pinned Mathlib object cache; it is not an untrusted parser.

Route 6's Windows native build was interrupted after 712 seconds without build
progress; it is **not verified**. The serial baseline passed 32 source files
(31 modules plus the aggregate), 250 public declarations and the three allowed
axioms. Historical WSL/native receipts describe their own checkpoints, not a
fresh native success for this edition. Root Docker/CI currently run governance
and release gates; they do not run Lean.

## Coverage and fidelity

The [complete 419-entry matrix](../docs/ai-platform-outputs/repair-plans/RUTA6_PAQUETE_LEAN_Y_MECANIZACION_2026-11-14/COVERAGE_MATRIX_419.md)
links exact registry IDs to Lean symbols, source hashes, hypotheses, dependencies,
priority and remaining obligations. Its adjacent JSON is checked by
`verify-lean-coverage.py`. Public Lean declarations and manuscript entries have
different denominators: auxiliary lemmas do not count as whole source theorems.

- `EXACT_MATCH`: reviewed equality of mathematical scope under translated hypotheses.
- `FINITE_OR_PARTIAL_KERNEL`: finite instances **or** general analytic components;
  the matrix states which and identifies the missing source conclusion.
- `PENDING_MATHLIB`: no verified source-equivalent statement yet linked.
- `EMPIRICAL_OR_PROTOCOL_BOUNDED`: abstract implications can be formalized;
  calibration, data admissibility and independent replication remain external.

The package includes general real Hilbert projection, Banach contraction,
parametric affine attractors, projective transport and finite certificate kernels.
The matrix, rather than a module filename, determines each result's scope.
H5 non-collapse is conditional on explicit anti-constant hypotheses; contraction
alone supplies no non-collapse. No finite surrogate is promoted to an infinite
statement. The plan's execution report records the current audited totals.

Route 6 adds three modules (21 public theorems/lemmas), reusing the existing
general analytic proofs. The package now has 35 source files and 271 public
declarations; these totals include the aggregate and auxiliary results.

| Module | General scope | Main registry anchors |
|---|---|---|
| [QICNAnalyticProjection](QICNLean/QICNAnalyticProjection.lean) | Arbitrary real/complex Hilbert spaces, nonempty closed **real-convex** set, unique minimizer and norm non-expansiveness | BaseCore `thm-projection`, `lem-nonexp` |
| [QICNParametricContraction](QICNLean/QICNParametricContraction.lean) | Complete metric spaces; uniform contraction constant and statewise parameter continuity; compact range requires compact parameters | BaseCore `thm-contraction`, `thm-fixedpoint`, `thm-compactness` |
| [QICNInverseLimitTopology](QICNLean/QICNInverseLimitTopology.lean) | All natural-number stages, product-subspace topology, closed/compact coherent histories, separate nonemptiness, unique continuous cone lift and separation | Paper I `thm-minimal`, universal-property proposition; BaseCore/Paper II canonical-projection endomorphisms; `thm-stone-classification` only partial |

The weighted-history metric's finiteness, completeness, tail bound and agreement
with product topology are still distinct obligations. The law-limit theorem's
metrizability, clopen point basis, convexity and path connectivity are not supplied
by compactness of the point-history set. A universal-property proof here concerns
sets/topological spaces for the declared successor system, not arbitrary categories.

## Source history and boundaries

The original 32 Lean files and four package/configuration files moved byte for
byte from `docs/ai-platform-outputs/formal/lean/`. Git records the renames and the
Route 6 relocation manifest records SHA-256. Historical receipts remain intact.
In particular, `reproduce_p5.py` extracts a fixed old Git checkpoint: the old
path is correct inside that archive and must not be rewritten there.

Manuscripts, registry IDs, frozen release/corpus/artifacts and legacy sources
were excluded from this relocation. Interpretations, novelty, full BPF class
membership, identification of `(e_i, phi_i)`, calibration and human review are
not kernel conclusions. `external_support_certified=false` remains in force.
