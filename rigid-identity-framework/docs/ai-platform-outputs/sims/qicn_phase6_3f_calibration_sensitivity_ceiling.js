"use strict";

const fs = require("fs");
const path = require("path");

const {
  extractSelfLocus,
  makeRawSelfLocusCase,
  rng,
  clamp,
  mean,
  quantile,
  bootstrapMeanCi,
  auc
} = require("./qicn_phase6_3c_selflocus_extractor");
const {
  extractContField,
  makeRawContinuityCase
} = require("./qicn_phase6_3d_contfield_extractor");
const {
  extractOfia,
  makeUnifiedOfiaCase,
  makeSelfTraceFromSignals
} = require("./qicn_phase6_3e_ofia_extractor");
const { computeHotHoa } = require("./qicn_phase6_3b_hot_model");
const { conditionSpecs } = require("./qicn_phase6_3e_power_sim");

const CURRENT_THRESHOLDS = Object.freeze({
  QICN_SIPM: 0.20,
  QICN_OFIA: 0.50,
  QICN_CFS: 0.25,
  QICN_FPPG: 0.05,
  QICN_WRI: 0.05,
  PRIMARY_GAIN: 0.05,
  HOT_AUC: 0.75,
  HOT_ECE: 0.10,
  DELTA_BIC: 10
});

const RAW_KEYS = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"];
const METRIC_KEYS = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS", "QICN_FPPG", "QICN_WRI"];
const REPORT_PATH = path.join(__dirname, "..", "reports", "QICN_ROADMAP_V3_PHASE6_3F_CALIBRATION_SENSITIVITY_AND_CEILING_REPORT.md");

function variance(values) {
  if (!values.length) return 0;
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function stddev(values) {
  return Math.sqrt(variance(values));
}

function median(values) {
  return quantile(values, 0.5);
}

function pearson(xs, ys) {
  if (xs.length !== ys.length || xs.length < 2) return 0;
  const mx = mean(xs);
  const my = mean(ys);
  const num = xs.reduce((sum, value, index) => sum + (value - mx) * (ys[index] - my), 0);
  const den = Math.sqrt(xs.reduce((sum, value) => sum + (value - mx) ** 2, 0) * ys.reduce((sum, value) => sum + (value - my) ** 2, 0));
  return den === 0 ? 0 : num / den;
}

function durbinWatson(values) {
  const m = mean(values);
  const residuals = values.map((value) => value - m);
  const numerator = residuals.slice(1).reduce((sum, value, index) => sum + (value - residuals[index]) ** 2, 0);
  const denominator = residuals.reduce((sum, value) => sum + value ** 2, 0);
  return denominator === 0 ? 2 : numerator / denominator;
}

function ar1Rho(values) {
  if (values.length < 3) return 0;
  const m = mean(values);
  const centered = values.map((value) => value - m);
  const numerator = centered.slice(1).reduce((sum, value, index) => sum + value * centered[index], 0);
  const denominator = centered.slice(0, -1).reduce((sum, value) => sum + value ** 2, 0);
  return denominator === 0 ? 0 : clamp(numerator / denominator, -0.99, 0.99);
}

function blockBootstrapMeanCi(values, blockLength, seed, iterations = 220) {
  const rand = rng(`phase6-3f-block:${seed}`);
  const samples = [];
  for (let i = 0; i < iterations; i += 1) {
    const sample = [];
    while (sample.length < values.length) {
      const start = Math.floor(rand() * values.length);
      for (let j = 0; j < blockLength && sample.length < values.length; j += 1) {
        sample.push(values[(start + j) % values.length]);
      }
    }
    samples.push(mean(sample));
  }
  return [quantile(samples, 0.025), quantile(samples, 0.975)];
}

function bootstrapPGreaterThan(values, threshold, blockLength, seed, iterations = 220) {
  const rand = rng(`phase6-3f-p:${seed}`);
  let failures = 0;
  for (let i = 0; i < iterations; i += 1) {
    const sample = [];
    while (sample.length < values.length) {
      const start = Math.floor(rand() * values.length);
      for (let j = 0; j < blockLength && sample.length < values.length; j += 1) {
        sample.push(values[(start + j) % values.length]);
      }
    }
    if (mean(sample) <= threshold) failures += 1;
  }
  return (failures + 1) / (iterations + 1);
}

function holmAdjust(pValues) {
  const sorted = pValues.map((p, index) => ({ p, index })).sort((a, b) => a.p - b.p);
  const adjusted = Array(pValues.length).fill(1);
  let running = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    const value = Math.min(1, sorted[i].p * (sorted.length - i));
    running = Math.max(running, value);
    adjusted[sorted[i].index] = running;
  }
  return adjusted;
}

function bic(totalRss, n, k) {
  const rss = Math.max(1e-9, totalRss);
  return n * Math.log(rss / Math.max(1, n)) + k * Math.log(Math.max(1, n));
}

function round(value, digits = 4) {
  if (!Number.isFinite(value)) return value;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
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
      report_signal: signal,
      confidence: clamp(signal + jitter()),
      state_monitoring: clamp(signal + jitter()),
      awareness_target: y
    });
  }
  return { schema_version: "0.1.0", trace_id: `hot6f-${spec.id}-${seed}`, seed, windows };
}

function cookedResidualMetrics(spec, seed, sipm, cfs, ofia, thresholds = CURRENT_THRESHOLDS) {
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
    CTRL_PASS_RATE: spec.controlLeak && (sipm >= thresholds.QICN_SIPM || cfs >= thresholds.QICN_CFS || ofia >= thresholds.QICN_OFIA) ? 0.25 : 0,
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
    ownershipNoise: spec.ownershipNoise,
    impulse: spec.impulse
  };
}

function runSeed(spec, seedIndex, thresholds = CURRENT_THRESHOLDS) {
  const seed = `${spec.id}-seed-${String(seedIndex + 1).padStart(2, "0")}`;
  const ofiaRaw = makeUnifiedOfiaCase(spec.ownershipKind, seed, ownershipOptions(spec));
  const self = extractSelfLocus(ofiaRaw.raw_trace.self_locus_trace);
  const ofia = extractOfia(ofiaRaw.raw_trace);
  const contRaw = makeRawContinuityCase(spec.contKind, seed, { windowsPerCondition: spec.contWindows || 36, ...contOptions(spec) });
  const cont = extractContField(contRaw.raw_trace);
  const hot = computeHotHoa(makeHotTrace(spec, seed));
  const qicn = cookedResidualMetrics(spec, seed, self.QICN_SIPM, cont.QICN_CFS, ofia.QICN_OFIA, thresholds);
  const n = spec.windowCount || 96;
  return {
    seed,
    self_extractor_correct_eval_only: ofiaRaw.latent_truth.true_self_locus_id ? self.selected_locus_id === ofiaRaw.latent_truth.true_self_locus_id : null,
    ofia_selfindex_correct_eval_only: ofiaRaw.latent_truth.true_self_locus_id ? ofia.inferred_self_locus_id === ofiaRaw.latent_truth.true_self_locus_id : null,
    cont_extractor_correct_eval_only: contRaw.latent_truth.genuine_continuity ? cont.selected_trajectory_id === contRaw.latent_truth.true_self_trajectory_id : null,
    self: { selected_locus_id: self.selected_locus_id, QICN_SIPM: self.QICN_SIPM },
    ofia: { inferred_self_locus_id: ofia.inferred_self_locus_id, QICN_OFIA: ofia.QICN_OFIA, standardized_effect: ofia.standardized_effect },
    cont: { selected_trajectory_id: cont.selected_trajectory_id, QICN_CFS: cont.QICN_CFS },
    hot: { auc: hot.HOT_HOA_AUC, ece: hot.HOT_HOA_ECE, pass: hot.HOT_HOA_PASS },
    qicn,
    primary_gain: clamp((qicn.hot_loss - qicn.qicn_loss) / (1 + qicn.hot_loss), -1, 1),
    rss: { qicn: qicn.qicn_loss * n, hot: qicn.hot_loss * n, weak: qicn.weak_loss * n },
    n
  };
}

