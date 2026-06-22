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

// Supported generative models for the synthetic trace panel.
//
// - seeded_weighted_panel_v2: per-role PRNG seed is derived from the run seed,
//   the scenario id, and the role name. Any `scenario_salt` field is ignored.
// - seeded_weighted_panel_v3_explicit_salt: identical weighted-emission
//   semantics, but the per-role PRNG seed ALSO folds in a mandatory
//   `scenario_salt`. This makes the salt an explicit, load-bearing part of the
//   seed derivation so that adversarial negative-control candidates that share
//   id/weights but differ in salt produce genuinely decorrelated trace streams.
//   The salt is required and non-empty: this is what keeps the control a real
//   adversarial null rather than a degenerate re-run of v2.
const SUPPORTED_GENERATIVE_MODELS = new Set([
  "seeded_weighted_panel_v2",
  "seeded_weighted_panel_v3_explicit_salt"
]);

function resolveGenerativeModel(spec) {
  return spec.generative_model || "seeded_weighted_panel_v2";
}

// Returns the scenario-scoped component of the per-role PRNG seed. For v3 the
// explicit salt is prepended so it materially changes generated traces; for v2
// the component is exactly the scenario id (preserving byte-identical output).
function panelSeedComponent(spec) {
  const model = resolveGenerativeModel(spec);
  if (model === "seeded_weighted_panel_v3_explicit_salt") {
    const salt = spec.scenario_salt;
    if (salt === undefined || salt === null || String(salt).length === 0) {
      throw new Error(
        `generative_model seeded_weighted_panel_v3_explicit_salt requires a non-empty scenario_salt on scenario ${spec.id || "unknown"}.`
      );
    }
    return `salt:${String(salt)}:${spec.id || "anonymous"}`;
  }
  return spec.id || "anonymous";
}

function roleWeightsFromSpec(scenarioSpec, role, alphabet) {
  const spec = scenarioSpec || defaultScenarioSpec();
  if (spec.generative_model && !SUPPORTED_GENERATIVE_MODELS.has(spec.generative_model)) {
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
  if (spec.generative_model && !SUPPORTED_GENERATIVE_MODELS.has(spec.generative_model)) {
    throw new Error(`Unsupported generative_model: ${spec.generative_model}`);
  }
  const roles = ["baseline", "targeted_post", "sham_post", "off_target_post"];
  const component = panelSeedComponent(spec);
  const panel = {};
  roles.forEach((role) => {
    panel[role] = generateWeightedTrace({
      seed: `${seed}:${component}:${role}`,
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
  SUPPORTED_GENERATIVE_MODELS,
  defaultScenarioSpec,
  generateTracePanel,
  generateWeightedTrace,
  mulberry32,
  panelSeedComponent,
  resolveGenerativeModel,
  roleWeightsFromSpec,
  seedToUint32,
  validateGeneratorDeterminism
};

function runSelfTest() {
  const failures = [];
  const assert = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const alphabet = ["A", "B", "C", "D"];
  const traceLength = 64;
  const seed = "self-test-seed";
  const weights = { A: 0.38, B: 0.34, C: 0.15, D: 0.13 };
  const roleModels = {
    baseline: { weights },
    targeted_post: { weights },
    sham_post: { weights },
    off_target_post: { weights }
  };

  // 1. v2 model: salt-free, deterministic, and unaffected by any scenario_salt.
  const v2Spec = { id: "case-0", generative_model: "seeded_weighted_panel_v2", role_models: roleModels };
  assert(validateGeneratorDeterminism(seed, traceLength, alphabet, v2Spec), "v2 determinism failed");

  // 1b. v2 output must NOT change if a scenario_salt is present (salt ignored).
  const v2WithSalt = { ...v2Spec, scenario_salt: "ignored-by-v2" };
  const v2A = generateTracePanel({ seed, traceLength, stateAlphabet: alphabet, scenarioSpec: v2Spec });
  const v2B = generateTracePanel({ seed, traceLength, stateAlphabet: alphabet, scenarioSpec: v2WithSalt });
  assert(JSON.stringify(v2A) === JSON.stringify(v2B), "v2 must ignore scenario_salt");

  // 1c. default (no generative_model) must equal v2 component derivation.
  const defaultSpec = { id: "case-0", role_models: roleModels };
  const defaultPanel = generateTracePanel({ seed, traceLength, stateAlphabet: alphabet, scenarioSpec: defaultSpec });
  assert(JSON.stringify(defaultPanel) === JSON.stringify(v2A), "default model must match v2 derivation");

  // 2. v3 model: deterministic given a fixed salt.
  const v3Spec = {
    id: "case-0",
    generative_model: "seeded_weighted_panel_v3_explicit_salt",
    scenario_salt: "salt-alpha",
    role_models: roleModels
  };
  assert(validateGeneratorDeterminism(seed, traceLength, alphabet, v3Spec), "v3 determinism failed");

  // 2b. v3 requires a non-empty scenario_salt.
  let threw = false;
  try {
    generateTracePanel({
      seed,
      traceLength,
      stateAlphabet: alphabet,
      scenarioSpec: { id: "case-0", generative_model: "seeded_weighted_panel_v3_explicit_salt", role_models: roleModels }
    });
  } catch (error) {
    threw = /requires a non-empty scenario_salt/.test(error.message);
  }
  assert(threw, "v3 must reject missing scenario_salt");

  // 2c. Distinct salts must yield genuinely different trace streams (explicit
  // salt is load-bearing — the adversarial null is not a v2 re-run).
  const v3SaltA = generateTracePanel({ seed, traceLength, stateAlphabet: alphabet, scenarioSpec: v3Spec });
  const v3SaltB = generateTracePanel({
    seed,
    traceLength,
    stateAlphabet: alphabet,
    scenarioSpec: { ...v3Spec, scenario_salt: "salt-beta" }
  });
  assert(JSON.stringify(v3SaltA) !== JSON.stringify(v3SaltB), "v3 distinct salts must change traces");

  // 2d. v3 with a salt must differ from v2 with same id (salt enters the seed).
  assert(JSON.stringify(v3SaltA) !== JSON.stringify(v2A), "v3 salted output must differ from v2");

  // 3. Unsupported models still rejected.
  let rejected = false;
  try {
    generateTracePanel({
      seed,
      traceLength,
      stateAlphabet: alphabet,
      scenarioSpec: { id: "case-0", generative_model: "seeded_weighted_panel_v99", role_models: roleModels }
    });
  } catch (error) {
    rejected = /Unsupported generative_model/.test(error.message);
  }
  assert(rejected, "unsupported generative_model must be rejected");

  if (failures.length > 0) {
    console.error(`[external-trace-generator self-test] FAIL (${failures.length})`);
    failures.forEach((message) => console.error(`  - ${message}`));
    process.exit(1);
  }
  console.log("[external-trace-generator self-test] PASS: v2 and v3_explicit_salt models verified.");
}

if (require.main === module && process.argv.includes("--self-test")) {
  runSelfTest();
}
