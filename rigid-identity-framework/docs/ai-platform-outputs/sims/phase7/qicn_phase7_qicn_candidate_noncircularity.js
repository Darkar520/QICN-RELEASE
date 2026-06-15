#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { buildBank } = require("../qicn_phase7_neutral_systems_bank_v2.js");
const { computeAtomicityTruth } = require("./qicn_phase7_atomicity_ground_truth.js");

const MODEL_ID = "phase7-candidate-qicn-connected-incidence-v1";
const HUMAN_REVIEW = "REQUIRED";
const HUMAN_CURATED_STATUS = "not_reviewed";

function readJsonUtf8(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  if (text.charCodeAt(0) === 0xfeff) {
    throw new Error(`UTF-8 JSON input must not contain a BOM: ${filePath}`);
  }
  return JSON.parse(text);
}

function transitionMapFromRows(rows) {
  return new Map(rows.map((row) => [row.state, row.next]));
}

function flipBit(state, index) {
  const bits = state.split("");
  bits[index] = bits[index] === "1" ? "0" : "1";
  return bits.join("");
}

function sanitizeForObservableAlgorithm(system) {
  return {
    n: system.n,
    transition_table: system.transition_table.map((row) => ({ state: row.state, next: row.next })),
  };
}

function buildPerturbationResponseIncidence(observed) {
  const keys = Object.keys(observed).sort();
  const allowed = ["n", "transition_table"];
  if (JSON.stringify(keys) !== JSON.stringify(allowed)) {
    throw new Error(`observable algorithm received forbidden input keys: ${keys.join(",")}`);
  }
  const map = transitionMapFromRows(observed.transition_table);
  const incidence = Array.from({ length: observed.n }, () => new Set());
  for (const row of observed.transition_table) {
    for (let separator = 0; separator < observed.n; separator += 1) {
      let base = row.state;
      let perturbed = flipBit(row.state, separator);
      for (let step = 1; step <= observed.n; step += 1) {
        base = map.get(base);
        perturbed = map.get(perturbed);
        if (typeof base !== "string" || typeof perturbed !== "string") {
          throw new Error("transition table is not closed over observed states");
        }
        for (let response = 0; response < observed.n; response += 1) {
          if (base[response] !== perturbed[response]) incidence[separator].add(response);
        }
      }
    }
  }
  return incidence.map((responses) => Array.from(responses).sort((a, b) => a - b));
}

function evaluateConnectedIncidence(observed) {
  const incidence = buildPerturbationResponseIncidence(observed);
  const n = observed.n;
  const total = 2 * n;
  const adjacency = Array.from({ length: total }, () => new Set());
  for (let separator = 0; separator < n; separator += 1) {
    for (const response of incidence[separator]) {
      adjacency[separator].add(n + response);
      adjacency[n + response].add(separator);
    }
  }
  const separatorComplete = incidence.every((responses) => responses.length > 0);
  const responseHits = Array.from({ length: n }, () => 0);
  incidence.forEach((responses) => responses.forEach((response) => {
    responseHits[response] += 1;
  }));
  const responseComplete = responseHits.every((count) => count > 0);
  const nonisolated = adjacency.map((neighbors, index) => (neighbors.size ? index : null)).filter((item) => item !== null);
  const connected = nonisolated.length === total && graphConnected(adjacency, nonisolated[0]);
  const edgeCount = incidence.reduce((sum, responses) => sum + responses.length, 0);
  return {
    incidence,
    separator_complete: separatorComplete,
    response_complete: responseComplete,
    connected_incidence: connected,
    incidence_edge_count: edgeCount,
    incidence_density: round(edgeCount / Math.max(1, n * n)),
    candidate_qicn_classification: connected && separatorComplete && responseComplete
      ? "QICN_CANDIDATE_CONNECTED_INCIDENCE_PRESENT"
      : "QICN_CANDIDATE_CONNECTED_INCIDENCE_ABSENT",
  };
}

function graphConnected(adjacency, start) {
  if (typeof start !== "number") return false;
  const seen = new Set([start]);
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    for (const next of adjacency[node]) {
      if (!seen.has(next)) {
        seen.add(next);
        stack.push(next);
      }
    }
  }
  return seen.size === adjacency.length;
}

function classifySystem(system) {
  const observed = sanitizeForObservableAlgorithm(system);
  const candidate = evaluateConnectedIncidence(observed);
  const truth = computeAtomicityTruth(observed);
  const predicted = candidate.candidate_qicn_classification === "QICN_CANDIDATE_CONNECTED_INCIDENCE_PRESENT";
  return {
    system_id: system.id,
    family: system.family,
    n: system.n,
    human_review: HUMAN_REVIEW,
    human_curated_status: HUMAN_CURATED_STATUS,
    artifact_status: "candidate_qicn_instantiation_non_canonical",
    algorithm_input_keys: Object.keys(observed).sort(),
    candidate,
    computed_atomicity_truth_for_evaluation: truth,
    scored_match: predicted === truth.is_atomic,
  };
}

