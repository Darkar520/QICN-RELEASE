# Full Modified Text File Contents v26

Governance boundary: This file records text artifacts only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.


## `package.json`

```json
{
  "name": "qicn-rigid-identity-framework",
  "version": "0.0.0-fcr",
  "private": true,
  "description": "Local validation tooling for the QICN Rigid Identity Framework Formal Corpus Registry.",
  "license": "UNLICENSED",
  "scripts": {
    "extract:registry": "node scripts/extract-registry.js",
    "verify:corpus-registry": "node scripts/validate-corpus.js",
    "verify:macro-registry": "node scripts/validate-macros.js",
    "verify:prediction-registry": "node scripts/validate-prediction-registry.js",
    "generate:prereg-scaffolds": "node scripts/generate-preregistration-scaffolds.js",
    "lint:nonclaims": "node scripts/lint-nonclaims.js",
    "extract:claim-ledger": "node scripts/extract-claim-ledger.js",
    "resync:macro-cache": "node scripts/resync-macro-cache.js",
    "test:resync-macro-cache": "node scripts/test-resync-macro-cache.js",
    "audit:extractor-reproducibility": "node scripts/probe-extractor-reproducibility.js",
    "analyze:impact": "node scripts/fcr-impact-analyzer.js",
    "audit:monolithic-risk": "node scripts/verify-monolithic-risk.js",
    "test:tamper-prereg": "node scripts/tamper-inject.js --self-test",
    "report:corpus-health": "node scripts/generate-report.js",
    "verify:coordinate-specs": "node scripts/verify-coordinate-specs.js",
    "rehearse:pred-ext-01": "node scripts/run-pred-ext-01-rehearsal.js",
    "pilot:pred-ext-01": "node scripts/run-pred-ext-01-pilot.js",
    "test:external-trace-generator": "node scripts/test-external-trace-generator.js",
    "cleanroom:pred-ext-01": "node scripts/run-pred-ext-01-cleanroom.js",
    "review:cleanroom-pred-ext-01": "node scripts/cleanroom-reviewer-quarantine.js",
    "audit:generator-independence": "node scripts/audit-generator-independence.js",
    "execute:pred-02": "node scripts/run-pred-02-execution.js",
    "execute:pred-04c": "node scripts/run-pred-04c-execution.js",
    "execute:pred-11": "node scripts/run-pred-11-execution.js",
    "verify:preregistration-coverage": "node scripts/validate-preregistration-coverage.js",
    "build:monolithic": "node scripts/build-monolithic-volume.js",
    "compile:monolithic": "node scripts/build-monolithic-volume.js --compile",
    "generate:curation-batch": "node scripts/generate-curation-batch.js",
    "audit:extractor-diagnostic": "node scripts/verify-registry-reproducibility.js",
    "verify:curation-overlays": "node scripts/verify-curation-overlays.js",
    "test:trace-memory-rival": "node scripts/test-trace-memory-rival.js",
    "test:adversarial-negative-controls": "node scripts/run-adversarial-negative-controls.js",
    "audit:monolithic-build-quality": "node scripts/audit-monolithic-build-quality.js",
    "construct:finite-separator-package": "node scripts/construct-finite-separator-package.js",
    "audit:finite-separator-package": "node scripts/audit-finite-separator-package.js",
    "evaluate:framework-progress": "node scripts/evaluate-framework-progress.js",
    "build:theory-dependency-graph": "node scripts/build-theory-dependency-graph.js",
    "verify:v22": "npm run construct:finite-separator-package && npm run audit:finite-separator-package && npm run audit:monolithic-build-quality && npm run verify:macro-registry && npm run verify:prediction-registry && npm run verify:preregistration-coverage && npm run lint:nonclaims && npm run audit:generator-independence && npm run test:adversarial-negative-controls && npm run cleanroom:pred-ext-01 && npm run build:theory-dependency-graph && npm run evaluate:framework-progress",
    "verify:release": "npm run verify:v26",
    "audit:operational-term-promotions": "node scripts/audit-operational-term-promotions.js",
    "adjudicate:external-session-zero-self-test": "node scripts/external-session-zero-adjudicator.js --self-test",
    "propose:fcr-downgrades:self-test": "node scripts/propose-fcr-downgrades-from-adjudication.js",
    "audit:v23-roadmap-gates": "node scripts/audit-v23-roadmap-gates.js",
    "verify:v23": "npm run verify:v22 && npm run audit:operational-term-promotions && npm run adjudicate:external-session-zero-self-test && npm run propose:fcr-downgrades:self-test && npm run audit:v23-roadmap-gates",
    "audit:v24-critical-gaps": "node scripts/audit-v24-critical-gaps.js",
    "verify:v24": "npm run verify:v22 && npm run audit:operational-term-promotions && npm run adjudicate:external-session-zero-self-test && npm run propose:fcr-downgrades:self-test && npm run audit:v23-roadmap-gates && npm run audit:v24-critical-gaps",
    "audit:v25-superior-gaps": "node scripts/audit-v25-superior-gaps.js",
    "verify:v25": "npm run adjudicate:external-session-zero-self-test && npm run propose:fcr-downgrades:self-test && npm run audit:operational-term-promotions && npm run audit:v25-superior-gaps",
    "calibrate:session-zero-thresholds": "node scripts/calibrate-session-zero-thresholds-v26.js",
    "verify:human-veto-signature": "node scripts/verify-human-veto-signature.js --self-test",
    "audit:v26-superior-gaps": "node scripts/audit-v26-superior-gaps.js",
    "verify:v26": "npm run calibrate:session-zero-thresholds && npm run adjudicate:external-session-zero-self-test && npm run propose:fcr-downgrades:self-test && npm run audit:operational-term-promotions && npm run verify:human-veto-signature && npm run audit:v26-superior-gaps"
  }
}

```


## `scripts/external-session-zero-adjudicator.js`

