const fs = require('fs');
const path = require('path');
const { buildCanonicalReleaseBundle } = require('./build-canonical-release-bundle.cjs');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, '_build', 'canonical_hardening');
fs.mkdirSync(outDir, { recursive: true });

const failures = [];
const warnings = [];

let bundleInfo = {};
try {
  bundleInfo = buildCanonicalReleaseBundle();
} catch (error) {
  failures.push(`bundle_build_failed:${error.message}`);
}

const requiredBundlePaths = [
  'README.md',
  'RELEASE_NOTES.md',
  'CHANGELOG.md',
  'CANONICAL_RELEASE_NOTES.md',
  'canonical_release_manifest.json',
  'corpus/pdf_release/pdf_corpus.zip',
  'corpus/pdf_release/manifest.json',
  'release/canon_manifest.v1.json',
  'release/claim_registry.v1.json',
  'release/layer_boundaries.v1.json',
  'release/system_interface_boundary.v1.json',
  'canonical_primary/manifest.json',
  'canonical_support_or_operational_annexes/manifest.json',
  'derived_or_lineage_material/manifest.json',
  'excluded_non_canonical_material/manifest.json'
];

if (!failures.length) {
  const bundleDir = path.join(root, bundleInfo.bundleDir);
  for (const rel of requiredBundlePaths) {
    if (!fs.existsSync(path.join(bundleDir, rel))) failures.push(`missing_bundle_path:${rel}`);
  }

  if (fs.existsSync(path.join(bundleDir, 'release', '_non_canonical'))) {
    failures.push('unexpected_non_canonical_tree_in_bundle');
  }

  const manifest = JSON.parse(fs.readFileSync(path.join(bundleDir, 'canonical_release_manifest.json'), 'utf8'));
  if (!manifest.non_claim_boundary) failures.push('bundle_manifest_missing_non_claim_boundary');
  if (!manifest.interpretation_boundary) failures.push('bundle_manifest_missing_interpretation_boundary');
  if (!Array.isArray(manifest.included_files) || manifest.included_files.length < requiredBundlePaths.length) {
    failures.push('bundle_manifest_included_files_incomplete');
  }
  if (!manifest.bundle_categories) failures.push('bundle_manifest_missing_bundle_categories');
  if (manifest.bundle_categories) {
    for (const key of [
      'canonical_primary',
      'canonical_support_or_operational_annexes',
      'derived_or_lineage_material',
      'excluded_non_canonical_material'
    ]) {
      if (!manifest.bundle_categories[key]) failures.push(`missing_bundle_category:${key}`);
    }
  }
  if (manifest.git && manifest.git.upstream_pin_status !== 'partially_resolved') {
    warnings.push('bundle_manifest_upstream_pin_status_unexpected');
  }
  if (!Array.isArray(manifest.excluded_materials) || manifest.excluded_materials.length < 2) {
    warnings.push('bundle_manifest_exclusions_short');
  }
}

const result = {
  artifact_role: 'canonical_release_check',
  checked_at: new Date().toISOString(),
  status: failures.length ? 'FAIL' : warnings.length ? 'PASS_WITH_WARNINGS' : 'PASS',
  bundle: bundleInfo,
  failures,
  warnings
};

const outPath = path.join(outDir, 'canonical_release_check.json');
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write(JSON.stringify({ output: path.relative(root, outPath), ...result }, null, 2) + '\n');
process.exit(failures.length ? 1 : 0);
