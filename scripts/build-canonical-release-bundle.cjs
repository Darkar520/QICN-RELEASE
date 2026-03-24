const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const toPosix = (value) => String(value).replace(/\\/g, '/');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIntoBundle(bundleDir, relFrom, relTo = relFrom) {
  const src = path.join(root, relFrom);
  const dst = path.join(bundleDir, relTo);
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
  return toPosix(relTo);
}

function writeJsonIntoBundle(bundleDir, relTo, payload) {
  const dst = path.join(bundleDir, relTo);
  ensureDir(path.dirname(dst));
  fs.writeFileSync(dst, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  return toPosix(relTo);
}

function buildCanonicalReleaseBundle() {
  const freeze = JSON.parse(
    fs.readFileSync(path.join(root, 'release', 'release_freeze_manifest.json'), 'utf8')
  );
  const canon = JSON.parse(fs.readFileSync(path.join(root, 'release', 'canon_manifest.v1.json'), 'utf8'));
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const bundleDir = path.join(root, '_build', `canonical_release_bundle_${stamp}`);
  ensureDir(bundleDir);

  const includedFiles = [];
  const filesToCopy = [
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
    'release/RELEASE_MAP.md',
    'release/GLOSSARY_CANONICAL.v1.md',
    'release/METHODS_GOVERNANCE_HUB.v1.md',
    'release/STYLE_DISCLAIMER_POLICY.v1.md',
    'release/TERM_MIGRATION_PLAN.v1.md',
    'release/CROSSPAPER_LINKMAP.v1.json',
    'release/BLUEPRINT_EDITORIAL.md',
    'release/EDITORIAL_BLUEPRINT_ACTIONS.v1.md',
    'release/FREEZE_AUDIT_v1/integrity_check.json',
    'release/release_freeze_manifest.json',
    'release/canon_manifest.v1.json',
    'release/claim_registry.v1.json',
    'release/layer_boundaries.v1.json',
    'release/system_interface_boundary.v1.json'
  ];

  for (const rel of filesToCopy) includedFiles.push(copyIntoBundle(bundleDir, rel));
  includedFiles.push(copyIntoBundle(bundleDir, 'docs/CANONICAL_RELEASE_NOTES.md', 'CANONICAL_RELEASE_NOTES.md'));

  const supportLineages = (canon.supporting_lineages_included_in_freeze || []).filter((entry) =>
    String(entry.role || '').startsWith('supporting_')
  );
  const derivedLineages = (canon.supporting_lineages_included_in_freeze || []).filter(
    (entry) => !String(entry.role || '').startsWith('supporting_')
  );
  const excludedPaths =
    (freeze.current_non_canonical_separation && freeze.current_non_canonical_separation.excluded_paths) || [];

  const categoryManifests = {
    canonical_primary: {
      artifact_role: 'canonical_bundle_category_manifest',
      category: 'canonical_primary',
      source_of_truth_status: 'primary_source_of_truth',
      entries: canon.primary_formal_spine || [],
      non_claim_boundary:
        'Primary formal source-of-truth only. Inclusion here does not imply empirical validation, theory closure, or runtime instantiation.'
    },
    canonical_support_or_operational_annexes: {
      artifact_role: 'canonical_bundle_category_manifest',
      category: 'canonical_support_or_operational_annexes',
      source_of_truth_status: 'not_primary_source_of_truth',
      supporting_formal_or_parallel_lineages: supportLineages,
      operational_annexes: canon.operational_annexes_included_in_freeze || [],
      non_claim_boundary:
        'These materials remain inside the freeze for traceability, support, or operational context only. They are not the primary formal source-of-truth.'
    },
    derived_or_lineage_material: {
      artifact_role: 'canonical_bundle_category_manifest',
      category: 'derived_or_lineage_material',
      source_of_truth_status: 'derived_or_mirror_lineage_only',
      entries: derivedLineages,
      non_claim_boundary:
        'Derived and mirror lineages preserve genealogy only. They must not be promoted to source-of-truth or theory-confirming status.'
    },
    excluded_non_canonical_material: {
      artifact_role: 'canonical_bundle_category_manifest',
      category: 'excluded_non_canonical_material',
      source_of_truth_status: 'excluded',
      entries: excludedPaths.map((entryPath) => ({
        path: entryPath,
        status: 'excluded_non_canonical_material',
        not_source_of_truth: true
      })),
      additional_exclusions: [
        {
          path: 'QICN-SYSTEM runtime outputs',
          status: 'excluded_external_implementation_material',
          not_source_of_truth: true
        }
      ],
      non_claim_boundary:
        'Excluded material is documented for boundary clarity only. It is not copied into the bundle and cannot be read as source-of-truth or validation.'
    }
  };

  const categoryPaths = {};
  for (const [category, payload] of Object.entries(categoryManifests)) {
    categoryPaths[category] = writeJsonIntoBundle(bundleDir, `${category}/manifest.json`, payload);
  }
  includedFiles.push(...Object.values(categoryPaths));

  const manifest = {
    artifact_role: 'canonical_release_manifest',
    generated_at: new Date().toISOString(),
    release_id: freeze.release_id,
    bundle_root: '.',
    git: {
      branch: 'NOT_RESOLVED_IN_NODE_SANDBOX',
      commit: freeze.freeze_reference.local_tag_commit,
      upstream_pin_status: freeze.pin_status.upstream_pin_status,
      remote_evidence: freeze.pin_status.remote_evidence
    },
    freeze_reference: freeze.freeze_reference,
    bundle_categories: {
      canonical_primary: {
        manifest_path: categoryPaths.canonical_primary,
        entry_count: (canon.primary_formal_spine || []).length
      },
      canonical_support_or_operational_annexes: {
        manifest_path: categoryPaths.canonical_support_or_operational_annexes,
        support_entry_count: supportLineages.length,
        operational_annex_count: (canon.operational_annexes_included_in_freeze || []).length
      },
      derived_or_lineage_material: {
        manifest_path: categoryPaths.derived_or_lineage_material,
        entry_count: derivedLineages.length
      },
      excluded_non_canonical_material: {
        manifest_path: categoryPaths.excluded_non_canonical_material,
        entry_count: excludedPaths.length + 1
      }
    },
    included_files: includedFiles.sort(),
    excluded_materials: [
      ...excludedPaths.map((entryPath) => ({
        path: entryPath,
        reason: 'physically separated non-canonical material outside the tagged v1 freeze'
      })),
      {
        path: 'QICN-SYSTEM runtime outputs',
        reason: 'implementation artifacts are not part of the canonical theoretical release'
      }
    ],
    open_gaps: [
      freeze.pin_status.remaining_gap,
      'working_tree_observed_not_clean_at_hardening_start'
    ],
    interpretation_boundary:
      'Internal canonical release bundle only. Category structure separates primary source-of-truth, support/annex material, derived lineage material, and excluded material.',
    non_claim_boundary:
      'This bundle orders the corpus and its claim layers. It does not validate the framework, close the theory, or authorize external strong claims.'
  };

  const manifestPath = path.join(bundleDir, 'canonical_release_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  return {
    bundleDir: toPosix(path.relative(root, bundleDir)),
    manifestPath: toPosix(path.relative(root, manifestPath))
  };
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(buildCanonicalReleaseBundle(), null, 2) + '\n');
}

module.exports = { buildCanonicalReleaseBundle };
