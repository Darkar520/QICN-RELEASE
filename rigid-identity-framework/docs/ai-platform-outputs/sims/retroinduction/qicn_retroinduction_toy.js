#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

const MODEL_ID = "qicn-retroinduction-toy-v1";
const THRESHOLD = 0.5;
const EVALUATION_HORIZON = 3;

function round(value, digits = 6) {
  if (!Number.isFinite(value)) return value;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function clip(value) {
  return Math.max(0, Math.min(1, value));
}

function sha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex").toUpperCase();
}

function applyAffine(system, state, actionId) {
  const action = system.actions.find((candidate) => candidate.id === actionId);
  if (!action) throw new Error(`unknown action: ${actionId}`);
  const next = system.K.map((row, rowIndex) => {
    const linear = row.reduce((sum, coefficient, colIndex) => sum + coefficient * state[colIndex], 0);
    return clip(linear + action.b[rowIndex]);
  });
  return next;
}

function margin(state) {
  return 1 - state[0];
}

function marginPenalty(system, state) {
  const deficit = Math.max(0, system.threshold - margin(state));
  return deficit === 0 ? 0 : system.marginPenaltyScale * deficit + system.marginFailurePenalty;
}

function stageCost(system, state, actionId) {
  const action = system.actions.find((candidate) => candidate.id === actionId);
  const next = applyAffine(system, state, actionId);
  return action.immediateCost + marginPenalty(system, next);
}

function terminalCost(system, state) {
  return marginPenalty(system, state);
}

function bellman(system, state, horizon) {
  if (horizon === 0) {
    return {
      horizon,
      value: terminalCost(system, state),
      firstAction: null,
      sequence: [],
    };
  }

  let best = null;
  for (const action of system.actions) {
    const next = applyAffine(system, state, action.id);
    const future = bellman(system, next, horizon - 1);
    const value = stageCost(system, state, action.id) + system.discount * future.value;
    const candidate = {
      horizon,
      value,
      firstAction: action.id,
      sequence: [action.id].concat(future.sequence),
    };
    if (!best || value < best.value - 1e-12) best = candidate;
  }
  return best;
}

function rolloutPolicy(system, policyHorizon, steps = EVALUATION_HORIZON) {
  let state = system.initialState.slice();
  const states = [state.slice()];
  const actions = [];
  const margins = [margin(state)];
  let totalCost = 0;

  for (let step = 0; step < steps; step += 1) {
    const decision = bellman(system, state, policyHorizon);
    const actionId = decision.firstAction;
    actions.push(actionId);
    totalCost += stageCost(system, state, actionId);
    state = applyAffine(system, state, actionId);
    states.push(state.slice());
    margins.push(margin(state));
  }
  totalCost += terminalCost(system, state);

  const preserved = margins.every((value) => value >= system.threshold);
  const firstFailureStep = margins.findIndex((value) => value < system.threshold);
  return {
    policy_horizon: policyHorizon,
    evaluation_steps: steps,
    first_action: actions[0],
    actions,
    states: states.map((row) => row.map((value) => round(value))),
    margins: margins.map((value) => round(value)),
    first_failure_step: firstFailureStep === -1 ? null : firstFailureStep,
    margin_preserved: preserved,
    margin_preservation_rate: preserved ? 1 : 0,
    evaluation_total_cost: round(totalCost),
    initial_bellman_value: round(bellman(system, system.initialState, policyHorizon).value),
    initial_bellman_sequence: bellman(system, system.initialState, policyHorizon).sequence,
  };
}

function delayedRuptureSystem() {
  return {
    id: "delayed_margin_rupture_affine_contracting",
    role: "PREDICTION_SYSTEM",
    description: "Tempting action has lower immediate cost but makes certificate margin fail within three forward steps.",
    threshold: THRESHOLD,
    discount: 1,
    marginPenaltyScale: 20,
    marginFailurePenalty: 5,
    K: [
      [0.75, 0],
      [0, 0.5],
    ],
    k_operator_norm_bound: 0.75,
    initialState: [0.05, 0.2],
    actions: [
      {
        id: "rupture_delayed",
        immediateCost: 0.01,
        b: [0.35, 0.02],
      },
      {
        id: "safe_preserve",
        immediateCost: 0.08,
        b: [0.17, 0.1],
      },
    ],
  };
}

function negativeControlSystem() {
  return {
    id: "identical_margin_trajectory_negative_control",
    role: "NEGATIVE_CONTROL",
    description: "Actions have identical damage/margin dynamics and identical cost; horizon should not create a margin advantage.",
    threshold: THRESHOLD,
    discount: 1,
    marginPenaltyScale: 20,
    marginFailurePenalty: 5,
    K: [
      [0.75, 0],
      [0, 0.5],
    ],
    k_operator_norm_bound: 0.75,
    initialState: [0.05, 0.2],
    actions: [
      {
        id: "control_a",
        immediateCost: 0.04,
        b: [0.16, 0.02],
      },
      {
        id: "control_b",
        immediateCost: 0.04,
        b: [0.16, 0.21],
      },
    ],
  };
}

