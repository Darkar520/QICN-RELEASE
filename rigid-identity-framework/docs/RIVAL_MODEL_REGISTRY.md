# QICN Rival Model Registry v1

Status: FCR v11 static rival registry.  
Boundary: this file defines falsification comparators. It does not report
empirical support, external validation, consciousness, phenomenality, identity
transfer, agency, moral status, or bridge confirmation.

## Penalized Comparison Rule

Every rival comparison must report both raw empirical loss and penalized loss:

```text
penalized_loss(rival) = empirical_loss(rival) + alpha * complexity_units(rival)
```

`alpha` is `not_frozen` until a preregistration freezes it. A rival defeats a
QICN claim only when its preregistered penalized loss is equal to or lower than
the QICN-linked model while satisfying the same admissibility constraints and
without using post-hoc threshold changes.

## Rival Inventory

| Rival ID | Claim family attacked | Minimal description | Minimal implementation | Contrary prediction | Success metric for rival | Linked destruction condition |
|---|---|---|---|---|---|---|
| `RIVAL-COMPLEXITY-01` | PRED-03, PRED-11, `I_int` irreducibility | Complexity alone: scale/connectivity/activity without causal integration. | Random or rewired graph matching `\|V\|`, `\|E\|`, degree histogram, activity budget, and structural entropy surrogate. | Certification remains high even when integration is destroyed. | Rival certification rate >= candidate certification rate under fixed penalized loss. | PRED-03/PRED-11 destruction: complexity-only control passes despite integration loss. |
| `RIVAL-MEMORY-01` | PRED-08, subjecthood continuity | Memory-only: historical buffer without rigid identity channels or perspective projection. | FIFO buffer or LSTM/nearest-neighbor lookup with frozen context length and no intervention-sensitive self/non-self structure. | Non-empty `Qop` or legibility equal to candidate. | `delta_leg` proxy >= candidate while identity-gap and perspective tests fail. | PRED-08 destruction: non-trivial class recovered from memory-only structure. |
| `RIVAL-NARRATIVE-01` | PRED-08, report sufficiency | Narrative-only: coherent reports without projective channels. | Template report generator or slot-filling sequence tracker with frozen grammar and no causal intervention coupling. | Certification can be obtained from report coherence alone. | Report-rich output passes certification gate without invariant support. | PRED-08 destruction: certification passes without structure. |
| `RIVAL-REWARD-01` | Paper 9 `PiD`/`PiV` bridge predicates | Valence bookkeeping: reward maximization without bridge organization. | RL-style accumulator with frozen discount `gamma`, reward table, and no independent valence topology. | Bridge predicates are reproduced by reward accounting. | Intervention profile indistinguishable from candidate at lower penalized loss. | Bridge predicate reducible to reward bookkeeping. |
| `RIVAL-SEMANTIC-01` | Paper 9 `PiW`, world-richness predicates | Semantic density / world-model competence without interior bridge burden. | LLM/retrieval/planner proxy with frozen retrieval size, temperature, and planning depth. | World-richness metrics are matched by semantic density alone. | Comparator reports equality or advantage under penalized loss. | Bridge predicate reducible to semantic density or world-model competence. |
| `RIVAL-SUBSTRATE-01` | PRED-01 cross-substrate preservation | Substrate privilege: class depends on material/substrate label despite preserved formal margins. | Classifier that includes substrate label as a primary feature and ignores admissible transport equivalence. | Cross-substrate pair diverges because labels differ. | Predicts class divergence better than QICN on frozen cross-substrate pairs. | PRED-01 destruction: class divergence despite verified preserved structure. |
| `RIVAL-NULL-DYNAMICS-01` | PRED-04a/b/c null-regime behavior | Generic attractor dynamics: pass/fail/transition behavior follows ordinary parameter smoothness, not QICN null-regime constraints. | One-parameter response curve with frozen smoothness prior and no QICN invariant structure. | Transition band width is unconstrained or wider than QICN threshold. | Fits pass/fail/transition panel with lower penalized loss. | PRED-04c destruction: transition band exceeds frozen 0.10 threshold. |
| `RIVAL-LEGIBILITY-DECODER-01` | PRED-05, PRED-10 legibility | Decoder fragility: observed legibility changes are artifacts of decoder choice. | Alternate decoder family with frozen architecture, noise schedule, and compression schedule. | Noise/compression effects track decoder fragility, not `I_leg`. | Same or better prediction of legibility failures without invariant bundle. | PRED-05/PRED-10 destruction: generic observability explains the pattern. |
| `RIVAL-ADMISSIBILITY-NAIVE-01` | PRED-06 tamper/admissibility | Naive pipeline: accepts artifacts if superficial schema parses. | JSON-presence checker without hash/protocol/quarantine validation. | Some tampered runs are accepted. | Any tampered run promoted under frozen tamper suite. | PRED-06 destruction: tamper acceptance tolerance violated. |
| `RIVAL-STABILITY-TRIVIAL-01` | PRED-07 perturbation stability | Trivial stability: unchanged output caused by saturation or dead dynamics. | Constant/saturated response model under perturbation panel. | Stability appears without invariant preservation. | Matches response stability while failing invariant margin report. | PRED-07 destruction: stability survives despite invariant loss. |
| `RIVAL-TRACE-MEMORY-01` | PRED-EXT-01 finite trace selectivity | Trace-memory rival: predicts intervention effects from trace length, entropy, and memory buffer continuity without identity-coupled transition structure. | Order-1 finite trace-memory baseline in `scripts/lib/trace-memory-rival.js`, matched on state alphabet, trace length, empirical next-state distribution, and buffer depth in rehearsal mode. | Target-channel intervention does not produce selective transition-distribution change beyond memory/entropy-matched controls. | Equal or lower penalized prediction loss on external transition traces. | PRED-EXT-01 destruction: the memory/entropy rival predicts the external selectivity observable at equal or lower penalized loss. |

