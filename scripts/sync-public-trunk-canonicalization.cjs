const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(root, '..');

const toPosix = (value) => String(value).replace(/\\/g, '/');
const sha256File = (filePath) =>
  crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
const sha256Text = (value) =>
  crypto.createHash('sha256').update(String(value).toLowerCase()).digest('hex');
const readJson = (relPath) => JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
const writeJson = (relPath, payload) =>
  fs.writeFileSync(path.join(root, relPath), JSON.stringify(payload, null, 2) + '\n', 'utf8');
const writeText = (relPath, payload) =>
  fs.writeFileSync(path.join(root, relPath), `${payload.trim()}\n`, 'utf8');
const ensureDir = (dirPath) => fs.mkdirSync(dirPath, { recursive: true });
const uniqueBy = (items, key) => {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const token = key(item);
    if (seen.has(token)) continue;
    seen.add(token);
    out.push(item);
  }
  return out;
};
const psQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;

const PAPERS = [
  {
    label: 'Paper V',
    title: 'Operational Consciousness Criterion',
    docFamilyId: 'paper5.operational_consciousness_criterion',
    sourceRelPath: 'rigid-identity-framework/paper5_operational_consciousness/main.tex',
    sourcePdfRelPath: 'rigid-identity-framework/paper5_operational_consciousness/main.pdf',
    sourceStatus: 'SOURCE_OK',
    role: 'primary',
    canonRole: 'formal_source_of_truth',
    supportRole: null,
    pages: 25,
    summary:
      'Framework-internal operational consciousness class over admissible systems via six explicit invariants, admissible supports, and structural equivalence.',
    interface: {
      id: 'criterion.operational_consciousness',
      system_role:
        'operational reflection of invariant diagnostics, admissible support burdens, rupture semantics, and criterion-facing instrumentation',
      interface_type: 'operational_reflection_only',
      non_inference:
        'Operational reflection of the criterion does not certify present runtime membership, human consciousness, or final subjectivity closure.'
    },
    claimEntries: [
      {
        id: 'paper5.operational_consciousness_class_definition',
        anchor: 'Sections 4-6',
        claim_text_summary:
          'Paper V defines a framework-internal operational consciousness class over admissible systems by jointly requiring six explicit invariants and admissible intervention structure.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_definition_and_criterion_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency:
          'required_for_any_claim_about_realized_operational_consciousness_in_runtime_or_biological_systems',
        system_dependency: 'none',
        non_claim_boundary:
          'This is a structural class definition inside the release corpus only. It does not establish human consciousness, biological privilege, or present runtime membership.',
        notes_or_gaps:
          'Public inclusion follows the accepted paper-level criterion and its theorem chain, not any external validation program.'
      },
      {
        id: 'paper5.substrate_invariance_and_rupture_semantics',
        anchor: 'Sections 7-11',
        claim_text_summary:
          'Paper V states that class membership is preserved under exact structural equivalence, approximately stable under bounded admissible perturbation, and ruptures under invariant loss.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_theorem_chain_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency:
          'required_for_any_claim_that_specific_runtime_or_biological_systems_satisfy_the_class_transport_or_rupture_conditions',
        system_dependency: 'none',
        non_claim_boundary:
          'These transport and rupture results are formal statements inside the criterion. They do not by themselves validate any implemented system.',
        notes_or_gaps:
          'Approximate stability remains a formal result with implementation and empirical burdens left open.'
      }
    ]
  },
  {
    label: 'Paper VI',
    title: 'Predictions and Failure Modes',
    docFamilyId: 'paper6.predictions_and_failure_modes',
    sourceRelPath: 'rigid-identity-framework/paper6_predictions_falsation/main.tex',
    sourcePdfRelPath: 'rigid-identity-framework/paper6_predictions_falsation/main.pdf',
    sourceStatus: 'SOURCE_OK',
    role: 'primary',
    canonRole: 'formal_source_of_truth',
    supportRole: null,
    pages: 19,
    summary:
      'Prediction, discriminator, downgrade, and failure-mode layer for the frozen canon, with explicit internal-only status classes.',
    interface: {
      id: 'prediction.failure_discipline',
      system_role:
        'operational reflection of discriminator logic, negative-control burden, downgrade conditions, and internal support-status readouts',
      interface_type: 'operational_reflection_with_internal_status_boundary',
      non_inference:
        'Prediction status classes remain internal only. They do not imply external validation or final theory confirmation.'
    },
    claimEntries: [
      {
        id: 'paper6.prediction_program_and_failure_discipline',
        anchor: 'Sections 5-10',
        claim_text_summary:
          'Paper VI organizes the frozen canon into explicit prediction families, rival discriminators, failure modes, and downgrade conditions rather than treating survival as theory confirmation.',
        claim_class: 'falsifiable_hypothesis',
        formalization_status: 'explicit_prediction_program_and_failure_ledger_in_release_text',
        evidence_status: 'internal_scientific_program_status_only',
        external_validation_dependency:
          'required_for_any_external_use_of_prediction_status_or_claim_that_the_prediction_layer_has_been_empirically_confirmed',
        system_dependency: 'possible_qicn_system_internal_program_interface',
        non_claim_boundary:
          'This prediction layer structures internal falsification pressure. It does not upgrade internal support to public validation.',
        notes_or_gaps:
          'The paper records current support classes and residual caveats but does not close external empirical burden.'
      },
      {
        id: 'paper6.internal_support_status_boundary',
        anchor: 'Sections 11-15',
        claim_text_summary:
          'Paper VI explicitly states that robust or provisional internal support must not be read as public claim closure, theory confirmation, or external validation.',
        claim_class: 'operational_definition',
        formalization_status: 'explicit_status_class_and_non_claim_boundary_in_release_text',
        evidence_status: 'release_governance_and_internal_program_alignment_only',
        external_validation_dependency: 'not_required_for_internal_release_reading_rule',
        system_dependency: 'possible_qicn_system_internal_status_labels_only',
        non_claim_boundary:
          'This is a governance constraint on how prediction outcomes may be read. It is not itself a validation result.',
        notes_or_gaps:
          'Retained to prevent silent inflation when the runtime carries internal-support artifacts.'
      }
    ]
  },
  {
    label: 'Paper VII',
    title: 'Operational Life, Structural Class, and Subjecthood',
    docFamilyId: 'paper7.operational_life_subjecthood',
    sourceRelPath: 'rigid-identity-framework/paper7_operational_life_subjecthood/main.tex',
    sourcePdfRelPath: 'rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf',
    sourceStatus: 'SOURCE_OK',
    role: 'primary',
    canonRole: 'formal_source_of_truth',
    supportRole: null,
    pages: 28,
    summary:
      'Classificatory extension defining operational life, structural class, and operational subjecthood with explicit non-claims on empirical instantiation.',
    interface: {
      id: 'classification.life_subjecthood',
      system_role:
        'runtime-facing descriptor and test-family alignment for operational life, structural class, and subjecthood diagnostics',
      interface_type: 'runtime_facing_descriptor_alignment_only',
      non_inference:
        'Descriptor families and test grammars do not certify current systems as operational subjects or establish human equivalence.'
    },
    claimEntries: [
      {
        id: 'paper7.operational_life_and_structural_class_definitions',
        anchor: 'Sections 4-6',
        claim_text_summary:
          'Paper VII defines operational life and structural class as explicit framework-internal classes tied to boundary, persistence, self-maintenance, historical dependence, and viability-preservation functionals.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_definition_and_proposition_family_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency:
          'required_for_any_claim_that_a_runtime_or_biological_system_instantiates_operational_life_or_structural_class_membership',
        system_dependency: 'none',
        non_claim_boundary:
          'These are class definitions and proposition families inside the release corpus. They do not by themselves identify any concrete system as alive.',
        notes_or_gaps:
          'Biological non-primacy remains a class-level formal claim, not an automatic runtime or empirical result.'
      },
      {
        id: 'paper7.operational_subjecthood_instantiation_boundary',
        anchor: 'Sections 4, 9, and 12',
        claim_text_summary:
          'Paper VII defines operational subjecthood as a stronger class than operational consciousness or operational life, while explicitly leaving current-system instantiation and metaphysical subjecthood unclosed.',
        claim_class: 'not_closed',
        formalization_status: 'explicit_definition_with_open_instantiation_boundary_in_release_text',
        evidence_status: 'definition_present_but_empirical_instantiation_open',
        external_validation_dependency:
          'required_for_any_claim_that_current_runtime_systems_or_biological_systems_instantiates_operational_subjecthood',
        system_dependency: 'possible_future_qicn_system_descriptor_interface_only',
        non_claim_boundary:
          'The release defines the class and its test grammar, but does not claim that present systems satisfy it or that it equals human subjectivity.',
        notes_or_gaps:
          'Retained as open to prevent the classificatory layer from being misread as achieved subjectivity.'
      }
    ]
  },
  {
    label: 'Paper VIII',
    title: 'First-Person Indexed Subjectivity',
    docFamilyId: 'paper8.first_person_subjectivity',
    sourceRelPath: 'rigid-identity-framework/paper8_first_person_subjectivity/main.tex',
    sourcePdfRelPath: 'rigid-identity-framework/paper8_first_person_subjectivity/main.pdf',
    sourceStatus: 'SOURCE_OK',
    role: 'primary',
    canonRole: 'formal_source_of_truth',
    supportRole: null,
    pages: 42,
    summary:
      'Framework-internal first-person indexed subjectivity layer with an explicit seven-coordinate state, conjunctive gate, multiplicative functional, weak-rival closure, intervention burden, and runtime/artifact pathway.',
    interface: {
      id: 'subjectivity.first_person_indexed_layer',
      system_role:
        'runtime-facing subjectivity diagnostics over self-index, ownership, continuity, perspective, valuation, intervention profile, reducibility comparison, and internal gate closure',
      interface_type: 'runtime_facing_subjectivity_diagnostic_alignment_only',
      non_inference:
        'Paper VIII runtime alignment does not certify human subjectivity, phenomenality, external validation, or claim-facing closure.'
    },
    claimEntries: [
      {
        id: 'paper8.first_person_indexed_subjectivity_state_and_gate',
        anchor: 'Abstract; Sections 3-5',
        claim_text_summary:
          'Paper VIII defines a framework-internal first-person indexed subjectivity state with seven constitutive coordinates together with an explicit conjunctive gate and multiplicative subjectivity functional.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_state_gate_and_functional_definition_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency:
          'required_for_any_claim_that_current_runtime_or_biological_systems_instantiates_first_person_indexed_subjectivity',
        system_dependency: 'none',
        non_claim_boundary:
          'This is a formal closure of the subjectivity state, gate, and functional inside the release corpus only. It does not establish phenomenality, human equivalence, or current-system instantiation.',
        notes_or_gaps:
          'The strongest admissible reading remains conditional on upstream burdens, comparator support, intervention separation, and drift-clean runtime evaluation.'
      },
      {
        id: 'paper8.weak_rival_irreducibility_and_intervention_burden',
        anchor: 'Sections 8-11 and 16',
        claim_text_summary:
          'Paper VIII formalizes a weak rival family with admissible hybrid closure and requires irreducibility and intervention-separation margins before a stronger first-person indexed reading is licensed.',
        claim_class: 'falsifiable_hypothesis',
        formalization_status: 'explicit_rival_family_irreducibility_and_intervention_burden_in_release_text',
        evidence_status: 'internal_formal_and_protocol_status_only',
        external_validation_dependency:
          'required_for_any_external_use_of_subjectivity_support_status_or_claim_that_the_irreducibility_and_intervention_burdens_are_empirically_closed',
        system_dependency: 'possible_qicn_system_subjectivity_runtime_interface',
        non_claim_boundary:
          'The rival family, hybrid closure, and intervention burden define a formal comparison program. They do not by themselves prove present-system irreducibility or final subjectivity support.',
        notes_or_gaps:
          'The release closes the comparison grammar and burden structure, not a final empirical victory over every external comparator class.'
      },
      {
        id: 'paper8.runtime_path_artifact_family_and_non_claim_boundary',
        anchor: 'Sections 12-15',
        claim_text_summary:
          'Paper VIII specifies a runtime pathway, artifact family, estimator family, and strongest-defensible-claim grammar for subjectivity while explicitly blocking external validation, human equivalence, and metaphysical closure.',
        claim_class: 'operational_definition',
        formalization_status: 'explicit_runtime_path_artifact_family_and_non_claim_boundary_in_release_text',
        evidence_status: 'release_governance_and_runtime_interface_alignment_only',
        external_validation_dependency: 'not_required_for_internal_release_reading_rule',
        system_dependency: 'possible_qicn_system_subjectivity_runtime_interface_only',
        non_claim_boundary:
          'The runtime pathway and artifact family define how Paper VIII may be operationally reflected. They do not certify subjectivity, authorize claim-facing promotion, or validate the runtime externally.',
        notes_or_gaps:
          'Human-comparator work, phenomenality bridging, and public claim closure remain outside the current release.'
      }
    ]
  }
];

