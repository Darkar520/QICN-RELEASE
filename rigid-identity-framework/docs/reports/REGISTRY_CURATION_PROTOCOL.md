# Registry Curation Protocol v1

Status: FCR v13 curation protocol.

Date: 2026-05-25

## Boundary

This protocol does not assert theorem truth. It defines how extracted registry
entries may move from machine extraction toward human mathematical curation.
Passing FCR schema validation remains structural support only.

## Curation Statuses

| Status | Meaning |
|---|---|
| `draft_extracted` | Machine-extracted from LaTeX; not human-curated. |
| `audit_overlaid` | Modified by an audit overlay; still not final mathematical curation. |
| `human_reviewed_formal` | Statement and proof presence checked against source lines. |
| `human_reviewed_dependency_complete` | Dependencies, references, and proof burden checked against upstream entries. |
| `rejected_or_downgraded` | Entry is valid as text but its epistemic status must be reduced or rewritten. |

## Required Review Fields

Each curated row must record:

- registry id;
- source file and line range;
- statement match: exact / partial / mismatch;
- proof block present: yes / no / not applicable;
- dependency completeness: complete / partial / missing;
- epistemic status recommendation;
- reviewer;
- date;
- notes.

## Non-Negotiable Rules

1. Do not mark a row as mathematically curated solely because the validator
   passes.
2. Do not upgrade `proved` entries unless the proof block actually proves the
   stated claim, not merely a definition-level restatement.
3. Do not manually edit `registry/theorems.jsonl` while the global extractor is
   non-reproducible unless a separate source-scoped curation overlay mechanism
   exists.
4. Curation snapshots may be added as reports before any registry mutation.
5. Any row that depends on `I_int`, external adjudication, or bridge predicates
   must state whether the dependency is formal, operational, or open-burden.

## First Batch Scope

Batch 001 reviews 25 high-impact entries:

- BaseCore H1-H5 and non-collapse theorem.
- Paper 5 six invariant definitions and key propositions.
- Paper 6 prediction/falsation entries.
- Paper 8 core coordinates.
- Paper 9 bridge predicates and BPF status declarations.

## Exit Criterion For `[x]`

Registry curation can move from scaffold to complete only when a material
fraction of high-impact entries has `human_reviewed_dependency_complete` status
and the curation data is machine-checkable. Batch 001 is a seed, not closure.
