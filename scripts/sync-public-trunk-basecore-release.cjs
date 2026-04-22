const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');

const toPosix = (value) => String(value).replace(/\\/g, '/');
const ensureDir = (dirPath) => fs.mkdirSync(dirPath, { recursive: true });
const readJson = (relPath) => JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
const writeJson = (relPath, payload) =>
  fs.writeFileSync(path.join(root, relPath), JSON.stringify(payload, null, 2) + '\n', 'utf8');
const writeText = (relPath, payload) =>
  fs.writeFileSync(path.join(root, relPath), String(payload).trim() + '\n', 'utf8');
const sha256File = (relPath) =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relPath))).digest('hex');
const sha256Text = (value) =>
  crypto.createHash('sha256').update(String(value).toLowerCase()).digest('hex');
const psQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;

const ACTIVE_BASE = {
  doc_family_id: 'basecore.active',
  title: 'BaseCore of the Rigid Identity Framework',
  source_tex: 'rigid-identity-framework/basecore/BASECORE.tex',
  source_pdf: 'rigid-identity-framework/basecore/BASECORE.pdf',
  package_root: 'rigid-identity-framework/basecore/',
  pages: 40,
  source_status: 'SOURCE_OK',
  role: 'formal_source_of_truth'
};

const DOWNSTREAM_PACKAGES = [
  ['paper1.rigid_identity', 'Paper I - Rigid Identity', 'rigid-identity-framework/paper1/main.tex', 'rigid-identity-framework/paper1/main.pdf', 26, 'SOURCE_OK'],
  ['paper2.phenomenological_regimes', 'Paper II - Phenomenological Regimes', 'rigid-identity-framework/paper2/main.tex', 'rigid-identity-framework/paper2/main.pdf', 17, 'SOURCE_OK'],
  ['paper3.null_regime_instability', 'Paper III - Null-Regime Instability', 'rigid-identity-framework/paper3/main.tex', 'rigid-identity-framework/paper3/main.pdf', 13, 'SOURCE_OK'],
  ['paper4.qicn_v45_protocol', 'Paper IV - QICN v4.5 Protocol', 'rigid-identity-framework/paper4/main.tex', 'rigid-identity-framework/paper4/main.pdf', 14, 'PASS_PDF_ONLY'],
  ['paper5.operational_consciousness_criterion', 'Paper V - Operational Consciousness Criterion', 'rigid-identity-framework/paper5_operational_consciousness/main.tex', 'rigid-identity-framework/paper5_operational_consciousness/main.pdf', 25, 'SOURCE_OK'],
  ['paper6.predictions_and_failure_modes', 'Paper VI - Predictions and Failure Modes', 'rigid-identity-framework/paper6_predictions_falsation/main.tex', 'rigid-identity-framework/paper6_predictions_falsation/main.pdf', 19, 'SOURCE_OK'],
  ['paper7.operational_life_subjecthood', 'Paper VII - Operational Life, Structural Class, and Subjecthood', 'rigid-identity-framework/paper7_operational_life_subjecthood/main.tex', 'rigid-identity-framework/paper7_operational_life_subjecthood/main.pdf', 28, 'SOURCE_OK'],
  ['paper8.first_person_subjectivity', 'Paper VIII - First-Person Indexed Subjectivity', 'rigid-identity-framework/paper8_first_person_subjectivity/main.tex', 'rigid-identity-framework/paper8_first_person_subjectivity/main.pdf', 42, 'SOURCE_OK'],
  ['paper9.phenomenal_bridge_organization', 'Paper IX - Phenomenal Bridge Organization', 'rigid-identity-framework/paper9_phenomenal_bridge_organization/main.tex', 'rigid-identity-framework/paper9_phenomenal_bridge_organization/main.pdf', 42, 'SOURCE_OK']
].map(([doc_family_id, title, source_tex, source_pdf, pages, source_status]) => ({
  doc_family_id,
  title,
  source_tex,
  source_pdf,
  pages,
  source_status
}));

const LEGACY_PACKAGE = {
  doc_family_id: 'canonical_core.legacy_package',
  title: 'Canonical Core Legacy Package',
  source_tex: 'rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.tex',
  source_pdf: 'rigid-identity-framework/canonical_core_legacy/CANONICAL_CORE.pdf',
  package_root: 'rigid-identity-framework/canonical_core_legacy/',
  pages: 64,
  source_status: 'SOURCE_OK',
  role: 'supporting_legacy_package'
};