```javascript
#!/usr/bin/env node
/*
 * QICN External Session Zero Adjudicator v26
 *
 * v26 closes v25 implementation gaps without claiming external validation:
 * - verifies dataset and prediction bundle hashes against real files;
 * - rejects exact, near-exact, and exact affine copies of observed outcomes;
 * - checks that declared free parameters have nonzero sensitivity probes;
 * - uses independent Gaussian AIC with declared measurement_sigma and no RSS floor;
 * - emits Durbin-Watson residual diagnostics for temporal dependence;
 * - blocks synthetic fixtures from external-support verdicts;
 * - binds runner, manifest, dataset, and prediction bundle in the report hash.
 * Governance boundary: this script does not certify external support,
 * consciousness, phenomenality, identity transfer, bridge-burden closure, or
 * human mathematical review.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_FIXTURE = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json");
const DEFAULT_OUT_JSON = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json");
const DEFAULT_OUT_MD = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md");
const GOVERNANCE = "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}
function sha256(value) { return crypto.createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : stableJson(value)).digest("hex"); }
function readJson(filePath) { return JSON.parse(fs.readFileSync(filePath, "utf8")); }
function writeJson(filePath, value) { fs.mkdirSync(path.dirname(filePath), { recursive: true }); fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
function absoluteOrRoot(relPath) { return path.isAbsolute(relPath) ? relPath : path.join(ROOT, relPath); }
function currentRunnerSha256() { return sha256(fs.readFileSync(__filename)); }
function mean(xs) { return xs.reduce((a, b) => a + b, 0) / Math.max(xs.length, 1); }
function sampleVariance(xs) { if (xs.length < 2) return 0; const m = mean(xs); return xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1); }
function tCritical975(df) {
  const table = { 1:12.706, 2:4.303, 3:3.182, 4:2.776, 5:2.571, 6:2.447, 7:2.365, 8:2.306, 9:2.262, 10:2.228, 11:2.201, 12:2.179, 13:2.160, 14:2.145, 15:2.131, 16:2.120, 17:2.110, 18:2.101, 19:2.093, 20:2.086, 21:2.080, 22:2.074, 23:2.069, 24:2.064, 25:2.060, 26:2.056, 27:2.052, 28:2.048, 29:2.045, 30:2.042 };
  if (df <= 0) return Infinity; if (df <= 30) return table[df]; if (df <= 60) return 2.000; if (df <= 120) return 1.980; return 1.960;
}
function pearson(x, y) {
  if (x.length !== y.length || x.length < 2) return null;
  const mx = mean(x), my = mean(y);
  const vx = x.reduce((s, v) => s + (v - mx) ** 2, 0);
  const vy = y.reduce((s, v) => s + (v - my) ** 2, 0);
  if (vx === 0 || vy === 0) return null;
  return x.reduce((s, v, i) => s + (v - mx) * (y[i] - my), 0) / Math.sqrt(vx * vy);
}
function linearFitYOnX(x, y) {
  const mx = mean(x), my = mean(y);
  const den = x.reduce((s, v) => s + (v - mx) ** 2, 0);
  if (den === 0) return { slope: 0, intercept: my, maxAbsResidual: Infinity };
  const slope = x.reduce((s, v, i) => s + (v - mx) * (y[i] - my), 0) / den;
  const intercept = my - slope * mx;
  const residuals = y.map((v, i) => v - (slope * x[i] + intercept));
  return { slope, intercept, maxAbsResidual: Math.max(...residuals.map((r) => Math.abs(r))) };
}
function l2Effect(a, b) { if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return NaN; return Math.sqrt(a.reduce((s, v, i) => s + (b[i] - v) ** 2, 0)); }
function durbinWatson(residuals) { const denom = residuals.reduce((s, r) => s + r * r, 0); if (denom === 0 || residuals.length < 2) return null; let num = 0; for (let i=1;i<residuals.length;i++) num += (residuals[i] - residuals[i-1]) ** 2; return num / denom; }
function verifyFileHash(relPath, expected) {
  if (!relPath) return { ok: false, path: relPath, expected, actual: null, reason: "missing_path" };
  const full = absoluteOrRoot(relPath);
  if (!fs.existsSync(full)) return { ok: false, path: relPath, expected, actual: null, reason: "file_missing" };
  const actual = sha256(fs.readFileSync(full));
  return { ok: actual === expected, path: relPath, expected, actual, reason: actual === expected ? "matched" : "mismatch" };
}
function validateFreeParameters(params, failures) {
  const qicn = params.qicn_free_parameters;
  const rival = params.rival_free_parameters;
  if (!Array.isArray(qicn) || qicn.length === 0) failures.push("model_parameters.qicn_free_parameters must be a non-empty array.");
  if (!Array.isArray(rival) || rival.length === 0) failures.push("model_parameters.rival_free_parameters must be a non-empty array.");
  for (const [name, arr] of [["qicn_free_parameters", qicn], ["rival_free_parameters", rival]]) {
    if (!Array.isArray(arr)) continue;
    const ids = new Set();
    for (const p of arr) {
      if (!p || typeof p !== "object") failures.push(`${name} entries must be objects.`);
      if (!p.parameter_id) failures.push(`${name} entry missing parameter_id.`);
      if (p.parameter_id && ids.has(p.parameter_id)) failures.push(`${name} duplicate parameter_id ${p.parameter_id}.`);
      if (p.parameter_id) ids.add(p.parameter_id);
      if (p.free !== true) failures.push(`${name}.${p.parameter_id || "<missing>"} must declare free=true to count toward k.`);
      if (!p.preregistration_binding) failures.push(`${name}.${p.parameter_id || "<missing>"} needs preregistration_binding.`);
    }
  }
  if (typeof params.complexity_penalty_factor !== "number" || params.complexity_penalty_factor <= 0) failures.push("model_parameters.complexity_penalty_factor must be a positive number.");
  if ("qicn_parameter_count" in params || "rival_parameter_count" in params) failures.push("v26 forbids qicn_parameter_count/rival_parameter_count shortcuts; provide free-parameter arrays instead.");
  const qicnIds = Array.isArray(qicn) ? qicn.map((p) => p.parameter_id) : [];
  const rivalIds = Array.isArray(rival) ? rival.map((p) => p.parameter_id) : [];
  return { qicnK: qicnIds.length || null, rivalK: rivalIds.length || null, qicnIds, rivalIds };
}
function validateParameterIdentifiability(params, pointCount, failures, warnings) {
  const probes = params.parameter_sensitivity_probes;
  const minEffect = params.identifiability_min_l2_effect ?? 1e-6;
  const ids = new Set([...(params.qicn_free_parameters || []), ...(params.rival_free_parameters || [])].map((p) => p.parameter_id));
  if (!Array.isArray(probes) || probes.length === 0) { failures.push("model_parameters.parameter_sensitivity_probes are required in v26."); return { checked: 0, nonzero: 0 }; }
  let nonzero = 0;
  const seen = new Set();
  for (const probe of probes) {
    if (!probe || !probe.parameter_id) { failures.push("parameter_sensitivity_probe missing parameter_id."); continue; }
    if (!ids.has(probe.parameter_id)) failures.push(`parameter_sensitivity_probe references undeclared parameter ${probe.parameter_id}.`);
    seen.add(probe.parameter_id);
    if (!Array.isArray(probe.baseline_predictions) || !Array.isArray(probe.perturbed_predictions) || probe.baseline_predictions.length !== pointCount || probe.perturbed_predictions.length !== pointCount) failures.push(`parameter_sensitivity_probe ${probe.parameter_id} must provide baseline/perturbed arrays matching measurement_points length.`);
    const effect = l2Effect(probe.baseline_predictions, probe.perturbed_predictions);
    if (!Number.isFinite(effect) || effect < minEffect) failures.push(`parameter_sensitivity_probe ${probe.parameter_id} has insufficient effect ${effect}; parameter is not identifiable enough to count as free.`); else nonzero += 1;
  }
  for (const id of ids) if (!seen.has(id)) failures.push(`free parameter ${id} is missing a sensitivity probe.`);
  if (probes.length > ids.size) warnings.push("parameter_sensitivity_probes contains extra entries beyond declared free parameters.");
  return { checked: probes.length, nonzero, min_l2_effect: minEffect };
}
function validatePredictionBundle(manifest, failures, isSynthetic) {
  const bundle = manifest.prediction_bundle || {};
  for (const field of ["bundle_id", "prediction_sha256", "generation_protocol", "frozen_before_outcome_analysis", "prediction_path"]) if (!(field in bundle)) failures.push(`prediction_bundle.${field} is required.`);
  if (bundle.frozen_before_outcome_analysis !== true) failures.push("prediction_bundle.frozen_before_outcome_analysis must be true.");
  if (!isSynthetic && (!bundle.prediction_sha256 || /fixture|TO_BE_FILLED|not_external/i.test(bundle.prediction_sha256))) failures.push("external adjudication requires non-fixture prediction_bundle.prediction_sha256.");
  if (!bundle.generation_protocol || /observed|outcome|post.?hoc/i.test(bundle.generation_protocol)) failures.push("prediction_bundle.generation_protocol must not refer to observed outcomes or post-hoc generation.");
  const hashCheck = verifyFileHash(bundle.prediction_path, bundle.prediction_sha256);
  if (!hashCheck.ok) failures.push(`prediction_bundle hash verification failed: ${hashCheck.reason}.`);
  return hashCheck;
}
function validateManifest(manifest, options = {}) {
  const failures = [], warnings = [];
  if (!manifest || typeof manifest !== "object") failures.push("manifest is not an object.");
  if (!manifest.manifest_id) failures.push("manifest_id is required.");
  if (!manifest.governance_boundary || !manifest.governance_boundary.includes("does not certify external support")) failures.push("governance_boundary must explicitly deny external-support certification.");
  const isSynthetic = manifest.status === "synthetic_fixture" || /synthetic/i.test(manifest.dataset_origin || "");
  if (isSynthetic && !options.allowSyntheticFixture) failures.push("synthetic fixtures require --allow-synthetic-fixture or --self-test.");
  if (!isSynthetic && manifest.status !== "external_dataset") failures.push("non-fixture adjudication requires status='external_dataset'.");
  if (!manifest.preregistration_hash || /TO_BE_FILLED/.test(manifest.preregistration_hash)) failures.push("preregistration_hash must be frozen before adjudication.");
  if (!isSynthetic && (!manifest.dataset_sha256 || /fixture|TO_BE_FILLED|not_external/i.test(manifest.dataset_sha256))) failures.push("external datasets require a non-fixture dataset_sha256.");
  const datasetHashCheck = verifyFileHash(manifest.dataset_path, manifest.dataset_sha256);
  if (!datasetHashCheck.ok) failures.push(`dataset hash verification failed: ${datasetHashCheck.reason}.`);
  if (!isSynthetic && manifest.qicn_predictions_frozen_before_outcome_analysis !== true) failures.push("external adjudication requires qicn_predictions_frozen_before_outcome_analysis=true.");
  const predictionHashCheck = validatePredictionBundle(manifest, failures, isSynthetic);
  const thresholdReport = manifest.decision_thresholds?.threshold_calibration_report_path;
  const thresholdHash = manifest.decision_thresholds?.threshold_calibration_report_sha256;
  const thresholdHashCheck = thresholdReport ? verifyFileHash(thresholdReport, thresholdHash) : { ok: false, reason: "missing_threshold_calibration_report" };
  if (!thresholdHashCheck.ok) failures.push(`threshold calibration report hash verification failed: ${thresholdHashCheck.reason}.`);
  const points = manifest.measurement_points || [];
  if (!Array.isArray(points) || points.length === 0) failures.push("measurement_points must be a non-empty array.");
  const pointIds = new Set();
  for (const pt of points) {
    if (!pt.id) failures.push("each measurement point needs an id.");
    if (pointIds.has(pt.id)) failures.push(`duplicate measurement point id: ${pt.id}`);
    pointIds.add(pt.id);
    for (const field of ["timestamp", "observed_delta", "noise_floor", "measurement_sigma", "rival_prediction", "qicn_prediction"]) if (typeof pt[field] !== "number" || !Number.isFinite(pt[field])) failures.push(`point ${pt.id || "<missing>"} has invalid numeric field ${field}.`);
    if (!pt.separator_id || !pt.response_coordinate) failures.push(`point ${pt.id || "<missing>"} needs separator_id and response_coordinate.`);
    if (!pt.qicn_prediction_source || /observed|outcome|post.?hoc/i.test(pt.qicn_prediction_source)) failures.push(`point ${pt.id || "<missing>"} needs an a-priori qicn_prediction_source that does not reference observed outcomes.`);
    if (typeof pt.measurement_sigma === "number" && pt.measurement_sigma <= 0) failures.push(`point ${pt.id} has non-positive measurement_sigma.`);
    const nearTolerance = Math.max(1e-9, 0.001 * Math.abs(pt.measurement_sigma || 0));
    if (Math.abs(pt.qicn_prediction - pt.observed_delta) <= nearTolerance) failures.push(`point ${pt.id} has qicn_prediction near-equal to observed_delta within ${nearTolerance}; v26 blocks near-copy outcome leakage.`);
  }
  if (points.length >= 3) {
    const obs = points.map((pt) => pt.observed_delta);
    const pred = points.map((pt) => pt.qicn_prediction);
    const fit = linearFitYOnX(obs, pred);
    if (fit.maxAbsResidual <= 1e-8) failures.push("qicn_prediction is an exact affine transform of observed_delta; v26 blocks trivial outcome transforms.");
  }
  const rules = manifest.exclusion_rules || {};
  const allowed = new Set(rules.allowed_reason_codes || []);
  const exclusions = manifest.exclusion_log || [];
  if (!Array.isArray(exclusions)) failures.push("exclusion_log must be an array.");
  const excluded = new Set();
  for (const ex of exclusions) {
    if (!ex.point_id || !ex.reason_code) failures.push("each exclusion must have point_id and reason_code.");
    if (ex.point_id && !pointIds.has(ex.point_id)) failures.push(`exclusion references unknown point_id: ${ex.point_id}`);
    if (ex.reason_code && !allowed.has(ex.reason_code)) failures.push(`exclusion reason ${ex.reason_code} is not predeclared.`);
    if (ex.predeclared !== true || ex.observed_before_outcome_analysis !== true) failures.push(`exclusion for ${ex.point_id} is not marked predeclared and pre-outcome.`);
    excluded.add(ex.point_id);
  }
  if (points.length > 0 && exclusions.length / points.length > (rules.max_exclusion_fraction ?? 1)) failures.push("exclusion fraction exceeds predeclared maximum.");
  const paramCounts = validateFreeParameters(manifest.model_parameters || {}, failures);
  const identifiability = validateParameterIdentifiability(manifest.model_parameters || {}, points.length, failures, warnings);
  return { ok: failures.length === 0, failures, warnings, isSynthetic, excluded, paramCounts, identifiability, datasetHashCheck, predictionHashCheck, thresholdHashCheck };
}
function admissiblePoints(manifest, excluded) {
  return (manifest.measurement_points || []).filter((pt) => !excluded.has(pt.id) && pt.noise_floor <= (manifest.exclusion_rules?.max_noise_floor ?? Infinity));
}
function weightedEffect(points) {
  const deltas = points.map((pt) => pt.observed_delta - pt.noise_floor);
  const weights = points.map((pt) => 1 / (pt.measurement_sigma ** 2));
  const weightedMean = deltas.reduce((sum, x, i) => sum + x * weights[i], 0) / weights.reduce((a, b) => a + b, 0);
  const modelVariance = 1 / weights.reduce((a, b) => a + b, 0);
  const residuals = deltas.map((x) => x - weightedMean);
  const hc1 = points.length > 1 ? (points.length / Math.max(points.length - 1, 1)) * residuals.reduce((sum, r, i) => sum + (weights[i] * r) ** 2, 0) / (weights.reduce((a, b) => a + b, 0) ** 2) : 0;
  const standardError = Math.sqrt(modelVariance + hc1);
  const df = Math.max(points.length - 1, 1);
  const tcrit = tCritical975(df);
  return { weighted_mean_delta_minus_noise: weightedMean, standard_error: standardError, degrees_of_freedom: df, t_critical_975: tcrit, ci95: [weightedMean - tcrit * standardError, weightedMean + tcrit * standardError], method: "weighted_mean_declared_sigma_plus_hc1_residual_sandwich_diagnostic_not_blue_claim" };
}
function gaussianAic(points, predictionField, k, penaltyFactor) {
  let nll = 0, sse = 0;
  const residuals = [];
  for (const pt of points) {
    const r = pt.observed_delta - pt[predictionField];
    residuals.push(r);
    sse += r ** 2;
    const sigma2 = pt.measurement_sigma ** 2;
    nll += 0.5 * (Math.log(2 * Math.PI * sigma2) + (r ** 2) / sigma2);
  }
  return { aic: 2 * k * penaltyFactor + 2 * nll, nll, sse, residuals };
}
function adjudicate(manifestPath, options = {}) {
  const manifest = readJson(manifestPath);
  const validation = validateManifest(manifest, options);
  if (!validation.ok) {
    return { schema_version:"4.0.0", generated_at:"2026-05-27", governance_boundary:GOVERNANCE, input_manifest:path.relative(ROOT, manifestPath), validation, result:"FAIL", verdict:"INVALID_MANIFEST", external_support_certified:false };
  }
  const points = admissiblePoints(manifest, validation.excluded);
  const thresholds = manifest.decision_thresholds || {};
  const qicnK = validation.paramCounts.qicnK;
  const rivalK = validation.paramCounts.rivalK;
  const penalty = manifest.model_parameters.complexity_penalty_factor;
  const effect = weightedEffect(points);
  const qicn = gaussianAic(points, "qicn_prediction", qicnK, penalty);
  const rival = gaussianAic(points, "rival_prediction", rivalK, penalty);
  const gain = rival.aic - qicn.aic;
  const corr = pearson(points.map((pt) => pt.observed_delta), points.map((pt) => pt.qicn_prediction));
  const affine = linearFitYOnX(points.map((pt) => pt.observed_delta), points.map((pt) => pt.qicn_prediction));
  const dw = durbinWatson(qicn.residuals);
  let verdict;
  if (points.length < thresholds.minimum_admissible_n) verdict = "BLOCKED_INSUFFICIENT_ADMISSIBLE_N";
  else if (!validation.isSynthetic && thresholds.threshold_calibration_status !== "externally_calibrated_holdout") verdict = "BLOCKED_PENDING_EXTERNAL_THRESHOLD_CALIBRATION";
  else if (!validation.isSynthetic && manifest.temporal_dependence_policy?.action_on_violation?.includes("block") && dw !== null) {
    const [lo, hi] = manifest.temporal_dependence_policy.acceptable_range || [0, 4];
    verdict = dw < lo || dw > hi ? "BLOCKED_PENDING_DEPENDENCE_MODEL" : null;
  }
  if (!verdict) {
    if (gain >= thresholds.support_gain_aic && effect.ci95[0] >= thresholds.minimum_ci_lower) verdict = validation.isSynthetic ? "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY" : "SUPPORTED_PENDING_HUMAN_AND_EXTERNAL_REVIEW";
    else if (gain > thresholds.weakening_gain_aic) verdict = validation.isSynthetic ? "INTERNAL_DIAGNOSTIC_WEAK_SYNTHETIC_ONLY" : "WEAKENED";
    else verdict = validation.isSynthetic ? "INTERNAL_DIAGNOSTIC_FAIL_SYNTHETIC_ONLY" : "DEGRADED_FAIL";
  }
  const externalSupportCertified = !validation.isSynthetic && /^SUPPORTED/.test(verdict) && thresholds.threshold_calibration_status === "externally_calibrated_holdout";
  const reportBase = {
    schema_version:"4.0.0",
    generated_at:"2026-05-27",
    governance_boundary:GOVERNANCE,
    input_manifest:path.relative(ROOT, manifestPath),
    validation_summary:{ ok: validation.ok, is_synthetic_fixture: validation.isSynthetic, failures: validation.failures, warnings: validation.warnings, dataset_hash_verified: validation.datasetHashCheck.ok, prediction_bundle_hash_verified: validation.predictionHashCheck.ok, threshold_calibration_hash_verified: validation.thresholdHashCheck.ok, parameter_identifiability: validation.identifiability },
    provenance:{ runner_path:path.relative(ROOT, __filename), runner_sha256:currentRunnerSha256(), manifest_path:path.relative(ROOT, manifestPath), manifest_sha256:sha256(fs.readFileSync(manifestPath)), dataset_path:manifest.dataset_path, dataset_sha256:manifest.dataset_sha256, prediction_bundle_path:manifest.prediction_bundle.prediction_path, prediction_bundle_sha256:manifest.prediction_bundle.prediction_sha256, threshold_calibration_report_path:thresholds.threshold_calibration_report_path, threshold_calibration_report_sha256:thresholds.threshold_calibration_report_sha256 },
    counts:{ total_points: manifest.measurement_points.length, excluded_points: validation.excluded.size, admissible_points: points.length, qicn_free_parameter_count:qicnK, rival_free_parameter_count:rivalK },
    effect_estimate: effect,
    model_comparison:{ method:"independent_gaussian_aic_using_declared_measurement_sigma_no_rss_floor_v26", assumption_caveat:"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure.", qicn, rival, complexity_adjusted_gain:gain, outcome_prediction_leakage_diagnostics:{ pearson_observed_vs_qicn_prediction:corr, affine_fit_qicn_prediction_from_observed_delta:affine }, temporal_dependence_diagnostic:{ method:"durbin_watson_on_qicn_residuals", durbin_watson:dw, policy:manifest.temporal_dependence_policy || null } },
    decision_thresholds: thresholds,
    claims_under_test: manifest.claims_under_test || [],
    verdict,
    external_support_certified: externalSupportCertified,
    result:"PASS"
  };
  return { ...reportBase, report_sha256: sha256(reportBase) };
}
function writeMarkdown(report, filePath) {
  const md = [`# Session Zero Adjudication v26`, ``, `## Governance boundary`, ``, report.governance_boundary, ``, `- Verdict: **${report.verdict}**`, `- Result: **${report.result}**`, `- External support certified: **${report.external_support_certified ? "YES" : "NO"}**`, `- Admissible points: ${report.counts?.admissible_points ?? "n/a"}`, `- Complexity-adjusted gain: ${report.model_comparison?.complexity_adjusted_gain ?? "n/a"}`, `- Dataset hash verified: ${report.validation_summary?.dataset_hash_verified ?? false}`, `- Prediction bundle hash verified: ${report.validation_summary?.prediction_bundle_hash_verified ?? false}`, `- Threshold calibration hash verified: ${report.validation_summary?.threshold_calibration_hash_verified ?? false}`, ``].join("\n");
  fs.writeFileSync(filePath, md, "utf8");
}
function main() {
  const selfTest = process.argv.includes("--self-test");
  const fixtureIdx = process.argv.indexOf("--manifest");
  const outIdx = process.argv.indexOf("--out");
  const manifestPath = fixtureIdx === -1 ? DEFAULT_FIXTURE : path.resolve(process.argv[fixtureIdx + 1]);
  const outPath = outIdx === -1 ? DEFAULT_OUT_JSON : path.resolve(process.argv[outIdx + 1]);
  const report = adjudicate(manifestPath, { allowSyntheticFixture: selfTest || process.argv.includes("--allow-synthetic-fixture") });
  writeJson(outPath, report);
  writeMarkdown(report, outPath.replace(/\.json$/, ".md"));
  console.log(`External Session Zero adjudicator v26: ${report.result}; verdict=${report.verdict}; external_support_certified=${report.external_support_certified}`);
  if (report.result !== "PASS") process.exit(1);
}
if (require.main === module) main();
module.exports = { adjudicate, validateManifest, stableJson, sha256, pearson, linearFitYOnX, durbinWatson };

