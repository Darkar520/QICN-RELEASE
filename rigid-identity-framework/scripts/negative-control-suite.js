#!/usr/bin/env node
/*
 * v30/v31 negative-control suite.
 *
 * This is a local falsification harness for known synthetic failure modes.
 * PASS means the internal gates fired on adversarial fixtures; it is not
 * evidence for QICN or for any external scientific claim.
 */

const fs = require("fs");
const path = require("path");
const { analyzeManifest } = require("./external-session-zero-adjudicator-v30");
const { foundationChecks } = require("./external-session-zero-adjudicator-v31");

const ROOT = path.resolve(__dirname, "..");
const FIXTURE = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const OUT = path.join(ROOT, "docs", "reports", "NEGATIVE_CONTROL_SUITE_v30.json");
const GOVERNANCE = "This negative-control suite verifies that local synthetic hardening gates reject known adversarial fixtures. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function admissiblePointIds(manifest) {
  const excluded = new Set((manifest.exclusion_log || []).map((entry) => entry.point_id));
  return new Set((manifest.measurement_points || []).filter((point) => !excluded.has(point.id)).map((point) => point.id));
}

function affineLeakageManifest(base) {
  const manifest = clone(base);
  const admissible = admissiblePointIds(manifest);
  for (const point of manifest.measurement_points || []) {
    if (!admissible.has(point.id)) continue;
    point.qicn_prediction = point.observed_delta - 0.003;
  }
  manifest.manifest_id = `${base.manifest_id || "fixture"}-negative-control-affine`;
  return manifest;
}

function inconsistentSensitivityManifest(base) {
  const manifest = clone(base);
  const probes = manifest.model_parameters?.parameter_sensitivity_probes || [];
  const qicnProbes = probes.filter((probe) => probe.model === "qicn");
  if (qicnProbes.length >= 2) {
    qicnProbes[1].baseline_predictions = qicnProbes[1].baseline_predictions.map((value, index) => value + (index === 0 ? 0.123 : 0));
  }
  manifest.manifest_id = `${base.manifest_id || "fixture"}-negative-control-inconsistent-sensitivity`;
  return manifest;
}

function missingBridgeManifest(base) {
  const manifest = clone(base);
  delete manifest.bridge_certificate;
  manifest.manifest_id = `${base.manifest_id || "fixture"}-negative-control-missing-bridge`;
  return manifest;
}

function typedSeparationPositiveManifest(base) {
  const manifest = clone(base);
  manifest.perturbation_type_registry = {
    internal_perturbations: [
      { id: "p1", type: "internal", description: "finite-energy deformation of identity" }
    ],
    external_witnesses: [
      { id: "w1", type: "external_extension", description: "independent channel comparison", d_ext: 0.05 }
    ]
  };
  manifest.manifest_id = `${base.manifest_id || "fixture"}-positive-type-separation`;
  return manifest;
}

function calibrationLineagePositiveManifest(base) {
  const manifest = clone(base);
  manifest.decision_thresholds = manifest.decision_thresholds || {};
  manifest.decision_thresholds.threshold_calibration_lineage = {
    fixture_blind: true,
    generated_before_fixture_scoring: true,
    external_holdout_used: true
  };
  manifest.manifest_id = `${base.manifest_id || "fixture"}-positive-calibration-lineage`;
  return manifest;
}

function runCase(name, manifest, expectedBlockers, options = {}) {
  const report = analyzeManifest(manifest, { strict: true });
  const blockers = new Set(report.blocking_reasons || []);
  const missing = expectedBlockers.filter((blocker) => !blockers.has(blocker));
  const invalidOk = options.expectInvalid === true && report.verdict === "INVALID_MANIFEST";
  return {
    name,
    verdict: report.verdict,
    result: report.result,
    validation_failures: report.validation?.failures || [],
    expected_blockers: expectedBlockers,
    actual_blockers: report.blocking_reasons || [],
    pass: invalidOk || missing.length === 0,
    missing
  };
}

function runV31PositiveCase(name, manifest, forbiddenFoundationBlocker) {
  const v30Report = analyzeManifest(manifest, { strict: true });
  const checks = foundationChecks(manifest, v30Report);
  const foundationBlockers = Object.values(checks)
    .filter((check) => !check.ok)
    .map((check) => check.status_if_failed);
  return {
    name,
    verdict: v30Report.verdict,
    expected_absent_blocker: forbiddenFoundationBlocker,
    actual_foundation_blockers: foundationBlockers,
    pass: !foundationBlockers.includes(forbiddenFoundationBlocker),
    note: "Positive v31 gate test only; the adversarial fixture may still be blocked by unrelated v30/v31 gates."
  };
}

function generate() {
  const base = JSON.parse(fs.readFileSync(FIXTURE, "utf8"));
  const cases = [
    runCase("baseline_fixture_blocks_known_v27_failures", base, [
      "BLOCKED_AFFINE_LEAKAGE",
      "BLOCKED_MI_LEAKAGE_MILLER_MADOW",
      "BLOCKED_STRAW_MAN_RIVAL",
      "BLOCKED_TEMPORAL_DEPENDENCE_STRICT"
    ]),
    runCase("affine_near_copy_control", affineLeakageManifest(base), ["BLOCKED_AFFINE_LEAKAGE"]),
    runCase("inconsistent_sensitivity_baseline_control", inconsistentSensitivityManifest(base), [], { expectInvalid: true }),
    runCase("missing_bridge_certificate_control", missingBridgeManifest(base), ["BLOCKED_BRIDGE_CERTIFICATE"]),
    runV31PositiveCase("v31_type_confusion_positive", typedSeparationPositiveManifest(base), "BLOCKED_TYPE_CONFUSION"),
    runV31PositiveCase("v31_circular_calibration_positive", calibrationLineagePositiveManifest(base), "BLOCKED_CIRCULAR_CALIBRATION")
  ];
  const report = {
    schema_version: "1.0.0",
    generated_at: "2026-05-29",
    governance_boundary: GOVERNANCE,
    fixture: path.relative(ROOT, FIXTURE).split(path.sep).join("/"),
    cases,
    result: cases.every((testCase) => testCase.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Negative Control Suite v30/v31\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Cases passed: ${cases.filter((testCase) => testCase.pass).length}/${cases.length}\n- External certification: **NO**\n`, "utf8");
  return report;
}

if (require.main === module) {
  const report = generate();
  console.log(`Negative-control suite v30: ${report.result}; cases=${report.cases.filter((testCase) => testCase.pass).length}/${report.cases.length}; external_support_certified=false`);
  if (report.result !== "PASS") process.exit(1);
}

module.exports = { generate };
