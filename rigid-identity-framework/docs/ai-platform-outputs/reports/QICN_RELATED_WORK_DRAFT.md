# QICN Related-Work Draft

Status: `NON_CANONICAL_DRAFT_FOR_HUMAN_REVIEW`

Date: 2026-06-16

Scope: exposure draft only. This file is not inserted into any `.tex`, does not canonize any comparison, does not claim superiority over rival theories, and does not close any formal or empirical gap.

## Local Verification Anchors

- Paper 5 defines the admissible-system tuple `S=(X,\Phi,C,R,\Gamma,U)` and its components at `paper5_operational_consciousness/main.tex:81-85`.
- Paper 5 states the six critical invariants and the approximate-stability theorem family at `paper5_operational_consciousness/main.tex:87`, `paper5_operational_consciousness/main.tex:711-733`.
- Paper 5 defines exact and approximate structural equivalence at `paper5_operational_consciousness/main.tex:513-542`.
- Paper 5 contrasts its six-invariant criterion against weak functionalism, single-metric integration accounts, biologically privileged baselines, and strong phenomenal readings at `paper5_operational_consciousness/main.tex:1398`.
- The local literature gap inventory verified that Paper 5 cites Tononi 2004 and Baars/Chalmers at `paper5_operational_consciousness/main.tex:1398`, and that `release/references.bib` contains `baars1988`, `tononi2004`, `chalmers`, `chalmers1995`, and `parfit1984` at lines `18`, `99`, `207`, `318`, and `396`.
- The same inventory did not find local paper-source citations for Koch, Dehaene, Mashour, Friston, Dennett, Block, Tye, Lewis, Shoemaker, Rosenthal, or Lau.

## 1. Rigid Identity as Inverse-Limit vs Personal Identity

Target literature: Parfit (1984), Lewis (1976), Shoemaker, and the psychological-continuity family.

QICN's declared construct is not ordinary psychological survival. The local formal object is an inverse-limit / rigid-identity construction over compatible observable channels, with persistence and non-simulability constraints internal to the corpus. The comparison target is Parfit-style psychological continuity with relation `R`: continuity may be sufficient for survival or identity-relevant relation in those debates, while QICN asks for a stricter mathematical object that remains coherent across observational projections and admissible transformations.

The guiding reviewer question is: in what exact sense does inverse-limit identity differ from "psychological continuity with relation R"? A publishable answer must specify whether QICN adds (i) projective coherence, (ii) uniqueness/rigidity, (iii) non-simulability under incompatible architectures, or (iv) a different equivalence class entirely. Right now the corpus has formal machinery, but not enough explicit confrontation with Parfit/Lewis/Shoemaker to prevent a reviewer from reading inverse-limit identity as a technical redescription of continuity.

Required hardening:

- State the formal object compared: inverse-limit identity object, not a person-level identity claim.
- Define the rival comparator: psychological continuity / connectedness / relation `R`.
- Identify where QICN is stricter, where it is orthogonal, and where it may be weaker.
- Avoid any claim that QICN resolves personal-identity debates.

Diferenciación declarada, no probada; pendiente de validación humana.

## 2. `I_int` / Integration vs IIT Phi

Target literature: IIT / Tononi-Koch, with local verified citation to Tononi 2004.

QICN's `I_int` is not a Phi surrogate. In Paper 5, causal integration is part of a conjunctive six-invariant criterion and is coupled to identity, continuity, differentiation, legibility, admissible support, and intervention behavior. IIT's Phi is a quantitative integration measure in a different formal tradition. The local Phase 7 PyPhi work is useful as an internal rival-side probe, but it already shows a warning: `cycle_ring_copy n=3` can produce high constant Phi through degenerate permutation dynamics, so Phi output in tiny Boolean systems is not automatically evidence of meaningful integration.

