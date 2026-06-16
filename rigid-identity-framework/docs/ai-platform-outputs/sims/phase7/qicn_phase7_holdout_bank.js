#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const { FAMILIES: TRAINING_FAMILIES } = require("../qicn_phase7_neutral_systems_bank_v2.js");
const { computeAtomicityTruth } = require("./qicn_phase7_atomicity_ground_truth.js");
const {
  evaluateConnectedIncidence,
  sanitizeForObservableAlgorithm,
} = require("./qicn_phase7_qicn_candidate_noncircularity.js");

const MODEL_ID = "phase7-holdout-out-of-sample-tpm-bank-v2";
const VERSION = "phase7-holdout-bank-v1";
const DEFAULT_SEED = 917503;
const RANDOM_CASES_PER_N = 12;
const MIN_FACTORIZABLE_NEGATIVES = 10;

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

function states(n) {
  return Array.from({ length: 2 ** n }, (_, index) => index.toString(2).padStart(n, "0"));
}

function transitionTableFromNext(n, nextFn) {
  return states(n).map((state) => ({
    state,
    next: nextFn(state),
  }));
}

function randomTpmSystem(n, caseIndex, seed) {
  const localSeed = seed + n * 1009 + caseIndex * 7919;
  const rng = mulberry32(localSeed);
  const allStates = states(n);
  return {
    id: `holdout_random_tpm_n${n}_case${String(caseIndex).padStart(2, "0")}_seed${localSeed}`,
    bank_version: VERSION,
    seed: localSeed,
    n,
    family: "holdout_random_deterministic_tpm",
    holdout_role: "OUT_OF_SAMPLE_RANDOM_TPM",
    generator_disjoint_from_training_families: true,
    transition_table: allStates.map((state) => ({
      state,
      next: allStates[Math.floor(rng() * allStates.length)],
    })),
  };
}

function bit(state, index) {
  return Number(state[index]);
}

function b(value) {
  return value ? "1" : "0";
}

function parity(values) {
  return values.reduce((acc, value) => acc ^ value, 0);
}

function blockRule(ruleName, localBits) {
  const bits = Array.from(localBits, Number);
  if (bits.length === 1) {
    const [a] = bits;
    if (ruleName === "not") return b(1 ^ a);
    if (ruleName === "force_zero") return "0";
    if (ruleName === "force_one") return "1";
  }
  if (bits.length === 2) {
    const [a, c] = bits;
    if (ruleName === "xor_or") return b(a ^ c) + b(a | c);
    if (ruleName === "and_not_right") return b(a & c) + b(1 ^ c);
    if (ruleName === "nand_xor") return b(1 ^ (a & c)) + b(a ^ c);
    if (ruleName === "or_left_and_not") return b(a | c) + b(a & (1 ^ c));
    if (ruleName === "left_implies_right") return b((1 ^ a) | c) + b(a ^ (1 ^ c));
  }
  if (bits.length === 3) {
    const [a, c, d] = bits;
    if (ruleName === "xor_or_and") return b(a ^ c) + b(c | d) + b(d & a);
    if (ruleName === "mux_xor_not") return b(a ? c : d) + b(a ^ d) + b(1 ^ c);
    if (ruleName === "nand_xor_or") return b(1 ^ (a & c)) + b(c ^ d) + b(a | d);
    if (ruleName === "parity_gate_mix") return b(parity(bits)) + b(a & (1 ^ d)) + b(c | d);
  }
  throw new Error(`unsupported block rule ${ruleName} for block length ${bits.length}`);
}

function blockProductTransitionTable(n, partition, blockRules) {
  return transitionTableFromNext(n, (state) => {
    const next = Array.from({ length: n }, () => "0");
    partition.forEach((block, blockIndex) => {
      const localState = block.map((node) => state[node]).join("");
      const localNext = blockRule(blockRules[blockIndex], localState);
      if (localNext.length !== block.length) {
        throw new Error(`block rule ${blockRules[blockIndex]} returned ${localNext.length} bits for block length ${block.length}`);
      }
      block.forEach((node, localIndex) => {
        next[node] = localNext[localIndex];
      });
    });
    return next.join("");
  });
}

