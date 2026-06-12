#!/usr/bin/env node
"use strict";

const { computeHotHoa } = require("./qicn_phase6_3b_hot_model");
const { extractSelfLocus, rng, clamp, mean, quantile, bootstrapMeanCi } = require("./qicn_phase6_3c_selflocus_extractor");
const { extractContField, makeRawContinuityCase } = require("./qicn_phase6_3d_contfield_extractor");
const { extractOfia, makeUnifiedOfiaCase } = require("./qicn_phase6_3e_ofia_extractor");

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
  const rand = rng(`block-bootstrap-6e:${seed}`);
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
  const rand = rng(`p-bootstrap-6e:${seed}`);
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
  const rand = rng(`hot6d:${spec.id}:${seed}`);
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
      report_signal: signal,
      confidence: clamp(hotAligned ? signal + jitter() : 0.48 + jitter()),
      state_monitoring: clamp(hotAligned ? signal + jitter() : 0.48 + jitter())
    });
  }
  return { schema_version: "0.1.0", trace_id: `hot6e-${spec.id}-${seed}`, seed, windows };
}

function cookedResidualMetrics(spec, seed, sipm, cfs, ofia) {
  const rand = rng(`qicn-6e-residual:${spec.id}:${seed}`);
  const noise = spec.metricNoise || 0.04;
  const jitter = () => (rand() - 0.5) * noise;
  const level = spec.qicnLevel;
  return {
    QICN_SIPM: sipm,
    QICN_OFIA: ofia,
    QICN_CFS: cfs,
    QICN_FPPG: clamp(level.fppg + jitter(), 0, 1),
    QICN_WRI: clamp(level.wri + jitter(), 0, 1),
    CTRL_PASS_RATE: spec.controlLeak && (sipm >= THRESHOLDS.QICN_SIPM || cfs >= THRESHOLDS.QICN_CFS || ofia >= THRESHOLDS.QICN_OFIA) ? 0.25 : 0,
    qicn_loss: Math.max(0.02, level.qicnLoss + jitter()),
    hot_loss: Math.max(0.02, level.hotLoss + jitter()),
    weak_loss: Math.max(0.02, level.weakLoss + jitter())
  };
}

function contOptions(spec) {
  if (spec.contOptions) return spec.contOptions;
  if (spec.contKind === "genuine_continuity") return { selfBaseline: 0.92, selfFracture: 0.28, noise: 0.08 };
  if (spec.contKind === "moderate_continuity") return { selfBaseline: 0.84, selfFracture: 0.36, noise: 0.18 };
  if (spec.contKind === "weak_continuity") return { selfBaseline: 0.72, selfFracture: 0.48, noise: 0.28 };
  return { noise: spec.rawNoise || 0.12 };
}

function ownershipOptions(spec) {
  return {
    selfKind: spec.rawKind,
    selfStrength: spec.selfStrength,
    selfNoise: spec.rawNoise,
    windowCount: spec.windowCount || 96,
    selfLevel: spec.selfLevel,
    selfResponse: spec.selfResponse,
    nonSelfResponse: spec.nonSelfResponse,
    equalResponse: spec.equalResponse,
    ownershipNoise: spec.ownershipNoise
  };
}

function runSeed(spec, seedIndex) {
  const seed = `${spec.id}-seed-${String(seedIndex + 1).padStart(2, "0")}`;
  const ofiaRaw = makeUnifiedOfiaCase(spec.ownershipKind, seed, ownershipOptions(spec));
  const self = extractSelfLocus(ofiaRaw.raw_trace.self_locus_trace);
  const ofia = extractOfia(ofiaRaw.raw_trace);
  const contRaw = makeRawContinuityCase(spec.contKind, seed, { windowsPerCondition: spec.contWindows || 36, ...contOptions(spec) });
  const cont = extractContField(contRaw.raw_trace);
  const hot = computeHotHoa(makeHotTrace(spec, seed));
  const qicn = cookedResidualMetrics(spec, seed, self.QICN_SIPM, cont.QICN_CFS, ofia.QICN_OFIA);
  const n = spec.windowCount || 96;
  return {
    seed,
    raw_variable_count: 3,
    cooked_variable_count: 2,
    self_extractor_correct_eval_only: ofiaRaw.latent_truth.true_self_locus_id ? self.selected_locus_id === ofiaRaw.latent_truth.true_self_locus_id : null,
    ofia_selfindex_correct_eval_only: ofiaRaw.latent_truth.true_self_locus_id ? ofia.inferred_self_locus_id === ofiaRaw.latent_truth.true_self_locus_id : null,
    cont_extractor_correct_eval_only: contRaw.latent_truth.genuine_continuity ? cont.selected_trajectory_id === contRaw.latent_truth.true_self_trajectory_id : null,
    self: { selected_locus_id: self.selected_locus_id, QICN_SIPM: self.QICN_SIPM },
    ofia: { inferred_self_locus_id: ofia.inferred_self_locus_id, QICN_OFIA: ofia.QICN_OFIA, standardized_effect: ofia.standardized_effect },
    cont: { selected_trajectory_id: cont.selected_trajectory_id, QICN_CFS: cont.QICN_CFS, baseline: cont.QICN_CONT_BASELINE, fracture: cont.QICN_CONT_FRACTURE },
    hot: { auc: hot.HOT_HOA_AUC, ece: hot.HOT_HOA_ECE, pass: hot.HOT_HOA_PASS },
    qicn,
    primary_gain: clamp((qicn.hot_loss - qicn.qicn_loss) / (1 + qicn.hot_loss), -1, 1),
    rss: { qicn: qicn.qicn_loss * n, hot: qicn.hot_loss * n, weak: qicn.weak_loss * n },
    n
  };
}