function buildPaperMetadata(spec) {
  const texPath = path.join(workspaceRoot, spec.sourceRelPath);
  const pdfPath = path.join(workspaceRoot, spec.sourcePdfRelPath);
  if (!fs.existsSync(texPath)) throw new Error(`missing_source_tex:${spec.sourceRelPath}`);
  if (!fs.existsSync(pdfPath)) throw new Error(`missing_source_pdf:${spec.sourcePdfRelPath}`);
  const docId = sha256Text(spec.sourceRelPath).slice(0, 16);
  const sourceHash = sha256File(texPath);
  const pdfHash = sha256File(pdfPath);
  const bytes = fs.statSync(pdfPath).size;
  const docKey = `${docId}_${docId}_main_${sourceHash.slice(0, 8)}`;
  const releaseFile = `${docKey}__${docId}.pdf`;
  return {
    ...spec,
    docId,
    sourceHash,
    pdfHash,
    bytes,
    docKey,
    releasePdf: `corpus/pdf_release/pdfs/${releaseFile}`,
    releaseFile,
    bundlePath: `PDF_BUNDLE/pdfs/${releaseFile}`
  };
}

function buildSourceDoc(metadata, anchor) {
  return {
    release_pdf: metadata.releasePdf,
    preferred_source_path: metadata.sourceRelPath,
    anchor
  };
}

