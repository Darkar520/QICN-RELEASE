#!/usr/bin/env node
"use strict";

const { buildBank } = require("../qicn_phase7_neutral_systems_bank_v2.js");

const MODEL_ID = "phase7-bruteforce-dynamic-factorization-truth-v1";

function validateSystemShape(observed) {
  if (!observed || !Number.isInteger(observed.n) || observed.n < 1) {
    throw new Error("computeAtomicityTruth requires integer n >= 1");
  }
  if (!Array.isArray(observed.transition_table)) {
    throw new Error("computeAtomicityTruth requires transition_table array");
  }
  const expected = 2 ** observed.n;
  if (observed.transition_table.length !== expected) {
    throw new Error(`transition_table length ${observed.transition_table.length} does not match 2^n=${expected}`);
  }
  const states = new Set();
  for (const row of observed.transition_table) {
    if (!row || typeof row.state !== "string" || typeof row.next !== "string") {
      throw new Error("transition_table rows must expose string state and next fields");
    }
    if (!/^[01]+$/.test(row.state) || row.state.length !== observed.n) {
      throw new Error(`invalid state ${row.state}`);
    }
    if (!/^[01]+$/.test(row.next) || row.next.length !== observed.n) {
      throw new Error(`invalid next state ${row.next}`);
    }
    states.add(row.state);
  }
  if (states.size !== expected) {
    throw new Error("transition_table states are not unique/complete");
  }
}

function projection(state, indices) {
  return indices.map((index) => state[index]).join("");
}

function complement(indices, n) {
  const inA = new Set(indices);
  const out = [];
  for (let index = 0; index < n; index += 1) {
    if (!inA.has(index)) out.push(index);
  }
  return out;
}

function nontrivialBipartitions(n) {
  const out = [];
  const maxMask = 2 ** n;
  for (let mask = 1; mask < maxMask - 1; mask += 1) {
    if ((mask & 1) === 0) continue;
    const left = [];
    for (let index = 0; index < n; index += 1) {
      if (mask & (2 ** index)) left.push(index);
    }
    const right = complement(left, n);
    if (left.length && right.length) out.push({ left, right });
  }
  return out;
}

function blockDeterminedByOwnState(rows, block) {
  const seen = new Map();
  for (const row of rows) {
    const key = projection(row.state, block);
    const next = projection(row.next, block);
    const prior = seen.get(key);
    if (prior !== undefined && prior !== next) return false;
    seen.set(key, next);
  }
  return true;
}

function partitionFactorizes(rows, partition) {
  return blockDeterminedByOwnState(rows, partition.left)
    && blockDeterminedByOwnState(rows, partition.right);
}

function computeAtomicityTruth(observed) {
  const sanitized = {
    n: observed.n,
    transition_table: observed.transition_table,
  };
  validateSystemShape(sanitized);
  const partitions = nontrivialBipartitions(sanitized.n);
  for (const partition of partitions) {
    if (partitionFactorizes(sanitized.transition_table, partition)) {
      return {
        artifact: "qicn_phase7_atomicity_ground_truth",
        model_id: MODEL_ID,
        status: "FACTORIZABLE_NON_ATOMIC",
        is_atomic: false,
        truth_source: "BRUTE_FORCE_DYNAMIC_FACTORIZATION_FROM_N_AND_TRANSITION_TABLE_ONLY",
        factorizing_partition: {
          left: partition.left,
          right: partition.right,
        },
        bipartitions_checked: partitions.length,
      };
    }
  }
  return {
    artifact: "qicn_phase7_atomicity_ground_truth",
    model_id: MODEL_ID,
    status: "NON_FACTORIZABLE_ATOMIC",
    is_atomic: true,
    truth_source: "BRUTE_FORCE_DYNAMIC_FACTORIZATION_FROM_N_AND_TRANSITION_TABLE_ONLY",
    factorizing_partition: null,
    bipartitions_checked: partitions.length,
  };
}

function sanitizeForTruth(system) {
  return {
    n: system.n,
    transition_table: system.transition_table.map((row) => ({ state: row.state, next: row.next })),
  };
}

function sourceContractAudit() {
  const forbiddenPatterns = [
    { label: "family", pattern: /\bfamily\b/ },
    { label: "edges", pattern: /\bedges\b/ },
    { label: "id", pattern: /(\.id\b|\["id"\]|\['id'\]|"id"\s*:)/ },
    { label: "qicn_instantiation_status", pattern: /\bqicn_instantiation_status\b/ },
    { label: "true_atomicity", pattern: /\btrue_atomicity\b/ },
    { label: "groundTruth", pattern: /\bgroundTruth\b/ },
  ];
  const source = [
    validateSystemShape.toString(),
    projection.toString(),
    complement.toString(),
    nontrivialBipartitions.toString(),
    blockDeterminedByOwnState.toString(),
    partitionFactorizes.toString(),
    computeAtomicityTruth.toString(),
  ].join("\n");
  const forbidden_hits = forbiddenPatterns.filter((item) => item.pattern.test(source)).map((item) => item.label);
  return {
    status: forbidden_hits.length ? "FAIL" : "PASS",
    allowed_input_contract: ["n", "transition_table"],
    forbidden_tokens_checked_in_truth_source: forbiddenPatterns.map((item) => item.label),
    forbidden_hits,
  };
}

function selfTest() {
  const bank = buildBank();
  const byFamily = new Map(bank.systems.filter((system) => system.n === 3).map((system) => [system.family, system]));
  const cases = [
    {
      name: "product_decoupled_copy_n3",
      system: byFamily.get("product_decoupled_copy"),
      expected_status: "FACTORIZABLE_NON_ATOMIC",
    },
    {
      name: "all_to_all_majority_n3",
      system: byFamily.get("all_to_all_majority"),
      expected_status: "NON_FACTORIZABLE_ATOMIC",
    },
    {
      name: "cycle_ring_copy_n3",
      system: byFamily.get("cycle_ring_copy"),
      expected_status: "NON_FACTORIZABLE_ATOMIC",
    },
  ];
  const failures = [];
  const results = cases.map((testCase) => {
    const truth = computeAtomicityTruth(sanitizeForTruth(testCase.system));
    if (truth.status !== testCase.expected_status) {
      failures.push(`${testCase.name} expected ${testCase.expected_status}, got ${truth.status}`);
    }
    return {
      name: testCase.name,
      expected_status: testCase.expected_status,
      observed_status: truth.status,
      factorizing_partition: truth.factorizing_partition,
    };
  });
  const audit = sourceContractAudit();
  if (audit.status !== "PASS") failures.push("truth source contract audit failed");
  return {
    artifact: "qicn_phase7_atomicity_ground_truth_self_test",
    status: failures.length ? "FAIL" : "PASS",
    model_id: MODEL_ID,
    definition: "Non-atomic iff some nontrivial bipartition has each block's next state determined by that block's current state alone.",
    source_contract_audit: audit,
    results,
    failures,
  };
}

function main() {
  try {
    if (process.argv.includes("--self-test")) {
      const result = selfTest();
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === "PASS" ? 0 : 1);
    }
    console.log(JSON.stringify({
      artifact: "qicn_phase7_atomicity_ground_truth_module",
      status: "READY",
      model_id: MODEL_ID,
      exported_functions: ["computeAtomicityTruth"],
    }, null, 2));
  } catch (error) {
    console.error(`Atomicity ground truth error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  computeAtomicityTruth,
  nontrivialBipartitions,
  selfTest,
};