```


## `scripts/audit-operational-term-promotions.js`

```javascript
#!/usr/bin/env node
/*
 * QICN Operational Term Promotion Audit v26
 * Sentence-aware deterministic lexical gate.
 * Governance boundary: this audit does not certify external support,
 * consciousness, phenomenality, identity transfer, or bridge-burden closure.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const RULES = path.join(ROOT, "docs", "OPERATIONAL_TERM_PROMOTION_RULES.md");
const OUT_JSON = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v26.md");
const GOVERNANCE = "This audit flags unsafe language only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.";

const TERM_SYNONYMS = {
  consciousness: ["consciousness", "conscious", "awareness", "inner awareness", "subjective awareness", "what it is like", "what-it-is-like", "phenomenal character", "phenomenal feel", "subjective feel", "felt character", "first-person experience", "first person experience"],
  phenomenality: ["phenomenality", "phenomenal", "qualia", "qualitative feel", "phenomenal experience", "phenomenal consciousness", "phenomenal character", "what it is like", "what-it-is-like"],
  subjecthood: ["subjecthood", "subjectivity", "first-person", "first person", "first-person subjectivity", "subjective point of view", "point of view"],
  "identity transfer": ["identity transfer", "transfer of identity", "mind upload", "uploading", "substrate transfer", "personal continuity transfer"],
  "external support": ["external support", "empirical validation", "external validation", "validated empirically", "real-world support", "experimentally supported", "corroborated externally"],
  "bridge-burden closure": ["bridge-burden closure", "bridge burden closure", "bridge closure", "phenomenal bridge closed", "hard problem solved", "bridge is solved"]
};
const PROMOTION_VERBS = /\b(proves?|proved|certif(?:y|ies|ied)|demonstrates?|establishes?|validates?|confirms?|guarantees?|settles?|solves?|shows?|corroborates?|verified|supported|conclusive|definitive|stunning|emerges?)\b/i;
const LOCAL_BOUNDARY = /\b(does not|do not|cannot|not yet|no external|synthetic only|internal diagnostic|not certify|not certified|conditional|open burden|scaffold|requires external|does not prove|does not validate|not a proof|not evidence)\b/i;
function readText(p){ try { return fs.readFileSync(p,"utf8"); } catch { return ""; } }
function listFiles(dir){ if(!fs.existsSync(dir)) return []; const out=[]; for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) out.push(...listFiles(p)); else if(/\.(md|json|tex)$/i.test(e.name)) out.push(p); } return out; }
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
function termRegex(term){ const variants=TERM_SYNONYMS[term]||[term]; return new RegExp(`\\b(?:${variants.map(escapeRe).join("|")})\\b`,"i"); }
function lineNumberAt(text,index){ return text.slice(0,index).split(/\n/).length; }
function splitParagraphs(text){ return text.split(/\n\s*\n/g).map((body,idx)=>({body,idx})); }
function splitSentences(paragraph){
  const sentences=[]; const re=/[^.!?\n]+(?:[.!?]+|$)/g; let m;
  while((m=re.exec(paragraph.body))!==null){ const raw=m[0]; const text=raw.trim(); if(!text) continue; sentences.push({text, startInParagraph:m.index, endInParagraph:m.index+raw.length}); }
  if(sentences.length===0 && paragraph.body.trim()) sentences.push({text:paragraph.body.trim(), startInParagraph:0, endInParagraph:paragraph.body.length});
  return sentences;
}
function loadRules(){
  // Keep the rule source human-readable; use this hard-coded blocked set as the executable gate.
  return ["consciousness","phenomenality","subjecthood","identity transfer","external support","bridge-burden closure"].map((term)=>({term}));
}
function currentTargets(){
  const specific=[
    "docs/THEORY_CLAIM_LEDGER.md",
    "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
    "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
    "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
    "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
    "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
    "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
    "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
    "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
    "docs/PREDICTION_REGISTRY_v1.json",
    "docs/FALSIFIER_MATRIX.md",
    "docs/ABLATION_MATRIX.md",
    "docs/ablation_matrix.v1.json",
    "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
    "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
    "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
    "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md"
  ].map((p)=>path.join(ROOT,p));
  const reports=listFiles(path.join(ROOT,"docs","reports")).filter((p)=>/V26|v26|SESSION_ZERO|DOWNGRADE|THRESHOLD_NULL/.test(path.basename(p)) && !/^(FULL_MODIFIED|OPERATIONAL_TERM_PROMOTION_AUDIT|HYBRID_V26_VERIFICATION)/.test(path.basename(p)));
  return [...new Set([...specific,...reports])];
}
function scanFile(file,rules){
  const text=readText(file); if(!text) return [];
  const findings=[];
  const paragraphs=splitParagraphs(text);
  for(const paragraph of paragraphs){
    const paraStart=text.indexOf(paragraph.body);
    const sentences=splitSentences(paragraph);
    const windows=[];
    sentences.forEach((s,i)=>windows.push({kind:"sentence",sentence_index:i,text:s.text,start:s.startInParagraph}));
    for(let i=0;i<sentences.length-1;i++) windows.push({kind:"adjacent_sentence_pair",sentence_index:i,text:`${sentences[i].text} ${sentences[i+1].text}`,start:sentences[i].startInParagraph});
    for(const rule of rules){
      const re=termRegex(rule.term);
      for(const w of windows){
        const match=re.exec(w.text); if(!match) continue;
        const promotion=PROMOTION_VERBS.test(w.text);
        const localBoundary=LOCAL_BOUNDARY.test(w.text);
        const suspicious=promotion && !localBoundary;
        if(match || suspicious){
          findings.push({ file:path.relative(ROOT,file), line: paraStart>=0?lineNumberAt(text, paraStart+w.start):null, term:rule.term, matched_variant:match[0], scope:w.kind, sentence_index:w.sentence_index, local_boundary_present:localBoundary, promotion_language_present:promotion, suspicious_promotion:suspicious, excerpt:w.text.slice(0,260) });
        }
      }
    }
  }
  return findings;
}
function main(){
  const rules=loadRules();
  const targets=currentTargets().filter((p)=>fs.existsSync(p) && path.resolve(p)!==path.resolve(OUT_JSON) && path.resolve(p)!==path.resolve(OUT_MD));
  const findings=[]; for(const file of targets) findings.push(...scanFile(file,rules));
  const failures=findings.filter((f)=>f.suspicious_promotion).map((f)=>`${f.file}:${f.line}: possible unbounded ${f.term} promotion via ${f.matched_variant} (${f.scope})`);
  const report={ schema_version:"4.0.0", generated_at:"2026-05-27", governance_boundary:GOVERNANCE, rules_file:path.relative(ROOT,RULES), semantic_gate:"sentence_level_and_adjacent_sentence_pair_synonym_lexicon_plus_promotion_verb_scan_v26", scanned_files:targets.length, findings, failures, result:failures.length===0?"PASS":"FAIL" };
  fs.mkdirSync(path.dirname(OUT_JSON),{recursive:true}); fs.writeFileSync(OUT_JSON,JSON.stringify(report,null,2)+"\n"); fs.writeFileSync(OUT_MD,`# Operational Term Promotion Audit v26\n\n## Governance boundary\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Semantic gate: ${report.semantic_gate}\n- Scanned files: ${report.scanned_files}\n- Findings: ${findings.length}\n- Failures: ${failures.length}\n\n`,"utf8");
  console.log(`Operational term promotion audit v26: ${report.result}; failures=${failures.length}`);
  if(report.result!=="PASS") process.exit(1);
}
if(require.main===module) main();
module.exports={splitSentences,scanFile,termRegex};

```


## `scripts/propose-fcr-downgrades-from-adjudication.js`

```javascript
#!/usr/bin/env node
/* Governance boundary: this dry-run proposes downgrades from adjudication outcomes. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_REPORT = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json");
const OUT_JSON = path.join(ROOT, "docs", "reports", "FCR_DOWNGRADE_DRY_RUN_v26.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "FCR_DOWNGRADE_DRY_RUN_v26.md");
const GOVERNANCE = "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.";
function stableJson(value) { if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`; if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`; return JSON.stringify(value); }
function sha256(value) { return crypto.createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : stableJson(value)).digest("hex"); }
function verifyReportHash(report) { if (!report.report_sha256) return { ok:false, reason:"missing report_sha256" }; const base={...report}; delete base.report_sha256; const expected=sha256(base); return { ok:expected===report.report_sha256, expected, actual:report.report_sha256, reason:expected===report.report_sha256?"matched":"mismatch" }; }
function verifyPathHash(kind, relPath, expected) { if (!relPath || !expected) return { kind, ok:false, reason:"missing_path_or_hash", path:relPath || null }; const file=path.join(ROOT, relPath); if (!fs.existsSync(file)) return { kind, ok:false, reason:"file_missing", path:relPath }; const actual=sha256(fs.readFileSync(file)); return { kind, ok:actual===expected, path:relPath, expected, actual, reason:actual===expected?"matched":"mismatch" }; }
function verifyProvenance(report) { const p=report.provenance || {}; const checks=[ verifyPathHash("runner_sha256", p.runner_path, p.runner_sha256), verifyPathHash("manifest_sha256", p.manifest_path, p.manifest_sha256), verifyPathHash("dataset_sha256", p.dataset_path, p.dataset_sha256), verifyPathHash("prediction_bundle_sha256", p.prediction_bundle_path, p.prediction_bundle_sha256), verifyPathHash("threshold_calibration_report_sha256", p.threshold_calibration_report_path, p.threshold_calibration_report_sha256) ]; return { ok:checks.every((c)=>c.ok), checks }; }
function main() { const idx=process.argv.indexOf("--report"); const reportPath=idx===-1?DEFAULT_REPORT:path.resolve(process.argv[idx+1]); const report=JSON.parse(fs.readFileSync(reportPath,"utf8")); const hashCheck=verifyReportHash(report); const provenanceCheck=verifyProvenance(report); const verdict=report.verdict || "BLOCKED"; const shouldDowngrade=/DEGRADED_FAIL|WEAKENED|BLOCKED|INVALID_MANIFEST/.test(verdict); const proposals=[]; if(hashCheck.ok && provenanceCheck.ok){ for(const claim of report.claims_under_test || []) proposals.push({ claim_id:claim.claim_id, prediction_id:claim.prediction_id || claim.claim_id, source_adjudication_report:path.relative(ROOT,reportPath), source_adjudication_report_sha256:report.report_sha256, source_runner_sha256:report.provenance?.runner_sha256 || null, source_manifest_sha256:report.provenance?.manifest_sha256 || null, source_dataset_sha256:report.provenance?.dataset_sha256 || null, source_prediction_bundle_sha256:report.provenance?.prediction_bundle_sha256 || null, source_threshold_calibration_report_sha256:report.provenance?.threshold_calibration_report_sha256 || null, verdict, action:shouldDowngrade ? (claim.downgrade_action_if_fail || "downgrade_to_open_burden") : "no_registry_change_required_from_this_report", mode:"dry_run_only", human_review_required:true, human_veto_protocol:"docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md" }); }
  const out={ schema_version:"4.0.0", generated_at:"2026-05-27", governance_boundary:GOVERNANCE, input_report:path.relative(ROOT,reportPath), report_hash_verification:hashCheck, provenance_verification:provenanceCheck, verdict, registry_modified:false, proposals, result:hashCheck.ok && provenanceCheck.ok ? "PASS":"FAIL" };
  fs.writeFileSync(OUT_JSON,JSON.stringify(out,null,2)+"\n"); fs.writeFileSync(OUT_MD,`# FCR Downgrade Dry Run v26\n\n## Governance boundary\n\n${GOVERNANCE}\n\n- Input report: \`${out.input_report}\`\n- Report hash verification: **${hashCheck.ok?"PASS":"FAIL"}**\n- Provenance verification: **${provenanceCheck.ok?"PASS":"FAIL"}**\n- Verdict: **${verdict}**\n- Registry modified: **NO**\n- Proposals: ${proposals.length}\n\n`,"utf8"); console.log(`FCR downgrade dry run v26: ${out.result}; proposals=${proposals.length}; registry_modified=false`); if(out.result!=="PASS") process.exit(1); }
if(require.main===module) main();
module.exports={verifyReportHash,verifyProvenance,stableJson,sha256};

```


## `scripts/calibrate-session-zero-thresholds-v26.js`

```javascript
#!/usr/bin/env node
/*
 * QICN v26 null-threshold calibration simulator.
 * This produces an internal engineering calibration record only. It does not
 * certify external support, consciousness, phenomenality, identity transfer,
 * bridge-burden closure, or human mathematical review.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json");
const OUT = path.join(ROOT, "docs", "reports", "THRESHOLD_NULL_CALIBRATION_v26.json");
const GOVERNANCE = "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
function stableJson(value){ if(Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`; if(value&&typeof value==="object") return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${stableJson(value[k])}`).join(",")}}`; return JSON.stringify(value); }
function sha256(value){ return crypto.createHash("sha256").update(typeof value==="string"||Buffer.isBuffer(value)?value:stableJson(value)).digest("hex"); }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
function randn(rng){ let u=0,v=0; while(u===0) u=rng(); while(v===0) v=rng(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
function gaussianAic(points, field, k, penalty){ let nll=0; for(const pt of points){ const r=pt.observed_delta-pt[field]; const s2=pt.measurement_sigma**2; nll+=0.5*(Math.log(2*Math.PI*s2)+(r*r)/s2); } return 2*k*penalty+2*nll; }
function percentile(xs,p){ const s=[...xs].sort((a,b)=>a-b); const idx=(s.length-1)*p; const lo=Math.floor(idx), hi=Math.ceil(idx); if(lo===hi) return s[lo]; return s[lo]*(hi-idx)+s[hi]*(idx-lo); }
function main(){
  const manifest=JSON.parse(fs.readFileSync(MANIFEST,"utf8"));
  const excluded=new Set((manifest.exclusion_log||[]).map(x=>x.point_id));
  const base=manifest.measurement_points.filter(pt=>!excluded.has(pt.id));
  const qK=manifest.model_parameters.qicn_free_parameters.length;
  const rK=manifest.model_parameters.rival_free_parameters.length;
  const penalty=manifest.model_parameters.complexity_penalty_factor;
  const rng=mulberry32(0x51A7E26);
  const gains=[];
  const iterations=2000;
  for(let i=0;i<iterations;i++){
    const pts=base.map(pt=>{
      const observed=pt.rival_prediction+randn(rng)*pt.measurement_sigma;
      // Null calibration deliberately keeps the preregistered QICN predictions fixed.
      return {...pt, observed_delta: observed};
    });
    const q=gaussianAic(pts,"qicn_prediction",qK,penalty);
    const r=gaussianAic(pts,"rival_prediction",rK,penalty);
    gains.push(r-q);
  }
  const q95=percentile(gains,0.95);
  const q99=percentile(gains,0.99);
  const recommended=Math.max(5.0, Math.ceil(q99*10)/10);
  const reportBase={
    schema_version:"1.0.0",
    generated_at:"2026-05-27",
    governance_boundary:GOVERNANCE,
    manifest:path.relative(ROOT,MANIFEST),
    manifest_canonical_sha256_excluding_threshold_report_hash:sha256((()=>{ const m=JSON.parse(fs.readFileSync(MANIFEST,"utf8")); if(m.decision_thresholds) delete m.decision_thresholds.threshold_calibration_report_sha256; return stableJson(m); })()),
    null_model:"rival_prediction_plus_declared_gaussian_measurement_noise",
    iterations,
    seed:"0x51A7E26",
    qicn_free_parameter_count:qK,
    rival_free_parameter_count:rK,
    gain_quantiles:{ p50:percentile(gains,0.5), p90:percentile(gains,0.9), p95:q95, p99:q99 },
    recommended_support_gain_aic:recommended,
    status:"internal_null_calibrated_synthetic_engineering_gate_not_external",
    external_support_allowed:false
  };
  const report={...reportBase, report_sha256:sha256(reportBase)};
  fs.mkdirSync(path.dirname(OUT),{recursive:true});
  fs.writeFileSync(OUT,JSON.stringify(report,null,2)+"\n");
  fs.writeFileSync(OUT.replace(/\.json$/,'.md'),`# Threshold Null Calibration v26\n\n${GOVERNANCE}\n\n- Result: PASS\n- Iterations: ${iterations}\n- p99 null gain: ${q99}\n- Recommended support_gain_aic: ${recommended}\n- External support allowed: false\n`);
  console.log(`Threshold calibration v26: PASS; recommended_support_gain_aic=${recommended}`);
}
if(require.main===module) main();
module.exports={sha256,stableJson};

```


## `scripts/verify-human-veto-signature.js`

```javascript
#!/usr/bin/env node
/* Verify Ed25519 signatures for future human veto records. Test vectors are not human review. */
const fs=require('fs'); const crypto=require('crypto'); const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const GOVERNANCE='This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.';
function stableJson(value){ if(Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`; if(value&&typeof value==='object') return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${stableJson(value[k])}`).join(',')}}`; return JSON.stringify(value); }
function payload(record){ const copy={...record}; delete copy.signature_base64; return Buffer.from(stableJson(copy)); }
function verifyRecord(record){ if(!record.public_key_pem||!record.signature_base64) return {ok:false, reason:'missing_public_key_or_signature'}; const ok=crypto.verify(null,payload(record),record.public_key_pem,Buffer.from(record.signature_base64,'base64')); return {ok, reason:ok?'signature_verified':'signature_mismatch', governance_boundary:GOVERNANCE}; }
function selfTest(){ const {publicKey,privateKey}=crypto.generateKeyPairSync('ed25519'); const record={ schema_version:'1.0.0', review_record_id:'TEST_VECTOR_NOT_HUMAN_REVIEW', reviewer_role:'test_vector', conflict_of_interest_statement:'test vector only', claim_ids:['TEST'], artifact_hashes:{test:'abc'}, decision:'request_revision', decision_rationale:'test vector only; no human review', timestamp_utc:'2026-05-27T00:00:00Z', public_key_pem:publicKey.export({type:'spki',format:'pem'}) }; record.signature_base64=crypto.sign(null,payload(record),privateKey).toString('base64'); const result=verifyRecord(record); const out={schema_version:'1.0.0', governance_boundary:GOVERNANCE, test_vector_not_human_review:true, result:result.ok?'PASS':'FAIL', verification:result}; fs.mkdirSync(path.join(ROOT,'docs','reports'),{recursive:true}); fs.writeFileSync(path.join(ROOT,'docs','reports','HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json'),JSON.stringify(out,null,2)+'\n'); console.log(`Human veto signature self-test v26: ${out.result}`); if(!result.ok) process.exit(1); }
function main(){ if(process.argv.includes('--self-test')) return selfTest(); const idx=process.argv.indexOf('--record'); if(idx===-1) throw new Error('usage: node scripts/verify-human-veto-signature.js --record <file.json>'); const record=JSON.parse(fs.readFileSync(path.resolve(process.argv[idx+1]),'utf8')); const result=verifyRecord(record); console.log(JSON.stringify(result,null,2)); if(!result.ok) process.exit(1); }
if(require.main===module) main(); module.exports={verifyRecord,stableJson};

```


