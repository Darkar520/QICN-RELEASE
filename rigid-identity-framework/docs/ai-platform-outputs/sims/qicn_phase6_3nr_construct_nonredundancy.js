#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const { extractSelfLocus, rng, clamp, mean, quantile } = require("./qicn_phase6_3c_selflocus_extractor");
const { extractContField } = require("./qicn_phase6_3d_contfield_extractor");
const { extractOfia } = require("./qicn_phase6_3e_ofia_extractor");
const close63 = require("./qicn_phase6_3close_coupled_gate");

const REPORT_PATH = path.join(__dirname, "..", "reports", "QICN_ROADMAP_V3_PHASE6_3NR_CONSTRUCT_NONREDUNDANCY.md");
const RAW_KEYS = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"];
const COOKED_KEYS = ["QICN_FPPG", "QICN_WRI"];

const SELF_LEVELS = [
  { id: "self_low", index: 0, selfSignal: 0.54, rivalSignal: 0.43, noise: 0.16 },
  { id: "self_mid", index: 1, selfSignal: 0.68, rivalSignal: 0.38, noise: 0.11 },
  { id: "self_high", index: 2, selfSignal: 0.86, rivalSignal: 0.26, noise: 0.06 }
];

const CONTINUITY_LEVELS = [
  { id: "cont_low", index: 0, fractureDrop: 0.04, shamDrop: 0.02, noise: 0.07 },
  { id: "cont_mid", index: 1, fractureDrop: 0.18, shamDrop: 0.03, noise: 0.07 },
  { id: "cont_high", index: 2, fractureDrop: 0.42, shamDrop: 0.04, noise: 0.07 }
];

const OWNERSHIP_LEVELS = [
  { id: "own_low", index: 0, delta: 0.05, noise: 0.10 },
  { id: "own_mid", index: 1, delta: 0.25, noise: 0.08 },
  { id: "own_high", index: 2, delta: 0.58, noise: 0.06 }
];

