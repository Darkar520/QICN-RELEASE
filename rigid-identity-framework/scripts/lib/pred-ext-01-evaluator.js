const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  fitTraceMemoryRival,
  totalVariation,
  transitionDistribution
} = require("./trace-memory-rival");

function stableJson(value, seen = new WeakSet()) {
  if (Array.isArray(value)) return `[${value.map((item) => stableJson(item, seen)).join(",")}]`;
  if (value && typeof value === "object") {
    if (seen.has(value)) throw new Error("Cannot hash circular object.");
    seen.add(value);
    const body = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key], seen)}`)
      .join(",");
    seen.delete(value);
    return `{${body}}`;
  }
  if (typeof value === "undefined" || typeof value === "function" || typeof value === "symbol") {
    throw new Error(`Unsupported value in stable JSON hash: ${typeof value}`);
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(stableJson(value)).digest("hex");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function repeatPattern(pattern, length) {
  const trace = [];
  for (let index = 0; index < length; index += 1) {
    trace.push(pattern[index % pattern.length]);
  }
  return trace;
}

function rivalPolicyFromFreeze(freeze) {
  return {
    memoryDepth: freeze.trace_memory_rival_policy.memory_depth,
    minTraceLength: freeze.trace_memory_rival_policy.minimum_trace_length,
    laplaceSmoothing: freeze.trace_memory_rival_policy.laplace_smoothing,
    alphabet: freeze.state_alphabet
  };
}

function rivalPoliciesFromFreeze(freeze) {
  const suite = freeze.trace_memory_rival_suite || [
    {
      id: freeze.trace_memory_rival_policy.id,
      memory_depth: freeze.trace_memory_rival_policy.memory_depth,
      minimum_trace_length: freeze.trace_memory_rival_policy.minimum_trace_length,
      laplace_smoothing: freeze.trace_memory_rival_policy.laplace_smoothing
    }
  ];
  return suite.map((entry) => ({
    id: entry.id || `RIVAL-TRACE-MEMORY-depth-${entry.memory_depth}`,
    memoryDepth: entry.memory_depth,
    minTraceLength: entry.minimum_trace_length,
    laplaceSmoothing: entry.laplace_smoothing,
    alphabet: freeze.state_alphabet
  }));
}

function scoreRivalSuite(traces, freeze, targetDistribution) {
  return rivalPoliciesFromFreeze(freeze).map((policy) => {
    const rival = fitTraceMemoryRival(traces.baseline, policy);
    const prediction = rival.predictAggregateDistribution(traces.targeted_post);
    const rivalTvLoss = totalVariation(targetDistribution, prediction);
    const complexityPenalty =
      freeze.penalized_loss_alpha *
      (rival.parameterCount / (freeze.trace_length * freeze.state_alphabet.length));
    const penalizedRivalLoss = rivalTvLoss + complexityPenalty;
    return {
      id: policy.id,
      memory_depth: policy.memoryDepth,
      rival_tv_loss: rivalTvLoss,
      complexity_penalty: complexityPenalty,
      penalized_rival_loss: penalizedRivalLoss,
      rival_parameter_count: rival.parameterCount,
      rival_training_entropy_bits: rival.trainingEntropy
    };
  });
}

function scoreScenario(name, traces, freeze) {
  const rivalPolicy = rivalPolicyFromFreeze(freeze);
  const distributions = {
    baseline: transitionDistribution(traces.baseline, rivalPolicy),
    targeted_post: transitionDistribution(traces.targeted_post, rivalPolicy),
    sham_post: transitionDistribution(traces.sham_post, rivalPolicy),
    off_target_post: transitionDistribution(traces.off_target_post, rivalPolicy)
  };

  const tvTargeted = totalVariation(distributions.baseline, distributions.targeted_post);
  const tvSham = totalVariation(distributions.baseline, distributions.sham_post);
  const tvOffTarget = totalVariation(distributions.baseline, distributions.off_target_post);
  const controlMax = Math.max(tvSham, tvOffTarget, freeze.epsilon_floor);
  const rhoSelective = tvTargeted / controlMax;
  const rivalSuite = scoreRivalSuite(traces, freeze, distributions.targeted_post);
  const bestRival = rivalSuite.reduce((best, entry) =>
    entry.penalized_rival_loss < best.penalized_rival_loss ? entry : best
  );
  const supportRuleSatisfied =
    rhoSelective >= freeze.rho_selective_threshold &&
    tvTargeted > controlMax &&
    bestRival.penalized_rival_loss >= freeze.rival_loss_floor;

  return {
    scenario: name,
    verdict: supportRuleSatisfied ? "support_rule_satisfied" : "support_rule_not_satisfied",
    support_rule_satisfied: supportRuleSatisfied,
    metrics: {
      tv_targeted: tvTargeted,
      tv_sham: tvSham,
      tv_off_target: tvOffTarget,
      control_max: controlMax,
      rho_selective: rhoSelective,
      rival_tv_loss: bestRival.rival_tv_loss,
      complexity_penalty: bestRival.complexity_penalty,
      penalized_rival_loss: bestRival.penalized_rival_loss,
      rival_parameter_count: bestRival.rival_parameter_count,
      rival_training_entropy_bits: bestRival.rival_training_entropy_bits,
      strongest_rival_id: bestRival.id,
      strongest_rival_memory_depth: bestRival.memory_depth,
      rival_suite_min_penalized_loss: bestRival.penalized_rival_loss,
      rival_suite_depths_tested: rivalSuite.map((entry) => entry.memory_depth)
    },
    rival_suite: rivalSuite,
    distributions
  };
}

function evaluateScenario(name, traces, freeze) {
  try {
    return scoreScenario(name, traces, freeze);
  } catch (error) {
    return {
      scenario: name,
      verdict: "invalid_control_rejected_by_freeze",
      support_rule_satisfied: false,
      invalid_control: true,
      rejection_reason: error.message
    };
  }
}

function summarizeControls(scenarioResults, positiveScenarioId) {
  const controlEntries = Object.entries(scenarioResults).filter(([name]) => name !== positiveScenarioId);
  const controlsPassed = controlEntries.filter(([, result]) => !result.support_rule_satisfied).length;
  const controlsFailed = controlEntries.length - controlsPassed;
  return {
    positive_scenario: positiveScenarioId,
    controls_total: controlEntries.length,
    controls_passed: controlsPassed,
    controls_failed: controlsFailed,
    invalid_controls_rejected: controlEntries.filter(([, result]) => result.invalid_control).length,
    destruction_risk: controlsFailed > 0
  };
}

module.exports = {
  ensureDir,
  evaluateScenario,
  repeatPattern,
  rivalPolicyFromFreeze,
  rivalPoliciesFromFreeze,
  scoreScenario,
  sha256,
  stableJson,
  summarizeControls,
  writeJson
};