function confirmedFactorizableBlockProductSystems(seed) {
  const definitions = [
    { name: "n3_1p2_not_xor_or", n: 3, partition: [[0], [1, 2]], rules: ["not", "xor_or"] },
    { name: "n3_1p2_zero_nand_xor", n: 3, partition: [[1], [0, 2]], rules: ["force_zero", "nand_xor"] },
    { name: "n3_2p1_andnot_one", n: 3, partition: [[0, 1], [2]], rules: ["and_not_right", "force_one"] },
    { name: "n3_2p1_implies_not", n: 3, partition: [[0, 2], [1]], rules: ["left_implies_right", "not"] },
    { name: "n4_2p2_xoror_andnot", n: 4, partition: [[0, 1], [2, 3]], rules: ["xor_or", "and_not_right"] },
    { name: "n4_2p2_nand_implies", n: 4, partition: [[0, 2], [1, 3]], rules: ["nand_xor", "left_implies_right"] },
    { name: "n4_2p2_orleft_xoror", n: 4, partition: [[0, 3], [1, 2]], rules: ["or_left_and_not", "xor_or"] },
    { name: "n4_1p3_not_xororand", n: 4, partition: [[0], [1, 2, 3]], rules: ["not", "xor_or_and"] },
    { name: "n4_1p3_zero_mux", n: 4, partition: [[2], [0, 1, 3]], rules: ["force_zero", "mux_xor_not"] },
    { name: "n4_3p1_nandmix_one", n: 4, partition: [[0, 2, 3], [1]], rules: ["nand_xor_or", "force_one"] },
    { name: "n4_3p1_parity_not", n: 4, partition: [[0, 1, 2], [3]], rules: ["parity_gate_mix", "not"] },
    { name: "n4_1p1p2_not_zero_orleft", n: 4, partition: [[0], [1], [2, 3]], rules: ["not", "force_zero", "or_left_and_not"] },
    { name: "n4_1p2p1_one_implies_not", n: 4, partition: [[0], [1, 2], [3]], rules: ["force_one", "left_implies_right", "not"] },
    { name: "n4_2p1p1_nand_zero_one", n: 4, partition: [[0, 3], [1], [2]], rules: ["nand_xor", "force_zero", "force_one"] },
  ];

  const confirmed = [];
  for (const [index, definition] of definitions.entries()) {
    const system = {
      id: `holdout_factorizable_block_product_${definition.name}_seed${seed + index}`,
      bank_version: VERSION,
      seed: seed + index,
      n: definition.n,
      family: `holdout_factorizable_block_product_${definition.name}`,
      holdout_role: "OUT_OF_SAMPLE_FACTORIZABLE_NON_ATOMIC",
      generator_disjoint_from_training_families: true,
      factorization_generator: {
        partition: definition.partition,
        block_rules: definition.rules,
        construction_note: "Independent block-product dynamics with no cross-block update dependence; retained only after brute-force truth confirms FACTORIZABLE_NON_ATOMIC.",
      },
      transition_table: blockProductTransitionTable(definition.n, definition.partition, definition.rules),
    };
    const truth = computeAtomicityTruth({
      n: system.n,
      transition_table: system.transition_table.map((row) => ({ state: row.state, next: row.next })),
    });
    if (truth.status === "FACTORIZABLE_NON_ATOMIC") {
      system.factorizable_truth_confirmation = {
        status: truth.status,
        truth_source: truth.truth_source,
        factorizing_partition: truth.factorizing_partition,
      };
      confirmed.push(system);
    }
  }
  return confirmed;
}

function manualSystems(seed) {
  const definitions = [
    {
      name: "affine_feedback_skew_n3",
      n: 3,
      next: (s) => b(bit(s, 0) ^ bit(s, 1)) + b(bit(s, 1) ^ bit(s, 2)) + b(1 ^ bit(s, 2)),
    },
    {
      name: "conditional_mux_feedback_n3",
      n: 3,
      next: (s) => b(bit(s, 0) ? bit(s, 1) : bit(s, 2)) + b(bit(s, 0) ^ bit(s, 2)) + b(bit(s, 1)),
    },
    {
      name: "inverting_driver_latch_n3",
      n: 3,
      next: (s) => b(1 ^ bit(s, 0)) + b(bit(s, 0) & (1 ^ bit(s, 2))) + b(bit(s, 1) | bit(s, 2)),
    },
    {
      name: "cross_swap_inverter_n3",
      n: 3,
      next: (s) => b(bit(s, 1)) + b(1 ^ bit(s, 0)) + b(bit(s, 2) ^ bit(s, 0)),
    },
    {
      name: "lfsr_affine_feedback_n4",
      n: 4,
      next: (s) => b(bit(s, 1)) + b(bit(s, 2)) + b(bit(s, 3)) + b(bit(s, 0) ^ bit(s, 2)),
    },
    {
      name: "two_cluster_crosscoupled_n4",
      n: 4,
      next: (s) => b(bit(s, 0) ^ bit(s, 2)) + b(bit(s, 1) & bit(s, 3)) + b(bit(s, 2) | bit(s, 0)) + b(bit(s, 3) ^ bit(s, 1)),
    },
    {
      name: "conditional_rotate_or_complement_n4",
      n: 4,
      next: (s) => (bit(s, 0)
        ? b(bit(s, 1)) + b(bit(s, 2)) + b(bit(s, 3)) + b(bit(s, 0))
        : b(1 ^ bit(s, 3)) + b(1 ^ bit(s, 2)) + b(1 ^ bit(s, 1)) + b(1 ^ bit(s, 0))),
    },
    {
      name: "checksum_latch_n4",
      n: 4,
      next: (s) => b(parity(bitsOf(parseInt(s, 2), 4))) + b(bit(s, 0)) + b(bit(s, 1) ^ bit(s, 3)) + b(bit(s, 2) | bit(s, 3)),
    },
  ];

  return definitions.map((definition, index) => ({
    id: `holdout_manual_${definition.name}_seed${seed + index}`,
    bank_version: VERSION,
    seed: seed + index,
    n: definition.n,
    family: `holdout_manual_${definition.name}`,
    holdout_role: "OUT_OF_SAMPLE_HAND_CONSTRUCTED_TPM",
    generator_disjoint_from_training_families: true,
    transition_table: transitionTableFromNext(definition.n, definition.next),
  }));
}

