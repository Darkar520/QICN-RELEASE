# Independent Separator Catalog Construction Protocol v22

## Governance boundary

This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, empirical validation, publication, or human mathematical review. It defines an internal formal construction protocol for finite separator catalogs only.

## Objective

The finite connected-incidence route to conditional closure of \(I_{\mathrm{int}}\) is valid only if the separator catalog is constructed independently of the desired atomicity conclusion. This protocol states operational admission rules for separator vertices, response-coordinate vertices, and incidence edges before graph connectivity or factor-local zero-crossing cuts are inspected.

## Ontology, model, implementation, interpretation

- Ontology: a separator is an operational test family over typed intervention records; a response coordinate is a typed observable delta; an incidence edge records that a predeclared typed perturbation produces a positive response-coordinate margin while preserving identity/history typing.
- Mathematical model: the package is a finite bipartite graph \(G=(V_\Theta \sqcup V_R,E)\) plus typed perturbation records and a finite universe of admissible factor cuts.
- Implementation: the JSON package lists `separators`, `responses`, `incidence_edges`, `perturbation_records`, and `declared_audit_metadata`; the auditor recomputes connected components and all nontrivial factor cuts.
- Interpretation: if the catalog is independently separator-complete for the finite universe and the graph has no factor-local zero-crossing cut, the package is a finite conditional witness of relative atomicity. It is not a global proof and not empirical validation.

## Admission rule A: separator vertices

A separator vertex may enter the catalog only if all of the following are true before graph connectivity is computed:

1. The separator test is described without naming any proposed factor partition.
2. The test is tied to a typed intervention grammar and a response-coordinate family.
3. The test can be evaluated under identity/history typing preservation.
4. The test was not selected to repair a disconnected graph or eliminate a zero-crossing factor cut.
5. The test has a written `admission_rule` in the JSON package.

Reject the separator if its inclusion is justified by statements of the form: "this separator is needed to make the graph connected" or "this separator blocks the product decomposition." That would use the conclusion as a selection criterion.

## Admission rule B: response-coordinate vertices

A response-coordinate vertex may enter the catalog only if all of the following are true before graph connectivity is computed:

1. The coordinate is measurable from the declared intervention trace schema.
2. The coordinate is typed independently of factor-cut enumeration.
3. The coordinate has an explicit `admission_rule` in the JSON package.
4. The coordinate can be recorded for both positive packages and negative controls if the corresponding perturbation is present.

## Admission rule C: incidence edges

An incidence edge may enter the graph only if all of the following are true:

1. The edge references a known separator and a known response coordinate.
2. The evidence record preserves identity typing and history typing.
3. The evidence record has a strictly positive `delta_margin`.
4. The evidence record has a `predeclared_measurement_rule`.
5. The edge is admitted before connectedness and zero-crossing cut enumeration are inspected.

## Anti-selection gate

The catalog fails the independent-construction protocol if any separator, response coordinate, or edge is added after inspecting one of these quantities:

- number of connected components;
- number of factor-local zero-crossing cuts;
- identity of a cut that would otherwise disconnect the graph;
- whether the final certificate passes or fails.

This is the explicit non-circularity gate. It does not prove that any real-world system is complete; it only rules out one internal selection artifact.

## Negative controls

A product-separator negative control must be included. It must have at least two disconnected factor-local components and at least one factor-local zero-crossing cut. The audit must reject it as an atomicity witness. If the negative control passes, the gate is invalid.

## Reviewer burden

A reviewer must check that the separator catalog and response-coordinate catalog can be produced from the intervention grammar before knowing the graph audit result. This is a human mathematical and methodological burden. It is not closed by the script.

## Acceptance criteria

A finite package passes this protocol only when:

1. every separator has a predeclared admission rule;
2. every response coordinate has a predeclared admission rule;
3. every perturbation record has a predeclared measurement rule;
4. package SHA-256 is reproducible under `sha256(stable_json(package_without_top_level_package_sha256))`;
5. declared audit metadata matches recomputed counts;
6. the positive package is connected and has zero factor-local zero-crossing cuts;
7. the product-separator negative control is rejected;
8. the report preserves the boundary that the result is conditional, finite, internal, and non-empirical.