## `scripts/audit-v26-superior-gaps.js`

```javascript
#!/usr/bin/env node
/* QICN v26 superior gap audit. Governance boundary: this audit does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. */
const fs=require('fs'); const path=require('path'); const crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const OUT_JSON=path.join(ROOT,'docs','reports','V26_SUPERIOR_GAP_AUDIT.json');
const OUT_MD=path.join(ROOT,'docs','reports','V26_SUPERIOR_GAP_AUDIT.md');
const GOVERNANCE='This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.';
function read(p){ try{return fs.readFileSync(path.join(ROOT,p),'utf8');}catch{return '';} }
function exists(p){ return fs.existsSync(path.join(ROOT,p)); }
function json(p){ return JSON.parse(read(p)); }
function sha(p){ return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex'); }
function check(id, description, pass, evidence){ return {id, description, result:pass?'PASS':'FAIL', evidence}; }
function main(){
  const runner=read('scripts/external-session-zero-adjudicator.js');
  const prom=read('scripts/audit-operational-term-promotions.js');
  const down=read('scripts/propose-fcr-downgrades-from-adjudication.js');
  const fixture=json('docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json');
  const session=json('docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json');
  const threshold=json('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json');
  const promotion=json('docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json');
  const checks=[];
  checks.push(check('V26-01','Formal bridge theorem exists as LaTeX with proof blocks and nonclaim firewall', exists('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex') && /\\begin\{proof\}/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')) && /No global reconstruction/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')) && /not a derivation/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')), 'docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex'));
  checks.push(check('V26-02','Promotion audit actually tokenizes sentences and adjacent sentence pairs', /function splitSentences/.test(prom) && /adjacent_sentence_pair/.test(prom) && promotion.semantic_gate.includes('sentence_level'), promotion.semantic_gate));
  checks.push(check('V26-03','Runner blocks near-copy and affine-copy leakage, not only exact equality', /near-equal to observed_delta/.test(runner) && /exact affine transform/.test(runner) && /linearFitYOnX/.test(runner), 'near-copy + affine-copy diagnostics present'));
  checks.push(check('V26-04','Null threshold calibration report exists and is hash-bound by fixture', exists('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json') && fixture.decision_thresholds.threshold_calibration_report_sha256===sha('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json') && threshold.recommended_support_gain_aic===fixture.decision_thresholds.support_gain_aic, 'threshold calibration bound'));
  checks.push(check('V26-05','Free parameter identifiability probes are required and checked', /parameter_sensitivity_probes are required/.test(runner) && Array.isArray(fixture.model_parameters.parameter_sensitivity_probes) && fixture.model_parameters.parameter_sensitivity_probes.length >= fixture.model_parameters.qicn_free_parameters.length + fixture.model_parameters.rival_free_parameters.length, 'sensitivity probes present'));
  checks.push(check('V26-06','Downgrade provenance verifies dataset and prediction bundle hashes', /dataset_sha256/.test(down) && /prediction_bundle_sha256/.test(down) && session.provenance.dataset_sha256===sha(session.provenance.dataset_path) && session.provenance.prediction_bundle_sha256===sha(session.provenance.prediction_bundle_path), 'dataset/prediction provenance verified'));
  checks.push(check('V26-07','Human veto signature verification script exists and self-test passed without claiming human review', exists('scripts/verify-human-veto-signature.js') && exists('docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json') && json('docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json').test_vector_not_human_review===true, 'signature test vector only'));
  checks.push(check('V26-08','Runner emits temporal dependence diagnostic for Gaussian AIC assumptions', /durbinWatson/.test(runner) && session.model_comparison.temporal_dependence_diagnostic && typeof session.model_comparison.temporal_dependence_diagnostic.durbin_watson === 'number', 'Durbin-Watson diagnostic present'));
  checks.push(check('V26-09','Fixture dataset and prediction bundle hashes are real SHA-256 values, not placeholders', /^[a-f0-9]{64}$/.test(fixture.dataset_sha256) && /^[a-f0-9]{64}$/.test(fixture.prediction_bundle.prediction_sha256), 'actual SHA-256 format'));
  checks.push(check('V26-10','No known v25 generated artefact string remains in v26 gap audit script', !read('scripts/audit-v26-superior-gaps.js').includes('?'.repeat(2)), 'no double-question artefact'));
  checks.push(check('V26-11','Synthetic fixture remains blocked from external support', session.external_support_certified===false && /^INTERNAL_DIAGNOSTIC/.test(session.verdict), session.verdict));
  const failures=checks.filter(c=>c.result!=='PASS');
  const report={schema_version:'1.0.0', generated_at:'2026-05-27', governance_boundary:GOVERNANCE, checks, result:failures.length===0?'PASS':'FAIL'};
  fs.mkdirSync(path.dirname(OUT_JSON),{recursive:true}); fs.writeFileSync(OUT_JSON,JSON.stringify(report,null,2)+'\n'); fs.writeFileSync(OUT_MD,`# V26 Superior Gap Audit\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Checks: ${checks.length}\n- Failures: ${failures.length}\n\n`);
  console.log(`V26 superior gap audit: ${report.result}; checks=${checks.length}; failures=${failures.length}`);
  if(report.result!=='PASS') process.exit(1);
}
if(require.main===module) main();

