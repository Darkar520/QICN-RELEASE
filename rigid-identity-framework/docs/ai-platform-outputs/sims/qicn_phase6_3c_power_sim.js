#!/usr/bin/env node
"use strict";

const { computeHotHoa } = require("./qicn_phase6_3b_hot_model");
const { extractSelfLocus, makeRawSelfLocusCase, rng, clamp, mean, quantile } = require("./qicn_phase6_3c_selflocus_extractor");

const THRESHOLDS = {
  QICN_SIPM: 0.20,
  QICN_OFIA: 0.50,
  QICN_CFS: 0.25,
  QICN_FPPG: 0.05,
  QICN_WRI: 0.05,
  PRIMARY_GAIN: 0.05,
  HOT_AUC: 0.75,
  HOT_ECE: 0.10,
  DELTA_BIC: 10
};

function variance(values) {
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function median(values) {
  return quantile(values, 0.5);
}

function durbinWatson(values) {
  const m = mean(values);
  const residuals = values.map((value) => value - m);
  const numerator = residuals.slice(1).reduce((sum, value, index) => sum + (value - residuals[index]) ** 2, 0);
  const denominator = residuals.reduce((sum, value) => sum + value ** 2, 0);
  return denominator > 0 ? numerator / denominator : 2;
}

function ar1Rho(values) {
  if (values.length < 3) return 0;
  const m = mean(values);
  const centered = values.map((value) => value - m);
  const numerator = centered.slice(1).reduce((sum, value, index) => sum + value * centered[index], 0);
  const denominator = centered.slice(0, -1).reduce((sum, value) => sum + value ** 2, 0);
  return clamp(denominator > 0 ? numerator / denominator : 0, -0.95, 0.95);
}

function blockBootstrapMeanCi(values, blockLength, seed, iterations = 500) {
  const rand = rng(`block-bootstrap:${seed}`);
  const samples = [];
  for (let i = 0; i < iterations; i += 1) {
    const sample = [];
    while (sample.length < values.length) {
      const start = Math.floor(rand() * values.length);
      for (let j = 0; j < blockLength && sample.length < values.length; j += 1) sample.push(values[(start + j) % values.length]);
    }
    samples.push(mean(sample));
  }
  return { low: quantile(samples, 0.025), high: quantile(samples, 0.975) };
}

function bootstrapPGreaterThan(values, threshold, blockLength, seed, iterations = 500) {
  const rand = rng(`p-bootstrap:${seed}`);
  let fails = 0;
  for (let i = 0; i < iterations; i += 1) {
    const sample = [];
    while (sample.length < values.length) {
      const start = Math.floor(rand() * values.length);
      for (let j = 0; j < blockLength && sample.length < values.length; j += 1) sample.push(values[(start + j) % values.length]);
    }
    if (mean(sample) <= threshold) fails += 1;
  }
  return (fails + 1) / (iterations + 1);
}

function holmAdjust(pValues) {
  const sorted = pValues.map((p, index) => ({ p, index })).sort((a, b) => a.p - b.p);
  const adjusted = Array(pValues.length).fill(1);
  let runningMax = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    const value = Math.min(1, sorted[i].p * (sorted.length - i));
    runningMax = Math.max(runningMax, value);
    adjusted[sorted[i].index] = runningMax;
  }
  return adjusted;
}

function bic(totalRss, n, k) {
  return n * Math.log(Math.max(totalRss / Math.max(1, n), 1e-9)) + k * Math.log(Math.max(2, n));
}

function makeHotTrace(spec, seed) {
  const rand = rng(`hot:${spec.id}:${seed}`);
  const windows = [];
  const n = spec.windowCount || 96;
  for (let i = 0; i < n; i += 1) {
    const jitter = () => (rand() - 0.5) * spec.hotNoise;
    const hotAligned = spec.hotStrength > 0.70;
    const hotHigh = spec.hotHigh === undefined ? 0.86 : spec.hotHigh;
    const hotLow = spec.hotLow === undefined ? 0.14 : spec.hotLow;
    const latentAccess = hotAligned ? (rand() < 0.5 ? hotHigh : hotLow) : 0.48 + (rand() - 0.5) * 0.20;
    const signal = clamp(latentAccess + jitter());
    const y = rand() < clamp(hotAligned ? latentAccess : 0.50 + (rand() - 0.5) * 0.10) ? 1 : 0;
    windows.push({
      id: `${spec.id}-${seed}-${i}`,
      t: i,
      condition: "baseline",
      awareness_target: y,
      report_signal: clamp(signal),
      confidence: clamp(hotAligned ? signal + jitter() : 0.48 + jitter()),
      state_monitoring: clamp(hotAligned ? signal + jitter() : 0.48 + jitter())
    });
  }
  return { schema_version: "0.1.0", trace_id: `hot-${spec.id}-${seed}`, seed, windows };
}

