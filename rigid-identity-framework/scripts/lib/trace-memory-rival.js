function normalizeCounts(counts) {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const distribution = {};
  if (total === 0) return distribution;
  Object.keys(counts).sort().forEach((key) => {
    distribution[key] = counts[key] / total;
  });
  return distribution;
}

function transitionDistribution(trace) {
  const counts = {};
  for (let index = 1; index < trace.length; index += 1) {
    const state = trace[index];
    counts[state] = (counts[state] || 0) + 1;
  }
  return normalizeCounts(counts);
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
  const memoryDepth = options.memoryDepth || 1;
  if (!Array.isArray(trace) || trace.length <= memoryDepth) {
    throw new Error("Trace must contain more states than memoryDepth.");
  }

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

  const fallbackDistribution = normalizeCounts(fallbackCounts);
  const contextDistributions = {};
  contexts.forEach((counts, context) => {
    contextDistributions[context] = normalizeCounts(counts);
  });

  function predictAggregateDistribution(targetTrace) {
    const aggregateCounts = {};
    for (let index = memoryDepth; index < targetTrace.length; index += 1) {
      const context = targetTrace.slice(index - memoryDepth, index).join("|");
      const predicted = contextDistributions[context] || fallbackDistribution;
      Object.entries(predicted).forEach(([state, probability]) => {
        aggregateCounts[state] = (aggregateCounts[state] || 0) + probability;
      });
    }
    return normalizeCounts(aggregateCounts);
  }

  return {
    id: "RIVAL-TRACE-MEMORY-01",
    memoryDepth,
    stateCount: Object.keys(fallbackDistribution).length,
    contextCount: contexts.size,
    parameterCount: contexts.size * Math.max(1, Object.keys(fallbackDistribution).length),
    trainingEntropy: shannonEntropy(fallbackDistribution),
    predictAggregateDistribution
  };
}

module.exports = {
  fitTraceMemoryRival,
  shannonEntropy,
  totalVariation,
  transitionDistribution
};
