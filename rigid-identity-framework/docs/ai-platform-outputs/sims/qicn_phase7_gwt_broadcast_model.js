#!/usr/bin/env node
"use strict";

const { buildBank } = require("./qicn_phase7_neutral_systems_bank.js");
const { buildBank: buildBankV2 } = require("./qicn_phase7_neutral_systems_bank_v2.js");

const MODEL_ID = "phase7-gwt-broadcast-ignition-detector-v1";

function adjacency(system) {
  const out = Array.from({ length: system.n }, () => new Set());
  for (const [src, dst] of system.edges) out[src].add(dst);
  return out;
}

function reachableWithin(system, source, maxDepth) {
  const out = adjacency(system);
  const seen = new Set([source]);
  let frontier = [source];
  for (let depth = 0; depth < maxDepth; depth += 1) {
    const next = [];
    for (const node of frontier) {
      for (const dst of out[node]) {
        if (!seen.has(dst)) {
          seen.add(dst);
          next.push(dst);
        }
      }
    }
    frontier = next;
  }
  return seen.size / system.n;
}

function transitionMap(system) {
  return new Map(system.transition_table.map((row) => [row.state, row.next]));
}

function activeCount(state) {
  return state.split("").reduce((sum, bit) => sum + Number(bit), 0);
}

function oneHot(n, index) {
  return Array.from({ length: n }, (_, i) => (i === index ? "1" : "0")).join("");
}

function simulate(system, initial, steps) {
  const map = transitionMap(system);
  const states = [initial];
  for (let i = 0; i < steps; i += 1) {
    states.push(map.get(states[states.length - 1]));
  }
  return states;
}

function evaluateGwt(system) {
  const reachScores = Array.from({ length: system.n }, (_, i) => reachableWithin(system, i, 2));
  const globalAvailability = reachScores.reduce((a, b) => a + b, 0) / reachScores.length;
  const trajectories = Array.from({ length: system.n }, (_, i) => simulate(system, oneHot(system.n, i), 4));
  const maxActivation = trajectories.map((states) => Math.max(...states.map(activeCount)) / system.n);
  const persistence = trajectories.map((states) => {
    const activeWide = states.slice(1).filter((state) => activeCount(state) >= Math.ceil(system.n * 0.67));
    return activeWide.length / (states.length - 1);
  });
  const ignitionScore = Math.max(...maxActivation);
  const persistenceScore = Math.max(...persistence);
  const broadcastSourceFraction = maxActivation.filter((value) => value >= 0.67).length / system.n;
  const score = 0.35 * globalAvailability + 0.35 * ignitionScore + 0.2 * persistenceScore + 0.1 * broadcastSourceFraction;
  const classification = score >= 0.65 && globalAvailability >= 0.6 && ignitionScore >= 0.67
    ? "GWT_BROADCAST_AVAILABLE"
    : "GWT_BROADCAST_NOT_DETECTED";
  return {
    model_id: MODEL_ID,
    literature_anchor: "Dehaene, Kerszberg, and Changeux 1998 global neuronal workspace model; Dehaene and Changeux 2011 GNW review.",
    scope_limit: "Tiny Boolean broadcast/ignition detector; not complete GWT/GNW and not a consciousness claim.",
    system_id: system.id,
    family: system.family,
    n: system.n,
    metrics: {
      global_availability: round(globalAvailability),
      ignition_score: round(ignitionScore),
      persistence_score: round(persistenceScore),
      broadcast_source_fraction: round(broadcastSourceFraction),
      broadcast_ignition_score: round(score),
    },
    classification,
  };
}

function round(value) {
  return Math.round(value * 10000) / 10000;
}

function selfTest() {
  const bank = buildBank();
  const n4 = bank.systems.filter((system) => system.n === 4);
  const results = n4.map(evaluateGwt);
  const byFamily = new Map(results.map((result) => [result.family, result]));
  const failures = [];
  if (byFamily.get("product_decoupled").classification !== "GWT_BROADCAST_NOT_DETECTED") {
    failures.push("product_decoupled should not pass broadcast sanity");
  }
  if (byFamily.get("broadcast_star").classification !== "GWT_BROADCAST_AVAILABLE") {
    failures.push("broadcast_star should pass broadcast sanity");
  }
  return {
    artifact: "qicn_phase7_gwt_broadcast_model_self_test",
    status: failures.length ? "FAIL" : "PASS",
    model_id: MODEL_ID,
    source_boundary: [
      "Implements a minimal broadcast/ignition availability detector inspired by GNW.",
      "Does not implement all Dehaene-Changeux neuronal dynamics.",
      "Does not adjudicate consciousness or validate QICN.",
    ],
    sanity_results: results,
    failures,
  };
}

function main() {
  if (process.argv.includes("--self-test")) {
    const result = selfTest();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.status === "PASS" ? 0 : 1);
  }
  const bank = process.argv.includes("--bank-v2") ? buildBankV2() : buildBank();
  const result = bank.systems.map(evaluateGwt);
  console.log(JSON.stringify({
    artifact: "qicn_phase7_gwt_broadcast_model_results",
    status: "GWT_MODEL_EXECUTED_NO_QICN_COMPARISON",
    model_id: MODEL_ID,
    bank_version: bank.version,
    results: result,
  }, null, 2));
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  evaluateGwt,
  selfTest,
};
