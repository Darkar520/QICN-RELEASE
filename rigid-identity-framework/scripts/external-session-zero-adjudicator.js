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