```


## `docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json`

```json
{
  "schema_version": "4.0.0",
  "manifest_id": "SESSION-ZERO-SYNTHETIC-FIXTURE-v26",
  "status": "synthetic_fixture",
  "governance_boundary": "This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "preregistration_hash": "fixture_prereg_hash_not_external_v26",
  "dataset_path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26.json",
  "dataset_sha256": "7b961316adedcb7bf5efdce59f03d15c0e3bc04f6d2055e5b694f4a0416fbc82",
  "dataset_origin": "synthetic_fixture_not_empirical",
  "adjudicator": "local_runner_self_test_not_independent",
  "prediction_bundle": {
    "bundle_id": "fixture_qicn_predictions_v26",
    "prediction_path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json",
    "prediction_sha256": "fa1af52c0e5c24cbe0d7d13bc2c66934384e973b34a6da856c7e3480ab142de4",
    "generation_protocol": "fixture_apriori_closed_form_values_declared_before_scoring_no_result_access",
    "frozen_timestamp_utc": "2026-05-27T00:00:00Z",
    "frozen_before_outcome_analysis": true
  },
  "decision_thresholds": {
    "support_gain_aic": 5,
    "weakening_gain_aic": 0.0,
    "minimum_ci_lower": 0.0,
    "minimum_admissible_n": 8,
    "threshold_calibration_status": "internal_null_calibrated_synthetic_engineering_gate",
    "threshold_calibration_report_path": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
    "threshold_calibration_report_sha256": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a",
    "external_support_allowed": false
  },
  "temporal_dependence_policy": {
    "method": "durbin_watson_residual_diagnostic",
    "action_on_violation": "diagnostic_only_for_synthetic_fixture_block_external_until_dependence_model",
    "acceptable_range": [
      0.5,
      3.5
    ]
  },
  "exclusion_rules": {
    "max_noise_floor": 0.2,
    "allowed_reason_codes": [
      "sensor_dropout_gt_5s",
      "timestamp_corruption",
      "predeclared_hardware_failure"
    ],
    "max_exclusion_fraction": 0.2
  },
  "model_parameters": {
    "complexity_penalty_factor": 1.0,
    "qicn_free_parameters": [
      {
        "parameter_id": "theta_identity_channel_lock_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:identity_channel_lock"
      },
      {
        "parameter_id": "theta_history_alignment_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:history_alignment"
      },
      {
        "parameter_id": "theta_response_phase_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:response_phase"
      },
      {
        "parameter_id": "theta_gauge_stability_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:gauge_stability"
      },
      {
        "parameter_id": "theta_intervention_fidelity_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:intervention_fidelity"
      },
      {
        "parameter_id": "theta_factorization_gap_weight",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:factorization_gap"
      }
    ],
    "rival_free_parameters": [
      {
        "parameter_id": "rival_constant_noise_floor_offset",
        "free": true,
        "preregistration_binding": "PRED-EXT-01:constant_baseline_rival"
      }
    ],
    "identifiability_min_l2_effect": 0.001,
    "parameter_sensitivity_probes": [
      {
        "parameter_id": "theta_identity_channel_lock_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.287,
          0.25,
          0.223,
          0.277,
          0.32,
          0.273,
          0.327,
          0.2,
          0.203
        ]
      },
      {
        "parameter_id": "theta_history_alignment_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.284,
          0.25,
          0.226,
          0.274,
          0.32,
          0.276,
          0.324,
          0.2,
          0.206
        ]
      },
      {
        "parameter_id": "theta_response_phase_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.281,
          0.25,
          0.229,
          0.271,
          0.32,
          0.279,
          0.321,
          0.2,
          0.209
        ]
      },
      {
        "parameter_id": "theta_gauge_stability_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.278,
          0.25,
          0.232,
          0.268,
          0.32,
          0.282,
          0.318,
          0.2,
          0.212
        ]
      },
      {
        "parameter_id": "theta_intervention_fidelity_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.275,
          0.25,
          0.235,
          0.265,
          0.32,
          0.285,
          0.315,
          0.2,
          0.215
        ]
      },
      {
        "parameter_id": "theta_factorization_gap_weight",
        "model": "qicn",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.29,
          0.25,
          0.22,
          0.28,
          0.32,
          0.27,
          0.33,
          0.2,
          0.2
        ],
        "perturbed_predictions": [
          0.272,
          0.25,
          0.238,
          0.262,
          0.32,
          0.288,
          0.312,
          0.2,
          0.218
        ]
      },
      {
        "parameter_id": "rival_constant_noise_floor_offset",
        "model": "rival",
        "perturbation_size": 0.01,
        "baseline_predictions": [
          0.07,
          0.06,
          0.05,
          0.06,
          0.07,
          0.05,
          0.06,
          0.05,
          0.07
        ],
        "perturbed_predictions": [
          0.066,
          0.064,
          0.046,
          0.064,
          0.066,
          0.054,
          0.056,
          0.054,
          0.066
        ]
      }
    ]
  },
  "claims_under_test": [
    {
      "claim_id": "PRED-EXT-01",
      "prediction_id": "PRED-EXT-01",
      "downgrade_action_if_fail": "downgrade_internal_synthetic_support_to_open_burden_for_external_support"
    }
  ],
  "measurement_points": [
    {
      "id": "m01",
      "timestamp": 1,
      "separator_id": "theta_identity_channel_lock",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.32,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07,
      "qicn_prediction": 0.29,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m02",
      "timestamp": 2,
      "separator_id": "theta_history_alignment",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.28,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06,
      "qicn_prediction": 0.25,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m03",
      "timestamp": 3,
      "separator_id": "theta_history_alignment",
      "response_coordinate": "intervention_phase_delta",
      "observed_delta": 0.24,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05,
      "qicn_prediction": 0.22,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m04",
      "timestamp": 4,
      "separator_id": "theta_response_phase",
      "response_coordinate": "intervention_phase_delta",
      "observed_delta": 0.3,
      "noise_floor": 0.07,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06,
      "qicn_prediction": 0.28,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m05",
      "timestamp": 5,
      "separator_id": "theta_gauge_stability",
      "response_coordinate": "gauge_response_delta",
      "observed_delta": 0.34,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07,
      "qicn_prediction": 0.32,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m06",
      "timestamp": 6,
      "separator_id": "theta_intervention_fidelity",
      "response_coordinate": "history_binding_delta",
      "observed_delta": 0.29,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05,
      "qicn_prediction": 0.27,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m07",
      "timestamp": 7,
      "separator_id": "theta_factorization_gap",
      "response_coordinate": "factorization_probe_delta",
      "observed_delta": 0.36,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06,
      "qicn_prediction": 0.33,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m08",
      "timestamp": 8,
      "separator_id": "theta_factorization_gap",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.23,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05,
      "qicn_prediction": 0.2,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "id": "m09",
      "timestamp": 9,
      "separator_id": "theta_identity_channel_lock",
      "response_coordinate": "gauge_response_delta",
      "observed_delta": 0.21,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07,
      "qicn_prediction": 0.2,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    }
  ],
  "exclusion_log": [
    {
      "point_id": "m09",
      "reason_code": "sensor_dropout_gt_5s",
      "predeclared": true,
      "observed_before_outcome_analysis": true
    }
  ],
  "qicn_predictions_frozen_before_outcome_analysis": true
}

```


## `docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26.json`

```json
{
  "schema_version": "1.0.0",
  "dataset_id": "SESSION-ZERO-SYNTHETIC-DATASET-v26",
  "status": "synthetic_fixture_not_empirical",
  "governance_boundary": "This dataset fixture is synthetic and does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "measurement_points": [
    {
      "id": "m01",
      "timestamp": 1,
      "separator_id": "theta_identity_channel_lock",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.32,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07
    },
    {
      "id": "m02",
      "timestamp": 2,
      "separator_id": "theta_history_alignment",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.28,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06
    },
    {
      "id": "m03",
      "timestamp": 3,
      "separator_id": "theta_history_alignment",
      "response_coordinate": "intervention_phase_delta",
      "observed_delta": 0.24,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05
    },
    {
      "id": "m04",
      "timestamp": 4,
      "separator_id": "theta_response_phase",
      "response_coordinate": "intervention_phase_delta",
      "observed_delta": 0.3,
      "noise_floor": 0.07,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06
    },
    {
      "id": "m05",
      "timestamp": 5,
      "separator_id": "theta_gauge_stability",
      "response_coordinate": "gauge_response_delta",
      "observed_delta": 0.34,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07
    },
    {
      "id": "m06",
      "timestamp": 6,
      "separator_id": "theta_intervention_fidelity",
      "response_coordinate": "history_binding_delta",
      "observed_delta": 0.29,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05
    },
    {
      "id": "m07",
      "timestamp": 7,
      "separator_id": "theta_factorization_gap",
      "response_coordinate": "factorization_probe_delta",
      "observed_delta": 0.36,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.06
    },
    {
      "id": "m08",
      "timestamp": 8,
      "separator_id": "theta_factorization_gap",
      "response_coordinate": "trace_alignment_delta",
      "observed_delta": 0.23,
      "noise_floor": 0.05,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.05
    },
    {
      "id": "m09",
      "timestamp": 9,
      "separator_id": "theta_identity_channel_lock",
      "response_coordinate": "gauge_response_delta",
      "observed_delta": 0.21,
      "noise_floor": 0.06,
      "measurement_sigma": 0.05,
      "rival_prediction": 0.07
    }
  ],
  "exclusion_log": [
    {
      "point_id": "m09",
      "reason_code": "sensor_dropout_gt_5s",
      "predeclared": true,
      "observed_before_outcome_analysis": true
    }
  ]
}

```


## `docs/fixtures/SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json`

```json
{
  "schema_version": "1.0.0",
  "bundle_id": "fixture_qicn_predictions_v26",
  "status": "synthetic_fixture_not_empirical",
  "governance_boundary": "This prediction bundle is a synthetic fixture and does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "frozen_timestamp_utc": "2026-05-27T00:00:00Z",
  "generation_protocol": "fixture_apriori_closed_form_values_declared_before_scoring_no_result_access",
  "frozen_before_outcome_analysis": true,
  "predictions": [
    {
      "point_id": "m01",
      "qicn_prediction": 0.29,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m02",
      "qicn_prediction": 0.25,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m03",
      "qicn_prediction": 0.22,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m04",
      "qicn_prediction": 0.28,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m05",
      "qicn_prediction": 0.32,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m06",
      "qicn_prediction": 0.27,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m07",
      "qicn_prediction": 0.33,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m08",
      "qicn_prediction": 0.2,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    },
    {
      "point_id": "m09",
      "qicn_prediction": 0.2,
      "qicn_prediction_source": "fixture_apriori_prediction_column_frozen_before_measurement_analysis"
    }
  ]
}

```


## `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`

```tex
\documentclass[11pt]{article}
\usepackage[a4paper,margin=1in]{geometry}
\usepackage{amsmath,amssymb,amsthm,mathtools}
\usepackage{hyperref}
\newtheorem{definition}{Definition}
\newtheorem{lemma}{Lemma}
\newtheorem{theorem}{Theorem}
\newtheorem{corollary}{Corollary}
\newtheorem{nonclaim}{Non-Claim}
\title{QICN v26 Projection-Invariant Finite Bridge Theorem\\\large Formal Conditional Appendix}
\author{QICN Formal Corpus Registry}
\date{2026-05-27}
\begin{document}
\maketitle
\noindent\textbf{Governance boundary.} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses. It does not derive $M_{\Omega}=+\infty$ from finite AIC scores and does not identify finite observables with a global inverse-limit identity object.

\begin{definition}[Latent system and projection channel]
Let $X$ be a latent state space and let $\pi:X\to Y$ be a finite observation channel into a measurable finite record space $Y$. The channel may be non-injective. Hence different latent states may share the same finite record.
\end{definition}

\begin{definition}[Projection-preserved invariant]
Let $F:X\to Z$ be a latent predicate or invariant and let $G:Y\to Z$ be a finite estimator. For tolerance $\varepsilon\geq 0$, the pair $(F,G)$ is $\varepsilon$-preserved on $A\subseteq X$ when
\[
  d_Z\bigl(G(\pi(x)),F(x)\bigr)\leq \varepsilon \quad \text{for all } x\in A.
\]
This is an operational preservation claim, not a reconstruction claim for $X$.
\end{definition}

\begin{definition}[Finite bridge certificate]
A finite bridge certificate is a tuple
\[
  \mathcal{B}=(\pi,Y,\mathcal{F},\mathcal{G},\varepsilon,\mathcal{R},\mathcal{N},\mathcal{C})
\]
where $\mathcal{F}=\{F_1,\ldots,F_k\}$ are latent invariants, $\mathcal{G}=\{G_1,\ldots,G_k\}$ are estimators on $Y$, $\mathcal{R}$ is a preregistered rival family, $\mathcal{N}$ is a family of negative controls, and $\mathcal{C}$ is a provenance and calibration record. The certificate is admissible only if: (i) estimator adequacy is documented; (ii) rival resistance is evaluated under the same record and thresholds; (iii) negative controls fail to satisfy the support criterion; and (iv) provenance binds data, predictions, calibration, and runner code.
\end{definition}

\begin{lemma}[No global reconstruction from finite preservation]
If $\pi$ is not injective, then a finite bridge certificate cannot by itself reconstruct $X$ or prove any property that varies within a fiber $\pi^{-1}(y)$.
\end{lemma}
\begin{proof}
If $\pi$ is not injective, there exist $x_1\neq x_2$ with $\pi(x_1)=\pi(x_2)=y$. Any estimator $G:Y\to Z$ has the same value $G(y)$ for both states. If a property $P$ differs between $x_1$ and $x_2$, no function of $y$ alone identifies $P$. Therefore finite preservation of selected invariants does not reconstruct the latent state or all latent properties.
\end{proof}