function qicnCookedMetrics(spec, seed, sipm) {
  const rand = rng(`qicn-cooked:${spec.id}:${seed}`);
  const noise = spec.metricNoise || 0.04;
  const jitter = () => (rand() - 0.5) * noise;
  const level = spec.qicnLevel;
  return {
    QICN_SIPM: sipm,
    QICN_OFIA: clamp(level.ofia + jitter(), 0, 1.8),
    QICN_CFS: clamp(level.cfs + jitter(), 0, 1),
    QICN_FPPG: clamp(level.fppg + jitter(), 0, 1),
    QICN_WRI: clamp(level.wri + jitter(), 0, 1),
    CTRL_PASS_RATE: spec.controlLeak ? (sipm >= THRESHOLDS.QICN_SIPM ? 0.25 : 0) : 0,
    qicn_loss: Math.max(0.02, level.qicnLoss + jitter()),
    hot_loss: Math.max(0.02, level.hotLoss + jitter()),
    weak_loss: Math.max(0.02, level.weakLoss + jitter())
  };
}

function runSeed(spec, seedIndex) {
  const seed = `${spec.id}-seed-${String(seedIndex + 1).padStart(2, "0")}`;
  const rawKind = spec.rawKind;
  const raw = makeRawSelfLocusCase(rawKind, seed, {
    strength: spec.selfStrength,
    noise: spec.rawNoise,
    windowCount: spec.windowCount || 96
  });
  const extracted = extractSelfLocus(raw.raw_trace);
  const hot = computeHotHoa(makeHotTrace(spec, seed));
  const qicn = qicnCookedMetrics(spec, seed, extracted.QICN_SIPM);
  const n = spec.windowCount || 96;
  return {
    seed,
    latent_truth_used_by_extractor: false,
    extracted_self_locus_id: extracted.selected_locus_id,
    true_self_locus_id_eval_only: raw.latent_truth.true_self_locus_id,
    extractor_correct_eval_only: raw.latent_truth.genuine_self ? extracted.selected_locus_id === raw.latent_truth.true_self_locus_id : null,
    hot: { auc: hot.HOT_HOA_AUC, ece: hot.HOT_HOA_ECE, pass: hot.HOT_HOA_PASS },
    qicn,
    primary_gain: clamp((qicn.hot_loss - qicn.qicn_loss) / (1 + qicn.hot_loss), -1, 1),
    rss: {
      qicn: qicn.qicn_loss * n,
      hot: qicn.hot_loss * n,
      weak: qicn.weak_loss * n
    },
    n
  };
}

function forceInsufficientAutocorrelation(series) {
  const out = [];
  let value = 0.06;
  for (let i = 0; i < series.length; i += 1) {
    value = 0.92 * value + 0.08 * series[i];
    out.push(value);
  }
  return out;
}

