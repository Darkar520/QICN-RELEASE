#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

const MODEL_ID = "phase7-phi-positive-control-candidate-bank-v1";
const VERSION = "phase7-phi-positive-control-candidates-v1";
const DEFAULT_SEED = 7307;

function bitsOf(index, n) {
  return index.toString(2).padStart(n, "0").split("").map(Number);
}

function stateId(bits) {
  return bits.join("");
}

function uniqueEdges(edges) {
  const seen = new Set();
  const out = [];
  for (const [src, dst] of edges) {
    const key = `${src}->${dst}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push([src, dst]);
    }
  }
  return out.sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
}

function transitionTableCycleRingWithSelfLoops(n) {
  return Array.from({ length: 2 ** n }, (_, index) => {
    const bits = bitsOf(index, n);
    const next = Array.from({ length: n }, (_, i) => bits[i] || bits[(i - 1 + n) % n] ? 1 : 0);
    return {
      state: stateId(bits),
      next: stateId(next),
    };
  });
}

function cycleRingWithSelfLoopEdges(n) {
  const edges = [];
  for (let i = 0; i < n; i += 1) {
    edges.push([i, (i + 1) % n], [i, i]);
  }
  return uniqueEdges(edges);
}

function buildBank(options = {}) {
  const seed = Number.isInteger(options.seed) ? options.seed : DEFAULT_SEED;
  const n = 3;
  const systems = [
    {
      id: `phi_pc_n${n}_cycle_ring_with_self_loops_seed${seed}`,
      bank_version: VERSION,
      seed,
      n,
      family: "cycle_ring_with_self_loops",
      control_status: "NON_CANONICAL_POSITIVE_CONTROL_CANDIDATE",
      control_role: "Additive PyPhi positive-control candidate; not part of the 14-family bank v2 digest.",
      nodes: Array.from({ length: n }, (_, i) => `x${i}`),
      edges: cycleRingWithSelfLoopEdges(n),
      update_rule: "Each node updates to self OR predecessor on a directed ring with explicit node self-loops.",
      qicn_instantiation_status: "NOT_INSTANTIATED_BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP",
      transition_table: transitionTableCycleRingWithSelfLoops(n),
    },
  ];
  return {
    artifact: "qicn_phase7_phi_positive_control_bank",
    status: "NON_CANONICAL_AI_OUTPUT_PHI_POSITIVE_CONTROL_CANDIDATE_BANK",
    model_id: MODEL_ID,
    version: VERSION,
    seed,
    additive_policy: "This supplement does not alter qicn_phase7_neutral_systems_bank_v2.js, its 14 families, or the bank-v2 digest.",
    systems,
    no_claims: [
      "This is a positive-control candidate only.",
      "It is not an IIT validation result.",
      "It is not a QICN instantiation.",
      "It creates no consciousness, integration, superiority, or external-validation claim.",
    ],
  };
}

function digest(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").toUpperCase();
}

function selfTest() {
  const bank = buildBank();
  const bank2 = buildBank();
  const failures = [];
  if (bank.systems.length !== 1) failures.push(`expected one positive-control candidate, got ${bank.systems.length}`);
  if (digest(bank) !== digest(bank2)) failures.push("positive-control bank is not deterministic");
  const system = bank.systems[0];
  if (system.family !== "cycle_ring_with_self_loops") failures.push("unexpected positive-control family");
  if (system.control_status !== "NON_CANONICAL_POSITIVE_CONTROL_CANDIDATE") failures.push("missing non-canonical control marker");
  if (system.n !== 3) failures.push("positive-control candidate must be n=3 for exact PyPhi sweep");
  if (system.transition_table.length !== 2 ** system.n) failures.push("transition table length mismatch");
  for (let i = 0; i < system.n; i += 1) {
    if (!system.edges.some(([src, dst]) => src === i && dst === i)) failures.push(`missing self-loop for node ${i}`);
    if (!system.edges.some(([src, dst]) => src === i && dst === ((i + 1) % system.n))) failures.push(`missing ring edge for node ${i}`);
  }
  return {
    artifact: "qicn_phase7_phi_positive_control_bank_self_test",
    status: failures.length ? "FAIL" : "PASS",
    model_id: MODEL_ID,
    bank_digest: digest(bank),
    system_count: bank.systems.length,
    family: system.family,
    control_status: system.control_status,
    failures,
  };
}

function main() {
  if (process.argv.includes("--self-test")) {
    const result = selfTest();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.status === "PASS" ? 0 : 1);
  }
  if (process.argv.includes("--emit-json")) {
    console.log(JSON.stringify(buildBank(), null, 2));
    return;
  }
  console.log("Usage: node qicn_phase7_phi_positive_control_bank.js --self-test|--emit-json");
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  VERSION,
  buildBank,
  selfTest,
};
