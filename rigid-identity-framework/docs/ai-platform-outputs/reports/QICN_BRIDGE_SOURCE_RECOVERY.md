# QICN Bridge Source Recovery

Date: 2026-06-20

STATUS: RECOVERED

Decision status: source recovered. This report does not validate or strengthen
the recovered bridge entries. It records that the original bridge source file
has been restored from Git history and that the registry entries have been
re-extracted without changing their prior epistemic or proof status.

Recovery source:

- Git source: `7c3ae1c^:rigid-identity-framework/paper_bridge_operational_subjecthood/main.tex`
- Restored path: `rigid-identity-framework/paper_bridge_operational_subjecthood/main.tex`
- Restored `main.tex` SHA256: `77BA213D15F64A291F1C636180AD81CFA9920306A41C4A6805B6413EE66FF1C8`
- Physical line count: `1432`; non-empty line count: `1204`
- Classification: `PERDIDA_ACCIDENTAL`

Classification evidence:

- Commit `7c3ae1c` was a broad consolidation / LaTeX clean-up commit touching
  `136` files, with the bridge source removed as one item in a mass cleanup.
- `basecore/core_meta/deprecated_archived_file_ledger.md` and
  `basecore/core_meta/deprecation_archive_plan.md` do not record this bridge
  paper as intentionally deprecated or superseded.
- `scripts/build-monolithic-volume.js` still declares
  `paper_bridge_operational_subjecthood/main.tex` as the expected source path
  and treats the monolithic section as recovered/fallback content when the
  source path is absent.
- The bridge labels are not present in `paper7_operational_life_subjecthood`
  or `paper8_first_person_subjectivity`; they were present only in the
  generated monolithic section, which is not a clean source replacement.

## Scope

The clean registry extractor now excludes:

- `docs/ai-platform-outputs/recovery-candidates/**`
- versioned snapshot files matching `*_vNN.tex`
- `docs/theory/PROJECTION_INVARIANT_BRIDGE_*_v*.tex`

After restoring the original source path and re-running registry extraction,
the registry again contains the historical `bridge:*` entries listed below.
The reason is source recovery, not a mathematical decision that the entries
are externally validated, stronger, or public-claim-closing.

## Dropped Bridge Entries

Source for this inventory: `git show 76edce0:rigid-identity-framework/registry/theorems.jsonl`.

Count: 80