function evaluateSystem(system) {
  const horizon1 = rolloutPolicy(system, 1);
  const horizon3 = rolloutPolicy(system, 3);
  return {
    system_id: system.id,
    role: system.role,
    K: system.K,
    k_operator_norm_bound: system.k_operator_norm_bound,
    threshold: system.threshold,
    initial_state: system.initialState,
    margin_definition: "margin(x)=1-x[0]; certificate margin is preserved iff margin(x) >= threshold.",
    forward_dynamics: "T_u(x)=clip(Kx+b_u), evaluated forward only.",
    actions: system.actions,
    h1_myopic: horizon1,
    h3_lookahead: horizon3,
    comparison: {
      h3_avoids_first_rupture_action: horizon3.first_action !== "rupture_delayed",
      h1_takes_first_rupture_action: horizon1.first_action === "rupture_delayed",
      h3_margin_advantage: horizon3.margin_preservation_rate - horizon1.margin_preservation_rate,
      h3_evaluation_cost_delta_vs_h1: round(horizon3.evaluation_total_cost - horizon1.evaluation_total_cost),
    },
  };
}

function run() {
  const delayed = evaluateSystem(delayedRuptureSystem());
  const control = evaluateSystem(negativeControlSystem());
  const predictionHolds = (
    delayed.h1_myopic.first_action === "rupture_delayed" &&
    delayed.h1_myopic.margin_preserved === false &&
    delayed.h3_lookahead.first_action === "safe_preserve" &&
    delayed.h3_lookahead.margin_preserved === true &&
    delayed.h3_lookahead.evaluation_total_cost < delayed.h1_myopic.evaluation_total_cost
  );
  const negativeControlHolds = (
    control.h1_myopic.margin_preservation_rate === control.h3_lookahead.margin_preservation_rate &&
    Math.abs(control.h1_myopic.evaluation_total_cost - control.h3_lookahead.evaluation_total_cost) < 1e-12
  );
  const verdict = predictionHolds && negativeControlHolds
    ? "LOOKAHEAD_BEATS_MYOPIC_IN_TOY"
    : "NO_OPERATIONAL_VALUE_BEYOND_RELABELING";

  return {
    artifact: "qicn_retroinduction_toy",
    model_id: MODEL_ID,
    status: "NON_CANONICAL_SPECULATIVE_INTERNAL_TOY_EXPERIMENT",
    human_review: "REQUIRED",
    human_curated_status: "not_reviewed",
    verdict,
    epistemic_boundary: {
      retro_induction_reading: "finite_horizon_lookahead_optimal_control_only",
      no_physical_retrocausality: true,
      internal_only: true,
      external_support_certified: false,
      new_claims: [],
    },
    preregistered_expectations: {
      delayed_rupture_prediction: "H=3 avoids the delayed-rupture action and preserves margin; H=1 takes it and fails by the evaluation horizon.",
      negative_control: "When all admissible actions have identical margin trajectories and costs, H=3 should not outperform H=1.",
    },
    common_model_constraints: {
      state_space: "[0,1]^2",
      transition_family: "T_u(x)=clip(Kx+b_u)",
      k_operator_norm_bound: 0.75,
      basecore_h2_compatibility_note: "The toy uses ||K||_2 <= 0.75 < 1, matching the contraction-shape requirement referenced in BaseCore H2.",
    },
    delayed_rupture_system: delayed,
    negative_control_system: control,
    checks: {
      prediction_holds: predictionHolds,
      negative_control_holds: negativeControlHolds,
      k_norm_bound_lt_one: delayed.k_operator_norm_bound < 1 && control.k_operator_norm_bound < 1,
    },
  };
}

function selfTest() {
  const result = run();
  const failures = [];
  if (!result.checks.k_norm_bound_lt_one) failures.push("K norm bound is not < 1.");
  if (!result.checks.prediction_holds) {
    failures.push("Delayed-rupture preregistered prediction failed.");
  }
  if (!result.checks.negative_control_holds) {
    failures.push("Negative control showed an unexpected horizon advantage.");
  }
  if (result.epistemic_boundary.new_claims.length !== 0) failures.push("NEW_CLAIM list must remain empty.");
  if (failures.length) {
    const err = new Error(`SELF_TEST_FAILED: ${failures.join(" ")}`);
    err.result = result;
    throw err;
  }
  return result;
}

if (require.main === module) {
  try {
    const result = process.argv.includes("--self-test") ? selfTest() : run();
    const payload = {
      ...result,
      digest: sha256(result),
      self_test: process.argv.includes("--self-test") ? "PASS" : "NOT_RUN",
    };
    console.log(JSON.stringify(payload, null, 2));
  } catch (error) {
    if (error.result) {
      console.error(JSON.stringify({
        ...error.result,
        digest: sha256(error.result),
        self_test: "FAIL",
        failure_message: error.message,
      }, null, 2));
    } else {
      console.error(error.stack || String(error));
    }
    process.exitCode = 1;
  }
}

module.exports = {
  run,
  selfTest,
  delayedRuptureSystem,
  negativeControlSystem,
  bellman,
  rolloutPolicy,
};
