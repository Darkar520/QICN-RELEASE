function normalizeAlphabet(values) {
  return Array.from(new Set(values)).sort();
}

function normalizeCounts(counts, options = {}) {
  const laplaceSmoothing = options.laplaceSmoothing || 0;
  if (laplaceSmoothing < 0) {
    throw new Error("laplaceSmoothing must be non-negative.");
  }

  const keys = options.alphabet ? normalizeAlphabet(options.alphabet) : normalizeAlphabet(Object.keys(counts));
  const smoothedCounts = {};
  keys.forEach((key) => {
    smoothedCounts[key] = (counts[key] || 0) + laplaceSmoothing;
  });

  const total = Object.values(smoothedCounts).reduce((sum, value) => sum + value, 0);
  const distribution = {};
  if (total === 0) return distribution;
  keys.forEach((key) => {
    distribution[key] = smoothedCounts[key] / total;
  });
  return distribution;
}

function validateTrace(trace, label = "Trace") {
  if (!Array.isArray(trace)) {
    throw new Error(`${label} must be an array of finite states.`);
  }
  if (trace.length === 0) {
    throw new Error(`${label} must not be empty.`);
  }
}

function validateAlphabet(trace, alphabet) {
  const alphabetSet = new Set(alphabet);
  const missing = normalizeAlphabet(trace).filter((state) => !alphabetSet.has(state));
  if (missing.length > 0) {
    throw new Error(`Alphabet is missing trace state(s): ${missing.join(", ")}`);
  }
}

function transitionDistribution(trace, options = {}) {
  validateTrace(trace);
  const alphabet = options.alphabet ? normalizeAlphabet(options.alphabet) : normalizeAlphabet(trace);
  validateAlphabet(trace, alphabet);

  const counts = {};
  for (let index = 1; index < trace.length; index += 1) {
    const state = trace[index];
    counts[state] = (counts[state] || 0) + 1;
  }
  return normalizeCounts(counts, {
    alphabet,
    laplaceSmoothing: options.laplaceSmoothing || 0
  });
}

function shannonEntropy(distribution) {
  return Object.values(distribution).reduce((sum, probability) => {
    if (probability <= 0) return sum;
    return sum - probability * Math.log2(probability);
  }, 0);
}

function totalVariation(left, right) {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  let sum = 0;
  keys.forEach((key) => {
    sum += Math.abs((left[key] || 0) - (right[key] || 0));
  });
  return 0.5 * sum;
}

function fitTraceMemoryRival(trace, options = {}) {
  validateTrace(trace);

  const memoryDepth = options.memoryDepth || 1;
  if (!Number.isInteger(memoryDepth) || memoryDepth < 1) {
    throw new Error("memoryDepth must be a positive integer.");
  }

  const minTraceLength = options.minTraceLength || memoryDepth + 1;
  if (!Number.isInteger(minTraceLength) || minTraceLength <= memoryDepth) {
    throw new Error("minTraceLength must be an integer greater than memoryDepth.");
  }
  if (trace.length < minTraceLength) {
    throw new Error(`Trace length ${trace.length} is below minTraceLength ${minTraceLength}.`);
  }

  const laplaceSmoothing = options.laplaceSmoothing || 0;
  if (laplaceSmoothing < 0) {
    throw new Error("laplaceSmoothing must be non-negative.");
  }

  const alphabet = options.alphabet ? normalizeAlphabet(options.alphabet) : normalizeAlphabet(trace);
  validateAlphabet(trace, alphabet);

  const contexts = new Map();
  const fallbackCounts = {};

  for (let index = memoryDepth; index < trace.length; index += 1) {
    const context = trace.slice(index - memoryDepth, index).join("|");
    const nextState = trace[index];
    if (!contexts.has(context)) contexts.set(context, {});
    const contextCounts = contexts.get(context);
    contextCounts[nextState] = (contextCounts[nextState] || 0) + 1;
    fallbackCounts[nextState] = (fallbackCounts[nextState] || 0) + 1;
  }

  const fallbackDistribution = normalizeCounts(fallbackCounts, {
    alphabet,
    laplaceSmoothing
  });
  const contextDistributions = {};
  contexts.forEach((counts, context) => {
    contextDistributions[context] = normalizeCounts(counts, {
      alphabet,
      laplaceSmoothing
    });
  });

  function predictAggregateDistribution(targetTrace) {
    validateTrace(targetTrace, "Target trace");
    validateAlphabet(targetTrace, alphabet);
    if (targetTrace.length <= memoryDepth) {
      throw new Error("Target trace must contain more states than memoryDepth.");
    }

    const aggregateCounts = {};
    for (let index = memoryDepth; index < targetTrace.length; index += 1) {
      const context = targetTrace.slice(index - memoryDepth, index).join("|");
      const predicted = contextDistributions[context] || fallbackDistribution;
      Object.entries(predicted).forEach(([state, probability]) => {
        aggregateCounts[state] = (aggregateCounts[state] || 0) + probability;
      });
    }
    return normalizeCounts(aggregateCounts, { alphabet });
  }

  return {
    id: "RIVAL-TRACE-MEMORY-01",
    memoryDepth,
    minTraceLength,
    laplaceSmoothing,
    alphabet,
    stateCount: alphabet.length,
    contextCount: contexts.size,
    parameterCount: contexts.size * Math.max(1, alphabet.length),
    trainingEntropy: shannonEntropy(fallbackDistribution),
    predictAggregateDistribution
  };
}

module.exports = {
  fitTraceMemoryRival,
  normalizeCounts,
  shannonEntropy,
  totalVariation,
  transitionDistribution
};
