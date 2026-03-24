const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, '_build', 'canonical_hardening');
fs.mkdirSync(outDir, { recursive: true });

const exists = (rel) => fs.existsSync(path.join(root, rel));
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const sha256 = (rel) =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
const parseSidecar = (rel) =>
  String(fs.readFileSync(path.join(root, rel), 'utf8')).trim().split(/\s+/)[0].toLowerCase();

const requiredPaths = [
  'README.md',
  'RELEASE_NOTES.md',
  'CHANGELOG.md',
  'docs/CANON_SOURCE_OF_TRUTH.md',
  'docs/CANON_MANIFEST.md',
  'docs/CLAIM_REGISTRY.md',
  'docs/LAYER_BOUNDARIES.md',
  'docs/THEORY_SYSTEM_INTERFACE.md',
  'docs/CANONICAL_RELEASE_NOTES.md',
  'corpus/pdf_release/pdf_corpus.zip',
  'corpus/pdf_release/pdf_corpus.zip.sha256.txt',
  'corpus/pdf_release/manifest.json',
  'corpus/pdf_release/manifest.sha256.txt',
  'release/CANON_MAP.v1.json',
  'release/INDEX_PDFS.json',
  'release/FREEZE_AUDIT_v1/integrity_check.json',
  'release/FREEZE_AUDIT_v1/git_tags.txt',
  'release/FREEZE_AUDIT_v1/git_log_1.txt',
  'release/release_freeze_manifest.json',
  'release/canon_manifest.v1.json',
  'release/claim_registry.v1.json',
  'release/layer_boundaries.v1.json',
  'release/system_interface_boundary.v1.json',
  'release/_non_canonical/README.md'
];

const failures = [];
const warnings = [];
const provenanceNotes = [];

for (const rel of requiredPaths) {
  if (!exists(rel)) failures.push(`missing_required_path:${rel}`);
}

let result = {
  artifact_role: 'canonical_integrity_check',
  checked_at: new Date().toISOString(),
  status: 'FAIL',
  failures,
  warnings,
  provenance_notes: provenanceNotes
};

if (failures.length === 0) {
  const freeze = readJson('release/release_freeze_manifest.json');
  const canon = readJson('release/canon_manifest.v1.json');
  const registry = readJson('release/claim_registry.v1.json');
  const boundaries = readJson('release/layer_boundaries.v1.json');
  const iface = readJson('release/system_interface_boundary.v1.json');
  const index = readJson('release/INDEX_PDFS.json');
  const tagAudit = fs.readFileSync(path.join(root, 'release', 'FREEZE_AUDIT_v1', 'git_tags.txt'), 'utf8');
  const logAudit = fs.readFileSync(path.join(root, 'release', 'FREEZE_AUDIT_v1', 'git_log_1.txt'), 'utf8');

  const zipHash = sha256('corpus/pdf_release/pdf_corpus.zip');
  const zipExpected = parseSidecar('corpus/pdf_release/pdf_corpus.zip.sha256.txt');
  const manifestHash = sha256('corpus/pdf_release/manifest.json');
  const manifestExpected = parseSidecar('corpus/pdf_release/manifest.sha256.txt');

  if (zipHash !== zipExpected) failures.push('zip_sha256_mismatch');
  if (manifestHash !== manifestExpected) failures.push('manifest_sha256_mismatch');
  if (canon.canonical_pdf_count !== index.count) failures.push('canonical_pdf_count_mismatch');
  if (!Array.isArray(boundaries.layers) || boundaries.layers.length < 6) {
    failures.push('layer_boundaries_incomplete');
  }
  if (!Array.isArray(iface.interfaces) || iface.interfaces.length < 3) {
    failures.push('system_interface_incomplete');
  }
  if (!Array.isArray(registry.entries) || registry.entries.length < 15) {
    failures.push('claim_registry_too_small_for_hardened_core');
  }
  if (!freeze.current_non_canonical_separation || freeze.current_non_canonical_separation.physically_separated !== true) {
    failures.push('non_canonical_material_not_physically_separated');
  }

  for (const doc of canon.primary_formal_spine) {
    if (!exists(doc.release_pdf)) failures.push(`missing_primary_pdf:${doc.release_pdf}`);
  }
  for (const doc of canon.supporting_lineages_included_in_freeze) {
    if (!exists(doc.release_pdf)) failures.push(`missing_supporting_pdf:${doc.release_pdf}`);
  }
  for (const doc of canon.operational_annexes_included_in_freeze) {
    if (!exists(doc.release_pdf)) failures.push(`missing_annex_pdf:${doc.release_pdf}`);
  }
  for (const rel of canon.release_governance_documents) {
    if (!exists(rel)) failures.push(`missing_governance_doc:${rel}`);
  }

  if (!tagAudit.includes(freeze.freeze_reference.local_tag)) {
    failures.push('freeze_tag_not_present_in_audit_snapshot');
  }
  if (!logAudit.includes(freeze.freeze_reference.freeze_audit_snapshot_commit)) {
    failures.push('freeze_audit_snapshot_commit_not_present');
  }
  if (!logAudit.includes('release: QICN package v1')) {
    failures.push('freeze_audit_log_missing_release_commit_line');
  }

  if (!freeze.pin_status || !freeze.pin_status.upstream_pin_status) {
    failures.push('freeze_manifest_missing_pin_status');
  } else if (freeze.pin_status.upstream_pin_status === 'unresolved') {
    warnings.push('upstream_pin_unresolved');
  } else if (freeze.pin_status.upstream_pin_status === 'partially_resolved') {
    warnings.push('upstream_pin_partially_resolved');
  }
  if (!freeze.pin_status || !freeze.pin_status.remote_evidence) {
    warnings.push('remote_evidence_missing');
  }
  if (
    freeze.observed_repo_state_at_hardening_start &&
    freeze.observed_repo_state_at_hardening_start.working_tree_clean === false
  ) {
    provenanceNotes.push('working_tree_not_clean_at_hardening_start');
  }

  result = {
    artifact_role: 'canonical_integrity_check',
    checked_at: new Date().toISOString(),
    status: failures.length ? 'FAIL' : warnings.length ? 'PASS_WITH_WARNINGS' : 'PASS',
    checks: {
      zip_sha256_match: zipHash === zipExpected,
      manifest_sha256_match: manifestHash === manifestExpected,
      canonical_pdf_count: canon.canonical_pdf_count,
      index_count: index.count,
      freeze_tag_listed_in_audit: tagAudit.includes(freeze.freeze_reference.local_tag),
      freeze_snapshot_commit_listed_in_audit: logAudit.includes(
        freeze.freeze_reference.freeze_audit_snapshot_commit
      ),
      claim_registry_entries: registry.entries.length,
      layer_count: boundaries.layers.length,
      interface_count: iface.interfaces.length,
      non_canonical_material_physically_separated: freeze.current_non_canonical_separation.physically_separated,
      upstream_pin_status: freeze.pin_status.upstream_pin_status
    },
    failures,
    warnings,
    provenance_notes: provenanceNotes
  };
}

const outPath = path.join(outDir, 'canonical_integrity_check.json');
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write(JSON.stringify({ output: path.relative(root, outPath), ...result }, null, 2) + '\n');
process.exit(failures.length ? 1 : 0);
