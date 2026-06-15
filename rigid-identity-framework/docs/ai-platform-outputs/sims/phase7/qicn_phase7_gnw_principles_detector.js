#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { buildBank } = require("../qicn_phase7_neutral_systems_bank_v2.js");

const MODEL_ID = "phase7-gnw-principles-detector-v1";
const STEPS = 5;
const WIDE_THRESHOLD = 0.67;

const LITERATURE_ANCHORS = [
  {
    id: "dehaene_kerszberg_changeux_1998",
    citation: "Dehaene, Kerszberg, and Changeux, A neuronal model of a global workspace in effortful cognitive tasks, PNAS 95:14529-14534.",
    url: "https://doi.org/10.1073/pnas.95.24.14529",
  },
  {
    id: "dehaene_changeux_2011",
    citation: "Dehaene and Changeux, Experimental and theoretical approaches to conscious processing, Neuron 70:200-227.",
    url: "https://doi.org/10.1016/j.neuron.2011.03.018",
  },
  {
    id: "mashour_roelfsema_changeux_dehaene_2020",
    citation: "Mashour, Roelfsema, Changeux, and Dehaene, Conscious processing and the Global Neuronal Workspace hypothesis, Neuron 105:776-798.",
    url: "https://doi.org/10.1016/j.neuron.2020.01.026",
  },
];

function readJsonUtf8(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  if (text.charCodeAt(0) === 0xfeff) {
    throw new Error(`UTF-8 JSON input must not contain a BOM: ${filePath}`);
  }
  return JSON.parse(text);
}

function transitionMap(system) {
  return new Map(system.transition_table.map((row) => [row.state, row.next]));
}

function activeFraction(state) {
  return state.split("").reduce((sum, bit) => sum + Number(bit), 0) / state.length;
}

function oneHot(n, index) {
  return Array.from({ length: n }, (_, i) => (i === index ? "1" : "0")).join("");
}

function simulate(system, initial, steps = STEPS) {
  const map = transitionMap(system);
  const states = [initial];
  for (let i = 0; i < steps; i += 1) {
    const next = map.get(states[states.length - 1]);
    if (typeof next !== "string") {
      throw new Error(`transition table missing state ${states[states.length - 1]} for ${system.id}`);
    }
    states.push(next);
  }
  return states;
}

function outDegrees(system) {
  const degrees = Array.from({ length: system.n }, () => 0);
  for (const [src, dst] of system.edges) {
    if (src !== dst) degrees[src] += 1;
  }
  return degrees;
}

function edgeSet(system) {
  return new Set(system.edges.map(([src, dst]) => `${src}->${dst}`));
}