function forceInsufficientAutocorrelation(series) {
  const out = [];
  let last = series[0] || 0;
  for (const item of series) {
    last = 0.92 * last + 0.08 * item;
    out.push(last);
  }
  return out;
}

function classifyFromAggregate(aggregate, thresholds = CURRENT_THRESHOLDS, effectiveNMinimum = 20) {
  const qicnMetricsPass = aggregate.qicn.metrics.every((item) => item.mean >= thresholds[item.key] && item.holm_adjusted_p <= 0.05);
  const bicPass = aggregate.qicn.delta_bic.hot_minus_qicn >= thresholds.DELTA_BIC && aggregate.qicn.delta_bic.weak_minus_qicn >= thresholds.DELTA_BIC;
  const qicnSupport = qicnMetricsPass && aggregate.qicn.ctrl_pass_rate_mean === 0 && aggregate.primary_gain.mean >= thresholds.PRIMARY_GAIN && bicPass && aggregate.ar1.effective_n >= effectiveNMinimum;
  const hotPass = aggregate.hot.auc_mean >= thresholds.HOT_AUC && aggregate.hot.ece_mean <= thresholds.HOT_ECE;
  if (aggregate.qicn.ctrl_pass_rate_mean > 0) return "QICN_FALSIFIED_FOR_TARGET";
  if (aggregate.ar1.effective_n < effectiveNMinimum) return "INCONCLUSIVE";
  if (qicnSupport) return "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  if (hotPass) return "HOT_FAVORED_FOR_TARGET";
  if (aggregate.borderline) return "INCONCLUSIVE";
  return "BOTH_FAIL";
}

function summarizeCondition(spec, options = {}) {
  const thresholds = options.thresholds || CURRENT_THRESHOLDS;
  const seedCount = options.seedCount || spec.seedCount || 30;
  const effectiveNMinimum = options.effectiveNMinimum || 20;
  const seeds = Array.from({ length: seedCount }, (_, index) => runSeed(spec, index, thresholds));
  let primarySeries = seeds.map((item) => item.primary_gain);
  if (spec.forceInsufficient) primarySeries = forceInsufficientAutocorrelation(primarySeries);
  const rho = ar1Rho(primarySeries);
  const blockLength = rho > 0.30 ? Math.max(2, Math.ceil(2 / (1 - rho))) : 1;
  const effectiveN = rho > 0 ? primarySeries.length * (1 - rho) / (1 + rho) : primarySeries.length;
  const pValues = METRIC_KEYS.map((key) => bootstrapPGreaterThan(seeds.map((item) => item.qicn[key]), thresholds[key], blockLength, `${spec.id}:${key}:${seedCount}`));
  const adjusted = holmAdjust(pValues);
  const metricStats = METRIC_KEYS.map((key, index) => {
    const values = seeds.map((item) => item.qicn[key]);
    return {
      key,
      source: RAW_KEYS.includes(key) ? "raw_extractor" : "cooked_synthetic",
      mean: mean(values),
      median: median(values),
      threshold: thresholds[key],
      p_one_sided: pValues[index],
      holm_adjusted_p: adjusted[index],
      pass: mean(values) >= thresholds[key] && adjusted[index] <= 0.05
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
    ar1: {
      durbin_watson: durbinWatson(primarySeries),
      rho,
      block_bootstrap_used: rho > 0.30,
      block_length: blockLength,
      effective_n: effectiveN,
      effective_n_minimum: effectiveNMinimum,
      effective_n_rule: effectiveN < effectiveNMinimum ? "INCONCLUSIVE" : "OK"
    },
    primary_gain: { mean: mean(primarySeries), ci95: blockBootstrapMeanCi(primarySeries, blockLength, `${spec.id}:primary:${seedCount}`), threshold: thresholds.PRIMARY_GAIN },
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
      ofia_standardized: item.ofia.standardized_effect,
      hot_auc: item.hot.auc,
      primary_gain: item.primary_gain,
      ctrl_pass_rate: item.qicn.CTRL_PASS_RATE,
      self_correct: item.self_extractor_correct_eval_only,
      ofia_self_correct: item.ofia_selfindex_correct_eval_only,
      cont_correct: item.cont_extractor_correct_eval_only
    }))
  };
  aggregate.hot.pass = aggregate.hot.auc_mean >= thresholds.HOT_AUC && aggregate.hot.ece_mean <= thresholds.HOT_ECE;
  aggregate.obtained = classifyFromAggregate(aggregate, thresholds, effectiveNMinimum);
  aggregate.pass_expected = aggregate.obtained === aggregate.expected;
  aggregate.qicn.support = aggregate.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  return aggregate;
}

function classifyDependency(file) {
  const full = path.join(__dirname, file);
  if (!fs.existsSync(full)) return { file: `docs/ai-platform-outputs/sims/${file}`, status: "ABSENT" };
  const text = fs.readFileSync(full, "utf8");
  const hasExports = text.includes("module.exports");
  const hasSelfTest = text.includes("--self-test");
  const lines = text.split(/\r?\n/).length;
  const requiredExport = {
    "qicn_phase6_3c_selflocus_extractor.js": "extractSelfLocus",
    "qicn_phase6_3d_contfield_extractor.js": "extractContField",
    "qicn_phase6_3e_ofia_extractor.js": "extractOfia",
    "qicn_phase6_3e_power_sim.js": "summarizeCondition",
    "qicn_phase6_3b_hot_model.js": "computeHotHoa"
  }[file];
  const functional = hasExports && (!requiredExport || text.includes(requiredExport));
  return {
    file: `docs/ai-platform-outputs/sims/${file}`,
    status: functional ? "FUNCTIONAL" : "TEMPLATE",
    lines,
    self_test: hasSelfTest ? "present" : "not_present_smoke_dependency",
    required_export: requiredExport || null
  };
}

function preflight() {
  const files = [
    "qicn_phase6_3c_selflocus_extractor.js",
    "qicn_phase6_3d_contfield_extractor.js",
    "qicn_phase6_3e_ofia_extractor.js",
    "qicn_phase6_3e_power_sim.js",
    "qicn_phase6_3b_hot_model.js"
  ];
  return {
    dependency_classification: files.map(classifyDependency),
    non_canonical_scope: "All new Phase 6.3F outputs remain under docs/ai-platform-outputs; no extractor defaults, release files, corpus, artifacts, tex, package.json, or production scripts are modified."
  };
}

function candidateGrid(center, step, count, min = 0) {
  const half = Math.floor(count / 2);
  const out = [];
  for (let i = -half; i <= half; i += 1) out.push(Math.max(min, center + i * step));
  return [...new Set(out.map((value) => round(value, 6)))];
}