The declared difference is therefore not "QICN beats IIT." The defensible draft claim is narrower: QICN refuses to let integration alone certify the target class. Paper 5 says the criterion requires continuity, identity, and legibility jointly rather than treating integration by itself as sufficient. That is a structural-positioning claim, not an empirical victory.

Required hardening:

- Define exactly which `I_int` statement is conditional on the atomic-separator burden.
- Explain why Phi and `I_int` answer different questions.
- Report PyPhi degeneracy as a limitation of the local toy evidence, not as a defect of IIT as a theory.
- Add explicit Tononi/Koch bibliography before any public related-work use.

Diferenciación declarada, no probada; pendiente de validación humana.

## 3. `C_op` + Six-Invariant Certificate vs GWT/GNW

Target literature: GWT/GNW, Baars, Dehaene, Mashour.

The local corpus already cites Baars and Chalmers in Paper 5, but it does not yet confront Dehaene/Mashour. QICN's `C_op` certificate is a membership rule requiring six invariants on the same admissible support. GNW/GWT is typically framed around global availability / broadcast / ignition. The Phase 7 GNW detector is explicitly a tiny Boolean broadcast-like detector, not a full GNW model.

The declared difference is that QICN treats broadcast-like availability as at most one kind of operational evidence, while `C_op` requires a full certificate: support, identity, integration, continuity, differentiation, legibility, interventions, negative controls, and audit-ready readout. This does not show GNW is false. It says QICN's admissibility burden is conjunctive and more certificate-shaped than a broadcast-only toy criterion.

Required hardening:

- Add Dehaene/Mashour references and confront ignition/access claims directly.
- Show whether GNW can satisfy some QICN invariants, rather than treating it as an outside foil.
- Distinguish "GNW unavailable in this tiny detector" from "GNW theory fails."
- Preserve `NOT_RUN` for QICN-vs-rival comparison until QICN instantiation is qualified.

Diferenciación declarada, no probada; pendiente de validación humana.

## 4. `C_op` vs HOT

Target literature: higher-order theories, Rosenthal, Lau.

HOT asks whether a mental state is conscious in virtue of an appropriate higher-order representation, thought, or awareness relation. QICN's `C_op` certificate does not currently require a higher-order representation as such. It requires structural persistence, rigid identity, causal integration, continuity, non-null differentiation, and operational legibility. A HOT-like self/second-order readout could be one route to legibility, but it is not identical to the whole certificate.

The open technical question is whether HOT should be modeled as a candidate implementation of legibility / decoder certification, or as a rival criterion for consciousness. Treating it as a mere missing "extra feature" would be sloppy. The publishable move is to formalize a HOT comparator: define the higher-order state relation, test whether it implies any QICN invariant, and test whether QICN membership implies anything HOT-like. Neither implication should be assumed.

Required hardening:

- Add Rosenthal/Lau references if this section is promoted.
- Decide whether HOT maps to `I_leg`, a separate invariant, or a rival membership condition.
- Provide countermodels: QICN-like certificate without HOT; HOT-like architecture without full QICN certificate.

Diferenciación declarada, no probada; pendiente de validación humana.

## 5. `C_op`, FEP, and Predictive Processing

Target literature: Friston / Free Energy Principle and predictive-processing frameworks.

FEP and predictive processing typically frame cognition in terms of generative models, prediction error, variational free energy, active inference, and organism-environment regulation. QICN's `C_op` certificate is not a free-energy principle and does not currently require a generative model. Its closest possible contact points are persistence, admissible support, intervention robustness, negative controls, and readout stability.

The declared difference is architectural: FEP/predictive processing supplies a dynamical-statistical account of adaptive inference, while QICN supplies a certificate grammar for framework-internal class membership. Those may overlap in systems that maintain stable support and legible intervention-response structure, but neither subsumes the other from current evidence.

Required hardening:

- Add Friston and predictive-processing bibliography before public use.
- Formalize whether variational free-energy minimization can witness any of the six invariants.
- Distinguish adaptive self-maintenance from QICN rigid identity.
- Avoid implying that QICN explains organismic cognition without an instantiated `S`.