function inputContractAudit() {
  const forbiddenTokens = ["family", "edges", "qicn_instantiation_status", "true_atomicity", "groundTruth"];
  const observableSource = [
    sanitizeForObservableAlgorithm.toString(),
    buildPerturbationResponseIncidence.toString(),
    evaluateConnectedIncidence.toString(),
  ].join("\n");
  const forbidden_hits = forbiddenTokens.filter((token) => observableSource.includes(token));
  return {
    status: forbidden_hits.length ? "FAIL" : "PASS",
    classifier_input_contract: ["n", "transition_table"],
    forbidden_tokens_checked_in_observable_algorithm_source: forbiddenTokens,
    forbidden_hits,
    note: "This audits the observable classifier input contract only. Atomicity ground truth is computed separately from n and transition_table, not from labels.",
  };
}

function confusion(results) {
  const scored = results.filter((result) => result.computed_atomicity_truth_for_evaluation.status !== "TRUTH_ERROR");
  const counts = { tp: 0, tn: 0, fp: 0, fn: 0 };
  for (const result of scored) {
    const expected = result.computed_atomicity_truth_for_evaluation.is_atomic;
    const predicted = result.candidate.candidate_qicn_classification === "QICN_CANDIDATE_CONNECTED_INCIDENCE_PRESENT";
    if (expected && predicted) counts.tp += 1;
    if (!expected && !predicted) counts.tn += 1;
    if (!expected && predicted) counts.fp += 1;
    if (expected && !predicted) counts.fn += 1;
  }
  const total = counts.tp + counts.tn + counts.fp + counts.fn;
  const accuracy = total ? (counts.tp + counts.tn) / total : 0;
  const sensitivity = (counts.tp + counts.fn) ? counts.tp / (counts.tp + counts.fn) : 0;
  const specificity = (counts.tn + counts.fp) ? counts.tn / (counts.tn + counts.fp) : 0;
  return {
    scored_count: total,
    unscored_count: results.length - scored.length,
    ...counts,
    accuracy: round(accuracy),
    sensitivity: round(sensitivity),
    specificity: round(specificity),
  };
}

function pyphiClass(pyphiResult) {
  if (!pyphiResult || pyphiResult.status !== "PYPHI_STATE_SWEEP_COMPUTED") return "IIT_PHI_UNAVAILABLE";
  const distribution = pyphiResult.phi_distribution || {};
  const maxPhi = Number(distribution.max || 0);
  const meanPhi = Number(distribution.mean || 0);
  return maxPhi >= 0.5 && meanPhi >= 0.1 ? "IIT_HIGH_PHI_TOY" : "IIT_LOW_PHI_TOY";
}

function gnwClass(gnwResult) {
  if (!gnwResult) return "GNW_UNAVAILABLE";
  return gnwResult.classification === "GNW_PRINCIPLED_IGNITION_AVAILABLE"
    ? "GNW_AVAILABLE_TOY"
    : "GNW_NOT_DETECTED_TOY";
}

function comparisonClass(qicnPresent, iitHigh, gnwAvailable) {
  const active = [qicnPresent, iitHigh, gnwAvailable].filter(Boolean).length;
  if (active >= 2) return "PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT";
  if (qicnPresent) return "PRELIM_TOY_FAVORS_QICN_CANDIDATE";
  if (iitHigh) return "PRELIM_TOY_FAVORS_IIT";
  if (gnwAvailable) return "PRELIM_TOY_FAVORS_GNW";
  return "PRELIM_TOY_ALL_FAIL_OR_NEGATIVE";
}

function preliminaryComparison(bank, qicnResults, pyphiRun, gnwRun) {
  const qicnById = new Map(qicnResults.map((result) => [result.system_id, result]));
  const pyphiById = new Map((pyphiRun?.results || []).map((result) => [result.system_id, result]));
  const gnwById = new Map((gnwRun?.results || []).map((result) => [result.system_id, result]));
  const rows = bank.systems.filter((system) => system.n === 3).map((system) => {
    const qicn = qicnById.get(system.id);
    const pyphi = pyphiById.get(system.id);
    const gnw = gnwById.get(system.id);
    const qicnPresent = qicn?.candidate?.candidate_qicn_classification === "QICN_CANDIDATE_CONNECTED_INCIDENCE_PRESENT";
    const iit = pyphiClass(pyphi);
    const gnwStatus = gnwClass(gnw);
    return {
      system_id: system.id,
      family: system.family,
      n: system.n,
      label: "PRELIMINARY_SUBJECT_TO_HUMAN_APPROVAL_OF_QICN_INSTANTIATION",
      qicn_candidate: qicnPresent ? "QICN_CONNECTED_INCIDENCE_PRESENT_TOY" : "QICN_CONNECTED_INCIDENCE_ABSENT_TOY",
      iit_phi: iit,
      gnw_principles: gnwStatus,
      outcome_class: comparisonClass(qicnPresent, iit === "IIT_HIGH_PHI_TOY", gnwStatus === "GNW_AVAILABLE_TOY"),
    };
  });
  return {
    artifact: "qicn_phase7_preliminary_qicn_iit_gnw_comparison",
    status: "PRELIMINARY_SUBJECT_TO_HUMAN_APPROVAL_OF_QICN_INSTANTIATION",
    forbidden_claims: ["superiority", "validation", "consciousness", "external adjudication"],
    symmetric_result_classes: [
      "PRELIM_TOY_FAVORS_QICN_CANDIDATE",
      "PRELIM_TOY_FAVORS_IIT",
      "PRELIM_TOY_FAVORS_GNW",
      "PRELIM_TOY_CONVERGENCE_OR_SHARED_SUPPORT",
      "PRELIM_TOY_ALL_FAIL_OR_NEGATIVE",
    ],
    rows,
  };
}

