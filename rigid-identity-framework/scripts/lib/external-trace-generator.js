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

function distributionForScenario(kind, role) {
  const base = { A: 0.38, B: 0.34, C: 0.15, D: 0.13 };
  if (kind === "qicn_seeded_positive" && role === "targeted_post") return { A: 0.14, B: 0.16, C: 0.56, D: 0.14 };
  if (kind === "qicn_seeded_positive" && role === "off_target_post") return { A: 0.35, B: 0.26, C: 0.17, D: 0.22 };
  if (kind === "stochastic_noise_negative_control") return { A: 0.27, B: 0.26, C: 0.24, D: 0.23 };
  if (kind === "memory_drift_negative_control") return { A: 0.23, B: 0.33, C: 0.25, D: 0.19 };
  if (kind === "high_entropy_negative_control") return { A: 0.25, B: 0.25, C: 0.25, D: 0.25 };
  if (kind === "reward_bookkeeping_negative_control") return { A: 0.42, B: 0.19, C: 0.18, D: 0.21 };
  if (kind === "narrative_only_negative_control") return base;
  return base;
}

function generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec }) {
  if (!seed) throw new Error("seed is required.");
  if (!Number.isInteger(traceLength) || traceLength <= 0) throw new Error("traceLength must be positive integer.");
  if (!Array.isArray(stateAlphabet) || stateAlphabet.length === 0) throw new Error("stateAlphabet is required.");
  const kind = scenarioSpec?.kind || "qicn_seeded_positive";
  const roles = ["baseline", "targeted_post", "sham_post", "off_target_post"];
  const panel = {};
  roles.forEach((role) => {
    const roleForWeights =
      kind === "qicn_seeded_positive"
        ? role
        : role === "baseline"
          ? "baseline"
          : "targeted_post";
    panel[role] = generateWeightedTrace({
      seed: `${seed}:${kind}:${role}`,
      traceLength,
      stateAlphabet,
      weights: distributionForScenario(kind, roleForWeights)
    });
  });
  return panel;
}

function validateGeneratorDeterminism(seed, traceLength, stateAlphabet, scenarioSpec = { kind: "qicn_seeded_positive" }) {
  const first = generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec });
  const second = generateTracePanel({ seed, traceLength, stateAlphabet, scenarioSpec });
  return JSON.stringify(first) === JSON.stringify(second);
}

module.exports = {
  generateTracePanel,
  generateWeightedTrace,
  mulberry32,
  seedToUint32,
  validateGeneratorDeterminism
};