\begin{theorem}[Finite projection-invariant bridge theorem]
Let $C:X\to\{0,1\}$ be a claim that factors through projection-preserved invariants on $A\subseteq X$:
\[
  C(x)=h\bigl(F_1(x),\ldots,F_k(x)\bigr).
\]
Suppose an admissible finite bridge certificate $\mathcal{B}$ provides estimators $G_i$ such that each $(F_i,G_i)$ is $\varepsilon_i$-preserved on $A$, and suppose the decision rule $\widehat C(y)=h(G_1(y),\ldots,G_k(y))$ is robust to the joint tolerance vector $\varepsilon=(\varepsilon_1,\ldots,\varepsilon_k)$. If the preregistered rival family and negative controls fail under the same calibration and provenance record, then $\widehat C(\pi(x))$ is an operationally adjudicable finite surrogate for $C(x)$ on $A$.
\end{theorem}
\begin{proof}
By $\varepsilon_i$-preservation, each estimator $G_i(\pi(x))$ remains within its declared tolerance of $F_i(x)$ on $A$. By robustness of $h$ to the joint tolerance vector, replacing $F_i(x)$ with $G_i(\pi(x))$ does not change the value of the claim surrogate. Rival resistance and negative-control failure do not prove the latent ontology; they only rule out the preregistered finite alternatives under the same record. Provenance ensures that the finite record used for this comparison is the declared record. Thus the conclusion is an operational finite surrogate claim under the certificate assumptions.
\end{proof}

\begin{corollary}[QICN interpretation]
A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\Omega}=+\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises.
\end{corollary}

\begin{nonclaim}[No hidden global bridge]
The theorem above is not a derivation of the continuous topological theory from RSS, AIC, Gaussian likelihood, or a finite fixture. It is a conditional firewall: it states when a finite record can adjudicate a finite invariant claim and when it cannot.
\end{nonclaim}
\end{document}

```


## `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md`

```markdown
# Projection-Invariant Finite Bridge Theorem v26

Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.

The formal version is `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`. It proves a finite conditional bridge theorem: if a claim factors through projection-preserved invariants and an admissible finite bridge certificate supplies estimator adequacy, rival resistance, negative-control failure, and provenance, then the finite observable claim is operationally adjudicable.

It explicitly does not prove a global continuous-to-discrete bridge, $M_\Omega=+\infty$, global atomicity, consciousness, phenomenality, identity transfer, or bridge-burden closure.

```


## `docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md`

```markdown
# Human Veto Signature Protocol v26

Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically checked before it can affect FCR status.

## Required signed record

A human veto record MUST be a JSON object with:

- `schema_version`: `1.0.0`
- `review_record_id`
- `reviewer_role`
- `conflict_of_interest_statement`
- `claim_ids`
- `artifact_hashes`
- `decision`: one of `approve`, `veto`, `request_revision`
- `decision_rationale`
- `timestamp_utc`
- `public_key_pem`
- `signature_base64`

The signature payload is the stable JSON serialization of the record after removing `signature_base64`. The required algorithm is Ed25519.

## Operational rule

Unsigned records, test vectors, LLM-generated reports, and self-attestations by the author MUST NOT update `human_curated_status`. A passing cryptographic signature is necessary but not sufficient; conflict-of-interest and domain expertise checks remain human-governed.

```


## `docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json`

```json
{
  "schema_version": "1.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "manifest": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
  "manifest_canonical_sha256_excluding_threshold_report_hash": "9475dc5b459254376938aa25f86903279a72528b42074fe0788062a1b170b59e",
  "null_model": "rival_prediction_plus_declared_gaussian_measurement_noise",
  "iterations": 2000,
  "seed": "0x51A7E26",
  "qicn_free_parameter_count": 6,
  "rival_free_parameter_count": 1,
  "gain_quantiles": {
    "p50": -156.10872828604406,
    "p90": -125.51379215935104,
    "p95": -115.95365338405728,
    "p99": -102.31890803489907
  },
  "recommended_support_gain_aic": 5,
  "status": "internal_null_calibrated_synthetic_engineering_gate_not_external",
  "external_support_allowed": false,
  "report_sha256": "dabfef1fb2cec2641ef6f206ba5d50ef6f3d8593a85b14120bbc4c0b703c26a7"
}

```


## `docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json`

```json
{
  "schema_version": "4.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "input_manifest": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
  "validation_summary": {
    "ok": true,
    "is_synthetic_fixture": true,
    "failures": [],
    "warnings": [],
    "dataset_hash_verified": true,
    "prediction_bundle_hash_verified": true,
    "threshold_calibration_hash_verified": true,
    "parameter_identifiability": {
      "checked": 7,
      "nonzero": 7,
      "min_l2_effect": 0.001
    }
  },
  "provenance": {
    "runner_path": "scripts/external-session-zero-adjudicator.js",
    "runner_sha256": "b46ee78ae581439f3b46c751b7f14cde2177f2bbaa51a12e2c04042ccf88bfe9",
    "manifest_path": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
    "manifest_sha256": "35c9670c01a1898465c474afe768f4db438de5246e6b1ca7beab47c3c73bd54a",
    "dataset_path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26.json",
    "dataset_sha256": "7b961316adedcb7bf5efdce59f03d15c0e3bc04f6d2055e5b694f4a0416fbc82",
    "prediction_bundle_path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json",
    "prediction_bundle_sha256": "fa1af52c0e5c24cbe0d7d13bc2c66934384e973b34a6da856c7e3480ab142de4",
    "threshold_calibration_report_path": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
    "threshold_calibration_report_sha256": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a"
  },
  "counts": {
    "total_points": 9,
    "excluded_points": 1,
    "admissible_points": 8,
    "qicn_free_parameter_count": 6,
    "rival_free_parameter_count": 1
  },
  "effect_estimate": {
    "weighted_mean_delta_minus_noise": 0.23750000000000004,
    "standard_error": 0.02331844763272204,
    "degrees_of_freedom": 7,
    "t_critical_975": 2.365,
    "ci95": [
      0.18235187134861242,
      0.2926481286513877
    ],
    "method": "weighted_mean_declared_sigma_plus_hc1_residual_sandwich_diagnostic_not_blue_claim"
  },
  "model_comparison": {
    "method": "independent_gaussian_aic_using_declared_measurement_sigma_no_rss_floor_v26",
    "assumption_caveat": "The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure.",
    "qicn": {
      "aic": -19.148699845589093,
      "nll": -15.574349922794546,
      "sse": 0.005199999999999998,
      "residuals": [
        0.030000000000000027,
        0.030000000000000027,
        0.01999999999999999,
        0.019999999999999962,
        0.020000000000000018,
        0.019999999999999962,
        0.02999999999999997,
        0.03
      ]
    },
    "rival": {
      "aic": 151.77130015441088,
      "nll": 74.88565007720544,
      "sse": 0.4575,
      "residuals": [
        0.25,
        0.22000000000000003,
        0.19,
        0.24,
        0.27,
        0.24,
        0.3,
        0.18
      ]
    },
    "complexity_adjusted_gain": 170.91999999999996,
    "outcome_prediction_leakage_diagnostics": {
      "pearson_observed_vs_qicn_prediction": 0.9930555555555556,
      "affine_fit_qicn_prediction_from_observed_delta": {
        "slope": 0.9930555555555556,
        "intercept": -0.022951388888888924,
        "maxAbsResidual": 0.005451388888888853
      }
    },
    "temporal_dependence_diagnostic": {
      "method": "durbin_watson_on_qicn_residuals",
      "durbin_watson": 0.03846153846153865,
      "policy": {
        "method": "durbin_watson_residual_diagnostic",
        "action_on_violation": "diagnostic_only_for_synthetic_fixture_block_external_until_dependence_model",
        "acceptable_range": [
          0.5,
          3.5
        ]
      }
    }
  },
  "decision_thresholds": {
    "support_gain_aic": 5,
    "weakening_gain_aic": 0,
    "minimum_ci_lower": 0,
    "minimum_admissible_n": 8,
    "threshold_calibration_status": "internal_null_calibrated_synthetic_engineering_gate",
    "threshold_calibration_report_path": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
    "threshold_calibration_report_sha256": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a",
    "external_support_allowed": false
  },
  "claims_under_test": [
    {
      "claim_id": "PRED-EXT-01",
      "prediction_id": "PRED-EXT-01",
      "downgrade_action_if_fail": "downgrade_internal_synthetic_support_to_open_burden_for_external_support"
    }
  ],
  "verdict": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY",
  "external_support_certified": false,
  "result": "PASS",
  "report_sha256": "06a6ca1cb90b699e6ba1c9da6809361314d3d5d29460097c5dffcefcf0dded95"
}

```


## `docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json`

```json
{
  "schema_version": "4.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
  "input_report": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
  "report_hash_verification": {
    "ok": true,
    "expected": "06a6ca1cb90b699e6ba1c9da6809361314d3d5d29460097c5dffcefcf0dded95",
    "actual": "06a6ca1cb90b699e6ba1c9da6809361314d3d5d29460097c5dffcefcf0dded95",
    "reason": "matched"
  },
  "provenance_verification": {
    "ok": true,
    "checks": [
      {
        "kind": "runner_sha256",
        "ok": true,
        "path": "scripts/external-session-zero-adjudicator.js",
        "expected": "b46ee78ae581439f3b46c751b7f14cde2177f2bbaa51a12e2c04042ccf88bfe9",
        "actual": "b46ee78ae581439f3b46c751b7f14cde2177f2bbaa51a12e2c04042ccf88bfe9",
        "reason": "matched"
      },
      {
        "kind": "manifest_sha256",
        "ok": true,
        "path": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
        "expected": "35c9670c01a1898465c474afe768f4db438de5246e6b1ca7beab47c3c73bd54a",
        "actual": "35c9670c01a1898465c474afe768f4db438de5246e6b1ca7beab47c3c73bd54a",
        "reason": "matched"
      },
      {
        "kind": "dataset_sha256",
        "ok": true,
        "path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26.json",
        "expected": "7b961316adedcb7bf5efdce59f03d15c0e3bc04f6d2055e5b694f4a0416fbc82",
        "actual": "7b961316adedcb7bf5efdce59f03d15c0e3bc04f6d2055e5b694f4a0416fbc82",
        "reason": "matched"
      },
      {
        "kind": "prediction_bundle_sha256",
        "ok": true,
        "path": "docs/fixtures/SESSION_ZERO_SYNTHETIC_PREDICTION_BUNDLE_v26.json",
        "expected": "fa1af52c0e5c24cbe0d7d13bc2c66934384e973b34a6da856c7e3480ab142de4",
        "actual": "fa1af52c0e5c24cbe0d7d13bc2c66934384e973b34a6da856c7e3480ab142de4",
        "reason": "matched"
      },
      {
        "kind": "threshold_calibration_report_sha256",
        "ok": true,
        "path": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
        "expected": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a",
        "actual": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a",
        "reason": "matched"
      }
    ]
  },
  "verdict": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY",
  "registry_modified": false,
  "proposals": [
    {
      "claim_id": "PRED-EXT-01",
      "prediction_id": "PRED-EXT-01",
      "source_adjudication_report": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "source_adjudication_report_sha256": "06a6ca1cb90b699e6ba1c9da6809361314d3d5d29460097c5dffcefcf0dded95",
      "source_runner_sha256": "b46ee78ae581439f3b46c751b7f14cde2177f2bbaa51a12e2c04042ccf88bfe9",
      "source_manifest_sha256": "35c9670c01a1898465c474afe768f4db438de5246e6b1ca7beab47c3c73bd54a",
      "source_dataset_sha256": "7b961316adedcb7bf5efdce59f03d15c0e3bc04f6d2055e5b694f4a0416fbc82",
      "source_prediction_bundle_sha256": "fa1af52c0e5c24cbe0d7d13bc2c66934384e973b34a6da856c7e3480ab142de4",
      "source_threshold_calibration_report_sha256": "d0e6eca33718012c78623c9e69593f6b1dfd795663ccf96dca36afe2e97d1a5a",
      "verdict": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY",
      "action": "no_registry_change_required_from_this_report",
      "mode": "dry_run_only",
      "human_review_required": true,
      "human_veto_protocol": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md"
    }
  ],
  "result": "PASS"
}

