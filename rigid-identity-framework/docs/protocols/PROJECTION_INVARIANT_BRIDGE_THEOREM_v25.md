# Projection-Invariant Bridge Theorem v25

Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only.

## 1. Purpose

The v24 audits correctly identify a category mismatch: Papers 1--3 use inverse limits, Hausdorff/compact systems, weighted deformation metrics, and ontological mass, while the Session Zero runner consumes finite scalar observations and compares predictive models. This document closes what can be closed without inventing evidence: it defines the exact conditions under which a finite observable statement may be treated as a projection-invariant certificate, and it explicitly states what remains outside that certificate.

## 2. Ontological, mathematical, implementation, and interpretive layers

- **Ontological layer.** The latent object is a projective identity system \(X=(S_t,\pi_{t+1\to t})\) with identity object \(\mathcal I\). QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone.
- **Mathematical model.** A measurement campaign declares a lossy projection \(\Pi:X\to Y\) into finite observables and a finite list of invariants \(F_j:X\to Z_j\). A finite estimator \(G_j:Y\to Z_j\) is admissible only with an explicit error budget.
- **Implementation.** The runner evaluates only finite claims of the form \(d_j(G_j(\Pi(x)),F_j(x))\leq \varepsilon_j\) or predictive superiority under a preregistered model class.
- **Interpretation.** Passing a finite bridge certificate supports only the corresponding finite invariant claim. It does not prove \(M_\Omega=+\infty\), global atomicity, phenomenality, or nonempty \(C_{op}\).

## 3. Conditional finite projection-invariant bridge theorem

**Definition 3.1 (projection manifest).** A projection manifest is a tuple
\[
\mathcal B=(\Pi,\{F_j\}_{j=1}^m,\{G_j\}_{j=1}^m,\{\varepsilon_j\}_{j=1}^m,\mathcal R,\mathcal N),
\]
where \(\Pi\) is a declared finite observation channel, \(F_j\) are latent invariants, \(G_j\) are observable estimators, \(\varepsilon_j\) are error tolerances, \(\mathcal R\) is a family of rival projection models, and \(\mathcal N\) is a family of negative controls.

**Theorem 3.2 (finite bridge certificate).** Suppose a campaign freezes a projection manifest \(\mathcal B\) before outcome analysis and verifies all of the following:

1. **Estimator adequacy.** For each declared invariant \(F_j\), the campaign provides either a proof or a calibration record that \(G_j\circ\Pi\) estimates \(F_j\) with error at most \(\varepsilon_j\) on the declared regime.
2. **Rival resistance.** No rival \(R\in\mathcal R\) matches or exceeds the target claim under the same data, exclusion rules, noise model, and complexity accounting.
3. **Negative-control failure.** Each negative control \(N\in\mathcal N\) fails to trigger the same support rule.
4. **Custody.** The manifest, prediction bundle, runner code, raw data hash, and exclusion log are frozen before scoring.

Then the campaign may assert the corresponding finite projection-invariant claim:
\[
\operatorname{Truth}_{\mathrm{operational}}(C \mid \Pi,Y,\varepsilon,\mathcal R,\mathcal N).
\]
It may not assert reconstruction of \(X\), global proof of \(M_\Omega=+\infty\), or bridge-burden closure.

**Proof sketch.** By estimator adequacy, each observable estimator approximates its declared latent invariant within the frozen tolerance on the declared regime. Rival resistance and negative-control failure rule out, relative to the declared competitor class, that the same support rule is obtained by a simpler projection artifact or a degenerate control. Custody prevents post-hoc selection of the estimator, tolerances, or exclusions. Therefore the claim is adjudicable only at the operational invariant level. The conclusion is conditional because failure of estimator adequacy, incompleteness of \(\mathcal R\), or unmodelled noise invalidates the bridge.

## 4. Explicit non-equivalence result

A finite bridge certificate is not equivalent to \(M_\Omega=+\infty\). Multiple latent systems can share the same finite projection. Therefore the map \(\Pi\) is generally non-injective and the fiber \(\Pi^{-1}(y)\) may contain systems with different global topological properties. Any property varying across that fiber is marked `NON_IDENTIFIABLE_FROM_CURRENT_CHANNEL`.

## 5. Required v25 implementation bindings

- The Session Zero runner must name its comparison method as finite diagnostic, not as a proof of \(M_\Omega\).
- Parameter counts used in AIC-like comparisons must be derived from frozen free-parameter lists.
- Thresholds must declare calibration provenance.
- Synthetic fixtures must be diagnostic only.
- Downgrade scripts must verify report and provenance hashes before emitting proposals.

## 6. Reviewer burden

A reviewer should reject any public claim that collapses `finite projection-invariant support` into `global ontological proof`. The bridge theorem above is a conditional firewall, not a metaphysical elevator.