function median(values) {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function hubSelectivity(system) {
  if (system.n <= 1) return 0;
  const degrees = outDegrees(system);
  const maxDegree = Math.max(...degrees);
  const med = median(degrees);
  return clamp((maxDegree - med) / Math.max(1, system.n - 1));
}

function feedbackCoverage(system) {
  const degrees = outDegrees(system);
  const maxDegree = Math.max(...degrees);
  const hubs = degrees.map((degree, index) => ({ degree, index })).filter((item) => item.degree === maxDegree);
  const edges = edgeSet(system);
  let best = 0;
  for (const hub of hubs) {
    let bidirectional = 0;
    for (let node = 0; node < system.n; node += 1) {
      if (node === hub.index) continue;
      if (edges.has(`${hub.index}->${node}`) && edges.has(`${node}->${hub.index}`)) bidirectional += 1;
    }
    best = Math.max(best, bidirectional / Math.max(1, system.n - 1));
  }
  return best;
}

function density(system) {
  return system.edges.length / Math.max(1, system.n * system.n);
}

function trajectoryMetrics(system) {
  const trajectories = Array.from({ length: system.n }, (_, i) => simulate(system, oneHot(system.n, i)));
  const activationSeries = trajectories.map((states) => states.map(activeFraction));
  const maxActivation = activationSeries.map((series) => Math.max(...series));
  const wideSeries = activationSeries.map((series) => series.map((value) => value >= WIDE_THRESHOLD));
  const sourceWideFraction = maxActivation.filter((value) => value >= WIDE_THRESHOLD).length / system.n;
  const persistenceBySource = wideSeries.map((series) => {
    let consecutiveWide = 0;
    for (let i = 1; i < series.length; i += 1) {
      if (series[i] && series[i - 1]) consecutiveWide += 1;
    }
    return consecutiveWide / Math.max(1, series.length - 2);
  });
  const sustainedBroadcast = Math.max(...persistenceBySource);
  const maxJump = Math.max(...activationSeries.flatMap((series) => {
    const jumps = [];
    for (let i = 1; i < series.length; i += 1) jumps.push(series[i] - series[i - 1]);
    return jumps;
  }));
  const normalizedIgnitionJump = clamp(maxJump / Math.max(1 / system.n, 1 - (1 / system.n)));
  const reverberation = activationSeries.some((series) => {
    let seenWide = false;
    for (const value of series.slice(1)) {
      if (value >= WIDE_THRESHOLD && seenWide) return true;
      if (value >= WIDE_THRESHOLD) seenWide = true;
      if (seenWide && value < WIDE_THRESHOLD) return false;
    }
    return false;
  }) ? 1 : 0;
  return {
    source_wide_fraction: round(sourceWideFraction),
    sustained_broadcast: round(sustainedBroadcast),
    nonlinear_ignition_jump: round(normalizedIgnitionJump),
    recurrent_reverberation: round(reverberation),
    max_activation: round(Math.max(...maxActivation)),
  };
}

function evaluateGnwPrinciples(system) {
  const trajectories = trajectoryMetrics(system);
  const selectivity = hubSelectivity(system);
  const feedback = feedbackCoverage(system);
  const nonDensitySelectivity = clamp(selectivity * feedback);
  const connectionDensity = density(system);
  const completeNonselective = connectionDensity >= 0.98 && nonDensitySelectivity < 0.25;
  const criteria = {
    nonlinear_ignition: trajectories.nonlinear_ignition_jump >= 0.5,
    recurrent_reverberation: trajectories.recurrent_reverberation >= 1,
    sustained_global_broadcast: trajectories.sustained_broadcast >= 0.5 && trajectories.max_activation >= WIDE_THRESHOLD,
    selective_not_density_only: nonDensitySelectivity >= 0.45 && !completeNonselective,
  };
  const passed = Object.values(criteria).every(Boolean);
  const score = (
    0.25 * trajectories.nonlinear_ignition_jump +
    0.25 * trajectories.recurrent_reverberation +
    0.25 * trajectories.sustained_broadcast +
    0.25 * nonDensitySelectivity
  );
  return {
    artifact: "qicn_phase7_gnw_principles_detector_result",
    model_id: MODEL_ID,
    system_id: system.id,
    family: system.family,
    n: system.n,
    status: "GNW_PRINCIPLES_EVALUATED_NO_CONSCIOUSNESS_CLAIM",
    literature_anchors: LITERATURE_ANCHORS,
    operational_scope: "Finite Boolean operationalization of GNW principles: ignition, reverberation, sustained broadcast, and selectivity against density-only activation.",
    metrics: {
      ...trajectories,
      hub_selectivity: round(selectivity),
      feedback_coverage: round(feedback),
      non_density_selectivity: round(nonDensitySelectivity),
      edge_density: round(connectionDensity),
      gnw_principles_score: round(score),
    },
    criteria,
    classification: passed ? "GNW_PRINCIPLED_IGNITION_AVAILABLE" : "GNW_PRINCIPLED_IGNITION_NOT_DETECTED",
  };
}

function run(bank) {
  const results = bank.systems.map(evaluateGnwPrinciples);
  return {
    artifact: "qicn_phase7_gnw_principles_detector_results",
    status: "GNW_PRINCIPLES_RUN_NO_QICN_COMPARISON",
    model_id: MODEL_ID,
    bank_version: bank.version,
    literature_anchors: LITERATURE_ANCHORS,
    results,
  };
}

function selfTest() {
  const bank = buildBank();
  const results = run(bank).results;
  const failures = [];
  const byFamily = new Map();
  for (const result of results) {
    if (!byFamily.has(result.family)) byFamily.set(result.family, []);
    byFamily.get(result.family).push(result);
  }
  for (const result of byFamily.get("broadcast_star_or") || []) {
    if (result.classification !== "GNW_PRINCIPLED_IGNITION_AVAILABLE") {
      failures.push(`${result.system_id} should pass principled GNW ignition`);
    }
  }
  for (const family of ["product_decoupled_copy", "all_to_all_and", "all_to_all_or", "all_to_all_nand", "random_density_030_parity", "random_density_050_majority", "random_density_050_mixed"]) {
    for (const result of byFamily.get(family) || []) {
      if (result.classification !== "GNW_PRINCIPLED_IGNITION_NOT_DETECTED") {
        failures.push(`${result.system_id} should not pass density/selectivity sanity`);
      }
    }
  }
  return {
    artifact: "qicn_phase7_gnw_principles_detector_self_test",
    status: failures.length ? "FAIL" : "PASS",
    model_id: MODEL_ID,
    sanity: {
      broadcast_star_should_pass: (byFamily.get("broadcast_star_or") || []).map((item) => item.classification),
      dense_and_or_nand_should_fail: ["all_to_all_and", "all_to_all_or", "all_to_all_nand"].flatMap((family) => (byFamily.get(family) || []).map((item) => item.classification)),
      random_density_should_fail: ["random_density_030_parity", "random_density_050_majority", "random_density_050_mixed"].flatMap((family) => (byFamily.get(family) || []).map((item) => item.classification)),
    },
    failures,
  };
}

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function round(value) {
  return Math.round(value * 10000) / 10000;
}

function main() {
  try {
    if (process.argv.includes("--self-test")) {
      const result = selfTest();
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === "PASS" ? 0 : 1);
    }
    const inputIndex = process.argv.indexOf("--input");
    const bank = inputIndex >= 0 ? readJsonUtf8(path.resolve(process.argv[inputIndex + 1])) : buildBank();
    console.log(JSON.stringify(run(bank), null, 2));
  } catch (error) {
    console.error(`GNW principles detector error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  LITERATURE_ANCHORS,
  evaluateGnwPrinciples,
  run,
  selfTest,
};
