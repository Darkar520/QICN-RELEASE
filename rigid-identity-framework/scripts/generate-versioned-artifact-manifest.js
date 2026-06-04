#!/usr/bin/env node
/*
 * v35 version-sprawl manifest generator.
 *
 * This is a non-destructive inventory tool. It records hashes for versioned
 * scripts, fixtures, reports, and theory artifacts before any archive/wrapper
 * conversion is attempted.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "reports", "V35_VERSIONED_ARTIFACT_MANIFEST.json");

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function isVersionedArtifact(filePath) {
  const normalized = rel(filePath);
  if (normalized.startsWith("scripts/legacy/compare-v30-v31.js")) return false;
  if (normalized.startsWith("scripts/legacy/run-all-legacy-verifications.js")) return false;
  return /(?:^|[_-])v(?:2[5-9]|3[0-3])(?:[_\.-]|$)/.test(path.basename(normalized))
    || /scripts\/audit-v(?:2[3-7])-/.test(normalized)
    || /scripts\/.*-v(?:2[5-9]|3[0-3])\.js$/.test(normalized);
}

function artifactRecord(filePath) {
  const stat = fs.statSync(filePath);
  return {
    path: rel(filePath),
    size_bytes: stat.size,
    sha256: sha256File(filePath)
  };
}

function gitStatus() {
  const git = spawnSync("git", ["status", "--short"], { cwd: ROOT, encoding: "utf8" });
  if (git.status !== 0) return { ok: false, stderr: git.stderr.trim() };
  return { ok: true, lines: git.stdout.split(/\r?\n/).filter(Boolean) };
}

function generate() {
  const searchRoots = ["scripts", "docs/fixtures", "docs/reports", "docs/theory"]
    .map((item) => path.join(ROOT, item));
  const artifacts = searchRoots
    .flatMap(walk)
    .filter(isVersionedArtifact)
    .sort((a, b) => rel(a).localeCompare(rel(b)))
    .map(artifactRecord);

  const byKind = {
    scripts: artifacts.filter((item) => item.path.startsWith("scripts/")).length,
    fixtures: artifacts.filter((item) => item.path.startsWith("docs/fixtures/")).length,
    reports: artifacts.filter((item) => item.path.startsWith("docs/reports/")).length,
    theory: artifacts.filter((item) => item.path.startsWith("docs/theory/")).length
  };

  const report = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    governance_boundary: "This v35 manifest records local versioned artifacts for codebase hygiene only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.",
    source_roots: searchRoots.map(rel),
    artifact_count: artifacts.length,
    by_kind: byKind,
    git_status: gitStatus(),
    artifacts,
    result: "PASS",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return report;
}

if (require.main === module) {
  const report = generate();
  console.log(`V35 versioned artifact manifest: ${report.result}; artifacts=${report.artifact_count}; scripts=${report.by_kind.scripts}; fixtures=${report.by_kind.fixtures}; reports=${report.by_kind.reports}; theory=${report.by_kind.theory}`);
}

module.exports = { generate };