## Frozen-Parameter Slots

| Rival ID | Parameters that must be frozen before execution |
|---|---|
| `RIVAL-COMPLEXITY-01` | `\|V\|`, `\|E\|`, degree histogram tolerance, activity budget, structural entropy estimator, `alpha`. |
| `RIVAL-MEMORY-01` | Buffer length, lookup metric, LSTM layer count if used, hidden width, context window, `alpha`. |
| `RIVAL-NARRATIVE-01` | Template set, slot vocabulary, report length budget, sampling temperature, `alpha`. |
| `RIVAL-REWARD-01` | Discount `gamma`, reward table, horizon, policy class, intervention budget, `alpha`. |
| `RIVAL-SEMANTIC-01` | Retrieval size, model family, temperature, planning depth, context budget, `alpha`. |
| `RIVAL-SUBSTRATE-01` | Substrate labels, label weighting, transport-pair manifest, geometry tolerance, `alpha`. |
| `RIVAL-NULL-DYNAMICS-01` | Parameter grid, smoothness prior, transition classifier, ambiguity tolerance, `alpha`. |
| `RIVAL-LEGIBILITY-DECODER-01` | Decoder family, noise distribution, compression rates, class-separation metric, `alpha`. |
| `RIVAL-ADMISSIBILITY-NAIVE-01` | Accepted fields, parser behavior, hash policy, quarantine policy, `alpha`. |
| `RIVAL-STABILITY-TRIVIAL-01` | Saturation threshold, constant-output rule, perturbation panel, invariant-margin check, `alpha`. |
| `RIVAL-TRACE-MEMORY-01` | State alphabet, trace length, entropy-matching tolerance, buffer depth, transition estimator, total-variation estimator, `alpha`. |

## Update Rule

Every `linked_rivals` entry in `PREDICTION_REGISTRY_v1.json` must correspond to
one `RIVAL-*` row here. A rival result that meets a destruction condition must
trigger a downgrade in `THEORY_CLAIM_LEDGER.md`; it cannot be reinterpreted as
support without a new preregistered version.