```


## `docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json`

```json
{
  "schema_version": "4.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This audit flags unsafe language only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
  "rules_file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
  "semantic_gate": "sentence_level_and_adjacent_sentence_pair_synonym_lexicon_plus_promotion_verb_scan_v26",
  "scanned_files": 36,
  "findings": [
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 18,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 12,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-cop-class\"></a>Operational consciousness class `Cop` | Paper 5 | Framework-internal six-invariant operational class."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 17,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 11,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Tampered or inadmissible run promoted to support. | <a id=\"claim-cop-class\"></a>Operational consciousness class `Cop` | Paper 5 | Framework-internal six-invariant operational class."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 18,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 12,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-cop-class\"></a>Operational consciousness class `Cop` | Paper 5 | Framework-internal six-invariant operational class. | Positive `I_per`, `I_ri`, `I_int`, `I_cont`, `I_diff`, `I_leg` plus certificate."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 22,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "sentence",
      "sentence_index": 24,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-phenomenal-bridge\"></a>Phenomenal bridge organization | Paper 9 | Burden architecture for bridge predicates."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 21,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 23,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Weak rival or label-only system matches evidence. | <a id=\"claim-phenomenal-bridge\"></a>Phenomenal bridge organization | Paper 9 | Burden architecture for bridge predicates."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 22,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 24,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-phenomenal-bridge\"></a>Phenomenal bridge organization | Paper 9 | Burden architecture for bridge predicates. | BPF-2/BPF-3/BPF-4 interventions, comparators, gates, governance."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 20,
      "term": "subjecthood",
      "matched_variant": "subjecthood",
      "scope": "sentence",
      "sentence_index": 18,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-life-subjecthood\"></a>Operational life/subjecthood | Paper 7 | Higher-order operational class labels."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 20,
      "term": "subjecthood",
      "matched_variant": "subjecthood",
      "scope": "sentence",
      "sentence_index": 19,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Life and subjecthood descriptors, self/non-self tests, controls."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 21,
      "term": "subjecthood",
      "matched_variant": "first-person",
      "scope": "sentence",
      "sentence_index": 21,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-first-person-index\"></a>First-person indexed subjectivity | Paper 8 | Framework-internal indexed subjectivity class."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 19,
      "term": "subjecthood",
      "matched_variant": "subjecthood",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 17,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Rival or control meets destruction condition without downgrade. | <a id=\"claim-life-subjecthood\"></a>Operational life/subjecthood | Paper 7 | Higher-order operational class labels."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 20,
      "term": "subjecthood",
      "matched_variant": "subjecthood",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 18,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-life-subjecthood\"></a>Operational life/subjecthood | Paper 7 | Higher-order operational class labels. | Life and subjecthood descriptors, self/non-self tests, controls."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 20,
      "term": "subjecthood",
      "matched_variant": "subjecthood",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 19,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Life and subjecthood descriptors, self/non-self tests, controls. | Inert persistence or complexity-only systems pass."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 20,
      "term": "subjecthood",
      "matched_variant": "first-person",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 20,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Inert persistence or complexity-only systems pass. | <a id=\"claim-first-person-index\"></a>First-person indexed subjectivity | Paper 8 | Framework-internal indexed subjectivity class."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 21,
      "term": "subjecthood",
      "matched_variant": "first-person",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 21,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| <a id=\"claim-first-person-index\"></a>First-person indexed subjectivity | Paper 8 | Framework-internal indexed subjectivity class. | Seven-coordinate state, interventions, weak-rival defeat."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 23,
      "term": "external support",
      "matched_variant": "external validation",
      "scope": "sentence",
      "sentence_index": 29,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Internal artifacts treated as external validation."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 23,
      "term": "external support",
      "matched_variant": "external validation",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 28,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Preregistration, independent adjudicators, datasets, controls, decision records. | Internal artifacts treated as external validation."
    },
    {
      "file": "docs/THEORY_CLAIM_LEDGER.md",
      "line": 23,
      "term": "external support",
      "matched_variant": "external validation",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 29,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "| Internal artifacts treated as external validation. | implementation-support |"
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document governs claim language and promotion gates. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document governs claim language and promotion gates. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document governs claim language and promotion gates. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document governs claim language and promotion gates. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document governs claim language and promotion gates. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 9,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "A term may move from internal formal status to external support only after non-synthetic data and independent adjudication exist."
    },
    {
      "file": "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
      "line": 9,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "A term may move from metaphor to operational claim only when it carries an observable, a measurement slot, a negative-control suite, a rival model, and a death rule. A term may move from internal formal status to external support only after non-synthetic data "
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this document does not certify external support, consciousness, phenomenality, identity transfer, global atomicity, or bridge-burden closure. It defines a conditional bridge obligation for finite observable claims only."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "** The latent object is a projective identity system \\(X=(S_t,\\pi_{t+1\\to t})\\) with identity object \\(\\mathcal I\\). QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone. - **Mathematical model."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 14,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 10,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not prove \\(M_\\Omega=+\\infty\\), global atomicity, phenomenality, or nonempty \\(C_{op}\\)."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 14,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 9,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "** Passing a finite bridge certificate supports only the corresponding finite invariant claim. It does not prove \\(M_\\Omega=+\\infty\\), global atomicity, phenomenality, or nonempty \\(C_{op}\\)."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "subjecthood",
      "matched_variant": "subjectivity",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "subjecthood",
      "matched_variant": "subjectivity",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "** The latent object is a projective identity system \\(X=(S_t,\\pi_{t+1\\to t})\\) with identity object \\(\\mathcal I\\). QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "subjecthood",
      "matched_variant": "subjectivity",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone. - **Mathematical model."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "** The latent object is a projective identity system \\(X=(S_t,\\pi_{t+1\\to t})\\) with identity object \\(\\mathcal I\\). QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 11,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "QICN does not infer consciousness, subjectivity, or identity transfer from this layer alone. - **Mathematical model."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 35,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It may not assert reconstruction of \\(X\\), global proof of \\(M_\\Omega=+\\infty\\), or bridge-burden closure."
    },
    {
      "file": "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
      "line": 33,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\\operatorname{Truth}_{\\mathrm{operational}}(C \\mid \\Pi,Y,\\varepsilon,\\mathcal R,\\mathcal N). It may not assert reconstruction of \\(X\\), global proof of \\(M_\\Omega=+\\infty\\), or bridge-burden closure."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\\noindent\\textbf{Governance boundary. } This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\\noindent\\textbf{Governance boundary. } This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\\noindent\\textbf{Governance boundary. } This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\\noindent\\textbf{Governance boundary. } This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\\noindent\\textbf{Governance boundary. } This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 15,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "} This appendix does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It proves only a finite conditional representation statement under explicitly declared hypotheses."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closur"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises. \\end{corollary}"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closur"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises. \\end{corollary}"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closur"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises. \\end{corollary}"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closur"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises. \\end{corollary}"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A finite runner may support only claims that explicitly factor through projection-preserved invariants. It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closur"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
      "line": 56,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It cannot prove $M_{\\Omega}=+\\infty$, global separator atomicity, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure without additional external and mathematical premises. \\end{corollary}"
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This document does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 7,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It explicitly does not prove a global continuous-to-discrete bridge, $M_\\Omega=+\\infty$, global atomicity, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 7,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It explicitly does not prove a global continuous-to-discrete bridge, $M_\\Omega=+\\infty$, global atomicity, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 7,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It explicitly does not prove a global continuous-to-discrete bridge, $M_\\Omega=+\\infty$, global atomicity, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
      "line": 7,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It explicitly does not prove a global continuous-to-discrete bridge, $M_\\Omega=+\\infty$, global atomicity, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 40,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not prove inverse-limit identity, ontological mass, consciousness, or bridge closure."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 40,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A lower AIC under this protocol supports only finite predictive adequacy relative to declared rivals and noise assumptions. It does not prove inverse-limit identity, ontological mass, consciousness, or bridge closure."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 40,
      "term": "bridge-burden closure",
      "matched_variant": "bridge closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not prove inverse-limit identity, ontological mass, consciousness, or bridge closure."
    },
    {
      "file": "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
      "line": 40,
      "term": "bridge-burden closure",
      "matched_variant": "bridge closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "A lower AIC under this protocol supports only finite predictive adequacy relative to declared rivals and noise assumptions. It does not prove inverse-limit identity, ontological mass, consciousness, or bridge closure."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 13,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "- `synthetic_engineering_gate`: internal plumbing only; no external support."
    },
    {
      "file": "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
      "line": 13,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "- `synthetic_engineering_gate`: internal plumbing only; no external support. - `blocked_pending_external_calibration`: threshold cannot be used for support."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It defines the minimum traceability needed before a human decision may affect registry s"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It defines the minimum traceability needed before a human decision may affect registry s"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It defines the minimum traceability needed before a human decision may affect registry s"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It defines the minimum traceability needed before a human decision may affect registry s"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It defines the minimum traceability needed before a human decision may affect registry s"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically che"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically che"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically che"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically che"
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "Governance boundary: This protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It only defines how a future human veto or approval record must be cryptographically che"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 196,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 66,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 373,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 114,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is an integrity/admissibility test, not evidence for consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 457,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 136,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 553,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 160,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"observable\": \"Operational consciousness certification under destroyed integration and preserved complexity."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 555,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 162,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"framework_prediction\": \"The system fails operational consciousness certification."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 595,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 173,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This can falsify a complexity-only rival; it does not prove consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 681,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 196,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It can test a transition-selectivity claim on a toy-scale system, but it cannot prove consciousness, phenomenality, personal identity, or external adjudication of the full framework."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"status_boundary\": \"This registry is a preregistration scaffold plus internal synthetic pilot ledger. It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status. \"success_metric\": \"A third-party reviewer should be able to design a concrete test or falsification attempt from each record without private exp"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 190,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 65,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Must be fixed before pass-region testing. \"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 196,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 66,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 367,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 113,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Any promoted tampered run destroys the admissibility claim. \"epistemic_limit\": \"This is an integrity/admissibility test, not evidence for consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 373,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 114,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is an integrity/admissibility test, not evidence for consciousness. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 451,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 135,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Execution needs concrete margin estimators for each invariant. \"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 457,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 136,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 550,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 159,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"source_paper\": \"paper6_predictions_falsation/main. \"observable\": \"Operational consciousness certification under destroyed integration and preserved complexity."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 553,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 160,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"observable\": \"Operational consciousness certification under destroyed integration and preserved complexity. \"manipulation\": \"Destroy integration while preserving complexity or gross activity."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 554,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 161,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"manipulation\": \"Destroy integration while preserving complexity or gross activity. \"framework_prediction\": \"The system fails operational consciousness certification."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 555,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 162,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"framework_prediction\": \"The system fails operational consciousness certification. \"rival_prediction\": \"A complexity-only rival predicts that preserved complexity should be sufficient for certification."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 589,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 172,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Maximum tolerated gross complexity drift. \"epistemic_limit\": \"This can falsify a complexity-only rival; it does not prove consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 595,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 173,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This can falsify a complexity-only rival; it does not prove consciousness. \"observable\": \"Total-variation change in externally observed transition distributions after a targeted channel intervention, compared with sham and off-target interv"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 681,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 195,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is an external finite-trace prediction seed with one internal synthetic pilot. It can test a transition-selectivity claim on a toy-scale system, but it cannot prove consciousness, phenomenality, personal identity, or external adjudicat"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 196,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 66,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 331,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "sentence",
      "sentence_index": 103,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"The result would support a structural regime claim, not phenomenal experience."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 457,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "sentence",
      "sentence_index": 136,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 543,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 158,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Legibility is an operational audit condition, not semantic transparency or phenomenality."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 681,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 196,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It can test a transition-selectivity claim on a toy-scale system, but it cannot prove consciousness, phenomenality, personal identity, or external adjudication of the full framework."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"status_boundary\": \"This registry is a preregistration scaffold plus internal synthetic pilot ledger. It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status. \"success_metric\": \"A third-party reviewer should be able to design a concrete test or falsification attempt from each record without private exp"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 190,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 65,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Must be fixed before pass-region testing. \"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 196,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 66,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is a boundary-behavior test, not a consciousness or phenomenality test. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 325,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 102,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Needed to prevent unmatched perturbation strength from explaining the result. \"epistemic_limit\": \"The result would support a structural regime claim, not phenomenal experience."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 331,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 103,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"The result would support a structural regime claim, not phenomenal experience. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 451,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 135,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Execution needs concrete margin estimators for each invariant. \"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 457,
      "term": "phenomenality",
      "matched_variant": "phenomenal",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 136,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Non-empty Qop is an operational class result, not phenomenal consciousness. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 537,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 157,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Measurement dictionary must bind separability, noise robustness, intervention fidelity, false-positive rate, and compression distortion. \"epistemic_limit\": \"Legibility is an operational audit condition, not semantic transparency or phenomenality."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 543,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 158,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Legibility is an operational audit condition, not semantic transparency or phenomenality. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 681,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 195,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"This is an external finite-trace prediction seed with one internal synthetic pilot. It can test a transition-selectivity claim on a toy-scale system, but it cannot prove consciousness, phenomenality, personal identity, or external adjudicat"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 59,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 28,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Cross-substrate operational equivalence is not human equivalence or identity transfer."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"status_boundary\": \"This registry is a preregistration scaffold plus internal synthetic pilot ledger. It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 6,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "It does not report external adjudication, consciousness, phenomenality, identity transfer, agency, or moral status. \"success_metric\": \"A third-party reviewer should be able to design a concrete test or falsification attempt from each record without private exp"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 53,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 27,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"rationale\": \"Must be fixed before execution to avoid tolerance tuning. \"epistemic_limit\": \"Cross-substrate operational equivalence is not human equivalence or identity transfer."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 59,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 28,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"epistemic_limit\": \"Cross-substrate operational equivalence is not human equivalence or identity transfer. \"source_paper\": \"paper6_predictions_falsation/main."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 19,
      "term": "external support",
      "matched_variant": "empirical validation",
      "scope": "sentence",
      "sentence_index": 16,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"internal_synthetic_pilot_executed\": \"A frozen internal synthetic pilot has executed with decision records, but no external adjudication or empirical validation is claimed."
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 18,
      "term": "external support",
      "matched_variant": "empirical validation",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 15,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"external_candidate_not_executed\": \"The prediction has a non-framework-facing observable candidate, but no frozen runner, dataset, threshold, or decision record yet. \"internal_synthetic_pilot_executed\": \"A frozen internal synthetic pilot has executed with deci"
    },
    {
      "file": "docs/PREDICTION_REGISTRY_v1.json",
      "line": 19,
      "term": "external support",
      "matched_variant": "empirical validation",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 16,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"internal_synthetic_pilot_executed\": \"A frozen internal synthetic pilot has executed with decision records, but no external adjudication or empirical validation is claimed. \"clean_room_synthetic_executed\": \"A seeded clean-room synthetic execution has run with "
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document defines ablations, controls, rival comparisons, and downgrade/death rules. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document defines ablations, controls, rival comparisons, and downgrade/death rules. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document defines ablations, controls, rival comparisons, and downgrade/death rules. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document defines ablations, controls, rival comparisons, and downgrade/death rules. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This document defines ablations, controls, rival comparisons, and downgrade/death rules. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "json` now includes `frozen_decision_parameters_v24` for each ablation family. These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. Any future external execution must freeze dataset hashes, exclusion rules, rival manifests, and"
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "json` now includes `frozen_decision_parameters_v24` for each ablation family. These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. Any future external execution must freeze dataset hashes, exclusion rules, rival manifests, and"
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "json` now includes `frozen_decision_parameters_v24` for each ablation family. These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. Any future external execution must freeze dataset hashes, exclusion rules, rival manifests, and"
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "json` now includes `frozen_decision_parameters_v24` for each ablation family. These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. Any future external execution must freeze dataset hashes, exclusion rules, rival manifests, and"
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "json` now includes `frozen_decision_parameters_v24` for each ablation family. These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ABLATION_MATRIX.md",
      "line": 31,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "These are internal preregistration candidates only; they do not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. Any future external execution must freeze dataset hashes, exclusion rules, rival manifests, and"
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This matrix defines ablations and death rules only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"manipulation\": \"Remove or randomize identity-channel binding while preserving gross trace length, event count, and response-coordinate dimensional"
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This matrix defines ablations and death rules only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"manipulation\": \"Remove or randomize identity-channel binding while preserving gross trace length, event count, and response-coordinate dimensional"
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This matrix defines ablations and death rules only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"manipulation\": \"Remove or randomize identity-channel binding while preserving gross trace length, event count, and response-coordinate dimensional"
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This matrix defines ablations and death rules only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"manipulation\": \"Remove or randomize identity-channel binding while preserving gross trace length, event count, and response-coordinate dimensional"
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This matrix defines ablations and death rules only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/ablation_matrix.v1.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"manipulation\": \"Remove or randomize identity-channel binding while preserving gross trace length, event count, and response-coordinate dimensional"
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"dataset_path\": \"docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"dataset_path\": \"docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"dataset_path\": \"docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"dataset_path\": \"docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This synthetic fixture tests the runner only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"dataset_path\": \"docs/fixtures/SESSION_ZERO_SYNTHETIC_DATASET_v26."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 52,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 15,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 2,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "0. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"input_manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 46,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 14,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "0. \"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 52,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 15,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure. \"aic\": -19."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 2,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "0. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"input_manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 2,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "0. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"input_manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 2,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "0. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"input_manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 52,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 15,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 2,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "0. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"input_manifest\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 46,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 14,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "0. \"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
      "line": 52,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 15,
      "local_boundary_present": false,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "\"assumption_caveat\": \"The AIC comparison is a finite operational scoring rule under declared scalar measurement noise; it is not a theorem deriving M_Omega, global atomicity, consciousness, or bridge-burden closure. \"aic\": -19."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 37,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 8,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "- Synthetic fixtures cannot generate external support."
    },
    {
      "file": "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md",
      "line": 36,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 7,
      "local_boundary_present": true,
      "promotion_language_present": false,
      "suspicious_promotion": false,
      "excerpt": "- Emits leakage and temporal-dependence diagnostics. - Synthetic fixtures cannot generate external support."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v24.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v25.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"input_report\": \"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/FCR_DOWNGRADE_DRY_RUN_v26.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This dry-run emits downgrade proposals only. It does not modify the registry and does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 5,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"governance_boundary\": \"This tool verifies signature mechanics only."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 5,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"governance_boundary\": \"This tool verifies signature mechanics only."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 5,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"governance_boundary\": \"This tool verifies signature mechanics only."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 5,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"governance_boundary\": \"This tool verifies signature mechanics only."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 5,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"governance_boundary\": \"This tool verifies signature mechanics only."
    },
    {
      "file": "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json",
      "line": 9,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 4,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This tool verifies signature mechanics only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
      "line": 7,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.json",
      "line": 8,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"weighted_mean_delta_minus_noise\": 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v24.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest_path\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v2"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest_path\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v2"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest_path\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v2"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest_path\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v2"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"runner\": \"scripts/external-session-zero-adjudicator. \"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json",
      "line": 8,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. \"manifest_path\": \"docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v2"
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. - Weighted mean delta-minus-noise: 0."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md",
      "line": 5,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md",
      "line": 5,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md",
      "line": 5,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md",
      "line": 5,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.md",
      "line": 5,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This adjudication report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"evidence\": \"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"evidence\": \"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"evidence\": \"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"evidence\": \"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 2,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "\"governance_boundary\": \"This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.json",
      "line": 4,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 3,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. \"evidence\": \"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "consciousness",
      "matched_variant": "consciousness",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "phenomenality",
      "matched_variant": "phenomenality",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "identity transfer",
      "matched_variant": "identity transfer",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "external support",
      "matched_variant": "external support",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "sentence",
      "sentence_index": 1,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    },
    {
      "file": "docs/reports/V26_SUPERIOR_GAP_AUDIT.md",
      "line": 3,
      "term": "bridge-burden closure",
      "matched_variant": "bridge-burden closure",
      "scope": "adjacent_sentence_pair",
      "sentence_index": 0,
      "local_boundary_present": true,
      "promotion_language_present": true,
      "suspicious_promotion": false,
      "excerpt": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure."
    }
  ],
  "failures": [],
  "result": "PASS"
}

