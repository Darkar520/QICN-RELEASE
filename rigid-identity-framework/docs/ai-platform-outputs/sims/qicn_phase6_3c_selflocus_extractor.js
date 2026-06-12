#!/usr/bin/env node
"use strict";

function seedToUint32(seed) {
  let hash = 2166136261;
  for (const char of String(seed)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rng(seed) {
  let state = seedToUint32(seed);
  return function next() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function variance(values) {
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function correlation(values) {
  if (values.length < 3) return 0;
  const left = values.slice(1);
  const right = values.slice(0, -1);
  const ml = mean(left);
  const mr = mean(right);
  const numerator = left.reduce((sum, value, index) => sum + (value - ml) * (right[index] - mr), 0);
  const denominator = Math.sqrt(left.reduce((sum, value) => sum + (value - ml) ** 2, 0) * right.reduce((sum, value) => sum + (value - mr) ** 2, 0));
  return denominator > 0 ? numerator / denominator : 0;
}

function quantile(values, q) {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] === undefined ? sorted[base] : sorted[base] + rest * (sorted[base + 1] - sorted[base]);
}

function bootstrapMeanCi(values, seed, iterations = 400) {
  const rand = rng(`bootstrap:${seed}`);
  const samples = [];
  for (let i = 0; i < iterations; i += 1) {
    let total = 0;
    for (let j = 0; j < values.length; j += 1) total += values[Math.floor(rand() * values.length)];
    samples.push(total / Math.max(1, values.length));
  }
  return { low: quantile(samples, 0.025), high: quantile(samples, 0.975) };
}

function auc(pairs) {
  const positives = pairs.filter((item) => item.y === 1);
  const negatives = pairs.filter((item) => item.y === 0);
  if (positives.length === 0 || negatives.length === 0) return 0.5;
  let wins = 0;
  for (const pos of positives) {
    for (const neg of negatives) {
      if (pos.score > neg.score) wins += 1;
      else if (pos.score === neg.score) wins += 0.5;
    }
  }
  return wins / (positives.length * negatives.length);
}

function localScore(locus) {
  const readoutAgreement = 1 - Math.abs((locus.readout_alpha || 0) - (locus.readout_beta || 0));
  return clamp(
    0.24 * (locus.control_coupling || 0) +
    0.24 * (locus.event_binding || 0) +
    0.20 * readoutAgreement +
    0.22 * (locus.perturbation_response || 0) +
    0.10 * (1 - (locus.prediction_error || 0))
  );
}

function extractSelfLocus(rawTrace) {
  const ids = [...new Set((rawTrace.windows || []).flatMap((window) => (window.loci || []).map((locus) => locus.id)))];
  const scored = ids.map((id) => {
    const perWindow = (rawTrace.windows || []).map((window) => {
      const locus = (window.loci || []).find((item) => item.id === id);
      return locus ? localScore(locus) : 0;
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
      const ranked = (window.loci || []).map((locus) => ({ id: locus.id, score: localScore(locus) })).sort((a, b) => b.score - a.score);
      return ranked[0] && ranked[0].id === id;
    }).length;
    const temporalRankFraction = topCount / Math.max(1, (rawTrace.windows || []).length);
    const activationContinuity = clamp(0.5 + 0.5 * correlation(activations));
    const dispersionPenalty = clamp(1 - Math.sqrt(variance(perWindow)));
    const score = clamp(0.62 * mean(perWindow) + 0.16 * temporalRankFraction + 0.12 * activationContinuity + 0.10 * dispersionPenalty);
    return { id, score, mean_local_score: mean(perWindow), temporal_rank_fraction: temporalRankFraction, activation_continuity: activationContinuity, readout_agreement: readoutAgreement };
  }).sort((a, b) => b.score - a.score);
  const top = scored[0] || { id: null, score: 0 };
  const second = scored[1] || { id: null, score: 0 };
  const margin = clamp(top.score - second.score);
  const robustness = clamp(0.55 + 0.25 * (top.temporal_rank_fraction || 0) + 0.20 * (top.readout_agreement || 0));
  return {
    schema_version: "0.1.0",
    status: "candidate_extractor_non_canonical",
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    selected_locus_id: top.id,
    selected_score: top.score,
    runner_up_locus_id: second.id,
    runner_up_score: second.score,
    raw_margin: margin,
    QICN_SIPM: clamp(margin * robustness),
    support_threshold: 0.20,
    passes_self_locus_margin: clamp(margin * robustness) >= 0.20,
    locus_scores: scored,
    information_boundary: "extractSelfLocus receives raw_trace only. It does not receive latent_truth, true_self_locus_id, world_id, expected ownership, cooked continuity scores, or precomputed QICN variables."
  };
}

function makeRawSelfLocusCase(kind, seed, options = {}) {
  const rand = rng(`${kind}:${seed}`);
  const locusCount = options.locusCount || 4;
  const windowCount = options.windowCount || 80;
  const noise = options.noise === undefined ? 0.08 : options.noise;
  const strength = options.strength === undefined ? 0.82 : options.strength;
  const selfIndex = Math.floor(rand() * locusCount);
  const selfId = `L${selfIndex}`;
  const genuine = kind === "genuine_self" || kind === "borderline_self" || kind === "high_noise_self";
  const leak = kind === "control_leak";
  const windows = [];
  let phase = rand();
  for (let t = 0; t < windowCount; t += 1) {
    phase = 0.86 * phase + 0.14 * rand();
    const condition = kind === "label_only" ? "label_only" : kind === "narrative_only" ? "narrative_only" : kind === "symmetric_decoy" ? "symmetric_decoy" : kind === "high_noise_self" ? "high_noise" : "baseline";
    const loci = [];
    for (let i = 0; i < locusCount; i += 1) {
      const id = `L${i}`;
      const isSignal = (genuine && id === selfId) || (leak && id === "L0");
      const labelOnly = kind === "label_only" && id === "L0";
      const narrativeOnly = kind === "narrative_only" && id === "L1";
      const base = isSignal ? strength : kind === "symmetric_decoy" ? 0.48 : 0.28 + 0.08 * rand();
      const jitter = () => (rand() - 0.5) * noise;
      const readout = clamp(base + 0.04 * Math.sin(t / 6 + i) + jitter());
      loci.push({
        id,
        activation: clamp((isSignal ? 0.64 + 0.18 * phase : 0.42 + 0.20 * rand()) + jitter()),
        prediction_error: clamp(isSignal ? 0.18 + 0.05 * rand() + Math.abs(jitter()) : 0.54 + 0.18 * rand() + Math.abs(jitter())),
        control_coupling: clamp(isSignal ? base + jitter() : 0.26 + 0.14 * rand() + jitter()),
        event_binding: clamp(isSignal ? base + jitter() : 0.25 + 0.16 * rand() + jitter()),
        readout_alpha: readout,
        readout_beta: clamp(isSignal ? readout + jitter() * 0.35 : 0.35 + 0.35 * rand()),
        perturbation_response: clamp(isSignal ? base + jitter() : 0.22 + 0.15 * rand() + jitter()),
        symbolic_label_intensity: clamp(labelOnly || leak && id === "L0" ? 0.92 + jitter() : 0.12 + 0.20 * rand()),
        narrative_coherence: clamp(narrativeOnly ? 0.92 + jitter() : 0.16 + 0.20 * rand())
      });
    }
    windows.push({ t, condition, loci });
  }
  return {
    raw_trace: {
      schema_version: "0.1.0",
      trace_id: `raw-selflocus-${kind}-${seed}`,
      seed: String(seed),
      windows
    },
    latent_truth: {
      kind,
      genuine_self: genuine,
      true_self_locus_id: genuine ? selfId : null,
      chance_accuracy: 1 / locusCount
    }
  };
}

function ablateSelfLocusSignals(rawTrace) {
  return {
    ...rawTrace,
    trace_id: `${rawTrace.trace_id}-ablated`,
    windows: (rawTrace.windows || []).map((window) => {
      const localMean = mean((window.loci || []).map((locus) => localScore(locus)));
      return {
        ...window,
        loci: (window.loci || []).map((locus) => ({
          ...locus,
          control_coupling: localMean,
          event_binding: localMean,
          readout_alpha: 0.50,
          readout_beta: 0.50,
          perturbation_response: localMean
        }))
      };
    })
  };
}

function evaluateExtractor() {
  const seeds = Array.from({ length: 60 }, (_, index) => `phase6-3c-extractor-${index + 1}`);
  const recovery = seeds.map((seed) => {
    const generated = makeRawSelfLocusCase("genuine_self", seed);
    const extracted = extractSelfLocus(generated.raw_trace);
    return { seed, correct: extracted.selected_locus_id === generated.latent_truth.true_self_locus_id ? 1 : 0, extracted, truth: generated.latent_truth };
  });
  const aucPairs = recovery.flatMap((item) => item.extracted.locus_scores.map((score) => ({ y: score.id === item.truth.true_self_locus_id ? 1 : 0, score: score.score })));
  const nullKinds = ["label_only", "narrative_only", "symmetric_decoy"];
  const nullRuns = nullKinds.flatMap((kind) => seeds.map((seed) => {
    const generated = makeRawSelfLocusCase(kind, seed);
    const extracted = extractSelfLocus(generated.raw_trace);
    return { kind, seed, false_self: extracted.passes_self_locus_margin ? 1 : 0, sipm: extracted.QICN_SIPM };
  }));
  const ablations = seeds.slice(0, 40).map((seed) => {
    const generated = makeRawSelfLocusCase("genuine_self", `ablation-${seed}`);
    const before = extractSelfLocus(generated.raw_trace);
    const after = extractSelfLocus(ablateSelfLocusSignals(generated.raw_trace));
    return { seed, before: before.QICN_SIPM, after: after.QICN_SIPM, drop: before.QICN_SIPM - after.QICN_SIPM };
  });
  const accuracyValues = recovery.map((item) => item.correct);
  const falseValues = nullRuns.map((item) => item.false_self);
  const drops = ablations.map((item) => item.drop);
  const result = {
    schema_version: "0.1.0",
    status: "PASS",
    boundary: "Extractor identifiability on synthetic raw traces only. Not external validation and not evidence for consciousness or phenomenality.",
    information_boundary: "Evaluation harness stores latent_truth separately. extractSelfLocus(raw_trace) never receives latent_truth, world_id, true_self_locus_id, expected labels, cooked weights, or precomputed QICN variables.",
    recovery: {
      seeds: recovery.length,
      chance_accuracy: 0.25,
      accuracy: mean(accuracyValues),
      accuracy_ci95: bootstrapMeanCi(accuracyValues, "recovery-ci"),
      auc_vs_nonself_loci: auc(aucPairs)
    },
    null_controls: {
      runs: nullRuns.length,
      false_self_rate: mean(falseValues),
      false_self_rate_ci95: bootstrapMeanCi(falseValues, "false-ci"),
      mean_null_sipm: mean(nullRuns.map((item) => item.sipm)),
      by_kind: nullKinds.map((kind) => {
        const subset = nullRuns.filter((item) => item.kind === kind);
        return { kind, false_self_rate: mean(subset.map((item) => item.false_self)), mean_sipm: mean(subset.map((item) => item.sipm)) };
      })
    },
    ablation: {
      runs: ablations.length,
      mean_before_sipm: mean(ablations.map((item) => item.before)),
      mean_after_sipm: mean(ablations.map((item) => item.after)),
      mean_drop: mean(drops),
      drop_ci95: bootstrapMeanCi(drops, "drop-ci")
    }
  };
  result.status = result.recovery.accuracy > result.recovery.chance_accuracy + 0.20 && result.recovery.auc_vs_nonself_loci > 0.70 && result.null_controls.false_self_rate <= 0.10 && result.ablation.mean_drop > 0.12 ? "PASS" : "FAIL_REVIEW_REQUIRED";
  return result;
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = evaluateExtractor();
    console.log(JSON.stringify(report, null, 2));
    if (report.status !== "PASS") process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3c_selflocus_extractor.js --self-test");
  }
}

module.exports = {
  extractSelfLocus,
  makeRawSelfLocusCase,
  ablateSelfLocusSignals,
  evaluateExtractor,
  rng,
  clamp,
  mean,
  quantile,
  bootstrapMeanCi,
  auc
};
