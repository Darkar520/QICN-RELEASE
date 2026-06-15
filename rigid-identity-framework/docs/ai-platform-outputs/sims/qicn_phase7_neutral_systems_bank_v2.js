#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

const VERSION = "phase7-neutral-bank-v2";
const DEFAULT_SEED = 7307;

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

function threshold(values, k) {
  return values.reduce((sum, value) => sum + value, 0) >= k ? 1 : 0;
}

function parity(values) {
  return values.reduce((acc, value) => acc ^ value, 0);
}

function nand(values) {
  return values.every(Boolean) ? 0 : 1;
}

function ruleValue(rule, values, selfValue, dst, n) {
  const withSelf = values.length ? values.concat(selfValue) : [selfValue];
  if (rule === "copy") return values.length ? values[0] : selfValue;
  if (rule === "majority") return majority(withSelf);
  if (rule === "parity") return parity(withSelf);
  if (rule === "and") return withSelf.every(Boolean) ? 1 : 0;
  if (rule === "or") return withSelf.some(Boolean) ? 1 : 0;
  if (rule === "nand") return nand(withSelf);
  if (rule === "threshold_2") return threshold(withSelf, Math.min(2, withSelf.length));
  if (rule === "threshold_n_minus_1") return threshold(withSelf, Math.max(1, n - 1));
  if (rule === "mixed") {
    return ["and", "or", "nand", "threshold_2", "parity", "majority"][dst % 6]
      ? ruleValue(["and", "or", "nand", "threshold_2", "parity", "majority"][dst % 6], values, selfValue, dst, n)
      : selfValue;
  }
  throw new Error(`unknown rule: ${rule}`);
}