function buildHoldoutBank(options = {}) {
  const seed = Number.isInteger(options.seed) ? options.seed : DEFAULT_SEED;
  const systems = [];
  for (const n of [3, 4]) {
    for (let index = 0; index < RANDOM_CASES_PER_N; index += 1) {
      systems.push(randomTpmSystem(n, index, seed));
    }
  }
  systems.push(...manualSystems(seed + 50000));
  systems.push(...confirmedFactorizableBlockProductSystems(seed + 70000));
  return {
    artifact: "qicn_phase7_holdout_bank",
    status: "NON_CANONICAL_AI_OUTPUT_OUT_OF_SAMPLE_HOLDOUT_BANK",
    model_id: MODEL_ID,
    version: VERSION,
    seed,
    system_count: systems.length,
    n_range: [3, 4],
    generator_policy: "Disjoint from the 14 bank-v2 named families: random deterministic TPMs, hand-constructed transition rules, and confirmed non-atomic block-product TPMs; all evaluated through n + transition_table for truth/classifier scoring.",
    evaluation_order: [
      "Build hold-out transition tables deterministically.",
      "Compute atomicity truth first from n + transition_table with qicn_phase7_atomicity_ground_truth.js.",
      "Then evaluate the connected-incidence classifier from the same n + transition_table.",
      "Report confusion out-of-sample without threshold tuning or narrative upgrade.",
    ],
    training_families_excluded: TRAINING_FAMILIES,
    systems,
  };
}

function digest(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").toUpperCase();
}

function predictedAtomic(candidate) {
  return candidate.candidate_qicn_classification === "QICN_CANDIDATE_CONNECTED_INCIDENCE_PRESENT";
}

function round(value) {
  return Math.round(value * 10000) / 10000;
}

function confusion(results) {
  const scored = results.filter((result) => result.atomicity_truth.status !== "TRUTH_ERROR");
  const counts = { tp: 0, tn: 0, fp: 0, fn: 0 };
  for (const result of scored) {
    const expected = result.atomicity_truth.is_atomic;
    const predicted = predictedAtomic(result.connected_incidence);
    if (expected && predicted) counts.tp += 1;
    if (!expected && !predicted) counts.tn += 1;
    if (!expected && predicted) counts.fp += 1;
    if (expected && !predicted) counts.fn += 1;
  }
  const total = counts.tp + counts.tn + counts.fp + counts.fn;
  const positiveCount = counts.tp + counts.fn;
  const negativeCount = counts.tn + counts.fp;
  return {
    scored_count: total,
    unscored_count: results.length - scored.length,
    positive_count: positiveCount,
    negative_count: negativeCount,
    ...counts,
    accuracy: round(total ? (counts.tp + counts.tn) / total : 0),
    sensitivity: round(positiveCount ? counts.tp / positiveCount : 0),
    specificity: round(negativeCount ? counts.tn / negativeCount : 0),
  };
}

function evaluateSystem(system) {
  const observed = sanitizeForObservableAlgorithm(system);
  const atomicityTruth = computeAtomicityTruth(observed);
  const connectedIncidence = evaluateConnectedIncidence(observed);
  return {
    system_id: system.id,
    family: system.family,
    n: system.n,
    holdout_role: system.holdout_role,
    evaluation_order: "truth_computed_before_connected_incidence_classifier",
    algorithm_input_keys: Object.keys(observed).sort(),
    atomicity_truth: atomicityTruth,
    connected_incidence: connectedIncidence,
    scored_match: atomicityTruth.is_atomic === predictedAtomic(connectedIncidence),
  };
}

