const { generateTracePanel } = require("./external-trace-generator");
const { evaluateScenario, sha256 } = require("./pred-ext-01-evaluator");

const ROLE_NAMES = ["baseline", "targeted_post", "sham_post", "off_target_post"];

function weightsObject(alphabet, values) {
  return Object.fromEntries(alphabet.map((state, index) => [state, values[index]]));
}

function normalized(values) {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return values.map((value) => value / sum);
}

function rotateTrace(trace, amount) {
  if (trace.length === 0) return [];
  const shift = ((amount % trace.length) + trace.length) % trace.length;
  return trace.slice(shift).concat(trace.slice(0, shift));
}

function specFromRoleWeights({ id, salt, alphabet, roleWeights }) {
  const role_models = {};
  ROLE_NAMES.forEach((role) => {
    role_models[role] = { weights: roleWeights[role] || roleWeights.baseline };
  });
  return {
    id,
    role: "adversarial_negative_control",
    scenario_salt: salt,
    generative_model: "seeded_weighted_panel_v3_explicit_salt",
    role_models
  };
}

function candidateSpecs(freeze, family) {
  const alphabet = freeze.state_alphabet;
  const baseline = weightsObject(alphabet, [0.38, 0.34, 0.15, 0.13]);
  const uniform = weightsObject(alphabet, [0.25, 0.25, 0.25, 0.25]);
  const targetLike = weightsObject(alphabet, [0.14, 0.16, 0.56, 0.14]);
  const drift = weightsObject(alphabet, [0.23, 0.33, 0.25, 0.19]);
  const reward = weightsObject(alphabet, [0.42, 0.19, 0.18, 0.21]);
  const grids = [uniform, drift, reward, targetLike];

  if (family === "complexity-only") {
    return grids.map((w, index) => specFromRoleWeights({
      id: `${family}-${index}`,
      salt: `adversarial-${family}-${index}`,
      alphabet,
      roleWeights: { baseline, targeted_post: w, sham_post: w, off_target_post: w }
    }));
  }
  if (family === "memory-only") {
    return grids.map((w, index) => specFromRoleWeights({
      id: `${family}-${index}`,
      salt: `adversarial-${family}-${index}`,
      alphabet,
      roleWeights: { baseline: w, targeted_post: w, sham_post: w, off_target_post: w }
    }));
  }
  if (family === "narrative-only") {
    return [specFromRoleWeights({
      id: `${family}-0`,
      salt: `adversarial-${family}-0`,
      alphabet,
      roleWeights: { baseline, targeted_post: baseline, sham_post: baseline, off_target_post: baseline }
    })];
  }
  if (family === "entropy-matched") {
    return grids.map((w, index) => specFromRoleWeights({
      id: `${family}-${index}`,
      salt: `adversarial-${family}-${index}`,
      alphabet,
      roleWeights: { baseline, targeted_post: w, sham_post: w, off_target_post: w }
    }));
  }
  if (family === "targeted-frequency-matched") {
    return grids.map((w, index) => specFromRoleWeights({
      id: `${family}-${index}`,
      salt: `adversarial-${family}-${index}`,
      alphabet,
      roleWeights: { baseline, targeted_post: w, sham_post: w, off_target_post: w }
    }));
  }
  if (family === "role-shuffled") {
    return [specFromRoleWeights({
      id: `${family}-0`,
      salt: `adversarial-${family}-0`,
      alphabet,
      roleWeights: { baseline, targeted_post: baseline, sham_post: targetLike, off_target_post: targetLike }
    })];
  }
  if (family === "perturbation-shuffled") {
    return grids.map((w, index) => specFromRoleWeights({
      id: `${family}-${index}`,
      salt: `adversarial-${family}-${index}`,
      alphabet,
      roleWeights: { baseline, targeted_post: w, sham_post: w, off_target_post: baseline }
    }));
  }
  throw new Error(`Unknown adversarial family: ${family}`);
}

