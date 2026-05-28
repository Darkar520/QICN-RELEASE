#!/usr/bin/env node
/*
 * v27 superior-gap audit.
 *
 * This checks that the hardening gates are present and executable. It does not
 * certify external support, consciousness, phenomenality, identity transfer, or
 * bridge-burden closure.
 */
const fs = require("fs");
const path = require("path");
const { analyzeManifest } = require("./external-session-zero-adjudicator-v27");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "reports", "V27_SUPERIOR_GAP_AUDIT.json");
const GOVERNANCE = "This v27 audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.";

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function check(id, description, pass, evidence) {
  return { id, description, result: pass ? "PASS" : "FAIL", evidence };
}

function withValidExternal(manifest) {
  const m = clone(manifest);
  m.status = "external_candidate";
  m.dataset_origin = "external_test_case_not_real_empirical_data";
  m.decision_thresholds.threshold_calibration_status = "externally_calibrated_holdout";
  return m;
}

function main() {
  const checks = [];
  const manifest = readJson("docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
  const adjudication = readJson("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json");
  const calibration = readJson("docs/reports/THRESHOLD_NULL_CALIBRATION_v27.json");
  const promotion = readJson("docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v27.json");
  const signature = readJson("docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v27.json");

  checks.push(check(
    "GAP-01",
    "AICc is computed and used as the decision basis",
    Number.isFinite(adjudication.model_comparison.qicn.aicc) && /AICc/.test(adjudication.model_comparison.decision_basis),
    "qicn.aicc/rival.aicc present; decision_basis names AICc"
  ));

  checks.push(check(
    "GAP-02",
    "Affine structural leakage is blocked with a measurement-sigma threshold",
    adjudication.leakage_adjudication.affine_leakage_risk === "blocked" && adjudication.blocking_reasons.includes("BLOCKED_AFFINE_LEAKAGE"),
    "affine_leakage_risk=blocked on v26-style near-copy fixture"
  ));

  const quadratic = clone(manifest);
  quadratic.decision_thresholds.mi_leakage_threshold = 0.01;
  quadratic.bridge_certificate.tolerance_vector = quadratic.bridge_certificate.tolerance_vector.map(() => 1.0);
  quadratic.measurement_points = quadratic.measurement_points.map((pt) => ({ ...pt, qicn_prediction: pt.observed_delta ** 2 }));
  const quadraticReport = analyzeManifest(quadratic, { skipHashChecks: true });
  checks.push(check(
    "GAP-03",
    "Mutual information leakage diagnostic detects nonlinear dependence",
    (quadraticReport.blocking_reasons || []).includes("BLOCKED_MI_LEAKAGE") && typeof quadraticReport.leakage_adjudication?.structural_leakage?.mutual_information_observed_vs_prediction === "number",
    "quadratic predictor blocked by MI leakage"
  ));

  const miReal = adjudication.leakage_adjudication.structural_leakage.mutual_information_observed_vs_prediction;
  const miThreshold = adjudication.leakage_adjudication.structural_leakage.mutual_information_threshold;
  checks.push(check(
    "GAP-03b",
    "MI del fixture real es reportado vs. threshold calibrado",
    typeof miReal === "number" && typeof miThreshold === "number",
    `mi_real=${miReal}, mi_threshold=${miThreshold}`
  ));

  const inconsistent = clone(manifest);
  inconsistent.model_parameters.parameter_sensitivity_probes[1].baseline_predictions[0] += 0.123;
  const inconsistentReport = analyzeManifest(inconsistent, { skipHashChecks: true });
  checks.push(check(
    "GAP-04",
    "Sensitivity probes reject inconsistent baselines",
    inconsistentReport.verdict === "INVALID_MANIFEST" && JSON.stringify(inconsistentReport.validation.failures).includes("INCONSISTENT_SENSITIVITY_BASELINE"),
    "baseline mismatch produces INVALID_MANIFEST"
  ));

  checks.push(check(
    "GAP-05",
    "Rival adequacy rejects a rival worse than the mean model",
    adjudication.rival_adequacy.adequate === false && adjudication.blocking_reasons.includes("BLOCKED_STRAW_MAN_RIVAL"),
    "rss_rival >= rss_mean_model"
  ));

  checks.push(check(
    "GAP-06",
    "Calibration reports both null modes",
    Boolean(calibration.null_models?.null_rival_true) && Boolean(calibration.null_models?.null_both_random) && Number.isFinite(calibration.recommended_support_gain_aicc),
    "null_rival_true and null_both_random present"
  ));

  checks.push(check(
    "GAP-07",
    "Ed25519 verification consults a trusted-key registry and rejects unregistered keys",
    exists("docs/fixtures/TRUSTED_KEYS_REGISTRY_v27.json") && signature.registered_key_verification.ok === true && signature.unregistered_key_rejection.reason === "UNTRUSTED_PUBLIC_KEY",
    "registered key passes; unregistered key is rejected"
  ));

  checks.push(check(
    "GAP-08",
    "Promotion audit uses robust sentence segmentation and disclaimer propagation",
    promotion.result === "PASS" && promotion.sentence_segmentation_method.includes("abbreviation") && promotion.self_tests.every((test) => test.pass),
    "abbreviation, semicolon, and adjacent disclaimer self-tests passed"
  ));

  const temporal = withValidExternal(manifest);
  const residualPattern = [0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03];
  temporal.measurement_points = temporal.measurement_points.map((pt, i) => ({ ...pt, qicn_prediction: pt.observed_delta - residualPattern[i % residualPattern.length] }));
  const temporalReport = analyzeManifest(temporal, { skipHashChecks: true });
  checks.push(check(
    "GAP-09",
    "External data with Durbin-Watson outside [1.0,3.0] is blocked",
    temporalReport.blocking_reasons.includes("BLOCKED_TEMPORAL_DEPENDENCE") && typeof temporalReport.temporal_dependence_diagnostic.ljung_box.p_value_rough === "number",
    "external candidate with serial residual dependence includes temporal block and Ljung-Box diagnostic"
  ));

  checks.push(check(
    "GAP-10",
    "Leakage adjudication separates structural leakage from predictive accuracy",
    Boolean(adjudication.leakage_adjudication.predictive_accuracy) && Boolean(adjudication.leakage_adjudication.structural_leakage),
    "predictive_accuracy and structural_leakage are separate report fields"
  ));

  checks.push(check(
    "GAP-11",
    "Bridge certificate is present and operationally checked",
    adjudication.validation_summary.bridge_certificate_admissibility.status === "admissible" && Array.isArray(manifest.bridge_certificate.latent_invariants),
    "bridge_certificate_admissibility=admissible with finite operational limitation"
  ));

  const failures = checks.filter((item) => item.result !== "PASS");
  const report = {
    schema_version: "1.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    checks,
    result: failures.length === 0 ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# V27 Superior Gap Audit\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Checks: ${checks.length}\n- Failures: ${failures.length}\n`, "utf8");
  console.log(`V27 superior gap audit: ${report.result}; checks=${checks.length}; failures=${failures.length}`);
  if (failures.length > 0) process.exit(1);
}

if (require.main === module) main();
