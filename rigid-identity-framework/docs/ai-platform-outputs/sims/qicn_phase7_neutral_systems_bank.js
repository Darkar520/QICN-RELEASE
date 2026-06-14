#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

const VERSION = "phase7-neutral-bank-v1";
const DEFAULT_SEED = 7001;

function mulberry32(seed) {
  let t = seed >>> 0;
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

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

function incoming(edges, dst) {
  return edges.filter(([, j]) => j === dst).map(([i]) => i);
}

function majority(values) {
  const ones = values.reduce((sum, value) => sum + value, 0);
  return ones >= Math.ceil(values.length / 2) ? 1 : 0;
}

function parity(values) {
  return values.reduce((acc, value) => acc ^ value, 0);
}

function transitionFor(family, n, edges, bits) {
  if (family === "product_decoupled") {
    return bits.slice();
  }

  if (family === "chain_feedforward") {
    const next = new Array(n).fill(0);
    next[0] = bits[0] & bits[1];
    for (let i = 1; i < n; i += 1) next[i] = bits[i - 1];
    return next;
  }

  if (family === "cycle_ring") {
    const next = new Array(n).fill(0);
    for (let i = 0; i < n; i += 1) next[i] = bits[(i - 1 + n) % n];
    return next;
  }

  if (family === "all_to_all_majority") {
    const m = majority(bits);
    return new Array(n).fill(m);
  }

  if (family === "broadcast_star") {
    const hub = bits[0];
    const peripheralMajority = majority(bits.slice(1));
    const next = new Array(n).fill(0);
    next[0] = majority([hub, peripheralMajority]);
    for (let i = 1; i < n; i += 1) next[i] = hub || bits[i] ? 1 : 0;
    return next;
  }

  if (family.startsWith("random_density_")) {
    return Array.from({ length: n }, (_, dst) => {
      const srcs = incoming(edges, dst);
      const vals = srcs.length ? srcs.map((src) => bits[src]) : [bits[dst]];
      return family.endsWith("030") ? parity(vals.concat(bits[dst])) : majority(vals.concat(bits[dst]));
    });
  }

  throw new Error(`unknown family: ${family}`);
}

function transitionTable(family, n, edges) {
  return Array.from({ length: 2 ** n }, (_, index) => {
    const bits = bitsOf(index, n);
    return {
      state: stateId(bits),
      next: stateId(transitionFor(family, n, edges, bits)),
    };
  });
}

function makeEdges(family, n, seed) {
  if (family === "product_decoupled") {
    return uniqueEdges(Array.from({ length: n }, (_, i) => [i, i]));
  }
  if (family === "chain_feedforward") {
    return uniqueEdges(Array.from({ length: n - 1 }, (_, i) => [i, i + 1]));
  }
  if (family === "cycle_ring") {
    return uniqueEdges(Array.from({ length: n }, (_, i) => [i, (i + 1) % n]));
  }
  if (family === "all_to_all_majority") {
    const edges = [];
    for (let src = 0; src < n; src += 1) {
      for (let dst = 0; dst < n; dst += 1) {
        if (src !== dst) edges.push([src, dst]);
      }
    }
    return uniqueEdges(edges);
  }
  if (family === "broadcast_star") {
    const edges = [];
    for (let dst = 1; dst < n; dst += 1) {
      edges.push([0, dst]);
      edges.push([dst, 0]);
    }
    return uniqueEdges(edges);
  }
  if (family.startsWith("random_density_")) {
    const density = family.endsWith("030") ? 0.3 : 0.5;
    const rng = mulberry32(seed + n * 1009 + Math.round(density * 1000));
    const edges = [];
    for (let src = 0; src < n; src += 1) {
      for (let dst = 0; dst < n; dst += 1) {
        if (src !== dst && rng() < density) edges.push([src, dst]);
      }
    }
    for (let dst = 0; dst < n; dst += 1) {
      if (!edges.some(([, j]) => j === dst)) edges.push([dst, dst]);
    }
    return uniqueEdges(edges);
  }
  throw new Error(`unknown family: ${family}`);
}

function neutralRationale(family) {
  const rationales = {
    product_decoupled: "Standard negative-control product system: no cross-node causal coupling.",
    chain_feedforward: "Standard directed chain: ordered propagation without global broadcast by construction.",
    cycle_ring: "Standard ring topology: recurrent but locally distributed coupling.",
    all_to_all_majority: "Standard dense threshold network: high coupling without QICN-specific structure.",
    broadcast_star: "Standard hub-and-spoke graph: explicit global availability sanity case for broadcast models.",
    random_density_030: "Seeded Erdos-Renyi-style directed graph at controlled sparse density.",
    random_density_050: "Seeded Erdos-Renyi-style directed graph at controlled medium density.",
  };
  return rationales[family];
}

function buildSystem(family, n, seed) {
  const edges = makeEdges(family, n, seed);
  return {
    id: `bn_n${n}_${family}_seed${seed}`,
    bank_version: VERSION,
    seed,
    n,
    family,
    nodes: Array.from({ length: n }, (_, i) => `x${i}`),
    edges,
    update_rule: describeRule(family),
    neutral_rationale: neutralRationale(family),
    qicn_instantiation_status: "NOT_INSTANTIATED_BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP",
    transition_table: transitionTable(family, n, edges),
  };
}

function describeRule(family) {
  const descriptions = {
    product_decoupled: "Each node preserves its own prior Boolean state.",
    chain_feedforward: "Node i copies node i-1; node 0 is a conservative gate on nodes 0 and 1.",
    cycle_ring: "Each node copies its predecessor on a directed ring.",
    all_to_all_majority: "Every node receives the global majority value.",
    broadcast_star: "Hub aggregates peripheral majority; peripherals receive persistent hub broadcast.",
    random_density_030: "Seeded sparse graph; nodes apply parity over incoming values plus self.",
    random_density_050: "Seeded medium-density graph; nodes apply majority over incoming values plus self.",
  };
  return descriptions[family];
}

function buildBank(options = {}) {
  const seed = Number.isInteger(options.seed) ? options.seed : DEFAULT_SEED;
  const families = [
    "product_decoupled",
    "chain_feedforward",
    "cycle_ring",
    "all_to_all_majority",
    "broadcast_star",
    "random_density_030",
    "random_density_050",
  ];
  const systems = [];
  for (let n = 3; n <= 6; n += 1) {
    for (const family of families) systems.push(buildSystem(family, n, seed));
  }
  return {
    artifact: "qicn_phase7_neutral_systems_bank",
    status: "NON_CANONICAL_AI_OUTPUT_NEUTRAL_SYSTEM_BANK",
    version: VERSION,
    seed,
    n_range: [3, 6],
    families,
    limits: [
      "Tiny Boolean systems only.",
      "Not a neuroscience dataset.",
      "No QICN invariant is computed here.",
      "No consciousness, superiority, or external validation claim is made.",
    ],
    systems,
  };
}

function digest(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").toUpperCase();
}

function selfTest() {
  const bank = buildBank();
  const bank2 = buildBank();
  const failures = [];
  if (bank.systems.length !== 28) failures.push("expected 28 systems");
  if (digest(bank) !== digest(bank2)) failures.push("bank is not deterministic");
  for (const system of bank.systems) {
    if (system.transition_table.length !== 2 ** system.n) {
      failures.push(`${system.id} transition table length mismatch`);
    }
    const states = new Set(system.transition_table.map((row) => row.state));
    if (states.size !== 2 ** system.n) failures.push(`${system.id} missing states`);
    for (const row of system.transition_table) {
      if (!/^[01]+$/.test(row.next) || row.next.length !== system.n) {
        failures.push(`${system.id} invalid next state`);
      }
    }
  }
  return {
    artifact: "qicn_phase7_neutral_systems_bank_self_test",
    status: failures.length ? "FAIL" : "PASS",
    bank_digest: digest(bank),
    system_count: bank.systems.length,
    families: bank.families,
    limits: bank.limits,
    failures,
  };
}

function main() {
  if (process.argv.includes("--self-test")) {
    console.log(JSON.stringify(selfTest(), null, 2));
    process.exit(selfTest().status === "PASS" ? 0 : 1);
  }
  if (process.argv.includes("--emit-json")) {
    console.log(JSON.stringify(buildBank(), null, 2));
    return;
  }
  console.log("Usage: node qicn_phase7_neutral_systems_bank.js --self-test|--emit-json");
}

if (require.main === module) main();

module.exports = {
  VERSION,
  buildBank,
  selfTest,
  transitionFor,
};