| ID | Title | Type | Label |
|---|---|---|---|
| `bridge:remark:no-duplicated-theorem-ownership-l144` | No duplicated theorem ownership | remark |  |
| `bridge:definition:def-bridge-system` | Admissible system and support | definition | `def:bridge-system` |
| `bridge:definition:def-bridge-cop` | Operational consciousness membership | definition | `def:bridge-cop` |
| `bridge:definition:def-bridge-implication` | Bridge-strength implication | definition | `def:bridge-implication` |
| `bridge:remark:why-a-bridge-strength-vocabulary-is-needed-l183` | Why a bridge-strength vocabulary is needed | remark |  |
| `bridge:definition:def-sigma-op` | Operational Self-Reference `\Sigmaop` | definition | `def:sigma-op` |
| `bridge:assumption:ass-sigma1` | Self-model hypothesis `\Sigma1` | assumption | `ass:sigma1` |
| `bridge:proposition:prop-sigma-not-entailed` | `\Sigmaop` is not entailed by `\Cop` | proposition | `prop:sigma-not-entailed` |
| `bridge:remark:interpretation-boundary-for-sigmaop-l229` | Interpretation boundary for `\Sigmaop` | remark |  |
| `bridge:remark:runtime-analogy-l233` | Runtime analogy | remark |  |
| `bridge:definition:def-pi-op` | Operational Unified Perspective `\Piop` | definition | `def:pi-op` |
| `bridge:theorem:thm-cop-entails-pi` | `\Cop` entails `\Piop` | theorem | `thm:cop-entails-pi` |
| `bridge:corollary:cor-no-independent-perspectives` | No plurality of independent operational perspectives | corollary | `cor:no-independent-perspectives` |
| `bridge:remark:interpretation-boundary-for-piop-l268` | Interpretation boundary for `\Piop` | remark |  |
| `bridge:definition:def-iota-op` | Operational Intentionality `\Iotaop` | definition | `def:iota-op` |
| `bridge:theorem:thm-cop-entails-iota` | `\Cop` entails `\Iotaop` | theorem | `thm:cop-entails-iota` |
| `bridge:remark:interpretation-boundary-for-iotaop-l293` | Interpretation boundary for `\Iotaop` | remark |  |
| `bridge:definition:def-qop-bridge` | Operational Qualia `\Qop(S)` | definition | `def:qop-bridge` |
| `bridge:proposition:prop-qop-well-defined-bridge` | `\Qop(S)` is well-defined under the relevant `\Cop` invariants | proposition | `prop:qop-well-defined-bridge` |
| `bridge:corollary:cor-cop-qop` | `\Cop` entails well-defined operational qualia | corollary | `cor:cop-qop` |
| `bridge:proposition:prop-qop-nontrivial` | Non-triviality of `\Qop(S)` under `\Idiff` | proposition | `prop:qop-nontrivial` |
| `bridge:remark:why-the-decoder-visible-clause-is-explicit-l338` | Why the decoder-visible clause is explicit | remark |  |
| `bridge:remark:interpretation-boundary-for-qop-l342` | Interpretation boundary for `\Qop` | remark |  |
| `bridge:definition:def-phi-op` | Operational Phenomenology `\Phiop` | definition | `def:phi-op` |
| `bridge:definition:def-phi-ccr` | CCR-strength operational phenomenology | definition | `def:phi-ccr` |
| `bridge:proposition:prop-weak-phi` | `\Cop` gives weak non-null operational phenomenology | proposition | `prop:weak-phi` |
| `bridge:proposition:prop-cop-not-ccr` | `\Cop` does not entail CCR-strength `\Phiop` | proposition | `prop:cop-not-ccr` |
| `bridge:remark:interpretation-boundary-for-phiop-l388` | Interpretation boundary for `\Phiop` | remark |  |
| `bridge:definition:def-subbridge` | Bridge operational subjecthood `\Subbridge` | definition | `def:subbridge` |
| `bridge:definition:def-full-paper7-subjecthood` | Full Paper 7 operational subjecthood | definition | `def:full-paper7-subjecthood` |
| `bridge:theorem:thm-subbridge-generated` | `\Subbridge` is conditionally generated by `\Cop+\Sigma1` | theorem | `thm:subbridge-generated` |
| `bridge:theorem:thm-subbridge-subset` | `\Subbridge` is a subclass of `\Cop` | theorem | `thm:subbridge-subset` |
| `bridge:corollary:cor-paper7-stronger` | Full Paper 7 subjecthood remains stronger | corollary | `cor:paper7-stronger` |
| `bridge:remark:interpretation-boundary-for-subbridge-l444` | Interpretation boundary for `\Subbridge` | remark |  |
| `bridge:theorem:thm-main-partial-subjecthood` | `\Cop ->` Partial Operational Subjecthood | theorem | `thm:main-partial-subjecthood` |
| `bridge:corollary:cor-no-equivalence` | No equivalence between `\Cop` and operational subjecthood | corollary | `cor:no-equivalence` |
| `bridge:proposition:prop-boundary-preservation` | Boundary preservation | proposition | `prop:boundary-preservation` |
| `bridge:remark:runtime-non-inference-l529` | Runtime non-inference | remark |  |
| `bridge:definition:def-two-layer-terminology` | Two-layer terminology | definition | `def:two-layer-terminology` |
| `bridge:theorem:thm-layer-preservation` | Layer preservation | theorem | `thm:layer-preservation` |
| `bridge:theorem:thm-bridge-ladder-strict` | Strictness of the bridge ladder | theorem | `thm:bridge-ladder-strict` |
| `bridge:definition:def-runtime-evidence-classes` | Runtime evidence classes | definition | `def:runtime-evidence-classes` |
| `bridge:proposition:prop-runtime-non-promotion` | Runtime non-promotion | proposition | `prop:runtime-non-promotion` |
| `bridge:theorem:thm-nonentailment-library` | Seven non-entailments from `\Cop` | theorem | `thm:nonentailment-library` |
| `bridge:remark:why-the-matrix-matters-l715` | Why the matrix matters | remark |  |
| `bridge:definition:def-sigma-weak` | Weak self-model burden `\Sigma1_{\mathrm{weak}}` | definition | `def:sigma-weak` |
| `bridge:definition:def-sigma-strong` | Strong self-model burden `\Sigma1_{\mathrm{strong}}` | definition | `def:sigma-strong` |
| `bridge:definition:def-sigma-comm` | Commutative self-model burden `\Sigma1_{\mathrm{comm}}` | definition | `def:sigma-comm` |
| `bridge:theorem:thm-sigma-chain` | Self-model strength chain | theorem | `thm:sigma-chain` |
| `bridge:remark:emergence-question-for-sigma1-l771` | Emergence question for `\Sigma1` | remark |  |
| `bridge:proposition:prop-ossi-sigma-orthogonal` | OSSI and `\Sigma1` are orthogonal additions | proposition | `prop:ossi-sigma-orthogonal` |
| `bridge:definition:burden-l894` | Burden | definition |  |
| `bridge:definition:internal-promotion-l904` | Internal promotion | definition |  |
| `bridge:definition:external-promotion-l911` | External promotion | definition |  |
| `bridge:proposition:promotion-is-monotone-but-not-automatic-l917` | Promotion is monotone but not automatic | proposition |  |
| `bridge:proposition:burden-addition-is-conservative-l932` | Burden addition is conservative | proposition |  |
| `bridge:proposition:burden-addition-is-not-semantic-promotion-by-itself-l944` | Burden addition is not semantic promotion by itself | proposition |  |
| `bridge:remark:use-in-later-papers-l957` | Use in later papers | remark |  |
| `bridge:definition:omission-template-l1003` | Omission template | definition |  |
| `bridge:definition:factor-preserving-template-l1010` | Factor-preserving template | definition |  |
| `bridge:definition:finite-strength-template-l1017` | Finite-strength template | definition |  |
| `bridge:proposition:template-soundness-l1023` | Template soundness | proposition |  |
| `bridge:remark:audit-use-l1036` | Audit use | remark |  |
| `bridge:proposition:checklist-conservativity-l1104` | Checklist conservativity | proposition |  |
| `bridge:remark:why-minimality-matters-l1139` | Why minimality matters | remark |  |
| `bridge:remark:editorial-consequence-l1192` | Editorial consequence | remark |  |
| `bridge:definition:structural-only-model-l1224` | Structural-only model | definition |  |
| `bridge:proposition:structural-only-models-block-ordinary-consciousness-promotion-l1230` | Structural-only models block ordinary-consciousness promotion | proposition |  |
| `bridge:definition:self-model-free-model-l1242` | Self-model-free model | definition |  |
| `bridge:proposition:self-model-free-models-block-subbridge-l1248` | Self-model-free models block `\Subbridge` | proposition |  |
| `bridge:definition:life-free-computational-model-l1258` | Life-free computational model | definition |  |
| `bridge:proposition:life-free-computational-models-block-ossi-promotion-l1264` | Life-free computational models block OSSI promotion | proposition |  |
| `bridge:definition:report-free-comparator-model-l1275` | Report-free comparator model | definition |  |
| `bridge:proposition:report-free-models-cannot-close-paper-10-l1281` | Report-free models cannot close Paper 10 | proposition |  |
| `bridge:theorem:no-theorem-to-validation-substitution-l1298` | No theorem-to-validation substitution | theorem |  |
| `bridge:theorem:no-runtime-to-theorem-substitution-l1311` | No runtime-to-theorem substitution | theorem |  |
| `bridge:theorem:no-validation-to-definition-substitution-l1324` | No validation-to-definition substitution | theorem |  |
| `bridge:corollary:three-channel-closure-burden-l1336` | Three-channel closure burden | corollary |  |
| `bridge:remark:why-this-order-matters-l1393` | Why this order matters | remark |  |
| `bridge:remark:central-reference-role-l1400` | Central-reference role | remark |  |

