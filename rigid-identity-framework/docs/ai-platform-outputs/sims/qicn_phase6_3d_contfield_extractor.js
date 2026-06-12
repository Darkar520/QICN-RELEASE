#!/usr/bin/env node
"use strict";

const { extractSelfLocus, makeRawSelfLocusCase, rng, clamp, mean, quantile, bootstrapMeanCi, auc } = require("./qicn_phase6_3c_selflocus_extractor");

function variance(values) {
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function temporalSmoothness(values) {
  if (values.length < 2) return 0;
  const diffs = values.slice(1).map((value, index) => Math.abs(value - values[index]));
  return clamp(1 - mean(diffs));
}

function obsScore(obs) {
  const readoutAgreement = 1 - Math.abs((obs.readout_alpha || 0) - (obs.readout_beta || 0));
  return clamp(
    0.22 * readoutAgreement +
    0.23 * (obs.temporal_binding || 0) +
    0.20 * (obs.remap_coherence || 0) +
    0.17 * (obs.recovery_signal || 0) +
    0.10 * (1 - (obs.fork_divergence || 0)) +
    0.08 * (1 - (obs.perturbation_residual || 0))
  );
}

function conditionObservations(trajectory, condition) {
  return (trajectory.observations || []).filter((obs) => obs.condition === condition);
}

function trajectoryScore(trajectory, condition) {
  const observations = conditionObservations(trajectory, condition);
  if (observations.length === 0) return 0;
  const scores = observations.map(obsScore);
  const alphas = observations.map((obs) => obs.readout_alpha || 0);
  const betas = observations.map((obs) => obs.readout_beta || 0);
  const binding = observations.map((obs) => obs.temporal_binding || 0);
  const smoothness = mean([temporalSmoothness(alphas), temporalSmoothness(betas), temporalSmoothness(binding)]);
  const dispersionPenalty = clamp(1 - Math.sqrt(variance(scores)));
  const rawMean = mean(scores);
  return clamp(0.82 * rawMean + 0.12 * smoothness * rawMean + 0.06 * dispersionPenalty * rawMean);
}

function rankTrajectories(rawTrace, condition) {
  return (rawTrace.trajectories || [])
    .map((trajectory) => ({ id: trajectory.id, score: trajectoryScore(trajectory, condition) }))
    .sort((a, b) => b.score - a.score);
}

function marginFor(rawTrace, condition, selectedId) {
  const ranked = rankTrajectories(rawTrace, condition);
  const selected = ranked.find((item) => item.id === selectedId) || { id: selectedId, score: 0 };
  const rival = ranked.find((item) => item.id !== selectedId) || { id: null, score: 0 };
  return {
    condition,
    selected_id: selectedId,
    selected_score: selected.score,
    best_rival_id: rival.id,
    best_rival_score: rival.score,
    margin: clamp((selected.score - rival.score) / (1 + selected.score), -1, 1)
  };
}

function extractContField(rawTrace) {
  const baselineRank = rankTrajectories(rawTrace, "baseline");
  const top = baselineRank[0] || { id: null, score: 0 };
  const selectedId = top.id;
  const baseline = marginFor(rawTrace, "baseline", selectedId);
  const sham = marginFor(rawTrace, "sham", selectedId);
  const fracture = marginFor(rawTrace, "fracture", selectedId);
  const shamDrop = Math.max(0, baseline.margin - sham.margin);
  const fractureDrop = Math.max(0, baseline.margin - fracture.margin);
  const cfs = clamp(fractureDrop - shamDrop);
  return {
    schema_version: "0.1.0",
    status: "candidate_extractor_non_canonical",
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    selected_trajectory_id: selectedId,
    QICN_CONT_BASELINE: clamp(baseline.margin),
    QICN_CONT_SHAM: clamp(sham.margin),
    QICN_CONT_FRACTURE: clamp(fracture.margin),
    QICN_CFS: cfs,
    support_threshold: 0.25,
    passes_continuity_fracture_sensitivity: cfs >= 0.25,
    baseline,
    sham,
    fracture,
    baseline_ranking: baselineRank,
    information_boundary: "extractContField receives pre-segmented raw trajectories only. It does not receive latent_truth, world_id, true_self_trajectory_id, cooked continuity_candidates scores, self_indexed flags, or precomputed QICN_CFS."
  };
}

function trajectoryObservation(rand, level, condition, t, noise) {
  const jitter = () => (rand() - 0.5) * noise;
  const drift = 0.035 * Math.sin(t / 7);
  const degraded = condition === "fracture";
  const sham = condition === "sham";
  const base = clamp(degraded ? level.fracture : sham ? level.sham : level.baseline);
  const readout = clamp(base + drift + jitter());
  return {
    t,
    condition,
    readout_alpha: readout,
    readout_beta: clamp(readout + jitter() * 0.45),
    temporal_binding: clamp(base + jitter()),
    remap_coherence: clamp(base + jitter()),
    recovery_signal: clamp((degraded ? level.recovery_after_fracture : base) + jitter()),
    fork_divergence: clamp((degraded ? level.fork_divergence : 1 - base) + Math.abs(jitter())),
    perturbation_residual: clamp((degraded ? level.perturbation_residual : 1 - base) + Math.abs(jitter())),
    memory_label_strength: clamp(level.memory_label || 0.18 + rand() * 0.15),
    history_token_strength: clamp(level.history_token || 0.18 + rand() * 0.15)
  };
}

function makeRawContinuityCase(kind, seed, options = {}) {
  const rand = rng(`contfield:${kind}:${seed}`);
  const trajectoryCount = options.trajectoryCount || 4;
  const windowsPerCondition = options.windowsPerCondition || 36;
  const noise = options.noise === undefined ? 0.08 : options.noise;
  const selfIndex = Math.floor(rand() * trajectoryCount);
  const selfId = `T${selfIndex}`;
  const genuine = ["genuine_continuity", "dissociation_fracture", "moderate_continuity"].includes(kind);
  const conditions = ["baseline", "sham", "fracture"];
  const trajectories = [];
  for (let i = 0; i < trajectoryCount; i += 1) {
    const id = `T${i}`;
    const isSelf = genuine && id === selfId;
    let level;
    if (isSelf) {
      const base = options.selfBaseline === undefined ? 0.92 : options.selfBaseline;
      const fracture = kind === "dissociation_fracture" ? 0.20 : options.selfFracture === undefined ? 0.28 : options.selfFracture;
      level = { baseline: base, sham: Math.max(0.68, base - 0.04), fracture, recovery_after_fracture: fracture + 0.05, fork_divergence: 0.78, perturbation_residual: 0.70 };
    } else if (kind === "memory_only") {
      level = { baseline: 0.42 + rand() * 0.08, sham: 0.42 + rand() * 0.08, fracture: 0.40 + rand() * 0.08, recovery_after_fracture: 0.42, fork_divergence: 0.45, perturbation_residual: 0.45, memory_label: 0.95, history_token: 0.82 };
    } else if (kind === "history_blind") {
      level = { baseline: 0.40 + rand() * 0.08, sham: 0.40 + rand() * 0.08, fracture: 0.40 + rand() * 0.08, recovery_after_fracture: 0.40, fork_divergence: 0.48, perturbation_residual: 0.48, memory_label: 0.40, history_token: 0.95 };
    } else if (kind === "symmetric_trajectory") {
      const sym = 0.50 + (rand() - 0.5) * 0.03;
      level = { baseline: sym, sham: sym, fracture: sym, recovery_after_fracture: sym, fork_divergence: 0.50, perturbation_residual: 0.50 };
    } else {
      const rivalBase = genuine ? 0.12 + rand() * 0.04 : 0.44 + rand() * 0.08;
      level = { baseline: rivalBase, sham: rivalBase + (rand() - 0.5) * 0.03, fracture: rivalBase + (rand() - 0.5) * 0.03, recovery_after_fracture: rivalBase, fork_divergence: 0.46, perturbation_residual: 0.46 };
    }
    const observations = [];
    conditions.forEach((condition) => {
      for (let t = 0; t < windowsPerCondition; t += 1) {
        observations.push(trajectoryObservation(rand, level, condition, t, noise));
      }
    });
    trajectories.push({ id, observations });
  }
  return {
    raw_trace: {
      schema_version: "0.1.0",
      trace_id: `raw-contfield-${kind}-${seed}`,
      seed: String(seed),
      trajectories
    },
    latent_truth: {
      kind,
      genuine_continuity: genuine,
      true_self_trajectory_id: genuine ? selfId : null,
      chance_accuracy: 1 / trajectoryCount
    }
  };
}

function ablateContinuitySignals(rawTrace) {
  return {
    ...rawTrace,
    trace_id: `${rawTrace.trace_id}-continuity-ablated`,
    trajectories: (rawTrace.trajectories || []).map((trajectory) => ({
      ...trajectory,
      observations: (trajectory.observations || []).map((obs) => ({
        ...obs,
        readout_alpha: 0.50,
        readout_beta: 0.50,
        temporal_binding: 0.50,
        remap_coherence: 0.50,
        recovery_signal: 0.50,
        fork_divergence: 0.50,
        perturbation_residual: 0.50
      }))
    }))
  };
}

function evaluateContField() {
  const seeds = Array.from({ length: 60 }, (_, index) => `phase6-3d-contfield-${index + 1}`);
  const recovery = seeds.map((seed) => {
    const generated = makeRawContinuityCase("genuine_continuity", seed);
    const extracted = extractContField(generated.raw_trace);
    return { seed, correct: extracted.selected_trajectory_id === generated.latent_truth.true_self_trajectory_id ? 1 : 0, extracted, truth: generated.latent_truth };
  });
  const aucPairs = recovery.flatMap((item) => item.extracted.baseline_ranking.map((score) => ({ y: score.id === item.truth.true_self_trajectory_id ? 1 : 0, score: score.score })));
  const nullKinds = ["memory_only", "history_blind", "symmetric_trajectory"];
  const nullRuns = nullKinds.flatMap((kind) => seeds.map((seed) => {
    const generated = makeRawContinuityCase(kind, seed);
    const extracted = extractContField(generated.raw_trace);
    return { kind, seed, false_continuity: extracted.passes_continuity_fracture_sensitivity ? 1 : 0, cfs: extracted.QICN_CFS, cont: extracted.QICN_CONT_BASELINE };
  }));
  const ablations = seeds.slice(0, 40).map((seed) => {
    const generated = makeRawContinuityCase("genuine_continuity", `ablation-${seed}`);
    const before = extractContField(generated.raw_trace);
    const after = extractContField(ablateContinuitySignals(generated.raw_trace));
    return { seed, before: before.QICN_CFS, after: after.QICN_CFS, drop: before.QICN_CFS - after.QICN_CFS };
  });
  const dissociations = seeds.slice(0, 40).map((seed) => {
    const selfRaw = makeRawSelfLocusCase("genuine_self", `dissociation-${seed}`, { strength: 0.86, noise: 0.06, windowCount: 96 });
    const contRaw = makeRawContinuityCase("dissociation_fracture", `dissociation-${seed}`, { selfBaseline: 0.86, selfFracture: 0.26, noise: 0.06 });
    const self = extractSelfLocus(selfRaw.raw_trace);
    const cont = extractContField(contRaw.raw_trace);
    return { seed, sipm: self.QICN_SIPM, cont_baseline: cont.QICN_CONT_BASELINE, cont_fracture: cont.QICN_CONT_FRACTURE, cfs: cont.QICN_CFS, sipm_high: self.QICN_SIPM >= 0.20, fracture_drop_visible: cont.QICN_CONT_FRACTURE < cont.QICN_CONT_BASELINE - 0.25 };
  });
  const accuracyValues = recovery.map((item) => item.correct);
  const falseValues = nullRuns.map((item) => item.false_continuity);
  const drops = ablations.map((item) => item.drop);
  const result = {
    schema_version: "0.1.0",
    status: "PASS",
    boundary: "ContField extractor identifiability on synthetic pre-segmented raw trajectories only. Not external validation and not evidence for consciousness or phenomenality.",
    information_boundary: "Evaluation harness stores latent_truth separately. extractContField(raw_trace) never receives latent_truth, world_id, true_self_trajectory_id, self_indexed flags, cooked continuity scores, or precomputed QICN_CFS.",
    recovery: {
      seeds: recovery.length,
      chance_accuracy: 0.25,
      accuracy: mean(accuracyValues),
      accuracy_ci95: bootstrapMeanCi(accuracyValues, "cont-recovery-ci"),
      auc_vs_rival_trajectories: auc(aucPairs),
      mean_cfs: mean(recovery.map((item) => item.extracted.QICN_CFS))
    },
    null_controls: {
      runs: nullRuns.length,
      false_continuity_rate: mean(falseValues),
      false_continuity_rate_ci95: bootstrapMeanCi(falseValues, "cont-false-ci"),
      mean_null_cfs: mean(nullRuns.map((item) => item.cfs)),
      by_kind: nullKinds.map((kind) => {
        const subset = nullRuns.filter((item) => item.kind === kind);
        return { kind, false_continuity_rate: mean(subset.map((item) => item.false_continuity)), mean_cfs: mean(subset.map((item) => item.cfs)), mean_continuity_margin: mean(subset.map((item) => item.cont)) };
      })
    },
    ablation: {
      runs: ablations.length,
      mean_before_cfs: mean(ablations.map((item) => item.before)),
      mean_after_cfs: mean(ablations.map((item) => item.after)),
      mean_drop: mean(drops),
      drop_ci95: bootstrapMeanCi(drops, "cont-drop-ci")
    },
    selfindex_contfield_dissociation: {
      runs: dissociations.length,
      mean_sipm: mean(dissociations.map((item) => item.sipm)),
      mean_cont_baseline: mean(dissociations.map((item) => item.cont_baseline)),
      mean_cont_fracture: mean(dissociations.map((item) => item.cont_fracture)),
      mean_cfs: mean(dissociations.map((item) => item.cfs)),
      sipm_high_rate: mean(dissociations.map((item) => item.sipm_high ? 1 : 0)),
      fracture_drop_visible_rate: mean(dissociations.map((item) => item.fracture_drop_visible ? 1 : 0))
    }
  };
  result.status = result.recovery.accuracy > result.recovery.chance_accuracy + 0.20 &&
    result.recovery.auc_vs_rival_trajectories > 0.70 &&
    result.null_controls.false_continuity_rate <= 0.10 &&
    result.ablation.mean_drop > 0.12 &&
    result.selfindex_contfield_dissociation.sipm_high_rate >= 0.95 &&
    result.selfindex_contfield_dissociation.fracture_drop_visible_rate >= 0.95 ? "PASS" : "FAIL_REVIEW_REQUIRED";
  return result;
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = evaluateContField();
    console.log(JSON.stringify(report, null, 2));
    if (report.status !== "PASS") process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3d_contfield_extractor.js --self-test");
  }
}

module.exports = {
  extractContField,
  makeRawContinuityCase,
  ablateContinuitySignals,
  evaluateContField,
  trajectoryScore,
  rankTrajectories
};