function scoreCandidate({ family, scenarioSpec, freeze, seed }) {
  const traces = generateTracePanel({
    seed,
    traceLength: freeze.trace_length,
    stateAlphabet: freeze.state_alphabet,
    scenarioSpec
  });
  const result = evaluateScenario(scenarioSpec.id, traces, freeze);
  return {
    family,
    candidate_id: scenarioSpec.id,
    scenario_salt: scenarioSpec.scenario_salt,
    support_rule_satisfied: Boolean(result.support_rule_satisfied),
    verdict: result.verdict,
    danger_score: result.metrics?.rho_selective || 0,
    margin_to_threshold: (result.metrics?.rho_selective || 0) - freeze.rho_selective_threshold,
    metrics: result.metrics || null,
    trace_panel_sha256: sha256({ family, seed, scenarioSpec, traces })
  };
}

function scoreTransitionPreservingCandidate({ freeze, seed }) {
  const baseSpec = freeze.scenario_manifest.find((scenario) => scenario.role === "positive") || freeze.scenario_manifest[0];
  const generated = generateTracePanel({
    seed,
    traceLength: freeze.trace_length,
    stateAlphabet: freeze.state_alphabet,
    scenarioSpec: baseSpec
  });
  const traces = {
    baseline: generated.baseline,
    targeted_post: rotateTrace(generated.baseline, 1),
    sham_post: rotateTrace(generated.baseline, 2),
    off_target_post: rotateTrace(generated.baseline, 3)
  };
  const result = evaluateScenario("transition-preserving-shuffled-0", traces, freeze);
  return {
    family: "transition-preserving-shuffled",
    candidate_id: "transition-preserving-shuffled-0",
    scenario_salt: baseSpec.scenario_salt,
    support_rule_satisfied: Boolean(result.support_rule_satisfied),
    verdict: result.verdict,
    danger_score: result.metrics?.rho_selective || 0,
    margin_to_threshold: (result.metrics?.rho_selective || 0) - freeze.rho_selective_threshold,
    metrics: result.metrics || null,
    trace_panel_sha256: sha256({ family: "transition-preserving-shuffled", seed, traces })
  };
}

function optimizeFamily(freeze, seed, family) {
  const candidates = family === "transition-preserving-shuffled"
    ? [scoreTransitionPreservingCandidate({ freeze, seed })]
    : candidateSpecs(freeze, family).map((scenarioSpec) => scoreCandidate({ family, scenarioSpec, freeze, seed }));
  candidates.sort((a, b) => b.danger_score - a.danger_score || b.margin_to_threshold - a.margin_to_threshold);
  return {
    family,
    candidate_count: candidates.length,
    best_candidate: candidates[0],
    candidates
  };
}

function runAdversarialNegativeControls(freeze, seeds = [freeze.primary_seed, freeze.holdout_seed].filter(Boolean)) {
  const families = [
    "complexity-only",
    "memory-only",
    "narrative-only",
    "entropy-matched",
    "targeted-frequency-matched",
    "role-shuffled",
    "perturbation-shuffled",
    "transition-preserving-shuffled"
  ];
  const seed_results = Object.fromEntries(seeds.map((seed) => {
    const family_results = Object.fromEntries(families.map((family) => [family, optimizeFamily(freeze, seed, family)]));
    const failures = Object.values(family_results)
      .map((entry) => entry.best_candidate)
      .filter((candidate) => candidate.support_rule_satisfied);
    return [seed, {
      seed,
      families_tested: families.length,
      family_results,
      negative_control_failures: failures,
      status: failures.length === 0 ? "adversarial_negative_controls_pass" : "NEGATIVE_CONTROL_FAILURE"
    }];
  }));
  const allFailures = Object.values(seed_results).flatMap((entry) => entry.negative_control_failures.map((failure) => ({ seed: entry.seed, ...failure })));
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-EXT-01",
    execution_class: "internal_synthetic_adversarial_negative_control_search",
    status: allFailures.length === 0 ? "adversarial_negative_controls_pass" : "NEGATIVE_CONTROL_FAILURE",
    support_blocked: allFailures.length > 0,
    freeze_id: freeze.freeze_id,
    seeds,
    seed_results,
    failures: allFailures,
    boundary: "Internal synthetic adversarial negative-control search only. Passing does not imply empirical validation, bridge admissibility, consciousness, phenomenality, or external support. Failure would block PRED-EXT-01 support pending freeze update or theory revision."
  };
}

module.exports = {
  runAdversarialNegativeControls,
  optimizeFamily,
  candidateSpecs,
  rotateTrace
};