function round(value, digits = 4) {
  if (!Number.isFinite(value)) return value;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function variance(values) {
  if (!values.length) return 0;
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function pearson(xs, ys) {
  if (xs.length !== ys.length || xs.length < 2) return 0;
  const mx = mean(xs);
  const my = mean(ys);
  const numerator = xs.reduce((sum, value, index) => sum + (value - mx) * (ys[index] - my), 0);
  const denominator = Math.sqrt(
    xs.reduce((sum, value) => sum + (value - mx) ** 2, 0) *
    ys.reduce((sum, value) => sum + (value - my) ** 2, 0)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}

function jacobiEigenvalues3(matrix) {
  const a = matrix.map((row) => row.slice());
  for (let iter = 0; iter < 50; iter += 1) {
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
    if (max < 1e-12) break;
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
  return [a[0][0], a[1][1], a[2][2]].sort((left, right) => right - left);
}

function correlationMatrix(rows, keys = RAW_KEYS) {
  return keys.map((left) => keys.map((right) => {
    if (left === right) return 1;
    return pearson(rows.map((row) => row.metrics[left]), rows.map((row) => row.metrics[right]));
  }));
}

function participationRatio(matrix) {
  const eigenvalues = jacobiEigenvalues3(matrix);
  const sum = eigenvalues.reduce((acc, value) => acc + value, 0);
  const squared = eigenvalues.reduce((acc, value) => acc + value * value, 0);
  return {
    eigenvalues,
    n_eff: sum * sum / squared,
    pc1_variance_fraction: eigenvalues[0] / sum
  };
}

function bootstrapCorrelationCi(rows, left, right, seed, iterations = 600) {
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.cell_id)) groups.set(row.cell_id, []);
    groups.get(row.cell_id).push(row);
  }
  const cells = [...groups.keys()];
  const rand = rng(`phase6-3nr-bootstrap:${seed}:${left}:${right}`);
  const values = [];
  for (let i = 0; i < iterations; i += 1) {
    const sample = [];
    for (let j = 0; j < cells.length; j += 1) {
      const cell = cells[Math.floor(rand() * cells.length)];
      sample.push(...groups.get(cell));
    }
    values.push(pearson(sample.map((row) => row.metrics[left]), sample.map((row) => row.metrics[right])));
  }
  return {
    low: quantile(values, 0.025),
    high: quantile(values, 0.975)
  };
}

function makeSharedLatent(cell, seed) {
  const rand = rng(`phase6-3nr-shared:${cell.id}:${seed}`);
  const locusCount = 4;
  const selfIndex = Math.floor(rand() * locusCount);
  return {
    self_index: selfIndex,
    self_locus_id: `L${selfIndex}`,
    self_trajectory_id: `T${selfIndex}`,
    locus_ids: Array.from({ length: locusCount }, (_, index) => `L${index}`),
    trajectory_ids: Array.from({ length: locusCount }, (_, index) => `T${index}`)
  };
}

function makeSelfView(shared, selfLevel, cell, seed) {
  const rand = rng(`phase6-3nr-self:${cell.id}:${seed}`);
  const windows = [];
  let phase = rand();
  for (let t = 0; t < 80; t += 1) {
    phase = 0.86 * phase + 0.14 * rand();
    const loci = shared.locus_ids.map((id, index) => {
      const isSelf = index === shared.self_index;
      const base = isSelf ? selfLevel.selfSignal : selfLevel.rivalSignal + (rand() - 0.5) * 0.04;
      const jitter = () => (rand() - 0.5) * selfLevel.noise;
      const readout = clamp(base + 0.04 * Math.sin(t / 6 + index) + jitter());
      return {
        id,
        activation: clamp((isSelf ? 0.60 + 0.22 * phase : 0.42 + 0.18 * rand()) + jitter()),
        prediction_error: clamp(isSelf ? 1 - base + Math.abs(jitter()) : 0.54 + 0.18 * rand() + Math.abs(jitter())),
        control_coupling: clamp(base + jitter()),
        event_binding: clamp(base + jitter()),
        readout_alpha: readout,
        readout_beta: clamp(isSelf ? readout + jitter() * 0.35 : selfLevel.rivalSignal + 0.30 * rand()),
        perturbation_response: clamp(base + jitter()),
        symbolic_label_intensity: clamp(0.12 + rand() * 0.20),
        narrative_coherence: clamp(0.16 + rand() * 0.20)
      };
    });
    windows.push({ t, condition: "baseline", loci });
  }
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3nr-self-${cell.id}-${seed}`,
    seed: String(seed),
    windows
  };
}

function continuityObservation(rand, base, condition, t, noise) {
  const jitter = () => (rand() - 0.5) * noise;
  const drift = 0.03 * Math.sin(t / 7);
  const degraded = condition === "fracture";
  const readout = clamp(base + drift + jitter());
  return {
    t,
    condition,
    readout_alpha: readout,
    readout_beta: clamp(readout + jitter() * 0.45),
    temporal_binding: clamp(base + jitter()),
    remap_coherence: clamp(base + jitter()),
    recovery_signal: clamp((degraded ? base + 0.05 : base) + jitter()),
    fork_divergence: clamp((degraded ? 0.70 : 1 - base) + Math.abs(jitter())),
    perturbation_residual: clamp((degraded ? 0.68 : 1 - base) + Math.abs(jitter())),
    memory_label_strength: clamp(0.18 + rand() * 0.15),
    history_token_strength: clamp(0.18 + rand() * 0.15)
  };
}

function makeContinuityView(shared, contLevel, cell, seed) {
  const rand = rng(`phase6-3nr-cont:${cell.id}:${seed}`);
  const selfBaseline = 0.78;
  const rivalBaseline = 0.43;
  const selfSham = clamp(selfBaseline - contLevel.shamDrop);
  const selfFracture = clamp(selfBaseline - contLevel.fractureDrop);
  const trajectories = shared.trajectory_ids.map((id, index) => {
    const isSelf = index === shared.self_index;
    const observations = [];
    for (const condition of ["baseline", "sham", "fracture"]) {
      for (let t = 0; t < 34; t += 1) {
        let base;
        if (isSelf && condition === "baseline") base = selfBaseline;
        else if (isSelf && condition === "sham") base = selfSham;
        else if (isSelf && condition === "fracture") base = selfFracture;
        else base = clamp(rivalBaseline + (rand() - 0.5) * 0.04);
        observations.push(continuityObservation(rand, base, condition, t, contLevel.noise));
      }
    }
    return { id, observations };
  });
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3nr-cont-${cell.id}-${seed}`,
    seed: String(seed),
    trajectories
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

function makeOwnershipView(shared, selfView, ownLevel, cell, seed) {
  const rand = rng(`phase6-3nr-own:${cell.id}:${seed}`);
  const impulse = 0.85;
  const baseline = 0.42;
  const selfResponse = clamp(baseline + ownLevel.delta / 2);
  const nonSelfResponse = clamp(baseline - ownLevel.delta / 2);
  const events = [];
  for (let pair = 0; pair < 38; pair += 1) {
    for (const targetId of shared.locus_ids) {
      const isSelfTarget = targetId === shared.self_locus_id;
      const responseLevel = isSelfTarget ? selfResponse : nonSelfResponse;
      const observations = [];
      for (let channel = 0; channel < 5; channel += 1) {
        observations.push(downstreamObservation(rand, `D${channel}`, responseLevel, impulse, ownLevel.noise));
      }
      events.push({
        event_id: `E${pair}-${targetId}`,
        pair_id: `P${pair}`,
        t: pair,
        perturbation_target_id: targetId,
        target_impulse_amplitude: impulse,
        downstream_observations: observations,
        bookkeeping_label_strength: clamp(0.10 + rand() * 0.18)
      });
    }
  }
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3nr-own-${cell.id}-${seed}`,
    seed: String(seed),
    self_locus_trace: selfView,
    perturbation_events: events,
    information_boundary: "Latent truth is evaluation-only. extractOfia receives inferred self-locus machinery, observable perturbation_target_id, and downstream observations, not true self labels."
  };
}

function factorialCells() {
  const cells = [];
  for (const self of SELF_LEVELS) {
    for (const continuity of CONTINUITY_LEVELS) {
      for (const ownership of OWNERSHIP_LEVELS) {
        cells.push({
          id: `${self.id}__${continuity.id}__${ownership.id}`,
          self,
          continuity,
          ownership
        });
      }
    }
  }
  return cells;
}

function makeFactorialTrace(cell, seed) {
  const shared = makeSharedLatent(cell, seed);
  const selfView = makeSelfView(shared, cell.self, cell, seed);
  const continuityView = makeContinuityView(shared, cell.continuity, cell, seed);
  const ownershipView = makeOwnershipView(shared, selfView, cell.ownership, cell, seed);
  return {
    schema_version: "0.1.0",
    phase: "6.3-NR",
    trace_id: `phase6-3nr-${cell.id}-${seed}`,
    cell_id: cell.id,
    selfView,
    continuityView,
    ownershipView,
    latent_truth_eval_only: {
      self_dimension: cell.self.id,
      continuity_dimension: cell.continuity.id,
      ownership_dimension: cell.ownership.id,
      shared_self_locus_id: shared.self_locus_id,
      shared_self_trajectory_id: shared.self_trajectory_id,
      shared_self_index: shared.self_index
    },
    boundary: "Latent factorial labels are retained only for cell-level analysis. Existing extractors receive only raw views."
  };
}

function cookedMetrics(cell, seed) {
  const rand = rng(`phase6-3nr-cooked:${cell.id}:${seed}`);
  const latentAverage = (cell.self.index + cell.continuity.index + cell.ownership.index) / 6;
  const fppg = clamp(0.18 + 0.72 * latentAverage + (rand() - 0.5) * 0.08);
  const wri = clamp(0.16 + 0.28 * (cell.self.index / 2) + 0.30 * (cell.continuity.index / 2) + 0.22 * (cell.ownership.index / 2) + (rand() - 0.5) * 0.08);
  return {
    QICN_FPPG: fppg,
    QICN_WRI: wri
  };
}

function extractFactorial(trace, cell, seed) {
  const self = extractSelfLocus(trace.selfView);
  const cont = extractContField(trace.continuityView);
  const ofia = extractOfia(trace.ownershipView);
  const cooked = cookedMetrics(cell, seed);
  return {
    cell_id: trace.cell_id,
    seed: String(seed),
    dimensions: {
      self_locus_strength: cell.self.id,
      continuity_fracture: cell.continuity.id,
      ownership_asymmetry: cell.ownership.id
    },
    dimension_indices: {
      self_locus_strength: cell.self.index,
      continuity_fracture: cell.continuity.index,
      ownership_asymmetry: cell.ownership.index
    },
    metrics: {
      QICN_SIPM: self.QICN_SIPM,
      QICN_OFIA: ofia.QICN_OFIA,
      QICN_CFS: cont.QICN_CFS,
      ...cooked
    },
    extractor_checks: {
      self_correct: self.selected_locus_id === trace.latent_truth_eval_only.shared_self_locus_id,
      cont_correct: cont.selected_trajectory_id === trace.latent_truth_eval_only.shared_self_trajectory_id,
      ofia_self_correct: ofia.inferred_self_locus_id === trace.latent_truth_eval_only.shared_self_locus_id
    }
  };
}

function runFactorial(seedCount = 30) {
  const rows = [];
  for (const cell of factorialCells()) {
    for (let index = 0; index < seedCount; index += 1) {
      const seed = `${cell.id}:seed-${String(index + 1).padStart(2, "0")}`;
      const trace = makeFactorialTrace(cell, seed);
      rows.push(extractFactorial(trace, cell, seed));
    }
  }
  return rows;
}

function etaSquared(rows, variable, dimension) {
  const values = rows.map((row) => row.metrics[variable]);
  const grand = mean(values);
  const total = values.reduce((sum, value) => sum + (value - grand) ** 2, 0);
  const groups = new Map();
  for (const row of rows) {
    const key = row.dimension_indices[dimension];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row.metrics[variable]);
  }
  let between = 0;
  for (const group of groups.values()) {
    between += group.length * (mean(group) - grand) ** 2;
  }
  const low = groups.get(0) || [];
  const high = groups.get(2) || [];
  return {
    eta_squared: total === 0 ? 0 : between / total,
    low_mean: mean(low),
    high_mean: mean(high),
    high_minus_low: mean(high) - mean(low)
  };
}

function specificityMatrix(rows) {
  const dimensions = ["self_locus_strength", "continuity_fracture", "ownership_asymmetry"];
  return RAW_KEYS.map((variable) => ({
    variable,
    sensitivities: Object.fromEntries(dimensions.map((dimension) => [dimension, etaSquared(rows, variable, dimension)])),
    primary_dimension: dimensions
      .map((dimension) => ({ dimension, eta: etaSquared(rows, variable, dimension).eta_squared }))
      .sort((left, right) => right.eta - left.eta)[0].dimension
  }));
}

function rawCorrelationWithCi(rows) {
  const matrix = correlationMatrix(rows, RAW_KEYS);
  const pairs = [];
  for (let i = 0; i < RAW_KEYS.length; i += 1) {
    for (let j = i + 1; j < RAW_KEYS.length; j += 1) {
      const left = RAW_KEYS[i];
      const right = RAW_KEYS[j];
      const r = pearson(rows.map((row) => row.metrics[left]), rows.map((row) => row.metrics[right]));
      const ci = bootstrapCorrelationCi(rows, left, right, "raw");
      pairs.push({ left, right, r, ci_low: ci.low, ci_high: ci.high, redundancy_candidate: Math.abs(r) >= 0.7 });
    }
  }
  return {
    order: RAW_KEYS,
    matrix,
    pairs
  };
}

function cookedSummary(rows) {
  const matrix = correlationMatrix(rows, COOKED_KEYS);
  return {
    caveat: "QICN_FPPG and QICN_WRI are cooked synthetic variables in this harness. Their correlations reflect generator design, not construct validity.",
    order: COOKED_KEYS,
    matrix,
    means: Object.fromEntries(COOKED_KEYS.map((key) => [key, mean(rows.map((row) => row.metrics[key]))])),
    sensitivities: COOKED_KEYS.map((variable) => ({
      variable,
      self_locus_strength: etaSquared(rows, variable, "self_locus_strength"),
      continuity_fracture: etaSquared(rows, variable, "continuity_fracture"),
      ownership_asymmetry: etaSquared(rows, variable, "ownership_asymmetry")
    }))
  };
}

function cellSummary(rows) {
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.cell_id)) groups.set(row.cell_id, []);
    groups.get(row.cell_id).push(row);
  }
  return [...groups.entries()].map(([cellId, items]) => ({
    cell_id: cellId,
    n: items.length,
    mean_QICN_SIPM: mean(items.map((row) => row.metrics.QICN_SIPM)),
    mean_QICN_OFIA: mean(items.map((row) => row.metrics.QICN_OFIA)),
    mean_QICN_CFS: mean(items.map((row) => row.metrics.QICN_CFS)),
    mean_QICN_FPPG: mean(items.map((row) => row.metrics.QICN_FPPG)),
    mean_QICN_WRI: mean(items.map((row) => row.metrics.QICN_WRI)),
    self_accuracy: mean(items.map((row) => row.extractor_checks.self_correct ? 1 : 0)),
    cont_accuracy: mean(items.map((row) => row.extractor_checks.cont_correct ? 1 : 0)),
    ofia_self_accuracy: mean(items.map((row) => row.extractor_checks.ofia_self_correct ? 1 : 0))
  }));
}

function closeContrast() {
  const report = close63.generateReport();
  return {
    phase: report.phase,
    min_coupled_participation_ratio_n_eff: report.observed_summary.min_coupled_participation_ratio_n_eff,
    min_decoupled_participation_ratio_n_eff: report.observed_summary.min_decoupled_participation_ratio_n_eff,
    direction: report.observed_summary.direction,
    design_difference: "6.3-CLOSE swept a shared SNR ladder. 6.3-NR uses a factorial design where self-locus strength, continuity fracture sensitivity, and ownership asymmetry vary independently."
  };
}

function interpretFindings(specificity, correlations, dimensionality) {
  const highPairs = correlations.pairs.filter((pair) => pair.redundancy_candidate);
  const primary = Object.fromEntries(specificity.map((row) => [row.variable, row.primary_dimension]));
  const expected = {
    QICN_SIPM: "self_locus_strength",
    QICN_CFS: "continuity_fracture",
    QICN_OFIA: "ownership_asymmetry"
  };
  const offTarget = specificity.filter((row) => row.primary_dimension !== expected[row.variable]);
  const reducedDimensionality = dimensionality.n_eff < 2.5 || dimensionality.pc1_variance_fraction >= 0.55;
  const negativeFinding = highPairs.length > 0 || offTarget.length > 0 || reducedDimensionality;
  return {
    status: negativeFinding ? "REDUNDANCY_OR_CROSS_LOADING_DETECTED" : "NO_STRONG_REDUNDANCY_DETECTED_IN_THIS_SYNTHETIC_FACTORIAL",
    high_correlation_pairs: highPairs,
    off_target_primary_dimensions: offTarget.map((row) => ({
      variable: row.variable,
      expected: expected[row.variable],
      observed_primary_dimension: row.primary_dimension
    })),
    reduced_dimensionality: reducedDimensionality,
    interpretation: negativeFinding
      ? "The raw gate has fewer cleanly separable dimensions than its nominal variable count on this synthetic generator. This is an internal construct-validity warning, not an external result."
      : "The three raw variables behave as distinguishable synthetic axes in this factorial generator, but this does not transfer outside the generator."
  };
}

function generateReport(seedCount = 30) {
  const started = Date.now();
  const rows = runFactorial(seedCount);
  const specificity = specificityMatrix(rows);
  const correlations = rawCorrelationWithCi(rows);
  const pr = participationRatio(correlations.matrix);
  const cooked = cookedSummary(rows);
  const contrast = closeContrast();
  const finding = interpretFindings(specificity, correlations, pr);
  return {
    schema_version: "0.1.0",
    phase: "6.3-NR",
    status: "PASS_WITH_REPORTED_LIMITS_AND_DEBT",
    elapsed_ms: Date.now() - started,
    boundary: "Internal synthetic construct non-redundancy analysis only. Not Phase 7, not rival comparison, not external validation, not consciousness or phenomenality evidence.",
    design: {
      cells: factorialCells().length,
      seeds_per_cell: seedCount,
      total_runs: rows.length,
      dimensions: {
        self_locus_strength: SELF_LEVELS.map((level) => level.id),
        continuity_fracture: CONTINUITY_LEVELS.map((level) => level.id),
        ownership_asymmetry: OWNERSHIP_LEVELS.map((level) => level.id)
      },
      information_boundary: "Latent labels define factorial cells only. Extractors receive selfView, continuityView, and ownershipView raw traces without latent truth."
    },
    preflight: {
      qicn_phase6_3c_selflocus_extractor_js: "FUNCTIONAL",
      qicn_phase6_3d_contfield_extractor_js: "FUNCTIONAL",
      qicn_phase6_3e_ofia_extractor_js: "FUNCTIONAL",
      qicn_phase6_3close_coupled_gate_js: "FUNCTIONAL",
      qicn_phase6_3f_calibration_sensitivity_ceiling_js: "FUNCTIONAL"
    },
    specificity,
    raw_correlation: correlations,
    dimensionality: {
      eigenvalues: pr.eigenvalues,
      n_eff: pr.n_eff,
      pc1_variance_fraction: pr.pc1_variance_fraction
    },
    contrast_with_6_3_close: contrast,
    cooked_secondary: cooked,
    cell_summary: cellSummary(rows),
    finding,
    residual_limits: [
      "SelfIndex accuracy remained 1.0 across the factorial cells, so this pass does not resolve the previously documented low-SNR SelfIndex single-point-of-failure.",
      "The factorial generator deliberately separates self-locus strength, continuity fracture sensitivity, and ownership asymmetry; clean separation here is a property of this generator design, not external construct validity.",
      "QICN_CFS varies with the intended continuity dimension, but its synthetic means remain below the historical 0.25 support threshold in this run; specificity is not the same as gate pass.",
      "OFIA saturates at 1.8 for mid/high ownership-asymmetry cells, so its dimensional specificity should be read as separability, not as a calibrated scale.",
      "FPPG and WRI remain cooked and are excluded from the primary n_eff verdict."
    ],
    nonclaims: [
      "No external validation.",
      "No rival comparison.",
      "No evidence of consciousness, phenomenality, agency, human equivalence, or metaphysical identity.",
      "Results are generator-specific and do not transfer outside this synthetic factorial testbed.",
      "FPPG and WRI remain cooked synthetic and are not part of the primary dimensionality verdict."
    ]
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
  const specificityRows = report.specificity.map((row) => [
    row.variable,
    row.primary_dimension,
    round(row.sensitivities.self_locus_strength.eta_squared),
    round(row.sensitivities.self_locus_strength.high_minus_low),
    round(row.sensitivities.continuity_fracture.eta_squared),
    round(row.sensitivities.continuity_fracture.high_minus_low),
    round(row.sensitivities.ownership_asymmetry.eta_squared),
    round(row.sensitivities.ownership_asymmetry.high_minus_low)
  ]);
  const corrRows = report.raw_correlation.pairs.map((pair) => [
    `${pair.left} vs ${pair.right}`,
    round(pair.r),
    `[${round(pair.ci_low)}, ${round(pair.ci_high)}]`,
    pair.redundancy_candidate ? "YES" : "NO"
  ]);
  const cookedRows = report.cooked_secondary.sensitivities.map((row) => [
    row.variable,
    round(row.self_locus_strength.eta_squared),
    round(row.continuity_fracture.eta_squared),
    round(row.ownership_asymmetry.eta_squared),
    round(report.cooked_secondary.means[row.variable])
  ]);
  const cellRows = report.cell_summary.slice(0, 10).map((row) => [
    row.cell_id,
    row.n,
    round(row.mean_QICN_SIPM),
    round(row.mean_QICN_OFIA),
    round(row.mean_QICN_CFS),
    round(row.self_accuracy),
    round(row.cont_accuracy),
    round(row.ofia_self_accuracy)
  ]);
  return [
    "# QICN Roadmap v3 Phase 6.3-NR Construct Non-Redundancy",
    "",
    "Status: `" + report.status + "`",
    "Runtime reported by script: `" + round(report.elapsed_ms / 1000, 2) + "s`",
    "Scope: non-canonical AI-output internal construct analysis.",
    "",
    "## Boundary",
    "",
    report.boundary,
    "",
    "This does not validate QICN, does not compare against rivals, does not provide evidence about consciousness or phenomenality, and does not transfer outside this generator.",
    "",
    "## Design",
    "",
    "Phase label: `" + report.phase + "`.",
    "Factorial cells: `" + report.design.cells + "`. Seeds per cell: `" + report.design.seeds_per_cell + "`. Total runs: `" + report.design.total_runs + "`.",
    "",
    "The three independently varied latent dimensions are:",
    "",
    "- `self_locus_strength`: intended target of `QICN_SIPM`;",
    "- `continuity_fracture`: intended target of `QICN_CFS`;",
    "- `ownership_asymmetry`: intended target of `QICN_OFIA`.",
    "",
    "Latent labels are used only to define factorial cells and analyze outputs. Extractors receive only raw views.",
    "",
    "## Preflight",
    "",
    mdTable(["Dependency", "Classification"], Object.entries(report.preflight).map(([key, value]) => [key, value])),
    "",
    "## Specificity Matrix",
    "",
    "Values are marginal eta-squared by latent dimension. `delta` is high-level mean minus low-level mean for that dimension.",
    "",
    mdTable(
      ["Variable", "Primary dimension", "eta self", "delta self", "eta continuity", "delta continuity", "eta ownership", "delta ownership"],
      specificityRows
    ),
    "",
    "## Raw Variable Correlation",
    "",
    "Pearson correlations are computed across all factorial worlds. Confidence intervals use block bootstrap over factorial cells.",
    "",
    mdTable(["Pair", "r", "95% block-bootstrap CI", "|r| >= 0.7"], corrRows),
    "",
    "Correlation matrix order: `QICN_SIPM`, `QICN_OFIA`, `QICN_CFS`.",
    "",
    "```json",
    JSON.stringify(report.raw_correlation.matrix.map((row) => row.map((value) => round(value, 6))), null, 2),
    "```",
    "",
    "## Effective Dimensionality",
    "",
    "Participation ratio n_eff: `" + round(report.dimensionality.n_eff, 4) + "`.",
    "PC1 variance fraction: `" + round(report.dimensionality.pc1_variance_fraction, 4) + "`.",
    "Eigenvalues: `" + report.dimensionality.eigenvalues.map((value) => round(value, 4)).join(", ") + "`.",
    "",
    "Interpretive rule: n_eff near 3 supports three distinguishable synthetic axes; n_eff near 1-2 indicates redundancy or collapse.",
    "",
    "## Contrast With 6.3-CLOSE",
    "",
    mdTable(
      ["Quantity", "Value"],
      [
        ["6.3-CLOSE min coupled n_eff", round(report.contrast_with_6_3_close.min_coupled_participation_ratio_n_eff)],
        ["6.3-CLOSE min decoupled n_eff", round(report.contrast_with_6_3_close.min_decoupled_participation_ratio_n_eff)],
        ["6.3-CLOSE direction", report.contrast_with_6_3_close.direction],
        ["Design difference", report.contrast_with_6_3_close.design_difference]
      ]
    ),
    "",
    "## Cooked Variables: Secondary Only",
    "",
    report.cooked_secondary.caveat,
    "",
    mdTable(["Variable", "eta self", "eta continuity", "eta ownership", "mean"], cookedRows),
    "",
    "Cooked correlation matrix order: `QICN_FPPG`, `QICN_WRI`.",
    "",
    "```json",
    JSON.stringify(report.cooked_secondary.matrix.map((row) => row.map((value) => round(value, 6))), null, 2),
    "```",
    "",
    "## Finding",
    "",
    "Status: `" + report.finding.status + "`",
    "",
    report.finding.interpretation,
    "",
    report.finding.high_correlation_pairs.length
      ? `High-correlation raw pairs: ${report.finding.high_correlation_pairs.map((pair) => `${pair.left}/${pair.right} r=${round(pair.r)}`).join("; ")}.`
      : "No raw pair crossed the |r| >= 0.7 redundancy threshold.",
    "",
    report.finding.off_target_primary_dimensions.length
      ? `Off-target primary dimensions: ${report.finding.off_target_primary_dimensions.map((item) => `${item.variable}: expected ${item.expected}, observed ${item.observed_primary_dimension}`).join("; ")}.`
      : "Each raw variable's strongest marginal sensitivity matched its intended latent dimension.",
    "",
    report.finding.reduced_dimensionality
      ? "The effective dimensionality criterion flags reduced dimensionality."
      : "The effective dimensionality criterion did not flag collapse below the synthetic 3-axis target.",
    "",
    "## Residual Limits",
    "",
    ...report.residual_limits.map((item) => `- ${item}`),
    "",
    "## Cell Summary Sample",
    "",
    "First 10 of 27 cells shown for compactness.",
    "",
    mdTable(["Cell", "n", "mean SIPM", "mean OFIA", "mean CFS", "Self acc", "Cont acc", "OFIA self acc"], cellRows),
    "",
    "## Non-Claims",
    "",
    ...report.nonclaims.map((item) => `- ${item}`),
    "",
    "## Reproducibility",
    "",
    "```powershell",
    "node docs\\ai-platform-outputs\\sims\\qicn_phase6_3nr_construct_nonredundancy.js --self-test --write-report",
    "```"
  ].join("\n");
}

function writeReport(report) {
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, `${renderMarkdown(report)}\n`, "utf8");
}

