#!/usr/bin/env node
"use strict";

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
const { extractContField, makeRawContinuityCase } = require("./qicn_phase6_3d_contfield_extractor");

function variance(values) {
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function stddev(values) {
  return Math.sqrt(variance(values));
}

function responseMagnitude(event) {
  const impulse = Math.max(0.05, event.target_impulse_amplitude || 0);
  const observations = event.downstream_observations || [];
  if (observations.length === 0) return 0;
  const magnitudes = observations.map((obs) => {
    const delta = Math.abs((obs.post_value || 0) - (obs.pre_value || 0)) / impulse;
    const delayPenalty = 1 / (1 + Math.max(0, obs.response_delay || 0));
    const persistence = 0.65 + 0.35 * (1 - clamp(obs.recovery_fraction || 0));
    return clamp(delta * persistence * (0.72 + 0.28 * delayPenalty), 0, 2);
  });
  return mean(magnitudes);
}

function groupedByPair(events) {
  const groups = new Map();
  for (const event of events || []) {
    const key = event.pair_id || "unpaired";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }
  return [...groups.entries()].map(([pairId, items]) => ({ pair_id: pairId, events: items }));
}

function pairedOwnershipEffect(events, inferredSelfId) {
  const pairs = groupedByPair(events);
  const pairDiffs = [];
  const pairDetails = [];
  for (const pair of pairs) {
    const selfEvents = pair.events.filter((event) => event.perturbation_target_id === inferredSelfId);
    const nonSelfEvents = pair.events.filter((event) => event.perturbation_target_id !== inferredSelfId);
    if (selfEvents.length === 0 || nonSelfEvents.length === 0) continue;
    const selfMean = mean(selfEvents.map(responseMagnitude));
    const nonSelfMean = mean(nonSelfEvents.map(responseMagnitude));
    const diff = selfMean - nonSelfMean;
    pairDiffs.push(diff);
    pairDetails.push({
      pair_id: pair.pair_id,
      inferred_self_target_count: selfEvents.length,
      inferred_nonself_target_count: nonSelfEvents.length,
      self_target_response_mean: selfMean,
      nonself_target_response_mean: nonSelfMean,
      paired_difference: diff
    });
  }
  const rawMean = mean(pairDiffs);
  const pooled = Math.max(0.06, stddev(pairDiffs));
  const standardized = rawMean / pooled;
  return {
    pair_count: pairDiffs.length,
    paired_differences: pairDiffs,
    pair_details: pairDetails,
    mean_paired_difference: rawMean,
    standardized_effect: standardized,
    QICN_OFIA: clamp(standardized / 1.6, 0, 1.8)
  };
}

function extractOfia(rawTrace) {
  const selfTrace = rawTrace.self_locus_trace || { schema_version: rawTrace.schema_version, trace_id: `${rawTrace.trace_id || "unknown"}:self`, seed: rawTrace.seed, windows: rawTrace.windows || [] };
  const self = extractSelfLocus(selfTrace);
  const effect = pairedOwnershipEffect(rawTrace.perturbation_events || [], self.selected_locus_id);
  return {
    schema_version: "0.1.0",
    status: "candidate_extractor_non_canonical",
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    inferred_self_locus_id: self.selected_locus_id,
    inferred_self_sipm: self.QICN_SIPM,
    inferred_self_margin: self.raw_margin,
    QICN_OFIA: effect.QICN_OFIA,
    support_threshold: 0.50,
    passes_ownership_field_asymmetry: effect.QICN_OFIA >= 0.50,
    mean_paired_difference: effect.mean_paired_difference,
    standardized_effect: effect.standardized_effect,
    pair_count: effect.pair_count,
    pair_details: effect.pair_details,
    architectural_dependency: "OFIA runs extractSelfLocus on the same unified trace and classifies perturbation_target_id against the inferred self-locus. It does not receive true_self_locus_id.",
    error_coupling_boundary: "If SelfIndex selects the wrong locus, OFIA self-target/non-self-target labels are wrong and QICN_OFIA is contaminated. This is measured as gate error propagation, not repaired with latent truth.",
    information_boundary: "extractOfia receives observable perturbation_target_id and downstream dynamics, but never receives latent_truth, true_self_locus_id, is_self_target, expected_ownership, control_ownership, cooked ownership scores, or precomputed QICN_OFIA."
  };
}

function makeSelfTraceFromSignals(level, seed) {
  const rand = rng(`ofia-self-snr:${level.id}:${seed}`);
  const locusCount = level.locusCount || 4;
  const windowCount = level.windowCount || 80;
  const selfIndex = Math.floor(rand() * locusCount);
  const selfId = `L${selfIndex}`;
  const windows = [];
  for (let t = 0; t < windowCount; t += 1) {
    const loci = [];
    for (let i = 0; i < locusCount; i += 1) {
      const id = `L${i}`;
      const signal = id === selfId ? level.selfSignal : level.rivalSignal + (rand() - 0.5) * (level.rivalSpread || 0.04);
      const jitter = () => (rand() - 0.5) * level.noise;
      const readout = clamp(signal + jitter());
      loci.push({
        id,
        activation: clamp(signal + jitter()),
        prediction_error: clamp(1 - signal + Math.abs(jitter())),
        control_coupling: clamp(signal + jitter()),
        event_binding: clamp(signal + jitter()),
        readout_alpha: readout,
        readout_beta: clamp(readout + jitter() * 0.5),
        perturbation_response: clamp(signal + jitter()),
        symbolic_label_intensity: clamp(0.12 + rand() * 0.20),
        narrative_coherence: clamp(0.16 + rand() * 0.20)
      });
    }
    windows.push({ t, condition: "baseline", loci });
  }
  return {
    raw_trace: {
      schema_version: "0.1.0",
      trace_id: `raw-ofia-self-${level.id}-${seed}`,
      seed: String(seed),
      windows
    },
    latent_truth: {
      kind: level.id,
      genuine_self: true,
      true_self_locus_id: selfId,
      chance_accuracy: 1 / locusCount
    }
  };
}

function downstreamObservation(rand, channelId, responseLevel, impulse, noise) {
  const pre = clamp(0.25 + rand() * 0.50);
  const sign = rand() < 0.5 ? -1 : 1;
  const jitter = () => (rand() - 0.5) * noise;
  const delta = Math.max(0, responseLevel * impulse + jitter());
  return {
    channel_id: channelId,
    pre_value: pre,
    post_value: clamp(pre + sign * delta),
    response_delay: Math.max(0.01, 0.08 + (1 - responseLevel) * 0.28 + Math.abs(jitter())),
    recovery_fraction: clamp(0.18 + (1 - responseLevel) * 0.48 + Math.abs(jitter()))
  };
}

function makePerturbationEvents(kind, seed, locusIds, trueSelfId, options = {}) {
  const rand = rng(`ofia-events:${kind}:${seed}`);
  const pairCount = options.pairCount || 42;
  const channelCount = options.channelCount || 6;
  const noise = options.ownershipNoise === undefined ? 0.05 : options.ownershipNoise;
  const impulse = options.impulse === undefined ? 0.85 : options.impulse;
  const selfResponse = options.selfResponse === undefined ? 0.82 : options.selfResponse;
  const nonSelfResponse = options.nonSelfResponse === undefined ? 0.30 : options.nonSelfResponse;
  const equalResponse = options.equalResponse === undefined ? 0.45 : options.equalResponse;
  const events = [];
  for (let p = 0; p < pairCount; p += 1) {
    for (const targetId of locusIds) {
      const isTrueSelf = trueSelfId !== null && targetId === trueSelfId;
      let responseLevel;
      if (kind === "ownership_asymmetry" || kind === "weak_ownership_asymmetry") {
        responseLevel = isTrueSelf ? selfResponse : nonSelfResponse;
      } else if (kind === "bookkeeping_only") {
        responseLevel = equalResponse + (rand() - 0.5) * 0.02;
      } else if (kind === "symmetric_ownership" || kind === "anti_trivial_equal_response") {
        responseLevel = equalResponse + (rand() - 0.5) * 0.03;
      } else {
        responseLevel = equalResponse + (rand() - 0.5) * 0.05;
      }
      const observations = [];
      for (let c = 0; c < channelCount; c += 1) {
        observations.push(downstreamObservation(rand, `D${c}`, clamp(responseLevel), impulse, noise));
      }
      events.push({
        event_id: `E${p}-${targetId}`,
        pair_id: `P${p}`,
        t: p,
        perturbation_target_id: targetId,
        target_impulse_amplitude: impulse,
        downstream_observations: observations,
        bookkeeping_label_strength: clamp(kind === "bookkeeping_only" && isTrueSelf ? 0.95 : 0.10 + rand() * 0.18)
      });
    }
  }
  return events;
}

function makeUnifiedOfiaCase(kind, seed, options = {}) {
  const selfKind = options.selfKind || (kind === "bookkeeping_only" || kind === "symmetric_ownership" ? "genuine_self" : "genuine_self");
  const selfGenerated = options.selfLevel ?
    makeSelfTraceFromSignals(options.selfLevel, seed) :
    makeRawSelfLocusCase(selfKind, seed, {
      strength: options.selfStrength === undefined ? 0.86 : options.selfStrength,
      noise: options.selfNoise === undefined ? 0.06 : options.selfNoise,
      windowCount: options.windowCount || 96
    });
  const locusIds = [...new Set((selfGenerated.raw_trace.windows || []).flatMap((window) => (window.loci || []).map((locus) => locus.id)))];
  const trueSelfId = selfGenerated.latent_truth.true_self_locus_id || null;
  const eventKind = kind === "genuine_ownership" ? "ownership_asymmetry" :
    kind === "weak_ownership" ? "weak_ownership_asymmetry" :
      kind === "anti_trivial_equal_response" ? "anti_trivial_equal_response" :
        kind === "bookkeeping_only" ? "bookkeeping_only" : "symmetric_ownership";
  const events = makePerturbationEvents(eventKind, seed, locusIds, trueSelfId, options);
  return {
    raw_trace: {
      schema_version: "0.1.0",
      trace_id: `raw-ofia-${kind}-${seed}`,
      seed: String(seed),
      self_locus_trace: selfGenerated.raw_trace,
      perturbation_events: events,
      information_boundary: "Extractor-visible input includes observable perturbation_target_id and downstream dynamics, but excludes true_self_locus_id, latent_truth, is_self_target labels, expected_ownership, control_ownership, cooked ownership scores, and precomputed QICN_OFIA."
    },
    latent_truth: {
      kind,
      true_self_locus_id: trueSelfId,
      genuine_ownership_asymmetry: eventKind === "ownership_asymmetry" || eventKind === "weak_ownership_asymmetry",
      chance_accuracy: selfGenerated.latent_truth.chance_accuracy || (1 / Math.max(1, locusIds.length))
    }
  };
}

function ablateOfiaSignals(rawTrace) {
  const events = rawTrace.perturbation_events || [];
  const magnitudes = events.map(responseMagnitude);
  const targetMagnitude = mean(magnitudes);
  return {
    ...rawTrace,
    trace_id: `${rawTrace.trace_id}-ofia-ablated`,
    perturbation_events: events.map((event) => ({
      ...event,
      downstream_observations: (event.downstream_observations || []).map((obs, index) => {
        const pre = obs.pre_value || 0;
        const sign = index % 2 === 0 ? 1 : -1;
        return {
          ...obs,
          post_value: clamp(pre + sign * targetMagnitude * Math.max(0.05, event.target_impulse_amplitude || 0)),
          response_delay: 0.20,
          recovery_fraction: 0.45
        };
      })
    }))
  };
}

function evaluateOfia() {
  const seeds = Array.from({ length: 60 }, (_, index) => `phase6-3e-ofia-${index + 1}`);
  const recovery = seeds.map((seed) => {
    const generated = makeUnifiedOfiaCase("genuine_ownership", seed);
    const extracted = extractOfia(generated.raw_trace);
    return {
      seed,
      self_correct: extracted.inferred_self_locus_id === generated.latent_truth.true_self_locus_id ? 1 : 0,
      ofia_pass: extracted.passes_ownership_field_asymmetry ? 1 : 0,
      ofia: extracted.QICN_OFIA,
      extracted,
      truth: generated.latent_truth
    };
  });
  const nullKinds = ["symmetric_ownership", "bookkeeping_only"];
  const nullRuns = nullKinds.flatMap((kind) => seeds.map((seed) => {
    const generated = makeUnifiedOfiaCase(kind, seed);
    const extracted = extractOfia(generated.raw_trace);
    return { kind, seed, false_ofia: extracted.passes_ownership_field_asymmetry ? 1 : 0, ofia: extracted.QICN_OFIA };
  }));
  const ablations = seeds.slice(0, 40).map((seed) => {
    const generated = makeUnifiedOfiaCase("genuine_ownership", `ablation-${seed}`);
    const before = extractOfia(generated.raw_trace);
    const after = extractOfia(ablateOfiaSignals(generated.raw_trace));
    return { seed, before: before.QICN_OFIA, after: after.QICN_OFIA, drop: before.QICN_OFIA - after.QICN_OFIA };
  });
  const dissociations = seeds.slice(0, 40).map((seed) => {
    const ofiaGenerated = makeUnifiedOfiaCase("anti_trivial_equal_response", `dissociation-${seed}`, { selfStrength: 0.88, selfNoise: 0.05, equalResponse: 0.47, ownershipNoise: 0.03 });
    const contGenerated = makeRawContinuityCase("genuine_continuity", `dissociation-${seed}`, { selfBaseline: 0.92, selfFracture: 0.28, noise: 0.06 });
    const self = extractSelfLocus(ofiaGenerated.raw_trace.self_locus_trace);
    const cont = extractContField(contGenerated.raw_trace);
    const ofia = extractOfia(ofiaGenerated.raw_trace);
    return {
      seed,
      sipm: self.QICN_SIPM,
      cfs: cont.QICN_CFS,
      ofia: ofia.QICN_OFIA,
      sipm_high: self.QICN_SIPM >= 0.20,
      cfs_high: cont.QICN_CFS >= 0.25,
      ofia_low: ofia.QICN_OFIA < 0.50
    };
  });
  const errorLevels = [
    { id: "self_snr_high", selfSignal: 0.78, rivalSignal: 0.32, noise: 0.10 },
    { id: "self_snr_mid", selfSignal: 0.62, rivalSignal: 0.39, noise: 0.18 },
    { id: "self_snr_near_chance", selfSignal: 0.47, rivalSignal: 0.45, noise: 0.40 },
    { id: "self_snr_break_symmetric", selfSignal: 0.45, rivalSignal: 0.45, noise: 0.55 }
  ];
  const errorPropagation = errorLevels.map((level) => {
    const runs = Array.from({ length: 80 }, (_, index) => {
      const seed = `${level.id}-${index + 1}`;
      const generated = makeUnifiedOfiaCase("genuine_ownership", seed, { selfLevel: { ...level, windowCount: 80 }, selfResponse: 0.82, nonSelfResponse: 0.30, ownershipNoise: 0.05 });
      const extracted = extractOfia(generated.raw_trace);
      const correct = extracted.inferred_self_locus_id === generated.latent_truth.true_self_locus_id;
      return { seed, correct, ofia: extracted.QICN_OFIA, passes: extracted.passes_ownership_field_asymmetry ? 1 : 0, sipm: extracted.inferred_self_sipm };
    });
    const correctRuns = runs.filter((run) => run.correct);
    const wrongRuns = runs.filter((run) => !run.correct);
    return {
      id: level.id,
      approximate_selfindex_snr: (level.selfSignal - level.rivalSignal) / level.noise,
      runs: runs.length,
      selfindex_accuracy: correctRuns.length / runs.length,
      correct_count: correctRuns.length,
      wrong_count: wrongRuns.length,
      mean_ofia_when_selfindex_correct: mean(correctRuns.map((run) => run.ofia)),
      mean_ofia_when_selfindex_wrong: mean(wrongRuns.map((run) => run.ofia)),
      ofia_pass_rate_when_selfindex_correct: mean(correctRuns.map((run) => run.passes)),
      ofia_pass_rate_when_selfindex_wrong: mean(wrongRuns.map((run) => run.passes)),
      mean_sipm: mean(runs.map((run) => run.sipm))
    };
  });
  const aucPairs = recovery.flatMap((item) => item.extracted.pair_details.flatMap((pair) => [
    { y: 1, score: pair.self_target_response_mean },
    { y: 0, score: pair.nonself_target_response_mean }
  ]));
  const recoveryPasses = recovery.map((item) => item.ofia_pass);
  const falseValues = nullRuns.map((item) => item.false_ofia);
  const drops = ablations.map((item) => item.drop);
  const result = {
    schema_version: "0.1.0",
    status: "PASS",
    boundary: "OFIA extractor identifiability on synthetic unified raw traces only. Not external validation, not HOT adjudication, and not consciousness or phenomenality evidence.",
    status_layers: {
      source_declared_status: "candidate_extractor_non_canonical",
      machine_extracted_status: "candidate_extractor_non_canonical",
      human_curated_status: "not_reviewed",
      effective_public_status: "internal_synthetic_support_only",
      curation_status: "human_review_required"
    },
    architectural_dependency: "OFIA depends on SelfIndex by design: extractOfia first infers the self-locus with extractSelfLocus and then classifies perturbation_target_id as inferred-self-target or inferred-non-self-target.",
    information_boundary: "The extractor never receives true_self_locus_id or latent_truth. perturbation_target_id is observable by experimental design and is not a substitute for the inferred self-locus.",
    recovery: {
      seeds: recovery.length,
      selfindex_accuracy: mean(recovery.map((item) => item.self_correct)),
      ofia_pass_rate: mean(recoveryPasses),
      ofia_pass_rate_ci95: bootstrapMeanCi(recoveryPasses, "ofia-recovery-pass-ci"),
      mean_ofia: mean(recovery.map((item) => item.ofia)),
      auc_self_target_vs_nonself_target_response: auc(aucPairs)
    },
    null_controls: {
      runs: nullRuns.length,
      false_ofia_rate: mean(falseValues),
      false_ofia_rate_ci95: bootstrapMeanCi(falseValues, "ofia-null-ci"),
      mean_null_ofia: mean(nullRuns.map((item) => item.ofia)),
      by_kind: nullKinds.map((kind) => {
        const subset = nullRuns.filter((item) => item.kind === kind);
        return { kind, false_ofia_rate: mean(subset.map((item) => item.false_ofia)), mean_ofia: mean(subset.map((item) => item.ofia)) };
      })
    },
    ablation: {
      runs: ablations.length,
      mean_before_ofia: mean(ablations.map((item) => item.before)),
      mean_after_ofia: mean(ablations.map((item) => item.after)),
      mean_drop: mean(drops),
      drop_ci95: bootstrapMeanCi(drops, "ofia-drop-ci")
    },
    anti_triviality_dissociation: {
      runs: dissociations.length,
      mean_sipm: mean(dissociations.map((item) => item.sipm)),
      mean_cfs: mean(dissociations.map((item) => item.cfs)),
      mean_ofia: mean(dissociations.map((item) => item.ofia)),
      sipm_high_rate: mean(dissociations.map((item) => item.sipm_high ? 1 : 0)),
      cfs_high_rate: mean(dissociations.map((item) => item.cfs_high ? 1 : 0)),
      ofia_low_rate: mean(dissociations.map((item) => item.ofia_low ? 1 : 0))
    },
    selfindex_to_ofia_error_propagation: {
      structural_limit: "SIPM, CFS, and OFIA are not independent votes when the gate uses the same inferred self-locus. SelfIndex errors propagate into OFIA labels and reduce effective independence.",
      levels: errorPropagation
    }
  };
  result.status = result.recovery.ofia_pass_rate >= 0.95 &&
    result.recovery.auc_self_target_vs_nonself_target_response > 0.80 &&
    result.null_controls.false_ofia_rate <= 0.10 &&
    result.ablation.mean_drop > 0.30 &&
    result.anti_triviality_dissociation.sipm_high_rate >= 0.95 &&
    result.anti_triviality_dissociation.cfs_high_rate >= 0.95 &&
    result.anti_triviality_dissociation.ofia_low_rate >= 0.95 ? "PASS" : "FAIL_REVIEW_REQUIRED";
  return result;
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = evaluateOfia();
    console.log(JSON.stringify(report, null, 2));
    if (report.status !== "PASS") process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3e_ofia_extractor.js --self-test");
  }
}

module.exports = {
  extractOfia,
  makeUnifiedOfiaCase,
  ablateOfiaSignals,
  evaluateOfia,
  makeSelfTraceFromSignals,
  responseMagnitude
};