function run(bank, options = {}) {
  const results = bank.systems.map(classifySystem);
  const contract = inputContractAudit();
  const matrix = confusion(results);
  const support = contract.status === "PASS" && matrix.accuracy >= 0.95 && matrix.sensitivity >= 0.95 && matrix.specificity >= 0.95;
  const verdict = support
    ? "INPUT_LEAKAGE_RULED_OUT__GROUND_TRUTH_CIRCULARITY_TESTED__PENDING_HUMAN_REVIEW"
    : "CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY";
  const output = {
    artifact: "qicn_phase7_qicn_candidate_noncircularity",
    status: verdict,
    model_id: MODEL_ID,
    candidate_id: "candidate_qicn_instantiation_non_canonical",
    human_review: HUMAN_REVIEW,
    human_curated_status: HUMAN_CURATED_STATUS,
    reviewer_burden: "Human reviewer must decide whether finite separator-complete connected incidence is natural and non-circular, or merely a disguised restatement of atomicity.",
    operationalization: {
      source: "v20 connected-incidence scaffold, used here only as a finite non-canonical candidate over Boolean transition tables.",
      observable_algorithm_input: ["n", "transition_table"],
      hidden_labels_not_used_by_classifier: ["family", "edges", "id", "qicn_instantiation_status"],
      atomicity_truth: "Computed by brute-force dynamic factorization from n and transition_table only.",
      perturbation_response_rule: "For each state and each single-node flip, compare unperturbed and perturbed trajectories for up to n steps and record which response coordinates diverge.",
    },
    input_contract_audit: contract,
    confusion: matrix,
    results,
  };
  if (support && options.pyphiRun && options.gnwRun) {
    output.preliminary_comparison = preliminaryComparison(bank, results, options.pyphiRun, options.gnwRun);
  } else {
    output.preliminary_comparison = {
      status: "NOT_RUN",
      reason: support ? "PyPhi and GNW result inputs were not supplied." : "Connected incidence did not recover computed atomicity at the preregistered threshold.",
    };
  }
  return output;
}

function selfTest() {
  const result = run(buildBank());
  const failures = [];
  if (result.input_contract_audit.status !== "PASS") failures.push("observable algorithm input contract audit failed");
  const allowedVerdicts = [
    "INPUT_LEAKAGE_RULED_OUT__GROUND_TRUTH_CIRCULARITY_TESTED__PENDING_HUMAN_REVIEW",
    "CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY",
  ];
  if (!allowedVerdicts.includes(result.status)) {
    failures.push(`unexpected verdict: ${result.status}`);
  }
  return {
    artifact: "qicn_phase7_qicn_candidate_noncircularity_self_test",
    status: failures.length ? "FAIL" : "PASS",
    verdict: result.status,
    confusion: result.confusion,
    input_contract_audit: result.input_contract_audit,
    reviewer_burden: result.reviewer_burden,
    negative_result_is_valid: result.status === "CONNECTED_INCIDENCE_DOES_NOT_RECOVER_COMPUTED_ATOMICITY",
    failures,
  };
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
    const pyphiIndex = process.argv.indexOf("--pyphi-results");
    const gnwIndex = process.argv.indexOf("--gnw-results");
    const pyphiRun = pyphiIndex >= 0 ? readJsonUtf8(path.resolve(process.argv[pyphiIndex + 1])) : null;
    const gnwRun = gnwIndex >= 0 ? readJsonUtf8(path.resolve(process.argv[gnwIndex + 1])) : null;
    console.log(JSON.stringify(run(bank, { pyphiRun, gnwRun }), null, 2));
  } catch (error) {
    console.error(`QICN candidate non-circularity error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = {
  MODEL_ID,
  run,
  selfTest,
  classifySystem,
  preliminaryComparison,
};
