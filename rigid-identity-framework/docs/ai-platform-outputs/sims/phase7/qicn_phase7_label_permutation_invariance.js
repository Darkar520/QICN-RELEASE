#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const { buildBank, FAMILIES } = require("../qicn_phase7_neutral_systems_bank_v2.js");
const {
  evaluateConnectedIncidence,
  sanitizeForObservableAlgorithm,
} = require("./qicn_phase7_qicn_candidate_noncircularity.js");

const MODEL_ID = "phase7-label-permutation-invariance-v1";

const KNOWN_CROSS_MUTATIONS = [
  {
    name: "known_majority_product_swap",
    swaps: [["all_to_all_majority", "product_decoupled_copy"]],
  },
  {
    name: "known_cycle_product_swap",
    swaps: [["cycle_ring_copy", "product_decoupled_copy"]],
  },
  {
    name: "known_broadcast_product_swap",
    swaps: [["broadcast_star_or", "product_decoupled_copy"]],
  },
  {
    name: "known_threshold_product_swap",
    swaps: [["threshold_2_of_n", "product_decoupled_copy"]],
  },
  {
    name: "known_random_majority_product_swap",
    swaps: [["random_density_050_majority", "product_decoupled_copy"]],
  },
];

function sha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex").toUpperCase();
}

function swapMapping(swaps) {
  const mapping = new Map(FAMILIES.map((family) => [family, family]));
  for (const [left, right] of swaps) {
    mapping.set(left, right);
    mapping.set(right, left);
  }
  return mapping;
}

function rotateMapping(offset) {
  const mapping = new Map();
  FAMILIES.forEach((family, index) => {
    const next = FAMILIES[(index + offset + FAMILIES.length) % FAMILIES.length];
    mapping.set(family, next);
  });
  return mapping;
}

function reverseMapping() {
  const mapping = new Map();
  FAMILIES.forEach((family, index) => {
    mapping.set(family, FAMILIES[FAMILIES.length - 1 - index]);
  });
  return mapping;
}

function cycleMapping(cycle) {
  const mapping = new Map(FAMILIES.map((family) => [family, family]));
  cycle.forEach((family, index) => {
    mapping.set(family, cycle[(index + 1) % cycle.length]);
  });
  return mapping;
}

function mutationPlans() {
  return KNOWN_CROSS_MUTATIONS.map((plan) => ({
    name: plan.name,
    kind: "KNOWN_CROSS_LABEL_MUTATION",
    mapping: swapMapping(plan.swaps),
  })).concat([
    {
      name: "systematic_rotate_forward_one",
      kind: "SYSTEMATIC_FULL_FAMILY_PERMUTATION",
      mapping: rotateMapping(1),
    },
    {
      name: "systematic_rotate_backward_one",
      kind: "SYSTEMATIC_FULL_FAMILY_PERMUTATION",
      mapping: rotateMapping(-1),
    },
    {
      name: "systematic_reverse_family_order",
      kind: "SYSTEMATIC_FULL_FAMILY_PERMUTATION",
      mapping: reverseMapping(),
    },
    {
      name: "systematic_dense_threshold_cycle",
      kind: "SYSTEMATIC_PARTIAL_FAMILY_CYCLE",
      mapping: cycleMapping([
        "all_to_all_majority",
        "all_to_all_and",
        "all_to_all_or",
        "all_to_all_nand",
        "threshold_2_of_n",
        "threshold_n_minus_1_of_n",
      ]),
    },
    {
      name: "systematic_random_mixed_cycle",
      kind: "SYSTEMATIC_PARTIAL_FAMILY_CYCLE",
      mapping: cycleMapping([
        "mixed_node_rules",
        "random_density_030_parity",
        "random_density_050_majority",
        "random_density_050_mixed",
      ]),
    },
  ]);
}

function classify(system) {
  const candidate = evaluateConnectedIncidence(sanitizeForObservableAlgorithm(system));
  return {
    classification: candidate.candidate_qicn_classification,
    candidate_digest: sha256(candidate),
    observable_input_digest: sha256(sanitizeForObservableAlgorithm(system)),
  };
}

function permutedSystem(system, mapping) {
  return {
    ...system,
    family: mapping.get(system.family) || system.family,
    label_permutation_original_family: system.family,
    label_permutation_note: "Only family was relabeled; n and transition_table were left byte-identical for classifier evaluation.",
  };
}

