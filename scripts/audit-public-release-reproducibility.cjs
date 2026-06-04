const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, '_build', 'canonical_hardening');
fs.mkdirSync(outDir, { recursive: true });

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const exists = (rel) => fs.existsSync(path.join(root, rel));

const canon = readJson('release/canon_manifest.v1.json');
const pdfManifest = readJson('corpus/pdf_release/manifest.json');
const freeze = readJson('release/release_freeze_manifest.json');

const sourceGroups = [
  ['active_base_layer', [canon.active_base_layer]],
  ['primary_formal_spine', canon.primary_formal_spine || []],
  ['public_downstream_packages', canon.public_downstream_packages || []],
  ['supporting_lineages_included_in_freeze', canon.supporting_lineages_included_in_freeze || []],
  ['operational_annexes_included_in_freeze', canon.operational_annexes_included_in_freeze || []]
];

const sourceStatusRows = [];
for (const [group, docs] of sourceGroups) {
  for (const doc of docs.filter(Boolean)) {
    sourceStatusRows.push({
      group,
      doc_family_id: doc.doc_family_id,
      title: doc.title,
      source_status: doc.source_status || 'UNKNOWN',
      preferred_source_path: doc.preferred_source_path || null,
      preferred_source_exists: doc.preferred_source_path ? exists(doc.preferred_source_path) : null,
      release_pdf: doc.release_pdf,
      release_pdf_exists: doc.release_pdf ? exists(doc.release_pdf) : null
    });
  }
}

const sourceStatusCounts = sourceStatusRows.reduce((acc, row) => {
  acc[row.source_status] = (acc[row.source_status] || 0) + 1;
  return acc;
}, {});

const serializedManifest = JSON.stringify(pdfManifest);
const localPathPatterns = [
  /C:\\Users\\/i,
  /C:\\\\Users\\\\/i,
  /OneDrive\\\\Escritorio/i,
  /OneDrive\\Escritorio/i,
  /MiKTeX/i,
  /TRADING 3\.0/i
];

const portabilityFindings = [];
for (const pattern of localPathPatterns) {
  if (pattern.test(serializedManifest)) {
    portabilityFindings.push({
      pattern: String(pattern),
      status: 'present'
    });
  }
}

const pdfManifestCounts = pdfManifest.counts || {};
const pdfOnlyEntries = (pdfManifest.entries || [])
  .filter((entry) => entry.status === 'PASS_PDF_ONLY')
  .map((entry) => ({
    docId: entry.docId || null,
    relPath: entry.relPath,
    status: entry.status,
    pdf_only_reason: entry.pdf_only_reason || null,
    bundle_pdf_path: entry.bundle_pdf_path || null
  }));
const droppedEntries = (pdfManifest.entries || [])
  .filter((entry) => entry.status === 'DROP')
  .map((entry) => ({
    docId: entry.docId || null,
    relPath: entry.relPath,
    status: entry.status,
    drop_reason: entry.drop_reason || null,
    fail_reason: entry.fail_reason || null,
    fatal_snippet: entry.fatal_snippet || null,
    match_candidate_count: Array.isArray(entry.match_candidates) ? entry.match_candidates.length : 0
  }));

const canonPdfOnlyRows = sourceStatusRows
  .filter((row) => row.source_status === 'PASS_PDF_ONLY')
  .map((row) => ({
    doc_family_id: row.doc_family_id,
    title: row.title,
    preferred_source_path: row.preferred_source_path,
    preferred_source_exists: row.preferred_source_exists,
    release_pdf: row.release_pdf,
    release_pdf_exists: row.release_pdf_exists,
    group: row.group
  }));

const exactStatusIds = {
  pdf_manifest_PASS_PDF_ONLY_docIds: pdfOnlyEntries.map((entry) => entry.docId || entry.relPath),
  pdf_manifest_DROP_docIds: droppedEntries.map((entry) => entry.docId || entry.relPath),
  canon_manifest_PASS_PDF_ONLY_doc_family_ids: canonPdfOnlyRows.map((row) => row.doc_family_id)
};

const findings = [];
if ((sourceStatusCounts.PASS_PDF_ONLY || 0) > 0) {
  findings.push('canon_manifest_has_pdf_only_sources');
}
if ((pdfManifestCounts.PASS_PDF_ONLY || 0) > 0) {
  findings.push('pdf_release_manifest_has_pdf_only_entries');
}
if ((pdfManifestCounts.DROP || 0) > 0) {
  findings.push('pdf_release_manifest_has_dropped_entries');
}
if (portabilityFindings.length > 0) {
  findings.push('pdf_release_manifest_contains_local_build_paths');
}
if (
  freeze.observed_repo_state_at_hardening_start &&
  freeze.observed_repo_state_at_hardening_start.working_tree_clean === false
) {
  findings.push('freeze_manifest_records_dirty_worktree_at_hardening_start');
}

