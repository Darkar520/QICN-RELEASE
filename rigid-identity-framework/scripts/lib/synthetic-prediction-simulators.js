const { mulberry32, seedToUint32 } = require("./external-trace-generator");

function seededNoise(seed, scale = 0.01) {
  const prng = mulberry32(seedToUint32(seed));
  return () => (prng() - 0.5) * 2 * scale;
}

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function invariantVector(seed, base = 0.72, scale = 0.035) {
  const noise = seededNoise(seed, scale);
  return {
    Iper: clamp(base + noise()),
    Iri: clamp(base - 0.02 + noise()),
    Iint: clamp(base - 0.04 + noise()),
    Icont: clamp(base + 0.01 + noise()),
    Idiff: clamp(base - 0.06 + noise()),
    Ileg: clamp(base - 0.01 + noise())
  };
}

function weightedCertification(vector, weights = {}) {
  const defaultWeights = {
    Iper: 0.14,
    Iri: 0.18,
    Iint: 0.22,
    Icont: 0.14,
    Idiff: 0.14,
    Ileg: 0.18
  };
  const merged = { ...defaultWeights, ...weights };
  return Object.entries(merged).reduce((sum, [key, weight]) => sum + weight * vector[key], 0);
}

function applyInvariantAblation(vector, target, severity, seed) {
  const noise = seededNoise(seed, 0.005);
  return Object.fromEntries(
    Object.entries(vector).map(([key, value]) => {
      const drop = key === target ? severity : Math.max(0, severity * 0.04);
      return [key, clamp(value - drop + noise())];
    })
  );
}

function maxAbsDelta(left, right) {
  return Math.max(...Object.keys(left).map((key) => Math.abs(left[key] - right[key])));
}

function rmsDelta(left, right) {
  const keys = Object.keys(left);
  const sumSquares = keys.reduce((sum, key) => sum + (left[key] - right[key]) ** 2, 0);
  return Math.sqrt(sumSquares / keys.length);
}

function perturbVector(vector, seed, scale) {
  const noise = seededNoise(seed, scale);
  return Object.fromEntries(Object.entries(vector).map(([key, value]) => [key, clamp(value + noise())]));
}

function classLabel(vector) {
  return Object.values(vector).every((value) => value >= 0.5) ? "certified_candidate" : "non_certified_candidate";
}

function integrationCertification({ integrationMargin, complexityScore, activityBudget }) {
  return clamp(0.12 + 0.62 * integrationMargin + 0.15 * complexityScore + 0.11 * activityBudget);
}

module.exports = {
  applyInvariantAblation,
  classLabel,
  clamp,
  integrationCertification,
  invariantVector,
  maxAbsDelta,
  perturbVector,
  rmsDelta,
  seededNoise,
  weightedCertification
};