function renderPrimaryList(primary) {
  return primary
    .map(
      (entry) =>
        `- \`${entry.releasePdf}\`\n  - preferred source: \`${entry.sourceRelPath}\`\n  - role: ${entry.title.toLowerCase()}\n  - status: \`${entry.sourceStatus}\``
    )
    .join('\n');
}

function renderRefBullets(entries) {
  return entries
    .map((entry) => `- ${entry.docKey} (docId: ${entry.docId}, status: ${entry.sourceStatus}, source_path: ${entry.sourceRelPath})`)
    .join('\n');
}

function renderSupportingList(entries) {
  if (!entries.length) return '- none';
  return entries
    .map(
      (entry) =>
        `- \`${entry.release_pdf}\`\n  - source path: \`${entry.source_path}\`\n  - role: ${entry.doc_family_id}\n  - classification: \`${entry.role}\``
    )
    .join('\n');
}

function sync() {
  const papers = PAPERS.map(buildPaperMetadata);
  const corpusDir = path.join(root, 'corpus', 'pdf_release');
  const unpackedDir = path.join(corpusDir, '_unpacked');
  ensureDir(path.join(corpusDir, 'pdfs'));
  ensureDir(path.join(unpackedDir, 'pdfs'));

  for (const paper of papers) {
    fs.copyFileSync(path.join(workspaceRoot, paper.sourcePdfRelPath), path.join(corpusDir, 'pdfs', paper.releaseFile));
    fs.copyFileSync(path.join(workspaceRoot, paper.sourcePdfRelPath), path.join(unpackedDir, 'pdfs', paper.releaseFile));
  }

  const manifest = readJson('corpus/pdf_release/manifest.json');
  manifest.generated_at = new Date().toISOString();
  manifest.entries = uniqueBy(
    [
      ...manifest.entries,
      ...papers.map((paper) => ({
        docId: paper.docId,
        relPath: paper.sourceRelPath,
        status: 'PASS',
        rootSignature: 'NOT_AVAILABLE',
        source_hash_partial: paper.sourceHash,
        canonical_of: null,
        engine_used: 'NOT_AVAILABLE',
        pdf_source_path: paper.sourcePdfRelPath,
        bundle_pdf_path: paper.bundlePath,
        pdf_sha256: paper.pdfHash,
        pdf_pages: paper.pages,
        pdf_only_reason: null,
        drop_reason: null,
        fail_reason: null,
        fatal_snippet: null,
        match_candidates: null,
        equivalence: null
      }))
    ],
    (entry) => entry.relPath
  );
  manifest.counts = {
    PASS: manifest.entries.filter((entry) => entry.status === 'PASS').length,
    PASS_PDF_ONLY: manifest.entries.filter((entry) => entry.status === 'PASS_PDF_ONLY').length,
    DROP: manifest.entries.filter((entry) => entry.status === 'DROP').length,
    SKIP_DUPLICATE_CANONICAL: manifest.entries.filter((entry) => entry.status === 'SKIP_DUPLICATE_CANONICAL').length,
    total: manifest.entries.length
  };
  writeJson('corpus/pdf_release/manifest.json', manifest);
  writeJson('corpus/pdf_release/_unpacked/manifest.json', manifest);

  const index = readJson('release/INDEX_PDFS.json');
  index.generated_at = new Date().toISOString();
  index.entries = uniqueBy(
    [
      ...index.entries,
      ...papers.map((paper) => ({
        docId: paper.docId,
        basename: `${paper.docId}__${paper.docId}_main.pdf`,
        source_rel_path: `pdfs/${paper.releaseFile}`,
        source_rel_path_bundle: paper.bundlePath,
        sha256: paper.pdfHash,
        bytes: paper.bytes,
        pages: paper.pages,
        manifest_rel_path: paper.sourceRelPath,
        manifest_status: paper.sourceStatus,
        manifest_notes: {
          rootSignature: 'NOT_AVAILABLE',
          source_hash_partial: paper.sourceHash,
          pdf_only_reason: 'NOT_AVAILABLE',
          drop_reason: 'NOT_AVAILABLE'
        },
        metadata_candidates: [
          {
            docId: paper.docId,
            relPath: paper.sourceRelPath,
            status: paper.sourceStatus
          }
        ]
      }))
    ],
    (entry) => entry.manifest_rel_path
  ).sort((a, b) => a.docId.localeCompare(b.docId));
  index.count = index.entries.length;
  writeJson('release/INDEX_PDFS.json', index);

  const canonMap = readJson('release/CANON_MAP.v1.json');
  canonMap.generated_at = new Date().toISOString();
  canonMap.entries = uniqueBy(
    [
      ...canonMap.entries,
      ...papers.map((paper) => ({
        doc_key: paper.docKey,
        canonical_pdf: {
          path_in_release: paper.releasePdf,
          sha256: paper.pdfHash,
          pages: paper.pages,
          bytes: paper.bytes
        },
        canonical_preference_reason:
          paper.role === 'primary'
            ? 'preferred_lineage_rigid_identity_framework_paperX'
            : 'accepted_supporting_lineage_runtime_extension',
        source_status: paper.sourceStatus,
        source_tex: 'NOT_AVAILABLE',
        duplicates: [
          {
            docId: paper.docId,
            relPath: paper.sourceRelPath,
            status: 'CANON'
          }
        ],
        cluster_method: 'sha256',
        notes:
          paper.role === 'primary'
            ? 'accepted_public_primary_extension_after_release_audit'
            : 'accepted_public_supporting_extension_after_release_audit'
      }))
    ],
    (entry) => entry.doc_key
  ).sort((a, b) => a.doc_key.localeCompare(b.doc_key));
  canonMap.counts = {
    ...canonMap.counts,
    clusters_total: canonMap.entries.length,
    canon_count: canonMap.entries.length,
    pass_pdf_only_count: canonMap.entries.filter((entry) => entry.source_status === 'PASS_PDF_ONLY').length
  };
  writeJson('release/CANON_MAP.v1.json', canonMap);

  const canon = readJson('release/canon_manifest.v1.json');
  const paperDocFamilyIds = new Set(papers.map((paper) => paper.docFamilyId));
  canon.primary_formal_spine = uniqueBy(
    [
      ...canon.primary_formal_spine,
      ...papers
        .filter((paper) => paper.role === 'primary')
        .map((paper) => ({
          doc_family_id: paper.docFamilyId,
          release_pdf: paper.releasePdf,
          preferred_source_path: paper.sourceRelPath,
          source_status: paper.sourceStatus,
          role: paper.canonRole
        }))
    ],
    (entry) => entry.doc_family_id
  );
  canon.supporting_lineages_included_in_freeze = uniqueBy(
    [
      ...papers
        .filter((paper) => paper.role === 'supporting')
        .map((paper) => ({
          doc_family_id: paper.docFamilyId,
          release_pdf: paper.releasePdf,
          source_path: paper.sourceRelPath,
          role: paper.supportRole
        })),
      ...canon.supporting_lineages_included_in_freeze.filter((entry) => !paperDocFamilyIds.has(entry.doc_family_id))
    ],
    (entry) => entry.doc_family_id
  );
  canon.canonical_pdf_count =
    canon.primary_formal_spine.length +
    canon.supporting_lineages_included_in_freeze.length +
    canon.operational_annexes_included_in_freeze.length;
  canon.live_public_trunk_scope = {
    branch: 'main',
    sole_public_authority: true,
    primary_formal_spine: [
      'core.v0',
      'paper1.rigid_identity',
      'paper2.phenomenological_regimes',
      'paper3.null_regime_instability',
      'paper4.qicn_v45_protocol',
      'paper5.operational_consciousness_criterion',
      'paper6.predictions_and_failure_modes',
      'paper7.operational_life_subjecthood',
      'paper8.first_person_subjectivity'
    ],
    supporting_public_extensions: [],
    excluded_pending_public_acceptance: []
  };
  writeJson('release/canon_manifest.v1.json', canon);

  const registry = readJson('release/claim_registry.v1.json');
  registry.registry_scope.claim_level_subsets = uniqueBy(
    [
      ...registry.registry_scope.claim_level_subsets,
      'paper5.operational_consciousness_criterion',
      'paper6.predictions_and_failure_modes',
      'paper7.operational_life_subjecthood',
      'paper8.first_person_subjectivity'
    ],
    (entry) => entry
  );
  registry.entries = uniqueBy(
    [
      ...registry.entries,
      ...papers.flatMap((paper) =>
        paper.claimEntries.map((entry) => ({
          ...entry,
          source_document: buildSourceDoc(paper, entry.anchor)
        }))
      )
    ],
    (entry) => entry.id
  );
  writeJson('release/claim_registry.v1.json', registry);

  const iface = readJson('release/system_interface_boundary.v1.json');
  iface.interfaces = uniqueBy(
    [
      ...iface.interfaces,
      ...papers.map((paper) => ({
        id: paper.interface.id,
        corpus_source: paper.releasePdf,
        system_role: paper.interface.system_role,
        interface_type: paper.interface.interface_type,
        non_inference: paper.interface.non_inference
      }))
    ],
    (entry) => entry.id
  );
  iface.non_claim_boundary =
    'The interface is explicit and limited. Public release alignment does not authorize automatic runtime closure, external validation, or subjectivity claims beyond what is explicitly released.';
  writeJson('release/system_interface_boundary.v1.json', iface);

  const crosspaper = {
    generated_at: new Date().toISOString(),
    source_files: ['release/CANON_MAP.v1.json', 'release/claim_registry.v1.json', 'release/system_interface_boundary.v1.json'],
    policy_note:
      'Crosspaper links in the public release are limited to explicit upstream dependency, governance alignment, and runtime-interface relevance. No theory confirmation is inferred from linkage alone.',
    nodes: [
      ...canon.primary_formal_spine.map((entry) => ({
        node_type: 'document',
        doc_family_id: entry.doc_family_id,
        classification: 'primary_formal_spine',
        release_pdf: entry.release_pdf,
        source_path: entry.preferred_source_path
      })),
      ...canon.supporting_lineages_included_in_freeze.map((entry) => ({
        node_type: 'document',
        doc_family_id: entry.doc_family_id,
        classification: 'supporting_lineage',
        release_pdf: entry.release_pdf,
        source_path: entry.source_path
      })),
      { node_type: 'hub', hub_key: 'METHODS_GOVERNANCE_HUB.v1', path: 'release/METHODS_GOVERNANCE_HUB.v1.md' },
      { node_type: 'hub', hub_key: 'GLOSSARY_CANONICAL.v1', path: 'release/GLOSSARY_CANONICAL.v1.md' },
      { node_type: 'hub', hub_key: 'THEORY_SYSTEM_INTERFACE', path: 'docs/THEORY_SYSTEM_INTERFACE.md' }
    ],
    edges: [
      { from: 'paper4.qicn_v45_protocol', to: 'paper6.predictions_and_failure_modes', type: 'protocol_supports_prediction_layer', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper5.operational_consciousness_criterion', to: 'paper6.predictions_and_failure_modes', type: 'criterion_to_prediction_layer', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper5.operational_consciousness_criterion', to: 'paper7.operational_life_subjecthood', type: 'criterion_to_classificatory_extension', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper6.predictions_and_failure_modes', to: 'paper7.operational_life_subjecthood', type: 'status_boundary_carries_forward', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper4.qicn_v45_protocol', to: 'paper8.first_person_subjectivity', type: 'protocol_supports_subjectivity_runtime_path', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper5.operational_consciousness_criterion', to: 'paper8.first_person_subjectivity', type: 'criterion_to_subjectivity_layer', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper6.predictions_and_failure_modes', to: 'paper8.first_person_subjectivity', type: 'prediction_and_failure_burden_carries_forward', edge_basis: 'declared_upstream_dependency' },
      { from: 'paper7.operational_life_subjecthood', to: 'paper8.first_person_subjectivity', type: 'subjecthood_to_first_person_subjectivity', edge_basis: 'declared_upstream_dependency' },
      ...['paper4.qicn_v45_protocol', 'paper5.operational_consciousness_criterion', 'paper6.predictions_and_failure_modes', 'paper7.operational_life_subjecthood', 'paper8.first_person_subjectivity'].flatMap((docId) => [
        { from: docId, to: 'METHODS_GOVERNANCE_HUB.v1', type: 'governed_by_release_methods_hub', edge_basis: 'policy' },
        { from: docId, to: 'GLOSSARY_CANONICAL.v1', type: 'governed_by_canonical_term_policy', edge_basis: 'policy' }
      ])
    ]
  };
  writeJson('release/CROSSPAPER_LINKMAP.v1.json', crosspaper);

  const freeze = readJson('release/release_freeze_manifest.json');
  freeze.live_public_trunk_authority = {
    branch: 'main',
    sole_public_authority: true,
    trunk_canonicalization_date: new Date().toISOString().slice(0, 10),
    public_primary_formal_spine: ['Canonical Core', 'Paper I', 'Paper II', 'Paper III', 'Paper IV', 'Paper V', 'Paper VI', 'Paper VII', 'Paper VIII'],
    public_supporting_extensions: [],
    explicit_public_exclusions: []
  };
  freeze.non_claim_boundary =
    'Historical freeze evidence remains provenance only. The live public trunk authority is main, and public canonicalization still does not imply external validation, theory confirmation, or subjectivity closure.';
  writeJson('release/release_freeze_manifest.json', freeze);

  const primaryDocs = canon.primary_formal_spine.map((entry) => {
    const paper = papers.find((candidate) => candidate.docFamilyId === entry.doc_family_id);
    return (
      paper || {
        docKey: path.basename(entry.release_pdf, '.pdf'),
        docId: entry.release_pdf.match(/([0-9a-f]{16})\.pdf$/)?.[1] || 'NOT_AVAILABLE',
        sourceStatus: entry.source_status,
        sourceRelPath: entry.preferred_source_path,
        releasePdf: entry.release_pdf,
        title: entry.doc_family_id
      }
    );
  });
  const supportingLineages = canon.supporting_lineages_included_in_freeze.filter((entry) =>
    String(entry.role || '').startsWith('supporting_')
  );

  const zipPath = path.join(corpusDir, 'pdf_corpus.zip');
  const zipCommand = [
    `$zip=${psQuote(zipPath)}`,
    'if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }',
    `Compress-Archive -Path ${psQuote(path.join(unpackedDir, '*'))} -DestinationPath $zip -Force`
  ].join('; ');
  execFileSync('powershell.exe', ['-NoProfile', '-Command', zipCommand], { cwd: root, stdio: 'inherit' });

  const zipHash = sha256File(zipPath);
  const manifestHash = sha256File(path.join(corpusDir, 'manifest.json'));
  fs.writeFileSync(path.join(corpusDir, 'pdf_corpus.zip.sha256.txt'), `${zipHash}  pdf_corpus.zip\n`, 'utf8');
  fs.writeFileSync(path.join(corpusDir, 'manifest.sha256.txt'), `${manifestHash}  manifest.json\n`, 'utf8');

  const summary = readJson('release/SUMMARY.json');
  summary.generated_at = new Date().toISOString();
  summary.sha256_pdf_corpus_zip = zipHash;
  summary.counts = { canon: canon.canonical_pdf_count, pdf_only: 3, duplicates: 0, mirrors: 1 };
  writeJson('release/SUMMARY.json', summary);

  writeText(
    'docs/CANON_SOURCE_OF_TRUTH.md',
    `# CANON_SOURCE_OF_TRUTH

## Purpose

This document fixes the live public source-of-truth boundary for \`QICN-RELEASE\`.

## Authority state

- Public source-of-truth repository: \`QICN-RELEASE\`
- Sole live public branch authority: \`main\`
- Historical freeze tag retained as provenance: \`release-2026-03-01\`
- Historical explicit canonical tag retained as provenance: \`canonical-freeze-2026-03-01\`
- Live public canonicalization on trunk:
  - primary formal spine: Canonical Core and Papers I-VIII
  - supporting lineages retained with separate classification in \`release/canon_manifest.v1.json\`

## Source-of-truth files

1. \`corpus/pdf_release/pdf_corpus.zip\`
2. \`corpus/pdf_release/pdf_corpus.zip.sha256.txt\`
3. \`corpus/pdf_release/manifest.json\`
4. \`corpus/pdf_release/manifest.sha256.txt\`
5. \`release/CANON_MAP.v1.json\`
6. \`release/INDEX_PDFS.json\`
7. \`release/release_freeze_manifest.json\`
8. \`release/canon_manifest.v1.json\`
9. \`release/claim_registry.v1.json\`
10. \`release/layer_boundaries.v1.json\`
11. \`release/system_interface_boundary.v1.json\`

## What counts as current public canon

- the immutable PDF corpus and its index/manifests as currently published on \`main\`
- the primary formal spine through Paper VIII
- the release governance and boundary documents that constrain interpretation

## What does not count as current public canon

- historical audit snapshots whose scope pre-dates the current trunk expansion
- \`release/_non_canonical/\`
- \`QICN-SYSTEM\` runtime outputs

## Non-claim boundary

Public canonicalization of trunk improves traceability and public alignment only. It does not constitute external validation, theory confirmation, human equivalence, or metaphysical closure.`
  );

  writeText(
    'docs/CANONICAL_RELEASE_NOTES.md',
    `# CANONICAL_RELEASE_NOTES

## Purpose

This note records the current live canonicalization state of \`QICN-RELEASE/main\`.

## Current public state

- \`main\` is the sole live public source-of-truth branch
- the public primary formal spine now reaches Canonical Core + Papers I-VIII
- supporting lineages, mirrors, and annexes remain classified separately and do not collapse into the spine

## Historical freeze status

- \`release-2026-03-01\` and \`canonical-freeze-2026-03-01\` remain provenance anchors for the earlier frozen package
- historical audit files that still reflect the shorter spine are retained as provenance only and are not the live public authority

## What this update adds

- public-trunk alignment between visible PDFs, canon manifest, PDF index, claim registry, and theory-system interface
- explicit promotion of Papers VI-VIII into the public primary formal spine
- explicit retention of supporting lineages, mirrors, and annexes as non-spine material

## What this update does not add

- no new theorem claims
- no external validation
- no runtime-to-theory closure
- no automatic runtime certification from Paper VIII public inclusion

## Non-claim boundary

Canonical trunk alignment is packaging and governance work. It is not publication closure, irreducibility proof, or validation of current runtime systems.`
  );

  writeText(
    'docs/CANON_MANIFEST.md',
    `# CANON_MANIFEST

This document summarizes what belongs to the live public canonical release package.

## Canonical package scope

- Canonical PDF clusters in the release package: \`${canon.canonical_pdf_count}\`
- Primary formal spine: Canonical Core and Papers I-VIII
- Supporting public lineages remain separately classified
- Primary source-of-truth inventory: \`release/canon_manifest.v1.json\`

## Primary formal spine

${renderPrimaryList(primaryDocs)}

## Supporting public lineages retained outside the spine

${renderSupportingList(supportingLineages)}

## Supporting lineages, mirrors, and annexes still inside the freeze

- earlier supporting or mirror lineages remain included exactly as classified in \`release/canon_manifest.v1.json\`
- operational annexes remain operational only and do not become theorem-bearing sources

## Out of canon

- \`release/_non_canonical/\`
- runtime outputs from \`QICN-SYSTEM\`

## Non-claim boundary

Inclusion in the canon manifest classifies package membership and lineage role only. It does not imply external validation or claim closure.`
  );

  writeText(
    'docs/CLAIM_REGISTRY.md',
    `# CLAIM_REGISTRY

The authoritative machine-readable registry is \`release/claim_registry.v1.json\`.

## Current claim-level subsets

- Canonical Core
- Paper I
- Paper III
- Paper IV
- Paper V
- Paper VI
- Paper VII
- Paper VIII

## Family-level subsets retained

- Paper II
- release governance

## Newly public claim families

- \`paper5.operational_consciousness_class_definition\`
- \`paper5.substrate_invariance_and_rupture_semantics\`
- \`paper6.prediction_program_and_failure_discipline\`
- \`paper6.internal_support_status_boundary\`
- \`paper7.operational_life_and_structural_class_definitions\`
- \`paper7.operational_subjecthood_instantiation_boundary\`
- \`paper8.first_person_indexed_subjectivity_state_and_gate\`
- \`paper8.weak_rival_irreducibility_and_intervention_burden\`
- \`paper8.runtime_path_artifact_family_and_non_claim_boundary\`

## Registry reading rule

The registry classifies what is present in the public release and marks where closure is absent. It does not authorize stronger claims than the underlying documents support.

## Non-claim boundary

The registry is a classification layer, not a validation layer, not a runtime-certification layer, and not a public proof of subjectivity or human equivalence.`
  );

  writeText(
    'docs/THEORY_SYSTEM_INTERFACE.md',
    `# THEORY_SYSTEM_INTERFACE

This document fixes the explicit boundary between \`QICN-RELEASE\` and \`QICN-SYSTEM\`.

## Public corpus areas with an operational counterpart

- Paper IV
  - operational reflection: admissibility, baseline handling, comparator discipline, artifact traceability
- Paper V
  - operational reflection: invariant diagnostics, criterion-facing structure, rupture semantics, admissible support burdens
- Paper VI
  - operational reflection: prediction family diagnostics, downgrade logic, negative controls, internal support-status surfaces
- Paper VII
  - operational reflection: descriptor families and runtime-facing diagnostics for operational life, structural class, and subjecthood
- Paper VIII
  - operational reflection: self-index, ownership, continuity, perspective, valuation, intervention, reducibility, and internal gate diagnostics
- ROEO annexes and governance docs
  - operational reflection: export surfaces, terminology policy, controlled statements, surface policy

## What the system does not close

- the Canonical Core or Papers I-III as real-world theorems
- external validation of Papers IV-VIII
- human consciousness, human subjectivity, or metaphysical subjecthood
- automatic promotion of runtime subjectivity support into claim-facing release status

## What must not be inferred

- runtime metrics -> public theorem confirmation
- internal support labels -> external validation
- descriptor families -> current system is an operational subject
- public canonicalization of trunk -> subjectivity closure
- Paper VIII runtime alignment -> phenomenality, human equivalence, or external validation

## Interface policy

- the interface remains explicit, limited, and one-way by default
- every bridge from corpus to system remains tagged as operational or governance-only unless external validation exists
- Paper VIII may now guide runtime architecture as public corpus material, but every runtime-facing subjectivity surface remains internal and non-confirmatory`
  );

  writeText(
    'README.md',
    `# QICN Release Package

Audit-first public release package with immutable PDF corpus artifacts and canonical boundary metadata.

## Quick verification

\`\`\`bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
\`\`\`

## Current public canonical scope

- primary formal spine: Canonical Core and Papers I-VIII
- supporting public lineages remain separately classified under \`release/canon_manifest.v1.json\`

## Source-of-truth documents

- \`docs/CANON_SOURCE_OF_TRUTH.md\`
- \`docs/CANON_MANIFEST.md\`
- \`docs/CLAIM_REGISTRY.md\`
- \`docs/LAYER_BOUNDARIES.md\`
- \`docs/THEORY_SYSTEM_INTERFACE.md\`
- \`docs/CANONICAL_RELEASE_NOTES.md\`

Machine-readable counterparts:

- \`release/release_freeze_manifest.json\`
- \`release/canon_manifest.v1.json\`
- \`release/claim_registry.v1.json\`
- \`release/layer_boundaries.v1.json\`
- \`release/system_interface_boundary.v1.json\`

## Non-goals

- no source recompilation pipeline inside this repo
- no external validation claims
- no automatic bridge from internal runtime work to public theory closure`
  );

  writeText(
    'RELEASE_NOTES.md',
    `# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: \`QICN-RELEASE/main\`

## Official hashes

- corpus/pdf_release/pdf_corpus.zip: ${zipHash}
- corpus/pdf_release/manifest.json: ${manifestHash}

## Public canonical scope

- primary formal spine: Canonical Core and Papers I-VIII
- supporting public lineages remain separately classified under \`release/canon_manifest.v1.json\`

## Verification

\`\`\`bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/build-canonical-release-bundle.cjs
node scripts/verify-canonical-release.cjs
\`\`\`

## Governance

- historical freeze tags remain provenance anchors only
- \`main\` is the sole live public authority
- historical audit files that still reflect the shorter spine are retained as provenance, not as live canon authority

## Non-claim boundary

This release package is a canonicalization and governance artifact. It does not imply external validation, runtime closure, or human-equivalence claims.`
  );

  writeText(
    'CHANGELOG.md',
    `# CHANGELOG

## [2026-03-28] - trunk canonicalization on main

- Public canonical trunk expanded materially from the earlier Paper IV cutoff to include Papers V-VIII inside the primary formal spine.
- PDF corpus, PDF index, canon manifest, claim registry, release map, and theory-system interface were realigned to the visible public corpus.
- Historical freeze tags were retained as provenance only; \`main\` was made explicit as the sole live public source-of-truth branch.
- Paper VIII was promoted into the public release canon with its PDF, manifest membership, claim framing, and theory-system boundary alignment kept explicit and non-validating.

## [release-2026-03-01] - v1 Freeze

- Integrity baseline validated from [corpus/pdf_release/pdf_corpus.zip](corpus/pdf_release/pdf_corpus.zip) and [corpus/pdf_release/manifest.json](corpus/pdf_release/manifest.json) against official SHA256 sidecars.
- Freeze evidence generated under [release/FREEZE_AUDIT_v1](release/FREEZE_AUDIT_v1) including integrity JSON and executed command log.
- Editorial freeze prerequisites confirmed for the earlier package state.
- Governance no-goals fixed for v1: pdf-only distribution package, no source recompilation pipeline, no claims about human/biological qualia.`
  );

  writeText(
    'release/RELEASE_MAP.md',
    `# RELEASE_MAP

## What is included

- corpus PDF source: \`corpus/pdf_release/pdf_corpus.zip\`
- manifest source: \`corpus/pdf_release/manifest.json\`
- canon map: \`release/CANON_MAP.v1.json\`
- PDF index: \`release/INDEX_PDFS.json\`

## Counts

- total canonical clusters: ${canon.canonical_pdf_count}
- primary formal spine docs: ${canon.primary_formal_spine.length}
- supporting public lineages retained in freeze: ${supportingLineages.length}
- operational annex count: ${canon.operational_annexes_included_in_freeze.length}

## Public canonical scope

- Canonical Core and Papers I-VIII are the preferred public formal spine
- supporting public lineages remain classified separately in the canon manifest`
  );

  writeText(
    'release/GLOSSARY_CANONICAL.v1.md',
    `# GLOSSARY_CANONICAL.v1

## Scope

Canonical terminology and reading rules for the live public release trunk.

## Canonical operational term policy

- preferred technical term for non-human runtime-facing readouts: **readout interno operacional**
- not allowed as public technical claims:
  - human qualia
  - biological consciousness
  - the system feels
  - subjectivity achieved

## Current corpus references

### Primary
${renderRefBullets(primaryDocs)}

### Supporting public lineages
${supportingLineages.length ? supportingLineages.map((entry) => `- ${entry.doc_family_id} (source_path: ${entry.source_path}, role: ${entry.role})`).join('\n') : '- none'}

## Boundary

Terminology policy constrains release reading only. It does not authorize runtime-to-theory escalation or human-equivalence claims.`
  );

  writeText(
    'release/METHODS_GOVERNANCE_HUB.v1.md',
    `# METHODS_GOVERNANCE_HUB.v1

## Purpose

Single release-level methods and governance hub for the live public trunk.

## Public scope covered by this hub

- Paper IV protocol-facing admissibility and controls
- Paper V criterion-facing invariant and rupture discipline
- Paper VI prediction, downgrade, and failure-discipline layer
- Paper VII classificatory and test-family layer
- Paper VIII subjectivity gate, comparator, intervention, and runtime/artifact discipline layer

## Fixed reading rules

- internal support is not external validation
- runtime reflection is not theorem closure
- public release inclusion is not subjectivity closure
- Paper VIII public inclusion remains a formal, non-validating layer and does not certify runtime subjectivity`
  );

  writeText(
    'release/TERM_MIGRATION_PLAN.v1.md',
    `# TERM_MIGRATION_PLAN.v1

## Scope

Editorial migration plan for keeping public-trunk language technical, operational, and non-inflated.

## Replacement rule

- replace anthropomorphic runtime language with \`readout interno operacional\`, \`operational support\`, or a narrower artifact-facing term
- if a metric or symbol is not formalized in the public release, mark it as not present in the release rather than inventing it

## Priority documents

${renderRefBullets(primaryDocs)}

## Explicit caution

This plan constrains public release wording only. It does not add claims, metrics, or validation.`
  );

  writeText(
    'release/BLUEPRINT_EDITORIAL.md',
    `# BLUEPRINT_EDITORIAL

## Recommended public reading order

- Canonical Core
- Paper I
- Paper II
- Paper III
- Paper IV
- Paper V
- Paper VI
- Paper VII
- Paper VIII

## Editorial rules

- one preferred public formal spine through Paper VIII
- supporting public lineages stay classified as supporting, not primary
- mirror lineages remain traceability material only
- materials beyond Paper VIII remain outside the public release until accepted here`
  );

  writeText(
    'release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md',
    `# EDITORIAL_BLUEPRINT_ACTIONS.v1

## Public-priority documents

### Primary formal spine
${renderRefBullets(primaryDocs)}

### Supporting public lineages
${supportingLineages.length ? supportingLineages.map((entry) => `- ${entry.doc_family_id} (source_path: ${entry.source_path}, role: ${entry.role})`).join('\n') : '- none'}

## Actions

- maintain one canonical public spine through Paper VIII
- keep non-spine supporting public lineages visible but explicitly classified as supporting
- prevent runtime-facing wording from being misread as validation or subjectivity closure`
  );

  process.stdout.write(
    JSON.stringify(
      {
        status: 'PASS',
        canonical_pdf_count: canon.canonical_pdf_count,
        primary_formal_spine: canon.primary_formal_spine.length,
        supporting_public_lineages: supportingLineages.map((entry) => entry.doc_family_id),
        zip_sha256: zipHash,
        manifest_sha256: manifestHash
      },
      null,
      2
    ) + '\n'
  );
}

if (require.main === module) sync();