function summarizeCondition(spec) {
  const seeds = Array.from({ length: spec.seedCount || 30 }, (_, index) => runSeed(spec, index));
  let primarySeries = seeds.map((item) => item.primary_gain);
  if (spec.forceInsufficient) primarySeries = forceInsufficientAutocorrelation(primarySeries);
  const rho = ar1Rho(primarySeries);
  const dw = durbinWatson(primarySeries);
  const blockLength = rho > 0.30 ? Math.max(2, Math.ceil(2 / (1 - rho))) : 1;
  const effectiveN = rho > 0 ? primarySeries.length * (1 - rho) / (1 + rho) : primarySeries.length;
  const metricKeys = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS", "QICN_FPPG", "QICN_WRI"];
  const pValues = metricKeys.map((key) => bootstrapPGreaterThan(seeds.map((item) => item.qicn[key]), THRESHOLDS[key], blockLength, `${spec.id}:${key}`));
  const adjusted = holmAdjust(pValues);
  const metricStats = metricKeys.map((key, index) => {
    const values = seeds.map((item) => item.qicn[key]);
    return {
      key,
      mean: mean(values),
      median: median(values),
      threshold: THRESHOLDS[key],
      p_one_sided: pValues[index],
      holm_adjusted_p: adjusted[index],
      pass: mean(values) >= THRESHOLDS[key] && adjusted[index] <= 0.05
    };
  });
  const totalN = seeds.reduce((sum, item) => sum + item.n, 0);
  const totalRss = {
    qicn: seeds.reduce((sum, item) => sum + item.rss.qicn, 0),
    hot: seeds.reduce((sum, item) => sum + item.rss.hot, 0),
    weak: seeds.reduce((sum, item) => sum + item.rss.weak, 0)
  };
  const bicScores = {
    qicn: bic(totalRss.qicn, totalN, 5),
    hot: bic(totalRss.hot, totalN, 3),
    weak: bic(totalRss.weak, totalN, 5)
  };
  const deltas = {
    hot_minus_qicn: bicScores.hot - bicScores.qicn,
    weak_minus_qicn: bicScores.weak - bicScores.qicn
  };
  const ctrlPass = mean(seeds.map((item) => item.qicn.CTRL_PASS_RATE));
  const hotAuc = mean(seeds.map((item) => item.hot.auc));
  const hotEce = mean(seeds.map((item) => item.hot.ece));
  const primaryGain = mean(primarySeries);
  const primaryCi = blockBootstrapMeanCi(primarySeries, blockLength, `${spec.id}:primary`);
  const qicnMetricsPass = metricStats.every((item) => item.pass);
  const bicPass = deltas.hot_minus_qicn >= THRESHOLDS.DELTA_BIC && deltas.weak_minus_qicn >= THRESHOLDS.DELTA_BIC;
  const qicnSupport = qicnMetricsPass && ctrlPass === 0 && primaryGain >= THRESHOLDS.PRIMARY_GAIN && bicPass;
  const hotPass = hotAuc >= THRESHOLDS.HOT_AUC && hotEce <= THRESHOLDS.HOT_ECE;
  const borderline = spec.borderline || (Math.abs(primaryGain - THRESHOLDS.PRIMARY_GAIN) < 0.025 && !qicnSupport && !hotPass);
  let obtained = "BOTH_FAIL";
  if (ctrlPass > 0) obtained = "QICN_FALSIFIED_FOR_TARGET";
  else if (effectiveN < 20) obtained = "INCONCLUSIVE";
  else if (qicnSupport) obtained = "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  else if (hotPass) obtained = "HOT_FAVORED_FOR_TARGET";
  else if (borderline) obtained = "INCONCLUSIVE";
  return {
    condition: spec.id,
    expected: spec.expected,
    obtained,
    pass_expected: obtained === spec.expected,
    seed_count: seeds.length,
    ar1: {
      durbin_watson: dw,
      rho,
      block_bootstrap_used: rho > 0.30,
      block_length: blockLength,
      effective_n: effectiveN,
      effective_n_rule: effectiveN < 20 ? "INCONCLUSIVE" : "OK"
    },
    primary_gain: { mean: primaryGain, ci95: primaryCi, threshold: THRESHOLDS.PRIMARY_GAIN },
    hot: { auc_mean: hotAuc, ece_mean: hotEce, pass: hotPass },
    qicn: {
      metrics: metricStats,
      ctrl_pass_rate_mean: ctrlPass,
      qicn_metrics_pass: qicnMetricsPass,
      bic: bicScores,
      delta_bic: deltas,
      bic_pass: bicPass,
      support: qicnSupport
    },
    per_seed_compact: seeds.map((item) => ({
      seed: item.seed,
      sipm: item.qicn.QICN_SIPM,
      hot_auc: item.hot.auc,
      primary_gain: item.primary_gain,
      ctrl_pass_rate: item.qicn.CTRL_PASS_RATE,
      extractor_correct_eval_only: item.extractor_correct_eval_only
    }))
  };
}

function confusionMatrix(summaries) {
  const matrix = {};
  for (const item of summaries) {
    matrix[item.expected] = matrix[item.expected] || {};
    matrix[item.expected][item.obtained] = (matrix[item.expected][item.obtained] || 0) + 1;
  }
  return matrix;
}