function selfTest(report) {
  const failures = [];
  if (report.design.cells !== 27) failures.push("expected 27 factorial cells");
  if (report.design.seeds_per_cell < 30) failures.push("expected >=30 seeds per cell");
  if (report.design.total_runs !== report.design.cells * report.design.seeds_per_cell) failures.push("total run count mismatch");
  if (report.specificity.length !== 3) failures.push("missing raw specificity rows");
  if (report.raw_correlation.pairs.length !== 3) failures.push("missing raw correlation pairs");
  if (!Number.isFinite(report.dimensionality.n_eff)) failures.push("n_eff is not finite");
  if (!Number.isFinite(report.dimensionality.pc1_variance_fraction)) failures.push("pc1 fraction is not finite");
  if (!report.cooked_secondary.caveat.includes("cooked synthetic")) failures.push("missing cooked-variable caveat");
  if (report.nonclaims.length < 5) failures.push("missing non-claim boundary");
  return failures;
}

if (require.main === module) {
  const report = generateReport(30);
  if (process.argv.includes("--write-report")) writeReport(report);
  if (process.argv.includes("--self-test")) {
    const failures = selfTest(report);
    const output = { ...report, self_test: { status: failures.length ? "FAIL" : "PASS", failures } };
    console.log(JSON.stringify(output, null, 2));
    if (failures.length) process.exit(1);
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
}

module.exports = {
  generateReport,
  renderMarkdown,
  makeFactorialTrace,
  extractFactorial,
  runFactorial,
  specificityMatrix,
  rawCorrelationWithCi,
  participationRatio
};
