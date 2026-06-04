#!/usr/bin/env node
/*
 * QICN v27 Session Zero adjudicator.
 *
 * Design note: v27 is intentionally stricter than v26. A blocked verdict can be
 * a successful hardening outcome when the fixture exhibits structural leakage,
 * weak rivals, circular calibration risk, or bridge-certificate incompleteness.
 * This runner remains an internal diagnostic tool only.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_FIXTURE = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const DEFAULT_REPORT = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json");
const GOVERNANCE = "This v27 adjudication report is an internal diagnostic gate. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";

function repoPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${stableJson(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : stableJson(value)).digest("hex");
}

function fileSha256(relativeOrAbsolutePath) {
  const filePath = path.isAbsolute(relativeOrAbsolutePath) ? relativeOrAbsolutePath : path.join(ROOT, relativeOrAbsolutePath);
  if (!fs.existsSync(filePath)) return null;
  return sha256(fs.readFileSync(filePath));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function mean(xs) {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function rss(points, field) {
  return points.reduce((sum, pt) => sum + (pt.observed_delta - pt[field]) ** 2, 0);
}

function pearson(x, y) {
  if (x.length !== y.length || x.length < 2) return null;
  const mx = mean(x);
  const my = mean(y);
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < x.length; i += 1) {
    const ax = x[i] - mx;
    const ay = y[i] - my;
    num += ax * ay;
    dx += ax * ax;
    dy += ay * ay;
  }
  return dx > 0 && dy > 0 ? num / Math.sqrt(dx * dy) : null;
}

function linearFitYOnX(x, y) {
  const mx = mean(x);
  const my = mean(y);
  let cov = 0;
  let vx = 0;
  for (let i = 0; i < x.length; i += 1) {
    cov += (x[i] - mx) * (y[i] - my);
    vx += (x[i] - mx) ** 2;
  }
  const slope = vx > 0 ? cov / vx : 0;
  const intercept = my - slope * mx;
  const residuals = x.map((xi, i) => y[i] - (slope * xi + intercept));
  const maxAbsResidual = Math.max(...residuals.map(Math.abs));
  return { slope, intercept, residuals, maxAbsResidual };
}

function mutualInformationBinned(x, y, binCount = Math.ceil(Math.sqrt(x.length))) {
  if (x.length !== y.length || x.length < 2) return 0;
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const yMin = Math.min(...y);
  const yMax = Math.max(...y);
  if (xMin === xMax || yMin === yMax) return 0;
  const bins = Math.max(2, binCount);
  const joint = Array.from({ length: bins }, () => Array.from({ length: bins }, () => 0));
  const cx = Array.from({ length: bins }, () => 0);
  const cy = Array.from({ length: bins }, () => 0);
  const bin = (v, lo, hi) => Math.min(bins - 1, Math.max(0, Math.floor(((v - lo) / (hi - lo)) * bins)));
  for (let i = 0; i < x.length; i += 1) {
    const bx = bin(x[i], xMin, xMax);
    const by = bin(y[i], yMin, yMax);
    joint[bx][by] += 1;
    cx[bx] += 1;
    cy[by] += 1;
  }
  const n = x.length;
  let mi = 0;
  for (let i = 0; i < bins; i += 1) {
    for (let j = 0; j < bins; j += 1) {
      if (joint[i][j] === 0) continue;
      const pxy = joint[i][j] / n;
      const px = cx[i] / n;
      const py = cy[j] / n;
      mi += pxy * Math.log(pxy / (px * py));
    }
  }
  return mi;
}

function gaussianInformation(points, field, k, penaltyFactor = 1) {
  let nll = 0;
  let sse = 0;
  const residuals = [];
  for (const pt of points) {
    const r = pt.observed_delta - pt[field];
    const sigma = pt.measurement_sigma;
    const s2 = sigma ** 2;
    residuals.push(r);
    sse += r * r;
    nll += 0.5 * (Math.log(2 * Math.PI * s2) + (r * r) / s2);
  }
  const n = points.length;
  const aic = 2 * k * penaltyFactor + 2 * nll;
  const denominator = n - k - 1;
  const overparameterized = denominator <= 0;
  const aicc = overparameterized ? Number.POSITIVE_INFINITY : aic + (2 * k * (k + 1)) / denominator;
  return { aic, aicc, nll, sse, residuals, overparameterized, aicc_correction: overparameterized ? null : aicc - aic };
}

function weightedEffect(points) {
  const weights = points.map((pt) => 1 / (pt.measurement_sigma ** 2));
  const values = points.map((pt) => pt.observed_delta - pt.noise_floor);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const estimate = values.reduce((sum, v, i) => sum + v * weights[i], 0) / totalWeight;
  const residuals = values.map((v) => v - estimate);
  const hc1 = (points.length / Math.max(1, points.length - 1)) * residuals.reduce((sum, r, i) => sum + (weights[i] * r) ** 2, 0) / (totalWeight ** 2);
  const modelVariance = 1 / totalWeight;
  const standardError = Math.sqrt(modelVariance + hc1);
  const t = points.length <= 8 ? 2.365 : 1.96;
  return {
    weighted_mean_delta_minus_noise: estimate,
    standard_error: standardError,
    ci95: [estimate - t * standardError, estimate + t * standardError],
    method: "weighted_mean_declared_sigma_plus_hc1_residual_sandwich_diagnostic_not_blue_claim"
  };
}

function durbinWatson(residuals) {
  if (residuals.length < 2) return null;
  let num = 0;
  let den = 0;
  for (let i = 1; i < residuals.length; i += 1) num += (residuals[i] - residuals[i - 1]) ** 2;
  for (const r of residuals) den += r ** 2;
  return den > 0 ? num / den : null;
}

function autocorrelation(residuals, lag) {
  const m = mean(residuals);
  let num = 0;
  let den = 0;
  for (let i = lag; i < residuals.length; i += 1) num += (residuals[i] - m) * (residuals[i - lag] - m);
  for (const r of residuals) den += (r - m) ** 2;
  return den > 0 ? num / den : 0;
}

function ljungBox(residuals, maxLag = Math.min(3, residuals.length - 1)) {
  const n = residuals.length;
  let q = 0;
  for (let lag = 1; lag <= maxLag; lag += 1) {
    const rho = autocorrelation(residuals, lag);
    q += (rho * rho) / Math.max(1, n - lag);
  }
  q *= n * (n + 2);
  return {
    statistic: q,
    lags: maxLag,
    p_value_rough: Math.exp(-q / 2),
    caveat: "rough diagnostic approximation, not a replacement for an externally reviewed time-series model"
  };
}

function l2Effect(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return Number.NaN;
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0));
}

function verifyFileHash(relativePath, expected, skipped) {
  if (skipped) return { ok: true, skipped: true, path: relativePath, expected: expected || null, actual: null };
  if (!relativePath || !expected) return { ok: false, path: relativePath || null, expected: expected || null, actual: null, reason: "missing_path_or_hash" };
  const actual = fileSha256(relativePath);
  return { ok: actual === expected, path: relativePath, expected, actual, reason: actual === expected ? "matched" : "mismatch" };
}

function admissiblePoints(manifest) {
  const excluded = new Set((manifest.exclusion_log || []).map((entry) => entry.point_id));
  return (manifest.measurement_points || []).filter((pt) => !excluded.has(pt.id));
}

function validateSensitivityProbes(params, pointCount, failures, warnings) {
  const probes = params.parameter_sensitivity_probes || [];
  const ids = new Set([...(params.qicn_free_parameters || []), ...(params.rival_free_parameters || [])].map((p) => p.parameter_id));
  const baselineByModel = new Map();
  const seen = new Set();
  const details = [];
  let nonzero = 0;
  const minEffect = params.identifiability_min_l2_effect ?? 1e-6;
  if (!Array.isArray(probes) || probes.length === 0) failures.push("parameter_sensitivity_probes are required.");
  for (const probe of probes) {
    if (!probe || !probe.parameter_id) {
      failures.push("parameter_sensitivity_probe missing parameter_id.");
      continue;
    }
    seen.add(probe.parameter_id);
    if (!ids.has(probe.parameter_id)) failures.push(`parameter_sensitivity_probe references undeclared parameter ${probe.parameter_id}.`);
    if (typeof probe.probe_protocol !== "string" || probe.probe_protocol.trim().length < 12) failures.push(`parameter_sensitivity_probe ${probe.parameter_id} is missing a concrete probe_protocol.`);
    if (!Array.isArray(probe.baseline_predictions) || !Array.isArray(probe.perturbed_predictions) || probe.baseline_predictions.length !== pointCount || probe.perturbed_predictions.length !== pointCount) {
      failures.push(`parameter_sensitivity_probe ${probe.parameter_id} must provide baseline/perturbed arrays matching measurement_points length.`);
      continue;
    }
    const model = probe.model || "unknown";
    const baselineKey = JSON.stringify(probe.baseline_predictions);
    if (!baselineByModel.has(model)) baselineByModel.set(model, baselineKey);
    if (baselineByModel.get(model) !== baselineKey) failures.push(`INCONSISTENT_SENSITIVITY_BASELINE for model ${model}.`);
    const effect = l2Effect(probe.baseline_predictions, probe.perturbed_predictions);
    if (!Number.isFinite(effect) || effect < minEffect) failures.push(`parameter_sensitivity_probe ${probe.parameter_id} has insufficient effect ${effect}.`);
    else nonzero += 1;
    const perturbation = Math.abs(probe.perturbation_size ?? 0);
    const suspicious = perturbation > 0 && effect > 1.0 && perturbation <= 0.01;
    if (suspicious) warnings.push(`parameter_sensitivity_probe ${probe.parameter_id} has large L2 effect relative to perturbation_size.`);
    details.push({ parameter_id: probe.parameter_id, model, l2_effect: effect, perturbation_size: probe.perturbation_size, suspicious_large_effect: suspicious });
  }
  for (const id of ids) if (!seen.has(id)) failures.push(`free parameter ${id} is missing a sensitivity probe.`);
  return {
    checked: probes.length,
    nonzero,
    min_l2_effect: minEffect,
    consistent_baselines_by_model: !failures.some((f) => f.includes("INCONSISTENT_SENSITIVITY_BASELINE")),
    details
  };
}

function validateBridgeCertificate(manifest, points) {
  const cert = manifest.bridge_certificate;
  const issues = [];
  if (!cert || typeof cert !== "object") return { status: "incomplete", issues: ["missing bridge_certificate"], limitation: "Finite runner cannot prove the mathematical factorization; it only checks declared operational coverage." };
  const invariants = cert.latent_invariants || [];
  const estimators = cert.estimators || [];
  const tolerance = cert.tolerance_vector || [];
  if (!Array.isArray(invariants) || invariants.length === 0) issues.push("missing latent_invariants");
  if (!Array.isArray(estimators) || estimators.length === 0) issues.push("missing estimators");
  if (typeof cert.factorization_claim !== "string" || cert.factorization_claim.trim().length < 12) issues.push("missing factorization_claim");
  if (!Array.isArray(tolerance) || tolerance.length !== invariants.length) issues.push("tolerance_vector length must match latent_invariants length");
  for (const estimator of estimators) {
    if (!estimator.dataset_column) {
      issues.push(`estimator ${estimator.estimator_id || "unknown"} missing dataset_column`);
      continue;
    }
    const missing = points.filter((pt) => !(estimator.dataset_column in pt)).map((pt) => pt.id);
    if (missing.length > 0) issues.push(`estimator ${estimator.estimator_id || estimator.dataset_column} column missing for points: ${missing.join(",")}`);
  }
  const maxResidual = Math.max(...points.map((pt) => Math.abs(pt.observed_delta - pt.qicn_prediction)));
  const maxTolerance = tolerance.length > 0 ? Math.max(...tolerance.map(Number)) : 0;
  if (!(maxTolerance > 0) || maxResidual > maxTolerance) issues.push(`residual tolerance inconsistency: max_residual=${maxResidual}, max_tolerance=${maxTolerance}`);
  return {
    status: issues.length === 0 ? "admissible" : "inconsistent",
    issues,
    checked_estimators: estimators.length,
    max_qicn_abs_residual: maxResidual,
    max_declared_tolerance: maxTolerance,
    limitation: "This is an operational coverage check only; it is not a proof of the bridge theorem or of latent-state preservation."
  };
}

function validateManifest(manifest, options = {}) {
  const failures = [];
  const warnings = [];
  if (!manifest || typeof manifest !== "object") failures.push("manifest is not an object.");
  if (!manifest.manifest_id) failures.push("manifest_id is required.");
  const points = manifest.measurement_points || [];
  if (!Array.isArray(points) || points.length === 0) failures.push("measurement_points must be a non-empty array.");
  const isSynthetic = manifest.status === "synthetic_fixture";
  const params = manifest.model_parameters || {};
  const qicnIds = params.qicn_free_parameters || [];
  const rivalIds = params.rival_free_parameters || [];
  if (!Array.isArray(qicnIds) || qicnIds.length === 0) failures.push("qicn_free_parameters are required.");
  if (!Array.isArray(rivalIds) || rivalIds.length === 0) failures.push("rival_free_parameters are required.");
  const datasetHashCheck = verifyFileHash(manifest.dataset_path, manifest.dataset_sha256, options.skipHashChecks);
  const predictionHashCheck = verifyFileHash(manifest.prediction_bundle?.prediction_path, manifest.prediction_bundle?.prediction_sha256, options.skipHashChecks);
  const thresholdHashCheck = verifyFileHash(manifest.decision_thresholds?.threshold_calibration_report_path, manifest.decision_thresholds?.threshold_calibration_report_sha256, options.skipHashChecks);
  if (!datasetHashCheck.ok) failures.push(`dataset hash verification failed: ${datasetHashCheck.reason}.`);
  if (!predictionHashCheck.ok) failures.push(`prediction bundle hash verification failed: ${predictionHashCheck.reason}.`);
  if (!thresholdHashCheck.ok) failures.push(`threshold calibration report hash verification failed: ${thresholdHashCheck.reason}.`);
  const identifiability = validateSensitivityProbes(params, points.length, failures, warnings);
  const bridge = validateBridgeCertificate(manifest, admissiblePoints(manifest));
  if (bridge.status === "inconsistent") failures.push("bridge_certificate_admissibility is inconsistent.");
  return {
    ok: failures.length === 0,
    failures,
    warnings,
    isSynthetic,
    datasetHashCheck,
    predictionHashCheck,
    thresholdHashCheck,
    identifiability,
    bridge,
    paramCounts: {
      qicnK: qicnIds.length,
      rivalK: rivalIds.length,
      qicnIds: qicnIds.map((p) => p.parameter_id),
      rivalIds: rivalIds.map((p) => p.parameter_id)
    }
  };
}

function analyzeManifest(manifest, options = {}) {
  const validation = validateManifest(manifest, options);
  if (!validation.ok) {
    return {
      schema_version: "5.0.0",
      generated_at: "2026-05-27",
      governance_boundary: GOVERNANCE,
      validation,
      result: "FAIL",
      verdict: "INVALID_MANIFEST",
      external_support_certified: false
    };
  }
  const points = admissiblePoints(manifest);
  const thresholds = manifest.decision_thresholds || {};
  const penalty = manifest.model_parameters?.complexity_penalty_factor ?? 1;
  const qicn = gaussianInformation(points, "qicn_prediction", validation.paramCounts.qicnK, penalty);
  const rival = gaussianInformation(points, "rival_prediction", validation.paramCounts.rivalK, penalty);
  const gainAic = rival.aic - qicn.aic;
  const gainAicc = rival.aicc - qicn.aicc;
  const observed = points.map((pt) => pt.observed_delta);
  const qpred = points.map((pt) => pt.qicn_prediction);
  const sigmas = points.map((pt) => pt.measurement_sigma);
  const fit = linearFitYOnX(observed, qpred);
  const maxSigma = Math.max(...sigmas);
  const residualSigmaCorr = pearson(fit.residuals.map(Math.abs), sigmas);
  const affineBlocked = fit.maxAbsResidual < 2 * maxSigma;
  const mi = mutualInformationBinned(observed, qpred);
  const miThreshold = thresholds.mi_leakage_threshold ?? 0.8;
  const dw = durbinWatson(qicn.residuals);
  const lb = ljungBox(qicn.residuals);
  const meanObserved = mean(observed);
  const rssMeanModel = points.reduce((sum, pt) => sum + (pt.observed_delta - meanObserved) ** 2, 0);
  const rssRival = rss(points, "rival_prediction");
  const rivalAdequate = manifest.rival_model_class && rssRival < rssMeanModel;
  const reducedChi2 = qicn.residuals.reduce((sum, r, i) => sum + (r / sigmas[i]) ** 2, 0) / Math.max(1, points.length - validation.paramCounts.qicnK);
  const structuralLeakage = affineBlocked || mi > miThreshold || reducedChi2 < 0.05;
  const blockingReasons = [];
  if (qicn.overparameterized) blockingReasons.push("BLOCKED_OVERPARAMETERIZED");
  if (affineBlocked) blockingReasons.push("BLOCKED_AFFINE_LEAKAGE");
  if (mi > miThreshold) blockingReasons.push("BLOCKED_MI_LEAKAGE");
  if (!rivalAdequate) blockingReasons.push("BLOCKED_STRAW_MAN_RIVAL");
  if (validation.bridge.status !== "admissible") blockingReasons.push("BLOCKED_BRIDGE_CERTIFICATE");
  if (!validation.isSynthetic && dw !== null && (dw < 1.0 || dw > 3.0)) blockingReasons.push("BLOCKED_TEMPORAL_DEPENDENCE");
  let verdict;
  if (blockingReasons.length > 0) verdict = blockingReasons.length === 1 ? blockingReasons[0] : "BLOCKED_MULTIPLE_GATES";
  else if (points.length < (thresholds.minimum_admissible_n ?? 1)) verdict = "BLOCKED_INSUFFICIENT_ADMISSIBLE_N";
  else if (gainAicc >= (thresholds.support_gain_aicc ?? thresholds.support_gain_aic ?? 4) && weightedEffect(points).ci95[0] >= (thresholds.minimum_ci_lower ?? 0)) verdict = validation.isSynthetic ? "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY" : "SUPPORTED_PENDING_EXTERNAL_REVIEW";
  else verdict = validation.isSynthetic ? "INTERNAL_DIAGNOSTIC_FAIL_SYNTHETIC_ONLY" : "DEGRADED_FAIL";
  return {
    schema_version: "5.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    validation_summary: {
      ok: validation.ok,
      is_synthetic_fixture: validation.isSynthetic,
      failures: validation.failures,
      warnings: validation.warnings,
      dataset_hash_verified: validation.datasetHashCheck.ok,
      prediction_bundle_hash_verified: validation.predictionHashCheck.ok,
      threshold_calibration_hash_verified: validation.thresholdHashCheck.ok,
      parameter_identifiability: validation.identifiability,
      bridge_certificate_admissibility: validation.bridge
    },
    counts: {
      total_points: manifest.measurement_points.length,
      admissible_points: points.length,
      qicn_free_parameter_count: validation.paramCounts.qicnK,
      rival_free_parameter_count: validation.paramCounts.rivalK
    },
    effect_estimate: weightedEffect(points),
    model_comparison: {
      method: "independent_gaussian_aicc_using_declared_measurement_sigma_no_rss_floor_v27",
      decision_basis: "AICc, not AIC, controls the support threshold. AIC remains reported as a diagnostic only.",
      qicn,
      rival,
      complexity_adjusted_gain_aic: gainAic,
      complexity_adjusted_gain_aicc: gainAicc
    },
    leakage_adjudication: {
      predictive_accuracy: {
        pearson_observed_vs_qicn_prediction: pearson(observed, qpred),
        reduced_chi_squared_against_declared_sigma: reducedChi2
      },
      structural_leakage: {
        affine_fit_qicn_prediction_from_observed_delta: {
          slope: fit.slope,
          intercept: fit.intercept,
          maxAbsResidual: fit.maxAbsResidual,
          block_threshold_2x_max_measurement_sigma: 2 * maxSigma,
          residual_abs_vs_sigma_pearson: residualSigmaCorr
        },
        mutual_information_observed_vs_prediction: mi,
        mutual_information_threshold: miThreshold,
        structural_leakage_detected: structuralLeakage
      },
      affine_leakage_risk: affineBlocked ? "blocked" : fit.maxAbsResidual < 4 * maxSigma ? "high" : "low"
    },
    rival_adequacy: {
      rival_model_class: manifest.rival_model_class || null,
      rss_rival: rssRival,
      rss_mean_model: rssMeanModel,
      adequate: Boolean(rivalAdequate),
      rule: "rival RSS must be lower than the observed-delta mean model RSS"
    },
    temporal_dependence_diagnostic: {
      durbin_watson: dw,
      durbin_watson_policy: validation.isSynthetic ? "warning_only_for_synthetic_fixture" : "block_external_if_outside_[1.0,3.0]",
      ljung_box: lb
    },
    decision_thresholds: thresholds,
    blocking_reasons: blockingReasons,
    verdict,
    result: validation.ok ? "PASS" : "FAIL",
    external_support_certified: false,
    nonclaim_boundary: "A v27 PASS here means the adjudication gate executed and enforced its blockers; it is not evidence for QICN, consciousness, identity transfer, phenomenality, or bridge closure."
  };
}

function adjudicateFile(manifestPath = DEFAULT_FIXTURE, outPath = DEFAULT_REPORT) {
  const manifest = readJson(manifestPath);
  const report = analyzeManifest(manifest);
  report.input_manifest = repoPath(manifestPath);
  report.provenance = {
    runner_path: repoPath(__filename),
    runner_sha256: fileSha256(__filename),
    manifest_path: repoPath(manifestPath),
    manifest_sha256: fileSha256(manifestPath),
    dataset_path: manifest.dataset_path,
    dataset_sha256: manifest.dataset_sha256,
    prediction_bundle_path: manifest.prediction_bundle?.prediction_path,
    prediction_bundle_sha256: manifest.prediction_bundle?.prediction_sha256,
    threshold_calibration_report_path: manifest.decision_thresholds?.threshold_calibration_report_path,
    threshold_calibration_report_sha256: manifest.decision_thresholds?.threshold_calibration_report_sha256
  };
  report.report_sha256 = sha256({ ...report, report_sha256: undefined });
  writeJson(outPath, report);
  fs.writeFileSync(outPath.replace(/\.json$/, ".md"), `# Session Zero Adjudication v27\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Verdict: **${report.verdict}**\n- Blocking reasons: ${report.blocking_reasons.join(", ") || "none"}\n- External certification: **NO**\n`, "utf8");
  return report;
}

function main() {
  const args = process.argv.slice(2);
  const manifestArgIndex = args.indexOf("--manifest");
  const manifestPath = manifestArgIndex >= 0 ? path.resolve(args[manifestArgIndex + 1]) : DEFAULT_FIXTURE;
  const report = adjudicateFile(manifestPath, DEFAULT_REPORT);
  console.log(`External Session Zero adjudicator v27: ${report.result}; verdict=${report.verdict}; blockers=${report.blocking_reasons.length}; external_support_certified=false`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = {
  analyzeManifest,
  adjudicateFile,
  stableJson,
  sha256,
  fileSha256,
  pearson,
  linearFitYOnX,
  mutualInformationBinned,
  gaussianInformation,
  durbinWatson,
  ljungBox
};
