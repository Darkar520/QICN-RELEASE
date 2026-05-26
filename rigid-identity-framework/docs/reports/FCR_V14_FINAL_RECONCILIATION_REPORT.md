# FCR v14 Final Reconciliation Report

Status: IMPLEMENTED_STATIC_RECONCILIATION
Date: 2026-05-26
Scope: AntiGravity/OpenCode v14-final-prep audit claims, active checkout, FCR registry, Paper 3, Paper 8, Paper 9, Paper 10, and PRED-EXT-01 preregistration.

## Boundary

This report reconciles audit claims against the local repository and records
static implementation work. It does not report empirical support, external
adjudication, consciousness validation, phenomenality validation, subjecthood
validation, moral status, biological equivalence, or proof of any open theorem
burden. Registry reproducibility is a source-synchronization result, not a
mathematical truth certificate.

## 1. Hybrid Audit Verdict

The two audit streams agreed on a real infrastructure problem: after restoring
missing source files and running the extractor, `verify:corpus-registry --
--strict-crossrefs` exposed eight required audit-coverage blockers. Local
verification confirmed that this was not merely rhetorical drift. Paper 3 and
Paper 10 had theorem environments with missing labels, and Papers 8 and 9
lacked active labeled surfaces for several audit-covered burdens.

The audits also identified a real preregistration gap: the PRED-EXT-01 rehearsal
runner used trace length 240, while the preregistration did not explicitly bind
that rehearsal value.

One audit claim was rejected as stale in this checkout: no untracked
`scripts/lint-loaded-terms.js` file exists in the active tree.

The proposed repair of reintroducing strong Paper 8/Paper 9 theorems was not
accepted as stated. Adding unproved theorem claims would inflate the framework.
Instead, the active text now contains explicit criterion/conjecture burdens with
the required labels. This preserves audit coverage while making the epistemic
status visible: proof gap, circularity, conjectural compression, independence
burden, and vacuity remain marked as burdens rather than victories.

## 2. Implemented Actions

| Surface | Action | Epistemic Status |
|---|---|---|
| Paper 3 | Added `\label{thm:sim-cond}` to the existing Simulation Lower Bound theorem. | Conditional/audit-overlaid after extraction. |
| Paper 10 | Added `\label{thm:null-forced}` to the existing Null error lower bound theorem. | Conditional/audit-overlaid forced-choice correction. |
| Paper 8 | Added `thm:selfindex-emergence`, `thm:ownership-nontransfer`, and `thm:five-field-reduction` as criterion burdens. | Conditional, tautology, and conjectural burden surfaces; not proof closure. |
| Paper 9 | Added `thm:predicate-independence`, `thm:registry-independence`, and `thm:bridge-realization-exists` as conjecture/criterion burdens. | Conjectural or tautology burden surfaces; not bridge realization evidence. |
| PRED-EXT-01 preregistration | Documented rehearsal trace length `240` alongside `N_min = 200` and Laplace `lambda = 1`. | Rehearsal-only safeguard; evidential parameters remain unfrozen. |
| FCR registry | Re-ran `npm run extract:registry` after source reconciliation. | Registry now source-reproducible at 696 formal entries and 377 macros. |

## 3. Verification Commands

| Command | Result |
|---|---|
| `npm run extract:registry` | PASS; extracted 696 formal entries and 377 macro entries. |
| `npm run verify:corpus-registry -- --strict-crossrefs` | PASS; 0 blockers, 6 macro warnings. |
| `npm run verify:macro-registry` | PASS; 0 blockers, 6 macro warnings. |
| `npm run audit:extractor-reproducibility` | PASS; status `REPRODUCIBLE`, 696/696 formal and 377/377 macro. |
| `npm run audit:extractor-diagnostic` | PASS; missing-source delta 0, residual delta 0. |

## 4. Claims Accepted As Real

1. The eight audit-coverage blockers were real under regenerated registry
   verification.
2. Paper 3 and Paper 10 required stable theorem labels to avoid line-offset ID
   drift.
3. The extractor was not a reliable release authority while source files and
   registry counts diverged.
4. PRED-EXT-01 needed explicit rehearsal trace-length documentation.
5. Paper 8/Paper 9 audit surfaces needed active source anchors rather than
   registry-only historical ghosts.

## 5. Claims Rejected Or Downgraded

1. The untracked `scripts/lint-loaded-terms.js` claim is stale for this checkout;
   the file was not found.
2. The recommendation to insert strong Paper 8/Paper 9 theorem statements was
   downgraded. The implemented version uses criteria/conjectures because the
   current corpus does not prove the stronger claims.
3. Extractor reproducibility is not a proof certificate. It only says the
   current registry can be regenerated from current source files.
4. A clean FCR gate is not evidence for PRED-EXT-01, subjectivity, phenomenality,
   or external adjudication.

## 6. Remaining Gaps

| Gap | Severity | Required Next Step |
|---|---|---|
| No frozen evidential threshold | Critical | Freeze `rho_selective_threshold`, `penalized_loss_alpha`, seeds, dataset, trace length budget, exclusion rules, and adjudicator before evidential execution. |
| I_int burden not formally closed | High | Either prove the factorization-triviality lemma or materialize the downgrade through a source-aware curation flow. |
| Macro/monolithic risk remains | Medium | Resolve the six macro-collision warnings and test a monolithic LaTeX build with a shared preamble. |
| PRED-EXT-01 remains rehearsal-only | High | Convert the rehearsal runner into a frozen evidential runner with decision records. |
| Paper 8/Paper 9 burdens remain open | Medium-high | Replace criteria/conjectures with proofs, countermodels, or formal downgrades after independent mathematical review. |
| External replication absent | High | Run at least one clean-room reproduction after freeze. |

## 7. Final Assessment

The hybrid v14-final reconciliation closes the source-registry consistency gap
without inflating the theory. The framework is now better positioned for a
serious v15 step because the next bottleneck is no longer hidden registry drift:
it is the explicit scientific burden of freezing one threshold, running one
negative control, and recording a non-post-hoc decision.