const result = {
  artifact_role: 'public_release_reproducibility_audit',
  checked_at: new Date().toISOString(),
  status: findings.length ? 'PASS_WITH_TRACKED_GAPS' : 'PASS',
  governance_boundary:
    'This audit tracks source reproducibility and provenance hygiene only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge closure, peer review, or empirical validation.',
  source_status_counts: sourceStatusCounts,
  pdf_manifest_counts: pdfManifestCounts,
  upstream_pin_status: freeze.pin_status && freeze.pin_status.upstream_pin_status,
  source_status_rows: sourceStatusRows,
  exact_status_ids: exactStatusIds,
  canon_pdf_only_rows: canonPdfOnlyRows,
  pdf_only_entries: pdfOnlyEntries,
  dropped_entries: droppedEntries,
  portability_findings: portabilityFindings,
  findings,
  recommended_actions: [
    'Repair or explicitly quarantine PASS_PDF_ONLY sources until source-to-PDF reproducibility is restored.',
    'Keep frozen manifest hashes immutable; publish path-hygiene findings as a separate audit artifact unless the corpus bundle is regenerated intentionally.',
    'Add CI artifacts for canonical integrity and reproducibility audits.',
    'Do not convert internal formal derivations into external empirical support claims.'
  ]
};

const jsonPath = path.join(outDir, 'public_release_reproducibility_audit.json');
fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2) + '\n', 'utf8');

const tableRows = sourceStatusRows
  .map((row) => `| ${row.doc_family_id || 'unknown'} | ${row.source_status} | ${row.preferred_source_path || 'n/a'} | ${row.preferred_source_exists === null ? 'n/a' : row.preferred_source_exists ? 'yes' : 'no'} |`)
  .join('\n');

const pdfOnlyRows = pdfOnlyEntries
  .map((entry) => `| ${entry.docId || 'unknown'} | ${entry.relPath || 'n/a'} | ${entry.pdf_only_reason || 'n/a'} | ${entry.bundle_pdf_path || 'n/a'} |`)
  .join('\n');

const dropRows = droppedEntries
  .map((entry) => `| ${entry.docId || 'unknown'} | ${entry.relPath || 'n/a'} | ${entry.drop_reason || 'n/a'} | ${entry.fail_reason || 'n/a'} | ${entry.match_candidate_count} |`)
  .join('\n');

const canonPdfOnlyTableRows = canonPdfOnlyRows
  .map((row) => `| ${row.doc_family_id || 'unknown'} | ${row.title || 'n/a'} | ${row.preferred_source_path || 'n/a'} | ${row.preferred_source_exists === null ? 'n/a' : row.preferred_source_exists ? 'yes' : 'no'} | ${row.release_pdf || 'n/a'} |`)
  .join('\n');

const md = `# Public Release Reproducibility Audit

## Status

${result.status}

## Governance Boundary

${result.governance_boundary}

## Source Status Counts

\`\`\`json
${JSON.stringify(sourceStatusCounts, null, 2)}
\`\`\`

## PDF Manifest Counts

\`\`\`json
${JSON.stringify(pdfManifestCounts, null, 2)}
\`\`\`

## Source Rows

| Doc | Source status | Preferred source | Source exists |
|---|---|---|---|
${tableRows}

## Exact Status IDs

\`\`\`json
${JSON.stringify(exactStatusIds, null, 2)}
\`\`\`

## Canon Manifest PASS_PDF_ONLY Rows

| Doc family ID | Title | Preferred source | Source exists | Release PDF |
|---|---|---|---|---|
${canonPdfOnlyTableRows || '| none | n/a | n/a | n/a | n/a |'}

## PDF Manifest PASS_PDF_ONLY Entries

| docId | relPath | PDF-only reason | Bundle PDF path |
|---|---|---|---|
${pdfOnlyRows || '| none | n/a | n/a | n/a |'}

## PDF Manifest DROP Entries

| docId | relPath | Drop reason | Fail reason | Match candidates |
|---|---|---|---|---:|
${dropRows || '| none | n/a | n/a | n/a | 0 |'}

## Findings

${findings.map((finding) => `- ${finding}`).join('\n') || '- none'}

## Recommended Actions

${result.recommended_actions.map((action) => `- ${action}`).join('\n')}
`;

const mdPath = path.join(outDir, 'public_release_reproducibility_audit.md');
fs.writeFileSync(mdPath, md, 'utf8');

process.stdout.write(JSON.stringify({
  output_json: path.relative(root, jsonPath),
  output_markdown: path.relative(root, mdPath),
  status: result.status,
  findings: result.findings
}, null, 2) + '\n');