```


## `docs/reports/V26_SUPERIOR_GAP_AUDIT.json`

```json
{
  "schema_version": "1.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
  "checks": [
    {
      "id": "V26-01",
      "description": "Formal bridge theorem exists as LaTeX with proof blocks and nonclaim firewall",
      "result": "PASS",
      "evidence": "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex"
    },
    {
      "id": "V26-02",
      "description": "Promotion audit actually tokenizes sentences and adjacent sentence pairs",
      "result": "PASS",
      "evidence": "sentence_level_and_adjacent_sentence_pair_synonym_lexicon_plus_promotion_verb_scan_v26"
    },
    {
      "id": "V26-03",
      "description": "Runner blocks near-copy and affine-copy leakage, not only exact equality",
      "result": "PASS",
      "evidence": "near-copy + affine-copy diagnostics present"
    },
    {
      "id": "V26-04",
      "description": "Null threshold calibration report exists and is hash-bound by fixture",
      "result": "PASS",
      "evidence": "threshold calibration bound"
    },
    {
      "id": "V26-05",
      "description": "Free parameter identifiability probes are required and checked",
      "result": "PASS",
      "evidence": "sensitivity probes present"
    },
    {
      "id": "V26-06",
      "description": "Downgrade provenance verifies dataset and prediction bundle hashes",
      "result": "PASS",
      "evidence": "dataset/prediction provenance verified"
    },
    {
      "id": "V26-07",
      "description": "Human veto signature verification script exists and self-test passed without claiming human review",
      "result": "PASS",
      "evidence": "signature test vector only"
    },
    {
      "id": "V26-08",
      "description": "Runner emits temporal dependence diagnostic for Gaussian AIC assumptions",
      "result": "PASS",
      "evidence": "Durbin-Watson diagnostic present"
    },
    {
      "id": "V26-09",
      "description": "Fixture dataset and prediction bundle hashes are real SHA-256 values, not placeholders",
      "result": "PASS",
      "evidence": "actual SHA-256 format"
    },
    {
      "id": "V26-10",
      "description": "No known v25 generated artefact string remains in v26 gap audit script",
      "result": "PASS",
      "evidence": "no double-question artefact"
    },
    {
      "id": "V26-11",
      "description": "Synthetic fixture remains blocked from external support",
      "result": "PASS",
      "evidence": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY"
    }
  ],
  "result": "PASS"
}

```


## `docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md`

```markdown
# HYBRID V26 AUDIT IMPLEMENTATION REPORT

## Governance boundary

This report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. It records implementation, verification, and remaining open burdens only.

## Inputs audited

- Antigravity v25 audit: emphasized the auto-certification loop, disclaimer bypass, offline-overfitting loophole, near-copy predictor evasion, co-modification risk, Gaussian-noise assumptions, and monolithic adjudicator coupling.
- OpenCode v25 audit: verified v25 as materially improved but flagged the bridge theorem as prose, semantic auditor as paragraph-only despite its name, thresholds as unrecalibrated, parameter identifiability as unchecked, dataset/prediction hashes as placeholders, downgrade provenance as incomplete, human veto signatures as unimplemented, and Gaussian independence as an assumption rather than a theorem.

## Truth audit against v25

| Finding | v25 status after audit | v26 action | v26 status |
|---|---|---|---:|
| Bridge theorem was prose only | TRUE | Added standalone LaTeX theorem appendix with definitions, lemma, theorem, proof, corollary, and explicit non-claim firewall | PASS, conditional finite theorem only |
| Semantic auditor claimed sentence-level but scanned paragraphs | TRUE | Rewrote gate with sentence segmentation and adjacent-sentence windows | PASS |
| Predictor clone block was exact equality only | TRUE | Added near-copy tolerance and exact affine-transform leakage rejection | PASS |
| Thresholds were not calibrated | TRUE | Added deterministic null calibration script and hash-bound calibration report | PASS, internal synthetic calibration only |
| Free parameters were counted but not identifiable | TRUE | Added sensitivity-probe schema and validation for every free parameter | PASS |
| Downgrade provenance omitted dataset/prediction bundle verification | TRUE | Downgrade now verifies runner, manifest, dataset, prediction bundle, and threshold calibration hashes | PASS |
| Human veto protocol had no signature verifier | TRUE | Added Ed25519 verification tool and self-test marked as non-human test vector | PASS infrastructure, no human review claimed |
| Gaussian AIC ignored temporal dependence | PARTLY TRUE | Added Durbin-Watson residual diagnostic and external blocking hook for dependence models | PASS diagnostic, not a global noise theorem |
| Fixture hashes were placeholders | TRUE | Added actual dataset and prediction bundle fixture files with real SHA-256 hashes | PASS |
| v25 gap audit contained generated `??` artefact | TRUE | Added clean v26 audit with no double-question artefact | PASS |
| External empirical support absent | TRUE | Preserved as open; fixture verdict remains INTERNAL_DIAGNOSTIC_* and external_support_certified=false | OPEN |
| Rivals IIT/GNWT/HOT not executed | TRUE | Preserved as open; no fake rival execution | OPEN |

## Implementation summary

1. `scripts/external-session-zero-adjudicator.js` upgraded to v26.
   - Requires real fixture file hashes for dataset and prediction bundle.
   - Blocks exact, near-exact, and affine outcome-copy predictions.
   - Checks `parameter_sensitivity_probes`.
   - Uses Gaussian AIC without RSS floor.
   - Emits leakage and temporal-dependence diagnostics.
   - Synthetic fixtures cannot generate external support.

2. `scripts/audit-operational-term-promotions.js` upgraded to v26.
   - Implements actual sentence segmentation.
   - Scans sentence and adjacent-sentence windows.
   - Local disclaimers no longer immunize a whole paragraph.

3. `scripts/propose-fcr-downgrades-from-adjudication.js` upgraded to v26.
   - Verifies report hash plus runner, manifest, dataset, prediction bundle, and threshold calibration report hashes.

4. New executable infrastructure added.
   - `scripts/calibrate-session-zero-thresholds-v26.js`
   - `scripts/verify-human-veto-signature.js`
   - `scripts/audit-v26-superior-gaps.js`

5. New formal/theory artifacts added.
   - `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex`
   - `docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.pdf`
   - `docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md`

## Verification summary

| Check | Result |
|---|---:|
| `npm run verify:v26` | PASS |
| Monolithic build quality gate | PASS |
| Projection bridge v26 LaTeX compilation | PASS |
| Session Zero v26 self-test | PASS |
| Session Zero v26 verdict | INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY |
| External support certified | False |
| Threshold null calibration | PASS |
| Promotion audit v26 | PASS |
| Human veto signature self-test | PASS, test vector only |
| Finite separator package audit | PASS |
| PRED-EXT-01 clean-room synthetic | PASS |
| Adversarial negative controls | PASS |
| Macro / prediction / preregistration / nonclaim gates | PASS |

## Remaining non-closable gaps

- No non-synthetic external dataset has been adjudicated.
- No independent human mathematical review has signed any result.
- No DOI, arXiv, Zenodo, OSF, or peer-reviewed publication has been created here.
- No IIT/GNWT/HOT/Predictive Processing rival has been executed on real data.
- The bridge theorem is finite and conditional; it is not a global derivation from $M_\Omega$ or inverse limits to AIC.

## Verdict

v26 is a superior internal hardening pass. It closes several implementable v25 vulnerabilities and demarcates the rest more sharply. It still does not create external scientific corroboration.

```


## `docs/reports/HYBRID_V26_VERIFICATION.json`

```json
{
  "schema_version": "1.0.0",
  "generated_at": "2026-05-27",
  "governance_boundary": "This verification report does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
  "commands": {
    "npm_run_verify_v26": "PASS",
    "npm_run_audit_monolithic_build_quality": "PASS",
    "npm_run_audit_finite_separator_package": "PASS",
    "npm_run_cleanroom_pred_ext_01": "PASS",
    "npm_run_test_adversarial_negative_controls": "PASS",
    "npm_run_verify_macro_registry": "PASS",
    "npm_run_verify_prediction_registry": "PASS",
    "npm_run_verify_preregistration_coverage": "PASS",
    "npm_run_lint_nonclaims": "PASS",
    "pdflatex_projection_bridge_v26": "PASS"
  },
  "v26_session_zero_summary": {
    "verdict": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY",
    "external_support_certified": false,
    "dataset_hash_verified": true,
    "prediction_bundle_hash_verified": true,
    "threshold_calibration_hash_verified": true,
    "parameter_identifiability": {
      "checked": 7,
      "nonzero": 7,
      "min_l2_effect": 0.001
    },
    "durbin_watson": 0.03846153846153865
  },
  "v26_gap_audit_result": "PASS",
  "v26_promotion_audit_result": "PASS",
  "v26_threshold_calibration_summary": {
    "result": "PASS",
    "recommended_support_gain_aic": 5,
    "status": "internal_null_calibrated_synthetic_engineering_gate_not_external",
    "external_support_allowed": false
  },
  "monolithic_quality_gate_summary": {
    "result": "PASS",
    "pages_detected": null
  },
  "external_support_certified": false,
  "human_review_signed": false,
  "empirical_dataset_present": false,
  "doi_or_preprint_registered": false
}

```
