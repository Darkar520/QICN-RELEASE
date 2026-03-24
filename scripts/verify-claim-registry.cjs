const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, '_build', 'canonical_hardening');
fs.mkdirSync(outDir, { recursive: true });

const exists = (rel) => fs.existsSync(path.join(root, rel));
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const registry = readJson('release/claim_registry.v1.json');
const canon = readJson('release/canon_manifest.v1.json');

const allowedClasses = new Set(Object.keys(registry.claim_classes || {}));
const failures = [];
const warnings = [];

const canonicalDocs = new Set();
for (const group of [
  ...(canon.primary_formal_spine || []),
  ...(canon.supporting_lineages_included_in_freeze || []),
  ...(canon.operational_annexes_included_in_freeze || [])
]) {
  canonicalDocs.add(group.release_pdf);
}

const seenIds = new Set();
for (const entry of registry.entries || []) {
  if (!entry.id || typeof entry.id !== 'string') failures.push('claim_missing_id');
  if (seenIds.has(entry.id)) failures.push(`duplicate_claim_id:${entry.id}`);
  seenIds.add(entry.id);

  if (!allowedClasses.has(entry.claim_class)) {
    failures.push(`invalid_claim_class:${entry.id}:${entry.claim_class}`);
  }

  for (const field of [
    'claim_text_summary',
    'formalization_status',
    'evidence_status',
    'external_validation_dependency',
    'system_dependency',
    'non_claim_boundary',
    'notes_or_gaps'
  ]) {
    if (!entry[field] || typeof entry[field] !== 'string') {
      failures.push(`missing_field:${entry.id}:${field}`);
    }
  }

  const src = entry.source_document || {};
  if (src.release_pdf) {
    if (!exists(src.release_pdf)) failures.push(`missing_source_pdf:${entry.id}`);
    if (!canonicalDocs.has(src.release_pdf)) failures.push(`source_pdf_not_in_canon_manifest:${entry.id}`);
  } else if (src.markdown_path) {
    if (!exists(src.markdown_path)) failures.push(`missing_source_markdown:${entry.id}`);
  } else {
    failures.push(`missing_source_document:${entry.id}`);
  }

  if (src.supporting_release_pdf) {
    if (!exists(src.supporting_release_pdf)) failures.push(`missing_supporting_pdf:${entry.id}`);
  }

  if (
    (entry.claim_class === 'implementation_linked_claim' || entry.claim_class === 'falsifiable_hypothesis') &&
    !String(entry.external_validation_dependency).includes('required')
  ) {
    failures.push(`missing_external_validation_gate:${entry.id}`);
  }

  if (entry.claim_class === 'not_closed' && entry.formalization_status === 'explicit_theorem_family_in_release_text') {
    warnings.push(`not_closed_claim_has_theorem_status:${entry.id}`);
  }
}

const result = {
  artifact_role: 'claim_registry_check',
  checked_at: new Date().toISOString(),
  status: failures.length ? 'FAIL' : warnings.length ? 'PASS_WITH_WARNINGS' : 'PASS',
  counts: {
    entries: registry.entries.length,
    unique_ids: seenIds.size,
    allowed_classes: allowedClasses.size
  },
  failures,
  warnings
};

const outPath = path.join(outDir, 'claim_registry_check.json');
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write(JSON.stringify({ output: path.relative(root, outPath), ...result }, null, 2) + '\n');
process.exit(failures.length ? 1 : 0);
