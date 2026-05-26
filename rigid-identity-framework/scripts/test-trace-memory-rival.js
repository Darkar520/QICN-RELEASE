const assert = require("assert");
const {
  fitTraceMemoryRival,
  normalizeCounts,
  totalVariation,
  transitionDistribution
} = require("./lib/trace-memory-rival");

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Expected ${actual} to be within ${tolerance} of ${expected}`
  );
}

function sumDistribution(distribution) {
  return Object.values(distribution).reduce((sum, value) => sum + value, 0);
}

function testTotalVariation() {
  closeTo(totalVariation({ A: 1 }, { B: 1 }), 1);
  closeTo(totalVariation({ A: 0.5, B: 0.5 }, { A: 0.5, B: 0.5 }), 0);
}

function testLaplaceSmoothingKeepsUnseenStatesAlive() {
  const distribution = normalizeCounts(
    { A: 2 },
    { alphabet: ["A", "B"], laplaceSmoothing: 1 }
  );

  closeTo(distribution.A, 3 / 4);
  closeTo(distribution.B, 1 / 4);
  closeTo(sumDistribution(distribution), 1);
}

function testTransitionDistributionUsesAlphabet() {
  const distribution = transitionDistribution(
    ["A", "A", "A"],
    { alphabet: ["A", "B"], laplaceSmoothing: 1 }
  );

  closeTo(distribution.A, 3 / 4);
  closeTo(distribution.B, 1 / 4);
}

function testMinTraceLengthBlocksShortTrace() {
  assert.throws(
    () => fitTraceMemoryRival(["A", "B", "A"], { memoryDepth: 1, minTraceLength: 4 }),
    /below minTraceLength/
  );
}

function testRivalPredictsNormalizedDistribution() {
  const trace = Array.from({ length: 240 }, (_, index) => ["A", "B", "A", "C"][index % 4]);
  const rival = fitTraceMemoryRival(trace, {
    memoryDepth: 1,
    minTraceLength: 200,
    laplaceSmoothing: 1,
    alphabet: ["A", "B", "C"]
  });
  const predicted = rival.predictAggregateDistribution(trace);

  assert.strictEqual(rival.memoryDepth, 1);
  assert.strictEqual(rival.minTraceLength, 200);
  assert.strictEqual(rival.laplaceSmoothing, 1);
  assert.strictEqual(rival.stateCount, 3);
  assert.ok(rival.parameterCount > 0);
  closeTo(sumDistribution(predicted), 1);
  assert.ok(predicted.A > 0);
  assert.ok(predicted.B > 0);
  assert.ok(predicted.C > 0);
}

function run() {
  testTotalVariation();
  testLaplaceSmoothingKeepsUnseenStatesAlive();
  testTransitionDistributionUsesAlphabet();
  testMinTraceLengthBlocksShortTrace();
  testRivalPredictsNormalizedDistribution();

  console.log("====================================================");
  console.log("QICN Trace-Memory Rival Unit Tests");
  console.log("====================================================");
  console.log("[PASS] trace-memory rival tests passed.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FAIL] ${error.message}`);
    process.exit(1);
  }
}
