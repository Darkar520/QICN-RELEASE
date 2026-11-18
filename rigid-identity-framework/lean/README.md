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

Route 6's historical Lake native/C build was interrupted after 712 seconds
and remains unverified as a Lake build. This is distinct from the successful
native Windows serial KERNEL elaboration. Etapa 2 verified 35 sources and 271
public declarations. Etapa 3A's fresh all-source receipt is
[LEAN_REPRODUCTION.json](../docs/ai-platform-outputs/repair-plans/ETAPA3_MECANIZACION_QICNLEAN_2026-11-15/LEAN_REPRODUCTION.json).
Neither a WSL installation nor a cached project object is substituted for
that fresh check. Root Docker/CI run governance and release, not Lean.

## Coverage and fidelity

The [coverage matrix (419 initial targets, 442 active)](../docs/ai-platform-outputs/repair-plans/RUTA6_PAQUETE_LEAN_Y_MECANIZACION_2026-11-14/COVERAGE_MATRIX_419.md)
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
general analytic proofs. Etapa 2 has 35 source files and 271 public
declarations. Etapa 3A adds five modules and 77 public results: **40 sources
including the aggregate, 348 public theorems/lemmas**. These totals include
auxiliaries; the source-target denominator was 436 in Etapa 3A and is now 442. The six scientific additions are manuscript-only and remain PENDING_MATHLIB.
Coverage: 14 EXACT_MATCH, 56 FINITE_OR_PARTIAL_KERNEL, 350 PENDING_MATHLIB
and 16 EMPIRICAL_OR_PROTOCOL_BOUNDED. Ten prior exact matches are preserved.

| Module | General scope | Main registry anchors |
|---|---|---|
| [QICNAnalyticProjection](QICNLean/QICNAnalyticProjection.lean) | Arbitrary real/complex Hilbert spaces, nonempty closed **real-convex** set, unique minimizer and norm non-expansiveness | BaseCore `thm-projection`, `lem-nonexp` |
| [QICNParametricContraction](QICNLean/QICNParametricContraction.lean) | Complete metric spaces; uniform contraction constant and statewise parameter continuity; compact range requires compact parameters | BaseCore `thm-contraction`, `thm-fixedpoint`, `thm-compactness` |
| [QICNInverseLimitTopology](QICNLean/QICNInverseLimitTopology.lean) | All natural-number stages, product-subspace topology, closed/compact coherent histories, separate nonemptiness, unique continuous cone lift and separation | Paper I `thm-minimal`, universal-property proposition; BaseCore/Paper II canonical-projection endomorphisms; `thm-stone-classification` only partial |

Etapa 3A adds these five modules, with one namespace per source:

| Module | Mechanized scope | Boundary |
|---|---|---|
| [QICNBaseSufficiency](QICNLean/QICNBaseSufficiency.lean) | H1--H4 packaged on the complete real Hilbert domain; actual radial metric projection on the Euclidean disk; zero-family countermodel | Full spectral/Frechet and logarithmic relaxation statements remain partial |
| [QICNWeightedChannels](QICNLean/QICNWeightedChannels.lean) | Two infinite commuting towers, continuous channel, all-stage infimum coercivity, post-readout bounds; SUP tail and separate capped SUM | Does not establish completeness/Polish or equivalence of the weighted metric and product topology |
| [QICNMooreFactorization](QICNLean/QICNMooreFactorization.lean) | Typed controlled Moore systems; word-compatible morphisms; all surjective private product forecasts, finite maximum and infimal sigma/2 gap; hold/swap controls | Fixed calibrated primitive ports; no exclusion of joint decoders, messages or arbitrary simulator families |
| [QICNFourRootContrast](QICNLean/QICNFourRootContrast.lean) | All functions of proper subsets on the four-bit cube and arbitrary finite sums; exact 4*xi4 optimum and absolute-loss lower bound | Full source theorem remains partial: arbitrary random measures/past, raw-reading, plant and cost semantics need their own proof |
| [QICNFiniteAdjudication](QICNLean/QICNFiniteAdjudication.lean) | Actual finite joint laws, separate clean/coupling nulls, fixed coverage floors and selective-leak/abstention controls | Not arbitrary probability spaces or sharp witnesses for every real coverage/leak budget |

For weighted histories, SUP finiteness iff criteria, sector completeness,
metric axioms and product-topology equivalence are still mechanization debt.
The capped SUM is explicitly auxiliary. The channel theorem assumes the source
metric/topology contract; it does not prove that contract by invoking it.
The law-limit theorem's metrizability, clopen point basis, convexity and path
connectivity do not follow merely from compactness of point histories.
A cone-lift proof concerns the declared successor system in sets/topological
spaces, not arbitrary categories.

Full per-target semantic review, unchanged source hashes and Etapa 3B obligations
are in [COVERAGE_DIFF.json](../docs/ai-platform-outputs/repair-plans/ETAPA3_MECANIZACION_QICNLEAN_2026-11-15/COVERAGE_DIFF.json).
A source target is EXACT_MATCH only if all its conclusions are covered on its
actual domains. Every manuscript source, 921 registry entries and 383 macros
remain unchanged in this phase. Internal proof is not scientific certification.

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

## Scientific branch concordance

The current registry contains 927 entries and 383 macros. Its 442 source targets comprise 14 EXACT_MATCH, 56 FINITE_OR_PARTIAL_KERNEL, 356 PENDING_MATHLIB and 16 EMPIRICAL_OR_PROTOCOL_BOUNDED. The six new manuscript results have no new source-equivalent Lean proof. This branch retains the 40-source/348-declaration package; the experimental Etapa 3B checkpoint is preserved on its separate branch. Reproduction status is recorded in the scientific phase receipt and is not inferred from these counts. external_support_certified=false.