function forceInsufficientAutocorrelation(series) {
  const out = [];
  let value = 0.06;
  for (const item of series) {
    value = 0.92 * value + 0.08 * item;
    out.push(value);
  }
  return out;
}

function classifyFromAggregate(aggregate, thresholds = THRESHOLDS) {
  const qicnMetricsPass = aggregate.qicn.metrics.every((item) => item.mean >= thresholds[item.key] && item.holm_adjusted_p <= 0.05);
  const bicPass = aggregate.qicn.delta_bic.hot_minus_qicn >= thresholds.DELTA_BIC && aggregate.qicn.delta_bic.weak_minus_qicn >= thresholds.DELTA_BIC;
  const qicnSupport = qicnMetricsPass && aggregate.qicn.ctrl_pass_rate_mean === 0 && aggregate.primary_gain.mean >= thresholds.PRIMARY_GAIN && bicPass && aggregate.ar1.effective_n >= 20;
  const hotPass = aggregate.hot.auc_mean >= thresholds.HOT_AUC && aggregate.hot.ece_mean <= thresholds.HOT_ECE;
  if (aggregate.qicn.ctrl_pass_rate_mean > 0) return "QICN_FALSIFIED_FOR_TARGET";
  if (aggregate.ar1.effective_n < 20) return "INCONCLUSIVE";
  if (qicnSupport) return "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  if (hotPass) return "HOT_FAVORED_FOR_TARGET";
  if (aggregate.borderline) return "INCONCLUSIVE";
  return "BOTH_FAIL";
}