function run(options = {}) {
  const bank = buildHoldoutBank(options);
  const results = bank.systems.map(evaluateSystem);
  return {
    artifact: "qicn_phase7_holdout_generalization",
    status: "OUT_OF_SAMPLE_GENERALIZATION_MEASURED",
    model_id: MODEL_ID,
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    bank_digest: digest(bank),
    seed: bank.seed,
    system_count: bank.system_count,
    n_range: bank.n_range,
    generator_policy: bank.generator_policy,
    evaluation_order: bank.evaluation_order,
    in_sample_reference: {
      bank_v2_confusion_accuracy: 0.8929,
      bank_v2_sensitivity: 0.875,
      bank_v2_specificity: 1,
      bank_v2_status: "CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY",
    },
    confusion: confusion(results),
    results,
    no_claims: [
      "No QICN gap closure is certified.",
      "No external validation is claimed.",
      "Out-of-sample measurement is a finite deterministic toy hold-out only.",
      "No superiority, consciousness, agency, subjectivity, or phenomenality claim follows.",
    ],
  };
}

function validateTransitionTable(system, failures) {
  const expectedStates = states(system.n);
  const seen = new Set(system.transition_table.map((row) => row.state));
  if (system.transition_table.length !== expectedStates.length) {
    failures.push(`${system.id} transition_table length mismatch`);
  }
  if (seen.size !== expectedStates.length) failures.push(`${system.id} duplicate/missing states`);
  for (const row of system.transition_table) {
    if (!expectedStates.includes(row.state)) failures.push(`${system.id} invalid state ${row.state}`);
    if (!expectedStates.includes(row.next)) failures.push(`${system.id} invalid next state ${row.next}`);
  }
}

function selfTest() {
  const bank = buildHoldoutBank();
  const bank2 = buildHoldoutBank();
  const output = run();
  const failures = [];
  const factorizableSystems = bank.systems.filter((system) => system.holdout_role === "OUT_OF_SAMPLE_FACTORIZABLE_NON_ATOMIC");
  const truthNegatives = output.results.filter((result) => result.atomicity_truth.status === "FACTORIZABLE_NON_ATOMIC");
  if (bank.systems.length !== 46) failures.push(`expected 46 hold-out systems, got ${bank.systems.length}`);
  if (factorizableSystems.length < MIN_FACTORIZABLE_NEGATIVES) {
    failures.push(`expected at least ${MIN_FACTORIZABLE_NEGATIVES} confirmed factorizable systems, got ${factorizableSystems.length}`);
  }
  if (truthNegatives.length < MIN_FACTORIZABLE_NEGATIVES) {
    failures.push(`expected at least ${MIN_FACTORIZABLE_NEGATIVES} truth-confirmed negatives, got ${truthNegatives.length}`);
  }
  if (digest(bank) !== digest(bank2)) failures.push("hold-out bank is not deterministic");
  const training = new Set(TRAINING_FAMILIES);
  for (const system of bank.systems) {
    if (training.has(system.family)) failures.push(`${system.id} reuses training family ${system.family}`);
    if (system.family === "product_decoupled_copy") failures.push(`${system.id} reuses product_decoupled_copy`);
    if (![3, 4].includes(system.n)) failures.push(`${system.id} n outside hold-out range`);
    if (system.generator_disjoint_from_training_families !== true) failures.push(`${system.id} missing disjoint-generator marker`);
    validateTransitionTable(system, failures);
    if (system.holdout_role === "OUT_OF_SAMPLE_FACTORIZABLE_NON_ATOMIC") {
      const truth = computeAtomicityTruth(sanitizeForObservableAlgorithm(system));
      if (truth.status !== "FACTORIZABLE_NON_ATOMIC") {
        failures.push(`${system.id} marked factorizable but truth returned ${truth.status}`);
      }
    }
  }
  if (output.status !== "OUT_OF_SAMPLE_GENERALIZATION_MEASURED") failures.push(`unexpected run status ${output.status}`);
  if (output.confusion.scored_count !== bank.systems.length) failures.push("hold-out confusion did not score all systems");
  return {
    artifact: "qicn_phase7_holdout_bank_self_test",
    status: failures.length ? "FAIL" : "PASS",
    model_id: MODEL_ID,
    bank_digest: digest(bank),
    system_count: bank.systems.length,
    random_tpm_systems: RANDOM_CASES_PER_N * 2,
    hand_constructed_systems: manualSystems(DEFAULT_SEED + 50000).length,
    confirmed_factorizable_systems: factorizableSystems.length,
    truth_negative_systems: truthNegatives.length,
    min_truth_negatives_required: MIN_FACTORIZABLE_NEGATIVES,
    run_status: output.status,
    confusion: output.confusion,
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
    console.log(JSON.stringify(buildHoldoutBank(), null, 2));
    return;
  }
  console.log(JSON.stringify(run(), null, 2));
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  VERSION,
  buildHoldoutBank,
  run,
  selfTest,
};