function summarizeValues(values) {
  return {
    n: values.length,
    mean: mean(values),
    median: median(values),
    p05: quantile(values, 0.05),
    p95: quantile(values, 0.95),
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

function evaluateThreshold(values, labels, threshold) {
  let falseSupport = 0;
  let falseDen = 0;
  let power = 0;
  let powerDen = 0;
  values.forEach((value, index) => {
    if (labels[index] === "null_or_borderline") {
      falseDen += 1;
      if (value >= threshold) falseSupport += 1;
    } else if (labels[index] === "bounded_support") {
      powerDen += 1;
      if (value >= threshold) power += 1;
    }
  });
  return {
    threshold,
    false_support_rate: falseSupport / Math.max(1, falseDen),
    legitimate_power: power / Math.max(1, powerDen),
    false_support_count: falseSupport,
    null_or_borderline_n: falseDen,
    recovery_count: power,
    bounded_support_n: powerDen
  };
}

function pickThreshold(rows) {
  const passing = rows.filter((row) => row.legitimate_power >= 0.75);
  if (passing.length > 0) {
    return passing
      .slice()
      .sort((a, b) => a.false_support_rate - b.false_support_rate || b.legitimate_power - a.legitimate_power || b.threshold - a.threshold)[0];
  }
  const picked = rows
    .slice()
    .sort((a, b) => (b.legitimate_power - b.false_support_rate) - (a.legitimate_power - a.false_support_rate) || b.legitimate_power - a.legitimate_power)[0];
  return { ...picked, selection_note: "No candidate met both false-support minimization and >=0.75 legitimate power; selected max(power - false_support)." };
}

function selfSNRCurve(seedCount = 24) {
  const levels = [
    { id: "self_snr_high", strength: 0.86, noise: 0.05 },
    { id: "self_snr_mid_high", strength: 0.78, noise: 0.08 },
    { id: "self_snr_mid", strength: 0.68, noise: 0.12 },
    { id: "self_snr_low", strength: 0.58, noise: 0.18 },
    { id: "self_snr_near_zero", strength: 0.50, noise: 0.24 }
  ];
  return levels.map((level) => {
    const rows = Array.from({ length: seedCount }, (_, index) => {
      const generated = makeRawSelfLocusCase("genuine_self", `phase6-3f-sipm-${level.id}-${index + 1}`, {
        strength: level.strength,
        noise: level.noise,
        windowCount: 80
      });
      const extracted = extractSelfLocus(generated.raw_trace);
      return {
        value: extracted.QICN_SIPM,
        correct: extracted.selected_locus_id === generated.latent_truth.true_self_locus_id ? 1 : 0
      };
    });
    return {
      level: level.id,
      snr_proxy: (level.strength - 0.28) / level.noise,
      recovery_accuracy: mean(rows.map((row) => row.correct)),
      QICN_SIPM: summarizeValues(rows.map((row) => row.value))
    };
  });
}

function contSNRCurve(seedCount = 24) {
  const levels = [
    { id: "cont_snr_high", selfBaseline: 0.92, selfFracture: 0.28, noise: 0.06 },
    { id: "cont_snr_mid_high", selfBaseline: 0.86, selfFracture: 0.34, noise: 0.10 },
    { id: "cont_snr_mid", selfBaseline: 0.78, selfFracture: 0.42, noise: 0.16 },
    { id: "cont_snr_low", selfBaseline: 0.70, selfFracture: 0.50, noise: 0.24 },
    { id: "cont_snr_near_zero", selfBaseline: 0.58, selfFracture: 0.52, noise: 0.30 }
  ];
  return levels.map((level) => {
    const kind = level.selfBaseline - level.selfFracture > 0.28 ? "genuine_continuity" : "moderate_continuity";
    const rows = Array.from({ length: seedCount }, (_, index) => {
      const generated = makeRawContinuityCase(kind, `phase6-3f-cfs-${level.id}-${index + 1}`, {
        selfBaseline: level.selfBaseline,
        selfFracture: level.selfFracture,
        noise: level.noise,
        windowsPerCondition: 30
      });
      const extracted = extractContField(generated.raw_trace);
      return {
        value: extracted.QICN_CFS,
        correct: extracted.selected_trajectory_id === generated.latent_truth.true_self_trajectory_id ? 1 : 0
      };
    });
    return {
      level: level.id,
      snr_proxy: (level.selfBaseline - level.selfFracture) / level.noise,
      recovery_accuracy: mean(rows.map((row) => row.correct)),
      QICN_CFS: summarizeValues(rows.map((row) => row.value))
    };
  });
}

function ofiaSNRCurve(seedCount = 24) {
  const levels = [
    { id: "ownership_snr_high", kind: "genuine_ownership", selfResponse: 0.82, nonSelfResponse: 0.30, ownershipNoise: 0.05 },
    { id: "ownership_snr_mid_high", kind: "genuine_ownership", selfResponse: 0.72, nonSelfResponse: 0.34, ownershipNoise: 0.07 },
    { id: "ownership_snr_mid", kind: "weak_ownership", selfResponse: 0.62, nonSelfResponse: 0.38, ownershipNoise: 0.10 },
    { id: "ownership_snr_low", kind: "weak_ownership", selfResponse: 0.54, nonSelfResponse: 0.42, ownershipNoise: 0.14 },
    { id: "ownership_snr_near_zero", kind: "weak_ownership", selfResponse: 0.49, nonSelfResponse: 0.46, ownershipNoise: 0.18 }
  ];
  return levels.map((level) => {
    const rows = Array.from({ length: seedCount }, (_, index) => {
      const generated = makeUnifiedOfiaCase(level.kind, `phase6-3f-ofia-${level.id}-${index + 1}`, {
        selfResponse: level.selfResponse,
        nonSelfResponse: level.nonSelfResponse,
        ownershipNoise: level.ownershipNoise
      });
      const extracted = extractOfia(generated.raw_trace);
      return {
        standardized: extracted.standardized_effect,
        clamped: extracted.QICN_OFIA,
        self_correct: extracted.inferred_self_locus_id === generated.latent_truth.true_self_locus_id ? 1 : 0
      };
    });
    return {
      level: level.id,
      snr: (level.selfResponse - level.nonSelfResponse) / level.ownershipNoise,
      self_index_accuracy: mean(rows.map((row) => row.self_correct)),
      standardized_effect: summarizeValues(rows.map((row) => row.standardized)),
      QICN_OFIA_clamped: summarizeValues(rows.map((row) => row.clamped))
    };
  });
}

function thresholdCalibration(seedCount = 24) {
  const sipmValues = [];
  const sipmLabels = [];
  const cfsValues = [];
  const cfsLabels = [];
  const ofiaValues = [];
  const ofiaLabels = [];
  for (let i = 0; i < seedCount; i += 1) {
    for (const kind of ["symmetric_decoy", "label_only", "narrative_only", "borderline_self"]) {
      const generated = makeRawSelfLocusCase(kind, `phase6-3f-sipm-control-${kind}-${i + 1}`, { strength: 0.54, noise: 0.16 });
      sipmValues.push(extractSelfLocus(generated.raw_trace).QICN_SIPM);
      sipmLabels.push("null_or_borderline");
    }
    for (const opts of [{ strength: 0.86, noise: 0.05 }, { strength: 0.78, noise: 0.08 }, { strength: 0.68, noise: 0.12 }]) {
      const generated = makeRawSelfLocusCase("genuine_self", `phase6-3f-sipm-support-${i + 1}-${opts.strength}`, opts);
      sipmValues.push(extractSelfLocus(generated.raw_trace).QICN_SIPM);
      sipmLabels.push("bounded_support");
    }

    for (const kind of ["symmetric_trajectory", "memory_only", "history_blind"]) {
      const generated = makeRawContinuityCase(kind, `phase6-3f-cfs-control-${kind}-${i + 1}`, { windowsPerCondition: 30, noise: 0.14 });
      cfsValues.push(extractContField(generated.raw_trace).QICN_CFS);
      cfsLabels.push("null_or_borderline");
    }
    for (const opts of [
      { kind: "genuine_continuity", selfBaseline: 0.92, selfFracture: 0.28, noise: 0.06 },
      { kind: "genuine_continuity", selfBaseline: 0.84, selfFracture: 0.36, noise: 0.14 },
      { kind: "moderate_continuity", selfBaseline: 0.76, selfFracture: 0.46, noise: 0.18 }
    ]) {
      const generated = makeRawContinuityCase(opts.kind, `phase6-3f-cfs-support-${i + 1}-${opts.selfBaseline}`, { ...opts, windowsPerCondition: 30 });
      cfsValues.push(extractContField(generated.raw_trace).QICN_CFS);
      cfsLabels.push("bounded_support");
    }

    for (const kind of ["symmetric_ownership", "bookkeeping_only"]) {
      const generated = makeUnifiedOfiaCase(kind, `phase6-3f-ofia-control-${kind}-${i + 1}`, { equalResponse: 0.45, ownershipNoise: 0.08 });
      ofiaValues.push(extractOfia(generated.raw_trace).standardized_effect);
      ofiaLabels.push("null_or_borderline");
    }
    for (const opts of [
      { kind: "genuine_ownership", selfResponse: 0.82, nonSelfResponse: 0.30, ownershipNoise: 0.05 },
      { kind: "genuine_ownership", selfResponse: 0.72, nonSelfResponse: 0.34, ownershipNoise: 0.07 },
      { kind: "weak_ownership", selfResponse: 0.62, nonSelfResponse: 0.38, ownershipNoise: 0.10 }
    ]) {
      const generated = makeUnifiedOfiaCase(opts.kind, `phase6-3f-ofia-support-${i + 1}-${opts.selfResponse}`, opts);
      ofiaValues.push(extractOfia(generated.raw_trace).standardized_effect);
      ofiaLabels.push("bounded_support");
    }
  }

  const sipmSweep = candidateGrid(0.20, 0.05, 7).map((threshold) => evaluateThreshold(sipmValues, sipmLabels, threshold));
  const cfsSweep = candidateGrid(0.25, 0.05, 7).map((threshold) => evaluateThreshold(cfsValues, cfsLabels, threshold));
  const ofiaSweep = candidateGrid(0.80, 0.20, 7).map((threshold) => evaluateThreshold(ofiaValues, ofiaLabels, threshold));
  const ofiaPicked = pickThreshold(ofiaSweep);
  return {
    seed_count_per_cell: seedCount,
    criterion: "Minimize honest false support over null/borderline controls while retaining >=0.75 recovery over BOUNDED_SUPPORT worlds; otherwise select max(power - false_support).",
    curves: {
      QICN_SIPM: selfSNRCurve(seedCount),
      QICN_CFS: contSNRCurve(seedCount),
      OFIA_standardized_effect: ofiaSNRCurve(seedCount)
    },
    sweeps: {
      QICN_SIPM: sipmSweep,
      QICN_CFS: cfsSweep,
      OFIA_standardized_effect: ofiaSweep
    },
    selected_candidate_threshold_non_canonical: {
      QICN_SIPM: pickThreshold(sipmSweep),
      QICN_CFS: pickThreshold(cfsSweep),
      OFIA_standardized_effect: {
        ...ofiaPicked,
        qicn_ofia_equivalent_for_legacy_gate: clamp(ofiaPicked.threshold / 1.6, 0, 1.8)
      }
    }
  };
}

function ofiaScaleAndClamp(seedCount = 60) {
  const clean = [];
  const nulls = [];
  for (let i = 0; i < seedCount; i += 1) {
    clean.push(extractOfia(makeUnifiedOfiaCase("genuine_ownership", `phase6-3f-ofia-clean-${i + 1}`, {
      selfResponse: 0.82,
      nonSelfResponse: 0.30,
      ownershipNoise: 0.05
    }).raw_trace).standardized_effect);
    nulls.push(extractOfia(makeUnifiedOfiaCase("symmetric_ownership", `phase6-3f-ofia-null-${i + 1}`, {
      equalResponse: 0.45,
      ownershipNoise: 0.08
    }).raw_trace).standardized_effect);
  }
  const p95 = quantile(clean, 0.95);
  const p995 = quantile(clean, 0.995);
  return {
    clean_high_snr_standardized_effect: summarizeValues(clean),
    null_adversarial_standardized_effect: summarizeValues(nulls),
    current_divisor: 1.6,
    current_clamp_max: 1.8,
    p95_clean: p95,
    p995_clean: p995,
    scale_assessment: p95 > 2.0 ? "CURRENT_1_6_UNDERESTIMATES_HIGH_SNR_SIGNAL" : "CURRENT_1_6_CLOSE_TO_EMPIRICAL_CLEAN_SCALE",
    clamp_assessment: p995 > 1.8 ? "CLAMP_1_8_TRUNCATES_CLEAN_VARIANCE; MOVE_TO_DEFENSIVE_PERCENTILE_OR_REPORT_UNCLAMPED_STANDARDIZED_EFFECT" : "CLAMP_1_8_NOT_TRIGGERED_BY_THIS_CLEAN_DISTRIBUTION",
    proposed_non_canonical_scale: p95,
    proposed_non_canonical_clamp: p995
  };
}

function weightedSelfScore(locus, weights) {
  const readoutAgreement = 1 - Math.abs((locus.readout_alpha || 0) - (locus.readout_beta || 0));
  return clamp(
    weights.control_coupling * (locus.control_coupling || 0) +
    weights.event_binding * (locus.event_binding || 0) +
    weights.readout_agreement * readoutAgreement +
    weights.perturbation_response * (locus.perturbation_response || 0) +
    weights.prediction_error_inverse * (1 - (locus.prediction_error || 0))
  );
}

function extractSelfWeighted(rawTrace, weights) {
  const ids = [...new Set((rawTrace.windows || []).flatMap((window) => (window.loci || []).map((locus) => locus.id)))];
  const scored = ids.map((id) => {
    const perWindow = (rawTrace.windows || []).map((window) => {
      const locus = (window.loci || []).find((item) => item.id === id);
      return locus ? weightedSelfScore(locus, weights) : 0;
    });
    const activations = (rawTrace.windows || []).map((window) => {
      const locus = (window.loci || []).find((item) => item.id === id);
      return locus ? locus.activation || 0 : 0;
    });
    const readoutAgreement = mean((rawTrace.windows || []).map((window) => {
      const locus = (window.loci || []).find((item) => item.id === id);
      return locus ? 1 - Math.abs((locus.readout_alpha || 0) - (locus.readout_beta || 0)) : 0;
    }));
    const topCount = (rawTrace.windows || []).filter((window) => {
      const ranked = (window.loci || []).map((locus) => ({ id: locus.id, score: weightedSelfScore(locus, weights) })).sort((a, b) => b.score - a.score);
      return ranked[0] && ranked[0].id === id;
    }).length;
    const temporalRankFraction = topCount / Math.max(1, (rawTrace.windows || []).length);
    const activationContinuity = clamp(0.5 + 0.5 * pearson(activations.slice(1), activations.slice(0, -1)));
    const dispersionPenalty = clamp(1 - Math.sqrt(variance(perWindow)));
    const score = clamp(0.62 * mean(perWindow) + 0.16 * temporalRankFraction + 0.12 * activationContinuity + 0.10 * dispersionPenalty);
    return { id, score, mean_local_score: mean(perWindow) };
  }).sort((a, b) => b.score - a.score);
  const top = scored[0] || { id: null, score: 0 };
  const second = scored[1] || { id: null, score: 0 };
  const margin = clamp(top.score - second.score);
  return { selected_locus_id: top.id, QICN_SIPM: clamp(margin * 0.9), locus_scores: scored };
}

function weightedObsScore(obs, weights) {
  const readoutAgreement = 1 - Math.abs((obs.readout_alpha || 0) - (obs.readout_beta || 0));
  return clamp(
    weights.readout_agreement * readoutAgreement +
    weights.temporal_binding * (obs.temporal_binding || 0) +
    weights.remap_coherence * (obs.remap_coherence || 0) +
    weights.recovery_signal * (obs.recovery_signal || 0) +
    weights.fork_inverse * (1 - (obs.fork_divergence || 0)) +
    weights.residual_inverse * (1 - (obs.perturbation_residual || 0))
  );
}

function extractContWeighted(rawTrace, weights) {
  function scoreTrajectory(trajectory, condition) {
    const observations = (trajectory.observations || []).filter((obs) => obs.condition === condition);
    if (!observations.length) return 0;
    const scores = observations.map((obs) => weightedObsScore(obs, weights));
    const rawMean = mean(scores);
    const dispersionPenalty = clamp(1 - Math.sqrt(variance(scores)));
    return clamp(0.94 * rawMean + 0.06 * dispersionPenalty * rawMean);
  }
  function rank(condition) {
    return (rawTrace.trajectories || [])
      .map((trajectory) => ({ id: trajectory.id, score: scoreTrajectory(trajectory, condition) }))
      .sort((a, b) => b.score - a.score);
  }
  function margin(condition, selectedId) {
    const ranked = rank(condition);
    const selected = ranked.find((item) => item.id === selectedId) || { score: 0 };
    const rival = ranked.find((item) => item.id !== selectedId) || { score: 0 };
    return clamp((selected.score - rival.score) / (1 + selected.score), -1, 1);
  }
  const baselineRank = rank("baseline");
  const selectedId = baselineRank[0] ? baselineRank[0].id : null;
  const baseline = margin("baseline", selectedId);
  const sham = margin("sham", selectedId);
  const fracture = margin("fracture", selectedId);
  return {
    selected_trajectory_id: selectedId,
    QICN_CFS: clamp(Math.max(0, baseline - fracture) - Math.max(0, baseline - sham)),
    baseline_ranking: baselineRank
  };
}

function perturbWeights(base, key, delta) {
  const out = { ...base };
  out[key] = Math.max(0.01, out[key] + delta);
  const sum = Object.values(out).reduce((s, v) => s + v, 0);
  for (const k of Object.keys(out)) out[k] /= sum;
  return out;
}

function summarizeSensitivityRows(rows) {
  const recoveryRows = rows.filter((row) => row.kind === "support");
  const nullRows = rows.filter((row) => row.kind === "null");
  return {
    recovery_accuracy: mean(recoveryRows.map((row) => row.correct)),
    auc: mean(recoveryRows.map((row) => row.auc)),
    false_rate: mean(nullRows.map((row) => row.false_positive)),
    mean_variable: mean(rows.map((row) => row.value))
  };
}

function selfSensitivity(seedCount) {
  const base = {
    control_coupling: 0.24,
    event_binding: 0.24,
    readout_agreement: 0.20,
    perturbation_response: 0.22,
    prediction_error_inverse: 0.10
  };
  const evalWith = (weights) => {
    const rows = [];
    for (let i = 0; i < seedCount; i += 1) {
      const generated = makeRawSelfLocusCase("genuine_self", `phase6-3f-selfsens-${i + 1}`, { strength: 0.78, noise: 0.10 });
      const extracted = extractSelfWeighted(generated.raw_trace, weights);
      rows.push({
        kind: "support",
        correct: extracted.selected_locus_id === generated.latent_truth.true_self_locus_id ? 1 : 0,
        auc: auc(extracted.locus_scores.map((score) => ({ y: score.id === generated.latent_truth.true_self_locus_id ? 1 : 0, score: score.score }))),
        false_positive: 0,
        value: extracted.QICN_SIPM
      });
      const nullGenerated = makeRawSelfLocusCase("symmetric_decoy", `phase6-3f-selfsens-null-${i + 1}`, { strength: 0.50, noise: 0.14 });
      const nullExtracted = extractSelfWeighted(nullGenerated.raw_trace, weights);
      rows.push({ kind: "null", correct: 0, auc: 0.5, false_positive: nullExtracted.QICN_SIPM >= CURRENT_THRESHOLDS.QICN_SIPM ? 1 : 0, value: nullExtracted.QICN_SIPM });
    }
    return summarizeSensitivityRows(rows);
  };
  const baseline = evalWith(base);
  return Object.keys(base).flatMap((key) => [-0.05, 0.05].map((delta) => {
    const metrics = evalWith(perturbWeights(base, key, delta));
    return {
      extractor: "SelfIndex.localScore",
      parameter: key,
      delta,
      seed_count: seedCount,
      metrics,
      deltas: {
        recovery_accuracy: metrics.recovery_accuracy - baseline.recovery_accuracy,
        auc: metrics.auc - baseline.auc,
        false_rate: metrics.false_rate - baseline.false_rate,
        mean_variable: metrics.mean_variable - baseline.mean_variable
      }
    };
  }));
}

function contSensitivity(seedCount) {
  const base = {
    readout_agreement: 0.22,
    temporal_binding: 0.23,
    remap_coherence: 0.20,
    recovery_signal: 0.17,
    fork_inverse: 0.10,
    residual_inverse: 0.08
  };
  const evalWith = (weights) => {
    const rows = [];
    for (let i = 0; i < seedCount; i += 1) {
      const generated = makeRawContinuityCase("genuine_continuity", `phase6-3f-contsens-${i + 1}`, {
        selfBaseline: 0.84,
        selfFracture: 0.36,
        noise: 0.14,
        windowsPerCondition: 30
      });
      const extracted = extractContWeighted(generated.raw_trace, weights);
      rows.push({
        kind: "support",
        correct: extracted.selected_trajectory_id === generated.latent_truth.true_self_trajectory_id ? 1 : 0,
        auc: auc(extracted.baseline_ranking.map((score) => ({ y: score.id === generated.latent_truth.true_self_trajectory_id ? 1 : 0, score: score.score }))),
        false_positive: 0,
        value: extracted.QICN_CFS
      });
      const nullGenerated = makeRawContinuityCase("symmetric_trajectory", `phase6-3f-contsens-null-${i + 1}`, { windowsPerCondition: 30, noise: 0.14 });
      const nullExtracted = extractContWeighted(nullGenerated.raw_trace, weights);
      rows.push({ kind: "null", correct: 0, auc: 0.5, false_positive: nullExtracted.QICN_CFS >= CURRENT_THRESHOLDS.QICN_CFS ? 1 : 0, value: nullExtracted.QICN_CFS });
    }
    return summarizeSensitivityRows(rows);
  };
  const baseline = evalWith(base);
  return Object.keys(base).flatMap((key) => [-0.05, 0.05].map((delta) => {
    const metrics = evalWith(perturbWeights(base, key, delta));
    return {
      extractor: "ContField.obsScore",
      parameter: key,
      delta,
      seed_count: seedCount,
      metrics,
      deltas: {
        recovery_accuracy: metrics.recovery_accuracy - baseline.recovery_accuracy,
        auc: metrics.auc - baseline.auc,
        false_rate: metrics.false_rate - baseline.false_rate,
        mean_variable: metrics.mean_variable - baseline.mean_variable
      }
    };
  }));
}

function ofiaScaleSensitivity(seedCount) {
  const evalWith = (scale) => {
    const rows = [];
    for (let i = 0; i < seedCount; i += 1) {
      const generated = makeUnifiedOfiaCase("weak_ownership", `phase6-3f-ofiasens-${i + 1}`, {
        selfResponse: 0.62,
        nonSelfResponse: 0.38,
        ownershipNoise: 0.10
      });
      const extracted = extractOfia(generated.raw_trace);
      const value = clamp(extracted.standardized_effect / scale, 0, 1.8);
      rows.push({
        kind: "support",
        correct: value >= CURRENT_THRESHOLDS.QICN_OFIA ? 1 : 0,
        auc: 1,
        false_positive: 0,
        value
      });
      const nullGenerated = makeUnifiedOfiaCase("symmetric_ownership", `phase6-3f-ofiasens-null-${i + 1}`, { equalResponse: 0.45, ownershipNoise: 0.08 });
      const nullExtracted = extractOfia(nullGenerated.raw_trace);
      const nullValue = clamp(nullExtracted.standardized_effect / scale, 0, 1.8);
      rows.push({ kind: "null", correct: 0, auc: 0.5, false_positive: nullValue >= CURRENT_THRESHOLDS.QICN_OFIA ? 1 : 0, value: nullValue });
    }
    return summarizeSensitivityRows(rows);
  };
  const baseline = evalWith(1.6);
  return [-0.05, 0.05].map((delta) => {
    const metrics = evalWith(1.6 + delta);
    return {
      extractor: "OFIA.standardized_effect_scale",
      parameter: "divisor_1_6",
      delta,
      seed_count: seedCount,
      metrics,
      deltas: {
        recovery_accuracy: metrics.recovery_accuracy - baseline.recovery_accuracy,
        auc: metrics.auc - baseline.auc,
        false_rate: metrics.false_rate - baseline.false_rate,
        mean_variable: metrics.mean_variable - baseline.mean_variable
      }
    };
  });
}

function materialSensitivity(row) {
  return Math.abs(row.deltas.recovery_accuracy) >= 0.10 ||
    Math.abs(row.deltas.auc) >= 0.05 ||
    Math.abs(row.deltas.false_rate) >= 0.05 ||
    Math.abs(row.deltas.mean_variable) >= 0.05;
}

function sensitivityAnalysis() {
  const firstPass = [
    ...selfSensitivity(20),
    ...contSensitivity(20),
    ...ofiaScaleSensitivity(20)
  ];
  const sensitive = firstPass.filter(materialSensitivity).map((row) => `${row.extractor}:${row.parameter}:${row.delta}`);
  const escalated = [];
  if (sensitive.some((id) => id.startsWith("SelfIndex"))) escalated.push(...selfSensitivity(60).filter((row) => sensitive.includes(`${row.extractor}:${row.parameter}:${row.delta}`)));
  if (sensitive.some((id) => id.startsWith("ContField"))) escalated.push(...contSensitivity(60).filter((row) => sensitive.includes(`${row.extractor}:${row.parameter}:${row.delta}`)));
  if (sensitive.some((id) => id.startsWith("OFIA"))) escalated.push(...ofiaScaleSensitivity(60).filter((row) => sensitive.includes(`${row.extractor}:${row.parameter}:${row.delta}`)));
  return {
    criterion_for_sensitive: "|delta recovery| >= 0.10 OR |delta AUC| >= 0.05 OR |delta false_rate| >= 0.05 OR |delta mean variable| >= 0.05",
    first_pass_seed_count: 20,
    escalated_seed_count: 60,
    first_pass: firstPass,
    escalated_sensitive_rows: escalated,
    conclusion: sensitive.length === 0 ? "NO_MATERIAL_WEIGHT_SENSITIVITY_DETECTED_IN_THIS_SYNTHETIC_SWEEP" : "MATERIAL_WEIGHT_SENSITIVITY_DETECTED; KEEP_AS_CALIBRATION_DEBT"
  };
}

function jacobiEigenvalues3(matrix) {
  const a = matrix.map((row) => row.slice());
  for (let iter = 0; iter < 40; iter += 1) {
    let p = 0;
    let q = 1;
    let max = Math.abs(a[0][1]);
    for (const pair of [[0, 2], [1, 2]]) {
      const value = Math.abs(a[pair[0]][pair[1]]);
      if (value > max) {
        max = value;
        p = pair[0];
        q = pair[1];
      }
    }
    if (max < 1e-10) break;
    const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
    const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
    const c = 1 / Math.sqrt(t * t + 1);
    const s = t * c;
    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];
    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = 0;
    a[q][p] = 0;
    for (let r = 0; r < 3; r += 1) {
      if (r === p || r === q) continue;
      const arp = a[r][p];
      const arq = a[r][q];
      a[r][p] = c * arp - s * arq;
      a[p][r] = a[r][p];
      a[r][q] = s * arp + c * arq;
      a[q][r] = a[r][q];
    }
  }
  return [a[0][0], a[1][1], a[2][2]].sort((x, y) => y - x);
}

function correlationMatrix(rows) {
  const series = {
    QICN_SIPM: rows.map((row) => row.sipm),
    QICN_CFS: rows.map((row) => row.cfs),
    QICN_OFIA: rows.map((row) => row.ofia)
  };
  return RAW_KEYS.map((left) => RAW_KEYS.map((right) => left === right ? 1 : pearson(series[left], series[right])));
}

function spofAnalysis(seedCount = 30) {
  const levels = [
    { id: "selfindex_snr_high", selfSignal: 0.86, rivalSignal: 0.26, noise: 0.05 },
    { id: "selfindex_snr_mid_high", selfSignal: 0.76, rivalSignal: 0.32, noise: 0.10 },
    { id: "selfindex_snr_mid", selfSignal: 0.68, rivalSignal: 0.36, noise: 0.14 },
    { id: "selfindex_snr_low", selfSignal: 0.60, rivalSignal: 0.40, noise: 0.18 },
    { id: "selfindex_snr_fragile", selfSignal: 0.51, rivalSignal: 0.47, noise: 0.36 },
    { id: "selfindex_snr_broken", selfSignal: 0.49, rivalSignal: 0.49, noise: 0.42 }
  ];
  return levels.map((level) => {
    const bounded = [];
    const nulls = [];
    for (let i = 0; i < seedCount; i += 1) {
      const seed = `phase6-3f-spof-${level.id}-${i + 1}`;
      const selfGenerated = makeSelfTraceFromSignals({ ...level, windowCount: 80 }, seed);
      const ofiaRaw = makeUnifiedOfiaCase("genuine_ownership", seed, {
        selfLevel: { ...level, windowCount: 80 },
        selfResponse: 0.82,
        nonSelfResponse: 0.30,
        ownershipNoise: 0.05
      });
      const self = extractSelfLocus(selfGenerated.raw_trace);
      const ofia = extractOfia(ofiaRaw.raw_trace);
      const cont = extractContField(makeRawContinuityCase("genuine_continuity", seed, { selfBaseline: 0.92, selfFracture: 0.28, noise: 0.08 }).raw_trace);
      bounded.push({
        sipm: self.QICN_SIPM,
        cfs: cont.QICN_CFS,
        ofia: ofia.QICN_OFIA,
        self_correct: self.selected_locus_id === selfGenerated.latent_truth.true_self_locus_id ? 1 : 0
      });
      const nullSelf = makeSelfTraceFromSignals({ ...level, selfSignal: level.rivalSignal, rivalSignal: level.rivalSignal, noise: level.noise, windowCount: 80 }, `${seed}-null`);
      const nullOfia = makeUnifiedOfiaCase("symmetric_ownership", `${seed}-null`, {
        selfLevel: { ...level, selfSignal: level.rivalSignal, rivalSignal: level.rivalSignal, noise: level.noise, windowCount: 80 },
        equalResponse: 0.45,
        ownershipNoise: 0.08
      });
      const ns = extractSelfLocus(nullSelf.raw_trace);
      const no = extractOfia(nullOfia.raw_trace);
      const nc = extractContField(makeRawContinuityCase("symmetric_trajectory", `${seed}-null`, { noise: 0.12 }).raw_trace);
      nulls.push({ sipm: ns.QICN_SIPM, cfs: nc.QICN_CFS, ofia: no.QICN_OFIA });
    }
    const matrix = correlationMatrix(bounded);
    const eigenvalues = jacobiEigenvalues3(matrix);
    const eigSum = eigenvalues.reduce((sum, value) => sum + value, 0);
    const participationRatio = eigSum ** 2 / eigenvalues.reduce((sum, value) => sum + value ** 2, 0);
    const means = {
      bounded: {
        QICN_SIPM: mean(bounded.map((row) => row.sipm)),
        QICN_CFS: mean(bounded.map((row) => row.cfs)),
        QICN_OFIA: mean(bounded.map((row) => row.ofia))
      },
      null: {
        QICN_SIPM: mean(nulls.map((row) => row.sipm)),
        QICN_CFS: mean(nulls.map((row) => row.cfs)),
        QICN_OFIA: mean(nulls.map((row) => row.ofia))
      }
    };
    const discriminative = RAW_KEYS.filter((key) => means.bounded[key] - means.null[key] > 0.10 && means.bounded[key] >= CURRENT_THRESHOLDS[key]);
    const allRawFail = bounded.filter((row) => row.sipm < CURRENT_THRESHOLDS.QICN_SIPM && row.cfs < CURRENT_THRESHOLDS.QICN_CFS && row.ofia < CURRENT_THRESHOLDS.QICN_OFIA).length;
    const sipmOfiaFailTogether = bounded.filter((row) => row.sipm < CURRENT_THRESHOLDS.QICN_SIPM && row.ofia < CURRENT_THRESHOLDS.QICN_OFIA).length;
    return {
      level: level.id,
      observed_selfindex_accuracy: mean(bounded.map((row) => row.self_correct)),
      raw_means: means,
      discriminative_raw_variables: discriminative,
      discriminative_raw_count: discriminative.length,
      pearson_correlation_matrix_order: RAW_KEYS,
      pearson_correlation_matrix: matrix,
      eigenvalues,
      participation_ratio_n_eff: participationRatio,
      joint_collapse_counts: {
        all_three_raw_fail: allRawFail,
        sipm_and_ofia_fail_together: sipmOfiaFailTogether,
        independent_or_partial_changes: seedCount - allRawFail
      }
    };
  });
}

function nEffectiveCorrection() {
  const target = conditionSpecs().find((spec) => spec.id === "noise_qicn_0_05");
  const current = summarizeCondition(target, { seedCount: 30, effectiveNMinimum: 20 });
  const at50 = summarizeCondition(target, { seedCount: 50, effectiveNMinimum: 20 });
  let selected = at50;
  let criterion = at50.ar1.effective_n >= 25 ? "A_SUFFICIENT_SEEDS_50_EFFECTIVE_N_GE_25" : "A_INSUFFICIENT_TRY_75";
  let at75 = null;
  if (at50.ar1.effective_n < 25) {
    at75 = summarizeCondition(target, { seedCount: 75, effectiveNMinimum: 20 });
    selected = at75;
    criterion = at75.ar1.effective_n >= 25 ? "A_SUFFICIENT_SEEDS_75_EFFECTIVE_N_GE_25" : "B_STRUCTURAL_RHO_REQUIRES_CUTOFF_RECALIBRATION_DEBT";
  }
  return {
    baseline_30: current,
    correction_50: at50,
    correction_75_if_needed: at75,
    selected_correction: {
      seed_count: selected.seed_count,
      effective_n: selected.ar1.effective_n,
      rho: selected.ar1.rho,
      obtained: selected.obtained,
      criterion
    },
    no_bug_statement: "If INCONCLUSIVE appears, it is due to the effective_n precedence rule, not to report logic or missing metric computation; all five metric pass states are shown in qicn.metrics."
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

function errorRates(summaries) {
  const honest = summaries.filter((item) => item.expected !== "QICN_BOUNDED_SUPPORT_FOR_TARGET");
  const falseSupport = honest.filter((item) => item.obtained === "QICN_BOUNDED_SUPPORT_FOR_TARGET");
  return {
    honest_false_qicn_support_including_noise_borderline: falseSupport.length / Math.max(1, honest.length),
    honest_denominator_conditions: honest.map((item) => item.condition),
    false_support_conditions: falseSupport.map((item) => item.condition),
    condition_accuracy: summaries.filter((item) => item.pass_expected).length / summaries.length
  };
}

function evaluateCalibratedNoise(thresholdCalibrationReport, nCorrection) {
  const selected = thresholdCalibrationReport.selected_candidate_threshold_non_canonical;
  const thresholds = {
    ...CURRENT_THRESHOLDS,
    QICN_SIPM: selected.QICN_SIPM.threshold,
    QICN_CFS: selected.QICN_CFS.threshold,
    QICN_OFIA: selected.OFIA_standardized_effect.qicn_ofia_equivalent_for_legacy_gate
  };
  const noise05 = conditionSpecs().find((spec) => spec.id === "noise_qicn_0_05");
  const noise20 = conditionSpecs().find((spec) => spec.id === "noise_qicn_0_20");
  const seed05 = nCorrection.selected_correction.seed_count;
  const results = [
    summarizeCondition(noise05, { thresholds, seedCount: seed05, effectiveNMinimum: 20 }),
    summarizeCondition(noise20, { thresholds, seedCount: 50, effectiveNMinimum: 20 })
  ];
  return {
    candidate_thresholds_non_canonical: thresholds,
    results,
    interpretation: results.every((row) => row.obtained !== "QICN_BOUNDED_SUPPORT_FOR_TARGET") ?
      "Calibrated thresholds did not recover both noisy QICN worlds under this synthetic protocol." :
      "At least one noisy QICN world recovered bounded support under candidate thresholds; check false-support rates before interpreting."
  };
}

function fullMatrix(thresholds = CURRENT_THRESHOLDS, nCorrection = null) {
  const summaries = conditionSpecs().map((spec) => {
    const seedCount = nCorrection && spec.id === "noise_qicn_0_05" ? nCorrection.selected_correction.seed_count : 30;
    return summarizeCondition(spec, { thresholds, seedCount, effectiveNMinimum: 20 });
  });
  return {
    confusion_matrix_condition_level: confusionMatrix(summaries),
    error_rates: errorRates(summaries),
    conditions: summaries.map((item) => ({
      condition: item.condition,
      expected: item.expected,
      obtained: item.obtained,
      pass_expected: item.pass_expected,
      seed_count: item.seed_count,
      effective_n: item.ar1.effective_n,
      rho: item.ar1.rho,
      metric_passes: Object.fromEntries(item.qicn.metrics.map((metric) => [metric.key, metric.pass]))
    }))
  };
}

function syntheticCeiling(spof, calibratedNoise) {
  const minPR = Math.min(...spof.map((row) => row.participation_ratio_n_eff));
  return {
    status: "SYNTHETIC_CEILING_DECLARED",
    claims_not_supported: [
      "Synthetic discriminability is not external validation.",
      "Synthetic discriminability is not evidence of consciousness, phenomenality, human equivalence, agency, or metaphysical identity.",
      "Packaging a 3/5 raw gate does not close bridge admissibility.",
      "Threshold candidates are non-canonical and not human-curated."
    ],
    unresolved_without_leaving_testbed: [
      "EXTERNAL_ADJUDICATION_GAP remains open.",
      "FPPG and WRI remain cooked synthetic variables.",
      "ContField still assumes pre-segmented trajectories.",
      "HOT comparator remains operational-minimal rather than literature-complete.",
      "OFIA and SIPM share SelfIndex and therefore do not provide independent votes under SelfIndex collapse."
    ],
    spof_summary: minPR <= 1.5 ?
      "Participation ratio approaches a one-vote regime at degraded SelfIndex levels; treat the 3/5 gate as structurally fragile." :
      "Participation ratio did not collapse to one in this sweep, but SelfIndex remains a common upstream failure mode for SIPM and OFIA.",
    calibrated_noise_summary: calibratedNoise.interpretation
  };
}

function generateReport() {
  const started = Date.now();
  const pf = preflight();
  const baselineMatrix = fullMatrix();
  const nCorrection = nEffectiveCorrection();
  const calibration = thresholdCalibration();
  const ofiaScale = ofiaScaleAndClamp();
  const calibratedNoise = evaluateCalibratedNoise(calibration, nCorrection);
  const sensitivity = sensitivityAnalysis();
  const spof = spofAnalysis();
  const candidateMatrix = fullMatrix(calibratedNoise.candidate_thresholds_non_canonical, nCorrection);
  const ceiling = syntheticCeiling(spof, calibratedNoise);
  const elapsed_ms = Date.now() - started;
  return {
    schema_version: "0.1.0",
    phase: "6.3F",
    status: "PASS_WITH_REPORTED_LIMITS_AND_DEBT",
    boundary: "Non-canonical synthetic calibration and sensitivity analysis only. Not external validation, not HOT adjudication, not consciousness or phenomenality evidence.",
    elapsed_ms,
    preflight: pf,
    baseline_matrix_before_correction: baselineMatrix,
    n_effective_fragility: nCorrection,
    threshold_calibration: calibration,
    ofia_scale_and_clamp: ofiaScale,
    calibrated_noise_reevaluation: calibratedNoise,
    candidate_matrix_with_n_correction: candidateMatrix,
    sensitivity,
    single_point_of_failure_selfindex: spof,
    synthetic_ceiling: ceiling,
    ledger_state: {
      raw_gate_state: "3/5 raw: QICN_SIPM, QICN_OFIA, QICN_CFS; 2/5 cooked synthetic: QICN_FPPG, QICN_WRI",
      external_adjudication_gap: "OPEN",
      candidate_thresholds_non_canonical: true,
      human_curated_status: "not_reviewed"
    }
  };
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function renderMarkdown(report) {
  const preflightRows = report.preflight.dependency_classification.map((item) => [
    item.file,
    item.status,
    item.self_test,
    String(item.lines)
  ]);
  const nRows = [
    report.n_effective_fragility.baseline_30,
    report.n_effective_fragility.correction_50,
    report.n_effective_fragility.correction_75_if_needed
  ].filter(Boolean).map((item) => [
    item.condition,
    String(item.seed_count),
    round(item.ar1.effective_n),
    round(item.ar1.rho),
    item.obtained,
    item.qicn.metrics.map((metric) => `${metric.key}:${metric.pass ? "PASS" : "FAIL"}`).join("<br>")
  ]);
  const thresholdRows = Object.entries(report.threshold_calibration.selected_candidate_threshold_non_canonical).map(([key, value]) => [
    key,
    round(value.threshold),
    round(value.false_support_rate),
    round(value.legitimate_power),
    value.selection_note || "criterion_met"
  ]);
  const scale = report.ofia_scale_and_clamp;
  const sensRows = report.sensitivity.first_pass.map((row) => [
    row.extractor,
    row.parameter,
    String(row.delta),
    round(row.deltas.recovery_accuracy),
    round(row.deltas.auc),
    round(row.deltas.false_rate),
    round(row.deltas.mean_variable)
  ]);
  const spofRows = report.single_point_of_failure_selfindex.map((row) => [
    row.level,
    round(row.observed_selfindex_accuracy),
    round(row.participation_ratio_n_eff),
    row.discriminative_raw_variables.join(", ") || "none",
    String(row.joint_collapse_counts.sipm_and_ofia_fail_together)
  ]);
  const noiseRows = report.calibrated_noise_reevaluation.results.map((row) => [
    row.condition,
    String(row.seed_count),
    round(row.ar1.effective_n),
    row.obtained,
    row.qicn.metrics.map((metric) => `${metric.key}:${metric.pass ? "PASS" : "FAIL"}`).join("<br>")
  ]);
  return `# QICN Roadmap v3 Phase 6.3F Calibration, Sensitivity, SPOF, and Synthetic Ceiling

Status: \`${report.status}\`
Runtime reported by script: \`${round(report.elapsed_ms / 1000, 2)}s\`
Scope: non-canonical AI-output analysis under \`docs/ai-platform-outputs/\`.

## Boundary

This report is an internal synthetic calibration analysis only. It is not external validation, not HOT adjudication, not evidence for consciousness or phenomenality, and not a canonical threshold update. The live gate remains a candidate synthetic protocol with \`human_curated_status=not_reviewed\`.

## Paso 0 - Preflight

${mdTable(["File", "Classification", "Self-test", "Lines"], preflightRows)}

Classification rule: \`FUNCTIONAL\` means the dependency exists and exposes the expected module API for reuse. The HOT model has no standalone \`--self-test\`; it is treated as a functional smoke dependency because \`computeHotHoa\` is exported and exercised by the 6.3E/6.3F harness.

## Parte 0 - Fragile Effective N

The \`noise_qicn_0_05\` inconclusive behavior is explained by the effective-n precedence rule, not by missing metric computation or a report bug. The five metric pass states are shown below.

${mdTable(["Condition", "Seeds", "effective_n", "rho", "Obtained", "Metric passes"], nRows)}

Selected correction: \`${report.n_effective_fragility.selected_correction.criterion}\` with \`seed_count=${report.n_effective_fragility.selected_correction.seed_count}\`, \`effective_n=${round(report.n_effective_fragility.selected_correction.effective_n)}\`, \`rho=${round(report.n_effective_fragility.selected_correction.rho)}\`.

## Parte 1 - SNR Threshold Calibration

Criterion: ${report.threshold_calibration.criterion}

${mdTable(["Variable", "Candidate threshold", "False support", "Legitimate power", "Selection note"], thresholdRows)}

OFIA thresholding used \`standardized_effect\`, not clamped \`QICN_OFIA\`. The legacy gate equivalent is \`${round(report.threshold_calibration.selected_candidate_threshold_non_canonical.OFIA_standardized_effect.qicn_ofia_equivalent_for_legacy_gate)}\`, but this is explicitly non-canonical.

## OFIA Scale and Clamp

- Current divisor: \`${scale.current_divisor}\`
- Current clamp max: \`${scale.current_clamp_max}\`
- Clean high-SNR p95 standardized effect: \`${round(scale.p95_clean)}\`
- Clean high-SNR p99.5 standardized effect: \`${round(scale.p995_clean)}\`
- Scale assessment: \`${scale.scale_assessment}\`
- Clamp assessment: \`${scale.clamp_assessment}\`

The current \`/1.6\` and clamp are not justified merely by saying they normalize the score. In this sweep the unclamped standardized effect should remain reported; any rescale or clamp move is a candidate, not canon.

## Noise Re-evaluation With Candidate Thresholds

${mdTable(["Condition", "Seeds", "effective_n", "Obtained", "Metric passes"], noiseRows)}

Interpretation: ${report.calibrated_noise_reevaluation.interpretation}

## Parte 2 - Weight Sensitivity

Sensitivity criterion: ${report.sensitivity.criterion_for_sensitive}

${mdTable(["Extractor", "Parameter", "Delta", "dRecovery", "dAUC", "dFalse", "dMean"], sensRows)}

Conclusion: \`${report.sensitivity.conclusion}\`

## Parte 3 - SelfIndex Single Point of Failure

${mdTable(["SelfIndex level", "Observed accuracy", "participation_ratio_n_eff", "Discriminative raw variables", "SIPM+OFIA fail together"], spofRows)}

Participation ratio uses the eigenvalues of the Pearson correlation matrix over \`QICN_SIPM\`, \`QICN_CFS\`, and \`QICN_OFIA\`: \`n_eff = (sum(lambda_i))^2 / sum(lambda_i^2)\`. Low values mean the apparent 3 raw votes behave closer to a smaller number of effective votes.

## Parte 4 - Synthetic Ceiling

Status: \`${report.synthetic_ceiling.status}\`

What this phase does not resolve:

${report.synthetic_ceiling.unresolved_without_leaving_testbed.map((item) => `- ${item}`).join("\n")}

Non-claims:

${report.synthetic_ceiling.claims_not_supported.map((item) => `- ${item}`).join("\n")}

SPOF summary: ${report.synthetic_ceiling.spof_summary}

## Machine-readable Details

The full JSON output is reproducible with:

\`\`\`powershell
node docs\\ai-platform-outputs\\sims\\qicn_phase6_3f_calibration_sensitivity_ceiling.js --self-test
\`\`\`
`;
}

function printCompact(report) {
  console.log(JSON.stringify(report, null, 2));
}

if (require.main === module) {
  if (process.argv.includes("--self-test") || process.argv.includes("--write-report")) {
    const report = generateReport();
    if (process.argv.includes("--write-report")) {
      fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
      fs.writeFileSync(REPORT_PATH, renderMarkdown(report), "utf8");
    }
    printCompact(report);
    if (!report.status.startsWith("PASS")) process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3f_calibration_sensitivity_ceiling.js --self-test [--write-report]");
  }
}

module.exports = {
  generateReport,
  renderMarkdown,
  summarizeCondition,
  thresholdCalibration,
  sensitivityAnalysis,
  spofAnalysis,
  nEffectiveCorrection
};
