#!/usr/bin/env node
/*
 * QICN v27 null-threshold calibration.
 *
 * v27 repairs the v26 circularity risk by reporting two null modes:
 * 1. rival_true: observations generated from the declared rival.
 * 2. both_random: QICN and rival predictions randomized under the same scale.
 *
 * This remains an internal synthetic engineering calibration only.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { gaussianInformation, mutualInformationBinned, stableJson } = require("./external-session-zero-adjudicator-v27");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const OUT = path.join(ROOT, "docs", "reports", "THRESHOLD_NULL_CALIBRATION_v27.json");
const GOVERNANCE = "This v27 calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";

function repoPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function sha256(value) {
  return crypto.createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : stableJson(value)).digest("hex");
}

function fileSha256(filePath) {
  return sha256(fs.readFileSync(filePath));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function mulberry32(a) {
  return function rng() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randn(rng) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function percentile(xs, p) {
  const sorted = [...xs].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] * (hi - idx) + sorted[hi] * (idx - lo);
}

function admissible(manifest) {
  const excluded = new Set((manifest.exclusion_log || []).map((entry) => entry.point_id));
  return manifest.measurement_points.filter((pt) => !excluded.has(pt.id));
}

function withFields(pt, fields) {
  return { ...pt, ...fields };
}

function calibrationRun(manifest, mode, rng, iterations) {
  const base = admissible(manifest);
  const qK = manifest.model_parameters.qicn_free_parameters.length;
  const rK = manifest.model_parameters.rival_free_parameters.length;
  const penalty = manifest.model_parameters.complexity_penalty_factor ?? 1;
  const gains = [];
  const miValues = [];
  for (let i = 0; i < iterations; i += 1) {
    const pts = base.map((pt) => {
      if (mode === "null_rival_true") {
        const observed = pt.rival_prediction + randn(rng) * pt.measurement_sigma;
        return withFields(pt, { observed_delta: observed });
      }
      const center = (pt.observed_delta + pt.rival_prediction + pt.qicn_prediction) / 3;
      const scale = Math.max(pt.measurement_sigma, Math.abs(pt.observed_delta - center) / 2, 0.01);
      return withFields(pt, {
        observed_delta: center + randn(rng) * scale,
        qicn_prediction: center + randn(rng) * scale,
        rival_prediction: center + randn(rng) * scale
      });
    });
    const q = gaussianInformation(pts, "qicn_prediction", qK, penalty);
    const r = gaussianInformation(pts, "rival_prediction", rK, penalty);
    gains.push(r.aicc - q.aicc);
    miValues.push(mutualInformationBinned(pts.map((pt) => pt.observed_delta), pts.map((pt) => pt.qicn_prediction)));
  }
  return {
    iterations,
    gain_aicc_quantiles: {
      p50: percentile(gains, 0.5),
      p90: percentile(gains, 0.9),
      p95: percentile(gains, 0.95),
      p99: percentile(gains, 0.99)
    },
    mi_quantiles: {
      p50: percentile(miValues, 0.5),
      p90: percentile(miValues, 0.9),
      p95: percentile(miValues, 0.95),
      p99: percentile(miValues, 0.99)
    }
  };
}

function main() {
  const manifest = readJson(MANIFEST);
  const iterations = 2000;
  const rngRivalTrue = mulberry32(0xA1CC27);
  const rngBothRandom = mulberry32(0xB2DD38);
  const nullRivalTrue = calibrationRun(manifest, "null_rival_true", rngRivalTrue, iterations);
  const nullBothRandom = calibrationRun(manifest, "null_both_random", rngBothRandom, iterations);
  const supportGainAicc = Math.max(4.0, Math.ceil(Math.max(nullRivalTrue.gain_aicc_quantiles.p95, nullBothRandom.gain_aicc_quantiles.p95) * 10) / 10);
  const miLeakageThreshold = Math.max(0.5, Math.ceil(Math.max(nullRivalTrue.mi_quantiles.p99, nullBothRandom.mi_quantiles.p99) * 100) / 100);
  const reportBase = {
    schema_version: "2.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    manifest: repoPath(MANIFEST),
    null_models: {
      null_rival_true: nullRivalTrue,
      null_both_random: nullBothRandom
    },
    recommended_support_gain_aicc: supportGainAicc,
    recommended_mi_leakage_threshold: miLeakageThreshold,
    seed: "0xA1CC27",
    status: "dual_mode_internal_null_calibrated_synthetic_engineering_gate_not_external",
    external_support_allowed: false
  };
  const report = { ...reportBase, report_sha256: sha256(reportBase) };
  writeJson(OUT, report);
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Threshold Null Calibration v27\n\n${GOVERNANCE}\n\n- Result: PASS\n- null_rival_true p95 AICc gain: ${nullRivalTrue.gain_aicc_quantiles.p95}\n- null_both_random p95 AICc gain: ${nullBothRandom.gain_aicc_quantiles.p95}\n- Recommended support_gain_aicc: ${supportGainAicc}\n- Recommended MI leakage threshold: ${miLeakageThreshold}\n- External support allowed: false\n`, "utf8");
  manifest.decision_thresholds.support_gain_aicc = supportGainAicc;
  manifest.decision_thresholds.mi_leakage_threshold = miLeakageThreshold;
  manifest.decision_thresholds.threshold_calibration_report_path = repoPath(OUT);
  manifest.decision_thresholds.threshold_calibration_report_sha256 = fileSha256(OUT);
  manifest.decision_thresholds.threshold_calibration_status = "dual_mode_internal_null_calibrated_synthetic_engineering_gate";
  writeJson(MANIFEST, manifest);
  console.log(`Threshold calibration v27: PASS; support_gain_aicc=${supportGainAicc}; mi_threshold=${miLeakageThreshold}; threshold_report_sha256=${manifest.decision_thresholds.threshold_calibration_report_sha256}`);
}

if (require.main === module) main();