function transitionFor(family, n, edges, bits) {
  if (family === "product_decoupled_copy") return bits.slice();
  if (family === "chain_feedforward_copy") {
    const next = new Array(n).fill(0);
    next[0] = bits[0] & bits[1];
    for (let i = 1; i < n; i += 1) next[i] = bits[i - 1];
    return next;
  }
  if (family === "cycle_ring_copy") {
    return Array.from({ length: n }, (_, i) => bits[(i - 1 + n) % n]);
  }
  if (family === "broadcast_star_or") {
    const hub = bits[0];
    const peripheralMajority = majority(bits.slice(1));
    return Array.from({ length: n }, (_, i) => (i === 0 ? majority([hub, peripheralMajority]) : (hub || bits[i] ? 1 : 0)));
  }

  const ruleByFamily = {
    all_to_all_majority: "majority",
    all_to_all_and: "and",
    all_to_all_or: "or",
    all_to_all_nand: "nand",
    threshold_2_of_n: "threshold_2",
    threshold_n_minus_1_of_n: "threshold_n_minus_1",
    mixed_node_rules: "mixed",
    random_density_030_parity: "parity",
    random_density_050_majority: "majority",
    random_density_050_mixed: "mixed",
  };
  const rule = ruleByFamily[family];
  if (!rule) throw new Error(`unknown family: ${family}`);
  return Array.from({ length: n }, (_, dst) => {
    const srcs = incoming(edges, dst);
    const values = srcs.map((src) => bits[src]);
    return ruleValue(rule, values, bits[dst], dst, n);
  });
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

function allToAllEdges(n) {
  const edges = [];
  for (let src = 0; src < n; src += 1) {
    for (let dst = 0; dst < n; dst += 1) {
      edges.push([src, dst]);
    }
  }
  return edges;
}

function makeEdges(family, n, seed) {
  if (family === "product_decoupled_copy") return uniqueEdges(Array.from({ length: n }, (_, i) => [i, i]));
  if (family === "chain_feedforward_copy") {
    return uniqueEdges([[0, 0], [1, 0]].concat(Array.from({ length: n - 1 }, (_, i) => [i, i + 1])));
  }
  if (family === "cycle_ring_copy") return uniqueEdges(Array.from({ length: n }, (_, i) => [i, (i + 1) % n]));
  if (family === "broadcast_star_or") {
    const edges = [[0, 0]];
    for (let dst = 1; dst < n; dst += 1) {
      edges.push([0, dst], [dst, 0], [dst, dst]);
    }
    return uniqueEdges(edges);
  }
  if (family.startsWith("all_to_all") || family.startsWith("threshold_") || family === "mixed_node_rules") {
    return uniqueEdges(allToAllEdges(n));
  }
  if (family.startsWith("random_density_")) {
    const density = family.includes("030") ? 0.3 : 0.5;
    const rng = mulberry32(seed + n * 4099 + Math.round(density * 1000) + family.length);
    const edges = [];
    for (let src = 0; src < n; src += 1) {
      for (let dst = 0; dst < n; dst += 1) {
        if (src !== dst && rng() < density) edges.push([src, dst]);
      }
    }
    for (let dst = 0; dst < n; dst += 1) {
      edges.push([dst, dst]);
    }
    return uniqueEdges(edges);
  }
  throw new Error(`unknown family: ${family}`);
}

function neutralRationale(family) {
  const rationales = {
    product_decoupled_copy: "Standard product negative control with independent node memory.",
    chain_feedforward_copy: "Standard feedforward propagation chain.",
    cycle_ring_copy: "Standard local recurrent ring.",
    broadcast_star_or: "Standard hub-and-spoke broadcast topology with OR-like peripheral availability.",
    all_to_all_majority: "Standard dense majority threshold network.",
    all_to_all_and: "Standard dense conjunctive Boolean network.",
    all_to_all_or: "Standard dense disjunctive Boolean network.",
    all_to_all_nand: "Standard dense NAND Boolean network.",
    threshold_2_of_n: "Standard k-of-n threshold network with k=2.",
    threshold_n_minus_1_of_n: "Standard high-threshold k-of-n network with k=n-1.",
    mixed_node_rules: "Standard heterogeneous Boolean network with fixed per-node rules.",
    random_density_030_parity: "Seeded sparse random directed graph using parity updates.",
    random_density_050_majority: "Seeded medium-density random directed graph using majority updates.",
    random_density_050_mixed: "Seeded medium-density random directed graph using mixed node rules.",
  };
  return rationales[family];
}

function describeRule(family) {
  const descriptions = {
    product_decoupled_copy: "Each node copies itself.",
    chain_feedforward_copy: "Node i copies node i-1; node 0 is a conservative AND gate.",
    cycle_ring_copy: "Each node copies its predecessor on a directed ring.",
    broadcast_star_or: "Hub aggregates peripheral majority; peripherals receive OR-style hub broadcast.",
    all_to_all_majority: "All nodes apply majority over incoming values plus self.",
    all_to_all_and: "All nodes apply AND over incoming values plus self.",
    all_to_all_or: "All nodes apply OR over incoming values plus self.",
    all_to_all_nand: "All nodes apply NAND over incoming values plus self.",
    threshold_2_of_n: "All nodes apply 2-of-n threshold over incoming values plus self.",
    threshold_n_minus_1_of_n: "All nodes apply high threshold over incoming values plus self.",
    mixed_node_rules: "Nodes cycle through AND, OR, NAND, 2-threshold, parity, and majority.",
    random_density_030_parity: "Seeded sparse graph with parity updates.",
    random_density_050_majority: "Seeded medium-density graph with majority updates.",
    random_density_050_mixed: "Seeded medium-density graph with mixed per-node rules.",
  };
  return descriptions[family];
}

const FAMILIES = [
  "product_decoupled_copy",
  "chain_feedforward_copy",
  "cycle_ring_copy",
  "broadcast_star_or",
  "all_to_all_majority",
  "all_to_all_and",
  "all_to_all_or",
  "all_to_all_nand",
  "threshold_2_of_n",
  "threshold_n_minus_1_of_n",
  "mixed_node_rules",
  "random_density_030_parity",
  "random_density_050_majority",
  "random_density_050_mixed",
];

function buildSystem(family, n, seed) {
  const edges = makeEdges(family, n, seed);
  return {
    id: `bnv2_n${n}_${family}_seed${seed}`,
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

function buildBank(options = {}) {
  const seed = Number.isInteger(options.seed) ? options.seed : DEFAULT_SEED;
  const nMax = Number.isInteger(options.nMax) ? options.nMax : 6;
  const systems = [];
  for (let n = 3; n <= nMax; n += 1) {
    for (const family of FAMILIES) systems.push(buildSystem(family, n, seed));
  }
  return {
    artifact: "qicn_phase7_neutral_systems_bank_v2",
    status: "NON_CANONICAL_AI_OUTPUT_NEUTRAL_SYSTEM_BANK_V2",
    version: VERSION,
    seed,
    n_range: [3, nMax],
    families: FAMILIES,
    v1_preservation_note: "This v2 module is additive and does not change qicn_phase7_neutral_systems_bank.js or its v1 digest.",
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
  if (bank.systems.length !== 56) failures.push("expected 56 systems");
  if (digest(bank) !== digest(bank2)) failures.push("bank is not deterministic");
  for (const system of bank.systems) {
    if (system.transition_table.length !== 2 ** system.n) failures.push(`${system.id} transition table length mismatch`);
    if (system.qicn_instantiation_status !== "NOT_INSTANTIATED_BLOCKED_ON_HUMAN_REVIEW_OF_I_INT_GAP") {
      failures.push(`${system.id} QICN status changed`);
    }
    for (const row of system.transition_table) {
      if (!/^[01]+$/.test(row.next) || row.next.length !== system.n) failures.push(`${system.id} invalid next state`);
    }
  }
  return {
    artifact: "qicn_phase7_neutral_systems_bank_v2_self_test",
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
    const result = selfTest();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.status === "PASS" ? 0 : 1);
  }
  if (process.argv.includes("--emit-json")) {
    console.log(JSON.stringify(buildBank(), null, 2));
    return;
  }
  console.log("Usage: node qicn_phase7_neutral_systems_bank_v2.js --self-test|--emit-json");
}

if (require.main === module) main();

module.exports = {
  VERSION,
  FAMILIES,
  buildBank,
  selfTest,
};