function summarizeCondition(spec) {
  const seeds = Array.from({ length: spec.seedCount || 30 }, (_, index) => runSeed(spec, index));
  let primarySeries = seeds.map((item) => item.primary_gain);
  if (spec.forceInsufficient) primarySeries = forceInsufficientAutocorrelation(primarySeries);
  const rho = ar1Rho(primarySeries);
  const blockLength = rho > 0.30 ? Math.max(2, Math.ceil(2 / (1 - rho))) : 1;
  const effectiveN = rho > 0 ? primarySeries.length * (1 - rho) / (1 + rho) : primarySeries.length;
  const metricKeys = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS", "QICN_FPPG", "QICN_WRI"];
  const pValues = metricKeys.map((key) => bootstrapPGreaterThan(seeds.map((item) => item.qicn[key]), THRESHOLDS[key], blockLength, `${spec.id}:${key}`));
  const adjusted = holmAdjust(pValues);
  const metricStats = metricKeys.map((key, index) => {
    const values = seeds.map((item) => item.qicn[key]);
    return {
      key,
      source: ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"].includes(key) ? "raw_extractor" : "cooked_synthetic",
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
  const bicScores = { qicn: bic(totalRss.qicn, totalN, 5), hot: bic(totalRss.hot, totalN, 3), weak: bic(totalRss.weak, totalN, 5) };
  const aggregate = {
    condition: spec.id,
    expected: spec.expected,
    borderline: Boolean(spec.borderline),
    seed_count: seeds.length,
    raw_gate_variables: ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"],
    cooked_gate_variables: ["QICN_FPPG", "QICN_WRI"],
    ar1: { durbin_watson: durbinWatson(primarySeries), rho, block_bootstrap_used: rho > 0.30, block_length: blockLength, effective_n: effectiveN, effective_n_rule: effectiveN < 20 ? "INCONCLUSIVE" : "OK" },
    primary_gain: { mean: mean(primarySeries), ci95: blockBootstrapMeanCi(primarySeries, blockLength, `${spec.id}:primary`), threshold: THRESHOLDS.PRIMARY_GAIN },
    hot: { auc_mean: mean(seeds.map((item) => item.hot.auc)), ece_mean: mean(seeds.map((item) => item.hot.ece)), pass: false },
    qicn: {
      metrics: metricStats,
      ctrl_pass_rate_mean: mean(seeds.map((item) => item.qicn.CTRL_PASS_RATE)),
      bic: bicScores,
      delta_bic: { hot_minus_qicn: bicScores.hot - bicScores.qicn, weak_minus_qicn: bicScores.weak - bicScores.qicn },
      support: false
    },
    per_seed_compact: seeds.map((item) => ({
      seed: item.seed,
      sipm: item.qicn.QICN_SIPM,
      ofia: item.qicn.QICN_OFIA,
      cfs: item.qicn.QICN_CFS,
      hot_auc: item.hot.auc,
      primary_gain: item.primary_gain,
      ctrl_pass_rate: item.qicn.CTRL_PASS_RATE,
      self_correct: item.self_extractor_correct_eval_only,
      ofia_self_correct: item.ofia_selfindex_correct_eval_only,
      cont_correct: item.cont_extractor_correct_eval_only
    }))
  };
  aggregate.hot.pass = aggregate.hot.auc_mean >= THRESHOLDS.HOT_AUC && aggregate.hot.ece_mean <= THRESHOLDS.HOT_ECE;
  aggregate.obtained = classifyFromAggregate(aggregate, THRESHOLDS);
  aggregate.pass_expected = aggregate.obtained === aggregate.expected;
  aggregate.qicn.support = aggregate.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  return aggregate;
}

function conditionSpecs() {
  const high = { fppg: 0.18, wri: 0.22, qicnLoss: 0.18, hotLoss: 0.58, weakLoss: 0.62 };
  const low = { fppg: 0.01, wri: 0.01, qicnLoss: 0.58, hotLoss: 0.54, weakLoss: 0.52 };
  return [
    { id: "qicn_true", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", ownershipKind: "genuine_ownership", contKind: "genuine_continuity", selfStrength: 0.84, rawNoise: 0.08, selfResponse: 0.82, nonSelfResponse: 0.30, ownershipNoise: 0.05, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.035 },
    { id: "hot_true", expected: "HOT_FAVORED_FOR_TARGET", rawKind: "symmetric_decoy", ownershipKind: "symmetric_ownership", contKind: "symmetric_trajectory", selfStrength: 0.42, rawNoise: 0.10, equalResponse: 0.44, hotStrength: 0.90, hotNoise: 0.02, hotHigh: 0.86, hotLow: 0.14, windowCount: 240, qicnLevel: { ...low, qicnLoss: 0.60, hotLoss: 0.18, weakLoss: 0.50 }, metricNoise: 0.04 },
    { id: "control_leak", expected: "QICN_FALSIFIED_FOR_TARGET", rawKind: "genuine_self", ownershipKind: "genuine_ownership", contKind: "genuine_continuity", selfStrength: 0.86, rawNoise: 0.06, selfResponse: 0.82, nonSelfResponse: 0.30, hotStrength: 0.38, hotNoise: 0.45, qicnLevel: high, metricNoise: 0.03, controlLeak: true },
    { id: "borderline_qicn", expected: "INCONCLUSIVE", rawKind: "borderline_self", ownershipKind: "weak_ownership", contKind: "weak_continuity", selfStrength: 0.54, rawNoise: 0.16, selfResponse: 0.58, nonSelfResponse: 0.38, ownershipNoise: 0.10, hotStrength: 0.52, hotNoise: 0.25, qicnLevel: { fppg: 0.052, wri: 0.055, qicnLoss: 0.42, hotLoss: 0.47, weakLoss: 0.46 }, metricNoise: 0.08, borderline: true },
    { id: "null_world", expected: "BOTH_FAIL", rawKind: "symmetric_decoy", ownershipKind: "symmetric_ownership", contKind: "symmetric_trajectory", selfStrength: 0.40, rawNoise: 0.12, equalResponse: 0.44, hotStrength: 0.38, hotNoise: 0.55, qicnLevel: low, metricNoise: 0.04 },
    { id: "insufficient_sample", expected: "INCONCLUSIVE", rawKind: "genuine_self", ownershipKind: "genuine_ownership", contKind: "genuine_continuity", selfStrength: 0.84, rawNoise: 0.08, selfResponse: 0.82, nonSelfResponse: 0.30, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.02, forceInsufficient: true },
    { id: "noise_qicn_0_05", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", ownershipKind: "genuine_ownership", contKind: "genuine_continuity", selfStrength: 0.86, rawNoise: 0.05, selfResponse: 0.82, nonSelfResponse: 0.30, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: high, metricNoise: 0.035, noiseLevel: 0.05 },
    { id: "noise_qicn_0_20", expected: "QICN_BOUNDED_SUPPORT_FOR_TARGET", rawKind: "genuine_self", ownershipKind: "weak_ownership", contKind: "moderate_continuity", selfStrength: 0.74, rawNoise: 0.20, selfResponse: 0.64, nonSelfResponse: 0.36, ownershipNoise: 0.09, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { fppg: 0.14, wri: 0.17, qicnLoss: 0.25, hotLoss: 0.55, weakLoss: 0.58 }, metricNoise: 0.055, noiseLevel: 0.20 },
    { id: "noise_qicn_0_35", expected: "INCONCLUSIVE", rawKind: "high_noise_self", ownershipKind: "weak_ownership", contKind: "moderate_continuity", selfStrength: 0.62, rawNoise: 0.35, selfResponse: 0.58, nonSelfResponse: 0.40, ownershipNoise: 0.14, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { fppg: 0.075, wri: 0.085, qicnLoss: 0.36, hotLoss: 0.50, weakLoss: 0.50 }, metricNoise: 0.09, noiseLevel: 0.35, borderline: true },
    { id: "noise_qicn_0_50", expected: "INCONCLUSIVE", rawKind: "high_noise_self", ownershipKind: "symmetric_ownership", contKind: "weak_continuity", selfStrength: 0.54, rawNoise: 0.50, equalResponse: 0.45, hotStrength: 0.35, hotNoise: 0.55, qicnLevel: { fppg: 0.045, wri: 0.048, qicnLoss: 0.43, hotLoss: 0.48, weakLoss: 0.47 }, metricNoise: 0.11, noiseLevel: 0.50, borderline: true }
  ];
}

function confusionMatrix(summaries) {
  const matrix = {};
  for (const item of summaries) {
    matrix[item.expected] = matrix[item.expected] || {};
    matrix[item.expected][item.obtained] = (matrix[item.expected][item.obtained] || 0) + 1;
  }
  return matrix;
}

function errorRates(summaries) {
  const narrow = summaries.filter((item) => ["hot_true", "null_world", "control_leak"].includes(item.condition));
  const honest = summaries.filter((item) => item.expected !== "QICN_BOUNDED_SUPPORT_FOR_TARGET");
  const rate = (items) => items.filter((item) => item.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET").length / Math.max(1, items.length);
  return {
    legacy_narrow_false_qicn_support: rate(narrow),
    honest_false_qicn_support_including_noise_borderline: rate(honest),
    honest_denominator_conditions: honest.map((item) => item.condition),
    false_support_conditions: honest.filter((item) => item.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET").map((item) => item.condition),
    correct_falsification_under_control_leak: summaries.some((item) => item.condition === "control_leak" && item.obtained === "QICN_FALSIFIED_FOR_TARGET"),
    condition_accuracy: summaries.filter((item) => item.pass_expected).length / summaries.length
  };
}

function selfTest() {
  const started = Date.now();
  const summaries = conditionSpecs().map(summarizeCondition);
  const elapsed_ms = Date.now() - started;
  const required = ["qicn_true", "hot_true", "control_leak", "borderline_qicn", "null_world", "insufficient_sample", "noise_qicn_0_05", "noise_qicn_0_20", "noise_qicn_0_35", "noise_qicn_0_50"];
  const missing = required.filter((id) => !summaries.some((item) => item.condition === id));
  const seedCountOk = summaries.every((item) => item.seed_count >= 30);
  const statsPresent = summaries.every((item) => item.ar1 && item.primary_gain && item.qicn && item.qicn.metrics.length === 5);
  return {
    schema_version: "0.1.0",
    status: missing.length === 0 && seedCountOk && statsPresent ? "PASS_WITH_REPORTED_LIMITS_AND_DEBT" : "FAIL_MISSING_REQUIRED_COMPONENT",
    boundary: "Synthetic 6.3E simulator only. Not external validation, not HOT adjudication, not consciousness or phenomenality evidence.",
    elapsed_ms,
    gate_raw_state: { raw_variables: ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"], cooked_variables: ["QICN_FPPG", "QICN_WRI"], raw_fraction: "3/5" },
    threshold_calibration_deferred_to_phase6_3f: true,
    confusion_matrix_condition_level: confusionMatrix(summaries),
    error_rates: errorRates(summaries),
    conditions: summaries
  };
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = selfTest();
    console.log(JSON.stringify(report, null, 2));
    if (!report.status.startsWith("PASS")) process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3e_power_sim.js --self-test");
  }
}

module.exports = {
  selfTest,
  summarizeCondition,
  conditionSpecs,
  errorRates
};