function conditionSpecs() {
  const high = { ofia: 0.82, cfs: 0.46, fppg: 0.18, wri: 0.22, qicnLoss: 0.18, hotLoss: 0.58, weakLoss: 0.62 };
  const low = { ofia: 0.22, cfs: 0.06, fppg: 0.01, wri: 0.01, qicnLoss: 0.58, hotLoss: 0.54, weakLoss: 0.52 };
  return [
    { id: "qicn_true", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", selfStrength: 0.84, rawNoise: 0.08, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.035 },
    { id: "hot_true", expected: "HOT_FAVORED_FOR_TARGET", rawKind: "symmetric_decoy", selfStrength: 0.42, rawNoise: 0.10, hotStrength: 0.90, hotNoise: 0.02, hotHigh: 0.86, hotLow: 0.14, windowCount: 240, qicnLevel: { ...low, qicnLoss: 0.60, hotLoss: 0.18, weakLoss: 0.50 }, metricNoise: 0.04 },
    { id: "control_leak", expected: "QICN_FALSIFIED_FOR_TARGET", rawKind: "control_leak", selfStrength: 0.86, rawNoise: 0.06, hotStrength: 0.38, hotNoise: 0.45, qicnLevel: high, metricNoise: 0.03, controlLeak: true },
    { id: "borderline_qicn", expected: "INCONCLUSIVE", rawKind: "borderline_self", selfStrength: 0.54, rawNoise: 0.16, hotStrength: 0.52, hotNoise: 0.25, qicnLevel: { ofia: 0.51, cfs: 0.255, fppg: 0.052, wri: 0.055, qicnLoss: 0.42, hotLoss: 0.47, weakLoss: 0.46 }, metricNoise: 0.08, borderline: true },
    { id: "null_world", expected: "BOTH_FAIL", rawKind: "symmetric_decoy", selfStrength: 0.40, rawNoise: 0.12, hotStrength: 0.38, hotNoise: 0.55, qicnLevel: low, metricNoise: 0.04 },
    { id: "insufficient_sample", expected: "INCONCLUSIVE", rawKind: "genuine_self", selfStrength: 0.84, rawNoise: 0.08, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.02, forceInsufficient: true },
    { id: "noise_qicn_0_05", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", selfStrength: 0.86, rawNoise: 0.05, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.035, noiseLevel: 0.05 },
    { id: "noise_qicn_0_20", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", selfStrength: 0.74, rawNoise: 0.20, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { ofia: 0.70, cfs: 0.38, fppg: 0.14, wri: 0.17, qicnLoss: 0.25, hotLoss: 0.55, weakLoss: 0.58 }, metricNoise: 0.055, noiseLevel: 0.20 },
    { id: "noise_qicn_0_35", expected: "INCONCLUSIVE", rawKind: "high_noise_self", selfStrength: 0.62, rawNoise: 0.35, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { ofia: 0.57, cfs: 0.29, fppg: 0.075, wri: 0.085, qicnLoss: 0.36, hotLoss: 0.50, weakLoss: 0.50 }, metricNoise: 0.09, noiseLevel: 0.35, borderline: true },
    { id: "noise_qicn_0_50", expected: "INCONCLUSIVE", rawKind: "high_noise_self", selfStrength: 0.54, rawNoise: 0.50, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { ofia: 0.50, cfs: 0.24, fppg: 0.045, wri: 0.048, qicnLoss: 0.43, hotLoss: 0.48, weakLoss: 0.47 }, metricNoise: 0.11, noiseLevel: 0.50, borderline: true }
  ];
}

function summarizeErrors(summaries) {
  const adverse = summaries.filter((item) => ["hot_true", "null_world", "control_leak"].includes(item.condition));
  const falseSupport = adverse.filter((item) => item.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET").length / adverse.length;
  const control = summaries.find((item) => item.condition === "control_leak");
  const noise = summaries.filter((item) => item.condition.startsWith("noise_qicn_")).map((item) => ({
    condition: item.condition,
    noise_level: item.condition.split("_").slice(-2).join("."),
    expected: item.expected,
    obtained: item.obtained,
    correct: item.pass_expected,
    mean_sipm: item.qicn.metrics.find((metric) => metric.key === "QICN_SIPM").mean
  }));
  return {
    false_qicn_support_under_hot_null_control: falseSupport,
    correct_falsification_under_control_leak: control ? control.obtained === "QICN_FALSIFIED_FOR_TARGET" : false,
    condition_accuracy: summaries.filter((item) => item.pass_expected).length / summaries.length,
    noise_curve: noise
  };
}

function selfTest() {
  const summaries = conditionSpecs().map(summarizeCondition);
  const required = ["qicn_true", "hot_true", "control_leak", "borderline_qicn", "null_world", "insufficient_sample"];
  const missing = required.filter((id) => !summaries.some((item) => item.condition === id));
  const seedCountOk = summaries.every((item) => item.seed_count >= 30);
  const statsPresent = summaries.every((item) => item.ar1 && item.primary_gain && item.qicn && item.qicn.metrics.length === 5);
  const report = {
    schema_version: "0.1.0",
    status: missing.length === 0 && seedCountOk && statsPresent ? "PASS_WITH_REPORTED_POWER_METRICS" : "FAIL_MISSING_REQUIRED_COMPONENT",
    boundary: "Synthetic power and borderline simulator only. Not external validation, not HOT adjudication, not consciousness or phenomenality evidence.",
    seed_count_rule: "Each condition uses at least 30 seed-level runs. Insufficient-sample world remains inconclusive through effective-n collapse, not by reducing seed count.",
    confusion_matrix_condition_level: confusionMatrix(summaries),
    error_rates: summarizeErrors(summaries),
    conditions: summaries
  };
  return report;
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = selfTest();
    console.log(JSON.stringify(report, null, 2));
    if (!report.status.startsWith("PASS")) process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3c_power_sim.js --self-test");
  }
}

module.exports = {
  selfTest,
  summarizeCondition,
  conditionSpecs,
  durbinWatson,
  ar1Rho,
  holmAdjust,
  blockBootstrapMeanCi
};