function evaluatePlan(bank, plan, baselineById) {
  const rows = [];
  const changes = [];
  let familyFieldMutations = 0;
  let transitionTableChanges = 0;
  let observableInputChanges = 0;
  let fullCandidateChanges = 0;

  for (const system of bank.systems) {
    const mutated = permutedSystem(system, plan.mapping);
    const baseline = baselineById.get(system.id);
    const after = classify(mutated);
    const originalTransitionDigest = sha256(system.transition_table);
    const mutatedTransitionDigest = sha256(mutated.transition_table);
    const familyChanged = mutated.family !== system.family;
    if (familyChanged) familyFieldMutations += 1;
    if (originalTransitionDigest !== mutatedTransitionDigest) transitionTableChanges += 1;
    if (baseline.observable_input_digest !== after.observable_input_digest) observableInputChanges += 1;
    if (baseline.candidate_digest !== after.candidate_digest) fullCandidateChanges += 1;
    const classificationChanged = baseline.classification !== after.classification;
    if (classificationChanged) {
      changes.push({
        system_id: system.id,
        original_family: system.family,
        permuted_family: mutated.family,
        baseline_classification: baseline.classification,
        permuted_classification: after.classification,
      });
    }
    rows.push({
      system_id: system.id,
      original_family: system.family,
      permuted_family: mutated.family,
      family_changed: familyChanged,
      classification_unchanged: !classificationChanged,
      transition_table_digest_unchanged: originalTransitionDigest === mutatedTransitionDigest,
      observable_input_digest_unchanged: baseline.observable_input_digest === after.observable_input_digest,
      full_candidate_digest_unchanged: baseline.candidate_digest === after.candidate_digest,
    });
  }

  return {
    name: plan.name,
    kind: plan.kind,
    systems_scored: rows.length,
    family_field_mutations: familyFieldMutations,
    transition_table_changes: transitionTableChanges,
    observable_input_changes: observableInputChanges,
    full_candidate_changes: fullCandidateChanges,
    classification_changes: changes.length,
    changes,
    rows,
  };
}

function run() {
  const bank = buildBank();
  const baselineById = new Map(bank.systems.map((system) => [system.id, classify(system)]));
  const plans = mutationPlans();
  const permutations = plans.map((plan) => evaluatePlan(bank, plan, baselineById));
  const classificationChanges = permutations.reduce((sum, plan) => sum + plan.classification_changes, 0);
  const transitionTableChanges = permutations.reduce((sum, plan) => sum + plan.transition_table_changes, 0);
  const observableInputChanges = permutations.reduce((sum, plan) => sum + plan.observable_input_changes, 0);
  const fullCandidateChanges = permutations.reduce((sum, plan) => sum + plan.full_candidate_changes, 0);
  const familyFieldMutations = permutations.reduce((sum, plan) => sum + plan.family_field_mutations, 0);
  const status = classificationChanges === 0 && transitionTableChanges === 0 && observableInputChanges === 0
    ? "LABEL_INVARIANCE_CONFIRMED"
    : "LABEL_LEAKAGE_DETECTED";

  return {
    artifact: "qicn_phase7_label_permutation_invariance",
    status,
    model_id: MODEL_ID,
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    bank: {
      source: "qicn_phase7_neutral_systems_bank_v2",
      systems: bank.systems.length,
      families: FAMILIES,
      bank_digest: sha256(bank),
    },
    method: {
      invariant_field: "transition_table",
      mutated_field: "family",
      classifier_input_contract: ["n", "transition_table"],
      known_cross_mutations_required: KNOWN_CROSS_MUTATIONS.map((plan) => plan.name),
      note: "Invariancia a la etiqueta es necesaria, no suficiente, para no-circularidad; la suficiencia la da la verdad computada + hold-out.",
    },
    summary: {
      permutations_tested: permutations.length,
      known_cross_mutations_tested: permutations.filter((plan) => plan.kind === "KNOWN_CROSS_LABEL_MUTATION").length,
      system_evaluations: permutations.reduce((sum, plan) => sum + plan.systems_scored, 0),
      family_field_mutations: familyFieldMutations,
      transition_table_changes: transitionTableChanges,
      observable_input_changes: observableInputChanges,
      full_candidate_changes: fullCandidateChanges,
      classification_changes: classificationChanges,
    },
    permutations,
    no_claims: [
      "Label invariance does not prove non-circularity.",
      "No QICN gap closure is certified.",
      "No external validation is claimed.",
      "No consciousness, identity, subjectivity, phenomenality, or superiority claim follows.",
    ],
  };
}

function selfTest() {
  const result = run();
  const failures = [];
  if (result.status !== "LABEL_INVARIANCE_CONFIRMED") failures.push(`unexpected status ${result.status}`);
  if (result.summary.permutations_tested < 5) failures.push("fewer than five permutations tested");
  if (result.summary.known_cross_mutations_tested < 5) failures.push("fewer than five known cross-label mutations tested");
  if (result.summary.system_evaluations !== result.summary.permutations_tested * result.bank.systems) {
    failures.push("system evaluation count does not match permutations times bank size");
  }
  if (result.summary.family_field_mutations <= 0) failures.push("no family labels were actually mutated");
  if (result.summary.transition_table_changes !== 0) failures.push("a transition_table changed under label permutation");
  if (result.summary.observable_input_changes !== 0) failures.push("observable classifier input changed under label permutation");
  if (result.summary.classification_changes !== 0) failures.push("classification changed under label permutation");
  return {
    artifact: "qicn_phase7_label_permutation_invariance_self_test",
    status: failures.length ? "FAIL" : "PASS",
    label_invariance_status: result.status,
    summary: result.summary,
    bank: result.bank,
    no_claim_note: result.method.note,
    failures,
  };
}

function main() {
  if (process.argv.includes("--self-test")) {
    const result = selfTest();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.status === "PASS" ? 0 : 1);
  }
  console.log(JSON.stringify(run(), null, 2));
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  run,
  selfTest,
  mutationPlans,
};
