# QICN Literature Confrontation Gap

Status: `NON_CANONICAL_AI_OUTPUT_FOR_HUMAN_REVIEW`

Date: 2026-06-15

Scope: gap inventory only. This is not a related-work section, not a literature review, and not a claim that QICN defeats or subsumes any rival.

## Verification method

Searched local paper sources and bibliographies for:

`Tononi`, `Koch`, `Dehaene`, `Mashour`, `Friston`, `Parfit`, `Lewis`, `Shoemaker`, `Dennett`, `Block`, `Tye`, `IIT`, `Integrated Information`, `Global Workspace`, `GWT`, `GNW`, `Higher-Order`, `HOT`, `Free Energy`, `predictive processing`, and `active inference`.

Verified Paper 5 result:

- Paper 5 uses `release/references.bib` (`paper5_operational_consciousness/main.tex:15`).
- Paper 5 cites Tononi 2004 and Baars/Chalmers in its interpretive comparison paragraph (`paper5_operational_consciousness/main.tex:1398`).
- Paper 5 does not contain `Koch`, `Dehaene`, `Mashour`, or `Friston` by direct source search.
- Release bibliography contains `baars1988`, `tononi2004`, `chalmers`, `chalmers1995`, and `parfit1984` (`release/references.bib:18,99,207,318,396`).

## Confrontation matrix

Legend:

- `CITED_AT:<path:line>` means a local paper source contains a direct relevant mention/citation, but not necessarily a full confrontation.
- `NOT_YET_CONFRONTED` means no verified local paper confrontation was found in this pass.
- `MENTIONED_NOT_CONFRONTED:<path:line>` means the paper mentions the family, but without bibliographic/theoretical confrontation adequate for related-work use.

| QICN construct | IIT / Tononi-Koch | GWT / Dehaene-Mashour | HOT | FEP / Friston | Predictive Processing | Operationalism: Dennett / Block / Tye | Personal identity: Parfit / Lewis / Shoemaker |
|---|---|---|---|---|---|---|---|
| Rigid identity as inverse-limit | `CITED_AT:paper1/main.tex:849` for IIT as contrasting family; Koch not found. Full confrontation: `NOT_YET_CONFRONTED`. | `CITED_AT:paper1/main.tex:850` for GWT as contrasting family; Dehaene/Mashour not found. Full confrontation: `NOT_YET_CONFRONTED`. | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED`; Parfit exists in bibliography (`release/references.bib:396`) but no verified inverse-limit confrontation was found. |
| CCR / conditional non-simulability | `MENTIONED_NOT_CONFRONTED:paper3/main.tex:690-706`; IIT is discussed locally but not as a full CCR/non-simulability confrontation. | `MENTIONED_NOT_CONFRONTED:paper3/main.tex:706-708`; GWT is described as orthogonal, not fully confronted. Dehaene/Mashour not found. | `MENTIONED_NOT_CONFRONTED:paper3/main.tex:710`; no local HOT bibliography citation found in paper source. | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` |
| `C_op` + six-criterion certificate | `CITED_AT:paper5_operational_consciousness/main.tex:1398`; Paper 5 contrasts against single-metric integration accounts via Tononi 2004, but this is not a full IIT/Tononi-Koch confrontation. | `CITED_AT:paper5_operational_consciousness/main.tex:1398`; Paper 5 cites Baars/Chalmers for strong phenomenal readings / GWT-adjacent context, but Dehaene/Mashour not found and no full GNW confrontation exists. | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED` | `NOT_YET_CONFRONTED`; weak functionalism is mentioned at `paper5_operational_consciousness/main.tex:1398`, but Dennett/Block/Tye were not found. | `NOT_YET_CONFRONTED`; Parfit is bibliographically present in `release/references.bib:396` and `paper2/references.bib:160`, but no verified `C_op` confrontation was found. |

## What is actually present

1. Local paper sources already contain some preliminary contact with IIT/GWT/HOT:
   - `paper1/main.tex:849-850` lists IIT and GWT as adjacent frameworks.
   - `paper2/main.tex:870-872` lists IIT, GWT, and Higher-Order Theories.
   - `paper3/main.tex:690-710` contains short sections for IIT, GWT, and Higher-Order Theories.
   - `paper5_operational_consciousness/main.tex:1398` contrasts the six-invariant criterion against weak functionalism, single-metric integration accounts, biologically privileged baselines, and strong phenomenal readings.
2. Local bibliography coverage is uneven:
   - Tononi 2004 and Baars 1988 are present in local/release bibliographies.
   - Chalmers is present.
   - Parfit is present in release and Paper 2 bibliography.
   - Koch, Dehaene, Mashour, Friston, Dennett, Block, Tye, Lewis, Shoemaker, Rosenthal, and Lau were not found in the searched paper sources.

## Gap classification

### Exposition gap

QICN lacks a controlled related-work surface that explicitly positions its main constructs against the relevant literature. This is an exposition and scholarship gap: the corpus has internal formal machinery, but it has not yet done enough public-facing comparison to prevent a reviewer from reading the work as isolated.

### Substantive gap

The gap is not only prose. The defensible novelty candidates need adversarial positioning:

- inverse-limit / rigidity identity must be compared against IIT complex selection, GWT access/broadcast, HOT awareness, and personal-identity accounts;
- CCR / conditional non-simulability must specify the simulator class and show what rival theories would predict differently;
- `C_op` plus its six-criterion certificate must be tested against integration-only, broadcast-only, higher-order, predictive-processing, and operationalist alternatives.

Without that confrontation, "new formalism" remains under-positioned. It may be technically interesting, but it is not yet publication-ready as a theory of consciousness, subjectivity, or identity.

## Conclusion

The defensible novelty is not "QICN is superior." The defensible novelty candidate is narrower: an inverse-limit identity formalism, a conditional CCR/non-simulability structure, and a six-criterion certificate architecture. To become publishable, those claims need explicit positioning against IIT/Tononi-Koch, GWT/GNW/Dehaene-Mashour, HOT, FEP/Friston, predictive processing, operationalist theories, and personal-identity literature.

Writing that related-work section is necessary for publication readiness, but it would not by itself close the formal `I_int` gap, instantiate `S`, validate the bridge, or provide external empirical support.

## Verification boundary

Command run from cwd `rigid-identity-framework/`:

```powershell
npm run verify
```

Raw adjudicator lines:

```text
External Session Zero adjudicator v30: PASS; verdict=BLOCKED_MULTIPLE_GATES; strict=true; legacy_v27=false; blockers=4; external_support_certified=false
External Session Zero adjudicator v31: PASS; verdict=BLOCKED_FOUNDATION_FIRST_GATES; blockers=9; external_support_certified=false
```

Interpretation: this report documents a literature confrontation gap only. Exit code 0 from the verification chain does not certify external support; both adjudicators preserve `external_support_certified=false`.

artefacto de IA no-canónico; no cierra ningún gap, no valida QICN, no implica claim de conciencia/identidad/subjetividad/superioridad.
