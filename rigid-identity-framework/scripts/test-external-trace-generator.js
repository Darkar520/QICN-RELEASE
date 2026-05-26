const assert = require("assert");
const {
  defaultScenarioSpec,
  generateTracePanel,
  validateGeneratorDeterminism
} = require("./lib/external-trace-generator");

function assertPanel(panel, alphabet, traceLength) {
  const allowed = new Set(alphabet);
  ["baseline", "targeted_post", "sham_post", "off_target_post"].forEach((key) => {
    assert.ok(Array.isArray(panel[key]), `${key} must be an array`);
    assert.strictEqual(panel[key].length, traceLength, `${key} length mismatch`);
    panel[key].forEach((state) => assert.ok(allowed.has(state), `${key} has state outside alphabet: ${state}`));
  });
}

function run() {
  const alphabet = ["A", "B", "C", "D"];
  const traceLength = 240;
  const scenarioSpec = {
    ...defaultScenarioSpec(),
    id: "unit_test_panel",
    role_models: {
      baseline: { weights: { A: 0.4, B: 0.3, C: 0.2, D: 0.1 } },
      targeted_post: { weights: { A: 0.1, B: 0.2, C: 0.6, D: 0.1 } },
      sham_post: { weights: { A: 0.39, B: 0.31, C: 0.2, D: 0.1 } },
      off_target_post: { weights: { A: 0.35, B: 0.3, C: 0.2, D: 0.15 } }
    }
  };
  assert.ok(validateGeneratorDeterminism("cleanroom_seed_001", traceLength, alphabet, scenarioSpec));
  const panel = generateTracePanel({
    seed: "cleanroom_seed_001",
    traceLength,
    stateAlphabet: alphabet,
    scenarioSpec
  });
  assertPanel(panel, alphabet, traceLength);
  const rerun = generateTracePanel({
    seed: "cleanroom_seed_001",
    traceLength,
    stateAlphabet: alphabet,
    scenarioSpec
  });
  assert.deepStrictEqual(panel, rerun);

  console.log("====================================================");
  console.log("QICN External Trace Generator Tests");
  console.log("====================================================");
  console.log("[PASS] external trace generator tests passed.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FAIL] ${error.message}`);
    process.exit(1);
  }
}
