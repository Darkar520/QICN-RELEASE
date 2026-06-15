# QICN Evidence Surface and Open Gaps

Status: `NON_CANONICAL_AI_OUTPUT_FOR_HUMAN_REVIEW`

Date: 2026-06-15

Scope: verification and documentation only. This report does not prove atomicity, instantiate a concrete system `S`, close bridge burdens, or claim external validation.

## Phase 1 verified evidence block

### Paper 5 theorem and remark

The audit's approximate line references for `thm:iint-faithful-factorization-triviality` and the atomicity-burden remark are accurate in the current source.

Verified source: `paper5_operational_consciousness/main.tex`.

Atomicity premise, lines 339-342:

```tex
\begin{theorem}[Factorization triviality under an atomic separator]\label{thm:iint-faithful-factorization-triviality}
Assume $\Theta_S$ is atomic for the rigid identity object: no partition of
$\Theta_S$ into two proper factor-local separator families can preserve
identity, history, and intervention-response reflection simultaneously. Then
```

Conclusion, lines 342-344:

```tex
identity, history, and intervention-response reflection simultaneously. Then
every intervention-faithful exact factorization of $S$ is trivial up to
admissible isomorphism.
```

Remark on the remaining burden, lines 361-366:

```tex
\begin{remark}[Status of the atomicity burden]\label{rem:iint-atomicity-burden}
The theorem above is a genuine conditional closure: once atomicity of the
identity/history/response separator is established, the factorization lemma is
proved. It does not by itself prove that every system satisfying the upstream
papers has an atomic separator. That implication remains the exact remaining
mathematical burden for upgrading Proposition~\ref{prop:integration-transfer}.
```

Discrepancy check: no discrepancy for the theorem/remark line region. The theorem starts at line 339 and the remark starts at line 361.

### Product-separator counterexample status

Search result: a canonical product-separator counterexample was not found in `basecore/` or `paper5_operational_consciousness/` by the searched terms `Product separator blocks`, `product-separator counterexample`, `product separator`, `fails atomicity`, and `do not imply atomicity`.

What is present in Paper 5 is a warning that raw connectivity is not enough: a fully connected graph may fail if dynamics factor into nearly independent blocks once identity and intervention behavior are considered (`paper5_operational_consciousness/main.tex:321`). That is not itself a full product-separator counterexample.

The explicit product-separator evidence is in non-canonical / report surfaces:

- `docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md:98-126` says current assumptions do not exclude weakly coupled products where identity, histories, and interventions can be preserved componentwise while the separator decomposes. It labels this as `gap / counterexample candidate`, not a completed canonical theorem.
- `docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md:132-142` states that the conditional theorem remains valid, but the implication `rigid identity + continuity + intervention fidelity => atomic operational separator` is not proved, and a plausible product-separator counterexample family shows why an extra assumption is required.
- `docs/reports/I_INT_STATUS_UPDATE.md:14-22` records that upstream atomicity is not proved and that the product-separator candidate explains why the current assumptions do not obviously imply atomicity.
- `docs/ai-platform-outputs/recovery-candidates/backup-noise-2026-06-03/i-int-atomic-separator-closure/I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex:112-143` contains the explicit proposition `Product separator blocks the global derivation`, proving inside that scaffold that rigid identity, product-topological continuity, and componentwise intervention fidelity do not imply atomicity.
- `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex:288-299` says the note is intentionally not inserted into Paper 5 and requires later human mathematical curation before promotion.

Honest reading: the corpus has strong evidence that the atomicity premise is not free. But the explicit product-separator argument lives in report/scaffold layers, not as a canonical BaseCore or Paper 5 theorem.

### Raw verification verdict

Command run from cwd `rigid-identity-framework/`:

```powershell
npm run verify
```

Exit code: `0`.

Raw adjudicator lines:

```text
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Interpretation: exit code 0 means the verification chain ran. It does not mean the corpus is externally certified. Both adjudicators explicitly report `external_support_certified=false`.

## What the corpus has (verified)

| Surface | Verified artifact path | Current status / reading |
|---|---|---|
| Phase 7 neutral systems bank v2, `n=3..6` | `docs/ai-platform-outputs/sims/phase7/qicn_phase7_neutral_systems_bank_v2.js`; latest JSON at `docs/ai-platform-outputs/sims/phase7/results/latest/phase7_bank_v2.json` | Internal finite Boolean bank for local comparison and controls. |
| GNW principled detector v2 | `docs/ai-platform-outputs/sims/phase7/qicn_phase7_gnw_principles_detector.js`; latest JSON at `docs/ai-platform-outputs/sims/phase7/results/latest/phase7_gnw_principles_results.json` | Internal toy operationalization; not full neuronal GNW. |
| Candidate QICN classifier | `docs/ai-platform-outputs/sims/phase7/qicn_phase7_qicn_candidate_noncircularity.js` | Receives only `n` and `transition_table`; input-contract audit passes, but this does not prove non-circularity in the theory. |
| Brute-force atomicity truth | `docs/ai-platform-outputs/sims/phase7/qicn_phase7_atomicity_ground_truth.js` | Computes dynamic non-factorization from `n` and `transition_table` only. |
| Phase 7 negative result | `docs/ai-platform-outputs/reports/QICN_PHASE7_QICN_INSTANTIATION_AND_NONCIRCULARITY.md:3,113,127,214`; `docs/ai-platform-outputs/reports/QICN_GAP_I_INT_ATOMIC_SEPARATOR_MODEL_CARD.md:180-192` | `CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY`; accuracy `0.8929`; no external validation. |
| Phase 6 calibration / sensitivity / ceiling reports | `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3F_CALIBRATION_SENSITIVITY_AND_CEILING_REPORT.md`; `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3_CLOSE_CONSOLIDATION_AND_CEILING.md` | Internal synthetic calibration. The reports explicitly say synthetic discriminability is not external validation and that additional synthetic refinement has diminishing returns without an external objective. |

## What the corpus does not have (verified)

1. No verified concrete instance of `S=(X,\Phi,C,R,\Gamma,U)` satisfying all six invariants. Paper 5 defines the tuple at `paper5_operational_consciousness/main.tex:81-85` and defines `S \in \Cop` by the six invariant conjunction at `paper5_operational_consciousness/main.tex:484-488`. The certificate rule at `paper5_operational_consciousness/main.tex:1120-1155` states what would be required for certification, but this is a rule, not an exhibited certified member. The scope note at `paper5_operational_consciousness/main.tex:96` explicitly says runtime-facing support does not certify any present machine as a member of `\Cop`.
2. No empirical evidence that the bridge section connects the finite bank with the theory in a non-trivial qualified-system sense. Paper 9 says it does not convert candidate inclusion, packaging, runtime cleanliness, or BPF-1 provisional surfaces into bridge confirmation (`paper9_phenomenal_bridge_organization/main.tex:124-126`). It also says positive provisional bridge surfaces are not enough (`paper9_phenomenal_bridge_organization/main.tex:622-628`) and that the current program does not yet support bridge comparator closure, intervention closure, gate closure, ecosystem integration, bridge admissibility, or strong support (`paper9_phenomenal_bridge_organization/main.tex:1007-1014`).
3. No external validation. `npm run verify` reports `external_support_certified=false` in both v30 and v31 adjudicators. The claim-status policy says registry/status language does not prove empirical support, external adjudication, consciousness, phenomenality, identity transfer, agency, moral status, or bridge confirmation (`docs/CLAIM_STATUS_POLICY.md:8-10`).

## The I_int gap is the core, not a footnote

The central Paper 5 theorem is valid conditionally: atomicity of `\Theta_S` implies intervention-faithful factorization triviality up to admissible isomorphism (`paper5_operational_consciousness/main.tex:339-344`). But the theorem's own remark states that it does not prove every upstream-satisfying system has an atomic separator, and that this remains the exact remaining mathematical burden for `prop:integration-transfer` (`paper5_operational_consciousness/main.tex:361-366`).

The product-separator material makes the burden substantive rather than cosmetic. The explicit counterexample argument is not canonically inserted into Paper 5/BaseCore, but the report/scaffold evidence shows why rigid identity, continuity, and componentwise intervention fidelity do not automatically imply atomicity (`docs/reports/ATOMIC_SEPARATOR_LEMMA_ATTEMPT.md:98-126`; `I_INT_ATOMIC_SEPARATOR_CLOSURE_v20.tex:112-143`).

Honest reading: QICN currently has a formal grammar with a central theorem whose decisive premise is not demonstrated in general. That is not a fatal flaw, but it is not a solved theorem either.

## Release discipline is operant, not proof

The repository has real release discipline:

- `docs/CLAIM_STATUS_POLICY.md` separates source status, human curation, internal evidence, and external evidence.
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_3NR_CONSTRUCT_NONREDUNDANCY.md` documents internal non-redundancy work for gate constructs.
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md` records implementation traceability, commands, hashes, residual risks, and next steps.
- The current verification chain preserves blocked scientific verdicts rather than hiding them behind exit-code success.

But discipline is not proof. A proof-level or publication-level upgrade requires at least:

- human mathematical peer review of the atomic-separator route;
- a certified concrete instance of `S=(X,\Phi,C,R,\Gamma,U)` satisfying all six invariants on the same admissible support;
- independent replication of the Phase 7 comparison and truth-definition choices;
- external adjudication before any validation language is used.

artefacto de IA no-canónico; no cierra ningún gap, no valida QICN, no implica claim de conciencia/identidad/subjetividad/superioridad.