Diferenciación declarada, no probada; pendiente de validación humana.

## 6. `C_op` vs Functionalism / Operationalism

Target literature: Dennett, Block, Tye, and broader operationalist / functionalist readings.

Paper 5 already frames the criterion as more constrained than weak functional similarity because a same-output rupture pair can agree on benchmark readouts while one member loses a critical invariant. That is the right form of argument: not "functionalism is wrong," but "role equivalence alone is too weak for this specific six-invariant class."

The local corpus still needs a fair adversarial comparison. Dennett-style operational / intentional-stance readings, Block-style access vs phenomenal distinctions, and Tye-style representational accounts are not all the same target. A related-work section must separate them rather than treating "functionalism" as a single straw target.

Required hardening:

- Split functional role, operational reportability, access consciousness, and representational content.
- State exactly which QICN invariants are invisible to same-output functional matching.
- Provide a formal same-output rupture pair as the comparator if promoted.
- Do not infer phenomenal consciousness from operational class membership.

Diferenciación declarada, no probada; pendiente de validación humana.

## 7. Ontological Mass / Deformed `M_Omega` vs Moduli and Rigidity Theory

Target literature: moduli spaces, rigidity theory, deformation theory.

The term "ontological mass" is dangerous if read metaphysically. The publishable formal reading should be deformation-rigidity modulus or obstruction measure: how costly, constrained, or impossible it is to deform an identity-bearing structure without crossing rupture or non-equivalence. If the corpus keeps `M_Omega`, it needs a technical gloss that prevents the word "mass" from sounding like a new physical quantity.

The neighbor literature is not consciousness theory but mathematical structure: moduli, rigidity, deformation spaces, stability, and obstruction. QICN must decide whether `M_Omega` is a true invariant, a family of bounds, a Lyapunov-like quantity, or an interpretive alias for several separate conditions. Without that decision, this construct remains under-formalized for external reviewers.

Required hardening:

- Specify the domain, codomain, invariance properties, and failure modes of `M_Omega`.
- Clarify whether `M_Omega=+\infty` is a theorem-bearing condition, a boundary case, or a shorthand.
- Compare with deformation rigidity rather than metaphysical weight.
- Do not imply new physics.

Diferenciación declarada, no probada; pendiente de validación humana.

## 8. Inverse-Limit Identity vs Profinite Limits

Target literature: inverse limits, profinite systems, topological / categorical constructions.

QICN uses inverse-limit language to encode compatibility across observation channels and levels. A reviewer can reasonably ask why the construction is inverse-limit rather than profinite, sheaf-like, coalgebraic, or another categorical/topological object. The draft answer is that inverse limits naturally encode compatible families of projections; profinite limits would be appropriate only if the relevant finite quotient / compact totally disconnected structure is actually part of the theory.

This is not a cosmetic issue. If the intended observable approximations are finite quotients with a natural directed system, profinite language may be technically sharper. If the intended objects are broader compatible diagrams, inverse-limit language is more general. The corpus must justify the choice rather than rely on mathematical aura.

Required hardening:

- State the diagram category and morphisms.
- Identify whether the approximants are finite quotients, observation channels, or measurement partitions.
- Decide whether profinite structure is a special case or the actual intended model.
- Add a reviewer-facing note explaining why inverse limit is technically necessary.

Diferenciación declarada, no probada; pendiente de validación humana.

## Non-Conclusions

- This draft does not claim QICN is superior to IIT, GNW/GWT, HOT, FEP, predictive processing, functionalism, operationalism, or personal-identity theories.
- This draft does not close the `I_int / atomic separator` gap.
- This draft does not instantiate any concrete `S=(X,\Phi,C,R,\Gamma,U)`.
- This draft does not validate Phase 7, the bridge, consciousness, identity, subjectivity, phenomenality, agency, or human equivalence.
- This draft is a scaffold for human related-work writing, not a paper section ready for canonical insertion.