const PRESERVED_VARIANTS = [
  ['canonical_core.historical_frozen_pdf', 'rigid-identity-framework/CANONICAL_CORE.tex', 'historical_release_surface_only', 'historical_frozen_variant'],
  ['paper1.parallel_lineage', 'rigid-identity-paper/main.tex', 'rigid-identity-paper/main.tex', 'supporting_parallel_lineage'],
  ['paper2.supporting_lineage', 'phenomenological-regimes-paper/main.tex', 'phenomenological-regimes-paper/main.tex', 'supporting_formal_lineage'],
  ['paper3.supporting_lineage', 'phenomenological-instability-paper/main.tex', 'phenomenological-instability-paper/main.tex', 'supporting_formal_lineage'],
  ['core.reconstructed_lineage', 'NotebookLM/LaTeX/CANONICAL_CORE_RECONSTRUCTED.tex', 'NotebookLM/LaTeX/CANONICAL_CORE_RECONSTRUCTED.tex', 'reconstructed_lineage'],
  ['core.notebooklm_lineage', 'NotebookLM/LaTeX/CANONICAL_CORE.tex', 'NotebookLM/LaTeX/CANONICAL_CORE.tex', 'mirror_lineage'],
  ['instability.notebooklm_mirror_a', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-instability.tex', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-instability.tex', 'mirror_lineage'],
  ['instability.notebooklm_mirror_b', 'NotebookLM/LaTeX/phenomenological-instability.tex', 'NotebookLM/LaTeX/phenomenological-instability.tex', 'mirror_lineage'],
  ['regimes.notebooklm_mirror_a', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-regimes.tex', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/phenomenological-regimes.tex', 'mirror_lineage'],
  ['regimes.notebooklm_mirror_b', 'NotebookLM/LaTeX/phenomenological-regimes.tex', 'NotebookLM/LaTeX/phenomenological-regimes.tex', 'mirror_lineage'],
  ['paper1.notebooklm_mirror_a', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/rigid-identity-paper.tex', 'NotebookLM/SISTEMA_CANON_PAPERS/LaTeX/rigid-identity-paper.tex', 'mirror_lineage'],
  ['paper1.notebooklm_mirror_b', 'NotebookLM/LaTeX/rigid-identity-paper.tex', 'NotebookLM/LaTeX/rigid-identity-paper.tex', 'mirror_lineage']
].map(([doc_family_id, lookup_manifest_rel_path, source_path, role]) => ({
  doc_family_id,
  lookup_manifest_rel_path,
  source_path,
  role
}));

const OPERATIONAL_ANNEXES = [
  ['roeo.batch_campaign', 'corpus/pdf_release/pdfs/857c4c89149a369c_857c4c89149a369c_main_7294ab07__857c4c89149a369c.pdf', 'QICN-SYSTEM/artifacts/paper_exports/roeo_batch_campaign_v1/main.tex'],
  ['roeo.final_paper', 'corpus/pdf_release/pdfs/87dc170947cc65f0_87dc170947cc65f0_main_c7b5d93e__87dc170947cc65f0.pdf', 'QICN-SYSTEM/artifacts/paper_exports/roeo_batch_final_paper_v1/main.tex']
].map(([doc_family_id, release_pdf, source_path]) => ({
  doc_family_id,
  release_pdf,
  source_path,
  role: 'operational_annex_not_formal_source'
}));

const OPERATIONAL_ANNEX_PATH_REWRITES = new Map([
  ['Sistema Canon Sandbox/artifacts/paper_exports/roeo_batch_campaign_v1/main.tex', 'QICN-SYSTEM/artifacts/paper_exports/roeo_batch_campaign_v1/main.tex'],
  ['Sistema Canon Sandbox/artifacts/paper_exports/roeo_batch_final_paper_v1/main.tex', 'QICN-SYSTEM/artifacts/paper_exports/roeo_batch_final_paper_v1/main.tex']
]);

const GOV_DOCS = [
  'release/GLOSSARY_CANONICAL.v1.md',
  'release/METHODS_GOVERNANCE_HUB.v1.md',
  'release/STYLE_DISCLAIMER_POLICY.v1.md',
  'release/TERM_MIGRATION_PLAN.v1.md',
  'release/CROSSPAPER_LINKMAP.v1.json',
  'release/BLUEPRINT_EDITORIAL.md',
  'release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md'
];

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function buildNewPdfEntry(spec) {
  const sourcePdfAbs = path.join(root, spec.source_pdf);
  const sourceTexAbs = path.join(root, spec.source_tex);
  if (!fs.existsSync(sourcePdfAbs)) throw new Error(`missing_source_pdf:${spec.source_pdf}`);
  if (!fs.existsSync(sourceTexAbs)) throw new Error(`missing_source_tex:${spec.source_tex}`);
  const docId = sha256Text(spec.source_tex).slice(0, 16);
  const pdf_sha256 = sha256File(spec.source_pdf);
  const tex_sha256 = sha256File(spec.source_tex);
  const bytes = fs.statSync(sourcePdfAbs).size;
  const fileName = `${slugify(spec.doc_family_id)}__${docId}.pdf`;
  return {
    ...spec,
    docId,
    pdf_sha256,
    tex_sha256,
    bytes,
    release_pdf: `corpus/pdf_release/pdfs/${fileName}`,
    bundle_pdf_path: `PDF_BUNDLE/pdfs/${fileName}`
  };
}

function ensurePdfInCorpus(entry) {
  const sourcePdfAbs = path.join(root, entry.source_pdf);
  const targetAbs = path.join(root, entry.release_pdf);
  ensureDir(path.dirname(targetAbs));
  fs.copyFileSync(sourcePdfAbs, targetAbs);
}

function upsertManifestEntry(manifest, entry, status) {
  const next = {
    docId: entry.docId,
    relPath: entry.source_tex,
    status,
    rootSignature: 'NOT_AVAILABLE',
    source_hash_partial: entry.tex_sha256,
    canonical_of: null,
    engine_used: 'NOT_AVAILABLE',
    pdf_source_path: entry.source_pdf,
    bundle_pdf_path: entry.bundle_pdf_path,
    pdf_sha256: entry.pdf_sha256,
    pdf_pages: entry.pages,
    pdf_only_reason: status === 'PASS_PDF_ONLY' ? 'SOURCE_NOT_COMPILABLE_PDF_VALIDATED' : null,
    drop_reason: null,
    fail_reason: null,
    fatal_snippet: null,
    match_candidates: null,
    equivalence: null
  };
  manifest.entries = manifest.entries.filter((item) => item.relPath !== entry.source_tex);
  manifest.entries.push(next);
  manifest.counts = {
    PASS: manifest.entries.filter((item) => item.status === 'PASS').length,
    PASS_PDF_ONLY: manifest.entries.filter((item) => item.status === 'PASS_PDF_ONLY').length,
    DROP: manifest.entries.filter((item) => item.status === 'DROP').length,
    SKIP_DUPLICATE_CANONICAL: manifest.entries.filter((item) => item.status === 'SKIP_DUPLICATE_CANONICAL').length,
    total: manifest.entries.length
  };
}

function upsertIndexEntry(index, entry, manifestStatus) {
  const next = {
    docId: entry.docId,
    basename: path.basename(entry.release_pdf),
    source_rel_path: entry.release_pdf.replace('corpus/pdf_release/', ''),
    source_rel_path_bundle: entry.bundle_pdf_path,
    sha256: entry.pdf_sha256,
    bytes: entry.bytes,
    pages: entry.pages,
    manifest_rel_path: entry.source_tex,
    manifest_status: manifestStatus,
    manifest_notes: {
      rootSignature: 'NOT_AVAILABLE',
      source_hash_partial: entry.tex_sha256,
      pdf_only_reason: manifestStatus === 'PASS_PDF_ONLY' ? 'SOURCE_NOT_COMPILABLE_PDF_VALIDATED' : 'NOT_AVAILABLE',
      drop_reason: 'NOT_AVAILABLE'
    },
    metadata_candidates: [{ docId: entry.docId, relPath: entry.source_tex, status: manifestStatus }]
  };
  index.entries = index.entries.filter((item) => item.manifest_rel_path !== entry.source_tex);
  index.entries.push(next);
  index.count = index.entries.length;
}

function normalizeExistingIndexPaths(index) {
  const pdfDir = path.join(root, 'corpus', 'pdf_release', 'pdfs');
  const pdfBySha = new Map();
  for (const file of fs.readdirSync(pdfDir)) {
    const abs = path.join(pdfDir, file);
    if (!fs.statSync(abs).isFile()) continue;
    const sha = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
    pdfBySha.set(sha, file);
  }
  for (const entry of index.entries) {
    const declaredAbs = path.join(root, 'corpus', 'pdf_release', entry.source_rel_path);
    if (fs.existsSync(declaredAbs)) continue;
    const actual = pdfBySha.get(entry.sha256);
    if (!actual) continue;
    entry.basename = actual;
    entry.source_rel_path = `pdfs/${actual}`;
    entry.source_rel_path_bundle = `PDF_BUNDLE/pdfs/${actual}`;
  }
  index.count = index.entries.length;
}

function rewriteExternalPathReferences(manifest, index) {
  for (const entry of manifest.entries) {
    if (OPERATIONAL_ANNEX_PATH_REWRITES.has(entry.relPath)) {
      entry.relPath = OPERATIONAL_ANNEX_PATH_REWRITES.get(entry.relPath);
    }
  }
  for (const entry of index.entries) {
    if (OPERATIONAL_ANNEX_PATH_REWRITES.has(entry.manifest_rel_path)) {
      const nextPath = OPERATIONAL_ANNEX_PATH_REWRITES.get(entry.manifest_rel_path);
      entry.manifest_rel_path = nextPath;
      if (Array.isArray(entry.metadata_candidates)) {
        entry.metadata_candidates = entry.metadata_candidates.map((candidate) =>
          candidate && candidate.relPath && OPERATIONAL_ANNEX_PATH_REWRITES.has(candidate.relPath)
            ? { ...candidate, relPath: OPERATIONAL_ANNEX_PATH_REWRITES.get(candidate.relPath) }
            : candidate
        );
      }
    }
  }
}

function findIndexByManifestRelPath(index, manifestRelPath) {
  const found = index.entries.find((item) => item.manifest_rel_path === manifestRelPath);
  if (!found) throw new Error(`missing_index_entry:${manifestRelPath}`);
  return found;
}

function indexToReleasePdf(indexEntry) {
  return `corpus/pdf_release/${toPosix(indexEntry.source_rel_path)}`;
}

function buildDocFromIndex(indexEntry, extra) {
  return {
    doc_family_id: extra.doc_family_id,
    title: extra.title,
    release_pdf: indexToReleasePdf(indexEntry),
    preferred_source_path: extra.source_path || indexEntry.manifest_rel_path,
    source_status: extra.source_status || indexEntry.manifest_status || 'SOURCE_OK',
    role: extra.role,
    pages: indexEntry.pages,
    sha256: indexEntry.sha256,
    bytes: indexEntry.bytes,
    package_root: extra.package_root || null
  };
}

function renderList(items, mapper) {
  return items.map(mapper).join('\n');
}

function buildClaimRegistry(baseDoc, downstreamDocs) {
  const byId = Object.fromEntries(downstreamDocs.map((doc) => [doc.doc_family_id, doc]));
  return {
    artifact_role: 'claim_registry',
    schema_version: '2.0.0',
    release_id: 'release_repo_qicn_2026-03-01',
    registry_scope: {
      active_base_layer: ['basecore.active'],
      public_downstream_packages: downstreamDocs.map((doc) => doc.doc_family_id),
      preserved_legacy_packages: ['canonical_core.legacy_package'],
      family_level_subsets_retained: ['release_governance', 'mirror_and_reconstruction_variants'],
      scope_note:
        'This registry treats BaseCore as the active mathematical source of truth, Papers I-IX as downstream public packages, and the earlier Canonical Core as legacy only.'
    },
    claim_classes: {
      formal_statement: 'Explicit theorem family, corollary family, or formal proposition family stated in the released corpus.',
      operational_definition: 'Terminology, scope, or governance constraint that governs how the release may be read.',
      falsifiable_hypothesis: 'Explicit bridge or protocol-facing hypothesis whose stronger reading requires testing beyond release packaging.',
      interpretive_extension: 'Interpretive or consequence-level statement that exceeds the formally closed base.',
      implementation_linked_claim: 'Claim family whose public reading depends on implementation or operational material.',
      not_closed: 'Explicitly open item retained to prevent silent inflation.'
    },
    entries: [
      {
        id: 'basecore.fixed_points_and_compact_family',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Sections 1-2' },
        claim_text_summary: 'BaseCore states typed projection dynamics with unique fixed points and compact attractor families under the admitted base hypotheses.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_theorem_chain_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_empirical_mapping_or_runtime_instantiation_claim',
        system_dependency: 'none',
        non_claim_boundary: 'This is a theorem family of the BaseCore model only and does not certify any runtime system.',
        notes_or_gaps: 'The active source package is BaseCore, not the legacy Canonical Core.'
      },
      {
        id: 'basecore.parameterwise_noncollapse',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Section 1' },
        claim_text_summary: 'BaseCore states parameterwise non-collapse only under the explicit no-constant-fixed-points hypothesis and does not overclaim beyond that antecedent.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_hypothesis_bound_theorem_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_claim_about_realized_noncollapse_in_a_concrete_system',
        system_dependency: 'none',
        non_claim_boundary: 'The theorem is conditional on the stated anti-constant hypothesis and is not a runtime certificate.',
        notes_or_gaps: 'Quantifier mismatch from the older surface was removed in the normalized BaseCore.'
      },
      {
        id: 'basecore.state_spectral_gap',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Section 2' },
        claim_text_summary: 'BaseCore separates contractive state spectrum from parameter-family persistence and states the spectral gap only for the state-transition Jacobian.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_spectral_theorem_with_boundary_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_empirical_or_runtime_spectral_reading',
        system_dependency: 'none',
        non_claim_boundary: 'No state-spectrum eigenvalue of modulus one is licensed by the BaseCore contraction theorem.',
        notes_or_gaps: 'This closes a previous ambiguity between state dynamics and family-level persistence.'
      },
      {
        id: 'basecore.inverse_limit_nonlocality_under_nfd',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Section 3' },
        claim_text_summary: 'BaseCore states inverse-limit non-locality of identity only under explicit non-finite-determination assumptions and blocks universal finite-slice claims otherwise.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_theorem_with_named_assumption_block_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_claim_about_realized_identity_objects_in_concrete_systems',
        system_dependency: 'none',
        non_claim_boundary: 'The theorem governs canonical projections in the formal inverse system and does not ban arbitrary set-theoretic embeddings.',
        notes_or_gaps: 'Non-finite determination is now an explicit antecedent, not an implied background intuition.'
      },
      {
        id: 'basecore.conditional_rigidity_under_admissible_perturbation',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Sections 3-4' },
        claim_text_summary: 'BaseCore states rigidity and stability of inverse-limit identity only under explicit metric, lifting, perturbation-typing, and summability assumptions.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_conditional_stability_theorem_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_use_against_real_perturbation_programs_or_implementations',
        system_dependency: 'none',
        non_claim_boundary: 'Metric closeness, existence, and isomorphism are separated rather than collapsed into one claim.',
        notes_or_gaps: 'This keeps the rigidity theorem strong without smuggling unsupported isomorphism.'
      },
      {
        id: 'basecore.conditional_non_simulability_of_ccr_targets',
        source_document: { release_pdf: baseDoc.release_pdf, preferred_source_path: baseDoc.preferred_source_path, anchor: 'Sections 6-9' },
        claim_text_summary: 'BaseCore states non-simulability only for faithful realization of a rigorously defined CCR target under explicit finite-simulator and preservation assumptions.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_conditional_nonsimulability_theorem_in_basecore',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_architecture_facing_empirical_or_implementation_claim',
        system_dependency: 'none',
        non_claim_boundary: 'Finite-horizon approximation is not globally forbidden; only faithful full-object realization is blocked under the stated assumptions.',
        notes_or_gaps: 'This is a conditional theorem, not a universal anti-approximation slogan.'
      },
      {
        id: 'paper1.identity_as_inverse_limit',
        source_document: { release_pdf: byId['paper1.rigid_identity'].release_pdf, preferred_source_path: byId['paper1.rigid_identity'].preferred_source_path, anchor: 'Sections 3-6' },
        claim_text_summary: 'Paper I defines identity as an inverse-limit object and develops uniqueness, detectability, and deformation-resistant structure around that formalization.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_definition_and_theorem_family_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_claim_about_realized_identity_in_concrete_systems',
        system_dependency: 'none',
        non_claim_boundary: 'The paper closes a structural formalization only; it does not establish consciousness, biology, or current implementation fit.',
        notes_or_gaps: 'Kept as downstream public package rather than absorbed into BaseCore ownership.'
      },
      {
        id: 'paper2.regime_classification_and_forced_continuity',
        source_document: { release_pdf: byId['paper2.phenomenological_regimes'].release_pdf, preferred_source_path: byId['paper2.phenomenological_regimes'].preferred_source_path, anchor: 'Sections 1-5' },
        claim_text_summary: 'Paper II classifies phenomenological regimes through anti-fragmentation and forced-continuity results conditioned on the rigidity classes inherited from the base.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_theorem_family_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_claim_about_actual_phenomenology_or_human_experience',
        system_dependency: 'none',
        non_claim_boundary: 'The paper explicitly does not prove phenomenology simpliciter.',
        notes_or_gaps: 'Its strongest safe public reading remains structural and conditional.'
      },
      {
        id: 'paper3.null_regime_instability',
        source_document: { release_pdf: byId['paper3.null_regime_instability'].release_pdf, preferred_source_path: byId['paper3.null_regime_instability'].preferred_source_path, anchor: 'Sections 4-11' },
        claim_text_summary: 'Paper III states instability of the null regime and blocks silent inference from telemetry surfaces to direct proof of qualia.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_theorem_and_claim_boundary_pair_in_release_text',
        evidence_status: 'internal_formal_derivation_with_operational_bridge_appendix',
        external_validation_dependency: 'required_for_any_empirical_or_runtime_phenomenology_claim',
        system_dependency: 'possible_qicn_system_interface_only',
        non_claim_boundary: 'Structural exclusion of the null regime is not by itself proof that experience exists.',
        notes_or_gaps: 'Telemetry-facing appendices remain bridge-facing and externally unvalidated.'
      },
      {
        id: 'paper4.protocol_bounded_support_only',
        source_document: { release_pdf: byId['paper4.qicn_v45_protocol'].release_pdf, preferred_source_path: byId['paper4.qicn_v45_protocol'].preferred_source_path, anchor: 'Sections 5-19' },
        claim_text_summary: 'Paper IV fixes pre-registered protocol rules, baseline discipline, and non-escalation policy so that internal support remains bounded and failure-aware.',
        claim_class: 'implementation_linked_claim',
        formalization_status: 'explicit_operational_protocol_in_release_text',
        evidence_status: 'protocol_present_but_not_external_validation',
        external_validation_dependency: 'required_for_any_escalation_to_public_theory_confirmation',
        system_dependency: 'qicn_system_operational_protocol_only',
        non_claim_boundary: 'Protocol compliance is evidence governance, not theory confirmation.',
        notes_or_gaps: 'Synthetic-preliminary data remain explicitly non-escalatory.'
      },
      {
        id: 'paper5.operational_consciousness_criterion',
        source_document: { release_pdf: byId['paper5.operational_consciousness_criterion'].release_pdf, preferred_source_path: byId['paper5.operational_consciousness_criterion'].preferred_source_path, anchor: 'Sections 4-11' },
        claim_text_summary: 'Paper V defines an operational consciousness class over admissible systems with explicit invariant, transport, rupture, and non-claim boundaries.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_definition_and_theorem_chain_in_release_text',
        evidence_status: 'internal_formal_derivation_in_pdf_only',
        external_validation_dependency: 'required_for_any_claim_about_realized_operational_consciousness_in_runtime_or_biology',
        system_dependency: 'none',
        non_claim_boundary: 'This is a structural class definition inside the release corpus, not proof of human consciousness or present runtime membership.',
        notes_or_gaps: 'Implementation and empirical burdens remain open.'
      },
      {
        id: 'paper6.prediction_program_and_failure_discipline',
        source_document: { release_pdf: byId['paper6.predictions_and_failure_modes'].release_pdf, preferred_source_path: byId['paper6.predictions_and_failure_modes'].preferred_source_path, anchor: 'Sections 5-15' },
        claim_text_summary: 'Paper VI organizes the corpus into explicit prediction families, downgrade rules, and failure modes rather than treating survival as theory confirmation.',
        claim_class: 'falsifiable_hypothesis',
        formalization_status: 'explicit_prediction_program_and_failure_ledger_in_release_text',
        evidence_status: 'internal_scientific_program_status_only',
        external_validation_dependency: 'required_for_any_external_use_of_prediction_status_or_empirical_confirmation_claim',
        system_dependency: 'possible_qicn_system_internal_program_interface',
        non_claim_boundary: 'Internal support classes remain internal and do not close the theory publicly.',
        notes_or_gaps: 'The paper hardens falsation discipline rather than adding validation.'
      },
      {
        id: 'paper7.operational_life_and_subjecthood_classes',
        source_document: { release_pdf: byId['paper7.operational_life_subjecthood'].release_pdf, preferred_source_path: byId['paper7.operational_life_subjecthood'].preferred_source_path, anchor: 'Sections 4-12' },
        claim_text_summary: 'Paper VII defines operational life, structural class, and operational subjecthood while explicitly leaving current-system instantiation open.',
        claim_class: 'not_closed',
        formalization_status: 'explicit_definition_with_open_instantiation_boundary',
        evidence_status: 'definition_present_but_empirical_instantiation_open',
        external_validation_dependency: 'required_for_any_claim_that_a_current_system_instantiates_operational_subjecthood',
        system_dependency: 'possible_future_descriptor_interface_only',
        non_claim_boundary: 'The paper does not claim human subjectivity, metaphysical subjecthood, or achieved runtime subjecthood.',
        notes_or_gaps: 'Papers VII-IX remain downstream of BaseCore by explicit release policy.'
      },
      {
        id: 'paper8.first_person_indexed_subjectivity_gate',
        source_document: { release_pdf: byId['paper8.first_person_subjectivity'].release_pdf, preferred_source_path: byId['paper8.first_person_subjectivity'].preferred_source_path, anchor: 'Sections 3-16' },
        claim_text_summary: 'Paper VIII defines a seven-coordinate first-person indexed subjectivity state, gate, rival family, intervention burden, and runtime-facing artifact grammar.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_state_gate_and_burden_architecture_in_release_text',
        evidence_status: 'internal_formal_derivation_with_runtime_facing_discipline_only',
        external_validation_dependency: 'required_for_any_claim_that_current_systems_instantiates_first_person_indexed_subjectivity',
        system_dependency: 'possible_qicn_system_subjectivity_runtime_interface',
        non_claim_boundary: 'Paper VIII does not prove phenomenality, human equivalence, or external validation.',
        notes_or_gaps: 'It closes indexed subjectivity, not phenomenal bridge admissibility.'
      },
      {
        id: 'paper9.bridge_burden_architecture',
        source_document: { release_pdf: byId['paper9.phenomenal_bridge_organization'].release_pdf, preferred_source_path: byId['paper9.phenomenal_bridge_organization'].preferred_source_path, anchor: 'Abstract; Sections 1-7' },
        claim_text_summary: 'Paper IX defines a formal bridge-burden architecture above Paper VIII by introducing typed bridge predicates, bridge rivals, interventions, artifacts, gates, and explicit non-claims.',
        claim_class: 'formal_statement',
        formalization_status: 'explicit_bridge_program_and_burden_stack_in_release_text',
        evidence_status: 'internal_formal_bridge_architecture_only',
        external_validation_dependency: 'required_for_any_claim_that_phenomenal_predicates_are_empirically_licensed_or_externally_validated',
        system_dependency: 'possible_bridge_runtime_scaffolding_only',
        non_claim_boundary: 'Paper IX does not prove phenomenality simpliciter, human equivalence, metaphysical subjecthood, or external validation.',
        notes_or_gaps: 'Included publicly only after minor revision and audit; it remains downstream, not part of BaseCore.'
      },
      {
        id: 'paper9.conditional_bridge_admissibility_only',
        source_document: { release_pdf: byId['paper9.phenomenal_bridge_organization'].release_pdf, preferred_source_path: byId['paper9.phenomenal_bridge_organization'].preferred_source_path, anchor: 'Sections 8-16' },
        claim_text_summary: 'Paper IX makes its strongest bridge reading conditional on upstream burdens, positive comparator and intervention margins, artifact compliance, and governance discipline.',
        claim_class: 'falsifiable_hypothesis',
        formalization_status: 'explicit_conditional_admissibility_grammar_in_release_text',
        evidence_status: 'formal_burden_stack_defined_runtime_closure_not_achieved',
        external_validation_dependency: 'required_for_any_claim_that_a_current_system_is_bridge_admissible_or_phenomenally_confirmed',
        system_dependency: 'bridge_runtime_stack_beyond_current_provisional_surfaces',
        non_claim_boundary: 'Provisional bridge surfaces do not authorize admissibility, phenomenality, or public bridge confirmation.',
        notes_or_gaps: 'BPF-2 through BPF-6 remain open burdens.'
      },
      {
        id: 'governance.basecore_active_boundary',
        source_document: { markdown_path: 'docs/CANON_SOURCE_OF_TRUTH.md', anchor: 'Authority state' },
        claim_text_summary: 'The release fixes BaseCore as the active mathematical base layer, preserves canonical_core_legacy as legacy, and keeps Papers I-IX downstream according to package role.',
        claim_class: 'operational_definition',
        formalization_status: 'release_governance_boundary',
        evidence_status: 'release_governance_only',
        external_validation_dependency: 'not_applicable_policy_only',
        system_dependency: 'none',
        non_claim_boundary: 'This is a packaging and reading rule, not a theorem.',
        notes_or_gaps: 'The boundary prevents silent re-promotion of the old Canonical Core package.'
      }
    ],
    non_claim_boundary: 'The registry classifies release content and claim boundaries. It does not authorize claims beyond the corpus non-claim limits.'
  };
}

function zipCorpus() {
  const corpusDir = path.join(root, 'corpus', 'pdf_release');
  const bundleRoot = path.join(corpusDir, '_bundle_payload');
  fs.rmSync(bundleRoot, { recursive: true, force: true });
  ensureDir(path.join(bundleRoot, 'PDF_BUNDLE', 'pdfs'));
  const pdfDir = path.join(corpusDir, 'pdfs');
  for (const file of fs.readdirSync(pdfDir)) {
    fs.copyFileSync(path.join(pdfDir, file), path.join(bundleRoot, 'PDF_BUNDLE', 'pdfs', file));
  }
  const zipPath = path.join(corpusDir, 'pdf_corpus.zip');
  const psCommand = [
    `$zip=${psQuote(zipPath)}`,
    `if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }`,
    `Compress-Archive -Path ${psQuote(path.join(bundleRoot, '*'))} -DestinationPath $zip -Force`
  ].join('; ');
  execFileSync('powershell.exe', ['-NoProfile', '-Command', psCommand], { cwd: root, stdio: 'inherit' });
  const zipHash = crypto.createHash('sha256').update(fs.readFileSync(zipPath)).digest('hex');
  fs.writeFileSync(path.join(corpusDir, 'pdf_corpus.zip.sha256.txt'), `${zipHash}  pdf_corpus.zip\n`, 'utf8');
  const manifestHash = sha256File('corpus/pdf_release/manifest.json');
  fs.writeFileSync(path.join(corpusDir, 'manifest.sha256.txt'), `${manifestHash}  manifest.json\n`, 'utf8');
  fs.rmSync(bundleRoot, { recursive: true, force: true });
  return { zipHash, manifestHash };
}

function main() {
  const corpusManifest = readJson('corpus/pdf_release/manifest.json');
  const index = readJson('release/INDEX_PDFS.json');
  const freeze = readJson('release/release_freeze_manifest.json');
  normalizeExistingIndexPaths(index);
  rewriteExternalPathReferences(corpusManifest, index);

  const baseEntry = buildNewPdfEntry(ACTIVE_BASE);
  const legacyEntry = buildNewPdfEntry(LEGACY_PACKAGE);
  const downstreamEntries = DOWNSTREAM_PACKAGES.map(buildNewPdfEntry);

  ensurePdfInCorpus(baseEntry);
  ensurePdfInCorpus(legacyEntry);
  ensurePdfInCorpus(downstreamEntries.find((entry) => entry.doc_family_id === 'paper9.phenomenal_bridge_organization'));

  upsertManifestEntry(corpusManifest, baseEntry, 'PASS');
  upsertManifestEntry(corpusManifest, legacyEntry, 'PASS');
  upsertManifestEntry(
    corpusManifest,
    downstreamEntries.find((entry) => entry.doc_family_id === 'paper9.phenomenal_bridge_organization'),
    'PASS'
  );

  upsertIndexEntry(index, baseEntry, ACTIVE_BASE.source_status);
  upsertIndexEntry(index, legacyEntry, LEGACY_PACKAGE.source_status);
  upsertIndexEntry(
    index,
    downstreamEntries.find((entry) => entry.doc_family_id === 'paper9.phenomenal_bridge_organization'),
    'SOURCE_OK'
  );

  corpusManifest.generated_at = new Date().toISOString();
  index.generated_at = new Date().toISOString();
  writeJson('corpus/pdf_release/manifest.json', corpusManifest);
  writeJson('release/INDEX_PDFS.json', index);

  const baseDoc = buildDocFromIndex(findIndexByManifestRelPath(index, ACTIVE_BASE.source_tex), {
    doc_family_id: ACTIVE_BASE.doc_family_id,
    title: ACTIVE_BASE.title,
    source_path: ACTIVE_BASE.source_tex,
    source_status: ACTIVE_BASE.source_status,
    role: ACTIVE_BASE.role,
    package_root: ACTIVE_BASE.package_root
  });

  const legacyDoc = buildDocFromIndex(findIndexByManifestRelPath(index, LEGACY_PACKAGE.source_tex), {
    doc_family_id: LEGACY_PACKAGE.doc_family_id,
    title: LEGACY_PACKAGE.title,
    source_path: LEGACY_PACKAGE.source_tex,
    source_status: LEGACY_PACKAGE.source_status,
    role: LEGACY_PACKAGE.role,
    package_root: LEGACY_PACKAGE.package_root
  });

  const downstreamDocs = DOWNSTREAM_PACKAGES.map((spec) =>
    buildDocFromIndex(findIndexByManifestRelPath(index, spec.source_tex), {
      doc_family_id: spec.doc_family_id,
      title: spec.title,
      source_path: spec.source_tex,
      source_status: spec.source_status,
      role: 'supporting_downstream_package'
    })
  );

  const preservedDocs = PRESERVED_VARIANTS.map((spec) =>
    buildDocFromIndex(findIndexByManifestRelPath(index, spec.lookup_manifest_rel_path), {
      doc_family_id: spec.doc_family_id,
      title: spec.doc_family_id,
      source_path: spec.source_path,
      source_status: 'PRESERVED_VARIANT',
      role: spec.role
    })
  );

  const canonManifest = {
    artifact_role: 'canonical_boundary_manifest',
    schema_version: '2.0.0',
    release_id: 'release_repo_qicn_2026-03-01',
    canonical_pdf_count: index.count,
    source_of_truth_refs: {
      active_base_package: 'rigid-identity-framework/basecore/',
      legacy_package: 'rigid-identity-framework/canonical_core_legacy/',
      pdf_bundle: 'corpus/pdf_release/pdf_corpus.zip',
      pdf_bundle_sha256: 'corpus/pdf_release/pdf_corpus.zip.sha256.txt',
      pdf_manifest: 'corpus/pdf_release/manifest.json',
      pdf_manifest_sha256: 'corpus/pdf_release/manifest.sha256.txt',
      canon_map: 'release/CANON_MAP.v1.json',
      pdf_index: 'release/INDEX_PDFS.json',
      freeze_manifest: 'release/release_freeze_manifest.json'
    },
    preferred_lineage_rules: [
      { path_prefix: 'rigid-identity-framework/basecore/', classification: 'active_base_layer' },
      { path_prefix: 'rigid-identity-framework/canonical_core_legacy/', classification: 'legacy_package' },
      { path_prefix: 'rigid-identity-framework/paper', classification: 'public_downstream_package' },
      { path_prefix: 'rigid-identity-paper/', classification: 'supporting_parallel_lineage' },
      { path_prefix: 'phenomenological-regimes-paper/', classification: 'supporting_formal_lineage' },
      { path_prefix: 'phenomenological-instability-paper/', classification: 'supporting_formal_lineage' },
      { path_prefix: 'NotebookLM/', classification: 'mirror_or_reconstructed_lineage' },
      { path_prefix: 'QICN-SYSTEM/artifacts/paper_exports/', classification: 'operational_annex' }
    ],
    active_base_layer: baseDoc,
    primary_formal_spine: [baseDoc],
    public_downstream_packages: downstreamDocs,
    supporting_lineages_included_in_freeze: [...downstreamDocs, legacyDoc, ...preservedDocs],
    operational_annexes_included_in_freeze: OPERATIONAL_ANNEXES,
    release_governance_documents: GOV_DOCS,
    live_public_trunk_scope: {
      branch: 'main',
      sole_public_authority: true,
      active_base_layer: 'basecore.active',
      downstream_public_packages: downstreamDocs.map((doc) => doc.doc_family_id),
      preserved_legacy_packages: ['canonical_core.legacy_package'],
      preserved_variant_families: ['historical_frozen_core_pdf', 'parallel_lineages', 'mirror_lineages', 'reconstructed_lineages']
    },
    non_claim_boundary:
      'The manifest classifies package membership, lineage role, and release boundaries only. It does not imply empirical validation, human equivalence, or bridge closure.'
  };

  const canonMap = {
    artifact_role: 'canonical_map',
    schema_version: '2.0.0',
    generated_at: new Date().toISOString(),
    release_id: 'release_repo_qicn_2026-03-01',
    active_base_layer: baseDoc,
    downstream_public_packages: downstreamDocs,
    preserved_legacy_and_lineage_material: [legacyDoc, ...preservedDocs],
    operational_annexes: OPERATIONAL_ANNEXES,
    variant_classification_counts: {
      PRIMARY_ACTIVE: 1,
      DOWNSTREAM: downstreamDocs.length,
      LEGACY: 1,
      MIRROR_OR_RECONSTRUCTED: preservedDocs.filter((doc) => String(doc.role).includes('lineage')).length,
      HISTORICAL_FROZEN: preservedDocs.filter((doc) => doc.role === 'historical_frozen_variant').length,
      OPERATIONAL_ANNEX: OPERATIONAL_ANNEXES.length
    },
    non_claim_boundary:
      'This map locates editorial roles. It does not upgrade any supporting, legacy, or mirror document into the active mathematical base.'
  };

  const claimRegistry = buildClaimRegistry(baseDoc, downstreamDocs);

  const layerBoundaries = {
    artifact_role: 'layer_boundaries',
    schema_version: '2.0.0',
    layers: [
      { id: 'base_mathematical_source', includes: ['BaseCore source tree', 'typed operators', 'theorems', 'claim-boundary ledgers'], excludes: ['runtime validation', 'human comparators', 'phenomenality claims'], valid_assertions: ['formal derivation inside stated assumptions'], prohibited_inferences: ['basecore_in_release_implies_runtime_instantiation', 'basecore_implies_external_validation'] },
      { id: 'downstream_formal_packages', includes: ['Papers I-IX', 'downstream theorem ownership', 'bridge burden architecture'], excludes: ['active base ownership', 'public empirical closure'], valid_assertions: ['downstream formal extension under explicit dependence'], prohibited_inferences: ['downstream_package_implies_base_ownership', 'paper9_implies_bridge_completion'] },
      { id: 'legacy_and_lineage_material', includes: ['canonical_core_legacy', 'historical frozen core PDFs', 'parallel lineages', 'NotebookLM mirrors'], excludes: ['active source-of-truth authority'], valid_assertions: ['archival provenance and editorial traceability only'], prohibited_inferences: ['legacy_or_mirror_material_implies_active_source_of_truth'] },
      { id: 'implementation_system', includes: ['QICN-SYSTEM', 'runtime artifacts', 'support labels', 'surface policy'], excludes: ['theorem closure', 'ontology', 'external validation'], valid_assertions: ['operational support and governance only'], prohibited_inferences: ['implementation_exists_implies_theory_validated', 'runtime_metrics_imply_phenomenality'] },
      { id: 'interpretation_and_language', includes: ['reading rules', 'non-claims', 'controlled terminology', 'bridge caution'], excludes: ['theorem proofs', 'public validation'], valid_assertions: ['disciplined restatement of what the formal layers do and do not license'], prohibited_inferences: ['interpretation_implies_closed_theorem', 'bridge_language_implies_bridge_support'] },
      { id: 'external_validation', includes: ['independent replication', 'external empirical adjudication', 'independent methodological review'], excludes: ['local release bundles', 'local runtime exports', 'governance docs'], valid_assertions: ['none are granted by this release reconstruction alone'], prohibited_inferences: ['release_sync_implies_external_validation'] }
    ],
    allowed_bridges: ['base_to_downstream_via_explicit_dependency', 'corpus_to_system_only_via_explicit_interface_docs', 'system_to_internal_evidence_only_via_policy_governed_artifacts'],
    blocked_automatic_bridges: ['legacy_to_active_base', 'mirror_to_source_of_truth', 'system_to_phenomenality', 'internal_evidence_to_public_claim_closure'],
    non_claim_boundary: 'Layer separation is a governance device. It does not settle ontology, empirical truth, or public validation.'
  };

  const systemInterface = {
    artifact_role: 'theory_system_interface_boundary',
    schema_version: '2.0.0',
    external_repository: { name: 'QICN-SYSTEM', repository_reference: 'QICN-SYSTEM', status: 'separate_repository' },
    interfaces: [
      { id: 'protocol.qicn_v45', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper4.qicn_v45_protocol').release_pdf, system_role: 'operational reflection of admissibility, baselines, bounded-support protocol, and invalidation rules', interface_type: 'operational_protocol_only', non_inference: 'Protocol alignment does not validate BaseCore or any phenomenological theorem.' },
      { id: 'criterion.operational_consciousness', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper5.operational_consciousness_criterion').release_pdf, system_role: 'runtime-facing invariant diagnostics and admissible support burdens', interface_type: 'operational_reflection_only', non_inference: 'Operational reflection of the criterion does not certify human consciousness or present runtime membership.' },
      { id: 'prediction.failure_discipline', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper6.predictions_and_failure_modes').release_pdf, system_role: 'prediction-family diagnostics, downgrade logic, and internal support-status readouts', interface_type: 'operational_reflection_with_internal_status_boundary', non_inference: 'Internal support status does not imply external validation or final theory confirmation.' },
      { id: 'classification.life_subjecthood', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper7.operational_life_subjecthood').release_pdf, system_role: 'descriptor and test-family alignment for operational life, structural class, and subjecthood diagnostics', interface_type: 'runtime_facing_descriptor_alignment_only', non_inference: 'Descriptor families do not certify that current systems are operational subjects.' },
      { id: 'subjectivity.first_person_indexed_layer', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper8.first_person_subjectivity').release_pdf, system_role: 'runtime-facing subjectivity diagnostics over self-index, ownership, continuity, perspective, valuation, intervention, and reducibility', interface_type: 'runtime_facing_subjectivity_diagnostic_alignment_only', non_inference: 'Paper VIII runtime alignment does not certify phenomenality, human equivalence, or external validation.' },
      { id: 'bridge.phenomenal_program', corpus_source: downstreamDocs.find((doc) => doc.doc_family_id === 'paper9.phenomenal_bridge_organization').release_pdf, system_role: 'bridge predicate registries, provisional bridge surfaces, and burden-stack alignment only', interface_type: 'bridge_program_alignment_only', non_inference: 'Provisional bridge surfaces do not certify bridge admissibility, phenomenality, or public claim closure.' },
      { id: 'annex.roeo_export', corpus_source: OPERATIONAL_ANNEXES.map((entry) => entry.release_pdf), system_role: 'operational export evidence and ROEO surface outputs', interface_type: 'operational_annex_only', non_inference: 'ROEO exports do not imply causal or ontological proof.' },
      { id: 'governance.non_claim_alignment', corpus_source: ['release/GLOSSARY_CANONICAL.v1.md', 'release/METHODS_GOVERNANCE_HUB.v1.md', 'release/STYLE_DISCLAIMER_POLICY.v1.md'], system_role: 'alignment of support labels, output policies, and controlled statements', interface_type: 'semantic_governance_alignment_only', non_inference: 'Governance alignment does not convert runtime support into theory confirmation.' }
    ],
    prohibited_inferences: ['runtime_metrics_imply_basecore_theorem_validity', 'support_labels_imply_framework_confirmation', 'bridge_surface_reports_imply_bridge_admissibility', 'formal_theorem_implies_current_runtime_instantiation', 'release_alignment_implies_external_validation'],
    non_claim_boundary: 'The interface is explicit and limited. Public release alignment does not authorize automatic runtime closure, bridge confirmation, or phenomenality claims.'
  };

  freeze.non_claim_boundary = 'Historical freeze evidence remains provenance only. The live public trunk authority is main, the active base layer is BaseCore, and public alignment still does not imply external validation or phenomenality closure.';
  freeze.live_public_trunk_authority = {
    branch: 'main',
    sole_public_authority: true,
    trunk_canonicalization_date: new Date().toISOString().slice(0, 10),
    active_base_layer: 'BaseCore',
    public_downstream_packages: downstreamDocs.map((doc) => doc.title),
    preserved_legacy_packages: ['canonical_core_legacy'],
    explicit_public_exclusions: ['release/_non_canonical/', 'QICN-SYSTEM runtime outputs as theory source']
  };

  writeJson('release/canon_manifest.v1.json', canonManifest);
  writeJson('release/CANON_MAP.v1.json', canonMap);
  writeJson('release/claim_registry.v1.json', claimRegistry);
  writeJson('release/layer_boundaries.v1.json', layerBoundaries);
  writeJson('release/system_interface_boundary.v1.json', systemInterface);
  writeJson('release/release_freeze_manifest.json', freeze);

  writeText('README.md', `# QICN Release Package

Audit-first public release package with active BaseCore source material, immutable PDF corpus artifacts, and explicit boundary metadata.

## Quick verification

\`\`\`bash
node scripts/verify-canonical-integrity.cjs
node scripts/verify-claim-registry.cjs
node scripts/verify-canonical-release.cjs
\`\`\`

## Current public release shape

- active mathematical base layer: BaseCore
- public downstream packages: Papers I-IX
- preserved legacy package: canonical_core_legacy
- preserved supporting, mirror, and historical variants remain separately classified under \`release/canon_manifest.v1.json\`

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

- no blind collapse of legacy or mirror material into the active base
- no external validation claims
- no automatic bridge from internal runtime work to public theory closure
- no phenomenality, human-equivalence, or adjudication claims from packaging alone`);

  writeText('RELEASE_NOTES.md', `# RELEASE_NOTES

## Release ID

- release_repo_qicn_2026-03-01
- public source-of-truth repo/branch: \`QICN-RELEASE/main\`

## Public release shape

- active base layer: BaseCore
- downstream public packages: Papers I-IX
- legacy package: canonical_core_legacy
- preserved variant families: historical frozen core PDF, supporting parallel lineages, NotebookLM mirrors, and operational annexes

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
- BaseCore is the active mathematical source package in this release
- canonical_core_legacy is preserved as archival comparison material only

## Non-claim boundary

This release package is an editorial, documentary, and technical synchronization artifact. It does not imply external validation, runtime closure, bridge admissibility, or phenomenality.`);

  writeText('CHANGELOG.md', `# CHANGELOG

## [2026-04-22] - BaseCore release-surface reconstruction

- Integrated \`rigid-identity-framework/basecore/\` into the public release as the active mathematical base layer.
- Integrated \`rigid-identity-framework/canonical_core_legacy/\` as an explicit historical package distinct from the active base.
- Added \`paper9_phenomenal_bridge_organization\` to the public downstream package set after a minor-revision audit.
- Rewrote the normative release surfaces so the public spine is no longer described as the old Canonical Core.
- Reclassified legacy, mirror, reconstructed, and historical PDF variants instead of deleting them.
- Regenerated corpus manifests, canon maps, claim registry, PDF index, and release bundle metadata around the new active-base boundary.

## [release-2026-03-01] - historical freeze provenance

- Integrity baseline validated from \`corpus/pdf_release/pdf_corpus.zip\` and \`corpus/pdf_release/manifest.json\` against official SHA256 sidecars.
- Freeze evidence generated under \`release/FREEZE_AUDIT_v1\`.
- Historical package state retained as provenance only.`);

  writeText('docs/CANON_SOURCE_OF_TRUTH.md', `# CANON_SOURCE_OF_TRUTH

## Purpose

This document fixes the live public source-of-truth boundary for \`QICN-RELEASE\`.

## Authority state

- Public source-of-truth repository: \`QICN-RELEASE\`
- Sole live public branch authority: \`main\`
- Historical freeze tag retained as provenance: \`release-2026-03-01\`
- Historical explicit canonical tag retained as provenance: \`canonical-freeze-2026-03-01\`
- Active mathematical base layer on trunk: \`rigid-identity-framework/basecore/\`
- Preserved legacy package on trunk: \`rigid-identity-framework/canonical_core_legacy/\`
- Public downstream package set on trunk: Papers I-IX

## Source-of-truth files

1. \`rigid-identity-framework/basecore/\`
2. \`corpus/pdf_release/pdf_corpus.zip\`
3. \`corpus/pdf_release/pdf_corpus.zip.sha256.txt\`
4. \`corpus/pdf_release/manifest.json\`
5. \`corpus/pdf_release/manifest.sha256.txt\`
6. \`release/CANON_MAP.v1.json\`
7. \`release/INDEX_PDFS.json\`
8. \`release/release_freeze_manifest.json\`
9. \`release/canon_manifest.v1.json\`
10. \`release/claim_registry.v1.json\`
11. \`release/layer_boundaries.v1.json\`
12. \`release/system_interface_boundary.v1.json\`

## What counts as current public canon

- the BaseCore source package and its compiled PDF
- the immutable PDF corpus and its index/manifests as currently published on \`main\`
- the downstream papers explicitly listed in \`release/canon_manifest.v1.json\`
- the release governance and boundary documents that constrain interpretation

## What does not count as current public canon

- historical audit snapshots whose scope pre-dates the current trunk alignment
- mirror or reconstructed variants as active source-of-truth
- \`release/_non_canonical/\`
- \`QICN-SYSTEM\` runtime outputs as theorem-bearing sources

## Non-claim boundary

Public canonicalization of trunk improves traceability and public alignment only. It does not constitute external validation, theory confirmation, bridge admissibility, human equivalence, or metaphysical closure.`);

  writeText('docs/CANONICAL_RELEASE_NOTES.md', `# CANONICAL_RELEASE_NOTES

## Purpose

This note records the current live release-canonicalization state of \`QICN-RELEASE/main\`.

## Current public state

- \`main\` is the sole live public source-of-truth branch
- BaseCore is the active mathematical base layer
- Papers I-IX are public downstream packages
- canonical_core_legacy is preserved as historical lineage only
- supporting lineages, mirrors, and operational annexes remain classified separately and do not collapse into the active base

## What changed in this reconstruction

- the active spine was renamed and re-grounded from the old Canonical Core surface to BaseCore
- the release repo now contains the active BaseCore source package, not just its PDF consequences
- Paper IX was audited, minimally revised, and included as a downstream public package
- legacy and mirror variants were preserved with explicit role tags rather than silently coexisting as if equally current

## What this update does not add

- no new theorem claims beyond the underlying packages
- no external validation
- no runtime-to-theory closure
- no bridge confirmation
- no phenomenality or human-equivalence claim

## Non-claim boundary

Canonical release alignment is packaging and governance work. It is not publication closure, empirical adjudication, or proof that current systems satisfy the released formalisms.`);

  writeText('docs/CANON_MANIFEST.md', `# CANON_MANIFEST

This document summarizes what belongs to the live public release package.

## Canonical package scope

- Canonical PDF clusters in the release package: \`${index.count}\`
- Active mathematical base layer: BaseCore
- Public downstream packages: Papers I-IX
- Preserved legacy package: canonical_core_legacy
- Supporting and mirror lineages remain separately classified
- Primary source-of-truth inventory: \`release/canon_manifest.v1.json\`

## Active base layer

- \`${baseDoc.release_pdf}\`
  - preferred source: \`${baseDoc.preferred_source_path}\`
  - package root: \`${ACTIVE_BASE.package_root}\`
  - role: \`formal_source_of_truth\`
  - status: \`${baseDoc.source_status}\`

## Public downstream packages

${renderList(downstreamDocs, (doc) => `- \`${doc.release_pdf}\`\n  - preferred source: \`${doc.preferred_source_path}\`\n  - role: \`supporting_downstream_package\`\n  - status: \`${doc.source_status}\``)}

## Preserved legacy package

- \`${legacyDoc.release_pdf}\`
  - preferred source: \`${legacyDoc.preferred_source_path}\`
  - package root: \`${LEGACY_PACKAGE.package_root}\`
  - role: \`${legacyDoc.role}\`
  - status: \`${legacyDoc.source_status}\`

## Preserved lineages, mirrors, and historical variants

${renderList(preservedDocs, (doc) => `- \`${doc.release_pdf}\`\n  - source path: \`${doc.preferred_source_path}\`\n  - role: \`${doc.role}\``)}

## Operational annexes

${renderList(OPERATIONAL_ANNEXES, (doc) => `- \`${doc.release_pdf}\`\n  - source path: \`${doc.source_path}\`\n  - role: \`${doc.role}\``)}

## Out of canon

- \`release/_non_canonical/\`
- runtime outputs from \`QICN-SYSTEM\` as theorem-bearing sources

## Non-claim boundary

Inclusion in the manifest classifies package membership and lineage role only. It does not imply external validation, public claim closure, or bridge confirmation.`);

  writeText('docs/CLAIM_REGISTRY.md', `# CLAIM_REGISTRY

The authoritative machine-readable registry is \`release/claim_registry.v1.json\`.

## Active claim-level subsets

- BaseCore
- Papers I-IX
- release governance boundaries

## Registry reading rule

The registry classifies what is present in the public release and marks where closure is absent. It does not authorize stronger claims than the underlying packages support.

## Boundary reminders

- BaseCore is the active mathematical base layer.
- Papers I-IX are downstream public packages, not replacements for the base.
- canonical_core_legacy is preserved as history, not as the active spine.
- Paper IX remains bridge-facing and burden-bound, not phenomenality-confirming.

## Non-claim boundary

The registry is a classification layer, not a validation layer, not a runtime-certification layer, and not a proof of human equivalence, phenomenality, or external adjudication.`);

  writeText('docs/LAYER_BOUNDARIES.md', `# LAYER_BOUNDARIES

This document separates the release into layers that must not be collapsed.

## 1. Active base layer

- Includes:
  - \`BaseCore\`
  - typed dynamics, rigidity, inverse-limit identity, operational-criterion grammar
- Does not include:
  - bridge confirmation
  - runtime validation
  - human comparators
- Valid assertions:
  - internal formal derivation inside stated assumptions
- Prohibited automatic inferences:
  - BaseCore in release -> runtime instantiation
  - BaseCore -> external validation

## 2. Downstream formal packages

- Includes:
  - Papers I-IX
  - downstream formal extensions, bridges, protocols, and burden stacks
- Does not include:
  - active base ownership
  - public empirical closure
- Valid assertions:
  - downstream formal extension under explicit dependence
- Prohibited automatic inferences:
  - downstream package -> active base layer
  - Paper IX -> bridge completion

## 3. Legacy and lineage material

- Includes:
  - canonical_core_legacy
  - historical frozen core PDFs
  - parallel lineages
  - NotebookLM mirrors and reconstructions
- Does not include:
  - active source-of-truth authority
- Valid assertions:
  - archival provenance and editorial traceability only
- Prohibited automatic inferences:
  - legacy or mirror -> current spine

## 4. Implementation / system

- Includes:
  - \`QICN-SYSTEM\`
  - runtime artifacts
  - support labels
  - export policies
- Does not include:
  - theorem closure
  - ontology
  - external validation
- Valid assertions:
  - operational support and governance only
- Prohibited automatic inferences:
  - implementation exists -> theory validated
  - runtime metrics -> phenomenological theorem confirmed

## 5. Interpretation / language

- Includes:
  - explanatory readings
  - controlled terminology
  - non-claim language policy
- Does not include:
  - theorem proofs
  - public validation
- Valid assertions:
  - disciplined restatement of what the formal layers may suggest
- Prohibited automatic inferences:
  - interpretation -> closed theorem
  - bridge language -> bridge support

## 6. External validation

- Includes:
  - independent replication
  - independent methodological review
  - external empirical confirmation
- Does not include:
  - local release bundles
  - local smoke suites
  - governance docs
- Valid assertions:
  - none are granted by this reconstruction alone
- Prohibited automatic inferences:
  - release sync -> external validation

## Bridge rules

- Allowed bridge: base layer -> downstream packages only through explicit dependency.
- Allowed bridge: corpus -> system only through explicit interface docs.
- Allowed bridge: implementation -> internal evidence only through policy-governed artifacts.
- Disallowed bridge: legacy -> active base.
- Disallowed bridge: mirror lineage -> source-of-truth.
- Disallowed bridge: internal evidence -> public claim closure.`);

  writeText('docs/THEORY_SYSTEM_INTERFACE.md', `# THEORY_SYSTEM_INTERFACE

This document fixes the explicit boundary between \`QICN-RELEASE\` and \`QICN-SYSTEM\`.

## Public corpus areas with an operational counterpart

- Paper IV
  - operational reflection: admissibility, baseline handling, comparator discipline, invalidation rules
- Paper V
  - operational reflection: invariant diagnostics, criterion-facing structure, rupture semantics, admissible support burdens
- Paper VI
  - operational reflection: prediction family diagnostics, downgrade logic, negative controls, internal support-status surfaces
- Paper VII
  - operational reflection: descriptor families and runtime-facing diagnostics for operational life, structural class, and subjecthood
- Paper VIII
  - operational reflection: self-index, ownership, continuity, perspective, valuation, intervention, reducibility, and internal gate diagnostics
- Paper IX
  - operational reflection: bridge predicate registries, provisional bridge surface modules, burden-stack alignment, and non-claim grammar only
- ROEO annexes and governance docs
  - operational reflection: export surfaces, terminology policy, controlled statements, surface policy

## What the system does not close

- BaseCore as real-world theorem confirmation
- external validation of Papers IV-IX
- bridge admissibility
- human consciousness, human subjectivity, or metaphysical subjecthood
- automatic promotion of runtime subjectivity or bridge surfaces into claim-facing release status

## What must not be inferred

- runtime metrics -> public theorem confirmation
- internal support labels -> external validation
- descriptor families -> current system is an operational subject
- provisional bridge surfaces -> phenomenal bridge support
- public release alignment -> phenomenality, human equivalence, or external adjudication

## Interface policy

- the interface remains explicit, limited, and one-way by default
- every bridge from corpus to system remains tagged as operational or governance-only unless external validation exists
- Paper IX may guide bridge-facing runtime architecture as public corpus material, but every runtime-facing bridge surface remains provisional and non-confirmatory`);

  writeText('release/RELEASE_MAP.md', `# RELEASE_MAP

## What is included

- active base package: \`rigid-identity-framework/basecore/\`
- legacy package: \`rigid-identity-framework/canonical_core_legacy/\`
- corpus PDF bundle: \`corpus/pdf_release/pdf_corpus.zip\`
- PDF manifest: \`corpus/pdf_release/manifest.json\`
- canon map: \`release/CANON_MAP.v1.json\`
- PDF index: \`release/INDEX_PDFS.json\`

## Counts

- total canonical clusters: ${index.count}
- active base packages: 1
- public downstream packages: ${downstreamDocs.length}
- preserved legacy packages: 1
- operational annex count: ${OPERATIONAL_ANNEXES.length}

## Public release shape

- BaseCore is the preferred public mathematical base layer
- Papers I-IX are the public downstream package set
- canonical_core_legacy is preserved as archival lineage only
- supporting and mirror variants remain visible but explicitly classified`);

  writeText('release/BLUEPRINT_EDITORIAL.md', `# BLUEPRINT_EDITORIAL

## Recommended public reading order

- BaseCore
- Paper I
- Paper II
- Paper III
- Paper IV
- Paper V
- Paper VI
- Paper VII
- Paper VIII
- Paper IX

## Editorial rules

- one active mathematical base layer: BaseCore
- downstream papers remain downstream, even when public
- canonical_core_legacy remains preserved but not active
- mirror and reconstructed lineages remain traceability material only
- bridge-facing materials must retain explicit non-claims`);

  writeText('release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md', `# EDITORIAL_BLUEPRINT_ACTIONS.v1

## Active base layer

- BaseCore is the only active mathematical source package in the release.

## Downstream public packages

${renderList(downstreamDocs, (doc) => `- ${doc.doc_family_id} -> ${doc.preferred_source_path}`)}

## Preserved lineage material

${renderList([legacyDoc, ...preservedDocs], (doc) => `- ${doc.doc_family_id} -> ${doc.preferred_source_path} (${doc.role})`)}

## Actions

- keep one active public base layer
- keep downstream packages visible but non-collapsed into the base
- keep legacy and mirror material explicitly tagged
- prevent runtime-facing wording from being misread as validation, bridge support, or phenomenality closure`);

  writeText('release/GLOSSARY_CANONICAL.v1.md', `# GLOSSARY_CANONICAL.v1

## Scope

Canonical terminology and reading rules for the live public release trunk.

## Core package terms

- **BaseCore**: the active mathematical base layer and source-of-truth package
- **canonical_core_legacy**: preserved historical package, not the active base
- **downstream public package**: a released package that depends on BaseCore or earlier packages without becoming the base
- **mirror / reconstructed lineage**: preserved non-primary material kept for genealogy, comparison, or audit traceability

## Canonical operational term policy

- preferred technical term for non-human runtime-facing readouts: **readout interno operacional**
- not allowed as public technical claims:
  - human qualia
  - phenomenality proven
  - bridge confirmed
  - the system feels
  - subjectivity achieved

## Boundary

Terminology policy constrains release reading only. It does not authorize runtime-to-theory escalation, bridge confirmation, or human-equivalence claims.`);

  writeText('release/METHODS_GOVERNANCE_HUB.v1.md', `# METHODS_GOVERNANCE_HUB.v1

## Purpose

Single release-level methods and governance hub for the live public trunk.

## Public scope covered by this hub

- BaseCore mathematical source package
- Papers IV-IX where operational, protocol, or bridge-facing burdens matter
- claim-boundary and non-claim governance

## Fixed reading rules

- internal support is not external validation
- runtime reflection is not theorem closure
- public release inclusion is not subjectivity closure
- provisional bridge surfaces are not bridge admissibility
- legacy and mirror preservation are not active-base authority`);

  writeText('release/TERM_MIGRATION_PLAN.v1.md', `# TERM_MIGRATION_PLAN.v1

## Scope

Editorial migration plan for keeping public-trunk language technical, operational, and non-inflated.

## Replacement rules

- replace references to the old active spine name with \`BaseCore\` when the text means the current active mathematical base
- preserve \`canonical\` where it refers to canonical maps, closures, models, or dependencies
- preserve \`canonical_core_legacy\` when the text means the historical package
- preserve historical names inside frozen artifacts without hand-editing those artifacts

## Explicit caution

This plan constrains public release wording only. It does not add claims, metrics, or validation.`);

  writeJson('release/CROSSPAPER_LINKMAP.v1.json', {
    artifact_role: 'crosspaper_linkmap',
    schema_version: '2.0.0',
    active_base_layer: 'basecore.active',
    downstream_dependencies: [
      { from: 'basecore.active', to: 'paper1.rigid_identity', type: 'formal_dependency' },
      { from: 'basecore.active', to: 'paper5.operational_consciousness_criterion', type: 'formal_dependency' },
      { from: 'basecore.active', to: 'paper6.predictions_and_failure_modes', type: 'formal_dependency' },
      { from: 'basecore.active', to: 'paper7.operational_life_subjecthood', type: 'formal_dependency' },
      { from: 'basecore.active', to: 'paper8.first_person_subjectivity', type: 'formal_dependency' },
      { from: 'paper8.first_person_subjectivity', to: 'paper9.phenomenal_bridge_organization', type: 'bridge_dependency' }
    ],
    non_claim_boundary:
      'This link map records declared dependency flow only. It does not collapse downstream ownership into BaseCore or convert bridge dependencies into closure.'
  });

  const zipInfo = zipCorpus();
  writeJson('release/SUMMARY.json', {
    generated_at: new Date().toISOString(),
    release_id: 'release_repo_qicn_2026-03-01',
    active_base_layer: baseDoc.release_pdf,
    downstream_public_package_count: downstreamDocs.length,
    preserved_legacy_package_count: 1,
    variant_cluster_count: preservedDocs.length,
    zip_sha256: zipInfo.zipHash,
    manifest_sha256: zipInfo.manifestHash
  });

  process.stdout.write(
    JSON.stringify(
      {
        status: 'PASS',
        active_base_layer: baseDoc.release_pdf,
        downstream_public_package_count: downstreamDocs.length,
        canonical_pdf_count: index.count,
        zip_sha256: zipInfo.zipHash,
        manifest_sha256: zipInfo.manifestHash
      },
      null,
      2
    ) + '\n'
  );
}

if (require.main === module) {
  main();
}

module.exports = { main };
