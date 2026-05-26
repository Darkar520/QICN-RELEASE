function seedToUint32(seed) {
  const text = String(seed);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function weightedChoice(prng, alphabet, weights) {
  const total = alphabet.reduce((sum, state) => sum + (weights[state] || 0), 0);
  if (total <= 0) throw new Error("Weighted choice requires positive total weight.");
  let cursor = prng() * total;
  for (const state of alphabet) {
    cursor -= weights[state] || 0;
    if (cursor <= 0) return state;
  }
  return alphabet[alphabet.length - 1];
}

function assertAlphabet(trace, alphabet, label) {
  const allowed = new Set(alphabet);
  const unknown = Array.from(new Set(trace.filter((state) => !allowed.has(state)))).sort();
  if (unknown.length > 0) {
    throw new Error(`${label} contains state(s) outside declared alphabet: ${unknown.join(", ")}`);
  }
}

function generateWeightedTrace({ seed, traceLength, stateAlphabet, weights }) {
  const prng = mulberry32(seedToUint32(seed));
  const trace = [];
  for (let index = 0; index < traceLength; index += 1) {
    trace.push(weightedChoice(prng, stateAlphabet, weights));
  }
  assertAlphabet(trace, stateAlphabet, "Generated trace");
  return trace;
}

function defaultScenarioSpec() {
  const baseline = { A: 0.38, B: 0.34, C: 0.15, D: 0.13 };
  return {
    id: "default_seeded_panel",
    generative_model: "seeded_weighted_panel_v2",
    role_models: {
      baseline: { weights: baseline },
      targeted_post: { weights: baseline },
      sham_post: { weights: baseline },
      off_target_post: { weights: baseline }
    }
  };
}

function validateWeights(weights, alphabet, label) {
  if (!weights || typeof weights !== "object" || Array.isArray(weights)) {
    throw new Error(`${label} must provide a weights object.`);
  }
  const unknown = Object.keys(weights).filter((state) => !alphabet.includes(state));
  if (unknown.length > 0) throw new Error(`${label} has state(s) outside declared alphabet: ${unknown.join(", ")}`);
  const total = alphabet.reduce((sum, state) => sum + (weights[state] || 0), 0);
  if (total <= 0) throw new Error(`${label} weights must have positive total mass.`);
}

function roleWeightsFromSpec(scenarioSpec, role, alphabet) {
  const spec = scenarioSpec || defaultScenarioSpec();
  if (spec.generative_model && spec.generative_model !== "seeded_weighted_panel_v2") {
    throw new Error(`Unsupported generative_model: ${spec.generative_model}`);
  }
  const roleModels = spec.role_models || {};
  const model = roleModels[role] || roleModels.baseline;
  if (!model) throw new Error(`Scenario ${spec.id || "unknown"} is missing role model for ${role}.`);
  validateWeights(model.weights, alphabet, `${spec.id || "scenario"}.${role}`);
  return model.weights;
}

function generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec }) {
  if (!seed) throw new Error("seed is required.");
  if (!Number.isInteger(traceLength) || traceLength <= 0) throw new Error("traceLength must be positive integer.");
  if (!Array.isArray(stateAlphabet) || stateAlphabet.length === 0) throw new Error("stateAlphabet is required.");
  const spec = scenarioSpec || defaultScenarioSpec();
  const roles = ["baseline", "targeted_post", "sham_post", "off_target_post"];
  const panel = {};
  roles.forEach((role) => {
    panel[role] = generateWeightedTrace({
      seed: `${seed}:${spec.id || "anonymous"}:${role}`,
      traceLength,
      stateAlphabet,
      weights: roleWeightsFromSpec(spec, role, stateAlphabet)
    });
  });
  return panel;
}

function validateGeneratorDeterminism(seed, traceLength, stateAlphabet, scenarioSpec = defaultScenarioSpec()) {
  const first = generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec });
  const second = generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec });
  return JSON.stringify(first) === JSON.stringify(second);
}

module.exports = {
  defaultScenarioSpec,
  generateTracePanel,
  generateWeightedTrace,
  mulberry32,
  roleWeightsFromSpec,
  seedToUint32,
  validateGeneratorDeterminism
};