## Decision

These 80 entries are present again in the current clean registry. They are not
declared externally validated, strengthened, or claim-closing by this report.
They are in state:

`RECOVERED`

Registry recovery invariant:

- bridge entry count after re-extraction: `80`
- bridge entries missing against baseline `76edce0`: `0`
- `epistemic_status` changes against baseline `76edce0`: `0`
- `proof_status` changes against baseline `76edce0`: `0`
- recovered status distribution:
  - `heuristic | not_applicable | draft_extracted`: `19`
  - `conditional | not_applicable | draft_extracted`: `27`
  - `proved | present | draft_extracted`: `34`

Residual next actions are:

- resolve the restored paper's bibliography provenance: the exact historical
  `main.tex` compiles, but its local `references.bib` source was not present in
  `7c3ae1c^`, so biber falls back to an unrelated MiKTeX bibliography and
  leaves citations `paper1`--`paper5` unresolved;
- decide whether the recovered bridge source should be added to future release
  manifests or remain a registry-facing recovered source;
- optionally perform a successor crosswalk against Paper 7, Paper 8, and the
  generated monolithic subjecthood-bridge section.

## PENDING_HUMAN_VERIFICATION

Task: verify in depth, not by superficial grep, whether Paper 7, Paper 8, and
the generated monolithic subjecthood-bridge section substantively duplicate or
supersede any of the recovered `bridge:*` entries. Paper 9 is a phenomenal
bridge organization paper and should not be treated as the default successor
for this operational-subjecthood bridge.

Items to check include at least:

- `Cop => Piop`
- `Cop => Iotaop`
- operational qualia `Qop`
- weak/non-null operational phenomenology
- partial operational subjecthood
- bridge ladder strictness
- runtime non-promotion and three-channel closure burdens

Decision rule:

- If substantive subsumption is confirmed, record a successor mapping.
- If substantive subsumption is not confirmed, keep the recovered bridge paper
  as the source-owning path for these entries.

This report does not decide that question.

## Non-Claim Boundary

This document is an inventory and provenance-control artifact. It does not
claim bridge closure, Paper 9 subsumption, external validation, subjecthood,
phenomenality, consciousness, or public claim strengthening.
